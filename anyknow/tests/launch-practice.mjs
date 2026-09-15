import { chromium } from "playwright";
import { writeFileSync } from "node:fs";

const origin = process.env.ANYKNOW_URL || "http://127.0.0.1:4173";
const base = origin.replace(/\/$/, "");
const shot = process.env.SHOT || "practice.png";
const errors = [];
const sid = "d62f9bbb-2902-49e5-b415-816a31207dda";

const browser = await chromium.launch({
  headless: true,
  channel: process.env.PW_CHANNEL || "chrome",
});
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
page.on("pageerror", (e) => errors.push(String(e)));
page.on("console", (msg) => {
  if (msg.type() === "error") errors.push(msg.text());
});

await page.goto(`${base}/#/course/pythagorean/practice/${sid}`, { waitUntil: "networkidle", timeout: 30000 });
await page.waitForSelector(".prac-page", { timeout: 15000 });
await page.waitForTimeout(350);
const intro = await page.evaluate(() => {
  const text = document.body.innerText;
  return {
    leftover: document.querySelector(".prac-page")?.dataset.pracLeftover === "1",
    welcome: text.includes("准备好练习") || /Ready to practice/i.test(text),
    title: /Anatomy of the Right Triangle/i.test(text),
    gotIt: text.includes("知道了") || /Got it/i.test(text),
    mastered: /已掌握|Mastered/i.test(text),
    mark: /Hyperknow|Orbie/i.test(text),
  };
});
await page.screenshot({ path: shot, fullPage: false });

await page.click("#pracStart");
await page.waitForTimeout(300);
const play = await page.evaluate(() => {
  const text = document.body.innerText;
  return {
    prompt: /hypotenuse/i.test(text),
    check: text.includes("检查") || /\bCheck\b/.test(text),
    skip: text.includes("跳过") || /\bSkip\b/.test(text),
    opts: document.querySelectorAll("[data-prac-opt]").length,
    mark: /Hyperknow|Orbie/i.test(text),
  };
});
await page.screenshot({ path: shot.replace(/\.png$/, "-play.png"), fullPage: false });

const firstOpt = await page.$("[data-prac-opt]");
if (firstOpt) await firstOpt.click();
await page.click("#pracCheck");
await page.waitForTimeout(250);
const checked = await page.evaluate(() => ({
  feedback: !!document.querySelector(".prac-feedback"),
  next: !!document.querySelector("#pracNext"),
}));

await page.setViewportSize({ width: 390, height: 844 });
await page.goto(`${base}/#/course/3ea5b7d5-d475-4c4f-84bf-9834e24a35c2/practice/${sid}`, {
  waitUntil: "networkidle",
});
await page.waitForSelector(".prac-page", { timeout: 10000 });
await page.waitForTimeout(300);
const mobile = await page.evaluate(() => {
  const text = document.body.innerText;
  return {
    leftover: document.querySelector(".prac-page")?.dataset.pracLeftover === "1",
    title: /Anatomy of the Right Triangle/i.test(text),
    mark: /Hyperknow|Orbie/i.test(text),
    w: window.innerWidth,
  };
});
await page.screenshot({ path: shot.replace(/\.png$/, "-mobile.png"), fullPage: false });

const rsid = "b38a83f7-1f82-4f7c-a309-3598f1ac9e7a";
await page.setViewportSize({ width: 1280, height: 800 });
await page.goto(`${base}/#/course/regression/practice/${rsid}`, { waitUntil: "networkidle", timeout: 30000 });
await page.waitForSelector(".prac-page", { timeout: 15000 });
await page.waitForTimeout(300);
const cloud = await page.evaluate(() => {
  const text = document.body.innerText;
  return {
    leftover: document.querySelector(".prac-page")?.dataset.pracLeftover === "1",
    title: /Patterns in the Cloud/i.test(text),
    welcome: text.includes("准备好练习") || /Ready to practice/i.test(text),
    mark: /Hyperknow|Orbie/i.test(text),
  };
});
await page.click("#pracStart");
await page.waitForTimeout(300);
const cloudPlay = await page.evaluate(() => {
  const text = document.body.innerText;
  return {
    prompt: /top-left toward the bottom-right/i.test(text),
    image: !!document.querySelector(".board-image svg"),
    check: !!document.querySelector("#pracCheck"),
    mark: /Hyperknow|Orbie/i.test(text),
  };
});
await page.screenshot({ path: shot.replace(/\.png$/, "-cloud.png"), fullPage: false });

await page.setViewportSize({ width: 390, height: 844 });
await page.goto(`${base}/#/course/706d4d5c-1b4d-4707-abb0-45fc9b1f4926/practice/${rsid}`, {
  waitUntil: "networkidle",
});
await page.waitForSelector(".prac-page", { timeout: 10000 });
await page.waitForTimeout(250);
const cloudMobile = await page.evaluate(() => {
  const text = document.body.innerText;
  return {
    leftover: document.querySelector(".prac-page")?.dataset.pracLeftover === "1",
    title: /Patterns in the Cloud|top-left toward the bottom-right/i.test(text),
    mark: /Hyperknow|Orbie/i.test(text),
    w: window.innerWidth,
  };
});
await page.screenshot({ path: shot.replace(/\.png$/, "-cloud-mobile.png"), fullPage: false });

