import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { ingestCourse } from "../src/domain/course.mjs";
import {
  EXAM_TIMER_MS,
  examBank,
  formatExamClock,
  gradeExam,
  leftoverExamState,
  leftoverPracticeState,
  matchAnswer,
  practiceBank,
  practiceOutcome,
} from "../src/domain/exam.mjs";
import { PYTHAGOREAN_EXAM, REGRESSION_EXAM } from "../src/domain/exam-catalog.mjs";

const sociology = JSON.parse(
  readFileSync(join(dirname(fileURLToPath(import.meta.url)), "../fixtures/sociology-course.json"), "utf8"),
);

test("exam ingest keeps questions and grades client-side", () => {
  const withQs = ingestCourse({
    ...sociology,
    units: sociology.units.map((u, i) =>
      i === 0
        ? {
            ...u,
            exams: [
              {
                examId: "soc-exam-1",
                title: "视角测验",
                questions: [
                  {
                    id: "q1",
                    type: "single",
                    prompt: "想象力抓住什么？",
                    options: ["私事", "交汇"],
                    correctAnswers: ["交汇"],
                  },
                  {
                    id: "q2",
                    type: "fill",
                    prompt: "提出者是 ____。",
                    correctAnswers: ["Mills"],
                  },
                ],
              },
            ],
          }
        : u,
    ),
  });
  const bank = examBank(withQs, "soc-exam-1");
  assert.equal(bank.empty, false);
  assert.equal(bank.questions.length, 2);
  const perfect = gradeExam(bank.questions, { q1: "交汇", q2: "mills" });
  assert.equal(perfect.perfect, true);
  assert.equal(perfect.passed, true);
  const miss = gradeExam(bank.questions, { q1: "私事", q2: "Durkheim" });
  assert.equal(miss.correct, 0);
  assert.equal(miss.passed, false);
  assert.equal(matchAnswer(bank.questions[1], "Mills"), true);
});

test("missing exam is empty Hyperknow copy; missing questions get a default bank", () => {
  const course = ingestCourse(sociology);
  const missing = examBank(course, "no-such");
  assert.equal(missing.empty, true);
  assert.match(missing.emptyCopy, /还没有考试题/);
  const firstId = course.units[0].exams[0].examId;
  const bank = examBank(course, firstId);
  assert.equal(bank.empty, false);
  assert.ok(bank.questions.length >= 3);
  assert.ok(bank.questions.some((q) => q.type === "single"));
  assert.ok(bank.questions.some((q) => q.type === "fill"));
});

test("leftover Pythagorean exam dump plays stored questions without live tools", () => {
  const src = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "../src/domain/exam.mjs"), "utf8");
  const catalog = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "../src/domain/exam-catalog.mjs"), "utf8");
  const unit1 = leftoverExamState({ courseId: "pythagorean", examId: "unit1" });
  assert.equal(unit1.ok, true);
  assert.equal(unit1.leftover, true);
  assert.equal(unit1.timed, true);
  assert.equal(unit1.durationMs, EXAM_TIMER_MS);
  assert.equal(unit1.questions.length, 16);
  assert.match(unit1.title, /Comprehensive Assessment/);
  const anchor = unit1.questions.find((q) => /anchor|boss/i.test(q.prompt));
  assert.equal(anchor.correctAnswers[0], "The 90-degree angle");
  const area = unit1.questions.find((q) => /\$a\^2/.test(q.prompt));
  assert.equal(matchAnswer(area, "area"), true);
  const uuid = leftoverExamState({
    courseId: "3ea5b7d5-d475-4c4f-84bf-9834e24a35c2",
    examId: "unit3",
  });
  assert.equal(uuid.restarted, false);
  assert.equal(uuid.questions.length, 16);
  assert.match(uuid.questions[0].prompt, /ramp/i);
  const restarted = leftoverExamState({ courseId: "pythagorean", examId: "missing-exam" });
  assert.equal(restarted.restarted, true);
  assert.equal(restarted.examId, "unit1");
  assert.equal(formatExamClock(EXAM_TIMER_MS), "30:00");
  assert.doesNotMatch(catalog, /animationHtml|hyperknow|orbie/i);
  assert.doesNotMatch(src, /async function generate/);
  assert.equal("animationHtml" in (PYTHAGOREAN_EXAM.exams[0].questions[0] || {}), false);
});

