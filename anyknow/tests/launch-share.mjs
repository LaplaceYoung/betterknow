import { chromium } from "playwright";
import { writeFileSync } from "node:fs";

const origin = process.env.ANYKNOW_URL || "http://127.0.0.1:4173";
const base = origin.replace(/\/$/, "");
const shot = process.env.SHOT || "share.png";
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

await page.goto(`${base}/#/share/c/quicksort`, { waitUntil: "networkidle", timeout: 30000 });
await page.waitForSelector(".share-page", { timeout: 15000 });
await page.waitForTimeout(250);
const conv = await page.evaluate(() => {
  const text = document.body.innerText;
  const art = document.querySelector(".share-art");
  return {
    title: text.includes("Quicksort"),
    user: /quicksort partitions/i.test(text),
    pivot: /pivot/i.test(text),
    journey: text.includes("开启属于你的学习之旅") || /learning journey/i.test(text),
    copy: text.includes("复制链接") || /Copy link/i.test(text),
    mark: /Hyperknow|Orbie/i.test(text),
    artW: art?.naturalWidth || 0,
    h1Font: getComputedStyle(document.querySelector("h1")).fontFamily,
  };
});
await page.screenshot({ path: shot, fullPage: false });

await page.goto(`${base}/#/share/c/missing-id`, { waitUntil: "networkidle" });
await page.waitForTimeout(200);
const miss = await page.evaluate(() => ({
  fail: document.body.innerText.includes("对话加载失败") || /Failed to Load/i.test(document.body.innerText),
}));
await page.screenshot({ path: shot.replace(/\.png$/, "-miss.png"), fullPage: false });

await page.goto(`${base}/#/share/course/mkt-sociology`, { waitUntil: "networkidle" });
await page.waitForSelector(".share-page", { timeout: 10000 });
await page.waitForTimeout(200);
const course = await page.evaluate(() => {
  const text = document.body.innerText;
  return {
    title: text.includes("社会学概论") || /Sociology/i.test(text),
    sub: text.includes("仅会分享课程概览") || /overview will be shared/i.test(text),
    journey: text.includes("开启属于你的学习之旅") || /learning journey/i.test(text),
  };
});
await page.screenshot({ path: shot.replace(/\.png$/, "-course.png"), fullPage: false });

await page.setViewportSize({ width: 390, height: 844 });
await page.goto(`${base}/#/share/c/quicksort`, { waitUntil: "networkidle" });
await page.waitForSelector(".share-page", { timeout: 10000 });
const mobile = await page.evaluate(() => ({
  w: window.innerWidth,
  page: !!document.querySelector(".share-page"),
}));
await page.screenshot({ path: shot.replace(/\.png$/, "-mobile.png"), fullPage: false });
await browser.close();

const report = { conv, miss, course, mobile, errors, shot };
console.log(JSON.stringify(report, null, 2));
writeFileSync(shot.replace(/\.png$/, ".json"), JSON.stringify(report, null, 2));

if (errors.length) {
  console.error("PAGE_ERRORS", errors);
  process.exit(1);
}
if (!conv.title || !conv.user || !conv.pivot || !conv.journey || conv.mark || conv.artW < 1) {
  console.error("SHARE_CONV_FAIL", conv);
  process.exit(1);
}
if (!/ZCOOL XiaoWei|Kalam/i.test(conv.h1Font)) {
  console.error("SHARE_FONT_FAIL", conv.h1Font);
  process.exit(1);
}
if (!miss.fail) {
  console.error("SHARE_MISS_FAIL", miss);
  process.exit(1);
}
if (!course.title || !course.sub) {
  console.error("SHARE_COURSE_FAIL", course);
  process.exit(1);
}
if (!mobile.page || mobile.w > 420) {
  console.error("SHARE_MOBILE_FAIL", mobile);
  process.exit(1);
}
