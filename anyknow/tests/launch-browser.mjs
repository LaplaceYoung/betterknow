import { chromium } from "playwright";
import { writeFileSync } from "node:fs";

const url = process.env.ANYKNOW_URL || "http://127.0.0.1:4173/";
const shot = process.env.SHOT || "anyknow-home.png";
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

await page.goto(url, { waitUntil: "networkidle", timeout: 30000 });
await page.waitForSelector("h1", { timeout: 15000 });

const probe = await page.evaluate(() => {
  const h1 = document.querySelector("h1");
  const body = getComputedStyle(document.body);
  const h1s = h1 ? getComputedStyle(h1) : null;
  const bg = body.backgroundColor;
  const rgb = bg.match(/\d+/g)?.map(Number) || [255, 255, 255];
  const luminance = (0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]) / 255;
  const text = document.body.innerText;
  return {
    title: document.title,
    h1: h1?.textContent || "",
    h1Font: h1s?.fontFamily || "",
    bg,
    luminance,
    hasCraft: text.includes("打造课程"),
    hasAssist: text.includes("即时协助"),
    filled: (document.body.innerText || "").trim().length > 80,
    w: window.innerWidth,
    h: window.innerHeight,
  };
});

await page.click('button[data-mode="assist"]');
await page.waitForTimeout(200);
const after = await page.evaluate(() => document.querySelector("h1")?.textContent || "");
await page.click('button[data-mode="craft"]');
await page.waitForTimeout(200);
const back = await page.evaluate(() => document.querySelector("h1")?.textContent || "");

await page.screenshot({ path: shot, fullPage: false });
await browser.close();

const report = { url, errors, probe, after, back, shot };
console.log(JSON.stringify(report, null, 2));

if (errors.length) {
  console.error("PAGE_ERRORS", errors);
  process.exit(1);
}
if (!probe.filled) {
  console.error("BLANK_PAGE");
  process.exit(1);
}
if (probe.luminance > 0.35) {
  console.error("NOT_DARK", probe.bg, probe.luminance);
  process.exit(1);
}
if (!/ZCOOL XiaoWei|Kalam/i.test(probe.h1Font)) {
  console.error("NO_HANDWRITING_FONT", probe.h1Font);
  process.exit(1);
}
if (!probe.hasCraft || !probe.hasAssist) {
  console.error("MISSING_TABS");
  process.exit(1);
}
if (!/即时协助/.test(after) && !/Instant assist/.test(after)) {
  console.error("TAB_SWITCH_FAILED", after);
  process.exit(1);
}
if (!/打造|Craft/.test(back)) {
  console.error("TAB_SWITCH_BACK_FAILED", back);
  process.exit(1);
}
writeFileSync(shot.replace(/\.png$/, ".json"), JSON.stringify(report, null, 2));
