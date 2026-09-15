/** Course exam bank + leftover dump replay (stored questions only). */

import { EXAM_SESSIONS } from "./exam-catalog.mjs";
import { PRACTICE_SESSIONS } from "./practice-catalog.mjs";
import { chalkboardAnimation, chalkboardImage } from "./media.mjs";

export const EXAM_EMPTY = Object.freeze({
  missing: "这个单元还没有考试题。",
  pending: "考试还在准备中，请稍后再来看看。",
});

export const EXAM_TIMER_MS = 30 * 60 * 1000;

function findLeftoverCourse(id, leftovers) {
  const key = String(id || "").trim();
  return (Array.isArray(leftovers) ? leftovers : []).find(
    (row) => row.id === key || (row.aliases || []).includes(key),
  );
}

export function leftoverExamState({ courseId = "", examId = "", leftovers = EXAM_SESSIONS } = {}) {
  const course = findLeftoverCourse(courseId, leftovers);
  if (!course) {
    return {
      ok: false,
      leftover: false,
      empty: true,
      restarted: false,
      emptyCopy: EXAM_EMPTY.missing,
      questions: [],
      timed: false,
    };
  }
  const key = String(examId || "").trim();
  const found = (course.exams || []).find((exam) => exam.examId === key || exam.unitId === key);
  const restarted = Boolean(key) && !found;
  const exam = found || course.exams[0];
  const questions = (exam?.questions || []).map((q, i) => normalizeQuestion(q, i));
  return {
    ok: questions.length > 0,
    leftover: true,
    empty: questions.length === 0,
    restarted,
    emptyCopy: questions.length ? "" : EXAM_EMPTY.empty || EXAM_EMPTY.missing,
    examId: exam?.examId || key,
    unitId: exam?.unitId || "",
    courseId: course.id,
    courseTitle: course.title,
    title: exam?.title || "单元测验",
    goal: exam?.goal || "",
    timed: true,
    durationMs: EXAM_TIMER_MS,
    questions,
  };
}

export function hasLeftoverExam(courseId, examId = "") {
  const board = leftoverExamState({ courseId, examId });
  return board.leftover && (board.ok || board.restarted);
}

export function leftoverPracticeState({ courseId = "", sessionId = "", leftovers = PRACTICE_SESSIONS } = {}) {
  const course = findLeftoverCourse(courseId, leftovers);
  if (!course) {
    return {
      ok: false,
      leftover: false,
      empty: true,
      restarted: false,
      emptyCopy: PRACTICE_EMPTY,
      questions: [],
      title: "练习",
    };
  }
  const key = String(sessionId || "").trim();
  const found = (course.sessions || []).find((row) => row.sessionId === key || (row.aliases || []).includes(key));
  const restarted = Boolean(key) && !found;
  const session = found || course.sessions[0];
  const questions = (session?.questions || []).map((q, i) => normalizeQuestion(q, i));
  return {
    ok: questions.length > 0,
    leftover: true,
    empty: questions.length === 0,
    restarted,
    emptyCopy: questions.length ? "" : PRACTICE_EMPTY,
    sessionId: session?.sessionId || key,
    courseId: course.id,
    courseTitle: course.title,
    title: session?.title || "练习",
    questions,
  };
}

export function hasLeftoverPractice(courseId, sessionId = "") {
  const board = leftoverPracticeState({ courseId, sessionId });
  return board.leftover && (board.ok || board.restarted);
}

export function normalizeQuestion(raw, index = 0) {
  if (!raw || typeof raw !== "object") throw new Error("question required");
  const type =
    raw.type === "multiple" || raw.type === "fill" || raw.type === "animation" ? raw.type : "single";
  const options = Array.isArray(raw.options) ? raw.options.map(String) : [];
  const correctAnswers = (raw.correctAnswers || raw.answers || []).map(String);
  const prompt = String(raw.prompt || raw.stem || raw.title || "").trim();
  if (!prompt) throw new Error("question.prompt required");
  const caption = String(raw.caption || raw.image?.alt || "");
  const animation =
    type === "animation" || raw.animation || raw.scene
      ? chalkboardAnimation({
          topic: prompt,
          title: raw.animation?.title,
          caption: caption || raw.animation?.caption || "",
          scene: raw.scene || raw.animation?.scene,
          beats: raw.beats || raw.animation?.beats,
        })
      : null;
  const image =
    !animation && (raw.image || caption)
      ? chalkboardImage({
          topic: prompt,
          caption,
          alt: raw.image?.alt || caption,
          scene: raw.image?.scene,
        })
      : null;
  return {
    id: raw.id || raw.questionId || `q${index + 1}`,
    type,
    prompt,
    options,
    explanation: raw.explanation || "",
    correctAnswers,
    placeholder: raw.placeholder || "填写答案",
    caption,
    animation,
    image,
  };
}

export function defaultQuestions(exam = {}) {
  const topic = String(exam.title || exam.goal || "本单元").slice(0, 48);
  return [
    {
      id: "q1",
      type: "single",
      prompt: `「${topic}」首先要求你抓住什么？`,
      options: ["一个孤立的私人故事", "个人经历与公共结构的交汇", "标准答案的背诵", "与结构无关的情绪"],
      correctAnswers: ["个人经历与公共结构的交汇"],
      explanation: "把私事放到公共结构里看，才是测验要检验的能力。",
    },
    {
      id: "q2",
      type: "multiple",
      prompt: `哪些做法仍然属于「${topic}」？`,
      options: ["写出谁在行动", "指出约束来自哪一层结构", "只记录心情", "用一个自己的例子重述"],
      correctAnswers: ["写出谁在行动", "指出约束来自哪一层结构", "用一个自己的例子重述"],
      explanation: "测验看的是拆解与迁移，不是情绪记录。",
    },
    {
      id: "q3",
      type: "fill",
      prompt: "提出 sociological imagination 的学者是 ____。",
      correctAnswers: ["C. Wright Mills", "Mills", "赖特·米尔斯"],
      placeholder: "学者姓名",
      explanation: "C. Wright Mills 把 biography 和 history 交在一起。",
    },
  ].map((q, i) => normalizeQuestion(q, i));
}

