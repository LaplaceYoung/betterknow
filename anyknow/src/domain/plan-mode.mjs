/** Instant Assist 学习规划: ask 考试范围 / 每周投入 / 目标, then pending task cards. */

import { stripAssistPrefix } from "./kb.mjs";

export const PLAN_SCOPES = Object.freeze(["本章节", "本单元", "整门课"]);
export const PLAN_HOURS = Object.freeze(["每天1小时", "每周3小时", "每周10小时"]);
export const PLAN_GOALS = Object.freeze(["过关", "拿高分", "真正学会"]);

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

export function parsePlanStamp(text = "") {
  const raw = String(text || "");
  const attrs = attrsFrom(raw);
  const scope = PLAN_SCOPES.includes(attrs.scope) ? attrs.scope : "";
  const hours = PLAN_HOURS.includes(attrs.hours) ? attrs.hours : "";
  const goal = PLAN_GOALS.includes(attrs.goal) ? attrs.goal : "";
  return {
    ready: Boolean(scope && hours && goal),
    scope,
    hours,
    goal,
    topic: stripAssistPrefix(raw.replace(STAMP_RE, "")),
  };
}

export function stampPlanMode({ scope = "", hours = "", goal = "", text = "" } = {}) {
  const parts = [];
  if (PLAN_SCOPES.includes(scope)) parts.push(`scope=${scope}`);
  if (PLAN_HOURS.includes(hours)) parts.push(`hours=${hours}`);
  if (PLAN_GOALS.includes(goal)) parts.push(`goal=${goal}`);
  const body = stripAssistPrefix(String(text || "").replace(STAMP_RE, ""));
  return parts.length ? `[stamp ${parts.join(" ")}] ${body}`.trim() : body;
}

export function planAskReady(pick = {}) {
  return Boolean(
    PLAN_SCOPES.includes(pick.scope) && PLAN_HOURS.includes(pick.hours) && PLAN_GOALS.includes(pick.goal),
  );
}

export function planAskBoard({ topic = "" } = {}) {
  const subject = stripAssistPrefix(String(topic || "").replace(STAMP_RE, "")).slice(0, 80) || "这一课";
  return {
    kind: "ask",
    chip: "plan",
    topic: subject,
    prompt: `先选范围、投入和目标，再排出「${subject}」的学习任务。接受的才会写进学习动态。`,
    questions: [
      { id: "scope", label: "考试范围", options: [...PLAN_SCOPES] },
      { id: "hours", label: "每周投入", options: [...PLAN_HOURS] },
      { id: "goal", label: "目标", options: [...PLAN_GOALS] },
    ],
  };
}

function dayPlus(now, n) {
  const d = new Date(now);
  d.setDate(d.getDate() + Math.max(0, n));
  return d.toISOString().slice(0, 10);
}

export function buildPlannerTasks({ topic = "", scope = "本章节", hours = "每周3小时", goal = "过关", now = new Date() } = {}) {
  const subject = stripAssistPrefix(topic).slice(0, 80) || "这一课";
  const span = scope === "整门课" ? "整门课" : scope === "本单元" ? "这一单元" : "这一节";
  const aim = goal === "拿高分" ? "按考试拿分" : goal === "真正学会" ? "真正学会" : "先过关";
  const gap = hours === "每天1小时" ? 1 : hours === "每周10小时" ? 2 : 3;
  const count = hours === "每天1小时" ? 5 : hours === "每周10小时" ? 4 : 3;
  const verbs = [
    `通读${span}「${subject}」大纲（${aim}）`,
    `做一道「${subject}」代表题`,
    `写出「${subject}」速查要点`,
    `复盘「${subject}」易错`,
    `限时自测「${subject}」`,
  ];
  return verbs.slice(0, count).map((title, i) => ({
    taskId: `plan_${Date.now().toString(36)}_${i + 1}`,
    title,
    dueAt: dayPlus(now, gap * (i + 1)),
    source: "planner",
    status: "pending",
    kind: "main_task",
    order: i + 1,
  }));
}

export function planTasksBoard({ topic = "", tasks = [], scope = "", hours = "", goal = "" } = {}) {
  const subject = stripAssistPrefix(topic).slice(0, 80) || "学习规划";
  return {
    kind: "plan",
    topic: subject,
    scope,
    hours,
    goal,
    tasks: (tasks || []).map((t, i) => ({
      taskId: String(t.taskId || t.id || `plan_${i + 1}`),
      title: t.title || `任务 ${i + 1}`,
      dueAt: t.dueAt || "",
      status: t.status || "pending",
      source: t.source || "planner",
      kind: t.kind || "main_task",
      order: t.order || i + 1,
    })),
  };
}

export function applyPlanTaskAction(plan = {}, taskId = "", action = "accept", { now = new Date() } = {}) {
  const id = String(taskId || "");
  const tasks = (plan.tasks || []).map((t) => {
    if (String(t.taskId) !== id) return t;
    if (action === "reject") return { ...t, status: "rejected" };
    if (action === "adjust") {
      const d = new Date(`${t.dueAt || dayPlus(now, 1)}T12:00:00`);
      if (!Number.isNaN(d.getTime())) d.setDate(d.getDate() + 7);
      return { ...t, status: "pending", dueAt: Number.isNaN(d.getTime()) ? dayPlus(now, 7) : d.toISOString().slice(0, 10), adjusted: true };
    }
    return { ...t, status: "accepted" };
  });
  return { ...plan, tasks };
}

export function mergeConfirmedPlanTask(feed = { tasks: [] }, task = {}) {
  const id = String(task.taskId || task.id || "").trim();
  if (!id) return feed;
  const next = {
    ...task,
    taskId: id,
    status: "accepted",
    kind: task.kind || "main_task",
  };
  const tasks = [...(feed.tasks || [])];
  const i = tasks.findIndex((t) => String(t.taskId) === id);
  if (i >= 0) tasks[i] = { ...tasks[i], ...next };
  else tasks.push(next);
  return {
    ...feed,
    generatedAt: feed.generatedAt || new Date().toISOString(),
    tasks,
    pendingCount: tasks.filter((t) => t.status === "pending").length,
  };
}
