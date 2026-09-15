import { u as o, k as e, b as n, r as t, j as a, m as i } from "./index-TjoB2Buo.js";
const s = () => {
  var s;
  const c = o();
  const r = e();
  const {
    t: l
  } = n();
  const [d, p] = t.useState(false);
  const [u, h] = t.useState(null);
  const m = t.useMemo(() => {
    const o = r.state;
    if ((o == null ? undefined : o.couponCodes) && Array.isArray(o.couponCodes)) {
      return o.couponCodes;
    } else if (o == null ? undefined : o.couponCode) {
      return [{
        code: o.couponCode,
        description: l("coupon.defaultFriendReferralDiscount")
      }];
    } else {
      return [];
    }
  }, [r.state, l]);
  t.useEffect(() => {
    if (m.length === 0) {
      c("/", {
        replace: true
      });
    }
  }, [m.length, c]);
  if (m.length === 0) {
    return null;
  }
  const C = t.useMemo(() => Array.from({
    length: 50
  }, (o, e) => ({
    id: e,
    initialX: Math.random() * 100,
    initialY: -10,
    finalY: 110,
    finalX: Math.random() * 100,
    rotation: Math.random() * 360,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 2,
    repeatDelay: Math.random() * 2,
    color: ["#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A", "#98D8C8", "#F7DC6F", "#BB8FCE", "#85C1E2"][Math.floor(Math.random() * 8)],
    size: Math.random() * 10 + 8
  })), []);
  const x = t.useMemo(() => Array.from({
    length: 20
  }, (o, e) => ({
    id: e,
    angle: 0 + e / 20 * 360,
    distance: 25 + Math.random() * 15,
    delay: Math.random() * 0.5,
    color: ["#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A", "#98D8C8", "#F7DC6F", "#BB8FCE"][Math.floor(Math.random() * 7)]
  })), []);
  return a.jsxs("div", {
    className: "coupon-code-page",
    children: [a.jsx("div", {
      className: "coupon-confetti-wrapper",
      children: C.map(o => a.jsx(i.div, {
        className: "coupon-confetti-piece",
        initial: {
          x: `${o.initialX}vw`,
          y: `${o.initialY}vh`,
          rotate: 0,
          opacity: 1
        },
        animate: {
          y: `${o.finalY}vh`,
          x: `${o.finalX}vw`,
          rotate: o.rotation,
          opacity: [1, 1, 0]
        },
        transition: {
          duration: o.duration,
          delay: o.delay,
          repeat: Infinity,
          repeatDelay: o.repeatDelay
        },
        style: {
          backgroundColor: o.color,
          width: `${o.size}px`,
          height: `${o.size}px`
        }
      }, o.id))
    }), a.jsxs("div", {
      className: "coupon-modal-container",
      children: [a.jsx("div", {
        className: "coupon-confetti-burst",
        children: x.map(o => {
          const e = o.angle * Math.PI / 180;
          const n = 50 + Math.cos(e) * o.distance;
          const t = 50 + Math.sin(e) * o.distance;
          return a.jsx(i.div, {
            className: "coupon-burst-piece",
            initial: {
              x: "50%",
              y: "50%",
              scale: 0,
              opacity: 0.8
            },
            animate: {
              x: `${n}%`,
              y: `${t}%`,
              scale: [0, 1.2, 0],
              opacity: [0.8, 0.8, 0]
            },
            transition: {
              duration: 1.5,
              delay: o.delay,
              repeat: Infinity,
              repeatDelay: 2
            },
            style: {
              backgroundColor: o.color
            }
          }, o.id);
        })
      }), a.jsxs("div", {
        className: "coupon-modal-header",
        children: [a.jsx("h2", {
          className: "coupon-modal-title",
          children: l("coupon.thankYou")
        }), a.jsx("p", {
          className: "coupon-modal-subtitle",
          children: l("coupon.welcome")
        })]
      }), a.jsxs("div", {
        className: "coupon-code-section",
        children: [a.jsx("p", {
          className: "coupon-info-label",
          children: m.length > 1 ? l("coupon.yourSpecialCouponCodes") : l("coupon.yourSpecialCouponCode")
        }), m.map((o, e) => a.jsxs("div", {
          className: "coupon-code-item",
          children: [a.jsxs("div", {
            className: "coupon-code-display",
            children: [a.jsx("span", {
              className: "coupon-code-text",
              children: o.code
            }), a.jsx("button", {
              className: "coupon-copy-btn",
              title: l("coupon.copyCode"),
              onClick: n => (async (o, e, n) => {
                o.stopPropagation();
                try {
                  await navigator.clipboard.writeText(e);
                  h(n);
                  p(true);
                  setTimeout(() => {
                    p(false);
                    h(null);
                  }, 2000);
                } catch (t) {}
              })(n, o.code, e),
              children: a.jsxs("svg", {
                width: "14",
                height: "14",
                viewBox: "0 0 24 24",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                children: [a.jsx("path", {
                  d: "M8 4V16C8 16.5304 8.21071 17.0391 8.58579 17.4142C8.96086 17.7893 9.46957 18 10 18H18C18.5304 18 19.0391 17.7893 19.4142 17.4142C19.7893 17.0391 20 16.5304 20 16V7.242C20 6.97556 19.9467 6.71181 19.8433 6.46624C19.7399 6.22068 19.5885 5.99824 19.398 5.812L16.083 2.57C15.7094 2.20466 15.2076 2.00007 14.685 2H10C9.46957 2 8.96086 2.21071 8.58579 2.58579C8.21071 2.96086 8 3.46957 8 4V4Z",
                  stroke: "#4C6694",
                  strokeWidth: "2",
                  strokeLinecap: "round",
                  strokeLinejoin: "round"
                }), a.jsx("path", {
                  d: "M16 18V20C16 20.5304 15.7893 21.0391 15.4142 21.4142C15.0391 21.7893 14.5304 22 14 22H6C5.46957 22 4.96086 21.7893 4.58579 21.4142C4.21071 21.0391 4 20.5304 4 20V9C4 8.46957 4.21071 7.96086 4.58579 7.58579C4.96086 7.21071 5.46957 7 6 7H8",
                  stroke: "#4C6694",
                  strokeWidth: "2",
                  strokeLinecap: "round",
                  strokeLinejoin: "round"
                })]
              })
            })]
          }), a.jsx("p", {
            className: "coupon-description-text",
            children: o.description
          })]
        }, e)), a.jsxs("p", {
          className: "coupon-warning-text",
          children: [a.jsx("svg", {
            className: "coupon-warning-icon",
            width: "16",
            height: "16",
            viewBox: "0 0 24 24",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            children: a.jsx("path", {
              d: "M12 12V7.5M12 15.3354V15.375M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z",
              stroke: "currentColor",
              strokeWidth: "2",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            })
          }), m.length > 1 ? l("coupon.codesWillOnlyAppearOnce") : l("coupon.codeWillOnlyAppearOnce")]
        })]
      }), a.jsx("div", {
        className: "coupon-discount-info",
        children: a.jsx("p", {
          className: "coupon-discount-text",
          dangerouslySetInnerHTML: {
            __html: m.length > 1 ? l("coupon.discountDescriptionMultiple") : l("coupon.discountDescription", {
              description: ((s = m[0]) == null ? undefined : s.description) || l("coupon.defaultDiscountLabel")
            })
          }
        })
      }), a.jsxs("button", {
        className: "coupon-continue-btn",
        onClick: () => {
          c("/", {
            state: {
              fromLogin: true
            }
          });
        },
        children: [a.jsx("span", {
          children: l("coupon.recordedCouponCode")
        }), a.jsx("svg", {
          width: "16",
          height: "16",
          viewBox: "0 0 24 24",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: a.jsx("path", {
            d: "M5 12H19M19 12L12 5M19 12L12 19",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          })
        })]
      })]
    }), d && a.jsx("div", {
      className: "coupon-toast",
      children: u !== null ? l("coupon.couponCodeCopiedWithNumber", {
        number: u + 1
      }) : l("coupon.couponCodeCopied")
    })]
  });
};
export { s as default };