import assert from "node:assert/strict";
import test from "node:test";
import { currentStreak, heatmap, recordActivity, weekDots } from "../src/domain/streak.mjs";

test("recordActivity stacks counts on the same UTC day", () => {
  const now = new Date("2026-09-06T15:00:00Z");
  let log = recordActivity({}, now);
  log = recordActivity(log, now);
  assert.equal(log["2026-09-06"], 2);
});

test("currentStreak counts consecutive days ending today or yesterday", () => {
  const now = new Date("2026-09-06T12:00:00Z");
  const log = {
    "2026-09-04": 1,
    "2026-09-05": 2,
    "2026-09-06": 1,
  };
  assert.equal(currentStreak(log, now), 3);
  assert.equal(currentStreak({ "2026-09-04": 1, "2026-09-05": 1 }, now), 2);
  assert.equal(currentStreak({}, now), 0);
});

test("heatmap is weeks×7 chalk cells with levels", () => {
  const now = new Date("2026-09-06T12:00:00Z");
  const log = recordActivity({ "2026-09-01": 5 }, now);
  const grid = heatmap(log, { weeks: 4, now });
  assert.equal(grid.cells.length, 28);
  assert.equal(grid.streak, 1);
  assert.equal(grid.checkedToday, true);
  const today = grid.cells.find((c) => c.date === "2026-09-06");
  assert.equal(today.level, 1);
  assert.equal(today.isToday, true);
  assert.equal(today.isFuture, false);
  assert.equal(grid.cells[0].dow, 0);
  assert.equal(grid.cells.at(-1).dow, 6);
  assert.equal(today.dow, now.getDay());
  const heavy = grid.cells.find((c) => c.date === "2026-09-01");
  assert.equal(heavy.level, 3);
  assert.equal(weekDots(log, now).length, 7);
  assert.ok(weekDots(log, now).some((d) => d.isToday && d.count === 1));
});
