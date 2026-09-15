import { chromium } from "playwright";
import { writeFileSync } from "node:fs";

const origin = process.env.ANYKNOW_URL || "http://127.0.0.1:4173";
const base = origin.replace(/\/$/, "");
const shot = process.env.SHOT || "assist-pdf.png";
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
await page.click("#assistToolsBtn");
await page.waitForTimeout(150);
await page.click('[data-assist-tool="board"]');
await page.waitForTimeout(150);
await page.setInputFiles("#file", {
  name: "cell-notes.txt",
  mimeType: "text/plain",
  buffer: Buffer.from(
    "Mitosis is nuclear division that produces two genetically identical daughter nuclei. Interphase comes first.\n\nMeiosis produces haploid gametes. Homologous chromosomes pair then separate.\n\nPhotosynthesis converts light energy into chemical energy in chloroplasts.",
  ),
});
await page.waitForTimeout(150);
await page.fill("#prompt", "导读这份笔记");
await page.click("#send");
await page.waitForSelector(".pdf-session, .pdf-split", { timeout: 25000 });
await page.waitForTimeout(400);

const desktop = await page.evaluate(() => {
  const text = document.body.innerText;
  const hash = location.hash || "";
  return {
    hash,
    split: !!document.querySelector(".pdf-split"),
    crafted: /#\/pdf-session\/pdf_/.test(hash),
    leftover: /pythagorean|stats-notes|248fd02f72be4bad82bcdd347b8bf237|核心公式/i.test(hash + text),
    go: /第\d+页|cell-notes/i.test(text),
    mark: /Hyperknow|Orbie/i.test(text),
    highlight: !!document.querySelector('[data-pdf-kind="highlight"]'),
  };
});
await page.screenshot({ path: shot, fullPage: false });

const hashBefore = await page.evaluate(() => location.hash);
await page.fill("#pdfDraft", "有丝分裂在哪一页？");
await page.click("#pdfSend");
await page.waitForTimeout(900);
const follow = await page.evaluate((before) => {
  const text = document.body.innerText;
  return {
    sameId: location.hash === before,
    leftover: /pythagorean|stats-notes|核心公式/i.test(location.hash + text),
    userQ: /有丝分裂在哪一页/.test(text),
    mark: /Hyperknow|Orbie/i.test(text),
  };
}, hashBefore);
await page.screenshot({ path: shot.replace(/\.png$/, "-follow.png"), fullPage: false });

await page.setViewportSize({ width: 390, height: 844 });
await page.waitForTimeout(200);
const mobile = await page.evaluate(() => ({
  split: !!document.querySelector(".pdf-split"),
  leftover: /核心公式|Geometric Heart/i.test(document.body.innerText),
  w: window.innerWidth,
  mark: /Hyperknow|Orbie/i.test(document.body.innerText),
}));
await page.screenshot({ path: shot.replace(/\.png$/, "-mobile.png"), fullPage: false });
await browser.close();

const report = { desktop, follow, mobile, errors, shot };
console.log(JSON.stringify(report, null, 2));
writeFileSync(shot.replace(/\.png$/, ".json"), JSON.stringify(report, null, 2));

if (errors.length) {
  console.error("PAGE_ERRORS", errors);
  process.exit(1);
}
if (!desktop.crafted || !desktop.split || desktop.leftover || !desktop.go || desktop.mark) {
  console.error("ASSIST_PDF_FAIL", desktop);
  process.exit(1);
}
if (!follow.sameId || follow.leftover || !follow.userQ || follow.mark) {
  console.error("ASSIST_PDF_FOLLOW_FAIL", follow);
  process.exit(1);
}
if (!mobile.split || mobile.leftover || mobile.mark || mobile.w > 420) {
  console.error("ASSIST_PDF_MOBILE_FAIL", mobile);
  process.exit(1);
}
