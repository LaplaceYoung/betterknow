import { l as e, k as s, u as a, b as n, r as i, i as t, j as l } from "./index-TjoB2Buo.js";
import { m as o, f as r, g as c } from "./InboxPage-COF0onVT.js";
function d(e) {
  const s = (e.msg_type ?? "").trim().toLowerCase();
  if (s.startsWith("canvas_") || s === "canvas") {
    return true;
  }
  if ((e.sender_type ?? "").trim().toLowerCase().includes("canvas")) {
    return true;
  }
  const a = (e.title ?? "").trim();
  return !!/^\[canvas\]/i.test(a);
}
const m = () => {
  const {
    messageId: m
  } = e();
  const x = s();
  const g = a();
  const {
    t: u,
    i18n: b
  } = n();
  const [h, j] = i.useState(null);
  const [v, N] = i.useState(null);
  const [p, f] = i.useState(true);
  const k = i.useRef(false);
  i.useEffect(() => {
    if (!t()) {
      g("/signin", {
        replace: true
      });
    }
  }, [g]);
  i.useEffect(() => {
    var e;
    k.current = false;
    const s = (e = x.state) == null ? undefined : e.message;
    if (m && s && s.message_id === m) {
      j(s);
      N(null);
      f(false);
      return;
    }
    if (!m) {
      j(null);
      N(u("inbox.messageNotFound"));
      f(false);
      return;
    }
    let a = false;
    j(null);
    f(true);
    N(null);
    (async function (e) {
      let s = null;
      let a = true;
      while (a) {
        const n = await c(s);
        if (!n.success) {
          return null;
        }
        const i = n.messages.find(s => s.message_id === e);
        if (i) {
          return i;
        }
        s = n.pagination.next_cursor;
        a = n.pagination.has_more;
        if (!s) {
          break;
        }
      }
      return null;
    })(m).then(e => {
      if (!a) {
        if (e) {
          j(e);
          N(null);
        } else {
          j(null);
          N(u("inbox.messageNotFound"));
        }
        f(false);
      }
    });
    return () => {
      a = true;
    };
  }, [m, x.key, u, x.state]);
  i.useEffect(() => {
    if (h && h.status === "unread" && !k.current) {
      k.current = true;
      (async () => {
        if ((await o([h.message_id])).success) {
          j(e => e ? {
            ...e,
            status: "read"
          } : e);
        } else {
          k.current = false;
        }
      })();
    }
  }, [h]);
  if (!t()) {
    return null;
  }
  const _ = () => {
    g("/inbox");
  };
  return l.jsxs("div", {
    className: "inbox-page inbox-message-page",
    children: [l.jsx("header", {
      className: "inbox-page-header inbox-message-page-header",
      children: l.jsx("div", {
        className: "inbox-message-page-toolbar",
        children: l.jsxs("button", {
          type: "button",
          className: "inbox-message-back",
          onClick: _,
          children: [l.jsx("svg", {
            width: "20",
            height: "20",
            viewBox: "0 0 24 24",
            fill: "none",
            "aria-hidden": true,
            children: l.jsx("path", {
              d: "M15 18L9 12L15 6",
              stroke: "currentColor",
              strokeWidth: "2",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            })
          }), u("inbox.backToInbox")]
        })
      })
    }), l.jsx("div", {
      className: "inbox-scroll inbox-message-page-scroll",
      children: p ? l.jsxs("div", {
        className: "inbox-message-detail inbox-message-detail--loading",
        "aria-busy": "true",
        children: [l.jsx("div", {
          className: "inbox-message-detail-skeleton-title"
        }), l.jsx("div", {
          className: "inbox-message-detail-skeleton-meta"
        }), l.jsx("div", {
          className: "inbox-message-detail-skeleton-line"
        }), l.jsx("div", {
          className: "inbox-message-detail-skeleton-line"
        }), l.jsx("div", {
          className: "inbox-message-detail-skeleton-line inbox-message-detail-skeleton-line--short"
        })]
      }) : v || !h ? l.jsxs("div", {
        className: "inbox-message-page-missing",
        children: [l.jsx("p", {
          className: "inbox-message-page-missing-text",
          children: v ?? u("inbox.messageNotFound")
        }), l.jsx("button", {
          type: "button",
          className: "inbox-message-back-to-list",
          onClick: _,
          children: u("inbox.backToInbox")
        })]
      }) : l.jsxs("article", {
        className: "inbox-message-detail",
        children: [l.jsx("h1", {
          className: "inbox-message-detail-title",
          children: h.title
        }), l.jsx("div", {
          className: "inbox-message-detail-meta",
          children: l.jsxs("div", {
            className: "inbox-notification-date-row inbox-message-detail-date-row",
            children: [l.jsxs("div", {
              className: "inbox-message-detail-meta-left",
              children: [d(h) ? l.jsxs(l.Fragment, {
                children: [l.jsxs("span", {
                  className: "inbox-message-canvas-inline",
                  children: [l.jsx("img", {
                    src: "/pages/mainPages/home/canvas-logo.svg",
                    alt: "",
                    className: "inbox-message-canvas-inline__logo"
                  }), l.jsx("span", {
                    className: "inbox-message-canvas-inline__text",
                    children: u("inbox.fromCanvasSync")
                  })]
                }), l.jsx("span", {
                  className: "inbox-message-meta-sep",
                  "aria-hidden": true,
                  children: "·"
                })]
              }) : null, l.jsx("span", {
                className: "inbox-notification-date",
                children: r(h.sent_at, u, b.language)
              })]
            }), l.jsx("div", {
              className: "inbox-message-detail-meta-right",
              children: h.status === "unread" ? l.jsx("span", {
                className: "inbox-unread-dot",
                role: "img",
                "aria-label": u("inbox.statusUnread")
              }) : l.jsx("span", {
                className: "inbox-message-detail-read-label",
                children: u("inbox.statusRead")
              })
            })]
          })
        }), l.jsx("div", {
          className: "inbox-message-detail-body",
          children: h.content.message
        })]
      })
    })]
  });
};
export { m as default };