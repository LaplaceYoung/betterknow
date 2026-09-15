import { u as e, b as s, r as t, j as n, w as r, D as o, I as i, x as a, y as l, z as c } from "./index-TjoB2Buo.js";
import { C as d } from "./checkbox-DxW-3BRQ.js";
import "./utils-Bmk8urhx.js";
import "./index-CMJxjNZ8.js";
import "./check-BBSENZCf.js";
import "./createLucideIcon-B4HcG4gb.js";
function u(e, s) {
  const t = new Date(e);
  const n = new Date().getTime() - t.getTime();
  const r = Math.floor(n / 86400000);
  if (r === 0) {
    return s("studyHistory.relativeToday");
  } else if (r === 1) {
    return s("studyHistory.relativeYesterday");
  } else if (r < 7) {
    return s("studyHistory.relativeDaysAgo", {
      count: r
    });
  } else if (r < 30) {
    return s("studyHistory.relativeWeeksAgo", {
      count: Math.floor(r / 7)
    });
  } else if (r < 365) {
    return s("studyHistory.relativeMonthsAgo", {
      count: Math.floor(r / 30)
    });
  } else {
    return s("studyHistory.relativeYearsAgo", {
      count: Math.floor(r / 365)
    });
  }
}
const h = ["groupToday", "groupThisWeek", "groupThisMonth", "groupEarlier"];
function m(e) {
  return h.map(s => ({
    key: s,
    rows: e.filter(e => function (e) {
      if (!e) {
        return "groupEarlier";
      }
      const s = Math.floor((Date.now() - new Date(e).getTime()) / 86400000);
      if (s <= 0) {
        return "groupToday";
      } else if (s < 7) {
        return "groupThisWeek";
      } else if (s < 30) {
        return "groupThisMonth";
      } else {
        return "groupEarlier";
      }
    }(e.date) === s)
  })).filter(e => e.rows.length > 0);
}
const v = ({
  conversationHistory: h,
  deepLearnSessionHistory: v,
  isLoadingHistory: p,
  hasMoreHistory: x,
  isLoadingMoreHistory: g,
  onLoadMore: y,
  onConversationRenamed: f,
  onSessionRenamed: j
}) => {
  var w;
  const k = e();
  const {
    t: b
  } = s();
  const [N, C] = t.useState("conversations");
  const [_, S] = t.useState("");
  const [H, L] = t.useState(false);
  const [E, M] = t.useState(false);
  const [T, A] = t.useState(false);
  const P = t.useRef(null);
  const B = t.useRef(null);
  const [F, R] = t.useState({});
  const [D, W] = t.useState(new Set());
  const [$, z] = t.useState(new Set());
  const [I, O] = t.useState(false);
  const [Y, K] = t.useState(false);
  const Q = (e, s) => {
    s.stopPropagation();
    z(s => {
      const t = new Set(s);
      if (t.has(e)) {
        t.delete(e);
      } else {
        t.add(e);
      }
      return t;
    });
  };
  const q = () => z(new Set());
  const [G, J] = t.useState(null);
  const [U, V] = t.useState(null);
  const [X, Z] = t.useState(null);
  const [ee, se] = t.useState("below");
  const [te, ne] = t.useState(null);
  const re = t.useRef(null);
  const [oe, ie] = t.useState(null);
  const [ae, le] = t.useState("");
  const ce = t.useRef(null);
  const de = t.useRef("");
  const [ue, he] = t.useState(false);
  const me = t.useRef(false);
  const ve = t.useRef(null);
  const pe = t.useRef(null);
  t.useEffect(() => {
    const e = e => {
      if (P.current && !P.current.contains(e.target)) {
        M(false);
      }
    };
    document.addEventListener("mousedown", e);
    return () => document.removeEventListener("mousedown", e);
  }, []);
  t.useEffect(() => {
    var e;
    if (!G) {
      return;
    }
    const s = e => {
      if (re.current && !re.current.contains(e.target)) {
        Se();
      }
    };
    const t = () => Se();
    document.addEventListener("mousedown", s);
    if ((e = B.current) != null) {
      e.addEventListener("scroll", t, {
        passive: true
      });
    }
    return () => {
      var e;
      document.removeEventListener("mousedown", s);
      if ((e = B.current) != null) {
        e.removeEventListener("scroll", t);
      }
    };
  }, [G]);
  const xe = () => {
    if (pe.current !== null) {
      window.clearTimeout(pe.current);
      pe.current = null;
    }
  };
  t.useEffect(() => {
    ce.current = oe;
  }, [oe]);
  const ge = () => {
    xe();
    ce.current = null;
    ie(null);
    le("");
    de.current = "";
  };
  t.useEffect(() => {
    var e;
    var s;
    if (oe) {
      if ((e = ve.current) != null) {
        e.focus();
      }
      if ((s = ve.current) != null) {
        s.select();
      }
    }
  }, [oe]);
  t.useEffect(() => () => xe(), []);
  t.useEffect(() => {
    xe();
    ce.current = null;
    ie(null);
    le("");
    de.current = "";
  }, [N]);
  const ye = e => {
    de.current = e;
    le(e);
  };
  const fe = async e => {
    xe();
    const s = de.current.trim();
    if (!s) {
      alert(b("studyHistory.titleEmpty"));
      ge();
      return;
    }
    if (s !== e.previousTitle) {
      me.current = true;
      he(true);
      try {
        if (e.kind === "conversation") {
          const t = await a({
            conversation_id: e.id,
            title: s
          });
          if (t.success) {
            if (f != null) {
              f(e.id, s);
            }
            ge();
          } else {
            const e = t;
            alert(b("studyHistory.renameConversationFailed", {
              error: e.message || e.error || b("common.unknownError")
            }));
          }
        } else {
          const t = await l({
            deep_learn_session_id: e.id,
            title: s
          });
          if (t.success) {
            if (j != null) {
              j(e.id, s);
            }
            ge();
          } else {
            const e = t;
            alert(b("studyHistory.renameSessionFailed", {
              error: e.message || e.error || b("common.unknownError")
            }));
          }
        }
      } catch (t) {
        alert(e.kind === "conversation" ? b("studyHistory.renameConversationError") : b("studyHistory.renameSessionError"));
      } finally {
        me.current = false;
        he(false);
      }
    } else {
      ge();
    }
  };
  const je = () => {
    xe();
    pe.current = window.setTimeout(() => {
      pe.current = null;
      if (me.current) {
        return;
      }
      const e = ce.current;
      if (e) {
        fe(e);
      }
    }, 180);
  };
  const we = e => {
    const s = ce.current;
    if (s) {
      if (e.key === "Escape") {
        e.preventDefault();
        xe();
        ge();
        return;
      } else {
        if (e.key === "Enter" && !c(e)) {
          e.preventDefault();
          xe();
          fe(s);
        }
        return;
      }
    }
  };
  const ke = (e, s) => e in F ? F[e] : s;
  const be = t.useMemo(() => h.filter(e => {
    if (D.has(e.conversation_id)) {
      return false;
    }
    const s = ke(e.conversation_id, e.starred);
    return (!H || !!s) && (!_.trim() || (e.title || "").toLowerCase().includes(_.toLowerCase()));
  }), [h, _, H, F, D]);
  const Ne = t.useMemo(() => v.filter(e => {
    if (D.has(e.deep_learn_session_id)) {
      return false;
    }
    const s = ke(e.deep_learn_session_id, e.starred ?? false);
    return (!H || !!s) && (!_.trim() || (e.title || "").toLowerCase().includes(_.toLowerCase()));
  }), [v, _, H, F, D]);
  const Ce = e => {
    var s;
    C(e);
    S("");
    if ((s = B.current) != null) {
      s.scrollTo({
        top: 0
      });
    }
    A(false);
  };
  const _e = t.useCallback(() => {
    const e = B.current;
    if (e) {
      A(e.scrollTop > 2);
      if (N === "conversations" && x && !g && e.scrollHeight - e.scrollTop - e.clientHeight < 80) {
        y();
      }
    }
  }, [N, x, g, y]);
  t.useEffect(() => {
    const e = B.current;
    if (e) {
      e.addEventListener("scroll", _e, {
        passive: true
      });
      return () => e.removeEventListener("scroll", _e);
    }
  }, [_e]);
  const Se = () => {
    J(null);
    V(null);
    ne(null);
  };
  const He = b(N === "conversations" ? "studyHistory.searchConversations" : "studyHistory.searchSessions");
  const Le = (N === "conversations" ? be : Ne).length === 0;
  const Ee = H;
  const Me = (e, s, t, r, o, a = false) => {
    const l = ke(e, t);
    const c = $.has(e);
    const h = {
      kind: o,
      id: e,
      title: s,
      starred: l
    };
    const m = oe !== null && oe.kind === o && oe.id === e;
    return n.jsxs("li", {
      className: `sh-row${c ? " sh-row--checked" : ""}${te === e ? " sh-row--menu-open" : ""}`,
      onClick: () => {
        if (!m) {
          if ($.size > 0) {
            z(s => {
              const t = new Set(s);
              if (t.has(e)) {
                t.delete(e);
              } else {
                t.add(e);
              }
              return t;
            });
          } else {
            k(o === "conversation" ? `/response/${e}` : `/deep-learn-session/${e}`);
          }
        }
      },
      children: [n.jsx("div", {
        className: "sh-row-icon" + (l && !c ? " sh-row-icon--star" : ""),
        children: l && !c ? n.jsxs(n.Fragment, {
          children: [n.jsx("img", {
            src: "/components/sidebar/star-filled.svg",
            alt: "Starred",
            className: "sh-row-star-icon",
            onClick: e => e.stopPropagation()
          }), n.jsx(d, {
            checked: false,
            onCheckedChange: () => {},
            onClick: s => Q(e, s),
            className: "sh-row-check-icon"
          })]
        }) : n.jsx(d, {
          checked: c,
          onCheckedChange: () => {},
          onClick: s => Q(e, s),
          className: "sh-row-check-icon" + (c ? " sh-row-check-icon--visible" : "")
        })
      }), m ? n.jsx("input", {
        ref: ve,
        className: "sh-row-title-input",
        value: ae,
        disabled: ue,
        onChange: e => ye(e.target.value),
        onClick: e => e.stopPropagation(),
        onMouseDown: e => e.stopPropagation(),
        onKeyDown: we,
        onBlur: je,
        "aria-label": o === "conversation" ? "Conversation title" : "Session title"
      }) : n.jsx("span", {
        className: "sh-row-title",
        children: s ? n.jsx(i, {
          content: s
        }) : b("studyHistory.untitled")
      }), a && !m && n.jsx("span", {
        className: "sh-row-board-badge-wrap",
        onMouseEnter: e => {
          const s = e.currentTarget.getBoundingClientRect();
          Z({
            top: s.top - 8,
            left: s.right + 4
          });
        },
        onMouseLeave: () => Z(null),
        children: n.jsx("img", {
          src: "/components/sidebar/activity-board-session.svg",
          alt: "",
          className: "sh-row-board-badge"
        })
      }), n.jsx("span", {
        className: "sh-row-date",
        children: r ? u(r, b) : "—"
      }), n.jsx("div", {
        className: "sh-row-actions",
        onClick: e => e.stopPropagation(),
        children: n.jsx("button", {
          className: "sh-row-menu-btn",
          onClick: e => ((e, s) => {
            e.stopPropagation();
            const t = e.currentTarget.getBoundingClientRect();
            const n = window.innerHeight - t.bottom < 168;
            const r = n ? t.top - 168 - 4 : t.bottom + 4;
            const o = Math.min(t.left, window.innerWidth - 172 - 8);
            J(s);
            V({
              top: r,
              left: o
            });
            se(n ? "above" : "below");
            ne(s.id);
          })(e, h),
          "aria-label": "More options",
          children: n.jsxs("svg", {
            width: "16",
            height: "16",
            viewBox: "0 0 20 20",
            fill: "none",
            children: [n.jsx("circle", {
              cx: "10",
              cy: "5",
              r: "1.5",
              fill: "#9CA3AF"
            }), n.jsx("circle", {
              cx: "10",
              cy: "10",
              r: "1.5",
              fill: "#9CA3AF"
            }), n.jsx("circle", {
              cx: "10",
              cy: "15",
              r: "1.5",
              fill: "#9CA3AF"
            })]
          })
        })
      })]
    }, e);
  };
  const Te = m(N === "conversations" ? be.map(e => {
    var s;
    return {
      date: e.last_updated_at,
      node: Me(e.conversation_id, e.title, e.starred, e.last_updated_at, "conversation", (((s = e.board_session_types) == null ? undefined : s.length) ?? 0) > 0)
    };
  }) : Ne.map(e => ({
    date: e.last_modified_at,
    node: Me(e.deep_learn_session_id, e.title, e.starred ?? false, e.last_modified_at, "session")
  })));
  return n.jsxs("div", {
    className: "sh-page",
    children: [n.jsxs("div", {
      className: "sh-inner",
      children: [n.jsxs("div", {
        className: "sh-header",
        children: [n.jsx("h1", {
          className: "sh-title",
          children: b("studyHistory.title")
        }), $.size > 0 ? n.jsxs("div", {
          className: "sh-selection-actions",
          children: [n.jsxs("button", {
            className: "sh-selection-delete-btn",
            onClick: () => {
              O(true);
            },
            children: [n.jsx("img", {
              src: "/pages/mainPages/drive/trash.svg",
              alt: "",
              width: 14,
              height: 14
            }), b("common.delete")]
          }), n.jsx("button", {
            className: "sh-selection-cancel-btn",
            onClick: q,
            children: b("common.cancel")
          })]
        }) : n.jsxs("div", {
          className: "sh-header-right",
          children: [n.jsxs("div", {
            className: "sh-search-wrap",
            children: [n.jsxs("svg", {
              className: "sh-search-icon",
              width: "14",
              height: "14",
              viewBox: "0 0 16 16",
              fill: "none",
              children: [n.jsx("circle", {
                cx: "7",
                cy: "7",
                r: "5.5",
                stroke: "#9CA3AF",
                strokeWidth: "1.5"
              }), n.jsx("path", {
                d: "M11 11L14.5 14.5",
                stroke: "#9CA3AF",
                strokeWidth: "1.5",
                strokeLinecap: "round"
              })]
            }), n.jsx("input", {
              className: "sh-search",
              type: "text",
              placeholder: He,
              value: _,
              onChange: e => S(e.target.value)
            }), _ && n.jsx("button", {
              className: "sh-search-clear",
              onClick: () => S(""),
              "aria-label": "Clear search",
              children: n.jsx("svg", {
                width: "11",
                height: "11",
                viewBox: "0 0 12 12",
                fill: "none",
                children: n.jsx("path", {
                  d: "M2 2L10 10M10 2L2 10",
                  stroke: "#9CA3AF",
                  strokeWidth: "1.5",
                  strokeLinecap: "round"
                })
              })
            })]
          }), n.jsxs("button", {
            className: "sh-new-conversation-btn",
            onClick: () => k("/"),
            children: [n.jsx("svg", {
              width: "11",
              height: "11",
              viewBox: "0 0 14 14",
              fill: "none",
              children: n.jsx("path", {
                d: "M7 1v12M1 7h12",
                stroke: "currentColor",
                strokeWidth: "1.6",
                strokeLinecap: "round"
              })
            }), b("studyHistory.newConversationButton")]
          })]
        })]
      }), n.jsxs("div", {
        className: "sh-toolbar",
        children: [n.jsxs("div", {
          className: "sh-tabs",
          role: "tablist",
          "aria-label": b("studyHistory.tabListLabel"),
          children: [n.jsx("button", {
            className: "sh-tab " + (N === "conversations" ? "active" : ""),
            role: "tab",
            onClick: () => Ce("conversations"),
            children: b("studyHistory.tabConversations")
          }), n.jsx("button", {
            className: "sh-tab " + (N === "sessions" ? "active" : ""),
            role: "tab",
            onClick: () => Ce("sessions"),
            children: b("studyHistory.tabSessions")
          })]
        }), n.jsxs("div", {
          className: "sh-filter-wrap",
          ref: P,
          children: [n.jsxs("button", {
            className: "sh-filter-btn " + (Ee ? "active" : ""),
            onClick: () => M(e => !e),
            children: [n.jsx("svg", {
              width: "16",
              height: "16",
              viewBox: "0 0 16 16",
              fill: "none",
              children: n.jsx("path", {
                d: "M2 4h12M4 8h8M6 12h4",
                stroke: Ee ? "#374151" : "#6B7280",
                strokeWidth: "1.5",
                strokeLinecap: "round"
              })
            }), Ee && n.jsx("span", {
              className: "sh-filter-badge"
            })]
          }), E && n.jsx("div", {
            className: "sh-filter-dropdown",
            children: n.jsxs("button", {
              className: "sh-filter-option " + (H ? "selected" : ""),
              onClick: () => {
                L(e => !e);
                M(false);
              },
              children: [n.jsx("img", {
                src: H ? "/components/sidebar/star-filled.svg" : "/components/sidebar/star.svg",
                alt: ""
              }), n.jsx("span", {
                children: b("studyHistory.starredOnly")
              }), H && n.jsx("svg", {
                className: "sh-option-check",
                width: "13",
                height: "13",
                viewBox: "0 0 12 12",
                fill: "none",
                children: n.jsx("path", {
                  d: "M2 6L5 9L10 3",
                  stroke: "#1A1A1A",
                  strokeWidth: "1.5",
                  strokeLinecap: "round",
                  strokeLinejoin: "round"
                })
              })]
            })
          })]
        })]
      }), n.jsx("div", {
        className: "sh-scroll" + (T ? " sh-scroll--scrolled" : ""),
        ref: B,
        children: p ? n.jsxs("div", {
          className: "sh-loading-video-wrap",
          children: [n.jsx("video", {
            className: "sh-loading-video",
            src: "/pages/mainPages/courses/climb-stairs.mp4",
            poster: "/pages/mainPages/courses/climb-stairs.webp",
            autoPlay: true,
            loop: true,
            muted: true,
            playsInline: true
          }), n.jsx("p", {
            className: "sh-loading-text",
            children: b("studyHistory.loading")
          })]
        }) : Le ? n.jsx("div", {
          className: "sh-empty",
          children: b(N === "conversations" ? "studyHistory.emptyConversations" : "studyHistory.emptySessions")
        }) : n.jsxs(n.Fragment, {
          children: [Te.map(e => n.jsxs("section", {
            className: "sh-group",
            children: [n.jsx("h2", {
              className: "sh-group-label",
              children: b(`studyHistory.${e.key}`)
            }), n.jsx("ul", {
              className: "sh-list",
              children: e.rows.map(e => e.node)
            })]
          }, e.key)), N === "conversations" && g && (Ae = 3, Pe = "skeleton-more", n.jsx("div", {
            className: "sh-skeleton-list",
            children: [...Array(Ae)].map((e, s) => n.jsxs("div", {
              className: "sh-skeleton-row",
              children: [n.jsx("div", {
                className: "sh-skeleton sh-skeleton-icon"
              }), n.jsx("div", {
                className: "sh-skeleton sh-skeleton-title",
                style: {
                  width: 38 + s * 11 % 25 + "%"
                }
              }), n.jsx("div", {
                className: "sh-skeleton sh-skeleton-date"
              })]
            }, `${Pe}-${s}`))
          }))]
        })
      })]
    }), X && r.createPortal(n.jsx("div", {
      className: "sh-row-board-tooltip",
      style: {
        top: X.top,
        left: X.left
      },
      role: "tooltip",
      children: b("sidebar.containsBoardSession")
    }), document.body), G && U && r.createPortal(n.jsxs("div", {
      ref: re,
      className: "sh-context-menu " + (ee === "above" ? "sh-context-menu--above" : ""),
      style: {
        top: U.top,
        left: U.left
      },
      role: "menu",
      children: [n.jsxs("div", {
        className: "sh-context-item",
        role: "menuitem",
        onClick: async () => {
          if (!G) {
            return;
          }
          const e = !ke(G.id, G.starred);
          R(s => ({
            ...s,
            [G.id]: e
          }));
          Se();
          try {
            if (G.kind === "conversation") {
              await a({
                conversation_id: G.id,
                starred: e
              });
            } else {
              await l({
                deep_learn_session_id: G.id,
                starred: e
              });
            }
          } catch {
            R(s => ({
              ...s,
              [G.id]: !e
            }));
          }
        },
        children: [n.jsx("img", {
          src: ke(G.id, G.starred) ? "/components/sidebar/star-filled.svg" : "/components/sidebar/star.svg",
          alt: "",
          className: "sh-context-icon"
        }), n.jsx("span", {
          className: "sh-context-text",
          children: ke(G.id, G.starred) ? b("sidebar.unstar") : b("sidebar.star")
        })]
      }), n.jsxs("div", {
        className: "sh-context-item",
        role: "menuitem",
        onClick: () => {
          if (!G) {
            return;
          }
          const e = {
            kind: G.kind,
            id: G.id,
            previousTitle: G.title
          };
          ce.current = e;
          ie(e);
          ye(G.title);
          Se();
        },
        children: [n.jsx("img", {
          src: "/pages/mainPages/home/recommendation_icons/edit.svg",
          alt: "",
          className: "sh-context-icon"
        }), n.jsx("span", {
          className: "sh-context-text",
          children: b("studyHistory.rename")
        })]
      }), n.jsx("div", {
        className: "sh-context-divider"
      }), n.jsxs("div", {
        className: "sh-context-item sh-context-item--delete",
        role: "menuitem",
        onClick: async () => {
          if (G) {
            W(e => new Set(e).add(G.id));
            Se();
            try {
              if (G.kind === "conversation") {
                await a({
                  conversation_id: G.id,
                  delete: true
                });
              } else {
                await l({
                  deep_learn_session_id: G.id,
                  delete: true
                });
              }
            } catch {
              W(e => {
                const s = new Set(e);
                s.delete(G.id);
                return s;
              });
            }
          }
        },
        children: [n.jsx("img", {
          src: "/pages/mainPages/drive/trash.svg",
          alt: "",
          className: "sh-context-icon sh-context-icon--delete"
        }), n.jsx("span", {
          className: "sh-context-text--delete",
          children: b("common.delete")
        })]
      })]
    }), document.body), n.jsx(o, {
      isOpen: I,
      onClose: () => {
        if (!Y) {
          O(false);
        }
      },
      onConfirm: async () => {
        const e = Array.from($);
        K(true);
        W(s => {
          const t = new Set(s);
          e.forEach(e => t.add(e));
          return t;
        });
        const s = [...be.map(e => ({
          id: e.conversation_id,
          kind: "conversation"
        })), ...Ne.map(e => ({
          id: e.deep_learn_session_id,
          kind: "session"
        }))];
        await Promise.allSettled(e.map(e => {
          const t = s.find(s => s.id === e);
          if (t) {
            if (t.kind === "conversation") {
              return a({
                conversation_id: e,
                delete: true
              });
            } else {
              return l({
                deep_learn_session_id: e,
                delete: true
              });
            }
          } else {
            return Promise.resolve();
          }
        }));
        K(false);
        O(false);
        q();
      },
      isDeleting: Y,
      title: b(N === "conversations" ? "sidebar.deleteChatTitle" : "sidebar.deleteSessionTitle"),
      message: $.size === 1 ? n.jsxs(n.Fragment, {
        children: [b(N === "conversations" ? "sidebar.deleteChatConfirmation" : "sidebar.deleteSessionConfirmation"), " ", n.jsxs("strong", {
          children: ["\"", ((w = [...be, ...Ne].find(e => ("conversation_id" in e ? e.conversation_id : e.deep_learn_session_id) === Array.from($)[0])) == null ? undefined : w.title) || b("studyHistory.thisItem"), "\""]
        }), "?"]
      }) : n.jsxs(n.Fragment, {
        children: [b(N === "conversations" ? "sidebar.deleteChatConfirmation" : "sidebar.deleteSessionConfirmation"), " ", n.jsxs("strong", {
          children: [$.size, " ", b(N === "conversations" ? "studyHistory.itemTypeConversations" : "studyHistory.itemTypeSessions")]
        }), "?"]
      })
    })]
  });
  var Ae;
  var Pe;
};
export { v as default };