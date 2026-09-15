/** Project stage walkthrough + leftover dump replay (stored steps only). */

import { PROJECT_SESSIONS } from "./project-catalog.mjs";

export const PROJECT_EMPTY = Object.freeze({
  missing: "缺少课程或阶段信息。",
  pending: "你的项目仍在准备中，请稍后再来查看。",
  none: "此阶段暂无步骤。",
  finishBlocked: "本阶段所有需要回复的步骤都通过后，才能结束。",
  chooseFile: "选择要提交的文件",
  needText: "需要作答",
  needImage: "需要上传图片",
  needPdf: "需要上传 PDF",
  needFile: "需要上传文件",
  passed: "已通过",
});

function findLeftoverCourse(id, leftovers) {
  const key = String(id || "").trim();
  return (Array.isArray(leftovers) ? leftovers : []).find(
    (row) => row.id === key || (row.aliases || []).includes(key),
  );
}

export function normalizeProjectStep(raw, index = 0) {
  const requireRaw = String(raw.require || raw.inputType || raw.upload_type || "text");
  const require =
    requireRaw === "image" || requireRaw === "pdf" || requireRaw === "file" ? requireRaw : "text";
  const required = raw.required === true || raw.need_response === true
    ? true
    : raw.required === false || raw.need_response === false
      ? false
      : true;
  return {
    id: raw.id || raw.step_id || `s${index + 1}`,
    title: raw.title || raw.step_title || `步骤 ${index + 1}`,
    prompt: String(raw.prompt || raw.step_body || raw.description || "").trim(),
    require,
    required,
    instruction: String(raw.instruction || raw.response_instruction || "").trim(),
  };
}

export function leftoverProjectState({
  courseId = "",
  stageId = "",
  leftovers = PROJECT_SESSIONS,
} = {}) {
  const course = findLeftoverCourse(courseId, leftovers);
  if (!course) {
    return {
      ok: false,
      leftover: false,
      empty: true,
      restarted: false,
      emptyCopy: PROJECT_EMPTY.pending,
      steps: [],
      title: "项目",
    };
  }
  const key = String(stageId || "").trim();
  const found = (course.stages || []).find((row) => row.stageId === key || row.unitId === key);
  const restarted = Boolean(key) && !found;
  const stage = found || course.stages[0];
  const steps = (stage?.steps || []).map((s, i) => normalizeProjectStep(s, i));
  return {
    ok: steps.length > 0,
    leftover: true,
    empty: steps.length === 0,
    restarted,
    emptyCopy: steps.length ? "" : PROJECT_EMPTY.none,
    stageId: stage?.stageId || key,
    unitId: stage?.unitId || "",
    courseId: course.id,
    courseTitle: course.title,
    title: stage?.title || "项目",
    description: stage?.description || "",
    deliverable: stage?.deliverable || "",
    steps,
  };
}

export function hasLeftoverProject(courseId, stageId = "") {
  const board = leftoverProjectState({ courseId, stageId });
  return board.leftover && (board.ok || board.restarted);
}

export function defaultProjectSteps(project = {}) {
  const topic = String(project.title || "本项目").slice(0, 48);
  return [
    {
      id: "s1",
      title: "明确对象",
      prompt: `用一两句话写出「${topic}」要观察的群体或现象。`,
      require: "text",
      required: true,
    },
    {
      id: "s2",
      title: "结构观察",
      prompt: "记下你看到的约束：谁在行动？受哪一层结构影响？",
      require: "text",
      required: true,
    },
    {
      id: "s3",
      title: "提交结论",
      prompt: "把私事重述成公共结构上的问题，作为本阶段成果。",
      require: "text",
      required: true,
    },
  ];
}

export function findProject(course, stageId) {
  for (const unit of course?.units || []) {
    for (const project of unit.projects || []) {
      if (project.stageId === stageId) return { unit, project };
    }
  }
  const top = (course?.projects || []).find((p) => p.projectId === stageId || p.stageId === stageId);
  if (top) return { unit: null, project: { ...top, stageId: top.projectId || top.stageId } };
  return null;
}

export function projectStage(course, stageId, { courseId } = {}) {
  const leftover = leftoverProjectState({
    courseId: courseId || course?.courseId,
    stageId,
  });
  if (leftover.leftover && leftover.ok) return leftover;
  const found = findProject(course, stageId);
  if (!found) {
    return { empty: true, emptyCopy: PROJECT_EMPTY.missing, steps: [], title: "项目" };
  }
  const { unit, project } = found;
  const raw = Array.isArray(project.steps) ? project.steps : defaultProjectSteps(project);
  const steps = raw.map((s, i) => normalizeProjectStep(s, i));
  if (!steps.length) {
    return {
      empty: true,
      emptyCopy: PROJECT_EMPTY.none,
      steps: [],
      title: project.title || "项目",
    };
  }
  return {
    empty: false,
    leftover: false,
    emptyCopy: "",
    stageId: project.stageId,
    title: project.title || "项目",
    description: project.description || "",
    unitTitle: unit?.title || "",
    steps,
  };
}

export function gradeProjectStep(step, answer = {}) {
  if (step && step.required === false) {
    return { passed: true, verdict: "看起来不错" };
  }
  const text = String(answer.text || "").trim();
  if (step.require === "file" || step.require === "image" || step.require === "pdf") {
    const passed = Boolean(answer.filename);
    return {
      passed,
      verdict: passed ? "看起来不错" : "还需要再完善一下",
    };
  }
  const passed = text.length >= 20;
  return {
    passed,
    verdict: passed ? "看起来不错" : "还需要再完善一下",
  };
}

export function projectCanFinish(steps, answers = {}) {
  return steps
    .filter((s) => s.required)
    .every((s) => answers[s.id]?.passed);
}
