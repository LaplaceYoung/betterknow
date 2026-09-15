import assert from "node:assert/strict";
import test from "node:test";
import { ingestLmsPayload, lmsCoursesToAnyknowDrafts } from "../src/domain/lms.mjs";
import { approveFeedTasks, buildLearningFeed, extractDeadlines } from "../src/domain/plan.mjs";
import { ingestCourse } from "../src/domain/course.mjs";

const LMS = {
  school: "Example University",
  canvas_url: "https://canvas.example.edu",
  courses: [
    {
      id: "soc101",
      name: "SOC 101 Introduction to Sociology",
      assignments: [
        {
          id: 11,
          title: "Reading response: Mills",
          due_at: "2026-09-20T23:59:00Z",
          description: "Two pages on the sociological imagination.",
        },
        {
          id: 12,
          name: "Midterm exam",
          due_at: "2026-10-05",
          points_possible: 100,
        },
      ],
      files: [
        {
          filename: "syllabus.txt",
          text: `SOC 101 Syllabus
Week 3 quiz due: 2026-09-18
Final project deadline: 2026-12-12
Lecture notes on culture and inequality.`,
        },
      ],
    },
  ],
};

test("ingestLmsPayload accepts a Canvas-like school-sync payload", () => {
  const bundle = ingestLmsPayload(LMS);
  assert.equal(bundle.school, "Example University");
  assert.equal(bundle.canvasUrl, "https://canvas.example.edu");
  assert.equal(bundle.courses.length, 1);
  assert.equal(bundle.courses[0].assignments.length, 2);
  assert.equal(bundle.courses[0].assignments[0].dueAt, "2026-09-20T23:59:00Z");
  assert.equal(bundle.courses[0].files[0].filename, "syllabus.txt");
});

test("extractDeadlines + buildLearningFeed produce a study plan", () => {
  const bundle = ingestLmsPayload(LMS);
  const deadlines = extractDeadlines(bundle.courses);
  const titles = deadlines.map((d) => d.title);
  assert.ok(titles.some((t) => /Mills/i.test(t)));
  assert.ok(titles.some((t) => /Midterm/i.test(t)));
  assert.ok(
    deadlines.some((d) => d.source === "syllabus-text" && /2026-09-18/.test(d.dueAt)),
  );
  assert.ok(deadlines.some((d) => d.dueAt.startsWith("2026-12-12")));

  const feed = buildLearningFeed({ lmsBundle: bundle, now: new Date("2026-09-01") });
  assert.ok(feed.pendingCount >= 3);
  assert.equal(feed.tasks.length, feed.plan.length);
  assert.equal(feed.tasks[0].kind, "main_task");
  const accepted = approveFeedTasks(feed, [feed.tasks[0].taskId]);
  assert.equal(accepted.tasks[0].status, "accepted");
});

test("LMS import drafts ingest as simo know courses", () => {
  const bundle = ingestLmsPayload(LMS);
  const drafts = lmsCoursesToAnyknowDrafts(bundle);
  const course = ingestCourse(drafts[0]);
  assert.match(course.title, /SOC 101/);
  assert.equal(course.source, "school-sync");
  assert.equal(course.files[0].filename, "syllabus.txt");
  assert.equal(course.units[0].lectures[0].sessions[0].learn.kind, "学习");
});
