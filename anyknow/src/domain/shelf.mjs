/** Hyperknow “我的课程” shelf: filters, search, empty-state copy. */

export const SHELF_FILTERS = ["all", "inProgress", "completed"];

export const EMPTY_SHELF = Object.freeze({
  title: "你的课程架暂时是空的",
  body: "生成你的第一门课程，或去课程市场逛逛，开始学习吧。",
  ctaCraft: "打造课程",
  ctaMarket: "去课程集市",
});

export function courseProgressKind(course) {
  if (!course?.joined) return "notStarted";
  const sessions = Object.values(course.progress?.sessions || {});
  if (!sessions.length) return "inProgress";
  const done = sessions.every((s) => s.state === "mastered" || s.completed);
  return done ? "completed" : "inProgress";
}

export function courseShelfState(courses, { filter = "all", query = "" } = {}) {
  if (filter && !SHELF_FILTERS.includes(filter)) {
    throw new Error(`Unknown shelf filter: ${filter}`);
  }
  const list = Array.isArray(courses) ? courses : [];
  const q = String(query || "").trim().toLowerCase();
  let items = list;
  if (filter === "inProgress") {
    items = items.filter((c) => courseProgressKind(c) === "inProgress");
  } else if (filter === "completed") {
    items = items.filter((c) => courseProgressKind(c) === "completed");
  }
  if (q) {
    items = items.filter((c) => String(c.title || "").toLowerCase().includes(q));
  }
  return {
    empty: list.length === 0,
    emptyFiltered: items.length === 0,
    filter,
    query: q,
    items,
    copy: EMPTY_SHELF,
  };
}
