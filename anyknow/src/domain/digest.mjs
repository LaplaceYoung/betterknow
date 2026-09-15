/** Instant Assist 长文件消化: ask 精读/详述/导读, then a cited digest board. */

import { stripAssistPrefix, teachingExcerpt } from "./kb.mjs";

export const DIGEST_MODES = Object.freeze(["精读", "详述", "导读"]);

const STAMP_RE = /\[stamp\s+[^\]]*\]/gi;

export function parseDigestStamp(text = "") {
  const raw = String(text || "");
  let mode = "";
  for (const m of raw.matchAll(/\[stamp\s+([^\]]+)\]/gi)) {
    for (const part of String(m[1] || "").trim().split(/\s+/)) {
      const eq = part.indexOf("=");
      if (eq <= 0) continue;
      if (part.slice(0, eq).toLowerCase() !== "mode") continue;
      mode = part.slice(eq + 1).trim();
    }
  }
  return {
    ready: DIGEST_MODES.includes(mode),
    mode: DIGEST_MODES.includes(mode) ? mode : "",
    topic: stripAssistPrefix(raw.replace(STAMP_RE, "")),
  };
}

export function stampDigestMode({ mode = "", text = "" } = {}) {
  const body = stripAssistPrefix(String(text || "").replace(STAMP_RE, ""));
  return DIGEST_MODES.includes(mode) ? `[stamp mode=${mode}] ${body}`.trim() : body;
}

export function digestAskReady(pick = {}) {
  return DIGEST_MODES.includes(pick.mode);
}

export function digestAskBoard({ topic = "" } = {}) {
  const subject = stripAssistPrefix(String(topic || "").replace(STAMP_RE, "")).slice(0, 80) || "这份材料";
  return {
    kind: "ask",
    chip: "digest",
    topic: subject,
    prompt: `先选读法，再消化「${subject}」。`,
    questions: [{ id: "mode", label: "读法", options: [...DIGEST_MODES] }],
  };
}

function paragraphs(text = "") {
  const excerpt = teachingExcerpt(text, 2400);
  return excerpt
    .split(/(?<=[。.!?\n])/)
    .map((s) => s.trim())
    .filter((s) => s.length > 24)
    .slice(0, 8);
}

export function generateDigestBoard({ topic = "", sourceText = "", sourceName = "", mode = "详述" } = {}) {
  const subject = stripAssistPrefix(String(topic || "").replace(STAMP_RE, "")).slice(0, 80) || "这份材料";
  const depth = mode === "导读" ? "导读" : mode === "精读" ? "精读" : "详述";
  const basedOn = String(sourceName || "").trim();
  const rows = paragraphs(sourceText);
  const citeCount = depth === "导读" ? 2 : depth === "精读" ? 4 : 3;
  const citations = rows.slice(0, Math.min(citeCount, rows.length || 1)).map((span, i) => ({
    id: `c${i + 1}`,
    file: basedOn || "材料",
    page: i + 1,
    label: `段 ${i + 1}`,
    span: (span || subject).slice(0, 180),
  }));
  const cards = [
    { id: "claim", label: "要义", body: rows[0] || `抓住「${subject}」在材料里的中心主张。` },
    { id: "mechanism", label: "机制", body: rows[1] || "把材料里的机制写成一步。" },
  ];
  if (depth !== "导读") {
    cards.push({ id: "carry", label: "可迁移", body: rows[2] || "写出一个可带走的例子。" });
  }
  if (depth === "精读") {
    cards.push({ id: "traps", label: "条件 / 易错", body: rows[3] || "不要跳过材料里写明的条件。" });
  }
  return {
    kind: "digest",
    topic: subject,
    mode: depth,
    basedOn,
    recap: `${depth}「${subject}」。`,
    cards,
    citations,
  };
}
