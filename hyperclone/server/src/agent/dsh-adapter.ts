// Agent 核心适配：把主聊天的一轮 user_message 交给 DeepSeek Harness runtime（agent-runtime/bin/bk-agent，headless 一次性任务）。
// stderr = 推理流 → thinking_chunk；stdout = 最终答复 → content_chunk。任何失败（未配 key / 超时 / 非零退出）→ 返回 ok:false，调用方回退内置管线。
import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

export interface DshRunOptions { timeoutMs?: number; onThinking?: (chunk: string) => void; onContent?: (chunk: string) => void; systemHint?: string }
export interface DshRunResult { ok: boolean; output: string; error?: string; exitCode?: number; durationMs: number }

const RUNTIME_DIR = process.env.AGENT_RUNTIME_DIR ?? resolve(new URL('../../../../agent-runtime', import.meta.url).pathname);
const BIN = resolve(RUNTIME_DIR, 'bin/bk-agent');

export function dshAvailable(): { available: boolean; bin: string; home: string } {
  return { available: existsSync(BIN), bin: BIN, home: resolve(RUNTIME_DIR, 'home') };
}

export function runDshTask(task: string, opts: DshRunOptions = {}): Promise<DshRunResult> {
  const started = Date.now();
  return new Promise((done) => {
    if (!existsSync(BIN)) return done({ ok: false, output: '', error: `bk-agent not found at ${BIN}`, durationMs: 0 });
    const prompt = opts.systemHint ? `${opts.systemHint}\n\n${task}` : task;
    const child = spawn('bash', [BIN, prompt], { cwd: RUNTIME_DIR, env: { ...process.env, DSH_HOME: resolve(RUNTIME_DIR, 'home'), NO_COLOR: '1' } });
    let out = ''; let err = '';
    const timer = setTimeout(() => { child.kill('SIGKILL'); }, opts.timeoutMs ?? 120_000);
    child.stdout.on('data', (b: Buffer) => { const s = b.toString(); out += s; opts.onContent?.(s); });
    child.stderr.on('data', (b: Buffer) => { const s = b.toString(); err += s; for (const line of s.split('\n')) if (line.trim()) opts.onThinking?.(line.trim()); });
    child.on('close', (code) => {
      clearTimeout(timer);
      const ok = code === 0 && out.trim().length > 0;
      done({ ok, output: out.trim(), error: ok ? undefined : (err.trim().split('\n').slice(-3).join(' | ') || `exit ${code}`), exitCode: code ?? -1, durationMs: Date.now() - started });
    });
    child.on('error', (e) => { clearTimeout(timer); done({ ok: false, output: '', error: e.message, durationMs: Date.now() - started }); });
  });
}
