import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { ingestCourse, joinCourse, markSessionProgress, listSessions } from "../src/domain/course.mjs";
import { courseProgressKind, courseShelfState, EMPTY_SHELF } from "../src/domain/shelf.mjs";
import { createAccount } from "../src/domain/credits.mjs";
import {
  createAssistAgent,
  createMaterialsAgent,
  createStudyPlanAgent,
  runStudyPlan,
} from "../src/agent/runtime.mjs";
import { Agent } from "../src/agent/framework.mjs";
import { createHeuristicModel, isStudyPlanPrompt } from "../src/server/heuristic.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const sociology = JSON.parse(readFileSync(join(root, "fixtures/sociology-course.json"), "utf8"));
const web = join(root, "src/web");

test("empty shelf copy and filters are shipped functions", () => {
  const empty = courseShelfState([], { filter: "all" });
  assert.equal(empty.empty, true);
  assert.equal(empty.copy.title, EMPTY_SHELF.title);
  assert.match(empty.copy.body, /课程市场/);

  const graph = joinCourse(ingestCourse(sociology), { language: "zh" });
  const sid = listSessions(graph)[0].session.sessionId;
  assert.equal(courseProgressKind(graph), "inProgress");
  const inProg = courseShelfState([graph], { filter: "inProgress" });
  assert.equal(inProg.items.length, 1);
  const doneNone = courseShelfState([graph], { filter: "completed" });
  assert.equal(doneNone.items.length, 0);

  let mastered = graph;
  for (const { session } of listSessions(graph)) {
    mastered = markSessionProgress(mastered, session.sessionId, "master");
  }
  assert.equal(courseProgressKind(mastered), "completed");
  const done = courseShelfState([mastered], { filter: "completed", query: graph.title.slice(0, 4) });
  assert.equal(done.items.length, 1);
  assert.equal(done.items[0].title, graph.title);
});

test("runStudyPlan drives generate_main_tasks on the Agent loop and debits credits", async () => {
  const account = createAccount({ email: "plan@anyknow.test", password: "x", credits: 20 });
  const syllabus = "Week 3 quiz due: 2026-09-18\nFinal project deadline: 2026-12-12";
  const model = {
    generate: async ({ messages, tools }) => {
      const ids = (tools || []).map((t) => t.id);
      assert.ok(ids.includes("generate_main_tasks"));
      const toolTurn = messages.filter((m) => m.role === "tool").length;
      if (toolTurn === 0) {
        return {
          toolCalls: [
            {
              id: "p1",
              name: "generate_main_tasks",
              arguments: { text: syllabus, courseName: "SOC 101", topic: "SOC 101" },
            },
          ],
        };
      }
      return { text: "Three checkpoints are on the calendar." };
    },
  };
  const agent = createStudyPlanAgent({ model });
  assert.ok(agent instanceof Agent);
  const { account: next, plan, result } = await runStudyPlan({
    account,
    prompt: syllabus,
    model,
  });
  assert.equal(next.credits, 18);
  assert.equal(plan.kind, "plan");
  assert.ok(plan.tasks.length >= 2);
  assert.ok(plan.tasks.some((t) => String(t.dueAt || t.title).includes("2026-09-18") || /quiz/i.test(t.title)));
  assert.equal(result.toolResults[0].name, "generate_main_tasks");
});

test("zero-balance study plan is rejected", async () => {
  const account = createAccount({ email: "broke-plan@anyknow.test", password: "x", credits: 0 });
  await assert.rejects(
    () =>
      runStudyPlan({
        account,
        prompt: "plan my week",
        model: { generate: async () => ({ text: "nope" }) },
      }),
    (err) => err.code === "INSUFFICIENT_CREDITS",
  );
});

