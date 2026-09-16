import { randomUUID } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import type { FastifyInstance, FastifyRequest } from 'fastify';
import type { WebSocket } from 'ws';
import { OPEN_USER_ID, ensureOpenUser, verifyJwt } from './auth.js';
import { publishFilePdf } from './pipelines.js';
import { AGENT_FALLBACK, htmlAnimationTool, instructionalVideoTool, publishFileTool } from './artifactTools.js';
import { runSandboxed } from './sandbox.js';
import { diagrams, placeholderPng, placeholderWebm, publicFiles } from './artifacts.js';
import { runDshTask } from './agent/dsh-adapter.js';
import { runDirectorRound } from './agent/director.js';
import { config, resolveByok } from './config.js';
import { image } from './providers/index.js';
import { audioFileName, placeholderImageSvg, referencePageImage, saveWhiteboardImage, ttsCounts, writeTtsAudio } from './media.js';
import { IMAGE_ACTION_CONTRACT, WHITEBOARD_IMAGE_SIZE, imagePromptPreview, normalizeImageAction, type WhiteboardImageAction } from './whiteboardImage.js';
import { chat, chatStream, stubValue, type ChatMessage } from './llm.js';
import { now, readState, updateState } from './store.js';
import { attachTask, busyFor, findActiveTask, getTask, recordAnswerDraft, startCourseTask, stopCourseTask, submitTaskAnswers } from './courseTasks.js';
import { sessionKeyPoints } from './courseModel.js';
import { prefetch, synthesize } from './tts.js';
import { buildAnimation } from './animation.js';
import { hash32 } from './media.js';

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

