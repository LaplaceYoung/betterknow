import { mkdtemp, readFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawn } from 'node:child_process';

const root = new URL('..', import.meta.url).pathname;
const dataDir = await mkdtemp(join(tmpdir(), 'hyperclone-seed-'));
const server = spawn(process.execPath, ['dist/index.js'], { cwd: root, env: { ...process.env, PORT: '8799', HYPERCLONE_DATA_DIR: dataDir }, stdio: ['ignore', 'pipe', 'pipe'] });
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
try {
  for (let i = 0; i < 50; i++) { try { if ((await fetch('http://127.0.0.1:8799/health')).ok) break; } catch {} await wait(100); }
  const post = async (path, body, token) => fetch(`http://127.0.0.1:8799${path}`, { method: 'POST', headers: { 'content-type': 'application/json', ...(token ? { authorization: `Bearer ${token}` } : {}) }, body: JSON.stringify(body) });
  const email = `seed-${Date.now()}@example.com`;
  const registered = await post('/api/v1/auth/register', { username: 'Seed Tester', email, password: 'test-password' });
  if (!registered.ok) throw new Error(`register ${registered.status}`);
  const logged = await post('/api/v1/auth/login', { email, password: 'test-password' });
  const login = await logged.json(); const token = login.data.access_token;
  const headers = { authorization: `Bearer ${token}` };
  const catalog = await fetch('http://127.0.0.1:8799/api/v1/marketplace/courses', { headers });
  const courses = await catalog.json(); const biology = courses.courses.find((course) => course.courseTitle === 'AP Biology');
  if (!biology) throw new Error('AP Biology missing from marketplace');
  const enrolled = await post(`/api/v1/marketplace/courses/${biology.marketplaceId}/enroll`, {}, token);
  if (!enrolled.ok) throw new Error(`enroll ${enrolled.status}`);
  const { courseUuid } = await enrolled.json();
  const get = (suffix) => fetch(`http://127.0.0.1:8799/api/v1/course-generation/courses/${courseUuid}/${suffix}`, { headers });
  const [practice, exam, project, progress] = await Promise.all(['practice', 'exam', 'project', 'progress-status'].map(get));
  for (const response of [practice, exam, project, progress]) if (!response.ok) throw new Error(`course GET ${response.status}`);
  const practiceBytes = (await practice.clone().text()).length;
  if (practiceBytes <= 500_000) throw new Error(`practice too small: ${practiceBytes}`);
  const practiceJson = await practice.json();
  const fill = practiceJson.sessions.flatMap((session) => session.questions).find((question) => question.type === 'fill');
  if (!fill) throw new Error('fill question missing');
  const answer = fill.correctAnswers[0];
  const fillSession = practiceJson.sessions.find((session) => session.questions.includes(fill)); const right = await post(`/api/v1/course-generation/courses/${courseUuid}/practice/check-fill`, { sessionId: fillSession.sessionId, questionId: fill.id, answer }, token);
  const wrong = await post(`/api/v1/course-generation/courses/${courseUuid}/practice/check-fill`, { sessionId: fillSession.sessionId, questionId: fill.id, answer: '__wrong__' }, token);
  const rightJson = await right.json(); const wrongJson = await wrong.json();
  if (!right.ok || !wrong.ok || rightJson.correct !== true || wrongJson.correct !== false || rightJson.judged !== false || wrongJson.judged !== true || typeof wrongJson.feedback !== 'string') throw new Error('check-fill shape mismatch');
  console.log(JSON.stringify({ ok: true, courseUuid, practiceBytes, checkFill: { right: rightJson, wrong: wrongJson } }));
} finally {
  server.kill('SIGTERM');
  await wait(200);
  if (!server.killed) server.kill('SIGKILL');
}
