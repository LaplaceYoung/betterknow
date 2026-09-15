import { chromium } from "playwright";
import { writeFileSync } from "node:fs";

const origin = process.env.ANYKNOW_URL || "http://127.0.0.1:4173";
const base = origin.replace(/\/$/, "");
const shot = process.env.SHOT || "media.png";
const errors = [];
const sid = "d62f9bbb-2902-49e5-b415-816a31207dda";

const browser = await chromium.launch({
  headless: true,
  channel: process.env.PW_CHANNEL || "chrome",
});
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
await page.addInitScript(() => {
  localStorage.setItem("ttsVoiceMode", "text");
});
page.on("pageerror", (e) => errors.push(String(e)));
page.on("console", (msg) => {
  if (msg.type() === "error") errors.push(msg.text());
});

async function openPracticeAnim() {
  await page.goto(`${base}/#/course/pythagorean/practice/${sid}`, { waitUntil: "networkidle", timeout: 30000 });
  await page.waitForSelector(".prac-page", { timeout: 15000 });
  if (await page.locator("#pracStart").count()) {
    await page.locator("#pracStart").click({ force: true });
    await page.waitForTimeout(200);
  }
  for (let i = 0; i < 8 && !(await page.locator(".anim-stage").count()); i++) {
    if (await page.locator("#pracSkip").count()) {
      await page.locator("#pracSkip").click({ force: true });
    } else if (await page.locator("#pracNext").count()) {
      await page.locator("#pracNext").click({ force: true });
    } else {
      break;
    }
    await page.waitForTimeout(120);
  }
  await page.waitForSelector(".anim-stage", { timeout: 8000 });
}

await openPracticeAnim();
const practice = await page.evaluate(() => {
  const text = document.body.innerText;
  return {
    kicker: /互动|Interactive/.test(text),
    stage: !!document.querySelector(".anim-stage"),
    scene: document.querySelector("[data-anim-scene]")?.dataset.animScene || "",
    speak: !!document.querySelector("#pracSpeak"),
    mark: /Hyperknow|Orbie/i.test(text),
  };
});
await page.screenshot({ path: shot.replace(/\.png$/, "-practice.png"), fullPage: false });

await page.goto(`${base}/#/course/pythagorean/exam/unit1`, { waitUntil: "networkidle", timeout: 30000 });
await page.waitForSelector(".exam-page", { timeout: 15000 });
await page.click("#examStart");
await page.waitForTimeout(200);
for (let i = 0; i < 15; i++) {
  if (!(await page.locator("#examNext").count())) break;
  await page.locator("#examNext").click({ force: true });
  await page.waitForTimeout(80);
}
await page.waitForSelector(".anim-stage", { timeout: 8000 });
const exam = await page.evaluate(() => {
  const text = document.body.innerText;
  return {
    kicker: /互动|Interactive/.test(text),
    stage: !!document.querySelector(".anim-stage"),
    scene: document.querySelector("[data-anim-scene]")?.dataset.animScene || "",
    speak: !!document.querySelector("#examSpeak"),
    submit: !!document.querySelector("#examSubmit"),
    mark: /Hyperknow|Orbie/i.test(text),
  };
});
await page.screenshot({ path: shot, fullPage: false });

await page.goto(`${base}/#/whiteboard/pythagorean`, { waitUntil: "networkidle", timeout: 30000 });
await page.waitForSelector(".wb-session", { timeout: 15000 });
await page.waitForTimeout(400);
const board = await page.evaluate(() => {
  const text = document.body.innerText;
  return {
    animation: text.includes("互动动画") || /Interactive animation/i.test(text),
    frame: !!document.querySelector('[data-wb-kind="animation"] .anim-frame svg'),
    mark: /Hyperknow|Orbie/i.test(text),
  };
});
await page.screenshot({ path: shot.replace(/\.png$/, "-board.png"), fullPage: false });

await page.goto(`${base}/#/whiteboard/regression`, { waitUntil: "networkidle" });
await page.waitForSelector(".wb-session", { timeout: 10000 });
await page.waitForTimeout(300);
const image = await page.evaluate(() => {
  const text = document.body.innerText;
  return {
    label: text.includes("配图") || /Illustration/i.test(text),
    frame: !!document.querySelector('[data-wb-kind="image"] .anim-frame svg'),
    caption: /Study Hours/i.test(text),
    mark: /Hyperknow|Orbie/i.test(text),
  };
});

await page.setViewportSize({ width: 390, height: 844 });
await openPracticeAnim();
const mobile = await page.evaluate(() => ({
  stage: !!document.querySelector(".anim-stage"),
  w: window.innerWidth,
  mark: /Hyperknow|Orbie/i.test(document.body.innerText),
}));
await page.screenshot({ path: shot.replace(/\.png$/, "-mobile.png"), fullPage: false });
await browser.close();

const report = { practice, exam, board, image, mobile, errors, shot };
console.log(JSON.stringify(report, null, 2));
writeFileSync(shot.replace(/\.png$/, ".json"), JSON.stringify(report, null, 2));

if (errors.length) {
  console.error("PAGE_ERRORS", errors);
  process.exit(1);
}
if (!practice.stage || !practice.kicker || !practice.speak || practice.mark) {
  console.error("MEDIA_PRAC_FAIL", practice);
  process.exit(1);
}
if (!exam.stage || !exam.kicker || !exam.speak || !exam.submit || exam.mark) {
  console.error("MEDIA_EXAM_FAIL", exam);
  process.exit(1);
}
if (!board.animation || !board.frame || board.mark) {
  console.error("MEDIA_BOARD_FAIL", board);
  process.exit(1);
}
if (!image.label || !image.frame || !image.caption || image.mark) {
  console.error("MEDIA_IMAGE_FAIL", image);
  process.exit(1);
}
if (!mobile.stage || mobile.w > 420 || mobile.mark) {
  console.error("MEDIA_MOBILE_FAIL", mobile);
  process.exit(1);
}
