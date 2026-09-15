/** Parse exported CN academic timetables (ICS / 小爱 / 正方 kbList / CSV). No 教务 login. */

export const TIMETABLE_COPY = Object.freeze({
  import: "导入课表",
  hint: "从正方、强智、青果用油猴、WakeUp 或小爱导出 ICS / JSON / CSV，再导入这里。不代登教务。",
  formats: "ICS · 小爱 JSON · 正方 kbList · CSV",
  empty: "还没有课表。先从教务导出再导入。",
  preview: "课前预习",
  review: "课后复盘",
  weekTitle: "本周课表",
  related: "相关知识",
});

/** Common mainland 45-minute slots (1-indexed). */
export const DEFAULT_SLOTS = Object.freeze([
  { section: 1, startTime: "08:00", endTime: "08:45" },
  { section: 2, startTime: "08:50", endTime: "09:35" },
  { section: 3, startTime: "10:00", endTime: "10:45" },
  { section: 4, startTime: "10:55", endTime: "11:40" },
  { section: 5, startTime: "14:00", endTime: "14:45" },
  { section: 6, startTime: "14:50", endTime: "15:35" },
  { section: 7, startTime: "15:55", endTime: "16:40" },
  { section: 8, startTime: "16:50", endTime: "17:35" },
  { section: 9, startTime: "19:00", endTime: "19:45" },
  { section: 10, startTime: "19:55", endTime: "20:40" },
  { section: 11, startTime: "20:50", endTime: "21:35" },
]);

const SUBJECT_HINTS = [
  { re: /高数|微积分|线性代数|概率|统计|数学分析|离散/, subject: "数学与统计" },
  { re: /物理|化学|生物|科学/, subject: "自然科学" },
  { re: /程序|编程|python|java|数据结构|计算机|软件/, subject: "计算机科学" },
  { re: /机器学|人工智|神经网|数据科学|深度学习/, subject: "AI 与数据科学" },
  { re: /社会|心理|政治/, subject: "社会科学" },
];

export function parseWeeks(raw) {
  const text = String(raw || "").replace(/第|周/g, "");
  if (Array.isArray(raw)) {
    return [...new Set(raw.map(Number).filter((n) => n >= 1 && n <= 30))];
  }
  const odd = /单/.test(String(raw || ""));
  const even = /双/.test(String(raw || ""));
  const weeks = [];
  for (const part of text.split(/[,，;；]/)) {
    const m = part.match(/(\d+)\s*[-~～到至]\s*(\d+)/);
    if (m) {
      const a = Number(m[1]);
      const b = Number(m[2]);
      for (let w = Math.min(a, b); w <= Math.max(a, b); w++) weeks.push(w);
    } else {
      const n = Number(part.replace(/[^\d]/g, ""));
      if (n) weeks.push(n);
    }
  }
  const uniq = [...new Set(weeks)].filter((n) => n >= 1 && n <= 30);
  if (odd) return uniq.filter((w) => w % 2 === 1);
  if (even) return uniq.filter((w) => w % 2 === 0);
  return uniq;
}

export function parseSections(raw) {
  if (Array.isArray(raw)) {
    return [...new Set(raw.map((s) => Number(s?.section ?? s)).filter((n) => n >= 1 && n <= 30))].sort(
      (a, b) => a - b,
    );
  }
  const text = String(raw || "").replace(/第|节|\[|\]/g, "");
  const weeksLike = parseWeeks(text);
  return weeksLike.length ? weeksLike : [];
}

function slotTimes(sections, slots = DEFAULT_SLOTS) {
  const nums = sections.length ? sections : [1];
  const first = slots.find((s) => s.section === nums[0]) || slots[0];
  const last = slots.find((s) => s.section === nums[nums.length - 1]) || first;
  return { startTime: first.startTime, endTime: last.endTime, sections: nums };
}

function courseIdOf(name, i) {
  const slug = String(name || "course")
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\u4e00-\u9fff-]/g, "")
    .slice(0, 24);
  return `tt-${slug || "c"}-${i + 1}`;
}

function meeting({ name, teacher, location, day, weeks, sections, startTime, endTime, source }, i) {
  const title = String(name || "").trim();
  if (!title) return null;
  const d = Number(day);
  if (!(d >= 1 && d <= 7)) return null;
  const secs = parseSections(sections);
  const times = startTime && endTime ? { startTime, endTime, sections: secs } : slotTimes(secs);
  const w = parseWeeks(weeks).length ? parseWeeks(weeks) : parseWeeks("1-16");
  return {
    id: courseIdOf(title, i),
    name: title,
    teacher: String(teacher || "").trim(),
    location: String(location || "").trim(),
    day: d,
    weeks: w,
    ...times,
    source: source || "import",
  };
}

