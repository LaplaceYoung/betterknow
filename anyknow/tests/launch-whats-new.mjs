import { chromium } from "playwright";
import { writeFileSync } from "node:fs";

const origin = process.env.ANYKNOW_URL || "http://127.0.0.1:4173";
const base = origin.replace(/\/$/, "");
const shot = process.env.SHOT || "whats-new.png";
const errors = [];

const browser = await chromium.launch({
  headless: true,
  channel: process.env.PW_CHANNEL || "chrome",
});
const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
await context.addInitScript(() => localStorage.removeItem("anyknow_whats_new_read_version"));
const page = await context.newPage();
page.on("pageerror", (e) => errors.push(String(e)));
page.on("console", (msg) => {
  if (msg.type() === "error") errors.push(msg.text());
});

await page.goto(`${base}/#/`, { waitUntil: "networkidle", timeout: 30000 });
await page.waitForSelector("#whatsNewOpen", { timeout: 15000 });
const home = await page.evaluate(() => {
  const tag = document.querySelector("#whatsNewOpen");
  const spark = document.querySelector(".whats-new-spark");
  return {
    tag: !!tag,
    unread: tag?.classList.contains("unread"),
    label: tag?.innerText || "",
    spark: spark?.naturalWidth || 0,
    h1Font: getComputedStyle(document.querySelector("h1") || tag).fontFamily,
  };
});
await page.screenshot({ path: shot, fullPage: false });
await page.click("#whatsNewOpen");
await page.waitForSelector("#whatsNewZoom", { timeout: 8000 });
await page.waitForTimeout(250);
const open = await page.evaluate(() => {
  const text = document.body.innerText;
  return {
    modal: !!document.querySelector(".whats-new-zoom"),
    title: text.includes("最新动态") || text.includes("What's new"),
    fast: text.includes("快速模式") || text.includes("Fast Mode"),
    version: text.includes("1.3.13"),
    trademark: /Hyperknow|Orbie/i.test(text),
  };
});
await page.screenshot({ path: shot.replace(/\.png$/, "-modal.png"), fullPage: false });
await page.click("#whatsNewClose");
await page.waitForTimeout(200);
const closed = await page.evaluate(() => ({
  modal: !!document.querySelector(".whats-new-zoom"),
  unread: document.querySelector("#whatsNewOpen")?.classList.contains("unread"),
}));
await page.setViewportSize({ width: 390, height: 844 });
await page.goto(`${base}/#/`, { waitUntil: "networkidle" });
await page.waitForSelector("#whatsNewOpen", { timeout: 10000 });
const mobile = await page.evaluate(() => ({
  tag: !!document.querySelector("#whatsNewOpen"),
  w: window.innerWidth,
}));
await page.click("#whatsNewOpen");
await page.waitForSelector("#whatsNewZoom", { timeout: 8000 });
await page.waitForTimeout(200);
await page.screenshot({ path: shot.replace(/\.png$/, "-mobile.png"), fullPage: false });
await browser.close();

const report = { home, open, closed, mobile, errors, shot };
console.log(JSON.stringify(report, null, 2));
writeFileSync(shot.replace(/\.png$/, ".json"), JSON.stringify(report, null, 2));

if (errors.length) {
  console.error("PAGE_ERRORS", errors);
  process.exit(1);
}
if (!home.tag || !home.unread || !/1\.3\.13/.test(home.label) || home.spark < 1) {
  console.error("WHATSNEW_HOME_FAIL", home);
  process.exit(1);
}
if (!open.modal || !open.title || !open.fast || !open.version || open.trademark) {
  console.error("WHATSNEW_MODAL_FAIL", open);
  process.exit(1);
}
if (closed.modal || closed.unread) {
  console.error("WHATSNEW_CLOSE_FAIL", closed);
  process.exit(1);
}
if (!mobile.tag || mobile.w > 420) {
  console.error("WHATSNEW_MOBILE_FAIL", mobile);
  process.exit(1);
}
