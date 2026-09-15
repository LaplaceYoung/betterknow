import { c as e, g as t, G as s, j as r, w as a, b as i, u as c, l as n, ai as l, F as o, R as d, M as u, B as p, C as h } from "./index-TjoB2Buo.js";
import { C as m } from "./checkbox-DxW-3BRQ.js";
import { C as f } from "./CourseFeedbackEntry-yXmrvWpY.js";
import { u as g, M as x } from "./useAudioPlayer-DPbJ9VKN.js";
import { p as j, d as v, s as k, b, Q as w, a as y } from "./quizScoring-DluRF6xL.js";
import { P as N } from "./PracticeStars-TWYnxRvK.js";
import { l as C } from "./voicePrefs-rmmbxoX2.js";
import { r as M } from "./index-qYFgNVxk.js";
import { r as S } from "./index-DTP6V39T.js";
import "./utils-Bmk8urhx.js";
import "./index-CMJxjNZ8.js";
import "./check-BBSENZCf.js";
import "./createLucideIcon-B4HcG4gb.js";
import "./BugReportModal-DxKVyQda.js";
import "./github-BU76ptNE.js";
const L = () => {
  const e = t();
  if (e) {
    return {
      Authorization: `Bearer ${e}`
    };
  } else {
    return {};
  }
};
async function A(t, s) {
  try {
    await fetch(e(`/api/v1/course-generation/courses/${encodeURIComponent(t)}/practice/progress`), {
      method: "POST",
      headers: {
        ...L(),
        "Content-Type": "application/json"
      },
      body: JSON.stringify(s)
    });
  } catch {}
}
const R = 1.05;
const B = () => typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const E = ({
  digit: e,
  fromDigit: t,
  rollKey: s,
  delayMs: a
}) => {
  const i = -(t + 10) * R;
  const c = -(e + 20) * R;
  return r.jsx("span", {
    className: "practice-slot-digit",
    style: {
      height: "1.05em"
    },
    children: r.jsx("span", {
      className: "practice-slot-digit-strip",
      style: {
        "--slot-from": `${i}em`,
        "--slot-to": `${c}em`,
        "--slot-delay": `${a}ms`
      },
      children: Array.from({
        length: 30
      }, (e, t) => r.jsx("span", {
        className: "practice-slot-digit-char",
        "aria-hidden": "true",
        children: t % 10
      }, t))
    }, s)
  });
};
const $ = ({
  value: e,
  className: t
}) => {
  const a = s.useRef(e);
  const [i, c] = s.useState(e);
  const [n, l] = s.useState(0);
  s.useEffect(() => {
    if (e !== a.current) {
      if (B()) {
        a.current = e;
        c(e);
        return;
      }
      c(a.current);
      l(e => e + 1);
      a.current = e;
    }
  }, [e]);
  const o = e.toLocaleString().split("");
  const d = i.toLocaleString().split("");
  const u = o.length - d.length;
  return r.jsx("span", {
    className: "practice-slot-score" + (t ? ` ${t}` : ""),
    "aria-hidden": "true",
    children: o.map((e, t) => {
      if (!/\d/.test(e)) {
        return r.jsx("span", {
          className: "practice-slot-sep",
          children: e
        }, `sep-${t}`);
      }
      const s = t - u;
      const a = s >= 0 ? d[s] : "0";
      const i = /\d/.test(a) ? Number(a) : 0;
      const c = Number(e);
      const l = B() ? 0 : (o.length - 1 - t) * 45;
      return r.jsx(E, {
        digit: c,
        fromDigit: i,
        rollKey: n,
        delayMs: l
      }, `${t}-${n}`);
    })
  });
};
const I = ["#FFD95A", "#5BC878", "#5B9CF5", "#FF8F6B", "#C88AFF", "#FF6B9D", "#F0C84A"];
const F = () => typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const q = ({
  pieces: e
}) => e.length === 0 || F() ? null : a.createPortal(r.jsx("div", {
  className: "practice-check-confetti-layer",
  "aria-hidden": "true",
  children: e.map(e => r.jsx("span", {
    className: `practice-check-confetti-piece practice-check-confetti-piece--${e.shape}`,
    style: {
      left: `${e.x}px`,
      top: `${e.y}px`,
      width: `${e.size}px`,
      height: e.shape === "rect" ? e.size * 0.55 + "px" : `${e.size}px`,
      backgroundColor: e.color,
      "--cf-dx": `${e.dx}px`,
      "--cf-dy": `${e.dy}px`,
      "--cf-rotate": `${e.rotate}deg`,
      "--cf-duration": `${e.durationMs}ms`,
      animationDelay: `${e.delayMs}ms`
    }
  }, e.id))
}), document.body);
const T = ["image/png", "image/jpeg", "image/webp"];
const P = T.join(",");
const Q = e => e.trim().toLowerCase();
const O = [M, S, h];
const D = [[p, {
  strict: false,
  throwOnError: false
}]];
const H = s.memo(({
  content: e,
  className: t,
  inline: s = false
}) => {
  const a = r.jsx(u, {
    remarkPlugins: O,
    rehypePlugins: D,
    components: {
      p: ({
        children: e
      }) => s ? r.jsx(r.Fragment, {
        children: e
      }) : r.jsx("p", {
        children: e
      }),
      a: ({
        children: e,
        ...t
      }) => r.jsx("a", {
        ...t,
        target: "_blank",
        rel: "noreferrer",
        children: e
      })
    },
    children: e
  });
  if (s) {
    return r.jsx("span", {
      className: t,
      children: a
    });
  } else {
    return r.jsx("div", {
      className: t,
      children: a
    });
  }
}, (e, t) => e.content === t.content && e.className === t.className && e.inline === t.inline);
H.displayName = "PracticeMarkdown";
const U = ({
  info: e,
  onClose: t
}) => {
  const {
    t: a
  } = i();
  s.useEffect(() => {
    if (!e) {
      return;
    }
    const s = e => {
      if (e.key === "Escape") {
        t();
      }
    };
    document.addEventListener("keydown", s);
    return () => document.removeEventListener("keydown", s);
  }, [e, t]);
  if (e) {
    return r.jsx("div", {
      className: "practice-welcome-overlay",
      onClick: t,
      children: r.jsx("section", {
        className: "practice-welcome-modal",
        onClick: e => e.stopPropagation(),
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": "practice-welcome-title",
        "aria-describedby": "practice-welcome-desc",
        children: r.jsxs("div", {
          className: "practice-welcome-row",
          children: [r.jsx("div", {
            className: "practice-welcome-media",
            "aria-hidden": "true",
            children: r.jsx(d, {
              className: "practice-welcome-video"
            })
          }), r.jsxs("div", {
            className: "practice-welcome-body",
            children: [r.jsx("span", {
              id: "practice-welcome-title",
              className: "practice-welcome-title",
              children: e.kind === "first" ? a("practice.welcomeModal.titleFirst") : a("practice.welcomeModal.titleReturning")
            }), r.jsx("span", {
              id: "practice-welcome-desc",
              className: "practice-welcome-desc",
              children: e.kind === "first" ? a("practice.welcomeModal.descFirst") : a("practice.welcomeModal.descReturning", {
                correct: e.correct,
                total: e.total
              })
            }), r.jsx("button", {
              type: "button",
              className: "practice-welcome-btn",
              onClick: t,
              children: a("practice.welcomeModal.gotIt")
            })]
          })]
        })
      })
    });
  } else {
    return null;
  }
};
const z = [r.jsx("svg", {
  viewBox: "0 0 24 24",
  "aria-hidden": "true",
  children: r.jsx("path", {
    d: "M12 3l9 17H3z"
  })
}), r.jsx("svg", {
  viewBox: "0 0 24 24",
  "aria-hidden": "true",
  children: r.jsx("path", {
    d: "M12 2l10 10-10 10L2 12z"
  })
}), r.jsx("svg", {
  viewBox: "0 0 24 24",
  "aria-hidden": "true",
  children: r.jsx("circle", {
    cx: "12",
    cy: "12",
    r: "9.5"
  })
}), r.jsx("svg", {
  viewBox: "0 0 24 24",
  "aria-hidden": "true",
  children: r.jsx("rect", {
    x: "3",
    y: "3",
    width: "18",
    height: "18",
    rx: "2.5"
  })
})];
const W = ["practice.result.stars0", "practice.result.stars1", "practice.result.stars2", "practice.result.stars3"];
const _ = () => {
  const {
    t: e
  } = i();
  return r.jsxs("main", {
    className: "practice-stage practice-loading-stage",
    "aria-label": "Loading practice",
    "aria-busy": "true",
    children: [r.jsxs("section", {
      className: "practice-loading-shell",
      role: "status",
      children: [r.jsx("span", {
        className: "practice-loading-sr-text",
        children: e("practice.loading.srText")
      }), r.jsxs("div", {
        className: "practice-loading-prompt",
        children: [r.jsx(l, {
          width: "112px",
          height: "12px",
          className: "practice-loading-kicker"
        }), r.jsx(l, {
          width: "100%",
          height: "24px",
          className: "practice-loading-title"
        }), r.jsx(l, {
          width: "72%",
          height: "24px",
          className: "practice-loading-title"
        })]
      }), r.jsx("div", {
        className: "practice-loading-options",
        "aria-hidden": "true",
        children: [0, 1, 2, 3].map(e => r.jsx(l, {
          width: "100%",
          height: "62px",
          className: "practice-loading-option"
        }, e))
      })]
    }), r.jsx("div", {
      className: "practice-loading-actions",
      "aria-hidden": "true",
      children: r.jsx(l, {
        width: "190px",
        height: "46px",
        className: "practice-loading-button"
      })
    })]
  });
};
const K = () => {
  var t;
  const {
    t: a
  } = i();
  const d = c();
  const {
    courseId: u,
    sessionId: p
  } = n();
  const [h, M] = s.useState("loading");
  const [S, R] = s.useState("");
  const [B, E] = s.useState([]);
  const [O, D] = s.useState(0);
  const [K, Y] = s.useState({});
  const [V, J] = s.useState({});
  const [G, X] = s.useState({});
  const [Z, ee] = s.useState({});
  const [te, se] = s.useState(false);
  const [re, ae] = s.useState({});
  const [ie, ce] = s.useState({});
  const [ne, le] = s.useState({});
  const [oe, de] = s.useState({});
  const [ue, pe] = s.useState(false);
  const he = s.useRef(null);
  const [me, fe] = s.useState(320);
  const [ge, xe] = s.useState({
    maxHeight: 200,
    scale: 1
  });
  const je = s.useRef(null);
  const ve = s.useRef(null);
  const ke = s.useRef(null);
  const be = s.useRef(null);
  const we = s.useRef(null);
  const ye = s.useRef(null);
  const [Ne, Ce] = s.useState([]);
  const [Me, Se] = s.useState(null);
  const [Le, Ae] = s.useState(false);
  const Re = s.useRef([]);
  const Be = s.useCallback(() => {
    Re.current.forEach(e => window.clearTimeout(e));
    Re.current = [];
  }, []);
  s.useEffect(() => () => Be(), [Be]);
  const Ee = s.useCallback((e, t) => {
    const s = we.current;
    if (!s) {
      return;
    }
    let r = 0;
    if (e) {
      r += 1;
    }
    if (t > 0) {
      r += 1;
    }
    Ce(((e, t) => {
      const s = e.left + e.width / 2;
      const r = e.top + e.height / 2;
      const a = 26 + t * 8;
      return Array.from({
        length: a
      }, (e, t) => {
        const i = Math.PI * 2 * t / a + (Math.random() - 0.5) * 0.55;
        const c = 48 + Math.random() * 62;
        const n = Math.cos(i) * c;
        const l = Math.sin(i) * c * 0.85 - (18 + Math.random() * 22);
        return {
          id: `${Date.now()}-${t}-${Math.random().toString(36).slice(2, 7)}`,
          x: s,
          y: r,
          dx: n,
          dy: l,
          rotate: (Math.random() - 0.5) * 520,
          color: I[Math.floor(Math.random() * I.length)],
          size: 5 + Math.random() * 4,
          shape: Math.random() > 0.45 ? "rect" : "circle",
          delayMs: Math.random() * 50,
          durationMs: 840 + Math.random() * 80
        };
      });
    })(s.getBoundingClientRect(), r));
    Be();
    Re.current = [window.setTimeout(() => {
      Se(null);
      Ae(true);
    }, 420), window.setTimeout(() => Ce([]), 960)];
  }, [Be]);
  const [$e, Ie] = s.useState(null);
  const [Fe, qe] = s.useState(false);
  const Te = s.useRef(null);
  const [Pe, Qe] = s.useState(null);
  const [Oe, De] = s.useState(false);
  const [He, Ue] = s.useState(false);
  const [ze, We] = s.useState([]);
  const [_e, Ke] = s.useState("");
  const [Ye, Ve] = s.useState([]);
  const [Je, Ge] = s.useState(false);
  const [Xe, Ze] = s.useState(false);
  const [et, tt] = s.useState("");
  const st = s.useRef(null);
  const rt = s.useRef(null);
  const [at, it] = s.useState(() => C() ?? {
    voiceId: "calm",
    speed: 1
  });
  const [ct, nt] = s.useState(false);
  const {
    isPlaying: lt,
    isBuffering: ot,
    play: dt,
    pause: ut,
    toggle: pt
  } = g();
  const ht = s.useRef(new Map());
  const mt = s.useRef(null);
  const ft = s.useCallback(e => `${e}|${at.voiceId}|${at.speed}`, [at.voiceId, at.speed]);
  const gt = s.useCallback(t => {
    if (!u || !p) {
      return Promise.resolve(null);
    }
    const s = ft;
    const r = ht.current.get(s(t));
    if (r) {
      return r;
    }
    const a = async function (t, s, r, a) {
      const i = new URLSearchParams();
      if ((a == null ? undefined : a.speed) !== undefined) {
        i.set("speed", String(a.speed));
      }
      if ((a == null ? undefined : a.voiceId) !== undefined) {
        i.set("voice_id", a.voiceId);
      }
      const c = i.toString();
      const n = await fetch(e(`/api/v1/course-generation/courses/${encodeURIComponent(t)}/practice/sessions/${encodeURIComponent(s)}/questions/${encodeURIComponent(r)}/tts${c ? `?${c}` : ""}`), {
        headers: L()
      });
      if (!n.ok) {
        let e = `Request failed with status ${n.status}`;
        try {
          const t = await n.json();
          if (t == null ? undefined : t.detail) {
            e = String(t.detail);
          }
        } catch {}
        throw new Error(e);
      }
      const l = await n.json();
      return {
        audioUrl: e(l.audio_url),
        questionId: l.question_id
      };
    }(u, p, t, {
      speed: at.speed,
      voiceId: at.voiceId
    }).then(({
      audioUrl: e,
      questionId: r
    }) => {
      if (r && r !== t) {
        ht.current.set(s(r), a);
      }
      return e;
    }).catch(() => null);
    ht.current.set(s(t), a);
    return a;
  }, [u, p, ft]);
  const xt = s.useRef(gt);
  xt.current = gt;
  const jt = s.useRef(ft);
  jt.current = ft;
  const vt = ct || ot;
  const kt = s.useRef(null);
  s.useEffect(() => {
    var t;
    let s = false;
    if (u && p) {
      M("loading");
      Y({});
      J({});
      X({});
      ee({});
      se(false);
      ae({});
      ce({});
      le({});
      de({});
      pe(false);
      fe(320);
      D(0);
      Ie(null);
      qe(false);
      Te.current = null;
      Qe(null);
      De(false);
      if ((t = rt.current) != null) {
        t.abort();
      }
      rt.current = null;
      Ue(false);
      We([]);
      Ke("");
      Ve(e => {
        e.forEach(e => URL.revokeObjectURL(e.url));
        return [];
      });
      Ge(false);
      Ze(false);
      tt("");
      ht.current.clear();
      (async function (t) {
        try {
          await fetch(e(`/api/v1/course-generation/courses/${encodeURIComponent(t)}/practice/tts/prewarm`), {
            headers: L()
          });
        } catch {}
      })(u);
      mt.current = xt.current("_first");
      (async function (t) {
        const s = await fetch(e(`/api/v1/course-generation/courses/${encodeURIComponent(t)}/practice`), {
          headers: L()
        });
        if (s.status === 404) {
          return null;
        }
        if (!s.ok) {
          let e = `Request failed with status ${s.status}`;
          try {
            const t = await s.json();
            if (t == null ? undefined : t.detail) {
              e = String(t.detail);
            }
          } catch {}
          throw new Error(e);
        }
        return s.json();
      })(u).then(e => {
        if (s) {
          return;
        }
        if (!e) {
          M("pending");
          return;
        }
        const t = e.sessions.find(e => e.sessionId === p);
        const r = (t == null ? undefined : t.questions) ?? [];
        E(r);
        const a = t == null ? undefined : t.attempt;
        if (a == null ? undefined : a.items) {
          const e = ((e, t) => {
            const s = {
              currentQuestionIndex: 0,
              singleSelections: {},
              multipleSelections: {},
              fillAnswers: {},
              fillFeedback: {},
              revealedQuestions: {},
              skippedQuestions: {},
              questionCorrectness: {},
              fastAnswers: {},
              attemptFinished: false
            };
            s.attemptFinished = Boolean(e.finished);
            for (const r of t) {
              const t = e.items[r.id];
              if (!t || t.state === "not_done") {
                continue;
              }
              if (t.state === "skipped") {
                s.skippedQuestions[r.id] = true;
                continue;
              }
              s.revealedQuestions[r.id] = true;
              s.questionCorrectness[r.id] = t.state === "correct";
              if (t.fast && t.state === "correct") {
                s.fastAnswers[r.id] = true;
              }
              const a = t.answer;
              if (r.type === "fill") {
                if (typeof a == "string") {
                  s.fillAnswers[r.id] = a;
                }
                if (t.feedback) {
                  s.fillFeedback[r.id] = t.feedback;
                }
              } else if (r.type === "multiple") {
                if (Array.isArray(a)) {
                  s.multipleSelections[r.id] = new Set(a);
                }
              } else if (typeof a == "string") {
                s.singleSelections[r.id] = a;
              }
            }
            return s;
          })(a, r);
          if (e.attemptFinished) {
            Ie(e);
            const t = Object.values(a.items).filter(e => e.state === "correct").length;
            Qe({
              kind: "returning",
              total: r.length,
              correct: t
            });
          } else {
            Y(e.singleSelections);
            J(e.multipleSelections);
            X(e.fillAnswers);
            ee(e.fillFeedback);
            ae(e.revealedQuestions);
            ce(e.skippedQuestions);
            le(e.questionCorrectness);
            de(e.fastAnswers);
            pe(false);
          }
        } else {
          Qe({
            kind: "first"
          });
        }
        M(r.length > 0 ? "ready" : "empty");
      }).catch(e => {
        if (!s) {
          R(e instanceof Error ? e.message : a("practice.errors.loadFailed"));
          M("error");
        }
      });
      return () => {
        s = true;
      };
    } else {
      M("error");
      R(a("practice.errors.missingCourseOrSession"));
      return;
    }
  }, [u, p]);
  const bt = () => {
    d(u ? `/course/${u}` : "/courses", u ? {
      state: {
        fromSessionId: p
      }
    } : undefined);
  };
  const wt = s.useRef(false);
  wt.current = Fe;
  s.useEffect(() => {
    fe(320);
  }, [O]);
  s.useEffect(() => {
    var e;
    if ((e = ve.current) != null) {
      e.scrollTo({
        top: 0
      });
    }
  }, [O, Fe]);
  const yt = (t = B[O]) == null ? undefined : t.id;
  s.useEffect(() => {
    var e;
    if (yt && re[yt]) {
      if ((e = be.current) != null) {
        e.scrollTo({
          top: 0
        });
      }
    }
  }, [yt, re, Z]);
  s.useEffect(() => {
    if (!yt || Pe || Oe) {
      return;
    }
    if (O === 0 && mt.current) {
      ht.current.set(jt.current(yt), mt.current);
      mt.current = null;
    }
    let e = false;
    nt(true);
    xt.current(yt).then(t => {
      if (!e) {
        nt(false);
        if (t) {
          dt(t);
        }
      }
    });
    return () => {
      e = true;
      ut();
      nt(false);
    };
  }, [yt, O, Pe, Oe, dt, ut]);
  s.useEffect(() => {
    var e;
    if (!yt || Pe || Oe) {
      return;
    }
    const t = (e = B[O + 1]) == null ? undefined : e.id;
    if (!t) {
      return;
    }
    const s = setTimeout(() => {
      xt.current(t);
    }, 400);
    return () => clearTimeout(s);
  }, [yt, O, B, Pe, Oe]);
  const Nt = s.useCallback(e => {
    const t = ve.current;
    const s = ke.current;
    if (!t || !s) {
      return;
    }
    const r = s.offsetHeight - s.clientHeight;
    const a = getComputedStyle(t);
    const i = s.parentElement;
    const c = Array.from(t.children);
    const n = c.reduce((e, t) => e + (t === i ? 0 : t.offsetHeight), 0) + (parseFloat(a.rowGap) || 0) * Math.max(0, c.length - 1) + (parseFloat(a.paddingTop) || 0) + (parseFloat(a.paddingBottom) || 0) + (i ? i.offsetHeight - s.offsetHeight : 0);
    const l = Math.max(200, t.clientHeight - n - r);
    const o = Math.round(l) + r;
    const d = Math.min(1, Math.max(0.5, l / e));
    xe(e => e.maxHeight === o && e.scale === d ? e : {
      maxHeight: o,
      scale: d
    });
  }, []);
  s.useLayoutEffect(() => {
    Nt(me);
    const e = je.current;
    const t = ve.current;
    if (!e || !t || typeof ResizeObserver == "undefined") {
      return;
    }
    const s = new ResizeObserver(() => Nt(me));
    s.observe(e);
    s.observe(t);
    return () => s.disconnect();
  }, [me, O, B, re, Nt]);
  s.useEffect(() => {
    function e(e) {
      const t = he.current;
      if (!t || e.source !== t.contentWindow) {
        return;
      }
      const s = e.data;
      if (s && typeof s == "object" && s.type === "hk-anim-height" && typeof s.height == "number" && isFinite(s.height) && s.height > 0) {
        fe(Math.ceil(s.height));
      }
    }
    window.addEventListener("message", e);
    return () => window.removeEventListener("message", e);
  }, []);
  const Ct = s.useMemo(() => B.map(e => e.id), [B]);
  const Mt = s.useCallback(e => {
    const t = {};
    for (const s of B) {
      if (e.skippedQuestions[s.id]) {
        t[s.id] = {
          state: "skipped",
          answer: null
        };
        continue;
      }
      if (!e.revealedQuestions[s.id]) {
        t[s.id] = {
          state: "not_done",
          answer: null
        };
        continue;
      }
      const r = e.questionCorrectness[s.id] ? "correct" : "wrong";
      let a;
      let i = null;
      if (s.type === "fill") {
        i = e.fillAnswers[s.id] ?? null;
        a = e.fillFeedback[s.id] || undefined;
      } else if (s.type === "multiple") {
        const t = e.multipleSelections[s.id];
        i = t ? Array.from(t) : null;
      } else {
        i = e.singleSelections[s.id] ?? null;
      }
      const c = a ? {
        state: r,
        answer: i,
        feedback: a
      } : {
        state: r,
        answer: i
      };
      if (r === "correct" && e.fastAnswers[s.id]) {
        c.fast = true;
      }
      t[s.id] = c;
    }
    return t;
  }, [B]);
  const St = s.useCallback(e => {
    const t = Mt(e);
    const s = j(Ct.length);
    const r = v({
      questionIds: Ct,
      revealedQuestions: e.revealedQuestions,
      skippedQuestions: e.skippedQuestions,
      questionCorrectness: e.questionCorrectness,
      fastAnswers: e.fastAnswers
    }).total;
    return {
      items: t,
      score: r,
      perfect: s,
      stars: k(r, s)
    };
  }, [Mt, Ct]);
  const Lt = s.useCallback(() => St({
    skippedQuestions: ie,
    revealedQuestions: re,
    questionCorrectness: ne,
    fillAnswers: G,
    fillFeedback: Z,
    multipleSelections: V,
    singleSelections: K,
    fastAnswers: oe
  }), [St, ie, re, ne, G, Z, V, K, oe]);
  const At = (e, t) => !e && Object.values(t).every(e => e.state === "not_done");
  const Rt = s.useCallback(e => {
    if (u && p) {
      if (kt.current) {
        clearTimeout(kt.current);
      }
      kt.current = setTimeout(() => {
        const t = Lt();
        if (!At(e, t.items)) {
          A(u, {
            sessionId: p,
            finished: e,
            ...t
          });
        }
      }, 400);
    }
  }, [u, p, Lt]);
  const Bt = s.useCallback(e => {
    if (!u || !p) {
      return;
    }
    if (kt.current) {
      clearTimeout(kt.current);
      kt.current = null;
    }
    const t = Lt();
    if (!At(e, t.items)) {
      A(u, {
        sessionId: p,
        finished: e,
        ...t
      });
    }
  }, [u, p, Lt]);
  const Et = s.useCallback((e, t) => {
    if (!u || !p) {
      return;
    }
    if (kt.current) {
      clearTimeout(kt.current);
      kt.current = null;
    }
    const s = St(t);
    if (!At(e, s.items)) {
      A(u, {
        sessionId: p,
        finished: e,
        ...s
      });
    }
  }, [u, p, St]);
  const $t = s.useRef(Bt);
  $t.current = Bt;
  const It = s.useRef(Et);
  It.current = Et;
  const Ft = s.useRef(ue);
  Ft.current = ue;
  const qt = s.useRef(false);
  qt.current = Fe ? Boolean(Te.current && (Object.keys(Te.current.revealedQuestions).length > 0 || Object.keys(Te.current.skippedQuestions).length > 0)) : Object.keys(re).length > 0 || Object.keys(ie).length > 0;
  const Tt = s.useRef(false);
  const Pt = () => {
    if (!qt.current) {
      return;
    }
    const e = Tt.current || Ft.current;
    if (wt.current) {
      if (Te.current) {
        It.current(e, Te.current);
      }
    } else {
      $t.current(e);
    }
  };
  s.useEffect(() => {
    const e = () => Pt();
    window.addEventListener("beforeunload", e);
    return () => {
      window.removeEventListener("beforeunload", e);
      Pt();
      if (kt.current) {
        clearTimeout(kt.current);
      }
    };
  }, [u, p]);
  const Qt = e => {
    D(e.currentQuestionIndex);
    Y(e.singleSelections);
    J(e.multipleSelections);
    X(e.fillAnswers);
    ee(e.fillFeedback);
    ae(e.revealedQuestions);
    ce(e.skippedQuestions);
    le(e.questionCorrectness);
    de(e.fastAnswers);
    pe(e.attemptFinished);
  };
  const Ot = () => {
    if ($e) {
      if (Fe) {
        const e = Te.current ?? {
          currentQuestionIndex: 0,
          singleSelections: {},
          multipleSelections: {},
          fillAnswers: {},
          fillFeedback: {},
          revealedQuestions: {},
          skippedQuestions: {},
          questionCorrectness: {},
          fastAnswers: {},
          attemptFinished: false
        };
        Te.current = null;
        Qt(e);
        qe(false);
      } else {
        Te.current = {
          currentQuestionIndex: O,
          singleSelections: K,
          multipleSelections: V,
          fillAnswers: G,
          fillFeedback: Z,
          revealedQuestions: re,
          skippedQuestions: ie,
          questionCorrectness: ne,
          fastAnswers: oe,
          attemptFinished: ue
        };
        Qt($e);
        qe(true);
      }
    }
  };
  const Dt = s.useMemo(() => v({
    questionIds: Ct,
    revealedQuestions: re,
    skippedQuestions: ie,
    questionCorrectness: ne,
    fastAnswers: oe
  }), [Ct, re, ie, ne, oe]);
  const Ht = B[O];
  const Ut = Boolean(Ht && re[Ht.id]);
  const zt = h === "ready" && Boolean(Ht) && (Ht == null ? undefined : Ht.type) !== "animation";
  const Wt = zt && !Ut && !Oe && !Fe && !Pe && !He && !te;
  const _t = ((e, t, r) => {
    const a = s.useRef(0);
    const i = s.useRef(null);
    const [c, n] = s.useState(() => Math.ceil(t / 1000));
    const l = s.useCallback(() => a.current + (i.current === null ? 0 : performance.now() - i.current), []);
    s.useEffect(() => {
      a.current = 0;
      i.current = null;
      n(Math.ceil(t / 1000));
    }, [e, t]);
    s.useEffect(() => {
      if (!r) {
        return;
      }
      i.current = performance.now();
      const e = window.setInterval(() => {
        const s = Math.max(0, t - l());
        n(Math.ceil(s / 1000));
        if (s <= 0) {
          window.clearInterval(e);
        }
      }, 200);
      return () => {
        window.clearInterval(e);
        if (i.current !== null) {
          a.current += performance.now() - i.current;
          i.current = null;
        }
      };
    }, [e, t, r, l]);
    return {
      secondsLeft: c,
      expired: c <= 0,
      running: r && t > 0 && c > 0,
      elapsedMs: l
    };
  })((Ht == null ? undefined : Ht.id) ?? "", w.fastWindowMs, Wt);
  const Kt = s.useRef(() => {});
  s.useEffect(() => {
    const e = e => {
      if (e.metaKey || e.ctrlKey || e.altKey) {
        return;
      }
      const t = e.target;
      if (t && (t.isContentEditable || /^(?:INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) {
        return;
      }
      const s = Number(e.key) - 1;
      if (!!Number.isInteger(s) && !(s < 0) && !(s >= 4)) {
        Kt.current(s);
      }
    };
    document.addEventListener("keydown", e);
    return () => document.removeEventListener("keydown", e);
  }, []);
  s.useEffect(() => {
    const e = st.current;
    if (e) {
      e.scrollTop = e.scrollHeight;
    }
  }, [ze, Xe]);
  s.useEffect(() => () => {
    var e;
    if ((e = rt.current) != null) {
      e.abort();
    }
    Ye.forEach(e => URL.revokeObjectURL(e.url));
  }, []);
  if (h === "loading") {
    return r.jsxs("div", {
      className: "practice-page",
      children: [r.jsxs("div", {
        className: "practice-topbar",
        children: [r.jsx("button", {
          type: "button",
          className: "practice-close-btn",
          onClick: bt,
          "aria-label": "Close practice",
          children: r.jsx("svg", {
            width: "13",
            height: "13",
            viewBox: "0 0 13 13",
            fill: "none",
            "aria-hidden": "true",
            children: r.jsx("path", {
              d: "M1 1L12 12M12 1L1 12",
              stroke: "currentColor",
              strokeWidth: "1.35",
              strokeLinecap: "round"
            })
          })
        }), r.jsx("div", {
          className: "practice-loading-dots",
          "aria-hidden": "true",
          children: [0, 1, 2, 3].map(e => r.jsx(l, {
            width: e === 0 ? "25px" : "17px",
            height: e === 0 ? "18px" : "10px"
          }, e))
        })]
      }), r.jsx(_, {})]
    });
  }
  if (h !== "ready") {
    const e = h === "pending" ? a("practice.status.pending") : h === "empty" ? a("practice.status.empty") : S || a("practice.status.errorFallback");
    return r.jsxs("div", {
      className: "practice-page",
      children: [r.jsx("div", {
        className: "practice-topbar",
        children: r.jsx("button", {
          type: "button",
          className: "practice-close-btn",
          onClick: bt,
          "aria-label": "Close practice",
          children: r.jsx("svg", {
            width: "13",
            height: "13",
            viewBox: "0 0 13 13",
            fill: "none",
            "aria-hidden": "true",
            children: r.jsx("path", {
              d: "M1 1L12 12M12 1L1 12",
              stroke: "currentColor",
              strokeWidth: "1.35",
              strokeLinecap: "round"
            })
          })
        })
      }), r.jsx("div", {
        className: "practice-status",
        role: "status",
        children: e
      })]
    });
  }
  if (Oe) {
    const e = B.length;
    const t = j(e);
    const s = k(Dt.total, t);
    const i = s === 3;
    const c = [{
      name: a("practice.result.you"),
      score: Dt.total,
      correctCount: Dt.correctCount,
      isYou: true
    }, ...b(p ?? "practice", e).map(e => ({
      ...e,
      isYou: false
    }))].sort((e, t) => t.score - e.score);
    const n = c.findIndex(e => e.isYou) + 1;
    return r.jsxs("div", {
      className: "practice-page",
      children: [r.jsxs("div", {
        className: "practice-topbar",
        children: [r.jsx("button", {
          type: "button",
          className: "practice-close-btn",
          onClick: bt,
          "aria-label": "Close practice",
          children: r.jsx("svg", {
            width: "13",
            height: "13",
            viewBox: "0 0 13 13",
            fill: "none",
            "aria-hidden": "true",
            children: r.jsx("path", {
              d: "M1 1L12 12M12 1L1 12",
              stroke: "currentColor",
              strokeWidth: "1.35",
              strokeLinecap: "round"
            })
          })
        }), r.jsx("div", {
          className: "practice-progress-dots",
          "aria-label": "Practice results",
          children: B.map(e => {
            const t = ["practice-progress-dot"];
            if (re[e.id]) {
              t.push(ne[e.id] ? "practice-progress-dot--correct" : "practice-progress-dot--incorrect");
            }
            return r.jsx("span", {
              className: t.join(" ")
            }, e.id);
          })
        })]
      }), r.jsxs("main", {
        className: "practice-stage practice-result-stage",
        "aria-label": "Practice results",
        children: [r.jsx("div", {
          className: "practice-result-scroll",
          children: r.jsxs("section", {
            className: "practice-result" + (i ? " practice-result--passed" : " practice-result--failed"),
            children: [r.jsxs("div", {
              className: "practice-result-media",
              "aria-hidden": "true",
              children: [r.jsx("span", {
                className: "practice-result-aura"
              }), r.jsx(o, {
                className: "practice-result-video",
                src: i ? "/pages/mainPages/animations/char-reward-pop.mp4" : "/pages/mainPages/animations/char-petting.mp4"
              })]
            }), r.jsx("p", {
              className: "practice-result-kicker",
              children: a("practice.result.kicker")
            }), r.jsx(N, {
              className: "practice-result-stars",
              stars: s,
              size: 34,
              animate: true,
              label: a("practice.result.starsAria", {
                stars: s,
                total: 3
              })
            }), r.jsx("h1", {
              className: "practice-result-title",
              children: a(W[s])
            }), r.jsx("p", {
              className: "practice-result-points",
              role: "status",
              children: Dt.total.toLocaleString()
            }), r.jsx("p", {
              className: "practice-result-points-sub",
              children: a("practice.result.pointsOf", {
                perfect: t.toLocaleString(),
                percent: Math.floor(Dt.total / t * 100)
              })
            }), r.jsxs("dl", {
              className: "practice-result-stats",
              children: [r.jsxs("div", {
                className: "practice-result-stat",
                children: [r.jsx("dt", {
                  children: a("practice.result.statCorrect")
                }), r.jsxs("dd", {
                  children: [Dt.correctCount, "/", e]
                })]
              }), r.jsxs("div", {
                className: "practice-result-stat",
                children: [r.jsx("dt", {
                  children: a("practice.result.statFast")
                }), r.jsx("dd", {
                  children: Dt.fastCount
                })]
              }), r.jsxs("div", {
                className: "practice-result-stat",
                children: [r.jsx("dt", {
                  children: a("practice.result.statStreak")
                }), r.jsx("dd", {
                  children: Dt.bestStreak
                })]
              }), r.jsxs("div", {
                className: "practice-result-stat",
                children: [r.jsx("dt", {
                  children: a("practice.result.statRank")
                }), r.jsxs("dd", {
                  children: ["#", n]
                })]
              })]
            }), r.jsx("p", {
              className: "practice-result-board-title",
              children: a("practice.result.leaderboard")
            }), r.jsx("ol", {
              className: "practice-result-board",
              children: c.map((t, s) => r.jsxs("li", {
                className: "practice-result-row" + (t.isYou ? " practice-result-row--you" : ""),
                style: {
                  animationDelay: 900 + s * 90 + "ms"
                },
                children: [r.jsx("span", {
                  className: "practice-result-rank",
                  children: s + 1
                }), r.jsx("span", {
                  className: "practice-result-name",
                  children: t.name
                }), r.jsxs("span", {
                  className: "practice-result-acc",
                  children: [t.correctCount, "/", e]
                }), r.jsx("span", {
                  className: "practice-result-row-points",
                  children: t.score.toLocaleString()
                })]
              }, t.name))
            })]
          })
        }), r.jsx("div", {
          className: "practice-actions practice-result-actions",
          children: r.jsx("button", {
            type: "button",
            className: "practice-check-btn",
            onClick: bt,
            children: a("practice.result.backToCourse")
          })
        })]
      })]
    });
  }
  const Yt = B[O];
  const Vt = e => {
    if (!e) {
      return;
    }
    const t = Array.from(e).filter(e => T.includes(e.type));
    if (t.length !== 0) {
      tt("");
      Ve(e => [...e, ...t.map(e => ({
        file: e,
        url: URL.createObjectURL(e)
      }))]);
    }
  };
  const Jt = async () => {
    const t = _e.trim();
    const s = Ye;
    if (!t && s.length === 0 || Xe || !u || !p) {
      return;
    }
    const r = {
      role: "user",
      content: t,
      images: s.map(e => e.url)
    };
    const i = [...ze, r];
    We([...i, {
      role: "assistant",
      content: ""
    }]);
    Ke("");
    Ve([]);
    tt("");
    Ze(true);
    const c = new AbortController();
    rt.current = c;
    const n = i.map(e => ({
      role: e.role,
      content: e.content
    }));
    try {
      await async function (t, s, r, a, i = {}) {
        var c;
        var n;
        var l;
        const o = new FormData();
        o.append("session_id", s);
        if (r) {
          o.append("question_id", r);
        }
        o.append("messages", JSON.stringify(a));
        for (const e of i.images ?? []) {
          o.append("images", e);
        }
        const d = await fetch(e(`/api/v1/course-generation/courses/${encodeURIComponent(t)}/practice/assistant`), {
          method: "POST",
          headers: L(),
          body: o,
          signal: i.signal
        });
        if (!d.ok) {
          let e = `Request failed with status ${d.status}`;
          try {
            const t = await d.json();
            if (t == null ? undefined : t.detail) {
              e = String(t.detail);
            }
          } catch {}
          throw new Error(e);
        }
        if (!d.body) {
          const e = await d.text();
          if ((c = i.onToken) != null) {
            c.call(i, e, e);
          }
          return e;
        }
        const u = d.body.getReader();
        const p = new TextDecoder();
        let h = "";
        while (true) {
          const {
            done: e,
            value: t
          } = await u.read();
          if (e) {
            break;
          }
          const s = p.decode(t, {
            stream: true
          });
          if (s) {
            h += s;
            if ((n = i.onToken) != null) {
              n.call(i, s, h);
            }
          }
        }
        const m = p.decode();
        if (m) {
          h += m;
          if ((l = i.onToken) != null) {
            l.call(i, m, h);
          }
        }
        return h;
      }(u, p, (Yt == null ? undefined : Yt.id) ?? null, n, {
        images: s.map(e => e.file),
        signal: c.signal,
        onToken: (e, t) => {
          We(e => {
            const s = [...e];
            s[s.length - 1] = {
              role: "assistant",
              content: t
            };
            return s;
          });
        }
      });
    } catch (l) {
      if (c.signal.aborted) {
        return;
      }
      We(e => {
        const t = [...e];
        const s = t[t.length - 1];
        if (s && s.role === "assistant" && !s.content) {
          t.pop();
        }
        return t;
      });
      tt(l instanceof Error ? l.message : a("practice.assistant.unavailableError"));
    } finally {
      if (rt.current === c) {
        rt.current = null;
      }
      Ze(false);
    }
  };
  const Gt = Yt.options ?? [];
  const Xt = V[Yt.id] ?? new Set();
  const Zt = G[Yt.id] ?? "";
  const es = Boolean(re[Yt.id]);
  const ts = O >= B.length - 1;
  const ss = Yt.type === "animation";
  const rs = ss && Boolean(Yt.animationHtml);
  const as = !Fe && !es;
  const is = Yt.type === "fill" ? Zt.trim().length > 0 : Yt.type === "multiple" ? Xt.size > 0 : Boolean(K[Yt.id]);
  const cs = (() => {
    if (es && Yt.id in ne) {
      return ne[Yt.id];
    }
    if (Yt.type === "fill") {
      const e = Q(Zt);
      return Yt.correctAnswers.some(t => Q(t) === e);
    }
    if (Yt.type === "multiple") {
      const e = Yt.correctAnswers;
      return Xt.size === e.length && e.every(e => Xt.has(e));
    }
    const e = K[Yt.id];
    return e != null && Yt.correctAnswers.includes(e);
  })();
  const ns = Boolean(ie[Yt.id]);
  const ls = (e, t) => {
    if (as) {
      J(s => {
        const r = new Set(s[e] ?? []);
        if (r.has(t)) {
          r.delete(t);
        } else {
          r.add(t);
        }
        return {
          ...s,
          [e]: r
        };
      });
    }
  };
  const os = e => {
    if (as) {
      if (Yt.type !== "multiple") {
        Y(t => ({
          ...t,
          [Yt.id]: e
        }));
      } else {
        ls(Yt.id, e);
      }
    }
  };
  const ds = async () => {
    if (Fe) {
      return;
    }
    if (!es) {
      if (!is || te) {
        return;
      }
      const t = _t.elapsedMs();
      let s = cs;
      let r = "";
      if (Yt.type === "fill" && u && p) {
        se(true);
        try {
          const t = await async function (t, s, r, a) {
            const i = await fetch(e(`/api/v1/course-generation/courses/${encodeURIComponent(t)}/practice/check-fill`), {
              method: "POST",
              headers: {
                ...L(),
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                sessionId: s,
                questionId: r,
                answer: a
              })
            });
            if (!i.ok) {
              throw new Error(`Fill check failed with status ${i.status}`);
            }
            const c = await i.json();
            return {
              correct: Boolean(c == null ? undefined : c.correct),
              feedback: String((c == null ? undefined : c.feedback) ?? ""),
              judged: Boolean(c == null ? undefined : c.judged)
            };
          }(u, p, Yt.id, Zt);
          s = t.correct;
          r = t.feedback;
        } catch {} finally {
          se(false);
        }
        if (r) {
          ee(e => ({
            ...e,
            [Yt.id]: r
          }));
        }
      }
      ae(e => ({
        ...e,
        [Yt.id]: true
      }));
      ce(e => {
        if (!e[Yt.id]) {
          return e;
        }
        const t = {
          ...e
        };
        delete t[Yt.id];
        return t;
      });
      le(e => ({
        ...e,
        [Yt.id]: s
      }));
      if (s && zt && t <= w.fastWindowMs) {
        de(e => ({
          ...e,
          [Yt.id]: true
        }));
      }
      const a = s && zt && t <= w.fastWindowMs;
      const i = y(Ct, re, ie, ne, O);
      if (s) {
        if (F()) {
          Ae(true);
        } else {
          const e = Dt.total;
          Se(e);
          Ae(false);
          Be();
          Ce([]);
          requestAnimationFrame(() => {
            Ee(a, i);
          });
        }
      }
      const c = new Audio(s ? "/sounds/answer-correct.mp3" : "/sounds/answer-wrong.mp3");
      c.volume = 0.6;
      c.play().catch(() => {});
      Rt(false);
      return;
    }
    if (ts) {
      Ae(false);
      Se(null);
      Be();
      Ce([]);
      us();
      return;
    }
    Ae(false);
    Se(null);
    Be();
    Ce([]);
    const t = new Audio("/sounds/button-click.mp3");
    t.volume = 0.6;
    t.play().catch(() => {});
    D(e => Math.min(e + 1, B.length - 1));
  };
  const us = async () => {
    Tt.current = true;
    pe(true);
    Bt(true);
    De(true);
  };
  const ps = O > 0;
  const hs = e => Yt.type === "multiple" ? Xt.has(e) : K[Yt.id] === e;
  Kt.current = e => {
    if (!as || Yt.type === "fill") {
      return;
    }
    const t = Gt[e];
    if (t !== undefined) {
      os(t);
    }
  };
  const ms = e => Yt.correctAnswers.includes(e);
  const fs = e => {
    const t = hs(e);
    const s = ["practice-option-card"];
    if (t) {
      s.push("practice-option-card--selected");
    }
    if (es) {
      if (ms(e)) {
        s.push("practice-option-card--correct");
      } else if (t) {
        s.push("practice-option-card--incorrect");
      }
    }
    if (!as) {
      s.push("practice-option-card--readonly");
    }
    return s.join(" ");
  };
  const gs = ["practice-options-grid", Gt.length <= 2 ? "practice-options-grid--stacked" : ""].filter(Boolean).join(" ");
  const xs = ["practice-question-shell", !Yt.image || Yt.type === "fill" || ss ? "practice-question-shell--no-image" : "", Yt.type === "multiple" ? "practice-question-shell--multiple" : "", Yt.type === "fill" ? "practice-question-shell--fill" : "", ss ? "practice-question-shell--animation" : ""].filter(Boolean).join(" ");
  const js = ["practice-split", !Yt.image || Yt.type === "fill" || ss ? "practice-split--no-image" : "", Yt.type === "fill" ? "practice-split--fill" : "", ss ? "practice-split--animation" : "", es ? "practice-split--revealed" : ""].filter(Boolean).join(" ");
  const vs = Yt.type === "multiple" ? a("practice.kicker.multipleChoice") : Yt.type === "fill" ? a("practice.kicker.fillBlank") : a(ss ? "practice.kicker.interactive" : "practice.kicker.singleChoice");
  const ks = ["practice-question-kicker", Yt.type === "multiple" ? "practice-question-kicker--multiple" : ""].filter(Boolean).join(" ");
  const bs = a(te ? "practice.actions.checking" : es ? ts ? "practice.actions.finish" : "practice.actions.next" : "practice.actions.check");
  const ws = ["practice-check-btn", es && !ts ? "practice-check-btn--next" : ""].filter(Boolean).join(" ");
  return r.jsxs("div", {
    className: "practice-page" + (He ? " practice-page--assistant-open" : ""),
    children: [r.jsxs("div", {
      className: "practice-topbar",
      children: [r.jsx("button", {
        type: "button",
        className: "practice-close-btn",
        onClick: bt,
        "aria-label": "Close practice",
        children: r.jsx("svg", {
          width: "13",
          height: "13",
          viewBox: "0 0 13 13",
          fill: "none",
          "aria-hidden": "true",
          children: r.jsx("path", {
            d: "M1 1L12 12M12 1L1 12",
            stroke: "currentColor",
            strokeWidth: "1.35",
            strokeLinecap: "round"
          })
        })
      }), r.jsx("div", {
        className: "practice-progress-dots",
        "aria-label": "Practice progress",
        children: B.map((e, t) => {
          const s = t === O;
          const a = Boolean(re[e.id]);
          const i = ["practice-progress-dot"];
          if (s) {
            i.push("practice-progress-dot--active");
          }
          if (a) {
            i.push(ne[e.id] ? "practice-progress-dot--correct" : "practice-progress-dot--incorrect");
          }
          return r.jsx("span", {
            className: i.join(" ")
          }, e.id);
        })
      }), r.jsxs("div", {
        className: "practice-topbar-actions",
        children: [!Fe && r.jsxs("div", {
          className: "practice-hud",
          role: "status",
          "aria-live": "off",
          children: [Dt.streak >= 2 && r.jsxs("span", {
            className: "practice-hud-chip practice-hud-chip--streak",
            children: [a("practice.score.streak"), " ", r.jsx("b", {
              children: Dt.streak
            })]
          }), zt && !Ut && !_t.expired && r.jsxs("span", {
            className: "practice-hud-chip practice-hud-chip--bonus",
            children: [r.jsx("svg", {
              width: "11",
              height: "13",
              viewBox: "0 0 11 13",
              fill: "none",
              "aria-hidden": "true",
              children: r.jsx("path", {
                d: "M6.2 0.6L0.8 7.2h3.4l-.9 5.2 5.9-7h-3.5z",
                fill: "currentColor"
              })
            }), a("practice.score.speedBonus", {
              points: w.fastBonus
            }), r.jsxs("b", {
              children: [_t.secondsLeft, "s"]
            })]
          }), r.jsxs("span", {
            className: "practice-hud-chip practice-hud-chip--score" + (Le ? " practice-hud-chip--score-reward" : ""),
            children: [a("practice.score.label"), " ", r.jsxs("b", {
              ref: ye,
              children: [r.jsx($, {
                value: Me ?? Dt.total
              }), r.jsx("span", {
                className: "practice-sr-only",
                children: Dt.total.toLocaleString()
              })]
            })]
          })]
        }), r.jsxs("button", {
          type: "button",
          className: "practice-assistant-toggle" + (He ? " practice-assistant-toggle--active" : ""),
          onClick: () => Ue(e => !e),
          "aria-label": He ? "Close assistant" : "Open assistant",
          children: [r.jsx("svg", {
            width: "15",
            height: "15",
            viewBox: "0 0 15 15",
            fill: "none",
            "aria-hidden": "true",
            children: r.jsx("path", {
              d: "M7.5 1.5C4.186 1.5 1.5 3.91 1.5 6.9c0 1.56.72 2.96 1.88 3.96L2.5 13.5l2.8-1.4c.69.24 1.43.37 2.2.37 3.314 0 6-2.41 6-5.4S10.814 1.5 7.5 1.5z",
              stroke: "currentColor",
              strokeWidth: "1.3",
              strokeLinejoin: "round"
            })
          }), r.jsx("span", {
            children: a("practice.assistant.toggleLabel")
          })]
        }), r.jsxs("div", {
          className: "practice-feedback-wrap",
          children: [r.jsx(f, {
            conversationId: p,
            courseId: u,
            source: "practice",
            variant: "header-icon",
            className: "practice-feedback-entry",
            hideNativeTitle: true
          }), r.jsx("span", {
            className: "practice-feedback-tooltip",
            role: "tooltip",
            children: a("practice.feedback.reportAnIssue")
          })]
        })]
      })]
    }), Fe && r.jsx("div", {
      className: "practice-review-badge",
      role: "status",
      children: a("practice.lastAttempt.reviewingBadge")
    }), r.jsxs("main", {
      className: "practice-stage",
      "aria-label": "Practice area",
      ref: je,
      children: [$e && r.jsxs("button", {
        type: "button",
        className: "practice-last-attempt-toggle" + (Fe ? " practice-last-attempt-toggle--active" : ""),
        onClick: Ot,
        "aria-label": a(Fe ? "practice.lastAttempt.backToAttempt" : "practice.lastAttempt.viewLastAttempt"),
        children: [r.jsxs("svg", {
          width: "13",
          height: "13",
          viewBox: "0 0 13 13",
          fill: "none",
          "aria-hidden": "true",
          children: [r.jsx("path", {
            d: "M6.5 3.25V6.5L8.7 7.8",
            stroke: "currentColor",
            strokeWidth: "1.1",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }), r.jsx("circle", {
            cx: "6.5",
            cy: "6.5",
            r: "5.5",
            stroke: "currentColor",
            strokeWidth: "1.1"
          })]
        }), r.jsx("span", {
          children: a(Fe ? "practice.lastAttempt.backToAttempt" : "practice.lastAttempt.viewLastAttempt")
        })]
      }), zt && !Fe && !Ut && !_t.expired && r.jsx("div", {
        className: "practice-timer",
        "aria-hidden": "true",
        children: r.jsx("span", {
          className: "practice-timer-fill" + (_t.running ? " practice-timer-fill--running" : ""),
          style: {
            animationDuration: `${w.fastWindowMs}ms`
          }
        }, Yt.id)
      }), r.jsxs("div", {
        className: js,
        children: [r.jsxs("section", {
          className: xs,
          ref: ve,
          children: [r.jsxs("div", {
            className: "practice-question-prompt",
            children: [r.jsx("p", {
              className: ks,
              children: vs
            }), Yt.type === "fill" ? (e => {
              const [t, s = ""] = e.prompt.split("____");
              return r.jsxs("h1", {
                className: "practice-question-title practice-fill-title",
                children: [r.jsx(H, {
                  content: t,
                  inline: true
                }), r.jsxs("span", {
                  className: "practice-fill-input-wrap",
                  children: [r.jsx("span", {
                    className: "practice-fill-input-sizer" + (Zt ? "" : " practice-fill-input-sizer--placeholder"),
                    "aria-hidden": "true",
                    children: Zt || e.placeholder || "\xA0"
                  }), r.jsx("input", {
                    id: `practice-fill-${e.id}`,
                    type: "text",
                    className: "practice-fill-inline-input",
                    value: Zt,
                    placeholder: e.placeholder ?? "",
                    onChange: e => {
                      t = e.target.value;
                      if (as) {
                        X(e => ({
                          ...e,
                          [Yt.id]: t
                        }));
                      }
                      return;
                      var t;
                    },
                    disabled: !as,
                    "aria-label": "Your answer",
                    autoComplete: "off",
                    spellCheck: false
                  })]
                }), r.jsx(H, {
                  content: s,
                  inline: true
                })]
              });
            })(Yt) : r.jsx(H, {
              content: Yt.prompt,
              className: "practice-question-title"
            }), r.jsxs("button", {
              type: "button",
              className: "practice-tts-btn" + (lt ? " practice-tts-btn--playing" : ""),
              "data-loading": vt ? "true" : undefined,
              onClick: pt,
              disabled: vt,
              "aria-label": a(vt ? "practice.narration.loading" : lt ? "practice.narration.pause" : "practice.narration.play"),
              "aria-pressed": lt,
              children: [vt ? r.jsx("span", {
                className: "practice-tts-spinner",
                "aria-hidden": "true"
              }) : lt ? r.jsxs("svg", {
                width: "11",
                height: "11",
                viewBox: "0 0 15 15",
                fill: "none",
                "aria-hidden": "true",
                children: [r.jsx("rect", {
                  x: "3.5",
                  y: "2.5",
                  width: "2.6",
                  height: "10",
                  rx: "1",
                  fill: "currentColor"
                }), r.jsx("rect", {
                  x: "8.9",
                  y: "2.5",
                  width: "2.6",
                  height: "10",
                  rx: "1",
                  fill: "currentColor"
                })]
              }) : r.jsx("svg", {
                width: "11",
                height: "11",
                viewBox: "0 0 15 15",
                fill: "none",
                "aria-hidden": "true",
                children: r.jsx("path", {
                  d: "M4 2.8v9.4a.6.6 0 0 0 .92.5l7.4-4.7a.6.6 0 0 0 0-1L4.92 2.3A.6.6 0 0 0 4 2.8z",
                  fill: "currentColor"
                })
              }), r.jsx("span", {
                children: a(vt ? "practice.narration.loading" : "practice.narration.label")
              })]
            }), Yt.image && Yt.type !== "fill" && r.jsx("div", {
              className: "practice-question-image-panel",
              children: r.jsx("img", {
                className: "practice-question-image",
                src: (ys = Yt.image.src, /^https?:\/\//.test(ys) ? ys : e(ys)),
                alt: Yt.image.alt
              })
            })]
          }), rs && r.jsx("div", {
            className: "practice-animation-panel",
            children: r.jsx("div", {
              className: "practice-animation-frame",
              ref: ke,
              style: {
                maxHeight: ge.maxHeight
              },
              children: r.jsx("div", {
                className: "practice-animation-scaler",
                style: {
                  height: Math.round(me * ge.scale)
                },
                children: r.jsx("iframe", {
                  ref: he,
                  title: Yt.prompt,
                  srcDoc: Yt.animationHtml + "<style>html,body{height:auto!important;min-height:0!important;max-height:none!important;}</style><script>(function(){function unlock(){var vh=innerHeight,k=document.body?document.body.children:[];for(var i=0;i<k.length;i++){var s=getComputedStyle(k[i]);if(Math.abs(parseFloat(s.minHeight)-vh)<1)k[i].style.minHeight='0px';if(Math.abs(parseFloat(s.height)-vh)<1)k[i].style.height='auto'}}function r(){try{unlock();var h=Math.ceil(document.documentElement.getBoundingClientRect().height);if(h>0)parent.postMessage({type:'hk-anim-height',height:h},'*')}catch(e){}}r();addEventListener(\"load\",r);try{new ResizeObserver(r).observe(document.documentElement)}catch(e){}})()</script>",
                  sandbox: "allow-scripts",
                  referrerPolicy: "no-referrer",
                  allow: "",
                  style: {
                    height: me,
                    transform: ge.scale < 1 ? `scale(${ge.scale})` : undefined
                  },
                  className: "practice-animation-iframe"
                }, Yt.id)
              })
            })
          }), Yt.type === "fill" ? r.jsx("span", {
            className: "practice-fill-spacer",
            "aria-hidden": "true"
          }) : r.jsx("div", {
            className: "practice-options-panel",
            role: Yt.type === "multiple" ? "group" : "radiogroup",
            "aria-label": "Answer options",
            children: r.jsx("div", {
              className: gs,
              children: Gt.map((e, t) => {
                const s = hs(e);
                return r.jsxs("div", {
                  className: fs(e),
                  role: Yt.type === "multiple" ? "checkbox" : "radio",
                  "aria-checked": s,
                  tabIndex: 0,
                  "data-correct-answer": ms(e) ? "true" : undefined,
                  onClick: () => os(e),
                  onKeyDown: t => ((e, t) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      os(t);
                    }
                  })(t, e),
                  children: [r.jsx("span", {
                    className: "practice-option-shape",
                    "aria-hidden": "true",
                    children: z[t % z.length]
                  }), r.jsx(H, {
                    content: e,
                    className: "practice-option-text"
                  }), Yt.type === "multiple" && r.jsx(m, {
                    checked: s,
                    onCheckedChange: () => ls(Yt.id, e),
                    onClick: e => e.stopPropagation(),
                    className: "practice-option-checkbox",
                    "aria-label": `Select ${e}`
                  }), t < 4 && as && r.jsx("span", {
                    className: "practice-option-key",
                    "aria-hidden": "true",
                    children: t + 1
                  })]
                }, e);
              })
            })
          }), !es && ns && r.jsx("p", {
            className: "practice-skipped-label",
            role: "status",
            children: a("practice.question.skippedLabel")
          })]
        }), r.jsx("div", {
          className: "practice-verdict",
          "aria-hidden": !es,
          children: r.jsx("div", {
            ref: be,
            className: "practice-verdict-inner practice-feedback" + (cs ? " practice-feedback--correct" : " practice-feedback--incorrect"),
            role: "status",
            children: es && r.jsxs(r.Fragment, {
              children: [r.jsxs("p", {
                className: "practice-verdict-headline",
                children: [r.jsx("span", {
                  className: "practice-verdict-mark",
                  "aria-hidden": "true",
                  children: cs ? r.jsx("svg", {
                    width: "13",
                    height: "13",
                    viewBox: "0 0 14 14",
                    fill: "none",
                    children: r.jsx("path", {
                      d: "M2.4 7.3l3 3 6.2-6.6",
                      stroke: "currentColor",
                      strokeWidth: "1.9",
                      strokeLinecap: "round",
                      strokeLinejoin: "round"
                    })
                  }) : r.jsx("svg", {
                    width: "13",
                    height: "13",
                    viewBox: "0 0 14 14",
                    fill: "none",
                    children: r.jsx("path", {
                      d: "M3.2 3.2l7.6 7.6M10.8 3.2l-7.6 7.6",
                      stroke: "currentColor",
                      strokeWidth: "1.9",
                      strokeLinecap: "round"
                    })
                  })
                }), r.jsx("span", {
                  children: a(cs ? "practice.question.correct" : "practice.question.incorrect")
                })]
              }), !cs && r.jsxs("p", {
                className: "practice-feedback-result",
                children: [a("practice.question.answerPrefix"), "\xA0", r.jsx("strong", {
                  children: r.jsx(H, {
                    content: Yt.correctAnswers.join(", "),
                    inline: true
                  })
                })]
              }), Z[Yt.id] && r.jsx(H, {
                content: Z[Yt.id],
                className: "practice-feedback-explanation practice-feedback-judgement"
              }), Yt.explanation && r.jsx(H, {
                content: Yt.explanation,
                className: "practice-feedback-explanation"
              })]
            })
          })
        })]
      }), r.jsxs("div", {
        className: "practice-actions",
        children: [ps && r.jsx("button", {
          type: "button",
          className: "practice-back-btn",
          onClick: () => {
            D(e => Math.max(e - 1, 0));
          },
          "aria-label": "Previous question",
          children: r.jsx("svg", {
            width: "16",
            height: "16",
            viewBox: "0 0 14 15",
            fill: "none",
            "aria-hidden": "true",
            children: r.jsx("path", {
              d: "M1.66663 6.50795L6.99996 1.42859M6.99996 1.42859L12.3333 6.50795M6.99996 1.42859V13.6191",
              stroke: "currentColor",
              strokeWidth: "1.3",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              transform: "rotate(-90 7 7.5)"
            })
          })
        }), !Fe && r.jsx("button", {
          ref: we,
          type: "button",
          className: ws,
          disabled: !es && (!is || te),
          onClick: () => {
            ds();
          },
          children: bs
        }), Fe && !ts && r.jsx("button", {
          type: "button",
          className: "practice-check-btn practice-check-btn--next",
          onClick: () => D(e => Math.min(e + 1, B.length - 1)),
          children: a("practice.actions.next")
        }), Fe && ts && r.jsx("button", {
          type: "button",
          className: "practice-check-btn",
          onClick: Ot,
          children: a("practice.lastAttempt.backToAttempt")
        }), !Fe && !es && !ts && r.jsx("button", {
          type: "button",
          className: "practice-skip-btn",
          onClick: () => {
            if (Fe) {
              return;
            }
            const e = new Audio("/sounds/button-click.mp3");
            e.volume = 0.6;
            e.play().catch(() => {});
            ce(e => ({
              ...e,
              [Yt.id]: true
            }));
            D(e => Math.min(e + 1, B.length - 1));
            Rt(false);
          },
          children: a("practice.actions.skip")
        })]
      })]
    }), r.jsx(U, {
      info: Pe,
      onClose: () => Qe(null)
    }), r.jsx(q, {
      pieces: Ne
    }), r.jsxs("aside", {
      className: `practice-assistant${He ? " practice-assistant--open" : ""}${Je ? " practice-assistant--dragover" : ""}`,
      "aria-label": "Practice assistant",
      onDragOver: e => {
        e.preventDefault();
        if (!Je) {
          Ge(true);
        }
      },
      onDragLeave: e => {
        e.preventDefault();
        if (e.currentTarget === e.target) {
          Ge(false);
        }
      },
      onDrop: e => {
        e.preventDefault();
        Ge(false);
        Vt(e.dataTransfer.files);
      },
      children: [r.jsxs("div", {
        className: "practice-assistant-body",
        ref: st,
        children: [ze.length === 0 && !Xe && r.jsx("p", {
          className: "practice-assistant-empty",
          children: a("practice.assistant.emptyStateHint")
        }), ze.map((e, t) => {
          const s = e.role === "assistant";
          const a = s && !e.content;
          return r.jsxs("div", {
            className: `practice-assistant-msg practice-assistant-msg--${e.role}${a ? " practice-assistant-msg--typing" : ""}`,
            children: [e.images && e.images.length > 0 && r.jsx("div", {
              className: "practice-assistant-msg-images",
              children: e.images.map((e, t) => r.jsx("img", {
                src: e,
                alt: "",
                className: "practice-assistant-msg-image"
              }, t))
            }), a ? r.jsxs("span", {
              className: "practice-assistant-dots",
              "aria-label": "Thinking",
              children: [r.jsx("span", {}), r.jsx("span", {}), r.jsx("span", {})]
            }) : s ? r.jsx(x, {
              content: e.content,
              className: "practice-assistant-markdown"
            }) : e.content && r.jsx("span", {
              className: "practice-assistant-msg-text",
              children: e.content
            })]
          }, t);
        })]
      }), et && r.jsx("p", {
        className: "practice-assistant-error",
        role: "alert",
        children: et
      }), Ye.length > 0 && r.jsx("div", {
        className: "practice-assistant-attachments",
        children: Ye.map((e, t) => r.jsxs("div", {
          className: "practice-assistant-thumb",
          children: [r.jsx("img", {
            src: e.url,
            alt: e.file.name,
            className: "practice-assistant-thumb-img"
          }), r.jsx("button", {
            type: "button",
            className: "practice-assistant-thumb-remove",
            onClick: () => (e => {
              Ve(t => {
                const s = [...t];
                const [r] = s.splice(e, 1);
                if (r) {
                  URL.revokeObjectURL(r.url);
                }
                return s;
              });
            })(t),
            "aria-label": "Remove image",
            children: r.jsx("svg", {
              width: "9",
              height: "9",
              viewBox: "0 0 13 13",
              fill: "none",
              "aria-hidden": "true",
              children: r.jsx("path", {
                d: "M1 1L12 12M12 1L1 12",
                stroke: "currentColor",
                strokeWidth: "1.6",
                strokeLinecap: "round"
              })
            })
          })]
        }, t))
      }), r.jsxs("form", {
        className: "practice-assistant-input-row",
        onSubmit: e => {
          e.preventDefault();
          Jt();
        },
        children: [r.jsxs("label", {
          className: "practice-assistant-attach",
          "aria-label": "Attach image",
          children: [r.jsx("input", {
            type: "file",
            accept: P,
            multiple: true,
            className: "practice-assistant-file-input",
            onChange: e => {
              Vt(e.target.files);
              e.target.value = "";
            }
          }), r.jsx("svg", {
            width: "14",
            height: "14",
            viewBox: "0 0 14 14",
            fill: "none",
            "aria-hidden": "true",
            children: r.jsx("path", {
              d: "M7 1.5V12.5M1.5 7H12.5",
              stroke: "currentColor",
              strokeWidth: "1.5",
              strokeLinecap: "round"
            })
          })]
        }), r.jsx("input", {
          type: "text",
          className: "practice-assistant-input",
          placeholder: a("practice.assistant.inputPlaceholder"),
          value: _e,
          onChange: e => Ke(e.target.value),
          disabled: Xe
        }), r.jsx("button", {
          type: "submit",
          className: "practice-assistant-submit-btn" + (!_e.trim() && Ye.length === 0 || Xe ? " practice-assistant-submit-btn--disabled" : ""),
          disabled: !_e.trim() && Ye.length === 0 || Xe,
          "aria-label": "Send",
          children: Xe ? r.jsx("div", {
            className: "practice-assistant-submit-spinner"
          }) : r.jsx("svg", {
            width: "14",
            height: "15",
            viewBox: "0 0 14 15",
            fill: "none",
            "aria-hidden": "true",
            children: r.jsx("path", {
              d: "M1.66663 6.50795L6.99996 1.42859M6.99996 1.42859L12.3333 6.50795M6.99996 1.42859V13.6191",
              stroke: "currentColor",
              strokeWidth: "1.5",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            })
          })
        })]
      })]
    })]
  });
  var ys;
};
export { K as default };