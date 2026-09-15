import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import assert from "node:assert/strict";
import test from "node:test";
import {
  PDF,
  chalkMath,
  craftedPdfId,
  craftPdfGuideSession,
  followUpPdfSession,
  parsePdfReplay,
  pdfSessionState,
  registerPdfSession,
} from "../src/domain/pdf.mjs";
import { PYTHAGOREAN, STATS_NOTES } from "../src/domain/pdf-catalog.mjs";
import { ingestCourse, listSessions } from "../src/domain/course.mjs";
import { ingestLmsPayload, lmsCoursesToAnyknowDrafts } from "../src/domain/lms.mjs";
import { runCreateBoardSession } from "../src/agent/runtime.mjs";
import { createAccount } from "../src/domain/credits.mjs";
import { createHeuristicModel } from "../src/server/heuristic.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const pdfSrc = readFileSync(join(root, "src/domain/pdf.mjs"), "utf8");
const app = readFileSync(join(root, "src/web/app.js"), "utf8");

test("leftover Pythagorean dump plays speak/annotation/ask/done without Agent.generate", () => {
  const parsed = parsePdfReplay(PYTHAGOREAN);
  const types = parsed.frames.map((f) => f.type);
  assert.ok(types.includes("session_ready"));
  assert.ok(types.includes("sync_pdf_state"));
  assert.ok(types.includes("speak"));
  assert.ok(types.includes("annotation"));
  assert.ok(types.includes("ask"));
  assert.ok(types.includes("done"));
  const kinds = parsed.frames.filter((f) => f.type === "annotation").map((f) => f.kind);
  assert.deepEqual(new Set(kinds), new Set(["highlight", "circle", "annotate"]));
  const formula = parsed.frames.find((f) => /核心公式/.test(f.say || ""));
  assert.match(formula.say, /\$a\^2 \+ b\^2 = c\^2\$/);
  assert.doesNotMatch(JSON.stringify(parsed), /tts_url|hyperknow|orbie/i);
  assert.equal("replay" in PDF, false);
  assert.doesNotMatch(pdfSrc, /async function generate|pdfAnnotation\.replay/);
  assert.doesNotMatch(app, /pdfAnnotation\.replay/);
});

test("pdf session state wires pause/resume/restarted/resumedConversation leftover copy", () => {
  assert.equal(PDF.pause, "暂停");
  assert.equal(PDF.resume, "继续");
  assert.equal(PDF.restarted, "旧会话不可用，已开启新会话。");
  assert.equal(PDF.resumedConversation, "已恢复对话，请在右侧输入你的问题以继续讲解。");
  const miss = pdfSessionState({ id: "" });
  assert.equal(miss.ok, false);
  assert.equal(miss.title, PDF.sessionTitleFallback);
  const stale = pdfSessionState({ id: "missing-session" });
  assert.equal(stale.ok, true);
  assert.equal(stale.restarted, true);
  assert.match(stale.transcript.map((t) => t.say || t.question).join("\n"), /核心公式/);
  const live = pdfSessionState({ id: "pythagorean" });
  assert.equal(live.ok, true);
  assert.equal(live.restarted, false);
  assert.equal(live.resumed, false);
  const uuid = pdfSessionState({ id: "b5b76655-e298-4560-9920-e00034cd51a2" });
  assert.equal(uuid.ok, true);
  assert.equal(uuid.restarted, false);
  const resumed = pdfSessionState({ id: "pythagorean-resume" });
  assert.equal(resumed.resumed, true);
  assert.equal(resumed.restarted, false);
  const paused = pdfSessionState({ id: "pythagorean", paused: true });
  assert.equal(paused.paused, true);
});

test("leftover Statistics Notes PDF dump plays CLT and H0/H1 chalkboard marks", () => {
  const catalog = readFileSync(join(root, "src/domain/pdf-catalog.mjs"), "utf8");
  const parsed = parsePdfReplay(STATS_NOTES);
  assert.ok(parsed.frames.some((f) => f.type === "speak"));
  assert.ok(parsed.frames.some((f) => f.type === "annotation" && f.kind === "highlight"));
  assert.ok(parsed.frames.some((f) => f.type === "annotation" && f.kind === "circle"));
  const clt = parsed.frames.find((f) => /Central Limit Theorem|CLT/i.test(f.say || f.text || ""));
  assert.ok(clt);
  const hypo = parsed.frames.find((f) => /H_0|H₀|Null Hypothesis/i.test(f.say || ""));
  assert.ok(hypo);
  const live = pdfSessionState({ id: "stats-notes" });
  assert.equal(live.ok, true);
  assert.equal(live.restarted, false);
  assert.equal(live.resumed, true);
  assert.equal(live.filename, "stats_notes.pdf");
  assert.ok(live.ink.some((row) => row.text === "CLT"));
  assert.ok(live.ink.some((row) => /H₀/.test(row.text)));
  assert.equal(live.formula, false);
  const uuid = pdfSessionState({ id: "3ae6a64dc031429c99390b52715e84fd" });
  assert.equal(uuid.restarted, false);
  const painted = JSON.stringify({ parsed, live });
  assert.doesNotMatch(painted, /tts_url|hyperknow|orbie|rk\d+/i);
  assert.doesNotMatch(catalog, /tts_url|hyperknow|orbie|rk\d+/i);
  const pythag = pdfSessionState({ id: "pythagorean" });
  assert.ok(pythag.ink.some((row) => /a² \+ b² = c²/.test(row.text)));
});

