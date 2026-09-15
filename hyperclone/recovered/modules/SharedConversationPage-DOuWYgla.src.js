import { e, c as s, A as a, j as r, m as n, l as i, k as t, b as o, u as l, r as c, i as d } from "./index-TjoB2Buo.js";
import { I as h, u as p, g as m, R as u, A as j, p as x } from "./historyConversationDataParser-f81MQw9L.js";
import { C as g } from "./ConversationSkeletonLoader-BLm7Nk9F.js";
import "./github-BU76ptNE.js";
import "./utils-Bmk8urhx.js";
import "./index-CMJxjNZ8.js";
import "./check-BBSENZCf.js";
import "./createLucideIcon-B4HcG4gb.js";
import "./copy-jHTWzodI.js";
import "./CourseStructureMap-41hR1got.js";
import "./loader-circle-BZEIbChB.js";
import "./plus-jBDDhggQ.js";
import "./maximize-2-78VwLVLI.js";
import "./x-BPqZ-rfi.js";
import "./index-qYFgNVxk.js";
import "./download-dDsBfY4e.js";
import "./CourseTypeIcon-27chSRPG.js";
const v = s(a.ENDPOINTS.GET_SHARED_CONVERSATION_DATA);
const y = {
  default: {
    group: {
      initial: {
        rotate: 0
      },
      animate: {
        rotate: 360,
        transition: {
          duration: 1.2,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop"
        }
      }
    },
    path1: {},
    path2: {}
  }
};
function w({
  size: e,
  ...s
}) {
  const {
    controls: a
  } = p();
  const i = m(y);
  return r.jsxs(n.svg, {
    xmlns: "http://www.w3.org/2000/svg",
    width: e,
    height: e,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    variants: i.group,
    initial: "initial",
    animate: a,
    ...s,
    children: [r.jsx(n.path, {
      d: "M10.827 16.379a6.082 6.082 0 0 1-8.618-7.002l5.412 1.45a6.082 6.082 0 0 1 7.002-8.618l-1.45 5.412a6.082 6.082 0 0 1 8.618 7.002l-5.412-1.45a6.082 6.082 0 0 1-7.002 8.618l1.45-5.412Z",
      variants: i.path1,
      initial: "initial",
      animate: a
    }), r.jsx(n.path, {
      d: "M12 12v.01",
      variants: i.path2,
      initial: "initial",
      animate: a
    })]
  });
}
function k(e) {
  return r.jsx(h, {
    icon: w,
    ...e
  });
}
const N = () => {
  const {
    conversationId: s
  } = i();
  const a = function (e) {
    if (!e) {
      return "";
    }
    const s = e.split("http")[0].trim();
    if (s.length <= 36) {
      return s;
    } else {
      return s.slice(0, 36);
    }
  }(s);
  const n = t();
  const {
    t: h
  } = o();
  const p = l();
  const [m, y] = c.useState([]);
  const [w, N] = c.useState("");
  const [f, C] = c.useState(true);
  const [b, S] = c.useState(null);
  const [P, L] = c.useState(false);
  const T = c.useRef(null);
  c.useEffect(() => {
    if (!s || s === a) {
      return;
    }
    const e = `/share/c/${a}`;
    if (n.pathname !== e) {
      window.history.replaceState(null, "", `${window.location.origin}${e}${window.location.search}${window.location.hash}`);
    }
  }, [s, a, n.pathname]);
  c.useEffect(() => {
    (async () => {
      if (!a) {
        S(h("sharedConversationPage.invalidLink"));
        C(false);
        return;
      }
      C(true);
      S(null);
      try {
        const s = await (async s => {
          try {
            const a = e();
            const r = {
              accept: "application/json",
              "Content-Type": "application/json"
            };
            if (a.Authorization) {
              r.Authorization = a.Authorization;
            }
            const n = await fetch(v, {
              method: "POST",
              headers: r,
              body: JSON.stringify({
                shared_object_id: s
              })
            });
            const i = await n.json();
            if (n.ok) {
              return i;
            } else {
              return {
                success: false,
                error: i.message || "Failed to fetch shared conversation data",
                message: i.message
              };
            }
          } catch (a) {
            return {
              success: false,
              error: "Network error or server unavailable"
            };
          }
        })(a);
        if ("success" in s && !s.success) {
          S(h("sharedConversationPage.notFound"));
          C(false);
          return;
        }
        const r = s;
        if (r.title) {
          N(r.title);
        }
        const n = {
          title: r.title,
          history: r.history,
          history_index: r.history_index
        };
        const i = x(n);
        y(i);
      } catch (s) {
        S(h("sharedConversationPage.notFound"));
      } finally {
        C(false);
      }
    })();
  }, [a]);
  return r.jsxs("div", {
    className: "shared-conversation-container",
    children: [r.jsx("div", {
      className: "shared-logo-container",
      children: r.jsx("a", {
        href: "https://hyperknow.io",
        target: "_blank",
        rel: "noopener noreferrer",
        className: "shared-logo-link",
        children: r.jsx("img", {
          src: "/hyperknow-logo-w-text.svg",
          alt: "HyperKnow",
          className: "shared-logo"
        })
      })
    }), r.jsxs("div", {
      className: "shared-top-right-buttons",
      children: [r.jsxs("div", {
        className: "shared-copy-link-wrapper",
        children: [r.jsx("button", {
          className: "shared-copy-link-button " + (P ? "copied" : ""),
          onClick: async () => {
            try {
              await navigator.clipboard.writeText(window.location.href);
              L(true);
              setTimeout(() => L(false), 2000);
            } catch (e) {}
          },
          "aria-label": "Copy link",
          children: r.jsx("img", {
            src: "/components/shareModal/link.svg",
            alt: "Copy link",
            className: "shared-copy-link-icon"
          })
        }), P && r.jsxs("div", {
          className: "shared-copy-link-dropdown",
          children: [r.jsx("svg", {
            width: "16",
            height: "16",
            viewBox: "0 0 24 24",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            className: "shared-copy-link-dropdown-checkmark",
            children: r.jsx("path", {
              d: "M20 6L9 17L4 12",
              stroke: "#4C6694",
              strokeWidth: "2",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            })
          }), r.jsx("span", {
            className: "shared-copy-link-dropdown-text",
            children: h("sharedConversationPage.linkCopied")
          })]
        })]
      }), !d() && r.jsxs("div", {
        className: "shared-auth-buttons",
        children: [r.jsx("button", {
          className: "shared-sign-in-button",
          onClick: () => p("/signin"),
          children: h("share.logIn")
        }), r.jsx("button", {
          className: "shared-sign-up-button",
          onClick: () => p("/signup"),
          children: h("share.signUpFree")
        })]
      })]
    }), r.jsx("div", {
      className: "shared-conversation-area",
      children: r.jsx("div", {
        className: "shared-conversation-content",
        ref: T,
        children: b ? r.jsxs("div", {
          className: "shared-error-message",
          children: [r.jsx("div", {
            className: "shared-error-icon",
            children: "⚠️"
          }), r.jsx("h2", {
            children: h("sharedConversationPage.loadFailedTitle")
          }), r.jsx("p", {
            children: h("sharedConversationPage.loadFailedBody")
          })]
        }) : f ? r.jsx(g, {
          isLoading: f
        }) : r.jsxs(r.Fragment, {
          children: [m.map((e, s) => r.jsxs("div", {
            className: "shared-conversation-exchange",
            children: [r.jsx("div", {
              className: "user-query-box",
              children: r.jsx("div", {
                className: "user-query-text",
                children: e.query
              })
            }), r.jsx("div", {
              className: "ai-response",
              children: r.jsx(u, {
                response: e.response,
                isComplete: true,
                isHistoryResponse: true
              })
            })]
          }, s)), m.length === 0 && r.jsx("div", {
            className: "shared-empty-state",
            children: r.jsx("p", {
              children: h("sharedConversationPage.emptyHistory")
            })
          })]
        })
      })
    }), r.jsx("div", {
      className: "shared-footer",
      children: r.jsxs("div", {
        className: "shared-footer-content",
        children: [r.jsxs("span", {
          className: "shared-powered-by",
          children: [r.jsx("img", {
            src: "/hyperknow_logo.svg",
            alt: "HyperKnow",
            className: "shared-powered-by-logo"
          }), h("sharedConversationPage.poweredBy"), " ", r.jsx("strong", {
            children: "Hyperknow.io"
          })]
        }), r.jsx(j, {
          animateOnHover: true,
          asChild: true,
          children: r.jsxs("a", {
            href: "/",
            className: "shared-try-link-button",
            target: "_blank",
            rel: "noopener noreferrer",
            children: [r.jsx(k, {
              size: 18,
              className: "shared-try-link-icon"
            }), r.jsx("span", {
              className: "shared-try-link-text",
              children: h("sharedConversationPage.startLearningJourney")
            })]
          })
        })]
      })
    })]
  });
};
export { N as default };