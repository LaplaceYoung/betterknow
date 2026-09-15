import { g as e, c as r } from "./index-TjoB2Buo.js";
const s = async s => {
  try {
    const o = e();
    if (!o) {
      return {
        success: false,
        message: "User not authenticated",
        error: "No access token found"
      };
    }
    const t = await fetch(r("/api/v1/memory/update_profile_memory"), {
      method: "POST",
      headers: {
        Authorization: `Bearer ${o}`,
        accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        answers: s
      })
    });
    const a = await t.json();
    if (t.ok) {
      return {
        success: true,
        message: a.message || "Profile memory updated successfully"
      };
    } else {
      return {
        success: false,
        message: a.message || "Failed to update profile memory",
        error: a.error || `HTTP ${t.status}`
      };
    }
  } catch (o) {
    return {
      success: false,
      message: "Network error occurred while updating profile memory",
      error: o instanceof Error ? o.message : "Unknown error"
    };
  }
};
export { s as updateProfileMemory };