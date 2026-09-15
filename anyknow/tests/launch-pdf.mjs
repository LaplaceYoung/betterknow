import { chromium } from "playwright";
import { writeFileSync } from "node:fs";

const origin = process.env.ANYKNOW_URL || "http://127.0.0.1:4173";
const base = origin.replace(/\/$/, "");
const shot = process.env.SHOT || "pdf.png";
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

await page.goto(`${base}/#/pdf-session/pythagorean`, { waitUntil: "networkidle", timeout: 30000 });
await page.waitForSelector(".pdf-session", { timeout: 15000 });
await page.waitForTimeout(700);
const live = await page.evaluate(() => {
  const text = document.body.innerText;
  const art = document.querySelector(".pdf-page-art");
  return {
    title: /Pythagorean/i.test(text),
    formula: text.includes("核心公式") && /a\^2 \+ b\^2 = c\^2|a² \+ b² = c²/.test(text),
    highlight: text.includes("高亮") || /Highlight/i.test(text),
    circle: text.includes("圈注") || /Circle/i.test(text),
    annotate: text.includes("批注") || /\bNote\b/.test(text),
    ask: /3\^2 \+ 4\^2|3² \+ 4²/.test(text),
    pause: text.includes("暂停") || /\bPause\b/.test(text),
    mark: /Hyperknow|Orbie/i.test(text),
    artW: art?.naturalWidth || 0,
    h1Font: getComputedStyle(document.querySelector("h1")).fontFamily,
    kinds: [...document.querySelectorAll("[data-pdf-kind]")].map((el) => el.dataset.pdfKind),
  };
});
await page.screenshot({ path: shot, fullPage: false });

await page.click("#pdfPause");
await page.waitForTimeout(200);
const paused = await page.evaluate(() => ({
  resume: document.body.innerText.includes("继续") || /Resume/i.test(document.body.innerText),
  pausedClass: document.querySelector(".pdf-split")?.classList.contains("paused"),
}));
await page.screenshot({ path: shot.replace(/\.png$/, "-paused.png"), fullPage: false });

await page.goto(`${base}/#/pdf-session/missing-id`, { waitUntil: "networkidle" });
await page.waitForSelector(".pdf-session", { timeout: 10000 });
await page.waitForTimeout(250);
const restarted = await page.evaluate(() => ({
  notice: document.body.innerText.includes("旧会话不可用") || /no longer available/i.test(document.body.innerText),
}));
await page.screenshot({ path: shot.replace(/\.png$/, "-restarted.png"), fullPage: false });

await page.goto(`${base}/#/pdf-session/pythagorean-resume`, { waitUntil: "networkidle" });
await page.waitForSelector(".pdf-session", { timeout: 10000 });
await page.waitForTimeout(250);
const resumed = await page.evaluate(() => ({
  notice: document.body.innerText.includes("已恢复对话") || /Resumed conversation/i.test(document.body.innerText),
}));
await page.screenshot({ path: shot.replace(/\.png$/, "-resumed.png"), fullPage: false });

await page.goto(`${base}/#/pdf-session/stats-notes`, { waitUntil: "networkidle" });
await page.waitForSelector(".pdf-session", { timeout: 10000 });
await page.waitForTimeout(400);
const stats = await page.evaluate(() => {
  const text = document.body.innerText;
  const ink = [...document.querySelectorAll(".pdf-page-ink p")].map((p) => p.textContent);
  return {
    title: /Statistics Notes/i.test(text),
    clt: /Central Limit Theorem|\bCLT\b/i.test(text),
    hypo: /H_0|H₀|Null Hypothesis/i.test(text),
    highlight: /Central limit theorem/i.test(text),
    pythagInk: ink.some((t) => /a² \+ b² = c²/.test(t || "")),
    statsInk: ink.some((t) => t === "CLT") && ink.some((t) => /H₀/.test(t || "")),
    mark: /Hyperknow|Orbie|rk\d+/i.test(text),
  };
});
await page.screenshot({ path: shot.replace(/\.png$/, "-stats.png"), fullPage: false });

await page.setViewportSize({ width: 390, height: 844 });
await page.goto(`${base}/#/pdf-session/3ae6a64dc031429c99390b52715e84fd`, { waitUntil: "networkidle" });
await page.waitForSelector(".pdf-session", { timeout: 10000 });
await page.waitForTimeout(300);
const statsMobile = await page.evaluate(() => ({
  leftover: /Statistics Notes/i.test(document.body.innerText),
  clt: /CLT|Central Limit/i.test(document.body.innerText),
  w: window.innerWidth,
  mark: /Hyperknow|Orbie/i.test(document.body.innerText),
}));
await page.screenshot({ path: shot.replace(/\.png$/, "-stats-mobile.png"), fullPage: false });

await page.goto(`${base}/#/pdf-session/pythagorean`, { waitUntil: "networkidle" });
await page.waitForSelector(".pdf-session", { timeout: 10000 });
await page.waitForTimeout(400);
const mobile = await page.evaluate(() => ({
  w: window.innerWidth,
  page: !!document.querySelector(".pdf-session"),
}));
await page.screenshot({ path: shot.replace(/\.png$/, "-mobile.png"), fullPage: false });
await browser.close();

const report = { live, paused, restarted, resumed, stats, statsMobile, mobile, errors, shot };
console.log(JSON.stringify(report, null, 2));
writeFileSync(shot.replace(/\.png$/, ".json"), JSON.stringify(report, null, 2));

if (errors.length) {
  console.error("PAGE_ERRORS", errors);
  process.exit(1);
}
if (!live.title || !live.formula || !live.pause || live.mark || live.artW < 1) {
  console.error("PDF_LIVE_FAIL", live);
  process.exit(1);
}
if (!live.kinds.includes("highlight") || !live.kinds.includes("circle") || !live.kinds.includes("annotate")) {
  console.error("PDF_MARK_FAIL", live.kinds);
  process.exit(1);
}
if (!/ZCOOL XiaoWei|Kalam/i.test(live.h1Font)) {
  console.error("PDF_FONT_FAIL", live.h1Font);
  process.exit(1);
}
if (!paused.resume || !paused.pausedClass) {
  console.error("PDF_PAUSE_FAIL", paused);
  process.exit(1);
}
if (!restarted.notice) {
  console.error("PDF_RESTART_FAIL", restarted);
  process.exit(1);
}
if (!resumed.notice) {
  console.error("PDF_RESUME_FAIL", resumed);
  process.exit(1);
}
if (!mobile.page || mobile.w > 420) {
  console.error("PDF_MOBILE_FAIL", mobile);
  process.exit(1);
}
if (!stats.title || !stats.clt || !stats.hypo || !stats.statsInk || stats.pythagInk || stats.mark) {
  console.error("PDF_STATS_FAIL", stats);
  process.exit(1);
}
if (!statsMobile.leftover || !statsMobile.clt || statsMobile.mark || statsMobile.w > 420) {
  console.error("PDF_STATS_MOBILE_FAIL", statsMobile);
  process.exit(1);
}
