// Provider seams（接口流出）：llm / tts / stt / search / image。
// 每个 seam 一个 resolve()：有 key → 真实调用（OpenAI 兼容形状），无 key → stub 闭环；接口形状不变。
// 后续补 key 只需设置环境变量：BYOK_<SEAM>_API_KEY / _BASE_URL / _MODEL（LLM 用 KIMI_API_KEY|OPENAI_API_KEY|AIGW_API_KEY）。
import { config, type ByokConfig, type ProviderSlot } from '../config.js';

export type Seam = 'llm' | 'tts' | 'stt' | 'search' | 'image';
export interface SeamStatus { seam: Seam; configured: boolean; mode: 'real' | 'stub'; provider?: string; baseUrl?: string; model?: string; env: string[]; source: 'user' | 'env' | 'none' }

function slot(seam: Exclude<Seam, 'llm'>, byok?: ByokConfig): ProviderSlot | undefined {
  const user = byok?.providers?.[seam];
  const env = config.providers?.[seam];
  const merged: ProviderSlot = {
    apiKey: user?.apiKey || env?.apiKey || '',
    baseUrl: user?.baseUrl || env?.baseUrl || '',
    model: user?.model || env?.model || '',
    voice: user?.voice || env?.voice || '',
    enabled: user?.enabled === false ? false : env?.enabled === false ? false : undefined,
  };
  return merged.enabled === false || (!merged.apiKey && !merged.baseUrl) ? undefined : merged;
}

export function seamStatus(): SeamStatus[] {
  const llm: SeamStatus = { seam: 'llm', configured: config.provider !== 'stub', mode: config.provider !== 'stub' ? 'real' : 'stub', provider: config.provider, baseUrl: config.baseUrl, model: config.models.director, source: config.provider !== 'stub' ? 'env' : 'none', env: ['KIMI_API_KEY | OPENAI_API_KEY | AIGW_API_KEY', 'AIGW_BASE_URL | OPENAI_BASE_URL | KIMI_BASE_URL', 'BYOK_PROVIDER=kimi|openai-compatible|stub'] };
  const rest = (['tts', 'stt', 'search', 'image'] as const).map((seam): SeamStatus => {
    const s = slot(seam);
    return { seam, configured: Boolean(s?.apiKey || s?.baseUrl), mode: s?.apiKey || s?.baseUrl ? 'real' : 'stub', baseUrl: s?.baseUrl, model: s?.model, source: s?.apiKey || s?.baseUrl ? 'env' : 'none', env: [`BYOK_${seam.toUpperCase()}_API_KEY`, `BYOK_${seam.toUpperCase()}_BASE_URL`, `BYOK_${seam.toUpperCase()}_MODEL`] };
  });
  return [llm, ...rest];
}

// ── Seam 连通性探针：面板「测试」按钮与 /api/v1/auth/byok/test 共用 ──
export interface ProbeResult { ok: boolean; status: number; latency_ms: number; probe: 'chat' | 'speech' | 'transcription' | 'search' | 'generate' | 'models' | 'none'; sample: string; model?: string; error?: string }

async function probeModels(baseUrl: string, apiKey: string, started: number, model?: string): Promise<ProbeResult> {
  try {
    const res = await fetch(`${baseUrl.replace(/\/$/, '')}/models`, { headers: apiKey ? { authorization: `Bearer ${apiKey}` } : {}, signal: AbortSignal.timeout(15_000) });
    const text = (await res.text()).slice(0, 200);
    if (res.ok) return { ok: true, status: res.status, latency_ms: Date.now() - started, probe: 'models', sample: text, ...(model ? { model } : {}) };
    return { ok: false, status: res.status, latency_ms: Date.now() - started, probe: 'models', sample: text, error: `HTTP ${res.status}`, ...(model ? { model } : {}) };
  } catch (error) {
    return { ok: false, status: 0, latency_ms: Date.now() - started, probe: 'models', sample: '', error: error instanceof Error ? error.message : 'network error' };
  }
}

