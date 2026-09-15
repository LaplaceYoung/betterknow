import { c as e, g as n, b as r, r as a, j as t, R as s } from "./index-TjoB2Buo.js";
const c = () => {
  const e = n();
  if (e) {
    return {
      Authorization: `Bearer ${e}`
    };
  } else {
    return {};
  }
};
async function o(n) {
  try {
    const r = await fetch(e(`/api/v1/course-generation/courses/${encodeURIComponent(n)}/generation-status`), {
      headers: c(),
      cache: "no-store"
    });
    if (!r.ok) {
      return {
        practice: "none",
        exam: "none",
        project: "none",
        generatingSessionIds: null,
        generatingUnitIds: null
      };
    }
    const a = await r.json();
    const t = e => e === "ready" || e === "generating" ? e : "none";
    const s = e => Array.isArray(e) ? e.filter(e => typeof e == "string") : null;
    return {
      practice: t(a == null ? undefined : a.practice),
      exam: t(a == null ? undefined : a.exam),
      project: t(a == null ? undefined : a.project),
      generatingSessionIds: s(a == null ? undefined : a.generatingSessionIds),
      generatingUnitIds: s(a == null ? undefined : a.generatingUnitIds)
    };
  } catch {
    return {
      practice: "none",
      exam: "none",
      project: "none",
      generatingSessionIds: null,
      generatingUnitIds: null
    };
  }
}
async function i(n) {
  try {
    const r = await fetch(e(`/api/v1/course-generation/courses/${encodeURIComponent(n)}/progress-status`), {
      headers: c(),
      cache: "no-store"
    });
    if (!r.ok) {
      return null;
    }
    const a = await r.json();
    return {
      examScores: (a == null ? undefined : a.examScores) && typeof a.examScores == "object" ? a.examScores : {},
      practiceStats: (a == null ? undefined : a.practiceStats) && typeof a.practiceStats == "object" ? a.practiceStats : {},
      projectStages: (a == null ? undefined : a.projectStages) && typeof a.projectStages == "object" ? a.projectStages : {}
    };
  } catch {
    return null;
  }
}
const p = {
  practice: "courseJourney.preparingDescriptionPractice",
  exam: "courseJourney.preparingDescriptionExam",
  project: "courseJourney.preparingDescriptionProject"
};
const l = ({
  kind: e,
  onClose: n
}) => {
  const {
    t: c
  } = r();
  a.useEffect(() => {
    if (!e) {
      return;
    }
    const r = e => {
      if (e.key === "Escape") {
        n();
      }
    };
    document.addEventListener("keydown", r);
    return () => document.removeEventListener("keydown", r);
  }, [e, n]);
  if (e) {
    return t.jsx("div", {
      className: "cj-preparing-overlay",
      onClick: n,
      children: t.jsx("section", {
        className: "cj-preparing-modal",
        onClick: e => e.stopPropagation(),
        role: "dialog",
        "aria-modal": "true",
        "aria-labelledby": "cj-preparing-title",
        "aria-describedby": "cj-preparing-desc",
        children: t.jsxs("div", {
          className: "cj-preparing-row",
          children: [t.jsx("div", {
            className: "cj-preparing-media",
            "aria-hidden": "true",
            children: t.jsx(s, {
              className: "cj-preparing-video"
            })
          }), t.jsxs("div", {
            className: "cj-preparing-body",
            children: [t.jsx("span", {
              id: "cj-preparing-title",
              className: "cj-preparing-title",
              children: c("courseJourney.preparingModalTitle")
            }), t.jsx("span", {
              id: "cj-preparing-desc",
              className: "cj-preparing-desc",
              children: c(p[e])
            }), t.jsx("button", {
              type: "button",
              className: "cj-preparing-btn",
              onClick: n,
              children: c("courseSession.gotIt")
            })]
          })]
        })
      })
    });
  } else {
    return null;
  }
};
export { l as P, i as a, o as g };