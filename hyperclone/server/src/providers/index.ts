// Provider seams（接口流出）：llm / tts / stt / search / image。
// 每个 seam 一个 resolve()：有 key → 真实调用（OpenAI 兼容形状），无 key → stub 闭环；接口形状不变。
// 后续补 key 只需设置环境变量：BYOK_<SEAM>_API_KEY / _BASE_URL / _MODEL（LLM 用 KIMI_API_KEY|OPENAI_API_KEY|AIGW_API_KEY）。
import { config, type ProviderSlot } from '../config.js';

export type Seam = 'llm' | 'tts' | 'stt' | 'search' | 'image';
export interface SeamStatus { seam: Seam; configured: boolean; mode: 'real' | 'stub'; provider?: string; baseUrl?: string; model?: string; env: string[] }

function slot(seam: Exclude<Seam, 'llm'>): ProviderSlot | undefined {
  const s = config.providers?.[seam];
  return s && (s.apiKey || s.baseUrl) ? s : undefined;
}

export function seamStatus(): SeamStatus[] {
  const llm: SeamStatus = { seam: 'llm', configured: config.provider !== 'stub', mode: config.provider !== 'stub' ? 'real' : 'stub', provider: config.provider, baseUrl: config.baseUrl, model: config.models.director, env: ['KIMI_API_KEY | OPENAI_API_KEY | AIGW_API_KEY', 'AIGW_BASE_URL | OPENAI_BASE_URL | KIMI_BASE_URL', 'BYOK_PROVIDER=kimi|openai-compatible|stub'] };
  const rest = (['tts', 'stt', 'search', 'image'] as const).map((seam): SeamStatus => {
    const s = slot(seam);
    return { seam, configured: Boolean(s?.apiKey), mode: s?.apiKey ? 'real' : 'stub', baseUrl: s?.baseUrl, model: s?.model, env: [`BYOK_${seam.toUpperCase()}_API_KEY`, `BYOK_${seam.toUpperCase()}_BASE_URL`, `BYOK_${seam.toUpperCase()}_MODEL`] };
  });
  return [llm, ...rest];
}

async function postJson<T>(url: string, apiKey: string, body: unknown): Promise<T> {
  const res = await fetch(url, { method: 'POST', headers: { 'content-type': 'application/json', authorization: `Bearer ${apiKey}` }, body: JSON.stringify(body) });
  if (!res.ok) throw new Error(`${url} → ${res.status}`);
  return (await res.json()) as T;
}

// ── TTS：OpenAI 兼容 /audio/speech；stub 返回占位音频 URL（前端可用浏览器 SpeechSynthesis 兜底）
export const tts = {
  async synthesize(text: string, opts: { voice?: string; speed?: number; userId: string; sessionId: string; seq: number }): Promise<{ url: string; stub: boolean; bytes?: Buffer }> {
    const s = slot('tts');
    const url = `/api/v1/whiteboard/audio-stream/${opts.userId}/${opts.sessionId}/tts_${opts.seq}.webm`;
    if (!s?.apiKey) return { url, stub: true };
    const res = await fetch(`${s.baseUrl.replace(/\/$/, '')}/audio/speech`, { method: 'POST', headers: { 'content-type': 'application/json', authorization: `Bearer ${s.apiKey}` }, body: JSON.stringify({ model: s.model || 'tts-1', input: text, voice: opts.voice ?? 'alloy', speed: opts.speed ?? 1, response_format: 'opus' }) });
    if (!res.ok) return { url, stub: true };
    return { url, stub: false, bytes: Buffer.from(await res.arrayBuffer()) };
  },
};

// ── STT：OpenAI 兼容 /audio/transcriptions；stub 回固定文本
export const stt = {
  async transcribe(audioB64: string, mime = 'audio/webm'): Promise<{ text: string; stub: boolean }> {
    const s = slot('stt');
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
  async query(q: string, n = 6): Promise<{ results: SearchResult[]; stub: boolean }> {
    const s = slot('search');
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

// ── Image（generate key）：OpenAI 兼容 /images/generations；stub 回占位封面
export const image = {
  async generate(prompt: string, opts: { size?: string } = {}): Promise<{ url: string; stub: boolean; b64?: string }> {
    const s = slot('image');
    if (!s?.apiKey) return { url: '/api/v1/marketplace/cover/placeholder', stub: true };
    const j = await postJson<{ data?: Array<{ url?: string; b64_json?: string }> }>(`${s.baseUrl.replace(/\/$/, '')}/images/generations`, s.apiKey, { model: s.model || 'gpt-image-1', prompt, size: opts.size ?? '1024x768', n: 1 });
    const d = j.data?.[0];
    return { url: d?.url ?? '', stub: false, b64: d?.b64_json };
  },
};
