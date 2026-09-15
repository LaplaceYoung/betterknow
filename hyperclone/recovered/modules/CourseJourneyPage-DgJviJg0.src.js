import { c as e, g as t, u as s, b as n, r as a, aI as r, a0 as i, aJ as c, j as o, a2 as l, w as d, G as u, aK as p, aL as h, a1 as m, aM as j, z as x, R as g, k as v, aN as y, l as k, aO as b, aP as f, i as N, au as w, W as C, aj as S, ak as I, al as L, ao as E, aQ as M } from "./index-TjoB2Buo.js";
import { b as T } from "./courses-GqETwdXb.js";
import { P } from "./PracticeStars-TWYnxRvK.js";
import { a as _, P as U, g as $ } from "./PreparingModal-Bthg5dgq.js";
import { C as D } from "./CourseTypeIcon-27chSRPG.js";
import { C as F } from "./CourseShareModal-C6j8fIDX.js";
import { C as J } from "./CourseFeedbackEntry-yXmrvWpY.js";
import { g as B, c as A, C as R, s as W } from "./CourseRatingBar-BgzZWlQB.js";
import { g as O } from "./getAllCalendarMainTasks-DafTUG3L.js";
import "./BugReportModal-DxKVyQda.js";
const H = e => {
  if (!e || !e.started) {
    return {
      state: "notStarted",
      stars: 0
    };
  }
  if (!e.finished) {
    return {
      state: "inProgress",
      stars: 0
    };
  }
  if (e.stars === undefined) {
    return {
      state: "done",
      stars: 0
    };
  }
  const t = Math.max(0, Math.min(3, e.stars));
  const s = t > 0 ? "rated" : "retry";
  if (e.score !== undefined && e.perfect) {
    return {
      state: s,
      stars: t,
      score: e.score,
      perfect: e.perfect
    };
  } else {
    return {
      state: s,
      stars: t
    };
  }
};
const z = () => {
  const e = t();
  if (e) {
    return {
      Authorization: `Bearer ${e}`
    };
  } else {
    return {};
  }
};
const K = {
  hasBaseline: false,
  newFiles: 0,
  changedFiles: 0,
  newAssignments: 0,
  changedDue: 0,
  total: 0
};
const V = {
  hasBaseline: true,
  newFiles: 0,
  changedFiles: 0,
  newAssignments: 0,
  changedDue: 0,
  syllabusChanged: false,
  newModules: 0,
  changedModules: 0,
  newAnnouncements: 0,
  changedAnnouncements: 0,
  total: 0
};
async function q(t) {
  try {
    const s = await fetch(e(`/api/v1/course-generation/courses/${encodeURIComponent(t)}/canvas-updates`), {
      headers: z(),
      cache: "no-store"
    });
    if (s.ok) {
      return await s.json();
    } else {
      return K;
    }
  } catch {
    return K;
  }
}
const Y = {
  ok: false
};
const Z = ({
  initialView: t,
  onClose: d,
  onGoToCourses: u,
  onEnrolled: p,
  successMode: h = "courses"
}) => {
  const m = s();
  const {
    t: j,
    i18n: x
  } = n();
  const [g, v] = a.useState(typeof t == "string" ? {
    type: "browse"
  } : t);
  const [y, k] = a.useState([]);
  const [b, f] = a.useState(t === "browse");
  const [N, w] = a.useState(null);
  const [C, S] = a.useState(null);
  const [I, L] = a.useState(() => r(typeof t == "string" ? undefined : t.course.languages));
  a.useEffect(() => {
    if (t === "browse") {
      i().then(e => {
        if (e.success) {
          k(e.courses);
        }
        f(false);
      });
    }
  }, [t, x.language]);
  a.useEffect(() => {
    const e = e => {
      if (e.key === "Escape") {
        d();
      }
    };
    document.addEventListener("keydown", e);
    return () => document.removeEventListener("keydown", e);
  }, [d]);
  const E = a.useCallback(e => {
    if (e.enrolled && e.enrolledCourseUuid) {
      d();
      m(`/course/${e.enrolledCourseUuid}`);
      return;
    }
    L(r(e.languages));
    v({
      type: "confirm",
      course: e
    });
  }, [m, d]);
  const M = a.useCallback(async () => {
    if (g.type !== "confirm") {
      return;
    }
    const {
      course: e
    } = g;
    w(e.marketplaceId);
    S(null);
    const t = await c(e.marketplaceId, I);
    w(null);
    if (t.success) {
      k(s => s.map(s => s.marketplaceId === e.marketplaceId ? {
        ...s,
        enrolled: true,
        enrolledCourseUuid: t.courseUuid
      } : s));
      if (p != null) {
        p(e.marketplaceId, t.courseUuid);
      }
      v({
        type: "success",
        courseUuid: t.courseUuid
      });
    } else {
      S(t.error);
    }
  }, [g, p, I]);
  const T = g.type === "browse";
  const P = g.type === "confirm" && N === g.course.marketplaceId;
  return o.jsxs("div", {
    className: "mkt-overlay",
    role: "presentation",
    onClick: d,
    children: [T && o.jsxs("div", {
      className: "mkt-panel",
      role: "dialog",
      "aria-modal": "true",
      "aria-label": "Marketplace",
      onClick: e => e.stopPropagation(),
      children: [o.jsxs("div", {
        className: "mkt-header",
        children: [o.jsxs("div", {
          className: "mkt-header-left",
          children: [o.jsx("img", {
            src: "/pages/mainPages/home/craft-courses-tab/market-place.svg",
            alt: "",
            "aria-hidden": "true",
            className: "mkt-header-icon"
          }), o.jsx("h2", {
            className: "mkt-title",
            children: j("home.marketplace.title")
          }), o.jsx("span", {
            className: "mkt-subtitle",
            children: j("home.marketplace.subtitle")
          })]
        }), o.jsx("button", {
          type: "button",
          className: "mkt-close",
          onClick: d,
          "aria-label": j("home.marketplace.closeAria"),
          children: o.jsx("svg", {
            width: "20",
            height: "20",
            viewBox: "0 0 24 24",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            children: o.jsx("path", {
              d: "M18 6L6 18M6 6L18 18",
              stroke: "currentColor",
              strokeWidth: "1.5",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            })
          })
        })]
      }), o.jsx("div", {
        className: "mkt-grid",
        children: b ? [1, 2, 3, 4, 5, 6, 7, 8].map(e => o.jsx("div", {
          className: "mkt-ticket-skeleton",
          "aria-hidden": "true"
        }, e)) : y.map((t, s) => o.jsx("div", {
          className: "mkt-ticket-wrap" + (N === t.marketplaceId ? " mkt-ticket-enrolling" : ""),
          role: "button",
          tabIndex: 0,
          onClick: () => E(t),
          onKeyDown: e => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              E(t);
            }
          },
          children: o.jsx(l, {
            variant: t.ticketVariant ?? s % 3 + 1,
            course: {
              id: t.marketplaceId,
              title: t.courseTitle,
              description: t.courseDescription,
              coverImage: t.wideCoverImageUrl ?? t.coverImageUrl ? e(t.wideCoverImageUrl ?? t.coverImageUrl) : undefined,
              subjects: t.subjects,
              difficulty: t.difficulty,
              lessons: t.sessionCount || undefined,
              status: t.enrolled ? "enrolled" : undefined,
              joinCount: t.joinCount
            },
            onEnroll: () => E(t)
          })
        }, t.marketplaceId))
      })]
    }), g.type === "confirm" && o.jsxs("div", {
      className: "mkt-dialog",
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": "mkt-confirm-title",
      onClick: e => e.stopPropagation(),
      children: [o.jsx("button", {
        type: "button",
        className: "mkt-dialog-close",
        onClick: d,
        "aria-label": "Close",
        disabled: P,
        children: o.jsx("svg", {
          width: "18",
          height: "18",
          viewBox: "0 0 24 24",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: o.jsx("path", {
            d: "M18 6L6 18M6 6L18 18",
            stroke: "currentColor",
            strokeWidth: "1.5",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          })
        })
      }), o.jsx("h2", {
        id: "mkt-confirm-title",
        className: "mkt-dialog-title",
        children: j("home.marketplace.confirmTitle")
      }), o.jsx("p", {
        className: "mkt-dialog-course-name",
        children: j("home.marketplace.confirmCourseName", {
          title: g.course.courseTitle
        })
      }), o.jsx("p", {
        className: "mkt-dialog-desc",
        children: j("home.marketplace.confirmDesc")
      }), o.jsxs("div", {
        className: "mkt-dialog-lang",
        children: [o.jsx("span", {
          className: "mkt-dialog-lang-label",
          id: "mkt-confirm-lang-label",
          children: j("home.marketplace.confirmLanguageLabel")
        }), o.jsx("div", {
          className: "mkt-dialog-lang-options",
          role: "group",
          "aria-labelledby": "mkt-confirm-lang-label",
          children: ["en", "zh"].map(e => {
            const t = (g.course.languages ?? ["en"]).includes(e);
            return o.jsx("button", {
              type: "button",
              className: "mkt-dialog-lang-option",
              "aria-pressed": I === e,
              disabled: !t || P,
              onClick: () => L(e),
              children: j(e === "en" ? "home.marketplace.confirmLanguageEn" : "home.marketplace.confirmLanguageZh")
            }, e);
          })
        }), o.jsx("p", {
          className: "mkt-dialog-lang-hint",
          children: (g.course.languages ?? ["en"]).includes("zh") ? j("home.marketplace.confirmLanguageHint") : j("home.marketplace.confirmLanguageOnlyEn")
        })]
      }), C && o.jsx("p", {
        className: "mkt-error",
        role: "alert",
        children: C
      }), o.jsxs("div", {
        className: "mkt-dialog-actions",
        children: [o.jsx("button", {
          type: "button",
          className: "mkt-dialog-btn-secondary",
          onClick: d,
          disabled: P,
          children: j("home.marketplace.confirmCancel")
        }), o.jsx("button", {
          type: "button",
          className: "mkt-dialog-btn-primary",
          onClick: M,
          disabled: P,
          children: j(P ? "home.marketplace.confirmJoining" : "home.marketplace.confirmJoin")
        })]
      })]
    }), g.type === "success" && o.jsxs("div", {
      className: "mkt-dialog",
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": "mkt-success-title",
      onClick: e => e.stopPropagation(),
      children: [o.jsx("h2", {
        id: "mkt-success-title",
        className: "mkt-dialog-title",
        children: j("home.marketplace.successTitle")
      }), o.jsx("p", {
        className: "mkt-dialog-desc",
        children: j("home.marketplace.successDesc")
      }), h === "marketplace" ? o.jsxs("div", {
        className: "mkt-dialog-actions",
        children: [o.jsx("button", {
          type: "button",
          className: "mkt-dialog-btn-secondary",
          onClick: () => {
            d();
            m("/marketplace");
          },
          children: j("home.marketplace.backToMarketplace")
        }), o.jsx("button", {
          type: "button",
          className: "mkt-dialog-btn-primary",
          onClick: () => {
            d();
            m(`/course/${encodeURIComponent(g.courseUuid)}`);
          },
          children: j("home.marketplace.successStartLearning")
        })]
      }) : o.jsxs("div", {
        className: "mkt-dialog-actions",
        children: [o.jsx("button", {
          type: "button",
          className: "mkt-dialog-btn-secondary",
          onClick: d,
          children: j("home.marketplace.successOk")
        }), u && o.jsx("button", {
          type: "button",
          className: "mkt-dialog-btn-primary",
          onClick: () => {
            d();
            u();
          },
          children: j("home.marketplace.successGoToCourses")
        })]
      })]
    })]
  });
};
const G = {
  notStarted: {
    pct: 0,
    color: "#D8DBE2"
  },
  attempted: {
    pct: 0.25,
    color: "#B9C6DE"
  },
  familiar: {
    pct: 0.5,
    color: "#7E9BC8"
  },
  proficient: {
    pct: 0.75,
    color: "#4C6696"
  },
  mastered: {
    pct: 1,
    color: "#22A45D"
  }
};
const Q = Math.PI * 2 * 15;
const X = ({
  state: e,
  size: t = 24,
  strokeWidth: s = 4,
  className: n
}) => {
  const {
    pct: a,
    color: r
  } = G[e];
  return o.jsxs("svg", {
    className: n,
    width: t,
    height: t,
    viewBox: "0 0 36 36",
    fill: "none",
    "aria-hidden": "true",
    children: [o.jsx("circle", {
      cx: "18",
      cy: "18",
      r: 15,
      stroke: "#E6E8EE",
      strokeWidth: s
    }), a > 0 && o.jsx("circle", {
      cx: "18",
      cy: "18",
      r: 15,
      stroke: r,
      strokeWidth: s,
      strokeLinecap: "round",
      strokeDasharray: Q,
      strokeDashoffset: Q * (1 - a),
      transform: "rotate(-90 18 18)"
    }), e === "mastered" && o.jsx("path", {
      d: "M12 18.4l4 4 8-8.4",
      stroke: r,
      strokeWidth: "3",
      strokeLinecap: "round",
      strokeLinejoin: "round"
    })]
  });
};
const ee = ({
  hint: e,
  gap: t = 8,
  children: s
}) => {
  const n = a.useRef(null);
  const [r, i] = a.useState(null);
  const c = a.useCallback(() => {
    if (n.current) {
      i(n.current.getBoundingClientRect());
    }
  }, []);
  const l = a.useCallback(() => i(null), []);
  return o.jsxs("span", {
    ref: n,
    className: "cj-ring-hint-anchor",
    onMouseEnter: c,
    onMouseLeave: l,
    children: [s, r && e && d.createPortal(o.jsx("span", {
      className: "cj-ring-hint-bubble",
      style: {
        left: r.left + r.width / 2,
        top: r.top - t
      },
      role: "tooltip",
      children: e
    }), document.body)]
  });
};
const te = () => {
  const e = t();
  if (e) {
    return {
      Authorization: `Bearer ${e}`
    };
  } else {
    return {};
  }
};
const se = async e => {
  if (!e.ok) {
    let t = `Request failed with status ${e.status}`;
    try {
      const s = await e.json();
      if (s == null ? undefined : s.detail) {
        t = String(s.detail);
      }
    } catch {}
    throw new Error(t);
  }
  return e.json();
};
const ne = [{
  dark: "#4C6694",
  light: "#E8F0F8",
  text: "#3D5477"
}, {
  dark: "#6681D6",
  light: "#EBEFFA",
  text: "#4A5FB8"
}, {
  dark: "#2196F3",
  light: "#E3F2FD",
  text: "#1565C0"
}];
const ae = [{
  dark: "#5D8C61",
  light: "#EDF5EE",
  text: "#3E6341"
}, {
  dark: "#D4A346",
  light: "#FAF6EB",
  text: "#8D6E33"
}, {
  dark: "#7CB342",
  light: "#F1F8E9",
  text: "#558B2F"
}, {
  dark: "#FFB74D",
  light: "#FFF8E1",
  text: "#BF6900"
}, {
  dark: "#388E3C",
  light: "#E8F5E9",
  text: "#2E7D32"
}];
const re = [{
  dark: "#4C6694",
  light: "#E8F0F8",
  text: "#3D5477"
}, {
  dark: "#607D8B",
  light: "#ECEFF1",
  text: "#455A64"
}, {
  dark: "#2196F3",
  light: "#E3F2FD",
  text: "#1565C0"
}];
const ie = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const ce = e => String(e).padStart(2, "0");
const oe = e => `${e.getFullYear()}-${ce(e.getMonth() + 1)}-${ce(e.getDate())}`;
const le = (e, t) => new Date(t, e + 1, 0).getDate();
const de = e => e.split("").reduce((e, t) => e + t.charCodeAt(0), 0);
const ue = e => {
  const t = new Date(e);
  t.setHours(0, 0, 0, 0);
  return t;
};
const pe = ({
  items: e,
  existingTasks: t,
  onItemMove: s,
  initialYear: n,
  initialMonth: r
}) => {
  const [i, c] = a.useState(r);
  const [l, d] = a.useState(n);
  const [p, h] = a.useState(null);
  const m = a.useMemo(() => {
    const e = le(i, l);
    const t = new Date(l, i, 1).getDay();
    const s = [];
    const n = i === 0 ? 11 : i - 1;
    const a = i === 0 ? l - 1 : l;
    const r = le(n, a);
    for (let i = t - 1; i >= 0; i--) {
      s.push({
        day: r - i,
        isCurrentMonth: false,
        isToday: false,
        date: new Date(a, n, r - i)
      });
    }
    const c = new Date();
    for (let p = 1; p <= e; p++) {
      const e = c.getFullYear() === l && c.getMonth() === i && c.getDate() === p;
      s.push({
        day: p,
        isCurrentMonth: true,
        isToday: e,
        date: new Date(l, i, p)
      });
    }
    const o = Math.max(Math.ceil(s.length / 7) * 7, 35);
    const d = i === 11 ? 0 : i + 1;
    const u = i === 11 ? l + 1 : l;
    for (let i = 1; s.length < o; i++) {
      s.push({
        day: i,
        isCurrentMonth: false,
        isToday: false,
        date: new Date(u, d, i)
      });
    }
    return s;
  }, [i, l]);
  const j = a.useMemo(() => {
    const e = [];
    for (let t = 0; t < m.length; t += 7) {
      e.push(m.slice(t, t + 7));
    }
    return e;
  }, [m]);
  const x = a.useMemo(() => {
    const t = {};
    e.forEach((e, s) => {
      t[e.date] ||= [];
      t[e.date].push({
        item: e,
        index: s
      });
    });
    return t;
  }, [e]);
  const g = a.useMemo(() => {
    const e = {};
    if (t.length !== 0) {
      m.forEach(s => {
        const n = s.date.getTime();
        const a = oe(s.date);
        t.forEach(t => {
          let s = false;
          if (t.type === "due") {
            s = !!t.due_at && ue(t.due_at).getTime() === n;
          } else if (t.type === "todo") {
            if (t.scheduled_for && t.due_at) {
              s = n >= ue(t.scheduled_for).getTime() && n <= ue(t.due_at).getTime();
            }
          } else if (t.type === "course") {
            s = !!t.scheduled_for && ue(t.scheduled_for).getTime() === n;
          }
          if (!s) {
            return;
          }
          const r = t.type === "due" ? ae : t.type === "todo" ? re : ne;
          e[a] ||= [];
          e[a].push({
            id: t.task_id,
            title: t.title,
            kind: t.type,
            color: r[de(t.title || "") % r.length]
          });
        });
      });
    }
    return e;
  }, [t, m]);
  return o.jsxs("div", {
    className: "ccal-preview",
    children: [o.jsxs("div", {
      className: "ccal-preview-header",
      children: [o.jsx("button", {
        type: "button",
        className: "ccal-preview-nav-btn",
        onClick: () => {
          if (i === 0) {
            c(11);
            d(l - 1);
          } else {
            c(i - 1);
          }
        },
        "aria-label": "Previous month",
        children: "‹"
      }), o.jsxs("span", {
        className: "ccal-preview-month-label",
        children: [ie[i], " ", l]
      }), o.jsx("button", {
        type: "button",
        className: "ccal-preview-nav-btn",
        onClick: () => {
          if (i === 11) {
            c(0);
            d(l + 1);
          } else {
            c(i + 1);
          }
        },
        "aria-label": "Next month",
        children: "›"
      })]
    }), o.jsx("div", {
      className: "ccal-preview-weekdays",
      children: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(e => o.jsx("div", {
        className: "ccal-preview-weekday",
        children: e
      }, e))
    }), o.jsx("div", {
      className: "ccal-preview-days-grid",
      children: j.map((t, n) => o.jsx(u.Fragment, {
        children: t.map((t, a) => {
          const r = oe(t.date);
          const i = x[r] || [];
          const c = g[r] || [];
          const l = c.slice(0, 3);
          const d = c.length - l.length;
          return o.jsxs("div", {
            className: ["ccal-preview-day", t.isCurrentMonth ? "" : "ccal-preview-day--other", t.isToday ? "ccal-preview-day--today" : "", p === r ? "ccal-preview-day--drag-over" : ""].filter(Boolean).join(" "),
            onDragOver: e => {
              e.preventDefault();
              e.dataTransfer.dropEffect = "move";
              h(r);
            },
            onDragLeave: () => h(e => e === r ? null : e),
            onDrop: n => ((t, n) => {
              t.preventDefault();
              h(null);
              const a = t.dataTransfer.getData("text/plain");
              const r = Number.parseInt(a, 10);
              if (!Number.isNaN(r) && !(r < 0) && !(r >= e.length)) {
                s(r, oe(n));
              }
            })(n, t.date),
            children: [o.jsx("div", {
              className: "ccal-preview-day-number",
              children: t.day
            }), o.jsxs("div", {
              className: "ccal-preview-day-events",
              children: [l.map(e => e.kind === "todo" ? o.jsxs("div", {
                className: "ccal-preview-existing ccal-preview-existing--bar",
                title: e.title,
                children: [o.jsx("span", {
                  className: "ccal-preview-existing-bar",
                  style: {
                    background: e.color.dark
                  },
                  "aria-hidden": "true"
                }), o.jsx("span", {
                  className: "ccal-preview-existing-title",
                  style: {
                    color: e.color.text
                  },
                  children: e.title
                })]
              }, e.id) : o.jsxs("div", {
                className: "ccal-preview-existing ccal-preview-existing--filled",
                style: {
                  background: e.color.light
                },
                title: e.title,
                children: [o.jsx("span", {
                  className: "ccal-preview-existing-icon",
                  style: {
                    background: e.color.dark
                  },
                  "aria-hidden": "true",
                  children: e.kind === "course" ? o.jsxs("svg", {
                    width: "8",
                    height: "8",
                    viewBox: "0 0 12 12",
                    fill: "none",
                    xmlns: "http://www.w3.org/2000/svg",
                    children: [o.jsx("path", {
                      d: "M6 2L11 4.3L6 6.6L1 4.3L6 2Z",
                      fill: "white"
                    }), o.jsx("path", {
                      d: "M3.3 5.6V7.9C3.3 7.9 4.4 9 6 9C7.6 9 8.7 7.9 8.7 7.9V5.6",
                      stroke: "white",
                      strokeWidth: "0.9",
                      fill: "none",
                      strokeLinecap: "round"
                    })]
                  }) : o.jsxs("svg", {
                    width: "8",
                    height: "8",
                    viewBox: "0 0 12 12",
                    fill: "none",
                    xmlns: "http://www.w3.org/2000/svg",
                    children: [o.jsx("rect", {
                      x: "1.5",
                      y: "2.5",
                      width: "9",
                      height: "8",
                      rx: "1",
                      stroke: "white",
                      strokeWidth: "0.9",
                      fill: "none"
                    }), o.jsx("line", {
                      x1: "1.5",
                      y1: "5",
                      x2: "10.5",
                      y2: "5",
                      stroke: "white",
                      strokeWidth: "0.9"
                    }), o.jsx("line", {
                      x1: "4",
                      y1: "1.2",
                      x2: "4",
                      y2: "3.2",
                      stroke: "white",
                      strokeWidth: "0.9",
                      strokeLinecap: "round"
                    }), o.jsx("line", {
                      x1: "8",
                      y1: "1.2",
                      x2: "8",
                      y2: "3.2",
                      stroke: "white",
                      strokeWidth: "0.9",
                      strokeLinecap: "round"
                    })]
                  })
                }), o.jsx("span", {
                  className: "ccal-preview-existing-title",
                  style: {
                    color: e.color.text
                  },
                  children: e.title
                })]
              }, e.id)), d > 0 && o.jsxs("div", {
                className: "ccal-preview-existing-more",
                children: ["+", d, " more"]
              }), i.map(({
                item: e,
                index: t
              }) => {
                const s = ne[de(e.title) % ne.length];
                return o.jsxs("div", {
                  className: "ccal-preview-pill",
                  style: {
                    background: s.dark
                  },
                  title: e.title,
                  draggable: true,
                  onDragStart: e => {
                    e.dataTransfer.setData("text/plain", String(t));
                    e.dataTransfer.effectAllowed = "move";
                  },
                  onDragEnd: () => h(null),
                  children: [o.jsx("span", {
                    className: "ccal-preview-pill-icon",
                    "aria-hidden": "true",
                    children: e.course_object_type === "exam" ? o.jsxs("svg", {
                      width: "10",
                      height: "10",
                      viewBox: "0 0 12 12",
                      fill: "none",
                      xmlns: "http://www.w3.org/2000/svg",
                      children: [o.jsx("rect", {
                        x: "2.5",
                        y: "1.5",
                        width: "7",
                        height: "9",
                        rx: "1",
                        stroke: "white",
                        strokeWidth: "0.9",
                        fill: "none"
                      }), o.jsx("line", {
                        x1: "4.3",
                        y1: "4",
                        x2: "7.7",
                        y2: "4",
                        stroke: "white",
                        strokeWidth: "0.9",
                        strokeLinecap: "round"
                      }), o.jsx("line", {
                        x1: "4.3",
                        y1: "6",
                        x2: "7.7",
                        y2: "6",
                        stroke: "white",
                        strokeWidth: "0.9",
                        strokeLinecap: "round"
                      }), o.jsx("line", {
                        x1: "4.3",
                        y1: "8",
                        x2: "6.3",
                        y2: "8",
                        stroke: "white",
                        strokeWidth: "0.9",
                        strokeLinecap: "round"
                      })]
                    }) : e.course_object_type === "project" ? o.jsx("svg", {
                      width: "10",
                      height: "10",
                      viewBox: "0 0 12 12",
                      fill: "none",
                      xmlns: "http://www.w3.org/2000/svg",
                      children: o.jsx("path", {
                        d: "M1.5 3.5C1.5 2.94772 1.94772 2.5 2.5 2.5H4.8L5.9 3.8H9.5C10.0523 3.8 10.5 4.24772 10.5 4.8V8.5C10.5 9.05228 10.0523 9.5 9.5 9.5H2.5C1.94772 9.5 1.5 9.05228 1.5 8.5V3.5Z",
                        stroke: "white",
                        strokeWidth: "0.9",
                        fill: "none"
                      })
                    }) : o.jsxs("svg", {
                      width: "10",
                      height: "10",
                      viewBox: "0 0 12 12",
                      fill: "none",
                      xmlns: "http://www.w3.org/2000/svg",
                      children: [o.jsx("path", {
                        d: "M6 2L11 4.3L6 6.6L1 4.3L6 2Z",
                        fill: "white"
                      }), o.jsx("path", {
                        d: "M3.3 5.6V7.9C3.3 7.9 4.4 9 6 9C7.6 9 8.7 7.9 8.7 7.9V5.6",
                        stroke: "white",
                        strokeWidth: "0.9",
                        fill: "none",
                        strokeLinecap: "round"
                      })]
                    })
                  }), o.jsx("span", {
                    className: "ccal-preview-pill-title",
                    children: e.title
                  })]
                }, `${e.course_object_type}:${e.course_object_id}`);
              })]
            })]
          }, `${n}-${a}`);
        })
      }, n))
    })]
  });
};
const he = [{
  label: "1 week",
  days: 7
}, {
  label: "2 weeks",
  days: 14
}, {
  label: "1 month",
  days: 30
}, {
  label: "2 months",
  days: 60
}];
const me = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const je = e => String(e).padStart(2, "0");
const xe = ({
  isOpen: t,
  onClose: s,
  courseUuid: n,
  courseTitle: r
}) => {
  const [i, c] = a.useState(1);
  const [l, d] = a.useState(14);
  const [u, p] = a.useState("");
  const h = a.useMemo(() => {
    const e = new Date();
    e.setHours(0, 0, 0, 0);
    return e;
  }, [t]);
  const [m, j] = a.useState(h.getMonth());
  const [x, g] = a.useState(h.getFullYear());
  const [v, y] = a.useState(null);
  const [k, b] = a.useState(new Set());
  const [f, N] = a.useState(false);
  const [w, C] = a.useState(null);
  const [S, I] = a.useState(null);
  const [L, E] = a.useState([]);
  const [M, T] = a.useState("");
  const [P, _] = a.useState(false);
  const [U, $] = a.useState(null);
  const [D, F] = a.useState(false);
  const [J, B] = a.useState(false);
  const [A, R] = a.useState([]);
  a.useEffect(() => {
    if (!t) {
      return;
    }
    c(1);
    d(14);
    p("");
    y(null);
    j(h.getMonth());
    g(h.getFullYear());
    b(new Set());
    N(false);
    C(null);
    I(null);
    E([]);
    T("");
    _(false);
    $(null);
    F(false);
    B(false);
    R([]);
    let s = false;
    (async function (t) {
      const s = await fetch(e(`/api/v1/course-calendar/status?course_uuid=${encodeURIComponent(t)}`), {
        headers: te()
      });
      return se(s);
    })(n).then(e => {
      if (!s) {
        B(e.scheduled);
      }
    }).catch(() => {});
    O().then(e => {
      if (!s && e.success) {
        R(e.tasks.filter(e => {
          var t;
          return e.type !== "course" || ((t = e.payload) == null ? undefined : t.course_id) !== n;
        }));
      }
    }).catch(() => {});
    return () => {
      s = true;
    };
  }, [t, n, h]);
  a.useEffect(() => {
    if (!t) {
      return;
    }
    const e = e => {
      if (e.key === "Escape" && !P) {
        s();
      }
    };
    document.addEventListener("keydown", e);
    return () => document.removeEventListener("keydown", e);
  }, [t, s, P]);
  const W = Number.parseInt(u, 10);
  const H = u.trim() !== "" ? Number.isNaN(W) ? 0 : W : l ?? 0;
  const z = H >= 1 && H <= 365;
  const K = async t => {
    if (z && !f) {
      N(true);
      C(t ? "generate" : "skip");
      I(null);
      try {
        const s = v ? `${v.getFullYear()}-${je(v.getMonth() + 1)}-${je(v.getDate())}` : null;
        const a = await async function (t, s, n, a) {
          const r = await fetch(e("/api/v1/course-calendar/draft"), {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              ...te()
            },
            body: JSON.stringify({
              course_uuid: t,
              start_date: s,
              duration_days: n,
              preferred_weekdays: a
            })
          });
          return se(r);
        }(n, s, H, t);
        if (!a.success || !Array.isArray(a.items) || a.items.length === 0) {
          I("Could not generate a schedule for this course.");
          return;
        }
        E(a.items);
        T(a.course_title || r || "");
        c(4);
      } catch (s) {
        I(s instanceof Error ? s.message : "Failed to generate the schedule.");
      } finally {
        N(false);
        C(null);
      }
    }
  };
  const V = a.useMemo(() => {
    const e = new Date(x, m + 1, 0).getDate();
    const t = new Date(x, m, 1).getDay();
    const s = [];
    for (let n = 0; n < t; n++) {
      s.push(null);
    }
    for (let n = 1; n <= e; n++) {
      s.push({
        day: n,
        date: new Date(x, m, n)
      });
    }
    return s;
  }, [m, x]);
  const q = x === h.getFullYear() && m === h.getMonth();
  if (!t) {
    return null;
  }
  let Y = v ?? h;
  if (!v && L.length > 0) {
    const [e, t, s] = L[0].date.split("-").map(Number);
    if (e && t && s) {
      Y = new Date(e, t - 1, s);
    }
  }
  const Z = () => {
    if (!P) {
      s();
    }
  };
  return o.jsx("div", {
    className: "course-cal-overlay" + (i === 4 ? " course-cal-overlay--fullscreen" : ""),
    onClick: Z,
    children: o.jsxs("section", {
      className: "course-cal-modal" + (i === 4 ? " course-cal-modal--fullscreen" : ""),
      role: "dialog",
      "aria-modal": "true",
      "aria-label": "Add course to calendar",
      onClick: e => e.stopPropagation(),
      children: [o.jsx("button", {
        type: "button",
        className: "course-cal-close",
        onClick: Z,
        "aria-label": "Close",
        children: o.jsx("svg", {
          width: "16",
          height: "16",
          viewBox: "0 0 24 24",
          fill: "none",
          "aria-hidden": "true",
          children: o.jsx("path", {
            d: "M18 6L6 18M6 6L18 18",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          })
        })
      }), i === 1 && o.jsxs(o.Fragment, {
        children: [o.jsxs("header", {
          className: "course-cal-head",
          children: [o.jsx("h2", {
            className: "course-cal-title",
            children: "How long do you want to take to finish this course?"
          }), o.jsx("p", {
            className: "course-cal-subtitle",
            children: "We'll spread the sessions, exams and project stages across it."
          })]
        }), o.jsx("div", {
          className: "course-cal-duration-chips",
          children: he.map(e => o.jsx("button", {
            type: "button",
            className: "course-cal-chip" + (u.trim() === "" && l === e.days ? " course-cal-chip--active" : ""),
            onClick: () => {
              d(e.days);
              p("");
            },
            children: e.label
          }, e.days))
        }), o.jsxs("div", {
          className: "course-cal-custom-row",
          children: [o.jsx("span", {
            className: "course-cal-custom-label",
            children: "Or a custom length:"
          }), o.jsx("input", {
            type: "number",
            className: "course-cal-custom-input",
            min: 1,
            max: 365,
            placeholder: "days",
            value: u,
            onChange: e => p(e.target.value)
          }), o.jsx("span", {
            className: "course-cal-custom-suffix",
            children: "days"
          })]
        }), u.trim() !== "" && !z && o.jsx("p", {
          className: "course-cal-error",
          children: "Pick a length between 1 and 365 days."
        }), o.jsx("footer", {
          className: "course-cal-footer",
          children: o.jsx("button", {
            type: "button",
            className: "course-cal-btn course-cal-btn--primary",
            disabled: !z,
            onClick: () => c(2),
            children: "Next"
          })
        })]
      }), i === 2 && o.jsxs(o.Fragment, {
        children: [o.jsxs("header", {
          className: "course-cal-head",
          children: [o.jsx("h2", {
            className: "course-cal-title",
            children: "When do you want to start?"
          }), o.jsx("p", {
            className: "course-cal-subtitle",
            children: "Pick the first day of your study plan, or skip to let the AI decide."
          })]
        }), o.jsxs("div", {
          className: "course-cal-picker",
          children: [o.jsxs("div", {
            className: "course-cal-picker-header",
            children: [o.jsx("button", {
              type: "button",
              className: "course-cal-picker-nav",
              onClick: () => {
                if (m === 0) {
                  j(11);
                  g(x - 1);
                } else {
                  j(m - 1);
                }
              },
              disabled: q,
              "aria-label": "Previous month",
              children: "‹"
            }), o.jsxs("span", {
              className: "course-cal-picker-month",
              children: [me[m], " ", x]
            }), o.jsx("button", {
              type: "button",
              className: "course-cal-picker-nav",
              onClick: () => {
                if (m === 11) {
                  j(0);
                  g(x + 1);
                } else {
                  j(m + 1);
                }
              },
              "aria-label": "Next month",
              children: "›"
            })]
          }), o.jsx("div", {
            className: "course-cal-picker-weekdays",
            children: ["S", "M", "T", "W", "T", "F", "S"].map((e, t) => o.jsx("div", {
              className: "course-cal-picker-weekday",
              children: e
            }, t))
          }), o.jsx("div", {
            className: "course-cal-picker-grid",
            children: V.map((e, t) => {
              if (!e) {
                return o.jsx("div", {
                  className: "course-cal-picker-cell course-cal-picker-cell--empty"
                }, t);
              }
              const s = e.date.getTime() < h.getTime();
              const n = v !== null && e.date.getTime() === v.getTime();
              const a = e.date.getTime() === h.getTime();
              return o.jsx("button", {
                type: "button",
                className: ["course-cal-picker-cell", n ? "course-cal-picker-cell--selected" : "", a ? "course-cal-picker-cell--today" : ""].filter(Boolean).join(" "),
                disabled: s,
                onClick: () => y(e.date),
                children: e.day
              }, t);
            })
          })]
        }), o.jsxs("footer", {
          className: "course-cal-footer",
          children: [o.jsx("button", {
            type: "button",
            className: "course-cal-btn",
            onClick: () => c(1),
            children: "Back"
          }), o.jsx("button", {
            type: "button",
            className: "course-cal-btn",
            onClick: () => {
              y(null);
              c(3);
            },
            children: "Skip"
          }), o.jsx("button", {
            type: "button",
            className: "course-cal-btn course-cal-btn--primary",
            disabled: !v,
            onClick: () => c(3),
            children: "Next"
          })]
        })]
      }), i === 3 && o.jsxs(o.Fragment, {
        children: [o.jsxs("header", {
          className: "course-cal-head",
          children: [o.jsx("h2", {
            className: "course-cal-title",
            children: "Which days of the week will you study?"
          }), o.jsx("p", {
            className: "course-cal-subtitle",
            children: "Items are only placed on the days you pick. Skip to let the AI decide."
          })]
        }), o.jsx("div", {
          className: "course-cal-weekday-row",
          children: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((e, t) => o.jsx("button", {
            type: "button",
            className: "course-cal-weekday-chip" + (k.has(t) ? " course-cal-weekday-chip--active" : ""),
            "aria-pressed": k.has(t),
            onClick: () => (e => {
              b(t => {
                const s = new Set(t);
                if (s.has(e)) {
                  s.delete(e);
                } else {
                  s.add(e);
                }
                return s;
              });
            })(t),
            children: e
          }, e))
        }), S && o.jsx("p", {
          className: "course-cal-error",
          children: S
        }), o.jsxs("footer", {
          className: "course-cal-footer",
          children: [o.jsx("button", {
            type: "button",
            className: "course-cal-btn",
            onClick: () => c(2),
            disabled: f,
            children: "Back"
          }), o.jsx("button", {
            type: "button",
            className: "course-cal-btn",
            onClick: () => K(null),
            disabled: f,
            children: f && w === "skip" ? o.jsxs(o.Fragment, {
              children: [o.jsx("span", {
                className: "course-cal-spinner course-cal-spinner--dark",
                "aria-hidden": "true"
              }), "Generating…"]
            }) : "Skip"
          }), o.jsx("button", {
            type: "button",
            className: "course-cal-btn course-cal-btn--primary",
            disabled: k.size === 0 || f,
            onClick: () => K(Array.from(k).sort((e, t) => e - t)),
            children: f && w === "generate" ? o.jsxs(o.Fragment, {
              children: [o.jsx("span", {
                className: "course-cal-spinner",
                "aria-hidden": "true"
              }), "Generating…"]
            }) : S ? "Retry" : "Generate"
          })]
        })]
      }), i === 4 && o.jsxs(o.Fragment, {
        children: [o.jsxs("header", {
          className: "course-cal-head",
          children: [o.jsx("h2", {
            className: "course-cal-title",
            children: "Here's your study plan"
          }), o.jsx("p", {
            className: "course-cal-subtitle",
            children: "Drag any item to a different day, then confirm."
          }), J && o.jsx("p", {
            className: "course-cal-replace-note",
            children: "This course already has a schedule — accepting will replace it."
          })]
        }), o.jsx(pe, {
          items: L,
          existingTasks: A,
          onItemMove: (e, t) => {
            E(s => s.map((s, n) => n === e ? {
              ...s,
              date: t
            } : s));
          },
          initialYear: Y.getFullYear(),
          initialMonth: Y.getMonth()
        }), U && o.jsx("p", {
          className: "course-cal-error",
          children: U
        }), D && o.jsx("p", {
          className: "course-cal-success",
          children: "Added to your calendar."
        }), o.jsxs("footer", {
          className: "course-cal-footer course-cal-footer--decide",
          children: [o.jsx("button", {
            type: "button",
            className: "course-cal-decide-btn course-cal-decide-btn--reject",
            onClick: s,
            disabled: P || D,
            "aria-label": "Discard this schedule",
            children: o.jsx("svg", {
              width: "22",
              height: "22",
              viewBox: "0 0 24 24",
              fill: "none",
              "aria-hidden": "true",
              children: o.jsx("path", {
                d: "M18 6L6 18M6 6L18 18",
                stroke: "currentColor",
                strokeWidth: "2.4",
                strokeLinecap: "round",
                strokeLinejoin: "round"
              })
            })
          }), o.jsx("button", {
            type: "button",
            className: "course-cal-decide-btn course-cal-decide-btn--accept",
            onClick: async () => {
              if (!P && !D) {
                _(true);
                $(null);
                try {
                  const t = L.map(e => {
                    const [t, s, n] = e.date.split("-").map(Number);
                    return {
                      course_object_type: e.course_object_type,
                      course_object_id: e.course_object_id,
                      title: e.title,
                      description: e.description ?? "",
                      scheduled_for: new Date(t, s - 1, n).toISOString()
                    };
                  });
                  const a = await async function (t, s, n) {
                    const a = await fetch(e("/api/v1/course-calendar/accept"), {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                        ...te()
                      },
                      body: JSON.stringify({
                        course_uuid: t,
                        course_title: s,
                        items: n
                      })
                    });
                    return se(a);
                  }(n, M, t);
                  if (!a.success) {
                    $("Failed to save the schedule. Please try again.");
                    return;
                  }
                  F(true);
                  window.setTimeout(() => s(), 900);
                } catch (t) {
                  $(t instanceof Error ? t.message : "Failed to save the schedule.");
                } finally {
                  _(false);
                }
              }
            },
            disabled: P || D,
            "aria-label": "Add this schedule to my calendar",
            children: P ? o.jsx("span", {
              className: "course-cal-spinner course-cal-spinner--light",
              "aria-hidden": "true"
            }) : o.jsx("svg", {
              width: "24",
              height: "24",
              viewBox: "0 0 24 24",
              fill: "none",
              "aria-hidden": "true",
              children: o.jsx("path", {
                d: "M20 6L9 17L4 12",
                stroke: "currentColor",
                strokeWidth: "2.4",
                strokeLinecap: "round",
                strokeLinejoin: "round"
              })
            })
          })]
        })]
      })]
    })
  });
};
const ge = ({
  isOpen: e,
  onClose: t,
  courseId: r
}) => {
  const i = s();
  const {
    t: c
  } = n();
  const l = () => {
    (() => {
      try {
        localStorage.removeItem(De);
      } catch {}
    })();
    t();
  };
  a.useEffect(() => {
    if (!e) {
      return;
    }
    const t = e => {
      if (e.key === "Escape") {
        l();
      }
    };
    document.addEventListener("keydown", t);
    return () => document.removeEventListener("keydown", t);
  }, [e, t]);
  if (!e) {
    return null;
  }
  const d = () => {
    if (r) {
      try {
        localStorage.setItem(De, JSON.stringify({
          courseId: r,
          ts: Date.now()
        }));
      } catch {}
    }
  };
  return o.jsx("div", {
    className: "join-auth-overlay",
    onClick: l,
    children: o.jsxs("div", {
      className: "join-auth-modal",
      onClick: e => e.stopPropagation(),
      role: "dialog",
      "aria-modal": "true",
      "aria-label": "Sign in to join this course",
      children: [o.jsx("button", {
        type: "button",
        className: "join-auth-close",
        onClick: l,
        "aria-label": "Close",
        children: o.jsx("svg", {
          width: "16",
          height: "16",
          viewBox: "0 0 24 24",
          fill: "none",
          "aria-hidden": "true",
          children: o.jsx("path", {
            d: "M18 6L6 18M6 6L18 18",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          })
        })
      }), o.jsx("h2", {
        className: "join-auth-title",
        children: c("share.signInToJoinTitle")
      }), o.jsx("p", {
        className: "join-auth-subtitle",
        children: c("share.signInToJoinDesc")
      }), o.jsxs("div", {
        className: "join-auth-actions",
        children: [o.jsx("button", {
          type: "button",
          className: "join-auth-signup-button",
          onClick: () => {
            d();
            i("/signup");
          },
          children: c("share.signUpFree")
        }), o.jsx("button", {
          type: "button",
          className: "join-auth-signin-button",
          onClick: () => {
            d();
            i("/signin");
          },
          children: c("share.logIn")
        })]
      })]
    })
  });
};
const ve = {
  confirm: () => {},
  sendFeedback: () => {},
  cancel: () => {}
};
const ye = async (e, s, n, a) => {
  var r;
  var i;
  var c;
  const o = t();
  if (!o) {
    if ((r = a.onError) != null) {
      r.call(a, "You are not signed in.");
    }
    return ve;
  }
  if (s.length > 0) {
    if ((i = a.onStatus) != null) {
      i.call(a, "uploading");
    }
  }
  const l = [];
  for (const t of s) {
    const s = await h(t, e);
    if (!s.success) {
      const e = s;
      let n;
      n = e.statusCode === 413 ? e.reason413 === "too_many_pages" ? `"${t.name}" has too many pages — the maximum is 1000.` : e.reason413 === "after_compression" ? `"${t.name}" is too large after conversion — exceeds the model's capacity.` : `"${t.name}" exceeds the 100 MB upload limit.` : e.message || `Failed to upload ${t.name}`;
      if ((c = a.onError) != null) {
        c.call(a, n);
      }
      return ve;
    }
    l.push(s.attachment_path);
  }
  const d = new WebSocket(p(o));
  let u = null;
  let m = null;
  let j = false;
  const x = () => {
    if (u) {
      clearInterval(u);
      u = null;
    }
    if (m) {
      clearTimeout(m);
      m = null;
    }
  };
  const g = () => {
    if (d.readyState === WebSocket.OPEN) {
      if (m) {
        d.close();
      } else {
        d.send(JSON.stringify({
          type: "ping",
          ts: Date.now()
        }));
        m = setTimeout(() => {
          m = null;
          d.close();
        }, 10000);
      }
    }
  };
  const v = {
    confirm: (e, t) => {
      if (d.readyState === WebSocket.OPEN) {
        const s = t == null ? undefined : t.trim();
        d.send(JSON.stringify({
          type: "course_update_confirm",
          approved: e,
          ...(s ? {
            feedback: s
          } : {})
        }));
      }
    },
    sendFeedback: e => {
      const t = e.trim();
      if (t && d.readyState === WebSocket.OPEN) {
        d.send(JSON.stringify({
          type: "course_update_feedback",
          feedback: t
        }));
      }
    },
    cancel: () => {
      j = true;
      if (d.readyState === WebSocket.OPEN) {
        d.send(JSON.stringify({
          type: "stop_course_update"
        }));
      }
      d.close();
    }
  };
  d.onopen = () => {
    x();
    g();
    u = setInterval(g, 25000);
    d.send(JSON.stringify({
      type: "start_course_update",
      course_uuid: e,
      attachment_paths: l,
      instruction: n
    }));
  };
  d.onmessage = e => {
    var t;
    var s;
    var n;
    var r;
    var i;
    var c;
    let o;
    try {
      o = JSON.parse(e.data);
    } catch {
      return;
    }
    switch (o.type) {
      case "pong":
        if (m) {
          clearTimeout(m);
          m = null;
        }
        break;
      case "course_update_started":
        if ((t = a.onStatus) != null) {
          t.call(a, "planning");
        }
        break;
      case "course_update_step":
        if ((s = a.onStatus) != null) {
          s.call(a, `${o.step_id}:${o.status}`);
        }
        break;
      case "course_update_plan":
        if ((n = a.onPlan) != null) {
          n.call(a, o.plan);
        }
        break;
      case "course_update_complete":
        j = true;
        if ((r = a.onComplete) != null) {
          r.call(a, o.course, o.message, o.new_unit_ids, o.new_session_ids);
        }
        d.close();
        break;
      case "course_update_stopped":
        j = true;
        if ((i = a.onStatus) != null) {
          i.call(a, "stopped");
        }
        d.close();
        break;
      case "course_update_error":
        j = true;
        if ((c = a.onError) != null) {
          c.call(a, o.message || "Update failed");
        }
        d.close();
    }
  };
  d.onerror = () => {
    var e;
    j = true;
    x();
    if ((e = a.onError) != null) {
      e.call(a, "Connection error during update.");
    }
  };
  d.onclose = () => {
    var e;
    x();
    if (!j) {
      j = true;
      if ((e = a.onError) != null) {
        e.call(a, "Connection lost during update. Please try again.");
      }
    }
  };
  return v;
};
const ke = (e, s) => {
  var n;
  const a = t();
  if (!a) {
    if ((n = s.onError) != null) {
      n.call(s, "You are not signed in.");
    }
    return ve;
  }
  const r = new WebSocket(p(a));
  let i = null;
  let c = null;
  let o = false;
  const l = () => {
    if (i) {
      clearInterval(i);
      i = null;
    }
    if (c) {
      clearTimeout(c);
      c = null;
    }
  };
  const d = () => {
    if (r.readyState === WebSocket.OPEN) {
      if (c) {
        r.close();
      } else {
        r.send(JSON.stringify({
          type: "ping",
          ts: Date.now()
        }));
        c = setTimeout(() => {
          c = null;
          r.close();
        }, 10000);
      }
    }
  };
  const u = {
    confirm: (e, t) => {
      if (r.readyState === WebSocket.OPEN) {
        const s = t == null ? undefined : t.trim();
        r.send(JSON.stringify({
          type: "course_update_confirm",
          approved: e,
          ...(s ? {
            feedback: s
          } : {})
        }));
      }
    },
    sendFeedback: e => {
      const t = e.trim();
      if (t && r.readyState === WebSocket.OPEN) {
        r.send(JSON.stringify({
          type: "course_update_feedback",
          feedback: t
        }));
      }
    },
    cancel: () => {
      o = true;
      if (r.readyState === WebSocket.OPEN) {
        r.send(JSON.stringify({
          type: "stop_course_update"
        }));
      }
      r.close();
    }
  };
  r.onopen = () => {
    l();
    d();
    i = setInterval(d, 25000);
    r.send(JSON.stringify({
      type: "start_course_update_from_canvas",
      course_uuid: e
    }));
  };
  r.onmessage = e => {
    var t;
    var n;
    var a;
    var i;
    var l;
    var d;
    let u;
    try {
      u = JSON.parse(e.data);
    } catch {
      return;
    }
    switch (u.type) {
      case "pong":
        if (c) {
          clearTimeout(c);
          c = null;
        }
        break;
      case "course_update_started":
        if ((t = s.onStatus) != null) {
          t.call(s, "planning");
        }
        break;
      case "course_update_step":
        if ((n = s.onStatus) != null) {
          n.call(s, `${u.step_id}:${u.status}`);
        }
        break;
      case "course_update_plan":
        if ((a = s.onPlan) != null) {
          a.call(s, u.plan);
        }
        break;
      case "course_update_complete":
        o = true;
        if ((i = s.onComplete) != null) {
          i.call(s, u.course, u.message, u.new_unit_ids, u.new_session_ids);
        }
        r.close();
        break;
      case "course_update_stopped":
        o = true;
        if ((l = s.onStatus) != null) {
          l.call(s, "stopped");
        }
        r.close();
        break;
      case "course_update_error":
        o = true;
        if ((d = s.onError) != null) {
          d.call(s, u.message || "Update failed");
        }
        r.close();
    }
  };
  r.onerror = () => {
    var e;
    o = true;
    l();
    if ((e = s.onError) != null) {
      e.call(s, "Connection error during update.");
    }
  };
  r.onclose = () => {
    var e;
    l();
    if (!o) {
      o = true;
      if ((e = s.onError) != null) {
        e.call(s, "Connection lost during update. Please try again.");
      }
    }
  };
  return u;
};
const be = [{
  id: "addUnit",
  titleKey: "courseExtend.suggestions.addUnit.title",
  hintKey: "courseExtend.suggestions.addUnit.hint",
  icon: o.jsxs("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.7",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
    children: [o.jsx("rect", {
      x: "3",
      y: "4",
      width: "18",
      height: "6",
      rx: "1.5"
    }), o.jsx("rect", {
      x: "3",
      y: "14",
      width: "11",
      height: "6",
      rx: "1.5"
    }), o.jsx("path", {
      d: "M19 14v6M22 17h-6"
    })]
  })
}, {
  id: "extendLecture",
  titleKey: "courseExtend.suggestions.extendLecture.title",
  hintKey: "courseExtend.suggestions.extendLecture.hint",
  icon: o.jsxs("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.7",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
    children: [o.jsx("path", {
      d: "M4 6h16M4 12h10M4 18h7"
    }), o.jsx("path", {
      d: "M17 15v6M20 18h-6"
    })]
  })
}, {
  id: "attachReference",
  titleKey: "courseExtend.suggestions.attachReference.title",
  hintKey: "courseExtend.suggestions.attachReference.hint",
  icon: o.jsx("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.7",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
    children: o.jsx("path", {
      d: "M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66L9.41 17.41a2 2 0 0 1-2.83-2.83l8.49-8.48"
    })
  })
}];
const fe = ({
  open: e,
  onClose: t,
  courseUuid: s,
  onUpdated: a,
  scopeInstruction: r,
  scopeLabel: i,
  placeholder: c
}) => {
  const {
    t: l
  } = n();
  const d = c ?? l("courseExtend.instructionPlaceholder");
  const [p, h] = u.useState([]);
  const [g, v] = u.useState("");
  const [y, k] = u.useState("");
  const [b, f] = u.useState(false);
  const [N, w] = u.useState("idle");
  const [C, S] = u.useState(null);
  const [I, L] = u.useState("");
  const E = u.useRef(null);
  const M = u.useRef(null);
  const T = u.useRef(null);
  const P = N === "uploading" || N === "planning" || N === "applying";
  const _ = e => {
    if (!e || e.length === 0) {
      return;
    }
    const t = Array.from(e);
    h(e => [...e, ...t]);
  };
  const U = () => {
    var e;
    if (!P) {
      if ((e = M.current) != null) {
        e.cancel();
      }
      M.current = null;
      t();
    }
  };
  const $ = (p.length > 0 || g.trim().length > 0) && !!s;
  const D = async () => {
    if (!$ || !s) {
      return;
    }
    L("");
    w(p.length > 0 ? "uploading" : "planning");
    const e = [r, g.trim()].filter(Boolean).join("\n\n");
    M.current = await ye(s, p, e, {
      onStatus: e => {
        if (e === "uploading") {
          w("uploading");
        } else if (e === "planning" || e.startsWith("planning:")) {
          w("planning");
        } else if (e.startsWith("applying:")) {
          w("applying");
        } else if (e === "stopped") {
          L(l("courseExtend.reviewTimedOut"));
          w("error");
        }
      },
      onPlan: e => {
        S(e);
        w("review");
      },
      onComplete: (e, s, n, r) => {
        w("done");
        if (a != null) {
          a(n, r);
        }
        T.current = setTimeout(() => t(), 1500);
      },
      onError: e => {
        L(e);
        w("error");
      }
    });
  };
  u.useEffect(() => {
    if (e) {
      h([]);
      v("");
      k("");
      f(false);
      w("idle");
      S(null);
      L("");
    }
  }, [e]);
  u.useEffect(() => {
    if (!e) {
      return;
    }
    const t = e => {
      if (e.key === "Escape" && !P) {
        U();
      }
    };
    window.addEventListener("keydown", t);
    return () => window.removeEventListener("keydown", t);
  }, [e, P]);
  u.useEffect(() => () => {
    var e;
    if (T.current) {
      clearTimeout(T.current);
    }
    if ((e = M.current) != null) {
      e.cancel();
    }
    M.current = null;
  }, []);
  if (!e) {
    return null;
  }
  const F = C ? ((e, t) => {
    const s = [];
    e.newUnits.forEach((e, n) => s.push({
      key: `u${n}`,
      tag: t("courseExtend.planTags.newUnit"),
      title: e.title,
      hint: t("courseExtend.lectureCount", {
        count: e.lectures.length
      })
    }));
    e.newLectures.forEach((e, n) => s.push({
      key: `l${n}`,
      tag: t("courseExtend.planTags.newLecture"),
      title: e.lecture.title,
      hint: t("courseExtend.addedToHint", {
        target: e.targetUnitName || e.targetUnitId
      })
    }));
    e.newSessions.forEach((e, n) => s.push({
      key: `s${n}`,
      tag: t("courseExtend.planTags.newSession"),
      title: e.session.title,
      hint: t("courseExtend.addedToHint", {
        target: e.targetLectureName || e.targetLectureId
      })
    }));
    e.newReferences.forEach((e, n) => s.push({
      key: `r${n}`,
      tag: t("courseExtend.planTags.reference"),
      title: e.referenceName || e.referenceId,
      hint: t("courseExtend.attachedToHint", {
        target: e.targetSessionName || t("courseExtend.aSessionFallback")
      })
    }));
    return s;
  })(C, l) : [];
  return o.jsx("div", {
    className: "extend-overlay",
    onClick: U,
    onDragOver: e => e.preventDefault(),
    onDrop: e => e.preventDefault(),
    children: o.jsxs("div", {
      className: "extend-palette",
      role: "dialog",
      "aria-modal": "true",
      "aria-label": "Extend course",
      onClick: e => e.stopPropagation(),
      children: [i && o.jsxs("div", {
        className: "extend-scope-chip",
        children: [o.jsxs("svg", {
          width: "13",
          height: "13",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "1.8",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          "aria-hidden": "true",
          children: [o.jsx("path", {
            d: "M10 13a5 5 0 0 0 7.07 0l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"
          }), o.jsx("path", {
            d: "M14 11a5 5 0 0 0-7.07 0l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
          })]
        }), o.jsx("span", {
          children: o.jsx(m, {
            i18nKey: "courseExtend.scopedTo",
            values: {
              scopeLabel: i
            },
            components: {
              strong: o.jsx("strong", {})
            }
          })
        })]
      }), !C && N === "idle" && o.jsxs(o.Fragment, {
        children: [o.jsx("div", {
          className: "extend-suggest-label extend-suggest-label--top",
          children: l("courseExtend.suggestionsLabel")
        }), o.jsx("div", {
          className: "extend-suggest-list extend-suggest-list--top",
          children: be.map(e => o.jsxs("div", {
            className: "extend-suggest-row",
            children: [o.jsx("span", {
              className: "extend-suggest-icon",
              children: e.icon
            }), o.jsxs("span", {
              className: "extend-suggest-copy",
              children: [o.jsx("span", {
                className: "extend-suggest-title",
                children: l(e.titleKey)
              }), o.jsx("span", {
                className: "extend-suggest-hint",
                children: l(e.hintKey)
              })]
            }), o.jsx("svg", {
              className: "extend-suggest-arrow",
              width: "16",
              height: "16",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "1.8",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              "aria-hidden": "true",
              children: o.jsx("path", {
                d: "M9 6l6 6-6 6"
              })
            })]
          }, e.id))
        }), o.jsx("div", {
          className: "extend-palette-divider"
        })]
      }), o.jsxs("div", {
        className: `extend-dropzone${b ? " extend-dropzone--drag" : ""}${N !== "idle" ? " extend-dropzone--disabled" : ""}`,
        role: "button",
        tabIndex: N === "idle" ? 0 : -1,
        "aria-disabled": N !== "idle",
        onClick: () => {
          var e;
          if (N === "idle") {
            if ((e = E.current) != null) {
              e.click();
            }
          }
        },
        onKeyDown: e => {
          var t;
          if ((e.key === "Enter" || e.key === " ") && N === "idle") {
            e.preventDefault();
            if ((t = E.current) != null) {
              t.click();
            }
          }
        },
        onDragOver: e => {
          e.preventDefault();
          if (N === "idle") {
            f(true);
          }
        },
        onDragLeave: () => f(false),
        onDrop: e => {
          e.preventDefault();
          f(false);
          if (N === "idle") {
            _(e.dataTransfer.files);
          }
        },
        children: [o.jsxs("svg", {
          width: "20",
          height: "20",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "1.7",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          "aria-hidden": "true",
          children: [o.jsx("path", {
            d: "M12 15V4M8 8l4-4 4 4"
          }), o.jsx("path", {
            d: "M4 14v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4"
          })]
        }), o.jsx("span", {
          className: "extend-dropzone-text",
          children: o.jsx(m, {
            i18nKey: "courseExtend.dropzoneText",
            components: {
              browse: o.jsx("span", {
                className: "extend-dropzone-browse"
              })
            }
          })
        })]
      }), o.jsx("input", {
        ref: E,
        type: "file",
        multiple: true,
        accept: j,
        hidden: true,
        onChange: e => {
          _(e.target.files);
          e.target.value = "";
        }
      }), p.length > 0 && o.jsx("div", {
        className: "extend-file-list",
        children: p.map((e, t) => {
          const s = ((e, t) => {
            var s;
            const n = ((s = e.split(".").pop()) == null ? undefined : s.toLowerCase()) ?? "";
            const a = n.slice(0, 3).toUpperCase();
            return {
              pdf: {
                label: "PDF",
                tone: "red"
              },
              ppt: {
                label: "PPT",
                tone: "orange"
              },
              pptx: {
                label: "PPT",
                tone: "orange"
              },
              doc: {
                label: "DOC",
                tone: "blue"
              },
              docx: {
                label: "DOC",
                tone: "blue"
              },
              md: {
                label: "MD",
                tone: "green"
              },
              txt: {
                label: "TXT",
                tone: "gray"
              }
            }[n] ?? {
              label: a || t("courseExtend.fileBadgeFallback"),
              tone: "gray"
            };
          })(e.name, l);
          return o.jsxs("div", {
            className: "extend-file-row",
            children: [o.jsx("span", {
              className: `extend-file-icon extend-file-icon--${s.tone}`,
              children: o.jsxs("svg", {
                width: "14",
                height: "14",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "1.8",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                "aria-hidden": "true",
                children: [o.jsx("path", {
                  d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                }), o.jsx("polyline", {
                  points: "14 2 14 8 20 8"
                })]
              })
            }), o.jsxs("span", {
              className: "extend-file-meta",
              children: [o.jsx("span", {
                className: "extend-file-name",
                children: e.name
              }), o.jsx("span", {
                className: "extend-file-tag",
                children: s.label
              })]
            }), N === "idle" && o.jsx("button", {
              type: "button",
              className: "extend-file-remove",
              "aria-label": `Remove ${e.name}`,
              onClick: () => (e => {
                h(t => t.filter((t, s) => s !== e));
              })(t),
              children: o.jsx("svg", {
                width: "13",
                height: "13",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "2",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                "aria-hidden": "true",
                children: o.jsx("path", {
                  d: "M6 6l12 12M18 6L6 18"
                })
              })
            })]
          }, `${e.name}-${t}`);
        })
      }), (N === "uploading" || N === "planning") && o.jsxs("div", {
        className: "extend-status-row",
        children: [o.jsx("span", {
          className: "extend-status-spinner",
          "aria-hidden": "true"
        }), N === "uploading" && l("courseExtend.uploadingFiles"), N === "planning" && (C ? l("courseExtend.revisingPlan") : p.length > 0 ? l("courseExtend.planningUpdates") : l("courseExtend.planningFromRequest"))]
      }), N === "error" && I && o.jsxs("div", {
        className: "extend-error-row",
        role: "alert",
        children: [o.jsxs("svg", {
          width: "14",
          height: "14",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          "aria-hidden": "true",
          style: {
            flexShrink: 0,
            marginTop: 1
          },
          children: [o.jsx("circle", {
            cx: "12",
            cy: "12",
            r: "10"
          }), o.jsx("line", {
            x1: "12",
            y1: "8",
            x2: "12",
            y2: "12"
          }), o.jsx("line", {
            x1: "12",
            y1: "16",
            x2: "12.01",
            y2: "16"
          })]
        }), I]
      }), !C && N === "idle" && o.jsxs("div", {
        className: "extend-palette-instruction",
        children: [o.jsxs("label", {
          className: "extend-instruction-label",
          htmlFor: "extend-instruction-input",
          children: [l("courseExtend.instructionsLabel"), p.length > 0 && o.jsxs(o.Fragment, {
            children: [" ", o.jsx("span", {
              className: "extend-instruction-optional",
              children: l("courseExtend.optionalHint")
            })]
          })]
        }), o.jsxs("div", {
          className: "extend-instruction-field",
          children: [o.jsx("input", {
            id: "extend-instruction-input",
            className: "extend-instruction-input",
            value: g,
            onChange: e => v(e.target.value),
            onKeyDown: e => {
              if (!x(e) && e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                D();
              }
            },
            placeholder: d,
            autoFocus: true
          }), o.jsx("button", {
            type: "button",
            className: "extend-instruction-send",
            "aria-label": "Send",
            disabled: !$ || P,
            onClick: D,
            children: o.jsx("img", {
              src: "/pages/mainPages/home/arrow.svg",
              alt: "",
              "aria-hidden": "true"
            })
          })]
        })]
      }), C ? o.jsxs(o.Fragment, {
        children: [o.jsx("div", {
          className: "extend-suggest-label",
          children: l("courseExtend.proposedChangesLabel")
        }), o.jsx("div", {
          className: "extend-suggest-list",
          children: F.length === 0 ? o.jsx("div", {
            className: "extend-suggest-empty",
            children: l("courseExtend.noChangesProposed")
          }) : F.map(e => o.jsxs("div", {
            className: "extend-suggest-row",
            children: [o.jsx("span", {
              className: "extend-suggest-tag",
              children: e.tag
            }), o.jsxs("span", {
              className: "extend-suggest-copy",
              children: [o.jsx("span", {
                className: "extend-suggest-title",
                children: e.title
              }), o.jsx("span", {
                className: "extend-suggest-hint",
                children: e.hint
              })]
            })]
          }, e.key))
        }), (N === "review" || N === "applying" || N === "done") && o.jsxs("div", {
          className: "extend-review-footer",
          children: [N === "review" && o.jsx("textarea", {
            className: "extend-feedback-input",
            value: y,
            onChange: e => k(e.target.value),
            placeholder: l("courseExtend.feedbackPlaceholder"),
            rows: 2
          }), o.jsx("div", {
            className: "extend-review-actions",
            children: N === "review" && y.trim() ? o.jsx("button", {
              type: "button",
              className: "extend-palette-submit",
              onClick: () => {
                var e;
                if (N === "review" && y.trim()) {
                  if ((e = M.current) != null) {
                    e.sendFeedback(y);
                  }
                  k("");
                  w("planning");
                }
              },
              children: l("courseExtend.sendFeedback")
            }) : o.jsx("button", {
              type: "button",
              className: "extend-palette-submit" + (N === "done" ? " extend-palette-submit--done" : ""),
              disabled: N !== "review",
              onClick: () => {
                var e;
                if (N === "review") {
                  w("applying");
                  if ((e = M.current) != null) {
                    e.confirm(true);
                  }
                }
              },
              children: l(N === "done" ? "courseExtend.applyDone" : N === "applying" ? "courseExtend.applying" : "courseExtend.applyNoFeedback")
            })
          })]
        })]
      }) : null]
    })
  });
};
const Ne = ({
  name: e,
  color: t,
  path: s
}) => o.jsx("svg", {
  className: "extend-fan-glyph",
  width: "18",
  height: "18",
  viewBox: "0 0 24 24",
  role: "img",
  "aria-label": e,
  children: o.jsx("path", {
    d: s,
    fill: t
  })
});
const we = [{
  name: "Word",
  color: "#2B579A",
  jx: "-2px",
  jy: "2px",
  jr: "-6deg",
  path: "M23.004 1.5q.41 0 .703.293t.293.703v19.008q0 .41-.293.703t-.703.293H6.996q-.41 0-.703-.293T6 21.504V18H.996q-.41 0-.703-.293T0 17.004V6.996q0-.41.293-.703T.996 6H6V2.496q0-.41.293-.703t.703-.293zM6.035 11.203l1.442 4.735h1.64l1.57-7.876H9.036l-.937 4.653-1.325-4.5H5.38l-1.406 4.523-.938-4.675H1.312l1.57 7.874h1.641zM22.5 21v-3h-15v3zm0-4.5v-3.75H12v3.75zm0-5.25V7.5H12v3.75zm0-5.25V3h-15v3Z"
}, {
  name: "Markdown",
  color: "#1A1A1A",
  jx: "3px",
  jy: "-3px",
  jr: "4deg",
  path: "M22.27 19.385H1.73A1.73 1.73 0 010 17.655V6.345a1.73 1.73 0 011.73-1.73h20.54A1.73 1.73 0 0124 6.345v11.308a1.73 1.73 0 01-1.73 1.731zM5.769 15.923v-4.5l2.308 2.885 2.307-2.885v4.5h2.308V8.078h-2.308l-2.307 2.885-2.308-2.885H3.46v7.847zM21.232 12h-2.309V8.077h-2.307V12h-2.308l3.461 4.039z"
}, {
  name: "Excel",
  color: "#217346",
  jx: "-3px",
  jy: "1px",
  jr: "-2deg",
  path: "M23 1.5q.41 0 .7.3.3.29.3.7v19q0 .41-.3.7-.29.3-.7.3H7q-.41 0-.7-.3-.3-.29-.3-.7V18H1q-.41 0-.7-.3-.3-.29-.3-.7V7q0-.41.3-.7Q.58 6 1 6h5V2.5q0-.41.3-.7.29-.3.7-.3zM6 13.28l1.42 2.66h2.14l-2.38-3.87 2.34-3.8H7.46l-1.3 2.4-.05.08-.04.09-.64-1.28-.66-1.29H2.59l2.27 3.82-2.48 3.85h2.16zM14.25 21v-3H7.5v3zm0-4.5v-3.75H12v3.75zm0-5.25V7.5H12v3.75zm0-5.25V3H7.5v3zm8.25 15v-3h-6.75v3zm0-4.5v-3.75h-6.75v3.75zm0-5.25V7.5h-6.75v3.75zm0-5.25V3h-6.75v3Z"
}, {
  name: "Adobe Acrobat",
  color: "#EC1C24",
  jx: "2px",
  jy: "-2px",
  jr: "7deg",
  path: "M23.63 15.3c-.71-.745-2.166-1.17-4.224-1.17-1.1 0-2.377.106-3.761.354a19.443 19.443 0 0 1-2.307-2.661c-.532-.71-.994-1.49-1.42-2.236.817-2.484 1.207-4.507 1.207-5.962 0-1.632-.603-3.336-2.342-3.336-.532 0-1.065.32-1.349.781-.78 1.384-.425 4.4.923 7.381a60.277 60.277 0 0 1-1.703 4.507c-.568 1.349-1.207 2.733-1.917 4.01C2.834 18.53.314 20.34.03 21.758c-.106.533.071 1.03.462 1.42.142.107.639.533 1.49.533 2.59 0 5.323-4.188 6.707-6.707 1.065-.355 2.13-.71 3.194-.994a34.963 34.963 0 0 1 3.407-.745c2.732 2.448 5.145 2.839 6.352 2.839 1.49 0 2.023-.604 2.2-1.1.32-.64.106-1.349-.213-1.704zm-1.42 1.03c-.107.532-.64.887-1.384.887-.213 0-.39-.036-.604-.071-1.348-.32-2.626-.994-3.903-2.059a17.717 17.717 0 0 1 2.98-.248c.746 0 1.385.035 1.81.142.497.106 1.278.426 1.1 1.348zm-7.524-1.668a38.01 38.01 0 0 0-2.945.674 39.68 39.68 0 0 0-2.52.745 40.05 40.05 0 0 0 1.207-2.555c.426-.994.78-2.023 1.136-2.981.354.603.745 1.207 1.135 1.739a50.127 50.127 0 0 0 1.987 2.378zM10.038 1.46a.768.768 0 0 1 .674-.425c.745 0 .887.851.887 1.526 0 1.135-.355 2.874-.958 4.861-1.03-2.768-1.1-5.074-.603-5.962zM6.134 17.997c-1.81 2.981-3.549 4.826-4.613 4.826a.872.872 0 0 1-.532-.177c-.213-.213-.32-.461-.249-.745.213-1.065 2.271-2.555 5.394-3.904Z"
}];
const Ce = ({
  courseUuid: e,
  onUpdated: t,
  canvasUpdateStatus: s,
  onEntryClick: a
}) => {
  const {
    t: r
  } = n();
  const [i, c] = u.useState(false);
  return o.jsxs(o.Fragment, {
    children: [o.jsxs("button", {
      type: "button",
      className: "extend-entry",
      onClick: () => a ? a() : c(true),
      children: [o.jsx("span", {
        className: "extend-fan",
        "aria-hidden": "true",
        children: we.map((e, t) => o.jsx("span", {
          className: "extend-fan-card" + (t === we.length - 1 ? " extend-fan-card--front" : ""),
          style: {
            "--i": t,
            "--n": we.length,
            "--jx": e.jx,
            "--jy": e.jy,
            "--jr": e.jr
          },
          children: o.jsx(Ne, {
            name: e.name,
            color: e.color,
            path: e.path
          })
        }, e.name))
      }), o.jsxs("span", {
        className: "extend-entry-copy",
        children: [o.jsx("span", {
          className: "extend-entry-title",
          children: r("courseExtend.entryTitle")
        }), o.jsx("span", {
          className: "extend-entry-sub",
          children: r("courseExtend.entrySubtitle")
        })]
      }), (s == null ? undefined : s.status) === "checking" && o.jsxs("span", {
        className: "extend-entry-canvas-status",
        "aria-live": "polite",
        children: [o.jsx("span", {
          className: "extend-entry-canvas-spinner",
          "aria-hidden": "true"
        }), r("extendCourseEntry.checkingUpdates")]
      }), (s == null ? undefined : s.status) === "done" && s.updates.hasBaseline && s.updates.total === 0 && o.jsx("span", {
        className: "extend-entry-canvas-status extend-entry-canvas-status--uptodate",
        "aria-live": "polite",
        children: r("extendCourseEntry.upToDate")
      })]
    }), o.jsx(fe, {
      open: i,
      onClose: () => c(false),
      courseUuid: e,
      onUpdated: t
    })]
  });
};
const Se = (e, t) => {
  const s = [];
  const n = e.newFiles + e.changedFiles;
  if (n > 0) {
    s.push(t("canvasUpdateCard.filesCount", {
      count: n
    }));
  }
  const a = e.newAssignments + e.changedDue;
  if (a > 0) {
    s.push(t("canvasUpdateCard.assignmentsCount", {
      count: a
    }));
  }
  if (e.syllabusChanged) {
    s.push(t("canvasUpdateCard.syllabusChanged"));
  }
  const r = (e.newModules ?? 0) + (e.changedModules ?? 0);
  if (r > 0) {
    s.push(t("canvasUpdateCard.modulesCount", {
      count: r
    }));
  }
  const i = (e.newAnnouncements ?? 0) + (e.changedAnnouncements ?? 0);
  if (i > 0) {
    s.push(t("canvasUpdateCard.announcementsCount", {
      count: i
    }));
  }
  return s;
};
const Ie = e => e.newUnits.length + e.newLectures.length + e.newSessions.length + e.newReferences.length;
const Le = ({
  courseUuid: t,
  updates: s,
  onUpdated: a,
  onResolved: r,
  onActionStart: i
}) => {
  const {
    t: c
  } = n();
  const [l, d] = u.useState(false);
  const [p, h] = u.useState("idle");
  const [m, j] = u.useState(null);
  const [x, g] = u.useState("");
  const [v, y] = u.useState("");
  const k = u.useRef(null);
  u.useEffect(() => () => {
    var e;
    if ((e = k.current) != null) {
      e.cancel();
    }
    k.current = null;
  }, []);
  const b = async () => {
    if (p === "idle" || p === "error") {
      h("done");
      g(c("canvasUpdateCard.ignoredDone"));
      if (i != null) {
        i();
      }
      await async function (t) {
        try {
          const s = await fetch(e(`/api/v1/course-generation/courses/${encodeURIComponent(t)}/canvas-updates/dismiss`), {
            method: "POST",
            headers: z()
          });
          if (s.ok) {
            return await s.json();
          } else {
            return Y;
          }
        } catch {
          return Y;
        }
      }(t);
      r();
    }
  };
  const f = async () => {
    d(false);
    await b();
  };
  const N = async () => {
    d(false);
    h("done");
    g(c("canvasUpdateCard.disabledDone"));
    if (i != null) {
      i();
    }
    await async function () {
      try {
        const t = await fetch(e("/api/v1/course-generation/courses/canvas-updates/disable"), {
          method: "POST",
          headers: z()
        });
        if (t.ok) {
          return await t.json();
        } else {
          return Y;
        }
      } catch {
        return Y;
      }
    }();
    r();
  };
  if (l) {
    return o.jsxs("div", {
      className: "canvas-update-card canvas-update-card--reject",
      children: [o.jsx("p", {
        className: "canvas-update-card-reject-text",
        children: c("canvasUpdateCard.rejectConfirm")
      }), o.jsxs("div", {
        className: "canvas-update-card-actions",
        children: [o.jsx("button", {
          type: "button",
          className: "canvas-update-card-btn canvas-update-card-btn--danger",
          onClick: N,
          children: c("canvasUpdateCard.rejectYes")
        }), o.jsx("button", {
          type: "button",
          className: "canvas-update-card-btn",
          onClick: f,
          children: c("canvasUpdateCard.rejectNo")
        })]
      })]
    });
  }
  const w = m ? ((e, t) => {
    const s = [];
    e.newUnits.forEach((e, n) => {
      s.push({
        key: `u${n}`,
        tag: t("canvasUpdateCard.tagUnit"),
        title: e.title,
        placement: t("canvasUpdateCard.placementEndOfCourse")
      });
    });
    e.newLectures.forEach((e, n) => {
      s.push({
        key: `l${n}`,
        tag: t("canvasUpdateCard.tagLecture"),
        title: e.lecture.title,
        placement: e.targetUnitName ? t("canvasUpdateCard.placementUnit", {
          unit: e.targetUnitName
        }) : ""
      });
    });
    e.newSessions.forEach((e, n) => {
      let a = "";
      if (e.targetLectureName && e.targetUnitName) {
        a = t("canvasUpdateCard.placementLectureInUnit", {
          lecture: e.targetLectureName,
          unit: e.targetUnitName
        });
      } else if (e.targetLectureName) {
        a = t("canvasUpdateCard.placementLecture", {
          lecture: e.targetLectureName
        });
      }
      s.push({
        key: `s${n}`,
        tag: t("canvasUpdateCard.tagSession"),
        title: e.session.title,
        placement: a
      });
    });
    e.newReferences.forEach((e, n) => {
      s.push({
        key: `r${n}`,
        tag: t("canvasUpdateCard.tagReference"),
        title: e.referenceName || e.referenceId,
        placement: e.targetSessionName ? t("canvasUpdateCard.placementSession", {
          session: e.targetSessionName
        }) : ""
      });
    });
    return s;
  })(m, c) : [];
  const C = w.slice(0, 3);
  const S = w.length - C.length;
  return o.jsxs("div", {
    className: "canvas-update-card",
    children: [o.jsxs("div", {
      className: "canvas-update-card-head",
      children: [o.jsx("span", {
        className: "canvas-update-card-icon",
        "aria-hidden": "true",
        children: o.jsxs("svg", {
          width: "16",
          height: "16",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          strokeWidth: "1.8",
          strokeLinecap: "round",
          strokeLinejoin: "round",
          children: [o.jsx("path", {
            d: "M12 2v6M12 16v6M2 12h6M16 12h6"
          }), o.jsx("circle", {
            cx: "12",
            cy: "12",
            r: "3"
          })]
        })
      }), o.jsxs("span", {
        className: "canvas-update-card-copy",
        children: [o.jsx("span", {
          className: "canvas-update-card-title",
          children: c("canvasUpdateCard.title", {
            count: s.total
          })
        }), p === "idle" && o.jsx("span", {
          className: "canvas-update-card-sub",
          children: Se(s, c).join(" · ") || c("canvasUpdateCard.subtitle")
        })]
      })]
    }), (p === "syncing" || p === "applying") && o.jsxs("div", {
      className: "canvas-update-card-status",
      children: [o.jsx("span", {
        className: "canvas-update-card-spinner",
        "aria-hidden": "true"
      }), c(p === "syncing" ? "canvasUpdateCard.syncing" : "canvasUpdateCard.applying")]
    }), p === "review" && m && o.jsxs("div", {
      className: "canvas-update-card-review",
      children: [o.jsx("div", {
        className: "canvas-update-card-review-summary",
        children: c("canvasUpdateCard.planSummary", {
          count: Ie(m)
        })
      }), C.length > 0 && o.jsxs("ul", {
        className: "canvas-update-card-review-list",
        children: [C.map(e => o.jsxs("li", {
          className: "canvas-update-card-review-item",
          children: [o.jsx("span", {
            className: "canvas-update-card-review-tag",
            children: e.tag
          }), o.jsx("span", {
            className: "canvas-update-card-review-title",
            title: e.title,
            children: e.title
          }), e.placement && o.jsx("span", {
            className: "canvas-update-card-review-placement",
            title: e.placement,
            children: e.placement
          })]
        }, e.key)), S > 0 && o.jsx("li", {
          className: "canvas-update-card-review-more",
          children: c("canvasUpdateCard.planMore", {
            count: S
          })
        })]
      })]
    }), p === "done" && o.jsxs("div", {
      className: "canvas-update-card-status canvas-update-card-status--done",
      children: [o.jsx("svg", {
        width: "14",
        height: "14",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2.4",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        "aria-hidden": "true",
        children: o.jsx("path", {
          d: "M5 12.5L10 17.5L19 7.5"
        })
      }), x || c("canvasUpdateCard.doneDefault")]
    }), p === "error" && v && o.jsx("div", {
      className: "canvas-update-card-status canvas-update-card-status--error",
      children: v
    }), p === "idle" || p === "error" ? o.jsxs("div", {
      className: "canvas-update-card-actions",
      children: [o.jsx("button", {
        type: "button",
        className: "canvas-update-card-btn canvas-update-card-btn--accept",
        onClick: () => {
          if (p === "idle" || p === "error") {
            y("");
            h("syncing");
            if (i != null) {
              i();
            }
            k.current = ke(t, {
              onStatus: e => {
                if (e === "stopped") {
                  k.current = null;
                  h("idle");
                  j(null);
                  r();
                } else if (e.startsWith("applying:")) {
                  h("applying");
                } else {
                  h("syncing");
                }
              },
              onPlan: e => {
                j(e);
                h("review");
              },
              onComplete: (e, t, s, n) => {
                r({
                  accepted: true
                });
                h("done");
                g(t || "");
                if (e) {
                  if (a != null) {
                    a(e, s, n);
                  }
                }
              },
              onError: e => {
                y(e);
                h("error");
              }
            });
          }
        },
        children: c(p === "error" ? "canvasUpdateCard.retry" : "canvasUpdateCard.accept")
      }), o.jsx("button", {
        type: "button",
        className: "canvas-update-card-btn",
        onClick: b,
        children: c("canvasUpdateCard.ignore")
      }), o.jsx("button", {
        type: "button",
        className: "canvas-update-card-btn canvas-update-card-btn--reject",
        onClick: () => d(true),
        children: c("canvasUpdateCard.reject")
      })]
    }) : p === "review" ? o.jsxs("div", {
      className: "canvas-update-card-actions",
      children: [o.jsx("button", {
        type: "button",
        className: "canvas-update-card-btn canvas-update-card-btn--accept",
        onClick: () => {
          var e;
          if (p === "review") {
            h("applying");
            if ((e = k.current) != null) {
              e.confirm(true);
            }
          }
        },
        children: c("canvasUpdateCard.confirmAdd")
      }), o.jsx("button", {
        type: "button",
        className: "canvas-update-card-btn",
        onClick: () => {
          var e;
          if (p === "review") {
            if ((e = k.current) != null) {
              e.confirm(false);
            }
          }
        },
        children: c("canvasUpdateCard.cancelReview")
      })]
    }) : null]
  });
};
const Ee = () => o.jsx("svg", {
  width: "13",
  height: "13",
  viewBox: "0 0 24 24",
  fill: "currentColor",
  "aria-hidden": "true",
  children: o.jsx("path", {
    d: "M8 5.5v13a1 1 0 0 0 1.52.85l10.5-6.5a1 1 0 0 0 0-1.7L9.52 4.65A1 1 0 0 0 8 5.5Z"
  })
});
const Me = () => o.jsxs("svg", {
  width: "13",
  height: "13",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "1.8",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": "true",
  children: [o.jsx("path", {
    d: "M12 20h9"
  }), o.jsx("path", {
    d: "M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5Z"
  })]
});
const Te = ({
  kind: e
}) => e === "learn" ? o.jsx(Ee, {}) : e === "practice" ? o.jsx(Me, {}) : o.jsx(D, {
  type: e,
  size: 13
});
const Pe = ({
  total: e,
  nextStep: t,
  isNewCourse: s,
  onContinue: a
}) => {
  const {
    t: r
  } = n();
  if (e === 0) {
    return null;
  }
  if (!t) {
    return o.jsxs("div", {
      className: "cj-next-step-pill cj-next-step-pill--done",
      "aria-label": "Course completed",
      children: [o.jsx("svg", {
        className: "cj-next-step-pill-icon",
        width: "13",
        height: "13",
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2.3",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        "aria-hidden": "true",
        children: o.jsx("path", {
          d: "M5 12.5l4.5 4.5L19 7.5"
        })
      }), o.jsx("span", {
        className: "cj-next-step-pill-text",
        children: r("courseNextStep.completed")
      })]
    });
  }
  const i = `${t.unitLabel} · ${t.title}`;
  const c = r(s ? "courseNextStep.newCoursePrompt" : "courseNextStep.next", {
    itemTitle: i
  });
  return o.jsxs("button", {
    type: "button",
    className: "cj-next-step-pill",
    onClick: a,
    disabled: !t.targetPath,
    title: c,
    children: [o.jsx("span", {
      className: `cj-next-step-pill-icon cj-next-step-pill-icon--${t.kind}`,
      children: o.jsx(Te, {
        kind: t.kind
      })
    }), o.jsx("span", {
      className: "cj-next-step-pill-title",
      children: c
    }), o.jsx("svg", {
      className: "cj-next-step-pill-arrow",
      width: "13",
      height: "13",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      children: o.jsx("path", {
        d: "M9 6l6 6-6 6"
      })
    })]
  });
};
const _e = ({
  open: e,
  onClose: t
}) => {
  const {
    t: s
  } = n();
  a.useEffect(() => {
    if (!e) {
      return;
    }
    const s = e => {
      if (e.key === "Escape") {
        t();
      }
    };
    document.addEventListener("keydown", s);
    return () => document.removeEventListener("keydown", s);
  }, [e, t]);
  if (e) {
    return o.jsx("div", {
      className: "cj-intro-overlay",
      onClick: t,
      children: o.jsx("section", {
        className: "cj-intro-modal",
        onClick: e => e.stopPropagation(),
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": "cj-intro-title",
        "aria-describedby": "cj-intro-desc",
        children: o.jsxs("div", {
          className: "cj-intro-row",
          children: [o.jsx("div", {
            className: "cj-intro-media",
            "aria-hidden": "true",
            children: o.jsx(g, {
              className: "cj-intro-video"
            })
          }), o.jsxs("div", {
            className: "cj-intro-body",
            children: [o.jsx("span", {
              id: "cj-intro-title",
              className: "cj-intro-title",
              children: s("courseIntro.title")
            }), o.jsxs("div", {
              id: "cj-intro-desc",
              className: "cj-intro-desc",
              children: [o.jsx("p", {
                children: o.jsx(m, {
                  i18nKey: "courseIntro.paragraph1",
                  components: {
                    strong: o.jsx("strong", {})
                  }
                })
              }), o.jsx("p", {
                children: o.jsx(m, {
                  i18nKey: "courseIntro.paragraph2",
                  components: {
                    strong: o.jsx("strong", {})
                  }
                })
              }), o.jsx("p", {
                children: o.jsx(m, {
                  i18nKey: "courseIntro.paragraph3",
                  components: {
                    strong: o.jsx("strong", {})
                  }
                })
              })]
            }), o.jsx("button", {
              type: "button",
              className: "cj-intro-btn",
              onClick: t,
              children: s("courseIntro.gotIt")
            })]
          })]
        })
      })
    });
  } else {
    return null;
  }
};
const Ue = ({
  reminder: e,
  onLater: t,
  onStartNow: s
}) => {
  const {
    t: r
  } = n();
  a.useEffect(() => {
    if (!e) {
      return;
    }
    const s = e => {
      if (e.key === "Escape") {
        t();
      }
    };
    document.addEventListener("keydown", s);
    return () => document.removeEventListener("keydown", s);
  }, [e, t]);
  if (!e) {
    return null;
  }
  const i = `${e.unitLabel} · ${e.sessionTitle}`;
  return o.jsx("div", {
    className: "cj-practice-reminder-overlay",
    onClick: t,
    children: o.jsx("section", {
      className: "cj-practice-reminder-modal",
      onClick: e => e.stopPropagation(),
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": "cj-practice-reminder-title",
      "aria-describedby": "cj-practice-reminder-desc",
      children: o.jsxs("div", {
        className: "cj-practice-reminder-row",
        children: [o.jsx("div", {
          className: "cj-practice-reminder-media",
          "aria-hidden": "true",
          children: o.jsx(g, {
            className: "cj-practice-reminder-video"
          })
        }), o.jsxs("div", {
          className: "cj-practice-reminder-body",
          children: [o.jsx("span", {
            className: "cj-practice-reminder-eyebrow",
            children: r("practiceReminder.eyebrow")
          }), o.jsx("span", {
            id: "cj-practice-reminder-title",
            className: "cj-practice-reminder-title",
            children: r("practiceReminder.title")
          }), o.jsx("span", {
            id: "cj-practice-reminder-desc",
            className: "cj-practice-reminder-desc",
            children: o.jsx(m, {
              i18nKey: "practiceReminder.description",
              values: {
                target: i
              },
              components: {
                target: o.jsx("strong", {
                  className: "cj-practice-reminder-target"
                })
              }
            })
          }), o.jsxs("div", {
            className: "cj-practice-reminder-actions",
            children: [o.jsx("button", {
              type: "button",
              className: "cj-practice-reminder-btn cj-practice-reminder-btn--ghost",
              onClick: t,
              children: r("practiceReminder.later")
            }), o.jsx("button", {
              type: "button",
              className: "cj-practice-reminder-btn cj-practice-reminder-btn--primary",
              onClick: s,
              children: r("practiceReminder.startNow")
            })]
          })]
        })]
      })
    })
  });
};
const $e = ({
  celebration: e,
  onDismiss: t
}) => {
  const {
    t: s
  } = n();
  a.useEffect(() => {
    if (!e) {
      return;
    }
    const s = e => {
      if (e.key === "Escape") {
        t();
      }
    };
    document.addEventListener("keydown", s);
    return () => document.removeEventListener("keydown", s);
  }, [e, t]);
  if (e) {
    return o.jsx("div", {
      className: "cj-section-complete-overlay",
      onClick: t,
      children: o.jsx("section", {
        className: "cj-section-complete-modal",
        onClick: e => e.stopPropagation(),
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": "cj-section-complete-title",
        "aria-describedby": "cj-section-complete-desc",
        children: o.jsxs("div", {
          className: "cj-section-complete-row",
          children: [o.jsx("div", {
            className: "cj-section-complete-media",
            "aria-hidden": "true",
            children: o.jsx(g, {
              className: "cj-section-complete-video"
            })
          }), o.jsxs("div", {
            className: "cj-section-complete-body",
            children: [o.jsx("span", {
              className: "cj-section-complete-eyebrow",
              children: s(`sectionComplete.eyebrow.${e.kind}`)
            }), o.jsx("span", {
              id: "cj-section-complete-title",
              className: "cj-section-complete-title",
              children: s("sectionComplete.title", {
                title: e.title
              })
            }), o.jsx("span", {
              id: "cj-section-complete-desc",
              className: "cj-section-complete-desc",
              children: s(`sectionComplete.description.${e.kind}`, {
                unit: e.unitLabel
              })
            }), o.jsx("div", {
              className: "cj-section-complete-actions",
              children: o.jsx("button", {
                type: "button",
                className: "cj-section-complete-btn",
                onClick: t,
                children: s("sectionComplete.dismiss")
              })
            })]
          })]
        })
      })
    });
  } else {
    return null;
  }
};
const De = "hk_pending_course_join";
const Fe = 1800000;
const Je = new URL("/assets/png/placeholder-1-hyslfKoR.png", import.meta.url).href;
const Be = e => {
  var t;
  if ((t = e.split(".").pop()) != null) {
    t.toLowerCase();
  }
  return "/pages/coursePage/CourseJourney/pdf.svg";
};
const Ae = {
  units: ({
    className: e
  }) => o.jsx("svg", {
    className: e,
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
    children: o.jsx("path", {
      d: "M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"
    })
  }),
  materials: ({
    className: e
  }) => o.jsxs("svg", {
    className: e,
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
    children: [o.jsx("path", {
      d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
    }), o.jsx("polyline", {
      points: "14 2 14 8 20 8"
    }), o.jsx("line", {
      x1: "9",
      y1: "13",
      x2: "15",
      y2: "13"
    }), o.jsx("line", {
      x1: "9",
      y1: "17",
      x2: "12",
      y2: "17"
    })]
  }),
  practices: ({
    className: e
  }) => o.jsxs("svg", {
    className: e,
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
    children: [o.jsx("path", {
      d: "M12 20h9"
    }), o.jsx("path", {
      d: "M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"
    })]
  })
};
const Re = [{
  key: "units",
  labelKey: "courseJourney.tabs.units"
}, {
  key: "materials",
  labelKey: "courseJourney.tabs.materials"
}, {
  key: "practices",
  labelKey: "courseJourney.tabs.practices"
}];
const We = [{
  key: "mastered",
  labelKey: "courseJourney.progressLegend.mastered"
}, {
  key: "proficient",
  labelKey: "courseJourney.progressLegend.proficient"
}, {
  key: "familiar",
  labelKey: "courseJourney.progressLegend.familiar"
}, {
  key: "attempted",
  labelKey: "courseJourney.progressLegend.attempted"
}, {
  key: "notStarted",
  labelKey: "courseJourney.progressLegend.notStarted"
}, {
  key: "project",
  labelKey: "courseJourney.kindLabel.project"
}, {
  key: "exam",
  labelKey: "courseJourney.kindLabel.exam"
}];
const Oe = new Set(["mastered", "proficient", "familiar", "attempted", "notStarted"]);
const He = e => Oe.has(e);
const ze = {
  notStarted: "courseJourney.ringHint.notStarted",
  attempted: "courseJourney.ringHint.attempted",
  familiar: "courseJourney.ringHint.familiar",
  proficient: "courseJourney.ringHint.proficient",
  mastered: "courseJourney.ringHint.mastered"
};
const Ke = (e, t, s) => s("courseJourney.unitDisplayTitle", {
  number: t + 1,
  title: e.title
});
const Ve = e => {
  var t;
  if (Array.isArray(e.lectures) && e.lectures.length > 0) {
    return e.lectures;
  }
  return (((t = e.lecture) == null ? undefined : t.sessions) || []).map((t, s) => ({
    lectureId: `${e.unitId || "unit"}Lecture${s + 1}`,
    title: t.title,
    description: t.description,
    sessions: [t],
    learning_finished: t.completed === true
  }));
};
const qe = e => Array.isArray(e.projects) ? e.projects : [];
const Ye = e => {
  const t = {};
  for (const s of e || []) {
    if (s.project_id) {
      t[s.project_id] = s.project_name || "";
    }
  }
  return t;
};
const Ze = e => Array.isArray(e.exams) ? e.exams : e.exam ? [e.exam] : [];
const Ge = e => (e.references || []).map(e => e.referenceName || e.referenceId).filter(Boolean);
const Qe = (e, t, s, n = {}, a) => t.length === 0 ? [] : t.map((t, r) => {
  var i;
  var c;
  const o = t.conversationId || t.sessionId || "";
  const l = n[o];
  return {
    name: t.title || a("courseJourney.sessionFallback", {
      number: t.sessionIndex ?? r + 1
    }),
    mastery: s ? 0 : rt(t.started === true, t.completed === true, l),
    learnAction: a("courseJourney.learnAction"),
    practiceAction: ((c = (i = t.practice) == null ? undefined : i.tasks) == null ? undefined : c.length) || (l == null ? undefined : l.total) ? a("courseJourney.practiceAction") : a("courseJourney.reviewAction"),
    learnTargetPath: tt(e, t),
    practiceTargetPath: st(e, t),
    completed: !s && t.completed === true,
    started: !s && t.started === true,
    practiceCompleted: !s && !!(l == null ? undefined : l.finished),
    practiceRating: s ? undefined : H(l)
  };
});
const Xe = (e, t) => e && t ? `/course/${encodeURIComponent(e)}/project/${encodeURIComponent(t)}` : null;
const et = (e, t) => e && t ? `/course/${encodeURIComponent(e)}/exam/${encodeURIComponent(t)}` : null;
const tt = (e, t) => {
  const s = t.conversationId || t.sessionId;
  if (!e || !s) {
    return null;
  }
  const n = t.session_type === "pdf_annotate" ? "pdf-annotate" : t.session_type === "whiteboard" ? "whiteboard" : null;
  if (n) {
    return `/course/${encodeURIComponent(e)}/sessions/${n}/${encodeURIComponent(s)}`;
  } else {
    return null;
  }
};
const st = (e, t) => {
  const s = t.conversationId || t.sessionId;
  if (e && s) {
    return `/course/${encodeURIComponent(e)}/practice/${encodeURIComponent(s)}`;
  } else {
    return null;
  }
};
const nt = (e, t, s = {}, n = false, a = {}, r) => [...Ve(e).map((s, i) => {
  const c = s.sessions || [];
  const o = s.lectureId || `${e.unitId || "unit"}-lecture-${i}`;
  const l = c[0];
  return {
    id: `${e.unitId || "unit"}-${o}`,
    type: "lecture",
    order: s.order ?? 0,
    title: r("courseJourney.lectureDisplayTitle", {
      number: i + 1,
      title: s.title
    }),
    description: s.description,
    completed: false,
    lecture: s,
    session: l,
    sessions: c,
    runtimePath: l ? tt(t, l) : null,
    activities: Qe(t, c, n, a, r),
    referenceFiles: c.flatMap(Ge),
    lectureScope: {
      lectureId: o,
      lectureTitle: s.title,
      unitTitle: e.title
    },
    detailText: c.map(e => e.sessionOutline).filter(Boolean).join("\n\n")
  };
}), ...qe(e).flatMap((n, a) => {
  if (!n.stage_title) {
    return [];
  }
  const i = s[n.parent_project_id ?? ""] || "";
  return [{
    id: `${e.unitId}-stage-${a + 1}`,
    type: "project",
    order: n.order ?? 0,
    title: r("courseJourney.projectSectionTitle", {
      name: i || n.stage_title
    }),
    description: n.stage_description,
    completed: false,
    projectTargetPath: Xe(t, n.stage_id),
    stageLabel: n.stage_title,
    stageId: n.stage_id
  }];
}), ...Ze(e).flatMap((s, n) => s.title ? [{
  id: `${e.unitId}-exam-${n + 1}`,
  type: "exam",
  order: s.order ?? 0,
  title: s.title,
  description: s.goal,
  completed: false,
  examTargetPath: et(t, e.unitId),
  examUnitId: e.unitId
}] : [])].sort((e, t) => (e.order ?? 0) - (t.order ?? 0));
const at = e => e >= 4 ? "mastered" : e >= 3 ? "proficient" : e >= 2 ? "familiar" : e >= 1 ? "attempted" : "notStarted";
const rt = (e, t, s) => {
  if (t && s && s.total > 0) {
    if (s.correct >= s.total) {
      return 4;
    }
    if (s.finished && s.correct * 2 >= s.total) {
      return 3;
    }
  }
  if (t) {
    return 2;
  } else if (e) {
    return 1;
  } else {
    return 0;
  }
};
const it = e => ({
  kind: e.kind,
  title: e.title,
  unitLabel: e.unitLabel,
  targetPath: e.targetPath
});
const ct = e => ({
  unitId: e.unitId,
  sectionId: e.sectionId,
  kind: e.kind,
  activityIndex: e.activityIndex
});
const ot = (e, t, s, n) => !!e && e.sectionId === t && e.kind === s && (n === undefined || e.activityIndex === n);
const lt = (e, t) => e ? "done" : t ? "next" : "upcoming";
const dt = () => o.jsx("svg", {
  className: "course-journey-lesson-action-icon",
  width: "13",
  height: "13",
  viewBox: "0 0 24 24",
  fill: "currentColor",
  "aria-hidden": "true",
  children: o.jsx("path", {
    d: "M8 5.5v13a1 1 0 0 0 1.52.85l10.5-6.5a1 1 0 0 0 0-1.7L9.52 4.65A1 1 0 0 0 8 5.5Z"
  })
});
const ut = () => o.jsxs("svg", {
  className: "course-journey-lesson-action-icon",
  width: "13",
  height: "13",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "1.8",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": "true",
  children: [o.jsx("path", {
    d: "M12 20h9"
  }), o.jsx("path", {
    d: "M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5Z"
  })]
});
const pt = () => o.jsx("svg", {
  width: "18",
  height: "18",
  viewBox: "0 0 256 256",
  fill: "currentColor",
  "aria-hidden": "true",
  children: o.jsx("path", {
    d: "M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216ZM172.42,72.84l-64,32a8.05,8.05,0,0,0-3.58,3.58l-32,64A8,8,0,0,0,80,184a8.1,8.1,0,0,0,3.58-.84l64-32a8.05,8.05,0,0,0,3.58-3.58l32-64a8,8,0,0,0-10.74-10.74ZM138,138,97.89,158.11,118,118l40.15-20.07Z"
  })
});
const ht = () => o.jsx("span", {
  className: "course-journey-practice-btn-spinner",
  role: "status",
  "aria-label": "Practice is being prepared"
});
const mt = () => o.jsx("svg", {
  className: "course-journey-back-icon",
  width: "16",
  height: "16",
  viewBox: "0 0 24 24",
  fill: "none",
  "aria-hidden": "true",
  children: o.jsx("path", {
    d: "M6 6l12 12M18 6L6 18",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  })
});
const jt = ({
  isOpen: e,
  title: t,
  description: s,
  onClose: r
}) => {
  const {
    t: i
  } = n();
  a.useEffect(() => {
    if (!e) {
      return;
    }
    const t = e => {
      if (e.key === "Escape") {
        r();
      }
    };
    document.addEventListener("keydown", t);
    return () => document.removeEventListener("keydown", t);
  }, [e, r]);
  if (e) {
    return o.jsx("div", {
      className: "cj-course-description-overlay",
      onClick: r,
      children: o.jsxs("section", {
        className: "cj-course-description-modal",
        onClick: e => e.stopPropagation(),
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": "cj-course-description-title",
        children: [o.jsx("button", {
          type: "button",
          className: "cj-course-description-close",
          onClick: r,
          "aria-label": "Close course details",
          children: o.jsx("svg", {
            width: "16",
            height: "16",
            viewBox: "0 0 24 24",
            fill: "none",
            "aria-hidden": "true",
            children: o.jsx("path", {
              d: "M18 6L6 18M6 6L18 18",
              stroke: "currentColor",
              strokeWidth: "2",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            })
          })
        }), o.jsx("p", {
          className: "cj-course-description-eyebrow",
          children: i("courseJourney.courseOverviewEyebrow")
        }), o.jsx("h2", {
          id: "cj-course-description-title",
          className: "cj-course-description-title",
          children: t
        }), o.jsx("p", {
          className: "cj-course-description-text",
          children: s
        })]
      })
    });
  } else {
    return null;
  }
};
const xt = {
  learn: "courseNextStep.kindLabel.learn",
  practice: "courseNextStep.kindLabel.practice",
  project: "courseNextStep.kindLabel.project",
  exam: "courseNextStep.kindLabel.exam"
};
const gt = ({
  nextStep: e,
  onDismiss: t,
  onStart: s
}) => {
  const {
    t: r
  } = n();
  a.useEffect(() => {
    if (!e) {
      return;
    }
    const s = e => {
      if (e.key === "Escape") {
        t();
      }
    };
    document.addEventListener("keydown", s);
    return () => document.removeEventListener("keydown", s);
  }, [e, t]);
  if (e) {
    return o.jsx("div", {
      className: "cj-welcome-overlay",
      onClick: t,
      children: o.jsx("section", {
        className: "cj-welcome-modal",
        onClick: e => e.stopPropagation(),
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": "cj-welcome-title",
        "aria-describedby": "cj-welcome-desc",
        children: o.jsxs("div", {
          className: "cj-welcome-row",
          children: [o.jsx("div", {
            className: "cj-welcome-media",
            "aria-hidden": "true",
            children: o.jsx(g, {
              className: "cj-welcome-video"
            })
          }), o.jsxs("div", {
            className: "cj-welcome-body",
            children: [o.jsx("span", {
              id: "cj-welcome-title",
              className: "cj-welcome-title",
              children: r("courseJourney.welcomeBackTitle")
            }), o.jsx("span", {
              id: "cj-welcome-desc",
              className: "cj-welcome-desc",
              children: r("courseJourney.welcomeBackDescription")
            }), o.jsxs("div", {
              className: "cj-welcome-next",
              children: [o.jsx("span", {
                className: `cj-welcome-next-kind cj-welcome-next-kind--${e.kind}`,
                children: r(xt[e.kind])
              }), o.jsx("span", {
                className: "cj-welcome-next-title",
                children: e.title
              })]
            }), o.jsxs("div", {
              className: "cj-welcome-actions cj-welcome-actions--row",
              children: [o.jsx("button", {
                type: "button",
                className: "cj-welcome-btn cj-welcome-btn--ghost",
                onClick: t,
                children: r("courseJourney.welcomeBackBrowse")
              }), o.jsx("button", {
                type: "button",
                className: "cj-welcome-btn cj-welcome-btn--primary",
                onClick: s,
                children: r("courseJourney.welcomeBackStart")
              })]
            })]
          })]
        })
      })
    });
  } else {
    return null;
  }
};
const vt = ({
  sharedMode: t = false,
  marketplacePreview: r = false
}) => {
  var i;
  var c;
  var l;
  var d;
  const p = t || r;
  const {
    t: h
  } = n();
  const m = s();
  const j = v();
  const x = y("/course/:courseId/welcome");
  const {
    courseId: g
  } = k();
  const O = j.state;
  const H = (O == null ? undefined : O.showGeneratedCourseIntro) === true;
  const z = Boolean(x);
  const [K, Y] = u.useState(null);
  const [G, Q] = u.useState(0);
  const [ne, ae] = u.useState(true);
  const [re, ie] = u.useState(null);
  const [ce, oe] = u.useState("units");
  const [le, de] = u.useState(false);
  const [ue, pe] = u.useState(false);
  const [he, me] = u.useState(false);
  const [je, ve] = u.useState(false);
  const [ye, ke] = u.useState(false);
  const [be, Ne] = u.useState(null);
  const [we, Se] = u.useState(new Set());
  const [Ie, Ee] = u.useState(null);
  const [Me, Te] = u.useState(null);
  const [De, Fe] = u.useState(null);
  const [Oe, Qe] = u.useState(null);
  const [Xe, et] = u.useState(null);
  const [tt, rt] = u.useState(new Set());
  const xt = u.useCallback(e => {
    rt(t => {
      const s = new Set(t);
      if (s.has(e)) {
        s.delete(e);
      } else {
        s.add(e);
      }
      return s;
    });
  }, []);
  const [vt, yt] = u.useState(0);
  const [kt, bt] = u.useState(null);
  const [ft, Nt] = u.useState(null);
  const [wt, Ct] = u.useState("none");
  const [St, It] = u.useState(0);
  const [Lt, Et] = u.useState({});
  const [Mt, Tt] = u.useState("none");
  const [Pt, _t] = u.useState(0);
  const [Ut, $t] = u.useState({});
  const [Dt, Ft] = u.useState("none");
  const [Jt, Bt] = u.useState(0);
  const [At, Rt] = u.useState({});
  const [Wt, Ot] = u.useState(false);
  const [Ht, zt] = u.useState(false);
  const [Kt, Vt] = u.useState(false);
  const [qt, Yt] = u.useState(null);
  const [Zt, Gt] = u.useState(null);
  const [Qt, Xt] = u.useState({
    status: "idle"
  });
  const es = u.useRef(false);
  const ts = u.useRef(0);
  const ss = u.useRef(false);
  u.useEffect(() => {
    if (p) {
      return;
    }
    let t = false;
    (async function () {
      const t = await fetch(e("/api/v1/course-calendar/config"), {
        headers: te()
      });
      return se(t);
    })().then(e => {
      if (!t) {
        ke(Boolean(e.enabled));
      }
    }).catch(() => {});
    return () => {
      t = true;
    };
  }, [p]);
  const [ns, as] = u.useState(false);
  const [rs, is] = u.useState(false);
  const [cs, os] = u.useState(false);
  const [ls, ds] = u.useState(null);
  const [us, ps] = u.useState(undefined);
  const [hs, ms] = u.useState(false);
  const [js, xs] = u.useState(false);
  const gs = u.useRef(null);
  const [vs, ys] = u.useState(false);
  const [ks, bs] = u.useState(false);
  const fs = u.useRef(false);
  const [Ns, ws] = u.useState(null);
  const Cs = u.useRef(false);
  const [Ss, Is] = u.useState(null);
  const [Ls, Es] = u.useState(null);
  const Ms = u.useRef(false);
  const [Ts, Ps] = u.useState(null);
  const _s = u.useRef([]);
  const Us = u.useRef([]);
  const $s = u.useRef(new Map());
  const Ds = u.useRef([]);
  const Fs = u.useRef([]);
  const Js = u.useRef(null);
  const Bs = (e, t, s, n) => {
    const a = e.units ?? [];
    const r = !s && be ? a.find(e => e.unitId === be) : undefined;
    const i = (O == null ? undefined : O.fromSessionId) || (O == null ? undefined : O.completedSessionId) || "";
    const c = (O == null ? undefined : O.fromStageId) || "";
    const o = s ? ((e, t) => {
      if (!e || !t) {
        return null;
      }
      for (const s of e.units ?? []) {
        for (const e of Ve(s)) {
          for (const n of e.sessions ?? []) {
            if (n.conversationId === t || n.sessionId === t) {
              return s.unitId || null;
            }
          }
        }
      }
      return null;
    })(e, i) ?? ((e, t) => {
      if (!e || !t) {
        return null;
      }
      for (const s of e.units ?? []) {
        if (qe(s).some(e => e.stage_id === t)) {
          return s.unitId || null;
        }
      }
      return null;
    })(e, c) ?? (O == null ? undefined : O.fromUnitId) ?? null : null;
    const l = o ? a.find(e => e.unitId === o) : undefined;
    const d = r ?? l ?? a[0];
    Ne((d == null ? undefined : d.unitId) || null);
    const u = d ? nt(d, e.courseUuid || t, Ye(e.projects), n, {}, h) : [];
    const p = !s && r ? new Set([...we].filter(e => u.some(t => t.id === e))) : new Set();
    const m = l ? u.find(e => i && e.type === "lecture" ? (e.sessions ?? []).some(e => e.conversationId === i || e.sessionId === i) : c && e.type === "project" ? e.stageId === c : !!(O == null ? undefined : O.fromUnitId) && e.type === "exam") : undefined;
    if (p.size > 0) {
      Se(p);
    } else {
      const e = m ?? u[0];
      Se(e ? new Set([e.id]) : new Set());
    }
    if (m) {
      Te(m.id);
    }
    if (m && (O == null ? undefined : O.fromResumeCard)) {
      const e = i && m.type === "lecture" ? (m.sessions ?? []).findIndex(e => e.conversationId === i || e.sessionId === i) : -1;
      Ps({
        sectionId: m.id,
        kind: m.type === "project" ? "project" : m.type === "exam" ? "exam" : "learn",
        activityIndex: e >= 0 ? e : null
      });
    }
    if (m && l) {
      const e = a.findIndex(e => e.unitId === l.unitId);
      Is({
        sectionId: m.id,
        kind: m.type,
        title: m.title,
        unitLabel: h("deepLearnSessionBlock.unitLabel", {
          number: e + 1
        })
      });
    }
  };
  a.useEffect(() => {
    if (!g) {
      ie(h("courseJourney.errorCourseIdMissing"));
      ae(false);
      return;
    }
    let e = false;
    ae(true);
    ie(null);
    const s = Js.current !== g;
    Js.current = g;
    if (r) {
      b(g).then(t => {
        if (e) {
          return;
        }
        if (!t.success) {
          ie(t.error);
          return;
        }
        const n = t.course;
        Y(n);
        ds(n.enrolled ? n.enrolledCourseUuid ?? null : null);
        ps(n.languages);
        Bs(n, g, s, true);
      }).finally(() => {
        if (!e) {
          ae(false);
        }
      });
      return () => {
        e = true;
      };
    } else if (t) {
      f(g).then(t => {
        if (e) {
          return;
        }
        if (!t.success) {
          ie(t.error);
          return;
        }
        const n = t.course;
        Y(n);
        Bs(n, g, s, true);
      }).finally(() => {
        if (!e) {
          ae(false);
        }
      });
      return () => {
        e = true;
      };
    } else {
      T(g).then(t => {
        if (!e) {
          Y(t);
          Bs(t, g, s, false);
        }
      }).catch(t => {
        if (!e) {
          ie(t instanceof Error ? t.message : h("courseJourney.loadFailedFallback"));
        }
      }).finally(() => {
        if (!e) {
          ae(false);
        }
      });
      return () => {
        e = true;
      };
    }
  }, [g, G]);
  const As = a.useMemo(() => {
    var e;
    if (!((e = K == null ? undefined : K.units) == null ? undefined : e.length)) {
      return -1;
    }
    if (!be) {
      return 0;
    }
    const t = K.units.findIndex(e => e.unitId === be);
    if (t === -1) {
      return 0;
    } else {
      return t;
    }
  }, [be, K]);
  const Rs = As >= 0 ? K == null ? undefined : K.units[As] : undefined;
  const Ws = (K == null ? undefined : K.courseUuid) || g || "";
  a.useEffect(() => {
    if (p || !Ws) {
      return;
    }
    if (z) {
      xs(true);
      return;
    }
    if (!H) {
      return;
    }
    if (gs.current === Ws) {
      return;
    }
    gs.current = Ws;
    const e = `${j.pathname}${j.search}${j.hash}`;
    const t = () => m(e, {
      replace: true,
      state: null
    });
    try {
      const e = `hk_course_intro_seen:${Ws}`;
      if (window.localStorage.getItem(e) === "true") {
        t();
        return;
      }
      window.localStorage.setItem(e, "true");
    } catch {}
    xs(true);
    t();
  }, [j.pathname, j.search, j.hash, m, Ws, z, p, H]);
  const [Os, Hs] = u.useState(null);
  a.useEffect(() => {
    Hs(null);
    if (p || !Ws) {
      return;
    }
    const e = B(Ws);
    if (!e) {
      return;
    }
    const t = window.setTimeout(() => Hs(e), 5000);
    return () => window.clearTimeout(t);
  }, [p, Ws]);
  const zs = u.useCallback(() => {
    Hs(null);
    A(Ws);
  }, [Ws]);
  const Ks = u.useCallback(() => {
    xs(false);
    if (z && Ws) {
      m(`/course/${encodeURIComponent(Ws)}`, {
        replace: true
      });
    }
  }, [z, m, Ws]);
  const Vs = a.useMemo(() => Ye(K == null ? undefined : K.projects), [K]);
  const qs = a.useMemo(() => K ? (e => {
    const t = e.units.flatMap(e => Ve(e).flatMap(e => (e.sessions || []).flatMap(Ge)));
    return Array.from(new Set(t));
  })(K) : [], [K]);
  const Ys = a.useMemo(() => Rs ? nt(Rs, Ws, Vs, p, Lt, h) : [], [Rs, Ws, Vs, p, Lt, h]);
  const Zs = a.useMemo(() => Ys.flatMap(e => {
    if (e.type === "project" || e.type === "exam") {
      return [{
        key: e.id,
        sectionId: e.id,
        state: e.type,
        label: e.title
      }];
    }
    const t = e.activities || [];
    if (t.length === 0) {
      return [{
        key: e.id,
        sectionId: e.id,
        state: "notStarted",
        label: e.title
      }];
    } else {
      return t.map((t, s) => ({
        key: `${e.id}-activity-${s}`,
        sectionId: e.id,
        state: at(t.mastery),
        label: `${e.title} · ${t.name}`
      }));
    }
  }), [Ys]);
  const Gs = a.useMemo(() => ((e, t, s, n, a, r, i, c) => {
    const o = [];
    ((e == null ? undefined : e.units) ?? []).forEach((e, l) => {
      const d = c("deepLearnSessionBlock.unitLabel", {
        number: l + 1
      });
      nt(e, t, s, n, a, c).forEach(t => {
        if (t.type === "lecture") {
          (t.activities ?? []).forEach((s, r) => {
            var i;
            const c = (i = t.sessions) == null ? undefined : i[r];
            const l = (c == null ? undefined : c.conversationId) || (c == null ? undefined : c.sessionId) || "";
            const u = a[l];
            o.push({
              key: `${t.id}-learn-${r}`,
              kind: "learn",
              title: s.name,
              unitLabel: d,
              targetPath: s.learnTargetPath || t.runtimePath || null,
              touched: !n && !!s.started,
              completed: !n && !!s.completed,
              unitId: e.unitId || "",
              sectionId: t.id,
              introDescription: (c == null ? undefined : c.description) || (c == null ? undefined : c.sessionOutline) || t.description,
              activityIndex: r
            });
            if (s.practiceTargetPath) {
              o.push({
                key: `${t.id}-practice-${r}`,
                kind: "practice",
                title: s.name,
                unitLabel: d,
                targetPath: s.practiceTargetPath,
                touched: !n && !!(u == null ? undefined : u.started),
                completed: !n && !!s.practiceCompleted,
                unitId: e.unitId || "",
                sectionId: t.id,
                activityIndex: r
              });
            }
          });
          return;
        }
        if (t.type === "project") {
          const s = t.stageId && i[t.stageId] || undefined;
          o.push({
            key: t.id,
            kind: "project",
            title: t.stageLabel || t.title,
            unitLabel: d,
            targetPath: t.projectTargetPath ?? null,
            touched: !n && !!(s == null ? undefined : s.touched),
            completed: !n && !!(s == null ? undefined : s.completed),
            unitId: e.unitId || "",
            sectionId: t.id
          });
          return;
        }
        const s = !n && t.examUnitId != null && typeof r[t.examUnitId] == "number";
        o.push({
          key: t.id,
          kind: "exam",
          title: t.title,
          unitLabel: d,
          targetPath: t.examTargetPath ?? null,
          touched: s,
          completed: s,
          unitId: e.unitId || "",
          sectionId: t.id
        });
      });
    });
    return o;
  })(K, Ws, Vs, p, Lt, Ut, At, h), [K, Ws, Vs, p, Lt, Ut, At, h]);
  const Qs = a.useMemo(() => (e => {
    const t = e.length;
    const s = e.reduce((e, t, s) => t.touched || t.completed ? s : e, -1);
    if (s === -1) {
      const s = e[0];
      return {
        total: t,
        nextStep: s ? it(s) : null,
        nextStepItem: s ? ct(s) : null,
        isNewCourse: true
      };
    }
    const n = e[s];
    const a = n && !n.completed ? n : e.slice(s + 1).find(e => !e.completed);
    return {
      total: t,
      nextStep: a ? it(a) : null,
      nextStepItem: a ? ct(a) : null,
      isNewCourse: false
    };
  })(Gs), [Gs]);
  const Xs = a.useMemo(() => {
    const e = new Map();
    for (const s of Gs) {
      const t = e.get(s.sectionId);
      if (t) {
        t.push(s);
      } else {
        e.set(s.sectionId, [s]);
      }
    }
    const t = {};
    e.forEach((e, s) => {
      t[s] = e.every(e => e.completed);
    });
    return t;
  }, [Gs]);
  const en = a.useMemo(() => {
    const e = new Map();
    for (const s of Gs) {
      const t = e.get(s.unitId);
      if (t) {
        t.push(s);
      } else {
        e.set(s.unitId, [s]);
      }
    }
    const t = {};
    e.forEach((e, s) => {
      t[s] = e.every(e => e.completed);
    });
    return t;
  }, [Gs]);
  const tn = u.useRef(Qs);
  u.useEffect(() => {
    tn.current = Qs;
  }, [Qs]);
  const sn = u.useRef(be);
  u.useEffect(() => {
    sn.current = be;
  }, [be]);
  const nn = u.useRef(we);
  u.useEffect(() => {
    nn.current = we;
  }, [we]);
  u.useEffect(() => {
    if (fs.current) {
      return;
    }
    if (p || z || !K) {
      return;
    }
    if (!(O == null ? undefined : O.fromCourseList)) {
      return;
    }
    if (!Wt || !Ht || !Kt) {
      return;
    }
    const e = Qs.nextStepItem;
    if (!e) {
      fs.current = true;
      const e = `${j.pathname}${j.search}${j.hash}`;
      m(e, {
        replace: true,
        state: null
      });
      return;
    }
    fs.current = true;
    Gt(Qs.nextStep);
    ys(true);
    const t = e.unitId !== sn.current;
    const s = window.setTimeout(() => {
      const t = tn.current.nextStepItem ?? e;
      const s = t.unitId !== sn.current;
      Ne(t.unitId);
      const n = window.setTimeout(() => {
        const t = tn.current.nextStepItem ?? e;
        const s = nn.current.has(t.sectionId);
        Se(new Set([t.sectionId]));
        const n = window.requestAnimationFrame(() => {
          const t = tn.current.nextStepItem ?? e;
          const n = $s.current.get(t.sectionId);
          const a = n == null ? undefined : n.getBoundingClientRect();
          const r = !!a && a.top >= 0 && a.bottom <= window.innerHeight;
          if (n != null) {
            n.scrollIntoView({
              behavior: "smooth",
              block: "center"
            });
          }
          const i = s && r ? 150 : 550;
          const c = window.setTimeout(() => {
            bs(true);
            const e = window.setTimeout(() => {
              ys(false);
            }, 500);
            _s.current.push(e);
          }, i);
          _s.current.push(c);
        });
        Us.current.push(n);
      }, s ? 400 : 0);
      _s.current.push(n);
    }, t ? 400 : 0);
    _s.current.push(s);
    const n = `${j.pathname}${j.search}${j.hash}`;
    m(n, {
      replace: true,
      state: null
    });
  }, [K, Qs, Wt, z, j.hash, j.pathname, j.search, O == null ? undefined : O.fromCourseList, m, Ht, Kt, p]);
  u.useEffect(() => () => {
    _s.current.forEach(e => window.clearTimeout(e));
    _s.current = [];
    Us.current.forEach(e => window.cancelAnimationFrame(e));
    Us.current = [];
  }, []);
  u.useEffect(() => {
    if (Cs.current) {
      return;
    }
    if (p || !K) {
      return;
    }
    const e = O == null ? undefined : O.completedSessionId;
    if (!e) {
      return;
    }
    if (!Ht) {
      return;
    }
    Cs.current = true;
    const t = ((e, t, s, n, a) => {
      var r;
      var i;
      var c;
      var o;
      if (!e || !t || !s) {
        return null;
      }
      const l = e.units ?? [];
      for (let d = 0; d < l.length; d += 1) {
        const e = l[d];
        for (const l of Ve(e)) {
          for (const e of l.sessions ?? []) {
            const l = e.conversationId || e.sessionId || "";
            if (l !== s) {
              continue;
            }
            const u = !!((i = (r = e.practice) == null ? undefined : r.tasks) == null ? undefined : i.length) || !!((c = n[l]) == null ? undefined : c.total);
            const p = !!((o = n[l]) == null ? undefined : o.finished);
            const h = st(t, e);
            if (u && !p && h) {
              return {
                practicePath: h,
                unitLabel: a("deepLearnSessionBlock.unitLabel", {
                  number: d + 1
                }),
                sessionTitle: e.title || a("courseJourney.thisSessionFallback")
              };
            } else {
              return null;
            }
          }
        }
      }
      return null;
    })(K, Ws, e, Lt, h);
    if (t) {
      ws(t);
    }
    const s = `${j.pathname}${j.search}${j.hash}`;
    m(s, {
      replace: true,
      state: null
    });
  }, [K, j.hash, j.pathname, j.search, O == null ? undefined : O.completedSessionId, m, Lt, Ht, Ws, p]);
  u.useEffect(() => {
    if (Ms.current) {
      return;
    }
    if (p || !K || !Ss) {
      return;
    }
    if (!Wt || !Ht || !Kt) {
      return;
    }
    if (!Xs[Ss.sectionId]) {
      return;
    }
    const {
      sectionId: e,
      ...t
    } = Ss;
    Ms.current = true;
    Es(t);
  }, [K, Wt, Ht, p, Kt, Ss, Xs]);
  const an = a.useMemo(() => {
    const e = [];
    ((K == null ? undefined : K.units) ?? []).forEach((t, s) => {
      const n = h("deepLearnSessionBlock.unitLabel", {
        number: s + 1
      });
      nt(t, Ws, Vs, p, Lt, h).forEach(t => {
        if (t.type === "lecture") {
          (t.activities ?? []).forEach((s, a) => {
            if (s.practiceTargetPath) {
              e.push({
                key: `${t.id}-practice-${a}`,
                kind: "practice",
                kindLabel: s.practiceAction,
                unitLabel: n,
                title: s.name,
                targetPath: s.practiceTargetPath,
                completed: !p && !!s.practiceCompleted
              });
            }
          });
        } else if (t.type === "project") {
          e.push({
            key: t.id,
            kind: "project",
            kindLabel: h("courseJourney.kindLabel.project"),
            unitLabel: n,
            title: t.stageLabel || t.title,
            targetPath: t.projectTargetPath ?? null,
            completed: false
          });
        } else if (t.type === "exam") {
          e.push({
            key: t.id,
            kind: "exam",
            kindLabel: h("courseJourney.kindLabel.exam"),
            unitLabel: n,
            title: t.title,
            targetPath: t.examTargetPath ?? null,
            completed: !p && t.examUnitId != null && typeof Ut[t.examUnitId] == "number"
          });
        }
      });
    });
    return e;
  }, [K, Ws, Vs, p, Lt, Ut, h]);
  a.useEffect(() => {
    if (p || !Ws) {
      return;
    }
    let e;
    let t = false;
    let s = false;
    const n = {
      current: null
    };
    const a = {
      current: null
    };
    const r = {
      current: null
    };
    const i = () => {
      if (!s) {
        if (e) {
          clearTimeout(e);
          e = undefined;
        }
        s = true;
        $(Ws).then(({
          practice: c,
          exam: o,
          project: l,
          generatingSessionIds: d,
          generatingUnitIds: u
        }) => {
          s = false;
          if (!t) {
            Ct(c);
            Tt(o);
            Ft(l);
            bt(d);
            Nt(u);
            if (n.current === "generating" && c === "ready") {
              It(e => e + 1);
            }
            if (a.current === "generating" && o === "ready") {
              _t(e => e + 1);
            }
            if (r.current === "generating" && l === "ready") {
              Bt(e => e + 1);
            }
            n.current = c;
            a.current = o;
            r.current = l;
            if (c === "generating" || o === "generating" || l === "generating") {
              e = setTimeout(i, 1500);
            }
          }
        }).catch(() => {
          s = false;
          if (!t) {
            Ct("none");
            Tt("none");
            Ft("none");
            bt(null);
            Nt(null);
          }
        });
      }
    };
    i();
    const c = () => {
      if (document.visibilityState === "visible") {
        i();
      }
    };
    document.addEventListener("visibilitychange", c);
    window.addEventListener("focus", i);
    return () => {
      t = true;
      if (e) {
        clearTimeout(e);
      }
      document.removeEventListener("visibilitychange", c);
      window.removeEventListener("focus", i);
    };
  }, [Ws, vt]);
  const rn = u.useCallback((e, t) => {
    if ((e == null ? undefined : e.length) || (t == null ? undefined : t.length)) {
      if (e == null ? undefined : e.length) {
        Tt("generating");
        Nt(e);
      }
      if (t == null ? undefined : t.length) {
        Ct("generating");
        bt(t);
      }
      yt(e => e + 1);
    }
  }, []);
  const cn = u.useRef(null);
  a.useEffect(() => {
    if (p || !Ws) {
      Ot(true);
      zt(true);
      Vt(true);
      return;
    }
    if (cn.current !== Ws) {
      cn.current = Ws;
      $t({});
      Et({});
      Rt({});
    }
    let e = false;
    _(Ws).then(t => {
      if (!e && t) {
        $t(t.examScores);
        Et(t.practiceStats);
        Rt(t.projectStages);
      }
    }).finally(() => {
      if (!e) {
        Ot(true);
        zt(true);
        Vt(true);
      }
    });
    return () => {
      e = true;
    };
  }, [Ws, Pt, St, Jt]);
  a.useEffect(() => {
    var e;
    if (p || !Ws || ((e = K == null ? undefined : K.course) == null ? undefined : e.from) !== "canvas") {
      Xt({
        status: "idle"
      });
      return;
    }
    es.current = false;
    let t;
    let s = false;
    let n = false;
    let a = false;
    const r = () => {
      if (t) {
        clearTimeout(t);
      }
      t = setTimeout(c, 600000);
    };
    const i = e => {
      if (s || n) {
        return;
      }
      if (a || es.current) {
        r();
        return;
      }
      a = true;
      const t = ++ts.current;
      if (e) {
        Xt({
          status: "checking"
        });
      }
      q(Ws).then(e => {
        a = false;
        if (!s) {
          if (t === ts.current) {
            if (!ss.current || !(e.total > 0) || !!e.pushDisabled) {
              ss.current = false;
              Xt({
                status: "done",
                updates: e
              });
            }
            n = !!e.pushDisabled;
          }
          if (!n) {
            r();
          }
        }
      });
    };
    const c = () => {
      if (document.visibilityState === "visible") {
        i(false);
      } else {
        r();
      }
    };
    i(true);
    const o = () => {
      if (document.visibilityState === "visible") {
        i(false);
      }
    };
    const l = () => i(false);
    document.addEventListener("visibilitychange", o);
    window.addEventListener("focus", l);
    return () => {
      s = true;
      if (t) {
        clearTimeout(t);
      }
      document.removeEventListener("visibilitychange", o);
      window.removeEventListener("focus", l);
    };
  }, [Ws, (i = K == null ? undefined : K.course) == null ? undefined : i.from]);
  const on = u.useCallback(() => {
    es.current = true;
    ss.current = false;
    ts.current += 1;
  }, []);
  const ln = u.useCallback(e => {
    es.current = false;
    if (!Ws) {
      return;
    }
    const t = ++ts.current;
    if (e == null ? undefined : e.accepted) {
      ss.current = true;
      Xt({
        status: "done",
        updates: V
      });
    } else {
      ss.current = false;
      Xt({
        status: "checking"
      });
    }
    q(Ws).then(s => {
      if (t === ts.current) {
        if (!(e == null ? undefined : e.accepted) || !(s.total > 0) || !!s.pushDisabled) {
          ss.current = false;
          Xt({
            status: "done",
            updates: s
          });
        }
      }
    });
  }, [Ws]);
  const dn = u.useCallback((e, t, s) => {
    Y(t => t ? ((e, t) => {
      const s = t;
      const n = new Map();
      const a = new Map();
      const r = new Map();
      (e.units ?? []).forEach(e => {
        if (e.unitId) {
          r.set(e.unitId, {
            learning_finished: e.learning_finished
          });
        }
        (e.lectures ?? []).forEach(e => {
          if (e.lectureId) {
            a.set(e.lectureId, {
              learning_finished: e.learning_finished
            });
          }
          (e.sessions ?? []).forEach(e => {
            if (e.sessionId) {
              n.set(e.sessionId, {
                completed: e.completed,
                started: e.started
              });
            }
          });
        });
      });
      const i = (s.units ?? []).map(e => {
        var t;
        return {
          ...e,
          learning_finished: (e.unitId ? (t = r.get(e.unitId)) == null ? undefined : t.learning_finished : undefined) ?? e.learning_finished,
          lectures: (e.lectures ?? []).map(e => {
            var t;
            return {
              ...e,
              learning_finished: (e.lectureId ? (t = a.get(e.lectureId)) == null ? undefined : t.learning_finished : undefined) ?? e.learning_finished,
              sessions: (e.sessions ?? []).map(e => {
                const t = e.sessionId ? n.get(e.sessionId) : undefined;
                return {
                  ...e,
                  completed: (t == null ? undefined : t.completed) ?? e.completed,
                  started: (t == null ? undefined : t.started) ?? e.started
                };
              })
            };
          })
        };
      });
      return {
        ...e,
        ...s,
        units: i,
        coverImageUrl: e.coverImageUrl,
        wideCoverImageUrl: e.wideCoverImageUrl
      };
    })(t, e) : t);
    if ((t == null ? undefined : t.length) || (s == null ? undefined : s.length)) {
      Fe({
        newUnitIds: t ?? [],
        newSessionIds: s ?? []
      });
    }
    rn(t, s);
    if (Ws) {
      T(Ws).then(e => Y(e)).catch(() => {});
    }
  }, [Ws, rn]);
  u.useEffect(() => {
    if (!De || !K) {
      return;
    }
    const {
      newUnitIds: e,
      newSessionIds: t
    } = De;
    let s = null;
    let n = null;
    let a = null;
    e: for (const o of K.units) {
      const e = nt(o, Ws, Vs, p, Lt, h);
      for (const r of e) {
        if (r.type !== "lecture") {
          continue;
        }
        const e = r.sessions ?? [];
        for (let i = 0; i < e.length; i += 1) {
          const c = e[i].sessionId || e[i].conversationId;
          if (c && t.includes(c)) {
            s = o.unitId;
            n = r.id;
            a = i;
            break e;
          }
        }
      }
    }
    if (!n && e.length > 0) {
      const t = K.units.find(t => e.includes(t.unitId));
      if (t) {
        const e = nt(t, Ws, Vs, p, Lt, h).find(e => e.type === "lecture");
        if (e) {
          s = t.unitId;
          n = e.id;
        }
      }
    }
    Fe(null);
    if (!n || !s) {
      return;
    }
    const r = n;
    const i = a;
    const c = () => {
      Se(new Set([r]));
      const e = window.requestAnimationFrame(() => {
        var e;
        if ((e = $s.current.get(r)) != null) {
          e.scrollIntoView({
            behavior: "smooth",
            block: "center"
          });
        }
      });
      Fs.current.push(e);
      Qe({
        sectionId: r,
        activityIndex: i
      });
      const t = window.setTimeout(() => Qe(null), 3000);
      Ds.current.push(t);
    };
    if (s !== be) {
      Ne(s);
      const e = window.setTimeout(c, 400);
      Ds.current.push(e);
    } else {
      c();
    }
  }, [K, De]);
  u.useEffect(() => {
    if (!Me || ne) {
      return;
    }
    const e = window.requestAnimationFrame(() => {
      var e;
      if ((e = $s.current.get(Me)) != null) {
        e.scrollIntoView({
          behavior: "smooth",
          block: "center"
        });
      }
      Te(null);
    });
    Fs.current.push(e);
  }, [Me, ne]);
  u.useEffect(() => () => {
    Ds.current.forEach(e => window.clearTimeout(e));
    Ds.current = [];
    Fs.current.forEach(e => window.cancelAnimationFrame(e));
    Fs.current = [];
  }, []);
  const un = {
    id: Ws || "generated-course",
    title: (K == null ? undefined : K.courseTitle) || h("courseJourney.loadingCourseFallback"),
    description: (K == null ? undefined : K.courseDescription) || "",
    coverImage: (K == null ? undefined : K.coverImageUrl) ? e(K.coverImageUrl) : Je,
    coverColor: "#DCE6EC",
    status: "in-progress"
  };
  const pn = ((K == null ? undefined : K.units) ?? []).reduce((e, t) => e + Ve(t).length + qe(t).length + Ze(t).length, 0);
  const hn = () => m("/courses");
  const mn = async () => {
    if (r) {
      if (ls) {
        m(`/course/${encodeURIComponent(ls)}`);
        return;
      } else {
        os(true);
        return;
      }
    }
    if (!Ws || ns) {
      return;
    }
    if (!N()) {
      is(true);
      return;
    }
    as(true);
    const e = await M(Ws);
    as(false);
    if (!e.success) {
      const t = e;
      if (t.unauthorized) {
        is(true);
      } else {
        ie(t.error);
      }
      return;
    }
    m(`/course/${encodeURIComponent(e.courseUuid)}`);
  };
  const jn = (e, t, s) => {
    if (p) {
      mn();
      return;
    }
    const n = {
      ...(t ? {
        sessionTitle: t
      } : {}),
      ...((s == null ? undefined : s.showIntro) ? {
        showLearnIntro: true,
        learnIntroTitle: t,
        learnIntroDescription: s.introDescription
      } : {})
    };
    m(e, Object.keys(n).length > 0 ? {
      state: n
    } : undefined);
  };
  const xn = () => {
    if (p) {
      mn();
      return;
    }
    const e = Qs.nextStep;
    if (!(e == null ? undefined : e.targetPath)) {
      return;
    }
    const t = decodeURIComponent(e.targetPath.split("/").pop() ?? "");
    if (e.kind !== "practice" || wt !== "generating" || kt !== null && !kt.includes(t)) {
      if (e.kind !== "exam" || Mt !== "generating" || ft !== null && !ft.includes(t)) {
        if (e.kind !== "project" || Dt !== "generating") {
          if (e.kind === "learn") {
            const t = Gs.find(t => t.kind === "learn" && t.targetPath === e.targetPath);
            jn(e.targetPath, e.title, {
              showIntro: !!t && !t.touched && !t.completed,
              introDescription: t == null ? undefined : t.introDescription
            });
            return;
          }
          m(e.targetPath, undefined);
        } else {
          Yt("project");
        }
      } else {
        Yt("exam");
      }
    } else {
      Yt("practice");
    }
  };
  if (ne) {
    return o.jsx("div", {
      className: "course-journey-page",
      "aria-busy": "true",
      children: o.jsxs("div", {
        className: "course-journey-inner",
        children: [o.jsxs("aside", {
          className: "course-journey-left",
          children: [o.jsx("div", {
            className: "cj-sk-back"
          }), o.jsxs("div", {
            className: "cj-sk-sidebar-card",
            children: [o.jsx("div", {
              className: "cj-sk-cover"
            }), o.jsxs("div", {
              className: "cj-sk-card-body",
              children: [o.jsx("div", {
                className: "cj-sk-eyebrow"
              }), o.jsx("div", {
                className: "cj-sk-h1"
              }), o.jsx("div", {
                className: "cj-sk-desc"
              }), o.jsx("div", {
                className: "cj-sk-desc cj-sk-desc--short"
              })]
            })]
          }), o.jsx("div", {
            className: "cj-sk-tabs",
            children: Array.from({
              length: 4
            }, (e, t) => o.jsx("div", {
              className: "cj-sk-tab"
            }, t))
          })]
        }), o.jsxs("main", {
          className: "course-journey-right",
          children: [o.jsxs("div", {
            className: "cj-sk-unit-header",
            children: [o.jsx("div", {
              className: "cj-sk-eyebrow"
            }), o.jsx("div", {
              className: "cj-sk-h1"
            }), o.jsx("div", {
              className: "cj-sk-desc"
            }), o.jsx("div", {
              className: "cj-sk-desc cj-sk-desc--short"
            })]
          }), o.jsx("div", {
            className: "cj-sk-progress-track",
            children: Array.from({
              length: 10
            }, (e, t) => o.jsx("div", {
              className: "cj-sk-progress-node"
            }, t))
          }), o.jsx("div", {
            className: "cj-sk-items",
            children: Array.from({
              length: 3
            }, (e, t) => o.jsxs("div", {
              className: "cj-sk-item",
              children: [o.jsx("div", {
                className: "cj-sk-item-circle"
              }), o.jsxs("div", {
                className: "cj-sk-item-body",
                children: [o.jsx("div", {
                  className: "cj-sk-item-title"
                }), o.jsx("div", {
                  className: "cj-sk-item-line"
                })]
              })]
            }, t))
          })]
        })]
      })
    });
  } else if (!re && K && Rs) {
    return o.jsxs("div", {
      className: "course-journey-page",
      children: [vs && o.jsx("div", {
        className: "cj-intro-lock",
        "aria-hidden": "true"
      }), o.jsxs("div", {
        className: "cj-topbar",
        children: [N() && o.jsx(w, {}), o.jsx(C, {}), !p && o.jsx(J, {
          conversationId: Ws || undefined,
          source: "courseJourney",
          className: "cj-feedback-entry"
        }), o.jsx(S, {
          isLoggedIn: N(),
          onSignOut: () => {
            E();
            m("/signin");
          },
          onSubscriptionClick: () => m("/subscription"),
          onSettingsClick: () => pe(true),
          onInviteEarnClick: () => me(true),
          onSignInClick: () => m("/signin")
        })]
      }), o.jsx(I, {
        isOpen: ue,
        onClose: () => pe(false)
      }), o.jsx(L, {
        isOpen: he,
        onClose: () => me(false)
      }), o.jsxs("div", {
        className: "course-journey-inner",
        children: [o.jsxs("aside", {
          className: "course-journey-left",
          children: [!p && o.jsxs("button", {
            type: "button",
            className: "course-journey-back-btn",
            onClick: hn,
            children: [o.jsx(mt, {}), h("courseSession.exitCourse")]
          }), r && o.jsxs("button", {
            type: "button",
            className: "course-journey-back-btn",
            onClick: () => m("/marketplace"),
            children: [o.jsx(mt, {}), h("home.marketplace.backToMarketplace")]
          }), o.jsxs("div", {
            className: "cj-sidebar-cover",
            children: [o.jsx("img", {
              src: un.coverImage,
              alt: "",
              className: "cj-sidebar-cover-img",
              "aria-hidden": "true"
            }), !p && o.jsx("button", {
              type: "button",
              className: "cj-sidebar-share-btn",
              onClick: () => de(true),
              "aria-label": "Share this course",
              children: o.jsx("img", {
                src: "/pages/mainPages/courses/share.svg",
                alt: "",
                "aria-hidden": "true"
              })
            }), !p && ye && o.jsx("button", {
              type: "button",
              className: "cj-sidebar-calendar-btn",
              onClick: () => ve(true),
              "aria-label": "Add course to calendar",
              children: o.jsxs("svg", {
                width: "15",
                height: "15",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "2",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                "aria-hidden": "true",
                children: [o.jsx("rect", {
                  x: "3",
                  y: "4",
                  width: "18",
                  height: "17",
                  rx: "2"
                }), o.jsx("line", {
                  x1: "8",
                  y1: "2",
                  x2: "8",
                  y2: "6"
                }), o.jsx("line", {
                  x1: "16",
                  y1: "2",
                  x2: "16",
                  y2: "6"
                }), o.jsx("line", {
                  x1: "3",
                  y1: "9.5",
                  x2: "21",
                  y2: "9.5"
                }), o.jsx("line", {
                  x1: "12",
                  y1: "12.5",
                  x2: "12",
                  y2: "17.5"
                }), o.jsx("line", {
                  x1: "9.5",
                  y1: "15",
                  x2: "14.5",
                  y2: "15"
                })]
              })
            })]
          }), o.jsxs("div", {
            className: "cj-sidebar-info",
            children: [o.jsxs("div", {
              className: "cj-sidebar-creator-row",
              children: [o.jsx("div", {
                className: "cj-sidebar-creator-avatar",
                "aria-hidden": "true",
                children: ((c = K == null ? undefined : K.course) == null ? undefined : c.from) === "canvas" ? o.jsx("img", {
                  src: "/pages/mainPages/home/canvas-logo.svg",
                  alt: "Canvas",
                  className: "cj-sidebar-creator-logo"
                }) : o.jsx("img", {
                  src: "/hyperknow_logo.svg",
                  alt: "Hyperknow",
                  className: "cj-sidebar-creator-logo"
                })
              }), o.jsx("div", {
                className: "cj-sidebar-creator-info",
                children: ((l = K == null ? undefined : K.course) == null ? undefined : l.from) === "canvas" ? o.jsxs(o.Fragment, {
                  children: [o.jsx("span", {
                    className: "cj-sidebar-creator-type",
                    children: h("courseJourneySidebar.importedFrom")
                  }), o.jsx("span", {
                    className: "cj-sidebar-creator-name",
                    children: "Canvas"
                  })]
                }) : o.jsxs(o.Fragment, {
                  children: [o.jsx("span", {
                    className: "cj-sidebar-creator-type",
                    children: h("courseJourney.curatedByPrefix")
                  }), o.jsx("span", {
                    className: "cj-sidebar-creator-name",
                    children: "Hyperknow Official"
                  })]
                })
              })]
            }), o.jsx("h2", {
              className: "cj-sidebar-title",
              children: un.title
            }), o.jsx("p", {
              className: "cj-sidebar-desc",
              children: un.description
            }), un.description.trim().length > 0 && o.jsx("button", {
              type: "button",
              className: "cj-sidebar-show-more",
              onClick: () => ms(true),
              "aria-label": "Show full course description",
              children: h("courseJourney.showMoreButton")
            }), (((d = K == null ? undefined : K.tags) == null ? undefined : d.length) ?? 0) > 0 && o.jsx("div", {
              className: "cj-sidebar-tags",
              children: K.tags.map(e => o.jsxs("span", {
                className: "cj-sidebar-tag",
                children: ["# ", e]
              }, e))
            }), p && o.jsx("button", {
              type: "button",
              className: "cj-sidebar-join-btn",
              onClick: mn,
              disabled: ns,
              children: h(ns ? "home.marketplace.confirmJoining" : r && ls ? "home.marketplace.successStartLearning" : "courseJourney.joinCourseButton")
            })]
          }), o.jsx("div", {
            className: "cj-sidebar-section-header",
            children: o.jsx("span", {
              className: "cj-sidebar-section-title",
              children: h("courseJourney.panelSectionTitle")
            })
          }), o.jsx("nav", {
            className: "cj-sidebar-tabs",
            "aria-label": "Course sections",
            children: Re.map(({
              key: e,
              labelKey: t
            }) => {
              const s = Ae[e];
              return o.jsxs("button", {
                type: "button",
                className: "cj-sidebar-tab" + (ce === e ? " cj-sidebar-tab--active" : ""),
                onClick: () => oe(e),
                children: [o.jsx(s, {
                  className: "cj-sidebar-tab-icon"
                }), h(t)]
              }, e);
            })
          }), ce === "units" && o.jsx("div", {
            className: "cj-sidebar-unit-list",
            children: K.units.map((e, t) => {
              const s = (Rs == null ? undefined : Rs.unitId) === e.unitId;
              return o.jsxs("button", {
                type: "button",
                className: "cj-sidebar-unit-btn" + (s ? " cj-sidebar-unit-btn--active" : ""),
                onClick: () => {
                  Ne(e.unitId);
                  const t = nt(e, Ws, Vs, p, {}, h)[0];
                  Se(t ? new Set([t.id]) : new Set());
                  Ee(null);
                },
                children: [o.jsx("span", {
                  className: "cj-sidebar-unit-index",
                  children: t + 1
                }), o.jsx("span", {
                  className: "cj-sidebar-unit-label",
                  children: e.title
                })]
              }, e.unitId || t);
            })
          }), ce === "materials" && (qs.length > 0 ? o.jsx("ul", {
            className: "cj-sidebar-material-list",
            children: qs.map(e => o.jsxs("li", {
              className: "cj-sidebar-material-item",
              children: [o.jsx("img", {
                className: "cj-sidebar-material-icon",
                src: Be(e),
                alt: "",
                "aria-hidden": "true"
              }), o.jsx("span", {
                className: "cj-sidebar-material-label",
                title: e,
                children: e
              })]
            }, e))
          }) : o.jsxs("div", {
            className: "cj-sidebar-material-empty",
            children: [o.jsx("img", {
              className: "cj-sidebar-material-empty-image",
              src: "/pages/coursePage/CourseJourney/no-search-result.png",
              alt: "",
              "aria-hidden": "true"
            }), o.jsx("p", {
              className: "cj-sidebar-material-empty-text",
              children: h("courseJourney.noMaterialsYet")
            })]
          })), ce === "practices" && o.jsx("div", {
            className: "cj-sidebar-practice-panel",
            children: an.length > 0 ? o.jsx("ul", {
              className: "cj-sidebar-practice-list",
              children: an.map(e => {
                const t = e.kind === "practice" ? wt : e.kind === "exam" ? Mt : Dt;
                const s = e.targetPath ? decodeURIComponent(e.targetPath.split("/").pop() ?? "") : "";
                const n = e.kind === "practice" ? kt : e.kind === "exam" ? ft : null;
                const a = t === "generating" && (n === null || n.includes(s));
                return o.jsx("li", {
                  children: o.jsxs("button", {
                    type: "button",
                    className: "cj-sidebar-practice-item" + (p || e.targetPath ? "" : " cj-sidebar-practice-item--disabled"),
                    disabled: !p && !e.targetPath,
                    onClick: () => {
                      if (p) {
                        mn();
                      } else if (e.targetPath) {
                        if (a) {
                          Yt(e.kind);
                        } else {
                          m(e.targetPath);
                        }
                      }
                    },
                    children: [o.jsx("span", {
                      className: `cj-sidebar-practice-icon cj-sidebar-practice-icon--${e.kind}`,
                      children: e.kind === "practice" ? o.jsx(ut, {}) : o.jsx(D, {
                        type: e.kind
                      })
                    }), o.jsxs("span", {
                      className: "cj-sidebar-practice-body",
                      children: [o.jsx("span", {
                        className: "cj-sidebar-practice-title",
                        title: e.title,
                        children: e.title
                      }), o.jsxs("span", {
                        className: "cj-sidebar-practice-meta",
                        children: [e.unitLabel, " · ", e.kind === "practice" && a ? h("courseJourney.practiceAction") : e.kindLabel]
                      })]
                    }), e.completed && o.jsx("span", {
                      className: "cj-sidebar-practice-check",
                      role: "img",
                      "aria-label": "Completed",
                      children: o.jsx("svg", {
                        width: "14",
                        height: "14",
                        viewBox: "0 0 24 24",
                        fill: "none",
                        xmlns: "http://www.w3.org/2000/svg",
                        "aria-hidden": "true",
                        children: o.jsx("path", {
                          d: "M5 12.5L10 17.5L19 7.5",
                          stroke: "currentColor",
                          strokeWidth: "2.4",
                          strokeLinecap: "round",
                          strokeLinejoin: "round"
                        })
                      })
                    })]
                  })
                }, e.key);
              })
            }) : o.jsxs("div", {
              className: "cj-sidebar-material-empty",
              children: [o.jsx("img", {
                className: "cj-sidebar-material-empty-image",
                src: "/pages/coursePage/CourseJourney/no-search-result.png",
                alt: "",
                "aria-hidden": "true"
              }), o.jsx("p", {
                className: "cj-sidebar-material-empty-text",
                children: h("courseJourney.noPracticesYet")
              })]
            })
          })]
        }), o.jsx("main", {
          className: "course-journey-right",
          children: o.jsxs("section", {
            className: "course-journey-unit-overview",
            "aria-labelledby": "course-journey-unit-title",
            children: [o.jsxs("header", {
              className: "course-journey-unit-header",
              children: [o.jsx("span", {
                className: "course-journey-unit-eyebrow",
                children: h("courseJourney.unitOfTotal", {
                  current: As + 1,
                  total: K.units.length
                })
              }), o.jsxs("h1", {
                id: "course-journey-unit-title",
                className: "course-journey-unit-title",
                children: [Ke(Rs, As, h), !p && Rs.unitId && en[Rs.unitId] && o.jsx("span", {
                  className: "cj-status-pill cj-status-pill--completed cj-status-pill--center",
                  children: h("courses.tabs.completed")
                }), !p && Rs.unitId && !en[Rs.unitId] && Rs.learning_finished && o.jsx(ee, {
                  hint: h("courseJourney.unitLearnedHint"),
                  children: o.jsx("span", {
                    className: "cj-status-pill cj-status-pill--learning cj-status-pill--center",
                    children: h("courseJourney.learnedPill")
                  })
                })]
              }), o.jsx("p", {
                className: "course-journey-unit-description",
                children: Rs.description
              })]
            }), o.jsxs("div", {
              className: "cj-extend-row",
              children: [o.jsx(Ce, {
                courseUuid: Ws,
                onUpdated: (e, t) => {
                  Q(e => e + 1);
                  rn(e, t);
                },
                canvasUpdateStatus: Qt,
                onEntryClick: p ? mn : undefined
              }), !p && Ws && Qt.status === "done" && Qt.updates.hasBaseline && Qt.updates.total > 0 && !Qt.updates.pushDisabled && o.jsx(Le, {
                courseUuid: Ws,
                updates: Qt.updates,
                onUpdated: dn,
                onActionStart: on,
                onResolved: ln
              })]
            }), o.jsxs("section", {
              className: "course-journey-progress-section",
              "aria-label": "Unit progress",
              children: [o.jsx("div", {
                className: "course-journey-progress-legend",
                "aria-label": "Progress legend",
                children: We.map(({
                  key: e,
                  labelKey: t
                }) => o.jsxs("div", {
                  className: "course-journey-progress-legend-item",
                  children: [He(e) ? o.jsx(X, {
                    state: e,
                    size: 22
                  }) : o.jsx("span", {
                    className: `course-journey-progress-mark course-journey-progress-mark--${e}`,
                    children: o.jsx(D, {
                      type: e,
                      className: "course-journey-progress-type-icon"
                    })
                  }), o.jsx("span", {
                    className: "course-journey-progress-label",
                    children: h(t)
                  })]
                }, e))
              }), o.jsxs("div", {
                className: "course-journey-progress-track",
                "aria-label": "Progress path",
                children: [Zs.map(({
                  key: e,
                  sectionId: t,
                  state: s,
                  label: n
                }) => o.jsx("button", {
                  type: "button",
                  className: "course-journey-progress-node" + (He(s) ? " course-journey-progress-node--ring" : ` course-journey-progress-node--${s}`),
                  "aria-label": `${n}: ${s}`,
                  onClick: () => Se(e => new Set(e).add(t)),
                  children: He(s) ? o.jsx(ee, {
                    hint: h(ze[s]),
                    children: o.jsx(X, {
                      state: s,
                      size: 24
                    })
                  }) : o.jsx(D, {
                    type: s,
                    className: "course-journey-progress-type-icon"
                  })
                }, e)), o.jsx("div", {
                  className: "course-journey-progress-track-next",
                  children: o.jsx(Pe, {
                    total: Qs.total,
                    nextStep: Qs.nextStep,
                    isNewCourse: Qs.isNewCourse,
                    onContinue: xn
                  })
                })]
              })]
            }), o.jsx("section", {
              className: "course-journey-content-timeline",
              "aria-label": "Course content",
              onMouseLeave: () => Ee(null),
              children: Ys.map((e, t) => {
                var s;
                const n = we.has(e.id) || Ie === e.id;
                const a = t < Ys.length - 1;
                const r = e.completed ? "completed" : "upcoming";
                const i = e.activities || [];
                const c = Array.from(new Set(e.referenceFiles || []));
                const l = e.runtimePath || null;
                return o.jsxs("article", {
                  ref: t => {
                    if (t) {
                      $s.current.set(e.id, t);
                    } else {
                      $s.current.delete(e.id);
                    }
                  },
                  className: "course-journey-content-item" + (n ? " course-journey-content-item--expanded" : ""),
                  style: {
                    "--cj-item-index": t
                  },
                  onMouseEnter: () => Ee(e.id),
                  children: [o.jsxs("div", {
                    className: "course-journey-content-rail",
                    "aria-hidden": "true",
                    children: [o.jsx("span", {
                      className: `course-journey-content-stop course-journey-content-stop--${e.type}${e.completed ? " course-journey-content-stop--completed" : ""}`,
                      children: e.completed ? o.jsx("svg", {
                        width: "14",
                        height: "14",
                        viewBox: "0 0 24 24",
                        fill: "none",
                        xmlns: "http://www.w3.org/2000/svg",
                        children: o.jsx("path", {
                          d: "M5 12.5L10 17.5L19 7.5",
                          stroke: "currentColor",
                          strokeWidth: "2.2",
                          strokeLinecap: "round",
                          strokeLinejoin: "round"
                        })
                      }) : o.jsx(D, {
                        type: e.type,
                        className: "course-journey-content-stop-icon"
                      })
                    }), a && o.jsx("span", {
                      className: `course-journey-content-connector course-journey-content-connector--${r}`
                    })]
                  }), o.jsx("div", {
                    className: "course-journey-content-body",
                    children: o.jsxs("div", {
                      className: "course-journey-lesson-card",
                      onClick: () => Se(t => {
                        const s = new Set(t);
                        if (s.has(e.id)) {
                          s.delete(e.id);
                        } else {
                          s.add(e.id);
                        }
                        return s;
                      }),
                      children: [o.jsxs("div", {
                        className: "course-journey-lesson-card-header",
                        children: [o.jsxs("div", {
                          className: "course-journey-lesson-card-title-row",
                          children: [o.jsx("button", {
                            type: "button",
                            className: "course-journey-lesson-card-title-btn",
                            "aria-expanded": n,
                            children: o.jsxs("span", {
                              className: "course-journey-content-title",
                              children: [e.title, !p && Xs[e.id] && o.jsx("span", {
                                className: "cj-status-pill cj-status-pill--completed",
                                children: h("courses.tabs.completed")
                              }), !p && !Xs[e.id] && ((s = e.lecture) == null ? undefined : s.learning_finished) && o.jsx(ee, {
                                hint: h("courseJourney.lectureLearnedHint"),
                                children: o.jsx("span", {
                                  className: "cj-status-pill cj-status-pill--learning",
                                  children: h("courseJourney.learnedPill")
                                })
                              })]
                            })
                          }), false]
                        }), o.jsx("p", {
                          className: "course-journey-lesson-card-description",
                          children: e.description
                        })]
                      }), o.jsx("div", {
                        className: "course-journey-lesson-card-body" + (n ? " course-journey-lesson-card-body--open" : ""),
                        children: o.jsxs("div", {
                          className: "course-journey-lesson-card-body-inner",
                          children: [e.type === "exam" && (() => {
                            var t;
                            const s = p || e.examUnitId == null ? undefined : Ut[e.examUnitId];
                            const n = !p && typeof s == "number";
                            const a = Mt === "generating" && (ft === null || e.examUnitId != null && ft.includes(e.examUnitId));
                            const r = p ? "upcoming" : lt(n, ot(Qs.nextStepItem, e.id, "exam"));
                            return o.jsxs("div", {
                              className: "course-journey-session-table course-journey-session-table--exam",
                              children: [o.jsxs("span", {
                                className: "course-journey-session-name",
                                children: [e.title, (ks && ((t = Qs.nextStepItem) == null ? undefined : t.sectionId) === e.id && Qs.nextStepItem.kind === "exam" || (Ts == null ? undefined : Ts.sectionId) === e.id && Ts.kind === "exam") && o.jsx("span", {
                                  className: "cj-up-next-pill",
                                  children: h("courseJourney.upNextPill")
                                })]
                              }), o.jsxs("span", {
                                className: "course-journey-session-cell",
                                children: [a && e.examTargetPath && o.jsx("span", {
                                  className: "course-journey-practice-spinner",
                                  role: "status",
                                  "aria-label": "Exam is being prepared"
                                }), o.jsxs("button", {
                                  type: "button",
                                  className: `course-journey-lesson-action course-journey-lesson-action--primary course-journey-lesson-action--${r}${p || e.examTargetPath ? "" : " course-journey-lesson-action--disabled"}`,
                                  disabled: !p && !e.examTargetPath,
                                  onClick: () => {
                                    if (p) {
                                      mn();
                                    } else if (e.examTargetPath) {
                                      if (a) {
                                        Yt("exam");
                                      } else {
                                        m(e.examTargetPath);
                                      }
                                    }
                                  },
                                  children: [o.jsx(dt, {}), h(n ? "courseJourney.retakeButton" : "deepLearnSessionBlock.startSessionAlt")]
                                })]
                              }), o.jsx("span", {
                                className: "course-journey-session-cell course-journey-session-check-cell",
                                children: n && o.jsx("span", {
                                  className: "course-journey-exam-score",
                                  children: h("courseJourney.examScorePercent", {
                                    score: s
                                  })
                                })
                              })]
                            });
                          })(), e.type === "project" && (() => {
                            var t;
                            const s = p ? "upcoming" : lt(!!e.completed, ot(Qs.nextStepItem, e.id, "project"));
                            return o.jsxs("div", {
                              className: "course-journey-session-table course-journey-session-table--exam",
                              children: [o.jsxs("span", {
                                className: "course-journey-session-name",
                                children: [e.stageLabel ?? e.title, (ks && ((t = Qs.nextStepItem) == null ? undefined : t.sectionId) === e.id && Qs.nextStepItem.kind === "project" || (Ts == null ? undefined : Ts.sectionId) === e.id && Ts.kind === "project") && o.jsx("span", {
                                  className: "cj-up-next-pill",
                                  children: h("courseJourney.upNextPill")
                                })]
                              }), o.jsxs("span", {
                                className: "course-journey-session-cell",
                                children: [Dt === "generating" && o.jsx("span", {
                                  className: "course-journey-practice-spinner",
                                  role: "status",
                                  "aria-label": "Project is being prepared"
                                }), o.jsxs("button", {
                                  type: "button",
                                  className: `course-journey-lesson-action course-journey-lesson-action--primary course-journey-lesson-action--${s}${p || e.projectTargetPath ? "" : " course-journey-lesson-action--disabled"}`,
                                  disabled: !p && !e.projectTargetPath,
                                  onClick: () => {
                                    if (p) {
                                      mn();
                                    } else if (e.projectTargetPath) {
                                      if (Dt !== "generating") {
                                        m(e.projectTargetPath);
                                      } else {
                                        Yt("project");
                                      }
                                    }
                                  },
                                  children: [o.jsx(dt, {}), h("deepLearnSessionBlock.startSessionAlt")]
                                })]
                              }), o.jsx("span", {
                                className: "course-journey-session-cell course-journey-session-check-cell"
                              })]
                            });
                          })(), i.length > 0 && o.jsx("div", {
                            className: "course-journey-session-table",
                            role: "group",
                            "aria-label": `${e.title} ${e.type === "project" ? "tasks" : "sessions"}`,
                            children: i.map((t, s) => {
                              var n;
                              var a;
                              const r = (n = e.sessions) == null ? undefined : n[s];
                              const i = (r == null ? undefined : r.conversationId) || (r == null ? undefined : r.sessionId) || `${e.id}-${s}`;
                              const c = wt === "generating" && (kt === null || kt.includes(i));
                              const d = p ? "upcoming" : lt(!!t.completed, ot(Qs.nextStepItem, e.id, "learn", s));
                              const j = p ? "upcoming" : lt(!!t.practiceCompleted, ot(Qs.nextStepItem, e.id, "practice", s));
                              const x = t.practiceRating;
                              return o.jsxs(u.Fragment, {
                                children: [o.jsxs("span", {
                                  className: "course-journey-session-name",
                                  children: [t.name, (ks && ((a = Qs.nextStepItem) == null ? undefined : a.sectionId) === e.id && (Qs.nextStepItem.kind === "learn" || Qs.nextStepItem.kind === "practice") && Qs.nextStepItem.activityIndex === s || (Ts == null ? undefined : Ts.sectionId) === e.id && Ts.kind === "learn" && Ts.activityIndex === s) && o.jsx("span", {
                                    className: "cj-up-next-pill",
                                    children: h("courseJourney.upNextPill")
                                  }), (Oe == null ? undefined : Oe.sectionId) === e.id && Oe.activityIndex === s && o.jsx("span", {
                                    className: "cj-up-next-pill",
                                    children: h("courseJourney.newPill")
                                  }), !!(r == null ? undefined : r.description) && o.jsx(ee, {
                                    hint: tt.has(i) ? h("courseSession.sessionIntroHideHint") : h("courseSession.sessionIntroShowHint"),
                                    gap: 1,
                                    children: o.jsx("button", {
                                      type: "button",
                                      className: "cj-session-intro-toggle" + (tt.has(i) ? " cj-session-intro-toggle--open" : ""),
                                      "aria-expanded": tt.has(i),
                                      "aria-label": tt.has(i) ? h("courseSession.sessionIntroHideAria") : h("courseSession.sessionIntroShowAria"),
                                      onClick: e => {
                                        e.stopPropagation();
                                        xt(i);
                                      },
                                      children: o.jsx(pt, {})
                                    })
                                  }), !!(r == null ? undefined : r.description) && o.jsx("span", {
                                    className: "cj-session-intro-reveal" + (tt.has(i) ? " cj-session-intro-reveal--open" : ""),
                                    children: o.jsx("span", {
                                      className: "cj-session-intro-text",
                                      children: r.description
                                    })
                                  })]
                                }), o.jsx("span", {
                                  className: "course-journey-session-cell",
                                  children: o.jsxs("a", {
                                    className: `course-journey-lesson-action course-journey-lesson-action--primary course-journey-lesson-action--${d}${p || t.learnTargetPath || l ? "" : " course-journey-lesson-action--disabled"}`,
                                    href: p ? undefined : t.learnTargetPath || l || undefined,
                                    "aria-disabled": p || t.learnTargetPath || l ? undefined : "true",
                                    onClick: s => {
                                      s.preventDefault();
                                      if (p) {
                                        mn();
                                        return;
                                      }
                                      const n = t.learnTargetPath || l;
                                      if (n) {
                                        jn(n, t.name, {
                                          showIntro: t.started !== true && t.completed !== true,
                                          introDescription: (r == null ? undefined : r.description) || (r == null ? undefined : r.sessionOutline) || e.description
                                        });
                                      }
                                    },
                                    children: [o.jsx(dt, {}), !p && t.completed ? h("courseJourney.revisitAction") : !p && t.started ? h("courseJourney.resumeAction") : t.learnAction]
                                  })
                                }), o.jsxs("span", {
                                  className: "course-journey-session-cell course-journey-session-cell--practice",
                                  children: [o.jsxs("button", {
                                    type: "button",
                                    className: `course-journey-lesson-action course-journey-lesson-action--${j}${p || t.practiceTargetPath ? "" : " course-journey-lesson-action--disabled"}${p || (x == null ? undefined : x.state) !== "retry" ? "" : " course-journey-lesson-action--rating-retry"}`,
                                    disabled: !p && !t.practiceTargetPath,
                                    onClick: () => {
                                      if (p) {
                                        mn();
                                      } else if (t.practiceTargetPath) {
                                        if (c) {
                                          Yt("practice");
                                        } else {
                                          m(t.practiceTargetPath);
                                        }
                                      }
                                    },
                                    children: [!p && c && t.practiceTargetPath ? o.jsx(ht, {}) : o.jsx(ut, {}), c ? h("courseJourney.practiceAction") : t.practiceAction]
                                  }), !p && (x == null ? undefined : x.state) === "inProgress" && o.jsx("span", {
                                    className: "course-journey-practice-dot",
                                    role: "img",
                                    "aria-label": h("courseJourney.practiceRating.inProgress")
                                  }), !p && (x == null ? undefined : x.state) === "done" && o.jsx("span", {
                                    className: "course-journey-practice-check",
                                    role: "img",
                                    "aria-label": h("courseJourney.practiceRating.done"),
                                    children: o.jsx("svg", {
                                      width: "14",
                                      height: "14",
                                      viewBox: "0 0 24 24",
                                      fill: "none",
                                      xmlns: "http://www.w3.org/2000/svg",
                                      "aria-hidden": "true",
                                      children: o.jsx("path", {
                                        d: "M5 12.5L10 17.5L19 7.5",
                                        stroke: "currentColor",
                                        strokeWidth: "2.4",
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round"
                                      })
                                    })
                                  }), !p && ((x == null ? undefined : x.state) === "rated" || (x == null ? undefined : x.state) === "retry") && (() => {
                                    const e = x.score === undefined ? h("courseJourney.practiceRating.starsLabel", {
                                      stars: x.stars,
                                      total: 3
                                    }) : h("courseJourney.practiceRating.summary", {
                                      stars: x.stars,
                                      total: 3,
                                      score: x.score.toLocaleString(),
                                      perfect: (x.perfect ?? 0).toLocaleString()
                                    });
                                    return o.jsxs("span", {
                                      className: "course-journey-practice-rating",
                                      children: [o.jsx(P, {
                                        stars: x.stars,
                                        size: 12,
                                        label: e
                                      }), o.jsx("span", {
                                        className: "course-journey-practice-tooltip",
                                        "aria-hidden": "true",
                                        children: e
                                      })]
                                    });
                                  })()]
                                }), (() => {
                                  const e = p ? "notStarted" : at(t.mastery);
                                  const s = o.jsx(X, {
                                    state: e,
                                    size: 22
                                  });
                                  return o.jsx("span", {
                                    className: "course-journey-session-cell course-journey-session-check-cell",
                                    role: "img",
                                    "aria-label": `${t.name}: ${e}`,
                                    children: p ? s : o.jsx(ee, {
                                      hint: h(ze[e]),
                                      children: s
                                    })
                                  });
                                })()]
                              }, i);
                            })
                          }), e.type === "lecture" && c.length > 0 && o.jsxs("div", {
                            className: "course-journey-panel" + (c.length > 0 ? " course-journey-panel--has-files" : ""),
                            children: [o.jsx("h3", {
                              className: "course-journey-panel-title",
                              children: h("courseJourney.referenceFilesTitle")
                            }), o.jsxs("div", {
                              className: "course-journey-reference-file-list",
                              children: [c.map(e => o.jsxs("button", {
                                type: "button",
                                className: "course-journey-reference-file-pill",
                                children: [o.jsx("img", {
                                  className: "course-journey-reference-file-icon",
                                  src: Be(e),
                                  alt: "",
                                  "aria-hidden": "true"
                                }), e]
                              }, e)), false]
                            })]
                          })]
                        })
                      })]
                    })
                  })]
                }, e.id);
              })
            })]
          }, Rs.unitId || As)
        })]
      }), o.jsx(jt, {
        isOpen: hs,
        title: un.title,
        description: un.description,
        onClose: () => ms(false)
      }), t && o.jsx(ge, {
        isOpen: rs,
        onClose: () => is(false),
        courseId: Ws
      }), r && cs && o.jsx(Z, {
        initialView: {
          type: "confirm",
          course: {
            marketplaceId: g ?? "",
            courseTitle: (K == null ? undefined : K.courseTitle) ?? "",
            languages: us
          }
        },
        onClose: () => os(false),
        onEnrolled: (e, t) => ds(t),
        successMode: "marketplace"
      }), !p && o.jsxs(o.Fragment, {
        children: [o.jsx(F, {
          isOpen: le,
          onClose: () => de(false),
          course: un,
          lessonCount: pn,
          subject: "General"
        }), o.jsx(xe, {
          isOpen: je && ye,
          onClose: () => ve(false),
          courseUuid: Ws,
          courseTitle: K == null ? undefined : K.courseTitle
        }), o.jsx(fe, {
          open: !!Xe,
          onClose: () => et(null),
          courseUuid: Ws,
          onUpdated: (e, t) => {
            Q(e => e + 1);
            rn(e, t);
          },
          scopeInstruction: Xe ? (gn = Xe, `SCOPE — restrict every change to the lecture "${gn.lectureTitle}" (lectureId: ${gn.lectureId}) inside unit "${gn.unitTitle}". You may attach any newly uploaded file(s) as reference material to this lecture's session(s), and/or add one or more new sessions under THIS lecture — do whichever fits, and you may do BOTH. Do NOT create new units or new lectures, and do NOT modify any other lecture.`) : undefined,
          scopeLabel: Xe == null ? undefined : Xe.lectureTitle,
          placeholder: h("courseJourney.lectureExtendPlaceholder")
        }), o.jsx(_e, {
          open: js,
          onClose: Ks
        }), o.jsx(U, {
          kind: qt,
          onClose: () => Yt(null)
        }), o.jsx(gt, {
          nextStep: Zt,
          onDismiss: () => Gt(null),
          onStart: () => {
            Gt(null);
            xn();
          }
        }), Os && !js && !Ls && o.jsx(R, {
          variant: "journey",
          onSubmit: e => {
            W({
              runId: Os.runId,
              courseUuid: Ws,
              stage: "journey",
              rating: e.rating,
              comment: e.comment
            });
          },
          onClose: zs
        }), o.jsx($e, {
          celebration: Ls,
          onDismiss: () => Es(null)
        }), o.jsx(Ue, {
          reminder: Ns,
          onLater: () => ws(null),
          onStartNow: () => {
            const e = Ns == null ? undefined : Ns.practicePath;
            ws(null);
            if (e) {
              m(e);
            }
          }
        })]
      })]
    });
  } else {
    return o.jsx("div", {
      className: "course-journey-page",
      children: o.jsxs("div", {
        className: "course-journey-state",
        children: [!p && o.jsxs("button", {
          type: "button",
          className: "course-journey-back-btn",
          onClick: hn,
          children: [o.jsx(mt, {}), h("courseSession.exitCourse")]
        }), r && o.jsxs("button", {
          type: "button",
          className: "course-journey-back-btn",
          onClick: () => m("/marketplace"),
          children: [o.jsx(mt, {}), h("home.marketplace.backToMarketplace")]
        }), o.jsx("div", {
          className: "course-journey-state-card course-journey-state-card--error",
          children: t ? h("courseJourney.courseNoLongerAvailable") : re || h("courseJourney.courseNotFoundFallback")
        })]
      })
    });
  }
  var gn;
};
export { De as PENDING_COURSE_JOIN_KEY, Fe as PENDING_COURSE_JOIN_TTL_MS, vt as default };