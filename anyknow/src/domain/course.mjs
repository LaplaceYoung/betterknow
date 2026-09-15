import {
  initExamProgress,
  initProjectProgress,
  initSessionProgress,
  transitionProgress,
} from "./progress.mjs";

const JOIN_LANGUAGES = new Set(["zh", "en", "中文", "English"]);

function normLang(language) {
  if (language === "中文" || language === "zh-CN" || language === "zh") return "zh";
  if (language === "English" || language === "en" || language === "en-US") return "en";
  throw new Error(`Unsupported join language: ${language}`);
}

function requireText(value, field) {
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`${field} is required`);
  }
  return value.trim();
}

function normalizeReferences(refs) {
  if (!Array.isArray(refs)) return [];
  return refs
    .map((ref, i) => {
      if (typeof ref === "string") {
        const title = ref.trim();
        return title ? { referenceId: `ref-${i + 1}`, title } : null;
      }
      if (!ref || typeof ref !== "object") return null;
      const title = String(ref.title || ref.referenceName || ref.name || ref.filename || "").trim();
      return {
        referenceId: ref.referenceId || ref.id || `ref-${i + 1}`,
        title: title || `参考资料 ${i + 1}`,
        pageRange: ref.page_range || ref.pageRange || "",
        usage: ref.usage || "",
        url: ref.url || ref.href || "",
      };
    })
    .filter(Boolean);
}

function sessionIdFor(unit, lecture, session, index) {
  return (
    session.sessionId ||
    session.id ||
    `${unit.unitId}:${lecture.lectureId}:s${session.sessionIndex ?? index + 1}`
  );
}

/**
 * Ingest a Hyperknow-shaped course payload into a 1:1 course graph:
 * units → lectures → sessions, each session exposing 学习 + 练习,
 * plus 项目 and 测验 nodes on units.
 */
export function ingestCourse(payload) {
  if (!payload || typeof payload !== "object") throw new Error("course payload required");
  const unitsIn = payload.units || payload.structure?.units;
  if (!Array.isArray(unitsIn) || unitsIn.length === 0) {
    throw new Error("course must include units");
  }

  const courseId =
    payload.courseUuid || payload.courseId || payload.id || cryptoRandom();
  const title = requireText(payload.courseTitle || payload.title, "courseTitle");

  const units = unitsIn.map((unit, ui) => {
    const unitId = unit.unitId || unit.id || `unit${ui + 1}`;
    const lecturesIn = unit.lectures;
    if (!Array.isArray(lecturesIn) || lecturesIn.length === 0) {
      throw new Error(`unit ${unitId} must include lectures`);
    }
    const lectures = lecturesIn.map((lecture, li) => {
      const lectureId = lecture.lectureId || lecture.id || `${unitId}Lecture${li + 1}`;
      const sessionsIn = lecture.sessions;
      if (!Array.isArray(sessionsIn) || sessionsIn.length === 0) {
        throw new Error(`lecture ${lectureId} must include sessions`);
      }
      const sessions = sessionsIn.map((session, si) => {
        const sessionId = sessionIdFor(unit, { lectureId }, session, si);
        const practice = normalizePractice(session.practice);
        const sessionType = session.session_type || session.sessionType || "whiteboard";
        const pdfSession = sessionType === "pdf-annotate" || sessionType === "pdf" || sessionType === "pdf_annotate";
        return {
          sessionId,
          sessionIndex: session.sessionIndex ?? si + 1,
          sessionType,
          title: requireText(session.title, "session.title"),
          description: session.description || "",
          lectureOutline: session.lectureOutline || session.sessionOutline || session.lecture_outline || "",
          sessionOutline: session.sessionOutline || session.lectureOutline || "",
          keyPoints: session.keyPoints || session.key_points || [],
          references: normalizeReferences(session.references),
          boardImage: session.boardImage ||
            (session.illustration || session.imageUrl
              ? { imageUrl: session.illustration || session.imageUrl, caption: session.illustrationCaption || "" }
              : null),
          practice,
          learn: {
            kind: "学习",
            href: pdfSession
              ? `/pdf-session/${sessionId}`
              : `/course/${courseId}/sessions/whiteboard/${sessionId}`,
          },
          drill: { kind: "练习", href: `/course/${courseId}/practice/${sessionId}` },
        };
      });
      return {
        lectureId,
        title: requireText(lecture.title, "lecture.title"),
        description: lecture.description || "",
        order: lecture.order ?? li + 1,
        sessions,
      };
    });

    const projects = (unit.projects || []).map((p, pi) => ({
      stageId: p.stage_id || p.stageId || p.project_id || `${unitId}-project-${pi + 1}`,
      title: p.stage_title || p.project_name || p.title || `项目 ${pi + 1}`,
      description: p.stage_description || p.project_description || p.description || "",
      kind: "项目",
      steps: Array.isArray(p.steps) ? p.steps : null,
    }));
    const exams = (unit.exams || []).map((e, ei) => ({
      examId: e.examId || `${unitId}-exam-${ei + 1}`,
      title: e.title || `${unit.title || unitId} 测验`,
      goal: e.goal || "",
      kind: "测验",
      questions: Array.isArray(e.questions) ? e.questions : null,
    }));

    return {
      unitId,
      title: requireText(unit.title, "unit.title"),
      description: unit.description || "",
      lectures,
      projects,
      exams,
    };
  });

  const graph = {
    courseId,
    title,
    description: payload.courseDescription || payload.description || "",
    tags: payload.tags || [],
    subject: payload.subject || null,
    source: payload.source || "craft",
    files: payload.files || [],
    joined: false,
    language: null,
    languageLocked: false,
    units,
    projects: (payload.projects || []).map((p, i) => ({
      projectId: p.project_id || p.projectId || `project-${i + 1}`,
      title: p.project_name || p.title,
      description: p.project_description || p.description || "",
    })),
    progress: buildInitialProgress(units),
  };

  assertLearnAndPractice(graph);
  return graph;
}

