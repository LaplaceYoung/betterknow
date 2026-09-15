// 课程生成 run 记录：对齐线上 `/api/v1/course-generation/generation-log/{run_id}` 的字段。
// 落盘 `var/data/generation_runs/{run_id}.json`（每个 run 一个文件，避免 state.json 膨胀）。
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const runsDir = resolve(process.env.HYPERCLONE_DATA_DIR ?? 'var/data', 'generation_runs');

export type RunStatus = 'running' | 'completed' | 'failed' | 'disconnected';

export interface RunEvent { t: string; dir: 'client' | 'server' | 'system'; type: string; [key: string]: unknown }

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
  url: string;
  rating_value: number | null;
  rating_comments: string | null;
}

async function writeRun(record: RunRecord): Promise<void> {
  await mkdir(runsDir, { recursive: true });
  await writeFile(resolve(runsDir, `${record.run_id}.json`), JSON.stringify(record, null, 1), 'utf8');
}

export async function readRun(runId: string): Promise<RunRecord | undefined> {
  if (!/^[A-Za-z0-9-]{6,64}$/.test(runId)) return undefined;
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
    url: `/response/course-generation/${input.courseUuid}`,
    rating_value: null,
    rating_comments: null,
  };
  await writeRun(record);
  return record;
}

export async function appendRun(runId: string, event: Omit<RunEvent, 't'> & { t?: string }): Promise<void> {
  const record = await readRun(runId);
  if (!record) return;
  record.events.push({ t: event.t ?? new Date().toISOString(), ...event } as RunEvent);
  record.updated_at = new Date().toISOString();
  record.total_run_time = Number(((Date.parse(record.updated_at) - Date.parse(record.started_at)) / 1000).toFixed(3));
  await writeRun(record);
}

export async function finishRun(runId: string, status: RunStatus, errorLog?: string): Promise<void> {
  const record = await readRun(runId);
  if (!record) return;
  record.status = status;
  record.ended_at = new Date().toISOString();
  record.updated_at = record.ended_at;
  record.total_run_time = Number(((Date.parse(record.ended_at) - Date.parse(record.started_at)) / 1000).toFixed(3));
  if (errorLog) record.error_logs.push(errorLog);
  await writeRun(record);
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
