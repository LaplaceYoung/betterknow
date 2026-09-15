import { chromium } from "playwright";
import { writeFileSync } from "node:fs";

const origin = process.env.ANYKNOW_URL || "http://127.0.0.1:4173";
const base = origin.replace(/\/$/, "");
const shot = process.env.SHOT || "assist-check.png";
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

await page.goto(`${base}/`, { waitUntil: "networkidle", timeout: 30000 });
await page.waitForSelector("h1", { timeout: 15000 });
await page.click('button[data-mode="assist"]');
await page.waitForTimeout(200);
await page.click('[data-assist-chip="pack"]');
await page.waitForTimeout(150);
await page.fill("#prompt", "帮我做一张两页速查表：微积分");
await page.click("#send");
await page.waitForSelector("[data-resp-quiz]", { timeout: 25000 });
await page.waitForTimeout(300);

const packed = await page.evaluate(() => {
  const text = document.body.innerText;
  return {
    hash: location.hash,
    quiz: !!document.querySelector("[data-resp-quiz]"),
    cards: !!document.querySelector("[data-resp-cards]"),
    cheat: !!document.querySelector("[data-open-cheat]"),
    opt: !!document.querySelector("[data-resp-opt]"),
    based: /4-10|2-2|3-1|5-3|limit|derivative|antiderivative|calculus/i.test(text),
    leftover: /248fd02f72be4bad82bcdd347b8bf237/.test(location.hash),
    mark: /Hyperknow|Orbie/i.test(text),
  };
});
await page.screenshot({ path: shot, fullPage: false });

await page.click("[data-resp-opt]");
await page.waitForTimeout(200);
const graded = await page.evaluate(() => ({
  feedback: !!document.querySelector("[data-resp-quiz] .prac-feedback"),
  explanation: /根据《/.test(document.body.innerText),
}));

if (await page.$("#respFlipCard")) {
  await page.click("#respFlipCard");
  await page.waitForTimeout(150);
}
const flipped = await page.evaluate(() => !!document.querySelector("#respFlipCard.flipped"));

await page.click("[data-open-cheat]");
await page.waitForSelector("[data-cheat-spread], .cheat-sheet", { timeout: 15000 });
await page.waitForTimeout(250);
const spread = await page.evaluate(() => ({
  hash: location.hash,
  pages: document.querySelectorAll("[data-cheat-page]").length,
  pdf: !!document.querySelector("#cheatPdf"),
  mark: /Hyperknow|Orbie/i.test(document.body.innerText),
}));
await page.screenshot({ path: shot.replace(/\.png$/, "-spread.png"), fullPage: false });

await page.goto(`${base}/`, { waitUntil: "networkidle", timeout: 30000 });
await page.click('button[data-mode="assist"]');
await page.waitForTimeout(200);
await page.click('[data-assist-chip="explain"]');
await page.waitForTimeout(150);
await page.fill("#prompt", "用粉笔把这个概念讲清楚：微积分");
await page.click("#send");
await page.waitForSelector("[data-study-ask]", { timeout: 20000 });
await page.click('[data-study-opt="level"][data-study-val="入门"]');
await page.waitForTimeout(80);
await page.click('[data-study-opt="style"][data-study-val="直觉图像"]');
await page.waitForTimeout(80);
await page.click('[data-study-opt="focus"][data-study-val="核心定义"]');
await page.waitForSelector("[data-content-board]", { timeout: 25000 });
if (await page.locator('[data-study-val="继续"]').count()) {
  await page.click('[data-study-val="继续"]');
  await page.waitForTimeout(600);
}
if (await page.locator('[data-study-val="继续"]').count()) {
  await page.click('[data-study-val="继续"]');
}
await page.waitForFunction(
  () => document.querySelector("[data-resp-quiz]") || document.querySelector("[data-next-rail]"),
  { timeout: 25000 },
);
await page.waitForTimeout(250);
const taught = await page.evaluate(() => {
  const text = document.body.innerText;
  return {
    hash: location.hash,
    encyclopedia: !!document.querySelector("[data-content-board]"),
    quiz: !!document.querySelector("[data-resp-quiz]") || !!document.querySelector("[data-next-rail]"),
    cards: !!document.querySelector("[data-resp-cards]") || !!document.querySelector("[data-next-step]"),
    leftover: /248fd02f72be4bad82bcdd347b8bf237/.test(location.hash),
    mark: /Hyperknow|Orbie/i.test(text),
  };
});
await page.screenshot({ path: shot.replace(/\.png$/, "-teach.png"), fullPage: false });

await page.setViewportSize({ width: 390, height: 844 });
await page.waitForTimeout(200);
const mobile = await page.evaluate(() => ({
  quiz: !!document.querySelector("[data-resp-quiz]"),
  w: window.innerWidth,
  mark: /Hyperknow|Orbie/i.test(document.body.innerText),
}));
await page.screenshot({ path: shot.replace(/\.png$/, "-mobile.png"), fullPage: false });
await browser.close();

const report = { packed, graded, flipped, spread, taught, mobile, errors, shot };
console.log(JSON.stringify(report, null, 2));
writeFileSync(shot.replace(/\.png$/, ".json"), JSON.stringify(report, null, 2));

if (errors.length) {
  console.error("PAGE_ERRORS", errors);
  process.exit(1);
}
if (
  !packed.hash.includes("/response/conv_") ||
  packed.leftover ||
  !packed.quiz ||
  !packed.cards ||
  !packed.cheat ||
  !packed.opt ||
  !packed.based ||
  packed.mark
) {
  console.error("ASSIST_CHECK_PACK_FAIL", packed);
  process.exit(1);
}
if (!graded.feedback || !graded.explanation) {
  console.error("ASSIST_CHECK_GRADE_FAIL", graded);
  process.exit(1);
}
if (!spread.hash.includes("/materials") || spread.pages !== 2 || !spread.pdf || spread.mark) {
  console.error("ASSIST_CHECK_SPREAD_FAIL", spread);
  process.exit(1);
}
if (
  !taught.hash.includes("/response/conv_") ||
  taught.leftover ||
  !taught.encyclopedia ||
  !taught.quiz ||
  !taught.cards ||
  taught.mark
) {
  console.error("ASSIST_CHECK_TEACH_FAIL", taught);
  process.exit(1);
}
if (!mobile.quiz || mobile.mark || mobile.w > 420) {
  console.error("ASSIST_CHECK_MOBILE_FAIL", mobile);
  process.exit(1);
}
