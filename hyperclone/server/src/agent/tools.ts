// directorAgent 的工具表：线上提示词（seed/prompts/directorAgent_system_prompt.md）里点名的工具，
// 在这里给出 JSON Schema，让模型能真的「挑工具调」而不是由关键词路由代劳。
// 执行体复用各条已有链路（记忆、搜索、技能、产物工具、测验），只在参数口径上做归一化。
import type { ChatToolDef } from '../llm.js';

export interface ToolContext {
  userId: string;
  conversationId: string;
  language: 'zh' | 'en';
  message: string;
  /** 技能全文（get_skills 用） */
  skillText: (name: string) => Promise<string>;
  /** search seam */
  search: (query: string, n: number) => Promise<{ results: Array<{ title: string; url: string; snippet?: string }>; stub: boolean }>;
  /** 会话记忆 */
  memory: () => Promise<{ summary: string }>;
  /** 产物工具：吐帧 + 落盘由调用方处理，这里只负责执行 */
  produce: (kind: 'flashcards' | 'quiz' | 'animation' | 'video' | 'file', args: Record<string, unknown>) => Promise<unknown>;
  /** 提问卡（ask_questions）：把问题清单交给前端 */
  ask: (questions: Array<{ question: string; options?: string[]; is_multiple?: boolean; allow_custom?: boolean }>) => void;
  /** 结束回合 */
  complete: (summary?: string) => void;
}

const obj = (props: Record<string, unknown>, required: string[] = []): Record<string, unknown> => ({ type: 'object', properties: props, required, additionalProperties: true });

export const DIRECTOR_TOOLS: ChatToolDef[] = [
  {
    type: 'function',
    function: {
      name: 'memory_recall',
      description: 'Call this if the user starts a new topic. Pass a short user_query aligned with that topic. Treat the result as domain background.',
      parameters: obj({ user_query: { type: 'string', description: '与话题对齐的简短检索词' } }, ['user_query']),
    },
  },
  {
    type: 'function',
    function: {
      name: 'get_skills',
      description: 'Load the full instructions of one or more skills into context before planning tools that depend on that workflow.',
      parameters: obj({ skill_name: { type: 'string', description: '技能名，如 systematicLearning / conceptExplanation / cheatsheetGeneration' } }, ['skill_name']),
    },
  },
  {
    type: 'function',
    function: {
      name: 'search_files',
      description: 'Search the user’s Drive or Canvas files. Use it before generate_content or read_content when those files are needed.',
      parameters: obj({ query: { type: 'string' }, sources: { type: 'array', items: { type: 'string', enum: ['drive', 'canvas'] } } }, ['query']),
    },
  },
  {
    type: 'function',
    function: {
      name: 'search_and_summarize_web',
      description: 'Search the public web and summarise what the sources say about the query.',
      parameters: obj({ query: { type: 'string' }, price: { type: 'string', description: 'free 或 paid' } }, ['query']),
    },
  },
  {
    type: 'function',
    function: {
      name: 'generate_content',
      description: 'Produce the user-facing explanation. Each segment must read final: polished, scannable, non-repetitive.',
      parameters: obj({ topic: { type: 'string' }, guideline: { type: 'string', description: '本轮讲解的组织方式' }, has_more_response_after_this_reply: { type: 'boolean' } }, ['topic']),
    },
  },
  {
    type: 'function',
    function: {
      name: 'generate_quiz',
      description: 'Generate a short quiz to check understanding.',
      parameters: obj({ topic: { type: 'string' }, count: { type: 'integer' }, kind: { type: 'string', enum: ['single', 'multiple', 'fill'] } }, ['topic']),
    },
  },
  {
    type: 'function',
    function: {
      name: 'generate_flashcards',
      description: 'Generate flashcards for spaced repetition.',
      parameters: obj({ topic: { type: 'string' }, count: { type: 'integer' } }, ['topic']),
    },
  },
  {
    type: 'function',
    function: {
      name: 'generate_html_animation',
      description: 'Generate a self-contained interactive HTML animation that demonstrates the idea.',
      parameters: obj({ topic: { type: 'string' }, task: { type: 'string' } }, ['topic']),
    },
  },
  {
    type: 'function',
    function: {
      name: 'generate_instructional_video',
      description: 'Generate a short instructional video for the topic.',
      parameters: obj({ topic: { type: 'string' }, duration_seconds: { type: 'integer' } }, ['topic']),
    },
  },
  {
    type: 'function',
    function: {
      name: 'publish_file',
      description: 'Publish markdown as a shareable file (PDF/markdown) the user can open and download.',
      parameters: obj({ title: { type: 'string' }, markdown: { type: 'string' } }, ['title', 'markdown']),
    },
  },
  {
    type: 'function',
    function: {
      name: 'ask_questions',
      description: 'Ask the user clarifying questions when the request is ambiguous. Skip items you can infer.',
      parameters: obj({
        message: { type: 'string' },
        questions: {
          type: 'array',
          items: obj({ question: { type: 'string' }, options: { type: 'array', items: { type: 'string' } }, is_multiple: { type: 'boolean' }, allow_custom: { type: 'boolean' } }, ['question']),
        },
      }, ['questions']),
    },
  },
  {
    type: 'function',
    function: {
      name: 'mark_response_complete',
      description: 'Call this when this turn should end.',
      parameters: obj({ summary: { type: 'string' } }),
    },
  },
];

export function toolByName(name: string): ChatToolDef | undefined {
  return DIRECTOR_TOOLS.find((tool) => tool.function.name === name);
}

/** 把模型给的参数（JSON 字符串）解析成对象；坏参数当成空对象，由执行体做兜底 */
export function parseToolArgs(raw: string): Record<string, unknown> {
  try {
    const parsed = JSON.parse(raw || '{}');
    return parsed && typeof parsed === 'object' ? parsed as Record<string, unknown> : {};
  } catch { return {}; }
}