test("leftover Linear Regression exam dump plays Geometric Intuition without leftover html", () => {
  const geo = leftoverExamState({ courseId: "regression", examId: "unit1" });
  assert.equal(geo.ok, true);
  assert.equal(geo.leftover, true);
  assert.equal(geo.timed, true);
  assert.equal(geo.questions.length, 18);
  assert.match(geo.title, /Geometric Intuition/);
  const cigar = geo.questions.find((q) => /cigar-like/i.test(q.prompt));
  assert.equal(cigar.correctAnswers[0], "A strong negative correlation where high X values predict low Y values");
  assert.ok(cigar.image?.svg);
  assert.equal(cigar.image.src, "");
  const anim = geo.questions.find((q) => q.type === "animation");
  assert.equal(anim.animation.scene, "scatter-cloud");
  assert.match(anim.animation.svg, /<svg/);
  const uuid = leftoverExamState({
    courseId: "706d4d5c-1b4d-4707-abb0-45fc9b1f4926",
    examId: "unit1",
  });
  assert.equal(uuid.restarted, false);
  assert.equal(uuid.questions.length, 18);
  const restarted = leftoverExamState({ courseId: "regression", examId: "missing-exam" });
  assert.equal(restarted.restarted, true);
  assert.equal(restarted.examId, "unit1");
  assert.equal(REGRESSION_EXAM.exams[0].title, "Geometric Intuition Proficiency Exam");
  assert.equal("animationHtml" in (REGRESSION_EXAM.exams[0].questions[0] || {}), false);
  assert.equal("src" in (REGRESSION_EXAM.exams[0].questions[0] || {}), false);
});

test("leftover Pythagorean practice dump plays stored questions without live tools", () => {
  const src = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "../src/domain/exam.mjs"), "utf8");
  const catalog = readFileSync(join(dirname(fileURLToPath(import.meta.url)), "../src/domain/practice-catalog.mjs"), "utf8");
  const anatomy = leftoverPracticeState({
    courseId: "pythagorean",
    sessionId: "d62f9bbb-2902-49e5-b415-816a31207dda",
  });
  assert.equal(anatomy.ok, true);
  assert.equal(anatomy.leftover, true);
  assert.equal(anatomy.title, "Anatomy of the Right Triangle");
  assert.equal(anatomy.questions.length, 5);
  assert.match(anatomy.questions[0].prompt, /hypotenuse/i);
  const uuid = leftoverPracticeState({
    courseId: "3ea5b7d5-d475-4c4f-84bf-9834e24a35c2",
    sessionId: "d62f9bbb-2902-49e5-b415-816a31207dda",
  });
  assert.equal(uuid.restarted, false);
  const restarted = leftoverPracticeState({ courseId: "pythagorean", sessionId: "missing-session" });
  assert.equal(restarted.restarted, true);
  assert.equal(restarted.sessionId, "d62f9bbb-2902-49e5-b415-816a31207dda");
  assert.doesNotMatch(catalog, /animationHtml|hyperknow|orbie/i);
  assert.doesNotMatch(src, /async function generate/);
});

