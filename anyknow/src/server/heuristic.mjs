/**
 * Offline / no-key model used by /api/assist, /api/materials, /api/plan, /api/course/craft.
 * Shared createLearningTools always includes generate_main_tasks, so plan routing
 * must not substring-match /plan/ (hits "explanation", "plant", …).
 */
import { stripAssistPrefix, teachingExcerpt } from "../domain/kb.mjs";
import { parseAssistBind } from "../domain/assist.mjs";
import { parseStudyStamp } from "../domain/study-mode.mjs";
import { parseDigestStamp } from "../domain/digest.mjs";
import { parsePlanStamp } from "../domain/plan-mode.mjs";
import { parseCraftStamp } from "../domain/craft-mode.mjs";
import { parseTeachBeat } from "../domain/teach-beat.mjs";
import { webSourceName, webSourceText } from "../domain/web.mjs";

export function isStudyPlanPrompt(text) {
  const s = String(text || "");
  return /学习计划|制定计划|\bstudy\s+plans?\b|\bdeadlines?\b|截止日期|规划学习|帮我规划|Plan study tasks from:|根据课表|课表.*计划|从课表安排/i.test(
    s,
  ) || /(?:^|[\s，。,.])计划(?:$|[\s，。,.：:])/.test(s) || /(?:^|[\s，。,.])规划(?:$|[\s，。,.：:])/.test(s);
}

function teachFromKb(file, { speed = "standard", chip = "", level = "", style = "", focus = "" } = {}) {
  const limit = chip === "digest" ? 720 : speed === "fast" ? 180 : 360;
  const clip = teachingExcerpt(file?.text || "", limit);
  const name = file?.filename || "公开教材";
  if (!clip) return `已检索本地公开教材《${name}》。`;
  const stampLead =
    level === "入门" ? "从零讲起" : level === "复习" ? "按复习节奏过一遍" : level === "应考" ? "按应考要点讲" : "";
  if (speed === "fast") {
    const lead = stampLead ? `${stampLead}《${name}》` : `根据《${name}》`;
    return `${lead}：${clip}`;
  }
  if (chip === "solve") {
    return `根据本地公开教材《${name}》分步求解：\n${clip}\n\n先写已知，再选关系，最后自检。不要跳步。`;
  }
  if (chip === "digest") {
    return `长材料消化《${name}》：\n${clip}\n\n抓住定义、机制、一个可迁移的例子。`;
  }
  const styleLine =
    style === "直觉图像"
      ? "先建立图像直觉。"
      : style === "公式推导"
        ? "把公式一步步推出来。"
        : style === "对照例子"
          ? "对照一个例子讲。"
          : "先定义，再机制，再用一个例子自检。";
  const focusLine =
    focus === "核心定义" ? "重点放在定义。" : focus === "推导过程" ? "重点放在推导。" : focus === "考试易错" ? "点出考试易错。" : "";
  if (stampLead) {
    return `${stampLead}《${name}》：${clip}\n\n${styleLine}${focusLine ? ` ${focusLine}` : ""}`;
  }
  return `根据本地公开教材《${name}》：${clip}\n\n${styleLine}${focusLine ? ` ${focusLine}` : ""}`;
}

function cleanTopic(user = "") {
  return stripAssistPrefix(
    String(user || "")
      .replace(/^Generate study materials \(cheatsheet, quiz, flashcards\) for:\s*/i, "")
      .replace(/^Interactive visualization for:\s*/i, "")
      .replace(/^Interactive animation for:\s*/i, "")
      .replace(/^Instruction video for:\s*/i, "")
      .replace(/^Board illustration for:\s*/i, "")
      .replace(/^Create a chalkboard whiteboard lesson for:\s*/i, "")
      .replace(/^Create a Deep Learn session for:\s*/i, ""),
  );
}

function materialsCalls(topic, sourceText = "", sourceName = "") {
  const t = cleanTopic(topic) || topic;
  return [
    { id: "1", name: "generate_cheatsheet", arguments: { topic: t, sourceText, sourceName } },
    { id: "2", name: "generate_quiz", arguments: { topic: t, sourceText, sourceName } },
    { id: "3", name: "generate_flashcards", arguments: { topic: t, sourceText, sourceName } },
  ];
}

