import { chromium } from "playwright";
import { writeFileSync } from "node:fs";

const origin = process.env.ANYKNOW_URL || "http://127.0.0.1:4173";
const base = origin.replace(/\/$/, "");
const shot = process.env.SHOT || "learn-intro.png";
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

await page.goto(`${base}/#/course/mkt-sociology/sessions/whiteboard/soc-imagination`, {
  waitUntil: "networkidle",
  timeout: 30000,
});
await page.waitForSelector("#learnStart", { timeout: 15000 });

const intro = await page.evaluate(() => {
  const text = document.body.innerText;
  const art = document.querySelector("img.learn-intro-art");
  return {
    text: text.slice(0, 800),
    eyebrow: text.includes("本节学习内容"),
    start: text.includes("开始学习"),
    title: text.includes("社会学想象力"),
    mastered: text.includes("标记为已掌握"),
    overlay: !!document.querySelector(".learn-intro-overlay"),
    artSrc: art?.getAttribute("src") || "",
    artW: art?.naturalWidth || 0,
    h1Font: getComputedStyle(document.querySelector("h2") || document.querySelector("h1")).fontFamily,
  };
});

await page.screenshot({ path: shot, fullPage: false });
await page.click("#learnStart");
await page.waitForSelector("#completeLearn", { timeout: 10000 });
await page.waitForTimeout(200);

const play = await page.evaluate(() => {
  const text = document.body.innerText;
  return {
    overlay: !!document.querySelector(".learn-intro-overlay"),
    start: !!document.querySelector("#learnStart"),
    mastered: text.includes("标记为已掌握"),
    eyebrow: text.includes("本节学习内容"),
    title: text.includes("社会学想象力"),
    outline: text.includes("学习节大纲"),
    outlineBody: text.includes("社会学想象力") && text.includes("个人困扰"),
    outlinePanel: !!document.querySelector(".learn-outline"),
    outlineArt: document.querySelector(".learn-outline-art")?.naturalWidth || 0,
    crumbs: document.querySelector(".learn-crumbs")?.textContent || "",
    crumbSep: !!document.querySelector(".learn-crumb-sep"),
    refsTitle: text.includes("参考资料"),
    refsEmpty: text.includes("此学习节暂无参考资料"),
    refsItem: text.includes("Mills") || text.includes("Sociological Imagination"),
    refsPanel: !!document.querySelector(".learn-refs"),
    refsArt: document.querySelector(".learn-refs-art")?.naturalWidth || 0,
    practice: !!document.querySelector(".learn-practice-start"),
    practiceLabel: text.includes("练习") && text.includes("开始"),
    keypoints: !!document.querySelector(".learn-keypoints"),
    syllabusTab: !!document.querySelector('[data-learn-tab="syllabus"]'),
    artifactsTab: !!document.querySelector('[data-learn-tab="artifacts"]'),
    notes: document.querySelectorAll(".learn-note").length,
    noteKind: document.body.innerText.includes("笔记"),
    quiz: !!document.querySelector(".learn-quiz"),
    quizKind: document.body.innerText.includes("测验"),
    quizLeak: document.body.innerText.includes("线性回归"),
    illustration: !!document.querySelector(".learn-illustration"),
    illustrationKind: text.includes("插图") || text.includes("Illustration"),
    illustrationArt: document.querySelector(".learn-illustration-art")?.naturalWidth || 0,
    illustrationCaption: text.includes("传记与历史交叠") || /biography overlapping/i.test(text),
    illustrationTape: document.querySelector(".learn-illustration-tape")?.naturalWidth || 0,
  };
});

