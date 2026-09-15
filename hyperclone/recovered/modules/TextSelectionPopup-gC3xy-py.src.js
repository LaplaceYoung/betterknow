import { b as e, r as t, j as n, g as s, c as r, w as o, M as a, B as i, C as l, z as c } from "./index-TjoB2Buo.js";
import { a as d, t as u } from "./addErrorLog-Dxv53mIo.js";
import { a as p } from "./github-BU76ptNE.js";
import { r as h } from "./index-qYFgNVxk.js";
const m = ({
  isLoading: s = true,
  lastMessageTime: r,
  ws: o,
  conversationId: a,
  conversationType: i,
  getConversationSnapshot: l
}) => {
  const {
    t: c
  } = e();
  const [p, h] = t.useState("idle");
  const m = t.useRef(null);
  const g = t.useRef(null);
  const f = t.useRef(null);
  const x = t.useRef(0);
  const v = t.useRef(false);
  const w = t.useRef(a);
  const y = t.useRef(i);
  const k = t.useRef(l);
  t.useEffect(() => {
    w.current = a;
  }, [a]);
  t.useEffect(() => {
    y.current = i;
  }, [i]);
  t.useEffect(() => {
    k.current = l;
  }, [l]);
  const b = t.useCallback(() => {
    if (m.current) {
      clearTimeout(m.current);
      m.current = null;
    }
    if (g.current) {
      clearTimeout(g.current);
      g.current = null;
    }
  }, []);
  const j = t.useCallback(async () => {
    const e = w.current;
    const t = y.current;
    if (!e || !t || v.current) {
      return;
    }
    v.current = true;
    let n = null;
    try {
      const e = await fetch("https://www.cloudflare.com/cdn-cgi/trace", {
        mode: "cors",
        cache: "no-store"
      });
      n = await e.text();
    } catch {}
    d({
      conversation_id: e,
      conversation_type: t,
      error_type: "internet_connection_timeout",
      error_data: {
        cloudflare_trace: n,
        ws_ready_state: (o == null ? undefined : o.readyState) ?? null,
        navigator_online: typeof navigator != "undefined" ? navigator.onLine : null,
        timestamp: Date.now()
      }
    });
  }, [o]);
  const N = t.useCallback(e => {
    var t;
    const n = w.current;
    const s = y.current;
    if (!n || !s || v.current) {
      return;
    }
    v.current = true;
    let r = null;
    try {
      r = ((t = k.current) == null ? undefined : t.call(k)) ?? null;
    } catch {
      r = null;
    }
    d({
      conversation_id: n,
      conversation_type: s,
      error_type: "model_slow_response",
      conversation_data: u(r, "history"),
      error_data: {
        rtt_ms: e,
        timestamp: Date.now()
      }
    });
  }, []);
  const E = t.useCallback(() => {
    if (!o || o.readyState !== WebSocket.OPEN) {
      h("network_issue");
      j();
      return;
    }
    const e = `ping_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
    f.current = e;
    o.send(JSON.stringify({
      type: "ping",
      id: e,
      ts: Date.now()
    }));
    h("checking");
    g.current = setTimeout(() => {
      f.current = null;
      h("network_issue");
      j();
    }, 3000);
  }, [o, j]);
  t.useEffect(() => {
    if (!o) {
      return;
    }
    const e = e => {
      try {
        const t = JSON.parse(e.data);
        if (t.type === "pong" && t.id && t.id === f.current) {
          const e = Date.now() - t.ts;
          f.current = null;
          if (g.current) {
            clearTimeout(g.current);
            g.current = null;
          }
          h("model_slow");
          N(e);
        }
      } catch {}
    };
    o.addEventListener("message", e);
    return () => o.removeEventListener("message", e);
  }, [o, N]);
  t.useEffect(() => {
    if (!s || !r) {
      h("idle");
      b();
      v.current = false;
      return;
    }
    if (r > x.current) {
      x.current = r;
      h("idle");
      b();
      f.current = null;
      v.current = false;
      m.current = setTimeout(E, 15000);
    }
  }, [s, r, b, E]);
  t.useEffect(() => () => b(), [b]);
  return n.jsxs("div", {
    className: "conversation-loading-container",
    children: [n.jsx("video", {
      className: "conversation-loading-video",
      poster: "/pages/chatResponsePage/orbie-loading.webp",
      autoPlay: true,
      loop: true,
      muted: true,
      playsInline: true,
      children: n.jsx("source", {
        src: "/pages/chatResponsePage/orbie-loading.mp4",
        type: "video/mp4"
      })
    }), p === "checking" && n.jsxs("div", {
      className: "loading-diagnostic loading-diagnostic--checking",
      children: [n.jsx("span", {
        className: "loading-diagnostic-text",
        children: c("deepLearnSessionPage.loadingDiagnostic.checkingTitle")
      }), n.jsx("span", {
        className: "loading-diagnostic-hint",
        children: c("deepLearnSessionPage.loadingDiagnostic.checkingHint")
      })]
    }), p === "model_slow" && n.jsxs("div", {
      className: "loading-diagnostic loading-diagnostic--slow",
      children: [n.jsx("span", {
        className: "loading-diagnostic-text",
        children: c("deepLearnSessionPage.loadingDiagnostic.modelSlowTitle")
      }), n.jsx("span", {
        className: "loading-diagnostic-hint",
        children: c("deepLearnSessionPage.loadingDiagnostic.modelSlowHint")
      })]
    }), p === "network_issue" && n.jsxs("div", {
      className: "loading-diagnostic loading-diagnostic--network",
      children: [n.jsx("span", {
        className: "loading-diagnostic-text",
        children: c("deepLearnSessionPage.loadingDiagnostic.networkErrorTitle")
      }), n.jsx("span", {
        className: "loading-diagnostic-hint",
        children: c("deepLearnSessionPage.loadingDiagnostic.networkErrorHint")
      })]
    })]
  });
};
const g = e => `${e}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
const f = e => e.filter(e => e.content.trim().length > 0).slice(-10).map(({
  role: e,
  content: t
}) => ({
  role: e,
  content: t
}));
function x(e, t) {
  const n = e.startContainer;
  let s = n.nodeType === Node.TEXT_NODE ? n.parentElement : n;
  while (s && s.tagName && /^(SPAN|A|STRONG|EM|B|I|CODE)$/i.test(s.tagName)) {
    s = s.parentElement;
  }
  const r = ((s == null ? undefined : s.textContent) ?? t).trim();
  return (r.length > 800 ? r.slice(0, 800) + "…" : r).replace(new RegExp(t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")), `<keyword>${t}</keyword>`);
}
const v = ({
  containerRef: d
}) => {
  const {
    t: u
  } = e();
  const [m, v] = t.useState(null);
  const [j, N] = t.useState("toolbar");
  const [E, S] = t.useState("");
  const [L, R] = t.useState([]);
  const [C, _] = t.useState("");
  const D = t.useRef(null);
  const T = t.useRef(null);
  const P = t.useRef(null);
  const O = t.useRef(null);
  const $ = t.useRef(null);
  const M = t.useCallback(() => {
    var e;
    if ((e = O.current) != null) {
      e.call(O);
    }
    $.current = null;
    v(null);
    N("toolbar");
    S("");
    R([]);
    _("");
  }, []);
  t.useEffect(() => {
    const e = e => {
      var t;
      var n;
      if ((t = D.current) == null ? undefined : t.contains(e.target)) {
        return;
      }
      const s = window.getSelection();
      if (!s || s.isCollapsed) {
        if (j === "toolbar") {
          v(null);
        }
        return;
      }
      const r = s.toString().trim();
      if (!r) {
        if (j === "toolbar") {
          v(null);
        }
        return;
      }
      if (!d.current) {
        return;
      }
      const o = s.getRangeAt(0);
      if (d.current.contains(o.commonAncestorContainer)) {
        if ((n = O.current) != null) {
          n.call(O);
        }
        $.current = o.cloneRange();
        v({
          keyword: r,
          keywordContext: x(o, r),
          rect: o.getBoundingClientRect()
        });
        N("toolbar");
        S("");
        R([]);
        _("");
      } else if (j === "toolbar") {
        v(null);
      }
    };
    document.addEventListener("mouseup", e);
    return () => document.removeEventListener("mouseup", e);
  }, [d, j]);
  t.useEffect(() => {
    if (!m) {
      return;
    }
    const e = d.current;
    if (!e) {
      return;
    }
    const t = () => {
      if (!$.current) {
        return;
      }
      const e = $.current.getBoundingClientRect();
      v(t => t ? {
        ...t,
        rect: e
      } : t);
    };
    e.addEventListener("scroll", t, {
      passive: true
    });
    return () => e.removeEventListener("scroll", t);
  }, [m, d]);
  t.useEffect(() => {
    const e = e => {
      var t;
      if (!((t = D.current) == null ? undefined : t.contains(e.target))) {
        const e = window.getSelection();
        if (e && !e.isCollapsed) {
          return;
        }
        M();
      }
    };
    document.addEventListener("pointerdown", e);
    return () => document.removeEventListener("pointerdown", e);
  }, [M]);
  t.useEffect(() => {
    const e = e => {
      if (e.key === "Escape") {
        M();
      }
    };
    document.addEventListener("keydown", e);
    return () => document.removeEventListener("keydown", e);
  }, [M]);
  t.useEffect(() => {
    if (j === "input" || j === "done" || j === "error") {
      setTimeout(() => {
        var e;
        if ((e = T.current) == null) {
          return undefined;
        } else {
          return e.focus();
        }
      }, 60);
    }
  }, [j]);
  t.useEffect(() => {
    var e;
    if ((e = P.current) != null) {
      e.scrollIntoView({
        block: "nearest",
        behavior: "smooth"
      });
    }
  }, [L]);
  const A = t.useCallback(() => {
    var e;
    if (!m) {
      return;
    }
    if ((e = O.current) != null) {
      e.call(O);
    }
    const t = E.trim();
    if (L.length > 0 && !t) {
      return;
    }
    const n = g("assistant");
    const o = [...L, ...(t ? [{
      id: g("user"),
      role: "user",
      content: t
    }] : []), {
      id: n,
      role: "assistant",
      content: ""
    }];
    R(o);
    _("");
    N("streaming");
    S("");
    O.current = function (e, t, n, o) {
      const a = new AbortController();
      (async () => {
        try {
          const o = s();
          if (!o) {
            throw new Error("Not authenticated");
          }
          const i = await fetch(r("/api/v1/chatResponseFollowup/stream"), {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${o}`
            },
            body: JSON.stringify(e),
            signal: a.signal
          });
          if (!i.ok) {
            throw new Error(`Server error ${i.status}`);
          }
          if (!i.body) {
            throw new Error("Empty response body");
          }
          const l = i.body.getReader();
          const c = new TextDecoder();
          let d = "";
          while (true) {
            const {
              done: e,
              value: s
            } = await l.read();
            if (e) {
              break;
            }
            d += c.decode(s, {
              stream: true
            });
            const r = d.split("\n\n");
            d = r.pop() ?? "";
            for (const o of r) {
              let e = "";
              let s = "";
              for (const t of o.split("\n")) {
                if (t.startsWith("event: ")) {
                  e = t.slice(7).trim();
                } else if (t.startsWith("data: ")) {
                  s = t.slice(6).trim();
                }
              }
              if (s) {
                try {
                  const r = JSON.parse(s);
                  if (e === "chunk" && typeof r.chunk == "string") {
                    t(r.chunk);
                  } else if (e === "done") {
                    n();
                    return;
                  }
                } catch {}
              }
            }
          }
          n();
        } catch (i) {
          if (i instanceof Error && i.name !== "AbortError") {
            o(i);
          }
        }
      })();
      return () => a.abort();
    }({
      keyword: m.keyword,
      comment: t,
      keyword_context: m.keywordContext,
      history: f(L)
    }, e => {
      R(t => t.map(t => t.id === n ? {
        ...t,
        content: t.content + e
      } : t));
    }, () => N("done"), e => {
      _(e.message);
      N("error");
    });
  }, [m, E, L]);
  const B = () => {
    if (j === "input" || j === "done" || j === "error") {
      A();
    }
  };
  t.useEffect(() => {
    if (T.current) {
      T.current.style.height = "auto";
      T.current.style.height = Math.min(T.current.scrollHeight, 120) + "px";
    }
  }, [E]);
  if (!m) {
    return null;
  }
  const W = window.innerWidth;
  const H = window.innerHeight;
  const z = m.rect.left + m.rect.width / 2;
  const I = m.rect.top - 42 < 8 ? m.rect.bottom + 8 : m.rect.top - 42;
  K = z - 180;
  F = 12;
  q = W - 360 - 12;
  const J = Math.min(Math.max(K, F), q);
  var K;
  var F;
  var q;
  const V = H - m.rect.bottom - 16 > 220 ? m.rect.bottom + 10 : Math.max(8, m.rect.top - 260);
  const G = j !== "toolbar";
  const X = j === "streaming" || j === "done" || j === "error" || L.length > 0;
  return o.createPortal(n.jsxs("div", {
    ref: D,
    children: [j === "toolbar" && n.jsx("div", {
      className: "tsp-toolbar",
      style: {
        top: I,
        left: z
      },
      children: n.jsxs("button", {
        className: "tsp-ask-btn",
        onClick: () => N("input"),
        "aria-label": u("chatResponse.askOrbie.buttonLabel"),
        children: [n.jsx(w, {}), n.jsx("span", {
          children: u("chatResponse.askOrbie.buttonLabel")
        })]
      })
    }), G && n.jsxs("div", {
      className: `tsp-panel tsp-panel--${j} ${X ? "tsp-panel--resizable" : ""}`,
      style: {
        top: V,
        left: J,
        width: 360
      },
      children: [n.jsxs("div", {
        className: "tsp-panel-header",
        children: [n.jsx(y, {}), n.jsxs("span", {
          className: "tsp-selected-excerpt",
          children: ["\"", m.keyword.length > 100 ? m.keyword.slice(0, 100) + "…" : m.keyword, "\""]
        }), n.jsx("button", {
          className: "tsp-close-btn",
          onClick: M,
          "aria-label": u("chatResponse.askOrbie.closeAriaLabel"),
          children: n.jsx(k, {})
        })]
      }), (j === "streaming" || j === "done" || j === "error" || L.length > 0) && n.jsxs("div", {
        className: "tsp-response-body",
        children: [j === "error" ? n.jsxs("p", {
          className: "tsp-error-text",
          children: ["⚠ ", C || u("chatResponse.askOrbie.errorFallback")]
        }) : L.length === 1 && L[0].content === "" && j === "streaming" ? n.jsxs("div", {
          className: "tsp-skeleton",
          children: [n.jsx("span", {
            className: "tsp-skeleton-line",
            style: {
              width: "85%"
            }
          }), n.jsx("span", {
            className: "tsp-skeleton-line",
            style: {
              width: "70%"
            }
          }), n.jsx("span", {
            className: "tsp-skeleton-line",
            style: {
              width: "55%"
            }
          })]
        }) : n.jsx("div", {
          className: "tsp-message-list",
          children: L.map((e, t) => {
            const s = j === "streaming" && e.role === "assistant" && t === L.length - 1;
            if (e.content === "" && s) {
              return n.jsxs("div", {
                className: "tsp-skeleton",
                children: [n.jsx("span", {
                  className: "tsp-skeleton-line",
                  style: {
                    width: "85%"
                  }
                }), n.jsx("span", {
                  className: "tsp-skeleton-line",
                  style: {
                    width: "70%"
                  }
                }), n.jsx("span", {
                  className: "tsp-skeleton-line",
                  style: {
                    width: "55%"
                  }
                })]
              }, e.id);
            } else if (e.content) {
              return n.jsx("div", {
                className: `tsp-message tsp-message--${e.role}`,
                children: n.jsxs("div", {
                  className: "tsp-markdown",
                  children: [n.jsx(a, {
                    remarkPlugins: [h, p, l],
                    rehypePlugins: [i],
                    children: e.content
                  }), s && n.jsx("span", {
                    className: "tsp-cursor",
                    "aria-hidden": true
                  })]
                })
              }, e.id);
            } else {
              return null;
            }
          })
        }), n.jsx("div", {
          ref: P
        })]
      }), n.jsxs("div", {
        className: "tsp-input-row",
        children: [n.jsx("textarea", {
          ref: T,
          className: "tsp-question-input",
          placeholder: u("chatResponse.askOrbie.placeholder"),
          value: E,
          onChange: e => S(e.target.value),
          onKeyDown: e => {
            if (!c(e) && e.key === "Enter") {
              if (e.shiftKey || e.ctrlKey || e.metaKey) {
                return;
              }
              e.preventDefault();
              B();
            }
          },
          disabled: j === "streaming",
          rows: 1
        }), n.jsx("button", {
          className: "tsp-send-btn " + (j === "streaming" ? "disabled" : "enabled"),
          onClick: B,
          disabled: j === "streaming",
          "aria-label": u("chatResponse.askOrbie.sendAriaLabel"),
          children: n.jsx(b, {})
        })]
      })]
    })]
  }), document.body);
};
const w = () => n.jsx("span", {
  className: "tsp-orbie-icon",
  "aria-hidden": true,
  children: n.jsxs("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 16 16",
    fill: "none",
    children: [n.jsx("circle", {
      cx: "8",
      cy: "8",
      r: "8",
      fill: "#D1D1D1"
    }), n.jsx("text", {
      x: "8",
      y: "12",
      textAnchor: "middle",
      fill: "white",
      fontSize: "11",
      fontWeight: "600",
      fontFamily: "system-ui, sans-serif",
      children: "?"
    })]
  })
});
const y = () => n.jsxs("svg", {
  width: "13",
  height: "13",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  children: [n.jsx("polyline", {
    points: "9 10 4 15 9 20"
  }), n.jsx("path", {
    d: "M20 4v7a4 4 0 0 1-4 4H4"
  })]
});
const k = () => n.jsxs("svg", {
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  "aria-hidden": true,
  children: [n.jsx("line", {
    x1: "18",
    y1: "6",
    x2: "6",
    y2: "18"
  }), n.jsx("line", {
    x1: "6",
    y1: "6",
    x2: "18",
    y2: "18"
  })]
});
const b = () => n.jsx("svg", {
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: "none",
  "aria-hidden": true,
  children: n.jsx("path", {
    d: "M12 19V5M5 12L12 5L19 12",
    stroke: "currentColor",
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })
});
export { m as C, v as T };