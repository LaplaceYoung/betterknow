import { chromium } from "playwright";
import { writeFileSync } from "node:fs";

const origin = process.env.ANYKNOW_URL || "http://127.0.0.1:4173";
const base = origin.replace(/\/$/, "");
const shot = process.env.SHOT || "project.png";
const errors = [];
const stageId = "22b6a5c6-6ce5-47fb-b516-b5b679b84f74";

const browser = await chromium.launch({
  headless: true,
  channel: process.env.PW_CHANNEL || "chrome",
});
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
page.on("pageerror", (e) => errors.push(String(e)));
page.on("console", (msg) => {
  if (msg.type() === "error") errors.push(msg.text());
});

await page.goto(`${base}/#/course/pythagorean/project/${stageId}`, {
  waitUntil: "networkidle",
  timeout: 30000,
});
await page.waitForSelector(".proj-page", { timeout: 15000 });
await page.waitForTimeout(350);
const intro = await page.evaluate(() => {
  const text = document.body.innerText;
  return {
    leftover: document.querySelector(".proj-page")?.dataset.projLeftover === "1",
    title: /Constructing the Area Model/i.test(text),
    step: /Project introduction/i.test(text),
    next: text.includes("下一步") || /Next/i.test(text),
    mark: /Hyperknow|Orbie/i.test(text),
  };
});
await page.screenshot({ path: shot, fullPage: false });

await page.click("#projNext");
await page.waitForTimeout(250);
const play = await page.evaluate(() => {
  const text = document.body.innerText;
  return {
    need: text.includes("需要作答") || /Your answer/i.test(text),
    prompt: /whole-number leg lengths/i.test(text),
    area: !!document.querySelector("#projAnswer"),
    submit: !!document.querySelector("#projSubmitStep"),
    index: /2 \/ 6/.test(text),
    mark: /Hyperknow|Orbie/i.test(text),
  };
});
await page.screenshot({ path: shot.replace(/\.png$/, "-play.png"), fullPage: false });

await page.fill("#projAnswer", "I will use legs 3 and 4 because they form a 3-4-5 Pythagorean triple on grid paper.");
await page.click("#projSubmitStep");
await page.waitForTimeout(200);
const graded = await page.evaluate(() => ({
  pass: /看起来不错|Looks good/i.test(document.body.innerText),
  feedback: !!document.querySelector(".prac-feedback.ok"),
}));

await page.setViewportSize({ width: 390, height: 844 });
await page.goto(`${base}/#/course/3ea5b7d5-d475-4c4f-84bf-9834e24a35c2/project/${stageId}`, {
  waitUntil: "networkidle",
});
await page.waitForSelector(".proj-page", { timeout: 10000 });
await page.waitForTimeout(300);
const mobile = await page.evaluate(() => {
  const text = document.body.innerText;
  return {
    leftover: document.querySelector(".proj-page")?.dataset.projLeftover === "1",
    title: /Constructing the Area Model/i.test(text),
    mark: /Hyperknow|Orbie/i.test(text),
    w: window.innerWidth,
  };
});
await page.screenshot({ path: shot.replace(/\.png$/, "-mobile.png"), fullPage: false });

await page.setViewportSize({ width: 1280, height: 800 });
await page.goto(`${base}/#/course/regression/project/4f6e3324-1b05-4636-90f2-53cdc5b0ceef`, {
  waitUntil: "networkidle",
});
await page.waitForSelector(".proj-page", { timeout: 10000 });
await page.waitForTimeout(250);
const pulse = await page.evaluate(() => {
  const text = document.body.innerText;
  return {
    leftover: document.querySelector(".proj-page")?.dataset.projLeftover === "1",
    title: /Visualizing the Baseline/i.test(text),
    mark: /Hyperknow|Orbie/i.test(text),
  };
});
await page.screenshot({ path: shot.replace(/\.png$/, "-pulse.png"), fullPage: false });
await browser.close();

const report = { intro, play, graded, mobile, pulse, errors, shot };
console.log(JSON.stringify(report, null, 2));
writeFileSync(shot.replace(/\.png$/, ".json"), JSON.stringify(report, null, 2));

if (errors.length) {
  console.error("PAGE_ERRORS", errors);
  process.exit(1);
}
if (!intro.leftover || !intro.title || !intro.step || !intro.next || intro.mark) {
  console.error("PROJ_INTRO_FAIL", intro);
  process.exit(1);
}
if (!play.need || !play.prompt || !play.area || !play.submit || !play.index || play.mark) {
  console.error("PROJ_PLAY_FAIL", play);
  process.exit(1);
}
if (!graded.pass || !graded.feedback) {
  console.error("PROJ_GRADE_FAIL", graded);
  process.exit(1);
}
if (!mobile.leftover || !mobile.title || mobile.mark || mobile.w > 420) {
  console.error("PROJ_MOBILE_FAIL", mobile);
  process.exit(1);
}
if (!pulse.leftover || !pulse.title || pulse.mark) {
  console.error("PROJ_PULSE_FAIL", pulse);
  process.exit(1);
}
