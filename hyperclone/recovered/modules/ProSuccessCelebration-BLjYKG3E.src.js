import { b as e, r as a, j as o, m as s, F as c } from "./index-TjoB2Buo.js"; /* empty css                       */
const r = ({
  isOpen: s,
  onClose: c
}) => {
  const {
    t: r
  } = e();
  const [t, l] = a.useState(false);
  const [i, n] = a.useState(false);
  if (s) {
    return o.jsx("div", {
      className: "pro-welcome-overlay",
      onClick: c,
      children: o.jsxs("div", {
        className: "pro-welcome-container",
        onClick: e => e.stopPropagation(),
        children: [o.jsxs("div", {
          className: "pro-welcome-badge-row",
          children: [o.jsx("span", {
            className: "pro-welcome-badge",
            children: "PRO"
          }), o.jsx("span", {
            className: "pro-welcome-badge-sub",
            children: r("proSuccess.welcome.badgeSub")
          })]
        }), o.jsxs("h2", {
          className: "pro-welcome-title",
          children: [r("proSuccess.welcome.title"), " ✦"]
        }), o.jsx("p", {
          className: "pro-welcome-description",
          children: r("proSuccess.welcome.description")
        }), o.jsx("div", {
          className: "pro-welcome-divider"
        }), o.jsx("div", {
          className: "pro-welcome-section-label",
          children: r("proSuccess.welcome.talkToFounders")
        }), o.jsxs("div", {
          className: "pro-welcome-contact-list",
          children: [o.jsxs("button", {
            className: "pro-welcome-contact-item" + (t ? " pro-welcome-contact-item--expanded" : ""),
            onClick: () => l(e => !e),
            children: [o.jsx("span", {
              className: "pro-welcome-contact-icon",
              children: o.jsx("img", {
                src: "/pages/mainPages/home/social_media/gmail-logo.png",
                alt: "Email",
                className: "pro-welcome-contact-img"
              })
            }), o.jsx("span", {
              className: "pro-welcome-contact-label",
              children: r("proSuccess.welcome.founderEmail")
            }), t ? o.jsx("a", {
              href: "mailto:contact@hyperknow.io",
              className: "pro-welcome-email-address",
              onClick: e => e.stopPropagation(),
              children: "contact@hyperknow.io"
            }) : o.jsx("svg", {
              className: "pro-welcome-contact-arrow",
              width: "12",
              height: "12",
              viewBox: "0 0 24 24",
              fill: "none",
              children: o.jsx("path", {
                d: "M6 9l6 6 6-6",
                stroke: "currentColor",
                strokeWidth: "2",
                strokeLinecap: "round",
                strokeLinejoin: "round"
              })
            })]
          }), o.jsxs("button", {
            className: "pro-welcome-contact-item" + (i ? " pro-welcome-contact-item--expanded" : ""),
            onClick: () => n(e => !e),
            children: [o.jsx("span", {
              className: "pro-welcome-contact-icon",
              children: o.jsx("img", {
                src: "/pages/mainPages/home/social_media/wechat-logo.png",
                alt: "WeChat",
                className: "pro-welcome-contact-img"
              })
            }), o.jsx("span", {
              className: "pro-welcome-contact-label",
              children: r("proSuccess.welcome.founderWechat")
            }), i ? o.jsx("a", {
              href: "https://qrcode-mvso.onrender.com/s/wechat-group-updated",
              target: "_blank",
              rel: "noopener noreferrer",
              className: "pro-welcome-email-address",
              onClick: e => e.stopPropagation(),
              children: r("proSuccess.welcome.openQr")
            }) : o.jsx("svg", {
              className: "pro-welcome-contact-arrow",
              width: "12",
              height: "12",
              viewBox: "0 0 24 24",
              fill: "none",
              children: o.jsx("path", {
                d: "M6 9l6 6 6-6",
                stroke: "currentColor",
                strokeWidth: "2",
                strokeLinecap: "round",
                strokeLinejoin: "round"
              })
            })]
          })]
        }), o.jsx("button", {
          className: "pro-welcome-cta",
          onClick: c,
          children: r("proSuccess.welcome.cta")
        })]
      })
    });
  } else {
    return null;
  }
};
const t = ["#4C6694", "#7FA1D4", "#F6C177", "#F19A8E", "#8FD3C1", "#B9A7E6"];
const l = ({
  tier: r,
  onContinue: l
}) => {
  const {
    t: i
  } = e();
  a.useEffect(() => {
    const e = new Audio("/sounds/reward.mp3");
    e.volume = 0.5;
    e.play().catch(() => {});
    return () => {
      e.pause();
      e.src = "";
    };
  }, []);
  const n = a.useMemo(() => Array.from({
    length: 26
  }, (e, a) => ({
    id: a,
    initialX: Math.random() * 100,
    finalX: Math.random() * 100,
    rotation: Math.random() * 540 - 270,
    duration: Math.random() * 3 + 3.5,
    delay: Math.random() * 3,
    repeatDelay: Math.random() * 3,
    color: t[Math.floor(Math.random() * t.length)],
    size: Math.random() * 6 + 7
  })), []);
  const p = (e => e.charAt(0).toUpperCase() + e.slice(1).toLowerCase())(r);
  return o.jsxs("div", {
    className: "pro-success-page",
    children: [o.jsx("div", {
      className: "pro-celebrate-confetti",
      "aria-hidden": "true",
      children: n.map(e => o.jsx(s.div, {
        className: "pro-celebrate-confetti-piece",
        initial: {
          x: `${e.initialX}vw`,
          y: "-10vh",
          rotate: 0,
          opacity: 1
        },
        animate: {
          y: "110vh",
          x: `${e.finalX}vw`,
          rotate: e.rotation,
          opacity: [1, 1, 0]
        },
        transition: {
          duration: e.duration,
          delay: e.delay,
          repeat: Infinity,
          repeatDelay: e.repeatDelay
        },
        style: {
          backgroundColor: e.color,
          width: e.size,
          height: e.size
        }
      }, e.id))
    }), o.jsxs(s.section, {
      className: "pro-celebrate-card",
      initial: {
        opacity: 0,
        y: 18
      },
      animate: {
        opacity: 1,
        y: 0
      },
      transition: {
        duration: 0.45,
        ease: [0.16, 1, 0.3, 1]
      },
      children: [o.jsx(s.div, {
        className: "pro-celebrate-media",
        "aria-hidden": "true",
        initial: {
          opacity: 0,
          scale: 0.92
        },
        animate: {
          opacity: 1,
          scale: 1
        },
        transition: {
          duration: 0.5,
          delay: 0.1,
          ease: [0.16, 1, 0.3, 1]
        },
        children: o.jsx(c, {
          className: "pro-celebrate-video",
          src: "/pages/mainPages/animations/char-reward-pop.mp4"
        })
      }), o.jsxs(s.div, {
        className: "pro-celebrate-body",
        initial: {
          opacity: 0,
          y: 12
        },
        animate: {
          opacity: 1,
          y: 0
        },
        transition: {
          duration: 0.45,
          delay: 0.18
        },
        children: [o.jsxs("div", {
          className: "pro-celebrate-status",
          children: [o.jsx("span", {
            className: "pro-celebrate-badge",
            children: p.toUpperCase()
          }), o.jsx("span", {
            className: "pro-celebrate-activated",
            children: i("proSuccess.page.activated")
          })]
        }), o.jsx("p", {
          className: "pro-celebrate-eyebrow",
          children: i("proSuccess.page.eyebrow")
        }), o.jsx("h1", {
          className: "pro-celebrate-title",
          children: i("proSuccess.page.title", {
            tier: p
          })
        }), o.jsx("p", {
          className: "pro-celebrate-subtitle",
          children: i("proSuccess.page.subtitle")
        }), o.jsx("button", {
          type: "button",
          className: "pro-celebrate-btn",
          onClick: l,
          children: i("proSuccess.page.continue")
        })]
      })]
    })]
  });
};
export { l as P, r as a };