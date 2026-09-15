import { chromium } from "playwright";
import { writeFileSync } from "node:fs";

const origin = process.env.ANYKNOW_URL || "http://127.0.0.1:4173";
const base = origin.replace(/\/$/, "");
const shot = process.env.SHOT || "history-star.png";
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

const email = `star${Date.now()}@anyknow.test`;
const password = "star-pass-1";
const signup = await page.request.post(`${base}/api/auth/register`, {
  data: { email, password },
});
if (!signup.ok()) {
  console.error("REGISTER_FAIL", signup.status(), await signup.text());
  process.exit(1);
}
const auth = await signup.json();
const token = auth.token;
const assist = await page.request.post(`${base}/api/assist`, {
  headers: { Authorization: `Bearer ${token}` },
  data: { question: "Mills 社会学想象力" },
});
if (!assist.ok()) {
  console.error("ASSIST_FAIL", assist.status(), await assist.text());
  process.exit(1);
}
const conv = (await assist.json()).conversation;
if (!conv?.id || !conv.title) {
  console.error("NO_CONV", conv);
  process.exit(1);
}

await page.addInitScript((t) => localStorage.setItem("anyknow_token", t), token);
await page.goto(`${base}/#/history`, { waitUntil: "networkidle", timeout: 30000 });
await page.waitForSelector("h1", { timeout: 15000 });
await page.waitForSelector(".hist-card", { timeout: 10000 });

const before = await page.evaluate(() => ({
  text: document.body.innerText,
  cards: document.querySelectorAll(".hist-card").length,
  starred: document.querySelectorAll(".hist-card.starred").length,
  chip: !!document.querySelector("[data-starred-only]"),
}));
if (!before.chip || before.cards < 1) {
  console.error("HISTORY_CARDS_FAIL", before);
  process.exit(1);
}
if (!before.text.includes(conv.title) && !before.text.includes("Mills")) {
  console.error("CONV_MISSING", before.text.slice(0, 400), conv.title);
  process.exit(1);
}

await page.click(".star-btn");
await page.waitForTimeout(300);
await page.click("[data-starred-only]");
await page.waitForTimeout(250);

const filtered = await page.evaluate(() => ({
  text: document.body.innerText,
  cards: document.querySelectorAll(".hist-card").length,
  starred: document.querySelectorAll(".hist-card.starred").length,
  filterOn: document.querySelector("[data-starred-only]")?.classList.contains("on"),
  font: getComputedStyle(document.querySelector("h1")).fontFamily,
}));

await page.screenshot({ path: shot, fullPage: false });

await page.setViewportSize({ width: 390, height: 844 });
await page.waitForTimeout(200);
await page.screenshot({ path: shot.replace(/\.png$/, "-mobile.png"), fullPage: false });
await browser.close();

const report = { conv: { id: conv.id, title: conv.title }, before, filtered, errors, shot };
console.log(JSON.stringify(report, null, 2));
writeFileSync(shot.replace(/\.png$/, ".json"), JSON.stringify(report, null, 2));

if (errors.length) {
  console.error("PAGE_ERRORS", errors);
  process.exit(1);
}
if (!filtered.filterOn || filtered.cards < 1 || filtered.starred < 1) {
  console.error("STAR_FILTER_FAIL", filtered);
  process.exit(1);
}
if (!/ZCOOL XiaoWei|Kalam/i.test(filtered.font)) {
  console.error("FONT_FAIL", filtered.font);
  process.exit(1);
}
if (!/仅收藏|Starred only/.test(filtered.text)) {
  console.error("STARRED_COPY_FAIL", filtered.text.slice(0, 400));
  process.exit(1);
}
