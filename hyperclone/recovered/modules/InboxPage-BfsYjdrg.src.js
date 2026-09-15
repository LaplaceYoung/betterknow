import { u as e, b as s, r as n, i, j as a } from "./index-TjoB2Buo.js";
import { g as t, m as o, f as l } from "./InboxPage-COF0onVT.js";
const c = () => {
  const c = e();
  const {
    t: r,
    i18n: d
  } = s();
  const [x, m] = n.useState("messages");
  const [u, b] = n.useState([]);
  const [h, f] = n.useState(true);
  const [g, j] = n.useState(false);
  const [p, N] = n.useState(null);
  const [v, k] = n.useState(null);
  const [y, w] = n.useState(false);
  const _ = n.useRef(null);
  const S = n.useRef(null);
  const C = n.useRef([]);
  C.current = u;
  n.useEffect(() => {
    if (!i()) {
      c("/signin", {
        replace: true
      });
    }
  }, [c]);
  n.useEffect(() => {
    if (!i()) {
      return;
    }
    (async () => {
      f(true);
      N(null);
      const e = await t();
      if (e.success === false) {
        N(e.error);
      } else {
        b(e.messages);
        k(e.pagination.next_cursor);
        w(e.pagination.has_more);
      }
      f(false);
    })();
  }, []);
  const I = n.useCallback(async () => {
    if (g || !y || !v) {
      return;
    }
    j(true);
    const e = await t(v);
    if (e.success) {
      b(s => [...s, ...e.messages]);
      k(e.pagination.next_cursor);
      w(e.pagination.has_more);
    }
    j(false);
  }, [g, y, v]);
  n.useEffect(() => {
    if (x !== "messages") {
      return;
    }
    const e = _.current;
    const s = S.current;
    if (!e || !s) {
      return;
    }
    const n = new IntersectionObserver(e => {
      if (e[0].isIntersecting) {
        I();
      }
    }, {
      root: e,
      rootMargin: "80px",
      threshold: 0
    });
    n.observe(s);
    return () => n.disconnect();
  }, [I, x, u.length, h, p]);
  n.useEffect(() => {
    if (!i()) {
      return;
    }
    if (x !== "messages" || h || p) {
      return;
    }
    if (C.current.length === 0) {
      return;
    }
    const e = window.setTimeout(() => {
      const e = C.current.filter(e => e.status === "unread").map(e => e.message_id);
      if (e.length !== 0) {
        (async () => {
          if ((await o(e)).success !== true) {
            return;
          }
          const s = new Set(e);
          b(e => e.map(e => s.has(e.message_id) ? {
            ...e,
            status: "read"
          } : e));
        })();
      }
    }, 3000);
    return () => window.clearTimeout(e);
  }, [x, h, p]);
  if (i()) {
    return a.jsxs("div", {
      className: "inbox-page",
      children: [a.jsxs("header", {
        className: "inbox-page-header",
        children: [a.jsx("h1", {
          className: "inbox-page-title",
          children: r("inbox.title")
        }), a.jsxs("div", {
          className: "inbox-tabs",
          children: [a.jsx("button", {
            type: "button",
            className: "inbox-tab " + (x === "messages" ? "active" : ""),
            onClick: () => m("messages"),
            children: r("inbox.messagesTab")
          }), a.jsx("button", {
            type: "button",
            className: "inbox-tab " + (x === "updates" ? "active" : ""),
            onClick: () => m("updates"),
            children: r("inbox.updatesTab")
          })]
        })]
      }), a.jsx("div", {
        ref: _,
        className: "inbox-scroll",
        children: x === "updates" ? a.jsx("div", {
          className: "inbox-updates-placeholder",
          children: r("inbox.updatesPlaceholder")
        }) : h ? a.jsx("ul", {
          className: "inbox-notification-list",
          children: [1, 2, 3, 4].map(e => a.jsxs("li", {
            className: "inbox-notification-item inbox-skeleton-item",
            children: [a.jsx("div", {
              className: "inbox-notification-aside",
              children: a.jsx("div", {
                className: "inbox-notification-date-row",
                children: a.jsx("div", {
                  className: "inbox-skeleton inbox-skeleton-date"
                })
              })
            }), a.jsxs("div", {
              className: "inbox-notification-main",
              children: [a.jsx("div", {
                className: "inbox-skeleton inbox-skeleton-title"
              }), a.jsx("div", {
                className: "inbox-skeleton inbox-skeleton-body"
              }), a.jsx("div", {
                className: "inbox-skeleton inbox-skeleton-body-short"
              })]
            })]
          }, e))
        }) : p ? a.jsx("div", {
          className: "inbox-error",
          children: p
        }) : u.length === 0 ? a.jsx("div", {
          className: "inbox-empty",
          children: r("inbox.emptyMessages")
        }) : a.jsxs(a.Fragment, {
          children: [a.jsx("ul", {
            className: "inbox-notification-list",
            children: u.map(e => a.jsxs("li", {
              role: "button",
              tabIndex: 0,
              className: "inbox-notification-item " + (e.status === "unread" ? "inbox-notification-item--unread" : ""),
              onClick: () => c(`/inbox/message/${encodeURIComponent(e.message_id)}`, {
                state: {
                  message: e
                }
              }),
              onKeyDown: s => {
                if (s.key === "Enter" || s.key === " ") {
                  s.preventDefault();
                  c(`/inbox/message/${encodeURIComponent(e.message_id)}`, {
                    state: {
                      message: e
                    }
                  });
                }
              },
              children: [a.jsx("div", {
                className: "inbox-notification-aside",
                children: a.jsxs("div", {
                  className: "inbox-notification-date-row",
                  children: [a.jsx("span", {
                    className: "inbox-notification-date",
                    children: l(e.sent_at, r, d.language)
                  }), e.status === "unread" ? a.jsx("span", {
                    className: "inbox-unread-dot",
                    role: "img",
                    "aria-label": r("inbox.statusUnread")
                  }) : null]
                })
              }), a.jsxs("div", {
                className: "inbox-notification-main",
                children: [a.jsx("h2", {
                  className: "inbox-notification-title",
                  children: e.title
                }), a.jsx("p", {
                  className: "inbox-notification-body",
                  children: e.content.message
                })]
              })]
            }, e.message_id))
          }), a.jsx("div", {
            ref: S,
            className: "inbox-sentinel",
            children: g && a.jsx("div", {
              className: "inbox-loading-more",
              children: r("inbox.loadingMore")
            })
          })]
        })
      })]
    });
  } else {
    return null;
  }
};
export { c as default };