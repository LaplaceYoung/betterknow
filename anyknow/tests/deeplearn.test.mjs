import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  craftDeepLearnSession,
  craftedDeepLearnId,
  getDeepLearnSession,
  outlineFromCourse,
  selectOutlineTask,
  unlockOutlineTask,
} from "../src/domain/deeplearn.mjs";
import { createDrive } from "../src/domain/kb.mjs";
import { seedPublicTextbooks } from "../src/server/seed.mjs";
import { ingestCourse } from "../src/domain/course.mjs";
import { runCreateDeepLearnSession } from "../src/agent/runtime.mjs";
import { createAccount } from "../src/domain/credits.mjs";
import { createHeuristicModel } from "../src/server/heuristic.mjs";

const sociology = JSON.parse(
  readFileSync(join(dirname(fileURLToPath(import.meta.url)), "../fixtures/sociology-course.json"), "utf8"),
);

test("crafted Deep Learn session is an independent outline grounded in 公开教材", () => {
  const drive = seedPublicTextbooks(createDrive({ ownerId: "dl-oer" }));
  const session = craftDeepLearnSession({ topic: "[chip:deeplearn] 微积分", drive });
  assert.equal(session.kind, "deeplearn");
  assert.equal(craftedDeepLearnId(session.id), true);
  assert.equal(getDeepLearnSession(session.id)?.id, session.id);
  assert.ok(session.tasks.length >= 4);
  assert.equal(session.tasks[0].locked, false);
  assert.equal(session.tasks[1].locked, true);
  assert.match(session.tasks[0].unitTitle, /先建立图像/);
  assert.match(session.basedOn, /limit|derivative|calculus|integral|antiderivative/i);
  assert.match(session.tasks[0].description, /公开教材/);
  assert.doesNotMatch(JSON.stringify(session), /hyperknow|orbie|License:/i);
  const course = ingestCourse(sociology);
  const fromCourse = outlineFromCourse(course);
  assert.notEqual(session.tasks[0].taskId, fromCourse.tasks[0].taskId);
  const unlocked = unlockOutlineTask(session, session.tasks[1].taskId);
  assert.equal(unlocked.current.locked, false);
  const picked = selectOutlineTask(unlocked, session.tasks[1].taskId);
  assert.equal(picked.current.taskId, session.tasks[1].taskId);
});

test("runCreateDeepLearnSession calls create_deep_learn_session and debits Deep Learn credits", async () => {
  const drive = seedPublicTextbooks(createDrive({ ownerId: "dl-run" }));
  const account = createAccount({ email: "dl@anyknow.test", password: "x", credits: 20 });
  const { account: next, session, result } = await runCreateDeepLearnSession({
    account,
    prompt: "[chip:deeplearn] 微积分",
    drive,
    model: createHeuristicModel(),
  });
  assert.equal(next.credits, 18);
  assert.equal(result.toolResults[0].name, "create_deep_learn_session");
  assert.equal(craftedDeepLearnId(session.id), true);
  assert.match(session.title, /微积分/);
  assert.match(session.basedOn, /limit|derivative|calculus|integral|antiderivative/i);
});
