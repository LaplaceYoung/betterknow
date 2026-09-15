import { chromium } from "playwright";

const origin = process.env.ANYKNOW_URL || "http://127.0.0.1:4173";
const base = origin.replace(/\/$/, "");
const shot = process.env.SHOT || "/tmp/simo-know-verify/timetable.png";
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

await page.goto(`${base}/#/`, { waitUntil: "networkidle", timeout: 30000 });
await page.waitForSelector("h1", { timeout: 15000 });
await page.click('button[data-source="school"]', { force: true });
await page.waitForTimeout(200);
await page.click("#lmsBtn", { force: true });
await page.waitForSelector("#ttSample", { timeout: 8000 });
await page.click("#ttSample", { force: true });
await page.waitForTimeout(200);
await page.click("#ttGo", { force: true });
await page.waitForSelector(".tt-grid", { timeout: 15000 });
await page.waitForTimeout(300);
const feed = await page.evaluate(() => {
  const text = document.body.innerText;
  return {
    math: text.includes("高等数学A"),
    preview: text.includes("课前预习"),
    related: text.includes("相关知识") && text.includes("机器学习"),
    mark: /Hyperknow|Orbie/i.test(text),
    login: /jwglxt|login_slogin/.test(text),
  };
});
await page.screenshot({ path: shot, fullPage: false });

await page.click("button.tt-cell.on", { force: true });
await page.waitForTimeout(300);
const assist = await page.evaluate(() => ({
  prompt: document.querySelector("#prompt")?.value || "",
  mode: document.body.innerText.includes("即时协助"),
}));

await page.setViewportSize({ width: 390, height: 844 });
await page.goto(`${base}/#/learning-feed`, { waitUntil: "networkidle" });
await page.waitForSelector("h1");
await page.waitForTimeout(250);
const mobile = await page.evaluate(() => ({
  w: window.innerWidth,
  grid: !!document.querySelector(".tt-grid"),
  math: document.body.innerText.includes("高等数学A"),
}));
await page.screenshot({ path: shot.replace(/\.png$/, "-mobile.png"), fullPage: false });
await browser.close();

const report = { feed, assist, mobile, errors, shot };
console.log(JSON.stringify(report, null, 2));
if (errors.length) process.exit(1);
if (!feed.math || !feed.preview || !feed.related || feed.mark || feed.login) process.exit(1);
if (!/预习/.test(assist.prompt)) process.exit(1);
if (!mobile.grid || !mobile.math) process.exit(1);
