/** Hyperknow whiteboard.outline overlay (no Excalidraw / video). */

import { listSessions } from "./course.mjs";
import { materialsPack } from "./materials.mjs";

export const LEARN_INTRO = Object.freeze({
  eyebrow: "本节学习内容",
  start: "开始学习",
  titleFallback: "学习节",
  descriptionFallback: "你即将开始这节课。我们会一步步讲解其中的关键内容。",
  mastered: "标记为已掌握",
});

export const LEARN_OUTLINE = Object.freeze({
  title: "学习节大纲",
  empty: "此学习节暂无大纲。",
});

export const LEARN_REFS = Object.freeze({
  title: "参考资料",
  empty: "此学习节暂无参考资料。",
  fallback: "参考资料",
});

export const LEARN_FOOTER = Object.freeze({
  learnSection: "学习",
  practiceSection: "练习",
  practiceStart: "开始",
});

export const LEARN_TRACKER = Object.freeze({
  label: "课堂要点",
});

export const LEARN_TABS = Object.freeze(["syllabus", "artifacts"]);

export const LEARN_TAB = Object.freeze({
  syllabus: "课程大纲",
  artifacts: "学习记录",
  noArtifacts: "暂无内容",
  noteCard: "笔记",
  quiz: "测验",
  boardImage: "插图",
});

export const LEARN_PICKER = Object.freeze({
  add: "课程学习节",
  selectCourse: "选择课程",
  selectSession: "选择学习节",
  loadingOutline: "正在加载学习节大纲…",
  loadingCourses: "正在加载课程…",
  loadingSessions: "正在加载学习节…",
  noCourses: "暂无可用课程",
  noSessions: "这个课程暂无学习节",
  missing: "未找到当前学习节。",
});

export function learnCrumbState({ unit = {}, lecture = {} } = {}) {
  const crumbs = [
    { kind: "unit", label: String(unit.title || "").trim() },
    { kind: "lecture", label: String(lecture.title || "").trim() },
  ].filter((c) => c.label);
  return {
    crumbs,
    label: crumbs.map((c) => c.label).join(" › "),
    empty: crumbs.length === 0,
  };
}

export function learnReferencesState({ session = {} } = {}) {
  const raw = Array.isArray(session.references) ? session.references : [];
  const items = raw
    .map((ref, i) => {
      if (typeof ref === "string") {
        const title = ref.trim();
        return title ? { id: `ref-${i + 1}`, title, meta: "", href: "" } : null;
      }
      const title = String(ref.title || ref.referenceName || ref.name || ref.filename || "").trim();
      const fallback = `${LEARN_REFS.fallback} ${i + 1}`;
      return {
        id: String(ref.referenceId || ref.id || `ref-${i + 1}`),
        title: title || fallback,
        meta: [ref.pageRange || ref.page_range, ref.usage].filter(Boolean).join(" · "),
        href: String(ref.url || ref.href || ""),
      };
    })
    .filter(Boolean);
  return {
    title: LEARN_REFS.title,
    items,
    empty: items.length === 0,
    emptyCopy: LEARN_REFS.empty,
  };
}

export function learnKeypointsState({ session = {} } = {}) {
  const raw = session.keyPoints || session.key_points || [];
  const items = (Array.isArray(raw) ? raw : [])
    .map((point) => (typeof point === "string" ? point.trim() : String(point?.text || point?.title || "").trim()))
    .filter(Boolean);
  return {
    items,
    show: items.length > 0,
    learnSection: LEARN_FOOTER.learnSection,
  };
}

export function learnTrackerState({ session = {}, done = [], mastered = false } = {}) {
  const points = learnKeypointsState({ session });
  if (!points.show) return { show: false, label: LEARN_TRACKER.label, stops: [] };
  const doneSet = new Set((done || []).map(Number));
  const firstOpen = points.items.findIndex((_, i) => !doneSet.has(i));
  const stops = points.items.map((title, i) => {
    let status = "upcoming";
    if (mastered || doneSet.has(i)) status = "done";
    else if (i === firstOpen) status = "current";
    return { title, status, index: i };
  });
  return { show: true, label: LEARN_TRACKER.label, stops };
}

export function learnNoteCardsState({ session = {} } = {}) {
  const points = learnKeypointsState({ session }).items;
  const cards = points.map((title, i) => ({
    id: `note-${i + 1}`,
    kind: "noteCard",
    kindLabel: LEARN_TAB.noteCard,
    title,
  }));
  return { cards, show: cards.length > 0 };
}

