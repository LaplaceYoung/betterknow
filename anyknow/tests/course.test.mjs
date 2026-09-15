import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import assert from "node:assert/strict";
import test from "node:test";
import {
  extendCourseWithFile,
  ingestCourse,
  joinCourse,
  listSessions,
  markExamProgress,
  markProjectProgress,
  markSessionProgress,
  openLearnSession,
  openPracticeSession,
} from "../src/domain/course.mjs";
import { ingestLmsPayload, lmsCoursesToAnyknowDrafts } from "../src/domain/lms.mjs";
import { craftPayloadFromGoal } from "../src/agent/tools.mjs";
import { PROGRESS } from "../src/domain/progress.mjs";
import { decodeCourseTarget, encodeCourseTarget } from "../src/web/session-ref.js";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const sociology = JSON.parse(
  readFileSync(join(root, "fixtures/sociology-course.json"), "utf8"),
);

test("ingestCourse builds units → lectures → sessions with 学习 and 练习", () => {
  const graph = ingestCourse(sociology);
  assert.equal(graph.title, sociology.courseTitle);
  assert.ok(graph.units.length >= 2);
  for (const unit of graph.units) {
    assert.ok(unit.lectures.length >= 1, "each unit has lectures");
    for (const lecture of unit.lectures) {
      assert.ok(lecture.sessions.length >= 1, "each lecture has sessions");
      for (const session of lecture.sessions) {
        assert.equal(session.learn.kind, "学习");
        assert.equal(session.drill.kind, "练习");
        assert.ok(session.practice.tasks.length >= 1);
        assert.match(session.learn.href, /sessions\/whiteboard/);
        assert.match(session.drill.href, /practice/);
      }
    }
  }
  const firstSession = graph.units[0].lectures[0].sessions[0];
  assert.ok(firstSession.boardImage?.imageUrl);
  assert.match(firstSession.boardImage.caption, /biography overlapping history/i);
  assert.equal(graph.units[0].lectures[0].sessions[1].boardImage, null);
  const firstUnit = graph.units[0];
  assert.ok(firstUnit.projects.length >= 1, "unit has 项目 node");
  assert.ok(firstUnit.exams.length >= 1, "unit has 测验 node");
  const sessionIds = Object.keys(graph.progress.sessions);
  assert.equal(sessionIds.length, listSessions(graph).length);
  for (const id of sessionIds) {
    assert.equal(graph.progress.sessions[id].state, "notStarted");
    assert.equal(graph.progress.sessions[id].label, PROGRESS.notStarted);
  }
});

test("joinCourse locks language after join", () => {
  const graph = ingestCourse(sociology);
  const joined = joinCourse(graph, { language: "中文" });
  assert.equal(joined.joined, true);
  assert.equal(joined.language, "zh");
  assert.equal(joined.languageLocked, true);
  assert.throws(
    () => joinCourse(joined, { language: "English" }),
    /locked/,
  );
  const again = joinCourse(joined, { language: "zh" });
  assert.equal(again.language, "zh");
});

test("progress walks 未开始 → 已尝试 → 熟悉 → 熟练 → 已掌握", () => {
  let course = ingestCourse(sociology);
  const sessionId = listSessions(course)[0].session.sessionId;

  course = openLearnSession(course, sessionId);
  assert.equal(course.progress.sessions[sessionId].state, "attempted");
  assert.equal(course.progress.sessions[sessionId].label, "已尝试");
  assert.equal(course.progress.sessions[sessionId].learnOpened, true);

  course = openPracticeSession(course, sessionId);
  assert.equal(course.progress.sessions[sessionId].state, "familiar");
  assert.equal(course.progress.sessions[sessionId].label, "熟悉");
  assert.equal(course.progress.sessions[sessionId].practiceOpened, true);

  course = markSessionProgress(course, sessionId, "proficient");
  assert.equal(course.progress.sessions[sessionId].state, "proficient");
  assert.equal(course.progress.sessions[sessionId].label, "熟练");

  course = markSessionProgress(course, sessionId, "master");
  assert.equal(course.progress.sessions[sessionId].state, "mastered");
  assert.equal(course.progress.sessions[sessionId].label, "已掌握");
});

