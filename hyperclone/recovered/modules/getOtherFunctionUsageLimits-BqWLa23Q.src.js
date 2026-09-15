import { g as t, c as a, A as n } from "./index-TjoB2Buo.js";
const r = "hyperknow_quota_limits";
const e = () => {
  try {
    const t = localStorage.getItem(r);
    if (!t) {
      return null;
    }
    const a = JSON.parse(t);
    if (Date.now() - a.cached_at > 600000) {
      return null;
    } else {
      return a.data;
    }
  } catch {
    return null;
  }
};
const c = async () => {
  const e = t();
  if (!e) {
    return null;
  }
  try {
    const t = await fetch(a(n.ENDPOINTS.OTHER_FUNCTION_USAGE_LIMITS), {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${e}`
      }
    });
    if (!t.ok) {
      return null;
    }
    const c = await t.json();
    (t => {
      try {
        const a = {
          data: t,
          cached_at: Date.now()
        };
        localStorage.setItem(r, JSON.stringify(a));
      } catch {}
    })(c);
    return c;
  } catch {
    return null;
  }
};
const o = t => t.limit - t.remaining;
const s = t => {
  try {
    const a = localStorage.getItem(r);
    if (!a) {
      return null;
    }
    const n = JSON.parse(a);
    const e = {
      ...n.data,
      [t]: {
        ...n.data[t],
        remaining: Math.max(n.data[t].remaining - 1, 0)
      }
    };
    n.data = e;
    localStorage.setItem(r, JSON.stringify(n));
    return e;
  } catch {
    return null;
  }
};
export { c as a, o as b, s as d, e as g };