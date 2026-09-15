/** Hyperknow Study History: Conversations vs Deep learn sessions. */

import { dayKey } from "./streak.mjs";

export const HISTORY_TABS = ["conversations", "sessions"];
export const HISTORY_RANGES = ["all", "today", "week", "month", "earlier"];
export const HISTORY_GROUPS = ["today", "week", "month", "earlier"];

export const HISTORY_EMPTY = Object.freeze({
  conversations: "没有符合条件的对话。",
  sessions: "没有符合条件的深度学习课堂。",
  conversationsEn: "No conversations match your filters.",
  sessionsEn: "No sessions match your filters.",
});

export const HISTORY_GROUP_LABEL = Object.freeze({
  today: "今天",
  week: "本周",
  month: "本月",
  earlier: "更早",
});

function startOfDay(now) {
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

export function historyGroup(at, now = new Date()) {
  const d = at ? new Date(at) : new Date(0);
  if (Number.isNaN(d.getTime())) return "earlier";
  const today = startOfDay(now);
  const week = new Date(today);
  week.setDate(today.getDate() - today.getDay());
  const month = new Date(now.getFullYear(), now.getMonth(), 1);
  if (d >= today) return "today";
  if (d >= week) return "week";
  if (d >= month) return "month";
  return "earlier";
}

export function relativeStamp(at, now = new Date()) {
  if (!at) return "";
  const d = new Date(at);
  if (Number.isNaN(d.getTime())) return "";
  const days = Math.floor((startOfDay(now) - startOfDay(d)) / 86400000);
  if (days <= 0) return "今天";
  if (days === 1) return "昨天";
  if (days < 7) return `${days}天前`;
  if (days < 28) return `${Math.floor(days / 7)}周前`;
  return dayKey(d);
}

export function conversationMessages(conv = {}) {
  if (Array.isArray(conv.messages)) {
    return conv.messages.map((m) => ({
      role: m.role === "user" ? "user" : "assistant",
      text: String(m.text || m.content || ""),
      trace: m.trace || "",
      sources: Array.isArray(m.sources) ? m.sources : [],
      worked: m.worked || null,
      ask: m.ask || null,
      digest: m.digest || null,
      plan: m.plan || null,
      content: m.content || null,
      quiz: m.quiz || null,
      flashcards: m.flashcards || null,
      cheatsheet: m.cheatsheet || null,
      nextSteps: m.nextSteps || m.next_steps || null,
      learningProgress: m.learningProgress || m.learning_progress || null,
      diagram: m.diagram || null,
    }));
  }
  const text = String(conv.text || "").trim();
  if (!text && !conv.title) return [];
  const msgs = [];
  if (conv.title) msgs.push({ role: "user", text: String(conv.title), trace: "", sources: [] });
  if (text) msgs.push({ role: "assistant", text, trace: conv.trace || "", sources: conv.sources || [] });
  return msgs;
}

export function appendConversationTurn(conv = {}, { question = "", answer = "", trace = "", sources = [], worked = null, ask = null, digest = null, plan = null, content = null, quiz = null, flashcards = null, cheatsheet = null, nextSteps = null, learningProgress = null, diagram = null } = {}) {
  const q = String(question || "").trim();
  const a = String(answer || "").trim();
  const messages = conversationMessages(conv);
  if (q) {
    messages.push({
      role: "user",
      text: q,
      trace: "",
      sources: [],
      worked: null,
      ask: null,
      digest: null,
      plan: null,
      content: null,
      quiz: null,
      flashcards: null,
      cheatsheet: null,
      nextSteps: null,
      learningProgress: null,
      diagram: null,
    });
  }
  if (a) {
    messages.push({
      role: "assistant",
      text: a,
      trace,
      sources: Array.isArray(sources) ? sources : [],
      worked: worked || null,
      ask: ask || null,
      digest: digest || null,
      plan: plan || null,
      content: content || null,
      quiz: quiz || null,
      flashcards: flashcards || null,
      cheatsheet: cheatsheet || null,
      nextSteps: nextSteps || null,
      learningProgress: learningProgress || nextSteps?.learning_progress || null,
      diagram: diagram || null,
    });
  }
  return {
    ...conv,
    title: conv.title || q.slice(0, 48),
    text: a || conv.text || "",
    trace: trace || conv.trace || "",
    sources: sources || conv.sources || [],
    worked: worked || conv.worked || null,
    ask: ask || null,
    digest: digest || null,
    plan: plan || null,
    content: content || null,
    quiz: quiz || null,
    flashcards: flashcards || null,
    cheatsheet: cheatsheet || null,
    nextSteps: nextSteps || null,
    next_steps: nextSteps || null,
    learningProgress: learningProgress || nextSteps?.learning_progress || null,
    learning_progress: learningProgress || nextSteps?.learning_progress || null,
    diagram: diagram || conv.diagram || null,
    messages,
    at: new Date().toISOString(),
  };
}

export function resumeHref(item, tab = "conversations") {
  if (!item) return "/";
  if (tab === "sessions" || item.kind === "session") {
    return `/deep-learn-session/${item.courseId || item.id}`;
  }
  return `/response/${item.id}`;
}

export function setStarred(items = [], id, starred) {
  const sid = String(id || "");
  if (!sid) {
    const err = new Error("找不到该记录。");
    err.code = "STAR_NOT_FOUND";
    throw err;
  }
  let found = false;
  const next = items.map((item) => {
    if (item.id !== sid && item.courseId !== sid) return item;
    found = true;
    return { ...item, starred: Boolean(starred) };
  });
  if (!found) {
    const err = new Error("找不到该记录。");
    err.code = "STAR_NOT_FOUND";
    throw err;
  }
  return next;
}

export function setSessionStar(ids = [], id, starred) {
  const sid = String(id || "");
  if (!sid) {
    const err = new Error("找不到该记录。");
    err.code = "STAR_NOT_FOUND";
    throw err;
  }
  const set = new Set((ids || []).map(String));
  if (starred) set.add(sid);
  else set.delete(sid);
  return [...set];
}

export function isSessionStarred(ids = [], id) {
  return (ids || []).map(String).includes(String(id || ""));
}

export function historyState({
  conversations = [],
  sessions = [],
  tab = "conversations",
  query = "",
  range = "all",
  starredOnly = false,
  now = new Date(),
} = {}) {
  if (!HISTORY_TABS.includes(tab)) throw new Error(`Unknown history tab: ${tab}`);
  if (range && !HISTORY_RANGES.includes(range)) throw new Error(`Unknown history range: ${range}`);
  const q = String(query || "").trim().toLowerCase();
  const source = tab === "sessions" ? sessions : conversations;
  let items = q
    ? source.filter((item) => String(item.title || "").toLowerCase().includes(q))
    : source.slice();
  if (starredOnly) items = items.filter((item) => item.starred);
  items = items
    .map((item) => ({
      ...item,
      group: historyGroup(item.at, now),
      relative: relativeStamp(item.at, now),
      href: resumeHref(item, tab),
      starred: Boolean(item.starred),
    }))
    .sort((a, b) => String(b.at || "").localeCompare(String(a.at || "")));
  if (range && range !== "all") {
    items = items.filter((item) => item.group === range);
  }
  const groups = HISTORY_GROUPS.map((id) => ({
    id,
    label: HISTORY_GROUP_LABEL[id],
    items: items.filter((item) => item.group === id),
  })).filter((g) => g.items.length);
  return {
    tab,
    query: q,
    range: range || "all",
    starredOnly: Boolean(starredOnly),
    items,
    groups,
    empty: items.length === 0,
    emptyCopy: tab === "sessions" ? HISTORY_EMPTY.sessions : HISTORY_EMPTY.conversations,
    newLabel: tab === "sessions" ? "新建深度学习课堂" : "新建对话",
    searchPlaceholder: tab === "sessions" ? "搜索课堂" : "搜索对话",
  };
}
