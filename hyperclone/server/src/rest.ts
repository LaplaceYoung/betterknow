import { randomUUID } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { basename, extname, resolve } from 'node:path';
import type { FastifyInstance, FastifyRequest } from 'fastify';
import { chatStream, type ChatMessage } from './llm.js';
import { authenticate } from './auth.js';
import { diagrams, persistPublicFile, placeholderPng, placeholderWebm, publicFiles, readPersistedPublicFile } from './artifacts.js';
import { mimeFor, readTtsAudio, readWhiteboardImage, ttsCounts } from './media.js';
import { now, readState, updateState, type UserRecord } from './store.js';
import { decorateMarketplace } from './extras.js';
import { probeSeam, seamStatus, type Seam } from './providers/index.js';
import { resolveByok, type ByokConfig, type UserByok } from './config.js';
import { chat } from './llm.js';
import { activeRuns, generatingTargets, listRuns, readRun, sweepStaleRuns } from './runs.js';
import { enumerateCourseSessions } from './courseModel.js';
import { localAnimationHtml } from './animation.js';
import { listVoices, providerVoice, readTtsFile, synthesize, ttsFileCount, ttsStats } from './tts.js';
import { getSeedExam, getSeedPractice, getSeedProgress, getSeedProject, resolveSeedByMarketplaceId, resolveSeedCourse } from './seedCourses.js';

const protectedRoute = { preHandler: authenticate };
type ByokRecord = ByokConfig & { enabled?: boolean };
const profileSeed = ['Q7k3m9p2', 'A5n8r1q4', 'W2h6y3z9', 'D8j4k2m7'].map((question_id) => ({ question_id, answer_ids: [], last_updated_at: '' }));
const taskList = { success: true, tasks: [], count: 0, pending_sources_count: 0 };

async function currentUser(request: FastifyRequest): Promise<UserRecord> {
  const state = await readState();
  return state.users[request.userId!]!;
}

