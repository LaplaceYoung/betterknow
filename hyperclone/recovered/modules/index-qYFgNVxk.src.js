import { b8 as e, b9 as t, a_ as n, ba as r, bb as i, bc as o, bd as s, be as l, b0 as a, bf as c, bg as u, bh as f, bi as h, b3 as d, bj as p, bk as m, bl as g, b6 as k, b5 as b, bm as x, bn as v, bo as y } from "./index-TjoB2Buo.js";
function C(e, t) {
  const n = String(e);
  if (typeof t != "string") {
    throw new TypeError("Expected character");
  }
  let r = 0;
  let i = n.indexOf(t);
  while (i !== -1) {
    r++;
    i = n.indexOf(t, i + t.length);
  }
  return r;
}
function w(n, r, i) {
  const o = e((i || {}).ignore || []);
  const s = function (e) {
    const t = [];
    if (!Array.isArray(e)) {
      throw new TypeError("Expected find and replace tuple or list of tuples");
    }
    const n = !e[0] || Array.isArray(e[0]) ? e : [e];
    let r = -1;
    while (++r < n.length) {
      const e = n[r];
      t.push([F(e[0]), D(e[1])]);
    }
    return t;
  }(r);
  let l = -1;
  while (++l < s.length) {
    t(n, "text", a);
  }
  function a(e, t) {
    let n;
    let r = -1;
    while (++r < t.length) {
      const e = t[r];
      const i = n ? n.children : undefined;
      if (o(e, i ? i.indexOf(e) : undefined, n)) {
        return;
      }
      n = e;
    }
    if (n) {
      return function (e, t) {
        const n = t[t.length - 1];
        const r = s[l][0];
        const i = s[l][1];
        let o = 0;
        const a = n.children.indexOf(e);
        let c = false;
        let u = [];
        r.lastIndex = 0;
        let f = r.exec(e.value);
        while (f) {
          const n = f.index;
          const s = {
            index: f.index,
            input: f.input,
            stack: [...t, e]
          };
          let l = i(...f, s);
          if (typeof l == "string") {
            l = l.length > 0 ? {
              type: "text",
              value: l
            } : undefined;
          }
          if (l === false) {
            r.lastIndex = n + 1;
          } else {
            if (o !== n) {
              u.push({
                type: "text",
                value: e.value.slice(o, n)
              });
            }
            if (Array.isArray(l)) {
              u.push(...l);
            } else if (l) {
              u.push(l);
            }
            o = n + f[0].length;
            c = true;
          }
          if (!r.global) {
            break;
          }
          f = r.exec(e.value);
        }
        if (c) {
          if (o < e.value.length) {
            u.push({
              type: "text",
              value: e.value.slice(o)
            });
          }
          n.children.splice(a, 1, ...u);
        } else {
          u = [e];
        }
        return a + u.length;
      }(e, t);
    }
  }
}
function F(e) {
  if (typeof e == "string") {
    return new RegExp(function (e) {
      if (typeof e != "string") {
        throw new TypeError("Expected a string");
      }
      return e.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
    }(e), "g");
  } else {
    return e;
  }
}
function D(e) {
  if (typeof e == "function") {
    return e;
  } else {
    return function () {
      return e;
    };
  }
}
const A = "phrasing";
const L = ["autolink", "link", "image", "label"];
function S(e) {
  this.enter({
    type: "link",
    title: null,
    url: "",
    children: []
  }, e);
}
function M(e) {
  this.config.enter.autolinkProtocol.call(this, e);
}
function E(e) {
  this.config.exit.autolinkProtocol.call(this, e);
}
function O(e) {
  this.config.exit.data.call(this, e);
  const t = this.stack[this.stack.length - 1];
  n(t.type === "link");
  t.url = "http://" + this.sliceSerialize(e);
}
function T(e) {
  this.config.exit.autolinkEmail.call(this, e);
}
function z(e) {
  this.exit(e);
}
function I(e) {
  w(e, [[/(https?:\/\/|www(?=\.))([-.\w]+)([^ \t\r\n]*)/gi, R], [new RegExp("(?<=^|\\s|\\p{P}|\\p{S})([-.\\w+]+)@([-\\w]+(?:\\.[-\\w]+)+)", "gu"), j]], {
    ignore: ["link", "linkReference"]
  });
}
function R(e, t, n, r, i) {
  let o = "";
  if (!P(i)) {
    return false;
  }
  if (/^w/i.test(t)) {
    n = t + n;
    t = "";
    o = "http://";
  }
  if (!function (e) {
    const t = e.split(".");
    if (t.length < 2 || t[t.length - 1] && (/_/.test(t[t.length - 1]) || !/[a-zA-Z\d]/.test(t[t.length - 1])) || t[t.length - 2] && (/_/.test(t[t.length - 2]) || !/[a-zA-Z\d]/.test(t[t.length - 2]))) {
      return false;
    }
    return true;
  }(n)) {
    return false;
  }
  const s = function (e) {
    const t = /[!"&'),.:;<>?\]}]+$/.exec(e);
    if (!t) {
      return [e, undefined];
    }
    e = e.slice(0, t.index);
    let n = t[0];
    let r = n.indexOf(")");
    const i = C(e, "(");
    let o = C(e, ")");
    while (r !== -1 && i > o) {
      e += n.slice(0, r + 1);
      n = n.slice(r + 1);
      r = n.indexOf(")");
      o++;
    }
    return [e, n];
  }(n + r);
  if (!s[0]) {
    return false;
  }
  const l = {
    type: "link",
    title: null,
    url: o + t + s[0],
    children: [{
      type: "text",
      value: t + s[0]
    }]
  };
  if (s[1]) {
    return [l, {
      type: "text",
      value: s[1]
    }];
  } else {
    return l;
  }
}
function j(e, t, n, r) {
  return !!P(r, true) && !/[-\d_]$/.test(n) && {
    type: "link",
    title: null,
    url: "mailto:" + t + "@" + n,
    children: [{
      type: "text",
      value: t + "@" + n
    }]
  };
}
function P(e, t) {
  const n = e.input.charCodeAt(e.index - 1);
  return (e.index === 0 || r(n) || i(n)) && (!t || n !== 47);
}
function _() {
  this.buffer();
}
function $(e) {
  this.enter({
    type: "footnoteReference",
    identifier: "",
    label: ""
  }, e);
}
function B() {
  this.buffer();
}
function H(e) {
  this.enter({
    type: "footnoteDefinition",
    identifier: "",
    label: "",
    children: []
  }, e);
}
function q(e) {
  const t = this.resume();
  const r = this.stack[this.stack.length - 1];
  n(r.type === "footnoteReference");
  r.identifier = o(this.sliceSerialize(e)).toLowerCase();
  r.label = t;
}
function W(e) {
  this.exit(e);
}
function U(e) {
  const t = this.resume();
  const r = this.stack[this.stack.length - 1];
  n(r.type === "footnoteDefinition");
  r.identifier = o(this.sliceSerialize(e)).toLowerCase();
  r.label = t;
}
function V(e) {
  this.exit(e);
}
function Q(e, t, n, r) {
  const i = n.createTracker(r);
  let o = i.move("[^");
  const s = n.enter("footnoteReference");
  const l = n.enter("reference");
  o += i.move(n.safe(n.associationId(e), {
    after: "]",
    before: o
  }));
  l();
  s();
  o += i.move("]");
  return o;
}
function Z(e) {
  let t = false;
  if (e && e.firstLineBlank) {
    t = true;
  }
  return {
    handlers: {
      footnoteDefinition: function (e, n, r, i) {
        const o = r.createTracker(i);
        let s = o.move("[^");
        const l = r.enter("footnoteDefinition");
        const a = r.enter("label");
        s += o.move(r.safe(r.associationId(e), {
          before: s,
          after: "]"
        }));
        a();
        s += o.move("]:");
        if (e.children && e.children.length > 0) {
          o.shift(4);
          s += o.move((t ? "\n" : " ") + r.indentLines(r.containerFlow(e, o.current()), t ? J : G));
        }
        l();
        return s;
      },
      footnoteReference: Q
    },
    unsafe: [{
      character: "[",
      inConstruct: ["label", "phrasing", "reference"]
    }]
  };
}
function G(e, t, n) {
  if (t === 0) {
    return e;
  } else {
    return J(e, t, n);
  }
}
function J(e, t, n) {
  return (n ? "" : "    ") + e;
}
Q.peek = function () {
  return "[";
};
const K = ["autolink", "destinationLiteral", "destinationRaw", "reference", "titleQuote", "titleApostrophe"];
function N(e) {
  this.enter({
    type: "delete",
    children: []
  }, e);
}
function X(e) {
  this.exit(e);
}
function Y(e, t, n, r) {
  const i = n.createTracker(r);
  const o = n.enter("strikethrough");
  let s = i.move("~~");
  s += n.containerPhrasing(e, {
    ...i.current(),
    before: s,
    after: "~"
  });
  s += i.move("~~");
  o();
  return s;
}
function ee(e) {
  return e.length;
}
function te(e) {
  if (e == null) {
    return "";
  } else {
    return String(e);
  }
}
function ne(e) {
  const t = typeof e == "string" ? e.codePointAt(0) : 0;
  if (t === 67 || t === 99) {
    return 99;
  } else if (t === 76 || t === 108) {
    return 108;
  } else if (t === 82 || t === 114) {
    return 114;
  } else {
    return 0;
  }
}
function re(e, t, n) {
  return ">" + (n ? "" : " ") + e;
}
function ie(e, t) {
  return oe(e, t.inConstruct, true) && !oe(e, t.notInConstruct, false);
}
function oe(e, t, n) {
  if (typeof t == "string") {
    t = [t];
  }
  if (!t || t.length === 0) {
    return n;
  }
  let r = -1;
  while (++r < t.length) {
    if (e.includes(t[r])) {
      return true;
    }
  }
  return false;
}
function se(e, t, n, r) {
  let i = -1;
  while (++i < n.unsafe.length) {
    if (n.unsafe[i].character === "\n" && ie(n.stack, n.unsafe[i])) {
      if (/[ \t]/.test(r.before)) {
        return "";
      } else {
        return " ";
      }
    }
  }
  return "\\\n";
}
function le(e, t, n) {
  return (n ? "" : "    ") + e;
}
function ae(e) {
  const t = e.options.quote || "\"";
  if (t !== "\"" && t !== "'") {
    throw new Error("Cannot serialize title with `" + t + "` for `options.quote`, expected `\"`, or `'`");
  }
  return t;
}
function ce(e) {
  return "&#x" + e.toString(16).toUpperCase() + ";";
}
function ue(e, t, n) {
  const r = l(e);
  const i = l(t);
  if (r === undefined) {
    if (i === undefined) {
      if (n === "_") {
        return {
          inside: true,
          outside: true
        };
      } else {
        return {
          inside: false,
          outside: false
        };
      }
    } else if (i === 1) {
      return {
        inside: true,
        outside: true
      };
    } else {
      return {
        inside: false,
        outside: true
      };
    }
  } else if (r === 1) {
    if (i === undefined) {
      return {
        inside: false,
        outside: false
      };
    } else if (i === 1) {
      return {
        inside: true,
        outside: true
      };
    } else {
      return {
        inside: false,
        outside: false
      };
    }
  } else if (i === undefined) {
    return {
      inside: false,
      outside: false
    };
  } else if (i === 1) {
    return {
      inside: true,
      outside: false
    };
  } else {
    return {
      inside: false,
      outside: false
    };
  }
}
function fe(e, t, n, r) {
  const i = function (e) {
    const t = e.options.emphasis || "*";
    if (t !== "*" && t !== "_") {
      throw new Error("Cannot serialize emphasis with `" + t + "` for `options.emphasis`, expected `*`, or `_`");
    }
    return t;
  }(n);
  const o = n.enter("emphasis");
  const s = n.createTracker(r);
  const l = s.move(i);
  let a = s.move(n.containerPhrasing(e, {
    after: i,
    before: l,
    ...s.current()
  }));
  const c = a.charCodeAt(0);
  const u = ue(r.before.charCodeAt(r.before.length - 1), c, i);
  if (u.inside) {
    a = ce(c) + a.slice(1);
  }
  const f = a.charCodeAt(a.length - 1);
  const h = ue(r.after.charCodeAt(0), f, i);
  if (h.inside) {
    a = a.slice(0, -1) + ce(f);
  }
  const d = s.move(i);
  o();
  n.attentionEncodeSurroundingInfo = {
    after: h.outside,
    before: u.outside
  };
  return l + a + d;
}
function he(e) {
  return e.value || "";
}
function de(e, t, n, r) {
  const i = ae(n);
  const o = i === "\"" ? "Quote" : "Apostrophe";
  const s = n.enter("image");
  let l = n.enter("label");
  const a = n.createTracker(r);
  let c = a.move("![");
  c += a.move(n.safe(e.alt, {
    before: c,
    after: "]",
    ...a.current()
  }));
  c += a.move("](");
  l();
  if (!e.url && e.title || /[\0- \u007F]/.test(e.url)) {
    l = n.enter("destinationLiteral");
    c += a.move("<");
    c += a.move(n.safe(e.url, {
      before: c,
      after: ">",
      ...a.current()
    }));
    c += a.move(">");
  } else {
    l = n.enter("destinationRaw");
    c += a.move(n.safe(e.url, {
      before: c,
      after: e.title ? " " : ")",
      ...a.current()
    }));
  }
  l();
  if (e.title) {
    l = n.enter(`title${o}`);
    c += a.move(" " + i);
    c += a.move(n.safe(e.title, {
      before: c,
      after: i,
      ...a.current()
    }));
    c += a.move(i);
    l();
  }
  c += a.move(")");
  s();
  return c;
}
function pe(e, t, n, r) {
  const i = e.referenceType;
  const o = n.enter("imageReference");
  let s = n.enter("label");
  const l = n.createTracker(r);
  let a = l.move("![");
  const c = n.safe(e.alt, {
    before: a,
    after: "]",
    ...l.current()
  });
  a += l.move(c + "][");
  s();
  const u = n.stack;
  n.stack = [];
  s = n.enter("reference");
  const f = n.safe(n.associationId(e), {
    before: a,
    after: "]",
    ...l.current()
  });
  s();
  n.stack = u;
  o();
  if (i !== "full" && c && c === f) {
    if (i === "shortcut") {
      a = a.slice(0, -1);
    } else {
      a += l.move("]");
    }
  } else {
    a += l.move(f + "]");
  }
  return a;
}
function me(e, t, n) {
  let r = e.value || "";
  let i = "`";
  let o = -1;
  while (new RegExp("(^|[^`])" + i + "([^`]|$)").test(r)) {
    i += "`";
  }
  for (/[^ \r\n]/.test(r) && (/^[ \r\n]/.test(r) && /[ \r\n]$/.test(r) || /^`|`$/.test(r)) && (r = " " + r + " "); ++o < n.unsafe.length;) {
    const e = n.unsafe[o];
    const t = n.compilePattern(e);
    let i;
    if (e.atBreak) {
      while (i = t.exec(r)) {
        let e = i.index;
        if (r.charCodeAt(e) === 10 && r.charCodeAt(e - 1) === 13) {
          e--;
        }
        r = r.slice(0, e) + " " + r.slice(i.index + 1);
      }
    }
  }
  return i + r + i;
}
function ge(e, t) {
  const n = c(e);
  return Boolean(!t.options.resourceLink && e.url && !e.title && e.children && e.children.length === 1 && e.children[0].type === "text" && (n === e.url || "mailto:" + n === e.url) && /^[a-z][a-z+.-]+:/i.test(e.url) && !/[\0- <>\u007F]/.test(e.url));
}
function ke(e, t, n, r) {
  const i = ae(n);
  const o = i === "\"" ? "Quote" : "Apostrophe";
  const s = n.createTracker(r);
  let l;
  let a;
  if (ge(e, n)) {
    const t = n.stack;
    n.stack = [];
    l = n.enter("autolink");
    let r = s.move("<");
    r += s.move(n.containerPhrasing(e, {
      before: r,
      after: ">",
      ...s.current()
    }));
    r += s.move(">");
    l();
    n.stack = t;
    return r;
  }
  l = n.enter("link");
  a = n.enter("label");
  let c = s.move("[");
  c += s.move(n.containerPhrasing(e, {
    before: c,
    after: "](",
    ...s.current()
  }));
  c += s.move("](");
  a();
  if (!e.url && e.title || /[\0- \u007F]/.test(e.url)) {
    a = n.enter("destinationLiteral");
    c += s.move("<");
    c += s.move(n.safe(e.url, {
      before: c,
      after: ">",
      ...s.current()
    }));
    c += s.move(">");
  } else {
    a = n.enter("destinationRaw");
    c += s.move(n.safe(e.url, {
      before: c,
      after: e.title ? " " : ")",
      ...s.current()
    }));
  }
  a();
  if (e.title) {
    a = n.enter(`title${o}`);
    c += s.move(" " + i);
    c += s.move(n.safe(e.title, {
      before: c,
      after: i,
      ...s.current()
    }));
    c += s.move(i);
    a();
  }
  c += s.move(")");
  l();
  return c;
}
function be(e, t, n, r) {
  const i = e.referenceType;
  const o = n.enter("linkReference");
  let s = n.enter("label");
  const l = n.createTracker(r);
  let a = l.move("[");
  const c = n.containerPhrasing(e, {
    before: a,
    after: "]",
    ...l.current()
  });
  a += l.move(c + "][");
  s();
  const u = n.stack;
  n.stack = [];
  s = n.enter("reference");
  const f = n.safe(n.associationId(e), {
    before: a,
    after: "]",
    ...l.current()
  });
  s();
  n.stack = u;
  o();
  if (i !== "full" && c && c === f) {
    if (i === "shortcut") {
      a = a.slice(0, -1);
    } else {
      a += l.move("]");
    }
  } else {
    a += l.move(f + "]");
  }
  return a;
}
function xe(e) {
  const t = e.options.bullet || "*";
  if (t !== "*" && t !== "+" && t !== "-") {
    throw new Error("Cannot serialize items with `" + t + "` for `options.bullet`, expected `*`, `+`, or `-`");
  }
  return t;
}
function ve(e) {
  const t = e.options.rule || "*";
  if (t !== "*" && t !== "-" && t !== "_") {
    throw new Error("Cannot serialize rules with `" + t + "` for `options.rule`, expected `*`, `-`, or `_`");
  }
  return t;
}
Y.peek = function () {
  return "~";
};
fe.peek = function (e, t, n) {
  return n.options.emphasis || "*";
};
he.peek = function () {
  return "<";
};
de.peek = function () {
  return "!";
};
pe.peek = function () {
  return "!";
};
me.peek = function () {
  return "`";
};
ke.peek = function (e, t, n) {
  if (ge(e, n)) {
    return "<";
  } else {
    return "[";
  }
};
be.peek = function () {
  return "[";
};
const ye = e(["break", "delete", "emphasis", "footnote", "footnoteReference", "image", "imageReference", "inlineCode", "inlineMath", "link", "linkReference", "mdxJsxTextElement", "mdxTextExpression", "strong", "text", "textDirective"]);
function Ce(e, t, n, r) {
  const i = function (e) {
    const t = e.options.strong || "*";
    if (t !== "*" && t !== "_") {
      throw new Error("Cannot serialize strong with `" + t + "` for `options.strong`, expected `*`, or `_`");
    }
    return t;
  }(n);
  const o = n.enter("strong");
  const s = n.createTracker(r);
  const l = s.move(i + i);
  let a = s.move(n.containerPhrasing(e, {
    after: i,
    before: l,
    ...s.current()
  }));
  const c = a.charCodeAt(0);
  const u = ue(r.before.charCodeAt(r.before.length - 1), c, i);
  if (u.inside) {
    a = ce(c) + a.slice(1);
  }
  const f = a.charCodeAt(a.length - 1);
  const h = ue(r.after.charCodeAt(0), f, i);
  if (h.inside) {
    a = a.slice(0, -1) + ce(f);
  }
  const d = s.move(i + i);
  o();
  n.attentionEncodeSurroundingInfo = {
    after: h.outside,
    before: u.outside
  };
  return l + a + d;
}
Ce.peek = function (e, t, n) {
  return n.options.strong || "*";
};
const we = {
  blockquote: function (e, t, n, r) {
    const i = n.enter("blockquote");
    const o = n.createTracker(r);
    o.move("> ");
    o.shift(2);
    const s = n.indentLines(n.containerFlow(e, o.current()), re);
    i();
    return s;
  },
  break: se,
  code: function (e, t, n, r) {
    const i = function (e) {
      const t = e.options.fence || "`";
      if (t !== "`" && t !== "~") {
        throw new Error("Cannot serialize code with `" + t + "` for `options.fence`, expected `` ` `` or `~`");
      }
      return t;
    }(n);
    const o = e.value || "";
    const l = i === "`" ? "GraveAccent" : "Tilde";
    if (function (e, t) {
      return Boolean(t.options.fences === false && e.value && !e.lang && /[^ \r\n]/.test(e.value) && !/^[\t ]*(?:[\r\n]|$)|(?:^|[\r\n])[\t ]*$/.test(e.value));
    }(e, n)) {
      const e = n.enter("codeIndented");
      const t = n.indentLines(o, le);
      e();
      return t;
    }
    const a = n.createTracker(r);
    const c = i.repeat(Math.max(s(o, i) + 1, 3));
    const u = n.enter("codeFenced");
    let f = a.move(c);
    if (e.lang) {
      const t = n.enter(`codeFencedLang${l}`);
      f += a.move(n.safe(e.lang, {
        before: f,
        after: " ",
        encode: ["`"],
        ...a.current()
      }));
      t();
    }
    if (e.lang && e.meta) {
      const t = n.enter(`codeFencedMeta${l}`);
      f += a.move(" ");
      f += a.move(n.safe(e.meta, {
        before: f,
        after: "\n",
        encode: ["`"],
        ...a.current()
      }));
      t();
    }
    f += a.move("\n");
    if (o) {
      f += a.move(o + "\n");
    }
    f += a.move(c);
    u();
    return f;
  },
  definition: function (e, t, n, r) {
    const i = ae(n);
    const o = i === "\"" ? "Quote" : "Apostrophe";
    const s = n.enter("definition");
    let l = n.enter("label");
    const a = n.createTracker(r);
    let c = a.move("[");
    c += a.move(n.safe(n.associationId(e), {
      before: c,
      after: "]",
      ...a.current()
    }));
    c += a.move("]: ");
    l();
    if (!e.url || /[\0- \u007F]/.test(e.url)) {
      l = n.enter("destinationLiteral");
      c += a.move("<");
      c += a.move(n.safe(e.url, {
        before: c,
        after: ">",
        ...a.current()
      }));
      c += a.move(">");
    } else {
      l = n.enter("destinationRaw");
      c += a.move(n.safe(e.url, {
        before: c,
        after: e.title ? " " : "\n",
        ...a.current()
      }));
    }
    l();
    if (e.title) {
      l = n.enter(`title${o}`);
      c += a.move(" " + i);
      c += a.move(n.safe(e.title, {
        before: c,
        after: i,
        ...a.current()
      }));
      c += a.move(i);
      l();
    }
    s();
    return c;
  },
  emphasis: fe,
  hardBreak: se,
  heading: function (e, t, n, r) {
    const i = Math.max(Math.min(6, e.depth || 1), 1);
    const o = n.createTracker(r);
    if (function (e, t) {
      let n = false;
      a(e, function (e) {
        if ("value" in e && /\r?\n|\r/.test(e.value) || e.type === "break") {
          n = true;
          return u;
        }
      });
      return Boolean((!e.depth || e.depth < 3) && c(e) && (t.options.setext || n));
    }(e, n)) {
      const t = n.enter("headingSetext");
      const r = n.enter("phrasing");
      const s = n.containerPhrasing(e, {
        ...o.current(),
        before: "\n",
        after: "\n"
      });
      r();
      t();
      return s + "\n" + (i === 1 ? "=" : "-").repeat(s.length - (Math.max(s.lastIndexOf("\r"), s.lastIndexOf("\n")) + 1));
    }
    const s = "#".repeat(i);
    const l = n.enter("headingAtx");
    const f = n.enter("phrasing");
    o.move(s + " ");
    let h = n.containerPhrasing(e, {
      before: "# ",
      after: "\n",
      ...o.current()
    });
    if (/^[\t ]/.test(h)) {
      h = ce(h.charCodeAt(0)) + h.slice(1);
    }
    h = h ? s + " " + h : s;
    if (n.options.closeAtx) {
      h += " " + s;
    }
    f();
    l();
    return h;
  },
  html: he,
  image: de,
  imageReference: pe,
  inlineCode: me,
  link: ke,
  linkReference: be,
  list: function (e, t, n, r) {
    const i = n.enter("list");
    const o = n.bulletCurrent;
    let s = e.ordered ? function (e) {
      const t = e.options.bulletOrdered || ".";
      if (t !== "." && t !== ")") {
        throw new Error("Cannot serialize items with `" + t + "` for `options.bulletOrdered`, expected `.` or `)`");
      }
      return t;
    }(n) : xe(n);
    const l = e.ordered ? s === "." ? ")" : "." : function (e) {
      const t = xe(e);
      const n = e.options.bulletOther;
      if (!n) {
        if (t === "*") {
          return "-";
        } else {
          return "*";
        }
      }
      if (n !== "*" && n !== "+" && n !== "-") {
        throw new Error("Cannot serialize items with `" + n + "` for `options.bulletOther`, expected `*`, `+`, or `-`");
      }
      if (n === t) {
        throw new Error("Expected `bullet` (`" + t + "`) and `bulletOther` (`" + n + "`) to be different");
      }
      return n;
    }(n);
    let a = !!t && !!n.bulletLastUsed && s === n.bulletLastUsed;
    if (!e.ordered) {
      const t = e.children ? e.children[0] : undefined;
      if ((s === "*" || s === "-") && !!t && (!t.children || !t.children[0]) && n.stack[n.stack.length - 1] === "list" && n.stack[n.stack.length - 2] === "listItem" && n.stack[n.stack.length - 3] === "list" && n.stack[n.stack.length - 4] === "listItem" && n.indexStack[n.indexStack.length - 1] === 0 && n.indexStack[n.indexStack.length - 2] === 0 && n.indexStack[n.indexStack.length - 3] === 0) {
        a = true;
      }
      if (ve(n) === s && t) {
        let t = -1;
        while (++t < e.children.length) {
          const n = e.children[t];
          if (n && n.type === "listItem" && n.children && n.children[0] && n.children[0].type === "thematicBreak") {
            a = true;
            break;
          }
        }
      }
    }
    if (a) {
      s = l;
    }
    n.bulletCurrent = s;
    const c = n.containerFlow(e, r);
    n.bulletLastUsed = s;
    n.bulletCurrent = o;
    i();
    return c;
  },
  listItem: function (e, t, n, r) {
    const i = function (e) {
      const t = e.options.listItemIndent || "one";
      if (t !== "tab" && t !== "one" && t !== "mixed") {
        throw new Error("Cannot serialize items with `" + t + "` for `options.listItemIndent`, expected `tab`, `one`, or `mixed`");
      }
      return t;
    }(n);
    let o = n.bulletCurrent || xe(n);
    if (t && t.type === "list" && t.ordered) {
      o = (typeof t.start == "number" && t.start > -1 ? t.start : 1) + (n.options.incrementListMarker === false ? 0 : t.children.indexOf(e)) + o;
    }
    let s = o.length + 1;
    if (i === "tab" || i === "mixed" && (t && t.type === "list" && t.spread || e.spread)) {
      s = Math.ceil(s / 4) * 4;
    }
    const l = n.createTracker(r);
    l.move(o + " ".repeat(s - o.length));
    l.shift(s);
    const a = n.enter("listItem");
    const c = n.indentLines(n.containerFlow(e, l.current()), function (e, t, n) {
      if (t) {
        return (n ? "" : " ".repeat(s)) + e;
      }
      return (n ? o : o + " ".repeat(s - o.length)) + e;
    });
    a();
    return c;
  },
  paragraph: function (e, t, n, r) {
    const i = n.enter("paragraph");
    const o = n.enter("phrasing");
    const s = n.containerPhrasing(e, r);
    o();
    i();
    return s;
  },
  root: function (e, t, n, r) {
    return (e.children.some(function (e) {
      return ye(e);
    }) ? n.containerPhrasing : n.containerFlow).call(n, e, r);
  },
  strong: Ce,
  text: function (e, t, n, r) {
    return n.safe(e.value, r);
  },
  thematicBreak: function (e, t, n) {
    const r = (ve(n) + (n.options.ruleSpaces ? " " : "")).repeat(function (e) {
      const t = e.options.ruleRepetition || 3;
      if (t < 3) {
        throw new Error("Cannot serialize rules with repetition `" + t + "` for `options.ruleRepetition`, expected `3` or more");
      }
      return t;
    }(n));
    if (n.options.ruleSpaces) {
      return r.slice(0, -1);
    } else {
      return r;
    }
  }
};
function Fe(e) {
  const t = e._align;
  this.enter({
    type: "table",
    align: t.map(function (e) {
      if (e === "none") {
        return null;
      } else {
        return e;
      }
    }),
    children: []
  }, e);
  this.data.inTable = true;
}
function De(e) {
  this.exit(e);
  this.data.inTable = undefined;
}
function Ae(e) {
  this.enter({
    type: "tableRow",
    children: []
  }, e);
}
function Le(e) {
  this.exit(e);
}
function Se(e) {
  this.enter({
    type: "tableCell",
    children: []
  }, e);
}
function Me(e) {
  let t = this.resume();
  if (this.data.inTable) {
    t = t.replace(/\\([\\|])/g, Ee);
  }
  const r = this.stack[this.stack.length - 1];
  n(r.type === "inlineCode");
  r.value = t;
  this.exit(e);
}
function Ee(e, t) {
  if (t === "|") {
    return t;
  } else {
    return e;
  }
}
function Oe(e) {
  const t = e || {};
  const n = t.tableCellPadding;
  const r = t.tablePipeAlign;
  const i = t.stringLength;
  const o = n ? " " : "|";
  return {
    unsafe: [{
      character: "\r",
      inConstruct: "tableCell"
    }, {
      character: "\n",
      inConstruct: "tableCell"
    }, {
      atBreak: true,
      character: "|",
      after: "[\t :-]"
    }, {
      character: "|",
      inConstruct: "tableCell"
    }, {
      atBreak: true,
      character: ":",
      after: "-"
    }, {
      atBreak: true,
      character: "-",
      after: "[:|-]"
    }],
    handlers: {
      inlineCode: function (e, t, n) {
        let r = we.inlineCode(e, t, n);
        if (n.stack.includes("tableCell")) {
          r = r.replace(/\|/g, "\\$&");
        }
        return r;
      },
      table: function (e, t, n, r) {
        return l(function (e, t, n) {
          const r = e.children;
          let i = -1;
          const o = [];
          const s = t.enter("table");
          while (++i < r.length) {
            o[i] = a(r[i], t, n);
          }
          s();
          return o;
        }(e, n, r), e.align);
      },
      tableCell: s,
      tableRow: function (e, t, n, r) {
        const i = l([a(e, n, r)]);
        return i.slice(0, i.indexOf("\n"));
      }
    }
  };
  function s(e, t, n, r) {
    const i = n.enter("tableCell");
    const s = n.enter("phrasing");
    const l = n.containerPhrasing(e, {
      ...r,
      before: o,
      after: o
    });
    s();
    i();
    return l;
  }
  function l(e, t) {
    return function (e, t) {
      const n = t || {};
      const r = (n.align || []).concat();
      const i = n.stringLength || ee;
      const o = [];
      const s = [];
      const l = [];
      const a = [];
      let c = 0;
      let u = -1;
      while (++u < e.length) {
        const t = [];
        const r = [];
        let o = -1;
        for (e[u].length > c && (c = e[u].length); ++o < e[u].length;) {
          const s = te(e[u][o]);
          if (n.alignDelimiters !== false) {
            const e = i(s);
            r[o] = e;
            if (a[o] === undefined || e > a[o]) {
              a[o] = e;
            }
          }
          t.push(s);
        }
        s[u] = t;
        l[u] = r;
      }
      let f = -1;
      if (typeof r == "object" && "length" in r) {
        while (++f < c) {
          o[f] = ne(r[f]);
        }
      } else {
        const e = ne(r);
        while (++f < c) {
          o[f] = e;
        }
      }
      f = -1;
      const h = [];
      const d = [];
      while (++f < c) {
        const e = o[f];
        let t = "";
        let r = "";
        if (e === 99) {
          t = ":";
          r = ":";
        } else if (e === 108) {
          t = ":";
        } else if (e === 114) {
          r = ":";
        }
        let i = n.alignDelimiters === false ? 1 : Math.max(1, a[f] - t.length - r.length);
        const s = t + "-".repeat(i) + r;
        if (n.alignDelimiters !== false) {
          i = t.length + i + r.length;
          if (i > a[f]) {
            a[f] = i;
          }
          d[f] = i;
        }
        h[f] = s;
      }
      s.splice(1, 0, h);
      l.splice(1, 0, d);
      u = -1;
      const p = [];
      while (++u < s.length) {
        const e = s[u];
        const t = l[u];
        f = -1;
        const r = [];
        while (++f < c) {
          const i = e[f] || "";
          let s = "";
          let l = "";
          if (n.alignDelimiters !== false) {
            const e = a[f] - (t[f] || 0);
            const n = o[f];
            if (n === 114) {
              s = " ".repeat(e);
            } else if (n === 99) {
              if (e % 2) {
                s = " ".repeat(e / 2 + 0.5);
                l = " ".repeat(e / 2 - 0.5);
              } else {
                s = " ".repeat(e / 2);
                l = s;
              }
            } else {
              l = " ".repeat(e);
            }
          }
          if (n.delimiterStart !== false && !f) {
            r.push("|");
          }
          if (n.padding !== false && (n.alignDelimiters !== false || i !== "") && (n.delimiterStart !== false || !!f)) {
            r.push(" ");
          }
          if (n.alignDelimiters !== false) {
            r.push(s);
          }
          r.push(i);
          if (n.alignDelimiters !== false) {
            r.push(l);
          }
          if (n.padding !== false) {
            r.push(" ");
          }
          if (n.delimiterEnd !== false || f !== c - 1) {
            r.push("|");
          }
        }
        p.push(n.delimiterEnd === false ? r.join("").replace(/ +$/, "") : r.join(""));
      }
      return p.join("\n");
    }(e, {
      align: t,
      alignDelimiters: r,
      padding: n,
      stringLength: i
    });
  }
  function a(e, t, n) {
    const r = e.children;
    let i = -1;
    const o = [];
    const l = t.enter("tableRow");
    while (++i < r.length) {
      o[i] = s(r[i], 0, t, n);
    }
    l();
    return o;
  }
}
function Te(e) {
  const t = this.stack[this.stack.length - 2];
  n(t.type === "listItem");
  t.checked = e.type === "taskListCheckValueChecked";
}
function ze(e) {
  const t = this.stack[this.stack.length - 2];
  if (t && t.type === "listItem" && typeof t.checked == "boolean") {
    const e = this.stack[this.stack.length - 1];
    n(e.type === "paragraph");
    const r = e.children[0];
    if (r && r.type === "text") {
      const n = t.children;
      let i;
      let o = -1;
      while (++o < n.length) {
        const e = n[o];
        if (e.type === "paragraph") {
          i = e;
          break;
        }
      }
      if (i === e) {
        r.value = r.value.slice(1);
        if (r.value.length === 0) {
          e.children.shift();
        } else if (e.position && r.position && typeof r.position.start.offset == "number") {
          r.position.start.column++;
          r.position.start.offset++;
          e.position.start = Object.assign({}, r.position.start);
        }
      }
    }
  }
  this.exit(e);
}
function Ie(e, t, n, r) {
  const i = e.children[0];
  const o = typeof e.checked == "boolean" && i && i.type === "paragraph";
  const s = "[" + (e.checked ? "x" : " ") + "] ";
  const l = n.createTracker(r);
  if (o) {
    l.move(s);
  }
  let a = we.listItem(e, t, n, {
    ...r,
    ...l.current()
  });
  if (o) {
    a = a.replace(/^(?:[*+-]|\d+\.)([\r\n]| {1,3})/, function (e) {
      return e + s;
    });
  }
  return a;
}
const Re = {
  tokenize: function (e, t, n) {
    let r = 0;
    return function t(o) {
      if ((o === 87 || o === 119) && r < 3) {
        r++;
        e.consume(o);
        return t;
      }
      if (o === 46 && r === 3) {
        e.consume(o);
        return i;
      }
      return n(o);
    };
    function i(e) {
      if (e === null) {
        return n(e);
      } else {
        return t(e);
      }
    }
  },
  partial: true
};
const je = {
  tokenize: function (e, t, n) {
    let o;
    let s;
    let l;
    return a;
    function a(t) {
      if (t === 46 || t === 95) {
        return e.check(_e, u, c)(t);
      } else if (t === null || d(t) || r(t) || t !== 45 && i(t)) {
        return u(t);
      } else {
        l = true;
        e.consume(t);
        return a;
      }
    }
    function c(t) {
      if (t === 95) {
        o = true;
      } else {
        s = o;
        o = undefined;
      }
      e.consume(t);
      return a;
    }
    function u(e) {
      if (s || o || !l) {
        return n(e);
      } else {
        return t(e);
      }
    }
  },
  partial: true
};
const Pe = {
  tokenize: function (e, t) {
    let n = 0;
    let i = 0;
    return o;
    function o(l) {
      if (l === 40) {
        n++;
        e.consume(l);
        return o;
      } else if (l === 41 && i < n) {
        return s(l);
      } else if (l === 33 || l === 34 || l === 38 || l === 39 || l === 41 || l === 42 || l === 44 || l === 46 || l === 58 || l === 59 || l === 60 || l === 63 || l === 93 || l === 95 || l === 126) {
        return e.check(_e, t, s)(l);
      } else if (l === null || d(l) || r(l)) {
        return t(l);
      } else {
        e.consume(l);
        return o;
      }
    }
    function s(t) {
      if (t === 41) {
        i++;
      }
      e.consume(t);
      return o;
    }
  },
  partial: true
};
const _e = {
  tokenize: function (e, t, n) {
    return i;
    function i(l) {
      if (l === 33 || l === 34 || l === 39 || l === 41 || l === 42 || l === 44 || l === 46 || l === 58 || l === 59 || l === 63 || l === 95 || l === 126) {
        e.consume(l);
        return i;
      } else if (l === 38) {
        e.consume(l);
        return s;
      } else if (l === 93) {
        e.consume(l);
        return o;
      } else if (l === 60 || l === null || d(l) || r(l)) {
        return t(l);
      } else {
        return n(l);
      }
    }
    function o(e) {
      if (e === null || e === 40 || e === 91 || d(e) || r(e)) {
        return t(e);
      } else {
        return i(e);
      }
    }
    function s(e) {
      if (h(e)) {
        return l(e);
      } else {
        return n(e);
      }
    }
    function l(t) {
      if (t === 59) {
        e.consume(t);
        return i;
      } else if (h(t)) {
        e.consume(t);
        return l;
      } else {
        return n(t);
      }
    }
  },
  partial: true
};
const $e = {
  tokenize: function (e, t, n) {
    return function (t) {
      e.consume(t);
      return r;
    };
    function r(e) {
      if (f(e)) {
        return n(e);
      } else {
        return t(e);
      }
    }
  },
  partial: true
};
const Be = {
  name: "wwwAutolink",
  tokenize: function (e, t, n) {
    const r = this;
    return function (t) {
      if (t !== 87 && t !== 119 || !Ve.call(r, r.previous) || Je(r.events)) {
        return n(t);
      }
      e.enter("literalAutolink");
      e.enter("literalAutolinkWww");
      return e.check(Re, e.attempt(je, e.attempt(Pe, i), n), n)(t);
    };
    function i(n) {
      e.exit("literalAutolinkWww");
      e.exit("literalAutolink");
      return t(n);
    }
  },
  previous: Ve
};
const He = {
  name: "protocolAutolink",
  tokenize: function (e, t, n) {
    const o = this;
    let s = "";
    let l = false;
    return function (t) {
      if ((t === 72 || t === 104) && Qe.call(o, o.previous) && !Je(o.events)) {
        e.enter("literalAutolink");
        e.enter("literalAutolinkHttp");
        s += String.fromCodePoint(t);
        e.consume(t);
        return a;
      }
      return n(t);
    };
    function a(t) {
      if (h(t) && s.length < 5) {
        s += String.fromCodePoint(t);
        e.consume(t);
        return a;
      }
      if (t === 58) {
        const n = s.toLowerCase();
        if (n === "http" || n === "https") {
          e.consume(t);
          return c;
        }
      }
      return n(t);
    }
    function c(t) {
      if (t === 47) {
        e.consume(t);
        if (l) {
          return u;
        } else {
          l = true;
          return c;
        }
      } else {
        return n(t);
      }
    }
    function u(t) {
      if (t === null || p(t) || d(t) || r(t) || i(t)) {
        return n(t);
      } else {
        return e.attempt(je, e.attempt(Pe, f), n)(t);
      }
    }
    function f(n) {
      e.exit("literalAutolinkHttp");
      e.exit("literalAutolink");
      return t(n);
    }
  },
  previous: Qe
};
const qe = {
  name: "emailAutolink",
  tokenize: function (e, t, n) {
    const r = this;
    let i;
    let o;
    return function (t) {
      if (!Ge(t) || !Ze.call(r, r.previous) || Je(r.events)) {
        return n(t);
      }
      e.enter("literalAutolink");
      e.enter("literalAutolinkEmail");
      return s(t);
    };
    function s(t) {
      if (Ge(t)) {
        e.consume(t);
        return s;
      } else if (t === 64) {
        e.consume(t);
        return l;
      } else {
        return n(t);
      }
    }
    function l(t) {
      if (t === 46) {
        return e.check($e, c, a)(t);
      } else if (t === 45 || t === 95 || f(t)) {
        o = true;
        e.consume(t);
        return l;
      } else {
        return c(t);
      }
    }
    function a(t) {
      e.consume(t);
      i = true;
      return l;
    }
    function c(s) {
      if (o && i && h(r.previous)) {
        e.exit("literalAutolinkEmail");
        e.exit("literalAutolink");
        return t(s);
      } else {
        return n(s);
      }
    }
  },
  previous: Ze
};
const We = {};
let Ue = 48;
while (Ue < 123) {
  We[Ue] = qe;
  Ue++;
  if (Ue === 58) {
    Ue = 65;
  } else if (Ue === 91) {
    Ue = 97;
  }
}
function Ve(e) {
  return e === null || e === 40 || e === 42 || e === 95 || e === 91 || e === 93 || e === 126 || d(e);
}
function Qe(e) {
  return !h(e);
}
function Ze(e) {
  return e !== 47 && !Ge(e);
}
function Ge(e) {
  return e === 43 || e === 45 || e === 46 || e === 95 || f(e);
}
function Je(e) {
  let t = e.length;
  let n = false;
  while (t--) {
    const r = e[t][1];
    if ((r.type === "labelLink" || r.type === "labelImage") && !r._balanced) {
      n = true;
      break;
    }
    if (r._gfmAutolinkLiteralWalkedInto) {
      n = false;
      break;
    }
  }
  if (e.length > 0 && !n) {
    e[e.length - 1][1]._gfmAutolinkLiteralWalkedInto = true;
  }
  return n;
}
We[43] = qe;
We[45] = qe;
We[46] = qe;
We[95] = qe;
We[72] = [qe, He];
We[104] = [qe, He];
We[87] = [qe, Be];
We[119] = [qe, Be];
const Ke = {
  tokenize: function (e, t, n) {
    const r = this;
    return g(e, function (e) {
      const i = r.events[r.events.length - 1];
      if (i && i[1].type === "gfmFootnoteDefinitionIndent" && i[2].sliceSerialize(i[1], true).length === 4) {
        return t(e);
      } else {
        return n(e);
      }
    }, "gfmFootnoteDefinitionIndent", 5);
  },
  partial: true
};
function Ne(e, t, n) {
  const r = this;
  let i = r.events.length;
  const s = r.parser.gfmFootnotes ||= [];
  let l;
  while (i--) {
    const e = r.events[i][1];
    if (e.type === "labelImage") {
      l = e;
      break;
    }
    if (e.type === "gfmFootnoteCall" || e.type === "labelLink" || e.type === "label" || e.type === "image" || e.type === "link") {
      break;
    }
  }
  return function (i) {
    if (!l || !l._balanced) {
      return n(i);
    }
    const a = o(r.sliceSerialize({
      start: l.end,
      end: r.now()
    }));
    if (a.codePointAt(0) !== 94 || !s.includes(a.slice(1))) {
      return n(i);
    }
    e.enter("gfmFootnoteCallLabelMarker");
    e.consume(i);
    e.exit("gfmFootnoteCallLabelMarker");
    return t(i);
  };
}
function Xe(e, t) {
  let n = e.length;
  while (n--) {
    if (e[n][1].type === "labelImage" && e[n][0] === "enter") {
      e[n][1];
      break;
    }
  }
  e[n + 1][1].type = "data";
  e[n + 3][1].type = "gfmFootnoteCallLabelMarker";
  const r = {
    type: "gfmFootnoteCall",
    start: Object.assign({}, e[n + 3][1].start),
    end: Object.assign({}, e[e.length - 1][1].end)
  };
  const i = {
    type: "gfmFootnoteCallMarker",
    start: Object.assign({}, e[n + 3][1].end),
    end: Object.assign({}, e[n + 3][1].end)
  };
  i.end.column++;
  i.end.offset++;
  i.end._bufferIndex++;
  const o = {
    type: "gfmFootnoteCallString",
    start: Object.assign({}, i.end),
    end: Object.assign({}, e[e.length - 1][1].start)
  };
  const s = {
    type: "chunkString",
    contentType: "string",
    start: Object.assign({}, o.start),
    end: Object.assign({}, o.end)
  };
  const l = [e[n + 1], e[n + 2], ["enter", r, t], e[n + 3], e[n + 4], ["enter", i, t], ["exit", i, t], ["enter", o, t], ["enter", s, t], ["exit", s, t], ["exit", o, t], e[e.length - 2], e[e.length - 1], ["exit", r, t]];
  e.splice(n, e.length - n + 1, ...l);
  return e;
}
function Ye(e, t, n) {
  const r = this;
  const i = r.parser.gfmFootnotes ||= [];
  let s;
  let l = 0;
  return function (t) {
    e.enter("gfmFootnoteCall");
    e.enter("gfmFootnoteCallLabelMarker");
    e.consume(t);
    e.exit("gfmFootnoteCallLabelMarker");
    return a;
  };
  function a(t) {
    if (t !== 94) {
      return n(t);
    } else {
      e.enter("gfmFootnoteCallMarker");
      e.consume(t);
      e.exit("gfmFootnoteCallMarker");
      e.enter("gfmFootnoteCallString");
      e.enter("chunkString").contentType = "string";
      return c;
    }
  }
  function c(a) {
    if (l > 999 || a === 93 && !s || a === null || a === 91 || d(a)) {
      return n(a);
    }
    if (a === 93) {
      e.exit("chunkString");
      const s = e.exit("gfmFootnoteCallString");
      if (i.includes(o(r.sliceSerialize(s)))) {
        e.enter("gfmFootnoteCallLabelMarker");
        e.consume(a);
        e.exit("gfmFootnoteCallLabelMarker");
        e.exit("gfmFootnoteCall");
        return t;
      } else {
        return n(a);
      }
    }
    if (!d(a)) {
      s = true;
    }
    l++;
    e.consume(a);
    if (a === 92) {
      return u;
    } else {
      return c;
    }
  }
  function u(t) {
    if (t === 91 || t === 92 || t === 93) {
      e.consume(t);
      l++;
      return c;
    } else {
      return c(t);
    }
  }
}
function et(e, t, n) {
  const r = this;
  const i = r.parser.gfmFootnotes ||= [];
  let s;
  let l;
  let a = 0;
  return function (t) {
    e.enter("gfmFootnoteDefinition")._container = true;
    e.enter("gfmFootnoteDefinitionLabel");
    e.enter("gfmFootnoteDefinitionLabelMarker");
    e.consume(t);
    e.exit("gfmFootnoteDefinitionLabelMarker");
    return c;
  };
  function c(t) {
    if (t === 94) {
      e.enter("gfmFootnoteDefinitionMarker");
      e.consume(t);
      e.exit("gfmFootnoteDefinitionMarker");
      e.enter("gfmFootnoteDefinitionLabelString");
      e.enter("chunkString").contentType = "string";
      return u;
    } else {
      return n(t);
    }
  }
  function u(t) {
    if (a > 999 || t === 93 && !l || t === null || t === 91 || d(t)) {
      return n(t);
    }
    if (t === 93) {
      e.exit("chunkString");
      const n = e.exit("gfmFootnoteDefinitionLabelString");
      s = o(r.sliceSerialize(n));
      e.enter("gfmFootnoteDefinitionLabelMarker");
      e.consume(t);
      e.exit("gfmFootnoteDefinitionLabelMarker");
      e.exit("gfmFootnoteDefinitionLabel");
      return h;
    }
    if (!d(t)) {
      l = true;
    }
    a++;
    e.consume(t);
    if (t === 92) {
      return f;
    } else {
      return u;
    }
  }
  function f(t) {
    if (t === 91 || t === 92 || t === 93) {
      e.consume(t);
      a++;
      return u;
    } else {
      return u(t);
    }
  }
  function h(t) {
    if (t === 58) {
      e.enter("definitionMarker");
      e.consume(t);
      e.exit("definitionMarker");
      if (!i.includes(s)) {
        i.push(s);
      }
      return g(e, p, "gfmFootnoteDefinitionWhitespace");
    } else {
      return n(t);
    }
  }
  function p(e) {
    return t(e);
  }
}
function tt(e, t, n) {
  return e.check(m, t, e.attempt(Ke, t, n));
}
function nt(e) {
  e.exit("gfmFootnoteDefinition");
}
function rt(e) {
  let t = (e || {}).singleTilde;
  const n = {
    name: "strikethrough",
    tokenize: function (e, n, r) {
      const i = this.previous;
      const o = this.events;
      let s = 0;
      return function (t) {
        if (i === 126 && o[o.length - 1][1].type !== "characterEscape") {
          return r(t);
        }
        e.enter("strikethroughSequenceTemporary");
        return a(t);
      };
      function a(o) {
        const c = l(i);
        if (o === 126) {
          if (s > 1) {
            return r(o);
          } else {
            e.consume(o);
            s++;
            return a;
          }
        }
        if (s < 2 && !t) {
          return r(o);
        }
        const u = e.exit("strikethroughSequenceTemporary");
        const f = l(o);
        u._open = !f || f === 2 && Boolean(c);
        u._close = !c || c === 2 && Boolean(f);
        return n(o);
      }
    },
    resolveAll: function (e, t) {
      let n = -1;
      while (++n < e.length) {
        if (e[n][0] === "enter" && e[n][1].type === "strikethroughSequenceTemporary" && e[n][1]._close) {
          let r = n;
          while (r--) {
            if (e[r][0] === "exit" && e[r][1].type === "strikethroughSequenceTemporary" && e[r][1]._open && e[n][1].end.offset - e[n][1].start.offset === e[r][1].end.offset - e[r][1].start.offset) {
              e[n][1].type = "strikethroughSequence";
              e[r][1].type = "strikethroughSequence";
              const i = {
                type: "strikethrough",
                start: Object.assign({}, e[r][1].start),
                end: Object.assign({}, e[n][1].end)
              };
              const o = {
                type: "strikethroughText",
                start: Object.assign({}, e[r][1].end),
                end: Object.assign({}, e[n][1].start)
              };
              const s = [["enter", i, t], ["enter", e[r][1], t], ["exit", e[r][1], t], ["enter", o, t]];
              const l = t.parser.constructs.insideSpan.null;
              if (l) {
                k(s, s.length, 0, b(l, e.slice(r + 1, n), t));
              }
              k(s, s.length, 0, [["exit", o, t], ["enter", e[n][1], t], ["exit", e[n][1], t], ["exit", i, t]]);
              k(e, r - 1, n - r + 3, s);
              n = r + s.length - 2;
              break;
            }
          }
        }
      }
      n = -1;
      while (++n < e.length) {
        if (e[n][1].type === "strikethroughSequenceTemporary") {
          e[n][1].type = "data";
        }
      }
      return e;
    }
  };
  if (t == null) {
    t = true;
  }
  return {
    text: {
      126: n
    },
    insideSpan: {
      null: [n]
    },
    attentionMarkers: {
      null: [126]
    }
  };
}
class it {
  constructor() {
    this.map = [];
  }
  add(e, t, n) {
    (function (e, t, n, r) {
      let i = 0;
      if (n === 0 && r.length === 0) {
        return;
      }
      while (i < e.map.length) {
        if (e.map[i][0] === t) {
          e.map[i][1] += n;
          e.map[i][2].push(...r);
          return;
        }
        i += 1;
      }
      e.map.push([t, n, r]);
    })(this, e, t, n);
  }
  consume(e) {
    this.map.sort(function (e, t) {
      return e[0] - t[0];
    });
    if (this.map.length === 0) {
      return;
    }
    let t = this.map.length;
    const n = [];
    while (t > 0) {
      t -= 1;
      n.push(e.slice(this.map[t][0] + this.map[t][1]), this.map[t][2]);
      e.length = this.map[t][0];
    }
    n.push(e.slice());
    e.length = 0;
    let r = n.pop();
    while (r) {
      for (const t of r) {
        e.push(t);
      }
      r = n.pop();
    }
    this.map.length = 0;
  }
}
function ot(e, t) {
  let n = false;
  const r = [];
  while (t < e.length) {
    const i = e[t];
    if (n) {
      if (i[0] === "enter") {
        if (i[1].type === "tableContent") {
          r.push(e[t + 1][1].type === "tableDelimiterMarker" ? "left" : "none");
        }
      } else if (i[1].type === "tableContent") {
        if (e[t - 1][1].type === "tableDelimiterMarker") {
          const e = r.length - 1;
          r[e] = r[e] === "left" ? "center" : "right";
        }
      } else if (i[1].type === "tableDelimiterRow") {
        break;
      }
    } else if (i[0] === "enter" && i[1].type === "tableDelimiterRow") {
      n = true;
    }
    t += 1;
  }
  return r;
}
function st(e, t, n) {
  const r = this;
  let i;
  let o = 0;
  let s = 0;
  return function (e) {
    let t = r.events.length - 1;
    while (t > -1) {
      const e = r.events[t][1].type;
      if (e !== "lineEnding" && e !== "linePrefix") {
        break;
      }
      t--;
    }
    const i = t > -1 ? r.events[t][1].type : null;
    const o = i === "tableHead" || i === "tableRow" ? F : l;
    if (o === F && r.parser.lazy[r.now().line]) {
      return n(e);
    }
    return o(e);
  };
  function l(t) {
    e.enter("tableHead");
    e.enter("tableRow");
    return function (e) {
      if (e === 124) {
        return a(e);
      }
      i = true;
      s += 1;
      return a(e);
    }(t);
  }
  function a(t) {
    if (t === null) {
      return n(t);
    } else if (x(t)) {
      if (s > 1) {
        s = 0;
        r.interrupt = true;
        e.exit("tableRow");
        e.enter("lineEnding");
        e.consume(t);
        e.exit("lineEnding");
        return f;
      } else {
        return n(t);
      }
    } else if (v(t)) {
      return g(e, a, "whitespace")(t);
    } else {
      s += 1;
      if (i) {
        i = false;
        o += 1;
      }
      if (t === 124) {
        e.enter("tableCellDivider");
        e.consume(t);
        e.exit("tableCellDivider");
        i = true;
        return a;
      } else {
        e.enter("data");
        return c(t);
      }
    }
  }
  function c(t) {
    if (t === null || t === 124 || d(t)) {
      e.exit("data");
      return a(t);
    } else {
      e.consume(t);
      if (t === 92) {
        return u;
      } else {
        return c;
      }
    }
  }
  function u(t) {
    if (t === 92 || t === 124) {
      e.consume(t);
      return c;
    } else {
      return c(t);
    }
  }
  function f(t) {
    r.interrupt = false;
    if (r.parser.lazy[r.now().line]) {
      return n(t);
    } else {
      e.enter("tableDelimiterRow");
      i = false;
      if (v(t)) {
        return g(e, h, "linePrefix", r.parser.constructs.disable.null.includes("codeIndented") ? undefined : 4)(t);
      } else {
        return h(t);
      }
    }
  }
  function h(t) {
    if (t === 45 || t === 58) {
      return m(t);
    } else if (t === 124) {
      i = true;
      e.enter("tableCellDivider");
      e.consume(t);
      e.exit("tableCellDivider");
      return p;
    } else {
      return w(t);
    }
  }
  function p(t) {
    if (v(t)) {
      return g(e, m, "whitespace")(t);
    } else {
      return m(t);
    }
  }
  function m(t) {
    if (t === 58) {
      s += 1;
      i = true;
      e.enter("tableDelimiterMarker");
      e.consume(t);
      e.exit("tableDelimiterMarker");
      return k;
    } else if (t === 45) {
      s += 1;
      return k(t);
    } else if (t === null || x(t)) {
      return C(t);
    } else {
      return w(t);
    }
  }
  function k(t) {
    if (t === 45) {
      e.enter("tableDelimiterFiller");
      return b(t);
    } else {
      return w(t);
    }
  }
  function b(t) {
    if (t === 45) {
      e.consume(t);
      return b;
    } else if (t === 58) {
      i = true;
      e.exit("tableDelimiterFiller");
      e.enter("tableDelimiterMarker");
      e.consume(t);
      e.exit("tableDelimiterMarker");
      return y;
    } else {
      e.exit("tableDelimiterFiller");
      return y(t);
    }
  }
  function y(t) {
    if (v(t)) {
      return g(e, C, "whitespace")(t);
    } else {
      return C(t);
    }
  }
  function C(n) {
    if (n === 124) {
      return h(n);
    } else if ((n === null || x(n)) && i && o === s) {
      e.exit("tableDelimiterRow");
      e.exit("tableHead");
      return t(n);
    } else {
      return w(n);
    }
  }
  function w(e) {
    return n(e);
  }
  function F(t) {
    e.enter("tableRow");
    return D(t);
  }
  function D(n) {
    if (n === 124) {
      e.enter("tableCellDivider");
      e.consume(n);
      e.exit("tableCellDivider");
      return D;
    } else if (n === null || x(n)) {
      e.exit("tableRow");
      return t(n);
    } else if (v(n)) {
      return g(e, D, "whitespace")(n);
    } else {
      e.enter("data");
      return A(n);
    }
  }
  function A(t) {
    if (t === null || t === 124 || d(t)) {
      e.exit("data");
      return D(t);
    } else {
      e.consume(t);
      if (t === 92) {
        return L;
      } else {
        return A;
      }
    }
  }
  function L(t) {
    if (t === 92 || t === 124) {
      e.consume(t);
      return A;
    } else {
      return A(t);
    }
  }
}
function lt(e, t) {
  let n;
  let r;
  let i;
  let o = -1;
  let s = true;
  let l = 0;
  let a = [0, 0, 0, 0];
  let c = [0, 0, 0, 0];
  let u = false;
  let f = 0;
  const h = new it();
  while (++o < e.length) {
    const d = e[o];
    const p = d[1];
    if (d[0] === "enter") {
      if (p.type === "tableHead") {
        u = false;
        if (f !== 0) {
          ct(h, t, f, n, r);
          r = undefined;
          f = 0;
        }
        n = {
          type: "table",
          start: Object.assign({}, p.start),
          end: Object.assign({}, p.end)
        };
        h.add(o, 0, [["enter", n, t]]);
      } else if (p.type === "tableRow" || p.type === "tableDelimiterRow") {
        s = true;
        i = undefined;
        a = [0, 0, 0, 0];
        c = [0, o + 1, 0, 0];
        if (u) {
          u = false;
          r = {
            type: "tableBody",
            start: Object.assign({}, p.start),
            end: Object.assign({}, p.end)
          };
          h.add(o, 0, [["enter", r, t]]);
        }
        l = p.type === "tableDelimiterRow" ? 2 : r ? 3 : 1;
      } else if (!l || p.type !== "data" && p.type !== "tableDelimiterMarker" && p.type !== "tableDelimiterFiller") {
        if (p.type === "tableCellDivider") {
          if (s) {
            s = false;
          } else {
            if (a[1] !== 0) {
              c[0] = c[1];
              i = at(h, t, a, l, undefined, i);
            }
            a = c;
            c = [a[1], o, 0, 0];
          }
        }
      } else {
        s = false;
        if (c[2] === 0) {
          if (a[1] !== 0) {
            c[0] = c[1];
            i = at(h, t, a, l, undefined, i);
            a = [0, 0, 0, 0];
          }
          c[2] = o;
        }
      }
    } else if (p.type === "tableHead") {
      u = true;
      f = o;
    } else if (p.type === "tableRow" || p.type === "tableDelimiterRow") {
      f = o;
      if (a[1] !== 0) {
        c[0] = c[1];
        i = at(h, t, a, l, o, i);
      } else if (c[1] !== 0) {
        i = at(h, t, c, l, o, i);
      }
      l = 0;
    } else if (!!l && (p.type === "data" || p.type === "tableDelimiterMarker" || p.type === "tableDelimiterFiller")) {
      c[3] = o;
    }
  }
  if (f !== 0) {
    ct(h, t, f, n, r);
  }
  h.consume(t.events);
  o = -1;
  while (++o < t.events.length) {
    const e = t.events[o];
    if (e[0] === "enter" && e[1].type === "table") {
      e[1]._align = ot(t.events, o);
    }
  }
  return e;
}
function at(e, t, n, r, i, o) {
  const s = r === 1 ? "tableHeader" : r === 2 ? "tableDelimiter" : "tableData";
  if (n[0] !== 0) {
    o.end = Object.assign({}, ut(t.events, n[0]));
    e.add(n[0], 0, [["exit", o, t]]);
  }
  const l = ut(t.events, n[1]);
  o = {
    type: s,
    start: Object.assign({}, l),
    end: Object.assign({}, l)
  };
  e.add(n[1], 0, [["enter", o, t]]);
  if (n[2] !== 0) {
    const i = ut(t.events, n[2]);
    const o = ut(t.events, n[3]);
    const s = {
      type: "tableContent",
      start: Object.assign({}, i),
      end: Object.assign({}, o)
    };
    e.add(n[2], 0, [["enter", s, t]]);
    if (r !== 2) {
      const r = t.events[n[2]];
      const i = t.events[n[3]];
      r[1].end = Object.assign({}, i[1].end);
      r[1].type = "chunkText";
      r[1].contentType = "text";
      if (n[3] > n[2] + 1) {
        const t = n[2] + 1;
        const r = n[3] - n[2] - 1;
        e.add(t, r, []);
      }
    }
    e.add(n[3] + 1, 0, [["exit", s, t]]);
  }
  if (i !== undefined) {
    o.end = Object.assign({}, ut(t.events, i));
    e.add(i, 0, [["exit", o, t]]);
    o = undefined;
  }
  return o;
}
function ct(e, t, n, r, i) {
  const o = [];
  const s = ut(t.events, n);
  if (i) {
    i.end = Object.assign({}, s);
    o.push(["exit", i, t]);
  }
  r.end = Object.assign({}, s);
  o.push(["exit", r, t]);
  e.add(n + 1, 0, o);
}
function ut(e, t) {
  const n = e[t];
  const r = n[0] === "enter" ? "start" : "end";
  return n[1][r];
}
const ft = {
  name: "tasklistCheck",
  tokenize: function (e, t, n) {
    const r = this;
    return function (t) {
      if (r.previous !== null || !r._gfmTasklistFirstContentOfListItem) {
        return n(t);
      }
      e.enter("taskListCheck");
      e.enter("taskListCheckMarker");
      e.consume(t);
      e.exit("taskListCheckMarker");
      return i;
    };
    function i(t) {
      if (d(t)) {
        e.enter("taskListCheckValueUnchecked");
        e.consume(t);
        e.exit("taskListCheckValueUnchecked");
        return o;
      } else if (t === 88 || t === 120) {
        e.enter("taskListCheckValueChecked");
        e.consume(t);
        e.exit("taskListCheckValueChecked");
        return o;
      } else {
        return n(t);
      }
    }
    function o(t) {
      if (t === 93) {
        e.enter("taskListCheckMarker");
        e.consume(t);
        e.exit("taskListCheckMarker");
        e.exit("taskListCheck");
        return s;
      } else {
        return n(t);
      }
    }
    function s(r) {
      if (x(r)) {
        return t(r);
      } else if (v(r)) {
        return e.check({
          tokenize: ht
        }, t, n)(r);
      } else {
        return n(r);
      }
    }
  }
};
function ht(e, t, n) {
  return g(e, function (e) {
    if (e === null) {
      return n(e);
    } else {
      return t(e);
    }
  }, "whitespace");
}
const dt = {};
function pt(e) {
  const t = e || dt;
  const n = this.data();
  const r = n.micromarkExtensions ||= [];
  const i = n.fromMarkdownExtensions ||= [];
  const o = n.toMarkdownExtensions ||= [];
  r.push(function (e) {
    return y([{
      text: We
    }, {
      document: {
        91: {
          name: "gfmFootnoteDefinition",
          tokenize: et,
          continuation: {
            tokenize: tt
          },
          exit: nt
        }
      },
      text: {
        91: {
          name: "gfmFootnoteCall",
          tokenize: Ye
        },
        93: {
          name: "gfmPotentialFootnoteCall",
          add: "after",
          tokenize: Ne,
          resolveTo: Xe
        }
      }
    }, rt(e), {
      flow: {
        null: {
          name: "table",
          tokenize: st,
          resolveAll: lt
        }
      }
    }, {
      text: {
        91: ft
      }
    }]);
  }(t));
  i.push([{
    transforms: [I],
    enter: {
      literalAutolink: S,
      literalAutolinkEmail: M,
      literalAutolinkHttp: M,
      literalAutolinkWww: M
    },
    exit: {
      literalAutolink: z,
      literalAutolinkEmail: T,
      literalAutolinkHttp: E,
      literalAutolinkWww: O
    }
  }, {
    enter: {
      gfmFootnoteCallString: _,
      gfmFootnoteCall: $,
      gfmFootnoteDefinitionLabelString: B,
      gfmFootnoteDefinition: H
    },
    exit: {
      gfmFootnoteCallString: q,
      gfmFootnoteCall: W,
      gfmFootnoteDefinitionLabelString: U,
      gfmFootnoteDefinition: V
    }
  }, {
    canContainEols: ["delete"],
    enter: {
      strikethrough: N
    },
    exit: {
      strikethrough: X
    }
  }, {
    enter: {
      table: Fe,
      tableData: Se,
      tableHeader: Se,
      tableRow: Ae
    },
    exit: {
      codeText: Me,
      table: De,
      tableData: Le,
      tableHeader: Le,
      tableRow: Le
    }
  }, {
    exit: {
      taskListCheckValueChecked: Te,
      taskListCheckValueUnchecked: Te,
      paragraph: ze
    }
  }]);
  o.push(function (e) {
    return {
      extensions: [{
        unsafe: [{
          character: "@",
          before: "[+\\-.\\w]",
          after: "[\\-.\\w]",
          inConstruct: A,
          notInConstruct: L
        }, {
          character: ".",
          before: "[Ww]",
          after: "[\\-.\\w]",
          inConstruct: A,
          notInConstruct: L
        }, {
          character: ":",
          before: "[ps]",
          after: "\\/",
          inConstruct: A,
          notInConstruct: L
        }]
      }, Z(e), {
        unsafe: [{
          character: "~",
          inConstruct: "phrasing",
          notInConstruct: K
        }],
        handlers: {
          delete: Y
        }
      }, Oe(e), {
        unsafe: [{
          atBreak: true,
          character: "-",
          after: "[:|-]"
        }],
        handlers: {
          listItem: Ie
        }
      }]
    };
  }(t));
}
export { C as c, w as f, pt as r };