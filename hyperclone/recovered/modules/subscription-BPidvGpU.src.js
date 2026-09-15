import { g as e, c as s, b as a, j as n, K as l, u as c, r, a3 as i, a4 as t, a5 as o, a6 as p, F as d, a7 as u, a8 as m, a9 as h, aa as g, ab as x, ac as j, ad as N } from "./index-TjoB2Buo.js";
const f = ({
  isOpen: e,
  onClose: s,
  onConfirm: l
}) => {
  const {
    t: c
  } = a();
  if (e) {
    return n.jsx("div", {
      className: "alipay-notice-overlay",
      onClick: s,
      children: n.jsxs("div", {
        className: "alipay-notice-container",
        onClick: e => e.stopPropagation(),
        children: [n.jsxs("div", {
          className: "alipay-notice-icons",
          children: [n.jsx("img", {
            src: "/components/settings/alipay.svg",
            alt: "Alipay"
          }), n.jsx("img", {
            src: "/components/settings/wechat_pay.svg",
            alt: "WeChat Pay"
          })]
        }), n.jsx("h3", {
          className: "alipay-notice-title",
          children: c("alipayNotice.title")
        }), n.jsx("p", {
          className: "alipay-notice-message",
          children: c("alipayNotice.message")
        }), n.jsxs("div", {
          className: "alipay-notice-actions",
          children: [n.jsx("button", {
            className: "alipay-notice-btn alipay-notice-btn--cancel",
            onClick: s,
            children: c("alipayNotice.cancel")
          }), n.jsx("button", {
            className: "alipay-notice-btn alipay-notice-btn--confirm",
            onClick: l,
            children: c("alipayNotice.continue")
          })]
        })]
      })
    });
  } else {
    return null;
  }
};
const v = ({
  isOpen: e,
  phase: s,
  direction: c,
  planName: r,
  preview: i,
  cancelEffectiveAt: t,
  previewLoading: o,
  error: p,
  declineMessage: d = null,
  newMaxCredits: u = null,
  formatAmount: m,
  onClose: h,
  onConfirm: g,
  onOpenPaymentPage: x,
  onPaymentCompleted: j,
  onManagePaymentMethod: N
}) => {
  const {
    t: f,
    i18n: v
  } = a();
  if (!e) {
    return null;
  }
  const w = e => {
    try {
      return new Date(e * 1000).toLocaleDateString(l(v.language), {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    } catch {
      return "";
    }
  };
  const b = e => {
    const s = Math.floor(new Date(e).getTime() / 1000);
    if (Number.isFinite(s)) {
      return w(s);
    } else {
      return "";
    }
  };
  const _ = c === "cancel" ? t : (i == null ? undefined : i.effective_at) ?? null;
  const y = s === "processing" || s === "polling";
  const C = s === "success" ? f("planChange.successTitle", {
    plan: r
  }) : s === "failed" ? f("planChange.failedTitle") : s === "requiresAction" ? f("planChange.verifyTitle") : s === "timeout" ? f("planChange.timeoutTitle") : c === "upgrade" ? f("planChange.upgradeTitle", {
    plan: r
  }) : c === "downgrade" ? f("planChange.downgradeTitle", {
    plan: r
  }) : f("planChange.cancelTitle");
  const k = () => {
    if (c === "cancel") {
      return n.jsxs("div", {
        className: "pc-rows",
        children: [n.jsxs("div", {
          className: "pc-row pc-row--primary",
          children: [n.jsx("span", {
            className: "pc-row-label",
            children: f("planChange.accessUntil")
          }), n.jsx("span", {
            className: "pc-row-value pc-row-value--date",
            children: _ ? w(_) : "—"
          })]
        }), n.jsxs("div", {
          className: "pc-row",
          children: [n.jsx("span", {
            className: "pc-row-label",
            children: f("planChange.thenPlan")
          }), n.jsx("span", {
            className: "pc-row-value",
            children: f("planChange.freePlan")
          })]
        })]
      });
    }
    if (!i) {
      return null;
    }
    if (c === "downgrade") {
      return n.jsxs("div", {
        className: "pc-rows",
        children: [n.jsxs("div", {
          className: "pc-row pc-row--primary",
          children: [n.jsx("span", {
            className: "pc-row-label",
            children: f("planChange.effectiveOn")
          }), n.jsx("span", {
            className: "pc-row-value pc-row-value--date",
            children: _ ? w(_) : "—"
          })]
        }), n.jsxs("div", {
          className: "pc-row",
          children: [n.jsx("span", {
            className: "pc-row-label",
            children: f("planChange.thenMonthly")
          }), n.jsx("span", {
            className: "pc-row-value",
            children: m(i.recurring_amount, i.currency)
          })]
        }), n.jsxs("div", {
          className: "pc-row",
          children: [n.jsx("span", {
            className: "pc-row-label",
            children: f("planChange.credits")
          }), n.jsx("span", {
            className: "pc-row-value",
            children: f("planChange.creditsChange", {
              from: i.current_max_credits,
              to: i.new_max_credits
            })
          })]
        })]
      });
    }
    const e = n.jsxs(n.Fragment, {
      children: [!!i.credited_amount && n.jsxs("div", {
        className: "pc-row",
        children: [n.jsx("span", {
          className: "pc-row-label",
          children: f("planChange.credited")
        }), n.jsxs("span", {
          className: "pc-row-value",
          children: ["−", m(i.credited_amount, i.currency)]
        })]
      }), !!i.balance_applied && n.jsxs("div", {
        className: "pc-row",
        children: [n.jsx("span", {
          className: "pc-row-label",
          children: f("planChange.balanceApplied")
        }), n.jsxs("span", {
          className: "pc-row-value",
          children: ["−", m(i.balance_applied, i.currency)]
        })]
      })]
    });
    if (i.flow === "one_off") {
      return n.jsxs("div", {
        className: "pc-rows",
        children: [n.jsxs("div", {
          className: "pc-row pc-row--primary",
          children: [n.jsx("span", {
            className: "pc-row-label",
            children: f("planChange.dueToday")
          }), n.jsx("span", {
            className: "pc-row-value",
            children: m(i.amount_due, i.currency)
          })]
        }), e, n.jsxs("div", {
          className: "pc-row",
          children: [n.jsx("span", {
            className: "pc-row-label",
            children: f("planChange.accessUntil")
          }), n.jsx("span", {
            className: "pc-row-value",
            children: i.expires_at ? b(i.expires_at) : "—"
          })]
        }), n.jsxs("div", {
          className: "pc-row",
          children: [n.jsx("span", {
            className: "pc-row-label",
            children: f("planChange.credits")
          }), n.jsx("span", {
            className: "pc-row-value",
            children: f("planChange.creditsChange", {
              from: i.current_max_credits,
              to: i.new_max_credits
            })
          })]
        })]
      });
    } else {
      return n.jsxs("div", {
        className: "pc-rows",
        children: [n.jsxs("div", {
          className: "pc-row pc-row--primary",
          children: [n.jsx("span", {
            className: "pc-row-label",
            children: f("planChange.dueToday")
          }), n.jsx("span", {
            className: "pc-row-value",
            children: m(i.amount_due, i.currency)
          })]
        }), e, n.jsxs("div", {
          className: "pc-row",
          children: [n.jsx("span", {
            className: "pc-row-label",
            children: f("planChange.thenMonthly")
          }), n.jsxs("span", {
            className: "pc-row-value",
            children: [m(i.recurring_amount, i.currency), i.next_billing_at ? f("planChange.startingOn", {
              date: w(i.next_billing_at)
            }) : ""]
          })]
        }), n.jsxs("div", {
          className: "pc-row",
          children: [n.jsx("span", {
            className: "pc-row-label",
            children: f("planChange.credits")
          }), n.jsx("span", {
            className: "pc-row-value",
            children: f("planChange.creditsChange", {
              from: i.current_max_credits,
              to: i.new_max_credits
            })
          })]
        })]
      });
    }
  };
  const P = e => n.jsx("div", {
    className: "pc-skeleton-rows",
    children: Array.from({
      length: e
    }, (e, s) => n.jsxs("div", {
      className: "pc-skeleton-row" + (s === 0 ? " pc-skeleton-row--primary" : ""),
      children: [n.jsx("span", {
        className: "pc-skeleton-bar pc-skeleton-bar--label"
      }), n.jsx("span", {
        className: "pc-skeleton-bar pc-skeleton-bar--value"
      })]
    }, s))
  });
  const T = c === "upgrade" ? (i == null ? undefined : i.flow) === "one_off" ? f("planChange.oneOffUpgradeNote", {
    plan: r
  }) : f("planChange.upgradeNote") : f(c === "downgrade" ? "planChange.downgradeNote" : "planChange.cancelNote");
  return n.jsx("div", {
    className: "pc-overlay",
    onClick: y ? undefined : h,
    children: n.jsxs("div", {
      className: "pc-container",
      onClick: e => e.stopPropagation(),
      children: [n.jsx("h3", {
        className: "pc-title",
        children: C
      }), (() => {
        switch (s) {
          case "processing":
            return n.jsxs(n.Fragment, {
              children: [P(3), n.jsx("p", {
                className: "pc-note",
                children: f("planChange.processingNote")
              })]
            });
          case "requiresAction":
            return n.jsxs(n.Fragment, {
              children: [n.jsx("p", {
                className: "pc-message",
                children: f("planChange.verifyMessage")
              }), n.jsx("p", {
                className: "pc-note",
                children: f("planChange.verifyNote")
              })]
            });
          case "polling":
            return n.jsxs(n.Fragment, {
              children: [P(2), n.jsx("p", {
                className: "pc-note",
                children: f("planChange.pollingNote")
              })]
            });
          case "success":
            return n.jsx(n.Fragment, {
              children: n.jsx("p", {
                className: "pc-message pc-message--success",
                children: u ? f("planChange.successMessageWithCredits", {
                  plan: r,
                  credits: u
                }) : f("planChange.successMessage", {
                  plan: r
                })
              })
            });
          case "failed":
            return n.jsxs(n.Fragment, {
              children: [n.jsx("p", {
                className: "pc-error",
                children: d || f("planChange.failedFallback")
              }), n.jsx("p", {
                className: "pc-note",
                children: f("planChange.failedNote")
              })]
            });
          case "timeout":
            return n.jsxs(n.Fragment, {
              children: [n.jsx("p", {
                className: "pc-message",
                children: f("planChange.timeoutMessage")
              }), n.jsx("p", {
                className: "pc-note",
                children: f("planChange.timeoutNote")
              })]
            });
          default:
            if (o) {
              return P(3);
            } else if (p) {
              return n.jsx("p", {
                className: "pc-error",
                children: p
              });
            } else {
              return n.jsxs(n.Fragment, {
                children: [k(), n.jsx("p", {
                  className: "pc-note",
                  children: T
                })]
              });
            }
        }
      })(), n.jsx("div", {
        className: "pc-actions",
        children: (() => {
          switch (s) {
            case "processing":
            case "polling":
              return n.jsx("button", {
                className: "pc-btn pc-btn--dismiss",
                disabled: true,
                children: f("planChange.processing")
              });
            case "requiresAction":
              return n.jsxs(n.Fragment, {
                children: [n.jsx("button", {
                  className: "pc-btn pc-btn--dismiss",
                  onClick: j,
                  children: f("planChange.alreadyPaid")
                }), n.jsx("button", {
                  className: "pc-btn pc-btn--confirm",
                  onClick: x,
                  children: f("planChange.verifyCta")
                })]
              });
            case "success":
            case "timeout":
              return n.jsx("button", {
                className: "pc-btn pc-btn--confirm",
                onClick: h,
                children: f("planChange.done")
              });
            case "failed":
              return n.jsxs(n.Fragment, {
                children: [n.jsx("button", {
                  className: "pc-btn pc-btn--dismiss",
                  onClick: h,
                  children: f("planChange.dismiss")
                }), n.jsx("button", {
                  className: "pc-btn pc-btn--confirm",
                  onClick: N,
                  children: f("planChange.changePaymentMethod")
                })]
              });
            default:
              {
                const e = c === "cancel" || !o && !p && !!i;
                const s = c === "upgrade" ? (i == null ? undefined : i.flow) === "one_off" ? f("planChange.payInStripe") : f("planChange.payNow") : f(c === "downgrade" ? "planChange.confirmDowngrade" : "planChange.confirmCancel");
                return n.jsxs(n.Fragment, {
                  children: [n.jsx("button", {
                    className: "pc-btn pc-btn--dismiss",
                    onClick: h,
                    children: f("planChange.dismiss")
                  }), n.jsx("button", {
                    className: "pc-btn " + (c === "upgrade" ? "pc-btn--confirm" : "pc-btn--confirm-muted"),
                    onClick: g,
                    disabled: !e,
                    children: s
                  })]
                });
              }
          }
        })()
      })]
    })
  });
};
const w = {
  free: {
    prefix: "subscription.freePlan",
    count: 4
  },
  pro: {
    prefix: "subscription.proPlan",
    count: 5
  },
  max: {
    prefix: "subscription.maxPlan",
    count: 6
  }
};
function b(e, s) {
  const a = e.max_credits / e.reset_interval_hours;
  const n = s.max_credits / s.reset_interval_hours;
  if (!Number.isFinite(a) || !Number.isFinite(n) || a <= 0) {
    return null;
  }
  const l = Math.floor(n / a * 2) / 2;
  if (l >= 1.5) {
    return l;
  } else {
    return null;
  }
}
const _ = {
  free: {
    src: "/pages/mainPages/courses/question.png",
    animated: false
  },
  pro: {
    src: "/pages/mainPages/courses/climb-stairs.mp4",
    animated: true
  },
  max: {
    src: "/pages/mainPages/animations/char-complete-standing.mp4",
    animated: true
  }
};
const y = {
  pro: "subscription.tagMostPopular",
  max: "subscription.tagBestValue"
};
const C = () => {
  var C;
  const k = c();
  const {
    t: P,
    i18n: T
  } = a();
  const [M, S] = r.useState([]);
  const [O, F] = r.useState(null);
  const [E, A] = r.useState("unknown");
  const [$, L] = r.useState(true);
  const [D, R] = r.useState(null);
  const [q, W] = r.useState(null);
  const [K, U] = r.useState(null);
  const [B, H] = r.useState(null);
  const [z, I] = r.useState(false);
  const [J, V] = r.useState(null);
  const [G, Q] = r.useState(null);
  const [X, Y] = r.useState("confirm");
  const [Z, ee] = r.useState(null);
  const [se, ae] = r.useState(false);
  const [ne, le] = r.useState(null);
  const [ce, re] = r.useState("");
  const [ie, te] = r.useState(null);
  const [oe, pe] = r.useState(null);
  const [de, ue] = r.useState(null);
  const me = async () => {
    L(true);
    R(null);
    const e = await t();
    if ("success" in e) {
      R(e.message);
    } else {
      S(e.plans);
      F(e.current);
      A(o(e.country_code));
    }
    L(false);
  };
  r.useEffect(() => {
    me();
  }, []);
  r.useEffect(() => {
    const e = e => {
      if (!K) {
        return;
      }
      if (!e.target.closest(".sp-upgrade-btn-container")) {
        U(null);
      }
    };
    document.addEventListener("mousedown", e);
    return () => document.removeEventListener("mousedown", e);
  }, [K]);
  r.useEffect(() => {
    const e = e => {
      if (e.persisted) {
        W(null);
      }
    };
    window.addEventListener("pageshow", e);
    return () => window.removeEventListener("pageshow", e);
  }, []);
  const he = r.useMemo(() => M.filter(e => e.purchasable || e.tier === "free"), [M]);
  const ge = r.useMemo(() => M.find(e => e.plan_id === (O == null ? undefined : O.plan_id)) || null, [M, O]);
  const xe = r.useMemo(() => M.find(e => {
    var s;
    return e.plan_id === ((s = O == null ? undefined : O.pending_change) == null ? undefined : s.plan_id);
  }) || null, [M, O]);
  const je = (O == null ? undefined : O.rank) ?? 0;
  const Ne = (O == null ? undefined : O.pending_change) ?? null;
  const fe = r.useMemo(() => {
    const e = he.filter(e => e.purchasable && e.rank > je).sort((e, s) => e.rank - s.rank)[0];
    return (e == null ? undefined : e.plan_id) ?? null;
  }, [he, je]);
  const ve = e => {
    try {
      return new Date(e * 1000).toLocaleDateString(l(T.language), {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    } catch {
      return "";
    }
  };
  const we = async (a, n) => {
    W(a);
    U(null);
    H(null);
    const l = n === "alipay" ? await (async a => {
      try {
        const n = e();
        if (!n) {
          return {
            success: false,
            message: "No access token found. Please log in again.",
            error: "NO_TOKEN"
          };
        }
        const l = await fetch(s("/api/v1/stripe/checkout_one_off_price"), {
          method: "POST",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${n}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            plan_id: a
          })
        });
        if (l.ok) {
          return await l.json();
        } else {
          return {
            success: false,
            message: (await l.json().catch(() => ({}))).message || `HTTP error! status: ${l.status}`,
            error: `HTTP_${l.status}`
          };
        }
      } catch (n) {
        return {
          success: false,
          message: n instanceof Error ? n.message : "Unknown error occurred",
          error: "NETWORK_ERROR"
        };
      }
    })(a) : await (async (a, n) => {
      try {
        const l = e();
        if (!l) {
          return {
            success: false,
            message: "No access token found. Please log in again.",
            error: "NO_TOKEN"
          };
        }
        const c = await fetch(s("/api/v1/stripe/checkout"), {
          method: "POST",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${l}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            plan_id: a,
            ...(n && {
              payment_method: n
            })
          })
        });
        if (c.ok) {
          return await c.json();
        } else {
          return {
            success: false,
            message: (await c.json().catch(() => ({}))).message || `HTTP error! status: ${c.status}`,
            error: `HTTP_${c.status}`
          };
        }
      } catch (l) {
        return {
          success: false,
          message: l instanceof Error ? l.message : "Unknown error occurred",
          error: "NETWORK_ERROR"
        };
      }
    })(a);
    if ("url" in l) {
      window.location.href = l.url;
    } else {
      if ("success" in l) {
        H(l.message);
      }
      W(null);
    }
  };
  const be = async (e, s) => {
    Q({
      direction: e,
      plan: s
    });
    re(j());
    Y("confirm");
    ee(null);
    le(null);
    te(null);
    pe(null);
    ue(null);
    if (e === "cancel" || !(s == null ? undefined : s.plan_id)) {
      return;
    }
    ae(true);
    const a = await N(s.plan_id);
    if ("success" in a) {
      le(a.message);
    } else {
      ee(a);
    }
    ae(false);
  };
  const _e = () => {
    Q(null);
    Y("confirm");
    ee(null);
    le(null);
    te(null);
    pe(null);
    ue(null);
  };
  const ye = () => n.jsx("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    children: n.jsx("path", {
      d: "M5 13l4 4L19 7",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    })
  });
  const Ce = e => {
    const s = _[e.tier] ?? _.pro;
    return n.jsx("div", {
      className: "sp-card-art",
      children: s.animated ? n.jsx(d, {
        src: s.src,
        className: "sp-card-art-video"
      }) : n.jsx("img", {
        src: s.src,
        alt: "",
        className: "sp-card-art-image"
      })
    });
  };
  const ke = e => {
    const s = w[e.tier] || w.pro;
    return n.jsxs("ul", {
      className: "sp-features",
      children: [e.tier === "max" && n.jsxs("li", {
        className: "sp-feature-item",
        children: [n.jsx("span", {
          className: "sp-feature-icon",
          children: n.jsx(ye, {})
        }), n.jsx("span", {
          className: "sp-feature-text sp-feature-text--inherit",
          children: P("subscription.maxPlan.everythingInPro")
        })]
      }), Array.from({
        length: s.count
      }, (e, s) => s + 1).map(e => n.jsxs("li", {
        className: "sp-feature-item",
        children: [n.jsx("span", {
          className: "sp-feature-icon",
          children: n.jsx(ye, {})
        }), n.jsx("span", {
          className: "sp-feature-text",
          children: P(`${s.prefix}.feature${e}`)
        })]
      }, e))]
    });
  };
  const Pe = (e, s) => n.jsxs("div", {
    className: "sp-payment-menu",
    children: [n.jsx("div", {
      className: "sp-payment-menu-arrow"
    }), n.jsxs(n.Fragment, {
      children: [n.jsxs("button", {
        className: "sp-payment-item",
        onClick: s => {
          s.stopPropagation();
          we(e.plan_id, "card");
        },
        children: [n.jsx("img", {
          src: "/components/settings/card.svg",
          alt: "Card",
          className: "sp-payment-icon"
        }), n.jsx("span", {
          children: P("settings.cardAndOther")
        })]
      }), n.jsx("div", {
        className: "sp-payment-separator"
      })]
    }), n.jsxs("button", {
      className: "sp-payment-item",
      onClick: s => {
        s.stopPropagation();
        U(null);
        V(e.plan_id);
      },
      children: [n.jsxs("div", {
        className: "sp-payment-icons-group",
        children: [n.jsx("img", {
          src: "/components/settings/alipay.svg",
          alt: "Alipay",
          className: "sp-payment-icon-sm"
        }), n.jsx("img", {
          src: "/components/settings/wechat_pay.svg",
          alt: "WeChat Pay",
          className: "sp-payment-icon-sm"
        })]
      }), n.jsx("span", {
        children: P("settings.alipayWechat")
      })]
    })]
  });
  const Te = e => {
    const s = e.rank === je;
    const a = e.rank > je;
    const l = q === e.plan_id;
    const c = (Ne == null ? undefined : Ne.plan_id) === e.plan_id || (Ne == null ? undefined : Ne.type) === "cancel" && e.tier === "free";
    if (s) {
      return n.jsx("button", {
        className: "sp-btn sp-btn--current",
        disabled: true,
        children: P("subscription.currentPlan")
      });
    }
    if (c) {
      return n.jsx("button", {
        className: "sp-btn sp-btn--current",
        disabled: true,
        children: P("subscription.scheduled")
      });
    }
    if (!a) {
      if (!(O == null ? undefined : O.can_downgrade)) {
        return null;
      }
      const s = e.tier === "free" ? "cancel" : "downgrade";
      return n.jsx("button", {
        className: "sp-btn sp-btn--downgrade",
        onClick: () => {
          be(s, e.tier === "free" ? null : e);
        },
        children: s === "cancel" ? P("subscription.cancelSubscription") : P("subscription.downgradeTo", {
          plan: e.name
        })
      });
    }
    if (O == null ? undefined : O.can_change_plan) {
      return n.jsx("button", {
        className: "sp-btn sp-btn--upgrade",
        onClick: () => {
          be("upgrade", e);
        },
        children: P("subscription.upgradeTo", {
          plan: e.name
        })
      });
    }
    return n.jsxs("div", {
      className: "sp-upgrade-btn-container",
      children: [n.jsxs("button", {
        className: "sp-btn sp-btn--upgrade",
        onClick: s => {
          s.stopPropagation();
          if (!l) {
            if (E === "international") {
              we(e.plan_id, "card");
            } else {
              U(K === e.plan_id ? null : e.plan_id);
            }
          }
        },
        disabled: l,
        children: [l && n.jsx("span", {
          className: "sp-btn-spinner"
        }), P("subscription.upgradeTo", {
          plan: e.name
        })]
      }), K === e.plan_id && !l && Pe(e)]
    });
  };
  return n.jsxs("div", {
    className: "sp-page",
    children: [n.jsxs("div", {
      className: "sp-container",
      children: [n.jsxs("div", {
        className: "sp-header",
        children: [n.jsx("h2", {
          className: "sp-title",
          children: P("subscription.title")
        }), n.jsx("button", {
          className: "sp-close",
          onClick: () => k(-1),
          children: "×"
        })]
      }), D && n.jsx("div", {
        className: "sp-error-banner",
        children: D
      }), B && n.jsx("div", {
        className: "sp-error-banner",
        children: B
      }), !$ && (() => {
        if (!Ne) {
          return null;
        }
        const e = Ne.effective_at ? ve(Ne.effective_at) : "";
        const s = Ne.type === "cancel" ? P("subscription.pendingCancel", {
          date: e
        }) : P("subscription.pendingDowngrade", {
          plan: (xe == null ? undefined : xe.name) ?? "",
          date: e
        });
        return n.jsxs("div", {
          className: "sp-pending-banner",
          children: [n.jsx("span", {
            className: "sp-pending-text",
            children: s
          }), n.jsx("button", {
            className: "sp-pending-undo",
            onClick: () => {
              (async () => {
                I(true);
                H(null);
                const e = await x();
                I(false);
                if (!("success" in e) || e.success) {
                  await me();
                } else {
                  H(e.message);
                }
              })();
            },
            disabled: z,
            children: P(z ? "subscription.processing" : "subscription.undoChange")
          })]
        });
      })(), !$ && (() => {
        if ((O == null ? undefined : O.change_flow) !== "one_off" || !(O == null ? undefined : O.expires_at)) {
          return null;
        }
        const e = ve(Math.floor(new Date(O.expires_at).getTime() / 1000));
        const s = p(O.billing_reason) ? "subscription.grantNotice" : "subscription.oneOffNotice";
        return n.jsx("div", {
          className: "sp-oneoff-banner",
          children: n.jsx("span", {
            className: "sp-oneoff-text",
            children: P(s, {
              date: e
            })
          })
        });
      })(), n.jsx("div", {
        className: "sp-plans",
        children: $ ? [0, 1, 2].map(e => n.jsxs("div", {
          className: "sp-card sp-card--skeleton",
          children: [n.jsx("div", {
            className: "sp-skeleton sp-skeleton--art"
          }), n.jsxs("div", {
            className: "sp-card-header",
            children: [n.jsx("div", {
              className: "sp-skeleton sp-skeleton--name"
            }), n.jsx("div", {
              className: "sp-skeleton sp-skeleton--price"
            }), n.jsx("div", {
              className: "sp-skeleton sp-skeleton--desc"
            })]
          }), n.jsx("div", {
            className: "sp-features",
            children: [0, 1, 2, 3, 4].map(e => n.jsx("div", {
              className: "sp-skeleton sp-skeleton--feature"
            }, e))
          }), n.jsx("div", {
            className: "sp-skeleton sp-skeleton--btn"
          })]
        }, e)) : he.map(e => {
          const s = e.rank === je;
          const a = !!e.plan_id && e.plan_id === fe;
          const l = y[e.tier];
          const c = !!e.plan_id && K === e.plan_id;
          const r = !!(O == null ? undefined : O.is_legacy_plan) && e.tier === "pro" && e.rank > je;
          return n.jsxs("div", {
            className: `sp-card sp-card--${e.tier}${s ? " sp-card--active" : ""}${a ? " sp-card--recommended" : ""}${c ? " sp-card--menu-open" : ""}`,
            children: [l && n.jsx("span", {
              className: "sp-plan-tag" + (a ? " sp-plan-tag--highlight" : ""),
              children: P(l)
            }), Ce(e), n.jsxs("div", {
              className: "sp-card-header",
              children: [n.jsx("h3", {
                className: "sp-plan-name",
                children: e.name
              }), n.jsx("div", {
                className: "sp-price-row",
                children: e.price_usd > 0 ? n.jsxs(n.Fragment, {
                  children: [n.jsxs("span", {
                    className: "sp-price-amount",
                    children: ["$", e.price_usd]
                  }), n.jsx("span", {
                    className: "sp-price-period",
                    children: P("subscription.perMonth")
                  })]
                }) : n.jsx("span", {
                  className: "sp-price-amount sp-price-amount--free",
                  children: P("subscription.freePrice")
                })
              }), n.jsx("p", {
                className: "sp-plan-desc",
                children: P(`subscription.${e.tier}Plan.description`)
              })]
            }), ke(e), r && ge && n.jsx("div", {
              className: "sp-legacy-note",
              children: P("subscription." + (i = ge, t = e, b(i, t) === null ? "legacyPlanNoteMore" : t.price_usd === i.price_usd ? "legacyPlanNoteSamePrice" : "legacyPlanNoteMultiplier"), {
                price: e.price_usd,
                multiplier: b(ge, e)
              })
            }), Te(e)]
          }, e.plan_id ?? "free");
          var i;
          var t;
        })
      })]
    }), n.jsx(f, {
      isOpen: !!J,
      onClose: () => V(null),
      onConfirm: () => {
        const e = J;
        V(null);
        if (e) {
          we(e, "alipay");
        }
      }
    }), n.jsx(v, {
      isOpen: !!G,
      phase: X,
      direction: (G == null ? undefined : G.direction) ?? "upgrade",
      planName: ((C = G == null ? undefined : G.plan) == null ? undefined : C.name) ?? "",
      preview: Z,
      cancelEffectiveAt: (O == null ? undefined : O.expires_at) ? Math.floor(new Date(O.expires_at).getTime() / 1000) : null,
      previewLoading: se,
      error: ne,
      declineMessage: oe,
      newMaxCredits: de,
      formatAmount: i,
      onClose: () => {
        (async () => {
          const e = X === "success" || X === "timeout";
          _e();
          if (e) {
            await me();
          }
        })();
      },
      onConfirm: () => {
        (async () => {
          var e;
          var s;
          if (!G) {
            return;
          }
          if (G.direction !== "upgrade") {
            Y("processing");
            const s = G.direction === "cancel" ? await h() : ((e = G.plan) == null ? undefined : e.plan_id) ? await g(G.plan.plan_id) : null;
            if (s) {
              if ("success" in s) {
                Y("confirm");
                le(s.message);
                return;
              } else {
                _e();
                await me();
                return;
              }
            } else {
              return Y("confirm");
            }
          }
          if (!((s = G.plan) == null ? undefined : s.plan_id)) {
            return;
          }
          Y("processing");
          const a = await g(G.plan.plan_id, ce);
          if ("success" in a) {
            Y("confirm");
            le(a.message);
            return;
          }
          if (a.status === "checkout_required" && a.checkout_url) {
            window.location.href = a.checkout_url;
          } else {
            te(a.hosted_invoice_url ?? null);
            pe(a.failure_reason === "no_payment_method" ? P("planChange.noPaymentMethod") : a.decline_message ?? null);
            ue(a.max_credits ?? null);
            switch (a.payment_status) {
              case "paid":
                Y("success");
                await me();
                break;
              case "requires_action":
                Y("requiresAction");
                break;
              default:
                Y("failed");
            }
          }
        })();
      },
      onOpenPaymentPage: () => {
        if (ie) {
          window.open(ie, "_blank", "noopener,noreferrer");
        }
      },
      onPaymentCompleted: () => {
        (async () => {
          var e;
          const s = (e = G == null ? undefined : G.plan) == null ? undefined : e.plan_id;
          if (!s) {
            return;
          }
          Y("polling");
          const a = await m(s);
          Y(a === "applied" ? "success" : "timeout");
          await me();
        })();
      },
      onManagePaymentMethod: () => {
        (async () => {
          const e = await u();
          if ("url" in e && e.url) {
            window.open(e.url, "_blank", "noopener,noreferrer");
          }
        })();
      }
    })]
  });
};
export { C as default };