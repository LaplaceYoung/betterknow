import assert from "node:assert/strict";
import test from "node:test";
import { Agent } from "../src/agent/framework.mjs";
import { createAssistAgent, runGenerateMaterials, runInstantAssist, runTutorHint } from "../src/agent/runtime.mjs";
import { createAccount } from "../src/domain/credits.mjs";
import { createDrive, uploadFile } from "../src/domain/kb.mjs";
import { createHeuristicModel } from "../src/server/heuristic.mjs";
import { seedPublicTextbooks } from "../src/server/seed.mjs";

function toolRequestingModel({ onTurn }) {
  return {
    generate: async ({ messages, tools }) => {
      const toolTurn = messages.filter((m) => m.role === "tool").length;
      return onTurn({ messages, tools, toolTurn });
    },
  };
}

function seedDrive() {
  const up = uploadFile(createDrive({ quotaBytes: 50_000 }), {
    filename: "mills-notes.txt",
    text: "Mills: personal troubles vs public issues. Biography intersects history.",
  });
  return { drive: up.drive, file: up.file };
}

test("assist loop search_files then read_files on the same knowledge-base store", async () => {
  const { drive, file } = seedDrive();
  const account = createAccount({ email: "kb@anyknow.test", password: "x", credits: 20 });
  const model = toolRequestingModel({
    onTurn: ({ messages, toolTurn, tools }) => {
      const ids = (tools || []).map((t) => t.id);
      assert.ok(ids.includes("search_files"));
      assert.ok(ids.includes("read_files"));
      if (toolTurn === 0) {
        return {
          toolCalls: [{ id: "s1", name: "search_files", arguments: { query: "public issues" } }],
        };
      }
      if (toolTurn === 1) {
        const prev = messages.filter((m) => m.role === "tool").at(-1);
        const payload = JSON.parse(prev.content);
        assert.equal(payload.hits.length, 1);
        assert.equal(payload.hits[0].id, file.id);
        return {
          toolCalls: [
            { id: "r1", name: "read_files", arguments: { fileId: payload.hits[0].id } },
          ],
        };
      }
      return { text: "Biography ∩ history is the sociological imagination." };
    },
  });
  const { account: next, result } = await runInstantAssist({
    account,
    question: "What did Mills write about public issues?",
    drive,
    useDrive: true,
    model,
  });
  assert.equal(next.credits, 19);
  assert.equal(result.toolResults[0].name, "search_files");
  assert.equal(result.toolResults[1].name, "read_files");
  assert.match(result.toolResults[1].result.text, /personal troubles vs public issues/);
  assert.equal(result.toolResults[1].result.fileId, file.id);
  assert.ok(result.agent === undefined || result.agent === "instant-assist");
});

test("createAssistAgent is the real Agent loop against the drive", async () => {
  const { drive, file } = seedDrive();
  const model = toolRequestingModel({
    onTurn: ({ toolTurn }) => {
      if (toolTurn === 0) {
        return { toolCalls: [{ id: "s", name: "search_files", arguments: { query: "Mills" } }] };
      }
      if (toolTurn === 1) {
        return { toolCalls: [{ id: "r", name: "read_files", arguments: { fileId: file.id } }] };
      }
      return { text: "ok" };
    },
  });
  const agent = createAssistAgent({ model, drive });
  assert.ok(agent instanceof Agent);
  const result = await agent.generate("Use my knowledge base.");
  assert.match(result.toolResults.find((t) => t.name === "read_files").result.text, /Biography intersects history/);
});

test("materials with drive still debit; zero-balance still rejects", async () => {
  const { drive } = seedDrive();
  const rich = createAccount({ email: "m@anyknow.test", password: "x", credits: 20 });
  const model = toolRequestingModel({
    onTurn: ({ toolTurn }) => {
      if (toolTurn === 0) {
        return {
          toolCalls: [
            { id: "a", name: "generate_cheatsheet", arguments: { topic: "Mills" } },
            { id: "b", name: "generate_quiz", arguments: { topic: "Mills" } },
            { id: "c", name: "generate_flashcards", arguments: { topic: "Mills" } },
          ],
        };
      }
      return { text: "materials ready" };
    },
  });
  const { account: next } = await runGenerateMaterials({
    account: rich,
    prompt: "Mills cheatsheet quiz flashcards",
    drive,
    model,
  });
  assert.equal(next.credits, 17);

  const broke = createAccount({ email: "z@anyknow.test", password: "x", credits: 0 });
  await assert.rejects(
    () => runInstantAssist({ account: broke, question: "use drive", drive, useDrive: true, model }),
    (err) => err.code === "INSUFFICIENT_CREDITS",
  );
});

