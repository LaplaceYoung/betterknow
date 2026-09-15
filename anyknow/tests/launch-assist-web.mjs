import { chromium } from "playwright";
import { writeFileSync } from "node:fs";

const origin = process.env.ANYKNOW_URL || "http://127.0.0.1:4173";
const base = origin.replace(/\/$/, "");
const shot = process.env.SHOT || "assist-web.png";
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
await page.fill("#prompt", "explanation of mitosis");
await page.click("#send");
await page.waitForSelector("[data-content-board], [data-resp-quiz]", { timeout: 25000 });
await page.waitForTimeout(350);

const desktop = await page.evaluate(() => {
  const text = document.body.innerText;
  const cite = document.querySelector("[data-web-cite]");
  return {
    hash: location.hash,
    encyclopedia: !!document.querySelector("[data-content-board]"),
    quiz: !!document.querySelector("[data-resp-quiz]"),
    cite: !!cite,
    href: cite?.getAttribute("href") || "",
    notes: /Course notes/i.test(text),
    leftover: /248fd02f72be4bad82bcdd347b8bf237/.test(location.hash),
    mark: /Hyperknow|Orbie/i.test(text),
  };
});
await page.screenshot({ path: shot, fullPage: false });

await page.setViewportSize({ width: 390, height: 844 });
await page.waitForTimeout(200);
const mobile = await page.evaluate(() => ({
  cite: !!document.querySelector("[data-web-cite]"),
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
if (
  !desktop.hash.includes("/response/conv_") ||
  desktop.leftover ||
  !desktop.encyclopedia ||
  !desktop.quiz ||
  !desktop.cite ||
  !/^https:\/\//.test(desktop.href) ||
  desktop.notes ||
  desktop.mark
) {
  console.error("ASSIST_WEB_FAIL", desktop);
  process.exit(1);
}
if (!mobile.cite || mobile.mark || mobile.w > 420) {
  console.error("ASSIST_WEB_MOBILE_FAIL", mobile);
  process.exit(1);
}