const psid = "6dcdbc8c-6993-4810-a663-69cad7be444e";
await page.setViewportSize({ width: 1280, height: 800 });
await page.goto(`${base}/#/course/regression/practice/${psid}`, { waitUntil: "networkidle", timeout: 30000 });
await page.waitForSelector(".prac-page", { timeout: 15000 });
await page.waitForTimeout(300);
const pencil = await page.evaluate(() => {
  const text = document.body.innerText;
  return {
    leftover: document.querySelector(".prac-page")?.dataset.pracLeftover === "1",
    title: /Pencil Test/i.test(text),
    welcome: text.includes("准备好练习") || /Ready to practice/i.test(text),
    mark: /Hyperknow|Orbie/i.test(text),
  };
});
await page.click("#pracStart");
await page.waitForTimeout(300);
const pencilPlay = await page.evaluate(() => {
  const text = document.body.innerText;
  return {
    prompt: /Pencil Test/i.test(text),
    image: !!document.querySelector(".board-image svg"),
    check: !!document.querySelector("#pracCheck"),
    mark: /Hyperknow|Orbie/i.test(text),
  };
});
await page.screenshot({ path: shot.replace(/\.png$/, "-pencil.png"), fullPage: false });

await page.setViewportSize({ width: 390, height: 844 });
await page.goto(`${base}/#/course/706d4d5c-1b4d-4707-abb0-45fc9b1f4926/practice/${psid}`, {
  waitUntil: "networkidle",
});
await page.waitForSelector(".prac-page", { timeout: 10000 });
await page.waitForTimeout(250);
const pencilMobile = await page.evaluate(() => {
  const text = document.body.innerText;
  return {
    leftover: document.querySelector(".prac-page")?.dataset.pracLeftover === "1",
    title: /Pencil Test|average' behavior of the data cloud/i.test(text),
    mark: /Hyperknow|Orbie/i.test(text),
    w: window.innerWidth,
  };
});
await page.screenshot({ path: shot.replace(/\.png$/, "-pencil-mobile.png"), fullPage: false });

const gsid = "7bcb07a2-ba95-4139-a713-a0c60ba9cad5";
await page.setViewportSize({ width: 1280, height: 800 });
await page.goto(`${base}/#/course/regression/practice/${gsid}`, { waitUntil: "networkidle", timeout: 30000 });
await page.waitForSelector(".prac-page", { timeout: 15000 });
await page.waitForTimeout(300);
const gaps = await page.evaluate(() => {
  const text = document.body.innerText;
  return {
    leftover: document.querySelector(".prac-page")?.dataset.pracLeftover === "1",
    title: /Vertical Gaps/i.test(text),
    welcome: text.includes("准备好练习") || /Ready to practice/i.test(text),
    mark: /Hyperknow|Orbie/i.test(text),
  };
});
await page.click("#pracStart");
await page.waitForTimeout(300);
const gapsPlay = await page.evaluate(() => {
  const text = document.body.innerText;
  return {
    prompt: /y-hat|ŷ|predicted/i.test(text),
    image: !!document.querySelector(".board-image svg"),
    check: !!document.querySelector("#pracCheck"),
    mark: /Hyperknow|Orbie/i.test(text),
  };
});
await page.screenshot({ path: shot.replace(/\.png$/, "-gaps.png"), fullPage: false });

await page.setViewportSize({ width: 390, height: 844 });
await page.goto(`${base}/#/course/706d4d5c-1b4d-4707-abb0-45fc9b1f4926/practice/${gsid}`, {
  waitUntil: "networkidle",
});
await page.waitForSelector(".prac-page", { timeout: 10000 });
await page.waitForTimeout(250);
const gapsMobile = await page.evaluate(() => {
  const text = document.body.innerText;
  return {
    leftover: document.querySelector(".prac-page")?.dataset.pracLeftover === "1",
    title: /Vertical Gaps|y-hat|predicted/i.test(text),
    mark: /Hyperknow|Orbie/i.test(text),
    w: window.innerWidth,
  };
});
await page.screenshot({ path: shot.replace(/\.png$/, "-gaps-mobile.png"), fullPage: false });

