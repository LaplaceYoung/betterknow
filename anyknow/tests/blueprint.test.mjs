import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  BLUEPRINT,
  blueprintState,
  commitBlueprint,
  deepenBlueprintNode,
  deleteBlueprintNode,
  parseBlueprint,
  splitBlueprintNode,
} from "../src/domain/blueprint.mjs";

const src = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "../src/domain/blueprint.mjs"), "utf8");

test("leftover course blueprint paints Geometric Anchor tree without Agent.generate", () => {
  const board = blueprintState();
  assert.equal(board.eyebrow, BLUEPRINT.eyebrow);
  assert.equal(board.confirmBtn, "确认生成完整课程");
  assert.match(board.courseTitle, /Linear Regression/i);
  assert.match(board.units[0].title, /Geometric Anchor|Best Fit Line/i);
  assert.ok(board.sessionCount >= 7);
  assert.doesNotMatch(JSON.stringify(board), /Hyperknow|Orbie/i);
  assert.doesNotMatch(src, /async function generate/);
});

test("split delete deepen stay on leftover tree then confirm ingests chalkboard course", () => {
  const base = parseBlueprint();
  const sid = base.units[0].lectures[0].sessions[0].sessionId;
  const split = splitBlueprintNode(base, { kind: "session", sessionId: sid });
  assert.equal(split.sessionCount, base.sessionCount + 1);
  const gone = deleteBlueprintNode(split, {
    kind: "session",
    sessionId: split.units[0].lectures[0].sessions.at(-1).sessionId,
  });
  assert.equal(gone.sessionCount, base.sessionCount);
  const deep = deepenBlueprintNode(base, { kind: "lecture", lectureId: base.units[0].lectures[0].lectureId });
  assert.ok(deep.sessionCount > base.sessionCount);
  const course = commitBlueprint(deep);
  assert.equal(course.title, base.courseTitle);
  assert.match(course.units[0].lectures[0].sessions[0].learn.href, /sessions\/whiteboard/);
});
