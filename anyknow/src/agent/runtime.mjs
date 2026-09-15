import { Agent, createSpaceXaiModel } from "./framework.mjs";
import { createLearningTools, craftPayloadFromGoal } from "./tools.mjs";
import { ingestCourse } from "../domain/course.mjs";
import { craftWhiteboardSession } from "../domain/whiteboard.mjs";
import { craftedPdfId, craftPdfGuideSession } from "../domain/pdf.mjs";
import { craftDeepLearnSession } from "../domain/deeplearn.mjs";
import { COSTS, creditCostForCourse, debitCredits } from "../domain/credits.mjs";

const ASSIST_INSTRUCTIONS = `You are the simo know instant-assist agent (即时协助).
Think in steps. Use tools before answering study questions.
When the learner asks about 课表 / a class this week, call search_timetable then match_timetable_knowledge.
When they want 概念讲解 / explain a concept and the message has no [stamp level=… style=… focus=…] tag, call ask_questions first and stop. Do not search yet.
After they answer with a stamp, call search_files then read_files then generate_content for 定义 only, and ask 继续/卡住了. After 继续, generate_content for 机制/例子 and pause again. After the next 继续, generate_quiz (not flashcards) then recommend_next_step. Do not dump 定义+机制+例子+测验 in one turn. Fast mode keeps a short excerpt and skips this gate.
Otherwise always call search_files on the local 公开教材 knowledge base first, then read_files on a hit, then generate_content plus generate_quiz and generate_flashcards unless fast mode.
When they want 个性化学习资料 / pack, call search_files then read_files then generate_cheatsheet, generate_quiz, and generate_flashcards. Stay in the conversation; do not dump JSON.
When they want 长文件消化 / digest and the message has no [stamp mode=…] tag, call ask_questions first and stop.
After they pick 精读 / 详述 / 导读, if they uploaded a file call read_content; otherwise search_files then read_files. Then call generate_digest with that source. Do not dump a longer excerpt.
When they want 学习规划 / study planner and the message has no [stamp scope=… hours=… goal=…] tag, call ask_questions first and stop.
After they pick 考试范围 / 每周投入 / 目标, call generate_main_tasks. Leave tasks pending for the learner to accept; do not invent a calendar sync.
When they uploaded attachments, call read_content.
If the knowledge base misses, call search_and_summarize_web, then generate_content plus generate_quiz and generate_flashcards from those snippets (basedOn the page title). Fast mode keeps a short excerpt and skips those three tools.
When they want 可视化 / a chalkboard diagram, call search_files then read_files then generate_diagram grounded in that source. Stay in the conversation. Do not draw leftover biography/history circles.
After generate_content / quiz / flashcards / digest / worked example / plan tasks return, call recommend_next_step so the learner gets three next moves. Fast mode skips this.
Then write a taught answer: definition, mechanism, one example, one check question. Do not dump the whole file. Do not invent Course notes.`;

const MATERIALS_INSTRUCTIONS = `You are the simo know study-materials agent.
Call search_files on the local 公开教材 store, then read_files on a hit.
Then you MUST call generate_cheatsheet, generate_quiz, and generate_flashcards with that source text (basedOn the filename).
After the tools return, write a short recap. Do not skip the tools.`;

const COURSE_INSTRUCTIONS = `You are the simo know course-crafting agent (打造课程).
Call course_generation with the learner's goal (and file text if present).`;

const PLAN_INSTRUCTIONS = `You are the simo know study-planner agent.
Call generate_main_tasks with the syllabus text, topic, or imported 课表.
If files are present, read_content first. Do not skip the tool.
After it returns, recap the plan in one short paragraph.`;

export function createAssistAgent({ model, files = [], drive = null, timetable = null, marketplace = [] } = {}) {
  return new Agent({
    name: "instant-assist",
    instructions: ASSIST_INSTRUCTIONS,
    tools: createLearningTools({ store: { files, drive, timetable, marketplace } }),
    model,
  });
}

export function createMaterialsAgent({ model, files = [], drive = null } = {}) {
  return new Agent({
    name: "materials",
    instructions: MATERIALS_INSTRUCTIONS,
    tools: createLearningTools({ store: { files, drive } }),
    model,
  });
}

