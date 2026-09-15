import { c as e, g as t } from "./index-TjoB2Buo.js";
const n = () => {
  const e = t();
  if (e) {
    return {
      Authorization: `Bearer ${e}`
    };
  } else {
    return {};
  }
};
const a = async e => {
  if (!e.ok) {
    let t = `Request failed with status ${e.status}`;
    try {
      const n = await e.json();
      if (n == null ? undefined : n.detail) {
        t = String(n.detail);
      }
    } catch {}
    throw new Error(t);
  }
  return e.json();
};
async function s() {
  const t = await fetch(e("/api/v1/course-generation/courses"), {
    headers: n()
  });
  return (await a(t)).courses;
}
async function o(t = "this") {
  const s = new Date().getTimezoneOffset();
  const o = await fetch(e(`/api/v1/course-generation/learning-summary?week=${t}&timezone_offset_minutes=${s}`), {
    headers: n()
  });
  return a(o);
}
async function r(t) {
  const s = await fetch(e(`/api/v1/course-generation/courses/${encodeURIComponent(t)}`), {
    headers: n()
  });
  return a(s);
}
async function i(t) {
  const s = await fetch(e(`/api/v1/course-generation/courses/${encodeURIComponent(t)}`), {
    method: "DELETE",
    headers: n()
  });
  return a(s);
}
export { o as a, r as b, i as d, s as g };