import { e, c as t, K as r } from "./index-TjoB2Buo.js";
const s = t("/api/v1/usr-msg-inbox/get_message");
function o(e) {
  if (!e || typeof e != "object") {
    return [];
  }
  const t = e;
  const r = t.messages ?? t.data;
  if (Array.isArray(r)) {
    return r.map(e => {
      const t = e;
      const r = t.content;
      const s = typeof r == "string" ? r : typeof r == "object" && r !== null && typeof r.message == "string" ? r.message : "";
      const o = t.msg_type;
      const n = t.sender_type;
      return {
        message_id: String(t.message_id ?? t.id ?? ""),
        title: String(t.title ?? ""),
        content: {
          message: s
        },
        sent_at: String(t.sent_at ?? t.created_at ?? ""),
        status: t.status === "read" ? "read" : "unread",
        ...(typeof o == "string" ? {
          msg_type: o
        } : {}),
        ...(typeof n == "string" ? {
          sender_type: n
        } : {})
      };
    });
  } else {
    return [];
  }
}
function n(e) {
  if (!e || typeof e != "object") {
    return {
      next_cursor: null,
      has_more: false
    };
  }
  const t = e.pagination;
  if (t && typeof t == "object") {
    return {
      next_cursor: typeof t.next_cursor == "string" ? t.next_cursor : null,
      has_more: Boolean(t.has_more)
    };
  } else {
    return {
      next_cursor: null,
      has_more: false
    };
  }
}
const a = async (t, r = 20) => {
  try {
    const a = e();
    if (!a.Authorization) {
      return {
        success: false,
        error: "User not authenticated"
      };
    }
    const i = Math.min(100, Math.max(1, Math.floor(r)));
    const c = new URLSearchParams();
    c.set("limit", String(i));
    if (t) {
      c.set("cursor", t);
    }
    const u = `${s}?${c.toString()}`;
    const g = await fetch(u, {
      method: "GET",
      headers: {
        accept: "application/json",
        ...a
      }
    });
    const l = await g.json().catch(() => ({}));
    if (!g.ok) {
      const e = l;
      return {
        success: false,
        error: typeof (e == null ? undefined : e.detail) == "string" && e.detail || typeof (e == null ? undefined : e.message) == "string" && e.message || typeof (e == null ? undefined : e.error) == "string" && e.error || `Failed to load inbox (${g.status})`
      };
    }
    return {
      success: true,
      messages: o(l),
      pagination: n(l)
    };
  } catch (a) {
    return {
      success: false,
      error: "Network error or server unavailable"
    };
  }
};
const i = t("/api/v1/usr-msg-inbox/mark_read");
const c = async t => {
  const r = t.filter(e => e.length > 0);
  if (r.length === 0) {
    return {
      success: true
    };
  }
  try {
    const t = e();
    if (!t.Authorization) {
      return {
        success: false,
        error: "User not authenticated"
      };
    }
    const s = await fetch(i, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        ...t
      },
      body: JSON.stringify({
        message_ids: r
      })
    });
    const o = await s.json().catch(() => ({}));
    if (!s.ok) {
      const e = o;
      return {
        success: false,
        error: typeof (e == null ? undefined : e.detail) == "string" && e.detail || typeof (e == null ? undefined : e.message) == "string" && e.message || typeof (e == null ? undefined : e.error) == "string" && e.error || `Failed to mark messages read (${s.status})`
      };
    }
    const n = o;
    if (n.success === false) {
      return {
        success: false,
        error: typeof (n == null ? undefined : n.message) == "string" && n.message || typeof (n == null ? undefined : n.error) == "string" && n.error || "Failed to mark messages read"
      };
    } else {
      return {
        success: true
      };
    }
  } catch (s) {
    return {
      success: false,
      error: "Network error or server unavailable"
    };
  }
};
function u(e, t, s) {
  const o = new Date(e);
  const n = new Date().getTime() - o.getTime();
  const a = Math.floor(n / 86400000);
  if (a === 0) {
    return t("inbox.today");
  } else if (a === 1) {
    return t("inbox.oneDayAgo");
  } else if (a < 7) {
    return t("inbox.daysAgo", {
      count: a
    });
  } else {
    return new Date(e).toLocaleDateString(r(s), {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  }
}
export { u as f, a as g, c as m };