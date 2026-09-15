/** Leftover whiteboard teaching dump player: stored frames only. */

import { chalkMath } from "./pdf.mjs";
import { chalkboardAnimation, chalkboardImage, sceneForTopic } from "./media.mjs";
import { WB_SESSIONS } from "./whiteboard-catalog.mjs";
import { readFile, searchFiles, stripAssistPrefix, teachingExcerpt } from "./kb.mjs";

export const WB_STORAGE = "whiteboard_session_id";

export const WB = Object.freeze({
  pause: "暂停",
  resume: "继续",
  restarted: "旧会话不可用，已开启新会话。",
  resumedConversation: "已恢复对话，请在右侧输入你的问题以继续讲解。",
  sessionTitleFallback: "白板学习节",
  loadFailed: "白板加载失败",
  sendToContinue: "输入消息继续教学…",
  askPlaceholder: "输入问题...",
  completeNotice: "本节课程内容已讲完。你可以进入下一课，或者退出当前课程。",
  conversationTitle: "对话记录",
  circle: "圈注",
  highlight: "高亮",
  image: "配图",
  animation: "互动动画",
});

const PLAY = new Set(["session_ready", "board", "speak", "ask", "done", "circle", "highlight", "user"]);
const SKIP = new Set([
  "connection_established",
  "tts_segment",
  "tts_config",
  "lecture_outline_selected",
  "new_column",
  "new_page",
  "interject_start",
  "interject_ready",
  "interject_text",
  "interject_audio",
  "interject_done",
  "interject_question",
]);

function isMark(text) {
  return /hyperknow|orbie/i.test(String(text || ""));
}

function stripGuest(text) {
  return String(text || "")
    .replace(/^hello[, ]+rk\d+!?\s*/i, "")
    .trim();
}

function flattenFrames(raw) {
  const rows = Array.isArray(raw) ? raw : raw.frames || raw.events || [];
  const out = [];
  for (const row of rows) {
    if (row?.type === "group" && Array.isArray(row.actions)) {
      out.push(...row.actions);
    } else {
      out.push(row);
    }
  }
  return out;
}

const generatedBoards = new Map();

function findLeftover(id, leftovers) {
  const key = String(id || "").trim();
  return (Array.isArray(leftovers) ? leftovers : []).find(
    (row) => row.id === key || (row.aliases || []).includes(key),
  );
}

export function craftedWhiteboardId(id = "") {
  return /^wb_/.test(String(id || "").trim());
}

export function registerWhiteboardSession(raw = {}) {
  const id = String(raw.id || raw.sessionId || "").trim();
  if (!id) return raw;
  const session = { ...raw, id };
  generatedBoards.set(id, session);
  return session;
}

export function hasCraftedWhiteboard(id = "") {
  return generatedBoards.has(String(id || "").trim());
}

