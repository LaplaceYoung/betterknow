import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { ingestCourse } from "../src/domain/course.mjs";
import {
  appendConversationTurn,
  conversationMessages,
  historyState,
  HISTORY_EMPTY,
  setSessionStar,
  setStarred,
} from "../src/domain/history.mjs";
import { feedBoard, approveFeedTasks, monthBoard, skipAndRedistribute } from "../src/domain/feed.mjs";
import { outlineFromCourse, selectOutlineTask, socraticHint, unlockOutlineTask } from "../src/domain/deeplearn.mjs";
import { createAccount } from "../src/domain/credits.mjs";
import { createTutorAgent, createVisualAgent, runTutorHint, runVisualWalkthrough } from "../src/agent/runtime.mjs";
import { Agent } from "../src/agent/framework.mjs";

const sociology = JSON.parse(
  readFileSync(join(dirname(fileURLToPath(import.meta.url)), "../fixtures/sociology-course.json"), "utf8"),
);

test("history tabs empty copy matches Hyperknow", () => {
  const conv = historyState({ conversations: [], sessions: [], tab: "conversations" });
  assert.equal(conv.empty, true);
  assert.equal(conv.emptyCopy, HISTORY_EMPTY.conversations);
  const sess = historyState({
    conversations: [{ title: "Mills chat" }],
    sessions: [],
    tab: "sessions",
  });
  assert.equal(sess.empty, true);
  assert.equal(sess.emptyCopy, HISTORY_EMPTY.sessions);
  const found = historyState({
    conversations: [{ title: "Mills chat" }, { title: "OLS" }],
    tab: "conversations",
    query: "mills",
  });
  assert.equal(found.items.length, 1);
  const grouped = historyState({
    conversations: [
      { title: "today chat", at: "2026-09-06T10:00:00", id: "c1" },
      { title: "old chat", at: "2026-01-02T10:00:00", id: "c2" },
    ],
    range: "today",
    now: new Date("2026-09-06T12:00:00"),
  });
  assert.equal(grouped.items.length, 1);
  assert.equal(grouped.items[0].href, "/response/c1");
  assert.ok(grouped.groups.some((g) => g.id === "today"));
});

test("history starredOnly keeps Hyperknow empty copy and toggles stars", () => {
  const convos = [
    { id: "c1", title: "Mills chat", at: "2026-09-06T10:00:00", starred: true },
    { id: "c2", title: "OLS", at: "2026-09-06T11:00:00", starred: false },
  ];
  const starred = historyState({
    conversations: convos,
    tab: "conversations",
    starredOnly: true,
    now: new Date("2026-09-06T12:00:00"),
  });
  assert.equal(starred.items.length, 1);
  assert.equal(starred.items[0].id, "c1");
  assert.equal(starred.starredOnly, true);
  const none = historyState({
    conversations: convos.map((c) => ({ ...c, starred: false })),
    starredOnly: true,
  });
  assert.equal(none.empty, true);
  assert.equal(none.emptyCopy, HISTORY_EMPTY.conversations);
  const next = setStarred(convos, "c2", true);
  assert.equal(next[1].starred, true);
  assert.equal(convos[1].starred, false);
  const sessions = setSessionStar(["soc"], "mkt-sociology", true);
  assert.deepEqual(sessions.sort(), ["mkt-sociology", "soc"].sort());
  const dropped = setSessionStar(sessions, "soc", false);
  assert.deepEqual(dropped, ["mkt-sociology"]);
  assert.throws(() => setStarred(convos, "missing", true), /找不到该记录/);
});

