import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { config, type ByokConfig } from './config.js';

// 线上助手会把截图作为多部分表单上传，模型侧用 OpenAI 兼容的多模态 content 数组承载
export type ChatContentPart = { type: 'text'; text: string } | { type: 'image_url'; image_url: { url: string } };
export type ChatMessage = { role: 'system' | 'user' | 'assistant'; content: string | ChatContentPart[] };
export type ModelPurpose = 'director' | 'content' | 'quiz' | 'tts';
let stubCache: Record<string, unknown> | undefined;

async function stubs(): Promise<Record<string, unknown>> {
  if (!stubCache) stubCache = JSON.parse(await readFile(resolve('stubdata/llm.json'), 'utf8')) as Record<string, unknown>;
  return stubCache;
}

export async function stubValue<T = unknown>(name: string): Promise<T> {
  const values = await stubs();
  return values[name] as T;
}

function modelFor(purpose: ModelPurpose, eff?: ByokConfig): string {
  const c = eff ?? config;
  return c.models[purpose] ?? c.models.content;
}

async function request(messages: ChatMessage[], purpose: ModelPurpose, stream: boolean, eff?: ByokConfig): Promise<Response> {
  const c = eff ?? config;
  let lastError: unknown;
  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      const response = await fetch(`${c.baseUrl.replace(/\/$/, '')}/chat/completions`, {
        method: 'POST',
        headers: { 'content-type': 'application/json', authorization: `Bearer ${c.apiKey}` },
        body: JSON.stringify({ model: modelFor(purpose, eff), messages, stream, temperature: 0.4 }),
        signal: AbortSignal.timeout(60_000),
      });
      if (!response.ok) throw new Error(`LLM HTTP ${response.status}: ${await response.text()}`);
      return response;
    } catch (error) {
      lastError = error;
      if (attempt === 0) await new Promise((done) => setTimeout(done, 250));
    }
  }
  throw lastError;
}

export async function chat(messages: ChatMessage[], purpose: ModelPurpose = 'content', eff?: ByokConfig): Promise<string> {
  const c = eff ?? config;
  if (c.provider === 'stub') {
    const value = await stubValue(purpose === 'tts' ? 'model_probe' : purpose);
    return typeof value === 'string' ? value : JSON.stringify(value);
  }
  const response = await request(messages, purpose, false, eff);
  const json = await response.json() as { choices?: Array<{ message?: { content?: string } }> };
  return json.choices?.[0]?.message?.content ?? '';
}

export async function* chatStream(messages: ChatMessage[], purpose: ModelPurpose = 'content', eff?: ByokConfig): AsyncGenerator<string> {
  const c = eff ?? config;
  if (c.provider === 'stub') {
    const text = await chat(messages, purpose);
    const chunks = text.match(/.{1,72}(?:\s|$)|.{1,72}/gs) ?? [text];
    for (const chunk of chunks) yield chunk;
    return;
  }
  const response = await request(messages, purpose, true, eff);
  if (!response.body) throw new Error('LLM stream had no body');
  const decoder = new TextDecoder();
  let buffered = '';
  for await (const bytes of response.body) {
    buffered += decoder.decode(bytes, { stream: true });
    const lines = buffered.split('\n');
    buffered = lines.pop() ?? '';
    for (const line of lines) {
      const payload = line.trim().replace(/^data:\s*/, '');
      if (!payload || payload === '[DONE]') continue;
      try {
        const json = JSON.parse(payload) as { choices?: Array<{ delta?: { content?: string } }> };
        const text = json.choices?.[0]?.delta?.content;
        if (text) yield text;
      } catch { /* Ignore SSE comments and partial vendor metadata. */ }
    }
  }
}
