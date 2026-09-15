import { randomUUID } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import type { FastifyInstance, FastifyRequest } from 'fastify';
import type { WebSocket } from 'ws';
import { OPEN_USER_ID, ensureOpenUser, verifyJwt } from './auth.js';
import { generateInstructionalVideo, publishFilePdf, runCourseGeneration } from './pipelines.js';
import { runSandboxed } from './sandbox.js';
import { diagrams, placeholderPng, placeholderWebm, publicFiles } from './artifacts.js';
import { runDshTask } from './agent/dsh-adapter.js';
import { runDirectorRound } from './agent/director.js';
import { config, resolveByok } from './config.js';
import { image, tts } from './providers/index.js';
import { audioFileName, placeholderImageSvg, saveWhiteboardImage, ttsCounts, writeTtsAudio } from './media.js';
import { IMAGE_ACTION_CONTRACT, WHITEBOARD_IMAGE_SIZE, imagePromptPreview, normalizeImageAction, type WhiteboardImageAction } from './whiteboardImage.js';
import { chat, chatStream, stubValue, type ChatMessage } from './llm.js';
import { now, readState, updateState } from './store.js';
import { appendRun, finishRun, startRun } from './runs.js';

type Incoming = Record<string, unknown> & { type?: string };
type ChatTool = 'generate_content' | 'generate_quiz' | 'generate_flashcards' | 'generate_html_animation' | 'create_deep_learn_session' | 'create_board_session' | 'publish_file' | 'recommend_next_step' | 'ask_questions' | 'generate_instructional_video' | 'code_generator';
const chatTools: Record<ChatTool, true> = { generate_content: true, generate_quiz: true, generate_flashcards: true, generate_html_animation: true, create_deep_learn_session: true, create_board_session: true, publish_file: true, recommend_next_step: true, ask_questions: true, generate_instructional_video: true, code_generator: true };
let directorPrompt: string | undefined;

async function systemPrompt(): Promise<string> {
  if (directorPrompt) return directorPrompt;
  for (const candidate of [resolve('../seed/prompts/directorAgent_system_prompt.md'), resolve('../assets/prompts/directorAgent_system_prompt.md'), resolve('../../assets/prompts/directorAgent_system_prompt.md')]) {
    try { directorPrompt = await readFile(candidate, 'utf8'); return directorPrompt; } catch { /* Try portable layouts. */ }
  }
  directorPrompt = 'You are the directing agent for betterknow. Choose one local tool. Return JSON: {"thought":"brief reasoning","tool":"generate_content","args":{}}.';
  return directorPrompt;
}

function tokenFrom(request: FastifyRequest): string | undefined {
  const query = request.query as { token?: string; access_token?: string };
  return query.token ?? query.access_token;
}

function acceptUser(request: FastifyRequest, socket: WebSocket): string | undefined {
  const claims = verifyJwt(tokenFrom(request));
  return claims?.sub ?? OPEN_USER_ID;
}

function parseMessage(raw: unknown): Incoming | undefined {
  try { const parsed: unknown = JSON.parse(String(raw)); return parsed && typeof parsed === 'object' ? parsed as Incoming : undefined; }
  catch { return undefined; }
}

async function effFor(userId: string) { const st = await readState(); return resolveByok((st.users[userId] as { byok?: import('./config.js').UserByok } | undefined)?.byok); }

function guardSocket(socket: WebSocket): void { socket.on('error', () => undefined); }

function wsSend(socket: WebSocket, frame: Record<string, unknown>): void {
  if (socket.readyState === socket.OPEN) socket.send(JSON.stringify(frame));
}

function chatSend(socket: WebSocket, frame: Record<string, unknown>): void {
  wsSend(socket, { tool_name: null, tool_status: null, round_index: null, display: null, data: null, is_complete: false, timestamp: now(), ...frame });
}

function chooseHeuristic(message: string): ChatTool {
  const normalized = message.toLowerCase();
  if (/quiz|测验|测试题/.test(normalized)) return 'generate_quiz';
  if (/flashcard|卡片|闪卡/.test(normalized)) return 'generate_flashcards';
  if (/animation|动画|html/.test(normalized)) return 'generate_html_animation';
  if (/deep learn|deep learning session|系统学习|深度学习会话/.test(normalized)) return 'create_deep_learn_session';
  if (/whiteboard|board session|白板/.test(normalized)) return 'create_board_session';
  if (/publish|export|file|发布|导出/.test(normalized)) return 'publish_file';
  if (/video|视频/.test(normalized)) return 'generate_instructional_video';
  if (/code|代码|编程|script|snippet/.test(normalized)) return 'code_generator';
  if (/question|clarify|ask me|提问|澄清/.test(normalized)) return 'ask_questions';
  return 'generate_content';
}

async function direct(message: string, history: Array<Record<string, unknown>>, eff?: ReturnType<typeof resolveByok>): Promise<{ thought: string; tool: ChatTool; args: Record<string, unknown> }> {
  if ((eff ?? config).provider === 'stub') return { thought: 'I will produce the smallest useful learning response and verify completion.', tool: chooseHeuristic(message), args: {} };
  const messages: ChatMessage[] = [{ role: 'system', content: `${await systemPrompt()}

For this local clone, choose exactly one available tool: ${Object.keys(chatTools).join(', ')}. Return only JSON {"thought":"brief planning summary","tool":"tool name","args":{}}.` }, ...history.filter((item) => item.role === 'user' || item.role === 'assistant').slice(-8).map((item) => ({ role: item.role as 'user' | 'assistant', content: String(item.content ?? '') })), { role: 'user', content: message }];
  try {
    const raw = await chat(messages, 'director', eff); const json = JSON.parse(raw.match(/\{[\s\S]*\}/)?.[0] ?? '') as { thought?: string; tool?: string; args?: Record<string, unknown> };
    const tool = chatTools[json.tool as ChatTool] ? json.tool as ChatTool : chooseHeuristic(message);
    return { thought: json.thought ?? 'Selecting a useful response.', tool, args: json.args ?? {} };
  } catch { return { thought: 'The director response was not structured, so I will answer directly.', tool: chooseHeuristic(message), args: {} }; }
}

