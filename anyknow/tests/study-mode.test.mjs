import assert from "node:assert/strict";
import test from "node:test";
import {
  parseStudyStamp,
  stampStudyMode,
  studyAskBoard,
  studyAskReady,
  stripStudyStamp,
} from "../src/domain/study-mode.mjs";

test("study stamp round-trips level, style, and focus", () => {
  const stamped = stampStudyMode({
    level: "入门",
    style: "直觉图像",
    focus: "核心定义",
    text: "微积分",
  });
  assert.match(stamped, /\[stamp level=入门 style=直觉图像 focus=核心定义\]/);
  assert.match(stamped, /微积分/);
  const parsed = parseStudyStamp(`[chip:explain] ${stamped}`);
  assert.equal(parsed.ready, true);
  assert.equal(parsed.level, "入门");
  assert.equal(parsed.style, "直觉图像");
  assert.equal(parsed.focus, "核心定义");
  assert.equal(parsed.topic, "微积分");
  assert.equal(stripStudyStamp(stamped), "微积分");
  assert.equal(studyAskReady(parsed), true);
  assert.equal(studyAskReady({ level: "入门" }), false);
});

test("ask_questions board lists 程度 / 讲法 / 重点 without dumping licenses", () => {
  const ask = studyAskBoard({ topic: "[chip:explain] 用粉笔把这个概念讲清楚：微积分" });
  assert.equal(ask.kind, "ask");
  assert.equal(ask.topic, "微积分");
  assert.deepEqual(
    ask.questions.map((q) => q.id),
    ["level", "style", "focus"],
  );
  assert.match(ask.prompt, /先选程度、讲法和重点/);
  assert.doesNotMatch(ask.prompt, /已检索公开教材|License:/);
  assert.doesNotMatch(JSON.stringify(ask), /hyperknow|orbie/i);
});
