import { chromium } from "playwright";
import { writeFileSync } from "node:fs";

const origin = process.env.ANYKNOW_URL || "http://127.0.0.1:4173";
const base = origin.replace(/\/$/, "");
const shot = process.env.SHOT || "assist-plan.png";
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
await page.click('button[data-mode="assist"]');
await page.waitForTimeout(200);
await page.click("#assistToolsBtn");
await page.waitForTimeout(150);
await page.click('[data-assist-tool="plan"]');
await page.waitForTimeout(150);
await page.fill("#prompt", "微积分");
await page.click("#send");
await page.waitForSelector("[data-study-ask]", { timeout: 20000 });
await page.waitForTimeout(250);

const paused = await page.evaluate(() => {
  const text = document.body.innerText;
  return {
    response: /#\/response\/conv_/.test(location.hash),
    feed: /learning-feed/.test(location.hash),
    scope: !!document.querySelector('[data-study-opt="scope"][data-study-val="本章节"]'),
    hours: !!document.querySelector('[data-study-opt="hours"][data-study-val="每周3小时"]'),
    goal: !!document.querySelector('[data-study-opt="goal"][data-study-val="过关"]'),
    board: !!document.querySelector("[data-plan-board]"),
    cal: /Google Calendar/i.test(text),
    mark: /Hyperknow|Orbie/i.test(text),
    hash: location.hash,
  };
});
await page.screenshot({ path: shot, fullPage: false });

await page.click('[data-study-opt="scope"][data-study-val="本章节"]');
await page.waitForTimeout(120);
await page.click('[data-study-opt="hours"][data-study-val="每周3小时"]');
await page.waitForTimeout(120);
await page.click('[data-study-opt="goal"][data-study-val="过关"]');
await page.waitForSelector("[data-plan-board]", { timeout: 20000 });
await page.waitForTimeout(300);

const drafted = await page.evaluate((pausedHash) => {
  const text = document.body.innerText;
  return {
    same: location.hash === pausedHash,
    feed: /learning-feed/.test(location.hash),
    board: !!document.querySelector("[data-plan-board]"),
    accept: !!document.querySelector('[data-plan-act="accept"]'),
    cal: /Google Calendar/i.test(text),
    mark: /Hyperknow|Orbie/i.test(text),
  };
}, paused.hash);
await page.screenshot({ path: shot.replace(/\.png$/, "-board.png"), fullPage: false });

await page.click('[data-plan-act="accept"]');
await page.waitForFunction(() => /已写入学习动态/.test(document.body.innerText), { timeout: 15000 });
await page.waitForTimeout(200);
const confirmed = await page.evaluate((pausedHash) => ({
  same: location.hash === pausedHash,
  feed: /learning-feed/.test(location.hash),
  written: /已写入学习动态/.test(document.body.innerText),
  cal: /Google Calendar/i.test(document.body.innerText),
  mark: /Hyperknow|Orbie/i.test(document.body.innerText),
}), paused.hash);
await page.screenshot({ path: shot.replace(/\.png$/, "-confirm.png"), fullPage: false });

await page.setViewportSize({ width: 390, height: 844 });
await page.waitForTimeout(250);
const mobile = await page.evaluate(() => ({
  board: !!document.querySelector("[data-plan-board]"),
  w: window.innerWidth,
  feed: /learning-feed/.test(location.hash),
  mark: /Hyperknow|Orbie/i.test(document.body.innerText),
}));
await page.screenshot({ path: shot.replace(/\.png$/, "-mobile.png"), fullPage: false });
await browser.close();

const report = { paused, drafted, confirmed, mobile, errors, shot };
console.log(JSON.stringify(report, null, 2));
writeFileSync(shot.replace(/\.png$/, ".json"), JSON.stringify(report, null, 2));

if (errors.length) {
  console.error("PAGE_ERRORS", errors);
  process.exit(1);
}
if (!paused.response || paused.feed || !paused.scope || !paused.hours || !paused.goal || paused.board || paused.cal || paused.mark) {
  console.error("ASSIST_PLAN_PAUSE_FAIL", paused);
  process.exit(1);
}
if (!drafted.same || drafted.feed || !drafted.board || !drafted.accept || drafted.cal || drafted.mark) {
  console.error("ASSIST_PLAN_BOARD_FAIL", drafted);
  process.exit(1);
}
if (!confirmed.same || confirmed.feed || !confirmed.written || confirmed.cal || confirmed.mark) {
  console.error("ASSIST_PLAN_CONFIRM_FAIL", confirmed);
  process.exit(1);
}
if (!mobile.board || mobile.feed || mobile.mark || mobile.w > 420) {
  console.error("ASSIST_PLAN_MOBILE_FAIL", mobile);
  process.exit(1);
}
