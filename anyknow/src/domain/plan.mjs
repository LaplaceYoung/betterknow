/**
 * Proactive learning feed / study plan.
 * Deadlines and tasks extracted from LMS assignments and free-text materials
 * (syllabus, calendar notes) — Hyperknow calendar/main_tasks analogue.
 */

const DUE_LINE =
  /(?:due|deadline|due date|截止|交作业|提交)\s*[:：]?\s*(\d{4}-\d{2}-\d{2}|\d{1,2}\/\d{1,2}\/\d{2,4}|[A-Z][a-z]+ \d{1,2}, \d{4})/i;
const ISO_DATE = /\b(20\d{2}-\d{2}-\d{2})\b/;
const NAMED_DATE = /\b(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},\s+\d{4}\b/i;

export function extractDeadlines(materials, { now = new Date() } = {}) {
  const items = [];
  const list = Array.isArray(materials) ? materials : [materials];
  for (const material of list) {
    if (!material) continue;
    if (material.assignments) {
      for (const a of material.assignments) {
        if (!a.dueAt) continue;
        items.push({
          id: `asg:${material.id || material.name || "lms"}:${a.assignmentId}`,
          title: a.title,
          dueAt: normalizeDate(a.dueAt),
          source: "lms-assignment",
          courseName: material.name || material.courseName || null,
          kind: "deadline",
          status: "pending",
        });
      }
    }
    const blobs = [
      material.text,
      material.body,
      material.syllabus,
      ...(material.files || []).map((f) => f.text),
    ].filter((t) => typeof t === "string" && t.trim());
    for (const text of blobs) {
      items.push(...extractFromText(text, material, now));
    }
  }
  items.sort((a, b) => String(a.dueAt).localeCompare(String(b.dueAt)));
  return items;
}

function extractFromText(text, material, now) {
  const items = [];
  const lines = text.split(/\r?\n/);
  for (const line of lines) {
    const dueMatch = line.match(DUE_LINE) || line.match(ISO_DATE) || line.match(NAMED_DATE);
    if (!dueMatch) continue;
    const dateRaw = dueMatch[1] || dueMatch[0];
    const dueAt = normalizeDate(dateRaw);
    if (!dueAt) continue;
    const title = line
      .replace(DUE_LINE, "")
      .replace(ISO_DATE, "")
      .replace(/[-–—|:：]+/g, " ")
      .trim()
      .slice(0, 120) || "Study task";
    items.push({
      id: `txt:${hash(line)}`,
      title,
      dueAt,
      source: "syllabus-text",
      courseName: material.name || material.filename || null,
      kind: "deadline",
      status: "pending",
      excerpt: line.trim().slice(0, 200),
    });
  }
  if (!items.length && /midterm|final exam|quiz|project/i.test(text)) {
    const guess = new Date(now);
    guess.setDate(guess.getDate() + 14);
    items.push({
      id: `infer:${hash(text.slice(0, 80))}`,
      title: "Review inferred assessment",
      dueAt: guess.toISOString().slice(0, 10),
      source: "inferred",
      kind: "task",
      status: "pending",
    });
  }
  return items;
}

export function buildLearningFeed({ lmsBundle, extraMaterials = [], now = new Date() } = {}) {
  const materials = [];
  if (lmsBundle?.courses) materials.push(...lmsBundle.courses);
  materials.push(...extraMaterials);
  const deadlines = extractDeadlines(materials, { now });
  const tasks = deadlines.map((d, i) => ({
    taskId: d.id,
    title: d.title,
    dueAt: d.dueAt,
    source: d.source,
    courseName: d.courseName,
    status: "pending",
    order: i + 1,
    kind: d.kind === "deadline" ? "main_task" : "subtask",
  }));
  return {
    generatedAt: now.toISOString(),
    pendingCount: tasks.length,
    tasks,
    plan: tasks.map((t) => ({
      when: t.dueAt,
      what: t.title,
      course: t.courseName,
    })),
  };
}

export function approveFeedTasks(feed, taskIds) {
  const set = new Set(taskIds);
  return {
    ...feed,
    tasks: (feed.tasks || []).map((t) =>
      set.has(t.taskId) ? { ...t, status: "accepted" } : t,
    ),
  };
}

function shiftDay(iso, days) {
  const d = new Date(`${iso}T12:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

/** Skip a session and fill its calendar hole; leftover work is pushed later. */
export function skipAndRedistribute(feed, taskId, { now = new Date() } = {}) {
  const tasks = (feed?.tasks || []).map((t) => ({ ...t }));
  const idx = tasks.findIndex((t) => t.taskId === taskId);
  if (idx < 0) throw new Error(`unknown feed task ${taskId}`);
  const skipped = tasks[idx];
  const hole = skipped.dueAt || now.toISOString().slice(0, 10);
  skipped.status = "skipped";
  skipped.skippedAt = now.toISOString();
  skipped.redistributed = true;
  const others = tasks
    .filter((t) => t.taskId !== taskId && t.status !== "skipped")
    .sort((a, b) => String(a.dueAt || "").localeCompare(String(b.dueAt || "")));
  const later = others.filter((t) => (t.dueAt || "") > hole);
  if (later[0]) {
    later[0].dueAt = hole;
    later[0].filledHole = true;
  }
  const lastDue = others.map((t) => t.dueAt).filter(Boolean).sort().at(-1) || hole;
  skipped.dueAt = shiftDay(lastDue, 1);
  return {
    ...feed,
    tasks,
    lastSkip: { taskId, hole, newDue: skipped.dueAt },
  };
}

function normalizeDate(value) {
  if (!value) return null;
  const s = String(value);
  if (/^\d{4}-\d{2}-\d{2}/.test(s)) return s.slice(0, 10);
  const t = Date.parse(s);
  if (Number.isNaN(t)) return s;
  return new Date(t).toISOString().slice(0, 10);
}

function hash(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h).toString(36);
}
