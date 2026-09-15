import assert from "node:assert/strict";
import test from "node:test";
import {
  ASSIST_BOARD_LEFTOVER,
  ASSIST_CHIPS,
  ASSIST_SPEEDS,
  ASSIST_TOOLS,
  assistBind,
  assistBoard,
  assistChipPrompt,
  inferAssistChip,
  stampAssistBind,
} from "../src/domain/assist.mjs";

test("instant assist leftover has chips, whiteboard/planner tools, and speed modes", () => {
  assert.equal(ASSIST_TOOLS.length, 3);
  assert.equal(ASSIST_TOOLS[0].zh.label, "白板课堂");
  assert.equal(ASSIST_TOOLS[1].zh.label, "学习规划");
  assert.equal(ASSIST_TOOLS[2].zh.label, "深度学习课堂");
  assert.equal(ASSIST_SPEEDS[0].zh.label, "标准");
  assert.equal(ASSIST_SPEEDS[1].zh.label, "快速");
  assert.equal(ASSIST_CHIPS[0].zh.label, "概念讲解");
  assert.equal(ASSIST_CHIPS[4].zh.label, "可视化");
  assert.match(ASSIST_BOARD_LEFTOVER, /^[a-f0-9]{32}$/);
  const board = assistBoard({ lang: "zh", tool: "board", speed: "fast", menu: "tools" });
  assert.equal(board.heroAssistAlt, "需要数学帮助吗？");
  assert.equal(board.toolsLabel, "工具");
  assert.equal(board.speedLabel, "快速");
  assert.equal(board.menu, "tools");
  assert.equal(board.tools[0].on, true);
  assert.equal(assistChipPrompt("pack", "zh"), "帮我做一张两页速查表：");
  assert.match(assistChipPrompt("viz", "en"), /chalkboard diagram/i);
  assert.doesNotMatch(JSON.stringify(board), /hyperknow|orbie|Agent\.generate/i);
});

test("assist chips and speed bind to agent routes", () => {
  assert.equal(inferAssistChip("把这个过程画成粉笔示意图：微积分"), "viz");
  assert.equal(inferAssistChip("帮我消化这份长材料：牛顿第二定律"), "digest");
  assert.equal(assistBind({ chip: "viz", prompt: "微积分" }).kind, "visual");
  assert.equal(assistBind({ chip: "pack" }).kind, "materials");
  assert.equal(assistBind({ chip: "digest", prompt: "帮我消化这份长材料：微积分" }).kind, "digest");
  assert.equal(assistBind({ chip: "solve" }).kind, "solve");
  assert.equal(assistBind({ tool: "board" }).kind, "board");
  assert.equal(assistBind({ tool: "deeplearn" }).kind, "deeplearn");
  assert.equal(assistBind({ speed: "fast" }).speed, "fast");
  assert.match(stampAssistBind({ chip: "solve", speed: "fast", text: "残差" }), /\[chip:solve\].*\[speed:fast\]/);
});
