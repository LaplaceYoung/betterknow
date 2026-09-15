import assert from "node:assert/strict";
import test from "node:test";
import { generateDiagramBoard } from "../src/domain/diagram.mjs";

test("diagram board is a 定义→机制 chalkboard not Mills Venn", () => {
  const board = generateDiagramBoard({
    topic: "[chip:viz] 微积分",
    sourceName: "3-1-defining-the-derivative.md",
    sourceText:
      "The derivative is the slope of the tangent line. Differentiability requires the limit of the difference quotient.",
  });
  assert.equal(board.kind, "diagram");
  assert.match(board.svg, /<svg/);
  assert.match(board.svg, /定义/);
  assert.match(board.svg, /机制/);
  assert.equal(board.basedOn, "3-1-defining-the-derivative.md");
  assert.ok(board.walkthrough.length >= 3);
  assert.doesNotMatch(board.svg, /biography|history/);
  assert.doesNotMatch(JSON.stringify(board), /Draw the two circles|hyperknow|orbie/i);
});