function fromXiaoai(list, source = "xiaoai") {
  return (Array.isArray(list) ? list : [])
    .map((row, i) => {
      const sections = row.sections || row.section || row.startNode
        ? Array.isArray(row.sections)
          ? row.sections
          : row.startNode
            ? Array.from({ length: Number(row.step || row.endNode || row.endSection || 1) }, (_, k) =>
                Number(row.startNode) + k,
              )
            : [row.startSection, row.endSection].filter(Boolean)
        : [];
      const startTime = row.startTime || row.customStartTime || row.sections?.[0]?.startTime;
      const endTime =
        row.endTime ||
        row.customEndTime ||
        row.sections?.[row.sections.length - 1]?.endTime;
      return meeting(
        {
          name: row.name || row.courseName || row.kcmc,
          teacher: row.teacher || row.xm || row.jsxm,
          location: row.position || row.location || row.cdmc,
          day: row.day || row.xqj,
          weeks: row.weeks || row.zcd,
          sections: sections.length ? sections : row.jc,
          startTime,
          endTime,
          source,
        },
        i,
      );
    })
    .filter(Boolean);
}

function fromZhengfang(kbList) {
  return fromXiaoai(
    (Array.isArray(kbList) ? kbList : []).map((row) => ({
      name: row.kcmc || row.name,
      teacher: row.xm || row.jsxm || row.teacher,
      position: row.cdmc || row.location,
      day: row.xqj || row.day,
      weeks: row.zcd || row.weeks,
      jc: row.jc || row.jcs,
      sections: row.jc,
    })),
    "zhengfang",
  );
}

function unfoldIcs(text) {
  const lines = [];
  for (const raw of String(text || "").replace(/\r\n/g, "\n").split("\n")) {
    if (/^[ \t]/.test(raw) && lines.length) lines[lines.length - 1] += raw.trim();
    else lines.push(raw.trimEnd());
  }
  const events = [];
  let cur = null;
  for (const line of lines) {
    if (line === "BEGIN:VEVENT") cur = {};
    else if (line === "END:VEVENT") {
      if (cur) events.push(cur);
      cur = null;
    } else if (cur && line.includes(":")) {
      const idx = line.indexOf(":");
      const key = line.slice(0, idx).split(";")[0].toUpperCase();
      cur[key] = line.slice(idx + 1);
    }
  }
  return events;
}

function icsDate(value) {
  const m = String(value || "").match(/(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})/);
  if (!m) return null;
  return {
    date: `${m[1]}-${m[2]}-${m[3]}`,
    time: `${m[4]}:${m[5]}`,
    js: new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]), Number(m[4]), Number(m[5])),
  };
}

function weekdayOf(dateStr) {
  const d = new Date(`${dateStr}T12:00:00`);
  const js = d.getDay();
  return js === 0 ? 7 : js;
}

function addDays(dateStr, n) {
  const d = new Date(`${dateStr}T12:00:00`);
  d.setDate(d.getDate() + n);
  return d.toISOString().slice(0, 10);
}

function fromIcs(text) {
  const out = [];
  unfoldIcs(text).forEach((ev, i) => {
    const start = icsDate(ev.DTSTART);
    const end = icsDate(ev.DTEND) || start;
    if (!start) return;
    const rrule = String(ev.RRULE || "");
    const countMatch = rrule.match(/COUNT=(\d+)/i);
    const interval = Number((rrule.match(/INTERVAL=(\d+)/i) || [])[1] || 1);
    const count = Math.min(30, Number(countMatch?.[1] || (rrule ? 16 : 1)));
    const day = weekdayOf(start.date);
    const weeks = [];
    for (let n = 0; n < count; n++) weeks.push(n * interval + 1);
    out.push(
      meeting(
        {
          name: ev.SUMMARY,
          teacher: ev.DESCRIPTION,
          location: ev.LOCATION,
          day,
          weeks: rrule ? weeks : [1],
          startTime: start.time,
          endTime: end.time,
          sections: [],
          source: "ics",
        },
        i,
      ),
    );
  });
  return out.filter(Boolean);
}

function fromCsv(text) {
  const rows = String(text || "")
    .split(/\r?\n/)
    .map((l) => l.split(/[,，\t]/).map((c) => c.trim()))
    .filter((r) => r.some(Boolean));
  if (!rows.length) return [];
  const header = rows[0].map((h) => h.toLowerCase());
  const named = header.some((h) => /name|课程|星期|day/.test(h));
  const body = named ? rows.slice(1) : rows;
  return body
    .map((cols, i) => {
      const get = (keys, fallbackIndex) => {
        const idx = header.findIndex((h) => keys.test(h));
        return named && idx >= 0 ? cols[idx] : cols[fallbackIndex];
      };
      return meeting(
        {
          name: get(/name|课程/, 0),
          day: get(/day|星期/, 1),
          sections: get(/section|节/, 2),
          weeks: get(/week|周/, 3),
          teacher: get(/teacher|教师/, 4),
          location: get(/loc|教室|地点/, 5),
          startTime: get(/start|开始/, 6),
          endTime: get(/end|结束/, 7),
          source: "csv",
        },
        i,
      );
    })
    .filter(Boolean);
}

