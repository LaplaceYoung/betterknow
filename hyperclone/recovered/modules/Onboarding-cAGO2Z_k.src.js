import { g as e, c as n, A as a, r, j as o, F as t, b as i, M as s, B as c, C as d, u as l, as as u, v as b, at as g } from "./index-TjoB2Buo.js";
import { f as m, l as h, d as p, e as f, i as w, C as x, m as k, p as v, k as y, c as j, W as N, M as C, n as S } from "./MessageBubble-SHcXdv80.js";
import { updateProfileMemory as z } from "./updateProfileMemory-DlSji0e-.js";
import { c as E } from "./createLucideIcon-B4HcG4gb.js";
import { X as T } from "./x-BPqZ-rfi.js";
import { P as M, a as _, V as P, b as I } from "./percentages-BXMCSKIN-CoqTm4Ai.js";
import { r as R } from "./index-qYFgNVxk.js";
import { C as L } from "./check-BBSENZCf.js";
import "./copy-jHTWzodI.js";
import "./index-CMJxjNZ8.js";
import "./with-selector-U5gkSzzZ.js";
import "./loader-circle-BZEIbChB.js";
/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const H = E("rotate-ccw", [["path", {
  d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",
  key: "1357e3"
}], ["path", {
  d: "M3 3v5h5",
  key: "1xhq8a"
}]]);
const q = e => e.replace(/\s+/g, "");
const $ = e => ({
  Authorization: `Bearer ${e}`,
  accept: "application/json",
  "Content-Type": "application/json"
});
function A({
  headline: e,
  children: n,
  showCharacter: a = true,
  characterClip: i = "/pages/mainPages/animations/char-floating.mp4",
  back: s,
  next: c,
  rotateAtMs: d,
  actionsAtMs: l
}) {
  const u = typeof e == "string" ? [e] : e;
  const [b, g] = r.useState(!a);
  const [m, h] = r.useState(false);
  const [p, f] = r.useState(false);
  const [w, x] = r.useState(0);
  r.useEffect(() => {
    const e = a ? 2850 : 1200;
    const n = [setTimeout(() => g(true), a ? 2200 : 0), setTimeout(() => h(true), e), setTimeout(() => f(true), l ?? e), ...u.slice(1).map((n, a) => setTimeout(() => x(a + 1), (d == null ? undefined : d[a]) ?? e + 1100 + a * 3600))];
    return () => n.forEach(clearTimeout);
  }, [a, u.length, d, l]);
  return o.jsxs("div", {
    className: "onboarding-brief",
    "data-docked": b ? "true" : "false",
    "data-revealed": m ? "true" : "false",
    "data-actions": p ? "true" : "false",
    children: [o.jsxs("header", {
      className: "onboarding-brief-head",
      children: [a && o.jsx("div", {
        className: "onboarding-brief-char",
        children: o.jsx(t, {
          src: i
        })
      }), o.jsx("h1", {
        className: "onboarding-brief-headline",
        "data-rotating": u.length > 1 ? "true" : undefined,
        children: o.jsx("span", {
          className: "onboarding-brief-line",
          "data-rolled": w > 0 ? "true" : undefined,
          children: u[w]
        }, w)
      })]
    }), o.jsx("div", {
      className: "onboarding-brief-panel",
      children: n
    }), o.jsxs("div", {
      className: "onboarding-brief-actions",
      children: [s, c]
    })]
  });
}
function O({
  src: e,
  label: n
}) {
  return o.jsx("div", {
    className: "onboarding-brief-video",
    "data-empty": e ? "false" : "true",
    children: e ? o.jsx("video", {
      src: e,
      poster: e.replace(/\.mp4$/, ".webp"),
      autoPlay: true,
      loop: true,
      muted: true,
      playsInline: true,
      "aria-label": n,
      children: o.jsx("track", {
        kind: "captions"
      })
    }) : o.jsx("span", {
      className: "onboarding-brief-video-empty",
      children: n
    })
  });
}
const W = 0.78;
const D = 900;
const U = /[㐀-䶿一-鿿]/;
const B = (e, n, a) => Math.min(a, Math.max(n, e));
const F = e => new Promise(n => setTimeout(n, e));
function K() {
  const [e, a] = r.useState([]);
  const [o, t] = r.useState([]);
  const [i, s] = r.useState("");
  const [c, d] = r.useState(0);
  const [l, u] = r.useState(null);
  const [b, g] = r.useState(null);
  const [N, C] = r.useState("idle");
  const [S, z] = r.useState(true);
  const [E, T] = r.useState(true);
  const M = r.useRef(null);
  const _ = r.useRef(null);
  const P = r.useRef(null);
  const I = r.useRef([]);
  const R = r.useRef(0);
  const L = r.useRef(null);
  const H = r.useCallback(() => {
    if (L.current !== null) {
      cancelAnimationFrame(L.current);
      L.current = null;
    }
  }, []);
  const q = r.useRef(false);
  const $ = r.useRef(0);
  const A = r.useRef(null);
  const O = r.useRef(new Map());
  const K = r.useRef(null);
  const X = r.useRef(E);
  X.current = E;
  const Y = r.useRef(null);
  const J = r.useRef([]);
  const Q = r.useRef(false);
  r.useEffect(() => {
    const e = new Audio();
    K.current = e;
    const n = O.current;
    return () => {
      var a;
      var r;
      $.current += 1;
      if ((a = A.current) != null) {
        a.call(A, null);
      }
      n.forEach(e => clearTimeout(e));
      n.clear();
      e.pause();
      e.removeAttribute("src");
      if ((r = Y.current) != null) {
        r.call(Y);
      }
    };
  }, []);
  const G = r.useCallback(() => Q.current ? new Promise(e => {
    J.current.push(e);
  }) : Promise.resolve(), []);
  const V = r.useCallback(() => {
    const e = K.current;
    if (Q.current) {
      Q.current = false;
      z(true);
      const n = J.current;
      J.current = [];
      n.forEach(e => e());
      if ((e == null ? undefined : e.src) && e.paused) {
        e.play().catch(() => {});
      }
    } else {
      Q.current = true;
      z(false);
      if (e != null) {
        e.pause();
      }
    }
  }, []);
  const Z = r.useCallback(() => {
    T(e => {
      var n;
      var a;
      if (e) {
        if ((n = K.current) != null) {
          n.pause();
        }
        if ((a = Y.current) != null) {
          a.call(Y);
        }
      }
      return !e;
    });
  }, []);
  const ee = r.useCallback(e => {
    I.current = e;
    a(e);
  }, []);
  const ne = r.useCallback(e => {
    t(n => [...n, {
      ...e,
      id: `onboarding-msg-${n.length + 1}`,
      timestamp: Date.now()
    }]);
  }, []);
  const ae = r.useCallback((e, n) => {
    e.columns.forEach(n => {
      n.nextY = e.lp.gridTop;
    });
    return n.map(n => {
      const a = e.columns[n.columnIndex ?? 0];
      if (!a) {
        return n;
      }
      const r = a.nextY;
      const o = n.h ?? m(e.lp.tileW);
      a.nextY += o + h;
      return {
        ...n,
        x: a.x,
        y: r,
        w: a.w
      };
    });
  }, []);
  const re = r.useCallback(() => {
    if (_.current) {
      return _.current;
    }
    const e = P.current ?? {
      w: window.innerWidth || 1280,
      h: window.innerHeight || 720
    };
    const n = p(e.w, e.h);
    _.current = f(n, n.gridLeft + 24, w(n.tileW));
    return _.current;
  }, []);
  const oe = r.useCallback(e => {
    M.current = e;
  }, []);
  const te = r.useCallback((e, n) => {
    const a = M.current;
    if (!a) {
      return;
    }
    const r = 26 / W - e;
    const o = 34 / W - n;
    const t = () => {
      var e;
      const n = a.getAppState();
      if (!(Math.abs((((e = n.zoom) == null ? undefined : e.value) ?? 1) - W) < 0.001) || !(Math.abs((n.scrollX ?? 0) - r) < 0.5) || !(Math.abs((n.scrollY ?? 0) - o) < 0.5)) {
        a.updateScene({
          appState: {
            zoom: {
              value: W
            },
            scrollX: r,
            scrollY: o
          }
        });
      }
    };
    H();
    const i = Date.now() + 2000;
    const s = () => {
      if (Date.now() > i) {
        L.current = null;
      } else {
        t();
        L.current = requestAnimationFrame(s);
      }
    };
    t();
    L.current = requestAnimationFrame(s);
  }, [H]);
  const ie = r.useCallback((e, n) => {
    var a;
    if (P.current || e <= 0 || n <= 0) {
      return;
    }
    P.current = {
      w: e,
      h: n
    };
    const r = re();
    te(((a = r.columns[0]) == null ? undefined : a.x) ?? r.lp.gridLeft, r.lp.gridTop);
  }, [re, te]);
  const se = r.useCallback((e, n, a) => {
    const r = _.current;
    if (!r) {
      return;
    }
    const o = I.current.find(n => n.id === e);
    if (!o) {
      return;
    }
    const t = B(Math.round(n), 40, 2400);
    const i = o.columnIndex ?? 0;
    let s = false;
    if (a !== undefined && Math.round(a) > (o.w ?? x)) {
      const e = Math.max(x, Math.round(a) + 16);
      s = k(r, i, e) > 0;
    }
    if (!!s || !(Math.abs(t - (o.h ?? 0)) < 4)) {
      ee(ae(r, I.current.map(n => n.id === e ? {
        ...n,
        h: t
      } : n)));
    }
  }, [ee, ae]);
  const ce = r.useCallback((e, n, a) => {
    const r = O.current;
    const o = r.get(e);
    if (o) {
      clearTimeout(o);
    }
    r.set(e, setTimeout(() => {
      r.delete(e);
      se(e, n, a);
    }, 90));
  }, [se]);
  const de = r.useCallback(e => {
    const n = re();
    const a = v(n, m(n.lp.tileW));
    const r = {
      id: "onboarding-" + ++R.current,
      kind: "note_card",
      keypoint: {
        ...e,
        column: 1
      },
      x: a.x,
      y: a.y,
      w: a.w,
      h: a.h,
      columnIndex: a.columnIndex,
      animateReveal: true
    };
    ee([...I.current, r]);
  }, [ee, re]);
  const le = r.useCallback(e => {
    const n = re();
    const a = v(n, m(n.lp.tileW));
    ee([...I.current, e(a, "onboarding-" + ++R.current)]);
  }, [ee, re]);
  const ue = r.useCallback(async e => {
    const a = K.current;
    if (!a || !e || !X.current) {
      return false;
    }
    a.src = /^https?:\/\//.test(e) ? e : n(e);
    try {
      await a.play();
    } catch {
      return false;
    }
    await new Promise(e => {
      const n = () => {
        a.removeEventListener("ended", n);
        a.removeEventListener("error", n);
        Y.current = null;
        e();
      };
      Y.current = n;
      a.addEventListener("ended", n);
      a.addEventListener("error", n);
    });
    return true;
  }, []);
  const be = r.useCallback(async e => {
    await G();
    switch (e.type) {
      case "speak":
        s(e.text);
        d(e => e + 1);
        ne({
          type: "assistant_text",
          content: e.text
        });
        if (!(await ue(e.audio_url))) {
          await F(e.holdMs ?? (a = e.text, B(a.length * (U.test(a) ? 175 : 55), 1600, 9000)));
        }
        return;
      case "board":
        de(e.keypoint);
        ne({
          type: "action",
          content: "",
          actionKind: "board",
          actionLabel: e.keypoint.title,
          actionDetail: e.keypoint.content,
          actionStatus: "done"
        });
        await F(e.holdMs ?? (n = e.keypoint, B((n.title.length + n.content.length) * 20, D, 3200)));
        return;
      case "image":
        {
          const n = "onboarding-" + ++R.current;
          le(a => ({
            id: n,
            kind: "board_image",
            x: a.x,
            y: a.y,
            w: e.width ?? a.w,
            h: e.height ?? a.h,
            columnIndex: a.columnIndex,
            boardImage: {
              imageUrl: e.imageUrl,
              width: e.width,
              height: e.height,
              caption: e.caption,
              pending: true
            }
          }));
          ne({
            type: "action",
            content: "",
            actionKind: "image",
            actionLabel: e.caption ?? "",
            actionImageUrl: e.imageUrl,
            actionStatus: "done"
          });
          await F(750);
          ee(I.current.map(e => e.id === n && e.boardImage ? {
            ...e,
            boardImage: {
              ...e.boardImage,
              pending: false
            }
          } : e));
          await F(e.holdMs ?? D);
          return;
        }
      case "quiz":
        le((n, a) => ({
          id: a,
          kind: "quiz",
          x: n.x,
          y: n.y,
          w: n.w,
          h: n.h,
          columnIndex: n.columnIndex,
          quiz: {
            id: a,
            totalCount: 1,
            questions: [{
              question: e.question,
              answer_options: e.options.map((e, n) => ({
                index: n,
                content: e
              })),
              correct_answer: e.answerIndex,
              explanation: "",
              index: 0
            }]
          }
        }));
        ne({
          type: "action",
          content: "",
          actionKind: "board",
          actionLabel: e.question,
          actionStatus: "done"
        });
        await F(e.holdMs ?? D);
        return;
      case "new_column":
        {
          const n = re();
          y(n, w(n.lp.tileW));
          if (e.holdMs) {
            await F(e.holdMs);
          }
          return;
        }
      case "highlight":
        {
          const n = [...I.current].reverse().find(e => e.kind === "note_card");
          if (n) {
            const a = {
              id: "onboarding-deco-" + ++R.current,
              kind: e.kind,
              snippet: e.snippet,
              color: e.color
            };
            ee(I.current.map(e => e.id === n.id ? {
              ...e,
              decorations: [...(e.decorations ?? []), a]
            } : e));
            ne({
              type: "action",
              content: "",
              actionKind: e.kind,
              actionLabel: e.snippet,
              actionStatus: "done"
            });
          }
          await F(e.holdMs ?? D);
          return;
        }
      case "user_message":
        ne({
          type: "user",
          content: e.text
        });
        if (e.holdMs) {
          await F(e.holdMs);
        }
        return;
      case "animation":
        {
          const n = "onboarding-" + ++R.current;
          le(a => ({
            id: n,
            kind: "board_animation",
            x: a.x,
            y: a.y,
            w: a.w,
            h: a.h,
            columnIndex: a.columnIndex,
            boardAnimation: {
              html: "",
              task: e.task,
              pending: true
            }
          }));
          ne({
            type: "action",
            content: "",
            actionKind: "animation",
            actionLabel: e.task ?? "",
            actionStatus: "done"
          });
          let a = "";
          try {
            const n = await fetch(e.htmlUrl);
            if (n.ok) {
              a = await n.text();
            }
          } catch {}
          ee(a ? I.current.map(e => e.id === n && e.boardAnimation ? {
            ...e,
            boardAnimation: {
              ...e.boardAnimation,
              html: a,
              pending: false
            }
          } : e) : I.current.filter(e => e.id !== n));
          await F(e.holdMs ?? D);
          return;
        }
      case "pause":
        await F(e.holdMs);
    }
    var n;
    var a;
  }, [de, le, ne, re, ue, G]);
  const ge = r.useCallback(e => {
    C("awaiting-choice");
    u(e);
    return new Promise(e => {
      A.current = e;
    });
  }, []);
  const me = r.useCallback(e => {
    const n = A.current;
    if (!n) {
      return;
    }
    const a = (l == null ? undefined : l.find(n => n.value === e)) ?? null;
    A.current = null;
    u(null);
    if (a) {
      ne({
        type: "user",
        content: a.label
      });
    }
    n(a);
  }, [ne, l]);
  const he = r.useCallback(async e => {
    var n;
    var a;
    var r;
    q.current = false;
    H();
    j();
    $.current += 1;
    const o = $.current;
    const i = () => $.current === o;
    if ((n = A.current) != null) {
      n.call(A, null);
    }
    A.current = null;
    O.current.forEach(e => clearTimeout(e));
    O.current.clear();
    if ((a = K.current) != null) {
      a.pause();
    }
    if ((r = Y.current) != null) {
      r.call(Y);
    }
    Q.current = false;
    J.current.forEach(e => e());
    J.current = [];
    _.current = null;
    R.current = 0;
    ee([]);
    t([]);
    s("");
    u(null);
    g(null);
    z(true);
    C("playing");
    const c = new Map(e.nodes.map(e => [e.id, e]));
    let d = e.start;
    while (i() && d) {
      const e = c.get(d);
      if (!e) {
        break;
      }
      for (const n of e.actions) {
        if (!i()) {
          return;
        }
        await be(n);
      }
      if (!i()) {
        return;
      }
      if (e.end) {
        g(e.end);
        C("ended");
        return;
      }
      if (e.expect) {
        const n = await ge(e.expect.options);
        if (!i() || !n) {
          return;
        }
        C("playing");
        d = n.next ?? e.next;
        continue;
      }
      d = e.next;
    }
    if (i()) {
      C("ended");
    }
  }, [ee, be, ge]);
  return {
    onEditorReady: oe,
    updateCanvasLayoutMetrics: ie,
    applyOverlayContentHeightPx: ce,
    overlayItems: e,
    conversation: o,
    caption: i,
    captionEpoch: c,
    choices: l,
    ending: b,
    phase: N,
    narrationPlaying: S,
    soundOn: E,
    play: he,
    answerChoice: me,
    toggleNarration: V,
    toggleSound: Z
  };
}
const X = {
  strict: false,
  throwOnError: false
};
function Y(e, n) {
  const a = Math.min(Math.max(n, 0), e.length);
  let r = 0;
  while (r < a) {
    const n = e[r];
    if (n === "\\") {
      if (r + 2 > a) {
        return r;
      }
      r += 2;
      continue;
    }
    if (n !== "$") {
      r += 1;
      continue;
    }
    const o = r;
    const t = e.startsWith("$$", r) ? 2 : 1;
    let i = r + t;
    let s = -1;
    while (i < e.length) {
      const n = e[i];
      if (n !== "\\") {
        if (n !== "$") {
          i += 1;
        } else {
          if (t === 1) {
            s = i + 1;
            break;
          }
          if (e.startsWith("$$", i)) {
            s = i + 2;
            break;
          }
          i += 1;
        }
      } else {
        i += 2;
      }
    }
    if (s < 0) {
      r = o + 1;
    } else {
      if (s > a) {
        return s;
      }
      r = s;
    }
  }
  return a;
}
function J({
  text: e,
  revealFrom: n,
  streaming: a
}) {
  const r = e.slice(0, n);
  const t = e.slice(n);
  return o.jsx("span", {
    className: "whiteboard-caption-content",
    children: o.jsxs("span", {
      className: "whiteboard-caption-text",
      children: [o.jsx(s, {
        remarkPlugins: [R, d],
        rehypePlugins: [[c, X]],
        components: {
          p: ({
            children: e
          }) => o.jsx(o.Fragment, {
            children: e
          })
        },
        children: S(r)
      }), t && o.jsx("span", {
        className: "whiteboard-caption-fresh",
        children: t
      }, e.length), a && o.jsx("span", {
        className: "whiteboard-caption-cursor"
      })]
    })
  });
}
function Q({
  script: e,
  onReplay: n,
  onExit: a,
  dock: t
}) {
  const {
    t: s
  } = i();
  const [c, d] = r.useState(true);
  const {
    onEditorReady: l,
    updateCanvasLayoutMetrics: u,
    applyOverlayContentHeightPx: b,
    overlayItems: g,
    conversation: m,
    caption: h,
    captionEpoch: p,
    choices: f,
    phase: w,
    narrationPlaying: x,
    soundOn: k,
    answerChoice: v,
    toggleNarration: y,
    toggleSound: j
  } = e;
  const [S, z] = r.useState("");
  const E = r.useRef(h);
  E.current = h;
  const R = r.useRef(0);
  r.useEffect(() => {
    z("");
    R.current = 0;
    if (!E.current) {
      return;
    }
    let e = 0;
    const n = setInterval(() => {
      const a = E.current;
      const r = e;
      e += 1;
      if (e >= a.length) {
        R.current = a.length;
        z(a);
        clearInterval(n);
        return;
      }
      R.current = Y(a, r);
      z(a.slice(0, Y(a, e)));
    }, 26);
    return () => clearInterval(n);
  }, [p]);
  const L = S.length < h.length;
  const q = r.useRef(null);
  r.useEffect(() => {
    const e = q.current;
    if (e) {
      e.scrollTop = e.scrollHeight;
    }
  }, [m]);
  const $ = s(f ? "onboardingNew.pickAnOption" : "onboardingNew.guidedIntro");
  return o.jsxs("div", {
    className: "whiteboard-root",
    children: [o.jsxs("div", {
      className: "whiteboard-main",
      children: [o.jsx(N, {
        onEditorReady: l,
        overlayItems: g,
        onCanvasLayoutMetrics: u,
        applyOverlayContentHeightPx: b,
        onAnimationHeight: b,
        onNoteRevealDone: () => {}
      }), o.jsxs("div", {
        className: "onboarding-top-actions",
        children: [w === "ended" && n && o.jsx("button", {
          type: "button",
          className: "whiteboard-icon-btn",
          onClick: n,
          "aria-label": s("onboardingNew.replay"),
          children: o.jsx(H, {
            size: 18
          })
        }), a && o.jsx("button", {
          type: "button",
          className: "whiteboard-icon-btn",
          onClick: a,
          "aria-label": s("onboardingNew.skip"),
          children: o.jsx(T, {
            size: 18
          })
        })]
      }), o.jsxs("div", {
        className: "whiteboard-controls",
        style: c ? {
          right: 384
        } : undefined,
        children: [o.jsxs("div", {
          className: "whiteboard-ctrl-cluster",
          children: [o.jsx("button", {
            className: "whiteboard-icon-btn",
            onClick: y,
            "aria-label": s(x ? "courseSession.pauseNarration" : "courseSession.resumeNarration"),
            children: x ? o.jsx(M, {
              size: 18
            }) : o.jsx(_, {
              size: 18
            })
          }), o.jsx("button", {
            className: "whiteboard-icon-btn",
            "data-active": k ? "true" : "false",
            onClick: j,
            "aria-label": s(k ? "courseSession.muteSound" : "courseSession.unmuteSound"),
            children: k ? o.jsx(P, {
              size: 18
            }) : o.jsx(I, {
              size: 18
            })
          })]
        }), o.jsx("div", {
          className: "whiteboard-caption",
          children: o.jsx(J, {
            text: S,
            revealFrom: R.current,
            streaming: L
          })
        }), !c && o.jsx("div", {
          className: "whiteboard-ctrl-cluster",
          children: o.jsx("button", {
            className: "whiteboard-icon-btn",
            onClick: () => d(true),
            "aria-label": s("courseSession.chatHistory"),
            children: o.jsx("img", {
              className: "whiteboard-chat-toggle-icon",
              src: "/pages/coursePage/whiteboard/chat.svg",
              alt: "",
              "aria-hidden": "true"
            })
          })
        })]
      }), o.jsxs("div", {
        className: "onboarding-dock",
        style: c ? {
          right: 360
        } : undefined,
        children: [f && o.jsx("div", {
          className: "onboarding-choices",
          role: "group",
          children: f.map(e => o.jsx("button", {
            type: "button",
            className: "onboarding-choice",
            onClick: () => v(e.value),
            children: e.label
          }, e.value))
        }), t]
      })]
    }), o.jsx("div", {
      className: "whiteboard-chat",
      "data-open": c ? "true" : "false",
      style: {
        width: c ? 360 : 0
      },
      children: o.jsxs("div", {
        className: "whiteboard-chat-inner",
        children: [o.jsxs("div", {
          className: "whiteboard-chat-header",
          children: [o.jsx("span", {
            children: s("courseSession.chatHistory")
          }), o.jsx("div", {
            className: "whiteboard-chat-header-actions",
            children: o.jsx("button", {
              className: "whiteboard-chat-icon-btn",
              onClick: () => d(false),
              "aria-label": s("onboardingNew.skip"),
              children: o.jsx(T, {
                size: 16
              })
            })
          })]
        }), o.jsx("div", {
          className: "whiteboard-chat-messages",
          ref: q,
          children: m.map(e => o.jsx(C, {
            item: e,
            showCopy: false
          }, e.id))
        }), o.jsx("div", {
          className: "whiteboard-chat-input-bar",
          children: o.jsxs("div", {
            className: "whiteboard-chat-input-pill",
            children: [o.jsx("textarea", {
              placeholder: $,
              disabled: true,
              rows: 1
            }), o.jsx("button", {
              className: "whiteboard-chat-send",
              disabled: true,
              "aria-label": s("courseSession.send"),
              children: o.jsx("img", {
                src: "/pages/mainPages/home/arrow.svg",
                alt: "",
                "aria-hidden": "true"
              })
            })]
          })
        })]
      })
    })]
  });
}
const G = {
  en: {
    "board-1": {
      url: "/onboarding-new/narration/en/board-1.bf36a4fd.7a651f9175.mp3",
      ms: 3912
    },
    "board-2": {
      url: "/onboarding-new/narration/en/board-2.f5339911.4cac1c042b.mp3",
      ms: 7147
    },
    "board-3": {
      url: "/onboarding-new/narration/en/board-3.76e8db64.d23cfce88b.mp3",
      ms: 5266
    },
    "board-4": {
      url: "/onboarding-new/narration/en/board-4.6e31d211.863343c6d4.mp3",
      ms: 4490
    },
    "board-5": {
      url: "/onboarding-new/narration/en/board-5.5805e292.a5a6c04cee.mp3",
      ms: 4782
    },
    "board-6": {
      url: "/onboarding-new/narration/en/board-6.a74b3a8c.e74b9815a2.mp3",
      ms: 6443
    },
    "board-7": {
      url: "/onboarding-new/narration/en/board-7.e02e1ecc.bcb3132104.mp3",
      ms: 3735
    },
    "course-1": {
      url: "/onboarding-new/narration/en/course-1.959bbe1e.c8edccec67.mp3",
      ms: 7425
    },
    "course-2": {
      url: "/onboarding-new/narration/en/course-2.2c8cdde3.faca7f3648.mp3",
      ms: 6520
    },
    "course-3": {
      url: "/onboarding-new/narration/en/course-3.3d9ac8cb.9fec60c926.mp3",
      ms: 3596
    },
    "craft-1": {
      url: "/onboarding-new/narration/en/craft-1.c4758879.3dee54f16e.mp3",
      ms: 3221
    },
    "craft-2": {
      url: "/onboarding-new/narration/en/craft-2.4715736e.1650829268.mp3",
      ms: 7125
    },
    "craft-3": {
      url: "/onboarding-new/narration/en/craft-3.6331f329.56f8733768.mp3",
      ms: 5921
    },
    "craft-4": {
      url: "/onboarding-new/narration/en/craft-4.e4bb4e11.10843f257c.mp3",
      ms: 4939
    },
    finish: {
      url: "/onboarding-new/narration/en/finish.1ef12577.c38857b326.mp3",
      ms: 5296
    },
    "greeting-1": {
      url: "/onboarding-new/narration/en/greeting-1.06ec83de.3a6ebc522c.mp3",
      ms: 3334
    },
    "greeting-2": {
      url: "/onboarding-new/narration/en/greeting-2.4601ac72.1a6031089f.mp3",
      ms: 4394
    },
    handover: {
      url: "/onboarding-new/narration/en/handover.1662dc2c.e2a477d88b.mp3",
      ms: 11460
    },
    "instant-1": {
      url: "/onboarding-new/narration/en/instant-1.a518134d.6cdbce7d44.mp3",
      ms: 4882
    },
    "instant-2": {
      url: "/onboarding-new/narration/en/instant-2.fe0688f8.7e3140ac7d.mp3",
      ms: 4447
    },
    "instant-3": {
      url: "/onboarding-new/narration/en/instant-3.0f365543.5d27c86f80.mp3",
      ms: 8253
    }
  },
  es: {
    "board-1": {
      url: "/onboarding-new/narration/es/board-1.0b24456a.228076d094.mp3",
      ms: 4632
    },
    "board-2": {
      url: "/onboarding-new/narration/es/board-2.7c7007df.8fd1749f44.mp3",
      ms: 7097
    },
    "board-3": {
      url: "/onboarding-new/narration/es/board-3.79ae1498.733424c820.mp3",
      ms: 5053
    },
    "board-4": {
      url: "/onboarding-new/narration/es/board-4.688ca972.49a97c8c06.mp3",
      ms: 5195
    },
    "board-5": {
      url: "/onboarding-new/narration/es/board-5.bef3692f.f128847662.mp3",
      ms: 5027
    },
    "board-6": {
      url: "/onboarding-new/narration/es/board-6.dbd54bbe.a01205d942.mp3",
      ms: 6555
    },
    "board-7": {
      url: "/onboarding-new/narration/es/board-7.5e885a23.da61971d66.mp3",
      ms: 4254
    },
    "course-1": {
      url: "/onboarding-new/narration/es/course-1.0f5cf62c.e80327312b.mp3",
      ms: 6064
    },
    "course-2": {
      url: "/onboarding-new/narration/es/course-2.01574dfa.40b57a7bc4.mp3",
      ms: 6696
    },
    "course-3": {
      url: "/onboarding-new/narration/es/course-3.44a1d814.6f29127c4a.mp3",
      ms: 3772
    },
    "craft-1": {
      url: "/onboarding-new/narration/es/craft-1.f28a8f29.bc6066dc54.mp3",
      ms: 3941
    },
    "craft-2": {
      url: "/onboarding-new/narration/es/craft-2.fcc52dfb.49d8d52257.mp3",
      ms: 10066
    },
    "craft-3": {
      url: "/onboarding-new/narration/es/craft-3.eb486599.af75729088.mp3",
      ms: 7023
    },
    "craft-4": {
      url: "/onboarding-new/narration/es/craft-4.b1671e41.d87bf150c7.mp3",
      ms: 5258
    },
    finish: {
      url: "/onboarding-new/narration/es/finish.635c0564.547df0338c.mp3",
      ms: 6932
    },
    handover: {
      url: "/onboarding-new/narration/es/handover.7e68797f.b017081132.mp3",
      ms: 12133
    },
    "instant-1": {
      url: "/onboarding-new/narration/es/instant-1.5856ee84.0e7f8b70b1.mp3",
      ms: 5122
    },
    "instant-2": {
      url: "/onboarding-new/narration/es/instant-2.b34c88b6.b60045a296.mp3",
      ms: 5847
    },
    "instant-3": {
      url: "/onboarding-new/narration/es/instant-3.dc9703c2.6964cf4142.mp3",
      ms: 8603
    }
  },
  ko: {
    "board-1": {
      url: "/onboarding-new/narration/ko/board-1.d09d6da4.4ae9741c55.mp3",
      ms: 4051
    },
    "board-2": {
      url: "/onboarding-new/narration/ko/board-2.626728d0.c31e72fab7.mp3",
      ms: 7036
    },
    "board-3": {
      url: "/onboarding-new/narration/ko/board-3.6108d3b7.918962f486.mp3",
      ms: 3773
    },
    "board-4": {
      url: "/onboarding-new/narration/ko/board-4.abfae6ad.2b4becb2f3.mp3",
      ms: 4332
    },
    "board-5": {
      url: "/onboarding-new/narration/ko/board-5.d5461179.1cef2cbe5e.mp3",
      ms: 5262
    },
    "board-6": {
      url: "/onboarding-new/narration/ko/board-6.582a5922.7fb91c0bb9.mp3",
      ms: 5758
    },
    "board-7": {
      url: "/onboarding-new/narration/ko/board-7.de592d4d.ad4b02e0b4.mp3",
      ms: 4669
    },
    "course-1": {
      url: "/onboarding-new/narration/ko/course-1.ad1517e5.8234e8b6cc.mp3",
      ms: 7144
    },
    "course-2": {
      url: "/onboarding-new/narration/ko/course-2.f5c4de71.e59c737d87.mp3",
      ms: 6039
    },
    "course-3": {
      url: "/onboarding-new/narration/ko/course-3.b1488ab2.facd776c6a.mp3",
      ms: 2588
    },
    "craft-1": {
      url: "/onboarding-new/narration/ko/craft-1.f1c4cce1.ae821f7bd2.mp3",
      ms: 3628
    },
    "craft-2": {
      url: "/onboarding-new/narration/ko/craft-2.e8bf8981.2ad023662b.mp3",
      ms: 9473
    },
    "craft-3": {
      url: "/onboarding-new/narration/ko/craft-3.f4d83f10.b78acb8e02.mp3",
      ms: 5298
    },
    "craft-4": {
      url: "/onboarding-new/narration/ko/craft-4.3e8bccca.e9095e5e27.mp3",
      ms: 4886
    },
    finish: {
      url: "/onboarding-new/narration/ko/finish.6b7e9971.4e78cb207b.mp3",
      ms: 6857
    },
    handover: {
      url: "/onboarding-new/narration/ko/handover.078c294d.2edcae872d.mp3",
      ms: 11043
    },
    "instant-1": {
      url: "/onboarding-new/narration/ko/instant-1.4da0e9da.8174eb3af9.mp3",
      ms: 5753
    },
    "instant-2": {
      url: "/onboarding-new/narration/ko/instant-2.4149b501.033e3b105d.mp3",
      ms: 5965
    },
    "instant-3": {
      url: "/onboarding-new/narration/ko/instant-3.2b997def.3af3444585.mp3",
      ms: 9304
    }
  },
  zh: {
    "board-1": {
      url: "/onboarding-new/narration/zh/board-1.104117aa.42ec766e71.mp3",
      ms: 4090
    },
    "board-2": {
      url: "/onboarding-new/narration/zh/board-2.84d8ce10.9bf2e63d0c.mp3",
      ms: 6807
    },
    "board-3": {
      url: "/onboarding-new/narration/zh/board-3.678262c6.3422f35fef.mp3",
      ms: 3144
    },
    "board-4": {
      url: "/onboarding-new/narration/zh/board-4.d1620c79.dbb8249c9d.mp3",
      ms: 4618
    },
    "board-5": {
      url: "/onboarding-new/narration/zh/board-5.87a5c6a9.543a28a1ac.mp3",
      ms: 5292
    },
    "board-6": {
      url: "/onboarding-new/narration/zh/board-6.d4153c91.ebe89e799c.mp3",
      ms: 5835
    },
    "board-7": {
      url: "/onboarding-new/narration/zh/board-7.215814df.4bde2e62f1.mp3",
      ms: 3849
    },
    "course-1": {
      url: "/onboarding-new/narration/zh/course-1.0b41fb28.b16515d342.mp3",
      ms: 9685
    },
    "course-2": {
      url: "/onboarding-new/narration/zh/course-2.a56311d4.63e84605dd.mp3",
      ms: 5830
    },
    "course-3": {
      url: "/onboarding-new/narration/zh/course-3.5915114c.16e974f67b.mp3",
      ms: 3624
    },
    "craft-1": {
      url: "/onboarding-new/narration/zh/craft-1.ead960c8.114862d5e8.mp3",
      ms: 3662
    },
    "craft-2": {
      url: "/onboarding-new/narration/zh/craft-2.7d89117d.21f09f207d.mp3",
      ms: 8902
    },
    "craft-3": {
      url: "/onboarding-new/narration/zh/craft-3.d9b7c88d.009217b4ee.mp3",
      ms: 5671
    },
    "craft-4": {
      url: "/onboarding-new/narration/zh/craft-4.f482801c.8b2efb6056.mp3",
      ms: 5370
    },
    finish: {
      url: "/onboarding-new/narration/zh/finish.c03b3cf6.72a67c3b4f.mp3",
      ms: 6677
    },
    handover: {
      url: "/onboarding-new/narration/zh/handover.9c73efb6.a096414916.mp3",
      ms: 13087
    },
    "instant-1": {
      url: "/onboarding-new/narration/zh/instant-1.5ab92a82.270f014ec5.mp3",
      ms: 6553
    },
    "instant-2": {
      url: "/onboarding-new/narration/zh/instant-2.4b109709.2e32ed627f.mp3",
      ms: 5262
    },
    "instant-3": {
      url: "/onboarding-new/narration/zh/instant-3.b665f8d6.1eb21aaadc.mp3",
      ms: 9340
    }
  }
};
const V = {
  en: "en",
  es: "es",
  ko: "ko",
  "zh-CN": "zh",
  "zh-TW": "zh"
};
const Z = `${window.location.origin}/onboarding-new/board-parabola.png`;
const ee = `${window.location.origin}/onboarding-new/board-silkroad.png`;
const ne = `${window.location.origin}/onboarding-new/board-orbit.html`;
const ae = (e, n) => {
  var a;
  const r = (a = G[e]) == null ? undefined : a[n];
  if (r) {
    return `${window.location.origin}${r.url}`;
  } else {
    return undefined;
  }
};
function re() {
  const {
    t: e,
    i18n: n
  } = i();
  const a = K();
  const {
    play: t
  } = a;
  const s = V[n.language] ?? "";
  const c = r.useMemo(() => ({
    version: 1,
    language: "preview",
    start: "tour",
    nodes: [{
      id: "tour",
      actions: [{
        type: "speak",
        text: e("onboarding.board.line1"),
        audio_url: ae(s, "board-1")
      }, {
        type: "board",
        keypoint: {
          title: e("onboarding.board.card1Title"),
          content: e("onboarding.board.card1Body"),
          type: "math",
          importance: 3
        }
      }, {
        type: "highlight",
        kind: "highlight",
        snippet: e("onboarding.board.card1Highlight")
      }, {
        type: "speak",
        text: e("onboarding.board.line2"),
        audio_url: ae(s, "board-2")
      }, {
        type: "highlight",
        kind: "circle",
        snippet: e("onboarding.board.card1Circle")
      }, {
        type: "speak",
        text: e("onboarding.board.line3"),
        audio_url: ae(s, "board-3")
      }, {
        type: "user_message",
        text: e("onboarding.board.userQuestion"),
        holdMs: 700
      }, {
        type: "speak",
        text: e("onboarding.board.line4"),
        audio_url: ae(s, "board-4")
      }, {
        type: "image",
        imageUrl: Z,
        width: 220,
        height: 220,
        caption: e("onboarding.board.image1Caption")
      }, {
        type: "new_column"
      }, {
        type: "speak",
        text: e("onboarding.board.line5"),
        audio_url: ae(s, "board-5")
      }, {
        type: "board",
        keypoint: {
          title: e("onboarding.board.card3Title"),
          content: e("onboarding.board.card3Body"),
          type: "text",
          importance: 2
        }
      }, {
        type: "highlight",
        kind: "highlight",
        snippet: e("onboarding.board.card3Highlight")
      }, {
        type: "image",
        imageUrl: ee,
        width: 220,
        height: 220,
        caption: e("onboarding.board.image2Caption")
      }, {
        type: "new_column"
      }, {
        type: "speak",
        text: e("onboarding.board.line6"),
        audio_url: ae(s, "board-6")
      }, {
        type: "animation",
        htmlUrl: ne,
        task: e("onboarding.board.animationTask"),
        holdMs: 1600
      }, {
        type: "speak",
        text: e("onboarding.board.line7"),
        audio_url: ae(s, "board-7")
      }]
    }]
  }), [e, s]);
  r.useEffect(() => {
    t(c);
  }, [t, c]);
  return o.jsx("div", {
    className: "onboarding-board-frame",
    children: o.jsx(Q, {
      script: a,
      onReplay: () => {
        t(c);
      }
    })
  });
}
const oe = {};
const te = {
  role: "source",
  handover: "role",
  craft: "handover",
  course: "craft",
  board: "course",
  instant: "board",
  finish: "instant"
};
const ie = {
  craft: "onboarding.brief.nextLook",
  board: "onboarding.brief.nextWay",
  instant: "onboarding.brief.nextGreat"
};
const se = [{
  key: "craft",
  next: "course",
  video: "/onboarding-new/onbaording-new-1.mp4"
}, {
  key: "course",
  next: "board",
  video: "/onboarding-new/onboarding-new-2.mp4"
}, {
  key: "board",
  next: "instant",
  video: null
}, {
  key: "instant",
  next: "finish",
  video: "/onboarding-new/onboarding-new-4.mp4"
}];
const ce = ["searchEngine", "instagramOrTiktok", "linkedinOrX", "rednote", "friendReferral", "onCampus", "blogPodcastNews", "other"];
const de = ["highSchool", "college", "graduate", "selfLearner", "other"];
const le = "G4n7p1r3";
const ue = "Q7k3m9p2";
const be = {
  searchEngine: "search_engine",
  instagramOrTiktok: "instagram_tiktok",
  linkedinOrX: "linkedin_x",
  rednote: "rednote",
  friendReferral: "friend_referral",
  onCampus: "on_campus",
  blogPodcastNews: "blog_podcast_news",
  other: "other"
};
const ge = [{
  text: "Hi!",
  className: "hello-1"
}, {
  text: "你好!",
  className: "hello-2"
}, {
  text: "¡Hola!",
  className: "hello-3"
}, {
  text: "안녕!",
  className: "hello-4"
}, {
  text: "Hello!",
  className: "hello-5"
}, {
  text: "你好呀",
  className: "hello-6"
}];
const me = "Which language should I speak with you?";
const he = [{
  key: "greeting-1",
  text: "Hi, I'm Orbie. Welcome to Hyperknow!"
}, {
  key: "greeting-2",
  text: "Before we start, could I ask you a few quick questions so I can get to know you?"
}];
const pe = {
  greeting: [he[0].key, he[1].key],
  handover: ["handover"],
  craft: ["craft-1", "craft-2", "craft-3", "craft-4"],
  course: ["course-1", "course-2", "course-3"],
  instant: ["instant-1", "instant-2", "instant-3"],
  finish: ["finish"]
};
const fe = {
  craft: ["craftHeadline1", "craftHeadline2", "craftHeadline3", "craftHeadline4"],
  course: ["courseHeadline1", "courseHeadline2", "courseHeadline3"],
  instant: ["instantHeadline1", "instantHeadline2", "instantHeadline3"]
};
const we = {
  course: "/pages/mainPages/animations/char-stars.mp4",
  instant: "/pages/mainPages/animations/char-petting.mp4"
};
function xe(e, n) {
  const a = pe[e];
  const r = G[Ne.has(e) ? "en" : n];
  if (!a || !r) {
    return [];
  }
  const o = a.map(e => r[e]).filter(Boolean);
  if (o.length === a.length) {
    return o;
  } else {
    return [];
  }
}
const ke = {
  board: 5000
};
let ve = 0;
let ye = null;
function je() {
  if (ye != null) {
    ye.pause();
  }
  ye = null;
}
const Ne = new Set(["greeting"]);
function Ce() {
  return o.jsx("img", {
    src: "/hyperknow-logo-w-text.svg",
    alt: "Hyperknow",
    className: "onboarding-brand"
  });
}
function Se() {
  const s = l();
  const {
    t: c,
    i18n: d
  } = i();
  const [m, h] = r.useState(null);
  const [p, f] = r.useState(null);
  const [w, x] = r.useState(null);
  const [k, v] = r.useState("");
  const y = r.useRef(null);
  const [j, N] = r.useState("");
  const C = r.useRef(null);
  const [S, E] = r.useState("greeting");
  const T = m && V[m] || "";
  const M = r.useMemo(() => function (e) {
    if (e.length < 2) {
      return;
    }
    const n = [];
    let a = 0;
    for (const r of e.slice(0, -1)) {
      a += r.ms;
      n.push(a);
    }
    return n;
  }(xe(S, T)), [S, T]);
  const _ = r.useRef(null);
  const P = r.useCallback(e => {
    const n = _.current;
    if (n != null) {
      n.pause();
    }
    E(e);
    window.setTimeout(() => {
      if (n != null) {
        n.play().catch(() => {});
      }
    }, 700);
  }, []);
  r.useEffect(() => {
    const e = xe(S, T);
    if (!e.length) {
      return;
    }
    const n = ++ve;
    const a = () => n === ve;
    je();
    const r = n => {
      var o;
      if (!a()) {
        return;
      }
      const t = (o = e[n]) == null ? undefined : o.url;
      if (!t) {
        return;
      }
      je();
      const i = new Audio(t);
      ye = i;
      i.addEventListener("ended", () => r(n + 1));
      i.play().catch(() => {
        if (n === 0) {
          (function (e) {
            const n = () => {
              document.removeEventListener("pointerdown", n);
              document.removeEventListener("keydown", n);
              e();
            };
            document.addEventListener("pointerdown", n, {
              once: true
            });
            document.addEventListener("keydown", n, {
              once: true
            });
          })(() => {
            if (a()) {
              r(0);
            }
          });
        }
      });
    };
    r(0);
    return () => {
      if (n === ve) {
        ve += 1;
        je();
      }
    };
  }, [S, T]);
  const I = r.useCallback((e, n, a) => {
    z([{
      question_id: e,
      answer_ids: [n],
      ...(a ? {
        other_text: a
      } : {})
    }]).catch(() => {});
  }, []);
  r.useEffect(() => {
    var e;
    if (w === "other") {
      if ((e = y.current) != null) {
        e.focus();
      }
    }
  }, [w]);
  r.useEffect(() => {
    var e;
    if (p === "other") {
      if ((e = C.current) != null) {
        e.focus();
      }
    }
  }, [p]);
  const R = r.useCallback(() => {
    if (w) {
      I(ue, de.indexOf(w), w === "other" && k.trim() || undefined);
      E("handover");
    }
  }, [w, k, I]);
  const H = r.useCallback(() => {
    if (m) {
      if (d.language !== m) {
        d.changeLanguage(m);
      }
      E("source");
    }
  }, [m, d]);
  const [W, D] = r.useState("closed");
  const [U, B] = r.useState("");
  const [F, K] = r.useState("error");
  const [X, Y] = r.useState(null);
  const J = r.useRef(null);
  const Q = r.useRef(null);
  const G = r.useRef(null);
  const Z = r.useRef(null);
  const ee = W === "open";
  const ne = W === "success" || W === "error";
  const ae = q(U);
  const pe = r.useCallback(() => D("open"), []);
  r.useEffect(() => {
    if (W !== "open") {
      return;
    }
    const e = window.setTimeout(() => {
      var e;
      if ((e = J.current) == null) {
        return undefined;
      } else {
        return e.focus();
      }
    }, 240);
    return () => window.clearTimeout(e);
  }, [W]);
  r.useEffect(() => {
    var e;
    if (S === "source" && ee) {
      if ((e = J.current) != null) {
        e.focus();
      }
    }
  }, [S]);
  const Ne = r.useCallback(() => {
    if (Z.current !== null) {
      window.clearTimeout(Z.current);
      Z.current = null;
    }
    D(e => e === "error" ? "open" : e);
  }, []);
  r.useEffect(() => {
    if (!ee) {
      return;
    }
    const e = e => {
      var n;
      if (!((n = Q.current) == null ? undefined : n.contains(e.target)) && !q(U)) {
        D("closed");
      }
    };
    document.addEventListener("pointerdown", e);
    return () => document.removeEventListener("pointerdown", e);
  }, [ee, U]);
  r.useEffect(() => () => {
    if (G.current !== null) {
      window.clearTimeout(G.current);
    }
    if (Z.current !== null) {
      window.clearTimeout(Z.current);
    }
  }, []);
  const Se = r.useCallback(e => {
    B(q(e).slice(0, 64));
  }, []);
  const ze = r.useCallback(r => {
    const o = q(U);
    if (o && W !== "redeeming" && W !== "success") {
      if (Z.current !== null) {
        window.clearTimeout(Z.current);
        Z.current = null;
      }
      D("redeeming");
      (async r => {
        const o = q(r);
        try {
          const r = e();
          if (!r) {
            return {
              ok: false,
              status: 0,
              error: "No access token found"
            };
          }
          const t = await fetch(n(a.ENDPOINTS.PARTNER_CODE_REDEEM), {
            method: "POST",
            headers: $(r),
            body: JSON.stringify({
              code: o
            })
          });
          const i = await t.json().catch(() => ({}));
          if (!t.ok) {
            const e = typeof (i == null ? undefined : i.detail) == "string" ? i.detail : `HTTP ${t.status}`;
            return {
              ok: false,
              status: t.status,
              error: e
            };
          }
          return {
            ok: true,
            data: i
          };
        } catch (t) {
          return {
            ok: false,
            status: 0,
            error: t instanceof Error ? t.message : "Unknown error"
          };
        }
      })(o).then(e => {
        if (e.ok === false) {
          K(e.status === 409 ? "conflict" : e.status === 400 ? "invalid" : "error");
          D("error");
          Z.current = window.setTimeout(() => {
            Z.current = null;
            D(e => e === "error" ? "open" : e);
          }, 1300);
          return;
        }
        const n = e.data.reward_granted && e.data.reward_kind === "pro_days";
        Y(n ? e.data.reward_value : null);
        D("success");
        if (r) {
          G.current = window.setTimeout(r, 1000);
        }
      });
    }
  }, [U, W]);
  const Ee = r.useCallback(e => {
    if (e.key === "Enter") {
      e.preventDefault();
      ze();
      return;
    }
    if (e.key === "Escape" && !q(U)) {
      D("closed");
    }
  }, [ze, U]);
  const Te = r.useCallback(() => {
    const a = p;
    const r = p === "other" && j.trim() || undefined;
    I(le, ce.indexOf(a), r);
    (async a => {
      const r = e();
      if (r) {
        try {
          await fetch(n("/api/v1/userPollData/userPollData"), {
            method: "POST",
            headers: {
              Authorization: `Bearer ${r}`,
              "Content-Type": "application/json"
            },
            body: JSON.stringify(a)
          });
        } catch {}
      }
    })({
      user_acquisition_sources: [r ? `other: ${r}` : be[a]]
    });
    E("role");
  }, [p, j, I]);
  const Me = r.useCallback(() => {
    if (p && W !== "redeeming") {
      if (q(U) && W !== "success") {
        ze(Te);
      } else {
        Te();
      }
    }
  }, [p, W, U, Te, ze]);
  const _e = W === "success" ? X !== null ? {
    tone: "success",
    text: c("onboarding.referral.success", {
      days: X
    })
  } : {
    tone: "success",
    text: c("onboarding.referral.applied")
  } : W === "error" ? F === "conflict" ? {
    tone: "invalid",
    text: c("onboarding.referral.alreadyRedeemed")
  } : F === "invalid" ? {
    tone: "invalid",
    text: c("onboarding.referral.invalid")
  } : {
    tone: "invalid",
    text: c("onboarding.referral.error")
  } : null;
  const [Pe, Ie] = r.useState(false);
  const Re = r.useCallback(() => {
    if (Pe) {
      return;
    }
    Ie(true);
    u();
    b({
      general_onboarding: true,
      proactive_onboarding: true
    });
    const a = (async a => {
      try {
        const r = e();
        if (!r) {
          return {
            success: false,
            message: "User not authenticated",
            error: "No access token found"
          };
        }
        const o = await fetch(n("/api/v1/onboarding/manage_onboarding"), {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${r}`,
            accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(a)
        });
        const t = await o.json();
        if (o.ok) {
          return {
            success: true,
            message: t.message || "Updated proactive_onboarding."
          };
        } else {
          return {
            success: false,
            message: t.message || "Failed to update onboarding status",
            error: t.error || `HTTP ${o.status}`
          };
        }
      } catch (r) {
        return {
          success: false,
          message: "Network error occurred while updating onboarding status",
          error: r instanceof Error ? r.message : "Unknown error"
        };
      }
    })({
      proactive_onboarding: true
    }).catch(() => {});
    const r = new Promise(e => window.setTimeout(e, 520));
    Promise.all([a, r]).then(() => s("/", {
      state: {
        fromLogin: true
      }
    }));
  }, [Pe, s]);
  if (S !== "finish") {
    const e = S === "picking";
    const n = S === "handover";
    const a = S === "greeting" || n;
    const r = !a && !e;
    const t = e ? "is-picking" : n ? "is-handover" : r ? "is-quiz" : "is-greeting";
    const i = n && xe("handover", T).length > 0;
    const s = se.find(e => e.key === S);
    if (s) {
      return o.jsxs("div", {
        className: "onboarding-root onboarding-intro is-brief",
        children: [o.jsx(Ce, {}), o.jsx(A, {
          headline: fe[s.key] ? fe[s.key].map(e => c(`onboarding.brief.${e}`)) : c(`onboarding.brief.${s.key}Headline`),
          characterClip: we[s.key],
          rotateAtMs: M,
          actionsAtMs: ke[s.key],
          showCharacter: s.key !== "board",
          back: o.jsx("button", {
            type: "button",
            className: "onboarding-quiz-back",
            onClick: () => E(te[S] ?? "handover"),
            children: c("onboarding.back")
          }),
          next: o.jsx("button", {
            type: "button",
            className: "onboarding-cta",
            onClick: () => E(s.next),
            children: c(ie[s.key] ?? "onboarding.continue")
          }),
          children: s.key === "board" ? o.jsx(re, {}) : o.jsx(O, {
            src: s.video ?? undefined,
            label: c("onboarding.brief.videoPending")
          })
        }, s.key)]
      });
    } else {
      return o.jsxs("div", {
        className: `onboarding-root onboarding-intro ${t}${i ? " is-handover-narrated" : ""}`,
        children: [o.jsx(Ce, {}), o.jsxs("div", {
          className: "onboarding-orbie-cloud",
          "aria-hidden": true,
          children: [o.jsx("span", {
            className: "onboarding-orbie-halo"
          }), ge.map(({
            text: e,
            className: n
          }) => o.jsx("span", {
            className: `onboarding-float-hello ${n}`,
            children: e
          }, n)), o.jsx("div", {
            className: "onboarding-orbie",
            children: o.jsx("video", {
              ref: _,
              src: "/pages/mainPages/home/orbie-greeting.mp4",
              poster: "/pages/mainPages/home/orbie-greeting.webp",
              autoPlay: true,
              loop: true,
              muted: true,
              playsInline: true,
              className: "onboarding-orbie-video"
            })
          })]
        }), o.jsxs("div", {
          className: "onboarding-greeting-copy",
          "aria-hidden": !a,
          children: [o.jsx("div", {
            className: "onboarding-greeting-text",
            children: n ? o.jsxs(o.Fragment, {
              children: [o.jsx("p", {
                children: c("onboarding.handoverLine1")
              }), o.jsx("p", {
                children: c("onboarding.handoverLine2")
              })]
            }) : o.jsxs(o.Fragment, {
              children: [o.jsx("p", {
                children: he[0].text
              }), o.jsx("p", {
                children: he[1].text
              })]
            })
          }, S), o.jsx("button", {
            type: "button",
            className: "onboarding-cta onboarding-greeting-cta",
            tabIndex: a ? 0 : -1,
            onClick: () => n ? E("craft") : P("picking"),
            children: n ? c("onboarding.continue") : "Continue"
          }, `${S}-cta`)]
        }), o.jsxs("div", {
          className: "onboarding-lang-column",
          "aria-hidden": !e,
          children: [o.jsx("div", {
            className: "onboarding-lang-head",
            children: o.jsx("h2", {
              className: "onboarding-lang-title",
              children: me
            })
          }), o.jsx("div", {
            className: "onboarding-lang-panel",
            role: "radiogroup",
            "aria-label": me,
            children: g.map(n => o.jsxs("button", {
              type: "button",
              role: "radio",
              "aria-checked": m === n.code,
              "aria-label": n.englishLabel,
              className: "onboarding-lang-option",
              "data-selected": m === n.code ? "true" : "false",
              tabIndex: e ? 0 : -1,
              onClick: () => h(n.code),
              children: [o.jsx("span", {
                className: "onboarding-lang-native",
                children: n.nativeLabel
              }), o.jsx("span", {
                className: "onboarding-lang-mark",
                "aria-hidden": true,
                children: o.jsx(L, {
                  size: 13,
                  strokeWidth: 3
                })
              })]
            }, n.code))
          }), o.jsx("div", {
            className: "onboarding-lang-actions",
            children: o.jsx("button", {
              type: "button",
              className: "onboarding-cta onboarding-lang-confirm",
              disabled: !m,
              tabIndex: e ? 0 : -1,
              onClick: H,
              children: "Confirm"
            })
          })]
        }), o.jsx("div", {
          className: "onboarding-quiz",
          "aria-hidden": !r,
          children: r && o.jsxs("div", {
            className: "onboarding-quiz-panel",
            children: [o.jsx("img", {
              src: "/onboarding-new/rocekt.svg",
              alt: "",
              "aria-hidden": "true",
              className: "onboarding-rocket"
            }), oe[S] && o.jsxs("span", {
              className: "onboarding-quiz-step",
              children: [oe[S], o.jsx("i", {
                children: "/3"
              })]
            }), o.jsxs("h2", {
              className: "onboarding-quiz-title",
              children: [S === "source" && c("onboarding.acquisitionTitle"), S === "role" && c("onboarding.step1Title")]
            }), S === "source" && o.jsxs("div", {
              className: "onboarding-referral",
              ref: Q,
              "data-phase": W,
              children: [o.jsx("div", {
                className: "onboarding-referral-fold",
                "data-shown": W === "closed" ? "true" : "false",
                children: o.jsx("button", {
                  type: "button",
                  className: "onboarding-referral-toggle",
                  tabIndex: W === "closed" ? 0 : -1,
                  onClick: pe,
                  children: c("onboarding.referral.toggle")
                })
              }), o.jsx("div", {
                className: "onboarding-referral-fold",
                "data-shown": ee ? "true" : "false",
                children: o.jsxs("div", {
                  className: "onboarding-referral-field",
                  children: [o.jsx("input", {
                    ref: J,
                    className: "onboarding-referral-input",
                    value: U,
                    onChange: e => Se(e.target.value),
                    onKeyDown: Ee,
                    "aria-label": c("onboarding.referral.toggle"),
                    maxLength: 64,
                    autoComplete: "off",
                    autoCapitalize: "characters",
                    spellCheck: false,
                    tabIndex: ee ? 0 : -1
                  }), o.jsx("button", {
                    type: "button",
                    className: "onboarding-referral-redeem",
                    disabled: !ae,
                    tabIndex: ee ? 0 : -1,
                    onClick: () => ze(),
                    children: c("onboarding.referral.redeem")
                  })]
                })
              }), o.jsx("div", {
                className: "onboarding-referral-fold",
                "data-shown": W === "redeeming" ? "true" : "false",
                children: o.jsx("span", {
                  className: "onboarding-referral-spinner",
                  role: "status",
                  "aria-label": c("onboarding.referral.redeeming")
                })
              }), o.jsx("div", {
                className: "onboarding-referral-fold",
                "data-shown": ne ? "true" : "false",
                children: o.jsx("button", {
                  type: "button",
                  className: "onboarding-referral-verdict",
                  "data-tone": (_e == null ? undefined : _e.tone) ?? "none",
                  disabled: W !== "error",
                  tabIndex: W === "error" ? 0 : -1,
                  onClick: Ne,
                  "aria-live": "polite",
                  children: (_e == null ? undefined : _e.text) ?? ""
                })
              })]
            }), S === "source" && o.jsxs("div", {
              className: "onboarding-chip-group",
              role: "radiogroup",
              "aria-label": c("onboarding.acquisitionTitle"),
              children: [o.jsx("div", {
                className: "onboarding-chips",
                children: ce.filter(e => e !== "other").map(e => o.jsx("button", {
                  type: "button",
                  role: "radio",
                  "aria-checked": p === e,
                  className: "onboarding-chip",
                  "data-selected": p === e ? "true" : "false",
                  onClick: () => f(e),
                  children: c(`onboarding.acquisition.${e}`)
                }, e))
              }), o.jsxs("div", {
                className: "onboarding-other-cell onboarding-other-cell--chip",
                "data-selected": p === "other" ? "true" : "false",
                onClick: () => f("other"),
                children: [o.jsx("button", {
                  type: "button",
                  role: "radio",
                  "aria-checked": p === "other",
                  className: "onboarding-other-trigger",
                  onClick: () => f("other"),
                  children: c("onboarding.acquisition.other")
                }), o.jsx("input", {
                  ref: C,
                  className: "onboarding-other-blank",
                  value: j,
                  onChange: e => N(e.target.value),
                  placeholder: c("onboarding.acquisition.otherPlaceholder"),
                  "aria-label": c("onboarding.acquisition.otherPlaceholder"),
                  maxLength: 120,
                  disabled: p !== "other"
                })]
              })]
            }), S === "role" && o.jsx("div", {
              className: "onboarding-role-group",
              children: o.jsxs("div", {
                className: "onboarding-tiles",
                role: "radiogroup",
                "aria-label": c("onboarding.step1Title"),
                children: [de.filter(e => e !== "other").map(e => o.jsx("button", {
                  type: "button",
                  role: "radio",
                  "aria-checked": w === e,
                  className: "onboarding-tile",
                  "data-selected": w === e ? "true" : "false",
                  onClick: () => x(e),
                  children: c(`onboarding.roles.${e}`)
                }, e)), o.jsxs("div", {
                  className: "onboarding-other-cell",
                  "data-selected": w === "other" ? "true" : "false",
                  onClick: () => x("other"),
                  children: [o.jsx("button", {
                    type: "button",
                    role: "radio",
                    "aria-checked": w === "other",
                    className: "onboarding-other-trigger",
                    onClick: () => x("other"),
                    children: c("onboarding.roles.other")
                  }), o.jsx("input", {
                    ref: y,
                    className: "onboarding-other-blank",
                    value: k,
                    onChange: e => v(e.target.value),
                    placeholder: c("onboarding.roleOtherPlaceholder"),
                    "aria-label": c("onboarding.roleOtherPlaceholder"),
                    maxLength: 120,
                    disabled: w !== "other"
                  })]
                })]
              })
            }), o.jsxs("div", {
              className: "onboarding-quiz-actions",
              children: [o.jsx("button", {
                type: "button",
                className: "onboarding-quiz-back",
                onClick: () => E(te[S] ?? "picking"),
                children: c("onboarding.back")
              }), o.jsx("button", {
                type: "button",
                className: "onboarding-cta onboarding-lang-confirm",
                disabled: S === "source" ? !p || W === "redeeming" : !w,
                onClick: S === "source" ? Me : R,
                children: c("onboarding.continue")
              })]
            })]
          }, S)
        })]
      });
    }
  }
  return o.jsxs("div", {
    className: "onboarding-root onboarding-finish",
    children: [o.jsx(Ce, {}), o.jsxs("div", {
      className: "onboarding-finish-inner",
      children: [o.jsx("div", {
        className: "onboarding-finish-char",
        children: o.jsx(t, {
          src: "/pages/mainPages/animations/char-complete-standing.mp4"
        })
      }), o.jsx("h1", {
        className: "onboarding-finish-title",
        children: c("onboarding.finishTitle")
      }), o.jsxs("div", {
        className: "onboarding-finish-cta-wrap",
        "data-celebrating": Pe ? "true" : "false",
        children: [[0, 1, 2, 3, 4, 5].map(e => o.jsx("span", {
          className: "onboarding-finish-spark",
          "data-i": e,
          "aria-hidden": true
        }, e)), o.jsx("button", {
          type: "button",
          className: "onboarding-cta onboarding-finish-cta",
          onClick: Re,
          children: c("onboarding.finishCta")
        })]
      })]
    })]
  });
}
export { Se as default };