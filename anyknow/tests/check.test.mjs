import assert from "node:assert/strict";
import test from "node:test";
import { generateFlashcardBoard, generateQuizBoard } from "../src/domain/check.mjs";

test("quiz board is CN, grounded, and cites 公开教材", () => {
  const board = generateQuizBoard({
    topic: "[chip:pack] 微积分",
    sourceName: "3-1-defining-the-derivative.md",
    sourceText:
      "The derivative is the slope of the tangent line. Differentiability requires the limit of the difference quotient. Use the power rule on polynomials.",
  });
  assert.equal(board.kind, "quiz");
  assert.equal(board.topic, "微积分");
  assert.equal(board.basedOn, "3-1-defining-the-derivative.md");
  assert.equal(board.questions.length, 2);
  assert.match(board.questions[0].prompt, /核心/);
  assert.match(board.questions[0].choices[1], /derivative|tangent|slope/i);
  assert.match(board.questions[0].explanation, /3-1-defining-the-derivative/);
  assert.match(board.questions[1].prompt, /公开教材/);
  assert.doesNotMatch(JSON.stringify(board), /License:|What is the central idea|hyperknow|orbie/i);
});

test("flashcards are CN fronts grounded in the excerpt", () => {
  const board = generateFlashcardBoard({
    topic: "[chip:explain] 微积分",
    sourceName: "2-2-the-limit-of-a-function.md",
    sourceText: "A limit describes the value a function approaches. One-sided limits can disagree at a jump.",
  });
  assert.equal(board.kind, "flashcards");
  assert.equal(board.basedOn, "2-2-the-limit-of-a-function.md");
  assert.equal(board.cards.length, 3);
  assert.match(board.cards[0].front, /定义/);
  assert.match(board.cards[0].back, /limit|approaches/i);
  assert.match(board.cards[2].front, /易错/);
  assert.doesNotMatch(JSON.stringify(board), /License:|When do I use this|hyperknow|orbie/i);
});
