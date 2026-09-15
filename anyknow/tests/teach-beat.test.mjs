import assert from "node:assert/strict";
import test from "node:test";
import { generateContentBoard } from "../src/domain/content.mjs";
import {
  nextTeachBeat,
  parseTeachBeat,
  sliceContentBoard,
  stampTeachBeat,
  teachBeatAsk,
} from "../src/domain/teach-beat.mjs";
import { createAccount } from "../src/domain/credits.mjs";
import { createDrive } from "../src/domain/kb.mjs";
import { seedPublicTextbooks } from "../src/server/seed.mjs";
import { createHeuristicModel } from "../src/server/heuristic.mjs";
import { runInstantAssist } from "../src/agent/runtime.mjs";

test("teach beats advance 定义 → 机制例子 → 测验 and slice content", () => {
  assert.deepEqual(nextTeachBeat("定义", "继续"), { beat: "机制例子", stuck: false });
  assert.deepEqual(nextTeachBeat("机制例子", "继续"), { beat: "测验", stuck: false });
  assert.equal(nextTeachBeat("定义", "卡住了").stuck, true);
  const stamped = stampTeachBeat({ beat: "机制例子", text: "微积分" });
  assert.match(stamped, /\[beat=机制例子\]/);
  assert.equal(parseTeachBeat(stamped).beat, "机制例子");
  const ask = teachBeatAsk({ topic: "微积分", beat: "定义" });
  assert.deepEqual(ask.questions[0].options, ["继续", "卡住了"]);
  const full = generateContentBoard({ topic: "微积分", sourceText: "The derivative is slope. Limits come first. Example: x^2." });
  assert.deepEqual(sliceContentBoard(full, "定义").cards.map((c) => c.id), ["def"]);
  assert.deepEqual(sliceContentBoard(full, "机制例子").cards.map((c) => c.id), ["mech", "ex"]);
});

test("explain stamp lands 定义 only and pauses before quiz", async () => {
  const drive = seedPublicTextbooks(createDrive({ ownerId: "gate-oer" }));
  const account = createAccount({ email: "gate@anyknow.test", password: "x", credits: 20 });
  const { result } = await runInstantAssist({
    account,
    question: "[chip:explain] [stamp level=入门 style=直觉图像 focus=核心定义] 微积分",
    drive,
    model: createHeuristicModel(),
  });
  const content = result.toolResults.find((t) => t.name === "generate_content")?.result;
  assert.deepEqual(content.cards.map((c) => c.id), ["def"]);
  const ask = result.toolResults.find((t) => t.name === "ask_questions")?.result;
  assert.equal(ask.chip, "teach");
  assert.ok(!result.toolResults.some((t) => t.name === "generate_quiz"));
  assert.ok(!result.toolResults.some((t) => t.name === "recommend_next_step"));
});