export async function probeSeam(seam: Seam, override: { baseUrl?: string; apiKey?: string; model?: string; voice?: string } = {}, opts: { deep?: boolean } = {}): Promise<ProbeResult> {
  const started = Date.now();
  // llm 槽走 providers.llm（用户配置优先），表单里的临时值再覆盖
  // llm 槽：providers.llm 优先，其次顶层 apiKey/baseUrl/models.director
  const llmSlot: { baseUrl?: string; apiKey?: string; model?: string; voice?: string } = config.providers?.llm ?? { apiKey: config.apiKey, baseUrl: config.baseUrl, model: config.models.director };
  const slotOf = (s: Seam): { baseUrl?: string; apiKey?: string; model?: string; voice?: string } => (s === 'llm' ? llmSlot : (slot(s) ?? {}));
  const base = (override.baseUrl ?? slotOf(seam).baseUrl ?? '').replace(/\/$/, '');
  const key = override.apiKey ?? slotOf(seam).apiKey ?? '';
  const model = override.model ?? slotOf(seam).model;
  const voice = override.voice ?? slotOf(seam).voice;
  if (!base) return { ok: false, status: 0, latency_ms: 0, probe: 'none', sample: '', error: 'seam 未配置 base_url' };
  try {
    if (seam === 'llm' || (seam === 'stt' && !opts.deep)) {
      if (seam === 'stt' && !opts.deep) return probeModels(base, key, started, model);
      const res = await fetch(`${base}/chat/completions`, {
        method: 'POST',
        headers: { 'content-type': 'application/json', ...(key ? { authorization: `Bearer ${key}` } : {}) },
        body: JSON.stringify({ model: model ?? 'kimi-k2-turbo-preview', messages: [{ role: 'user', content: 'Reply with exactly: OK' }], stream: false, max_tokens: 8 }),
        signal: AbortSignal.timeout(30_000),
      });
      const text = (await res.text()).slice(0, 200);
      return { ok: res.ok, status: res.status, latency_ms: Date.now() - started, probe: 'chat', sample: text, model, ...(res.ok ? {} : { error: `HTTP ${res.status}` }) };
    }
    if (seam === 'tts') {
      // 用槽的真实口径探：供应商若有自己的 voice_id（如 Moss）也要带上，否则 400
      const res = await fetch(`${base}/audio/speech`, {
        method: 'POST',
        headers: { 'content-type': 'application/json', ...(key ? { authorization: `Bearer ${key}` } : {}) },
        body: JSON.stringify({ model: model || 'tts-1', input: 'ok', voice: voice ?? 'alloy', ...(voice ? { voice_id: voice } : {}), speed: 1, response_format: 'mp3' }),
        signal: AbortSignal.timeout(60_000),
      });
      const buf = Buffer.from(await res.arrayBuffer());
      return { ok: res.ok && buf.length > 0, status: res.status, latency_ms: Date.now() - started, probe: 'speech', sample: `${buf.length} bytes · ${res.headers.get('content-type') ?? ''}`, model, ...(res.ok ? {} : { error: `HTTP ${res.status}` }) };
    }
    if (seam === 'stt') {
      const form = new FormData();
      form.append('file', new Blob([Buffer.alloc(2_000)], { type: 'audio/webm' }), 'probe.webm');
      form.append('model', model || 'whisper-1');
      const res = await fetch(`${base}/audio/transcriptions`, { method: 'POST', headers: key ? { authorization: `Bearer ${key}` } : {}, body: form, signal: AbortSignal.timeout(30_000) });
      const text = (await res.text()).slice(0, 200);
      return { ok: res.ok, status: res.status, latency_ms: Date.now() - started, probe: 'transcription', sample: text, model, ...(res.ok ? {} : { error: `HTTP ${res.status}` }) };
    }
    if (seam === 'search') {
      const res = await fetch(`${base}/search`, {
        method: 'POST',
        headers: { 'content-type': 'application/json', ...(key ? { authorization: `Bearer ${key}` } : {}) },
        body: JSON.stringify({ query: 'betterknow connectivity probe', max_results: 1 }),
        signal: AbortSignal.timeout(20_000),
      });
      const text = (await res.text()).slice(0, 200);
      let count = 0;
      try { count = (JSON.parse(text) as { results?: unknown[] }).results?.length ?? 0; } catch { /* 保留原文 */ }
      return { ok: res.ok, status: res.status, latency_ms: Date.now() - started, probe: 'search', sample: res.ok ? `${count} result(s)` : text, model, ...(res.ok ? {} : { error: `HTTP ${res.status}` }) };
    }
    // image
    if (!opts.deep) return probeModels(base, key, started, model);
    const res = await fetch(`${base}/images/generations`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', ...(key ? { authorization: `Bearer ${key}` } : {}) },
      body: JSON.stringify({ model: model || 'gpt-image-1', prompt: 'a single black dot on white background', size: '512x512', n: 1 }),
      signal: AbortSignal.timeout(120_000),
    });
    const text = (await res.text()).slice(0, 160);
    return { ok: res.ok, status: res.status, latency_ms: Date.now() - started, probe: 'generate', sample: res.ok ? `${text.length} chars payload` : text, model, ...(res.ok ? {} : { error: `HTTP ${res.status}` }) };
  } catch (error) {
    return { ok: false, status: 0, latency_ms: Date.now() - started, probe: seam === 'llm' ? 'chat' : 'models', sample: '', error: error instanceof Error ? error.message : 'network error' };
  }
}

