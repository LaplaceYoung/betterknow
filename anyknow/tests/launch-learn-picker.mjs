import { chromium } from "playwright";
import { writeFileSync } from "node:fs";

const origin = process.env.ANYKNOW_URL || "http://127.0.0.1:4173";
const base = origin.replace(/\/$/, "");
const shot = process.env.SHOT || "learn-picker.png";
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

await page.goto(`${base}/#/learn`, { waitUntil: "networkidle", timeout: 30000 });
await page.waitForSelector(".learn-picker", { timeout: 15000 });
await page.waitForTimeout(200);

const open = await page.evaluate(() => {
  const text = document.body.innerText;
  const art = document.querySelector(".learn-picker-art");
  return {
    picker: !!document.querySelector(".learn-picker"),
    add: text.includes("课程学习节") || text.includes("Course session"),
    selectCourse: text.includes("选择课程") || text.includes("Select a course"),
    sociology: text.includes("社会学概论") || /sociology/i.test(text),
    sessions: text.includes("选择学习节") || text.includes("Select a whiteboard session"),
    artW: art?.naturalWidth || 0,
    h1Font: getComputedStyle(document.querySelector("h1")).fontFamily,
  };
});
await page.screenshot({ path: shot, fullPage: false });

const courseBtn = page.locator(".learn-picker .learn-syllabus-option").filter({ hasText: /社会学|Sociology/i }).first();
await courseBtn.click();
await page.waitForTimeout(300);

const picked = await page.evaluate(() => {
  const text = document.body.innerText;
  return {
    hash: location.hash,
    selectSession: text.includes("选择学习节") || text.includes("Select a whiteboard session"),
    imagination: text.includes("社会学想象力") || /imagination/i.test(text),
    picker: !!document.querySelector(".learn-picker"),
  };
});
await page.screenshot({ path: shot.replace(/\.png$/, "-course.png"), fullPage: false });

const sessionBtn = page.locator(".learn-picker .learn-syllabus-option").filter({ hasText: /想象力|Imagination/i }).first();
await sessionBtn.click();
await page.waitForSelector("#learnStart", { timeout: 10000 });
const landed = await page.evaluate(() => ({
  hash: location.hash,
  overlay: !!document.querySelector(".learn-intro-overlay"),
  start: !!document.querySelector("#learnStart"),
}));
await page.screenshot({ path: shot.replace(/\.png$/, "-landed.png"), fullPage: false });

await page.goto(`${base}/#/course/mkt-sociology/sessions/whiteboard/no-such-session`, {
  waitUntil: "networkidle",
});
await page.waitForSelector(".learn-picker", { timeout: 10000 });
const missing = await page.evaluate(() => ({
  picker: !!document.querySelector(".learn-picker"),
  sessions: document.body.innerText.includes("选择学习节") || document.body.innerText.includes("Select a whiteboard session"),
}));

await page.setViewportSize({ width: 390, height: 844 });
await page.goto(`${base}/#/learn`, { waitUntil: "networkidle" });
await page.waitForSelector(".learn-picker", { timeout: 10000 });
const mobile = await page.evaluate(() => ({
  picker: !!document.querySelector(".learn-picker"),
  w: window.innerWidth,
}));
await page.screenshot({ path: shot.replace(/\.png$/, "-mobile.png"), fullPage: false });
await browser.close();

const report = { open, picked, landed, missing, mobile, errors, shot };
console.log(JSON.stringify(report, null, 2));
writeFileSync(shot.replace(/\.png$/, ".json"), JSON.stringify(report, null, 2));

if (errors.length) {
  console.error("PAGE_ERRORS", errors);
  process.exit(1);
}
if (!open.picker || !open.add || !open.selectCourse || !open.sociology || open.artW < 1) {
  console.error("LEARN_PICKER_OPEN_FAIL", open);
  process.exit(1);
}
if (!/ZCOOL XiaoWei|Kalam/i.test(open.h1Font)) {
  console.error("LEARN_PICKER_FONT_FAIL", open.h1Font);
  process.exit(1);
}
if (open.sessions) {
  console.error("LEARN_PICKER_SESSIONS_TOO_EARLY", open);
  process.exit(1);
}
if (!picked.picker || !picked.selectSession || !picked.imagination || !picked.hash.includes("/sessions/whiteboard")) {
  console.error("LEARN_PICKER_COURSE_FAIL", picked);
  process.exit(1);
}
if (!landed.overlay || !landed.start || !landed.hash.includes("soc-imagination")) {
  console.error("LEARN_PICKER_LAND_FAIL", landed);
  process.exit(1);
}
if (!missing.picker || !missing.sessions) {
  console.error("LEARN_PICKER_MISSING_FAIL", missing);
  process.exit(1);
}
if (!mobile.picker || mobile.w > 420) {
  console.error("LEARN_PICKER_MOBILE_FAIL", mobile);
  process.exit(1);
}
