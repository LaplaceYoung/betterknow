/** Leftover PDF SplitLayout player: stored frames only. Crafted pdf_* 导读 from uploads. */

import { PDF_SESSIONS } from "./pdf-catalog.mjs";
import { stripAssistPrefix, teachingExcerpt } from "./kb.mjs";

export const PDF = Object.freeze({
  pause: "暂停",
  resume: "继续",
  restarted: "旧会话不可用，已开启新会话。",
  resumedConversation: "已恢复对话，请在右侧输入你的问题以继续讲解。",
  sessionTitleFallback: "PDF 学习节",
  highlight: "高亮",
  circle: "圈注",
  annotate: "批注",
  loadFailed: "PDF 加载失败",
  loadingDocument: "正在加载 PDF…",
  sendToContinue: "输入消息继续教学…",
  askPlaceholder: "输入问题...",
  completeNotice: "本节课程内容已讲完。你可以进入下一课，或者退出当前课程。",
  conversationTitle: "对话记录",
  pageAbbrev: "第{{page}}页",
});

const PLAY = new Set(["session_ready", "sync_pdf_state", "go_to_page", "speak", "annotation", "ask", "done", "user"]);
const KINDS = new Set(["highlight", "circle", "annotate"]);

function isMark(text) {
  return /hyperknow|orbie/i.test(String(text || ""));
}

function stripGuest(text) {
  return String(text || "")
    .replace(/^hi[, ]+rk\d+!?\s*/i, "")
    .replace(/^hello[, ]+rk\d+!?\s*/i, "")
    .trim();
}

export function chalkMath(text) {
  return String(text || "")
    .replace(/\$\$([^$]+)\$\$/g, "$1")
    .replace(/\$([^$]+)\$/g, "$1")
    .replace(/\^2/g, "²")
    .replace(/<[^>]+>/g, " ")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^[-*]\s+/gm, "")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function normalizeRect(rect) {
  if (!rect || typeof rect !== "object") return null;
  const x = Number(rect.x);
  const y = Number(rect.y);
  const w = Number(rect.w ?? rect.width);
  const h = Number(rect.h ?? rect.height);
  if (![x, y, w, h].every((n) => Number.isFinite(n))) return null;
  return {
    x: Math.min(Math.max(x, 0), 1),
    y: Math.min(Math.max(y, 0), 1),
    w: Math.min(Math.max(w, 0.02), 1),
    h: Math.min(Math.max(h, 0.018), 1),
  };
}

function findLeftover(id, leftovers) {
  const key = String(id || "").trim();
  return (Array.isArray(leftovers) ? leftovers : []).find(
    (row) => row.id === key || (row.aliases || []).includes(key),
  );
}

export function parsePdfReplay(raw = {}) {
  const framesIn = Array.isArray(raw) ? raw : raw.frames || raw.events || [];
  const frames = [];
  for (const row of framesIn) {
    const type = row?.type;
    if (!PLAY.has(type)) continue;
    if (type === "session_ready") {
      frames.push({
        type,
        sessionId: String(row.session_id || row.sessionId || ""),
        resumed: Boolean(row.resumed),
      });
      continue;
    }
    if (type === "sync_pdf_state") {
      const pdfState = row.pdf_state || row.pdfState || {};
      frames.push({
        type,
        fileId: String(pdfState.file_id || pdfState.fileId || ""),
        revision: Number(pdfState.revision) || 0,
      });
      continue;
    }
    if (type === "go_to_page") {
      frames.push({ type, page: Number(row.page) || 1, stepId: row.step_id ?? row.stepId });
      continue;
    }
    if (type === "speak") {
      const say = stripGuest(row.say || row.spoken_text || row.spokenText || row.text || "");
      if (!say || isMark(say)) continue;
      frames.push({
        type,
        say,
        display: chalkMath(say),
        page: (row.page_index ?? row.pageIndex ?? 0) + 1,
        stepId: row.step_id ?? row.stepId,
      });
      continue;
    }
    if (type === "annotation") {
      const kindRaw = String(row.annotation_type || row.kind || "annotate");
      const kind = KINDS.has(kindRaw) ? kindRaw : "annotate";
      const say = String(row.say || "").trim();
      const text = String(row.text || row.keyword || "").trim();
      const content = String(row.content || "").trim();
      if (isMark(say) || isMark(text) || isMark(content)) continue;
      frames.push({
        type,
        kind,
        text,
        say,
        content,
        display: chalkMath(say || text),
        rect: normalizeRect(row.rect),
        page: (row.page_index ?? row.pageIndex ?? 0) + 1,
        stepId: row.step_id ?? row.stepId,
      });
      continue;
    }
    if (type === "user") {
      const text = String(row.text || row.say || "").trim();
      if (!text || isMark(text)) continue;
      frames.push({
        type,
        text,
        display: chalkMath(text),
        page: (row.page_index ?? row.pageIndex ?? 0) + 1,
        stepId: row.step_id ?? row.stepId,
      });
      continue;
    }
    if (type === "ask") {
      const question = String(row.question || "").trim();
      if (!question || isMark(question)) continue;
      frames.push({
        type,
        question,
        display: chalkMath(question),
        mode: row.mode || "open",
        page: (row.page_index ?? row.pageIndex ?? 0) + 1,
        stepId: row.step_id ?? row.stepId,
      });
      continue;
    }
    if (type === "done") {
      frames.push({ type, stepId: row.step_id ?? row.stepId });
    }
  }
  const ready = frames.find((f) => f.type === "session_ready");
  const pageFrame = [...frames].reverse().find((f) => f.type === "go_to_page");
  return {
    id: String(raw.id || raw.sessionId || ready?.sessionId || ""),
    title: String(raw.title || "").trim() || PDF.sessionTitleFallback,
    filename: String(raw.filename || "").trim(),
    resumed: Boolean(raw.resumed || ready?.resumed),
    page: pageFrame?.page || 1,
    frames,
    ink: Array.isArray(raw.ink) ? raw.ink : [],
  };
}

