import { b as a, r as e, j as s, m as i } from "./index-TjoB2Buo.js"; /* empty css                                */ /* empty css                       */
const n = {
  loading: "paymentValidation.simulateTabLoading",
  error: "paymentValidation.simulateTabError",
  failure: "paymentValidation.simulateTabFailure"
};
const t = () => {
  const {
    t: t
  } = a();
  const [l, r] = e.useState("loading");
  const [c, o] = e.useState(false);
  const d = () => {
    r("loading");
    o(false);
  };
  const p = () => o(a => !a);
  return s.jsxs("div", {
    className: "pro-success-page",
    children: [s.jsx("div", {
      style: {
        position: "fixed",
        top: 16,
        right: 16,
        zIndex: 100,
        display: "flex",
        gap: 8,
        background: "rgba(0,0,0,0.75)",
        padding: "8px 12px",
        borderRadius: 10
      },
      children: ["loading", "error", "failure"].map(a => s.jsx("button", {
        type: "button",
        onClick: () => {
          r(a);
          o(false);
        },
        style: {
          padding: "4px 12px",
          borderRadius: 6,
          border: "none",
          cursor: "pointer",
          fontSize: 12,
          fontWeight: 600,
          background: l === a ? "#ffffff" : "rgba(255,255,255,0.15)",
          color: l === a ? "#0f172a" : "#ffffff"
        },
        children: t(n[a])
      }, a))
    }), s.jsxs("div", {
      className: "pro-success-content",
      children: [l === "loading" ? s.jsxs(s.Fragment, {
        children: [s.jsx(i.div, {
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
          children: s.jsxs("div", {
            className: "pro-success-card-inner",
            children: [s.jsx("div", {
              className: "loading-spinner-success",
              style: {
                margin: "8px auto 4px"
              }
            }), s.jsx("p", {
              className: "pro-success-renewal",
              style: {
                textAlign: "center"
              },
              children: t("paymentValidation.loadingCard")
            })]
          })
        }, "loading-card"), s.jsxs(i.div, {
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
          children: [s.jsx("h1", {
            className: "pro-success-title",
            children: t("paymentValidation.loadingTitle")
          }), s.jsx("p", {
            className: "pro-success-subtitle",
            children: t("paymentValidation.loadingSubtitle")
          })]
        }, "loading-headline")]
      }) : l === "error" ? s.jsxs(s.Fragment, {
        children: [s.jsx(i.div, {
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
          children: s.jsxs("div", {
            className: "pro-success-card-inner",
            children: [s.jsx("p", {
              className: "pro-success-renewal",
              children: t("paymentValidation.errors.unexpected")
            }), s.jsx("p", {
              className: "pro-success-renewal",
              style: {
                marginTop: 8
              },
              children: t("paymentValidation.refreshHint")
            }), s.jsx("p", {
              className: "pro-success-renewal",
              style: {
                marginTop: 8
              },
              children: t("paymentValidation.courtesyRefund")
            })]
          })
        }, "error-card"), s.jsx(i.div, {
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
          children: s.jsx("h1", {
            className: "pro-success-title",
            children: t("paymentValidation.somethingWrongTitle")
          })
        }, "error-headline"), s.jsxs(i.div, {
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
          children: [s.jsx("button", {
            className: "pro-success-btn-primary",
            onClick: d,
            children: t("paymentValidation.tryAgain")
          }), s.jsx("button", {
            className: "btn-secondary-success",
            style: {
              marginTop: 12
            },
            onClick: p,
            children: t("paymentValidation.contactSupport")
          })]
        }, "error-actions")]
      }) : s.jsxs(s.Fragment, {
        children: [s.jsx(i.div, {
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
          children: s.jsxs("div", {
            className: "pro-success-card-inner",
            children: [s.jsxs("div", {
              className: "failure-details",
              children: [s.jsx("h3", {
                className: "failure-section-title",
                children: t("paymentValidation.validationChecksTitle")
              }), s.jsxs("div", {
                className: "failure-detail-grid",
                children: [s.jsxs("div", {
                  className: "failure-detail-item",
                  children: [s.jsx("span", {
                    className: "failure-detail-key",
                    children: t("paymentValidation.stripePayment")
                  }), s.jsx("span", {
                    className: "failure-detail-val ok",
                    children: t("paymentValidation.statusPaid")
                  })]
                }), s.jsxs("div", {
                  className: "failure-detail-item",
                  children: [s.jsx("span", {
                    className: "failure-detail-key",
                    children: t("paymentValidation.databaseRecord")
                  }), s.jsx("span", {
                    className: "failure-detail-val err",
                    children: t("paymentValidation.statusNotFound")
                  })]
                }), s.jsxs("div", {
                  className: "failure-detail-item",
                  children: [s.jsx("span", {
                    className: "failure-detail-key",
                    children: t("paymentValidation.ownership")
                  }), s.jsx("span", {
                    className: "failure-detail-val err",
                    children: t("paymentValidation.statusNotVerified")
                  })]
                })]
              })]
            }), s.jsx("p", {
              className: "pro-success-renewal",
              style: {
                marginTop: 16
              },
              children: t("paymentValidation.refreshHint")
            }), s.jsx("p", {
              className: "pro-success-renewal",
              style: {
                marginTop: 10
              },
              children: t("paymentValidation.failureSummary")
            }), s.jsx("p", {
              className: "pro-success-renewal",
              style: {
                marginTop: 10
              },
              children: t("paymentValidation.courtesyRefund")
            })]
          })
        }, "failure-card"), s.jsxs(i.div, {
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
          children: [s.jsx("button", {
            className: "pro-success-btn-primary",
            onClick: d,
            children: t("paymentValidation.tryAgain")
          }), s.jsx("button", {
            className: "btn-secondary-success",
            style: {
              marginTop: 12
            },
            onClick: p,
            children: t("paymentValidation.contactSupport")
          })]
        }, "failure-actions")]
      }), c && s.jsxs(i.div, {
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
        children: [s.jsx("p", {
          className: "support-panel-text",
          children: t("paymentValidation.supportScreenshotPrompt")
        }), s.jsx("a", {
          className: "support-panel-email",
          href: `mailto:public-mail@hyperknow.io?subject=${encodeURIComponent(t("paymentValidation.mailSubject"))}`,
          children: "public-mail@hyperknow.io"
        }), s.jsx("p", {
          className: "support-panel-text",
          children: t("paymentValidation.supportRefundFollowUp")
        })]
      })]
    })]
  });
};
export { t as default };