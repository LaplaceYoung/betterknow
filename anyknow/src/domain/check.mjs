/** Instant Assist teach→check: grounded quiz and flashcards from 公开教材. */

import { stripAssistPrefix, teachingExcerpt } from "./kb.mjs";

function sentences(text = "", n = 4) {
  const excerpt = teachingExcerpt(text, 720);
  const parts = excerpt
    .split(/[.\n。]/)
    .map((s) => s.trim())
    .filter((s) => s.length > 18);
  return (parts.length ? parts : excerpt ? [excerpt] : []).slice(0, n);
}

export function generateQuizBoard({ topic = "", sourceText = "", sourceName = "" } = {}) {
  const subject = stripAssistPrefix(topic).slice(0, 80) || "这个概念";
  const basedOn = String(sourceName || "").trim();
  const rows = sentences(sourceText, 4);
  const claim = (rows[0] || "").slice(0, 80);
  const support = (rows[1] || rows[0] || "").slice(0, 80);
  return {
    kind: "quiz",
    title: `${subject} 测验`,
    topic: subject,
    basedOn,
    questions: [
      {
        id: "q1",
        prompt: `「${subject}」的核心是什么？`,
        choices: ["只记表面细节，不必定义", claim || "先写出支配这个概念的工作定义", "和教材无关的事实"],
        answer: 1,
        explanation: basedOn
          ? `根据《${basedOn}》：${claim || "先定义，再谈机制。"}`
          : claim || "先写出工作定义，再谈机制。",
      },
      {
        id: "q2",
        prompt: basedOn ? `哪一句能在公开教材《${basedOn}》里站住？` : "学完这一步，下一步该做什么？",
        choices: sourceText
          ? [support || claim || "教材里的支配关系", "跳过定义直接背结论", "只记符号，不看条件"]
          : ["跳过定义", "检索教材再应用", "只背结论"],
        answer: sourceText ? 0 : 1,
        explanation: sourceText
          ? basedOn
            ? `根据《${basedOn}》：${support || claim}`
            : support || claim || "用教材里的句子核对。"
          : "先检索公开教材，再应用。",
      },
    ],
  };
}

export function generateFlashcardBoard({ topic = "", sourceText = "", sourceName = "" } = {}) {
  const subject = stripAssistPrefix(topic).slice(0, 80) || "这个概念";
  const basedOn = String(sourceName || "").trim();
  const rows = sentences(sourceText, 3);
  const def =
    rows[0] || (basedOn ? `根据《${basedOn}》用一句话定义「${subject}」。` : `用一句话定义「${subject}」。`);
  const use = rows[1] || "当题目要求把定义用到新例子上时。";
  const trap = rows[2] || "不要跳过教材里写明的条件。";
  return {
    kind: "flashcards",
    title: `${subject} 闪卡`,
    topic: subject,
    basedOn,
    cards: [
      { front: `「${subject}」的定义`, back: def },
      { front: "什么时候用？", back: use },
      { front: "常见易错", back: trap },
    ],
  };
}
