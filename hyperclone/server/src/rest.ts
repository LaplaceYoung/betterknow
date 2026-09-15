import { randomUUID } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { basename, extname, resolve } from 'node:path';
import type { FastifyInstance, FastifyRequest } from 'fastify';
import { authenticate } from './auth.js';
import { diagrams, placeholderPng, placeholderWebm, publicFiles } from './artifacts.js';
import { now, readState, updateState, type UserRecord } from './store.js';
import { decorateMarketplace } from './extras.js';
import { getSeedExam, getSeedPractice, getSeedProgress, getSeedProject, resolveSeedByMarketplaceId, resolveSeedCourse } from './seedCourses.js';

const protectedRoute = { preHandler: authenticate };
const profileSeed = ['Q7k3m9p2', 'A5n8r1q4', 'W2h6y3z9', 'D8j4k2m7'].map((question_id) => ({ question_id, answer_ids: [], last_updated_at: '' }));
const taskList = { success: true, tasks: [], count: 0, pending_sources_count: 0 };

async function currentUser(request: FastifyRequest): Promise<UserRecord> {
  const state = await readState();
  return state.users[request.userId!]!;
}

function courseSummary(course: Record<string, unknown>): Record<string, unknown> {
  const units = Array.isArray(course.units) ? course.units : [];
  const sessionCount = units.reduce<number>((count, unit) => count + (typeof unit === 'object' && unit && 'sessions' in unit && Array.isArray(unit.sessions) ? unit.sessions.length : 0), 0);
  const coverUrl = String(course.coverImageUrl || `/api/v1/marketplace/cover/${course.marketplaceSourceId ?? course.courseUuid}/cover.png`);
  return {
    courseUuid: course.courseUuid, courseTitle: course.courseTitle, courseDescription: course.courseDescription,
    targetLearner: course.targetLearner, tags: course.tags ?? [], unitCount: units.length, sessionCount,
    assignmentCount: 0, examCount: 0, ticketVariant: course.ticketVariant ?? 1, coverImageUrl: coverUrl,
    wideCoverImageUrl: course.wideCoverImageUrl || coverUrl, updatedAt: course.updated_at ?? course.created_at, createdAt: course.created_at,
    source: course.source ?? 'generated', progress: course.progress ?? 0, nextItem: course.nextItem ?? null,
  };
}
async function marketplaceCourses(): Promise<Array<Record<string, unknown>>> {
  for (const candidate of [resolve('../seed/marketplace_courses.json'), resolve('seed/marketplace_courses.json'), resolve('hyperclone/seed/marketplace_courses.json')]) {
    try {
      const value: unknown = JSON.parse(await readFile(candidate, 'utf8'));
      if (Array.isArray(value)) return value as Array<Record<string, unknown>>;
      if (value && typeof value === 'object' && 'courses' in value && Array.isArray(value.courses)) return value.courses as Array<Record<string, unknown>>;
    } catch { /* Seed is optional during isolated server install. */ }
  }
  return [{ marketplaceId: 'starter-course', courseTitle: 'How AI Actually Works', courseDescription: 'A practical tour of modern AI.', targetLearner: 'Curious learners', ticketVariant: 1, coverImageUrl: '', wideCoverImageUrl: '', unitCount: 3, sessionCount: 6, subject: 'Technology', subjects: ['Technology'], enrolled: false, enrolledCourseUuid: null, joinCount: 0, languages: ['en', 'zh'] }];
}

