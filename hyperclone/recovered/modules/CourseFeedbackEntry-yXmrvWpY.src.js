import { b as e, r as o, i, j as t, w as a } from "./index-TjoB2Buo.js";
import { B as r } from "./BugReportModal-DxKVyQda.js";
const s = {
  courseJourney: {
    commentPrefix: "(SYSTEM MSG: Feedback from course journey page)",
    emailIdLabel: "Course ID",
    compositeId: false
  },
  whiteboard: {
    commentPrefix: "(SYSTEM MSG: Feedback from whiteboard session)",
    emailIdLabel: "Whiteboard ID",
    compositeId: false
  },
  pdfAnnotation: {
    commentPrefix: "(SYSTEM MSG: Feedback from pdf annotation session)",
    emailIdLabel: "Whiteboard ID",
    compositeId: false
  },
  practice: {
    commentPrefix: "(SYSTEM MSG: Feedback from practice session)",
    emailIdLabel: "Practice ID",
    compositeId: true
  },
  project: {
    commentPrefix: "(SYSTEM MSG: Feedback from project stage)",
    emailIdLabel: "Project ID",
    compositeId: true
  },
  exam: {
    commentPrefix: "(SYSTEM MSG: Feedback from exam)",
    emailIdLabel: "Exam ID",
    compositeId: true
  }
};
const n = [];
const c = ({
  size: e
}) => t.jsxs("svg", {
  width: e,
  height: e,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "1.8",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": "true",
  children: [t.jsx("path", {
    d: "M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"
  }), t.jsx("line", {
    x1: "4",
    y1: "22",
    x2: "4",
    y2: "15"
  })]
});
const d = ({
  conversationId: d,
  source: m,
  courseId: l,
  variant: b = "pill",
  className: x,
  hideNativeTitle: I = false
}) => {
  const {
    t: p
  } = e();
  const [u, f] = o.useState(false);
  if (!d || !i()) {
    return null;
  }
  const h = s[m];
  const S = h.compositeId && l ? `${l} (${d})` : d;
  const j = p("chatResponse.haveAnIssue");
  return t.jsxs(t.Fragment, {
    children: [t.jsx("button", {
      type: "button",
      className: `course-feedback-entry course-feedback-entry--${b}${x ? ` ${x}` : ""}`,
      onClick: () => f(true),
      title: b !== "header-icon" || I ? undefined : j,
      "aria-label": j,
      children: b === "header-icon" ? t.jsx(c, {
        size: 18
      }) : t.jsxs(t.Fragment, {
        children: [t.jsx(c, {
          size: 13
        }), t.jsx("span", {
          children: j
        })]
      })
    }), a.createPortal(t.jsx(r, {
      isOpen: u,
      onClose: () => f(false),
      conversationId: S,
      conversationHistory: n,
      commentPrefix: h.commentPrefix,
      title: p("courseFeedback.title"),
      hideIdRow: true,
      emailIdLabel: h.emailIdLabel,
      includePageUrl: true
    }), document.body)]
  });
};
export { d as C };