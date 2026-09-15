import { chromium } from "playwright";
import { writeFileSync } from "node:fs";

const origin = process.env.ANYKNOW_URL || "http://127.0.0.1:4173";
const base = origin.replace(/\/$/, "");
const shot = process.env.SHOT || "assist-cheatsheet.png";
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
await page.click('[data-assist-chip="pack"]');
await page.waitForTimeout(150);
await page.fill("#prompt", "帮我做一张两页速查表：微积分");
await page.click("#send");
await page.waitForSelector("[data-open-cheat], [data-resp-quiz]", { timeout: 25000 });
await page.click("[data-open-cheat]");
await page.waitForSelector("[data-cheat-spread], .cheat-sheet", { timeout: 20000 });
await page.waitForTimeout(400);

const desktop = await page.evaluate(() => {
  const text = document.body.innerText;
  return {
    spread: !!document.querySelector("[data-cheat-spread]"),
    pages: document.querySelectorAll("[data-cheat-page]").length,
    cols: document.querySelector(".cheat-cols-2"),
    pdf: !!document.querySelector("#cheatPdf"),
    cite: /公开教材|4-10|2-2|3-1|limit|derivative|antiderivative/i.test(text),
    quiz: /测验/.test(text),
    cards: /闪卡/.test(text),
    mark: /Hyperknow|Orbie/i.test(text),
  };
});
await page.screenshot({ path: shot, fullPage: false });

const pdfRes = await page.request.post(`${base}/api/materials/pdf`, {
  data: {
    cheatsheet: {
      title: "微积分 速查表",
      basedOn: "4-10-antiderivatives.md",
      sections: [
        { heading: "定义", bullets: ["antiderivative"], cite: "4-10-antiderivatives.md" },
        { heading: "机制", bullets: ["integral"], cite: "4-10-antiderivatives.md" },
        { heading: "公式 / 关系", bullets: ["F'+C"] },
        { heading: "例子", bullets: ["power"] },
        { heading: "易错", bullets: ["条件"] },
        { heading: "自检", bullets: ["换例子"] },
      ],
    },
    columns: 2,
    density: "normal",
  },
});
const pdfBuf = Buffer.from(await pdfRes.body());
const pdfOk = pdfRes.ok() && pdfBuf.slice(0, 5).toString() === "%PDF-";

await page.click('[data-cheat-cols="1"]');
await page.waitForTimeout(150);
const oneCol = await page.evaluate(() => !!document.querySelector(".cheat-cols-1"));

await page.setViewportSize({ width: 390, height: 844 });
await page.waitForTimeout(250);
const mobile = await page.evaluate(() => ({
  spread: !!document.querySelector("[data-cheat-spread]"),
  w: window.innerWidth,
  mark: /Hyperknow|Orbie/i.test(document.body.innerText),
}));
await page.screenshot({ path: shot.replace(/\.png$/, "-mobile.png"), fullPage: false });
await browser.close();

const report = { desktop, oneCol, pdfOk, pdfBytes: pdfBuf.length, mobile, errors, shot };
console.log(JSON.stringify(report, null, 2));
writeFileSync(shot.replace(/\.png$/, ".json"), JSON.stringify(report, null, 2));

if (errors.length) {
  console.error("PAGE_ERRORS", errors);
  process.exit(1);
}
if (!desktop.spread || desktop.pages !== 2 || !desktop.cols || !desktop.pdf || !desktop.cite || !desktop.quiz || !desktop.cards || desktop.mark) {
  console.error("ASSIST_CHEAT_FAIL", desktop);
  process.exit(1);
}
if (!oneCol || !pdfOk) {
  console.error("ASSIST_CHEAT_PDF_FAIL", { oneCol, pdfOk });
  process.exit(1);
}
if (!mobile.spread || mobile.mark || mobile.w > 420) {
  console.error("ASSIST_CHEAT_MOBILE_FAIL", mobile);
  process.exit(1);
}
