import { chromium } from "playwright";
import { writeFileSync } from "node:fs";

const origin = process.env.ANYKNOW_URL || "http://127.0.0.1:4173";
const base = origin.replace(/\/$/, "");
const shot = process.env.SHOT || "anyknow-surfaces.png";
const errors = [];

const browser = await chromium.launch({
  headless: true,
  channel: process.env.PW_CHANNEL || "chrome",
});
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
page.on("pageerror", (e) => errors.push(String(e)));
page.on("console", (msg) => {
  if (msg.type() === "error") errors.push(msg.text());
});

await page.goto(`${base}/`, { waitUntil: "networkidle", timeout: 30000 });
await page.waitForSelector("h1", { timeout: 15000 });
const home = await page.evaluate(() => {
  const text = document.body.innerText;
  const h1 = document.querySelector("h1");
  const rgb = (getComputedStyle(document.body).backgroundColor.match(/\d+/g) || []).map(Number);
  const luminance = (0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]) / 255;
  return {
    h1: h1?.textContent,
    h1Font: getComputedStyle(h1).fontFamily,
    luminance,
    hasCraft: text.includes("打造课程"),
    hasAssist: text.includes("即时协助"),
    recent: text.includes("近期活动") || text.includes("Recent Activities"),
    cover: [...document.querySelectorAll("img.cover-img")].some((i) => i.naturalWidth > 0),
    weekDots: !!document.querySelector(".week-dots"),
    lms: !!document.querySelector("#lmsBtn"),
    streak: text.includes("连续学习") || text.includes("study streak"),
  };
});

await page.click('button[data-source="school"]');
await page.waitForTimeout(200);
const school = await page.evaluate(() => !!document.querySelector("#lmsBtn"));
await page.click('button[data-source="self"]');
await page.waitForTimeout(200);

await page.goto(`${base}/#/history`, { waitUntil: "networkidle" });
await page.waitForSelector("h1");
await page.click('button[data-hist="sessions"]');
await page.waitForTimeout(200);
const history = await page.evaluate(() => document.body.innerText);

await page.goto(`${base}/#/learning-feed`, { waitUntil: "networkidle" });
await page.waitForSelector("h1");
await page.click('button[data-feed="confirmed"]');
await page.waitForTimeout(200);
const feed = await page.evaluate(() => {
  const text = document.body.innerText;
  return {
    text,
    heat: !!document.querySelector(".heat-grid"),
    cells: document.querySelectorAll(".heat-grid .heat-cell").length,
    weekDots: document.querySelectorAll(".week-dots .week-dot").length,
    dust: text.includes("学习粉尘表") || text.includes("study dust"),
  };
});

await page.screenshot({ path: shot, fullPage: false });
await browser.close();

const report = {
  home,
  school,
  history: history.slice(0, 500),
  feed: { ...feed, text: feed.text.slice(0, 500) },
  errors,
  shot,
};
console.log(JSON.stringify(report, null, 2));
if (errors.length) process.exit(1);
if (home.luminance > 0.35 || !home.hasCraft || !home.cover) process.exit(1);
if (!/没有符合条件的深度学习课堂|No sessions match/.test(history)) {
  console.error("HISTORY_TAB_FAIL", history);
  process.exit(1);
}
if (!/今天|本周|本月/.test(history)) {
  console.error("HISTORY_RANGE_FAIL", history);
  process.exit(1);
}
if (!/仅收藏|Starred only/.test(history)) {
  console.error("HISTORY_STAR_FAIL", history);
  process.exit(1);
}
if (home.lms) {
  console.error("LMS_ALWAYS_ON", home);
  process.exit(1);
}
if (!school) {
  console.error("LMS_MISSING_WHEN_SCHOOL");
  process.exit(1);
}
if (!home.weekDots || !home.streak) {
  console.error("HOME_STREAK_FAIL", home);
  process.exit(1);
}
if (!/已确认任务|Confirmed/.test(feed.text)) {
  console.error("FEED_TAB_FAIL", feed);
  process.exit(1);
}
if (!feed.heat || feed.cells < 28 || feed.weekDots < 7 || !feed.dust) {
  console.error("HEATMAP_FAIL", feed);
  process.exit(1);
}
if (!/周视图|月视图/.test(feed.text)) {
  console.error("FEED_CAL_FAIL", feed);
  process.exit(1);
}
writeFileSync(shot.replace(/\.png$/, ".json"), JSON.stringify(report, null, 2));
