import { j as e, b as s, r, u as a, i as t, a0 as c, ag as o, au as i, W as l, aj as n, c as u, ak as d, al as h, D as m, _ as x, ao as p } from "./index-TjoB2Buo.js";
import { g as v, a as k, d as j } from "./courses-GqETwdXb.js";
import { C as g } from "./CourseShareModal-C6j8fIDX.js";
const N = e => {
  e.preventDefault();
  e.stopPropagation();
};
const b = ({
  classPrefix: s,
  onShare: r,
  onMore: a,
  onDelete: t,
  isMenuOpen: c = false,
  isDeleting: o = false
}) => r || a ? e.jsxs("div", {
  className: `${s}-actions horizontal-course-ticket-actions`,
  children: [r && e.jsx("button", {
    type: "button",
    className: `${s}-action horizontal-course-ticket-action`,
    onClick: e => {
      N(e);
      r();
    },
    "aria-label": "Share course",
    children: e.jsx("img", {
      src: "/pages/mainPages/courses/share.svg",
      alt: "",
      "aria-hidden": "true"
    })
  }), a && e.jsxs("div", {
    className: "horizontal-course-ticket-more-wrap",
    children: [e.jsx("button", {
      type: "button",
      className: `${s}-action horizontal-course-ticket-action`,
      onClick: e => {
        N(e);
        a();
      },
      "aria-label": "More course actions",
      "aria-haspopup": "menu",
      "aria-expanded": c,
      children: e.jsxs("svg", {
        className: "horizontal-course-ticket-more-icon",
        width: "14",
        height: "14",
        viewBox: "0 0 14 14",
        fill: "none",
        "aria-hidden": "true",
        children: [e.jsx("circle", {
          cx: "3",
          cy: "7",
          r: "1.3",
          fill: "currentColor"
        }), e.jsx("circle", {
          cx: "7",
          cy: "7",
          r: "1.3",
          fill: "currentColor"
        }), e.jsx("circle", {
          cx: "11",
          cy: "7",
          r: "1.3",
          fill: "currentColor"
        })]
      })
    }), c && t && e.jsx("div", {
      className: "horizontal-course-ticket-action-menu",
      role: "menu",
      children: e.jsxs("button", {
        type: "button",
        className: "horizontal-course-ticket-action-menu-item",
        onClick: e => {
          N(e);
          t();
        },
        disabled: o,
        role: "menuitem",
        children: [e.jsx("img", {
          src: "/pages/mainPages/drive/trash.svg",
          alt: "",
          "aria-hidden": "true",
          className: "horizontal-course-ticket-action-menu-icon"
        }), e.jsx("span", {
          children: o ? "Deleting..." : "Delete"
        })]
      })
    })]
  })]
}) : null;
const y = ({
  data: r,
  onShare: a,
  onMore: t,
  onDelete: c,
  isMenuOpen: o,
  isDeleting: i
}) => {
  const {
    t: l
  } = s();
  const n = Math.max(0, Math.min(100, Math.round(r.progress ?? 0)));
  return e.jsxs("div", {
    className: "horizontal-course-ticket-v1-content",
    children: [r.coverImage && e.jsxs("div", {
      className: "horizontal-course-ticket-v1-cover",
      children: [e.jsx("img", {
        src: r.coverImage,
        alt: "",
        className: "horizontal-course-ticket-v1-cover-img"
      }), e.jsx(b, {
        classPrefix: "horizontal-course-ticket-v1",
        onShare: a,
        onMore: t,
        onDelete: c,
        isMenuOpen: o,
        isDeleting: i
      })]
    }), e.jsxs("div", {
      className: "horizontal-course-ticket-v1-info",
      children: [e.jsxs("div", {
        className: "horizontal-course-ticket-v1-course-block",
        children: [e.jsx("span", {
          className: "horizontal-course-ticket-v1-label",
          children: l("courses.ticket.courseNameLabel")
        }), e.jsxs("span", {
          className: "horizontal-course-ticket-v1-course-title-row",
          children: [e.jsx("span", {
            className: "horizontal-course-ticket-v1-course-name",
            children: r.courseName
          }), r.isNew && e.jsxs("span", {
            className: "horizontal-course-ticket-new-badge",
            "aria-label": "This course was added in the last 12 hours.",
            children: [l("courses.ticket.newBadge"), e.jsx("span", {
              className: "horizontal-course-ticket-new-tooltip",
              role: "tooltip",
              children: l("courses.ticket.newTooltip")
            })]
          })]
        })]
      }), e.jsxs("div", {
        className: "horizontal-course-ticket-v1-meta",
        children: [e.jsxs("div", {
          className: "horizontal-course-ticket-v1-meta-col",
          children: [e.jsx("span", {
            className: "horizontal-course-ticket-v1-label",
            children: l("courses.ticket.sourceLabel")
          }), e.jsx("span", {
            className: "horizontal-course-ticket-v1-meta-value",
            children: r.source
          })]
        }), e.jsxs("div", {
          className: "horizontal-course-ticket-v1-meta-col",
          children: [e.jsx("span", {
            className: "horizontal-course-ticket-v1-label",
            children: l("courses.ticket.dateAddedLabel")
          }), e.jsx("span", {
            className: "horizontal-course-ticket-v1-meta-value",
            children: r.dateAdded
          })]
        })]
      }), e.jsxs("div", {
        className: "horizontal-course-ticket-v1-progress",
        children: [e.jsx("div", {
          className: "horizontal-course-ticket-v1-progress-track",
          children: e.jsx("div", {
            className: "horizontal-course-ticket-v1-progress-fill",
            style: {
              width: `${n}%`
            }
          })
        }), e.jsx("span", {
          className: "horizontal-course-ticket-v1-progress-pct",
          children: l("courses.ticket.progressPercent", {
            value: n
          })
        })]
      })]
    })]
  });
};
const f = ({
  data: r,
  onShare: a,
  onMore: t,
  onDelete: c,
  isMenuOpen: o,
  isDeleting: i
}) => {
  const {
    t: l
  } = s();
  const n = r.dateAdded.split(", ");
  const u = n.length > 1 ? n.slice(0, -1).join(", ") : r.dateAdded;
  const d = n.length > 1 ? n[n.length - 1] : "";
  const h = Math.max(0, Math.min(100, Math.round(r.progress ?? 0)));
  return e.jsxs("div", {
    className: "horizontal-course-ticket-v2-content",
    children: [e.jsxs("div", {
      className: "horizontal-course-ticket-v2-cover",
      children: [e.jsx("img", {
        src: r.coverImage,
        alt: "",
        className: "horizontal-course-ticket-v2-cover-img"
      }), e.jsx(b, {
        classPrefix: "horizontal-course-ticket-v2",
        onShare: a,
        onMore: t,
        onDelete: c,
        isMenuOpen: o,
        isDeleting: i
      })]
    }), e.jsxs("div", {
      className: "horizontal-course-ticket-v2-info",
      children: [e.jsxs("div", {
        className: "horizontal-course-ticket-v2-course-block",
        children: [e.jsx("span", {
          className: "horizontal-course-ticket-v2-label",
          children: l("courses.ticket.courseNameLabel")
        }), e.jsxs("span", {
          className: "horizontal-course-ticket-v2-course-title-row",
          children: [e.jsx("span", {
            className: "horizontal-course-ticket-v2-course-name",
            children: r.courseName
          }), r.isNew && e.jsxs("span", {
            className: "horizontal-course-ticket-new-badge",
            "aria-label": "This course was added in the last 12 hours.",
            children: [l("courses.ticket.newBadge"), e.jsx("span", {
              className: "horizontal-course-ticket-new-tooltip",
              role: "tooltip",
              children: l("courses.ticket.newTooltip")
            })]
          })]
        })]
      }), e.jsxs("div", {
        className: "horizontal-course-ticket-v2-meta",
        children: [e.jsxs("div", {
          className: "horizontal-course-ticket-v2-meta-col",
          children: [e.jsx("span", {
            className: "horizontal-course-ticket-v2-label",
            children: l("courses.ticket.sourceLabel")
          }), e.jsx("span", {
            className: "horizontal-course-ticket-v2-meta-value",
            children: r.source
          })]
        }), e.jsxs("div", {
          className: "horizontal-course-ticket-v2-meta-col",
          children: [e.jsx("span", {
            className: "horizontal-course-ticket-v2-label",
            children: l("courses.ticket.dateAddedLabel")
          }), e.jsxs("span", {
            className: "horizontal-course-ticket-v2-meta-value horizontal-course-ticket-v2-date",
            children: [e.jsx("span", {
              className: "horizontal-course-ticket-v2-date-line",
              children: u
            }), d && e.jsx("span", {
              className: "horizontal-course-ticket-v2-date-line",
              children: d
            })]
          })]
        })]
      }), e.jsxs("div", {
        className: "horizontal-course-ticket-v2-progress",
        children: [e.jsx("div", {
          className: "horizontal-course-ticket-v2-progress-track",
          children: e.jsx("div", {
            className: "horizontal-course-ticket-v2-progress-fill",
            style: {
              width: `${h}%`
            }
          })
        }), e.jsx("span", {
          className: "horizontal-course-ticket-v2-progress-pct",
          children: l("courses.ticket.progressPercent", {
            value: h
          })
        })]
      })]
    })]
  });
};
const w = ({
  data: r
}) => {
  const {
    t: a
  } = s();
  if ((r.progress ?? 0) === 100) {
    return e.jsx("div", {
      className: "horizontal-course-ticket-v2-stub horizontal-course-ticket-v2-stub--completed",
      children: e.jsx("span", {
        className: "horizontal-course-ticket-v2-completed-stamp",
        children: a("courses.ticket.completedBadge")
      })
    });
  }
  const t = r.nextItem;
  if (!t) {
    return null;
  }
  const c = a(`courses.ticket.nextItemTypes.${t.type}`);
  return e.jsxs("div", {
    className: "horizontal-course-ticket-v2-stub",
    children: [e.jsx("span", {
      className: "horizontal-course-ticket-v2-label horizontal-course-ticket-v2-stub-uplabel",
      children: a("courses.ticket.upNextLabel")
    }), e.jsx("span", {
      className: "horizontal-course-ticket-v2-stub-type",
      children: c
    }), e.jsx("span", {
      className: "horizontal-course-ticket-v2-stub-title",
      children: t.title
    })]
  });
};
const z = ({
  data: r,
  onShare: a,
  onMore: t,
  onDelete: c,
  isMenuOpen: o,
  isDeleting: i
}) => {
  const {
    t: l
  } = s();
  const n = Math.max(0, Math.min(100, Math.round(r.progress ?? 0)));
  const u = r.dateAdded.split(", ");
  const d = u.length > 1 ? u.slice(0, -1).join(", ") : r.dateAdded;
  const h = u.length > 1 ? u[u.length - 1] : "";
  return e.jsxs("div", {
    className: "horizontal-course-ticket-v3-content",
    children: [e.jsxs("div", {
      className: "horizontal-course-ticket-v3-left",
      children: [e.jsxs("div", {
        className: "horizontal-course-ticket-v3-course-block",
        children: [e.jsx("span", {
          className: "horizontal-course-ticket-v3-label",
          children: l("courses.ticket.courseNameLabel")
        }), e.jsxs("span", {
          className: "horizontal-course-ticket-v3-course-title-row",
          children: [e.jsx("span", {
            className: "horizontal-course-ticket-v3-course-name",
            children: r.courseName
          }), r.isNew && e.jsxs("span", {
            className: "horizontal-course-ticket-new-badge",
            "aria-label": "This course was added in the last 12 hours.",
            children: [l("courses.ticket.newBadge"), e.jsx("span", {
              className: "horizontal-course-ticket-new-tooltip",
              role: "tooltip",
              children: l("courses.ticket.newTooltip")
            })]
          })]
        })]
      }), e.jsxs("div", {
        className: "horizontal-course-ticket-v3-meta",
        children: [e.jsxs("div", {
          className: "horizontal-course-ticket-v3-meta-col",
          children: [e.jsx("span", {
            className: "horizontal-course-ticket-v3-label",
            children: l("courses.ticket.sourceLabel")
          }), e.jsx("span", {
            className: "horizontal-course-ticket-v3-meta-value",
            children: r.source
          })]
        }), e.jsxs("div", {
          className: "horizontal-course-ticket-v3-meta-col",
          children: [e.jsx("span", {
            className: "horizontal-course-ticket-v3-label",
            children: l("courses.ticket.dateAddedLabel")
          }), e.jsxs("span", {
            className: "horizontal-course-ticket-v3-meta-value horizontal-course-ticket-v3-date",
            children: [e.jsx("span", {
              className: "horizontal-course-ticket-v3-date-line",
              children: d
            }), h && e.jsx("span", {
              className: "horizontal-course-ticket-v3-date-line",
              children: h
            })]
          })]
        })]
      })]
    }), e.jsxs("div", {
      className: "horizontal-course-ticket-v3-cover",
      children: [e.jsx("img", {
        src: r.coverImage,
        alt: "",
        className: "horizontal-course-ticket-v3-cover-img"
      }), e.jsx(b, {
        classPrefix: "horizontal-course-ticket-v3",
        onShare: a,
        onMore: t,
        onDelete: c,
        isMenuOpen: o,
        isDeleting: i
      })]
    }), e.jsxs("div", {
      className: "horizontal-course-ticket-v3-progress",
      children: [e.jsx("div", {
        className: "horizontal-course-ticket-v3-progress-track",
        children: e.jsx("div", {
          className: "horizontal-course-ticket-v3-progress-fill",
          style: {
            width: `${n}%`
          }
        })
      }), e.jsx("span", {
        className: "horizontal-course-ticket-v3-progress-pct",
        children: l("courses.ticket.progressPercent", {
          value: n
        })
      })]
    })]
  });
};
const C = Math.round(267200 / 474);
const D = 800 - C;
const M = 800 / 337;
const S = Math.round(M * 83);
const L = 800 - S;
const T = ({
  variant: s = 1,
  coverImage: a,
  v1Data: t,
  v2Data: c,
  v3Data: o,
  ticketFill: i = "#FFFFFF",
  dashedSeam: l = false,
  children: n,
  stubContent: u,
  className: d = "",
  onShare: h,
  onMore: m,
  onDelete: x,
  isMenuOpen: p,
  isDeleting: v
}) => {
  const k = `horizontal-course-ticket-mask-${r.useId().replace(/:/g, "")}`;
  const j = s === 1;
  const g = s === 2;
  const N = s === 3;
  const b = !l;
  const M = g;
  const T = g || N;
  const I = j || g || N;
  const A = 800;
  const U = I ? 224 : 218;
  const $ = I ? C : L;
  const F = I ? D : S;
  const E = function (e) {
    const s = e <= 180 ? 10 : 12;
    const r = Math.round(e * 0.12);
    const a = Math.round(e * 0.76 / (s - 1));
    return Array.from({
      length: s
    }, (e, s) => r + s * a);
  }(U);
  const P = g ? 4 : 5;
  const O = Math.round(U * 0.12);
  const B = Math.round(U * 0.76 / 7);
  const R = Array.from({
    length: 8
  }, (e, s) => O + s * B);
  const W = j ? t : g ? c : N ? o : undefined;
  return e.jsxs("div", {
    className: `horizontal-course-ticket horizontal-course-ticket--v${s} ${d}`.trim(),
    children: [e.jsxs("svg", {
      className: "horizontal-course-ticket-mask-svg",
      viewBox: `0 0 800 ${U}`,
      preserveAspectRatio: I ? "none" : "xMidYMid meet",
      xmlns: "http://www.w3.org/2000/svg",
      "aria-hidden": "true",
      children: [e.jsxs("defs", {
        children: [e.jsxs("filter", {
          id: `${k}-hole-shadow`,
          x: "-50%",
          y: "-50%",
          width: "200%",
          height: "200%",
          children: [e.jsx("feOffset", {
            dx: "0",
            dy: "2"
          }), e.jsx("feGaussianBlur", {
            stdDeviation: "1.5",
            result: "offset-blur"
          }), e.jsx("feComposite", {
            operator: "out",
            in: "SourceGraphic",
            in2: "offset-blur",
            result: "inverse"
          }), e.jsx("feFlood", {
            floodColor: "#000000",
            floodOpacity: "0.035",
            result: "shadow-color"
          }), e.jsx("feComposite", {
            operator: "in",
            in: "shadow-color",
            in2: "inverse",
            result: "shadow"
          }), e.jsx("feComposite", {
            operator: "over",
            in: "shadow",
            in2: "SourceGraphic"
          })]
        }), e.jsxs("mask", {
          id: k,
          maskUnits: "userSpaceOnUse",
          children: [e.jsx("rect", {
            width: A,
            height: U,
            fill: "black"
          }), e.jsx("rect", {
            x: "0",
            y: "0",
            width: $,
            height: U,
            rx: T ? 0 : 14,
            fill: "white"
          }), e.jsx("rect", {
            x: $,
            y: "0",
            width: F,
            height: U,
            rx: T ? 0 : 14,
            fill: "white"
          }), b && E.map(s => e.jsx("circle", {
            cx: $,
            cy: s,
            r: P,
            fill: "black"
          }, `seam-mask-${s}`)), M ? e.jsxs(e.Fragment, {
            children: [e.jsx("circle", {
              cx: $,
              cy: "0",
              r: "10",
              fill: "black"
            }), e.jsx("circle", {
              cx: $,
              cy: U,
              r: "10",
              fill: "black"
            }), R.map(s => e.jsx("circle", {
              cx: "0",
              cy: s,
              r: "9",
              fill: "black"
            }, `left-mask-${s}`)), R.map(s => e.jsx("circle", {
              cx: A,
              cy: s,
              r: "9",
              fill: "black"
            }, `right-mask-${s}`))]
          }) : N ? e.jsxs(e.Fragment, {
            children: [e.jsx("circle", {
              cx: $,
              cy: "0",
              r: "10",
              fill: "black"
            }), e.jsx("circle", {
              cx: $,
              cy: U,
              r: "10",
              fill: "black"
            }), e.jsx("circle", {
              cx: "0",
              cy: "0",
              r: "13",
              fill: "black"
            }), e.jsx("circle", {
              cx: A,
              cy: "0",
              r: "13",
              fill: "black"
            }), e.jsx("circle", {
              cx: "0",
              cy: U,
              r: "13",
              fill: "black"
            }), e.jsx("circle", {
              cx: A,
              cy: U,
              r: "13",
              fill: "black"
            })]
          }) : e.jsx("circle", {
            cx: A,
            cy: U / 2,
            r: "10",
            fill: "black"
          })]
        })]
      }), e.jsx("rect", {
        width: A,
        height: U,
        fill: i,
        mask: `url(#${k})`
      }), b ? g ? null : e.jsx("g", {
        filter: `url(#${k}-hole-shadow)`,
        "aria-hidden": "true",
        children: E.map(s => e.jsx("circle", {
          cx: $,
          cy: s,
          r: P,
          fill: "#FAFAFA"
        }, `seam-shadow-${s}`))
      }) : e.jsx("line", {
        x1: $,
        y1: "16",
        x2: $,
        y2: U - 16,
        stroke: "#E2E2E2",
        strokeWidth: "1",
        strokeLinecap: "round",
        strokeDasharray: "10 8",
        "aria-hidden": "true"
      })]
    }), !I && a && e.jsx("img", {
      src: a,
      alt: "",
      className: "horizontal-course-ticket-cover",
      "aria-hidden": "true"
    }), e.jsxs("div", {
      className: "horizontal-course-ticket-body",
      children: [e.jsx("div", {
        className: "horizontal-course-ticket-main",
        children: j && t ? e.jsx(y, {
          data: t,
          onShare: h,
          onMore: m,
          onDelete: x,
          isMenuOpen: p,
          isDeleting: v
        }) : g && c ? e.jsx(f, {
          data: c,
          onShare: h,
          onMore: m,
          onDelete: x,
          isMenuOpen: p,
          isDeleting: v
        }) : N && o ? e.jsx(z, {
          data: o,
          onShare: h,
          onMore: m,
          onDelete: x,
          isMenuOpen: p,
          isDeleting: v
        }) : n
      }), e.jsx("div", {
        className: "horizontal-course-ticket-stub",
        children: W ? e.jsx(w, {
          data: W
        }) : u
      })]
    })]
  });
};
const I = new URL("/assets/png/placeholder-1-DtNbvng5.png", import.meta.url).href;
const A = new URL("/assets/png/placeholder-2-O2FI3lGf.png", import.meta.url).href;
const U = new URL("/assets/png/placeholder-3-CpPE_XTc.png", import.meta.url).href;
const $ = [I, A, U];
const F = "/hyperknow_logo.svg";
const E = ["this", "last"];
const P = {
  weeklySessions: 0,
  estimatedTokens: 0,
  dailySessions: [0, 0, 0, 0, 0, 0, 0],
  lastActivityByCourse: {}
};
const O = e => {
  let s = 0;
  for (let r = 0; r < e.length; r += 1) {
    s = s * 17 + e.charCodeAt(r) * 7 >>> 0;
  }
  return ((43 + s % 8) / 10).toFixed(1);
};
const B = e => {
  const s = new Date(e);
  if (Number.isNaN(s.getTime())) {
    return o.t("courses.ticket.recentFallback");
  } else {
    return s.toLocaleDateString(x(), {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  }
};
const R = (e, s = new Date()) => {
  if (!e) {
    return false;
  }
  const r = new Date(e);
  if (Number.isNaN(r.getTime())) {
    return false;
  }
  const a = s.getTime() - r.getTime();
  return a >= 0 && a <= 43200000;
};
const W = (e, s, r) => {
  const a = (e => e === "canvas" ? o.t("courses.ticket.sourceValues.canvas", {
    brand: "Canvas"
  }) : e === "hyperknow" ? o.t("courses.ticket.sourceValues.hyperknow", {
    brand: "Hyperknow"
  }) : o.t("courses.ticket.sourceValues.aiGenerated"))(e.source);
  const t = {
    courseName: e.courseTitle,
    source: a,
    dateAdded: B(e.updatedAt),
    coverImage: r,
    progress: e.progress ?? 0,
    nextItem: e.nextItem ?? undefined,
    isNew: R(e.createdAt)
  };
  if (s === 1) {
    return {
      v1Data: t
    };
  } else if (s === 2) {
    return {
      v2Data: t
    };
  } else {
    return {
      v3Data: t
    };
  }
};
const G = () => {
  var N;
  const b = a();
  const {
    t: y
  } = s();
  const [f, w] = r.useState("all");
  const [z, C] = r.useState("");
  const [D, M] = r.useState([]);
  const [S, L] = r.useState(true);
  const [I, A] = r.useState(null);
  const [U, B] = r.useState({});
  const [R, G] = r.useState({
    this: true,
    last: true
  });
  const [V, H] = r.useState("this");
  const [_, J] = r.useState(null);
  const [K, X] = r.useState(null);
  const [Y, q] = r.useState(null);
  const [Q, Z] = r.useState(false);
  const [ee, se] = r.useState(false);
  const [re, ae] = r.useState(false);
  const [te] = r.useState(0);
  const [ce, oe] = r.useState([]);
  const ie = e => {
    if (e.enrolled && e.enrolledCourseUuid) {
      b(`/course/${e.enrolledCourseUuid}`, {
        state: {
          fromCourseList: true
        }
      });
    } else {
      b(`/marketplace/${encodeURIComponent(e.marketplaceId)}/preview`);
    }
  };
  r.useEffect(() => {
    if (!t()) {
      b("/signin", {
        replace: true
      });
    }
  }, [b]);
  r.useEffect(() => {
    let e = false;
    L(true);
    A(null);
    v().then(s => {
      if (!e) {
        M(s);
      }
    }).catch(s => {
      if (!e) {
        A(s instanceof Error ? s.message : y("courses.errors.loadFailed"));
      }
    }).finally(() => {
      if (!e) {
        L(false);
      }
    });
    return () => {
      e = true;
    };
  }, []);
  r.useEffect(() => {
    let e = false;
    E.forEach(s => {
      G(e => ({
        ...e,
        [s]: true
      }));
      k(s).then(r => {
        if (!e) {
          B(e => ({
            ...e,
            [s]: r
          }));
        }
      }).catch(e => {}).finally(() => {
        if (!e) {
          G(e => ({
            ...e,
            [s]: false
          }));
        }
      });
    });
    return () => {
      e = true;
    };
  }, []);
  r.useEffect(() => {
    c().then(e => {
      if (e.success) {
        oe(((e, s) => {
          const r = e => {
            const s = [...e];
            for (let r = s.length - 1; r > 0; r -= 1) {
              const e = Math.floor(Math.random() * (r + 1));
              [s[r], s[e]] = [s[e], s[r]];
            }
            return s;
          };
          const a = r(e.filter(e => !e.enrolled));
          if (a.length >= s) {
            return a.slice(0, s);
          } else {
            return [...a, ...r(e.filter(e => e.enrolled))].slice(0, s);
          }
        })(e.courses, 3));
      }
    });
  }, []);
  r.useEffect(() => {
    if (!_) {
      return;
    }
    const e = () => J(null);
    const s = s => {
      if (s.key === "Escape") {
        e();
      }
    };
    document.addEventListener("click", e);
    document.addEventListener("keydown", s);
    return () => {
      document.removeEventListener("click", e);
      document.removeEventListener("keydown", s);
    };
  }, [_]);
  const le = D;
  const ne = U[V];
  const ue = ne ?? P;
  const de = !ne && R[V] === true;
  const he = r.useMemo(() => {
    const e = z.trim().toLowerCase();
    return le.filter(s => {
      const r = s.progress ?? 0;
      const a = r === 100;
      if (f === "completed" && !a) {
        return false;
      }
      if (f === "inProgress" && (r <= 0 || a)) {
        return false;
      }
      if (f !== "completed" && a) {
        return false;
      }
      if (e) {
        if (!`${s.courseTitle} ${s.courseDescription} ${s.targetLearner}`.toLowerCase().includes(e)) {
          return false;
        }
      }
      return true;
    });
  }, [f, le, z]);
  const me = r.useMemo(() => {
    const e = e => {
      const s = ue.lastActivityByCourse[e.courseUuid];
      const r = s ? new Date(s).getTime() : 0;
      if (Number.isNaN(r)) {
        return 0;
      } else {
        return r;
      }
    };
    const s = e => {
      const s = new Date(e.updatedAt).getTime();
      if (Number.isNaN(s)) {
        return 0;
      } else {
        return s;
      }
    };
    const r = [...D].sort((s, r) => e(r) - e(s));
    const a = [...D].sort((e, r) => s(r) - s(e));
    return r.find(s => e(s) > 0 && (s.progress ?? 0) < 100 && s.nextItem) ?? a.find(e => (e.progress ?? 0) > 0 && (e.progress ?? 0) < 100 && e.nextItem) ?? a.find(e => (e.progress ?? 0) < 100) ?? null;
  }, [D, ue.lastActivityByCourse]);
  const xe = (me == null ? undefined : me.nextItem) ? y(`courses.motivation.nextTypes.${me.nextItem.type}`, {
    title: me.nextItem.title
  }) : y("courses.motivation.nextFallback");
  const pe = V === "last" ? 6 : (e => {
    const s = e.getDay();
    if (s === 0) {
      return 6;
    } else {
      return s - 1;
    }
  })(new Date());
  const ve = r.useMemo(() => (() => {
    const e = new Intl.DateTimeFormat(x(), {
      weekday: "narrow"
    });
    const s = new Date(Date.UTC(2024, 0, 1));
    return Array.from({
      length: 7
    }, (r, a) => {
      const t = new Date(s);
      t.setUTCDate(s.getUTCDate() + a);
      return e.format(t);
    });
  })(), [o.language]);
  const ke = e => {
    J(null);
    b(`/course/${e}`, {
      state: {
        fromCourseList: true
      }
    });
  };
  return e.jsxs(e.Fragment, {
    children: [e.jsxs("div", {
      className: "courses-page",
      children: [e.jsxs("div", {
        className: "avatar-container",
        children: [t() && e.jsx(i, {}), e.jsx(l, {}), t() && e.jsxs("button", {
          className: "invite-earn-button",
          onClick: () => ae(true),
          children: [e.jsx("img", {
            src: "/accountDropdown/gift.svg",
            alt: "",
            className: "invite-earn-icon"
          }), e.jsx("span", {
            children: y("home.inviteAndEarn")
          })]
        }), e.jsx(n, {
          isLoggedIn: t(),
          onSignOut: () => {
            p();
            b("/signin");
          },
          onSubscriptionClick: () => b("/subscription"),
          onSettingsClick: () => se(true),
          onInviteEarnClick: () => ae(true),
          onSignInClick: () => b("/signin"),
          referralsCount: te
        })]
      }), e.jsx("div", {
        className: "courses-inner",
        children: e.jsxs("div", {
          className: "courses-layout",
          children: [e.jsxs("section", {
            className: "courses-main",
            children: [e.jsx("h1", {
              className: "courses-title",
              children: y("courses.title")
            }), e.jsxs("div", {
              className: "courses-toolbar",
              children: [e.jsxs("div", {
                className: "courses-tabs",
                role: "tablist",
                "aria-label": y("courses.tabListLabel"),
                children: [e.jsx("button", {
                  type: "button",
                  className: "courses-tab " + (f === "all" ? "active" : ""),
                  role: "tab",
                  "aria-selected": f === "all",
                  onClick: () => w("all"),
                  children: y("courses.tabs.all")
                }), e.jsx("button", {
                  type: "button",
                  className: "courses-tab " + (f === "inProgress" ? "active" : ""),
                  role: "tab",
                  "aria-selected": f === "inProgress",
                  onClick: () => w("inProgress"),
                  children: y("courses.tabs.inProgress")
                }), e.jsx("button", {
                  type: "button",
                  className: "courses-tab " + (f === "completed" ? "active" : ""),
                  role: "tab",
                  "aria-selected": f === "completed",
                  onClick: () => w("completed"),
                  children: y("courses.tabs.completed")
                })]
              }), e.jsx("div", {
                className: "courses-toolbar-right",
                children: e.jsxs("div", {
                  className: "courses-search-wrap",
                  children: [e.jsxs("svg", {
                    className: "courses-search-icon",
                    width: "14",
                    height: "14",
                    viewBox: "0 0 16 16",
                    fill: "none",
                    "aria-hidden": "true",
                    children: [e.jsx("circle", {
                      cx: "7",
                      cy: "7",
                      r: "5.5",
                      stroke: "#9CA3AF",
                      strokeWidth: "1.5"
                    }), e.jsx("path", {
                      d: "M11 11L14.5 14.5",
                      stroke: "#9CA3AF",
                      strokeWidth: "1.5",
                      strokeLinecap: "round"
                    })]
                  }), e.jsx("input", {
                    className: "courses-search",
                    type: "text",
                    placeholder: y("courses.searchPlaceholder"),
                    value: z,
                    onChange: e => C(e.target.value)
                  }), z && e.jsx("button", {
                    type: "button",
                    className: "courses-search-clear",
                    onClick: () => C(""),
                    "aria-label": y("courses.clearSearch"),
                    children: e.jsx("svg", {
                      width: "11",
                      height: "11",
                      viewBox: "0 0 12 12",
                      fill: "none",
                      "aria-hidden": "true",
                      children: e.jsx("path", {
                        d: "M2 2L10 10M10 2L2 10",
                        stroke: "#9CA3AF",
                        strokeWidth: "1.5",
                        strokeLinecap: "round"
                      })
                    })
                  })]
                })
              })]
            }), e.jsx("div", {
              className: "courses-list-scroll",
              children: S ? e.jsxs("div", {
                className: "courses-loading-video-wrap",
                children: [e.jsx("video", {
                  className: "courses-loading-video",
                  src: "/pages/mainPages/courses/climb-stairs.mp4",
                  poster: "/pages/mainPages/courses/climb-stairs.webp",
                  autoPlay: true,
                  loop: true,
                  muted: true,
                  playsInline: true
                }), e.jsx("p", {
                  className: "courses-loading-text",
                  children: y("courses.loadingCourses")
                })]
              }) : I ? e.jsx("div", {
                className: "courses-state courses-state--error",
                children: I
              }) : he.length === 0 ? e.jsx("div", {
                className: "courses-empty",
                children: z ? e.jsxs(e.Fragment, {
                  children: [e.jsx("img", {
                    src: "/pages/coursePage/CourseJourney/no-search-result.png",
                    alt: "",
                    "aria-hidden": "true",
                    className: "courses-empty-illustration"
                  }), e.jsx("p", {
                    className: "courses-empty-title",
                    children: y("courses.emptySearchTitle")
                  }), e.jsx("p", {
                    className: "courses-empty-text",
                    children: y("courses.emptySearchText")
                  })]
                }) : e.jsxs(e.Fragment, {
                  children: [e.jsx("img", {
                    src: "/pages/coursePage/CourseJourney/no-courses-yet.png",
                    alt: "",
                    "aria-hidden": "true",
                    className: "courses-empty-illustration"
                  }), e.jsx("p", {
                    className: "courses-empty-title",
                    children: y("courses.emptyShelfTitle")
                  }), e.jsx("p", {
                    className: "courses-empty-text",
                    children: y("courses.emptyShelfText")
                  })]
                })
              }) : e.jsx("div", {
                className: "courses-list",
                children: he.map((s, r) => {
                  const a = s.ticketVariant ?? (e => e % 3 + 1)(r);
                  const t = a === 1 ? s.wideCoverImageUrl ?? s.coverImageUrl : s.coverImageUrl;
                  const c = t ? u(t) : $[r % $.length];
                  const o = W(s, a, c);
                  return e.jsx("div", {
                    className: "courses-ticket-button",
                    role: "button",
                    tabIndex: 0,
                    onClick: () => ke(s.courseUuid),
                    onKeyDown: e => ((e, s) => {
                      if (e.target === e.currentTarget) {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          ke(s);
                        }
                      }
                    })(e, s.courseUuid),
                    children: e.jsx(T, {
                      variant: a,
                      coverImage: c,
                      v1Data: o.v1Data,
                      v2Data: o.v2Data,
                      v3Data: o.v3Data,
                      dashedSeam: a !== 2,
                      onShare: () => {
                        J(null);
                        X({
                          course: s,
                          coverImage: c
                        });
                      },
                      onMore: () => {
                        J(e => e === s.courseUuid ? null : s.courseUuid);
                      },
                      onDelete: () => {
                        J(null);
                        q(s);
                      },
                      isMenuOpen: _ === s.courseUuid,
                      isDeleting: Q && (Y == null ? undefined : Y.courseUuid) === s.courseUuid
                    })
                  }, s.courseUuid);
                })
              })
            })]
          }), e.jsx("aside", {
            className: "courses-aside",
            "aria-label": y("courses.sidebarLabel"),
            children: S ? e.jsxs(e.Fragment, {
              children: [e.jsx("div", {
                className: "courses-side-card",
                children: e.jsxs("div", {
                  className: "courses-sk-aside-card",
                  children: [e.jsx("div", {
                    className: "courses-sk-bar courses-sk-bar--title"
                  }), e.jsx("div", {
                    className: "courses-sk-bar courses-sk-bar--sub"
                  }), e.jsx("div", {
                    className: "courses-sk-week-row",
                    children: Array.from({
                      length: 7
                    }, (s, r) => e.jsx("div", {
                      className: "courses-sk-day-block"
                    }, r))
                  }), e.jsx("div", {
                    className: "courses-sk-heatmap-block"
                  })]
                })
              }), e.jsx("div", {
                className: "courses-side-card",
                children: e.jsxs("div", {
                  className: "courses-sk-aside-card",
                  children: [e.jsx("div", {
                    className: "courses-sk-bar courses-sk-bar--title"
                  }), e.jsx("div", {
                    className: "courses-sk-bar courses-sk-bar--sub"
                  }), e.jsx("div", {
                    className: "courses-sk-recs-list",
                    children: Array.from({
                      length: 3
                    }, (s, r) => e.jsxs("div", {
                      className: "courses-sk-recs-item",
                      children: [e.jsx("div", {
                        className: "courses-sk-recs-thumb"
                      }), e.jsxs("div", {
                        className: "courses-sk-recs-text",
                        children: [e.jsx("div", {
                          className: "courses-sk-bar courses-sk-bar--wide"
                        }), e.jsx("div", {
                          className: "courses-sk-bar courses-sk-bar--mid"
                        }), e.jsx("div", {
                          className: "courses-sk-bar courses-sk-bar--short"
                        })]
                      })]
                    }, r))
                  })]
                })
              })]
            }) : e.jsxs(e.Fragment, {
              children: [e.jsxs("section", {
                className: "courses-side-card courses-learning-card",
                "aria-label": y("courses.motivation.ariaLabel"),
                children: [e.jsxs("div", {
                  className: "courses-weekly-units",
                  children: [e.jsxs("div", {
                    className: "courses-learning-header",
                    children: [e.jsxs("div", {
                      children: [e.jsx("p", {
                        className: "courses-learning-eyebrow",
                        children: y(`courses.motivation.weekLabels.${V}`)
                      }), e.jsx("h2", {
                        className: "courses-learning-title",
                        children: de ? e.jsx("span", {
                          className: "courses-learning-skeleton courses-learning-skeleton--title"
                        }) : y("courses.motivation.sessionsCount", {
                          count: ue.weeklySessions
                        })
                      }), e.jsx("p", {
                        className: "courses-token-line",
                        children: de ? e.jsx("span", {
                          className: "courses-learning-skeleton courses-learning-skeleton--token"
                        }) : ue.estimatedTokens >= 17000 ? y("courses.motivation.tokenBookComparison", {
                          multiple: (je = ue.estimatedTokens, Math.max(1, Math.floor(je / 17000)))
                        }) : y("courses.motivation.tokenBookEmpty")
                      })]
                    }), e.jsxs("div", {
                      className: "courses-week-toggle",
                      "aria-label": y("courses.motivation.weekToggleLabel"),
                      children: [e.jsx("button", {
                        type: "button",
                        className: "courses-week-toggle-button",
                        "aria-label": y("courses.motivation.weekToggle.previous"),
                        disabled: V === "last",
                        onClick: () => H("last"),
                        children: "‹"
                      }), e.jsx("button", {
                        type: "button",
                        className: "courses-week-toggle-button",
                        "aria-label": y("courses.motivation.weekToggle.next"),
                        disabled: V === "this",
                        onClick: () => H("this"),
                        children: "›"
                      })]
                    })]
                  }), e.jsx("div", {
                    className: "courses-week-days",
                    "aria-label": y("courses.motivation.weekDaysLabel"),
                    children: ve.map((s, r) => {
                      const a = ue.dailySessions[r] ?? 0;
                      const t = r > pe || V === "this" && r === pe && a === 0;
                      return e.jsxs("span", {
                        className: `courses-week-day ${a > 0 && !t ? "active" : ""} ${t ? "future" : ""}`,
                        children: [e.jsx("span", {
                          className: "courses-week-day-label",
                          children: s
                        }), de ? e.jsx("span", {
                          className: "courses-learning-skeleton courses-learning-skeleton--day"
                        }) : t ? e.jsx("span", {
                          className: "courses-week-day-tag courses-week-day-tag--dim",
                          children: "–"
                        }) : e.jsx("span", {
                          className: "courses-week-day-num",
                          children: a
                        })]
                      }, `${s}-${r}`);
                    })
                  })]
                }), e.jsx("p", {
                  className: "courses-learning-eyebrow",
                  children: y("courses.motivation.pickupEyebrow")
                }), e.jsxs("button", {
                  type: "button",
                  className: "courses-pickup-card",
                  onClick: () => {
                    if (me) {
                      ke(me.courseUuid);
                    } else {
                      b("/");
                    }
                  },
                  children: [e.jsx("span", {
                    className: "courses-pickup-title",
                    children: (me == null ? undefined : me.courseTitle) ?? y("courses.motivation.pickupEmptyTitle")
                  }), e.jsx("span", {
                    className: "courses-pickup-meta",
                    children: me ? xe : y("courses.motivation.pickupEmptyMeta")
                  })]
                })]
              }), e.jsxs("section", {
                className: "courses-side-card courses-recs",
                "aria-label": "Recommended courses",
                children: [e.jsxs("div", {
                  className: "courses-recs-header",
                  children: [e.jsx("h2", {
                    className: "courses-recs-title",
                    children: y("courses.marketplaceCard.title")
                  }), e.jsxs("button", {
                    type: "button",
                    className: "courses-recs-see-more",
                    onClick: () => b("/marketplace"),
                    children: [y("courses.marketplaceCard.seeMore"), e.jsx("svg", {
                      width: "14",
                      height: "14",
                      viewBox: "0 0 24 24",
                      fill: "none",
                      xmlns: "http://www.w3.org/2000/svg",
                      "aria-hidden": "true",
                      children: e.jsx("path", {
                        d: "M7 17L17 7M17 7H8M17 7V16",
                        stroke: "currentColor",
                        strokeWidth: "2",
                        strokeLinecap: "round",
                        strokeLinejoin: "round"
                      })
                    })]
                  })]
                }), e.jsx("p", {
                  className: "courses-recs-subtitle",
                  children: y("home.marketplace.subtitle")
                }), e.jsx("ul", {
                  className: "courses-recs-list",
                  children: ce.map(s => e.jsxs("li", {
                    className: "courses-recs-item courses-recs-item--clickable",
                    role: "button",
                    tabIndex: 0,
                    onClick: () => ie(s),
                    onKeyDown: e => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        ie(s);
                      }
                    },
                    children: [e.jsx("div", {
                      className: "courses-recs-thumb",
                      children: s.coverImageUrl ? e.jsx("img", {
                        src: u(s.coverImageUrl),
                        alt: "",
                        "aria-hidden": "true"
                      }) : e.jsx("img", {
                        src: F,
                        alt: "",
                        "aria-hidden": "true",
                        style: {
                          padding: "12px",
                          opacity: 0.4
                        }
                      })
                    }), e.jsxs("div", {
                      className: "courses-recs-item-text",
                      children: [e.jsx("span", {
                        className: "courses-recs-item-title",
                        children: s.courseTitle
                      }), e.jsxs("span", {
                        className: "courses-recs-item-author",
                        children: [e.jsx("img", {
                          src: F,
                          alt: "",
                          "aria-hidden": "true",
                          className: "courses-recs-author-logo"
                        }), y("courses.marketplaceCard.hyperknowOfficial", {
                          brand: "Hyperknow"
                        })]
                      }), e.jsxs("div", {
                        className: "courses-recs-item-meta",
                        children: [e.jsxs("span", {
                          className: "courses-recs-rating",
                          children: [e.jsx("img", {
                            src: "/pages/mainPages/home/craft-courses-tab/star.svg",
                            alt: "",
                            "aria-hidden": "true",
                            className: "courses-recs-rating-icon"
                          }), e.jsx("span", {
                            children: O(s.marketplaceId)
                          })]
                        }), s.enrolled ? e.jsx("span", {
                          className: "courses-recs-enrolled-badge",
                          children: y("courses.marketplaceCard.joinedBadge")
                        }) : e.jsx("span", {
                          className: "courses-recs-enroll-cta",
                          children: y("marketplacePage.previewCta")
                        })]
                      })]
                    })]
                  }, s.marketplaceId))
                })]
              })]
            })
          })]
        })
      })]
    }), e.jsx(d, {
      isOpen: ee,
      onClose: () => se(false)
    }), e.jsx(h, {
      isOpen: re,
      onClose: () => ae(false)
    }), K && e.jsx(g, {
      isOpen: !!K,
      onClose: () => X(null),
      course: {
        id: K.course.courseUuid,
        title: K.course.courseTitle,
        description: K.course.courseDescription,
        coverImage: K.coverImage,
        status: "enrolled"
      },
      lessonCount: K.course.sessionCount,
      subject: ((N = K.course.tags) == null ? undefined : N[0]) ?? K.course.targetLearner
    }), e.jsx(m, {
      isOpen: !!Y,
      onClose: () => {
        if (!Q) {
          q(null);
        }
      },
      onConfirm: async () => {
        if (Y && !Q) {
          Z(true);
          try {
            await j(Y.courseUuid);
            M(e => e.filter(e => e.courseUuid !== Y.courseUuid));
            if ((K == null ? undefined : K.course.courseUuid) === Y.courseUuid) {
              X(null);
            }
            q(null);
          } catch (e) {
            alert(e instanceof Error ? e.message : y("courses.errors.deleteFailed"));
          } finally {
            Z(false);
          }
        }
      },
      isDeleting: Q,
      title: y("courses.deleteCourseTitle"),
      message: e.jsxs(e.Fragment, {
        children: ["Are you sure you want to delete ", e.jsx("strong", {
          children: Y == null ? undefined : Y.courseTitle
        }), "? This cannot be undone."]
      })
    })]
  });
  var je;
};
export { G as default };