/** Inbox: Messages / Updates (Hyperknow usr-msg-inbox analogue, no Canvas OAuth). */

import { relativeStamp } from "./history.mjs";

export const INBOX_TABS = ["messages", "updates"];
export const INBOX_EMPTY = Object.freeze({
  messages: "暂无消息。",
  updates: "课程相关动态将显示在此处。",
  missing: "找不到该消息。",
});

export function inboxBoard(
  inbox = { messages: [], updates: [] },
  { tab = "messages", filter = "all", now = new Date() } = {},
) {
  if (!INBOX_TABS.includes(tab)) throw new Error(`Unknown inbox tab: ${tab}`);
  const source = tab === "updates" ? inbox.updates || [] : inbox.messages || [];
  const unread = source.filter((m) => !m.read);
  const shown = (filter === "unread" ? unread : source).map((m) => ({
    ...m,
    relative: relativeStamp(m.createdAt || m.created_at, now),
    href: `/inbox/message/${m.id}`,
  }));
  return {
    tab,
    filter,
    shown,
    unreadCount: unread.length,
    empty: shown.length === 0,
    emptyCopy: tab === "updates" ? INBOX_EMPTY.updates : INBOX_EMPTY.messages,
  };
}

export function findMessage(inbox = {}, id) {
  const all = [...(inbox.messages || []), ...(inbox.updates || [])];
  return all.find((m) => m.id === id) || null;
}

export function markInboxRead(inbox = { messages: [], updates: [] }, ids = []) {
  const set = new Set(ids);
  const bump = (arr) => (arr || []).map((m) => (set.has(m.id) ? { ...m, read: true } : m));
  return {
    messages: bump(inbox.messages),
    updates: bump(inbox.updates),
  };
}

export function seedInbox(now = new Date()) {
  return {
    messages: [
      {
        id: "msg-welcome",
        title: "欢迎来到 simo know",
        body: "这是你的收件箱。课程提醒和学习动态会显示在这里。",
        createdAt: now.toISOString(),
        read: false,
        sender: "simo know",
      },
    ],
    updates: [],
  };
}
