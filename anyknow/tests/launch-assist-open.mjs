import { chromium } from "playwright";
import { writeFileSync } from "node:fs";

const origin = process.env.ANYKNOW_URL || "http://127.0.0.1:4173";
const base = origin.replace(/\/$/, "");
const shot = process.env.SHOT || "assist-open.png";
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

await page.addInitScript(() => {
  localStorage.setItem("anyknow_token", "tok_stale_expired");
});
await page.goto(`${base}/#/signin`, { waitUntil: "networkidle", timeout: 30000 });
await page.waitForSelector("h1", { timeout: 15000 });
await page.waitForTimeout(250);
const gated = await page.evaluate(() => ({
  hash: location.hash,
  auth: !!document.querySelector(".auth-page"),
  home: /打造课程|即时协助/.test(document.body.innerText),
  loginCopy: /登录即刻/.test(document.body.innerText),
  token: localStorage.getItem("anyknow_token") || "",
}));

await page.click('button[data-mode="assist"]');
await page.waitForTimeout(150);
await page.fill("#prompt", "微积分");
await page.click("#send");
await page.waitForFunction(() => /\/response\/conv_/.test(location.hash), { timeout: 25000 });
await page.waitForTimeout(300);
const sent = await page.evaluate(() => ({
  hash: location.hash,
  auth: !!document.querySelector(".auth-page"),
  loginCopy: /登录即刻|创建您的账户/.test(document.body.innerText),
  thread: !!document.querySelector(".resp-thread, [data-content-board], .response-board"),
  mark: /Hyperknow|Orbie/i.test(document.body.innerText),
  token: localStorage.getItem("anyknow_token") || "",
}));

await page.fill("#prompt", "再讲细一点");
await page.click("#send");
await page.waitForFunction(() => {
  const el = document.querySelector("#send");
  return el && !el.classList.contains("busy") && /\/response\/conv_/.test(location.hash);
}, { timeout: 25000 });
await page.waitForTimeout(300);
const follow = await page.evaluate(() => ({
  hash: location.hash,
  auth: !!document.querySelector(".auth-page"),
  loginCopy: /登录即刻|创建您的账户/.test(document.body.innerText),
  thread: !!document.querySelector(".resp-thread, [data-content-board], .response-board"),
}));
await page.screenshot({ path: shot, fullPage: false });
await browser.close();

const report = { gated, sent, follow, errors, shot };
console.log(JSON.stringify(report, null, 2));
writeFileSync(shot.replace(/\.png$/, ".json"), JSON.stringify(report, null, 2));

if (errors.length) {
  console.error("PAGE_ERRORS", errors);
  process.exit(1);
}
if (gated.auth || gated.loginCopy || !gated.home) {
  console.error("OPEN_GATE_FAIL", gated);
  process.exit(1);
}
if (!sent.hash.includes("/response/conv_") || sent.auth || sent.loginCopy || !sent.thread || sent.mark) {
  console.error("OPEN_SEND_FAIL", sent);
  process.exit(1);
}
if (sent.token === "tok_stale_expired" || !String(sent.token).startsWith("tok_")) {
  console.error("OPEN_TOKEN_FAIL", sent.token);
  process.exit(1);
}
if (!follow.hash.includes("/response/conv_") || follow.auth || follow.loginCopy || !follow.thread) {
  console.error("OPEN_FOLLOW_FAIL", follow);
  process.exit(1);
}
