import assert from "node:assert/strict";
import test from "node:test";
import { CONTENT_LABELS, generateContentBoard } from "../src/domain/content.mjs";

test("encyclopedia board has 定义/机制/例子/自检 and an intuition diagram", () => {
  const board = generateContentBoard({
    topic: "[chip:explain] 微积分",
    sourceName: "3-1-defining-the-derivative.md",
    sourceText:
      "The derivative is the slope of the tangent line. Differentiability requires the limit of the difference quotient. Use the power rule on polynomials. Check endpoints separately.",
    level: "入门",
    style: "直觉图像",
    focus: "核心定义",
  });
  assert.equal(board.kind, "content");
  assert.equal(board.lead, "从零讲起");
  assert.deepEqual(
    board.cards.map((c) => c.id),
    ["def", "mech", "ex", "check"],
  );
  assert.equal(board.cards[0].label, CONTENT_LABELS.def);
  assert.ok(board.diagram.svg.includes("<svg"));
  assert.doesNotMatch(JSON.stringify(board), /License:|hyperknow|orbie/i);
});