async function postJson<T>(url: string, apiKey: string, body: unknown): Promise<T> {
  const res = await fetch(url, { method: 'POST', headers: { 'content-type': 'application/json', authorization: `Bearer ${apiKey}` }, body: JSON.stringify(body) });
  if (!res.ok) throw new Error(`${url} → ${res.status}`);
  return (await res.json()) as T;
}

// ── TTS：OpenAI 兼容 /audio/speech；stub 返回占位音频（前端可用浏览器 SpeechSynthesis 兜底）
export interface TtsResult { bytes?: Buffer; ext: string; mime: string; stub: boolean; error?: string }
export const tts = {
  // format 直通 response_format：pcm 是 OpenAI 兼容网关的原始 PCM16（免解码），wav 可本地转 PCM
  async synthesize(text: string, opts: { voice?: string; speed?: number; format?: 'mp3' | 'wav' | 'pcm' } = {}, byok?: ByokConfig): Promise<TtsResult> {
    const s = slot('tts', byok);
    const format = opts.format ?? 'mp3';
    const mime = format === 'pcm' ? 'audio/L16' : format === 'wav' ? 'audio/wav' : 'audio/mpeg';
    if (!s?.baseUrl || !text.trim()) return { ext: format === 'pcm' ? 'pcm' : format, mime, stub: true };
    const attempt = async (want: 'mp3' | 'wav' | 'pcm'): Promise<TtsResult> => {
      const res = await fetch(`${s.baseUrl.replace(/\/$/, '')}/audio/speech`, {
        method: 'POST',
        headers: { 'content-type': 'application/json', ...(s.apiKey ? { authorization: `Bearer ${s.apiKey}` } : {}) },
        // OpenAI 兼容网关读 voice；Moss 这类只认自己的 voice_id，所以在槽里配了音色时一并带上
        body: JSON.stringify({ model: s.model || 'tts-1', input: text, voice: opts.voice ?? s.voice ?? 'alloy', ...(s.voice ? { voice_id: s.voice } : {}), speed: opts.speed ?? 1, response_format: want }),
      });
      if (!res.ok) return { ext: want, mime: want === 'pcm' ? 'audio/L16' : want === 'wav' ? 'audio/wav' : 'audio/mpeg', stub: true, error: `${res.status}` };
      const bytes = Buffer.from(await res.arrayBuffer());
      if (!bytes.length) return { ext: want, mime, stub: true, error: 'empty audio' };
      return { bytes, ext: want, mime: want === 'pcm' ? 'audio/L16' : want === 'wav' ? 'audio/wav' : 'audio/mpeg', stub: false };
    };
    try {
      const first = await attempt(format);
      // 网关不支持 pcm/wav 时退回 mp3，避免因为 PCM 请求把整条朗读打挂
      if (first.stub && format !== 'mp3' && first.error) return await attempt('mp3');
      return first;
    } catch (error) {
      return { ext: format, mime, stub: true, error: error instanceof Error ? error.message : 'tts failed' };
    }
  },
};

