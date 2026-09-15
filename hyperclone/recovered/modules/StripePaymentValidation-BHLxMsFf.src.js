import { g as a, c as s, A as e, u as i, b as t, a as n, r, j as c, m as o, i as l } from "./index-TjoB2Buo.js";
import { P as d, a as p } from "./ProSuccessCelebration-BLjYKG3E.js"; /* empty css                                */ /* empty css                       */
function u(a, s) {
  return new Promise((e, i) => {
    if (s == null ? undefined : s.aborted) {
      i(new DOMException("Aborted", "AbortError"));
      return;
    }
    const t = window.setTimeout(() => {
      if (s != null) {
        s.removeEventListener("abort", n);
      }
      e();
    }, a);
    const n = () => {
      window.clearTimeout(t);
      if (s != null) {
        s.removeEventListener("abort", n);
      }
      i(new DOMException("Aborted", "AbortError"));
    };
    if (s != null) {
      s.addEventListener("abort", n, {
        once: true
      });
    }
  });
}
function m(a) {
  if (a.success) {
    return false;
  }
  const s = "error" in a ? a.error : undefined;
  return s === "NO_TOKEN" || s === "HTTP_401";
}
const y = async i => {
  try {
    const t = a();
    if (!t) {
      return {
        success: false,
        message: "No access token found. Please log in again.",
        error: "NO_TOKEN"
      };
    }
    const n = await fetch(s(e.ENDPOINTS.STRIPE_VALIDATE_SUBSCRIPTION), {
      method: "POST",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${t}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        CHECKOUT_SESSION_ID: i
      })
    });
    if (!n.ok) {
      return {
        success: false,
        message: (await n.json().catch(() => ({}))).message || `HTTP error! status: ${n.status}`,
        error: `HTTP_${n.status}`
      };
    }
    return await n.json();
  } catch (t) {
    return {
      success: false,
      message: t instanceof Error ? t.message : "Unknown error occurred",
      error: "NETWORK_ERROR"
    };
  }
};
const h = () => {
  const a = i();
  const {
    t: s
  } = t();
  const [e] = n();
  const [h, x] = r.useState(true);
  const [j, N] = r.useState(null);
  const [f, v] = r.useState(null);
  const [g, b] = r.useState(false);
  const [w, V] = r.useState(false);
  const T = r.useRef(null);
  const S = r.useRef(null);
  r.useEffect(() => {
    const a = new AbortController();
    (async () => {
      if (!l()) {
        v("notLoggedIn");
        x(false);
        return;
      }
      const s = e.get("session_id");
      if (!s) {
        v("noSessionId");
        x(false);
        return;
      }
      try {
        const {
          result: e
        } = await async function (a, s) {
          const e = s == null ? undefined : s.signal;
          const i = Date.now() + 8000;
          let t = null;
          try {
            while (Date.now() < i) {
              const s = await y(a);
              t = s;
              if (s.success) {
                return {
                  ok: true,
                  result: s
                };
              }
              if (m(s)) {
                return {
                  ok: false,
                  result: s
                };
              }
              const n = i - Date.now();
              if (n <= 0) {
                break;
              }
              const r = Math.min(1500, n);
              await u(r, e);
            }
          } catch (n) {
            if (n instanceof DOMException && n.name === "AbortError") {
              return {
                ok: false,
                result: t
              };
            }
            throw n;
          }
          return {
            ok: false,
            result: t
          };
        }(s, {
          signal: a.signal
        });
        if (a.signal.aborted) {
          return;
        }
        N(e);
      } catch (i) {
        if (a.signal.aborted) {
          return;
        }
        v("unexpected");
      } finally {
        if (!a.signal.aborted) {
          x(false);
        }
      }
    })();
    return () => a.abort();
  }, [e]);
  r.useEffect(() => {
    const a = T.current;
    const s = S.current;
    if (!a || !s) {
      return;
    }
    a.style.height = `${s.offsetHeight}px`;
    const e = new ResizeObserver(() => {
      a.style.height = `${s.offsetHeight}px`;
    });
    e.observe(s);
    return () => {
      e.disconnect();
    };
  }, [h, f, j]);
  const _ = () => {
    b(true);
  };
  const k = () => {
    b(false);
    a("/");
  };
  const E = () => {
    window.location.reload();
  };
  const P = () => V(a => !a);
  if (h) {
    return c.jsx("div", {
      className: "pro-success-page",
      children: c.jsxs("div", {
        className: "pro-success-content",
        children: [c.jsx(o.div, {
          className: "pro-success-card pro-success-card--light",
          initial: {
            opacity: 0,
            y: 20
          },
          animate: {
            opacity: 1,
            y: 0
          },
          transition: {
            duration: 0.5
          },
          children: c.jsxs("div", {
            className: "pro-success-card-inner",
            children: [c.jsx("div", {
              className: "loading-spinner-success",
              style: {
                margin: "8px auto 4px"
              }
            }), c.jsx("p", {
              className: "pro-success-renewal",
              style: {
                textAlign: "center"
              },
              children: s("paymentValidation.loadingCard")
            })]
          })
        }), c.jsxs(o.div, {
          className: "pro-success-headline",
          initial: {
            opacity: 0,
            y: 16
          },
          animate: {
            opacity: 1,
            y: 0
          },
          transition: {
            duration: 0.5,
            delay: 0.2
          },
          children: [c.jsx("h1", {
            className: "pro-success-title",
            children: s("paymentValidation.loadingTitle")
          }), c.jsx("p", {
            className: "pro-success-subtitle",
            children: s("paymentValidation.loadingSubtitle")
          })]
        })]
      })
    });
  }
  if (f) {
    return c.jsx("div", {
      className: "pro-success-page",
      children: c.jsxs("div", {
        className: "pro-success-content",
        children: [c.jsx(o.div, {
          className: "pro-success-card pro-success-card--light",
          initial: {
            opacity: 0,
            y: 20
          },
          animate: {
            opacity: 1,
            y: 0
          },
          transition: {
            duration: 0.5
          },
          children: c.jsxs("div", {
            className: "pro-success-card-inner",
            children: [c.jsx("p", {
              className: "pro-success-renewal",
              children: s(`paymentValidation.errors.${f}`)
            }), c.jsx("p", {
              className: "pro-success-renewal",
              style: {
                marginTop: 8
              },
              children: s("paymentValidation.refreshHint")
            }), c.jsx("p", {
              className: "pro-success-renewal",
              style: {
                marginTop: 8
              },
              children: s("paymentValidation.courtesyRefund")
            })]
          })
        }), c.jsx(o.div, {
          className: "pro-success-headline",
          initial: {
            opacity: 0,
            y: 16
          },
          animate: {
            opacity: 1,
            y: 0
          },
          transition: {
            duration: 0.5,
            delay: 0.2
          },
          children: c.jsx("h1", {
            className: "pro-success-title",
            children: s("paymentValidation.somethingWrongTitle")
          })
        }), c.jsxs(o.div, {
          className: "pro-success-actions compact",
          initial: {
            opacity: 0,
            y: 16
          },
          animate: {
            opacity: 1,
            y: 0
          },
          transition: {
            duration: 0.5,
            delay: 0.4
          },
          children: [c.jsx("button", {
            className: "pro-success-btn-primary",
            onClick: E,
            children: s("paymentValidation.tryAgain")
          }), c.jsx("button", {
            className: "btn-secondary-success",
            style: {
              marginTop: 12
            },
            onClick: P,
            children: s("paymentValidation.contactSupport")
          })]
        }), w && c.jsxs(o.div, {
          className: "support-panel",
          initial: {
            opacity: 0,
            y: 8
          },
          animate: {
            opacity: 1,
            y: 0
          },
          transition: {
            duration: 0.3
          },
          children: [c.jsx("p", {
            className: "support-panel-text",
            children: s("paymentValidation.supportScreenshotPrompt")
          }), c.jsx("a", {
            className: "support-panel-email",
            href: `mailto:public-mail@hyperknow.io?subject=${encodeURIComponent(s("paymentValidation.mailSubject"))}`,
            children: "public-mail@hyperknow.io"
          }), c.jsx("p", {
            className: "support-panel-text",
            children: s("paymentValidation.supportRefundFollowUp")
          })]
        })]
      })
    });
  }
  if (!j) {
    return c.jsx("div", {
      className: "pro-success-page",
      children: c.jsxs("div", {
        className: "pro-success-content",
        children: [c.jsx(o.div, {
          className: "pro-success-card pro-success-card--light",
          initial: {
            opacity: 0,
            y: 20
          },
          animate: {
            opacity: 1,
            y: 0
          },
          transition: {
            duration: 0.5
          },
          children: c.jsx("div", {
            className: "pro-success-card-inner",
            children: c.jsxs("p", {
              className: "pro-success-renewal",
              children: [s("paymentValidation.noServerResponse"), " ", s("paymentValidation.refreshHint")]
            })
          })
        }), c.jsxs(o.div, {
          className: "pro-success-headline",
          initial: {
            opacity: 0,
            y: 16
          },
          animate: {
            opacity: 1,
            y: 0
          },
          transition: {
            duration: 0.5,
            delay: 0.2
          },
          children: [c.jsx("h1", {
            className: "pro-success-title",
            children: s("paymentValidation.couldntProcessTitle")
          }), c.jsx("p", {
            className: "pro-success-subtitle",
            children: s("paymentValidation.noResultSubtitle")
          })]
        }), c.jsx(o.div, {
          className: "pro-success-actions",
          initial: {
            opacity: 0,
            y: 16
          },
          animate: {
            opacity: 1,
            y: 0
          },
          transition: {
            duration: 0.5,
            delay: 0.4
          },
          children: c.jsx("button", {
            className: "pro-success-btn-primary",
            onClick: E,
            children: s("paymentValidation.tryAgain")
          })
        })]
      })
    });
  }
  if (j.success) {
    return c.jsxs(c.Fragment, {
      children: [c.jsx(d, {
        tier: j.subscription_details.tier,
        onContinue: _
      }), c.jsx(p, {
        isOpen: g,
        onClose: k
      })]
    });
  }
  const R = j && "stripe_payment" in j && "database_validation" in j ? j : null;
  return c.jsx("div", {
    className: "pro-success-page",
    children: c.jsxs("div", {
      className: "pro-success-content",
      children: [c.jsx(o.div, {
        className: "pro-success-card pro-success-card--light",
        initial: {
          opacity: 0,
          y: 20
        },
        animate: {
          opacity: 1,
          y: 0
        },
        transition: {
          duration: 0.5
        },
        children: c.jsxs("div", {
          className: "pro-success-card-inner",
          children: [R && c.jsxs("div", {
            className: "failure-details",
            children: [c.jsx("h3", {
              className: "failure-section-title",
              children: s("paymentValidation.validationChecksTitle")
            }), c.jsxs("div", {
              className: "failure-detail-grid",
              children: [c.jsxs("div", {
                className: "failure-detail-item",
                children: [c.jsx("span", {
                  className: "failure-detail-key",
                  children: s("paymentValidation.stripePayment")
                }), c.jsx("span", {
                  className: "failure-detail-val " + (R.stripe_payment.is_paid ? "ok" : "err"),
                  children: R.stripe_payment.is_paid ? s("paymentValidation.statusPaid") : s("paymentValidation.statusNotPaid")
                })]
              }), c.jsxs("div", {
                className: "failure-detail-item",
                children: [c.jsx("span", {
                  className: "failure-detail-key",
                  children: s("paymentValidation.databaseRecord")
                }), c.jsx("span", {
                  className: "failure-detail-val " + (R.database_validation.is_found ? "ok" : "err"),
                  children: R.database_validation.is_found ? s("paymentValidation.statusFound") : s("paymentValidation.statusNotFound")
                })]
              }), c.jsxs("div", {
                className: "failure-detail-item",
                children: [c.jsx("span", {
                  className: "failure-detail-key",
                  children: s("paymentValidation.ownership")
                }), c.jsx("span", {
                  className: "failure-detail-val " + (R.database_validation.is_owner ? "ok" : "err"),
                  children: R.database_validation.is_owner ? s("paymentValidation.statusVerified") : s("paymentValidation.statusNotVerified")
                })]
              })]
            })]
          }), c.jsx("p", {
            className: "pro-success-renewal",
            style: {
              marginTop: R ? 16 : 0
            },
            children: s("paymentValidation.refreshHint")
          }), c.jsx("p", {
            className: "pro-success-renewal",
            style: {
              marginTop: 10
            },
            children: s("paymentValidation.failureSummary")
          }), c.jsx("p", {
            className: "pro-success-renewal",
            style: {
              marginTop: 10
            },
            children: s("paymentValidation.courtesyRefund")
          })]
        })
      }), c.jsxs(o.div, {
        className: "pro-success-actions compact",
        initial: {
          opacity: 0,
          y: 16
        },
        animate: {
          opacity: 1,
          y: 0
        },
        transition: {
          duration: 0.5,
          delay: 0.4
        },
        children: [c.jsx("button", {
          className: "pro-success-btn-primary",
          onClick: E,
          children: s("paymentValidation.tryAgain")
        }), c.jsx("button", {
          className: "btn-secondary-success",
          style: {
            marginTop: 12
          },
          onClick: P,
          children: s("paymentValidation.contactSupport")
        })]
      }), w && c.jsxs(o.div, {
        className: "support-panel",
        initial: {
          opacity: 0,
          y: 8
        },
        animate: {
          opacity: 1,
          y: 0
        },
        transition: {
          duration: 0.3
        },
        children: [c.jsx("p", {
          className: "support-panel-text",
          children: s("paymentValidation.supportScreenshotPrompt")
        }), c.jsx("a", {
          className: "support-panel-email",
          href: `mailto:public-mail@hyperknow.io?subject=${encodeURIComponent(s("paymentValidation.mailSubject"))}`,
          children: "public-mail@hyperknow.io"
        }), c.jsx("p", {
          className: "support-panel-text",
          children: s("paymentValidation.supportRefundFollowUp")
        })]
      })]
    })
  });
};
export { h as default };