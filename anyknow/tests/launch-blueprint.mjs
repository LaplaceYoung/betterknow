import { chromium } from "playwright";
import { writeFileSync } from "node:fs";

const origin = process.env.ANYKNOW_URL || "http://127.0.0.1:4173";
const base = origin.replace(/\/$/, "");
const shot = process.env.SHOT || "blueprint.png";
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

await page.goto(`${base}/#/dev/csm`, { waitUntil: "networkidle", timeout: 30000 });
await page.waitForSelector(".blueprint-page", { timeout: 15000 });
await page.waitForTimeout(400);
const live = await page.evaluate(() => {
  const text = document.body.innerText;
  return {
    review: text.includes("查看课程蓝图") || /Review course blueprint/i.test(text),
    eyebrow: text.includes("课程讲解结构") || /Course Blueprint/i.test(text),
    title: /Geometric Anchor|Best Fit Line|Linear Regression/i.test(text),
    confirm: text.includes("确认生成完整课程") || /Confirm & Generate Course/i.test(text),
    mark: /Hyperknow|Orbie/i.test(text),
    nodes: document.querySelectorAll(".bp-node").length,
    h1Font: getComputedStyle(document.querySelector("h1")).fontFamily,
  };
});
await page.screenshot({ path: shot, fullPage: false });

const before = await page.evaluate(() => document.querySelectorAll(".bp-node.session").length);
await page.click(".bp-node.session");
await page.click("#bpSplit");
await page.waitForTimeout(200);
const after = await page.evaluate(() => document.querySelectorAll(".bp-node.session").length);
await page.screenshot({ path: shot.replace(/\.png$/, "-split.png"), fullPage: false });

const email = `bp${Date.now()}@anyknow.test`;
const auth = await page.request.post(`${base}/api/auth/register`, {
  data: { email, password: "ChalkBoard9", username: "Ada" },
});
const { token } = await auth.json();
await page.request.post(`${base}/api/onboarding`, {
  headers: { Authorization: `Bearer ${token}` },
  data: { complete: true, skipped: true, language: "zh" },
});
await page.evaluate((tok) => localStorage.setItem("anyknow_token", tok), token);
await page.reload({ waitUntil: "networkidle" });
await page.goto(`${base}/#/dev/csm`, { waitUntil: "networkidle" });
await page.waitForSelector("#bpConfirm", { timeout: 10000 });
await page.click("#bpConfirm");
await page.waitForFunction(() => location.hash.includes("/course/"), { timeout: 15000 });
const course = await page.evaluate(() => ({
  hash: location.hash,
  title: /Linear Regression|Geometric Anchor|Best Fit/i.test(document.body.innerText),
  mark: /Hyperknow|Orbie/i.test(document.body.innerText),
}));
await page.screenshot({ path: shot.replace(/\.png$/, "-course.png"), fullPage: false });

await page.setViewportSize({ width: 390, height: 844 });
await page.goto(`${base}/#/dev/csm`, { waitUntil: "networkidle" });
await page.waitForSelector(".blueprint-page", { timeout: 8000 });
await page.waitForTimeout(300);
const mobile = await page.evaluate(() => ({
  w: window.innerWidth,
  page: !!document.querySelector(".blueprint-page"),
}));
await page.screenshot({ path: shot.replace(/\.png$/, "-mobile.png"), fullPage: false });
await browser.close();

const report = { live, before, after, course, mobile, errors, shot };
console.log(JSON.stringify(report, null, 2));
writeFileSync(shot.replace(/\.png$/, ".json"), JSON.stringify(report, null, 2));

if (errors.length) {
  console.error("PAGE_ERRORS", errors);
  process.exit(1);
}
if (!live.review || !live.title || !live.confirm || live.mark || live.nodes < 8) {
  console.error("BLUEPRINT_LIVE_FAIL", live);
  process.exit(1);
}
if (!/ZCOOL XiaoWei|Kalam/i.test(live.h1Font)) {
  console.error("BLUEPRINT_FONT_FAIL", live.h1Font);
  process.exit(1);
}
if (!(after > before)) {
  console.error("BLUEPRINT_SPLIT_FAIL", { before, after });
  process.exit(1);
}
if (!course.title || course.mark) {
  console.error("BLUEPRINT_COURSE_FAIL", course);
  process.exit(1);
}
if (!mobile.page || mobile.w > 420) {
  console.error("BLUEPRINT_MOBILE_FAIL", mobile);
  process.exit(1);
}