async function runChatTool(socket: WebSocket, tool: ChatTool, message: string, userId: string, conversationId: string, roundIndex: number, eff?: ReturnType<typeof resolveByok>): Promise<{ produced: boolean; data: Record<string, unknown>; content?: string }> {
  chatSend(socket, { type: 'tool_selection', tool_name: tool, tool_status: 'started', round_index: roundIndex, display: 'display', index: 0 });
  if (tool === 'generate_content') {
    chatSend(socket, { type: 'tool_execution', tool_name: tool, tool_status: 'streaming', round_index: roundIndex, message: 'Starting content generation with streaming...' });
    let content = ''; let chunkCount = 0; const messages: ChatMessage[] = [{ role: 'system', content: 'You are betterknow. Teach clearly, use the user language, and return useful markdown.' }, { role: 'user', content: message }];
    for await (const chunk of chatStream(messages, 'content', eff)) { content += chunk; chunkCount += 1; chatSend(socket, { type: 'content_chunk', tool_name: tool, tool_status: 'streaming', round_index: roundIndex, chunk }); }
    const data = { model_used: config.models.content, chunk_count: chunkCount, total_length: content.length, content, error: null, stopped_early: false };
    chatSend(socket, { type: 'tool_execution', tool_name: tool, tool_status: 'completed', round_index: roundIndex, display: 'display', data, message: `✅ generate_content completed (chunks=${chunkCount})` }); return { produced: Boolean(content), data, content };
  }
  if (tool === 'generate_quiz' || tool === 'generate_flashcards') {
    const key = tool === 'generate_quiz' ? 'quiz' : 'flashcards'; let result: unknown;
    if (eff?.provider === 'stub') result = await stubValue(key); else { const prompt = tool === 'generate_quiz' ? `Create a concise quiz about: ${message}. Return only JSON with title and questions.` : `Create concise flashcards about: ${message}. Return only JSON with title and cards.`; const raw = await chat([{ role: 'user', content: prompt }], 'quiz', eff); try { result = JSON.parse(raw.match(/\{[\s\S]*\}/)?.[0] ?? ''); } catch { result = { content: raw }; } }
    const flat = (typeof result === 'object' && result !== null ? result as Record<string, unknown> : { content: result }) as Record<string, unknown>; const questions = Array.isArray(flat.questions) ? flat.questions : undefined; const cards = Array.isArray(flat.cards) ? flat.cards : undefined; const data: Record<string, unknown> = tool === 'generate_quiz' ? { ...(questions ? { questions } : { questions: flat.questions ?? [] }), total_count: Array.isArray(questions) ? questions.length : 0, model_used: config.models.quiz, ...(flat.title ? { title: flat.title } : {}) } : { flashcards: cards ?? [], total_count: Array.isArray(cards) ? cards.length : 0, model_used: config.models.content, ...(flat.title ? { title: flat.title } : {}) }; chatSend(socket, { type: 'tool_execution', tool_name: tool, tool_status: 'completed', round_index: roundIndex, display: 'display', data }); return { produced: true, data };
  }
  if (tool === 'generate_html_animation') {
    const id = randomUUID(); const html = eff?.provider === 'stub' ? await stubValue<string>('html_animation') : await chat([{ role: 'user', content: `Create a standalone educational HTML animation about: ${message}. Return HTML only.` }], 'content', eff);
    diagrams.set(id, { html, md: `# Animation\n\n${message}`, png: placeholderPng }); const data = { diagram_id: id, url: `/api/v1/diagram/${id}/diagram.html`, html_url: `/api/v1/diagram/${id}/diagram.html` };
    chatSend(socket, { type: 'tool_execution', tool_name: tool, tool_status: 'completed', round_index: roundIndex, display: 'display', data }); chatSend(socket, { type: 'inline_diagram', tool_name: tool, tool_status: 'completed', round_index: roundIndex, placeholder_id: id, data: { tag: `<diagram id="${id}">`, source_tag: message, type: 'html', status: 'completed' } }); return { produced: true, data };
  }
  if (tool === 'create_deep_learn_session') {
    const id = randomUUID(); const plan = await stubValue<Record<string, unknown>>('course_plan'); const session = { deep_learn_session_id: id, user_id: userId, title: String(plan.title ?? 'Deep learning session'), conversation_data: { title: plan.title, history: [], user_id: userId, progress: {} }, session_task_plan: [{ unit_name: 'Foundations', unit_description: 'Build a reliable base.', tasks: [{ task_id: randomUUID(), task_title: 'Learn the core idea', task_description: message }] }], created_at: now() };
    await updateState((state) => { state.deep_learn[id] = session; }); const data = { deep_learn_session_id: id, url: `/deep-learn/${id}`, task_plan: session }; chatSend(socket, { type: 'tool_execution', tool_name: tool, tool_status: 'completed', round_index: roundIndex, display: 'display', data }); return { produced: true, data };
  }
  if (tool === 'create_board_session') {
    const id = randomUUID(); const boardContent = eff?.provider === 'stub' ? await stubValue<string>('board_brief') : await chat([{ role: 'user', content: `Create a compact markdown whiteboard lesson about: ${message}` }], 'content', eff); const board = { session_id: id, user_id: userId, status: 'ready', session_title: message.slice(0, 80), conversation_id: conversationId, whiteboard_state: { board_content: boardContent }, messages: [], tts_config: { voice_id: 'calm', speed: 1 }, created_at: now() };
    await updateState((state) => { state.whiteboards[id] = board; const conversation = state.conversations[conversationId]; if (conversation) conversation.board_session_types.push('whiteboard'); }); const data = { session_id: id, board_session_id: id, url: `/whiteboard/${id}` }; chatSend(socket, { type: 'tool_execution', tool_name: tool, tool_status: 'completed', round_index: roundIndex, display: 'display', data }); return { produced: true, data };
  }
  if (tool === 'publish_file') {
    const id = randomUUID(); const content = eff?.provider === 'stub' ? await stubValue<string>('content') : await chat([{ role: 'user', content: `Create a concise markdown document about: ${message}` }], 'content', eff); publicFiles.set(id, { id, filename: 'betterknow-note.md', mime: 'text/markdown; charset=utf-8', data: Buffer.from(content) }); const data = { file_id: id, filename: 'betterknow-note.md', url: `/api/v1/files/${id}` }; chatSend(socket, { type: 'tool_execution', tool_name: tool, tool_status: 'completed', round_index: roundIndex, display: 'display', data }); return { produced: true, data, content };
  }
  if (tool === 'ask_questions') {
    const data = { questions: [{ question: `What outcome matters most for “${message.slice(0, 80)}”?`, options: [{ title: 'Understand', description: 'Build intuition first.' }, { title: 'Practice', description: 'Work through examples.' }, { title: 'Apply', description: 'Build something useful.' }], is_multiple: false }] }; chatSend(socket, { type: 'user_question', tool_name: tool, tool_status: 'completed', round_index: roundIndex, display: 'display', question_data: data }); return { produced: true, data };
  }
  if (tool === 'generate_instructional_video') {
    const video = await generateInstructionalVideo(message, eff);
    publicFiles.set(video.video_id, { id: video.video_id, filename: 'final_video.mp4', mime: 'video/mp4', data: video.buffer });
    const data = { video_id: video.video_id, url: video.url, final_url: video.url, rendered: video.rendered, scenes: video.scenes };
    chatSend(socket, { type: 'tool_execution', tool_name: tool, tool_status: 'completed', round_index: roundIndex, display: 'display', data }); return { produced: true, data };
  }
  if (tool === 'code_generator') {
    const codeRaw = eff?.provider === 'stub' ? 'console.log("Hello from the betterknow sandbox")' : await chat([{ role: 'user', content: `Write a short runnable JavaScript snippet demonstrating: ${message}. Respond with code only, no fences.` }], 'content', eff);
    const code = codeRaw.replace(/```\w*\n?/g, '').replace(/```/g, '').trim();
    for (const piece of code.match(/.{1,80}(?:\n|$)/g) ?? [code]) chatSend(socket, { type: 'code_chunk', tool_name: tool, tool_status: 'streaming', round_index: roundIndex, chunk: piece });
    const run = await runSandboxed({ code, language: 'javascript' });
    chatSend(socket, { type: 'code_output', tool_name: tool, tool_status: 'completed', round_index: roundIndex, data: { stdout: run.stdout, stderr: run.stderr, timed_out: run.timedOut } });
    const data = { code, language: 'javascript', stdout: run.stdout, stderr: run.stderr, timed_out: run.timedOut, error: null };
    chatSend(socket, { type: 'tool_execution', tool_name: tool, tool_status: 'completed', round_index: roundIndex, display: 'display', data }); return { produced: true, data };
  }
  const data = { has_steps: true, next_steps: [{ display_step: 'Try a worked example', step_prompt: `Show me a worked example of ${message}` }, { display_step: 'Check my understanding', step_prompt: `Quiz me about ${message}` }], learning_progress: 1 }; chatSend(socket, { type: 'tool_execution', tool_name: tool, tool_status: 'completed', round_index: roundIndex, display: 'display', data }); return { produced: true, data };
}

