import { chromium } from "playwright";
import { writeFileSync } from "node:fs";

const origin = process.env.ANYKNOW_URL || "http://127.0.0.1:4173";
const base = origin.replace(/\/$/, "");
const shot = process.env.SHOT || "assist-bind.png";
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
await page.click('[data-assist-chip="viz"]');
await page.waitForTimeout(150);
await page.fill("#prompt", "把这个过程画成粉笔示意图：微积分");
await page.click("#send");
await page.waitForSelector(".diagram, .response-board", { timeout: 20000 });
await page.waitForTimeout(300);

const viz = await page.evaluate(() => {
  const text = document.body.innerText;
  return {
    hash: location.hash,
    diagram: !!document.querySelector(".diagram svg, [data-diagram-board]"),
    conv: /\/response\/conv_/.test(location.hash),
    based: /公开教材|limit|derivative|calculus|微积分|antiderivative/i.test(text),
    mills: /biography|history/.test(text) && /overlap/.test(text),
    mark: /Hyperknow|Orbie/i.test(text),
  };
});
await page.screenshot({ path: shot, fullPage: false });

await page.goto(`${base}/`, { waitUntil: "networkidle", timeout: 30000 });
await page.click('button[data-mode="assist"]');
await page.waitForTimeout(200);
await page.click('[data-assist-chip="pack"]');
await page.waitForTimeout(150);
await page.fill("#prompt", "帮我做一张两页速查表：微积分");
await page.click("#send");
await page.waitForSelector("[data-resp-quiz], [data-resp-cards]", { timeout: 25000 });
await page.waitForTimeout(400);

const pack = await page.evaluate(() => {
  const text = document.body.innerText;
  return {
    hash: location.hash,
    quiz: !!document.querySelector("[data-resp-quiz]"),
    cards: !!document.querySelector("[data-resp-cards]"),
    cheat: !!document.querySelector("[data-open-cheat]"),
    based: /3-1-defining-the-derivative|2-2-the-limit|5-3-the-fundamental|4-10|limit|derivative/i.test(text),
    mark: /Hyperknow|Orbie/i.test(text),
  };
});
await page.screenshot({ path: shot.replace(/\.png$/, "-pack.png"), fullPage: false });

await page.setViewportSize({ width: 390, height: 844 });
await page.waitForTimeout(200);
const mobile = await page.evaluate(() => ({
  quiz: !!document.querySelector("[data-resp-quiz]") || /测验|闪卡|速查表/i.test(document.body.innerText),
  w: window.innerWidth,
  mark: /Hyperknow|Orbie/i.test(document.body.innerText),
}));
await page.screenshot({ path: shot.replace(/\.png$/, "-mobile.png"), fullPage: false });
await browser.close();

const report = { viz, pack, mobile, errors, shot };
console.log(JSON.stringify(report, null, 2));
writeFileSync(shot.replace(/\.png$/, ".json"), JSON.stringify(report, null, 2));

if (errors.length) {
  console.error("PAGE_ERRORS", errors);
  process.exit(1);
}
if (!viz.diagram || !viz.conv || !viz.based || viz.mills || viz.mark) {
  console.error("ASSIST_VIZ_FAIL", viz);
  process.exit(1);
}
if (!pack.hash.includes("/response/conv_") || !pack.quiz || !pack.cards || !pack.cheat || !pack.based || pack.mark) {
  console.error("ASSIST_PACK_FAIL", pack);
  process.exit(1);
}
if (!mobile.quiz || mobile.mark || mobile.w > 420) {
  console.error("ASSIST_BIND_MOBILE_FAIL", mobile);
  process.exit(1);
}