test("heuristic used by /api/assist and /api/materials does not treat plant/explanation as a study plan", async () => {
  assert.equal(isStudyPlanPrompt("explanation of mitosis"), false);
  assert.equal(isStudyPlanPrompt("plant biology"), false);
  assert.equal(isStudyPlanPrompt("Plan study tasks from: SOC 101"), true);
  assert.equal(isStudyPlanPrompt("帮我规划本周学习"), true);
  assert.equal(isStudyPlanPrompt("学习计划：宏观经济学"), true);

  const model = createHeuristicModel();
  const assist = createAssistAgent({ model });
  const mitosis = await assist.generate("explanation of mitosis");
  assert.equal(mitosis.toolResults[0].name, "search_files");
  assert.ok(mitosis.toolResults.some((t) => t.name === "search_and_summarize_web"));
  assert.ok(mitosis.toolResults.some((t) => t.name === "generate_content"));
  assert.ok(mitosis.toolResults.some((t) => t.name === "generate_quiz"));
  assert.ok(!mitosis.toolResults.some((t) => t.name === "generate_main_tasks"));
  const mitosisWeb = mitosis.toolResults.find((t) => t.name === "search_and_summarize_web")?.result;
  assert.match(mitosisWeb.citations[0].url, /^https:\/\//);
  assert.doesNotMatch(JSON.stringify(mitosisWeb), /Course notes/);

  const plant = await assist.generate("plant biology");
  assert.equal(plant.toolResults[0].name, "search_files");
  assert.ok(plant.toolResults.some((t) => t.name === "search_and_summarize_web"));
  assert.ok(plant.toolResults.some((t) => t.name === "generate_content"));
  assert.ok(!plant.toolResults.some((t) => t.name === "generate_main_tasks"));

  const materials = await createMaterialsAgent({ model }).generate(
    "Generate study materials (cheatsheet, quiz, flashcards) for: plant biology",
  );
  assert.ok(materials.toolResults.some((t) => t.name === "generate_cheatsheet"));
  assert.ok(!materials.toolResults.some((t) => t.name === "generate_main_tasks"));

  const planned = await createStudyPlanAgent({ model }).generate(
    "Plan study tasks from: Week 3 quiz due: 2026-09-18",
  );
  assert.equal(planned.toolResults[0].name, "generate_main_tasks");
});

test("generated chalkboard assets exist and UI references them", () => {
  for (const name of [
    "cover-sociology.jpg",
    "cover-biology.jpg",
    "cover-ml.jpg",
    "empty-shelf.jpg",
    "hero-doodle.jpg",
    "empty-history.jpg",
    "empty-kb.jpg",
    "exam-doodle.jpg",
    "board-grain.jpg",
    "star-chalk.jpg",
    "empty-starred.jpg",
    "learn-intro.jpg",
    "learn-outline.jpg",
    "learn-refs.jpg",
    "learn-note.jpg",
    "learn-quiz.jpg",
    "learn-illustration.jpg",
    "learn-illustration-tape.jpg",
    "learn-picker.jpg",
    "whats-new.jpg",
    "share-chalk.jpg",
    "pdf-split.jpg",
    "signup-chalk.jpg",
    "blueprint-chalk.jpg",
    "whiteboard-chalk.jpg",
  ]) {
    assert.equal(existsSync(join(web, "assets", name)), true, name);
  }
  const app = readFileSync(join(web, "app.js"), "utf8");
  assert.match(app, /coverSrc/);
  assert.match(app, /cover-img/);
  assert.match(app, /hero-doodle/);
  assert.match(app, /empty-shelf/);
  assert.match(app, /empty-history/);
  assert.match(app, /empty-kb/);
  assert.match(app, /exam-doodle/);
  assert.match(app, /star-chalk/);
  assert.match(app, /empty-starred/);
  assert.match(app, /learn-intro/);
  assert.match(app, /learn-outline/);
  assert.match(app, /learn-refs/);
  assert.match(app, /learn-note/);
  assert.match(app, /learn-quiz/);
  assert.match(app, /learn-illustration/);
  assert.match(app, /learn-picker/);
  assert.match(app, /whats-new/);
  assert.match(app, /share-chalk/);
  assert.match(app, /pdf-split/);
  assert.match(app, /signup-chalk/);
  assert.match(app, /blueprint-chalk/);
  assert.match(app, /whiteboard-chalk/);
  assert.match(app, /你的课程架暂时是空的/);
  const css = readFileSync(join(web, "styles.css"), "utf8");
  assert.match(css, /\.cover-img/);
});
