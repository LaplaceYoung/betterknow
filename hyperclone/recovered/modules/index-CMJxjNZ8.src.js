import { r as e, N as t, j as n, O as o, P as r, Q as s, S as i, U as c, V as u } from "./index-TjoB2Buo.js";
function l(e, t) {
  if (typeof e == "function") {
    return e(t);
  }
  if (e != null) {
    e.current = t;
  }
}
function f(...t) {
  return e.useCallback(function (...e) {
    return t => {
      let n = false;
      const o = e.map(e => {
        const o = l(e, t);
        if (!n && typeof o == "function") {
          n = true;
        }
        return o;
      });
      if (n) {
        return () => {
          for (let t = 0; t < o.length; t++) {
            const n = o[t];
            if (typeof n == "function") {
              n();
            } else {
              l(e[t], null);
            }
          }
        };
      }
    };
  }(...t), t);
}
class p extends e.Component {
  getSnapshotBeforeUpdate(e) {
    const t = this.props.childRef.current;
    if (t && e.isPresent && !this.props.isPresent && this.props.pop !== false) {
      const e = t.offsetParent;
      const n = o(e) && e.offsetWidth || 0;
      const r = o(e) && e.offsetHeight || 0;
      const s = this.props.sizeRef.current;
      s.height = t.offsetHeight || 0;
      s.width = t.offsetWidth || 0;
      s.top = t.offsetTop;
      s.left = t.offsetLeft;
      s.right = n - s.width - s.left;
      s.bottom = r - s.height - s.top;
    }
    return null;
  }
  componentDidUpdate() {}
  render() {
    return this.props.children;
  }
}
function a({
  children: o,
  isPresent: r,
  anchorX: s,
  anchorY: i,
  root: c,
  pop: u
}) {
  var l;
  const a = e.useId();
  const h = e.useRef(null);
  const d = e.useRef({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  });
  const {
    nonce: m
  } = e.useContext(t);
  const g = ((l = o.props) == null ? undefined : l.ref) ?? (o == null ? undefined : o.ref);
  const x = f(h, g);
  e.useInsertionEffect(() => {
    const {
      width: e,
      height: t,
      top: n,
      left: o,
      right: l,
      bottom: f
    } = d.current;
    if (r || u === false || !h.current || !e || !t) {
      return;
    }
    const p = s === "left" ? `left: ${o}` : `right: ${l}`;
    const g = i === "bottom" ? `bottom: ${f}` : `top: ${n}`;
    h.current.dataset.motionPopId = a;
    const x = document.createElement("style");
    if (m) {
      x.nonce = m;
    }
    const E = c ?? document.head;
    E.appendChild(x);
    if (x.sheet) {
      x.sheet.insertRule(`\n          [data-motion-pop-id="${a}"] {\n            position: absolute !important;\n            width: ${e}px !important;\n            height: ${t}px !important;\n            ${p}px !important;\n            ${g}px !important;\n          }\n        `);
    }
    return () => {
      if (E.contains(x)) {
        E.removeChild(x);
      }
    };
  }, [r]);
  return n.jsx(p, {
    isPresent: r,
    childRef: h,
    sizeRef: d,
    pop: u,
    children: u === false ? o : e.cloneElement(o, {
      ref: x
    })
  });
}
const h = ({
  children: t,
  initial: o,
  isPresent: i,
  onExitComplete: c,
  custom: u,
  presenceAffectsLayout: l,
  mode: f,
  anchorX: p,
  anchorY: h,
  root: m
}) => {
  const g = r(d);
  const x = e.useId();
  let E = true;
  let P = e.useMemo(() => {
    E = false;
    return {
      id: x,
      initial: o,
      isPresent: i,
      custom: u,
      onExitComplete: e => {
        g.set(e, true);
        for (const t of g.values()) {
          if (!t) {
            return;
          }
        }
        if (c) {
          c();
        }
      },
      register: e => {
        g.set(e, false);
        return () => g.delete(e);
      }
    };
  }, [i, g, c]);
  if (l && E) {
    P = {
      ...P
    };
  }
  e.useMemo(() => {
    g.forEach((e, t) => g.set(t, false));
  }, [i]);
  e.useEffect(() => {
    if (!i && !g.size && c) {
      c();
    }
  }, [i]);
  t = n.jsx(a, {
    pop: f === "popLayout",
    isPresent: i,
    anchorX: p,
    anchorY: h,
    root: m,
    children: t
  });
  return n.jsx(s.Provider, {
    value: P,
    children: t
  });
};
function d() {
  return new Map();
}
const m = e => e.key || "";
function g(t) {
  const n = [];
  e.Children.forEach(t, t => {
    if (e.isValidElement(t)) {
      n.push(t);
    }
  });
  return n;
}
const x = ({
  children: t,
  custom: o,
  initial: s = true,
  onExitComplete: l,
  presenceAffectsLayout: f = true,
  mode: p = "sync",
  propagate: a = false,
  anchorX: d = "left",
  anchorY: x = "top",
  root: E
}) => {
  const [P, C] = i(a);
  const R = e.useMemo(() => g(t), [t]);
  const y = a && !P ? [] : R.map(m);
  const v = e.useRef(true);
  const w = e.useRef(R);
  const $ = r(() => new Map());
  const j = e.useRef(new Set());
  const [b, L] = e.useState(R);
  const [M, S] = e.useState(R);
  c(() => {
    v.current = false;
    w.current = R;
    for (let e = 0; e < M.length; e++) {
      const t = m(M[e]);
      if (y.includes(t)) {
        $.delete(t);
        j.current.delete(t);
      } else if ($.get(t) !== true) {
        $.set(t, false);
      }
    }
  }, [M, y.length, y.join("-")]);
  const X = [];
  if (R !== b) {
    let e = [...R];
    for (let t = 0; t < M.length; t++) {
      const n = M[t];
      const o = m(n);
      if (!y.includes(o)) {
        e.splice(t, 0, n);
        X.push(n);
      }
    }
    if (p === "wait" && X.length) {
      e = X;
    }
    S(g(e));
    L(R);
    return null;
  }
  const {
    forceRender: Y
  } = e.useContext(u);
  return n.jsx(n.Fragment, {
    children: M.map(e => {
      const t = m(e);
      const r = (!a || !!P) && (R === M || y.includes(t));
      return n.jsx(h, {
        isPresent: r,
        initial: (!v.current || !!s) && undefined,
        custom: o,
        presenceAffectsLayout: f,
        mode: p,
        root: E,
        onExitComplete: r ? undefined : () => {
          if (j.current.has(t)) {
            return;
          }
          j.current.add(t);
          if (!$.has(t)) {
            return;
          }
          $.set(t, true);
          let e = true;
          $.forEach(t => {
            if (!t) {
              e = false;
            }
          });
          if (e) {
            if (Y != null) {
              Y();
            }
            S(w.current);
            if (a) {
              if (C != null) {
                C();
              }
            }
            if (l) {
              l();
            }
          }
        },
        anchorX: d,
        anchorY: x,
        children: e
      }, t);
    })
  });
};
export { x as A };