test("leftover Linear Regression practice dump plays Patterns in the Cloud without leftover html", () => {
  const cloud = leftoverPracticeState({
    courseId: "regression",
    sessionId: "b38a83f7-1f82-4f7c-a309-3598f1ac9e7a",
  });
  assert.equal(cloud.ok, true);
  assert.equal(cloud.leftover, true);
  assert.equal(cloud.title, "Patterns in the Cloud: Scatterplots and Correlation");
  assert.equal(cloud.questions.length, 5);
  assert.match(cloud.questions[0].prompt, /top-left toward the bottom-right/i);
  assert.equal(cloud.questions[0].correctAnswers[0], "A negative correlation, because Y decreases as X increases.");
  assert.ok(cloud.questions[0].image?.svg);
  assert.equal(cloud.questions[0].image.src, "");
  assert.equal(matchAnswer(cloud.questions[2], "non-linear"), true);
  const anim = cloud.questions.find((q) => q.type === "animation");
  assert.equal(anim.animation.scene, "scatter-cloud");
  const uuid = leftoverPracticeState({
    courseId: "706d4d5c-1b4d-4707-abb0-45fc9b1f4926",
    sessionId: "b38a83f7-1f82-4f7c-a309-3598f1ac9e7a",
  });
  assert.equal(uuid.restarted, false);
  const restarted = leftoverPracticeState({ courseId: "regression", sessionId: "missing-session" });
  assert.equal(restarted.restarted, true);
  assert.equal(restarted.sessionId, "b38a83f7-1f82-4f7c-a309-3598f1ac9e7a");
});

test("leftover Linear Regression practice dump plays The Pencil Test without leftover html", () => {
  const pencil = leftoverPracticeState({
    courseId: "regression",
    sessionId: "6dcdbc8c-6993-4810-a663-69cad7be444e",
  });
  assert.equal(pencil.ok, true);
  assert.equal(pencil.leftover, true);
  assert.equal(pencil.title, "The Pencil Test: Manually Fitting a Trend");
  assert.equal(pencil.questions.length, 5);
  assert.match(pencil.questions[0].prompt, /Pencil Test/i);
  assert.match(pencil.questions[0].caption, /slope/i);
  assert.ok(pencil.questions[0].image?.svg);
  assert.equal(pencil.questions[0].image.src, "");
  assert.match(pencil.questions[0].image.svg, /study hours/);
  assert.match(pencil.questions[0].image.svg, /<line /);
  assert.equal(matchAnswer(pencil.questions[2], "residual"), true);
  assert.match(pencil.questions[2].caption, /residual/i);
  assert.match(pencil.questions[3].caption, /outlier/i);
  const anim = pencil.questions.find((q) => q.type === "animation");
  assert.equal(anim.animation.scene, "scatter-cloud");
  assert.match(anim.caption, /residual/i);
  const uuid = leftoverPracticeState({
    courseId: "706d4d5c-1b4d-4707-abb0-45fc9b1f4926",
    sessionId: "6dcdbc8c-6993-4810-a663-69cad7be444e",
  });
  assert.equal(uuid.restarted, false);
  assert.doesNotMatch(JSON.stringify(pencil), /tts_url|interject_|hyperknow|orbie|animationHtml/i);
});

test("leftover Linear Regression practice dump plays Vertical Gaps without leftover html", () => {
  const gaps = leftoverPracticeState({
    courseId: "regression",
    sessionId: "7bcb07a2-ba95-4139-a713-a0c60ba9cad5",
  });
  assert.equal(gaps.ok, true);
  assert.equal(gaps.leftover, true);
  assert.equal(gaps.title, "Vertical Gaps: Defining the Residual");
  assert.equal(gaps.questions.length, 5);
  assert.match(gaps.questions[0].prompt, /\\hat\{y\}|y-hat/i);
  assert.match(gaps.questions[0].caption, /ŷ|y-hat|residual/i);
  assert.ok(gaps.questions[0].image?.svg);
  assert.equal(gaps.questions[0].image.src, "");
  assert.match(gaps.questions[0].image.svg, /ŷ/);
  assert.equal(matchAnswer(gaps.questions[2], "-3"), true);
  assert.match(gaps.questions[2].caption, /ŷ|residual/i);
  const anim = gaps.questions.find((q) => q.type === "animation");
  assert.equal(anim.animation.scene, "scatter-cloud");
  assert.match(anim.caption, /residual|ŷ/i);
  const uuid = leftoverPracticeState({
    courseId: "706d4d5c-1b4d-4707-abb0-45fc9b1f4926",
    sessionId: "7bcb07a2-ba95-4139-a713-a0c60ba9cad5",
  });
  assert.equal(uuid.restarted, false);
  assert.doesNotMatch(JSON.stringify(gaps), /tts_url|interject_|hyperknow|orbie|animationHtml/i);
});