const generatedPdfs = new Map();

export function craftedPdfId(id = "") {
  return /^pdf_/.test(String(id || "").trim());
}

export function registerPdfSession(raw = {}) {
  const id = String(raw.id || raw.sessionId || "").trim();
  if (!id) return raw;
  const session = { ...raw, id };
  generatedPdfs.set(id, session);
  return session;
}

export function hasCraftedPdf(id = "") {
  return generatedPdfs.has(String(id || "").trim());
}

function pagesFromUpload(text = "", name = "") {
  const excerpt = teachingExcerpt(text, 1800);
  const parts = excerpt
    .split(/\n{2,}|(?<=[。])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 28)
    .slice(0, 6);
  const n = Math.min(3, Math.max(1, parts.length));
  const size = Math.ceil(parts.length / n) || 1;
  const chunks = [];
  for (let i = 0; i < n; i += 1) {
    const slice = parts.slice(i * size, (i + 1) * size);
    if (!slice.length) continue;
    chunks.push({
      page: i + 1,
      body: slice.join(" "),
      lead: slice[0].slice(0, 140),
    });
  }
  if (!chunks.length) {
    const body = excerpt || name || "这份材料";
    chunks.push({ page: 1, body, lead: body.slice(0, 140) });
  }
  return chunks;
}

