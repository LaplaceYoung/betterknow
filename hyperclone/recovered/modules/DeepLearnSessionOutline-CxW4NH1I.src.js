import { g as e, c as s, u as i, k as n, b as t, l as a, r as l, i as r, j as o, I as c } from "./index-TjoB2Buo.js";
import { g as d } from "./getMainTaskData-D-oXzdCH.js";
import { g as u, d as p } from "./getOtherFunctionUsageLimits-BqWLa23Q.js";
const m = () => {
  const m = i();
  const g = n();
  const {
    t: h
  } = t();
  const {
    subtaskId: v
  } = a();
  const [j, _] = l.useState(true);
  const [x, f] = l.useState(null);
  const [N, k] = l.useState(null);
  const [b, y] = l.useState([]);
  const [L, S] = l.useState("");
  const [O, P] = l.useState(false);
  const [w, A] = l.useState(false);
  const [T, $] = l.useState("");
  const F = l.useRef(null);
  l.useEffect(() => {
    if (r()) {
      if (v) {
        C();
        return;
      } else {
        f(h("deepLearnSessionPage.outline.subtaskIdRequired"));
        _(false);
        return;
      }
    }
    m("/login");
  }, [v, m]);
  const C = async () => {
    var e;
    var s;
    if (v) {
      _(true);
      f(null);
      try {
        const i = ((e = g.state) == null ? undefined : e.taskId) || sessionStorage.getItem(`subtask_${v}_parent_task_id`);
        if (!i) {
          f(h("deepLearnSessionPage.outline.parentTaskNotFound"));
          _(false);
          return;
        }
        sessionStorage.setItem(`subtask_${v}_parent_task_id`, i);
        const n = await d(i);
        if (n.success) {
          const e = n.subtasks.find(e => e.subtask_id === v);
          if (!e) {
            f(h("deepLearnSessionPage.outline.subtaskNotFound"));
            _(false);
            return;
          }
          k(e);
          if ((s = e.payload) == null ? undefined : s.task_plan) {
            const s = e.payload.task_plan;
            let i = s;
            if (typeof s == "object" && !Array.isArray(s) && s.session_task_plan && Array.isArray(s.session_task_plan)) {
              i = s.session_task_plan;
            } else if (Array.isArray(s)) {
              i = s;
            }
            if (Array.isArray(i)) {
              const e = i.map((e, s) => {
                const i = (e.tasks || []).map((e, i) => ({
                  id: e.task_id || `task-${s}-${i}`,
                  title: e.task_title || "",
                  description: e.task_description || undefined
                }));
                return {
                  id: `unit-${s + 1}`,
                  title: e.unit_name || h("deepLearnSessionBlock.unitLabel", {
                    number: s + 1
                  }),
                  description: e.unit_description || undefined,
                  items: i
                };
              });
              y(e);
            }
          }
        } else {
          const e = "message" in n ? n.message : "error" in n ? n.error : h("deepLearnSessionPage.outline.loadSubtaskFailed");
          f(e);
        }
      } catch (i) {
        f(h("deepLearnSessionPage.outline.loadSubtaskFailed"));
      } finally {
        _(false);
      }
    }
  };
  if (j) {
    return o.jsx("div", {
      className: "outline-page",
      children: o.jsxs("div", {
        className: "outline-loading",
        children: [o.jsx("div", {
          className: "outline-spinner"
        }), o.jsx("p", {
          children: h("deepLearnOutline.loading")
        })]
      })
    });
  } else if (x && !N) {
    return o.jsx("div", {
      className: "outline-page",
      children: o.jsxs("div", {
        className: "outline-error",
        children: [o.jsx("p", {
          children: x
        }), o.jsx("button", {
          onClick: () => m("/learning-feed"),
          className: "outline-back-btn",
          children: h("deepLearnOutline.backToLearningFeed")
        })]
      })
    });
  } else {
    return o.jsxs("div", {
      className: "outline-page",
      children: [o.jsx("div", {
        className: "outline-main-content",
        children: o.jsxs("div", {
          className: "outline-container",
          children: [o.jsxs("div", {
            className: "outline-header",
            children: [o.jsx("h1", {
              className: "outline-title",
              children: (N == null ? undefined : N.title) || h("deepLearnOutline.sessionTitle")
            }), (N == null ? undefined : N.description) && o.jsx("p", {
              className: "outline-description",
              children: N.description
            })]
          }), N && (() => {
            var e;
            var s;
            const i = [...(((e = N.related_file_ids) == null ? undefined : e.primary_source_files) || []), ...(((s = N.related_file_ids) == null ? undefined : s.other_source_files) || [])];
            if (i.length > 0) {
              return o.jsxs("div", {
                className: "outline-files-container",
                children: [o.jsx("div", {
                  className: "outline-source-header",
                  children: h("deepLearnOutline.sourceFiles")
                }), o.jsx("div", {
                  className: "outline-files-list",
                  children: i.map((e, s) => {
                    const i = "file_id" in e ? e.file_id : `source-${s}`;
                    const n = "file_name" in e && e.file_name ? e.file_name : "note" in e && e.note ? e.note : h("deepLearnSessionPage.outline.fileFallback", {
                      index: s + 1
                    });
                    const t = (e => {
                      var s;
                      switch (((s = e.split(".").pop()) == null ? undefined : s.toLowerCase()) || "") {
                        case "pdf":
                          return "/pages/mainPages/drive/file_icons/pdf.svg";
                        case "txt":
                          return "/pages/mainPages/drive/file_icons/txt.svg";
                        case "png":
                        case "jpg":
                        case "jpeg":
                          return "/pages/mainPages/drive/file_icons/png.svg";
                        case "ppt":
                        case "pptx":
                          return "/pages/mainPages/drive/file_icons/ppt.svg";
                        case "html":
                          return "/pages/mainPages/drive/file_icons/html.svg";
                        case "mp4":
                          return "/pages/mainPages/drive/file_icons/mp4.svg";
                        default:
                          return "/pages/mainPages/drive/file_icons/folder_default.svg";
                      }
                    })(("file_name" in e && e.file_name ? e.file_name : n) || "");
                    return o.jsxs("div", {
                      className: "outline-file-card",
                      children: [o.jsx("img", {
                        src: t,
                        alt: "",
                        className: "outline-file-card-icon"
                      }), o.jsx("span", {
                        className: "outline-file-card-name",
                        title: n,
                        children: n
                      })]
                    }, i);
                  })
                })]
              });
            } else {
              return null;
            }
          })(), x && o.jsx("div", {
            className: "outline-error-message",
            children: x
          }), o.jsx("div", {
            className: "outline-comment-section",
            children: o.jsxs("div", {
              className: "session-input-bar " + (L.trim().length > 0 && L.split("\n").length > 1 ? "multiline" : ""),
              children: [o.jsx("textarea", {
                id: "adjust-comment",
                className: "session-input-field",
                placeholder: h("deepLearnOutline.adjustPlaceholder"),
                value: L,
                onChange: e => {
                  S(e.target.value);
                  const s = e.target;
                  s.style.height = "auto";
                  const i = s.scrollHeight;
                  const n = Math.min(i, 200);
                  s.style.height = `${n}px`;
                },
                rows: 1
              }), o.jsx("button", {
                className: "input-send-button " + (L.trim().length > 0 && !O ? "enabled" : "disabled"),
                onClick: async () => {
                  if (v && L.trim()) {
                    P(true);
                    f(null);
                    try {
                      const i = await (async (i, n) => {
                        try {
                          const t = e();
                          if (!t) {
                            return {
                              success: false,
                              message: "No access token found. Please log in again.",
                              error: "NO_TOKEN"
                            };
                          }
                          const a = s("/api/v1/deep_learn/update_plan");
                          const l = await fetch(a, {
                            method: "POST",
                            headers: {
                              accept: "application/json",
                              "Content-Type": "application/json",
                              Authorization: `Bearer ${t}`
                            },
                            body: JSON.stringify({
                              subtask_id: i,
                              comment: n || ""
                            })
                          });
                          if (!l.ok) {
                            const e = await l.json().catch(() => ({}));
                            return {
                              success: false,
                              message: e.message || e.detail || `HTTP error! status: ${l.status}`,
                              error: `HTTP_${l.status}`
                            };
                          }
                          const r = await l.json();
                          if (r.task_plan && Array.isArray(r.task_plan)) {
                            return {
                              success: true,
                              task_plan: r.task_plan
                            };
                          } else {
                            return {
                              success: false,
                              message: "Unexpected response format: task_plan not found or not an array",
                              error: "INVALID_RESPONSE"
                            };
                          }
                        } catch (x) {
                          return {
                            success: false,
                            message: x instanceof Error ? x.message : "Unknown error occurred",
                            error: "NETWORK_ERROR"
                          };
                        }
                      })(v, L);
                      if (i.success) {
                        if (i.task_plan && Array.isArray(i.task_plan)) {
                          const e = i.task_plan.map((e, s) => {
                            const i = (e.tasks || []).map((e, i) => ({
                              id: e.task_id || `task-${s}-${i}`,
                              title: e.task_title || "",
                              description: e.task_description || undefined
                            }));
                            return {
                              id: `unit-${s + 1}`,
                              title: e.unit_name || `Unit ${s + 1}`,
                              description: e.unit_description || undefined,
                              items: i
                            };
                          });
                          y(e);
                        }
                        S("");
                      } else {
                        f(i.message || h("deepLearnSessionPage.outline.adjustOutlineFailed"));
                      }
                    } catch (i) {
                      f(h("deepLearnSessionPage.outline.adjustOutlineFailed"));
                    } finally {
                      P(false);
                    }
                  }
                },
                disabled: O || !L.trim(),
                children: O ? o.jsx("span", {
                  className: "outline-btn-spinner"
                }) : o.jsx("svg", {
                  width: "16",
                  height: "16",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  xmlns: "http://www.w3.org/2000/svg",
                  children: o.jsx("path", {
                    d: "M12 19V5M5 12L12 5L19 12",
                    stroke: "currentColor",
                    strokeWidth: "2",
                    strokeLinecap: "round",
                    strokeLinejoin: "round"
                  })
                })
              })]
            })
          }), o.jsxs("div", {
            className: "outline-content",
            children: [b.length > 0 && o.jsx("div", {
              className: "outline-session-header",
              children: h("deepLearnOutline.sessionOutline")
            }), b.length === 0 ? o.jsx("div", {
              className: "outline-empty",
              children: o.jsx("p", {
                children: h("deepLearnOutline.noOutline")
              })
            }) : o.jsxs("div", {
              className: "outline-units-wrapper",
              children: [O && o.jsx("div", {
                className: "outline-regenerating-overlay",
                children: o.jsxs("div", {
                  className: "outline-regenerating-content",
                  children: [o.jsx("div", {
                    className: "outline-regenerating-spinner"
                  }), o.jsx("p", {
                    className: "outline-regenerating-text",
                    children: h("deepLearnOutline.regenerating")
                  })]
                })
              }), o.jsx("div", {
                className: "outline-units " + (O ? "outline-units-loading" : ""),
                children: b.map((e, s) => o.jsxs("div", {
                  className: "outline-unit",
                  children: [o.jsx("div", {
                    className: "unit-header",
                    children: o.jsxs("div", {
                      className: "unit-info",
                      children: [o.jsxs("span", {
                        className: "unit-label",
                        children: [h("deepLearnOutline.unit"), " ", s + 1]
                      }), o.jsx("h3", {
                        className: "unit-title",
                        children: o.jsx(c, {
                          content: e.title
                        })
                      }), e.description && o.jsx("p", {
                        className: "unit-description",
                        children: o.jsx(c, {
                          content: e.description
                        })
                      })]
                    })
                  }), o.jsx("div", {
                    className: "unit-items",
                    children: e.items.map(e => o.jsxs("div", {
                      className: "outline-item",
                      children: [o.jsx("span", {
                        className: "item-task-id",
                        children: e.id
                      }), o.jsxs("div", {
                        className: "item-content",
                        children: [o.jsx("div", {
                          className: "item-title",
                          children: o.jsx(c, {
                            content: e.title
                          })
                        }), e.description && o.jsx("p", {
                          className: "item-description",
                          children: o.jsx(c, {
                            content: e.description
                          })
                        })]
                      })]
                    }, e.id))
                  })]
                }, e.id))
              })]
            })]
          })]
        })
      }), o.jsx("div", {
        className: "outline-start-session-section",
        children: o.jsx("div", {
          className: "outline-start-session-container",
          children: o.jsx("button", {
            className: "outline-start-btn",
            onClick: () => {
              if (!v) {
                return;
              }
              const e = u();
              if (e && e.deep_learn_session.remaining <= 0) {
                s = h("deepLearnSessionPage.outline.quotaLimitReached", {
                  used: e.deep_learn_session.limit,
                  limit: e.deep_learn_session.limit
                });
                $(s);
                A(true);
                if (F.current) {
                  clearTimeout(F.current);
                }
                F.current = setTimeout(() => {
                  A(false);
                  F.current = null;
                }, 5000);
                return;
              }
              var s;
              p("deep_learn_session");
              m(`/deep-learn-session/subtask_id/${v}`);
            },
            disabled: b.length === 0,
            children: h("deepLearnOutline.startSession")
          })
        })
      }), o.jsx("div", {
        className: "outline-quota-toast " + (w ? "outline-quota-toast-visible" : ""),
        children: o.jsxs("div", {
          className: "outline-quota-toast-content",
          children: [o.jsx("div", {
            className: "outline-quota-toast-text",
            children: T
          }), o.jsx("button", {
            className: "outline-quota-toast-button",
            onClick: () => {
              A(false);
              if (F.current) {
                clearTimeout(F.current);
                F.current = null;
              }
              m("/subscription");
            },
            children: h("deepLearnOutline.upgrade")
          })]
        })
      })]
    });
  }
};
export { m as default };