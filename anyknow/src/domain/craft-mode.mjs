/** 打造课程: portrait questions then a goal-specific blueprint tree from 公开教材. */

import { stripAssistPrefix, teachingExcerpt } from "./kb.mjs";

export const CRAFT_PREREQS = Object.freeze(["零基础", "学过一点", "比较熟"]);
export const CRAFT_EMPHASIS = Object.freeze(["直觉图像", "公式推导", "做题应考"]);
export const CRAFT_GOALS = Object.freeze(["过关", "拿高分", "真正学会"]);
export const CRAFT_SCALES = Object.freeze(["一节课", "一周", "一门课"]);

const STAMP_RE = /\[stamp\s+[^\]]*\]/gi;

function attrsFrom(text = "") {
  const attrs = {};
  for (const m of String(text || "").matchAll(/\[stamp\s+([^\]]+)\]/gi)) {
    for (const part of String(m[1] || "").trim().split(/\s+/)) {
      const eq = part.indexOf("=");
      if (eq <= 0) continue;
      attrs[part.slice(0, eq).toLowerCase()] = part.slice(eq + 1).trim();
    }
  }
  return attrs;
}

export function parseCraftStamp(text = "") {
  const raw = String(text || "");
  const attrs = attrsFrom(raw);
  const prereq = CRAFT_PREREQS.includes(attrs.prereq) ? attrs.prereq : "";
  const emphasis = CRAFT_EMPHASIS.includes(attrs.emphasis) ? attrs.emphasis : "";
  const goal = CRAFT_GOALS.includes(attrs.goal) ? attrs.goal : "";
  const scale = CRAFT_SCALES.includes(attrs.scale) ? attrs.scale : "";
  return {
    ready: Boolean(prereq && emphasis && goal && scale),
    prereq,
    emphasis,
    goal,
    scale,
    topic: stripAssistPrefix(raw.replace(STAMP_RE, "").replace(/^Craft a 1:1 course for:\s*/i, "").replace(/^打造课程[:：]\s*/i, "")),
  };
}

export function stampCraftMode({ prereq = "", emphasis = "", goal = "", scale = "", text = "" } = {}) {
  const parts = [];
  if (CRAFT_PREREQS.includes(prereq)) parts.push(`prereq=${prereq}`);
  if (CRAFT_EMPHASIS.includes(emphasis)) parts.push(`emphasis=${emphasis}`);
  if (CRAFT_GOALS.includes(goal)) parts.push(`goal=${goal}`);
  if (CRAFT_SCALES.includes(scale)) parts.push(`scale=${scale}`);
  const body = stripAssistPrefix(String(text || "").replace(STAMP_RE, ""));
  return parts.length ? `[stamp ${parts.join(" ")}] ${body}`.trim() : body;
}

export function craftAskReady(pick = {}) {
  return Boolean(
    CRAFT_PREREQS.includes(pick.prereq) &&
      CRAFT_EMPHASIS.includes(pick.emphasis) &&
      CRAFT_GOALS.includes(pick.goal) &&
      CRAFT_SCALES.includes(pick.scale),
  );
}

export function craftAskBoard({ topic = "" } = {}) {
  const subject = stripAssistPrefix(String(topic || "").replace(STAMP_RE, "")).slice(0, 80) || "这一课";
  return {
    kind: "ask",
    chip: "craft",
    topic: subject,
    prompt: `先选先修、侧重、目标和规模，再按公开教材排出「${subject}」的课程蓝图。`,
    questions: [
      { id: "prereq", label: "先修", options: [...CRAFT_PREREQS] },
      { id: "emphasis", label: "侧重", options: [...CRAFT_EMPHASIS] },
      { id: "goal", label: "目标", options: [...CRAFT_GOALS] },
      { id: "scale", label: "规模", options: [...CRAFT_SCALES] },
    ],
  };
}

function session({ title, description, tasks }) {
  return {
    sessionIndex: 1,
    session_type: "whiteboard",
    title,
    description,
    practice: { tasks },
  };
}

export function craftCourseTree({
  topic = "",
  prereq = "学过一点",
  emphasis = "直觉图像",
  goal = "过关",
  scale = "一门课",
  sourceText = "",
  sourceName = "",
  language = "zh",
  files = [],
} = {}) {
  const title = stripAssistPrefix(topic).slice(0, 80) || "这一课";
  const basedOn = String(sourceName || "").trim();
  const excerpt = teachingExcerpt(sourceText, 220);
  const pace = prereq === "零基础" ? "从零" : prereq === "比较熟" ? "按复习" : "按已有基础";
  const aim = goal === "拿高分" ? "按考试拿分" : goal === "真正学会" ? "真正学会" : "先过关";
  const lens =
    emphasis === "公式推导" ? "把公式推出来" : emphasis === "做题应考" ? "对着题目练" : "先建立图像";
  const grounded = basedOn
    ? `根据公开教材《${basedOn}》。${excerpt}`
    : excerpt || `${pace}讲「${title}」，${lens}，${aim}。`;
  const beats = [
    {
      unitTitle: `先建立图像 · ${title}`,
      lectureTitle: "工作图像",
      sessions: [
        session({
          title: `画出「${title}」`,
          description: grounded,
          tasks: [`用自己的话画出「${title}」要解释的现象。`, `${lens}。`],
        }),
        session({
          title: "对照一个例子",
          description: `对照一个例子，问同样的机制还成立吗。${basedOn ? `见《${basedOn}》。` : ""}`,
          tasks: ["写出一个例子。", "问：换一个例子还成立吗？"],
        }),
      ],
    },
    {
      unitTitle: `机制 · ${title}`,
      lectureTitle: "支配关系",
      sessions: [
        session({
          title: `「${title}」怎么运作`,
          description: grounded,
          tasks: ["写出支配关系，不要跳步。", "标出教材里的条件。"],
        }),
        session({
          title: "易错",
          description: "不要跳过教材里写明的条件。",
          tasks: ["列出一个易错点。", `${aim}：自检一遍。`],
        }),
      ],
    },
    {
      unitTitle: `应用 · ${title}`,
      lectureTitle: "带到新题上",
      sessions: [
        session({
          title: "做一道代表题",
          description: `${pace}做一道「${title}」代表题。`,
          tasks: ["写出已知、关系和所求。", "不要跳步。"],
        }),
        session({
          title: "自检",
          description: "用自己的话复述，再换一个例子。",
          tasks: ["合上教材复述机制。", "换一个例子再走一遍。"],
        }),
      ],
    },
  ];
  const take = scale === "一节课" ? 1 : scale === "一周" ? 2 : 3;
  const units = beats.slice(0, take).map((beat, i) => ({
    unitId: `unit${i + 1}`,
    title: beat.unitTitle,
    description: grounded.slice(0, 180),
    lectures: [
      {
        lectureId: `unit${i + 1}Lecture1`,
        title: beat.lectureTitle,
        order: 1,
        sessions: beat.sessions,
      },
    ],
    projects: [],
    exams: [],
  }));
  const fileNote = files.map((f) => f.text).filter(Boolean).join("\n").slice(0, 200);
  return {
    courseUuid: `craft_${Date.now().toString(36)}`,
    courseTitle: title,
    courseDescription: basedOn
      ? `按公开教材《${basedOn}》打造「${title}」。${pace}，${lens}，${aim}。${fileNote}`
      : `打造「${title}」。${pace}，${lens}，${aim}。${fileNote}`,
    source: "craft",
    outputLanguage: language === "en" ? "English" : "Chinese",
    tags: [title, basedOn].filter(Boolean),
    basedOn,
    units,
    files,
  };
}
