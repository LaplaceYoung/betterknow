/** Instant Assist taught reply: chalkboard encyclopedia sections grounded in 公开教材. */

import { stripAssistPrefix, teachingExcerpt } from "./kb.mjs";

export const CONTENT_LABELS = Object.freeze({
  def: "定义",
  mech: "机制",
  ex: "例子",
  check: "自检",
});

function bullets(text = "", n = 4) {
  const excerpt = teachingExcerpt(text, 720);
  const parts = excerpt
    .split(/[.\n]/)
    .map((s) => s.trim())
    .filter((s) => s.length > 18);
  return (parts.length ? parts : excerpt ? [excerpt] : []).slice(0, n);
}

function intuitionSvg(label = "") {
  const t = String(label || "概念").slice(0, 18);
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 140" role="img">
  <rect width="320" height="140" fill="#122018"/>
  <rect x="24" y="36" width="110" height="64" rx="10" fill="none" stroke="#f0e6a8" stroke-width="2"/>
  <text x="40" y="74" fill="#f4efe2" font-size="13">定义</text>
  <rect x="186" y="36" width="110" height="64" rx="10" fill="none" stroke="#c5e0b4" stroke-width="2"/>
  <text x="202" y="74" fill="#c5e0b4" font-size="13">机制</text>
  <path d="M138 68h44" stroke="#c9c2ae" stroke-width="2"/>
  <text x="24" y="124" fill="#c9c2ae" font-size="12">${t.replace(/[<>&"]/g, "")}</text>
</svg>`;
}

export function generateContentBoard({
  topic = "",
  sourceText = "",
  sourceName = "",
  level = "",
  style = "",
  focus = "",
} = {}) {
  const subject = stripAssistPrefix(topic).slice(0, 80) || "这个概念";
  const rows = bullets(sourceText, 5);
  const basedOn = String(sourceName || "").trim();
  const lead =
    level === "入门" ? "从零讲起" : level === "复习" ? "按复习节奏过一遍" : level === "应考" ? "按应考要点讲" : "";
  const def =
    rows[0] ||
    (basedOn ? `根据公开教材《${basedOn}》先写出「${subject}」的工作定义。` : `先用一句话定义「${subject}」。`);
  const mech =
    style === "公式推导"
      ? rows[1] || "把公式一步步推出来。"
      : rows[1] || "指出支配关系，不要跳步。";
  const ex =
    style === "对照例子"
      ? rows[2] || "对照一个例子，问同样的机制还成立吗。"
      : rows[2] || "用一个例子自检。";
  const check =
    focus === "考试易错" || level === "应考"
      ? rows[3] || "点出考试易错。不要跳过教材里写明的条件。"
      : "用自己的话写出机制，再问边界情况还成立吗？";
  const cards = [
    { id: "def", label: CONTENT_LABELS.def, body: focus === "核心定义" ? def : def },
    { id: "mech", label: CONTENT_LABELS.mech, body: focus === "推导过程" ? mech : mech },
    { id: "ex", label: CONTENT_LABELS.ex, body: ex },
    { id: "check", label: CONTENT_LABELS.check, body: check },
  ];
  return {
    kind: "content",
    topic: subject,
    basedOn,
    level,
    style,
    focus,
    lead,
    cards,
    diagram: style === "直觉图像" ? { svg: intuitionSvg(subject) } : null,
  };
}