test("leftover Linear Regression practice dump plays Tug-of-War without leftover html", () => {
  const tug = leftoverPracticeState({
    courseId: "regression",
    sessionId: "e752a915-d53d-4cd7-bbd6-933d153839a9",
  });
  assert.equal(tug.ok, true);
  assert.equal(tug.leftover, true);
  assert.equal(tug.title, "The Tug-of-War: Balancing Total Error");
  assert.equal(tug.questions.length, 5);
  assert.match(tug.questions[0].prompt, /Tug-of-War/i);
  assert.match(tug.questions[0].caption, /residual/i);
  assert.ok(tug.questions[0].image?.svg);
  assert.equal(tug.questions[0].image.src, "");
  assert.equal(matchAnswer(tug.questions[2], "cancel"), true);
  assert.match(tug.questions[2].caption, /cancel/i);
  const anim = tug.questions.find((q) => q.type === "animation");
  assert.equal(anim.animation.scene, "scatter-cloud");
  assert.match(anim.caption, /cancel|residual/i);
  const uuid = leftoverPracticeState({
    courseId: "706d4d5c-1b4d-4707-abb0-45fc9b1f4926",
    sessionId: "e752a915-d53d-4cd7-bbd6-933d153839a9",
  });
  assert.equal(uuid.restarted, false);
  assert.doesNotMatch(JSON.stringify(tug), /tts_url|interject_|hyperknow|orbie|animationHtml/i);
});

test("leftover Linear Regression practice dump plays Springs and Tension without leftover html", () => {
  const springs = leftoverPracticeState({
    courseId: "regression",
    sessionId: "b44ac772-4b9e-4f2b-9254-3342a480ee6b",
  });
  assert.equal(springs.ok, true);
  assert.equal(springs.leftover, true);
  assert.equal(springs.title, "Springs and Tension: A Physics Analogy");
  assert.equal(springs.questions.length, 5);
  assert.match(springs.questions[0].prompt, /rigid rod/i);
  assert.match(springs.questions[1].caption, /spring|residual/i);
  assert.ok(springs.questions[0].image?.svg);
  assert.equal(matchAnswer(springs.questions[2], "potential energy"), true);
  assert.match(springs.questions[2].caption, /spring|residual/i);
  const anim = springs.questions.find((q) => q.type === "animation");
  assert.equal(anim.animation.scene, "scatter-cloud");
  assert.match(anim.caption, /outlier|spring/i);
  const uuid = leftoverPracticeState({
    courseId: "706d4d5c-1b4d-4707-abb0-45fc9b1f4926",
    sessionId: "b44ac772-4b9e-4f2b-9254-3342a480ee6b",
  });
  assert.equal(uuid.restarted, false);
  assert.doesNotMatch(JSON.stringify(springs), /tts_url|interject_|hyperknow|orbie|animationHtml/i);
});

test("leftover Linear Regression practice dump plays Leverage and Influence without leftover html", () => {
  const lev = leftoverPracticeState({
    courseId: "regression",
    sessionId: "4820d42a-7a2b-4d22-98e0-686408627512",
  });
  assert.equal(lev.ok, true);
  assert.equal(lev.leftover, true);
  assert.equal(lev.title, "Leverage and Influence: When One Point Rules");
  assert.equal(lev.questions.length, 5);
  assert.match(lev.questions[0].prompt, /fulcrum|leverage/i);
  assert.match(lev.questions[0].caption, /fulcrum|lever/i);
  assert.ok(lev.questions[0].image?.svg);
  assert.equal(matchAnswer(lev.questions[2], "residual"), true);
  assert.match(lev.questions[2].caption, /leverage|residual|influence/i);
  const anim = lev.questions.find((q) => q.type === "animation");
  assert.equal(anim.animation.scene, "scatter-cloud");
  assert.match(anim.caption, /lever|residual|ŷ/i);
  const uuid = leftoverPracticeState({
    courseId: "706d4d5c-1b4d-4707-abb0-45fc9b1f4926",
    sessionId: "4820d42a-7a2b-4d22-98e0-686408627512",
  });
  assert.equal(uuid.restarted, false);
  assert.doesNotMatch(JSON.stringify(lev), /tts_url|interject_|hyperknow|orbie|animationHtml/i);
});

