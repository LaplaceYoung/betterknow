import assert from "node:assert/strict";
import test from "node:test";
import {
  craftAskBoard,
  craftAskReady,
  craftCourseTree,
  parseCraftStamp,
  stampCraftMode,
} from "../src/domain/craft-mode.mjs";
import { craftPayloadFromGoal } from "../src/agent/tools.mjs";
import { createHeuristicModel } from "../src/server/heuristic.mjs";
import { runInstantAssist } from "../src/agent/runtime.mjs";
import { createAccount } from "../src/domain/credits.mjs";
import { createDrive } from "../src/domain/kb.mjs";
import { seedPublicTextbooks } from "../src/server/seed.mjs";
import { parseBlueprint } from "../src/domain/blueprint.mjs";

test("craft stamp asks 先修/侧重/目标/规模 then builds a KB tree without Foundations", () => {
  const stamped = stampCraftMode({
    prereq: "零基础",
    emphasis: "直觉图像",
    goal: "过关",
    scale: "一门课",
    text: "微积分",
  });
  const parsed = parseCraftStamp(`[chip:craft] ${stamped}`);
  assert.equal(parsed.ready, true);
  assert.equal(craftAskReady(parsed), true);
  const ask = craftAskBoard({ topic: "微积分" });
  assert.equal(ask.chip, "craft");
  assert.deepEqual(
    ask.questions.map((q) => q.id),
    ["prereq", "emphasis", "goal", "scale"],
  );
  const tree = craftCourseTree({
    topic: "微积分",
    ...parsed,
    sourceName: "4-10-antiderivatives.md",
    sourceText: "An antiderivative of f is F such that F' = f.",
  });
  assert.equal(tree.units[0].lectures[0].sessions[0].sessionId, undefined);
  assert.notEqual(tree.units[0].title, "Foundations");
  assert.ok(!tree.units.some((u) => u.title === "Application"));
  assert.match(tree.courseTitle, /微积分/);
  assert.match(tree.courseDescription, /4-10-antiderivatives/);
  assert.doesNotMatch(JSON.stringify(tree), /Foundations|Linear Regression|hyperknow|orbie/i);
  const board = parseBlueprint(tree);
  assert.ok(board.sessionCount >= 4);
});

test("craftPayloadFromGoal no longer emits the Foundations/Application template", () => {
  const payload = craftPayloadFromGoal("线性回归从直觉到实践", "zh");
  assert.equal(payload.units[0].lectures[0].sessions[0].sessionId, undefined);
  assert.notEqual(payload.units[0].title, "Foundations");
});

test("craft chip asks first then course_generation after a stamp", async () => {
  const drive = seedPublicTextbooks(createDrive({ ownerId: "craft-oer" }));
  const account = createAccount({ email: "craft@anyknow.test", password: "x", credits: 20 });
  const model = createHeuristicModel();
  const asked = await runInstantAssist({
    account,
    question: "[chip:craft] 微积分",
    drive,
    model,
  });
  assert.equal(asked.result.toolResults[0].name, "ask_questions");
  assert.equal(asked.result.toolResults[0].result.chip, "craft");
  const built = await runInstantAssist({
    account: asked.account,
    question: "[chip:craft] [stamp prereq=零基础 emphasis=直觉图像 goal=过关 scale=一门课] 微积分",
    drive,
    model,
  });
  assert.equal(built.result.toolResults[0].name, "search_files");
  const gen = built.result.toolResults.find((t) => t.name === "course_generation")?.result;
  assert.ok(gen?.tree?.units?.length);
  assert.match(gen.tree.courseTitle, /微积分/);
  assert.doesNotMatch(JSON.stringify(gen.tree), /Foundations|Linear Regression/i);
});
