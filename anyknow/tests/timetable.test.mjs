import assert from "node:assert/strict";
import test from "node:test";
import {
  matchTimetableKnowledge,
  parseSections,
  parseTimetable,
  parseWeeks,
  planFromTimetable,
  timetableState,
  weekGrid,
} from "../src/domain/timetable.mjs";
import { createLearningTools } from "../src/agent/tools.mjs";
import { SAMPLE_ICS, SAMPLE_XIAOAI, SAMPLE_ZHENGFANG } from "../src/domain/timetable-catalog.mjs";

test("parseWeeks handles 正方 1-16周 and 单双周", () => {
  assert.deepEqual(parseWeeks("1-4周"), [1, 2, 3, 4]);
  assert.deepEqual(parseWeeks("1-5周(单)"), [1, 3, 5]);
  assert.deepEqual(parseWeeks("2-6周(双)"), [2, 4, 6]);
  assert.deepEqual(parseSections("1-2节"), [1, 2]);
});

test("小爱 JSON leftover parses into weekday meetings", () => {
  const board = parseTimetable(SAMPLE_XIAOAI);
  assert.equal(board.ok, true);
  assert.equal(board.detected, "xiaoai");
  assert.equal(board.meetings.length, 4);
  assert.ok(board.courses.some((c) => c.name === "高等数学A"));
  assert.equal(board.meetings.find((m) => m.name === "线性代数").day, 3);
  assert.deepEqual(board.meetings.find((m) => m.name === "高等数学A").sections, [1, 2]);
  assert.doesNotMatch(JSON.stringify(board), /hyperknow|orbie|canvas\.instructure/i);
});

test("正方 kbList leftover parses kcmc/zcd/jc/xqj", () => {
  const board = parseTimetable(SAMPLE_ZHENGFANG, { termStart: "2026-09-07" });
  assert.equal(board.detected, "zhengfang");
  assert.equal(board.meetings[0].name, "高等数学A");
  assert.deepEqual(board.meetings[0].weeks.slice(0, 3), [1, 2, 3]);
  assert.equal(board.meetings[0].startTime, "08:00");
});

test("ICS leftover unfolds weekly RRULE into a meeting", () => {
  const board = parseTimetable(SAMPLE_ICS, { termStart: "2026-09-07" });
  assert.equal(board.detected, "ics");
  assert.equal(board.meetings[0].name, "高等数学A");
  assert.equal(board.meetings[0].day, 1);
  assert.ok(board.meetings[0].weeks.length >= 8);
});

test("planFromTimetable writes 课前预习 and 课后复盘 without 教务 login", () => {
  const board = parseTimetable(SAMPLE_XIAOAI);
  const feed = planFromTimetable(board, { now: new Date("2026-09-07T08:00:00") });
  assert.ok(feed.tasks.length >= 4);
  assert.ok(feed.tasks.some((t) => /课前预习 · 高等数学A/.test(t.title)));
  assert.ok(feed.tasks.some((t) => /课后复盘 · 机器学习导论/.test(t.title)));
  const grid = weekGrid(board, { week: 1, now: new Date("2026-09-07") });
  const monday = grid.cells[0].days[0].meetings;
  assert.ok(monday.some((m) => m.name === "高等数学A"));
});

test("matchTimetableKnowledge maps 课表 names onto marketplace leftover", () => {
  const board = parseTimetable(SAMPLE_XIAOAI);
  const knowledge = matchTimetableKnowledge(board, {
    marketplace: [
      { courseId: "mkt-ml", title: "机器学习", subject: "AI 与数据科学", tags: ["机器学习"] },
      { courseId: "mkt-sociology", title: "社会学概论", subject: "社会科学", tags: ["社会学"] },
      { courseId: "mkt-apbio", title: "AP Biology", subject: "考试备考", tags: [] },
    ],
  });
  const ml = knowledge.find((k) => k.name === "机器学习导论");
  assert.ok(ml.marketplace.some((m) => m.courseId === "mkt-ml"));
  const soc = knowledge.find((k) => k.name === "社会学原理");
  assert.ok(soc.marketplace.some((m) => m.courseId === "mkt-sociology"));
  const view = timetableState(board, {
    now: new Date("2026-09-07"),
    marketplace: [{ courseId: "mkt-ml", title: "机器学习", subject: "AI 与数据科学" }],
  });
  assert.equal(view.empty, false);
  assert.equal(view.grid.week, 1);
});

test("Agent generate_main_tasks expands imported 课表 into preview tasks", async () => {
  const board = parseTimetable(SAMPLE_XIAOAI);
  const tools = createLearningTools({
    store: {
      timetable: board,
      marketplace: [{ courseId: "mkt-ml", title: "机器学习", subject: "AI 与数据科学" }],
    },
  });
  const ids = tools.map((t) => t.id);
  assert.ok(ids.includes("search_timetable"));
  assert.ok(ids.includes("match_timetable_knowledge"));
  const plan = await tools.find((t) => t.id === "generate_main_tasks").execute({ topic: "根据课表安排学习" });
  assert.ok(plan.tasks.some((t) => /课前预习/.test(t.title)));
  const know = await tools.find((t) => t.id === "match_timetable_knowledge").execute({ query: "机器学习" });
  assert.ok(know.knowledge.some((k) => k.marketplace.some((m) => m.courseId === "mkt-ml")));
});
