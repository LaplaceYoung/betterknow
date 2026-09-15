/** Instant Assist 概念讲解: ask level / style / focus, then teach from that stamp. */

import { stripAssistPrefix } from "./kb.mjs";

export const STUDY_LEVELS = Object.freeze(["入门", "复习", "应考"]);
export const STUDY_STYLES = Object.freeze(["直觉图像", "公式推导", "对照例子"]);
export const STUDY_FOCUSES = Object.freeze(["核心定义", "推导过程", "考试易错"]);

const STAMP_RE = /\[stamp\s+([^\]]+)\]/gi;

export function stripStudyStamp(text = "") {
  return String(text || "")
    .replace(STAMP_RE, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function parseStudyStamp(text = "") {
  const raw = String(text || "");
  const attrs = {};
  for (const m of raw.matchAll(/\[stamp\s+([^\]]+)\]/gi)) {
    for (const part of String(m[1] || "").trim().split(/\s+/)) {
      const eq = part.indexOf("=");
      if (eq <= 0) continue;
      const key = part.slice(0, eq).toLowerCase();
      const value = part.slice(eq + 1).trim();
      if (key && value) attrs[key] = value;
    }
  }
  const level = STUDY_LEVELS.includes(attrs.level) ? attrs.level : "";
  const style = STUDY_STYLES.includes(attrs.style) ? attrs.style : "";
  const focus = STUDY_FOCUSES.includes(attrs.focus) ? attrs.focus : "";
  return {
    ready: Boolean(level && style && focus),
    level,
    style,
    focus,
    topic: stripStudyStamp(stripAssistPrefix(raw)),
  };
}

export function stampStudyMode({ level = "", style = "", focus = "", text = "" } = {}) {
  const parts = [];
  if (STUDY_LEVELS.includes(level)) parts.push(`level=${level}`);
  if (STUDY_STYLES.includes(style)) parts.push(`style=${style}`);
  if (STUDY_FOCUSES.includes(focus)) parts.push(`focus=${focus}`);
  const body = stripStudyStamp(text);
  return parts.length ? `[stamp ${parts.join(" ")}] ${body}`.trim() : body;
}

export function studyAskReady(pick = {}) {
  return Boolean(
    STUDY_LEVELS.includes(pick.level) &&
      STUDY_STYLES.includes(pick.style) &&
      STUDY_FOCUSES.includes(pick.focus),
  );
}

export function studyAskBoard({ topic = "" } = {}) {
  const subject = stripStudyStamp(stripAssistPrefix(topic)).slice(0, 80) || "这个概念";
  return {
    kind: "ask",
    topic: subject,
    prompt: `先选程度、讲法和重点，再开讲「${subject}」。`,
    questions: [
      { id: "level", label: "程度", options: [...STUDY_LEVELS] },
      { id: "style", label: "讲法", options: [...STUDY_STYLES] },
      { id: "focus", label: "重点", options: [...STUDY_FOCUSES] },
    ],
  };
}
