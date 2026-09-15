export const COSTS = Object.freeze({
  courseCraft: 10,
  perFile: 2,
  assist: 1,
  materials: 3,
  deepLearn: 2,
  practice: 1,
  studyPlan: 2,
  boardImage: 2,
  htmlAnimation: 3,
  instructionVideo: 3,
});

export function createAccount({ email, password, credits = 20, username } = {}) {
  if (!email) throw new Error("email required");
  return {
    userId: `u_${Math.random().toString(36).slice(2, 10)}`,
    email: String(email).toLowerCase(),
    passwordHash: hashPassword(password || ""),
    username: username || String(email).split("@")[0],
    tier: "free",
    credits,
    maxCredits: credits,
    createdAt: new Date().toISOString(),
  };
}

export function verifyPassword(account, password) {
  return account.passwordHash === hashPassword(password || "");
}

function hashPassword(password) {
  // Deterministic non-crypto hash for the local demo store (not production KDF).
  let h = 2166136261;
  const s = `anyknow:${password}`;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0).toString(16);
}

export function debitCredits(account, amount, reason = "generation") {
  if (!account) throw new Error("account required");
  if (account.guest || account.bypassCredits) {
    return { ...account, lastDebit: { amount: 0, reason, skipped: true } };
  }
  const cost = Number(amount);
  if (!Number.isFinite(cost) || cost < 0) throw new Error("invalid credit amount");
  if (cost === 0) return { ...account, lastDebit: { amount: 0, reason } };
  if ((account.credits ?? 0) < cost) {
    const err = new Error(
      `This needs ${cost} credits and you have ${account.credits ?? 0}.`,
    );
    err.code = "INSUFFICIENT_CREDITS";
    err.cost = cost;
    err.remaining = account.credits ?? 0;
    throw err;
  }
  return {
    ...account,
    credits: account.credits - cost,
    lastDebit: { amount: cost, reason, at: new Date().toISOString() },
  };
}

export function creditCostForCourse({ fileCount = 0 } = {}) {
  return COSTS.courseCraft + COSTS.perFile * fileCount;
}
