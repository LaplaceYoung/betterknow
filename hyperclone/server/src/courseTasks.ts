// 课程生成任务：与 socket 生命周期解耦的服务端任务。
// 为什么要有它：管线跑在 socket 回调里时，用户一离开页面任务就断（run 记 disconnected），
// 重连也没有进度可回放，generation-status 的 generating*Ids 也就无从观测。
// 现在任务自己持有帧日志：attach → 先回放再订阅，断开只是 detach。
import { randomUUID } from 'node:crypto';
import type { ByokConfig } from './config.js';
import { appendRun, finishRun, setRunTargets, startRun, type RunTargets } from './runs.js';
import { now, readState, updateState } from './store.js';

export type CourseTaskStatus = 'running' | 'awaiting_answers' | 'completed' | 'failed' | 'stopped';

export interface CourseTaskFrame { type: string; [key: string]: unknown }

export interface CourseTask {
  task_id: string;
  user_id: string;
  course_uuid: string;
  query: string;
  answers: Array<{ question: string; answer: string }>;
  status: CourseTaskStatus;
  frames: CourseTaskFrame[];
  targets: RunTargets;
  error?: string;
  started_at: string;
  updated_at: string;
}

type Subscriber = (frame: CourseTaskFrame) => void;

const tasks = new Map<string, CourseTask>();
const subscribers = new Map<string, Set<Subscriber>>();
const runners = new Map<string, () => Promise<void>>();
const MAX_TASKS = 30;

export function getTask(taskId: string): CourseTask | undefined { return tasks.get(taskId); }

export function findActiveTask(filter: { userId: string; courseUuid?: string }): CourseTask | undefined {
  return [...tasks.values()]
    .filter((task) => task.user_id === filter.userId)
    .filter((task) => (filter.courseUuid ? task.course_uuid === filter.courseUuid : true))
    .filter((task) => task.status === 'running' || task.status === 'awaiting_answers')
    .sort((a, b) => b.started_at.localeCompare(a.started_at))[0];
}

function evictOldTasks(): void {
  if (tasks.size <= MAX_TASKS) return;
  const done = [...tasks.values()].filter((task) => task.status !== 'running' && task.status !== 'awaiting_answers').sort((a, b) => a.updated_at.localeCompare(b.updated_at));
  for (const task of done.slice(0, tasks.size - MAX_TASKS)) { tasks.delete(task.task_id); subscribers.delete(task.task_id); }
}

export function attachTask(taskId: string, send: Subscriber): () => void {
  const task = tasks.get(taskId);
  if (!task) return () => undefined;
  for (const frame of task.frames) send(frame);
  if (task.status === 'completed' || task.status === 'failed' || task.status === 'stopped') return () => undefined;
  const bucket = subscribers.get(taskId) ?? new Set<Subscriber>();
  bucket.add(send);
  subscribers.set(taskId, bucket);
  return () => { bucket.delete(send); };
}

export function closeTaskSubscribers(taskId: string): void { subscribers.delete(taskId); }

function broadcast(task: CourseTask, frame: CourseTaskFrame): void {
  for (const send of subscribers.get(task.task_id) ?? []) {
    try { send(frame); } catch { /* 订阅端已断：attach 时会被自然清掉 */ }
  }
}

// 帧日志 = 客户端能看到的全部内容；同时落 run（generation-log）并推进 targets
function record(task: CourseTask, frame: CourseTaskFrame): void {
  const persisted: CourseTaskFrame = { ...frame };
  task.frames.push(persisted);
  task.updated_at = now();
  const { type, ...rest } = persisted as { type: string } & Record<string, unknown>;
  if (type === 'course_generation_step') {
    const stepId = String(rest.step_id ?? '');
    const status = String(rest.status ?? '');
    const targets: Partial<RunTargets> = {};
    if (stepId === 'generating_session_outlines' && status === 'completed') targets.sessionIds = [];
    task.targets = { ...task.targets, ...targets };
  }
  void appendRun(task.task_id, { dir: 'server', type, ...rest });
  if (type === 'course_generation_questions') { task.status = 'awaiting_answers'; }
  if (type === 'course_generation_complete') { task.status = 'completed'; void finishRun(task.task_id, 'completed'); evictOldTasks(); }
}

export interface StartTaskInput {
  userId: string;
  courseUuid: string;
  query: string;
  answers?: Array<{ question: string; answer: string }>;
  eff?: ByokConfig;
  conversationId?: string;
}

async function ensureCoursePlaceholder(input: StartTaskInput): Promise<boolean> {
  const state = await readState();
  const existing = state.courses[input.courseUuid];
  if (existing && Array.isArray(existing.units) && existing.units.length) return true;
  if (!existing) {
    await updateState((next) => {
      next.courses[input.courseUuid] = { courseUuid: input.courseUuid, user_id: input.userId, courseTitle: input.query, courseDescription: '', status: 'generating', units: [], created_at: now() };
    });
  } else if (existing.status !== 'generating') {
    await updateState((next) => { const course = next.courses[input.courseUuid]; if (course) course.status = 'generating'; });
  }
  return false;
}

