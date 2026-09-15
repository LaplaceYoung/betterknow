import { chromium } from "playwright";
import { writeFileSync } from "node:fs";

const origin = process.env.ANYKNOW_URL || "http://127.0.0.1:4173";
const base = origin.replace(/\/$/, "");
const shot = process.env.SHOT || "craft-blueprint.png";
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
await page.click('button[data-mode="craft"]');
await page.waitForTimeout(150);
await page.fill("#prompt", "微积分");
await page.click("#send");
await page.waitForSelector("[data-study-ask]", { timeout: 20000 });
await page.waitForTimeout(250);

const paused = await page.evaluate(() => {
  const text = document.body.innerText;
  return {
    response: /#\/response\/conv_/.test(location.hash),
    leftover: /Linear Regression|Geometric Anchor/i.test(text),
    prereq: !!document.querySelector('[data-study-opt="prereq"][data-study-val="零基础"]'),
    scale: !!document.querySelector('[data-study-opt="scale"][data-study-val="一门课"]'),
    mark: /Hyperknow|Orbie/i.test(text),
  };
});
await page.screenshot({ path: shot, fullPage: false });

await page.click('[data-study-opt="prereq"][data-study-val="零基础"]');
await page.waitForTimeout(80);
await page.click('[data-study-opt="emphasis"][data-study-val="直觉图像"]');
await page.waitForTimeout(80);
await page.click('[data-study-opt="goal"][data-study-val="过关"]');
await page.waitForTimeout(80);
await page.click('[data-study-opt="scale"][data-study-val="一门课"]');
await page.waitForSelector(".blueprint-page, .bp-map", { timeout: 20000 });
await page.waitForTimeout(400);

const drafted = await page.evaluate(() => {
  const text = document.body.innerText;
  return {
    blueprint: /#\/blueprint|#\/dev\/csm/.test(location.hash),
    leftover: /Linear Regression|Geometric Anchor/i.test(text),
    foundations: /Foundations|Application/.test(text),
    topic: /微积分/.test(text),
    confirm: !!document.querySelector("#bpConfirm"),
    mark: /Hyperknow|Orbie/i.test(text),
    hash: location.hash,
  };
});
await page.screenshot({ path: shot.replace(/\.png$/, "-tree.png"), fullPage: false });

await page.click("#bpConfirm");
await page.waitForFunction(() => /#\/course\//.test(location.hash), { timeout: 15000 });
await page.waitForTimeout(300);
const committed = await page.evaluate(() => ({
  course: /#\/course\//.test(location.hash),
  leftover: /Linear Regression|Geometric Anchor/i.test(document.body.innerText),
  topic: /微积分/.test(document.body.innerText),
  mark: /Hyperknow|Orbie/i.test(document.body.innerText),
}));
await page.screenshot({ path: shot.replace(/\.png$/, "-course.png"), fullPage: false });

await page.setViewportSize({ width: 390, height: 844 });
await page.waitForTimeout(200);
const mobile = await page.evaluate(() => ({
  course: /#\/course\//.test(location.hash),
  w: window.innerWidth,
  mark: /Hyperknow|Orbie/i.test(document.body.innerText),
}));
await page.screenshot({ path: shot.replace(/\.png$/, "-mobile.png"), fullPage: false });
await browser.close();

const report = { paused, drafted, committed, mobile, errors, shot };
console.log(JSON.stringify(report, null, 2));
writeFileSync(shot.replace(/\.png$/, ".json"), JSON.stringify(report, null, 2));

if (errors.length) {
  console.error("PAGE_ERRORS", errors);
  process.exit(1);
}
if (!paused.response || paused.leftover || !paused.prereq || !paused.scale || paused.mark) {
  console.error("CRAFT_PAUSE_FAIL", paused);
  process.exit(1);
}
if (!drafted.blueprint || drafted.leftover || drafted.foundations || !drafted.topic || !drafted.confirm || drafted.mark) {
  console.error("CRAFT_TREE_FAIL", drafted);
  process.exit(1);
}
if (!committed.course || committed.leftover || !committed.topic || committed.mark) {
  console.error("CRAFT_COMMIT_FAIL", committed);
  process.exit(1);
}
if (!mobile.course || mobile.mark || mobile.w > 420) {
  console.error("CRAFT_MOBILE_FAIL", mobile);
  process.exit(1);
}