async function chatRound(socket: WebSocket, input: Incoming, userId: string, conversationId: string): Promise<void> {
  const message = typeof input.message === 'string' ? input.message : typeof input.answer === 'string' ? input.answer : ''; const state = await readState(); const user = state.users[userId] ?? await ensureOpenUser(); const conversation = state.conversations[conversationId];
  if (!user || !conversation) { chatSend(socket, { type: 'error', message: 'Conversation not found', is_complete: true }); return; }
  await updateState((next) => { const value = next.conversations[conversationId]!; value.history_index += 1; const atts = input.attachments ?? input.images ?? null; value.history.push({ index: value.history_index, role: 'user', content: JSON.stringify({ type: 'user_message', message, file_info: atts, attachments: atts, images: atts, mode: input.mode ?? null, integrations: input.integrations ?? [], reply_language: input.reply_language ?? null }), timestamp: now() }); value.updated_at = now(); if (value.title.startsWith('Conversation ')) value.title = message.replace(/\s+/g, ' ').trim().slice(0, 40) || value.title; });
  chatSend(socket, { type: 'credit_status', message: 'Processing your request (BYOK Mode: Unlimited)', credit_info: { remaining_credits: 999999, max_credits: 999999, tier: 'byok' }, next_reset_time: new Date(Date.now() + 86400000).toISOString() });
  if (process.env.AGENT_CORE === 'dsh') {
    // Agent 核心 = DeepSeek Harness：推理流→thinking_chunk，答复→content_chunk；失败则回退内置管线
    chatSend(socket, { type: 'thinking', tool_name: 'directorAgent', tool_status: 'started', round_index: 1, display: 'display' });
    const r = await runDshTask(message, { timeoutMs: 120_000, systemHint: 'You are betterknow\'s learning assistant. Answer the learner directly in their language, in Markdown with KaTeX for math.', onThinking: (chunk) => chatSend(socket, { type: 'thinking_chunk', tool_name: 'directorAgent', tool_status: 'streaming', round_index: 1, chunk }) });
    if (r.ok) {
      chatSend(socket, { type: 'tool_execution', tool_name: 'generate_content', tool_status: 'started', round_index: 2 });
      for (const chunk of r.output.match(/[\s\S]{1,120}/g) ?? [r.output]) chatSend(socket, { type: 'content_chunk', tool_name: 'generate_content', tool_status: 'streaming', round_index: 2, chunk });
      await updateState((next) => { const value = next.conversations[conversationId]!; value.history_index += 1; value.history.push({ index: value.history_index, role: 'assistant', content: JSON.stringify({ type: 'content_chunk', content: r.output }), timestamp: now() }); });
      chatSend(socket, { type: 'tool_execution', tool_name: 'generate_content', tool_status: 'completed', round_index: 2, data: { content: r.output, agent_core: 'dsh', duration_ms: r.durationMs } });
      chatSend(socket, { type: 'mark_response_complete', step_id: 0 }); chatSend(socket, { type: 'complete', message: 'Response complete', is_complete: true }); return;
    }
    chatSend(socket, { type: 'thinking_chunk', tool_name: 'directorAgent', tool_status: 'streaming', round_index: 1, chunk: `[agent-core dsh unavailable: ${r.error ?? 'unknown'}] falling back to builtin pipeline` });
  }
  if (process.env.AGENT_CORE !== 'dsh' && process.env.BUILTIN_DIRECTOR !== 'legacy') {
    // 默认内置管线：6 skills 行为复刻（director.ts;原站回执形状）
    const attList = Array.isArray(input.attachments) ? input.attachments : (Array.isArray(input.images) ? input.images : undefined);
    await runDirectorRound({ userId, conversationId, send: (frame) => chatSend(socket, frame), eff: await effFor(userId) }, {
      message,
      mode: typeof input.mode === 'string' ? input.mode : undefined,
      integrations: Array.isArray(input.integrations) ? input.integrations.filter((x): x is string => typeof x === 'string') : undefined,
      speed_mode: typeof input.speed_mode === 'string' ? input.speed_mode : undefined,
      ui_language: typeof input.ui_language === 'string' ? input.ui_language : (typeof input.reply_language === 'object' && input.reply_language ? String((input.reply_language as Record<string, unknown>).value ?? '') : undefined),
      tts_enabled: Boolean(input.tts_enabled),
      attachments: attList,
    });
    return;
  }
  const eff = await effFor(userId); const decision = await direct(message, conversation.history, eff); chatSend(socket, { type: 'thinking', tool_name: 'directorAgent', tool_status: 'started', round_index: 1, display: 'display' }); for (const chunk of decision.thought.match(/.{1,80}(?:\s|$)|.{1,80}/g) ?? [decision.thought]) chatSend(socket, { type: 'thinking_chunk', tool_name: 'directorAgent', tool_status: 'streaming', round_index: 1, chunk }); chatSend(socket, { type: 'tool_execution', tool_name: 'directorAgent', tool_status: 'completed', round_index: 1, display: 'display', data: { phase: 'thinking', thought_chunk_count: 1 } });
  let outcome = await runChatTool(socket, decision.tool, message, userId, conversationId, 2, eff); if (!outcome.produced) outcome = await runChatTool(socket, 'generate_content', message, userId, conversationId, 3, eff); if (!outcome.produced) { chatSend(socket, { type: 'error', message: 'The agent could not produce a response after validation.', is_complete: true }); return; }
  chatSend(socket, { type: 'tool_selection', tool_name: 'mark_response_complete', tool_status: 'started', round_index: 3, display: 'display' }); if (decision.tool !== 'ask_questions') await runChatTool(socket, 'recommend_next_step', message, userId, conversationId, 4, eff);
  await updateState((next) => { const value = next.conversations[conversationId]!; const stamp = () => { value.history_index += 1; return value.history_index; }; if (decision.tool === 'generate_content' && outcome.content) { value.history.push({ index: stamp(), role: 'assistant', content: outcome.content, timestamp: now() }); } const isWrapped = decision.tool === 'generate_quiz' || decision.tool === 'generate_flashcards'; value.history.push({ index: stamp(), role: 'tool', content: `Executed ${decision.tool}`, timestamp: now(), tool_name: decision.tool, args: decision.args, result: isWrapped ? { result: outcome.data } : outcome.data }); value.updated_at = now(); }); chatSend(socket, { type: 'complete', message: 'Response complete', is_complete: true });
}

