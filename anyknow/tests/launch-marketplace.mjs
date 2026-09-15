import { chromium } from "playwright";

const origin = process.env.ANYKNOW_URL || "http://127.0.0.1:4173";
const base = origin.replace(/\/$/, "");
const shot = process.env.SHOT || "/tmp/simo-know-verify/marketplace.png";
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

await page.goto(`${base}/#/marketplace`, { waitUntil: "networkidle", timeout: 30000 });
await page.waitForSelector("h1", { timeout: 15000 });
const market = await page.evaluate(() => {
  const text = document.body.innerText;
  return {
    title: text.includes("发现最适合你的课程"),
    picks: text.includes("编辑精选"),
    subjects: text.includes("社会科学") && text.includes("考试备考"),
    cards: document.querySelectorAll("[data-preview]").length,
    search: !!document.querySelector("#marketSearch"),
    mark: /Hyperknow|Orbie/i.test(text),
  };
});
await page.screenshot({ path: shot, fullPage: false });

await page.click("button[data-preview]");
await page.waitForTimeout(400);
const preview = await page.evaluate(() => {
  const text = document.body.innerText;
  return {
    back: text.includes("返回课程集市"),
    tabs: text.includes("单元") && text.includes("资料") && text.includes("练习"),
    join: text.includes("加入课程"),
  };
});

await page.click('button[data-course-tab="materials"]');
await page.waitForTimeout(200);
const mats = await page.evaluate(() => document.body.innerText.includes("本课程暂无资料"));

await page.click('button[data-course-tab="practice"]');
await page.waitForTimeout(200);
const drill = await page.evaluate(() => document.body.innerText.includes("练习") || document.body.innerText.includes("测验"));

await page.click("button.back");
await page.waitForSelector("#marketSearch", { timeout: 8000 });
await page.fill("#marketSearch", "机器学习");
await page.waitForTimeout(200);
const filtered = await page.evaluate(() => document.body.innerText.includes("机器学习"));
await page.fill("#marketSearch", "");
await page.waitForTimeout(150);
await page.click('button[data-market-subject="soc"]');
await page.waitForTimeout(200);
const soc = await page.evaluate(() => ({
  sociology: document.body.innerText.includes("社会学概论"),
  emptyOk: document.body.innerText.includes("社会学概论") || document.body.innerText.includes("没有匹配"),
}));

await page.goto(`${base}/#/`, { waitUntil: "networkidle" });
await page.click('button[data-mode="assist"]');
await page.waitForTimeout(250);
const assist = await page.evaluate(() => {
  const text = document.body.innerText;
  return {
    math: text.includes("需要数学帮助吗？"),
    chips: text.includes("概念讲解") && text.includes("可视化"),
    tools: !!document.querySelector("#assistToolsBtn"),
    speed: !!document.querySelector("#assistSpeedBtn"),
  };
});
await page.click("#assistToolsBtn");
await page.waitForTimeout(200);
const tools = await page.evaluate(() => document.body.innerText.includes("白板课堂") && document.body.innerText.includes("学习规划"));
await page.click('button[data-assist-chip="pack"]');
await page.waitForTimeout(200);
const filled = await page.evaluate(() => document.querySelector("#prompt")?.value || "");

await page.setViewportSize({ width: 390, height: 844 });
await page.goto(`${base}/#/marketplace`, { waitUntil: "networkidle" });
await page.waitForSelector("h1");
const mobile = await page.evaluate(() => ({
  w: window.innerWidth,
  title: document.body.innerText.includes("发现最适合你的课程"),
}));
await page.screenshot({ path: shot.replace(/\.png$/, "-mobile.png"), fullPage: false });

await browser.close();

const report = { market, filtered, soc, preview, mats, drill, assist, tools, filled, mobile, errors, shot };
console.log(JSON.stringify(report, null, 2));
if (errors.length) process.exit(1);
if (!market.title || !market.picks || market.cards < 3 || market.mark) process.exit(1);
if (!preview.tabs || !mats || !assist.chips || !tools || !filled.includes("速查表")) process.exit(1);
if (!mobile.title) process.exit(1);
