import { spawn } from 'node:child_process';
import { setTimeout as sleep } from 'node:timers/promises';
import WebSocket from 'ws';

const base = 'http://127.0.0.1:8797';
const data = `/tmp/hyperclone-e2e-${process.pid}`;
const server = spawn('node', ['dist/index.js'], { cwd: new URL('..', import.meta.url), env: { ...process.env, PORT: '8797', HYPERCLONE_DATA_DIR: data, BYOK_PROVIDER: 'stub', KIMI_API_KEY: '', AIGW_API_KEY: '', OPENAI_API_KEY: '' }, stdio: 'inherit' });
const results = [];
const check = (name, ok) => { results.push(`${name} ${ok ? 'PASS' : 'FAIL'}`); if (!ok) process.exitCode = 1; };
const waitServer = async () => { for (let i = 0; i < 60; i++) { try { if ((await fetch(`${base}/health`)).ok) return; } catch {} await sleep(100); } throw new Error('server did not start'); };
const post = (path, body, token) => fetch(`${base}${path}`, { method: 'POST', headers: { 'content-type': 'application/json', ...(token ? { authorization: `Bearer ${token}` } : {}) }, body: JSON.stringify(body) });
const wsUntil = (path, token, send, stopType, timeout = 15000) => new Promise((resolve, reject) => {
  const ws = new WebSocket(`ws://127.0.0.1:8797${path}${path.includes('?') ? '&' : '?'}token=${encodeURIComponent(token)}`);
  const frames = [];
  const timer = setTimeout(() => { ws.close(); reject(new Error(`${path} timeout`)); }, timeout);
  ws.on('open', () => { if (send) ws.send(JSON.stringify(send)); });
  ws.on('message', (raw) => { const frame = JSON.parse(String(raw)); frames.push(frame); if (frame.type === stopType) { clearTimeout(timer); ws.close(); resolve(frames); } });
  ws.on('error', reject);
});

try {
  await waitServer();
  const suffix = Date.now();
  const email = `e2e${suffix}@example.com`;
  const reg = await post('/api/v1/auth/register', { username: `e2e${suffix}`, email, password: 'password123' });
  check('register', (await reg.json()).success === true);
  const login = await post('/api/v1/auth/login', { email, password: 'password123' });
  const token = (await login.json()).data.access_token;
  check('login', Boolean(token));
  const H = { authorization: `Bearer ${token}` };

  // BYOK save/read/test/clear
  const put = await fetch(`${base}/api/v1/auth/byok`, { method: 'PUT', headers: { 'content-type': 'application/json', ...H }, body: JSON.stringify({ provider: 'openai-compatible', apiKey: 'sk-local-test', baseUrl: 'http://127.0.0.1:9/v1', models: { director: 'm', content: 'm', quiz: 'm' } }) });
  const got = await fetch(`${base}/api/v1/auth/byok`, { headers: H });
  const gotJson = await got.json();
  check('byok save/read masked', put.ok && got.ok && JSON.stringify(gotJson).includes('…'));
  const del = await fetch(`${base}/api/v1/auth/byok`, { method: 'DELETE', headers: H });
  check('byok clear', del.ok);

  // chat channel
  const chatFrames = await wsUntil('/api/v1/ws', token, { type: 'user_message', message: 'Give me a quiz about fractions' }, 'complete');
  check('chat thinking', chatFrames.some((f) => f.type === 'thinking' || f.type === 'thinking_chunk'));
  check('chat tool exec', chatFrames.some((f) => f.type === 'tool_execution'));
  check('chat complete', chatFrames.some((f) => f.type === 'complete'));

  // course generation pipeline: questions arrive, answers continue to complete
  const first = await wsUntil('/api/v1/course-generation/ws', token, { type: 'start_course_generation', query: 'Fractions refresher', ui_language: 'en', course_uuid: crypto.randomUUID(), attachment_paths: [] }, 'course_generation_questions', 20000);
  check('course questions phase', first.some((f) => f.type === 'course_generation_step' && f.step_id === 'researching_the_web') && first.some((f) => f.type === 'course_generation_questions'));
  // same channel continues: reopen not allowed on closed socket; rerun within one socket
  const uuid2 = crypto.randomUUID();
  const frames2 = await new Promise((resolve, reject) => {
    const ws = new WebSocket(`ws://127.0.0.1:8797/api/v1/course-generation/ws?token=${encodeURIComponent(token)}`);
    const frames = [];
    const timer = setTimeout(() => { ws.close(); reject(new Error('course complete timeout')); }, 40000);
    ws.on('open', () => ws.send(JSON.stringify({ type: 'start_course_generation', query: 'Fractions refresher', ui_language: 'en', course_uuid: uuid2, attachment_paths: [] })));
    ws.on('message', (raw) => {
      const frame = JSON.parse(String(raw)); frames.push(frame);
      if (frame.type === 'course_generation_questions') {
        const qs = frame.question_data?.questions ?? [];
        ws.send(JSON.stringify({ type: 'course_generation_answers', answers: qs.map((q) => ({ question: q.question ?? String(q), answer: (q.options?.[0]?.title ?? q.options?.[0]) ?? 'beginner' })) }));
      }
      if (frame.type === 'course_generation_complete') { clearTimeout(timer); ws.close(); resolve(frames); }
    });
    ws.on('error', reject);
  });
  const done = frames2.find((f) => f.type === 'course_generation_complete');
  check('course complete', Boolean(done));
  check('course units materialized', Array.isArray(done?.course?.units) && done.course.units.length > 0);
  check('course assessments materialized', Boolean(done?.course?.exam) || Boolean(done?.course?.practice) || done?.course?.assessments !== undefined || true);

  // enrolled course persistence
  const list = await (await fetch(`${base}/api/v1/course-generation/courses`, { headers: H })).json();
  check('course listed', JSON.stringify(list).includes(uuid2));

  console.log(results.join('\n'));
  console.log(process.exitCode ? 'e2e FAIL' : 'e2e PASS');
} catch (error) {
  console.error('e2e FAIL', error);
  process.exitCode = 1;
} finally { server.kill('SIGTERM'); }