const tsid = "e752a915-d53d-4cd7-bbd6-933d153839a9";
await page.setViewportSize({ width: 1280, height: 800 });
await page.goto(`${base}/#/course/regression/practice/${tsid}`, { waitUntil: "networkidle", timeout: 30000 });
await page.waitForSelector(".prac-page", { timeout: 15000 });
await page.waitForTimeout(300);
const tug = await page.evaluate(() => {
  const text = document.body.innerText;
  return {
    leftover: document.querySelector(".prac-page")?.dataset.pracLeftover === "1",
    title: /Tug-of-War/i.test(text),
    welcome: text.includes("准备好练习") || /Ready to practice/i.test(text),
    mark: /Hyperknow|Orbie/i.test(text),
  };
});
await page.click("#pracStart");
await page.waitForTimeout(300);
const tugPlay = await page.evaluate(() => {
  const text = document.body.innerText;
  return {
    prompt: /Tug-of-War|equilibrium/i.test(text),
    image: !!document.querySelector(".board-image svg"),
    check: !!document.querySelector("#pracCheck"),
    mark: /Hyperknow|Orbie/i.test(text),
  };
});
await page.screenshot({ path: shot.replace(/\.png$/, "-tug.png"), fullPage: false });

await page.setViewportSize({ width: 390, height: 844 });
await page.goto(`${base}/#/course/706d4d5c-1b4d-4707-abb0-45fc9b1f4926/practice/${tsid}`, {
  waitUntil: "networkidle",
});
await page.waitForSelector(".prac-page", { timeout: 10000 });
await page.waitForTimeout(250);
const tugMobile = await page.evaluate(() => {
  const text = document.body.innerText;
  return {
    leftover: document.querySelector(".prac-page")?.dataset.pracLeftover === "1",
    title: /Tug-of-War|equilibrium/i.test(text),
    mark: /Hyperknow|Orbie/i.test(text),
    w: window.innerWidth,
  };
});
await page.screenshot({ path: shot.replace(/\.png$/, "-tug-mobile.png"), fullPage: false });

const ssid = "b44ac772-4b9e-4f2b-9254-3342a480ee6b";
await page.setViewportSize({ width: 1280, height: 800 });
await page.goto(`${base}/#/course/regression/practice/${ssid}`, { waitUntil: "networkidle", timeout: 30000 });
await page.waitForSelector(".prac-page", { timeout: 15000 });
await page.waitForTimeout(300);
const springs = await page.evaluate(() => {
  const text = document.body.innerText;
  return {
    leftover: document.querySelector(".prac-page")?.dataset.pracLeftover === "1",
    title: /Springs and Tension/i.test(text),
    welcome: text.includes("准备好练习") || /Ready to practice/i.test(text),
    mark: /Hyperknow|Orbie/i.test(text),
  };
});
await page.click("#pracStart");
await page.waitForTimeout(300);
const springsPlay = await page.evaluate(() => {
  const text = document.body.innerText;
  return {
    prompt: /rigid rod|centroid/i.test(text),
    image: !!document.querySelector(".board-image svg"),
    check: !!document.querySelector("#pracCheck"),
    mark: /Hyperknow|Orbie/i.test(text),
  };
});
await page.screenshot({ path: shot.replace(/\.png$/, "-springs.png"), fullPage: false });

await page.setViewportSize({ width: 390, height: 844 });
await page.goto(`${base}/#/course/706d4d5c-1b4d-4707-abb0-45fc9b1f4926/practice/${ssid}`, {
  waitUntil: "networkidle",
});
await page.waitForSelector(".prac-page", { timeout: 10000 });
await page.waitForTimeout(250);
const springsMobile = await page.evaluate(() => {
  const text = document.body.innerText;
  return {
    leftover: document.querySelector(".prac-page")?.dataset.pracLeftover === "1",
    title: /Springs and Tension|rigid rod|centroid/i.test(text),
    mark: /Hyperknow|Orbie/i.test(text),
    w: window.innerWidth,
  };
});
await page.screenshot({ path: shot.replace(/\.png$/, "-springs-mobile.png"), fullPage: false });

const lsid = "4820d42a-7a2b-4d22-98e0-686408627512";
await page.setViewportSize({ width: 1280, height: 800 });
await page.goto(`${base}/#/course/regression/practice/${lsid}`, { waitUntil: "networkidle", timeout: 30000 });
await page.waitForSelector(".prac-page", { timeout: 15000 });
await page.waitForTimeout(300);
const leverage = await page.evaluate(() => {
  const text = document.body.innerText;
  return {
    leftover: document.querySelector(".prac-page")?.dataset.pracLeftover === "1",
    title: /Leverage and Influence/i.test(text),
    welcome: text.includes("准备好练习") || /Ready to practice/i.test(text),
    mark: /Hyperknow|Orbie/i.test(text),
  };
});
await page.click("#pracStart");
await page.waitForTimeout(300);
const leveragePlay = await page.evaluate(() => {
  const text = document.body.innerText;
  return {
    prompt: /fulcrum|leverage/i.test(text),
    image: !!document.querySelector(".board-image svg"),
    check: !!document.querySelector("#pracCheck"),
    mark: /Hyperknow|Orbie/i.test(text),
  };
});
await page.screenshot({ path: shot.replace(/\.png$/, "-leverage.png"), fullPage: false });

