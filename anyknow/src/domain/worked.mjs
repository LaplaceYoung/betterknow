/** Structured worked-example board for Instant Assist 问题求解. */

import { stripAssistPrefix, teachingExcerpt } from "./kb.mjs";

export const WORKED_LABELS = Object.freeze({
  known: "已知",
  find: "求",
  relation: "关系",
  steps: "步骤",
  check: "自检",
  traps: "易错",
});

export function workedExampleBoard({ topic = "", sourceText = "", sourceName = "" } = {}) {
  const subject = stripAssistPrefix(topic).slice(0, 80) || "这道题";
  const excerpt = teachingExcerpt(sourceText, 480);
  const bullets = excerpt
    .split(/[.\n]/)
    .map((s) => s.trim())
    .filter((s) => s.length > 18)
    .slice(0, 4);
  const basedOn = String(sourceName || "").trim();
  return {
    kind: "worked",
    topic: subject,
    basedOn,
    cards: [
      { id: "known", label: WORKED_LABELS.known, body: `题目：${subject}` },
      { id: "find", label: WORKED_LABELS.find, body: `用教材里的关系求出「${subject}」要求的量。` },
      {
        id: "relation",
        label: WORKED_LABELS.relation,
        body: bullets[0] || (basedOn ? `见公开教材《${basedOn}》。` : "先写出支配关系，再代入。"),
      },
      {
        id: "steps",
        label: WORKED_LABELS.steps,
        items: [
          "写出已知量，不要跳步。",
          bullets[1] || "代入支配关系。",
          bullets[2] || "算出结果并核对单位。",
        ],
      },
      { id: "check", label: WORKED_LABELS.check, body: "量纲是否对？边界情况还成立吗？" },
      {
        id: "traps",
        label: WORKED_LABELS.traps,
        body: excerpt ? "不要跳过教材里写明的条件。" : "不要把相关当成因果。",
      },
    ],
  };
}
