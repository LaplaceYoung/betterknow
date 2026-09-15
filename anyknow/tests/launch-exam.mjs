import { chromium } from "playwright";
import { writeFileSync } from "node:fs";

const origin = process.env.ANYKNOW_URL || "http://127.0.0.1:4173";
const base = origin.replace(/\/$/, "");
const shot = process.env.SHOT || "exam.png";
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

await page.goto(`${base}/#/course/pythagorean/exam/unit1`, { waitUntil: "networkidle", timeout: 30000 });
await page.waitForSelector(".exam-page", { timeout: 15000 });
await page.waitForTimeout(400);
const intro = await page.evaluate(() => {
  const text = document.body.innerText;
  return {
    leftover: document.querySelector(".exam-page")?.dataset.examLeftover === "1",
    title: /Comprehensive Assessment/i.test(text),
    ready: text.includes("我准备好了") || /I'm ready/i.test(text),
    duration: text.includes("30 分钟") || /30 minutes/i.test(text),
    count: /16 道题|16 questions/.test(text),
    timed: /限时|timed/i.test(text),
    mark: /Hyperknow|Orbie/i.test(text),
  };
});
await page.screenshot({ path: shot, fullPage: false });

await page.click("#examStart");
await page.waitForTimeout(350);
const play = await page.evaluate(() => {
  const text = document.body.innerText;
  return {
    clock: !!document.querySelector("[data-exam-clock]"),
    clockText: document.querySelector(".exam-clock")?.textContent || "",
    prompt: /90-degree angle|anchor|boss/i.test(text),
    opts: document.querySelectorAll("[data-exam-opt]").length,
    mark: /Hyperknow|Orbie/i.test(text),
  };
});
await page.screenshot({ path: shot.replace(/\.png$/, "-play.png"), fullPage: false });

await page.click('button[data-exam-opt="The 90-degree angle"]');
await page.click("#examNext");
await page.waitForTimeout(200);
const second = await page.evaluate(() => ({
  multi: /rotate|unchanged/i.test(document.body.innerText),
  index: /2 \/ 16/.test(document.body.innerText),
}));

await page.setViewportSize({ width: 390, height: 844 });
await page.goto(`${base}/#/course/3ea5b7d5-d475-4c4f-84bf-9834e24a35c2/exam/unit3`, {
  waitUntil: "networkidle",
});
await page.waitForSelector(".exam-page", { timeout: 10000 });
await page.waitForTimeout(300);
const unit3 = await page.evaluate(() => {
  const text = document.body.innerText;
  return {
    title: /Mastery Exam/i.test(text),
    leftover: document.querySelector(".exam-page")?.dataset.examLeftover === "1",
    mark: /Hyperknow|Orbie/i.test(text),
    w: window.innerWidth,
  };
});
await page.screenshot({ path: shot.replace(/\.png$/, "-mobile.png"), fullPage: false });

await page.setViewportSize({ width: 1280, height: 800 });
await page.goto(`${base}/#/course/regression/exam/unit1`, { waitUntil: "networkidle", timeout: 30000 });
await page.waitForSelector(".exam-page", { timeout: 15000 });
await page.waitForTimeout(300);
const regression = await page.evaluate(() => {
  const text = document.body.innerText;
  return {
    leftover: document.querySelector(".exam-page")?.dataset.examLeftover === "1",
    title: /Geometric Intuition/i.test(text),
    count: /18 道题|18 questions/.test(text),
    mark: /Hyperknow|Orbie/i.test(text),
  };
});
await page.click("#examStart");
await page.waitForTimeout(350);
const regressionPlay = await page.evaluate(() => {
  const text = document.body.innerText;
  return {
    prompt: /cigar-like/i.test(text),
    image: !!document.querySelector(".board-image svg"),
    opts: document.querySelectorAll("[data-exam-opt]").length,
    clock: !!document.querySelector("[data-exam-clock]"),
    mark: /Hyperknow|Orbie/i.test(text),
  };
});
await page.screenshot({ path: shot.replace(/\.png$/, "-regression.png"), fullPage: false });

await page.setViewportSize({ width: 390, height: 844 });
await page.goto(`${base}/#/course/706d4d5c-1b4d-4707-abb0-45fc9b1f4926/exam/unit1`, {
  waitUntil: "networkidle",
});
await page.waitForSelector(".exam-page", { timeout: 10000 });
await page.waitForTimeout(250);
const regressionMobile = await page.evaluate(() => {
  const text = document.body.innerText;
  return {
    leftover: document.querySelector(".exam-page")?.dataset.examLeftover === "1",
    title: /Geometric Intuition|cigar-like/i.test(text),
    mark: /Hyperknow|Orbie/i.test(text),
    w: window.innerWidth,
  };
});
await page.screenshot({ path: shot.replace(/\.png$/, "-regression-mobile.png"), fullPage: false });
await browser.close();

const report = { intro, play, second, unit3, regression, regressionPlay, regressionMobile, errors, shot };
console.log(JSON.stringify(report, null, 2));
writeFileSync(shot.replace(/\.png$/, ".json"), JSON.stringify(report, null, 2));

if (errors.length) {
  console.error("PAGE_ERRORS", errors);
  process.exit(1);
}
if (!intro.leftover || !intro.title || !intro.ready || !intro.duration || !intro.count || intro.mark) {
  console.error("EXAM_INTRO_FAIL", intro);
  process.exit(1);
}
if (!play.clock || !play.prompt || play.opts < 4 || play.mark) {
  console.error("EXAM_PLAY_FAIL", play);
  process.exit(1);
}
if (!second.multi || !second.index) {
  console.error("EXAM_NEXT_FAIL", second);
  process.exit(1);
}
if (!unit3.leftover || !unit3.title || unit3.mark || unit3.w > 420) {
  console.error("EXAM_MOBILE_FAIL", unit3);
  process.exit(1);
}
if (!regression.leftover || !regression.title || !regression.count || regression.mark) {
  console.error("EXAM_REGRESSION_FAIL", regression);
  process.exit(1);
}
if (!regressionPlay.prompt || !regressionPlay.image || regressionPlay.opts < 4 || !regressionPlay.clock || regressionPlay.mark) {
  console.error("EXAM_REGRESSION_PLAY_FAIL", regressionPlay);
  process.exit(1);
}
if (!regressionMobile.leftover || !regressionMobile.title || regressionMobile.mark || regressionMobile.w > 420) {
  console.error("EXAM_REGRESSION_MOBILE_FAIL", regressionMobile);
  process.exit(1);
}