await page.setViewportSize({ width: 390, height: 844 });
await page.goto(`${base}/#/course/706d4d5c-1b4d-4707-abb0-45fc9b1f4926/practice/${lsid}`, {
  waitUntil: "networkidle",
});
await page.waitForSelector(".prac-page", { timeout: 10000 });
await page.waitForTimeout(250);
const leverageMobile = await page.evaluate(() => {
  const text = document.body.innerText;
  return {
    leftover: document.querySelector(".prac-page")?.dataset.pracLeftover === "1",
    title: /Leverage and Influence|fulcrum|leverage/i.test(text),
    mark: /Hyperknow|Orbie/i.test(text),
    w: window.innerWidth,
  };
});
await page.screenshot({ path: shot.replace(/\.png$/, "-leverage-mobile.png"), fullPage: false });

const rsidLang = "884adde8-dbbb-492a-aed5-6972fde047f9";
await page.setViewportSize({ width: 1280, height: 800 });
await page.goto(`${base}/#/course/regression/practice/${rsidLang}`, { waitUntil: "networkidle", timeout: 30000 });
await page.waitForSelector(".prac-page", { timeout: 15000 });
await page.waitForTimeout(300);
const residuals = await page.evaluate(() => {
  const text = document.body.innerText;
  return {
    leftover: document.querySelector(".prac-page")?.dataset.pracLeftover === "1",
    title: /Residuals: The Language of Error/i.test(text),
    welcome: text.includes("准备好练习") || /Ready to practice/i.test(text),
    mark: /Hyperknow|Orbie/i.test(text),
  };
});
await page.click("#pracStart");
await page.waitForTimeout(300);
const residualsPlay = await page.evaluate(() => {
  const text = document.body.innerText;
  return {
    prompt: /y-hat|ŷ|predicted/i.test(text),
    image: !!document.querySelector(".board-image svg"),
    check: !!document.querySelector("#pracCheck"),
    mark: /Hyperknow|Orbie/i.test(text),
  };
});
await page.screenshot({ path: shot.replace(/\.png$/, "-residuals.png"), fullPage: false });

await page.setViewportSize({ width: 390, height: 844 });
await page.goto(`${base}/#/course/706d4d5c-1b4d-4707-abb0-45fc9b1f4926/practice/${rsidLang}`, {
  waitUntil: "networkidle",
});
await page.waitForSelector(".prac-page", { timeout: 10000 });
await page.waitForTimeout(250);
const residualsMobile = await page.evaluate(() => {
  const text = document.body.innerText;
  return {
    leftover: document.querySelector(".prac-page")?.dataset.pracLeftover === "1",
    title: /Residuals: The Language of Error|y-hat|predicted/i.test(text),
    mark: /Hyperknow|Orbie/i.test(text),
    w: window.innerWidth,
  };
});
await page.screenshot({ path: shot.replace(/\.png$/, "-residuals-mobile.png"), fullPage: false });

const osid = "6caa0b32-3665-42cb-8e1d-2ab0ff1c0bbb";
await page.setViewportSize({ width: 1280, height: 800 });
await page.goto(`${base}/#/course/regression/practice/${osid}`, { waitUntil: "networkidle", timeout: 30000 });
await page.waitForSelector(".prac-page", { timeout: 15000 });
await page.waitForTimeout(300);
const objective = await page.evaluate(() => {
  const text = document.body.innerText;
  return {
    leftover: document.querySelector(".prac-page")?.dataset.pracLeftover === "1",
    title: /Objective Function/i.test(text),
    welcome: text.includes("准备好练习") || /Ready to practice/i.test(text),
    mark: /Hyperknow|Orbie/i.test(text),
  };
});
await page.click("#pracStart");
await page.waitForTimeout(300);
const objectivePlay = await page.evaluate(() => {
  const text = document.body.innerText;
  return {
    prompt: /objective function|global metric/i.test(text),
    image: !!document.querySelector(".board-image svg"),
    check: !!document.querySelector("#pracCheck"),
    mark: /Hyperknow|Orbie/i.test(text),
  };
});
await page.screenshot({ path: shot.replace(/\.png$/, "-objective.png"), fullPage: false });

await page.setViewportSize({ width: 390, height: 844 });
await page.goto(`${base}/#/course/706d4d5c-1b4d-4707-abb0-45fc9b1f4926/practice/${osid}`, {
  waitUntil: "networkidle",
});
await page.waitForSelector(".prac-page", { timeout: 10000 });
await page.waitForTimeout(250);
const objectiveMobile = await page.evaluate(() => {
  const text = document.body.innerText;
  return {
    leftover: document.querySelector(".prac-page")?.dataset.pracLeftover === "1",
    title: /Objective Function|global metric/i.test(text),
    mark: /Hyperknow|Orbie/i.test(text),
    w: window.innerWidth,
  };
});
await page.screenshot({ path: shot.replace(/\.png$/, "-objective-mobile.png"), fullPage: false });

