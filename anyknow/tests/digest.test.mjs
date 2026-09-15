import assert from "node:assert/strict";
import test from "node:test";
import {
  DIGEST_MODES,
  digestAskBoard,
  digestAskReady,
  generateDigestBoard,
  parseDigestStamp,
  stampDigestMode,
} from "../src/domain/digest.mjs";

test("digest stamp round-trips 精读/详述/导读", () => {
  const stamped = stampDigestMode({ mode: "精读", text: "微积分" });
  assert.match(stamped, /\[stamp mode=精读\]/);
  const parsed = parseDigestStamp(`[chip:digest] ${stamped}`);
  assert.equal(parsed.ready, true);
  assert.equal(parsed.mode, "精读");
  assert.equal(parsed.topic, "微积分");
  assert.equal(digestAskReady({ mode: "导读" }), true);
  assert.equal(digestAskReady({ mode: "入门" }), false);
  assert.deepEqual([...DIGEST_MODES], ["精读", "详述", "导读"]);
});

test("digest board cites file+span and is not a longer excerpt dump", () => {
  const ask = digestAskBoard({ topic: "[chip:digest] 帮我消化这份长材料：微积分" });
  assert.equal(ask.chip, "digest");
  assert.match(ask.prompt, /先选读法/);
  const board = generateDigestBoard({
    topic: "微积分",
    mode: "详述",
    sourceName: "4-10-antiderivatives.md",
    sourceText:
      "An antiderivative of f is a function F whose derivative is f. The indefinite integral writes the family of antiderivatives. Always add the constant of integration. Do not skip the interval on which F is differentiable.",
  });
  assert.equal(board.kind, "digest");
  assert.equal(board.mode, "详述");
  assert.equal(board.basedOn, "4-10-antiderivatives.md");
  assert.ok(board.citations[0].file);
  assert.ok(board.citations[0].span.length > 12);
  assert.equal(board.citations[0].page, 1);
  assert.doesNotMatch(JSON.stringify(board), /License:|hyperknow|orbie|pdf-session/i);
});