function chatHandler(socket: WebSocket, request: FastifyRequest): void { guardSocket(socket);
  const userId = acceptUser(request, socket); if (!userId) return; const query = request.query as { conversation_id?: string }; const requestedId = query.conversation_id;
  const inbox: unknown[] = []; let onMessageReady: ((raw: unknown) => void) | undefined;
  socket.on('message', (raw) => { if (onMessageReady) onMessageReady(raw); else inbox.push(raw); });
  void (async () => { const state = await readState(); let conversationId = requestedId; if (!conversationId || !state.conversations[conversationId] || state.conversations[conversationId]?.user_id !== userId) { conversationId = randomUUID(); const timestamp = now(); const prompt = await systemPrompt(); await updateState((next) => { next.conversations[conversationId!] = { conversation_id: conversationId!, user_id: userId, title: `Conversation ${conversationId}`, created_at: timestamp, updated_at: timestamp, history_index: 1, history: [{ index: 1, role: 'system', content: prompt, timestamp }], starred: false, board_session_types: [], artifacts: [] }; }); chatSend(socket, { type: 'conversation_created', data: { conversation_id: conversationId, title: `Conversation ${conversationId}` } }); } else chatSend(socket, { type: 'conversation_resumed', data: { conversation_id: conversationId, title: state.conversations[conversationId].title } });
    const dispatch = (raw: unknown): void => { const input = parseMessage(raw); request.log.info({ raw: String(raw).slice(0, 120), parsed: input?.type }, 'chat socket message'); if (!input) { chatSend(socket, { type: 'error', message: 'Invalid JSON', is_complete: true }); return; } if (input.type === 'ping') { chatSend(socket, { type: 'pong', t: input.t }); return; } if (input.type === 'stop_generation') { chatSend(socket, { type: 'complete', message: 'Generation stopped', is_complete: true }); return; } if (input.type === 'save_artifact') { void updateState((next) => { next.conversations[conversationId!]!.artifacts.push({ ...input, saved_at: now() }); }).then(() => chatSend(socket, { type: 'save_artifact_response', success: true, is_complete: true })); return; } if (input.type === 'user_message') chatRound(socket, input, userId, conversationId!).catch((error: unknown) => { console.error('[chatRound]', error); chatSend(socket, { type: 'error', message: error instanceof Error ? `${error.message}` : 'Internal error', is_complete: true }); }); };
    onMessageReady = dispatch; while (inbox.length) dispatch(inbox.shift());

  })().catch((error: unknown) => chatSend(socket, { type: 'error', message: error instanceof Error ? error.message : 'Internal error', is_complete: true }));
}

// ── 白板媒体：speak → TTS 分片（tts_segment）；image_generation → 图像模型 + generated_image ──
function voiceFor(voiceId: string): string { return voiceId; }

async function emitSpeak(socket: WebSocket, userId: string, sessionId: string, stepId: number, text: string, voiceId: string, speed: number, byok: import('./config.js').ByokConfig): Promise<void> {
  const speech = text.trim(); if (!speech) return;
  const counts = ttsCounts(speech);
  const result = await tts.synthesize(speech, { voice: voiceFor(voiceId), speed }, byok);
  const sequence = stepId;
  let audioUrl: string;
  if (result.bytes) {
    audioUrl = await writeTtsAudio(userId, sessionId, audioFileName(userId, sessionId, sequence, speech, result.ext), result.bytes);
  } else {
    audioUrl = await writeTtsAudio(userId, sessionId, audioFileName(userId, sessionId, sequence, speech, 'webm'), placeholderWebm);
  }
  wsSend(socket, { type: 'tts_segment', audio_url: audioUrl, url: audioUrl, sequence, step_id: stepId, tts_cjk: counts.tts_cjk, tts_latin: counts.tts_latin, speed, stub: !result.bytes, ...(result.error ? { error: result.error } : {}) });
}

async function emitImageGeneration(socket: WebSocket, action: WhiteboardImageAction, pageId: string, stepId: number, byok: import('./config.js').ByokConfig, placementStepId?: number): Promise<{ url: string; width: number; height: number; stub: boolean } | undefined> {
  wsSend(socket, { type: 'image_gen_pending', step_id: stepId, ...(typeof placementStepId === 'number' ? { placement_step_id: placementStepId } : {}), prompt_preview: imagePromptPreview(action.prompt), caption: action.caption, page_id: pageId });
  const generated = await image.generate(action.prompt, { size: WHITEBOARD_IMAGE_SIZE }, byok);
  if (!generated.bytes) {
    if (generated.error) { wsSend(socket, { type: 'image_gen_failed', step_id: stepId, caption: action.caption, page_id: pageId, message: generated.error, is_complete: false }); return undefined; }
    const stored = await saveWhiteboardImage(placeholderImageSvg(action.caption, action.prompt), 'svg', true);
    wsSend(socket, { type: 'generated_image', image_url: stored.url, width: stored.width, height: stored.height, caption: action.caption, step_id: stepId, page_id: pageId, stub: true });
    return { url: stored.url, width: stored.width, height: stored.height, stub: true };
  }
  const stored = await saveWhiteboardImage(generated.bytes, generated.ext);
  wsSend(socket, { type: 'generated_image', image_url: stored.url, width: stored.width, height: stored.height, caption: action.caption, step_id: stepId, page_id: pageId });
  return { url: stored.url, width: stored.width, height: stored.height, stub: false };
}

// 让教师产出一张插图的动作：优先问模型（受模板契约约束），模型不可用时按模板骨架兜底。
async function lessonImageAction(userId: string, topic: string, boardContent: string, language: string, eff: ReturnType<typeof resolveByok>): Promise<WhiteboardImageAction> {
  const fallback = normalizeImageAction({}, { topic, language });
  if (eff.provider === 'stub') return fallback;
  try {
    const raw = await chat([
      { role: 'system', content: `${IMAGE_ACTION_CONTRACT}\n只输出一个 JSON 对象，不要解释。` },
      { role: 'user', content: `课程主题：${topic}\n板书内容：${boardContent.slice(0, 800)}\n语言：${language}\n请给出一张最能支撑本页讲解的插图动作。` },
    ], 'content', eff);
    const parsed = JSON.parse(raw.match(/\{[\s\S]*\}/)?.[0] ?? '') as Record<string, unknown>;
    return normalizeImageAction(parsed, { topic, language });
  } catch { return fallback; }
}

