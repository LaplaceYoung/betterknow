/** Chalkboard streak + contribution heatmap (Duolingo week + GitHub grid). */

export function dayKey(d) {
  const x = d instanceof Date ? d : new Date(d);
  const y = x.getFullYear();
  const m = String(x.getMonth() + 1).padStart(2, "0");
  const day = String(x.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function utcDay(d) {
  const x = d instanceof Date ? d : new Date(d);
  return new Date(x.getFullYear(), x.getMonth(), x.getDate());
}

export function recordActivity(log = {}, at = new Date()) {
  const key = dayKey(utcDay(at));
  return { ...log, [key]: (log[key] || 0) + 1 };
}

export function currentStreak(log = {}, now = new Date()) {
  const cursor = utcDay(now);
  const has = (d) => (log[dayKey(d)] || 0) > 0;
  if (!has(cursor)) cursor.setDate(cursor.getDate() - 1);
  let n = 0;
  while (has(cursor)) {
    n += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return n;
}

export function weekDots(log = {}, now = new Date()) {
  const end = utcDay(now);
  const startDow = end.getDay();
  const sunday = new Date(end);
  sunday.setDate(end.getDate() - startDow);
  const labels = ["日", "一", "二", "三", "四", "五", "六"];
  return labels.map((label, i) => {
    const d = new Date(sunday);
    d.setDate(sunday.getDate() + i);
    const key = dayKey(d);
    return {
      label,
      date: key,
      count: log[key] || 0,
      isToday: key === dayKey(end),
    };
  });
}

export function heatmap(log = {}, { weeks = 20, now = new Date() } = {}) {
  const end = utcDay(now);
  const start = new Date(end);
  const pad = end.getDay();
  start.setDate(end.getDate() - ((weeks - 1) * 7 + pad));
  const cells = [];
  for (let i = 0; i < weeks * 7; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    const key = dayKey(d);
    const count = log[key] || 0;
    cells.push({
      date: key,
      dow: d.getDay(),
      count,
      level: count <= 0 ? 0 : count === 1 ? 1 : count < 4 ? 2 : 3,
      isToday: key === dayKey(end),
      isFuture: key > dayKey(end),
    });
  }
  return {
    weeks,
    cells,
    streak: currentStreak(log, now),
    today: dayKey(end),
    checkedToday: (log[dayKey(end)] || 0) > 0,
    week: weekDots(log, now),
  };
}
