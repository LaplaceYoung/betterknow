const e = "hk_signup_success_fired";
let n = false;
function t(t) {
  try {
    if (n || typeof window != "undefined" && window.sessionStorage && window.sessionStorage.getItem(e) === "true") {
      return;
    }
    if (typeof window != "undefined") {
      window.dataLayer = window.dataLayer || [];
    }
    const o = {
      event: "signup_success",
      signup_method: t.method,
      user_id: t.userId || undefined,
      timestamp_ms: Date.now()
    };
    if (typeof window != "undefined" && window.dataLayer) {
      window.dataLayer.push(o);
    }
    n = true;
    if (typeof window != "undefined" && window.sessionStorage) {
      window.sessionStorage.setItem(e, "true");
    }
  } catch (o) {}
}
function o() {
  if (typeof document == "undefined" || !document.cookie) {
    return null;
  }
  const e = "dub_id=";
  const n = document.cookie.split(";");
  for (const t of n) {
    const n = t.trim();
    if (n.startsWith(e)) {
      const e = n.slice(7);
      try {
        const n = decodeURIComponent(e);
        if (n.length > 0) {
          return n;
        } else {
          return null;
        }
      } catch {
        if (e.length > 0) {
          return e;
        } else {
          return null;
        }
      }
    }
  }
  return null;
}
export { o as g, t };