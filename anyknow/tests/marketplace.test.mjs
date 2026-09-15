import assert from "node:assert/strict";
import test from "node:test";
import { MARKET_COPY, MARKET_SUBJECTS, filterMarketplace, marketplaceState } from "../src/domain/marketplace.mjs";

const COURSES = [
  { courseId: "mkt-sociology", title: "社会学概论", description: "社会结构", subject: "社会科学", tags: ["文化"] },
  { courseId: "mkt-apbio", title: "AP Biology", description: "细胞", subject: "考试备考", tags: ["生物学"] },
  { courseId: "mkt-ml", title: "机器学习", description: "泛化", subject: "AI 与数据科学", tags: ["机器学习"] },
];

test("marketplace leftover has search, editor picks, and eleven subject tabs", () => {
  assert.equal(MARKET_COPY.findFit, "发现最适合你的课程");
  assert.equal(MARKET_COPY.editorsPicks, "编辑精选");
  assert.equal(MARKET_SUBJECTS.length, 11);
  assert.equal(MARKET_SUBJECTS[0].zh, "全部");
  assert.equal(MARKET_SUBJECTS[1].zh, "考试备考");
  assert.equal(MARKET_SUBJECTS[9].zh, "社会科学");
  const all = marketplaceState({ courses: COURSES, lang: "zh" });
  assert.equal(all.items.length, 3);
  assert.equal(all.featured.length, 3);
  assert.equal(all.picks, "编辑精选");
  const soc = marketplaceState({ courses: COURSES, subject: "soc", lang: "zh" });
  assert.equal(soc.items.length, 1);
  assert.equal(soc.items[0].courseId, "mkt-sociology");
  const q = marketplaceState({ courses: COURSES, query: "泛化", lang: "zh" });
  assert.equal(q.items.length, 1);
  assert.equal(q.items[0].title, "机器学习");
  const empty = marketplaceState({ courses: COURSES, subject: "write", lang: "zh" });
  assert.equal(empty.emptyFiltered, true);
  assert.match(empty.empty, /没有匹配/);
  const en = marketplaceState({ courses: COURSES, lang: "en" });
  assert.match(en.title, /fits you/i);
  assert.doesNotMatch(JSON.stringify(all), /hyperknow|orbie|Agent\.generate/i);
});

test("filterMarketplace matches title subject and tags", () => {
  assert.equal(filterMarketplace(COURSES, { query: "bio" }).length, 1);
  assert.equal(filterMarketplace(COURSES, { subject: "ai" }).length, 1);
  assert.equal(filterMarketplace(COURSES, { query: "文化", subject: "soc" }).length, 1);
});
