import { G as e, r as n, c as t, g as i, b as s, aq as o, j as a, ar as r } from "./index-TjoB2Buo.js";
import { L as c } from "./loader-circle-BZEIbChB.js";
import { A as l, P as u } from "./plus-jBDDhggQ.js";
import { C as d } from "./check-BBSENZCf.js";
import { c as m } from "./createLucideIcon-B4HcG4gb.js";
import { M as p } from "./maximize-2-78VwLVLI.js";
import { X as f } from "./x-BPqZ-rfi.js";
/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const h = m("minimize-2", [["path", {
  d: "m14 10 7-7",
  key: "oa77jy"
}], ["path", {
  d: "M20 10h-6V4",
  key: "mjg0md"
}], ["path", {
  d: "m3 21 7-7",
  key: "tjx5ai"
}], ["path", {
  d: "M4 14h6v6",
  key: "rmj7iw"
}]]);
const v = m("scissors", [["circle", {
  cx: "6",
  cy: "6",
  r: "3",
  key: "1lh9wr"
}], ["path", {
  d: "M8.12 8.12 12 12",
  key: "1alkpv"
}], ["path", {
  d: "M20 4 8.12 15.88",
  key: "xgtan2"
}], ["circle", {
  cx: "6",
  cy: "18",
  r: "3",
  key: "fqmcym"
}], ["path", {
  d: "M14.8 14.8 20 20",
  key: "ptml3r"
}]]);
const y = m("trash-2", [["path", {
  d: "M10 11v6",
  key: "nco0om"
}], ["path", {
  d: "M14 11v6",
  key: "outv1u"
}], ["path", {
  d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",
  key: "miytrc"
}], ["path", {
  d: "M3 6h18",
  key: "d0wm0j"
}], ["path", {
  d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",
  key: "e791ji"
}]]);
const b = m("undo-2", [["path", {
  d: "M9 14 4 9l5-5",
  key: "102s5s"
}], ["path", {
  d: "M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11",
  key: "f3b9sd"
}]]);
const x = m("zoom-in", [["circle", {
  cx: "11",
  cy: "11",
  r: "8",
  key: "4ej97u"
}], ["line", {
  x1: "21",
  x2: "16.65",
  y1: "21",
  y2: "16.65",
  key: "13gj7c"
}], ["line", {
  x1: "11",
  x2: "11",
  y1: "8",
  y2: "14",
  key: "1vmskp"
}], ["line", {
  x1: "8",
  x2: "14",
  y1: "11",
  y2: "11",
  key: "durymu"
}]]);
const g = m("zoom-out", [["circle", {
  cx: "11",
  cy: "11",
  r: "8",
  key: "4ej97u"
}], ["line", {
  x1: "21",
  x2: "16.65",
  y1: "21",
  y2: "16.65",
  key: "13gj7c"
}], ["line", {
  x1: "8",
  x2: "14",
  y1: "11",
  y2: "11",
  key: "durymu"
}]]);
function S(e, n) {
  return Number(e.toFixed(n));
}
function w(e, n, t) {
  if (t && typeof t == "function") {
    t(e, n);
  }
}
var j = {
  easeOut: function (e) {
    return -Math.cos(e * Math.PI) / 2 + 0.5;
  },
  linear: function (e) {
    return e;
  },
  easeInQuad: function (e) {
    return e * e;
  },
  easeOutQuad: function (e) {
    return e * (2 - e);
  },
  easeInOutQuad: function (e) {
    if (e < 0.5) {
      return e * 2 * e;
    } else {
      return (4 - e * 2) * e - 1;
    }
  },
  easeInCubic: function (e) {
    return e * e * e;
  },
  easeOutCubic: function (e) {
    return --e * e * e + 1;
  },
  easeInOutCubic: function (e) {
    if (e < 0.5) {
      return e * 4 * e * e;
    } else {
      return (e - 1) * (e * 2 - 2) * (e * 2 - 2) + 1;
    }
  },
  easeInQuart: function (e) {
    return e * e * e * e;
  },
  easeOutQuart: function (e) {
    return 1 - --e * e * e * e;
  },
  easeInOutQuart: function (e) {
    if (e < 0.5) {
      return e * 8 * e * e * e;
    } else {
      return 1 - --e * 8 * e * e * e;
    }
  },
  easeInQuint: function (e) {
    return e * e * e * e * e;
  },
  easeOutQuint: function (e) {
    return 1 + --e * e * e * e * e;
  },
  easeInOutQuint: function (e) {
    if (e < 0.5) {
      return e * 16 * e * e * e * e;
    } else {
      return 1 + --e * 16 * e * e * e * e;
    }
  }
};
function C(e) {
  if (typeof e == "number") {
    cancelAnimationFrame(e);
  }
}
function N(e) {
  if (e.mounted) {
    C(e.animation);
    e.animate = false;
    e.animation = null;
    e.velocity = null;
  }
}
function P(e, n, t, i) {
  if (e.mounted) {
    var s = new Date().getTime();
    N(e);
    e.animation = function () {
      if (!e.mounted) {
        return C(e.animation);
      }
      var o = new Date().getTime() - s;
      var a = (0, j[n])(o / t);
      if (o >= t) {
        i(1);
        e.animation = null;
      } else if (e.animation) {
        i(a);
        requestAnimationFrame(e.animation);
      }
    };
    requestAnimationFrame(e.animation);
  }
}
function T(e, n, t, i) {
  var s = function (e) {
    var n = e.scale;
    var t = e.positionX;
    var i = e.positionY;
    return !Number.isNaN(n) && !Number.isNaN(t) && !Number.isNaN(i);
  }(n);
  if (e.mounted && s) {
    var o = e.setTransformState;
    var a = e.transformState;
    var r = a.scale;
    var c = a.positionX;
    var l = a.positionY;
    var u = n.scale - r;
    var d = n.positionX - c;
    var m = n.positionY - l;
    if (t === 0) {
      o(n.scale, n.positionX, n.positionY);
    } else {
      P(e, i, t, function (e) {
        o(r + u * e, c + d * e, l + m * e);
      });
    }
  }
}
function k(e, n) {
  var t = e.wrapperComponent;
  var i = e.contentComponent;
  var s = e.setup.centerZoomedOut;
  if (!t || !i) {
    throw new Error("Components are not mounted");
  }
  var o = function (e, n, t) {
    var i = e.offsetWidth;
    var s = e.offsetHeight;
    var o = n.offsetWidth * t;
    var a = n.offsetHeight * t;
    return {
      wrapperWidth: i,
      wrapperHeight: s,
      newContentWidth: o,
      newDiffWidth: i - o,
      newContentHeight: a,
      newDiffHeight: s - a
    };
  }(t, i, n);
  var a = o.wrapperWidth;
  var r = o.wrapperHeight;
  var c = function (e, n, t, i, s, o, a) {
    var r = e > n ? t * (a ? 1 : 0.5) : 0;
    var c = i > s ? o * (a ? 1 : 0.5) : 0;
    return {
      minPositionX: e - n - r,
      maxPositionX: r,
      minPositionY: i - s - c,
      maxPositionY: c
    };
  }(a, o.newContentWidth, o.newDiffWidth, r, o.newContentHeight, o.newDiffHeight, Boolean(s));
  return c;
}
function M(e, n, t, i) {
  return S(i ? e < n ? n : e > t ? t : e : e, 2);
}
function E(e, n) {
  var t = k(e, n);
  e.bounds = t;
  return t;
}
function z(e, n, t, i, s, o, a) {
  var r = t.minPositionX;
  var c = t.minPositionY;
  var l = t.maxPositionX;
  var u = t.maxPositionY;
  var d = 0;
  var m = 0;
  if (a) {
    d = s;
    m = o;
  }
  return {
    x: M(e, r - d, l + d, i),
    y: M(n, c - m, u + m, i)
  };
}
function Y(e, n, t, i, s, o) {
  var a = e.transformState;
  var r = a.scale;
  var c = a.positionX;
  var l = a.positionY;
  var u = i - r;
  if (typeof n != "number" || typeof t != "number") {
    return {
      x: c,
      y: l
    };
  } else {
    return z(c - n * u, l - t * u, s, o, 0, 0, null);
  }
}
function I(e, n, t, i, s) {
  var o = n - (s ? i : 0);
  if (!Number.isNaN(t) && e >= t) {
    return t;
  } else if (!Number.isNaN(n) && e <= o) {
    return o;
  } else {
    return e;
  }
}
function X(e, n) {
  var t = e.setup.panning.excluded;
  var i = e.isInitialized;
  var s = e.wrapperComponent;
  var o = n.target;
  var a = "shadowRoot" in o && "composedPath" in n ? n.composedPath().some(function (e) {
    return e instanceof Element && (s == null ? undefined : s.contains(e));
  }) : s == null ? undefined : s.contains(o);
  return !!i && !!o && !!a && !he(o, t);
}
function A(e) {
  var n = e.isInitialized;
  var t = e.isPanning;
  var i = e.setup.panning.disabled;
  return !!n && !!t && !i;
}
function O(e, n, t, i, s) {
  var o = e.setup.limitToBounds;
  var a = e.wrapperComponent;
  var r = e.bounds;
  var c = e.transformState;
  var l = c.scale;
  var u = c.positionX;
  var d = c.positionY;
  if (a !== null && r !== null && (n !== u || t !== d)) {
    var m = z(n, t, r, o, i, s, a);
    var p = m.x;
    var f = m.y;
    e.setTransformState(l, p, f);
  }
}
function L(e, n) {
  var t = e.setup;
  var i = e.transformState.scale;
  var s = t.minScale;
  var o = t.disablePadding;
  if (n > 0 && i >= s && !o) {
    return n;
  } else {
    return 0;
  }
}
function W(e, n, t, i, s, o, a, r, c, l) {
  if (s) {
    var u;
    if (n > a && t > a) {
      if ((u = a + (e - a) * l) > c) {
        return c;
      } else if (u < a) {
        return a;
      } else {
        return u;
      }
    }
    if (n < o && t < o) {
      if ((u = o + (e - o) * l) < r) {
        return r;
      } else if (u > o) {
        return o;
      } else {
        return u;
      }
    }
  }
  if (i) {
    return n;
  } else {
    return M(e, o, a, s);
  }
}
function D(e, n) {
  var t = function (e) {
    var n = e.mounted;
    var t = e.setup;
    var i = t.disabled;
    var s = t.velocityAnimation;
    var o = e.transformState.scale;
    return !s.disabled || !!(o > 1) || !i || !!n;
  }(e);
  if (t) {
    var i = e.lastMousePosition;
    var s = e.velocityTime;
    var o = e.setup;
    var a = e.wrapperComponent;
    var r = o.velocityAnimation.equalToMove;
    var c = Date.now();
    if (i && s && a) {
      var l = function (e, n) {
        if (n) {
          return Math.min(1, e.offsetWidth / window.innerWidth);
        } else {
          return 1;
        }
      }(a, r);
      var u = n.x - i.x;
      var d = n.y - i.y;
      var m = u / l;
      var p = d / l;
      var f = c - s;
      var h = u * u + d * d;
      var v = Math.sqrt(h) / f;
      e.velocity = {
        velocityX: m,
        velocityY: p,
        total: v
      };
    }
    e.lastMousePosition = n;
    e.velocityTime = c;
  }
}
function B(e, n) {
  var t = e.transformState.scale;
  N(e);
  E(e, t);
  if (window.TouchEvent !== undefined && n instanceof TouchEvent) {
    (function (e, n) {
      var t = n.touches;
      var i = e.transformState;
      var s = i.positionX;
      var o = i.positionY;
      e.isPanning = true;
      if (t.length === 1) {
        var a = t[0].clientX;
        var r = t[0].clientY;
        e.startCoords = {
          x: a - s,
          y: r - o
        };
      }
    })(e, n);
  } else {
    (function (e, n) {
      var t = e.transformState;
      var i = t.positionX;
      var s = t.positionY;
      e.isPanning = true;
      var o = n.clientX;
      var a = n.clientY;
      e.startCoords = {
        x: o - i,
        y: a - s
      };
    })(e, n);
  }
}
function K(e, n) {
  var t = e.transformState.scale;
  var i = e.setup;
  var s = i.minScale;
  var o = i.alignmentAnimation;
  var a = o.disabled;
  var r = o.sizeX;
  var c = o.sizeY;
  var l = o.animationTime;
  var u = o.animationType;
  if (!a && !(t < s) && (!!r || !!c)) {
    var d = function (e) {
      var n = e.transformState;
      var t = n.positionX;
      var i = n.positionY;
      var s = n.scale;
      var o = e.setup;
      var a = o.disabled;
      var r = o.limitToBounds;
      var c = o.centerZoomedOut;
      var l = e.wrapperComponent;
      if (!a && l && e.bounds) {
        var u = e.bounds;
        var d = u.maxPositionX;
        var m = u.minPositionX;
        var p = u.maxPositionY;
        var f = u.minPositionY;
        var h = t > d || t < m;
        var v = i > p || i < f;
        var y = Y(e, t > d ? l.offsetWidth : e.setup.minPositionX || 0, i > p ? l.offsetHeight : e.setup.minPositionY || 0, s, e.bounds, r || c);
        var b = y.x;
        var x = y.y;
        return {
          scale: s,
          positionX: h ? b : t,
          positionY: v ? x : i
        };
      }
    }(e);
    if (d) {
      T(e, d, n ?? l, u);
    }
  }
}
function R(e, n, t) {
  var i = e.startCoords;
  var s = e.setup.alignmentAnimation;
  var o = s.sizeX;
  var a = s.sizeY;
  if (i) {
    var r = function (e, n, t) {
      var i = e.startCoords;
      var s = e.transformState;
      var o = e.setup.panning;
      var a = o.lockAxisX;
      var r = o.lockAxisY;
      var c = s.positionX;
      var l = s.positionY;
      if (!i) {
        return {
          x: c,
          y: l
        };
      }
      var u = n - i.x;
      var d = t - i.y;
      return {
        x: a ? c : u,
        y: r ? l : d
      };
    }(e, n, t);
    var c = r.x;
    var l = r.y;
    var u = L(e, o);
    var d = L(e, a);
    D(e, {
      x: c,
      y: l
    });
    O(e, c, l, u, d);
  }
}
function $(e) {
  if (e.isPanning) {
    var n = e.setup.panning.velocityDisabled;
    var t = e.velocity;
    var i = e.wrapperComponent;
    var s = e.contentComponent;
    e.isPanning = false;
    e.animate = false;
    e.animation = null;
    var o = i == null ? undefined : i.getBoundingClientRect();
    var a = s == null ? undefined : s.getBoundingClientRect();
    var r = (o == null ? undefined : o.width) || 0;
    var c = (o == null ? undefined : o.height) || 0;
    var l = (a == null ? undefined : a.width) || 0;
    var u = (a == null ? undefined : a.height) || 0;
    var d = r < l || c < u;
    if (!n && t && (t == null ? undefined : t.total) > 0.1 && d) {
      (function (e) {
        var n = e.velocity;
        var t = e.bounds;
        var i = e.setup;
        var s = e.wrapperComponent;
        var o = function (e) {
          var n = e.mounted;
          var t = e.velocity;
          var i = e.bounds;
          var s = e.setup;
          var o = s.disabled;
          var a = s.velocityAnimation;
          var r = e.transformState.scale;
          return (!a.disabled || !!(r > 1) || !o || !!n) && !!t && !!i;
        }(e);
        if (o && n && t && s) {
          var a = n.velocityX;
          var r = n.velocityY;
          var c = n.total;
          var l = t.maxPositionX;
          var u = t.minPositionX;
          var d = t.maxPositionY;
          var m = t.minPositionY;
          var p = i.limitToBounds;
          var f = i.alignmentAnimation;
          var h = i.zoomAnimation;
          var v = i.panning;
          var y = v.lockAxisY;
          var b = v.lockAxisX;
          var x = h.animationType;
          var g = f.sizeX;
          var S = f.sizeY;
          var w = f.velocityAlignmentTime;
          var C = function (e, n) {
            var t = e.setup.velocityAnimation;
            var i = t.equalToMove;
            var s = t.animationTime;
            var o = t.sensitivity;
            if (i) {
              return s * n * o;
            } else {
              return s;
            }
          }(e, c);
          var N = Math.max(C, w);
          var T = L(e, g);
          var k = L(e, S);
          var M = T * s.offsetWidth / 100;
          var E = k * s.offsetHeight / 100;
          var z = l + M;
          var Y = u - M;
          var I = d + E;
          var X = m - E;
          var A = e.transformState;
          var O = new Date().getTime();
          P(e, x, N, function (n) {
            var t = e.transformState;
            var i = t.scale;
            var s = t.positionX;
            var o = t.positionY;
            var c = (new Date().getTime() - O) / w;
            var h = 1 - (0, j[f.animationType])(Math.min(1, c));
            var v = 1 - n;
            var x = s + a * v;
            var g = o + r * v;
            var S = W(x, A.positionX, s, b, p, u, l, Y, z, h);
            var C = W(g, A.positionY, o, y, p, m, d, X, I, h);
            if (s !== x || o !== g) {
              e.setTransformState(i, S, C);
            }
          });
        }
      })(e);
    } else {
      K(e);
    }
  }
}
function H(e, n, t, i) {
  var s = e.setup;
  var o = s.minScale;
  var a = s.maxScale;
  var r = s.limitToBounds;
  var c = I(S(n, 2), o, a, 0, false);
  var l = Y(e, t, i, c, E(e, c), r);
  return {
    scale: c,
    positionX: l.x,
    positionY: l.y
  };
}
function F(e, n, t) {
  var i = e.transformState.scale;
  var s = e.wrapperComponent;
  var o = e.setup;
  var a = o.minScale;
  var r = o.limitToBounds;
  var c = o.zoomAnimation;
  var l = c.disabled;
  var u = c.animationTime;
  var d = c.animationType;
  var m = l || i >= a;
  if (i >= 1 || r) {
    K(e);
  }
  if (!m && s && e.mounted) {
    var p = H(e, a, n || s.offsetWidth / 2, t || s.offsetHeight / 2);
    if (p) {
      T(e, p, u, d);
    }
  }
}
function Z() {
  Z = Object.assign || function (e) {
    var n;
    for (var t = 1, i = arguments.length; t < i; t++) {
      for (var s in n = arguments[t]) {
        if (Object.prototype.hasOwnProperty.call(n, s)) {
          e[s] = n[s];
        }
      }
    }
    return e;
  };
  return Z.apply(this, arguments);
}
function _(e, n, t) {
  var i;
  for (var s = 0, o = n.length; s < o; s++) {
    if (!!i || !(s in n)) {
      i ||= Array.prototype.slice.call(n, 0, s);
      i[s] = n[s];
    }
  }
  return e.concat(i || Array.prototype.slice.call(n));
}
if (typeof SuppressedError == "function") {
  SuppressedError;
}
var q = 1;
var Q = 0;
var U = 0;
var V = {
  disabled: false,
  minPositionX: null,
  maxPositionX: null,
  minPositionY: null,
  maxPositionY: null,
  minScale: 1,
  maxScale: 8,
  limitToBounds: true,
  centerZoomedOut: false,
  centerOnInit: false,
  disablePadding: false,
  smooth: true,
  wheel: {
    step: 0.2,
    disabled: false,
    smoothStep: 0.001,
    wheelDisabled: false,
    touchPadDisabled: false,
    activationKeys: [],
    excluded: []
  },
  panning: {
    disabled: false,
    velocityDisabled: false,
    lockAxisX: false,
    lockAxisY: false,
    allowLeftClickPan: true,
    allowMiddleClickPan: true,
    allowRightClickPan: true,
    wheelPanning: false,
    activationKeys: [],
    excluded: []
  },
  pinch: {
    step: 5,
    disabled: false,
    excluded: []
  },
  doubleClick: {
    disabled: false,
    step: 0.7,
    mode: "zoomIn",
    animationType: "easeOut",
    animationTime: 200,
    excluded: []
  },
  zoomAnimation: {
    disabled: false,
    size: 0.4,
    animationTime: 200,
    animationType: "easeOut"
  },
  alignmentAnimation: {
    disabled: false,
    sizeX: 100,
    sizeY: 100,
    animationTime: 200,
    velocityAlignmentTime: 400,
    animationType: "easeOut"
  },
  velocityAnimation: {
    disabled: false,
    sensitivity: 1,
    animationTime: 400,
    animationType: "easeOut",
    equalToMove: true
  }
};
var J = "react-transform-wrapper";
var G = "react-transform-component";
function ee(e) {
  return {
    previousScale: e.initialScale ?? q,
    scale: e.initialScale ?? q,
    positionX: e.initialPositionX ?? Q,
    positionY: e.initialPositionY ?? U
  };
}
function ne(e) {
  var n = Z({}, V);
  Object.keys(e).forEach(function (t) {
    var i = e[t] !== undefined;
    if (V[t] !== undefined && i) {
      var s = Object.prototype.toString.call(V[t]);
      var o = s === "[object Object]";
      var a = s === "[object Array]";
      n[t] = o ? Z(Z({}, V[t]), e[t]) : a ? _(_([], V[t]), e[t]) : e[t];
    }
  });
  return n;
}
function te(e, n, t) {
  var i = e.transformState.scale;
  var s = e.wrapperComponent;
  var o = e.setup;
  var a = o.maxScale;
  var r = o.minScale;
  var c = o.zoomAnimation;
  var l = o.smooth;
  var u = c.size;
  if (!s) {
    throw new Error("Wrapper is not mounted");
  }
  var d = l ? i * Math.exp(n * t) : i + n * t;
  return I(S(d, 3), r, a, u, false);
}
function ie(e, n, t, i, s) {
  var o = e.wrapperComponent;
  var a = e.transformState;
  var r = a.scale;
  var c = a.positionX;
  var l = a.positionY;
  if (o) {
    var u = (o.offsetWidth / 2 - c) / r;
    var d = (o.offsetHeight / 2 - l) / r;
    var m = H(e, te(e, n, t), u, d);
    if (m) {
      T(e, m, i, s);
    }
  }
}
function se(e, n, t, i) {
  var s = e.setup;
  var o = e.wrapperComponent;
  var a = s.limitToBounds;
  var r = ee(e.props);
  var c = e.transformState;
  var l = c.scale;
  var u = c.positionX;
  var d = c.positionY;
  if (o) {
    var m = k(e, r.scale);
    var p = z(r.positionX, r.positionY, m, a, 0, 0, o);
    var f = {
      scale: r.scale,
      positionX: p.x,
      positionY: p.y
    };
    if (l !== r.scale || u !== r.positionX || d !== r.positionY) {
      if (i != null) {
        i();
      }
      T(e, f, n, t);
    }
  }
}
function oe(e) {
  return function (n = 0.5, t = 300, i = "easeOut") {
    ie(e, 1, n, t, i);
  };
}
function ae(e) {
  return function (n = 0.5, t = 300, i = "easeOut") {
    ie(e, -1, n, t, i);
  };
}
function re(e) {
  return function (n, t, i, s = 300, o = "easeOut") {
    var a = e.transformState;
    var r = a.positionX;
    var c = a.positionY;
    var l = a.scale;
    var u = e.wrapperComponent;
    var d = e.contentComponent;
    if (!e.setup.disabled && u && d) {
      var m = {
        positionX: Number.isNaN(n) ? r : n,
        positionY: Number.isNaN(t) ? c : t,
        scale: Number.isNaN(i) ? l : i
      };
      T(e, m, s, o);
    }
  };
}
function ce(e) {
  return function (n = 200, t = "easeOut") {
    se(e, n, t);
  };
}
function le(e) {
  return function (n, t = 200, i = "easeOut") {
    var s = e.transformState;
    var o = e.wrapperComponent;
    var a = e.contentComponent;
    if (o && a) {
      var r = ye(n || s.scale, o, a);
      T(e, r, t, i);
    }
  };
}
function ue(e) {
  return function (n, t, i = 600, s = "easeOut") {
    N(e);
    var o = e.wrapperComponent;
    var a = typeof n == "string" ? document.getElementById(n) : n;
    if (o && a && o.contains(a)) {
      var r = function (e, n, t) {
        var i = e.wrapperComponent;
        var s = e.contentComponent;
        var o = e.transformState;
        var a = e.setup;
        var r = a.limitToBounds;
        var c = a.minScale;
        var l = a.maxScale;
        if (!i || !s) {
          return o;
        }
        var u;
        var d;
        var m;
        var p;
        var f;
        var h;
        var v;
        var y;
        var b = i.getBoundingClientRect();
        var x = n.getBoundingClientRect();
        u = i;
        d = s;
        m = o;
        p = n.getBoundingClientRect();
        f = u.getBoundingClientRect();
        h = d.getBoundingClientRect();
        v = f.x * m.scale;
        y = f.y * m.scale;
        var g = {
          x: (p.x - h.x + v) / m.scale,
          y: (p.y - h.y + y) / m.scale
        };
        var S = g.x;
        var w = g.y;
        var j = x.width / o.scale;
        var C = x.height / o.scale;
        var N = i.offsetWidth / j;
        var P = i.offsetHeight / C;
        var T = I(t || Math.min(N, P), c, l, 0, false);
        var M = (b.width - j * T) / 2;
        var E = (b.height - C * T) / 2;
        var Y = z((b.left - S) * T + M, (b.top - w) * T + E, k(e, T), r, 0, 0, i);
        return {
          positionX: Y.x,
          positionY: Y.y,
          scale: T
        };
      }(e, a, t);
      T(e, r, i, s);
    }
  };
}
function de(e) {
  return {
    instance: e,
    zoomIn: oe(e),
    zoomOut: ae(e),
    setTransform: re(e),
    resetTransform: ce(e),
    centerView: le(e),
    zoomToElement: ue(e)
  };
}
function me(e) {
  var n = {};
  Object.assign(n, function (e) {
    return {
      instance: e,
      state: e.transformState
    };
  }(e));
  Object.assign(n, de(e));
  return n;
}
function pe() {
  try {
    return {
      get passive() {
        return false;
      }
    };
  } catch (e) {
    return false;
  }
}
var fe = `.${J}`;
function he(e, n) {
  return n.some(function (n) {
    return e.matches(`${fe} ${n}, ${fe} .${n}, ${fe} ${n} *, ${fe} .${n} *`);
  });
}
function ve(e) {
  if (e) {
    clearTimeout(e);
  }
}
function ye(e, n, t) {
  var i = t.offsetWidth * e;
  var s = t.offsetHeight * e;
  return {
    scale: e,
    positionX: (n.offsetWidth - i) / 2,
    positionY: (n.offsetHeight - s) / 2
  };
}
function be(e, n, t) {
  var i = n.getBoundingClientRect();
  var s = 0;
  var o = 0;
  if ("clientX" in e) {
    s = (e.clientX - i.left) / t;
    o = (e.clientY - i.top) / t;
  } else {
    var a = e.touches[0];
    s = (a.clientX - i.left) / t;
    o = (a.clientY - i.top) / t;
  }
  if (!Number.isNaN(s)) {
    Number.isNaN(o);
  }
  return {
    x: s,
    y: o
  };
}
function xe(e) {
  return Math.sqrt(Math.pow(e.touches[0].pageX - e.touches[1].pageX, 2) + Math.pow(e.touches[0].pageY - e.touches[1].pageY, 2));
}
function ge(e, n) {
  var t = e.props;
  var i = t.onWheel;
  var s = t.onZoom;
  var o = e.contentComponent;
  var a = e.setup;
  var r = e.transformState.scale;
  var c = a.limitToBounds;
  var l = a.centerZoomedOut;
  var u = a.zoomAnimation;
  var d = a.wheel;
  var m = a.disablePadding;
  var p = a.smooth;
  var f = u.size;
  var h = u.disabled;
  var v = d.step;
  var y = d.smoothStep;
  if (!o) {
    throw new Error("Component not mounted");
  }
  n.preventDefault();
  n.stopPropagation();
  var b = function (e, n) {
    var t;
    var i;
    var s = function (e) {
      if (e) {
        if (e.deltaY < 0) {
          return 1;
        } else {
          return -1;
        }
      } else {
        return 0;
      }
    }(e);
    i = s;
    if (typeof (t = n) == "number") {
      return t;
    } else {
      return i;
    }
  }(n, null);
  var x = function (e, n, t, i) {
    var s = e.transformState.scale;
    var o = e.wrapperComponent;
    var a = e.setup;
    var r = a.maxScale;
    var c = a.minScale;
    var l = a.zoomAnimation;
    var u = a.disablePadding;
    var d = l.size;
    var m = l.disabled;
    if (!o) {
      throw new Error("Wrapper is not mounted");
    }
    var p = !i && !m;
    return I(S(s + n * t, 3), c, r, d, p && !u);
  }(e, b, p ? y * Math.abs(n.deltaY) : v, !n.ctrlKey);
  if (r !== x) {
    var g = E(e, x);
    var j = be(n, o, r);
    var C = c && (h || f === 0 || l || m);
    var N = Y(e, j.x, j.y, x, g, C);
    var P = N.x;
    var T = N.y;
    e.previousWheelEvent = n;
    e.setTransformState(x, P, T);
    w(me(e), n, i);
    w(me(e), n, s);
  }
}
function Se(e, n) {
  var t = e.props;
  var i = t.onWheelStop;
  var s = t.onZoomStop;
  ve(e.wheelAnimationTimer);
  e.wheelAnimationTimer = setTimeout(function () {
    if (e.mounted) {
      F(e, n.x, n.y);
      e.wheelAnimationTimer = null;
    }
  }, 100);
  var o = function (e, n) {
    var t = e.previousWheelEvent;
    var i = e.transformState.scale;
    var s = e.setup;
    var o = s.maxScale;
    var a = s.minScale;
    return !!t && (i < o || i > a || Math.sign(t.deltaY) !== Math.sign(n.deltaY) || t.deltaY > 0 && t.deltaY < n.deltaY || t.deltaY < 0 && t.deltaY > n.deltaY || Math.sign(t.deltaY) !== Math.sign(n.deltaY));
  }(e, n);
  if (o) {
    ve(e.wheelStopEventTimer);
    e.wheelStopEventTimer = setTimeout(function () {
      if (e.mounted) {
        e.wheelStopEventTimer = null;
        w(me(e), n, i);
        w(me(e), n, s);
      }
    }, 160);
  }
}
function we(e) {
  var n = 0;
  var t = 0;
  for (var i = 0; i < 2; i += 1) {
    n += e.touches[i].clientX;
    t += e.touches[i].clientY;
  }
  return {
    x: n / 2,
    y: t / 2
  };
}
function je(e, n) {
  var t = e.contentComponent;
  var i = e.pinchStartDistance;
  var s = e.wrapperComponent;
  var o = e.transformState.scale;
  var a = e.setup;
  var r = a.limitToBounds;
  var c = a.centerZoomedOut;
  var l = a.zoomAnimation;
  var u = a.alignmentAnimation;
  var d = l.disabled;
  var m = l.size;
  if (i !== null && t) {
    var p = function (e, n, t) {
      var i = t.getBoundingClientRect();
      var s = e.touches;
      var o = S(s[0].clientX - i.left, 5);
      var a = S(s[0].clientY - i.top, 5);
      return {
        x: (o + S(s[1].clientX - i.left, 5)) / 2 / n,
        y: (a + S(s[1].clientY - i.top, 5)) / 2 / n
      };
    }(n, o, t);
    if (Number.isFinite(p.x) && Number.isFinite(p.y)) {
      var f = xe(n);
      var h = function (e, n) {
        var t = e.pinchStartScale;
        var i = e.pinchStartDistance;
        var s = e.setup;
        var o = s.maxScale;
        var a = s.minScale;
        var r = s.zoomAnimation;
        var c = s.disablePadding;
        var l = r.size;
        var u = r.disabled;
        if (!t || i === null || !n) {
          throw new Error("Pinch touches distance was not provided");
        }
        if (n < 0) {
          return e.transformState.scale;
        } else {
          return I(S(n / i * t, 2), a, o, l, !u && !c);
        }
      }(e, f);
      var v = we(n);
      var y = v.x - (e.pinchLastCenterX || 0);
      var b = v.y - (e.pinchLastCenterY || 0);
      if (h !== o || y !== 0 || b !== 0) {
        e.pinchLastCenterX = v.x;
        e.pinchLastCenterY = v.y;
        var x = E(e, h);
        var g = r && (d || m === 0 || c);
        var w = Y(e, p.x, p.y, h, x, g);
        var j = w.x;
        var C = w.y;
        e.pinchMidpoint = p;
        e.lastDistance = f;
        var N = u.sizeX;
        var P = u.sizeY;
        var T = z(j + y, C + b, x, r, L(e, N), L(e, P), s);
        var k = T.x;
        var M = T.y;
        e.setTransformState(h, k, M);
      }
    }
  }
}
function Ce(e, n) {
  var t = e.props.onZoomStop;
  var i = e.setup.doubleClick.animationTime;
  ve(e.doubleClickStopEventTimer);
  e.doubleClickStopEventTimer = setTimeout(function () {
    e.doubleClickStopEventTimer = null;
    w(me(e), n, t);
  }, i);
}
function Ne(e, n) {
  var t = e.setup;
  var i = e.doubleClickStopEventTimer;
  var s = e.transformState;
  var o = e.contentComponent;
  var a = s.scale;
  var r = e.props;
  var c = r.onZoomStart;
  var l = r.onZoom;
  var u = t.doubleClick;
  var d = u.disabled;
  var m = u.mode;
  var p = u.step;
  var f = u.animationTime;
  var h = u.animationType;
  if (!d && !i) {
    if (m === "reset") {
      return function (e, n) {
        var t = e.props;
        var i = t.onZoomStart;
        var s = t.onZoom;
        var o = e.setup.doubleClick;
        var a = o.animationTime;
        var r = o.animationType;
        w(me(e), n, i);
        se(e, a, r, function () {
          return w(me(e), n, s);
        });
        Ce(e, n);
      }(e, n);
    }
    if (o) {
      var v = function (e, n) {
        if (e === "toggle") {
          if (n === 1) {
            return 1;
          } else {
            return -1;
          }
        } else if (e === "zoomOut") {
          return -1;
        } else {
          return 1;
        }
      }(m, e.transformState.scale);
      var y = te(e, v, p);
      if (a !== y) {
        w(me(e), n, c);
        var b = be(n, o, a);
        var x = H(e, y, b.x, b.y);
        if (x) {
          w(me(e), n, l);
          T(e, x, f, h);
          Ce(e, n);
        }
      }
    }
  }
}
var Pe = function () {
  return function (e) {
    var n = this;
    this.mounted = true;
    this.pinchLastCenterX = null;
    this.pinchLastCenterY = null;
    this.onChangeCallbacks = new Set();
    this.onInitCallbacks = new Set();
    this.wrapperComponent = null;
    this.contentComponent = null;
    this.isInitialized = false;
    this.bounds = null;
    this.previousWheelEvent = null;
    this.wheelStopEventTimer = null;
    this.wheelAnimationTimer = null;
    this.isPanning = false;
    this.isWheelPanning = false;
    this.startCoords = null;
    this.lastTouch = null;
    this.distance = null;
    this.lastDistance = null;
    this.pinchStartDistance = null;
    this.pinchStartScale = null;
    this.pinchMidpoint = null;
    this.doubleClickStopEventTimer = null;
    this.velocity = null;
    this.velocityTime = null;
    this.lastMousePosition = null;
    this.animate = false;
    this.animation = null;
    this.maxBounds = null;
    this.pressedKeys = {};
    this.mount = function () {
      n.initializeWindowEvents();
    };
    this.unmount = function () {
      n.cleanupWindowEvents();
    };
    this.update = function (e) {
      n.props = e;
      E(n, n.transformState.scale);
      n.setup = ne(e);
    };
    this.initializeWindowEvents = function () {
      var t;
      var i = pe();
      var s = n.wrapperComponent?.ownerDocument;
      var o = s == null ? undefined : s.defaultView;
      if ((t = n.wrapperComponent) !== null && t !== undefined) {
        t.addEventListener("wheel", n.onWheelPanning, i);
      }
      if (o != null) {
        o.addEventListener("mousedown", n.onPanningStart, i);
      }
      if (o != null) {
        o.addEventListener("mousemove", n.onPanning, i);
      }
      if (o != null) {
        o.addEventListener("mouseup", n.onPanningStop, i);
      }
      if (s != null) {
        s.addEventListener("mouseleave", n.clearPanning, i);
      }
      if (o != null) {
        o.addEventListener("keyup", n.setKeyUnPressed, i);
      }
      if (o != null) {
        o.addEventListener("keydown", n.setKeyPressed, i);
      }
    };
    this.cleanupWindowEvents = function () {
      var t;
      var i = pe();
      var s = n.wrapperComponent?.ownerDocument;
      var o = s == null ? undefined : s.defaultView;
      if (o != null) {
        o.removeEventListener("mousedown", n.onPanningStart, i);
      }
      if (o != null) {
        o.removeEventListener("mousemove", n.onPanning, i);
      }
      if (o != null) {
        o.removeEventListener("mouseup", n.onPanningStop, i);
      }
      if (s != null) {
        s.removeEventListener("mouseleave", n.clearPanning, i);
      }
      if (o != null) {
        o.removeEventListener("keyup", n.setKeyUnPressed, i);
      }
      if (o != null) {
        o.removeEventListener("keydown", n.setKeyPressed, i);
      }
      document.removeEventListener("mouseleave", n.clearPanning, i);
      N(n);
      if ((t = n.observer) !== null && t !== undefined) {
        t.disconnect();
      }
    };
    this.handleInitializeWrapperEvents = function (e) {
      var t = pe();
      e.addEventListener("wheel", n.onWheelZoom, t);
      e.addEventListener("dblclick", n.onDoubleClick, t);
      e.addEventListener("touchstart", n.onTouchPanningStart, t);
      e.addEventListener("touchmove", n.onTouchPanning, t);
      e.addEventListener("touchend", n.onTouchPanningStop, t);
    };
    this.handleInitialize = function (e, t) {
      var i = false;
      var s = n.setup.centerOnInit;
      function o(e, n) {
        for (var t = 0, i = e; t < i.length; t++) {
          if (i[t].target === n) {
            return true;
          }
        }
        return false;
      }
      n.applyTransformation();
      n.onInitCallbacks.forEach(function (e) {
        e(me(n));
      });
      n.observer = new ResizeObserver(function (a) {
        if (o(a, e) || o(a, t)) {
          if (s && !i) {
            var r = t.offsetWidth;
            var c = t.offsetHeight;
            if (r > 0 || c > 0) {
              i = true;
              n.setCenter();
            }
          } else {
            N(n);
            E(n, n.transformState.scale);
            K(n, 0);
          }
        }
      });
      n.observer.observe(e);
      n.observer.observe(t);
    };
    this.onWheelZoom = function (e) {
      if (!n.setup.disabled) {
        var t = function (e, n) {
          var t = e.setup.wheel;
          var i = t.disabled;
          var s = t.wheelDisabled;
          var o = t.touchPadDisabled;
          var a = t.excluded;
          var r = e.isInitialized;
          var c = e.isPanning;
          var l = n.target;
          return !!r && !c && !i && !!l && (!s || !!n.ctrlKey) && (!o || !n.ctrlKey) && !he(l, a);
        }(n, e);
        if (t) {
          if (n.isPressingKeys(n.setup.wheel.activationKeys)) {
            (function (e, n) {
              var t = e.props;
              var i = t.onWheelStart;
              var s = t.onZoomStart;
              if (!e.wheelStopEventTimer) {
                N(e);
                w(me(e), n, i);
                w(me(e), n, s);
              }
            })(n, e);
            ge(n, e);
            Se(n, e);
          }
        }
      }
    };
    this.onWheelPanning = function (e) {
      var t = n.setup;
      var i = t.disabled;
      var s = t.wheel;
      var o = t.panning;
      if (n.wrapperComponent && n.contentComponent && !i && s.wheelDisabled && !o.disabled && o.wheelPanning && !e.ctrlKey) {
        e.preventDefault();
        e.stopPropagation();
        var a = n.transformState;
        var r = a.positionX;
        var c = a.positionY;
        var l = r - e.deltaX;
        var u = c - e.deltaY;
        var d = o.lockAxisX ? r : l;
        var m = o.lockAxisY ? c : u;
        var p = n.setup.alignmentAnimation;
        var f = p.sizeX;
        var h = p.sizeY;
        var v = L(n, f);
        var y = L(n, h);
        if (d !== r || m !== c) {
          O(n, d, m, v, y);
        }
      }
    };
    this.onPanningStart = function (e) {
      var t = n.setup.disabled;
      var i = n.props.onPanningStart;
      if (!t) {
        if (X(n, e) && n.isPressingKeys(n.setup.panning.activationKeys) && (e.button !== 0 || n.setup.panning.allowLeftClickPan) && (e.button !== 1 || n.setup.panning.allowMiddleClickPan) && (e.button !== 2 || n.setup.panning.allowRightClickPan)) {
          e.preventDefault();
          e.stopPropagation();
          N(n);
          B(n, e);
          w(me(n), e, i);
        }
      }
    };
    this.onPanning = function (e) {
      var t = n.setup.disabled;
      var i = n.props.onPanning;
      if (!t) {
        if (A(n) && n.isPressingKeys(n.setup.panning.activationKeys)) {
          e.preventDefault();
          e.stopPropagation();
          R(n, e.clientX, e.clientY);
          w(me(n), e, i);
        }
      }
    };
    this.onPanningStop = function (e) {
      var t = n.props.onPanningStop;
      if (n.isPanning) {
        $(n);
        w(me(n), e, t);
      }
    };
    this.onPinchStart = function (e) {
      var t = n.setup.disabled;
      var i = n.props;
      var s = i.onPinchingStart;
      var o = i.onZoomStart;
      if (!t) {
        var a = function (e, n) {
          var t = e.setup.pinch;
          var i = t.disabled;
          var s = t.excluded;
          var o = e.isInitialized;
          var a = n.target;
          return !!o && !i && !!a && !he(a, s);
        }(n, e);
        if (a) {
          (function (e, n) {
            var t = xe(n);
            e.pinchStartDistance = t;
            e.lastDistance = t;
            e.pinchStartScale = e.transformState.scale;
            e.isPanning = false;
            var i = we(n);
            e.pinchLastCenterX = i.x;
            e.pinchLastCenterY = i.y;
            N(e);
          })(n, e);
          N(n);
          w(me(n), e, s);
          w(me(n), e, o);
        }
      }
    };
    this.onPinch = function (e) {
      var t = n.setup.disabled;
      var i = n.props;
      var s = i.onPinching;
      var o = i.onZoom;
      if (!t) {
        var a = function (e) {
          var n = e.setup.pinch.disabled;
          var t = e.isInitialized;
          var i = e.pinchStartDistance;
          return !!t && !n && !!i;
        }(n);
        if (a) {
          e.preventDefault();
          e.stopPropagation();
          je(n, e);
          w(me(n), e, s);
          w(me(n), e, o);
        }
      }
    };
    this.onPinchStop = function (e) {
      var t;
      var i;
      var s = n.props;
      var o = s.onPinchingStop;
      var a = s.onZoomStop;
      if (n.pinchStartScale) {
        i = (t = n).pinchMidpoint;
        t.velocity = null;
        t.lastDistance = null;
        t.pinchMidpoint = null;
        t.pinchStartScale = null;
        t.pinchStartDistance = null;
        F(t, i == null ? undefined : i.x, i == null ? undefined : i.y);
        w(me(n), e, o);
        w(me(n), e, a);
      }
    };
    this.onTouchPanningStart = function (e) {
      var t = n.setup.disabled;
      var i = n.props.onPanningStart;
      if (!t && X(n, e) && (!n.lastTouch || !(+new Date() - n.lastTouch < 200) || e.touches.length !== 1)) {
        n.lastTouch = +new Date();
        N(n);
        var s = e.touches;
        var o = s.length === 1;
        var a = s.length === 2;
        if (o) {
          N(n);
          B(n, e);
          w(me(n), e, i);
        }
        if (a) {
          n.onPinchStart(e);
        }
      }
    };
    this.onTouchPanning = function (e) {
      var t = n.setup.disabled;
      var i = n.props.onPanning;
      if (n.isPanning && e.touches.length === 1) {
        if (t) {
          return;
        }
        if (!A(n)) {
          return;
        }
        e.preventDefault();
        e.stopPropagation();
        var s = e.touches[0];
        R(n, s.clientX, s.clientY);
        w(me(n), e, i);
      } else if (e.touches.length > 1) {
        n.onPinch(e);
      }
    };
    this.onTouchPanningStop = function (e) {
      n.onPanningStop(e);
      n.onPinchStop(e);
    };
    this.onDoubleClick = function (e) {
      if (!n.setup.disabled) {
        var t = function (e, n) {
          var t = e.isInitialized;
          var i = e.setup;
          var s = e.wrapperComponent;
          var o = i.doubleClick;
          var a = o.disabled;
          var r = o.excluded;
          var c = n.target;
          var l = s == null ? undefined : s.contains(c);
          return !!t && !!c && !!l && !a && !he(c, r);
        }(n, e);
        if (t) {
          Ne(n, e);
        }
      }
    };
    this.clearPanning = function (e) {
      if (n.isPanning) {
        n.onPanningStop(e);
      }
    };
    this.setKeyPressed = function (e) {
      n.pressedKeys[e.key] = true;
    };
    this.setKeyUnPressed = function (e) {
      n.pressedKeys[e.key] = false;
    };
    this.isPressingKeys = function (e) {
      return !e.length || Boolean(e.find(function (e) {
        return n.pressedKeys[e];
      }));
    };
    this.setTransformState = function (e, t, i) {
      var s = n.props.onTransformed;
      if (!Number.isNaN(e) && !Number.isNaN(t) && !Number.isNaN(i)) {
        if (e !== n.transformState.scale) {
          n.transformState.previousScale = n.transformState.scale;
          n.transformState.scale = e;
        }
        n.transformState.positionX = t;
        n.transformState.positionY = i;
        n.applyTransformation();
        var o = me(n);
        n.onChangeCallbacks.forEach(function (e) {
          return e(o);
        });
        w(o, {
          scale: e,
          positionX: t,
          positionY: i
        }, s);
      }
    };
    this.setCenter = function () {
      if (n.wrapperComponent && n.contentComponent) {
        var e = ye(n.transformState.scale, n.wrapperComponent, n.contentComponent);
        n.setTransformState(e.scale, e.positionX, e.positionY);
      }
    };
    this.handleTransformStyles = function (e, t, i) {
      if (n.props.customTransform) {
        return n.props.customTransform(e, t, i);
      } else {
        return function (e, n, t) {
          return `translate(${e}px, ${n}px) scale(${t})`;
        }(e, t, i);
      }
    };
    this.applyTransformation = function () {
      if (n.mounted && n.contentComponent) {
        var e = n.transformState;
        var t = e.scale;
        var i = e.positionX;
        var s = e.positionY;
        var o = n.handleTransformStyles(i, s, t);
        n.contentComponent.style.transform = o;
      }
    };
    this.getContext = function () {
      return me(n);
    };
    this.onChange = function (e) {
      if (!n.onChangeCallbacks.has(e)) {
        n.onChangeCallbacks.add(e);
      }
      return function () {
        n.onChangeCallbacks.delete(e);
      };
    };
    this.onInit = function (e) {
      if (!n.onInitCallbacks.has(e)) {
        n.onInitCallbacks.add(e);
      }
      return function () {
        n.onInitCallbacks.delete(e);
      };
    };
    this.init = function (e, t) {
      n.cleanupWindowEvents();
      n.wrapperComponent = e;
      n.contentComponent = t;
      E(n, n.transformState.scale);
      n.handleInitializeWrapperEvents(e);
      n.handleInitialize(e, t);
      n.initializeWindowEvents();
      n.isInitialized = true;
      var i = me(n);
      w(i, undefined, n.props.onInit);
    };
    this.props = e;
    this.setup = ne(this.props);
    this.transformState = ee(this.props);
  };
}();
var Te = e.createContext(null);
var ke = e.forwardRef(function (t, i) {
  var s;
  var o;
  var a = n.useRef(new Pe(t)).current;
  s = t.children;
  o = de(a);
  var r = typeof s == "function" ? s(o) : s;
  n.useImperativeHandle(i, function () {
    return de(a);
  }, [a]);
  n.useEffect(function () {
    a.update(t);
  }, [a, t]);
  return e.createElement(Te.Provider, {
    value: a
  }, r);
});
e.forwardRef(function (t, i) {
  var s;
  var o = n.useRef(null);
  var a = n.useContext(Te);
  n.useEffect(function () {
    return a.onChange(function (e) {
      if (o.current) {
        o.current.style.transform = a.handleTransformStyles(0, 0, 1 / e.instance.transformState.scale);
      }
    });
  }, [a]);
  return e.createElement("div", Z({}, t, {
    ref: (s = [o, i], function (e) {
      s.forEach(function (n) {
        if (typeof n == "function") {
          n(e);
        } else if (n != null) {
          n.current = e;
        }
      });
    })
  }));
});
var Me = "transform-component-module_wrapper__SPB86";
var Ee = "transform-component-module_content__FBWxo";
(function (e, n = {}) {
  var t = n.insertAt;
  if (typeof document != "undefined") {
    var i = document.head || document.getElementsByTagName("head")[0];
    var s = document.createElement("style");
    s.type = "text/css";
    if (t === "top" && i.firstChild) {
      i.insertBefore(s, i.firstChild);
    } else {
      i.appendChild(s);
    }
    if (s.styleSheet) {
      s.styleSheet.cssText = e;
    } else {
      s.appendChild(document.createTextNode(e));
    }
  }
})(".transform-component-module_wrapper__SPB86 {\n  position: relative;\n  width: -moz-fit-content;\n  width: fit-content;\n  height: -moz-fit-content;\n  height: fit-content;\n  overflow: hidden;\n  -webkit-touch-callout: none; /* iOS Safari */\n  -webkit-user-select: none; /* Safari */\n  -khtml-user-select: none; /* Konqueror HTML */\n  -moz-user-select: none; /* Firefox */\n  -ms-user-select: none; /* Internet Explorer/Edge */\n  user-select: none;\n  margin: 0;\n  padding: 0;\n  transform: translate3d(0, 0, 0);\n}\n.transform-component-module_content__FBWxo {\n  display: flex;\n  flex-wrap: wrap;\n  width: -moz-fit-content;\n  width: fit-content;\n  height: -moz-fit-content;\n  height: fit-content;\n  margin: 0;\n  padding: 0;\n  transform-origin: 0% 0%;\n}\n.transform-component-module_content__FBWxo img {\n  pointer-events: none;\n}\n");
function ze(t) {
  var i = t.children;
  var s = t.wrapperClass;
  var o = s === undefined ? "" : s;
  var a = t.contentClass;
  var r = a === undefined ? "" : a;
  var c = t.wrapperStyle;
  var l = t.contentStyle;
  var u = t.wrapperProps;
  var d = u === undefined ? {} : u;
  var m = t.contentProps;
  var p = m === undefined ? {} : m;
  var f = n.useContext(Te);
  var h = f.init;
  var v = f.cleanupWindowEvents;
  var y = n.useRef(null);
  var b = n.useRef(null);
  n.useEffect(function () {
    var e = y.current;
    var n = b.current;
    if (e !== null && n !== null && h) {
      if (h != null) {
        h(e, n);
      }
    }
    return function () {
      if (v != null) {
        v();
      }
    };
  }, []);
  return e.createElement("div", Z({}, d, {
    ref: y,
    className: `${J} ${Me} ${o}`,
    style: c
  }), e.createElement("div", Z({}, p, {
    ref: b,
    className: `${G} ${Ee} ${r}`,
    style: l
  }), i));
}
const Ye = () => {
  const e = i();
  if (e) {
    return {
      Authorization: `Bearer ${e}`
    };
  } else {
    return {};
  }
};
const Ie = async e => {
  if (!e.ok) {
    let n = `Request failed with status ${e.status}`;
    try {
      const t = await e.json();
      if (t == null ? undefined : t.detail) {
        n = String(t.detail);
      }
    } catch {}
    throw new Error(n);
  }
  return e.json();
};
const Xe = e => `/api/v1/course-generation/courses/${encodeURIComponent(e)}/structure`;
const Ae = ["intuition", "definition", "derivation", "advanced", "application"];
const Oe = e => {
  var n;
  if (Array.isArray(e.lectures) && e.lectures.length > 0) {
    return e.lectures;
  }
  return (((n = e.lecture) == null ? undefined : n.sessions) ?? []).map((n, t) => ({
    lectureId: `${e.unitId || "unit"}Lecture${t + 1}`,
    title: n.title,
    description: n.description,
    sessions: [n]
  }));
};
const Le = e => Array.isArray(e.sessions) ? e.sessions : [];
const We = e => [e.level, e.unitId ?? "", e.lectureId ?? "", e.sessionIndex ?? ""].join("|");
const De = e => e.startsWith("#") ? e : `#${e}`;
const Be = ({
  nodeRef: e,
  busyKey: n,
  busyOp: t,
  disabled: i,
  onAction: s,
  t: o
}) => {
  const r = e.level !== "session";
  const l = e.level !== "course";
  if (!r && !l) {
    return null;
  }
  const u = n === We(e);
  const d = u && t === "split";
  const m = u && t === "delete";
  return a.jsxs("div", {
    className: "csm-node-actions" + (u ? " csm-node-actions--pinned" : ""),
    children: [r && a.jsxs("button", {
      type: "button",
      className: "csm-act" + (d ? " csm-act--busy" : ""),
      disabled: i,
      "aria-label": o("courseStructureMap.splitTitle"),
      onClick: n => {
        n.stopPropagation();
        s(e, "split");
      },
      children: [d ? a.jsx(c, {
        size: 12,
        className: "csm-spin"
      }) : a.jsx(v, {
        size: 12
      }), a.jsx("span", {
        children: o("courseStructureMap.splitAction")
      }), !d && a.jsx("span", {
        className: "csm-tip",
        role: "tooltip",
        children: o("courseStructureMap.splitTitle")
      })]
    }), l && a.jsxs("button", {
      type: "button",
      className: "csm-act csm-act--danger" + (m ? " csm-act--busy" : ""),
      disabled: i,
      "aria-label": o("courseStructureMap.deleteTitle"),
      onClick: n => {
        n.stopPropagation();
        s(e, "delete");
      },
      children: [m ? a.jsx(c, {
        size: 12,
        className: "csm-spin"
      }) : a.jsx(y, {
        size: 12
      }), !m && a.jsx("span", {
        className: "csm-tip",
        role: "tooltip",
        children: o("courseStructureMap.deleteTitle")
      })]
    })]
  });
};
const Ke = ({
  variant: e,
  label: n
}) => a.jsxs("div", {
  className: `csm-node csm-node--${e} csm-node--skeleton`,
  role: "status",
  "aria-busy": "true",
  "aria-label": n,
  children: [e !== "session" && a.jsx("div", {
    className: "csm-skel csm-skel--eyebrow"
  }), a.jsx("div", {
    className: "csm-skel csm-skel--title"
  }), a.jsx("div", {
    className: "csm-skel csm-skel--title csm-skel--title-short"
  }), e === "session" && a.jsxs("div", {
    className: "csm-chips",
    "aria-hidden": "true",
    children: [a.jsx("span", {
      className: "csm-skel csm-skel--chip"
    }), a.jsx("span", {
      className: "csm-skel csm-skel--chip csm-skel--chip-sm"
    })]
  })]
});
const Re = ({
  parentRef: e,
  label: n,
  busyKey: t,
  busyOp: i,
  disabled: s,
  onAction: o,
  t: r
}) => {
  const c = t === We(e) && i === "deepen";
  const l = (d = e.level) === "course" ? "unit" : d === "unit" ? "lecture" : "session";
  var d;
  if (c) {
    return a.jsx("div", {
      className: "csm-child" + (l === "session" ? " csm-child--leaf" : ""),
      children: a.jsx(Ke, {
        variant: l,
        label: n
      })
    });
  } else {
    return a.jsx("div", {
      className: "csm-child csm-child--deepen",
      children: a.jsxs("button", {
        type: "button",
        className: "csm-deepen",
        disabled: s,
        "aria-label": r("courseStructureMap.deepenTitle"),
        onClick: () => o(e, "deepen"),
        children: [a.jsx(u, {
          size: 13
        }), a.jsx("span", {
          children: n
        }), a.jsx("span", {
          className: "csm-tip",
          role: "tooltip",
          children: r("courseStructureMap.deepenTitle")
        })]
      })
    });
  }
};
const $e = (e, n, t) => n === "split" && e === We(t);
const He = e => {
  const n = new Set();
  n.add("course");
  for (const t of e.units ?? []) {
    n.add(`unit:${t.unitId}`);
    for (const e of Oe(t)) {
      n.add(`lec:${e.lectureId}`);
      for (const t of Le(e)) {
        n.add(`ses:${e.lectureId}:${t.sessionId ?? t.sessionIndex}`);
      }
    }
  }
  return n;
};
const Fe = ({
  courseUuid: e,
  initialStructure: u,
  enableFloatingControls: m = false,
  readOnly: v = false,
  initiallyConfirmed: y = false,
  onConfirmFallback: S,
  onConfirmed: w
}) => {
  const {
    t: j
  } = s();
  const [C, N] = n.useState(u);
  const [P, T] = n.useState(null);
  const [k, M] = n.useState(null);
  const [E, z] = n.useState(null);
  const [Y, I] = n.useState(y);
  const [X, A] = n.useState(false);
  const [O, L] = n.useState(false);
  const [W, D] = n.useState("");
  const [B, K] = n.useState(false);
  const [R, $] = n.useState(false);
  const [H, F] = n.useState(null);
  const [Z, _] = n.useState(false);
  const [q, Q] = n.useState(false);
  const [U, V] = n.useState(false);
  const [J, G] = n.useState(new Set());
  const [ee, ne] = n.useState(null);
  const te = n.useRef(He(u));
  const ie = n.useRef(null);
  const se = n.useRef(null);
  n.useEffect(() => {
    const e = se.current;
    if (e) {
      e.style.height = "";
      if (W) {
        e.style.height = `${e.scrollHeight + 2}px`;
      }
    }
  }, [W]);
  n.useEffect(() => {
    document.body.classList.toggle("course-blueprint-fullscreen", X);
    return () => {
      document.body.classList.remove("course-blueprint-fullscreen");
    };
  }, [X]);
  n.useEffect(() => {
    ne(m ? document.querySelector(".chat-response-container") ?? document.body : null);
  }, [m]);
  n.useEffect(() => {
    if (!X) {
      return;
    }
    const e = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const n = e => {
      if (e.key === "Escape") {
        A(false);
      }
    };
    window.addEventListener("keydown", n);
    const t = window.setTimeout(() => {
      var e;
      if ((e = ie.current) == null) {
        return undefined;
      } else {
        return e.centerView(0.85);
      }
    }, 160);
    return () => {
      document.body.style.overflow = e;
      window.removeEventListener("keydown", n);
      window.clearTimeout(t);
    };
  }, [X]);
  const oe = e => j(`courseStructureMap.depthTags.${e}`);
  const ae = n.useMemo(() => Array.isArray(C.units) ? C.units : [], [C.units]);
  const re = P !== null;
  const ce = H !== null;
  const le = re || Y || B || v || Z || U || ce;
  const ue = n.useCallback(e => {
    const n = He(e.structure);
    const t = new Set();
    n.forEach(e => {
      if (!te.current.has(e)) {
        t.add(e);
      }
    });
    te.current = n;
    G(t);
    N(e.structure);
    F(e.pending ? e.shapeDelta : null);
    Q(Boolean(e.canUndo));
    setTimeout(() => G(new Set()), 450);
  }, []);
  n.useEffect(() => {
    if (v || Y) {
      return;
    }
    let n = false;
    (async function (e) {
      const n = await fetch(t(Xe(e)), {
        headers: Ye()
      });
      return Ie(n);
    })(e).then(e => {
      if (!n) {
        ue(e);
      }
    }).catch(() => {});
    return () => {
      n = true;
    };
  }, [e, v, Y, ue]);
  const de = n.useCallback(async (n, i) => {
    if (!v && P === null && !Y && !B && !ce) {
      z(null);
      T(We(n));
      M(i);
      try {
        ue(await async function (e, n, i) {
          const s = await fetch(t(`${Xe(e)}/edit`), {
            method: "POST",
            headers: {
              ...Ye(),
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              op: n,
              ref: i
            })
          });
          return Ie(s);
        }(e, i, n));
      } catch (s) {
        z(s instanceof Error ? s.message : j("courseStructureMap.editFailed"));
      } finally {
        T(null);
        M(null);
      }
    }
  }, [P, Y, B, ce, e, ue, j]);
  const me = n.useCallback(async () => {
    const n = W.trim();
    if (!v && !!n && !B && P === null && !Y && !ce) {
      z(null);
      K(true);
      try {
        ue(await async function (e, n) {
          const i = await fetch(t(`${Xe(e)}/regenerate`), {
            method: "POST",
            headers: {
              ...Ye(),
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              prompt: n
            })
          });
          return Ie(i);
        }(e, n));
        $(false);
        setTimeout(() => {
          var e;
          if ((e = ie.current) == null) {
            return undefined;
          } else {
            return e.centerView(0.85);
          }
        }, 160);
      } catch (i) {
        z(i instanceof Error ? i.message : j("courseStructureMap.regenFailed"));
      } finally {
        K(false);
      }
    }
  }, [W, B, P, Y, ce, e, ue, j]);
  const pe = n.useCallback(async () => {
    if (!v && ce && !Z) {
      z(null);
      _(true);
      try {
        ue(await async function (e) {
          const n = await fetch(t(`${Xe(e)}/apply`), {
            method: "POST",
            headers: Ye()
          });
          return Ie(n);
        }(e));
        D("");
      } catch (n) {
        z(n instanceof Error ? n.message : j("courseStructureMap.applyFailed"));
      } finally {
        _(false);
      }
    }
  }, [v, ce, Z, e, ue, j]);
  const fe = n.useCallback(async () => {
    if (!v && ce && !Z) {
      z(null);
      _(true);
      try {
        ue(await async function (e) {
          const n = await fetch(t(`${Xe(e)}/discard`), {
            method: "POST",
            headers: Ye()
          });
          return Ie(n);
        }(e));
        $(true);
      } catch (n) {
        z(n instanceof Error ? n.message : j("courseStructureMap.discardFailed"));
      } finally {
        _(false);
      }
    }
  }, [v, ce, Z, e, ue, j]);
  const he = n.useCallback(async () => {
    if (!v && !Y && !U && q) {
      z(null);
      V(true);
      try {
        ue(await async function (e) {
          const n = await fetch(t(`${Xe(e)}/undo`), {
            method: "POST",
            headers: Ye()
          });
          return Ie(n);
        }(e));
      } catch (n) {
        z(n instanceof Error ? n.message : j("courseStructureMap.undoFailed"));
      } finally {
        V(false);
      }
    }
  }, [v, Y, U, q, e, ue, j]);
  const ve = n.useCallback(() => {
    if (le) {
      return;
    }
    const e = i();
    const n = e ? o.getInstance(e, () => {}) : null;
    if ((n == null ? undefined : n.ws) && n.ws.readyState === WebSocket.OPEN) {
      n.confirmStructure();
    } else if (S) {
      S();
    }
    I(true);
    if (w != null) {
      w();
    }
  }, [le, S, w]);
  const ye = n.useCallback(() => {
    A(e => !e);
  }, []);
  const be = n.useMemo(() => ae.reduce((e, n) => e + Oe(n).reduce((e, n) => e + Le(n).length, 0), 0), [ae]);
  const xe = a.jsxs("div", {
    className: "csm-regen-inputwrap" + (W.trim() || B ? " csm-regen-inputwrap--has-send" : ""),
    children: [a.jsx("textarea", {
      ref: se,
      className: "csm-regen-input",
      value: W,
      onChange: e => D(e.target.value),
      onKeyDown: e => {
        if ((e.key !== "Enter" || e.shiftKey || e.metaKey || e.ctrlKey) && e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
          e.preventDefault();
          me();
        }
      },
      placeholder: j("courseStructureMap.regenPlaceholder"),
      maxLength: 2000,
      rows: 1,
      disabled: B
    }), (W.trim() || B) && a.jsx("button", {
      type: "button",
      className: "csm-regen-send",
      onClick: me,
      disabled: B || W.trim().length === 0,
      "aria-label": j("courseStructureMap.regenSubmit"),
      title: j("courseStructureMap.regenSubmit"),
      children: B ? a.jsx(c, {
        size: 15,
        className: "csm-spin"
      }) : a.jsx(l, {
        size: 15
      })
    })]
  });
  const ge = ce && H ? a.jsxs("div", {
    className: "csm-blueprint-action-section csm-proposal",
    children: [a.jsx("div", {
      className: "csm-blueprint-action-prompt",
      children: j("courseStructureMap.proposalPrompt")
    }), a.jsx("div", {
      className: "csm-proposal-delta",
      children: [["units", H.units], ["lectures", H.lectures], ["sessions", H.sessions]].map(([e, [n, t]]) => a.jsxs("span", {
        className: `csm-proposal-metric${t < n ? " csm-proposal-metric--down" : ""}${t > n ? " csm-proposal-metric--up" : ""}`,
        children: [a.jsx("span", {
          className: "csm-proposal-metric-label",
          children: j(`courseStructureMap.metric.${e}`)
        }), a.jsxs("span", {
          className: "csm-proposal-metric-value",
          children: [n, " → ", t]
        })]
      }, e))
    }), a.jsxs("div", {
      className: "csm-blueprint-choice-bar",
      children: [a.jsx("button", {
        type: "button",
        className: "csm-blueprint-choice csm-blueprint-choice--secondary",
        onClick: fe,
        disabled: Z,
        children: j("courseStructureMap.discardProposalBtn")
      }), a.jsxs("button", {
        type: "button",
        className: "csm-blueprint-choice csm-blueprint-choice--primary",
        onClick: pe,
        disabled: Z,
        children: [Z ? a.jsx(c, {
          size: 15,
          className: "csm-spin"
        }) : a.jsx(d, {
          size: 16,
          className: "csm-confirm-icon",
          "aria-hidden": "true"
        }), a.jsx("span", {
          children: j("courseStructureMap.applyProposalBtn")
        })]
      })]
    })]
  }) : null;
  const Se = !Y && m ? ge ?? a.jsxs("div", {
    className: "csm-blueprint-action-section",
    children: [a.jsx("div", {
      className: "csm-blueprint-action-prompt",
      children: j(R ? "courseStructureMap.feedbackPrompt" : "courseStructureMap.choosePrompt")
    }), R ? a.jsxs("div", {
      className: "csm-blueprint-action-bar csm-blueprint-action-bar--feedback",
      children: [a.jsxs("div", {
        className: "csm-blueprint-action-input",
        children: [xe, a.jsx("div", {
          className: "csm-regen-hint",
          children: j("courseStructureMap.regenSubmitHint")
        })]
      }), a.jsx("button", {
        type: "button",
        className: "csm-blueprint-secondary",
        onClick: () => $(false),
        disabled: B,
        children: j("courseStructureMap.backToChoicesBtn")
      })]
    }) : a.jsxs("div", {
      className: "csm-blueprint-choice-bar",
      children: [a.jsx("button", {
        type: "button",
        className: "csm-blueprint-choice csm-blueprint-choice--secondary",
        onClick: () => $(true),
        disabled: re || B,
        children: j("courseStructureMap.adjustChoiceBtn")
      }), a.jsxs("button", {
        type: "button",
        className: "csm-blueprint-choice csm-blueprint-choice--primary",
        onClick: ve,
        disabled: le,
        children: [a.jsx(d, {
          size: 16,
          className: "csm-confirm-icon",
          "aria-hidden": "true"
        }), a.jsx("span", {
          children: j("courseStructureMap.continueChoiceBtn")
        })]
      })]
    }), q && !R && a.jsxs("button", {
      type: "button",
      className: "csm-undo-btn",
      onClick: he,
      disabled: U || re || B,
      title: j("courseStructureMap.undoTitle"),
      children: [U ? a.jsx(c, {
        size: 13,
        className: "csm-spin"
      }) : a.jsx(b, {
        size: 13
      }), a.jsx("span", {
        children: j("courseStructureMap.undoBtn")
      })]
    })]
  }) : null;
  const we = a.jsxs("div", {
    className: `csm-card ${Y ? "csm-card--confirmed" : ""}${X ? " csm-card--in-fullscreen" : ""}`,
    children: [a.jsx("button", {
      type: "button",
      className: "csm-fullscreen-btn",
      title: j(X ? "courseStructureMap.exitFullscreenTitle" : "courseStructureMap.fullscreenTitle"),
      "aria-label": j(X ? "courseStructureMap.exitFullscreenTitle" : "courseStructureMap.fullscreenTitle"),
      onClick: ye,
      children: X ? a.jsx(h, {
        size: 14
      }) : a.jsx(p, {
        size: 14
      })
    }), a.jsxs("div", {
      className: "csm-header",
      children: [a.jsx("div", {
        className: "csm-eyebrow",
        children: j("courseStructureMap.eyebrow")
      }), a.jsxs("div", {
        className: "csm-title-row",
        children: [a.jsx("h3", {
          className: "csm-title",
          children: C.courseTitle || j("courseStructureMap.unnamedCourse")
        }), a.jsxs("div", {
          className: "csm-stat-wrap" + (X ? " csm-stat-wrap--popover" : ""),
          children: [a.jsx("span", {
            className: "csm-stat",
            tabIndex: X ? 0 : undefined,
            title: X ? j("courseStructureMap.depthLegendTitle") : undefined,
            children: j("courseStructureMap.statSessions", {
              count: be
            })
          }), X && a.jsxs("div", {
            className: "csm-stat-popover",
            role: "tooltip",
            children: [a.jsx("div", {
              className: "csm-stat-popover-title",
              children: j("courseStructureMap.legendLabel")
            }), a.jsx("div", {
              className: "csm-stat-popover-chips",
              children: Ae.map(e => a.jsx("span", {
                className: `csm-chip csm-chip--${e}`,
                children: oe(e)
              }, e))
            })]
          })]
        })]
      }), C.targetLearner && a.jsx("p", {
        className: "csm-subtitle",
        children: C.targetLearner
      }), !X && a.jsxs("div", {
        className: "csm-legend",
        children: [a.jsx("span", {
          className: "csm-legend-label",
          children: j("courseStructureMap.legendLabel")
        }), Ae.map(e => a.jsx("span", {
          className: `csm-chip csm-chip--${e}`,
          children: oe(e)
        }, e))]
      })]
    }), E && a.jsxs("div", {
      className: "csm-error",
      role: "alert",
      children: [a.jsx("span", {
        children: E
      }), a.jsx("button", {
        type: "button",
        className: "csm-error-close",
        onClick: () => z(null),
        "aria-label": j("courseStructureMap.errorCloseAria"),
        children: a.jsx(f, {
          size: 13
        })
      })]
    }), a.jsxs("div", {
      className: "csm-canvas",
      children: [B && a.jsxs("div", {
        className: "csm-regen-overlay",
        role: "status",
        "aria-live": "polite",
        children: [a.jsx(c, {
          size: 26,
          className: "csm-spin"
        }), a.jsx("span", {
          children: j("courseStructureMap.regeneratingNote")
        })]
      }), a.jsx(ke, {
        ref: ie,
        initialScale: 1,
        minScale: 0.25,
        maxScale: 2.5,
        limitToBounds: false,
        centerOnInit: true,
        onInit: e => {
          setTimeout(() => e.centerView(0.85), 80);
        },
        children: ({
          zoomIn: e,
          zoomOut: n
        }) => a.jsxs(a.Fragment, {
          children: [a.jsxs("div", {
            className: "csm-zoom-controls",
            children: [a.jsx("button", {
              type: "button",
              className: "csm-zoom-btn",
              title: j("courseStructureMap.zoomInTitle"),
              onClick: () => e(0.25),
              children: a.jsx(x, {})
            }), a.jsx("button", {
              type: "button",
              className: "csm-zoom-btn",
              title: j("courseStructureMap.zoomOutTitle"),
              onClick: () => n(0.25),
              children: a.jsx(g, {})
            })]
          }), a.jsx(ze, {
            wrapperClass: "csm-transform-wrapper",
            contentClass: "csm-transform-content",
            children: a.jsx("div", {
              className: "csm-tree",
              children: a.jsxs("div", {
                className: "csm-group",
                children: [a.jsxs("div", {
                  className: "csm-node csm-node--course" + (J.has("course") ? " csm-node--enter" : ""),
                  children: [a.jsx("div", {
                    className: "csm-node-title",
                    children: C.courseTitle || j("courseStructureMap.unnamedCourse")
                  }), C.tags && C.tags.length > 0 && a.jsx("div", {
                    className: "csm-node-tags",
                    children: C.tags.slice(0, 3).map(e => a.jsx("span", {
                      className: "csm-node-tag",
                      children: De(e)
                    }, e))
                  })]
                }), a.jsxs("div", {
                  className: "csm-kids",
                  children: [ae.map((e, n) => {
                    const t = Oe(e);
                    const i = {
                      level: "unit",
                      unitId: e.unitId
                    };
                    const s = J.has(`unit:${e.unitId}`);
                    return a.jsxs("div", {
                      className: "csm-group csm-child",
                      children: [a.jsxs("div", {
                        className: "csm-node csm-node--unit" + (s ? " csm-node--enter" : ""),
                        children: [a.jsx("div", {
                          className: "csm-node-eyebrow",
                          children: j("courseStructureMap.unitLabel", {
                            number: String(n + 1).padStart(2, "0")
                          })
                        }), a.jsx("div", {
                          className: "csm-node-title",
                          children: e.title || j("courseStructureMap.unnamedUnit")
                        }), a.jsx(Be, {
                          nodeRef: i,
                          busyKey: P,
                          busyOp: k,
                          disabled: le,
                          onAction: de,
                          t: j
                        })]
                      }), a.jsxs("div", {
                        className: "csm-kids" + ($e(P, k, i) ? " csm-kids--mutating" : ""),
                        children: [t.map((n, t) => {
                          const i = Le(n);
                          const s = {
                            level: "lecture",
                            unitId: e.unitId,
                            lectureId: n.lectureId
                          };
                          const o = J.has(`lec:${n.lectureId}`);
                          return a.jsxs("div", {
                            className: "csm-group csm-child",
                            children: [a.jsxs("div", {
                              className: "csm-node csm-node--lecture" + (o ? " csm-node--enter" : ""),
                              children: [a.jsx("div", {
                                className: "csm-node-eyebrow",
                                children: j("courseStructureMap.lectureLabel", {
                                  number: String(t + 1).padStart(2, "0")
                                })
                              }), a.jsx("div", {
                                className: "csm-node-title",
                                children: n.title || j("courseStructureMap.unnamedLecture")
                              }), a.jsx(Be, {
                                nodeRef: s,
                                busyKey: P,
                                busyOp: k,
                                disabled: le,
                                onAction: de,
                                t: j
                              })]
                            }), a.jsxs("div", {
                              className: "csm-kids" + ($e(P, k, s) ? " csm-kids--mutating" : ""),
                              children: [i.map((t, i) => {
                                const s = t.sessionIndex ?? i + 1;
                                const o = {
                                  level: "session",
                                  unitId: e.unitId,
                                  lectureId: n.lectureId,
                                  sessionIndex: s
                                };
                                const r = (e => {
                                  if (!Array.isArray(e) || e.length === 0) {
                                    return [];
                                  }
                                  const n = new Set(e);
                                  return Ae.filter(e => n.has(e));
                                })(t.depthTags);
                                const c = J.has(`ses:${t.sessionId ?? t.sessionIndex}`);
                                return a.jsx("div", {
                                  className: "csm-group csm-child csm-child--leaf",
                                  children: a.jsxs("div", {
                                    className: "csm-node csm-node--session" + (c ? " csm-node--enter" : ""),
                                    children: [a.jsx("div", {
                                      className: "csm-node-title",
                                      children: t.title || j("courseStructureMap.unnamedSession")
                                    }), r.length > 0 && a.jsx("div", {
                                      className: "csm-chips",
                                      children: r.map(e => a.jsx("span", {
                                        className: `csm-chip csm-chip--${e}`,
                                        children: oe(e)
                                      }, e))
                                    }), a.jsx(Be, {
                                      nodeRef: o,
                                      busyKey: P,
                                      busyOp: k,
                                      disabled: le,
                                      onAction: de,
                                      t: j
                                    })]
                                  })
                                }, t.sessionId || `s-${s}`);
                              }), !Y && $e(P, k, s) && a.jsx("div", {
                                className: "csm-child csm-child--leaf",
                                children: a.jsx(Ke, {
                                  variant: "session",
                                  label: j("courseStructureMap.addSession")
                                })
                              }), !Y && !$e(P, k, s) && a.jsx(Re, {
                                parentRef: s,
                                label: j("courseStructureMap.addSession"),
                                busyKey: P,
                                busyOp: k,
                                disabled: le,
                                onAction: de,
                                t: j
                              })]
                            })]
                          }, n.lectureId || `lec-${t}`);
                        }), !Y && $e(P, k, i) && a.jsx("div", {
                          className: "csm-child",
                          children: a.jsx(Ke, {
                            variant: "lecture",
                            label: j("courseStructureMap.addLecture")
                          })
                        }), !Y && !$e(P, k, i) && a.jsx(Re, {
                          parentRef: i,
                          label: j("courseStructureMap.addLecture"),
                          busyKey: P,
                          busyOp: k,
                          disabled: le,
                          onAction: de,
                          t: j
                        })]
                      })]
                    }, e.unitId || `unit-${n}`);
                  }), !Y && a.jsx(Re, {
                    parentRef: {
                      level: "course"
                    },
                    label: j("courseStructureMap.addUnit"),
                    busyKey: P,
                    busyOp: k,
                    disabled: le,
                    onAction: de,
                    t: j
                  })]
                })]
              })
            })
          })]
        })
      })]
    }), (Y || !m) && a.jsx("div", {
      className: "csm-footer",
      children: Y ? a.jsxs("div", {
        className: "csm-confirmed-note",
        children: [a.jsx(d, {
          size: 15
        }), " ", j("courseStructureMap.confirmedNote")]
      }) : a.jsxs(a.Fragment, {
        children: [a.jsx("span", {
          className: "csm-footer-hint",
          children: j("courseStructureMap.footerHint")
        }), a.jsxs("div", {
          className: "csm-footer-actions",
          children: [a.jsx("button", {
            type: "button",
            className: "csm-dissatisfied",
            onClick: () => L(e => !e),
            disabled: B || v,
            "aria-expanded": O,
            children: j("courseStructureMap.dissatisfiedBtn")
          }), a.jsxs("button", {
            type: "button",
            className: "csm-confirm",
            onClick: ve,
            disabled: re || B || v,
            children: [a.jsx(d, {
              size: 14,
              className: "csm-confirm-icon",
              "aria-hidden": "true"
            }), a.jsx("span", {
              className: "csm-confirm-label",
              children: j("courseStructureMap.confirmBtn")
            })]
          })]
        })]
      })
    }), !Y && !m && a.jsx("div", {
      className: "csm-regen-wrap" + (O ? " csm-regen-wrap--open" : ""),
      "aria-hidden": !O,
      children: a.jsx("div", {
        className: "csm-regen-inner",
        children: a.jsx("div", {
          className: "csm-regen-panel",
          children: xe
        })
      })
    })]
  });
  return a.jsxs(a.Fragment, {
    children: [!X && we, X && r.createPortal(a.jsx("div", {
      className: "csm-fullscreen-overlay",
      children: we
    }), document.body), Se && ee && r.createPortal(Se, ee)]
  });
};
export { Fe as C, ke as T, b as U, ze as a };