export function artifactMatchesSession(row, { courseId = "", sessionId = "", session = null } = {}) {
  if (!row) return false;
  const rowCourse = String(row.courseId || row.course_id || "").trim();
  const rowSession = String(row.sessionId || row.session_id || "").trim();
  if (rowSession) return Boolean(sessionId) && rowSession === sessionId;
  if (rowCourse) return Boolean(courseId) && rowCourse === courseId;
  const hay = String(row.prompt || row.title || "")
    .toLowerCase()
    .replace(/\s+/g, "");
  if (!hay) return false;
  const needles = [session?.title, session?.description, ...(session?.keyPoints || [])]
    .map((s) => String(s || "").trim().toLowerCase().replace(/\s+/g, ""))
    .filter((s) => s.length >= 2);
  if (!needles.length) return false;
  return needles.some((n) => hay.includes(n) || n.includes(hay));
}

function scopedArtifacts(artifacts, scope = {}) {
  const rows = Array.isArray(artifacts) ? artifacts : [];
  const live = Boolean(
    scope.courseId ||
      scope.sessionId ||
      String(scope.session?.sessionId || "").trim() ||
      String(scope.session?.title || "").trim(),
  );
  if (!live) return rows;
  return rows.filter((row) => artifactMatchesSession(row, scope));
}

export function learnIllustrationState({ session = {}, artifacts = [], courseId = "" } = {}) {
  const fromSession =
    (session.boardImage && (session.boardImage.imageUrl || session.boardImage.src)) ||
    session.illustration ||
    session.imageUrl ||
    "";
  const caption = String(session.boardImage?.caption || session.illustrationCaption || "").trim();
  if (fromSession) {
    return {
      show: true,
      kind: "boardImage",
      kindLabel: LEARN_TAB.boardImage,
      src: String(fromSession),
      svg: "",
      caption,
    };
  }
  for (const row of scopedArtifacts(artifacts, { courseId, sessionId: session.sessionId, session })) {
    const pack = row.artifacts || row;
    const svg = pack.diagram?.svg || row.diagram?.svg || "";
    const src = pack.imageUrl || pack.image || row.imageUrl || "";
    if (!src && !svg) continue;
    return {
      show: true,
      kind: "boardImage",
      kindLabel: LEARN_TAB.boardImage,
      src: String(src || ""),
      svg: String(svg || ""),
      caption: String(row.prompt || pack.diagram?.title || "").trim(),
    };
  }
  return { show: false, kind: "boardImage", kindLabel: LEARN_TAB.boardImage, src: "", svg: "", caption: "" };
}

export function learnQuizOverlayState({ artifacts = [], courseId = "", sessionId = "", session = null } = {}) {
  for (const row of scopedArtifacts(artifacts, { courseId, sessionId, session })) {
    const pack = materialsPack(row.artifacts || row);
    const questions = pack.quiz?.questions || [];
    if (!questions.length) continue;
    return {
      show: true,
      kind: "quiz",
      kindLabel: LEARN_TAB.quiz,
      title: String(row.prompt || pack.quiz.title || "").trim(),
      questions,
    };
  }
  return { show: false, kind: "quiz", kindLabel: LEARN_TAB.quiz, title: "", questions: [] };
}

export function learnTabState(tab = "syllabus") {
  const current = LEARN_TABS.includes(tab) ? tab : "syllabus";
  return { tab: current, tabs: LEARN_TABS.slice() };
}

export function learnPickerCourses(courses = []) {
  const seen = new Set();
  const rows = [];
  for (const course of Array.isArray(courses) ? courses : []) {
    const id = String(course.courseId || course.id || "").trim();
    if (!id || seen.has(id)) continue;
    seen.add(id);
    rows.push({
      id,
      title: String(course.title || course.courseTitle || "").trim() || id,
      meta: String(course.subject || course.topic || "").trim(),
    });
  }
  return rows;
}

export function learnPickerSessions(course) {
  if (!course) return [];
  return listSessions(course).map(({ unit, lecture, session }) => ({
    id: session.sessionId,
    title: session.title,
    meta: [unit.title, lecture.title].filter(Boolean).join(" · "),
    href: session.learn?.href || `/course/${course.courseId}/sessions/whiteboard/${session.sessionId}`,
  }));
}