test("explain chip without a study stamp asks level / style / focus first", async () => {
  const drive = seedPublicTextbooks(createDrive({ ownerId: "assist-oer" }));
  const account = createAccount({ email: "oer-assist@anyknow.test", password: "x", credits: 20 });
  const { result } = await runInstantAssist({
    account,
    question: "用粉笔把这个概念讲清楚：微积分",
    drive,
    model: createHeuristicModel(),
  });
  assert.equal(result.toolResults[0].name, "ask_questions");
  assert.ok(!result.toolResults.some((t) => t.name === "search_files"));
  const ask = result.toolResults[0].result;
  assert.equal(ask.kind, "ask");
  assert.equal(ask.topic, "微积分");
  assert.match(result.text, /先选程度、讲法和重点/);
  assert.doesNotMatch(result.text, /已检索|License:/);
});

test("explain chip with a study stamp retrieves 公开教材 and teaches to that stamp", async () => {
  const drive = seedPublicTextbooks(createDrive({ ownerId: "assist-stamp" }));
  const account = createAccount({ email: "oer-stamp@anyknow.test", password: "x", credits: 20 });
  const { result } = await runInstantAssist({
    account,
    question: "[chip:explain] [stamp level=入门 style=直觉图像 focus=核心定义] 微积分",
    drive,
    model: createHeuristicModel(),
  });
  assert.equal(result.toolResults[0].name, "search_files");
  assert.equal(result.toolResults[1].name, "read_files");
  assert.match(result.toolResults[1].result.filename, /limit|derivative|calculus/i);
  const content = result.toolResults.find((t) => t.name === "generate_content")?.result;
  assert.ok(content);
  assert.equal(content.kind, "content");
  assert.deepEqual(
    content.cards.map((c) => c.id),
    ["def"],
  );
  assert.ok(content.diagram?.svg);
  assert.match(result.text, /从零讲起|定义/);
  const ask = result.toolResults.find((t) => t.name === "ask_questions")?.result;
  assert.equal(ask.chip, "teach");
  assert.ok(!result.toolResults.some((t) => t.name === "generate_quiz"));
  assert.doesNotMatch(JSON.stringify(content), /License:|hyperknow|orbie/i);
});

test("tutor hint over OER names the source file and still withholds the answer", async () => {
  const drive = seedPublicTextbooks(createDrive({ ownerId: "tutor-oer" }));
  const account = createAccount({ email: "oer-tutor@anyknow.test", password: "x", credits: 20 });
  const { hint } = await runTutorHint({
    account,
    topic: "微积分",
    drive,
    model: createHeuristicModel(),
  });
  assert.equal(hint.withheld, true);
  assert.equal(hint.retrieved, true);
  assert.match(hint.hint, /limit|derivative|calculus/i);
  assert.doesNotMatch(hint.hint, /答案是|the answer is/i);
});

