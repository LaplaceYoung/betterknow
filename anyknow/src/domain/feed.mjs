import { approveFeedTasks, skipAndRedistribute } from "./plan.mjs";
import { dayKey } from "./streak.mjs";

export const FEED_VIEWS = ["confirmed", "pending"];
export const FEED_CALS = ["week", "month"];

export const FEED_EMPTY = Object.freeze({
  today: "今天没有任务",
  done: "完成的任务会显示在这里",
  pending: "没有待处理任务",
});

export function feedBoard(feed, { view = "pending", now = new Date() } = {}) {
  if (!FEED_VIEWS.includes(view)) throw new Error(`Unknown feed view: ${view}`);
  const tasks = feed?.tasks || [];
  const today = dayKey(now);
  const pending = tasks.filter((t) => t.status === "pending");
  const confirmed = tasks.filter((t) => t.status === "accepted" || t.status === "confirmed");
  const skipped = tasks.filter((t) => t.status === "skipped");
  const shown = view === "confirmed" ? confirmed : pending;
  const dueToday = shown.filter((t) => (t.dueAt || "").slice(0, 10) === today);
  return {
    view,
    pending,
    confirmed,
    shown,
    dueToday,
    duesCount: dueToday.length,
    taskCount: shown.length,
    emptyToday: dueToday.length === 0,
    skipped,
    emptyCopy: view === "pending" ? FEED_EMPTY.pending : FEED_EMPTY.today,
    emptyDone: FEED_EMPTY.done,
  };
}

export function monthBoard(tasks = [], { now = new Date() } = {}) {
  const y = now.getFullYear();
  const m = now.getMonth();
  const first = new Date(y, m, 1);
  const start = new Date(first);
  start.setDate(1 - first.getDay());
  const today = dayKey(now);
  const cells = [];
  for (let i = 0; i < 42; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    const date = dayKey(d);
    const dayTasks = tasks.filter(
      (t) => (t.dueAt || "").slice(0, 10) === date && t.status !== "skipped",
    );
    cells.push({
      date,
      day: d.getDate(),
      inMonth: d.getMonth() === m,
      isToday: date === today,
      count: dayTasks.length,
      titles: dayTasks.map((t) => t.title),
    });
  }
  return {
    year: y,
    month: m,
    label: `${y}年${m + 1}月`,
    cells,
  };
}

export { approveFeedTasks, skipAndRedistribute };
