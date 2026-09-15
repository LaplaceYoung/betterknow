import assert from "node:assert/strict";
import test from "node:test";
import {
  SHARE,
  parseSharedConversation,
  sharedConversationState,
  sharedCourseState,
} from "../src/domain/share.mjs";

test("shared conversation parser drops system/tool internals", () => {
  const parsed = parseSharedConversation({
    title: "PONG",
    history: [
      { role: "system", content: "You are the directing agent for Hyperknow." },
      { role: "user", content: JSON.stringify({ type: "user_message", message: "Reply with exactly: PONG" }) },
      { role: "tool", tool_name: "generate_content", result: { result: { content: "PONG" } } },
    ],
  });
  assert.equal(parsed.empty, false);
  assert.equal(parsed.messages.length, 2);
  assert.equal(parsed.messages[0].role, "user");
  assert.equal(parsed.messages[0].text, "Reply with exactly: PONG");
  assert.equal(parsed.messages[1].text, "PONG");
  assert.doesNotMatch(JSON.stringify(parsed), /Hyperknow|directing agent/i);
});

test("leftover quicksort share dump paints user-facing text", () => {
  const board = sharedConversationState({ id: "quicksort" });
  assert.equal(board.ok, true);
  assert.match(board.title, /Quicksort/i);
  assert.match(board.messages[0].text, /quicksort partitions/i);
  assert.match(board.messages[1].text, /pivot/i);
  assert.doesNotMatch(JSON.stringify(board), /Hyperknow|Orbie|#YOUR ROLE/i);
});

test("missing share conversation uses Hyperknow fail copy", () => {
  const miss = sharedConversationState({ id: "nope" });
  assert.equal(miss.ok, false);
  assert.equal(miss.title, SHARE.loadFailedTitle);
  assert.equal(miss.body, SHARE.loadFailedBody);
});

test("leftover shared course paints overview without generate", () => {
  const board = sharedCourseState({ id: "mkt-sociology" });
  assert.equal(board.ok, true);
  assert.match(board.title, /Sociology|社会学/i);
  assert.ok(board.units.length >= 1);
});
