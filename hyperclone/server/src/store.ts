import { mkdir, readFile, rename, unlink, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

export interface UserRecord {
  id: string; username: string; email: string; password_hash: string; password_salt: string;
  credits: number; max_credits: number; created_at: string; last_reset_at: string;
  byok?: import('./config.js').ByokConfig & { enabled?: boolean };
}
export interface ConversationRecord {
  conversation_id: string; user_id: string; title: string; created_at: string; updated_at: string;
  history_index: number; history: Array<Record<string, unknown>>; starred: boolean;
  board_session_types: string[]; artifacts: Array<Record<string, unknown>>;
}
export interface AppState {
  users: Record<string, UserRecord>;
  refresh_tokens: Record<string, { user_id: string; expires_at: number }>;
  conversations: Record<string, ConversationRecord>;
  shares: Record<string, { record_id: string; type: string; shared_object_id: string; sharing_ends_at: string | null }>;
  drive: Record<string, Record<string, Record<string, unknown>>>;
  folders: Record<string, Record<string, Record<string, unknown>>>;
  memories: Record<string, { profile_data: Array<Record<string, unknown>>; external_memory: { content: string; updated_at: string | null }; items: Array<Record<string, unknown>> }>;
  deep_learn: Record<string, Record<string, unknown>>;
  whiteboards: Record<string, Record<string, unknown>>;
  courses: Record<string, Record<string, unknown>>;
  calendar: Record<string, Array<Record<string, unknown>>>;
  usageCounters?: Record<string, Record<string, number>>;
}

const emptyState = (): AppState => ({ users: {}, refresh_tokens: {}, conversations: {}, shares: {}, drive: {}, folders: {}, memories: {}, deep_learn: {}, whiteboards: {}, courses: {}, calendar: {} });
const dataDir = resolve(process.env.HYPERCLONE_DATA_DIR ?? 'var/data');
const dataFile = resolve(dataDir, 'state.json');
const lockFile = resolve(dataDir, 'state.lock');
let pending: Promise<unknown> = Promise.resolve();

// 同一份 var/data 可能被多个进程打开（例如旧构建的实例没退干净）：进程内串行不够，
// 必须用文件锁把「读-改-写」整体扣起来，否则后写的进程会用旧快照覆盖别人的配置。
const LOCK_STALE_MS = 15_000;
const LOCK_WAIT_MS = 10_000;

function processAlive(pid: number): boolean {
  if (!Number.isInteger(pid) || pid <= 0) return false;
  try { process.kill(pid, 0); return true; } catch (error) { return (error as NodeJS.ErrnoException).code === 'EPERM'; }
}

async function takeLock(): Promise<void> {
  const deadline = Date.now() + LOCK_WAIT_MS;
  for (;;) {
    try {
      await mkdir(dataDir, { recursive: true });
      await writeFile(lockFile, JSON.stringify({ pid: process.pid, at: Date.now() }), { flag: 'wx' });
      return;
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code !== 'EEXIST') throw error;
    }
    const holder = await readFile(lockFile, 'utf8').then((text) => JSON.parse(text) as { pid?: number; at?: number }).catch(() => ({ pid: 0, at: 0 }));
    const stale = !processAlive(Number(holder.pid)) || Date.now() - Number(holder.at ?? 0) > LOCK_STALE_MS;
    if (stale || Date.now() > deadline) { await unlink(lockFile).catch(() => undefined); continue; }
    await new Promise((done) => setTimeout(done, 25));
  }
}

async function releaseLock(): Promise<void> { await unlink(lockFile).catch(() => undefined); }

async function inLock<T>(work: () => Promise<T>): Promise<T> {
  await takeLock();
  try { return await work(); } finally { await releaseLock(); }
}

export async function readState(): Promise<AppState> {
  try { return { ...emptyState(), ...JSON.parse(await readFile(dataFile, 'utf8')) as AppState }; }
  catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return emptyState();
    throw error;
  }
}

export async function updateState<T>(change: (state: AppState) => T | Promise<T>): Promise<T> {
  const run = pending.then(() => inLock(async () => {
    const state = await readState();
    const result = await change(state);
    await mkdir(dirname(dataFile), { recursive: true });
    const temporary = `${dataFile}.${process.pid}.${Date.now()}.tmp`;
    await writeFile(temporary, JSON.stringify(state, null, 2));
    await rename(temporary, dataFile);
    return result;
  }));
  pending = run.catch(() => undefined);
  return run;
}

export function dataDirectory(): string { return dataDir; }

export function now(): string { return new Date().toISOString(); }