export function learnPickerState({
  courses = [],
  course = null,
  loadingCourses = false,
  loadingSessions = false,
} = {}) {
  const courseRows = learnPickerCourses(courses);
  const sessionRows = course ? learnPickerSessions(course) : [];
  return {
    addLabel: LEARN_PICKER.add,
    selectCourse: LEARN_PICKER.selectCourse,
    selectSession: LEARN_PICKER.selectSession,
    courses: courseRows,
    sessions: sessionRows,
    loadingCourses,
    loadingSessions,
    loadingOutline: LEARN_PICKER.loadingOutline,
    loadingCoursesCopy: LEARN_PICKER.loadingCourses,
    loadingSessionsCopy: LEARN_PICKER.loadingSessions,
    emptyCourses: !loadingCourses && courseRows.length === 0,
    emptySessions: Boolean(course) && !loadingSessions && sessionRows.length === 0,
    noCourses: LEARN_PICKER.noCourses,
    noSessions: LEARN_PICKER.noSessions,
    missing: LEARN_PICKER.missing,
    hasCourse: Boolean(course),
    courseId: course?.courseId || "",
  };
}

export function learnSyllabusState({ course, sessionId } = {}) {
  const rows = listSessions(course || { units: [] }).map(({ unit, lecture, session }) => ({
    id: session.sessionId,
    title: session.title,
    meta: [unit.title, lecture.title].filter(Boolean).join(" · "),
    href: session.learn?.href || "",
    current: session.sessionId === sessionId,
  }));
  return { sessions: rows };
}

export function learnArtifactsState({ artifacts = [], notes = [], illustration = null, courseId = "", sessionId = "", session = null } = {}) {
  const illusItems =
    illustration && illustration.show
      ? [
          {
            id: "board-image",
            title: illustration.caption || LEARN_TAB.boardImage,
            kinds: [illustration.kindLabel || LEARN_TAB.boardImage],
          },
        ]
      : [];
  const noteItems = (Array.isArray(notes) ? notes : []).map((card) => ({
    id: card.id,
    title: card.title,
    kinds: [card.kindLabel || LEARN_TAB.noteCard],
  }));
  const packItems = scopedArtifacts(artifacts, { courseId, sessionId, session }).map((row, i) => {
    const pack = row.artifacts || row;
    const kinds = [];
    if (pack.cheatsheet) kinds.push("cheatsheet");
    if (pack.quiz) kinds.push("quiz");
    if (pack.flashcards) kinds.push("flashcards");
    if (row.kind && !kinds.length) kinds.push(row.kind);
    return {
      id: row.id || `art-${i + 1}`,
      title: String(row.prompt || row.title || "").trim() || `${LEARN_TAB.artifacts} ${i + 1}`,
      kinds,
    };
  });
  const items = [...illusItems, ...noteItems, ...packItems];
  return {
    items,
    empty: items.length === 0,
    emptyCopy: LEARN_TAB.noArtifacts,
  };
}

export function learnPracticeState({ session = {}, courseId = "" } = {}) {
  const href = session.drill?.href || (courseId && session.sessionId ? `/course/${courseId}/practice/${session.sessionId}` : "");
  return {
    show: Boolean(href),
    href,
    practiceSection: LEARN_FOOTER.practiceSection,
    practiceStart: LEARN_FOOTER.practiceStart,
  };
}

export function learnOutlineState({ session = {}, lecture = {} } = {}) {
  const body = String(
    session.lectureOutline || session.sessionOutline || session.description || lecture.description || "",
  ).trim();
  return {
    title: LEARN_OUTLINE.title,
    body,
    empty: !body,
    emptyCopy: LEARN_OUTLINE.empty,
  };
}

export function learnIntroState({
  session = {},
  lecture = {},
  progress = {},
  phase = "intro",
} = {}) {
  const title = String(session.title || "").trim() || LEARN_INTRO.titleFallback;
  const description =
    String(session.description || lecture.description || "").trim() || LEARN_INTRO.descriptionFallback;
  const mastered = progress.state === "mastered";
  const showIntro = phase === "intro" && !mastered;
  return {
    title,
    description,
    showIntro,
    mastered,
    eyebrow: LEARN_INTRO.eyebrow,
    startLabel: LEARN_INTRO.start,
  };
}
