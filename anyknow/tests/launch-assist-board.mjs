import { chromium } from "playwright";
import { writeFileSync } from "node:fs";

const origin = process.env.ANYKNOW_URL || "http://127.0.0.1:4173";
const base = origin.replace(/\/$/, "");
const shot = process.env.SHOT || "assist-board.png";
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
await page.click("#assistToolsBtn");
await page.waitForTimeout(150);
await page.click('[data-assist-tool="board"]');
await page.waitForTimeout(150);
await page.fill("#prompt", "微积分");
await page.click("#send");
await page.waitForSelector(".wb-session", { timeout: 20000 });
await page.waitForTimeout(400);

const desktop = await page.evaluate(() => {
  const text = document.body.innerText;
  const hash = location.hash || "";
  return {
    leftoverDump: /248fd02f72be4bad82bcdd347b8bf237/.test(hash) || /Geometric Heart/i.test(text),
    crafted: /#\/whiteboard\/wb_/.test(hash),
    kb: /公开教材|微积分|limit|derivative|calculus|fundamental/i.test(text),
    mark: /Hyperknow|Orbie/i.test(text),
    hash,
  };
});
await page.screenshot({ path: shot, fullPage: false });

if (await page.locator("#voiceModeGo").count()) {
  await page.click('[data-voice-mode="text"]').catch(() => {});
  await page.click("#voiceModeGo");
  await page.waitForTimeout(250);
}
const hashBefore = await page.evaluate(() => location.hash);
await page.fill("#wbDraft", "导数的定义是什么");
await page.click("#wbSend");
await page.waitForTimeout(800);
const follow = await page.evaluate((before) => {
  const text = document.body.innerText;
  return {
    sameId: location.hash === before,
    leftoverDump: /248fd02f72be4bad82bcdd347b8bf237/.test(location.hash) || /Geometric Heart/i.test(text),
    userQ: /导数的定义是什么/.test(text),
    grounded: /公开教材|derivative|limit|calculus|fundamental/i.test(text),
    mark: /Hyperknow|Orbie/i.test(text),
    hash: location.hash,
  };
}, hashBefore);
await page.screenshot({ path: shot.replace(/\.png$/, "-follow.png"), fullPage: false });

await page.setViewportSize({ width: 390, height: 844 });
await page.waitForTimeout(250);
const mobile = await page.evaluate(() => ({
  leftoverDump: /Geometric Heart/i.test(document.body.innerText),
  kb: /公开教材|微积分|limit|derivative|calculus|fundamental/i.test(document.body.innerText),
  w: window.innerWidth,
  mark: /Hyperknow|Orbie/i.test(document.body.innerText),
}));
await page.screenshot({ path: shot.replace(/\.png$/, "-mobile.png"), fullPage: false });
await browser.close();

const report = { desktop, follow, mobile, errors, shot };
console.log(JSON.stringify(report, null, 2));
writeFileSync(shot.replace(/\.png$/, ".json"), JSON.stringify(report, null, 2));

if (errors.length) {
  console.error("PAGE_ERRORS", errors);
  process.exit(1);
}
if (desktop.leftoverDump || desktop.mark || !desktop.crafted || !desktop.kb) {
  console.error("ASSIST_BOARD_FAIL", desktop);
  process.exit(1);
}
if (!follow.sameId || follow.leftoverDump || !follow.userQ || !follow.grounded || follow.mark) {
  console.error("ASSIST_BOARD_FOLLOW_FAIL", follow);
  process.exit(1);
}
if (mobile.leftoverDump || mobile.mark || !mobile.kb || mobile.w > 420) {
  console.error("ASSIST_BOARD_MOBILE_FAIL", mobile);
  process.exit(1);
}
