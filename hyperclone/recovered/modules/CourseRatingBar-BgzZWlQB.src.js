import { b as e, r as a, j as t, g as n, c as s, z as r } from "./index-TjoB2Buo.js";
const o = [1, 2, 3, 4, 5];
const i = ({
  value: n,
  onChange: s,
  size: r = 24,
  disabled: i = false
}) => {
  const {
    t: c
  } = e();
  const [l, u] = a.useState(null);
  const d = l ?? n ?? 0;
  return t.jsxs("div", {
    className: "star-rating",
    role: "group",
    "aria-label": c("chatResponse.courseGeneration.feedback.ratingLabel"),
    onMouseLeave: () => u(null),
    children: [o.map(e => t.jsx("button", {
      type: "button",
      className: "star-rating-star" + (e <= d ? " filled" : ""),
      disabled: i,
      onMouseEnter: () => u(e),
      onFocus: () => u(e),
      onBlur: () => u(null),
      onClick: () => s(e),
      "aria-label": c(`chatResponse.courseGeneration.feedback.stars.${e}`),
      children: t.jsx("svg", {
        width: r,
        height: r,
        viewBox: "0 0 24 24",
        "aria-hidden": "true",
        children: t.jsx("path", {
          d: "M12 3.1l2.72 5.51 6.08.89-4.4 4.29 1.04 6.05L12 17.98l-5.44 2.86 1.04-6.05-4.4-4.29 6.08-.89z"
        })
      })
    }, e)), t.jsx("span", {
      className: "star-rating-caption",
      "aria-live": "polite",
      children: d > 0 ? c(`chatResponse.courseGeneration.feedback.stars.${d}`) : ""
    })]
  });
};
const c = 1000;
const l = e => `course-generation-feedback:${e}`;
const u = e => {
  if (!e) {
    return null;
  }
  try {
    const a = window.localStorage.getItem(l(e));
    if (!a) {
      return null;
    }
    const t = JSON.parse(a);
    if ((t == null ? undefined : t.state) !== "pending" && (t == null ? undefined : t.state) !== "handled") {
      return null;
    } else {
      return {
        state: t.state,
        runId: typeof t.runId == "string" ? t.runId : null
      };
    }
  } catch {
    return null;
  }
};
const d = (e, a) => {
  if (e) {
    try {
      window.localStorage.setItem(l(e), JSON.stringify(a));
    } catch {}
  }
};
const h = (e, a) => {
  if (u(e) === null) {
    d(e, {
      state: "pending",
      runId: a
    });
  }
};
const p = e => {
  var a;
  d(e, {
    state: "handled",
    runId: ((a = u(e)) == null ? undefined : a.runId) ?? null
  });
};
const g = e => {
  const a = u(e);
  if ((a == null ? undefined : a.state) === "pending") {
    return {
      runId: a.runId
    };
  } else {
    return null;
  }
};
const b = async e => {
  const a = e.comment.trim().slice(0, c);
  if ((e.rating !== null || a) && (e.runId || e.courseUuid)) {
    try {
      const t = n();
      await fetch(s("/api/v1/course-generation/generation-feedback"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(t ? {
            Authorization: `Bearer ${t}`
          } : {})
        },
        body: JSON.stringify({
          run_id: e.runId,
          course_uuid: e.courseUuid,
          stage: e.stage,
          rating: e.rating,
          comment: a
        })
      });
    } catch (t) {}
  }
};
const m = ({
  variant: n,
  onSubmit: s,
  onClose: o
}) => {
  const {
    t: l
  } = e();
  const [u, d] = a.useState(null);
  const [h, p] = a.useState("");
  const [g, b] = a.useState(false);
  const m = a.useRef(false);
  a.useEffect(() => {
    if (!g) {
      return;
    }
    const e = window.setTimeout(o, 2200);
    return () => window.clearTimeout(e);
  }, [g, o]);
  const f = () => {
    if (!m.current) {
      m.current = true;
      s({
        rating: u,
        comment: h
      });
    }
  };
  const x = () => {
    f();
    b(true);
  };
  const k = () => {
    if (u !== null) {
      f();
    }
    o();
  };
  const j = `course-rating-bar course-rating-bar--${n}`;
  if (g) {
    return t.jsx("div", {
      className: `${j} course-rating-bar--thanks`,
      role: "status",
      children: l("chatResponse.courseGeneration.feedback.thanks")
    });
  } else {
    return t.jsxs("section", {
      className: `${j}${u !== null ? " expanded" : ""}`,
      "aria-label": l(`chatResponse.courseGeneration.feedback.prompt.${n}`),
      children: [t.jsxs("div", {
        className: "course-rating-bar-head",
        children: [t.jsx("span", {
          className: "course-rating-bar-prompt",
          children: l(`chatResponse.courseGeneration.feedback.prompt.${n}`)
        }), t.jsx(i, {
          value: u,
          onChange: d,
          size: 22
        }), n === "journey" ? t.jsx("button", {
          type: "button",
          className: "course-rating-bar-later",
          onClick: k,
          children: l("chatResponse.courseGeneration.feedback.later")
        }) : t.jsx("button", {
          type: "button",
          className: "course-rating-bar-close",
          onClick: k,
          "aria-label": l("chatResponse.courseGeneration.feedback.dismiss"),
          children: t.jsx("svg", {
            width: "12",
            height: "12",
            viewBox: "0 0 12 12",
            "aria-hidden": "true",
            children: t.jsx("path", {
              d: "M2.5 2.5l7 7M9.5 2.5l-7 7",
              stroke: "currentColor",
              strokeWidth: "1.5",
              strokeLinecap: "round"
            })
          })
        })]
      }), u !== null && t.jsxs("div", {
        className: "course-rating-bar-detail",
        children: [t.jsx("input", {
          type: "text",
          className: "course-rating-bar-comment",
          value: h,
          onChange: e => p(e.target.value),
          onKeyDown: e => {
            if (e.key === "Enter" && !r(e)) {
              x();
            }
          },
          maxLength: c,
          autoFocus: true,
          placeholder: l("chatResponse.courseGeneration.feedback.commentPlaceholder.completed")
        }), t.jsx("button", {
          type: "button",
          className: "course-rating-bar-submit",
          onClick: x,
          children: l("chatResponse.courseGeneration.feedback.submit")
        })]
      })]
    });
  }
};
export { m as C, c as F, i as S, p as c, g, h as o, b as s };