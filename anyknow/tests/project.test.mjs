import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { ingestCourse } from "../src/domain/course.mjs";
import {
  gradeProjectStep,
  leftoverProjectState,
  projectCanFinish,
  projectStage,
} from "../src/domain/project.mjs";
import { PYTHAGOREAN_PROJECT } from "../src/domain/project-catalog.mjs";

const sociology = JSON.parse(
  readFileSync(join(dirname(fileURLToPath(import.meta.url)), "../fixtures/sociology-course.json"), "utf8"),
);

test("project stage builds gated text steps and blocks finish until pass", () => {
  const course = ingestCourse(sociology);
  const stageId = course.units[0].projects[0].stageId;
  const stage = projectStage(course, stageId);
  assert.equal(stage.empty, false);
  assert.ok(stage.steps.length >= 3);
  const first = stage.steps[0];
  const fail = gradeProjectStep(first, { text: "太短" });
  assert.equal(fail.passed, false);
  assert.match(fail.verdict, /完善/);
  const pass = gradeProjectStep(first, { text: "观察一个本地租房群体如何被租金结构卡住。" });
  assert.equal(pass.passed, true);
  assert.equal(projectCanFinish(stage.steps, {}), false);
  const answers = Object.fromEntries(stage.steps.map((s) => [s.id, { passed: true }]));
  assert.equal(projectCanFinish(stage.steps, answers), true);
});

test("unknown project stage uses Hyperknow missing copy", () => {
  const course = ingestCourse(sociology);
  const missing = projectStage(course, "nope");
  assert.equal(missing.empty, true);
  assert.match(missing.emptyCopy, /缺少课程或阶段/);
});

test("leftover Pythagorean project dump plays stored steps without live tools", () => {
  const src = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "../src/domain/project.mjs"), "utf8");
  const catalog = readFileSync(
    join(dirname(fileURLToPath(import.meta.url)), "../src/domain/project-catalog.mjs"),
    "utf8",
  );
  const area = leftoverProjectState({
    courseId: "pythagorean",
    stageId: "22b6a5c6-6ce5-47fb-b516-b5b679b84f74",
  });
  assert.equal(area.ok, true);
  assert.equal(area.leftover, true);
  assert.equal(area.title, "Constructing the Area Model");
  assert.equal(area.steps.length, 6);
  assert.equal(area.steps[0].required, false);
  assert.equal(area.steps[1].required, true);
  assert.equal(area.steps[1].require, "text");
  assert.equal(area.steps[4].require, "image");
  assert.match(area.steps[1].instruction, /Pythagorean Triple/);
  const uuid = leftoverProjectState({
    courseId: "3ea5b7d5-d475-4c4f-84bf-9834e24a35c2",
    stageId: "22b6a5c6-6ce5-47fb-b516-b5b679b84f74",
  });
  assert.equal(uuid.restarted, false);
  const restarted = leftoverProjectState({ courseId: "pythagorean", stageId: "missing-stage" });
  assert.equal(restarted.restarted, true);
  assert.equal(restarted.stageId, "22b6a5c6-6ce5-47fb-b516-b5b679b84f74");
  const pulse = leftoverProjectState({
    courseId: "706d4d5c-1b4d-4707-abb0-45fc9b1f4926",
    stageId: "4f6e3324-1b05-4636-90f2-53cdc5b0ceef",
  });
  assert.equal(pulse.title, "Visualizing the Baseline");
  const img = gradeProjectStep(area.steps[4], { filename: "diagram.png" });
  assert.equal(img.passed, true);
  const missFile = gradeProjectStep(area.steps[4], {});
  assert.equal(missFile.passed, false);
  const teach = gradeProjectStep(area.steps[0], {});
  assert.equal(teach.passed, true);
  assert.doesNotMatch(catalog, /animationHtml|hyperknow|orbie/i);
  assert.doesNotMatch(src, /async function generate/);
  assert.equal(PYTHAGOREAN_PROJECT.stages.length, 3);
});
