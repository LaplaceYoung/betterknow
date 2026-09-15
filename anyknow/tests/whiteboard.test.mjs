import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import assert from "node:assert/strict";
import test from "node:test";
import {
  WB,
  WB_STORAGE,
  chalkMath,
  craftedWhiteboardId,
  craftWhiteboardSession,
  followUpWhiteboardSession,
  hasWhiteboardLeftover,
  parseWhiteboardReplay,
  registerWhiteboardSession,
  whiteboardSessionState,
} from "../src/domain/whiteboard.mjs";
import { createDrive } from "../src/domain/kb.mjs";
import { seedPublicTextbooks } from "../src/server/seed.mjs";
import { PYTHAGOREAN, REGRESSION, DERIVATIVES } from "../src/domain/whiteboard-catalog.mjs";
import { ingestCourse } from "../src/domain/course.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const wbSrc = readFileSync(join(root, "src/domain/whiteboard.mjs"), "utf8");
const app = readFileSync(join(root, "src/web/app.js"), "utf8");
const sociology = JSON.parse(readFileSync(join(root, "fixtures/sociology-course.json"), "utf8"));

test("leftover whiteboard dumps play session_ready/board/speak without live tools", () => {
  const parsed = parseWhiteboardReplay(PYTHAGOREAN);
  const types = parsed.frames.map((f) => f.type);
  assert.ok(types.includes("session_ready"));
  assert.ok(types.includes("board"));
  assert.ok(types.includes("animation"));
  const formula = parsed.frames.find((f) => f.type === "board");
  assert.match(formula.content, /\$a\^2 \+ b\^2 = c\^2\$/);
  assert.equal(parsed.resumed, true);
  const regression = parseWhiteboardReplay(REGRESSION);
  assert.ok(regression.frames.some((f) => f.type === "speak"));
  assert.ok(regression.frames.some((f) => f.type === "circle"));
  assert.ok(regression.frames.some((f) => f.type === "image"));
  assert.match(regression.boards.map((b) => b.content).join("\n"), /Geometric Anchor/);
  const deriv = parseWhiteboardReplay(DERIVATIVES);
  assert.ok(deriv.frames.some((f) => f.type === "speak"));
  assert.match(deriv.frames.find((f) => f.type === "speak").say, /derivative/i);
  const painted = JSON.stringify({ parsed, regression, deriv });
  assert.doesNotMatch(painted, /tts_url|audio_url|hyperknow|orbie|rk\d+/i);
  assert.equal("replay" in WB, false);
  assert.doesNotMatch(wbSrc, /async function generate/);
  assert.doesNotMatch(app, /Excalidraw/);
  assert.match(app, /ttsVoiceConfig/);
});

test("whiteboard session state wires pause/resume/restarted leftover copy", () => {
  assert.equal(WB.pause, "暂停");
  assert.equal(WB.resume, "继续");
  assert.equal(WB.restarted, "旧会话不可用，已开启新会话。");
  assert.equal(WB.resumedConversation, "已恢复对话，请在右侧输入你的问题以继续讲解。");
  assert.equal(WB_STORAGE, "whiteboard_session_id");
  const miss = whiteboardSessionState({ id: "" });
  assert.equal(miss.ok, false);
  assert.equal(miss.title, WB.sessionTitleFallback);
  const stale = whiteboardSessionState({ id: "missing-session" });
  assert.equal(stale.ok, true);
  assert.equal(stale.restarted, true);
  assert.match(stale.latestBoard.content, /\$a\^2 \+ b\^2 = c\^2\$/);
  const live = whiteboardSessionState({ id: "pythagorean" });
  assert.equal(live.ok, true);
  assert.equal(live.restarted, false);
  assert.equal(live.resumed, true);
  assert.equal(live.formula, true);
  const uuid = whiteboardSessionState({ id: "248fd02f72be4bad82bcdd347b8bf237" });
  assert.equal(uuid.ok, true);
  assert.equal(uuid.restarted, false);
  const resumed = whiteboardSessionState({ id: "pythagorean-resume" });
  assert.equal(resumed.resumed, true);
  const basics = whiteboardSessionState({ id: "pythagorean-basics" });
  assert.match(basics.transcript.map((t) => t.say).join("\n"), /Pythagorean Theorem/);
  const paused = whiteboardSessionState({ id: "pythagorean", paused: true });
  assert.equal(paused.paused, true);
  const cloud = whiteboardSessionState({ id: "regression" });
  assert.equal(cloud.resumed, false);
  assert.equal(cloud.restarted, false);
  assert.match(cloud.title, /Scatterplots and Correlation/);
});

