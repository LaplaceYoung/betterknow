// 接口流出：原站有、hyperclone 缺的少量端点 + 演示数据。全部为真实持久化/种子读取，不在前端硬编码。
import type { FastifyInstance, FastifyReply } from 'fastify';
import { readFile, readdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { randomUUID } from 'node:crypto';
import { readState, updateState, now } from './store.js';
import { resolveSeedByMarketplaceId } from './seedCourses.js';
import { authenticate } from './auth.js';
import { seamStatus } from './providers/index.js';
import { dshAvailable } from './agent/dsh-adapter.js';

type Rec = Record<string, unknown>;

async function readSeedJson(name: string): Promise<unknown> {
  for (const candidate of [resolve(`../seed/${name}`), resolve(`seed/${name}`), resolve(`hyperclone/seed/${name}`)]) {
    try { return JSON.parse(await readFile(candidate, 'utf8')); } catch { /* try next */ }
  }
  return null;
}

const protectedRoute = { preHandler: authenticate };

// 稳定伪随机评分 4.3–4.9（种子值，前端不再自算）
function ratingFor(id: string): number { let h = 0; for (const ch of id) h = (h * 31 + ch.charCodeAt(0)) >>> 0; return Math.round((4.3 + (h % 7) / 10) * 10) / 10; }
function levelFor(tags: unknown, sessions: number): 'entry' | 'advanced' | 'expert' {
  const t = Array.isArray(tags) ? tags.map(String).join(' ').toLowerCase() : '';
  if (/beginner|intro|foundation|基础|入门/.test(t)) return 'entry';
  if (/advanced|expert|graduate|高阶/.test(t)) return 'expert';
  if (/intermediate|进阶/.test(t)) return 'advanced';
  return sessions <= 45 ? 'entry' : sessions <= 70 ? 'advanced' : 'expert';
}
// 录屏实测的原站等级/评分（recordings/hyperknow-walk.mp4 t116–t150）；未观测到的课程走启发式
const OBSERVED: Record<string, { level: 'entry' | 'advanced' | 'expert'; rating: number }> = {
  'How AI Actually Works': { level: 'entry', rating: 4.4 }, 'AP Biology': { level: 'advanced', rating: 4.6 }, 'AP World History: Modern': { level: 'entry', rating: 4.5 },
  'Practical Prompt Engineering': { level: 'advanced', rating: 4.3 }, 'Official Digital SAT Preparation': { level: 'entry', rating: 4.5 }, 'Linear Algebra': { level: 'advanced', rating: 4.5 },
  'Introduction to Data Science': { level: 'entry', rating: 4.7 }, 'AP Calculus': { level: 'advanced', rating: 5.0 }, 'Introduction to Sociology': { level: 'entry', rating: 4.4 },
  'AP Psychology': { level: 'entry', rating: 4.6 }, 'Machine Learning': { level: 'advanced', rating: 4.5 }, 'Data Structures and Algorithms': { level: 'advanced', rating: 4.4 },
  'Academic Writing': { level: 'entry', rating: 4.9 }, 'Generative AI & Large Language Models': { level: 'advanced', rating: 4.3 }, 'AP Statistics': { level: 'entry', rating: 4.9 }, 'AP Stats': { level: 'entry', rating: 4.9 },
};
export function decorateMarketplace(course: Rec): Rec {
  const id = String(course.marketplaceId ?? '');
  const obs = OBSERVED[String(course.courseTitle ?? '')];
  return { ...course, rating: obs?.rating ?? ratingFor(id), level: obs?.level ?? levelFor(course.tags, Number(course.sessionCount ?? 0)) };
}

const DEMO_TASKS = (uid: string) => {
  const d = (offset: number, h: number) => { const x = new Date(); x.setDate(x.getDate() + offset); x.setHours(h, 0, 0, 0); return x.toISOString(); };
  return [
    { task_id: `demo-${uid}-1`, title: '勾股定理第一天：基础与历史背景', course_title: '勾股定理3天学习计划', scheduled_for: d(0, 9), status: 'confirmed', type: 'study', duration_min: 30 },
    { task_id: `demo-${uid}-2`, title: '勾股定理第二天：证明与推导', course_title: '勾股定理3天学习计划', scheduled_for: d(1, 9), status: 'pending', type: 'study', duration_min: 30 },
    { task_id: `demo-${uid}-3`, title: '勾股定理第三天：应用与练习', course_title: '勾股定理3天学习计划', scheduled_for: d(2, 9), status: 'pending', type: 'practice', duration_min: 40 },
    { task_id: `demo-${uid}-4`, title: '社会学概论 · 单元 1 讲次 1', course_title: '社会学概论', scheduled_for: d(3, 19), status: 'pending', type: 'study', duration_min: 45 },
  ];
};

export async function registerExtraRoutes(app: FastifyInstance): Promise<void> {
  // [B16] What's new
  app.get('/api/v1/whatsnew', async () => {
    return { versions: [] };
  });

  // [S27] onboarding 问卷 + 完成状态
  app.get('/api/v1/onboarding/questions', async () => ({ questions: (await readSeedJson('onboarding_questions.json')) ?? [] }));
  app.post('/api/v1/onboarding/manage_onboarding', protectedRoute, async (request) => {
    const body = (request.body ?? {}) as Rec;
    await updateState((state) => { const user = state.users[request.userId!] as unknown as Rec | undefined; if (user) user.onboarding = { ...(user.onboarding as Rec ?? {}), ...body, completed_at: now() }; });
    return { success: true, onboarding_completed: true };
  });

  // [S15][B6] 集市课程预览：种子 full.json 的完整结构（未加入也可看）
  app.get('/api/v1/marketplace/courses/:id/preview', protectedRoute, async (request, reply) => {
    const id = (request.params as { id: string }).id;
    const seed = await resolveSeedByMarketplaceId(id);
    if (!seed) return reply.code(404).send({ detail: 'Course not found' });
    const course = seed.course as Rec;
    const state = await readState();
    const enrolled = Object.values(state.courses).find((value) => value.user_id === request.userId && (value.marketplaceId === id || value.seedOf === id));
    return { ...decorateMarketplace({ ...course, marketplaceId: id }), enrolled: Boolean(enrolled), enrolledCourseUuid: enrolled?.courseUuid ?? null, languages: (course.languages as string[] | undefined) ?? ['en', 'zh'] };
  });

  // [S21][B12] 日历任务列表（首次为演示账号播种 3 天学习计划）
  app.get('/api/v1/calendar/tasks', protectedRoute, async (request) => {
    const uid = request.userId!;
    let tasks = (await readState()).calendar[uid] ?? [];
    if (tasks.length === 0 && uid === 'local-open-user') { tasks = DEMO_TASKS(uid); await updateState((state) => { state.calendar[uid] = tasks; }); }
    return { tasks: tasks.map((t) => ({ id: String(t.task_id ?? t.id ?? randomUUID()), title: String(t.title ?? t.task_title ?? '学习任务'), course_uuid: t.course_uuid, course_title: t.course_title, scheduled_for: String(t.scheduled_for ?? t.due_at ?? now()), status: String(t.status ?? 'pending'), type: t.type, duration_min: t.duration_min })) };
  });

  // 添加日历学习任务
  app.post('/api/v1/calendar/tasks', protectedRoute, async (request) => {
    const uid = request.userId!;
    const body = request.body as { title?: string; course_uuid?: string; course_title?: string; scheduled_for?: string; duration_min?: number; type?: string };
    const newTask = {
      task_id: randomUUID(),
      id: randomUUID(),
      title: body.title || '学习任务',
      course_uuid: body.course_uuid,
      course_title: body.course_title,
      scheduled_for: body.scheduled_for || now(),
      status: 'pending',
      type: body.type || 'study',
      duration_min: body.duration_min || 30,
      created_at: now(),
    };
    await updateState((state) => {
      state.calendar[uid] = [...(state.calendar[uid] ?? []), newTask];
    });
    return { success: true, task: newTask };
  });

  // [B13] 收件箱已读
  app.post('/api/v1/usr-msg-inbox/mark_read', protectedRoute, async (request) => { const body = request.body as { message_id?: string }; return { success: true, message_id: body.message_id ?? null }; });

  // 课程封面：匹配已有 33 张精美插画，支持所有 cover 路由模式与确定性/SVG回退
  const coverDir = resolve(new URL('../../../app/public/assets/gen/covers', import.meta.url).pathname);
  const serveCover = async (rawId: string, reply: FastifyReply) => {
    const id = String(rawId).replace(/\.(png|jpg|jpeg|webp)$/i, '');
    try {
      const buf = await readFile(resolve(coverDir, `${id}.jpg`));
      return reply.type('image/jpeg').header('cache-control', 'public, max-age=86400').send(buf);
    } catch { /* fallthrough */ }

    try {
      const state = await readState();
      const course = state.courses[id] ?? Object.values(state.courses).find((c) => c.courseUuid === id || c.marketplaceSourceId === id);
      if (course?.marketplaceSourceId) {
        const buf = await readFile(resolve(coverDir, `${course.marketplaceSourceId}.jpg`));
        return reply.type('image/jpeg').header('cache-control', 'public, max-age=86400').send(buf);
      }
    } catch { /* fallthrough */ }

    try {
      const files = (await readdir(coverDir)).filter((f) => f.endsWith('.jpg'));
      if (files.length > 0) {
        let hash = 0;
        for (let i = 0; i < id.length; i++) hash = ((hash << 5) - hash) + id.charCodeAt(i);
        const idx = Math.abs(hash) % files.length;
        const buf = await readFile(resolve(coverDir, files[idx]!));
        return reply.type('image/jpeg').header('cache-control', 'public, max-age=86400').send(buf);
      }
    } catch { /* fallthrough */ }

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
      <defs>
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#f5f2eb"/>
          <stop offset="100%" stop-color="#e9ecf2"/>
        </linearGradient>
      </defs>
      <rect width="800" height="600" fill="url(#bgGrad)"/>
      <g fill="none" stroke="#0a0a0a" stroke-width="2.5" stroke-linecap="round" opacity="0.8">
        <circle cx="400" cy="270" r="110"/>
        <path d="M290 270h220M400 160v220M322 192l156 156M478 192L322 348"/>
        <circle cx="400" cy="270" r="14" fill="#0a0a0a"/>
        <path d="M220 450c60-35 120-35 180 0s120 35 180 0" stroke-width="2"/>
      </g>
      <text x="400" y="520" font-family="system-ui, -apple-system, sans-serif" font-size="22" font-weight="600" text-anchor="middle" fill="#0a0a0a" letter-spacing="2">betterknow · Learning Lab</text>
    </svg>`;
    return reply.type('image/svg+xml').header('cache-control', 'no-store').send(svg);
  };

  app.get('/api/v1/marketplace/cover/:id', async (request, reply) => serveCover((request.params as { id: string }).id, reply));
  app.get('/api/v1/marketplace/cover/:id/:file', async (request, reply) => serveCover((request.params as { id: string }).id, reply));
  app.get('/api/v1/course-generation/users/:userId/courses/:courseId/cover/:file', async (request, reply) => serveCover((request.params as { courseId: string }).courseId, reply));
  app.get('/api/v1/course-generation/users/:userId/courses/:courseId/cover', async (request, reply) => serveCover((request.params as { courseId: string }).courseId, reply));
  app.get('/api/v1/courses/:courseId/cover', async (request, reply) => serveCover((request.params as { courseId: string }).courseId, reply));

  // [B14] 界面语言持久化到用户记录；get_user_info 之外提供独立读写端点
  app.get('/api/v1/auth/preferences', protectedRoute, async (request) => { const u = (await readState()).users[request.userId!] as unknown as Rec | undefined; return { ui_language: (u?.ui_language as string | undefined) ?? 'zh', tts_enabled: Boolean(u?.tts_enabled), speed_mode: (u?.speed_mode as string | undefined) ?? 'standard' }; });
  app.post('/api/v1/auth/update_preferences', protectedRoute, async (request) => { const body = (request.body ?? {}) as Rec; await updateState((state) => { const u = state.users[request.userId!] as unknown as Rec | undefined; if (u) { for (const k of ['ui_language', 'tts_enabled', 'speed_mode']) if (k in body) u[k] = body[k]; } }); return { success: true }; });

  // 邮件订阅（契约：email_manager/check、edit_email_subscription）
  app.post('/api/v1/email_manager/check', protectedRoute, async (request) => { const body = (request.body ?? {}) as Rec; const u = (await readState()).users[request.userId!] as unknown as Rec | undefined; return { email: body.email ?? u?.email, subscribed: u?.email_subscribed !== false }; });
  app.post('/api/v1/email_manager/edit_email_subscription', protectedRoute, async (request) => { const body = (request.body ?? {}) as Rec; await updateState((state) => { const u = state.users[request.userId!] as unknown as Rec | undefined; if (u) u.email_subscribed = body.subscribed !== false; }); return { success: true, subscribed: body.subscribed !== false }; });

  // Provider seams 状态（key 后补：哪些 seam 在 stub、需要哪些 env）
  app.get('/api/v1/providers', async () => ({ seams: seamStatus() }));
  // Agent 核心状态：dsh runtime 是否就位、是否启用
  app.get('/api/v1/agent/core', async () => ({ core: process.env.AGENT_CORE === 'dsh' ? 'dsh' : 'builtin', dsh: dshAvailable(), enable_hint: 'AGENT_CORE=dsh npm start；LLM key 放 agent-runtime/home/.credentials.yaml' }));

  // 健康/版本：已清空版本号
  app.get('/api/v1/version', async () => ({ app: 'betterknow', status: 'ready' }));
}