test("pack chip grounds materials in retrieved 公开教材", async () => {
  const drive = seedPublicTextbooks(createDrive({ ownerId: "pack-oer" }));
  const account = createAccount({ email: "pack@anyknow.test", password: "x", credits: 20 });
  const { artifacts, result } = await runGenerateMaterials({
    account,
    prompt: "帮我做一张两页速查表：微积分",
    drive,
    model: createHeuristicModel(),
  });
  assert.equal(result.toolResults[0].name, "search_files");
  assert.ok(result.toolResults.some((t) => t.name === "read_files"));
  assert.ok(result.toolResults.some((t) => t.name === "generate_cheatsheet"));
  assert.doesNotMatch(artifacts.cheatsheet.title, /\[chip:|Generate study materials/i);
  assert.match(artifacts.basedOn, /limit|derivative|calculus|fundamental/i);
  assert.match(
    artifacts.cheatsheet.sections[0].bullets.join(" "),
    /limit|derivative|tangent|function|integral|calculus|theorem/i,
  );
  assert.doesNotMatch(JSON.stringify(artifacts), /License:/);
});

test("pack chip through instant assist stays a conversation with grounded quiz and cards", async () => {
  const drive = seedPublicTextbooks(createDrive({ ownerId: "pack-assist" }));
  const account = createAccount({ email: "pack-assist@anyknow.test", password: "x", credits: 20 });
  const { result } = await runInstantAssist({
    account,
    question: "[chip:pack] 帮我做一张两页速查表：微积分",
    drive,
    model: createHeuristicModel(),
  });
  assert.equal(result.toolResults[0].name, "search_files");
  assert.ok(result.toolResults.some((t) => t.name === "read_files"));
  const quiz = result.toolResults.find((t) => t.name === "generate_quiz")?.result;
  const cards = result.toolResults.find((t) => t.name === "generate_flashcards")?.result;
  const cheat = result.toolResults.find((t) => t.name === "generate_cheatsheet")?.result;
  assert.equal(quiz.kind, "quiz");
  assert.equal(cards.kind, "flashcards");
  assert.equal(cheat.kind, "cheatsheet");
  assert.match(quiz.basedOn, /limit|derivative|calculus|fundamental|antiderivative/i);
  assert.match(quiz.questions[0].prompt, /核心/);
  assert.match(quiz.questions[0].explanation, /根据《/);
  assert.match(result.text, /两页速查表|课堂测验|闪卡/);
  assert.doesNotMatch(JSON.stringify(quiz), /License:|What is the central idea|hyperknow|orbie/i);
});

test("digest chip without a reading stamp asks 精读 / 详述 / 导读 first", async () => {
  const drive = seedPublicTextbooks(createDrive({ ownerId: "digest-ask" }));
  const account = createAccount({ email: "digest-ask@anyknow.test", password: "x", credits: 20 });
  const { result } = await runInstantAssist({
    account,
    question: "[chip:digest] 帮我消化这份长材料：微积分",
    drive,
    model: createHeuristicModel(),
  });
  assert.equal(result.toolResults[0].name, "ask_questions");
  assert.ok(!result.toolResults.some((t) => t.name === "search_files"));
  assert.ok(!result.toolResults.some((t) => t.name === "generate_cheatsheet"));
  const ask = result.toolResults[0].result;
  assert.equal(ask.chip, "digest");
  assert.deepEqual(ask.questions[0].options, ["精读", "详述", "导读"]);
  assert.match(result.text, /先选读法/);
});

test("digest chip with a stamp prefers read_content then paints a cited digest", async () => {
  const drive = seedPublicTextbooks(createDrive({ ownerId: "digest-oer" }));
  const account = createAccount({ email: "digest@anyknow.test", password: "x", credits: 20 });
  const { result } = await runInstantAssist({
    account,
    question: "[chip:digest] [stamp mode=精读] 帮我消化这份长材料：微积分",
    drive,
    model: createHeuristicModel(),
  });
  assert.equal(result.toolResults[0].name, "read_content");
  const digest = result.toolResults.find((t) => t.name === "generate_digest")?.result;
  assert.ok(digest);
  assert.equal(digest.kind, "digest");
  assert.equal(digest.mode, "精读");
  assert.ok(digest.citations.length >= 1);
  assert.match(digest.basedOn, /limit|derivative|calculus|integral|antiderivative/i);
  assert.ok(digest.cards.some((c) => c.id === "traps"));
  assert.ok(!result.toolResults.some((t) => t.name === "generate_cheatsheet"));
  assert.match(result.text, /精读|消化/);
  assert.doesNotMatch(JSON.stringify(digest), /License:|hyperknow|orbie|pdf-session/i);
});

test("digest chip reads an uploaded file before the drive", async () => {
  const drive = seedPublicTextbooks(createDrive({ ownerId: "digest-up" }));
  const account = createAccount({ email: "digest-up@anyknow.test", password: "x", credits: 20 });
  const { result } = await runInstantAssist({
    account,
    question: "[chip:digest] [stamp mode=导读] 帮我消化这份长材料：Mills",
    files: [
      {
        filename: "mills-notes.txt",
        text: "Mills: personal troubles vs public issues. Biography intersects history. The sociological imagination locates a private case on a public structure.",
      },
    ],
    drive,
    model: createHeuristicModel(),
  });
  assert.equal(result.toolResults[0].name, "read_content");
  const digest = result.toolResults.find((t) => t.name === "generate_digest")?.result;
  assert.equal(digest.mode, "导读");
  assert.equal(digest.basedOn, "mills-notes.txt");
  assert.ok(!digest.cards.some((c) => c.id === "traps"));
  assert.match(digest.citations[0].span, /troubles|biography|imagination/i);
});

test("viz chip searches 公开教材 then paints a grounded chalkboard diagram", async () => {
  const drive = seedPublicTextbooks(createDrive({ ownerId: "viz-oer" }));
  const account = createAccount({ email: "viz@anyknow.test", password: "x", credits: 20 });
  const { result } = await runInstantAssist({
    account,
    question: "[chip:viz] 把这个过程画成粉笔示意图：微积分",
    drive,
    model: createHeuristicModel(),
  });
  assert.equal(result.toolResults[0].name, "search_files");
  const diagram = result.toolResults.find((t) => t.name === "generate_diagram")?.result;
  assert.ok(diagram?.svg.includes("<svg"));
  assert.match(diagram.basedOn, /limit|derivative|calculus|integral|antiderivative/i);
  assert.doesNotMatch(JSON.stringify(diagram), /biography|history|Course notes|hyperknow|orbie/i);
  assert.match(result.text, /粉笔示意图|示意图/);
});

test("solve chip generates a grounded worked-example board", async () => {
  const drive = seedPublicTextbooks(createDrive({ ownerId: "solve-oer" }));
  const account = createAccount({ email: "solve@anyknow.test", password: "x", credits: 20 });
  const { result } = await runInstantAssist({
    account,
    question: "[chip:solve] 帮我一步步解这道题：定积分",
    drive,
    model: createHeuristicModel(),
  });
  assert.equal(result.toolResults[0].name, "search_files");
  const worked = result.toolResults.find((t) => t.name === "generate_worked_example")?.result;
  assert.ok(worked);
  assert.equal(worked.kind, "worked");
  assert.deepEqual(
    worked.cards.map((c) => c.id),
    ["known", "find", "relation", "steps", "check", "traps"],
  );
  assert.match(worked.basedOn, /integral|antiderivative|substitution|calculus/i);
  assert.doesNotMatch(JSON.stringify(worked), /License:|hyperknow|orbie/i);
});

test("fast speed skips generate_content and keeps a short KB recap", async () => {
  const drive = seedPublicTextbooks(createDrive({ ownerId: "fast-oer" }));
  const account = createAccount({ email: "fast@anyknow.test", password: "x", credits: 20 });
  const model = createHeuristicModel();
  const std = await runInstantAssist({
    account,
    question: "[chip:explain] [stamp level=复习 style=公式推导 focus=核心定义] 微积分",
    drive,
    model,
  });
  const fast = await runInstantAssist({
    account: std.account,
    question: "[chip:explain] [speed:fast] [stamp level=复习 style=公式推导 focus=核心定义] 微积分",
    drive,
    model,
  });
  assert.ok(std.result.toolResults.some((t) => t.name === "generate_content"));
  assert.ok(!std.result.toolResults.some((t) => t.name === "generate_quiz"));
  assert.ok(!fast.result.toolResults.some((t) => t.name === "generate_content"));
  assert.ok(!fast.result.toolResults.some((t) => t.name === "generate_quiz"));
  assert.match(fast.result.text, /根据《|按复习节奏过一遍《/);
});

test("KB miss uses web citations then teach-check, not Course notes", async () => {
  const drive = seedPublicTextbooks(createDrive({ ownerId: "web-miss" }));
  const account = createAccount({ email: "web@anyknow.test", password: "x", credits: 20 });
  const { result } = await runInstantAssist({
    account,
    question: "[chip:explain] [stamp level=入门 style=直觉图像 focus=核心定义] mitosis",
    drive,
    model: createHeuristicModel(),
  });
  assert.equal(result.toolResults[0].name, "search_files");
  const web = result.toolResults.find((t) => t.name === "search_and_summarize_web")?.result;
  assert.ok(web);
  assert.match(web.citations[0].url, /^https:\/\/openstax\.org\//);
  assert.match(web.citations[0].snippet, /mitosis|cell cycle/i);
  assert.doesNotMatch(JSON.stringify(web), /Course notes|hyperknow|orbie/i);
  const content = result.toolResults.find((t) => t.name === "generate_content")?.result;
  assert.equal(content.kind, "content");
  assert.match(content.basedOn, /OpenStax|Cell Cycle/i);
  assert.deepEqual(content.cards.map((c) => c.id), ["def"]);
  assert.ok(!result.toolResults.some((t) => t.name === "generate_quiz"));
  assert.match(result.text, /公开网页|OpenStax|从零讲起|定义/);
});