export function parseTimetable(input = {}, { termStart = "", school = "" } = {}) {
  let meetings = [];
  let detected = "unknown";
  const raw = input;
  if (typeof raw === "string") {
    const text = raw.trim();
    if (/BEGIN:VCALENDAR|BEGIN:VEVENT/i.test(text)) {
      meetings = fromIcs(text);
      detected = "ics";
    } else if (text.startsWith("{") || text.startsWith("[")) {
      return parseTimetable(JSON.parse(text), { termStart, school });
    } else {
      meetings = fromCsv(text);
      detected = "csv";
    }
  } else if (raw && typeof raw === "object") {
    if (Array.isArray(raw.kbList) || Array.isArray(raw.kblist)) {
      meetings = fromZhengfang(raw.kbList || raw.kblist);
      detected = "zhengfang";
    } else if (Array.isArray(raw.courseInfos) || Array.isArray(raw.courseInfo)) {
      meetings = fromXiaoai(raw.courseInfos || raw.courseInfo);
      detected = "xiaoai";
    } else if (Array.isArray(raw.courseList) || Array.isArray(raw.courses)) {
      meetings = fromXiaoai(raw.courseList || raw.courses, "wakeup");
      detected = "wakeup";
    } else if (Array.isArray(raw)) {
      const looksZf = raw[0] && (raw[0].kcmc || raw[0].xqj);
      meetings = looksZf ? fromZhengfang(raw) : fromXiaoai(raw);
      detected = looksZf ? "zhengfang" : "xiaoai";
    } else if (raw.name && (raw.day || raw.xqj)) {
      meetings = fromXiaoai([raw]);
      detected = "xiaoai";
    }
    if (!termStart) termStart = raw.termStart || raw.semesterStart || raw.config?.semesterStartDate || "";
    if (!school) school = raw.school || raw.tableName || "";
  }
  const start = termStart || mondayOf(new Date());
  const slots = Array.isArray(raw?.sectionTimes)
    ? raw.sectionTimes.map((s, i) => ({
        section: Number(s.section || s.number || i + 1),
        startTime: s.startTime,
        endTime: s.endTime,
      }))
    : DEFAULT_SLOTS.slice();
  return {
    ok: meetings.length > 0,
    detected,
    school: school || "教务课表",
    termStart: start,
    slots,
    meetings,
    courses: uniqueCourses(meetings),
    emptyCopy: meetings.length ? "" : TIMETABLE_COPY.empty,
  };
}

function uniqueCourses(meetings) {
  const map = new Map();
  for (const m of meetings) {
    const prev = map.get(m.name) || { name: m.name, teacher: m.teacher, meetings: 0, days: new Set() };
    prev.teacher = prev.teacher || m.teacher;
    prev.meetings += 1;
    prev.days.add(m.day);
    map.set(m.name, prev);
  }
  return [...map.values()].map((c) => ({
    name: c.name,
    teacher: c.teacher,
    meetings: c.meetings,
    days: [...c.days].sort((a, b) => a - b),
  }));
}

export function mondayOf(now = new Date()) {
  const d = new Date(now);
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  return d.toISOString().slice(0, 10);
}

export function weekIndex(termStart, dateStr) {
  const a = new Date(`${termStart}T12:00:00`);
  const b = new Date(`${dateStr}T12:00:00`);
  const days = Math.round((b - a) / 86400000);
  return Math.floor(days / 7) + 1;
}

export function dateFor(termStart, week, day) {
  const monday = new Date(`${termStart}T12:00:00`);
  const jsDay = monday.getDay();
  const back = jsDay === 0 ? -6 : 1 - jsDay;
  monday.setDate(monday.getDate() + back);
  monday.setDate(monday.getDate() + (week - 1) * 7 + (day - 1));
  return monday.toISOString().slice(0, 10);
}

export function weekGrid(board, { week, now = new Date() } = {}) {
  const termStart = board?.termStart || mondayOf(now);
  const current = week || Math.max(1, weekIndex(termStart, now.toISOString().slice(0, 10)));
  const days = [1, 2, 3, 4, 5, 6, 7];
  const slots = board?.slots?.length ? board.slots : DEFAULT_SLOTS;
  const cells = slots.map((slot) => ({
    section: slot.section,
    startTime: slot.startTime,
    endTime: slot.endTime,
    days: days.map((day) => ({
      day,
      date: dateFor(termStart, current, day),
      meetings: (board?.meetings || []).filter(
        (m) => m.day === day && m.weeks.includes(current) && meetingHitsSlot(m, slot.section),
      ),
    })),
  }));
  return { week: current, termStart, days, slots, cells };
}

