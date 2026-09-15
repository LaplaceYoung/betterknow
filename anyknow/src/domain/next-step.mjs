/** Instant Assist turn closer: three next moves + 已讲过/当前/下一轮. */

import { stripAssistPrefix } from "./kb.mjs";

const CATALOG = [
  {
    id: "flashcards",
    chip: "pack",
    tool: "",
    label: "用闪卡自检",
    lead: "帮我做一张两页速查表：",
    skip: /generate_flashcards|generate_cheatsheet|generate_quiz/,
  },
  {
    id: "whiteboard",
    chip: "",
    tool: "board",
    label: "上白板讲一遍",
    lead: "",
    skip: /create_board_session/,
  },
  {
    id: "deeplearn",
    chip: "",
    tool: "deeplearn",
    label: "开深度学习课",
    lead: "",
    skip: /create_deep_learn_session/,
  },
  {
    id: "solve",
    chip: "solve",
    tool: "",
    label: "做一道例题",
    lead: "帮我一步步解这道题：",
    skip: /generate_worked_example/,
  },
];

function justNames(just = "") {
  return String(just || "");
}

export function recommendNextSteps({ topic = "", just = "" } = {}) {
  const subject = stripAssistPrefix(topic).slice(0, 80) || "这个概念";
  const doneTools = justNames(just);
  const picked = [];
  for (const row of CATALOG) {
    if (row.skip.test(doneTools)) continue;
    picked.push(row);
    if (picked.length === 3) break;
  }
  if (picked.length < 3) {
    for (const row of CATALOG) {
      if (picked.some((p) => p.id === row.id)) continue;
      picked.push(row);
      if (picked.length === 3) break;
    }
  }
  const steps = picked.map((row) => ({
    id: row.id,
    chip: row.chip,
    tool: row.tool,
    label: row.label,
    blurb:
      row.id === "flashcards"
        ? `把「${subject}」收成闪卡和测验。`
        : row.id === "whiteboard"
          ? `把「${subject}」画到黑板上。`
          : row.id === "deeplearn"
            ? `按大纲把「${subject}」上一整堂。`
            : `用「${subject}」解一道题。`,
    step_prompt: `${row.lead}${subject}`.trim(),
  }));
  const taught = /generate_digest/.test(doneTools)
    ? "消化材料"
    : /generate_worked_example/.test(doneTools)
      ? "分步求解"
      : /generate_main_tasks/.test(doneTools)
        ? "学习规划"
        : `${subject}的定义`;
  const current = /generate_quiz|generate_flashcards|generate_cheatsheet/.test(doneTools)
    ? "测验与闪卡"
    : "这一讲";
  return {
    kind: "next_steps",
    topic: subject,
    learning_progress: {
      done: taught,
      current,
      next: "白板或例题",
    },
    steps,
  };
}