// ── STT：OpenAI 兼容 /audio/transcriptions；stub 回固定文本
export const stt = {
  async transcribe(audioB64: string, mime = 'audio/webm', byok?: ByokConfig): Promise<{ text: string; stub: boolean }> {
    const s = slot('stt', byok);
    if (!s?.apiKey || !audioB64) return { text: 'Please acknowledge this voice question.', stub: true };
    const form = new FormData();
    form.append('file', new Blob([Buffer.from(audioB64, 'base64')], { type: mime }), 'q.webm');
    form.append('model', s.model || 'whisper-1');
    const res = await fetch(`${s.baseUrl.replace(/\/$/, '')}/audio/transcriptions`, { method: 'POST', headers: { authorization: `Bearer ${s.apiKey}` }, body: form });
    if (!res.ok) return { text: '', stub: true };
    const j = (await res.json()) as { text?: string };
    return { text: j.text ?? '', stub: false };
  },
};

// ── Search：通用 JSON 搜索网关 POST {query, max_results} → {results:[{title,url,snippet}]}（Tavily/Serper 兼容形状）；stub 回种子结果
export interface SearchResult { title: string; url: string; source: string; snippet?: string }
export const search = {
  async query(q: string, n = 6, byok?: ByokConfig): Promise<{ results: SearchResult[]; stub: boolean }> {
    const s = slot('search', byok);
    if (!s?.apiKey) {
      const host = (u: string) => { try { return new URL(u).hostname; } catch { return ''; } };
      const seed = [
        { title: `${q} — syllabus`, url: 'https://ocw.mit.edu/', snippet: 'Open courseware syllabus and lecture notes.' },
        { title: `${q} — introduction`, url: 'https://en.wikipedia.org/', snippet: 'Encyclopedic overview of the core concepts.' },
        { title: `${q} — course page`, url: 'https://www.coursera.org/', snippet: 'Structured online course outline.' },
      ];
      return { results: seed.map((r) => ({ ...r, source: host(r.url) })), stub: true };
    }
    const j = await postJson<{ results?: Array<{ title: string; url: string; content?: string; snippet?: string }> }>(`${s.baseUrl.replace(/\/$/, '')}/search`, s.apiKey, { query: q, max_results: n });
    return { results: (j.results ?? []).slice(0, n).map((r) => ({ title: r.title, url: r.url, source: new URL(r.url).hostname, snippet: r.snippet ?? r.content })), stub: false };
  },
};

// ── Image（generate key）：OpenAI 兼容 /images/generations；stub 交由调用方落 SVG 占位
export interface ImageResult { bytes?: Buffer; ext: string; mime: string; stub: boolean; error?: string }
export const image = {
  async generate(prompt: string, opts: { size?: string } = {}, byok?: ByokConfig): Promise<ImageResult> {
    const s = slot('image', byok);
    if (!s) return { ext: 'png', mime: 'image/png', stub: true };
    const size = opts.size ?? '512x512';
    try {
      const payload: Record<string, unknown> = { model: s.model || 'gpt-image-1', prompt, size, n: 1 };
      if (/^dall-e/i.test(s.model || '')) payload.response_format = 'b64_json';
      const json = await postJson<{ data?: Array<{ url?: string; b64_json?: string }> }>(`${s.baseUrl.replace(/\/$/, '')}/images/generations`, s.apiKey, payload);
      const first = json.data?.[0];
      if (first?.b64_json) return { bytes: Buffer.from(first.b64_json, 'base64'), ext: 'png', mime: 'image/png', stub: false };
      if (first?.url) {
        const res = await fetch(first.url);
        if (!res.ok) return { ext: 'png', mime: 'image/png', stub: true, error: `download ${res.status}` };
        const type = res.headers.get('content-type') ?? 'image/png';
        const ext = type.includes('webp') ? 'webp' : type.includes('jpeg') ? 'jpg' : 'png';
        return { bytes: Buffer.from(await res.arrayBuffer()), ext, mime: type, stub: false };
      }
      return { ext: 'png', mime: 'image/png', stub: true, error: 'empty image payload' };
    } catch (error) {
      return { ext: 'png', mime: 'image/png', stub: true, error: error instanceof Error ? error.message : 'image failed' };
    }
  },
};