test("chalk math keeps leftover Pythagorean formula readable", () => {
  assert.equal(chalkMath("这就是核心公式：$a^2 + b^2 = c^2$"), "这就是核心公式：a² + b² = c²");
  assert.match(chalkMath("计算 $3^2 + 4^2$ 的结果是多少？"), /3² \+ 4²/);
});

test("LMS pdf-annotate sessions learn into leftover pdf-session replay", () => {
  const [draft] = lmsCoursesToAnyknowDrafts(
    ingestLmsPayload({
      school: "Example University",
      courses: [{ id: "geo1", name: "Geometry", files: [{ filename: "pythagorean.pdf", text: "a^2+b^2=c^2" }] }],
    }),
  );
  const course = ingestCourse(draft);
  const session = listSessions(course)[0].session;
  assert.equal(session.sessionType, "pdf-annotate");
  assert.match(session.learn.href, /^\/pdf-session\//);
  assert.match(app, /\/pdf-session\//);
  assert.match(app, /sessions\/pdf-annotate/);
  assert.doesNotMatch(app, /pdfAnnotation\.replay/);
});

test("craftPdfGuideSession walks an upload with go_to_page speak highlight circle annotate", () => {
  const session = craftPdfGuideSession({
    topic: "[chip:board] 细胞笔记",
    sourceName: "cell-notes.txt",
    sourceText:
      "Mitosis is nuclear division that produces two genetically identical daughter nuclei. Interphase comes first.\n\nMeiosis produces haploid gametes. Homologous chromosomes pair then separate.\n\nPhotosynthesis converts light energy into chemical energy in chloroplasts.",
  });
  assert.equal(craftedPdfId(session.id), true);
  assert.equal(session.kind, "pdf");
  assert.equal(session.filename, "cell-notes.txt");
  const types = session.frames.map((f) => f.type);
  assert.ok(types.includes("session_ready"));
  assert.ok(types.includes("sync_pdf_state"));
  assert.ok(types.includes("go_to_page"));
  assert.ok(types.includes("speak"));
  assert.ok(types.includes("annotation"));
  assert.ok(types.includes("ask"));
  assert.ok(types.includes("done"));
  const kinds = new Set(
    session.frames.filter((f) => f.type === "annotation").map((f) => f.kind || f.annotation_type),
  );
  assert.ok(kinds.has("highlight"));
  assert.ok(kinds.has("circle"));
  assert.ok(kinds.has("annotate"));
  assert.doesNotMatch(
    JSON.stringify(session),
    /pythagorean|stats_notes|hyperknow|orbie|248fd02f72be4bad82bcdd347b8bf237/i,
  );
  registerPdfSession(session);
  const live = pdfSessionState({ id: session.id });
  assert.equal(live.ok, true);
  assert.equal(live.restarted, false);
  assert.match(live.filename, /cell-notes/);
  assert.ok(live.marks.length >= 1);
  assert.ok(live.page >= 1);
  const miss = pdfSessionState({ id: "pdf_missing" });
  assert.equal(miss.ok, false);
  assert.equal(miss.restarted, false);
  assert.doesNotMatch(JSON.stringify(miss), /核心公式|CLT/);
});

test("pdf follow-up stays on the same pdf_* session and does not load leftover dump", () => {
  const session = craftPdfGuideSession({
    topic: "细胞笔记",
    sourceName: "cell-notes.txt",
    sourceText:
      "Mitosis is nuclear division that produces two identical nuclei. The cell cycle includes interphase.\n\nMeiosis produces haploid gametes rather than clones.",
  });
  const id = session.id;
  const next = followUpPdfSession({ id, question: "有丝分裂发生在哪一页？" });
  assert.equal(next.id, id);
  assert.equal(craftedPdfId(next.id), true);
  assert.ok(next.frames.some((f) => f.type === "user" && /有丝分裂/.test(f.text)));
  const live = pdfSessionState({ id });
  assert.equal(live.sessionId, id);
  assert.equal(live.restarted, false);
  assert.ok(live.transcript.some((t) => t.type === "user"));
  assert.doesNotMatch(JSON.stringify(live), /pythagorean|stats_notes|hyperknow|orbie/i);
});

test("create_board_session with an upload returns a pdf_* 导读 not leftover dump", async () => {
  const account = createAccount({ email: "pdf-board@anyknow.test", password: "x", credits: 20 });
  const { session, kind, sessionId } = await runCreateBoardSession({
    account,
    prompt: "导读这份笔记",
    files: [
      {
        filename: "cell-notes.txt",
        text: "Mitosis is nuclear division that produces two identical nuclei. Interphase first.\n\nMeiosis produces haploid gametes. Homologs separate.",
      },
    ],
    model: createHeuristicModel(),
  });
  assert.equal(kind, "pdf");
  assert.equal(craftedPdfId(sessionId), true);
  assert.equal(session.kind, "pdf");
  assert.ok(session.frames.some((f) => f.type === "go_to_page"));
  assert.doesNotMatch(JSON.stringify(session), /pythagorean|stats_notes|hyperknow|orbie/i);
});
