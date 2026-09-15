import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
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
}

const emptyState = (): AppState => ({ users: {}, refresh_tokens: {}, conversations: {}, shares: {}, drive: {}, folders: {}, memories: {}, deep_learn: {}, whiteboards: {}, courses: {}, calendar: {} });
const dataFile = resolve(process.env.HYPERCLONE_DATA_DIR ?? 'var/data', 'state.json');
let pending: Promise<unknown> = Promise.resolve();

export async function readState(): Promise<AppState> {
  try { return { ...emptyState(), ...JSON.parse(await readFile(dataFile, 'utf8')) as AppState }; }
  catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return emptyState();
    throw error;
  }
}

export async function updateState<T>(change: (state: AppState) => T | Promise<T>): Promise<T> {
  const run = pending.then(async () => {
    const state = await readState();
    const result = await change(state);
    await mkdir(dirname(dataFile), { recursive: true });
    const temporary = `${dataFile}.${process.pid}.tmp`;
    await writeFile(temporary, JSON.stringify(state, null, 2));
    await rename(temporary, dataFile);
    return result;
  });
  pending = run.catch(() => undefined);
  return run;
}

export function now(): string { return new Date().toISOString(); }