const gsidSq = "ffb1c1f7-44a9-41ef-8604-e04f2c20b1f9";
await page.setViewportSize({ width: 1280, height: 800 });
await page.goto(`${base}/#/course/regression/practice/${gsidSq}`, { waitUntil: "networkidle", timeout: 30000 });
await page.waitForSelector(".prac-page", { timeout: 15000 });
await page.waitForTimeout(300);
const squares = await page.evaluate(() => {
  const text = document.body.innerText;
  return {
    leftover: document.querySelector(".prac-page")?.dataset.pracLeftover === "1",
    title: /Geometry of Squared Errors/i.test(text),
    welcome: text.includes("准备好练习") || /Ready to practice/i.test(text),
    mark: /Hyperknow|Orbie/i.test(text),
  };
});
await page.click("#pracStart");
await page.waitForTimeout(300);
const squaresPlay = await page.evaluate(() => {
  const text = document.body.innerText;
  return {
    prompt: /residual doubles|error square/i.test(text),
    image: !!document.querySelector(".board-image svg"),
    check: !!document.querySelector("#pracCheck"),
    mark: /Hyperknow|Orbie/i.test(text),
  };
});
await page.screenshot({ path: shot.replace(/\.png$/, "-squares.png"), fullPage: false });

await page.setViewportSize({ width: 390, height: 844 });
await page.goto(`${base}/#/course/706d4d5c-1b4d-4707-abb0-45fc9b1f4926/practice/${gsidSq}`, {
  waitUntil: "networkidle",
});
await page.waitForSelector(".prac-page", { timeout: 10000 });
await page.waitForTimeout(250);
const squaresMobile = await page.evaluate(() => {
  const text = document.body.innerText;
  return {
    leftover: document.querySelector(".prac-page")?.dataset.pracLeftover === "1",
    title: /Geometry of Squared Errors|residual doubles/i.test(text),
    mark: /Hyperknow|Orbie/i.test(text),
    w: window.innerWidth,
  };
});
await page.screenshot({ path: shot.replace(/\.png$/, "-squares-mobile.png"), fullPage: false });

const esid = "d7239551-3a08-4b27-b8be-a0aaaec46be8";
await page.setViewportSize({ width: 1280, height: 800 });
await page.goto(`${base}/#/course/regression/practice/${esid}`, { waitUntil: "networkidle", timeout: 30000 });
await page.waitForSelector(".prac-page", { timeout: 15000 });
await page.waitForTimeout(300);
const elegance = await page.evaluate(() => {
  const text = document.body.innerText;
  return {
    leftover: document.querySelector(".prac-page")?.dataset.pracLeftover === "1",
    title: /Mathematical Elegance of OLS/i.test(text),
    welcome: text.includes("准备好练习") || /Ready to practice/i.test(text),
    mark: /Hyperknow|Orbie/i.test(text),
  };
});
await page.click("#pracStart");
await page.waitForTimeout(300);
const elegancePlay = await page.evaluate(() => {
  const text = document.body.innerText;
  return {
    prompt: /U-shape|Ordinary Least Squares|OLS cost/i.test(text),
    image: !!document.querySelector(".board-image svg"),
    check: !!document.querySelector("#pracCheck"),
    mark: /Hyperknow|Orbie/i.test(text),
  };
});
await page.screenshot({ path: shot.replace(/\.png$/, "-elegance.png"), fullPage: false });

await page.setViewportSize({ width: 390, height: 844 });
await page.goto(`${base}/#/course/706d4d5c-1b4d-4707-abb0-45fc9b1f4926/practice/${esid}`, {
  waitUntil: "networkidle",
});
await page.waitForSelector(".prac-page", { timeout: 10000 });
await page.waitForTimeout(250);
const eleganceMobile = await page.evaluate(() => {
  const text = document.body.innerText;
  return {
    leftover: document.querySelector(".prac-page")?.dataset.pracLeftover === "1",
    title: /Mathematical Elegance of OLS|U-shape/i.test(text),
    mark: /Hyperknow|Orbie/i.test(text),
    w: window.innerWidth,
  };
});
await page.screenshot({ path: shot.replace(/\.png$/, "-elegance-mobile.png"), fullPage: false });

const nsid = "26ab5be2-d182-42cb-98c2-944975f91c2d";
await page.setViewportSize({ width: 1280, height: 800 });
await page.goto(`${base}/#/course/regression/practice/${nsid}`, { waitUntil: "networkidle", timeout: 30000 });
await page.waitForSelector(".prac-page", { timeout: 15000 });
await page.waitForTimeout(300);
const normals = await page.evaluate(() => {
  const text = document.body.innerText;
  return {
    leftover: document.querySelector(".prac-page")?.dataset.pracLeftover === "1",
    title: /Setting up the Normal Equations/i.test(text),
    welcome: text.includes("准备好练习") || /Ready to practice/i.test(text),
    mark: /Hyperknow|Orbie/i.test(text),
  };
});
await page.click("#pracStart");
await page.waitForTimeout(300);
const normalsPlay = await page.evaluate(() => {
  const text = document.body.innerText;
  return {
    prompt: /SSE formula|Normal Equations|x_i/i.test(text),
    image: !!document.querySelector(".board-image svg"),
    check: !!document.querySelector("#pracCheck"),
    mark: /Hyperknow|Orbie/i.test(text),
  };
});
await page.screenshot({ path: shot.replace(/\.png$/, "-normals.png"), fullPage: false });