test("leftover Linear Regression practice dump plays Residuals: The Language of Error without leftover html", () => {
  const resids = leftoverPracticeState({
    courseId: "regression",
    sessionId: "884adde8-dbbb-492a-aed5-6972fde047f9",
  });
  assert.equal(resids.ok, true);
  assert.equal(resids.leftover, true);
  assert.equal(resids.title, "Residuals: The Language of Error");
  assert.equal(resids.questions.length, 5);
  assert.match(resids.questions[0].prompt, /y-hat|ŷ/i);
  assert.match(resids.questions[0].caption, /y − ŷ|residual/i);
  assert.ok(resids.questions[0].image?.svg);
  assert.equal(matchAnswer(resids.questions[2], "vertical"), true);
  assert.match(resids.questions[3].caption, /y − ŷ|minus|plus/i);
  const anim = resids.questions.find((q) => q.type === "animation");
  assert.equal(anim.animation.scene, "scatter-cloud");
  assert.match(anim.caption, /flips|ŷ|y − ŷ/i);
  const uuid = leftoverPracticeState({
    courseId: "706d4d5c-1b4d-4707-abb0-45fc9b1f4926",
    sessionId: "884adde8-dbbb-492a-aed5-6972fde047f9",
  });
  assert.equal(uuid.restarted, false);
  assert.doesNotMatch(JSON.stringify(resids), /tts_url|interject_|hyperknow|orbie|animationHtml/i);
});

test("leftover Linear Regression practice dump plays Objective Function without leftover html", () => {
  const obj = leftoverPracticeState({
    courseId: "regression",
    sessionId: "6caa0b32-3665-42cb-8e1d-2ab0ff1c0bbb",
  });
  assert.equal(obj.ok, true);
  assert.equal(obj.leftover, true);
  assert.equal(obj.title, "The Objective Function: Aggregating Error");
  assert.equal(obj.questions.length, 5);
  assert.match(obj.questions[0].prompt, /objective function/i);
  assert.match(obj.questions[0].caption, /residual|cloud/i);
  assert.ok(obj.questions[0].image?.svg);
  assert.equal(matchAnswer(obj.questions[2], "cancellation"), true);
  assert.match(obj.questions[2].caption, /cancel/i);
  const anim = obj.questions.find((q) => q.type === "animation");
  assert.equal(anim.animation.scene, "scatter-cloud");
  assert.match(anim.caption, /SSE|MAE|e²/i);
  const uuid = leftoverPracticeState({
    courseId: "706d4d5c-1b4d-4707-abb0-45fc9b1f4926",
    sessionId: "6caa0b32-3665-42cb-8e1d-2ab0ff1c0bbb",
  });
  assert.equal(uuid.restarted, false);
  assert.doesNotMatch(JSON.stringify(obj), /tts_url|interject_|hyperknow|orbie|animationHtml/i);
});

