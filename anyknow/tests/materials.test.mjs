import assert from "node:assert/strict";
import test from "node:test";
import { materialsPack, quizQuestionFromArtifact } from "../src/domain/materials.mjs";
import { cheatsheetToPdf, paginateCheatsheet } from "../src/domain/cheatsheet.mjs";

test("materials pack maps quiz choices to a chalkboard question", () => {
  const q = quizQuestionFromArtifact({
    id: "q1",
    prompt: "Central idea?",
    choices: ["detail", "concept", "noise"],
    answer: 1,
  });
  assert.equal(q.type, "single");
  assert.deepEqual(q.correctAnswers, ["concept"]);
  const pack = materialsPack({
    cheatsheet: { title: "Mills", sections: [{ heading: "Def", bullets: ["a"] }] },
    quiz: { questions: [{ prompt: "x", choices: ["a", "b"], answer: 0 }] },
    flashcards: { cards: [{ front: "f", back: "b" }] },
  });
  assert.equal(pack.empty, false);
  assert.deepEqual(pack.tabs, ["cheatsheet", "quiz", "cards"]);
  assert.equal(pack.quiz.questions[0].correctAnswers[0], "a");
  const grounded = materialsPack({
    cheatsheet: { title: "Calc", basedOn: "3-1-defining-the-derivative.md", sections: [{ heading: "Def", bullets: ["limit"] }] },
    basedOn: "3-1-defining-the-derivative.md",
  });
  assert.equal(grounded.basedOn, "3-1-defining-the-derivative.md");
});

test("empty materials copy matches Hyperknow", () => {
  const pack = materialsPack({});
  assert.equal(pack.empty, true);
  assert.match(pack.emptyCopy, /暂无资料/);
});

test("cheatsheet paginates into two KB-cited pages and writes a PDF", () => {
  const sheet = {
    title: "微积分 速查表",
    basedOn: "4-10-antiderivatives.md",
    sections: [
      { heading: "定义", bullets: ["antiderivative"], cite: "4-10-antiderivatives.md" },
      { heading: "机制", bullets: ["indefinite integral"], cite: "4-10-antiderivatives.md" },
      { heading: "公式 / 关系", bullets: ["power rule"], cite: "4-10-antiderivatives.md" },
      { heading: "例子", bullets: ["F(x)+C"], cite: "4-10-antiderivatives.md" },
      { heading: "易错", bullets: ["条件"], cite: "4-10-antiderivatives.md" },
      { heading: "自检", bullets: ["换例子"], cite: "4-10-antiderivatives.md" },
    ],
  };
  const layout = paginateCheatsheet(sheet, { columns: 2, density: "tight", font: "chalk" });
  assert.equal(layout.pages.length, 2);
  assert.equal(layout.columns, 2);
  assert.ok(layout.pages[0].sections.length >= 1);
  assert.ok(layout.pages[1].sections.length >= 1);
  assert.equal(layout.basedOn, "4-10-antiderivatives.md");
  const pdf = cheatsheetToPdf(layout);
  assert.match(pdf.toString("latin1"), /^%PDF-1.4/);
  assert.match(pdf.toString("latin1"), /\/Count 2/);
  assert.doesNotMatch(pdf.toString("utf8"), /hyperknow|orbie/i);
});