export function createCourseAgent({ model, files = [], drive = null } = {}) {
  return new Agent({
    name: "course-craft",
    instructions: COURSE_INSTRUCTIONS,
    tools: createLearningTools({ store: { files, drive } }),
    model,
  });
}

export function createStudyPlanAgent({ model, files = [], drive = null, timetable = null, marketplace = [] } = {}) {
  return new Agent({
    name: "study-plan",
    instructions: PLAN_INSTRUCTIONS,
    tools: createLearningTools({ store: { files, drive, timetable, marketplace } }),
    model,
  });
}

/** Shipped entry: study question → tool-using assist result. Debits credits. */
export async function runInstantAssist({
  account,
  question,
  files = [],
  drive = null,
  useDrive = false,
  timetable = null,
  marketplace = [],
  model,
} = {}) {
  if (!question || !String(question).trim()) throw new Error("question required");
  const nextAccount = debitCredits(account, COSTS.assist, "即时协助");
  const agent = createAssistAgent({
    model: model || defaultModel(),
    files,
    drive,
    timetable,
    marketplace,
  });
  const result = await agent.generate(question);
  return { account: nextAccount, result, kind: "assist" };
}

/** Shipped entry: generate cheatsheet + quiz + flashcards. Debits credits. */
export async function runGenerateMaterials({
  account,
  prompt,
  files = [],
  drive = null,
  model,
} = {}) {
  if (!prompt || !String(prompt).trim()) throw new Error("prompt required");
  const nextAccount = debitCredits(account, COSTS.materials, "materials");
  const agent = createMaterialsAgent({ model: model || defaultModel(), files, drive });
  const result = await agent.generate(
    `Generate study materials (cheatsheet, quiz, flashcards) for: ${prompt}`,
  );
  const artifacts = pickArtifacts(result.toolResults);
  return { account: nextAccount, result, artifacts, kind: "materials" };
}

/** Shipped entry: 打造课程. Debits credits (base + per file). */
export async function runCraftCourse({
  account,
  goal,
  files = [],
  language = "zh",
  drive = null,
  model,
} = {}) {
  if (!goal || !String(goal).trim()) throw new Error("goal required");
  const cost = creditCostForCourse({ fileCount: files.length });
  const nextAccount = debitCredits(account, cost, "打造课程");
  const agent = createCourseAgent({ model: model || defaultModel(), files, drive });
  let graph;
  try {
    const result = await agent.generate(`Craft a 1:1 course for: ${goal}`);
    graph = result.toolResults.find((t) => t.name === "course_generation")?.result?.graph;
  } catch {
    graph = null;
  }
  if (!graph) graph = ingestCourse(craftPayloadFromGoal(goal, language, files));
  if (files.length) graph = { ...graph, files };
  return { account: nextAccount, course: graph, cost, kind: "course" };
}

/** Shipped entry: study-plan via generate_main_tasks on the Agent loop. Debits credits. */
export async function runStudyPlan({
  account,
  prompt,
  files = [],
  drive = null,
  timetable = null,
  marketplace = [],
  model,
} = {}) {
  if (!prompt || !String(prompt).trim()) throw new Error("prompt required");
  const nextAccount = debitCredits(account, COSTS.studyPlan, "study-plan");
  const agent = createStudyPlanAgent({
    model: model || defaultModel(),
    files,
    drive,
    timetable,
    marketplace,
  });
  const result = await agent.generate(`Plan study tasks from: ${prompt}`);
  const plan = result.toolResults.find((t) => t.name === "generate_main_tasks")?.result || null;
  return { account: nextAccount, result, plan, kind: "plan" };
}

const VISUAL_INSTRUCTIONS = `You are the simo know visualization agent.
Call generate_diagram with the topic. Do not skip the tool. Then recap the walkthrough.`;

export function createVisualAgent({ model, files = [], drive = null } = {}) {
  return new Agent({
    name: "visual",
    instructions: VISUAL_INSTRUCTIONS,
    tools: createLearningTools({ store: { files, drive } }),
    model,
  });
}

