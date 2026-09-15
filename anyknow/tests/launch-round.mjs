import { chromium } from "playwright";
import { writeFileSync } from "node:fs";

const origin = process.env.ANYKNOW_URL || "http://127.0.0.1:4173";
const base = origin.replace(/\/$/, "");
const shot = process.env.SHOT || "anyknow-round.png";
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
await page.waitForSelector("img.cover-img", { timeout: 10000 });

const home = await page.evaluate(() => {
  const h1 = document.querySelector("h1");
  const body = getComputedStyle(document.body);
  const rgb = (body.backgroundColor.match(/\d+/g) || []).map(Number);
  const luminance = (0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]) / 255;
  const imgs = [...document.querySelectorAll("img.cover-img, img.hero-doodle")].map((img) => ({
    src: img.getAttribute("src"),
    w: img.naturalWidth,
    h: img.naturalHeight,
  }));
  const text = document.body.innerText;
  return {
    title: document.title,
    h1: h1?.textContent || "",
    h1Font: getComputedStyle(h1).fontFamily,
    bg: body.backgroundColor,
    luminance,
    hasCraft: text.includes("打造课程"),
    hasAssist: text.includes("即时协助"),
    imgs,
  };
});

await page.goto(`${base}/#/courses`, { waitUntil: "networkidle" });
await page.waitForSelector("h1", { timeout: 10000 });
await page.click('button[data-shelf="inProgress"]');
await page.waitForTimeout(200);
const courses = await page.evaluate(() => {
  const text = document.body.innerText;
  const art = document.querySelector("img.shelf-art");
  return {
    h1: document.querySelector("h1")?.textContent || "",
    h1Font: getComputedStyle(document.querySelector("h1")).fontFamily,
    text: text.slice(0, 700),
    empty: text.includes("你的课程架暂时是空的"),
    hasAll: text.includes("全部"),
    hasBusy: text.includes("进行中"),
    hasDone: text.includes("已完成"),
    artSrc: art?.getAttribute("src") || null,
    artW: art?.naturalWidth || 0,
  };
});

await page.screenshot({ path: shot, fullPage: false });
await browser.close();

const report = { home, courses, errors, shot };
console.log(JSON.stringify(report, null, 2));

if (errors.length) {
  console.error("PAGE_ERRORS", errors);
  process.exit(1);
}
if (home.luminance > 0.35) process.exit(1);
if (!/ZCOOL XiaoWei|Kalam/i.test(home.h1Font)) process.exit(1);
if (!home.hasCraft || !home.hasAssist) process.exit(1);
if (!home.imgs.some((i) => /\/assets\/cover-/.test(i.src) && i.w > 0)) {
  console.error("NO_GENERATED_COVER", home.imgs);
  process.exit(1);
}
if (!courses.empty || !courses.hasAll || !courses.hasBusy || !courses.hasDone) {
  console.error("COURSES_EMPTY_FAIL", courses);
  process.exit(1);
}
if (!/empty-shelf/.test(courses.artSrc || "") || courses.artW < 1) {
  console.error("NO_SHELF_ART", courses);
  process.exit(1);
}
writeFileSync(shot.replace(/\.png$/, ".json"), JSON.stringify(report, null, 2));
