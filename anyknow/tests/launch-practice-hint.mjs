import { chromium } from "playwright";
import { writeFileSync } from "node:fs";

const origin = process.env.ANYKNOW_URL || "http://127.0.0.1:4173";
const base = origin.replace(/\/$/, "");
const shot = process.env.SHOT || "practice-hint.png";
const errors = [];
const sid = "d62f9bbb-2902-49e5-b415-816a31207dda";

const browser = await chromium.launch({
  headless: true,
  channel: process.env.PW_CHANNEL || "chrome",
});
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
page.on("pageerror", (e) => errors.push(String(e)));
page.on("console", (msg) => {
  if (msg.type() === "error") errors.push(msg.text());
});

await page.goto(`${base}/#/course/pythagorean/practice/${sid}`, { waitUntil: "networkidle", timeout: 30000 });
await page.waitForSelector(".prac-page", { timeout: 15000 });
await page.click("#pracStart");
await page.waitForSelector("#askHint", { timeout: 10000 });
await page.waitForTimeout(200);
await page.click("#askHint");
await page.waitForSelector("[data-tutor-hint]", { timeout: 15000 });
const hinted = await page.evaluate(() => {
  const el = document.querySelector("[data-tutor-hint]");
  const text = el?.textContent || "";
  return {
    painted: !!el,
    withheld: !/答案是|the answer is/i.test(text),
    hasProbe: /现象|自己的话|不要/.test(text) || text.length > 8,
    mark: /Hyperknow|Orbie/i.test(document.body.innerText),
  };
});
await page.screenshot({ path: shot, fullPage: false });

await page.click("#pracSkip");
await page.waitForTimeout(250);
const afterSkip = await page.evaluate(() => ({
  gone: !document.querySelector("[data-tutor-hint]"),
  empty: /卡住了|Ask for a hint|要一个提示/i.test(document.body.innerText),
}));
await page.screenshot({ path: shot.replace(/\.png$/, "-cleared.png"), fullPage: false });

await page.setViewportSize({ width: 390, height: 844 });
await page.goto(`${base}/`, { waitUntil: "networkidle" });
await page.goto(`${base}/#/course/pythagorean/practice/${sid}`, { waitUntil: "networkidle" });
await page.waitForSelector("#pracStart", { timeout: 10000 });
await page.click("#pracStart");
await page.waitForSelector("#askHint", { timeout: 10000 });
await page.click("#askHint");
await page.waitForSelector("[data-tutor-hint]", { timeout: 15000 });
const mobile = await page.evaluate(() => ({
  painted: !!document.querySelector("[data-tutor-hint]"),
  w: window.innerWidth,
  mark: /Hyperknow|Orbie/i.test(document.body.innerText),
}));
await page.screenshot({ path: shot.replace(/\.png$/, "-mobile.png"), fullPage: false });
await browser.close();

const report = { hinted, afterSkip, mobile, errors, shot };
console.log(JSON.stringify(report, null, 2));
writeFileSync(shot.replace(/\.png$/, ".json"), JSON.stringify(report, null, 2));

if (errors.length) {
  console.error("PAGE_ERRORS", errors);
  process.exit(1);
}
if (!hinted.painted || !hinted.withheld || !hinted.hasProbe || hinted.mark) {
  console.error("PRAC_HINT_FAIL", hinted);
  process.exit(1);
}
if (!afterSkip.gone) {
  console.error("PRAC_HINT_CLEAR_FAIL", afterSkip);
  process.exit(1);
}
if (!mobile.painted || mobile.mark || mobile.w > 420) {
  console.error("PRAC_HINT_MOBILE_FAIL", mobile);
  process.exit(1);
}
