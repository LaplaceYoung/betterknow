import { createTool } from "./framework.mjs";
import { ingestCourse } from "../domain/course.mjs";
import { extractDeadlines } from "../domain/plan.mjs";
import { matchTimetableKnowledge, planFromTimetable } from "../domain/timetable.mjs";
import { craftDeepLearnSession, socraticHint } from "../domain/deeplearn.mjs";
import { readFile, searchFiles } from "../domain/kb.mjs";
import { chalkboardAnimation, chalkboardImage, chalkboardVideo } from "../domain/media.mjs";
import { teachingExcerpt } from "../domain/kb.mjs";
import { craftWhiteboardSession } from "../domain/whiteboard.mjs";
import { craftPdfGuideSession } from "../domain/pdf.mjs";
import { workedExampleBoard } from "../domain/worked.mjs";
import { generateContentBoard } from "../domain/content.mjs";
import { sliceContentBoard, teachBeatAsk } from "../domain/teach-beat.mjs";
import { generateFlashcardBoard, generateQuizBoard } from "../domain/check.mjs";
import { generateDiagramBoard } from "../domain/diagram.mjs";
import { searchWeb } from "../domain/web.mjs";
import { studyAskBoard } from "../domain/study-mode.mjs";
import { digestAskBoard, generateDigestBoard } from "../domain/digest.mjs";
import { parseAssistBind } from "../domain/assist.mjs";
import { buildPlannerTasks, parsePlanStamp, planAskBoard, planTasksBoard } from "../domain/plan-mode.mjs";
import { craftAskBoard, craftCourseTree, parseCraftStamp } from "../domain/craft-mode.mjs";
import { parseBlueprint } from "../domain/blueprint.mjs";
import { recommendNextSteps } from "../domain/next-step.mjs";

