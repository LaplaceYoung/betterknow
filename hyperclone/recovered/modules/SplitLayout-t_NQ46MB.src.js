const __vite__mapDeps = (i, m = __vite__mapDeps, d = m.f ||= ["assets/js/mermaid.core-D9fe7qay.js", "assets/js/index-TjoB2Buo.js", "assets/css/index-WxmVESBe.css", "assets/js/purify.es-BhQHqaym.js"]) => i.map(i => d[i]);
var e = Object.defineProperty;
var t = (t, n, r) => ((t, n, r) => n in t ? e(t, n, {
  enumerable: true,
  configurable: true,
  writable: true,
  value: r
}) : t[n] = r)(t, typeof n != "symbol" ? n + "" : n, r);
import { g as n, c as r, ag as s, af as o, b as a, r as i, ah as l, C as c, B as u, j as d, m as f, M as p, aH as m, u as h, l as g, k as x, R as b, z as v } from "./index-TjoB2Buo.js";
import { P as y, M as w, C as k, u as j, r as S, p as _, a as N, E as C, V as M, I, N as A, L as R, K as T, h as E, s as P, b as $, c as L } from "./VoiceModeModal-6HRRb_4A.js";
import { l as z, s as B } from "./voicePrefs-rmmbxoX2.js";
import { r as D } from "./index-qYFgNVxk.js";
import { r as F, C as O, a as U } from "./copy-jHTWzodI.js";
import { P as H, D as W, G as q } from "./index-BYcV05tM.js";
import { L as Y } from "./loader-circle-BZEIbChB.js";
import { c as X } from "./createLucideIcon-B4HcG4gb.js";
import { f as K, A as Z, V as G } from "./VoiceSettingsModal-Bp7qApl4.js";
import { u as V, r as J, t as Q, I as ee, d as te, c as ne, C as re, M as se, P as oe, a as ae, b as ie, V as le } from "./percentages-BXMCSKIN-CoqTm4Ai.js";
import { A as ce } from "./index-CMJxjNZ8.js"; /* empty css                  */
import { P as ue, A as de } from "./plus-jBDDhggQ.js";
import { M as fe } from "./maximize-2-78VwLVLI.js";
import { D as pe } from "./download-dDsBfY4e.js";
import { H as me } from "./with-selector-U5gkSzzZ.js";
import { C as he } from "./check-BBSENZCf.js";
import { X as ge } from "./x-BPqZ-rfi.js";
import { P as xe, g as be } from "./PreparingModal-Bthg5dgq.js";
import { C as ve } from "./CourseFeedbackEntry-yXmrvWpY.js";
import "./addErrorLog-Dxv53mIo.js";
import "./BugReportModal-DxKVyQda.js";
/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const ye = X("clock", [["path", {
  d: "M12 6v6l4 2",
  key: "mmk7yg"
}], ["circle", {
  cx: "12",
  cy: "12",
  r: "10",
  key: "1mglay"
}]]);
const we = X("crosshair", [["circle", {
  cx: "12",
  cy: "12",
  r: "10",
  key: "1mglay"
}], ["line", {
  x1: "22",
  x2: "18",
  y1: "12",
  y2: "12",
  key: "l9bcsi"
}], ["line", {
  x1: "6",
  x2: "2",
  y1: "12",
  y2: "12",
  key: "13hhkx"
}], ["line", {
  x1: "12",
  x2: "12",
  y1: "6",
  y2: "2",
  key: "10w3f3"
}], ["line", {
  x1: "12",
  x2: "12",
  y1: "22",
  y2: "18",
  key: "15g9kq"
}]]);
const ke = X("history", [["path", {
  d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",
  key: "1357e3"
}], ["path", {
  d: "M3 3v5h5",
  key: "1xhq8a"
}], ["path", {
  d: "M12 7v5l4 2",
  key: "1fdv2h"
}]]);
const je = X("message-square", [["path", {
  d: "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",
  key: "18887p"
}]]);
const Se = X("square", [["rect", {
  width: "18",
  height: "18",
  x: "3",
  y: "3",
  rx: "2",
  key: "afitv7"
}]]);
const _e = X("sticky-note", [["path", {
  d: "M16 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8Z",
  key: "qazsjp"
}], ["path", {
  d: "M15 3v4a2 2 0 0 0 2 2h4",
  key: "40519r"
}]]);
const Ne = X("upload", [["path", {
  d: "M12 3v12",
  key: "1x0j5s"
}], ["path", {
  d: "m17 8-5-5-5 5",
  key: "7q97r8"
}], ["path", {
  d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",
  key: "ih7n3h"
}]]);
const Ce = () => {
  const e = n();
  if (e) {
    return {
      Authorization: `Bearer ${e}`
    };
  } else {
    return {};
  }
};
const Me = "/api/v1/pdf-annotation";
const Ie = `${o().replace(/\/+$/, "")}${Me}/ws`;
class Ae {
  constructor() {
    t(this, "ws", null);
    t(this, "messageHandler", null);
    t(this, "closeHandler", null);
    t(this, "stateHandler", null);
    t(this, "connectingPromise", null);
    t(this, "intentionalClose", false);
    t(this, "HEARTBEAT_ENABLED", false);
    t(this, "HEARTBEAT_INTERVAL_MS", 25000);
    t(this, "HEARTBEAT_PONG_TIMEOUT_MS", 10000);
    t(this, "heartbeatInterval", null);
    t(this, "heartbeatTimeout", null);
    t(this, "pendingPings", new Map());
    t(this, "pendingModelProbe", null);
  }
  get isConnected() {
    var e;
    return ((e = this.ws) == null ? undefined : e.readyState) === WebSocket.OPEN;
  }
  get isConnecting() {
    var e;
    return ((e = this.ws) == null ? undefined : e.readyState) === WebSocket.CONNECTING;
  }
  setMessageHandler(e) {
    this.messageHandler = e;
  }
  setCloseHandler(e) {
    this.closeHandler = e;
  }
  setStateHandler(e) {
    this.stateHandler = e;
  }
  emitState(e) {
    var t;
    if ((t = this.stateHandler) != null) {
      t.call(this, e);
    }
  }
  connect(e = false) {
    var t;
    var r;
    if (((t = this.ws) == null ? undefined : t.readyState) === WebSocket.OPEN) {
      return Promise.resolve();
    } else {
      if (((r = this.ws) == null ? undefined : r.readyState) !== WebSocket.CONNECTING || !this.connectingPromise) {
        this.intentionalClose = false;
        this.emitState(e ? "reconnecting" : "connecting");
        this.connectingPromise = new Promise((e, t) => {
          const r = n();
          const s = r ? `${Ie}?access_token=${encodeURIComponent(r)}` : Ie;
          const o = new WebSocket(s);
          this.ws = o;
          o.onopen = () => {
            this.connectingPromise = null;
            this.emitState("open");
            if (this.HEARTBEAT_ENABLED) {
              this.startHeartbeat();
            }
            e();
          };
          o.onerror = e => {
            this.connectingPromise = null;
            t(e);
          };
          o.onmessage = e => {
            var t;
            try {
              const n = JSON.parse(e.data);
              if (n.type === "pong") {
                const e = this.pendingPings.get(n.t);
                if (e) {
                  this.pendingPings.delete(n.t);
                  e(Math.round(performance.now() - n.t));
                  return;
                } else if (this.HEARTBEAT_ENABLED) {
                  this.markHeartbeatPong();
                  return;
                } else {
                  return undefined;
                }
              }
              if (n.type === "model_probe_started") {
                return;
              }
              if (n.type === "model_probe_result") {
                const e = this.pendingModelProbe;
                this.pendingModelProbe = null;
                if (e != null) {
                  e(n);
                }
                return;
              }
              if ((t = this.messageHandler) != null) {
                t.call(this, n);
              }
            } catch {}
          };
          o.onclose = e => {
            var t;
            this.connectingPromise = null;
            this.stopHeartbeat();
            this.settleDiagnostics();
            if (this.ws === o) {
              this.ws = null;
            }
            if (!this.intentionalClose) {
              this.emitState("closed");
              if ((t = this.closeHandler) != null) {
                t.call(this, {
                  code: e.code,
                  reason: e.reason,
                  wasClean: e.wasClean
                });
              }
            }
          };
        });
      }
      return this.connectingPromise;
    }
  }
  startHeartbeat() {
    this.stopHeartbeat();
    this.sendHeartbeat();
    this.heartbeatInterval = setInterval(() => this.sendHeartbeat(), this.HEARTBEAT_INTERVAL_MS);
  }
  sendHeartbeat() {
    var e;
    if (((e = this.ws) == null ? undefined : e.readyState) === WebSocket.OPEN) {
      if (this.heartbeatTimeout) {
        this.ws.close();
      } else {
        this.ws.send(JSON.stringify({
          type: "ping",
          ts: Date.now()
        }));
        this.heartbeatTimeout = setTimeout(() => {
          var e;
          this.heartbeatTimeout = null;
          if ((e = this.ws) != null) {
            e.close();
          }
        }, this.HEARTBEAT_PONG_TIMEOUT_MS);
      }
    }
  }
  markHeartbeatPong() {
    if (this.heartbeatTimeout) {
      clearTimeout(this.heartbeatTimeout);
      this.heartbeatTimeout = null;
    }
  }
  stopHeartbeat() {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }
    if (this.heartbeatTimeout) {
      clearTimeout(this.heartbeatTimeout);
      this.heartbeatTimeout = null;
    }
  }
  startSession() {
    this._send({
      type: "start_session"
    });
  }
  resumeSession(e) {
    this._send({
      type: "resume_session",
      session_id: e
    });
  }
  resumeOrStartCourseSession(e) {
    this._send({
      type: "resume_or_start_course_session",
      course_session_id: e
    });
  }
  selectCourseSession(e) {
    this._send({
      type: "select_course_session",
      course_session_id: e
    });
  }
  goToNextDocument() {
    this._send({
      type: "go_to_next_document"
    });
  }
  goToPreviousDocument() {
    this._send({
      type: "go_to_previous_document"
    });
  }
  sendMessage(e, t, n, r, s) {
    this._send({
      type: "user_message",
      message: e,
      pivot: s || undefined,
      attachments: (t == null ? undefined : t.length) ? t : undefined,
      answer: n ?? undefined,
      audio_b64: (r == null ? undefined : r.audioB64) || undefined,
      audio_mime: (r == null ? undefined : r.mime) || undefined,
      audio_duration_ms: (r == null ? undefined : r.durationMs) || undefined
    });
  }
  sendActionStepComplete(e) {
    this._send({
      type: "action_step_complete",
      step_id: e
    });
  }
  sendActionStepReceived(e) {
    this._send({
      type: "action_step_received",
      step_id: e
    });
  }
  sendSyncPdfState(e) {
    this._send({
      type: "sync_pdf_state",
      pdf_state: e
    });
  }
  interjectStart(e) {
    var t;
    if (((t = this.ws) == null ? undefined : t.readyState) === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({
        type: "interject_start",
        source: e.source,
        mode: e.mode,
        step_id: e.stepId,
        offset_ms: e.offsetMs
      }));
    }
  }
  interjectQuestion(e) {
    var t;
    if (((t = this.ws) == null ? undefined : t.readyState) === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({
        type: "interject_question",
        text: e.text || undefined,
        audio_b64: e.audioB64 || undefined,
        mime: e.mime || undefined,
        duration_ms: e.durationMs,
        offset_ms: e.offsetMs
      }));
    }
  }
  interjectAudioChunk(e) {
    var t;
    if (((t = this.ws) == null ? undefined : t.readyState) === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({
        type: "interject_audio_chunk",
        pcm_b64: e
      }));
    }
  }
  interjectAudioEnd() {
    var e;
    if (((e = this.ws) == null ? undefined : e.readyState) === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({
        type: "interject_audio_end"
      }));
    }
  }
  interjectResume() {
    var e;
    if (((e = this.ws) == null ? undefined : e.readyState) === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({
        type: "interject_resume"
      }));
    }
  }
  stopGeneration(e) {
    this._send({
      type: "stop_generation",
      last_rendered_step_id: e
    });
  }
  navigatePage(e) {
    this._send({
      type: "navigate_page",
      page: e
    });
  }
  sendContinue() {
    this._send({
      type: "user_continue"
    });
  }
  startTeaching(e) {
    const t = {
      type: "start_teaching"
    };
    if (typeof e == "number") {
      t.page = e;
    }
    this._send(t);
  }
  sendSyncBoardState(e, t) {
    this._send({
      type: "sync_pdf_state",
      pdf_state: e,
      board_state: t
    });
  }
  setTtsConfig(e, t) {
    this._send({
      type: "set_tts_config",
      voice_id: e,
      speed: t
    });
  }
  ping(e = 6000) {
    var t;
    if (((t = this.ws) == null ? undefined : t.readyState) !== WebSocket.OPEN) {
      return Promise.resolve(null);
    }
    const n = performance.now();
    return new Promise(t => {
      const r = setTimeout(() => {
        this.pendingPings.delete(n);
        t(null);
      }, e);
      this.pendingPings.set(n, e => {
        clearTimeout(r);
        t(e);
      });
      try {
        this.ws.send(JSON.stringify({
          type: "ping",
          t: n
        }));
      } catch {
        clearTimeout(r);
        this.pendingPings.delete(n);
        t(null);
      }
    });
  }
  modelProbe(e = 120000) {
    var t;
    if (((t = this.ws) == null ? undefined : t.readyState) !== WebSocket.OPEN || this.pendingModelProbe) {
      return Promise.resolve(null);
    } else {
      return new Promise(t => {
        const n = setTimeout(() => {
          this.pendingModelProbe = null;
          t(null);
        }, e);
        this.pendingModelProbe = e => {
          clearTimeout(n);
          t(e);
        };
        try {
          this.ws.send(JSON.stringify({
            type: "model_probe"
          }));
        } catch {
          clearTimeout(n);
          this.pendingModelProbe = null;
          t(null);
        }
      });
    }
  }
  settleDiagnostics() {
    for (const t of this.pendingPings.values()) {
      t(null);
    }
    this.pendingPings.clear();
    const e = this.pendingModelProbe;
    this.pendingModelProbe = null;
    if (e != null) {
      e(null);
    }
  }
  disconnect() {
    var e;
    this.intentionalClose = true;
    this.stopHeartbeat();
    this.settleDiagnostics();
    if ((e = this.ws) != null) {
      e.close();
    }
    this.ws = null;
    this.connectingPromise = null;
  }
  _send(e) {
    var t;
    if (((t = this.ws) == null ? undefined : t.readyState) === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(e));
    }
  }
}
let Re = null;
const Te = () => s.t("pdfAnnotation.session.completeNotice");
const Ee = e => {
  if (!e) {
    return e;
  }
  let t = e;
  if (/^https?:\/\//i.test(e)) {
    try {
      t = new URL(e).pathname;
    } catch {
      return e;
    }
  }
  if (t.startsWith("/")) {
    return r(t);
  } else {
    return e;
  }
};
const Pe = (e, t = {}) => {
  var n;
  var r;
  var s;
  var o;
  var a;
  var i;
  if (Array.isArray(e)) {
    const t = [];
    for (const n of e) {
      if (!n || typeof n != "object") {
        continue;
      }
      const e = n;
      const r = String(e.kind ?? e.type ?? "").trim().toLowerCase();
      if (r === "say" && typeof e.say == "string" && e.say.trim()) {
        t.push({
          kind: "say",
          say: e.say.trim()
        });
      } else if (r === "content" && typeof e.content == "string" && e.content.trim()) {
        t.push({
          kind: "content",
          content: e.content.trim()
        });
      } else if (r === "graph" && typeof e.graph == "string" && e.graph.trim()) {
        t.push({
          kind: "graph",
          graph: e.graph.trim()
        });
      } else if (r === "image" && typeof e.prompt == "string" && e.prompt.trim()) {
        const n = {
          kind: "image",
          prompt: e.prompt.trim()
        };
        if (typeof e.language == "string" && e.language.trim()) {
          n.language = e.language.trim();
        }
        if (typeof e.caption == "string" && e.caption.trim()) {
          n.caption = e.caption.trim();
        }
        t.push(n);
      }
    }
    return t;
  }
  const l = [];
  if ((n = t.say) == null ? undefined : n.trim()) {
    l.push({
      kind: "say",
      say: t.say.trim()
    });
  }
  if ((r = t.content) == null ? undefined : r.trim()) {
    l.push({
      kind: "content",
      content: t.content.trim()
    });
  }
  if ((s = t.mermaid) == null ? undefined : s.trim()) {
    l.push({
      kind: "graph",
      graph: t.mermaid.trim()
    });
  }
  if ((o = t.imagePrompt) == null ? undefined : o.trim()) {
    const e = {
      kind: "image",
      prompt: t.imagePrompt.trim()
    };
    if ((a = t.language) == null ? undefined : a.trim()) {
      e.language = t.language.trim();
    }
    if ((i = t.caption) == null ? undefined : i.trim()) {
      e.caption = t.caption.trim();
    }
    l.push(e);
  }
  return l;
};
const $e = {
  async *[Symbol.asyncIterator]() {}
};
function Le(e, t, n, r) {
  const s = Math.floor(t.length / (r * 2));
  const o = e.createBuffer(r, s, n);
  const a = new DataView(t.buffer, t.byteOffset, t.byteLength);
  for (let i = 0; i < r; i++) {
    const e = o.getChannelData(i);
    for (let t = 0; t < s; t++) {
      e[t] = a.getInt16((t * r + i) * 2, true) / 32768;
    }
  }
  return o;
}
async function ze(e, t, n) {
  const r = await fetch(e, {
    signal: n
  });
  if (!r.ok) {
    throw new Error(`HTTP ${r.status}`);
  }
  const s = r.body;
  if (!s || typeof s.getReader != "function") {
    return {
      first: await t.decodeAudioData(await r.arrayBuffer()),
      rest: $e
    };
  }
  const o = s.getReader();
  let a = new Uint8Array(0);
  let i = false;
  const l = async () => {
    const {
      done: e,
      value: t
    } = await o.read();
    if (e) {
      i = true;
    } else if (t && t.length) {
      const e = new Uint8Array(a.length + t.length);
      e.set(a);
      e.set(t, a.length);
      a = e;
    }
  };
  while (!i && a.length < 64) {
    await l();
  }
  const c = function (e) {
    if (e.length < 44) {
      return null;
    }
    const t = new DataView(e.buffer, e.byteOffset, e.byteLength);
    if (t.getUint32(0, false) !== 1380533830 || t.getUint32(8, false) !== 1463899717) {
      return null;
    }
    let n = 12;
    let r = 0;
    let s = 0;
    let o = 0;
    let a = 0;
    while (n + 8 <= e.length) {
      const i = t.getUint32(n, false);
      const l = t.getUint32(n + 4, true);
      const c = n + 8;
      if (i === 1718449184) {
        if (c + 16 > e.length) {
          return null;
        }
        r = t.getUint16(c, true);
        s = t.getUint16(c + 2, true);
        o = t.getUint32(c + 4, true);
        a = t.getUint16(c + 14, true);
      } else if (i === 1684108385) {
        if (r !== 1 || a !== 16 || s < 1 || o < 1) {
          return null;
        } else {
          return {
            dataStart: c,
            sampleRate: o,
            channels: s
          };
        }
      }
      if (l <= 0 || l > e.length) {
        return null;
      }
      n = c + l + l % 2;
    }
    return null;
  }(a);
  if (!c) {
    while (!i) {
      await l();
    }
    try {
      o.releaseLock();
    } catch {}
    const e = a.slice();
    return {
      first: await t.decodeAudioData(e.buffer),
      rest: $e
    };
  }
  const {
    sampleRate: u,
    channels: d
  } = c;
  const f = d * 2;
  const p = e => e - e % f;
  const m = Math.ceil(u * 0.6) * f;
  const h = Math.ceil(u * 0.5) * f;
  const g = e => {
    const t = a.subarray(0, e);
    a = a.subarray(e);
    return t;
  };
  for (a = a.subarray(c.dataStart); !i && a.length < m;) {
    await l();
  }
  const x = p(a.length);
  if (x <= 0) {
    try {
      o.releaseLock();
    } catch {}
    throw new Error("audio stream carried no PCM");
  }
  return {
    first: Le(t, g(x), u, d),
    rest: async function* () {
      try {
        while (true) {
          while (!i && a.length < h) {
            await l();
          }
          const e = p(i ? a.length : h);
          if (e <= 0) {
            return;
          }
          yield Le(t, g(e), u, d);
          if (i && a.length < f) {
            return;
          }
        }
      } finally {
        if (!i) {
          try {
            await o.cancel();
          } catch {}
        }
        try {
          o.releaseLock();
        } catch {}
      }
    }()
  };
}
const Be = new Set([1008, 4400, 4401, 4402, 4403, 4404]);
function De(e) {
  const t = (Array.isArray(e.options) ? e.options : []).map(e => typeof e == "string" ? e.trim() : "").filter(Boolean).slice(0, 4);
  const n = e.mode === "choice" && t.length >= 2 ? "choice" : "open";
  const r = {
    mode: n,
    options: n === "choice" ? t : [],
    question: typeof e.question == "string" && e.question.trim() ? e.question.trim() : undefined
  };
  if (n === "choice") {
    let n;
    if (typeof e.correct_index == "number" && Number.isInteger(e.correct_index)) {
      n = e.correct_index;
    } else if (typeof e.answer == "string") {
      const r = t.indexOf(e.answer.trim());
      if (r >= 0) {
        n = r;
      }
    }
    if (n != null && n >= 0 && n < t.length) {
      r.correctIndex = n;
    }
    if (typeof e.explanation == "string" && e.explanation.trim()) {
      r.explanation = e.explanation.trim();
    }
  }
  return r;
}
function Fe(e) {
  return {
    id: crypto.randomUUID(),
    kind: "ask",
    mode: e.mode,
    question: e.question,
    options: e.options
  };
}
function Oe() {
  var e;
  const {
    t: t
  } = a();
  const [n, o] = i.useState(false);
  const [, c] = i.useState("idle");
  const [u, d] = i.useState(false);
  const [f, p] = i.useState(null);
  const [m, h] = i.useState(null);
  const g = i.useRef(null);
  const [x, b] = i.useState(false);
  const [v, w] = i.useState(null);
  const k = i.useRef(null);
  const [j, S] = i.useState(null);
  const [_, N] = i.useState(false);
  const [C, M] = i.useState(0);
  const [I, A] = i.useState([]);
  const R = i.useRef([]);
  const [, T] = i.useState({
    tts: "idle",
    annotation: "idle"
  });
  const [E, P] = i.useState(false);
  const $ = i.useRef(false);
  $.current = E;
  const [L, D] = i.useState(new Map());
  const F = i.useRef(new Map());
  const [O, U] = i.useState("full-page");
  const H = i.useRef("full-page");
  const [W, q] = i.useState(0);
  const Y = i.useRef(0);
  const [X, K] = i.useState(new Map());
  const Z = i.useRef(new Map());
  const [G, V] = i.useState(null);
  const [J, Q] = i.useState(() => {
    try {
      const e = localStorage.getItem("pdfTutor.autoFocusEnabled");
      return e === null || e !== "false";
    } catch {
      return true;
    }
  });
  const ee = i.useRef(J);
  const te = i.useRef(null);
  const ne = i.useRef(null);
  const re = i.useRef(null);
  const se = i.useRef(0);
  const [oe, ae] = i.useState(null);
  const ie = i.useRef(null);
  const [le, ce] = i.useState(null);
  const [ue, de] = i.useState(null);
  const [fe, pe] = i.useState(null);
  const me = i.useRef(false);
  const [he, ge] = i.useState(false);
  const [xe, be] = i.useState(() => z());
  const ve = i.useRef(((e = z()) == null ? undefined : e.speed) ?? 1);
  i.useEffect(() => {
    if (xe == null ? undefined : xe.speed) {
      ve.current = xe.speed;
    }
  }, [xe]);
  const [ye, we] = i.useState(false);
  const ke = i.useRef(false);
  const je = i.useRef(false);
  const Se = i.useRef(() => {});
  const _e = i.useRef(() => {});
  const Ne = i.useRef(null);
  const Ce = i.useRef(false);
  const Me = i.useRef(false);
  const Ie = i.useRef(false);
  const Le = i.useRef(null);
  const Oe = i.useRef(0);
  const Ue = i.useRef(() => {});
  const [He, We] = i.useState("");
  const qe = i.useRef("");
  qe.current = He;
  const [Ye, Xe] = i.useState(0);
  const [Ke, Ze] = i.useState(false);
  i.useRef(false).current = Ke;
  const Ge = i.useRef(false);
  const Ve = i.useRef([]);
  const Je = i.useRef(new Set());
  const Qe = i.useRef(0);
  const et = i.useRef(null);
  const tt = i.useRef(null);
  const nt = i.useRef(0);
  const rt = i.useRef([]);
  const st = i.useRef(false);
  const ot = i.useRef(0);
  const at = i.useRef(-1);
  const it = i.useRef(() => {});
  const lt = i.useRef(null);
  const [ct, ut] = i.useState("idle");
  const dt = i.useRef("idle");
  const ft = i.useCallback(e => {
    dt.current = e;
    ut(e);
  }, []);
  const [pt, mt] = i.useState("");
  const ht = i.useRef(null);
  const gt = i.useRef(false);
  const xt = i.useRef(null);
  const bt = i.useRef([]);
  const vt = i.useRef(null);
  const yt = i.useRef(false);
  const wt = i.useRef("");
  const kt = i.useRef(false);
  const jt = i.useRef(false);
  const St = i.useRef("");
  const _t = i.useRef(false);
  const Nt = i.useRef(null);
  const Ct = i.useRef(false);
  const Mt = i.useRef(null);
  const It = i.useRef(() => {});
  const At = i.useRef(() => {});
  const Rt = i.useRef(() => {});
  const Tt = i.useRef(() => {});
  const Et = i.useRef(() => {});
  const Pt = i.useRef(null);
  const $t = i.useRef(() => {});
  const Lt = i.useRef("none");
  const zt = i.useRef("");
  const Bt = i.useRef(null);
  const Dt = i.useRef(null);
  const Ft = i.useRef(null);
  const Ot = i.useRef(null);
  const Ut = i.useRef(0);
  const Ht = i.useRef(false);
  const Wt = i.useRef(null);
  const qt = i.useRef(new Map());
  i.useEffect(() => {
    ee.current = J;
    try {
      localStorage.setItem("pdfTutor.autoFocusEnabled", String(J));
    } catch {}
  }, [J]);
  const Yt = i.useCallback(() => {
    Q(e => !e);
  }, []);
  const Xt = i.useRef(null);
  const Kt = i.useRef(false);
  const Zt = i.useCallback(e => {
    be(e);
    B(e);
    if (Kt.current) {
      Xt.current = e;
    } else {
      Xt.current = null;
      if (Re != null) {
        Re.setTtsConfig(e.voiceId, e.speed);
      }
    }
  }, []);
  const Gt = E || Ke;
  i.useEffect(() => {
    Kt.current = Gt;
    if (Gt) {
      return;
    }
    const e = Xt.current;
    if (e) {
      Xt.current = null;
      if (Re != null) {
        Re.setTtsConfig(e.voiceId, e.speed);
      }
    }
  }, [Gt]);
  const Vt = i.useCallback(e => {
    const t = Array.isArray(e == null ? undefined : e.reference_plan) ? e.reference_plan : [];
    if (t.length <= 0) {
      return null;
    }
    const n = typeof (e == null ? undefined : e.active_reference_index) == "number" ? e.active_reference_index : 0;
    const r = Math.min(Math.max(n, 0), t.length - 1);
    return {
      activeIndex: r,
      referenceCount: t.length,
      current: t[r],
      previous: r > 0 ? t[r - 1] : undefined,
      next: r < t.length - 1 ? t[r + 1] : undefined
    };
  }, []);
  const Jt = i.useCallback(e => {
    if (Re == null ? undefined : Re.isConnected) {
      Re.sendActionStepComplete(e);
    }
  }, []);
  const Qt = i.useCallback(e => {
    if (Re == null ? undefined : Re.isConnected) {
      Re.sendActionStepReceived(e);
    }
  }, []);
  i.useEffect(() => {
    R.current = I;
  }, [I]);
  i.useEffect(() => {
    F.current = L;
  }, [L]);
  i.useEffect(() => {
    ie.current = oe;
  }, [oe]);
  i.useEffect(() => {
    H.current = O;
  }, [O]);
  i.useEffect(() => {
    var e;
    Y.current = W;
    if (re.current !== null) {
      clearTimeout(re.current);
      re.current = null;
    }
    if (((e = te.current) == null ? undefined : e.pageIndex) !== W) {
      if (ne.current !== null) {
        clearTimeout(ne.current);
        ne.current = null;
      }
      te.current = null;
      V(e => e !== null && e.pageIndex !== W ? null : e);
    }
  }, [W]);
  i.useEffect(() => {
    Z.current = X;
  }, [X]);
  i.useEffect(() => {
    const e = () => {
      _e.current();
    };
    window.addEventListener("beforeunload", e);
    return () => {
      window.removeEventListener("beforeunload", e);
      _e.current();
    };
  }, []);
  i.useEffect(() => {
    const e = () => {
      if (Ce.current && (Re == null ? undefined : Re.isConnected)) {
        Ce.current = false;
        P(true);
        Re.startTeaching();
      }
    };
    window.addEventListener("pdf:page-rendered", e);
    return () => window.removeEventListener("pdf:page-rendered", e);
  }, []);
  const en = i.useCallback(() => {
    if (!et.current) {
      try {
        et.current = new AudioContext({
          sampleRate: 24000
        });
      } catch {
        et.current = new AudioContext();
      }
      tt.current = et.current.createGain();
      tt.current.gain.value = Ge.current ? 0 : 1;
      tt.current.connect(et.current.destination);
    }
    return et.current;
  }, []);
  const tn = i.useRef(new Map());
  const nn = i.useRef(0);
  const rn = i.useRef(false);
  const sn = i.useCallback(e => {
    const t = an.current.get(e);
    if (t !== undefined) {
      window.clearTimeout(t);
    }
    an.current.delete(e);
    tn.current.delete(e);
  }, []);
  const on = i.useCallback((e, t) => {
    const n = nn.current++;
    const r = Date.now() + Math.max(0, t);
    const s = () => {
      tn.current.delete(n);
      e();
    };
    const o = window.setTimeout(s, Math.max(0, t));
    tn.current.set(n, {
      fireAt: r,
      fn: s
    });
    if (rn.current) {
      window.clearTimeout(o);
    } else {
      an.current.set(n, o);
    }
    return n;
  }, []);
  const an = i.useRef(new Map());
  const ln = i.useRef(() => 0);
  const cn = i.useRef(() => {});
  const un = i.useRef(() => {});
  const dn = i.useRef(() => {});
  ln.current = on;
  const fn = i.useCallback(() => {
    if (!rn.current) {
      rn.current = true;
      an.current.forEach(e => window.clearTimeout(e));
      an.current.clear();
    }
  }, []);
  cn.current = sn;
  const pn = i.useCallback(() => {
    if (!rn.current) {
      return;
    }
    rn.current = false;
    const e = Date.now();
    tn.current.forEach((t, n) => {
      const r = Math.max(0, t.fireAt - e);
      an.current.set(n, window.setTimeout(t.fn, r));
    });
  }, []);
  un.current = fn;
  dn.current = pn;
  const mn = i.useCallback(() => {
    const e = et.current;
    if (e) {
      if (e.state === "suspended") {
        e.resume().then(() => Ze(true));
      } else {
        e.suspend().then(() => Ze(false));
      }
    }
  }, []);
  const hn = i.useCallback(e => {
    Ge.current = e;
    if (tt.current) {
      tt.current.gain.value = e ? 0 : 1;
    }
  }, []);
  const gn = i.useCallback((e, t = "clip") => {
    var n;
    let r = false;
    if (gt.current) {
      if (dt.current === "listening") {
        return true;
      }
      if ((n = Nt.current) != null) {
        n.stop();
      }
      Nt.current = null;
      bt.current = [];
      const e = xt.current;
      if (e) {
        e.onended = null;
        e.onerror = null;
        e.onplaying = null;
        e.pause();
      }
      kt.current = false;
      Sn();
      Nn.current(Bt.current);
      Bt.current = null;
      gt.current = false;
      ht.current = null;
      r = true;
    }
    const s = et.current;
    const o = r ? _t.current : !!s && s.state === "running";
    return (!!r || !!o || !!$.current) && (gt.current = true, _t.current = o, jt.current = false, bt.current = [], kt.current = false, mt(""), wt.current = "", vt.current = qe.current, yt.current = false, ft("listening"), un.current(), s && s.state === "running" && s.suspend().then(() => Ze(false)), Ct.current = t === "live", zt.current = "", St.current = "", Ft.current = null, t === "live" && (Dt.current = null, Bt.current = Mn.current({
      type: "user",
      content: "🎤 …"
    })), Re == null || Re.interjectStart({
      source: e,
      mode: t,
      stepId: at.current >= 0 ? at.current : undefined
    }), true);
  }, []);
  const xn = i.useCallback(() => {
    var e;
    if (gt.current) {
      Sn();
      if ((e = Nt.current) != null) {
        e.stop();
      }
      Nt.current = null;
      Ct.current = false;
      gt.current = false;
      ht.current = null;
      ft("idle");
      if (Re != null) {
        Re.interjectResume();
      }
      window.setTimeout(() => {
        if (gt.current) {
          return;
        }
        dn.current();
        const e = vt.current;
        vt.current = null;
        if (e !== null) {
          We(e);
          Xe(e => e + 1);
        }
        const t = et.current;
        if (t && t.state === "suspended") {
          t.resume().then(() => Ze(true));
        }
      }, 350);
    }
  }, []);
  const bn = i.useCallback(() => {
    var e;
    const t = Lt.current;
    if (t === "none") {
      It.current();
      return;
    }
    Lt.current = "none";
    Sn();
    const n = St.current;
    const r = zt.current.trim();
    const s = Ft.current;
    St.current = "";
    zt.current = "";
    Ft.current = null;
    if ((e = Nt.current) != null) {
      e.stop();
    }
    Nt.current = null;
    gt.current = false;
    ht.current = null;
    ft("idle");
    if (Re != null) {
      Re.interjectResume();
    }
    dn.current();
    Rt.current();
    if (t === "stop") {
      return;
    }
    const o = r.replace(/[^\p{L}\p{N}]/gu, "");
    if (n) {
      Tt.current(n);
    } else if (s && o.length > 0 && o.length < 5) {
      Et.current(s);
    } else if (r) {
      Tt.current(r);
    } else if (s) {
      Et.current(s);
    }
  }, []);
  $t.current = bn;
  const vn = i.useCallback(() => {
    if (!gt.current) {
      return;
    }
    const e = bt.current.shift();
    if (!e) {
      kt.current = false;
      if (jt.current) {
        $t.current();
      }
      return;
    }
    kt.current = true;
    ft("answering");
    let t = xt.current;
    if (!t) {
      t = new Audio();
      xt.current = t;
    }
    t.onended = null;
    t.onerror = null;
    t.onplaying = null;
    t.src = e.url;
    t.muted = Ge.current;
    t.onplaying = () => {
      if (gt.current && e.text) {
        yt.current = true;
        We(e.text);
        Xe(e => e + 1);
      }
    };
    t.onended = () => At.current();
    t.onerror = () => At.current();
    t.play().catch(() => At.current());
  }, []);
  const yn = i.useCallback(e => {
    if (gt.current) {
      St.current = e.text ?? "";
      zt.current = "";
      Ft.current = e.audioB64 && e.mime ? {
        audioB64: e.audioB64,
        mime: e.mime
      } : null;
      ft("thinking");
      Dt.current = ht.current;
      Bt.current = Mn.current({
        type: "user",
        content: e.text || "🎤 …"
      });
      if (Re != null) {
        Re.interjectQuestion(e);
      }
    }
  }, []);
  const wn = i.useCallback(e => {
    if (gt.current) {
      if (Re != null) {
        Re.interjectAudioChunk(e);
      }
    }
  }, []);
  const kn = i.useCallback(() => {
    if (gt.current) {
      ft("thinking");
      if (Re != null) {
        Re.interjectAudioEnd();
      }
    }
  }, []);
  const jn = i.useCallback(() => {
    var e;
    if (!gt.current) {
      return;
    }
    if (dt.current !== "listening") {
      if (Ct.current) {
        if (Re != null) {
          Re.interjectAudioEnd();
        }
      }
      return;
    }
    Nn.current(Bt.current);
    Bt.current = null;
    if ((e = Nt.current) != null) {
      e.stop();
    }
    Nt.current = null;
    bt.current = [];
    const t = xt.current;
    if (t) {
      t.onended = null;
      t.onerror = null;
      t.pause();
    }
    It.current();
  }, []);
  const Sn = i.useCallback(() => {
    const e = Mt.current;
    if (e) {
      Mt.current = null;
      A(t => t.map(t => t.id === e && t.type === "assistant_timeline" ? {
        ...t,
        isStreaming: false
      } : t));
    }
  }, []);
  It.current = xn;
  const _n = i.useCallback(e => {
    if (e) {
      A(t => t.filter(t => t.id !== e || t.type !== "user" || !t.content.startsWith("🎤")));
    }
  }, []);
  const Nn = i.useRef(_n);
  Nn.current = _n;
  At.current = vn;
  i.useEffect(() => {
    if (ct === "idle") {
      return;
    }
    const e = ct === "listening" ? 200000 : ct === "thinking" ? 30000 : 120000;
    const t = window.setTimeout(() => {
      var e;
      jt.current = true;
      Sn();
      Nn.current(Bt.current);
      Bt.current = null;
      if ((e = Nt.current) != null) {
        e.stop();
      }
      Nt.current = null;
      It.current();
    }, e);
    return () => window.clearTimeout(t);
  }, [ct]);
  const Cn = i.useCallback(e => {
    const t = {
      ...e,
      id: crypto.randomUUID(),
      timestamp: Date.now()
    };
    A(e => [...e, t]);
    return t.id;
  }, []);
  const Mn = i.useRef(() => "");
  Mn.current = Cn;
  const In = i.useCallback((e, t = false) => {
    if (g.current) {
      clearTimeout(g.current);
    }
    h({
      text: e,
      dismissible: t
    });
    if (!t) {
      g.current = window.setTimeout(() => h(null), 3000);
    }
  }, []);
  const An = i.useCallback(() => {
    if (g.current) {
      clearTimeout(g.current);
    }
    h(null);
  }, []);
  const Rn = i.useCallback(() => {
    A(e => e.some(e => e.type === "status" && e.content === Te()) ? e : [...e, {
      id: crypto.randomUUID(),
      type: "status",
      content: Te(),
      timestamp: Date.now()
    }]);
  }, []);
  const Tn = i.useCallback(() => {
    const e = Ot.current;
    if (e) {
      return e;
    }
    const t = Cn({
      type: "assistant_timeline",
      blocks: [],
      isStreaming: true
    });
    Ot.current = t;
    return t;
  }, [Cn]);
  const En = i.useCallback(e => {
    D(t => {
      const n = new Map(t);
      const r = n.get(e.pageIndex) ?? [];
      n.set(e.pageIndex, [...r, e]);
      return n;
    });
  }, []);
  const Pn = i.useCallback(e => {
    window.dispatchEvent(new CustomEvent("pdf:scroll-to-page", {
      detail: {
        pageIndex: e
      }
    }));
  }, []);
  const $n = i.useCallback(() => {
    if (ne.current !== null) {
      clearTimeout(ne.current);
      ne.current = null;
    }
    if (re.current !== null) {
      clearTimeout(re.current);
      re.current = null;
    }
    te.current = null;
    V(null);
  }, []);
  const Ln = i.useCallback((e, t, n) => {
    if (n !== "annotate") {
      if (!Ht.current) {
        if (ee.current) {
          if (H.current === "board-write") {
            H.current = "full-page";
            U("full-page");
          }
          te.current = {
            ids: [e],
            pageIndex: t
          };
          if (ne.current !== null) {
            clearTimeout(ne.current);
          }
          ne.current = setTimeout(() => {
            ne.current = null;
            const e = te.current;
            if (e) {
              te.current = null;
              if (!Ht.current) {
                if (ee.current && H.current !== "board-write" && e.pageIndex === Y.current) {
                  se.current += 1;
                  V({
                    ids: e.ids,
                    pageIndex: e.pageIndex,
                    nonce: se.current
                  });
                }
              }
            }
          }, 320);
        }
      }
    }
  }, [U]);
  const zn = i.useCallback(() => {
    for (const e of Je.current) {
      try {
        e.abort();
      } catch {}
    }
    Je.current.clear();
    Qe.current = 0;
  }, []);
  const Bn = i.useCallback(e => {
    for (const t of e) {
      if (Qe.current >= 3) {
        return;
      }
      if (!t.url || t.prefetch) {
        continue;
      }
      let e;
      try {
        e = en();
      } catch {
        return;
      }
      const n = t.url.startsWith("http") ? t.url : r(t.url);
      const s = new AbortController();
      t.prefetchAbort = s;
      Je.current.add(s);
      Qe.current += 1;
      t.prefetch = (async () => {
        const t = () => {
          Je.current.delete(s);
        };
        try {
          const {
            first: r,
            rest: o
          } = await ze(n, e, s.signal);
          if (o === $e) {
            t();
            return {
              ok: true,
              first: r,
              rest: o
            };
          }
          return {
            ok: true,
            first: r,
            rest: {
              async *[Symbol.asyncIterator]() {
                try {
                  yield* o;
                } finally {
                  t();
                }
              }
            }
          };
        } catch (r) {
          t();
          return {
            ok: false,
            error: r
          };
        }
      })();
    }
  }, [en]);
  const Dn = i.useCallback(() => {
    const e = Ve.current;
    if (e.length === 0) {
      st.current = false;
      Ze(false);
      T(e => e.tts === "generating" ? {
        ...e,
        tts: "completed"
      } : e);
      const e = lt.current;
      if (e !== null) {
        lt.current = null;
        Jt(e);
      }
      return;
    }
    st.current = true;
    const t = e.splice(0);
    const n = e => {
      var t;
      const n = e;
      if (n.speakReveal) {
        if (Ht.current) {
          return;
        }
        at.current = Math.max(at.current, e.stepId);
        n.speakReveal();
        return;
      }
      if (!e.reveal) {
        return;
      }
      if (Ht.current) {
        return;
      }
      {
        const t = e.reveal.say ?? "";
        if (t) {
          We(t);
          Xe(e => e + 1);
        }
      }
      at.current = Math.max(at.current, e.stepId);
      const {
        ann: r,
        pageIndex: s,
        tid: o,
        blockId: a,
        annotationType: i,
        text: l,
        keyword: c,
        note: u,
        say: d,
        content: f,
        mermaid: p,
        blocks: m,
        imagePrompt: h,
        language: g,
        annId: x,
        hasImagePrompt: b,
        caption: v
      } = e.reveal;
      En(r);
      Pn(s);
      q(s);
      Ln(r.id, s, i);
      if (i === "annotate") {
        $n();
        const e = (m == null ? undefined : m.length) ? m : Pe(undefined, {
          say: d,
          content: f,
          mermaid: p,
          imagePrompt: h,
          language: g,
          caption: v
        });
        const n = f || ((t = e.find(e => e.kind === "content")) == null ? undefined : t.content) || (u ?? d ?? undefined);
        const o = x ?? r.id;
        const a = x ? qt.current.get(x) : undefined;
        if (x && a) {
          qt.current.delete(x);
        }
        const i = a ? a.type === "generated_image" ? "done" : "error" : b ? "pending" : undefined;
        const l = (a == null ? undefined : a.type) === "generated_image" ? a.imageUrl : undefined;
        const c = (a == null ? undefined : a.type) === "generated_image" ? a.width : undefined;
        const y = (a == null ? undefined : a.type) === "generated_image" ? a.height : undefined;
        U("board-write");
        K(t => {
          const r = new Map(t);
          const a = r.get(s) ?? [];
          r.set(s, [...a, {
            annId: o,
            note: u,
            content: n,
            mermaid: p,
            blocks: e,
            pageIndex: s,
            caption: v,
            imageStatus: i,
            imageUrl: l,
            imageW: c,
            imageH: y,
            animateReveal: true
          }]);
          return r;
        });
      }
      A(t => t.map(t => t.id !== o || t.type !== "assistant_timeline" ? t : {
        ...t,
        blocks: [...t.blocks, {
          id: a,
          kind: "annotation",
          stepId: e.stepId,
          annotationType: i,
          pageIndex: s,
          text: l,
          keyword: c,
          note: u,
          say: d,
          content: f,
          mermaid: p,
          blocks: m,
          state: "done"
        }]
      }));
      if (Wt.current !== null) {
        clearTimeout(Wt.current);
      }
      Wt.current = setTimeout(() => {
        Wt.current = null;
        _e.current();
      }, 1500);
    };
    const s = e => {
      n(e);
    };
    (async () => {
      const e = ot.current;
      let o;
      try {
        o = en();
        if (o.state === "suspended") {
          await o.resume().catch(() => {});
        }
      } catch {
        for (const e of t) {
          s(e);
        }
        st.current = false;
        it.current();
        return;
      }
      const a = o.currentTime;
      if (nt.current < a) {
        nt.current = a;
      }
      let i = t.length;
      const l = () => {
        i -= 1;
        if (i <= 0) {
          if (Ve.current.length > 0) {
            it.current();
          } else {
            st.current = false;
            Ze(false);
            T(e => e.tts === "generating" ? {
              ...e,
              tts: "completed"
            } : e);
            const e = lt.current;
            if (e !== null) {
              lt.current = null;
              Jt(e);
            }
          }
        }
      };
      for (const [u, d] of t.entries()) {
        if (Ht.current) {
          l();
          continue;
        }
        if (!d.url) {
          const t = Math.max(0, (nt.current - o.currentTime) * 1000);
          ln.current(() => {
            if (ot.current === e) {
              n(d);
            }
            l();
          }, t);
          continue;
        }
        let a;
        let i;
        if (d.prefetch) {
          Qe.current = Math.max(0, Qe.current - 1);
        }
        if (ot.current === e) {
          Bn([...t.slice(u + 1), ...Ve.current]);
        }
        if (d.prefetch) {
          const t = await d.prefetch;
          if (t.ok === false) {
            if (Ht.current || ot.current !== e) {
              l();
              continue;
            }
            s(d);
            l();
            continue;
          }
          a = t.first;
          i = t.rest;
        } else {
          const e = d.url.startsWith("http") ? d.url : r(d.url);
          try {
            ({
              first: a,
              rest: i
            } = await ze(e, o));
          } catch (c) {
            s(d);
            l();
            continue;
          }
        }
        const f = Math.max(nt.current, o.currentTime);
        nt.current = f + a.duration;
        const p = Math.max(0, (f - o.currentTime) * 1000);
        let m = false;
        const h = ln.current(() => {
          m = true;
          if (ot.current === e) {
            n(d);
          }
        }, p);
        if (Ht.current || ot.current !== e) {
          cn.current(h);
          l();
          continue;
        }
        let g = false;
        const x = () => {
          if (!g) {
            g = true;
            cn.current(h);
            if (!m) {
              m = true;
              n(d);
            }
            l();
          }
        };
        let b = 0;
        let v = false;
        const y = (e, t) => {
          const n = o.createBufferSource();
          n.buffer = e;
          n.connect(tt.current ?? o.destination);
          rt.current.push(n);
          b += 1;
          n.onended = () => {
            rt.current = rt.current.filter(e => e !== n);
            b -= 1;
            if (v && b === 0) {
              x();
            }
          };
          n.start(t);
          if (gt.current && o.state === "running") {
            o.suspend().then(() => Ze(false));
          }
        };
        y(a, f);
        Ze(true);
        try {
          for await (const t of i) {
            if (Ht.current || ot.current !== e) {
              break;
            }
            const n = Math.max(nt.current, o.currentTime);
            nt.current = n + t.duration;
            y(t, n);
          }
        } catch (c) {}
        v = true;
        if (b === 0) {
          x();
        }
      }
    })();
  }, [Jt, En, $n, en, Bn, Ln, Pn, A, U, q, K]);
  it.current = Dn;
  const Fn = i.useCallback(e => {
    if (e.file_id) {
      ae(e.file_id);
      ie.current = e.file_id;
    }
    Ut.current = e.revision ?? 0;
    const t = e.annotations ?? [];
    const n = new Map();
    for (const r of t) {
      const e = n.get(r.pageIndex) ?? [];
      n.set(r.pageIndex, [...e, r]);
    }
    D(n);
    F.current = n;
  }, []);
  const On = i.useCallback(() => {
    if (!(Re == null ? undefined : Re.isConnected)) {
      return;
    }
    if (!ie.current) {
      return;
    }
    Ut.current += 1;
    const e = [];
    F.current.forEach(t => e.push(...t));
    const t = {};
    Z.current.forEach((e, n) => {
      t[String(n)] = e;
    });
    const n = {
      notes: t,
      zoomPhase: H.current,
      activeBoardPage: Y.current
    };
    Re.sendSyncBoardState({
      revision: Ut.current,
      file_id: ie.current,
      annotations: e
    }, n);
  }, []);
  _e.current = On;
  const Un = i.useCallback(() => {
    if (Le.current !== null) {
      clearTimeout(Le.current);
      Le.current = null;
    }
    Ie.current = false;
    Oe.current = 0;
  }, []);
  const Hn = i.useCallback(async () => {
    if (!Me.current && !Ie.current && !(Re == null ? undefined : Re.isConnected) && !(Re == null ? undefined : Re.isConnecting)) {
      Ie.current = true;
      try {
        if (!Re) {
          Re = new Ae();
          Re.setMessageHandler(e => Se.current(e));
          Re.setStateHandler(e => {
            c(e);
            o(e === "open");
          });
          Re.setCloseHandler(({
            code: e
          }) => {
            if (!Me.current && !Be.has(e)) {
              Ue.current(true);
            }
          });
        }
        await Re.connect(true);
        o(true);
        c("open");
        Oe.current = 0;
        Ie.current = false;
        Ve.current = [];
        zn();
        st.current = false;
        nt.current = 0;
        ot.current += 1;
        lt.current = null;
        for (const t of rt.current) {
          try {
            t.stop();
          } catch {}
        }
        rt.current = [];
        const e = Ne.current;
        if (e) {
          Re.resumeSession(e);
        } else {
          Re.startSession();
        }
      } catch (e) {
        Ie.current = false;
        if (!Me.current) {
          Ue.current(true);
        }
      }
    }
  }, [zn]);
  i.useEffect(() => {
    Ue.current = e => {
      if (Me.current) {
        return;
      }
      if (Le.current !== null || Ie.current) {
        return;
      }
      const t = Oe.current;
      const n = Math.min(30000, Math.pow(2, t) * 1000) + Math.floor(Math.random() * 250);
      Oe.current = Math.min(t + 1, 5);
      Le.current = setTimeout(() => {
        Le.current = null;
        Hn();
      }, n);
    };
  }, [Hn]);
  const Wn = i.useCallback(e => {
    var n;
    var a;
    var i;
    var c;
    var u;
    var f;
    var m;
    var h;
    var g;
    var x;
    var v;
    var j;
    var _;
    switch (e.type) {
      case "connection_established":
        o(true);
        break;
      case "tts_config":
        {
          const t = {
            voiceId: e.voice_id,
            speed: e.speed
          };
          be(t);
          B(t);
          break;
        }
      case "session_ready":
        {
          Ot.current = null;
          We("");
          Xe(e => e + 1);
          Ze(false);
          const r = e.session_id ?? null;
          p(r);
          if (r) {
            Ne.current = r;
            try {
              localStorage.setItem("pdf_session_id", r);
            } catch {}
          }
          Oe.current = 0;
          ge(false);
          {
            const t = e.conversation_id ?? ((n = e.course_state) == null ? undefined : n.conversation_id) ?? null;
            pe(e => t ?? e);
          }
          if (e.resumed && e.pdf_state) {
            const t = Array.isArray((a = e.course_state) == null ? undefined : a.reference_plan) ? e.course_state.reference_plan : [];
            const n = typeof ((i = e.course_state) == null ? undefined : i.active_reference_index) == "number" ? e.course_state.active_reference_index : 0;
            const r = t.length > 0 ? ((c = t[Math.min(Math.max(n, 0), t.length - 1)]) == null ? undefined : c.file_id) ?? null : null;
            Fn(!e.pdf_state.file_id && r ? {
              ...e.pdf_state,
              file_id: r
            } : e.pdf_state);
          } else {
            D(new Map());
            F.current = new Map();
            Ut.current = 0;
          }
          if (e.resumed && e.board_state) {
            const t = e.board_state;
            if (t.notes) {
              const e = new Map();
              for (const [n, r] of Object.entries(t.notes)) {
                const t = parseInt(n, 10);
                if (isNaN(t)) {
                  continue;
                }
                const s = r.map(e => ({
                  annId: e.annId,
                  note: e.note,
                  content: e.content,
                  mermaid: e.mermaid,
                  blocks: Pe(e.blocks, {
                    content: e.content,
                    mermaid: e.mermaid,
                    caption: e.caption
                  }),
                  pageIndex: typeof e.pageIndex == "number" ? e.pageIndex : t,
                  caption: e.caption,
                  imageStatus: e.imageStatus === "done" ? "done" : e.imageStatus === "error" ? "error" : undefined,
                  imageUrl: Ee(e.imageUrl),
                  imageW: e.imageW,
                  imageH: e.imageH
                }));
                e.set(t, s);
              }
              K(e);
              Z.current = e;
            }
            if (t.zoomPhase) {
              U(t.zoomPhase);
              H.current = t.zoomPhase;
            }
            if (typeof t.activeBoardPage == "number") {
              q(t.activeBoardPage);
              Y.current = t.activeBoardPage;
            }
          } else if (!e.resumed) {
            U("full-page");
            H.current = "full-page";
            q(0);
            Y.current = 0;
            K(new Map());
            Z.current = new Map();
          }
          ce(e.resumed ? Vt(e.course_state) : null);
          de(((h = e.resumed || ((u = e.course_state) == null ? undefined : u.standalone) ? (m = (f = e.course_state) == null ? undefined : f.course_session) == null ? undefined : m.session_title : null) == null ? undefined : h.trim()) || null);
          if (e.resumed && e.messages && e.messages.length > 0) {
            const t = [];
            let n = null;
            for (const r of e.messages) {
              const e = crypto.randomUUID();
              const s = new Date(r.timestamp).getTime() || Date.now();
              if (r.role === "user" && (r.content || ((g = r.attachments) == null ? undefined : g.length))) {
                if (!r.content.startsWith("[The student manually")) {
                  t.push({
                    id: e,
                    type: "user",
                    content: r.content,
                    timestamp: s,
                    attachments: (r.attachments || []).filter(e => e && e.file_id).map(e => ({
                      fileId: e.file_id,
                      filename: e.filename || e.file_id
                    }))
                  });
                }
              } else if (r.role === "assistant" && r.ops && r.ops.length > 0) {
                const o = [];
                for (const e of r.ops) {
                  if (e.op !== "go_to_page") {
                    if (e.op !== "keypoint") {
                      if (e.op !== "mark_response_complete" && e.op !== "pause" && e.op !== "go_to_next_document" && e.op !== "go_to_previous_document") {
                        if (e.op === "speak") {
                          if (e.say) {
                            o.push({
                              id: crypto.randomUUID(),
                              kind: "speak",
                              text: e.say,
                              pageIndex: typeof e.page_index == "number" ? e.page_index : 0
                            });
                          }
                        } else if (e.op === "ask") {
                          const t = De(e);
                          if (t) {
                            o.push(Fe(t));
                          }
                        } else {
                          o.push({
                            id: crypto.randomUUID(),
                            kind: "annotation",
                            stepId: 0,
                            annotationType: e.op,
                            pageIndex: typeof e.page_index == "number" ? e.page_index : 0,
                            text: e.text,
                            keyword: e.keyword,
                            note: e.note,
                            say: e.say,
                            content: e.content,
                            mermaid: e.mermaid,
                            blocks: Pe(e.blocks, {
                              say: e.say,
                              content: e.content,
                              mermaid: e.mermaid,
                              imagePrompt: e.image_prompt,
                              caption: e.caption
                            }),
                            state: "done"
                          });
                        }
                      }
                    } else if (typeof e.index == "number" && e.index >= 0) {
                      n = e.index;
                    }
                  }
                }
                if (o.length > 0) {
                  t.push({
                    id: e,
                    type: "assistant_timeline",
                    blocks: o,
                    isStreaming: false,
                    timestamp: s
                  });
                }
              }
            }
            if (t.length > 0) {
              A(t);
            }
            k.current = null;
            w(function (e) {
              const t = e[e.length - 1];
              if (!t || t.role !== "assistant" || !Array.isArray(t.ops)) {
                return null;
              }
              for (let n = t.ops.length - 1; n >= 0; n--) {
                const e = t.ops[n];
                if (e && e.op !== "mark_response_complete" && e.op !== "pause") {
                  if (e.op === "ask") {
                    const t = De(e);
                    if (t) {
                      return {
                        ...t,
                        restored: true
                      };
                    } else {
                      return null;
                    }
                  }
                  return null;
                }
              }
              return null;
            }(e.messages));
            S(e.session === true ? null : n);
          } else {
            k.current = null;
            w(null);
            S(null);
          }
          N(e.session === true);
          if (e.session === true) {
            Rn();
          }
          if (e.resumed && e.course_state) {
            if ((e.messages ?? []).some(e => e.role === "assistant")) {
              In(t("courseSession.resumedConversation"), true);
            } else if (ke.current) {
              we(true);
            } else {
              je.current = false;
              In(t("courseSession.newConversation"));
              Ce.current = true;
            }
          }
          d(true);
          const s = z();
          if (s) {
            if (Re != null) {
              Re.setTtsConfig(s.voiceId, s.speed);
            }
          }
          break;
        }
      case "course_session_selected":
        {
          const n = e.start_page_index ?? 0;
          Ot.current = null;
          Ht.current = false;
          b(false);
          w(null);
          P(false);
          We("");
          Ze(false);
          $n();
          lt.current = null;
          Ve.current = [];
          zn();
          st.current = false;
          nt.current = 0;
          ot.current += 1;
          qt.current.clear();
          for (const e of rt.current) {
            try {
              e.stop();
            } catch {}
          }
          rt.current = [];
          Ut.current = 0;
          ae(e.file_id);
          ie.current = e.file_id;
          D(new Map());
          F.current = new Map();
          K(new Map());
          Z.current = new Map();
          U("full-page");
          H.current = "full-page";
          q(n);
          Y.current = n;
          A([]);
          const r = {
            referenceId: e.reference.referenceId,
            referenceName: e.reference.referenceName,
            file_id: e.file_id,
            start_page_index: e.start_page_index,
            end_page_index: e.end_page_index
          };
          ce({
            activeIndex: e.reference_index,
            referenceCount: e.reference_count,
            current: r,
            previous: e.reference_index > 0 ? {} : undefined,
            next: e.reference_index < e.reference_count - 1 ? {} : undefined
          });
          de(((v = (x = e.course_session) == null ? undefined : x.session_title) == null ? undefined : v.trim()) || null);
          if (ke.current) {
            we(true);
          } else {
            je.current = false;
            In(t("courseSession.newConversation"));
            Ce.current = true;
          }
          window.requestAnimationFrame(() => Pn(n));
          break;
        }
      case "go_to_page":
        {
          const t = e.step_id ?? 0;
          const n = (e.page ?? 1) - 1;
          Qt(t);
          if (Ht.current) {
            break;
          }
          const r = () => {
            if (!Ht.current) {
              Pn(n);
              q(n);
              Y.current = n;
            }
          };
          Ve.current.push({
            stepId: t,
            speakReveal: r
          });
          if (!st.current) {
            it.current();
          }
          break;
        }
      case "ask":
        Qt(e.step_id ?? 0);
        if (Ht.current) {
          break;
        }
        k.current = De(e);
        break;
      case "keypoint":
        if (typeof e.index == "number" && e.index >= 0) {
          S(e.index);
          N(false);
        }
        break;
      case "mark_response_complete":
        {
          const t = e.step_id ?? 0;
          Qt(t);
          if (Ht.current) {
            break;
          }
          b(true);
          break;
        }
      case "interject_ready":
        ht.current = e.interject_id ?? null;
        if (Ct.current && e.mode && e.mode !== "live") {
          Nn.current(Bt.current);
          Bt.current = null;
          It.current();
          break;
        }
        if (Bt.current && Dt.current === null) {
          Dt.current = ht.current;
        }
        break;
      case "voice_transcript":
        {
          const t = (e.text ?? "").trim();
          const n = Pt.current;
          if (t && n) {
            Pt.current = null;
            A(e => e.map(e => e.id === n && e.type === "user" ? {
              ...e,
              content: t
            } : e));
          }
          break;
        }
      case "interject_user_text":
        {
          if (e.interject_id !== Dt.current) {
            break;
          }
          if (e.retract === true) {
            const e = Bt.current;
            Bt.current = null;
            Dt.current = null;
            zt.current = "";
            if (e) {
              A(t => t.filter(t => t.id !== e || t.type !== "user"));
            }
            break;
          }
          const t = e.delta ?? "";
          if (t) {
            zt.current += t;
          }
          const n = Bt.current;
          if (t && n) {
            A(e => e.map(e => {
              if (e.id !== n || e.type !== "user") {
                return e;
              }
              const r = e.content.startsWith("🎤") ? "" : e.content;
              return {
                ...e,
                content: r + t
              };
            }));
          }
          break;
        }
      case "interject_text":
        {
          if (e.interject_id !== ht.current) {
            break;
          }
          const t = e.delta ?? "";
          wt.current += t;
          mt(e => e + t);
          if (Mt.current) {
            const e = Mt.current;
            A(n => n.map(n => {
              if (n.id !== e || n.type !== "assistant_timeline") {
                return n;
              }
              const r = n.blocks.map((e, n) => n === 0 && e.kind === "speak" ? {
                ...e,
                text: e.text + t
              } : e);
              return {
                ...n,
                blocks: r
              };
            }));
          } else {
            Mt.current = Cn({
              type: "assistant_timeline",
              blocks: [{
                id: crypto.randomUUID(),
                kind: "speak",
                text: t,
                pageIndex: Y.current
              }],
              isStreaming: true
            });
          }
          break;
        }
      case "interject_pcm":
        {
          if (e.interject_id !== ht.current) {
            break;
          }
          let t = Nt.current;
          if (!t) {
            t = new y();
            t.setMuted(Ge.current);
            t.setSpeed(ve.current);
            t.onDrained = () => $t.current();
            Nt.current = t;
            ft("answering");
          }
          t.push(e.pcm_b64, e.sample_rate || 24000);
          if (wt.current) {
            yt.current = true;
            We(wt.current);
            Xe(e => e + 1);
          }
          break;
        }
      case "interject_audio":
        {
          if (e.interject_id !== ht.current) {
            break;
          }
          const t = e.audio_url;
          if (!t) {
            break;
          }
          bt.current.push({
            url: t.startsWith("http") ? t : r(t),
            text: e.text ?? ""
          });
          if (!kt.current) {
            At.current();
          }
          break;
        }
      case "interject_done":
        if (e.interject_id !== ht.current) {
          break;
        }
        jt.current = true;
        Lt.current = e.control === "stop" || e.control === "replan" ? e.control : "none";
        Sn();
        Nn.current(Bt.current);
        Bt.current = null;
        if (!yt.current && (e.text ?? "").trim()) {
          yt.current = true;
          We((e.text ?? "").trim());
          Xe(e => e + 1);
        }
        if (Nt.current) {
          Nt.current.markComplete();
        } else if (!kt.current && bt.current.length === 0) {
          $t.current();
        }
        break;
      case "interject_error":
        if (e.interject_id !== ht.current) {
          break;
        }
        jt.current = true;
        mt(t => t || (e.message ?? ""));
        Sn();
        Nn.current(Bt.current);
        Bt.current = null;
        if ((j = Nt.current) != null) {
          j.stop();
        }
        Nt.current = null;
        if (!kt.current) {
          It.current();
        }
        break;
      case "speak":
        {
          const t = e.step_id ?? 0;
          if (Ht.current) {
            Qt(t);
            break;
          }
          const n = Tn();
          const r = crypto.randomUUID();
          const s = e.say ?? "";
          Qt(t);
          T(e => ({
            ...e,
            tts: "generating",
            annotation: "generating"
          }));
          const o = () => {
            if (!Ht.current) {
              at.current = Math.max(at.current, t);
              if (s) {
                We(s);
                Xe(e => e + 1);
              }
              Pn(e.page_index ?? 0);
              q(e.page_index ?? 0);
              A(t => t.map(t => t.id !== n || t.type !== "assistant_timeline" ? t : {
                ...t,
                blocks: [...t.blocks, {
                  id: r,
                  kind: "speak",
                  text: s,
                  pageIndex: e.page_index ?? 0
                }]
              }));
              if (Wt.current !== null) {
                clearTimeout(Wt.current);
              }
              Wt.current = setTimeout(() => {
                Wt.current = null;
                _e.current();
              }, 1500);
            }
          };
          if (e.tts_skipped) {
            window.requestAnimationFrame(() => window.requestAnimationFrame(() => {
              o();
            }));
          } else if (e.tts_url) {
            Ve.current.push({
              url: e.tts_url,
              stepId: t,
              speakReveal: o
            });
            if (e.tts_url_tail) {
              Ve.current.push({
                url: e.tts_url_tail,
                stepId: t
              });
            }
            Bn(Ve.current);
            if (!st.current) {
              it.current();
            }
          } else {
            o();
          }
          break;
        }
      case "annotation":
        {
          const t = e.step_id ?? 0;
          const n = e.annotation_type;
          const r = typeof e.page_index == "number" ? e.page_index : 0;
          if (Ht.current) {
            Qt(t);
            break;
          }
          const s = typeof e.ann_id == "string" ? e.ann_id : undefined;
          const o = Pe(e.blocks, {
            say: e.say,
            content: e.content,
            mermaid: e.mermaid,
            imagePrompt: e.image_prompt,
            language: e.language,
            caption: e.caption
          });
          const a = {
            id: s ?? crypto.randomUUID(),
            type: n,
            pageIndex: r,
            text: e.text,
            keyword: e.keyword,
            anchor_start: e.anchor_start,
            anchor_end: e.anchor_end,
            include: e.include,
            rect: e.rect,
            color: e.color,
            note: e.note,
            say: e.say,
            content: e.content,
            mermaid: e.mermaid,
            blocks: o,
            image_prompt: e.image_prompt,
            ann_id: s
          };
          const i = Tn();
          const l = crypto.randomUUID();
          const c = n === "annotate" && o.some(e => e.kind === "image");
          const u = {
            ann: a,
            pageIndex: r,
            tid: i,
            blockId: l,
            annotationType: n,
            text: e.text,
            keyword: e.keyword,
            note: e.note,
            say: e.say,
            content: e.content,
            mermaid: e.mermaid,
            blocks: o,
            imagePrompt: e.image_prompt,
            language: e.language,
            annId: s,
            hasImagePrompt: c,
            caption: e.caption
          };
          Qt(t);
          T(e => ({
            ...e,
            tts: "generating",
            annotation: "generating"
          }));
          if (e.tts_skipped) {
            window.requestAnimationFrame(() => window.requestAnimationFrame(() => {
              var u;
              if (!Ht.current) {
                at.current = Math.max(at.current, t);
                if (e.say) {
                  We(e.say);
                  Xe(e => e + 1);
                }
                En(a);
                Pn(r);
                q(r);
                Ln(a.id, r, n);
                if (n === "annotate") {
                  $n();
                  const t = e.content || ((u = o.find(e => e.kind === "content")) == null ? undefined : u.content) || (e.note ?? e.say ?? undefined);
                  const n = s ?? a.id;
                  const i = s ? qt.current.get(s) : undefined;
                  if (s && i) {
                    qt.current.delete(s);
                  }
                  const l = i ? i.type === "generated_image" ? "done" : "error" : c ? "pending" : undefined;
                  const d = (i == null ? undefined : i.type) === "generated_image" ? i.imageUrl : undefined;
                  const f = (i == null ? undefined : i.type) === "generated_image" ? i.width : undefined;
                  const p = (i == null ? undefined : i.type) === "generated_image" ? i.height : undefined;
                  U("board-write");
                  K(s => {
                    const a = new Map(s);
                    const i = a.get(r) ?? [];
                    a.set(r, [...i, {
                      annId: n,
                      note: e.note,
                      content: t,
                      mermaid: e.mermaid,
                      blocks: o,
                      pageIndex: r,
                      caption: e.caption,
                      imageStatus: l,
                      imageUrl: d,
                      imageW: f,
                      imageH: p,
                      animateReveal: true
                    }]);
                    return a;
                  });
                }
                A(s => s.map(s => s.id !== i || s.type !== "assistant_timeline" ? s : {
                  ...s,
                  blocks: [...s.blocks, {
                    id: l,
                    kind: "annotation",
                    stepId: t,
                    annotationType: n,
                    pageIndex: r,
                    text: e.text,
                    keyword: e.keyword,
                    note: e.note,
                    say: e.say,
                    content: e.content,
                    mermaid: e.mermaid,
                    blocks: o,
                    state: "done"
                  }]
                }));
                if (Wt.current !== null) {
                  clearTimeout(Wt.current);
                }
                Wt.current = setTimeout(() => {
                  Wt.current = null;
                  _e.current();
                }, 1500);
              }
            }));
          } else if (e.tts_url) {
            if (e.tts_url_tail) {
              Ve.current.push({
                url: e.tts_url,
                stepId: t,
                reveal: u,
                skipAck: true
              });
              Ve.current.push({
                url: e.tts_url_tail,
                stepId: t
              });
            } else {
              Ve.current.push({
                url: e.tts_url,
                stepId: t,
                reveal: u
              });
            }
            Bn(Ve.current);
            if (!st.current) {
              it.current();
            }
          } else {
            at.current = Math.max(at.current, t);
            if (e.say) {
              We(e.say);
              Xe(e => e + 1);
            }
            En(a);
            Pn(r);
            q(r);
            Ln(a.id, r, n);
            if (n === "annotate") {
              $n();
              const t = e.content || ((_ = o.find(e => e.kind === "content")) == null ? undefined : _.content) || (e.note ?? e.say ?? undefined);
              const n = s ?? a.id;
              const i = s ? qt.current.get(s) : undefined;
              if (s && i) {
                qt.current.delete(s);
              }
              const l = i ? i.type === "generated_image" ? "done" : "error" : c ? "pending" : undefined;
              const u = (i == null ? undefined : i.type) === "generated_image" ? i.imageUrl : undefined;
              const d = (i == null ? undefined : i.type) === "generated_image" ? i.width : undefined;
              const f = (i == null ? undefined : i.type) === "generated_image" ? i.height : undefined;
              U("board-write");
              K(s => {
                const a = new Map(s);
                const i = a.get(r) ?? [];
                a.set(r, [...i, {
                  annId: n,
                  note: e.note,
                  content: t,
                  mermaid: e.mermaid,
                  blocks: o,
                  pageIndex: r,
                  caption: e.caption,
                  imageStatus: l,
                  imageUrl: u,
                  imageW: d,
                  imageH: f,
                  animateReveal: true
                }]);
                return a;
              });
            }
            A(s => s.map(s => s.id !== i || s.type !== "assistant_timeline" ? s : {
              ...s,
              blocks: [...s.blocks, {
                id: l,
                kind: "annotation",
                stepId: t,
                annotationType: n,
                pageIndex: r,
                text: e.text,
                keyword: e.keyword,
                note: e.note,
                say: e.say,
                content: e.content,
                mermaid: e.mermaid,
                blocks: o,
                state: "done"
              }]
            }));
          }
          break;
        }
      case "done":
        {
          const t = e.step_id;
          if (typeof t == "number") {
            if (Ht.current) {
              queueMicrotask(() => Jt(t));
              break;
            }
            if (st.current || Ve.current.length !== 0) {
              lt.current = t;
            } else {
              queueMicrotask(() => Jt(t));
            }
          }
          break;
        }
      case "response_complete":
        {
          Nn.current(Pt.current);
          Pt.current = null;
          lt.current = null;
          Ve.current = [];
          zn();
          st.current = false;
          nt.current = 0;
          ot.current += 1;
          qt.current.clear();
          $n();
          if (rt.current.length > 0) {
            Ht.current = true;
          }
          for (const e of rt.current) {
            try {
              e.stop();
            } catch {}
          }
          rt.current = [];
          const t = Ht.current;
          const n = t ? null : k.current;
          k.current = null;
          const r = Ot.current;
          if (r) {
            A(e => e.map(e => e.id === r && e.type === "assistant_timeline" ? {
              ...e,
              blocks: n ? [...e.blocks, Fe(n)] : e.blocks,
              isStreaming: false
            } : e));
            Ot.current = null;
          }
          w(n);
          if (!t && e.session !== true) {
            M(e => e + 1);
          }
          if (e.session === true) {
            Rn();
            N(true);
          }
          P(false);
          T({
            tts: "idle",
            annotation: "idle"
          });
          We("");
          Ze(false);
          if (Wt.current !== null) {
            clearTimeout(Wt.current);
            Wt.current = null;
          }
          window.requestAnimationFrame(() => On());
          break;
        }
      case "insufficient_funds":
      case "error":
        {
          const t = String(e.message ?? "");
          k.current = null;
          w(null);
          if (e.type === "insufficient_funds") {
            l(e.credit_info, e.next_reset_time);
          }
          const n = /session not found|not found/i.test(t);
          if (n && me.current) {
            Un();
            Ot.current = null;
            ge(true);
            d(false);
            P(false);
            Cn({
              type: "status",
              content: s.t("courseSession.standaloneSessionMissingDesc")
            });
            break;
          }
          if (n) {
            Un();
            Ne.current = null;
            try {
              localStorage.removeItem("pdf_session_id");
            } catch {}
            if (Re != null) {
              Re.startSession();
            }
            Ot.current = null;
            Cn({
              type: "status",
              content: s.t("pdfAnnotation.session.restarted")
            });
            P(false);
            break;
          }
          lt.current = null;
          Ve.current = [];
          zn();
          st.current = false;
          nt.current = 0;
          ot.current += 1;
          qt.current.clear();
          for (const e of rt.current) {
            try {
              e.stop();
            } catch {}
          }
          rt.current = [];
          const r = Ot.current;
          if (r) {
            A(e => e.map(e => e.id === r && e.type === "assistant_timeline" ? {
              ...e,
              isStreaming: false
            } : e));
            Ot.current = null;
          }
          Cn({
            type: "status",
            content: e.type === "insufficient_funds" ? s.t("quota.exhausted.transcriptNote") : s.t("pdfAnnotation.status.error", {
              message: t
            })
          });
          P(false);
          T({
            tts: "idle",
            annotation: "idle"
          });
          break;
        }
      case "generated_image":
        {
          if (Ht.current) {
            break;
          }
          const {
            ann_id: t,
            image_url: n,
            width: r,
            height: s
          } = e;
          const o = Ee(n) ?? n;
          K(e => {
            let n = false;
            const a = new Map(e);
            for (const [i, l] of a) {
              const e = l.map(e => e.annId !== t ? e : (n = true, {
                ...e,
                imageStatus: "done",
                imageUrl: o,
                imageW: r,
                imageH: s
              }));
              if (n) {
                a.set(i, e);
                break;
              }
            }
            if (!n) {
              qt.current.set(t, {
                type: "generated_image",
                imageUrl: o,
                width: r,
                height: s
              });
            }
            if (n) {
              return a;
            } else {
              return e;
            }
          });
          break;
        }
      case "image_gen_failed":
        {
          if (Ht.current) {
            break;
          }
          const {
            ann_id: t
          } = e;
          K(e => {
            let n = false;
            const r = new Map(e);
            for (const [s, o] of r) {
              const e = o.map(e => e.annId !== t ? e : (n = true, {
                ...e,
                imageStatus: "error"
              }));
              if (n) {
                r.set(s, e);
                break;
              }
            }
            if (!n) {
              qt.current.set(t, {
                type: "image_gen_failed"
              });
            }
            if (n) {
              return r;
            } else {
              return e;
            }
          });
          break;
        }
    }
  }, [t, zn, Jt, Qt, En, Cn, Rn, $n, Un, Vt, Tn, Bn, Ln, Fn, Pn, In, On]);
  i.useEffect(() => () => {
    if (g.current) {
      clearTimeout(g.current);
    }
  }, []);
  Se.current = Wn;
  i.useEffect(() => {
    const e = () => {
      if (!Me.current && (!Re || !Re.isConnected && !Re.isConnecting)) {
        Ue.current(true);
      }
    };
    const t = () => {
      e();
    };
    const n = () => {
      if (document.visibilityState === "visible") {
        e();
      }
    };
    window.addEventListener("online", t);
    document.addEventListener("visibilitychange", n);
    return () => {
      window.removeEventListener("online", t);
      document.removeEventListener("visibilitychange", n);
    };
  }, []);
  const qn = i.useCallback(async (e, t, n) => {
    ke.current = (n == null ? undefined : n.suppressInitialTeaching) === true;
    me.current = (n == null ? undefined : n.standalone) === true;
    ge(false);
    we(false);
    if (t) {
      Ne.current = null;
    } else if ((n == null ? undefined : n.standalone) && e) {
      Ne.current = e;
    } else if (Ne.current) {
      if (e && e !== Ne.current) {
        Ne.current = e;
      }
    } else {
      const t = (() => {
        try {
          return localStorage.getItem("pdf_session_id");
        } catch {
          return null;
        }
      })();
      Ne.current = e ?? t ?? null;
    }
    if (!Re) {
      Re = new Ae();
      Re.setMessageHandler(e => Se.current(e));
      Re.setStateHandler(e => {
        c(e);
        o(e === "open");
      });
      Re.setCloseHandler(({
        code: e
      }) => {
        if (!Me.current && !Be.has(e)) {
          Ue.current(true);
        }
      });
    }
    if (Re.isConnected) {
      o(true);
      return;
    }
    if (Re.isConnecting) {
      return;
    }
    const r = Re;
    try {
      await r.connect();
      if (Re !== r) {
        return;
      }
      o(true);
      c("open");
    } catch (a) {
      if (Re !== r) {
        return;
      }
      Ue.current(false);
      return;
    }
    if (t) {
      r.resumeOrStartCourseSession(t);
      return;
    }
    const s = Ne.current;
    if (s) {
      r.resumeSession(s);
    } else {
      r.startSession();
    }
  }, []);
  const Yn = i.useCallback(e => {
    if (Re == null ? undefined : Re.isConnected) {
      Re.stopGeneration();
    }
    Ht.current = true;
    $n();
    lt.current = null;
    Ve.current = [];
    zn();
    st.current = false;
    nt.current = 0;
    ot.current += 1;
    qt.current.clear();
    for (const t of rt.current) {
      try {
        t.stop();
      } catch {}
    }
    rt.current = [];
    if (Wt.current !== null) {
      clearTimeout(Wt.current);
      Wt.current = null;
    }
    Un();
    Ne.current = e;
    Ot.current = null;
    D(new Map());
    F.current = new Map();
    Ut.current = 0;
    ae(null);
    ie.current = null;
    ce(null);
    A([]);
    U("full-page");
    H.current = "full-page";
    q(0);
    Y.current = 0;
    K(new Map());
    Z.current = new Map();
    d(false);
    we(false);
    P(false);
    T({
      tts: "idle",
      annotation: "idle"
    });
    try {
      localStorage.setItem("pdf_session_id", e);
    } catch {}
    (async () => {
      if (!Re) {
        Re = new Ae();
        Re.setMessageHandler(e => Se.current(e));
        Re.setStateHandler(e => {
          c(e);
          o(e === "open");
        });
        Re.setCloseHandler(({
          code: e
        }) => {
          if (!Me.current && !Be.has(e)) {
            Ue.current(true);
          }
        });
      }
      if (!Re.isConnected) {
        await Re.connect();
        o(true);
        c("open");
      }
      Re.resumeSession(e);
    })();
  }, [zn, $n, Un]);
  const Xn = i.useCallback(() => {
    je.current = true;
    ke.current = false;
    if ((Re == null ? undefined : Re.isConnected) && u && ye) {
      je.current = false;
      we(false);
      if (ie.current) {
        Ht.current = false;
        at.current = -1;
        b(false);
        w(null);
        We("");
        $n();
        try {
          const e = en();
          if (e.state === "suspended") {
            e.resume();
          }
        } catch {}
        On();
        for (const e of rt.current) {
          try {
            e.stop();
          } catch {}
        }
        rt.current = [];
        lt.current = null;
        Ve.current = [];
        zn();
        st.current = false;
        nt.current = 0;
        ot.current += 1;
        P(true);
        T({
          tts: "idle",
          annotation: "idle"
        });
        Re.startTeaching(Y.current + 1);
      } else {
        Ce.current = true;
      }
    }
  }, [zn, $n, en, ye, u, On]);
  i.useEffect(() => {
    if (ye && je.current) {
      Xn();
    }
  }, [ye, Xn]);
  const Kn = i.useCallback((e, t, n, r, s) => {
    if (!(Re == null ? undefined : Re.isConnected) || !u) {
      return;
    }
    Ht.current = false;
    at.current = -1;
    b(false);
    w(null);
    We("");
    $n();
    if (Wt.current !== null) {
      clearTimeout(Wt.current);
      Wt.current = null;
    }
    try {
      const e = en();
      if (e.state === "suspended") {
        e.resume();
      }
    } catch {}
    On();
    const o = Ot.current;
    Ot.current = null;
    if (o) {
      A(e => e.map(e => e.id === o && e.type === "assistant_timeline" ? {
        ...e,
        isStreaming: false
      } : e));
    }
    for (const a of rt.current) {
      try {
        a.stop();
      } catch {}
    }
    rt.current = [];
    lt.current = null;
    Ve.current = [];
    zn();
    st.current = false;
    nt.current = 0;
    ot.current += 1;
    if (!s) {
      Cn({
        type: "user",
        content: e,
        attachments: t
      });
    }
    P(true);
    T({
      tts: "idle",
      annotation: "idle"
    });
    k.current = null;
    Re.sendMessage(e, t == null ? undefined : t.map(e => ({
      file_id: e.fileId,
      filename: e.filename
    })), n, r, s);
  }, [zn, Cn, $n, en, u, On]);
  const Zn = i.useCallback(e => {
    const t = v;
    if (!t || t.mode !== "choice") {
      return;
    }
    const n = t.options[e];
    if (n == null) {
      return;
    }
    const r = t.correctIndex == null ? null : t.correctIndex === e;
    Kn(n, undefined, {
      mode: "choice",
      option_index: e,
      option_text: n,
      correct: r,
      correct_option_text: t.correctIndex == null ? undefined : t.options[t.correctIndex]
    });
    return r;
  }, [v, Kn]);
  const Gn = i.useCallback(e => {
    if ((Re == null ? undefined : Re.isConnected) && u) {
      if (Re.isConnected) {
        Re.stopGeneration(at.current);
      }
      Ht.current = true;
      $n();
      b(false);
      w(null);
      P(false);
      We("");
      Ze(false);
      lt.current = null;
      Ve.current = [];
      zn();
      st.current = false;
      nt.current = 0;
      ot.current += 1;
      qt.current.clear();
      for (const e of rt.current) {
        try {
          e.stop();
        } catch {}
      }
      rt.current = [];
      Ot.current = null;
      ce(null);
      P(true);
      Re.selectCourseSession(e);
    }
  }, [zn, $n, u]);
  const Vn = i.useCallback(() => {
    if ((Re == null ? undefined : Re.isConnected) && (le == null ? undefined : le.next) && !E) {
      Re.stopGeneration(at.current);
      Ht.current = true;
      $n();
      b(false);
      w(null);
      P(true);
      Re.goToNextDocument();
    }
  }, [$n, le == null ? undefined : le.next, E]);
  const Jn = i.useCallback(() => {
    if ((Re == null ? undefined : Re.isConnected) && (le == null ? undefined : le.previous) && !E) {
      Re.stopGeneration(at.current);
      Ht.current = true;
      $n();
      b(false);
      w(null);
      P(true);
      Re.goToPreviousDocument();
    }
  }, [$n, le == null ? undefined : le.previous, E]);
  const Qn = i.useCallback(e => {
    if (Re == null ? undefined : Re.isConnected) {
      Pn(e);
      q(e);
      Y.current = e;
      Re.navigatePage(e + 1);
    }
  }, [Pn]);
  const er = i.useCallback(() => {
    var e;
    gt.current = false;
    ht.current = null;
    bt.current = [];
    const t = xt.current;
    if (t) {
      t.onended = null;
      t.onerror = null;
      t.pause();
    }
    kt.current = false;
    if ((e = Nt.current) != null) {
      e.stop();
    }
    Nt.current = null;
    ft("idle");
    dn.current();
    if (Re == null ? undefined : Re.isConnected) {
      Re.stopGeneration(at.current);
    }
    Ht.current = true;
    b(false);
    w(null);
    We("");
    Ze(false);
    $n();
    lt.current = null;
    Ve.current = [];
    zn();
    st.current = false;
    nt.current = 0;
    ot.current += 1;
    qt.current.clear();
    for (const r of rt.current) {
      try {
        r.stop();
      } catch {}
    }
    rt.current = [];
    const n = Ot.current;
    if (n) {
      A(e => e.map(e => e.id === n && e.type === "assistant_timeline" ? {
        ...e,
        isStreaming: false
      } : e));
      Ot.current = null;
    }
    P(false);
    T({
      tts: "idle",
      annotation: "idle"
    });
    if (Wt.current !== null) {
      clearTimeout(Wt.current);
      Wt.current = null;
    }
    window.requestAnimationFrame(() => On());
  }, [zn, $n, On]);
  const tr = i.useCallback((e, t) => {
    Kn(e.label ?? "🎤 …", undefined, undefined, {
      audioB64: e.audioB64,
      mime: e.mime,
      durationMs: e.durationMs
    }, t);
    if (!t) {
      A(e => {
        const t = e[e.length - 1];
        Pt.current = t && t.type === "user" ? t.id : null;
        return e;
      });
    }
  }, [Kn]);
  Rt.current = er;
  Tt.current = e => Kn(e, undefined, undefined, undefined, true);
  Et.current = e => tr(e, true);
  const nr = i.useCallback(() => {
    try {
      localStorage.removeItem("pdf_session_id");
    } catch {}
    Ne.current = null;
    Un();
    $n();
    Ot.current = null;
    Ht.current = false;
    at.current = -1;
    qt.current.clear();
    if (Wt.current !== null) {
      clearTimeout(Wt.current);
      Wt.current = null;
    }
    D(new Map());
    F.current = new Map();
    Ut.current = 0;
    ae(null);
    ie.current = null;
    ce(null);
    A([]);
    d(false);
    we(false);
    p(null);
    P(false);
    b(false);
    w(null);
    U("full-page");
    H.current = "full-page";
    q(0);
    Y.current = 0;
    K(new Map());
    Z.current = new Map();
    if (Re != null) {
      Re.disconnect();
    }
    Re = null;
    (async () => {
      Re = new Ae();
      Re.setMessageHandler(e => Se.current(e));
      Re.setStateHandler(e => {
        c(e);
        o(e === "open");
      });
      Re.setCloseHandler(({
        code: e
      }) => {
        if (!Me.current && !Be.has(e)) {
          Ue.current(true);
        }
      });
      Me.current = false;
      await Re.connect();
      o(true);
      c("open");
      Re.startSession();
    })();
  }, [$n, Un]);
  const rr = i.useCallback(() => {
    Me.current = true;
    Un();
    $n();
    _e.current();
    if (Wt.current !== null) {
      clearTimeout(Wt.current);
      Wt.current = null;
    }
    ot.current += 1;
    Ht.current = true;
    Ve.current = [];
    zn();
    st.current = false;
    lt.current = null;
    Ze(false);
    We("");
    Xe(e => e + 1);
    for (const e of rt.current) {
      try {
        e.stop();
      } catch {}
    }
    rt.current = [];
    if (et.current) {
      et.current.close().catch(() => {});
      et.current = null;
      tt.current = null;
      nt.current = 0;
    }
    if (Re != null) {
      Re.disconnect();
    }
    Re = null;
    Ne.current = null;
    o(false);
    c("closed");
    d(false);
    we(false);
    p(null);
    P(false);
  }, [zn, $n, Un]);
  const sr = i.useCallback(e => {
    ae(e);
    ie.current = e;
    ce(null);
    D(new Map());
    F.current = new Map();
    if (Re == null ? undefined : Re.isConnected) {
      Ut.current += 1;
      Re.sendSyncPdfState({
        revision: Ut.current,
        file_id: e,
        annotations: []
      });
    }
  }, []);
  const or = i.useCallback(() => (Re == null ? undefined : Re.ping()) ?? Promise.resolve(null), []);
  const ar = i.useCallback(() => (Re == null ? undefined : Re.modelProbe()) ?? Promise.resolve(null), []);
  return {
    connected: n,
    sessionReady: u,
    sessionId: f,
    wsSessionTitle: ue,
    conversationId: fe,
    sessionLoadFailed: he,
    sessionPrompt: m,
    dismissSessionPrompt: An,
    conversation: I,
    isProcessing: E,
    pdfAnnotations: L,
    fileId: oe,
    zoomPhase: O,
    activeBoardPage: W,
    pageBoardNotes: X,
    focusRequest: G,
    awaitingConfirm: x,
    pendingAsk: v,
    answerAsk: Zn,
    keypointIndex: j,
    keypointsDone: _,
    turnHandbackEpoch: C,
    courseDocumentState: le,
    initialTeachingReady: ye,
    connect: qn,
    startTeaching: Xn,
    sendMessage: Kn,
    navigatePage: Qn,
    sendStopGeneration: er,
    newSession: nr,
    onPdfUploaded: sr,
    setZoomPhase: U,
    setActiveBoardPage: q,
    resumeSession: Yn,
    selectCourseSession: Gn,
    goToNextDocument: Vn,
    goToPreviousDocument: Jn,
    disconnect: rr,
    autoFocusEnabled: J,
    toggleAutoFocus: Yt,
    narrationCaption: He,
    narrationCaptionEpoch: Ye,
    narrationPlaying: Ke,
    toggleNarration: mn,
    setNarrationMuted: hn,
    beginInterject: gn,
    sendInterjectQuestion: yn,
    sendInterjectPcm: wn,
    endInterjectPcm: kn,
    cancelInterject: jn,
    sendVoiceMessage: tr,
    interjectState: ct,
    interjectAnswer: pt,
    ttsConfig: xe,
    setTtsConfig: Zt,
    pingServer: or,
    runModelProbe: ar
  };
}
const Ue = /\\[a-zA-Z]{2,}/;
const He = /\\begin\{[^}]+\}/;
function We(e) {
  return He.test(e) || Ue.test(e);
}
const qe = new Set(["pmatrix", "bmatrix", "Bmatrix", "vmatrix", "Vmatrix", "matrix", "smallmatrix", "cases", "aligned", "array"]);
const Ye = /[一-鿿　-〿＀-￯]/;
const Xe = /[。，、；：！？（）【】""'']/;
const Ke = /[a-zA-Z0-9=+\-*/^_(){}|.,&\\!<>\s:;']/;
function Ze(e) {
  if (!e) {
    return e;
  }
  let t = e;
  t = function (e) {
    return e.replace(/\\begin\{([^}]+)\}([\s\S]*?)\\end\{\1\}/g, (e, t, n) => {
      if (!qe.has(t)) {
        return e;
      }
      return `\\begin{${t}}${n.replace(/\\( )(?=\S)/g, "\\\\$1")}\\end{${t}}`;
    });
  }(t);
  t = t.replace(/([^\n$])\$\$/g, "$1\n$$");
  t = t.replace(/\$\$([^\n$])/g, "$$\n$1");
  t = function (e) {
    const t = [];
    let n = 0;
    while (n < e.length) {
      if (e[n] === "$" && e[n + 1] === "$") {
        const r = e.indexOf("$$", n + 2);
        if (r !== -1) {
          t.push(e.slice(n, r + 2));
          n = r + 2;
        } else {
          t.push(e[n]);
          n++;
        }
        continue;
      }
      if (e[n] === "$") {
        if (n > 0 && e[n - 1] === "\\") {
          t.push("$");
          n++;
          continue;
        }
        let r = n + 1;
        let s = -1;
        while (r < e.length) {
          if (e[r] === "$" && e[r - 1] !== "\\") {
            s = r;
            break;
          }
          r++;
        }
        if (s === -1) {
          t.push(e[n]);
          n++;
          continue;
        }
        const o = e.slice(n + 1, s);
        if (o.includes("\n")) {
          t.push("\n$$\n", o, "\n$$\n");
        } else {
          t.push("$", o, "$");
        }
        n = s + 1;
        continue;
      }
      t.push(e[n]);
      n++;
    }
    return t.join("");
  }(t);
  t = function (e) {
    const t = [];
    let n = 0;
    while (n < e.length) {
      if (e[n] === "$" && e[n + 1] === "$") {
        const r = e.indexOf("$$", n + 2);
        if (r !== -1) {
          t.push(e.slice(n, r + 2));
          n = r + 2;
        } else {
          t.push(e[n]);
          n++;
        }
        continue;
      }
      if (e[n] === "$") {
        let r = n + 1;
        let s = -1;
        while (r < e.length) {
          if (e[r] === "$" && e[r - 1] !== "\\") {
            s = r;
            break;
          }
          r++;
        }
        if (s === -1) {
          t.push(e[n]);
          n++;
          continue;
        }
        const o = e.slice(n + 1, s);
        if (Ge.test(o)) {
          t.push("\n$$\n" + o + "\n$$\n");
        } else {
          t.push(e.slice(n, s + 1));
        }
        n = s + 1;
        continue;
      }
      t.push(e[n]);
      n++;
    }
    return t.join("");
  }(t);
  t = function (e) {
    const t = e.split("\n");
    const n = [];
    let r = false;
    for (const s of t) {
      if (s.trim() !== "$$") {
        if (r) {
          n.push(s);
        } else if (We(s)) {
          if (Ve(s)) {
            n.push(Je(s));
          } else {
            n.push(Qe(s));
          }
        } else {
          n.push(s);
        }
      } else {
        r = !r;
        n.push(s);
      }
    }
    return n.join("\n");
  }(t);
  t = t.replace(/\n{3,}/g, "\n\n");
  return t;
}
const Ge = new RegExp(`\\\\begin\\{(${["pmatrix", "bmatrix", "Bmatrix", "vmatrix", "Vmatrix", "matrix", "cases", "aligned", "array"].join("|")})\\}`);
function Ve(e) {
  let t = false;
  for (let n = 0; n < e.length; n++) {
    if (e[n] !== "$") {
      if (!t && e.startsWith("\\begin{", n)) {
        return true;
      }
    } else {
      t = !t;
    }
  }
  return false;
}
function Je(e) {
  let t = false;
  let n = -1;
  for (let i = 0; i < e.length; i++) {
    if (e[i] !== "$") {
      if (!t && e.startsWith("\\begin{", i)) {
        n = i;
        break;
      }
    } else {
      t = !t;
    }
  }
  if (n === -1) {
    return Qe(e);
  }
  let r = -1;
  const s = [...e.matchAll(/\\end\{[^}]+\}/g)];
  if (s.length > 0) {
    const e = s[s.length - 1];
    r = e.index + e[0].length;
  }
  if (r === -1) {
    return Qe(e);
  }
  const o = function (e, t) {
    let n = t - 1;
    while (n >= 0 && e[n] === " ") {
      n--;
    }
    while (n >= 0) {
      const t = e[n];
      if (Ye.test(t)) {
        n++;
        break;
      }
      if (Xe.test(t)) {
        n++;
        break;
      }
      if (!Ke.test(t)) {
        n++;
        break;
      }
      n--;
    }
    if (n < 0) {
      n = 0;
    }
    while (n < t && e[n] === " ") {
      n++;
    }
    return n;
  }(e, n);
  const a = function (e, t) {
    let n = t;
    while (n < e.length) {
      const t = e[n];
      if (Ye.test(t)) {
        break;
      }
      if (Xe.test(t)) {
        break;
      }
      if (!Ke.test(t)) {
        break;
      }
      n++;
    }
    while (n > t && e[n - 1] === " ") {
      n--;
    }
    return n;
  }(e, r);
  return e.slice(0, o) + "\n$$\n" + e.slice(o, a) + "\n$$\n" + e.slice(a);
}
function Qe(e) {
  const t = [];
  let n = 0;
  let r = false;
  while (n < e.length) {
    if (e[n] !== "$") {
      if (!r && e[n] === "\\" && /^\\[a-zA-Z]{2,}/.test(e.slice(n))) {
        const r = et(e, n);
        const s = nt(t, n - tt(e, n)) + e.slice(n, r);
        t.push("$", s, "$");
        n = r;
        continue;
      }
      t.push(e[n]);
      n++;
    } else {
      r = !r;
      t.push("$");
      n++;
    }
  }
  return t.join("");
}
function et(e, t) {
  let n = t;
  let r = 0;
  while (n < e.length) {
    const t = e[n];
    if (t !== "{") {
      if (t !== "}") {
        if (r > 0) {
          n++;
        } else {
          if (t === "$") {
            break;
          }
          if (Ye.test(t)) {
            break;
          }
          if (Xe.test(t)) {
            break;
          }
          if (/[.,;:!?]/.test(t) && n + 1 < e.length && /[\s一-鿿]/.test(e[n + 1])) {
            break;
          }
          n++;
        }
      } else {
        r = Math.max(0, r - 1);
        n++;
      }
    } else {
      r++;
      n++;
    }
  }
  while (n > t && e[n - 1] === " ") {
    n--;
  }
  return n;
}
function tt(e, t) {
  let n = t - 1;
  while (n >= 0 && e[n] === " ") {
    n--;
  }
  if (n < 0 || Ye.test(e[n]) || Xe.test(e[n])) {
    return t;
  }
  while (n >= 0) {
    const t = e[n];
    if (/[a-zA-Z0-9=+\-*/^_().|]/.test(t)) {
      n--;
    } else {
      if (t !== " " || !(n > 0) || !/[a-zA-Z0-9).]/.test(e[n - 1])) {
        break;
      }
      n--;
    }
  }
  for (n++; n < t && Ye.test(e[n]);) {
    n++;
  }
  return n;
}
function nt(e, t) {
  if (t <= 0) {
    return "";
  }
  let n = "";
  let r = t;
  while (r > 0 && e.length > 0) {
    const t = e[e.length - 1];
    if (t.length <= r) {
      n = t + n;
      r -= t.length;
      e.pop();
    } else {
      n = t.slice(t.length - r) + n;
      e[e.length - 1] = t.slice(0, t.length - r);
      r = 0;
    }
  }
  return n;
}
const rt = {
  strict: false,
  throwOnError: false
};
const st = [D, c];
const ot = [[u, rt], F];
function at({
  onUploaded: e,
  sessionId: t
}) {
  const {
    t: s
  } = a();
  const [o, l] = i.useState(false);
  const [c, u] = i.useState(null);
  const f = i.useRef(null);
  const p = i.useCallback(async o => {
    if (!o.name.toLowerCase().endsWith(".pdf")) {
      u(s("pdfAnnotation.upload.pdfOnly"));
      return;
    }
    const a = t ?? localStorage.getItem("pdf_session_id");
    if (a) {
      l(true);
      u(null);
      try {
        const t = new FormData();
        t.append("file", o);
        t.append("session_id", a);
        const i = n();
        const l = i ? {
          Authorization: `Bearer ${i}`
        } : {};
        const c = await fetch(r("/api/v1/pdf-annotation/upload"), {
          method: "POST",
          body: t,
          headers: l
        });
        if (!c.ok) {
          const e = await c.json().catch(() => ({}));
          throw new Error(e.detail ?? s("pdfAnnotation.upload.uploadFailed", {
            status: c.status
          }));
        }
        const u = await c.json();
        e(u.file_id, o.name);
      } catch (i) {
        u(String(i instanceof Error ? i.message : i));
      } finally {
        l(false);
      }
    } else {
      u(s("pdfAnnotation.upload.noActiveSession"));
    }
  }, [e, s]);
  const m = i.useCallback(e => {
    e.preventDefault();
    const t = e.dataTransfer.files[0];
    if (t) {
      p(t);
    }
  }, [p]);
  const h = i.useCallback(e => {
    var t;
    const n = (t = e.target.files) == null ? undefined : t[0];
    if (n) {
      p(n);
    }
  }, [p]);
  return d.jsxs("div", {
    onDrop: m,
    onDragOver: e => e.preventDefault(),
    onClick: () => {
      var e;
      if ((e = f.current) == null) {
        return undefined;
      } else {
        return e.click();
      }
    },
    className: "flex flex-col items-center justify-center gap-3 border-2 border-dashed\n        border-border rounded-xl p-10 cursor-pointer hover:border-primary/60 transition-colors\n        select-none",
    children: [d.jsx("input", {
      ref: f,
      type: "file",
      accept: ".pdf",
      className: "hidden",
      onChange: h
    }), o ? d.jsx(Y, {
      className: "w-8 h-8 text-primary animate-spin"
    }) : d.jsx(Ne, {
      className: "w-8 h-8 text-muted-foreground"
    }), d.jsxs("div", {
      className: "text-center",
      children: [d.jsx("p", {
        className: "text-sm font-medium text-foreground",
        children: s(o ? "pdfAnnotation.upload.uploading" : "pdfAnnotation.upload.uploadPdf")
      }), d.jsx("p", {
        className: "text-xs text-muted-foreground mt-1",
        children: s("pdfAnnotation.upload.dragDropHint")
      })]
    }), c && d.jsx("p", {
      className: "text-xs text-destructive mt-1",
      children: c
    })]
  });
}
function it(e) {
  return e.replace(/[\u2028\u2029\u00a0\u2009]/g, " ").replace(/\s+/g, " ").trim();
}
function lt(e) {
  return e.replace(/[\u2018\u2019\u201b\u2032]/g, "'").replace(/[\u201c\u201d\u201e\u2033]/g, "\"");
}
function ct(e) {
  return it(e.replace(/[^0-9A-Za-z一-鿿\s]+/g, " "));
}
function ut(e) {
  const t = it(e);
  if (!t.length) {
    return [];
  }
  const n = [];
  const r = new Set();
  const s = e => {
    const t = it(e);
    if (t.length && !r.has(t)) {
      r.add(t);
      n.push(t);
    }
  };
  s(t);
  s(lt(t));
  const o = t.replace(/^[-*•]\s+/, "");
  s(o);
  s(lt(o));
  const a = it(o.replace(/^\s*\d+\s+/, ""));
  s(a);
  s(lt(a));
  s(ct(o));
  s(ct(a));
  s(ct(a).replace(/\s+/g, ""));
  return n;
}
function dt(e, t) {
  const n = e.getBoundingClientRect();
  const r = n.width > 0 && e.offsetWidth > 0 ? n.width / e.offsetWidth : 1;
  return {
    x: (t.left - n.left) / r,
    y: (t.top - n.top) / r,
    w: t.width / r,
    h: t.height / r
  };
}
function ft(e, t) {
  const n = e.getBoundingClientRect();
  const r = n.width > 0 && e.offsetWidth > 0 ? n.width / e.offsetWidth : 1;
  const s = n.left + t.x * n.width;
  const o = n.top + t.y * n.height;
  return {
    x: (s - n.left) / r,
    y: (o - n.top) / r,
    w: t.w * n.width / r,
    h: t.h * n.height / r
  };
}
function pt(e) {
  const t = [];
  const n = document.createTreeWalker(e, NodeFilter.SHOW_TEXT);
  let r;
  let s = null;
  while (r = n.nextNode()) {
    const e = r;
    const n = e.parentNode;
    const o = e.nodeValue ?? "";
    if (o.length !== 0) {
      if (s !== null && n !== s) {
        t.push({
          node: e,
          offset: 0,
          ch: " ",
          synthetic: true
        });
      }
      s = n;
      for (let n = 0; n < o.length; n++) {
        t.push({
          node: e,
          offset: n,
          ch: o[n]
        });
      }
    }
  }
  return t;
}
function mt(e) {
  let t = "";
  const n = [];
  let r = false;
  for (let s = 0; s < e.length; s++) {
    const o = e[s].ch;
    if (/\s/.test(o)) {
      if (t.length === 0) {
        continue;
      }
      if (r) {
        continue;
      }
      t += " ";
      n.push(s);
      r = true;
    } else {
      t += o;
      n.push(s);
      r = false;
    }
  }
  return {
    norm: t,
    charIdx: n
  };
}
function ht(e, t) {
  let n = "";
  const r = [];
  let s = false;
  for (let o = 0; o < e.length; o++) {
    const a = e[o];
    if (/[0-9A-Za-z一-鿿]/.test(a)) {
      n += a;
      r.push(t[o]);
      s = false;
    } else if (n.length !== 0 && !s) {
      n += " ";
      r.push(t[o]);
      s = true;
    }
  }
  if (n.endsWith(" ")) {
    n = n.slice(0, -1);
    r.pop();
  }
  return {
    norm: n,
    charIdx: r
  };
}
function gt(e, t, n, r) {
  var s;
  var o;
  var a;
  let i = t[n];
  if (!((s = e[i]) == null ? undefined : s.synthetic)) {
    return i;
  }
  if (r) {
    for (let r = n + 1; r < t.length; r++) {
      const n = t[r];
      if (!((o = e[n]) == null ? undefined : o.synthetic)) {
        return n;
      }
    }
    return i;
  }
  for (let l = n - 1; l >= 0; l--) {
    const n = t[l];
    if (!((a = e[n]) == null ? undefined : a.synthetic)) {
      return n;
    }
  }
  return i;
}
function xt(e, t) {
  if (!t.length) {
    return null;
  }
  const n = pt(e);
  if (!n.length) {
    return null;
  }
  const {
    norm: r,
    charIdx: s
  } = mt(n);
  const o = lt(r);
  let a = o.indexOf(t);
  let i = t;
  let l = s;
  if (a < 0) {
    const e = ct(t);
    if (!e.length) {
      return null;
    }
    const n = ht(o, s);
    a = n.norm.indexOf(e);
    if (a < 0) {
      return null;
    }
    i = e;
    l = n.charIdx;
  }
  const c = a + i.length - 1;
  if (c >= l.length || a >= l.length) {
    return null;
  }
  const u = gt(n, l, a, true);
  const d = gt(n, l, c, false);
  const f = n[u];
  const p = n[d];
  const m = document.createRange();
  m.setStart(f.node, f.offset);
  m.setEnd(p.node, p.offset + 1);
  return m;
}
function bt(e, t) {
  const n = [];
  const r = t.getClientRects();
  for (let s = 0; s < r.length; s++) {
    const t = r[s];
    if (!(t.width < 1) || !(t.height < 1)) {
      n.push(dt(e, t));
    }
  }
  if (n.length === 0) {
    const r = t.getBoundingClientRect();
    if (r.width > 0 && r.height > 0) {
      n.push(dt(e, r));
    }
  }
  return n;
}
function vt(e) {
  const t = e.filter(e => e.w > 0.5 && e.h > 0.5);
  if (!t.length) {
    return null;
  }
  let n = Infinity;
  let r = Infinity;
  let s = -Infinity;
  let o = -Infinity;
  for (const a of t) {
    n = Math.min(n, a.x);
    r = Math.min(r, a.y);
    s = Math.max(s, a.x + a.w);
    o = Math.max(o, a.y + a.h);
  }
  return {
    x: n,
    y: r,
    w: s - n,
    h: o - r
  };
}
function yt(e) {
  const t = [];
  const n = /[0-9A-Za-z一-鿿]+/g;
  let r;
  while ((r = n.exec(e)) !== null) {
    t.push(r[0]);
  }
  return t;
}
function wt(e, t, n) {
  const r = yt(n).map(e => e.toLowerCase()).filter(e => e.length >= 2);
  if (r.length < 2) {
    return null;
  }
  if (r.reduce((e, t) => e + t.length, 0) < 6) {
    return null;
  }
  const s = pt(e);
  if (!s.length) {
    return null;
  }
  const {
    norm: o,
    charIdx: a
  } = mt(s);
  const i = lt(o).toLowerCase();
  const l = [];
  const c = /[0-9A-Za-z一-鿿]+/g;
  let u;
  while ((u = c.exec(i)) !== null) {
    l.push({
      text: u[0],
      normStart: u.index,
      normEnd: u.index + u[0].length - 1
    });
  }
  if (l.length < r.length) {
    return null;
  }
  const d = [];
  for (let A = 0; A < l.length; A++) {
    if (l[A].text !== r[0]) {
      continue;
    }
    let e = A;
    let t = 1;
    let n = true;
    for (let s = 1; s < r.length; s++) {
      let o = false;
      for (let n = 1; n <= 4; n++) {
        const a = e + n;
        if (a >= l.length) {
          break;
        }
        const i = l[a];
        if (i.text === r[s]) {
          e = a;
          t++;
          o = true;
          break;
        }
        if (i.text.length > 1) {
          break;
        }
      }
      if (!o) {
        n = false;
        break;
      }
    }
    if (n && t === r.length) {
      d.push({
        firstHi: A,
        lastHi: e
      });
    }
  }
  if (d.length !== 1) {
    return null;
  }
  const {
    firstHi: f,
    lastHi: p
  } = d[0];
  const m = l[f];
  const h = l[p];
  const g = m.normStart;
  let x = h.normEnd;
  if (g >= a.length || x >= a.length) {
    return null;
  }
  const b = a[g];
  const v = a[x];
  if (v - b > 200) {
    return null;
  }
  const y = s[gt(s, a, g, true)];
  if (!y) {
    return null;
  }
  const w = document.createRange();
  w.setStart(y.node, y.offset);
  w.setEnd(y.node, y.offset + 1);
  const k = bt(t, w);
  if (!k.length) {
    return null;
  }
  const j = k[0].y;
  const S = k[0].h * 0.6;
  const _ = v + 50;
  let N = a[x];
  for (let A = v + 1; A < s.length && A <= _; A++) {
    const e = s[A];
    if (!e || e.synthetic) {
      continue;
    }
    const n = document.createRange();
    n.setStart(e.node, e.offset);
    n.setEnd(e.node, e.offset + 1);
    const r = bt(t, n);
    if (!r.length) {
      continue;
    }
    const o = r[0].y;
    if (Math.abs(o - j) > S) {
      break;
    }
    N = A;
  }
  let C = x;
  for (let A = x; A < a.length && a[A] <= N; A++) {
    C = A;
  }
  x = C;
  const M = s[gt(s, a, x, false)];
  if (!M) {
    return null;
  }
  const I = document.createRange();
  I.setStart(y.node, y.offset);
  I.setEnd(M.node, M.offset + 1);
  return bt(t, I).filter(e => e.w > 0.5 && e.h > 0.5);
}
function kt(e, t, n, r, s, o) {
  const a = e.querySelector(".react-pdf__Page__textContent");
  if (r && s && a) {
    const t = function (e, t, n, r = "both") {
      if (!t.length || !n.length) {
        return null;
      }
      const s = pt(e);
      if (!s.length) {
        return null;
      }
      const {
        norm: o,
        charIdx: a
      } = mt(s);
      const i = lt(o);
      let l = -1;
      let c = -1;
      let u = a;
      for (const v of ut(t)) {
        const e = i.indexOf(v);
        if (e >= 0) {
          l = e;
          c = e + v.length;
          u = a;
          break;
        }
        const t = ct(v);
        if (!t.length) {
          continue;
        }
        const n = ht(i, a);
        const r = n.norm.indexOf(t);
        if (r >= 0) {
          l = r;
          c = r + t.length;
          u = n.charIdx;
          break;
        }
      }
      if (l < 0) {
        return null;
      }
      let d = -1;
      let f = -1;
      let p = a;
      for (const v of ut(n)) {
        const e = c;
        const t = i.indexOf(v, e);
        if (t >= 0) {
          d = t;
          f = t + v.length;
          p = a;
          break;
        }
        const n = ct(v);
        if (!n.length) {
          continue;
        }
        const r = ht(i, a);
        const s = u[Math.min(c - 1, u.length - 1)] ?? 0;
        let o = r.norm.indexOf(n);
        while (o >= 0) {
          if ((r.charIdx[o] ?? 0) >= s) {
            d = o;
            f = o + n.length;
            p = r.charIdx;
            break;
          }
          o = r.norm.indexOf(n, o + 1);
        }
        if (d >= 0) {
          break;
        }
      }
      if (d < 0) {
        return null;
      }
      const m = u[Math.min(c - 1, u.length - 1)] ?? 0;
      const h = (p[d] ?? 0) - m;
      if (h > 200 || h < 0) {
        return null;
      }
      const g = r === "both" || r === "start";
      const x = r === "both" || r === "end";
      const b = document.createRange();
      if (g) {
        const e = s[gt(s, u, l, true)];
        if (!e) {
          return null;
        }
        b.setStart(e.node, e.offset);
      } else {
        const e = s[gt(s, u, Math.min(c - 1, u.length - 1), false)];
        if (!e) {
          return null;
        }
        b.setStart(e.node, e.offset + 1);
      }
      if (x) {
        const e = s[gt(s, p, Math.min(f - 1, p.length - 1), false)];
        if (!e) {
          return null;
        }
        b.setEnd(e.node, e.offset + 1);
      } else {
        const e = s[gt(s, p, d, true)];
        if (!e) {
          return null;
        }
        b.setEnd(e.node, e.offset);
      }
      return b;
    }(a, r, s, o ?? "both");
    if (t) {
      const n = bt(e, t).filter(e => e.w > 0.5 && e.h > 0.5);
      if (n.length > 0) {
        return n;
      }
    }
  }
  if (r && !s && a) {
    const t = wt(a, e, r);
    if (t && t.length > 0) {
      return t;
    }
  }
  if (t && it(t) && a) {
    const n = function (e, t) {
      for (const n of ut(t)) {
        const t = xt(e, n);
        if (t) {
          return t;
        }
      }
      return null;
    }(a, t);
    if (n) {
      const t = bt(e, n).filter(e => e.w > 0.5 && e.h > 0.5);
      if (t.length > 0) {
        return t;
      }
    }
    const r = function (e, t, n) {
      const r = yt(n).map(e => e.toLowerCase());
      if (r.length < 3) {
        return null;
      }
      if (r.reduce((e, t) => e + t.length, 0) < 4) {
        return null;
      }
      const s = pt(e);
      if (!s.length) {
        return null;
      }
      const {
        norm: o,
        charIdx: a
      } = mt(s);
      const i = lt(o).toLowerCase();
      const l = [];
      const c = /[0-9A-Za-z一-鿿]+/g;
      let u;
      while ((u = c.exec(i)) !== null) {
        l.push({
          text: u[0],
          normStart: u.index,
          normEnd: u.index + u[0].length - 1
        });
      }
      if (l.length < r.length) {
        return null;
      }
      const d = [];
      const f = r.length;
      for (let S = 0; S <= l.length - f; S++) {
        let e = true;
        for (let t = 0; t < f; t++) {
          if (l[S + t].text !== r[t]) {
            e = false;
            break;
          }
        }
        if (e) {
          d.push(S);
        }
      }
      if (d.length !== 1) {
        return null;
      }
      const p = d[0];
      const m = l[p];
      const h = l[p + f - 1];
      const g = m.normStart;
      const x = h.normEnd;
      if (g >= a.length || x >= a.length) {
        return null;
      }
      const b = a[g];
      if (a[x] - b > 200) {
        return null;
      }
      const v = gt(s, a, g, true);
      const y = gt(s, a, x, false);
      const w = s[v];
      const k = s[y];
      if (!w || !k) {
        return null;
      }
      const j = document.createRange();
      j.setStart(w.node, w.offset);
      j.setEnd(k.node, k.offset + 1);
      return bt(t, j).filter(e => e.w > 0.5 && e.h > 0.5);
    }(a, e, t);
    if (r && r.length > 0) {
      return r;
    }
    const s = wt(a, e, t);
    if (s && s.length > 0) {
      return s;
    }
  }
  if (n && n.w > 0 && n.h > 0) {
    return [ft(e, n)];
  } else {
    return null;
  }
}
function jt({
  pageIndex: e,
  annotations: t,
  pageContainerRef: n,
  onResolvedGeometry: r,
  onFailedAnnotations: s
}) {
  const [o, a] = i.useState([]);
  const l = i.useRef(null);
  const c = i.useCallback(() => {
    const o = n.current;
    if (!o) {
      return;
    }
    const i = [];
    const l = [];
    for (const n of t) {
      if (n.pageIndex !== e) {
        continue;
      }
      const t = kt(o, n.keyword ?? n.text, n.rect, n.anchor_start, n.anchor_end, n.include);
      if (t) {
        i.push({
          ann: n,
          rects: t
        });
      } else {
        l.push(n.id);
      }
    }
    a(i);
    if (s && l.length > 0) {
      s(e, l);
    }
    if (r && i.length > 0) {
      const t = o.offsetWidth;
      const n = o.offsetHeight;
      if (t > 0 && n > 0) {
        const s = i.map(({
          ann: e,
          rects: r
        }) => {
          const s = vt(r) ?? r[0];
          return {
            id: e.id,
            normRect: {
              x: s.x / t,
              y: s.y / n,
              w: s.w / t,
              h: s.h / n
            }
          };
        });
        r(e, s);
      }
    }
  }, [t, n, e, r, s]);
  i.useEffect(() => {
    const e = window.setTimeout(c, 150);
    return () => window.clearTimeout(e);
  }, [c]);
  if (o.length === 0) {
    return null;
  } else {
    return d.jsx("svg", {
      ref: l,
      style: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        overflow: "visible",
        zIndex: 10
      },
      "aria-hidden": "true",
      children: o.map(({
        ann: e,
        rects: t
      }) => {
        if (e.type === "highlight") {
          const n = e.color ?? "rgba(255, 220, 0, 0.38)";
          return d.jsx("g", {
            children: t.map((e, t) => d.jsx("rect", {
              x: e.x,
              y: e.y,
              width: e.w,
              height: e.h,
              fill: n.startsWith("#") ? `${n}60` : n,
              rx: 2
            }, t))
          }, e.id);
        }
        if (e.type === "annotate") {
          return d.jsx("g", {
            children: t.map((e, t) => d.jsx("rect", {
              x: e.x,
              y: e.y,
              width: e.w,
              height: e.h,
              fill: "rgba(125, 211, 252, 0.34)",
              stroke: "rgba(14, 165, 233, 0.42)",
              strokeWidth: 1,
              rx: 3
            }, t))
          }, e.id);
        }
        if (e.type === "circle") {
          const n = vt(t) ?? t[0];
          const r = n.x + n.w / 2;
          const s = n.y + n.h / 2;
          const o = n.w / 2 + 3;
          const a = n.h / 2 + 3;
          return d.jsx("ellipse", {
            cx: r,
            cy: s,
            rx: o,
            ry: a,
            fill: "none",
            stroke: "#f97316",
            strokeWidth: 2
          }, e.id);
        }
        return null;
      })
    });
  }
}
const St = 0.25;
let _t = null;
let Nt = null;
function Ct(e, t, n, r, s = 420, o = 0, a = 0, i = 0, l = 0, c = 100) {
  if (_t) {
    clearTimeout(_t);
  }
  if (Nt) {
    cancelAnimationFrame(Nt);
    Nt = null;
  }
  _t = setTimeout(() => {
    var c;
    const u = e.getAppState();
    const d = u.width ?? 1200;
    const f = u.height ?? 800;
    const p = Math.max(d - Math.max(i, 0) - Math.max(l, 0), 1);
    const m = Math.max(St, Math.min(3, t));
    const h = (Math.max(l, 0) + p / 2 - o) / m - n;
    const g = (f / 2 - a) / m - r;
    const x = ((c = u == null ? undefined : u.zoom) == null ? undefined : c.value) ?? 1;
    const b = typeof u.scrollX == "number" ? u.scrollX : 0;
    const v = typeof u.scrollY == "number" ? u.scrollY : 0;
    const y = performance.now();
    const w = t => {
      const n = Math.min(1, (t - y) / Math.max(s, 1));
      const r = 1 - Math.pow(1 - n, 3);
      const o = x + (m - x) * r;
      const a = b + (h - b) * r;
      const i = v + (g - v) * r;
      e.updateScene({
        appState: {
          zoom: {
            value: o
          },
          scrollX: a,
          scrollY: i
        }
      });
      Nt = n < 1 ? requestAnimationFrame(w) : null;
    };
    Nt = requestAnimationFrame(w);
  }, c);
}
function Mt(e, t, n, r, s, o = 600, a = 0.05, i = 0, l = 0) {
  if (_t) {
    clearTimeout(_t);
  }
  if (Nt) {
    cancelAnimationFrame(Nt);
    Nt = null;
  }
  _t = setTimeout(() => {
    var c;
    const u = e.getAppState();
    const d = u.width ?? 1200;
    const f = u.height ?? 800;
    const p = Math.max(d - Math.max(i, 0) - Math.max(l, 0), 1);
    const m = Math.min(Math.max(p * (1 - a * 2) / Math.max(r, 1), St), Math.max(f * (1 - a * 2) / Math.max(s, 1), St), 3);
    const h = Math.max(St, Math.min(3, m));
    const g = t + r / 2;
    const x = n + s / 2;
    const b = (Math.max(l, 0) + p / 2) / h - g;
    const v = f / 2 / h - x;
    const y = ((c = u == null ? undefined : u.zoom) == null ? undefined : c.value) ?? 1;
    const w = typeof u.scrollX == "number" ? u.scrollX : 0;
    const k = typeof u.scrollY == "number" ? u.scrollY : 0;
    const j = performance.now();
    const S = t => {
      const n = Math.min(1, (t - j) / o);
      const r = 1 - Math.pow(1 - n, 3);
      const s = y + (h - y) * r;
      const a = w + (b - w) * r;
      const i = k + (v - k) * r;
      e.updateScene({
        appState: {
          zoom: {
            value: s
          },
          scrollX: a,
          scrollY: i
        }
      });
      Nt = n < 1 ? requestAnimationFrame(S) : null;
    };
    Nt = requestAnimationFrame(S);
  }, 100);
}
function It(e, t, n) {
  const r = e.getBoundingClientRect();
  const s = t.getBoundingClientRect();
  const o = r.width > 0 && e.offsetWidth > 0 ? r.width / e.offsetWidth : 1;
  const a = s.left + n.x * s.width;
  const i = s.top + n.y * s.height;
  const l = n.w * s.width;
  const c = n.h * s.height;
  return {
    x: (a - r.left) / o,
    y: (i - r.top) / o,
    w: l / o,
    h: c / o
  };
}
function At(e) {
  return e.replace(/\u2028|\u2029/g, " ").replace(/\s+/g, " ").trim();
}
function Rt(e) {
  return At(e.replace(/[^0-9A-Za-z一-鿿\s]+/g, " "));
}
function Tt(e) {
  const t = At(e);
  if (!t.length) {
    return [];
  }
  const n = [];
  const r = new Set();
  const s = e => {
    const t = At(e);
    if (t.length && !r.has(t)) {
      r.add(t);
      n.push(t);
    }
  };
  s(t);
  const o = t.replace(/^[-*•]\s+/, "");
  s(o);
  const a = At(o.replace(/^\s*\d+\s+/, ""));
  s(a);
  s(Rt(o));
  s(Rt(a));
  s(Rt(a).replace(/\s+/g, ""));
  return n;
}
function Et(e, t) {
  const n = e.getBoundingClientRect();
  const r = n.width > 0 && e.offsetWidth > 0 ? n.width / e.offsetWidth : 1;
  return {
    x: (t.left - n.left) / r,
    y: (t.top - n.top) / r,
    w: t.width / r,
    h: t.height / r
  };
}
function Pt(e, t) {
  let n = e.parentElement;
  while (n && t.contains(n)) {
    const e = n.tagName;
    if (e === "P" || e === "LI" || e === "BLOCKQUOTE" || e === "TD" || e === "TH" || e === "H1" || e === "H2" || e === "H3" || e === "H4" || e === "H5" || e === "H6") {
      return n;
    }
    if (n === t) {
      return t;
    }
    n = n.parentElement;
  }
  return null;
}
function $t(e, t, n) {
  if (e.node === t.node) {
    return false;
  }
  const r = Pt(e.node, n);
  const s = Pt(t.node, n);
  return r !== null && s !== null && r !== s;
}
function Lt(e, t) {
  if (!t.length) {
    return null;
  }
  const n = function (e) {
    const t = [];
    const n = document.createTreeWalker(e, NodeFilter.SHOW_TEXT);
    let r;
    while (r = n.nextNode()) {
      const e = r;
      const n = e.parentElement;
      if (n == null ? undefined : n.closest(".katex, .katex-display")) {
        continue;
      }
      const s = e.nodeValue ?? "";
      for (let r = 0; r < s.length; r++) {
        t.push({
          node: e,
          offset: r,
          ch: s[r]
        });
      }
    }
    return t;
  }(e);
  if (!n.length) {
    return null;
  }
  const {
    norm: r,
    charIdx: s
  } = function (e, t) {
    let n = "";
    const r = [];
    let s = false;
    for (let o = 0; o < t.length; o++) {
      if (o > 0 && n.length > 0 && !s && $t(t[o - 1], t[o], e)) {
        n += " ";
        r.push(o - 1);
        s = true;
      }
      const a = t[o].ch;
      if (/\s/.test(a)) {
        if (n.length === 0) {
          continue;
        }
        if (s) {
          continue;
        }
        n += " ";
        r.push(o);
        s = true;
      } else {
        n += a;
        r.push(o);
        s = false;
      }
    }
    return {
      norm: n,
      charIdx: r
    };
  }(e, n);
  let o = r.indexOf(t);
  let a = t;
  let i = s;
  if (o < 0) {
    const e = Rt(t);
    if (!e.length) {
      return null;
    }
    const n = function (e, t) {
      let n = "";
      const r = [];
      let s = false;
      for (let o = 0; o < e.length; o++) {
        const a = e[o];
        if (/[0-9A-Za-z一-鿿]/.test(a)) {
          n += a;
          r.push(t[o]);
          s = false;
        } else if (n.length !== 0 && !s) {
          n += " ";
          r.push(t[o]);
          s = true;
        }
      }
      if (n.endsWith(" ")) {
        n = n.slice(0, -1);
        r.pop();
      }
      return {
        norm: n,
        charIdx: r
      };
    }(r, s);
    o = n.norm.indexOf(e);
    if (o < 0) {
      return null;
    }
    a = e;
    i = n.charIdx;
  }
  const l = o + a.length - 1;
  if (l >= i.length || o >= i.length) {
    return null;
  }
  const c = n[i[o]];
  const u = n[i[l]];
  if (!c || !u) {
    return null;
  }
  const d = document.createRange();
  d.setStart(c.node, c.offset);
  d.setEnd(u.node, u.offset + 1);
  return d;
}
function zt(e, t) {
  for (const n of Tt(t)) {
    const t = Lt(e, n);
    if (t) {
      return t;
    }
  }
  return null;
}
function Bt(e, t) {
  const n = [];
  const r = t.getClientRects();
  for (let s = 0; s < r.length; s++) {
    const t = r[s];
    if (!(t.width < 1) || !(t.height < 1)) {
      n.push(Et(e, t));
    }
  }
  if (n.length === 0) {
    const r = t.getBoundingClientRect();
    if (r.width > 0 && r.height > 0) {
      n.push(Et(e, r));
    }
  }
  return n;
}
function Dt(e, t) {
  return !(e.right < t.left) && !(e.left > t.right) && !(e.bottom < t.top) && !(e.top > t.bottom);
}
function Ft(e, t, n, r) {
  if (r && r.w > 0 && r.h > 0) {
    return It(e, t, r);
  }
  if (!At(n)) {
    const n = t.querySelectorAll(".katex-display");
    if (n.length === 1) {
      return Et(e, n[0].getBoundingClientRect());
    }
    return null;
  }
  const s = zt(t, n);
  if (!s) {
    return null;
  }
  const o = function (e, t) {
    const n = t.getBoundingClientRect();
    const r = [...e.querySelectorAll(".katex-display")];
    if (!r.length) {
      return null;
    }
    let s = null;
    let o = Infinity;
    for (const a of r) {
      const e = t.startContainer.compareDocumentPosition(a);
      if ((e & Node.DOCUMENT_POSITION_PRECEDING) !== 0 && (e & Node.DOCUMENT_POSITION_CONTAINS) === 0) {
        continue;
      }
      const r = a.getBoundingClientRect();
      if (r.width < 2 || r.height < 2) {
        continue;
      }
      const i = r.top - n.bottom;
      const l = Math.abs((r.left + r.right) / 2 - (n.left + n.right) / 2);
      const c = (i < -48 ? 6000 : 0) + Math.max(0, i) * 2 + l * 0.18;
      if (c < o) {
        o = c;
        s = a;
      }
    }
    if (s && o < 950) {
      return s;
    } else {
      return null;
    }
  }(t, s) ?? function (e, t) {
    const n = t.getBoundingClientRect();
    const r = [...e.querySelectorAll(".katex")];
    let s = null;
    let o = Infinity;
    for (const a of r) {
      if (a.closest(".katex-display")) {
        continue;
      }
      const e = a.getBoundingClientRect();
      if (!Dt(n, e)) {
        continue;
      }
      const t = e.width * e.height;
      if (t < o) {
        o = t;
        s = a;
      }
    }
    return s;
  }(t, s);
  if (o) {
    return Et(e, o.getBoundingClientRect());
  }
  return function (e) {
    const t = e.filter(e => e.w > 0.5 && e.h > 0.5);
    if (!t.length) {
      return null;
    }
    let n = Infinity;
    let r = Infinity;
    let s = -Infinity;
    let o = -Infinity;
    for (const a of t) {
      n = Math.min(n, a.x);
      r = Math.min(r, a.y);
      s = Math.max(s, a.x + a.w);
      o = Math.max(o, a.y + a.h);
    }
    return {
      x: n,
      y: r,
      w: s - n,
      h: o - r
    };
  }(Bt(e, s));
}
const Ot = "rgba(254, 243, 199, 0.62)";
function Ut(e, t = 2) {
  if (e.length === 0) {
    return [];
  }
  const n = [...e].sort((e, t) => e.y - t.y || e.x - t.x);
  const r = [];
  let s = {
    ...n[0]
  };
  s.x -= t;
  s.y -= t;
  s.w += t * 2;
  s.h += t * 2;
  for (let o = 1; o < n.length; o++) {
    const e = n[o];
    const a = {
      ...e,
      x: e.x - t,
      y: e.y - t,
      w: e.w + t * 2,
      h: e.h + t * 2
    };
    const i = Math.max(s.y, a.y);
    const l = Math.min(s.y + s.h, a.y + a.h);
    const c = Math.max(0, l - i) / Math.max(1, Math.min(s.h, a.h)) >= 0.45;
    const u = a.x - (s.x + s.w);
    const d = s.x - (a.x + a.w);
    const f = Math.max(u, d, 0);
    if (c && f <= 12) {
      const e = Math.max(s.x + s.w, a.x + a.w);
      s.x = Math.min(s.x, a.x);
      s.w = e - s.x;
    } else {
      r.push(s);
      s = {
        ...a
      };
    }
  }
  r.push(s);
  return r;
}
function Ht(e, t) {
  if (e <= 0 || t <= 0) {
    return 1;
  }
  const n = Math.max(e, t);
  const r = Math.min(e, t);
  const s = ((n - r) / (n + r)) ** 2;
  return Math.PI * (n + r) * (1 + s * 3 / (10 + Math.sqrt(4 - s * 3)));
}
function Wt(e, t) {
  const n = e.w + t * 2;
  const r = e.h + t * 2;
  const s = e.x + e.w / 2;
  const o = e.y + e.h / 2;
  const a = Math.max(n / 2, 1);
  const i = Math.max(r / 2, 1);
  return {
    cx: s,
    cy: o,
    rx: a,
    ry: i,
    dashLen: Ht(a, i)
  };
}
function qt({
  rootRef: e,
  bodySelector: t,
  decorations: n,
  contentKey: r,
  layer: s,
  animEpoch: o
}) {
  const a = i.useId().replace(/:/g, "");
  const [l, c] = i.useState({
    highlights: [],
    circles: []
  });
  const u = n.map(e => {
    if (e.kind === "highlight") {
      const t = e.rectNorm;
      const n = t ? `${t.x},${t.y},${t.w},${t.h}` : "";
      return `h:${e.id}:${e.snippet ?? ""}:${n}`;
    }
    const t = e.rectNorm;
    const n = t ? `${t.x},${t.y},${t.w},${t.h}` : "";
    return `c:${e.id}:${e.snippet ?? ""}:${n}`;
  }).join("|");
  const f = i.useCallback(() => {
    var r;
    var o;
    const a = e.current;
    if (!a || n.length === 0) {
      c({
        highlights: [],
        circles: []
      });
      return;
    }
    const i = a.querySelector(t);
    if (!i) {
      c({
        highlights: [],
        circles: []
      });
      return;
    }
    const l = [];
    const u = [];
    for (const e of n) {
      if ((s !== "circles" || e.kind !== "highlight") && (s !== "highlights" || e.kind !== "circle")) {
        if (e.kind === "highlight") {
          const t = e.rectNorm;
          if (t && t.w > 0 && t.h > 0) {
            const n = Ut([It(a, i, t)], 1);
            l.push({
              id: e.id,
              rects: n,
              fill: ((r = e.color) == null ? undefined : r.trim()) || Ot
            });
          } else {
            if (!At(e.snippet ?? "")) {
              continue;
            }
            const t = zt(i, e.snippet ?? "");
            if (!t) {
              continue;
            }
            const n = Ut(Bt(a, t), 0.5);
            if (n.length) {
              l.push({
                id: e.id,
                rects: n,
                fill: ((o = e.color) == null ? undefined : o.trim()) || Ot
              });
            }
          }
        } else if (e.kind === "circle") {
          const t = Ft(a, i, e.snippet ?? "", e.rectNorm ?? null);
          if (!t) {
            continue;
          }
          const n = Math.max(4, Math.min(t.w, t.h) * 0.06);
          u.push({
            id: e.id,
            ...Wt(t, n)
          });
        }
      }
    }
    c({
      highlights: l,
      circles: u
    });
  }, [e, t, u, r, s, o]);
  const p = i.useCallback(() => {
    f();
    requestAnimationFrame(() => {
      f();
      requestAnimationFrame(() => {
        f();
        requestAnimationFrame(() => f());
      });
    });
    const e = window.setTimeout(f, 80);
    const t = window.setTimeout(f, 280);
    const n = window.setTimeout(f, 700);
    return () => {
      window.clearTimeout(e);
      window.clearTimeout(t);
      window.clearTimeout(n);
    };
  }, [f]);
  i.useLayoutEffect(() => p(), [p]);
  i.useLayoutEffect(() => {
    const n = e.current;
    if (!n || typeof ResizeObserver == "undefined") {
      return;
    }
    const r = new ResizeObserver(() => f());
    r.observe(n);
    const s = n.querySelector(t);
    if (s instanceof HTMLElement) {
      r.observe(s);
    }
    return () => r.disconnect();
  }, [e, t, f]);
  i.useLayoutEffect(() => {
    const n = e.current;
    if (!n || typeof MutationObserver == "undefined") {
      return;
    }
    const r = n.querySelector(t);
    if (!(r instanceof HTMLElement)) {
      return;
    }
    let s;
    const o = new MutationObserver(() => {
      if (s !== undefined) {
        window.clearTimeout(s);
      }
      s = window.setTimeout(() => {
        s = undefined;
        f();
      }, 24);
    });
    o.observe(r, {
      subtree: true,
      childList: true,
      characterData: true
    });
    return () => {
      o.disconnect();
      if (s !== undefined) {
        window.clearTimeout(s);
      }
    };
  }, [e, t, f, r]);
  const m = s === "circles" ? [] : l.highlights;
  const h = s === "highlights" ? [] : l.circles;
  if (m.length === 0 && h.length === 0) {
    return null;
  }
  const g = s === "highlights" ? "z-0" : s === "circles" ? "z-[18] pointer-events-none" : "z-[5]";
  return d.jsxs("svg", {
    className: `board-note-annotations pointer-events-none absolute inset-0 overflow-visible ${g}`,
    width: "100%",
    height: "100%",
    "aria-hidden": true,
    children: [d.jsxs("defs", {
      children: [m.flatMap(e => e.rects.map((t, n) => {
        const r = `${a}-hl-${e.id}-${n}`;
        const s = Math.max(0, t.w);
        const o = Math.max(0, t.h);
        return d.jsx("clipPath", {
          id: r,
          clipPathUnits: "userSpaceOnUse",
          children: d.jsx("rect", {
            x: t.x,
            y: t.y,
            width: 0,
            height: o,
            fill: "white",
            children: d.jsx("animate", {
              attributeName: "width",
              from: "0",
              to: s,
              dur: "1s",
              fill: "freeze",
              calcMode: "spline",
              keySplines: "0.22 1 0.36 1",
              keyTimes: "0;1"
            })
          })
        }, `cp-${e.id}-${n}`);
      })), h.length > 0 ? d.jsxs("filter", {
        id: a,
        x: "-12%",
        y: "-12%",
        width: "124%",
        height: "124%",
        children: [d.jsx("feTurbulence", {
          type: "fractalNoise",
          baseFrequency: "0.04",
          numOctaves: "1",
          result: "noise"
        }), d.jsx("feDisplacementMap", {
          in: "SourceGraphic",
          in2: "noise",
          scale: "1.2",
          xChannelSelector: "R",
          yChannelSelector: "G"
        })]
      }) : null]
    }), m.flatMap(e => e.rects.map((t, n) => d.jsx("rect", {
      x: t.x,
      y: t.y,
      width: t.w,
      height: t.h,
      rx: 4,
      ry: 4,
      fill: e.fill,
      clipPath: `url(#${a}-hl-${e.id}-${n})`
    }, `${e.id}-${n}`))), h.map(e => d.jsx("ellipse", {
      cx: e.cx,
      cy: e.cy,
      rx: e.rx,
      ry: e.ry,
      fill: "none",
      stroke: "#c2410c",
      strokeWidth: 2.5,
      strokeLinecap: "round",
      filter: `url(#${a})`,
      style: {
        strokeDasharray: e.dashLen,
        strokeDashoffset: e.dashLen,
        animation: "board-circle-draw 1s ease forwards"
      }
    }, e.id)), d.jsx("style", {
      children: "\n        @keyframes board-circle-draw {\n          to { stroke-dashoffset: 0; }\n        }\n      "
    })]
  });
}
function Yt(e) {
  return e.classList.contains("katex") || e.classList.contains("katex-display");
}
function Xt(e) {
  var t;
  const n = e.nodeValue ?? "";
  const r = document.createElement("span");
  r.className = "tw-run";
  r.dataset.twText = n;
  const s = [];
  for (const o of n) {
    const e = document.createElement("span");
    e.className = "tw-char tw-hidden";
    e.textContent = o;
    r.appendChild(e);
    s.push(e);
  }
  if ((t = e.parentNode) != null) {
    t.replaceChild(r, e);
  }
  return {
    run: r,
    chars: s
  };
}
function Kt({
  rootRef: e,
  scanRef: t,
  contentKey: n,
  enabled: r,
  onPen: s,
  onDone: o
}) {
  const a = i.useRef(s);
  a.current = s;
  const l = i.useRef(o);
  l.current = o;
  i.useLayoutEffect(() => {
    if (!r) {
      l.current();
      return;
    }
    const n = e.current;
    const s = t.current;
    if (!n || !s) {
      l.current();
      return;
    }
    const o = [];
    const i = e => {
      var t;
      for (let n = e.firstChild; n; n = n.nextSibling) {
        if (n.nodeType === Node.TEXT_NODE) {
          if ((t = n.nodeValue) == null ? undefined : t.length) {
            o.push({
              kind: "text",
              node: n
            });
          }
        } else if (n.nodeType === Node.ELEMENT_NODE) {
          const e = n;
          const t = e.tagName.toLowerCase();
          if (t === "style" || t === "script" || t === "svg") {
            continue;
          }
          if (Yt(e) || t === "img") {
            o.push({
              kind: "unit",
              el: e
            });
            continue;
          }
          i(e);
        }
      }
    };
    i(s);
    const c = [];
    const u = [];
    for (const e of o) {
      if (e.kind === "text") {
        const {
          run: t,
          chars: n
        } = Xt(e.node);
        c.push(t);
        for (const e of n) {
          u.push({
            el: e,
            math: false
          });
        }
      } else {
        e.el.classList.add("tw-unit", "tw-hidden");
        u.push({
          el: e.el,
          math: true
        });
      }
    }
    const d = Array.from(s.querySelectorAll(".overlay-note-title-highlight, table, th, td"));
    if (u.length === 0) {
      l.current();
      return;
    }
    const f = function (e, t, n) {
      const r = new Map();
      if (e.length === 0) {
        return r;
      }
      const s = new Set(e);
      const o = new Map();
      const a = n.parentElement;
      for (let l = 0; l < t.length; l++) {
        for (let e = t[l].el.parentElement; e && e !== a; e = e.parentElement) {
          if (!s.has(e)) {
            continue;
          }
          const t = o.get(e);
          if (t) {
            t.last = l;
          } else {
            o.set(e, {
              first: l,
              last: l
            });
          }
        }
      }
      const i = e => {
        const t = o.get(e);
        if (t) {
          if (e.matches(".overlay-note-title-highlight")) {
            return t.last;
          } else {
            return t.first;
          }
        }
        for (let n = e.parentElement; n && n !== a; n = n.parentElement) {
          const e = o.get(n);
          if (e) {
            return e.first;
          }
        }
      };
      for (const l of e) {
        l.classList.remove("tw-chrome-in");
        l.classList.add("tw-chrome-off");
        const e = i(l);
        if (e === undefined) {
          continue;
        }
        const t = r.get(e);
        if (t) {
          t.push(l);
        } else {
          r.set(e, [l]);
        }
      }
      return r;
    }(d, u, s);
    const p = Math.max(18, Math.min(50, Math.round(2880 / u.length)));
    let m = false;
    let h = 0;
    let g = 0;
    let x = 0;
    let b = 0;
    const v = e => {
      if (m) {
        return;
      }
      if (x === 0) {
        x = e;
      }
      b += e - x;
      x = e;
      let t = null;
      while (b >= p && g < u.length) {
        const e = g;
        const n = u[g++];
        n.el.classList.remove("tw-hidden");
        n.el.classList.add("tw-shown");
        for (const t of f.get(e) ?? []) {
          t.classList.remove("tw-chrome-off");
          t.classList.add("tw-chrome-in");
        }
        t = n.el;
        b -= p;
      }
      if (t) {
        (e => {
          const t = n.getBoundingClientRect();
          const r = t.width > 0 && n.offsetWidth > 0 ? t.width / n.offsetWidth : 1;
          const s = e.getBoundingClientRect();
          if (s.width !== 0 || s.height !== 0) {
            a.current({
              x: (s.right - t.left) / r,
              y: (s.bottom - t.top) / r
            });
          }
        })(t);
      }
      if (g >= u.length) {
        (() => {
          for (const e of c) {
            e.replaceWith(document.createTextNode(e.dataset.twText ?? e.textContent ?? ""));
          }
          for (const e of u) {
            if (e.math) {
              e.el.classList.remove("tw-unit", "tw-hidden", "tw-shown");
            }
          }
          for (const e of d) {
            e.classList.remove("tw-chrome-off");
          }
        })();
        l.current();
        return;
      }
      h = requestAnimationFrame(v);
    };
    h = requestAnimationFrame(v);
    return () => {
      m = true;
      if (h) {
        cancelAnimationFrame(h);
      }
    };
  }, [e, t, n, r]);
}
const Zt = {
  definition: "#1971c2",
  formula: "#6741d9",
  math: "#6741d9",
  example: "#2f9e44",
  text: "#495057",
  diagram_hint: "#e8590c"
};
const Gt = [0.22, 1, 0.36, 1];
function Vt(e) {
  return J(d.jsx(p, {
    remarkPlugins: st,
    rehypePlugins: ot,
    children: Ze(e)
  }));
}
function Jt(e) {
  e.querySelectorAll(".katex").forEach(e => {
    delete e.dataset.katexNaturalWidth;
    e.removeAttribute("data-katex-fit");
    e.style.removeProperty("--katex-fit-scale");
  });
}
function Qt(e) {
  const t = e.querySelector(".board-note-body");
  if (t) {
    t.querySelectorAll(".katex").forEach(e => {
      const n = Number(e.dataset.katexNaturalWidth) || e.scrollWidth;
      if (!Number.isFinite(n) || n <= 0) {
        return;
      }
      e.dataset.katexNaturalWidth = String(n);
      const r = function (e, t) {
        const n = e.closest(".katex-display") ?? e.closest("p, li, h1, h2, h3, blockquote") ?? t;
        return Math.max(1, Math.floor(n.clientWidth || t.clientWidth) - 2);
      }(e, t);
      const s = Math.min(1, r / n * 0.985);
      if (s < 0.999) {
        const t = s.toFixed(4);
        if (e.dataset.katexFit !== "true") {
          e.setAttribute("data-katex-fit", "true");
        }
        if (e.style.getPropertyValue("--katex-fit-scale") !== t) {
          e.style.setProperty("--katex-fit-scale", t);
        }
      } else if (e.dataset.katexFit === "true") {
        e.removeAttribute("data-katex-fit");
        e.style.removeProperty("--katex-fit-scale");
      }
    });
  }
}
function en({
  keypoint: e,
  width: t,
  decorations: n = [],
  animate: r = false
}) {
  const s = i.useRef(null);
  const o = i.useRef(null);
  const [a, l] = i.useState(0);
  const [c, u] = i.useState(true);
  const [p, m] = i.useState(null);
  const h = Zt[e.type] || "#495057";
  const g = (e.title || "").trim();
  const x = g.length === 0 ? "" : e.importance >= 3 ? `★ ${g}` : g;
  const b = x.length > 0;
  const v = V();
  const y = i.useMemo(() => b ? Vt(x) : "", [b, x]);
  const w = i.useMemo(() => Vt(e.content), [e.content]);
  const {
    bodyFs: k,
    titleFs: j,
    codeFs: S,
    pad: _,
    penSize: N
  } = i.useMemo(() => ({
    bodyFs: Math.max(14, Math.round(t * 0.045)),
    titleFs: Math.max(16, Math.round(t * 0.055)),
    codeFs: Math.max(12, Math.round(t * 0.035)),
    pad: Math.max(8, Math.round(t * 0.03)),
    penSize: Math.max(20, Math.round(t * 0.06))
  }), [t]);
  const C = i.useCallback((e = false) => {
    const t = s.current;
    if (t) {
      if (e) {
        Jt(t);
      }
      Qt(t);
    }
  }, []);
  i.useLayoutEffect(() => {
    var e;
    const t = s.current;
    if (!t) {
      return;
    }
    let n = 0;
    let r = false;
    const o = (e = false) => {
      if (n) {
        cancelAnimationFrame(n);
      }
      n = requestAnimationFrame(() => {
        n = 0;
        if (!r) {
          C(e);
        }
      });
    };
    Jt(t);
    o(false);
    const a = t.querySelector(".board-note-body");
    const i = typeof ResizeObserver != "undefined" && a ? new ResizeObserver(() => o(false)) : null;
    if (i && a) {
      i.observe(a);
    }
    if ((e = document.fonts) != null) {
      e.ready.then(() => {
        if (!r) {
          o(true);
        }
      });
    }
    return () => {
      r = true;
      if (n) {
        cancelAnimationFrame(n);
      }
      if (i != null) {
        i.disconnect();
      }
    };
  }, [k, C, w, y, t]);
  const M = i.useCallback(() => {
    u(false);
    m(null);
    l(e => e + 1);
  }, []);
  Kt({
    rootRef: s,
    scanRef: o,
    contentKey: e.content,
    enabled: r && !v,
    onPen: m,
    onDone: M
  });
  const I = c ? [] : n;
  return d.jsxs("div", {
    ref: s,
    className: "overlay-handwriting overlay-note-card overlay-note-card--expand relative box-border overflow-visible",
    style: {
      width: t,
      minHeight: 0,
      height: "auto"
    },
    children: [d.jsx(qt, {
      rootRef: s,
      bodySelector: ".board-note-body",
      decorations: I,
      contentKey: e.content,
      layer: "highlights",
      animEpoch: a
    }), d.jsxs("div", {
      className: "relative z-10 isolate w-full box-border overflow-x-visible overflow-y-visible",
      style: {
        paddingLeft: _,
        paddingRight: _,
        paddingTop: 0,
        paddingBottom: 4,
        "--board-body-fs": `${k}px`,
        "--board-title-fs": `${j}px`,
        "--code-fs": `${S}px`
      },
      children: [d.jsx("style", {
        children: "\n            .board-note-body { width: 100%; max-width: 100%; box-sizing: border-box; overflow: visible; font-size: var(--board-body-fs, 16px); }\n            .board-note-title { font-size: var(--board-title-fs, 18px); }\n            .board-note-body p {\n              display: block; width: 100%; max-width: 100%; margin: 0.2em 0; line-height: 1.5;\n              overflow: visible; word-break: break-word; overflow-wrap: anywhere;\n              white-space: pre-line;\n            }\n            .board-note-body li { margin: 0.32em 0; }\n            .board-note-body .katex-display { display: block; margin: 0.5em 0; overflow: visible; max-width: none; text-align: center; }\n            .board-note-body .katex-display > .katex { margin-left: auto; margin-right: auto; max-width: none; }\n            .board-note-body .katex[data-katex-fit=\"true\"] {\n              font-size: calc(1.05em * var(--katex-fit-scale, 1)) !important;\n            }\n            .board-note-body p .katex, .board-note-body li .katex {\n              max-width: none; overflow: visible; display: inline-block; vertical-align: text-bottom;\n            }\n            .board-note-body ul, .board-note-body ol { max-width: 100%; overflow: visible; padding-left: 1.25em; margin: 0; }\n\n            /* Typewriter reveal: each character dissolves in, in its final position.\n               opacity + blur only (never inline-block / transform), so the text is fully\n               laid out from the start and line-height never shifts. */\n            .tw-char.tw-hidden, .tw-unit.tw-hidden { opacity: 0; }\n            .tw-char.tw-shown { animation: tw-dissolve 360ms ease both; }\n            .tw-unit.tw-shown { animation: tw-fade 280ms ease both; }\n            @keyframes tw-dissolve {\n              from { opacity: 0; filter: blur(3px); }\n              to   { opacity: 1; filter: blur(0); }\n            }\n            @keyframes tw-fade { from { opacity: 0; } to { opacity: 1; } }\n\n            /* Chrome the typewriter holds back (see useTypewriterReveal): the title's\n               marker stripe swipes on once its words are written, so the colour never\n               shows up on an empty line ahead of the narration. */\n            .overlay-note-title-highlight { background-repeat: no-repeat; }\n            .overlay-note-title-highlight.tw-chrome-off { background-size: 0% 100%; }\n            .overlay-note-title-highlight.tw-chrome-in { animation: tw-marker-swipe 420ms ease both; }\n            @keyframes tw-marker-swipe {\n              from { background-size: 0% 100%; }\n              to   { background-size: 100% 100%; }\n            }\n\n            .board-write-pen {\n              display: inline-block;\n              transform-origin: bottom left;\n              animation: board-write-pen-bob 0.7s ease-in-out infinite;\n            }\n            @keyframes board-write-pen-bob {\n              0%   { transform: translateY(0) rotate(-6deg); }\n              50%  { transform: translateY(-2px) rotate(-1deg); }\n              100% { transform: translateY(0) rotate(-6deg); }\n            }\n          "
      }), d.jsxs("div", {
        ref: o,
        className: "w-full max-w-full",
        children: [b && d.jsx("div", {
          className: "mb-1 text-center [&_p]:inline [&_p]:m-0 leading-snug",
          children: d.jsx("span", {
            className: "overlay-note-title-highlight inline-block px-0.5 board-note-title font-normal",
            style: {
              color: h
            },
            dangerouslySetInnerHTML: {
              __html: y
            }
          })
        }), d.jsx("div", {
          className: "board-note-body max-w-none text-left leading-relaxed text-neutral-800 [&_h1]:text-[1.2em] [&_h1]:font-bold [&_h1]:my-2 [&_h2]:text-[1.1em] [&_h2]:font-semibold [&_h2]:my-2 [&_code]:rounded [&_code]:bg-muted/80 [&_code]:px-1 [&_code]:py-0.5 [&_code]:text-[0.92em]",
          dangerouslySetInnerHTML: {
            __html: w
          }
        })]
      })]
    }), d.jsx(qt, {
      rootRef: s,
      bodySelector: ".board-note-body",
      decorations: I,
      contentKey: e.content,
      layer: "circles",
      animEpoch: a
    }), d.jsx(ce, {
      children: !v && c && p && d.jsx(f.div, {
        "aria-hidden": true,
        className: "pointer-events-none absolute z-30",
        style: {
          left: p.x,
          top: p.y
        },
        initial: {
          opacity: 0
        },
        animate: {
          opacity: 1
        },
        exit: {
          opacity: 0
        },
        transition: {
          duration: 0.2,
          ease: Gt
        },
        children: d.jsx("div", {
          style: {
            transform: `translate(${2 / 24 * -N}px, ${22 / 24 * -N}px)`
          },
          children: d.jsx("span", {
            className: "board-write-pen",
            children: d.jsxs("svg", {
              width: N,
              height: N,
              viewBox: "0 0 24 24",
              fill: "#fde68a",
              stroke: "#b45309",
              strokeWidth: 1.6,
              strokeLinecap: "round",
              strokeLinejoin: "round",
              children: [d.jsx("path", {
                d: "M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"
              }), d.jsx("path", {
                d: "m15 5 4 4",
                fill: "none"
              })]
            })
          })
        })
      }, "write-pen")
    })]
  });
}
let tn = null;
const nn = {
  background: "transparent",
  nodeBkg: "#dbeafe",
  nodeTextColor: "#1e3a8a",
  nodeBorder: "#2563eb",
  mainBkg: "#fafaf9",
  secondBkg: "#f4f4f5",
  tertiaryBkg: "#e4e4e7",
  clusterBkg: "#f4f4f5",
  clusterBorder: "#a1a1aa",
  titleColor: "#18181b",
  edgeLabelBackground: "#fafaf9",
  cScale0: "#dbeafe",
  cScaleLabel0: "#1e3a8a",
  cScaleBorder0: "#2563eb",
  cScale1: "#ede9fe",
  cScaleLabel1: "#4c1d95",
  cScaleBorder1: "#7c3aed",
  cScale2: "#ccfbf1",
  cScaleLabel2: "#134e4a",
  cScaleBorder2: "#0d9488",
  cScale3: "#ffedd5",
  cScaleLabel3: "#7c2d12",
  cScaleBorder3: "#ea580c",
  cScale4: "#fce7f3",
  cScaleLabel4: "#831843",
  cScaleBorder4: "#db2777",
  cScale5: "#bbf7d0",
  cScaleLabel5: "#14532d",
  cScaleBorder5: "#16a34a",
  cScale6: "#fef08a",
  cScaleLabel6: "#713f12",
  cScaleBorder6: "#ca8a04",
  cScale7: "#fecdd3",
  cScaleLabel7: "#881337",
  cScaleBorder7: "#e11d48",
  lineColor: "#52525b",
  textColor: "#18181b",
  labelTextColor: "#18181b",
  labelBackground: "#fafaf9",
  actorBkg: "#dbeafe",
  actorBorder: "#2563eb",
  actorTextColor: "#1e3a8a",
  signalColor: "#3f3f46",
  signalTextColor: "#18181b",
  activationBkg: "#e4e4e7",
  activationBorder: "#71717a",
  noteBkgColor: "#fef9c3",
  noteTextColor: "#422006",
  noteBorderColor: "#ca8a04"
};
const rn = [{
  name: "blue",
  fill: "#dbeafe",
  stroke: "#2563eb",
  color: "#1e3a8a"
}, {
  name: "purple",
  fill: "#ede9fe",
  stroke: "#7c3aed",
  color: "#4c1d95"
}, {
  name: "cyan",
  fill: "#ccfbf1",
  stroke: "#0d9488",
  color: "#134e4a"
}, {
  name: "orange",
  fill: "#ffedd5",
  stroke: "#ea580c",
  color: "#7c2d12"
}, {
  name: "pink",
  fill: "#fce7f3",
  stroke: "#db2777",
  color: "#831843"
}, {
  name: "green",
  fill: "#bbf7d0",
  stroke: "#16a34a",
  color: "#14532d"
}, {
  name: "yellow",
  fill: "#fef08a",
  stroke: "#ca8a04",
  color: "#713f12"
}, {
  name: "red",
  fill: "#fecdd3",
  stroke: "#e11d48",
  color: "#881337"
}];
const sn = new Set(["graph", "flowchart", "subgraph", "end", "classdef", "class", "style", "click", "linkstyle", "direction", "td", "tb", "bt", "lr", "rl"]);
function on(e) {
  const t = (e.split("\n").find(e => e.trim()) ?? "").trim().toLowerCase();
  return t.startsWith("flowchart") || t.startsWith("graph");
}
function an(e) {
  let t = e.trim();
  if (t) {
    if (t.startsWith("```")) {
      t = t.replace(/^```(?:mermaid|mmd)?\s*\r?\n?/i, "").replace(/\r?\n?```\s*$/i, "").trim();
    }
    t = t.replace(/^(\s*subgraph\s+)(?!")(.*[(){}].*)$/gm, (e, t, n) => `${t}"${n.trim()}"`);
    t = t.replace(/(\w+\s*[\[\(])([^\]\)]+)([\]\)])/g, (e, t, n, r) => `${t}${n.replace(/&/g, "+")}${r}`);
    return function (e) {
      if (!on(e)) {
        return e;
      }
      if (/^\s*(classDef|class|style|linkStyle)\b/im.test(e)) {
        return e;
      }
      const t = /(^|\s)([A-Za-z0-9_一-龥]+)(?:\[[^\]]*\]|\([^)]*\))?/g;
      const n = new Set();
      let r;
      while ((r = t.exec(e)) !== null) {
        const e = r[2];
        if (e && !sn.has(e.toLowerCase())) {
          n.add(e);
        }
      }
      const s = Array.from(n);
      if (s.length === 0) {
        return e;
      }
      let o = "\n\n%% Auto-generated class definitions for node coloring\n";
      rn.forEach(e => {
        o += `classDef ${e.name} fill:${e.fill},stroke:${e.stroke},color:${e.color},stroke-width:2px;\n`;
      });
      o += "\n%% Apply colors to nodes\n";
      s.forEach((e, t) => {
        const n = rn[t % rn.length].name;
        o += `class ${e} ${n};\n`;
      });
      return e + o;
    }(t);
  } else {
    return t;
  }
}
function ln(e) {
  return e.split("\n").filter(e => !/^\s*(classDef|class|style|click|linkStyle)\b/i.test(e)).join("\n");
}
function cn(e) {
  var t;
  var n;
  const r = e.split("\n");
  const s = (t = r[0]) == null ? undefined : t.match(/^(graph|flowchart)\s+(LR|TD|TB|RL|BT)/i);
  if (!s) {
    return e;
  }
  const o = s[2].toUpperCase();
  if (o !== "LR" && o !== "RL") {
    return e;
  }
  const a = /^(\s*[A-Za-z0-9_一-龥]+(?:\[[^\]]*\])?(?:\([^)]*\))?)\s*(--?>+)\s*(\S.*)$/;
  const i = [];
  for (const m of r) {
    const e = m.trim();
    if (!e || e.startsWith("%") || e.startsWith("%%")) {
      continue;
    }
    const t = e.match(a);
    if (t) {
      i.push({
        from: t[1].trim(),
        arrow: t[2].trim(),
        to: t[3].trim(),
        raw: m
      });
    }
  }
  if (i.length < 4) {
    return e;
  }
  const l = new Map();
  for (const m of i) {
    const e = m.from.replace(/[\[\]\(\)]/g, "");
    const t = m.to.replace(/\s*-->+.*$/, "").trim().replace(/[\[\]\(\)]/g, "");
    if (!l.has(e)) {
      l.set(e, {});
    }
    if (!l.has(t)) {
      l.set(t, {});
    }
    l.get(e).next = t;
    l.get(t).prev = e;
  }
  let c = "";
  for (const [m, h] of l) {
    if (!h.prev) {
      c = m;
      break;
    }
  }
  if (!c) {
    return e;
  }
  const u = [];
  let d = c;
  while (d) {
    u.push(d);
    d = ((n = l.get(d)) == null ? undefined : n.next) ?? "";
  }
  if (u.length !== l.size) {
    return e;
  }
  if (u.length <= 4) {
    return e;
  }
  const f = [];
  f.push("flowchart TB");
  const p = [];
  for (let m = 0; m < u.length; m += 4) {
    p.push(u.slice(m, m + 4));
  }
  for (let m = 0; m < p.length; m++) {
    const e = p[m];
    if (e.length === 1) {
      f.push(`  ${e[0]}`);
    } else {
      for (let t = 0; t < e.length - 1; t++) {
        f.push(`  ${e[t]} --\x3e ${e[t + 1]}`);
      }
    }
    if (m > 0) {
      const t = p[m - 1];
      const n = t[t.length - 1];
      const r = e[0];
      if (n !== r) {
        f.push(`  ${n} --\x3e ${r}`);
      }
    }
  }
  return f.join("\n");
}
function un(e) {
  return `mmd_${e.replace(/[^a-zA-Z0-9_-]/g, "_") || "g"}_${Math.random().toString(36).slice(2, 9)}`;
}
async function dn(e, t) {
  const n = await async function () {
    tn ||= m(async () => {
      const {
        default: e
      } = await import("./mermaid.core-D9fe7qay.js").then(e => e.bD);
      return {
        default: e
      };
    }, __vite__mapDeps([0, 1, 2, 3])).then(({
      default: e
    }) => {
      e.initialize({
        startOnLoad: false,
        securityLevel: "loose",
        suppressErrorRendering: true,
        theme: "neutral",
        themeVariables: nn,
        fontFamily: "Virgil, Xiaolai, 'Segoe UI Emoji', 'Apple Color Emoji', 'PingFang SC', 'Microsoft YaHei', ui-sans-serif, system-ui, sans-serif",
        look: "handDrawn"
      });
      return e;
    });
    return tn;
  }();
  const r = an(e);
  if (!r) {
    throw new Error(s.t("pdfAnnotation.mermaid.emptyContent"));
  }
  const o = [on(r) ? cn(r) : r, r, ln(r)];
  const a = on(r) ? cn(ln(r)) : "";
  if (a) {
    o.push(a);
  }
  const i = new Set();
  let l;
  for (const s of o) {
    const e = s.trim();
    if (!e || i.has(e)) {
      continue;
    }
    i.add(e);
    const r = un(t ?? "diagram");
    try {
      if ((await n.parse(e, {
        suppressErrors: true
      })) === false) {
        continue;
      }
      return await n.render(r, e);
    } catch (c) {
      l = c;
    }
  }
  throw l instanceof Error ? l : new Error(s.t("pdfAnnotation.mermaid.renderFailed"));
}
function fn({
  graphKey: e,
  source: t,
  className: n,
  onRenderDone: r
}) {
  const {
    t: s
  } = a();
  const o = i.useRef(null);
  const [l, c] = i.useState(null);
  const [u, f] = i.useState(true);
  const p = function (e) {
    const t = i.useRef(e);
    t.current = e;
    return t;
  }(r);
  i.useEffect(() => {
    const n = o.current;
    if (!n) {
      return;
    }
    let r = false;
    c(null);
    f(true);
    n.innerHTML = "";
    (async () => {
      var n;
      var a;
      try {
        const {
          svg: s,
          bindFunctions: a
        } = await dn(t, e);
        if (r || !o.current) {
          return;
        }
        o.current.innerHTML = s;
        if (a != null) {
          a(o.current);
        }
        f(false);
        const i = o.current.querySelector("svg");
        const l = i ? i.getBoundingClientRect().height : undefined;
        if ((n = p.current) != null) {
          n.call(p, true, l);
        }
      } catch (i) {
        if (r) {
          return;
        }
        const e = i instanceof Error ? i.message : s("pdfAnnotation.mermaid.renderFailed");
        c(e);
        f(false);
        if ((a = p.current) != null) {
          a.call(p, false);
        }
      }
    })();
    return () => {
      r = true;
    };
  }, [e, t]);
  if (l) {
    return d.jsxs("div", {
      className: n ?? "rounded-lg border border-destructive/40 bg-destructive/5 px-3 py-2 text-xs text-destructive",
      children: [d.jsx("div", {
        className: "font-medium",
        children: s("pdfAnnotation.mermaid.renderErrorTitle")
      }), d.jsx("pre", {
        className: "mt-1 max-h-24 overflow-auto whitespace-pre-wrap break-words font-mono text-[10px] opacity-90",
        children: l
      })]
    });
  } else {
    return d.jsxs("div", {
      className: "relative z-0 flex w-full min-h-0 flex-col",
      children: [u ? d.jsx("div", {
        className: "absolute inset-0 z-[1] flex items-center justify-center rounded bg-muted/30 text-xs text-muted-foreground",
        children: s("pdfAnnotation.mermaid.rendering")
      }) : null, d.jsx("div", {
        ref: o,
        className: n ?? "mermaid-graph-host overflow-visible [&_svg]:block [&_svg]:mx-auto [&_svg]:max-h-none"
      })]
    });
  }
}
function pn({
  src: e,
  width: t
}) {
  const [n, r] = i.useState(false);
  return d.jsx("div", {
    className: "rounded-lg overflow-hidden bg-gray-50 border border-gray-100",
    style: {
      width: t
    },
    children: d.jsx("img", {
      src: e,
      alt: "",
      draggable: false,
      onLoad: () => r(true),
      className: "block w-full transition-[filter,opacity] duration-700 ease-out",
      style: {
        height: "auto",
        filter: n ? "blur(0px)" : "blur(16px)",
        opacity: n ? 1 : 0.15
      }
    })
  });
}
const mn = 40;
const hn = 40;
const gn = 320;
const xn = 800;
const bn = {
  canvasActions: {
    changeViewBackgroundColor: false,
    clearCanvas: false,
    export: false,
    loadScene: false,
    saveToActiveFile: false,
    toggleTheme: false,
    saveAsImage: false
  },
  tools: {
    image: false
  }
};
const vn = {
  viewBackgroundColor: "transparent",
  theme: "light",
  scrollX: 0,
  scrollY: 0
};
function yn(e, t = e.content ?? "") {
  return {
    title: e.note ?? "",
    content: t,
    type: "text",
    importance: 2,
    column: 1
  };
}
function wn({
  pageNumber: e,
  pageIndex: t,
  annotations: n,
  zoomPhase: r,
  boardNotes: s,
  onResolvedGeometry: o,
  onFailedAnnotations: a,
  focusRequest: l,
  rightInset: c = 0,
  leftInset: u = 0,
  onZoomChange: f,
  zoomControlRef: p
}) {
  var m;
  const h = i.useRef(null);
  const g = i.useRef(null);
  const x = i.useRef(null);
  const b = i.useRef(null);
  const [, v] = i.useState(0);
  const y = i.useRef(null);
  const w = i.useRef(null);
  const k = i.useRef(null);
  const j = V() ?? false;
  const S = i.useRef(-1);
  const _ = i.useRef(new Map());
  const [N, C] = i.useState(new Map());
  const [M, I] = i.useState(0);
  const A = i.useRef(null);
  const R = i.useRef(0);
  i.useEffect(() => {
    I(0);
    R.current = 0;
    return () => {
      if (A.current !== null) {
        window.clearTimeout(A.current);
        A.current = null;
      }
    };
  }, [e]);
  const T = i.useCallback(e => {
    const t = R.current;
    if (!(t >= 3)) {
      R.current = t + 1;
      if (A.current !== null) {
        window.clearTimeout(A.current);
      }
      A.current = window.setTimeout(() => {
        A.current = null;
        I(e => e + 1);
      }, (t + 1) * 600);
    }
  }, []);
  const E = i.useRef(-1);
  const P = i.useRef(new Map());
  const [$, L] = i.useState(new Map());
  const z = i.useRef(false);
  const B = i.useRef(r);
  i.useEffect(() => {
    B.current = r;
  }, [r]);
  const D = xn;
  const [F, O] = i.useState(0);
  const U = i.useRef(null);
  const W = i.useMemo(() => ({
    appState: {
      ...vn
    }
  }), []);
  const q = i.useRef(null);
  i.useEffect(() => {
    const e = q.current;
    const t = h.current;
    if (!e || !t) {
      return;
    }
    const n = e => {
      var n;
      var r;
      e.preventDefault();
      const s = t.querySelector("canvas.upper-canvas, canvas");
      if (s) {
        z.current = true;
        if (e.ctrlKey || e.metaKey) {
          const t = ((r = (n = x.current) == null ? undefined : n.zoom) == null ? undefined : r.value) ?? 1;
          if (e.deltaY > 0 && t <= St) {
            return;
          }
          if (e.deltaY < 0 && t >= 3) {
            return;
          }
        }
        s.dispatchEvent(new WheelEvent("wheel", {
          bubbles: true,
          cancelable: true,
          deltaX: e.deltaX,
          deltaY: e.deltaY,
          deltaMode: e.deltaMode,
          ctrlKey: e.ctrlKey,
          metaKey: e.metaKey,
          shiftKey: e.shiftKey,
          altKey: e.altKey,
          clientX: e.clientX,
          clientY: e.clientY
        }));
      }
    };
    e.addEventListener("wheel", n, {
      passive: false
    });
    let r = false;
    const s = () => t.querySelector("canvas.excalidraw__canvas.interactive") ?? t.querySelector("canvas");
    const o = t => {
      if (t.button !== 0) {
        return;
      }
      if ((e => {
        if (!(e instanceof Node)) {
          return false;
        }
        const t = e instanceof Element ? e : e.parentElement;
        return !!t && (!!t.closest(".react-pdf__Page__textContent") || !!t.closest("[data-testid=\"pdf-text-layer\"]"));
      })(t.target)) {
        return;
      }
      if (t.target instanceof Element && t.target.closest("button, [role=\"button\"]")) {
        return;
      }
      z.current = true;
      r = true;
      e.setPointerCapture(t.pointerId);
      const n = s();
      if (n) {
        n.dispatchEvent(new PointerEvent("pointerdown", {
          bubbles: true,
          cancelable: true,
          pointerId: t.pointerId,
          pointerType: t.pointerType,
          button: t.button,
          buttons: t.buttons,
          clientX: t.clientX,
          clientY: t.clientY,
          movementX: t.movementX,
          movementY: t.movementY,
          pressure: t.pressure,
          isPrimary: t.isPrimary
        }));
      }
    };
    const a = e => {
      if (!r) {
        return;
      }
      const t = s();
      if (t) {
        t.dispatchEvent(new PointerEvent("pointermove", {
          bubbles: true,
          cancelable: true,
          pointerId: e.pointerId,
          pointerType: e.pointerType,
          button: e.button,
          buttons: e.buttons,
          clientX: e.clientX,
          clientY: e.clientY,
          movementX: e.movementX,
          movementY: e.movementY,
          pressure: e.pressure,
          isPrimary: e.isPrimary
        }));
      }
    };
    const i = t => {
      if (!r) {
        return;
      }
      r = false;
      if (e.hasPointerCapture(t.pointerId)) {
        e.releasePointerCapture(t.pointerId);
      }
      const n = s();
      if (n) {
        n.dispatchEvent(new PointerEvent("pointerup", {
          bubbles: true,
          cancelable: true,
          pointerId: t.pointerId,
          pointerType: t.pointerType,
          button: t.button,
          buttons: t.buttons,
          clientX: t.clientX,
          clientY: t.clientY,
          movementX: t.movementX,
          movementY: t.movementY,
          pressure: t.pressure,
          isPrimary: t.isPrimary
        }));
      }
    };
    const l = () => {
      r = false;
    };
    e.addEventListener("pointerdown", o);
    e.addEventListener("pointermove", a);
    e.addEventListener("pointerup", i);
    e.addEventListener("pointercancel", i);
    e.addEventListener("lostpointercapture", l);
    return () => {
      e.removeEventListener("wheel", n);
      e.removeEventListener("pointerdown", o);
      e.removeEventListener("pointermove", a);
      e.removeEventListener("pointerup", i);
      e.removeEventListener("pointercancel", i);
      e.removeEventListener("lostpointercapture", l);
    };
  }, []);
  const Y = i.useCallback(e => {
    var t;
    const n = (t = h.current) == null ? undefined : t.querySelector("canvas");
    if (n) {
      n.dispatchEvent(new WheelEvent("wheel", {
        bubbles: true,
        cancelable: true,
        deltaX: e.deltaX,
        deltaY: e.deltaY,
        deltaMode: e.deltaMode,
        ctrlKey: e.ctrlKey,
        metaKey: e.metaKey,
        shiftKey: e.shiftKey,
        altKey: e.altKey,
        clientX: e.clientX,
        clientY: e.clientY
      }));
    }
  }, []);
  i.useEffect(() => {
    const e = h.current;
    if (!e) {
      return;
    }
    const t = e => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
      }
    };
    e.addEventListener("wheel", t, {
      passive: false
    });
    return () => e.removeEventListener("wheel", t);
  }, []);
  const X = i.useCallback(e => {
    var t;
    const n = h.current;
    if (!n || !e) {
      return;
    }
    const r = ((t = e.zoom) == null ? undefined : t.value) ?? 1;
    const s = typeof e.scrollX == "number" ? e.scrollX : 0;
    const o = typeof e.scrollY == "number" ? e.scrollY : 0;
    n.style.setProperty("--ws-bg-size", r * 28 + "px");
    n.style.setProperty("--ws-bg-x", s * r + "px");
    n.style.setProperty("--ws-bg-y", o * r + "px");
    n.style.setProperty("--ws-dot-r0", r * 0.55 + "px");
    n.style.setProperty("--ws-dot-r1", r * 1.7 + "px");
  }, []);
  const K = i.useCallback(e => {
    g.current = e;
    requestAnimationFrame(() => {
      var t;
      X(((t = e == null ? undefined : e.getAppState) == null ? undefined : t.call(e)) ?? null);
    });
  }, [X]);
  const Z = i.useCallback(e => {
    var t;
    const n = g.current;
    const r = x.current;
    if (!n || !r || F === 0) {
      return;
    }
    k.current = e;
    const {
      x: s,
      y: o,
      w: a,
      h: i
    } = e.normRect;
    const l = Math.max(0, Math.min(1, s));
    const d = Math.max(0, Math.min(1, o));
    const f = Math.max(0, Math.min(1 - l, a));
    const p = Math.max(0, Math.min(1 - d, i));
    const m = mn + l * D;
    const h = hn + d * F;
    const b = Math.max(f * D, 1);
    const v = Math.max(p * F, 4);
    const y = Math.max(v * 0.6, 28);
    const w = r.width ?? 1200;
    const S = r.height ?? 800;
    const _ = Math.max(w - Math.max(c, 0) - Math.max(u, 0), 1);
    const N = ((t = r.zoom) == null ? undefined : t.value) ?? 1;
    const C = typeof r.scrollX == "number" ? r.scrollX : 0;
    const M = typeof r.scrollY == "number" ? r.scrollY : 0;
    const I = 26 / v;
    const A = S * 0.85 / Math.max(v + y * 2, 1);
    const R = Math.max(I, A);
    const T = Math.max(I, Math.min(N, R));
    const E = Math.max(St, Math.min(3, T));
    const P = -C + Math.max(u, 0) / N;
    const $ = -M;
    const L = P + _ / N;
    const z = $ + S / N;
    const B = typeof r.offsetLeft == "number" ? r.offsetLeft : 0;
    const O = typeof r.offsetTop == "number" ? r.offsetTop : 0;
    if (m >= P && h >= $ && m + b <= L && h + v <= z && v * N >= 22.099999999999998) {
      const e = m + b / 2;
      const t = h + v / 2;
      const n = (Math.max(u, 0) + _ / 2 - B) / E - e;
      const r = (S / 2 - O) / E - t;
      const s = Math.abs(n - C);
      const o = Math.abs(r - M);
      const a = Math.max(s, o);
      if (Math.abs(E - N) < 0.04 && a < 24) {
        return;
      }
    }
    Ct(n, E, m + b / 2, h + v / 2, j ? 0 : 420, B, O, c, u);
  }, [D, F, j, c, u]);
  const G = i.useCallback((e, n) => {
    if (o != null) {
      o(e, n);
    }
    if (e === t) {
      E.current = e;
      C(e => {
        const t = new Map(e);
        for (const r of n) {
          t.set(r.id, r);
        }
        return t;
      });
      for (const e of n) {
        _.current.set(e.id, e);
      }
    }
    if (!l) {
      return;
    }
    if (e !== t) {
      return;
    }
    if (e !== l.pageIndex) {
      return;
    }
    if (B.current === "board-write") {
      return;
    }
    if (z.current) {
      return;
    }
    if (S.current === l.nonce) {
      return;
    }
    if (l.ids.length === 0) {
      S.current = l.nonce;
      k.current = null;
      const e = g.current;
      if (e) {
        Mt(e, mn, hn, D, F, j ? 0 : 500, 0.05, c, u);
      }
      return;
    }
    const r = l.ids[l.ids.length - 1];
    const s = n.find(e => e.id === r) ?? _.current.get(r);
    if (s && F !== 0) {
      S.current = l.nonce;
      Z(s);
    }
  }, [o, t, l, j, D, F, Z, c, u]);
  i.useEffect(() => {
    if (!l) {
      z.current = false;
      return;
    }
    if (S.current === l.nonce) {
      return;
    }
    if (B.current === "board-write") {
      return;
    }
    if (z.current) {
      return;
    }
    if (l.pageIndex !== t && l.pageIndex !== -1) {
      return;
    }
    if (l.ids.length === 0) {
      S.current = l.nonce;
      k.current = null;
      const e = g.current;
      if (e && F > 0) {
        Mt(e, mn, hn, D, F, j ? 0 : 500, 0.05, c, u);
      }
      return;
    }
    if (E.current !== t) {
      return;
    }
    const e = l.ids[l.ids.length - 1];
    const n = _.current.get(e);
    if (n && F !== 0) {
      S.current = l.nonce;
      Z(n);
    }
  }, [l == null ? undefined : l.nonce, t, D, F]);
  i.useEffect(() => {
    C(new Map());
    L(new Map());
    P.current.clear();
  }, [t]);
  const J = i.useCallback((e, t) => {
    var n;
    var r;
    x.current = t;
    X(t);
    const s = ((n = t == null ? undefined : t.zoom) == null ? undefined : n.value) ?? 1;
    if (s < St || s > 3) {
      const e = Math.max(St, Math.min(3, s));
      if ((r = g.current) != null) {
        r.updateScene({
          appState: {
            zoom: {
              value: e
            }
          }
        });
      }
      return;
    }
    if (f && s > 0 && y.current !== s) {
      y.current = s;
      f(s);
    }
    const o = function (e) {
      if (!e) {
        return null;
      }
      const t = e.zoom;
      if (t && typeof t.value == "number") {
        return {
          z: t.value,
          sx: typeof e.scrollX == "number" ? e.scrollX : 0,
          sy: typeof e.scrollY == "number" ? e.scrollY : 0,
          ol: typeof e.offsetLeft == "number" ? e.offsetLeft : 0,
          ot: typeof e.offsetTop == "number" ? e.offsetTop : 0
        };
      } else {
        return null;
      }
    }(t);
    var a;
    var i;
    if (o) {
      a = b.current;
      i = o;
      if (!a || !i || a.z !== i.z || a.sx !== i.sx || a.sy !== i.sy || a.ol !== i.ol || a.ot !== i.ot) {
        b.current = o;
        v(e => e + 1);
      }
    }
  }, [X, f]);
  const te = i.useCallback(() => {
    window.dispatchEvent(new CustomEvent("pdf:page-rendered"));
    const e = U.current;
    if (!e) {
      return;
    }
    const t = e.offsetHeight;
    if (t > 0) {
      O(t);
    }
  }, []);
  i.useEffect(() => {
    const e = U.current;
    if (!e || typeof ResizeObserver == "undefined") {
      return;
    }
    const t = new ResizeObserver(() => {
      const t = e.offsetHeight;
      if (t > 0) {
        O(t);
      }
    });
    t.observe(e);
    return () => t.disconnect();
  }, []);
  const ne = i.useCallback(() => {
    const e = g.current;
    if (e && F !== 0) {
      if (r === "board-write" && s.length > 0) {
        Mt(e, mn, hn, D + 380, F, 600, 0.06, c, u);
      } else {
        Mt(e, mn, hn, D, F, 500, 0.05, c, u);
      }
    }
  }, [r, s.length, D, F, c, u]);
  i.useEffect(() => {
    if (!p) {
      return;
    }
    const e = {
      zoomBy: e => {
        var t;
        const n = g.current;
        if (!n) {
          return;
        }
        const r = n.getAppState();
        const s = ((t = r == null ? undefined : r.zoom) == null ? undefined : t.value) > 0 ? r.zoom.value : 1;
        const o = w.current;
        const a = o && performance.now() - o.at < 350 ? o.value : s;
        const i = Math.max(St, Math.min(3, a * e));
        if (Math.abs(i - s) < 0.0001) {
          return;
        }
        w.current = {
          value: i,
          at: performance.now()
        };
        z.current = true;
        const l = r.width ?? 1200;
        const d = r.height ?? 800;
        const f = typeof r.offsetLeft == "number" ? r.offsetLeft : 0;
        const p = typeof r.offsetTop == "number" ? r.offsetTop : 0;
        const m = Math.max(l - Math.max(c, 0) - Math.max(u, 0), 1);
        const h = d / 2 - p;
        Ct(n, i, (Math.max(u, 0) + m / 2 - f) / s - (typeof r.scrollX == "number" ? r.scrollX : 0), h / s - (typeof r.scrollY == "number" ? r.scrollY : 0), j ? 0 : 180, f, p, c, u, 0);
      },
      resetZoom: () => {
        z.current = true;
        k.current = null;
        w.current = null;
        ne();
      }
    };
    p.current = e;
    return () => {
      if (p.current === e) {
        p.current = null;
      }
    };
  }, [p, ne, c, u, j]);
  i.useEffect(() => {
    k.current = null;
    ne();
  }, [r, s.length, D, F]);
  const re = i.useRef(() => {});
  i.useEffect(() => {
    re.current = () => {
      if (k.current) {
        Z(k.current);
      } else {
        ne();
      }
    };
  });
  i.useEffect(() => {
    re.current();
  }, [c, u]);
  i.useEffect(() => {
    const e = h.current;
    if (!e || typeof ResizeObserver == "undefined") {
      return;
    }
    let t = null;
    let n = e.clientWidth;
    let r = e.clientHeight;
    const s = new ResizeObserver(() => {
      const s = e.clientWidth;
      const o = e.clientHeight;
      if (s !== n || o !== r) {
        n = s;
        r = o;
        if (t !== null) {
          window.clearTimeout(t);
        }
        t = window.setTimeout(() => re.current(), 160);
      }
    });
    s.observe(e);
    return () => {
      if (t !== null) {
        window.clearTimeout(t);
      }
      s.disconnect();
    };
  }, []);
  i.useEffect(() => {
    const e = () => {
      const e = g.current;
      if (!e || F === 0) {
        return;
      }
      const t = s.length > 0 ? 380 : 0;
      Mt(e, mn, hn, D + t, F, 1, 0.05, c, u);
    };
    const t = () => {
      if (k.current) {
        Z(k.current);
      } else {
        ne();
      }
    };
    window.addEventListener("pdf:export-reset-camera", e);
    window.addEventListener("pdf:export-restore-camera", t);
    return () => {
      window.removeEventListener("pdf:export-reset-camera", e);
      window.removeEventListener("pdf:export-restore-camera", t);
    };
  }, [s.length, F, D, c, u, ne, Z]);
  const se = x.current;
  const oe = ((m = se == null ? undefined : se.zoom) == null ? undefined : m.value) ?? 1;
  const ae = se ? (() => {
    const e = Q({
      sceneX: mn,
      sceneY: hn
    }, se);
    return {
      x: e.x - (typeof se.offsetLeft == "number" ? se.offsetLeft : 0),
      y: e.y - (typeof se.offsetTop == "number" ? se.offsetTop : 0)
    };
  })() : {
    x: mn,
    y: hn
  };
  const ie = i.useCallback((e, t) => {
    if (t) {
      P.current.set(e, t);
    } else {
      P.current.delete(e);
    }
  }, []);
  i.useLayoutEffect(() => {
    const e = h.current;
    if (!e || s.length === 0) {
      L(new Map());
      return;
    }
    let t = 0;
    let n = "";
    const r = () => {
      const t = e.getBoundingClientRect();
      const r = new Map();
      for (const e of s) {
        const n = P.current.get(e.annId);
        if (!n) {
          continue;
        }
        const s = n.getBoundingClientRect();
        if (!(s.width <= 0) && !(s.height <= 0)) {
          r.set(e.annId, {
            x: s.left - t.left,
            y: s.top - t.top + s.height / 2
          });
        }
      }
      const o = Array.from(r.entries()).map(([e, t]) => `${e}:${Math.round(t.x)}:${Math.round(t.y)}`).join("|");
      if (o !== n) {
        n = o;
        L(r);
      }
    };
    const o = () => {
      if (t) {
        cancelAnimationFrame(t);
      }
      t = requestAnimationFrame(r);
    };
    o();
    const a = typeof ResizeObserver != "undefined" ? new ResizeObserver(o) : null;
    if (a != null) {
      a.observe(e);
    }
    P.current.forEach(e => a == null ? undefined : a.observe(e));
    return () => {
      if (t) {
        cancelAnimationFrame(t);
      }
      if (a != null) {
        a.disconnect();
      }
    };
  }, [s, ae.x, ae.y, oe]);
  const le = s.map(e => {
    const t = N.get(e.annId);
    const n = $.get(e.annId);
    if (!t || !n || F <= 0) {
      return null;
    }
    const {
      x: r,
      y: s,
      w: o,
      h: a
    } = t.normRect;
    const i = ((e, t) => {
      if (!se) {
        return {
          x: e,
          y: t
        };
      }
      const n = Q({
        sceneX: e,
        sceneY: t
      }, se);
      return {
        x: n.x - (typeof se.offsetLeft == "number" ? se.offsetLeft : 0),
        y: n.y - (typeof se.offsetTop == "number" ? se.offsetTop : 0)
      };
    })(mn + (r + o) * D, hn + (s + a / 2) * F);
    const l = Math.max(48, Math.abs(n.x - i.x) * 0.45);
    return {
      id: e.annId,
      start: i,
      end: n,
      path: `M ${i.x} ${i.y} C ${i.x + l} ${i.y}, ${n.x - l} ${n.y}, ${n.x} ${n.y}`
    };
  }).filter(e => e !== null);
  return d.jsxs("div", {
    ref: h,
    className: "w-full h-full relative excalidraw-pdf-host overflow-hidden",
    "data-export-root": true,
    children: [d.jsx("style", {
      children: "\n        /* Dot-grid backdrop lives on the host (not .sl-main) so it tracks the\n           Excalidraw scene: the --ws-* custom props are updated on pan/zoom by\n           applyBackgroundTransform, so the dots scale/pan with the content\n           instead of sitting in a fixed, detached layer (mirrors the whiteboard). */\n        .excalidraw-pdf-host {\n          background-color: #fcfcfc;\n          background-image: radial-gradient(\n            circle,\n            var(--ws-dot-color, #d4d4d4) var(--ws-dot-r0, 0.39px),\n            transparent var(--ws-dot-r1, 1.19px)\n          );\n          background-size: var(--ws-bg-size, 20px) var(--ws-bg-size, 20px);\n          background-position: var(--ws-bg-x, 0px) var(--ws-bg-y, 0px);\n        }\n        .excalidraw-pdf-host .excalidraw .layer-ui__wrapper__top-right,\n        .excalidraw-pdf-host .excalidraw .layer-ui__wrapper__footer,\n        .excalidraw-pdf-host .excalidraw .zen-mode-transition,\n        .excalidraw-pdf-host .excalidraw .mobile-misc-tools-container,\n        .excalidraw-pdf-host .excalidraw .App-menu,\n        .excalidraw-pdf-host .excalidraw .undo-redo-buttons,\n        .excalidraw-pdf-host .excalidraw .main-menu-trigger,\n        .excalidraw-pdf-host .excalidraw .HelpButton,\n        .excalidraw-pdf-host .excalidraw .welcome-screen-center,\n        .excalidraw-pdf-host .excalidraw .welcome-screen-menu-hintContainer {\n          display: none !important;\n        }\n        .excalidraw-pdf-host .excalidraw {\n          --ui-font: inherit;\n        }\n        .excalidraw-pdf-host .excalidraw .layer-ui__wrapper {\n          pointer-events: none !important;\n        }\n        .excalidraw-pdf-host .excalidraw {\n          touch-action: pan-y !important;\n        }\n        /* Pan/zoom passthrough arbitration (see PdfBoardCanvas.tsx useEffect):\n           - PDF overlay wrapper has pointer-events:auto so wheel events reach the native listener.\n           - Drag-to-pan: non-text pointerdown is forwarded to the Excalidraw canvas.\n           - Text selection: pointerdown on .react-pdf__Page__textContent is NOT forwarded.\n           - The PDF canvas bitmap is cursor:grab to hint that dragging pans.\n        */\n        .excalidraw-pdf-host .react-pdf__Page__canvas {\n          cursor: grab;\n        }\n        .excalidraw-pdf-host .react-pdf__Page__canvas:active {\n          cursor: grabbing;\n        }\n      "
    }), d.jsx(ee, {
      excalidrawAPI: K,
      onChange: J,
      viewModeEnabled: true,
      zenModeEnabled: true,
      UIOptions: bn,
      initialData: W
    }), d.jsxs("div", {
      className: "absolute inset-0",
      style: {
        pointerEvents: "none",
        zIndex: 10,
        overflow: "visible"
      },
      children: [le.length > 0 && d.jsx("svg", {
        className: "absolute inset-0",
        style: {
          width: "100%",
          height: "100%",
          overflow: "visible",
          zIndex: 12
        },
        "aria-hidden": "true",
        children: le.map(e => d.jsxs("g", {
          children: [d.jsx("path", {
            d: e.path,
            fill: "none",
            stroke: "rgba(245, 158, 11, 0.62)",
            strokeWidth: 2,
            strokeLinecap: "round"
          }), d.jsx("circle", {
            cx: e.start.x,
            cy: e.start.y,
            r: 3.5,
            fill: "#f59e0b"
          }), d.jsx("circle", {
            cx: e.end.x,
            cy: e.end.y,
            r: 3,
            fill: "#f59e0b",
            opacity: 0.78
          })]
        }, e.id))
      }), d.jsx("div", {
        ref: q,
        style: {
          position: "absolute",
          left: ae.x,
          top: ae.y,
          width: xn,
          minWidth: xn,
          flexShrink: 0,
          flex: "none",
          transform: `scale(${oe})`,
          transformOrigin: "top left",
          pointerEvents: "auto",
          touchAction: "none",
          boxShadow: "0 4px 24px rgba(0,0,0,0.13), 0 1px 6px rgba(0,0,0,0.08)",
          background: "#fff"
        },
        children: d.jsxs("div", {
          ref: U,
          style: {
            position: "relative",
            display: "block",
            width: xn,
            minWidth: xn
          },
          "data-page-index": t,
          children: [d.jsx(H, {
            pageNumber: e,
            width: xn,
            renderTextLayer: true,
            renderAnnotationLayer: false,
            onRenderSuccess: te,
            onLoadError: T
          }, `${e}-${M}`), d.jsx(jt, {
            pageIndex: t,
            annotations: n,
            pageContainerRef: U,
            onResolvedGeometry: G,
            onFailedAnnotations: a
          })]
        })
      }), s.length > 0 && (() => {
        const e = se ? (() => {
          const e = Q({
            sceneX: 900,
            sceneY: hn
          }, se);
          return {
            x: e.x - (typeof se.offsetLeft == "number" ? se.offsetLeft : 0),
            y: e.y - (typeof se.offsetTop == "number" ? se.offsetTop : 0)
          };
        })() : {
          x: 900,
          y: hn
        };
        return d.jsx("div", {
          style: {
            position: "absolute",
            left: e.x,
            top: e.y,
            transform: `scale(${oe})`,
            transformOrigin: "top left",
            pointerEvents: "none",
            width: gn,
            display: "flex",
            flexDirection: "column",
            gap: 16
          },
          onWheel: Y,
          children: s.map(e => {
            const t = e.blocks && e.blocks.length > 0 ? e.blocks : [...(e.content ? [{
              kind: "content",
              content: e.content
            }] : []), ...(e.mermaid ? [{
              kind: "graph",
              graph: e.mermaid
            }] : []), ...(e.imageStatus === "done" || e.imageStatus === "pending" ? [{
              kind: "image",
              prompt: "",
              caption: e.caption
            }] : [])];
            return d.jsxs("div", {
              ref: t => ie(e.annId, t),
              className: "flex flex-col gap-3",
              children: [t.length === 0 && e.note && d.jsx("div", {
                className: "px-3 py-2 rounded-lg bg-amber-50 border border-amber-200 text-sm text-amber-900",
                style: {
                  width: gn
                },
                children: e.note
              }), t.map((t, n) => {
                if (t.kind === "say") {
                  return null;
                }
                if (t.kind === "content") {
                  return d.jsx(en, {
                    keypoint: yn(e, t.content),
                    width: gn,
                    animate: !!e.animateReveal
                  }, `${e.annId}-content-${n}`);
                }
                if (t.kind === "graph") {
                  return d.jsx("div", {
                    className: "rounded-lg bg-white border border-gray-100 p-3 shadow-sm",
                    style: {
                      width: gn
                    },
                    children: d.jsx(fn, {
                      graphKey: `board-${e.annId}-${n}`,
                      source: t.graph
                    })
                  }, `${e.annId}-graph-${n}`);
                }
                if (t.kind === "image" && (e.imageStatus === "done" || e.imageStatus === "pending")) {
                  const r = t.caption ?? e.caption;
                  return d.jsxs("div", {
                    className: "w-full",
                    children: [e.imageStatus === "done" && e.imageUrl && d.jsx(pn, {
                      src: e.imageUrl,
                      width: gn
                    }), e.imageStatus === "pending" && d.jsx("div", {
                      className: "rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center",
                      style: {
                        width: gn,
                        height: gn
                      },
                      children: d.jsx("span", {
                        className: "text-xs text-gray-400",
                        children: "generating image..."
                      })
                    }), r && d.jsx("div", {
                      className: "text-center text-neutral-500",
                      style: {
                        fontSize: 13,
                        lineHeight: 1.35,
                        marginTop: 6
                      },
                      children: r
                    })]
                  }, `${e.annId}-image-${n}`);
                }
                return null;
              })]
            }, e.annId);
          })
        });
      })()]
    })]
  });
}
function kn({
  pageIndex: e,
  annotations: t,
  zoomPhase: n,
  boardNotes: r,
  onResolvedGeometry: s,
  onFailedAnnotations: o,
  focusRequest: a,
  rightInset: i,
  leftInset: l,
  onZoomChange: c,
  zoomControlRef: u
}) {
  return d.jsx(wn, {
    pageNumber: e + 1,
    pageIndex: e,
    annotations: t,
    zoomPhase: n,
    boardNotes: r,
    onResolvedGeometry: s,
    onFailedAnnotations: o,
    focusRequest: a,
    rightInset: i,
    leftInset: l,
    onZoomChange: c,
    zoomControlRef: u
  });
}
function jn({
  percent: e,
  canZoomIn: t,
  canZoomOut: n,
  onZoomIn: r,
  onZoomOut: s,
  onFit: o
}) {
  const {
    t: i
  } = a();
  return d.jsxs("div", {
    className: "sl-zoom-pill",
    role: "group",
    "aria-label": i("courseSession.zoomLevel", {
      percent: e
    }),
    children: [d.jsx("button", {
      type: "button",
      className: "sl-zoom-btn",
      title: i("courseSession.zoomOut"),
      "aria-label": i("courseSession.zoomOut"),
      disabled: !n,
      onClick: s,
      children: d.jsx(w, {
        size: 14,
        strokeWidth: 2.25
      })
    }), d.jsxs("button", {
      type: "button",
      className: "sl-zoom-readout",
      title: i("courseSession.zoomFitPage"),
      "aria-label": i("courseSession.zoomFitPage"),
      onClick: o,
      children: [e, "%"]
    }), d.jsx("button", {
      type: "button",
      className: "sl-zoom-btn",
      title: i("courseSession.zoomIn"),
      "aria-label": i("courseSession.zoomIn"),
      disabled: !t,
      onClick: r,
      children: d.jsx(ue, {
        size: 14,
        strokeWidth: 2.25
      })
    })]
  });
}
q.workerSrc = new URL("/assets/mjs/pdf.worker.min-qwK7q_zL.mjs", import.meta.url).toString();
const Sn = [0.22, 1, 0.36, 1];
const _n = [800, 2500, 6000];
function Nn({
  fileId: e,
  sessionId: t,
  loading: s = false,
  allowUpload: o = true,
  annotations: l,
  onUploaded: c,
  onResolvedGeometry: u,
  onExportBoardCurrentPage: p,
  onExportBoardAllPages: m,
  isExportingBoard: h,
  zoomPhase: g = "full-page",
  activeBoardPage: x = 0,
  pageBoardNotes: b,
  focusRequest: v,
  onNumPages: y,
  onCloseBoardPanel: w,
  autoFocusEnabled: k = true,
  onToggleAutoFocus: j,
  rightInset: S = 0,
  leftInset: _ = 0,
  onOpenVoiceSettings: N,
  ttsVoiceId: C = "firm",
  ttsSpeed: M = 1,
  networkCheckSlot: I
}) {
  const {
    t: A
  } = a();
  const [R, T] = i.useState(0);
  const [E, P] = i.useState(null);
  const [$, L] = i.useState(null);
  const [z, B] = i.useState(false);
  const [D, F] = i.useState(1);
  const O = i.useRef(null);
  const [U, H] = i.useState(0);
  const [q, Y] = i.useState(false);
  const X = i.useRef(null);
  const G = i.useRef(0);
  const V = i.useRef(null);
  const [J, Q] = i.useState(new Map());
  const ee = i.useRef(new Map());
  const te = i.useRef(new Map());
  const ne = i.useRef(null);
  const re = i.useRef("");
  const se = i.useRef(l);
  i.useEffect(() => {
    se.current = l;
  }, [l]);
  const oe = i.useRef(R);
  i.useEffect(() => {
    oe.current = R;
  }, [R]);
  const ae = i.useRef(x);
  i.useEffect(() => {
    ae.current = x;
  }, [x]);
  const ie = i.useCallback((e, t) => {
    let n = false;
    for (const r of t) {
      if (!te.current.has(r)) {
        const t = se.current.get(e);
        const s = t == null ? undefined : t.find(e => e.id === r);
        if (s) {
          te.current.set(r, s);
          n = true;
        }
      }
    }
    if (n) {
      if (ne.current !== null) {
        window.clearTimeout(ne.current);
      }
      ne.current = window.setTimeout(() => {
        const e = V.current;
        if (!e) {
          return;
        }
        const t = oe.current;
        const n = ae.current;
        const r = Array.from(te.current.values());
        if (r.length === 0) {
          return;
        }
        const s = r.filter(e => {
          const t = Math.abs(e.pageIndex - n);
          return t > 0 && t <= 2;
        });
        if (s.length === 0) {
          return;
        }
        const o = s.map(e => e.id).sort().join(",") + ":" + n + ":" + t;
        if (o === re.current) {
          return;
        }
        re.current = o;
        const a = new Map(ee.current);
        let i = false;
        for (const l of s) {
          if (a.has(l.id)) {
            continue;
          }
          const t = e.querySelector(`[data-page-index="${n}"]`);
          if (!t) {
            continue;
          }
          const r = kt(t, l.keyword ?? l.text, l.rect, l.anchor_start, l.anchor_end, l.include);
          if (r && r.length > 0) {
            a.set(l.id, n);
            i = true;
          }
        }
        if (i) {
          ee.current = a;
          Q(new Map(a));
        }
      }, 400);
    }
  }, []);
  i.useEffect(() => {
    if (!V.current || te.current.size === 0) {
      return;
    }
    const e = Array.from(te.current.values()).filter(e => {
      const t = Math.abs(e.pageIndex - x);
      return t > 0 && t <= 2 && !ee.current.has(e.id);
    });
    if (e.length !== 0) {
      if (ne.current !== null) {
        window.clearTimeout(ne.current);
      }
      ne.current = window.setTimeout(() => {
        const t = V.current;
        if (!t) {
          return;
        }
        const n = new Map(ee.current);
        let r = false;
        for (const s of e) {
          if (n.has(s.id)) {
            continue;
          }
          const e = t.querySelector(`[data-page-index="${x}"]`);
          if (!e) {
            continue;
          }
          const o = kt(e, s.keyword ?? s.text, s.rect, s.anchor_start, s.anchor_end, s.include);
          if (o && o.length > 0) {
            n.set(s.id, x);
            r = true;
          }
        }
        if (r) {
          ee.current = n;
          Q(new Map(n));
        }
      }, 600);
    }
  }, [x]);
  i.useEffect(() => {
    te.current = new Map();
    ee.current = new Map();
    re.current = "";
    Q(new Map());
  }, [e]);
  const le = i.useCallback(e => {
    const t = l.get(e) ?? [];
    if (J.size === 0) {
      return t;
    }
    const n = t.filter(t => {
      const n = J.get(t.id);
      return n === undefined || n === e;
    });
    const r = [];
    for (const [s, o] of J) {
      if (o !== e) {
        continue;
      }
      const t = te.current.get(s);
      if (t) {
        if (!n.some(e => e.id === s)) {
          r.push({
            ...t,
            pageIndex: e
          });
        }
      }
    }
    if (r.length > 0) {
      return [...n, ...r];
    } else {
      return n;
    }
  }, [l, J]);
  i.useEffect(() => {
    H(0);
    Y(false);
    L(null);
    G.current = 0;
    if (X.current !== null) {
      window.clearTimeout(X.current);
      X.current = null;
    }
  }, [e, t]);
  i.useEffect(() => () => {
    if (X.current !== null) {
      window.clearTimeout(X.current);
    }
  }, []);
  i.useEffect(() => {
    if (!e) {
      P(null);
      T(0);
      return;
    }
    const s = t ?? localStorage.getItem("pdf_session_id");
    const o = n();
    const a = r(`/api/v1/pdf-annotation/pdf/${s}/${e}`);
    const i = new URLSearchParams();
    if (o) {
      i.set("access_token", o);
    }
    if (U > 0) {
      i.set("_retry", String(U));
    }
    const l = i.toString();
    P(l ? `${a}?${l}` : a);
    L(null);
  }, [e, t, U]);
  const ue = i.useMemo(() => ({
    disableAutoFetch: true,
    disableStream: false,
    rangeChunkSize: 262144
  }), []);
  const de = i.useCallback(({
    numPages: e
  }) => {
    T(e);
    if (y != null) {
      y(e);
    }
    G.current = 0;
    Y(false);
    L(null);
  }, [y]);
  const me = i.useCallback(e => {
    const t = G.current;
    if (t >= 3) {
      Y(false);
      L(e.message);
      return;
    }
    G.current = t + 1;
    Y(true);
    L(null);
    if (X.current !== null) {
      window.clearTimeout(X.current);
    }
    X.current = window.setTimeout(() => {
      X.current = null;
      H(e => e + 1);
    }, _n[Math.min(t, _n.length - 1)]);
  }, []);
  const he = i.useCallback(() => {
    if (X.current !== null) {
      window.clearTimeout(X.current);
      X.current = null;
    }
    G.current = 0;
    L(null);
    Y(true);
    H(e => e + 1);
  }, []);
  if (!e || !E) {
    if (s || !o || e) {
      return d.jsx("div", {
        className: "sl-pdf-loading-shell",
        role: "status",
        "aria-label": A("courseSession.preparing"),
        children: d.jsxs("div", {
          className: "sl-pdf-loading-card",
          children: [d.jsx("span", {
            className: "sl-skeleton-block sl-pdf-loading-title"
          }), d.jsx("span", {
            className: "sl-skeleton-block sl-pdf-loading-line"
          }), d.jsx("span", {
            className: "sl-skeleton-block sl-pdf-loading-line sl-pdf-loading-line-short"
          }), d.jsx("span", {
            className: "sl-skeleton-block sl-pdf-loading-page"
          })]
        })
      });
    } else {
      return d.jsx("div", {
        className: "flex items-center justify-center w-full h-full bg-muted/20 p-8",
        children: d.jsx("div", {
          className: "w-full max-w-sm",
          children: d.jsx(at, {
            onUploaded: c,
            sessionId: t
          })
        })
      });
    }
  }
  const ge = (b == null ? undefined : b.get(x)) ?? [];
  return d.jsxs("div", {
    className: "w-full h-full relative overflow-hidden",
    children: [q && !$ && d.jsx("div", {
      className: "absolute top-2 left-1/2 -translate-x-1/2 z-30 p-3 bg-muted text-muted-foreground text-sm rounded-lg max-w-xl w-full mx-4 text-center",
      children: A("pdfAnnotation.pdf.retrying")
    }), $ && d.jsxs("div", {
      className: "absolute top-2 left-1/2 -translate-x-1/2 z-30 p-3 bg-destructive/10 text-destructive text-sm rounded-lg max-w-xl w-full mx-4 flex items-center justify-between gap-3",
      children: [d.jsx("span", {
        children: A("pdfAnnotation.pdf.loadFailed", {
          error: $
        })
      }), d.jsx("button", {
        type: "button",
        onClick: he,
        className: "shrink-0 px-2 py-1 rounded-md border border-destructive/40 hover:bg-destructive/10 transition-colors",
        children: A("pdfAnnotation.pdf.retry")
      })]
    }), d.jsxs("div", {
      className: "absolute z-20 flex items-center gap-2",
      style: {
        top: 28,
        right: S > 0 ? S + 12 : 36,
        height: 36,
        transition: "right 0.25s cubic-bezier(0.4, 0, 0.2, 1)"
      },
      children: [d.jsx(jn, {
        percent: Math.round(D * 100),
        canZoomIn: D < 2.999,
        canZoomOut: D > 0.251,
        onZoomIn: () => {
          var e;
          if ((e = O.current) == null) {
            return undefined;
          } else {
            return e.zoomBy(1.25);
          }
        },
        onZoomOut: () => {
          var e;
          if ((e = O.current) == null) {
            return undefined;
          } else {
            return e.zoomBy(0.8);
          }
        },
        onFit: () => {
          var e;
          if ((e = O.current) == null) {
            return undefined;
          } else {
            return e.resetZoom();
          }
        }
      }), g === "board-write" && d.jsx("button", {
        type: "button",
        onClick: () => w == null ? undefined : w(),
        className: "sl-icon-btn",
        title: A("pdfAnnotation.pdf.backToFullPage"),
        "aria-label": A("pdfAnnotation.pdf.backToFullPage"),
        children: d.jsx(fe, {
          size: 16
        })
      }), j && d.jsx("button", {
        type: "button",
        onClick: j,
        className: "sl-icon-btn",
        "data-active": k ? "true" : "false",
        "aria-pressed": k,
        title: A(k ? "pdfAnnotation.pdf.disableAutoFocus" : "pdfAnnotation.pdf.enableAutoFocus"),
        "aria-label": A(k ? "pdfAnnotation.pdf.disableAutoFocus" : "pdfAnnotation.pdf.enableAutoFocus"),
        children: d.jsx(we, {
          size: 16
        })
      }), N && d.jsxs("button", {
        type: "button",
        className: "sl-icon-btn sl-tts-btn",
        onClick: N,
        title: A("tts.clickToAdjust"),
        "aria-label": `${A("tts.title")}: ${A(`tts.voice.${C}`)} ${K(M)}`,
        children: [d.jsx(Z, {
          size: 16
        }), d.jsxs("span", {
          className: "sl-tts-btn-label",
          children: [A(`tts.voice.${C}`), " · ", K(M)]
        })]
      }), I, (p || m) && d.jsxs("div", {
        className: "sl-export-menu-wrap",
        children: [d.jsx("button", {
          type: "button",
          className: "sl-icon-btn",
          "data-active": z ? "true" : "false",
          disabled: h,
          title: A("courseSession.exportBoard"),
          "aria-label": A("courseSession.exportBoard"),
          onClick: () => B(e => !e),
          children: d.jsx(pe, {
            size: 16
          })
        }), z && d.jsxs(d.Fragment, {
          children: [d.jsx("div", {
            className: "sl-export-menu-backdrop",
            onClick: () => B(false)
          }), d.jsxs("div", {
            className: "sl-export-menu",
            role: "menu",
            children: [p && d.jsxs(d.Fragment, {
              children: [d.jsx("p", {
                className: "sl-export-menu-title",
                children: A("courseSession.exportCurrentPage")
              }), d.jsx("button", {
                type: "button",
                role: "menuitem",
                onClick: () => {
                  B(false);
                  p("jpg");
                },
                children: "JPG"
              }), d.jsx("button", {
                type: "button",
                role: "menuitem",
                onClick: () => {
                  B(false);
                  p("pdf");
                },
                children: "PDF"
              })]
            }), m && d.jsxs(d.Fragment, {
              children: [d.jsx("p", {
                className: "sl-export-menu-title",
                children: A("courseSession.exportTaughtPages")
              }), d.jsx("button", {
                type: "button",
                role: "menuitem",
                onClick: () => {
                  B(false);
                  m("jpg");
                },
                children: "JPG"
              }), d.jsx("button", {
                type: "button",
                role: "menuitem",
                onClick: () => {
                  B(false);
                  m("pdf");
                },
                children: "PDF"
              })]
            })]
          })]
        })]
      })]
    }), h && d.jsx("div", {
      className: "sl-export-progress-overlay",
      role: "status",
      "aria-live": "polite",
      children: A("courseSession.exporting")
    }), d.jsx(W, {
      file: E,
      options: ue,
      onLoadSuccess: de,
      onLoadError: me,
      loading: d.jsx("div", {
        className: "flex items-center justify-center w-full h-full text-muted-foreground text-sm",
        children: A("pdfAnnotation.pdf.loadingDocument")
      }),
      error: d.jsx("div", {
        className: "flex items-center justify-center w-full h-full text-muted-foreground text-sm",
        children: q ? A("pdfAnnotation.pdf.loadingDocument") : ""
      }),
      children: d.jsx("div", {
        ref: V,
        className: "w-full h-full",
        children: d.jsx(ce, {
          mode: "wait",
          children: d.jsx(f.div, {
            initial: {
              opacity: 0
            },
            animate: {
              opacity: 1
            },
            exit: {
              opacity: 0
            },
            transition: {
              duration: 0.25,
              ease: Sn
            },
            className: "w-full h-full",
            style: {
              position: "absolute",
              inset: 0
            },
            children: d.jsx(kn, {
              pageIndex: x,
              annotations: le(x),
              zoomPhase: g,
              boardNotes: ge,
              onResolvedGeometry: u,
              onFailedAnnotations: ie,
              focusRequest: v,
              rightInset: S,
              leftInset: _,
              onZoomChange: F,
              zoomControlRef: O
            })
          }, x)
        })
      })
    })]
  });
}
const Cn = {
  highlight: {
    Icon: me,
    labelKey: "pdfAnnotation.annotation.highlight"
  },
  circle: {
    Icon: te,
    labelKey: "pdfAnnotation.annotation.circle"
  },
  annotate: {
    Icon: _e,
    labelKey: "pdfAnnotation.annotation.annotate"
  }
};
function Mn({
  block: e
}) {
  var t;
  var n;
  var r;
  var s;
  const {
    t: o
  } = a();
  const [l, c] = i.useState(false);
  const u = Cn[e.annotationType] ?? Cn.annotate;
  const {
    Icon: f
  } = u;
  const m = o("pdfAnnotation.annotation.pageAbbrev", {
    page: e.pageIndex + 1
  });
  const h = !!((t = e.text) == null ? undefined : t.trim());
  const g = !!((n = e.note) == null ? undefined : n.trim());
  const x = !!((r = e.content) == null ? undefined : r.trim());
  const b = !!((s = e.mermaid) == null ? undefined : s.trim());
  const v = h || g || x || b;
  return d.jsxs("div", {
    className: "mb-row-tight",
    children: [d.jsxs("button", {
      type: "button",
      onClick: () => v && c(e => !e),
      className: "mb-action-toggle" + (l ? " mb-action-toggle--open" : ""),
      style: {
        cursor: v ? "pointer" : "default"
      },
      children: [d.jsx(f, {
        size: 12,
        className: "mb-action-ico"
      }), d.jsxs("span", {
        className: "mb-action-label",
        children: [o(u.labelKey), " · ", m]
      }), v && (l ? d.jsx(ne, {
        size: 11,
        className: "mb-chevron"
      }) : d.jsx(re, {
        size: 11,
        className: "mb-chevron"
      }))]
    }), l && v && d.jsxs("div", {
      className: "mb-action-detail",
      children: [h && d.jsxs("div", {
        className: "mb-detail-quote",
        children: ["“", d.jsx(p, {
          remarkPlugins: st,
          rehypePlugins: ot,
          children: Ze(e.text || "")
        }), "”"]
      }), g && d.jsx("div", {
        className: "mb-detail-note",
        style: {
          marginTop: h ? 4 : 0
        },
        children: d.jsx(p, {
          remarkPlugins: st,
          rehypePlugins: ot,
          children: Ze(e.note || "")
        })
      }), x && d.jsx("div", {
        className: "mb-detail-board",
        style: {
          marginTop: h || g ? 4 : 0
        },
        children: d.jsx(p, {
          remarkPlugins: st,
          rehypePlugins: ot,
          children: Ze(e.content || "")
        })
      }), b && d.jsx("pre", {
        className: "mb-detail-pre",
        style: {
          marginTop: h || g || x ? 4 : 0
        },
        children: e.mermaid
      })]
    })]
  });
}
function In({
  block: e
}) {
  const {
    t: t
  } = a();
  const [n, r] = i.useState(false);
  const s = e.mode === "choice" ? t("pdfAnnotation.ask.quickCheck") : t("pdfAnnotation.ask.yourTurn");
  const o = [];
  if (e.question) {
    o.push(e.question);
  }
  if (e.mode === "choice") {
    o.push(e.options.map((e, t) => `${t + 1}. ${e}`).join("\n"));
  }
  const l = o.join("\n\n");
  const c = !!l.trim();
  return d.jsxs("div", {
    className: "mb-row-tight",
    children: [d.jsxs("button", {
      type: "button",
      onClick: () => c && r(e => !e),
      className: "mb-action-toggle" + (n ? " mb-action-toggle--open" : ""),
      style: {
        cursor: c ? "pointer" : "default"
      },
      children: [d.jsx(se, {
        size: 12,
        className: "mb-action-ico"
      }), d.jsx("span", {
        className: "mb-action-label",
        children: s
      }), c && (n ? d.jsx(ne, {
        size: 11,
        className: "mb-chevron"
      }) : d.jsx(re, {
        size: 11,
        className: "mb-chevron"
      }))]
    }), n && c && d.jsx("div", {
      className: "mb-action-detail",
      children: d.jsx("div", {
        className: "mb-detail-note",
        children: d.jsx(p, {
          remarkPlugins: st,
          rehypePlugins: ot,
          children: Ze(l)
        })
      })
    })]
  });
}
function An({
  blocks: e
}) {
  return d.jsx("div", {
    className: "space-y-1",
    children: e.map(e => e.kind === "speak" ? d.jsx("div", {
      className: "mb-assistant-text",
      children: d.jsx(p, {
        remarkPlugins: st,
        rehypePlugins: ot,
        children: Ze(e.text || "")
      })
    }, e.id) : e.kind === "annotation" ? d.jsxs("div", {
      className: "space-y-0.5",
      children: [d.jsx(Mn, {
        block: e
      }), e.say && d.jsx("div", {
        className: "mb-assistant-text",
        children: d.jsx(p, {
          remarkPlugins: st,
          rehypePlugins: ot,
          children: Ze(e.say)
        })
      })]
    }, e.id) : e.kind === "ask" ? d.jsx(In, {
      block: e
    }, e.id) : null)
  });
}
function Rn({
  item: e
}) {
  const {
    t: t
  } = a();
  if (e.type === "user") {
    const n = e.attachments ?? [];
    const r = e.content.startsWith("🎤");
    return d.jsxs("div", {
      className: "mb-user-row",
      children: [n.length > 0 && d.jsx("div", {
        className: "mb-user-attachments",
        children: n.map(e => d.jsx(En, {
          attachment: e
        }, e.fileId))
      }), r ? d.jsxs("div", {
        className: "mb-user-bubble mb-user-transcribing",
        role: "status",
        "aria-live": "polite",
        children: [d.jsxs("span", {
          className: "mb-transcribing-skeleton",
          "aria-hidden": "true",
          children: [d.jsx("span", {
            className: "mb-transcribing-line"
          }), d.jsx("span", {
            className: "mb-transcribing-line"
          })]
        }), d.jsx("span", {
          className: "mb-transcribing-text",
          children: t("pdfAnnotation.message.transcribing")
        })]
      }) : e.content && d.jsx("div", {
        className: "mb-user-bubble",
        children: e.content
      }), e.content && !r && d.jsx("div", {
        className: "mb-user-actions",
        children: d.jsx(Tn, {
          text: e.content
        })
      })]
    });
  }
  if (e.type === "status") {
    const t = /error/i.test(e.content);
    return d.jsxs("div", {
      className: "mb-chip-row" + (t ? " mb-chip-row--error" : ""),
      children: [d.jsx(O, {
        size: 11,
        className: "mb-ico"
      }), d.jsx("span", {
        children: e.content
      })]
    });
  }
  if (e.type === "assistant_timeline") {
    const t = e.blocks.map(e => e.kind === "speak" ? e.text : e.kind === "annotation" ? e.say : undefined).filter(e => !!(e == null ? undefined : e.trim())).join("\n\n");
    return d.jsxs("div", {
      className: "mb-assistant",
      children: [d.jsx(An, {
        blocks: e.blocks,
        isStreaming: e.isStreaming
      }), !e.isStreaming && !!t && d.jsx("div", {
        className: "mb-assistant-actions",
        children: d.jsx(Tn, {
          text: t
        })
      })]
    });
  }
  return null;
}
function Tn({
  text: e
}) {
  const {
    t: t
  } = a();
  const [n, r] = i.useState(false);
  i.useEffect(() => {
    if (!n) {
      return;
    }
    const e = window.setTimeout(() => r(false), 2000);
    return () => window.clearTimeout(e);
  }, [n]);
  const s = t(n ? "pdfAnnotation.message.copied" : "pdfAnnotation.message.copy");
  return d.jsx("div", {
    className: "mb-copy-slot",
    children: d.jsx("span", {
      className: "mb-copy-slot-inner",
      children: d.jsx("button", {
        type: "button",
        onClick: () => {
          navigator.clipboard.writeText(e).then(() => r(true)).catch(() => {});
        },
        className: "mb-copy-btn",
        title: s,
        "aria-label": s,
        children: n ? d.jsx(he, {
          size: 12
        }) : d.jsx(U, {
          size: 12
        })
      })
    })
  });
}
function En({
  attachment: e
}) {
  const [t, s] = i.useState(e.previewUrl ?? null);
  i.useEffect(() => {
    if (e.previewUrl) {
      s(e.previewUrl);
      return;
    }
    let t = null;
    let o = false;
    const a = n();
    if (a) {
      fetch(`${r("/api/v1/citation/files")}/${encodeURIComponent(e.fileId)}`, {
        headers: {
          Authorization: `Bearer ${a}`
        }
      }).then(e => e.ok ? e.blob() : Promise.reject(new Error(`HTTP ${e.status}`))).then(e => {
        if (!o) {
          t = URL.createObjectURL(e);
          s(t);
        }
      }).catch(() => {});
      return () => {
        o = true;
        if (t) {
          URL.revokeObjectURL(t);
        }
      };
    } else {
      return undefined;
    }
  }, [e.fileId, e.previewUrl]);
  if (t) {
    return d.jsx("img", {
      className: "mb-user-attachment",
      src: t,
      alt: e.filename,
      title: e.filename
    });
  } else {
    return null;
  }
}
function Pn({
  currentPage: e,
  totalPages: t,
  onPageChange: n,
  onNavigateBackend: r,
  disabled: s,
  coverageRange: o
}) {
  const {
    t: i
  } = a();
  if (t <= 1) {
    return null;
  }
  const l = e > 0;
  const c = e < t - 1;
  const u = e => {
    n(e);
    if (r != null) {
      r(e);
    }
  };
  const p = o && o.end >= o.start ? o : null;
  const m = !!p && (p.start > 0 || p.end < t - 1);
  const h = m && p != null && (e < p.start || e > p.end);
  return d.jsxs(f.div, {
    initial: {
      opacity: 0,
      y: 8
    },
    animate: {
      opacity: 1,
      y: 0
    },
    transition: {
      duration: 0.3
    },
    className: "pnav-pill",
    children: [d.jsx("button", {
      type: "button",
      onClick: () => l && u(e - 1),
      disabled: !l || s,
      className: "pnav-arrow-btn",
      "aria-label": "Previous page",
      children: d.jsx(k, {
        className: "w-3 h-3"
      })
    }), d.jsxs("div", {
      className: "pnav-readout",
      children: [d.jsxs("span", {
        className: "pnav-page-count",
        children: [e + 1, " / ", t]
      }), m && p && d.jsxs("div", {
        className: "pnav-coverage-track",
        title: h ? i("pdfAnnotation.layout.outsideLessonRange") : undefined,
        children: [d.jsx("div", {
          className: "pnav-coverage-range",
          style: {
            left: p.start / t * 100 + "%",
            width: (p.end - p.start + 1) / t * 100 + "%"
          }
        }), d.jsx("div", {
          className: "pnav-coverage-dot" + (h ? " pnav-coverage-dot--outside" : ""),
          style: {
            left: (e + 0.5) / t * 100 + "%"
          }
        })]
      })]
    }), d.jsx("button", {
      type: "button",
      onClick: () => c && u(e + 1),
      disabled: !c || s,
      className: "pnav-arrow-btn",
      "aria-label": "Next page",
      children: d.jsx(re, {
        className: "w-3 h-3"
      })
    })]
  });
}
function $n(e, t) {
  if (!e) {
    return "";
  }
  try {
    const n = Date.now() - new Date(e).getTime();
    const r = Math.floor(n / 1000);
    if (r < 60) {
      return t("pdfAnnotation.sessionPicker.justNow");
    }
    const s = Math.floor(r / 60);
    if (s < 60) {
      return t("pdfAnnotation.sessionPicker.minutesAgo", {
        count: s
      });
    }
    const o = Math.floor(s / 60);
    if (o < 24) {
      return t("pdfAnnotation.sessionPicker.hoursAgo", {
        count: o
      });
    }
    return t("pdfAnnotation.sessionPicker.daysAgo", {
      count: Math.floor(o / 24)
    });
  } catch {
    return "";
  }
}
function Ln({
  onClose: e,
  onResumeSession: t,
  currentSessionId: n
}) {
  const {
    t: o
  } = a();
  const [l, c] = i.useState([]);
  const [u, f] = i.useState(true);
  const [p, m] = i.useState(null);
  i.useEffect(() => {
    let e = false;
    f(true);
    m(null);
    (async function () {
      const e = await fetch(r(`${Me}/sessions`), {
        headers: Ce()
      });
      if (!e.ok) {
        throw new Error(s.t("pdfAnnotation.session.listSessionsFailed", {
          status: e.status
        }));
      }
      return (await e.json()).sessions ?? [];
    })().then(t => {
      if (!e) {
        c(t);
      }
    }).catch(t => {
      if (!e) {
        m(String(t));
      }
    }).finally(() => {
      if (!e) {
        f(false);
      }
    });
    return () => {
      e = true;
    };
  }, []);
  const h = i.useCallback(n => {
    t(n);
    e();
  }, [t, e]);
  i.useEffect(() => {
    const t = t => {
      if (t.key === "Escape") {
        e();
      }
    };
    document.addEventListener("keydown", t);
    return () => document.removeEventListener("keydown", t);
  }, [e]);
  return d.jsx("div", {
    className: "session-picker-overlay fixed inset-0 z-50 flex items-center justify-center bg-black/40",
    onClick: t => {
      if (t.target === t.currentTarget) {
        e();
      }
    },
    children: d.jsxs("div", {
      className: "relative bg-card rounded-xl shadow-2xl border border-border w-full max-w-md mx-4 flex flex-col",
      style: {
        maxHeight: "80vh"
      },
      children: [d.jsxs("div", {
        className: "flex items-center justify-between px-5 py-4 border-b border-border shrink-0",
        children: [d.jsxs("h2", {
          className: "text-sm font-semibold text-foreground flex items-center gap-2",
          children: [d.jsx(ye, {
            className: "w-4 h-4 text-muted-foreground"
          }), o("pdfAnnotation.sessionPicker.title")]
        }), d.jsx("button", {
          type: "button",
          onClick: e,
          className: "rounded-md p-1 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors",
          "aria-label": "Close",
          children: d.jsx(ge, {
            className: "w-4 h-4"
          })
        })]
      }), d.jsxs("div", {
        className: "flex-1 overflow-y-auto px-3 py-2",
        children: [u && d.jsxs("div", {
          className: "flex items-center justify-center py-12 text-muted-foreground gap-2",
          children: [d.jsx(Y, {
            className: "w-4 h-4 animate-spin"
          }), d.jsx("span", {
            className: "text-sm",
            children: o("pdfAnnotation.sessionPicker.loading")
          })]
        }), !u && p && d.jsx("div", {
          className: "py-8 text-center text-sm text-destructive",
          children: o("pdfAnnotation.sessionPicker.loadFailed", {
            error: p
          })
        }), !u && !p && l.length === 0 && d.jsx("div", {
          className: "py-8 text-center text-sm text-muted-foreground",
          children: o("pdfAnnotation.sessionPicker.empty")
        }), !u && !p && l.map(e => {
          const t = e.session_id === n;
          return d.jsxs("button", {
            type: "button",
            onClick: () => h(e.session_id),
            className: "w-full text-left rounded-lg px-3 py-2.5 mb-1 transition-colors group\n                  " + (t ? "bg-primary/8 border border-primary/20 hover:bg-primary/12" : "hover:bg-muted"),
            children: [d.jsxs("div", {
              className: "flex items-start justify-between gap-2",
              children: [d.jsxs("p", {
                className: "text-sm font-medium leading-snug truncate\n                    " + (t ? "text-primary" : "text-foreground"),
                children: [e.title || o("pdfAnnotation.sessionPicker.untitled"), t && d.jsx("span", {
                  className: "ml-2 text-[10px] font-normal text-primary/70 uppercase tracking-wide",
                  children: o("pdfAnnotation.sessionPicker.currentBadge")
                })]
              }), d.jsx("span", {
                className: "shrink-0 text-[11px] text-muted-foreground mt-0.5",
                children: $n(e.updated_at, o)
              })]
            }), e.preview && e.preview !== e.title && d.jsx("p", {
              className: "text-xs text-muted-foreground truncate mt-0.5 leading-relaxed",
              children: e.preview
            }), d.jsxs("p", {
              className: "text-[10px] font-mono text-muted-foreground/60 mt-1 truncate",
              children: [e.session_id.slice(0, 16), "…"]
            })]
          }, e.session_id);
        })]
      })]
    })
  });
}
function zn(e) {
  return e.replace(/[\s\p{P}\p{S}]/gu, "").toLowerCase();
}
function Bn({
  ask: e,
  result: t,
  disabled: n,
  captionText: r,
  onPick: s
}) {
  var o;
  const {
    t: l
  } = a();
  const c = ((o = e.question) == null ? undefined : o.trim()) ?? "";
  const u = zn(c);
  const f = i.useRef(null);
  if (u.length >= 6 && zn(r).includes(u)) {
    f.current = u;
  }
  const m = !!c && f.current !== u;
  const h = t != null;
  const g = (t == null ? undefined : t.correct) === false;
  return d.jsxs("div", {
    className: `sl-ask${h ? " sl-ask--resolved" : ""}${e.restored ? " sl-ask--restored" : ""}`,
    role: "group",
    "aria-label": l("pdfAnnotation.ask.chooseAnswer"),
    children: [m && d.jsx("div", {
      className: "sl-ask-question",
      children: d.jsx(p, {
        remarkPlugins: st,
        rehypePlugins: ot,
        children: Ze(c)
      })
    }), d.jsx("div", {
      className: "sl-ask-options",
      children: e.options.map((e, r) => {
        let o;
        if (t && r === t.index) {
          o = t.correct === true ? "correct" : t.correct === false ? "wrong" : "picked";
        }
        return d.jsxs("button", {
          type: "button",
          className: "sl-ask-option",
          "data-verdict": o,
          style: {
            animationDelay: r * 60 + "ms"
          },
          disabled: n || h,
          onClick: () => s(r),
          children: [d.jsx("div", {
            className: "sl-ask-option-text",
            children: d.jsx(p, {
              remarkPlugins: st,
              rehypePlugins: ot,
              children: Ze(e)
            })
          }), o === "correct" && d.jsx(he, {
            size: 14,
            strokeWidth: 2.5,
            "aria-label": l("pdfAnnotation.ask.correct")
          }), o === "wrong" && d.jsx(ge, {
            size: 14,
            strokeWidth: 2.5,
            "aria-label": l("pdfAnnotation.ask.incorrect")
          })]
        }, r);
      })
    }), h && g && e.explanation && d.jsx("div", {
      className: "sl-ask-explanation",
      role: "status",
      children: d.jsx(p, {
        remarkPlugins: st,
        rehypePlugins: ot,
        children: Ze(e.explanation)
      })
    }), !h && d.jsx("div", {
      className: "sl-ask-hint",
      children: l("pdfAnnotation.ask.orTypeHint")
    })]
  });
}
const Dn = "live";
const Fn = 340;
const On = 300;
function Un(e, t, n) {
  return e.referenceName || e.referenceId || n("pdfAnnotation.layout.referenceFallback", {
    index: t + 1
  });
}
const Hn = new Set(["image/png", "image/jpeg"]);
function Wn({
  items: e,
  onRemove: t,
  removeLabel: n
}) {
  return d.jsx("div", {
    className: "sl-attach-strip",
    children: e.map(e => d.jsxs("div", {
      className: `sl-attach-chip sl-attach-chip--${e.status}`,
      children: [d.jsx("img", {
        src: e.previewUrl,
        alt: e.filename,
        title: e.filename
      }), e.status === "uploading" && d.jsx("span", {
        className: "sl-attach-spinner",
        "aria-hidden": "true"
      }), e.status === "error" && d.jsx("span", {
        className: "sl-attach-error",
        "aria-hidden": "true",
        children: "!"
      }), d.jsx("button", {
        type: "button",
        className: "sl-attach-remove",
        onClick: () => t(e.localId),
        "aria-label": n,
        children: d.jsx(ge, {
          size: 10
        })
      })]
    }, e.localId))
  });
}
const qn = [[u, rt]];
function Yn(e) {
  let t = "";
  let n = 0;
  while (n < e.length) {
    const r = e[n];
    if (r === "\\") {
      t += e.slice(n, n + 2);
      n += 2;
      continue;
    }
    if (r !== "$") {
      t += r;
      n += 1;
      continue;
    }
    const s = e.startsWith("$$", n) ? 2 : 1;
    let o = n + s;
    let a = -1;
    while (o < e.length) {
      const t = e[o];
      if (t !== "\\") {
        if (t !== "$") {
          o += 1;
        } else {
          if (s === 1) {
            a = o;
            break;
          }
          if (e.startsWith("$$", o)) {
            a = o;
            break;
          }
          o += 1;
        }
      } else {
        o += 2;
      }
    }
    if (a < 0) {
      t += r;
      n += 1;
    } else {
      t += ` ${Yn(e.slice(n + s, a))} `;
      n = a + s;
    }
  }
  return t;
}
function Xn(e) {
  const t = Yn(e).replace(/\s+/g, " ").trim();
  if (t.length > 60) {
    return `${t.slice(0, 59)}…`;
  } else {
    return t;
  }
}
function Kn({
  text: e
}) {
  return d.jsx(p, {
    remarkPlugins: st,
    rehypePlugins: qn,
    components: {
      p: ({
        children: e
      }) => d.jsx(d.Fragment, {
        children: e
      })
    },
    children: Ze(e)
  });
}
function Zn({
  text: e
}) {
  if (/[$\\]/.test(e)) {
    return d.jsx(p, {
      remarkPlugins: st,
      rehypePlugins: qn,
      components: {
        p: ({
          children: e
        }) => d.jsx(d.Fragment, {
          children: e
        })
      },
      children: Ze(e)
    });
  } else {
    return d.jsx(d.Fragment, {
      children: e
    });
  }
}
function Gn() {
  var e;
  var t;
  var s;
  var o;
  var l;
  var c;
  var u;
  var f;
  var p;
  var m;
  var y;
  var w;
  var z;
  var B;
  const {
    t: D
  } = a();
  const F = h();
  const {
    courseId: O,
    courseSessionId: U,
    sessionId: H
  } = g();
  const W = O && U ? `${O}:${U}` : null;
  const q = Boolean(W);
  const X = Boolean(H) && !q;
  const K = x();
  const Z = K.state;
  const V = ((e = Z == null ? undefined : Z.sessionTitle) == null ? undefined : e.trim()) || null;
  const J = ((t = Z == null ? undefined : Z.learnIntroTitle) == null ? undefined : t.trim()) || null;
  const Q = ((s = Z == null ? undefined : Z.learnIntroDescription) == null ? undefined : s.trim()) || null;
  const ee = ((o = Z == null ? undefined : Z.fromConversationId) == null ? undefined : o.trim()) || null;
  const {
    connected: te,
    sessionReady: ne,
    sessionId: se,
    wsSessionTitle: ce,
    conversationId: fe,
    sessionLoadFailed: pe,
    conversation: me,
    isProcessing: ye,
    pdfAnnotations: we,
    fileId: _e,
    zoomPhase: Ne,
    activeBoardPage: Ie,
    pageBoardNotes: Ae,
    focusRequest: Re,
    awaitingConfirm: Ee,
    pendingAsk: Pe,
    answerAsk: $e,
    keypointIndex: Le,
    keypointsDone: ze,
    turnHandbackEpoch: Be,
    courseDocumentState: De,
    sessionPrompt: Fe,
    dismissSessionPrompt: Ue,
    connect: He,
    startTeaching: We,
    sendMessage: qe,
    navigatePage: Ye,
    sendStopGeneration: Xe,
    onPdfUploaded: Ke,
    setZoomPhase: Ze,
    setActiveBoardPage: Ge,
    resumeSession: Ve,
    autoFocusEnabled: Je,
    toggleAutoFocus: Qe,
    narrationCaption: et,
    narrationCaptionEpoch: tt,
    narrationPlaying: nt,
    toggleNarration: rt,
    setNarrationMuted: st,
    beginInterject: ot,
    sendInterjectQuestion: at,
    sendInterjectPcm: it,
    endInterjectPcm: lt,
    cancelInterject: ct,
    sendVoiceMessage: ut,
    interjectState: dt,
    selectCourseSession: ft,
    goToNextDocument: pt,
    goToPreviousDocument: mt,
    disconnect: ht,
    ttsConfig: gt,
    setTtsConfig: xt,
    pingServer: bt,
    runModelProbe: vt
  } = Oe();
  const yt = ye || nt || dt !== "idle";
  const wt = i.useRef(false);
  wt.current = yt;
  const kt = j({
    enabled: te && ne,
    mode: Dn,
    onSpeechStart: () => wt.current ? !!ot("voice", Dn) && "interject" : !!cr && "input",
    onUtterance: ({
      audioB64: e,
      mime: t,
      durationMs: n
    }, r) => {
      if (r === "interject") {
        at({
          audioB64: e,
          mime: t,
          durationMs: n
        });
      } else {
        ut({
          audioB64: e,
          mime: t,
          durationMs: n
        });
      }
    },
    onPcmFrame: it,
    onPcmEnd: lt,
    onCancel: () => ct(),
    onColdUtterance: ({
      audioB64: e,
      mime: t,
      durationMs: n
    }) => {
      if (!wt.current && cr) {
        ut({
          audioB64: e,
          mime: t,
          durationMs: n
        });
      }
    }
  });
  const jt = i.useRef(false);
  i.useEffect(() => {
    if (!jt.current && te && ne) {
      jt.current = true;
      if (S() === "voice") {
        kt.setEnabled(true);
      }
    }
  }, [te, ne, kt.setEnabled]);
  i.useEffect(() => {
    if (S() === "voice") {
      _();
    }
  }, []);
  const St = kt.status === "capturing";
  const _t = kt.enabled && kt.status === "loading";
  const [Nt, Ct] = i.useState(false);
  const [Mt, It] = i.useState(0);
  const [At, Rt] = i.useState(false);
  const [Tt, Et] = i.useState(false);
  const [Pt, $t] = i.useState(false);
  const Lt = i.useRef(q && (Z == null ? undefined : Z.showLearnIntro) === true);
  const [zt, Bt] = i.useState(Lt.current);
  const [Dt, Ft] = i.useState(false);
  const Ot = i.useRef(false);
  const Ut = gt ?? {
    voiceId: "firm",
    speed: 1
  };
  const [Ht, Wt] = i.useState("syllabus");
  const [qt, Yt] = i.useState(true);
  const [Xt, Kt] = i.useState(false);
  const [Zt, Gt] = i.useState(false);
  const [Vt, Jt] = i.useState(false);
  const [Qt, en] = i.useState(false);
  const [tn, nn] = i.useState(false);
  const [rn, sn] = i.useState(false);
  const on = i.useRef(null);
  const [an, ln] = i.useState(null);
  const cn = i.useRef(null);
  const [un, dn] = i.useState("");
  const [fn, pn] = i.useState([]);
  const [mn, hn] = i.useState(false);
  const [gn, xn] = i.useState(false);
  const [bn, vn] = i.useState([]);
  const [yn, wn] = i.useState([]);
  const [kn, jn] = i.useState(null);
  const [Sn, _n] = i.useState(null);
  const [Cn, Mn] = i.useState(null);
  const [In, An] = i.useState(false);
  const [Tn, En] = i.useState(false);
  const [$n, zn] = i.useState(null);
  const qn = N({
    enabled: te && ne && Boolean(_e) && !ye && !nt && !Fe && !At && !Tt && !Pt && !zt && !Dt
  });
  const Yn = i.useRef(null);
  const Gn = i.useRef(null);
  const Vn = i.useRef(null);
  const Jn = i.useRef(null);
  const Qn = i.useRef(null);
  const er = i.useRef(null);
  const tr = i.useRef(null);
  const nr = i.useRef(new Map());
  const rr = i.useCallback((e, t) => {
    for (const n of t) {
      nr.current.set(n.id, {
        ...n,
        pageIndex: e
      });
    }
  }, []);
  i.useEffect(() => {
    if (q || X) {
      try {
        localStorage.removeItem("pdf_session_id");
      } catch {}
    }
    He(q ? undefined : H, W, {
      suppressInitialTeaching: Lt.current,
      standalone: X
    });
    return () => ht();
  }, []);
  const sr = i.useRef(undefined);
  i.useEffect(() => {
    if (H === sr.current) {
      return;
    }
    const e = sr.current === undefined;
    sr.current = H;
    if (!e) {
      if (H) {
        Ve(H);
      }
    }
  }, [H]);
  i.useEffect(() => {
    if (se) {
      if (!q) {
        if (H !== se) {
          F(`/pdf-session/${se}`, {
            replace: true
          });
        }
      }
    }
  }, [se, q]);
  i.useEffect(() => {
    if (W && tr.current !== W) {
      tr.current = W;
      jn(O ?? null);
      _n(W);
      Mn(U ?? null);
    }
  }, [O, U, W]);
  i.useEffect(() => {
    const e = Jn.current;
    if (e) {
      e.scrollTo({
        top: e.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [me, ye, nt]);
  i.useEffect(() => {
    if (Qt) {
      setTimeout(() => {
        var e;
        if ((e = Yn.current) == null) {
          return undefined;
        } else {
          return e.focus();
        }
      }, 320);
    }
  }, [Qt]);
  i.useEffect(() => {
    let e = false;
    if (!q && !X) {
      (async function () {
        try {
          An(true);
          zn(null);
          const t = await async function () {
            const e = await fetch(r(`${Me}/course-outlines`), {
              headers: Ce()
            });
            if (!e.ok) {
              throw new Error(`Failed to list courses: ${e.status}`);
            }
            return (await e.json()).courses ?? [];
          }();
          if (!e) {
            vn(t);
          }
        } catch {
          if (!e) {
            zn(D("pdfAnnotation.layout.courseLoadFailed"));
          }
        } finally {
          if (!e) {
            An(false);
          }
        }
      })();
    }
    return () => {
      e = true;
    };
  }, []);
  i.useEffect(() => {
    let e = false;
    if (kn) {
      (async function (t) {
        try {
          En(true);
          zn(null);
          const n = await async function (e) {
            const t = await fetch(r(`${Me}/course-outlines/${encodeURIComponent(e)}/sessions`), {
              headers: Ce()
            });
            if (!t.ok) {
              throw new Error(`Failed to list course sessions: ${t.status}`);
            }
            return (await t.json()).sessions ?? [];
          }(t);
          if (!e) {
            wn(n);
          }
        } catch {
          if (!e) {
            zn(D("pdfAnnotation.layout.sessionsLoadFailed"));
          }
        } finally {
          if (!e) {
            En(false);
          }
        }
      })(kn);
    }
    return () => {
      e = true;
    };
  }, [kn]);
  const [or, ar] = i.useState("");
  i.useEffect(() => {
    const e = et;
    if (!e) {
      ar("");
      return;
    }
    ar("");
    let t = 0;
    const n = window.setInterval(() => {
      t += 1;
      if (t >= e.length) {
        ar(e);
        window.clearInterval(n);
        return;
      }
      ar(e.slice(0, function (e, t) {
        const n = Math.min(Math.max(t, 0), e.length);
        let r = 0;
        while (r < n) {
          const t = e[r];
          if (t === "\\") {
            if (r + 2 > n) {
              return r;
            }
            r += 2;
            continue;
          }
          if (t !== "$") {
            r += 1;
            continue;
          }
          const s = r;
          const o = e.startsWith("$$", r) ? 2 : 1;
          let a = r + o;
          let i = -1;
          while (a < e.length) {
            const t = e[a];
            if (t !== "\\") {
              if (t !== "$") {
                a += 1;
              } else {
                if (o === 1) {
                  i = a + 1;
                  break;
                }
                if (e.startsWith("$$", a)) {
                  i = a + 2;
                  break;
                }
                a += 1;
              }
            } else {
              a += 2;
            }
          }
          if (i < 0) {
            r = s + 1;
          } else {
            if (i > n) {
              return i;
            }
            r = i;
          }
        }
        return n;
      }(e, t)));
    }, 1000 / 28);
    return () => window.clearInterval(n);
  }, [tt, et]);
  const ir = or;
  const lr = or.length < et.length;
  i.useEffect(() => {
    st(gn);
  }, [gn, st]);
  const cr = te && ne && !!_e;
  const ur = !te || !ne || (q || X || !!Sn) && !_e;
  const dr = te && ne && !_e && !q && !X && !Sn;
  const fr = qt ? 368 : 84 + (Qt ? 300 : 36) + (qt || Qt ? 0 : 48) + 16;
  const pr = !!De && De.referenceCount > 1;
  const mr = !!(De == null ? undefined : De.previous) && !ye;
  const hr = !!(De == null ? undefined : De.next) && !ye;
  const gr = W ? yn.find(e => e.id === W) ?? null : null;
  const xr = J || V || ((l = gr == null ? undefined : gr.title) == null ? undefined : l.trim()) || D("pdfAnnotation.layout.learnIntroTitleFallback");
  const br = Q || ((c = gr == null ? undefined : gr.description) == null ? undefined : c.trim()) || ((u = gr == null ? undefined : gr.lectureOutline) == null ? undefined : u.trim()) || D("pdfAnnotation.layout.learnIntroDescriptionFallback");
  const vr = (gr == null ? undefined : gr.references) ?? [];
  const yr = (gr == null ? undefined : gr.key_points) ?? [];
  const wr = q && yr.length > 0;
  const kr = [(f = gr == null ? undefined : gr.unit_title) == null ? undefined : f.trim(), (p = gr == null ? undefined : gr.lecture_title) == null ? undefined : p.trim()].filter(Boolean).join(" › ");
  const jr = Le === null || yr.length === 0 ? null : Math.min(Le, yr.length - 1);
  const Sr = ((m = De == null ? undefined : De.current) == null ? undefined : m.referenceName) || ((y = De == null ? undefined : De.current) == null ? undefined : y.referenceId) || null;
  const _r = (w = De == null ? undefined : De.current) == null ? undefined : w.start_page_index;
  const Nr = (z = De == null ? undefined : De.current) == null ? undefined : z.end_page_index;
  const Cr = typeof _r == "number" && typeof Nr == "number" ? {
    start: _r,
    end: Nr
  } : null;
  const Mr = ((B = gr == null ? undefined : gr.title) == null ? undefined : B.trim()) || (q || X ? V || ce : null) || null;
  const Ir = Mr || (q ? null : Cn) || D("pdfAnnotation.layout.sessionTitleFallback");
  const Ar = q || X ? Boolean(Mr) || pe : Boolean(Cn);
  i.useEffect(() => {
    if (zt && te && !Ot.current) {
      Ot.current = true;
      xt(gt ?? {
        voiceId: "firm",
        speed: 1
      });
    }
  }, [te, xt, zt, gt]);
  const Rr = async () => {
    try {
      await document.fonts.ready;
    } catch {}
    await new Promise(e => requestAnimationFrame(() => requestAnimationFrame(e)));
    await new Promise(e => window.setTimeout(e, 150));
  };
  const Tr = async () => {
    await new Promise(e => {
      let t = false;
      const n = () => {
        if (!t) {
          t = true;
          e();
        }
      };
      window.addEventListener("pdf:page-rendered", n, {
        once: true
      });
      window.setTimeout(n, 2500);
    });
    await new Promise(e => window.setTimeout(e, 280));
    await Rr();
  };
  const Er = async () => {
    const e = document.querySelector("[data-export-root]");
    if (!e) {
      return null;
    }
    window.dispatchEvent(new CustomEvent("pdf:export-reset-camera"));
    await new Promise(e => window.setTimeout(e, 220));
    try {
      await (async e => {
        const t = Array.from(e.querySelectorAll("img"));
        await Promise.all(t.map(e => new Promise(t => {
          if (e.crossOrigin === "anonymous" && e.complete) {
            t();
            return;
          }
          const n = e.src;
          const r = () => t();
          e.crossOrigin = "anonymous";
          e.addEventListener("load", r, {
            once: true
          });
          e.addEventListener("error", r, {
            once: true
          });
          e.src = n;
          window.setTimeout(r, 3000);
        })));
      })(e);
      await Rr();
      return await E(e, {
        backgroundColor: "#fcfcfc",
        useCORS: true,
        allowTaint: false,
        scale: 2,
        logging: false,
        ignoreElements: e => e.tagName === "IFRAME",
        onclone: e => {
          const t = e.querySelector("[data-export-root]");
          if (t != null) {
            t.querySelectorAll("canvas").forEach(e => {
              e.replaceChildren();
            });
          }
        }
      });
    } finally {
      window.dispatchEvent(new CustomEvent("pdf:export-restore-camera"));
    }
  };
  const Pr = (e, t) => {
    const n = e.toDataURL("image/jpeg", 0.92);
    const r = document.createElement("a");
    r.href = n;
    r.download = t;
    document.body.appendChild(r);
    r.click();
    document.body.removeChild(r);
  };
  const $r = (e, t, n) => {
    const r = 297;
    const s = 210;
    const o = t.width / t.height;
    let a = r;
    let i = s;
    if (o > r / s) {
      i = r / o;
    } else {
      a = s * o;
    }
    const l = (r - a) / 2;
    const c = (s - i) / 2;
    if (!n) {
      e.addPage([r, s], "landscape");
    }
    e.addImage(t.toDataURL("image/jpeg", 0.92), "JPEG", l, c, a, i);
  };
  const Lr = ((gr == null ? undefined : gr.title) || Cn || "pdf-annotation").trim().replace(/[\\/:*?"<>|]+/g, " ").replace(/\s+/g, " ").trim() || "pdf-annotation";
  const zr = i.useCallback(async e => {
    if (!Nt && !ye) {
      Ct(true);
      try {
        const t = await Er();
        if (!t) {
          return;
        }
        const n = Ie + 1;
        if (e === "jpg") {
          Pr(t, `${Lr}-page${n}.jpg`);
        } else {
          const e = new C({
            orientation: "landscape",
            unit: "mm",
            format: "a4"
          });
          $r(e, t, true);
          e.save(`${Lr}-page${n}.pdf`);
        }
      } finally {
        Ct(false);
      }
    }
  }, [Nt, ye, Ie, Lr]);
  const Br = i.useCallback(async e => {
    if (Nt || ye) {
      return;
    }
    const t = new Set();
    Ae.forEach((e, n) => {
      if (e.length > 0) {
        t.add(n);
      }
    });
    we.forEach((e, n) => {
      if (e.length > 0) {
        t.add(n);
      }
    });
    const n = Array.from(t).sort((e, t) => e - t);
    if (n.length === 0) {
      return;
    }
    Ct(true);
    const r = Ie;
    let s = null;
    try {
      for (let t = 0; t < n.length; t++) {
        const r = n[t];
        Ge(r);
        await Tr();
        const o = await Er();
        if (o) {
          if (e === "jpg") {
            Pr(o, `${Lr}-page${r + 1}.jpg`);
          } else {
            s ||= new C({
              orientation: "landscape",
              unit: "mm",
              format: "a4"
            });
            $r(s, o, t === 0);
          }
        }
      }
      if (e === "pdf" && s) {
        s.save(`${Lr}-taught-pages.pdf`);
      }
    } finally {
      Ge(r);
      Ct(false);
    }
  }, [Nt, ye, Ie, Ae, we, Lr, Ge]);
  const Dr = i.useRef(false);
  i.useEffect(() => {
    if (me.some(e => e.type === "status" && e.content === Te())) {
      Dr.current = true;
    }
  }, [me]);
  const Fr = ee || fe || null;
  const Or = X ? Fr ? `/response/${Fr}` : "/" : null;
  const Ur = i.useCallback(() => {
    if (X) {
      F(Or ?? "/");
    } else if (O) {
      F(`/course/${O}`, {
        state: {
          fromSessionId: U,
          ...(Dr.current && U ? {
            completedSessionId: U
          } : {})
        }
      });
    } else {
      F("/courses");
    }
  }, [F, O, U, X, Or]);
  const Hr = i.useCallback(() => {
    $t(false);
    Ur();
  }, [Ur]);
  const Wr = i.useCallback(() => {
    Rt(true);
  }, []);
  const qr = i.useCallback(e => {
    if (e !== kn) {
      jn(e);
      wn([]);
      _n(null);
      Mn(null);
    }
  }, [kn]);
  const Yr = i.useCallback(e => {
    if (e.is_pdf_annotate && !ye) {
      _n(e.id);
      Mn(e.title);
      ft(e.id);
    }
  }, [ye, ft]);
  const Xr = i.useCallback(e => {
    F(`/pdf-session/${e}`, {
      replace: true
    });
    It(0);
    Ve(e);
  }, [F, Ve]);
  const Kr = i.useCallback(e => It(e), []);
  const Zr = i.useCallback(e => {
    Ge(e);
    Ze("full-page");
    window.dispatchEvent(new CustomEvent("pdf:scroll-to-page", {
      detail: {
        pageIndex: e
      }
    }));
  }, [Ge, Ze]);
  const Gr = i.useCallback(() => {
    Ze("full-page");
  }, [Ze]);
  const Vr = fn.some(e => e.status === "uploading");
  const Jr = fn.filter(e => e.status === "ready" && e.fileId);
  const Qr = e => {
    if (!e || e.length === 0) {
      return;
    }
    const t = 4 - fn.length;
    if (t <= 0) {
      return;
    }
    const s = Array.from(e).filter(e => Hn.has(e.type) && e.size <= 6291456).slice(0, t);
    if (s.length === 0) {
      return;
    }
    const o = s.map(e => ({
      localId: crypto.randomUUID(),
      filename: e.name,
      previewUrl: URL.createObjectURL(e),
      status: "uploading"
    }));
    pn(e => [...e, ...o]);
    s.forEach((e, t) => {
      const {
        localId: s
      } = o[t];
      (async function (e) {
        const t = n();
        const s = new FormData();
        s.append("file", e);
        const o = await fetch(r("/api/v1/upload_file"), {
          method: "POST",
          headers: {
            accept: "application/json",
            ...(t ? {
              Authorization: `Bearer ${t}`
            } : {})
          },
          body: s
        });
        if (!o.ok) {
          throw new Error(`Upload failed: ${o.status}`);
        }
        const a = await o.json();
        if (!(a == null ? undefined : a.file_id)) {
          throw new Error("Upload failed: no file_id");
        }
        return a.file_id;
      })(e).then(e => {
        pn(t => t.map(t => t.localId === s ? {
          ...t,
          fileId: e,
          status: "ready"
        } : t));
      }).catch(e => {
        pn(e => e.map(e => e.localId === s ? {
          ...e,
          status: "error"
        } : e));
      });
    });
  };
  const es = e => {
    pn(t => {
      const n = t.find(t => t.localId === e);
      if (n) {
        URL.revokeObjectURL(n.previewUrl);
      }
      return t.filter(t => t.localId !== e);
    });
  };
  const ts = e => Array.from(e.dataTransfer.types).includes("Files");
  const ns = e => {
    if (!cr) {
      return;
    }
    const t = Array.from(e.clipboardData.items).filter(e => e.kind === "file").map(e => e.getAsFile()).filter(e => e !== null);
    if (t.length !== 0) {
      e.preventDefault();
      Qr(t);
    }
  };
  const rs = () => {
    var e;
    const t = un.trim();
    if ((t || Jr.length !== 0) && !Vr && cr) {
      if (yt && t && Jr.length === 0 && ot("text")) {
        at({
          text: t
        });
        dn("");
        return;
      } else {
        if (!ye) {
          qe(t, Jr.map(e => ({
            fileId: e.fileId,
            filename: e.filename,
            previewUrl: e.previewUrl
          })));
          dn("");
          pn([]);
          nn(false);
          if ((e = Yn.current) != null) {
            e.focus();
          }
        }
        return;
      }
    }
  };
  const ss = () => {
    if (on.current) {
      window.clearTimeout(on.current);
    }
    sn(false);
    window.setTimeout(() => {
      sn(true);
      on.current = window.setTimeout(() => sn(false), 1400);
    }, 0);
  };
  const os = e => {
    if ((e == null ? undefined : e.mode) === "open") {
      nn(true);
      if (qt || Qt) {
        ss();
      } else {
        en(true);
      }
      return;
    }
    if ((e == null ? undefined : e.mode) !== "choice") {
      if (!qt && !Qt) {
        en(true);
      }
    }
  };
  const as = i.useRef(os);
  as.current = os;
  const is = i.useRef(Pe);
  is.current = Pe;
  i.useEffect(() => {
    if (Be !== 0) {
      as.current(is.current);
    }
  }, [Be]);
  i.useEffect(() => {
    if (Pe == null ? undefined : Pe.restored) {
      as.current(Pe);
    }
  }, [Pe]);
  i.useEffect(() => {
    if (ye) {
      nn(false);
    }
  }, [ye]);
  i.useEffect(() => {
    if (et) {
      ln(null);
    }
  }, [et, tt]);
  i.useEffect(() => () => {
    if (on.current) {
      window.clearTimeout(on.current);
    }
    if (cn.current) {
      window.clearTimeout(cn.current);
    }
  }, []);
  const ls = () => {
    We();
    F(`${K.pathname}${K.search}${K.hash}`, {
      replace: true,
      state: V ? {
        sessionTitle: V
      } : null
    });
  };
  const cs = e => {
    const t = !kt.enabled || kt.status === "denied";
    const n = kt.status === "denied" ? D("pdfAnnotation.layout.voiceInterruptDenied") : kt.status === "unavailable" ? D("pdfAnnotation.layout.voiceInterruptUnavailable") : kt.status === "loading" ? D("pdfAnnotation.layout.voiceInterruptLoading") : kt.enabled ? D("pdfAnnotation.layout.voiceInterruptOn") : D("pdfAnnotation.layout.voiceInterruptOff");
    return d.jsx("button", {
      type: "button",
      className: `sl-voice-btn sl-voice-btn--${e}`,
      "data-enabled": kt.enabled ? "true" : "false",
      "data-voice-status": kt.status,
      onClick: e => {
        e.stopPropagation();
        const t = !kt.enabled;
        kt.setEnabled(t);
        P(t ? "voice" : "text");
      },
      disabled: kt.status === "unavailable",
      title: n,
      "aria-label": n,
      "aria-pressed": kt.enabled,
      children: t ? d.jsx($, {
        size: e === "morph" ? 14 : 16
      }) : d.jsx(L, {
        size: e === "morph" ? 14 : 16
      })
    });
  };
  const us = e => {
    if (!v(e)) {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        rs();
      }
      if (e.key === "Escape") {
        en(false);
      }
    }
  };
  const ds = () => {
    Yt(e => !e);
    en(false);
  };
  const fs = (() => {
    const e = [];
    Ae.forEach(t => {
      for (const n of t) {
        const t = Xn(n.note ?? n.content ?? "") || D("pdfAnnotation.layout.pageNoteFallback", {
          page: n.pageIndex + 1
        });
        e.push({
          id: n.annId,
          label: t
        });
      }
    });
    return e;
  })();
  const ps = me.reduce((e, t, n) => t.type === "user" ? n : e, -1);
  const ms = ps >= 0 && me.slice(ps + 1).some(e => e.type === "assistant_timeline" ? e.blocks.length > 0 : e.type !== "user");
  const hs = me.some(e => e.type === "assistant_timeline" && e.blocks.length > 0);
  const gs = ye && (ps >= 0 && !ms || ps < 0 && !hs);
  return d.jsxs("div", {
    className: "sl-root",
    children: [zt && d.jsxs("div", {
      className: "sl-learn-intro-overlay",
      children: [d.jsx("button", {
        type: "button",
        className: "sl-learn-intro-cancel",
        onClick: Ur,
        "aria-label": "Cancel and return to course",
        children: d.jsx("svg", {
          width: "13",
          height: "13",
          viewBox: "0 0 13 13",
          fill: "none",
          "aria-hidden": "true",
          children: d.jsx("path", {
            d: "M1 1L12 12M12 1L1 12",
            stroke: "currentColor",
            strokeWidth: "1.35",
            strokeLinecap: "round"
          })
        })
      }), d.jsxs("section", {
        className: "sl-learn-intro-card",
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": "sl-learn-intro-title",
        "aria-describedby": "sl-learn-intro-desc",
        children: [d.jsx("div", {
          className: "sl-learn-intro-media",
          "aria-hidden": "true",
          children: d.jsx(b, {
            className: "sl-learn-intro-video"
          })
        }), d.jsxs("div", {
          className: "sl-learn-intro-content",
          children: [d.jsx("p", {
            className: "sl-learn-intro-eyebrow",
            children: D("pdfAnnotation.layout.learnIntroEyebrow")
          }), d.jsx("h1", {
            id: "sl-learn-intro-title",
            className: "sl-learn-intro-title",
            children: d.jsx(Zn, {
              text: xr
            })
          }), d.jsx("p", {
            id: "sl-learn-intro-desc",
            className: "sl-learn-intro-desc",
            children: d.jsx(Zn, {
              text: br
            })
          }), d.jsx("button", {
            type: "button",
            className: "sl-learn-intro-btn",
            onClick: () => {
              Bt(false);
              if (S() !== null) {
                ls();
              } else {
                Ft(true);
              }
            },
            children: D("pdfAnnotation.layout.startLearning")
          })]
        })]
      })]
    }), pe && d.jsx("div", {
      className: "sl-modal-overlay",
      children: d.jsxs("div", {
        className: "sl-modal-card",
        role: "alertdialog",
        "aria-modal": "true",
        "aria-label": D("courseSession.standaloneSessionMissingTitle"),
        children: [d.jsx("h3", {
          className: "sl-modal-title",
          children: D("courseSession.standaloneSessionMissingTitle")
        }), d.jsx("p", {
          className: "sl-modal-desc",
          children: D("courseSession.standaloneSessionMissingDesc")
        }), d.jsx("div", {
          className: "sl-modal-actions",
          children: d.jsx("button", {
            className: "sl-modal-btn sl-modal-btn--danger",
            onClick: Ur,
            children: D("courseSession.standaloneBackToChat")
          })
        })]
      })
    }), Fe && d.jsx("div", {
      className: "sl-session-prompt-toast" + (Fe.dismissible ? " sl-session-prompt-toast--persistent" : ""),
      role: "status",
      "aria-live": "polite",
      children: d.jsxs("div", {
        className: "sl-session-prompt-toast-row",
        children: [d.jsx("div", {
          className: "sl-session-prompt-toast-media",
          "aria-hidden": "true",
          children: d.jsx(b, {
            className: "sl-session-prompt-toast-video"
          })
        }), d.jsxs("div", {
          className: "sl-session-prompt-toast-body",
          children: [d.jsx("span", {
            className: "sl-session-prompt-toast-text",
            children: Fe.text
          }), Fe.dismissible && d.jsx("button", {
            type: "button",
            className: "sl-session-prompt-toast-btn",
            onClick: Ue,
            children: D("courseSession.gotIt")
          })]
        })]
      })
    }), At && d.jsx(Ln, {
      onClose: () => Rt(false),
      onResumeSession: Xr,
      currentSessionId: se
    }), Pt && d.jsx("div", {
      className: "sl-modal-overlay",
      onClick: () => $t(false),
      children: d.jsxs("div", {
        className: "sl-modal-card",
        role: "dialog",
        "aria-modal": "true",
        "aria-label": D("courseSession.exitConfirmTitle"),
        onClick: e => e.stopPropagation(),
        children: [d.jsx("div", {
          className: "sl-modal-illustration",
          children: d.jsx("img", {
            src: "/pages/mainPages/courses/question.png",
            alt: "",
            "aria-hidden": "true",
            className: "sl-modal-illustration-img"
          })
        }), d.jsx("h3", {
          className: "sl-modal-title",
          children: D("courseSession.exitConfirmTitle")
        }), d.jsx("p", {
          className: "sl-modal-desc",
          children: D(X ? "courseSession.standaloneExitConfirmDesc" : "courseSession.exitConfirmDesc")
        }), d.jsxs("div", {
          className: "sl-modal-actions",
          children: [d.jsx("button", {
            className: "sl-modal-btn sl-modal-btn--secondary",
            onClick: () => $t(false),
            children: D("courseSession.exitConfirmCancel")
          }), d.jsxs("button", {
            className: "sl-modal-btn sl-modal-btn--danger",
            onClick: Hr,
            children: [d.jsx("img", {
              className: "sl-modal-exit-icon",
              src: "/pages/coursePage/whiteboard/exit.svg",
              alt: "",
              "aria-hidden": "true"
            }), D("courseSession.exitConfirmLeave")]
          })]
        })]
      })
    }), d.jsx(xe, {
      kind: Vt ? "practice" : null,
      onClose: () => Jt(false)
    }), d.jsx(M, {
      open: Dt,
      onConfirm: e => {
        P(e);
        jt.current = true;
        kt.setEnabled(e === "voice");
        Ft(false);
        ls();
      }
    }), d.jsx(G, {
      open: Tt,
      onClose: () => Et(false),
      voiceId: Ut.voiceId,
      speed: Ut.speed,
      onChange: xt,
      narrationPlaying: nt
    }), qn.isIdlePromptOpen && d.jsx(I, {
      title: D("courseSession.idlePromptTitle"),
      message: D("courseSession.idlePromptMessage"),
      snoozeLabel: D("courseSession.idlePromptSnooze"),
      keepInChatLabel: D("courseSession.idlePromptKeepInChat"),
      backToCoursesLabel: D(X ? "courseSession.standaloneIdleBackToChat" : "courseSession.idlePromptBackToCourses"),
      onKeepInChat: () => {
        qn.dismissIdlePrompt();
        en(false);
        Yt(true);
        window.setTimeout(() => {
          var e;
          if ((e = Gn.current) == null) {
            return undefined;
          } else {
            return e.focus();
          }
        }, 0);
      },
      onBackToCourses: () => {
        qn.dismissIdlePrompt();
        F(Or ?? "/courses");
      }
    }), d.jsx("div", {
      className: "sl-sidebar",
      style: {
        width: 0
      },
      children: d.jsxs("div", {
        className: "sl-sidebar-inner",
        children: [!q && d.jsx("div", {
          className: "sl-tabs",
          children: ["syllabus", "artifacts"].map(e => d.jsx("button", {
            className: "sl-tab",
            "data-active": Ht === e ? "true" : "false",
            onClick: () => Wt(e),
            children: D(e === "syllabus" ? "pdfAnnotation.layout.tabSyllabus" : "pdfAnnotation.layout.tabArtifacts")
          }, e))
        }), d.jsxs("div", {
          className: "sl-sidebar-content",
          children: [q ? d.jsxs("div", {
            className: "sl-outline-panel",
            children: [d.jsx("p", {
              className: "sl-outline-section-title",
              children: D("pdfAnnotation.layout.sessionOutlineTitle")
            }), d.jsxs("div", {
              className: "sl-outline-readonly-card",
              children: [Tn && d.jsx("p", {
                className: "sl-outline-hint",
                children: D("pdfAnnotation.layout.loadingSessionOutline")
              }), !Tn && $n && d.jsx("p", {
                className: "sl-outline-hint",
                children: $n
              }), !Tn && !$n && gr && d.jsxs(d.Fragment, {
                children: [d.jsx("span", {
                  className: "sl-outline-option-title",
                  children: gr.title
                }), gr.unit_title && d.jsx("span", {
                  className: "sl-outline-option-meta",
                  children: gr.unit_title
                }), d.jsx("p", {
                  className: "sl-outline-body",
                  children: gr.lectureOutline || gr.description || D("pdfAnnotation.layout.outlineUnavailable")
                })]
              }), !Tn && !$n && !gr && d.jsx("p", {
                className: "sl-outline-hint",
                children: D("pdfAnnotation.layout.sessionMetadataMissing")
              })]
            }), d.jsx("p", {
              className: "sl-outline-section-title",
              children: D("pdfAnnotation.layout.referencesTitle")
            }), d.jsxs("div", {
              className: "sl-reference-list",
              children: [vr.length === 0 && d.jsx("p", {
                className: "sl-outline-hint",
                children: D("pdfAnnotation.layout.noReferences")
              }), vr.map((e, t) => d.jsxs("div", {
                className: "sl-reference-item",
                children: [d.jsx("span", {
                  className: "sl-outline-option-title",
                  children: Un(e, t, D)
                }), (e.page_range || e.available === false) && d.jsx("span", {
                  className: "sl-outline-option-meta",
                  children: [e.page_range, e.available === false ? D("pdfAnnotation.layout.fileUnavailable") : null].filter(Boolean).join(" · ")
                })]
              }, `${e.referenceId || e.referenceName || t}`))]
            })]
          }) : Ht === "syllabus" && d.jsxs("div", {
            className: "sl-outline-panel",
            children: [d.jsx("p", {
              className: "sl-outline-section-title",
              children: D("pdfAnnotation.layout.courseUuidTitle")
            }), $n && d.jsx("p", {
              className: "sl-outline-hint",
              children: $n
            }), In && d.jsx("p", {
              className: "sl-outline-hint",
              children: D("pdfAnnotation.layout.loadingCourses")
            }), !In && bn.length === 0 && !$n && d.jsx("p", {
              className: "sl-outline-hint",
              children: D("pdfAnnotation.layout.noCourseMetadata")
            }), bn.map(e => d.jsxs("button", {
              type: "button",
              className: "sl-outline-option",
              "data-active": kn === e.uuid ? "true" : "false",
              onClick: () => qr(e.uuid),
              children: [d.jsx("span", {
                className: "sl-outline-option-title",
                children: e.uuid
              }), e.title && e.title !== e.uuid && d.jsx("span", {
                className: "sl-outline-option-meta",
                children: e.title
              })]
            }, e.id)), kn && d.jsxs(d.Fragment, {
              children: [d.jsx("p", {
                className: "sl-outline-section-title",
                children: D("pdfAnnotation.layout.availableSessionsTitle")
              }), Tn && d.jsx("p", {
                className: "sl-outline-hint",
                children: D("pdfAnnotation.layout.loadingSessions")
              }), !Tn && yn.length === 0 && !$n && d.jsx("p", {
                className: "sl-outline-hint",
                children: D("pdfAnnotation.layout.noSessionsInCourse")
              }), yn.map(e => {
                const t = !e.is_pdf_annotate || ye;
                return d.jsxs("button", {
                  type: "button",
                  className: "sl-outline-option",
                  "data-active": Sn === e.id ? "true" : "false",
                  disabled: t,
                  onClick: () => Yr(e),
                  title: e.is_pdf_annotate ? D("pdfAnnotation.layout.loadAnnotationSession") : D("pdfAnnotation.layout.annotationSessionOnly"),
                  children: [d.jsx("span", {
                    className: "sl-outline-option-title",
                    children: e.title
                  }), d.jsx("span", {
                    className: "sl-outline-option-meta",
                    children: [e.unit_title, e.session_type, e.session_id].filter(Boolean).join(" · ")
                  })]
                }, e.id);
              })]
            }), d.jsx("p", {
              className: "sl-outline-hint",
              style: {
                marginTop: 12
              },
              children: Cn ? D("pdfAnnotation.layout.currentCourseSession", {
                title: Cn
              }) : D(_e ? "pdfAnnotation.layout.usingManualPdf" : "pdfAnnotation.layout.manualUploadHint")
            })]
          }), Ht === "artifacts" && (fs.length === 0 ? d.jsx("p", {
            style: {
              fontSize: 12,
              color: "#a3a3a3",
              fontStyle: "italic"
            },
            children: D("pdfAnnotation.layout.noArtifacts")
          }) : fs.map(e => d.jsx("div", {
            className: "sl-artifact-item",
            children: e.label
          }, e.id)))]
        })]
      })
    }), d.jsxs("div", {
      className: "sl-main",
      children: [Qt && d.jsx("div", {
        style: {
          position: "absolute",
          inset: 0,
          zIndex: 15,
          cursor: "default"
        },
        onMouseDown: () => en(false)
      }), d.jsxs("div", {
        className: "sl-session-header",
        style: Xt ? {
          left: 324
        } : undefined,
        children: [(O || X) && d.jsx("button", {
          className: "sl-icon-btn",
          onClick: () => $t(true),
          title: D(X ? "courseSession.exitSession" : "courseSession.exitCourse"),
          "aria-label": D(X ? "courseSession.exitSession" : "courseSession.exitCourse"),
          children: d.jsx(ge, {
            size: 16
          })
        }), (O || X) && (Ar ? d.jsx("div", {
          className: "sl-session-title-pill",
          title: Ir,
          children: Ir
        }) : d.jsx("div", {
          className: "sl-session-title-pill sl-session-title-pill--loading",
          "aria-hidden": "true",
          children: d.jsx("span", {
            className: "sl-skeleton-block sl-session-title-skeleton"
          })
        }))]
      }), d.jsx("div", {
        className: "sl-feedback-entry-wrap",
        style: {
          right: qt ? 364 : 36
        },
        children: d.jsx(ve, {
          conversationId: U ?? H,
          source: "pdfAnnotation",
          variant: "header-icon"
        })
      }), d.jsx(Nn, {
        fileId: _e,
        sessionId: se,
        loading: ur,
        allowUpload: dr,
        annotations: we,
        onUploaded: (e, t) => {
          _n(null);
          Mn(null);
          Ke(e || "");
        },
        onResolvedGeometry: rr,
        onExportBoardCurrentPage: _e ? zr : undefined,
        onExportBoardAllPages: _e ? Br : undefined,
        isExportingBoard: Nt,
        zoomPhase: Ne,
        activeBoardPage: Ie,
        pageBoardNotes: Ae,
        focusRequest: Re,
        onNumPages: Kr,
        onCloseBoardPanel: Gr,
        autoFocusEnabled: Je,
        onToggleAutoFocus: Qe,
        rightInset: qt ? 352 : 0,
        leftInset: Xt ? 312 : 0,
        onOpenVoiceSettings: () => Et(true),
        ttsVoiceId: Ut.voiceId,
        ttsSpeed: Ut.speed,
        networkCheckSlot: d.jsx(A, {
          variant: "pdf",
          apiPrefix: "/api/v1/pdf-annotation",
          sessionPing: bt,
          runModelProbe: vt,
          muted: gn,
          narrationPlaying: nt,
          conversationId: se
        })
      }), _e && (Mt > 1 || pr) && d.jsxs("div", {
        style: {
          position: "absolute",
          bottom: 28,
          right: fr,
          height: 36,
          display: "flex",
          alignItems: "center",
          zIndex: 40,
          pointerEvents: "auto",
          transition: "right 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
          gap: 8
        },
        children: [pr && d.jsxs("div", {
          className: "sl-doc-nav-pill",
          children: [d.jsx("button", {
            type: "button",
            onClick: mt,
            disabled: !mr,
            className: "sl-doc-nav-arrow-btn",
            title: D("courseSession.previousDocument"),
            "aria-label": D("courseSession.previousDocument"),
            children: d.jsx(k, {
              size: 14
            })
          }), d.jsxs("div", {
            className: "sl-doc-nav-info",
            title: Sr ?? undefined,
            children: [d.jsx("span", {
              className: "sl-doc-nav-name",
              children: Sr || D("courseSession.document")
            }), d.jsx("span", {
              className: "sl-doc-nav-count",
              children: D("courseSession.documentCount", {
                index: ((De == null ? undefined : De.activeIndex) ?? 0) + 1,
                count: (De == null ? undefined : De.referenceCount) ?? 1
              })
            })]
          }), d.jsx("button", {
            type: "button",
            onClick: pt,
            disabled: !hr,
            className: "sl-doc-nav-arrow-btn",
            title: D("courseSession.nextDocument"),
            "aria-label": D("courseSession.nextDocument"),
            children: d.jsx(re, {
              size: 14
            })
          })]
        }), Mt > 1 && d.jsx(Pn, {
          currentPage: Ie,
          totalPages: Mt,
          onPageChange: Zr,
          onNavigateBackend: Ye,
          disabled: ye,
          coverageRange: Cr
        })]
      }), d.jsxs("div", {
        className: "sl-controls",
        style: Xt ? {
          left: 324
        } : undefined,
        children: [d.jsxs("div", {
          className: "sl-ctrl-cluster",
          children: [wr ? d.jsx("button", {
            className: "sl-icon-btn",
            "data-active": Xt ? "true" : "false",
            onClick: () => Kt(e => !e),
            title: D("whiteboard.outline.panelToggle"),
            "aria-label": D("whiteboard.outline.panelToggle"),
            children: d.jsx(R, {
              size: 16
            })
          }) : d.jsx("button", {
            className: "sl-icon-btn",
            onClick: () => rt(),
            title: D(nt ? "pdfAnnotation.layout.pause" : "pdfAnnotation.layout.resume"),
            children: nt ? d.jsx(oe, {
              size: 16
            }) : d.jsx(ae, {
              size: 16
            })
          }), d.jsx("button", {
            className: "sl-icon-btn",
            "data-active": gn ? "false" : "true",
            onClick: () => xn(e => !e),
            title: D(gn ? "pdfAnnotation.layout.unmute" : "pdfAnnotation.layout.mute"),
            children: gn ? d.jsx(ie, {
              size: 16
            }) : d.jsx(le, {
              size: 16
            })
          })]
        }), d.jsxs("div", {
          className: "sl-caption",
          children: [d.jsx("style", {
            children: "\n                .sl-caption .katex { font-size: 1.05em; line-height: 1.2; }\n                .sl-caption .katex span {\n                  font-size: unset;\n                  max-width: none;\n                  line-height: unset;\n                  word-break: normal;\n                  overflow-wrap: normal;\n                }\n              "
          }), d.jsxs("div", {
            className: "sl-caption-stack",
            children: [(dt === "listening" || dt === "thinking") && d.jsxs("div", {
              className: "sl-interject",
              "data-state": dt,
              children: [d.jsx("span", {
                className: "sl-interject-dot",
                "aria-hidden": "true"
              }), d.jsx("span", {
                className: "sl-interject-text",
                children: D(dt === "listening" ? "pdfAnnotation.layout.interjectListening" : "pdfAnnotation.layout.interjectThinking")
              })]
            }), d.jsxs("span", {
              children: [d.jsx(Kn, {
                text: ir
              }), lr && d.jsx("span", {
                className: "sl-caption-cursor"
              })]
            }), (an || (Pe == null ? undefined : Pe.mode) === "choice") && d.jsx(Bn, {
              ask: an ? an.ask : Pe,
              result: an ? an.result : null,
              disabled: !!an || !cr || ye,
              captionText: ir,
              onPick: e => {
                const t = Pe;
                if (!t || t.mode !== "choice" || !cr || ye) {
                  return;
                }
                const n = $e(e);
                if (n !== undefined) {
                  if (n !== null && !gn) {
                    const e = new Audio(n ? "/sounds/answer-correct.mp3" : "/sounds/answer-wrong.mp3");
                    e.volume = 0.6;
                    e.play().catch(() => {});
                  }
                  nn(false);
                  ln({
                    ask: t,
                    result: {
                      index: e,
                      correct: n
                    }
                  });
                  if (cn.current) {
                    window.clearTimeout(cn.current);
                  }
                  cn.current = window.setTimeout(() => ln(null), 8000);
                }
              }
            })]
          })]
        }), d.jsxs("div", {
          className: "sl-ctrl-cluster",
          children: [!qt && !Qt && cs("cluster"), !qt && d.jsxs("div", {
            className: "sl-morph-wrap",
            children: [Qt && fn.length > 0 && d.jsx("div", {
              className: "sl-morph-attachments",
              children: d.jsx(Wn, {
                items: fn,
                onRemove: es,
                removeLabel: D("pdfAnnotation.layout.attachments.remove")
              })
            }), d.jsxs("div", {
              ref: er,
              className: "sl-morph" + (Qt && rn ? " sl-input-flash" : ""),
              style: {
                width: Qt ? 300 : 36,
                cursor: Qt ? "default" : "pointer"
              },
              onClick: Qt ? undefined : () => en(true),
              children: [d.jsx("div", {
                className: "sl-morph-icon",
                style: {
                  opacity: Qt ? 0 : 1
                },
                children: d.jsx(T, {
                  size: 16,
                  color: "#737373"
                })
              }), d.jsxs("div", {
                className: "sl-morph-input",
                "data-visible": Qt ? "true" : "false",
                style: {
                  opacity: Qt ? 1 : 0
                },
                children: [d.jsx("button", {
                  type: "button",
                  className: "sl-morph-attach",
                  onClick: e => {
                    var t;
                    e.stopPropagation();
                    if ((t = Vn.current) != null) {
                      t.click();
                    }
                  },
                  disabled: !cr || St || fn.length >= 4,
                  "aria-label": D("pdfAnnotation.layout.attachments.add"),
                  title: D("pdfAnnotation.layout.attachments.add"),
                  children: d.jsx(ue, {
                    size: 14
                  })
                }), d.jsx("textarea", {
                  ref: Yn,
                  className: "sl-morph-textarea",
                  value: un,
                  onChange: e => dn(e.target.value),
                  onKeyDown: us,
                  onPaste: ns,
                  placeholder: D(St ? "pdfAnnotation.layout.voiceListeningPlaceholder" : te ? ne ? tn ? "pdfAnnotation.layout.answerPlaceholder" : Ee ? "pdfAnnotation.layout.sendToContinue" : _t ? "pdfAnnotation.layout.voiceInterruptLoading" : "pdfAnnotation.layout.askPlaceholder" : "pdfAnnotation.layout.preparing" : "pdfAnnotation.layout.connecting"),
                  disabled: !cr || St,
                  rows: 1
                }), cs("morph"), d.jsx("button", {
                  className: "sl-morph-send",
                  onClick: e => {
                    e.stopPropagation();
                    rs();
                  },
                  disabled: !un.trim() && Jr.length === 0 || Vr || !cr || ye && Jr.length > 0,
                  children: ye ? d.jsx(Y, {
                    size: 12,
                    color: "#fff",
                    className: "animate-spin"
                  }) : d.jsx(de, {
                    size: 12,
                    color: "#fff"
                  })
                })]
              })]
            })]
          }), d.jsx("button", {
            className: "sl-icon-btn",
            "data-active": qt ? "true" : "false",
            onClick: ds,
            title: D("pdfAnnotation.layout.conversationHistory"),
            children: d.jsx(je, {
              size: 16
            })
          })]
        })]
      }), wr && d.jsx("div", {
        className: "sl-session-outline",
        "data-open": Xt ? "true" : "false",
        style: {
          width: Xt ? On : 0
        },
        children: d.jsxs("div", {
          className: "sl-session-outline-inner",
          children: [d.jsxs("div", {
            className: "sl-session-outline-header",
            children: [d.jsxs("div", {
              className: "sl-session-outline-heading",
              children: [kr && d.jsx("div", {
                className: "sl-session-outline-breadcrumb",
                title: kr,
                children: kr
              }), d.jsx("div", {
                className: "sl-session-outline-title",
                title: Ir,
                children: Ir
              })]
            }), d.jsx("button", {
              className: "sl-chat-icon-btn",
              onClick: () => Kt(false),
              "aria-label": D("whiteboard.outline.panelClose"),
              children: d.jsx(ge, {
                size: 16
              })
            })]
          }), d.jsxs("div", {
            className: "sl-session-outline-scroll",
            children: [d.jsx("div", {
              className: "sl-session-outline-section-label",
              children: D("whiteboard.outline.learnSection")
            }), d.jsx("ol", {
              className: "sl-session-outline-keypoints",
              children: yr.map((e, t) => {
                const n = (e => ze ? "done" : jr === null ? "upcoming" : e < jr ? "done" : e === jr ? "current" : "upcoming")(t);
                return d.jsxs("li", {
                  className: "sl-session-outline-keypoint",
                  "data-status": n,
                  children: [d.jsx("span", {
                    className: "sl-session-outline-keypoint-marker",
                    "aria-hidden": "true",
                    children: n === "done" ? d.jsx(he, {
                      size: 12,
                      strokeWidth: 2.5
                    }) : d.jsx("span", {
                      className: "sl-session-outline-keypoint-dot"
                    })
                  }), d.jsx("span", {
                    className: "sl-session-outline-keypoint-text",
                    children: d.jsx(Kn, {
                      text: e
                    })
                  }), n === "current" && d.jsxs("span", {
                    className: "sl-session-outline-keypoint-live",
                    "aria-hidden": "true",
                    children: [d.jsx("span", {}), d.jsx("span", {}), d.jsx("span", {})]
                  })]
                }, t);
              })
            })]
          }), d.jsxs("div", {
            className: "sl-session-outline-practice",
            children: [d.jsx("span", {
              className: "sl-session-outline-section-label sl-session-outline-practice-label",
              children: D("whiteboard.outline.practiceSection")
            }), d.jsxs("button", {
              type: "button",
              className: "sl-session-outline-practice-btn",
              onClick: () => {
                (async () => {
                  if (!O || !U || Zt) {
                    return;
                  }
                  Gt(true);
                  let e = false;
                  try {
                    const t = await be(O);
                    e = t.practice === "generating" && (t.generatingSessionIds === null || t.generatingSessionIds.includes(U));
                  } finally {
                    Gt(false);
                  }
                  if (e) {
                    Jt(true);
                  } else {
                    F(`/course/${encodeURIComponent(O)}/practice/${encodeURIComponent(U)}`);
                  }
                })();
              },
              disabled: Zt,
              children: [Zt ? d.jsx("span", {
                className: "sl-session-outline-practice-spinner",
                "aria-hidden": "true"
              }) : d.jsxs("svg", {
                width: "13",
                height: "13",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "1.8",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                "aria-hidden": "true",
                children: [d.jsx("path", {
                  d: "M12 20h9"
                }), d.jsx("path", {
                  d: "M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5Z"
                })]
              }), D("whiteboard.outline.practiceStart")]
            })]
          })]
        })
      }), d.jsx("div", {
        className: "sl-chat",
        "data-open": qt ? "true" : "false",
        style: {
          width: qt ? Fn : 0
        },
        children: d.jsxs("div", {
          className: "sl-chat-inner",
          onDragEnter: e => {
            if (cr && ts(e)) {
              e.preventDefault();
              e.stopPropagation();
              hn(true);
            }
          },
          onDragOver: e => {
            if (cr && ts(e)) {
              e.preventDefault();
              e.stopPropagation();
            }
          },
          onDragLeave: e => {
            e.preventDefault();
            e.stopPropagation();
            if (!e.currentTarget.contains(e.relatedTarget)) {
              hn(false);
            }
          },
          onDrop: e => {
            if (cr) {
              e.preventDefault();
              e.stopPropagation();
              hn(false);
              Qr(e.dataTransfer.files);
            }
          },
          children: [mn && d.jsx("div", {
            className: "sl-chat-drop-overlay",
            children: d.jsx("span", {
              children: D("pdfAnnotation.layout.attachments.dropHint")
            })
          }), d.jsxs("div", {
            className: "sl-chat-header",
            children: [d.jsx("span", {
              children: D("pdfAnnotation.layout.conversationTitle")
            }), d.jsxs("div", {
              className: "sl-chat-header-actions",
              children: [!X && d.jsx("button", {
                className: "sl-chat-icon-btn",
                onClick: Wr,
                title: D("pdfAnnotation.layout.sessionHistory"),
                disabled: ye,
                children: d.jsx(ke, {
                  size: 14
                })
              }), d.jsx("button", {
                className: "sl-chat-icon-btn",
                onClick: ds,
                children: d.jsx(ge, {
                  size: 14
                })
              })]
            })]
          }), d.jsxs("div", {
            className: "sl-chat-messages",
            ref: Jn,
            children: [me.map(e => d.jsx(Rn, {
              item: e
            }, e.id)), gs && d.jsxs("div", {
              className: "sl-chat-skeleton",
              "aria-label": D("pdfAnnotation.layout.generatingReply"),
              children: [d.jsx("div", {
                className: "sl-chat-skeleton-avatar"
              }), d.jsxs("div", {
                className: "sl-chat-skeleton-body",
                children: [d.jsx("div", {
                  className: "sl-chat-skeleton-line sl-chat-skeleton-line-long"
                }), d.jsx("div", {
                  className: "sl-chat-skeleton-line sl-chat-skeleton-line-mid"
                }), d.jsx("div", {
                  className: "sl-chat-skeleton-line sl-chat-skeleton-line-short"
                })]
              })]
            }), (ye || nt) && !gs && d.jsxs("div", {
              className: "sl-chat-generating",
              role: "status",
              "aria-live": "polite",
              children: [d.jsxs("span", {
                className: "sl-chat-generating-dots",
                "aria-hidden": "true",
                children: [d.jsx("span", {}), d.jsx("span", {}), d.jsx("span", {})]
              }), d.jsx("span", {
                className: "sl-chat-generating-label",
                children: D("pdfAnnotation.layout.narratingReply")
              })]
            }), d.jsx("div", {
              ref: Qn
            })]
          }), d.jsx("div", {
            className: "sl-chat-input-bar",
            children: d.jsxs("div", {
              className: "sl-chat-input-pill" + (rn ? " sl-input-flash" : ""),
              "data-listening": St ? "true" : "false",
              children: [fn.length > 0 && d.jsx(Wn, {
                items: fn,
                onRemove: es,
                removeLabel: D("pdfAnnotation.layout.attachments.remove")
              }), d.jsxs("div", {
                className: "sl-chat-input-row",
                children: [d.jsx("button", {
                  type: "button",
                  className: "sl-chat-attach",
                  onClick: () => {
                    var e;
                    if ((e = Vn.current) == null) {
                      return undefined;
                    } else {
                      return e.click();
                    }
                  },
                  disabled: !cr || St || fn.length >= 4,
                  "aria-label": D("pdfAnnotation.layout.attachments.add"),
                  title: D("pdfAnnotation.layout.attachments.add"),
                  children: d.jsx(ue, {
                    size: 16
                  })
                }), d.jsx("textarea", {
                  ref: Gn,
                  value: un,
                  onChange: e => dn(e.target.value),
                  onKeyDown: us,
                  onPaste: ns,
                  placeholder: D(St ? "pdfAnnotation.layout.voiceListeningPlaceholder" : te ? ne ? tn ? "pdfAnnotation.layout.answerPlaceholder" : Ee ? "pdfAnnotation.layout.sendToContinue" : _t ? "pdfAnnotation.layout.voiceInterruptLoading" : "pdfAnnotation.layout.askPlaceholder" : "pdfAnnotation.layout.preparing" : "pdfAnnotation.layout.connecting"),
                  disabled: !cr || St,
                  rows: 1
                }), cs("chat"), ye ? d.jsx("button", {
                  className: "sl-morph-send",
                  onClick: () => Xe(),
                  title: D("pdfAnnotation.layout.stopGenerating"),
                  style: {
                    background: "#ef4444"
                  },
                  children: d.jsx(Se, {
                    size: 12,
                    color: "#fff"
                  })
                }) : d.jsx("button", {
                  className: "sl-morph-send",
                  onClick: rs,
                  disabled: !un.trim() && Jr.length === 0 || Vr || !cr,
                  children: d.jsx(de, {
                    size: 12,
                    color: "#fff"
                  })
                })]
              })]
            })
          }), d.jsx("input", {
            ref: Vn,
            type: "file",
            multiple: true,
            accept: "image/png,image/jpeg,.png,.jpg,.jpeg",
            style: {
              display: "none"
            },
            onChange: e => {
              Qr(e.target.files);
              e.target.value = "";
            }
          })]
        })
      })]
    })]
  });
}
export { Gn as SplitLayout };