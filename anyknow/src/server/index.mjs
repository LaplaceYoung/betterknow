import { createServer } from "node:http";
import { readFileSync, existsSync } from "node:fs";
import { extname, join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { Agent } from "../agent/framework.mjs";
import { runBoardImage, runCraftCourse, runCreateBoardSession, runCreateDeepLearnSession, runGenerateMaterials, runHtmlAnimation, runInstantAssist, runInstructionalVideo, runStudyPlan, runTutorHint, runVisualWalkthrough } from "../agent/runtime.mjs";
import { approveFeedTasks, skipAndRedistribute } from "../domain/feed.mjs";
import {
  extendCourseWithFile,
  ingestCourse,
  joinCourse,
  markExamProgress,
  markProjectProgress,
  markSessionProgress,
  openLearnSession,
  openPracticeSession,
} from "../domain/course.mjs";
import { ingestLmsPayload, lmsCoursesToAnyknowDrafts } from "../domain/lms.mjs";
import { examBank, gradeExam } from "../domain/exam.mjs";
import { buildLearningFeed } from "../domain/plan.mjs";
import { matchTimetableKnowledge, parseTimetable, planFromTimetable } from "../domain/timetable.mjs";
import { createFolder, DEFAULT_QUOTA_BYTES, deleteNode, listTree, searchFiles, uploadFile } from "../domain/kb.mjs";
import {
  checkinsFor,
  driveFor,
  ensureGuest,
  guestSession,
  loadStore,
  loginUser,
  mutateUser,
  publicUser,
  registerUser,
  saveDrive,
  saveStore,
  userFromToken,
} from "./store.mjs";
import { createHeuristicModel } from "./heuristic.mjs";
import { heatmap, recordActivity } from "../domain/streak.mjs";
import { findMessage, markInboxRead, seedInbox } from "../domain/inbox.mjs";
import { appendConversationTurn, conversationMessages, setSessionStar, setStarred } from "../domain/history.mjs";
import { TTS_VOICES, voicesBoard } from "../domain/tts.mjs";
import { previewLine, speakWithSpaceXai } from "./tts.mjs";
import { fulfillMedia, mediaHealth } from "./media.mjs";
import { stampAssistBind } from "../domain/assist.mjs";
import { followUpWhiteboardSession, registerWhiteboardSession } from "../domain/whiteboard.mjs";
import { craftedPdfId, followUpPdfSession, registerPdfSession } from "../domain/pdf.mjs";
import { registerDeepLearnSession } from "../domain/deeplearn.mjs";
import { stampStudyMode, studyAskReady } from "../domain/study-mode.mjs";
import { nextTeachBeat, stampTeachBeat, teachAskReady } from "../domain/teach-beat.mjs";
import { digestAskReady, stampDigestMode } from "../domain/digest.mjs";
import { applyPlanTaskAction, mergeConfirmedPlanTask, planAskReady, stampPlanMode } from "../domain/plan-mode.mjs";
import { craftAskReady, stampCraftMode } from "../domain/craft-mode.mjs";
import { cheatsheetToPdf, paginateCheatsheet } from "../domain/cheatsheet.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "../web");
const domainRoot = join(dirname(fileURLToPath(import.meta.url)), "../domain");
const PORT = Number(process.env.PORT || 4173);

function heuristicModel() {
  return createHeuristicModel();
}

function bumpStreak(store, userId) {
  store.checkins = store.checkins || {};
  store.checkins[userId] = recordActivity(checkinsFor(store, userId));
  saveStore(store);
  return heatmap(store.checkins[userId]);
}

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".mp3": "audio/mpeg",
  ".woff2": "font/woff2",
};

const ttsSampleCache = new Map();

function send(res, status, body, headers = {}) {
  const payload = typeof body === "string" || Buffer.isBuffer(body) ? body : JSON.stringify(body);
  const type =
    headers["content-type"] ||
    (typeof body === "object" && !Buffer.isBuffer(body) ? "application/json; charset=utf-8" : "text/plain; charset=utf-8");
  const nocache = /javascript|text\/css|text\/html/.test(type)
    ? { "cache-control": "no-store, no-cache, must-revalidate, max-age=0", pragma: "no-cache" }
    : {};
  res.writeHead(status, {
    "content-type": type,
    ...nocache,
    ...headers,
  });
  res.end(payload);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (c) => chunks.push(c));
    req.on("end", () => {
      const raw = Buffer.concat(chunks).toString("utf8");
      if (!raw) return resolve({});
      try {
        resolve(JSON.parse(raw));
      } catch (e) {
        reject(e);
      }
    });
    req.on("error", reject);
  });
}

function tokenOf(req) {
  const h = req.headers.authorization || "";
  if (h.startsWith("Bearer ")) return h.slice(7);
  return null;
}