await page.setViewportSize({ width: 390, height: 844 });
await page.goto(`${base}/#/course/706d4d5c-1b4d-4707-abb0-45fc9b1f4926/practice/${nsid}`, {
  waitUntil: "networkidle",
});
await page.waitForSelector(".prac-page", { timeout: 10000 });
await page.waitForTimeout(250);
const normalsMobile = await page.evaluate(() => {
  const text = document.body.innerText;
  return {
    leftover: document.querySelector(".prac-page")?.dataset.pracLeftover === "1",
    title: /Setting up the Normal Equations|SSE formula/i.test(text),
    mark: /Hyperknow|Orbie/i.test(text),
    w: window.innerWidth,
  };
});
await page.screenshot({ path: shot.replace(/\.png$/, "-normals-mobile.png"), fullPage: false });

const fsid = "672aa1b4-f350-479e-826b-1bcc12ab4519";
await page.setViewportSize({ width: 1280, height: 800 });
await page.goto(`${base}/#/course/regression/practice/${fsid}`, { waitUntil: "networkidle", timeout: 30000 });
await page.waitForSelector(".prac-page", { timeout: 15000 });
await page.waitForTimeout(300);
const formulas = await page.evaluate(() => {
  const text = document.body.innerText;
  return {
    leftover: document.querySelector(".prac-page")?.dataset.pracLeftover === "1",
    title: /Final Formulas|Slope and Intercept/i.test(text),
    welcome: text.includes("准备好练习") || /Ready to practice/i.test(text),
    mark: /Hyperknow|Orbie/i.test(text),
  };
});
await page.click("#pracStart");
await page.waitForTimeout(300);
const formulasPlay = await page.evaluate(() => {
  const text = document.body.innerText;
  return {
    prompt: /OLS formula for the slope|beta1|shared movement/i.test(text),
    image: !!document.querySelector(".board-image svg"),
    check: !!document.querySelector("#pracCheck"),
    mark: /Hyperknow|Orbie/i.test(text),
  };
});
await page.screenshot({ path: shot.replace(/\.png$/, "-formulas.png"), fullPage: false });

await page.setViewportSize({ width: 390, height: 844 });
await page.goto(`${base}/#/course/706d4d5c-1b4d-4707-abb0-45fc9b1f4926/practice/${fsid}`, {
  waitUntil: "networkidle",
});
await page.waitForSelector(".prac-page", { timeout: 10000 });
await page.waitForTimeout(250);
const formulasMobile = await page.evaluate(() => {
  const text = document.body.innerText;
  return {
    leftover: document.querySelector(".prac-page")?.dataset.pracLeftover === "1",
    title: /Final Formulas|Slope and Intercept|beta1/i.test(text),
    mark: /Hyperknow|Orbie/i.test(text),
    w: window.innerWidth,
  };
});
await page.screenshot({ path: shot.replace(/\.png$/, "-formulas-mobile.png"), fullPage: false });

const hsid = "2a8918ce-3935-44ba-8139-24c5c9f20f3b";
await page.setViewportSize({ width: 1280, height: 800 });
await page.goto(`${base}/#/course/regression/practice/${hsid}`, { waitUntil: "networkidle", timeout: 30000 });
await page.waitForSelector(".prac-page", { timeout: 15000 });
await page.waitForTimeout(300);
const planes = await page.evaluate(() => {
  const text = document.body.innerText;
  return {
    leftover: document.querySelector(".prac-page")?.dataset.pracLeftover === "1",
    title: /From Lines to Hyperplanes/i.test(text),
    welcome: text.includes("准备好练习") || /Ready to practice/i.test(text),
    mark: /Hyperknow|Orbie/i.test(text),
  };
});
await page.click("#pracStart");
await page.waitForTimeout(300);
const planesPlay = await page.evaluate(() => {
  const text = document.body.innerText;
  return {
    prompt: /3D regression|residual|X1 and X2/i.test(text),
    image: !!document.querySelector(".board-image svg"),
    check: !!document.querySelector("#pracCheck"),
    mark: /Hyperknow|Orbie/i.test(text),
  };
});
await page.screenshot({ path: shot.replace(/\.png$/, "-hyperplanes.png"), fullPage: false });

await page.setViewportSize({ width: 390, height: 844 });
await page.goto(`${base}/#/course/706d4d5c-1b4d-4707-abb0-45fc9b1f4926/practice/${hsid}`, {
  waitUntil: "networkidle",
});
await page.waitForSelector(".prac-page", { timeout: 10000 });
await page.waitForTimeout(250);
const planesMobile = await page.evaluate(() => {
  const text = document.body.innerText;
  return {
    leftover: document.querySelector(".prac-page")?.dataset.pracLeftover === "1",
    title: /From Lines to Hyperplanes|3D regression|residual/i.test(text),
    mark: /Hyperknow|Orbie/i.test(text),
    w: window.innerWidth,
  };
});
await page.screenshot({ path: shot.replace(/\.png$/, "-hyperplanes-mobile.png"), fullPage: false });
await browser.close();

