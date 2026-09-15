import { g as s, c as e, A as r } from "./index-TjoB2Buo.js";
const t = async t => {
  try {
    const a = s();
    if (!a) {
      return {
        success: false,
        message: "No access token found. Please log in again.",
        error: "NO_TOKEN"
      };
    }
    const o = e(r.ENDPOINTS.GET_MAIN_TASK_DATA);
    const c = await fetch(o, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${a}`
      },
      body: JSON.stringify({
        task_id: t
      })
    });
    if (!c.ok) {
      const s = await c.json().catch(() => ({}));
      return {
        success: false,
        message: s.message || s.detail || `HTTP error! status: ${c.status}`,
        error: `HTTP_${c.status}`
      };
    }
    const n = await c.json();
    if (n.success) {
      return n;
    } else {
      return {
        success: false,
        message: "Unexpected response format",
        error: "INVALID_RESPONSE"
      };
    }
  } catch (a) {
    return {
      success: false,
      message: a instanceof Error ? a.message : "Unknown error occurred",
      error: "NETWORK_ERROR"
    };
  }
};
export { t as g };