test("chalkboard math keeps leftover Pythagorean formula readable on the board", () => {
  assert.equal(chalkMath("Pythagorean Theorem\n\n$a^2 + b^2 = c^2$"), "Pythagorean Theorem\n\na² + b² = c²");
});

test("course whiteboard leftover ids replay; ordinary sessions stay learn overlays", () => {
  assert.equal(hasWhiteboardLeftover("pythagorean"), true);
  assert.equal(hasWhiteboardLeftover("soc-imagination"), false);
  const course = ingestCourse(sociology);
  const session = course.units[0].lectures[0].sessions[0];
  assert.match(session.learn.href, /sessions\/whiteboard\//);
  assert.equal(hasWhiteboardLeftover(session.sessionId), false);
  assert.match(app, /\/whiteboard\//);
  assert.match(app, /hasWhiteboardLeftover/);
  assert.match(app, /whiteboard_session_id/);
  assert.match(app, /whiteboard-chalk\.jpg/);
  assert.match(app, /\/api\/whiteboard\/create/);
});

test("craftWhiteboardSession builds a chalkboard lesson from 公开教材 not leftover dump", () => {
  const drive = seedPublicTextbooks(createDrive({ ownerId: "wb-oer" }));
  const session = craftWhiteboardSession({ topic: "微积分", drive });
  assert.equal(craftedWhiteboardId(session.id), true);
  assert.match(session.basedOn, /limit|derivative|calculus|fundamental/i);
  const types = session.frames.map((f) => f.type);
  assert.deepEqual(
    ["session_ready", "board", "speak", "generated_image", "generated_animation", "ask", "done"].every((t) =>
      types.includes(t),
    ),
    true,
  );
  const painted = JSON.stringify(session);
  assert.doesNotMatch(painted, /hyperknow|orbie|248fd02f72be4bad82bcdd347b8bf237/i);
  assert.match(session.frames.find((f) => f.type === "board").board_content, /公开教材/);
  registerWhiteboardSession(session);
  const live = whiteboardSessionState({ id: session.id });
  assert.equal(live.ok, true);
  assert.equal(live.restarted, false);
  assert.equal(live.sessionId, session.id);
  assert.match(live.title, /微积分/);
  assert.doesNotMatch(live.title, /Create a chalkboard|chip:board/i);
  const missingCraft = whiteboardSessionState({ id: "wb_missing" });
  assert.equal(missingCraft.ok, false);
  assert.equal(missingCraft.restarted, false);
});

test("follow-up ask stays on the same wb_* session and does not load leftover dump", () => {
  const drive = seedPublicTextbooks(createDrive({ ownerId: "wb-follow" }));
  const session = craftWhiteboardSession({ topic: "微积分", drive });
  const id = session.id;
  const next = followUpWhiteboardSession({ id, question: "导数的定义是什么", drive });
  assert.equal(next.id, id);
  assert.equal(craftedWhiteboardId(next.id), true);
  const users = next.frames.filter((f) => f.type === "user");
  assert.equal(users.length, 1);
  assert.match(users[0].text, /导数/);
  assert.ok(next.frames.filter((f) => f.type === "speak").length >= 2);
  assert.ok(next.frames.filter((f) => f.type === "board").length >= 2);
  assert.ok(next.frames.some((f) => f.type === "ask"));
  const painted = JSON.stringify(next);
  assert.doesNotMatch(painted, /248fd02f72be4bad82bcdd347b8bf237|hyperknow|orbie/i);
  const live = whiteboardSessionState({ id });
  assert.equal(live.sessionId, id);
  assert.equal(live.restarted, false);
  assert.ok(live.transcript.some((t) => t.type === "user"));
  assert.throws(
    () => followUpWhiteboardSession({ id: "248fd02f72be4bad82bcdd347b8bf237", question: "x", drive }),
    (err) => err.code === "NOT_FOUND",
  );
});