test("assist conversations persist messages and append follow-up on the same id", () => {
  const first = appendConversationTurn(
    { id: "conv_1", title: "", starred: false },
    { question: "微积分", answer: "根据公开教材讲极限。", sources: [{ filename: "2-2-the-limit-of-a-function.md" }] },
  );
  assert.equal(first.id, "conv_1");
  assert.equal(first.title, "微积分");
  assert.equal(conversationMessages(first).length, 2);
  assert.equal(conversationMessages(first)[0].role, "user");
  const asked = appendConversationTurn(first, {
    question: "入门 · 直觉图像 · 核心定义",
    answer: "先选程度、讲法和重点，再开讲「微积分」。",
    ask: { kind: "ask", topic: "微积分", questions: [{ id: "level", label: "程度", options: ["入门"] }] },
  });
  assert.equal(conversationMessages(asked).at(-1).ask.kind, "ask");
  const second = appendConversationTurn(asked, { question: "导数是什么", answer: "切线斜率。" });
  assert.equal(second.id, "conv_1");
  assert.equal(second.title, "微积分");
  assert.equal(conversationMessages(second).length, 6);
  assert.equal(conversationMessages(second)[4].text, "导数是什么");
  assert.equal(conversationMessages(second).at(-1).ask, null);
  const checked = appendConversationTurn(first, {
    question: "帮我做一张两页速查表：微积分",
    answer: "按《2-2-the-limit-of-a-function.md》做好了两页速查表、课堂测验、闪卡。",
    quiz: { kind: "quiz", questions: [{ id: "q1", prompt: "核心？", choices: ["a", "b"], answer: 1 }] },
    flashcards: { kind: "flashcards", cards: [{ front: "定义", back: "极限" }] },
    cheatsheet: { kind: "cheatsheet", title: "微积分 速查表", pages: 2 },
  });
  assert.equal(conversationMessages(checked).at(-1).quiz.kind, "quiz");
  assert.equal(checked.flashcards.kind, "flashcards");
  assert.equal(checked.cheatsheet.pages, 2);
  const legacy = conversationMessages({ id: "c2", title: "Mills", text: "biography ∩ history" });
  assert.equal(legacy.length, 2);
});

test("feed board splits pending vs confirmed and approve commits", () => {
  const feed = {
    tasks: [
      { taskId: "a", title: "Mills memo", dueAt: "2026-09-06", status: "pending" },
      { taskId: "b", title: "Midterm", dueAt: "2026-10-05", status: "accepted" },
    ],
  };
  const pending = feedBoard(feed, { view: "pending", now: new Date("2026-09-06T12:00:00Z") });
  assert.equal(pending.shown.length, 1);
  assert.equal(pending.duesCount, 1);
  const confirmed = feedBoard(feed, { view: "confirmed", now: new Date("2026-09-06T12:00:00Z") });
  assert.equal(confirmed.shown[0].title, "Midterm");
  const next = approveFeedTasks(feed, ["a"]);
  assert.equal(next.tasks[0].status, "accepted");
  assert.equal(feedBoard(next, { view: "pending" }).shown.length, 0);
  const skipped = skipAndRedistribute(feed, "a", { now: new Date("2026-09-06T12:00:00Z") });
  assert.equal(skipped.tasks[0].status, "skipped");
  assert.equal(skipped.tasks[0].redistributed, true);
  assert.equal(skipped.tasks[1].dueAt, "2026-09-06");
  const month = monthBoard(feed.tasks, { now: new Date("2026-09-06T12:00:00") });
  assert.equal(month.cells.length, 42);
  assert.ok(month.cells.some((c) => c.isToday));
});

