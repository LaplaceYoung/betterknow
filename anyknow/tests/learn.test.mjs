import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import assert from "node:assert/strict";
import test from "node:test";
import { ingestCourse } from "../src/domain/course.mjs";
import {
  LEARN_FOOTER,
  LEARN_INTRO,
  LEARN_OUTLINE,
  LEARN_REFS,
  LEARN_PICKER,
  LEARN_TAB,
  learnArtifactsState,
  learnCrumbState,
  learnIntroState,
  learnKeypointsState,
  artifactMatchesSession,
  learnIllustrationState,
  learnPickerState,
  learnNoteCardsState,
  learnOutlineState,
  learnQuizOverlayState,
  learnTrackerState,
  learnPracticeState,
  learnReferencesState,
  learnSyllabusState,
  learnTabState,
} from "../src/domain/learn.mjs";

const sociology = JSON.parse(
  readFileSync(join(dirname(fileURLToPath(import.meta.url)), "../fixtures/sociology-course.json"), "utf8"),
);

test("learn intro uses session copy and Hyperknow fallbacks", () => {
  const course = ingestCourse(sociology);
  const session = course.units[0].lectures[0].sessions[0];
  const lecture = course.units[0].lectures[0];
  const intro = learnIntroState({ session, lecture, phase: "intro" });
  assert.equal(intro.showIntro, true);
  assert.equal(intro.title, session.title);
  assert.match(intro.description, /sociological imagination|personal troubles/i);
  assert.equal(intro.eyebrow, LEARN_INTRO.eyebrow);
  assert.equal(intro.startLabel, LEARN_INTRO.start);
  const started = learnIntroState({ session, lecture, phase: "play" });
  assert.equal(started.showIntro, false);
  const mastered = learnIntroState({
    session,
    lecture,
    phase: "intro",
    progress: { state: "mastered" },
  });
  assert.equal(mastered.showIntro, false);
  const empty = learnIntroState({ session: {}, lecture: {}, phase: "intro" });
  assert.equal(empty.title, LEARN_INTRO.titleFallback);
  assert.equal(empty.description, LEARN_INTRO.descriptionFallback);
});

test("learn outline panel uses description and Hyperknow empty copy", () => {
  const course = ingestCourse(sociology);
  const session = course.units[0].lectures[0].sessions[0];
  const lecture = course.units[0].lectures[0];
  const filled = learnOutlineState({ session, lecture });
  assert.equal(filled.empty, false);
  assert.equal(filled.title, LEARN_OUTLINE.title);
  assert.match(filled.body, /sociological imagination|personal troubles/i);
  const fromOutline = learnOutlineState({
    session: { lectureOutline: "Mills first, then biography vs history." },
  });
  assert.equal(fromOutline.body, "Mills first, then biography vs history.");
  const vacant = learnOutlineState({ session: {}, lecture: {} });
  assert.equal(vacant.empty, true);
  assert.equal(vacant.emptyCopy, LEARN_OUTLINE.empty);
  assert.equal(vacant.emptyCopy, "此学习节暂无大纲。");
});

test("learn crumbs are unit › lecture from session titles", () => {
  const course = ingestCourse(sociology);
  const unit = course.units[0];
  const lecture = unit.lectures[0];
  const crumbs = learnCrumbState({ unit, lecture });
  assert.equal(crumbs.empty, false);
  assert.equal(crumbs.crumbs.length, 2);
  assert.equal(crumbs.crumbs[0].kind, "unit");
  assert.equal(crumbs.crumbs[0].label, unit.title);
  assert.equal(crumbs.crumbs[1].kind, "lecture");
  assert.equal(crumbs.crumbs[1].label, lecture.title);
  assert.equal(crumbs.label, `${unit.title} › ${lecture.title}`);
  assert.equal(learnCrumbState({}).empty, true);
});

test("learn references block uses Hyperknow empty copy and lists titles", () => {
  const vacant = learnReferencesState({ session: {} });
  assert.equal(vacant.empty, true);
  assert.equal(vacant.emptyCopy, LEARN_REFS.empty);
  assert.equal(vacant.title, "参考资料");
  const course = ingestCourse(sociology);
  const session = course.units[0].lectures[0].sessions[0];
  const filled = learnReferencesState({ session });
  assert.equal(filled.empty, false);
  assert.match(filled.items[0].title, /Mills/);
  const named = learnReferencesState({
    session: { references: [{ referenceName: "Durkheim", page_range: "pp. 12–18", usage: "skim" }] },
  });
  assert.equal(named.items[0].title, "Durkheim");
  assert.equal(named.items[0].meta, "pp. 12–18 · skim");
});

