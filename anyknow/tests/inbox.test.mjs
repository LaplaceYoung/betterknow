import assert from "node:assert/strict";
import test from "node:test";
import { inboxBoard, markInboxRead, seedInbox, INBOX_EMPTY } from "../src/domain/inbox.mjs";

test("inbox board splits messages/updates and empty copy matches Hyperknow", () => {
  const empty = inboxBoard({ messages: [], updates: [] }, { tab: "messages" });
  assert.equal(empty.empty, true);
  assert.equal(empty.emptyCopy, INBOX_EMPTY.messages);
  const upd = inboxBoard({ messages: [], updates: [] }, { tab: "updates" });
  assert.equal(upd.emptyCopy, INBOX_EMPTY.updates);
  const seeded = seedInbox(new Date("2026-09-06T12:00:00"));
  const board = inboxBoard(seeded, { tab: "messages", now: new Date("2026-09-06T12:00:00") });
  assert.equal(board.shown.length, 1);
  assert.equal(board.unreadCount, 1);
  assert.equal(seeded.messages[0].title, "欢迎来到 simo know");
  assert.equal(seeded.messages[0].sender, "simo know");
  const next = markInboxRead(seeded, ["msg-welcome"]);
  assert.equal(next.messages[0].read, true);
  const unread = inboxBoard(next, { tab: "messages", filter: "unread" });
  assert.equal(unread.empty, true);
});
