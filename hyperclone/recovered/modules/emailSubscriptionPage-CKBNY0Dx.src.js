import { A as e, k as s, b as a, r as l, j as c } from "./index-TjoB2Buo.js";
const i = () => {
  const i = s();
  const {
    t: n
  } = a();
  const [t, r] = l.useState(false);
  const [o, d] = l.useState(false);
  const [m, h] = l.useState(false);
  const [x, b] = l.useState(true);
  const [u, N] = l.useState(false);
  const [j, p] = l.useState(null);
  const [k, v] = l.useState(null);
  const [f, g] = l.useState(null);
  l.useEffect(() => {
    const e = new URLSearchParams(i.search).get("email");
    const s = e ? decodeURIComponent(e) : null;
    if (s) {
      g(s);
      y(s);
    } else {
      v(n("emailPreferences.errors.invalidOrMissingEmail"));
      b(false);
    }
  }, [i]);
  const y = async s => {
    b(true);
    try {
      const a = await (async s => {
        try {
          const a = await fetch(`${e.BACKEND_URL}${e.ENDPOINTS.CHECK_EMAIL_SUBSCRIPTION}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              accept: "application/json"
            },
            body: JSON.stringify({
              email: s
            })
          });
          if (!a.ok) {
            throw new Error(`HTTP error! status: ${a.status}`);
          }
          return await a.json();
        } catch (k) {
          return {
            success: false,
            data: {
              user_id: "",
              functionality_email_enabled: false,
              proactive_daily_email_feed: false,
              engagement_email_enabled: false
            },
            error: k instanceof Error ? k.message : "Unknown error"
          };
        }
      })(s);
      if (a.success && a.data) {
        r(a.data.functionality_email_enabled);
        d(a.data.proactive_daily_email_feed);
        h(a.data.engagement_email_enabled);
      } else {
        v(a.error || n("emailPreferences.errors.fetchFailed"));
      }
    } catch (a) {
      v(n("emailPreferences.errors.fetchError"));
    } finally {
      b(false);
    }
  };
  if (x) {
    return c.jsx("div", {
      className: "subscription-container",
      children: c.jsxs("div", {
        className: "subscription-box",
        children: [c.jsx("div", {
          className: "skeleton-header",
          children: c.jsx("div", {
            className: "skeleton skeleton-logo"
          })
        }), c.jsx("div", {
          className: "skeleton skeleton-title"
        }), c.jsx("div", {
          className: "skeleton skeleton-subtitle"
        }), c.jsxs("div", {
          className: "skeleton-form-group",
          children: [c.jsx("div", {
            className: "skeleton skeleton-checkbox"
          }), c.jsxs("div", {
            className: "skeleton-label",
            children: [c.jsx("div", {
              className: "skeleton skeleton-label-title"
            }), c.jsx("div", {
              className: "skeleton skeleton-label-desc"
            })]
          })]
        }), c.jsxs("div", {
          className: "skeleton-form-group",
          children: [c.jsx("div", {
            className: "skeleton skeleton-checkbox"
          }), c.jsxs("div", {
            className: "skeleton-label",
            children: [c.jsx("div", {
              className: "skeleton skeleton-label-title"
            }), c.jsx("div", {
              className: "skeleton skeleton-label-desc"
            })]
          })]
        }), c.jsxs("div", {
          className: "skeleton-form-group",
          children: [c.jsx("div", {
            className: "skeleton skeleton-checkbox"
          }), c.jsxs("div", {
            className: "skeleton-label",
            children: [c.jsx("div", {
              className: "skeleton skeleton-label-title"
            }), c.jsx("div", {
              className: "skeleton skeleton-label-desc"
            })]
          })]
        }), c.jsx("div", {
          className: "skeleton skeleton-button"
        })]
      })
    });
  } else if (k && !f) {
    return c.jsx("div", {
      className: "subscription-container",
      children: c.jsx("div", {
        className: "subscription-box",
        children: c.jsx("div", {
          className: "error-message",
          children: k
        })
      })
    });
  } else {
    return c.jsx("div", {
      className: "subscription-container",
      children: c.jsxs("div", {
        className: "subscription-box",
        children: [c.jsx("div", {
          className: "brand-header",
          children: c.jsx("img", {
            src: "/hyperknow-logo-w-text.svg",
            alt: "Hyperknow Logo",
            className: "brand-logo"
          })
        }), c.jsx("h1", {
          className: "subscription-title",
          children: n("emailPreferences.title")
        }), c.jsx("p", {
          className: "subscription-subtitle",
          children: n("emailPreferences.subtitle")
        }), k && c.jsx("div", {
          className: "error-message",
          children: k
        }), j && c.jsx("div", {
          className: "success-message",
          children: j
        }), c.jsx("div", {
          className: "form-group",
          children: c.jsxs("label", {
            className: "checkbox-label",
            children: [c.jsx("div", {
              className: "checkbox-wrapper",
              children: c.jsx("input", {
                type: "checkbox",
                checked: t,
                onChange: e => r(e.target.checked),
                className: "custom-checkbox"
              })
            }), c.jsxs("div", {
              className: "label-text",
              children: [c.jsx("span", {
                className: "label-title",
                children: n("emailPreferences.functionalityTitle")
              }), c.jsx("span", {
                className: "label-description",
                children: n("emailPreferences.functionalityDescription")
              })]
            })]
          })
        }), c.jsx("div", {
          className: "form-group",
          children: c.jsxs("label", {
            className: "checkbox-label",
            children: [c.jsx("div", {
              className: "checkbox-wrapper",
              children: c.jsx("input", {
                type: "checkbox",
                checked: o,
                onChange: e => d(e.target.checked),
                className: "custom-checkbox"
              })
            }), c.jsxs("div", {
              className: "label-text",
              children: [c.jsx("span", {
                className: "label-title",
                children: n("emailPreferences.proactiveTitle")
              }), c.jsx("span", {
                className: "label-description",
                children: n("emailPreferences.proactiveDescription")
              })]
            })]
          })
        }), c.jsx("div", {
          className: "form-group",
          children: c.jsxs("label", {
            className: "checkbox-label",
            children: [c.jsx("div", {
              className: "checkbox-wrapper",
              children: c.jsx("input", {
                type: "checkbox",
                checked: m,
                onChange: e => h(e.target.checked),
                className: "custom-checkbox"
              })
            }), c.jsxs("div", {
              className: "label-text",
              children: [c.jsx("span", {
                className: "label-title",
                children: n("emailPreferences.engagementTitle")
              }), c.jsx("span", {
                className: "label-description",
                children: n("emailPreferences.engagementDescription")
              })]
            })]
          })
        }), c.jsx("div", {
          className: "actions",
          children: c.jsx("button", {
            onClick: async () => {
              if (f) {
                N(true);
                p(null);
                v(null);
                try {
                  const s = await (async (s, a) => {
                    try {
                      const l = {
                        email: s
                      };
                      if (a.functionalityEmailEnabled !== undefined) {
                        l.functionality_email_enabled = a.functionalityEmailEnabled;
                      }
                      if (a.proactiveDailyEmailFeed !== undefined) {
                        l.proactive_daily_email_feed = a.proactiveDailyEmailFeed;
                      }
                      if (a.engagementEmailEnabled !== undefined) {
                        l.engagement_email_enabled = a.engagementEmailEnabled;
                      }
                      const c = await fetch(`${e.BACKEND_URL}${e.ENDPOINTS.EDIT_EMAIL_SUBSCRIPTION}`, {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                          accept: "application/json"
                        },
                        body: JSON.stringify(l)
                      });
                      if (!c.ok) {
                        throw new Error(`HTTP error! status: ${c.status}`);
                      }
                      return await c.json();
                    } catch (k) {
                      return {
                        success: false,
                        error: k instanceof Error ? k.message : "Unknown error"
                      };
                    }
                  })(f, {
                    functionalityEmailEnabled: t,
                    proactiveDailyEmailFeed: o,
                    engagementEmailEnabled: m
                  });
                  if (s.success) {
                    p(n("emailPreferences.saveSuccess"));
                  } else {
                    v(s.error || n("emailPreferences.errors.saveFailed"));
                  }
                } catch (s) {
                  v(n("emailPreferences.errors.saveError"));
                } finally {
                  N(false);
                }
              }
            },
            disabled: u,
            className: "save-button",
            children: n(u ? "emailPreferences.saving" : "emailPreferences.saveButton")
          })
        })]
      })
    });
  }
};
export { i as default };