import { chromium } from "playwright";
import { writeFileSync } from "node:fs";

const origin = process.env.ANYKNOW_URL || "http://127.0.0.1:4173";
const base = origin.replace(/\/$/, "");
const shot = process.env.SHOT || "assist-solve.png";
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
await page.click('[data-assist-chip="solve"]');
await page.waitForTimeout(150);
await page.fill("#prompt", "帮我一步步解这道题：定积分");
await page.click("#send");
await page.waitForSelector(".worked-example, .response-board", { timeout: 20000 });
await page.waitForTimeout(400);

const desktop = await page.evaluate(() => {
  const text = document.body.innerText;
  const cards = [...document.querySelectorAll("[data-worked]")].map((el) => el.getAttribute("data-worked"));
  return {
    board: !!document.querySelector("[data-worked-board]"),
    cards,
    known: cards.includes("known"),
    steps: cards.includes("steps"),
    check: cards.includes("check"),
    grounded: /公开教材|integral|antiderivative|substitution/i.test(text),
    mark: /Hyperknow|Orbie/i.test(text),
  };
});
await page.screenshot({ path: shot, fullPage: false });

await page.setViewportSize({ width: 390, height: 844 });
await page.waitForTimeout(250);
const mobile = await page.evaluate(() => ({
  board: !!document.querySelector("[data-worked-board]"),
  w: window.innerWidth,
  mark: /Hyperknow|Orbie/i.test(document.body.innerText),
}));
await page.screenshot({ path: shot.replace(/\.png$/, "-mobile.png"), fullPage: false });
await browser.close();

const report = { desktop, mobile, errors, shot };
console.log(JSON.stringify(report, null, 2));
writeFileSync(shot.replace(/\.png$/, ".json"), JSON.stringify(report, null, 2));

if (errors.length) {
  console.error("PAGE_ERRORS", errors);
  process.exit(1);
}
if (!desktop.board || !desktop.known || !desktop.steps || !desktop.check || !desktop.grounded || desktop.mark) {
  console.error("ASSIST_SOLVE_FAIL", desktop);
  process.exit(1);
}
if (!mobile.board || mobile.mark || mobile.w > 420) {
  console.error("ASSIST_SOLVE_MOBILE_FAIL", mobile);
  process.exit(1);
}