function normalizePractice(practice) {
  let tasks = [];
  if (Array.isArray(practice?.tasks) && practice.tasks.length) {
    tasks = practice.tasks.map((t) => (typeof t === "string" ? t : t.prompt || t.question || String(t)));
  } else if (Array.isArray(practice?.questions) && practice.questions.length) {
    tasks = practice.questions.map((q) => (typeof q === "string" ? q : q.prompt || q.question || String(q)));
  } else {
    tasks = ["Explain the session's core idea in your own words."];
  }
  const questions =
    Array.isArray(practice?.questions) && practice.questions.length
      ? practice.questions
      : tasks.map((prompt, i) => ({
          id: `pq${i + 1}`,
          type: "fill",
          prompt: String(prompt),
          correctAnswers: [],
          explanation: "用自己的话写清楚即可。",
        }));
  return { tasks, questions };
}

function buildInitialProgress(units) {
  const sessions = {};
  const projects = {};
  const exams = {};
  for (const unit of units) {
    for (const lecture of unit.lectures) {
      for (const session of lecture.sessions) {
        sessions[session.sessionId] = initSessionProgress(session);
      }
    }
    for (const project of unit.projects) {
      projects[project.stageId] = initProjectProgress({
        stage_id: project.stageId,
      });
    }
    for (const exam of unit.exams) {
      exams[exam.examId] = initExamProgress(exam, unit.unitId);
    }
  }
  return { sessions, projects, exams };
}

function assertLearnAndPractice(graph) {
  for (const unit of graph.units) {
    for (const lecture of unit.lectures) {
      for (const session of lecture.sessions) {
        if (session.learn?.kind !== "学习") {
          throw new Error(`session ${session.sessionId} missing 学习`);
        }
        if (session.drill?.kind !== "练习") {
          throw new Error(`session ${session.sessionId} missing 练习`);
        }
        if (!session.practice?.tasks?.length) {
          throw new Error(`session ${session.sessionId} missing practice tasks`);
        }
      }
    }
  }
}

/**
 * Join a course. Language is chosen at join and then fixed.
 */
export function joinCourse(course, { language } = {}) {
  if (!course) throw new Error("course required");
  const lang = normLang(language);
  if (!JOIN_LANGUAGES.has(language) && lang !== "zh" && lang !== "en") {
    throw new Error("language required at join");
  }
  if (course.joined && course.languageLocked && course.language !== lang) {
    throw new Error(
      `Course language is locked to ${course.language}; cannot switch to ${lang}`,
    );
  }
  return {
    ...course,
    joined: true,
    language: lang,
    languageLocked: true,
    joinedAt: course.joinedAt || new Date().toISOString(),
  };
}

export function openLearnSession(course, sessionId) {
  return patchSession(course, sessionId, (node) => {
    const advanced = transitionProgress(node, node.state === "notStarted" ? "start" : "attempt");
    return { ...advanced, learnOpened: true };
  });
}

export function openPracticeSession(course, sessionId) {
  return patchSession(course, sessionId, (node) => {
    const event = node.state === "notStarted" ? "start" : "familiar";
    const advanced = transitionProgress(node, event);
    return { ...advanced, practiceOpened: true };
  });
}

export function markSessionProgress(course, sessionId, event) {
  return patchSession(course, sessionId, (node) => transitionProgress(node, event));
}

export function markProjectProgress(course, stageId, event) {
  const node = course.progress.projects[stageId];
  if (!node) throw new Error(`Unknown project stage ${stageId}`);
  const next = transitionProgress(node, event);
  return {
    ...course,
    progress: {
      ...course.progress,
      projects: { ...course.progress.projects, [stageId]: next },
    },
  };
}

export function markExamProgress(course, examId, event) {
  const node = course.progress.exams[examId];
  if (!node) throw new Error(`Unknown exam ${examId}`);
  const next = transitionProgress(node, event);
  return {
    ...course,
    progress: {
      ...course.progress,
      exams: { ...course.progress.exams, [examId]: next },
    },
  };
}

function patchSession(course, sessionId, fn) {
  const node = course.progress.sessions[sessionId];
  if (!node) throw new Error(`Unknown session ${sessionId}`);
  const next = fn(node);
  return {
    ...course,
    progress: {
      ...course.progress,
      sessions: { ...course.progress.sessions, [sessionId]: next },
    },
  };
}

/**
 * Attach uploaded file text as course source material (Hyperknow "extend this course").
 */
export function extendCourseWithFile(course, file) {
  if (!file || typeof file.text !== "string") throw new Error("file.text required");
  const entry = {
    fileId: file.fileId || cryptoRandom(),
    filename: file.filename || "upload.txt",
    text: file.text,
    addedAt: new Date().toISOString(),
  };
  return { ...course, files: [...(course.files || []), entry] };
}

export function listSessions(course) {
  const out = [];
  for (const unit of course.units) {
    for (const lecture of unit.lectures) {
      for (const session of lecture.sessions) {
        out.push({ unit, lecture, session });
      }
    }
  }
  return out;
}

function cryptoRandom() {
  return `c_${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36)}`;
}