export function craftWhiteboardSession({ topic = "", drive = null } = {}) {
  const subject = stripAssistPrefix(topic).slice(0, 80) || "这一节";
  const hits = searchFiles(drive, topic || subject);
  const file = hits[0] ? readFile(drive, hits[0].id) : { ok: false };
  const excerpt = file.ok ? teachingExcerpt(file.text, 420) : "";
  const basedOn = file.ok ? String(file.filename || "") : "";
  const id = `wb_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
  const caption = (excerpt || subject).slice(0, 96);
  const session = {
    id,
    title: subject,
    basedOn,
    frames: [
      { type: "session_ready", session_id: id, session_title: subject, resumed: false },
      {
        type: "board",
        title: subject,
        board_content: basedOn
          ? `${subject}\n\n根据公开教材《${basedOn}》\n\n${excerpt}`
          : `${subject}\n\n先画出工作图像，再说机制。`,
        page_id: "page-1",
        step_id: 0,
      },
      {
        type: "speak",
        spoken_text: basedOn
          ? `根据公开教材《${basedOn}》来讲「${subject}」。先定义，再机制，再用一个例子自检。`
          : `我们从「${subject}」的工作图像讲起。`,
        step_id: 1,
      },
      { type: "generated_image", caption, page_id: "page-1", step_id: 2 },
      {
        type: "generated_animation",
        caption: subject,
        scene: sceneForTopic(subject),
        page_id: "page-1",
        step_id: 3,
      },
      { type: "ask", question: `用自己的话：${subject} 要解释的现象是什么？`, step_id: 4 },
      { type: "done", step_id: 5 },
    ],
  };
  return registerWhiteboardSession(session);
}

export function followUpWhiteboardSession({ id = "", question = "", drive = null } = {}) {
  const key = String(id || "").trim();
  if (!craftedWhiteboardId(key)) {
    const err = new Error("whiteboard session not found");
    err.code = "NOT_FOUND";
    throw err;
  }
  const session = generatedBoards.get(key);
  if (!session) {
    const err = new Error("whiteboard session not found");
    err.code = "NOT_FOUND";
    throw err;
  }
  const q = String(question || "").trim();
  if (!q) throw new Error("question required");
  const hits = searchFiles(drive, `${session.title || ""} ${q}`);
  const file = hits[0] ? readFile(drive, hits[0].id) : { ok: false };
  const excerpt = file.ok ? teachingExcerpt(file.text, 280) : "";
  const basedOn = file.ok ? String(file.filename || "") : session.basedOn || "";
  const frames = (session.frames || []).filter((f) => f.type !== "done");
  const step = frames.length;
  frames.push(
    { type: "user", text: q, step_id: step },
    {
      type: "board",
      title: q.slice(0, 48),
      board_content: basedOn
        ? `${q}\n\n根据公开教材《${basedOn}》\n\n${excerpt}`
        : `${q}\n\n先抓住定义，再看机制。`,
      page_id: "page-1",
      step_id: step + 1,
    },
    {
      type: "speak",
      spoken_text: excerpt
        ? `针对「${q}」，教材《${basedOn}》说：${excerpt.slice(0, 200)}`
        : `我们继续看「${q}」。`,
      step_id: step + 2,
    },
    {
      type: "ask",
      question: `这一点讲清了吗？再问一个关于「${stripAssistPrefix(q).slice(0, 24) || q}」的问题。`,
      step_id: step + 3,
    },
    { type: "done", step_id: step + 4 },
  );
  return registerWhiteboardSession({
    ...session,
    id: key,
    frames,
    basedOn: basedOn || session.basedOn || "",
  });
}

function findBoard(id, leftovers) {
  return findLeftover(id, leftovers) || generatedBoards.get(String(id || "").trim()) || null;
}

export function parseWhiteboardReplay(raw = {}) {
  const frames = [];
  for (const row of flattenFrames(raw)) {
    const type = row?.type;
    if (!type || SKIP.has(type)) continue;
    if (type === "generated_image" || type === "image_gen_pending") {
      const caption = String(row.caption || row.alt || "").trim();
      if (isMark(caption) || isMark(row.image_url || row.src || "")) continue;
      const art = chalkboardImage({ topic: caption, caption, alt: caption });
      frames.push({
        type: "image",
        pending: type === "image_gen_pending",
        caption,
        display: chalkMath(caption),
        svg: art.svg,
        pageId: String(row.page_id || row.pageId || "page-1"),
        stepId: row.step_id ?? row.stepId,
      });
      continue;
    }
    if (type === "generated_animation" || type === "animation_pending") {
      const caption = String(row.caption || row.title || "").trim();
      if (isMark(caption)) continue;
      const art = chalkboardAnimation({ topic: caption, caption, scene: row.scene });
      frames.push({
        type: "animation",
        pending: type === "animation_pending",
        caption,
        display: chalkMath(caption),
        svg: art.svg,
        scene: art.scene,
        beats: art.beats,
        pageId: String(row.page_id || row.pageId || "page-1"),
        stepId: row.step_id ?? row.stepId,
      });
      continue;
    }
    if (!PLAY.has(type)) continue;
    if (type === "session_ready") {
      frames.push({
        type,
        sessionId: String(row.session_id || row.sessionId || ""),
        resumed: Boolean(row.resumed),
        title: String(row.session_title || row.sessionTitle || "").trim(),
      });
      continue;
    }
    if (type === "board") {
      const content = String(row.board_content || row.content || "").trim();
      const title = String(row.title || "").trim();
      if (!content && !title) continue;
      if (isMark(content) || isMark(title)) continue;
      frames.push({
        type,
        title,
        content,
        display: chalkMath(content),
        pageId: String(row.page_id || row.pageId || "page-1"),
        stepId: row.step_id ?? row.stepId,
      });
      continue;
    }
    if (type === "speak") {
      const say = stripGuest(row.say || row.spoken_text || row.spokenText || row.text || "");
      if (!say || isMark(say)) continue;
      frames.push({
        type,
        say,
        display: chalkMath(say),
        stepId: row.step_id ?? row.stepId,
      });
      continue;
    }
    if (type === "user") {
      const text = String(row.text || row.say || "").trim();
      if (!text || isMark(text)) continue;
      frames.push({
        type: "user",
        text,
        display: chalkMath(text),
        stepId: row.step_id ?? row.stepId,
      });
      continue;
    }
    if (type === "ask") {
      const question = stripGuest(row.question || "");
      if (!question || isMark(question)) continue;
      frames.push({
        type,
        question,
        display: chalkMath(question),
        stepId: row.step_id ?? row.stepId,
      });
      continue;
    }
    if (type === "circle" || type === "highlight") {
      const snippet = String(row.snippet || row.text || row.say || "").trim();
      if (isMark(snippet)) continue;
      frames.push({
        type,
        kind: type,
        snippet,
        display: chalkMath(snippet),
        stepId: row.step_id ?? row.stepId,
      });
      continue;
    }
    if (type === "done") {
      frames.push({ type, stepId: row.step_id ?? row.stepId });
    }
  }
  const ready = frames.find((f) => f.type === "session_ready");
  const boards = frames.filter((f) => f.type === "board" || f.type === "image" || f.type === "animation");
  return {
    id: String(raw.id || raw.sessionId || ready?.sessionId || ""),
    title: String(raw.title || ready?.title || "").trim() || WB.sessionTitleFallback,
    resumed: Boolean(raw.resumed || ready?.resumed),
    frames,
    boards,
  };
}

export function whiteboardSessionState({
  id = "",
  leftovers = WB_SESSIONS,
  paused = false,
  notes = [],
} = {}) {
  const key = String(id || "").trim();
  if (!key) {
    return {
      ok: false,
      empty: true,
      restarted: false,
      resumed: false,
      paused: false,
      title: WB.sessionTitleFallback,
      body: WB.loadFailed,
      frames: [],
      boards: [],
      transcript: [],
      notes: [],
    };
  }
  const found = findBoard(key, leftovers);
  if (!found && craftedWhiteboardId(key)) {
    return {
      ok: false,
      empty: true,
      restarted: false,
      resumed: false,
      paused: Boolean(paused),
      title: WB.sessionTitleFallback,
      body: WB.loadFailed,
      sessionId: key,
      frames: [],
      boards: [],
      transcript: [],
      notes: Array.isArray(notes) ? notes : [],
    };
  }
  const restarted = !found;
  const raw = found || leftovers[0] || { frames: [] };
  const parsed = parseWhiteboardReplay(raw);
  const transcript = parsed.frames.filter(
    (f) =>
      f.type === "speak" ||
      f.type === "ask" ||
      f.type === "user" ||
      f.type === "circle" ||
      f.type === "highlight" ||
      f.type === "image" ||
      f.type === "animation",
  );
  const ask = [...parsed.frames].reverse().find((f) => f.type === "ask") || null;
  const done = parsed.frames.some((f) => f.type === "done");
  const textBoards = parsed.frames.filter((f) => f.type === "board");
  const latestBoard = [...textBoards].pop() || [...parsed.boards].pop() || null;
  const latestInk = [...parsed.boards].pop() || null;
  const formula = Boolean(
    parsed.boards.some((b) => /a\^2 \+ b\^2 = c\^2|a² \+ b² = c²/.test(`${b.content || ""}\n${b.display || ""}`)),
  );
  return {
    ok: true,
    empty: parsed.boards.length === 0 && transcript.length === 0,
    restarted,
    resumed: Boolean(parsed.resumed),
    paused: Boolean(paused),
    title: parsed.title,
    sessionId: parsed.id || key,
    frames: parsed.frames,
    boards: parsed.boards,
    latestBoard,
    latestInk,
    formula,
    transcript,
    ask,
    done,
    notes: Array.isArray(notes) ? notes : [],
  };
}

export function hasWhiteboardLeftover(id, leftovers = WB_SESSIONS) {
  return Boolean(findLeftover(id, leftovers));
}

export { chalkMath };