export function createLearningTools({ store = {} } = {}) {
  const files = () => store.files || [];
  const drive = () => store.drive || null;

  return [
    createTool({
      id: "search_files",
      description: "Search the learner's knowledge-base / drive by keyword (filename or file text).",
      parameters: { type: "object", properties: { query: { type: "string" } } },
      execute: async ({ query }) => ({
        query,
        hits: searchFiles(drive(), query),
      }),
    }),
    createTool({
      id: "read_files",
      description: "Read a knowledge-base file by id returned from search_files.",
      parameters: {
        type: "object",
        properties: { fileId: { type: "string" }, file_id: { type: "string" } },
      },
      execute: async ({ fileId, file_id }) => readFile(drive(), fileId || file_id),
    }),
    createTool({
      id: "search_and_summarize_web",
      description: "Search the public web and return {id,title,url,snippet} citations for a study question.",
      parameters: { type: "object", properties: { query: { type: "string" } } },
      execute: async ({ query }) => searchWeb({ query }),
    }),
    createTool({
      id: "read_content",
      description: "Read uploaded file text as source material.",
      parameters: { type: "object", properties: { filename: { type: "string" } } },
      execute: async ({ filename }) => {
        const attached =
          files().find((f) => !filename || f.filename === filename) || files()[0];
        if (attached) return { ok: true, filename: attached.filename, text: attached.text };
        const kb = drive();
        if (kb) {
          const hits = searchFiles(kb, filename || "");
          if (hits[0]) return readFile(kb, hits[0].id);
        }
        return { ok: false, text: "" };
      },
    }),
    createTool({
      id: "generate_cheatsheet",
      description: "Generate an exam-ready cheatsheet from the topic and files.",
      execute: async ({ topic, sourceText, sourceName }) => {
        const excerpt = sourceText || "";
        const bullets = extractBullets(excerpt, 3);
        const cite = sourceName || "";
        return {
          kind: "cheatsheet",
          title: `${topic || "Topic"} 速查表`,
          basedOn: cite,
          pages: 2,
          sections: [
            { heading: "定义", bullets, cite },
            { heading: "机制", bullets: extractBullets(excerpt, 2).slice(0, 2), cite },
            { heading: "公式 / 关系", bullets: extractBullets(excerpt, 2).slice(0, 2), cite },
            { heading: "例子", bullets: extractBullets(excerpt, 2).slice(-2), cite },
            { heading: "易错", bullets: excerpt ? ["不要跳过教材里写明的条件。"] : ["不要把相关当成因果。"], cite },
            { heading: "自检", bullets: ["用自己的话写出定义。", "换一个例子，机制还成立吗？"], cite },
          ],
        };
      },
    }),
    createTool({
      id: "generate_quiz",
      description: "Generate a short grounded quiz (核心 / 教材原句) from the topic and retrieved 公开教材.",
      parameters: {
        type: "object",
        properties: {
          topic: { type: "string" },
          sourceText: { type: "string" },
          sourceName: { type: "string" },
        },
      },
      execute: async ({ topic, sourceText, sourceName }) =>
        generateQuizBoard({ topic, sourceText, sourceName }),
    }),
    createTool({
      id: "generate_flashcards",
      description: "Generate grounded flashcards (定义 / 何时用 / 易错) from the topic and retrieved 公开教材.",
      parameters: {
        type: "object",
        properties: {
          topic: { type: "string" },
          sourceText: { type: "string" },
          sourceName: { type: "string" },
        },
      },
      execute: async ({ topic, sourceText, sourceName }) =>
        generateFlashcardBoard({ topic, sourceText, sourceName }),
    }),
    createTool({
      id: "generate_diagram",
      description: "Produce a chalkboard SVG walkthrough (定义 → 机制) grounded in retrieved 公开教材.",
      parameters: {
        type: "object",
        properties: {
          topic: { type: "string" },
          sourceText: { type: "string" },
          sourceName: { type: "string" },
        },
      },
      execute: async ({ topic, sourceText, sourceName }) =>
        generateDiagramBoard({ topic, sourceText, sourceName }),
    }),
    createTool({
      id: "generate_html_animation",
      description: "Produce a chalkboard interactive animation spec for a study idea.",
      parameters: {
        type: "object",
        properties: { topic: { type: "string" }, scene: { type: "string" }, caption: { type: "string" } },
      },
      execute: async ({ topic, scene, caption }) => chalkboardAnimation({ topic, scene, caption }),
    }),
    createTool({
      id: "generate_board_image",
      description: "Produce a chalkboard board illustration for a teaching beat.",
      parameters: {
        type: "object",
        properties: { topic: { type: "string" }, caption: { type: "string" } },
      },
      execute: async ({ topic, caption }) => chalkboardImage({ topic, caption }),
    }),
    createTool({
      id: "generate_instructional_video",
      description: "Produce a chalkboard instructional-video storyboard (script, narration, scenes, render).",
      parameters: {
        type: "object",
        properties: { topic: { type: "string" }, title: { type: "string" } },
      },
      execute: async ({ topic, title }) => chalkboardVideo({ topic, title }),
    }),
    createTool({
      id: "ask_questions",
      description: "Ask portrait questions before 概念讲解, 长文件消化, 学习规划, or 打造课程. Pause until they answer.",
      parameters: {
        type: "object",
        properties: { topic: { type: "string" }, chip: { type: "string" } },
      },
      execute: async ({ topic, chip, beat, level, style, focus }) => {
        const id = String(chip || parseAssistBind(topic).chip || "").toLowerCase();
        if (id === "digest") return digestAskBoard({ topic });
        if (id === "plan") return planAskBoard({ topic });
        if (id === "craft") return craftAskBoard({ topic });
        if (id === "teach") return teachBeatAsk({ topic, beat, level, style, focus });
        return studyAskBoard({ topic });
      },
    }),
    createTool({
      id: "generate_digest",
      description: "Produce a cited long-file digest (精读/详述/导读) grounded in uploaded or retrieved teaching text.",
      parameters: {
        type: "object",
        properties: {
          topic: { type: "string" },
          sourceText: { type: "string" },
          sourceName: { type: "string" },
          mode: { type: "string" },
        },
      },
      execute: async ({ topic, sourceText, sourceName, mode }) =>
        generateDigestBoard({ topic, sourceText, sourceName, mode }),
    }),
    createTool({
      id: "generate_content",
      description: "Produce a chalkboard encyclopedia: 定义 / 机制 / 例子 / 自检, grounded in retrieved teaching text. Optional inline diagram for 直觉图像.",
      parameters: {
        type: "object",
        properties: {
          topic: { type: "string" },
          sourceText: { type: "string" },
          sourceName: { type: "string" },
          level: { type: "string" },
          style: { type: "string" },
          focus: { type: "string" },
          beat: { type: "string" },
        },
      },
      execute: async ({ topic, sourceText, sourceName, level, style, focus, beat }) =>
        sliceContentBoard(
          generateContentBoard({ topic, sourceText, sourceName, level, style, focus }),
          beat,
        ),
    }),
    createTool({
      id: "generate_worked_example",
      description: "Produce a chalkboard worked example: known, find, relation, steps, check, traps. Ground in retrieved teaching text.",
      parameters: {
        type: "object",
        properties: {
          topic: { type: "string" },
          sourceText: { type: "string" },
          sourceName: { type: "string" },
        },
      },
      execute: async ({ topic, sourceText, sourceName }) =>
        workedExampleBoard({ topic, sourceText, sourceName }),
    }),
    createTool({
      id: "recommend_next_step",
      description: "After teaching, recommend three next moves (闪卡 / 白板 / 深度学习 / 例题) and a 已讲过/当前/下一轮 outline.",
      parameters: {
        type: "object",
        properties: { topic: { type: "string" }, just: { type: "string" } },
      },
      execute: async ({ topic, just }) => recommendNextSteps({ topic, just }),
    }),
    createTool({
      id: "create_board_session",
      description:
        "Create a chalkboard whiteboard lesson, or a page-synced PDF 导读 (go_to_page / speak / highlight / circle / annotate) when a file is uploaded.",
      parameters: { type: "object", properties: { topic: { type: "string" } } },
      execute: async ({ topic }) => {
        const attached = files().find((f) => f?.text) || files()[0];
        if (attached?.text) {
          const session = craftPdfGuideSession({
            topic,
            sourceText: attached.text,
            sourceName: attached.filename,
            files: files(),
          });
          return { kind: "pdf", sessionId: session.id, session };
        }
        const session = craftWhiteboardSession({ topic, drive: drive() });
        return { kind: "whiteboard", sessionId: session.id, session };
      },
    }),
    createTool({
      id: "create_deep_learn_session",
      description: "Create an independent Deep Learn outline from a study topic and the local 公开教材 store.",
      parameters: { type: "object", properties: { topic: { type: "string" } } },
      execute: async ({ topic }) => {
        const session = craftDeepLearnSession({ topic, drive: drive() });
        return { kind: "deeplearn", sessionId: session.id, session };
      },
    }),
    createTool({
      id: "course_generation",
      description: "Turn a learning goal into a structured 1:1 course graph.",
      execute: async ({ goal, language = "zh", files: attached = [], sourceText = "", sourceName = "" }) => {
        const stamp = parseCraftStamp(goal);
        const topic = stamp.topic || goal;
        let text = sourceText || "";
        let name = sourceName || "";
        if (!text && drive()) {
          const hits = searchFiles(drive(), topic);
          if (hits[0]) {
            const file = readFile(drive(), hits[0].id);
            if (file?.ok) {
              text = file.text;
              name = file.filename;
            }
          }
        }
        const payload = craftCourseTree({
          topic,
          language,
          files: attached,
          sourceText: text,
          sourceName: name,
          prereq: stamp.prereq,
          emphasis: stamp.emphasis,
          goal: stamp.goal,
          scale: stamp.scale,
        });
        const graph = ingestCourse(payload);
        return { kind: "course", graph, tree: parseBlueprint(payload) };
      },
    }),
    createTool({
      id: "socratic_hint",
      description: "Give a withheld-answer study hint. Never reveal the final answer.",
      parameters: {
        type: "object",
        properties: {
          topic: { type: "string" },
          question: { type: "string" },
          step: { type: "number" },
        },
      },
      execute: async ({ topic, question, step }) => {
        const q = `${topic || ""} ${question || ""}`.trim();
        const hits = searchFiles(drive(), q);
        const file = hits[0] ? readFile(drive(), hits[0].id) : null;
        return socraticHint({
          topic,
          question,
          step,
          sourceText: file?.ok ? file.text : "",
          sourceName: file?.ok ? file.filename : "",
        });
      },
    }),
    createTool({
      id: "search_timetable",
      description: "Look up the learner's imported 课表 (no 教务 login). Filter by course name.",
      parameters: { type: "object", properties: { query: { type: "string" } } },
      execute: async ({ query }) => {
        const q = String(query || "").trim();
        const meetings = (store.timetable?.meetings || []).filter(
          (m) => !q || `${m.name} ${m.teacher} ${m.location}`.includes(q),
        );
        return {
          query: q,
          school: store.timetable?.school || "",
          courses: store.timetable?.courses || [],
          meetings,
        };
      },
    }),
    createTool({
      id: "match_timetable_knowledge",
      description: "Find marketplace courses and knowledge-base files related to imported 课表 names.",
      parameters: { type: "object", properties: { query: { type: "string" } } },
      execute: async ({ query }) => {
        const driveHits = store.drive ? searchFiles(store.drive, query || "") : [];
        return {
          knowledge: matchTimetableKnowledge(store.timetable, {
            marketplace: store.marketplace || [],
            driveHits,
          }),
        };
      },
    }),
    createTool({
      id: "generate_main_tasks",
      description: "Plan study tasks / deadlines from syllabus text, a learning goal, or an imported 课表.",
      execute: async ({ text, courseName, topic }) => {
        const source = text || topic || "";
        const stamp = parsePlanStamp(source);
        const dated = extractDeadlines([{ text: source, name: courseName || topic }]);
        if (store.timetable?.meetings?.length && !stamp.ready) {
          const planned = planFromTimetable(store.timetable);
          return {
            kind: "plan",
            title: courseName || topic || "课表学习计划",
            tasks: [...planned.tasks, ...dated],
            source: "timetable",
          };
        }
        const raw = dated.length
          ? dated
          : stamp.ready
            ? buildPlannerTasks({
                topic: stamp.topic || topic || courseName || source,
                scope: stamp.scope,
                hours: stamp.hours,
                goal: stamp.goal,
              })
            : fallbackStudyPlan(topic || courseName || source);
        return planTasksBoard({
          topic: stamp.topic || topic || courseName || source,
          tasks: raw,
          scope: stamp.scope,
          hours: stamp.hours,
          goal: stamp.goal,
        });
      },
    }),
  ];
}

