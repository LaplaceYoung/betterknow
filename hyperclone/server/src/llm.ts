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

// ── 原生工具调用（function calling）：线上 directorAgent 的提示词就是按「模型自己挑工具」写的，
//    所以这一层必须真把 tools 传下去、并把 tool_calls 解析回来。
export interface ChatToolDef {
  type: 'function';
  function: { name: string; description: string; parameters: Record<string, unknown> };
}

export interface ToolCall { id: string; name: string; arguments: string }

export type ChatRole = 'system' | 'user' | 'assistant' | 'tool';
export interface ToolChatMessage { role: ChatRole; content: string | null; tool_calls?: Array<{ id: string; type: 'function'; function: { name: string; arguments: string } }>; tool_call_id?: string; name?: string }

export interface ToolTurnResult { content: string; toolCalls: ToolCall[]; reasoning: string; finishReason: string }

function toolsEnabled(c: ByokConfig): boolean { return c.provider !== 'stub' && Boolean(c.apiKey) }

// 流式：把 content / reasoning / tool_calls 都按事件吐出来（reasoning 字段各网关命名不一，两个都认）
export async function* chatToolEvents(
  messages: ToolChatMessage[], tools: ChatToolDef[], eff?: ByokConfig, purpose: ModelPurpose = 'director'
): AsyncGenerator<{ type: 'content' | 'reasoning'; text: string } | { type: 'tool_calls'; calls: ToolCall[] } | { type: 'done'; finishReason: string }> {
  const c = eff ?? config;
  if (!toolsEnabled(c)) return;
  const response = await fetch(`${c.baseUrl.replace(/\/$/, '')}/chat/completions`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', authorization: `Bearer ${c.apiKey}` },
    body: JSON.stringify({ model: modelFor(purpose, eff), messages, tools, tool_choice: 'auto', stream: true, temperature: 0.4 }),
    signal: AbortSignal.timeout(120_000),
  });
  if (!response.ok || !response.body) throw new Error(`LLM HTTP ${response.status}: ${(await response.text()).slice(0, 200)}`);
  const decoder = new TextDecoder();
  let buffered = '';
  const partial = new Map<number, { id: string; name: string; arguments: string }>();
  for await (const bytes of response.body) {
    buffered += decoder.decode(bytes, { stream: true });
    const lines = buffered.split('\n');
    buffered = lines.pop() ?? '';
    for (const line of lines) {
      const payload = line.trim().replace(/^data:\s*/, '');
      if (!payload || payload === '[DONE]') continue;
      let json: { choices?: Array<{ delta?: { content?: string | null; reasoning?: string | null; reasoning_content?: string | null; tool_calls?: Array<{ index?: number; id?: string; function?: { name?: string; arguments?: string } }> }; finish_reason?: string | null }> };
      try { json = JSON.parse(payload) } catch { continue }
      const choice = json.choices?.[0];
      const delta = choice?.delta ?? {};
      if (typeof delta.content === 'string' && delta.content) yield { type: 'content', text: delta.content };
      const reasoning = delta.reasoning ?? delta.reasoning_content;
      if (typeof reasoning === 'string' && reasoning) yield { type: 'reasoning', text: reasoning };
      for (const call of delta.tool_calls ?? []) {
        const index = call.index ?? 0;
        const current = partial.get(index) ?? { id: '', name: '', arguments: '' };
        partial.set(index, {
          id: call.id || current.id,
          name: call.function?.name || current.name,
          arguments: current.arguments + (call.function?.arguments ?? ''),
        });
      }
      if (choice?.finish_reason) yield { type: 'done', finishReason: choice.finish_reason };
    }
  }
  const calls = [...partial.entries()].sort((a, b) => a[0] - b[0]).map(([, v]) => ({ id: v.id || `call_${Math.random().toString(36).slice(2, 8)}`, name: v.name, arguments: v.arguments }));
  if (calls.length) yield { type: 'tool_calls', calls };
}

// 非流式：一次拿全（用于需要「先决策、再执行」的回合）
export async function chatTools(messages: ToolChatMessage[], tools: ChatToolDef[], eff?: ByokConfig, purpose: ModelPurpose = 'director'): Promise<ToolTurnResult> {
  const c = eff ?? config;
  if (!toolsEnabled(c)) return { content: '', toolCalls: [], reasoning: '', finishReason: 'stub' };
  const response = await fetch(`${c.baseUrl.replace(/\/$/, '')}/chat/completions`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', authorization: `Bearer ${c.apiKey}` },
    body: JSON.stringify({ model: modelFor(purpose, eff), messages, tools, tool_choice: 'auto', temperature: 0.4 }),
    signal: AbortSignal.timeout(120_000),
  });
  if (!response.ok) throw new Error(`LLM HTTP ${response.status}: ${(await response.text()).slice(0, 200)}`);
  const json = await response.json() as { choices?: Array<{ message?: { content?: string | null; reasoning?: string | null; reasoning_content?: string | null; tool_calls?: Array<{ id: string; function: { name: string; arguments: string } }> }; finish_reason?: string }> };
  const choice = json.choices?.[0];
  const message = choice?.message;
  return {
    content: message?.content ?? '',
    reasoning: message?.reasoning ?? message?.reasoning_content ?? '',
    toolCalls: (message?.tool_calls ?? []).map((call) => ({ id: call.id, name: call.function?.name ?? '', arguments: call.function?.arguments ?? '{}' })),
    finishReason: choice?.finish_reason ?? 'stop',
  };
}
