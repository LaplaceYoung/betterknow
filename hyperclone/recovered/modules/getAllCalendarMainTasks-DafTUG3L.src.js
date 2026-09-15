import { g as s, c as e, A as r } from "./index-TjoB2Buo.js";
const a = async () => {
  try {
    const a = s();
    if (!a) {
      return {
        success: false,
        message: "No access token found. Please log in again.",
        error: "NO_TOKEN"
      };
    }
    const t = e(r.ENDPOINTS.GET_ALL_CALENDAR_MAINTASKS);
    const c = await fetch(t, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${a}`
      }
    });
    if (!c.ok) {
      const s = await c.json().catch(() => ({}));
      return {
        success: false,
        message: s.message || s.detail || `HTTP error! status: ${c.status}`,
        error: `HTTP_${c.status}`
      };
    }
    const o = await c.json();
    if (o.success && Array.isArray(o.tasks)) {
      return o;
    } else if (Array.isArray(o)) {
      return {
        success: true,
        tasks: o
      };
    } else if (o.tasks && Array.isArray(o.tasks)) {
      return {
        success: true,
        tasks: o.tasks,
        pending_sources_count: typeof o.pending_sources_count == "number" ? o.pending_sources_count : undefined
      };
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
export { a as g };