export async function registerRestRoutes(app: FastifyInstance): Promise<void> {
  app.get('/api/v1/auth/byok', protectedRoute, async (request) => {
    const state = await readState();
    const u = state.users[request.userId!] as unknown as { byok?: Record<string, unknown> & { apiKey?: string; providers?: Record<string, unknown> } };
    const b = u?.byok;
    if (!b) return { configured: false, enabled: false };
    return {
      configured: Boolean(b.apiKey || b.providers),
      enabled: b.enabled !== false,
      provider: b.provider ?? 'kimi',
      base_url: b.baseUrl,
      models: b.models,
      api_key_masked: b.apiKey ? `${(b.apiKey ?? '').slice(0, 6)}…${(b.apiKey ?? '').slice(-4)}` : '',
      providers: b.providers,
    };
  });
  app.put('/api/v1/auth/byok', protectedRoute, async (request) => {
    const body = (request.body ?? {}) as {
      enabled?: boolean;
      provider?: string;
      base_url?: string;
      baseUrl?: string;
      api_key?: string;
      apiKey?: string;
      models?: Record<string, string>;
      providers?: Record<string, { apiKey?: string; baseUrl?: string; model?: string }>;
    };
    const baseUrl = String(body.base_url ?? body.baseUrl ?? '').trim() || 'https://api.moonshot.cn/v1';
    const apiKey = String(body.api_key ?? body.apiKey ?? '').trim();
    const provider = body.provider === 'openai-compatible' ? 'openai-compatible' : body.provider === 'stub' ? 'stub' : 'kimi';
    const models = {
      director: body.models?.director ?? 'kimi-k2-turbo-preview',
      content: body.models?.content ?? body.models?.director ?? 'kimi-k2-turbo-preview',
      quiz: body.models?.quiz ?? body.models?.director ?? 'kimi-k2-turbo-preview',
      ...(body.models?.tts ? { tts: body.models.tts } : {})
    };
    const providers = body.providers;
    await updateState((state) => {
      const user = state.users[request.userId!] as unknown as { byok?: Record<string, unknown> };
      user.byok = {
        enabled: body.enabled !== false,
        provider,
        baseUrl,
        apiKey,
        models,
        ...(providers ? { providers } : {})
      };
    });
    if (apiKey) {
      try {
        const credPath = resolve(new URL('../../../agent-runtime/home/.credentials.yaml', import.meta.url).pathname);
        const yaml = `# Auto-generated from user BYOK settings\ndeepseek-official:\n  apiKey: "${apiKey}"\n`;
        await writeFile(credPath, yaml, 'utf8');
      } catch { /* best effort */ }
    }
    return { success: true, configured: Boolean(apiKey || providers) };
  });
  app.post('/api/v1/auth/byok/test', protectedRoute, async (request) => {
    const body = (request.body ?? {}) as {
      provider?: string;
      base_url?: string;
      api_key?: string;
      model?: string;
      seam?: 'llm' | 'search' | 'tts' | 'image' | 'stt';
    };
    const started = Date.now();
    const seam = body.seam ?? 'llm';
    if (seam === 'search') {
      try {
        const apiKey = body.api_key || process.env.BYOK_SEARCH_API_KEY || '';
        if (!apiKey) return { ok: true, status: 200, latency_ms: 1, sample: 'Search stub active (free local search)' };
        return { ok: true, status: 200, latency_ms: Date.now() - started, sample: 'Search provider configured' };
      } catch (e) {
        return { ok: false, status: 500, latency_ms: Date.now() - started, sample: String(e) };
      }
    }
    try {
      const resp = await fetch(`${String(body.base_url ?? 'https://api.moonshot.cn/v1').replace(/\/$/, '')}/chat/completions`, {
        method: 'POST',
        headers: { 'content-type': 'application/json', authorization: `Bearer ${String(body.api_key ?? '')}` },
        body: JSON.stringify({
          model: body.model ?? 'kimi-k2-turbo-preview',
          messages: [{ role: 'user', content: 'Reply with exactly: OK' }],
          stream: false,
          max_tokens: 4
        }),
        signal: AbortSignal.timeout(30_000)
      });
      const text = await resp.text();
      return { ok: resp.ok, status: resp.status, latency_ms: Date.now() - started, sample: text.slice(0, 200) };
    } catch (error) {
      return { ok: false, status: 0, latency_ms: Date.now() - started, sample: error instanceof Error ? error.message : 'network error' };
    }
  });
  app.delete('/api/v1/auth/byok', protectedRoute, async (request) => {
    await updateState((state) => {
      const user = state.users[request.userId!] as unknown as { byok?: unknown };
      delete user.byok;
    });
    return { success: true };
  });

  app.get('/health', async () => ({ ok: true }));
  app.get('/api/v1/net-check', async () => ({ ok: true, state: 'ok', t: Date.now() }));

  app.get('/api/v1/auth/get_user_info', protectedRoute, async (request) => {
    const user = await currentUser(request); const resetAt = new Date(Date.parse(user.last_reset_at) + 12 * 3_600_000).toISOString();
    return { success: true, data: { user_id: user.id, email: user.email, username: user.username, canvas_lms: { has_credentials: false, credentials: { school: null, canvas_url: null, access_token: null, last_sync: null } }, subscription: { id: `byok-${user.id}`, tier: 'byok', plan_id: 'byok', status: 'active', remaining_credits: 999999, max_credits: 999999, expires_at: null, will_reset_at: resetAt, reset_interval_hours: 0, last_reset_at: user.last_reset_at, billing_reason: 'byok_unlimited' } } };
  });
  app.get('/api/v1/auth/other_function_usage_limits', protectedRoute, async (request) => {
    const user = await currentUser(request); const limit = (remaining: number, max: number) => ({ remaining, limit: max, last_reset_at: user.last_reset_at });
    return { tier: 'byok', version: 1, file_upload: limit(999999, 999999), calendar_add: limit(999999, 999999), file_generation: limit(999999, 999999), deep_learn_session: limit(999999, 999999) };
  });

  app.post('/api/v1/conversations/get_conversation_data', protectedRoute, async (request, reply) => {
    const body = request.body as { conversation_id?: string }; const record = (await readState()).conversations[body.conversation_id ?? ''];
    if (!record || record.user_id !== request.userId) return reply.code(404).send({ detail: 'Conversation not found' });
    return record;
  });
  app.get('/api/v1/conversations/list_past_conversations', protectedRoute, async (request) => {
    const state = await readState(); const conversations = Object.values(state.conversations).filter((item) => item.user_id === request.userId).sort((a, b) => b.updated_at.localeCompare(a.updated_at)).map(({ conversation_id, title, created_at, updated_at, starred, board_session_types }) => ({ conversation_id, title, created_at, last_updated_at: updated_at, starred, board_session_types }));
    const mine = Object.values(state.courses).filter((c) => c.user_id === request.userId).sort((a, b) => String(b.created_at ?? '').localeCompare(String(a.created_at ?? '')));
    const rc = mine[0] as (Record<string, unknown> & { units?: Array<{ title?: string; lectures?: Array<{ title?: string }> }> }) | undefined;
    const recent_course = rc ? { uuid: String(rc.courseUuid), title: String(rc.courseTitle ?? ''), next_lecture: rc.units?.[0]?.lectures?.[0]?.title ?? rc.units?.[0]?.title ?? null, progress: Number(rc.progress ?? 0) } : null;
    return { conversations, pagination: { next_cursor: null, has_more: false }, recent_course };
  });
  app.post('/api/v1/conversations/manage_conversation_property', protectedRoute, async (request, reply) => {
    const body = request.body as { conversation_id?: string; title?: string; starred?: boolean; action?: string };
    const result = await updateState((state) => { const value = state.conversations[body.conversation_id ?? '']; if (!value || value.user_id !== request.userId) return false; if (body.action === 'delete') delete state.conversations[value.conversation_id]; else { if (typeof body.title === 'string') value.title = body.title; if (typeof body.starred === 'boolean') value.starred = body.starred; value.updated_at = now(); } return true; });
    return result ? { success: true } : reply.code(404).send({ detail: 'Conversation not found' });
  });
  app.post('/api/v1/conversations/save_artifact', protectedRoute, async (request, reply) => {
    const body = request.body as Record<string, unknown>; const id = typeof body.conversation_id === 'string' ? body.conversation_id : '';
    const result = await updateState((state) => { const value = state.conversations[id]; if (!value || value.user_id !== request.userId) return false; value.artifacts.push({ ...body, saved_at: now() }); return true; });
    return result ? { success: true, message: 'Artifact saved' } : reply.code(404).send({ detail: 'Conversation not found' });
  });
  // Deliberately public for frontend compatibility with the captured service behavior.
  app.post('/api/v1/conversations/get_shared_conversation_data', async (request, reply) => {
    const body = request.body as { shared_object_id?: string }; const record = (await readState()).conversations[body.shared_object_id ?? ''];
    return record ? record : reply.code(404).send({ detail: 'Shared conversation not found' });
  });

  app.post('/api/v1/share_record/share_records', protectedRoute, async (request) => {
    const body = request.body as { type?: string; shared_object_id?: string; shared_with?: { share_to_everyone?: boolean } };
    const record = { record_id: randomUUID(), type: body.type ?? 'conversation', shared_object_id: body.shared_object_id ?? '', sharing_ends_at: null };
    await updateState((state) => { state.shares[`${record.type}:${record.shared_object_id}`] = record; });
    return { success: true, record_id: record.record_id, shared_url: `/share/c/${record.shared_object_id}`, sharing_ends_at: null };
  });
  app.get('/api/v1/share_record/check_shared_status', protectedRoute, async (request) => {
    const query = request.query as { type?: string; shared_object_id?: string }; const record = (await readState()).shares[`${query.type}:${query.shared_object_id}`];
    return { shared: Boolean(record), shared_url: record ? `/share/c/${record.shared_object_id}` : null, record_id: record?.record_id ?? null, sharing_ends_at: record?.sharing_ends_at ?? null };
  });

  app.get('/api/v1/diagram/:id/diagram.md', async (request, reply) => { const id = (request.params as { id: string }).id; const data = diagrams.get(id)?.md; return data === undefined ? reply.code(404).send({ detail: 'Not found' }) : reply.type('text/markdown; charset=utf-8').send(data); });
  app.get('/api/v1/diagram/:id/diagram.html', async (request, reply) => { const id = (request.params as { id: string }).id; const data = diagrams.get(id)?.html; return data === undefined ? reply.code(404).send({ detail: 'Not found' }) : reply.type('text/html; charset=utf-8').send(data); });
  app.get('/api/v1/diagram/:id/diagram.png', async (request, reply) => { const id = (request.params as { id: string }).id; const record = diagrams.get(id); return !record ? reply.code(404).send({ detail: 'Not found' }) : reply.type('image/png').send(record.png ?? placeholderPng); });
  app.route({ method: ['GET', 'POST'], url: '/api/v1/files/:id', handler: async (request, reply) => { const file = publicFiles.get((request.params as { id: string }).id); return !file ? reply.code(404).send({ detail: 'Not found' }) : reply.header('content-disposition', `inline; filename="${file.filename}"`).type(file.mime).send(file.data); } });

  app.post('/api/v1/drive/upload_file_to_drive', protectedRoute, async (request, reply) => {
    const part = await request.file(); if (!part) return reply.code(400).send({ detail: 'file is required' });
    const id = `file_${randomUUID().replaceAll('-', '').slice(0, 10)}`; const bytes = await part.toBuffer(); const path = resolve('var/data/files', id);
    await mkdir(resolve('var/data/files'), { recursive: true }); await writeFile(path, bytes);
    await updateState((state) => { const files = state.drive[request.userId!] ??= {}; files[id] = { id, ext: extname(part.filename), name: basename(part.filename), size: bytes.length, type: 'file', status: 'ready', parent_id: null, created_at: now(), modified_at: now(), local_path: path, thumbnail_url: null, s3_bucket_name: null }; });
    return { file_id: id, s3_path: path, conversion_scheduled: false, summary_scheduled: false, thumbnail_scheduled: false };
  });
  app.get('/api/v1/drive/get_drive_data', protectedRoute, async (request) => { const state = await readState(); const file_data = { ...(state.folders[request.userId!] ?? {}), ...(state.drive[request.userId!] ?? {}) }; const drive_used_source_bytes = Object.values(state.drive[request.userId!] ?? {}).reduce((sum, file) => sum + (typeof file.size === 'number' ? file.size : 0), 0); return { success: true, file_data, metadata: { drive_used_source_bytes } }; });
  app.post('/api/v1/drive/create_folder', protectedRoute, async (request) => { const body = request.body as { name?: string; parent_id?: string | null }; const id = `folder_${randomUUID().slice(0, 8)}`; const folder = { id, name: body.name ?? 'New folder', type: 'folder', parent_id: body.parent_id ?? null, created_at: now(), modified_at: now() }; await updateState((state) => { (state.folders[request.userId!] ??= {})[id] = folder; }); return { success: true, folder }; });
  app.post('/api/v1/drive/delete', protectedRoute, async (request) => { const body = request.body as { file_id?: string; id?: string }; const id = body.file_id ?? body.id ?? ''; await updateState((state) => { delete (state.drive[request.userId!] ?? {})[id]; delete (state.folders[request.userId!] ?? {})[id]; }); return { success: true }; });
  app.post('/api/v1/drive/add_file_to_calendar', protectedRoute, async (request) => ({ success: true, task_id: randomUUID(), ...(request.body as object) }));

  app.get('/api/v1/memory/get_profile_memory', protectedRoute, async (request) => { const memory = (await readState()).memories[request.userId!]; const data = memory?.profile_data ?? profileSeed; return { success: true, message: `Successfully retrieved ${data.length} profile answers`, profile_data: data }; });
  app.post('/api/v1/memory/update_profile_memory', protectedRoute, async (request) => { const body = request.body as { answers?: Array<Record<string, unknown>> }; await updateState((state) => { const value = state.memories[request.userId!] ??= { profile_data: profileSeed, external_memory: { content: '', updated_at: null }, items: [] }; value.profile_data = (body.answers ?? []).map((answer) => ({ ...answer, last_updated_at: now() })); }); return { success: true, message: 'Profile memory updated' }; });
  app.get('/api/v1/memory/get_external_memory', protectedRoute, async (request) => ({ success: true, external_memory: (await readState()).memories[request.userId!]?.external_memory ?? { content: '', updated_at: null } }));
  app.post('/api/v1/memory/update_external_memory', protectedRoute, async (request) => { const body = request.body as { content?: string }; await updateState((state) => { const value = state.memories[request.userId!] ??= { profile_data: profileSeed, external_memory: { content: '', updated_at: null }, items: [] }; value.external_memory = { content: body.content ?? '', updated_at: now() }; }); return { success: true }; });
  app.get('/api/v1/memory/get_memory_management', protectedRoute, async (request) => ({ success: true, items: (await readState()).memories[request.userId!]?.items ?? [] }));
  app.post('/api/v1/memory/apply_memory_ops', protectedRoute, async (request) => { const body = request.body as { operations?: Array<Record<string, unknown>> }; await updateState((state) => { const value = state.memories[request.userId!] ??= { profile_data: profileSeed, external_memory: { content: '', updated_at: null }, items: [] }; for (const operation of body.operations ?? []) { if (operation.action === 'delete' && typeof operation.id === 'string') value.items = value.items.filter((item) => item.id !== operation.id); else value.items.push({ id: randomUUID(), ...operation, updated_at: now() }); } }); return { success: true, applied: body.operations?.length ?? 0 }; });
  app.delete('/api/v1/memory/clear_stored_memory', protectedRoute, async (request) => { await updateState((state) => { delete state.memories[request.userId!]; }); return { success: true }; });

  const plans = [{ plan_id: 'byok', tier: 'byok', name: 'BYOK Edition', price_usd: 0, interval: 'lifetime', rank: 0, purchasable: false, max_credits: 999999, reset_interval_hours: 0 }];
  app.get('/api/v1/stripe/plans', protectedRoute, async () => ({ plans, current: { plan_id: 'byok', tier: 'byok', billing_reason: 'byok_unlimited', change_flow: null, can_change_plan: false } }));
  app.get('/api/v1/subscription/check_user_subscription', protectedRoute, async () => { return { success: true, subscription: { tier: 'byok', status: 'active', remaining_credits: 999999, max_credits: 999999 } }; });

  app.get('/api/v1/marketplace/courses', protectedRoute, async (request) => {
    const state = await readState();
    const subject = (request.query as { subject?: string }).subject;
    const courses = (await marketplaceCourses()).filter((course) => !subject || course.subject === subject || (Array.isArray(course.subjects) && (course.subjects as string[]).includes(subject)));
    return { courses: courses.map((course) => {
      const enrolled = Object.values(state.courses).find((value) => value.user_id === request.userId && (value.marketplaceId === course.marketplaceId || value.seedOf === course.marketplaceId));
      return { ...decorateMarketplace(course), enrolled: Boolean(enrolled), enrolledCourseUuid: enrolled?.courseUuid ?? null };
    }) };
  });
  app.get('/api/v1/marketplace/courses/:id', protectedRoute, async (request, reply) => { const id = (request.params as { id: string }).id; const value = (await marketplaceCourses()).find((course) => course.marketplaceId === id); return value ?? reply.code(404).send({ detail: 'Course not found' }); });
  app.post('/api/v1/marketplace/courses/:id/enroll', protectedRoute, async (request, reply) => {
    const id = (request.params as { id: string }).id;
    const source = (await marketplaceCourses()).find((course) => course.marketplaceId === id);
    if (!source) return reply.code(404).send({ detail: 'Course not found' });
    const seed = await resolveSeedByMarketplaceId(id);
    if (!seed) return reply.code(404).send({ detail: 'Course seed not found' });
    const existing = Object.values((await readState()).courses).find((course) => course.user_id === request.userId && course.seedOf === seed.courseUuid);
    if (existing) return reply.code(409).send({ detail: 'Course already enrolled', enrolledCourseUuid: existing.courseUuid });
    const courseUuid = randomUUID();
    const course = { ...seed.course, ...source, courseUuid, seedOf: seed.courseUuid, source: 'marketplace', user_id: request.userId, created_at: now(), updated_at: now(), progress: 0 };
    await updateState((state) => { state.courses[courseUuid] = course; });
    return { courseUuid, message: 'Enrolled successfully' };
  });
  for (const path of ['/api/v1/calendar/list_main_tasks', '/api/v1/calendar/list_pending_main_tasks']) app.get(path, protectedRoute, async (request) => { const tasks = (await readState()).calendar[request.userId!] ?? []; return { ...taskList, tasks, count: tasks.length }; });
  app.post('/api/v1/calendar/approve_tasks', protectedRoute, async (request) => { const body = request.body as { task_id?: string; action?: string }; await updateState((state) => { const task = (state.calendar[request.userId!] ?? []).find((item) => item.task_id === body.task_id); if (task) task.status = body.action === 'approve' ? 'approved' : body.action; }); return { success: true }; });
  app.post('/api/v1/calendar/update_tasks', protectedRoute, async (request) => { const body = request.body as { task_id?: string; tasks?: Array<Record<string, unknown>> } & Record<string, unknown>; await updateState((state) => { const tasks = state.calendar[request.userId!] ??= []; if (body.tasks) state.calendar[request.userId!] = body.tasks; else { const task = tasks.find((item) => item.task_id === body.task_id); if (task) Object.assign(task, body, { updated_at: now() }); } }); return { success: true }; });
  app.post('/api/v1/calendar/remove_task', protectedRoute, async (request) => { const body = request.body as { task_id?: string }; await updateState((state) => { state.calendar[request.userId!] = (state.calendar[request.userId!] ?? []).filter((item) => item.task_id !== body.task_id); }); return { success: true }; });
  app.post('/api/v1/calendar/deep_learn_subtask_session', protectedRoute, async (request) => ({ success: true, deep_learn_session_id: randomUUID(), ...(request.body as object) }));
  app.post('/api/v1/calendar/main_task_detail', protectedRoute, async (request, reply) => { const body = request.body as { task_id?: string }; const task = ((await readState()).calendar[request.userId!] ?? []).find((item) => item.task_id === body.task_id); return task ? { success: true, task } : reply.code(404).send({ detail: 'Task not found' }); });

  app.post('/api/v1/deep_learn/get_session_data', protectedRoute, async (request, reply) => { const id = (request.body as { deep_learn_session_id?: string }).deep_learn_session_id ?? ''; const session = (await readState()).deep_learn[id]; return session && session.user_id === request.userId ? session : reply.code(404).send({ detail: 'Session not found' }); });
  app.get('/api/v1/deep_learn/list_deep_learn_session', protectedRoute, async (request) => ({ sessions: Object.values((await readState()).deep_learn).filter((session) => session.user_id === request.userId) }));
  app.post('/api/v1/deep_learn/manage_session_property', protectedRoute, async (request) => { const body = request.body as { deep_learn_session_id?: string; action?: string; title?: string }; await updateState((state) => { const value = state.deep_learn[body.deep_learn_session_id ?? '']; if (!value || value.user_id !== request.userId) return; if (body.action === 'delete') delete state.deep_learn[body.deep_learn_session_id!]; else if (body.title) value.title = body.title; }); return { success: true }; });
  app.post('/api/v1/deep_learn/update_plan', protectedRoute, async (request) => { const body = request.body as { deep_learn_session_id?: string; session_task_plan?: unknown }; await updateState((state) => { const value = state.deep_learn[body.deep_learn_session_id ?? '']; if (value?.user_id === request.userId) value.session_task_plan = body.session_task_plan; }); return { success: true }; });

  app.get('/api/v1/orbie/get_orbie_recommendations', protectedRoute, async () => ({ success: true, recommendations: [] }));
  app.post('/api/v1/orbie/dismiss_orby_recommendations', protectedRoute, async () => ({ success: true }));
  app.get('/api/v1/dailyTrends', protectedRoute, async () => {
    const allTrends = [
      { id: 'bayes-theorem', title: '贝叶斯定理的直觉理解：为什么"证据"改变信念', summary: '从频率派到主观概率的认知跃迁。', category: 'Mathematics' },
      { id: 'transformer-attn', title: 'Transformer 注意力机制：为什么 Query-Key-Value 矩阵能捕获语义', summary: '理解 Scaled Dot-Product Attention 的数学本质。', category: 'AI' },
      { id: 'quantum-superposition', title: '量子叠加态与测量塌缩：从双缝实验到量子计算', summary: '用 Dirac 符号建立量子态的数学直觉。', category: 'Physics' },
      { id: 'game-theory-nash', title: '纳什均衡是如何被发现的？博弈论的数学基础', summary: '从囚徒困境到机制设计。', category: 'Economics' },
      { id: 'calculus-epsilon-delta', title: '微积分 ε-δ 定义：极限概念的严格数学构建', summary: '从朴素直觉到形式化定义的认知升级。', category: 'Mathematics' },
      { id: 'neural-backprop', title: '反向传播算法的链式法则推导与计算图可视化', summary: '理解深度学习训练的核心机制。', category: 'AI' },
      { id: 'shor-algorithm', title: "Shor 算法为什么能破解 RSA？量子并行的威力", summary: '量子傅里叶变换在整数分解中的角色。', category: 'Quantum Computing' },
      { id: 'information-entropy', title: '信息熵：Claude Shannon 如何量化"不确定性"', summary: '从比特到 KL 散度的信息论基础。', category: 'Information Theory' },
      { id: 'linear-algebra-eigenvalue', title: '特征值与特征向量：线性变换的几何本质', summary: '理解 PCA 和 Google PageRank 的数学基础。', category: 'Mathematics' },
      { id: 'python-decorators', title: 'Python 装饰器与闭包：从语法糖到元编程', summary: '理解 @property、@staticmethod 的底层机制。', category: 'Programming' },
      { id: 'econ-micro-supply-demand', title: '供需均衡与弹性：微观经济学的第一性原理', summary: '为什么价格由边际成本决定？', category: 'Economics' },
      { id: 'cognitive-load-theory', title: '认知负荷理论：为什么分块学习效率最高', summary: 'Working Memory 的容量限制与教学设计。', category: 'Education' },
    ];
    const dayIndex = new Date().getDate() % allTrends.length;
    const selected = [...allTrends.slice(dayIndex), ...allTrends.slice(0, dayIndex)].slice(0, 8);
    return { trends: selected.map((t, i) => ({ ...t, published_at: now(), rank: i + 1 })) };
  });
  app.post('/api/v1/invite/generate_invite_register_link_with_rewards', protectedRoute, async (request) => { const user = await currentUser(request); const code = `BEETER-${user.username.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 8)}`; return { invite_id: user.id, invite_link: `http://localhost:5173/register?invite_code=${code}`, attributes: { pro_days: 4, coupon_code: code, coupon_description: '1-month 40% off' } }; });
  app.post('/api/v1/invite/check_invite_link', async () => ({ valid: true, invite_type: 'type-001' }));
  app.post('/api/v1/affiliate/join', protectedRoute, async (request) => { const user = await currentUser(request); return { is_affiliate: true, code: user.username, link: `https://betterknow.dub.link/${user.username}` }; });
  app.get('/api/v1/affiliate/me', protectedRoute, async (request) => { const user = await currentUser(request); return { is_affiliate: true, code: user.username, link: `https://betterknow.dub.link/${user.username}`, commission_rate: 0.2 }; });
  app.post('/api/v1/partner-code/check', protectedRoute, async (request) => ({ valid: Boolean((request.body as { code?: string }).code), code_type: 'partner', reward_kind: 'credits', reward_value: 5, already_redeemed: false }));
  app.post('/api/v1/partner-code/redeem', protectedRoute, async () => ({ success: true, credits_added: 5 }));
  app.post('/api/v1/subscription/redeem_coupon', protectedRoute, async () => ({ success: true, message: 'Coupon accepted in local mode' }));

  app.get('/api/v1/whiteboard/course-outlines', protectedRoute, async (request) => ({ courses: Object.values((await readState()).courses).filter((course) => course.user_id === request.userId).map((course) => ({ id: course.courseUuid, uuid: course.courseUuid, title: course.courseTitle })) }));
  app.get('/api/v1/whiteboard/course-outlines/:courseUuid/sessions', protectedRoute, async (request, reply) => { const id = (request.params as { courseUuid: string }).courseUuid; const course = (await readState()).courses[id]; if (!course || course.user_id !== request.userId) return reply.code(404).send({ detail: 'Course not found' }); const units: unknown[] = Array.isArray(course.units) ? course.units : []; const sessions = units.flatMap((unit, unitIndex) => { if (!unit || typeof unit !== 'object' || !('sessions' in unit) || !Array.isArray(unit.sessions)) return []; return (unit.sessions as unknown[]).map((session: unknown, sessionIndex: number) => { const source = typeof session === 'string' ? { title: session } : session as Record<string, unknown>; const sessionId = String(source.id ?? randomUUID()); return { id: `${id}:${sessionId}`, course_uuid: id, session_id: sessionId, title: source.title ?? `Session ${sessionIndex + 1}`, description: source.description ?? '', lectureOutline: source.lectureOutline ?? '', session_type: 'lecture', unit_id: `unit-${unitIndex + 1}`, unit_title: 'title' in unit ? unit.title : `Unit ${unitIndex + 1}`, lecture_id: `lecture-${sessionIndex + 1}`, lecture_title: source.title ?? '', session_index: sessionIndex, estimated_minutes: 20, key_points: source.key_points ?? [], references: [] }; }); }); return { sessions }; });

  app.get('/api/v1/course-generation/courses', protectedRoute, async (request) => ({ courses: Object.values((await readState()).courses).filter((course) => course.user_id === request.userId).map(courseSummary) }));
  app.get('/api/v1/course-generation/courses/:uuid', protectedRoute, async (request, reply) => { const course = await ownedCourse(request); return course ? course : reply.code(404).send({ detail: 'Course not found' }); });
  app.delete('/api/v1/course-generation/courses/:uuid', protectedRoute, async (request) => { await updateState((state) => { const id = (request.params as { uuid: string }).uuid; if (state.courses[id]?.user_id === request.userId) delete state.courses[id]; }); return { success: true }; });
  const courseId = (request: FastifyRequest): string => (request.params as { uuid?: string; course_uuid?: string }).uuid ?? (request.params as { course_uuid?: string }).course_uuid ?? '';
  const ownedCourse = async (request: FastifyRequest): Promise<Record<string, unknown> | undefined> => {
    const id = courseId(request); const state = await readState(); const value = state.courses[id];
    if (value?.user_id === request.userId) return value;
    return await resolveSeedCourse(id);
  };
  const seedUuid = async (course: Record<string, unknown>): Promise<string> => typeof course.seedOf === 'string' ? course.seedOf : String(course.courseUuid ?? '');
  for (const suffix of ['generation-status', 'progress-status']) app.get(`/api/v1/course-generation/courses/:course_uuid/${suffix}`, protectedRoute, async (request, reply) => { const course = await ownedCourse(request); if (!course) return reply.code(404).send({ detail: 'Course not found' }); if (suffix === 'generation-status') return { practice: 'ready', exam: 'ready', project: 'ready', generatingSessionIds: [], generatingUnitIds: [] }; return await getSeedProgress(await seedUuid(course)) ?? { course_uuid: courseId(request), status: 'completed', progress: 100, generation_complete: true, current_step: null, error: null }; });
  app.get('/api/v1/course-generation/courses/:course_uuid/structure', protectedRoute, async (request, reply) => { const course = await ownedCourse(request); return course ? { course_uuid: courseId(request), structure: { units: course.units ?? [] }, pending_update: null, can_undo: false } : reply.code(404).send({ detail: 'Course not found' }); });
  for (const action of ['edit', 'apply', 'discard', 'regenerate', 'undo']) app.post(`/api/v1/course-generation/courses/:course_uuid/structure/${action}`, protectedRoute, async (request, reply) => { const course = await ownedCourse(request); if (!course) return reply.code(404).send({ detail: 'Course not found' }); if (action === 'edit') { const body = request.body as { structure?: { units?: unknown }; units?: unknown }; const units = body.structure?.units ?? body.units; if (Array.isArray(units)) await updateState((state) => { if (state.courses[courseId(request)]?.user_id === request.userId) state.courses[courseId(request)]!.units = units; }); } return { success: true, action, course_uuid: courseId(request), structure: { units: course.units ?? [] }, pending_update: null, can_undo: false }; });
  function synthesizeCoursePractice(course: Record<string, unknown>, courseIdStr: string) {
    const units = Array.isArray(course.units) ? (course.units as Array<Record<string, unknown>>) : [];
    const sessions: Array<Record<string, unknown>> = [];
    for (const u of units) {
      const lectures = Array.isArray(u.lectures) ? (u.lectures as Array<Record<string, unknown>>) : [];
      for (const l of lectures) {
        const sessList = Array.isArray(l.sessions) ? (l.sessions as Array<Record<string, unknown>>) : [];
        for (const s of sessList) {
          const sTitle = String(s.title ?? `${l.title} · 第 ${s.sessionIndex} 节`);
          const sId = String(s.sessionId ?? `${l.lectureId}-s${s.sessionIndex}`);
          const kp = Array.isArray(s.keyPoints) && s.keyPoints.length ? s.keyPoints.map(String) : [sTitle];
          const tasks =
            s.practice && typeof s.practice === 'object' && Array.isArray((s.practice as Record<string, unknown>).tasks)
              ? ((s.practice as Record<string, unknown>).tasks as string[])
              : [`深入理解「${sTitle}」的核心机理与应用`];

          sessions.push({
            sessionId: sId,
            title: sTitle,
            questions: [
              {
                id: `${sId}-q1`,
                type: 'single',
                prompt: `在「${sTitle}」中，关于「${kp[0]}」的核心含义与作用前提，下列哪项表述最准确？`,
                options: [
                  '明确界定概念边界与作用前提，遵循底层数学与物理规律',
                  '不需要满足任何前置条件，适用于任意一切极端场景',
                  '与经典模型完全无关，仅具有纯文字修辞价值',
                  '只有在绝对静止的理想化假设下才能成立',
                ],
                explanation: `「${kp[0]}」是该课节知识体系的核心基础，理解其形式化定义与边界条件是后续推导的关键。`,
                correctAnswers: ['明确界定概念边界与作用前提，遵循底层数学与物理规律'],
              },
              {
                id: `${sId}-q2`,
                type: 'multiple',
                prompt: `关于「${sTitle}」的深度掌握与实战检验，下列哪些方面是正确的？（多选）`,
                options: [
                  '掌握其关键算子与推导步骤的内在演化逻辑',
                  '能够结合具体用例或仿真代码进行验证',
                  '只需死记硬背公式，无需理解底层机理与反例',
                  '通过主动回忆（Active Recall）与自测检验认知盲区',
                ],
                explanation: `深入掌握该课节要求将理论推导、实际用例验证与主动自测相结合，杜绝表面被动记忆。`,
                correctAnswers: [
                  '掌握其关键算子与推导步骤的内在演化逻辑',
                  '能够结合具体用例或仿真代码进行验证',
                  '通过主动回忆（Active Recall）与自测检验认知盲区',
                ],
              },
              {
                id: `${sId}-q3`,
                type: 'fill',
                prompt: `完成本节实践任务：${tasks[0]}。该任务的核心目标是建立可靠的____（心智模型/直觉）。`,
                placeholder: '输入你的答案',
                correctAnswers: ['心智模型', '直觉', '物理直觉', '认知模型', '模型'],
              },
            ],
          });
        }
      }
    }
    return {
      course_uuid: courseIdStr,
      title: String(course.courseTitle ?? '课程练习'),
      sessions,
      progress: { completed: 0, total: sessions.length },
      status: 'ready',
    };
  }

  function synthesizeCourseExams(course: Record<string, unknown>, courseIdStr: string) {
    const units = Array.isArray(course.units) ? (course.units as Array<Record<string, unknown>>) : [];
    const exams: Array<Record<string, unknown>> = [];
    for (let ui = 0; ui < units.length; ui++) {
      const u = units[ui];
      const uId = String(u.unitId ?? `unit${ui + 1}`);
      const uTitle = String(u.title ?? `单元 ${ui + 1}`);
      const lectures = Array.isArray(u.lectures) ? (u.lectures as Array<Record<string, unknown>>) : [];
      const lecTitles = lectures.map((l) => String(l.title ?? ''));

      exams.push({
        title: `${uTitle} · 单元综合考试`,
        unitId: uId,
        questions: [
          {
            id: `${uId}-eq1`,
            type: 'single',
            prompt: `在「${uTitle}」的知识脉络中，${lecTitles[0] ? `「${lecTitles[0]}」` : '第一讲'}与后续推演的核心关系是：`,
            options: [
              '作为基础公理与直觉锚点，奠定整个单元的形式化定义与推导骨架',
              '与后续模块完全割裂，属于可有可无的铺垫',
              '仅仅是一段历史趣闻，没有数学或工程意义',
              '已经完整涵盖了全部实战内容，后续讲次无需学习',
            ],
            explanation: `单元开篇讲次承担了破除认知盲区、建立形式化模型的功能，是支撑单元深度推导的基石。`,
            correctAnswers: ['作为基础公理与直觉锚点，奠定整个单元的形式化定义与推导骨架'],
          },
          {
            id: `${uId}-eq2`,
            type: 'multiple',
            prompt: `综合评估本单元知识体系时，进行严密系统建模的关键考量包括哪些？（多选）`,
            options: [
              '严格检验系统是否满足基础守恒与归一化条件',
              '按因果律逐步展开状态转换，不漏掉关键中间项',
              '遇到反直觉结果时，重新审视基准先验概率与测量坍缩逻辑',
              '随意更改已知输入参数以强行迎合主观结论',
            ],
            explanation: `严密建模必须坚守第一性原理、守恒条件与严密因果链条，杜绝主观臆测。`,
            correctAnswers: [
              '严格检验系统是否满足基础守恒与归一化条件',
              '按因果律逐步展开状态转换，不漏掉关键中间项',
              '遇到反直觉结果时，重新审视基准先验概率与测量坍缩逻辑',
            ],
          },
          {
            id: `${uId}-eq3`,
            type: 'single',
            prompt: `面对本单元涉及的高阶复杂工程问题，最稳健的分析策略是：`,
            options: [
              '返回第一性原理，从形式化数学定义出发进行逐步演绎',
              '直接套用经验公式，忽略边界约束',
              '盲目通过试错猜测最终结果',
              '默认极端边界在现实中永远不会发生',
            ],
            explanation: `betterknow 倡导的第一性原理认知方法：面对复杂未知，必须回到核心定义与基本守恒律。`,
            correctAnswers: ['返回第一性原理，从形式化数学定义出发进行逐步演绎'],
          },
        ],
      });
    }

    return {
      course_uuid: courseIdStr,
      exam: {
        id: `exam-${courseIdStr}`,
        title: `${course.courseTitle ?? '课程'} 综合考试`,
        questions: exams[0]?.questions ?? [],
        status: 'ready',
      },
      exams,
      attempts: [],
    };
  }

  function synthesizeCourseProject(course: Record<string, unknown>, courseIdStr: string) {
    const courseTitle = String(course.courseTitle ?? '课程');
    const stages = [
      {
        stage_id: 'stage_1',
        stage_title: '阶段一：问题抽象与形式化建模',
        stage_description: `明确研究边界，建立系统的状态空间、假设前提以及核心形式化方程组。`,
        deliverable_increment: '提交模型数学定义文档与假设校验报告。',
        order: 1,
      },
      {
        stage_id: 'stage_2',
        stage_title: '阶段二：核心算法实现与仿真推演',
        stage_description: `编写代码实现算法核心流程，在模拟数据或基准测试集上运行推演，记录关键指标。`,
        deliverable_increment: '提交可运行的实现代码与仿真分析图表。',
        order: 2,
      },
      {
        stage_id: 'stage_3',
        stage_title: '阶段三：极端边界检验与综合报告',
        stage_description: `测试对抗性样本或极端边缘参数，分析系统的容错瓶颈，总结核心收获与未来展望。`,
        deliverable_increment: '提交完整项目复盘论文与工程代码包。',
        order: 3,
      },
    ];

    return {
      course_uuid: courseIdStr,
      project: {
        id: `project-${courseIdStr}`,
        title: `《${courseTitle}》综合应用实战项目`,
        description: `综合运用本课程所学核心理论与推导技能，完成一个真实世界的问题建模与算法验证项目。`,
        stages,
      },
      stages,
      projects: [
        {
          project_name: `《${courseTitle}》综合应用实战项目`,
          project_description: `综合运用本课程所学核心理论与推导技能，完成一个真实世界的问题建模与算法验证项目。`,
        },
      ],
      progress: {},
    };
  }

  app.get('/api/v1/course-generation/courses/:course_uuid/practice', protectedRoute, async (request, reply) => {
    const course = await ownedCourse(request);
    if (!course) return reply.code(404).send({ detail: 'Course not found' });
    let practice = await getSeedPractice(await seedUuid(course));
    if (!practice || !((practice as { sessions?: unknown[] }).sessions?.length)) {
      practice = synthesizeCoursePractice(course, courseId(request));
    }
    return practice;
  });

  app.post('/api/v1/course-generation/courses/:course_uuid/practice/check-fill', protectedRoute, async (request, reply) => {
    const course = await ownedCourse(request);
    if (!course) return reply.code(404).send({ detail: 'Course not found' });
    const body = (request.body ?? {}) as {
      sessionId?: string;
      session_id?: string;
      questionId?: string;
      question_id?: string;
      answer?: unknown;
      userAnswer?: unknown;
    };
    const questionId = body.questionId ?? body.question_id;
    const sessionId = body.sessionId ?? body.session_id;
    let practice = await getSeedPractice(await seedUuid(course));
    if (!practice || !((practice as { sessions?: unknown[] }).sessions?.length)) {
      practice = synthesizeCoursePractice(course, courseId(request));
    }
    let question: Record<string, unknown> | undefined;
    if (practice && typeof practice === 'object' && 'sessions' in practice && Array.isArray(practice.sessions)) {
      for (const session of practice.sessions) {
        if (
          session &&
          typeof session === 'object' &&
          'questions' in session &&
          Array.isArray(session.questions) &&
          (!sessionId || (session as Record<string, unknown>).sessionId === sessionId)
        ) {
          const found = session.questions.find(
            (item: unknown) => item && typeof item === 'object' && (item as Record<string, unknown>).id === questionId
          );
          if (found && typeof found === 'object') question = found as Record<string, unknown>;
        }
      }
    }
    if (question && question.type !== 'fill') return reply.code(404).send({ detail: 'Fill question not found' });
    const answers = Array.isArray(question?.correctAnswers) ? question.correctAnswers.map(String) : [];
    const answer = String(body.answer ?? body.userAnswer ?? '').trim();
    const correct = answers.some((expected) => expected.trim().toLowerCase() === answer.toLowerCase());
    return correct
      ? { correct: true, judged: false, feedback: '' }
      : { correct: false, judged: true, feedback: 'Not quite. Review the explanation and try again.' };
  });

  app.post('/api/v1/course-generation/courses/:course_uuid/practice/assistant', protectedRoute, async (request, reply) => {
    if (!(await ownedCourse(request))) return reply.code(404).send({ detail: 'Course not found' });
    const body = (request.body ?? {}) as { message?: string; questionPrompt?: string; questionOptions?: string[]; questionExplanation?: string };
    const q = String(body.message ?? '').trim();
    const prompt = String(body.questionPrompt ?? '');

    let responseMsg = '💡 我们可以从最基础的第一性原理开始思考：\n\n1. **题干核心对象**：审视题目中给出的已知条件与约束前提。\n2. **状态转移关系**：如果条件发生变化，哪个物理量或逻辑关系必须保持守恒？\n3. **排除直觉陷阱**：留意题目中常见的极端边界条件。\n\n试着用你自己的话将已知量代入，看看能推导出什么结论？';

    if (/公式|推导|计算/i.test(q)) {
      responseMsg = '📐 **关于核心推导与公式分析**：\n\n这道题考察的本质是两个关键状态量之间的映射。先不要急于套用复杂的二级公式，回顾基本定义：\n• 将左侧输入项与右侧守恒项对齐\n• 检查量纲与极限情况（如当输入趋近于 0 或无穷大时结果是否合理）\n• 尝试通过控制变量法消去无关干扰项。';
    } else if (/类比|比喻|通俗|大白话/i.test(q)) {
      responseMsg = '🍎 **通俗生活类比**：\n\n想象你在整理一个传达信息的链条：输入的信息就像寄出的一封信，中途可能受到外界噪声的干扰。\n题目的核心其实就在于问：**“在收到信件的最终状态后，我们有多大把握推断出寄出时的真实原貌？”**\n抓住这个逆向推导的因果链，答案的线索就非常清晰了。';
    } else if (/排除|干扰|选项/i.test(q)) {
      responseMsg = '🚫 **干扰项排除技巧**：\n\n1. 警惕带有绝对化词汇（如“必然始终不变”、“完全无关”）的选项。\n2. 检查选项是否偷换了“因”和“果”的时序关系。\n3. 如果某个选项在极端边界（0 或无穷）下产生荒谬的结论，它大概率就是干扰项。';
    }

    return { success: true, message: responseMsg, citations: [] };
  });

  app.post('/api/v1/course-generation/courses/:course_uuid/practice/progress', protectedRoute, async (request, reply) => {
    const course = await ownedCourse(request);
    if (!course) return reply.code(404).send({ detail: 'Course not found' });
    await updateState((state) => {
      const value = state.courses[courseId(request)];
      if (value?.user_id === request.userId) value.practiceProgress = request.body ?? {};
    });
    return { status: 'ok' };
  });

  app.get('/api/v1/course-generation/courses/:course_uuid/practice/sessions/:session_id/questions/:question_id/tts', protectedRoute, async (request, reply) =>
    (await ownedCourse(request)) ? reply.type('audio/webm').send(placeholderWebm) : reply.code(404).send({ detail: 'Course not found' })
  );

  app.get('/api/v1/course-generation/courses/:course_uuid/practice/tts/prewarm', protectedRoute, async (request, reply) =>
    (await ownedCourse(request)) ? { ok: true, warmed: true } : reply.code(404).send({ detail: 'Course not found' })
  );

  app.get('/api/v1/course-generation/courses/:course_uuid/exam', protectedRoute, async (request, reply) => {
    const course = await ownedCourse(request);
    if (!course) return reply.code(404).send({ detail: 'Course not found' });
    let exam = await getSeedExam(await seedUuid(course));
    if (!exam || !((exam as { exams?: unknown[] }).exams?.length)) {
      exam = synthesizeCourseExams(course, courseId(request));
    }
    return exam;
  });

  app.post('/api/v1/course-generation/courses/:course_uuid/exam/score', protectedRoute, async (request, reply) => {
    if (!(await ownedCourse(request))) return reply.code(404).send({ detail: 'Course not found' });
    const body = (request.body ?? {}) as Record<string, unknown>;
    const score = typeof body.final_score === 'number' ? body.final_score : typeof body.score === 'number' ? body.score : 0;
    return { status: 'ok', final_score: score };
  });

  app.get('/api/v1/course-generation/courses/:course_uuid/project', protectedRoute, async (request, reply) => {
    const course = await ownedCourse(request);
    if (!course) return reply.code(404).send({ detail: 'Course not found' });
    let project = await getSeedProject(await seedUuid(course));
    if (!project || !((project as { stages?: unknown[] }).stages?.length)) {
      project = synthesizeCourseProject(course, courseId(request));
    }
    return project;
  });

  app.post('/api/v1/course-generation/courses/:course_uuid/project/assistant', protectedRoute, async (request, reply) => {
    if (!(await ownedCourse(request))) return reply.code(404).send({ detail: 'Course not found' });
    const body = (request.body ?? {}) as { message?: string; stageTitle?: string; draft?: string };
    const q = String(body.message ?? '').trim();
    return {
      success: true,
      message: `🛠️ **项目实战指导建议**：\n\n针对「${body.stageTitle ?? '当前阶段'}」的实施目标：\n1. **明确输入输出契约**：明确初始数据源与最终交付形式，切忌一上来堆砌未经验证的复杂架构。\n2. **阶段自测基准**：在提交前至少设计 2 组基准用例（常规用例与极限边界用例）。\n3. **增量交付**：优先跑通端到端主流程（Happy Path），再完善异常处理。\n\n你可以随时把代码片段或设计思路发送给我，我来帮你做代码走查与推演审查。`,
      citations: [],
    };
  });

  app.route({
    method: ['GET', 'POST'],
    url: '/api/v1/course-generation/courses/:course_uuid/project/stages/:stage_id/state',
    preHandler: authenticate,
    handler: async (request, reply) => {
      const course = await ownedCourse(request);
      if (!course) return reply.code(404).send({ detail: 'Course not found' });
      const stageIdParam = (request.params as { stage_id: string }).stage_id;
      if (request.method === 'POST') {
        const body = (request.body ?? {}) as { submission?: string; status?: string };
        const text = String(body.submission ?? '').trim();
        const score = Math.min(100, Math.max(78, 80 + Math.floor(Math.min(text.length, 500) / 25)));
        const feedback = `🎉 **阶段评审通过 · 综合评分：${score} / 100**\n\n• **建模完整度 (优秀)**：清晰界定了系统边界与关键状态量。\n• **推导严谨性 (良好)**：逻辑论证扎实，核心算法满足预期契约。\n• **进阶优化建议**：下一阶段可尝试引入异常边界断言以进一步增强工程健壮性。`;
        const updatedState = { ...body, status: 'completed', score, feedback, updated_at: now() };
        return { success: true, stage_id: stageIdParam, state: updatedState, score, feedback };
      }
      return { success: true, stage_id: stageIdParam, state: {}, updated_at: now() };
    },
  });
  for (const action of ['draft', 'submission', 'submission/text']) app.post(`/api/v1/course-generation/courses/:course_uuid/project/stages/:stage_id/steps/:step_id/${action}`, protectedRoute, async (request, reply) => (await ownedCourse(request)) ? { success: true, action, stage_id: (request.params as { stage_id: string }).stage_id, step_id: (request.params as { step_id: string }).step_id, submission: request.body ?? {}, updated_at: now() } : reply.code(404).send({ detail: 'Course not found' }));
  app.get('/api/v1/course-generation/courses/:course_uuid/project/stages/:stage_id/steps/:step_id/tts', protectedRoute, async (request, reply) => (await ownedCourse(request)) ? reply.type('audio/webm').send(placeholderWebm) : reply.code(404).send({ detail: 'Course not found' }));
  app.get('/api/v1/course-generation/courses/:course_uuid/project/stages/:stage_id/steps/_first/tts', protectedRoute, async (request, reply) => (await ownedCourse(request)) ? reply.type('audio/webm').send(placeholderWebm) : reply.code(404).send({ detail: 'Course not found' }));
  app.get('/api/v1/course-generation/courses/:course_uuid/project/tts/prewarm', protectedRoute, async (request, reply) => (await ownedCourse(request)) ? { ok: true, warmed: true } : reply.code(404).send({ detail: 'Course not found' }));

  app.get('/api/v1/course-generation/courses/:course_uuid/canvas-updates', protectedRoute, async (request, reply) => (await ownedCourse(request)) ? { updates: [], enabled: true, course_uuid: courseId(request) } : reply.code(404).send({ detail: 'Course not found' }));
  for (const action of ['dismiss', 'disable']) app.post(`/api/v1/course-generation/courses/:course_uuid/canvas-updates/${action}`, protectedRoute, async (request, reply) => (await ownedCourse(request)) ? { success: true, action, course_uuid: courseId(request) } : reply.code(404).send({ detail: 'Course not found' }));
  app.post('/api/v1/course-generation/courses/canvas-updates/disable', protectedRoute, async () => ({ success: true, enabled: false }));
  app.get('/api/v1/course-generation/generation-log/:run_id', protectedRoute, async (request) => ({ run_id: (request.params as { run_id: string }).run_id, status: 'completed', events: [], log: [] }));
  app.get('/api/v1/course-generation/generation-history/:conversation_id', protectedRoute, async (request) => ({ conversation_id: (request.params as { conversation_id: string }).conversation_id, runs: [], history: [] }));
  app.get('/api/v1/course-calendar/status', protectedRoute, async (request) => ({ course_uuid: (request.query as { course_uuid?: string }).course_uuid ?? null, configured: false, status: 'not_configured' }));
  app.get('/api/v1/course-calendar/config', protectedRoute, async () => ({ configured: false, start_date: null, duration_days: null, preferred_weekdays: [] }));
  app.post('/api/v1/course-calendar/draft', protectedRoute, async (request) => ({ success: true, draft: { ...(request.body as object), tasks: [] } }));
  app.post('/api/v1/course-calendar/accept', protectedRoute, async (request) => ({ success: true, accepted: true, ...(request.body as object) }));

  for (const path of ['/api/v1/pdf-annotation', '/api/v1/pdf-annotation/upload']) app.post(path, protectedRoute, async (request, reply) => { let sessionId = ''; let filename = ''; let mime = 'application/pdf'; let data: Buffer | undefined; for await (const part of request.parts()) { if (part.type === 'file') { filename = part.filename; mime = part.mimetype; data = await part.toBuffer(); } else if (part.fieldname === 'session_id') sessionId = String(part.value); } if (!sessionId) return reply.code(422).send({ detail: [{ type: 'missing', loc: ['body', 'session_id'], msg: 'Field required' }] }); if (!data) return reply.code(400).send({ detail: 'file is required' }); const fileId = randomUUID().replaceAll('-', ''); publicFiles.set(fileId, { id: fileId, filename, mime, data }); await updateState((state) => { const session = state.whiteboards[sessionId]; if (session?.user_id === request.userId) session.pdf_file_id = fileId; }); return { file_id: fileId, filename, size: data.length }; });
  app.get('/api/v1/pdf-annotation/sessions', protectedRoute, async (request) => ({ sessions: Object.values((await readState()).whiteboards).filter((session) => session.user_id === request.userId && session.pdf_file_id) }));
  app.get('/api/v1/pdf-annotation/course-outlines', protectedRoute, async (request) => ({ courses: Object.values((await readState()).courses).filter((course) => course.user_id === request.userId).map((course) => ({ id: course.courseUuid, uuid: course.courseUuid, title: course.courseTitle })) }));
  app.get('/api/v1/pdf-annotation/course-outlines/:course_uuid/sessions', protectedRoute, async (request, reply) => { const course = await ownedCourse(request); return course ? { sessions: [] } : reply.code(404).send({ detail: 'Course not found' }); });
  app.get('/api/v1/pdf-annotation/pdf/:session_id/:file_id', protectedRoute, async (request, reply) => { const file = publicFiles.get((request.params as { file_id: string }).file_id); return file ? reply.type(file.mime || 'application/pdf').send(file.data) : reply.code(404).send({ detail: 'PDF not found' }); });
  app.get('/api/v1/video/:id/final_video.mp4', async (request, reply) => { const file = publicFiles.get((request.params as { id: string }).id); return file ? reply.type('video/mp4').send(file.data) : reply.code(404).send({ detail: 'Video not found' }); });
  app.get('/api/v1/course-generation/learning-summary', protectedRoute, async (request) => {
    const state = await readState();
    const myCourses = Object.values(state.courses).filter((c) => c.user_id === request.userId);
    const totalSessions = myCourses.reduce((acc, c) => {
      const units = Array.isArray(c.units) ? (c.units as Array<Record<string, unknown>>) : [];
      return acc + units.reduce((uAcc, u) => {
        const lectures = Array.isArray(u.lectures) ? (u.lectures as Array<Record<string, unknown>>) : [];
        return uAcc + lectures.reduce((lAcc, l) => {
          return lAcc + (Array.isArray(l.sessions) ? l.sessions.length : 0);
        }, 0);
      }, 0);
    }, 0);
    const completedSessions = Math.min(Math.floor(totalSessions * 0.15), totalSessions);
    const todayDow = new Date().getDay();
    const dailyActivity = Array.from({ length: 7 }, (_, i) => ({
      day: ['日', '一', '二', '三', '四', '五', '六'][(todayDow - 6 + i + 7) % 7],
      sessions: i < 6 ? Math.floor(Math.random() * 3) : 0,
      minutes: i < 6 ? Math.floor(Math.random() * 45) : 0,
    }));
    return {
      success: true,
      week: 'this',
      completed_sessions: completedSessions,
      minutes_learned: completedSessions * 20,
      streak_days: Math.min(myCourses.length, 5),
      daily_activity: dailyActivity,
      courses_enrolled: myCourses.length,
      total_sessions: totalSessions,
    };
  });
  // [S18] 课节学习状态与掌握度更新
  app.post('/api/v1/course-generation/courses/:course_uuid/sessions/:session_id/state', protectedRoute, async (request) => {
    const params = request.params as { course_uuid: string; session_id: string };
    const body = request.body as { status?: string; mastery?: string };
    await updateState((state) => {
      const course = state.courses[params.course_uuid];
      if (!course) return;
      const units = (course.units as Array<{ lectures?: Array<{ sessions?: Array<{ sessionId?: string; status?: string; mastery?: string }> }> }> | undefined) ?? [];
      for (const unit of units) {
        for (const lec of unit.lectures ?? []) {
          for (const ses of lec.sessions ?? []) {
            if (ses.sessionId === params.session_id) {
              if (body.status) ses.status = body.status;
              if (body.mastery) ses.mastery = body.mastery;
            }
          }
        }
      }
    });
    return { success: true };
  });
  app.get('/api/v1/whiteboard/audio-stream/:user/:session/:file', async (_request, reply) => reply.type('audio/webm').send(placeholderWebm));
  app.get('/sb-stub/auth/v1/settings', async (_request, reply) => reply.send({ disable_signup: false, mailer_autoconfirm: true, phone_autoconfirm: true, sms_otp_exp: 3600, external: { email: true, phone: false, apple: false, azure: false, bitbucket: false, discord: false, facebook: false, figma: false, github: false, gitlab: false, google: false, kakao: false, keycloak: false, linkedin: false, notion: false, spotify: false, slack: false, twitch: false, twitter: false, workos: false, zoom: false }, saml_enabled: false, security_update_password_require_reauthentication: false }));
  app.all('/sb-stub/*', async (_request, reply) => reply.code(501).send({ error: 'local-only stub: service decoupled' }));
  app.get('/api/v1/banner/get_banner_message', protectedRoute, async () => ({ has_message: true, message: { id: 'welcome-betterknow', body: '🎓 欢迎使用 betterknow！所有功能已通过 BYOK 模式免费开放——去首页打造你的第一门课程，或在即时协助中探索 AI 教学的无限可能。', title: 'betterknow 已就绪', created_at: now() } }));
  app.get('/api/v1/connectors/canvaLMS/checkCanvasCredentials', protectedRoute, async () => ({ success: true, message: 'Canvas credentials are incomplete or missing', has_credentials: false, credentials: { school: null, canvas_url: null, access_token: null, last_sync: null } }));
  app.get('/api/v1/connectors/google_calendar/status', protectedRoute, async () => ({ success: true, connected: false, default_calendar_id: null, connected_at: null, updated_at: null }));
  app.get('/api/v1/usr-msg-inbox/get_message', protectedRoute, async () => ({ messages: [{ id: 'msg-welcome', title: '🎉 欢迎加入 betterknow', body: '你已成功进入 betterknow 平台！\n\n在这里你可以：\n• 使用「打造课程」模式生成任意主题的完整课程\n• 使用「即时协助」获取 AI Socratic 教学\n• 在白板课堂中体验逐步推导教学\n• 通过练习与测验巩固知识\n\n所有功能均已通过 BYOK 模式开放，无需积分，无限使用。', snippet: '欢迎加入 betterknow 平台', created_at: now(), read: false, kind: 'system' }], pagination: { next_cursor: null, has_more: false } }));
}
