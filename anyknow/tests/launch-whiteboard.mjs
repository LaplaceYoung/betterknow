import { chromium } from "playwright";
import { writeFileSync } from "node:fs";

const origin = process.env.ANYKNOW_URL || "http://127.0.0.1:4173";
const base = origin.replace(/\/$/, "");
const shot = process.env.SHOT || "whiteboard.png";
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

await page.goto(`${base}/#/whiteboard/pythagorean`, { waitUntil: "networkidle", timeout: 30000 });
await page.waitForSelector(".wb-session", { timeout: 15000 });
await page.waitForTimeout(700);
if (await page.locator("#voiceModeZoom").count()) {
  await page.click('[data-voice-mode="text"]');
  await page.click("#voiceModeGo");
  await page.waitForTimeout(250);
}
const live = await page.evaluate(() => {
  const text = document.body.innerText;
  const art = document.querySelector(".wb-session .pdf-page-art");
  return {
    title: /Pythagorean/i.test(text),
    formula: /a\^2 \+ b\^2 = c\^2|a² \+ b² = c²/.test(text),
    heart: /Geometric Heart/i.test(text),
    pause: text.includes("暂停") || /\bPause\b/.test(text),
    mark: /Hyperknow|Orbie/i.test(text),
    artW: art?.naturalWidth || 0,
    h1Font: getComputedStyle(document.querySelector("h1")).fontFamily,
    stored: localStorage.getItem("whiteboard_session_id"),
  };
});
await page.screenshot({ path: shot, fullPage: false });

await page.click("#wbPause");
await page.waitForTimeout(200);
const paused = await page.evaluate(() => ({
  resume: document.body.innerText.includes("继续") || /Resume/i.test(document.body.innerText),
  pausedClass: document.querySelector(".wb-split")?.classList.contains("paused"),
}));
await page.screenshot({ path: shot.replace(/\.png$/, "-paused.png"), fullPage: false });

await page.goto(`${base}/#/whiteboard/missing-id`, { waitUntil: "networkidle" });
await page.waitForSelector(".wb-session", { timeout: 10000 });
await page.waitForTimeout(250);
const restarted = await page.evaluate(() => ({
  notice: document.body.innerText.includes("旧会话不可用") || /no longer available/i.test(document.body.innerText),
}));
await page.screenshot({ path: shot.replace(/\.png$/, "-restarted.png"), fullPage: false });

await page.goto(`${base}/#/whiteboard/pythagorean-resume`, { waitUntil: "networkidle" });
await page.waitForSelector(".wb-session", { timeout: 10000 });
await page.waitForTimeout(250);
const resumed = await page.evaluate(() => ({
  notice: document.body.innerText.includes("已恢复对话") || /Resumed conversation/i.test(document.body.innerText),
}));
await page.screenshot({ path: shot.replace(/\.png$/, "-resumed.png"), fullPage: false });

await page.goto(`${base}/#/whiteboard/regression`, { waitUntil: "networkidle" });
await page.waitForSelector(".wb-session", { timeout: 10000 });
await page.waitForTimeout(400);
const regression = await page.evaluate(() => {
  const text = document.body.innerText;
  return {
    title: /Scatterplots and Correlation/i.test(text),
    anchor: /Geometric Anchor/i.test(text),
    circle: text.includes("圈注") || /\bCircle\b/.test(text),
    speak: /bivariate plane|cloud of points/i.test(text),
    mark: /Hyperknow|Orbie/i.test(text),
  };
});
await page.screenshot({ path: shot.replace(/\.png$/, "-regression.png"), fullPage: false });

await page.goto(`${base}/#/course/mkt-sociology/sessions/whiteboard/soc-imagination`, {
  waitUntil: "networkidle",
});
await page.waitForTimeout(400);
const learnStill = await page.evaluate(() => ({
  dump: !!document.querySelector(".wb-session"),
  learn: !!document.querySelector(".learn-intro-overlay, .learn-play, .learn-picker"),
}));

await page.setViewportSize({ width: 390, height: 844 });
await page.goto(`${base}/#/whiteboard/pythagorean`, { waitUntil: "networkidle" });
await page.waitForSelector(".wb-session", { timeout: 10000 });
await page.waitForTimeout(400);
const mobile = await page.evaluate(() => ({
  w: window.innerWidth,
  page: !!document.querySelector(".wb-session"),
  formula: /a² \+ b² = c²|a\^2 \+ b\^2 = c\^2/.test(document.body.innerText),
}));
await page.screenshot({ path: shot.replace(/\.png$/, "-mobile.png"), fullPage: false });
await browser.close();

const report = { live, paused, restarted, resumed, regression, learnStill, mobile, errors, shot };
console.log(JSON.stringify(report, null, 2));
writeFileSync(shot.replace(/\.png$/, ".json"), JSON.stringify(report, null, 2));

if (errors.length) {
  console.error("PAGE_ERRORS", errors);
  process.exit(1);
}
if (!live.title || !live.formula || !live.pause || live.mark || live.artW < 1) {
  console.error("WB_LIVE_FAIL", live);
  process.exit(1);
}
if (!/ZCOOL XiaoWei|Kalam/i.test(live.h1Font)) {
  console.error("WB_FONT_FAIL", live.h1Font);
  process.exit(1);
}
if (!live.stored) {
  console.error("WB_STORAGE_FAIL", live);
  process.exit(1);
}
if (!paused.resume || !paused.pausedClass) {
  console.error("WB_PAUSE_FAIL", paused);
  process.exit(1);
}
if (!restarted.notice) {
  console.error("WB_RESTART_FAIL", restarted);
  process.exit(1);
}
if (!resumed.notice) {
  console.error("WB_RESUME_FAIL", resumed);
  process.exit(1);
}
if (!regression.title || !regression.anchor || !regression.speak || regression.mark) {
  console.error("WB_REGRESSION_FAIL", regression);
  process.exit(1);
}
if (learnStill.dump || !learnStill.learn) {
  console.error("WB_LEARN_REGRESS", learnStill);
  process.exit(1);
}
if (!mobile.page || mobile.w > 420 || !mobile.formula) {
  console.error("WB_MOBILE_FAIL", mobile);
  process.exit(1);
}
