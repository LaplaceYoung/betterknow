/** Leftover Instant Assist chips, tools popover, and reply-speed modes. */

export const ASSIST_BOARD_LEFTOVER = "248fd02f72be4bad82bcdd347b8bf237";

export const ASSIST_SPEEDS = Object.freeze([
  {
    id: "standard",
    zh: { label: "标准", desc: "经典模式，回答更全面、功能更丰富。" },
    en: { label: "Standard", desc: "Classic mode: fuller answers, richer tools." },
  },
  {
    id: "fast",
    zh: { label: "快速", desc: "快速模式，适合简短回复。" },
    en: { label: "Fast", desc: "Fast mode, for short replies." },
  },
]);

export const ASSIST_TOOLS = Object.freeze([
  {
    id: "board",
    zh: {
      label: "白板课堂",
      desc: "把当前对话变成边讲边写的白板课堂，或对上传的 PDF 逐页讲解。",
    },
    en: {
      label: "Whiteboard class",
      desc: "Turn this chat into a talk-and-write board, or walk a PDF page by page.",
    },
  },
  {
    id: "plan",
    zh: {
      label: "学习规划",
      desc: "制定含学习任务的可执行计划，并写进学习动态。适合备考或围绕明确目标推进。",
    },
    en: {
      label: "Study planner",
      desc: "Build a task list and drop it on the learning feed. Good for exams or a clear goal.",
    },
  },
  {
    id: "deeplearn",
    zh: {
      label: "深度学习课堂",
      desc: "按公开教材生成一堂带大纲的深度学习课，逐节推进，卡住时要苏格拉底提示。",
    },
    en: {
      label: "Deep learn class",
      desc: "Build an outline-backed class from public textbooks, then walk it with socratic hints.",
    },
  },
]);

export const ASSIST_CHIPS = Object.freeze([
  {
    id: "explain",
    badge: "已升级",
    badgeEn: "Upgraded",
    zh: { label: "概念讲解", prompt: "用粉笔把这个概念讲清楚：" },
    en: { label: "Explain a concept", prompt: "Walk this concept on the board: " },
  },
  {
    id: "pack",
    zh: { label: "个性化学习资料生成", prompt: "帮我做一张两页速查表：" },
    en: { label: "Study pack", prompt: "Make me a two-page cheatsheet: " },
  },
  {
    id: "digest",
    zh: { label: "长文件消化", prompt: "帮我消化这份长材料：" },
    en: { label: "Long-file digest", prompt: "Digest this long source: " },
  },
  {
    id: "solve",
    zh: { label: "问题求解", prompt: "帮我一步步解这道题：" },
    en: { label: "Problem solving", prompt: "Solve this step by step: " },
  },
  {
    id: "viz",
    badge: "New",
    badgeEn: "New",
    zh: { label: "可视化", prompt: "把这个过程画成粉笔示意图：" },
    en: { label: "Visualize", prompt: "Sketch this as a chalkboard diagram: " },
  },
]);

export function assistBoard({
  lang = "zh",
  tool = "",
  speed = "standard",
  menu = "",
} = {}) {
  const en = lang === "en";
  const speeds = ASSIST_SPEEDS.map((row) => {
    const pack = en ? row.en : row.zh;
    return { id: row.id, label: pack.label, desc: pack.desc, on: row.id === speed };
  });
  const tools = ASSIST_TOOLS.map((row) => {
    const pack = en ? row.en : row.zh;
    return { id: row.id, label: pack.label, desc: pack.desc, on: row.id === tool };
  });
  const chips = ASSIST_CHIPS.map((row) => {
    const pack = en ? row.en : row.zh;
    return {
      id: row.id,
      label: pack.label,
      prompt: pack.prompt,
      badge: en ? row.badgeEn || row.badge || "" : row.badge || "",
    };
  });
  const speedRow = speeds.find((s) => s.on) || speeds[0];
  return {
    toolsLabel: en ? "Tools" : "工具",
    speedLabel: speedRow.label,
    heroAssistAlt: en ? "Need a hand with math?" : "需要数学帮助吗？",
    chips,
    tools,
    speeds,
    tool,
    speed: speedRow.id,
    menu: menu === "tools" || menu === "speed" ? menu : "",
  };
}

export function assistChipPrompt(id, lang = "zh") {
  const row = ASSIST_CHIPS.find((c) => c.id === id);
  if (!row) return "";
  return (lang === "en" ? row.en : row.zh).prompt;
}

export function inferAssistChip(prompt = "") {
  const s = String(prompt || "");
  if (/用粉笔把这个概念讲清楚|Walk this concept on the board/i.test(s)) return "explain";
  if (/两页速查表|two-page cheatsheet/i.test(s)) return "pack";
  if (/消化这份长材料|Digest this long source/i.test(s)) return "digest";
  if (/一步步解这道题|Solve this step by step/i.test(s)) return "solve";
  if (/粉笔示意图|chalkboard diagram/i.test(s)) return "viz";
  const tagged = s.match(/\[chip:([a-z]+)\]/i);
  return tagged ? tagged[1].toLowerCase() : "";
}

export function parseAssistBind(text = "") {
  const raw = String(text || "");
  const chip = raw.match(/\[chip:([a-z]+)\]/i)?.[1]?.toLowerCase() || inferAssistChip(raw);
  const speed = /\[speed:fast\]/i.test(raw) || /\bspeedMode["']?\s*[:=]\s*["']fast/i.test(raw) ? "fast" : "standard";
  return { chip, speed, raw };
}

export function stampAssistBind({ chip = "", speed = "standard", text = "" } = {}) {
  const id = String(chip || inferAssistChip(text) || "").toLowerCase();
  const fast = speed === "fast";
  const tags = [];
  if (id) tags.push(`[chip:${id}]`);
  if (fast) tags.push("[speed:fast]");
  const body = String(text || "").trim();
  return tags.length ? `${tags.join(" ")} ${body}`.trim() : body;
}

export function assistBind({ chip = "", tool = "", speed = "standard", prompt = "" } = {}) {
  const id = String(chip || inferAssistChip(prompt) || "").toLowerCase();
  const kind =
    tool === "board"
      ? "board"
      : tool === "plan"
        ? "plan"
        : tool === "deeplearn"
          ? "deeplearn"
        : id === "pack"
          ? "materials"
          : id === "viz"
            ? "visual"
            : id === "digest"
              ? "digest"
              : id === "solve"
                ? "solve"
                : id === "explain"
                  ? "explain"
                  : "assist";
  return { chip: id, tool: tool || "", speed: speed === "fast" ? "fast" : "standard", kind };
}
