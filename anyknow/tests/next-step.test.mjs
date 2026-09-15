import assert from "node:assert/strict";
import test from "node:test";
import { recommendNextSteps } from "../src/domain/next-step.mjs";
import { createAccount } from "../src/domain/credits.mjs";
import { createDrive } from "../src/domain/kb.mjs";
import { seedPublicTextbooks } from "../src/server/seed.mjs";
import { createHeuristicModel } from "../src/server/heuristic.mjs";
import { runInstantAssist } from "../src/agent/runtime.mjs";

test("recommend_next_step returns three cards and 已讲过/当前/下一轮", () => {
  const board = recommendNextSteps({
    topic: "[chip:explain] 微积分",
    just: "search_files,read_files,generate_content,generate_quiz,generate_flashcards",
  });
  assert.equal(board.kind, "next_steps");
  assert.equal(board.steps.length, 3);
  assert.ok(!board.steps.some((s) => s.id === "flashcards"));
  assert.ok(board.steps.some((s) => s.id === "whiteboard"));
  assert.ok(board.steps.some((s) => s.id === "solve"));
  assert.ok(board.learning_progress.done);
  assert.ok(board.learning_progress.current);
  assert.ok(board.learning_progress.next);
  assert.ok(board.steps.every((s) => s.step_prompt && s.label));
  assert.doesNotMatch(JSON.stringify(board), /hyperknow|orbie|Course notes/i);
});

test("assist teach-check is followed by recommend_next_step", async () => {
  const drive = seedPublicTextbooks(createDrive({ ownerId: "next-step" }));
  const account = createAccount({ email: "next@anyknow.test", password: "x", credits: 20 });
  const { result } = await runInstantAssist({
    account,
    question: "微积分",
    drive,
    model: createHeuristicModel(),
  });
  assert.ok(result.toolResults.some((t) => t.name === "generate_content"));
  const closer = result.toolResults.find((t) => t.name === "recommend_next_step")?.result;
  assert.ok(closer);
  assert.equal(closer.steps.length, 3);
  assert.match(closer.learning_progress.done, /定义|微积分/);
});
