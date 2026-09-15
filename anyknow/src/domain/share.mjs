/** Shared conversation / course pages (no system prompts, no Hyperknow marks). */

import { SHARE_CONVERSATIONS, SHARE_COURSES } from "./share-catalog.mjs";

export const SHARE = Object.freeze({
  copyLink: "复制链接",
  copied: "已复制！",
  noConversationContent: "暂无对话内容",
  emptyHistory: "暂无对话记录。",
  loadFailedTitle: "对话加载失败",
  loadFailedBody: "该对话不存在，或链接无效",
  startLearningJourney: "开启属于你的学习之旅",
  untitledConversation: "无标题对话",
  courseShareTitle: "分享此课程",
  courseShareSubtitle: "仅会分享课程概览。",
  courseLoadFailedTitle: "课程加载失败",
  courseLoadFailedBody: "该课程不存在，或链接无效",
});

function stripMarkup(text) {
  return String(text || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/\$([a-zA-Z])\$/g, "$1")
    .replace(/https?:\/\/\S*hyperknow\S*/gi, "")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function parseUserContent(content) {
  const raw = String(content || "").trim();
  if (!raw) return "";
  if (raw.startsWith("{") && raw.includes("user_message")) {
    try {
      const obj = JSON.parse(raw);
      return String(obj.message || "").trim();
    } catch {
      return raw;
    }
  }
  return raw;
}

export function parseSharedConversation(raw = {}) {
  if (Array.isArray(raw.messages) && raw.messages.length) {
    const messages = raw.messages
      .map((row) => ({
        role: row.role === "user" ? "user" : "assistant",
        text: stripMarkup(row.text || row.content || ""),
      }))
      .filter((row) => row.text && !/hyperknow|orbie/i.test(row.text));
    return {
      id: String(raw.id || raw.conversation_id || ""),
      title: String(raw.title || "").trim() || SHARE.untitledConversation,
      messages,
      empty: messages.length === 0,
    };
  }
  const history = Array.isArray(raw.history) ? raw.history : [];
  const messages = [];
  for (const row of history) {
    if (row.role === "system") continue;
    if (row.role === "user") {
      const text = stripMarkup(parseUserContent(row.content));
      if (text) messages.push({ role: "user", text });
      continue;
    }
    if (row.role === "tool" && row.tool_name === "generate_content") {
      const body = row.result?.result?.content || row.result?.content || "";
      const text = stripMarkup(body);
      if (text && !/hyperknow|orbie/i.test(text)) messages.push({ role: "assistant", text });
      continue;
    }
    if (row.role === "assistant") {
      const text = stripMarkup(row.content || row.text || "");
      if (text && !/hyperknow|orbie/i.test(text)) messages.push({ role: "assistant", text });
    }
  }
  if (!history.length && (raw.text || raw.trace)) {
    if (raw.title) messages.push({ role: "user", text: String(raw.title) });
    const reply = stripMarkup(raw.text || "");
    if (reply) messages.push({ role: "assistant", text: reply });
  }
  return {
    id: String(raw.id || raw.conversation_id || ""),
    title: String(raw.title || "").trim() || SHARE.untitledConversation,
    messages,
    empty: messages.length === 0,
  };
}

export function parseSharedCourse(raw = {}) {
  const units = Array.isArray(raw.units)
    ? raw.units
        .map((u) => ({
          title: String(u.title || "").trim(),
          lectures: Array.isArray(u.lectures) ? u.lectures.length : Number(u.lectures || u.lecturesCount || 0) || 0,
        }))
        .filter((u) => u.title)
    : [];
  return {
    id: String(raw.id || raw.courseId || ""),
    title: String(raw.title || raw.courseTitle || "").trim(),
    description: String(raw.description || raw.courseDescription || "").trim(),
    units,
  };
}

export function sharedConversationState({
  id = "",
  conversations = [],
  leftovers = SHARE_CONVERSATIONS,
} = {}) {
  const key = String(id || "").trim();
  if (!key) {
    return { ok: false, empty: true, title: SHARE.loadFailedTitle, body: SHARE.loadFailedBody, messages: [] };
  }
  const live = (Array.isArray(conversations) ? conversations : []).find((c) => c.id === key);
  const dump = (Array.isArray(leftovers) ? leftovers : []).find((c) => c.id === key);
  const raw = live || dump;
  if (!raw) {
    return { ok: false, empty: true, title: SHARE.loadFailedTitle, body: SHARE.loadFailedBody, messages: [] };
  }
  const parsed = parseSharedConversation(raw);
  if (parsed.empty) {
    return { ok: true, empty: true, title: parsed.title, body: SHARE.emptyHistory, messages: [] };
  }
  return { ok: true, empty: false, title: parsed.title, body: "", messages: parsed.messages, id: parsed.id };
}

export function sharedCourseState({
  id = "",
  courses = [],
  leftovers = SHARE_COURSES,
} = {}) {
  const key = String(id || "").trim();
  if (!key) {
    return { ok: false, empty: true, title: SHARE.courseLoadFailedTitle, body: SHARE.courseLoadFailedBody, units: [] };
  }
  const live = (Array.isArray(courses) ? courses : []).find((c) => (c.courseId || c.id) === key);
  const dump = (Array.isArray(leftovers) ? leftovers : []).find((c) => c.id === key);
  const raw = live
    ? {
        id: live.courseId || live.id,
        title: live.title,
        description: live.description,
        units: (live.units || []).map((u) => ({ title: u.title, lectures: (u.lectures || []).length })),
      }
    : dump;
  if (!raw) {
    return { ok: false, empty: true, title: SHARE.courseLoadFailedTitle, body: SHARE.courseLoadFailedBody, units: [] };
  }
  const parsed = parseSharedCourse(raw);
  return { ok: true, empty: false, ...parsed, subtitle: SHARE.courseShareSubtitle };
}