function silentPcm(): string { return Buffer.alloc(9_600).toString('base64'); }
function splitSentences(text: string): string[] { return text.match(/[^.!?。！？]+[.!?。！？]?/g)?.map((part) => part.trim()).filter(Boolean) ?? [text]; }
async function cascade(socket: WebSocket, userId: string, sessionId: string, text: string, voiceId: string, speed: number, voiceInput = false): Promise<void> {
  const seam = await effFor(userId);
  const interjectId = randomUUID().replaceAll('-', '').slice(0, 12); wsSend(socket, { type: 'interject_ready', interject_id: interjectId, mode: 'cascade' });
  if (voiceInput) wsSend(socket, { type: 'interject_user_text', interject_id: interjectId, delta: '(voice input received)' });
  let answer = '确认收到你的问题。我们可以先抓住核心概念，再用一个具体例子验证它。';
  try { answer = await chat([{ role: 'system', content: 'Answer a learner interjection clearly and briefly.' }, { role: 'user', content: text }], 'content', await effFor(userId)); } catch { /* Local fallback keeps the cascade usable. */ }
  let sequence = 0;
  for (const sentence of splitSentences(answer)) {
    const counts = ttsCounts(sentence);
    const speech = await tts.synthesize(sentence, { voice: voiceFor(voiceId), speed }, seam);
    const name = audioFileName(userId, sessionId, sequence, sentence, speech.bytes ? speech.ext : 'webm');
    const audioUrl = await writeTtsAudio(userId, sessionId, name, speech.bytes ?? placeholderWebm);
    wsSend(socket, { type: 'interject_text', interject_id: interjectId, delta: sentence });
    wsSend(socket, { type: 'interject_audio', interject_id: interjectId, audio_url: audioUrl, sequence, speed, text: sentence, tts_cjk: counts.tts_cjk, tts_latin: counts.tts_latin, stub: !speech.bytes });
    wsSend(socket, { type: 'interject_pcm', interject_id: interjectId, pcm_b64: silentPcm(), sample_rate: 24000 });
    sequence += 1;
  }
  wsSend(socket, { type: 'interject_done', interject_id: interjectId, control: 'none', text: answer });
}
function whiteboardHandler(socket: WebSocket, request: FastifyRequest): void { guardSocket(socket);
  const userId = acceptUser(request, socket); if (!userId) return; wsSend(socket, { type: 'connection_established' }); let sessionId: string | undefined; let voiceId = 'calm'; let speed = 1; let paused = false; let audioBuffer = '';
  const sessionReady = async (requested?: string): Promise<void> => { const state = await readState(); const existing = requested ? state.whiteboards[requested] : undefined; const resumed = Boolean(existing && existing.user_id === userId); sessionId = resumed ? requested : randomUUID(); const session = resumed ? existing! : { session_id: sessionId, user_id: userId, status: 'active', messages: [], whiteboard_state: null, lecture_outline_id: null, conversation_id: randomUUID(), session_title: 'Whiteboard learning session', tts_config: { voice_id: voiceId, speed }, created_at: now() }; await updateState((next) => { next.whiteboards[sessionId!] = session; }); wsSend(socket, { type: 'session_ready', session_id: sessionId, resumed, status: session.status ?? 'active', session: false, messages: session.messages ?? [], conversation_id: session.conversation_id, session_title: session.session_title, whiteboard_state: session.whiteboard_state ?? null, lecture_outline_id: session.lecture_outline_id ?? null }); };
  const teach = async (): Promise<void> => { if (!sessionId) await sessionReady(); paused = false;
    const state = await readState(); const session = state.whiteboards[sessionId!] ?? {};
    const topic = String(session.session_title ?? 'Whiteboard learning session');
    const language = /[\u4e00-\u9fff]/.test(topic) ? 'Chinese' : 'English';
    const lessonEff = await effFor(userId);
    const boardContent = lessonEff.provider === 'stub' ? await stubValue<string>('board_brief') : await chat([{ role: 'user', content: 'Create a compact markdown whiteboard lesson.' }], 'content', lessonEff);
    const pageId = 'page-1'; const annId = randomUUID();
    const imageAction = await lessonImageAction(userId, topic, boardContent, language, lessonEff);
    const spokenText = 'Let’s build the idea from a simple question, draw the relationship, and test it with one concrete example.';
    const actions: Array<Record<string, unknown>> = [
      { type: 'new_page', page_id: pageId, title: 'The Big Idea', step_id: 0 },
      { type: 'board', board_content: boardContent, step_id: 1, board_uid: 0, page_id: pageId, title: 'The Big Idea' },
      imageAction as unknown as Record<string, unknown>,
      { type: 'speak', spoken_text: spokenText, step_id: 2 },
      { type: 'annotation', annotation_type: 'highlight', page_index: 0, step_id: 3, ann_id: annId, text: 'The core relationship', say: 'Focus on the relationship between the two ideas.' },
      { type: 'ask', step_id: 4, page_index: 0, mode: 'open', question: 'What is the key relationship you notice?' },
      { type: 'done', step_id: 5 },
    ];
    await updateState((next) => { const value = next.whiteboards[sessionId!]!; value.status = 'active'; value.whiteboard_state = { board_content: boardContent, actions }; });
    // 帧序对齐线上：动作帧逐条下发 → 媒体帧（tts_segment / image_gen_pending+generated_image）→ group 汇总
    for (const action of actions) { if (action.type === 'speak' || action.type === 'image_generation') continue; wsSend(socket, action); }
    await emitSpeak(socket, userId, sessionId!, 2, spokenText, voiceId, speed, await effFor(userId));
    const placed = await emitImageGeneration(socket, imageAction, pageId, 1, await effFor(userId), 2);
    if (placed) {
      const board = state.whiteboards[sessionId!]?.whiteboard_state as { actions?: Array<Record<string, unknown>> } | undefined;
      await updateState((next) => { const value = next.whiteboards[sessionId!]!; value.board_image = { imageUrl: placed.url, width: placed.width, height: placed.height, caption: imageAction.caption, pending: false }; value.whiteboard_state = { ...(board ?? {}), image_action: imageAction }; });
    }
    wsSend(socket, { type: 'group', actions });
    wsSend(socket, { type: 'reward_user', reward: { credits: 0, reason: 'BYOK: 白板课程完成' } }); };

socket.on('message', (raw) => { const input = parseMessage(raw); if (!input) { wsSend(socket, { type: 'error', message: 'Invalid JSON', is_complete: true }); return; } void (async () => {
    if (input.type === 'ping') { wsSend(socket, { type: 'pong', t: input.t }); return; } if (input.type === 'start_session') { await sessionReady(); return; } if (input.type === 'resume_session' || input.type === 'resume_or_start_course_session') { await sessionReady(typeof input.session_id === 'string' ? input.session_id : typeof input.course_session_id === 'string' ? input.course_session_id : undefined); return; }
    if (input.type === 'set_tts_config') { voiceId = typeof input.voice_id === 'string' ? input.voice_id : voiceId; speed = typeof input.speed === 'number' ? Math.min(2, Math.max(0.5, input.speed)) : speed; if (sessionId) await updateState((next) => { next.whiteboards[sessionId!]!.tts_config = { voice_id: voiceId, speed }; }); wsSend(socket, { type: 'tts_config', voice_id: voiceId, speed }); return; }
    if (input.type === 'set_lecture_outline') { if (!sessionId) await sessionReady(); await updateState((next) => { next.whiteboards[sessionId!]!.lecture_outline_id = input.lecture_outline_id ?? null; }); wsSend(socket, { type: 'lecture_outline_selected', lecture_outline_id: input.lecture_outline_id ?? null, ok: true }); return; }
    if (input.type === 'pause_session' || input.type === 'narration_pause') { paused = true; wsSend(socket, { type: 'pause', paused: true, status: 'paused' }); return; } if (input.type === 'interject_start') { if (!sessionId) await sessionReady(); wsSend(socket, { type: 'interject_ready', interject_id: randomUUID().replaceAll('-', '').slice(0, 12), mode: 'cascade' }); return; }
    if (input.type === 'interject_resume' || input.type === 'start_teaching') { await teach(); return; } if (input.type === 'interject_audio_chunk') { audioBuffer += typeof input.audio_b64 === 'string' ? input.audio_b64 : ''; return; } if (input.type === 'interject_audio_end') { const hadAudio = Boolean(audioBuffer); audioBuffer = ''; if (!sessionId) await sessionReady(); await cascade(socket, userId, sessionId!, 'Please acknowledge this voice question.', voiceId, speed, hadAudio); return; }
    if (input.type === 'interject_question' || input.type === 'question_answers') { if (!sessionId) await sessionReady(); const voice = typeof input.audio_b64 === 'string' || typeof input.mime === 'string'; await cascade(socket, userId, sessionId!, typeof input.text === 'string' ? input.text : voice ? 'Please acknowledge this voice question.' : 'Please clarify the current idea.', voiceId, speed, voice); return; }
    if (input.type === 'model_probe') { wsSend(socket, { type: 'model_probe_started' }); const started = performance.now(); try { const text = await chat([{ role: 'user', content: 'Reply briefly to confirm model connectivity.' }], 'tts', await effFor(userId)); const ttft_ms = Math.round(performance.now() - started); wsSend(socket, { type: 'model_probe_result', ok: true, verdict: 'ok_no_context', ttft_ms, text, minimal: { ok: true, ttft_ms, text, error: null }, replay: false, context_turns: 0, context_chars: 0 }); } catch (error) { wsSend(socket, { type: 'model_probe_result', ok: false, verdict: 'error', ttft_ms: Math.round(performance.now() - started), text: '', minimal: { ok: false, error: error instanceof Error ? error.message : 'Probe failed' } }); } return; }
    if (input.type === 'sync_whiteboard_state' && sessionId) { await updateState((next) => { next.whiteboards[sessionId!]!.whiteboard_state = input.whiteboard_state ?? null; }); wsSend(socket, { type: 'board', ...(typeof input.whiteboard_state === 'object' && input.whiteboard_state ? input.whiteboard_state as object : {}), step_id: input.step_id ?? 0, board_uid: input.board_uid ?? 0, page_id: input.page_id ?? 'page-1' }); return; } if (paused) wsSend(socket, { type: 'pause', paused: true, status: 'paused' });
  })().catch((error: unknown) => wsSend(socket, { type: 'error', message: error instanceof Error ? error.message : 'Internal error', is_complete: true })); });
}

