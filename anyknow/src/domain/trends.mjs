/** Leftover Instant Assist “今日值得学” strip (no live dailyTrends fetch). */

import { TREND_HOTSPOTS } from "./trends-catalog.mjs";

export const TRENDS = Object.freeze({
  latestStuffToLearn: "今日值得学",
  refreshTrendsBatch: "换一批",
  loadingDailyTrends: "加载中…",
});

export const TREND_BATCH = 5;

export const TREND_FALLBACK = Object.freeze([
  {
    zh: {
      summary: "美国政府最新公布的 UFO / UAP 相关档案",
      prompt:
        "帮我梳理美国政府最近公布的 UFO / UAP 相关档案：有哪些新内容、哪些说法有可靠依据、如果只有半小时我该先看什么？",
    },
    en: {
      summary: "Latest U.S. government UFO / UAP document releases",
      prompt:
        "Walk me through the latest U.S. government UFO and UAP document releases. What changed, which claims are evidence-based, and what should I read first if I only have 30 minutes?",
    },
  },
]);

function localeOf(row, lang) {
  const pack = lang === "en" ? row.en || row.locales?.en : row.zh || row.locales?.zh;
  const summary = String(pack?.summary || pack?.label || "").trim();
  const prompt = String(pack?.prompt || "").trim();
  return { summary, prompt };
}

export function parseTrendHotspots(raw = TREND_HOTSPOTS) {
  const list = Array.isArray(raw) ? raw : raw?.trends?.hotspots || raw?.hotspots || [];
  return list
    .map((row, i) => {
      const zh = localeOf(row, "zh");
      const en = localeOf(row, "en");
      if (!zh.summary && !en.summary) return null;
      if (/hyperknow|orbie/i.test(`${zh.summary}${zh.prompt}${en.summary}${en.prompt}`)) return null;
      return { id: row.id || `trend-${i + 1}`, zh, en };
    })
    .filter(Boolean);
}

export function trendsState({
  lang = "zh",
  batch = 0,
  leftovers = TREND_HOTSPOTS,
  loading = false,
} = {}) {
  const all = parseTrendHotspots(leftovers);
  const pool = all.length ? all : parseTrendHotspots(TREND_FALLBACK);
  const pages = Math.max(1, Math.ceil(pool.length / TREND_BATCH));
  const page = ((Number(batch) % pages) + pages) % pages;
  const slice = pool.slice(page * TREND_BATCH, page * TREND_BATCH + TREND_BATCH);
  const locale = lang === "en" ? "en" : "zh";
  const items = slice.map((row, i) => ({
    id: row.id,
    index: page * TREND_BATCH + i,
    label: row[locale].summary || row.zh.summary || row.en.summary,
    prompt: row[locale].prompt || row.zh.prompt || row.en.prompt,
  }));
  return {
    title: TRENDS.latestStuffToLearn,
    next: TRENDS.refreshTrendsBatch,
    loading: Boolean(loading),
    loadingLabel: TRENDS.loadingDailyTrends,
    empty: items.length === 0,
    page,
    pages,
    items,
  };
}
