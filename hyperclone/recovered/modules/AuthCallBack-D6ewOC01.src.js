import { u as e, b as a, a as s, r as t, n as i, p as c, o as n, q as o, v as r, j as l, T as d } from "./index-TjoB2Buo.js";
import { g as u, t as h } from "./dubAnalytics-BIiGXMVM.js";
const m = "onboarding_completed";
const g = "pending_friend_referral_code";
function b() {
  const b = e();
  const {
    t: k
  } = a();
  const [v] = s();
  const [x, j] = t.useState(true);
  const [_, p] = t.useState(null);
  const [f, N] = t.useState({
    general_onboarding: true,
    proactive_onboarding: true
  });
  t.useEffect(() => {
    S();
  }, []);
  const S = async () => {
    try {
      const e = v.get("error");
      const a = v.get("error_description");
      if (e) {
        p(a || k("auth.errors.authenticationFailed"));
        setTimeout(() => b("/signin"), 3000);
        return;
      }
      const s = await i();
      if (!s.success || !s.user) {
        p(k("auth.errors.authenticationFailedRetry"));
        setTimeout(() => b("/signin"), 3000);
        return;
      }
      const t = await c(s.user);
      if (!t.success || !t.data) {
        p(k("auth.errors.processUserDataFailed"));
        setTimeout(() => b("/signin"), 3000);
        return;
      }
      const n = t.data;
      await y(n.user);
    } catch (e) {
      p(k("auth.errors.unexpectedRetry"));
      setTimeout(() => b("/signin"), 3000);
    } finally {
      j(false);
    }
  };
  const y = async e => {
    try {
      const a = await i();
      if (!a.success || !a.session) {
        p(k("auth.errors.getSessionFailed"));
        setTimeout(() => b("/signin"), 3000);
        return;
      }
      const s = a.session;
      ((e, a = false) => {
        localStorage.setItem("access_token", e.access_token);
        localStorage.setItem("refresh_token", e.refresh_token);
        localStorage.setItem("user_id", e.user_id);
        localStorage.setItem("username", e.username);
        localStorage.setItem("token_timestamp", Date.now().toString());
        localStorage.setItem(m, String(a));
      })({
        user_id: e.id,
        email: e.email,
        username: e.name,
        access_token: s.access_token,
        refresh_token: s.refresh_token || "supabase_refresh_token"
      }, false);
      N({
        general_onboarding: false,
        proactive_onboarding: false
      });
      const t = v.get("ref");
      const c = localStorage.getItem(g);
      const l = t || c;
      const d = await n(s.access_token, l, u(), o());
      if (c) {
        localStorage.removeItem(g);
      }
      const x = d.onboarding_status ?? {
        general_onboarding: d.onboarding_completed ?? false,
        proactive_onboarding: d.onboarding_completed ?? false
      };
      N(x);
      r(x);
      localStorage.setItem(m, String(d.onboarding_completed ?? false));
      if (d.success) {
        if (d.is_new_user) {
          h({
            method: "google",
            userId: d.user_id
          });
          d.invite_info;
        }
        if (d.invite_info && d.invite_info.attributes && d.invite_info.attributes.coupon_code) {
          setTimeout(() => {
            var e;
            var a;
            b("/coupon-code", {
              state: {
                couponCode: (a = (e = d.invite_info) == null ? undefined : e.attributes) == null ? undefined : a.coupon_code,
                fromLogin: true
              }
            });
          }, 1500);
        }
      }
    } catch (a) {
      p(k("auth.errors.completeAuthFailed"));
      setTimeout(() => b("/signin"), 3000);
    }
  };
  if (_) {
    return l.jsxs("div", {
      className: "auth-callback-container",
      children: [l.jsx("div", {
        className: "auth-callback-left",
        children: l.jsxs("div", {
          className: "auth-callback-content",
          children: [l.jsx("div", {
            className: "error-icon",
            children: l.jsxs("svg", {
              width: "64",
              height: "64",
              viewBox: "0 0 24 24",
              fill: "none",
              children: [l.jsx("circle", {
                cx: "12",
                cy: "12",
                r: "10",
                stroke: "#EF4444",
                strokeWidth: "2"
              }), l.jsx("path", {
                d: "M12 8v4M12 16h.01",
                stroke: "#EF4444",
                strokeWidth: "2",
                strokeLinecap: "round"
              })]
            })
          }), l.jsx("h1", {
            className: "auth-callback-title",
            children: k("auth.callback.authenticationFailedTitle")
          }), l.jsx("p", {
            className: "auth-callback-message",
            children: _
          }), l.jsx("p", {
            className: "auth-callback-redirect",
            children: k("auth.callback.redirecting")
          })]
        })
      }), l.jsx("div", {
        className: "auth-callback-right",
        children: l.jsx("div", {
          className: "testimonial-panel",
          children: l.jsx(d, {})
        })
      })]
    });
  } else if (x) {
    return l.jsxs("div", {
      className: "auth-callback-container",
      children: [l.jsx("div", {
        className: "auth-callback-left",
        children: l.jsxs("div", {
          className: "auth-callback-content",
          children: [l.jsxs("div", {
            className: "loading-animation",
            children: [l.jsx("div", {
              className: "loading-dot"
            }), l.jsx("div", {
              className: "loading-dot"
            }), l.jsx("div", {
              className: "loading-dot"
            })]
          }), l.jsx("h1", {
            className: "auth-callback-title",
            children: k("auth.callback.authenticating")
          }), l.jsx("p", {
            className: "auth-callback-message",
            children: k("auth.callback.processingGoogle")
          })]
        })
      }), l.jsx("div", {
        className: "auth-callback-right",
        children: l.jsx("div", {
          className: "testimonial-panel",
          children: l.jsx(d, {})
        })
      })]
    });
  } else {
    return l.jsxs("div", {
      className: "auth-callback-container",
      children: [l.jsx("div", {
        className: "auth-callback-left",
        children: l.jsxs("div", {
          className: "auth-callback-content",
          children: [l.jsx("div", {
            className: "success-icon",
            children: l.jsxs("svg", {
              width: "64",
              height: "64",
              viewBox: "0 0 24 24",
              fill: "none",
              children: [l.jsx("circle", {
                cx: "12",
                cy: "12",
                r: "10",
                stroke: "#22C55E",
                strokeWidth: "2"
              }), l.jsx("path", {
                d: "M8 12l2 2 4-4",
                stroke: "#22C55E",
                strokeWidth: "2",
                strokeLinecap: "round",
                strokeLinejoin: "round"
              })]
            })
          }), l.jsx("h1", {
            className: "auth-callback-title",
            children: k("auth.callback.success")
          }), l.jsx("p", {
            className: "auth-callback-message",
            children: k("auth.callback.authSuccessful")
          }), l.jsx("button", {
            className: "continue-btn",
            onClick: () => {
              const {
                general_onboarding: e,
                proactive_onboarding: a
              } = f;
              if (e && a) {
                b("/", {
                  state: {
                    fromLogin: true
                  }
                });
              } else {
                b("/onboarding");
              }
            },
            style: {
              marginTop: "1.5rem",
              padding: "0.75rem 2rem",
              backgroundColor: "#1a1a1a",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontFamily: "var(--font-satoshi-medium)",
              fontSize: "1rem",
              cursor: "pointer",
              transition: "background-color 0.2s ease"
            },
            onMouseOver: e => e.currentTarget.style.backgroundColor = "#333",
            onMouseOut: e => e.currentTarget.style.backgroundColor = "#1a1a1a",
            children: k("auth.callback.startLearning")
          })]
        })
      }), l.jsx("div", {
        className: "auth-callback-right",
        children: l.jsx("div", {
          className: "testimonial-panel",
          children: l.jsx(d, {})
        })
      })]
    });
  }
}
export { b as default };