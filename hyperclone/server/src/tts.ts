// TTS 服务层（seam 之上）：内容寻址缓存 + 分句 + 语音表 + PCM 直出 + 预取。
// key 接口：所有函数都接受 `eff`（用户 BYOK seam 解析结果），没有 key 时走 stub 占位，接口形状不变。
import { createHash } from 'node:crypto';
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import type { ByokConfig } from './config.js';
import { tts, type TtsResult } from './providers/index.js';

const dataDir = resolve(process.env.HYPERCLONE_DATA_DIR ?? 'var/data');
const audioDir = resolve(dataDir, 'tts');
const MIME: Record<string, string> = { mp3: 'audio/mpeg', wav: 'audio/wav', pcm: 'audio/L16', opus: 'audio/ogg', webm: 'audio/webm', m4a: 'audio/mp4' };

export function ttsMime(ext: string): string { return MIME[ext] ?? 'application/octet-stream'; }

// 线上 voice_id 取值实测为 warm|calm|bright|gentle|firm|lively（PROTOCOL §2.2）；本地映射到 OpenAI 兼容音色。
const BUILTIN_VOICES = ['warm', 'calm', 'bright', 'gentle', 'firm', 'lively'] as const;
const VOICE_ALIAS: Record<string, string> = { warm: 'nova', calm: 'shimmer', bright: 'coral', gentle: 'sage', firm: 'onyx', lively: 'alloy' };
// 音色中文名照线上 zh 词典（tts.voice.*）
const LABELS: Record<string, string> = { warm: '温暖', calm: '沉稳', bright: '明亮', gentle: '柔和', firm: '专业', lively: '轻快' };

export function providerVoice(voiceId: string): string { return VOICE_ALIAS[voiceId] ?? voiceId; }

export interface TtsSegment {
  text: string;
  url: string;
  ext: string;
  mime: string;
  hash: string;
  bytes: number;
  cached: boolean;
  stub: boolean;
  error?: string;
  pcm?: Buffer;
  sample_rate?: number;
}

export interface TtsOptions { voice?: string; speed?: number; format?: 'mp3' | 'wav' | 'pcm'; eff?: ByokConfig }

const stats = { hits: 0, misses: 0, bytes: 0, stub: 0, prefetches: 0 };
const inflight = new Map<string, Promise<TtsSegment>>();

function cacheKey(text: string, opts: TtsOptions): string {
  const eff = opts.eff;
  const scope = eff ? `${eff.provider}|${eff.models?.tts ?? eff.models?.content ?? ''}|${eff.providers?.tts?.model ?? ''}|${eff.providers?.tts?.baseUrl ?? ''}` : 'default';
  return createHash('sha256').update(`${scope}|${opts.voice ?? ''}|${opts.speed ?? 1}|${opts.format ?? 'mp3'}|${text}`).digest('hex').slice(0, 32);
}

export function ttsStats(): { hits: number; misses: number; bytes: number; stub: number; prefetches: number } { return { ...stats }; }

export async function ttsFileCount(): Promise<number> { try { return (await readdir(audioDir)).length; } catch { return 0; } }

// WAV(RIFF) → PCM16；其他容器（mp3/opus）需要解码器，返回 undefined 由调用方回落占位 PCM。
export function pcmFromWav(bytes: Buffer): { pcm: Buffer; sample_rate: number } | undefined {
  if (bytes.length < 44 || bytes.toString('ascii', 0, 4) !== 'RIFF' || bytes.toString('ascii', 8, 12) !== 'WAVE') return undefined;
  let offset = 12; let sampleRate = 24_000; let channels = 1; let bits = 16; let data: Buffer | undefined;
  while (offset + 8 <= bytes.length) {
    const id = bytes.toString('ascii', offset, offset + 4);
    const size = bytes.readUInt32LE(offset + 4);
    const body = bytes.subarray(offset + 8, Math.min(bytes.length, offset + 8 + size));
    if (id === 'fmt ') { channels = body.readUInt16LE(2) || 1; sampleRate = body.readUInt32LE(4) || sampleRate; bits = body.readUInt16LE(14) || 16; }
    if (id === 'data') data = body;
    offset += 8 + size + (size % 2);
  }
  if (!data || bits !== 16) return undefined;
  if (channels <= 1) return { pcm: data, sample_rate: sampleRate };
  const frames = Math.floor(data.length / (2 * channels));
  const mono = Buffer.alloc(frames * 2);
  for (let i = 0; i < frames; i += 1) {
    let sum = 0;
    for (let c = 0; c < channels; c += 1) sum += data.readInt16LE((i * channels + c) * 2);
    mono.writeInt16LE(Math.max(-32_768, Math.min(32_767, Math.round(sum / channels))), i * 2);
  }
  return { pcm: mono, sample_rate: sampleRate };
}

