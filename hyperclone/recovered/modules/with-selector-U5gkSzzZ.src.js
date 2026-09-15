import { c as e } from "./createLucideIcon-B4HcG4gb.js";
import { r, L as t, E as n } from "./index-TjoB2Buo.js";
/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const u = e("highlighter", [["path", {
  d: "m9 11-6 6v3h9l3-3",
  key: "1a3l36"
}], ["path", {
  d: "m22 12-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4",
  key: "14a9rk"
}]]);
var a = {
  exports: {}
};
var o = {};
var i = r;
var s = t;
var l = typeof Object.is == "function" ? Object.is : function (e, r) {
  return e === r && (e !== 0 || 1 / e == 1 / r) || e != e && r != r;
};
var c = s.useSyncExternalStore;
var f = i.useRef;
var v = i.useEffect;
var h = i.useMemo;
var p = i.useDebugValue;
o.useSyncExternalStoreWithSelector = function (e, r, t, n, u) {
  var a = f(null);
  if (a.current === null) {
    var o = {
      hasValue: false,
      value: null
    };
    a.current = o;
  } else {
    o = a.current;
  }
  a = h(function () {
    function e(e) {
      if (!s) {
        s = true;
        a = e;
        e = n(e);
        if (u !== undefined && o.hasValue) {
          var r = o.value;
          if (u(r, e)) {
            return i = r;
          }
        }
        return i = e;
      }
      r = i;
      if (l(a, e)) {
        return r;
      }
      var t = n(e);
      if (u !== undefined && u(r, t)) {
        a = e;
        return r;
      } else {
        a = e;
        return i = t;
      }
    }
    var a;
    var i;
    var s = false;
    var c = t === undefined ? null : t;
    return [function () {
      return e(r());
    }, c === null ? undefined : function () {
      return e(c());
    }];
  }, [r, t, n, u]);
  var i = c(e, a[0], a[1]);
  v(function () {
    o.hasValue = true;
    o.value = i;
  }, [i]);
  p(i);
  return i;
};
a.exports = o;
var d = a.exports;
const m = n(d);
export { u as H, m as u, d as w };