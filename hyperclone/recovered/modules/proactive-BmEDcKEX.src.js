import { g as e, c as t, u as s, b as a, r as n, j as i, ar as r, D as o, K as l, z as d, aB as c, ag as u, a as p, m, G as h, a1 as g, i as k, aC as v, A as x, aD as j, aE as f, aF as w } from "./index-TjoB2Buo.js";
import { g as N } from "./getAllCalendarMainTasks-DafTUG3L.js";
import { g as _, d as y, b, a as D } from "./getOtherFunctionUsageLimits-BqWLa23Q.js";
import { g as C } from "./getMainTaskData-D-oXzdCH.js";
import { b as S } from "./courses-GqETwdXb.js";
import { C as L } from "./checkbox-DxW-3BRQ.js";
import { t as T } from "./subscriptionTier-CZS6bvlX.js";
import { A as M } from "./index-CMJxjNZ8.js";
import "./utils-Bmk8urhx.js";
import "./check-BBSENZCf.js";
import "./createLucideIcon-B4HcG4gb.js";
const E = async s => {
  try {
    const a = e();
    if (!a) {
      return {
        success: false,
        message: "No access token found. Please log in again.",
        error: "NO_TOKEN"
      };
    }
    const n = t("/api/v1/calendar/remove_task");
    Array.isArray(s);
    const i = {
      task_id: s
    };
    const r = await fetch(n, {
      method: "POST",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${a}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(i)
    });
    if (!r.ok) {
      const e = await r.json().catch(() => ({}));
      return {
        success: false,
        message: e.message || e.detail || `HTTP error! status: ${r.status}`,
        error: `HTTP_${r.status}`
      };
    }
    const o = await r.json();
    return {
      success: true,
      message: o.message || "Task deleted successfully",
      queued_task_ids: o.queued_task_ids || [],
      failed_task_ids: o.failed_task_ids || []
    };
  } catch (a) {
    return {
      success: false,
      message: a instanceof Error ? a.message : "Unknown error occurred",
      error: "NETWORK_ERROR"
    };
  }
};
const F = async (s, a = "approve") => {
  try {
    const n = e();
    if (!n) {
      return {
        success: false,
        message: "No access token found. Please log in again.",
        error: "NO_TOKEN"
      };
    }
    const i = t("/api/v1/calendar/approve_tasks");
    Array.isArray(s);
    const r = await fetch(i, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${n}`
      },
      body: JSON.stringify({
        task_id: s,
        action: a
      })
    });
    if (!r.ok) {
      const e = await r.json().catch(() => ({}));
      return {
        success: false,
        message: e.message || e.detail || `HTTP error! status: ${r.status}`,
        error: `HTTP_${r.status}`
      };
    }
    const o = await r.json();
    if (o.success) {
      return o;
    } else {
      return {
        success: false,
        message: "Unexpected response format",
        error: "INVALID_RESPONSE"
      };
    }
  } catch (n) {
    return {
      success: false,
      message: n instanceof Error ? n.message : "Unknown error occurred",
      error: "NETWORK_ERROR"
    };
  }
};
const P = async (s, a, n) => {
  try {
    const i = e();
    if (!i) {
      return {
        success: false,
        message: "No access token found. Please log in again.",
        error: "NO_TOKEN"
      };
    }
    const r = t("/api/v1/calendar/update_tasks");
    const o = {
      task_id: s
    };
    if (a) {
      o.start_time = a;
    }
    if (n) {
      o.end_time = n;
    }
    const l = await fetch(r, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${i}`
      },
      body: JSON.stringify(o)
    });
    if (!l.ok) {
      const e = await l.json().catch(() => ({}));
      return {
        success: false,
        message: e.message || e.detail || `HTTP error! status: ${l.status}`,
        error: `HTTP_${l.status}`
      };
    }
    const d = await l.json();
    if (d.success) {
      return d;
    } else {
      return {
        success: false,
        message: d.message || "Unexpected response format",
        error: "INVALID_RESPONSE"
      };
    }
  } catch (i) {
    return {
      success: false,
      message: i instanceof Error ? i.message : "Unknown error occurred",
      error: "NETWORK_ERROR"
    };
  }
};
const $ = async (s, a) => {
  try {
    const n = e();
    if (!n) {
      return {
        success: false,
        message: "No access token found. Please log in again.",
        error: "NO_TOKEN"
      };
    }
    const i = t("/api/v1/calendar/update_tasks");
    const r = {
      task_id: s,
      comment: a
    };
    const o = await fetch(i, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${n}`
      },
      body: JSON.stringify(r)
    });
    if (!o.ok) {
      const e = await o.json().catch(() => ({}));
      return {
        success: false,
        message: e.message || e.detail || `HTTP error! status: ${o.status}`,
        error: `HTTP_${o.status}`
      };
    }
    const l = await o.json();
    if (l.success) {
      return l;
    } else {
      return {
        success: false,
        message: l.message || "Unexpected response format",
        error: "INVALID_RESPONSE"
      };
    }
  } catch (n) {
    return {
      success: false,
      message: n instanceof Error ? n.message : "Unknown error occurred",
      error: "NETWORK_ERROR"
    };
  }
};
const O = ({
  taskId: c,
  onClose: u,
  isPendingTask: p = false,
  onTaskApproved: m,
  onTaskRejected: h,
  onTaskDeleted: g,
  onQuotaDeducted: k
}) => {
  const v = s();
  const {
    t: x,
    i18n: j
  } = a();
  const [f, w] = n.useState(null);
  const [N, b] = n.useState(true);
  const [D, S] = n.useState(null);
  const [L, T] = n.useState(false);
  const [M, O] = n.useState(false);
  const [H, I] = n.useState(null);
  const [B, W] = n.useState(new Date().getMonth());
  const [R, A] = n.useState(new Date().getFullYear());
  const [V, U] = n.useState({
    top: 0,
    left: 0
  });
  const [Y, q] = n.useState(null);
  const [z, K] = n.useState(null);
  const [Z, J] = n.useState(false);
  const [Q, G] = n.useState(false);
  const [X, ee] = n.useState("");
  const te = n.useRef(null);
  const [se, ae] = n.useState(false);
  const [ne, ie] = n.useState(false);
  const [re, oe] = n.useState(false);
  const [le, de] = n.useState("");
  const [ce, ue] = n.useState(false);
  const [pe, me] = n.useState(false);
  const he = n.useRef(null);
  const [ge, ke] = n.useState(null);
  const [ve, xe] = n.useState(false);
  const [je, fe] = n.useState("");
  const we = n.useRef(null);
  n.useEffect(() => {
    const s = async () => {
      let s;
      b(true);
      S(null);
      if (p) {
        s = await (async s => {
          try {
            const a = e();
            if (!a) {
              return {
                success: false,
                message: "No access token found. Please log in again.",
                error: "NO_TOKEN"
              };
            }
            const n = t("/api/v1/calendar/pending_main_task_detail");
            const i = await fetch(n, {
              method: "POST",
              headers: {
                accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${a}`
              },
              body: JSON.stringify({
                task_id: s
              })
            });
            if (!i.ok) {
              const e = await i.json().catch(() => ({}));
              return {
                success: false,
                message: e.message || e.detail || `HTTP error! status: ${i.status}`,
                error: `HTTP_${i.status}`
              };
            }
            const r = await i.json();
            if (r.success) {
              return r;
            } else {
              return {
                success: false,
                message: "Unexpected response format",
                error: "INVALID_RESPONSE"
              };
            }
          } catch (D) {
            return {
              success: false,
              message: D instanceof Error ? D.message : "Unknown error occurred",
              error: "NETWORK_ERROR"
            };
          }
        })(c);
        if (s.success) {
          const e = {
            success: true,
            main_task: {
              ...s.main_task,
              type: s.main_task.type === "todo-new" ? "todo" : s.main_task.type === "due-new" ? "due" : s.main_task.type
            },
            subtasks: s.subtasks.map(e => ({
              ...e,
              priority: typeof e.priority == "string" ? parseInt(e.priority, 10) : e.priority
            })),
            subtask_count: s.subtask_count
          };
          w(e);
        } else {
          const e = "message" in s ? s.message : "error" in s ? s.error : x("taskDetail.loadPendingTaskFailed");
          S(e);
        }
      } else {
        s = await C(c);
        if (s.success) {
          w(s);
        } else {
          const e = (e => {
            const t = new Date();
            const s = new Date(t);
            s.setDate(s.getDate() + 1);
            const a = new Date(t);
            a.setDate(a.getDate() + 7);
            return {
              t1: {
                success: true,
                main_task: {
                  task_id: "t1",
                  user_id: "user1",
                  type: "todo",
                  title: "Review React Hooks",
                  description: "This task involves understanding and reviewing React Hooks, particularly useState and useEffect. Focus on how they work, when to use them, and best practices for implementation.",
                  scheduled_for: new Date(t.getTime() + 172800000).toISOString(),
                  due_at: new Date(t.getTime() + 345600000).toISOString(),
                  created_at: t.toISOString(),
                  status: "pending",
                  progress: "not_started",
                  related_tasks: [],
                  updated_at: null
                },
                subtasks: [{
                  subtask_id: "st1",
                  parent_task_id: "t1",
                  type: "deep_learn_session",
                  title: "Study useState Hook",
                  description: "Learn the fundamentals of useState hook, including state initialization, updates, and functional updates.",
                  priority: 1,
                  status: "pending",
                  progress: "not_started",
                  created_at: t.toISOString(),
                  updated_at: null
                }, {
                  subtask_id: "st2",
                  parent_task_id: "t1",
                  type: "deep_learn_session",
                  title: "Study useEffect Hook",
                  description: "Understand useEffect hook for side effects, dependency arrays, and cleanup functions.",
                  priority: 2,
                  status: "pending",
                  progress: "not_started",
                  created_at: t.toISOString(),
                  updated_at: null
                }],
                subtask_count: 2
              },
              t2: {
                success: true,
                main_task: {
                  task_id: "t2",
                  user_id: "user1",
                  type: "todo",
                  title: "Setup Development Environment",
                  description: "Install and configure Node.js, VS Code, and necessary development tools for React development.",
                  scheduled_for: t.toISOString(),
                  due_at: s.toISOString(),
                  created_at: t.toISOString(),
                  status: "pending",
                  progress: "not_started",
                  related_tasks: [],
                  updated_at: null
                },
                subtasks: [],
                subtask_count: 0
              },
              d1: {
                success: true,
                main_task: {
                  task_id: "d1",
                  user_id: "user1",
                  type: "due",
                  title: "Midterm Exam",
                  description: "Midterm examination covering all topics from the first half of the semester. Make sure to review all lecture materials and assignments.",
                  scheduled_for: new Date(t.getTime() + 432000000).toISOString(),
                  due_at: new Date(t.getTime() + 432000000).toISOString(),
                  created_at: t.toISOString(),
                  status: "pending",
                  progress: "not_started",
                  related_tasks: ["t3", "t4"],
                  related_tasks_details: [{
                    task_id: "t3",
                    type: "todo",
                    title: "Check Exam Schedule",
                    due_at: new Date(t.getTime() + 259200000).toISOString()
                  }, {
                    task_id: "t4",
                    type: "todo",
                    title: "Prepare Study Notes",
                    due_at: new Date(t.getTime() + 345600000).toISOString()
                  }],
                  updated_at: null
                },
                subtasks: [],
                subtask_count: 0
              },
              t3: {
                success: true,
                main_task: {
                  task_id: "t3",
                  user_id: "user1",
                  type: "todo",
                  title: "Check Exam Schedule",
                  description: "Verify the exact date, time, and location of the midterm exam. Confirm any special requirements or materials needed.",
                  scheduled_for: new Date(t.getTime() + 259200000).toISOString(),
                  due_at: new Date(t.getTime() + 259200000).toISOString(),
                  created_at: t.toISOString(),
                  status: "pending",
                  progress: "not_started",
                  related_tasks: [],
                  updated_at: null
                },
                subtasks: [],
                subtask_count: 0
              },
              t4: {
                success: true,
                main_task: {
                  task_id: "t4",
                  user_id: "user1",
                  type: "todo",
                  title: "Prepare Study Notes",
                  description: "Create comprehensive study notes summarizing key concepts from all lectures and assignments covered in the first half of the semester.",
                  scheduled_for: new Date(t.getTime() + 86400000).toISOString(),
                  due_at: new Date(t.getTime() + 345600000).toISOString(),
                  created_at: t.toISOString(),
                  status: "pending",
                  progress: "not_started",
                  related_tasks: [],
                  updated_at: null
                },
                subtasks: [],
                subtask_count: 0
              },
              d2: {
                success: true,
                main_task: {
                  task_id: "d2",
                  user_id: "user1",
                  type: "due",
                  title: "Assignment 2 Submission",
                  description: "Submit Assignment 2 which includes implementing a React application with multiple components and state management.",
                  scheduled_for: new Date(t.getTime() + 864000000).toISOString(),
                  due_at: new Date(t.getTime() + 864000000).toISOString(),
                  created_at: t.toISOString(),
                  status: "pending",
                  progress: "not_started",
                  related_tasks: ["t5"],
                  related_tasks_details: [{
                    task_id: "t5",
                    type: "todo",
                    title: "Draft Project Proposal",
                    due_at: new Date(t.getTime() + 691200000).toISOString()
                  }],
                  updated_at: null
                },
                subtasks: [],
                subtask_count: 0
              },
              t5: {
                success: true,
                main_task: {
                  task_id: "t5",
                  user_id: "user1",
                  type: "todo",
                  title: "Draft Project Proposal",
                  description: "Create a detailed project proposal outlining the main features, technical approach, and timeline for Assignment 2.",
                  scheduled_for: new Date(t.getTime() + 432000000).toISOString(),
                  due_at: new Date(t.getTime() + 691200000).toISOString(),
                  created_at: t.toISOString(),
                  status: "pending",
                  progress: "not_started",
                  related_tasks: [],
                  updated_at: null
                },
                subtasks: [],
                subtask_count: 0
              },
              t6: {
                success: true,
                main_task: {
                  task_id: "t6",
                  user_id: "user1",
                  type: "todo",
                  title: "Read Chapter 4",
                  description: "Read and understand Chapter 4 of the textbook, focusing on component lifecycle methods and their applications.",
                  scheduled_for: new Date(t.getTime() + 518400000).toISOString(),
                  due_at: new Date(t.getTime() + 604800000).toISOString(),
                  created_at: t.toISOString(),
                  status: "pending",
                  progress: "not_started",
                  related_tasks: [],
                  updated_at: null
                },
                subtasks: [],
                subtask_count: 0
              }
            }[e] || null;
          })(c);
          if (e) {
            w(e);
          } else {
            const e = "message" in s ? s.message : "error" in s ? s.error : x("taskDetail.loadFailed");
            S(e);
          }
        }
      }
      b(false);
    };
    if (c) {
      s();
    }
  }, [c, p]);
  const Ne = e => {
    try {
      return new Date(e).toLocaleDateString(l(j.language), {
        weekday: "short",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit"
      });
    } catch (t) {
      return e;
    }
  };
  const _e = (e, t) => e === "completed" || t === "completed" ? 100 : e === "failed" || t === "failed" ? 0 : t === "in_progress" || t === "started" ? 50 : 0;
  const ye = e => {
    const t = new Date(e);
    const s = -t.getTimezoneOffset();
    const a = `UTC${s >= 0 ? "+" : "-"}${Math.floor(Math.abs(s) / 60)}`;
    return `${t.toLocaleString(l(j.language), {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true
    })} (${a})`;
  };
  const be = async s => {
    const a = _();
    if (a && a.file_generation.remaining <= 0) {
      n = x("taskDetail.fgaQuotaExceeded", {
        limit: a.file_generation.limit
      });
      fe(n);
      xe(true);
      if (we.current) {
        clearTimeout(we.current);
      }
      we.current = setTimeout(() => {
        xe(false);
        we.current = null;
      }, 5000);
      return;
    }
    var n;
    y("file_generation");
    if (k != null) {
      k();
    }
    ke(s);
    try {
      const a = await async function (s) {
        const a = e();
        if (!a) {
          return {
            ok: false,
            status: 401,
            detail: "Not authenticated"
          };
        }
        const n = t("/api/v1/file_generation/rerun");
        const i = await fetch(n, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${a}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            task_id: s
          })
        });
        const r = await i.json().catch(() => ({}));
        if (i.ok) {
          return {
            ok: true,
            status: 200,
            data: r
          };
        } else {
          return {
            ok: false,
            status: i.status,
            detail: r.detail ?? r.message ?? "Request failed"
          };
        }
      }(s);
      if (!a.ok) {
        const e = a.detail ?? x("taskDetail.requestFailed", {
          status: a.status
        });
        alert(e);
        return;
      }
      const n = a.data;
      w(e => e ? {
        ...e,
        subtasks: e.subtasks.map(e => {
          var t;
          if (e.subtask_id !== s) {
            return e;
          }
          if (n.success && n.file_id && n.file_url) {
            const s = (((t = e.related_file_ids) == null ? undefined : t.output_files) ?? []).map((e, t) => t === 0 ? {
              ...e,
              file_id: n.file_id,
              file_name: n.file_name ?? e.file_name
            } : e);
            return {
              ...e,
              progress: "completed",
              status: "completed",
              related_file_ids: {
                ...e.related_file_ids,
                output_files: s
              },
              subtask_output: {
                ...e.subtask_output,
                output_file_data: [{
                  file_id: n.file_id,
                  file_url: n.file_url
                }]
              }
            };
          }
          return {
            ...e,
            progress: "failed",
            status: "failed"
          };
        })
      } : e);
    } finally {
      ke(null);
    }
  };
  const De = (e, t) => {
    e.stopPropagation();
    if (H === t) {
      I(null);
      q(null);
      K(null);
      return;
    }
    const s = e.currentTarget.getBoundingClientRect();
    const a = window.innerHeight - s.bottom;
    const n = s.top;
    U(a < 290 && n > a ? {
      top: s.top - 290 - 6,
      left: s.left
    } : {
      top: s.bottom + 6,
      left: s.left
    });
    const i = t === "start" ? f == null ? undefined : f.main_task.scheduled_for : f == null ? undefined : f.main_task.due_at;
    if (i) {
      const e = new Date(i);
      W(e.getMonth());
      A(e.getFullYear());
      K(i);
      q(i);
    } else {
      const e = new Date();
      W(e.getMonth());
      A(e.getFullYear());
      K(null);
      q(null);
    }
    I(t);
  };
  n.useEffect(() => {
    const e = e => {
      if (te.current && !te.current.contains(e.target)) {
        I(null);
        q(null);
        K(null);
      }
    };
    if (H) {
      document.addEventListener("mousedown", e);
    }
    return () => document.removeEventListener("mousedown", e);
  }, [H]);
  const Ce = e => {
    ee(e);
    G(true);
    setTimeout(() => G(false), 3000);
  };
  const Se = async () => {
    if (!le.trim() || ce || !f) {
      return;
    }
    const e = le.trim();
    const t = f.main_task.task_id;
    de("");
    oe(false);
    me(true);
    const s = await $(t, e);
    me(false);
    if (!s.success) {
      return;
    }
    const a = s.main_task.type === "due-new" ? "due" : s.main_task.type === "todo-new" ? "todo" : s.main_task.type;
    w({
      success: true,
      main_task: {
        task_id: s.main_task.task_id,
        user_id: s.main_task.user_id,
        type: a,
        title: s.main_task.title,
        description: s.main_task.description,
        scheduled_for: s.main_task.scheduled_for || "",
        due_at: s.main_task.due_at || "",
        created_at: s.main_task.created_at,
        status: s.main_task.status,
        progress: s.main_task.progress,
        related_tasks: s.main_task.related_tasks || [],
        updated_at: s.main_task.updated_at,
        related_tasks_details: f.main_task.related_tasks_details
      },
      subtasks: s.subtasks.map(e => ({
        ...e,
        priority: typeof e.priority == "string" ? parseInt(e.priority, 10) || 0 : e.priority
      })),
      subtask_count: s.subtask_count
    });
    Ce(x("taskDetail.taskUpdated"));
  };
  const Le = e => {
    if (!Y) {
      return false;
    }
    const t = new Date(Y);
    return t.getFullYear() === R && t.getMonth() === B && t.getDate() === e;
  };
  const Te = () => {
    if (!z || !Y) {
      return false;
    }
    const e = new Date(z);
    const t = new Date(Y);
    return e.getMonth() !== t.getMonth() || e.getDate() !== t.getDate() || e.getFullYear() !== t.getFullYear();
  };
  const Me = e => {
    const t = e === "start" ? f == null ? undefined : f.main_task.scheduled_for : f == null ? undefined : f.main_task.due_at;
    const s = H === e;
    const a = s && Y ? Y : t;
    if (!a) {
      return i.jsx("span", {
        className: "modal-date-value",
        children: "—"
      });
    }
    const n = new Date(a);
    if (s && z && Y) {
      const e = new Date(z);
      Ne(a);
      const t = n.getMonth() !== e.getMonth() || n.getFullYear() !== e.getFullYear();
      const s = n.getDate() !== e.getDate();
      if (t || s) {
        const a = n.toLocaleDateString(l(j.language), {
          weekday: "short"
        });
        const r = n.toLocaleDateString(l(j.language), {
          month: "short"
        });
        const o = n.getDate();
        const d = n.toLocaleTimeString(l(j.language), {
          hour: "numeric",
          minute: "2-digit"
        });
        const c = n.getDay() !== e.getDay();
        return i.jsxs("span", {
          className: "modal-date-value",
          children: [i.jsx("span", {
            className: c ? "date-part-changed" : "",
            children: a
          }), ",", " ", i.jsx("span", {
            className: t ? "date-part-changed" : "",
            children: r
          }), " ", i.jsx("span", {
            className: s ? "date-part-changed" : "",
            children: o
          }), ", ", d]
        });
      }
    }
    return i.jsx("span", {
      className: "modal-date-value",
      children: Ne(a)
    });
  };
  const Ee = e => {
    const t = new Date();
    return t.getFullYear() === R && t.getMonth() === B && t.getDate() === e;
  };
  const Fe = [x("proactive.months.january"), x("proactive.months.february"), x("proactive.months.march"), x("proactive.months.april"), x("proactive.months.may"), x("proactive.months.june"), x("proactive.months.july"), x("proactive.months.august"), x("proactive.months.september"), x("proactive.months.october"), x("proactive.months.november"), x("proactive.months.december")];
  const Pe = e => {
    if (H !== e) {
      return null;
    }
    const t = (() => {
      const e = new Date(R, B + 1, 0).getDate();
      const t = new Date(R, B, 1).getDay();
      const s = [];
      const a = new Date(R, B, 0).getDate();
      for (let i = t - 1; i >= 0; i--) {
        s.push({
          day: a - i,
          isCurrentMonth: false
        });
      }
      for (let i = 1; i <= e; i++) {
        s.push({
          day: i,
          isCurrentMonth: true
        });
      }
      const n = 7 - s.length % 7;
      if (n < 7) {
        for (let i = 1; i <= n; i++) {
          s.push({
            day: i,
            isCurrentMonth: false
          });
        }
      }
      return s;
    })();
    return r.createPortal(i.jsxs("div", {
      className: "date-picker-dropdown",
      ref: te,
      style: {
        top: V.top,
        left: V.left
      },
      onClick: e => e.stopPropagation(),
      children: [i.jsxs("div", {
        className: "date-picker-header",
        children: [i.jsx("button", {
          className: "date-picker-nav-btn",
          onClick: e => {
            e.stopPropagation();
            if (B === 0) {
              W(11);
              A(R - 1);
            } else {
              W(B - 1);
            }
          },
          children: i.jsx("svg", {
            width: "12",
            height: "12",
            viewBox: "0 0 24 24",
            fill: "none",
            children: i.jsx("path", {
              d: "M15 18L9 12L15 6",
              stroke: "currentColor",
              strokeWidth: "2",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            })
          })
        }), i.jsxs("span", {
          className: "date-picker-month-label",
          children: [Fe[B], " ", R]
        }), i.jsx("button", {
          className: "date-picker-nav-btn",
          onClick: e => {
            e.stopPropagation();
            if (B === 11) {
              W(0);
              A(R + 1);
            } else {
              W(B + 1);
            }
          },
          children: i.jsx("svg", {
            width: "12",
            height: "12",
            viewBox: "0 0 24 24",
            fill: "none",
            children: i.jsx("path", {
              d: "M9 18L15 12L9 6",
              stroke: "currentColor",
              strokeWidth: "2",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            })
          })
        })]
      }), i.jsx("div", {
        className: "date-picker-weekdays",
        children: x("taskDetail.datepickerWeekdays", {
          returnObjects: true
        }).map((e, t) => i.jsx("div", {
          className: "date-picker-weekday",
          children: e
        }, t))
      }), i.jsx("div", {
        className: "date-picker-days",
        children: t.map((e, t) => i.jsx("button", {
          className: `date-picker-day ${e.isCurrentMonth ? "" : "other-month"} ${e.isCurrentMonth && Le(e.day) ? "selected" : ""} ${e.isCurrentMonth && Ee(e.day) ? "today" : ""}`,
          onClick: t => {
            t.stopPropagation();
            if (e.isCurrentMonth) {
              (e => {
                if (!H || !f) {
                  return;
                }
                const t = new Date(R, B, e).toISOString();
                q(t);
              })(e.day);
            }
          },
          disabled: !e.isCurrentMonth,
          children: e.day
        }, t))
      }), i.jsx("div", {
        className: "date-picker-footer",
        children: i.jsx("button", {
          className: "date-picker-confirm-btn",
          onClick: e => {
            e.stopPropagation();
            (async () => {
              if (!H || !f || !Y) {
                return;
              }
              J(true);
              const e = f.main_task.task_id;
              let t;
              let s;
              if (H === "start") {
                t = Y;
              } else {
                s = Y;
              }
              const a = await P(e, t, s);
              J(false);
              if (a.success) {
                w(e => e ? {
                  ...e,
                  main_task: {
                    ...e.main_task,
                    ...(H === "start" ? {
                      scheduled_for: Y
                    } : {
                      due_at: Y
                    })
                  }
                } : e);
                I(null);
                q(null);
                K(null);
                Ce(x(H === "start" ? "taskDetail.startDateUpdated" : "taskDetail.dueDateUpdated"));
              }
            })();
          },
          disabled: !Te() || Z,
          children: x(Z ? "taskDetail.updating" : "taskDetail.confirm")
        })
      })]
    }), document.body);
  };
  if (N) {
    return i.jsx("div", {
      className: "task-detail-overlay",
      children: i.jsx("div", {
        className: "task-detail-container",
        children: i.jsxs("div", {
          className: "loading-container",
          children: [i.jsx("div", {
            className: "loading-spinner"
          }), i.jsx("div", {
            className: "loading-text",
            children: x("taskDetail.loadingTask")
          })]
        })
      })
    });
  }
  if (D || !f) {
    return i.jsx("div", {
      className: "task-detail-overlay",
      onClick: u,
      children: i.jsxs("div", {
        className: "task-detail-container",
        onClick: e => e.stopPropagation(),
        children: [i.jsx("button", {
          className: "task-detail-close",
          onClick: u,
          children: i.jsx("svg", {
            width: "24",
            height: "24",
            viewBox: "0 0 24 24",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            children: i.jsx("path", {
              d: "M18 6L6 18M6 6L18 18",
              stroke: "currentColor",
              strokeWidth: "2",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            })
          })
        }), i.jsx("div", {
          className: "task-detail-content",
          children: i.jsxs("div", {
            style: {
              padding: "40px 20px",
              textAlign: "center"
            },
            children: [i.jsx("p", {
              style: {
                color: "#EF4444",
                marginBottom: "12px"
              },
              children: x("taskDetail.errorLoading")
            }), i.jsx("p", {
              style: {
                color: "#6B7280",
                fontSize: "14px"
              },
              children: D || x("taskDetail.unknownError")
            })]
          })
        })]
      })
    });
  }
  const $e = [...f.subtasks].sort((e, t) => e.priority - t.priority);
  return i.jsxs("div", {
    className: "task-detail-overlay",
    onClick: u,
    children: [i.jsxs("div", {
      className: "task-detail-container " + ($e.length === 0 ? "single-column" : ""),
      onClick: e => e.stopPropagation(),
      children: [i.jsx("button", {
        className: "task-detail-close",
        onClick: u,
        children: i.jsx("svg", {
          width: "24",
          height: "24",
          viewBox: "0 0 24 24",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: i.jsx("path", {
            d: "M18 6L6 18M6 6L18 18",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          })
        })
      }), pe && i.jsxs("div", {
        className: "comment-loading-overlay",
        children: [i.jsx("div", {
          className: "comment-loading-spinner"
        }), i.jsx("div", {
          className: "comment-loading-text",
          children: x("taskDetail.updatingTask")
        })]
      }), i.jsxs("div", {
        className: `task-detail-content ${$e.length === 0 ? "single-column" : ""} ${pe ? "comment-loading" : ""}`,
        children: [i.jsxs("div", {
          className: "task-detail-left-col",
          children: [i.jsxs("div", {
            className: "task-detail-left-scrollable-content",
            children: [i.jsxs("div", {
              className: "task-detail-header",
              children: [i.jsx("h2", {
                className: "task-detail-title",
                children: f.main_task.title
              }), i.jsxs("div", {
                className: "task-detail-meta",
                children: [i.jsxs("div", {
                  className: "task-detail-meta-item",
                  children: [i.jsx("svg", {
                    className: "task-detail-meta-icon",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor",
                    children: i.jsx("path", {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: 2,
                      d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    })
                  }), i.jsx("span", {
                    className: "task-detail-meta-label",
                    children: x("taskDetail.start")
                  }), i.jsxs("div", {
                    className: "modal-date-field " + (H === "start" ? "editing" : ""),
                    onClick: e => De(e, "start"),
                    children: [Me("start"), i.jsx("button", {
                      className: "date-edit-btn modal-date-edit-btn",
                      title: x("taskDetail.editStartDate"),
                      onClick: e => De(e, "start"),
                      children: i.jsx("img", {
                        src: "/pages/mainPages/proactive/edit.svg",
                        alt: "Edit",
                        className: "date-edit-icon"
                      })
                    })]
                  }), Pe("start")]
                }), i.jsxs("div", {
                  className: "task-detail-meta-item",
                  children: [i.jsx("svg", {
                    className: "task-detail-meta-icon",
                    fill: "none",
                    viewBox: "0 0 24 24",
                    stroke: "currentColor",
                    children: i.jsx("path", {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      strokeWidth: 2,
                      d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    })
                  }), i.jsx("span", {
                    className: "task-detail-meta-label",
                    children: x("taskDetail.due")
                  }), i.jsxs("div", {
                    className: "modal-date-field " + (H === "due" ? "editing" : ""),
                    onClick: e => De(e, "due"),
                    children: [Me("due"), i.jsx("button", {
                      className: "date-edit-btn modal-date-edit-btn",
                      title: x("taskDetail.editDueDate"),
                      onClick: e => De(e, "due"),
                      children: i.jsx("img", {
                        src: "/pages/mainPages/proactive/edit.svg",
                        alt: "Edit",
                        className: "date-edit-icon"
                      })
                    })]
                  }), Pe("due")]
                })]
              })]
            }), i.jsxs("div", {
              className: "task-detail-section",
              children: [i.jsx("h3", {
                className: "task-detail-section-title",
                children: x("taskDetail.description")
              }), i.jsx("p", {
                className: "task-detail-description",
                children: f.main_task.description
              })]
            }), f.main_task.related_tasks_details && f.main_task.related_tasks_details.length > 0 && i.jsxs("div", {
              className: "task-detail-section",
              children: [i.jsx("h3", {
                className: "task-detail-section-title",
                children: x("taskDetail.relatedDues")
              }), i.jsx("div", {
                className: "task-detail-related-dues",
                children: f.main_task.related_tasks_details.map(e => i.jsxs("div", {
                  className: "task-detail-related-due-item",
                  children: [i.jsx("div", {
                    className: "task-detail-related-due-bar"
                  }), i.jsx("div", {
                    className: "task-detail-related-due-icon",
                    children: i.jsx("svg", {
                      width: "16",
                      height: "16",
                      viewBox: "0 0 24 24",
                      fill: "none",
                      xmlns: "http://www.w3.org/2000/svg",
                      children: i.jsx("path", {
                        d: "M8 7V3M16 7V3M5 10H19M5 21H19C20.1046 21 21 20.1046 21 19V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V19C3 20.1046 3.89543 21 5 21Z",
                        stroke: "currentColor",
                        strokeWidth: "2",
                        strokeLinecap: "round",
                        strokeLinejoin: "round"
                      })
                    })
                  }), i.jsx("div", {
                    className: "task-detail-related-due-content",
                    children: i.jsx("span", {
                      className: "task-detail-related-due-name",
                      children: e.title
                    })
                  }), i.jsx("span", {
                    className: "task-detail-related-due-time",
                    children: Ne(e.due_at)
                  })]
                }, e.task_id))
              })]
            })]
          }), p && i.jsxs(i.Fragment, {
            children: [i.jsxs("div", {
              className: "task-detail-comment-panel " + (re ? "open" : ""),
              children: [i.jsx("textarea", {
                ref: he,
                className: "comment-panel-textarea",
                placeholder: x("taskDetail.commentPlaceholder"),
                value: le,
                onChange: e => {
                  de(e.target.value);
                  e.target.style.height = "auto";
                  e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
                },
                onKeyDown: e => {
                  if (e.key === "Enter" && !e.shiftKey && !d(e)) {
                    e.preventDefault();
                    Se();
                  }
                },
                rows: 1,
                disabled: ce
              }), i.jsx("button", {
                className: "comment-panel-send-btn " + (le.trim() ? "active" : ""),
                onClick: Se,
                disabled: !le.trim() || ce,
                children: ce ? i.jsx("div", {
                  className: "comment-send-spinner"
                }) : i.jsx("svg", {
                  width: "14",
                  height: "14",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  children: i.jsx("path", {
                    d: "M5 12L3 21L21 12L3 3L5 12ZM5 12H13",
                    stroke: "currentColor",
                    strokeWidth: "2",
                    strokeLinecap: "round",
                    strokeLinejoin: "round"
                  })
                })
              })]
            }), i.jsxs("button", {
              className: "task-detail-bottom-action-btn comment " + (re ? "active" : ""),
              onClick: () => {
                oe(e => !e);
                if (!re) {
                  setTimeout(() => {
                    var e;
                    if ((e = he.current) == null) {
                      return undefined;
                    } else {
                      return e.focus();
                    }
                  }, 100);
                }
              },
              children: [i.jsx("img", {
                src: "/pages/mainPages/proactive/comment.svg",
                alt: "Comment",
                className: "task-detail-bottom-action-icon"
              }), i.jsx("div", {
                className: "task-detail-bottom-action-tooltip",
                children: x("taskDetail.commentToAdjust")
              })]
            })]
          }), p ? i.jsxs(i.Fragment, {
            children: [i.jsxs("button", {
              className: "task-detail-bottom-action-btn confirm",
              onClick: async () => {
                if (!f) {
                  return;
                }
                T(true);
                const e = await F(c);
                if (e.success && e.total_succeeded > 0) {
                  if (m) {
                    m();
                  }
                  u();
                }
                T(false);
              },
              disabled: L,
              children: [L ? i.jsx("div", {
                className: "confirm-loading-spinner modal-spinner"
              }) : i.jsx("svg", {
                width: "18",
                height: "18",
                viewBox: "0 0 24 24",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                className: "task-detail-bottom-action-icon",
                children: i.jsx("path", {
                  d: "M20 6L9 17L4 12",
                  stroke: "currentColor",
                  strokeWidth: "2",
                  strokeLinecap: "round",
                  strokeLinejoin: "round"
                })
              }), i.jsx("div", {
                className: "task-detail-bottom-action-tooltip",
                children: x("taskDetail.confirmTask")
              })]
            }), i.jsxs("button", {
              className: "task-detail-bottom-action-btn reject",
              onClick: async () => {
                if (!f) {
                  return;
                }
                O(true);
                const e = await F(c, "reject");
                if (e.success && e.total_succeeded > 0) {
                  if (h) {
                    h();
                  }
                  u();
                }
                O(false);
              },
              disabled: M,
              children: [M ? i.jsx("div", {
                className: "reject-loading-spinner modal-spinner"
              }) : i.jsxs("svg", {
                width: "18",
                height: "18",
                viewBox: "0 0 24 24",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
                className: "task-detail-bottom-action-icon",
                children: [i.jsx("path", {
                  d: "M18 6L6 18",
                  stroke: "currentColor",
                  strokeWidth: "2",
                  strokeLinecap: "round",
                  strokeLinejoin: "round"
                }), i.jsx("path", {
                  d: "M6 6L18 18",
                  stroke: "currentColor",
                  strokeWidth: "2",
                  strokeLinecap: "round",
                  strokeLinejoin: "round"
                })]
              }), i.jsx("div", {
                className: "task-detail-bottom-action-tooltip",
                children: x("taskDetail.rejectTask")
              })]
            })]
          }) : i.jsxs("button", {
            className: "task-detail-bottom-action-btn delete",
            onClick: () => {
              ae(true);
            },
            children: [i.jsxs("svg", {
              width: "18",
              height: "18",
              viewBox: "0 0 24 24",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              className: "task-detail-bottom-action-icon",
              children: [i.jsx("path", {
                d: "M3 6H5H21",
                stroke: "currentColor",
                strokeWidth: "2",
                strokeLinecap: "round",
                strokeLinejoin: "round"
              }), i.jsx("path", {
                d: "M8 6V4C8 3.46957 8.21071 3 8.58579 2.62513C8.96086 2.25026 9.46957 2.03967 10 2.03967H14C14.5304 2.03967 15.0391 2.25026 15.4142 2.62513C15.7893 3 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z",
                stroke: "currentColor",
                strokeWidth: "2",
                strokeLinecap: "round",
                strokeLinejoin: "round"
              })]
            }), i.jsx("div", {
              className: "task-detail-bottom-action-tooltip",
              children: x("taskDetail.deleteTask")
            })]
          })]
        }), $e.length > 0 && i.jsx("div", {
          className: "task-detail-right-col",
          children: i.jsxs("div", {
            className: "task-detail-section",
            children: [i.jsxs("h3", {
              className: "task-detail-section-title",
              children: [x("taskDetail.subtasksTitle"), " ", i.jsxs("span", {
                className: "task-detail-section-title-desc",
                children: ["- ", x("taskDetail.subtasksDesc")]
              })]
            }), i.jsx("div", {
              className: "task-detail-subtasks",
              children: $e.map((e, t) => {
                var s;
                var a;
                var n;
                const r = e.status === "completed" ? 100 : e.progress === "started" ? e.progress_percentage ?? _e(e.status, e.progress || "not_started") : _e(e.status, e.progress || "not_started");
                const o = [...(((s = e.related_file_ids) == null ? undefined : s.primary_source_files) || []), ...(((a = e.related_file_ids) == null ? undefined : a.other_source_files) || [])];
                const l = ((n = e.related_file_ids) == null ? undefined : n.output_files) || [];
                const d = e.type === "file_generation" || e.type === "file_generation-update";
                const c = t => {
                  var s;
                  var a;
                  const n = (a = (s = e.subtask_output) == null ? undefined : s.output_file_data) == null ? undefined : a.find(e => e.file_id === t);
                  if (n == null) {
                    return undefined;
                  } else {
                    return n.file_url;
                  }
                };
                return i.jsxs("div", {
                  className: "task-detail-subtask-card",
                  children: [i.jsxs("div", {
                    className: "task-detail-subtask-header-row",
                    children: [i.jsx("div", {
                      className: "task-detail-step-number" + (e.status === "completed" ? " completed" : ""),
                      children: e.status === "completed" ? i.jsx("svg", {
                        width: "13",
                        height: "13",
                        viewBox: "0 0 24 24",
                        fill: "none",
                        xmlns: "http://www.w3.org/2000/svg",
                        children: i.jsx("path", {
                          d: "M20 6L9 17L4 12",
                          stroke: "currentColor",
                          strokeWidth: "3",
                          strokeLinecap: "round",
                          strokeLinejoin: "round"
                        })
                      }) : t + 1
                    }), i.jsx("span", {
                      className: "task-detail-subtask-title",
                      children: e.title
                    })]
                  }), i.jsxs("div", {
                    className: "task-detail-subtask-body",
                    children: [i.jsx("p", {
                      className: "task-detail-subtask-desc",
                      children: e.description
                    }), o.length > 0 && i.jsxs("div", {
                      className: "task-detail-files-container",
                      children: [i.jsx("div", {
                        className: "task-detail-source-header",
                        children: x("taskDetail.sourceFiles")
                      }), i.jsx("div", {
                        className: "task-detail-files-list horizontal",
                        children: o.map((e, t) => {
                          const s = "file_name" in e && !!e.file_name;
                          const a = !s;
                          const n = "file_id" in e && e.file_id ? e.file_id : `source-${t}`;
                          const r = s ? e.file_name : "note" in e && e.note ? e.note : `File ${t + 1}`;
                          const o = (e => {
                            var t;
                            switch (((t = e.split(".").pop()) == null ? undefined : t.toLowerCase()) || "") {
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
                          })((s ? e.file_name : r) || "");
                          return i.jsxs("div", {
                            className: "task-detail-file-card" + (a ? " task-detail-file-card-missing" : ""),
                            children: [a ? i.jsxs("div", {
                              className: "task-detail-file-card-missing-icon-wrapper",
                              children: [i.jsx("img", {
                                src: "/pages/calendarPage/link_broken.svg",
                                alt: "",
                                className: "task-detail-file-card-missing-icon",
                                "aria-hidden": true
                              }), i.jsx("div", {
                                className: "task-detail-file-card-missing-tooltip",
                                children: x("taskDetail.fileMissingTooltip")
                              })]
                            }) : i.jsx("img", {
                              src: o,
                              alt: "",
                              className: "task-detail-file-card-icon"
                            }), i.jsx("span", {
                              className: "task-detail-file-card-name",
                              title: r,
                              children: r
                            })]
                          }, n);
                        })
                      })]
                    }), d && l.length > 0 && i.jsxs("div", {
                      className: "task-detail-generated-file-section",
                      children: [i.jsx("div", {
                        className: "task-detail-source-header",
                        children: x("taskDetail.preparedForYou")
                      }), (() => {
                        if (e.progress === "in_progress" || ge === e.subtask_id) {
                          const e = l[0];
                          const t = (e == null ? undefined : e.file_ext) || "";
                          const s = (e == null ? undefined : e.file_name) || x("taskDetail.generatedFileFallback");
                          const a = t ? `${s}${t}` : s;
                          return i.jsxs("div", {
                            className: "task-detail-generated-file-card task-detail-generated-file-card-processing",
                            children: [i.jsx("div", {
                              className: "task-detail-generated-file-icon task-detail-generated-file-icon-failed",
                              children: i.jsx("span", {
                                className: "task-detail-generated-file-icon-spinner",
                                "aria-hidden": true
                              })
                            }), i.jsx("div", {
                              className: "task-detail-generated-file-info",
                              children: i.jsx("div", {
                                className: "task-detail-generated-file-name",
                                children: x("taskDetail.generatingFile", {
                                  name: a
                                })
                              })
                            })]
                          });
                        }
                        return l.map(t => {
                          const s = c(t.file_id);
                          const a = t.file_ext || "";
                          const n = t.file_name || x("taskDetail.generatedFileFallback");
                          const r = t.description || "";
                          const o = e.status === "failed" || e.progress === "failed";
                          const l = !!s;
                          const d = o ? x("taskDetail.generationFailed") : l ? a ? `${n}${a}` : n : x("taskDetail.filePending");
                          const u = (e => {
                            switch (e.replace(/^\./, "").toLowerCase()) {
                              case "pdf":
                              default:
                                return "📄";
                              case "doc":
                              case "docx":
                                return "📝";
                              case "txt":
                                return "📃";
                              case "jpg":
                              case "jpeg":
                              case "png":
                              case "gif":
                              case "svg":
                                return "🖼️";
                              case "mp4":
                              case "avi":
                              case "mov":
                                return "🎥";
                              case "mp3":
                              case "wav":
                              case "flac":
                                return "🎵";
                              case "zip":
                              case "rar":
                              case "7z":
                                return "📦";
                              case "py":
                                return "🐍";
                              case "js":
                              case "ts":
                                return "⚡";
                              case "html":
                              case "css":
                                return "🌐";
                            }
                          })(a);
                          const p = (e => {
                            switch (e.replace(/^\./, "").toLowerCase()) {
                              case "pdf":
                              case "html":
                              case "css":
                                return "#E53E3E";
                              case "doc":
                              case "docx":
                                return "#2B6CB0";
                              case "txt":
                              default:
                                return "#4A5568";
                              case "jpg":
                              case "jpeg":
                              case "png":
                              case "gif":
                              case "svg":
                              case "py":
                                return "#38A169";
                              case "mp4":
                              case "avi":
                              case "mov":
                                return "#9F7AEA";
                              case "mp3":
                              case "wav":
                              case "flac":
                                return "#ED8936";
                              case "zip":
                              case "rar":
                              case "7z":
                                return "#805AD5";
                              case "js":
                              case "ts":
                                return "#D69E2E";
                            }
                          })(a);
                          return i.jsxs("div", {
                            className: "task-detail-generated-file-card" + (o ? " task-detail-generated-file-card-failed" : ""),
                            onClick: () => {
                              if (s) {
                                window.open(s, "_blank", "noopener,noreferrer");
                              }
                            },
                            style: {
                              cursor: s ? "pointer" : "default"
                            },
                            children: [i.jsx("div", {
                              className: "task-detail-generated-file-icon" + (o ? " task-detail-generated-file-icon-failed" : ""),
                              style: o ? undefined : {
                                backgroundColor: p
                              },
                              children: o ? i.jsx("img", {
                                src: "/pages/calendarPage/link_broken.svg",
                                alt: "",
                                className: "task-detail-generated-file-icon-broken",
                                "aria-hidden": true
                              }) : i.jsx("span", {
                                className: "task-detail-generated-file-icon-symbol",
                                children: u
                              })
                            }), i.jsxs("div", {
                              className: "task-detail-generated-file-info",
                              children: [i.jsx("div", {
                                className: "task-detail-generated-file-name",
                                children: d
                              }), r && !o && i.jsx("div", {
                                className: "task-detail-generated-file-description",
                                children: r
                              })]
                            })]
                          }, t.file_id);
                        });
                      })()]
                    }), d && !p && (() => {
                      const t = e.progress === "in_progress" || ge === e.subtask_id;
                      const s = e.status === "failed" || e.progress === "failed";
                      const a = e.status === "pending" && e.progress === "not_started";
                      const n = !t && (s || a);
                      const r = a && !!e.scheduled_run_at;
                      if (n) {
                        return i.jsxs("div", {
                          className: "task-detail-subtask-footer",
                          style: {
                            justifyContent: r ? "space-between" : "flex-end"
                          },
                          children: [r && i.jsxs("span", {
                            className: "task-detail-scheduled-run-at",
                            children: [x("taskDetail.scheduledAt"), " ", ye(e.scheduled_run_at)]
                          }), i.jsxs("button", {
                            className: s ? "task-detail-resume-btn" : "task-detail-start-btn",
                            onClick: () => be(e.subtask_id),
                            children: [i.jsx("img", {
                              src: "/pages/mainPages/proactive/start.svg",
                              alt: "",
                              className: "task-detail-start-icon"
                            }), x(s ? "taskDetail.regenerate" : "taskDetail.generateNow")]
                          })]
                        });
                      } else {
                        return null;
                      }
                    })(), !d && i.jsxs("div", {
                      className: "task-detail-subtask-footer",
                      children: [i.jsxs("div", {
                        className: "task-detail-progress-container",
                        children: [i.jsx("div", {
                          className: "task-detail-progress-bar",
                          children: i.jsx("div", {
                            className: "task-detail-progress-fill",
                            style: {
                              width: `${r}%`
                            }
                          })
                        }), i.jsx("span", {
                          className: "task-detail-progress-text",
                          children: x(r === 100 ? "taskDetail.percentCompletedExclaim" : "taskDetail.percentCompleted", {
                            percent: r
                          })
                        })]
                      }), i.jsx("div", {
                        className: "task-detail-action-container",
                        children: e.type === "deep_learn_session" ? (() => {
                          var t;
                          const s = e.status === "completed";
                          const a = e.progress === "started";
                          const n = (t = e.execution_data) == null ? undefined : t.session_id;
                          if (s) {
                            return i.jsxs("button", {
                              className: "task-detail-session-completed-btn",
                              onClick: () => {
                                if (n) {
                                  u();
                                  v(`/deep-learn-session/${n}`);
                                }
                              },
                              disabled: !n || p,
                              children: [i.jsx("svg", {
                                className: "task-detail-session-completed-check-icon",
                                width: "14",
                                height: "14",
                                viewBox: "0 0 24 24",
                                fill: "none",
                                xmlns: "http://www.w3.org/2000/svg",
                                children: i.jsx("path", {
                                  d: "M20 6L9 17L4 12",
                                  stroke: "currentColor",
                                  strokeWidth: "2.5",
                                  strokeLinecap: "round",
                                  strokeLinejoin: "round"
                                })
                              }), i.jsxs("div", {
                                className: "task-detail-session-completed-text-wrapper",
                                children: [i.jsx("span", {
                                  className: "task-detail-session-completed-text-default",
                                  children: x("taskDetail.sessionCompleted")
                                }), i.jsxs("span", {
                                  className: "task-detail-session-completed-text-hover",
                                  children: [x("taskDetail.reviewSession"), i.jsx("svg", {
                                    width: "14",
                                    height: "14",
                                    viewBox: "0 0 24 24",
                                    fill: "none",
                                    xmlns: "http://www.w3.org/2000/svg",
                                    style: {
                                      marginLeft: "6px"
                                    },
                                    children: i.jsx("path", {
                                      d: "M5 12H19M19 12L12 5M19 12L12 19",
                                      stroke: "currentColor",
                                      strokeWidth: "2",
                                      strokeLinecap: "round",
                                      strokeLinejoin: "round"
                                    })
                                  })]
                                })]
                              })]
                            });
                          } else {
                            return i.jsxs("div", {
                              style: {
                                display: "flex",
                                alignItems: "center",
                                gap: "12px"
                              },
                              children: [a && i.jsx("button", {
                                className: "task-detail-start-over-btn",
                                onClick: () => {
                                  u();
                                  v(`/deep-learn-session/outline/${e.subtask_id}`, {
                                    state: {
                                      taskId: f.main_task.task_id
                                    }
                                  });
                                },
                                disabled: p,
                                children: x("taskDetail.startOver")
                              }), i.jsxs("button", {
                                className: a ? "task-detail-resume-btn" : "task-detail-start-btn",
                                onClick: () => {
                                  u();
                                  if (a && n) {
                                    v(`/deep-learn-session/${n}`);
                                  } else {
                                    v(`/deep-learn-session/outline/${e.subtask_id}`, {
                                      state: {
                                        taskId: f.main_task.task_id
                                      }
                                    });
                                  }
                                },
                                disabled: a && !n || p,
                                children: [i.jsx("img", {
                                  src: "/pages/mainPages/proactive/start.svg",
                                  alt: x(a ? "taskDetail.resumeSession" : "taskDetail.startSession"),
                                  className: "task-detail-start-icon"
                                }), x(a ? "taskDetail.resumeSession" : "taskDetail.startSession")]
                              })]
                            });
                          }
                        })() : !d && l.length > 0 ? i.jsx("div", {
                          className: "task-detail-generated-file-wrapper",
                          children: l.map(e => {
                            const t = c(e.file_id);
                            return i.jsxs("button", {
                              className: "task-detail-view-file-btn",
                              onClick: () => {
                                if (t) {
                                  window.open(t, "_blank", "noopener,noreferrer");
                                }
                              },
                              disabled: !t,
                              title: e.description || x("taskDetail.viewFile", {
                                name: e.file_name || x("taskDetail.generatedFileFallback")
                              }),
                              children: [i.jsxs("svg", {
                                className: "task-detail-file-btn-icon",
                                width: "16",
                                height: "16",
                                viewBox: "0 0 24 24",
                                fill: "none",
                                xmlns: "http://www.w3.org/2000/svg",
                                children: [i.jsx("path", {
                                  d: "M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z",
                                  stroke: "currentColor",
                                  strokeWidth: "2",
                                  strokeLinecap: "round",
                                  strokeLinejoin: "round"
                                }), i.jsx("path", {
                                  d: "M14 2V8H20",
                                  stroke: "currentColor",
                                  strokeWidth: "2",
                                  strokeLinecap: "round",
                                  strokeLinejoin: "round"
                                })]
                              }), x("taskDetail.viewFile", {
                                name: e.file_name || x("taskDetail.generatedFileFallback")
                              })]
                            }, e.file_id);
                          })
                        }) : null
                      })]
                    })]
                  })]
                }, e.subtask_id);
              })
            })]
          })
        })]
      })]
    }), Q && r.createPortal(i.jsx("div", {
      className: "success-toast",
      children: X
    }), document.body), r.createPortal(i.jsx("div", {
      className: "tdm-quota-toast " + (ve ? "tdm-quota-toast-visible" : ""),
      children: i.jsxs("div", {
        className: "tdm-quota-toast-content",
        children: [i.jsx("div", {
          className: "tdm-quota-toast-text",
          children: je
        }), i.jsx("button", {
          className: "tdm-quota-toast-button",
          onClick: () => {
            xe(false);
            if (we.current) {
              clearTimeout(we.current);
              we.current = null;
            }
            v("/subscription");
          },
          children: x("taskDetail.upgrade")
        })]
      })
    }), document.body), i.jsx(o, {
      isOpen: se,
      onClose: () => ae(false),
      onConfirm: async () => {
        if (f) {
          ie(true);
          try {
            const e = await E(f.main_task.task_id);
            if (e.success) {
              if (!e.failed_task_ids || !(e.failed_task_ids.length > 0)) {
                if (g) {
                  g();
                }
                ae(false);
                u();
              }
            }
          } catch (e) {} finally {
            ie(false);
          }
        }
      },
      title: x("taskDetail.deleteModalTitle"),
      message: i.jsxs(i.Fragment, {
        children: [x("taskDetail.deleteModalMessage"), " ", i.jsx("strong", {
          children: f == null ? undefined : f.main_task.title
        }), x("taskDetail.deleteModalSuffix")]
      }),
      isDeleting: ne
    })]
  });
};
const H = {
  session: "Session & Practice",
  exam: "Exam",
  project: "Project Stage"
};
const I = ({
  task: e,
  onClose: t
}) => {
  const r = s();
  const {
    i18n: o
  } = a();
  const [d, c] = n.useState(null);
  const [u, p] = n.useState("loading");
  const m = e.payload;
  const h = (m == null ? undefined : m.course_id) ?? "";
  const g = (m == null ? undefined : m.course_object_id) ?? "";
  const k = m == null ? undefined : m.course_object_type;
  n.useEffect(() => {
    let e = false;
    if (h && g && k) {
      p("loading");
      c(null);
      S(h).then(t => {
        if (!e) {
          c(t);
          p("ready");
        }
      }).catch(() => {
        if (!e) {
          p("unavailable");
        }
      });
      return () => {
        e = true;
      };
    }
    p("unavailable");
  }, [h, g, k]);
  n.useEffect(() => {
    const e = e => {
      if (e.key === "Escape") {
        t();
      }
    };
    document.addEventListener("keydown", e);
    return () => document.removeEventListener("keydown", e);
  }, [t]);
  const v = (e, s) => {
    t();
    r(e, s ? {
      state: s
    } : undefined);
  };
  return i.jsx("div", {
    className: "course-cal-detail-overlay",
    onClick: t,
    children: i.jsxs("section", {
      className: "course-cal-detail-modal",
      role: "dialog",
      "aria-modal": "true",
      "aria-label": "Course calendar item",
      onClick: e => e.stopPropagation(),
      children: [i.jsx("button", {
        type: "button",
        className: "course-cal-detail-close",
        onClick: t,
        "aria-label": "Close",
        children: i.jsx("svg", {
          width: "16",
          height: "16",
          viewBox: "0 0 24 24",
          fill: "none",
          "aria-hidden": "true",
          children: i.jsx("path", {
            d: "M18 6L6 18M6 6L18 18",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          })
        })
      }), i.jsx("p", {
        className: "course-cal-detail-eyebrow",
        children: k ? H[k] ?? "Course" : "Course"
      }), i.jsxs("h2", {
        className: "course-cal-detail-title",
        children: [e.title, e.completed && i.jsx("span", {
          className: "course-cal-detail-completed-pill",
          children: "Completed"
        })]
      }), i.jsxs("div", {
        className: "course-cal-detail-meta",
        children: [(d == null ? undefined : d.courseTitle) && i.jsx("span", {
          className: "course-cal-detail-course-name",
          children: d.courseTitle
        }), i.jsx("span", {
          className: "course-cal-detail-date",
          children: (e => {
            try {
              return new Date(e).toLocaleDateString(l(o.language), {
                weekday: "short",
                month: "short",
                day: "numeric"
              });
            } catch {
              return e;
            }
          })(e.scheduled_for)
        })]
      }), e.description && i.jsx("p", {
        className: "course-cal-detail-description",
        children: e.description
      }), u === "loading" && i.jsxs("div", {
        className: "course-cal-detail-loading",
        children: [i.jsx("span", {
          className: "course-cal-detail-spinner",
          "aria-hidden": "true"
        }), "Loading course…"]
      }), u === "unavailable" && i.jsxs(i.Fragment, {
        children: [i.jsx("p", {
          className: "course-cal-detail-unavailable",
          children: "This course is no longer available."
        }), i.jsx("div", {
          className: "course-cal-detail-actions",
          children: i.jsx("button", {
            type: "button",
            className: "course-cal-detail-btn",
            onClick: t,
            children: "Close"
          })
        })]
      }), u === "ready" && i.jsxs("div", {
        className: "course-cal-detail-actions",
        children: [k === "session" && i.jsxs(i.Fragment, {
          children: [i.jsx("button", {
            type: "button",
            className: "course-cal-detail-btn course-cal-detail-btn--primary",
            onClick: () => {
              const t = d ? ((e, t) => {
                for (const s of e.units ?? []) {
                  const e = s.lectures ?? (s.lecture ? [s.lecture] : []);
                  for (const s of e) {
                    for (const e of s.sessions ?? []) {
                      if ((e.conversationId || e.sessionId) === t) {
                        return e;
                      }
                    }
                  }
                }
                return null;
              })(d, g) : null;
              const s = (t == null ? undefined : t.session_type) === "pdf_annotate" ? "pdf-annotate" : (t == null ? undefined : t.session_type) === "whiteboard" ? "whiteboard" : null;
              if (t && s) {
                v(`/course/${encodeURIComponent(h)}/sessions/${s}/${encodeURIComponent(g)}`, {
                  sessionTitle: e.title
                });
              } else {
                v(`/course/${encodeURIComponent(h)}`);
              }
            },
            children: "Start Learning"
          }), i.jsx("button", {
            type: "button",
            className: "course-cal-detail-btn",
            onClick: () => {
              v(`/course/${encodeURIComponent(h)}/practice/${encodeURIComponent(g)}`);
            },
            children: "Practice"
          })]
        }), k === "exam" && i.jsx("button", {
          type: "button",
          className: "course-cal-detail-btn course-cal-detail-btn--primary",
          onClick: () => {
            v(`/course/${encodeURIComponent(h)}/exam/${encodeURIComponent(g)}`);
          },
          children: "Start Exam"
        }), k === "project" && i.jsx("button", {
          type: "button",
          className: "course-cal-detail-btn course-cal-detail-btn--primary",
          onClick: () => {
            v(`/course/${encodeURIComponent(h)}/project/${encodeURIComponent(g)}`);
          },
          children: "Start Project Stage"
        })]
      })]
    })
  });
};
const B = () => i.jsx("div", {
  className: "pending-tasks-view pending-tasks-skeleton",
  children: i.jsx("div", {
    className: "sources-row-container",
    children: i.jsx("div", {
      className: "sources-row",
      children: [0, 1, 2].map(e => i.jsxs("div", {
        className: "pending-skeleton-column",
        children: [i.jsxs("div", {
          className: "pending-skeleton-source-header",
          children: [i.jsx("div", {
            className: "pending-skeleton-label"
          }), i.jsxs("div", {
            className: "pending-skeleton-source-card",
            children: [i.jsx("div", {
              className: "pending-skeleton-source-icon"
            }), i.jsxs("div", {
              className: "pending-skeleton-source-details",
              children: [i.jsx("div", {
                className: "pending-skeleton-source-title"
              }), i.jsx("div", {
                className: "pending-skeleton-source-title-short"
              })]
            })]
          })]
        }), i.jsx("div", {
          className: "pending-skeleton-tasks-label"
        }), i.jsxs("div", {
          className: "pending-skeleton-due-card",
          style: {
            animationDelay: e * 0.08 + "s"
          },
          children: [i.jsx("div", {
            className: "pending-skeleton-due-bar"
          }), i.jsxs("div", {
            className: "pending-skeleton-due-body",
            children: [i.jsx("div", {
              className: "pending-skeleton-due-icon"
            }), i.jsxs("div", {
              className: "pending-skeleton-due-content",
              children: [i.jsx("div", {
                className: "pending-skeleton-due-title"
              }), i.jsx("div", {
                className: "pending-skeleton-due-date"
              })]
            })]
          })]
        }), [0, 1, 2].map((t, s) => i.jsxs("div", {
          className: "pending-skeleton-task-card",
          style: {
            animationDelay: e * 0.08 + (s + 1) * 0.1 + "s"
          },
          children: [i.jsx("div", {
            className: "pending-skeleton-task-title"
          }), i.jsx("div", {
            className: "pending-skeleton-task-subtitle"
          }), i.jsxs("div", {
            className: "pending-skeleton-task-footer",
            children: [i.jsx("div", {
              className: "pending-skeleton-task-actions"
            }), i.jsx("div", {
              className: "pending-skeleton-task-review-btn"
            })]
          })]
        }, s))]
      }, e))
    })
  })
});
const W = ({
  onTasksApproved: s,
  onSourceCountChange: o
}) => {
  const {
    t: l
  } = a();
  const [p, m] = n.useState(null);
  const [h, g] = n.useState(null);
  const [k, v] = n.useState([]);
  const [x, j] = n.useState([]);
  const [f, w] = n.useState(true);
  const [N, _] = n.useState(null);
  const [y, b] = n.useState(new Set());
  const [D, C] = n.useState(new Set());
  const [S, L] = n.useState(new Set());
  const [T, M] = n.useState(new Set());
  const [E, H] = n.useState(new Set());
  const [I, W] = n.useState(new Set());
  const [R, A] = n.useState(null);
  const [V, U] = n.useState("due");
  const [Y, q] = n.useState(new Date().getMonth());
  const [z, K] = n.useState(new Date().getFullYear());
  const [Z, J] = n.useState({
    top: 0,
    left: 0
  });
  const [Q, G] = n.useState(null);
  const [X, ee] = n.useState(null);
  const [te, se] = n.useState(null);
  const [ae, ne] = n.useState(null);
  const [ie, re] = n.useState(null);
  const [oe, le] = n.useState(null);
  const [de, ce] = n.useState("start");
  const [ue, pe] = n.useState(false);
  const [me, he] = n.useState(false);
  const [ge, ke] = n.useState("");
  const ve = n.useRef(null);
  const xe = n.useRef({});
  const [je, fe] = n.useState(null);
  const [we, Ne] = n.useState("");
  const [_e, ye] = n.useState(false);
  const [be, De] = n.useState(new Set());
  const [Ce, Se] = n.useState(new Set());
  const [Le, Te] = n.useState({
    left: 0
  });
  const Me = n.useRef(null);
  const Ee = n.useRef(null);
  n.useEffect(() => {
    if (!f && o) {
      o(k.length);
    }
  }, [k, f]);
  const Fe = e => {
    try {
      const t = new Date(e);
      return c(t, {
        month: "short",
        day: "numeric"
      });
    } catch (t) {
      return e;
    }
  };
  const Pe = e => {
    try {
      new Date(e);
      return Fe(e);
    } catch (t) {
      return e;
    }
  };
  n.useEffect(() => {
    (async () => {
      w(true);
      _(null);
      const s = await (async () => {
        try {
          const s = e();
          if (!s) {
            return {
              success: false,
              message: "No access token found. Please log in again.",
              error: "NO_TOKEN"
            };
          }
          const a = t("/api/v1/calendar/list_pending_main_tasks");
          const n = await fetch(a, {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${s}`
            }
          });
          if (!n.ok) {
            const e = await n.json().catch(() => ({}));
            return {
              success: false,
              message: e.message || e.detail || `HTTP error! status: ${n.status}`,
              error: `HTTP_${n.status}`
            };
          }
          const i = await n.json();
          if (i.success) {
            return i;
          } else {
            return {
              success: false,
              message: "Unexpected response format",
              error: "INVALID_RESPONSE"
            };
          }
        } catch (N) {
          return {
            success: false,
            message: N instanceof Error ? N.message : "Unknown error occurred",
            error: "NETWORK_ERROR"
          };
        }
      })();
      if (s.success) {
        const e = new Map();
        const t = [];
        s.tasks.forEach(s => {
          const a = function (e) {
            var t;
            if (!e) {
              return {
                id: "no-source",
                type: "announcement",
                title: u.t("pendingTasks.noSourceTitle")
              };
            }
            if (e.source_type === "canvas" && e.canvas_course_id) {
              const s = (t = e.canvas_course_name) == null ? undefined : t.trim();
              return {
                id: `canvas:${e.canvas_course_id}`,
                type: "canvas",
                title: s || u.t("pendingTasks.courseFallbackTitle", {
                  id: e.canvas_course_id
                })
              };
            }
            if (e.files_info && e.files_info.length > 0) {
              const t = e.files_info[0];
              return {
                id: t.file_id,
                type: "file",
                title: t.file_name,
                fileName: t.file_name,
                fileExt: t.file_ext
              };
            }
            if (e.file_ids && e.file_ids.length > 0) {
              const t = e.file_ids[0];
              return {
                id: t,
                type: "file",
                title: u.t("pendingTasks.fileFallbackTitle", {
                  id: t
                })
              };
            }
            return {
              id: "no-source",
              type: "announcement",
              title: u.t("pendingTasks.noSourceTitle")
            };
          }(s.origin_data);
          const {
            id: n,
            type: i,
            title: r,
            fileName: o,
            fileExt: l
          } = a;
          if (!e.has(n)) {
            e.set(n, {
              id: n,
              type: i,
              title: r,
              fileName: o,
              fileExt: l
            });
          }
          const d = s.type === "due-new" || s.type === "due-update";
          const c = {
            id: s.task_id,
            type: d ? "due" : "todo",
            isUpdate: s.type === "due-update" || s.type === "todo-update",
            title: s.title,
            sourceId: n,
            status: "pending"
          };
          if (d) {
            if (s.due_at) {
              c.due_date = Pe(s.due_at);
              c.rawDueDate = s.due_at;
            }
          } else {
            c.subtitle = s.description;
            if (s.scheduled_for) {
              c.startDate = Fe(s.scheduled_for);
              c.rawStartDate = s.scheduled_for;
            }
            if (s.due_at) {
              c.endDate = Fe(s.due_at);
              c.rawEndDate = s.due_at;
            }
          }
          t.push(c);
        });
        v(Array.from(e.values()));
        j(t);
      } else {
        const e = "message" in s ? s.message : l("pendingTasks.loadFailed");
        _(e);
      }
      w(false);
    })();
  }, []);
  const $e = e => x.filter(t => t.sourceId === e).sort((e, t) => e.type === t.type ? 0 : e.type === "due" ? -1 : 1);
  const Oe = e => {
    var t;
    switch (((t = e.split(".").pop()) == null ? undefined : t.toLowerCase()) || "") {
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
      case "doc":
      case "docx":
        return "/pages/mainPages/drive/file_icons/doc.svg";
      default:
        return "/pages/mainPages/drive/file_icons/folder_default.svg";
    }
  };
  const He = async e => {
    b(t => new Set(t).add(e));
    const t = await F(e);
    if (t.success && t.total_succeeded > 0) {
      const t = x.find(t => t.id === e);
      const a = (t == null ? undefined : t.type) === "todo" ? 1 : 0;
      const n = (t == null ? undefined : t.type) === "due" ? 1 : 0;
      const i = t == null ? undefined : t.sourceId;
      const r = x.filter(t => t.sourceId === i && t.id !== e).length === 0;
      H(t => new Set(t).add(e));
      setTimeout(() => {
        j(t => t.filter(t => t.id !== e));
        H(t => {
          const s = new Set(t);
          s.delete(e);
          return s;
        });
        if (r && i) {
          W(e => new Set(e).add(i));
          setTimeout(() => {
            v(e => e.filter(e => e.id !== i));
            W(e => {
              const t = new Set(e);
              t.delete(i);
              return t;
            });
          }, 400);
        }
      }, 350);
      if (s) {
        s(a, n);
      }
    }
    b(t => {
      const s = new Set(t);
      s.delete(e);
      return s;
    });
  };
  const Ie = async e => {
    var t;
    L(t => new Set(t).add(e));
    const s = await F(e, "reject");
    if (s.success && s.total_succeeded > 0) {
      const s = (t = x.find(t => t.id === e)) == null ? undefined : t.sourceId;
      const a = x.filter(t => t.sourceId === s && t.id !== e).length === 0;
      H(t => new Set(t).add(e));
      setTimeout(() => {
        j(t => t.filter(t => t.id !== e));
        H(t => {
          const s = new Set(t);
          s.delete(e);
          return s;
        });
        if (a && s) {
          W(e => new Set(e).add(s));
          setTimeout(() => {
            v(e => e.filter(e => e.id !== s));
            W(e => {
              const t = new Set(e);
              t.delete(s);
              return t;
            });
          }, 400);
        }
      }, 350);
    }
    L(t => {
      const s = new Set(t);
      s.delete(e);
      return s;
    });
  };
  const Be = () => {
    A(null);
    G(null);
    ee(null);
    se(null);
    ne(null);
    re(null);
    le(null);
    ce("start");
  };
  const We = (e, t, s, a) => {
    e.stopPropagation();
    if (R === t && V === s) {
      Be();
      return;
    }
    const n = e.currentTarget.getBoundingClientRect();
    const i = window.innerHeight - n.bottom;
    const r = n.top;
    J(i < 290 && r > i ? {
      top: n.top - 290 - 6,
      left: n.left
    } : {
      top: n.bottom + 6,
      left: n.left
    });
    if (s === "range") {
      const e = x.find(e => e.id === t);
      if (e) {
        const t = e.rawStartDate || null;
        const s = e.rawEndDate || null;
        if (t) {
          const e = new Date(t);
          q(e.getMonth());
          K(e.getFullYear());
        } else {
          const e = new Date();
          q(e.getMonth());
          K(e.getFullYear());
        }
        re(t);
        le(s);
        se(t);
        ne(s);
        ce("start");
      }
    } else if (a) {
      const e = new Date(a);
      q(e.getMonth());
      K(e.getFullYear());
      ee(a);
      G(a);
    } else {
      const e = new Date();
      q(e.getMonth());
      K(e.getFullYear());
      ee(null);
      G(null);
    }
    A(t);
    U(s);
  };
  n.useEffect(() => {
    const e = e => {
      if (ve.current && !ve.current.contains(e.target)) {
        Be();
      }
    };
    if (R) {
      document.addEventListener("mousedown", e);
    }
    return () => document.removeEventListener("mousedown", e);
  }, [R]);
  const Re = e => {
    ke(e);
    he(true);
    setTimeout(() => he(false), 3000);
  };
  const Ae = (e, t) => {
    e.stopPropagation();
    if (je === t) {
      fe(null);
      Ne("");
      return;
    }
    const s = e.currentTarget.getBoundingClientRect();
    const a = window.innerHeight - s.bottom;
    const n = Math.min(s.left, window.innerWidth - 280 - 14);
    const i = t.startsWith("source-");
    Te(i || a < 64 ? {
      bottom: window.innerHeight - s.top + 6,
      left: n
    } : {
      top: s.bottom + 6,
      left: n
    });
    fe(t);
    Ne("");
    setTimeout(() => {
      var e;
      if ((e = Ee.current) == null) {
        return undefined;
      } else {
        return e.focus();
      }
    }, 100);
  };
  n.useEffect(() => {
    const e = e => {
      if (Me.current && !Me.current.contains(e.target)) {
        fe(null);
        Ne("");
      }
    };
    if (je) {
      document.addEventListener("mousedown", e);
    }
    return () => document.removeEventListener("mousedown", e);
  }, [je]);
  const Ve = e => {
    if (e.key === "Enter" && !e.shiftKey && !d(e)) {
      e.preventDefault();
      Ue();
    }
  };
  const Ue = async () => {
    if (!we.trim() || _e || !je) {
      return;
    }
    if (je.startsWith("source-")) {
      const s = je.replace("source-", "");
      const a = we.trim();
      Ne("");
      fe(null);
      Se(e => new Set(e).add(s));
      const n = await (async (s, a) => {
        try {
          const n = e();
          if (!n) {
            return {
              success: false,
              message: "No access token found. Please log in again.",
              error: "NO_TOKEN"
            };
          }
          const i = t("/api/v1/calendar/update_tasks");
          const r = {
            file_id: s,
            comment: a
          };
          const o = await fetch(i, {
            method: "POST",
            headers: {
              accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${n}`
            },
            body: JSON.stringify(r)
          });
          if (!o.ok) {
            const e = await o.json().catch(() => ({}));
            return {
              success: false,
              message: e.message || e.detail || `HTTP error! status: ${o.status}`,
              error: `HTTP_${o.status}`
            };
          }
          const l = await o.json();
          if (l.success) {
            return l;
          } else {
            return {
              success: false,
              message: l.message || "Unexpected response format",
              error: "INVALID_RESPONSE"
            };
          }
        } catch (N) {
          return {
            success: false,
            message: N instanceof Error ? N.message : "Unknown error occurred",
            error: "NETWORK_ERROR"
          };
        }
      })(s, a);
      Se(e => {
        const t = new Set(e);
        t.delete(s);
        return t;
      });
      if (!n.success) {
        return;
      }
      const i = n.tasks.map(e => {
        const t = {
          id: e.task_id,
          type: e.type === "due-new" ? "due" : "todo",
          title: e.title,
          sourceId: s,
          status: "pending",
          subtitle: undefined,
          due_date: undefined,
          rawDueDate: undefined,
          startDate: undefined,
          rawStartDate: undefined,
          endDate: undefined,
          rawEndDate: undefined
        };
        if (e.type === "todo-new") {
          t.subtitle = e.description || undefined;
          if (e.scheduled_for) {
            t.startDate = Fe(e.scheduled_for);
            t.rawStartDate = e.scheduled_for;
          }
          if (e.due_at) {
            t.endDate = Fe(e.due_at);
            t.rawEndDate = e.due_at;
          }
        } else if (e.type === "due-new" && e.due_at) {
          t.due_date = Pe(e.due_at);
          t.rawDueDate = e.due_at;
        }
        return t;
      });
      j(e => [...e.filter(e => e.sourceId !== s), ...i]);
      Re(l("pendingTasks.tasksUpdated", {
        count: n.count
      }));
      return;
    }
    const s = je;
    const a = we.trim();
    Ne("");
    fe(null);
    ye(false);
    De(e => new Set(e).add(s));
    const n = await $(s, a);
    De(e => {
      const t = new Set(e);
      t.delete(s);
      return t;
    });
    if (!n.success) {
      return;
    }
    const i = n.main_task;
    const r = i.type === "due-new" ? "due" : "todo";
    j(e => e.map(e => {
      if (e.id !== s) {
        return e;
      }
      const t = {
        id: e.id,
        sourceId: e.sourceId,
        status: e.status,
        title: i.title,
        type: r,
        subtitle: undefined,
        due_date: undefined,
        rawDueDate: undefined,
        startDate: undefined,
        rawStartDate: undefined,
        endDate: undefined,
        rawEndDate: undefined
      };
      if (r === "todo") {
        t.subtitle = i.description || undefined;
        if (i.scheduled_for) {
          t.startDate = Fe(i.scheduled_for);
          t.rawStartDate = i.scheduled_for;
        }
        if (i.due_at) {
          t.endDate = Fe(i.due_at);
          t.rawEndDate = i.due_at;
        }
      } else if (i.due_at) {
        t.due_date = Pe(i.due_at);
        t.rawDueDate = i.due_at;
      }
      return t;
    }));
    Re(l("pendingTasks.taskUpdated"));
  };
  const Ye = e => je !== e ? null : r.createPortal(i.jsxs("div", {
    ref: Me,
    className: "pending-comment-panel",
    style: {
      position: "fixed",
      ...(Le.top !== undefined ? {
        top: Le.top
      } : {}),
      ...(Le.bottom !== undefined ? {
        bottom: Le.bottom
      } : {}),
      left: Le.left
    },
    onClick: e => e.stopPropagation(),
    children: [i.jsx("textarea", {
      ref: Ee,
      className: "pending-comment-textarea",
      placeholder: l("pendingTasks.commentPlaceholder"),
      value: we,
      onChange: e => {
        Ne(e.target.value);
        e.target.style.height = "auto";
        e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
      },
      onKeyDown: Ve,
      rows: 1,
      disabled: _e
    }), i.jsx("button", {
      className: "pending-comment-send-btn " + (we.trim() ? "active" : ""),
      onClick: Ue,
      disabled: !we.trim() || _e,
      children: _e ? i.jsx("div", {
        className: "pending-comment-send-spinner"
      }) : i.jsx("svg", {
        width: "14",
        height: "14",
        viewBox: "0 0 24 24",
        fill: "none",
        children: i.jsx("path", {
          d: "M5 12L3 21L21 12L3 3L5 12ZM5 12H13",
          stroke: "currentColor",
          strokeWidth: "2",
          strokeLinecap: "round",
          strokeLinejoin: "round"
        })
      })
    })]
  }), document.body);
  const qe = (e, t) => e.getFullYear() === t.getFullYear() && e.getMonth() === t.getMonth() && e.getDate() === t.getDate();
  const ze = () => {
    if (V === "range") {
      if (!te || !ae || !ie || !oe) {
        return false;
      }
      const e = !qe(new Date(te), new Date(ie));
      const t = !qe(new Date(ae), new Date(oe));
      return e || t;
    }
    return !!Q && !!X && !qe(new Date(Q), new Date(X));
  };
  const Ke = [l("proactive.months.january"), l("proactive.months.february"), l("proactive.months.march"), l("proactive.months.april"), l("proactive.months.may"), l("proactive.months.june"), l("proactive.months.july"), l("proactive.months.august"), l("proactive.months.september"), l("proactive.months.october"), l("proactive.months.november"), l("proactive.months.december")];
  const Ze = (e, t, s) => {
    const a = R === e && V === "range";
    const n = R === e && V === t;
    let r = s;
    let o = null;
    if (!a || t !== "start" && t !== "end") {
      if (n && Q) {
        r = Q;
        o = X;
      }
    } else if (t === "start") {
      r = te || s;
      o = ie;
    } else {
      r = ae || s;
      o = oe;
    }
    if (!r) {
      return null;
    }
    if ((n || a && (t === "start" || t === "end")) && o) {
      const e = new Date(o);
      const t = new Date(r);
      const s = t.getMonth() !== e.getMonth() || t.getFullYear() !== e.getFullYear();
      const a = t.getDate() !== e.getDate();
      if (s || a) {
        const e = c(t, {
          month: "short"
        });
        const n = t.getDate();
        return i.jsxs("span", {
          children: [i.jsx("span", {
            className: s ? "date-part-changed" : "",
            children: e
          }), " ", i.jsx("span", {
            className: a ? "date-part-changed" : "",
            children: n
          })]
        });
      }
    }
    return i.jsx("span", {
      children: Fe(r)
    });
  };
  const Je = e => {
    const t = ["date-picker-day"];
    if (!e.isCurrentMonth) {
      t.push("other-month");
      return t.join(" ");
    }
    if ((e => {
      const t = new Date();
      return t.getFullYear() === z && t.getMonth() === Y && t.getDate() === e;
    })(e.day)) {
      t.push("today");
    }
    if (V === "range") {
      const s = (e => {
        if (V !== "range" || !te) {
          return false;
        }
        const t = new Date(te);
        return t.getFullYear() === z && t.getMonth() === Y && t.getDate() === e;
      })(e.day);
      const a = (e => {
        if (V !== "range" || !ae) {
          return false;
        }
        const t = new Date(ae);
        return t.getFullYear() === z && t.getMonth() === Y && t.getDate() === e;
      })(e.day);
      if (s || a) {
        t.push("selected");
      }
      if (s) {
        t.push("range-start");
      }
      if (a) {
        t.push("range-end");
      }
      if ((e => {
        if (V !== "range" || !te || !ae) {
          return false;
        }
        const t = new Date(z, Y, e);
        const s = new Date(te);
        const a = new Date(ae);
        t.setHours(0, 0, 0, 0);
        s.setHours(0, 0, 0, 0);
        a.setHours(0, 0, 0, 0);
        return t > s && t < a;
      })(e.day)) {
        t.push("in-range");
      }
    } else if ((e => {
      if (!R || V === "range") {
        return false;
      }
      const t = Q || (() => {
        const e = x.find(e => e.id === R);
        if (e) {
          if (V === "due") {
            return e.rawDueDate;
          } else if (V === "start") {
            return e.rawStartDate;
          } else {
            return e.rawEndDate;
          }
        }
      })();
      if (!t) {
        return false;
      }
      const s = new Date(t);
      return s.getFullYear() === z && s.getMonth() === Y && s.getDate() === e;
    })(e.day)) {
      t.push("selected");
    }
    return t.join(" ");
  };
  const Qe = (e, t) => {
    if (R !== e || V !== t) {
      return null;
    }
    const s = (() => {
      const e = new Date(z, Y + 1, 0).getDate();
      const t = new Date(z, Y, 1).getDay();
      const s = [];
      const a = new Date(z, Y, 0).getDate();
      for (let i = t - 1; i >= 0; i--) {
        s.push({
          day: a - i,
          isCurrentMonth: false
        });
      }
      for (let i = 1; i <= e; i++) {
        s.push({
          day: i,
          isCurrentMonth: true
        });
      }
      const n = 7 - s.length % 7;
      if (n < 7) {
        for (let i = 1; i <= n; i++) {
          s.push({
            day: i,
            isCurrentMonth: false
          });
        }
      }
      return s;
    })();
    return r.createPortal(i.jsxs("div", {
      className: "date-picker-dropdown",
      ref: ve,
      style: {
        top: Z.top,
        left: Z.left
      },
      onClick: e => e.stopPropagation(),
      children: [i.jsxs("div", {
        className: "date-picker-header",
        children: [i.jsx("button", {
          className: "date-picker-nav-btn",
          onClick: e => {
            e.stopPropagation();
            if (Y === 0) {
              q(11);
              K(z - 1);
            } else {
              q(Y - 1);
            }
          },
          children: i.jsx("svg", {
            width: "12",
            height: "12",
            viewBox: "0 0 24 24",
            fill: "none",
            children: i.jsx("path", {
              d: "M15 18L9 12L15 6",
              stroke: "currentColor",
              strokeWidth: "2",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            })
          })
        }), i.jsxs("span", {
          className: "date-picker-month-label",
          children: [Ke[Y], " ", z]
        }), i.jsx("button", {
          className: "date-picker-nav-btn",
          onClick: e => {
            e.stopPropagation();
            if (Y === 11) {
              q(0);
              K(z + 1);
            } else {
              q(Y + 1);
            }
          },
          children: i.jsx("svg", {
            width: "12",
            height: "12",
            viewBox: "0 0 24 24",
            fill: "none",
            children: i.jsx("path", {
              d: "M9 18L15 12L9 6",
              stroke: "currentColor",
              strokeWidth: "2",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            })
          })
        })]
      }), i.jsx("div", {
        className: "date-picker-weekdays",
        children: l("pendingTasks.datepickerWeekdays", {
          returnObjects: true
        }).map((e, t) => i.jsx("div", {
          className: "date-picker-weekday",
          children: e
        }, t))
      }), i.jsx("div", {
        className: "date-picker-days",
        children: s.map((e, t) => i.jsx("button", {
          className: Je(e),
          onClick: t => {
            t.stopPropagation();
            if (e.isCurrentMonth) {
              (e => {
                if (!R) {
                  return;
                }
                const t = new Date(z, Y, e);
                const s = t.toISOString();
                if (V === "range") {
                  if (de === "start") {
                    se(s);
                    if (ae && t > new Date(ae)) {
                      ne(s);
                    }
                    ce("end");
                  } else {
                    if (t < (te ? new Date(te) : t)) {
                      ne(te);
                      se(s);
                    } else {
                      ne(s);
                    }
                    ce("start");
                  }
                } else {
                  G(s);
                }
              })(e.day);
            }
          },
          disabled: !e.isCurrentMonth,
          children: e.day
        }, t))
      }), i.jsx("div", {
        className: "date-picker-footer",
        children: i.jsx("button", {
          className: "date-picker-confirm-btn",
          onClick: e => {
            e.stopPropagation();
            (async () => {
              if (!R) {
                return;
              }
              pe(true);
              if (V === "range") {
                if (!te || !ae) {
                  pe(false);
                  return;
                }
                const e = await P(R, te, ae);
                pe(false);
                if (!e.success) {
                  return;
                }
                j(e => e.map(e => e.id !== R ? e : {
                  ...e,
                  startDate: Fe(te),
                  rawStartDate: te,
                  endDate: Fe(ae),
                  rawEndDate: ae
                }));
                const t = !qe(new Date(te), new Date(ie));
                const s = !qe(new Date(ae), new Date(oe));
                const a = t && s ? l("pendingTasks.datesUpdated", {
                  label: l("pendingTasks.startAndDueLabel")
                }) : l(t ? "pendingTasks.startDateUpdated" : "pendingTasks.dueDateUpdated");
                Be();
                Re(a);
                return;
              }
              if (!Q) {
                pe(false);
                return;
              }
              let e;
              let t;
              if (V === "due") {
                t = Q;
              } else if (V === "start") {
                e = Q;
              } else {
                t = Q;
              }
              const s = await P(R, e, t);
              pe(false);
              if (!s.success) {
                return;
              }
              const a = Fe(Q);
              j(e => e.map(e => e.id !== R ? e : V === "due" ? {
                ...e,
                due_date: a,
                rawDueDate: Q
              } : V === "start" ? {
                ...e,
                startDate: a,
                rawStartDate: Q
              } : {
                ...e,
                endDate: a,
                rawEndDate: Q
              }));
              Be();
              Re(l(V === "due" ? "pendingTasks.dueDateUpdated" : "pendingTasks.startDateUpdated"));
            })();
          },
          disabled: !ze() || ue,
          children: l(ue ? "pendingTasks.updating" : "pendingTasks.confirm")
        })
      })]
    }), document.body);
  };
  if (f) {
    return i.jsx(B, {});
  } else if (N) {
    return i.jsx("div", {
      className: "pending-tasks-view",
      children: i.jsx("div", {
        style: {
          padding: "20px",
          textAlign: "center",
          color: "#EF4444"
        },
        children: l("pendingTasks.errorPrefix", {
          message: N
        })
      })
    });
  } else {
    return i.jsxs("div", {
      className: "pending-tasks-view",
      children: [i.jsx("div", {
        className: "sources-row-container",
        children: i.jsx("div", {
          className: "sources-row",
          children: k.map((e, t) => i.jsxs("div", {
            className: `source-column source-column-enter ${p === e.id ? "selected" : ""} ${I.has(e.id) ? "removing" : ""} ${Ce.has(e.id) ? "commenting" : ""}`,
            style: {
              animationDelay: t * 0.1 + "s"
            },
            onClick: () => m(p === e.id ? null : e.id),
            children: [Ce.has(e.id) && i.jsxs("div", {
              className: "source-comment-loading-overlay",
              children: [i.jsx("div", {
                className: "source-comment-loading-spinner"
              }), i.jsx("div", {
                className: "source-comment-loading-text",
                children: l("pendingTasks.updatingTasksFromSource")
              })]
            }), i.jsxs("div", {
              className: "source-header",
              children: [i.jsx("div", {
                className: "source-label",
                children: l("pendingTasks.source")
              }), i.jsxs("div", {
                className: "source-card",
                children: [i.jsx("div", {
                  className: "source-icon-container",
                  children: e.type === "file" ? i.jsx("img", {
                    src: Oe(e.fileName || (e.fileExt ? `file${e.fileExt}` : "")),
                    alt: "",
                    className: "source-file-icon"
                  }) : i.jsx("img", {
                    src: "/pages/mainPages/home/canvas-logo.svg",
                    alt: "",
                    className: "source-announcement-icon-img"
                  })
                }), i.jsx("div", {
                  className: "source-details",
                  children: i.jsx("div", {
                    className: "source-title",
                    title: e.title,
                    children: e.title
                  })
                }), i.jsx("button", {
                  className: "source-open-btn",
                  title: l("pendingTasks.openSource"),
                  children: i.jsx("img", {
                    src: "/pages/mainPages/proactive/link-external.svg",
                    alt: "Open Source",
                    className: "source-open-icon"
                  })
                })]
              })]
            }), i.jsxs("div", {
              className: "source-tasks-list",
              onScroll: t => ((e, t) => {
                const s = e.currentTarget;
                s.classList.add("is-scrolling");
                clearTimeout(xe.current[t]);
                xe.current[t] = setTimeout(() => {
                  s.classList.remove("is-scrolling");
                }, 800);
              })(t, e.id),
              children: [i.jsx("div", {
                className: "tasks-label",
                children: l("pendingTasks.extractedTasksDues")
              }), $e(e.id).map(e => e.type === "due" ? i.jsxs("div", {
                className: `pending-due-item ${E.has(e.id) ? "removing" : ""} ${be.has(e.id) ? "commenting" : ""}`,
                onClick: () => g(e.id),
                children: [i.jsx("div", {
                  className: "pending-due-bar"
                }), i.jsxs("div", {
                  className: "pending-due-content-wrapper",
                  children: [i.jsxs("div", {
                    className: "pending-due-header",
                    children: [i.jsx("div", {
                      className: "pending-due-icon",
                      children: i.jsx("svg", {
                        width: "16",
                        height: "16",
                        viewBox: "0 0 24 24",
                        fill: "none",
                        xmlns: "http://www.w3.org/2000/svg",
                        children: i.jsx("path", {
                          d: "M8 7V3M16 7V3M5 10H19M5 21H19C20.1046 21 21 20.1046 21 19V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V19C3 20.1046 3.89543 21 5 21Z",
                          stroke: "currentColor",
                          strokeWidth: "2",
                          strokeLinecap: "round",
                          strokeLinejoin: "round"
                        })
                      })
                    }), i.jsxs("div", {
                      className: "pending-due-info",
                      children: [i.jsx("div", {
                        className: "pending-due-title",
                        children: e.title
                      }), e.due_date && i.jsxs("div", {
                        className: "pending-due-date-row",
                        children: [i.jsxs("div", {
                          className: "pending-due-date",
                          children: [l("pendingTasks.dueOn"), Ze(e.id, "due", e.rawDueDate)]
                        }), i.jsx("button", {
                          className: "date-edit-btn",
                          title: l("pendingTasks.editDate"),
                          onClick: t => We(t, e.id, "due", e.rawDueDate),
                          children: i.jsx("img", {
                            src: "/pages/mainPages/proactive/edit.svg",
                            alt: "Edit",
                            className: "date-edit-icon"
                          })
                        }), Qe(e.id, "due"), e.isUpdate && i.jsx("span", {
                          className: "due-task-update-badge",
                          children: l("pendingTasks.update")
                        })]
                      })]
                    })]
                  }), i.jsxs("div", {
                    className: "pending-due-actions",
                    children: [i.jsxs("div", {
                      className: "pending-due-actions-left",
                      children: [i.jsx("button", {
                        className: "task-card-action-btn comment " + (je === e.id ? "active" : ""),
                        title: l("pendingTasks.comment"),
                        onClick: t => Ae(t, e.id),
                        children: i.jsx("img", {
                          src: "/pages/mainPages/proactive/comment.svg",
                          alt: "Comment",
                          className: "task-action-icon-img"
                        })
                      }), Ye(e.id), i.jsx("button", {
                        className: "task-card-action-btn confirm",
                        title: l("pendingTasks.confirm"),
                        onClick: t => {
                          t.stopPropagation();
                          He(e.id);
                        },
                        disabled: y.has(e.id),
                        children: y.has(e.id) ? i.jsx("div", {
                          className: "confirm-loading-spinner"
                        }) : i.jsx("svg", {
                          width: "14",
                          height: "14",
                          viewBox: "0 0 24 24",
                          fill: "none",
                          xmlns: "http://www.w3.org/2000/svg",
                          children: i.jsx("path", {
                            d: "M20 6L9 17L4 12",
                            stroke: "currentColor",
                            strokeWidth: "2",
                            strokeLinecap: "round",
                            strokeLinejoin: "round"
                          })
                        })
                      }), i.jsx("button", {
                        className: "task-card-action-btn reject",
                        title: l("pendingTasks.reject"),
                        onClick: t => {
                          t.stopPropagation();
                          Ie(e.id);
                        },
                        disabled: S.has(e.id),
                        children: S.has(e.id) ? i.jsx("div", {
                          className: "reject-loading-spinner"
                        }) : i.jsxs("svg", {
                          width: "14",
                          height: "14",
                          viewBox: "0 0 24 24",
                          fill: "none",
                          xmlns: "http://www.w3.org/2000/svg",
                          children: [i.jsx("path", {
                            d: "M18 6L6 18",
                            stroke: "currentColor",
                            strokeWidth: "2",
                            strokeLinecap: "round",
                            strokeLinejoin: "round"
                          }), i.jsx("path", {
                            d: "M6 6L18 18",
                            stroke: "currentColor",
                            strokeWidth: "2",
                            strokeLinecap: "round",
                            strokeLinejoin: "round"
                          })]
                        })
                      })]
                    }), i.jsx("button", {
                      className: "pending-task-action-btn",
                      children: l("pendingTasks.review")
                    })]
                  })]
                })]
              }, e.id) : i.jsxs("div", {
                className: `pending-task-card ${e.isUpdate ? "has-update" : ""} ${E.has(e.id) ? "removing" : ""} ${be.has(e.id) ? "commenting" : ""}`,
                onClick: () => g(e.id),
                children: [e.isUpdate && i.jsx("span", {
                  className: "existing-task-update-tag",
                  children: l("pendingTasks.update")
                }), i.jsxs("div", {
                  className: "pending-task-content",
                  children: [i.jsx("div", {
                    className: "pending-task-title",
                    children: e.title
                  }), e.subtitle && i.jsx("div", {
                    className: "pending-task-subtitle",
                    children: e.subtitle
                  }), e.startDate && e.endDate && i.jsxs("div", {
                    className: "pending-task-dates-row",
                    children: [i.jsxs("div", {
                      className: "pending-task-dates",
                      children: [i.jsx("svg", {
                        width: "12",
                        height: "12",
                        viewBox: "0 0 24 24",
                        fill: "none",
                        xmlns: "http://www.w3.org/2000/svg",
                        className: "pending-task-date-icon",
                        children: i.jsx("path", {
                          d: "M8 7V3M16 7V3M5 10H19M5 21H19C20.1046 21 21 20.1046 21 19V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V19C3 20.1046 3.89543 21 5 21Z",
                          stroke: "currentColor",
                          strokeWidth: "2",
                          strokeLinecap: "round",
                          strokeLinejoin: "round"
                        })
                      }), Ze(e.id, "start", e.rawStartDate), " - ", Ze(e.id, "end", e.rawEndDate)]
                    }), i.jsx("button", {
                      className: "date-edit-btn",
                      title: l("pendingTasks.editDates"),
                      onClick: t => We(t, e.id, "range"),
                      children: i.jsx("img", {
                        src: "/pages/mainPages/proactive/edit.svg",
                        alt: "Edit",
                        className: "date-edit-icon"
                      })
                    }), Qe(e.id, "range")]
                  })]
                }), i.jsxs("div", {
                  className: "pending-task-footer",
                  children: [i.jsxs("div", {
                    className: "pending-task-actions-left",
                    children: [i.jsx("button", {
                      className: "task-card-action-btn comment " + (je === e.id ? "active" : ""),
                      title: l("pendingTasks.comment"),
                      onClick: t => Ae(t, e.id),
                      children: i.jsx("img", {
                        src: "/pages/mainPages/proactive/comment.svg",
                        alt: "Comment",
                        className: "task-action-icon-img"
                      })
                    }), Ye(e.id), i.jsx("button", {
                      className: "task-card-action-btn confirm",
                      title: l("pendingTasks.confirm"),
                      onClick: t => {
                        t.stopPropagation();
                        He(e.id);
                      },
                      disabled: y.has(e.id),
                      children: y.has(e.id) ? i.jsx("div", {
                        className: "confirm-loading-spinner"
                      }) : i.jsx("svg", {
                        width: "14",
                        height: "14",
                        viewBox: "0 0 24 24",
                        fill: "none",
                        xmlns: "http://www.w3.org/2000/svg",
                        children: i.jsx("path", {
                          d: "M20 6L9 17L4 12",
                          stroke: "currentColor",
                          strokeWidth: "2",
                          strokeLinecap: "round",
                          strokeLinejoin: "round"
                        })
                      })
                    }), i.jsx("button", {
                      className: "task-card-action-btn reject",
                      title: l("pendingTasks.reject"),
                      onClick: t => {
                        t.stopPropagation();
                        Ie(e.id);
                      },
                      disabled: S.has(e.id),
                      children: S.has(e.id) ? i.jsx("div", {
                        className: "reject-loading-spinner"
                      }) : i.jsxs("svg", {
                        width: "14",
                        height: "14",
                        viewBox: "0 0 24 24",
                        fill: "none",
                        xmlns: "http://www.w3.org/2000/svg",
                        children: [i.jsx("path", {
                          d: "M18 6L6 18",
                          stroke: "currentColor",
                          strokeWidth: "2",
                          strokeLinecap: "round",
                          strokeLinejoin: "round"
                        }), i.jsx("path", {
                          d: "M6 6L18 18",
                          stroke: "currentColor",
                          strokeWidth: "2",
                          strokeLinecap: "round",
                          strokeLinejoin: "round"
                        })]
                      })
                    })]
                  }), i.jsx("button", {
                    className: "pending-task-action-btn",
                    children: l("pendingTasks.review")
                  })]
                })]
              }, e.id)), $e(e.id).length === 0 && i.jsx("div", {
                className: "empty-tasks-placeholder",
                children: l("pendingTasks.noPendingTasks")
              })]
            }), i.jsxs("div", {
              className: "source-actions-footer",
              children: [e.type !== "canvas" && i.jsxs(i.Fragment, {
                children: [i.jsx("button", {
                  className: "source-action-btn comment " + (je === `source-${e.id}` ? "active" : ""),
                  title: l("pendingTasks.comment"),
                  onClick: t => Ae(t, `source-${e.id}`),
                  children: i.jsx("img", {
                    src: "/pages/mainPages/proactive/comment.svg",
                    alt: "Comment",
                    className: "action-icon-img"
                  })
                }), Ye(`source-${e.id}`)]
              }), i.jsxs("div", {
                className: "source-actions-right",
                children: [i.jsx("button", {
                  className: "source-action-btn confirm",
                  title: l("pendingTasks.confirmAllTasks"),
                  onClick: () => (async e => {
                    C(t => new Set(t).add(e));
                    const t = $e(e);
                    const a = t.map(e => e.id);
                    if (a.length === 0) {
                      C(t => {
                        const s = new Set(t);
                        s.delete(e);
                        return s;
                      });
                      return;
                    }
                    const n = await F(a);
                    if (n.success && n.total_succeeded > 0) {
                      const a = t.filter(e => e.type === "todo").length;
                      const n = t.filter(e => e.type === "due").length;
                      const i = t.map(e => e.id);
                      H(e => {
                        const t = new Set(e);
                        i.forEach(e => t.add(e));
                        return t;
                      });
                      setTimeout(() => {
                        j(t => t.filter(t => t.sourceId !== e));
                        H(e => {
                          const t = new Set(e);
                          i.forEach(e => t.delete(e));
                          return t;
                        });
                        W(t => new Set(t).add(e));
                        setTimeout(() => {
                          v(t => t.filter(t => t.id !== e));
                          W(t => {
                            const s = new Set(t);
                            s.delete(e);
                            return s;
                          });
                          C(t => {
                            const s = new Set(t);
                            s.delete(e);
                            return s;
                          });
                        }, 400);
                      }, 350);
                      if (s) {
                        s(a, n);
                      }
                    } else {
                      C(t => {
                        const s = new Set(t);
                        s.delete(e);
                        return s;
                      });
                    }
                  })(e.id),
                  disabled: D.has(e.id) || $e(e.id).length === 0,
                  children: D.has(e.id) ? i.jsx("div", {
                    className: "confirm-loading-spinner"
                  }) : i.jsx("svg", {
                    width: "16",
                    height: "16",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    xmlns: "http://www.w3.org/2000/svg",
                    children: i.jsx("path", {
                      d: "M20 6L9 17L4 12",
                      stroke: "currentColor",
                      strokeWidth: "2",
                      strokeLinecap: "round",
                      strokeLinejoin: "round"
                    })
                  })
                }), i.jsx("button", {
                  className: "source-action-btn reject",
                  title: l("pendingTasks.rejectAllTasks"),
                  onClick: () => (async e => {
                    M(t => new Set(t).add(e));
                    const t = $e(e);
                    const s = t.map(e => e.id);
                    if (s.length === 0) {
                      M(t => {
                        const s = new Set(t);
                        s.delete(e);
                        return s;
                      });
                      return;
                    }
                    const a = await F(s, "reject");
                    if (a.success && a.total_succeeded > 0) {
                      const s = t.map(e => e.id);
                      H(e => {
                        const t = new Set(e);
                        s.forEach(e => t.add(e));
                        return t;
                      });
                      setTimeout(() => {
                        j(t => t.filter(t => t.sourceId !== e));
                        H(e => {
                          const t = new Set(e);
                          s.forEach(e => t.delete(e));
                          return t;
                        });
                        W(t => new Set(t).add(e));
                        setTimeout(() => {
                          v(t => t.filter(t => t.id !== e));
                          W(t => {
                            const s = new Set(t);
                            s.delete(e);
                            return s;
                          });
                          M(t => {
                            const s = new Set(t);
                            s.delete(e);
                            return s;
                          });
                        }, 400);
                      }, 350);
                    } else {
                      M(t => {
                        const s = new Set(t);
                        s.delete(e);
                        return s;
                      });
                    }
                  })(e.id),
                  disabled: T.has(e.id) || $e(e.id).length === 0,
                  children: T.has(e.id) ? i.jsx("div", {
                    className: "reject-loading-spinner"
                  }) : i.jsxs("svg", {
                    width: "16",
                    height: "16",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    xmlns: "http://www.w3.org/2000/svg",
                    children: [i.jsx("path", {
                      d: "M18 6L6 18",
                      stroke: "currentColor",
                      strokeWidth: "2",
                      strokeLinecap: "round",
                      strokeLinejoin: "round"
                    }), i.jsx("path", {
                      d: "M6 6L18 18",
                      stroke: "currentColor",
                      strokeWidth: "2",
                      strokeLinecap: "round",
                      strokeLinejoin: "round"
                    })]
                  })
                })]
              })]
            })]
          }, e.id))
        })
      }), h && i.jsx(O, {
        taskId: h,
        onClose: () => g(null),
        isPendingTask: true,
        onTaskApproved: () => {
          const e = x.find(e => e.id === h);
          const t = (e == null ? undefined : e.type) === "todo" ? 1 : 0;
          const a = (e == null ? undefined : e.type) === "due" ? 1 : 0;
          const n = e == null ? undefined : e.sourceId;
          const i = x.filter(e => e.sourceId === n && e.id !== h).length === 0;
          H(e => new Set(e).add(h));
          setTimeout(() => {
            j(e => e.filter(e => e.id !== h));
            H(e => {
              const t = new Set(e);
              t.delete(h);
              return t;
            });
            if (i && n) {
              W(e => new Set(e).add(n));
              setTimeout(() => {
                v(e => e.filter(e => e.id !== n));
                W(e => {
                  const t = new Set(e);
                  t.delete(n);
                  return t;
                });
              }, 400);
            }
          }, 350);
          if (s) {
            s(t, a);
          }
        },
        onTaskRejected: () => {
          const e = x.find(e => e.id === h);
          const t = e == null ? undefined : e.sourceId;
          const s = x.filter(e => e.sourceId === t && e.id !== h).length === 0;
          H(e => new Set(e).add(h));
          setTimeout(() => {
            j(e => e.filter(e => e.id !== h));
            H(e => {
              const t = new Set(e);
              t.delete(h);
              return t;
            });
            if (s && t) {
              W(e => new Set(e).add(t));
              setTimeout(() => {
                v(e => e.filter(e => e.id !== t));
                W(e => {
                  const s = new Set(e);
                  s.delete(t);
                  return s;
                });
              }, 400);
            }
          }, 350);
        }
      }), me && r.createPortal(i.jsx("div", {
        className: "success-toast",
        children: ge
      }), document.body)]
    });
  }
};
const R = () => i.jsx("div", {
  className: "todos-skeleton-container",
  children: [["88%", "58%"], ["72%", "64%"], ["76%"], ["86%"], ["80%"]].map((e, t) => i.jsx("div", {
    className: "skeleton-todo-item",
    style: {
      animationDelay: t * 0.08 + "s"
    },
    children: i.jsxs("div", {
      className: "skeleton-todo-content",
      children: [i.jsx("div", {
        className: "skeleton-todo-title-lines",
        children: e.map((e, t) => i.jsx("div", {
          className: "skeleton-todo-title",
          style: {
            width: e
          }
        }, t))
      }), i.jsx("div", {
        className: "skeleton-todo-subtitle"
      })]
    })
  }, `todo-${t}`))
});
const A = ({
  connected: e,
  size: t = "toolbar"
}) => i.jsx("img", {
  src: "/pages/calendarPage/google-calendar-icon.png",
  alt: "",
  "aria-hidden": true,
  draggable: false,
  className: `google-calendar-brand-icon google-calendar-brand-icon--${t}${e ? "" : " google-calendar-brand-icon--muted"}`
});
const V = () => {
  const e = s();
  const {
    t: t,
    i18n: r
  } = a();
  const [d] = p();
  n.useEffect(() => {}, [e]);
  const c = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
  const u = e => {
    const s = [t("proactive.weekdaysShort.sun"), t("proactive.weekdaysShort.mon"), t("proactive.weekdaysShort.tue"), t("proactive.weekdaysShort.wed"), t("proactive.weekdaysShort.thu"), t("proactive.weekdaysShort.fri"), t("proactive.weekdaysShort.sat")];
    const a = t(`proactive.monthsShort.${c[e.getMonth()]}`);
    return `${s[e.getDay()]}, ${a} ${e.getDate()}`;
  };
  const y = e => {
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    const s = new Date(e);
    s.setHours(0, 0, 0, 0);
    return t.getTime() === s.getTime();
  };
  const C = e => {
    const t = new Date(e);
    t.setHours(0, 0, 0, 0);
    const s = new Date(Oe);
    s.setHours(0, 0, 0, 0);
    return s.getTime() === t.getTime();
  };
  const S = e => {
    const t = new Date(e);
    t.setHours(0, 0, 0, 0);
    He(t);
  };
  const [F, P] = n.useState([]);
  const [$, H] = n.useState(true);
  const [B, V] = n.useState(false);
  const [U, Y] = n.useState(null);
  const [q, z] = n.useState(() => _());
  const K = async () => {
    H(true);
    const [e, t] = await Promise.all([N(), D()]);
    if (e.success) {
      P(e.tasks);
      if (typeof e.pending_sources_count == "number") {
        Y(e.pending_sources_count);
      }
    } else if ("message" in e) {
      e.message;
    } else if ("error" in e) {
      e.error;
    }
    if (t) {
      z(t);
    }
    H(false);
  };
  n.useEffect(() => {
    K();
  }, []);
  const Z = async () => {
    V(true);
    const [e, t] = await Promise.all([N(), D()]);
    if (e.success) {
      P(e.tasks);
      if (typeof e.pending_sources_count == "number") {
        Y(e.pending_sources_count);
      }
    }
    if (t) {
      z(t);
    }
    V(false);
  };
  const [J, Q] = n.useState([]);
  const [G, X] = n.useState([]);
  const [ee, te] = n.useState([]);
  const [se, ae] = n.useState(null);
  const [ne, ie] = n.useState(null);
  const [re, oe] = n.useState(false);
  const [le, de] = n.useState(null);
  const [ce, ue] = n.useState(false);
  const [pe, me] = n.useState(false);
  const [he, ge] = n.useState("");
  const ke = n.useRef(null);
  const [ve, xe] = n.useState(false);
  const [je, fe] = n.useState(false);
  const [we, Ne] = n.useState(false);
  const [_e, ye] = n.useState("idle");
  const [be, De] = n.useState(false);
  const Ce = n.useRef(null);
  const [Se, Le] = n.useState(false);
  const [Te, Me] = n.useState(new Set());
  const [Ee, Fe] = n.useState(false);
  const Pe = e => {
    if (ke.current) {
      clearTimeout(ke.current);
    }
    ge(e);
    me(true);
    ke.current = setTimeout(() => {
      me(false);
      ke.current = null;
    }, 3000);
  };
  const $e = n.useRef(null);
  n.useEffect(() => {
    const e = e => {
      if ($e.current && !$e.current.contains(e.target)) {
        Fe(false);
      }
    };
    if (Ee) {
      document.addEventListener("mousedown", e);
      return () => {
        document.removeEventListener("mousedown", e);
      };
    }
  }, [Ee]);
  n.useEffect(() => {
    (async () => {
      if (!k()) {
        xe(false);
        return;
      }
      const e = await v();
      xe(!!e.success && e.connected);
    })();
  }, []);
  n.useEffect(() => {
    const e = async e => {
      var s;
      var a;
      const n = new Set([window.location.origin]);
      try {
        n.add(new URL(x.BACKEND_URL).origin);
      } catch {}
      if (!n.has(e.origin)) {
        return;
      }
      if (((s = e.data) == null ? undefined : s.type) !== "google_calendar_oauth") {
        return;
      }
      if ((a = Ce.current) != null) {
        a.close();
      }
      Ce.current = null;
      if (e.data.status !== "connected") {
        fe(false);
        ye("idle");
        Pe(t("proactive.googleCalendarConnectFailed"));
        return;
      }
      xe(true);
      ye("syncing");
      Pe(t("proactive.googleCalendarConnected"));
      const i = await j((() => {
        const e = new Date();
        e.setHours(0, 0, 0, 0);
        return e.toISOString();
      })());
      if (i.success) {
        Pe(t("proactive.googleCalendarSynced", {
          count: i.synced_count
        }));
      } else {
        Pe(("error" in i ? i.error : "") || t("proactive.googleCalendarSyncFailed"));
      }
      ye("success");
      fe(false);
      Z();
      setTimeout(() => Ne(false), 1400);
    };
    window.addEventListener("message", e);
    return () => window.removeEventListener("message", e);
  }, []);
  const [Oe, He] = n.useState(() => {
    const e = new Date();
    e.setHours(0, 0, 0, 0);
    return e;
  });
  const Ie = e => {
    try {
      return new Date(e).toLocaleDateString(l(r.language), {
        weekday: "short",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit"
      });
    } catch (t) {
      return e;
    }
  };
  n.useEffect(() => {
    const e = new Date(Oe);
    e.setHours(0, 0, 0, 0);
    const t = F.filter(e => e.type === "todo").filter(t => {
      try {
        const s = new Date(t.scheduled_for);
        if (isNaN(s.getTime())) {
          return false;
        }
        s.setHours(0, 0, 0, 0);
        const a = new Date(t.due_at);
        if (isNaN(a.getTime())) {
          return false;
        }
        a.setHours(0, 0, 0, 0);
        const n = e >= s && e <= a;
        return n;
      } catch (s) {
        return false;
      }
    }).map(e => ({
      id: e.task_id,
      title: e.title,
      subtitle: e.description.split("\n")[0] || "",
      completed: e.status === "completed" || e.progress === "completed"
    }));
    Q(t);
    const s = F.filter(e => e.type === "due").filter(t => {
      try {
        const s = new Date(t.due_at);
        if (isNaN(s.getTime())) {
          return false;
        }
        s.setHours(0, 0, 0, 0);
        const a = e.getTime() === s.getTime();
        return a;
      } catch (s) {
        return false;
      }
    }).map(e => ({
      id: e.task_id,
      title: e.title,
      description: e.description,
      due_at: e.due_at
    }));
    X(s);
    const a = F.filter(t => {
      if (t.type !== "course") {
        return false;
      }
      try {
        const s = new Date(t.scheduled_for);
        return !isNaN(s.getTime()) && (s.setHours(0, 0, 0, 0), e.getTime() === s.getTime());
      } catch {
        return false;
      }
    }).sort((e, t) => (e.created_at || "").localeCompare(t.created_at || ""));
    te(a);
  }, [F, Oe]);
  const Be = e => {
    ae(e);
  };
  const We = (e, t) => {
    de({
      id: e,
      title: t
    });
    oe(true);
  };
  const Re = () => {
    Le(false);
    Me(new Set());
  };
  const Ae = e => {
    Me(t => {
      const s = new Set(t);
      if (s.has(e)) {
        s.delete(e);
      } else {
        s.add(e);
      }
      return s;
    });
  };
  const Ve = d.get("view") === "pending" ? "pending" : "confirmed";
  const [Ue, Ye] = n.useState(Ve);
  n.useEffect(() => {
    const e = d.get("view");
    if (e === "pending") {
      Ye("pending");
    } else if (e === "confirmed" || e === null) {
      Ye("confirmed");
    }
  }, [d]);
  const qe = new Date();
  const [ze, Ke] = n.useState("month");
  const [Ze, Je] = n.useState(qe.getMonth());
  const [Qe, Ge] = n.useState(qe.getFullYear());
  const Xe = e => {
    const t = new Date(e);
    const s = t.getDay();
    const a = t.getDate() - s;
    return new Date(t.setDate(a));
  };
  const [et, tt] = n.useState(() => {
    const e = Xe(new Date());
    e.setHours(0, 0, 0, 0);
    return e;
  });
  const st = e => [t("proactive.months.january"), t("proactive.months.february"), t("proactive.months.march"), t("proactive.months.april"), t("proactive.months.may"), t("proactive.months.june"), t("proactive.months.july"), t("proactive.months.august"), t("proactive.months.september"), t("proactive.months.october"), t("proactive.months.november"), t("proactive.months.december")][e];
  const at = (e, t) => new Date(t, e + 1, 0).getDate();
  const nt = (() => {
    const e = at(Ze, Qe);
    const t = new Date(Qe, Ze, 1).getDay();
    const s = [];
    const a = Ze === 0 ? 11 : Ze - 1;
    const n = Ze === 0 ? Qe - 1 : Qe;
    const i = at(a, n);
    for (let u = t - 1; u >= 0; u--) {
      const e = i - u;
      const t = new Date(n, a, e);
      s.push({
        day: e,
        isCurrentMonth: false,
        isToday: false,
        date: t
      });
    }
    const r = new Date();
    const o = Ze === r.getMonth() && Qe === r.getFullYear() ? r.getDate() : null;
    for (let u = 1; u <= e; u++) {
      const e = new Date(Qe, Ze, u);
      s.push({
        day: u,
        isCurrentMonth: true,
        isToday: o !== null && u === o,
        date: e
      });
    }
    const l = Math.max(Math.ceil(s.length / 7) * 7, 35) - s.length;
    const d = Ze === 11 ? 0 : Ze + 1;
    const c = Ze === 11 ? Qe + 1 : Qe;
    for (let u = 1; u <= l; u++) {
      const e = new Date(c, d, u);
      s.push({
        day: u,
        isCurrentMonth: false,
        isToday: false,
        date: e
      });
    }
    return s;
  })();
  const it = [];
  for (let s = 0; s < nt.length; s += 7) {
    it.push(nt.slice(s, s + 7));
  }
  const rt = (() => {
    const e = [];
    const t = new Date(et);
    for (let s = 0; s < 7; s++) {
      const a = new Date(t);
      a.setDate(t.getDate() + s);
      const n = y(a);
      const i = a.getMonth() === Ze && a.getFullYear() === Qe;
      e.push({
        day: a.getDate(),
        isCurrentMonth: i,
        isToday: n,
        date: a
      });
    }
    return e;
  })();
  const ot = (e, t) => {
    if ($ || B) {
      return (e => {
        const t = new Date(e);
        t.setHours(0, 0, 0, 0);
        const s = (t.getDate() * 7 + t.getMonth() * 31) % 100;
        const a = [];
        if (s % 10 < 3.5) {
          if (s % 3 == 0) {
            a.push({
              title: "",
              type: "scheduled",
              icon: "calendar",
              isSkeleton: true
            });
          } else {
            a.push({
              title: "",
              isSkeleton: true
            });
          }
          if (s % 5 < 1) {
            if ((s + 1) % 2 == 0) {
              a.push({
                title: "",
                type: "scheduled",
                icon: "calendar",
                isSkeleton: true
              });
            } else {
              a.push({
                title: "",
                isSkeleton: true
              });
            }
          }
        }
        return a;
      })(e);
    }
    const s = [];
    const a = [];
    const n = [];
    const i = new Date(e);
    i.setHours(0, 0, 0, 0);
    F.forEach(e => {
      const t = new Date(e.scheduled_for);
      t.setHours(0, 0, 0, 0);
      const r = new Date(e.due_at);
      r.setHours(0, 0, 0, 0);
      if (e.type === "due") {
        if (i.getTime() === r.getTime()) {
          s.push({
            id: e.task_id,
            title: e.title,
            description: e.description.split("\n")[0] || "",
            type: "scheduled",
            icon: "calendar"
          });
        }
      } else if (e.type === "todo") {
        if (i >= t && i <= r) {
          a.push({
            id: e.task_id,
            title: e.title,
            description: e.description.split("\n")[0] || ""
          });
        }
      } else if (e.type === "course" && i.getTime() === t.getTime()) {
        n.push({
          id: e.task_id,
          title: e.title,
          description: (e.description || "").split("\n")[0] || "",
          kind: "course",
          task: e
        });
      }
    });
    n.sort((e, t) => (e.task.created_at || "").localeCompare(t.task.created_at || ""));
    return [...s, ...n, ...a];
  };
  return i.jsxs("div", {
    className: "proactive-page",
    children: [i.jsx("div", {
      className: "proactive-content",
      children: i.jsxs("div", {
        className: "proactive-layout",
        children: [i.jsxs("div", {
          className: "proactive-left",
          children: [i.jsxs("div", {
            className: "calendar-sidebar-summary",
            children: [i.jsxs("div", {
              className: "calendar-sidebar-header",
              children: [i.jsx("div", {
                className: "calendar-icon-container",
                children: i.jsx("svg", {
                  width: "18",
                  height: "18",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  xmlns: "http://www.w3.org/2000/svg",
                  children: i.jsx("path", {
                    d: "M8 2V6M16 2V6M3.5 9.5H20.5M5 4H19C20.1046 4 21 4.89543 21 6V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V6C3 4.89543 3.89543 4 5 4Z",
                    stroke: "currentColor",
                    strokeWidth: "1.8",
                    strokeLinecap: "round",
                    strokeLinejoin: "round"
                  })
                })
              }), i.jsx("h2", {
                className: "calendar-sidebar-title",
                children: t("proactive.calendar")
              })]
            }), i.jsxs("div", {
              className: "calendar-sidebar-date-row",
              children: [i.jsxs("div", {
                children: [i.jsx("div", {
                  className: "calendar-sidebar-day",
                  children: Oe.getDate()
                }), i.jsx("div", {
                  className: "calendar-sidebar-date",
                  children: u(Oe)
                })]
              }), y(Oe) && i.jsx("span", {
                className: "calendar-sidebar-today",
                children: t("proactive.today")
              })]
            }), i.jsxs("div", {
              className: "calendar-sidebar-stats",
              children: [i.jsx("span", {
                children: t("proactive.duesCount", {
                  count: G.length
                })
              }), i.jsx("span", {
                children: t("proactive.tasksCount", {
                  count: J.length
                })
              })]
            })]
          }), i.jsxs("div", {
            className: "todo-section",
            children: [i.jsxs("div", {
              className: "todo-header",
              children: [i.jsxs("div", {
                className: "todo-header-left",
                children: [i.jsx("h2", {
                  className: "todo-header-title",
                  children: (e => {
                    if (y(e)) {
                      return t("proactive.todaysTodos");
                    }
                    const s = new Intl.DateTimeFormat(l(r.language), {
                      month: "long",
                      day: "numeric"
                    }).format(e);
                    return t("proactive.todoHeaderTitleForDate", {
                      date: s
                    });
                  })(Oe)
                }), Se && i.jsx("button", {
                  className: "todo-exit-selection-btn",
                  onClick: Re,
                  children: t("proactive.cancel")
                }), !Se && i.jsxs("div", {
                  className: "todo-menu-container",
                  ref: $e,
                  children: [i.jsx("button", {
                    className: "todo-menu-btn",
                    onClick: () => Fe(!Ee),
                    children: i.jsx("img", {
                      src: "/dots-vertical.svg",
                      alt: "Menu",
                      className: "todo-menu-icon"
                    })
                  }), Ee && i.jsx("div", {
                    className: "todo-menu-dropdown",
                    children: i.jsx("button", {
                      className: "todo-menu-item",
                      onClick: () => {
                        Le(true);
                        Fe(false);
                        Me(new Set());
                      },
                      children: t("proactive.select")
                    })
                  })]
                })]
              }), Se ? i.jsxs("div", {
                className: "todo-header-selection",
                children: [i.jsx("button", {
                  className: "todo-bulk-delete-btn",
                  onClick: () => {
                    if (Te.size === 0) {
                      return;
                    }
                    const e = [];
                    J.forEach(t => {
                      if (Te.has(t.id)) {
                        e.push({
                          id: t.id,
                          title: t.title
                        });
                      }
                    });
                    G.forEach(t => {
                      if (Te.has(t.id)) {
                        e.push({
                          id: t.id,
                          title: t.title
                        });
                      }
                    });
                    if (e.length > 0) {
                      de({
                        id: e.map(e => e.id).join(","),
                        title: t("proactive.itemsCount", {
                          count: e.length
                        })
                      });
                      oe(true);
                    }
                  },
                  disabled: Te.size === 0,
                  children: i.jsx("img", {
                    src: "/pages/mainPages/drive/trash.svg",
                    alt: "Delete",
                    className: "todo-bulk-delete-icon"
                  })
                }), i.jsxs("div", {
                  className: "todo-select-all",
                  children: [i.jsx("span", {
                    className: "todo-select-all-text",
                    children: Te.size === J.length + G.length ? t("proactive.deselectAll") : t("proactive.selectAll")
                  }), i.jsx(L, {
                    checked: Te.size > 0 && Te.size === J.length + G.length,
                    onCheckedChange: e => {
                      if (e) {
                        (() => {
                          const e = new Set([...J.map(e => e.id), ...G.map(e => e.id)]);
                          Me(e);
                        })();
                      } else {
                        Me(new Set());
                      }
                    },
                    className: "todo-select-all-checkbox"
                  })]
                })]
              }) : i.jsx("div", {
                className: "todo-header-right",
                children: i.jsxs("div", {
                  className: "todo-date-badge",
                  children: [i.jsxs("svg", {
                    width: "14",
                    height: "14",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    xmlns: "http://www.w3.org/2000/svg",
                    style: {
                      marginRight: "6px"
                    },
                    children: [i.jsx("path", {
                      d: "M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z",
                      stroke: "#666",
                      strokeWidth: "1.5",
                      strokeLinecap: "round",
                      strokeLinejoin: "round"
                    }), i.jsx("path", {
                      d: "M16 2V6",
                      stroke: "#666",
                      strokeWidth: "1.5",
                      strokeLinecap: "round",
                      strokeLinejoin: "round"
                    }), i.jsx("path", {
                      d: "M8 2V6",
                      stroke: "#666",
                      strokeWidth: "1.5",
                      strokeLinecap: "round",
                      strokeLinejoin: "round"
                    }), i.jsx("path", {
                      d: "M3 10H21",
                      stroke: "#666",
                      strokeWidth: "1.5",
                      strokeLinecap: "round",
                      strokeLinejoin: "round"
                    })]
                  }), u(Oe)]
                })
              })]
            }), i.jsx("div", {
              className: "todo-list",
              children: $ ? i.jsx(R, {}) : G.length === 0 && J.length === 0 && ee.length === 0 ? i.jsx("div", {
                style: {
                  padding: "20px",
                  textAlign: "center",
                  color: "#999"
                },
                children: t("proactive.noTasksToday")
              }) : i.jsxs(i.Fragment, {
                children: [G.length > 0 && i.jsx("div", {
                  className: "due-items-container",
                  children: G.map(e => i.jsxs("div", {
                    className: "due-item",
                    onClick: Se ? undefined : () => {
                      t = e.id;
                      ae(t);
                      return;
                      var t;
                    },
                    style: {
                      cursor: Se ? "default" : "pointer"
                    },
                    children: [i.jsx("div", {
                      className: "due-bar"
                    }), i.jsx("div", {
                      className: "due-icon",
                      children: i.jsx("svg", {
                        width: "16",
                        height: "16",
                        viewBox: "0 0 24 24",
                        fill: "none",
                        xmlns: "http://www.w3.org/2000/svg",
                        children: i.jsx("path", {
                          d: "M8 7V3M16 7V3M5 10H19M5 21H19C20.1046 21 21 20.1046 21 19V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V19C3 20.1046 3.89543 21 5 21Z",
                          stroke: "currentColor",
                          strokeWidth: "2",
                          strokeLinecap: "round",
                          strokeLinejoin: "round"
                        })
                      })
                    }), i.jsx("div", {
                      className: "due-content",
                      children: i.jsx("div", {
                        className: "due-title",
                        children: e.title
                      })
                    }), Se ? i.jsx(L, {
                      checked: Te.has(e.id),
                      onCheckedChange: () => Ae(e.id),
                      onClick: e => e.stopPropagation(),
                      className: "todo-selection-checkbox"
                    }) : i.jsx("div", {
                      className: "due-time",
                      children: Ie(e.due_at)
                    })]
                  }, e.id))
                }), ee.filter(e => !e.completed).map(e => i.jsxs("div", {
                  className: "todo-item course-todo-item",
                  onClick: Se ? undefined : () => ie(e),
                  style: {
                    cursor: Se ? "default" : "pointer"
                  },
                  children: [i.jsxs("div", {
                    className: "todo-content",
                    children: [i.jsx("div", {
                      className: "todo-title",
                      children: e.title
                    }), e.description && i.jsx("div", {
                      className: "todo-subtitle",
                      children: e.description.split("\n")[0]
                    }), !Se && i.jsx("button", {
                      className: "todo-view-details-btn",
                      onClick: t => {
                        t.stopPropagation();
                        ie(e);
                      },
                      children: t("proactive.viewDetails")
                    })]
                  }), !Se && i.jsx("button", {
                    className: "todo-delete-button",
                    onClick: t => {
                      t.stopPropagation();
                      We(e.task_id, e.title);
                    },
                    title: t("common.delete"),
                    children: i.jsxs("svg", {
                      width: "14",
                      height: "14",
                      viewBox: "0 0 24 24",
                      fill: "none",
                      xmlns: "http://www.w3.org/2000/svg",
                      children: [i.jsx("path", {
                        d: "M3 6H5H21M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z",
                        stroke: "currentColor",
                        strokeWidth: "2",
                        strokeLinecap: "round",
                        strokeLinejoin: "round"
                      }), i.jsx("path", {
                        d: "M10 11V17",
                        stroke: "currentColor",
                        strokeWidth: "2",
                        strokeLinecap: "round",
                        strokeLinejoin: "round"
                      }), i.jsx("path", {
                        d: "M14 11V17",
                        stroke: "currentColor",
                        strokeWidth: "2",
                        strokeLinecap: "round",
                        strokeLinejoin: "round"
                      })]
                    })
                  })]
                }, e.task_id)), i.jsx(M, {
                  mode: "popLayout",
                  children: J.filter(e => !e.completed).map(e => i.jsxs(m.div, {
                    layout: true,
                    layoutId: e.id,
                    initial: {
                      opacity: 0,
                      y: -10
                    },
                    animate: {
                      opacity: 1,
                      y: 0
                    },
                    exit: {
                      opacity: 0,
                      y: -10,
                      height: 0
                    },
                    transition: {
                      layout: {
                        duration: 0.4,
                        ease: [0.4, 0, 0.2, 1]
                      },
                      opacity: {
                        duration: 0.2
                      },
                      height: {
                        duration: 0.3
                      }
                    },
                    className: "todo-item",
                    onClick: Se ? undefined : () => Be(e.id),
                    style: {
                      cursor: Se ? "default" : "pointer"
                    },
                    children: [Se && i.jsx(L, {
                      checked: Te.has(e.id),
                      onCheckedChange: () => Ae(e.id),
                      onClick: e => e.stopPropagation(),
                      className: "todo-selection-checkbox"
                    }), i.jsxs("div", {
                      className: "todo-content",
                      children: [i.jsx("div", {
                        className: "todo-title",
                        children: e.title
                      }), e.subtitle && i.jsx("div", {
                        className: "todo-subtitle",
                        children: e.subtitle
                      }), !Se && i.jsx("button", {
                        className: "todo-view-details-btn",
                        onClick: t => {
                          t.stopPropagation();
                          Be(e.id);
                        },
                        children: t("proactive.viewDetails")
                      })]
                    }), !Se && i.jsx("button", {
                      className: "todo-delete-button",
                      onClick: t => {
                        t.stopPropagation();
                        We(e.id, e.title);
                      },
                      title: t("common.delete"),
                      children: i.jsxs("svg", {
                        width: "14",
                        height: "14",
                        viewBox: "0 0 24 24",
                        fill: "none",
                        xmlns: "http://www.w3.org/2000/svg",
                        children: [i.jsx("path", {
                          d: "M3 6H5H21M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z",
                          stroke: "currentColor",
                          strokeWidth: "2",
                          strokeLinecap: "round",
                          strokeLinejoin: "round"
                        }), i.jsx("path", {
                          d: "M10 11V17",
                          stroke: "currentColor",
                          strokeWidth: "2",
                          strokeLinecap: "round",
                          strokeLinejoin: "round"
                        }), i.jsx("path", {
                          d: "M14 11V17",
                          stroke: "currentColor",
                          strokeWidth: "2",
                          strokeLinecap: "round",
                          strokeLinejoin: "round"
                        })]
                      })
                    })]
                  }, e.id))
                })]
              })
            })]
          }), i.jsxs("div", {
            className: "completed-section",
            children: [i.jsx("div", {
              className: "completed-header",
              children: i.jsx("h2", {
                className: "completed-header-title",
                children: t("proactive.completed")
              })
            }), i.jsx("div", {
              className: "completed-list",
              children: J.filter(e => e.completed).length === 0 && ee.filter(e => e.completed).length === 0 ? i.jsx("div", {
                style: {
                  padding: "20px",
                  textAlign: "center",
                  color: "#999"
                },
                children: t("proactive.noCompletedToday")
              }) : i.jsxs(i.Fragment, {
                children: [J.filter(e => e.completed).map(e => i.jsxs("div", {
                  className: "completed-item",
                  onClick: () => Be(e.id),
                  children: [i.jsxs("div", {
                    className: "completed-item-content",
                    children: [i.jsx("div", {
                      className: "completed-item-title",
                      children: e.title
                    }), e.subtitle && i.jsx("div", {
                      className: "completed-item-subtitle",
                      children: e.subtitle
                    })]
                  }), i.jsx("div", {
                    className: "completed-check",
                    "aria-hidden": "true",
                    children: i.jsx("svg", {
                      width: "14",
                      height: "14",
                      viewBox: "0 0 24 24",
                      fill: "none",
                      xmlns: "http://www.w3.org/2000/svg",
                      children: i.jsx("path", {
                        d: "M20 6L9 17L4 12",
                        stroke: "currentColor",
                        strokeWidth: "2.4",
                        strokeLinecap: "round",
                        strokeLinejoin: "round"
                      })
                    })
                  })]
                }, e.id)), ee.filter(e => e.completed).map(e => i.jsxs("div", {
                  className: "completed-item",
                  onClick: () => ie(e),
                  children: [i.jsxs("div", {
                    className: "completed-item-content",
                    children: [i.jsx("div", {
                      className: "completed-item-title",
                      children: e.title
                    }), e.description && i.jsx("div", {
                      className: "completed-item-subtitle",
                      children: e.description.split("\n")[0]
                    })]
                  }), i.jsx("div", {
                    className: "completed-check",
                    "aria-hidden": "true",
                    children: i.jsx("svg", {
                      width: "14",
                      height: "14",
                      viewBox: "0 0 24 24",
                      fill: "none",
                      xmlns: "http://www.w3.org/2000/svg",
                      children: i.jsx("path", {
                        d: "M20 6L9 17L4 12",
                        stroke: "currentColor",
                        strokeWidth: "2.4",
                        strokeLinecap: "round",
                        strokeLinejoin: "round"
                      })
                    })
                  })]
                }, e.task_id))]
              })
            })]
          })]
        }), i.jsx("div", {
          className: "proactive-right",
          children: i.jsxs("div", {
            className: "proactive-tasks-container",
            children: [i.jsxs("div", {
              className: "proactive-tasks-header",
              children: [i.jsxs("div", {
                className: "proactive-tasks-mode-switcher",
                children: [i.jsx("button", {
                  className: "tasks-mode-btn " + (Ue === "confirmed" ? "active" : ""),
                  onClick: () => {
                    if (Ue === "pending") {
                      Z();
                    }
                    Ye("confirmed");
                  },
                  children: t("proactive.confirmedTasks")
                }), i.jsxs("button", {
                  className: "tasks-mode-btn " + (Ue === "pending" ? "active" : ""),
                  onClick: () => Ye("pending"),
                  children: [i.jsx("img", {
                    src: "/pages/mainPages/proactive/pending-tasks.svg",
                    alt: "",
                    className: "tasks-mode-btn-icon"
                  }), t("proactive.pendingTasks"), U !== null && U > 0 && i.jsx("span", {
                    className: "pending-sources-badge",
                    children: U > 99 ? "99+" : U
                  })]
                })]
              }), i.jsxs("div", {
                className: "pq-button-wrapper",
                children: [i.jsxs("button", {
                  className: "pq-tier-button",
                  children: [i.jsxs("svg", {
                    width: "12",
                    height: "12",
                    viewBox: "0 0 24 24",
                    fill: "none",
                    stroke: "currentColor",
                    strokeWidth: "2",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    children: [i.jsx("ellipse", {
                      cx: "12",
                      cy: "5",
                      rx: "9",
                      ry: "3"
                    }), i.jsx("path", {
                      d: "M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"
                    }), i.jsx("path", {
                      d: "M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"
                    })]
                  }), t("proactive.proQuotaButton"), (() => {
                    const e = q ? b(q.file_generation) : 0;
                    const t = q ? q.file_generation.limit : 5;
                    const s = q ? b(q.deep_learn_session) : 0;
                    const a = q ? q.deep_learn_session.limit : 5;
                    const n = ((t > 0 ? e / t : 0) + (a > 0 ? s / a : 0)) / 2 * 100;
                    const r = n >= 80 ? "#ef4444" : n >= 50 ? "#f59e0b" : "#34c985";
                    const o = Math.PI * 2 * 7;
                    const l = o * (n / 100);
                    return i.jsxs("svg", {
                      className: "pq-ring-svg",
                      width: "16",
                      height: "16",
                      viewBox: "0 0 18 18",
                      children: [i.jsx("circle", {
                        cx: "9",
                        cy: "9",
                        r: 7,
                        fill: "none",
                        stroke: "#e0e0e0",
                        strokeWidth: "2.2"
                      }), i.jsx("circle", {
                        cx: "9",
                        cy: "9",
                        r: 7,
                        fill: "none",
                        stroke: r,
                        strokeWidth: "2.2",
                        strokeDasharray: `${l} ${o - l}`,
                        strokeDashoffset: o * 0.25,
                        strokeLinecap: "butt"
                      })]
                    });
                  })()]
                }), i.jsxs("div", {
                  className: "pq-popup",
                  children: [i.jsx("div", {
                    className: "pq-popup-title",
                    children: t(`proactive.${T(q == null ? undefined : q.tier)}PlanUsage`)
                  }), i.jsxs("div", {
                    className: "pq-popup-item",
                    children: [i.jsxs("div", {
                      className: "pq-popup-item-header",
                      children: [i.jsxs("svg", {
                        width: "12",
                        height: "12",
                        viewBox: "0 0 24 24",
                        fill: "none",
                        stroke: "currentColor",
                        strokeWidth: "2",
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        children: [i.jsx("path", {
                          d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                        }), i.jsx("polyline", {
                          points: "14 2 14 8 20 8"
                        })]
                      }), i.jsx("span", {
                        className: "pq-popup-label",
                        children: t("proactive.fileGeneration")
                      })]
                    }), i.jsxs("div", {
                      className: "pq-popup-value-row",
                      children: [i.jsxs("span", {
                        className: "pq-popup-number",
                        children: [q ? b(q.file_generation) : 0, " ", t("proactive.used")]
                      }), i.jsxs("span", {
                        className: "pq-popup-total",
                        children: ["/ ", q ? q.file_generation.limit : 5, " ", t("proactive.thisWeek")]
                      })]
                    }), i.jsx("div", {
                      className: "pq-popup-bar",
                      children: i.jsx("div", {
                        className: "pq-popup-bar-fill pq-bar-fileGen",
                        style: {
                          width: q ? `${Math.min(b(q.file_generation) / q.file_generation.limit * 100, 100)}%` : "0%"
                        }
                      })
                    })]
                  }), i.jsx("div", {
                    className: "pq-popup-divider"
                  }), i.jsxs("div", {
                    className: "pq-popup-item",
                    children: [i.jsxs("div", {
                      className: "pq-popup-item-header",
                      children: [i.jsxs("svg", {
                        width: "12",
                        height: "12",
                        viewBox: "0 0 24 24",
                        fill: "none",
                        stroke: "currentColor",
                        strokeWidth: "2",
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        children: [i.jsx("path", {
                          d: "M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"
                        }), i.jsx("path", {
                          d: "M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"
                        })]
                      }), i.jsx("span", {
                        className: "pq-popup-label",
                        children: t("proactive.deepLearnSessions")
                      })]
                    }), i.jsxs("div", {
                      className: "pq-popup-value-row",
                      children: [i.jsxs("span", {
                        className: "pq-popup-number",
                        children: [q ? b(q.deep_learn_session) : 0, " ", t("proactive.used")]
                      }), i.jsxs("span", {
                        className: "pq-popup-total",
                        children: ["/ ", q ? q.deep_learn_session.limit : 5, " ", t("proactive.thisWeek")]
                      })]
                    }), i.jsx("div", {
                      className: "pq-popup-bar",
                      children: i.jsx("div", {
                        className: "pq-popup-bar-fill pq-bar-deepLearn",
                        style: {
                          width: q ? `${Math.min(b(q.deep_learn_session) / q.deep_learn_session.limit * 100, 100)}%` : "0%"
                        }
                      })
                    })]
                  }), i.jsx("div", {
                    className: "pq-popup-divider"
                  }), i.jsx("div", {
                    className: "pq-popup-reset",
                    children: (() => {
                      const e = new Date();
                      const s = (8 - e.getUTCDay()) % 7 || 7;
                      const a = new Date(Date.UTC(e.getUTCFullYear(), e.getUTCMonth(), e.getUTCDate() + s, 0, 0, 0)).toLocaleString(l(r.language), {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        timeZoneName: "short"
                      });
                      return `${t("proactive.resets")} ${a}`;
                    })()
                  }), i.jsxs("div", {
                    className: "pq-popup-upgrade",
                    children: [t("proactive.needMoreQuota"), " ", i.jsx("span", {
                      className: "pq-popup-upgrade-link",
                      onClick: () => e("/subscription"),
                      children: t("proactive.upgradePlan")
                    })]
                  })]
                })]
              }), i.jsxs("div", {
                className: "proactive-header-controls",
                children: [Ue === "confirmed" && i.jsxs("div", {
                  className: "proactive-tasks-navigation",
                  children: [ze === "month" && i.jsxs(i.Fragment, {
                    children: [i.jsx("button", {
                      className: "proactive-tasks-nav-btn",
                      onClick: () => {
                        if (Ze === 0) {
                          Je(11);
                          Ge(Qe - 1);
                        } else {
                          Je(Ze - 1);
                        }
                      },
                      "aria-label": "Previous month",
                      children: i.jsx("div", {
                        className: "proactive-tasks-nav-icon-container",
                        children: i.jsx("svg", {
                          width: "15",
                          height: "15",
                          viewBox: "0 0 24 24",
                          fill: "none",
                          xmlns: "http://www.w3.org/2000/svg",
                          children: i.jsx("path", {
                            d: "M15 18L9 12L15 6",
                            stroke: "currentColor",
                            strokeWidth: "2",
                            strokeLinecap: "round",
                            strokeLinejoin: "round"
                          })
                        })
                      })
                    }), i.jsxs("h2", {
                      className: "proactive-tasks-period",
                      children: [st(Ze), " ", Qe]
                    }), i.jsx("button", {
                      className: "proactive-tasks-nav-btn",
                      onClick: () => {
                        if (Ze === 11) {
                          Je(0);
                          Ge(Qe + 1);
                        } else {
                          Je(Ze + 1);
                        }
                      },
                      "aria-label": "Next month",
                      children: i.jsx("div", {
                        className: "proactive-tasks-nav-icon-container",
                        children: i.jsx("svg", {
                          width: "15",
                          height: "15",
                          viewBox: "0 0 24 24",
                          fill: "none",
                          xmlns: "http://www.w3.org/2000/svg",
                          children: i.jsx("path", {
                            d: "M9 18L15 12L9 6",
                            stroke: "currentColor",
                            strokeWidth: "2",
                            strokeLinecap: "round",
                            strokeLinejoin: "round"
                          })
                        })
                      })
                    })]
                  }), ze === "week" && i.jsxs(i.Fragment, {
                    children: [i.jsx("button", {
                      className: "proactive-tasks-nav-btn",
                      onClick: () => {
                        const e = new Date(et);
                        e.setDate(et.getDate() - 7);
                        tt(e);
                        Je(e.getMonth());
                        Ge(e.getFullYear());
                      },
                      "aria-label": "Previous week",
                      children: i.jsx("div", {
                        className: "proactive-tasks-nav-icon-container",
                        children: i.jsx("svg", {
                          width: "15",
                          height: "15",
                          viewBox: "0 0 24 24",
                          fill: "none",
                          xmlns: "http://www.w3.org/2000/svg",
                          children: i.jsx("path", {
                            d: "M15 18L9 12L15 6",
                            stroke: "currentColor",
                            strokeWidth: "2",
                            strokeLinecap: "round",
                            strokeLinejoin: "round"
                          })
                        })
                      })
                    }), i.jsx("h2", {
                      className: "proactive-tasks-period",
                      children: (() => {
                        const e = rt[0].date;
                        const t = rt[6].date;
                        const s = st(e.getMonth());
                        const a = st(t.getMonth());
                        if (e.getMonth() === t.getMonth() && e.getFullYear() === t.getFullYear()) {
                          return `${s} ${e.getDate()} - ${t.getDate()}, ${e.getFullYear()}`;
                        } else if (e.getFullYear() === t.getFullYear()) {
                          return `${s} ${e.getDate()} - ${a} ${t.getDate()}, ${e.getFullYear()}`;
                        } else {
                          return `${s} ${e.getDate()}, ${e.getFullYear()} - ${a} ${t.getDate()}, ${t.getFullYear()}`;
                        }
                      })()
                    }), i.jsx("button", {
                      className: "proactive-tasks-nav-btn",
                      onClick: () => {
                        const e = new Date(et);
                        e.setDate(et.getDate() + 7);
                        tt(e);
                        Je(e.getMonth());
                        Ge(e.getFullYear());
                      },
                      "aria-label": "Next week",
                      children: i.jsx("div", {
                        className: "proactive-tasks-nav-icon-container",
                        children: i.jsx("svg", {
                          width: "15",
                          height: "15",
                          viewBox: "0 0 24 24",
                          fill: "none",
                          xmlns: "http://www.w3.org/2000/svg",
                          children: i.jsx("path", {
                            d: "M9 18L15 12L9 6",
                            stroke: "currentColor",
                            strokeWidth: "2",
                            strokeLinecap: "round",
                            strokeLinejoin: "round"
                          })
                        })
                      })
                    })]
                  })]
                }), Ue === "confirmed" && i.jsxs(i.Fragment, {
                  children: [i.jsxs("div", {
                    className: "calendar-view-toggle",
                    children: [i.jsx("button", {
                      className: "view-toggle-btn " + (ze === "week" ? "active" : ""),
                      onClick: () => {
                        Ke("week");
                        const e = Xe(new Date());
                        e.setHours(0, 0, 0, 0);
                        tt(e);
                        Je(e.getMonth());
                        Ge(e.getFullYear());
                      },
                      children: t("proactive.week")
                    }), i.jsx("button", {
                      className: "view-toggle-btn " + (ze === "month" ? "active" : ""),
                      onClick: () => Ke("month"),
                      children: t("proactive.month")
                    })]
                  }), i.jsxs("div", {
                    className: "google-calendar-sync-control",
                    children: [i.jsx("button", {
                      className: "google-calendar-sync-btn " + (ve ? "connected" : "disconnected"),
                      onClick: () => {
                        if (!je) {
                          if (ve) {
                            De(true);
                          } else {
                            ye("idle");
                            Ne(true);
                          }
                        }
                      },
                      disabled: je,
                      "aria-label": t(ve ? "proactive.googleCalendarAriaDisconnect" : "proactive.googleCalendarAriaConnect"),
                      children: i.jsx(A, {
                        connected: ve
                      })
                    }), i.jsx("div", {
                      className: "google-calendar-sync-tooltip",
                      children: t(ve ? "proactive.googleCalendarTooltipDisconnect" : "proactive.googleCalendarTooltipConnect")
                    })]
                  })]
                })]
              })]
            }), Ue === "confirmed" && i.jsxs("div", {
              className: "calendar-grid " + (ze === "week" ? "week-view" : ""),
              children: [i.jsx("div", {
                className: "calendar-weekdays",
                children: [t("proactive.weekdays.sun"), t("proactive.weekdays.mon"), t("proactive.weekdays.tue"), t("proactive.weekdays.wed"), t("proactive.weekdays.thu"), t("proactive.weekdays.fri"), t("proactive.weekdays.sat")].map((e, t) => i.jsx("div", {
                  className: "calendar-weekday",
                  children: e
                }, t))
              }), ze === "month" && i.jsx("div", {
                className: "calendar-days-grid",
                children: it.map((e, s) => i.jsx(h.Fragment, {
                  children: e.map((e, a) => {
                    var n;
                    const r = ot(e.date, e.isCurrentMonth);
                    const o = y(e.date);
                    const l = C(e.date);
                    return i.jsxs("div", {
                      className: `calendar-day ${e.isCurrentMonth ? "" : "other-month"} ${o ? "today" : ""} ${l ? "selected" : ""}`,
                      onClick: () => S(e.date),
                      style: {
                        cursor: "pointer"
                      },
                      children: [i.jsx("div", {
                        className: "calendar-day-number",
                        children: e.day
                      }), i.jsxs("div", {
                        className: "calendar-day-events",
                        children: [r.slice(0, 3).map((e, t) => {
                          const s = "type" in e && e.type === "scheduled";
                          const a = "isSkeleton" in e && e.isSkeleton === true;
                          const n = "kind" in e && e.kind === "course";
                          if (a) {
                            if (s) {
                              return i.jsxs("div", {
                                className: "calendar-event scheduled-event skeleton-calendar-event",
                                style: {
                                  animationDelay: t * 0.05 + "s"
                                },
                                children: [i.jsx("div", {
                                  className: "scheduled-icon-container skeleton-calendar-icon"
                                }), i.jsx("span", {
                                  className: "scheduled-event-title skeleton-calendar-title"
                                })]
                              }, t);
                            } else {
                              return i.jsxs("div", {
                                className: "calendar-event skeleton-calendar-event",
                                style: {
                                  animationDelay: t * 0.05 + "s"
                                },
                                children: [i.jsx("div", {
                                  className: "event-bar skeleton-calendar-bar"
                                }), i.jsx("div", {
                                  className: "event-content",
                                  children: i.jsx("span", {
                                    className: "event-title skeleton-calendar-title"
                                  })
                                })]
                              }, t);
                            }
                          }
                          if (n) {
                            const s = [{
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
                            const a = s[(e.title || "").split("").reduce((e, t) => e + t.charCodeAt(0), 0) % s.length];
                            const n = {
                              "--event-color-dark": a.dark,
                              "--event-color-light": a.light,
                              "--event-color-text": a.text
                            };
                            return i.jsxs("div", {
                              className: "calendar-event scheduled-event course-calendar-event",
                              style: {
                                ...n,
                                animationDelay: t * 0.05 + "s"
                              },
                              onClick: t => {
                                t.stopPropagation();
                                ie(e.task);
                              },
                              children: [i.jsx("div", {
                                className: "scheduled-icon-container",
                                children: i.jsxs("svg", {
                                  width: "12",
                                  height: "12",
                                  viewBox: "0 0 12 12",
                                  fill: "none",
                                  xmlns: "http://www.w3.org/2000/svg",
                                  children: [i.jsx("path", {
                                    d: "M6 1.6L11 4L6 6.4L1 4L6 1.6Z",
                                    fill: "white"
                                  }), i.jsx("path", {
                                    d: "M3.2 5.4V7.8C3.2 7.8 4.4 8.9 6 8.9C7.6 8.9 8.8 7.8 8.8 7.8V5.4",
                                    stroke: "white",
                                    strokeWidth: "0.8",
                                    fill: "none",
                                    strokeLinecap: "round"
                                  }), i.jsx("line", {
                                    x1: "10.3",
                                    y1: "4.4",
                                    x2: "10.3",
                                    y2: "7",
                                    stroke: "white",
                                    strokeWidth: "0.8",
                                    strokeLinecap: "round"
                                  })]
                                })
                              }), i.jsx("span", {
                                className: "scheduled-event-title",
                                children: e.title
                              })]
                            }, t);
                          }
                          const r = [{
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
                          const o = [{
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
                          const l = (e.title || "").split("").reduce((e, t) => e + t.charCodeAt(0), 0);
                          let d;
                          if (s) {
                            d = r[l % r.length];
                          } else {
                            d = o[l % o.length];
                          }
                          const c = {
                            "--event-color-dark": d.dark,
                            "--event-color-light": d.light,
                            "--event-color-text": d.text
                          };
                          if (s) {
                            const s = "icon" in e ? e.icon : "calendar";
                            return i.jsxs("div", {
                              className: "calendar-event scheduled-event",
                              style: {
                                ...c,
                                animationDelay: t * 0.05 + "s"
                              },
                              children: [i.jsx("div", {
                                className: "scheduled-icon-container",
                                children: s === "calendar" ? i.jsxs("svg", {
                                  width: "12",
                                  height: "12",
                                  viewBox: "0 0 12 12",
                                  fill: "none",
                                  xmlns: "http://www.w3.org/2000/svg",
                                  children: [i.jsx("rect", {
                                    x: "2",
                                    y: "3",
                                    width: "8",
                                    height: "7",
                                    rx: "0.5",
                                    stroke: "white",
                                    strokeWidth: "0.8",
                                    fill: "none"
                                  }), i.jsx("line", {
                                    x1: "4",
                                    y1: "1",
                                    x2: "4",
                                    y2: "3",
                                    stroke: "white",
                                    strokeWidth: "0.8",
                                    strokeLinecap: "round"
                                  }), i.jsx("line", {
                                    x1: "8",
                                    y1: "1",
                                    x2: "8",
                                    y2: "3",
                                    stroke: "white",
                                    strokeWidth: "0.8",
                                    strokeLinecap: "round"
                                  }), i.jsx("line", {
                                    x1: "2",
                                    y1: "5.5",
                                    x2: "10",
                                    y2: "5.5",
                                    stroke: "white",
                                    strokeWidth: "0.8"
                                  }), i.jsx("circle", {
                                    cx: "4.5",
                                    cy: "7.5",
                                    r: "0.5",
                                    fill: "white"
                                  }), i.jsx("circle", {
                                    cx: "7.5",
                                    cy: "7.5",
                                    r: "0.5",
                                    fill: "white"
                                  })]
                                }) : s === "star" ? i.jsx("svg", {
                                  width: "12",
                                  height: "12",
                                  viewBox: "0 0 12 12",
                                  fill: "none",
                                  xmlns: "http://www.w3.org/2000/svg",
                                  children: i.jsx("path", {
                                    d: "M6 1L7.5 4.5L11 5L8.5 7.5L9 11L6 9L3 11L3.5 7.5L1 5L4.5 4.5L6 1Z",
                                    fill: "white"
                                  })
                                }) : i.jsxs("svg", {
                                  width: "12",
                                  height: "12",
                                  viewBox: "0 0 12 12",
                                  fill: "none",
                                  xmlns: "http://www.w3.org/2000/svg",
                                  children: [i.jsx("rect", {
                                    x: "2",
                                    y: "3",
                                    width: "8",
                                    height: "7",
                                    rx: "0.5",
                                    stroke: "white",
                                    strokeWidth: "0.8",
                                    fill: "none"
                                  }), i.jsx("line", {
                                    x1: "4",
                                    y1: "1",
                                    x2: "4",
                                    y2: "3",
                                    stroke: "white",
                                    strokeWidth: "0.8",
                                    strokeLinecap: "round"
                                  }), i.jsx("line", {
                                    x1: "8",
                                    y1: "1",
                                    x2: "8",
                                    y2: "3",
                                    stroke: "white",
                                    strokeWidth: "0.8",
                                    strokeLinecap: "round"
                                  })]
                                })
                              }), i.jsx("span", {
                                className: "scheduled-event-title",
                                children: e.title
                              })]
                            }, t);
                          }
                          return i.jsxs("div", {
                            className: "calendar-event",
                            style: {
                              ...c,
                              animationDelay: t * 0.05 + "s"
                            },
                            children: [i.jsx("div", {
                              className: "event-bar"
                            }), i.jsxs("div", {
                              className: "event-content",
                              children: [e.title && i.jsx("span", {
                                className: "event-title",
                                children: e.title
                              }), e.time && i.jsx("span", {
                                className: "event-time",
                                children: e.time
                              })]
                            })]
                          }, t);
                        }), r.length > 3 && i.jsx("div", {
                          className: "calendar-event-more",
                          children: t("proactive.moreEvents", {
                            count: ((n = r.find(e => "more" in e)) == null ? undefined : n.more) || r.length - 3
                          })
                        })]
                      })]
                    }, `${s}-${a}`);
                  })
                }, s))
              }), ze === "week" && i.jsx("div", {
                className: "calendar-days-grid week-view-grid",
                children: rt.map((e, s) => {
                  const a = ot(e.date, e.isCurrentMonth);
                  const n = y(e.date);
                  const r = C(e.date);
                  return i.jsxs("div", {
                    className: `calendar-day week-view-day ${e.isCurrentMonth ? "" : "other-month"} ${n ? "today" : ""} ${r ? "selected" : ""}`,
                    onClick: () => S(e.date),
                    style: {
                      cursor: "pointer"
                    },
                    children: [i.jsx("div", {
                      className: "calendar-day-number",
                      children: e.day
                    }), i.jsx("div", {
                      className: "calendar-day-events",
                      children: a.map((e, s) => {
                        const a = "type" in e && e.type === "scheduled";
                        const n = "isSkeleton" in e && e.isSkeleton === true;
                        const r = "kind" in e && e.kind === "course";
                        if (n) {
                          if (a) {
                            return i.jsxs("div", {
                              className: "calendar-event scheduled-event skeleton-calendar-event",
                              style: {
                                animationDelay: s * 0.05 + "s"
                              },
                              children: [i.jsx("div", {
                                className: "scheduled-icon-container skeleton-calendar-icon"
                              }), i.jsx("span", {
                                className: "scheduled-event-title skeleton-calendar-title"
                              })]
                            }, s);
                          } else {
                            return i.jsxs("div", {
                              className: "calendar-event skeleton-calendar-event",
                              style: {
                                animationDelay: s * 0.05 + "s"
                              },
                              children: [i.jsx("div", {
                                className: "event-bar skeleton-calendar-bar"
                              }), i.jsx("div", {
                                className: "event-content",
                                children: i.jsx("span", {
                                  className: "event-title skeleton-calendar-title"
                                })
                              })]
                            }, s);
                          }
                        }
                        if (r) {
                          const a = [{
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
                          const n = a[(e.title || "").split("").reduce((e, t) => e + t.charCodeAt(0), 0) % a.length];
                          const r = {
                            "--event-color-dark": n.dark,
                            "--event-color-light": n.light,
                            "--event-color-text": n.text
                          };
                          return i.jsx("div", {
                            className: "calendar-event scheduled-event course-calendar-event",
                            style: {
                              ...r,
                              animationDelay: s * 0.05 + "s"
                            },
                            children: i.jsxs("div", {
                              className: "event-content",
                              children: [i.jsx("span", {
                                className: "scheduled-event-title",
                                children: e.title
                              }), e.description && i.jsx("span", {
                                className: "event-description",
                                children: e.description
                              }), i.jsx("button", {
                                className: "calendar-week-event-details-btn",
                                onClick: t => {
                                  t.stopPropagation();
                                  ie(e.task);
                                },
                                children: t("proactive.viewDetails")
                              })]
                            })
                          }, s);
                        }
                        const o = [{
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
                        const l = [{
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
                        const d = (e.title || "").split("").reduce((e, t) => e + t.charCodeAt(0), 0);
                        let c;
                        if (a) {
                          c = o[d % o.length];
                        } else {
                          c = l[d % l.length];
                        }
                        const u = {
                          "--event-color-dark": c.dark,
                          "--event-color-light": c.light,
                          "--event-color-text": c.text
                        };
                        if (a) {
                          return i.jsx("div", {
                            className: "calendar-event scheduled-event",
                            style: {
                              ...u,
                              animationDelay: s * 0.05 + "s"
                            },
                            children: i.jsxs("div", {
                              className: "event-content",
                              children: [i.jsx("span", {
                                className: "scheduled-event-title",
                                children: e.title
                              }), e.description && i.jsx("span", {
                                className: "event-description",
                                children: e.description
                              }), e.id && i.jsx("button", {
                                className: "calendar-week-event-details-btn",
                                onClick: t => {
                                  t.stopPropagation();
                                  Be(e.id);
                                },
                                children: t("proactive.viewDetails")
                              })]
                            })
                          }, s);
                        } else {
                          return i.jsx("div", {
                            className: "calendar-event",
                            style: {
                              ...u,
                              animationDelay: s * 0.05 + "s"
                            },
                            children: i.jsxs("div", {
                              className: "event-content",
                              children: [e.title && i.jsx("span", {
                                className: "event-title",
                                children: e.title
                              }), e.description && i.jsx("span", {
                                className: "event-description",
                                children: e.description
                              }), e.id && i.jsx("button", {
                                className: "calendar-week-event-details-btn",
                                onClick: t => {
                                  t.stopPropagation();
                                  Be(e.id);
                                },
                                children: t("proactive.viewDetails")
                              })]
                            })
                          }, s);
                        }
                      })
                    }), a.length > 0 && i.jsxs("div", {
                      className: "calendar-day-task-count",
                      children: [a.length, " ", a.length === 1 ? t("proactive.task") : t("proactive.tasks")]
                    })]
                  }, s);
                })
              })]
            }), Ue === "pending" && i.jsx("div", {
              className: "pending-tasks-content",
              children: i.jsx(W, {
                onSourceCountChange: e => Y(e),
                onTasksApproved: (e, s) => {
                  const a = [];
                  if (e > 0) {
                    a.push(t("proactive.tasksCount", {
                      count: e
                    }));
                  }
                  if (s > 0) {
                    a.push(t("proactive.duesCount", {
                      count: s
                    }));
                  }
                  const n = a.length > 0 ? t("proactive.itemsConfirmed", {
                    items: a.join(" & ")
                  }) : t("proactive.allConfirmed");
                  ge(n);
                  me(true);
                  setTimeout(() => {
                    me(false);
                  }, 3000);
                }
              })
            })]
          })
        })]
      })
    }), se && i.jsx(O, {
      taskId: se,
      onClose: () => ae(null),
      onTaskDeleted: () => {
        Q(e => e.filter(e => e.id !== se));
        P(e => e.filter(e => e.task_id !== se));
        ae(null);
      },
      onQuotaDeducted: () => {
        const e = _();
        if (e) {
          z(e);
        }
      }
    }), ne && i.jsx(I, {
      task: ne,
      onClose: () => ie(null)
    }), i.jsx(o, {
      isOpen: re,
      onClose: () => {
        oe(false);
        de(null);
      },
      onConfirm: async () => {
        if (le) {
          ue(true);
          try {
            const e = le.id.includes(",") ? le.id.split(",") : [le.id];
            Q(t => t.filter(t => !e.includes(t.id)));
            X(t => t.filter(t => !e.includes(t.id)));
            P(t => t.filter(t => !e.includes(t.task_id)));
            const s = e.length === 1 ? e[0] : e;
            const a = await E(s);
            if (a.success) {
              if (a.failed_task_ids && a.failed_task_ids.length > 0) {
                await K();
                alert(t("proactive.deleteTasksFailedCount", {
                  count: a.failed_task_ids.length
                }));
              } else if (Se) {
                Re();
              }
            } else {
              await K();
              alert(a.message || t("proactive.deleteTasksFailedFallback"));
            }
          } catch (e) {
            await K();
            alert(t("proactive.deleteTasksErrorGeneric"));
          } finally {
            ue(false);
            oe(false);
            de(null);
          }
        }
      },
      title: t("proactive.deleteTaskTitle"),
      message: i.jsx(g, {
        i18nKey: "proactive.deleteTaskMessage",
        values: {
          title: le == null ? undefined : le.title
        },
        components: {
          strong: i.jsx("strong", {})
        }
      }),
      isDeleting: ce
    }), we && i.jsx("div", {
      className: "google-calendar-modal-overlay",
      onClick: () => !je && Ne(false),
      children: i.jsxs("div", {
        className: "google-calendar-modal",
        onClick: e => e.stopPropagation(),
        children: [i.jsx("button", {
          className: "google-calendar-modal-close",
          onClick: () => !je && Ne(false),
          disabled: je,
          "aria-label": t("proactive.googleCalendarModalCloseAria"),
          children: "×"
        }), i.jsx("div", {
          className: "google-calendar-modal-icon " + (_e === "success" ? "success" : ""),
          children: _e === "success" ? i.jsx("svg", {
            width: "34",
            height: "34",
            viewBox: "0 0 24 24",
            fill: "none",
            children: i.jsx("path", {
              d: "M20 6L9 17L4 12",
              stroke: "currentColor",
              strokeWidth: "2.5",
              strokeLinecap: "round",
              strokeLinejoin: "round"
            })
          }) : i.jsx(A, {
            connected: true,
            size: "modal"
          })
        }), i.jsx("h3", {
          className: "google-calendar-modal-title",
          children: t("proactive.googleCalendarModalTitle")
        }), i.jsx("p", {
          className: "google-calendar-modal-copy",
          children: t("proactive.googleCalendarModalDescription")
        }), _e === "syncing" ? i.jsxs("div", {
          className: "google-calendar-modal-status",
          children: [i.jsx("span", {
            className: "google-calendar-spinner"
          }), t("proactive.googleCalendarSyncingMessage")]
        }) : _e === "success" ? i.jsx("div", {
          className: "google-calendar-modal-status success",
          children: t("proactive.googleCalendarSyncComplete")
        }) : i.jsx("button", {
          className: "google-calendar-modal-primary",
          onClick: async () => {
            fe(true);
            ye("oauth");
            const e = await f("popup");
            if (!e.success) {
              fe(false);
              ye("idle");
              Pe(("error" in e ? e.error : "") || t("proactive.googleCalendarAuthStartFailed"));
              return;
            }
            const s = window.screenX + Math.max(0, (window.outerWidth - 520) / 2);
            const a = window.screenY + Math.max(0, (window.outerHeight - 680) / 2);
            const n = window.open(e.authorization_url, "google-calendar-oauth", `width=520,height=680,left=${s},top=${a},popup=yes`);
            if (!n) {
              fe(false);
              ye("idle");
              Pe(t("proactive.googleCalendarPopupBlocked"));
              return;
            }
            Ce.current = n;
            n.focus();
          },
          disabled: je,
          children: t(_e === "oauth" ? "proactive.googleCalendarOAuthPending" : "proactive.googleCalendarConnect")
        })]
      })
    }), i.jsx(o, {
      isOpen: be,
      onClose: () => !je && De(false),
      onConfirm: async () => {
        fe(true);
        const e = await w();
        fe(false);
        De(false);
        if (e.success) {
          xe(false);
          Pe(t("proactive.googleCalendarDisconnected"));
        } else {
          Pe(("error" in e ? e.error : "") || t("proactive.googleCalendarDisconnectFailed"));
        }
      },
      title: t("proactive.googleCalendarAriaDisconnect"),
      message: i.jsx(g, {
        i18nKey: "proactive.googleCalendarDisconnectMessage",
        components: {
          strong: i.jsx("strong", {})
        }
      }),
      isDeleting: je,
      confirmLabel: t("proactive.disconnect"),
      confirmLoadingLabel: t("proactive.disconnecting"),
      confirmIconSrc: null
    }), pe && i.jsx("div", {
      className: "success-toast",
      children: he
    })]
  });
};
export { V as default };