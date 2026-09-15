import { chromium } from "playwright";
import { writeFileSync } from "node:fs";

const origin = process.env.ANYKNOW_URL || "http://127.0.0.1:4173";
const base = origin.replace(/\/$/, "");
const shot = process.env.SHOT || "assist-study.png";
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
await page.click('[data-assist-chip="explain"]');
await page.waitForTimeout(150);
await page.fill("#prompt", "用粉笔把这个概念讲清楚：微积分");
await page.click("#send");
await page.waitForSelector("[data-study-ask]", { timeout: 20000 });
await page.waitForTimeout(250);

const paused = await page.evaluate(() => {
  const text = document.body.innerText;
  return {
    ask: !!document.querySelector("[data-study-ask]"),
    level: !!document.querySelector('[data-study-opt="level"][data-study-val="入门"]'),
    style: !!document.querySelector('[data-study-opt="style"][data-study-val="直觉图像"]'),
    focus: !!document.querySelector('[data-study-opt="focus"][data-study-val="核心定义"]'),
    retrieved: /已检索公开教材/.test(text),
    mark: /Hyperknow|Orbie/i.test(text),
    hash: location.hash,
  };
});
await page.screenshot({ path: shot, fullPage: false });

await page.click('[data-study-opt="level"][data-study-val="入门"]');
await page.waitForTimeout(120);
await page.click('[data-study-opt="style"][data-study-val="直觉图像"]');
await page.waitForTimeout(120);
await page.click('[data-study-opt="focus"][data-study-val="核心定义"]');
await page.waitForFunction(
  () =>
    document.querySelector("[data-content-board]") ||
    /已检索公开教材|从零讲起/.test(document.body.innerText),
  { timeout: 20000 },
);
await page.waitForTimeout(300);

const taught = await page.evaluate((pausedHash) => {
  const text = document.body.innerText;
  return {
    same: location.hash === pausedHash,
    leftover: /248fd02f72be4bad82bcdd347b8bf237/.test(location.hash),
    retrieved: !!document.querySelector("[data-content-board]") || /已检索公开教材|从零讲起/.test(text),
    encyclopedia: !!document.querySelector("[data-content-board]"),
    sections: text.includes("定义"),
    gated: !!document.querySelector('[data-study-val="继续"]'),
    source: /limit|derivative|calculus|2-2|3-1|4-10|5-3/i.test(text),
    users: document.querySelectorAll("[data-resp-role='user']").length,
    mark: /Hyperknow|Orbie/i.test(text),
  };
}, paused.hash);
await page.screenshot({ path: shot.replace(/\.png$/, "-taught.png"), fullPage: false });

await page.setViewportSize({ width: 390, height: 844 });
await page.waitForTimeout(250);
const mobile = await page.evaluate(() => ({
  retrieved:
    !!document.querySelector("[data-content-board]") || /已检索公开教材|从零讲起/.test(document.body.innerText),
  w: window.innerWidth,
  mark: /Hyperknow|Orbie/i.test(document.body.innerText),
}));
await page.screenshot({ path: shot.replace(/\.png$/, "-mobile.png"), fullPage: false });
await browser.close();

const report = { paused, taught, mobile, errors, shot };
console.log(JSON.stringify(report, null, 2));
writeFileSync(shot.replace(/\.png$/, ".json"), JSON.stringify(report, null, 2));

if (errors.length) {
  console.error("PAGE_ERRORS", errors);
  process.exit(1);
}
if (!paused.ask || !paused.level || !paused.style || !paused.focus || paused.retrieved || paused.mark) {
  console.error("ASSIST_STUDY_PAUSE_FAIL", paused);
  process.exit(1);
}
if (!taught.same || taught.leftover || !taught.retrieved || !taught.encyclopedia || !taught.sections || !taught.gated || !taught.source || taught.users < 2 || taught.mark) {
  console.error("ASSIST_STUDY_TEACH_FAIL", taught);
  process.exit(1);
}
if (!mobile.retrieved || mobile.mark || mobile.w > 420) {
  console.error("ASSIST_STUDY_MOBILE_FAIL", mobile);
  process.exit(1);
}
