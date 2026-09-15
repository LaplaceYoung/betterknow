/** Instant Assist 可视化: chalkboard SVG + walkthrough grounded in 公开教材. */

import { stripAssistPrefix, teachingExcerpt } from "./kb.mjs";

function escapeXml(s) {
  return String(s || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function clip(text = "", n = 18) {
  const t = String(text || "").replace(/\s+/g, " ").trim();
  return t.slice(0, n) || "…";
}

function sentences(text = "", n = 3) {
  const excerpt = teachingExcerpt(text, 480);
  const parts = excerpt
    .split(/[.\n。]/)
    .map((s) => s.trim())
    .filter((s) => s.length > 12);
  return (parts.length ? parts : excerpt ? [excerpt] : []).slice(0, n);
}

export function generateDiagramBoard({ topic = "", sourceText = "", sourceName = "" } = {}) {
  const subject = stripAssistPrefix(topic).slice(0, 40) || "这个概念";
  const basedOn = String(sourceName || "").trim();
  const rows = sentences(sourceText, 3);
  const def = clip(rows[0] || "定义", 16);
  const mech = clip(rows[1] || "机制", 16);
  const label = clip(subject, 18);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 180" role="img">
  <rect width="320" height="180" fill="#122018"/>
  <g class="diag-node" data-node="def" tabindex="0">
    <rect x="24" y="36" width="120" height="72" rx="10" fill="none" stroke="#f0e6a8" stroke-width="2"/>
    <text x="40" y="68" fill="#f4efe2" font-size="13">定义</text>
    <text x="40" y="90" fill="#c9c2ae" font-size="11">${escapeXml(def)}</text>
  </g>
  <path d="M150 72h28" stroke="#c9c2ae" stroke-width="2"/>
  <g class="diag-node" data-node="mech" tabindex="0">
    <rect x="184" y="36" width="112" height="72" rx="10" fill="none" stroke="#c5e0b4" stroke-width="2"/>
    <text x="200" y="68" fill="#c5e0b4" font-size="13">机制</text>
    <text x="200" y="90" fill="#c9c2ae" font-size="11">${escapeXml(mech)}</text>
  </g>
  <text x="24" y="152" fill="#c9c2ae" font-size="12">${escapeXml(label)}</text>
</svg>`;
  return {
    kind: "diagram",
    title: `${subject} 示意图`,
    topic: subject,
    basedOn,
    svg,
    nodes: [
      { id: "def", label: "定义" },
      { id: "mech", label: "机制" },
    ],
    walkthrough: [
      `先画出「${subject}」的工作图像。`,
      basedOn ? `根据《${basedOn}》写出定义。` : "先写出定义。",
      "用箭头标出机制，不要跳步。",
      "换一个例子，箭头方向还成立吗？",
    ],
  };
}