const report = { intro, play, checked, mobile, cloud, cloudPlay, cloudMobile, pencil, pencilPlay, pencilMobile, gaps, gapsPlay, gapsMobile, tug, tugPlay, tugMobile, springs, springsPlay, springsMobile, leverage, leveragePlay, leverageMobile, residuals, residualsPlay, residualsMobile, objective, objectivePlay, objectiveMobile, squares, squaresPlay, squaresMobile, elegance, elegancePlay, eleganceMobile, normals, normalsPlay, normalsMobile, formulas, formulasPlay, formulasMobile, planes, planesPlay, planesMobile, errors, shot };
console.log(JSON.stringify(report, null, 2));
writeFileSync(shot.replace(/\.png$/, ".json"), JSON.stringify(report, null, 2));

if (errors.length) {
  console.error("PAGE_ERRORS", errors);
  process.exit(1);
}
if (!intro.leftover || !intro.welcome || !intro.title || !intro.gotIt || intro.mark) {
  console.error("PRAC_INTRO_FAIL", intro);
  process.exit(1);
}
if (!play.prompt || !play.check || !play.skip || play.opts < 2 || play.mark) {
  console.error("PRAC_PLAY_FAIL", play);
  process.exit(1);
}
if (!checked.feedback) {
  console.error("PRAC_CHECK_FAIL", checked);
  process.exit(1);
}
if (!mobile.leftover || !mobile.title || mobile.mark || mobile.w > 420) {
  console.error("PRAC_MOBILE_FAIL", mobile);
  process.exit(1);
}
if (!cloud.leftover || !cloud.title || !cloud.welcome || cloud.mark) {
  console.error("PRAC_CLOUD_FAIL", cloud);
  process.exit(1);
}
if (!cloudPlay.prompt || !cloudPlay.image || !cloudPlay.check || cloudPlay.mark) {
  console.error("PRAC_CLOUD_PLAY_FAIL", cloudPlay);
  process.exit(1);
}
if (!cloudMobile.leftover || !cloudMobile.title || cloudMobile.mark || cloudMobile.w > 420) {
  console.error("PRAC_CLOUD_MOBILE_FAIL", cloudMobile);
  process.exit(1);
}
if (!pencil.leftover || !pencil.title || !pencil.welcome || pencil.mark) {
  console.error("PRAC_PENCIL_FAIL", pencil);
  process.exit(1);
}
if (!pencilPlay.prompt || !pencilPlay.image || !pencilPlay.check || pencilPlay.mark) {
  console.error("PRAC_PENCIL_PLAY_FAIL", pencilPlay);
  process.exit(1);
}
if (!pencilMobile.leftover || !pencilMobile.title || pencilMobile.mark || pencilMobile.w > 420) {
  console.error("PRAC_PENCIL_MOBILE_FAIL", pencilMobile);
  process.exit(1);
}
if (!gaps.leftover || !gaps.title || !gaps.welcome || gaps.mark) {
  console.error("PRAC_GAPS_FAIL", gaps);
  process.exit(1);
}
if (!gapsPlay.prompt || !gapsPlay.image || !gapsPlay.check || gapsPlay.mark) {
  console.error("PRAC_GAPS_PLAY_FAIL", gapsPlay);
  process.exit(1);
}
if (!gapsMobile.leftover || !gapsMobile.title || gapsMobile.mark || gapsMobile.w > 420) {
  console.error("PRAC_GAPS_MOBILE_FAIL", gapsMobile);
  process.exit(1);
}
if (!tug.leftover || !tug.title || !tug.welcome || tug.mark) {
  console.error("PRAC_TUG_FAIL", tug);
  process.exit(1);
}
if (!tugPlay.prompt || !tugPlay.image || !tugPlay.check || tugPlay.mark) {
  console.error("PRAC_TUG_PLAY_FAIL", tugPlay);
  process.exit(1);
}
if (!tugMobile.leftover || !tugMobile.title || tugMobile.mark || tugMobile.w > 420) {
  console.error("PRAC_TUG_MOBILE_FAIL", tugMobile);
  process.exit(1);
}
if (!springs.leftover || !springs.title || !springs.welcome || springs.mark) {
  console.error("PRAC_SPRINGS_FAIL", springs);
  process.exit(1);
}
if (!springsPlay.prompt || !springsPlay.image || !springsPlay.check || springsPlay.mark) {
  console.error("PRAC_SPRINGS_PLAY_FAIL", springsPlay);
  process.exit(1);
}
if (!springsMobile.leftover || !springsMobile.title || springsMobile.mark || springsMobile.w > 420) {
  console.error("PRAC_SPRINGS_MOBILE_FAIL", springsMobile);
  process.exit(1);
}
if (!leverage.leftover || !leverage.title || !leverage.welcome || leverage.mark) {
  console.error("PRAC_LEVERAGE_FAIL", leverage);
  process.exit(1);
}
if (!leveragePlay.prompt || !leveragePlay.image || !leveragePlay.check || leveragePlay.mark) {
  console.error("PRAC_LEVERAGE_PLAY_FAIL", leveragePlay);
  process.exit(1);
}
if (!leverageMobile.leftover || !leverageMobile.title || leverageMobile.mark || leverageMobile.w > 420) {
  console.error("PRAC_LEVERAGE_MOBILE_FAIL", leverageMobile);
  process.exit(1);
}
if (!residuals.leftover || !residuals.title || !residuals.welcome || residuals.mark) {
  console.error("PRAC_RESIDUALS_FAIL", residuals);
  process.exit(1);
}
if (!residualsPlay.prompt || !residualsPlay.image || !residualsPlay.check || residualsPlay.mark) {
  console.error("PRAC_RESIDUALS_PLAY_FAIL", residualsPlay);
  process.exit(1);
}
if (!residualsMobile.leftover || !residualsMobile.title || residualsMobile.mark || residualsMobile.w > 420) {
  console.error("PRAC_RESIDUALS_MOBILE_FAIL", residualsMobile);
  process.exit(1);
}
if (!objective.leftover || !objective.title || !objective.welcome || objective.mark) {
  console.error("PRAC_OBJECTIVE_FAIL", objective);
  process.exit(1);
}
if (!objectivePlay.prompt || !objectivePlay.image || !objectivePlay.check || objectivePlay.mark) {
  console.error("PRAC_OBJECTIVE_PLAY_FAIL", objectivePlay);
  process.exit(1);
}
if (!objectiveMobile.leftover || !objectiveMobile.title || objectiveMobile.mark || objectiveMobile.w > 420) {
  console.error("PRAC_OBJECTIVE_MOBILE_FAIL", objectiveMobile);
  process.exit(1);
}
if (!squares.leftover || !squares.title || !squares.welcome || squares.mark) {
  console.error("PRAC_SQUARES_FAIL", squares);
  process.exit(1);
}
if (!squaresPlay.prompt || !squaresPlay.image || !squaresPlay.check || squaresPlay.mark) {
  console.error("PRAC_SQUARES_PLAY_FAIL", squaresPlay);
  process.exit(1);
}
if (!squaresMobile.leftover || !squaresMobile.title || squaresMobile.mark || squaresMobile.w > 420) {
  console.error("PRAC_SQUARES_MOBILE_FAIL", squaresMobile);
  process.exit(1);
}
if (!elegance.leftover || !elegance.title || !elegance.welcome || elegance.mark) {
  console.error("PRAC_ELEGANCE_FAIL", elegance);
  process.exit(1);
}
if (!elegancePlay.prompt || !elegancePlay.image || !elegancePlay.check || elegancePlay.mark) {
  console.error("PRAC_ELEGANCE_PLAY_FAIL", elegancePlay);
  process.exit(1);
}
if (!eleganceMobile.leftover || !eleganceMobile.title || eleganceMobile.mark || eleganceMobile.w > 420) {
  console.error("PRAC_ELEGANCE_MOBILE_FAIL", eleganceMobile);
  process.exit(1);
}
if (!normals.leftover || !normals.title || !normals.welcome || normals.mark) {
  console.error("PRAC_NORMALS_FAIL", normals);
  process.exit(1);
}
if (!normalsPlay.prompt || !normalsPlay.image || !normalsPlay.check || normalsPlay.mark) {
  console.error("PRAC_NORMALS_PLAY_FAIL", normalsPlay);
  process.exit(1);
}
if (!normalsMobile.leftover || !normalsMobile.title || normalsMobile.mark || normalsMobile.w > 420) {
  console.error("PRAC_NORMALS_MOBILE_FAIL", normalsMobile);
  process.exit(1);
}
if (!formulas.leftover || !formulas.title || !formulas.welcome || formulas.mark) {
  console.error("PRAC_FORMULAS_FAIL", formulas);
  process.exit(1);
}
if (!formulasPlay.prompt || !formulasPlay.image || !formulasPlay.check || formulasPlay.mark) {
  console.error("PRAC_FORMULAS_PLAY_FAIL", formulasPlay);
  process.exit(1);
}
if (!formulasMobile.leftover || !formulasMobile.title || formulasMobile.mark || formulasMobile.w > 420) {
  console.error("PRAC_FORMULAS_MOBILE_FAIL", formulasMobile);
  process.exit(1);
}
if (!planes.leftover || !planes.title || !planes.welcome || planes.mark) {
  console.error("PRAC_PLANES_FAIL", planes);
  process.exit(1);
}
if (!planesPlay.prompt || !planesPlay.image || !planesPlay.check || planesPlay.mark) {
  console.error("PRAC_PLANES_PLAY_FAIL", planesPlay);
  process.exit(1);
}
if (!planesMobile.leftover || !planesMobile.title || planesMobile.mark || planesMobile.w > 420) {
  console.error("PRAC_PLANES_MOBILE_FAIL", planesMobile);
  process.exit(1);
}
