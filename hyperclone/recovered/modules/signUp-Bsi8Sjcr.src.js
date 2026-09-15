import { c as e, A as s, b as a, j as t, u as r, a as i, r as n, W as l, T as o, X as c, q as d, Y as u, Z as h } from "./index-TjoB2Buo.js";
import { g as m, t as p } from "./dubAnalytics-BIiGXMVM.js";
const g = e(s.ENDPOINTS.REGISTER);
const f = ({
  isOpen: e,
  onClose: s,
  referrerName: r,
  isLoading: i = false
}) => {
  const {
    t: n
  } = a();
  if (e) {
    return t.jsx("div", {
      className: "referral-welcome-overlay",
      children: t.jsxs("div", {
        className: "referral-modal-container",
        children: [t.jsxs("div", {
          className: "referral-modal-header",
          children: [t.jsx("div", {
            className: "referral-modal-icon",
            children: t.jsx("img", {
              src: "/accountDropdown/gift-colored.svg",
              alt: "Gift"
            })
          }), t.jsx("h2", {
            className: "referral-modal-title",
            children: n("auth.welcomeToHyperknow")
          }), t.jsxs("p", {
            className: "referral-modal-message",
            children: [n("auth.referral.messagePrefix"), " ", t.jsx("strong", {
              children: i ? t.jsx("span", {
                className: "referral-loading-text",
                children: n("auth.loading")
              }) : r || n("auth.referral.defaultReferrerName")
            }), n("auth.referral.messageSuffix")]
          })]
        }), t.jsxs("button", {
          className: "referral-modal-signup-btn",
          onClick: s,
          children: [t.jsx("span", {
            children: n("auth.signUp")
          }), t.jsx("svg", {
            width: "16",
            height: "16",
            viewBox: "0 0 24 24",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            children: t.jsx("path", {
              d: "M5 12H19M19 12L12 5M19 12L12 19",
              stroke: "currentColor",
              strokeWidth: "2",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            })
          })]
        })]
      })
    });
  } else {
    return null;
  }
};
const x = ({
  open: e
}) => e ? t.jsxs("svg", {
  width: "16",
  height: "16",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  children: [t.jsx("path", {
    d: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
  }), t.jsx("circle", {
    cx: "12",
    cy: "12",
    r: "3"
  })]
}) : t.jsxs("svg", {
  width: "16",
  height: "16",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  children: [t.jsx("path", {
    d: "M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"
  }), t.jsx("line", {
    x1: "1",
    y1: "1",
    x2: "23",
    y2: "23"
  })]
});
const j = ({
  checked: e
}) => t.jsxs("svg", {
  width: "14",
  height: "14",
  viewBox: "0 0 24 24",
  fill: e ? "currentColor" : "none",
  stroke: e ? "none" : "currentColor",
  strokeWidth: e ? "0" : "2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  className: "password-check-icon",
  children: [t.jsx("circle", {
    cx: "12",
    cy: "12",
    r: "10"
  }), e && t.jsx("path", {
    fill: "#ffffff",
    d: "M9 12l2 2 4-4",
    stroke: "#ffffff",
    strokeWidth: "2"
  })]
});
const v = ({
  setConversationHistory: v
}) => {
  const w = r();
  const [N] = i();
  const {
    t: b
  } = a();
  const [k, y] = n.useState("");
  const [_, S] = n.useState("");
  const [C, P] = n.useState("");
  const [I, L] = n.useState(false);
  const [T, A] = n.useState("");
  const [F, R] = n.useState(false);
  const [H, M] = n.useState(false);
  const [q, B] = n.useState(false);
  const [E, z] = n.useState(false);
  const [D, O] = n.useState(null);
  const [U, W] = n.useState(null);
  const [$, G] = n.useState(null);
  const Z = N.get("ref");
  const V = Z ? sessionStorage.getItem(`referral-overlay-${Z}`) : null;
  const [J, K] = n.useState(Z || null);
  const [Y, X] = n.useState(!!Z && !V);
  const [Q, ee] = n.useState(b("auth.referral.defaultReferrerName"));
  const [se, ae] = n.useState(!!Z && !V);
  n.useEffect(() => {
    const a = N.get("ref");
    if (a) {
      K(a);
      if (!sessionStorage.getItem(`referral-overlay-${a}`)) {
        sessionStorage.setItem(`referral-overlay-${a}`, "true");
        X(true);
        ae(true);
        (async a => {
          try {
            const t = await fetch(e(s.ENDPOINTS.CHECK_INVITE_LINK), {
              method: "POST",
              headers: {
                accept: "application/json",
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                invite_id: a
              })
            });
            const r = await t.json();
            if (t.ok) {
              return r;
            } else {
              return {
                success: false,
                message: r.message || "Failed to check invite link",
                error: r.error || `HTTP ${t.status}`
              };
            }
          } catch (D) {
            return {
              success: false,
              message: "Network error occurred",
              error: D instanceof Error ? D.message : "Unknown error"
            };
          }
        })(a).then(e => {
          if (e.success) {
            const s = e.sender.username ? `${e.sender.username} (${e.sender.email})` : e.sender.email;
            ee(s);
          }
          ae(false);
        });
      }
    } else {
      K(null);
      X(false);
    }
  }, [N]);
  return t.jsxs("div", {
    className: "signup-container",
    children: [t.jsx(f, {
      isOpen: Y,
      onClose: () => X(false),
      referrerName: Q,
      isLoading: se
    }), !Y && t.jsxs(t.Fragment, {
      children: [t.jsxs("div", {
        className: "auth-header-container",
        children: [t.jsx("img", {
          src: "/hyperknow-logo-w-text.svg",
          alt: "Hyperknow",
          className: "auth-logo"
        }), t.jsx(l, {})]
      }), t.jsx("div", {
        className: "signup-left",
        children: t.jsx("div", {
          className: "signup-form-wrapper",
          children: t.jsxs("div", {
            className: "signup-form",
            children: [t.jsxs("div", {
              className: "signup-heading",
              children: [t.jsx("h1", {
                className: "signup-title",
                children: b("auth.createAccount")
              }), t.jsx("p", {
                className: "signup-subtitle",
                children: b("auth.createAccountSubtitle")
              })]
            }), t.jsx("button", {
              className: "google-btn",
              onClick: async () => {
                var e;
                if (!q) {
                  O(null);
                  B(true);
                  try {
                    if (J) {
                      localStorage.setItem("pending_friend_referral_code", J);
                    }
                    const s = await c();
                    if (!s.success) {
                      O(((e = s.error) == null ? undefined : e.message) || "Failed to sign up with Google");
                      B(false);
                    }
                  } catch {
                    O("Failed to sign up with Google. Please try again.");
                    B(false);
                  }
                }
              },
              type: "button",
              disabled: q || H,
              children: q ? t.jsxs(t.Fragment, {
                children: [t.jsx("span", {
                  className: "google-btn-spinner",
                  "aria-hidden": true
                }), t.jsx("span", {
                  children: b("auth.signingIn")
                })]
              }) : t.jsxs(t.Fragment, {
                children: [t.jsxs("svg", {
                  className: "google-btn-icon",
                  viewBox: "0 0 24 24",
                  width: "18",
                  height: "18",
                  children: [t.jsx("path", {
                    fill: "#4285F4",
                    d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  }), t.jsx("path", {
                    fill: "#34A853",
                    d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  }), t.jsx("path", {
                    fill: "#FBBC05",
                    d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  }), t.jsx("path", {
                    fill: "#EA4335",
                    d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  })]
                }), t.jsx("span", {
                  children: b("auth.signUpWithGoogle")
                })]
              })
            }), t.jsxs("div", {
              className: "auth-divider",
              children: [t.jsx("span", {
                className: "auth-divider-line"
              }), t.jsx("span", {
                className: "auth-divider-text",
                children: b("auth.or")
              }), t.jsx("span", {
                className: "auth-divider-line"
              })]
            }), D && t.jsx("div", {
              className: "auth-feedback auth-feedback--error",
              children: D
            }), U && t.jsx("div", {
              className: "auth-feedback auth-feedback--success",
              children: U
            }), t.jsxs("form", {
              onSubmit: async e => {
                var s;
                var a;
                var t;
                var r;
                var i;
                e.preventDefault();
                O(null);
                W(null);
                G(null);
                const n = (l = C).length < 8 ? "Password must be at least 8 characters long" : /[a-z]/.test(l) ? /[A-Z]/.test(l) ? /\d/.test(l) ? null : "Password must contain at least one digit" : "Password must contain at least one uppercase letter" : "Password must contain at least one lowercase letter";
                var l;
                if (n) {
                  G(n);
                } else if (C === T) {
                  M(true);
                  try {
                    const e = {
                      username: k,
                      email: _,
                      password: C
                    };
                    if (J) {
                      e.friend_referral_code = J;
                    }
                    const n = m();
                    if (n) {
                      e.dub_click_id = n;
                    }
                    const l = d();
                    if (l) {
                      e.utm_data = l;
                    }
                    const o = await (async e => {
                      try {
                        const s = await fetch(g, {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                            accept: "application/json"
                          },
                          body: JSON.stringify(e)
                        });
                        const a = await s.json();
                        if (s.ok) {
                          return {
                            success: true,
                            message: a.message,
                            user_id: a.user_id,
                            email: a.email,
                            username: a.username,
                            invite_info: a.invite_info,
                            friend_referral_info: a.friend_referral_info,
                            invite_code_info: a.invite_code_info
                          };
                        } else if (a.detail && typeof a.detail == "object") {
                          return {
                            success: a.detail.success || false,
                            message: a.detail.message || "Registration failed. Please try again.",
                            error: a.detail.error || "Registration failed. Please try again."
                          };
                        } else {
                          return {
                            success: false,
                            message: a.message || "Registration failed. Please try again.",
                            error: a.error || "Registration failed. Please try again."
                          };
                        }
                      } catch (D) {
                        return {
                          success: false,
                          message: "Network error. Please check your connection and try again.",
                          error: "Network error. Please check your connection and try again."
                        };
                      }
                    })(e);
                    if (o.success) {
                      W(b("auth.signUpSuccessful"));
                      try {
                        const e = {
                          email: _,
                          password: C
                        };
                        if ((await u(e)).success) {
                          p({
                            method: "email",
                            userId: o.user_id
                          });
                          const e = [];
                          if ((a = (s = o.friend_referral_info) == null ? undefined : s.attributes) == null ? undefined : a.coupon_code) {
                            e.push({
                              code: o.friend_referral_info.attributes.coupon_code,
                              description: o.friend_referral_info.attributes.coupon_description || b("coupon.defaultFriendReferralDiscount")
                            });
                          }
                          if ((i = (r = (t = o.invite_code_info) == null ? undefined : t.attributes) == null ? undefined : r.receiver_coupon) == null ? undefined : i.code) {
                            e.push({
                              code: o.invite_code_info.attributes.receiver_coupon.code,
                              description: o.invite_code_info.attributes.receiver_coupon.description || b("coupon.defaultInviteDiscount")
                            });
                          }
                          if (e.length > 0) {
                            w("/coupon-code", {
                              state: {
                                couponCodes: e,
                                fromLogin: true
                              }
                            });
                          } else {
                            setTimeout(() => w("/onboarding"), h);
                          }
                        } else {
                          W("User registered successfully! Please sign in to continue.");
                          setTimeout(() => w("/signin"), h);
                        }
                      } catch {
                        W("User registered successfully! Please sign in to continue.");
                        setTimeout(() => w("/signin"), h);
                      }
                    } else {
                      O(o.error || "Registration failed");
                    }
                  } catch {
                    O("An unexpected error occurred");
                  } finally {
                    M(false);
                  }
                } else {
                  G(b("auth.passwordsDoNotMatch") || "Passwords do not match");
                }
              },
              className: "auth-form",
              noValidate: true,
              children: [t.jsxs("div", {
                className: "auth-field",
                children: [t.jsx("label", {
                  htmlFor: "username",
                  className: "auth-label",
                  children: b("auth.name")
                }), t.jsx("input", {
                  id: "username",
                  className: "auth-input",
                  type: "text",
                  value: k,
                  onChange: e => y(e.target.value),
                  autoComplete: "name",
                  required: true,
                  disabled: H
                })]
              }), t.jsxs("div", {
                className: "auth-field",
                children: [t.jsx("label", {
                  htmlFor: "email",
                  className: "auth-label",
                  children: b("auth.email")
                }), t.jsx("input", {
                  id: "email",
                  className: "auth-input",
                  type: "email",
                  value: _,
                  onChange: e => S(e.target.value),
                  autoComplete: "email",
                  required: true,
                  disabled: H
                })]
              }), t.jsxs("div", {
                className: "auth-field",
                children: [t.jsx("label", {
                  htmlFor: "password",
                  className: "auth-label",
                  children: b("auth.password")
                }), t.jsxs("div", {
                  className: "auth-input-wrapper",
                  children: [t.jsx("input", {
                    id: "password",
                    className: "auth-input",
                    type: I ? "text" : "password",
                    value: C,
                    onFocus: () => z(true),
                    onBlur: () => z(false),
                    onChange: e => {
                      P(e.target.value);
                      if ($) {
                        G(null);
                      }
                    },
                    autoComplete: "new-password",
                    required: true,
                    disabled: H
                  }), t.jsx("button", {
                    type: "button",
                    className: "auth-eye-btn",
                    onClick: () => L(e => !e),
                    "aria-label": I ? "Hide password" : "Show password",
                    tabIndex: -1,
                    children: t.jsx(x, {
                      open: I
                    })
                  })]
                }), $ ? t.jsx("p", {
                  className: "auth-field-error",
                  children: $
                }) : (E || C.length > 0) && t.jsxs("div", {
                  className: "password-live-checks",
                  children: [t.jsxs("div", {
                    className: "password-check-item " + (C.length >= 8 ? "valid" : "invalid"),
                    children: [t.jsx(j, {
                      checked: C.length >= 8
                    }), t.jsx("span", {
                      children: b("auth.passwordReqLength")
                    })]
                  }), t.jsxs("div", {
                    className: "password-check-item " + (/[a-z]/.test(C) ? "valid" : "invalid"),
                    children: [t.jsx(j, {
                      checked: /[a-z]/.test(C)
                    }), t.jsx("span", {
                      children: b("auth.passwordReqLower")
                    })]
                  }), t.jsxs("div", {
                    className: "password-check-item " + (/[A-Z]/.test(C) ? "valid" : "invalid"),
                    children: [t.jsx(j, {
                      checked: /[A-Z]/.test(C)
                    }), t.jsx("span", {
                      children: b("auth.passwordReqUpper")
                    })]
                  }), t.jsxs("div", {
                    className: "password-check-item " + (/\d/.test(C) ? "valid" : "invalid"),
                    children: [t.jsx(j, {
                      checked: /\d/.test(C)
                    }), t.jsx("span", {
                      children: b("auth.passwordReqDigit")
                    })]
                  })]
                })]
              }), t.jsxs("div", {
                className: "auth-field",
                children: [t.jsx("label", {
                  htmlFor: "confirmPassword",
                  className: "auth-label",
                  children: b("auth.confirmPassword")
                }), t.jsxs("div", {
                  className: "auth-input-wrapper",
                  children: [t.jsx("input", {
                    id: "confirmPassword",
                    className: "auth-input",
                    type: F ? "text" : "password",
                    value: T,
                    onChange: e => {
                      A(e.target.value);
                      if ($) {
                        G(null);
                      }
                    },
                    autoComplete: "new-password",
                    required: true,
                    disabled: H
                  }), t.jsx("button", {
                    type: "button",
                    className: "auth-eye-btn",
                    onClick: () => R(e => !e),
                    "aria-label": F ? "Hide password" : "Show password",
                    tabIndex: -1,
                    children: t.jsx(x, {
                      open: F
                    })
                  })]
                })]
              }), t.jsx("button", {
                type: "submit",
                className: "auth-submit-btn",
                disabled: H,
                children: H ? t.jsx("span", {
                  className: "auth-btn-spinner"
                }) : b("auth.signUp")
              })]
            }), t.jsxs("p", {
              className: "auth-switch-text",
              children: [b("auth.alreadyHaveAccount"), " ", t.jsx("span", {
                className: "auth-switch-link",
                onClick: () => w("/signin"),
                children: b("auth.signIn")
              })]
            }), t.jsx("p", {
              className: "auth-terms",
              children: b("auth.termsAndPolicy")
            })]
          })
        })
      }), t.jsx("div", {
        className: "signup-right",
        children: t.jsx("div", {
          className: "signup-right-content",
          children: t.jsx(o, {})
        })
      }), t.jsxs("div", {
        className: "status-badge-container",
        children: [t.jsx("iframe", {
          src: "https://status.hyperknow.io/badge?theme=light",
          width: "190",
          height: "30",
          frameBorder: "0",
          scrolling: "no",
          title: b("auth.serviceStatus")
        }), t.jsx("div", {
          className: "status-badge-overlay",
          onClick: () => window.open("https://status.hyperknow.io", "_blank")
        })]
      })]
    })]
  });
};
export { v as default };