// 对话产物工具：抽认卡 / HTML 动画 / 教学视频 / 公开文件发布。
// 形状全部来自 live 抓包（reference/evidence/live_2026-09-16/r35_artifact_tools.jsonl）：
// - generate_flashcards      → data{flashcards:[{question,answer,index}], total_count}
// - generate_html_animation  → data{diagram_id, type:"html_animation", file_url, content}（file_url 公开可访问）
// - publish_file             → 有选中条目才成功；否则 tool_status:"error" + data{error:"No valid conversation entries found for selected indices."}，随后一条 agent_response 兜底
// - generate_instructional_video → data{video_id, url, rendered, scenes}
import { randomUUID } from 'node:crypto';
import type { ByokConfig } from './config.js';
import { persistPublicFile, publicFiles } from './artifacts.js';
import { diagrams } from './artifacts.js';
import { chat, stubValue } from './llm.js';
import { buildAnimation } from './animation.js';
import { generateInstructionalVideo } from './pipelines.js';
import { readState } from './store.js';

export const PUBLISH_ERROR = 'No valid conversation entries found for selected indices.';
export const AGENT_FALLBACK = "Something went wrong on my side while working on this and I wasn't able to finish, so there's nothing to show yet. Try asking again — and if it happens twice, rephrasing what you need usually gets me unstuck.";

export interface ArtifactToolResult { produced: boolean; data: Record<string, unknown>; content?: string }

const parseJson = (raw: string): Record<string, unknown> | undefined => {
  try {
    const parsed: unknown = JSON.parse(raw.match(/\{[\s\S]*\}/)?.[0] ?? '');
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed as Record<string, unknown> : undefined;
  } catch { return undefined; }
};

// 抽认卡：卡面 question/answer，index 从 1 开始（线上第一张 index=1）
export async function flashcardsTool(message: string, eff?: ByokConfig): Promise<ArtifactToolResult> {
  let cards: Array<{ question: string; answer: string }> = [];
  if ((eff ?? { provider: 'stub' } as ByokConfig).provider === 'stub') {
    const stub = await stubValue<Record<string, unknown>>('flashcards');
    cards = (Array.isArray(stub?.cards) ? stub.cards : []).map((card) => ({ question: String((card as Record<string, unknown>).question ?? ''), answer: String((card as Record<string, unknown>).answer ?? '') }));
  } else {
    const raw = await chat([{ role: 'user', content: `Create 5 concise flashcards about: ${message}. Return only JSON {"title":string,"cards":[{"question":string,"answer":string}]}.` }], 'quiz', eff);
    const parsed = parseJson(raw);
    cards = (Array.isArray(parsed?.cards) ? parsed.cards : []).map((card) => ({ question: String((card as Record<string, unknown>).question ?? ''), answer: String((card as Record<string, unknown>).answer ?? '') })).filter((card) => card.question);
    if (!cards.length) cards = [{ question: message, answer: raw.slice(0, 400) }];
  }
  const flashcards = cards.map((card, index) => ({ ...card, index: index + 1 }));
  return { produced: flashcards.length > 0, data: { flashcards, total_count: flashcards.length, title: message.slice(0, 40) } };
}

// HTML 动画：自包含单文件（CSP 契约见 animation.ts），落 /api/v1/diagram/<id>/diagram.html 公开件
export async function htmlAnimationTool(message: string, eff?: ByokConfig): Promise<ArtifactToolResult> {
  const id = randomUUID().replaceAll('-', '').slice(0, 8);
  const animation = await buildAnimation({ title: message.slice(0, 40), task: message, board: message, language: /[\u4e00-\u9fff]/.test(message) ? 'Chinese' : 'English', eff });
  diagrams.set(id, { html: animation.html, md: `# ${message.slice(0, 40)}\n\n${message}` });
  const fileUrl = `/api/v1/diagram/${id}/diagram.html`;
  return { produced: true, data: { diagram_id: id, type: 'html_animation', file_url: fileUrl, content: animation.html, rendered: !animation.stub } };
}

export type VideoStage = { stage: string; message: string; status: 'started' | 'processing' | 'completed' };

// 按线上阶段推进（r36 实证）：initializing → script_writing → generate_narration → code_generation → video_render（逐幕）→ 合成
export async function instructionalVideoTool(message: string, eff?: ByokConfig, onStage?: (stage: VideoStage) => void): Promise<ArtifactToolResult> {
  const emit = (stage: VideoStage): void => { try { onStage?.(stage); } catch { /* 订阅端已断，忽略 */ } };
  emit({ stage: 'initializing', message: 'Initializing educational video generator...', status: 'started' });
  const video = await generateInstructionalVideo(message, eff, (progress) => emit(progress));
  emit({ stage: 'video_render', message: video.rendered ? `Video generation completed! ${video.scenes.length} scenes rendered locally` : 'Video generation completed without a renderer', status: 'processing' });
  publicFiles.set(video.video_id, { id: video.video_id, filename: 'final_video.mp4', mime: 'video/mp4', data: video.buffer });
  emit({ stage: 'complete', message: `Video generated successfully! Access URL: ${video.url}`, status: 'completed' });
  return { produced: true, data: { video_id: video.video_id, url: video.url, final_url: video.url, rendered: video.rendered, scenes: video.scenes } };
}

// 发布文件：按对话条目下标挑选内容；选不出来就走线上那条错误分支
export async function publishFileTool(input: { message: string; conversationId: string; indices?: number[] }): Promise<ArtifactToolResult> {
  const history = ((await readState()).conversations[input.conversationId]?.history ?? []) as Array<Record<string, unknown>>;
  const entries = input.indices?.length
    ? history.filter((entry) => input.indices!.includes(Number(entry.index)))
    : history.filter((entry) => entry.role === 'assistant' || entry.role === 'tool').slice(-3);
  if (!entries.length) return { produced: false, data: { error: PUBLISH_ERROR } };
  const body = entries.map((entry) => String(entry.content ?? '')).filter(Boolean).join('\n\n') || input.message;
  const title = input.message.slice(0, 40).replace(/[\\/:*?"<>|]/g, '') || 'betterknow-note';
  const id = randomUUID();
  const filename = `${title}.md`;
  publicFiles.set(id, { id, filename, mime: 'text/markdown; charset=utf-8', data: Buffer.from(body) });
  await persistPublicFile({ id, filename, mime: 'text/markdown; charset=utf-8', data: Buffer.from(body) });
  return { produced: true, data: { file_id: id, filename, url: `/api/v1/files/${id}`, size: body.length, entries: entries.map((entry) => Number(entry.index)) }, content: body };
}
