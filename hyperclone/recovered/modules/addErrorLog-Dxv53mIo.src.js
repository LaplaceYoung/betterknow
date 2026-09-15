import { e as t, c as e } from "./index-TjoB2Buo.js";
const r = e("/api/v1/error/add_error_log");
const i = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const n = (t, e = "history") => {
  if (t != null) {
    if (Array.isArray(t)) {
      return {
        [e]: t
      };
    } else if (typeof t == "object") {
      return t;
    } else {
      return {
        value: t
      };
    }
  }
};
const o = e => {
  const n = (t => {
    const e = typeof t == "string" ? t.trim() : "";
    if (!e) {
      return null;
    }
    const r = e.indexOf("__");
    if (r > 0) {
      const t = e.slice(0, r);
      const n = e.slice(r + 2);
      if (i.test(t) && n) {
        if (i.test(n)) {
          return n;
        } else {
          return t;
        }
      }
    }
    if (i.test(e)) {
      return e;
    } else {
      return null;
    }
  })(e.conversation_id);
  if (!n || !e.conversation_type) {
    return;
  }
  e = {
    ...e,
    conversation_id: n
  };
  const o = t();
  if (o.Authorization) {
    try {
      fetch(r, {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          ...o
        },
        body: JSON.stringify(e),
        keepalive: true
      }).catch(t => {});
    } catch (a) {}
  }
};
export { o as a, n as t };