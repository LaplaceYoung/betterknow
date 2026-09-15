import assert from "node:assert/strict";
import test from "node:test";
import { TRENDS, TREND_BATCH, parseTrendHotspots, trendsState } from "../src/domain/trends.mjs";
import { TREND_HOTSPOTS } from "../src/domain/trends-catalog.mjs";

test("leftover daily trends dump paints bilingual hotspots without Agent.generate", () => {
  const all = parseTrendHotspots(TREND_HOTSPOTS);
  assert.equal(all.length, 50);
  assert.match(all[0].zh.summary, /成瘾性设计/);
  assert.match(all[0].en.summary, /addictive design/i);
  assert.match(all[0].zh.prompt, /无尽滚动/);
  assert.doesNotMatch(JSON.stringify(all), /hyperknow|orbie|Agent\.generate/i);
});

test("今日值得学 batches five leftover hotspots and Next rotates", () => {
  assert.equal(TRENDS.latestStuffToLearn, "今日值得学");
  assert.equal(TRENDS.refreshTrendsBatch, "换一批");
  const first = trendsState({ lang: "zh", batch: 0 });
  assert.equal(first.items.length, TREND_BATCH);
  assert.match(first.items[0].label, /成瘾性设计/);
  const next = trendsState({ lang: "zh", batch: 1 });
  assert.equal(next.page, 1);
  assert.notEqual(next.items[0].label, first.items[0].label);
  const en = trendsState({ lang: "en", batch: 0 });
  assert.match(en.items[0].label, /addictive design/i);
  const wrapped = trendsState({ lang: "zh", batch: first.pages });
  assert.equal(wrapped.page, 0);
  assert.equal(wrapped.items[0].label, first.items[0].label);
});
