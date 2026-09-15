import assert from "node:assert/strict";
import test from "node:test";
import { Agent } from "../src/agent/framework.mjs";
import {
  createAssistAgent,
  createMaterialsAgent,
  runGenerateMaterials,
  runInstantAssist,
} from "../src/agent/runtime.mjs";
import { createAccount } from "../src/domain/credits.mjs";

/**
 * Tool-requesting model double. It does not implement the agent loop —
 * Agent.generate() does. First turn requests tools; later turns finish.
 */
function toolRequestingModel({ onFirst }) {
  return {
    generate: async ({ messages, tools }) => {
      const toolTurn = messages.filter((m) => m.role === "tool").length;
      if (toolTurn === 0) return onFirst({ messages, tools });
      const names = messages.filter((m) => m.role === "tool").map((m) => m.name);
      return {
        text: `Taught with tools: ${names.join(", ")}.`,
      };
    },
  };
}

test("Agent.generate drives a tool-using study assist (loop not mocked)", async () => {
  const model = toolRequestingModel({
    onFirst: () => ({
      toolCalls: [
        {
          id: "c1",
          name: "search_and_summarize_web",
          arguments: { query: "sociological imagination" },
        },
      ],
    }),
  });
  const agent = createAssistAgent({ model });
  assert.ok(agent instanceof Agent);
  const result = await agent.generate("What is the sociological imagination?");
  assert.equal(result.steps, 2);
  assert.equal(result.toolResults.length, 1);
  assert.equal(result.toolResults[0].name, "search_and_summarize_web");
  assert.match(result.text, /search_and_summarize_web/);
  assert.ok(result.toolResults[0].result.citations.length >= 1);
  assert.match(result.toolResults[0].result.citations[0].url, /^https:\/\//);
  assert.ok(result.toolResults[0].result.citations[0].id);
  assert.ok(result.toolResults[0].result.citations[0].title);
  assert.doesNotMatch(JSON.stringify(result.toolResults[0].result), /Course notes|Reference explainer/i);
});

test("runInstantAssist uses file text via read_content and debits credits", async () => {
  const account = createAccount({ email: "a@anyknow.test", password: "x", credits: 20 });
  const files = [
    { filename: "mills.txt", text: "Mills: personal troubles vs public issues." },
  ];
  const model = toolRequestingModel({
    onFirst: () => ({
      toolCalls: [{ id: "r1", name: "read_content", arguments: { filename: "mills.txt" } }],
    }),
  });
  const { account: next, result } = await runInstantAssist({
    account,
    question: "Explain the uploaded distinction.",
    files,
    model,
  });
  assert.equal(next.credits, 19);
  assert.equal(result.toolResults[0].name, "read_content");
  assert.match(result.toolResults[0].result.text, /public issues/);
  assert.match(result.text, /read_content/);
});

test("runGenerateMaterials yields cheatsheet, quiz, and flashcards through the loop", async () => {
  const account = createAccount({ email: "b@anyknow.test", password: "x", credits: 20 });
  const files = [{ filename: "src.txt", text: "Ordinary least squares minimizes squared residuals." }];
  const model = toolRequestingModel({
    onFirst: () => ({
      toolCalls: [
        { id: "t1", name: "generate_cheatsheet", arguments: { topic: "OLS", sourceText: files[0].text } },
        { id: "t2", name: "generate_quiz", arguments: { topic: "OLS", sourceText: files[0].text } },
        { id: "t3", name: "generate_flashcards", arguments: { topic: "OLS", sourceText: files[0].text } },
      ],
    }),
  });
  const { account: next, artifacts, result } = await runGenerateMaterials({
    account,
    prompt: "OLS cheatsheet + quiz + cards",
    files,
    model,
  });
  assert.equal(next.credits, 17);
  assert.equal(artifacts.cheatsheet.kind, "cheatsheet");
  assert.ok(artifacts.cheatsheet.sections.length >= 1);
  assert.equal(artifacts.quiz.kind, "quiz");
  assert.ok(artifacts.quiz.questions.length >= 1);
  assert.equal(artifacts.flashcards.kind, "flashcards");
  assert.ok(artifacts.flashcards.cards.length >= 1);
  const names = result.toolResults.map((t) => t.name).sort();
  assert.deepEqual(names, ["generate_cheatsheet", "generate_flashcards", "generate_quiz"]);
});

test("guest BYOK accounts skip the credit debit wall", async () => {
  const account = { ...createAccount({ email: "guest@local", password: "", credits: 0 }), guest: true };
  const model = toolRequestingModel({
    onFirst: () => ({
      toolCalls: [{ id: "s", name: "search_and_summarize_web", arguments: { query: "mills" } }],
    }),
  });
  const { account: next } = await runInstantAssist({ account, question: "What is Mills?", model });
  assert.equal(next.guest, true);
  assert.equal(next.credits, 0);
  assert.equal(next.lastDebit.skipped, true);
});

test("zero-balance generation is rejected by the shipped debit path", async () => {
  const account = createAccount({ email: "c@anyknow.test", password: "x", credits: 0 });
  const model = toolRequestingModel({
    onFirst: () => ({ text: "should not run" }),
  });
  await assert.rejects(
    () =>
      runGenerateMaterials({
        account,
        prompt: "anything",
        model,
      }),
    (err) => {
      assert.equal(err.code, "INSUFFICIENT_CREDITS");
      assert.equal(err.remaining, 0);
      return true;
    },
  );
  await assert.rejects(
    () => runInstantAssist({ account, question: "why?", model }),
    /credits/,
  );
});

test("materials agent is the real Agent loop (createMaterialsAgent)", async () => {
  const model = toolRequestingModel({
    onFirst: () => ({
      toolCalls: [
        { id: "a", name: "generate_cheatsheet", arguments: { topic: "X" } },
        { id: "b", name: "generate_quiz", arguments: { topic: "X" } },
        { id: "c", name: "generate_flashcards", arguments: { topic: "X" } },
      ],
    }),
  });
  const agent = createMaterialsAgent({ model });
  const result = await agent.generate("Generate study materials for X");
  assert.equal(result.agent, "materials");
  assert.equal(result.toolResults.length, 3);
});