test("Deep Learn outline from course graph with prev/next", () => {
  const course = ingestCourse(sociology);
  const outline = outlineFromCourse(course);
  assert.ok(outline.tasks.length >= 2);
  assert.equal(outline.current.taskId, outline.tasks[0].taskId);
  assert.equal(outline.prevLabel, "没有上一节");
  assert.ok(outline.nextLabel);
  const second = selectOutlineTask(outline, outline.tasks[1].taskId);
  assert.equal(second.current.taskId, outline.tasks[1].taskId);
  assert.equal(second.prevLabel, outline.tasks[0].title);
  const lockedId = outline.tasks[1].taskId;
  const unlocked = unlockOutlineTask(outline, lockedId);
  assert.equal(unlocked.current.taskId, lockedId);
  assert.equal(unlocked.current.locked, false);
  const hint = socraticHint({ topic: "Mills", step: 0 });
  assert.equal(hint.withheld, true);
  assert.match(hint.hint, /现象/);
  assert.doesNotMatch(hint.hint, /答案是|the answer is/i);
  const wrapped = socraticHint({
    topic: "Give a hint, not the answer, for: 社会学想象力. step=0",
    step: 0,
  });
  assert.match(wrapped.hint, /社会学想象力/);
  assert.doesNotMatch(wrapped.hint, /Give a hint/);
  assert.match(hint.emptyCopy, /不会直接告诉你答案/);
  const grounded = socraticHint({
    topic: "极限",
    step: 0,
    sourceText: "A limit describes the value a function approaches.",
    sourceName: "2-2-the-limit-of-a-function.md",
  });
  assert.equal(grounded.retrieved, true);
  assert.match(grounded.hint, /2-2-the-limit-of-a-function/);
  assert.doesNotMatch(grounded.hint, /答案是|the answer is|A limit describes/i);
});

test("runVisualWalkthrough returns SVG through the Agent loop", async () => {
  const account = createAccount({ email: "viz@anyknow.test", password: "x", credits: 20 });
  const model = {
    generate: async ({ messages, tools }) => {
      assert.ok((tools || []).some((t) => t.id === "generate_diagram"));
      const toolTurn = messages.filter((m) => m.role === "tool").length;
      if (toolTurn === 0) {
        return { toolCalls: [{ id: "d1", name: "generate_diagram", arguments: { topic: "Mills" } }] };
      }
      return { text: "Two overlapping circles." };
    },
  };
  assert.ok(createVisualAgent({ model }) instanceof Agent);
  const { account: next, diagram } = await runVisualWalkthrough({
    account,
    prompt: "Mills sociological imagination",
    model,
  });
  assert.equal(next.credits, 17);
  assert.equal(diagram.kind, "diagram");
  assert.match(diagram.svg, /<svg/);
  assert.match(diagram.svg, /定义/);
  assert.match(diagram.svg, /机制/);
  assert.doesNotMatch(diagram.svg, /biography|history/);
  await assert.rejects(
    () =>
      runVisualWalkthrough({
        account: createAccount({ email: "z@anyknow.test", password: "x", credits: 0 }),
        prompt: "x",
        model,
      }),
    (err) => err.code === "INSUFFICIENT_CREDITS",
  );
});

test("runTutorHint uses socratic_hint on the Agent loop and withholds the answer", async () => {
  const account = createAccount({ email: "tutor@anyknow.test", password: "x", credits: 20 });
  const model = {
    generate: async ({ messages, tools }) => {
      assert.ok((tools || []).some((t) => t.id === "socratic_hint"));
      const toolTurn = messages.filter((m) => m.role === "tool").length;
      if (toolTurn === 0) {
        return { toolCalls: [{ id: "h1", name: "socratic_hint", arguments: { topic: "Mills", step: 0 } }] };
      }
      return { text: "Probe the phenomenon first." };
    },
  };
  assert.ok(createTutorAgent({ model }) instanceof Agent);
  const { account: next, hint } = await runTutorHint({
    account,
    prompt: "Give a hint for Mills",
    topic: "Mills",
    model,
  });
  assert.equal(next.credits, 18);
  assert.equal(hint.withheld, true);
  assert.doesNotMatch(hint.hint, /答案是/);
  await assert.rejects(
    () =>
      runTutorHint({
        account: createAccount({ email: "broke-tutor@anyknow.test", password: "x", credits: 0 }),
        prompt: "x",
        model,
      }),
    (err) => err.code === "INSUFFICIENT_CREDITS",
  );
});