function extractBullets(text, n) {
  if (!text) return ["Define the term.", "State the mechanism.", "Give one example."];
  const excerpt = teachingExcerpt(text, 900);
  const parts = excerpt
    .split(/[.\n]/)
    .map((s) => s.trim())
    .filter((s) => s.length > 20);
  return (parts.length ? parts : [excerpt]).slice(0, n);
}

function fallbackStudyPlan(topic) {
  const title = String(topic || "this topic").trim().slice(0, 80) || "this topic";
  return [
    { id: "t1", title: `Skim the map of ${title}`, kind: "main_task", source: "planner", status: "pending", order: 1 },
    { id: "t2", title: `Work one representative problem in ${title}`, kind: "main_task", source: "planner", status: "pending", order: 2 },
    { id: "t3", title: `Write a one-page cheatsheet for ${title}`, kind: "main_task", source: "planner", status: "pending", order: 3 },
  ];
}

export function craftPayloadFromGoal(goal, language, files = [], extra = {}) {
  const stamp = parseCraftStamp(goal);
  return craftCourseTree({
    topic: stamp.topic || goal,
    language,
    files,
    prereq: stamp.prereq,
    emphasis: stamp.emphasis,
    goal: stamp.goal,
    scale: stamp.scale,
    sourceText: extra.sourceText || "",
    sourceName: extra.sourceName || "",
  });
}
