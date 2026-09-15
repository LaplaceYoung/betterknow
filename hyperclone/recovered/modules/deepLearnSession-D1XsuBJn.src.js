import { e, c as t, g as s, A as n, b as o, j as i, r as a, z as r, av as l, aw as c, ax as d, ay as u, u as p, l as m, az as g, aA as h, i as f, W as _, aj as k, I as v, ak as x, al as b, am as y, ao as w } from "./index-TjoB2Buo.js";
import { a as j } from "./addErrorLog-Dxv53mIo.js";
import { a as C, b as S, c as N, d as L, e as I, r as $, f as M, h as E, R as D, i as P, p as R } from "./historyConversationDataParser-f81MQw9L.js";
import { T, C as O } from "./TextSelectionPopup-gC3xy-py.js";
import { B as q } from "./BugReportModal-DxKVyQda.js";
import "./github-BU76ptNE.js";
import "./utils-Bmk8urhx.js";
import "./index-CMJxjNZ8.js";
import "./check-BBSENZCf.js";
import "./createLucideIcon-B4HcG4gb.js";
import "./copy-jHTWzodI.js";
import "./CourseStructureMap-41hR1got.js";
import "./loader-circle-BZEIbChB.js";
import "./plus-jBDDhggQ.js";
import "./maximize-2-78VwLVLI.js";
import "./x-BPqZ-rfi.js";
import "./index-qYFgNVxk.js";
import "./download-dDsBfY4e.js";
import "./CourseTypeIcon-27chSRPG.js";
const A = t("/api/v1/deep_learn/get_session_data");
const U = ({
  currentStep: e,
  nextStep: t,
  conversationId: s,
  onProceed: n,
  onLater: a,
  showButtons: r = true,
  isFadingOut: l = false,
  onFadeOutComplete: c
}) => {
  const {
    t: d
  } = o();
  const u = !t;
  return i.jsx("div", {
    className: `unit-completion-block ${u ? "session-final-completion" : ""} ${l ? "unit-completion-block--fading-out" : ""}`,
    onTransitionEnd: e => {
      if (e.propertyName === "opacity" && l && c) {
        c();
      }
    },
    children: i.jsxs("div", {
      className: "unit-completion-content",
      children: [i.jsx("div", {
        className: "unit-completion-separator"
      }), u ? i.jsxs("div", {
        className: "session-final-content",
        children: [i.jsx("div", {
          className: "session-final-header",
          children: i.jsxs("h3", {
            className: "session-final-title",
            children: ["🎉 ", d("deepLearnSessionPage.unitCompletion.sessionCompletedTitle")]
          })
        }), i.jsxs("div", {
          className: "session-final-message",
          children: [i.jsxs("p", {
            className: "session-final-text",
            children: [d("deepLearnSessionPage.unitCompletion.inThisSession"), " ", i.jsx("span", {
              className: "session-final-highlight",
              children: e.task_description
            })]
          }), r ? i.jsx("p", {
            className: "session-final-text",
            children: d("deepLearnSessionPage.unitCompletion.niceWorkPrompt")
          }) : i.jsxs(i.Fragment, {
            children: [i.jsx("p", {
              className: "session-final-text",
              children: d("deepLearnSessionPage.unitCompletion.niceWorkDone")
            }), i.jsx("p", {
              className: "session-final-text",
              children: d("deepLearnSessionPage.unitCompletion.keepMomentum")
            })]
          })]
        }), r && i.jsxs("div", {
          className: "session-final-actions",
          children: [i.jsx("button", {
            className: "unit-completion-button unit-completion-button-primary",
            onClick: n,
            children: d("deepLearnSessionPage.unitCompletion.markSessionComplete")
          }), i.jsx("button", {
            className: "unit-completion-button unit-completion-button-secondary",
            onClick: a,
            children: d("deepLearnSessionPage.unitCompletion.stillHaveQuestions")
          })]
        })]
      }) : i.jsxs(i.Fragment, {
        children: [i.jsx("div", {
          className: "unit-completion-header",
          children: i.jsx("h3", {
            className: "unit-completion-title",
            children: d("deepLearnSessionPage.unitCompletion.congratsTitle")
          })
        }), i.jsxs("div", {
          className: "unit-completion-message",
          children: [i.jsxs("p", {
            className: "unit-completion-text",
            children: [d("deepLearnSessionPage.unitCompletion.weHaveJust"), " ", i.jsx("span", {
              className: "unit-completion-highlight",
              children: e.task_description
            })]
          }), i.jsxs("p", {
            className: "unit-completion-text",
            children: [d("deepLearnSessionPage.unitCompletion.readyToMoveOn"), " ", i.jsx("span", {
              className: "unit-completion-highlight",
              children: t.task_description
            })]
          })]
        }), r && i.jsxs("div", {
          className: "unit-completion-actions",
          children: [i.jsx("button", {
            className: "unit-completion-button unit-completion-button-primary",
            onClick: n,
            children: d("deepLearnSessionPage.unitCompletion.proceed")
          }), i.jsx("button", {
            className: "unit-completion-button unit-completion-button-secondary",
            onClick: a,
            children: d("deepLearnSessionPage.unitCompletion.later")
          })]
        })]
      })]
    })
  });
};
const B = ({
  isLoading: e = true
}) => e ? i.jsxs("div", {
  className: "deep-learn-session-skeleton-container",
  children: [i.jsxs("div", {
    className: "skeleton-ai-response",
    children: [i.jsx("div", {
      className: "skeleton-circle"
    }), i.jsx("div", {
      className: "skeleton-line skeleton-line-long"
    }), i.jsx("div", {
      className: "skeleton-line skeleton-line-medium"
    }), i.jsx("div", {
      className: "skeleton-line skeleton-line-short"
    }), i.jsx("div", {
      className: "skeleton-line skeleton-line-medium"
    }), i.jsx("div", {
      className: "skeleton-line skeleton-line-long"
    }), i.jsx("div", {
      className: "skeleton-line skeleton-line-short"
    }), i.jsx("div", {
      className: "skeleton-line skeleton-line-medium"
    }), i.jsx("div", {
      className: "skeleton-line skeleton-line-long"
    }), i.jsx("div", {
      className: "skeleton-line skeleton-line-short"
    })]
  }), i.jsxs("div", {
    className: "skeleton-user-query",
    children: [i.jsx("div", {
      className: "skeleton-line skeleton-line-medium"
    }), i.jsx("div", {
      className: "skeleton-line skeleton-line-short"
    })]
  })]
}) : null;
const W = () => i.jsx("svg", {
  width: "18",
  height: "18",
  viewBox: "0 0 18 18",
  fill: "none",
  xmlns: "http://www.w3.org/2000/svg",
  children: i.jsx("rect", {
    x: "3",
    y: "3",
    width: "12",
    height: "12",
    rx: "2",
    fill: "#4C6694"
  })
});
const z = {
  select_prompts: "approach_step",
  ask_questions: "questions_step",
  content_planner: "content_planner_step",
  action_planner: "action_plan_step",
  directorAgent: "director_agent_step",
  generate_action_plan: "action_plan_step",
  generate_content: "start_generate_content_step",
  search_files: "search_file_step",
  read_files: "read_file_step",
  read_content: "read_content_step",
  search_and_summarize_web: "search_web_step",
  publish_file: "file_publish_step",
  generate_flashcards: "generate_flashcards_step",
  generate_quiz: "generate_quiz_step",
  generate_instructional_video: "generate_video_step",
  code_generator: "code_generator_step",
  generate_diagram: "generate_diagram_step",
  clarification_planner: "clarification_planner_step",
  recommend_next_step: "recommend_next_step"
};
const H = new Set(["action_planner", "directorAgent", "generate_action_plan"]);
const F = ({
  conversationHistory: e,
  currentResponse: t,
  setCurrentResponse: s,
  isResponseLoading: n,
  isConversationLoading: p,
  isLoadingSessionData: m,
  isSessionReady: g,
  isConnecting: h = false,
  sessionId: f,
  lastMessageTime: _,
  currentSubunitId: k = null,
  unitCompletionData: v,
  unitCompletionRejected: x,
  unitCompletionFadingOut: b = false,
  onUnitCompletionAccept: y,
  onUnitCompletionReject: w,
  onUnitCompletionFadeOutComplete: j,
  onQuestionSubmission: P,
  onAllQuestionsSubmitted: R,
  onRecommendationClick: q,
  onSendMessage: A,
  onResponseComplete: F,
  onSetIsResponseLoading: Q,
  onSetIsConversationLoading: G,
  onSetIsStoppingGeneration: J,
  onSetLastMessageTime: V,
  isStoppingGeneration: Y = false,
  onStopGeneration: K,
  isCurrentSubunitCompleted: X = false,
  onMarkUnitComplete: Z,
  ws: ee = null,
  telemetryConversationId: te = null,
  getConversationSnapshot: se,
  onMessageHandlersReady: ne
}) => {
  const {
    t: oe
  } = o();
  const [ie, ae] = a.useState("");
  const [re, le] = a.useState(false);
  const ce = a.useRef(null);
  const de = a.useRef(null);
  const [ue, pe] = a.useState([]);
  const me = a.useRef(null);
  const [ge, he] = a.useState(null);
  const fe = a.useRef(null);
  const _e = a.useRef(null);
  const ke = a.useRef("");
  const ve = a.useRef(new Map());
  const xe = a.useRef(new Map());
  const [be, ye] = a.useState("");
  const [we, je] = a.useState(false);
  const [Ce, Se] = a.useState(0);
  const [Ne, Le] = a.useState(0);
  const [Ie, $e] = a.useState(0);
  const [Me, Ee] = a.useState(false);
  const [De, Pe] = a.useState(0);
  const [Re, Te] = a.useState(0);
  const [Oe, qe] = a.useState(0);
  const [Ae, Ue] = a.useState(false);
  const [Be, We] = a.useState(false);
  const [ze, He] = a.useState(true);
  const [Fe, Qe] = a.useState(100);
  const [Ge, Je] = a.useState("50%");
  const Ve = a.useRef(null);
  const Ye = a.useRef(null);
  const Ke = a.useRef(null);
  const Xe = a.useRef(null);
  const Ze = a.useCallback(() => {
    const e = Ve.current;
    if (!e) {
      return;
    }
    const {
      scrollTop: t,
      scrollHeight: s,
      clientHeight: n
    } = e;
    const o = s > n;
    je(o);
    const i = s - (t + n);
    He(!(i > 150) || i <= 50);
    if (o) {
      const e = n - 2;
      const o = Math.max(n / s * e, 20);
      const i = t / (s - n) * (e - o);
      Se(o);
      Le(i);
      $e(e);
    } else {
      $e(0);
    }
  }, []);
  const et = a.useCallback(() => {
    if (we) {
      We(true);
      if (Xe.current) {
        clearTimeout(Xe.current);
      }
      Xe.current = setTimeout(() => {
        if (!Ae && !Me) {
          We(false);
        }
      }, 1500);
    }
  }, [we, Ae, Me]);
  const tt = a.useCallback(() => {
    Ze();
    if (we) {
      et();
    }
  }, [Ze, we, et]);
  const st = a.useCallback(() => {
    const e = Ve.current;
    if (e) {
      e.scrollTo({
        top: e.scrollHeight,
        behavior: "smooth"
      });
    }
  }, []);
  const nt = a.useCallback(() => {
    Ue(true);
    We(true);
    if (Xe.current) {
      clearTimeout(Xe.current);
    }
  }, []);
  const ot = a.useCallback(() => {
    Ue(false);
    if (!Me) {
      Xe.current = setTimeout(() => {
        We(false);
      }, 1500);
    }
  }, [Me]);
  const it = a.useCallback(e => {
    e.preventDefault();
    const t = Ve.current;
    if (!t) {
      return;
    }
    if (e.target === Ke.current) {
      return;
    }
    const s = e.currentTarget.getBoundingClientRect();
    const n = (e.clientY - s.top) / (Ie || t.clientHeight);
    const o = t.scrollHeight - t.clientHeight;
    t.scrollTop = n * o;
    et();
  }, [Ie, et]);
  const at = a.useCallback(e => {
    e.preventDefault();
    e.stopPropagation();
    const t = Ve.current;
    if (t) {
      Ee(true);
      We(true);
      Pe(e.clientY);
      Te(t.scrollTop);
      qe(Ce);
      if (Xe.current) {
        clearTimeout(Xe.current);
      }
    }
  }, [Ce]);
  a.useEffect(() => {
    if (!Me) {
      return;
    }
    const e = Ve.current;
    if (!e) {
      return;
    }
    const t = t => {
      var s;
      if (!((s = Ke.current) == null ? undefined : s.parentElement) || !e) {
        return;
      }
      const n = (Ie || e.clientHeight - 2) - Oe;
      if (n <= 0) {
        return;
      }
      const o = (t.clientY - De) / n;
      const i = e.scrollHeight - e.clientHeight;
      const a = o * i;
      const r = Math.max(0, Math.min(i, Re + a));
      e.scrollTop = r;
    };
    const s = () => {
      Ee(false);
      if (!Ae) {
        Xe.current = setTimeout(() => {
          We(false);
        }, 1500);
      }
    };
    document.addEventListener("mousemove", t);
    document.addEventListener("mouseup", s);
    return () => {
      document.removeEventListener("mousemove", t);
      document.removeEventListener("mouseup", s);
    };
  }, [Me, De, Re, Oe, Ae, Ie]);
  a.useEffect(() => {
    const e = Ve.current;
    if (!e) {
      return;
    }
    e.addEventListener("scroll", tt);
    Ze();
    const t = new ResizeObserver(() => {
      Ze();
    });
    t.observe(e);
    return () => {
      e.removeEventListener("scroll", tt);
      t.disconnect();
    };
  }, [tt, Ze]);
  a.useEffect(() => {
    const e = e => {
      const t = Ve.current;
      if (!t) {
        return;
      }
      if (e.ctrlKey) {
        return;
      }
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        return;
      }
      let s = e.target;
      while (s && s !== document.body) {
        if (s.classList.contains("html-animation-modal-overlay") || s.classList.contains("bug-report-modal") || s.classList.contains("settings-modal") || s.classList.contains("canvas-connection-modal") || s.classList.contains("canvas-file-explorer-modal") || s.classList.contains("invite-modal-overlay") || s.classList.contains("discord-modal-overlay") || s.classList.contains("launch-note-overlay") || s.classList.contains("cheatsheet-full-editor-overlay")) {
          return;
        }
        if (s !== t && s.scrollHeight > s.clientHeight) {
          const e = window.getComputedStyle(s).overflowY;
          if (e === "auto" || e === "scroll") {
            return;
          }
        }
        s = s.parentElement;
      }
      e.preventDefault();
      t.scrollTop += e.deltaY;
    };
    window.addEventListener("wheel", e, {
      passive: false
    });
    return () => {
      window.removeEventListener("wheel", e);
    };
  }, []);
  const rt = a.useCallback(e => {
    ae(e.target.value);
    lt();
  }, []);
  const lt = a.useCallback(() => {
    const e = ce.current;
    if (!e) {
      return;
    }
    e.style.height = "auto";
    const t = e.scrollHeight;
    if (t > 40) {
      if (!re) {
        le(true);
      }
    } else if (re) {
      le(false);
    }
    const s = Math.min(t, 200);
    e.style.height = `${s}px`;
  }, [re]);
  a.useEffect(() => {
    if (ie === "") {
      le(false);
      const e = ce.current;
      if (e) {
        e.style.height = "32px";
      }
    }
  }, [ie]);
  const ct = a.useMemo(() => ie.trim().length > 0 && !n && !h, [ie, n, h]);
  const dt = Boolean(v && k === v.currentStep.task_id);
  const ut = e => {
    if (e === 0) {
      return `0 ${oe("deepLearnSessionPage.fileSize.bytesUnit")}`;
    }
    const t = [oe("deepLearnSessionPage.fileSize.bytesUnit"), "KB", "MB", "GB"];
    const s = Math.floor(Math.log(e) / Math.log(1024));
    return parseFloat((e / Math.pow(1024, s)).toFixed(2)) + " " + t[s];
  };
  const pt = e => {
    const t = e.split(".");
    if (t.length > 1) {
      return t[t.length - 1];
    } else {
      return oe("deepLearnSessionPage.unknownLabel");
    }
  };
  a.useEffect(() => () => {
    if (fe.current) {
      clearTimeout(fe.current);
    }
  }, []);
  const mt = a.useCallback(e => {
    if (fe.current) {
      clearTimeout(fe.current);
      fe.current = null;
    }
    const t = oe(e === "after_compression" ? "knowledgeBase.fileTooLargeAfterCompression" : e === "invalid_type" ? "knowledgeBase.fileTypeNotSupported" : e === "upload_failed" ? "knowledgeBase.uploadFailed" : "knowledgeBase.fileTooLarge100MB");
    he(t);
    fe.current = window.setTimeout(() => {
      he(null);
      fe.current = null;
    }, 5000);
  }, [oe]);
  const gt = async e => {
    if (e.length === 0) {
      return;
    }
    const t = e.filter(d);
    if (t.length < e.length) {
      mt("invalid_type");
    }
    if (t.length === 0) {
      return;
    }
    const s = t.filter(e => e.size <= 104857600);
    if (t.length - s.length > 0) {
      mt("limit_100mb");
    }
    if (s.length === 0) {
      return;
    }
    const n = s.map(e => ({
      id: Math.random().toString(36).substr(2, 9),
      file: e,
      fileName: e.name,
      fileType: pt(e.name),
      fileSize: ut(e.size),
      progress: 0,
      isUploading: true,
      isProcessing: false
    }));
    pe(e => [...e, ...n]);
    await Promise.all(s.map((e, t) => (async (e, t) => {
      try {
        let s = null;
        let n = false;
        const o = e => {
          if (n) {
            return;
          }
          const s = Math.min(e * 0.85, 85);
          pe(e => e.map(e => e.id === t ? {
            ...e,
            progress: s
          } : e));
        };
        const i = () => {
          if (!n) {
            pe(e => e.map(e => e.id === t ? {
              ...e,
              progress: 85,
              isUploading: false,
              isProcessing: true
            } : e));
            s = setInterval(() => {
              if (n) {
                if (s) {
                  clearInterval(s);
                }
              } else {
                pe(e => e.map(e => e.id !== t || e.progress >= 99 ? e : {
                  ...e,
                  progress: Math.min(e.progress + Math.random() * 2, 99)
                }));
              }
            }, 200);
          }
        };
        const a = await u(e, o, i);
        n = true;
        if (s) {
          clearInterval(s);
        }
        if (a.success) {
          pe(e => e.map(e => e.id === t ? {
            ...e,
            progress: 100,
            isUploading: false,
            isProcessing: false,
            fileId: a.file_id
          } : e));
        } else {
          const e = a.statusCode === 413;
          pe(e => e.filter(e => e.id !== t));
          if (e) {
            const e = a.reason413 === "after_compression" ? "after_compression" : "limit_100mb";
            mt(e);
          } else {
            mt("upload_failed");
          }
        }
      } catch {
        pe(e => e.filter(e => e.id !== t));
        mt("upload_failed");
      }
    })(e, n[t].id)));
  };
  const ht = a.useCallback(() => {
    const e = ie.trim();
    if (!e || n || h || dt) {
      return;
    }
    const t = ue.filter(e => e.fileId).map(e => ({
      file_id: e.fileId,
      filename: e.fileName
    }));
    ae("");
    const s = ce.current;
    if (s) {
      s.style.height = "32px";
    }
    le(false);
    pe([]);
    A(e, t.length > 0 ? t : undefined);
  }, [ie, n, h, dt, ue, A]);
  const ft = a.useCallback(e => {
    if (e.key === "Enter" && !e.shiftKey && !r(e)) {
      e.preventDefault();
      ht();
    }
  }, [ht]);
  const _t = a.useCallback(e => {
    ae(e);
    if (ce.current) {
      ce.current.focus();
    }
    q(e);
  }, [q]);
  const kt = a.useCallback(e => {
    const t = e.tool_name;
    if (!t) {
      return;
    }
    const n = z[t];
    if (!n) {
      return;
    }
    const o = t === "read_content" ? C() : t === "generate_content" && e.task_title ? e.task_title : n === "action_plan_step" || n === "director_agent_step" ? S() : N(n);
    const i = t === "generate_content" && typeof e.guideline == "string" ? e.guideline.trim() : "";
    const a = t === "generate_content" ? L(e.model_name) : undefined;
    const r = {
      id: `${n}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: n,
      status: "loading",
      title: o,
      blocks: [],
      timestamp: Date.now(),
      ...(i ? {
        guideline: i
      } : {}),
      ...(a ? {
        orbieModelDisplay: a
      } : {}),
      ...(e.sources && Array.isArray(e.sources) ? {
        sources: e.sources
      } : {})
    };
    s(e => {
      let s = e;
      s ||= {
        id: f || `response_${Date.now()}`,
        steps: [],
        timestamp: Date.now()
      };
      if (s.steps.find(e => e.type === n && e.status === "loading")) {
        return s;
      } else {
        _e.current = r.id;
        if (t === "generate_content") {
          ke.current = "";
          ye("");
          ve.current.clear();
          xe.current.clear();
        }
        return {
          ...s,
          steps: [...s.steps, r]
        };
      }
    });
  }, [f, s]);
  const vt = a.useCallback(e => {
    const t = e.tool_name;
    if (!t || !H.has(t)) {
      return;
    }
    const n = z[t];
    if (n) {
      s(e => {
        const t = e ?? {
          id: f || `response_${Date.now()}`,
          steps: [],
          timestamp: Date.now()
        };
        const s = t.steps.map(e => e.type === n && e.status === "loading" ? {
          ...e,
          status: "completed"
        } : e);
        const o = {
          id: `${n}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          type: n,
          status: "loading",
          title: S(),
          blocks: [],
          timestamp: Date.now()
        };
        return {
          ...t,
          steps: [...s, o]
        };
      });
    }
  }, [f, s]);
  const xt = a.useCallback(e => {
    const t = e.tool_name;
    if (!t || !H.has(t)) {
      return;
    }
    const n = function (e) {
      if (typeof e == "string") {
        return e;
      } else if (e == null) {
        return "";
      } else {
        return String(e);
      }
    }(e.chunk);
    if (!n) {
      return;
    }
    const o = z[t];
    if (o) {
      s(e => {
        const t = e ?? {
          id: f || `response_${Date.now()}`,
          steps: [],
          timestamp: Date.now()
        };
        let s = -1;
        for (let n = t.steps.length - 1; n >= 0; n--) {
          const e = t.steps[n];
          if (e.type === o && (s = n, e.status === "loading")) {
            break;
          }
        }
        if (s === -1) {
          const e = {
            id: `${o}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            type: o,
            status: "loading",
            title: S(),
            blocks: [{
              id: `thinking_${Date.now()}`,
              type: "thinking",
              data: {
                text: n
              }
            }],
            timestamp: Date.now()
          };
          return {
            ...t,
            steps: [...t.steps, e]
          };
        }
        const i = t.steps[s];
        const a = i.blocks.find(e => e.type === "thinking");
        if (a) {
          const e = {
            ...a,
            data: {
              ...a.data,
              text: (a.data.text || "") + n
            }
          };
          const o = {
            ...i,
            blocks: i.blocks.map(t => t.id === a.id ? e : t)
          };
          return {
            ...t,
            steps: [...t.steps.slice(0, s), o, ...t.steps.slice(s + 1)]
          };
        }
        const r = {
          id: `thinking_${Date.now()}`,
          type: "thinking",
          data: {
            text: n
          }
        };
        const l = {
          ...i,
          blocks: [...i.blocks, r]
        };
        return {
          ...t,
          steps: [...t.steps.slice(0, s), l, ...t.steps.slice(s + 1)]
        };
      });
    }
  }, [f, s]);
  const bt = a.useCallback(e => {
    var t;
    if (!((t = e.data) == null ? undefined : t.content)) {
      return;
    }
    const n = {
      id: `agent_response_${Date.now()}`,
      type: "text",
      data: {
        text: e.data.content
      }
    };
    s(e => {
      let t = e;
      t ||= {
        id: f || `response_${Date.now()}`,
        steps: [],
        timestamp: Date.now()
      };
      let s = t.steps.find(e => e.type === "content_step");
      if (!s) {
        s = {
          id: `content_step_${Date.now()}`,
          type: "content_step",
          status: "completed",
          title: I("response"),
          blocks: [n],
          timestamp: Date.now()
        };
        return {
          ...t,
          steps: [...t.steps, s]
        };
      }
      const o = {
        ...s,
        blocks: [...s.blocks, n]
      };
      return {
        ...t,
        steps: t.steps.map(e => e.id === s.id ? o : e)
      };
    });
  }, [f, s]);
  const yt = a.useCallback(e => {
    const t = e.tool_name;
    if (!t || t !== "code_generator" || !e.chunk) {
      return;
    }
    const n = z[t];
    if (n) {
      s(t => {
        if (!t) {
          return t;
        }
        let s = -1;
        for (let e = t.steps.length - 1; e >= 0; e--) {
          const o = t.steps[e];
          if (o.type === n && (s = e, o.status === "loading")) {
            break;
          }
        }
        if (s === -1 && _e.current) {
          s = t.steps.findIndex(e => e.id === _e.current);
        }
        if (s === -1) {
          return t;
        }
        const o = t.steps[s];
        let i = o.blocks.find(e => e.type === "code");
        i ||= {
          id: `code_block_${Date.now()}`,
          type: "code",
          data: {
            code: "",
            language: "python",
            status: "generating",
            terminalOutput: ""
          }
        };
        const a = (i.data.code || "") + (e.chunk || "");
        let r = i.data.language || "python";
        const l = a.match(/```(\w+)/);
        if (l) {
          r = l[1];
        }
        let c = a;
        c = c.replace(/^```[\w]*\n?/m, "");
        c = c.replace(/```\s*$/m, "");
        c = c.trim();
        const d = {
          ...i,
          data: {
            ...i.data,
            code: c,
            language: r,
            status: e.tool_status === "streaming" ? "generating" : i.data.status
          }
        };
        const u = o.blocks.findIndex(e => e.id === i.id);
        const p = u !== -1 ? o.blocks.map((e, t) => t === u ? d : e) : [...o.blocks, d];
        const m = {
          ...o,
          blocks: p
        };
        return {
          ...t,
          steps: [...t.steps.slice(0, s), m, ...t.steps.slice(s + 1)]
        };
      });
    }
  }, [s]);
  const wt = a.useCallback(e => {
    const t = e.tool_name;
    if (!t || t !== "code_generator" || !e.chunk) {
      return;
    }
    const n = z[t];
    if (n) {
      s(t => {
        if (!t) {
          return t;
        }
        let s = -1;
        for (let e = t.steps.length - 1; e >= 0; e--) {
          if (t.steps[e].type === n) {
            s = e;
            break;
          }
        }
        if (s === -1) {
          return t;
        }
        const o = t.steps[s];
        let i = o.blocks.find(e => e.type === "code");
        i ||= {
          id: `code_block_${Date.now()}`,
          type: "code",
          data: {
            code: "",
            language: "python",
            status: "executing",
            terminalOutput: ""
          }
        };
        const a = (i.data.terminalOutput || "") + (e.chunk || "");
        const r = {
          ...i,
          data: {
            ...i.data,
            terminalOutput: a,
            status: e.tool_status === "executing" ? "executing" : e.is_complete ? "completed" : i.data.status,
            outputType: e.output_type || "stdout"
          }
        };
        const l = o.blocks.findIndex(e => e.id === i.id);
        const c = l !== -1 ? o.blocks.map((e, t) => t === l ? r : e) : [...o.blocks, r];
        const d = {
          ...o,
          blocks: c
        };
        return {
          ...t,
          steps: [...t.steps.slice(0, s), d, ...t.steps.slice(s + 1)]
        };
      });
    }
  }, [s]);
  const jt = a.useCallback(e => {
    if (!e.chunk) {
      return;
    }
    const t = _e.current;
    if (t) {
      ke.current += e.chunk;
      ye(ke.current);
      s(e => {
        if (!e) {
          return e;
        }
        const s = e.steps.findIndex(e => e.id === t);
        if (s === -1) {
          return e;
        }
        const n = e.steps[s];
        const o = `streaming_content_${t}`;
        let i = n.blocks.find(e => e.type === "text" && e.id === o);
        if (i) {
          const t = {
            ...i,
            data: {
              ...i.data,
              text: ke.current
            }
          };
          const a = {
            ...n,
            blocks: n.blocks.map(e => e.id === o ? t : e)
          };
          return {
            ...e,
            steps: [...e.steps.slice(0, s), a, ...e.steps.slice(s + 1)]
          };
        }
        {
          i = {
            id: o,
            type: "text",
            data: {
              text: ke.current
            }
          };
          const t = {
            ...n,
            blocks: [...n.blocks, i]
          };
          return {
            ...e,
            steps: [...e.steps.slice(0, s), t, ...e.steps.slice(s + 1)]
          };
        }
      });
    }
  }, [s]);
  const Ct = a.useCallback(e => {
    const t = e.data || {};
    const n = e.placeholder_id || t.placeholder_id;
    if (!n) {
      return;
    }
    const o = {
      ...t,
      placeholder_id: n,
      tag: e.tag || t.tag
    };
    ve.current.set(n, o);
    s(e => {
      if (!e) {
        return e;
      }
      let t = false;
      const s = function (e) {
        if (e.size === 0) {
          return;
        }
        const t = {};
        e.forEach((e, s) => {
          t[s] = e;
        });
        return t;
      }(ve.current);
      const i = e.steps.map(e => {
        const i = e.blocks.map(e => {
          var i;
          if (e.type !== "text" || typeof ((i = e.data) == null ? undefined : i.text) != "string") {
            return e;
          }
          if (!e.data.text.includes(n)) {
            return e;
          }
          const a = $(e.data.text, n, o.tag);
          t = true;
          return {
            ...e,
            data: {
              ...e.data,
              text: a,
              ...(s ? {
                inlineDiagrams: {
                  ...(e.data.inlineDiagrams || {}),
                  ...s
                }
              } : {})
            }
          };
        });
        return {
          ...e,
          blocks: i
        };
      });
      if (t) {
        return {
          ...e,
          steps: i
        };
      } else {
        return e;
      }
    });
  }, [s]);
  const St = a.useCallback(e => {
    const t = e.data || {};
    const n = e.placeholder_id || t.placeholder_id;
    if (!n) {
      return;
    }
    const o = {
      ...t,
      placeholder_id: n,
      tag: e.tag || t.tag
    };
    xe.current.set(n, o);
    s(e => {
      if (!e) {
        return e;
      }
      let t = false;
      const s = function (e) {
        if (e.size === 0) {
          return;
        }
        const t = {};
        e.forEach((e, s) => {
          t[s] = e;
        });
        return t;
      }(xe.current);
      const i = e.steps.map(e => {
        const i = e.blocks.map(e => {
          var i;
          if (e.type !== "text" || typeof ((i = e.data) == null ? undefined : i.text) != "string") {
            return e;
          }
          if (!e.data.text.includes(n)) {
            return e;
          }
          const a = M(e.data.text, n, o.tag);
          t = true;
          return {
            ...e,
            data: {
              ...e.data,
              text: a,
              ...(s ? {
                inlineImages: {
                  ...(e.data.inlineImages || {}),
                  ...s
                }
              } : {})
            }
          };
        });
        return {
          ...e,
          blocks: i
        };
      });
      if (t) {
        return {
          ...e,
          steps: i
        };
      } else {
        return e;
      }
    });
  }, [s]);
  const Nt = a.useCallback(e => {
    const t = _e.current;
    if (t) {
      s(e => {
        if (!e) {
          return e;
        }
        const s = e.steps.findIndex(e => e.id === t);
        if (s === -1) {
          return e;
        }
        const n = {
          ...e.steps[s],
          status: "completed"
        };
        ke.current = "";
        ye("");
        return {
          ...e,
          steps: [...e.steps.slice(0, s), n, ...e.steps.slice(s + 1)]
        };
      });
    }
  }, [s]);
  const Lt = a.useCallback(e => {
    if (Q) {
      Q(false);
    }
    if (G) {
      G(false);
    }
    if (e.stopped && J) {
      J(false);
    }
    if (t && t.steps.length !== 0 && F) {
      F(t);
    }
  }, [t, F, Q, G, J]);
  const It = a.useCallback(e => {
    if (Q) {
      Q(false);
    }
    if (G) {
      G(false);
    }
    if (J) {
      J(false);
    }
    s(e => {
      if (!e) {
        return e;
      }
      let t = false;
      const s = e.steps.map(e => e.status === "loading" ? (t = true, {
        ...e,
        status: "completed"
      }) : e);
      if (t) {
        return {
          ...e,
          steps: s
        };
      } else {
        return e;
      }
    });
  }, [Q, G, J, s]);
  const $t = a.useCallback(e => {
    const t = e.tool_name;
    if (!t) {
      return;
    }
    if (t === "generate_content" && (e.tool_status === "error" || e.tool_status === "disconnected")) {
      const e = _e.current;
      if (!e) {
        return;
      }
      s(t => {
        if (!t) {
          return t;
        }
        const s = t.steps.findIndex(t => t.id === e);
        if (s === -1) {
          return t;
        }
        const n = t.steps[s];
        if (n.status !== "loading") {
          return t;
        } else {
          return {
            ...t,
            steps: [...t.steps.slice(0, s), {
              ...n,
              status: "completed"
            }, ...t.steps.slice(s + 1)]
          };
        }
      });
      return;
    }
    if (t === "generate_content" && e.tool_status === "completed") {
      const e = _e.current;
      if (!e) {
        return;
      }
      s(t => {
        if (!t) {
          return t;
        }
        const s = t.steps.findIndex(t => t.id === e);
        if (s === -1) {
          return t;
        }
        const n = {
          ...t.steps[s],
          status: "completed"
        };
        return {
          ...t,
          steps: [...t.steps.slice(0, s), n, ...t.steps.slice(s + 1)]
        };
      });
      return;
    }
    if (t === "generate_content") {
      return;
    }
    const n = z[t];
    if (n) {
      s(s => {
        var o;
        var i;
        var a;
        var r;
        if (!s) {
          return s;
        }
        let l = -1;
        for (let e = s.steps.length - 1; e >= 0; e--) {
          const t = s.steps[e];
          if (t.type === n && (l = e, t.status === "loading")) {
            break;
          }
        }
        if (l === -1) {
          return s;
        }
        const c = s.steps[l];
        if (t === "read_content") {
          if (e.tool_status !== "completed" && e.tool_status !== "error") {
            return s;
          }
          const t = {
            ...c,
            status: "completed",
            title: E(e.data, e.tool_status)
          };
          return {
            ...s,
            steps: [...s.steps.slice(0, l), t, ...s.steps.slice(l + 1)]
          };
        }
        const d = t === "action_planner" || t === "generate_action_plan";
        if (d && e.tool_status !== "completed" && e.tool_status !== "error") {
          return s;
        }
        if (t === "search_and_summarize_web" && e.data) {
          const t = e => ({
            id: `search_results_${Date.now()}`,
            type: "search_results",
            data: {
              results: e.map((e, t) => ({
                id: `result_${t}`,
                title: e.title || oe("studyHistory.untitled"),
                url: e.url || "#",
                domain: e.url ? (() => {
                  try {
                    return new URL(e.url).hostname;
                  } catch {
                    return oe("deepLearnSessionPage.unknownLabel");
                  }
                })() : oe("deepLearnSessionPage.unknownLabel"),
                favicon: e.favicon || null,
                source: e.source || "web"
              }))
            }
          });
          const n = [];
          let o = c;
          if (e.tool_status === "web_search_completed") {
            if (Array.isArray(e.data.results)) {
              n.push(t(e.data.results));
            }
            o = {
              ...c,
              status: "loading",
              blocks: [...c.blocks, ...n],
              ...(e.data.sources ? {
                sources: e.data.sources
              } : {})
            };
          } else if (e.tool_status === "summary_completed") {
            if (e.data.web_search_content) {
              n.push({
                id: `web_search_content_${Date.now()}`,
                type: "content",
                data: {
                  text: e.data.web_search_content
                }
              });
            }
            o = {
              ...c,
              status: "completed",
              blocks: [...c.blocks, ...n],
              ...(e.data.web_conclusion !== undefined ? {
                webConclusion: e.data.web_conclusion
              } : {}),
              ...(e.data.paper_conclusion !== undefined ? {
                paperConclusion: e.data.paper_conclusion
              } : {})
            };
          } else {
            if (e.data.web_search_content) {
              n.push({
                id: `web_search_content_${Date.now()}`,
                type: "content",
                data: {
                  text: e.data.web_search_content
                }
              });
            }
            if (Array.isArray(e.data.results)) {
              n.push(t(e.data.results));
            }
            o = {
              ...c,
              blocks: [...c.blocks, ...n],
              ...(e.data.sources ? {
                sources: e.data.sources
              } : {})
            };
          }
          return {
            ...s,
            steps: [...s.steps.slice(0, l), o, ...s.steps.slice(l + 1)]
          };
        }
        if (t === "publish_file" && e.tool_status === "error") {
          const t = String(((o = e.data) == null ? undefined : o.error_detail) ?? ((i = e.data) == null ? undefined : i.errorDetail) ?? ((a = e.data) == null ? undefined : a.error) ?? "").trim() || oe("deepLearnSessionPage.publishFileError");
          const n = {
            id: `publish_file_error_${Date.now()}`,
            type: "publish_file_error",
            data: {
              detail: t
            }
          };
          const r = {
            ...c,
            status: "completed",
            blocks: [...c.blocks, n]
          };
          return {
            ...s,
            steps: [...s.steps.slice(0, l), r, ...s.steps.slice(l + 1)]
          };
        }
        if (e.tool_status === "completed" || e.is_complete) {
          let n = {
            ...c,
            status: "completed"
          };
          if (e.data) {
            if (d && e.data.steps) {
              const t = {
                id: `action_plan_content_${Date.now()}`,
                type: "content",
                data: {
                  steps: e.data.steps,
                  preferences_memory: e.data.preferences_memory || []
                }
              };
              n = {
                ...n,
                blocks: [...c.blocks, t]
              };
            }
            if (t === "generate_flashcards" && e.data.flashcards) {
              const t = {
                id: `flashcards_${Date.now()}`,
                type: "flashcard",
                data: {
                  flashcards: e.data.flashcards || [],
                  totalCount: e.data.total_count || e.data.totalCount || 0,
                  modelUsed: e.data.model_used || e.data.modelUsed
                }
              };
              n = {
                ...n,
                blocks: [...c.blocks, t]
              };
            }
            if (t === "generate_quiz" && e.data.questions) {
              const t = {
                id: `quiz_${Date.now()}`,
                type: "quiz",
                data: {
                  questions: e.data.questions || [],
                  totalCount: e.data.total_count || e.data.totalCount || 0,
                  modelUsed: e.data.model_used || e.data.modelUsed
                }
              };
              n = {
                ...n,
                blocks: [...c.blocks, t]
              };
            }
            if ((t === "generate_diagram" || t === "diagram_drawer") && e.tool_status === "completed" && e.data) {
              if (e.data.type === "gemini_image" && e.data.file_url) {
                const t = function (e) {
                  if (!e || typeof e != "object") {
                    return;
                  }
                  const t = e;
                  const s = t.content && typeof t.content == "object" ? t.content : undefined;
                  return function (...e) {
                    for (const t of e) {
                      if (typeof t != "string") {
                        continue;
                      }
                      const e = t.trim();
                      if (e) {
                        return e;
                      }
                    }
                  }(t.caption, t.description, t.title, t.alt_text, t.alt, s == null ? undefined : s.caption, s == null ? undefined : s.description, s == null ? undefined : s.title, s == null ? undefined : s.alt_text, s == null ? undefined : s.alt);
                }(e.data);
                const s = {
                  id: `diagram_image_${Date.now()}`,
                  type: "image_simple",
                  data: {
                    url: e.data.file_url,
                    filename: "diagram.png",
                    ...(t ? {
                      caption: t
                    } : {})
                  }
                };
                n = {
                  ...n,
                  blocks: [...c.blocks, s]
                };
              } else if (e.data.type === "html_animation" && e.data.content) {
                const t = {
                  id: `diagram_html_animation_${Date.now()}`,
                  type: "html_animation",
                  data: {
                    htmlContent: e.data.content,
                    fileUrl: e.data.file_url
                  }
                };
                n = {
                  ...n,
                  blocks: [...c.blocks, t]
                };
              } else if (e.data.type === "mermaid" && e.data.content) {
                const t = {
                  id: `diagram_mermaid_${Date.now()}`,
                  type: "mermaid",
                  data: {
                    content: e.data.content,
                    fileUrl: e.data.file_url
                  }
                };
                n = {
                  ...n,
                  blocks: [...c.blocks, t]
                };
              } else if (e.data.type === "desmos_graph" && e.data.content) {
                const t = {
                  id: `diagram_desmos_graph_${Date.now()}`,
                  type: "desmos_graph",
                  data: {
                    expressions: e.data.content.expressions,
                    graph: e.data.content.graph,
                    fileUrl: e.data.file_url
                  }
                };
                n = {
                  ...n,
                  blocks: [...c.blocks, t]
                };
              }
            }
            if (t === "recommend_next_step" && e.data.next_steps) {
              const t = {
                id: `recommend_next_step_${Date.now()}`,
                type: "recommend_next_step_block",
                data: {
                  next_steps: e.data.next_steps
                }
              };
              n = {
                ...n,
                blocks: [...c.blocks, t]
              };
            }
            if (t === "search_images" && ((r = e.data) == null ? undefined : r.images) && Array.isArray(e.data.images)) {
              const t = {
                images: e.data.images.map((e, t) => ({
                  id: `img_${t}`,
                  url: e.image_url,
                  alt: e.title || `Image ${t + 1}`,
                  sourceUrl: e.image_url
                })),
                title: undefined
              };
              const s = {
                id: `image_block_${Date.now()}`,
                type: "image",
                data: t
              };
              n = {
                ...n,
                blocks: [...c.blocks, s]
              };
            }
          }
          return {
            ...s,
            steps: [...s.steps.slice(0, l), n, ...s.steps.slice(l + 1)]
          };
        }
        return s;
      });
    }
  }, [s]);
  const Mt = a.useCallback(e => {
    const t = e.question_data;
    if (G) {
      G(false);
    }
    if (!t || !t.questions) {
      return;
    }
    const n = {
      ...{
        id: `questions_step_${Date.now()}`,
        type: "questions_step",
        status: "completed",
        title: I("questions_step"),
        blocks: [],
        timestamp: Date.now()
      },
      blocks: t.questions.map((e, t) => {
        const s = e.options && Array.isArray(e.options) && e.options.length > 0 ? e.options.map((e, s) => ({
          id: `option_${t}_${s}`,
          text: e,
          value: e
        })) : [];
        return {
          id: `question_${t}_${Date.now()}`,
          type: "choice",
          data: {
            question: e.question,
            options: s,
            isMultiple: e.is_multiple || false,
            allowCustom: e.allow_custom || false,
            selectedValue: null,
            customInput: "",
            disabled: false,
            submitted: false
          }
        };
      })
    };
    s(e => {
      if (!e) {
        return {
          id: f || `response_${Date.now()}`,
          steps: [n],
          timestamp: Date.now()
        };
      }
      const t = e.steps.map(e => e.type === "clarification_planner_step" && e.status === "loading" ? {
        ...e,
        status: "completed"
      } : e);
      return {
        ...e,
        steps: [...t, n]
      };
    });
  }, [f, s, G]);
  a.useEffect(() => {
    if (!t || !G) {
      return;
    }
    if (t.steps.some(e => e.type === "questions_step" && e.blocks.some(e => {
      if (e.type === "choice") {
        return !e.data.submitted;
      }
      return false;
    })) && p) {
      G(false);
    }
  }, [t, p, G]);
  a.useEffect(() => {
    if (v && G && p) {
      G(false);
    }
  }, [v, p, G]);
  const Et = a.useRef(ne);
  a.useEffect(() => {
    Et.current = ne;
  }, [ne]);
  a.useEffect(() => {
    const e = setTimeout(() => {
      if (Et.current) {
        Et.current({
          handleToolSelection: kt,
          handleThinkingMessage: vt,
          handleThinkingChunk: xt,
          handleAgentResponse: bt,
          handleCodeChunk: yt,
          handleCodeOutput: wt,
          handleContentChunk: jt,
          handleInlineDiagram: Ct,
          handleInlineImageSearch: St,
          handleStreamingComplete: Nt,
          handleComplete: Lt,
          handleToolExecution: $t,
          handleUserQuestion: Mt,
          handleBackendError: It
        });
      }
    }, 0);
    return () => clearTimeout(e);
  }, [kt, vt, xt, bt, yt, wt, jt, Ct, St, Nt, Lt, $t, Mt, It]);
  a.useEffect(() => {
    const e = () => {
      if (de.current) {
        const e = de.current.offsetHeight;
        Qe(e + 28);
      }
      if (Ye.current) {
        const e = Ye.current.getBoundingClientRect();
        const t = e.left + e.width / 2;
        Je(`${t}px`);
      }
    };
    e();
    window.addEventListener("resize", e);
    window.addEventListener("scroll", e);
    const t = [];
    if (de.current) {
      const s = new ResizeObserver(e);
      s.observe(de.current);
      t.push(s);
    }
    if (Ye.current) {
      const s = new ResizeObserver(e);
      s.observe(Ye.current);
      t.push(s);
    }
    return () => {
      window.removeEventListener("resize", e);
      window.removeEventListener("scroll", e);
      t.forEach(e => e.disconnect());
    };
  }, [re, ie]);
  const Dt = m && (e.length === 0 || e.every(e => !e.response && !e.query));
  return i.jsxs(i.Fragment, {
    children: [i.jsx(T, {
      containerRef: Ve
    }), i.jsxs("div", {
      className: "session-main-content-wrapper",
      ref: Ye,
      children: [i.jsxs("div", {
        className: "session-main-content",
        ref: Ve,
        children: [Dt ? i.jsx(B, {
          isLoading: true
        }) : g || f ? i.jsxs(i.Fragment, {
          children: [e.length > 0 ? e.map((o, a) => i.jsxs("div", {
            children: [o.file_info && o.file_info.length > 0 && i.jsx("div", {
              className: "conversation-file-display",
              children: i.jsx("div", {
                className: "conversation-file-cards",
                children: o.file_info.map((e, t) => {
                  var s;
                  return i.jsxs("div", {
                    className: "conversation-file-card",
                    children: [i.jsx("div", {
                      className: "conversation-file-icon",
                      children: i.jsx("span", {
                        className: "conversation-file-symbol",
                        children: "📄"
                      })
                    }), i.jsxs("div", {
                      className: "conversation-file-info",
                      children: [i.jsx("div", {
                        className: "conversation-file-name",
                        children: e.filename
                      }), i.jsx("div", {
                        className: "conversation-file-type",
                        children: ((s = e.filename.split(".").pop()) == null ? undefined : s.toUpperCase()) || oe("deepLearnSessionPage.fileTypeFallback")
                      })]
                    })]
                  }, `${o.id}-file-${t}`);
                })
              })
            }), o.query && i.jsx("div", {
              className: "user-query-box",
              children: i.jsx("div", {
                className: "user-query-text",
                children: o.query
              })
            }), a === e.length - 1 && (n || t && t.steps.length > 0) ? i.jsx("div", {
              className: "ai-response",
              children: i.jsx(D, {
                response: t,
                setCurrentResponse: s,
                onQuestionSubmission: P,
                onAllQuestionsSubmitted: R,
                onRecommendationClick: _t,
                isComplete: !n
              })
            }) : o.response && i.jsx("div", {
              className: "ai-response",
              children: i.jsx(D, {
                response: o.response,
                setCurrentResponse: s,
                onQuestionSubmission: P,
                onAllQuestionsSubmitted: R,
                onRecommendationClick: _t,
                isComplete: true,
                isHistoryResponse: true
              })
            })]
          }, o.id)) : t && t.steps.length > 0 && i.jsx("div", {
            className: "ai-response",
            children: i.jsx(D, {
              response: t,
              setCurrentResponse: s,
              onQuestionSubmission: P,
              onAllQuestionsSubmitted: R,
              onRecommendationClick: _t,
              isComplete: !n
            })
          }), dt && v && i.jsx(U, {
            currentStep: v.currentStep,
            nextStep: v.nextStep,
            conversationId: v.conversationId,
            onProceed: y,
            onLater: w,
            showButtons: !x,
            isFadingOut: b,
            onFadeOutComplete: j
          }), p && !m && i.jsx(O, {
            isLoading: p,
            lastMessageTime: _,
            ws: ee,
            conversationId: te,
            conversationType: "dpls",
            getConversationSnapshot: se
          })]
        }) : i.jsx(B, {
          isLoading: true
        }), !ze && i.jsx("button", {
          className: "scroll-to-bottom-button",
          onClick: st,
          "aria-label": "Scroll to bottom",
          style: {
            bottom: `${Fe}px`,
            left: Ge,
            transform: "translateX(-50%)"
          },
          children: i.jsxs("svg", {
            width: "16",
            height: "16",
            viewBox: "0 0 16 16",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            children: [i.jsx("path", {
              d: "M8 2L8 12",
              stroke: "currentColor",
              strokeWidth: "1.5",
              strokeLinecap: "round"
            }), i.jsx("path", {
              d: "M4 8L8 12L12 8",
              stroke: "currentColor",
              strokeWidth: "1.5",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              fill: "none"
            })]
          })
        })]
      }), we && i.jsx("div", {
        className: "custom-scrollbar-hover-zone",
        onMouseEnter: nt,
        onMouseLeave: ot,
        children: i.jsxs("div", {
          className: "custom-scrollbar " + (we && (Ae || Me || Be) ? "visible" : ""),
          onClick: it,
          children: [i.jsx("div", {
            className: "custom-scrollbar-track " + (Me ? "dragging" : ""),
            style: {
              height: Ie > 0 ? `${Ie}px` : "0px"
            }
          }), i.jsx("div", {
            className: "custom-scrollbar-thumb " + (Me ? "dragging" : ""),
            ref: Ke,
            onMouseDown: at,
            style: {
              height: `${Ce}px`,
              top: `${Ne}px`
            }
          })]
        })
      }), i.jsx("div", {
        className: "session-input-container",
        ref: de,
        children: i.jsxs("div", {
          className: "session-input-bar " + (re || ue.length > 0 ? "multiline" : ""),
          children: [ue.length > 0 && i.jsx("div", {
            className: "file-cards-container",
            children: i.jsx("div", {
              className: "file-cards-scroll",
              children: ue.map(e => i.jsx(l, {
                fileName: e.fileName,
                fileType: e.fileType,
                fileSize: e.fileSize,
                progress: e.progress,
                isUploading: e.isUploading,
                isProcessing: e.isProcessing,
                onRemove: () => {
                  t = e.id;
                  pe(e => e.filter(e => e.id !== t));
                  return;
                  var t;
                }
              }, e.id))
            })
          }), i.jsx("button", {
            className: "input-action-button",
            onClick: () => {
              if (me.current) {
                me.current.click();
              }
            },
            "aria-label": "Add files",
            children: i.jsx("svg", {
              width: "20",
              height: "20",
              viewBox: "0 0 24 24",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: i.jsx("path", {
                d: "M12 5V19M5 12H19",
                stroke: "#666",
                strokeWidth: "2",
                strokeLinecap: "round",
                strokeLinejoin: "round"
              })
            })
          }), i.jsx("textarea", {
            ref: ce,
            value: ie,
            onChange: rt,
            onKeyDown: ft,
            placeholder: oe(h ? "courseSession.connecting" : "deepLearnSessionPage.followUpPlaceholder"),
            className: "session-input-field",
            disabled: h,
            rows: 1
          }), i.jsx("button", {
            className: "input-send-button " + (!n || Y || dt ? ct ? "enabled" : "disabled" : "stop-state"),
            onClick: n && !dt && K ? K : ht,
            disabled: Y || !n && !ct || dt,
            children: n && !dt ? Y ? i.jsx("div", {
              className: "loading-spinner"
            }) : i.jsx(W, {}) : i.jsx("svg", {
              width: "16",
              height: "16",
              viewBox: "0 0 24 24",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              children: i.jsx("path", {
                d: "M12 19V5M5 12L12 5L19 12",
                stroke: "currentColor",
                strokeWidth: "2",
                strokeLinecap: "round",
                strokeLinejoin: "round"
              })
            })
          })]
        })
      }), i.jsx("input", {
        ref: me,
        type: "file",
        multiple: true,
        onChange: async e => {
          const t = e.target.files;
          if (t && t.length !== 0) {
            await gt(Array.from(t));
            if (me.current) {
              me.current.value = "";
            }
          }
        },
        style: {
          display: "none"
        },
        accept: c
      }), ge && i.jsxs("div", {
        className: "upload-error-toast",
        children: [i.jsx("img", {
          src: "/components/quotaReminder/alert.svg",
          alt: "",
          className: "upload-error-toast-icon",
          "aria-hidden": true
        }), i.jsx("div", {
          className: "upload-error-toast-content",
          children: ge
        })]
      })]
    })]
  });
};
const Q = ({
  isOpen: e,
  unitTitle: t,
  onClose: s,
  onConfirm: n
}) => {
  const {
    t: a
  } = o();
  if (e) {
    return i.jsx("div", {
      className: "unlock-modal-overlay",
      onClick: s,
      children: i.jsxs("div", {
        className: "unlock-modal-container",
        onClick: e => e.stopPropagation(),
        children: [i.jsxs("div", {
          className: "unlock-modal-header",
          children: [i.jsx("div", {
            className: "unlock-modal-icon-wrapper",
            children: i.jsx("img", {
              src: "/pages/deepLeanSessionPage/lock.svg",
              alt: "",
              className: "unlock-modal-lock-icon"
            })
          }), i.jsx("h3", {
            className: "unlock-modal-title",
            children: a("deepLearnSessionPage.unlockUnitModal.lessonLocked")
          })]
        }), i.jsx("p", {
          className: "unlock-modal-message",
          children: a("deepLearnSessionPage.unlockUnitModal.lessonsBeforeNotCompleted", {
            unitTitle: t
          })
        }), i.jsx("p", {
          className: "unlock-modal-prompt",
          children: a("deepLearnSessionPage.unlockUnitModal.skipAheadPrompt")
        }), i.jsx("div", {
          className: "unlock-modal-hint",
          children: a("deepLearnSessionPage.unlockUnitModal.hint")
        }), i.jsxs("div", {
          className: "unlock-modal-actions",
          children: [i.jsx("button", {
            className: "unlock-modal-btn unlock-modal-btn--cancel",
            onClick: s,
            children: a("deepLearnSessionPage.unlockUnitModal.later")
          }), i.jsxs("button", {
            className: "unlock-modal-btn unlock-modal-btn--confirm",
            onClick: n,
            children: [i.jsx("img", {
              src: "/pages/deepLeanSessionPage/unlock.svg",
              alt: "",
              className: "unlock-btn-icon"
            }), a("deepLearnSessionPage.unlockUnitModal.unlockNow")]
          })]
        })]
      })
    });
  } else {
    return null;
  }
};
const G = ({
  onClick: e
}) => {
  const {
    t: t
  } = o();
  const s = a.useRef(null);
  const [n, r] = a.useState(null);
  return i.jsxs(i.Fragment, {
    children: [i.jsx("button", {
      ref: s,
      className: "item-complete-btn",
      onClick: t => {
        t.stopPropagation();
        e();
      },
      onMouseEnter: () => {
        if (s.current) {
          const e = s.current.getBoundingClientRect();
          r({
            top: e.top + e.height / 2,
            left: e.right + 8
          });
        }
      },
      onMouseLeave: () => r(null),
      "aria-label": "Mark step complete",
      children: i.jsx("svg", {
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
    }), n && i.jsx("div", {
      className: "item-complete-tooltip",
      style: {
        top: n.top,
        left: n.left
      },
      children: t("deepLearnSessionPage.markSectionComplete")
    })]
  });
};
const J = () => {
  const r = p();
  const {
    subtaskId: l,
    sessionId: c
  } = m();
  const {
    t: d
  } = o();
  const [u, C] = a.useState(false);
  const [S, N] = a.useState(false);
  const [L, I] = a.useState(false);
  const [$, M] = a.useState(0);
  const [E, D] = a.useState(null);
  const [T, O] = a.useState(false);
  const U = a.useRef(null);
  const [B, W] = a.useState(null);
  const z = a.useRef(null);
  a.useEffect(() => () => {
    if (z.current) {
      clearTimeout(z.current);
    }
  }, []);
  const H = a.useRef(null);
  const [J, V] = a.useState(false);
  const [Y, K] = a.useState(false);
  const [X, Z] = a.useState(false);
  const [ee, te] = a.useState(null);
  const [se, ne] = a.useState(null);
  const [oe, ie] = a.useState(false);
  a.useEffect(() => {
    const e = e => {
      const t = e.detail;
      if ((t == null ? undefined : t.sessionId) && c && t.sessionId === c) {
        te(e => (e == null ? undefined : e.taskPlan) && typeof e.taskPlan == "object" ? {
          ...e,
          taskPlan: {
            ...e.taskPlan,
            title: t.title
          }
        } : e);
      }
    };
    window.addEventListener("hyperknow-session-renamed", e);
    return () => window.removeEventListener("hyperknow-session-renamed", e);
  }, [c]);
  const ae = a.useRef(new Set());
  const re = a.useRef(null);
  const le = a.useRef(null);
  const ce = a.useRef(new Map());
  const de = a.useRef(null);
  const ue = a.useRef(false);
  const pe = a.useRef(0);
  const me = a.useRef(null);
  const ge = a.useRef(false);
  const he = a.useRef(() => {});
  const [fe, _e] = a.useState([]);
  const [ke, ve] = a.useState(null);
  const [xe, be] = a.useState(null);
  const [ye, we] = a.useState(new Map());
  const [je, Ce] = a.useState([]);
  const [Se, Ne] = a.useState(null);
  const [Le, Ie] = a.useState(false);
  const [$e, Me] = a.useState(false);
  const [Ee, De] = a.useState(false);
  const Pe = a.useRef(false);
  const [Re, Te] = a.useState(false);
  const [Oe, qe] = a.useState(false);
  const [Ae, Ue] = a.useState(0);
  const Be = a.useRef(null);
  const We = a.useRef(null);
  a.useEffect(() => {}, [r]);
  const ze = a.useCallback((e, t) => {
    if (e.length === 0) {
      return 0;
    }
    const s = e.length;
    let n = 0;
    e.forEach(e => {
      if (e.isCompleted) {
        n += 1 / s;
      } else {
        const o = (t.get(e.id) || []).filter(e => e.response !== null).length;
        if (o === 1) {
          n += 1 / (s * 4);
        } else if (o > 1) {
          n += 1 / (s * 2);
        }
      }
    });
    return Math.round(n * 100);
  }, []);
  a.useEffect(() => {
    const e = H.current;
    if (!e) {
      return;
    }
    let t = null;
    const s = () => {
      e.classList.add("scrolling");
      if (t) {
        clearTimeout(t);
      }
      t = setTimeout(() => {
        e.classList.remove("scrolling");
      }, 300);
    };
    e.addEventListener("scroll", s);
    return () => {
      e.removeEventListener("scroll", s);
      if (t) {
        clearTimeout(t);
      }
    };
  }, []);
  a.useEffect(() => {
    Pe.current = Ee;
  }, [Ee]);
  a.useEffect(() => {
    _e(e => {
      if (e.length === 0) {
        return e;
      }
      const t = e.map(e => ({
        ...e,
        progress: ze(e.items, ye)
      }));
      if (e.some((e, s) => e.progress !== t[s].progress)) {
        return t;
      } else {
        return e;
      }
    });
  }, [ye, ze]);
  const [He, Fe] = a.useState({
    id: c || "new-session",
    timestamp: Date.now(),
    steps: []
  });
  const Qe = a.useCallback(e => {
    if (e && e.steps.length !== 0) {
      Ce(t => {
        if (t.length === 0) {
          let s = null;
          let n = null;
          for (const [e, t] of ce.current.entries()) {
            n = e;
            s = t;
            break;
          }
          if (s) {
            we(t => {
              const o = new Map(t);
              const i = o.get(s) || [];
              const a = i.findIndex(e => e.id === n);
              if (a >= 0) {
                const t = i.map((t, s) => s === a ? {
                  ...t,
                  response: e
                } : t);
                o.set(s, t);
              } else {
                const t = {
                  id: n,
                  query: "",
                  response: e
                };
                o.set(s, [...i, t]);
              }
              ce.current.delete(n);
              return o;
            });
          } else if (e && e.steps.length > 0) {
            const t = {
              id: `initial-${Date.now()}`,
              query: "",
              response: e
            };
            if (ke) {
              we(e => {
                const s = new Map(e);
                s.set(ke, [t]);
                return s;
              });
            }
            return [t];
          }
          return t;
        }
        const s = t[t.length - 1];
        const n = t.map((s, n) => n === t.length - 1 ? {
          ...s,
          response: e
        } : s);
        let o = null;
        if (s.id && ce.current.has(s.id)) {
          o = ce.current.get(s.id) || null;
          ce.current.delete(s.id);
        } else {
          o = ke;
        }
        if (o) {
          we(t => {
            const n = new Map(t);
            const i = n.get(o) || [];
            const a = i.findIndex(e => e.id === s.id);
            let r;
            r = a >= 0 ? i.map((t, s) => s === a ? {
              ...t,
              response: e
            } : t) : [...i, {
              ...s,
              response: e
            }];
            n.set(o, r);
            return n;
          });
        }
        return n;
      });
    }
  }, [ke]);
  const Ge = a.useCallback(e => {
    var t;
    if (e.tool_name !== "manage_task_progress" || !e.step_data) {
      return;
    }
    Te(false);
    De(false);
    if (!e.requires_acknowledgment) {
      if ((t = Be.current) != null) {
        t.call(Be, "accept");
      }
      return;
    }
    const s = e.next_step && typeof e.next_step == "object" ? e.next_step : null;
    Ne({
      currentStep: e.step_data,
      nextStep: s,
      conversationId: e.conversation_id ?? ""
    });
    Ie(false);
  }, []);
  const Je = a.useCallback(e => {
    if (ke) {
      we(t => {
        const s = new Map(t);
        s.set(ke, e);
        return s;
      });
    }
  }, [ke]);
  a.useEffect(() => {
    if (He.steps.length > 0) {
      Ce(e => e.length === 0 ? e : e.map((t, s) => s === e.length - 1 ? {
        ...t,
        response: He
      } : t));
      if (ke) {
        we(e => {
          const t = new Map(e);
          const s = t.get(ke) || [];
          if (s.length === 0) {
            return e;
          }
          const n = s.map((e, t) => t === s.length - 1 ? {
            ...e,
            response: He
          } : e);
          t.set(ke, n);
          return t;
        });
      }
    }
  }, [He, ke]);
  const Ve = a.useCallback(e => {
    const t = ye.get(e);
    if (t && t.length > 0) {
      return false;
    }
    for (const s of fe) {
      const t = s.items.find(t => t.id === e);
      if (t) {
        return !t.isCompleted && !t.isInProgress;
      }
    }
    return false;
  }, [fe, ye]);
  const Ye = a.useCallback(e => {
    for (const t of fe) {
      const s = t.items.find(t => t.id === e);
      if (s) {
        return s.title;
      }
    }
    return "";
  }, [fe]);
  const Ke = a.useCallback(e => {
    for (let t = 0; t < fe.length; t++) {
      const s = fe[t];
      for (let n = 0; n < s.items.length; n++) {
        if (s.items[n].id === e) {
          return `${t + 1}.${n + 1}`;
        }
      }
    }
    return null;
  }, [fe]);
  const Xe = a.useMemo(() => {
    if (!ke) {
      return false;
    }
    for (const e of fe) {
      const t = e.items.find(e => e.id === ke);
      if (t) {
        return !!t.isCompleted;
      }
    }
    return false;
  }, [fe, ke]);
  const Ze = a.useCallback(e => {
    for (let t = 0; t < fe.length; t++) {
      const s = fe[t];
      for (let n = 0; n < s.items.length; n++) {
        if (s.items[n].id === e) {
          if (n + 1 < s.items.length) {
            return {
              unitIndex: t,
              itemIndex: n + 1,
              taskId: s.items[n + 1].id
            };
          } else if (t + 1 < fe.length && fe[t + 1].items.length > 0) {
            return {
              unitIndex: t + 1,
              itemIndex: 0,
              taskId: fe[t + 1].items[0].id
            };
          } else {
            return null;
          }
        }
      }
    }
    return null;
  }, [fe]);
  const et = a.useCallback(e => {
    for (let t = 0; t < fe.length; t++) {
      const s = fe[t];
      for (let n = 0; n < s.items.length; n++) {
        if (s.items[n].id === e) {
          if (n - 1 >= 0) {
            return {
              unitIndex: t,
              itemIndex: n - 1,
              taskId: s.items[n - 1].id
            };
          }
          if (t - 1 >= 0 && fe[t - 1].items.length > 0) {
            const e = fe[t - 1];
            const s = e.items.length - 1;
            return {
              unitIndex: t - 1,
              itemIndex: s,
              taskId: e.items[s].id
            };
          }
          return null;
        }
      }
    }
    return null;
  }, [fe]);
  const tt = a.useCallback(() => {
    O(true);
    if (U.current) {
      clearTimeout(U.current);
    }
    U.current = setTimeout(() => O(false), 2500);
  }, []);
  const st = a.useCallback((e, t = true) => {
    if (Pe.current && !Se) {
      tt();
      return;
    }
    Z(true);
    if (ke) {
      let e = je;
      if (He && He.steps.length > 0) {
        e = e.length > 0 ? e.map((t, s) => s === e.length - 1 ? {
          ...t,
          response: He
        } : t) : [{
          id: `response-${Date.now()}`,
          query: "",
          response: He
        }];
      }
      Je(e);
    }
    let s = ye.get(e) || [];
    if (s.length === 0) {
      const t = {
        id: `initial-${Date.now()}`,
        query: "",
        response: null
      };
      s = [t];
      we(t => {
        const n = new Map(t);
        n.set(e, s);
        return n;
      });
    }
    Ce(s);
    ve(e);
    const n = s.some(e => e.response || e.query);
    const o = s.length > 0 ? s[s.length - 1] : null;
    if ((o == null ? undefined : o.response) && o.response.steps.length > 0) {
      Fe(o.response);
      Z(false);
    } else {
      Fe({
        id: c || `response_${Date.now()}`,
        steps: [],
        timestamp: Date.now()
      });
      if (n) {
        Z(false);
      } else {
        Z(false);
        De(true);
        Te(true);
        if (t) {
          const t = Ke(e);
          if (t && (se == null ? undefined : se.ws) && se.ws.readyState === WebSocket.OPEN) {
            se.ws.send(JSON.stringify({
              type: "enter_new_step",
              step_id: t
            }));
          }
        }
      }
    }
    _e(t => t.map(t => ({
      ...t,
      items: t.items.map(t => ({
        ...t,
        isCurrent: t.id === e
      }))
    })));
  }, [tt, ke, je, He, ye, c, Je, Se, se, Ke]);
  const nt = a.useCallback(e => {
    var t;
    if (!Se || !se || !se.ws || se.ws.readyState !== WebSocket.OPEN) {
      return;
    }
    const s = {
      type: "step_completion_response",
      action: e
    };
    try {
      se.ws.send(JSON.stringify(s));
      if (e === "reject") {
        Te(false);
        Me(true);
        return;
      }
      if (e === "accept") {
        const e = Se.currentStep.task_id;
        const s = (t = Se.nextStep) == null ? undefined : t.task_id;
        if (ke) {
          let e = je;
          if (He && He.steps.length > 0) {
            e = e.length > 0 ? e.map((t, s) => s === e.length - 1 ? {
              ...t,
              response: He
            } : t) : [{
              id: `response-${Date.now()}`,
              query: "",
              response: He
            }];
          }
          Je(e);
        }
        _e(t => t.map(t => ({
          ...t,
          items: t.items.map(t => t.id === e ? {
            ...t,
            isCompleted: true,
            isCurrent: false,
            isInProgress: false
          } : s && t.id === s ? (be(s), {
            ...t,
            isCurrent: true,
            isInProgress: true
          }) : {
            ...t,
            isCurrent: false
          }),
          progress: ze(t.items.map(t => t.id === e ? {
            ...t,
            isCompleted: true
          } : t), ye)
        })));
        if (!s) {
          Ie(true);
          Te(false);
          return;
        }
        if (ke) {
          let e = je;
          if (He && He.steps.length > 0) {
            e = e.length > 0 ? e.map((t, s) => s === e.length - 1 ? {
              ...t,
              response: He
            } : t) : [{
              id: `response-${Date.now()}`,
              query: "",
              response: He
            }];
          }
          Je(e);
        }
        Z(true);
        let n = ye.get(s) || [];
        if (n.length === 0) {
          const e = {
            id: `initial-${Date.now()}`,
            query: "",
            response: null
          };
          n = [e];
          we(e => {
            const t = new Map(e);
            t.set(s, n);
            return t;
          });
        }
        Ce(n);
        ve(s);
        if (n.length > 0 && n[n.length - 1].response) {
          Fe(n[n.length - 1].response);
          Z(false);
        } else {
          Fe({
            id: c || `response_${Date.now()}`,
            steps: [],
            timestamp: Date.now()
          });
          Z(false);
          if (!n.some(e => e.response || e.query)) {
            De(true);
            Te(true);
          }
        }
      }
      Ne(null);
      Ie(false);
    } catch (n) {}
  }, [Se, se, ke, je, ye, c, Je]);
  a.useEffect(() => {
    Be.current = nt;
  }, [nt]);
  const ot = a.useCallback(() => {
    Ne(null);
    Me(false);
    Ie(false);
  }, []);
  const it = a.useCallback(() => {
    if (!(se == null ? undefined : se.ws) || se.ws.readyState !== WebSocket.OPEN) {
      return;
    }
    const e = {
      type: "mark_step_complete",
      step_id: ke ? Ke(ke) : null
    };
    se.ws.send(JSON.stringify(e));
  }, [se, ke, Ke]);
  const at = a.useCallback((e, t, s) => {
    Fe(n => {
      if (!n) {
        return n;
      }
      const o = n.steps.find(t => t.id === e);
      if (!o) {
        return n;
      }
      const i = o.blocks.map(e => {
        if (e.id === t) {
          const t = !e.data.selectedValue && s && s.trim();
          return {
            ...e,
            data: {
              ...e.data,
              selectedValue: t ? null : s,
              customInput: t ? s : e.data.customInput || "",
              submitted: true,
              disabled: true
            }
          };
        }
        return e;
      });
      const a = {
        ...o,
        blocks: i
      };
      if (i.every(e => e.data.submitted)) {
        Te(true);
        const t = n.steps.findIndex(t => t.id === e);
        if (t !== -1) {
          const e = {
            ...a,
            status: "completed"
          };
          return {
            ...n,
            steps: [...n.steps.slice(0, t), e, ...n.steps.slice(t + 1)]
          };
        }
      }
      const r = n.steps.findIndex(t => t.id === e);
      if (r !== -1) {
        return {
          ...n,
          steps: [...n.steps.slice(0, r), a, ...n.steps.slice(r + 1)]
        };
      } else {
        return n;
      }
    });
  }, []);
  const rt = a.useCallback(() => {
    Te(true);
  }, []);
  const lt = a.useCallback(e => {}, []);
  const ct = a.useCallback(() => {
    if (Ee && !Oe) {
      try {
        qe(true);
        if (!se || !se.ws || se.ws.readyState !== WebSocket.OPEN) {
          qe(false);
          return;
        }
        const e = {
          type: "stop_generation"
        };
        se.ws.send(JSON.stringify(e));
      } catch (e) {
        qe(false);
      }
    }
  }, [Ee, Oe, se]);
  const dt = a.useCallback(e => {
    var t;
    var s;
    if (e.type === "pong") {
      return;
    }
    Ue(Date.now());
    const n = We.current;
    if (n) {
      switch (e.type) {
        case "deep_learn_session_created":
          break;
        case "tool_selection":
          n.handleToolSelection(e);
          break;
        case "thinking":
          n.handleThinkingMessage(e);
          break;
        case "thinking_chunk":
          n.handleThinkingChunk(e);
          break;
        case "agent_response":
          n.handleAgentResponse(e);
          break;
        case "code_chunk":
          n.handleCodeChunk(e);
          break;
        case "code_output":
          n.handleCodeOutput(e);
          break;
        case "tool_execution":
          n.handleToolExecution(e);
          break;
        case "step_completion":
          Ge(e);
          break;
        case "content_chunk":
          n.handleContentChunk(e);
          break;
        case "inline_diagram":
          if ((t = n.handleInlineDiagram) != null) {
            t.call(n, e);
          }
          break;
        case "inline_image_search":
          if ((s = n.handleInlineImageSearch) != null) {
            s.call(n, e);
          }
          break;
        case "streaming_complete":
          n.handleStreamingComplete(e);
          break;
        case "complete":
          n.handleComplete(e);
          break;
        case "stopped":
          n.handleComplete({
            ...e,
            stopped: true
          });
          break;
        case "user_question":
          n.handleUserQuestion(e);
          break;
        case "insufficient_funds":
          De(false);
          Te(false);
          W(e.message || d("deepLearnSessionPage.insufficientCredits"));
          if (z.current) {
            clearTimeout(z.current);
          }
          z.current = setTimeout(() => W(null), 6000);
          break;
        case "error":
          De(false);
          Te(false);
          n.handleBackendError(e);
      }
    } else if (e.type === "error" || e.is_complete === true) {
      De(false);
      Te(false);
    }
  }, [Ge]);
  const ut = a.useRef(dt);
  a.useEffect(() => {
    ut.current = dt;
  }, [dt]);
  const pt = a.useCallback(async (e, t) => {
    if (e.trim()) {
      if (!se || !se.ws || se.ws.readyState !== WebSocket.OPEN) {
        if (se && c) {
          try {
            await se.connectWithSessionId();
          } catch (s) {}
        }
        if (!se || !se.ws || se.ws.readyState !== WebSocket.OPEN) {
          return;
        }
      }
      try {
        let s = [...je];
        if (He && He.steps.length > 0 && s.length === 0) {
          const e = {
            id: `initial-${Date.now()}`,
            query: "",
            response: He
          };
          s.push(e);
        } else if (He && He.steps.length > 0 && s.length > 0) {
          s = s.map((e, t) => t === s.length - 1 ? {
            ...e,
            response: He
          } : e);
        }
        const n = `query-${Date.now()}`;
        const o = {
          id: n,
          query: e,
          response: null
        };
        if (t && t.length > 0) {
          o.file_info = t;
        }
        s.push(o);
        Ce(s);
        Je(s);
        if (ke) {
          ce.current.set(n, ke);
        }
        Fe({
          id: c || `response_${Date.now()}`,
          steps: [],
          timestamp: Date.now()
        });
        const i = ke ? Ke(ke) ?? undefined : undefined;
        qe(false);
        De(true);
        Te(true);
        Ue(Date.now());
        se.sendMessage(e, i, t);
      } catch (n) {
        De(false);
        Te(false);
      }
    }
  }, [se, ke, Ke, je, He, c, Je]);
  a.useEffect(() => {
    de.current = se;
  }, [se]);
  a.useEffect(() => {
    ue.current = false;
    return () => {
      ue.current = true;
      if (me.current) {
        clearTimeout(me.current);
        me.current = null;
      }
    };
  }, []);
  const mt = a.useCallback(async () => {
    if (ue.current || ge.current || !c) {
      return;
    }
    const e = de.current;
    if ((e == null ? undefined : e.ws) && (e.ws.readyState === WebSocket.OPEN || e.ws.readyState === WebSocket.CONNECTING)) {
      return;
    }
    const t = s();
    if (t) {
      ge.current = true;
      try {
        const e = g.getInstance(t, null, r, c);
        e.setMessageParser(e => ut.current(e));
        e.setCloseHandler(() => {
          if (!ue.current) {
            he.current();
          }
        });
        await e.connectWithSessionId();
        ne(e);
        pe.current = 0;
      } catch (n) {
        he.current();
      } finally {
        ge.current = false;
      }
    }
  }, [c, r]);
  a.useEffect(() => {
    he.current = () => {
      if (ue.current || me.current) {
        return;
      }
      const e = pe.current;
      const t = Math.min(30000, Math.pow(2, e) * 1000);
      pe.current = Math.min(e + 1, 5);
      me.current = setTimeout(() => {
        me.current = null;
        mt();
      }, t);
    };
  }, [mt]);
  a.useEffect(() => {
    var e;
    if (se) {
      se.setCloseHandler(() => {
        if (!ue.current) {
          he.current();
        }
      });
      if (((e = se.ws) == null ? undefined : e.readyState) === WebSocket.OPEN) {
        pe.current = 0;
      }
    }
  }, [se]);
  a.useEffect(() => {
    const e = () => {
      if (document.visibilityState !== "visible" || !c) {
        return;
      }
      const e = de.current;
      if (!(e == null ? undefined : e.ws) || e.ws.readyState === WebSocket.CLOSED || e.ws.readyState === WebSocket.CLOSING) {
        he.current();
      }
    };
    document.addEventListener("visibilitychange", e);
    return () => document.removeEventListener("visibilitychange", e);
  }, [c]);
  a.useEffect(() => {
    h(Ee);
    return () => h(false);
  }, [Ee]);
  a.useEffect(() => {
    (async () => {
      if (f()) {
        try {
          const e = await y("type-001");
          if (e.success) {
            M(e.received_by.length);
          } else {
            M(0);
          }
        } catch (e) {
          M(0);
        }
      } else {
        M(0);
      }
    })();
  }, []);
  a.useEffect(() => {
    if (!c) {
      le.current = null;
      return;
    }
    if (l) {
      return;
    }
    if (re.current === c) {
      re.current = null;
      return;
    }
    const t = le.current !== null && le.current !== c;
    if (ae.current.has(c) && !t) {
      return;
    }
    if (t && ae.current.has(c)) {
      ae.current.delete(c);
    }
    (async () => {
      ae.current.add(c);
      Z(true);
      Te(true);
      V(true);
      _e([]);
      Ce([]);
      Fe({
        id: c || `loading-${Date.now()}`,
        steps: [],
        timestamp: Date.now()
      });
      try {
        const n = s();
        if (!n) {
          V(false);
          Z(false);
          Te(false);
          return;
        }
        (async () => {
          try {
            const e = g.getInstance(n, null, r, c);
            e.setMessageParser(e => {
              dt(e);
            });
            e.setOnSessionResumed(() => {
              V(false);
            });
            await e.connectWithSessionId();
            ne(e);
          } catch (e) {
            V(false);
          }
        })();
        const o = await (async t => {
          try {
            const s = e();
            if (!s.Authorization) {
              return {
                success: false,
                error: "User not authenticated",
                message: "Please log in to view session data"
              };
            }
            const n = await fetch(A, {
              method: "POST",
              headers: {
                accept: "application/json",
                "Content-Type": "application/json",
                ...s
              },
              body: JSON.stringify({
                deep_learn_session_id: t
              })
            });
            const o = await n.json();
            if (n.ok) {
              return o;
            } else {
              return {
                success: false,
                error: o.message || "Failed to fetch session data",
                message: o.message
              };
            }
          } catch (s) {
            return {
              success: false,
              error: "Network error or server unavailable"
            };
          }
        })(c);
        if ("success" in o && !o.success) {
          try {
            const e = {
              where: "dpls_resume",
              get_session_data: "fail",
              session_id: c ?? null,
              error: String(o.error ?? ""),
              timestamp: Date.now()
            };
            j({
              conversation_id: c ?? "",
              conversation_type: "dpls",
              error_type: "dpls_resume_diagnostic",
              error_data: e
            });
          } catch (t) {}
          Z(false);
          Te(false);
          V(false);
          return;
        }
        const i = o;
        let a = [];
        if (i.session_task_plan && Array.isArray(i.session_task_plan)) {
          const e = i.conversation_data.progress;
          const t = [];
          i.session_task_plan.forEach((s, n) => {
            (s.tasks || []).forEach((s, o) => {
              var i;
              const a = s.task_id || `task-${n}-${o}`;
              t.push({
                unitIndex: n,
                itemIndex: o,
                taskId: a,
                isCompleted: ((i = e[a]) == null ? undefined : i.completed) || false
              });
            });
          });
          let s = -1;
          for (let i = t.length - 1; i >= 0; i--) {
            if (t[i].isCompleted) {
              s = i;
              break;
            }
          }
          const n = s + 1;
          const o = n < t.length ? t[n] : null;
          const r = o ? o.taskId : null;
          if (r) {
            be(r);
          }
          a = i.session_task_plan.map((t, s) => {
            const n = (t.tasks || []).map((t, n) => {
              var i;
              const a = t.task_id || `task-${s}-${n}`;
              const r = ((i = e[a]) == null ? undefined : i.completed) || false;
              const l = o && o.unitIndex === s && o.itemIndex === n && !r;
              return {
                id: a,
                title: t.task_title || "",
                isCurrent: l || false,
                isCompleted: r,
                isInProgress: l || false
              };
            });
            const i = n.filter(e => e.isCompleted).length;
            const a = n.length;
            const r = a > 0 ? Math.round(i / a * 100) : 0;
            const l = n.some(e => e.isCurrent) && r === 0 ? 1 : r;
            return {
              id: `unit-${s + 1}`,
              title: t.unit_name || d("deepLearnSessionBlock.unitLabel", {
                number: s + 1
              }),
              progress: l,
              items: n
            };
          });
          _e(a);
        }
        const l = {
          title: i.conversation_data.title,
          history: i.conversation_data.history,
          history_index: i.conversation_data.history_index
        };
        const u = P(l);
        const p = new Map();
        const m = new Set();
        for (const e of i.conversation_data.history) {
          const t = e.step_id;
          if (t) {
            m.add(t);
          }
        }
        for (const e of m) {
          let t = null;
          const s = e.match(/^(\d+)\.(\d+)$/);
          if (s) {
            const e = parseInt(s[1]) - 1;
            const n = parseInt(s[2]) - 1;
            if (e >= 0 && e < a.length) {
              const s = a[e];
              if (n >= 0 && n < s.items.length) {
                t = s.items[n].id;
              }
            }
          }
          if (!t) {
            for (const n of a) {
              for (const s of n.items) {
                if (s.id === e) {
                  t = s.id;
                  break;
                }
              }
              if (t) {
                break;
              }
            }
          }
          p.set(e, t || e);
        }
        const h = new Map();
        for (const [e, t] of u.entries()) {
          const s = [];
          let n = null;
          for (const t of i.conversation_data.history) {
            const o = t.step_id;
            if (o) {
              n = o;
            }
            if ((o || n || "default") === e) {
              s.push(t);
            }
          }
          let o = t;
          const r = s.find(e => e.role !== "system");
          if (r && r.role !== "user") {
            const t = s.findIndex(e => e.role === "user");
            if (t === -1 || t > 0) {
              const t = [{
                role: "user",
                index: 0,
                content: JSON.stringify({
                  type: "user_message",
                  message: "__PROACTIVE_START__"
                }),
                timestamp: s[0].timestamp,
                step_id: e
              }, ...s.map((e, t) => ({
                ...e,
                index: t + 1
              }))];
              const n = {
                title: i.conversation_data.title,
                history: t,
                history_index: i.conversation_data.history_index + 1
              };
              const a = R(n);
              if (a.length > 0) {
                o = a.map((e, t) => ({
                  ...e,
                  query: t === 0 && e.query === "__PROACTIVE_START__" ? "" : e.query
                }));
              }
            }
          }
          let l = p.get(e);
          if (!l && e === "default") {
            let e = null;
            for (const t of s) {
              const s = t.step_id;
              if (s && s !== "default") {
                e = s;
                break;
              }
            }
            if (!e && s.length > 0) {
              for (let t = s[0].index - 1; t >= 0; t--) {
                const s = i.conversation_data.history.find(e => e.index === t);
                if (s) {
                  const t = s.step_id;
                  if (t && t !== "default") {
                    e = t;
                    break;
                  }
                }
              }
            }
            if (e) {
              l = p.get(e) || null;
            }
            if (!l) {
              const e = [];
              a.forEach((t, s) => {
                t.items.forEach((t, n) => {
                  e.push({
                    unitIndex: s,
                    itemIndex: n,
                    taskId: t.id,
                    isCompleted: t.isCompleted || false
                  });
                });
              });
              let t = -1;
              for (let o = e.length - 1; o >= 0; o--) {
                if (e[o].isCompleted) {
                  t = o;
                  break;
                }
              }
              const s = t + 1;
              const n = s < e.length ? e[s] : null;
              if (n) {
                l = n.taskId;
              } else if (a.length > 0 && a[0].items.length > 0) {
                l = a[0].items[0].id;
              }
            }
          }
          l ||= e === "default" && a.length > 0 && a[0].items.length > 0 ? a[0].items[0].id : e;
          h.set(l, o);
        }
        let f = null;
        if (a.length > 0) {
          for (const e of a) {
            const t = e.items.find(e => e.isCurrent);
            if (t) {
              f = t.id;
              break;
            }
          }
          if (!f && a[0].items.length > 0) {
            f = a[0].items[0].id;
          }
        }
        if (f) {
          ve(f);
          let e = h.get(f) || [];
          if (e.length === 0) {
            e = [{
              id: `initial-${Date.now()}`,
              query: "",
              response: null
            }];
            h.set(f, e);
          }
          Ce(e);
          if (e.length > 0 && e[e.length - 1].response) {
            Fe(e[e.length - 1].response);
          } else {
            Fe({
              id: c || `response_${Date.now()}`,
              steps: [],
              timestamp: Date.now()
            });
          }
        }
        we(new Map(h));
        const _ = a.map(e => ({
          ...e,
          progress: ze(e.items, new Map(h))
        }));
        _e(_);
        try {
          const e = f && h.get(f) || [];
          const t = e.length === 0 || e.length === 1 && !e[0].query && !e[0].response;
          const s = {};
          h.forEach((e, t) => {
            s[t] = e.length;
          });
          const n = i.conversation_data.progress || {};
          const o = {
            where: "dpls_resume",
            get_session_data: "ok",
            session_id: c ?? null,
            history_len: i.conversation_data.history.length,
            history_with_step_id: i.conversation_data.history.filter(e => e.step_id).length,
            current_step_id: i.conversation_data.current_step_id ?? null,
            completed_task_ids: Object.keys(n).filter(e => {
              var t;
              if ((t = n[e]) == null) {
                return undefined;
              } else {
                return t.completed;
              }
            }),
            selected_subunit: f,
            active_subunit_item_count: e.length,
            active_subunit_looks_empty: t,
            active_last_item_has_response: !!e.length && !!e[e.length - 1].response,
            subunit_item_counts: s,
            timestamp: Date.now()
          };
          j({
            conversation_id: c ?? "",
            conversation_type: "dpls",
            error_type: "dpls_resume_diagnostic",
            error_data: o
          });
        } catch (t) {}
        K(true);
        Z(false);
        const k = f && h.get(f) || [];
        if (k.some(e => e.response || e.query)) {
          De(false);
          Te(false);
        } else {
          De(true);
          Te(true);
        }
        le.current = c;
      } catch (n) {
        Z(false);
        Te(false);
        V(false);
      }
    })();
  }, [c, l]);
  a.useEffect(() => {
    if (!l || c) {
      ie(false);
      return;
    }
    if (!f()) {
      return;
    }
    ie(false);
    let e = false;
    (async () => {
      try {
        const o = await async function (e) {
          const o = s();
          if (!o) {
            return null;
          }
          const i = `${t(n.ENDPOINTS.DEEP_LEARN_SUBTASK_SESSION)}?subtask_id=${encodeURIComponent(e)}`;
          const a = await fetch(i, {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${o}`
            }
          });
          if (!a.ok) {
            return null;
          }
          const r = await a.json();
          if (!r.success || !r.session_id || typeof r.session_id != "string") {
            return null;
          }
          const l = r.session_id.trim();
          if (l.length > 0) {
            return l;
          } else {
            return null;
          }
        }(l);
        if (e) {
          return;
        }
        if (o) {
          r(`/deep-learn-session/${o}`, {
            replace: true
          });
          return;
        }
        ie(true);
      } catch {
        if (!e) {
          ie(true);
        }
      }
    })();
    return () => {
      e = true;
    };
  }, [l, c, r]);
  a.useEffect(() => {
    if (!f()) {
      return;
    }
    const e = s();
    if (!e) {
      return;
    }
    if (c) {
      re.current;
      return;
    }
    if (!l) {
      return;
    }
    if (!oe) {
      return;
    }
    (async () => {
      V(true);
      try {
        const t = g.getInstance(e, l, r);
        t.setOnSessionCreated((e, t) => {
          te({
            sessionId: e,
            taskPlan: t
          });
          re.current = e;
          if (t && t.session_task_plan && Array.isArray(t.session_task_plan)) {
            const s = t.session_task_plan.map((e, t) => {
              const s = t === 0;
              const n = (e.tasks || []).map((e, n) => {
                const o = s && n === 0;
                return {
                  id: e.task_id || `task-${t}-${n}`,
                  title: e.task_title || "",
                  isCurrent: o,
                  isCompleted: false,
                  isInProgress: o
                };
              });
              const o = ze(n, new Map());
              return {
                id: `unit-${t + 1}`,
                title: e.unit_name || d("deepLearnSessionBlock.unitLabel", {
                  number: t + 1
                }),
                progress: o,
                items: n
              };
            });
            _e(s);
            if (s.length > 0 && s[0].items.length > 0) {
              const t = s[0].items[0].id;
              ve(t);
              be(t);
              const n = {
                id: `initial-${Date.now()}`,
                query: "",
                response: null
              };
              Ce([n]);
              we(e => {
                const s = new Map(e);
                s.set(t, [n]);
                return s;
              });
              Fe({
                id: e || `response_${Date.now()}`,
                steps: [],
                timestamp: Date.now()
              });
            }
          }
          K(true);
          V(false);
          De(true);
          Te(true);
        });
        t.setMessageParser(e => {
          ut.current(e);
        });
        await t.connect();
        ne(t);
      } catch (t) {
        V(false);
      }
    })();
    return () => {
      g.disconnectGlobal();
    };
  }, [l, c, r, oe]);
  const gt = a.useCallback(() => {
    if (!E) {
      return;
    }
    const {
      id: e
    } = E;
    D(null);
    st(e, false);
    const t = Ke(e);
    if (t && (se == null ? undefined : se.ws) && se.ws.readyState === WebSocket.OPEN) {
      se.ws.send(JSON.stringify({
        type: "enter_new_step",
        step_id: t
      }));
      De(true);
      Te(true);
    }
  }, [E, st, Ke, se]);
  return i.jsxs(i.Fragment, {
    children: [i.jsxs("div", {
      className: "learning-session-page",
      children: [i.jsxs("div", {
        className: "avatar-container",
        children: [i.jsx(_, {}), f() && i.jsx("button", {
          className: "bug-report-button",
          onClick: () => I(true),
          children: d("chatResponse.haveAnIssue")
        }), f() && i.jsx("button", {
          className: "invite-earn-button",
          onClick: () => N(true),
          title: d("home.inviteAndEarn"),
          children: i.jsx("img", {
            src: "/accountDropdown/gift.svg",
            alt: "Gift",
            className: "invite-earn-icon"
          })
        }), i.jsx(k, {
          isLoggedIn: f(),
          onSignOut: () => {
            w();
            r("/signin");
          },
          onSubscriptionClick: () => {
            r("/subscription");
          },
          onSettingsClick: () => {
            C(true);
          },
          onInviteEarnClick: () => {
            N(true);
          },
          onSignInClick: () => r("/signin"),
          referralsCount: $
        })]
      }), i.jsxs("div", {
        className: "learning-session-layout",
        children: [i.jsxs("div", {
          className: "session-outline",
          children: [i.jsx("div", {
            className: "outline-content",
            ref: H,
            children: fe.length !== 0 || Y && !X ? fe.map((e, t) => {
              const s = e.progress === 100;
              const n = e.progress > 0 && e.progress < 100;
              let o = "not-started";
              if (s) {
                o = "completed";
              } else if (n) {
                o = "in-progress";
              }
              const a = n ? 210 : 0;
              const r = e.items.some(e => e.isCurrent);
              return i.jsxs("div", {
                className: "outline-unit",
                children: [i.jsxs("div", {
                  className: "unit-header",
                  children: [i.jsx("input", {
                    type: "radio",
                    className: `unit-radio ${o}`,
                    checked: s,
                    readOnly: true,
                    style: n ? {
                      "--progress-angle": `${a}deg`
                    } : undefined
                  }), i.jsxs("div", {
                    className: "unit-info",
                    children: [i.jsx("h3", {
                      className: `unit-title ${o}`,
                      children: i.jsx(v, {
                        content: e.title
                      })
                    }), r && e.progress > 0 && i.jsxs("div", {
                      className: "unit-progress-wrapper",
                      children: [i.jsx("div", {
                        className: "unit-progress-track",
                        children: i.jsx("div", {
                          className: "unit-progress-fill",
                          style: {
                            width: `${e.progress}%`
                          }
                        })
                      }), i.jsx("span", {
                        className: "unit-progress-text",
                        children: d("deepLearnSessionPage.unitProgressText", {
                          percent: e.progress
                        })
                      })]
                    })]
                  })]
                }), e.items.length > 0 && i.jsx("div", {
                  className: "unit-items",
                  children: e.items.map((e, t) => {
                    const s = e.isCompleted || false;
                    const n = e.isInProgress || false;
                    const o = ye.get(e.id);
                    const a = o !== undefined && o.length > 0;
                    const r = !!o && o.some(e => e.response !== null);
                    const l = !s && !n && !a;
                    let c = "not-started";
                    if (s) {
                      c = "completed";
                    } else if (n || a) {
                      c = "in-progress";
                    }
                    const d = n || r ? 210 : 0;
                    return i.jsxs("div", {
                      className: `outline-item ${e.isCurrent ? "current" : ""}${l ? " locked" : ""}`,
                      onClick: () => {
                        if (l) {
                          D({
                            id: e.id,
                            title: e.title
                          });
                        } else if (e.id !== ke) {
                          st(e.id);
                        }
                      },
                      children: [i.jsx("input", {
                        type: "radio",
                        className: `item-radio ${c}`,
                        checked: s || n || a,
                        readOnly: true,
                        style: n || r ? {
                          "--progress-angle": `${d}deg`
                        } : undefined
                      }), i.jsx("span", {
                        className: `item-title ${c}`,
                        children: i.jsx(v, {
                          content: e.title
                        })
                      }), l && i.jsx("span", {
                        className: "item-lock-icon",
                        "aria-label": "Locked",
                        children: i.jsx("img", {
                          src: "/pages/deepLeanSessionPage/lock.svg",
                          alt: ""
                        })
                      }), e.isCurrent && !Xe && i.jsx(G, {
                        onClick: it
                      })]
                    }, e.id);
                  })
                })]
              }, e.id);
            }) : i.jsxs("div", {
              className: "outline-loading-skeleton",
              children: [i.jsxs("div", {
                className: "skeleton-unit",
                children: [i.jsxs("div", {
                  className: "skeleton-unit-header",
                  children: [i.jsx("div", {
                    className: "skeleton-radio"
                  }), i.jsx("div", {
                    className: "skeleton-unit-title"
                  })]
                }), i.jsxs("div", {
                  className: "skeleton-items",
                  children: [i.jsx("div", {
                    className: "skeleton-item"
                  }), i.jsx("div", {
                    className: "skeleton-item"
                  }), i.jsx("div", {
                    className: "skeleton-item"
                  })]
                })]
              }), i.jsxs("div", {
                className: "skeleton-unit",
                children: [i.jsxs("div", {
                  className: "skeleton-unit-header",
                  children: [i.jsx("div", {
                    className: "skeleton-radio"
                  }), i.jsx("div", {
                    className: "skeleton-unit-title"
                  })]
                }), i.jsxs("div", {
                  className: "skeleton-items",
                  children: [i.jsx("div", {
                    className: "skeleton-item"
                  }), i.jsx("div", {
                    className: "skeleton-item"
                  })]
                })]
              }), i.jsxs("div", {
                className: "skeleton-unit",
                children: [i.jsxs("div", {
                  className: "skeleton-unit-header",
                  children: [i.jsx("div", {
                    className: "skeleton-radio"
                  }), i.jsx("div", {
                    className: "skeleton-unit-title"
                  })]
                }), i.jsxs("div", {
                  className: "skeleton-items",
                  children: [i.jsx("div", {
                    className: "skeleton-item"
                  }), i.jsx("div", {
                    className: "skeleton-item"
                  }), i.jsx("div", {
                    className: "skeleton-item"
                  })]
                })]
              })]
            })
          }), ke && fe.length > 0 && (() => {
            const e = et(ke);
            const t = Ze(ke);
            const s = e => {
              if (Ve(e)) {
                D({
                  id: e,
                  title: Ye(e)
                });
              } else {
                st(e);
              }
            };
            return i.jsxs("div", {
              className: "outline-nav",
              children: [i.jsxs("button", {
                className: "outline-nav-btn outline-nav-btn--prev",
                disabled: !e,
                onClick: () => e && s(e.taskId),
                title: e ? Ye(e.taskId) : undefined,
                children: [i.jsx("svg", {
                  viewBox: "0 0 16 16",
                  fill: "none",
                  xmlns: "http://www.w3.org/2000/svg",
                  children: i.jsx("path", {
                    d: "M10 12L6 8l4-4",
                    stroke: "currentColor",
                    strokeWidth: "1.6",
                    strokeLinecap: "round",
                    strokeLinejoin: "round"
                  })
                }), i.jsx("span", {
                  className: "outline-nav-label",
                  children: e ? i.jsx(v, {
                    content: Ye(e.taskId)
                  }) : d("deepLearnSessionPage.noPrevious")
                })]
              }), i.jsxs("button", {
                className: "outline-nav-btn outline-nav-btn--next",
                disabled: !t,
                onClick: () => t && s(t.taskId),
                title: t ? Ye(t.taskId) : undefined,
                children: [i.jsx("span", {
                  className: "outline-nav-label",
                  children: t ? i.jsx(v, {
                    content: Ye(t.taskId)
                  }) : d("deepLearnSessionPage.noNext")
                }), i.jsx("svg", {
                  viewBox: "0 0 16 16",
                  fill: "none",
                  xmlns: "http://www.w3.org/2000/svg",
                  children: i.jsx("path", {
                    d: "M6 4l4 4-4 4",
                    stroke: "currentColor",
                    strokeWidth: "1.6",
                    strokeLinecap: "round",
                    strokeLinejoin: "round"
                  })
                })]
              })]
            });
          })()]
        }), i.jsx(F, {
          conversationHistory: je,
          currentResponse: He,
          setCurrentResponse: Fe,
          isResponseLoading: Ee,
          isConversationLoading: Re,
          isLoadingSessionData: X,
          isSessionReady: Y,
          isConnecting: J,
          sessionId: c,
          lastMessageTime: Ae,
          currentSubunitId: ke,
          unitCompletionData: Se,
          unitCompletionRejected: Le,
          unitCompletionFadingOut: $e,
          onUnitCompletionAccept: () => nt("accept"),
          onUnitCompletionReject: () => nt("reject"),
          onUnitCompletionFadeOutComplete: ot,
          onQuestionSubmission: at,
          onAllQuestionsSubmitted: rt,
          onRecommendationClick: lt,
          onSendMessage: pt,
          onResponseComplete: Qe,
          onSetIsResponseLoading: De,
          onSetIsConversationLoading: Te,
          onSetIsStoppingGeneration: qe,
          onSetLastMessageTime: Ue,
          isStoppingGeneration: Oe,
          onStopGeneration: ct,
          isCurrentSubunitCompleted: Xe,
          onMarkUnitComplete: it,
          ws: (se == null ? undefined : se.ws) ?? null,
          telemetryConversationId: c ?? null,
          getConversationSnapshot: () => je,
          onMessageHandlersReady: e => {
            We.current = e;
          }
        })]
      })]
    }), i.jsx(x, {
      isOpen: u,
      onClose: () => C(false)
    }), i.jsx(b, {
      isOpen: S,
      onClose: async () => {
        N(false);
        if (f()) {
          try {
            const e = await y("type-001");
            if (e.success) {
              M(e.received_by.length);
            }
          } catch (e) {}
        }
      }
    }), i.jsx(q, {
      isOpen: L,
      onClose: () => I(false),
      conversationId: c,
      conversationHistory: je,
      commentPrefix: "(SYSTEM MSG: Feedback from deep learn session)"
    }), i.jsx(Q, {
      isOpen: E !== null,
      unitTitle: (E == null ? undefined : E.title) ?? "",
      onClose: () => D(null),
      onConfirm: gt
    }), T && i.jsxs("div", {
      className: "generating-toast",
      children: [i.jsxs("svg", {
        className: "generating-toast-icon",
        viewBox: "0 0 24 24",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        children: [i.jsx("circle", {
          cx: "12",
          cy: "12",
          r: "9",
          stroke: "currentColor",
          strokeWidth: "1.8"
        }), i.jsx("path", {
          d: "M12 8v4l2.5 2.5",
          stroke: "currentColor",
          strokeWidth: "1.8",
          strokeLinecap: "round"
        })]
      }), d("deepLearnSessionPage.generatingToast")]
    }), B && i.jsxs("div", {
      className: "generating-toast",
      children: [i.jsxs("svg", {
        className: "generating-toast-icon",
        viewBox: "0 0 24 24",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        children: [i.jsx("circle", {
          cx: "12",
          cy: "12",
          r: "9",
          stroke: "currentColor",
          strokeWidth: "1.8"
        }), i.jsx("path", {
          d: "M12 7.5v5",
          stroke: "currentColor",
          strokeWidth: "1.8",
          strokeLinecap: "round"
        }), i.jsx("circle", {
          cx: "12",
          cy: "16.25",
          r: "1",
          fill: "currentColor"
        })]
      }), B]
    })]
  });
};
export { J as default };