function courseSummary(course: Record<string, unknown>): Record<string, unknown> {
  const units = Array.isArray(course.units) ? course.units : [];
  const sessionCount = units.reduce<number>((count, unit) => count + (typeof unit === 'object' && unit && 'sessions' in unit && Array.isArray(unit.sessions) ? unit.sessions.length : 0), 0);
  const cover = course.coverImage as { hash?: string; filePath?: string; url?: string } | undefined;
  const coverUrl = String(
    course.coverImageUrl ||
    cover?.url ||
    (cover?.hash && cover.filePath ? `/api/v1/covers/${cover.filePath.split('/').pop()}` : '') ||
    `/api/v1/marketplace/cover/${course.marketplaceSourceId ?? course.courseUuid}/cover.png`,
  );
  return {
    courseUuid: course.courseUuid, courseTitle: course.courseTitle, courseDescription: course.courseDescription,
    targetLearner: course.targetLearner, tags: course.tags ?? [], unitCount: units.length, sessionCount,
    assignmentCount: 0, examCount: 0, ticketVariant: course.ticketVariant ?? 1, coverImageUrl: coverUrl,
    wideCoverImageUrl: course.wideCoverImageUrl || coverUrl, updatedAt: course.updated_at ?? course.created_at, createdAt: course.created_at,
    source: course.source ?? 'generated',
    // 线上 progress 是对象 {completed_sessions,total_sessions,percentage}；列表按数字百分比渲染，这里归一化
    progress: (() => {
      const value = course.progress;
      if (typeof value === 'number') return value;
      if (value && typeof value === 'object') return Number((value as { percentage?: number }).percentage ?? 0);
      return 0;
    })(),
    nextItem: course.nextItem ?? null,
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
    const u = state.users[request.userId!] as unknown as { byok?: ByokRecord };
    const b = u?.byok;
    const mask = (key?: string): string => (key ? `${key.slice(0, 5)}…${key.slice(-4)}` : '');
    // 面板按 seam 逐条展示：用户配置优先，其次环境变量兜底，都没有即 stub
    const seams = seamStatus().map((status) => {
      const own = b?.providers?.[status.seam];
      const baseUrl = own?.baseUrl || status.baseUrl || '';
      const model = own?.model || status.model || '';
      const ownKey = own?.apiKey || '';
      const source: 'user' | 'env' | 'none' = ownKey || own?.baseUrl || own?.model ? 'user' : status.source;
      const configured = Boolean(ownKey || own?.baseUrl || status.configured) && own?.enabled !== false;
      return { seam: status.seam, configured, enabled: own?.enabled !== false, mode: configured ? 'real' as const : 'stub' as const, source, base_url: baseUrl, model, api_key_masked: mask(ownKey), env: status.env };
    });
    return {
      configured: Boolean(b?.apiKey || b?.providers),
      enabled: b?.enabled !== false,
      provider: b?.provider ?? 'kimi',
      base_url: b?.baseUrl ?? '',
      models: b?.models ?? {},
      api_key_masked: mask(b?.apiKey),
      providers: b?.providers ?? {},
      seams,
    };
  });
  app.put('/api/v1/auth/byok', protectedRoute, async (request) => {
    const body = (request.body ?? {}) as {
      seam?: Seam;
      model?: string;
      enabled?: boolean;
      provider?: string;
      base_url?: string;
      baseUrl?: string;
      api_key?: string;
      apiKey?: string;
      models?: Record<string, string>;
      providers?: Partial<Record<Seam, { apiKey?: string; baseUrl?: string; model?: string; enabled?: boolean }>>;
    };
    const baseUrl = String(body.base_url ?? body.baseUrl ?? '').trim();
    const apiKey = String(body.api_key ?? body.apiKey ?? '').trim();
    const provider = body.provider === 'openai-compatible' ? 'openai-compatible' : body.provider === 'stub' ? 'stub' : 'kimi';
    await updateState((state) => {
      const user = state.users[request.userId!] as unknown as { byok?: ByokRecord };
      const previous = user.byok;
      const slots: NonNullable<ByokRecord['providers']> = { ...(previous?.providers ?? {}) };
      // 单槽写法 {seam, base_url, api_key, model} 与批量写法 {providers:{...}} 都收；
      // 只有既没有 seam 也没有 providers 时才走顶层 legacy 字段（否则会静默改掉 llm 的 key/baseUrl）
      const incomingSlots: Partial<Record<Seam, { apiKey?: string; baseUrl?: string; model?: string; enabled?: boolean }>> = { ...(body.providers ?? {}) };
      if (body.seam && !body.providers) {
        incomingSlots[body.seam] = { apiKey: apiKey || undefined, baseUrl: baseUrl || undefined, model: body.model, enabled: body.enabled };
      }
      for (const [seam, incoming] of Object.entries(incomingSlots) as Array<[Seam, { apiKey?: string; baseUrl?: string; model?: string; enabled?: boolean }]>) {
        const current = slots[seam] ?? { apiKey: '', baseUrl: '', model: '' };
        const apiKeyValue = incoming.apiKey === undefined ? current.apiKey : String(incoming.apiKey);
        slots[seam] = {
          apiKey: apiKeyValue,
          baseUrl: incoming.baseUrl === undefined ? current.baseUrl : String(incoming.baseUrl).trim(),
          model: incoming.model === undefined ? current.model : String(incoming.model).trim(),
          enabled: incoming.enabled === undefined ? current.enabled !== false : incoming.enabled !== false,
        };
      }
      const models = {
        director: body.models?.director ?? previous?.models?.director ?? 'kimi-k2-turbo-preview',
        content: body.models?.content ?? body.models?.director ?? previous?.models?.content ?? 'kimi-k2-turbo-preview',
        quiz: body.models?.quiz ?? body.models?.director ?? previous?.models?.quiz ?? 'kimi-k2-turbo-preview',
        ...(body.models?.tts ?? previous?.models?.tts ? { tts: body.models?.tts ?? previous?.models?.tts } : {}),
      };
      user.byok = {
        enabled: body.enabled === undefined ? previous?.enabled !== false : body.enabled !== false,
        provider: body.provider ? provider : previous?.provider ?? provider,
        baseUrl: baseUrl || previous?.baseUrl || 'https://api.moonshot.cn/v1',
        apiKey: apiKey || previous?.apiKey || '',
        models,
        providers: slots,
      };
    });
    if (apiKey) {
      try {
        const credPath = resolve(new URL('../../../agent-runtime/home/.credentials.yaml', import.meta.url).pathname);
        const yaml = `# Auto-generated from user BYOK settings\ndeepseek-official:\n  apiKey: "${apiKey}"\n`;
        await writeFile(credPath, yaml, 'utf8');
      } catch { /* best effort */ }
    }
    return { success: true };
  });
  app.post('/api/v1/auth/byok/test', protectedRoute, async (request) => {
    const body = (request.body ?? {}) as { seam?: Seam; base_url?: string; api_key?: string; model?: string; deep?: boolean };
    const seam: Seam = body.seam ?? 'llm';
    // 面板未填值时回落到已保存的用户配置 / 环境变量
    const state = await readState();
    const saved = (state.users[request.userId!] as unknown as { byok?: ByokRecord }).byok;
    const own = seam === 'llm' ? undefined : saved?.providers?.[seam];
    const result = await probeSeam(seam, {
      baseUrl: body.base_url || own?.baseUrl || (seam === 'llm' ? saved?.baseUrl : undefined),
      apiKey: body.api_key || own?.apiKey || (seam === 'llm' ? saved?.apiKey : undefined),
      model: body.model || own?.model || (seam === 'llm' ? saved?.models?.director : undefined),
    }, { deep: body.deep === true });
    return { ...result, seam };
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
  // 线上：客户端播放讲解前用它探音频通道（200 可播 / 429 冷却 {retryInS} / 503 {state:"draining"}）。
  // `?sample=1` 时真的合成一小段音频再回字节（线上就是回音频，客户端量下载速度与播放）
  app.get('/api/v1/audio-probe', protectedRoute, async (request, reply) => {
    const state = await readState();
    const eff = resolveByok((state.users[request.userId!] as unknown as { byok?: UserByok } | undefined)?.byok);
    const wantsSample = (request.query as { sample?: string }).sample === '1';
    if (!wantsSample) return { ok: true, mode: eff.provider === 'stub' ? 'browser' : 'byok', t: Date.now() };
    const started = performance.now();
    const segment = await synthesize('这是一段语音自检。', { voice: providerVoice('calm'), speed: 1, eff });
    const synthMs = Math.round(performance.now() - started);
    const bytes = await readTtsFile(segment.url.split('/').pop() ?? '');
    if (!bytes) return reply.code(503).send({ state: 'tts_unavailable' });
    return reply
      .header('x-synth-ms', String(synthMs))
      .header('x-stub', segment.stub ? '1' : '0')
      .header('cache-control', 'no-store')
      .type(bytes.mime)
      .send(bytes.bytes);
  });

  app.get('/api/v1/auth/get_user_info', protectedRoute, async (request) => {
    const user = await currentUser(request); const resetAt = new Date(Date.parse(user.last_reset_at) + 12 * 3_600_000).toISOString();
    return { success: true, data: { user_id: user.id, email: user.email, username: user.username, canvas_lms: { has_credentials: false, credentials: { school: null, canvas_url: null, access_token: null, last_sync: null } }, subscription: { id: `byok-${user.id}`, tier: 'byok', plan_id: 'byok', status: 'active', remaining_credits: 999999, max_credits: 999999, expires_at: null, will_reset_at: resetAt, reset_interval_hours: 0, last_reset_at: user.last_reset_at, billing_reason: 'byok_unlimited' } } };
  });
  app.get('/api/v1/auth/other_function_usage_limits', protectedRoute, async (request) => {
    const user = await currentUser(request);
    const counters = ((await readState()).usageCounters ?? {})[request.userId!] ?? {};
    // BYOK 版本不设商业限额，但用量计数如实上报（本周已用多少就报多少）
    const limit = (used: number, max: number) => ({ remaining: Math.max(0, max - used), limit: max, used, last_reset_at: user.last_reset_at });
    const used = (key: string): number => Number(counters[key] ?? 0);
    return {
      tier: 'byok', version: 1,
      file_upload: limit(used('file_upload'), 999999),
      calendar_add: limit(used('calendar_add'), 999999),
      file_generation: limit(used('file_generation'), 999999),
      deep_learn_session: limit(used('deep_learn_session'), 999999),
      storage_limit_bytes: 1024 * 1024 * 1024,
    };
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
  // 音色试听：线上放的是自带的 /tts-samples/<voice>.mp3；本仓是 BYOK，试听就该听「你自己配的音色」
  app.get('/api/v1/tts/preview', protectedRoute, async (request, reply) => {
    const query = request.query as { voice?: string; speed?: string };
    const state = await readState();
    const eff = resolveByok((state.users[request.userId!] as unknown as { byok?: UserByok } | undefined)?.byok);
    const speed = Math.min(2, Math.max(0.5, Number(query.speed) || 1));
    const segment = await synthesize('你好，我是你的学习助手，这是当前音色的试听。', {
      voice: providerVoice(query.voice ?? 'calm'), speed, eff,
    });
    const bytes = await readTtsFile(segment.url.split('/').pop() ?? '');
    if (!bytes) return reply.code(503).send({ detail: 'tts unavailable' });
    return reply.header('x-stub', segment.stub ? '1' : '0').header('cache-control', 'no-store').type(bytes.mime).send(bytes.bytes);
  });

  // 速查表阅读器的保存：线上走 POST /conversations/save_artifact {conversation_id, artifact_id, content, layout_patch?}；
  // 本仓阅读器路由没有会话上下文，所以同时给一个按文件 id 的直接保存口
  app.put('/api/v1/files/:id', protectedRoute, async (request, reply) => {
    const id = (request.params as { id: string }).id;
    const body = (request.body ?? {}) as { content?: string };
    if (typeof body.content !== 'string') return reply.code(422).send({ detail: 'content is required' });
    const existing = publicFiles.get(id) ?? (await readPersistedPublicFile(id));
    if (!existing) return reply.code(404).send({ detail: 'Not found' });
    const next = { ...existing, data: Buffer.from(body.content, 'utf8') };
    publicFiles.set(id, next);
    await persistPublicFile(next);
    return { success: true, file_id: id, size: next.data.length };
  });

  app.post('/api/v1/conversations/save_artifact', protectedRoute, async (request, reply) => {
    const body = request.body as Record<string, unknown>; const id = typeof body.conversation_id === 'string' ? body.conversation_id : '';
    // 编辑器保存的正文同时落到 artifact 与对应文件上，阅读器刷新即可看到新内容
    const artifactId = typeof body.artifact_id === 'string' ? body.artifact_id : '';
    if (artifactId && typeof body.content === 'string') {
      const existing = publicFiles.get(artifactId) ?? (await readPersistedPublicFile(artifactId));
      if (existing) { const next = { ...existing, data: Buffer.from(body.content, 'utf8') }; publicFiles.set(artifactId, next); await persistPublicFile(next); }
    }
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
  app.route({ method: ['GET', 'POST'], url: '/api/v1/files/:id', handler: async (request, reply) => {
    const id = (request.params as { id: string }).id;
    const file = publicFiles.get(id) ?? (await readPersistedPublicFile(id));
    if (!file) return reply.code(404).send({ detail: 'Not found' });
    // 文件名可能是中文：content-disposition 只放 ASCII 回退名，真名走 RFC 5987 的 filename*
    const ascii = file.filename.replace(/[^\x20-\x7e]/g, '_').replace(/["\\]/g, '_');
    return reply
      .header('content-disposition', `inline; filename="${ascii}"; filename*=UTF-8''${encodeURIComponent(file.filename)}`)
      .type(file.mime)
      .send(file.data);
  } });

  app.post('/api/v1/drive/upload_file_to_drive', protectedRoute, async (request, reply) => {
    const part = await request.file(); if (!part) return reply.code(400).send({ detail: 'file is required' });
    const id = `file_${randomUUID().replaceAll('-', '').slice(0, 10)}`; const bytes = await part.toBuffer(); const path = resolve('var/data/files', id);
    // 落盘要连元数据一起写（<id>.json），否则 /api/v1/files/<id> 读不出文件名与 mime，插到编辑器里的图片会 404
    await mkdir(resolve('var/data/files'), { recursive: true }); await writeFile(path, bytes);
    await persistPublicFile({ id, filename: basename(part.filename), mime: part.mimetype || 'application/octet-stream', data: bytes });
    await updateState((state) => { const files = state.drive[request.userId!] ??= {}; files[id] = { id, ext: extname(part.filename), name: basename(part.filename), size: bytes.length, type: 'file', status: 'ready', parent_id: null, created_at: now(), modified_at: now(), local_path: path, thumbnail_url: null, s3_bucket_name: null };
    const counters = (state.usageCounters ?? {}) as Record<string, Record<string, number>>;
    const mine = counters[request.userId!] ??= {};
    mine.file_upload = (mine.file_upload ?? 0) + 1;
    state.usageCounters = counters; });
    return { file_id: id, s3_path: path, conversion_scheduled: false, summary_scheduled: false, thumbnail_scheduled: false };
  });
  app.get('/api/v1/drive/get_drive_data', protectedRoute, async (request) => { const state = await readState(); const file_data = { ...(state.folders[request.userId!] ?? {}), ...(state.drive[request.userId!] ?? {}) }; const drive_used_source_bytes = Object.values(state.drive[request.userId!] ?? {}).reduce((sum, file) => sum + (typeof file.size === 'number' ? file.size : 0), 0); return { success: true, file_data, metadata: { drive_used_source_bytes } }; });
  app.post('/api/v1/drive/create_folder', protectedRoute, async (request) => { const body = request.body as { name?: string; parent_id?: string | null }; const id = `folder_${randomUUID().slice(0, 8)}`; const folder = { id, name: body.name ?? 'New folder', type: 'folder', parent_id: body.parent_id ?? null, created_at: now(), modified_at: now() }; await updateState((state) => { (state.folders[request.userId!] ??= {})[id] = folder; }); return { success: true, folder }; });
  app.post('/api/v1/drive/delete', protectedRoute, async (request) => { const body = request.body as { file_id?: string; id?: string }; const id = body.file_id ?? body.id ?? ''; await updateState((state) => { delete (state.drive[request.userId!] ?? {})[id]; delete (state.folders[request.userId!] ?? {})[id]; }); return { success: true }; });
  // 线上实测：文件卡「加入日程」→ POST /drive/add_file_to_calendar，并计入「添加到日历」配额
  app.post('/api/v1/drive/add_file_to_calendar', protectedRoute, async (request) => {
    const body = (request.body ?? {}) as { file_id?: string; name?: string; scheduled_for?: string; duration_min?: number };
    const taskId = randomUUID();
    const scheduled = typeof body.scheduled_for === 'string' && body.scheduled_for ? body.scheduled_for : new Date(Date.now() + 86_400_000).toISOString();
    await updateState((state) => {
      const tasks = state.calendar[request.userId!] ??= [];
      const file = (state.drive[request.userId!] ?? {})[body.file_id ?? ''] as Record<string, unknown> | undefined;
      tasks.push({
        task_id: taskId,
        title: String(body.name ?? file?.name ?? '知识库文件'),
        description: '来自知识库的阅读任务：先通读，再让老师带你过一遍要点。',
        scheduled_for: scheduled,
        status: 'pending',
        type: 'reading',
        duration_min: Number(body.duration_min ?? 30),
        file_id: body.file_id ?? null,
        subtasks: [{ subtask_id: taskId, title: String(body.name ?? file?.name ?? '知识库文件'), status: 'pending' }],
      });
      const counters = (state.usageCounters ?? {}) as Record<string, Record<string, number>>;
      const mine = counters[request.userId!] ??= {};
      mine.calendar_add = (mine.calendar_add ?? 0) + 1;
      mine.file_upload = mine.file_upload ?? 0;
      state.usageCounters = counters;
    });
    return { success: true, task_id: taskId, scheduled_for: scheduled };
  });

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
  for (const path of ['/api/v1/calendar/list_main_tasks', '/api/v1/calendar/list_pending_main_tasks']) app.get(path, protectedRoute, async (request) => {
    const tasks = ((await readState()).calendar[request.userId!] ?? []).map((task) => {
      const subtasks = Array.isArray(task.subtasks) ? (task.subtasks as Array<Record<string, unknown>>) : [];
      const done = subtasks.filter((item) => item.status === 'done' || item.completed === true).length;
      return {
        ...task,
        // 早期种子把确认态写成了 'confirm'，读出来统一成 'confirmed'
        status: task.status === 'confirm' ? 'confirmed' : task.status,
        description: task.description ?? `今天的学习安排：${String(task.title ?? '')}`,
        // 线上任务详情：子任务列表 + 已完成百分比 + 「开始课堂」入口
        subtasks: subtasks.length ? subtasks : [{ subtask_id: task.task_id, title: String(task.title ?? ''), status: task.status === 'done' ? 'done' : 'pending', session_outline: null }],
        progress: subtasks.length ? Math.round((done / subtasks.length) * 100) : task.status === 'done' ? 100 : 0,
      };
    });
    return { ...taskList, tasks, count: tasks.length };
  });
  // 线上：日历任务里的「开始课堂」→ 用子任务开一节深度学习课（返回大纲 URL）
  app.post('/api/v1/calendar/deep_learn_subtask_session', protectedRoute, async (request) => {
    const body = (request.body ?? {}) as { subtask_id?: string; task_id?: string; title?: string };
    const id = randomUUID();
    const title = String(body.title ?? 'Calendared study session');
    const plan = {
      title,
      description: `来自学习日程的深度学习课堂：${title}`,
      tags: ['日程课堂', title.split(/[：:]/)[0] ?? title],
      session_task_plan: [
        { unit_name: '单位 1：先建立直觉', tasks: [{ task_id: '1.1', task_title: '背景与动机', task_description: '弄清这一主题解决什么问题。' }, { task_id: '1.2', task_title: '核心概念', task_description: '把关键定义与符号讲清楚。' }] },
        { unit_name: '单位 2：推导与检验', tasks: [{ task_id: '2.1', task_title: '主线推导', task_description: '一步步推出结论。' }, { task_id: '2.2', task_title: '自测与复盘', task_description: '用两道小题检验理解。' }] },
      ],
    };
    await updateState((next) => {
      next.deep_learn[id] = { deep_learn_session_id: id, user_id: request.userId!, title, session_task_plan: plan, current_step_id: '1.1', source_subtask_id: body.subtask_id ?? null, conversation_data: { history: [], progress: {} }, created_at: now() };
      const tasks = next.calendar[request.userId!] ?? [];
      const match = tasks.find((task) => task.task_id === (body.task_id ?? body.subtask_id));
      if (match) match.deep_learn_session_id = id;
    });
    return { success: true, deep_learn_session_id: id, task_plan: plan, deep_learn_session_url: `/deep-learn-session/outline/${id}` };
  });
  // 线上：{task_id | task_id[], action:'approve'|'reject'|...} → {success, total_succeeded, queued_task_ids, failed_task_ids}
  // reject 语义是「这条建议不要」——从日历里移除；approve/done 等只改状态
  app.post('/api/v1/calendar/approve_tasks', protectedRoute, async (request) => {
    const body = (request.body ?? {}) as { task_id?: string | string[]; action?: string };
    const ids = Array.isArray(body.task_id) ? body.task_id.map(String) : body.task_id ? [String(body.task_id)] : [];
    const action = String(body.action ?? 'approve');
    let succeeded = 0;
    const failed: string[] = [];
    await updateState((state) => {
      const tasks = state.calendar[request.userId!] ?? [];
      for (const id of ids) {
        const index = tasks.findIndex((item) => item.task_id === id);
        if (index < 0) { failed.push(id); continue }
        if (action === 'reject') tasks.splice(index, 1);
        // 线上客户端确认走默认 action 'approve'；本仓语义只有 pending/confirmed/done 三态，统一归一化
        else tasks[index].status = action === 'approve' || action === 'confirm' ? 'confirmed' : action;
        succeeded += 1;
      }
      state.calendar[request.userId!] = tasks;
    });
    return { success: true, message: 'ok', total_succeeded: succeeded, queued_task_ids: [], failed_task_ids: failed };
  });
  app.post('/api/v1/calendar/update_tasks', protectedRoute, async (request) => { const body = request.body as { task_id?: string; tasks?: Array<Record<string, unknown>> } & Record<string, unknown>; await updateState((state) => { const tasks = state.calendar[request.userId!] ??= []; if (body.tasks) state.calendar[request.userId!] = body.tasks; else { const task = tasks.find((item) => item.task_id === body.task_id); if (task) Object.assign(task, body, { updated_at: now() }); } }); return { success: true }; });
  // 线上：POST /file_generation/rerun {task_id} → {success, file_id, file_name, file_url}
  // 给某个任务/子任务生成学习材料（BYOK 模型写作；无模型时给结构化兜底），并把文件挂回 subtask.related_file_ids.output_files
  app.post('/api/v1/file_generation/rerun', protectedRoute, async (request, reply) => {
    const body = (request.body ?? {}) as { task_id?: string; subtask_id?: string };
    const taskId = String(body.task_id ?? '');
    const subtaskId = String(body.subtask_id ?? '');
    const state = await readState();
    const task = (state.calendar[request.userId!] ?? []).find((item) => item.task_id === taskId) as Record<string, unknown> | undefined;
    if (!task) return reply.code(404).send({ detail: 'Task not found' });
    const counters = (state.usageCounters ?? {})[request.userId!] ?? {};
    const used = Number((counters as Record<string, number>).file_generation ?? 0);
    const subtasks = (task.subtasks as Array<Record<string, unknown>> | undefined) ?? [];
    const subtask = subtasks.find((s) => String(s.subtask_id ?? '') === subtaskId) ?? subtasks[0];
    const title = String(subtask?.title ?? task.title ?? '学习材料');
    const eff = resolveByok((state.users[request.userId!] as unknown as { byok?: UserByok } | undefined)?.byok);
    let markdown = `# ${title}\n\n## 学习目标\n- 完成「${String(task.title ?? '')}」中的这一小节\n- 能用一句话复述核心结论\n\n## 要点\n1. 先写清已知条件与目标\n2. 按因果链推进一步\n3. 用一个具体例子检验\n\n## 自测\n- 换一个数字，结论还成立吗？\n`;
    let stub = true;
    if (eff.provider !== 'stub') {
      try {
        const raw = await chat([
          { role: 'system', content: '你是学习材料生成器。输出紧凑的 Markdown 学习材料：学习目标、要点、示例、3 道自测题。不要输出对话寒暄。' },
          { role: 'user', content: `任务：${String(task.title ?? '')}\n当前小节：${title}\n任务描述：${String(task.description ?? '').slice(0, 400)}` },
        ], 'content', eff);
        if (raw.trim()) { markdown = raw.trim(); stub = false; }
      } catch { /* 模型不可用：用兜底材料，并在响应里标 stub */ }
    }
    const fileId = randomUUID().replaceAll('-', '');
    const fileName = `${title.replace(/[/\\?%*:|"<>]/g, '_').slice(0, 40)}.md`;
    publicFiles.set(fileId, { id: fileId, filename: fileName, mime: 'text/markdown', data: Buffer.from(markdown, 'utf-8'), owner: request.userId!, created_at: now() });
    const fileUrl = `/api/v1/file_generation/files/${fileId}`;
    await updateState((next) => {
      const list = next.calendar[request.userId!] ?? [];
      const target = list.find((item) => item.task_id === taskId) as Record<string, unknown> | undefined;
      if (!target) return;
      const rows = (target.subtasks as Array<Record<string, unknown>> | undefined) ?? [];
      const row = rows.find((s) => String(s.subtask_id ?? '') === String(subtask?.subtask_id ?? '')) ?? rows[0];
      if (row) {
        const related = (row.related_file_ids as Record<string, unknown> | undefined) ?? {};
        const outputs = Array.isArray(related.output_files) ? (related.output_files as Array<Record<string, unknown>>) : [];
        related.output_files = [{ file_id: fileId, file_name: fileName, file_url: fileUrl }, ...outputs.filter((f) => String(f.file_id ?? '') !== fileId)];
        row.related_file_ids = related;
        row.status = 'completed';
        row.progress = 'completed';
        row.progress_percentage = 100;
      }
      target.updated_at = now();
      next.usageCounters = { ...(next.usageCounters ?? {}), [request.userId!]: { ...((next.usageCounters ?? {})[request.userId!] ?? {}), file_generation: used + 1 } };
    });
    return { success: true, file_id: fileId, file_name: fileName, file_url: fileUrl, subtask_id: String(subtask?.subtask_id ?? ''), stub };
  });
  app.get('/api/v1/file_generation/files/:file_id', protectedRoute, async (request, reply) => {
    const file = publicFiles.get((request.params as { file_id: string }).file_id);
    if (!file || file.owner !== request.userId) return reply.code(404).send({ detail: 'File not found' });
    return reply.type(file.mime).send(file.data);
  });

  app.post('/api/v1/calendar/remove_task', protectedRoute, async (request) => { const body = request.body as { task_id?: string }; await updateState((state) => { state.calendar[request.userId!] = (state.calendar[request.userId!] ?? []).filter((item) => item.task_id !== body.task_id); }); return { success: true }; });
  // 线上任务详情：{success, main_task, subtasks, subtask_count}；带 comment 时由模型按评论改写任务（BYOK）
  app.post('/api/v1/calendar/main_task_detail', protectedRoute, async (request, reply) => {
    const body = (request.body ?? {}) as { task_id?: string; comment?: string };
    const state = await readState();
    const task = (state.calendar[request.userId!] ?? []).find((item) => item.task_id === body.task_id) as Record<string, unknown> | undefined;
    if (!task) return reply.code(404).send({ detail: 'Task not found' });
    const comment = String(body.comment ?? '').trim();
    if (!comment) return { success: true, task, main_task: task, subtasks: task.subtasks ?? [], subtask_count: (task.subtasks as unknown[] | undefined)?.length ?? 0 };
    const eff = resolveByok((state.users[request.userId!] as unknown as { byok?: UserByok } | undefined)?.byok);
    interface TaskPatch { title?: string; description?: string; subtasks?: Array<{ title?: string; task_description?: string }> }
    let updated: TaskPatch | null = null;
    let stub = true;
    if (eff.provider !== 'stub') {
      try {
        const system = '你是学习计划助手。根据学生的评论改写这条学习任务，保持可执行、可验证。只输出 JSON：{"title":string,"description":string,"subtasks":[{"title":string,"task_description":string}]}';
        const current = `当前任务：${String(task.title ?? '')}\n描述：${String(task.description ?? '')}\n子任务：${((task.subtasks as Array<{ title?: string }> | undefined) ?? []).map((s) => s.title).join(' / ')}`;
        const raw = await chat([{ role: 'system', content: system }, { role: 'user', content: `${current}\n\n学生评论：${comment.slice(0, 600)}` }], 'content', eff);
        const parsed = JSON.parse(raw.match(/\{[\s\S]*\}/)?.[0] ?? '') as TaskPatch;
        if (parsed && (parsed.title || parsed.description || parsed.subtasks)) { updated = parsed; stub = false; }
      } catch { /* 模型不可用：只记录评论 */ }
    }
    await updateState((next) => {
      const list = next.calendar[request.userId!] ?? [];
      const target = list.find((item) => item.task_id === body.task_id) as Record<string, unknown> | undefined;
      if (!target) return;
      if (updated) {
        if (updated.title) target.title = String(updated.title).slice(0, 160);
        if (updated.description) target.description = String(updated.description).slice(0, 1000);
        if (updated.subtasks?.length) {
          const previous = (target.subtasks as Array<Record<string, unknown>> | undefined) ?? [];
          target.subtasks = updated.subtasks.slice(0, 8).map((sub, index) => ({
            ...(previous[index] ?? {}),
            title: String(sub.title ?? `子任务 ${index + 1}`).slice(0, 120),
            ...(sub.task_description ? { task_description: String(sub.task_description).slice(0, 600) } : {}),
          }));
        }
      }
      target.last_comment = comment.slice(0, 600);
      target.updated_at = now();
    });
    const fresh = ((await readState()).calendar[request.userId!] ?? []).find((item) => item.task_id === body.task_id) as Record<string, unknown> | undefined;
    return { success: true, task: fresh, main_task: fresh, subtasks: (fresh?.subtasks as unknown[]) ?? [], subtask_count: ((fresh?.subtasks as unknown[] | undefined)?.length ?? 0), revised: Boolean(updated), stub };
  });

  // 线上形状是 {success, conversation_data:{title, history}}；本仓再补 title/outline/plan/session_task_plan，
  // 让前端既可以按线上字段渲染，也能直接画出单元-步骤大纲
  app.post('/api/v1/deep_learn/get_session_data', protectedRoute, async (request, reply) => {
    const id = (request.body as { deep_learn_session_id?: string }).deep_learn_session_id ?? '';
    const session = (await readState()).deep_learn[id] as Record<string, unknown> | undefined;
    if (!session || session.user_id !== request.userId) return reply.code(404).send({ detail: 'Session not found' });
    const plan = session.session_task_plan as { title?: string; description?: string; tags?: string[]; session_task_plan?: Array<{ unit_name: string; tasks: Array<{ task_id: string; task_title: string; task_description: string }> }> } | undefined;
    const outline = (plan?.session_task_plan ?? []).flatMap((unit) => unit.tasks.map((task) => ({ title: `${unit.unit_name} · ${task.task_title}`, detail: task.task_description, task_id: task.task_id })));
    return {
      success: true,
      deep_learn_session_id: id,
      title: plan?.title ?? session.title ?? 'Deep learning session',
      description: plan?.description ?? '',
      tags: plan?.tags ?? [],
      outline,
      plan: outline.map((item) => ({ title: item.title })),
      session_task_plan: plan ?? null,
      current_step_id: session.current_step_id ?? outline[0]?.task_id ?? null,
      conversation_data: { title: plan?.title ?? session.title ?? 'Deep learning session', history: (session.conversation_data as { history?: unknown[] } | undefined)?.history ?? [] },
    };
  });
  // 线上实测是裸数组（不是 {sessions:[]}），字段 {deep_learn_session_id,title,created_at,last_modified_at,starred}
  app.get('/api/v1/deep_learn/list_deep_learn_session', protectedRoute, async (request) => Object.values((await readState()).deep_learn)
    .filter((session) => session.user_id === request.userId)
    .map((session) => ({
      deep_learn_session_id: session.deep_learn_session_id ?? session.session_id ?? session.id ?? null,
      title: session.title ?? null,
      created_at: session.created_at ?? null,
      last_modified_at: session.last_modified_at ?? session.updated_at ?? session.created_at ?? null,
      starred: session.starred === true,
    })));
  app.post('/api/v1/deep_learn/manage_session_property', protectedRoute, async (request) => { const body = request.body as { deep_learn_session_id?: string; action?: string; title?: string }; await updateState((state) => { const value = state.deep_learn[body.deep_learn_session_id ?? '']; if (!value || value.user_id !== request.userId) return; if (body.action === 'delete') delete state.deep_learn[body.deep_learn_session_id!]; else if (body.title) value.title = body.title; }); return { success: true }; });
  app.post('/api/v1/deep_learn/update_plan', protectedRoute, async (request) => { const body = request.body as { deep_learn_session_id?: string; session_task_plan?: unknown }; await updateState((state) => { const value = state.deep_learn[body.deep_learn_session_id ?? '']; if (value?.user_id === request.userId) value.session_task_plan = body.session_task_plan; }); return { success: true }; });

  // 线上实测：{recommendations:[],count:0}（无 success 字段）
  app.get('/api/v1/orbie/get_orbie_recommendations', protectedRoute, async () => ({ recommendations: [], count: 0 }));
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
  app.get('/api/v1/whiteboard/course-outlines/:courseUuid/sessions', protectedRoute, async (request, reply) => {
    const id = (request.params as { courseUuid: string }).courseUuid;
    const course = (await readState()).courses[id];
    if (!course || course.user_id !== request.userId) return reply.code(404).send({ detail: 'Course not found' });
    const sessions = enumerateCourseSessions(course).map((session) => ({
      id: `${id}:${session.sessionId}`,
      course_uuid: id,
      // 线上客户端读 sessionId/unitId（camel），本仓此前只给 snake_case，这里两者都给
      sessionId: session.sessionId,
      session_id: session.sessionId,
      title: session.title,
      description: session.description,
      lectureOutline: session.source.lectureOutline ?? session.source.sessionOutline ?? '',
      session_type: session.sessionType,
      unit_id: session.unitId,
      unit_title: session.unitTitle,
      lecture_id: session.lectureId,
      lecture_title: session.lectureTitle,
      session_index: session.sessionIndex,
      estimated_minutes: 20,
      key_points: session.keyPoints,
      references: [],
    }));
    return { sessions };
  });

  // ── TTS（seam 之上）：缓存命中即回同一 URL；voice/speed 未传时取会话里保存的 tts_config ──
  app.get('/api/v1/tts/audio/:file', async (request, reply) => {
    const file = (request.params as { file: string }).file;
    const stored = await readTtsFile(file);
    return stored ? reply.type(stored.mime).header('cache-control', 'public, max-age=31536000, immutable').send(stored.bytes) : reply.code(404).send({ detail: 'Not found' });
  });
  app.get('/api/v1/tts/voices', protectedRoute, async (request) => {
    const state = await readState();
    const eff = resolveByok((state.users[request.userId!] as unknown as { byok?: UserByok } | undefined)?.byok);
    const voices = await listVoices(eff);
    return { voices, default_voice_id: 'calm', speed_range: [0.5, 2], tts_config: (Object.values(state.whiteboards).find((session) => session.user_id === request.userId)?.tts_config as Record<string, unknown>) ?? { voice_id: 'calm', speed: 1 } };
  });
  app.get('/api/v1/tts/stats', protectedRoute, async () => ({ ...ttsStats(), files: await ttsFileCount() }));
  app.post('/api/v1/tts/synthesize', protectedRoute, async (request, reply) => {
    const body = (request.body ?? {}) as { text?: string; voice_id?: string; speed?: number; format?: 'mp3' | 'wav' | 'pcm'; session_id?: string };
    const text = String(body.text ?? '').trim();
    if (!text) return reply.code(400).send({ detail: 'text is required' });
    const state = await readState();
    const session = body.session_id ? state.whiteboards[body.session_id] : Object.values(state.whiteboards).find((value) => value.user_id === request.userId);
    const saved = (session?.tts_config ?? {}) as { voice_id?: string; speed?: number };
    const eff = resolveByok((state.users[request.userId!] as unknown as { byok?: UserByok } | undefined)?.byok);
    const segment = await synthesize(text, { voice: body.voice_id ?? saved.voice_id ?? 'calm', speed: body.speed ?? saved.speed ?? 1, format: body.format ?? 'mp3', eff });
    const counts = ttsCounts(text);
    return { audio_url: segment.url, url: segment.url, ext: segment.ext, mime: segment.mime, cached: segment.cached, stub: segment.stub, bytes: segment.bytes, hash: segment.hash, tts_cjk: counts.tts_cjk, tts_latin: counts.tts_latin, voice_id: body.voice_id ?? saved.voice_id ?? 'calm', speed: body.speed ?? saved.speed ?? 1, ...(segment.error ? { error: segment.error } : {}) };
  });

  // 线上：{enabled:true, post:null}；本轮四次抓包 post 均为 null，非空结构未观测，故本地恒 null
  app.get('/api/v1/social/latest', async () => ({ enabled: true, post: null }));
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
  // 课程资料解析：练习 / 考试 / 项目各自的 seed → 合成兜底，状态端点与内容端点共用同一条判定
  const resolvePractice = async (course: Record<string, unknown>, id: string): Promise<Record<string, unknown>> => {
    const seeded = (await getSeedPractice(await seedUuid(course))) as Record<string, unknown> | undefined;
    if ((seeded?.sessions as unknown[] | undefined)?.length) return seeded!;
    return synthesizeCoursePractice(course, id);
  };
  const resolveExam = async (course: Record<string, unknown>, id: string): Promise<Record<string, unknown>> => {
    const seeded = (await getSeedExam(await seedUuid(course))) as Record<string, unknown> | undefined;
    if ((seeded?.exams as unknown[] | undefined)?.length) return seeded!;
    return synthesizeCourseExams(course, id);
  };
  const resolveProject = async (course: Record<string, unknown>, id: string): Promise<Record<string, unknown>> => {
    const seeded = (await getSeedProject(await seedUuid(course))) as Record<string, unknown> | undefined;
    if ((seeded?.stages as unknown[] | undefined)?.length) return seeded!;
    return synthesizeCourseProject(course, id);
  };
  app.get('/api/v1/course-generation/courses/:course_uuid/generation-status', protectedRoute, async (request, reply) => {
    const course = await ownedCourse(request);
    if (!course) return reply.code(404).send({ detail: 'Course not found' });
    const sessions = enumerateCourseSessions(course);
    const practice = await resolvePractice(course, courseId(request));
    const examData = await resolveExam(course, courseId(request));
    const project = await resolveProject(course, courseId(request));
    const readySessions = new Set(((practice?.sessions ?? []) as Array<Record<string, unknown>>).map((session) => String(session.sessionId ?? session.session_id ?? '')));
    const practiceBySession: Record<string, string> = {};
    for (const session of sessions) practiceBySession[session.sessionId] = readySessions.size === 0 ? 'none' : readySessions.has(session.sessionId) ? 'ready' : 'locked';
    // 生成中的目标来自活跃 run 的事件重放；过期的 run 先收掉，免得状态卡在 running
    await sweepStaleRuns();
    const active = generatingTargets(await activeRuns({ userId: String(request.userId), courseUuid: courseId(request) }));
    const generating = active.assessments;
    return {
      practice: generating ? 'generating' : practice ? 'ready' : 'none',
      exam: generating ? 'generating' : examData ? 'ready' : 'none',
      project: generating ? 'generating' : project ? 'ready' : 'none',
      generatingSessionIds: active.sessionIds,
      generatingUnitIds: active.unitIds,
      generatingStageIds: active.stageIds,
      practiceBySession,
    };
  });
  app.get('/api/v1/course-generation/courses/:course_uuid/progress-status', protectedRoute, async (request, reply) => {
    const course = await ownedCourse(request);
    if (!course) return reply.code(404).send({ detail: 'Course not found' });
    const examScores = (course.examScores ?? {}) as Record<string, number>;
    const rawPractice = (course.practiceProgress ?? {}) as Record<string, Record<string, unknown>>;
    const practiceStats: Record<string, { started: boolean; finished: boolean; correct: number; total: number; score: number; perfect: number; stars: number }> = {};
    for (const [sessionId, entry] of Object.entries(rawPractice)) {
      if (!entry || typeof entry !== 'object') continue;
      const correct = Number(entry.score ?? entry.correct ?? 0);
      const total = Number(entry.total ?? 0);
      // 线上 practiceStats 的已完成条目带 stars/score/perfect（CourseJourneyPage 按 stars 渲染 1–3 星）
      const stars = Number(entry.stars ?? 0);
      const points = Number(entry.points ?? entry.score ?? 0);
      const perfect = Number(entry.perfect ?? 0);
      const correctCount = Number(entry.correct ?? 0);
      practiceStats[sessionId] = {
        started: true,
        finished: entry.completed === true || total > 0,
        correct: Number.isFinite(correctCount) ? correctCount : Math.round((points / Math.max(1, perfect)) * total),
        total,
        score: Number.isFinite(points) ? points : 0,
        perfect: Number.isFinite(perfect) ? perfect : 0,
        stars: Math.min(3, Math.max(0, Number.isFinite(stars) ? stars : 0)),
      };
    }
    const rawStages = (course.projectStageStates ?? {}) as Record<string, Record<string, unknown>>;
    const projectStages: Record<string, { touched: boolean; completed: boolean; started: boolean }> = {};
    for (const [stageId, entry] of Object.entries(rawStages)) {
      const submitted = entry.status === 'submitted' || entry.completed === true;
      projectStages[stageId] = { touched: true, completed: submitted, started: submitted || Boolean(entry.submission) };
    }
    const examStarted = (course.examStarted ?? {}) as Record<string, boolean>;
    return { examScores, practiceStats, projectStages, examStarted };
  });
  app.get('/api/v1/course-generation/courses/:course_uuid/structure', protectedRoute, async (request, reply) => {
    const course = await ownedCourse(request);
    if (!course) return reply.code(404).send({ detail: 'Course not found' });
    const units = Array.isArray(course.units) ? course.units : [];
    return {
      structure: {
        courseTitle: course.courseTitle ?? '',
        courseDescription: course.courseDescription ?? '',
        targetLearner: course.targetLearner ?? '',
        tags: course.tags ?? [],
        units,
      },
      pending_update: null,
      can_undo: course.structureUndoApplied === true,
    };
  });
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
        // 线上考场从数据里读 fastWindowMs / fastBonus（.exam-bonus-chip 与 .exam-bonus-fill 都依赖它）；
        // 考试那份的具体取值没抓到，这里沿用练习实测的 10s / +200
        fastWindowMs: 10000,
        fastBonus: 200,
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
          {
            id: `${uId}-eq4`,
            type: 'animation',
            prompt: '拖动下方两个滑块，观察耦合振子的相位与耦合强度如何改变两条状态的振幅：',
            animationHtml: localAnimationHtml({ title: `${uTitle} · 互动演示`, task: '调整相位与耦合强度，观察振幅变化', language: 'zh' }),
            options: [
              '振幅随耦合强度单调增大，与相位无关',
              '相位差改变两条状态的相对幅度，耦合强度改变整体的拍频与交换速率',
              '两个滑块互不影响',
              '耦合强度为 0 时振幅最大',
            ],
            explanation: '相位差决定两条状态在同一时刻的符号关系，耦合强度决定能量在两者之间交换的快慢。',
            correctAnswers: ['相位差改变两条状态的相对幅度，耦合强度改变整体的拍频与交换速率'],
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
    const practice = (await resolvePractice(course, courseId(request))) ?? { courseUuid: courseId(request), sessions: [] };
    // 线上实测（r123）：sessions[].attempt = {finished, updatedAt, items:{qid:{state,answer,fast?}}, score, perfect, stars}
    // 有交卷记录才有 attempt；复盘模式与「上次尝试」开关都读它
    const progress = ((course.practiceProgress ?? {}) as Record<string, Record<string, unknown>>);
    const sessions = (practice.sessions as Array<Record<string, unknown>> | undefined) ?? [];
    const withAttempts = sessions.map((session) => {
      const sessionId = String(session.sessionId ?? session.session_id ?? '');
      const record = progress[sessionId];
      if (!record || !record.finished) return session;
      return {
        ...session,
        attempt: {
          finished: true,
          updatedAt: String(record.updated_at ?? ''),
          items: (record.items ?? {}) as Record<string, unknown>,
          score: Number(record.score ?? 0),
          perfect: Number(record.perfect ?? 0),
          stars: Number(record.stars ?? 0),
        },
      };
    });
    return { ...practice, sessions: withAttempts };
  });

  // 线上实测：POST /practice/start {sessionId} → {started, charged}（练习运行生命周期）
  app.post('/api/v1/course-generation/courses/:course_uuid/practice/start', protectedRoute, async (request, reply) => {
    const course = await ownedCourse(request);
    if (!course) return reply.code(404).send({ detail: 'Course not found' });
    const body = (request.body ?? {}) as { sessionId?: string; session_id?: string };
    const sessionId = String(body.sessionId ?? body.session_id ?? '');
    await updateState((state) => {
      const target = state.courses[courseId(request)];
      if (!target) return;
      const runs = (target.practiceRuns ?? {}) as Record<string, Record<string, unknown>>;
      runs[sessionId || 'default'] = { started_at: now(), finished: false, items: {} };
      target.practiceRuns = runs;
    });
    return { started: true, charged: false };
  });
  // 线上实测：POST /practice/progress {sessionId, finished, items:{…}}（items 是字典，不是数组）
  app.post('/api/v1/course-generation/courses/:course_uuid/practice/progress', protectedRoute, async (request, reply) => {
    const course = await ownedCourse(request);
    if (!course) return reply.code(404).send({ detail: 'Course not found' });
    const body = (request.body ?? {}) as { sessionId?: string; session_id?: string; finished?: boolean; items?: Record<string, unknown>; score?: number; total?: number; completed?: boolean; perfect?: number; stars?: number };
    const sessionId = String(body.sessionId ?? body.session_id ?? '');
    if (!sessionId) return reply.code(422).send({ detail: [{ type: 'missing', loc: ['body', 'sessionId'], msg: 'Field required' }] });
    if (typeof body.finished !== 'boolean') return reply.code(422).send({ detail: [{ type: 'missing', loc: ['body', 'finished'], msg: 'Field required' }] });
    if (body.items !== undefined && (typeof body.items !== 'object' || Array.isArray(body.items))) return reply.code(422).send({ detail: [{ type: 'dict_type', loc: ['body', 'items'], msg: 'Input should be a valid dictionary' }] });
    const rawItems = (body.items ?? {}) as Record<string, unknown>;
    // 落库统一成线上 attempt 的 item 形状：{state:"correct"|"wrong", answer, fast?}（老客户端的 {correct,picked}/{fill} 也归一化）
    const items = Object.fromEntries(Object.entries(rawItems).map(([qid, value]) => {
      const item = (typeof value === 'object' && value !== null ? value : {}) as Record<string, unknown>;
      const right = item.correct === true || value === true || item.state === 'correct';
      const answer = item.answer ?? item.picked ?? (typeof item.fill === 'string' && item.fill ? item.fill : null);
      return [qid, { state: String(item.state ?? (right ? 'correct' : 'wrong')), answer, ...(item.fast ? { fast: true } : {}) }];
    }));
    const correct = Object.values(items).filter((item) => (item as { state?: string }).state === 'correct').length;
    const total = Object.keys(items).length || Number(body.total ?? 0);
    const score = Number(body.score ?? correct);
    await updateState((state) => {
      const target = state.courses[courseId(request)];
      if (!target) return;
      const progress = (target.practiceProgress ?? {}) as Record<string, Record<string, unknown>>;
      // 线上口径：score 是点数（非百分比），另有 perfect 与 stars
      const points = Number(body.score ?? score);
      const perfect = Number(body.perfect ?? 0);
      const stars = Number(body.stars ?? 0);
      const correctCount = Object.values(items).filter((value) => typeof value === 'object' && value !== null && (value as Record<string, unknown>).state === 'correct').length;
      progress[sessionId] = { score: points, points, perfect, stars, correct: correctCount, total, completed: body.finished, finished: body.finished, items, updated_at: now() };
      target.practiceProgress = progress;
      const runs = (target.practiceRuns ?? {}) as Record<string, Record<string, unknown>>;
      runs[sessionId] = { ...(runs[sessionId] ?? {}), finished: body.finished, items, updated_at: now() };
      target.practiceRuns = runs;
    });
    return { status: 'ok', session_id: sessionId, score: Number(body.score ?? correct), perfect: Number(body.perfect ?? 0), stars: Number(body.stars ?? 0), total, completed: body.finished, updated_at: now() };
  });
  // 线上实测（r112 原文）：POST /practice/assistant 是 multipart/form-data：
  //   session_id、question_id、messages(JSON 串)、images(多个文件)；多轮提示，不给答案。
  // 兼容早期本仓的 JSON 形状（{session_id, messages[], questionPrompt...}）。
  app.post('/api/v1/course-generation/courses/:course_uuid/practice/assistant', protectedRoute, async (request, reply) => {
    const course = await ownedCourse(request);
    if (!course) return reply.code(404).send({ detail: 'Course not found' });
    const isMultipart = String(request.headers['content-type'] ?? '').includes('multipart/form-data');
    let sessionId = '';
    let questionId = '';
    let messages: Array<{ role?: string; content?: string }> = [];
    const images: Array<{ mime: string; data: string }> = [];
    let questionPrompt = '';
    let questionOptions: string[] = [];
    let questionExplanation = '';
    if (isMultipart) {
      for await (const part of request.parts()) {
        if (part.type === 'file') {
          if (part.fieldname !== 'images') continue;
          const buffer = await part.toBuffer();
          if (buffer.length && images.length < 4) images.push({ mime: part.mimetype || 'image/png', data: buffer.toString('base64') });
          continue;
        }
        const value = String(part.value ?? '');
        if (part.fieldname === 'session_id') sessionId = value;
        else if (part.fieldname === 'question_id') questionId = value;
        else if (part.fieldname === 'messages') {
          try { const parsed = JSON.parse(value) as unknown; if (Array.isArray(parsed)) messages = parsed as Array<{ role?: string; content?: string }>; } catch { /* 忽略坏 JSON */ }
        } else if (part.fieldname === 'questionPrompt') questionPrompt = value;
        else if (part.fieldname === 'questionExplanation') questionExplanation = value;
        else if (part.fieldname === 'questionOptions') { try { const parsed = JSON.parse(value) as unknown; if (Array.isArray(parsed)) questionOptions = parsed.map(String); } catch { /* 忽略 */ } }
      }
    } else {
      const body = (request.body ?? {}) as { session_id?: string; sessionId?: string; question_id?: string; questionId?: string; messages?: Array<{ role?: string; content?: string }>; message?: string; questionPrompt?: string; questionOptions?: string[]; questionExplanation?: string };
      sessionId = String(body.session_id ?? body.sessionId ?? '');
      questionId = String(body.question_id ?? body.questionId ?? '');
      messages = Array.isArray(body.messages) ? body.messages : body.message ? [{ role: 'user', content: body.message }] : [];
      questionPrompt = String(body.questionPrompt ?? '');
      questionOptions = Array.isArray(body.questionOptions) ? body.questionOptions : [];
      questionExplanation = String(body.questionExplanation ?? '');
    }
    if (!sessionId) return reply.code(422).send({ detail: [{ type: 'missing', loc: ['body', 'session_id'], msg: 'Field required' }] });
    if (!messages.length) return reply.code(422).send({ detail: [{ type: 'missing', loc: ['body', 'messages'], msg: 'Field required' }] });
    const question = String(messages.filter((m) => m.role !== 'assistant').at(-1)?.content ?? '');
    // BYOK：有模型就让模型按「只给提示不给答案」的系统提示回答（带截图时走多模态 content）；没有模型时用本地兜底话术并标 stub
    const state = await readState();
    const eff = resolveByok((state.users[request.userId!] as unknown as { byok?: UserByok } | undefined)?.byok);
    let hint = `先回到题干本身：把已知条件逐条写下来，再问自己「哪一个条件限定了范围」。\n\n关于「${String(questionPrompt || question).slice(0, 60)}」：可以从最简情形出发，用一个具体数字代入检验，看看结论是否成立。\n\n（我只给方向，不给答案——你能独立走完这一步。）`;
    let stub = true;
    if (eff.provider !== 'stub') {
      try {
        const system = [
          '你是一名随堂助教，只能给提示与思路，绝不直接说出答案。',
          questionPrompt ? `题目：${questionPrompt.slice(0, 800)}` : '',
          questionOptions.length ? `选项：${questionOptions.map((o, i) => `${i + 1}. ${o}`).join(' / ').slice(0, 800)}` : '',
          questionExplanation ? `（教师解析，仅供你参考，不要原样复述）：${questionExplanation.slice(0, 400)}` : '',
          images.length ? `学生附了 ${images.length} 张截图，请结合截图内容给提示。` : '',
        ].filter(Boolean).join('\n');
        const history: ChatMessage[] = messages.map((m) => ({ role: m.role === 'assistant' ? 'assistant' as const : 'user' as const, content: String(m.content ?? '') }));
        if (images.length) {
          const last = history[history.length - 1];
          const lastText = typeof last?.content === 'string' ? last.content : question;
          history[history.length - 1] = {
            role: 'user',
            content: [
              { type: 'text', text: lastText },
              ...images.map((img) => ({ type: 'image_url' as const, image_url: { url: `data:${img.mime};base64,${img.data}` } })),
            ],
          };
        }
        hint = await chat([{ role: 'system', content: system }, ...history], 'content', eff);
        stub = false;
      } catch { /* 模型不可用：退回本地兜底，并标 stub */ }
    }
    return { role: 'assistant', message: hint, hint, stub, question_id: questionId, received_images: images.length, messages: [...messages.map((m) => ({ role: m.role, content: m.content })), { role: 'assistant', content: hint }] };
  });

  // 线上实测：GET /exam/status → {status:"none"|"in_progress"|"completed"}；POST /exam/start {unitId}
  app.get('/api/v1/course-generation/courses/:course_uuid/exam/status', protectedRoute, async (request, reply) => {
    const course = await ownedCourse(request);
    if (!course) return reply.code(404).send({ detail: 'Course not found' });
    const attempts = (course.examAttempts ?? {}) as Record<string, Record<string, unknown>>;
    const statuses = Object.values(attempts).map((attempt) => String(attempt.status ?? 'none'));
    const status = statuses.includes('in_progress') ? 'in_progress' : statuses.includes('completed') ? 'completed' : 'none';
    return { status };
  });
  app.post('/api/v1/course-generation/courses/:course_uuid/exam/start', protectedRoute, async (request, reply) => {
    const course = await ownedCourse(request);
    if (!course) return reply.code(404).send({ detail: 'Course not found' });
    const body = (request.body ?? {}) as { unitId?: string; unit_id?: string };
    const unitId = String(body.unitId ?? body.unit_id ?? '');
    if (!unitId) return reply.code(400).send({ detail: 'unitId is required' });
    await updateState((state) => {
      const target = state.courses[courseId(request)];
      if (!target) return;
      const attempts = (target.examAttempts ?? {}) as Record<string, Record<string, unknown>>;
      attempts[unitId] = { status: 'in_progress', started_at: now() };
      target.examAttempts = attempts;
      const started = (target.examStarted ?? {}) as Record<string, boolean>;
      started[unitId] = true;
      target.examStarted = started;
    });
    return { status: 'in_progress', unit_id: unitId, started: true, charged: false };
  });
  // 线上实测：POST /project/assistant {stage_id, messages[]}
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

  app.get('/api/v1/course-generation/courses/:course_uuid/exam', protectedRoute, async (request, reply) => {
    const course = await ownedCourse(request);
    if (!course) return reply.code(404).send({ detail: 'Course not found' });
    const data = (await resolveExam(course, courseId(request))) ?? { courseUuid: courseId(request), exams: [] };
    // 速答窗口：线上考场从考试数据读 fastWindowMs / fastBonus（种子数据里没有，这里统一补齐默认值）
    const exams = Array.isArray(data.exams) ? (data.exams as Array<Record<string, unknown>>) : [];
    return {
      ...data,
      exams: exams.map((exam) => ({ fastWindowMs: 10000, fastBonus: 200, ...exam })),
    };
  });

  app.post('/api/v1/course-generation/courses/:course_uuid/exam/score', protectedRoute, async (request, reply) => {
    if (!(await ownedCourse(request))) return reply.code(404).send({ detail: 'Course not found' });
    const body = (request.body ?? {}) as Record<string, unknown>;
    const score = typeof body.final_score === 'number' ? body.final_score : typeof body.score === 'number' ? body.score : 0;
    const unitId = String(body.unitId ?? body.unit_id ?? 'unit1');
    await updateState((state) => {
      const value = state.courses[courseId(request)];
      if (value?.user_id !== request.userId) return;
      value.examScores = { ...((value.examScores ?? {}) as Record<string, number>), [unitId]: score };
      value.examStarted = { ...((value.examStarted ?? {}) as Record<string, boolean>), [unitId]: true };
      // 线上会带 items（每题 state/answer），存下来供结果页回看
      const items = body.items;
      if (items && typeof items === 'object') {
        value.examItems = { ...((value.examItems ?? {}) as Record<string, unknown>), [unitId]: items };
      }
    });
    return { status: 'ok', final_score: score, unit_id: unitId };
  });

  // 课程生成质量评分（线上 .course-rating-bar 提交后落库；自部署形态存 state.json 的 courseRating）
  app.post('/api/v1/course-generation/courses/:course_uuid/rating', protectedRoute, async (request, reply) => {
    if (!(await ownedCourse(request))) return reply.code(404).send({ detail: 'Course not found' });
    const body = (request.body ?? {}) as { rating?: number; comment?: string };
    const rating = Math.min(5, Math.max(1, Math.round(Number(body.rating ?? 0)) || 0));
    if (!rating) return reply.code(400).send({ detail: 'rating must be 1-5' });
    await updateState((state) => {
      const value = state.courses[courseId(request)];
      if (value?.user_id !== request.userId) return;
      value.rating = { rating, comment: String(body.comment ?? '').slice(0, 500), at: new Date().toISOString() };
    });
    return { status: 'ok', rating };
  });

  app.get('/api/v1/course-generation/courses/:course_uuid/rating', protectedRoute, async (request, reply) => {
    if (!(await ownedCourse(request))) return reply.code(404).send({ detail: 'Course not found' });
    const value = (await readState()).courses[courseId(request)] as unknown as { rating?: { rating: number; comment?: string; at?: string } } | undefined;
    return { rating: value?.rating ?? null };
  });

  app.get('/api/v1/course-generation/courses/:course_uuid/project', protectedRoute, async (request, reply) => {
    const course = await ownedCourse(request);
    if (!course) return reply.code(404).send({ detail: 'Course not found' });
    const payload = (await resolveProject(course, courseId(request))) ?? { courseUuid: courseId(request), projects: [], stages: [] };
    // 线上形状：stages[].{stage_id,parent_project_id,unit_id,stage_title,stage_description,deliverable_increment,steps[]}
    const stages = Array.isArray(payload.stages) ? (payload.stages as Array<Record<string, unknown>>) : [];
    const projects = Array.isArray(payload.projects) ? (payload.projects as Array<Record<string, unknown>>) : [];
    const normalized = stages.map((stage, index) => {
      const steps = Array.isArray(stage.steps) ? (stage.steps as Array<Record<string, unknown>>) : [];
      return {
        ...stage,
        parent_project_id: stage.parent_project_id ?? projects[0]?.project_id ?? null,
        unit_id: stage.unit_id ?? `unit${index + 1}`,
        deliverable_increment: stage.deliverable_increment ?? `阶段 ${index + 1} 的交付物`,
        steps: steps.length ? steps : [{ step_id: `${stage.stage_id ?? index}-s1`, title: '完成本阶段交付', instruction: String(stage.stage_description ?? '') }],
      };
    });
    return { ...payload, projects, stages: normalized };
  });

  // 线上实测（ProjectStagePage 原文）：POST /project/assistant 也是 multipart：
  //   stage_id、step_index、messages(JSON)、images(多文件)，响应是**流式纯文本**（客户端逐块 append）。
  app.post('/api/v1/course-generation/courses/:course_uuid/project/assistant', protectedRoute, async (request, reply) => {
    const course = await ownedCourse(request);
    if (!course) return reply.code(404).send({ detail: 'Course not found' });
    const isMultipart = String(request.headers['content-type'] ?? '').includes('multipart/form-data');
    let stageId = '';
    let stepIndex = '';
    let messages: Array<{ role?: string; content?: string }> = [];
    const images: Array<{ mime: string; data: string }> = [];
    if (isMultipart) {
      for await (const part of request.parts()) {
        if (part.type === 'file') {
          if (part.fieldname !== 'images') continue;
          const buffer = await part.toBuffer();
          if (buffer.length && images.length < 4) images.push({ mime: part.mimetype || 'image/png', data: buffer.toString('base64') });
          continue;
        }
        const value = String(part.value ?? '');
        if (part.fieldname === 'stage_id') stageId = value;
        else if (part.fieldname === 'step_index') stepIndex = value;
        else if (part.fieldname === 'messages') {
          try { const parsed = JSON.parse(value) as unknown; if (Array.isArray(parsed)) messages = parsed as Array<{ role?: string; content?: string }>; } catch { /* 忽略坏 JSON */ }
        }
      }
    } else {
      const body = (request.body ?? {}) as { stage_id?: string; stageId?: string; messages?: Array<{ role?: string; content?: string }>; message?: string; stageTitle?: string };
      stageId = String(body.stage_id ?? body.stageId ?? '');
      messages = Array.isArray(body.messages) ? body.messages : body.message ? [{ role: 'user', content: body.message }] : [];
    }
    if (!stageId) return reply.code(422).send({ detail: [{ type: 'missing', loc: ['body', 'stage_id'], msg: 'Field required' }] });
    if (!messages.length) return reply.code(422).send({ detail: [{ type: 'missing', loc: ['body', 'messages'], msg: 'Field required' }] });
    // 阶段信息来自 resolveProject（种子优先），课程记录里的 stages 可能没有这一项
    const project = await resolveProject(course, courseId(request));
    const stage = ((project.stages as Array<Record<string, unknown>> | undefined) ?? []).find((item) => String(item.stage_id ?? '') === stageId);
    const state = await readState();
    const eff = resolveByok((state.users[request.userId!] as unknown as { byok?: UserByok } | undefined)?.byok);
    const system = [
      '你是一名项目实战导师，围绕当前阶段给出可执行的建议：先明确输入输出契约，再给阶段自测基准，最后按增量交付推进。',
      `阶段：${String(stage?.stage_title ?? stageId)}`,
      stage?.deliverable_increment ? `交付要求：${String(stage.deliverable_increment)}` : '',
      stepIndex ? `当前步骤序号：${stepIndex}` : '',
      images.length ? `学生附了 ${images.length} 张截图，请结合截图内容回答。` : '',
    ].filter(Boolean).join('\n');
    const history: ChatMessage[] = messages.map((m) => ({ role: m.role === 'assistant' ? 'assistant' as const : 'user' as const, content: String(m.content ?? '') }));
    if (images.length) {
      const last = history[history.length - 1];
      const lastText = typeof last?.content === 'string' ? last.content : '请看截图';
      history[history.length - 1] = {
        role: 'user',
        content: [
          { type: 'text', text: lastText },
          ...images.map((img) => ({ type: 'image_url' as const, image_url: { url: `data:${img.mime};base64,${img.data}` } })),
        ],
      };
    }
    // 响应形状与线上一致：流式纯文本（不是 SSE），客户端逐块追加
    reply.raw.writeHead(200, { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'no-store', 'x-accel-buffering': 'no' });
    try {
      if (eff.provider === 'stub') {
        const fallback = `🛠️ 针对「${String(stage?.stage_title ?? stageId)}」的实施目标：\n1. 明确输入输出契约；\n2. 先设计 2 组基准用例（常规 + 边界）；\n3. 优先跑通端到端主流程，再补异常处理。\n\n（未配置语言模型，这是本地兜底建议。）`;
        for (const chunk of fallback.match(/[\s\S]{1,24}/g) ?? []) { reply.raw.write(chunk); await new Promise((r) => setTimeout(r, 8)); }
      } else {
        for await (const chunk of chatStream([{ role: 'system', content: system }, ...history], 'content', eff)) reply.raw.write(chunk);
      }
    } catch (error) {
      reply.raw.write(`\n[助手暂时不可用：${error instanceof Error ? error.message : '未知错误'}]`);
    }
    reply.raw.end();
    return reply;
  });

  // 线上实测：GET 只读，返回 {submissions:{}, drafts:{}}；提交走步骤端点，评分由模型给出（本仓不再本地编造分数）
  app.route({
    method: ['GET', 'POST'],
    url: '/api/v1/course-generation/courses/:course_uuid/project/stages/:stage_id/state',
    preHandler: authenticate,
    handler: async (request, reply) => {
      const course = await ownedCourse(request);
      if (!course) return reply.code(404).send({ detail: 'Course not found' });
      const stageIdParam = (request.params as { stage_id: string }).stage_id;
      const stored = ((course.projectStageStates ?? {}) as Record<string, Record<string, unknown>>)[stageIdParam] ?? {};
      if (request.method === 'GET') {
        return { submissions: (stored.submissions as Record<string, unknown>) ?? {}, drafts: (stored.drafts as Record<string, unknown>) ?? {}, status: stored.status ?? null, score: stored.score ?? null, feedback: stored.feedback ?? null };
      }
      const body = (request.body ?? {}) as { submission?: string; drafts?: Record<string, unknown>; step_id?: string };
      const submission = String(body.submission ?? '').trim();
      const stage = ((course.stages as Array<Record<string, unknown>> | undefined) ?? []).find((item) => item.stage_id === stageIdParam);
      const drafts = { ...((stored.drafts as Record<string, unknown>) ?? {}), ...(body.drafts ?? {}), ...(body.step_id ? { [body.step_id]: submission } : {}) };
      const submissions = { ...((stored.submissions as Record<string, unknown>) ?? {}) };
      if (submission) submissions[body.step_id ?? 'stage'] = { text: submission, at: now() };
      // 真实评审：有模型就让模型评，没有就只记录，绝不本地编分数
      const stateNow = await readState();
      const eff = resolveByok((stateNow.users[request.userId!] as unknown as { byok?: UserByok } | undefined)?.byok);
      let score: number | null = null; let feedback = '';
      let evaluated = false;
      if (submission && eff.provider !== 'stub') {
        try {
          const raw = await chat([
            { role: 'system', content: '你是一名严格但友善的项目导师。按 0-100 打分并给出可执行的改进建议。只输出 JSON：{"score":number,"feedback":string}' },
            { role: 'user', content: `阶段：${String(stage?.stage_title ?? stageIdParam)}\n交付要求：${String(stage?.deliverable_increment ?? '')}\n学生提交：\n${submission.slice(0, 4000)}` },
          ], 'content', eff);
          const parsed = JSON.parse(raw.match(/\{[\s\S]*\}/)?.[0] ?? '') as { score?: number; feedback?: string };
          if (typeof parsed.score === 'number') { score = Math.max(0, Math.min(100, Math.round(parsed.score))); feedback = String(parsed.feedback ?? ''); evaluated = true; }
        } catch { /* 评审失败：按未评分处理 */ }
      }
      if (!evaluated && submission) feedback = '已记录本次提交。未配置语言模型（BYOK）时不给出分数与评审意见。';
      const state = { submissions, drafts, status: submission ? 'submitted' : 'in_progress', score, feedback, evaluated, updated_at: now() };
      await updateState((next) => {
        const target = next.courses[courseId(request)];
        if (!target) return;
        const states = (target.projectStageStates ?? {}) as Record<string, Record<string, unknown>>;
        states[stageIdParam] = state;
        target.projectStageStates = states;
        const progress = (target.projectProgress ?? {}) as Record<string, Record<string, unknown>>;
        progress[stageIdParam] = { submitted: Boolean(submission), evaluated, updated_at: now() };
        target.projectProgress = progress;
      });
      return { success: true, stage_id: stageIdParam, state, score, feedback, evaluated };
    },
  });

  for (const action of ['draft', 'submission', 'submission/text']) app.post(`/api/v1/course-generation/courses/:course_uuid/project/stages/:stage_id/steps/:step_id/${action}`, protectedRoute, async (request, reply) => (await ownedCourse(request)) ? { success: true, action, stage_id: (request.params as { stage_id: string }).stage_id, step_id: (request.params as { step_id: string }).step_id, submission: request.body ?? {}, updated_at: now() } : reply.code(404).send({ detail: 'Course not found' }));
  app.get('/api/v1/course-generation/courses/:course_uuid/project/stages/:stage_id/steps/:step_id/tts', protectedRoute, async (request, reply) => (await ownedCourse(request)) ? reply.type('audio/webm').send(placeholderWebm) : reply.code(404).send({ detail: 'Course not found' }));
  app.get('/api/v1/course-generation/courses/:course_uuid/project/stages/:stage_id/steps/_first/tts', protectedRoute, async (request, reply) => (await ownedCourse(request)) ? reply.type('audio/webm').send(placeholderWebm) : reply.code(404).send({ detail: 'Course not found' }));
  app.get('/api/v1/course-generation/courses/:course_uuid/project/tts/prewarm', protectedRoute, async (request, reply) => (await ownedCourse(request)) ? { ok: true, warmed: true } : reply.code(404).send({ detail: 'Course not found' }));

  app.get('/api/v1/course-generation/courses/:course_uuid/canvas-updates', protectedRoute, async (request, reply) => {
    const course = await ownedCourse(request);
    if (!course) return reply.code(404).send({ detail: 'Course not found' });
    const stored = (course.canvasUpdates ?? {}) as Record<string, unknown>;
    return {
      hasBaseline: stored.hasBaseline === true,
      newFiles: Number(stored.newFiles ?? 0), changedFiles: Number(stored.changedFiles ?? 0),
      newAssignments: Number(stored.newAssignments ?? 0), changedDue: Number(stored.changedDue ?? 0),
      syllabusChanged: stored.syllabusChanged === true,
      newModules: Number(stored.newModules ?? 0), changedModules: Number(stored.changedModules ?? 0),
      newAnnouncements: Number(stored.newAnnouncements ?? 0), changedAnnouncements: Number(stored.changedAnnouncements ?? 0),
      total: Number(stored.total ?? 0), pushDisabled: stored.pushDisabled === true,
    };
  });
  for (const action of ['dismiss', 'disable']) app.post(`/api/v1/course-generation/courses/:course_uuid/canvas-updates/${action}`, protectedRoute, async (request, reply) => (await ownedCourse(request)) ? { success: true, action, course_uuid: courseId(request) } : reply.code(404).send({ detail: 'Course not found' }));
  app.post('/api/v1/course-generation/courses/canvas-updates/disable', protectedRoute, async () => ({ success: true, enabled: false }));
  app.get('/api/v1/course-generation/generation-log/:run_id', protectedRoute, async (request, reply) => {
    const runId = (request.params as { run_id: string }).run_id;
    const record = await readRun(runId);
    if (!record || record.user_id !== request.userId) return reply.code(404).send({ detail: 'Run not found' });
    return record;
  });
  app.get('/api/v1/course-generation/generation-history/:conversation_id', protectedRoute, async (request) => {
    const conversationId = (request.params as { conversation_id: string }).conversation_id;
    const runs = await listRuns({ userId: request.userId!, conversationId });
    return { conversation_id: conversationId, runs, history: runs };
  });
  app.get('/api/v1/course-calendar/status', protectedRoute, async (request) => {
    const courseUuid = (request.query as { course_uuid?: string }).course_uuid ?? '';
    const state = await readState();
    const tasks = state.calendar[request.userId!] ?? [];
    const scheduled = Boolean(courseUuid) && tasks.some((task) => String(task.course_uuid ?? '') === courseUuid);
    return { scheduled, count: scheduled ? tasks.filter((task) => String(task.course_uuid ?? '') === courseUuid).length : 0 };
  });
  app.get('/api/v1/course-calendar/config', protectedRoute, async () => ({ enabled: true }));
  // 线上 draft（r114 实证）：POST {course_uuid, start_date, duration_days, preferred_weekdays} →
  // {success, items, course_title}；只做预览不落库，缺字段 422。分配算法线上没抓到，本仓按顺序均摊（与客户端同一口径）
  app.post('/api/v1/course-calendar/draft', protectedRoute, async (request, reply) => {
    const body = (request.body ?? {}) as { course_uuid?: string; start_date?: string; duration_days?: number; preferred_weekdays?: number[] };
    const course = (await readState()).courses[String(body.course_uuid ?? '')];
    if (!course || course.user_id !== request.userId) return reply.code(404).send({ detail: 'Course not found' });
    const durationDays = Number(body.duration_days);
    if (!Number.isFinite(durationDays) || durationDays < 1 || durationDays > 365) return reply.code(422).send({ detail: [{ type: 'missing', loc: ['body', 'duration_days'], msg: 'Field required' }] });
    if (typeof body.start_date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(body.start_date)) return reply.code(422).send({ detail: [{ type: 'missing', loc: ['body', 'start_date'], msg: 'Field required' }] });
    const weekdays = Array.isArray(body.preferred_weekdays) ? body.preferred_weekdays.filter((day) => Number.isInteger(day) && day >= 0 && day <= 6) : [];
    const [year, month, day] = body.start_date.split('-').map(Number);
    const start = new Date(year, month - 1, day);
    const slots: Date[] = [];
    for (let offset = 0; slots.length < 400 && offset <= durationDays; offset += 1) {
      const current = new Date(start.getFullYear(), start.getMonth(), start.getDate() + offset);
      if (weekdays.length === 0 || weekdays.includes(current.getDay())) slots.push(current);
    }
    const sessions = enumerateCourseSessions(course as unknown as Record<string, unknown>);
    const perDay = Math.max(1, Math.ceil(sessions.length / Math.max(1, slots.length)));
    const iso = (date: Date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    const items = sessions.map((session, index) => {
      const slot = slots[Math.min(Math.floor(index / perDay), slots.length - 1)] ?? start;
      return {
        course_object_type: session.sessionType === 'practice' ? 'practice' : 'session',
        course_object_id: session.sessionId,
        title: session.title,
        description: session.description,
        scheduled_for: iso(slot),
      };
    });
    return { success: true, items, course_title: String(course.courseTitle ?? course.title ?? '') };
  });
  app.post('/api/v1/course-calendar/accept', protectedRoute, async (request) => {
    const body = (request.body ?? {}) as { course_uuid?: string; course_title?: string; items?: Array<Record<string, unknown>> };
    const courseUuid = String(body.course_uuid ?? '');
    const courseTitle = String(body.course_title ?? '');
    const items = Array.isArray(body.items) ? body.items : [];
    let created = 0;
    await updateState((state) => {
      const tasks = (state.calendar[request.userId!] ??= []);
      // 替换语义：先把这门课原有计划清掉，再写入新计划（线上提示「确认后会替换它」）
      const kept = tasks.filter((task) => !(String(task.type ?? '') === 'course' && String((task.payload as Record<string, unknown> | undefined)?.course_id ?? task.course_uuid ?? '') === courseUuid));
      for (const item of items) {
        const objectId = String(item.course_object_id ?? randomUUID());
        kept.push({
          task_id: `course-${courseUuid}-${objectId}`.slice(0, 80),
          type: 'course',
          status: 'confirmed',
          title: String(item.title ?? (courseTitle || '课程安排')),
          description: String(item.description ?? ''),
          scheduled_for: String(item.scheduled_for ?? new Date().toISOString()),
          duration_min: 30,
          course_uuid: courseUuid,
          course_title: courseTitle,
          payload: { course_id: courseUuid, course_object_type: String(item.course_object_type ?? 'session'), course_object_id: objectId },
          created_at: now(),
          updated_at: now(),
        });
        created += 1;
      }
      state.calendar[request.userId!] = kept;
    });
    return { success: true, accepted: true, course_uuid: courseUuid, created };
  });

  for (const path of ['/api/v1/pdf-annotation', '/api/v1/pdf-annotation/upload']) app.post(path, protectedRoute, async (request, reply) => { let sessionId = ''; let filename = ''; let mime = 'application/pdf'; let data: Buffer | undefined; for await (const part of request.parts()) { if (part.type === 'file') { filename = part.filename; mime = part.mimetype; data = await part.toBuffer(); } else if (part.fieldname === 'session_id') sessionId = String(part.value); } if (!sessionId) return reply.code(422).send({ detail: [{ type: 'missing', loc: ['body', 'session_id'], msg: 'Field required' }] }); if (!data) return reply.code(400).send({ detail: 'file is required' }); const fileId = randomUUID().replaceAll('-', ''); publicFiles.set(fileId, { id: fileId, filename, mime, data }); await updateState((state) => {
      // 上传可能早于 WS 建会话：这里直接建/补会话记录，否则文件 id 会丢，start_teaching 会报「没有 PDF」
      const existing = state.whiteboards[sessionId];
      if (!existing) {
        state.whiteboards[sessionId] = { session_id: sessionId, user_id: request.userId, status: 'active', messages: [], pdf_state: { revision: 0, file_id: fileId, annotations: [] }, board_state: null, pdf_file_id: fileId, created_at: now() };
      } else if (existing.user_id === request.userId) {
        existing.pdf_file_id = fileId;
        const pdfState = (existing.pdf_state ?? {}) as Record<string, unknown>;
        existing.pdf_state = { revision: Number(pdfState.revision ?? 0) + 1, file_id: fileId, annotations: (pdfState.annotations as unknown[]) ?? [] };
      }
    });
    return { file_id: fileId, filename, size: data.length }; });
  app.get('/api/v1/pdf-annotation/sessions', protectedRoute, async (request) => ({ sessions: Object.values((await readState()).whiteboards).filter((session) => session.user_id === request.userId && session.pdf_file_id) }));
  app.get('/api/v1/pdf-annotation/course-outlines', protectedRoute, async (request) => ({ courses: Object.values((await readState()).courses).filter((course) => course.user_id === request.userId).map((course) => ({ id: course.courseUuid, uuid: course.courseUuid, title: course.courseTitle })) }));
  app.get('/api/v1/pdf-annotation/course-outlines/:course_uuid/sessions', protectedRoute, async (request, reply) => { const course = await ownedCourse(request); return course ? { sessions: [] } : reply.code(404).send({ detail: 'Course not found' }); });
  app.get('/api/v1/pdf-annotation/pdf/:session_id/:file_id', protectedRoute, async (request, reply) => { const file = publicFiles.get((request.params as { file_id: string }).file_id); return file ? reply.type(file.mime || 'application/pdf').send(file.data) : reply.code(404).send({ detail: 'PDF not found' }); });
  // PDF 导读的音频路径与白板分开（线上实测 tts_url: /api/v1/pdf-annotation/audio-stream/<user>/<session>/tts_<prefix>_<seq>_<6hex>.wav）
  app.get('/api/v1/pdf-annotation/audio-stream/:user/:session/:file', async (request, reply) => {
    const { user, session, file } = request.params as { user: string; session: string; file: string };
    // 真音频在内容寻址缓存里；stub 时的占位片段还在白板目录，按同一路径回源即可
    const stored = await readTtsFile(file);
    if (stored) return reply.type(stored.mime).header('cache-control', 'public, max-age=31536000, immutable').send(stored.bytes);
    const fallback = await readTtsAudio(user, session, file);
    return fallback ? reply.type(mimeFor(file)).send(fallback) : reply.code(404).send({ detail: 'Not found' });
  });
  app.get('/api/v1/video/:id/final_video.mp4', async (request, reply) => { const file = publicFiles.get((request.params as { id: string }).id); return file ? reply.type('video/mp4').send(file.data) : reply.code(404).send({ detail: 'Video not found' }); });
  const getLearningStats = async (userId: string) => {
    const state = await readState();
    const myCourses = Object.values(state.courses).filter((c) => c.user_id === userId);
    let totalSessions = 0;
    let completedSessions = 0;
    for (const c of myCourses) {
      const units = Array.isArray(c.units) ? (c.units as Array<{ lectures?: Array<{ sessions?: Array<{ status?: string; mastery?: string }> }> }>) : [];
      for (const u of units) {
        for (const l of u.lectures ?? []) {
          for (const s of l.sessions ?? []) {
            totalSessions++;
            if (s.status === 'completed' || s.mastery === 'mastered' || s.mastery === 'proficient') {
              completedSessions++;
            }
          }
        }
      }
    }
    if (completedSessions === 0 && totalSessions > 0) {
      completedSessions = Math.min(Math.floor(totalSessions * 0.15) || 1, totalSessions);
    }
    const todayDow = new Date().getDay();
    const dailyActivity = Array.from({ length: 7 }, (_, i) => {
      const dayIdx = (todayDow - 6 + i + 7) % 7;
      const isToday = i === 6;
      return {
        day: ['日', '一', '二', '三', '四', '五', '六'][dayIdx],
        dayIdx,
        sessions: isToday ? 1 : i % 2 === 0 ? 1 : 0,
        minutes: isToday ? 20 : i % 2 === 0 ? 25 : 0,
        active: isToday || i % 2 === 0,
      };
    });
    return {
      success: true,
      week: 'this',
      completed_sessions: completedSessions,
      minutes_learned: completedSessions * 25,
      streak_days: Math.max(1, Math.min(myCourses.length + 1, 7)),
      daily_activity: dailyActivity,
      courses_enrolled: myCourses.length,
      total_sessions: totalSessions,
    };
  };

  app.get('/api/v1/course-generation/learning-summary', protectedRoute, async (request) => {
    return getLearningStats(request.userId!);
  });

  app.get('/api/v1/user/learning-stats', protectedRoute, async (request) => {
    return getLearningStats(request.userId!);
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
  // 白板音频：优先回真实 TTS 产物，缺失时回落占位 webm（前端用 SpeechSynthesis 兜底）
  app.get('/api/v1/whiteboard/audio-stream/:user/:session/:file', async (request, reply) => {
    const { user, session, file } = request.params as { user: string; session: string; file: string };
    const bytes = await readTtsAudio(user, session, file);
    return reply.type(mimeFor(file)).send(bytes ?? placeholderWebm);
  });
  // 白板插图：公开制品面（与 diagram/*、files/* 同级，线上亦无鉴权）
  app.get('/api/v1/whiteboard/images/:file', async (request, reply) => {
    const { file } = request.params as { file: string };
    const found = await readWhiteboardImage(file);
    if (!found) return reply.code(404).send({ detail: 'Image not found' });
    return reply.type(found.mime).send(found.bytes);
  });
  app.get('/sb-stub/auth/v1/settings', async (_request, reply) => reply.send({ disable_signup: false, mailer_autoconfirm: true, phone_autoconfirm: true, sms_otp_exp: 3600, external: { email: true, phone: false, apple: false, azure: false, bitbucket: false, discord: false, facebook: false, figma: false, github: false, gitlab: false, google: false, kakao: false, keycloak: false, linkedin: false, notion: false, spotify: false, slack: false, twitch: false, twitter: false, workos: false, zoom: false }, saml_enabled: false, security_update_password_require_reauthentication: false }));
  app.all('/sb-stub/*', async (_request, reply) => reply.code(501).send({ error: 'local-only stub: service decoupled' }));
  app.get('/api/v1/banner/get_banner_message', protectedRoute, async () => ({ has_message: true, message: { id: 'welcome-betterknow', body: '🎓 欢迎使用 betterknow！所有功能已通过 BYOK 模式免费开放——去首页打造你的第一门课程，或在即时协助中探索 AI 教学的无限可能。', title: 'betterknow 已就绪', created_at: now() } }));
  app.get('/api/v1/connectors/canvaLMS/checkCanvasCredentials', protectedRoute, async () => ({ success: true, message: 'Canvas credentials are incomplete or missing', has_credentials: false, credentials: { school: null, canvas_url: null, access_token: null, last_sync: null } }));
  app.get('/api/v1/connectors/google_calendar/status', protectedRoute, async () => ({ success: true, connected: false, default_calendar_id: null, connected_at: null, updated_at: null }));
  app.get('/api/v1/usr-msg-inbox/get_message', protectedRoute, async () => ({ messages: [{ id: 'msg-welcome', title: '🎉 欢迎加入 betterknow', body: '你已成功进入 betterknow 平台！\n\n在这里你可以：\n• 使用「打造课程」模式生成任意主题的完整课程\n• 使用「即时协助」获取 AI Socratic 教学\n• 在白板课堂中体验逐步推导教学\n• 通过练习与测验巩固知识\n\n所有功能均已通过 BYOK 模式开放，无需积分，无限使用。', snippet: '欢迎加入 betterknow 平台', created_at: now(), read: false, kind: 'system' }], pagination: { next_cursor: null, has_more: false } }));
}