test("项目 and 测验 nodes transition independently", () => {
  let course = ingestCourse(sociology);
  const stageId = Object.keys(course.progress.projects)[0];
  const examId = Object.keys(course.progress.exams)[0];
  assert.equal(course.progress.projects[stageId].state, "project");
  assert.equal(course.progress.projects[stageId].label, "项目");
  assert.equal(course.progress.exams[examId].state, "exam");
  assert.equal(course.progress.exams[examId].label, "测验");

  course = markProjectProgress(course, stageId, "start");
  assert.equal(course.progress.projects[stageId].touched, true);
  assert.equal(course.progress.projects[stageId].state, "project");
  course = markProjectProgress(course, stageId, "complete");
  assert.equal(course.progress.projects[stageId].completed, true);

  course = markExamProgress(course, examId, "start");
  assert.equal(course.progress.exams[examId].touched, true);
  course = markExamProgress(course, examId, "complete");
  assert.equal(course.progress.exams[examId].completed, true);
});

test("extendCourseWithFile keeps uploaded text on the graph", () => {
  const course = extendCourseWithFile(ingestCourse(sociology), {
    filename: "notes.txt",
    text: "Personal troubles vs public issues.",
  });
  assert.equal(course.files[0].filename, "notes.txt");
  assert.match(course.files[0].text, /public issues/);
});

/**
 * Same encode the 学习/练习 buttons write into data-learn / data-practice,
 * and the same decode the click handlers use (src/web/app.js).
 */
function clickLearn(course, encoded) {
  const { courseId, targetId } = decodeCourseTarget(encoded);
  assert.equal(courseId, course.courseId);
  return openLearnSession(course, targetId);
}

function clickPractice(course, encoded) {
  const { courseId, targetId } = decodeCourseTarget(encoded);
  assert.equal(courseId, course.courseId);
  return openPracticeSession(course, targetId);
}

test("crafted course without sessionId round-trips 学习/练习 click refs", () => {
  const payload = craftPayloadFromGoal("线性回归从直觉到实践", "zh");
  assert.equal(payload.units[0].lectures[0].sessions[0].sessionId, undefined);
  const course = ingestCourse(payload);
  const session = listSessions(course)[0].session;
  assert.match(session.sessionId, /:/, "generated sessionId contains colons");
  const naive = `${course.courseId}:${session.sessionId}`.split(":");
  assert.notEqual(naive[1], session.sessionId);

  const encoded = encodeCourseTarget(course.courseId, session.sessionId);
  let next = clickLearn(course, encoded);
  assert.equal(next.progress.sessions[session.sessionId].learnOpened, true);
  assert.equal(next.progress.sessions[session.sessionId].state, "attempted");
  next = clickPractice(next, encodeCourseTarget(course.courseId, session.sessionId));
  assert.equal(next.progress.sessions[session.sessionId].practiceOpened, true);
});

test("LMS graph without sessionId round-trips 学习/练习 click refs", () => {
  const bundle = ingestLmsPayload({
    school: "Example University",
    canvas_url: "https://canvas.example.edu",
    courses: [
      {
        id: "soc101",
        name: "SOC 101",
        assignments: [{ id: 1, title: "Mills memo", due_at: "2026-09-20" }],
        files: [{ filename: "syllabus.txt", text: "Week 3 quiz due: 2026-09-18" }],
      },
    ],
  });
  const [draft] = lmsCoursesToAnyknowDrafts(bundle);
  assert.equal(draft.units[0].lectures[0].sessions[0].sessionId, undefined);
  const course = ingestCourse(draft);
  const session = listSessions(course)[0].session;
  assert.match(session.sessionId, /:/);
  const encoded = encodeCourseTarget(course.courseId, session.sessionId);
  const next = clickLearn(course, encoded);
  assert.equal(next.progress.sessions[session.sessionId].learnOpened, true);
  assert.doesNotThrow(() => clickPractice(next, encoded));
});
