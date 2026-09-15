/** Hyperknow whatsNew changelog (no trademarks / Orbie). */

export const WHATNEW_VERSION = "1.3.13";
export const WHATNEW_STORAGE = "anyknow_whats_new_read_version";

export const WHATNEW = Object.freeze({
  triggerLabel: "来看看版本更新 · v{{version}}",
  triggerLabelUnread: "来看看版本更新 · v{{version}}（有未读更新）",
  modalTitle: "最新动态",
  typeNew: "新功能",
  typeImproved: "优化",
  typeFixed: "修复",
});

const COPY = Object.freeze({
  zh: WHATNEW,
  en: Object.freeze({
    triggerLabel: "What's new · v{{version}}",
    triggerLabelUnread: "What's new · v{{version}} (unread updates)",
    modalTitle: "What's new",
    typeNew: "New",
    typeImproved: "Improved",
    typeFixed: "Fixed",
  }),
});

const LOG = Object.freeze([
  {
    version: "1.3.13",
    tag: "v1313",
    date: { zh: "2026年8月6日", en: "August 6, 2026" },
    changes: [
      { type: "new", zh: "新增快速模式，可在输入框切换标准与快速回复", en: "Added Fast Mode — switch between Standard and Fast replies from the input bar" },
      { type: "fixed", zh: "修复若干问题", en: "Various bug fixes" },
    ],
  },
  {
    version: "1.3.12",
    tag: "v1312",
    date: { zh: "2026年5月27日", en: "May 27, 2026" },
    changes: [
      { type: "improved", zh: "模型性能提升，更好地支持长上下文对话", en: "Model performance improved with better support for long-context conversations" },
      { type: "improved", zh: "速查表更加稳定", en: "More stable Cheatsheet experience" },
      { type: "improved", zh: "查找、增删更加便捷", en: "Easier search, add, and delete" },
      { type: "improved", zh: "整体性能优化", en: "Overall performance optimizations" },
    ],
  },
  {
    version: "1.3.11",
    tag: "v1311",
    date: { zh: "2026年5月18日", en: "May 18, 2026" },
    changes: [
      { type: "new", zh: "百科式行内排版：图片与示意图直接嵌入回复正文", en: "Encyclopedia-style inline layout — images and diagrams weave into reply text" },
      { type: "new", zh: "音频功能即将上线", en: "Audio feature coming soon" },
    ],
  },
  {
    version: "1.3.10",
    tag: "v1310",
    date: { zh: "2026年5月14日", en: "May 14, 2026" },
    changes: [
      { type: "new", zh: "历史页面 — 浏览、搜索、收藏、重命名和删除过去的对话与深度学习课堂", en: "History page — browse, search, star, rename, and delete conversations and Deep Learn sessions" },
      { type: "new", zh: "主页新增热门话题 — 发现当下最受关注的内容，一键开启学习", en: "Trending topics on the home page — discover what's happening and jump into learning" },
    ],
  },
  {
    version: "1.3.9",
    tag: "v139",
    date: { zh: "2026年4月20日", en: "Apr 20, 2026" },
    changes: [
      { type: "new", zh: "速查表可编辑模式，期末季福利，并修复用户反馈", en: "Cheatsheet edit mode — a finals-season perk — plus fixes from user feedback" },
      { type: "fixed", zh: "修复偶发意外退出登录的问题", en: "Occasional unexpected logout" },
    ],
  },
  {
    version: "1.3.8",
    tag: "v138",
    date: { zh: "2026年4月9日", en: "Apr 9, 2026" },
    changes: [
      { type: "fixed", zh: "修复若干用户反馈的问题", en: "Various fixes from user feedback" },
      { type: "new", zh: "引用升级：点击文件引用可展示原始页码", en: "Citations upgrade: tap a file citation to see the original page number" },
      { type: "improved", zh: "更新前端字体", en: "Updated frontend fonts" },
    ],
  },
  {
    version: "1.3.0",
    tag: "v130",
    date: { zh: "2026年2月26日", en: "Feb 26, 2026" },
    changes: [
      { type: "new", zh: "simo know 学习助手上线 — 面向学习的主动式同伴", en: "Launching simo know — a proactive companion for learning" },
    ],
  },
]);

function fill(template, version) {
  return String(template).replaceAll("{{version}}", version);
}

export function whatsNewState({ lang = "zh", readVersion = "" } = {}) {
  const copy = COPY[lang] || COPY.zh;
  const unread = String(readVersion || "") !== WHATNEW_VERSION;
  const entries = LOG.map((row) => ({
    version: row.version,
    tag: row.tag,
    date: row.date[lang] || row.date.en,
    changes: row.changes.map((change) => ({
      type: change.type,
      typeLabel: copy[`type${change.type[0].toUpperCase()}${change.type.slice(1)}`],
      text: change[lang] || change.en,
    })),
  }));
  return {
    version: WHATNEW_VERSION,
    unread,
    modalTitle: copy.modalTitle,
    triggerLabel: fill(unread ? copy.triggerLabelUnread : copy.triggerLabel, WHATNEW_VERSION),
    typeNew: copy.typeNew,
    typeImproved: copy.typeImproved,
    typeFixed: copy.typeFixed,
    entries,
  };
}

export function markWhatsNewRead() {
  return WHATNEW_VERSION;
}
