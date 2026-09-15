import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import {
  MEDIA,
  chalkboardAnimation,
  chalkboardImage,
  chalkboardVideo,
  sceneForTopic,
} from "../src/domain/media.mjs";
import { leftoverExamState, leftoverPracticeState, matchAnswer } from "../src/domain/exam.mjs";
import { parseWhiteboardReplay } from "../src/domain/whiteboard.mjs";
import { PYTHAGOREAN, REGRESSION } from "../src/domain/whiteboard-catalog.mjs";
import { createAccount } from "../src/domain/credits.mjs";
import {
  createAnimationAgent,
  runBoardImage,
  runHtmlAnimation,
  runInstructionalVideo,
} from "../src/agent/runtime.mjs";
import { Agent } from "../src/agent/framework.mjs";
import { fulfillMedia, mediaHealth } from "../src/server/media.mjs";
import { materialsPack } from "../src/domain/materials.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function toolRequestingModel({ onFirst }) {
  return {
    generate: async ({ messages, tools }) => {
      const toolTurn = messages.filter((m) => m.role === "tool").length;
      if (toolTurn === 0) return onFirst({ messages, tools });
      const names = messages.filter((m) => m.role === "tool").map((m) => m.name);
      return { text: `Taught with tools: ${names.join(", ")}.` };
    },
  };
}

test("chalkboard animation / image / video specs stay local with empty providers", () => {
  assert.equal(MEDIA.interactiveAnimation, "互动动画");
  assert.equal(MEDIA.instructionVideo, "教学视频");
  assert.equal(MEDIA.kickerInteractive, "互动");
  assert.equal(MEDIA.boardImage, "配图");
  assert.equal(sceneForTopic("rotate 360 hypotenuse"), "triangle-rotate");
  assert.equal(sceneForTopic("Pencil Test residual outlier slope"), "scatter-cloud");
  assert.equal(sceneForTopic("OLS U-shape vs MAE V-shape closed-form cost"), "scatter-cloud");
  assert.equal(sceneForTopic("sum of residuals ŷ normal equations SSE valley"), "scatter-cloud");
  assert.equal(sceneForTopic("mean-mean pivot beta1 covariance slope"), "scatter-cloud");
  assert.equal(sceneForTopic("hyperplane residual ŷ regression plane"), "scatter-cloud");
  const anim = chalkboardAnimation({ topic: "vertex angle 120 Pythagorean equality", scene: "angle-open" });
  assert.equal(anim.kind, "animation");
  assert.equal(anim.provider, "pending");
  assert.match(anim.svg, /<svg/);
  assert.doesNotMatch(anim.svg, /hyperknow|orbie|animationHtml/i);
  const image = chalkboardImage({ caption: "Mapping Study Hours vs. Test Scores" });
  assert.equal(image.src, "");
  assert.match(image.svg, /study hours/);
  const video = chalkboardVideo({ topic: "right triangles" });
  assert.equal(video.src, "");
  assert.deepEqual(
    video.stages.map((s) => s.id),
    ["script", "narration", "code", "render"],
  );
  assert.equal(video.stages.every((s) => s.done), true);
  assert.equal(mediaHealth().animation, false);
});

test("leftover exam and practice keep animation questions as chalkboard specs", () => {
  const unit1 = leftoverExamState({ courseId: "pythagorean", examId: "unit1" });
  const anim = unit1.questions.find((q) => q.type === "animation");
  assert.equal(unit1.questions.length, 16);
  assert.ok(anim);
  assert.equal(anim.animation.scene, "angle-open");
  assert.match(anim.animation.svg, /<svg/);
  assert.equal("animationHtml" in anim, false);
  assert.equal(
    matchAnswer(
      anim,
      "Because the side connecting the legs must stretch to cover the wider opening, making its square area too large.",
    ),
    true,
  );
  const unit3 = leftoverExamState({
    courseId: "3ea5b7d5-d475-4c4f-84bf-9834e24a35c2",
    examId: "unit3",
  });
  assert.equal(unit3.questions.length, 16);
  assert.equal(unit3.questions.at(-1).animation.scene, "prism-height");
  const anatomy = leftoverPracticeState({
    courseId: "pythagorean",
    sessionId: "d62f9bbb-2902-49e5-b415-816a31207dda",
  });
  assert.equal(anatomy.questions.length, 5);
  assert.equal(anatomy.questions.at(-1).type, "animation");
  assert.equal(anatomy.questions.at(-1).animation.scene, "triangle-rotate");
  const catalog = readFileSync(join(root, "src/domain/exam-catalog.mjs"), "utf8");
  assert.doesNotMatch(catalog, /animationHtml|hyperknow|orbie/i);
});

