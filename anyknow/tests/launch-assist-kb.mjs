import { chromium } from "playwright";
import { writeFileSync } from "node:fs";

const origin = process.env.ANYKNOW_URL || "http://127.0.0.1:4173";
const base = origin.replace(/\/$/, "");
const shot = process.env.SHOT || "assist-kb.png";
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
await page.click('[data-study-opt="level"][data-study-val="入门"]');
await page.waitForTimeout(80);
await page.click('[data-study-opt="style"][data-study-val="直觉图像"]');
await page.waitForTimeout(80);
await page.click('[data-study-opt="focus"][data-study-val="核心定义"]');
await page.waitForFunction(() => /已检索公开教材|从零讲起/.test(document.body.innerText), {
  timeout: 20000,
});
await page.waitForTimeout(300);

const desktop = await page.evaluate(() => {
  const text = document.body.innerText;
  return {
    leftover: /Hyperknow|Orbie/i.test(text),
    kbHit: /已检索公开教材|Retrieved from public textbooks|公开教材/i.test(text),
    source: /limit|derivative|calculus|2-2|3-1|5-3/i.test(text),
    licenseDump: /License:/i.test(text),
    mark: /Hyperknow|Orbie/i.test(text),
  };
});
await page.screenshot({ path: shot, fullPage: false });

await page.setViewportSize({ width: 390, height: 844 });
await page.waitForTimeout(200);
const mobile = await page.evaluate(() => ({
  kbHit: /已检索公开教材|公开教材/i.test(document.body.innerText),
  w: window.innerWidth,
  mark: /Hyperknow|Orbie/i.test(document.body.innerText),
}));
await page.screenshot({ path: shot.replace(/\.png$/, "-mobile.png"), fullPage: false });
await browser.close();

const report = { desktop, mobile, errors, shot };
console.log(JSON.stringify(report, null, 2));
writeFileSync(shot.replace(/\.png$/, ".json"), JSON.stringify(report, null, 2));

if (errors.length) {
  console.error("PAGE_ERRORS", errors);
  process.exit(1);
}
if (desktop.leftover || desktop.mark || desktop.licenseDump || !desktop.kbHit || !desktop.source) {
  console.error("ASSIST_KB_FAIL", desktop);
  process.exit(1);
}
if (!mobile.kbHit || mobile.mark || mobile.w > 420) {
  console.error("ASSIST_KB_MOBILE_FAIL", mobile);
  process.exit(1);
}
