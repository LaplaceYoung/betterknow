/** Leftover Hyperknow onboarding (no Orbie, no Canvas, no trademarks). */

export const ONBOARD = Object.freeze({
  welcomeTitle: "欢迎使用 simo know",
  welcomeGreeting: "你好{{name}}。先用几个小问题，把学习体验调成你的。",
  welcomeGetStarted: "开始",
  chooseLanguage: "选择你的语言",
  acquisitionTitle: "你是从哪里了解到 simo know 的？",
  step1Title: "以下哪个选项最能描述您当前的身份？",
  continue: "继续",
  back: "返回",
  skip: "跳过引导",
  finishCta: "开始吧！",
  pickAnOption: "请在下方选择一项以继续",
  confirm: "确认",
  roleOtherPlaceholder: "告诉我们你的背景……",
  otherPlaceholder: "告诉我们你是从哪里了解到我们的……",
  stepIndicator: "第 {{current}} 步，共 {{total}} 步",
});

export const ONBOARD_STEPS = Object.freeze(["welcome", "language", "discovery", "role"]);

export const ONBOARD_LANGUAGES = Object.freeze([
  { id: "en", label: "English" },
  { id: "zh", label: "简体中文" },
  { id: "zh-TW", label: "繁體中文" },
  { id: "es", label: "Español" },
  { id: "ko", label: "한국어" },
  { id: "hi", label: "हिन्दी" },
  { id: "ur", label: "اردو" },
]);

export const ONBOARD_SOURCES = Object.freeze([
  { id: "searchEngine", zh: "搜索引擎（如 Google、必应）", en: "Search engine (e.g. Google, Bing)" },
  { id: "instagramOrTiktok", zh: "Instagram 或 TikTok", en: "Instagram or TikTok" },
  { id: "linkedinOrX", zh: "LinkedIn 或 X（推特）", en: "LinkedIn or X" },
  { id: "rednote", zh: "小红书（RedNote）", en: "Xiaohongshu (RedNote)" },
  { id: "friendReferral", zh: "朋友、同学或同事推荐", en: "Friend, classmate, or colleague" },
  { id: "onCampus", zh: "校园内 — 海报、传单或社团", en: "On campus (posters, flyers, or student clubs)" },
  { id: "blogPodcastNews", zh: "博客、播客或新闻报道", en: "Blog, podcast, or news articles" },
  { id: "other", zh: "其他", en: "Other" },
]);

export const ONBOARD_ROLES = Object.freeze([
  { id: "highSchool", zh: "高中生", en: "High school student" },
  { id: "college", zh: "本科生", en: "College / undergraduate student" },
  { id: "graduate", zh: "研究生/博士生", en: "Graduate student" },
  { id: "selfLearner", zh: "自学者/职场人士", en: "Self-learner / professional" },
  { id: "other", zh: "其他", en: "Other" },
]);

export function onboardingState({
  step = "welcome",
  name = "",
  language = "zh",
  source = "",
  role = "",
  other = "",
} = {}) {
  const steps = ONBOARD_STEPS;
  const index = Math.max(0, steps.indexOf(step));
  const current = steps[index] || "welcome";
  const guest = String(name || "").trim();
  const greeting = ONBOARD.welcomeGreeting.replace("{{name}}", guest ? `，${guest}` : "");
  const canContinue =
    current === "welcome" ||
    (current === "language" && Boolean(language)) ||
    (current === "discovery" && Boolean(source) && (source !== "other" || String(other).trim())) ||
    (current === "role" && Boolean(role) && (role !== "other" || String(other).trim()));
  return {
    step: current,
    index,
    total: steps.length,
    indicator: ONBOARD.stepIndicator
      .replace("{{current}}", String(index + 1))
      .replace("{{total}}", String(steps.length)),
    greeting,
    language,
    source,
    role,
    other,
    canContinue,
    languages: ONBOARD_LANGUAGES,
    sources: ONBOARD_SOURCES,
    roles: ONBOARD_ROLES,
    next: steps[index + 1] || "",
    prev: steps[index - 1] || "",
  };
}
