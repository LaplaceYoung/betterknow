// 白板插图动作与提示词模板。
// 模板来源：线上会话持久化消息里的 image_generation 动作（抓包实证，非模型自述），
// 逐条样例见 hyperclone/seed/prompts/whiteboard_image_prompt.md。
export interface WhiteboardImageAction {
  type: 'image_generation';
  prompt: string;
  language: string;
  caption: string;
  // 线上帧里有这两个可选字段：source="reference_page" 表示插图取自课件页本身（不调图像模型）
  source?: 'reference_page';
  reference_name?: string;
  page_index?: number;
}

// 线上实测：generated_image 固定 512×512（board_image overlay 的 width/height 亦为 512）。
export const WHITEBOARD_IMAGE_SIZE = '512x512';

// 线上 prompt_preview 形态：前 117 字符 + “...”（总长 120）。
export function imagePromptPreview(prompt: string, limit = 117): string {
  return prompt.length > limit ? `${prompt.slice(0, limit)}...` : prompt;
}

// 模板骨架（从三个线上样例归纳）：<图形定性>：<几何元素与位置>。<标注规则>。<背景与配色>。<风格尾缀>
export function buildImagePrompt(input: { topic: string; caption?: string; language?: string; detail?: string }): string {
  const caption = (input.caption ?? input.topic).trim();
  const detail = (input.detail ?? '').trim();
  if ((input.language ?? 'Chinese').toLowerCase().startsWith('en')) {
    return [`A clean, academic-style diagram for “${caption}”.`, detail || `Show the key elements of ${input.topic} with clearly labeled parts.`, 'Plain white background, no shadows, no decorative elements, textbook illustration style.'].filter(Boolean).join(' ');
  }
  return [`一个简洁的几何示意图：${detail || input.topic}。`, `图注为“${caption}”。`, '白色背景，无阴影与多余装饰，专业教科书风格。'].join('');
}

export function normalizeImageAction(raw: Record<string, unknown>, fallback: { topic: string; language: string }): WhiteboardImageAction {
  const language = typeof raw.language === 'string' && raw.language.trim() ? raw.language.trim() : fallback.language;
  const caption = typeof raw.caption === 'string' && raw.caption.trim() ? raw.caption.trim() : fallback.topic;
  const rawPrompt = typeof raw.prompt === 'string' ? raw.prompt.trim() : '';
  const prompt = rawPrompt || buildImagePrompt({ topic: fallback.topic, caption, language });
  const source = raw.source === 'reference_page' ? 'reference_page' as const : undefined;
  const referenceName = typeof raw.reference_name === 'string' && raw.reference_name.trim() ? raw.reference_name.trim() : undefined;
  const pageIndex = typeof raw.page_index === 'number' && Number.isFinite(raw.page_index) ? raw.page_index : undefined;
  return { type: 'image_generation', prompt, language, caption, ...(source ? { source } : {}), ...(referenceName ? { reference_name: referenceName } : {}), ...(pageIndex !== undefined ? { page_index: pageIndex } : {}) };
}

// 供 directorAgent / 白板教师提示词引用：模板契约（与 seed/prompts/whiteboard_image_prompt.md 同源）
export const IMAGE_ACTION_CONTRACT = `白板插图动作：{"type":"image_generation","prompt":"<图形定性>：<几何元素与位置>。<标注规则>。<背景与配色>。<风格尾缀>","language":"Chinese|English","caption":"<短名词短语>"}；prompt 必须自足可画（含标注字母、直角标记、颜色与背景），禁止阴影、复杂背景与无关装饰；caption 用于图注。`;