test("learn practice footer is always on; keypoints hide when empty", () => {
  const course = ingestCourse(sociology);
  const session = course.units[0].lectures[0].sessions[0];
  const practice = learnPracticeState({ session, courseId: course.courseId });
  assert.equal(practice.show, true);
  assert.match(practice.href, /\/practice\//);
  assert.equal(practice.practiceStart, LEARN_FOOTER.practiceStart);
  const points = learnKeypointsState({ session });
  assert.equal(points.show, true);
  assert.ok(points.items.length >= 2);
  const hidden = learnKeypointsState({ session: { keyPoints: [] } });
  assert.equal(hidden.show, false);
  assert.equal(hidden.items.length, 0);
});

test("learn syllabus/artifacts tabs and empty artifacts copy", () => {
  const course = ingestCourse(sociology);
  const session = course.units[0].lectures[0].sessions[0];
  assert.equal(learnTabState("nope").tab, "syllabus");
  const syllabus = learnSyllabusState({ course, sessionId: session.sessionId });
  assert.ok(syllabus.sessions.length >= 2);
  assert.equal(syllabus.sessions[0].current, true);
  const empty = learnArtifactsState({ artifacts: [] });
  assert.equal(empty.empty, true);
  assert.equal(empty.emptyCopy, LEARN_TAB.noArtifacts);
  assert.equal(empty.emptyCopy, "暂无内容");
  const filled = learnArtifactsState({
    artifacts: [{ id: "a1", prompt: "Mills quiz", artifacts: { quiz: { questions: [] } } }],
  });
  assert.equal(filled.empty, false);
  assert.equal(filled.items[0].title, "Mills quiz");
  assert.deepEqual(filled.items[0].kinds, ["quiz"]);
  const withNotes = learnArtifactsState({
    artifacts: [],
    notes: learnNoteCardsState({ session }).cards,
  });
  assert.equal(withNotes.empty, false);
  assert.equal(withNotes.items[0].kinds[0], LEARN_TAB.noteCard);
  const withArt = learnArtifactsState({
    artifacts: [],
    illustration: learnIllustrationState({ session }),
  });
  assert.equal(withArt.empty, false);
  assert.equal(withArt.items[0].kinds[0], LEARN_TAB.boardImage);
  assert.match(withArt.items[0].title, /biography overlapping history/i);
});

test("learn note cards paint keyPoints as noteCard widgets", () => {
  const course = ingestCourse(sociology);
  const session = course.units[0].lectures[0].sessions[0];
  const notes = learnNoteCardsState({ session });
  assert.equal(notes.show, true);
  assert.ok(notes.cards.length >= 2);
  assert.equal(notes.cards[0].kind, "noteCard");
  assert.equal(notes.cards[0].kindLabel, "笔记");
  assert.equal(learnNoteCardsState({ session: { keyPoints: [] } }).show, false);
});

test("learn quiz overlay paints stored quiz pack without generate", () => {
  const hidden = learnQuizOverlayState({ artifacts: [] });
  assert.equal(hidden.show, false);
  const quiz = learnQuizOverlayState({
    artifacts: [
      {
        prompt: "Mills check",
        artifacts: { quiz: { questions: [{ prompt: "Central idea?", choices: ["detail", "concept"], answer: 1 }] } },
      },
    ],
  });
  assert.equal(quiz.show, true);
  assert.equal(quiz.kindLabel, LEARN_TAB.quiz);
  assert.equal(quiz.questions[0].correctAnswers[0], "concept");
});

test("learn quiz overlay stays on this session and hides leftover packs", () => {
  const course = ingestCourse(sociology);
  const session = course.units[0].lectures[0].sessions[0];
  const leak = {
    prompt: "线性回归 cheatsheet quiz flashcards",
    artifacts: { quiz: { questions: [{ prompt: "slope?", choices: ["a", "b"], answer: 0 }] } },
  };
  const own = {
    courseId: course.courseId,
    sessionId: session.sessionId,
    prompt: session.title,
    artifacts: { quiz: { questions: [{ prompt: "个人困扰与公共议题?", choices: ["yes", "no"], answer: 0 }] } },
  };
  assert.equal(artifactMatchesSession(leak, { courseId: course.courseId, sessionId: session.sessionId, session }), false);
  assert.equal(artifactMatchesSession(own, { courseId: course.courseId, sessionId: session.sessionId, session }), true);
  const scoped = learnQuizOverlayState({
    artifacts: [leak, own],
    courseId: course.courseId,
    sessionId: session.sessionId,
    session,
  });
  assert.equal(scoped.show, true);
  assert.equal(scoped.title, session.title);
  const agency = course.units[0].lectures[0].sessions[1];
  const hidden = learnQuizOverlayState({
    artifacts: [leak, own],
    courseId: course.courseId,
    sessionId: agency.sessionId,
    session: agency,
  });
  assert.equal(hidden.show, false);
});

test("learn tracker is hidden when keypoints empty and lights current/done", () => {
  assert.equal(learnTrackerState({ session: { keyPoints: [] } }).show, false);
  const course = ingestCourse(sociology);
  const session = course.units[0].lectures[0].sessions[0];
  const idle = learnTrackerState({ session, done: [] });
  assert.equal(idle.show, true);
  assert.equal(idle.label, "课堂要点");
  assert.equal(idle.stops[0].status, "current");
  assert.equal(idle.stops[1].status, "upcoming");
  const progressed = learnTrackerState({ session, done: [0] });
  assert.equal(progressed.stops[0].status, "done");
  assert.equal(progressed.stops[1].status, "current");
  const mastered = learnTrackerState({ session, done: [], mastered: true });
  assert.ok(mastered.stops.every((s) => s.status === "done"));
});

test("learn illustration paints stored boardImage and hides when empty", () => {
  assert.equal(learnIllustrationState({ session: {} }).show, false);
  const course = ingestCourse(sociology);
  const session = course.units[0].lectures[0].sessions[0];
  const filled = learnIllustrationState({ session });
  assert.equal(filled.show, true);
  assert.equal(filled.kind, "boardImage");
  assert.equal(filled.kindLabel, LEARN_TAB.boardImage);
  assert.match(filled.src, /learn-illustration/);
  assert.match(filled.caption, /biography overlapping history/i);
  const agency = course.units[0].lectures[0].sessions[1];
  assert.equal(learnIllustrationState({ session: agency }).show, false);
  const fromPack = learnIllustrationState({
    session: {},
    artifacts: [{ prompt: "Venn", artifacts: { imageUrl: "/assets/learn-illustration.jpg" } }],
  });
  assert.equal(fromPack.show, true);
  assert.equal(fromPack.src, "/assets/learn-illustration.jpg");
  const fromSvg = learnIllustrationState({
    session: {},
    artifacts: [{ diagram: { svg: "<svg></svg>", title: "walk" } }],
  });
  assert.equal(fromSvg.show, true);
  assert.match(fromSvg.svg, /svg/);
});

test("learn picker lists stored courses then whiteboard sessions", () => {
  const empty = learnPickerState({ courses: [] });
  assert.equal(empty.emptyCourses, true);
  assert.equal(empty.noCourses, LEARN_PICKER.noCourses);
  assert.equal(empty.selectCourse, "选择课程");
  const loading = learnPickerState({ courses: [], loadingCourses: true });
  assert.equal(loading.emptyCourses, false);
  assert.equal(loading.loadingCoursesCopy, LEARN_PICKER.loadingCourses);
  const course = ingestCourse(sociology);
  const catalog = learnPickerState({ courses: [course] });
  assert.equal(catalog.emptyCourses, false);
  assert.equal(catalog.courses[0].id, course.courseId);
  const picked = learnPickerState({ courses: [course], course });
  assert.equal(picked.hasCourse, true);
  assert.ok(picked.sessions.length >= 2);
  assert.match(picked.sessions[0].href, /sessions\/whiteboard/);
  assert.equal(picked.selectSession, LEARN_PICKER.selectSession);
  const vacant = learnPickerState({ courses: [course], course: { ...course, units: [] } });
  assert.equal(vacant.emptySessions, true);
  assert.equal(vacant.noSessions, LEARN_PICKER.noSessions);
});