test("leftover Linear Regression practice dump plays Geometry of Squared Errors without leftover html", () => {
  const geo = leftoverPracticeState({
    courseId: "regression",
    sessionId: "ffb1c1f7-44a9-41ef-8604-e04f2c20b1f9",
  });
  assert.equal(geo.ok, true);
  assert.equal(geo.leftover, true);
  assert.equal(geo.title, "The Geometry of Squared Errors");
  assert.equal(geo.questions.length, 5);
  assert.match(geo.questions[0].prompt, /residual doubles/i);
  assert.match(geo.questions[0].caption, /square/i);
  assert.ok(geo.questions[0].image?.svg);
  assert.match(geo.questions[0].image.svg, /<rect /);
  assert.equal(matchAnswer(geo.questions[2], "16"), true);
  const anim = geo.questions.find((q) => q.type === "animation");
  assert.equal(anim.animation.scene, "scatter-cloud");
  assert.match(anim.caption, /square|tick/i);
  const uuid = leftoverPracticeState({
    courseId: "706d4d5c-1b4d-4707-abb0-45fc9b1f4926",
    sessionId: "ffb1c1f7-44a9-41ef-8604-e04f2c20b1f9",
  });
  assert.equal(uuid.restarted, false);
  assert.doesNotMatch(JSON.stringify(geo), /tts_url|interject_|hyperknow|orbie|animationHtml/i);
});

test("leftover Linear Regression practice dump plays Mathematical Elegance of OLS without leftover html", () => {
  const elegance = leftoverPracticeState({
    courseId: "regression",
    sessionId: "d7239551-3a08-4b27-b8be-a0aaaec46be8",
  });
  assert.equal(elegance.ok, true);
  assert.equal(elegance.leftover, true);
  assert.equal(elegance.title, "Mathematical Elegance of OLS");
  assert.equal(elegance.questions.length, 5);
  assert.match(elegance.questions[0].prompt, /U-shape|Ordinary Least Squares/i);
  assert.match(elegance.questions[0].caption, /U|V|ŷ|residual/i);
  assert.ok(elegance.questions[0].image?.svg);
  assert.equal(matchAnswer(elegance.questions[2], "closed-form"), true);
  assert.match(elegance.questions[2].caption, /closed-form|U-bottom|Normal/i);
  for (const q of elegance.questions) {
    assert.match(q.caption, /U|V|closed-form|ŷ|quadratic|OLS|MAE/i);
  }
  const anim = elegance.questions.find((q) => q.type === "animation");
  assert.equal(anim.animation.scene, "scatter-cloud");
  assert.match(anim.caption, /U|quadratic|OLS|MAE/i);
  const uuid = leftoverPracticeState({
    courseId: "706d4d5c-1b4d-4707-abb0-45fc9b1f4926",
    sessionId: "d7239551-3a08-4b27-b8be-a0aaaec46be8",
  });
  assert.equal(uuid.restarted, false);
  assert.doesNotMatch(JSON.stringify(elegance), /tts_url|interject_|hyperknow|orbie|animationHtml/i);
});

test("leftover Linear Regression practice dump plays Setting up the Normal Equations without leftover html", () => {
  const normals = leftoverPracticeState({
    courseId: "regression",
    sessionId: "26ab5be2-d182-42cb-98c2-944975f91c2d",
  });
  assert.equal(normals.ok, true);
  assert.equal(normals.leftover, true);
  assert.equal(normals.title, "Setting up the Normal Equations");
  assert.equal(normals.questions.length, 5);
  assert.match(normals.questions[0].prompt, /SSE formula/i);
  assert.match(normals.questions[0].caption, /residual|ŷ/i);
  assert.ok(normals.questions[0].image?.svg);
  assert.equal(matchAnswer(normals.questions[2], "residuals"), true);
  assert.match(normals.questions[2].caption, /residual|ŷ/i);
  for (const q of normals.questions) {
    assert.match(q.caption, /residual|ŷ/i);
  }
  const anim = normals.questions.find((q) => q.type === "animation");
  assert.equal(anim.animation.scene, "scatter-cloud");
  assert.match(anim.caption, /SSE valley|residual|ŷ/i);
  const uuid = leftoverPracticeState({
    courseId: "706d4d5c-1b4d-4707-abb0-45fc9b1f4926",
    sessionId: "26ab5be2-d182-42cb-98c2-944975f91c2d",
  });
  assert.equal(uuid.restarted, false);
  assert.doesNotMatch(JSON.stringify(normals), /tts_url|interject_|hyperknow|orbie|animationHtml/i);
});

