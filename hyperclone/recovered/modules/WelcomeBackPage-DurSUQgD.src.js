import { b as e, u as a, r as c, h as l, j as t } from "./index-TjoB2Buo.js";
function s() {
  const {
    t: s
  } = e();
  const o = a();
  const [i, m] = c.useState("visible");
  const r = c.useRef(null);
  c.useEffect(() => {
    l();
    return () => {
      if (r.current) {
        clearTimeout(r.current);
      }
    };
  }, []);
  return t.jsx("main", {
    className: `welcome-back-page welcome-back-page--${i}`,
    role: "dialog",
    "aria-modal": "true",
    "aria-label": "Welcome back",
    children: t.jsxs("div", {
      className: "welcome-back-start",
      children: [t.jsx("span", {
        className: "welcome-back-piece welcome-back-video-wrap",
        style: {
          "--exit-x": "-48px",
          "--exit-y": "-64px",
          "--exit-rotate": "-8deg"
        },
        children: t.jsx("video", {
          className: "welcome-back-video",
          src: "/pages/mainPages/home/welcome_back/welcome-back.mp4",
          poster: "/pages/mainPages/home/welcome_back/welcome-back.webp",
          autoPlay: true,
          loop: true,
          muted: true,
          playsInline: true
        })
      }), t.jsxs("span", {
        className: "welcome-back-piece welcome-back-copy",
        style: {
          "--exit-x": "44px",
          "--exit-y": "-20px",
          "--exit-rotate": "5deg"
        },
        children: [s("home.welcomeBack.greeting"), t.jsx("br", {}), s("home.welcomeBack.subtitle")]
      }), t.jsx("button", {
        type: "button",
        className: "welcome-back-piece welcome-back-cta",
        style: {
          "--exit-x": "0px",
          "--exit-y": "58px",
          "--exit-rotate": "3deg"
        },
        onClick: () => {
          if (i === "visible") {
            m("exiting");
            r.current = window.setTimeout(() => {
              o("/", {
                replace: true
              });
              r.current = null;
            }, 760);
          }
        },
        children: s("home.welcomeBack.cta")
      })]
    })
  });
}
export { s as default };