function meetingHitsSlot(m, section) {
  if (m.sections?.length) return m.sections.includes(section);
  const slot = DEFAULT_SLOTS.find((s) => s.section === section);
  if (!slot) return false;
  return m.startTime <= slot.startTime && m.endTime >= slot.endTime;
}

export function planFromTimetable(board, { now = new Date(), horizonDays = 14 } = {}) {
  const termStart = board?.termStart || mondayOf(now);
  const today = now.toISOString().slice(0, 10);
  const tasks = [];
  const seenPreview = new Set();
  const seenReview = new Set();
  for (let i = 0; i < horizonDays; i++) {
    const date = addDays(today, i);
    const week = weekIndex(termStart, date);
    const day = weekdayOf(date);
    const meetings = (board?.meetings || []).filter((m) => m.day === day && m.weeks.includes(week));
    for (const m of meetings) {
      const preKey = `${m.name}:${date}`;
      if (!seenPreview.has(preKey)) {
        seenPreview.add(preKey);
        tasks.push({
          taskId: `tt-pre:${m.name}:${date}`,
          title: `${TIMETABLE_COPY.preview} · ${m.name}`,
          dueAt: date,
          source: "timetable-preview",
          courseName: m.name,
          status: "pending",
          kind: "main_task",
          location: m.location,
          when: `${m.startTime}–${m.endTime}`,
        });
      }
      const friday = addDays(date, (5 - day + 7) % 7);
      const revKey = `${m.name}:${friday}`;
      if (!seenReview.has(revKey)) {
        seenReview.add(revKey);
        tasks.push({
          taskId: `tt-rev:${m.name}:${friday}`,
          title: `${TIMETABLE_COPY.review} · ${m.name}`,
          dueAt: friday,
          source: "timetable-review",
          courseName: m.name,
          status: "pending",
          kind: "subtask",
        });
      }
    }
  }
  tasks.sort((a, b) => String(a.dueAt).localeCompare(String(b.dueAt)) || String(a.title).localeCompare(String(b.title)));
  return {
    generatedAt: now.toISOString(),
    pendingCount: tasks.length,
    tasks: tasks.slice(0, 36),
    plan: tasks.slice(0, 36).map((t) => ({ when: t.dueAt, what: t.title, course: t.courseName })),
  };
}

function nameOverlap(a, b) {
  const x = String(a || "").replace(/[（(].*?[）)]/g, "").trim();
  const y = String(b || "");
  if (x.length < 2 || !y) return false;
  if (y.includes(x) || x.includes(y.trim())) return true;
  const nMax = Math.min(4, x.length);
  for (let n = nMax; n >= 2; n--) {
    for (let i = 0; i <= x.length - n; i++) {
      if (y.includes(x.slice(i, i + n))) return true;
    }
  }
  return false;
}

function hintSubject(name) {
  const hit = SUBJECT_HINTS.find((h) => h.re.test(name));
  return hit?.subject || "";
}

export function matchTimetableKnowledge(board, { marketplace = [], driveHits = [] } = {}) {
  const courses = board?.courses || uniqueCourses(board?.meetings || []);
  return courses.map((c) => {
    const subject = hintSubject(c.name);
    const needle = String(c.name).replace(/[（(].*?[）)]/g, "").trim();
    const market = (marketplace || []).filter((m) => {
      if (subject && m.subject === subject) return true;
      return nameOverlap(needle, `${m.title || ""} ${(m.tags || []).join(" ")}`);
    });
    const files = (driveHits || []).filter((f) =>
      nameOverlap(needle, `${f.name || f.filename || ""} ${f.text || f.snippet || ""}`),
    );
    return {
      name: c.name,
      teacher: c.teacher,
      subject,
      marketplace: market.slice(0, 4).map((m) => ({
        courseId: m.courseId,
        title: m.title,
        subject: m.subject,
      })),
      files: files.slice(0, 4).map((f) => ({
        id: f.id || f.fileId,
        name: f.name || f.filename,
      })),
    };
  });
}

export function timetableState(board, { week, now = new Date(), marketplace = [], driveHits = [] } = {}) {
  if (!board?.ok && !(board?.meetings || []).length) {
    return { empty: true, emptyCopy: TIMETABLE_COPY.empty, grid: null, knowledge: [], plan: { tasks: [] } };
  }
  const grid = weekGrid(board, { week, now });
  const knowledge = matchTimetableKnowledge(board, { marketplace, driveHits });
  const plan = planFromTimetable(board, { now });
  return {
    empty: false,
    school: board.school,
    detected: board.detected,
    termStart: board.termStart,
    copy: TIMETABLE_COPY,
    grid,
    knowledge,
    plan,
    courses: board.courses,
  };
}