test("leftover Linear Regression practice dump plays The Final Formulas without leftover html", () => {
  const formulas = leftoverPracticeState({
    courseId: "regression",
    sessionId: "672aa1b4-f350-479e-826b-1bcc12ab4519",
  });
  assert.equal(formulas.ok, true);
  assert.equal(formulas.leftover, true);
  assert.equal(formulas.title, "The Final Formulas: Slope and Intercept");
  assert.equal(formulas.questions.length, 5);
  assert.match(formulas.questions[0].prompt, /OLS formula for the slope/i);
  assert.match(formulas.questions[0].caption, /residual|ŷ/i);
  assert.ok(formulas.questions[0].image?.svg);
  assert.equal(matchAnswer(formulas.questions[2], "1.5"), true);
  assert.match(formulas.questions[2].caption, /residual|ŷ/i);
  for (const q of formulas.questions) {
    assert.match(q.caption, /residual|ŷ/i);
  }
  const anim = formulas.questions.find((q) => q.type === "animation");
  assert.equal(anim.animation.scene, "scatter-cloud");
  assert.match(anim.caption, /ŷ|residual|mean-mean/i);
  const uuid = leftoverPracticeState({
    courseId: "706d4d5c-1b4d-4707-abb0-45fc9b1f4926",
    sessionId: "672aa1b4-f350-479e-826b-1bcc12ab4519",
  });
  assert.equal(uuid.restarted, false);
  assert.doesNotMatch(JSON.stringify(formulas), /tts_url|interject_|hyperknow|orbie|animationHtml/i);
});

test("leftover Linear Regression practice dump plays From Lines to Hyperplanes without leftover html", () => {
  const planes = leftoverPracticeState({
    courseId: "regression",
    sessionId: "2a8918ce-3935-44ba-8139-24c5c9f20f3b",
  });
  assert.equal(planes.ok, true);
  assert.equal(planes.leftover, true);
  assert.equal(planes.title, "From Lines to Hyperplanes");
  assert.equal(planes.questions.length, 5);
  assert.match(planes.questions[0].prompt, /3D regression|residual/i);
  assert.match(planes.questions[0].caption, /residual|ŷ/i);
  assert.ok(planes.questions[0].image?.svg);
  assert.equal(matchAnswer(planes.questions[2], "hyperplane"), true);
  assert.match(planes.questions[2].caption, /residual|ŷ/i);
  for (const q of planes.questions) {
    assert.match(q.caption, /residual|ŷ/i);
  }
  const anim = planes.questions.find((q) => q.type === "animation");
  assert.equal(anim.animation.scene, "scatter-cloud");
  assert.match(anim.caption, /ŷ|residual|outlier/i);
  const uuid = leftoverPracticeState({
    courseId: "706d4d5c-1b4d-4707-abb0-45fc9b1f4926",
    sessionId: "2a8918ce-3935-44ba-8139-24c5c9f20f3b",
  });
  assert.equal(uuid.restarted, false);
  assert.doesNotMatch(JSON.stringify(planes), /tts_url|interject_|hyperknow|orbie|animationHtml/i);
});

test("practice keeps structured questions and scores stars / mastery", () => {
  const course = ingestCourse(sociology);
  const session = course.units[0].lectures[0].sessions[0];
  assert.ok(session.practice.questions.length >= 1);
  const bank = practiceBank(session);
  assert.equal(bank.empty, false);
  const qid = bank.questions[0].id;
  const long = { [qid]: "This is a full sentence of my own words." };
  assert.equal(matchAnswer(bank.questions[0], long[qid]), true);
  const outcome = practiceOutcome(bank.questions, long, {});
  assert.ok(outcome.stars >= 0);
  const skipped = practiceOutcome(bank.questions, {}, { [qid]: { skipped: true } });
  assert.equal(skipped.perfect, false);
  assert.equal(skipped.event, "familiar");
});
