/** Leftover Hyperknow Voice / TTS contract (chalkboard player, SpaceXAI speech). */

export const TTS_VOICES = Object.freeze(["warm", "calm", "bright", "gentle", "firm", "lively"]);
export const TTS_SPEEDS = Object.freeze([0.5, 0.75, 1, 1.25, 1.5, 2]);
export const TTS_STORAGE_PREFIX = "ttsVoiceConfig:";
export const TTS_OUTPUT_STORAGE = "ttsVoiceOutput";
export const TTS_MODE_STORAGE = "ttsVoiceMode";

export const GROK_VOICE = Object.freeze({
  warm: "ara",
  calm: "luna",
  bright: "eve",
  gentle: "luna",
  firm: "leo",
  lively: "eve",
});

export const TTS_BLOB = Object.freeze({
  warm: ["#F0997B", "#ED93B1"],
  calm: ["#85B7EB", "#9AA0A6"],
  bright: ["#EF9F27", "#F0997B"],
  gentle: ["#AFA9EC", "#ED93B1"],
  firm: ["#5DCAA5", "#85B7EB"],
  lively: ["#97C459", "#5DCAA5"],
});

export const TTS = Object.freeze({
  title: "语音",
  currentVoice: "当前音色",
  voiceOptions: "音色",
  voiceSpeed: "语速",
  preview: "试听中…",
  clickToAdjust: "点击调整音色和语速",
  previewPaused: "讲解正在播放中，暂不试听音色；可等讲解播放完后再试听。",
  applyNextRound: "已保存 — 新的音色和语速将从下一轮回答开始生效。",
  pauseNarration: "暂停",
  resumeNarration: "继续",
  narratingReply: "模型正在讲解中",
  voiceInterruptOn: "语音输入已开启",
  voiceInterruptOff: "开口提问或打断",
  voiceInterruptLoading: "正在开启麦克风…",
  voiceInterruptDenied: "麦克风权限被拒绝",
  voiceInterruptUnavailable: "语音打断启动失败",
  voiceListeningPlaceholder: "正在聆听…",
  voiceOutputAria: "切换语音输出",
  voiceOutputPauseAria: "暂停语音播放",
  voiceOutputResumeAria: "继续语音播放",
  voiceOutputTooltip: "朗读聊天回复",
  ttsFailed: "语音没能生成出来",
  playAudio: "播放语音",
  pauseAudio: "暂停",
  generatingVoice: "正在生成语音…",
  previewLineZh: "你好。我是你的学习同伴，接下来会用这块黑板把概念讲清楚。",
  previewLineEn: "Hi. I'm your study companion. I'll walk through the idea on this chalkboard.",
});

export const VOICE_MODE = Object.freeze({
  title: "你想怎样和老师交流？",
  subtitle: "这节课不仅能读你打的字，还能听你说话。",
  textTitle: "仅用文字",
  textDesc: "在输入框里打字提问，老师照常讲解和板书。",
  voiceTitle: "语音 + 文字",
  voiceDesc: "直接开口说就行。老师一听到你说话就会停下来，先回答你的问题，再从暂停的地方继续讲。",
  beta: "Beta",
  confirm: "开始学习",
  switchHint: "之后可以随时点击右下角输入框里的麦克风按钮切换。",
  betaHint: "语音功能仍处于 Beta 阶段，欢迎把使用体验告诉我们。",
});

function isMark(text) {
  return /hyperknow|orbie/i.test(String(text || ""));
}

export function grokVoiceFor(voiceId) {
  const id = TTS_VOICES.includes(voiceId) ? voiceId : "warm";
  return GROK_VOICE[id] || "ara";
}

export function snapSpeed(speed) {
  const n = Number(speed);
  if (!Number.isFinite(n)) return 1;
  let best = 1;
  let dist = Infinity;
  for (const step of TTS_SPEEDS) {
    const d = Math.abs(step - n);
    if (d < dist) {
      dist = d;
      best = step;
    }
  }
  return best;
}

export function normalizeVoicePrefs(raw = {}) {
  const voiceId = TTS_VOICES.includes(raw.voiceId) ? raw.voiceId : "warm";
  const speed = snapSpeed(raw.speed);
  return { voiceId, speed };
}

export function voiceStorageKey(userId) {
  const id = String(userId || "").trim();
  return id ? `${TTS_STORAGE_PREFIX}${id}` : null;
}

export function parseVoicePrefs(raw) {
  if (!raw || typeof raw !== "object") return null;
  if (!TTS_VOICES.includes(raw.voiceId)) return null;
  if (!Number.isFinite(Number(raw.speed))) return null;
  const speed = Number(raw.speed);
  if (speed < 0.5 || speed > 2) return null;
  return normalizeVoicePrefs(raw);
}

export function ttsSpeakPayload({ text = "", voiceId = "warm", speed = 1, lang = "zh" } = {}) {
  const say = String(text || "").trim();
  if (!say) throw new Error("text required");
  if (isMark(say)) throw new Error("blocked copy");
  const prefs = normalizeVoicePrefs({ voiceId, speed });
  const language = lang === "en" ? "en" : "zh";
  return {
    text: say,
    voiceId: prefs.voiceId,
    speed: prefs.speed,
    lang: language,
    grokVoice: grokVoiceFor(prefs.voiceId),
    model: "grok-voice-latest",
  };
}

export function parseTtsConfig(row = {}) {
  if (row?.type && row.type !== "tts_config") return null;
  const voiceId = String(row.voice_id || row.voiceId || "warm");
  return normalizeVoicePrefs({ voiceId: TTS_VOICES.includes(voiceId) ? voiceId : "warm", speed: row.speed });
}

export function lessonSpeakQueue(frames = []) {
  return (Array.isArray(frames) ? frames : [])
    .filter((row) => row && (row.type === "speak" || row.type === "ask"))
    .map((row) => String(row.display || row.say || row.question || "").trim())
    .filter((say) => say && !isMark(say));
}

export function voiceModeBoard({ mode = "", lang = "zh" } = {}) {
  const current = mode === "voice" || mode === "text" ? mode : "";
  return {
    title: VOICE_MODE.title,
    subtitle: VOICE_MODE.subtitle,
    textTitle: VOICE_MODE.textTitle,
    textDesc: VOICE_MODE.textDesc,
    voiceTitle: VOICE_MODE.voiceTitle,
    voiceDesc: VOICE_MODE.voiceDesc,
    beta: VOICE_MODE.beta,
    confirm: VOICE_MODE.confirm,
    switchHint: VOICE_MODE.switchHint,
    betaHint: VOICE_MODE.betaHint,
    mode: current,
    canConfirm: Boolean(current),
    lang,
  };
}

export function voicesBoard({ lang = "zh" } = {}) {
  return {
    title: TTS.title,
    currentVoice: TTS.currentVoice,
    voiceOptions: TTS.voiceOptions,
    voiceSpeed: TTS.voiceSpeed,
    voices: TTS_VOICES.map((id) => ({
      id,
      label: voiceLabel(id, lang),
      blob: TTS_BLOB[id],
      grokVoice: grokVoiceFor(id),
    })),
    speeds: TTS_SPEEDS.slice(),
  };
}

function voiceLabel(id, lang) {
  const zh = { warm: "温暖", calm: "沉稳", bright: "明亮", gentle: "柔和", firm: "专业", lively: "轻快" };
  const en = { warm: "Warm", calm: "Calm", bright: "Bright", gentle: "Gentle", firm: "Professional", lively: "Lively" };
  return (lang === "en" ? en : zh)[id] || id;
}

export { voiceLabel };