function teachCheckCalls(topic, sourceText = "", sourceName = "", stamp = {}, ids = new Set()) {
  const t = cleanTopic(topic) || topic;
  const calls = [];
  if (ids.has("generate_content")) {
    calls.push({
      id: "gc",
      name: "generate_content",
      arguments: {
        topic: t,
        sourceText,
        sourceName,
        level: stamp.level,
        style: stamp.style,
        focus: stamp.focus,
      },
    });
  }
  if (ids.has("generate_quiz")) {
    calls.push({
      id: "gq",
      name: "generate_quiz",
      arguments: { topic: t, sourceText, sourceName },
    });
  }
  if (ids.has("generate_flashcards")) {
    calls.push({
      id: "gf",
      name: "generate_flashcards",
      arguments: { topic: t, sourceText, sourceName },
    });
  }
  return calls;
}

function explainBeatCalls(user, file = {}, stamp = {}, ids = new Set()) {
  const beat = parseTeachBeat(user).beat || "定义";
  const t = cleanTopic(user) || user;
  const sourceText = file?.text || "";
  const sourceName = file?.filename || "";
  if (beat === "测验") {
    if (!ids.has("generate_quiz")) return null;
    return {
      toolCalls: [
        { id: "gq", name: "generate_quiz", arguments: { topic: t, sourceText, sourceName } },
      ],
    };
  }
  const at = beat === "机制例子" ? "机制例子" : "定义";
  const calls = [];
  if (ids.has("generate_content")) {
    calls.push({
      id: "gc",
      name: "generate_content",
      arguments: {
        topic: t,
        sourceText,
        sourceName,
        level: stamp.level,
        style: stamp.style,
        focus: stamp.focus,
        beat: at,
      },
    });
  }
  if (ids.has("ask_questions")) {
    calls.push({
      id: "aq",
      name: "ask_questions",
      arguments: {
        topic: t,
        chip: "teach",
        beat: at,
        level: stamp.level,
        style: stamp.style,
        focus: stamp.focus,
      },
    });
  }
  return calls.length ? { toolCalls: calls } : null;
}

function recapTeachCheck(toolMsgs = []) {
  const by = {};
  for (const m of toolMsgs) {
    if (!m?.name) continue;
    try {
      by[m.name] = JSON.parse(m.content);
    } catch {
      /* skip */
    }
  }
  const content = by.generate_content;
  const quiz = by.generate_quiz;
  const cards = by.generate_flashcards;
  const cheat = by.generate_cheatsheet;
  const web = by.search_and_summarize_web;
  const based = content?.basedOn || quiz?.basedOn || cards?.basedOn || cheat?.basedOn || "";
  const topic = content?.topic || quiz?.topic || "这个概念";
  const lead = content?.lead || (web ? "根据公开网页" : "根据本地公开教材");
  const parts = [];
  if (content) {
    parts.push(based ? `${lead}《${based}》。` : `${lead}「${topic}」。`);
  }
  const extras = [];
  if (cheat) extras.push("两页速查表");
  if (quiz) extras.push("课堂测验");
  if (cards) extras.push("闪卡");
  if (extras.length) {
    if (content) parts.push(`接着用${extras.join("、")}自检。`);
    else parts.push(based ? `按《${based}》做好了${extras.join("、")}。` : `做好了${extras.join("、")}。`);
  }
  return parts.join("") || "先定义，再机制，再用一个例子自检。";
}

const CLOSER_AFTER = new Set([
  "generate_content",
  "generate_quiz",
  "generate_flashcards",
  "generate_cheatsheet",
  "generate_digest",
  "generate_main_tasks",
  "generate_worked_example",
]);

function wantsDiagram(user, bind) {
  return bind.chip === "viz" || /可视化|粉笔示意图|chalkboard diagram|Interactive visualization/i.test(user);
}

function closerCall(user, toolMsgs, ids) {
  if (!ids.has("recommend_next_step")) return null;
  if (toolMsgs.some((m) => m.name === "recommend_next_step")) return null;
  return {
    toolCalls: [
      {
        id: "ns",
        name: "recommend_next_step",
        arguments: {
          topic: cleanTopic(user) || user,
          just: toolMsgs.map((m) => m.name).filter(Boolean).join(","),
        },
      },
    ],
  };
}