await page.screenshot({ path: shot.replace(/\.png$/, "-play.png"), fullPage: false });
await page.click("#learnIllustrationOpen");
await page.waitForSelector("#learnIllustrationZoom", { timeout: 5000 });
await page.waitForTimeout(150);
const zoomed = await page.evaluate(() => ({
  open: !!document.querySelector(".learn-illustration-zoom"),
  cap: document.body.innerText.includes("传记与历史交叠") || /biography overlapping/i.test(document.body.innerText),
}));
await page.screenshot({ path: shot.replace(/\.png$/, "-illustration.png"), fullPage: false });
await page.click("#learnIllustrationClose");
await page.waitForTimeout(150);
const zoomClosed = await page.evaluate(() => !!document.querySelector(".learn-illustration-zoom"));
await page.click("#learnOutlineToggle");
await page.waitForTimeout(200);
const tracker = await page.evaluate(() => ({
  shown: !!document.querySelector(".learn-tracker"),
  label: document.body.innerText.includes("课堂要点") || document.body.innerText.includes("Class Keypoints"),
  stops: document.querySelectorAll(".learn-tracker-stop").length,
  current: document.querySelectorAll(".learn-tracker-stop.current").length,
}));
await page.screenshot({ path: shot.replace(/\.png$/, "-tracker.png"), fullPage: false });
await page.click("#learnOutlineToggle");
await page.waitForTimeout(150);
await page.click('[data-learn-tab="artifacts"]');
await page.waitForTimeout(200);
const artifacts = await page.evaluate(() => ({
  on: document.querySelector('[data-learn-tab="artifacts"]')?.classList.contains("on"),
  empty: document.body.innerText.includes("暂无内容") || document.body.innerText.includes("Nothing here yet"),
  list: document.querySelectorAll(".learn-artifacts-empty, .learn-ref-item").length > 0,
  illustrationKind: document.body.innerText.includes("插图") || document.body.innerText.includes("Illustration"),
}));
await page.screenshot({ path: shot.replace(/\.png$/, "-artifacts.png"), fullPage: false });
await page.click('[data-learn-tab="syllabus"]');
await page.waitForTimeout(150);
await page.click(".learn-practice-start");
await page.waitForTimeout(400);
const afterStart = await page.evaluate(() => ({
  hash: location.hash,
  practiceIntro: document.body.innerText.includes("知道了") || document.body.innerText.includes("Got it"),
  modal: !!document.querySelector(".modal"),
}));
await page.goto(`${base}/#/course/mkt-sociology/sessions/whiteboard/soc-imagination`, {
  waitUntil: "networkidle",
});
await page.setViewportSize({ width: 390, height: 844 });
await page.reload({ waitUntil: "networkidle" });
await page.waitForSelector("#learnStart, #completeLearn", { timeout: 10000 });
await page.waitForTimeout(200);
const mobile = await page.evaluate(() => ({
  overlay: !!document.querySelector(".learn-intro-overlay"),
  start: !!document.querySelector("#learnStart"),
  w: window.innerWidth,
}));
await page.screenshot({ path: shot.replace(/\.png$/, "-mobile.png"), fullPage: false });
await browser.close();

const report = { intro, play, zoomed, zoomClosed, tracker, artifacts, afterStart, mobile, errors, shot };
console.log(JSON.stringify(report, null, 2));
writeFileSync(shot.replace(/\.png$/, ".json"), JSON.stringify(report, null, 2));

if (errors.length) {
  console.error("PAGE_ERRORS", errors);
  process.exit(1);
}
if (!intro.eyebrow || !intro.start || !intro.title || !intro.overlay || intro.mastered) {
  console.error("LEARN_INTRO_FAIL", intro);
  process.exit(1);
}
if (!/learn-intro/.test(intro.artSrc) || intro.artW < 1) {
  console.error("LEARN_INTRO_ART_FAIL", intro);
  process.exit(1);
}
if (!/ZCOOL XiaoWei|Kalam/i.test(intro.h1Font)) {
  console.error("LEARN_INTRO_FONT_FAIL", intro.h1Font);
  process.exit(1);
}
if (play.overlay || play.start || !play.mastered || !play.title) {
  console.error("LEARN_PLAY_FAIL", play);
  process.exit(1);
}
if (!play.outline || !play.outlinePanel || play.outlineArt < 1) {
  console.error("LEARN_OUTLINE_FAIL", play);
  process.exit(1);
}
if (!play.crumbSep || !/›/.test(play.crumbs)) {
  console.error("LEARN_CRUMB_FAIL", play);
  process.exit(1);
}
if (!play.refsTitle || !play.refsPanel || play.refsArt < 1) {
  console.error("LEARN_REFS_FAIL", play);
  process.exit(1);
}
if (!play.practice || !play.practiceLabel) {
  console.error("LEARN_PRACTICE_FAIL", play);
  process.exit(1);
}
if (!play.syllabusTab || !play.artifactsTab) {
  console.error("LEARN_TABS_FAIL", play);
  process.exit(1);
}
if (play.notes < 1 || !play.noteKind) {
  console.error("LEARN_NOTES_FAIL", play);
  process.exit(1);
}
if (play.quiz && !play.quizKind) {
  console.error("LEARN_QUIZ_FAIL", play);
  process.exit(1);
}
if (play.quizLeak) {
  console.error("LEARN_QUIZ_LEAK", play);
  process.exit(1);
}
if (!play.illustration || !play.illustrationKind || play.illustrationArt < 1 || !play.illustrationCaption) {
  console.error("LEARN_ILLUSTRATION_FAIL", play);
  process.exit(1);
}
if (!zoomed.open || !zoomed.cap || zoomClosed) {
  console.error("LEARN_ILLUSTRATION_ZOOM_FAIL", { zoomed, zoomClosed });
  process.exit(1);
}
if (!tracker.shown || !tracker.label || tracker.stops < 1 || tracker.current < 1) {
  console.error("LEARN_TRACKER_FAIL", tracker);
  process.exit(1);
}
if (!artifacts.on || (!artifacts.empty && !artifacts.list) || !artifacts.illustrationKind) {
  console.error("LEARN_ARTIFACTS_FAIL", artifacts);
  process.exit(1);
}
if (!afterStart.practiceIntro && !afterStart.hash.includes("/practice/") && !afterStart.modal) {
  console.error("LEARN_PRACTICE_NAV_FAIL", afterStart);
  process.exit(1);
}
if (!mobile.overlay || !mobile.start || mobile.w > 420) {
  console.error("LEARN_MOBILE_FAIL", mobile);
  process.exit(1);
}