export async function runVisualWalkthrough({ account, prompt, model } = {}) {
  if (!prompt || !String(prompt).trim()) throw new Error("prompt required");
  const nextAccount = debitCredits(account, COSTS.materials, "visual");
  const agent = createVisualAgent({ model: model || defaultModel() });
  const result = await agent.generate(`Interactive visualization for: ${prompt}`);
  const diagram = result.toolResults.find((t) => t.name === "generate_diagram")?.result || null;
  return { account: nextAccount, result, diagram, kind: "diagram" };
}

const ANIM_INSTRUCTIONS = `You are the simo know animation agent.
Call generate_html_animation with the topic. Do not skip the tool. Then recap the moving picture.`;

const VIDEO_INSTRUCTIONS = `You are the simo know instructional-video agent.
Call generate_instructional_video with the topic. Do not skip the tool. Then recap the storyboard.`;

const IMAGE_INSTRUCTIONS = `You are the simo know board-image agent.
Call generate_board_image with the topic. Do not skip the tool. Then recap the illustration.`;

export function createAnimationAgent({ model, files = [], drive = null } = {}) {
  return new Agent({
    name: "html-animation",
    instructions: ANIM_INSTRUCTIONS,
    tools: createLearningTools({ store: { files, drive } }),
    model,
  });
}

export function createVideoAgent({ model, files = [], drive = null } = {}) {
  return new Agent({
    name: "instruction-video",
    instructions: VIDEO_INSTRUCTIONS,
    tools: createLearningTools({ store: { files, drive } }),
    model,
  });
}

export function createBoardImageAgent({ model, files = [], drive = null } = {}) {
  return new Agent({
    name: "board-image",
    instructions: IMAGE_INSTRUCTIONS,
    tools: createLearningTools({ store: { files, drive } }),
    model,
  });
}

export async function runHtmlAnimation({ account, prompt, model } = {}) {
  if (!prompt || !String(prompt).trim()) throw new Error("prompt required");
  const nextAccount = debitCredits(account, COSTS.htmlAnimation, "html-animation");
  const agent = createAnimationAgent({ model: model || defaultModel() });
  const result = await agent.generate(`Interactive animation for: ${prompt}`);
  const animation =
    result.toolResults.find((t) => t.name === "generate_html_animation")?.result || null;
  return { account: nextAccount, result, animation, kind: "animation" };
}

export async function runInstructionalVideo({ account, prompt, model } = {}) {
  if (!prompt || !String(prompt).trim()) throw new Error("prompt required");
  const nextAccount = debitCredits(account, COSTS.instructionVideo, "instruction-video");
  const agent = createVideoAgent({ model: model || defaultModel() });
  const result = await agent.generate(`Instruction video for: ${prompt}`);
  const video =
    result.toolResults.find((t) => t.name === "generate_instructional_video")?.result || null;
  return { account: nextAccount, result, video, kind: "video" };
}

export async function runBoardImage({ account, prompt, model } = {}) {
  if (!prompt || !String(prompt).trim()) throw new Error("prompt required");
  const nextAccount = debitCredits(account, COSTS.boardImage, "board-image");
  const agent = createBoardImageAgent({ model: model || defaultModel() });
  const result = await agent.generate(`Board illustration for: ${prompt}`);
  const image = result.toolResults.find((t) => t.name === "generate_board_image")?.result || null;
  return { account: nextAccount, result, image, kind: "image" };
}

function pickArtifacts(toolResults) {
  const by = Object.fromEntries((toolResults || []).map((t) => [t.name, t.result]));
  const basedOn =
    by.generate_cheatsheet?.basedOn ||
    by.generate_quiz?.basedOn ||
    by.generate_flashcards?.basedOn ||
    "";
  return {
    cheatsheet: by.generate_cheatsheet || null,
    quiz: by.generate_quiz || null,
    flashcards: by.generate_flashcards || null,
    diagram: by.generate_diagram || null,
    animation: by.generate_html_animation || null,
    video: by.generate_instructional_video || null,
    image: by.generate_board_image || null,
    basedOn,
  };
}

function defaultModel() {
  if (process.env.XAI_API_KEY) return createSpaceXaiModel();
  return null;
}

