/**
 * Deep Learn session outline from a course graph (units → tasks).
 * Hyperknow: outline confirm + session with prev/next, percent, lock.
 * Crafted Instant Assist sessions are independent of a course graph.
 */

import { readFile, searchFiles, stripAssistPrefix, teachingExcerpt } from "./kb.mjs";

const generatedSessions = new Map();

export function craftedDeepLearnId(id = "") {
  return /^dl_/.test(String(id || "").trim());
}

export function registerDeepLearnSession(raw = {}) {
  const id = String(raw.id || raw.sessionId || "").trim();
  if (!id) return raw;
  const session = { ...raw, id, sessionId: raw.sessionId || id };
  generatedSessions.set(id, session);
  return session;
}

export function hasCraftedDeepLearn(id = "") {
  return generatedSessions.has(String(id || "").trim());
}

export function getDeepLearnSession(id = "") {
  return generatedSessions.get(String(id || "").trim()) || null;
}

export function craftDeepLearnSession({ topic = "", drive = null } = {}) {
  const subject = stripAssistPrefix(topic).slice(0, 80) || "这一课";
  const hits = searchFiles(drive, topic || subject);
  const files = hits.slice(0, 3).map((h) => readFile(drive, h.id)).filter((f) => f?.ok);
  const id = `dl_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
  const beats = [
    { unitTitle: "先建立图像", angle: "先画出工作图像，再说它表示什么。" },
    { unitTitle: "机制", angle: "指出支配关系，不要跳步。" },
    { unitTitle: "对照例子", angle: "对照一个例子，问同样的机制还成立吗。" },
    { unitTitle: "自检", angle: "用自己的话写出现象，再问自己卡在哪。" },
  ];
  const tasks = beats.map((beat, i) => {
    const file = files[i] || files[0];
    const basedOn = file?.filename || "";
    const excerpt = file ? teachingExcerpt(file.text, 180) : "";
    return {
      taskId: `${id}_t${i + 1}`,
      unitId: `u${i + 1}`,
      unitTitle: beat.unitTitle,
      lectureTitle: subject,
      title: subject,
      description: basedOn
        ? `根据公开教材《${basedOn}》。${beat.angle}${excerpt ? `\n${excerpt}` : ""}`
        : beat.angle,
      basedOn,
      locked: i > 0,
      started: i === 0,
      completed: false,
    };
  });
  const units = beats.map((beat, i) => ({
    unitId: `u${i + 1}`,
    title: beat.unitTitle,
    lectures: [
      {
        lectureId: `u${i + 1}l1`,
        title: subject,
        sessions: [
          {
            sessionId: tasks[i].taskId,
            title: tasks[i].title,
            description: tasks[i].description,
          },
        ],
      },
    ],
  }));
  const session = {
    kind: "deeplearn",
    id,
    sessionId: id,
    courseId: id,
    title: subject,
    basedOn: files[0]?.filename || "",
    units,
    tasks,
    current: tasks[0] || null,
    percent: 0,
    percentLabel: "0% Good work!",
    prevLabel: "没有上一节",
    nextLabel: tasks[1]?.title || "没有下一节",
    empty: tasks.length === 0,
    at: new Date().toISOString(),
  };
  return registerDeepLearnSession(session);
}

export function outlineFromCourse(course, { sessionId } = {}) {
  if (!course?.units?.length) throw new Error("course with units required");
  const tasks = [];
  for (const unit of course.units) {
    for (const lecture of unit.lectures || []) {
      for (const session of lecture.sessions || []) {
        const progress = course.progress?.sessions?.[session.sessionId];
        tasks.push({
          taskId: session.sessionId,
          unitId: unit.unitId,
          unitTitle: unit.title,
          lectureTitle: lecture.title,
          title: session.title,
          description: session.description || "",
          locked: tasks.length > 0 && !(progress?.started || progress?.learnOpened),
          started: Boolean(progress?.started || progress?.learnOpened),
          completed: Boolean(progress?.completed || progress?.state === "mastered"),
        });
      }
    }
  }
  const currentIndex = Math.max(
    0,
    tasks.findIndex((t) => t.taskId === sessionId || (!sessionId && !t.completed)),
  );
  const safeIndex = currentIndex < 0 ? 0 : currentIndex;
  const done = tasks.filter((t) => t.completed).length;
  const percent = tasks.length ? Math.round((done / tasks.length) * 100) : 0;
  const current = tasks[safeIndex] || null;
  const prev = tasks[safeIndex - 1] || null;
  const next = tasks[safeIndex + 1] || null;
  return {
    sessionId: sessionId || `dl_${course.courseId}`,
    courseId: course.courseId,
    title: course.title,
    percent,
    percentLabel: `${percent}% Good work!`,
    tasks,
    current,
    prevLabel: prev ? prev.title : "没有上一节",
    nextLabel: next ? next.title : "没有下一节",
    empty: tasks.length === 0,
  };
}

export function selectOutlineTask(outline, taskId) {
  const idx = outline.tasks.findIndex((t) => t.taskId === taskId);
  if (idx < 0) throw new Error(`Unknown Deep Learn task ${taskId}`);
  const current = outline.tasks[idx];
  const prev = outline.tasks[idx - 1];
  const next = outline.tasks[idx + 1];
  return {
    ...outline,
    current,
    prevLabel: prev ? prev.title : "没有上一节",
    nextLabel: next ? next.title : "没有下一节",
  };
}

export function unlockOutlineTask(outline, taskId) {
  const tasks = outline.tasks.map((t) =>
    t.taskId === taskId ? { ...t, locked: false, started: true } : t,
  );
  return selectOutlineTask({ ...outline, tasks }, taskId);
}

export function stepOutline(outline, dir) {
  const idx = outline.tasks.findIndex((t) => t.taskId === outline.current?.taskId);
  const nextIdx = dir === "prev" ? idx - 1 : idx + 1;
  if (nextIdx < 0 || nextIdx >= outline.tasks.length) return outline;
  const target = outline.tasks[nextIdx];
  if (target.locked) return outline;
  return selectOutlineTask(outline, target.taskId);
}

/** Withhold the answer; only a probe the learner can act on. */
export function socraticHint({ topic, question = "", step = 0, sourceText = "", sourceName = "" } = {}) {
  const subject = String(topic || question || "这一节")
    .replace(/^Give a hint, not the answer, for:\s*/i, "")
    .replace(/\.?\s*step=\d+\s*$/i, "")
    .trim()
    .slice(0, 80) || "这一节";
  const file = String(sourceName || "").replace(/^.*\//, "").slice(0, 48);
  const grounded = Boolean(String(sourceText || "").trim() && file);
  const probes = grounded
    ? [
        `先别下定义。翻开《${file}》，用自己的话写出「${subject}」要解释的现象。`,
        `《${file}》里的机制是哪一步？指出它，不要抄整段、也不要写答案。`,
        `举一个和《${file}》不同的例子，问：同样的机制还成立吗？`,
      ]
    : [
        `先别下定义。用自己的话写出「${subject}」要解释的现象是什么。`,
        `把现象拆开：谁在行动？受哪一层结构约束？`,
        `举一个你自己的例子，再问：这只是私事，还是公共结构？`,
      ];
  const i = Math.max(0, Math.min(Number(step) || 0, probes.length - 1));
  const hint = probes[i];
  return {
    kind: "hint",
    topic: subject,
    step: i,
    hint,
    nextStep: Math.min(i + 1, probes.length - 1),
    withheld: true,
    retrieved: grounded,
    sourceName: grounded ? file : "",
    emptyCopy: "这道题卡住了？向我要个提示或讲解吧——我了解这节课的内容，但不会直接告诉你答案。",
  };
}
