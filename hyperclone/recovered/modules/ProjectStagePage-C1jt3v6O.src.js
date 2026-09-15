import { c as e, g as t, b as s, u as a, l as r, G as n, j as o } from "./index-TjoB2Buo.js";
import { C as i } from "./CourseFeedbackEntry-yXmrvWpY.js";
import { u as c, M as l } from "./useAudioPlayer-DPbJ9VKN.js";
import { A as d, V as p } from "./VoiceSettingsModal-Bp7qApl4.js";
import { l as u, s as j } from "./voicePrefs-rmmbxoX2.js";
import "./BugReportModal-DxKVyQda.js";
import "./github-BU76ptNE.js";
import "./index-qYFgNVxk.js";
import "./index-DTP6V39T.js";
import "./createLucideIcon-B4HcG4gb.js";
import "./x-BPqZ-rfi.js";
const g = () => {
  const e = t();
  if (e) {
    return {
      Authorization: `Bearer ${e}`
    };
  } else {
    return {};
  }
};
const h = (t, s, a) => e(`/api/v1/course-generation/courses/${encodeURIComponent(t)}/project/stages/${encodeURIComponent(s)}/steps/${encodeURIComponent(a)}/submission`);
async function m(e) {
  if (!e.ok) {
    let t = `Request failed with status ${e.status}`;
    try {
      const s = await e.json();
      if (s == null ? undefined : s.detail) {
        t = String(s.detail);
      }
    } catch {}
    throw new Error(t);
  }
  return e.json();
}
async function x(t, s, a, r) {
  try {
    await fetch(((t, s, a) => e(`/api/v1/course-generation/courses/${encodeURIComponent(t)}/project/stages/${encodeURIComponent(s)}/steps/${encodeURIComponent(a)}/draft`))(t, s, a), {
      method: "POST",
      headers: {
        ...g(),
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        text: r
      })
    });
  } catch {}
}
const v = {
  file: [".pdf,.png,.jpg,.jpeg,.webp,.heic,.heif", ".txt,.md,.markdown,.rtf,.csv,.tsv,.xml,.html,.htm,.css", ".py,.js,.mjs,.jsx,.ts,.tsx,.json,.ipynb,.yaml,.yml,.toml,.sql,.sh,.r", ".java,.c,.h,.cpp,.hpp,.cs,.go,.rs,.rb,.php,.swift,.kt,.tex"].join(","),
  pdf: ".pdf",
  image: ".png,.jpg,.jpeg,.webp,.heic,.heif"
};
const f = ["image/png", "image/jpeg", "image/webp"];
const b = f.join(",");
const k = () => {
  var t;
  var k;
  var N;
  const {
    t: w
  } = s();
  const y = a();
  const {
    courseId: S,
    stageId: C
  } = r();
  const [L, _] = n.useState("loading");
  const [R, I] = n.useState("");
  const [M, $] = n.useState("");
  const [U, B] = n.useState([]);
  const [P, T] = n.useState(0);
  const [E, W] = n.useState(0);
  const [O, A] = n.useState(() => u() ?? {
    voiceId: "calm",
    speed: 1
  });
  const [D, F] = n.useState(false);
  const [V, q] = n.useState(false);
  const {
    isPlaying: H,
    play: z,
    pause: J,
    toggle: G
  } = c();
  const K = n.useRef(null);
  const Q = n.useRef(null);
  const X = n.useRef(P);
  n.useEffect(() => {
    X.current = P;
  }, [P]);
  const [Y, Z] = n.useState(false);
  const [ee, te] = n.useState([]);
  const [se, ae] = n.useState("");
  const [re, ne] = n.useState([]);
  const [oe, ie] = n.useState(false);
  const [ce, le] = n.useState(false);
  const [de, pe] = n.useState("");
  const ue = n.useRef(null);
  const [je, ge] = n.useState({});
  const [he, me] = n.useState({});
  const [xe, ve] = n.useState({});
  const [fe, be] = n.useState(null);
  const [ke, Ne] = n.useState("");
  const [we, ye] = n.useState(false);
  const Se = n.useRef(null);
  const Ce = n.useRef(null);
  const Le = n.useCallback(() => {
    if (Se.current) {
      clearTimeout(Se.current);
      Se.current = null;
    }
    const e = Ce.current;
    if (e && S && C) {
      Ce.current = null;
      x(S, C, e.stepId, e.text);
    }
  }, [S, C]);
  n.useEffect(() => {
    W(e => Math.max(e, P));
  }, [P]);
  const _e = n.useCallback((e, t) => {
    Ce.current = {
      stepId: e,
      text: t
    };
    if (Se.current) {
      clearTimeout(Se.current);
    }
    Se.current = setTimeout(Le, 600);
  }, [Le]);
  n.useEffect(() => () => Le(), [Le]);
  n.useEffect(() => {
    let t = false;
    if (!S || !C) {
      _("error");
      I(w("projectStage.missingCourseOrStage"));
      return;
    }
    _("loading");
    T(0);
    W(0);
    ge({});
    me({});
    ve({});
    Ne("");
    ye(false);
    Z(false);
    te([]);
    ae("");
    ne(e => {
      e.forEach(e => URL.revokeObjectURL(e.url));
      return [];
    });
    ie(false);
    pe("");
    (async function (t) {
      try {
        await fetch(e(`/api/v1/course-generation/courses/${encodeURIComponent(t)}/project/tts/prewarm`), {
          headers: g()
        });
      } catch {}
    })(S);
    const s = async function (t, s, a) {
      const r = new URLSearchParams();
      if ((a == null ? undefined : a.speed) !== undefined) {
        r.set("speed", String(a.speed));
      }
      if ((a == null ? undefined : a.voiceId) !== undefined) {
        r.set("voice_id", a.voiceId);
      }
      const n = r.toString();
      const o = await fetch(e(`/api/v1/course-generation/courses/${encodeURIComponent(t)}/project/stages/${encodeURIComponent(s)}/steps/_first/tts${n ? `?${n}` : ""}`), {
        headers: g()
      });
      if (!o.ok) {
        let e = `Request failed with status ${o.status}`;
        try {
          const t = await o.json();
          if (t == null ? undefined : t.detail) {
            e = String(t.detail);
          }
        } catch {}
        throw new Error(e);
      }
      const i = await o.json();
      return {
        audioUrl: e(i.audio_url),
        stepId: i.step_id
      };
    }(S, C, {
      speed: O.speed,
      voiceId: O.voiceId
    }).then(({
      audioUrl: e,
      stepId: t
    }) => ({
      stepId: t,
      url: e
    })).catch(() => null);
    Q.current = s;
    s.then(e => {
      if (!t && e && X.current === 0) {
        K.current = e;
        q(false);
        z(e.url);
      }
    });
    (async function (t) {
      const s = await fetch(e(`/api/v1/course-generation/courses/${encodeURIComponent(t)}/project`), {
        headers: g()
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
    })(S).then(async s => {
      var a;
      if (t) {
        return;
      }
      if (!s) {
        _("pending");
        return;
      }
      const r = (s.stages ?? []).find(e => e.stage_id === C);
      const n = (r == null ? undefined : r.steps) ?? [];
      $((r == null ? undefined : r.stage_title) ?? "");
      B(n);
      _(n.length > 0 ? "ready" : "empty");
      const o = await async function (t, s) {
        try {
          const a = await fetch(e(`/api/v1/course-generation/courses/${encodeURIComponent(t)}/project/stages/${encodeURIComponent(s)}/state`), {
            headers: g()
          });
          if (!a.ok) {
            return {
              submissions: {},
              drafts: {}
            };
          }
          const r = await a.json();
          return {
            submissions: r.submissions ?? {},
            drafts: r.drafts ?? {}
          };
        } catch {
          return {
            submissions: {},
            drafts: {}
          };
        }
      }(S, C);
      if (t) {
        return;
      }
      const i = {};
      for (const e of n) {
        if (e.need_response && o.submissions[e.step_id]) {
          i[e.step_id] = o.submissions[e.step_id];
        }
      }
      ge(i);
      const c = {};
      for (const e of n) {
        const t = e.need_response && (((a = e.metadata) == null ? undefined : a.upload_type) ?? "file") === "text";
        const s = o.drafts[e.step_id];
        if (t && (s == null ? undefined : s.text)) {
          c[e.step_id] = s.text;
        }
      }
      if (Object.keys(c).length > 0) {
        ve(e => ({
          ...c,
          ...e
        }));
      }
    }).catch(e => {
      if (!t) {
        I(e instanceof Error ? e.message : w("projectStage.failedToLoadProject"));
        _("error");
      }
    });
    return () => {
      t = true;
    };
  }, [S, C]);
  n.useEffect(() => {
    const e = ue.current;
    if (e) {
      e.scrollTop = e.scrollHeight;
    }
  }, [ee, ce, Y]);
  const Re = (t = U[P]) == null ? undefined : t.step_id;
  n.useEffect(() => {
    var t;
    if (!S || !C || !Re) {
      return;
    }
    let s = false;
    const a = () => {
      J();
      q(true);
      (async function (t, s, a, r) {
        const n = new URLSearchParams();
        if ((r == null ? undefined : r.speed) !== undefined) {
          n.set("speed", String(r.speed));
        }
        if ((r == null ? undefined : r.voiceId) !== undefined) {
          n.set("voice_id", r.voiceId);
        }
        const o = n.toString();
        const i = await fetch(e(`/api/v1/course-generation/courses/${encodeURIComponent(t)}/project/stages/${encodeURIComponent(s)}/steps/${encodeURIComponent(a)}/tts${o ? `?${o}` : ""}`), {
          headers: g()
        });
        if (!i.ok) {
          let e = `Request failed with status ${i.status}`;
          try {
            const t = await i.json();
            if (t == null ? undefined : t.detail) {
              e = String(t.detail);
            }
          } catch {}
          throw new Error(e);
        }
        const c = await i.json();
        return e(c.audio_url);
      })(S, C, Re, {
        speed: O.speed,
        voiceId: O.voiceId
      }).then(e => {
        if (!s) {
          q(false);
          z(e);
        }
      }).catch(() => {
        if (!s) {
          q(false);
        }
      });
    };
    if (((t = K.current) == null ? undefined : t.stepId) === Re) {
      K.current = null;
      Q.current = null;
    } else if (P === 0 && Q.current) {
      const e = Q.current;
      Q.current = null;
      q(true);
      e.then(e => {
        if (!s) {
          if (e) {
            q(false);
            K.current = null;
            return;
          } else {
            a();
            return;
          }
        }
      });
    } else {
      a();
    }
    return () => {
      s = true;
      J();
      q(false);
    };
  }, [S, C, Re, P, z, J]);
  const Ie = V || H;
  const Me = () => {
    y(S ? `/course/${S}` : "/courses", S ? {
      state: {
        fromStageId: C
      }
    } : undefined);
  };
  const $e = e => {
    if (!e) {
      return;
    }
    const t = Array.from(e).filter(e => f.includes(e.type));
    if (t.length !== 0) {
      pe("");
      ne(e => [...e, ...t.map(e => ({
        file: e,
        url: URL.createObjectURL(e)
      }))]);
    }
  };
  const Ue = async () => {
    const t = se.trim();
    const s = re;
    if (!t && s.length === 0 || ce || !S || !C) {
      return;
    }
    const a = {
      role: "user",
      content: t,
      images: s.map(e => e.url)
    };
    const r = [...ee, a];
    te([...r, {
      role: "assistant",
      content: ""
    }]);
    ae("");
    ne([]);
    pe("");
    le(true);
    const n = r.map(e => ({
      role: e.role,
      content: e.content
    }));
    try {
      await async function (t, s, a, r, n = {}) {
        var o;
        var i;
        var c;
        const l = new FormData();
        l.append("stage_id", s);
        if (a != null) {
          l.append("step_index", String(a));
        }
        l.append("messages", JSON.stringify(r));
        for (const e of n.images ?? []) {
          l.append("images", e);
        }
        const d = await fetch(e(`/api/v1/course-generation/courses/${encodeURIComponent(t)}/project/assistant`), {
          method: "POST",
          headers: g(),
          body: l,
          signal: n.signal
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
          if ((o = n.onToken) != null) {
            o.call(n, e, e);
          }
          return e;
        }
        const p = d.body.getReader();
        const u = new TextDecoder();
        let j = "";
        while (true) {
          const {
            done: e,
            value: t
          } = await p.read();
          if (e) {
            break;
          }
          const s = u.decode(t, {
            stream: true
          });
          if (s) {
            j += s;
            if ((i = n.onToken) != null) {
              i.call(n, s, j);
            }
          }
        }
        const h = u.decode();
        if (h) {
          j += h;
          if ((c = n.onToken) != null) {
            c.call(n, h, j);
          }
        }
        return j;
      }(S, C, P, n, {
        images: s.map(e => e.file),
        onToken: (e, t) => {
          te(e => {
            const s = [...e];
            s[s.length - 1] = {
              role: "assistant",
              content: t
            };
            return s;
          });
        }
      });
    } catch (o) {
      te(e => {
        const t = [...e];
        const s = t[t.length - 1];
        if (s && s.role === "assistant" && !s.content) {
          t.pop();
        }
        return t;
      });
      pe(o instanceof Error ? o.message : w("projectStage.assistantUnavailable"));
    } finally {
      le(false);
    }
  };
  const Be = async e => {
    var t;
    if (!S || !C) {
      return;
    }
    const s = (((t = e.metadata) == null ? undefined : t.upload_type) ?? "file") === "text";
    const a = he[e.step_id];
    const r = (xe[e.step_id] ?? "").trim();
    if (s ? r : a) {
      Ne("");
      be(e.step_id);
      try {
        const t = s ? await async function (e, t, s, a) {
          return m(await fetch(`${h(e, t, s)}/text`, {
            method: "POST",
            headers: {
              ...g(),
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              text: a
            })
          }));
        }(S, C, e.step_id, r) : await async function (e, t, s, a) {
          const r = new FormData();
          r.append("file", a);
          return m(await fetch(h(e, t, s), {
            method: "POST",
            headers: g(),
            body: r
          }));
        }(S, C, e.step_id, a);
        ge(s => ({
          ...s,
          [e.step_id]: t
        }));
        const n = new Audio(t.passed ? "/sounds/answer-correct.mp3" : "/sounds/answer-wrong.mp3");
        n.volume = 0.6;
        n.play().catch(() => {});
        if (!s) {
          me(t => {
            const s = {
              ...t
            };
            delete s[e.step_id];
            return s;
          });
        }
      } catch (n) {
        Ne(n instanceof Error ? n.message : w("projectStage.submitFailed"));
      } finally {
        be(null);
      }
    }
  };
  if (L === "loading") {
    return o.jsxs("div", {
      className: "project-stage-page",
      "aria-busy": "true",
      children: [o.jsxs("div", {
        className: "project-stage-topbar",
        children: [o.jsx("button", {
          type: "button",
          className: "project-stage-close-btn",
          onClick: Me,
          "aria-label": "Close project",
          children: o.jsx("svg", {
            width: "13",
            height: "13",
            viewBox: "0 0 13 13",
            fill: "none",
            "aria-hidden": "true",
            children: o.jsx("path", {
              d: "M1 1L12 12M12 1L1 12",
              stroke: "currentColor",
              strokeWidth: "1.35",
              strokeLinecap: "round"
            })
          })
        }), o.jsx("div", {
          className: "project-stage-progress-dots project-stage-sk-progress",
          "aria-label": "Loading project progress",
          children: Array.from({
            length: 5
          }, (e, t) => o.jsx("span", {
            className: "project-stage-progress-dot" + (t === 0 ? " project-stage-progress-dot--active" : "")
          }, t))
        }), o.jsx("div", {
          className: "project-stage-sk-assistant",
          "aria-hidden": "true"
        })]
      }), o.jsx("div", {
        className: "project-stage-body",
        children: o.jsxs("main", {
          className: "project-stage-stage",
          "aria-label": "Loading project step",
          children: [o.jsx("div", {
            className: "project-stage-split",
            children: o.jsxs("section", {
              className: "project-stage-shell project-stage-sk-shell",
              children: [o.jsx("div", {
                className: "project-stage-sk-line project-stage-sk-kicker"
              }), o.jsxs("div", {
                className: "project-stage-sk-title-row",
                children: [o.jsx("div", {
                  className: "project-stage-sk-line project-stage-sk-title"
                }), o.jsx("div", {
                  className: "project-stage-sk-pill"
                })]
              }), o.jsxs("div", {
                className: "project-stage-sk-copy",
                children: [o.jsx("div", {
                  className: "project-stage-sk-line"
                }), o.jsx("div", {
                  className: "project-stage-sk-line"
                }), o.jsx("div", {
                  className: "project-stage-sk-line project-stage-sk-line--short"
                })]
              }), o.jsxs("div", {
                className: "project-stage-sk-panel",
                children: [o.jsx("div", {
                  className: "project-stage-sk-line project-stage-sk-panel-line"
                }), o.jsx("div", {
                  className: "project-stage-sk-line project-stage-sk-panel-line project-stage-sk-panel-line--short"
                })]
              })]
            })
          }), o.jsx("div", {
            className: "project-stage-actions project-stage-sk-actions",
            children: o.jsx("div", {
              className: "project-stage-sk-primary-btn"
            })
          })]
        })
      })]
    });
  }
  if (L !== "ready") {
    const e = L === "pending" ? w("projectStage.pendingMessage") : L === "empty" ? w("projectStage.emptySteps") : R || w("projectStage.loadErrorFallback");
    return o.jsxs("div", {
      className: "project-stage-page",
      children: [o.jsx("button", {
        type: "button",
        className: "project-stage-close-btn",
        onClick: Me,
        "aria-label": "Close project",
        children: o.jsx("svg", {
          width: "13",
          height: "13",
          viewBox: "0 0 13 13",
          fill: "none",
          "aria-hidden": "true",
          children: o.jsx("path", {
            d: "M1 1L12 12M12 1L1 12",
            stroke: "currentColor",
            strokeWidth: "1.35",
            strokeLinecap: "round"
          })
        })
      }), o.jsx("div", {
        className: "project-stage-status",
        role: "status",
        children: e
      })]
    });
  }
  const Pe = U[P];
  const Te = P >= U.length - 1;
  const Ee = P > 0;
  const We = U.filter(e => e.need_response);
  const Oe = We.filter(e => {
    var t;
    if ((t = je[e.step_id]) == null) {
      return undefined;
    } else {
      return t.passed;
    }
  }).length;
  const Ae = (e, t) => {
    if (!e.need_response) {
      if (t < E || (e => U.slice(e + 1).some(e => Boolean(je[e.step_id]) || Boolean((xe[e.step_id] ?? "").trim())))(t)) {
        return "passed";
      } else {
        return "";
      }
    }
    const s = je[e.step_id];
    if (s == null ? undefined : s.passed) {
      return "passed";
    } else if (s) {
      return "needswork";
    } else if ((xe[e.step_id] ?? "").trim()) {
      return "draft";
    } else {
      return "";
    }
  };
  const De = je[Pe.step_id];
  const Fe = he[Pe.step_id];
  const Ve = fe === Pe.step_id;
  const qe = ((k = Pe.metadata) == null ? undefined : k.upload_type) ?? "file";
  const He = qe === "text";
  const ze = ((N = Pe.metadata) == null ? undefined : N.response_instruction) ?? "";
  const Je = xe[Pe.step_id] ?? "";
  const Ge = He ? Je.trim().length > 0 : Boolean(Fe);
  const Ke = U.every(e => {
    var t;
    return !e.need_response || ((t = je[e.step_id]) == null ? undefined : t.passed) === true;
  });
  const Qe = Te && !Ke;
  const Xe = () => {
    ye(false);
    if (Te) {
      Me();
    } else {
      Ne("");
      T(e => Math.min(e + 1, U.length - 1));
    }
  };
  return o.jsxs("div", {
    className: "project-stage-page" + (Y ? " project-stage-page--assistant-open" : ""),
    children: [o.jsxs("div", {
      className: "project-stage-topbar",
      children: [o.jsx("button", {
        type: "button",
        className: "project-stage-close-btn",
        onClick: Me,
        "aria-label": "Close project",
        children: o.jsx("svg", {
          width: "13",
          height: "13",
          viewBox: "0 0 13 13",
          fill: "none",
          "aria-hidden": "true",
          children: o.jsx("path", {
            d: "M1 1L12 12M12 1L1 12",
            stroke: "currentColor",
            strokeWidth: "1.35",
            strokeLinecap: "round"
          })
        })
      }), o.jsx("div", {
        className: "project-stage-progress-dots",
        "aria-label": "Project progress",
        children: U.map((e, t) => {
          const s = Ae(e, t);
          return o.jsx("span", {
            className: `project-stage-progress-dot${t === P ? " project-stage-progress-dot--active" : ""}${s ? ` project-stage-progress-dot--${s}` : ""}`
          }, t);
        })
      }), o.jsxs("div", {
        className: "project-stage-topbar-right",
        children: [We.length > 0 && o.jsxs("span", {
          className: "project-stage-progress-chip",
          role: "status",
          children: [w("projectStage.stepsPassed"), o.jsxs("b", {
            children: [Oe, "/", We.length]
          })]
        }), o.jsx(i, {
          conversationId: C,
          courseId: S,
          source: "project"
        }), o.jsx("button", {
          type: "button",
          className: "project-stage-tts-settings-btn",
          "data-busy": Ie ? "true" : "false",
          "aria-disabled": Ie,
          onClick: () => {
            if (!Ie) {
              F(true);
            }
          },
          "aria-label": "Voice settings",
          title: w(Ie ? "projectStage.generatingVoice" : "projectStage.voiceSettings"),
          children: o.jsx(d, {
            size: 15
          })
        }), o.jsxs("button", {
          type: "button",
          className: "project-stage-assistant-toggle" + (Y ? " project-stage-assistant-toggle--active" : ""),
          onClick: () => Z(e => !e),
          "aria-label": Y ? "Close assistant" : "Open assistant",
          children: [o.jsx("svg", {
            width: "15",
            height: "15",
            viewBox: "0 0 15 15",
            fill: "none",
            "aria-hidden": "true",
            children: o.jsx("path", {
              d: "M7.5 1.5C4.186 1.5 1.5 3.91 1.5 6.9c0 1.56.72 2.96 1.88 3.96L2.5 13.5l2.8-1.4c.69.24 1.43.37 2.2.37 3.314 0 6-2.41 6-5.4S10.814 1.5 7.5 1.5z",
              stroke: "currentColor",
              strokeWidth: "1.3",
              strokeLinejoin: "round"
            })
          }), o.jsx("span", {
            children: w("projectStage.assistant")
          })]
        })]
      })]
    }), o.jsxs("div", {
      className: "project-stage-body",
      children: [o.jsxs("main", {
        className: "project-stage-stage",
        "aria-label": "Project step",
        children: [o.jsxs("div", {
          className: "project-stage-split" + (De ? " project-stage-split--revealed" : ""),
          children: [o.jsxs("section", {
            className: "project-stage-shell",
            children: [o.jsxs("div", {
              className: "project-stage-prompt",
              children: [o.jsxs("p", {
                className: "project-stage-kicker",
                children: [M ? `${M} · ` : "", w("onboarding.stepIndicator", {
                  current: P + 1,
                  total: U.length
                })]
              }), Pe.need_response && o.jsx("p", {
                className: "project-stage-requires",
                children: w(`projectStage.requires.${qe}`)
              }), o.jsxs("div", {
                className: "project-stage-title-row",
                children: [o.jsx("h1", {
                  className: "project-stage-title",
                  children: Pe.step_title
                }), o.jsx("button", {
                  type: "button",
                  className: "project-stage-tts-btn" + (H ? " project-stage-tts-btn--playing" : ""),
                  onClick: G,
                  "aria-label": H ? "Pause narration" : "Play narration",
                  "aria-pressed": H,
                  children: H ? o.jsxs(o.Fragment, {
                    children: [o.jsxs("svg", {
                      width: "11",
                      height: "11",
                      viewBox: "0 0 15 15",
                      fill: "none",
                      "aria-hidden": "true",
                      children: [o.jsx("rect", {
                        x: "3.5",
                        y: "2.5",
                        width: "2.6",
                        height: "10",
                        rx: "1",
                        fill: "currentColor"
                      }), o.jsx("rect", {
                        x: "8.9",
                        y: "2.5",
                        width: "2.6",
                        height: "10",
                        rx: "1",
                        fill: "currentColor"
                      })]
                    }), o.jsx("span", {
                      className: "project-stage-tts-label",
                      children: w("courseSession.pauseNarration")
                    })]
                  }) : o.jsxs(o.Fragment, {
                    children: [o.jsx("svg", {
                      width: "11",
                      height: "11",
                      viewBox: "0 0 15 15",
                      fill: "none",
                      "aria-hidden": "true",
                      children: o.jsx("path", {
                        d: "M4 2.8v9.4a.6.6 0 0 0 .92.5l7.4-4.7a.6.6 0 0 0 0-1L4.92 2.3A.6.6 0 0 0 4 2.8z",
                        fill: "currentColor"
                      })
                    }), o.jsx("span", {
                      className: "project-stage-tts-label",
                      children: w("projectStage.narrationPlaying")
                    })]
                  })
                })]
              }), Pe.step_body && o.jsx(l, {
                content: Pe.step_body,
                className: "project-stage-body-text"
              })]
            }), Pe.need_response && o.jsxs("div", {
              className: "project-stage-upload",
              children: [ze && o.jsx(l, {
                content: ze,
                className: "project-stage-upload-instruction"
              }), He ? o.jsxs("div", {
                className: "project-stage-text-wrap",
                children: [o.jsx("textarea", {
                  className: "project-stage-text-input",
                  placeholder: w("projectStage.answerPlaceholder"),
                  rows: 6,
                  value: Je,
                  onChange: e => {
                    Ne("");
                    const t = e.target.value;
                    ve(e => ({
                      ...e,
                      [Pe.step_id]: t
                    }));
                    _e(Pe.step_id, t);
                  },
                  onBlur: Le
                }), o.jsx("button", {
                  type: "button",
                  className: "project-stage-submit-btn" + (!Ge || Ve ? " project-stage-submit-btn--disabled" : ""),
                  disabled: !Ge || Ve,
                  onClick: () => Be(Pe),
                  "aria-label": Ve ? "Reviewing…" : De ? "Resubmit for review" : "Submit for review",
                  children: Ve ? o.jsx("div", {
                    className: "project-stage-submit-spinner"
                  }) : o.jsx("svg", {
                    width: "14",
                    height: "14",
                    viewBox: "0 0 14 15",
                    fill: "none",
                    "aria-hidden": "true",
                    children: o.jsx("path", {
                      d: "M1.66663 6.50795L6.99996 1.42859M6.99996 1.42859L12.3333 6.50795M6.99996 1.42859V13.6191",
                      stroke: "currentColor",
                      strokeWidth: "1.5",
                      strokeLinecap: "round",
                      strokeLinejoin: "round"
                    })
                  })
                })]
              }) : o.jsxs("div", {
                className: "project-stage-file-row",
                children: [o.jsxs("label", {
                  className: "project-stage-file-pick",
                  children: [o.jsx("input", {
                    type: "file",
                    accept: v[qe],
                    className: "project-stage-file-input",
                    onChange: e => ((e, t) => {
                      const s = t == null ? undefined : t[0];
                      if (s) {
                        Ne("");
                        me(t => ({
                          ...t,
                          [e]: s
                        }));
                      }
                    })(Pe.step_id, e.target.files)
                  }), o.jsx("span", {
                    className: "project-stage-file-pick-label",
                    children: Fe ? Fe.name : w("projectStage.chooseFile")
                  })]
                }), o.jsx("button", {
                  type: "button",
                  className: "project-stage-submit-btn" + (!Ge || Ve ? " project-stage-submit-btn--disabled" : ""),
                  disabled: !Ge || Ve,
                  onClick: () => Be(Pe),
                  "aria-label": Ve ? "Reviewing…" : De ? "Resubmit for review" : "Submit for review",
                  children: Ve ? o.jsx("div", {
                    className: "project-stage-submit-spinner"
                  }) : o.jsx("svg", {
                    width: "14",
                    height: "14",
                    viewBox: "0 0 14 15",
                    fill: "none",
                    "aria-hidden": "true",
                    children: o.jsx("path", {
                      d: "M1.66663 6.50795L6.99996 1.42859M6.99996 1.42859L12.3333 6.50795M6.99996 1.42859V13.6191",
                      stroke: "currentColor",
                      strokeWidth: "1.5",
                      strokeLinecap: "round",
                      strokeLinejoin: "round"
                    })
                  })
                })]
              }), ke && o.jsx("p", {
                className: "project-stage-submit-error",
                role: "alert",
                children: ke
              })]
            })]
          }), o.jsx("div", {
            className: "project-stage-verdict-col",
            "aria-hidden": !De,
            children: o.jsx("div", {
              className: "project-stage-verdict-inner",
              children: De && o.jsxs("div", {
                className: "project-stage-verdict" + (De.passed ? " project-stage-verdict--pass" : " project-stage-verdict--fail"),
                role: "status",
                children: [o.jsxs("p", {
                  className: "project-stage-verdict-head",
                  children: [De.passed ? o.jsx("svg", {
                    width: "14",
                    height: "14",
                    viewBox: "0 0 14 14",
                    fill: "none",
                    "aria-hidden": "true",
                    children: o.jsx("path", {
                      d: "M2.5 7.5L5.5 10.5L11.5 4",
                      stroke: "currentColor",
                      strokeWidth: "1.5",
                      strokeLinecap: "round",
                      strokeLinejoin: "round"
                    })
                  }) : o.jsxs("svg", {
                    width: "14",
                    height: "14",
                    viewBox: "0 0 14 14",
                    fill: "none",
                    "aria-hidden": "true",
                    children: [o.jsx("path", {
                      d: "M7 4V7.5M7 10H7.01",
                      stroke: "currentColor",
                      strokeWidth: "1.5",
                      strokeLinecap: "round"
                    }), o.jsx("circle", {
                      cx: "7",
                      cy: "7",
                      r: "5.5",
                      stroke: "currentColor",
                      strokeWidth: "1.3"
                    })]
                  }), De.passed ? w("projectStage.verdictPass") : w("projectStage.verdictFail")]
                }), o.jsx(l, {
                  content: De.feedback,
                  className: "project-stage-verdict-feedback"
                })]
              })
            })
          })]
        }), o.jsxs("div", {
          className: "project-stage-actions",
          children: [Ee && o.jsxs("button", {
            type: "button",
            className: "project-stage-nav-btn project-stage-nav-btn--back",
            onClick: () => {
              Le();
              Ne("");
              ye(false);
              T(e => Math.max(e - 1, 0));
            },
            "aria-label": "Previous step",
            children: [o.jsx("svg", {
              width: "18",
              height: "18",
              viewBox: "0 0 18 18",
              fill: "none",
              "aria-hidden": "true",
              children: o.jsx("path", {
                d: "M11 4L6 9L11 14",
                stroke: "currentColor",
                strokeWidth: "1.5",
                strokeLinecap: "round",
                strokeLinejoin: "round"
              })
            }), o.jsx("span", {
              className: "project-stage-nav-label",
              children: w("projectStage.previousStep")
            })]
          }), o.jsxs("button", {
            type: "button",
            className: "project-stage-nav-btn project-stage-nav-btn--next" + (Qe ? " project-stage-nav-btn--disabled" : ""),
            onClick: () => {
              if (Qe) {
                return;
              }
              const e = new Audio("/sounds/button-click.mp3");
              e.volume = 0.6;
              e.play().catch(() => {});
              Le();
              if (!Pe.need_response || De) {
                Xe();
              } else {
                ye(true);
              }
            },
            disabled: Qe,
            "aria-label": Te ? "Finish" : "Next step",
            title: Qe ? w("projectStage.finishBlockedHint") : undefined,
            children: [o.jsx("span", {
              className: "project-stage-nav-label",
              children: w(Te ? "projectStage.finish" : "projectStage.nextStep")
            }), o.jsx("svg", {
              width: "18",
              height: "18",
              viewBox: "0 0 18 18",
              fill: "none",
              "aria-hidden": "true",
              children: o.jsx("path", {
                d: "M7 4L12 9L7 14",
                stroke: "currentColor",
                strokeWidth: "1.5",
                strokeLinecap: "round",
                strokeLinejoin: "round"
              })
            })]
          })]
        })]
      }), o.jsxs("aside", {
        className: `project-stage-assistant${Y ? " project-stage-assistant--open" : ""}${oe ? " project-stage-assistant--dragover" : ""}`,
        "aria-label": "Project assistant",
        onDragOver: e => {
          e.preventDefault();
          if (!oe) {
            ie(true);
          }
        },
        onDragLeave: e => {
          e.preventDefault();
          if (e.currentTarget === e.target) {
            ie(false);
          }
        },
        onDrop: e => {
          e.preventDefault();
          ie(false);
          $e(e.dataTransfer.files);
        },
        children: [o.jsxs("div", {
          className: "project-stage-assistant-body",
          ref: ue,
          children: [ee.length === 0 && !ce && o.jsx("p", {
            className: "project-stage-assistant-empty",
            children: w("projectStage.assistantEmptyState")
          }), ee.map((e, t) => {
            const s = e.role === "assistant";
            const a = s && !e.content;
            return o.jsxs("div", {
              className: `project-stage-assistant-msg project-stage-assistant-msg--${e.role}`,
              children: [e.images && e.images.length > 0 && o.jsx("div", {
                className: "project-stage-assistant-msg-images",
                children: e.images.map((e, t) => o.jsx("img", {
                  src: e,
                  alt: "",
                  className: "project-stage-assistant-msg-image"
                }, t))
              }), a ? o.jsxs("span", {
                className: "project-stage-assistant-dots",
                "aria-label": "Thinking",
                children: [o.jsx("span", {}), o.jsx("span", {}), o.jsx("span", {})]
              }) : s ? o.jsx(l, {
                content: e.content,
                className: "project-stage-assistant-markdown"
              }) : e.content && o.jsx("span", {
                className: "project-stage-assistant-msg-text",
                children: e.content
              })]
            }, t);
          })]
        }), de && o.jsx("p", {
          className: "project-stage-assistant-error",
          role: "alert",
          children: de
        }), re.length > 0 && o.jsx("div", {
          className: "project-stage-assistant-attachments",
          children: re.map((e, t) => o.jsxs("div", {
            className: "project-stage-assistant-thumb",
            children: [o.jsx("img", {
              src: e.url,
              alt: e.file.name,
              className: "project-stage-assistant-thumb-img"
            }), o.jsx("button", {
              type: "button",
              className: "project-stage-assistant-thumb-remove",
              onClick: () => (e => {
                ne(t => {
                  const s = [...t];
                  const [a] = s.splice(e, 1);
                  if (a) {
                    URL.revokeObjectURL(a.url);
                  }
                  return s;
                });
              })(t),
              "aria-label": "Remove image",
              children: o.jsx("svg", {
                width: "9",
                height: "9",
                viewBox: "0 0 13 13",
                fill: "none",
                "aria-hidden": "true",
                children: o.jsx("path", {
                  d: "M1 1L12 12M12 1L1 12",
                  stroke: "currentColor",
                  strokeWidth: "1.6",
                  strokeLinecap: "round"
                })
              })
            })]
          }, t))
        }), o.jsxs("form", {
          className: "project-stage-assistant-input-row",
          onSubmit: e => {
            e.preventDefault();
            Ue();
          },
          children: [o.jsxs("label", {
            className: "project-stage-assistant-attach",
            "aria-label": "Attach image",
            children: [o.jsx("input", {
              type: "file",
              accept: b,
              multiple: true,
              className: "project-stage-file-input",
              onChange: e => {
                $e(e.target.files);
                e.target.value = "";
              }
            }), o.jsx("svg", {
              width: "14",
              height: "14",
              viewBox: "0 0 14 14",
              fill: "none",
              "aria-hidden": "true",
              children: o.jsx("path", {
                d: "M7 1.5V12.5M1.5 7H12.5",
                stroke: "currentColor",
                strokeWidth: "1.5",
                strokeLinecap: "round"
              })
            })]
          }), o.jsx("input", {
            type: "text",
            className: "project-stage-assistant-input",
            placeholder: w("projectStage.assistantPlaceholder"),
            value: se,
            onChange: e => ae(e.target.value),
            disabled: ce
          }), o.jsx("button", {
            type: "submit",
            className: "project-stage-submit-btn" + (!se.trim() && re.length === 0 || ce ? " project-stage-submit-btn--disabled" : ""),
            disabled: !se.trim() && re.length === 0 || ce,
            "aria-label": "Send",
            children: ce ? o.jsx("div", {
              className: "project-stage-submit-spinner"
            }) : o.jsx("svg", {
              width: "14",
              height: "14",
              viewBox: "0 0 14 15",
              fill: "none",
              "aria-hidden": "true",
              children: o.jsx("path", {
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
    }), we && o.jsx("div", {
      className: "project-stage-confirm-overlay",
      onClick: () => ye(false),
      children: o.jsxs("div", {
        className: "project-stage-confirm-modal",
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": "project-stage-confirm-title",
        onClick: e => e.stopPropagation(),
        children: [o.jsxs("div", {
          className: "project-stage-confirm-header",
          children: [o.jsx("span", {
            className: "project-stage-confirm-icon",
            "aria-hidden": "true",
            children: o.jsxs("svg", {
              width: "15",
              height: "15",
              viewBox: "0 0 18 18",
              fill: "none",
              children: [o.jsx("path", {
                d: "M9 5V9.5M9 12.5H9.01",
                stroke: "currentColor",
                strokeWidth: "1.6",
                strokeLinecap: "round"
              }), o.jsx("circle", {
                cx: "9",
                cy: "9",
                r: "6.5",
                stroke: "currentColor",
                strokeWidth: "1.4"
              })]
            })
          }), o.jsx("h2", {
            id: "project-stage-confirm-title",
            className: "project-stage-confirm-title",
            children: w("projectStage.skipConfirmTitle")
          })]
        }), o.jsx("p", {
          className: "project-stage-confirm-copy",
          children: w("projectStage.skipConfirmBody")
        }), o.jsxs("div", {
          className: "project-stage-confirm-tips",
          children: [o.jsxs("div", {
            className: "project-stage-confirm-tips-head",
            children: [o.jsxs("svg", {
              width: "13",
              height: "13",
              viewBox: "0 0 18 18",
              fill: "none",
              "aria-hidden": "true",
              children: [o.jsx("path", {
                d: "M9 2.5C6.55 2.5 4.55 4.38 4.55 6.75c0 1.42.7 2.47 1.55 3.28.55.52.9 1.15.9 1.92h4c0-.77.35-1.4.9-1.92.85-.81 1.55-1.86 1.55-3.28C13.45 4.38 11.45 2.5 9 2.5z",
                stroke: "currentColor",
                strokeWidth: "1.35",
                strokeLinejoin: "round"
              }), o.jsx("path", {
                d: "M7.35 14H10.65M7.9 15.7H10.1",
                stroke: "currentColor",
                strokeWidth: "1.35",
                strokeLinecap: "round"
              })]
            }), o.jsx("span", {
              children: w("projectStage.tips")
            })]
          }), o.jsx("p", {
            className: "project-stage-confirm-hint",
            children: w("projectStage.skipConfirmTip")
          })]
        }), o.jsxs("div", {
          className: "project-stage-confirm-actions",
          children: [o.jsx("button", {
            type: "button",
            className: "project-stage-confirm-btn project-stage-confirm-btn--secondary",
            onClick: () => ye(false),
            children: w("projectStage.stayHere")
          }), o.jsx("button", {
            type: "button",
            className: "project-stage-confirm-btn project-stage-confirm-btn--primary",
            onClick: () => {
              const e = new Audio("/sounds/button-click.mp3");
              e.volume = 0.6;
              e.play().catch(() => {});
              Xe();
            },
            children: w("projectStage.continue")
          })]
        })]
      })
    }), o.jsx(p, {
      open: D,
      onClose: () => F(false),
      voiceId: O.voiceId,
      speed: O.speed,
      onChange: e => {
        A(e);
        j(e);
      }
    })]
  });
};
export { k as default };