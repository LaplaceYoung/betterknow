var e = Object.defineProperty;
var t = (t, n, r) => ((t, n, r) => n in t ? e(t, n, {
  enumerable: true,
  configurable: true,
  writable: true,
  value: r
}) : t[n] = r)(t, typeof n != "symbol" ? n + "" : n, r);
import { g as n, af as r, b as i, r as s, ag as a, ah as o, c as l, j as c, F as u, M as d, B as m, C as h, l as p, k as b, u as f, R as w, z as g } from "./index-TjoB2Buo.js";
import { P as v, M as y, u as x, r as S, p as k, a as j, I as _, C as N, N as C, L as I, K as M, V as P, E as R, b as T, c as E, s as L, h as A } from "./VoiceModeModal-6HRRb_4A.js";
import { a as O } from "./addErrorLog-Dxv53mIo.js";
import { a as D, c as $, s as z, b as U, d as B, i as W, e as F, f as q, p as H, g as J, C as K, h as G, B as Y, j as Z, k as Q, D as X, l as V, m as ee, n as te, o as ne, W as re, q as ie, r as se, t as ae, M as oe } from "./MessageBubble-SHcXdv80.js";
import { l as le, s as ce } from "./voicePrefs-rmmbxoX2.js";
import { C as ue } from "./check-BBSENZCf.js";
import { X as de } from "./x-BPqZ-rfi.js";
import { f as me, A as he, V as pe } from "./VoiceSettingsModal-Bp7qApl4.js";
import { P as be, A as fe } from "./plus-jBDDhggQ.js";
import { P as we, g as ge } from "./PreparingModal-Bthg5dgq.js";
import { C as ve } from "./CourseFeedbackEntry-yXmrvWpY.js";
import { C as ye, P as xe, a as Se, V as ke, b as je } from "./percentages-BXMCSKIN-CoqTm4Ai.js";
import { D as _e } from "./download-dDsBfY4e.js";
import { r as Ne } from "./index-qYFgNVxk.js";
import "./createLucideIcon-B4HcG4gb.js";
import "./loader-circle-BZEIbChB.js";
import "./copy-jHTWzodI.js";
import "./index-CMJxjNZ8.js";
import "./with-selector-U5gkSzzZ.js";
import "./BugReportModal-DxKVyQda.js";
class Ce {
  constructor() {
    t(this, "ws", null);
    t(this, "messageHandler", null);
    t(this, "closeHandler", null);
    t(this, "sessionId", null);
    t(this, "pendingPings", new Map());
    t(this, "pendingModelProbe", null);
  }
  setMessageHandler(e) {
    this.messageHandler = e;
  }
  setCloseHandler(e) {
    this.closeHandler = e;
  }
  connect() {
    return new Promise((e, t) => {
      const i = n();
      const s = `${r().replace(/\/+$/, "")}/api/v1/whiteboard/ws`;
      const a = i ? `${s}?access_token=${encodeURIComponent(i)}` : s;
      this.ws = new WebSocket(a);
      this.ws.onopen = () => {
        e();
      };
      this.ws.onmessage = e => {
        var t;
        try {
          const n = JSON.parse(e.data);
          if (n.type === "pong") {
            const e = this.pendingPings.get(n.t);
            if (e) {
              this.pendingPings.delete(n.t);
              e(Math.round(performance.now() - n.t));
            }
            return;
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
          if (n.type === "session_ready" && (this.sessionId = n.session_id ?? null, this.sessionId)) {
            try {
              localStorage.setItem("whiteboard_session_id", this.sessionId);
            } catch {}
          }
          if ((t = this.messageHandler) != null) {
            t.call(this, n);
          }
        } catch (n) {}
      };
      this.ws.onerror = e => {
        t(e);
      };
      this.ws.onclose = () => {
        var e;
        this.settleDiagnostics();
        if ((e = this.closeHandler) != null) {
          e.call(this);
        }
      };
    });
  }
  startSession() {
    var e;
    if (((e = this.ws) == null ? undefined : e.readyState) === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({
        type: "start_session"
      }));
    }
  }
  resumeSession(e) {
    var t;
    if (((t = this.ws) == null ? undefined : t.readyState) === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({
        type: "resume_session",
        session_id: e
      }));
    }
  }
  resumeOrStartCourseSession(e) {
    var t;
    if (((t = this.ws) == null ? undefined : t.readyState) === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({
        type: "resume_or_start_course_session",
        course_session_id: e
      }));
    }
  }
  sendMessage(e, t, n, r, i, s) {
    var a;
    if (((a = this.ws) == null ? undefined : a.readyState) === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({
        type: "user_message",
        message: e,
        pivot: s || undefined,
        lecture_outline_id: t || undefined,
        attachments: (n == null ? undefined : n.length) ? n : undefined,
        answer: r ?? undefined,
        audio_b64: (i == null ? undefined : i.audioB64) || undefined,
        audio_mime: (i == null ? undefined : i.mime) || undefined,
        audio_duration_ms: (i == null ? undefined : i.durationMs) || undefined
      }));
    }
  }
  setLectureOutline(e) {
    var t;
    if (((t = this.ws) == null ? undefined : t.readyState) === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({
        type: "set_lecture_outline",
        lecture_outline_id: e
      }));
    }
  }
  setTtsConfig(e, t) {
    var n;
    if (((n = this.ws) == null ? undefined : n.readyState) === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({
        type: "set_tts_config",
        voice_id: e,
        speed: t
      }));
    }
  }
  sendActionStepComplete(e) {
    var t;
    if (((t = this.ws) == null ? undefined : t.readyState) === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({
        type: "action_step_complete",
        step_id: e
      }));
    }
  }
  sendNarrationPause(e) {
    var t;
    if (((t = this.ws) == null ? undefined : t.readyState) === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({
        type: "narration_pause",
        paused: e
      }));
    }
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
  sendSyncWhiteboardState(e) {
    var t;
    if (((t = this.ws) == null ? undefined : t.readyState) === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({
        type: "sync_whiteboard_state",
        whiteboard_state: e
      }));
    }
  }
  pauseSession(e) {
    var t;
    if (((t = this.ws) == null ? undefined : t.readyState) === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({
        type: "pause_session",
        whiteboard_state: e
      }));
    }
  }
  resumeGeneration() {
    var e;
    if (((e = this.ws) == null ? undefined : e.readyState) === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({
        type: "resume_generation"
      }));
    }
  }
  startTeaching() {
    var e;
    if (((e = this.ws) == null ? undefined : e.readyState) === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({
        type: "start_teaching"
      }));
    }
  }
  sendQuestionAnswers(e) {
    var t;
    if (((t = this.ws) == null ? undefined : t.readyState) === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({
        type: "question_answers",
        answers: e
      }));
    }
  }
  sendStepCompletionResponse(e) {
    var t;
    if (((t = this.ws) == null ? undefined : t.readyState) === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({
        type: "step_completion_response",
        action: e
      }));
    }
  }
  stopGeneration() {
    var e;
    if (((e = this.ws) == null ? undefined : e.readyState) === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({
        type: "stop_generation"
      }));
    }
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
    this.closeHandler = null;
    this.settleDiagnostics();
    if ((e = this.ws) != null) {
      e.close();
    }
    this.ws = null;
    this.sessionId = null;
  }
  get isConnected() {
    var e;
    return ((e = this.ws) == null ? undefined : e.readyState) === WebSocket.OPEN;
  }
}
const Ie = "retry=1";
const Me = e => e.includes("?") ? `${e}&${Ie}` : `${e}?${Ie}`;
function Pe(e) {
  let t = false;
  const n = () => {
    if (!t) {
      t = true;
      e();
    }
  };
  if (document.hidden) {
    window.setTimeout(n, 0);
  } else {
    window.requestAnimationFrame(() => window.requestAnimationFrame(n));
    window.setTimeout(n, 1000);
  }
}
const Re = /[\u3400-\u4dbf\u4e00-\u9fff\u3040-\u30ff\uac00-\ud7af]/g;
let Te = null;
const Ee = "content_to_be_written";
function Le(e, t, n) {
  const r = t > 0 ? t : 1;
  const i = Math.min(4, Math.max(0.25, (n > 0 ? n : 1) / r));
  try {
    e.preservesPitch = true;
    e.webkitPreservesPitch = true;
    e.playbackRate = i;
  } catch {}
}
function Ae(e) {
  try {
    const t = performance.getEntriesByName(e, "resource");
    if (!t.length) {
      return null;
    }
    const n = t[t.length - 1];
    const r = n.responseStart > 0;
    const i = e => Number(e.toFixed(1));
    const s = n.transferSize === 0 && n.encodedBodySize === 0;
    return {
      net_ttfb_ms: r ? i(n.responseStart - n.requestStart) : null,
      net_download_ms: r ? i(n.responseEnd - n.responseStart) : null,
      net_total_ms: i(n.duration),
      net_transfer_bytes: r && !s ? n.transferSize : null,
      net_encoded_bytes: r && !s ? n.encodedBodySize : null,
      net_kbps: r && !s && n.responseEnd > n.responseStart && n.encodedBodySize ? i(n.encodedBodySize / (n.responseEnd - n.responseStart)) : null
    };
  } catch {
    return null;
  }
}
const Oe = new Set(["note_card", "board_image", "mermaid_graph", "board_animation"]);
function De(e, t, n) {
  if (!e || n < 0 || n >= e.columns.length) {
    return t;
  }
  const r = t.filter(e => e.columnIndex === n && Oe.has(e.kind));
  if (r.length === 0) {
    return t;
  }
  const i = [...r].sort((e, t) => e.y !== t.y ? e.y - t.y : e.id.localeCompare(t.id));
  let s = i[0].y;
  const a = new Map();
  for (const u of i) {
    const e = Math.max(40, u.h ?? 80);
    a.set(u.id, s);
    s += e + V;
  }
  const o = i[i.length - 1];
  const l = Math.max(40, o.h ?? 80);
  const c = e.columns[n];
  if (c) {
    c.nextY = (a.get(o.id) ?? o.y) + l + V;
  }
  if (i.some(e => a.get(e.id) !== e.y)) {
    return t.map(e => a.has(e.id) ? {
      ...e,
      y: a.get(e.id)
    } : e);
  } else {
    return t;
  }
}
function $e(e, t) {
  return e.filter(e => e.columnIndex === t && Oe.has(e.kind));
}
function ze(e, t, n) {
  const r = e.columns[n];
  if (!r) {
    return;
  }
  let i = -Infinity;
  for (const s of t) {
    if (s.columnIndex === n && Oe.has(s.kind)) {
      i = Math.max(i, s.y + Math.max(40, s.h ?? 80));
    }
  }
  if (i !== -Infinity) {
    r.nextY = Math.max(r.nextY, i + V);
  }
}
function Ue(e, t) {
  if (Number.isFinite(e.lp.gridTop)) {
    return e.lp.gridTop;
  }
  const n = new Map();
  for (const i of t) {
    if (i.columnIndex === undefined || !Oe.has(i.kind)) {
      continue;
    }
    const e = n.get(i.columnIndex);
    if (e === undefined || i.y < e) {
      n.set(i.columnIndex, i.y);
    }
  }
  const r = [...n.values()].filter(e => Number.isFinite(e));
  if (r.length === 0) {
    return e.lp.gridTop;
  } else {
    return Math.min(...r);
  }
}
function Be(e, t, n) {
  const r = e.columns[n];
  if (!!r && !($e(t, n).length > 0)) {
    r.nextY = Ue(e, t);
  }
}
function We(e, t) {
  const n = e == null ? undefined : e.trim();
  if (n && typeof t == "number" && !(t < 0)) {
    return a.t("whiteboard.caption.referencePage", {
      source: n,
      page: t + 1
    });
  }
}
function Fe(e, t) {
  if (t) {
    const n = e.find(e => e.id === t && e.kind === "note_card" && e.keypoint);
    if (n) {
      return n;
    }
  }
  for (let n = e.length - 1; n >= 0; n--) {
    const t = e[n];
    if (t && t.kind === "note_card" && t.keypoint) {
      return t;
    }
  }
}
const qe = "page-1";
const He = () => a.t("whiteboard.status.sessionComplete");
function Je(e) {
  return JSON.parse(JSON.stringify(e));
}
function Ke(e) {
  const t = e;
  const n = t.columnIndex ?? t.column_index;
  const r = Number(n);
  if (Number.isInteger(r) && r >= 0) {
    return r;
  } else {
    return null;
  }
}
function Ge(e, t = []) {
  if (!e || typeof e != "object") {
    return null;
  }
  const n = e;
  const r = Array.isArray(n.columns) ? n.columns : [];
  const i = Number(n.activeIndex ?? n.active_index ?? 0);
  const s = Number.isFinite(i) ? Math.trunc(i) : 0;
  const a = r.length > 0 ? Math.max(0, Math.min(s, r.length - 1)) : 0;
  const o = r.length > 0 ? Math.max(a, function (e, t) {
    let n = 0;
    for (const r of e) {
      const e = Ke(r);
      if (e !== null && e < t) {
        n = Math.max(n, e);
      }
    }
    return n;
  }(t, r.length)) : 0;
  return {
    ...n,
    activeIndex: o,
    columns: r
  };
}
function Ye(e) {
  if (!e || typeof e != "object") {
    return null;
  }
  const t = e;
  const n = Number.isFinite(Number(t.revision)) ? Math.max(0, Number(t.revision)) : 0;
  const r = (Array.isArray(t.pages) ? t.pages : []).map((e, t) => {
    if (!e || typeof e != "object") {
      return null;
    }
    const n = e;
    const r = n.overlayItems ?? n.overlay_items;
    const i = n.excalidrawElements ?? n.excalidraw_elements;
    const s = Array.isArray(r) ? r : [];
    return {
      id: String(n.id || `page-${t + 1}`),
      title: typeof n.title == "string" ? n.title : undefined,
      overlayItems: s,
      columnLayout: Ge(n.columnLayout ?? n.column_layout, s),
      excalidrawElements: Array.isArray(i) ? i : []
    };
  }).filter(e => e !== null);
  if (r.length === 0) {
    const e = t.overlayItems ?? t.overlay_items;
    const n = Array.isArray(e) ? e : [];
    r.push({
      id: qe,
      overlayItems: n,
      columnLayout: Ge(t.columnLayout ?? t.column_layout, n),
      excalidrawElements: []
    });
  }
  (function (e) {
    let t = 0;
    for (const n of e) {
      for (const e of n.overlayItems ?? []) {
        if (e.kind === "note_card") {
          if (typeof e.boardUid != "number") {
            e.boardUid = t;
            t += 1;
          } else {
            t = Math.max(t, e.boardUid + 1);
          }
        }
      }
    }
  })(r);
  const i = String(t.activePageId || t.active_page_id || r[0].id);
  return {
    version: 1,
    revision: n,
    activePageId: r.some(e => e.id === i) ? i : r[0].id,
    pages: r
  };
}
function Ze(e) {
  if (String(e.type || "") !== "ask") {
    return null;
  }
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
function Qe(e) {
  if (e.mode === "choice") {
    return a.t("whiteboard.action.askChoice");
  } else {
    return a.t("whiteboard.action.askOpen");
  }
}
function Xe(e) {
  const t = [];
  if (e.question) {
    t.push(e.question);
  }
  if (e.mode === "choice") {
    t.push(e.options.map((e, t) => `${t + 1}. ${e}`).join("\n"));
  }
  return t.join("\n\n");
}
function Ve() {
  const {
    t: e
  } = i();
  const [t, n] = s.useState(false);
  const [r, c] = s.useState(false);
  const [u, d] = s.useState(null);
  const m = s.useRef(null);
  const h = s.useRef(1);
  const [p, b] = s.useState(null);
  const [f, w] = s.useState(null);
  const [g, y] = s.useState(false);
  const x = s.useRef(null);
  const [S, k] = s.useState(null);
  const j = s.useRef(null);
  const [_, N] = s.useState(null);
  const [C, I] = s.useState(null);
  const M = s.useRef(false);
  const [P, R] = s.useState([]);
  const [T, E] = s.useState({
    tts: "idle",
    boardNotes: "idle"
  });
  const [L, A] = s.useState(null);
  const [te, ne] = s.useState(false);
  const re = s.useRef(false);
  re.current = te;
  const [ie, se] = s.useState(null);
  const [ae, oe] = s.useState(false);
  const [ue, de] = s.useState(null);
  const [me, he] = s.useState(new Set());
  const [pe, be] = s.useState(false);
  const [fe, we] = s.useState(0);
  const ge = s.useRef(false);
  const [ve, ye] = s.useState([]);
  const [xe, Se] = s.useState(() => le());
  s.useEffect(() => {
    m.current = u;
  }, [u]);
  s.useEffect(() => {
    if (xe == null ? undefined : xe.speed) {
      h.current = xe.speed;
    }
  }, [xe]);
  const [ke, je] = s.useState(false);
  const _e = s.useRef(false);
  const Ne = s.useRef(false);
  const [Ie, Oe] = s.useState([]);
  const [Ke, Ge] = s.useState("active");
  const [Ve, et] = s.useState(qe);
  const [tt, nt] = s.useState(null);
  const [rt, it] = s.useState([{
    id: qe,
    overlayItems: [],
    columnLayout: null,
    excalidrawElements: []
  }]);
  const st = s.useRef(null);
  const at = s.useRef(() => {});
  const ot = s.useRef(null);
  const lt = s.useRef(null);
  const ct = s.useRef(1200);
  const ut = s.useRef(800);
  const dt = s.useRef(0);
  const mt = s.useRef(0);
  const ht = s.useRef(0);
  const pt = s.useRef(0);
  const bt = s.useRef(1);
  const ft = s.useRef([]);
  const wt = s.useCallback(e => {
    const t = ft.current;
    const n = e(t);
    if (n !== t) {
      ft.current = n;
      Oe(n);
    }
  }, []);
  const gt = s.useRef(qe);
  const vt = s.useRef(null);
  const yt = s.useRef([{
    id: qe,
    overlayItems: [],
    columnLayout: null,
    excalidrawElements: []
  }]);
  const xt = s.useRef(0);
  const St = s.useRef(null);
  const kt = s.useRef(false);
  const jt = s.useRef(null);
  const _t = s.useRef(new Map());
  const Nt = s.useRef(new Map());
  const Ct = s.useRef(new Map());
  const It = s.useRef(new Map());
  const Mt = s.useRef([]);
  const Pt = s.useRef(new Map());
  const Rt = s.useRef(new Map());
  const Tt = s.useRef(undefined);
  const Et = s.useRef(() => {});
  const Lt = s.useRef(null);
  const At = s.useRef(null);
  const Ot = s.useRef(new Map());
  const Dt = s.useRef([]);
  const $t = s.useRef(false);
  const zt = s.useRef(0);
  const Ut = s.useRef(new Set());
  const Bt = s.useRef(null);
  const Wt = s.useRef(() => {});
  const Ft = s.useRef(null);
  const qt = s.useRef(null);
  const Ht = s.useRef(false);
  const [Jt, Kt] = s.useState(false);
  const Gt = s.useRef(new Map());
  const Yt = s.useRef(new Map());
  const Zt = s.useRef(new Map());
  const [Qt, Xt] = s.useState("");
  const Vt = s.useRef("");
  Vt.current = Qt;
  const [en, tn] = s.useState(0);
  const [nn, rn] = s.useState("idle");
  const sn = s.useRef("idle");
  const an = s.useCallback(e => {
    sn.current = e;
    rn(e);
  }, []);
  const [on, ln] = s.useState("");
  const [cn, un] = s.useState("");
  const dn = s.useRef("");
  const mn = s.useRef(null);
  const hn = s.useRef(false);
  const pn = s.useRef(null);
  const bn = s.useRef([]);
  const fn = s.useRef(null);
  const wn = s.useRef(false);
  const gn = s.useRef(false);
  const vn = s.useRef(false);
  const yn = s.useRef("none");
  const xn = s.useRef("");
  const Sn = s.useRef("");
  const kn = s.useRef(false);
  const jn = s.useRef(null);
  const _n = s.useRef(false);
  const Nn = s.useRef(() => {});
  const Cn = s.useRef(() => {});
  const In = s.useRef(() => {});
  const Mn = s.useRef(() => {});
  const Pn = s.useRef(() => {});
  const Rn = s.useRef(false);
  const Tn = s.useRef(() => {});
  const En = s.useRef(null);
  const Ln = s.useRef(null);
  const An = s.useRef(() => {});
  const On = s.useRef(null);
  const Dn = s.useRef(null);
  const $n = s.useRef(null);
  const zn = s.useRef(() => {});
  s.useEffect(() => {
    gt.current = Ve;
  }, [Ve]);
  s.useEffect(() => {
    vt.current = tt;
  }, [tt]);
  s.useEffect(() => {
    yt.current = rt;
  }, [rt]);
  s.useEffect(() => () => {
    Ot.current.forEach(e => clearTimeout(e));
    Ot.current.clear();
    Pt.current.forEach(e => window.clearTimeout(e.failSafeTimer));
    Pt.current.clear();
    if (St.current) {
      clearTimeout(St.current);
    }
  }, []);
  s.useEffect(() => {
    const e = new Audio();
    Ft.current = e;
    return () => {
      zt.current += 1;
      Wt.current();
      e.pause();
      e.src = "";
    };
  }, []);
  const Un = s.useRef(() => {});
  const Bn = s.useCallback((e, t, n) => {
    const r = n > 0 ? n : 1;
    const i = Math.abs(e - ht.current) > 10;
    const s = Math.abs(t - pt.current) > 10;
    const a = Math.abs(r - bt.current) > 0.01;
    if (i || s || a) {
      ht.current = e;
      pt.current = t;
      bt.current = r;
      ct.current = e;
      ut.current = t;
      if (!ot.current) {
        Un.current();
      }
    }
  }, []);
  const Wn = s.useCallback(e => {
    st.current = e;
  }, []);
  const Fn = s.useCallback(() => st.current, []);
  const qn = s.useCallback(e => {
    dt.current = Math.max(0, Math.round(e));
  }, []);
  const Hn = s.useCallback(e => {
    mt.current = Math.max(0, Math.round(e));
  }, []);
  const Jn = s.useCallback(e => {
    var t;
    const n = st.current;
    if (!n || !e) {
      return;
    }
    const r = n.getAppState();
    const i = ((t = r.zoom) == null ? undefined : t.value) && r.zoom.value > 0 ? r.zoom.value : 1;
    const s = typeof r.scrollX == "number" ? r.scrollX : 0;
    const a = typeof r.scrollY == "number" ? r.scrollY : 0;
    D(n, s + e / i, a, 450);
  }, []);
  const Kn = s.useCallback(e => {
    if (e != null) {
      if (Te != null) {
        Te.sendActionStepComplete(e);
      }
    }
  }, []);
  zn.current = Kn;
  const Gn = s.useCallback((e = gt.current) => ({
    id: e,
    overlayItems: Je(ft.current).map(e => {
      const t = {
        ...e
      };
      delete t.animateReveal;
      delete t.revealGateStep;
      delete t.revealGateOpen;
      return t;
    }),
    columnLayout: ot.current ? Je(ot.current) : null,
    excalidrawElements: []
  }), []);
  const Yn = s.useCallback(() => {
    const e = Gn();
    const t = yt.current.map(t => t.id === e.id ? {
      ...t,
      ...e,
      title: t.title
    } : t);
    const n = t.some(t => t.id === e.id) ? t : [...t, e];
    yt.current = n;
    it(n);
  }, [Gn]);
  const Zn = s.useCallback(e => {
    const t = Gn();
    const n = yt.current.map(e => e.id === t.id ? {
      ...e,
      ...t,
      title: e.title
    } : e);
    const r = n.some(e => e.id === t.id) ? n : [...n, t];
    return {
      version: 1,
      revision: e,
      activePageId: t.id,
      pages: r
    };
  }, [Gn]);
  const Qn = s.useCallback(() => {
    if (!(Te == null ? undefined : Te.isConnected) || !u) {
      return null;
    }
    if (St.current) {
      clearTimeout(St.current);
      St.current = null;
    }
    xt.current += 1;
    const e = Zn(xt.current);
    Te.sendSyncWhiteboardState(e);
    return e;
  }, [Zn, u]);
  const Xn = s.useCallback(() => {
    if (!kt.current && (Te == null ? undefined : Te.isConnected) && u) {
      if (St.current) {
        clearTimeout(St.current);
      }
      St.current = setTimeout(() => {
        Qn();
      }, 500);
    }
  }, [Qn, u]);
  s.useEffect(() => {
    if (!kt.current) {
      Yn();
      Xn();
    }
  }, [Ie, Xn, Yn]);
  const Vn = s.useRef(1);
  const er = s.useCallback(() => {
    if (hn.current) {
      return;
    }
    if (Bt.current) {
      clearTimeout(Bt.current);
      Bt.current = null;
    }
    if (Dt.current.length === 0) {
      $t.current = false;
      Kt(false);
      return;
    }
    const e = Dt.current.shift();
    $t.current = true;
    qt.current = e.stepId;
    A(e.url);
    E(e => ({
      ...e,
      tts: "completed"
    }));
    const t = Ft.current;
    if (t) {
      Wt.current();
      Wt.current = () => {};
      const r = Gt.current.get(e.stepId) ?? "";
      const i = Yt.current.get(e.stepId) ?? {
        cjk: ((n = r).match(Re) || []).length,
        latin: (n.match(/[A-Za-z0-9]/g) || []).length
      };
      const s = i.cjk + i.latin;
      let a = false;
      let o = false;
      let l = zt.current;
      const c = () => zt.current === l;
      const u = () => {
        if (a || !c()) {
          return;
        }
        a = true;
        Et.current(e.stepId);
        const t = Gt.current.get(e.stepId);
        if (t != null) {
          Xt(t);
          tn(e => e + 1);
        }
        const n = Zt.current.get(e.stepId);
        if (n) {
          Zt.current.delete(e.stepId);
          n();
        }
      };
      const d = () => {
        u();
        if (!o && c()) {
          o = true;
          zn.current(e.stepId);
          Ut.current.delete(e.stepId);
          $t.current = false;
          er();
        }
      };
      const p = (n, r, a) => {
        const c = zt.current + 1;
        zt.current = c;
        l = c;
        const b = () => zt.current === c;
        const f = n === 0 ? "stream" : "retry";
        t.src = r;
        t.muted = Ht.current;
        Vn.current = e.renderedSpeed;
        Le(t, e.renderedSpeed, h.current);
        Kt(true);
        const w = Date.now();
        const g = document.visibilityState;
        let v = null;
        let y = 0;
        let x = false;
        let S = null;
        let k = null;
        const j = () => t.buffered.length ? Number(t.buffered.end(t.buffered.length - 1).toFixed(2)) : 0;
        const _ = (i, a) => {
          if (b()) {
            O({
              conversation_id: m.current ?? "",
              conversation_type: "whiteboard",
              error_type: i,
              error_data: {
                where: "whiteboard_narration",
                origin: "client",
                timestamp: new Date().toISOString(),
                url: r,
                url_kind: f,
                attempt: n,
                step_id: e.stepId,
                text_chars: s,
                played_s: Number(t.currentTime.toFixed(2)),
                wall_s: Number(((Date.now() - w) / 1000).toFixed(2)),
                time_to_playing_ms: v == null ? null : v - w,
                ...(Ae(r) ?? {}),
                muted: t.muted,
                paused: t.paused,
                visibility: document.visibilityState,
                ready_state: t.readyState,
                network_state: t.networkState,
                ...a
              }
            });
          }
        };
        const N = () => {
          if (k) {
            clearTimeout(k);
            k = null;
          }
        };
        const C = () => {
          t.removeEventListener("loadedmetadata", M);
          t.removeEventListener("playing", P);
          t.removeEventListener("ended", T);
          t.removeEventListener("error", E);
          t.removeEventListener("waiting", R);
          t.removeEventListener("stalled", R);
          if (S) {
            clearTimeout(S);
            S = null;
          }
          N();
          if (Bt.current) {
            clearTimeout(Bt.current);
            Bt.current = null;
          }
        };
        Wt.current = C;
        const I = t => {
          C();
          if (n === 0) {
            p(1, Me(e.url), t);
          } else {
            d();
          }
        };
        const M = () => {
          if (!b() || a == null || !Number.isFinite(a) || a <= 0) {
            return;
          }
          const e = t.duration;
          const n = Number.isFinite(e) ? Math.min(a, Math.max(0, e - 0.25)) : a;
          if (!(n <= 0)) {
            try {
              t.currentTime = n;
            } catch {}
          }
        };
        const P = () => {
          if (b()) {
            if (v == null) {
              v = Date.now();
              if (S) {
                clearTimeout(S);
                S = null;
              }
              t.addEventListener("waiting", R);
              t.addEventListener("stalled", R);
            }
            N();
            u();
          }
        };
        const R = e => {
          if (!b()) {
            return;
          }
          if (e.type === "stalled" && j() - t.currentTime >= 1) {
            return;
          }
          y += 1;
          if (!x) {
            x = true;
            _("client_audio_stalled", {
              reason: e.type,
              buffered_end: j(),
              ms_since_playing: v == null ? null : Date.now() - v,
              stall_count: y
            });
          }
          if (k) {
            return;
          }
          const r = t.currentTime;
          const i = Date.now();
          const s = () => {
            k = null;
            if (b()) {
              if (!(t.currentTime > r + 0.05)) {
                if (t.paused || t.readyState > 2) {
                  k = setTimeout(s, 1000);
                } else if (n === 0) {
                  _("client_audio_stalled", {
                    reason: "stall_recover_file",
                    recovered_via_file: true,
                    stalled_ms: Date.now() - i,
                    buffered_end: j(),
                    ms_since_playing: v == null ? null : Date.now() - v,
                    stall_count: y
                  });
                  I(t.currentTime);
                }
              }
            }
          };
          k = setTimeout(s, 45000);
        };
        const T = () => {
          if (!b()) {
            return;
          }
          const n = t.currentTime;
          s = i;
          a = e.renderedSpeed;
          const r = (s.cjk / 4.9 + s.latin / 15) / Math.max(0.25, a || 1);
          var s;
          var a;
          const o = {
            expected_s: Number(r.toFixed(2)),
            ratio: r > 0 ? Number((n / r).toFixed(3)) : null,
            buffered_end: j(),
            stall_count: y,
            visibility_start: g,
            visibility_end: document.visibilityState,
            speed: h.current,
            rendered_speed: e.renderedSpeed
          };
          if (r >= 1 && n < r * 0.55) {
            _("client_audio_truncated", {
              reason: "played_shorter_than_text",
              ...o
            });
          } else {
            _("client_audio_ok", o);
          }
          C();
          d();
        };
        const E = () => {
          var e;
          var r;
          if (b() && !o) {
            _("client_audio_error", {
              reason: "media_error",
              media_error_code: ((e = t.error) == null ? undefined : e.code) ?? null,
              media_error_message: ((r = t.error) == null ? undefined : r.message) ?? null,
              retrying: n === 0
            });
            I(v == null ? null : t.currentTime);
          }
        };
        const L = () => {
          S = setTimeout(() => {
            S = null;
            if (b() && v == null) {
              if (t.paused) {
                L();
              } else {
                _("client_audio_never_started", {
                  reason: "no_playing_within_start_timeout",
                  start_timeout_ms: 30000,
                  buffered_end: j(),
                  retrying: n === 0
                });
                I(null);
              }
            }
          }, 30000);
        };
        t.addEventListener("loadedmetadata", M);
        t.addEventListener("playing", P);
        t.addEventListener("ended", T);
        t.addEventListener("error", E);
        L();
        const A = () => {
          Bt.current = setTimeout(() => {
            Bt.current = null;
            if (b()) {
              if (t.paused) {
                A();
              } else {
                _("client_audio_never_ended", {
                  reason: "watchdog_90s",
                  buffered_end: j(),
                  stall_count: y
                });
                C();
                d();
              }
            }
          }, 90000);
        };
        A();
        t.play().catch(e => {
          if (!b() || o) {
            return;
          }
          const t = (e == null ? undefined : e.name) ?? null;
          const r = n === 0 && t !== "AbortError" && t !== "NotAllowedError";
          _("client_audio_blocked", {
            reason: "play_rejected",
            error_name: t,
            error_message: String((e == null ? undefined : e.message) ?? e).slice(0, 300),
            retrying: r
          });
          if (r) {
            I(null);
          } else {
            C();
            d();
          }
        });
      };
      p(e.attempt, e.attempt === 0 ? e.url : Me(e.url), null);
    } else {
      setTimeout(() => {
        Et.current(e.stepId);
        const t = Zt.current.get(e.stepId);
        if (t) {
          Zt.current.delete(e.stepId);
          t();
        }
        zn.current(e.stepId);
        Ut.current.delete(e.stepId);
        $t.current = false;
        er();
      }, 100);
    }
    var n;
  }, []);
  Mn.current = er;
  const tr = s.useCallback(e => {
    Ht.current = e;
    if (Ft.current) {
      Ft.current.muted = e;
    }
  }, []);
  const nr = s.useCallback((e, t = "clip") => {
    var n;
    let r = false;
    if (hn.current) {
      if (sn.current === "listening") {
        return true;
      }
      if ((n = jn.current) != null) {
        n.stop();
      }
      jn.current = null;
      bn.current = [];
      const e = pn.current;
      if (e) {
        e.onended = null;
        e.onerror = null;
        e.onplaying = null;
        e.pause();
      }
      gn.current = false;
      An.current();
      sr.current(On.current);
      On.current = null;
      hn.current = false;
      mn.current = null;
      r = true;
    }
    const i = Ft.current;
    const s = r ? kn.current : !!i && !!i.src && !i.paused;
    if (!r && !s && !re.current) {
      return false;
    }
    let a;
    hn.current = true;
    kn.current = s;
    vn.current = false;
    yn.current = "none";
    bn.current = [];
    gn.current = false;
    dn.current = "";
    ln("");
    un("");
    fn.current = Vt.current;
    wn.current = false;
    an("listening");
    if (s && i) {
      a = Math.max(0, Math.round(i.currentTime * 1000));
      i.pause();
      Kt(false);
    }
    _n.current = t === "live";
    xn.current = "";
    Sn.current = "";
    $n.current = null;
    if (t === "live") {
      Dn.current = null;
      On.current = qr({
        type: "user",
        content: "🎤 …"
      });
    }
    if (Te != null) {
      Te.interjectStart({
        source: e,
        mode: t,
        stepId: qt.current ?? undefined,
        offsetMs: a
      });
    }
    return true;
  }, []);
  const rr = s.useCallback(() => {
    var e;
    if (hn.current) {
      An.current();
      if ((e = jn.current) != null) {
        e.stop();
      }
      jn.current = null;
      _n.current = false;
      hn.current = false;
      mn.current = null;
      an("idle");
      if (Te != null) {
        Te.interjectResume();
      }
      window.setTimeout(() => {
        if (hn.current) {
          return;
        }
        const e = fn.current;
        fn.current = null;
        if (e !== null) {
          Xt(e);
          tn(e => e + 1);
        }
        const t = Ft.current;
        if (kn.current && t && t.src && t.paused) {
          t.play().then(() => Kt(true)).catch(() => {});
        } else if (!$t.current) {
          Mn.current();
        }
      }, 350);
    }
  }, []);
  In.current = rr;
  const ir = s.useCallback(e => {
    if (e) {
      R(t => t.filter(t => t.id !== e || t.type !== "user" || !t.content.startsWith("🎤")));
    }
  }, []);
  const sr = s.useRef(ir);
  sr.current = ir;
  s.useEffect(() => {
    if (nn === "idle") {
      return;
    }
    const e = nn === "listening" ? 200000 : nn === "thinking" ? 30000 : 120000;
    const t = window.setTimeout(() => {
      var e;
      vn.current = true;
      An.current();
      sr.current(On.current);
      On.current = null;
      if ((e = jn.current) != null) {
        e.stop();
      }
      jn.current = null;
      In.current();
    }, e);
    return () => window.clearTimeout(t);
  }, [nn]);
  const ar = s.useCallback(() => {
    var e;
    const t = yn.current;
    if (t === "none") {
      In.current();
      return;
    }
    yn.current = "none";
    const n = Sn.current;
    const r = xn.current.trim();
    const i = $n.current;
    Sn.current = "";
    xn.current = "";
    $n.current = null;
    An.current();
    if ((e = jn.current) != null) {
      e.stop();
    }
    jn.current = null;
    hn.current = false;
    mn.current = null;
    an("idle");
    if (Te != null) {
      Te.interjectResume();
    }
    Rn.current = true;
    Nn.current();
    if (t === "stop") {
      return;
    }
    const s = r.replace(/[^\p{L}\p{N}]/gu, "");
    if (n) {
      Cn.current(n);
    } else if (i && s.length > 0 && s.length < 5) {
      Tn.current(i);
    } else if (r) {
      Cn.current(r);
    } else if (i) {
      Tn.current(i);
    }
  }, []);
  Pn.current = ar;
  An.current = () => {
    const e = Ln.current;
    if (e) {
      Ln.current = null;
      R(t => t.map(t => t.id === e ? {
        ...t,
        isStreaming: false
      } : t));
    }
  };
  const or = s.useCallback(() => {
    if (!hn.current) {
      return;
    }
    const e = bn.current.shift();
    if (!e) {
      gn.current = false;
      if (vn.current) {
        Pn.current();
      }
      return;
    }
    gn.current = true;
    an("answering");
    let t = pn.current;
    if (!t) {
      t = new Audio();
      pn.current = t;
    }
    t.onended = null;
    t.onerror = null;
    t.onplaying = null;
    t.src = e.url;
    t.muted = Ht.current;
    t.onplaying = () => {
      if (hn.current && e.text) {
        wn.current = true;
        Xt(e.text);
        tn(e => e + 1);
      }
    };
    t.onended = () => lr.current();
    t.onerror = () => lr.current();
    t.play().catch(() => lr.current());
  }, [rr]);
  const lr = s.useRef(() => {});
  lr.current = or;
  const cr = s.useCallback(e => {
    if (!hn.current) {
      return;
    }
    Sn.current = e.text ?? "";
    xn.current = "";
    $n.current = e.audioB64 && e.mime ? {
      audioB64: e.audioB64,
      mime: e.mime
    } : null;
    if (e.text) {
      ln(e.text);
    }
    Dn.current = mn.current;
    On.current = qr({
      type: "user",
      content: e.text || "🎤 …"
    });
    an("thinking");
    const t = Ft.current;
    if (Te != null) {
      Te.interjectQuestion({
        ...e,
        offsetMs: kn.current && t ? Math.max(0, Math.round(t.currentTime * 1000)) : undefined
      });
    }
  }, []);
  const ur = s.useCallback(e => {
    if (hn.current) {
      if (Te != null) {
        Te.interjectAudioChunk(e);
      }
    }
  }, []);
  const dr = s.useCallback(() => {
    if (hn.current) {
      an("thinking");
      if (Te != null) {
        Te.interjectAudioEnd();
      }
    }
  }, []);
  const mr = s.useCallback(() => {
    var e;
    if (!hn.current) {
      return;
    }
    if (sn.current !== "listening") {
      if (_n.current) {
        if (Te != null) {
          Te.interjectAudioEnd();
        }
      }
      return;
    }
    sr.current(On.current);
    On.current = null;
    if ((e = jn.current) != null) {
      e.stop();
    }
    jn.current = null;
    bn.current = [];
    const t = pn.current;
    if (t) {
      t.onended = null;
      t.onerror = null;
      t.pause();
    }
    rr();
  }, [rr]);
  const hr = s.useCallback(() => {
    const e = Ft.current;
    if (e && e.src) {
      if (e.paused) {
        e.play().then(() => {
          Kt(true);
          if (Te != null) {
            Te.sendNarrationPause(false);
          }
        }).catch(() => {});
      } else {
        e.pause();
        Kt(false);
        if (Te != null) {
          Te.sendNarrationPause(true);
        }
      }
    }
  }, []);
  const pr = s.useRef("initial");
  const br = s.useRef(null);
  const fr = s.useCallback(() => {
    $();
    br.current = null;
    pr.current = "initial";
    const e = st.current;
    if (!e) {
      return;
    }
    const t = () => {
      e.updateScene({
        appState: {
          scrollX: 0,
          scrollY: 0,
          zoom: {
            value: X
          }
        }
      });
    };
    z(e, 0, 0);
    t();
    for (const n of [50, 120, 220, 360, 520]) {
      window.setTimeout(t, n);
    }
  }, []);
  const wr = s.useCallback((e, t) => {
    const n = br.current;
    if (!n || n.id !== e) {
      return;
    }
    br.current = null;
    const r = st.current;
    if (!r) {
      return;
    }
    const i = () => ft.current.find(t => t.id === e);
    const s = () => {
      var e;
      return ((e = i()) == null ? undefined : e.y) ?? n.top;
    };
    const a = () => {
      var e;
      return ((e = i()) == null ? undefined : e.x) ?? n.x;
    };
    const o = () => {
      var e;
      return ((e = i()) == null ? undefined : e.w) ?? n.w;
    };
    const l = () => s() + t / 2;
    const c = () => {
      var e;
      const t = r.getAppState();
      const n = ((e = t.zoom) == null ? undefined : e.value) && t.zoom.value > 0 ? t.zoom.value : 1;
      const i = t.width && t.width > 0 ? t.width : 1200;
      const s = t.height && t.height > 0 ? t.height : pt.current || 800;
      const a = Math.min(dt.current, Math.max(0, i - 1));
      const o = Math.min(mt.current, Math.max(0, i - a - 1));
      const l = Math.max(1, i - a - o);
      const c = Math.max(1, s);
      const u = l / n;
      const d = c / n;
      const m = typeof t.scrollX == "number" ? t.scrollX : 0;
      const h = typeof t.scrollY == "number" ? t.scrollY : 0;
      const p = o / n - m;
      const b = -h / n;
      return {
        currentZoom: n,
        visibleWidthCss: l,
        visibleHeightCss: c,
        visibleWidthScene: u,
        visibleHeightScene: d,
        leftInsetCss: o,
        curScrollX: m,
        curScrollY: h,
        viewLeft: p,
        viewTop: b,
        viewRight: p + u,
        viewBottom: b + d
      };
    };
    const u = e => {
      window.setTimeout(() => {
        const n = c();
        const i = a();
        const l = o();
        const u = s();
        const d = i + l;
        const m = i + l / 2;
        const h = u + t / 2;
        const p = i < n.viewLeft || d > n.viewRight;
        const b = Math.min(Math.max(n.visibleHeightCss * 0.11, 48), 112) / n.currentZoom;
        const f = p ? (n.leftInsetCss + n.visibleWidthCss / 2) / n.currentZoom - m : n.curScrollX;
        const w = e === "top" ? -(u - b) * n.currentZoom : -(h - n.visibleHeightScene / 2) * n.currentZoom;
        D(r, f, w, 600);
      }, 200);
    };
    const {
      currentZoom: d,
      visibleHeightCss: m,
      visibleHeightScene: h,
      viewLeft: p,
      viewTop: b,
      viewRight: f,
      viewBottom: w
    } = c();
    if (n.strategy === "center-y") {
      $();
      const e = a();
      const t = e + o();
      if (e < p || t > f) {
        u("center-y");
      } else {
        U(r, undefined, l(), 600, {
          mode: "center-y",
          resolveTargetY: l
        });
      }
      return;
    }
    const g = s();
    const v = g + t;
    const y = a();
    const x = y + o();
    const S = y < p || x > f;
    if (!(t > h)) {
      if (g < b || v > w || S) {
        $();
        if (S) {
          u("center-y");
        } else {
          U(r, undefined, l(), 600, {
            mode: "center-y",
            resolveTargetY: l
          });
        }
        return;
      } else {
        return undefined;
      }
    }
    $();
    if (S) {
      u("top");
    } else {
      const e = Math.min(Math.max(m * 0.11, 48), 112) / d;
      const t = () => s() - e;
      U(r, undefined, t(), 600, {
        mode: "top",
        resolveTargetY: t
      });
    }
  }, []);
  const gr = s.useCallback(e => {
    var t;
    const n = st.current;
    const r = ot.current;
    if (!n || !r || r.columns.length === 0) {
      return;
    }
    $();
    const i = n.getAppState();
    const s = ((t = i.zoom) == null ? undefined : t.value) && i.zoom.value > 0 ? i.zoom.value : 1;
    const a = i.width && i.width > 0 ? i.width : 1200;
    const o = i.height && i.height > 0 ? i.height : pt.current || 800;
    const l = Math.min(dt.current, Math.max(0, a - 1));
    const c = Math.min(mt.current, Math.max(0, a - l - 1));
    const u = Math.max(1, a - l - c);
    const d = u / s;
    const m = typeof i.scrollX == "number" ? i.scrollX : 0;
    const h = c / s - m;
    const p = h + d;
    const b = r.columns;
    const f = b[0].x;
    const w = b[b.length - 1];
    const g = w.x + w.w;
    const v = g - f;
    const y = b[e] ?? w;
    const x = Math.min(Math.max(o * 0.11, 48), 112) - r.lp.gridTop * s;
    let S = m;
    if (!(y.x >= h) || !(y.x + y.w <= p)) {
      S = (c + u / 2) / s - (v <= d * 0.4 ? (f + g) / 2 : y.x + y.w / 2);
    }
    D(n, S, x, 600);
  }, []);
  const vr = s.useCallback(() => {
    const e = ct.current;
    const t = ut.current;
    const n = B(e, t);
    lt.current = n;
    const r = n.gridLeft + 24;
    const i = W(n.tileW);
    ot.current = F(n, r, i);
    pr.current = "initial";
  }, []);
  Un.current = vr;
  const yr = s.useCallback(() => {
    if (At.current != null) {
      window.clearTimeout(At.current);
      At.current = null;
    }
    Lt.current = null;
    Mt.current = [];
    Pt.current.forEach(e => window.clearTimeout(e.failSafeTimer));
    Pt.current.clear();
    Rt.current.forEach(e => window.clearTimeout(e.failSafeTimer));
    Rt.current.clear();
    Tt.current = undefined;
  }, []);
  const xr = s.useCallback(e => {
    const t = Pt.current.get(e);
    if (t) {
      Pt.current.delete(e);
      window.clearTimeout(t.failSafeTimer);
      t.finish();
    }
  }, []);
  const Sr = s.useCallback((e, t, n) => {
    const r = Math.min(30000, 4000 + t * 24);
    const i = window.setTimeout(() => xr(e), r);
    Pt.current.set(e, {
      finish: n,
      failSafeTimer: i
    });
  }, [xr]);
  const kr = s.useCallback(e => {
    if (e == null) {
      return;
    }
    const t = Rt.current.get(e);
    if (t) {
      Rt.current.delete(e);
      window.clearTimeout(t.failSafeTimer);
      wt(e => e.map(e => e.id !== t.overlayId || e.kind !== "note_card" || e.revealGateOpen ? e : {
        ...e,
        revealGateOpen: true
      }));
    }
  }, [wt]);
  Et.current = kr;
  const jr = s.useCallback((e, t) => {
    const n = () => {
      if (hn.current) {
        const t = Rt.current.get(e);
        if (t) {
          t.failSafeTimer = window.setTimeout(n, 8000);
        }
        return;
      }
      Et.current(e);
    };
    const r = window.setTimeout(n, 8000);
    Rt.current.set(e, {
      overlayId: t,
      failSafeTimer: r
    });
  }, []);
  const _r = s.useCallback((e, t) => {
    kt.current = true;
    fr();
    br.current = null;
    pr.current = "follow";
    if (!(t == null ? undefined : t.preserveStreamState)) {
      jt.current = null;
      _t.current.clear();
      Nt.current.clear();
      Ct.current.clear();
      It.current.clear();
      yr();
    }
    ot.current = e.columnLayout ? Je(e.columnLayout) : null;
    if (!ot.current) {
      vr();
    }
    const n = function (e, t) {
      if (!e) {
        return t;
      }
      const n = Ue(e, t);
      let r = false;
      const i = new Map();
      for (let s = 0; s < e.columns.length; s++) {
        const a = $e(t, s);
        if (a.length === 0) {
          const t = e.columns[s];
          if (t && t.nextY !== n) {
            t.nextY = n;
          }
          continue;
        }
        const o = [...a].sort((e, t) => e.y !== t.y ? e.y - t.y : e.id.localeCompare(t.id));
        let l = n;
        for (const e of o) {
          if (e.y !== l) {
            r = true;
          }
          i.set(e.id, l);
          l += Math.max(40, e.h ?? 80) + V;
        }
        const c = e.columns[s];
        if (c) {
          c.nextY = l;
        }
      }
      if (r) {
        return t.map(e => i.has(e.id) ? {
          ...e,
          y: i.get(e.id)
        } : e);
      } else {
        return t;
      }
    }(ot.current, Je(e.overlayItems ?? []));
    wt(() => n);
    window.setTimeout(() => {
      kt.current = false;
    }, 0);
  }, [wt, yr, vr, fr]);
  const Nr = s.useCallback(e => {
    const t = yt.current.find(t => t.id === e);
    if (!t || t.id === gt.current) {
      return;
    }
    const n = Gn();
    const r = yt.current.map(e => e.id === n.id ? {
      ...e,
      ...n,
      title: e.title
    } : e);
    yt.current = r;
    it(r);
    gt.current = t.id;
    et(t.id);
    _r(t, {
      preserveStreamState: vt.current != null
    });
    window.setTimeout(Xn, 0);
  }, [_r, Xn, Gn]);
  const Cr = s.useCallback(e => {
    const t = (e || vt.current || "").trim();
    if (!t || t === gt.current) {
      return;
    }
    const n = yt.current.find(e => e.id === t);
    if (!n) {
      return;
    }
    const r = Gn();
    const i = yt.current.map(e => e.id === r.id ? {
      ...e,
      ...r,
      title: e.title
    } : e);
    yt.current = i;
    it(i);
    gt.current = n.id;
    et(n.id);
    _r(n, {
      preserveStreamState: true
    });
    window.setTimeout(Xn, 0);
  }, [_r, Xn, Gn]);
  const Ir = s.useCallback((e, t) => {
    const n = Gn();
    const r = yt.current.length + 1;
    const i = e == null ? undefined : e.trim();
    const s = {
      id: (t == null ? undefined : t.trim()) || `page-${Date.now().toString(36)}`,
      title: i || `Page ${r}`,
      overlayItems: [],
      columnLayout: null,
      excalidrawElements: []
    };
    const a = [...yt.current.map(e => e.id === n.id ? {
      ...e,
      ...n,
      title: e.title
    } : e), s];
    yt.current = a;
    it(a);
    gt.current = s.id;
    et(s.id);
    _r(s, {
      preserveStreamState: vt.current != null
    });
    window.setTimeout(Xn, 0);
    return s.id;
  }, [_r, Xn, Gn]);
  const Mr = s.useCallback(e => {
    wt(t => t.some(t => t.id === e.id) ? t : [...t, e]);
  }, [wt]);
  const Pr = s.useRef(() => {});
  const Rr = s.useRef(() => {});
  const Tr = s.useRef(() => {});
  const Er = s.useCallback((e, t, n, r, i) => {
    const s = e.trim();
    if (!s) {
      E(e => ({
        ...e,
        boardNotes: "completed"
      }));
      return;
    }
    E(e => ({
      ...e,
      boardNotes: "generating"
    }));
    const a = pr.current;
    pr.current = "follow";
    try {
      const e = ot.current;
      if (!e) {
        return;
      }
      const o = ft.current;
      const l = e.lp.tileW;
      const c = q(l);
      const u = function (e, t) {
        return {
          title: t.trim(),
          content: e.trim(),
          type: "formula",
          importance: 2,
          column: 1
        };
      }(s, (t == null ? undefined : t.trim()) ?? "");
      if (a === "newcol") {
        Be(e, o, e.activeIndex);
      }
      ze(e, o, e.activeIndex);
      const d = H(e, c);
      const m = crypto.randomUUID();
      jt.current = m;
      if (r != null) {
        r(m);
      }
      const h = {
        id: m,
        kind: "note_card",
        x: d.x,
        y: d.y,
        w: d.w,
        h: d.h,
        columnIndex: d.columnIndex,
        keypoint: u,
        ...(n != null ? {
          boardUid: n
        } : {}),
        animateReveal: true,
        ...(i != null ? {
          revealGateStep: i,
          revealGateOpen: false
        } : {}),
        decorations: []
      };
      if (i != null) {
        jr(i, m);
      }
      Mr(h);
      if (a === "newcol") {
        const e = d.columnIndex;
        queueMicrotask(() => gr(e));
      } else if (a === "follow") {
        br.current = {
          id: m,
          x: d.x,
          top: d.y,
          w: d.w,
          strategy: "fit-visible"
        };
      } else {
        const e = d.x;
        const t = d.y;
        queueMicrotask(() => {
          const n = st.current;
          if (n) {
            J(n, e, t);
          }
        });
      }
      E(e => ({
        ...e,
        boardNotes: "completed"
      }));
    } catch (o) {
      E(e => ({
        ...e,
        boardNotes: "error"
      }));
    }
  }, [gr, jr, Mr]);
  s.useEffect(() => {
    Tr.current = Er;
  }, [Er]);
  const Lr = s.useCallback(e => {
    if (Lt.current !== e) {
      return;
    }
    if (At.current != null) {
      window.clearTimeout(At.current);
      At.current = null;
    }
    Lt.current = null;
    const t = Mt.current.shift();
    if (!t) {
      return;
    }
    let n = null;
    Tr.current(t.content, t.title, t.boardUid, e => {
      n = e;
      Rr.current(e);
    }, t.revealGateStep);
    if (n) {
      Sr(n, t.content.length, t.finishBoard);
    } else {
      Pe(t.finishBoard);
    }
  }, [Sr]);
  Pr.current = Lr;
  const Ar = s.useCallback(e => {
    Lt.current = e;
    if (At.current != null) {
      window.clearTimeout(At.current);
    }
    At.current = window.setTimeout(() => {
      At.current = null;
      if (Lt.current === e) {
        Pr.current(e);
      }
    }, 400);
  }, []);
  Rr.current = Ar;
  const Or = s.useCallback(() => {
    for (const t of [...Pt.current.keys()]) {
      xr(t);
    }
    const e = Mt.current.splice(0);
    for (const t of e) {
      Tr.current(t.content, t.title, t.boardUid, undefined, t.revealGateStep);
      Pe(t.finishBoard);
    }
  }, [xr]);
  const Dr = s.useCallback(() => {
    while (Mt.current.length > 0) {
      Mt.current.shift().finishBoard();
    }
  }, []);
  const $r = s.useCallback((e, t, n, r) => {
    var i;
    const s = ot.current;
    if (!s) {
      return null;
    }
    const a = crypto.randomUUID();
    if ((r == null ? undefined : r.pending) && typeof r.pendingStepId == "number") {
      Nt.current.set(r.pendingStepId, a);
    }
    const o = pr.current;
    pr.current = "follow";
    const l = ft.current;
    const c = Fe(l, jt.current);
    const u = o === "newcol" ? s.activeIndex : c && typeof c.columnIndex == "number" ? c.columnIndex : s.activeIndex;
    if (o === "newcol") {
      Be(s, l, u);
    }
    ze(s, l, u);
    const d = ((i = s.columns[u]) == null ? undefined : i.w) ?? K;
    const m = Math.max(64, Math.round(d * 0.9));
    const h = t && n && t > 0 ? n / t : 0.58;
    const p = Math.max(48, Math.round(m * h)) + ((r == null ? undefined : r.caption) ? 112 : 0);
    const b = G(s, u, p, m);
    const f = {
      id: a,
      kind: "board_image",
      x: b.x,
      y: b.y,
      w: m,
      h: p,
      columnIndex: b.columnIndex,
      boardImage: {
        imageUrl: e,
        width: t,
        height: n,
        caption: r == null ? undefined : r.caption,
        pending: (r == null ? undefined : r.pending) ?? false,
        pendingStepId: r == null ? undefined : r.pendingStepId
      }
    };
    Mr(f);
    if (o === "newcol") {
      const e = b.columnIndex;
      queueMicrotask(() => gr(e));
    } else if (o !== "follow") {
      const e = b.x;
      const t = b.y;
      queueMicrotask(() => {
        const n = st.current;
        if (n) {
          U(n, e, t, 450, {
            mode: "anchor"
          });
        }
      });
    } else {
      br.current = {
        id: a,
        x: b.x,
        top: b.y,
        w: m,
        strategy: "center-y"
      };
    }
    return a;
  }, [gr, Mr]);
  const zr = s.useCallback((e, t, n) => {
    var r;
    const i = ot.current;
    if (!i) {
      return null;
    }
    const s = crypto.randomUUID();
    if ((n == null ? undefined : n.pending) && typeof n.pendingStepId == "number") {
      Ct.current.set(n.pendingStepId, s);
    }
    const a = pr.current;
    pr.current = "follow";
    const o = ft.current;
    const l = Fe(o, jt.current);
    const c = a === "newcol" ? i.activeIndex : l && typeof l.columnIndex == "number" ? l.columnIndex : i.activeIndex;
    if (a === "newcol") {
      Be(i, o, c);
    }
    ze(i, o, c);
    const u = ((r = i.columns[c]) == null ? undefined : r.w) ?? K;
    const d = Math.max(380, u);
    const m = G(i, c, 420, d);
    const h = {
      id: s,
      kind: "board_animation",
      x: m.x,
      y: m.y,
      w: m.w,
      h: m.h,
      columnIndex: m.columnIndex,
      boardAnimation: {
        html: e,
        task: t,
        pending: (n == null ? undefined : n.pending) ?? false,
        pendingStepId: n == null ? undefined : n.pendingStepId
      }
    };
    Mr(h);
    if (a === "newcol") {
      queueMicrotask(() => gr(m.columnIndex));
    } else if (a !== "follow") {
      const e = m.x;
      const t = m.y;
      queueMicrotask(() => {
        const n = st.current;
        if (n) {
          U(n, e, t, 450, {
            mode: "anchor"
          });
        }
      });
    } else {
      br.current = {
        id: s,
        x: m.x,
        top: m.y,
        w: m.w,
        strategy: "center-y"
      };
    }
    return s;
  }, [gr, Mr]);
  const Ur = s.useCallback(e => {
    const t = It.current.get(e);
    if (typeof t == "number") {
      It.current.delete(e);
      Kn(t);
    }
  }, [Kn]);
  const Br = s.useCallback((e, t) => {
    var n;
    if (!ot.current) {
      vr();
    }
    const r = ot.current;
    if (!r) {
      if (typeof t == "number") {
        window.setTimeout(() => Kn(t), 20);
      }
      return;
    }
    const i = crypto.randomUUID();
    if (typeof t == "number") {
      _t.current.set(i, t);
    }
    const s = pr.current;
    pr.current = "follow";
    const a = ft.current;
    const o = r.lp;
    const l = Fe(a, jt.current);
    const c = (l == null ? undefined : l.h) ?? q(o.tileW);
    const u = s === "newcol" ? r.activeIndex : l && typeof l.columnIndex == "number" ? l.columnIndex : r.activeIndex;
    if (s === "newcol") {
      Be(r, a, u);
    }
    ze(r, a, u);
    const d = ((n = r.columns[u]) == null ? undefined : n.w) ?? K;
    const m = Math.min(Math.round(Y * Z), Math.round(o.tileW * 0.55 * Z), d);
    const {
      w: h
    } = function (e, t, n, r, i) {
      const s = i !== undefined && Number.isFinite(i) ? i : Infinity;
      const a = Math.min(Math.round(Y * Z), Math.round(e.tileW * 0.5 * Z), s);
      const o = t && t > 0 ? t : a;
      const l = n;
      const c = r && r > 80 ? Math.min(Math.round(r + 36), 420) : 280;
      const u = Math.min(1, a / o, c / l);
      return {
        w: Math.max(64, Math.round(o * u)),
        h: Math.max(48, Math.round(l * u))
      };
    }(o, m, 64, Math.min(c + 40, 220), d);
    const p = G(r, u, 80, h);
    const b = {
      id: i,
      kind: "mermaid_graph",
      x: p.x,
      y: p.y,
      w: p.w,
      h: p.h,
      columnIndex: p.columnIndex,
      mermaidGraph: {
        source: e
      }
    };
    Mr(b);
    if (s === "newcol") {
      const e = p.columnIndex;
      queueMicrotask(() => gr(e));
    } else if (s !== "follow") {
      const e = p.x;
      const t = p.y;
      queueMicrotask(() => {
        const n = st.current;
        if (n) {
          U(n, e, t, 450, {
            mode: "anchor"
          });
        }
      });
    } else {
      br.current = {
        id: i,
        x: p.x,
        top: p.y,
        w: h,
        strategy: "center-y"
      };
    }
  }, [Kn, vr, gr, Mr]);
  const Wr = s.useCallback((e, t, n, r) => {
    if (Math.abs(r) < 4) {
      return e;
    }
    const i = ot.current;
    if (i) {
      const e = i.columns[t];
      if (e) {
        e.nextY += r;
      }
    }
    return e.map(e => e.columnIndex === t && e.y > n ? {
      ...e,
      y: e.y + r
    } : e);
  }, []);
  const Fr = s.useCallback((e, t) => {
    const n = Math.max(80, Math.min(1200, Math.round(t)));
    wt(t => {
      const r = t.find(t => t.id === e);
      if (!r || r.kind !== "board_animation") {
        return t;
      }
      const i = n - (r.h ?? 0);
      if (Math.abs(i) < 4) {
        return t;
      }
      let s = t.map(t => t.id === e ? {
        ...t,
        h: n
      } : t);
      if (r.columnIndex !== undefined) {
        s = Wr(s, r.columnIndex, r.y, i);
        s = De(ot.current, s, r.columnIndex);
      }
      return s;
    });
    wr(e, n);
  }, [wt, Wr, wr]);
  const qr = s.useCallback(e => {
    const t = {
      ...e,
      id: crypto.randomUUID(),
      timestamp: Date.now()
    };
    R(e => [...e, t]);
    return t.id;
  }, []);
  const Hr = s.useCallback((e, t = false) => {
    if (j.current) {
      clearTimeout(j.current);
    }
    k({
      text: e,
      dismissible: t
    });
    if (!t) {
      j.current = window.setTimeout(() => k(null), 3000);
    }
  }, []);
  const Jr = s.useCallback(() => {
    if (j.current) {
      clearTimeout(j.current);
    }
    k(null);
  }, []);
  const Kr = s.useCallback(e => {
    N(e);
  }, []);
  const Gr = s.useCallback(() => {
    Kn(_ == null ? undefined : _.stepId);
    N(null);
  }, [Kn, _]);
  const Yr = s.useCallback(() => {
    if (!M.current) {
      M.current = true;
      I(e => e ?? {
        beatPercent: 10 + Math.floor(Math.random() * 21)
      });
    }
  }, []);
  const Zr = s.useCallback(() => {
    I(null);
  }, []);
  s.useEffect(() => () => {
    if (j.current) {
      clearTimeout(j.current);
    }
  }, []);
  const Qr = s.useCallback((e, t) => {
    R(n => n.map(n => n.id === e ? {
      ...n,
      ...t
    } : n));
  }, []);
  const Xr = s.useCallback(() => {
    R(e => e.some(e => e.type === "status" && e.content === He()) ? e : [...e, {
      id: crypto.randomUUID(),
      type: "status",
      content: He(),
      timestamp: Date.now()
    }]);
  }, []);
  const Vr = s.useCallback(e => {
    const t = e == null ? undefined : e.trim();
    if (t) {
      vt.current = t;
      nt(t);
    }
  }, []);
  const ei = s.useCallback(e => {
    const t = (e == null ? undefined : e.trim()) || vt.current;
    if (t) {
      Vr(t);
      Cr(t);
    }
  }, [Cr, Vr]);
  const ti = s.useRef(new Map());
  const ni = s.useRef(new Map());
  const ri = s.useRef(null);
  const ii = s.useCallback(t => {
    var r;
    var i;
    const s = t;
    switch (t.type) {
      case "connection_established":
        n(true);
        break;
      case "session_ready":
        {
          d(s.session_id ?? null);
          b(typeof s.session_title == "string" && s.session_title.trim() ? s.session_title.trim() : null);
          w(typeof s.conversation_id == "string" && s.conversation_id.trim() ? s.conversation_id.trim() : null);
          y(false);
          const t = s.status === "paused" || s.status === "completed" ? s.status : "active";
          Ge(t);
          const n = Array.isArray(s.messages) ? s.messages : [];
          if (n.length > 0) {
            R(function (e) {
              const t = [];
              for (const n of e) {
                const e = n.timestamp && Date.parse(n.timestamp) || Date.now();
                if (n.role === "user") {
                  t.push({
                    id: `stored-${n.index}`,
                    type: "user",
                    content: n.content,
                    timestamp: e,
                    attachments: (n.attachments || []).filter(e => e && e.file_id).map(e => ({
                      fileId: e.file_id,
                      filename: e.filename || e.file_id
                    }))
                  });
                  continue;
                }
                if (n.role !== "assistant") {
                  continue;
                }
                const r = n.content.split(/\n+/).map(e => e.trim()).filter(Boolean);
                for (let i = 0; i < r.length; i++) {
                  try {
                    const s = JSON.parse(r[i]);
                    const o = String(s.type || "");
                    if (o === "speak") {
                      t.push({
                        id: `stored-${n.index}-${i}`,
                        type: "assistant_text",
                        content: String(s.spoken_text || ""),
                        timestamp: e
                      });
                    } else if (o === "board") {
                      const r = String(s.board_content || s[Ee] || "");
                      t.push({
                        id: `stored-${n.index}-${i}`,
                        type: "action",
                        actionKind: "board",
                        actionLabel: String(s.title || a.t("whiteboard.action.board")),
                        actionDetail: r,
                        content: String(s.title || a.t("whiteboard.action.board")),
                        timestamp: e
                      });
                    } else if (o === "new_page") {
                      const r = String(s.title || a.t("whiteboard.action.newPage"));
                      t.push({
                        id: `stored-${n.index}-${i}`,
                        type: "action",
                        actionKind: "page",
                        actionLabel: r,
                        actionDetail: a.t("whiteboard.action.switchedToNewPage"),
                        content: r,
                        timestamp: e
                      });
                    } else if (o === "graph") {
                      t.push({
                        id: `stored-${n.index}-${i}`,
                        type: "action",
                        actionKind: "graph",
                        actionLabel: a.t("whiteboard.action.graph"),
                        actionDetail: String(s.mermaid || ""),
                        content: a.t("whiteboard.action.graphShort"),
                        timestamp: e
                      });
                    } else if (o === "ask") {
                      const r = Ze(s);
                      if (r) {
                        t.push({
                          id: `stored-${n.index}-${i}`,
                          type: "action",
                          actionKind: "ask",
                          actionLabel: Qe(r),
                          actionDetail: Xe(r),
                          content: Qe(r),
                          timestamp: e
                        });
                      }
                    } else if (o === "reward_user") {
                      const r = String(s.master_concept_title || "").trim();
                      const o = String(s.master_concept_description || "").trim();
                      t.push({
                        id: `stored-${n.index}-${i}`,
                        type: "action",
                        actionKind: "reward",
                        actionLabel: r || a.t("whiteboard.action.reward"),
                        actionDetail: o,
                        content: r || a.t("whiteboard.action.reward"),
                        timestamp: e
                      });
                    } else if (o === "image_generation" || o === "animation" || o === "highlight" || o === "circle") {
                      t.push({
                        id: `stored-${n.index}-${i}`,
                        type: "action",
                        actionKind: o === "image_generation" ? "image" : o,
                        actionLabel: o === "image_generation" ? a.t("whiteboard.action.image") : o === "animation" ? a.t("whiteboard.action.animation") : o === "highlight" ? a.t("whiteboard.action.highlight") : a.t("whiteboard.action.circle"),
                        actionDetail: String(s.prompt || s.task || s.snippet || ""),
                        content: o,
                        timestamp: e
                      });
                    } else if (o === "group") {
                      (Array.isArray(s.actions) ? s.actions : []).forEach((r, s) => {
                        if (!r || typeof r != "object") {
                          return;
                        }
                        const o = r;
                        const l = String(o.type || "");
                        if (l === "speak") {
                          t.push({
                            id: `stored-${n.index}-${i}-${s}`,
                            type: "assistant_text",
                            content: String(o.spoken_text || ""),
                            timestamp: e
                          });
                        } else if (l === "board") {
                          const r = String(o.board_content || o[Ee] || "");
                          t.push({
                            id: `stored-${n.index}-${i}-${s}`,
                            type: "action",
                            actionKind: "board",
                            actionLabel: String(o.title || a.t("whiteboard.action.board")),
                            actionDetail: r,
                            content: String(o.title || a.t("whiteboard.action.board")),
                            timestamp: e
                          });
                        }
                      });
                    }
                  } catch {}
                }
              }
              return t;
            }(s.messages));
          } else {
            R([]);
          }
          de(function (e) {
            const t = e[e.length - 1];
            if (!t || t.role !== "assistant") {
              return null;
            }
            const n = t.content.split(/\n+/).map(e => e.trim()).filter(Boolean);
            for (let r = n.length - 1; r >= 0; r--) {
              try {
                const e = JSON.parse(n[r]);
                if (e.type === "done") {
                  continue;
                }
                if (e.type === "ask") {
                  const t = Ze(e);
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
              } catch {
                return null;
              }
            }
            return null;
          }(n));
          he(s.session === true ? new Set() : function (e) {
            const t = new Set();
            for (const n of e) {
              if (n.role === "assistant") {
                for (const e of n.content.split(/\n+/)) {
                  const n = e.trim();
                  if (n && n.includes("keypoint")) {
                    try {
                      const e = JSON.parse(n);
                      if ((e.type === "keypoint_complete" || e.type === "keypoint") && typeof e.index == "number" && e.index >= 0) {
                        t.add(e.index);
                      }
                    } catch {}
                  }
                }
              }
            }
            return t;
          }(n));
          be(s.session === true);
          if (s.session === true) {
            Xr();
          }
          if (s.resumed) {
            if (n.some(e => e.role === "assistant")) {
              Hr(e("courseSession.resumedConversation"), true);
            } else if (_e.current) {
              je(true);
            } else {
              Ne.current = false;
              Hr(e("courseSession.newConversation"));
              if (Te != null) {
                Te.startTeaching();
              }
            }
          }
          ye([]);
          vt.current = null;
          nt(null);
          jt.current = null;
          _t.current.clear();
          Nt.current.clear();
          Ct.current.clear();
          It.current.clear();
          ri.current = null;
          yr();
          zt.current += 1;
          Wt.current();
          Ut.current.clear();
          Zt.current.clear();
          Dt.current = [];
          $t.current = false;
          if (Ft.current) {
            Ft.current.pause();
            Ft.current.src = "";
          }
          if (Bt.current) {
            clearTimeout(Bt.current);
            Bt.current = null;
          }
          const r = s.resumed ? Ye(s.whiteboard_state) : null;
          if (r) {
            xt.current = r.revision;
            yt.current = r.pages;
            it(r.pages);
            gt.current = r.activePageId;
            et(r.activePageId);
            const e = r.pages.find(e => e.id === r.activePageId) ?? r.pages[0];
            _r(e);
          } else {
            fr();
            xt.current = 0;
            gt.current = qe;
            et(qe);
            const e = {
              id: qe,
              overlayItems: [],
              columnLayout: null,
              excalidrawElements: []
            };
            yt.current = [e];
            it([e]);
            wt(() => []);
            vr();
          }
          c(true);
          const i = le();
          if (i) {
            if (Te != null) {
              Te.setTtsConfig(i.voiceId, i.speed);
            }
          }
          break;
        }
      case "lecture_outline_selected":
        if (s.ok) {
          if (_e.current) {
            je(true);
          } else {
            Ne.current = false;
            Hr(e("courseSession.newConversation"));
            if (Te != null) {
              Te.startTeaching();
            }
          }
        }
        break;
      case "tts_config":
        {
          const e = {
            voiceId: s.voice_id,
            speed: s.speed
          };
          Se(e);
          ce(e);
          break;
        }
      case "group":
        {
          const e = Array.isArray(s.actions) ? s.actions : [];
          const t = e.find(e => !!e && typeof e == "object" && e.type === "speak" && e.step_id != null);
          const n = t == null ? undefined : t.step_id;
          for (const r of e) {
            if (r && typeof r == "object") {
              if (n != null && r.type === "board") {
                Tt.current = n;
              }
              at.current(r);
            }
          }
          Tt.current = undefined;
          break;
        }
      case "interject_ready":
        mn.current = s.interject_id ?? null;
        if (_n.current && s.mode && s.mode !== "live") {
          sr.current(On.current);
          On.current = null;
          In.current();
          break;
        }
        if (On.current && Dn.current === null) {
          Dn.current = mn.current;
        }
        break;
      case "voice_transcript":
        {
          const e = (s.text ?? "").trim();
          const t = En.current;
          if (e && t) {
            En.current = null;
            R(n => n.map(n => n.id === t && n.type === "user" ? {
              ...n,
              content: e
            } : n));
          }
          break;
        }
      case "interject_user_text":
        {
          if (s.interject_id !== Dn.current) {
            break;
          }
          if (s.retract === true) {
            const e = On.current;
            On.current = null;
            Dn.current = null;
            xn.current = "";
            if (e) {
              R(t => t.filter(t => t.id !== e || t.type !== "user"));
            }
            break;
          }
          const e = s.delta ?? "";
          if (!e) {
            break;
          }
          xn.current += e;
          const t = On.current;
          if (t) {
            R(n => n.map(n => {
              if (n.id !== t || n.type !== "user") {
                return n;
              }
              const r = n.content.startsWith("🎤") ? "" : n.content;
              return {
                ...n,
                content: r + e
              };
            }));
          }
          break;
        }
      case "interject_text":
        {
          if (s.interject_id !== mn.current) {
            break;
          }
          const e = s.delta ?? "";
          dn.current += e;
          un(t => t + e);
          if (Ln.current) {
            const t = Ln.current;
            R(n => n.map(n => n.id === t ? {
              ...n,
              content: n.content + e
            } : n));
          } else {
            Ln.current = qr({
              type: "assistant_text",
              content: e,
              isStreaming: true
            });
          }
          break;
        }
      case "interject_pcm":
        {
          if (s.interject_id !== mn.current) {
            break;
          }
          let e = jn.current;
          if (!e) {
            e = new v();
            e.setMuted(Ht.current);
            e.setSpeed(h.current);
            e.onDrained = () => Pn.current();
            jn.current = e;
            an("answering");
          }
          e.push(s.pcm_b64, s.sample_rate || 24000);
          if (dn.current) {
            wn.current = true;
            Xt(dn.current);
            tn(e => e + 1);
          }
          break;
        }
      case "interject_audio":
        {
          if (s.interject_id !== mn.current) {
            break;
          }
          const e = s.audio_url;
          if (!e) {
            break;
          }
          bn.current.push({
            url: e.startsWith("http") ? e : l(e),
            text: s.text ?? ""
          });
          if (!gn.current) {
            lr.current();
          }
          break;
        }
      case "interject_done":
        if (s.interject_id !== mn.current) {
          break;
        }
        vn.current = true;
        yn.current = s.control === "stop" || s.control === "replan" ? s.control : "none";
        An.current();
        sr.current(On.current);
        On.current = null;
        if (!wn.current && (s.text ?? "").trim()) {
          wn.current = true;
          Xt((s.text ?? "").trim());
          tn(e => e + 1);
        }
        if (jn.current) {
          jn.current.markComplete();
        } else if (!gn.current && bn.current.length === 0) {
          Pn.current();
        }
        break;
      case "interject_error":
        if (s.interject_id !== mn.current) {
          break;
        }
        vn.current = true;
        un(e => e || (s.message ?? ""));
        An.current();
        sr.current(On.current);
        On.current = null;
        if ((r = jn.current) != null) {
          r.stop();
        }
        jn.current = null;
        if (!gn.current) {
          In.current();
        }
        break;
      case "speak":
        {
          const e = s.spoken_text ?? "";
          const t = s.step_id;
          if (t != null) {
            Zt.current.set(t, () => {
              R(t => [...t, {
                id: crypto.randomUUID(),
                type: "assistant_text",
                content: e,
                timestamp: Date.now(),
                isStreaming: false
              }]);
            });
            Ut.current.add(t);
            Gt.current.set(t, e);
          } else {
            R(t => [...t, {
              id: crypto.randomUUID(),
              type: "assistant_text",
              content: e,
              timestamp: Date.now(),
              isStreaming: false
            }]);
          }
          break;
        }
      case "tts_segment":
        {
          const e = s.step_id;
          const t = s;
          const n = t.tts_cjk;
          const r = t.tts_latin;
          if (e != null && typeof n == "number" && typeof r == "number") {
            Yt.current.set(e, {
              cjk: n,
              latin: r
            });
          }
          const i = s.skipped === true;
          const a = s.audio_url;
          if (i || !a) {
            if (e != null) {
              kr(e);
              const t = Gt.current.get(e);
              if (t != null) {
                Xt(t);
                tn(e => e + 1);
              }
              const n = Zt.current.get(e);
              if (n) {
                Zt.current.delete(e);
                n();
              }
              Kn(e);
              Ut.current.delete(e);
            }
            break;
          }
          const o = a.startsWith("http") ? a : l(a);
          const c = t.speed;
          Dt.current.push({
            url: o,
            stepId: e ?? 0,
            attempt: 0,
            renderedSpeed: typeof c == "number" && c > 0 ? c : h.current
          });
          if (!$t.current) {
            er();
          }
          break;
        }
      case "new_column":
        {
          const e = s.step_id;
          ei(s.page_id);
          Or();
          yr();
          jt.current = null;
          const t = ot.current;
          if (t) {
            const e = W(t.lp.tileW);
            Q(t, e);
          }
          pr.current = "newcol";
          window.setTimeout(() => Kn(e), 30);
          break;
        }
      case "new_page":
        {
          const e = s.step_id;
          const t = typeof s.title == "string" && s.title.trim() ? s.title.trim() : undefined;
          Cr(vt.current);
          Or();
          yr();
          jt.current = null;
          const n = Ir(t, typeof s.page_id == "string" ? s.page_id : undefined);
          Vr(n);
          qr({
            type: "action",
            actionKind: "page",
            actionLabel: t || a.t("whiteboard.action.newPage"),
            actionDetail: a.t("whiteboard.action.switchedToNewPage"),
            content: t || a.t("whiteboard.action.newPage")
          });
          window.setTimeout(() => Kn(e), 60);
          break;
        }
      case "board":
        {
          const e = s.step_id;
          const t = typeof s.board_uid == "number" ? s.board_uid : undefined;
          const n = s[Ee];
          const r = String(s.board_content ?? n ?? "");
          const i = s.title;
          const o = Tt.current;
          Tt.current = undefined;
          ei(s.page_id);
          const l = () => {
            if (e != null) {
              Pe(() => Kn(e));
            }
          };
          const c = r.trim();
          if (!c) {
            Pe(l);
            break;
          }
          qr({
            type: "action",
            actionKind: "board",
            actionLabel: i && i.trim() || a.t("whiteboard.action.board"),
            actionDetail: c,
            content: i && i.trim() || a.t("whiteboard.action.board")
          });
          if (Lt.current != null) {
            Mt.current.push({
              content: c,
              title: i,
              boardUid: t,
              finishBoard: l,
              revealGateStep: o
            });
          } else {
            let e = null;
            Er(c, i, t, t => {
              e = t;
              Ar(t);
            }, o);
            if (e) {
              Sr(e, c.length, l);
            } else {
              Pe(l);
            }
          }
          break;
        }
      case "highlight":
      case "circle":
        {
          const e = s.step_id;
          const n = typeof s.target_board_id == "number" ? s.target_board_id : undefined;
          const r = typeof s.snippet == "string" ? s.snippet : "";
          const o = t.type;
          const l = s.color;
          let c;
          ei(s.page_id);
          const u = s.rect;
          let d;
          if (u && typeof u.x == "number" && typeof u.y == "number" && typeof u.w == "number" && typeof u.h == "number" && Number.isFinite(u.x) && Number.isFinite(u.y) && Number.isFinite(u.w) && Number.isFinite(u.h)) {
            c = {
              x: u.x,
              y: u.y,
              w: u.w,
              h: u.h
            };
          }
          if (n != null) {
            d = (i = ft.current.find(e => e.kind === "note_card" && e.boardUid === n)) == null ? undefined : i.id;
          }
          d ||= jt.current ?? undefined;
          if (d && (c || r.trim())) {
            const e = {
              id: crypto.randomUUID(),
              kind: o,
              snippet: r || "",
              ...(c ? {
                rectNorm: c
              } : {}),
              ...(o === "highlight" && (l == null ? undefined : l.trim()) ? {
                color: l.trim()
              } : {})
            };
            wt(t => t.map(t => t.id === d && t.kind === "note_card" ? {
              ...t,
              decorations: [...(t.decorations ?? []), e]
            } : t));
          }
          qr({
            type: "action",
            actionKind: o,
            actionLabel: o === "highlight" ? a.t("whiteboard.action.highlight") : a.t("whiteboard.action.circle"),
            actionDetail: r.trim() ? a.t("whiteboard.action.snippetQuote", {
              snippet: r.trim()
            }) : c ? a.t("whiteboard.action.regionBox") : "",
            content: o === "highlight" ? a.t("whiteboard.action.highlight") : a.t("whiteboard.action.circle")
          });
          const m = o === "circle" ? 920 : 140;
          window.setTimeout(() => Kn(e), m);
          break;
        }
      case "graph":
        {
          const e = s.step_id;
          const t = s.mermaid ?? "";
          ei(s.page_id);
          if (!t.trim()) {
            window.setTimeout(() => Kn(e), 20);
            break;
          }
          qr({
            type: "action",
            actionKind: "graph",
            actionLabel: a.t("whiteboard.action.graph"),
            actionDetail: t,
            content: a.t("whiteboard.action.graphShort")
          });
          Br(t, e);
          break;
        }
      case "ask":
        {
          const e = s.step_id;
          const t = Ze(s);
          if (t) {
            de(t);
            qr({
              type: "action",
              actionKind: "ask",
              actionLabel: Qe(t),
              actionDetail: Xe(t),
              content: Qe(t)
            });
          }
          window.setTimeout(() => Kn(e), 20);
          break;
        }
      case "reward_user":
        {
          const e = s.step_id;
          const t = String(s.master_concept_title ?? "").trim();
          const n = String(s.master_concept_description ?? "").trim();
          if (t && n) {
            Kr({
              masterConceptTitle: t,
              masterConceptDescription: n,
              stepId: e
            });
            qr({
              type: "action",
              actionKind: "reward",
              actionLabel: t,
              actionDetail: n,
              content: t
            });
          } else {
            window.setTimeout(() => Kn(e), 20);
          }
          break;
        }
      case "image_gen_pending":
        {
          const e = s.step_id;
          const t = s.placement_step_id;
          ei(s.page_id);
          const n = typeof s.prompt_preview == "string" ? s.prompt_preview : "";
          const r = s.source === "reference_page";
          const i = r ? We(s.reference_name, s.page_index) : typeof s.caption == "string" && s.caption.trim() ? s.caption.trim() : undefined;
          const o = qr({
            type: "action",
            actionKind: "image",
            actionLabel: r ? a.t("whiteboard.action.referencePage") : a.t("whiteboard.action.image"),
            actionStatus: "pending",
            actionDetail: n,
            content: r ? a.t("whiteboard.action.referencePage") : a.t("whiteboard.action.image")
          });
          if (typeof e == "number") {
            ti.current.set(e, o);
          }
          $r("", 512, 512, {
            pending: true,
            pendingStepId: e,
            caption: i
          });
          if (typeof t == "number") {
            Pe(() => Kn(t));
          }
          break;
        }
      case "generated_image":
        {
          const e = s.step_id;
          const t = s.image_url ?? "";
          const n = s.source === "reference_page" ? We(s.reference_name, s.page_index) : typeof s.caption == "string" && s.caption.trim() ? s.caption.trim() : undefined;
          ei(s.page_id);
          if (typeof e == "number") {
            const n = ti.current.get(e);
            if (n) {
              ti.current.delete(e);
              Qr(n, {
                actionStatus: "done",
                actionImageUrl: t
              });
            }
          }
          const r = typeof e == "number" ? Nt.current.get(e) : undefined;
          if (typeof e == "number" && r) {
            Nt.current.delete(e);
            wt(e => {
              var i;
              const a = e.find(e => e.id === r && e.kind === "board_image");
              if (!a) {
                return e;
              }
              const o = a.h ?? 0;
              const l = a.w ?? 64;
              const c = s.width && s.height && s.width > 0 ? s.height / s.width : 1;
              const u = Math.max(48, Math.round(l * c));
              const d = n ?? ((i = a.boardImage) == null ? undefined : i.caption);
              const m = u + (d ? 112 : 0);
              const h = m - o;
              let p = e.map(e => e.id === r ? {
                ...e,
                h: m,
                boardImage: {
                  imageUrl: t,
                  width: s.width,
                  height: s.height,
                  caption: d,
                  pending: false
                }
              } : e);
              if (a.columnIndex !== undefined && Math.abs(h) >= 4) {
                p = Wr(p, a.columnIndex, a.y, h);
                p = De(ot.current, p, a.columnIndex);
              }
              return p;
            });
            const i = br.current;
            if (i && i.id === r) {
              const e = s.width && s.height && s.width > 0 ? s.height / s.width : 1;
              const t = n ? 52 : 0;
              wr(r, Math.max(48, Math.round(i.w * e)) + t);
            }
          } else {
            $r(t, s.width, s.height, {
              caption: n
            });
          }
          if (typeof e == "number") {
            (function (e, t, n) {
              const r = e.startsWith("http") ? e : l(e);
              let i = false;
              const s = () => {
                if (!i) {
                  i = true;
                  window.clearTimeout(a);
                  n(t);
                }
              };
              const a = window.setTimeout(s, 2800);
              const o = new Image();
              o.onload = s;
              o.onerror = s;
              o.src = r;
              if (typeof o.decode == "function") {
                o.decode().then(s).catch(s);
              }
              queueMicrotask(() => {
                if (o.complete) {
                  s();
                }
              });
            })(t, e, Kn);
          }
          break;
        }
      case "image_gen_failed":
        {
          const e = s.step_id;
          ei(s.page_id);
          if (typeof e == "number") {
            const t = ti.current.get(e);
            if (t) {
              ti.current.delete(e);
              Qr(t, {
                actionStatus: "error"
              });
            }
          }
          if (typeof e == "number") {
            const t = Nt.current.get(e);
            if (t) {
              Nt.current.delete(e);
              wt(e => e.filter(e => e.id !== t));
            }
            Kn(e);
          }
          break;
        }
      case "animation_pending":
        {
          const e = s.step_id;
          const t = s.placement_step_id;
          const n = typeof s.task_preview == "string" ? s.task_preview : "";
          ei(s.page_id);
          const r = qr({
            type: "action",
            actionKind: "animation",
            actionLabel: a.t("whiteboard.action.animation"),
            actionStatus: "pending",
            actionDetail: n,
            content: a.t("whiteboard.action.animation")
          });
          if (typeof e == "number") {
            ni.current.set(e, r);
          }
          zr("", n, {
            pending: true,
            pendingStepId: e
          });
          if (typeof t == "number") {
            Pe(() => Kn(t));
          }
          break;
        }
      case "generated_animation":
        {
          const e = s.step_id;
          const t = typeof s.html == "string" ? s.html : "";
          const n = typeof s.task == "string" ? s.task : undefined;
          ei(s.page_id);
          if (typeof e == "number") {
            const t = ni.current.get(e);
            if (t) {
              ni.current.delete(e);
              Qr(t, {
                actionStatus: "done"
              });
            }
          }
          const r = typeof e == "number" ? Ct.current.get(e) : undefined;
          let i = null;
          let a = true;
          if (typeof e == "number" && r) {
            Ct.current.delete(e);
            if (ft.current.some(e => e.id === r && e.kind === "board_animation")) {
              i = r;
              wt(e => e.map(e => e.id === r && e.kind === "board_animation" ? {
                ...e,
                boardAnimation: {
                  html: t,
                  task: n,
                  pending: false
                }
              } : e));
            } else {
              a = false;
              let e = false;
              const i = yt.current.map(i => {
                let s = false;
                const a = (i.overlayItems ?? []).map(i => i.id === r && i.kind === "board_animation" ? (e = true, s = true, {
                  ...i,
                  boardAnimation: {
                    html: t,
                    task: n,
                    pending: false
                  }
                }) : i);
                if (s) {
                  return {
                    ...i,
                    overlayItems: a
                  };
                } else {
                  return i;
                }
              });
              if (e) {
                yt.current = i;
                it(i);
                Xn();
              }
            }
          } else {
            i = zr(t, n);
          }
          if (typeof e == "number") {
            if (i && a) {
              const t = i;
              It.current.set(t, e);
              window.setTimeout(() => {
                if (It.current.has(t)) {
                  It.current.delete(t);
                  Kn(e);
                }
              }, 3000);
            } else {
              Kn(e);
            }
          }
          break;
        }
      case "animation_failed":
        {
          const e = s.step_id;
          ei(s.page_id);
          if (typeof e == "number") {
            const t = ni.current.get(e);
            if (t) {
              ni.current.delete(e);
              Qr(t, {
                actionStatus: "error"
              });
            }
            const n = Ct.current.get(e);
            if (n) {
              Ct.current.delete(e);
              It.current.delete(n);
              wt(e => e.filter(e => e.id !== n));
            }
            Kn(e);
          }
          break;
        }
      case "reference_reading_started":
        {
          const e = Array.isArray(s.references) ? s.references : [];
          const t = Array.isArray(s.reference_ids) ? s.reference_ids : [];
          const n = e.length ? e.map(e => {
            const t = String(e.referenceId ?? "").trim();
            const n = String(e.referenceName ?? "").trim();
            if (n) {
              return `${t} · ${n}`;
            } else {
              return t;
            }
          }).filter(Boolean).join("\n") : t.map(e => String(e).trim()).filter(Boolean).join("\n");
          const r = qr({
            type: "action",
            actionKind: "reference",
            actionLabel: a.t("whiteboard.action.referenceReading"),
            actionStatus: "pending",
            actionDetail: n || a.t("whiteboard.action.referenceReadingDetail"),
            content: a.t("whiteboard.action.referenceReading")
          });
          ri.current = r;
          break;
        }
      case "reference_reading_completed":
        {
          const e = ri.current;
          if (e) {
            Qr(e, {
              actionStatus: "done"
            });
            ri.current = null;
          }
          break;
        }
      case "reference_reading_failed":
        {
          const e = ri.current;
          if (e) {
            Qr(e, {
              actionStatus: "error",
              actionDetail: String(s.message ?? a.t("whiteboard.action.referenceReadingFailed"))
            });
            ri.current = null;
          } else {
            qr({
              type: "action",
              actionKind: "reference",
              actionLabel: a.t("whiteboard.action.referenceReading"),
              actionStatus: "error",
              actionDetail: String(s.message ?? a.t("whiteboard.action.referenceReadingFailed")),
              content: a.t("whiteboard.action.referenceReading")
            });
          }
          break;
        }
      case "keypoint_complete":
        if (typeof s.index == "number" && s.index >= 0) {
          const e = s.index;
          he(t => t.has(e) ? t : new Set(t).add(e));
          be(false);
        }
        break;
      case "done":
        {
          const e = s.step_id;
          if (e != null) {
            queueMicrotask(() => Kn(e));
          }
          break;
        }
      case "response_complete":
        sr.current(En.current);
        En.current = null;
        Or();
        yr();
        jt.current = null;
        _t.current.clear();
        Nt.current.clear();
        Ct.current.clear();
        It.current.clear();
        ne(false);
        vt.current = null;
        nt(null);
        Ge(s.status === "paused" ? "paused" : "completed");
        if (s.session === true) {
          Xr();
          Yr();
          be(true);
        } else if (s.status !== "paused" && !ge.current) {
          we(e => e + 1);
        }
        ge.current = false;
        window.setTimeout(() => {
          Qn();
        }, 0);
        break;
      case "session_paused":
        {
          const e = Ye(s.whiteboard_state);
          if (e) {
            xt.current = e.revision;
          }
          Ge("paused");
          ne(false);
          de(null);
          vt.current = null;
          nt(null);
          if (Ft.current) {
            Ft.current.pause();
            Kt(false);
          }
          break;
        }
      case "insufficient_funds":
      case "error":
        {
          const e = String(s.message ?? "");
          if (s.type === "insufficient_funds") {
            o(s.credit_info, s.next_reset_time);
          }
          const t = /session not found/i.test(e);
          if (t && x.current) {
            Dr();
            yr();
            _t.current.clear();
            Nt.current.clear();
            Ct.current.clear();
            It.current.clear();
            qr({
              type: "status",
              content: a.t("whiteboard.status.error", {
                message: e
              })
            });
            y(true);
            ne(false);
            se(null);
            oe(false);
            break;
          }
          if (t) {
            try {
              localStorage.removeItem("whiteboard_session_id");
            } catch {}
            Dr();
            yr();
            _t.current.clear();
            Nt.current.clear();
            Ct.current.clear();
            It.current.clear();
            if (Te != null) {
              Te.startSession();
            }
            qr({
              type: "status",
              content: a.t("whiteboard.status.sessionExpiredRestarted")
            });
            ne(true);
            se(null);
            oe(false);
            break;
          }
          Dr();
          yr();
          jt.current = null;
          _t.current.clear();
          Nt.current.clear();
          Ct.current.clear();
          It.current.clear();
          qr({
            type: "status",
            content: s.type === "insufficient_funds" ? a.t("quota.exhausted.transcriptNote") : a.t("whiteboard.status.error", {
              message: e
            })
          });
          ne(false);
          vt.current = null;
          nt(null);
          se(null);
          oe(false);
          de(null);
          break;
        }
    }
  }, [e, qr, Xr, Hr, Kr, Yr, Qr, Kn, Cr, wr, er, Er, Ar, Ir, ei, Dr, Or, Vr, $r, zr, Br, yr, vr, fr, _r, Xn, Qn, Wr]);
  at.current = ii;
  s.useEffect(() => {
    const e = () => {
      Qn();
    };
    window.addEventListener("pagehide", e);
    return () => window.removeEventListener("pagehide", e);
  }, [Qn]);
  const si = s.useCallback(async (e, t) => {
    _e.current = (t == null ? undefined : t.suppressInitialTeaching) === true;
    const r = (t == null ? undefined : t.standaloneSessionId) || null;
    x.current = r;
    y(false);
    je(false);
    if (!Te) {
      Te = new Ce();
      Te.setMessageHandler(e => at.current(e));
      Te.setCloseHandler(() => {
        n(false);
      });
    }
    const i = Te;
    if (!i.isConnected) {
      await i.connect();
    }
    if (Te !== i) {
      return;
    }
    n(true);
    if (r) {
      i.resumeSession(r);
      return;
    }
    if (e) {
      i.resumeOrStartCourseSession(e);
      return;
    }
    const s = typeof localStorage != "undefined" ? localStorage.getItem("whiteboard_session_id") : null;
    if (s) {
      i.resumeSession(s);
    } else {
      i.startSession();
    }
  }, []);
  const ai = s.useCallback(() => {
    Ne.current = true;
    _e.current = false;
    if ((Te == null ? undefined : Te.isConnected) && r && ke) {
      Ne.current = false;
      je(false);
      Ge("active");
      ne(true);
      E({
        tts: "idle",
        boardNotes: "idle"
      });
      Vr(gt.current);
      Xt("");
      tn(e => e + 1);
      Te.startTeaching();
    }
  }, [ke, Vr, r]);
  s.useEffect(() => {
    if (ke && Ne.current) {
      ai();
    }
  }, [ke, ai]);
  const oi = s.useCallback((e, t, n, i, s, a) => {
    if ((Te == null ? undefined : Te.isConnected) && r) {
      if (!a) {
        const t = qr({
          type: "user",
          content: e || (s == null ? undefined : s.label) || "🎤 …",
          attachments: n
        });
        En.current = s ? t : null;
      }
      Ge("active");
      ne(true);
      de(null);
      ge.current = false;
      E({
        tts: "idle",
        boardNotes: "idle"
      });
      Vr(gt.current);
      Xt("");
      tn(e => e + 1);
      jt.current = null;
      _t.current.clear();
      Nt.current.clear();
      Ct.current.clear();
      It.current.clear();
      ri.current = null;
      Dr();
      yr();
      Te.sendMessage(e, t, n == null ? undefined : n.map(e => ({
        file_id: e.fileId,
        filename: e.filename
      })), i, s ? {
        audioB64: s.audioB64,
        mime: s.mime,
        durationMs: s.durationMs
      } : undefined, a);
    }
  }, [qr, Dr, Vr, yr, r]);
  const li = s.useCallback((e, t) => {
    oi("", null, undefined, undefined, e, t);
  }, [oi]);
  Tn.current = e => li(e, true);
  const ci = s.useCallback((e, t) => {
    const n = ue;
    if (!n || n.mode !== "choice") {
      return;
    }
    const r = n.options[e];
    if (r == null) {
      return;
    }
    const i = n.correctIndex == null ? null : n.correctIndex === e;
    oi(r, t, undefined, {
      mode: "choice",
      option_index: e,
      option_text: r,
      correct: i,
      correct_option_text: n.correctIndex == null ? undefined : n.options[n.correctIndex]
    });
    return i;
  }, [ue, oi]);
  const ui = s.useCallback(() => de(null), []);
  const di = s.useCallback(() => {
    if (!(Te == null ? undefined : Te.isConnected) || !u) {
      return;
    }
    if (Ft.current) {
      Ft.current.pause();
      Kt(false);
    }
    const e = Zn(xt.current + 1);
    xt.current = e.revision;
    if (St.current) {
      clearTimeout(St.current);
      St.current = null;
    }
    Te.pauseSession(e);
    Ge("paused");
    ne(false);
    vt.current = null;
    nt(null);
  }, [Zn, u]);
  const mi = s.useCallback(() => {
    if ((Te == null ? undefined : Te.isConnected) && r) {
      Qn();
      Ge("active");
      ne(true);
      de(null);
      ge.current = false;
      Vr(gt.current);
      Te.resumeGeneration();
    }
  }, [Vr, Qn, r]);
  const hi = s.useCallback(() => {
    var e;
    if (!(Te == null ? undefined : Te.isConnected)) {
      return;
    }
    hn.current = false;
    mn.current = null;
    bn.current = [];
    const t = pn.current;
    if (t) {
      t.onended = null;
      t.onerror = null;
      t.pause();
    }
    gn.current = false;
    if ((e = jn.current) != null) {
      e.stop();
    }
    jn.current = null;
    an("idle");
    zt.current += 1;
    Wt.current();
    if (Bt.current) {
      clearTimeout(Bt.current);
      Bt.current = null;
    }
    const n = Ft.current;
    if (n) {
      n.pause();
      n.removeAttribute("src");
      n.load();
    }
    Dt.current = [];
    $t.current = false;
    if (!Rn.current) {
      Zt.current.forEach(e => e());
    }
    Rn.current = false;
    Zt.current.clear();
    Ut.current.clear();
    Gt.current.clear();
    Yt.current.clear();
    Kt(false);
    Xt("");
    tn(e => e + 1);
    const r = ft.current.filter(e => {
      var t;
      var n;
      return (e.kind !== "board_image" || !((t = e.boardImage) == null ? undefined : t.pending)) && (e.kind !== "board_animation" || !((n = e.boardAnimation) == null ? undefined : n.pending));
    });
    if (r.length !== ft.current.length) {
      wt(() => r);
    }
    _t.current.clear();
    Nt.current.clear();
    Ct.current.clear();
    It.current.clear();
    yr();
    window.setTimeout(() => {
      Qn();
    }, 0);
    Te.stopGeneration();
    ge.current = true;
    de(null);
    ne(false);
    vt.current = null;
    nt(null);
  }, [yr, Qn]);
  Nn.current = hi;
  Cn.current = e => oi(e, null, undefined, undefined, undefined, true);
  const pi = s.useCallback(e => {
    if (Te != null) {
      Te.setLectureOutline(e);
    }
  }, []);
  const bi = s.useRef(null);
  const fi = s.useRef(false);
  const wi = s.useCallback(e => {
    Se(e);
    ce(e);
    h.current = e.speed;
    if (Ft.current) {
      Le(Ft.current, Vn.current, e.speed);
    }
    if (fi.current) {
      bi.current = e;
    } else {
      bi.current = null;
      if (Te != null) {
        Te.setTtsConfig(e.voiceId, e.speed);
      }
    }
  }, []);
  const gi = te || Jt;
  s.useEffect(() => {
    fi.current = gi;
    if (gi) {
      return;
    }
    const e = bi.current;
    if (e) {
      bi.current = null;
      if (Te != null) {
        Te.setTtsConfig(e.voiceId, e.speed);
      }
    }
  }, [gi]);
  const vi = s.useCallback(e => {
    if (Te != null) {
      Te.sendQuestionAnswers(e);
    }
    se(null);
  }, []);
  const yi = s.useCallback(e => {
    if (Te != null) {
      Te.sendStepCompletionResponse(e);
    }
    oe(false);
  }, []);
  const xi = s.useCallback(() => {
    zt.current += 1;
    Wt.current();
    if (Bt.current) {
      clearTimeout(Bt.current);
      Bt.current = null;
    }
    const e = Ft.current;
    if (e) {
      e.pause();
      e.removeAttribute("src");
      e.load();
    }
    Dt.current = [];
    $t.current = false;
    Ut.current.clear();
    Zt.current.clear();
    Gt.current.clear();
    Yt.current.clear();
    Kt(false);
    Xt("");
    tn(e => e + 1);
    ne(false);
    N(null);
    I(null);
    de(null);
    M.current = false;
    if (Te != null) {
      Te.disconnect();
    }
    Te = null;
    x.current = null;
    n(false);
    c(false);
    d(null);
    b(null);
    w(null);
    y(false);
    je(false);
  }, []);
  const Si = s.useCallback(() => {
    try {
      localStorage.removeItem("whiteboard_session_id");
    } catch {}
    fr();
    if (St.current) {
      clearTimeout(St.current);
      St.current = null;
    }
    xt.current = 0;
    Ge("active");
    de(null);
    vt.current = null;
    nt(null);
    gt.current = qe;
    et(qe);
    const e = {
      id: qe,
      overlayItems: [],
      columnLayout: null,
      excalidrawElements: []
    };
    yt.current = [e];
    it([e]);
    jt.current = null;
    _t.current.clear();
    Nt.current.clear();
    Ct.current.clear();
    It.current.clear();
    yr();
    lt.current = null;
    ot.current = null;
    zt.current += 1;
    Wt.current();
    Ut.current.clear();
    Zt.current.clear();
    Dt.current = [];
    $t.current = false;
    if (Ft.current) {
      Ft.current.pause();
      Ft.current.src = "";
    }
    if (Bt.current) {
      clearTimeout(Bt.current);
      Bt.current = null;
    }
    R([]);
    ye([]);
    wt(() => []);
    N(null);
    I(null);
    M.current = false;
    Xt("");
    tn(e => e + 1);
    Gt.current.clear();
    Yt.current.clear();
    c(false);
    d(null);
    b(null);
    w(null);
    y(false);
    je(false);
    xi();
    (async () => {
      if (!Te) {
        Te = new Ce();
        Te.setMessageHandler(e => at.current(e));
        Te.setCloseHandler(() => {
          n(false);
        });
      }
      await Te.connect();
      n(true);
      Te.startSession();
    })();
  }, [xi, yr, fr]);
  const ki = s.useCallback((e, t, n) => {
    let r = Math.round(t);
    r = Math.max(0, Math.min(2400, r));
    const i = n !== undefined ? Math.round(n) : undefined;
    const s = Ot.current.get(e);
    if (s) {
      clearTimeout(s);
    }
    Ot.current.set(e, setTimeout(() => {
      Ot.current.delete(e);
      wt(t => {
        var n;
        var s;
        const a = t.find(t => t.id === e);
        if (!a || a.kind !== "note_card" && a.kind !== "board_image") {
          return t;
        }
        if (a.kind === "board_image" && ((n = a.boardImage) == null ? undefined : n.pending)) {
          return t;
        }
        let o = t;
        const l = ot.current;
        const c = a.columnIndex;
        if (a.kind === "note_card" && l && c !== undefined && i !== undefined && i > (a.w ?? K)) {
          const e = Math.max(K, i + 16);
          const t = ee(l, c, e);
          const n = ((s = l.columns[c]) == null ? undefined : s.w) ?? e;
          if (t !== 0 || (a.w ?? 0) + 4 < n) {
            o = o.map(e => e.columnIndex !== c || e.kind !== "note_card" && e.kind !== "board_image" && e.kind !== "mermaid_graph" && e.kind !== "board_animation" ? e.columnIndex !== undefined && e.columnIndex > c ? {
              ...e,
              x: e.x + t
            } : e : {
              ...e,
              w: n
            });
          }
        }
        const u = o.find(t => t.id === e);
        if (!u) {
          return o;
        }
        const d = u.h ?? 350;
        const m = r - d;
        if (Math.abs(m) >= 4) {
          o = o.map(t => t.id === e ? {
            ...t,
            h: r
          } : t);
          if (c !== undefined) {
            o = Wr(o, c, u.y, m);
          }
        }
        if (l && c !== undefined) {
          o = De(l, o, c);
        }
        return o;
      });
      queueMicrotask(() => {
        Pr.current(e);
      });
      wr(e, r);
    }, 16));
  }, [wt, Wr, wr]);
  const ji = s.useCallback((e, t) => {
    const n = _t.current.get(e);
    const r = () => {
      if (typeof n == "number") {
        _t.current.delete(e);
        Kn(n);
      }
    };
    if (!t || t < 40) {
      r();
      return;
    }
    const i = Math.max(48, Math.min(2400, Math.round(t) + 8));
    wt(t => {
      const n = t.find(t => t.id === e);
      if (!n || n.kind !== "mermaid_graph") {
        return t;
      }
      const r = n.h ?? 0;
      const s = i - r;
      if (Math.abs(s) < 4) {
        return t;
      }
      const a = ot.current;
      const o = n.columnIndex;
      let l = t.map(t => t.id === e ? {
        ...t,
        h: i
      } : t);
      if (o !== undefined) {
        l = Wr(l, o, n.y, s);
      }
      if (a && o !== undefined) {
        l = De(a, l, o);
      }
      return l;
    });
    window.setTimeout(r, 20);
    wr(e, i);
  }, [Kn, wt, Wr, wr]);
  const _i = s.useCallback(() => (Te == null ? undefined : Te.ping()) ?? Promise.resolve(null), []);
  const Ni = s.useCallback(() => (Te == null ? undefined : Te.modelProbe()) ?? Promise.resolve(null), []);
  return {
    connected: t,
    sessionReady: r,
    sessionId: u,
    wsSessionTitle: p,
    wsConversationId: f,
    sessionLoadFailed: g,
    sessionPrompt: S,
    dismissSessionPrompt: Jr,
    rewardPrompt: _,
    dismissRewardPrompt: Gr,
    unitCompletePrompt: C,
    dismissUnitCompletePrompt: Zr,
    sessionStatus: Ke,
    conversation: P,
    generationStatus: T,
    audioUrl: L,
    isProcessing: te,
    pendingUserQuestion: ie,
    pendingStepConfirm: ae,
    pendingAsk: ue,
    answerAsk: ci,
    dismissAsk: ui,
    completedKeypoints: me,
    keypointsDone: pe,
    turnHandbackEpoch: fe,
    boardQuizzes: ve,
    overlayItems: Ie,
    whiteboardPages: rt,
    activePageId: Ve,
    generationTargetPageId: tt,
    initialTeachingReady: ke,
    connect: si,
    startTeaching: ai,
    sendMessage: oi,
    pauseSession: di,
    resumeGeneration: mi,
    stopGeneration: hi,
    createWhiteboardPage: Ir,
    switchWhiteboardPage: Nr,
    showGenerationPage: Cr,
    setLectureOutline: pi,
    ttsConfig: xe,
    setTtsConfig: wi,
    submitQuestionAnswers: vi,
    submitStepCompletion: yi,
    newSession: Si,
    disconnect: xi,
    setEditor: Wn,
    getEditor: Fn,
    setViewportRightInset: qn,
    setViewportLeftInset: Hn,
    panViewportByCss: Jn,
    updateCanvasLayoutMetrics: Bn,
    applyOverlayContentHeightPx: ki,
    applyMermaidGraphHeight: ji,
    handleAnimationLoaded: Ur,
    handleAnimationHeight: Fr,
    handleBoardRevealDone: xr,
    setNarrationMuted: tr,
    toggleNarration: hr,
    narrationPlaying: Jt,
    narrationCaption: Qt,
    narrationCaptionEpoch: en,
    beginInterject: nr,
    sendInterjectQuestion: cr,
    sendInterjectPcm: ur,
    endInterjectPcm: dr,
    cancelInterject: mr,
    sendVoiceMessage: li,
    interjectState: nn,
    interjectQuestion: on,
    interjectAnswer: cn,
    pingServer: _i,
    runModelProbe: Ni
  };
}
function et({
  reward: e,
  awardLabel: t,
  buttonLabel: n,
  onDismiss: r
}) {
  s.useEffect(() => {
    const e = new Audio("/sounds/reward.mp3");
    e.volume = 0.6;
    e.play().catch(() => {});
    return () => {
      e.pause();
      e.src = "";
    };
  }, []);
  return c.jsx("div", {
    className: "whiteboard-reward-overlay",
    role: "dialog",
    "aria-live": "polite",
    "aria-labelledby": "whiteboard-reward-title",
    "aria-describedby": "whiteboard-reward-description",
    children: c.jsxs("div", {
      className: "whiteboard-reward-overlay-row",
      children: [c.jsx("div", {
        className: "whiteboard-reward-overlay-media",
        "aria-hidden": "true",
        children: c.jsx(u, {
          className: "whiteboard-reward-overlay-video",
          src: "/pages/mainPages/animations/char-reward-pop.mp4"
        })
      }), c.jsxs("div", {
        className: "whiteboard-reward-overlay-body",
        children: [c.jsx("span", {
          className: "whiteboard-reward-overlay-eyebrow",
          children: t
        }), c.jsx("span", {
          id: "whiteboard-reward-title",
          className: "whiteboard-reward-overlay-title",
          children: e.masterConceptTitle
        }), c.jsx("span", {
          id: "whiteboard-reward-description",
          className: "whiteboard-reward-overlay-desc",
          children: e.masterConceptDescription
        }), c.jsx("button", {
          type: "button",
          className: "whiteboard-reward-overlay-btn",
          onClick: r,
          children: n
        })]
      })]
    })
  });
}
function tt({
  prompt: e,
  title: t,
  description: n,
  continueLabel: r,
  backHomeLabel: a,
  onContinue: o,
  onBackHome: l
}) {
  const {
    t: d
  } = i();
  s.useEffect(() => {
    const e = new Audio("/sounds/session-complete.mp3");
    e.volume = 0.6;
    e.play().catch(() => {});
    return () => {
      e.pause();
      e.src = "";
    };
  }, []);
  return c.jsx("div", {
    className: "whiteboard-reward-overlay whiteboard-unit-complete-overlay",
    role: "dialog",
    "aria-modal": "true",
    "aria-live": "polite",
    "aria-labelledby": "whiteboard-unit-complete-title",
    "aria-describedby": "whiteboard-unit-complete-description",
    children: c.jsxs("div", {
      className: "whiteboard-reward-overlay-row",
      children: [c.jsx("div", {
        className: "whiteboard-reward-overlay-media",
        "aria-hidden": "true",
        children: c.jsx(u, {
          className: "whiteboard-reward-overlay-video",
          src: "/pages/mainPages/animations/char-complete-standing.mp4"
        })
      }), c.jsxs("div", {
        className: "whiteboard-reward-overlay-body",
        children: [c.jsx("span", {
          className: "whiteboard-reward-overlay-eyebrow",
          children: d("whiteboard.unitComplete.eyebrow")
        }), c.jsx("span", {
          id: "whiteboard-unit-complete-title",
          className: "whiteboard-reward-overlay-title",
          children: t
        }), c.jsx("span", {
          id: "whiteboard-unit-complete-description",
          className: "whiteboard-reward-overlay-desc",
          children: n.replace("{{percent}}", String(e.beatPercent))
        }), c.jsxs("div", {
          className: "whiteboard-unit-complete-actions",
          children: [c.jsx("button", {
            type: "button",
            className: "whiteboard-reward-overlay-btn whiteboard-reward-overlay-btn--secondary",
            onClick: o,
            children: r
          }), c.jsx("button", {
            type: "button",
            className: "whiteboard-reward-overlay-btn",
            onClick: l,
            children: a
          })]
        })]
      })]
    })
  });
}
function nt(e) {
  return e.replace(/[\s\p{P}\p{S}]/gu, "").toLowerCase();
}
function rt({
  ask: e,
  result: t,
  disabled: n,
  captionText: r,
  onPick: a
}) {
  var o;
  const {
    t: l
  } = i();
  const u = ((o = e.question) == null ? undefined : o.trim()) ?? "";
  const p = nt(u);
  const b = s.useRef(null);
  if (p.length >= 6 && nt(r).includes(p)) {
    b.current = p;
  }
  const f = !!u && b.current !== p;
  const w = t != null;
  const g = (t == null ? undefined : t.correct) === false;
  const v = {
    throwOnError: false,
    strict: false
  };
  return c.jsxs("div", {
    className: `whiteboard-ask${w ? " whiteboard-ask--resolved" : ""}${e.restored ? " whiteboard-ask--restored" : ""}`,
    role: "group",
    "aria-label": l("courseSession.ask.chooseAnswer"),
    children: [f && c.jsx("div", {
      className: "whiteboard-ask-question",
      children: c.jsx(d, {
        remarkPlugins: [h],
        rehypePlugins: [[m, v]],
        children: te(u)
      })
    }), c.jsx("div", {
      className: "whiteboard-ask-options",
      children: e.options.map((e, r) => {
        let i;
        if (t && r === t.index) {
          i = t.correct === true ? "correct" : t.correct === false ? "wrong" : "picked";
        }
        return c.jsxs("button", {
          type: "button",
          className: "whiteboard-ask-option",
          "data-verdict": i,
          style: {
            animationDelay: r * 60 + "ms"
          },
          disabled: n || w,
          onClick: () => a(r),
          children: [c.jsx("span", {
            className: "whiteboard-ask-option-text",
            children: c.jsx(d, {
              remarkPlugins: [h],
              rehypePlugins: [[m, v]],
              children: te(e)
            })
          }), i === "correct" && c.jsx(ue, {
            size: 14,
            strokeWidth: 2.5,
            "aria-label": l("courseSession.ask.correct")
          }), i === "wrong" && c.jsx(de, {
            size: 14,
            strokeWidth: 2.5,
            "aria-label": l("courseSession.ask.incorrect")
          })]
        }, r);
      })
    }), w && g && e.explanation && c.jsx("div", {
      className: "whiteboard-ask-explanation",
      role: "status",
      children: c.jsx(d, {
        remarkPlugins: [h],
        rehypePlugins: [[m, v]],
        children: te(e.explanation)
      })
    }), !w && c.jsx("div", {
      className: "whiteboard-ask-hint",
      children: l("courseSession.ask.orTypeHint")
    })]
  });
}
function it({
  percent: e,
  canZoomIn: t,
  canZoomOut: n,
  onZoomIn: r,
  onZoomOut: s,
  onReset: a
}) {
  const {
    t: o
  } = i();
  return c.jsxs("div", {
    className: "whiteboard-zoom-pill",
    role: "group",
    "aria-label": o("courseSession.zoomLevel", {
      percent: e
    }),
    children: [c.jsx("button", {
      type: "button",
      className: "whiteboard-zoom-btn",
      "aria-label": o("courseSession.zoomOut"),
      "data-whiteboard-tip": o("courseSession.zoomOut"),
      "data-whiteboard-tip-pos": "bottom",
      disabled: !n,
      onClick: s,
      children: c.jsx(y, {
        size: 16,
        strokeWidth: 2.25
      })
    }), c.jsxs("button", {
      type: "button",
      className: "whiteboard-zoom-readout",
      "aria-label": o("courseSession.zoomReset"),
      "data-whiteboard-tip": o("courseSession.zoomReset"),
      "data-whiteboard-tip-pos": "bottom",
      onClick: a,
      children: [e, "%"]
    }), c.jsx("button", {
      type: "button",
      className: "whiteboard-zoom-btn",
      "aria-label": o("courseSession.zoomIn"),
      "data-whiteboard-tip": o("courseSession.zoomIn"),
      "data-whiteboard-tip-pos": "bottom",
      disabled: !t,
      onClick: r,
      children: c.jsx(be, {
        size: 16,
        strokeWidth: 2.25
      })
    })]
  });
}
const st = "live";
const at = () => {
  const e = n();
  if (e) {
    return {
      Authorization: `Bearer ${e}`
    };
  } else {
    return {};
  }
};
const ot = 300;
const lt = {
  strict: false,
  throwOnError: false
};
const ct = new Set(["image/png", "image/jpeg"]);
function ut({
  items: e,
  onRemove: t,
  removeLabel: n
}) {
  return c.jsx("div", {
    className: "wb-attach-strip",
    children: e.map(e => c.jsxs("div", {
      className: `wb-attach-chip wb-attach-chip--${e.status}`,
      children: [c.jsx("img", {
        src: e.previewUrl,
        alt: e.filename,
        title: e.filename
      }), e.status === "uploading" && c.jsx("span", {
        className: "wb-attach-spinner",
        "aria-hidden": "true"
      }), e.status === "error" && c.jsx("span", {
        className: "wb-attach-error",
        "aria-hidden": "true",
        children: "!"
      }), c.jsx("button", {
        type: "button",
        className: "wb-attach-remove",
        onClick: () => t(e.localId),
        "aria-label": n,
        children: c.jsx(de, {
          size: 10
        })
      })]
    }, e.localId))
  });
}
function dt(e, t) {
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
    const i = r;
    const s = e.startsWith("$$", r) ? 2 : 1;
    let a = r + s;
    let o = -1;
    while (a < e.length) {
      const t = e[a];
      if (t !== "\\") {
        if (t !== "$") {
          a += 1;
        } else {
          if (s === 1) {
            o = a + 1;
            break;
          }
          if (e.startsWith("$$", a)) {
            o = a + 2;
            break;
          }
          a += 1;
        }
      } else {
        a += 2;
      }
    }
    if (o < 0) {
      r = i + 1;
    } else {
      if (o > n) {
        return o;
      }
      r = o;
    }
  }
  return n;
}
function mt(e) {
  const [, t = "", n = e, r = ""] = /^( *)([\s\S]*?)( *)$/.exec(e) ?? [];
  return c.jsxs(c.Fragment, {
    children: [t, c.jsx(d, {
      remarkPlugins: [Ne, h],
      rehypePlugins: [[m, lt]],
      components: {
        p: ({
          children: e
        }) => c.jsx(c.Fragment, {
          children: e
        })
      },
      children: te(n)
    }), r]
  });
}
function ht({
  text: e,
  revealFrom: t,
  streaming: n
}) {
  const r = e.slice(0, t);
  const i = e.slice(t);
  const s = i.includes("$");
  return c.jsx("span", {
    className: "whiteboard-caption-content",
    children: c.jsxs("span", {
      className: "whiteboard-caption-text",
      children: [mt(r), i && c.jsx("span", {
        className: "whiteboard-caption-fresh",
        children: s ? mt(i) : i
      }, e.length), n && c.jsx("span", {
        className: "whiteboard-caption-cursor"
      })]
    })
  });
}
function pt({
  text: e
}) {
  if (/[$\\]/.test(e)) {
    return c.jsx(d, {
      remarkPlugins: [Ne, h],
      rehypePlugins: [[m, lt]],
      components: {
        p: ({
          children: e
        }) => c.jsx(c.Fragment, {
          children: e
        })
      },
      children: te(e)
    });
  } else {
    return c.jsx(c.Fragment, {
      children: e
    });
  }
}
function bt(e, t, n) {
  return e.referenceName || e.referenceId || n("whiteboard.outline.referenceFallback", {
    index: t + 1
  });
}
const ft = {
  note_card: "whiteboard.outline.artifactKind.noteCard",
  quiz: "whiteboard.outline.artifactKind.quiz",
  board_image: "whiteboard.outline.artifactKind.boardImage",
  mermaid_graph: "whiteboard.outline.artifactKind.mermaidGraph",
  board_animation: "whiteboard.outline.artifactKind.boardAnimation"
};
function wt() {
  var e;
  var t;
  var n;
  var r;
  var o;
  var u;
  var d;
  var m;
  var h;
  var v;
  var y;
  const {
    t: O
  } = i();
  const {
    courseId: D,
    courseSessionId: $,
    sessionId: z
  } = p();
  const U = D && $ ? `${D}:${$}` : null;
  const B = Boolean(U);
  const W = !B && z ? z : null;
  const F = Boolean(W);
  const q = b();
  const H = q.state;
  const J = ((e = H == null ? undefined : H.sessionTitle) == null ? undefined : e.trim()) || null;
  const K = ((t = H == null ? undefined : H.learnIntroTitle) == null ? undefined : t.trim()) || null;
  const G = ((n = H == null ? undefined : H.learnIntroDescription) == null ? undefined : n.trim()) || null;
  const {
    connected: Y,
    sessionReady: Z,
    sessionId: Q,
    wsSessionTitle: V,
    wsConversationId: ee,
    sessionLoadFailed: te,
    sessionPrompt: le,
    dismissSessionPrompt: ce,
    rewardPrompt: Ne,
    dismissRewardPrompt: Ce,
    unitCompletePrompt: Ie,
    dismissUnitCompletePrompt: Me,
    conversation: Pe,
    isProcessing: Re,
    pendingUserQuestion: Te,
    pendingStepConfirm: Ee,
    pendingAsk: Le,
    answerAsk: Ae,
    completedKeypoints: Oe,
    keypointsDone: De,
    turnHandbackEpoch: $e,
    connect: ze,
    startTeaching: Ue,
    sendMessage: Be,
    stopGeneration: We,
    switchWhiteboardPage: Fe,
    setLectureOutline: qe,
    submitQuestionAnswers: He,
    submitStepCompletion: Je,
    overlayItems: Ke,
    whiteboardPages: Ge,
    activePageId: Ye,
    disconnect: Ze,
    setEditor: Qe,
    getEditor: Xe,
    updateCanvasLayoutMetrics: nt,
    applyOverlayContentHeightPx: lt,
    applyMermaidGraphHeight: wt,
    handleAnimationLoaded: gt,
    handleAnimationHeight: vt,
    handleBoardRevealDone: yt,
    setNarrationMuted: xt,
    toggleNarration: St,
    narrationPlaying: kt,
    narrationCaption: jt,
    narrationCaptionEpoch: _t,
    setViewportRightInset: Nt,
    setViewportLeftInset: Ct,
    panViewportByCss: It,
    ttsConfig: Mt,
    setTtsConfig: Pt,
    pingServer: Rt,
    runModelProbe: Tt,
    beginInterject: Et,
    sendInterjectQuestion: Lt,
    sendInterjectPcm: At,
    endInterjectPcm: Ot,
    cancelInterject: Dt,
    sendVoiceMessage: $t,
    interjectState: zt
  } = Ve();
  const Ut = f();
  const Bt = function () {
    const e = s.useRef(null);
    const t = s.useRef(null);
    const [n, r] = s.useState(false);
    const [i, a] = s.useState(null);
    s.useEffect(() => {
      const n = new Audio();
      n.addEventListener("ended", () => r(false));
      n.addEventListener("pause", () => r(false));
      n.addEventListener("play", () => r(true));
      e.current = n;
      return () => {
        n.pause();
        n.removeAttribute("src");
        t.current = null;
      };
    }, []);
    const o = s.useCallback(n => {
      const r = e.current;
      if (!r) {
        return;
      }
      const i = n.startsWith("http") ? n : l(n);
      a(n);
      if (t.current !== n) {
        t.current = n;
        r.src = i;
        r.play().catch(e => {});
      } else {
        r.play().catch(e => {});
      }
    }, []);
    const c = s.useCallback(() => {
      var t;
      if ((t = e.current) != null) {
        t.pause();
      }
    }, []);
    const u = s.useCallback(() => {
      if (n) {
        c();
      } else if (i) {
        const t = e.current;
        if (t) {
          t.play().catch(e => {});
        }
      }
    }, [n, i, c]);
    return {
      isPlaying: n,
      currentUrl: i,
      play: o,
      pause: c,
      toggle: u
    };
  }();
  const Wt = Mt ?? {
    voiceId: "calm",
    speed: 1
  };
  const Ft = Re || kt;
  const qt = Ft || zt !== "idle";
  const Ht = s.useRef(false);
  Ht.current = qt;
  const Jt = x({
    enabled: Y && Z,
    mode: st,
    onSpeechStart: () => Ht.current ? !!Et("voice", st) && "interject" : !!Er && "input",
    onUtterance: ({
      audioB64: e,
      mime: t,
      durationMs: n
    }, r) => {
      if (r === "interject") {
        Lt({
          audioB64: e,
          mime: t,
          durationMs: n
        });
      } else {
        $t({
          audioB64: e,
          mime: t,
          durationMs: n
        });
      }
    },
    onPcmFrame: At,
    onPcmEnd: Ot,
    onCancel: () => Dt(),
    onColdUtterance: ({
      audioB64: e,
      mime: t,
      durationMs: n
    }) => {
      if (!Ht.current && Er) {
        $t({
          audioB64: e,
          mime: t,
          durationMs: n
        });
      }
    }
  });
  const Kt = s.useRef(false);
  s.useEffect(() => {
    if (!Kt.current && Y && Z) {
      Kt.current = true;
      if (S() === "voice") {
        Jt.setEnabled(true);
      }
    }
  }, [Y, Z, Jt.setEnabled]);
  const Gt = Jt.status === "capturing";
  const Yt = Jt.enabled && Jt.status === "loading";
  const [Zt, Qt] = s.useState(true);
  const [Xt, Vt] = s.useState("syllabus");
  const [en, tn] = s.useState(true);
  const [nn, rn] = s.useState(false);
  const [sn, an] = s.useState(false);
  const [on, ln] = s.useState(false);
  const [cn, un] = s.useState(380);
  const [dn, mn] = s.useState(false);
  const [hn, pn] = s.useState(false);
  const [bn, fn] = s.useState(false);
  const [wn, gn] = s.useState(false);
  const vn = s.useRef(null);
  const [yn, xn] = s.useState(null);
  const Sn = s.useRef(null);
  const [kn, jn] = s.useState(false);
  const [_n, Nn] = s.useState("");
  const [Cn, In] = s.useState([]);
  const [Mn, Pn] = s.useState(false);
  const [Rn, Tn] = s.useState(0);
  const [En, Ln] = s.useState(false);
  const [An, On] = s.useState(false);
  const [Dn, $n] = s.useState([]);
  const [zn, Un] = s.useState([]);
  const [Bn, Wn] = s.useState(null);
  const [Fn, qn] = s.useState(null);
  const [Hn, Jn] = s.useState(null);
  const [Kn, Gn] = s.useState(false);
  const [Yn, Zn] = s.useState(false);
  const [Qn, Xn] = s.useState(null);
  const [Vn, er] = s.useState(false);
  const [tr, nr] = s.useState(false);
  const [rr, ir] = s.useState(false);
  const sr = s.useRef(B && (H == null ? undefined : H.showLearnIntro) === true);
  const [ar, or] = s.useState(sr.current);
  const [lr, cr] = s.useState(false);
  s.useEffect(() => {
    if (lr || S() === "voice") {
      k();
    }
  }, [lr]);
  const ur = s.useRef(false);
  const dr = j({
    enabled: Y && Z && !Ft && !Te && !Ee && !le && !Ne && !Ie && !kn && !ar && !lr && !rr
  });
  const mr = s.useRef(null);
  const hr = s.useRef(null);
  const pr = s.useRef(null);
  const br = s.useRef(null);
  const fr = s.useRef(null);
  const wr = s.useRef(null);
  const gr = s.useRef(null);
  const vr = s.useRef(Ye);
  const yr = s.useRef(null);
  const xr = s.useRef(Ke);
  const Sr = s.useRef(Ye);
  const kr = ((r = Te == null ? undefined : Te.question_data) == null ? undefined : r.questions) ?? [];
  const [jr, _r] = s.useState([]);
  const Nr = Te ? `${Te.conversation_id ?? ""}:${kr.map(e => e.question).join("")}` : "";
  s.useEffect(() => {
    _r(kr.length ? kr.map(() => ({
      selectedIndices: [],
      custom: ""
    })) : []);
  }, [Nr, kr.length]);
  s.useEffect(() => {
    xr.current = Ke;
  }, [Ke]);
  s.useEffect(() => {
    Sr.current = Ye;
  }, [Ye]);
  s.useEffect(() => {
    if (B || F) {
      try {
        localStorage.removeItem("whiteboard_session_id");
      } catch {}
    }
    ze(U, {
      suppressInitialTeaching: sr.current,
      standaloneSessionId: W
    });
    return () => Ze();
  }, [ze, U, Ze, B, F, W]);
  s.useEffect(() => {
    if (Q) {
      if (!B && !F) {
        Ut(`/whiteboard/${Q}`, {
          replace: true
        });
      }
    }
  }, [B, F, Ut, Q]);
  s.useEffect(() => {
    if (U && yr.current !== U) {
      yr.current = U;
      Wn(D ?? null);
      qn(U);
      Jn($ ?? null);
    }
  }, [D, $, U]);
  s.useEffect(() => {
    xt(!Zt);
  }, [Zt, xt]);
  s.useEffect(() => {
    const e = br.current;
    if (e) {
      e.scrollTo({
        top: e.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [Pe, Ft]);
  s.useEffect(() => {
    if (hn) {
      setTimeout(() => {
        var e;
        if ((e = mr.current) == null) {
          return undefined;
        } else {
          return e.focus();
        }
      }, 320);
    }
  }, [hn]);
  s.useEffect(() => {
    Nt(en ? cn : 0);
  }, [en, cn, Nt]);
  s.useEffect(() => {
    Ct(nn ? ot : 0);
  }, [nn, Ct]);
  s.useEffect(() => {
    if (!dn) {
      return;
    }
    const e = e => {
      var t;
      const n = (((t = gr.current) == null ? undefined : t.getBoundingClientRect().right) ?? window.innerWidth) - e.clientX;
      un(Math.min(560, Math.max(300, n)));
    };
    const t = () => mn(false);
    const n = document.body.style.cursor;
    const r = document.body.style.userSelect;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
    window.addEventListener("mousemove", e);
    window.addEventListener("mouseup", t);
    return () => {
      document.body.style.cursor = n;
      document.body.style.userSelect = r;
      window.removeEventListener("mousemove", e);
      window.removeEventListener("mouseup", t);
    };
  }, [dn]);
  s.useEffect(() => {
    const e = vr.current;
    vr.current = Ye;
    if (e === Ye) {
      return;
    }
    Tn(e => e + 1);
    Ln(true);
    const t = window.setTimeout(() => Ln(false), 1500);
    return () => window.clearTimeout(t);
  }, [Ye]);
  s.useEffect(() => {
    let e = false;
    if (An && Dn.length === 0) {
      (async function () {
        try {
          Gn(true);
          Xn(null);
          const t = await fetch(l("/api/v1/whiteboard/course-outlines"), {
            headers: at()
          });
          if (!t.ok) {
            throw new Error(`HTTP ${t.status}`);
          }
          const n = await t.json();
          if (!e) {
            $n(Array.isArray(n.courses) ? n.courses : []);
            Xn(null);
          }
        } catch {
          if (!e) {
            Xn(O("whiteboard.outline.loadCoursesFailed"));
          }
        } finally {
          if (!e) {
            Gn(false);
          }
        }
      })();
    }
    return () => {
      e = true;
    };
  }, [An, Dn.length]);
  s.useEffect(() => {
    let e = false;
    if (Bn && (An || B)) {
      (async function (t) {
        try {
          Zn(true);
          Xn(null);
          const n = await fetch(l(`/api/v1/whiteboard/course-outlines/${encodeURIComponent(t)}/sessions`), {
            headers: at()
          });
          if (!n.ok) {
            throw new Error(`HTTP ${n.status}`);
          }
          const r = await n.json();
          if (!e) {
            Un(Array.isArray(r.sessions) ? r.sessions : []);
            Xn(null);
          }
        } catch {
          if (!e) {
            Xn(O("whiteboard.outline.loadSessionsFailed"));
          }
        } finally {
          if (!e) {
            Zn(false);
          }
        }
      })(Bn);
    }
    return () => {
      e = true;
    };
  }, [B, An, Bn]);
  const [Cr, Ir] = s.useState("");
  const [Mr, Pr] = s.useState(0);
  s.useEffect(() => {
    const e = jt;
    if (!e) {
      Ir("");
      Pr(0);
      return;
    }
    Ir("");
    Pr(0);
    let t = 0;
    const n = window.setInterval(() => {
      const r = t;
      t = Math.min(e.length, t + 2);
      if (t >= e.length) {
        Pr(e.length);
        Ir(e);
        window.clearInterval(n);
        return;
      }
      Pr(dt(e, r));
      Ir(e.slice(0, dt(e, t)));
    }, 110);
    return () => window.clearInterval(n);
  }, [_t, jt]);
  const Rr = Cr;
  const Tr = Cr.length < jt.length;
  const Er = Y && Z && !Te && !Ee;
  const Lr = Math.max(0, Ge.findIndex(e => e.id === Ye));
  const Ar = Lr > 0;
  const Or = Lr >= 0 && Lr < Ge.length - 1;
  const Dr = en ? cn + 24 : 36;
  const [$r, zr] = s.useState(X);
  const Ur = s.useRef(null);
  const Br = s.useCallback(e => zr(e), []);
  const Wr = s.useCallback(e => {
    const t = e.getAppState();
    const n = t.width ?? 0;
    const r = t.height ?? 0;
    const i = nn ? 324 : 0;
    const s = en ? cn + 24 : 0;
    return {
      x: i + Math.max(n - i - s, 0) / 2,
      y: r / 2
    };
  }, [nn, en, cn]);
  const Fr = s.useCallback(e => {
    const t = Xe();
    if (!t) {
      return;
    }
    const n = Math.max(se, Math.min(ae, e));
    Ur.current = {
      value: n,
      at: performance.now()
    };
    const {
      x: r,
      y: i
    } = Wr(t);
    ne(t, n, r, i);
  }, [Xe, Wr]);
  const qr = s.useCallback(e => {
    var t;
    const n = Xe();
    if (!n) {
      return;
    }
    const r = (t = n.getAppState().zoom) == null ? undefined : t.value;
    const i = Ur.current;
    const s = i && performance.now() - i.at < 350 ? i.value : r && r > 0 ? r : X;
    Fr(s * e);
  }, [Xe, Fr]);
  const Hr = Math.round($r / X * 100);
  const Jr = Dr + 300;
  const Kr = U ? zn.find(e => e.id === U) ?? null : null;
  const Gr = K || J || ((o = Kr == null ? undefined : Kr.title) == null ? undefined : o.trim()) || O("whiteboard.outline.learnIntroTitleFallback");
  const Yr = G || ((u = Kr == null ? undefined : Kr.description) == null ? undefined : u.trim()) || ((d = Kr == null ? undefined : Kr.lectureOutline) == null ? undefined : d.trim()) || O("whiteboard.outline.learnIntroDescriptionFallback");
  const Zr = ((m = Kr == null ? undefined : Kr.title) == null ? undefined : m.trim()) || (B ? J || V : null) || null;
  const Qr = F ? J || V : null;
  const Xr = Zr || Qr || (B || F ? null : Hn) || O("whiteboard.outline.sessionTitleFallback");
  const Vr = (Kr == null ? undefined : Kr.references) ?? [];
  const ei = (Kr == null ? undefined : Kr.key_points) ?? [];
  const ti = B && ei.length > 0;
  const ni = [(h = Kr == null ? undefined : Kr.unit_title) == null ? undefined : h.trim(), (v = Kr == null ? undefined : Kr.lecture_title) == null ? undefined : v.trim()].filter(Boolean).join(" › ");
  const ri = ei.findIndex((e, t) => !Oe.has(t));
  const ii = e => De || Oe.has(e) ? "done" : e === ri ? "current" : "upcoming";
  let si = -1;
  ei.forEach((e, t) => {
    if (ii(t) !== "upcoming") {
      si = t;
    }
  });
  const ai = e => {
    if (e !== nn) {
      rn(e);
      It(e ? 324 : -324);
    }
  };
  const oi = Pe.reduce((e, t, n) => t.type === "user" ? n : e, -1);
  const li = oi >= 0 && Pe.slice(oi + 1).some(e => e.type !== "user");
  const ci = Re && oi >= 0 && !li;
  const ui = Pe.some(e => (e.content || "").trim().length > 0);
  const di = !Y || !Z;
  const mi = B ? Boolean(Zr) : F ? Boolean(Qr) : Boolean(Hn);
  s.useEffect(() => {
    if (ar && Y && !ur.current) {
      ur.current = true;
      Pt(Mt ?? {
        voiceId: "calm",
        speed: 1
      });
    }
  }, [Y, Pt, ar, Mt]);
  const hi = Cn.some(e => e.status === "uploading");
  const pi = Cn.filter(e => e.status === "ready" && e.fileId);
  const bi = e => {
    if (!e || e.length === 0) {
      return;
    }
    const t = 4 - Cn.length;
    if (t <= 0) {
      return;
    }
    const n = Array.from(e).filter(e => ct.has(e.type) && e.size <= 6291456).slice(0, t);
    if (n.length === 0) {
      return;
    }
    const r = n.map(e => ({
      localId: crypto.randomUUID(),
      filename: e.name,
      previewUrl: URL.createObjectURL(e),
      status: "uploading"
    }));
    In(e => [...e, ...r]);
    n.forEach((e, t) => {
      const {
        localId: n
      } = r[t];
      (async function (e) {
        const t = new FormData();
        t.append("file", e);
        const n = await fetch(l("/api/v1/upload_file"), {
          method: "POST",
          headers: {
            accept: "application/json",
            ...at()
          },
          body: t
        });
        if (!n.ok) {
          throw new Error(`Upload failed: ${n.status}`);
        }
        const r = await n.json();
        if (!(r == null ? undefined : r.file_id)) {
          throw new Error("Upload failed: no file_id");
        }
        return r.file_id;
      })(e).then(e => {
        In(t => t.map(t => t.localId === n ? {
          ...t,
          fileId: e,
          status: "ready"
        } : t));
      }).catch(e => {
        In(e => e.map(e => e.localId === n ? {
          ...e,
          status: "error"
        } : e));
      });
    });
  };
  const fi = e => {
    In(t => {
      const n = t.find(t => t.localId === e);
      if (n) {
        URL.revokeObjectURL(n.previewUrl);
      }
      return t.filter(t => t.localId !== e);
    });
  };
  const wi = e => Array.from(e.dataTransfer.types).includes("Files");
  const gi = e => {
    if (!Er) {
      return;
    }
    const t = Array.from(e.clipboardData.items).filter(e => e.kind === "file").map(e => e.getAsFile()).filter(e => e !== null);
    if (t.length !== 0) {
      e.preventDefault();
      bi(t);
    }
  };
  const vi = () => {
    var e;
    const t = _n.trim();
    if ((t || pi.length !== 0) && !hi && Er) {
      if (qt && t && pi.length === 0 && Et("text")) {
        Lt({
          text: t
        });
        Nn("");
        if (hr.current) {
          hr.current.style.height = "auto";
        }
        if (mr.current) {
          mr.current.style.height = "auto";
        }
        return;
      } else {
        if (!Ft || !(pi.length > 0)) {
          Be(t, Fn, pi.map(e => ({
            fileId: e.fileId,
            filename: e.filename,
            previewUrl: e.previewUrl
          })));
          Nn("");
          In([]);
          fn(false);
          if (hr.current) {
            hr.current.style.height = "auto";
          }
          if (mr.current) {
            mr.current.style.height = "auto";
          }
          if ((e = mr.current) != null) {
            e.focus();
          }
        }
        return;
      }
    }
  };
  const yi = () => {
    if (vn.current) {
      window.clearTimeout(vn.current);
    }
    gn(false);
    window.setTimeout(() => {
      gn(true);
      vn.current = window.setTimeout(() => gn(false), 1400);
    }, 0);
  };
  const xi = e => {
    if ((e == null ? undefined : e.mode) === "open") {
      fn(true);
      if (en || hn) {
        yi();
      } else {
        pn(true);
      }
      return;
    }
    if ((e == null ? undefined : e.mode) !== "choice") {
      if (!en && !hn) {
        pn(true);
      }
    }
  };
  const Si = s.useRef(xi);
  Si.current = xi;
  const ki = s.useRef(Le);
  ki.current = Le;
  s.useEffect(() => {
    if ($e !== 0) {
      Si.current(ki.current);
    }
  }, [$e]);
  s.useEffect(() => {
    if (Le == null ? undefined : Le.restored) {
      Si.current(Le);
    }
  }, [Le]);
  s.useEffect(() => {
    if (Ft) {
      fn(false);
    }
  }, [Ft]);
  s.useEffect(() => {
    if (jt) {
      xn(null);
    }
  }, [jt, _t]);
  s.useEffect(() => () => {
    if (vn.current) {
      window.clearTimeout(vn.current);
    }
    if (Sn.current) {
      window.clearTimeout(Sn.current);
    }
  }, []);
  const ji = () => {
    Ue();
    Ut(`${q.pathname}${q.search}${q.hash}`, {
      replace: true,
      state: J ? {
        sessionTitle: J
      } : null
    });
  };
  const _i = e => {
    const t = !Jt.enabled || Jt.status === "denied";
    const n = Jt.status === "denied" ? O("courseSession.voiceInterruptDenied") : Jt.status === "unavailable" ? O("courseSession.voiceInterruptUnavailable") : Jt.status === "loading" ? O("courseSession.voiceInterruptLoading") : Jt.enabled ? O("courseSession.voiceInterruptOn") : O("courseSession.voiceInterruptOff");
    return c.jsx("button", {
      type: "button",
      className: `whiteboard-voice-btn whiteboard-voice-btn--${e}`,
      "data-enabled": Jt.enabled ? "true" : "false",
      "data-voice-status": Jt.status,
      onClick: e => {
        e.stopPropagation();
        const t = !Jt.enabled;
        Jt.setEnabled(t);
        L(t ? "voice" : "text");
      },
      disabled: Jt.status === "unavailable",
      title: n,
      "aria-label": n,
      "aria-pressed": Jt.enabled,
      children: t ? c.jsx(T, {
        size: e === "morph" ? 15 : 16
      }) : c.jsx(E, {
        size: e === "morph" ? 15 : 16
      })
    });
  };
  const Ni = e => {
    if (!g(e)) {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        vi();
      }
      if (e.key === "Escape") {
        pn(false);
      }
    }
  };
  const Ci = () => {
    var e;
    const t = Xe();
    if (!t) {
      return () => {};
    }
    const n = t.getAppState();
    const r = ((e = n.zoom) == null ? undefined : e.value) ?? 1;
    const i = n.scrollX ?? 0;
    const s = n.scrollY ?? 0;
    const a = xr.current;
    if (a.length === 0) {
      return () => {};
    }
    let o = Infinity;
    let l = Infinity;
    let c = -Infinity;
    let u = -Infinity;
    for (const g of a) {
      const e = g.w ?? 580;
      const t = g.h ?? 350;
      o = Math.min(o, g.x);
      l = Math.min(l, g.y);
      c = Math.max(c, g.x + e);
      u = Math.max(u, g.y + t);
    }
    if (!isFinite(o) || !isFinite(l) || !isFinite(c) || !isFinite(u)) {
      return () => {};
    }
    const d = n.width ?? 1200;
    const m = n.height ?? 800;
    const h = Math.max(1, c - o + 80);
    const p = Math.max(1, u - l + 80);
    const b = Math.max(0.1, Math.min(2, Math.min(d / h, m / p)));
    const f = -(o - 40);
    const w = -(l - 40);
    t.updateScene({
      appState: {
        zoom: {
          value: b
        },
        scrollX: f,
        scrollY: w
      }
    });
    return () => {
      t.updateScene({
        appState: {
          zoom: {
            value: r
          },
          scrollX: i,
          scrollY: s
        }
      });
    };
  };
  const Ii = async () => {
    try {
      await document.fonts.ready;
    } catch {}
    await new Promise(e => requestAnimationFrame(() => requestAnimationFrame(e)));
    await new Promise(e => window.setTimeout(e, 120));
  };
  const Mi = async () => {
    const e = document.querySelector("[data-export-root]");
    if (e) {
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
      await Ii();
      return A(e, {
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
    } else {
      return null;
    }
  };
  const Pi = (e, t) => {
    const n = e.toDataURL("image/jpeg", 0.92);
    const r = document.createElement("a");
    r.href = n;
    r.download = t;
    document.body.appendChild(r);
    r.click();
    document.body.removeChild(r);
  };
  const Ri = (e, t, n) => {
    const r = 297;
    const i = 210;
    const s = t.width / t.height;
    let a = r;
    let o = i;
    if (s > r / i) {
      o = r / s;
    } else {
      a = i * s;
    }
    const l = (r - a) / 2;
    const c = (i - o) / 2;
    if (!n) {
      e.addPage([r, i], "landscape");
    }
    e.addImage(t.toDataURL("image/jpeg", 0.92), "JPEG", l, c, a, o);
  };
  const Ti = Xr.trim().replace(/[\\/:*?"<>|]+/g, " ").replace(/\s+/g, " ").trim() || O("whiteboard.outline.filenameFallback");
  const Ei = async e => {
    if (tr || Re) {
      return;
    }
    nr(true);
    er(false);
    const t = Ci();
    try {
      await Ii();
      const t = await Mi();
      if (!t) {
        return;
      }
      const n = Lr + 1;
      if (e === "jpg") {
        Pi(t, `${Ti}-page${n}.jpg`);
      } else {
        const e = new R({
          orientation: "landscape",
          unit: "mm",
          format: "a4"
        });
        Ri(e, t, true);
        e.save(`${Ti}-page${n}.pdf`);
      }
    } finally {
      t();
      nr(false);
    }
  };
  const Li = async e => {
    if (tr || Re) {
      return;
    }
    nr(true);
    er(false);
    const t = Sr.current;
    let n = null;
    try {
      for (let t = 0; t < Ge.length; t++) {
        const r = Ge[t];
        if (Sr.current !== r.id) {
          Fe(r.id);
          await Ii();
        }
        const i = Ci();
        await Ii();
        const s = await Mi();
        i();
        if (s) {
          if (e === "jpg") {
            Pi(s, `${Ti}-page${t + 1}.jpg`);
          } else {
            n ||= new R({
              orientation: "landscape",
              unit: "mm",
              format: "a4"
            });
            Ri(n, s, t === 0);
          }
        }
      }
      if (e === "pdf" && n) {
        n.save(`${Ti}-all-pages.pdf`);
      }
    } finally {
      if (Sr.current !== t) {
        Fe(t);
      }
      nr(false);
    }
  };
  const Ai = s.useRef(false);
  s.useEffect(() => {
    if (Ie) {
      Ai.current = true;
    }
  }, [Ie]);
  const Oi = ((y = H == null ? undefined : H.fromConversationId) == null ? undefined : y.trim()) || ee || null;
  const Di = () => {
    if (F) {
      Ut(Oi ? `/response/${Oi}` : "/");
    } else if (D) {
      Ut(`/course/${D}`, {
        state: {
          fromSessionId: $,
          ...(Ai.current && $ ? {
            completedSessionId: $
          } : {})
        }
      });
    } else {
      Ut("/courses");
    }
  };
  const $i = () => {
    tn(e => {
      if (!e) {
        pn(false);
      }
      return !e;
    });
  };
  return c.jsxs("div", {
    className: "whiteboard-root",
    ref: gr,
    children: [ar && c.jsxs("div", {
      className: "whiteboard-learn-intro-overlay",
      children: [c.jsx("button", {
        type: "button",
        className: "whiteboard-learn-intro-cancel",
        onClick: Di,
        "aria-label": "Cancel and return to course",
        children: c.jsx("svg", {
          width: "13",
          height: "13",
          viewBox: "0 0 13 13",
          fill: "none",
          "aria-hidden": "true",
          children: c.jsx("path", {
            d: "M1 1L12 12M12 1L1 12",
            stroke: "currentColor",
            strokeWidth: "1.35",
            strokeLinecap: "round"
          })
        })
      }), c.jsxs("section", {
        className: "whiteboard-learn-intro-card",
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": "whiteboard-learn-intro-title",
        "aria-describedby": "whiteboard-learn-intro-desc",
        children: [c.jsx("div", {
          className: "whiteboard-learn-intro-media",
          "aria-hidden": "true",
          children: c.jsx(w, {
            className: "whiteboard-learn-intro-video"
          })
        }), c.jsxs("div", {
          className: "whiteboard-learn-intro-content",
          children: [c.jsx("p", {
            className: "whiteboard-learn-intro-eyebrow",
            children: O("whiteboard.outline.learnIntroEyebrow")
          }), c.jsx("h1", {
            id: "whiteboard-learn-intro-title",
            className: "whiteboard-learn-intro-title",
            children: c.jsx(pt, {
              text: Gr
            })
          }), c.jsx("p", {
            id: "whiteboard-learn-intro-desc",
            className: "whiteboard-learn-intro-desc",
            children: c.jsx(pt, {
              text: Yr
            })
          }), c.jsx("button", {
            type: "button",
            className: "whiteboard-learn-intro-btn",
            onClick: () => {
              or(false);
              if (S() !== null) {
                ji();
              } else {
                cr(true);
              }
            },
            children: O("whiteboard.outline.startLearning")
          })]
        })]
      })]
    }), le && c.jsx("div", {
      className: "whiteboard-session-prompt-toast" + (le.dismissible ? " whiteboard-session-prompt-toast--persistent" : ""),
      role: "status",
      "aria-live": "polite",
      children: c.jsxs("div", {
        className: "whiteboard-session-prompt-toast-row",
        children: [c.jsx("div", {
          className: "whiteboard-session-prompt-toast-media",
          "aria-hidden": "true",
          children: c.jsx(w, {
            className: "whiteboard-session-prompt-toast-video"
          })
        }), c.jsxs("div", {
          className: "whiteboard-session-prompt-toast-body",
          children: [c.jsx("span", {
            className: "whiteboard-session-prompt-toast-text",
            children: le.text
          }), le.dismissible && c.jsx("button", {
            type: "button",
            className: "whiteboard-session-prompt-toast-btn",
            onClick: ce,
            children: O("courseSession.gotIt")
          })]
        })]
      })
    }), Ne && c.jsx(et, {
      reward: Ne,
      awardLabel: O("courseSession.rewardAwardLabel"),
      buttonLabel: O("courseSession.gotIt"),
      onDismiss: Ce
    }), Ie && c.jsx(tt, {
      prompt: Ie,
      title: O(F ? "courseSession.standaloneUnitCompleteTitle" : "courseSession.unitCompleteTitle"),
      description: O("courseSession.unitCompleteDescription"),
      continueLabel: O("courseSession.continueInChat"),
      backHomeLabel: O(F ? "courseSession.standaloneBackToChat" : "courseSession.backToHome"),
      onContinue: () => {
        Me();
        tn(true);
      },
      onBackHome: () => {
        Me();
        Di();
      }
    }), dr.isIdlePromptOpen && c.jsx(_, {
      title: O("courseSession.idlePromptTitle"),
      message: O("courseSession.idlePromptMessage"),
      snoozeLabel: O("courseSession.idlePromptSnooze"),
      keepInChatLabel: O("courseSession.idlePromptKeepInChat"),
      backToCoursesLabel: O(F ? "courseSession.standaloneIdleBackToChat" : "courseSession.idlePromptBackToCourses"),
      onKeepInChat: () => {
        dr.dismissIdlePrompt();
        pn(false);
        tn(true);
        window.setTimeout(() => {
          var e;
          if ((e = hr.current) == null) {
            return undefined;
          } else {
            return e.focus();
          }
        }, 0);
      },
      onBackToCourses: () => {
        dr.dismissIdlePrompt();
        if (F) {
          Di();
        } else {
          Ut("/courses");
        }
      }
    }), F && te && c.jsx("div", {
      className: "whiteboard-modal-overlay",
      children: c.jsxs("div", {
        className: "whiteboard-modal-card",
        role: "alertdialog",
        "aria-modal": "true",
        "aria-label": O("courseSession.standaloneSessionMissingTitle"),
        children: [c.jsx("h3", {
          className: "whiteboard-modal-title",
          children: O("courseSession.standaloneSessionMissingTitle")
        }), c.jsx("p", {
          className: "whiteboard-modal-desc",
          children: O("courseSession.standaloneSessionMissingDesc")
        }), c.jsx("div", {
          className: "whiteboard-modal-actions",
          children: c.jsx("button", {
            className: "whiteboard-modal-btn whiteboard-modal-btn--danger",
            onClick: Di,
            children: O("courseSession.standaloneBackToChat")
          })
        })]
      })
    }), c.jsx("div", {
      className: "whiteboard-sidebar",
      style: {
        width: 0
      },
      children: c.jsxs("div", {
        className: "whiteboard-sidebar-inner",
        children: [!B && !F && c.jsx("div", {
          className: "whiteboard-tabs",
          children: ["syllabus", "artifacts"].map(e => c.jsx("button", {
            className: "whiteboard-tab",
            "data-active": Xt === e ? "true" : "false",
            onClick: () => Vt(e),
            children: O(e === "syllabus" ? "whiteboard.outline.tabSyllabus" : "whiteboard.outline.tabArtifacts")
          }, e))
        }), c.jsxs("div", {
          className: "whiteboard-sidebar-content",
          children: [B ? c.jsxs("div", {
            className: "whiteboard-outline-panel",
            children: [c.jsx("p", {
              className: "whiteboard-outline-section-title",
              children: O("whiteboard.outline.sessionOutlineTitle")
            }), c.jsxs("div", {
              className: "whiteboard-outline-readonly-card",
              children: [Yn && c.jsx("p", {
                className: "whiteboard-outline-hint",
                children: O("whiteboard.outline.loadingSessionOutline")
              }), !Yn && Qn && c.jsx("p", {
                className: "whiteboard-outline-hint",
                children: Qn
              }), !Yn && !Qn && Kr && c.jsxs(c.Fragment, {
                children: [c.jsx("span", {
                  className: "whiteboard-outline-option-title",
                  children: Kr.title
                }), Kr.unit_title && c.jsx("span", {
                  className: "whiteboard-outline-option-meta",
                  children: Kr.unit_title
                }), c.jsx("p", {
                  className: "whiteboard-outline-body",
                  children: Kr.lectureOutline || Kr.description || O("whiteboard.outline.outlineUnavailable")
                })]
              }), !Yn && !Qn && !Kr && c.jsx("p", {
                className: "whiteboard-outline-hint",
                children: O("whiteboard.outline.sessionMetadataMissing")
              })]
            }), c.jsx("p", {
              className: "whiteboard-outline-section-title",
              children: O("whiteboard.outline.referencesTitle")
            }), c.jsxs("div", {
              className: "whiteboard-reference-list",
              children: [Vr.length === 0 && c.jsx("p", {
                className: "whiteboard-outline-hint",
                children: O("whiteboard.outline.noReferences")
              }), Vr.map((e, t) => c.jsxs("div", {
                className: "whiteboard-reference-item",
                children: [c.jsx("span", {
                  className: "whiteboard-outline-option-title",
                  children: bt(e, t, O)
                }), (e.page_range || e.usage) && c.jsx("span", {
                  className: "whiteboard-outline-option-meta",
                  children: [e.page_range, e.usage].filter(Boolean).join(" · ")
                })]
              }, `${e.referenceId || e.referenceName || t}`))]
            })]
          }) : F ? null : Xt === "syllabus" && c.jsxs("div", {
            className: "whiteboard-outline-panel",
            children: [c.jsxs("button", {
              type: "button",
              className: "whiteboard-outline-add-btn",
              onClick: () => On(e => !e),
              children: [c.jsx("span", {
                className: "whiteboard-outline-plus",
                children: "+"
              }), c.jsx("span", {
                children: O("whiteboard.outline.addCourseSession")
              })]
            }), Fn && c.jsx("p", {
              className: "whiteboard-outline-selected",
              children: O("whiteboard.outline.currentSession", {
                title: Hn || Fn
              })
            }), An && c.jsxs("div", {
              className: "whiteboard-outline-list",
              children: [Qn && c.jsx("p", {
                className: "whiteboard-outline-hint",
                children: Qn
              }), c.jsx("p", {
                className: "whiteboard-outline-section-title",
                children: O("whiteboard.outline.selectCourseUuid")
              }), Kn && c.jsx("p", {
                className: "whiteboard-outline-hint",
                children: O("whiteboard.outline.loadingCourses")
              }), !Kn && !Qn && Dn.length === 0 && c.jsx("p", {
                className: "whiteboard-outline-hint",
                children: O("whiteboard.outline.noCourses")
              }), Dn.map(e => c.jsxs("button", {
                type: "button",
                className: "whiteboard-outline-option",
                "data-active": Bn === e.uuid ? "true" : "false",
                onClick: () => {
                  var t;
                  if ((t = e.uuid) !== Bn) {
                    Wn(t);
                    Un([]);
                    qn(null);
                    Jn(null);
                    qe(null);
                  }
                },
                children: [c.jsx("span", {
                  className: "whiteboard-outline-option-title",
                  children: e.uuid
                }), e.title && e.title !== e.uuid && c.jsx("span", {
                  className: "whiteboard-outline-option-meta",
                  children: e.title
                })]
              }, e.id)), Bn && c.jsxs(c.Fragment, {
                children: [c.jsx("p", {
                  className: "whiteboard-outline-section-title",
                  children: O("whiteboard.outline.selectWhiteboardSession")
                }), Yn && c.jsx("p", {
                  className: "whiteboard-outline-hint",
                  children: O("whiteboard.outline.loadingSessions")
                }), !Yn && !Qn && zn.length === 0 && c.jsx("p", {
                  className: "whiteboard-outline-hint",
                  children: O("whiteboard.outline.noSessionsForCourse")
                }), zn.map(e => c.jsxs("button", {
                  type: "button",
                  className: "whiteboard-outline-option",
                  "data-active": Fn === e.id ? "true" : "false",
                  onClick: () => (e => {
                    qn(e.id);
                    Jn(e.title);
                    qe(e.id);
                    On(false);
                  })(e),
                  children: [c.jsx("span", {
                    className: "whiteboard-outline-option-title",
                    children: e.title
                  }), c.jsx("span", {
                    className: "whiteboard-outline-option-meta",
                    children: [e.unit_title, e.session_id].filter(Boolean).join(" · ")
                  })]
                }, e.id))]
              })]
            })]
          }), Xt === "artifacts" && (Ke.length === 0 ? c.jsx("p", {
            style: {
              fontSize: 12,
              color: "#a3a3a3",
              fontStyle: "italic"
            },
            children: O("whiteboard.outline.noArtifacts")
          }) : Ke.map(e => {
            var t;
            return c.jsx("div", {
              className: "whiteboard-artifact-item",
              children: e.kind === "note_card" && ((t = e.keypoint) == null ? undefined : t.title) ? e.keypoint.title : O(ft[e.kind] ?? ft.note_card)
            }, e.id);
          }))]
        })]
      })
    }), c.jsxs("div", {
      className: "whiteboard-main",
      children: [hn && c.jsx("div", {
        style: {
          position: "absolute",
          inset: 0,
          zIndex: 15,
          cursor: "default"
        },
        onMouseDown: () => pn(false)
      }), c.jsx(re, {
        onEditorReady: Qe,
        overlayItems: Ke,
        onCanvasLayoutMetrics: nt,
        applyOverlayContentHeightPx: lt,
        applyMermaidGraphHeight: wt,
        onAnimationLoaded: gt,
        onAnimationHeight: vt,
        onNoteRevealDone: yt,
        onZoomChange: Br
      }), di && c.jsx("div", {
        className: "whiteboard-board-skeleton",
        role: "status",
        "aria-label": O("courseSession.preparing"),
        children: c.jsxs("div", {
          className: "whiteboard-board-skeleton-column",
          children: [c.jsx("span", {
            className: "whiteboard-skeleton-block whiteboard-board-skeleton-title"
          }), c.jsx("span", {
            className: "whiteboard-skeleton-block whiteboard-board-skeleton-line"
          }), c.jsx("span", {
            className: "whiteboard-skeleton-block whiteboard-board-skeleton-line whiteboard-board-skeleton-line-short"
          }), c.jsx("span", {
            className: "whiteboard-skeleton-block whiteboard-board-skeleton-card"
          })]
        })
      }), c.jsxs("div", {
        className: "whiteboard-top-page-actions",
        style: {
          right: Dr
        },
        children: [c.jsx(it, {
          percent: Hr,
          canZoomIn: $r < ae - 0.001,
          canZoomOut: $r > se + 0.001,
          onZoomIn: () => qr(ie),
          onZoomOut: () => qr(1 / ie),
          onReset: () => Fr(X)
        }), c.jsxs("div", {
          className: "whiteboard-page-nav",
          role: "group",
          children: [c.jsx("button", {
            className: "whiteboard-page-nav-btn whiteboard-page-nav-arrow",
            "aria-label": O("courseSession.prevPage"),
            disabled: !Ar,
            onClick: () => {
              if (Ar) {
                Fe(Ge[Lr - 1].id);
              }
            },
            children: c.jsx(N, {
              size: 18,
              strokeWidth: 2.25
            })
          }), c.jsxs("div", {
            className: "whiteboard-page-nav-count",
            "aria-live": "polite",
            children: [c.jsx("span", {
              className: "whiteboard-page-nav-current",
              children: Lr + 1
            }), c.jsx("span", {
              className: "whiteboard-page-nav-sep",
              children: "/"
            }), c.jsx("span", {
              className: "whiteboard-page-nav-total",
              children: Math.max(1, Ge.length)
            })]
          }), c.jsx("button", {
            className: "whiteboard-page-nav-btn whiteboard-page-nav-arrow",
            "aria-label": O("courseSession.nextPage"),
            disabled: !Or,
            onClick: () => {
              if (Or) {
                Fe(Ge[Lr + 1].id);
              }
            },
            children: c.jsx(ye, {
              size: 18,
              strokeWidth: 2.25
            })
          })]
        }), false, c.jsxs("button", {
          className: "whiteboard-icon-btn whiteboard-tts-btn",
          "data-whiteboard-tip": O("tts.clickToAdjust"),
          "data-whiteboard-tip-pos": "bottom",
          "aria-label": `${O("tts.title")}: ${O(`tts.voice.${Wt.voiceId}`)} ${me(Wt.speed)}`,
          onClick: () => ir(true),
          children: [c.jsx(he, {
            size: 18
          }), c.jsxs("span", {
            className: "whiteboard-tts-btn-label",
            children: [O(`tts.voice.${Wt.voiceId}`), " · ", me(Wt.speed)]
          })]
        }), c.jsxs("div", {
          className: "whiteboard-export-menu-wrap",
          children: [c.jsx("button", {
            className: "whiteboard-icon-btn",
            "data-active": Vn ? "true" : "false",
            "data-whiteboard-tip": O("courseSession.exportBoard"),
            "data-whiteboard-tip-pos": "bottom",
            "aria-label": O("courseSession.exportBoard"),
            disabled: tr || Re,
            onClick: () => er(e => !e),
            children: c.jsx(_e, {
              size: 18
            })
          }), Vn && c.jsxs(c.Fragment, {
            children: [c.jsx("div", {
              className: "whiteboard-export-menu-backdrop",
              onClick: () => er(false)
            }), c.jsxs("div", {
              className: "whiteboard-export-menu",
              role: "menu",
              children: [c.jsx("p", {
                className: "whiteboard-export-menu-title",
                children: O("courseSession.exportCurrentPage")
              }), c.jsx("button", {
                type: "button",
                role: "menuitem",
                onClick: () => Ei("jpg"),
                children: "JPG"
              }), c.jsx("button", {
                type: "button",
                role: "menuitem",
                onClick: () => Ei("pdf"),
                children: "PDF"
              }), c.jsx("p", {
                className: "whiteboard-export-menu-title",
                children: O("courseSession.exportAllPages")
              }), c.jsx("button", {
                type: "button",
                role: "menuitem",
                onClick: () => Li("jpg"),
                children: "JPG"
              }), c.jsx("button", {
                type: "button",
                role: "menuitem",
                onClick: () => Li("pdf"),
                children: "PDF"
              })]
            })]
          })]
        }), c.jsx(C, {
          variant: "whiteboard",
          apiPrefix: "/api/v1/whiteboard",
          sessionPing: Rt,
          runModelProbe: Tt,
          muted: !Zt,
          narrationPlaying: kt,
          conversationId: Q
        }), c.jsx(ve, {
          conversationId: $ || W || undefined,
          source: "whiteboard",
          variant: "header-icon"
        })]
      }), tr && c.jsx("div", {
        className: "whiteboard-export-progress-overlay",
        role: "status",
        "aria-live": "polite",
        children: O("courseSession.exporting")
      }), En && c.jsxs("div", {
        className: "whiteboard-page-turn-toast",
        role: "status",
        "aria-live": "polite",
        children: [c.jsx("span", {
          className: "whiteboard-page-turn-toast-icon",
          "aria-hidden": "true",
          children: "↷"
        }), c.jsx("span", {
          children: O("courseSession.turnedToNewPage")
        })]
      }, Rn), (D || F) && c.jsxs("div", {
        className: "whiteboard-session-header",
        style: {
          right: Jr,
          ...(nn ? {
            left: 324
          } : null)
        },
        children: [c.jsx("button", {
          className: "whiteboard-exit-course-btn",
          onClick: () => jn(true),
          "data-whiteboard-tip": O("courseSession.exitSession"),
          "data-whiteboard-tip-pos": "bottom",
          "aria-label": O("courseSession.exitSession"),
          children: c.jsx(de, {
            size: 18,
            strokeWidth: 2.25,
            "aria-hidden": "true"
          })
        }), mi ? c.jsx("div", {
          className: "whiteboard-session-title-pill",
          title: Xr,
          children: Xr
        }) : c.jsx("div", {
          className: "whiteboard-session-title-pill whiteboard-session-title-pill--loading",
          "aria-hidden": "true",
          children: c.jsx("span", {
            className: "whiteboard-skeleton-block whiteboard-session-title-skeleton"
          })
        })]
      }), kn && c.jsx("div", {
        className: "whiteboard-modal-overlay",
        onClick: () => jn(false),
        children: c.jsxs("div", {
          className: "whiteboard-modal-card",
          role: "dialog",
          "aria-modal": "true",
          "aria-label": O("courseSession.exitConfirmTitle"),
          onClick: e => e.stopPropagation(),
          children: [c.jsx("div", {
            className: "whiteboard-modal-illustration",
            children: c.jsx("img", {
              src: "/pages/mainPages/courses/question.png",
              alt: "",
              "aria-hidden": "true",
              className: "whiteboard-modal-illustration-img"
            })
          }), c.jsx("h3", {
            className: "whiteboard-modal-title",
            children: O("courseSession.exitConfirmTitle")
          }), c.jsx("p", {
            className: "whiteboard-modal-desc",
            children: O(F ? "courseSession.standaloneExitConfirmDesc" : "courseSession.exitConfirmDesc")
          }), c.jsxs("div", {
            className: "whiteboard-modal-actions",
            children: [c.jsx("button", {
              className: "whiteboard-modal-btn whiteboard-modal-btn--secondary",
              onClick: () => jn(false),
              children: O("courseSession.exitConfirmCancel")
            }), c.jsxs("button", {
              className: "whiteboard-modal-btn whiteboard-modal-btn--danger",
              onClick: () => {
                jn(false);
                Di();
              },
              children: [c.jsx("img", {
                className: "whiteboard-modal-exit-icon",
                src: "/pages/coursePage/whiteboard/exit.svg",
                alt: "",
                "aria-hidden": "true"
              }), O("courseSession.exitConfirmLeave")]
            })]
          })]
        })
      }), c.jsxs("div", {
        className: "whiteboard-controls",
        style: {
          ...(en ? {
            right: cn + 24
          } : null),
          ...(nn ? {
            left: 324
          } : null)
        },
        children: [c.jsxs("div", {
          className: "whiteboard-ctrl-cluster",
          children: [ti ? c.jsx("button", {
            className: "whiteboard-icon-btn",
            "data-active": nn ? "true" : "false",
            onClick: () => ai(!nn),
            "data-whiteboard-tip": O("whiteboard.outline.panelToggle"),
            "aria-label": O("whiteboard.outline.panelToggle"),
            children: c.jsx(I, {
              size: 18
            })
          }) : c.jsx("button", {
            className: "whiteboard-icon-btn",
            onClick: () => St(),
            "data-whiteboard-tip": O(kt ? "courseSession.pauseNarration" : "courseSession.resumeNarration"),
            "aria-label": O(kt ? "courseSession.pauseNarration" : "courseSession.resumeNarration"),
            children: kt ? c.jsx(xe, {
              size: 18
            }) : c.jsx(Se, {
              size: 18
            })
          }), c.jsx("button", {
            className: "whiteboard-icon-btn",
            "data-active": Zt ? "true" : "false",
            onClick: () => Qt(e => !e),
            "data-whiteboard-tip": O(Zt ? "courseSession.muteSound" : "courseSession.unmuteSound"),
            "aria-label": O(Zt ? "courseSession.muteSound" : "courseSession.unmuteSound"),
            children: Zt ? c.jsx(ke, {
              size: 18
            }) : c.jsx(je, {
              size: 18
            })
          })]
        }), c.jsx("div", {
          className: "whiteboard-caption",
          children: c.jsxs("div", {
            className: "whiteboard-caption-stack",
            children: [(zt === "listening" || zt === "thinking") && c.jsxs("div", {
              className: "whiteboard-interject",
              "data-state": zt,
              children: [c.jsx("span", {
                className: "whiteboard-interject-dot",
                "aria-hidden": "true"
              }), c.jsx("span", {
                className: "whiteboard-interject-text",
                children: O(zt === "listening" ? "courseSession.interjectListening" : "courseSession.interjectThinking")
              })]
            }), c.jsx(ht, {
              text: Rr,
              revealFrom: Mr,
              streaming: Tr
            }), (yn || (Le == null ? undefined : Le.mode) === "choice") && c.jsx(rt, {
              ask: yn ? yn.ask : Le,
              result: yn ? yn.result : null,
              disabled: !!yn || !Er,
              captionText: Rr,
              onPick: e => {
                const t = Le;
                if (!t || t.mode !== "choice" || !Er) {
                  return;
                }
                const n = Ae(e, Fn);
                if (n !== undefined) {
                  if (n !== null && Zt) {
                    const e = new Audio(n ? "/sounds/answer-correct.mp3" : "/sounds/answer-wrong.mp3");
                    e.volume = 0.6;
                    e.play().catch(() => {});
                  }
                  fn(false);
                  xn({
                    ask: t,
                    result: {
                      index: e,
                      correct: n
                    }
                  });
                  if (Sn.current) {
                    window.clearTimeout(Sn.current);
                  }
                  Sn.current = window.setTimeout(() => xn(null), 8000);
                }
              }
            })]
          })
        }), c.jsxs("div", {
          className: "whiteboard-ctrl-cluster",
          children: [!en && !hn && _i("cluster"), !en && c.jsx("span", {
            className: "whiteboard-morph-tip",
            "data-whiteboard-tip": hn ? undefined : O("courseSession.typeMessage"),
            children: c.jsxs("div", {
              ref: wr,
              className: `whiteboard-morph${hn ? " whiteboard-morph--expanded" : " whiteboard-icon-btn whiteboard-morph--collapsed"}${hn && wn ? " whiteboard-input-flash" : ""}`,
              style: {
                width: hn ? 300 : undefined,
                cursor: hn ? "default" : "pointer"
              },
              onClick: hn ? undefined : () => pn(e => {
                if (e && mr.current) {
                  mr.current.style.height = "auto";
                }
                return !e;
              }),
              children: [c.jsx("div", {
                className: "whiteboard-morph-icon",
                style: {
                  opacity: hn ? 0 : 1
                },
                children: c.jsx(M, {
                  size: 18,
                  "aria-hidden": "true"
                })
              }), hn && Cn.length > 0 && c.jsx("div", {
                className: "whiteboard-morph-attachments",
                children: c.jsx(ut, {
                  items: Cn,
                  onRemove: fi,
                  removeLabel: O("courseSession.attachments.remove")
                })
              }), c.jsxs("div", {
                className: "whiteboard-morph-input",
                "data-visible": hn ? "true" : "false",
                style: {
                  opacity: hn ? 1 : 0
                },
                children: [c.jsx("button", {
                  type: "button",
                  className: "whiteboard-morph-attach",
                  onClick: e => {
                    var t;
                    e.stopPropagation();
                    if ((t = pr.current) != null) {
                      t.click();
                    }
                  },
                  disabled: !Er || Gt || Cn.length >= 4,
                  "aria-label": O("courseSession.attachments.add"),
                  title: O("courseSession.attachments.add"),
                  children: c.jsx(be, {
                    size: 15
                  })
                }), c.jsx("textarea", {
                  ref: mr,
                  className: "whiteboard-morph-textarea",
                  value: _n,
                  onChange: e => {
                    Nn(e.target.value);
                    (() => {
                      const e = mr.current;
                      if (e) {
                        e.style.height = "auto";
                        e.style.height = `${Math.min(e.scrollHeight, 160)}px`;
                      }
                    })();
                  },
                  onKeyDown: Ni,
                  onPaste: gi,
                  placeholder: O(Gt ? "courseSession.voiceListeningPlaceholder" : Y ? Z ? Te || Ee ? "courseSession.finishConfirmFirst" : bn ? "courseSession.answerPlaceholder" : Yt ? "courseSession.voiceInterruptLoading" : "courseSession.inputPlaceholder" : "courseSession.preparing" : "courseSession.connecting"),
                  disabled: !Er || Gt,
                  rows: 1
                }), _i("morph"), c.jsx("button", {
                  className: "whiteboard-morph-send",
                  "data-processing": Ft ? "true" : "false",
                  onClick: e => {
                    e.stopPropagation();
                    if (Ft && !_n.trim()) {
                      We();
                    } else {
                      vi();
                    }
                  },
                  disabled: !Ft && (!_n.trim() && pi.length === 0 || hi || !Er),
                  "aria-label": Ft && !_n.trim() ? O("courseSession.stopOutput") : O("courseSession.send"),
                  children: Ft && !_n.trim() ? c.jsx("span", {
                    className: "whiteboard-stop-square",
                    "aria-hidden": "true"
                  }) : c.jsx(fe, {
                    size: 14,
                    color: "#fff"
                  })
                })]
              })]
            })
          }), c.jsx("button", {
            className: "whiteboard-icon-btn",
            "data-active": en ? "true" : "false",
            onClick: $i,
            "data-whiteboard-tip": O("courseSession.chatHistory"),
            "aria-label": O("courseSession.chatHistory"),
            children: c.jsx("img", {
              className: "whiteboard-chat-toggle-icon",
              src: "/pages/coursePage/whiteboard/chat.svg",
              alt: "",
              "aria-hidden": "true"
            })
          })]
        })]
      })]
    }), ti && !nn && !De && c.jsxs("div", {
      className: "wb-conv-outline",
      style: {
        right: en ? cn + 20 : 20
      },
      children: [c.jsx("span", {
        className: "wb-conv-outline__heading",
        children: O("whiteboard.outline.trackerLabel")
      }), c.jsx("div", {
        className: "wb-conv-outline__track",
        children: ei.map((e, t) => {
          const n = ii(t);
          const r = n !== "upcoming";
          const i = t === ei.length - 1;
          const s = ["wb-conv-outline__stop-wrapper", r ? "wb-conv-outline__stop-wrapper--lit" : "", t !== si || i ? "" : "wb-conv-outline__stop-wrapper--gap-to-next"].filter(Boolean).join(" ");
          const a = ["wb-conv-outline__stop", n === "done" ? "wb-conv-outline__stop--past" : "", n === "current" ? "wb-conv-outline__stop--active wb-conv-outline__stop--ripple" : "", n === "upcoming" ? "wb-conv-outline__stop--predicted" : ""].filter(Boolean).join(" ");
          return c.jsx("div", {
            className: s,
            children: c.jsxs("div", {
              className: a,
              children: [c.jsx("span", {
                className: "wb-conv-outline__label",
                children: e
              }), c.jsx("span", {
                className: "wb-conv-outline__dot",
                "aria-hidden": "true"
              })]
            })
          }, t);
        })
      })]
    }), ti && c.jsx("div", {
      className: "whiteboard-outline",
      "data-open": nn ? "true" : "false",
      style: {
        width: nn ? ot : 0
      },
      children: c.jsxs("div", {
        className: "whiteboard-outline-inner",
        children: [c.jsxs("div", {
          className: "whiteboard-outline-header",
          children: [c.jsxs("div", {
            className: "whiteboard-outline-heading",
            children: [ni && c.jsx("div", {
              className: "whiteboard-outline-breadcrumb",
              title: ni,
              children: ni
            }), c.jsx("div", {
              className: "whiteboard-outline-title",
              title: Xr,
              children: Xr
            })]
          }), c.jsx("button", {
            className: "whiteboard-chat-icon-btn",
            onClick: () => ai(false),
            "aria-label": O("whiteboard.outline.panelClose"),
            children: c.jsx(de, {
              size: 16
            })
          })]
        }), c.jsxs("div", {
          className: "whiteboard-outline-scroll",
          children: [c.jsx("div", {
            className: "whiteboard-outline-section-label",
            children: O("whiteboard.outline.learnSection")
          }), c.jsx("ol", {
            className: "whiteboard-outline-keypoints",
            children: ei.map((e, t) => {
              const n = ii(t);
              return c.jsxs("li", {
                className: "whiteboard-outline-keypoint",
                "data-status": n,
                children: [c.jsx("span", {
                  className: "whiteboard-outline-keypoint-marker",
                  "aria-hidden": "true",
                  children: n === "done" ? c.jsx(ue, {
                    size: 12,
                    strokeWidth: 2.5
                  }) : c.jsx("span", {
                    className: "whiteboard-outline-keypoint-dot"
                  })
                }), c.jsx("span", {
                  className: "whiteboard-outline-keypoint-text",
                  children: mt(e)
                }), n === "current" && c.jsxs("span", {
                  className: "whiteboard-outline-keypoint-live",
                  "aria-hidden": "true",
                  children: [c.jsx("span", {}), c.jsx("span", {}), c.jsx("span", {})]
                })]
              }, t);
            })
          })]
        }), c.jsxs("div", {
          className: "whiteboard-outline-practice",
          children: [c.jsx("span", {
            className: "whiteboard-outline-section-label whiteboard-outline-practice-label",
            children: O("whiteboard.outline.practiceSection")
          }), c.jsxs("button", {
            type: "button",
            className: "whiteboard-outline-practice-btn",
            onClick: () => {
              (async () => {
                if (!D || !$ || sn) {
                  return;
                }
                an(true);
                let e = false;
                try {
                  const t = await ge(D);
                  e = t.practice === "generating" && (t.generatingSessionIds === null || t.generatingSessionIds.includes($));
                } finally {
                  an(false);
                }
                if (e) {
                  ln(true);
                } else {
                  Ut(`/course/${encodeURIComponent(D)}/practice/${encodeURIComponent($)}`);
                }
              })();
            },
            disabled: sn,
            children: [sn ? c.jsx("span", {
              className: "whiteboard-outline-practice-spinner",
              "aria-hidden": "true"
            }) : c.jsxs("svg", {
              width: "13",
              height: "13",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "1.8",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              "aria-hidden": "true",
              children: [c.jsx("path", {
                d: "M12 20h9"
              }), c.jsx("path", {
                d: "M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5Z"
              })]
            }), O("whiteboard.outline.practiceStart")]
          })]
        })]
      })
    }), c.jsxs("div", {
      className: "whiteboard-chat" + (dn ? " whiteboard-chat--resizing" : ""),
      "data-open": en ? "true" : "false",
      style: {
        width: en ? cn : 0
      },
      children: [en && c.jsx("div", {
        className: "whiteboard-chat-resize-zone",
        role: "separator",
        "aria-orientation": "vertical",
        "aria-label": O("courseSession.resizeConversationPanel"),
        "aria-valuemin": 300,
        "aria-valuemax": 560,
        "aria-valuenow": cn,
        onMouseDown: e => {
          e.preventDefault();
          mn(true);
        },
        children: c.jsx("span", {
          className: "whiteboard-chat-resize-handle"
        })
      }), c.jsxs("div", {
        className: "whiteboard-chat-inner",
        onDragEnter: e => {
          if (Er && wi(e)) {
            e.preventDefault();
            e.stopPropagation();
            Pn(true);
          }
        },
        onDragOver: e => {
          if (Er && wi(e)) {
            e.preventDefault();
            e.stopPropagation();
          }
        },
        onDragLeave: e => {
          e.preventDefault();
          e.stopPropagation();
          if (!e.currentTarget.contains(e.relatedTarget)) {
            Pn(false);
          }
        },
        onDrop: e => {
          if (Er) {
            e.preventDefault();
            e.stopPropagation();
            Pn(false);
            bi(e.dataTransfer.files);
          }
        },
        children: [Mn && c.jsx("div", {
          className: "whiteboard-chat-drop-overlay",
          children: c.jsx("span", {
            children: O("courseSession.attachments.dropHint")
          })
        }), c.jsxs("div", {
          className: "whiteboard-chat-header",
          children: [c.jsx("span", {
            children: O("courseSession.conversationRecord")
          }), c.jsx("div", {
            className: "whiteboard-chat-header-actions",
            children: c.jsx("button", {
              className: "whiteboard-chat-icon-btn",
              onClick: $i,
              children: c.jsx(de, {
                size: 16
              })
            })
          })]
        }), c.jsxs("div", {
          className: "whiteboard-chat-messages",
          ref: br,
          children: [(di || B) && !ui && c.jsx(c.Fragment, {
            children: [0, 1].map(e => c.jsxs("div", {
              className: "whiteboard-chat-skeleton",
              "aria-hidden": "true",
              children: [c.jsx("div", {
                className: "whiteboard-chat-skeleton-avatar"
              }), c.jsxs("div", {
                className: "whiteboard-chat-skeleton-body",
                children: [c.jsx("div", {
                  className: "whiteboard-chat-skeleton-line whiteboard-chat-skeleton-line-long"
                }), c.jsx("div", {
                  className: "whiteboard-chat-skeleton-line whiteboard-chat-skeleton-line-mid"
                }), c.jsx("div", {
                  className: "whiteboard-chat-skeleton-line whiteboard-chat-skeleton-line-short"
                })]
              })]
            }, `chat-skeleton-${e}`))
          }), Pe.map(e => c.jsx(oe, {
            item: e,
            onPlayAudio: e => {
              if (Bt.isPlaying && Bt.currentUrl === e) {
                Bt.pause();
              } else {
                Bt.play(e);
              }
            },
            playingUrl: Bt.isPlaying ? Bt.currentUrl : null
          }, e.id)), ci && c.jsxs("div", {
            className: "whiteboard-chat-skeleton",
            "aria-label": O("courseSession.generatingReply"),
            children: [c.jsx("div", {
              className: "whiteboard-chat-skeleton-avatar"
            }), c.jsxs("div", {
              className: "whiteboard-chat-skeleton-body",
              children: [c.jsx("div", {
                className: "whiteboard-chat-skeleton-line whiteboard-chat-skeleton-line-long"
              }), c.jsx("div", {
                className: "whiteboard-chat-skeleton-line whiteboard-chat-skeleton-line-mid"
              }), c.jsx("div", {
                className: "whiteboard-chat-skeleton-line whiteboard-chat-skeleton-line-short"
              })]
            })]
          }), Ft && !ci && c.jsxs("div", {
            className: "whiteboard-chat-generating",
            role: "status",
            "aria-live": "polite",
            children: [c.jsxs("span", {
              className: "whiteboard-chat-generating-dots",
              "aria-hidden": "true",
              children: [c.jsx("span", {}), c.jsx("span", {}), c.jsx("span", {})]
            }), c.jsx("span", {
              className: "whiteboard-chat-generating-label",
              children: O("courseSession.narratingReply")
            })]
          }), c.jsx("div", {
            ref: fr
          }), Te && kr.length > 0 && c.jsxs("div", {
            className: "whiteboard-confirm-card",
            children: [c.jsx("p", {
              className: "whiteboard-confirm-title",
              children: O("courseSession.answerQuestion")
            }), kr.map((e, t) => {
              var n;
              return c.jsxs("div", {
                className: "whiteboard-confirm-divider",
                children: [c.jsx("p", {
                  className: "whiteboard-confirm-question",
                  children: e.question
                }), c.jsx("div", {
                  style: {
                    display: "flex",
                    flexDirection: "column",
                    gap: 6,
                    marginTop: 6
                  },
                  children: e.options.map((n, r) => {
                    var i;
                    return c.jsxs("label", {
                      className: "whiteboard-option-label",
                      children: [c.jsx("input", {
                        type: e.is_multiple ? "checkbox" : "radio",
                        name: `q-${t}`,
                        checked: ((i = jr[t]) == null ? undefined : i.selectedIndices.includes(r)) ?? false,
                        onChange: () => ((e, t, n) => {
                          _r(r => {
                            const i = [...r];
                            const s = i[e] ?? {
                              selectedIndices: [],
                              custom: ""
                            };
                            let a = s.selectedIndices;
                            a = n ? a.includes(t) ? a.filter(e => e !== t) : [...a, t] : a.includes(t) ? [] : [t];
                            i[e] = {
                              ...s,
                              selectedIndices: a
                            };
                            return i;
                          });
                        })(t, r, e.is_multiple)
                      }), n]
                    }, r);
                  })
                }), e.allow_custom && c.jsx("input", {
                  className: "whiteboard-custom-input",
                  type: "text",
                  placeholder: O("courseSession.otherNoteOptional"),
                  value: ((n = jr[t]) == null ? undefined : n.custom) ?? "",
                  onChange: e => ((e, t) => {
                    _r(n => {
                      const r = [...n];
                      const i = r[e] ?? {
                        selectedIndices: [],
                        custom: ""
                      };
                      r[e] = {
                        ...i,
                        custom: t
                      };
                      return r;
                    });
                  })(t, e.target.value),
                  style: {
                    marginTop: 6
                  }
                })]
              }, t);
            }), c.jsx("button", {
              className: "whiteboard-btn-primary",
              type: "button",
              onClick: () => {
                if (kr.length) {
                  He(function (e, t) {
                    return e.map((e, n) => {
                      const r = t[n] ?? {
                        selectedIndices: [],
                        custom: ""
                      };
                      const i = [];
                      for (const t of r.selectedIndices) {
                        if (e.options[t] != null) {
                          i.push(e.options[t]);
                        }
                      }
                      const s = r.custom.trim();
                      if (e.allow_custom && s) {
                        i.push(s);
                      }
                      return {
                        question: e.question,
                        selected_indices: [...r.selectedIndices],
                        answer_text: i.length ? i.join(a.t("whiteboard.answers.separator")) : a.t("whiteboard.answers.skipped"),
                        custom_answer: e.allow_custom && s || null
                      };
                    });
                  }(kr, jr));
                }
              },
              children: O("courseSession.submitAnswers")
            })]
          }), Ee && c.jsxs("div", {
            className: "whiteboard-confirm-card",
            children: [c.jsx("p", {
              className: "whiteboard-confirm-question",
              children: O("courseSession.stepCompletedQuestion")
            }), c.jsx("p", {
              className: "whiteboard-confirm-hint",
              children: O("courseSession.stepCompletedHint")
            }), c.jsxs("div", {
              className: "whiteboard-confirm-actions",
              children: [c.jsx("button", {
                className: "whiteboard-btn-primary",
                style: {
                  flex: 1
                },
                type: "button",
                onClick: () => Je("accept"),
                children: O("courseSession.confirmCompleted")
              }), c.jsx("button", {
                className: "whiteboard-btn-secondary",
                type: "button",
                onClick: () => Je("reject"),
                children: O("courseSession.continueStep")
              })]
            })]
          })]
        }), c.jsx("div", {
          className: "whiteboard-chat-input-bar",
          children: c.jsxs("div", {
            className: "whiteboard-chat-input-pill" + (wn ? " whiteboard-input-flash" : ""),
            "data-listening": Gt ? "true" : "false",
            children: [Cn.length > 0 && c.jsx(ut, {
              items: Cn,
              onRemove: fi,
              removeLabel: O("courseSession.attachments.remove")
            }), c.jsxs("div", {
              className: "whiteboard-chat-input-row",
              children: [c.jsx("button", {
                type: "button",
                className: "whiteboard-chat-attach",
                onClick: () => {
                  var e;
                  if ((e = pr.current) == null) {
                    return undefined;
                  } else {
                    return e.click();
                  }
                },
                disabled: !Er || Gt || Cn.length >= 4,
                "aria-label": O("courseSession.attachments.add"),
                title: O("courseSession.attachments.add"),
                children: c.jsx(be, {
                  size: 16
                })
              }), c.jsx("textarea", {
                ref: hr,
                value: _n,
                onChange: e => {
                  Nn(e.target.value);
                  (() => {
                    const e = hr.current;
                    if (e) {
                      e.style.height = "auto";
                      e.style.height = `${Math.min(e.scrollHeight, 160)}px`;
                    }
                  })();
                },
                onKeyDown: Ni,
                onPaste: gi,
                placeholder: O(Gt ? "courseSession.voiceListeningPlaceholder" : Y ? Z ? Te || Ee ? "courseSession.finishConfirmFirst" : bn ? "courseSession.answerPlaceholder" : Yt ? "courseSession.voiceInterruptLoading" : "courseSession.inputPlaceholder" : "courseSession.preparing" : "courseSession.connecting"),
                disabled: !Er || Gt,
                rows: 1
              }), _i("chat"), c.jsx("button", {
                className: "whiteboard-chat-send",
                "data-processing": Ft ? "true" : "false",
                onClick: Ft && !_n.trim() ? We : vi,
                disabled: !Ft && (!_n.trim() && pi.length === 0 || hi || !Er),
                "aria-label": Ft && !_n.trim() ? O("courseSession.stopOutput") : O("courseSession.send"),
                children: Ft && !_n.trim() ? c.jsx("span", {
                  className: "whiteboard-stop-square",
                  "aria-hidden": "true"
                }) : c.jsx("img", {
                  src: "/pages/mainPages/home/arrow.svg",
                  alt: "",
                  "aria-hidden": "true"
                })
              })]
            })]
          })
        }), c.jsx("input", {
          ref: pr,
          type: "file",
          multiple: true,
          accept: "image/png,image/jpeg,.png,.jpg,.jpeg",
          style: {
            display: "none"
          },
          onChange: e => {
            bi(e.target.files);
            e.target.value = "";
          }
        })]
      })]
    }), c.jsx(P, {
      open: lr,
      onConfirm: e => {
        L(e);
        Kt.current = true;
        Jt.setEnabled(e === "voice");
        cr(false);
        ji();
      }
    }), c.jsx(pe, {
      open: rr,
      onClose: () => ir(false),
      voiceId: Wt.voiceId,
      speed: Wt.speed,
      onChange: Pt,
      narrationPlaying: kt
    }), c.jsx(we, {
      kind: on ? "practice" : null,
      onClose: () => ln(false)
    })]
  });
}
export { wt as WhiteboardPage };