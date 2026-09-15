/** Hyperknow session / node progress states (zh labels + machine ids). */
export const PROGRESS = Object.freeze({
  notStarted: "未开始",
  attempted: "已尝试",
  familiar: "熟悉",
  proficient: "熟练",
  mastered: "已掌握",
  project: "项目",
  exam: "测验",
});

export const LEARN_STATES = [
  "notStarted",
  "attempted",
  "familiar",
  "proficient",
  "mastered",
];

const LEARN_RANK = Object.fromEntries(LEARN_STATES.map((id, i) => [id, i]));

export function progressLabel(id) {
  if (!PROGRESS[id]) throw new Error(`Unknown progress state: ${id}`);
  return PROGRESS[id];
}

/**
 * Advance a session/node through Hyperknow's progress set.
 * Project and exam nodes keep their kind; they only toggle touched/completed.
 */
export function transitionProgress(node, event) {
  if (!node || typeof node !== "object") throw new Error("node required");
  const kind = node.kind || "session";
  const next = { ...node };

  if (kind === "project" || kind === "exam") {
    next.state = kind;
    if (event === "start" || event === "attempt") {
      next.touched = true;
      next.started = true;
    } else if (event === "complete" || event === "master") {
      next.touched = true;
      next.started = true;
      next.completed = true;
    } else {
      throw new Error(`Unsupported event ${event} for ${kind} node`);
    }
    return next;
  }

  let state = LEARN_STATES.includes(next.state) ? next.state : "notStarted";
  switch (event) {
    case "start":
    case "attempt":
      state = maxState(state, "attempted");
      next.started = true;
      break;
    case "familiar":
      state = maxState(state, "familiar");
      next.started = true;
      break;
    case "proficient":
      state = maxState(state, "proficient");
      next.started = true;
      break;
    case "complete":
    case "master":
      state = "mastered";
      next.started = true;
      next.completed = true;
      break;
    default:
      throw new Error(`Unsupported progress event: ${event}`);
  }
  next.state = state;
  next.label = PROGRESS[state];
  return next;
}

function maxState(a, b) {
  return LEARN_RANK[a] >= LEARN_RANK[b] ? a : b;
}

export function initSessionProgress(session) {
  return {
    sessionId: session.sessionId,
    kind: "session",
    state: "notStarted",
    label: PROGRESS.notStarted,
    started: false,
    completed: false,
    learnOpened: false,
    practiceOpened: false,
  };
}

export function initProjectProgress(stage) {
  return {
    stageId: stage.stage_id || stage.stageId,
    kind: "project",
    state: "project",
    label: PROGRESS.project,
    touched: false,
    started: false,
    completed: false,
  };
}

export function initExamProgress(exam, unitId) {
  return {
    examId: exam.examId || exam.title,
    unitId,
    kind: "exam",
    state: "exam",
    label: PROGRESS.exam,
    touched: false,
    started: false,
    completed: false,
  };
}
