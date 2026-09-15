import { chromium } from "playwright";
import { writeFileSync } from "node:fs";

const origin = process.env.ANYKNOW_URL || "http://127.0.0.1:4173";
const base = origin.replace(/\/$/, "");
const shot = process.env.SHOT || "trends.png";
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

await page.goto(`${base}/#/`, { waitUntil: "networkidle", timeout: 30000 });
await page.waitForSelector("h1", { timeout: 15000 });
await page.click('button[data-mode="assist"]');
await page.waitForSelector(".trend-strip", { timeout: 10000 });
await page.waitForTimeout(350);
const assist = await page.evaluate(() => {
  const text = document.body.innerText;
  const first = document.querySelector(".trend-item");
  return {
    title: text.includes("今日值得学") || /Latest stuff to learn/i.test(text),
    next: text.includes("换一批") || /\bNext\b/.test(text),
    hotspot: text.includes("成瘾性设计") || /addictive design/i.test(text),
    mark: /Hyperknow|Orbie/i.test(text),
    count: document.querySelectorAll(".trend-item").length,
    first: first?.textContent || "",
    h2Font: getComputedStyle(document.querySelector(".trend-head h2")).fontFamily,
  };
});
await page.screenshot({ path: shot, fullPage: false });

const firstLabel = assist.first;
await page.click(".trend-item");
await page.waitForTimeout(200);
const filled = await page.evaluate(() => document.querySelector("#prompt")?.value || "");

await page.click("#trendNext");
await page.waitForTimeout(250);
const rotated = await page.evaluate(() => document.querySelector(".trend-item")?.textContent || "");
await page.screenshot({ path: shot.replace(/\.png$/, "-next.png"), fullPage: false });

await page.click('button[data-mode="craft"]');
await page.waitForTimeout(200);
const craft = await page.evaluate(() => !document.querySelector(".trend-strip"));

await page.setViewportSize({ width: 390, height: 844 });
await page.click('button[data-mode="assist"]');
await page.waitForSelector(".trend-strip", { timeout: 8000 });
await page.waitForTimeout(300);
const mobile = await page.evaluate(() => ({
  w: window.innerWidth,
  strip: !!document.querySelector(".trend-strip"),
}));
await page.screenshot({ path: shot.replace(/\.png$/, "-mobile.png"), fullPage: false });
await browser.close();

const report = { assist, filled, rotated, craft, mobile, errors, shot };
console.log(JSON.stringify(report, null, 2));
writeFileSync(shot.replace(/\.png$/, ".json"), JSON.stringify(report, null, 2));

if (errors.length) {
  console.error("PAGE_ERRORS", errors);
  process.exit(1);
}
if (!assist.title || !assist.next || !assist.hotspot || assist.mark || assist.count !== 5) {
  console.error("TREND_ASSIST_FAIL", assist);
  process.exit(1);
}
if (!/ZCOOL XiaoWei|Kalam/i.test(assist.h2Font)) {
  console.error("TREND_FONT_FAIL", assist.h2Font);
  process.exit(1);
}
if (!filled || filled.length < 8) {
  console.error("TREND_FILL_FAIL", filled);
  process.exit(1);
}
if (!rotated || rotated === firstLabel) {
  console.error("TREND_NEXT_FAIL", { firstLabel, rotated });
  process.exit(1);
}
if (!craft) {
  console.error("TREND_CRAFT_FAIL");
  process.exit(1);
}
if (!mobile.strip || mobile.w > 420) {
  console.error("TREND_MOBILE_FAIL", mobile);
  process.exit(1);
}