async function deepLearnHandler(socket: WebSocket, request: FastifyRequest): Promise<void> { guardSocket(socket);
  const userId = acceptUser(request, socket); if (!userId) return; const query = request.query as { session_id?: string; subtask_id?: string }; const requested = query.session_id ?? query.subtask_id; const state = await readState(); let sessionId = requested;
  if (requested && state.deep_learn[requested]?.user_id === userId) wsSend(socket, { type: 'deep_learn_session_resumed', session_id: requested, session: state.deep_learn[requested] }); else { sessionId = randomUUID(); await updateState((next) => { next.deep_learn[sessionId!] = { deep_learn_session_id: sessionId, user_id: userId, title: 'Deep learning session', conversation_data: { history: [], progress: {} }, created_at: now() }; }); wsSend(socket, { type: 'deep_learn_session_created', session_id: sessionId }); }
  socket.on('message', (raw) => { const input = parseMessage(raw); if (!input) return; void (async () => { if (input.type === 'ping') { wsSend(socket, { type: 'pong', t: input.t }); return; } if (input.type !== 'user_message') return; const message = typeof input.message === 'string' ? input.message : typeof input.text === 'string' ? input.text : ''; const eff = await effFor(userId); wsSend(socket, { type: 'thinking', tool_name: 'directorAgent', tool_status: 'started', round_index: 1 }); wsSend(socket, { type: 'thinking_chunk', tool_name: 'directorAgent', tool_status: 'streaming', round_index: 1, chunk: 'I will explain the core idea and check it with an example.' }); wsSend(socket, { type: 'tool_execution', tool_name: 'generate_content', tool_status: 'started', round_index: 2 }); let content = ''; let chunks = 0; { for await (const chunk of chatStream([{ role: 'system', content: 'Teach clearly and concisely.' }, { role: 'user', content: message }], 'content', eff)) { content += chunk; chunks += 1; wsSend(socket, { type: 'content_chunk', tool_name: 'generate_content', tool_status: 'streaming', round_index: 2, chunk }); } } if (content && !chunks) { chunks = 1; wsSend(socket, { type: 'content_chunk', tool_name: 'generate_content', tool_status: 'streaming', round_index: 2, chunk: content }); } wsSend(socket, { type: 'tool_execution', tool_name: 'generate_content', tool_status: 'completed', round_index: 2, data: { content, chunk_count: chunks } }); if (/```|mermaid/i.test(content)) wsSend(socket, { type: 'inline_diagram', placeholder_id: randomUUID(), data: { type: 'mermaid', status: 'ready', source: content } }); wsSend(socket, { type: 'mark_response_complete', step_id: 0 }); wsSend(socket, { type: 'complete', message: 'Response complete', is_complete: true }); })().catch((error: unknown) => wsSend(socket, { type: 'error', message: error instanceof Error ? error.message : 'Internal error', is_complete: true })); });
}
function driveHandler(socket: WebSocket, request: FastifyRequest): void { guardSocket(socket); if (!acceptUser(request, socket)) return; wsSend(socket, { type: 'connection_established' }); socket.on('message', (raw) => { const input = parseMessage(raw); if (input?.type === 'ping') wsSend(socket, { type: 'pong', t: input.t }); else if (input) wsSend(socket, { type: 'drive_state_synced', ok: true }); }); }
function netCheckHandler(socket: WebSocket): void { guardSocket(socket); wsSend(socket, { type: 'net_check_session', session_id: randomUUID() }); socket.on('message', (raw) => { const input = parseMessage(raw); if (!input) return; if (input.type === 'ping') wsSend(socket, { type: 'pong', t: input.t }); else if (input.type === 'model_probe' || input.type === 'net_check_model') wsSend(socket, { type: 'net_check_model', ok: true, ttft_ms: 0 }); else if (input.type === 'net_check_recovered') wsSend(socket, { type: 'net_check_recovered', ok: true }); else if (input.type === 'net_check_degraded') wsSend(socket, { type: 'net_check_degraded', ok: false }); else if (input.type?.startsWith('net_check_')) wsSend(socket, { type: input.type, ok: true }); }); }

async function generatedCourse(query: string, courseUuid: string, userId: string): Promise<Record<string, unknown>> {
  const eff = await effFor(userId); let plan = await stubValue<Record<string, unknown>>('course_plan'); if (eff.provider !== 'stub') { const raw = await chat([{ role: 'user', content: `Create a compact course plan for “${query}”. Return only JSON with title, description, and units, each unit having title and sessions.` }], 'quiz', eff); try { plan = JSON.parse(raw.match(/\{[\s\S]*\}/)?.[0] ?? '') as Record<string, unknown>; } catch { /* Preserve valid stub course. */ } }
  const units = Array.isArray(plan.units) ? plan.units.map((unit, unitIndex) => { const value = unit as Record<string, unknown>; const sessions = Array.isArray(value.sessions) ? value.sessions.map((session, sessionIndex) => typeof session === 'string' ? { id: randomUUID(), title: session, description: `Guided learning session ${sessionIndex + 1}.` } : session) : []; return { id: `unit-${unitIndex + 1}`, ...value, sessions }; }) : [];
  return { courseUuid, created_at: now(), updated_at: now(), courseTitle: plan.title ?? query, courseDescription: plan.description ?? `A practical course about ${query}.`, targetLearner: 'Learners seeking intuition and practical skill', tags: query.split(/\s+/).slice(0, 4), ticketVariant: 1, coverImageUrl: '', wideCoverImageUrl: '', source: 'generated', progress: 0, units, user_id: userId };
}

function courseHandler(socket: WebSocket, request: FastifyRequest): void { guardSocket(socket);
  const userId = acceptUser(request, socket); if (!userId) return; wsSend(socket, { type: 'connection_established', message: 'Course generation connected' });
  let courseUuid: string = randomUUID(); let query = 'New course'; let lastAnswers: Array<{ question: string; answer: string }> = []; let runId: string | undefined;
  // 每个服务端帧同步落 run 日志（对齐线上 generation-log.events，dir=server）
  const emit = (frame: Record<string, unknown>): void => {
    const out: Record<string, unknown> = { course_uuid: courseUuid, ...(runId ? { run_id: runId } : {}), ...frame };
    if (runId && typeof out.type === 'string') { const { type, ...rest } = out as { type: string } & Record<string, unknown>; void appendRun(runId, { dir: 'server', type, ...rest }); }
    if (out.type === 'course_generation_complete' && runId) void finishRun(runId, 'completed');
    wsSend(socket, out);
  };
  socket.on('close', () => { if (runId) void finishRun(runId, 'disconnected'); });
  const legacy = async (): Promise<void> => {
    const step = (stepId: string, status: 'loading' | 'completed', title?: string, placeholder?: string) => emit({ type: 'course_generation_step', step_id: stepId, status, ...(title ? { title } : {}), ...(placeholder ? { placeholder } : {}) });
    step('boot', 'loading', 'Starting course generation', 'Crafting Courses...'); emit({ type: 'course_generation_started', course_uuid: courseUuid, run_dir: resolve('var/data/courses', courseUuid), run_id: runId ?? randomUUID() }); step('boot', 'completed');
    step('researching_the_web', 'loading', 'Researching the web', 'Scouring the web for material...'); emit({ type: 'course_generation_progress', message: 'Round 1 fetched 0 page(s)', data: { research: { round: 1, keywords: [query], results: [] }, reference_ids: [] } }); step('researching_the_web', 'completed');
    step('generating_initial_syllabus', 'loading', 'Generating initial syllabus', 'Cooking the big picture...'); step('generating_initial_syllabus', 'completed');
    if (!lastAnswers.length) { emit({ type: 'course_generation_questions', question_data: await stubValue<Record<string, unknown>>('course_questions') }); return; }
    step('generating_structure', 'loading', 'Generating course structure', 'Crafting course structure...'); step('generating_structure', 'completed');
    step('generating_session_outlines', 'loading', 'Generating session outlines', 'Weaving lectures into a journey...');
    const course = await generatedCourse(query, courseUuid, userId); step('generating_session_outlines', 'completed');
    await updateState((state) => { state.courses[courseUuid] = course; });
    emit({ type: 'course_generation_progress', message: 'Saved final course', data: { output_path: resolve('var/data', 'state.json') } });
    emit({ type: 'course_generation_complete', course });
  };
  const drivePipeline = async (): Promise<void> => {
    try {
      const deferred: Array<Record<string, unknown>> = [];
      const emitGated = (frame: Record<string, unknown>) => { if (frame.type === 'course_generation_complete') { deferred.push(frame); return; } emit(frame); };
      const piped = await runCourseGeneration(emitGated, { query, answers: lastAnswers, courseUuid, userId, eff: await effFor(userId) });
      if (piped && Array.isArray(piped.units)) { await updateState((state) => { state.courses[courseUuid] = { ...piped, user_id: userId }; }); }
      for (const frame of deferred) emit(frame);
      if (piped) return;
    } catch { /* pipeline unavailable: fall back to legacy */ }
    await legacy();
  };
  socket.on('message', (raw) => { const input = parseMessage(raw); if (!input) { wsSend(socket, { type: 'error', message: 'Invalid JSON', is_complete: true }); return; } void (async () => {
    if (input.type === 'ping') { wsSend(socket, { type: 'pong', t: input.t }); return; }
    if (input.type === 'start_course_generation' || input.type === 'resume_course_generation' || input.type === 'start_course_update') {
      query = typeof input.query === 'string' ? input.query : query;
      courseUuid = typeof input.course_uuid === 'string' ? input.course_uuid : courseUuid;
      if (!runId) {
        runId = randomUUID();
        await startRun({ runId, userId, courseUuid, query, conversationId: typeof input.conversation_id === 'string' ? input.conversation_id : undefined });
        const attachmentPaths = Array.isArray(input.attachment_paths) ? input.attachment_paths : [];
        await appendRun(runId, { dir: 'client', type: 'start_course_generation', query, canvas: input.canvas_selection ? true : false, ui_language: typeof input.ui_language === 'string' ? input.ui_language : 'zh-CN', attachment_count: attachmentPaths.length, attachment_paths: attachmentPaths, interactive_structure: input.interactive_structure === true });
        // BYOK：不扣积分，但保留字段形状（amount=0 + byok 标记）
        await appendRun(runId, { dir: 'system', type: 'credits_charged', amount: 0, byok: true });
      }
      emit({ type: 'course_generation_started', course_uuid: courseUuid, run_dir: resolve('var/data/courses', courseUuid), run_id: runId });
      return;
    }
    if (input.type === 'course_generation_answers') { lastAnswers = Array.isArray(input.answers) ? input.answers as Array<{ question: string; answer: string }> : []; emit({ type: 'course_generation_answers_received', answers: lastAnswers }); await drivePipeline(); return; }
    if (input.type === 'course_structure_confirm' || input.type === 'course_update_confirm' || input.type === 'course_update_feedback') { await drivePipeline(); return; }
    if (input.type === 'stop_course_generation' || input.type === 'course_update_stop' || input.type === 'stop_course_update') wsSend(socket, { type: 'course_generation_stopped', course_uuid: courseUuid, is_complete: true });
  })().catch((error: unknown) => wsSend(socket, { type: 'error', message: error instanceof Error ? error.message : 'Internal error', is_complete: true })); });
}

function pdfHandler(socket: WebSocket, request: FastifyRequest): void { guardSocket(socket);
  const userId = acceptUser(request, socket); if (!userId) return; const effP = effFor(userId); wsSend(socket, { type: 'connection_established' }); let sessionId: string | undefined; let speed = 1; let audioBuffer = '';
  socket.on('message', (raw) => { const input = parseMessage(raw); if (!input) { wsSend(socket, { type: 'error', message: 'Invalid JSON', is_complete: true }); return; } void (async () => {
    if (input.type === 'ping') { wsSend(socket, { type: 'pong', t: input.t }); return; }
    if (input.type === 'resume_session' || input.type === 'start_session' || input.type === 'resume_or_start_course_session') { sessionId = typeof input.session_id === 'string' ? input.session_id : randomUUID(); await updateState((next) => { next.whiteboards[sessionId!] ??= { session_id: sessionId, user_id: userId, status: 'active', messages: [], pdf_state: null, board_state: null, created_at: now() }; }); const session = (await readState()).whiteboards[sessionId]!; wsSend(socket, { type: 'session_ready', session_id: sessionId, resumed: Boolean(input.session_id), status: session.status ?? 'active', session: false, messages: session.messages ?? [], pdf_state: session.pdf_state ?? null, board_state: session.board_state ?? null }); return; }
    if (input.type === 'set_tts_config') { speed = typeof input.speed === 'number' ? Math.max(0.5, Math.min(2, input.speed)) : speed; wsSend(socket, { type: 'tts_config', voice_id: typeof input.voice_id === 'string' ? input.voice_id : 'firm', speed }); return; }
    if (input.type === 'sync_pdf_state' && sessionId) { const pdfState = input.pdf_state ?? input.sync_pdf_state ?? null; await updateState((next) => { Object.assign(next.whiteboards[sessionId!]!, { pdf_state: pdfState, board_state: input.board_state ?? null, pdf_file_id: typeof pdfState === 'object' && pdfState ? (pdfState as Record<string, unknown>).file_id : undefined }); }); wsSend(socket, { type: 'pdf_state_synced', ok: true, session_id: sessionId, pdf_state: pdfState }); return; }
    if (input.type === 'start_teaching') { if (!sessionId || !(await readState()).whiteboards[sessionId]?.pdf_file_id) { wsSend(socket, { type: 'error', message: 'No PDF uploaded. Please upload a PDF first.', is_complete: true }); return; } const tts = (step: number) => `/api/v1/whiteboard/audio-stream/${userId}/${sessionId}/tts_${step}.webm`; wsSend(socket, { type: 'speak', page_index: 0, step_id: 0, say: 'Let’s begin with the key idea on this page.', tts_url: tts(0) }); wsSend(socket, { type: 'annotation', annotation_type: 'highlight', page_index: 0, step_id: 1, ann_id: randomUUID(), text: 'Key idea', say: 'This highlighted phrase is the key idea.', tts_url: tts(1) }); wsSend(socket, { type: 'ask', step_id: 2, page_index: 0, mode: 'open', question: 'What is the key idea on this page?' }); wsSend(socket, { type: 'mark_response_complete', step_id: 3 }); wsSend(socket, { type: 'done', step_id: 4 }); return; }
    if (input.type === 'interject_start') { if (!sessionId) sessionId = randomUUID(); wsSend(socket, { type: 'interject_ready', interject_id: randomUUID().replaceAll('-', '').slice(0, 12), mode: 'cascade' }); return; } if (input.type === 'interject_audio_chunk') { audioBuffer += typeof input.audio_b64 === 'string' ? input.audio_b64 : ''; return; } if (input.type === 'interject_audio_end') { const hadAudio = Boolean(audioBuffer); audioBuffer = ''; if (sessionId) await cascade(socket, userId, sessionId, 'Please acknowledge this voice question.', 'firm', speed, hadAudio); return; } if (input.type === 'interject_question') { if (sessionId) await cascade(socket, userId, sessionId, typeof input.text === 'string' ? input.text : 'Please clarify this PDF.', 'firm', speed, typeof input.audio_b64 === 'string' || typeof input.mime === 'string'); return; }
    if (input.type === 'action_step_received' || input.type === 'action_step_complete' || input.type === 'user_continue') return; if (input.type === 'navigate_page') { wsSend(socket, { type: 'go_to_page', page: input.page ?? 0, step_id: 0 }); return; }
    if (input.type === 'model_probe') { const started = performance.now(); wsSend(socket, { type: 'model_probe_started' }); try { const text = await chat([{ role: 'user', content: 'Confirm connectivity briefly.' }], 'tts', await effP); const ttft_ms = Math.round(performance.now() - started); wsSend(socket, { type: 'model_probe_result', ok: true, verdict: 'ok_no_context', ttft_ms, text, minimal: { ok: true, ttft_ms, text, error: null } }); } catch { wsSend(socket, { type: 'model_probe_result', ok: false, verdict: 'error', ttft_ms: Math.round(performance.now() - started) }); } }
  })().catch((error: unknown) => wsSend(socket, { type: 'error', message: error instanceof Error ? error.message : 'Internal error', is_complete: true })); });
}

export async function registerWebsocketRoutes(app: FastifyInstance): Promise<void> {
  app.get('/api/v1/ws', { websocket: true }, chatHandler); app.get('/ws', { websocket: true }, chatHandler); app.get('/api/v1/whiteboard/ws', { websocket: true }, whiteboardHandler); app.get('/api/v1/pdf-annotation/ws', { websocket: true }, pdfHandler); app.get('/api/v1/course-generation/ws', { websocket: true }, courseHandler); app.get('/api/v1/course-generation/update', { websocket: true }, courseHandler); app.get('/api/v1/deep_learn/ws', { websocket: true }, deepLearnHandler); app.get('/api/v1/drive/ws', { websocket: true }, driveHandler); app.get('/api/v1/net-check/ws', { websocket: true }, netCheckHandler);
}