const TUTOR_INSTRUCTIONS = `You are the simo know Deep Learn tutor.
Call socratic_hint. Never give the final answer, definition dump, or worked solution.
After the tool returns, repeat only the hint in your own words. If the learner asks for the answer, give a smaller probe instead.`;

export function createTutorAgent({ model, files = [], drive = null } = {}) {
  return new Agent({
    name: "tutor",
    instructions: TUTOR_INSTRUCTIONS,
    tools: createLearningTools({ store: { files, drive } }),
    model,
  });
}

const BOARD_INSTRUCTIONS = `You are the simo know whiteboard teacher.
Call create_board_session with the learner's topic. Do not skip the tool.
If they uploaded a file, that tool builds a page-synced PDF 导读 (go_to_page, speak, highlight, circle, annotate). Otherwise it builds a chalkboard whiteboard lesson.
Then recap in one short paragraph.`;

export function createBoardAgent({ model, files = [], drive = null } = {}) {
  return new Agent({
    name: "whiteboard",
    instructions: BOARD_INSTRUCTIONS,
    tools: createLearningTools({ store: { files, drive } }),
    model,
  });
}

export async function runCreateBoardSession({ account, prompt, files = [], drive = null, model } = {}) {
  const topic =
    String(prompt || "").trim() || String(files.find((f) => f?.filename)?.filename || "").trim();
  if (!topic) throw new Error("prompt required");
  const nextAccount = debitCredits(account, COSTS.assist, "whiteboard");
  const agent = createBoardAgent({ model: model || defaultModel(), files, drive });
  const result = await agent.generate(`Create a chalkboard whiteboard lesson for: ${topic}`);
  const packed = result.toolResults.find((t) => t.name === "create_board_session")?.result || null;
  const uploaded = files.find((f) => f?.text) || files[0];
  const session =
    packed?.session ||
    (uploaded?.text
      ? craftPdfGuideSession({ topic, sourceText: uploaded.text, sourceName: uploaded.filename, files })
      : craftWhiteboardSession({ topic, drive }));
  const kind = packed?.kind || (craftedPdfId(session?.id) ? "pdf" : "whiteboard");
  return {
    account: nextAccount,
    result,
    session,
    sessionId: packed?.sessionId || session?.id || "",
    kind,
  };
}

const DEEPLEARN_INSTRUCTIONS = `You are the simo know Deep Learn session builder.
Call create_deep_learn_session with the learner's topic. Do not skip the tool.
Then recap the outline in one short paragraph.`;

export function createDeepLearnAgent({ model, files = [], drive = null } = {}) {
  return new Agent({
    name: "deeplearn",
    instructions: DEEPLEARN_INSTRUCTIONS,
    tools: createLearningTools({ store: { files, drive } }),
    model,
  });
}

export async function runCreateDeepLearnSession({ account, prompt, drive = null, model } = {}) {
  if (!prompt || !String(prompt).trim()) throw new Error("prompt required");
  const nextAccount = debitCredits(account, COSTS.deepLearn, "深度学习课堂");
  const agent = createDeepLearnAgent({ model: model || defaultModel(), drive });
  const result = await agent.generate(`Create a Deep Learn session for: ${prompt}`);
  const packed = result.toolResults.find((t) => t.name === "create_deep_learn_session")?.result || null;
  const session = packed?.session || craftDeepLearnSession({ topic: prompt, drive });
  return { account: nextAccount, result, session, sessionId: packed?.sessionId || session?.id || "", kind: "deeplearn" };
}

export async function runTutorHint({ account, prompt, topic, step = 0, model, drive = null } = {}) {
  if (!prompt && !topic) throw new Error("prompt required");
  const nextAccount = debitCredits(account, COSTS.deepLearn, "tutor-hint");
  const agent = createTutorAgent({ model: model || defaultModel(), drive });
  const result = await agent.generate(
    `Give a hint, not the answer, for: ${topic || prompt}. step=${step}`,
  );
  const hint = result.toolResults.find((t) => t.name === "socratic_hint")?.result || null;
  return { account: nextAccount, result, hint, kind: "hint" };
}

export { pickArtifacts };