test("whiteboard leftover plays generated_image and generated_animation as chalkboard cards", () => {
  const parsed = parseWhiteboardReplay(PYTHAGOREAN);
  assert.ok(parsed.frames.some((f) => f.type === "animation"));
  assert.match(parsed.frames.find((f) => f.type === "animation").svg, /<svg/);
  const regression = parseWhiteboardReplay(REGRESSION);
  const image = regression.frames.find((f) => f.type === "image");
  assert.ok(image);
  assert.match(image.caption, /Study Hours/);
  assert.equal(image.svg.includes("hyperknow"), false);
  const painted = JSON.stringify({ parsed, regression });
  assert.doesNotMatch(painted, /tts_url|audio_url|hyperknow|orbie|rk\d+/i);
});

test("empty media hooks return chalkboard artifacts", async () => {
  const animation = await fulfillMedia("animation", { topic: "right triangle rotate 360" });
  assert.equal(animation.provider, "pending");
  assert.equal(animation.kind, "animation");
  const video = await fulfillMedia("video", { topic: "Pythagorean walkthrough" });
  assert.equal(video.kind, "video");
  assert.equal(video.src, "");
  const image = await fulfillMedia("image", { caption: "scatter cloud" });
  assert.equal(image.kind, "image");
});

test("html animation / video / board image run through the Agent loop", async () => {
  const account = createAccount({ email: "media@anyknow.test", password: "x", credits: 20 });
  const model = toolRequestingModel({
    onFirst: ({ tools }) => {
      assert.ok((tools || []).some((t) => t.id === "generate_html_animation"));
      return {
        toolCalls: [{ id: "a1", name: "generate_html_animation", arguments: { topic: "Mills" } }],
      };
    },
  });
  assert.ok(createAnimationAgent({ model }) instanceof Agent);
  const { account: next, animation } = await runHtmlAnimation({
    account,
    prompt: "Interactive animation of overlapping circles",
    model,
  });
  assert.equal(next.credits, 17);
  assert.equal(animation.kind, "animation");
  const videoModel = toolRequestingModel({
    onFirst: () => ({
      toolCalls: [{ id: "v1", name: "generate_instructional_video", arguments: { topic: "OLS" } }],
    }),
  });
  const videoOut = await runInstructionalVideo({
    account: createAccount({ email: "vid@anyknow.test", password: "x", credits: 20 }),
    prompt: "Instruction video for OLS",
    model: videoModel,
  });
  assert.equal(videoOut.video.kind, "video");
  const imageOut = await runBoardImage({
    account: createAccount({ email: "img@anyknow.test", password: "x", credits: 20 }),
    prompt: "Board illustration of a scatter cloud",
    model: toolRequestingModel({
      onFirst: () => ({
        toolCalls: [{ id: "i1", name: "generate_board_image", arguments: { topic: "cloud" } }],
      }),
    }),
  });
  assert.equal(imageOut.account.credits, 18);
  assert.equal(imageOut.image.kind, "image");
});

test("materials pack surfaces animation and video tabs", () => {
  const pack = materialsPack({
    animation: chalkboardAnimation({ topic: "rotate" }),
    video: chalkboardVideo({ topic: "ramp" }),
  });
  assert.equal(pack.empty, false);
  assert.deepEqual(pack.tabs, ["animation", "video"]);
});
