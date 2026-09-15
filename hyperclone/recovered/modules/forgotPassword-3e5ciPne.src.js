import { u as s, b as e, a, r, j as o } from "./index-TjoB2Buo.js";
import { r as t } from "./forgotPassword-8Ndgp3wn.js";
const l = () => {
  const l = s();
  const {
    t: n
  } = e();
  const [c] = a();
  const i = c.get("email") || "";
  const [d, m] = r.useState(i);
  const [u, h] = r.useState(false);
  const [x, j] = r.useState(false);
  const [g, N] = r.useState(null);
  r.useEffect(() => {
    if (i) {
      m(i);
    }
  }, [i]);
  const p = () => {
    l("/signin");
  };
  return o.jsxs("div", {
    className: "retro-container",
    children: [o.jsx("div", {
      className: "scanline"
    }), o.jsxs("div", {
      className: "retro-content",
      children: [o.jsxs("header", {
        className: "retro-header",
        children: [o.jsx("div", {
          className: "retro-logo",
          children: o.jsx("img", {
            src: "/hyperknow-logo-w-text.svg",
            alt: "Hyperknow Logo",
            className: "logo-img"
          })
        }), o.jsxs("div", {
          className: "system-status",
          children: ["STATUS: ", o.jsx("span", {
            className: "blink",
            children: "ONLINE"
          })]
        })]
      }), o.jsxs("div", {
        className: "terminal-window",
        children: [o.jsxs("div", {
          className: "terminal-header",
          children: [o.jsx("span", {
            className: "terminal-title",
            children: "FORGOT YOUR PASSWORD?"
          }), o.jsxs("div", {
            className: "terminal-controls",
            children: [o.jsx("span", {
              className: "control-box",
              children: "_"
            }), o.jsx("span", {
              className: "control-box",
              children: "□"
            }), o.jsx("span", {
              className: "control-box",
              children: "×"
            })]
          })]
        }), o.jsx("div", {
          className: "terminal-body",
          children: x ? o.jsxs("div", {
            className: "success-screen",
            children: [o.jsxs("p", {
              className: "success-message",
              children: ["> ", n("auth.forgotPasswordFlow.success"), o.jsx("br", {}), "> ", n("auth.forgotPasswordFlow.emailSent"), o.jsx("br", {}), "> ", n("auth.forgotPasswordFlow.clickLink")]
            }), o.jsx("button", {
              onClick: p,
              className: "retro-button",
              children: n("auth.forgotPasswordFlow.returnToLogin")
            })]
          }) : o.jsxs(o.Fragment, {
            children: [o.jsx("div", {
              className: "ascii-art",
              children: "\n    ____\n   /    \\\n  |  ??  |  FORGOT_PASSWORD?\n   \\____/\n"
            }), o.jsxs("p", {
              className: "terminal-text",
              children: ["> ", n("auth.forgotPasswordFlow.initiating"), o.jsx("br", {}), "> ", n("auth.forgotPasswordFlow.enterEmail")]
            }), g && o.jsxs("p", {
              className: "error-message",
              style: {
                color: "#ff4444",
                marginBottom: "1rem",
                padding: "0.5rem",
                backgroundColor: "#ffe6e6",
                border: "1px solid #ff4444",
                fontSize: "0.9rem"
              },
              children: ["> ERROR: ", g]
            }), o.jsxs("form", {
              onSubmit: async s => {
                var e;
                s.preventDefault();
                h(true);
                N(null);
                try {
                  const s = await t(d);
                  if (s.success) {
                    j(true);
                  } else {
                    N(((e = s.error) == null ? undefined : e.message) || n("auth.errors.sendResetEmailFailed"));
                  }
                } catch (a) {
                  N(n("auth.errors.unexpectedRetry"));
                } finally {
                  h(false);
                }
              },
              className: "retro-form",
              children: [o.jsxs("div", {
                className: "input-line",
                children: [o.jsxs("span", {
                  className: "prompt",
                  children: ["> ", n("auth.forgotPasswordFlow.emailLabel")]
                }), o.jsx("input", {
                  type: "email",
                  value: d,
                  onChange: s => m(s.target.value),
                  className: "retro-input",
                  autoFocus: true,
                  required: true,
                  placeholder: "_"
                })]
              }), o.jsxs("div", {
                className: "action-buttons",
                children: [o.jsx("button", {
                  type: "button",
                  onClick: p,
                  className: "retro-button secondary",
                  children: n("auth.forgotPasswordFlow.abort")
                }), o.jsx("button", {
                  type: "submit",
                  className: "retro-button",
                  disabled: u,
                  children: n(u ? "auth.forgotPasswordFlow.processing" : "auth.forgotPasswordFlow.executeReset")
                })]
              })]
            })]
          })
        })]
      }), o.jsxs("footer", {
        className: "retro-footer",
        children: [o.jsx("p", {
          children: n("auth.retroFooter.copyright")
        }), o.jsx("p", {
          children: "MEM: 640KB OK"
        })]
      })]
    })]
  });
};
export { l as default };