import { chromium } from "playwright";
import { writeFileSync } from "node:fs";

const origin = process.env.ANYKNOW_URL || "http://127.0.0.1:4173";
const base = origin.replace(/\/$/, "");
const shot = process.env.SHOT || "anyknow-kb.png";
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

const home = await page.evaluate(() => {
  const h1 = document.querySelector("h1");
  const body = getComputedStyle(document.body);
  const rgb = (body.backgroundColor.match(/\d+/g) || []).map(Number);
  const luminance = (0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]) / 255;
  const text = document.body.innerText;
  return {
    title: document.title,
    h1: h1?.textContent || "",
    h1Font: getComputedStyle(h1).fontFamily,
    bg: body.backgroundColor,
    luminance,
    hasCraft: text.includes("打造课程"),
    hasAssist: text.includes("即时协助"),
  };
});

await page.goto(`${base}/#/knowledge-base`, { waitUntil: "networkidle", timeout: 30000 });
await page.waitForSelector("h1", { timeout: 15000 });

const emptyKb = await page.evaluate(() => {
  const text = document.body.innerText;
  return {
    h1: document.querySelector("h1")?.textContent || "",
    h1Font: getComputedStyle(document.querySelector("h1")).fontFamily,
    text: text.slice(0, 800),
    hasEmpty: text.includes("暂无文件") || text.includes("No files found"),
    hasNew: text.includes("新建文件夹") || text.includes("New folder"),
    newCount: (text.match(/新建文件夹|New folder/g) || []).length,
    hasUpload: text.includes("上传") || text.includes("Upload"),
    stub: text.includes("上传的课件与生成的速查表"),
  };
});

const email = `kb${Date.now()}@anyknow.test`;
const auth = await page.evaluate(async (em) => {
  const res = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: em, password: "kbpass" }),
  });
  return res.json();
}, email);
if (!auth.token) throw new Error(`register failed: ${JSON.stringify(auth)}`);
await page.evaluate((tok) => localStorage.setItem("anyknow_token", tok), auth.token);
await page.reload({ waitUntil: "networkidle" });
await page.goto(`${base}/#/knowledge-base`, { waitUntil: "networkidle" });
await page.waitForSelector("#kbNew", { timeout: 10000 });
await page.click("#kbNew");
await page.waitForSelector("#folderName", { timeout: 8000 });
await page.fill("#folderName", "SOC 101");
await page.click("#folderGo");
await page.waitForFunction(
  () => document.body.innerText.includes("SOC 101") && !document.querySelector("#folderName"),
  { timeout: 10000 },
);

const after = await page.evaluate(() => document.body.innerText);
await page.screenshot({ path: shot, fullPage: false });
await browser.close();

const report = { home, emptyKb, after: after.slice(0, 600), errors, shot };
console.log(JSON.stringify(report, null, 2));

if (errors.length) {
  console.error("PAGE_ERRORS", errors);
  process.exit(1);
}
if (home.luminance > 0.35) {
  console.error("NOT_DARK", home.bg);
  process.exit(1);
}
if (!/ZCOOL XiaoWei|Kalam/i.test(home.h1Font)) {
  console.error("NO_HANDWRITING_FONT", home.h1Font);
  process.exit(1);
}
if (!home.hasCraft || !home.hasAssist) {
  console.error("MISSING_HOME_TABS");
  process.exit(1);
}
if (!emptyKb.hasEmpty || !emptyKb.hasNew || !emptyKb.hasUpload || emptyKb.stub) {
  console.error("KB_EMPTY_STATE_FAIL", emptyKb);
  process.exit(1);
}
if (emptyKb.newCount !== 1) {
  console.error("KB_DUPLICATE_NEW", emptyKb);
  process.exit(1);
}
if (!/SOC 101/.test(after)) {
  console.error("FOLDER_CREATE_FAIL", after.slice(0, 400));
  process.exit(1);
}
writeFileSync(shot.replace(/\.png$/, ".json"), JSON.stringify(report, null, 2));
