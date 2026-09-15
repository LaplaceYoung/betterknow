import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import assert from "node:assert/strict";
import test from "node:test";
import {
  GROK_VOICE,
  TTS,
  TTS_STORAGE_PREFIX,
  TTS_VOICES,
  VOICE_MODE,
  grokVoiceFor,
  lessonSpeakQueue,
  normalizeVoicePrefs,
  parseTtsConfig,
  parseVoicePrefs,
  ttsSpeakPayload,
  voiceModeBoard,
  voiceStorageKey,
  voicesBoard,
} from "../src/domain/tts.mjs";
import { speakWithSpaceXai } from "../src/server/tts.mjs";
import { PYTHAGOREAN_BASICS, REGRESSION } from "../src/domain/whiteboard-catalog.mjs";
import { parseWhiteboardReplay } from "../src/domain/whiteboard.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const ttsSrc = readFileSync(join(root, "src/domain/tts.mjs"), "utf8");
const app = readFileSync(join(root, "src/web/app.js"), "utf8");
const server = readFileSync(join(root, "src/server/index.mjs"), "utf8");

test("leftover TTS voices map onto SpaceXAI grok voices", () => {
  assert.deepEqual(TTS_VOICES, ["warm", "calm", "bright", "gentle", "firm", "lively"]);
  assert.equal(grokVoiceFor("warm"), "ara");
  assert.equal(grokVoiceFor("calm"), "luna");
  assert.equal(grokVoiceFor("bright"), "eve");
  assert.equal(grokVoiceFor("firm"), "leo");
  assert.equal(grokVoiceFor("mystery"), "ara");
  assert.equal(TTS_STORAGE_PREFIX, "ttsVoiceConfig:");
  assert.equal(voiceStorageKey("u_ada"), "ttsVoiceConfig:u_ada");
  assert.equal(voiceStorageKey(""), null);
  const prefs = parseVoicePrefs({ voiceId: "calm", speed: 1.25 });
  assert.equal(prefs.voiceId, "calm");
  assert.equal(parseVoicePrefs({ voiceId: "nope", speed: 1 }), null);
  assert.equal(normalizeVoicePrefs({ speed: 1.1 }).speed, 1);
  const payload = ttsSpeakPayload({ text: "a² + b² = c²", voiceId: "warm", lang: "zh" });
  assert.equal(payload.grokVoice, "ara");
  assert.equal(payload.model, "grok-voice-latest");
  assert.doesNotMatch(JSON.stringify({ payload, GROK_VOICE, TTS }), /hyperknow|orbie/i);
  assert.doesNotMatch(ttsSrc, /async function generate/);
});

test("leftover VoiceMode copy and tts_config parse without trademarks", () => {
  const board = voiceModeBoard({ mode: "voice" });
  assert.equal(board.title, VOICE_MODE.title);
  assert.equal(board.canConfirm, true);
  assert.match(board.voiceDesc, /开口说/);
  assert.doesNotMatch(JSON.stringify(board), /Hyperknow|Orbie/i);
  const cfg = parseTtsConfig({ type: "tts_config", voice_id: "calm", speed: 1 });
  assert.equal(cfg.voiceId, "calm");
  const voices = voicesBoard({ lang: "zh" });
  assert.equal(voices.voices.length, 6);
  assert.equal(voices.voices[0].label, "温暖");
});

test("whiteboard leftover speak frames become a narration queue", () => {
  const basics = parseWhiteboardReplay(PYTHAGOREAN_BASICS);
  const queue = lessonSpeakQueue(basics.frames);
  assert.ok(queue.some((line) => /Pythagorean Theorem/.test(line)));
  const cloud = lessonSpeakQueue(parseWhiteboardReplay(REGRESSION).frames);
  assert.ok(cloud.some((line) => /Linear Regression/.test(line)));
  assert.doesNotMatch(queue.join("\n"), /rk\d+|hyperknow|orbie/i);
});

test("SpaceXAI speech client posts leftover voice mapping", async () => {
  const calls = [];
  const fetchImpl = async (url, init) => {
    calls.push({ url, body: JSON.parse(init.body) });
    return {
      ok: true,
      headers: { get: () => "audio/mpeg" },
      arrayBuffer: async () => new Uint8Array([1, 2, 3]).buffer,
    };
  };
  const out = await speakWithSpaceXai({
    text: "直角边是 a 和 b。",
    voiceId: "warm",
    speed: 1,
    lang: "zh",
    apiKey: "test-key",
    fetchImpl,
  });
  assert.equal(out.grokVoice, "ara");
  assert.equal(out.bytes.length, 3);
  assert.match(calls[0].url, /api\.x\.ai\/v1\/(tts|audio\/speech)/);
  assert.equal(calls[0].body.voice, "ara");
  assert.match(calls[0].body.input, /直角边/);
  await assert.rejects(
    () => speakWithSpaceXai({ text: "hi", apiKey: "", fetchImpl }),
    /语音没能生成出来/,
  );
});

test("SPA and HTTP wire leftover TTS routes and VoiceMode", () => {
  assert.match(server, /\/api\/tts/);
  assert.match(server, /\/tts-samples\//);
  assert.match(server, /speakWithSpaceXai/);
  assert.match(app, /voiceOutputBtn/);
  assert.match(app, /ttsVoiceConfig/);
  assert.match(app, /你想怎样和老师交流/);
  assert.match(app, /voiceMicBtn/);
  assert.match(app, /lessonSpeakQueue/);
  assert.doesNotMatch(app, /Orbie/);
});