async function runChatTool(socket: WebSocket, tool: ChatTool, message: string, userId: string, conversationId: string, roundIndex: number, eff?: ReturnType<typeof resolveByok>, args: Record<string, unknown> = {}): Promise<{ produced: boolean; data: Record<string, unknown>; content?: string }> {
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
    const flat = (typeof result === 'object' && result !== null ? result as Record<string, unknown> : { content: result }) as Record<string, unknown>; const questions = Array.isArray(flat.questions) ? flat.questions : undefined; const cards = Array.isArray(flat.cards) ? flat.cards : undefined; const data: Record<string, unknown> = tool === 'generate_quiz' ? { ...(questions ? { questions } : { questions: flat.questions ?? [] }), total_count: Array.isArray(questions) ? questions.length : 0, model_used: config.models.quiz, ...(flat.title ? { title: flat.title } : {}) } : { flashcards: (cards ?? []).map((card, index) => ({ ...(card as Record<string, unknown>), index: index + 1 })), total_count: Array.isArray(cards) ? cards.length : 0, model_used: config.models.content, ...(flat.title ? { title: flat.title } : {}) }; chatSend(socket, { type: 'tool_execution', tool_name: tool, tool_status: 'completed', round_index: roundIndex, display: 'display', data }); return { produced: true, data };
  }
  if (tool === 'generate_html_animation') {
    // 形状与实现在 artifactTools（线上 r35 实证），这里只做 socket 侧转发
    const result = await htmlAnimationTool(message, eff);
    chatSend(socket, { type: 'tool_execution', tool_name: tool, tool_status: 'completed', round_index: roundIndex, display: 'display', data: result.data });
    const id = String((result.data as { diagram_id?: string }).diagram_id ?? '');
    const fileUrl = String((result.data as { file_url?: string }).file_url ?? '');
    const placeholderId = `dg_${id}`;
    chatSend(socket, {
      type: 'inline_diagram', tool_name: tool, tool_status: 'ready', round_index: roundIndex, placeholder_id: placeholderId,
      data: {
        placeholder_id: placeholderId, type: 'html_animation', layout: 'right', status: 'ready', diagram_id: id,
        tag: `<diagram data-placeholder-id="${placeholderId}" data-subtype="html_animation" data-layout="right" data-status="ready" data-diagram-id="${id}" data-file-url="${fileUrl}"></diagram>`,
        source_tag: `<content-type: diagram; diagram-subtype: html-animation; content-prompt: {${message.slice(0, 200)}}>`,
      },
    });
    return { produced: true, data: result.data };
  }
  if (tool === 'publish_file') {
    const result = await publishFileTool({ message, conversationId, indices: Array.isArray((args as { indices?: unknown[] })?.indices) ? (args as { indices: number[] }).indices : undefined });
    if (!result.produced) {
      chatSend(socket, { type: 'tool_execution', tool_name: tool, tool_status: 'error', round_index: roundIndex, display: 'display', data: result.data });
      chatSend(socket, { type: 'agent_response', content: AGENT_FALLBACK, conversation_id: conversationId, is_complete: false });
      return { produced: false, data: result.data };
    }
    chatSend(socket, { type: 'tool_execution', tool_name: tool, tool_status: 'completed', round_index: roundIndex, display: 'display', data: result.data });
    return { produced: true, data: result.data, content: result.content };
  }
  if (tool === 'ask_questions') {
    const data = { questions: [{ question: `What outcome matters most for “${message.slice(0, 80)}”?`, options: [{ title: 'Understand', description: 'Build intuition first.' }, { title: 'Practice', description: 'Work through examples.' }, { title: 'Apply', description: 'Build something useful.' }], is_multiple: false }] }; chatSend(socket, { type: 'user_question', tool_name: tool, tool_status: 'completed', round_index: roundIndex, display: 'display', question_data: data }); return { produced: true, data };
  }
  if (tool === 'generate_instructional_video') {
    const result = await instructionalVideoTool(message, eff, (progress) => {
      chatSend(socket, { type: 'tool_execution', tool_name: tool, tool_status: progress.status, round_index: roundIndex, display: 'display', data: { stage: progress.stage, message: progress.message } });
    });
    chatSend(socket, { type: 'tool_execution', tool_name: tool, tool_status: 'completed', round_index: roundIndex, display: 'display', data: result.data });
    return { produced: true, data: result.data };
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
  chatSend(socket, { type: 'credit_status', message: 'Processing your request (BYOK Mode: Unlimited)', credit_info: { remaining_credits: 999999, max_credits: 999999, tier: 'byok', turn_cost: 0 }, next_reset_time: new Date(Date.now() + 86400000).toISOString() });
  if (process.env.AGENT_CORE === 'dsh') {
    // Agent 核心 = DeepSeek Harness：推理流→thinking_chunk，答复→content_chunk；失败则回退内置管线
    chatSend(socket, { type: 'thinking', tool_name: 'directorAgent', tool_status: 'started', round_index: 1, display: 'display' });
    const r = await runDshTask(message, { timeoutMs: 120_000, systemHint: 'You are betterknow\'s learning assistant. Answer the learner directly in their language, in Markdown with KaTeX for math.', onThinking: (chunk) => chatSend(socket, { type: 'thinking_chunk', tool_name: 'directorAgent', tool_status: 'streaming', round_index: 1, chunk }) });
    if (r.ok) {
      chatSend(socket, { type: 'tool_execution', tool_name: 'generate_content', tool_status: 'started', round_index: 2 });
      for (const chunk of r.output.match(/[\s\S]{1,120}/g) ?? [r.output]) chatSend(socket, { type: 'content_chunk', tool_name: 'generate_content', tool_status: 'streaming', round_index: 2, chunk });
      await updateState((next) => { const value = next.conversations[conversationId]!; value.history_index += 1; value.history.push({ index: value.history_index, role: 'assistant', content: JSON.stringify({ type: 'content_chunk', content: r.output }), timestamp: now() }); });
      chatSend(socket, { type: 'tool_execution', tool_name: 'generate_content', tool_status: 'completed', round_index: 2, data: { content: r.output, agent_core: 'dsh', duration_ms: r.durationMs } });
      chatSend(socket, { type: 'mark_response_complete', step_id: 0 }); chatSend(socket, { type: 'complete', message: 'Response complete', is_complete: true, conversation_id: conversationId, tts_pending: false }); return;
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
  let outcome = await runChatTool(socket, decision.tool, message, userId, conversationId, 2, eff, decision.args); if (!outcome.produced) outcome = await runChatTool(socket, 'generate_content', message, userId, conversationId, 3, eff); if (!outcome.produced) { chatSend(socket, { type: 'error', message: 'The agent could not produce a response after validation.', is_complete: true }); return; }
  chatSend(socket, { type: 'tool_selection', tool_name: 'mark_response_complete', tool_status: 'started', round_index: 3, display: 'display' }); if (decision.tool !== 'ask_questions') await runChatTool(socket, 'recommend_next_step', message, userId, conversationId, 4, eff);
  await updateState((next) => { const value = next.conversations[conversationId]!; const stamp = () => { value.history_index += 1; return value.history_index; }; if (decision.tool === 'generate_content' && outcome.content) { value.history.push({ index: stamp(), role: 'assistant', content: outcome.content, timestamp: now() }); } const isWrapped = decision.tool === 'generate_quiz' || decision.tool === 'generate_flashcards'; value.history.push({ index: stamp(), role: 'tool', content: `Executed ${decision.tool}`, timestamp: now(), tool_name: decision.tool, args: decision.args, result: isWrapped ? { result: outcome.data } : outcome.data }); value.updated_at = now(); }); chatSend(socket, { type: 'complete', message: 'Response complete', is_complete: true });
}

function chatHandler(socket: WebSocket, request: FastifyRequest): void { guardSocket(socket);
  const userId = acceptUser(request, socket); if (!userId) return; const query = request.query as { conversation_id?: string }; const requestedId = query.conversation_id;
  const inbox: unknown[] = []; let onMessageReady: ((raw: unknown) => void) | undefined;
  socket.on('message', (raw) => { if (onMessageReady) onMessageReady(raw); else inbox.push(raw); });
  void (async () => { const state = await readState(); let conversationId = requestedId; if (!conversationId || !state.conversations[conversationId] || state.conversations[conversationId]?.user_id !== userId) { conversationId = randomUUID(); const timestamp = now(); const prompt = await systemPrompt(); await updateState((next) => { next.conversations[conversationId!] = { conversation_id: conversationId!, user_id: userId, title: `Conversation ${conversationId}`, created_at: timestamp, updated_at: timestamp, history_index: 1, history: [{ index: 1, role: 'system', content: prompt, timestamp }], starred: false, board_session_types: [], artifacts: [] }; }); chatSend(socket, { type: 'conversation_created', data: { conversation_id: conversationId, title: `Conversation ${conversationId}` } }); } else chatSend(socket, { type: 'conversation_resumed', data: { conversation_id: conversationId, title: state.conversations[conversationId].title } });
    const dispatch = (raw: unknown): void => { const input = parseMessage(raw); request.log.info({ raw: String(raw).slice(0, 120), parsed: input?.type }, 'chat socket message'); if (!input) { chatSend(socket, { type: 'error', message: 'Invalid JSON', is_complete: true }); return; } if (input.type === 'ping') { chatSend(socket, { type: 'pong', t: input.t }); return; } if (input.type === 'stop_generation') { chatSend(socket, { type: 'complete', message: 'Generation stopped', is_complete: true }); return; } if (input.type === 'question_answers' || input.type === 'user_question_answers') { void (async () => { const answers = Array.isArray(input.answers) ? input.answers as Array<{ question?: string; answer?: string }> : []; const state = await readState(); const conversation = state.conversations[conversationId ?? ''] as unknown as { last_user_message?: string } | undefined; const message = typeof input.message === 'string' && input.message ? input.message : String(conversation?.last_user_message ?? answers.map((a) => a.answer ?? '').join(' ')); await runDirectorRound({ userId, conversationId: conversationId!, send: (frame) => chatSend(socket, frame), eff: await effFor(userId) }, { message, answers, ui_language: typeof input.ui_language === 'string' ? input.ui_language : undefined }); })().catch((error: unknown) => chatSend(socket, { type: 'error', message: error instanceof Error ? error.message : 'Internal error', is_complete: true })); return; }  if (input.type === 'save_artifact') { void updateState((next) => { next.conversations[conversationId!]!.artifacts.push({ ...input, saved_at: now() }); }).then(() => chatSend(socket, { type: 'save_artifact_response', success: true, is_complete: true })); return; } if (input.type === 'user_message') chatRound(socket, input, userId, conversationId!).catch((error: unknown) => { console.error('[chatRound]', error); chatSend(socket, { type: 'error', message: error instanceof Error ? `${error.message}` : 'Internal error', is_complete: true }); }); };
    onMessageReady = dispatch; while (inbox.length) dispatch(inbox.shift());

  })().catch((error: unknown) => chatSend(socket, { type: 'error', message: error instanceof Error ? error.message : 'Internal error', is_complete: true }));
}

// ── 白板媒体：speak → TTS 分片（tts_segment）；image_generation → 图像模型 + generated_image ──
function voiceFor(voiceId: string): string { return voiceId; }

// 讲稿里的下一句（用于预取）：本页后续的 speak 动作优先，没有就退回本章其他 speak 文本。
function nextSpeech(actions: Array<Record<string, unknown>>, current: string): string | undefined {
  const speaks = actions.filter((action) => action.type === 'speak').map((action) => String(action.spoken_text ?? action.say ?? '').trim()).filter(Boolean);
  const index = speaks.indexOf(current.trim());
  return index >= 0 ? speaks[index + 1] : speaks[1];
}

async function emitSpeak(socket: WebSocket, userId: string, sessionId: string, stepId: number, text: string, voiceId: string, speed: number, byok: import('./config.js').ByokConfig, lookahead?: string): Promise<void> {
  const speech = text.trim(); if (!speech) return;
  if (lookahead && lookahead !== speech) prefetch(lookahead, { voice: voiceId, speed, eff: byok });
  const counts = ttsCounts(speech);
  const segment = await synthesize(speech, { voice: voiceId, speed, eff: byok });
  const audioUrl = segment.stub ? await writeTtsAudio(userId, sessionId, audioFileName(userId, sessionId, stepId, speech, 'webm'), placeholderWebm) : segment.url;
  wsSend(socket, { type: 'tts_segment', audio_url: audioUrl, url: audioUrl, sequence: stepId, step_id: stepId, tts_cjk: counts.tts_cjk, tts_latin: counts.tts_latin, speed, stub: segment.stub, cached: segment.cached, ...(segment.error ? { error: segment.error } : {}) });
}


// 随堂单选与动画任务：模型可用时让模型出题，否则用板书里的第一条要点兜底（不编造事实）
async function boardQuiz(boardContent: string, topic: string, eff: ReturnType<typeof resolveByok>): Promise<{ action: Record<string, unknown>; animation_task: string }> {
  const snippet = boardSnippet(boardContent);
  const fallback = {
    action: { type: 'ask', step_id: 5, page_index: 0, mode: 'open' as const, question: `用自己的话解释「${snippet}」。` },
    animation_task: `把「${topic}」的核心关系做成可调参数的演示：拖动滑杆时，两侧状态与叠加结果同步变化。`,
  };
  if (eff.provider === 'stub') return fallback;
  try {
    const raw = await chat([
      { role: 'system', content: '出一道具单选题检验理解。只输出 JSON：{"question":string,"options":[string,string,string],"correct_index":0,"explanation":string,"animation_task":string}' },
      { role: 'user', content: `课程主题：${topic}\n板书：${boardContent.slice(0, 600)}` },
    ], 'quiz', eff);
    const parsed = JSON.parse(raw.match(/\{[\s\S]*\}/)?.[0] ?? '') as { question?: string; options?: unknown[]; correct_index?: number; explanation?: string; animation_task?: string };
    const options = (parsed.options ?? []).map(String).filter(Boolean).slice(0, 4);
    if (!parsed.question || options.length < 2) return fallback;
    const correct = Number(parsed.correct_index ?? 0);
    return {
      action: { type: 'ask', step_id: 5, page_index: 0, mode: 'choice', question: String(parsed.question), options, correct_index: Number.isFinite(correct) ? Math.min(Math.max(correct, 0), options.length - 1) : 0, explanation: String(parsed.explanation ?? '') },
      animation_task: String(parsed.animation_task ?? fallback.animation_task),
    };
  } catch { return fallback; }
}

// 板面里最像要点的一句话：优先粗体/标题行，其次第一句
function boardSnippet(boardContent: string): string {
  const lines = boardContent.split('\n').map((line) => line.trim()).filter(Boolean);
  const bold = lines.find((line) => /\*\*[^*]+\*\*/.test(line));
  const pick = (bold ?? lines.find((line) => /^#/.test(line)) ?? lines[0] ?? 'the core idea').replace(/^#+\s*/, '').replace(/\*\*/g, '');
  return pick.split(/[。.;；!?！？]/)[0]?.slice(0, 60) || 'the core idea';
}

async function emitImageGeneration(socket: WebSocket, action: WhiteboardImageAction, pageId: string, stepId: number, byok: import('./config.js').ByokConfig, placementStepId?: number, pageBody = ''): Promise<{ url: string; width: number; height: number; stub: boolean; source?: string } | undefined> {
  const reference = action.source === 'reference_page';
  wsSend(socket, {
    type: 'image_gen_pending', step_id: stepId,
    ...(typeof placementStepId === 'number' ? { placement_step_id: placementStepId } : {}),
    prompt_preview: imagePromptPreview(action.prompt), caption: action.caption, page_id: pageId,
    ...(reference ? { source: 'reference_page', reference_name: action.reference_name ?? 'course material', ...(typeof action.page_index === 'number' ? { page_index: action.page_index } : {}) } : {}),
  });
  // reference_page：插图就是课件页本身，直接用页面内容渲一张贴图，不花图像模型的钱
  if (reference) {
    const stored = await saveWhiteboardImage(referencePageImage({ title: action.caption, body: pageBody, referenceName: action.reference_name, pageIndex: action.page_index, language: action.language }), 'svg');
    wsSend(socket, { type: 'generated_image', image_url: stored.url, width: stored.width, height: stored.height, caption: action.caption, step_id: stepId, page_id: pageId, source: 'reference_page' });
    return { url: stored.url, width: stored.width, height: stored.height, stub: false, source: 'reference_page' };
  }
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
async function cascade(socket: WebSocket, userId: string, sessionId: string, text: string, voiceId: string, speed: number, voiceInput = false, audioPrefix = '/api/v1/whiteboard/audio-stream'): Promise<void> {
  const seam = await effFor(userId);
  const interjectId = randomUUID().replaceAll('-', '').slice(0, 12); wsSend(socket, { type: 'interject_ready', interject_id: interjectId, mode: 'cascade' });
  if (voiceInput) wsSend(socket, { type: 'interject_user_text', interject_id: interjectId, delta: '(voice input received)' });
  let answer = '确认收到你的问题。我们可以先抓住核心概念，再用一个具体例子验证它。';
  try { answer = await chat([{ role: 'system', content: 'Answer a learner interjection clearly and briefly.' }, { role: 'user', content: text }], 'content', await effFor(userId)); } catch { /* Local fallback keeps the cascade usable. */ }
  let sequence = 0;
  const sentences = splitSentences(answer);
  for (const [index, sentence] of sentences.entries()) {
    const counts = ttsCounts(sentence);
    // 念当前句的同时把下一句合成出来：级联的停顿感主要来自这里
    if (sentences[index + 1]) prefetch(sentences[index + 1], { voice: voiceId, speed, format: 'pcm', eff: seam });
    // PCM 直出优先（OpenAI 兼容网关的 response_format=pcm 是原始 PCM16，不用解码器）
    const segment = await synthesize(sentence, { voice: voiceId, speed, format: 'pcm', eff: seam });
    const audioUrl = segment.stub
      ? (await writeTtsAudio(userId, sessionId, audioFileName(userId, sessionId, sequence, sentence, 'webm'), placeholderWebm)).replace('/api/v1/whiteboard/audio-stream', audioPrefix)
      : (audioPrefix === '/api/v1/whiteboard/audio-stream' ? segment.url : `${audioPrefix}/${userId}/${sessionId}/${segment.url.split('/').pop()}`);
    wsSend(socket, { type: 'interject_text', interject_id: interjectId, delta: sentence });
    wsSend(socket, { type: 'interject_audio', interject_id: interjectId, audio_url: audioUrl, sequence, speed, text: sentence, tts_cjk: counts.tts_cjk, tts_latin: counts.tts_latin, stub: segment.stub, cached: segment.cached });
    if (segment.pcm) wsSend(socket, { type: 'interject_pcm', interject_id: interjectId, pcm_b64: segment.pcm.toString('base64'), sample_rate: segment.sample_rate ?? 24_000, stub: false });
    else wsSend(socket, { type: 'interject_pcm', interject_id: interjectId, pcm_b64: silentPcm(), sample_rate: 24_000, stub: true });
    sequence += 1;
  }
  wsSend(socket, { type: 'interject_done', interject_id: interjectId, control: 'none', text: answer });
}
function whiteboardHandler(socket: WebSocket, request: FastifyRequest): void { guardSocket(socket);
  let stateCache = { courses: {}, whiteboards: {} } as unknown as Awaited<ReturnType<typeof readState>>;
  const userId = acceptUser(request, socket); if (!userId) return; wsSend(socket, { type: 'connection_established' }); let sessionId: string | undefined; let voiceId = 'calm'; let speed = 1; let paused = false; let audioBuffer = '';
  // 线上形态：白板会话 id = <course_uuid>__<course_session_id>，lecture_outline_id = <course_uuid>:<course_session_id>
  const composeSessionId = (requested: string): string => {
    if (requested.includes('__')) return requested;
    const hit = sessionKeyPoints(stateCache, requested).session;
    return hit ? `${hit.courseUuid}__${requested}` : requested;
  };
  const sessionReady = async (requested?: string): Promise<void> => { const state = await readState(); stateCache = state; const existing = requested ? state.whiteboards[requested] : undefined; const resumed = Boolean(existing && existing.user_id === userId); sessionId = resumed ? requested : requested && !existing ? composeSessionId(requested) : randomUUID(); const session = resumed ? existing! : { session_id: sessionId, user_id: userId, status: 'active', messages: [], whiteboard_state: null, lecture_outline_id: null, conversation_id: randomUUID(), session_title: 'Whiteboard learning session', tts_config: { voice_id: voiceId, speed }, created_at: now() }; 
    // key_points / 标题属于课程 session：白板会话第一次连上时取回并缓存，之后重连不依赖课程还在
    const cached = Array.isArray(session.key_points) ? (session.key_points as unknown[]).map(String) : [];
    const linked = sessionKeyPoints(state, String(sessionId).split('__').pop() ?? String(sessionId));
    const keyPoints = cached.length ? cached : linked.keyPoints;
    if (keyPoints.length && !cached.length) { session.key_points = keyPoints; }
    if (linked.session && !resumed) { session.session_title = linked.session.title; session.lecture_outline_id = linked.session.outlineId; }
    await updateState((next) => { next.whiteboards[sessionId!] = session; }); wsSend(socket, { type: 'session_ready', session_id: sessionId, resumed, status: session.status ?? 'active', session: false, messages: session.messages ?? [], conversation_id: session.conversation_id, session_title: session.session_title, whiteboard_state: session.whiteboard_state ?? null, lecture_outline_id: session.lecture_outline_id ?? null, key_points: keyPoints }); };
  const teach = async (): Promise<void> => { if (!sessionId) await sessionReady(); paused = false;
    const state = await readState(); const session = state.whiteboards[sessionId!] ?? {};
    const topic = String(session.session_title ?? 'Whiteboard learning session');
    const language = /[\u4e00-\u9fff]/.test(topic) ? 'Chinese' : 'English';
    const lessonEff = await effFor(userId);
    const boardContent = lessonEff.provider === 'stub' ? await stubValue<string>('board_brief') : await chat([{ role: 'user', content: 'Create a compact markdown whiteboard lesson.' }], 'content', lessonEff);
    const pageId = 'page-1'; const annId = randomUUID();
    const imageAction = await lessonImageAction(userId, topic, boardContent, language, lessonEff);
    const spokenText = 'Let’s build the idea from a simple question, draw the relationship, and test it with one concrete example.';
    // 随堂单选（线上 ask{mode:"choice",question,options,correct_index,explanation}）：有模型就出题，没有就用板书里的要点兜底
    const quiz = await boardQuiz(boardContent, topic, lessonEff);
    const actions: Array<Record<string, unknown>> = [
      { type: 'new_page', page_id: pageId, title: 'The Big Idea', step_id: 0 },
      { type: 'board', board_content: boardContent, step_id: 1, board_uid: 0, page_id: pageId, title: 'The Big Idea' },
      imageAction as unknown as Record<string, unknown>,
      { type: 'speak', spoken_text: spokenText, step_id: 2 },
      { type: 'annotation', annotation_type: 'highlight', page_index: 0, step_id: 3, ann_id: annId, text: 'The core relationship', say: 'Focus on the relationship between the two ideas.' },
      { type: 'animation', step_id: 4, page_id: pageId, title: '互动动画', task_preview: quiz.animation_task },
      quiz.action,
      { type: 'done', step_id: 6 },
    ];
    await updateState((next) => { const value = next.whiteboards[sessionId!]!; value.status = 'active'; value.whiteboard_state = { board_content: boardContent, actions }; });
    // 帧序对齐线上：动作帧逐条下发 → 媒体帧（tts_segment / image_gen_pending+generated_image）→ group 汇总
    for (const action of actions) { if (action.type === 'speak' || action.type === 'image_generation' || action.type === 'animation') continue; wsSend(socket, action); }
    // 顶层 highlight：指向板面元素与其中的片段（线上形态 {step_id,target_board_id,page_id,snippet}）
    wsSend(socket, { type: 'highlight', step_id: 3, target_board_id: 1, page_id: pageId, snippet: boardSnippet(boardContent) });
    // TTS 与插图互不依赖：并行发起，先把音频给出去（预取下一句在 emitSpeak 内部完成）
    const eff = await effFor(userId);
    const [placed] = await Promise.all([
      emitImageGeneration(socket, imageAction, pageId, 1, eff, 2, boardContent),
      emitSpeak(socket, userId, sessionId!, 2, spokenText, voiceId, speed, eff, nextSpeech(actions, spokenText)),
    ]);
    if (placed) {
      const board = state.whiteboards[sessionId!]?.whiteboard_state as { actions?: Array<Record<string, unknown>> } | undefined;
      await updateState((next) => { const value = next.whiteboards[sessionId!]!; value.board_image = { imageUrl: placed.url, width: placed.width, height: placed.height, caption: imageAction.caption, pending: false }; value.whiteboard_state = { ...(board ?? {}), image_action: imageAction }; });
    }
    // 互动动画：先 pending 再给自包含 HTML（和 TTS/插图并行，互不阻塞）
    const animationStep = 4;
    wsSend(socket, { type: 'animation_pending', step_id: animationStep, placement_step_id: animationStep + 1, task_preview: quiz.animation_task, page_id: pageId });
    const animation = await buildAnimation({ title: String(session.session_title ?? topic), task: quiz.animation_task, board: boardContent, language, eff });
    wsSend(socket, { type: 'generated_animation', step_id: animationStep, page_id: pageId, html: animation.html, stub: animation.stub });
    wsSend(socket, { type: 'group', actions });
    wsSend(socket, { type: 'done', step_id: 6 });
    // 线上帧形（r133 实证）：reward_user 带 {step_id, master_concept_title, master_concept_description} 才会弹奖励层；
    // response_complete{session:true} 才会弹单元完成层
    wsSend(socket, {
      type: 'reward_user',
      step_id: 7,
      master_concept_title: String(session.session_title ?? topic),
      master_concept_description: `你已经能用自己的话复述「${String(session.session_title ?? topic)}」的核心机制，并完成了一次随堂小测。`,
    }); };

socket.on('message', (raw) => { const input = parseMessage(raw); if (!input) { wsSend(socket, { type: 'error', message: 'Invalid JSON', is_complete: true }); return; } void (async () => {
    if (input.type === 'ping') { wsSend(socket, { type: 'pong', t: input.t }); return; } if (input.type === 'start_session') { await sessionReady(typeof input.session_id === 'string' && input.session_id !== 'new' ? input.session_id : typeof input.course_session_id === 'string' ? input.course_session_id : undefined); return; } if (input.type === 'resume_session' || input.type === 'resume_or_start_course_session') { await sessionReady(typeof input.session_id === 'string' ? input.session_id : typeof input.course_session_id === 'string' ? input.course_session_id : undefined); return; }
    if (input.type === 'set_tts_config') { voiceId = typeof input.voice_id === 'string' ? input.voice_id : voiceId; speed = typeof input.speed === 'number' ? Math.min(2, Math.max(0.5, input.speed)) : speed; if (sessionId) await updateState((next) => { next.whiteboards[sessionId!]!.tts_config = { voice_id: voiceId, speed }; }); wsSend(socket, { type: 'tts_config', voice_id: voiceId, speed }); return; }
    if (input.type === 'set_lecture_outline') { if (!sessionId) await sessionReady(); await updateState((next) => { next.whiteboards[sessionId!]!.lecture_outline_id = input.lecture_outline_id ?? null; }); wsSend(socket, { type: 'lecture_outline_selected', lecture_outline_id: input.lecture_outline_id ?? null, ok: true }); return; }
    if (input.type === 'pause_session' || input.type === 'narration_pause') { paused = true; wsSend(socket, { type: 'pause', paused: true, status: 'paused' }); return; } if (input.type === 'interject_start') { if (!sessionId) await sessionReady(); wsSend(socket, { type: 'interject_ready', interject_id: randomUUID().replaceAll('-', '').slice(0, 12), mode: 'cascade' }); return; }
    if (input.type === 'interject_resume' || input.type === 'start_teaching') { await teach(); return; }
    // 线上：奖励层「知道了」→ advance(stepId) → 课才收尾（response_complete{session:true} → 单元完成层）
    if (input.type === 'advance_step' || input.type === 'step_acknowledged') { wsSend(socket, { type: 'response_complete', is_complete: true, status: 'completed', session: true }); return; } if (input.type === 'interject_audio_chunk') { audioBuffer += typeof input.audio_b64 === 'string' ? input.audio_b64 : ''; return; } if (input.type === 'interject_audio_end') { const hadAudio = Boolean(audioBuffer); audioBuffer = ''; if (!sessionId) await sessionReady(); await cascade(socket, userId, sessionId!, 'Please acknowledge this voice question.', voiceId, speed, hadAudio); return; }
    if (input.type === 'interject_question' || input.type === 'question_answers') { if (!sessionId) await sessionReady(); const voice = typeof input.audio_b64 === 'string' || typeof input.mime === 'string'; await cascade(socket, userId, sessionId!, typeof input.text === 'string' ? input.text : voice ? 'Please acknowledge this voice question.' : 'Please clarify the current idea.', voiceId, speed, voice); return; }
    if (input.type === 'model_probe') { wsSend(socket, { type: 'model_probe_started' }); const started = performance.now(); try { const text = await chat([{ role: 'user', content: 'Reply briefly to confirm model connectivity.' }], 'tts', await effFor(userId)); const ttft_ms = Math.round(performance.now() - started); wsSend(socket, { type: 'model_probe_result', ok: true, verdict: 'ok_no_context', ttft_ms, text, minimal: { ok: true, ttft_ms, text, error: null }, replay: false, context_turns: 0, context_chars: 0 }); } catch (error) { wsSend(socket, { type: 'model_probe_result', ok: false, verdict: 'error', ttft_ms: Math.round(performance.now() - started), text: '', minimal: { ok: false, error: error instanceof Error ? error.message : 'Probe failed' } }); } return; }
    if (input.type === 'sync_whiteboard_state' && sessionId) { await updateState((next) => { next.whiteboards[sessionId!]!.whiteboard_state = input.whiteboard_state ?? null; }); wsSend(socket, { type: 'board', ...(typeof input.whiteboard_state === 'object' && input.whiteboard_state ? input.whiteboard_state as object : {}), step_id: input.step_id ?? 0, board_uid: input.board_uid ?? 0, page_id: input.page_id ?? 'page-1' }); return; } if (paused) wsSend(socket, { type: 'pause', paused: true, status: 'paused' });
  })().catch((error: unknown) => wsSend(socket, { type: 'error', message: error instanceof Error ? error.message : 'Internal error', is_complete: true })); });
}


// 深度学习：任务计划（units[].tasks[]）与步骤推进，形状对齐线上 r34
interface DeepLearnTask { task_id: string; task_title: string; task_description: string; unit_name: string }
interface DeepLearnPlan { title: string; description: string; tags: string[]; session_task_plan: Array<{ unit_name: string; tasks: Array<{ task_id: string; task_title: string; task_description: string }> }> }

function deepLearnPlan(title: string): DeepLearnPlan {
  const units = [
    { unit_name: '单位 1：基础与背景', tasks: [['1.1', '背景与动机', '弄清这一主题从哪来、解决什么问题。'], ['1.2', '核心定义', '把关键概念与符号关系讲清楚。']] },
    { unit_name: '单位 2：原理与推导', tasks: [['2.1', '主线推导', '一步步推出结论，并解释每步的理由。'], ['2.2', '常见误区', '识别典型错误与边界条件。']] },
    { unit_name: '单位 3：应用与检验', tasks: [['3.1', '实战演练', '在一个具体例子里用一遍。'], ['3.2', '自测与复盘', '用两道小题检验理解并复盘。']] },
  ];
  return {
    title,
    description: `围绕「${title}」的分布式深度学习课堂，按单元推进、每步确认。`,
    tags: ['深度学习', title.split(/[：:]/)[0] ?? title],
    session_task_plan: units.map((unit) => ({ unit_name: unit.unit_name, tasks: unit.tasks.map(([task_id, task_title, task_description]) => ({ task_id, task_title, task_description })) })),
  };
}

function deepLearnStep(plan: DeepLearnPlan | undefined, stepId: string): DeepLearnTask | undefined {
  for (const unit of plan?.session_task_plan ?? []) for (const task of unit.tasks) if (task.task_id === stepId) return { ...task, unit_name: unit.unit_name };
  return undefined;
}

function deepLearnNextStep(plan: DeepLearnPlan | undefined, stepId: string): DeepLearnTask | undefined {
  const flat: DeepLearnTask[] = (plan?.session_task_plan ?? []).flatMap((unit) => unit.tasks.map((task) => ({ ...task, unit_name: unit.unit_name })));
  const index = flat.findIndex((task) => task.task_id === stepId);
  return index >= 0 ? flat[index + 1] : flat[0];
}

async function deepLearnHandler(socket: WebSocket, request: FastifyRequest): Promise<void> { guardSocket(socket);
  const userId = acceptUser(request, socket); if (!userId) return;
  // 先把消息收下来（含客户端 open 后立刻发的那一帧），再做需要 await 的会话准备
  let ready: ((raw: unknown) => void) | undefined; const inbox: unknown[] = [];
  socket.on('message', (raw) => { if (ready) ready(raw); else inbox.push(raw); });
  const query = request.query as { session_id?: string; subtask_id?: string }; const requested = query.session_id ?? query.subtask_id; const state = await readState(); let sessionId = requested;
  // 线上形态（r34）：resumed 帧带 task_plan（units[].tasks[]）与 current_step_id；新会话给创建帧
  const session = requested ? state.deep_learn[requested] : undefined;
  if (requested && session?.user_id === userId) {
    // 老会话可能没存过计划：补一份并落库，保证前端总能拿到 units/tasks 大纲
    let plan = session.session_task_plan as DeepLearnPlan | undefined;
    if (!plan?.session_task_plan?.length) {
      plan = deepLearnPlan(String((session as { title?: string }).title ?? 'Deep learning session'));
      await updateState((next) => { const value = next.deep_learn[requested]; if (value) { value.session_task_plan = plan; value.current_step_id = plan!.session_task_plan[0]?.tasks?.[0]?.task_id ?? '1.1'; } });
    }
    wsSend(socket, { type: 'deep_learn_session_resumed', session_id: requested, message: '♻️  Deep learning session resumed', current_step_id: String(session.current_step_id ?? plan.session_task_plan[0]?.tasks?.[0]?.task_id ?? '1.1'), task_plan: plan });
  }
  else { sessionId = randomUUID(); const plan = deepLearnPlan(String(session?.title ?? query.subtask_id ?? 'Deep learning session')); await updateState((next) => { next.deep_learn[sessionId!] = { deep_learn_session_id: sessionId, user_id: userId, title: plan.title, session_task_plan: plan, current_step_id: plan.session_task_plan[0]?.tasks?.[0]?.task_id ?? '1.1', conversation_data: { history: [], progress: {} }, created_at: now() }; }); wsSend(socket, { type: 'deep_learn_session_created', session_id: sessionId, task_plan: plan, current_step_id: plan.session_task_plan[0]?.tasks?.[0]?.task_id ?? '1.1' }); }
  const onMessage = (raw: unknown): void => { const input = parseMessage(raw); if (!input) return; void (async () => {
    if (input.type === 'ping') { wsSend(socket, { type: 'pong', t: input.t }); return; }
    // 步骤确认（线上 step_completion 带 requires_acknowledgment，客户端回执后进入下一步）
    if (input.type === 'step_acknowledged' || input.type === 'acknowledge_step' || input.type === 'next_step') {
      const current = (await readState()).deep_learn[sessionId ?? ''] ?? {};
      const next = deepLearnNextStep(current.session_task_plan as DeepLearnPlan | undefined, String(current.current_step_id ?? ''));
      // 只推进指针：下一步的讲解由下一轮 user_message 触发，别在这里连环弹 step_completion
      if (next) { await updateState((state2) => { const value = state2.deep_learn[sessionId!]; if (value) value.current_step_id = next.task_id; }); }
      return;
    }
    if (input.type !== 'user_message') return;
    const message = typeof input.message === 'string' ? input.message : typeof input.text === 'string' ? input.text : '';
    const stepId = typeof input.step_id === 'string' ? input.step_id : String((await readState()).deep_learn[sessionId ?? '']?.current_step_id ?? '1.1');
    const eff = await effFor(userId);
    wsSend(socket, { type: 'thinking', session_id: sessionId, is_complete: false });
    wsSend(socket, { type: 'thinking_chunk', session_id: sessionId, tool_name: 'directorAgent', tool_status: 'streaming', round_index: 1, chunk: 'I will explain the core idea and keep it to this step.' });
    wsSend(socket, { type: 'tool_execution', tool_name: 'directorAgent', tool_status: 'completed', display: 'display', round_index: 1, data: { phase: 'thinking', thought_chunk_count: 1 }, is_complete: false });
    const step = deepLearnStep((await readState()).deep_learn[sessionId ?? '']?.session_task_plan as DeepLearnPlan | undefined, stepId);
    wsSend(socket, { type: 'tool_selection', tool_name: 'generate_content', tool_status: 'started', display: 'display', round_index: 1, index: 0, is_complete: false, task_title: step?.task_title ?? '本节内容', model_name: eff.provider === 'stub' ? 'stub' : eff.models.content });
    const answer = eff.provider === 'stub'
      ? await stubValue<string>('board_brief')
      : await chat([{ role: 'system', content: 'You are a patient tutor inside a deep-learning session. Answer within the current step, concise and concrete.' }, { role: 'user', content: `${message}\n(step: ${step?.task_title ?? stepId})` }], 'content', eff);
    for (const chunk of answer.match(/[\s\S]{1,120}/g) ?? [answer]) wsSend(socket, { type: 'content_chunk', tool_name: 'generate_content', tool_status: 'streaming', round_index: 1, chunk, display: 'display', is_complete: false });
    wsSend(socket, { type: 'tool_execution', tool_name: 'generate_content', tool_status: 'completed', display: 'display', round_index: 1, data: { content: answer, task_title: step?.task_title }, is_complete: false });
    // 图解：复用 /api/v1/diagram/:id/* 路由，tag 形态与线上一致（data-* 属性）
    const diagramId = randomUUID().replaceAll('-', '').slice(0, 8);
    const placeholderId = `dg_${hash32(Buffer.from(diagramId)).slice(0, 12)}`;
    diagrams.set(diagramId, { md: `# ${step?.task_title ?? '图解'}\n\n${answer.slice(0, 400)}`, html: `<html><body><h1>${step?.task_title ?? '图解'}</h1></body></html>` });
    const fileUrl = `/api/v1/diagram/${diagramId}/diagram.png`;
    wsSend(socket, {
      type: 'inline_diagram', tool_name: 'generate_content', tool_status: 'ready', placeholder_id: placeholderId,
      data: {
        placeholder_id: placeholderId, type: 'gemini_image', layout: 'right', status: 'ready',
        tag: `<diagram data-placeholder-id="${placeholderId}" data-subtype="gemini_image" data-layout="right" data-status="ready" data-diagram-id="${diagramId}" data-file-url="${fileUrl}" data-caption="${step?.task_title ?? ''}"></diagram>`,
        source_tag: `<content-type: diagram; diagram-subtype: gemini-image; content-prompt: {${(step?.task_description ?? message).slice(0, 220)}}; content-caption: {${step?.task_title ?? ''}}>`,
      },
    });
    await updateState((state2) => { const value = state2.deep_learn[sessionId!]; if (value) value.conversation_data = { history: [...((value.conversation_data as { history?: unknown[] } | undefined)?.history ?? []), { role: 'user', content: message, step_id: stepId }], progress: {} }; });
    wsSend(socket, { type: 'step_completion', tool_name: 'manage_task_progress', message: 'Ready to mark this step complete', step_data: step, next_step: deepLearnNextStep((await readState()).deep_learn[sessionId ?? '']?.session_task_plan as DeepLearnPlan | undefined, stepId), requires_acknowledgment: true, is_complete: false, conversation_id: sessionId });
    wsSend(socket, { type: 'complete', is_complete: true, conversation_id: sessionId, tts_pending: false });
  })().catch((error: unknown) => wsSend(socket, { type: 'error', message: error instanceof Error ? error.message : 'Internal error', is_complete: true })); };
  ready = onMessage; while (inbox.length) onMessage(inbox.shift());
}

function driveHandler(socket: WebSocket, request: FastifyRequest): void { guardSocket(socket); if (!acceptUser(request, socket)) return; wsSend(socket, { type: 'connection_established' }); socket.on('message', (raw) => { const input = parseMessage(raw); if (input?.type === 'ping') wsSend(socket, { type: 'pong', t: input.t }); else if (input) wsSend(socket, { type: 'drive_state_synced', ok: true }); }); }
function netCheckHandler(socket: WebSocket): void { guardSocket(socket); wsSend(socket, { type: 'net_check_session', session_id: randomUUID() }); socket.on('message', (raw) => { const input = parseMessage(raw); if (!input) return; if (input.type === 'ping') wsSend(socket, { type: 'pong', t: input.t }); else if (input.type === 'model_probe' || input.type === 'net_check_model') wsSend(socket, { type: 'net_check_model', ok: true, ttft_ms: 0 }); else if (input.type === 'net_check_recovered') wsSend(socket, { type: 'net_check_recovered', ok: true }); else if (input.type === 'net_check_degraded') wsSend(socket, { type: 'net_check_degraded', ok: false }); else if (input.type?.startsWith('net_check_')) wsSend(socket, { type: input.type, ok: true }); }); }

function courseHandler(socket: WebSocket, request: FastifyRequest): void { guardSocket(socket);
  const userId = acceptUser(request, socket); if (!userId) return; wsSend(socket, { type: 'connection_established', message: 'Course generation connected' });
  // 任务在服务端自己跑，socket 只负责 attach / 订阅：断开不再中断生成，重连能拿到完整回放。
  let attached: { taskId: string; detach: () => void } | undefined;
  const detach = (): void => { attached?.detach(); attached = undefined; };
  const attachTo = (taskId: string): void => {
    detach();
    attached = { taskId, detach: attachTask(taskId, (frame) => wsSend(socket, frame)) };
  };
  socket.on('close', detach);
  socket.on('message', (raw) => { const input = parseMessage(raw); if (!input) { wsSend(socket, { type: 'error', message: 'Invalid JSON', is_complete: true }); return; } void (async () => {
    if (input.type === 'ping') { wsSend(socket, { type: 'pong', t: input.t }); return; }
    if (input.type === 'start_course_generation' || input.type === 'resume_course_generation' || input.type === 'start_course_update') {
      const query = typeof input.query === 'string' && input.query ? input.query : 'New course';
      const requested = typeof input.course_uuid === 'string' ? input.course_uuid : undefined;
      const active = findActiveTask({ userId, ...(requested ? { courseUuid: requested } : {}) });
      if (input.type !== 'start_course_generation' && active) { attachTo(active.task_id); return; }
      const courseUuid = requested ?? randomUUID();
      // 同一用户已有别的课程在生成：不重复起任务，把忙状态与可重试时间给客户端（线上同语义）
      const busy = busyFor(userId, courseUuid);
      if (busy && input.type === 'start_course_generation') {
        wsSend(socket, { type: 'course_generation_busy', message: '生成可能仍在其他窗口进行中', course_uuid: busy.task.course_uuid, retry_after_ms: busy.retry_after_ms, is_complete: false });
        return;
      }
      const task = await startCourseTask({ userId, courseUuid, query, eff: await effFor(userId), conversationId: typeof input.conversation_id === 'string' ? input.conversation_id : undefined });
      attachTo(task.task_id);
      return;
    }
    if (input.type === 'course_generation_answer_draft') {
      const taskId = attached?.taskId ?? findActiveTask({ userId })?.task_id;
      if (taskId) await recordAnswerDraft(taskId, { question: typeof input.question === 'string' ? input.question : undefined, answer: typeof input.answer === 'string' ? input.answer : undefined });
      return;
    }
    if (input.type === 'course_generation_answers') {
      const answers = Array.isArray(input.answers) ? input.answers as Array<{ question: string; answer: string }> : [];
      const taskId = attached?.taskId ?? findActiveTask({ userId })?.task_id;
      if (taskId) { await submitTaskAnswers(taskId, answers, await effFor(userId)); attachTo(taskId); }
      else wsSend(socket, { type: 'error', message: 'No active course generation task', is_complete: true });
      return;
    }
    if (input.type === 'course_structure_confirm' || input.type === 'course_update_confirm' || input.type === 'course_update_feedback') {
      const taskId = attached?.taskId ?? findActiveTask({ userId })?.task_id;
      if (taskId) attachTo(taskId);
      return;
    }
    if (input.type === 'stop_course_generation' || input.type === 'course_update_stop' || input.type === 'stop_course_update') {
      const task = attached?.taskId ? getTask(attached.taskId) : findActiveTask({ userId });
      if (task) { detach(); await stopCourseTask(task.task_id); }
      wsSend(socket, { type: 'course_generation_stopped', course_uuid: task?.course_uuid ?? null, is_complete: true });
    }
  })().catch((error: unknown) => wsSend(socket, { type: 'error', message: error instanceof Error ? error.message : 'Internal error', is_complete: true })); });
}

function pdfHandler(socket: WebSocket, request: FastifyRequest): void { guardSocket(socket);
  const userId = acceptUser(request, socket); if (!userId) return; const effP = effFor(userId); wsSend(socket, { type: 'connection_established' }); let sessionId: string | undefined; let speed = 1; let voiceId = 'firm'; let audioBuffer = '';
  socket.on('message', (raw) => { const input = parseMessage(raw); if (!input) { wsSend(socket, { type: 'error', message: 'Invalid JSON', is_complete: true }); return; } void (async () => {
    if (input.type === 'ping') { wsSend(socket, { type: 'pong', t: input.t }); return; }
    if (input.type === 'resume_session' || input.type === 'start_session' || input.type === 'resume_or_start_course_session') {
      sessionId = typeof input.session_id === 'string' ? input.session_id : randomUUID();
      await updateState((next) => { next.whiteboards[sessionId!] ??= { session_id: sessionId, user_id: userId, status: 'active', messages: [], pdf_state: { revision: 0, file_id: null, annotations: [] }, board_state: null, created_at: now() }; });
      const session = (await readState()).whiteboards[sessionId]!;
      // 线上形状：pdf_state{revision,file_id,annotations[]} + board_state + course_state
      const pdfState = (session.pdf_state as Record<string, unknown> | null) ?? { revision: 0, file_id: session.pdf_file_id ?? null, annotations: [] };
      wsSend(socket, {
        type: 'session_ready', session_id: sessionId, resumed: Boolean(input.session_id), status: session.status ?? 'active', session: false,
        messages: session.messages ?? [],
        pdf_state: { revision: Number(pdfState.revision ?? 0), file_id: pdfState.file_id ?? session.pdf_file_id ?? null, annotations: (pdfState.annotations as unknown[]) ?? [] },
        board_state: session.board_state ?? null,
        course_state: session.lecture_outline_id ? { course_session_id: session.lecture_outline_id, course_session: null } : null,
      });
      return;
    }
    if (input.type === 'set_tts_config') { speed = typeof input.speed === 'number' ? Math.max(0.5, Math.min(2, input.speed)) : speed; voiceId = typeof input.voice_id === 'string' ? input.voice_id : voiceId; wsSend(socket, { type: 'tts_config', voice_id: voiceId, speed }); return; }
    if (input.type === 'sync_pdf_state' && sessionId) { const pdfState = input.pdf_state ?? input.sync_pdf_state ?? null; await updateState((next) => { const previous = (next.whiteboards[sessionId!]!.pdf_state ?? {}) as Record<string, unknown>; const incoming = (typeof pdfState === 'object' && pdfState ? pdfState as Record<string, unknown> : {}); Object.assign(next.whiteboards[sessionId!]!, { pdf_state: { revision: Number(incoming.revision ?? (Number(previous.revision ?? 0) + 1)), file_id: incoming.file_id ?? previous.file_id ?? null, annotations: incoming.annotations ?? previous.annotations ?? [] }, board_state: input.board_state ?? null, pdf_file_id: incoming.file_id ?? next.whiteboards[sessionId!]!.pdf_file_id }); }); wsSend(socket, { type: 'pdf_state_synced', ok: true, session_id: sessionId, pdf_state: pdfState }); return; }
    if (input.type === 'start_teaching') { if (!sessionId || !(await readState()).whiteboards[sessionId]?.pdf_file_id) { wsSend(socket, { type: 'error', message: 'No PDF uploaded. Please upload a PDF first.', is_complete: true }); return; }
      // 课件讲解用「页摘录」当插图：来源是页面本身，不调图像模型（线上 source="reference_page" 的同义）
      const pageBody = JSON.stringify((await readState()).whiteboards[sessionId]?.pdf_state ?? '').slice(0, 600);
      const pageAction = normalizeImageAction({ source: 'reference_page', caption: '本页要点', reference_name: '课件页', page_index: 0 }, { topic: '课件页', language: 'Chinese' });
      void emitImageGeneration(socket, pageAction, 'page-1', 0, await effFor(userId), undefined, pageBody);
      // 真实音频：与线上同路径前缀（/api/v1/pdf-annotation/audio-stream/...），TTS 走 BYOK seam，缺失时给占位 webm
      const pdfAudio = async (step: number, text: string): Promise<string> => {
        const segment = await synthesize(text, { voice: voiceId, speed, eff: await effFor(userId) });
        if (segment.stub || !segment.url) {
          // stub：落一个占位片段到白板目录，再用 pdf 前缀回源（路由会回退到那里）
          const name = audioFileName(userId, sessionId!, step, text, 'webm');
          const url = await writeTtsAudio(userId, sessionId!, name, placeholderWebm);
          return url.replace('/api/v1/whiteboard/audio-stream', '/api/v1/pdf-annotation/audio-stream');
        }
        return `/api/v1/pdf-annotation/audio-stream/${userId}/${sessionId}/${segment.url.split('/').pop()}`;
      };
      const steps: Array<{ kind: 'speak' | 'annotation' | 'ask'; say: string; text?: string }> = [
        { kind: 'speak', say: 'Let’s begin with the key idea on this page.' },
        { kind: 'annotation', text: 'Key idea', say: 'This highlighted phrase is the key idea.' },
      ];
      let page = 0; let step = 0;
      for (const item of steps) {
        const url = await pdfAudio(step, item.say);
        if (item.kind === 'speak') wsSend(socket, { type: 'speak', page_index: page, step_id: step, say: item.say, tts_url: url });
        else wsSend(socket, { type: 'annotation', annotation_type: 'highlight', page_index: page, step_id: step, ann_id: randomUUID().replaceAll('-', ''), text: item.text, say: item.say, tts_url: url });
        step += 1;
      }
      wsSend(socket, { type: 'ask', step_id: step, page_index: page, mode: 'open', question: 'What is the key idea on this page?' });
      wsSend(socket, { type: 'mark_response_complete', step_id: step + 1 });
      wsSend(socket, { type: 'done', step_id: step + 2 });
      return;
    }
    if (input.type === 'interject_start') { if (!sessionId) sessionId = randomUUID(); wsSend(socket, { type: 'interject_ready', interject_id: randomUUID().replaceAll('-', '').slice(0, 12), mode: 'cascade' }); return; } if (input.type === 'interject_audio_chunk') { audioBuffer += typeof input.audio_b64 === 'string' ? input.audio_b64 : ''; return; } if (input.type === 'interject_audio_end') { const hadAudio = Boolean(audioBuffer); audioBuffer = ''; if (sessionId) await cascade(socket, userId, sessionId, 'Please acknowledge this voice question.', voiceId, speed, hadAudio, '/api/v1/pdf-annotation/audio-stream'); return; } if (input.type === 'interject_question') { if (sessionId) await cascade(socket, userId, sessionId, typeof input.text === 'string' ? input.text : 'Please clarify this PDF.', voiceId, speed, typeof input.audio_b64 === 'string' || typeof input.mime === 'string', '/api/v1/pdf-annotation/audio-stream'); return; }
    if (input.type === 'action_step_received' || input.type === 'action_step_complete' || input.type === 'user_continue') return; if (input.type === 'navigate_page') { wsSend(socket, { type: 'go_to_page', page: input.page ?? 0, step_id: 0 }); return; }
    if (input.type === 'model_probe') { const started = performance.now(); wsSend(socket, { type: 'model_probe_started' }); try { const text = await chat([{ role: 'user', content: 'Confirm connectivity briefly.' }], 'tts', await effP); const ttft_ms = Math.round(performance.now() - started); wsSend(socket, { type: 'model_probe_result', ok: true, verdict: 'ok_no_context', ttft_ms, text, minimal: { ok: true, ttft_ms, text, error: null } }); } catch { wsSend(socket, { type: 'model_probe_result', ok: false, verdict: 'error', ttft_ms: Math.round(performance.now() - started) }); } }
  })().catch((error: unknown) => wsSend(socket, { type: 'error', message: error instanceof Error ? error.message : 'Internal error', is_complete: true })); });
}

export async function registerWebsocketRoutes(app: FastifyInstance): Promise<void> {
  app.get('/api/v1/ws', { websocket: true }, chatHandler); app.get('/ws', { websocket: true }, chatHandler); app.get('/api/v1/whiteboard/ws', { websocket: true }, whiteboardHandler); app.get('/api/v1/pdf-annotation/ws', { websocket: true }, pdfHandler); app.get('/api/v1/course-generation/ws', { websocket: true }, courseHandler); app.get('/api/v1/course-generation/update', { websocket: true }, courseHandler); app.get('/api/v1/deep_learn/ws', { websocket: true }, deepLearnHandler); app.get('/api/v1/drive/ws', { websocket: true }, driveHandler); app.get('/api/v1/net-check/ws', { websocket: true }, netCheckHandler);
}
