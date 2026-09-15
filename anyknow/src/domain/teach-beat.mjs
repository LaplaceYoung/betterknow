/** Gated 概念讲解 beats: 定义 → 机制/例子 → 测验. */

import { stripAssistPrefix } from "./kb.mjs";

export const TEACH_BEATS = Object.freeze(["定义", "机制例子", "测验"]);
export const TEACH_GO = Object.freeze(["继续", "卡住了"]);

const BEAT_RE = /\[beat=([^\]]+)\]/i;

export function parseTeachBeat(text = "") {
  const raw = String(text || "");
  const m = raw.match(BEAT_RE);
  const beat = m ? String(m[1] || "").trim() : "";
  return {
    beat: TEACH_BEATS.includes(beat) ? beat : "",
    stuck: /\[stuck=1\]/i.test(raw),
  };
}

export function stampTeachBeat({ beat = "", stuck = false, text = "" } = {}) {
  const body = stripAssistPrefix(String(text || "").replace(BEAT_RE, "").replace(/\[stuck=1\]/gi, "")).trim();
  const tags = [];
  if (TEACH_BEATS.includes(beat)) tags.push(`[beat=${beat}]`);
  if (stuck) tags.push("[stuck=1]");
  return tags.length ? `${tags.join(" ")} ${body}`.trim() : body;
}

export function teachAskReady(pick = {}) {
  return TEACH_GO.includes(pick.go);
}

export function nextTeachBeat(beat = "", go = "") {
  if (go === "卡住了") return { beat: TEACH_BEATS.includes(beat) ? beat : "定义", stuck: true };
  if (beat === "机制例子") return { beat: "测验", stuck: false };
  if (beat === "测验") return { beat: "测验", stuck: false };
  return { beat: "机制例子", stuck: false };
}

export function teachBeatAsk({ topic = "", beat = "定义", level = "", style = "", focus = "" } = {}) {
  const subject = stripAssistPrefix(topic).slice(0, 80) || "这个概念";
  const at = TEACH_BEATS.includes(beat) ? beat : "定义";
  const prompt =
    at === "机制例子"
      ? `「${subject}」的机制和例子讲完了。接着做测验，或说卡住了。`
      : `先停在「${subject}」的定义。接着讲机制，或说卡住了。`;
  return {
    kind: "ask",
    chip: "teach",
    topic: subject,
    beat: at,
    level,
    style,
    focus,
    prompt,
    questions: [{ id: "go", label: "下一步", options: [...TEACH_GO] }],
  };
}

export function sliceContentBoard(board = {}, beat = "") {
  const cards = Array.isArray(board.cards) ? board.cards : [];
  if (beat === "定义") {
    return { ...board, beat, cards: cards.filter((c) => c.id === "def") };
  }
  if (beat === "机制例子") {
    return { ...board, beat, cards: cards.filter((c) => c.id === "mech" || c.id === "ex"), diagram: null };
  }
  return { ...board, beat: beat || "all" };
}
