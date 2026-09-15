import { spawn } from 'node:child_process';

const MAX_OUTPUT = 8 * 1024;
const TIMEOUT_MS = 5_000;

type SandboxOptions = { code: string; language: 'javascript' | 'python' };

export async function runSandboxed({ code, language }: SandboxOptions): Promise<{ stdout: string; stderr: string; timedOut: boolean }> {
  const command = language === 'javascript' ? 'node' : 'python3';
  const args = language === 'javascript' ? ['--input-type=module', '-e', code] : ['-c', code];
  const env = { PATH: process.env.PATH ?? '/usr/local/bin:/usr/bin:/bin', HOME: process.env.HOME ?? '/tmp', TMPDIR: process.env.TMPDIR ?? '/tmp' };
  const result = (Promise as unknown as { withResolvers<T>(): { promise: Promise<T>; resolve: (value: T) => void } }).withResolvers<{ stdout: string; stderr: string; timedOut: boolean }>();
  let stdout: Buffer<ArrayBufferLike> = Buffer.alloc(0); let stderr: Buffer<ArrayBufferLike> = Buffer.alloc(0); let timedOut = false; let settled = false;
  const child = spawn(command, args, { detached: process.platform !== 'win32', env, stdio: ['ignore', 'pipe', 'pipe'] });
  const append = (current: Buffer<ArrayBufferLike>, chunk: Uint8Array): Buffer<ArrayBufferLike> => current.length >= MAX_OUTPUT ? current : Buffer.concat([current, chunk.subarray(0, MAX_OUTPUT - current.length)]);
  child.stdout?.on('data', (chunk: Buffer) => { stdout = append(stdout, chunk); });
  child.stderr?.on('data', (chunk: Buffer) => { stderr = append(stderr, chunk); });
  let timer: NodeJS.Timeout | undefined;
  const finish = (): void => { if (!settled) { settled = true; clearTimeout(timer); result.resolve({ stdout: stdout.toString('utf8'), stderr: stderr.toString('utf8'), timedOut }); } };
  child.once('error', (error) => { stderr = append(stderr, Buffer.from(error.message)); finish(); });
  child.once('close', finish);
  timer = setTimeout(() => {
    if (settled) return;
    timedOut = true;
    try { if (child.pid && process.platform !== 'win32') process.kill(-child.pid, 'SIGKILL'); else child.kill('SIGKILL'); } catch { /* Process may have exited between checks. */ }
  }, TIMEOUT_MS);
  return result.promise;
}
