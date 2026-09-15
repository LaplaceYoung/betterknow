import { chromium } from "playwright";
import { writeFileSync } from "node:fs";

const origin = process.env.ANYKNOW_URL || "http://127.0.0.1:4173";
const base = origin.replace(/\/$/, "");
const shot = process.env.SHOT || "signup.png";
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

await page.goto(`${base}/#/signup`, { waitUntil: "networkidle", timeout: 30000 });
await page.waitForSelector("h1", { timeout: 15000 });
await page.waitForTimeout(300);
const form = await page.evaluate(() => {
  const text = document.body.innerText;
  return {
    home: text.includes("打造课程") || /Craft a course/i.test(text),
    auth: !!document.querySelector(".auth-page"),
    credits: /FREE ·/.test(text),
    avatar: !!document.querySelector("#avatarBtn"),
    mark: /Hyperknow|Orbie/i.test(text),
    h1Font: getComputedStyle(document.querySelector("h1")).fontFamily,
  };
});
await page.screenshot({ path: shot, fullPage: false });

await page.goto(`${base}/#/`, { waitUntil: "networkidle" });
await page.waitForSelector("h1", { timeout: 10000 });
const home = await page.evaluate(() => {
  const text = document.body.innerText;
  return {
    craft: text.includes("打造课程") || /Craft a course/i.test(text),
    assist: text.includes("即时协助") || /Instant assist/i.test(text),
    send: !!document.querySelector("#send"),
    credits: /FREE ·/.test(text),
    avatar: !!document.querySelector("#avatarBtn"),
    auth: !!document.querySelector(".auth-page"),
  };
});
await page.screenshot({ path: shot.replace(/\.png$/, "-home.png"), fullPage: false });

await page.setViewportSize({ width: 390, height: 844 });
await page.goto(`${base}/#/onboarding`, { waitUntil: "networkidle" });
await page.waitForSelector("h1", { timeout: 10000 });
await page.waitForTimeout(250);
const mobile = await page.evaluate(() => ({
  w: window.innerWidth,
  home: document.body.innerText.includes("打造课程") || /Craft a course/i.test(document.body.innerText),
  auth: !!document.querySelector(".auth-page"),
  onboard: !!document.querySelector(".onboard-page"),
}));
await page.screenshot({ path: shot.replace(/\.png$/, "-mobile.png"), fullPage: false });
await browser.close();

const report = { form, home, mobile, errors, shot };
console.log(JSON.stringify(report, null, 2));
writeFileSync(shot.replace(/\.png$/, ".json"), JSON.stringify(report, null, 2));

if (errors.length) {
  console.error("PAGE_ERRORS", errors);
  process.exit(1);
}
if (!form.home || form.auth || form.credits || form.avatar || form.mark) {
  console.error("OPEN_PRODUCT_FAIL", form);
  process.exit(1);
}
if (!/ZCOOL XiaoWei|Kalam/i.test(form.h1Font)) {
  console.error("HOME_FONT_FAIL", form.h1Font);
  process.exit(1);
}
if (!home.craft || !home.assist || !home.send || home.credits || home.avatar || home.auth) {
  console.error("HOME_FAIL", home);
  process.exit(1);
}
if (!mobile.home || mobile.auth || mobile.onboard || mobile.w > 420) {
  console.error("OPEN_MOBILE_FAIL", mobile);
  process.exit(1);
}
