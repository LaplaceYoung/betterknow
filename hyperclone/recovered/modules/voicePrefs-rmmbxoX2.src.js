import { d as t } from "./index-TjoB2Buo.js";
const e = ["warm", "calm", "bright", "gentle", "firm", "lively"];
function n() {
  const e = t();
  if (e) {
    return `ttsVoiceConfig:${e}`;
  } else {
    return null;
  }
}
function r() {
  try {
    const t = n();
    if (!t) {
      return null;
    }
    const r = localStorage.getItem(t);
    if (!r) {
      return null;
    }
    const o = JSON.parse(r);
    if (function (t) {
      if (!t || typeof t != "object") {
        return false;
      }
      const n = t;
      const r = n.voiceId;
      const o = n.speed;
      return typeof r == "string" && !!e.includes(r) && typeof o == "number" && !!Number.isFinite(o) && !(o < 0.5) && !(o > 2);
    }(o)) {
      return {
        voiceId: o.voiceId,
        speed: o.speed
      };
    } else {
      return null;
    }
  } catch {
    return null;
  }
}
function o(t) {
  try {
    const e = n();
    if (!e) {
      return;
    }
    localStorage.setItem(e, JSON.stringify(t));
  } catch {}
}
export { r as l, o as s };