async function driveTask(task: CourseTask, eff?: ByokConfig): Promise<void> {
  const { runCourseGeneration } = await import('./pipelines.js');
  const deferred: CourseTaskFrame[] = [];
  const emitGated = (frame: Record<string, unknown>): void => {
    // 完成帧留到课程真正落盘之后再发，避免客户端刷新时读到空课程
    if (frame.type === 'course_generation_complete') { deferred.push(frame as CourseTaskFrame); return; }
    record(task, frame as CourseTaskFrame);
    broadcast(task, frame as CourseTaskFrame);
  };
  const piped = await runCourseGeneration(emitGated, { query: task.query, answers: task.answers, courseUuid: task.course_uuid, userId: task.user_id, eff });
  if (piped && Array.isArray(piped.units)) {
    await updateState((state) => { state.courses[task.course_uuid] = { ...piped, user_id: task.user_id, status: 'ready' }; });
  }
  for (const frame of deferred) { record(task, frame); broadcast(task, frame); }
}

export async function startCourseTask(input: StartTaskInput): Promise<CourseTask> {
  const existing = findActiveTask({ userId: input.userId, courseUuid: input.courseUuid });
  if (existing) return existing;
  const taskId = randomUUID();
  await startRun({ runId: taskId, userId: input.userId, courseUuid: input.courseUuid, query: input.query, conversationId: input.conversationId });
  await appendRun(taskId, { dir: 'client', type: 'start_course_generation', query: input.query, ui_language: 'zh-CN', attachment_count: 0, attachment_paths: [], interactive_structure: true });
  await appendRun(taskId, { dir: 'system', type: 'credits_charged', amount: 0, byok: true });
  const task: CourseTask = {
    task_id: taskId,
    user_id: input.userId,
    course_uuid: input.courseUuid,
    query: input.query,
    answers: input.answers ?? [],
    status: 'running',
    frames: [],
    targets: { sessionIds: [], unitIds: [], stageIds: [] },
    started_at: now(),
    updated_at: now(),
  };
  tasks.set(taskId, task);
  const alreadyBuilt = await ensureCoursePlaceholder(input);
  record(task, { type: 'course_generation_started', course_uuid: task.course_uuid, run_dir: `var/data/courses/${task.course_uuid}`, run_id: taskId });
  broadcast(task, { type: 'course_generation_started', course_uuid: task.course_uuid, run_dir: `var/data/courses/${task.course_uuid}`, run_id: taskId });
  if (alreadyBuilt) {
    // 课程已存在：任务即刻完成，回完成帧，不重跑管线
    const state = await readState();
    const course = state.courses[task.course_uuid];
    const frame: CourseTaskFrame = { type: 'course_generation_complete', course, course_uuid: task.course_uuid };
    record(task, frame);
    broadcast(task, frame);
    return task;
  }
  runners.set(taskId, async () => {
    try {
      await driveTask(task, input.eff);
      if (task.status === 'running') task.status = 'awaiting_answers';
    } catch (error) {
      task.status = 'failed';
      task.error = error instanceof Error ? error.message : 'generation failed';
      record(task, { type: 'error', message: task.error, is_complete: true });
      broadcast(task, { type: 'error', message: task.error, is_complete: true });
      await finishRun(taskId, 'failed', task.error);
    }
  });
  const run = runners.get(taskId)!;
  void run();
  return task;
}

export async function submitTaskAnswers(taskId: string, answers: Array<{ question: string; answer: string }>, eff?: ByokConfig): Promise<CourseTask | undefined> {
  const task = tasks.get(taskId);
  if (!task) return undefined;
  if (task.status !== 'awaiting_answers' && task.status !== 'running') return task;
  task.answers = answers;
  task.status = 'running';
  await appendRun(taskId, { dir: 'client', type: 'course_generation_answers', answers });
  record(task, { type: 'course_generation_answers_received', answers });
  broadcast(task, { type: 'course_generation_answers_received', answers });
  runners.set(taskId, async () => {
    try { await driveTask(task, eff); if (task.status === 'running') task.status = 'awaiting_answers'; }
    catch (error) {
      task.status = 'failed';
      task.error = error instanceof Error ? error.message : 'generation failed';
      await finishRun(taskId, 'failed', task.error);
    }
  });
  const run = runners.get(taskId)!;
  void run();
  return task;
}

export async function stopCourseTask(taskId: string): Promise<boolean> {
  const task = tasks.get(taskId);
  if (!task) return false;
  task.status = 'stopped';
  task.updated_at = now();
  closeTaskSubscribers(taskId);
  await appendRun(taskId, { dir: 'system', type: 'stopped' });
  await finishRun(taskId, 'disconnected', 'stopped by client');
  return true;
}

// 进程重启后内存里的任务没了：把 run 目录里还在 running 的标成断开（与 runs.sweepStaleRuns 互补）
export async function stopAllTasks(): Promise<void> {
  for (const taskId of [...tasks.keys()]) await stopCourseTask(taskId);
}

export async function setTaskTargets(taskId: string, targets: Partial<RunTargets>): Promise<void> {
  const task = tasks.get(taskId);
  if (!task) return;
  task.targets = { ...task.targets, ...targets };
  await setRunTargets(taskId, targets);
}
