import assert from "node:assert/strict";
import test from "node:test";
import {
  applyPlanTaskAction,
  buildPlannerTasks,
  mergeConfirmedPlanTask,
  parsePlanStamp,
  planAskBoard,
  planAskReady,
  stampPlanMode,
} from "../src/domain/plan-mode.mjs";
import { createHeuristicModel } from "../src/server/heuristic.mjs";
import { createAssistAgent, runInstantAssist } from "../src/agent/runtime.mjs";
import { createAccount } from "../src/domain/credits.mjs";
import { createDrive } from "../src/domain/kb.mjs";
import { seedPublicTextbooks } from "../src/server/seed.mjs";

test("plan stamp round-trips 范围 / 投入 / 目标", () => {
  const stamped = stampPlanMode({
    scope: "本章节",
    hours: "每周3小时",
    goal: "过关",
    text: "微积分",
  });
  assert.match(stamped, /\[stamp scope=本章节 hours=每周3小时 goal=过关\]/);
  const parsed = parsePlanStamp(`[chip:plan] ${stamped}`);
  assert.equal(parsed.ready, true);
  assert.equal(parsed.topic, "微积分");
  assert.equal(planAskReady(parsed), true);
  const ask = planAskBoard({ topic: "微积分" });
  assert.equal(ask.chip, "plan");
  assert.deepEqual(
    ask.questions.map((q) => q.id),
    ["scope", "hours", "goal"],
  );
});

test("planner tasks stay pending until accept merges into the existing feed", () => {
  const tasks = buildPlannerTasks({
    topic: "微积分",
    scope: "本章节",
    hours: "每周3小时",
    goal: "过关",
    now: new Date("2026-09-07T12:00:00Z"),
  });
  assert.equal(tasks.length, 3);
  assert.ok(tasks.every((t) => t.status === "pending"));
  assert.match(tasks[0].title, /微积分/);
  const plan = { kind: "plan", topic: "微积分", tasks };
  const accepted = applyPlanTaskAction(plan, tasks[0].taskId, "accept");
  assert.equal(accepted.tasks[0].status, "accepted");
  const rejected = applyPlanTaskAction(plan, tasks[1].taskId, "reject");
  assert.equal(rejected.tasks[1].status, "rejected");
  const adjusted = applyPlanTaskAction(plan, tasks[2].taskId, "adjust", { now: new Date("2026-09-07T12:00:00Z") });
  assert.equal(adjusted.tasks[2].status, "pending");
  assert.notEqual(adjusted.tasks[2].dueAt, tasks[2].dueAt);
  const existing = { tasks: [{ taskId: "keep-me", title: "Keep", status: "pending" }] };
  const merged = mergeConfirmedPlanTask(existing, accepted.tasks[0]);
  assert.equal(merged.tasks[0].taskId, "keep-me");
  assert.equal(merged.tasks[1].status, "accepted");
  assert.doesNotMatch(JSON.stringify({ plan, merged }), /google calendar|googleapis.com\/calendar/i);
});

test("plan chip asks first, then generate_main_tasks without dumping the feed", async () => {
  const drive = seedPublicTextbooks(createDrive({ ownerId: "plan-oer" }));
  const account = createAccount({ email: "plan-ask@anyknow.test", password: "x", credits: 20 });
  const model = createHeuristicModel();
  const asked = await runInstantAssist({
    account,
    question: "[chip:plan] 微积分",
    drive,
    model,
  });
  assert.equal(asked.result.toolResults[0].name, "ask_questions");
  assert.equal(asked.result.toolResults[0].result.chip, "plan");
  const planned = await runInstantAssist({
    account: asked.account,
    question: "[chip:plan] [stamp scope=本章节 hours=每周3小时 goal=过关] 微积分",
    drive,
    model,
  });
  assert.equal(planned.result.toolResults[0].name, "generate_main_tasks");
  const plan = planned.result.toolResults[0].result;
  assert.ok(plan.tasks.length >= 3);
  assert.ok(plan.tasks.every((t) => t.status === "pending"));
  assert.match(planned.result.text, /待确认|学习动态/);
  const mitosis = await createAssistAgent({ model }).generate("explanation of mitosis");
  assert.ok(!mitosis.toolResults.some((t) => t.name === "generate_main_tasks"));
});
