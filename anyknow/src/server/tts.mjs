/** SpaceXAI (xAI) speech for leftover Hyperknow TTS voices. */

import { grokVoiceFor, ttsSpeakPayload, TTS } from "../domain/tts.mjs";

const TTS_URLS = ["https://api.x.ai/v1/tts", "https://api.x.ai/v1/audio/speech"];

export function previewLine(lang = "zh") {
  return lang === "en" ? TTS.previewLineEn : TTS.previewLineZh;
}

export async function speakWithSpaceXai({
  text,
  voiceId = "warm",
  speed = 1,
  lang = "zh",
  apiKey = process.env.XAI_API_KEY,
  fetchImpl = fetch,
} = {}) {
  const payload = ttsSpeakPayload({ text, voiceId, speed, lang });
  if (!apiKey) {
    const err = new Error(TTS.ttsFailed);
    err.code = "TTS_UNAVAILABLE";
    throw err;
  }
  const bodies = [
    {
      model: "grok-voice-latest",
      voice: payload.grokVoice,
      input: payload.text,
      speed: payload.speed,
      language: payload.lang,
    },
    {
      model: "grok-tts",
      voice: payload.grokVoice,
      input: payload.text,
      speed: payload.speed,
    },
  ];
  let last = null;
  for (const url of TTS_URLS) {
    for (const body of bodies) {
      const res = await fetchImpl(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        const bytes = Buffer.from(await res.arrayBuffer());
        const contentType = res.headers?.get?.("content-type") || "audio/mpeg";
        return {
          bytes,
          contentType,
          voiceId: payload.voiceId,
          grokVoice: payload.grokVoice || grokVoiceFor(payload.voiceId),
          speed: payload.speed,
        };
      }
      last = new Error(`SpaceXAI TTS ${res.status}`);
    }
  }
  const err = last || new Error(TTS.ttsFailed);
  err.code = "TTS_FAILED";
  throw err;
}
