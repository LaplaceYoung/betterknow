import { c as e } from "./createLucideIcon-B4HcG4gb.js";
import { b as t, r as a, j as c } from "./index-TjoB2Buo.js";
import { X as n } from "./x-BPqZ-rfi.js";
/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const r = e("audio-lines", [["path", {
  d: "M2 10v3",
  key: "1fnikh"
}], ["path", {
  d: "M6 6v11",
  key: "11sgs0"
}], ["path", {
  d: "M10 3v18",
  key: "yhl04a"
}], ["path", {
  d: "M14 8v7",
  key: "3a1oy3"
}], ["path", {
  d: "M18 5v13",
  key: "123xd1"
}], ["path", {
  d: "M22 10v3",
  key: "154ddg"
}]]);
const s = ["warm", "calm", "bright", "gentle", "firm", "lively"];
const l = {
  warm: ["#F0997B", "#ED93B1"],
  calm: ["#85B7EB", "#9AA0A6"],
  bright: ["#EF9F27", "#F0997B"],
  gentle: ["#AFA9EC", "#ED93B1"],
  firm: ["#5DCAA5", "#85B7EB"],
  lively: ["#97C459", "#5DCAA5"]
};
const o = [0.5, 0.75, 1, 1.25, 1.5, 2];
const i = e => {
  let t = 0;
  let a = Infinity;
  for (let c = 0; c < o.length; c += 1) {
    const n = Math.abs(o[c] - e);
    if (n < a) {
      a = n;
      t = c;
    }
  }
  return t;
};
const u = e => {
  const t = Math.round(e * 100) / 100;
  return `${t % 1 == 0 ? t.toFixed(0) : t.toFixed(2).replace(/0$/, "")}×`;
};
const d = u;
const m = ({
  open: e,
  onClose: r,
  voiceId: u,
  speed: m,
  onChange: h,
  narrationPlaying: p = false
}) => {
  const {
    t: v
  } = t();
  const [f, x] = a.useState(() => o[i(m)]);
  const [b, y] = a.useState(null);
  const [j, k] = a.useState(false);
  const g = a.useRef(null);
  const C = a.useRef(null);
  const N = a.useRef(null);
  const A = a.useRef(null);
  const M = a.useRef(null);
  const R = a.useRef(null);
  const w = a.useRef(0);
  const E = a.useRef(f);
  B = u;
  const F = s.includes(B) ? u : "warm";
  var B;
  const P = i(f);
  a.useEffect(() => {
    if (e) {
      x(o[i(m)]);
    } else {
      k(false);
    }
  }, [e, m]);
  const S = a.useCallback(() => {
    if (C.current) {
      C.current.pause();
      C.current.currentTime = 0;
    }
    y(null);
  }, []);
  const $ = a.useCallback(() => {
    if (R.current !== null) {
      cancelAnimationFrame(R.current);
      R.current = null;
    }
    if (C.current) {
      C.current.pause();
      C.current.src = "";
      C.current = null;
    }
    if (M.current) {
      try {
        M.current.disconnect();
      } catch {}
      M.current = null;
    }
    if (A.current) {
      try {
        A.current.disconnect();
      } catch {}
      A.current = null;
    }
    if (N.current) {
      N.current.close().catch(() => {});
      N.current = null;
    }
    y(null);
  }, []);
  a.useEffect(() => {
    if (!e) {
      $();
    }
    return () => {
      $();
    };
  }, [e, $]);
  a.useEffect(() => {
    if (p) {
      S();
    }
  }, [p, S]);
  const I = a.useCallback(e => {
    const t = g.current;
    if (!t) {
      return;
    }
    const a = t.getContext("2d");
    if (!a) {
      return;
    }
    const c = window.devicePixelRatio || 1;
    const n = t.clientWidth || 96;
    const r = t.clientHeight || 96;
    if (t.width !== n * c || t.height !== r * c) {
      t.width = n * c;
      t.height = r * c;
    }
    a.setTransform(c, 0, 0, c, 0, 0);
    a.clearRect(0, 0, n, r);
    const s = n / 2;
    const o = r / 2;
    const i = Math.min(n, r) * 0.28;
    const u = Math.min(n, r) * 0.16 * e;
    const d = performance.now() / 500;
    const [m, h] = l[F];
    const p = a.createLinearGradient(0, 0, n, r);
    p.addColorStop(0, m);
    p.addColorStop(1, h);
    a.beginPath();
    for (let l = 0; l <= 32; l += 1) {
      const e = l / 32 * Math.PI * 2;
      const t = i + u * 0.4 + Math.sin(e * 3 + d) * u * 0.5 + Math.sin(e * 5 - d * 1.3) * u * 0.3;
      const c = s + Math.cos(e) * t;
      const n = o + Math.sin(e) * t;
      if (l === 0) {
        a.moveTo(c, n);
      } else {
        a.lineTo(c, n);
      }
    }
    a.closePath();
    a.fillStyle = p;
    a.fill();
  }, [F]);
  const T = a.useCallback(() => {
    const e = A.current;
    if (e) {
      const t = new Uint8Array(e.frequencyBinCount);
      e.getByteFrequencyData(t);
      const a = t.reduce((e, t) => e + t, 0) / t.length;
      const c = Math.min(1, a / 130);
      w.current += (c - w.current) * 0.25;
    } else {
      w.current += (0.06 - w.current) * 0.1;
    }
    I(w.current);
    R.current = requestAnimationFrame(T);
  }, [I]);
  a.useEffect(() => {
    if (e) {
      R.current = requestAnimationFrame(T);
      return () => {
        if (R.current !== null) {
          cancelAnimationFrame(R.current);
          R.current = null;
        }
      };
    }
  }, [e, T]);
  const D = a.useCallback(e => {
    if (!C.current) {
      C.current = new Audio();
      C.current.addEventListener("ended", () => y(null));
      C.current.addEventListener("error", () => y(null));
      C.current.addEventListener("loadedmetadata", () => {
        if (C.current) {
          C.current.playbackRate = E.current;
        }
      });
    }
    const t = C.current;
    try {
      N.current ||= new AudioContext();
      const e = N.current;
      if (e.state === "suspended") {
        e.resume().catch(() => {});
      }
      if (!M.current) {
        M.current = e.createMediaElementSource(t);
        A.current = e.createAnalyser();
        A.current.fftSize = 64;
        M.current.connect(A.current);
        A.current.connect(e.destination);
      }
    } catch {}
    t.src = `/tts-samples/${e}.mp3`;
    t.currentTime = 0;
    t.defaultPlaybackRate = f;
    t.playbackRate = f;
    y(e);
    t.play().catch(() => {
      y(null);
    });
  }, [f]);
  a.useEffect(() => {
    E.current = f;
    if (C.current) {
      C.current.defaultPlaybackRate = f;
      C.current.playbackRate = f;
    }
  }, [f]);
  const L = a.useCallback(e => {
    if (e !== F) {
      k(true);
    }
    h({
      voiceId: e,
      speed: f
    });
    if (!p) {
      D(e);
    }
  }, [h, f, D, F, p]);
  const q = a.useCallback(e => {
    x(o[parseInt(e.target.value, 10)]);
  }, []);
  const z = a.useCallback(e => {
    if (e !== m) {
      k(true);
    }
    x(e);
    h({
      voiceId: F,
      speed: e
    });
  }, [h, F, m]);
  const U = a.useCallback(e => {
    z(o[parseInt(e.target.value, 10)]);
  }, [z]);
  const V = a.useCallback(e => {
    if (e.target === e.currentTarget) {
      S();
      r();
    }
  }, [r, S]);
  const W = a.useCallback(() => {
    S();
    r();
  }, [r, S]);
  if (e) {
    return c.jsx("div", {
      className: "voice-modal-overlay",
      onClick: V,
      children: c.jsxs("div", {
        className: "voice-modal-container",
        onClick: e => e.stopPropagation(),
        children: [c.jsxs("div", {
          className: "voice-modal-header",
          children: [c.jsx("h3", {
            className: "voice-modal-title",
            children: v("tts.title")
          }), c.jsx("button", {
            type: "button",
            className: "voice-modal-close",
            onClick: W,
            "aria-label": v("tts.title"),
            children: c.jsx(n, {
              size: 16,
              strokeWidth: 2,
              "aria-hidden": true
            })
          })]
        }), c.jsxs("div", {
          className: "voice-modal-section voice-modal-current",
          children: [c.jsx("span", {
            className: "voice-modal-section-label",
            children: v("tts.currentVoice")
          }), c.jsx("div", {
            className: "voice-modal-blob-wrap",
            children: c.jsx("canvas", {
              ref: g,
              className: "voice-modal-blob-canvas"
            })
          }), c.jsxs("span", {
            className: "voice-modal-current-name",
            children: [v(`tts.voice.${F}`), b === F ? ` · ${v("tts.preview")}` : ""]
          })]
        }), c.jsxs("div", {
          className: "voice-modal-section",
          children: [c.jsx("span", {
            className: "voice-modal-section-label",
            children: v("tts.voiceOptions")
          }), c.jsx("div", {
            className: "voice-modal-options-grid",
            children: s.map(e => {
              const [t, a] = l[e];
              const n = e === F;
              return c.jsxs("button", {
                type: "button",
                className: "voice-modal-option" + (n ? " selected" : ""),
                onClick: () => L(e),
                children: [c.jsx("span", {
                  className: "voice-modal-avatar",
                  style: {
                    background: `radial-gradient(circle at 30% 30%, ${t}, ${a})`
                  }
                }), c.jsx("span", {
                  className: "voice-modal-option-label",
                  children: v(`tts.voice.${e}`)
                })]
              }, e);
            })
          })]
        }), c.jsxs("div", {
          className: "voice-modal-section",
          children: [c.jsxs("div", {
            className: "voice-modal-speed-header",
            children: [c.jsx("span", {
              className: "voice-modal-section-label",
              children: v("tts.voiceSpeed")
            }), c.jsx("span", {
              className: "voice-modal-speed-readout",
              children: d(f)
            })]
          }), c.jsx("input", {
            type: "range",
            min: 0,
            max: o.length - 1,
            step: 1,
            value: i(f),
            onChange: q,
            onPointerUp: U,
            className: "voice-modal-speed-slider",
            style: {
              "--voice-speed-progress": P / (o.length - 1) * 100 + "%"
            }
          }), c.jsx("div", {
            className: "voice-modal-speed-ticks",
            children: o.map(e => c.jsx("span", {
              className: "voice-modal-speed-tick",
              children: d(e)
            }, e))
          })]
        }), (p || j) && c.jsxs("div", {
          className: "voice-modal-notes",
          children: [p && c.jsx("p", {
            className: "voice-modal-apply-note",
            role: "status",
            children: v("tts.previewPaused")
          }), j && c.jsx("p", {
            className: "voice-modal-apply-note",
            role: "status",
            children: v("tts.applyNextRound")
          })]
        })]
      })
    });
  } else {
    return null;
  }
};
export { r as A, m as V, u as f };