// 课程生成 run 记录：对齐线上 `/api/v1/course-generation/generation-log/{run_id}` 的字段。
// 落盘 `var/data/generation_runs/{run_id}.json`（每个 run 一个文件，避免 state.json 膨胀）。
import { mkdir, readFile, readdir, rename, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const runsDir = resolve(process.env.HYPERCLONE_DATA_DIR ?? 'var/data', 'generation_runs');

export type RunStatus = 'running' | 'completed' | 'failed' | 'disconnected';

export interface RunEvent { t: string; dir: 'client' | 'server' | 'system'; type: string; [key: string]: unknown }

export interface RunTargets { sessionIds: string[]; unitIds: string[]; stageIds: string[] }

export interface RunRecord {
  run_id: string;
  user_id: string;
  course_uuid: string;
  conversation_id: string | null;
  query: string;
  status: RunStatus;
  events: RunEvent[];
  error_logs: string[];
  started_at: string;
  ended_at: string | null;
  updated_at: string;
  total_run_time: number;
  // 生成中的目标：generation-status 的 generatingSessionIds/UnitIds/StageIds 直接读这里
  targets: RunTargets;
  url: string;
  rating_value: number | null;
  rating_comments: string | null;
}

// 同一个 run 的写入必须串行：emit 是 fire-and-forget，并发的 read-modify-write 会把文件写坏。
// 另外先写临时文件再 rename，读侧永远不会看到半截 JSON。
const writeQueues = new Map<string, Promise<unknown>>();

function enqueueWrite<T>(runId: string, work: () => Promise<T>): Promise<T> {
  const previous = writeQueues.get(runId) ?? Promise.resolve();
  const next = previous.then(work, work);
  writeQueues.set(runId, next.catch(() => undefined));
  void next.catch(() => undefined).then(() => { if (writeQueues.get(runId) === next || writeQueues.size > 200) writeQueues.delete(runId); });
  return next;
}

async function writeRun(record: RunRecord): Promise<void> {
  await mkdir(runsDir, { recursive: true });
  const target = resolve(runsDir, `${record.run_id}.json`);
  const temporary = `${target}.${process.pid}.${Date.now()}.tmp`;
  await writeFile(temporary, JSON.stringify(record, null, 1), 'utf8');
  await rename(temporary, target);
}

export async function readRun(runId: string): Promise<RunRecord | undefined> {
  if (!/^[A-Za-z0-9-]{6,64}$/.test(runId)) return undefined;
  const record = await readRunFile(runId);
  if (!record) return undefined;
  return { ...record, targets: record.targets ?? { sessionIds: [], unitIds: [], stageIds: [] } };
}

async function readRunFile(runId: string): Promise<RunRecord | undefined> {
  try { return JSON.parse(await readFile(resolve(runsDir, `${runId}.json`), 'utf8')) as RunRecord; } catch { return undefined; }
}

export async function startRun(input: { runId: string; userId: string; courseUuid: string; query: string; conversationId?: string }): Promise<RunRecord> {
  const now = new Date().toISOString();
  const record: RunRecord = {
    run_id: input.runId,
    user_id: input.userId,
    course_uuid: input.courseUuid,
    conversation_id: input.conversationId ?? null,
    query: input.query,
    status: 'running',
    events: [],
    error_logs: [],
    started_at: now,
    ended_at: null,
    updated_at: now,
    total_run_time: 0,
    targets: { sessionIds: [], unitIds: [], stageIds: [] },
    url: `/response/course-generation/${input.courseUuid}`,
    rating_value: null,
    rating_comments: null,
  };
  await enqueueWrite(input.runId, () => writeRun(record));
  return record;
}

export async function appendRun(runId: string, event: Omit<RunEvent, 't'> & { t?: string }): Promise<void> {
  return enqueueWrite(runId, async () => {
  const record = await readRun(runId);
  if (!record) return;
  record.events.push({ t: event.t ?? new Date().toISOString(), ...event } as RunEvent);
  record.updated_at = new Date().toISOString();
  record.total_run_time = Number(((Date.parse(record.updated_at) - Date.parse(record.started_at)) / 1000).toFixed(3));
  await writeRun(record);
  });
}

export async function setRunTargets(runId: string, targets: Partial<RunTargets>): Promise<void> {
  return enqueueWrite(runId, async () => {
  const record = await readRun(runId);
  if (!record) return;
  record.targets = { ...record.targets ?? { sessionIds: [], unitIds: [], stageIds: [] }, ...targets };
  record.updated_at = new Date().toISOString();
  await writeRun(record);
  });
}

// 进程被杀/断连后 run 会永远停在 running：读之前先把过期的收掉，免得「生成中」卡死
export async function sweepStaleRuns(maxIdleMs = 15 * 60_000): Promise<number> {
  let files: string[] = [];
  try { files = await readdir(runsDir); } catch { return 0; }
  let swept = 0;
  for (const file of files) {
    if (!file.endsWith('.json')) continue;
    const record = await readRun(file.replace(/\.json$/, ''));
    if (!record || record.status !== 'running') continue;
    if (Date.now() - Date.parse(record.updated_at) < maxIdleMs) continue;
    await finishRun(record.run_id, 'disconnected', 'run stale: no events for over 15 minutes');
    swept += 1;
  }
  return swept;
}

export async function activeRuns(filter: { userId: string; courseUuid?: string }): Promise<RunRecord[]> {
  const records = await listRuns({ userId: filter.userId, courseUuid: filter.courseUuid, limit: 20 });
  return records.filter((record) => record.status === 'running');
}

// 「正在生成什么」只能从 run 事件重放：step 事件给阶段，progress 事件的 stage_name 给目标 id。
// 线上 generating*Ids 的语义未观测到非空样本，这里按「阶段仍在 loading 时才列出」实现，属推断。
export function generatingTargets(records: RunRecord[]): { sessionIds: string[]; unitIds: string[]; stageIds: string[]; assessments: boolean } {
  const loading = new Set<string>();
  const sessionIds = new Set<string>();
  const unitIds = new Set<string>();
  const stageIds = new Set<string>();
  for (const record of records) {
    for (const event of record.events) {
      if (event.type === 'course_generation_step') {
        const step = String(event.step_id ?? '');
        if (event.status === 'loading') loading.add(step); else loading.delete(step);
        continue;
      }
      const stage = (event.data as Record<string, unknown> | undefined)?.stage_name;
      if (typeof stage !== 'string') continue;
      const parts = stage.split(':');
      if (parts[0] === 'session_outline') { if (parts[1]) unitIds.add(parts[1]); if (parts[2]) sessionIds.add(parts[2]); }
      if (parts[0] === 'project_stage' && parts[2]) stageIds.add(parts[2]);
    }
  }
  const sessionLoading = loading.has('generating_session_outlines');
  const assessLoading = loading.has('generating_assessments');
  return {
    sessionIds: sessionLoading ? [...sessionIds] : [],
    unitIds: sessionLoading ? [...unitIds] : [],
    stageIds: assessLoading ? [...stageIds] : [],
    assessments: assessLoading,
  };
}

export async function finishRun(runId: string, status: RunStatus, errorLog?: string): Promise<void> {
  return enqueueWrite(runId, async () => {
  const record = await readRun(runId);
  if (!record) return;
  record.status = status;
  record.ended_at = new Date().toISOString();
  record.updated_at = record.ended_at;
  record.total_run_time = Number(((Date.parse(record.ended_at) - Date.parse(record.started_at)) / 1000).toFixed(3));
  if (errorLog) record.error_logs.push(errorLog);
  await writeRun(record);
  });
}

export async function listRuns(filter: { conversationId?: string; courseUuid?: string; userId: string; limit?: number }): Promise<RunRecord[]> {
  let files: string[] = [];
  try { files = await readdir(runsDir); } catch { return []; }
  const records: RunRecord[] = [];
  for (const file of files.slice(-500)) {
    if (!file.endsWith('.json')) continue;
    const record = await readRun(file.replace(/\.json$/, ''));
    if (!record || record.user_id !== filter.userId) continue;
    if (filter.conversationId && record.conversation_id !== filter.conversationId) continue;
    if (filter.courseUuid && record.course_uuid !== filter.courseUuid) continue;
    records.push(record);
  }
  return records.sort((a, b) => b.started_at.localeCompare(a.started_at)).slice(0, filter.limit ?? 20);
}
