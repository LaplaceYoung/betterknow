import { chromium } from "playwright";
import { writeFileSync } from "node:fs";

const origin = process.env.ANYKNOW_URL || "http://127.0.0.1:4173";
const base = origin.replace(/\/$/, "");
const shot = process.env.SHOT || "assist-deeplearn.png";
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
await page.click('[data-assist-tool="deeplearn"]');
await page.waitForTimeout(150);
await page.fill("#prompt", "微积分");
await page.click("#send");
await page.waitForSelector("[data-dl-session], .tutor-board", { timeout: 20000 });
await page.waitForTimeout(400);

const desktop = await page.evaluate(() => {
  const text = document.body.innerText;
  const hash = location.hash || "";
  return {
    crafted: /#\/deep-learn-session\/dl_/.test(hash),
    leftoverDump: /248fd02f72be4bad82bcdd347b8bf237/.test(hash),
    outline: /先建立图像/.test(text) && /自检/.test(text),
    kb: /公开教材|limit|derivative|calculus|antiderivative/i.test(text),
    mark: /Hyperknow|Orbie/i.test(text),
    hash,
  };
});
await page.screenshot({ path: shot, fullPage: false });

await page.click("#askHint");
await page.waitForSelector(".chalk-hint, .answer", { timeout: 15000 });
await page.waitForTimeout(250);
const hint = await page.evaluate(() => {
  const text = document.body.innerText;
  return {
    same: /#\/deep-learn-session\/dl_/.test(location.hash),
    probe: /先别下定义|现象/.test(text),
    answerDump: /答案是|the answer is/i.test(text),
    mark: /Hyperknow|Orbie/i.test(text),
  };
});
await page.screenshot({ path: shot.replace(/\.png$/, "-hint.png"), fullPage: false });

await page.goto(`${base}/#/history`, { waitUntil: "networkidle", timeout: 20000 });
await page.click('[data-hist="sessions"]');
await page.waitForTimeout(200);
await page.click("#histNewSession");
await page.waitForTimeout(300);
const fromHistory = await page.evaluate(() => ({
  home: /#\/?$/.test(location.hash) || location.hash === "#/" || location.hash === "",
  tool: !!document.querySelector('[data-assist-tool="deeplearn"].on, .assist-pop-row.on'),
  assist: !!document.querySelector('button[data-mode="assist"].on') || document.body.innerText.includes("深度学习课堂"),
}));

await page.setViewportSize({ width: 390, height: 844 });
await page.goto(`${base}/`);
await page.click('button[data-mode="assist"]');
await page.click("#assistToolsBtn");
await page.click('[data-assist-tool="deeplearn"]');
await page.fill("#prompt", "微积分");
await page.click("#send");
await page.waitForSelector("[data-dl-session], .tutor-board", { timeout: 20000 });
const mobile = await page.evaluate(() => ({
  crafted: /#\/deep-learn-session\/dl_/.test(location.hash),
  outline: /先建立图像/.test(document.body.innerText),
  w: window.innerWidth,
  mark: /Hyperknow|Orbie/i.test(document.body.innerText),
}));
await page.screenshot({ path: shot.replace(/\.png$/, "-mobile.png"), fullPage: false });
await browser.close();

const report = { desktop, hint, fromHistory, mobile, errors, shot };
console.log(JSON.stringify(report, null, 2));
writeFileSync(shot.replace(/\.png$/, ".json"), JSON.stringify(report, null, 2));

if (errors.length) {
  console.error("PAGE_ERRORS", errors);
  process.exit(1);
}
if (!desktop.crafted || desktop.leftoverDump || !desktop.outline || !desktop.kb || desktop.mark) {
  console.error("ASSIST_DEEPLEARN_FAIL", desktop);
  process.exit(1);
}
if (!hint.same || !hint.probe || hint.answerDump || hint.mark) {
  console.error("ASSIST_DEEPLEARN_HINT_FAIL", hint);
  process.exit(1);
}
if (!fromHistory.home || !fromHistory.assist) {
  console.error("ASSIST_DEEPLEARN_HISTORY_FAIL", fromHistory);
  process.exit(1);
}
if (!mobile.crafted || !mobile.outline || mobile.mark || mobile.w > 420) {
  console.error("ASSIST_DEEPLEARN_MOBILE_FAIL", mobile);
  process.exit(1);
}
