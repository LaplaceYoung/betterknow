import { chromium } from "playwright";
import { writeFileSync } from "node:fs";

const origin = process.env.ANYKNOW_URL || "http://127.0.0.1:4173";
const base = origin.replace(/\/$/, "");
const shot = process.env.SHOT || "assist-next.png";
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

await page.addInitScript(() => localStorage.removeItem("anyknow_token"));
await page.goto(`${base}/`, { waitUntil: "networkidle", timeout: 30000 });
await page.waitForSelector("h1", { timeout: 15000 });
await page.click('button[data-mode="assist"]');
await page.waitForTimeout(150);
await page.fill("#prompt", "微积分");
await page.click("#send");
await page.waitForSelector("[data-next-rail], [data-next-cards]", { timeout: 25000 });
await page.waitForTimeout(300);

const desktop = await page.evaluate(() => {
  const text = document.body.innerText;
  return {
    hash: location.hash,
    rail: !!document.querySelector("[data-next-rail]"),
    cards: document.querySelectorAll("[data-next-step]").length,
    phases: ["已讲过", "当前", "下一轮"].every((s) => text.includes(s)),
    auth: !!document.querySelector(".auth-page") || /登录即刻/.test(text),
    leftover: /248fd02f72be4bad82bcdd347b8bf237/.test(location.hash),
    mark: /Hyperknow|Orbie/i.test(text),
  };
});
await page.screenshot({ path: shot, fullPage: false });

const solve = page.locator('[data-next-step="solve"]');
if (await solve.count()) {
  await solve.click();
  await page.waitForTimeout(800);
}
const after = await page.evaluate(() => ({
  hash: location.hash,
  auth: !!document.querySelector(".auth-page"),
  worked: !!document.querySelector("[data-worked-board], .worked-example, [data-next-rail]"),
  mark: /Hyperknow|Orbie/i.test(document.body.innerText),
}));

await page.setViewportSize({ width: 390, height: 844 });
await page.waitForTimeout(200);
const mobile = await page.evaluate(() => ({
  rail: !!document.querySelector("[data-next-rail]") || document.querySelectorAll("[data-next-step]").length > 0,
  w: window.innerWidth,
  mark: /Hyperknow|Orbie/i.test(document.body.innerText),
}));
await page.screenshot({ path: shot.replace(/\.png$/, "-mobile.png"), fullPage: false });
await browser.close();

const report = { desktop, after, mobile, errors, shot };
console.log(JSON.stringify(report, null, 2));
writeFileSync(shot.replace(/\.png$/, ".json"), JSON.stringify(report, null, 2));

if (errors.length) {
  console.error("PAGE_ERRORS", errors);
  process.exit(1);
}
if (
  !desktop.hash.includes("/response/conv_") ||
  !desktop.rail ||
  desktop.cards !== 3 ||
  !desktop.phases ||
  desktop.auth ||
  desktop.leftover ||
  desktop.mark
) {
  console.error("ASSIST_NEXT_FAIL", desktop);
  process.exit(1);
}
if (after.auth || after.mark || !after.hash.includes("/response/")) {
  console.error("ASSIST_NEXT_CLICK_FAIL", after);
  process.exit(1);
}
if (!mobile.rail || mobile.mark || mobile.w > 420) {
  console.error("ASSIST_NEXT_MOBILE_FAIL", mobile);
  process.exit(1);
}
