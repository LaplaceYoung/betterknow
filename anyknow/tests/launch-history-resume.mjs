import { chromium } from "playwright";
import { writeFileSync } from "node:fs";

const origin = process.env.ANYKNOW_URL || "http://127.0.0.1:4173";
const base = origin.replace(/\/$/, "");
const shot = process.env.SHOT || "history-resume.png";
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

const first = await page.request.post(`${base}/api/assist`, { data: { question: "微积分" } });
if (!first.ok()) {
  console.error("ASSIST_FAIL", first.status(), await first.text());
  process.exit(1);
}
const created = await first.json();
const conv = created.conversation;
if (!conv?.id || !Array.isArray(conv.messages) || conv.messages.length < 2) {
  console.error("NO_MESSAGES", conv);
  process.exit(1);
}

await page.goto(`${base}/#/response/${conv.id}`, { waitUntil: "networkidle", timeout: 30000 });
await page.waitForSelector(".resp-thread, .response-board", { timeout: 15000 });
await page.waitForTimeout(300);
const open = await page.evaluate(() => {
  const text = document.body.innerText;
  return {
    thread: document.querySelectorAll(".resp-thread [data-resp-role]").length,
    users: document.querySelectorAll("[data-resp-role='user']").length,
    mark: /Hyperknow|Orbie/i.test(text),
    hash: location.hash,
  };
});
await page.screenshot({ path: shot, fullPage: false });

await page.fill("#prompt", "导数是什么");
await page.click("#send");
await page.waitForFunction(
  (n) => document.querySelectorAll("[data-resp-role='user']").length >= n,
  2,
  { timeout: 15000 },
);
await page.waitForTimeout(200);
const follow = await page.evaluate((id) => {
  const text = document.body.innerText;
  return {
    same: location.hash === `#/response/${id}`,
    users: document.querySelectorAll("[data-resp-role='user']").length,
    leftover: /248fd02f72be4bad82bcdd347b8bf237/.test(location.hash),
    followText: /导数是什么/.test(text),
    mark: /Hyperknow|Orbie/i.test(text),
  };
}, conv.id);
await page.screenshot({ path: shot.replace(/\.png$/, "-follow.png"), fullPage: false });

await page.setViewportSize({ width: 390, height: 844 });
await page.waitForTimeout(200);
const mobile = await page.evaluate(() => ({
  thread: document.querySelectorAll(".resp-thread [data-resp-role]").length,
  w: window.innerWidth,
  mark: /Hyperknow|Orbie/i.test(document.body.innerText),
}));
await page.screenshot({ path: shot.replace(/\.png$/, "-mobile.png"), fullPage: false });
await browser.close();

const report = { open, follow, mobile, convId: conv.id, errors, shot };
console.log(JSON.stringify(report, null, 2));
writeFileSync(shot.replace(/\.png$/, ".json"), JSON.stringify(report, null, 2));

if (errors.length) {
  console.error("PAGE_ERRORS", errors);
  process.exit(1);
}
if (open.mark || open.users < 1) {
  console.error("RESUME_OPEN_FAIL", open);
  process.exit(1);
}
if (!follow.same || follow.leftover || follow.users < 2 || !follow.followText || follow.mark) {
  console.error("RESUME_FOLLOW_FAIL", follow);
  process.exit(1);
}
if (mobile.thread < 2 || mobile.mark || mobile.w > 420) {
  console.error("RESUME_MOBILE_FAIL", mobile);
  process.exit(1);
}