export function craftPdfGuideSession({ topic = "", sourceText = "", sourceName = "", files = [] } = {}) {
  const attached = files.find((f) => f?.text) || files[0] || null;
  const text = String(sourceText || attached?.text || "");
  const filename = String(sourceName || attached?.filename || "").trim() || "upload.txt";
  const subject = stripAssistPrefix(topic).slice(0, 80) || filename.replace(/\.[a-z0-9]+$/i, "") || "这份材料";
  const pages = pagesFromUpload(text, filename);
  const id = `pdf_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
  const kinds = ["highlight", "circle", "annotate"];
  const rects = [
    { x: 0.12, y: 0.18, w: 0.64, h: 0.12 },
    { x: 0.3, y: 0.4, w: 0.22, h: 0.2 },
    { x: 0.16, y: 0.62, w: 0.52, h: 0.1 },
  ];
  const frames = [
    { type: "session_ready", session_id: id, session_title: subject, resumed: false },
    { type: "sync_pdf_state", pdf_state: { file_id: filename, revision: 1 } },
  ];
  let step = 2;
  pages.forEach((pg, i) => {
    frames.push({ type: "go_to_page", page: pg.page, step_id: step });
    step += 1;
    frames.push({
      type: "speak",
      say: `第${pg.page}页《${filename}》：${pg.lead}`,
      spoken_text: `第${pg.page}页《${filename}》：${pg.lead}`,
      page_index: i,
      step_id: step,
    });
    step += 1;
  });
  kinds.forEach((kind, i) => {
    const pg = pages[i % pages.length];
    const pageIndex = (pg.page || 1) - 1;
    frames.push({
      type: "annotation",
      annotation_type: kind,
      kind,
      text: pg.lead.slice(0, 48),
      say: `${kind === "circle" ? "圈这里" : kind === "highlight" ? "高亮这一句" : "批注"}：${pg.lead.slice(0, 48)}`,
      rect: rects[i % rects.length],
      page_index: pageIndex,
      step_id: step,
    });
    step += 1;
  });
  frames.push({
    type: "ask",
    question: `用自己的话：${subject} 在第 1 页要建立的图像是什么？`,
    page_index: 0,
    step_id: step,
  });
  frames.push({ type: "done", step_id: step + 1 });
  const session = {
    id,
    kind: "pdf",
    title: subject,
    filename,
    basedOn: filename,
    ink: pages.slice(0, 2).map((pg, i) => ({
      class: i === 0 ? "pdf-formula" : "pdf-example",
      text: pg.lead.slice(0, 42),
    })),
    frames,
  };
  return registerPdfSession(session);
}

export function followUpPdfSession({ id = "", question = "" } = {}) {
  const key = String(id || "").trim();
  if (!craftedPdfId(key)) {
    const err = new Error("pdf session not found");
    err.code = "NOT_FOUND";
    throw err;
  }
  const session = generatedPdfs.get(key);
  if (!session) {
    const err = new Error("pdf session not found");
    err.code = "NOT_FOUND";
    throw err;
  }
  const q = String(question || "").trim();
  if (!q) throw new Error("question required");
  const frames = (session.frames || []).filter((f) => f.type !== "done");
  const step = frames.length;
  const page = Number(session.page || frames.filter((f) => f.type === "go_to_page").at(-1)?.page || 1);
  frames.push(
    { type: "user", text: q, page_index: Math.max(page - 1, 0), step_id: step },
    {
      type: "annotation",
      annotation_type: "annotate",
      kind: "annotate",
      text: q.slice(0, 48),
      say: `还在《${session.filename || "这份材料"}》第${page}页上：先回到定义，再看你问的「${q.slice(0, 24)}」。`,
      rect: { x: 0.14, y: 0.28, w: 0.58, h: 0.12 },
      page_index: Math.max(page - 1, 0),
      step_id: step + 1,
    },
    {
      type: "ask",
      question: `这一点讲清了吗？再问一个关于「${stripAssistPrefix(q).slice(0, 24) || q}」的问题。`,
      page_index: Math.max(page - 1, 0),
      step_id: step + 2,
    },
    { type: "done", step_id: step + 3 },
  );
  return registerPdfSession({ ...session, id: key, frames });
}

function boardFromParsed(parsed, { key, paused, notes, restarted }) {
  const transcript = parsed.frames.filter(
    (f) => f.type === "speak" || f.type === "annotation" || f.type === "ask" || f.type === "user",
  );
  const marks = parsed.frames.filter((f) => f.type === "annotation");
  const ask = [...parsed.frames].reverse().find((f) => f.type === "ask") || null;
  const done = parsed.frames.some((f) => f.type === "done");
  const formula = transcript.some((t) => /a\^2 \+ b\^2 = c\^2|a² \+ b² = c²/.test(`${t.say || ""}\n${t.display || ""}`));
  const ink = parsed.ink.length
    ? parsed.ink
    : formula
      ? [
          { class: "pdf-formula", text: "a² + b² = c²" },
          { class: "pdf-example", text: "3² + 4² = c²" },
        ]
      : [];
  return {
    ok: true,
    empty: transcript.length === 0,
    restarted: Boolean(restarted),
    resumed: Boolean(parsed.resumed),
    paused: Boolean(paused),
    title: parsed.title,
    filename: parsed.filename,
    sessionId: parsed.id || key,
    page: parsed.page,
    frames: parsed.frames,
    transcript,
    marks,
    ask,
    done,
    formula,
    ink,
    notes: Array.isArray(notes) ? notes : [],
    pageLabel: PDF.pageAbbrev.replace("{{page}}", String(parsed.page)),
  };
}

export function pdfSessionState({
  id = "",
  leftovers = PDF_SESSIONS,
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
      title: PDF.sessionTitleFallback,
      body: PDF.loadFailed,
      frames: [],
      transcript: [],
      marks: [],
      notes: [],
      page: 1,
    };
  }
  if (craftedPdfId(key)) {
    const crafted = generatedPdfs.get(key);
    if (!crafted) {
      return {
        ok: false,
        empty: true,
        restarted: false,
        resumed: false,
        paused: false,
        title: PDF.sessionTitleFallback,
        body: PDF.loadFailed,
        frames: [],
        transcript: [],
        marks: [],
        notes: [],
        page: 1,
      };
    }
    return boardFromParsed(parsePdfReplay(crafted), { key, paused, notes, restarted: false });
  }
  const found = findLeftover(key, leftovers);
  const restarted = !found;
  const raw = found || leftovers[0] || { frames: [] };
  return boardFromParsed(parsePdfReplay(raw), { key, paused, notes, restarted });
}

export function isPdfSessionType(type) {
  const value = String(type || "");
  return value === "pdf-annotate" || value === "pdf" || value === "pdf_annotate";
}
