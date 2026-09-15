const t = {
  fastWindowMs: 10000,
  base: 600,
  fastBonus: 200,
  streakStep: 100,
  streakCap: 400,
  starThresholds: [0.8, 0.55, 0.25]
};
const e = ({
  questionIds: e,
  revealedQuestions: s,
  skippedQuestions: a,
  questionCorrectness: r,
  fastAnswers: o
}) => {
  let n = 0;
  let l = 0;
  let i = 0;
  let u = 0;
  let f = 0;
  for (const k of e) {
    const e = Boolean(s[k]);
    if (e && Boolean(r[k])) {
      n += t.base + Math.min(l * t.streakStep, t.streakCap);
      if (o[k]) {
        n += t.fastBonus;
        f += 1;
      }
      l += 1;
      i = Math.max(i, l);
      u += 1;
    } else if (e || a[k]) {
      l = 0;
    }
  }
  return {
    total: n,
    streak: l,
    bestStreak: i,
    correctCount: u,
    fastCount: f
  };
};
const s = (t, e, s, a, r) => {
  let o = 0;
  for (let n = 0; n < r; n += 1) {
    const r = t[n];
    if (e[r] && a[r]) {
      o += 1;
    } else if (e[r] || s[r]) {
      o = 0;
    }
  }
  return o;
};
const a = e => {
  let s = 0;
  for (let a = 0; a < e; a += 1) {
    s += t.base + t.fastBonus + Math.min(a * t.streakStep, t.streakCap);
  }
  return s;
};
const r = (e, s) => {
  if (s <= 0) {
    return 0;
  }
  const a = e / s;
  const [r, o, n] = t.starThresholds;
  if (a >= r) {
    return 3;
  } else if (a >= o) {
    return 2;
  } else if (a >= n) {
    return 1;
  } else {
    return 0;
  }
};
const o = ["pixelmoth", "tofu_bandit", "Nine_Volt", "mossy.exe", "sudo_nap", "Kettle44", "blue_period", "orbit_gremlin", "driftwoodie", "snoozebutton", "HALCYON", "mika_0417", "velvetcrash", "deltawave", "oatmilk_ultra", "Jinx0", "paper_tiger", "slowloris", "Cassini_9", "nocturneee", "brb_kettle", "fig_and_thyme", "GNARWHAL", "lowercase_liam"];
const n = [{
  skill: [0.78, 0.92],
  fastRate: [0.45, 0.7]
}, {
  skill: [0.55, 0.72],
  fastRate: [0.4, 0.75]
}, {
  skill: [0.38, 0.56],
  fastRate: [0.2, 0.5]
}];
const l = t => {
  let e = 2166136261;
  for (let s = 0; s < t.length; s += 1) {
    e ^= t.charCodeAt(s);
    e = Math.imul(e, 16777619);
  }
  return e >>> 0;
};
const i = t => {
  let e = t >>> 0;
  return () => {
    e = e + 1831565813 | 0;
    let t = Math.imul(e ^ e >>> 15, e | 1);
    t = t + Math.imul(t ^ t >>> 7, t | 61) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
};
const u = (e, s) => {
  const a = i(l(e));
  const r = [...o];
  return n.map(o => {
    const [n] = r.splice(Math.floor(a() * r.length), 1);
    const u = i(l(`${e}|${n}`));
    const f = o.skill[0] + u() * (o.skill[1] - o.skill[0]);
    const k = o.fastRate[0] + u() * (o.fastRate[1] - o.fastRate[0]);
    let c = 0;
    let p = 0;
    let h = 0;
    for (let e = 0; e < s; e += 1) {
      const e = u() < f;
      const s = u() < k;
      if (e) {
        c += t.base + Math.min(p * t.streakStep, t.streakCap) + (s ? t.fastBonus : 0);
        p += 1;
        h += 1;
      } else {
        p = 0;
      }
    }
    return {
      name: n,
      score: c,
      correctCount: h
    };
  });
};
export { t as Q, s as a, u as b, e as d, a as p, r as s };