function requireUser(store, req, res) {
  const authed = userFromToken(store, tokenOf(req));
  if (authed) return authed;
  return publicUser(ensureGuest(store));
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url, `http://127.0.0.1:${PORT}`);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  if (req.method === "OPTIONS") return send(res, 204, "");

  try {
    let store = loadStore();

    if (url.pathname === "/api/health") {
      return send(res, 200, {
        ok: true,
        name: "simo know",
        agent: Agent.name,
        tts: Boolean(process.env.XAI_API_KEY),
        media: mediaHealth(),
        byok: true,
      });
    }

    if (url.pathname === "/api/tts/voices" && req.method === "GET") {
      return send(res, 200, voicesBoard({ lang: url.searchParams.get("lang") || "zh" }));
    }

    if (url.pathname === "/api/tts" && req.method === "POST") {
      const body = await readBody(req);
      try {
        const out = await speakWithSpaceXai({
          text: body.text || body.input,
          voiceId: body.voiceId || body.voice_id,
          speed: body.speed,
          lang: body.lang || body.language,
        });
        return send(res, 200, out.bytes, { "content-type": out.contentType || "audio/mpeg" });
      } catch (err) {
        const status = err.code === "TTS_UNAVAILABLE" ? 503 : 400;
        return send(res, status, { error: err.message, code: err.code || "TTS_FAILED" });
      }
    }

    if (url.pathname.startsWith("/tts-samples/") && req.method === "GET") {
      const voiceId = url.pathname.slice("/tts-samples/".length).replace(/\.mp3$/i, "");
      if (!TTS_VOICES.includes(voiceId)) return send(res, 404, { error: "unknown voice" });
      const lang = url.searchParams.get("lang") || "zh";
      const cacheKey = `${voiceId}:${lang}`;
      if (ttsSampleCache.has(cacheKey)) {
        const hit = ttsSampleCache.get(cacheKey);
        return send(res, 200, hit.bytes, { "content-type": hit.contentType || "audio/mpeg" });
      }
      try {
        const out = await speakWithSpaceXai({ text: previewLine(lang), voiceId, speed: 1, lang });
        ttsSampleCache.set(cacheKey, out);
        return send(res, 200, out.bytes, { "content-type": out.contentType || "audio/mpeg" });
      } catch (err) {
        const status = err.code === "TTS_UNAVAILABLE" ? 503 : 400;
        return send(res, status, { error: err.message, code: err.code || "TTS_FAILED" });
      }
    }

    if (url.pathname === "/api/bootstrap" && req.method === "GET") {
      const authed = userFromToken(store, tokenOf(req));
      const guest = authed ? null : guestSession(store);
      const user = authed || guest.user;
      return send(res, 200, {
        user,
        token: authed ? undefined : guest.token,
        guest: Boolean(user.guest),
        marketplace: Object.values(store.courses).filter((c) => c.marketplace),
        myCourses: Object.values(store.courses).filter((c) => c.ownerId === user.userId || c.joined),
        feed: store.feed,
        timetable: store.timetable || null,
        artifacts: store.artifacts.slice(-12),
        conversations: store.conversations.slice(-20),
        starredSessions: store.starredSessions || [],
        deeplearnSessions: Object.values(store.deeplearn || {}).map((s) => ({
          id: s.id,
          sessionId: s.sessionId || s.id,
          title: s.title,
          at: s.at,
          kind: "session",
        })),
        drive: user
          ? listTree(driveFor(store, user.userId))
          : { tree: [], empty: true, usedBytes: 0, quotaBytes: DEFAULT_QUOTA_BYTES },
        streak: heatmap(user ? checkinsFor(store, user.userId) : {}),
        inbox: store.inbox || seedInbox(),
      });
    }

    if (url.pathname === "/api/inbox" && req.method === "GET") {
      return send(res, 200, { inbox: store.inbox || seedInbox() });
    }
    if (url.pathname === "/api/inbox/read" && req.method === "POST") {
      const user = requireUser(store, req, res);
      if (!user) return;
      const body = await readBody(req);
      store.inbox = markInboxRead(store.inbox || seedInbox(), body.ids || body.message_ids || []);
      saveStore(store);
      return send(res, 200, { inbox: store.inbox });
    }
    if (url.pathname.startsWith("/api/inbox/message/") && req.method === "GET") {
      const id = url.pathname.slice("/api/inbox/message/".length);
      const msg = findMessage(store.inbox || seedInbox(), id);
      if (!msg) return send(res, 404, { error: "找不到该消息。" });
      return send(res, 200, { message: msg });
    }

    if (url.pathname === "/api/auth/register" && req.method === "POST") {
      const body = await readBody(req);
      const out = registerUser(store, body);
      return send(res, 200, out);
    }
    if (url.pathname === "/api/auth/login" && req.method === "POST") {
      const body = await readBody(req);
      const out = loginUser(store, body);
      return send(res, 200, out);
    }
    if (url.pathname === "/api/onboarding" && req.method === "POST") {
      const user = requireUser(store, req, res);
      if (!user) return;
      const body = await readBody(req);
      const next = mutateUser(store, user.userId, (row) => ({
        ...row,
        language: body.language === "en" ? "en" : body.language === "zh" ? "zh" : row.language,
        onboarding: {
          complete: body.complete !== false,
          language: body.language || "",
          source: body.source || "",
          role: body.role || "",
          other: body.other || "",
          finishedAt: new Date().toISOString(),
        },
      }));
      return send(res, 200, { user: publicUser(next) });
    }

    if (url.pathname === "/api/course/commit" && req.method === "POST") {
      const user = requireUser(store, req, res);
      if (!user) return;
      const body = await readBody(req);
      const graph = ingestCourse(body.payload || body);
      graph.ownerId = user.userId;
      graph.marketplace = false;
      graph.joined = true;
      graph.language = body.language || user.language || "zh";
      store = loadStore();
      store.courses[graph.courseId] = graph;
      saveStore(store);
      return send(res, 200, { course: graph });
    }
    if (url.pathname === "/api/course/craft" && req.method === "POST") {
      const user = requireUser(store, req, res);
      if (!user) return;
      const body = await readBody(req);
      const full = store.users.find((u) => u.userId === user.userId);
      const { account, course, cost } = await runCraftCourse({
        account: full,
        goal: body.goal,
        files: body.files || [],
        language: body.language || "zh",
        model: heuristicModel(),
      });
      mutateUser(store, user.userId, () => account);
      store = loadStore();
      course.ownerId = user.userId;
      course.marketplace = false;
      store.courses[course.courseId] = course;
      const streak = bumpStreak(store, user.userId);
      return send(res, 200, { course, cost, credits: account.credits, streak });
    }

    if (url.pathname === "/api/assist" && req.method === "POST") {
      const user = requireUser(store, req, res);
      if (!user) return;
      const body = await readBody(req);
      const full = store.users.find((u) => u.userId === user.userId);
      const study = body.study && typeof body.study === "object" ? body.study : {};
      const studyText = craftAskReady(study)
        ? stampCraftMode({
            prereq: study.prereq,
            emphasis: study.emphasis,
            goal: study.goal,
            scale: study.scale,
            text: study.topic || body.question,
          })
        : planAskReady(study)
        ? stampPlanMode({
            scope: study.scope,
            hours: study.hours,
            goal: study.goal,
            text: study.topic || body.question,
          })
        : digestAskReady(study)
          ? stampDigestMode({ mode: study.mode, text: study.topic || body.question })
          : teachAskReady(study)
            ? stampStudyMode({
                level: study.level,
                style: study.style,
                focus: study.focus,
                text: stampTeachBeat({
                  ...nextTeachBeat(study.beat, study.go),
                  text: study.topic || body.question,
                }),
              })
          : studyAskReady(study)
            ? stampStudyMode({
                level: study.level,
                style: study.style,
                focus: study.focus,
                text: study.topic || body.question,
              })
            : body.question;
      const { account, result } = await runInstantAssist({
        account: full,
        question: stampAssistBind({
          chip: body.chip,
          speed: body.speedMode,
          text: studyText,
        }),
        files: body.files || [],
        drive: driveFor(store, user.userId),
        useDrive: true,
        timetable: store.timetable || null,
        marketplace: Object.values(store.courses).filter((c) => c.marketplace),
        model: heuristicModel(),
      });
      mutateUser(store, user.userId, () => account);
      store = loadStore();
      const sources = [
        ...((result.toolResults || [])
          .filter((t) => (t.name === "read_files" || t.name === "read_content") && t.result?.ok)
          .map((t) => ({ fileId: t.result.fileId || "", filename: t.result.filename }))),
        ...(((result.toolResults || []).find((t) => t.name === "search_and_summarize_web")?.result?.citations || [])
          .filter((c) => c?.url)
          .map((c) => ({
            id: c.id || "",
            title: c.title || c.url,
            url: c.url,
            snippet: c.snippet || "",
          }))),
      ];
      const asked = String(body.question || "").trim();
      const resumeId = String(body.conversationId || body.conversation_id || "").trim();
      const existing = resumeId ? store.conversations.find((c) => c.id === resumeId) : null;
      const base = existing || {
        id: resumeId && resumeId.startsWith("conv_") ? resumeId : `conv_${Date.now()}`,
        title: asked.slice(0, 48),
        starred: false,
        at: new Date().toISOString(),
        messages: [],
      };
      const worked =
        (result.toolResults || []).find((t) => t.name === "generate_worked_example")?.result || null;
      const ask = (result.toolResults || []).find((t) => t.name === "ask_questions")?.result || null;
      const digest = (result.toolResults || []).find((t) => t.name === "generate_digest")?.result || null;
      const plan = (result.toolResults || []).find((t) => t.name === "generate_main_tasks")?.result || null;
      const content = (result.toolResults || []).find((t) => t.name === "generate_content")?.result || null;
      const quiz = (result.toolResults || []).find((t) => t.name === "generate_quiz")?.result || null;
      const flashcards = (result.toolResults || []).find((t) => t.name === "generate_flashcards")?.result || null;
      const cheatsheet = (result.toolResults || []).find((t) => t.name === "generate_cheatsheet")?.result || null;
      const nextSteps = (result.toolResults || []).find((t) => t.name === "recommend_next_step")?.result || null;
      const diagram = (result.toolResults || []).find((t) => t.name === "generate_diagram")?.result || null;
      const conv = appendConversationTurn(base, {
        question: asked,
        answer: result.text,
        trace: result.trace,
        sources,
        worked,
        ask,
        digest,
        plan,
        content,
        quiz,
        flashcards,
        cheatsheet,
        nextSteps,
        learningProgress: nextSteps?.learning_progress || null,
        diagram,
      });
      if (existing) {
        store.conversations = store.conversations.map((c) => (c.id === conv.id ? conv : c));
      } else {
        store.conversations.push(conv);
      }
      const streak = bumpStreak(store, user.userId);
      return send(res, 200, { conversation: conv, credits: account.credits, result, sources, streak });
    }

    if (url.pathname.startsWith("/api/conversations/") && req.method === "GET") {
      const id = decodeURIComponent(url.pathname.slice("/api/conversations/".length).split("/")[0] || "");
      const conv = (store.conversations || []).find((c) => c.id === id);
      if (!conv) return send(res, 404, { error: "conversation not found" });
      return send(res, 200, { conversation: { ...conv, messages: conversationMessages(conv) } });
    }

    if (url.pathname === "/api/materials/pdf" && req.method === "POST") {
      const user = requireUser(store, req, res);
      if (!user) return;
      const body = await readBody(req);
      const layout = paginateCheatsheet(body.cheatsheet || {}, {
        columns: body.columns,
        density: body.density,
        font: body.font,
      });
      const pdf = cheatsheetToPdf(layout);
      return send(res, 200, pdf, {
        "content-type": "application/pdf",
        "content-disposition": 'attachment; filename="cheatsheet.pdf"',
      });
    }

    if (url.pathname === "/api/materials" && req.method === "POST") {
      const user = requireUser(store, req, res);
      if (!user) return;
      const body = await readBody(req);
      const full = store.users.find((u) => u.userId === user.userId);
      const { account, artifacts, result } = await runGenerateMaterials({
        account: full,
        prompt: stampAssistBind({
          chip: body.chip || "pack",
          speed: body.speedMode,
          text: body.prompt,
        }),
        files: body.files || [],
        drive: driveFor(store, user.userId),
        model: heuristicModel(),
      });
      mutateUser(store, user.userId, () => account);
      store = loadStore();
      store.artifacts.push({
        id: `art_${Date.now()}`,
        artifacts,
        prompt: body.prompt,
        courseId: String(body.courseId || ""),
        sessionId: String(body.sessionId || ""),
      });
      const streak = bumpStreak(store, user.userId);
      return send(res, 200, { artifacts, credits: account.credits, result, streak });
    }

    if (url.pathname === "/api/lms/import" && req.method === "POST") {
      const user = requireUser(store, req, res);
      if (!user) return;
      const body = await readBody(req);
      const bundle = ingestLmsPayload(body.payload || body);
      const drafts = lmsCoursesToAnyknowDrafts(bundle);
      const courses = drafts.map((d) => {
        const g = ingestCourse(d);
        g.ownerId = user.userId;
        store.courses[g.courseId] = g;
        return g;
      });
      store.lms = bundle;
      store.feed = buildLearningFeed({ lmsBundle: bundle });
      saveStore(store);
      return send(res, 200, { bundle, courses, feed: store.feed });
    }

    if (url.pathname === "/api/timetable/import" && req.method === "POST") {
      const user = requireUser(store, req, res);
      if (!user) return;
      const body = await readBody(req);
      const raw = body.text || body.payload || body;
      const board = parseTimetable(raw, { termStart: body.termStart, school: body.school });
      if (!board.ok) return send(res, 400, { error: board.emptyCopy || "无法解析课表" });
      store.timetable = board;
      const planned = planFromTimetable(board);
      const existing = store.feed?.tasks || [];
      const seen = new Set(existing.map((t) => t.taskId || t.id));
      const merged = [...existing, ...planned.tasks.filter((t) => !seen.has(t.taskId))];
      store.feed = {
        generatedAt: planned.generatedAt,
        pendingCount: merged.filter((t) => t.status === "pending").length,
        tasks: merged,
        plan: merged.map((t) => ({ when: t.dueAt, what: t.title, course: t.courseName })),
      };
      const drive = driveFor(store, user.userId);
      const driveHits = (board.courses || []).flatMap((c) => searchFiles(drive, c.name));
      const knowledge = matchTimetableKnowledge(board, {
        marketplace: Object.values(store.courses).filter((c) => c.marketplace),
        driveHits,
      });
      saveStore(store);
      return send(res, 200, { timetable: board, feed: store.feed, knowledge });
    }

    if (url.pathname === "/api/course/join" && req.method === "POST") {
      const user = requireUser(store, req, res);
      if (!user) return;
      const body = await readBody(req);
      const course = store.courses[body.courseId];
      if (!course) return send(res, 404, { error: "course not found" });
      const joined = joinCourse(course, { language: body.language || "zh" });
      joined.ownerId = user.userId;
      store.courses[body.courseId] = joined;
      saveStore(store);
      return send(res, 200, { course: joined });
    }

    if (url.pathname === "/api/course/exam" && req.method === "GET") {
      const user = requireUser(store, req, res);
      if (!user) return;
      const course = store.courses[url.searchParams.get("courseId")];
      if (!course) return send(res, 404, { error: "course not found" });
      return send(res, 200, examBank(course, url.searchParams.get("examId")));
    }

    if (url.pathname === "/api/course/exam/score" && req.method === "POST") {
      const user = requireUser(store, req, res);
      if (!user) return;
      const body = await readBody(req);
      let course = store.courses[body.courseId];
      if (!course) return send(res, 404, { error: "course not found" });
      const bank = examBank(course, body.examId);
      if (bank.empty) return send(res, 404, { error: bank.emptyCopy });
      const result = gradeExam(bank.questions, body.answers || {});
      course = markExamProgress(course, body.examId, "complete");
      store.courses[body.courseId] = course;
      const streak = bumpStreak(store, user.userId);
      return send(res, 200, { result, course, streak, score: result.percent });
    }

    if (url.pathname === "/api/course/progress" && req.method === "POST") {
      const user = requireUser(store, req, res);
      if (!user) return;
      const body = await readBody(req);
      let course = store.courses[body.courseId];
      if (!course) return send(res, 404, { error: "course not found" });
      if (body.kind === "project") course = markProjectProgress(course, body.stageId, body.event);
      else if (body.kind === "exam") course = markExamProgress(course, body.examId, body.event);
      else if (body.event === "learn") course = openLearnSession(course, body.sessionId);
      else if (body.event === "practice") course = openPracticeSession(course, body.sessionId);
      else course = markSessionProgress(course, body.sessionId, body.event);
      store.courses[body.courseId] = course;
      const streak = bumpStreak(store, user.userId);
      return send(res, 200, { course, streak });
    }

    if (url.pathname === "/api/course/extend" && req.method === "POST") {
      const user = requireUser(store, req, res);
      if (!user) return;
      const body = await readBody(req);
      let course = store.courses[body.courseId];
      if (!course) return send(res, 404, { error: "course not found" });
      course = extendCourseWithFile(course, body.file);
      store.courses[body.courseId] = course;
      saveStore(store);
      return send(res, 200, { course });
    }

    if (url.pathname === "/api/drive" && req.method === "GET") {
      const user = requireUser(store, req, res);
      if (!user) return;
      return send(res, 200, listTree(driveFor(store, user.userId)));
    }

    if (url.pathname === "/api/drive/folder" && req.method === "POST") {
      const user = requireUser(store, req, res);
      if (!user) return;
      const body = await readBody(req);
      const current = driveFor(store, user.userId);
      const { drive, folder } = createFolder(current, {
        name: body.name,
        directory_name: body.directory_name || body.name,
        parentId: body.parentId || null,
      });
      saveDrive(store, user.userId, drive);
      return send(res, 200, { folder, drive: listTree(drive) });
    }

    if (url.pathname === "/api/drive/upload" && req.method === "POST") {
      const user = requireUser(store, req, res);
      if (!user) return;
      const body = await readBody(req);
      const current = driveFor(store, user.userId);
      const { drive, file } = uploadFile(current, {
        filename: body.filename || body.name,
        text: body.text || "",
        parentId: body.parentId || null,
      });
      saveDrive(store, user.userId, drive);
      return send(res, 200, { file, drive: listTree(drive) });
    }

    if (url.pathname === "/api/drive/delete" && req.method === "POST") {
      const user = requireUser(store, req, res);
      if (!user) return;
      const body = await readBody(req);
      const current = driveFor(store, user.userId);
      const drive = deleteNode(current, body.id);
      saveDrive(store, user.userId, drive);
      return send(res, 200, { drive: listTree(drive) });
    }

    if (url.pathname === "/api/visual" && req.method === "POST") {
      const user = requireUser(store, req, res);
      if (!user) return;
      const body = await readBody(req);
      const full = store.users.find((u) => u.userId === user.userId);
      const { account, diagram, result } = await runVisualWalkthrough({
        account: full,
        prompt: stampAssistBind({
          chip: body.chip || "viz",
          speed: body.speedMode,
          text: body.prompt,
        }),
        model: heuristicModel(),
      });
      mutateUser(store, user.userId, () => account);
      store = loadStore();
      const streak = bumpStreak(store, user.userId);
      return send(res, 200, { diagram, credits: account.credits, result, streak });
    }

    if (url.pathname === "/api/media/animation" && req.method === "POST") {
      const user = requireUser(store, req, res);
      if (!user) return;
      const body = await readBody(req);
      const full = store.users.find((u) => u.userId === user.userId);
      const { account, animation, result } = await runHtmlAnimation({
        account: full,
        prompt: body.prompt || body.topic,
        model: heuristicModel(),
      });
      mutateUser(store, user.userId, () => account);
      store = loadStore();
      const streak = bumpStreak(store, user.userId);
      const art = animation || (await fulfillMedia("animation", { topic: body.prompt || body.topic }));
      return send(res, 200, { animation: art, credits: account.credits, result, streak });
    }

    if (url.pathname === "/api/media/video" && req.method === "POST") {
      const user = requireUser(store, req, res);
      if (!user) return;
      const body = await readBody(req);
      const full = store.users.find((u) => u.userId === user.userId);
      const { account, video, result } = await runInstructionalVideo({
        account: full,
        prompt: body.prompt || body.topic,
        model: heuristicModel(),
      });
      mutateUser(store, user.userId, () => account);
      store = loadStore();
      const streak = bumpStreak(store, user.userId);
      const art = video || (await fulfillMedia("video", { topic: body.prompt || body.topic }));
      return send(res, 200, { video: art, credits: account.credits, result, streak });
    }

    if (url.pathname === "/api/media/image" && req.method === "POST") {
      const user = requireUser(store, req, res);
      if (!user) return;
      const body = await readBody(req);
      const full = store.users.find((u) => u.userId === user.userId);
      const { account, image, result } = await runBoardImage({
        account: full,
        prompt: body.prompt || body.topic || body.caption,
        model: heuristicModel(),
      });
      mutateUser(store, user.userId, () => account);
      store = loadStore();
      const streak = bumpStreak(store, user.userId);
      const art = image || (await fulfillMedia("image", { topic: body.prompt || body.caption }));
      return send(res, 200, { image: art, credits: account.credits, result, streak });
    }

    if (url.pathname === "/api/feed/approve" && req.method === "POST") {
      const user = requireUser(store, req, res);
      if (!user) return;
      const body = await readBody(req);
      store.feed = approveFeedTasks(store.feed || { tasks: [] }, body.taskIds || []);
      saveStore(store);
      return send(res, 200, { feed: store.feed });
    }

    if (url.pathname === "/api/feed/skip" && req.method === "POST") {
      const user = requireUser(store, req, res);
      if (!user) return;
      const body = await readBody(req);
      store.feed = skipAndRedistribute(store.feed || { tasks: [] }, body.taskId);
      const streak = bumpStreak(store, user.userId);
      return send(res, 200, { feed: store.feed, streak });
    }

    if (url.pathname === "/api/deeplearn/create" && req.method === "POST") {
      const user = requireUser(store, req, res);
      if (!user) return;
      const body = await readBody(req);
      const full = store.users.find((u) => u.userId === user.userId);
      const { account, session, sessionId, result } = await runCreateDeepLearnSession({
        account: full,
        prompt: stampAssistBind({
          chip: "deeplearn",
          speed: body.speedMode,
          text: body.prompt || body.topic,
        }),
        drive: driveFor(store, user.userId),
        model: heuristicModel(),
      });
      mutateUser(store, user.userId, () => account);
      store = loadStore();
      if (session?.id) {
        store.deeplearn = store.deeplearn || {};
        store.deeplearn[session.id] = session;
        registerDeepLearnSession(session);
        saveStore(store);
      }
      const streak = bumpStreak(store, user.userId);
      return send(res, 200, { sessionId: sessionId || session?.id, session, credits: account.credits, result, streak });
    }

    if (url.pathname === "/api/deeplearn/session" && req.method === "GET") {
      const id = String(url.searchParams.get("id") || "").trim();
      store.deeplearn = store.deeplearn || {};
      const session = store.deeplearn[id];
      if (!session) return send(res, 404, { error: "deep learn session not found" });
      return send(res, 200, { session });
    }

    if (url.pathname === "/api/whiteboard/create" && req.method === "POST") {
      const user = requireUser(store, req, res);
      if (!user) return;
      const body = await readBody(req);
      const full = store.users.find((u) => u.userId === user.userId);
      const { account, session, sessionId, result, kind } = await runCreateBoardSession({
        account: full,
        prompt: stampAssistBind({ chip: "board", speed: body.speedMode, text: body.prompt || body.topic }),
        files: body.files || [],
        drive: driveFor(store, user.userId),
        model: heuristicModel(),
      });
      mutateUser(store, user.userId, () => account);
      store = loadStore();
      if (session?.id) {
        if (kind === "pdf" || craftedPdfId(session.id)) {
          store.pdfs = store.pdfs || {};
          store.pdfs[session.id] = session;
          registerPdfSession(session);
        } else {
          store.whiteboards = store.whiteboards || {};
          store.whiteboards[session.id] = session;
        }
        saveStore(store);
      }
      const streak = bumpStreak(store, user.userId);
      return send(res, 200, {
        sessionId: sessionId || session?.id,
        session,
        kind: kind || session?.kind || "whiteboard",
        credits: account.credits,
        result,
        streak,
      });
    }

    if (url.pathname === "/api/pdf/session" && req.method === "GET") {
      const id = String(url.searchParams.get("id") || "").trim();
      store.pdfs = store.pdfs || {};
      const session = store.pdfs[id];
      if (!session) return send(res, 404, { error: "pdf session not found" });
      return send(res, 200, { session });
    }

    if (url.pathname === "/api/pdf/followup" && req.method === "POST") {
      const user = requireUser(store, req, res);
      if (!user) return;
      const body = await readBody(req);
      const id = String(body.id || body.sessionId || "").trim();
      store.pdfs = store.pdfs || {};
      const existing = store.pdfs[id];
      if (!existing) return send(res, 404, { error: "pdf session not found" });
      registerPdfSession(existing);
      try {
        const session = followUpPdfSession({ id, question: body.question || body.prompt });
        store.pdfs[id] = session;
        saveStore(store);
        const streak = bumpStreak(store, user.userId);
        return send(res, 200, { sessionId: id, session, streak });
      } catch (err) {
        const code = err.code === "NOT_FOUND" ? 404 : 400;
        return send(res, code, { error: err.message || "followup failed" });
      }
    }

    if (url.pathname === "/api/whiteboard/session" && req.method === "GET") {
      const id = String(url.searchParams.get("id") || "").trim();
      store.whiteboards = store.whiteboards || {};
      const session = store.whiteboards[id];
      if (!session) return send(res, 404, { error: "whiteboard session not found" });
      return send(res, 200, { session });
    }

    if (url.pathname === "/api/whiteboard/followup" && req.method === "POST") {
      const user = requireUser(store, req, res);
      if (!user) return;
      const body = await readBody(req);
      const id = String(body.id || body.sessionId || "").trim();
      store.whiteboards = store.whiteboards || {};
      const existing = store.whiteboards[id];
      if (!existing) return send(res, 404, { error: "whiteboard session not found" });
      registerWhiteboardSession(existing);
      try {
        const session = followUpWhiteboardSession({
          id,
          question: body.question || body.prompt,
          drive: driveFor(store, user.userId),
        });
        store.whiteboards[id] = session;
        saveStore(store);
        const streak = bumpStreak(store, user.userId);
        return send(res, 200, { sessionId: id, session, streak });
      } catch (err) {
        const code = err.code === "NOT_FOUND" ? 404 : 400;
        return send(res, code, { error: err.message || "followup failed" });
      }
    }

    if (url.pathname === "/api/tutor/hint" && req.method === "POST") {
      const user = requireUser(store, req, res);
      if (!user) return;
      const body = await readBody(req);
      const full = store.users.find((u) => u.userId === user.userId);
      const { account, hint, result } = await runTutorHint({
        account: full,
        prompt: body.prompt || body.topic,
        topic: body.topic || body.prompt,
        step: body.step || 0,
        drive: driveFor(store, user.userId),
        model: heuristicModel(),
      });
      mutateUser(store, user.userId, () => account);
      store = loadStore();
      const streak = bumpStreak(store, user.userId);
      return send(res, 200, { hint, credits: account.credits, result, streak });
    }

    if (url.pathname === "/api/plan/confirm" && req.method === "POST") {
      const user = requireUser(store, req, res);
      if (!user) return;
      const body = await readBody(req);
      const convId = String(body.conversationId || "").trim();
      const taskId = String(body.taskId || "").trim();
      const action = String(body.action || "accept");
      const conv = (store.conversations || []).find((c) => c.id === convId);
      if (!conv) return send(res, 404, { error: "conversation not found" });
      const messages = conversationMessages(conv);
      const idx = [...messages].reverse().findIndex((m) => m.role === "assistant" && m.plan?.tasks?.length);
      const real = idx < 0 ? -1 : messages.length - 1 - idx;
      if (real < 0) return send(res, 400, { error: "plan not found" });
      const nextPlan = applyPlanTaskAction(messages[real].plan, taskId, action);
      messages[real] = { ...messages[real], plan: nextPlan };
      const nextConv = { ...conv, messages, plan: nextPlan, at: new Date().toISOString() };
      store.conversations = store.conversations.map((c) => (c.id === nextConv.id ? nextConv : c));
      if (action === "accept") {
        const task = (nextPlan.tasks || []).find((t) => String(t.taskId) === taskId);
        if (task) store.feed = mergeConfirmedPlanTask(store.feed || { tasks: [] }, task);
      }
      saveStore(store);
      const streak = bumpStreak(store, user.userId);
      return send(res, 200, { conversation: { ...nextConv, messages: conversationMessages(nextConv) }, feed: store.feed, plan: nextPlan, streak });
    }

    if (url.pathname === "/api/plan" && req.method === "POST") {
      const user = requireUser(store, req, res);
      if (!user) return;
      const body = await readBody(req);
      const full = store.users.find((u) => u.userId === user.userId);
      const { account, plan, result } = await runStudyPlan({
        account: full,
        prompt: body.prompt,
        files: body.files || [],
        drive: driveFor(store, user.userId),
        timetable: store.timetable || null,
        marketplace: Object.values(store.courses).filter((c) => c.marketplace),
        model: heuristicModel(),
      });
      mutateUser(store, user.userId, () => account);
      store = loadStore();
      store.feed = {
        generatedAt: new Date().toISOString(),
        pendingCount: plan?.tasks?.length || 0,
        tasks: plan?.tasks || [],
        plan: (plan?.tasks || []).map((t) => ({ when: t.dueAt, what: t.title, course: t.courseName })),
      };
      const streak = bumpStreak(store, user.userId);
      return send(res, 200, { plan, feed: store.feed, credits: account.credits, result, streak });
    }

    if (url.pathname === "/api/history/star" && req.method === "POST") {
      const user = requireUser(store, req, res);
      if (!user) return;
      const body = await readBody(req);
      const kind = body.kind === "session" ? "session" : "conversation";
      const id = String(body.id || "");
      const starred = Boolean(body.starred);
      try {
        if (kind === "session") {
          store.starredSessions = setSessionStar(store.starredSessions || [], id, starred);
        } else {
          store.conversations = setStarred(store.conversations || [], id, starred);
        }
      } catch (err) {
        return send(res, 404, { error: "找不到该记录。", code: err.code || "STAR_NOT_FOUND" });
      }
      saveStore(store);
      return send(res, 200, {
        conversations: store.conversations,
        starredSessions: store.starredSessions || [],
      });
    }

    if (url.pathname === "/api/streak" && req.method === "POST") {
      const user = requireUser(store, req, res);
      if (!user) return;
      const streak = bumpStreak(store, user.userId);
      return send(res, 200, { streak });
    }

    if (url.pathname.startsWith("/api/")) {
      return send(res, 404, { error: "not found" });
    }

    if (/^\/(signin|signup|onboarding|pricing|subscription)\/?$/.test(url.pathname)) {
      res.writeHead(302, { Location: "/", "cache-control": "no-store" });
      res.end();
      return;
    }

    if (url.pathname.startsWith("/domain/")) {
      const rel = url.pathname.slice("/domain/".length);
      const file = join(domainRoot, rel);
      if (!file.startsWith(domainRoot) || !existsSync(file)) {
        return send(res, 404, { error: "not found" });
      }
      return send(res, 200, readFileSync(file), { "content-type": "text/javascript; charset=utf-8" });
    }

    let path = url.pathname === "/" ? "/index.html" : url.pathname;
    const file = join(root, path);
    if (!file.startsWith(root)) return send(res, 403, "forbidden");
    if (!existsSync(file)) {
      return send(res, 200, readFileSync(join(root, "index.html")), {
        "content-type": "text/html; charset=utf-8",
      });
    }
    const ext = extname(file);
    return send(res, 200, readFileSync(file), { "content-type": MIME[ext] || "application/octet-stream" });
  } catch (err) {
    const status =
      err.code === "INSUFFICIENT_CREDITS" || err.code === "QUOTA_EXCEEDED" ? 402 : 400;
    return send(res, status, { error: err.message, code: err.code || "ERROR", remaining: err.remaining });
  }
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`simo know listening on http://127.0.0.1:${PORT}`);
});
