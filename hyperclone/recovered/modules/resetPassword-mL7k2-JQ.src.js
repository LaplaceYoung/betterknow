import { u as s, b as e, r as a, s as r, j as t } from "./index-TjoB2Buo.js";
import { u as l } from "./forgotPassword-8Ndgp3wn.js";
const o = () => {
  const o = s();
  const {
    t: n
  } = e();
  const [i, c] = a.useState("");
  const [d, m] = a.useState("");
  const [h, x] = a.useState("");
  const [u, j] = a.useState(true);
  const [N, p] = a.useState(false);
  const [w, g] = a.useState(false);
  const [v, b] = a.useState(false);
  const [S, f] = a.useState(null);
  a.useEffect(() => {
    r.auth.getSession().then(({
      data: {
        session: s
      }
    }) => {
      if (s) {
        c(s.user.email || "");
        p(true);
        j(false);
      }
    });
    const {
      data: {
        subscription: s
      }
    } = r.auth.onAuthStateChange((s, e) => {
      if (s === "SIGNED_IN" || s === "PASSWORD_RECOVERY") {
        if (e) {
          c(e.user.email || "");
          p(true);
          j(false);
        }
      }
    });
    const e = setTimeout(() => {
      if (u) {
        r.auth.getSession().then(({
          data: {
            session: s
          }
        }) => {
          if (!s) {
            j(false);
            if (window.location.hash) {
              f(n("auth.errors.invalidRecoveryLink"));
            }
          }
        });
      }
    }, 3000);
    return () => {
      s.unsubscribe();
      clearTimeout(e);
    };
  }, []);
  const y = () => {
    o("/signin");
  };
  if (u) {
    return t.jsxs("div", {
      className: "retro-container",
      children: [t.jsx("div", {
        className: "scanline"
      }), t.jsxs("div", {
        className: "retro-content",
        children: [t.jsxs("header", {
          className: "retro-header",
          children: [t.jsx("div", {
            className: "retro-logo",
            children: t.jsx("img", {
              src: "/hyperknow-logo-w-text.svg",
              alt: "Hyperknow Logo",
              className: "logo-img"
            })
          }), t.jsxs("div", {
            className: "system-status",
            children: ["STATUS: ", t.jsx("span", {
              className: "blink",
              children: "VERIFYING"
            })]
          })]
        }), t.jsxs("div", {
          className: "terminal-window",
          children: [t.jsxs("div", {
            className: "terminal-header",
            children: [t.jsx("span", {
              className: "terminal-title",
              children: "RESET PASSWORD"
            }), t.jsxs("div", {
              className: "terminal-controls",
              children: [t.jsx("span", {
                className: "control-box",
                children: "_"
              }), t.jsx("span", {
                className: "control-box",
                children: "□"
              }), t.jsx("span", {
                className: "control-box",
                children: "×"
              })]
            })]
          }), t.jsx("div", {
            className: "terminal-body",
            children: t.jsxs("p", {
              className: "terminal-text",
              children: ["> ", n("auth.resetPasswordFlow.verifyingToken"), t.jsx("br", {}), "> ", n("auth.resetPasswordFlow.pleaseWait")]
            })
          })]
        })]
      })]
    });
  } else if (N) {
    return t.jsxs("div", {
      className: "retro-container",
      children: [t.jsx("div", {
        className: "scanline"
      }), t.jsxs("div", {
        className: "retro-content",
        children: [t.jsxs("header", {
          className: "retro-header",
          children: [t.jsx("div", {
            className: "retro-logo",
            children: t.jsx("img", {
              src: "/hyperknow-logo-w-text.svg",
              alt: "Hyperknow Logo",
              className: "logo-img"
            })
          }), t.jsxs("div", {
            className: "system-status",
            children: ["STATUS: ", t.jsx("span", {
              className: "blink",
              children: "ONLINE"
            })]
          })]
        }), t.jsxs("div", {
          className: "terminal-window",
          children: [t.jsxs("div", {
            className: "terminal-header",
            children: [t.jsx("span", {
              className: "terminal-title",
              children: "RESET PASSWORD"
            }), t.jsxs("div", {
              className: "terminal-controls",
              children: [t.jsx("span", {
                className: "control-box",
                children: "_"
              }), t.jsx("span", {
                className: "control-box",
                children: "□"
              }), t.jsx("span", {
                className: "control-box",
                children: "×"
              })]
            })]
          }), t.jsx("div", {
            className: "terminal-body",
            children: v ? t.jsxs("div", {
              className: "success-screen",
              children: [t.jsxs("p", {
                className: "success-message",
                children: ["> ", n("auth.forgotPasswordFlow.success"), t.jsx("br", {}), "> ", n("auth.resetPasswordFlow.passwordUpdated"), t.jsx("br", {}), "> ", n("auth.resetPasswordFlow.redirecting")]
              }), t.jsx("button", {
                onClick: y,
                className: "retro-button",
                children: n("auth.resetPasswordFlow.goToLogin")
              })]
            }) : t.jsxs(t.Fragment, {
              children: [t.jsx("div", {
                className: "ascii-art",
                children: "\n    ____\n   /    \\\n  |  🔑  |  RESET_PASSWORD\n   \\____/\n"
              }), t.jsxs("p", {
                className: "terminal-text",
                children: ["> ", n("auth.resetPasswordFlow.userIdentified"), " ", t.jsx("strong", {
                  children: i
                }), t.jsx("br", {}), "> ", n("auth.resetPasswordFlow.enterNewPassword")]
              }), S && t.jsxs("p", {
                className: "error-message",
                style: {
                  color: "#ff4444",
                  marginBottom: "1rem",
                  padding: "0.5rem",
                  backgroundColor: "#ffe6e6",
                  border: "1px solid #ff4444",
                  fontSize: "0.9rem"
                },
                children: ["> ERROR: ", S]
              }), t.jsxs("form", {
                onSubmit: async s => {
                  var e;
                  s.preventDefault();
                  f(null);
                  if (d.length < 8) {
                    f(n("auth.errors.passwordTooShort"));
                  } else if (d === h) {
                    g(true);
                    try {
                      const s = await l(d);
                      if (s.success) {
                        b(true);
                        setTimeout(() => {
                          o("/signin");
                        }, 3000);
                      } else {
                        f(((e = s.error) == null ? undefined : e.message) || n("auth.errors.updatePasswordFailed"));
                      }
                    } catch (a) {
                      f(n("auth.errors.unexpectedRetry"));
                    } finally {
                      g(false);
                    }
                  } else {
                    f(n("auth.passwordsDoNotMatch"));
                  }
                },
                className: "retro-form",
                children: [t.jsxs("div", {
                  className: "input-line",
                  children: [t.jsxs("span", {
                    className: "prompt",
                    children: ["> ", n("auth.resetPasswordFlow.newPasswordLabel")]
                  }), t.jsx("input", {
                    type: "password",
                    value: d,
                    onChange: s => m(s.target.value),
                    className: "retro-input",
                    autoFocus: true,
                    required: true,
                    minLength: 8,
                    placeholder: "_"
                  })]
                }), t.jsxs("div", {
                  className: "input-line",
                  children: [t.jsxs("span", {
                    className: "prompt",
                    children: ["> ", n("auth.resetPasswordFlow.confirmPasswordLabel")]
                  }), t.jsx("input", {
                    type: "password",
                    value: h,
                    onChange: s => x(s.target.value),
                    className: "retro-input",
                    required: true,
                    minLength: 8,
                    placeholder: "_"
                  })]
                }), t.jsxs("div", {
                  className: "action-buttons",
                  children: [t.jsx("button", {
                    type: "submit",
                    className: "retro-button",
                    disabled: w,
                    children: n(w ? "auth.forgotPasswordFlow.processing" : "auth.resetPasswordFlow.updatePassword")
                  }), t.jsx("button", {
                    type: "button",
                    onClick: y,
                    className: "retro-button secondary",
                    children: n("auth.forgotPasswordFlow.abort")
                  })]
                })]
              })]
            })
          })]
        }), t.jsxs("footer", {
          className: "retro-footer",
          children: [t.jsx("p", {
            children: n("auth.retroFooter.copyright")
          }), t.jsx("p", {
            children: "MEM: 640KB OK"
          })]
        })]
      })]
    });
  } else {
    return t.jsxs("div", {
      className: "retro-container",
      children: [t.jsx("div", {
        className: "scanline"
      }), t.jsxs("div", {
        className: "retro-content",
        children: [t.jsxs("header", {
          className: "retro-header",
          children: [t.jsx("div", {
            className: "retro-logo",
            children: t.jsx("img", {
              src: "/hyperknow-logo-w-text.svg",
              alt: "Hyperknow Logo",
              className: "logo-img"
            })
          }), t.jsxs("div", {
            className: "system-status",
            children: ["STATUS: ", t.jsx("span", {
              className: "blink",
              style: {
                color: "#ff4444"
              },
              children: "ERROR"
            })]
          })]
        }), t.jsxs("div", {
          className: "terminal-window",
          children: [t.jsxs("div", {
            className: "terminal-header",
            children: [t.jsx("span", {
              className: "terminal-title",
              children: "RESET PASSWORD"
            }), t.jsxs("div", {
              className: "terminal-controls",
              children: [t.jsx("span", {
                className: "control-box",
                children: "_"
              }), t.jsx("span", {
                className: "control-box",
                children: "□"
              }), t.jsx("span", {
                className: "control-box",
                children: "×"
              })]
            })]
          }), t.jsxs("div", {
            className: "terminal-body",
            children: [t.jsxs("p", {
              className: "terminal-text",
              style: {
                color: "#ff4444"
              },
              children: ["> ERROR: ", S || n("auth.errors.invalidRecoveryLink")]
            }), t.jsxs("p", {
              className: "terminal-text",
              children: ["> ", n("auth.resetPasswordFlow.requestNewReset")]
            }), t.jsx("button", {
              onClick: y,
              className: "retro-button",
              style: {
                marginTop: "2rem"
              },
              children: n("auth.resetPasswordFlow.returnToLogin")
            })]
          })]
        })]
      })]
    });
  }
};
export { o as default };