export function findExam(course, examId) {
  for (const unit of course?.units || []) {
    for (const exam of unit.exams || []) {
      if (exam.examId === examId) return { unit, exam };
    }
  }
  return null;
}

export function examBank(course, examId) {
  const leftover = leftoverExamState({ courseId: course?.courseId, examId });
  if (leftover.leftover && leftover.ok) return leftover;
  const found = findExam(course, examId);
  if (!found) {
    return {
      empty: true,
      emptyCopy: EXAM_EMPTY.missing,
      examId,
      title: "单元测验",
      questions: [],
    };
  }
  const { unit, exam } = found;
  const raw = exam.questions;
  const questions =
    Array.isArray(raw) && raw.length
      ? raw.map((q, i) => normalizeQuestion(q, i))
      : defaultQuestions(exam);
  return {
    empty: false,
    emptyCopy: "",
    examId: exam.examId,
    unitId: unit.unitId,
    unitTitle: unit.title,
    title: exam.title || "单元测验",
    goal: exam.goal || "",
    questions,
  };
}

function norm(s) {
  return String(s || "")
    .trim()
    .toLowerCase();
}

export function matchAnswer(question, given) {
  const expected = (question.correctAnswers || []).map(norm);
  if (question.type === "fill") {
    const value = norm(Array.isArray(given) ? given[0] : given);
    if (!expected.length) return value.length >= 8;
    return value.length > 0 && expected.includes(value);
  }
  if (question.type === "multiple") {
    const got = new Set((Array.isArray(given) ? given : given ? [given] : []).map(norm));
    if (!got.size || got.size !== expected.length) return false;
    return expected.every((x) => got.has(x));
  }
  const value = norm(Array.isArray(given) ? given[0] : given);
  return value.length > 0 && expected.includes(value);
}

export function gradeExam(questions = [], answers = {}) {
  const items = questions.map((q) => {
    const given = answers[q.id];
    const correct = matchAnswer(q, given);
    return {
      id: q.id,
      correct,
      given,
      expected: q.correctAnswers,
      explanation: q.explanation || "",
    };
  });
  const total = items.length;
  const correct = items.filter((i) => i.correct).length;
  const percent = total ? Math.round((correct / total) * 100) : 0;
  return {
    correct,
    total,
    percent,
    passed: percent >= 60,
    perfect: total > 0 && correct === total,
    items,
    titlePassed: "恭喜，你通过了！",
    titleFailed: "这次差一点",
    scoreDetail: `${correct} / ${total} 题正确`,
    timedOut: false,
  };
}

export function examRemainingMs(deadline, now = Date.now()) {
  if (!deadline) return 0;
  return Math.max(0, Number(deadline) - Number(now));
}

export function formatExamClock(ms) {
  const total = Math.max(0, Math.ceil(Number(ms) / 1000));
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export const PRACTICE_EMPTY = "这个课堂还没有练习题。";

export function practiceBank(session, { courseId } = {}) {
  const leftover = leftoverPracticeState({ courseId, sessionId: session?.sessionId });
  if (leftover.leftover && leftover.ok) return leftover;
  const raw = session?.practice?.questions;
  const tasks = session?.practice?.tasks || [];
  const source = Array.isArray(raw) && raw.length ? raw : tasks;
  const questions = [];
  source.forEach((q, i) => {
    try {
      if (typeof q === "string") {
        questions.push(
          normalizeQuestion(
            {
              id: `pq${i + 1}`,
              type: "fill",
              prompt: q,
              correctAnswers: [],
              explanation: "用自己的话写清楚即可。",
            },
            i,
          ),
        );
      } else {
        questions.push(normalizeQuestion(q, i));
      }
    } catch {
      /* skip malformed */
    }
  });
  if (!questions.length) {
    return { empty: true, emptyCopy: PRACTICE_EMPTY, title: session?.title || "练习", questions: [] };
  }
  return { empty: false, emptyCopy: "", title: session?.title || "练习", questions };
}

export function practiceStars(percent) {
  if (percent >= 80) return 3;
  if (percent >= 55) return 2;
  if (percent >= 25) return 1;
  return 0;
}

export function practiceOutcome(questions, answers, checked = {}) {
  const grade = gradeExam(questions, answers);
  const items = grade.items.map((item) => ({
    ...item,
    skipped: Boolean(checked[item.id]?.skipped),
    correct: checked[item.id]?.skipped ? false : item.correct,
  }));
  const correct = items.filter((i) => i.correct).length;
  const total = items.length;
  const percent = total ? Math.round((correct / total) * 100) : 0;
  const stars = practiceStars(percent);
  const perfect = total > 0 && correct === total;
  return {
    ...grade,
    items,
    correct,
    total,
    percent,
    perfect,
    passed: perfect,
    stars,
    starLabel: ["再来一轮", "还需巩固", "不错", "优秀"][stars],
    event: perfect ? "master" : percent >= 50 ? "proficient" : "familiar",
    titlePassed: "恭喜，你通过了！",
    titleFailed: "这次差一点",
    scoreDetail: `${correct} / ${total} 题正确`,
    perfectRunDesc: "完美通关——本次练习已被标记为「已掌握」。",
    retryDesc: "全部答对才能通过。回顾一下答错的题目，再试一次——你可以的。",
  };
}
