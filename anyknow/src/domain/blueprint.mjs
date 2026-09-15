/** Leftover Course Blueprint review: stored tree only. */

import { ingestCourse } from "./course.mjs";
import { LINEAR_REGRESSION_BLUEPRINT } from "./blueprint-catalog.mjs";

export const BLUEPRINT = Object.freeze({
  eyebrow: "课程讲解结构",
  reviewTitle: "查看课程蓝图",
  instruction:
    "这是本课程的结构预览。打开思维导图后，可将鼠标悬停在单元或 lecture 上，删除、拆分或加深内容，调整课程的重点和颗粒度。确认无误后，点击“确认生成完整课程”写入完整课程。",
  confirmBtn: "确认生成完整课程",
  splitAction: "拆分",
  deleteTitle: "删除该节点",
  deepenTitle: "讲深：再生成一个更深入的内容并加入",
  addSession: "讲深一节",
  unnamedUnit: "未命名单元",
  unnamedLecture: "未命名讲次",
  unnamedSession: "未命名课节",
  unnamedCourse: "课程",
  footerHint: "调整蓝图节点，确认后会写入完整课程。",
  statSessions: "{{count}} 个课节",
});

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

export function parseBlueprint(raw = LINEAR_REGRESSION_BLUEPRINT) {
  const src = raw && typeof raw === "object" ? raw : LINEAR_REGRESSION_BLUEPRINT;
  const units = Array.isArray(src.units) ? src.units : [];
  let sessions = 0;
  for (const unit of units) {
    for (const lecture of unit.lectures || []) {
      sessions += (lecture.sessions || []).length;
    }
  }
  return {
    courseUuid: String(src.courseUuid || src.courseId || "blueprint-linear-regression"),
    courseTitle: String(src.courseTitle || src.title || BLUEPRINT.unnamedCourse),
    courseDescription: String(src.courseDescription || src.description || ""),
    tags: Array.isArray(src.tags) ? src.tags : [],
    units: clone(units),
    sessionCount: sessions,
  };
}

export function blueprintState({ tree = null, selected = null } = {}) {
  const parsed = parseBlueprint(tree || LINEAR_REGRESSION_BLUEPRINT);
  return {
    ...parsed,
    eyebrow: BLUEPRINT.eyebrow,
    reviewTitle: BLUEPRINT.reviewTitle,
    instruction: BLUEPRINT.instruction,
    confirmBtn: BLUEPRINT.confirmBtn,
    footerHint: BLUEPRINT.footerHint,
    splitAction: BLUEPRINT.splitAction,
    deleteTitle: BLUEPRINT.deleteTitle,
    deepenTitle: BLUEPRINT.deepenTitle,
    addSession: BLUEPRINT.addSession,
    selected,
    sessionLabel: BLUEPRINT.statSessions.replace("{{count}}", String(parsed.sessionCount)),
  };
}

function idOf(prefix) {
  return `${prefix}_${Math.random().toString(36).slice(2, 8)}`;
}

export function splitBlueprintNode(tree, selected) {
  const next = parseBlueprint(tree);
  if (!selected?.kind) return next;
  if (selected.kind === "session") {
    for (const unit of next.units) {
      for (const lecture of unit.lectures || []) {
        const i = (lecture.sessions || []).findIndex((s) => s.sessionId === selected.sessionId);
        if (i < 0) continue;
        const src = lecture.sessions[i];
        lecture.sessions.splice(i + 1, 0, {
          ...clone(src),
          sessionId: idOf("s"),
          title: `${src.title} · 拆分`,
        });
        return parseBlueprint(next);
      }
    }
  }
  if (selected.kind === "lecture") {
    for (const unit of next.units) {
      const lecture = (unit.lectures || []).find((l) => l.lectureId === selected.lectureId);
      if (!lecture) continue;
      const last = (lecture.sessions || []).at(-1);
      if (!last) continue;
      lecture.sessions.push({
        ...clone(last),
        sessionId: idOf("s"),
        title: `${last.title} · 拆分`,
      });
      return parseBlueprint(next);
    }
  }
  if (selected.kind === "unit") {
    const unit = next.units.find((u) => u.unitId === selected.unitId);
    const last = (unit?.lectures || []).at(-1);
    if (last) {
      unit.lectures.push({
        ...clone(last),
        lectureId: idOf("l"),
        title: `${last.title} · 拆分`,
        sessions: (last.sessions || []).map((s, i) => ({ ...clone(s), sessionId: idOf(`s${i}`) })),
      });
    }
  }
  return parseBlueprint(next);
}

export function deleteBlueprintNode(tree, selected) {
  const next = parseBlueprint(tree);
  if (!selected?.kind) return next;
  if (selected.kind === "session") {
    for (const unit of next.units) {
      for (const lecture of unit.lectures || []) {
        if ((lecture.sessions || []).length <= 1) continue;
        lecture.sessions = lecture.sessions.filter((s) => s.sessionId !== selected.sessionId);
      }
    }
  } else if (selected.kind === "lecture") {
    for (const unit of next.units) {
      if ((unit.lectures || []).length <= 1) continue;
      unit.lectures = unit.lectures.filter((l) => l.lectureId !== selected.lectureId);
    }
  } else if (selected.kind === "unit" && next.units.length > 1) {
    next.units = next.units.filter((u) => u.unitId !== selected.unitId);
  }
  return parseBlueprint(next);
}

export function deepenBlueprintNode(tree, selected) {
  const next = parseBlueprint(tree);
  if (!selected) return next;
  let lecture = null;
  let title = BLUEPRINT.addSession;
  for (const unit of next.units) {
    if (selected.kind === "unit" && unit.unitId === selected.unitId) {
      lecture = (unit.lectures || [])[0];
      title = unit.title;
      break;
    }
    for (const row of unit.lectures || []) {
      if (selected.kind === "lecture" && row.lectureId === selected.lectureId) {
        lecture = row;
        title = row.title;
        break;
      }
      const sess = (row.sessions || []).find((s) => s.sessionId === selected.sessionId);
      if (sess) {
        lecture = row;
        title = sess.title;
        break;
      }
    }
    if (lecture) break;
  }
  if (!lecture) return next;
  lecture.sessions = lecture.sessions || [];
  lecture.sessions.push({
    sessionId: idOf("s"),
    title: `讲深 · ${title}`,
    session_type: "whiteboard",
    description: "",
    practice: { tasks: [`Explain ${title} one level deeper.`] },
  });
  return parseBlueprint(next);
}

export function blueprintToCoursePayload(tree) {
  const parsed = parseBlueprint(tree);
  return {
    courseUuid: parsed.courseUuid,
    courseTitle: parsed.courseTitle,
    courseDescription: parsed.courseDescription,
    tags: parsed.tags,
    units: parsed.units,
  };
}

export function commitBlueprint(tree) {
  return ingestCourse(blueprintToCoursePayload(tree));
}
