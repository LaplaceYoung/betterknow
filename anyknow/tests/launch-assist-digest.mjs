import { chromium } from "playwright";
import { writeFileSync } from "node:fs";

const origin = process.env.ANYKNOW_URL || "http://127.0.0.1:4173";
const base = origin.replace(/\/$/, "");
const shot = process.env.SHOT || "assist-digest.png";
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
await page.click('[data-assist-chip="digest"]');
await page.waitForTimeout(150);
await page.fill("#prompt", "帮我消化这份长材料：微积分");
await page.click("#send");
await page.waitForSelector("[data-study-ask]", { timeout: 20000 });
await page.waitForTimeout(250);

const paused = await page.evaluate(() => {
  const text = document.body.innerText;
  return {
    ask: !!document.querySelector('[data-study-opt="mode"][data-study-val="精读"]'),
    modes: ["精读", "详述", "导读"].every((m) => text.includes(m)),
    board: !!document.querySelector("[data-digest-board]"),
    leftoverPdf: /pdf-session|248fd02f72be4bad82bcdd347b8bf237/i.test(text + location.hash),
    mark: /Hyperknow|Orbie/i.test(text),
    hash: location.hash,
  };
});
await page.screenshot({ path: shot, fullPage: false });

await page.click('[data-study-opt="mode"][data-study-val="精读"]');
await page.waitForSelector("[data-digest-board]", { timeout: 20000 });
await page.waitForTimeout(300);

const taught = await page.evaluate((pausedHash) => {
  const text = document.body.innerText;
  return {
    same: location.hash === pausedHash,
    leftoverPdf: /pdf-session/.test(location.hash),
    board: !!document.querySelector("[data-digest-board]"),
    cite: !!document.querySelector("[data-cite]"),
    traps: !!document.querySelector('[data-digest-card="traps"]'),
    grounded: /公开教材|antiderivative|calculus|integral/i.test(text),
    mark: /Hyperknow|Orbie/i.test(text),
  };
}, paused.hash);
await page.screenshot({ path: shot.replace(/\.png$/, "-board.png"), fullPage: false });

if (await page.locator("[data-cite]").count()) {
  await page.click("[data-cite]");
  await page.waitForSelector("#citeOverlay, .cite-card", { timeout: 5000 });
}
const preview = await page.evaluate(() => ({
  overlay: !!document.querySelector("#citeOverlay, .cite-card"),
  leftoverPdf: /pdf-session/.test(location.hash),
  mark: /Hyperknow|Orbie/i.test(document.body.innerText),
}));
await page.screenshot({ path: shot.replace(/\.png$/, "-cite.png"), fullPage: false });

await page.setViewportSize({ width: 390, height: 844 });
await page.waitForTimeout(250);
const mobile = await page.evaluate(() => ({
  board: !!document.querySelector("[data-digest-board]"),
  w: window.innerWidth,
  leftoverPdf: /pdf-session/.test(location.hash),
  mark: /Hyperknow|Orbie/i.test(document.body.innerText),
}));
await page.screenshot({ path: shot.replace(/\.png$/, "-mobile.png"), fullPage: false });
await browser.close();

const report = { paused, taught, preview, mobile, errors, shot };
console.log(JSON.stringify(report, null, 2));
writeFileSync(shot.replace(/\.png$/, ".json"), JSON.stringify(report, null, 2));

if (errors.length) {
  console.error("PAGE_ERRORS", errors);
  process.exit(1);
}
if (!paused.ask || !paused.modes || paused.board || paused.leftoverPdf || paused.mark) {
  console.error("ASSIST_DIGEST_PAUSE_FAIL", paused);
  process.exit(1);
}
if (!taught.same || taught.leftoverPdf || !taught.board || !taught.cite || !taught.traps || !taught.grounded || taught.mark) {
  console.error("ASSIST_DIGEST_BOARD_FAIL", taught);
  process.exit(1);
}
if (!preview.overlay || preview.leftoverPdf || preview.mark) {
  console.error("ASSIST_DIGEST_CITE_FAIL", preview);
  process.exit(1);
}
if (!mobile.board || mobile.leftoverPdf || mobile.mark || mobile.w > 420) {
  console.error("ASSIST_DIGEST_MOBILE_FAIL", mobile);
  process.exit(1);
}