export function createHeuristicModel() {
  return {
    async generate({ messages, tools }) {
      const toolMsgs = messages.filter((m) => m.role === "tool");
      const toolTurn = toolMsgs.length;
      const user = [...messages].reverse().find((m) => m.role === "user")?.content || "";
      const ids = new Set((tools || []).map((t) => t.id));
      if (toolTurn === 0) {
        if (ids.has("match_timetable_knowledge") && /相关知识|课表.*知识|预习.*课/i.test(user)) {
          return {
            toolCalls: [{ id: "tk", name: "match_timetable_knowledge", arguments: { query: user } }],
          };
        }
        if (ids.has("search_timetable") && /课表|课程表|今天上什么课|下周(有)?课/i.test(user) && !isStudyPlanPrompt(user)) {
          return {
            toolCalls: [{ id: "st", name: "search_timetable", arguments: { query: user } }],
          };
        }
        if (ids.has("ask_questions") && /\[chip:plan\]/i.test(user) && !parsePlanStamp(user).ready) {
          return {
            toolCalls: [{ id: "aq", name: "ask_questions", arguments: { topic: cleanTopic(user) || user, chip: "plan" } }],
          };
        }
        if (ids.has("generate_main_tasks") && /\[chip:plan\]/i.test(user) && parsePlanStamp(user).ready) {
          return {
            toolCalls: [
              { id: "p", name: "generate_main_tasks", arguments: { text: user, topic: cleanTopic(user) || user } },
            ],
          };
        }
        if (ids.has("generate_main_tasks") && isStudyPlanPrompt(user) && !/\[chip:plan\]/i.test(user)) {
          return {
            toolCalls: [
              { id: "p", name: "generate_main_tasks", arguments: { text: user, topic: user } },
            ],
          };
        }
        if (ids.has("create_board_session") && /白板|whiteboard|create_board|chip:board/i.test(user)) {
          return {
            toolCalls: [{ id: "wb", name: "create_board_session", arguments: { topic: cleanTopic(user) || user } }],
          };
        }
        if (ids.has("create_deep_learn_session") && /deep.?learn|深度学习|create_deep_learn|chip:deeplearn/i.test(user)) {
          return {
            toolCalls: [{ id: "dl", name: "create_deep_learn_session", arguments: { topic: cleanTopic(user) || user } }],
          };
        }
        const bind = parseAssistBind(user);
        const craftStamp = parseCraftStamp(user);
        if (bind.chip === "craft" && !craftStamp.ready && ids.has("ask_questions")) {
          return {
            toolCalls: [{ id: "aq", name: "ask_questions", arguments: { topic: cleanTopic(user) || user, chip: "craft" } }],
          };
        }
        if (bind.chip === "craft" && craftStamp.ready && ids.has("search_files")) {
          return {
            toolCalls: [{ id: "sf", name: "search_files", arguments: { query: user } }],
          };
        }
        if (ids.has("socratic_hint") && (parseTeachBeat(user).stuck || /hint|提示|卡住|不要告诉我答案|tutor|socratic/i.test(user))) {
          const stepMatch = String(user).match(/step=(\d+)/);
          const topic = String(user)
            .replace(/^Give a hint, not the answer, for:\s*/i, "")
            .replace(/\.?\s*step=\d+\s*$/i, "")
            .replace(/\[chip:[a-z]+\]/ig, "")
            .replace(/\[speed:fast\]/ig, "")
            .trim();
          return {
            toolCalls: [
              {
                id: "h",
                name: "socratic_hint",
                arguments: { topic, question: topic, step: stepMatch ? Number(stepMatch[1]) : 0 },
              },
            ],
          };
        }
        if (wantsDiagram(user, bind) && ids.has("generate_diagram") && ids.has("search_files")) {
          return {
            toolCalls: [{ id: "sf", name: "search_files", arguments: { query: user } }],
          };
        }
        if (bind.chip === "pack" && ids.has("generate_cheatsheet")) {
          if (ids.has("search_files")) {
            return { toolCalls: [{ id: "sf", name: "search_files", arguments: { query: user } }] };
          }
          return { toolCalls: materialsCalls(user) };
        }
        if (ids.has("generate_instructional_video") && /教学视频|instruction video|Instruction video/i.test(user)) {
          return {
            toolCalls: [{ id: "v", name: "generate_instructional_video", arguments: { topic: user } }],
          };
        }
        if (ids.has("generate_html_animation") && /互动动画|html animation|交互动画|Interactive animation/i.test(user)) {
          return {
            toolCalls: [{ id: "a", name: "generate_html_animation", arguments: { topic: user } }],
          };
        }
        if (ids.has("generate_board_image") && /配图|board image|Board illustration|illustration/i.test(user)) {
          return {
            toolCalls: [{ id: "i", name: "generate_board_image", arguments: { topic: user } }],
          };
        }
        if (wantsDiagram(user, bind) && ids.has("generate_diagram")) {
          return {
            toolCalls: [{ id: "d", name: "generate_diagram", arguments: { topic: cleanTopic(user) } }],
          };
        }
        if (
          ids.has("generate_cheatsheet") &&
          bind.chip !== "digest" &&
          /cheatsheet|quiz|flashcard|闪卡|测验|速查/i.test(user)
        ) {
          if (ids.has("search_files")) {
            return { toolCalls: [{ id: "sf", name: "search_files", arguments: { query: user } }] };
          }
          return { toolCalls: materialsCalls(user) };
        }
        if (ids.has("course_generation") && bind.chip !== "craft" && /craft|打造|course|课程/i.test(user)) {
          const goal = String(user)
            .replace(/^Craft a 1:1 course for:\s*/i, "")
            .replace(/^打造课程[:：]\s*/i, "")
            .trim();
          return { toolCalls: [{ id: "c", name: "course_generation", arguments: { goal } }] };
        }
        if (ids.has("read_content") && /upload|file|附件|uploaded/i.test(user) && bind.chip !== "digest") {
          return { toolCalls: [{ id: "r", name: "read_content", arguments: {} }] };
        }
        const stamp = parseStudyStamp(user);
        const digest = parseDigestStamp(user);
        if (bind.chip === "explain" && !stamp.ready && ids.has("ask_questions")) {
          return {
            toolCalls: [{ id: "aq", name: "ask_questions", arguments: { topic: cleanTopic(user) || user, chip: "explain" } }],
          };
        }
        if (bind.chip === "digest" && !digest.ready && ids.has("ask_questions")) {
          return {
            toolCalls: [{ id: "aq", name: "ask_questions", arguments: { topic: cleanTopic(user) || user, chip: "digest" } }],
          };
        }
        if (bind.chip === "digest" && digest.ready && ids.has("read_content")) {
          return {
            toolCalls: [{ id: "r", name: "read_content", arguments: { filename: cleanTopic(user) || user } }],
          };
        }
        if (ids.has("search_files")) {
          return {
            toolCalls: [{ id: "sf", name: "search_files", arguments: { query: user } }],
          };
        }
        if (ids.has("search_and_summarize_web")) {
          return {
            toolCalls: [{ id: "s", name: "search_and_summarize_web", arguments: { query: user } }],
          };
        }
        return { text: "Ready." };
      }
      const lastTool = toolMsgs.at(-1);
      if (lastTool?.name === "search_files") {
        const bind = parseAssistBind(user);
        try {
          const payload = JSON.parse(lastTool.content);
          const hit = payload.hits?.[0];
          if (hit?.id && ids.has("read_files")) {
            return {
              toolCalls: [{ id: "rf", name: "read_files", arguments: { fileId: hit.id } }],
            };
          }
        } catch {
          /* fall through */
        }
        if (ids.has("search_and_summarize_web")) {
          return {
            toolCalls: [{ id: "s", name: "search_and_summarize_web", arguments: { query: user } }],
          };
        }
        if (
          ids.has("generate_cheatsheet") &&
          (bind.chip === "pack" || /cheatsheet|quiz|flashcard|闪卡|测验|速查/i.test(user))
        ) {
          return { toolCalls: materialsCalls(user) };
        }
        if (bind.chip === "solve" && ids.has("generate_worked_example")) {
          return {
            toolCalls: [
              {
                id: "w",
                name: "generate_worked_example",
                arguments: { topic: cleanTopic(user) || user },
              },
            ],
          };
        }
        if (bind.chip === "craft" && ids.has("course_generation")) {
          return {
            toolCalls: [{ id: "c", name: "course_generation", arguments: { goal: user } }],
          };
        }
      }
      if (lastTool?.name === "search_and_summarize_web") {
        const bind = parseAssistBind(user);
        let payload = {};
        try {
          payload = JSON.parse(lastTool.content);
        } catch {
          payload = {};
        }
        const cites = payload.citations || [];
        const sourceText = webSourceText(cites) || payload.summary || "";
        const sourceName = webSourceName(cites);
        const stamp = parseStudyStamp(user);
        if (bind.speed === "fast") {
          const clip = sourceText.slice(0, 180);
          return {
            text: sourceName ? `根据公开网页《${sourceName}》：${clip}` : clip || "网上没有可用的公开来源。",
          };
        }
        if (
          ids.has("generate_cheatsheet") &&
          (bind.chip === "pack" || /cheatsheet|quiz|flashcard|闪卡|测验|速查/i.test(user))
        ) {
          return { toolCalls: materialsCalls(user, sourceText, sourceName) };
        }
        if (bind.chip === "solve" && ids.has("generate_worked_example")) {
          return {
            toolCalls: [
              {
                id: "w",
                name: "generate_worked_example",
                arguments: { topic: cleanTopic(user) || user, sourceText, sourceName },
              },
            ],
          };
        }
        if (bind.chip === "digest" && ids.has("generate_digest")) {
          const digest = parseDigestStamp(user);
          return {
            toolCalls: [
              {
                id: "dg",
                name: "generate_digest",
                arguments: {
                  topic: cleanTopic(user) || user,
                  sourceText,
                  sourceName,
                  mode: digest.mode || "详述",
                },
              },
            ],
          };
        }
        if (bind.chip === "craft" && ids.has("course_generation")) {
          return {
            toolCalls: [
              {
                id: "c",
                name: "course_generation",
                arguments: { goal: user, sourceText, sourceName },
              },
            ],
          };
        }
        if (wantsDiagram(user, bind) && ids.has("generate_diagram")) {
          return {
            toolCalls: [
              {
                id: "d",
                name: "generate_diagram",
                arguments: { topic: cleanTopic(user) || user, sourceText, sourceName },
              },
            ],
          };
        }
        if (bind.chip === "explain" && parseStudyStamp(user).ready) {
          const gated = explainBeatCalls(user, { text: sourceText, filename: sourceName }, parseStudyStamp(user), ids);
          if (gated) return gated;
        }
        if (
          ids.has("generate_content") &&
          bind.chip !== "plan" &&
          bind.chip !== "viz" &&
          bind.chip !== "pack" &&
          bind.chip !== "solve" &&
          bind.chip !== "digest" &&
          bind.chip !== "craft"
        ) {
          const calls = teachCheckCalls(user, sourceText, sourceName, stamp, ids);
          if (calls.length) return { toolCalls: calls };
        }
        return {
          text: sourceName ? `根据公开网页《${sourceName}》。` : "已检索公开网页。",
        };
      }
      if (lastTool?.name === "read_files") {
        try {
          const file = JSON.parse(lastTool.content);
          const bind = parseAssistBind(user);
          if (
            file?.ok &&
            ids.has("generate_cheatsheet") &&
            (bind.chip === "pack" || /cheatsheet|quiz|flashcard|闪卡|测验|速查/i.test(user))
          ) {
            return {
              toolCalls: materialsCalls(user, file.text, file.filename),
            };
          }
          if (bind.chip === "solve" && ids.has("generate_worked_example")) {
            return {
              toolCalls: [
                {
                  id: "w",
                  name: "generate_worked_example",
                  arguments: {
                    topic: cleanTopic(user) || user,
                    sourceText: file?.text || "",
                    sourceName: file?.filename || "",
                  },
                },
              ],
            };
          }
          if (bind.chip === "craft" && ids.has("course_generation")) {
            return {
              toolCalls: [
                {
                  id: "c",
                  name: "course_generation",
                  arguments: {
                    goal: user,
                    sourceText: file?.text || "",
                    sourceName: file?.filename || "",
                  },
                },
              ],
            };
          }
          if (bind.chip === "digest" && ids.has("generate_digest") && file?.ok && file.text) {
            const digest = parseDigestStamp(user);
            return {
              toolCalls: [
                {
                  id: "dg",
                  name: "generate_digest",
                  arguments: {
                    topic: cleanTopic(user) || user,
                    sourceText: file.text,
                    sourceName: file.filename || "",
                    mode: digest.mode || "详述",
                  },
                },
              ],
            };
          }
          if (wantsDiagram(user, bind) && ids.has("generate_diagram")) {
            return {
              toolCalls: [
                {
                  id: "d",
                  name: "generate_diagram",
                  arguments: {
                    topic: cleanTopic(user) || user,
                    sourceText: file?.text || "",
                    sourceName: file?.filename || "",
                  },
                },
              ],
            };
          }
          if (file?.ok && file.text) {
            const stamp = parseStudyStamp(user);
            if (bind.speed === "fast") return { text: teachFromKb(file, { ...bind, ...stamp }) };
            if (bind.chip === "explain" && stamp.ready) {
              const gated = explainBeatCalls(user, file, stamp, ids);
              if (gated) return gated;
            }
            if (
              ids.has("generate_content") &&
              bind.chip !== "pack" &&
              bind.chip !== "solve" &&
              bind.chip !== "digest" &&
              bind.chip !== "plan" &&
              bind.chip !== "viz" &&
              bind.chip !== "craft"
            ) {
              const calls = teachCheckCalls(
                user,
                file.text,
                file.filename || "",
                stamp,
                ids,
              );
              if (calls.length) return { toolCalls: calls };
            }
            return { text: teachFromKb(file, { ...bind, ...stamp }) };
          }
        } catch {
          /* fall through */
        }
      }
      if (lastTool?.name === "read_content") {
        try {
          const file = JSON.parse(lastTool.content);
          const bind = parseAssistBind(user);
          if (bind.chip === "digest" && ids.has("generate_digest") && file?.ok && file.text) {
            const digest = parseDigestStamp(user);
            return {
              toolCalls: [
                {
                  id: "dg",
                  name: "generate_digest",
                  arguments: {
                    topic: cleanTopic(user) || user,
                    sourceText: file.text,
                    sourceName: file.filename || "",
                    mode: digest.mode || "详述",
                  },
                },
              ],
            };
          }
          if (bind.chip === "digest" && ids.has("search_files") && !(file?.ok && file.text)) {
            return { toolCalls: [{ id: "sf", name: "search_files", arguments: { query: user } }] };
          }
        } catch {
          /* fall through */
        }
      }
      if (lastTool?.name === "socratic_hint") {
        const bind = parseAssistBind(user);
        const stamp = parseStudyStamp(user);
        const beat = parseTeachBeat(user).beat || "定义";
        if (bind.chip === "explain" && ids.has("ask_questions")) {
          return {
            toolCalls: [
              {
                id: "aq",
                name: "ask_questions",
                arguments: {
                  topic: cleanTopic(user) || user,
                  chip: "teach",
                  beat,
                  level: stamp.level,
                  style: stamp.style,
                  focus: stamp.focus,
                },
              },
            ],
          };
        }
      }
      if (lastTool?.name === "ask_questions") {
        try {
          const ask = JSON.parse(lastTool.content);
          const hintMsg = toolMsgs.find((m) => m.name === "socratic_hint");
          let hint = "";
          if (hintMsg) {
            try {
              const packed = JSON.parse(hintMsg.content);
              hint = packed.hint || packed.text || "";
            } catch {
              hint = "";
            }
          }
          const prompt = ask.prompt || "先选程度、讲法和重点，再开讲。";
          return { text: hint ? `${hint}\n\n${prompt}` : prompt };
        } catch {
          /* fall through */
        }
      }
      if (lastTool?.name === "course_generation") {
        try {
          const packed = JSON.parse(lastTool.content);
          const title = packed.tree?.courseTitle || packed.graph?.title || "这一课";
          const based = packed.tree?.basedOn || packed.graph?.basedOn || "";
          return {
            text: based ? `已按公开教材《${based}》排出「${title}」的课程蓝图。` : `已排出「${title}」的课程蓝图。`,
          };
        } catch {
          /* fall through */
        }
      }
      if (CLOSER_AFTER.has(lastTool?.name)) {
        const closer = closerCall(user, toolMsgs, ids);
        if (closer) return closer;
      }
      if (lastTool?.name === "generate_diagram") {
        try {
          const board = JSON.parse(lastTool.content);
          const based = board.basedOn;
          const topic = board.topic || "这个概念";
          return {
            text: based ? `按公开教材《${based}》画出「${topic}」的粉笔示意图。` : `画出「${topic}」的粉笔示意图。`,
          };
        } catch {
          /* fall through */
        }
      }
      if (lastTool?.name === "recommend_next_step") {
        const names = toolMsgs.map((m) => m.name);
        if (
          names.includes("generate_content") ||
          names.includes("generate_quiz") ||
          names.includes("generate_flashcards") ||
          names.includes("generate_cheatsheet")
        ) {
          return { text: recapTeachCheck(toolMsgs) };
        }
        if (names.includes("generate_digest")) {
          try {
            const board = JSON.parse(toolMsgs.find((m) => m.name === "generate_digest").content);
            const based = board.basedOn;
            const mode = board.mode || "详述";
            const topic = board.topic || "这份材料";
            return {
              text: based ? `按《${based}》做${mode}消化「${topic}」。下一步可以接着练。` : `${mode}消化「${topic}」。`,
            };
          } catch {
            /* fall through */
          }
        }
        if (names.includes("generate_main_tasks")) {
          try {
            const plan = JSON.parse(toolMsgs.find((m) => m.name === "generate_main_tasks").content);
            const n = (plan.tasks || []).length;
            const topic = plan.topic || "这一课";
            return {
              text: n
                ? `排出「${topic}」的 ${n} 项待确认任务。接受的才会写进学习动态。`
                : `还没排出可确认的任务。`,
            };
          } catch {
            /* fall through */
          }
        }
        if (names.includes("generate_worked_example")) {
          try {
            const board = JSON.parse(toolMsgs.find((m) => m.name === "generate_worked_example").content);
            const based = board.basedOn;
            const topic = board.topic || "这道题";
            return {
              text: based ? `按公开教材《${based}》分步求解「${topic}」。` : `按已知 → 关系 → 步骤自检。`,
            };
          } catch {
            /* fall through */
          }
        }
        return { text: recapTeachCheck(toolMsgs) };
      }
      if (lastTool?.name === "generate_digest") {
        const closer = closerCall(user, toolMsgs, ids);
        if (closer) return closer;
        try {
          const board = JSON.parse(lastTool.content);
          const based = board.basedOn;
          const mode = board.mode || "详述";
          const topic = board.topic || "这份材料";
          return {
            text: based ? `按《${based}》做${mode}消化「${topic}」。` : `${mode}消化「${topic}」。`,
          };
        } catch {
          /* fall through */
        }
      }
      if (lastTool?.name === "generate_main_tasks") {
        const closer = closerCall(user, toolMsgs, ids);
        if (closer) return closer;
        try {
          const plan = JSON.parse(lastTool.content);
          const n = (plan.tasks || []).length;
          const topic = plan.topic || "这一课";
          return {
            text: n
              ? `排出「${topic}」的 ${n} 项待确认任务。接受的才会写进学习动态。`
              : `还没排出可确认的任务。`,
          };
        } catch {
          /* fall through */
        }
      }
      if (lastTool?.name === "generate_worked_example") {
        const closer = closerCall(user, toolMsgs, ids);
        if (closer) return closer;
        try {
          const board = JSON.parse(lastTool.content);
          const based = board.basedOn;
          const topic = board.topic || "这道题";
          return {
            text: based ? `按公开教材《${based}》分步求解「${topic}」。` : `按已知 → 关系 → 步骤自检。`,
          };
        } catch {
          /* fall through */
        }
      }
      const names = messages.filter((m) => m.role === "tool").map((m) => m.name);
      return {
        text: names.includes("course_generation")
          ? "课程结构已生成：单元 → 讲次 → 课时，可预览并加入。"
          : `我用工具 ${names.join("、")} 查过材料。核心结论：先定义，再机制，再用一个例子自检。`,
      };
    },
  };
}