async function synthesizeUncached(text: string, opts: TtsOptions): Promise<TtsSegment> {
  const hash = cacheKey(text, opts);
  const cachedName = (await readdir(audioDir).catch(() => [] as string[])).find((name) => name.startsWith(`${hash}.`));
  if (cachedName) {
    const bytes = await readFile(resolve(audioDir, cachedName)).catch(() => undefined);
    if (bytes) {
      stats.hits += 1;
      const ext = cachedName.split('.').pop() ?? 'mp3';
      const decoded = ext === 'wav' ? pcmFromWav(bytes) : ext === 'pcm' ? { pcm: bytes, sample_rate: 24_000 } : undefined;
      return { text, url: `/api/v1/tts/audio/${cachedName}`, ext, mime: ttsMime(ext), hash, bytes: bytes.length, cached: true, stub: false, ...(decoded ?? {}) };
    }
  }
  const result: TtsResult = await tts.synthesize(text, { voice: providerVoice(opts.voice ?? 'calm'), speed: opts.speed ?? 1, format: opts.format ?? 'mp3' }, opts.eff);
  if (!result.bytes) {
    stats.stub += 1;
    return { text, url: '', ext: result.ext, mime: ttsMime(result.ext), hash, bytes: 0, cached: false, stub: true, ...(result.error ? { error: result.error } : {}) };
  }
  await mkdir(audioDir, { recursive: true });
  const name = `${hash}.${result.ext}`;
  await writeFile(resolve(audioDir, name), result.bytes);
  stats.misses += 1;
  stats.bytes += result.bytes.length;
  const decoded = result.ext === 'wav' ? pcmFromWav(result.bytes) : result.ext === 'pcm' ? { pcm: result.bytes, sample_rate: 24_000 } : undefined;
  return { text, url: `/api/v1/tts/audio/${name}`, ext: result.ext, mime: result.mime || ttsMime(result.ext), hash, bytes: result.bytes.length, cached: false, stub: false, ...(decoded ?? {}) };
}

// 同一句话并发请求只打一次模型（白板讲稿会同时被"播放"和"预取"触发）。
export async function synthesize(text: string, opts: TtsOptions = {}): Promise<TtsSegment> {
  const speech = text.trim();
  if (!speech) return { text, url: '', ext: 'mp3', mime: MIME.mp3, hash: '', bytes: 0, cached: false, stub: true, error: 'empty text' };
  const hash = cacheKey(speech, opts);
  const running = inflight.get(hash);
  if (running) return running;
  const task = synthesizeUncached(speech, opts).finally(() => inflight.delete(hash));
  inflight.set(hash, task);
  return task;
}

// 预取：把下一句先落到缓存里，播放端拿到的就是 cache hit。失败静默（只是预热）。
export function prefetch(text: string, opts: TtsOptions = {}): void {
  const speech = text.trim();
  if (!speech) return;
  stats.prefetches += 1;
  void synthesize(speech, opts).catch(() => undefined);
}

export async function readTtsFile(name: string): Promise<{ bytes: Buffer; mime: string } | undefined> {
  if (!/^[a-f0-9]{8,64}\.[a-z0-9]{2,4}$/.test(name)) return undefined;
  try { return { bytes: await readFile(resolve(audioDir, name)), mime: ttsMime(name.split('.').pop() ?? '') }; } catch { return undefined; }
}

export interface VoiceOption { voice_id: string; label: string; provider_voice: string; source: 'builtin' | 'provider' }

// 语音表：优先问 provider（OpenAI 兼容 /audio/voices 不是标准端点，404 即回落内置表）。
export async function listVoices(eff?: ByokConfig): Promise<VoiceOption[]> {
  const builtin: VoiceOption[] = BUILTIN_VOICES.map((voice) => ({ voice_id: voice, label: LABELS[voice] ?? voice, provider_voice: providerVoice(voice), source: 'builtin' }));
  const base = (eff?.providers?.tts?.baseUrl ?? '').replace(/\/$/, '');
  if (!base) return builtin;
  try {
    const res = await fetch(`${base}/audio/voices`, { headers: eff?.providers?.tts?.apiKey ? { authorization: `Bearer ${eff.providers.tts.apiKey}` } : {}, signal: AbortSignal.timeout(5_000) });
    if (!res.ok) return builtin;
    const json = (await res.json()) as { voices?: Array<string | { id?: string; name?: string }>; data?: Array<{ id?: string; name?: string }> };
    const raw = json.voices ?? json.data ?? [];
    const options = raw
      .map((entry) => (typeof entry === 'string' ? { id: entry, name: entry } : { id: entry.id ?? entry.name ?? '', name: entry.name ?? entry.id ?? '' }))
      .filter((entry) => entry.id)
      .map((entry): VoiceOption => ({ voice_id: entry.id, label: entry.name || entry.id, provider_voice: entry.id, source: 'provider' }));
    return options.length ? options : builtin;
  } catch { return builtin; }
}

export function splitSentences(text: string): string[] {
  return text.match(/[^.!?。！？]+[.!?。！？]?/g)?.map((part) => part.trim()).filter(Boolean) ?? [text];
}

export async function synthesizeMany(text: string, opts: TtsOptions = {}): Promise<TtsSegment[]> {
  const sentences = splitSentences(text);
  const out: TtsSegment[] = [];
  for (let i = 0; i < sentences.length; i += 1) {
    out.push(await synthesize(sentences[i], opts));
    const next = sentences[i + 1];
    if (next) prefetch(next, opts);
  }
  return out;
}
