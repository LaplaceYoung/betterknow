/** Leftover course-marketplace page: search, editor picks, subject tabs. */

export const MARKET_COPY = Object.freeze({
  findFit: "发现最适合你的课程",
  fitSub: "专为你的学习方式打造。",
  searchInMarket: "在课程集市中搜索课程",
  searchCourses: "搜索课程…",
  hot: "热门",
  editorsPicks: "编辑精选",
  empty: "没有匹配的课程",
  subjectLabel: "科目",
  joined: "人已加入",
  hours: "课时",
  findFitEn: "Find the course that fits you",
  fitSubEn: "Built around how you learn.",
  searchInMarketEn: "Search the course marketplace",
  searchCoursesEn: "Search courses…",
  hotEn: "Popular",
  editorsPicksEn: "Editor's picks",
  emptyEn: "No courses match.",
  subjectLabelEn: "Subject",
  joinedEn: "joined",
  hoursEn: "hrs",
});

export const MARKET_SUBJECTS = Object.freeze([
  { id: "all", zh: "全部", en: "All" },
  { id: "exam", zh: "考试备考", en: "Exam prep" },
  { id: "math", zh: "数学与统计", en: "Math & stats" },
  { id: "cs", zh: "计算机科学", en: "Computer science" },
  { id: "ai", zh: "AI 与数据科学", en: "AI & data" },
  { id: "nat", zh: "自然科学", en: "Natural science" },
  { id: "biz", zh: "商业与经济", en: "Business" },
  { id: "psy", zh: "心理学", en: "Psychology" },
  { id: "phil", zh: "哲学", en: "Philosophy" },
  { id: "soc", zh: "社会科学", en: "Social science" },
  { id: "write", zh: "表达与写作", en: "Writing" },
]);

function haystack(course) {
  const tags = Array.isArray(course?.tags) ? course.tags.join(" ") : "";
  return `${course?.title || ""} ${course?.description || ""} ${course?.subject || ""} ${tags}`.toLowerCase();
}

export function filterMarketplace(courses = [], { query = "", subject = "all" } = {}) {
  const list = Array.isArray(courses) ? courses : [];
  const q = String(query || "").trim().toLowerCase();
  const tab = MARKET_SUBJECTS.find((s) => s.id === subject) || MARKET_SUBJECTS[0];
  return list.filter((c) => {
    if (q && !haystack(c).includes(q)) return false;
    if (tab.id !== "all" && String(c.subject || "") !== tab.zh) return false;
    return true;
  });
}

export function marketplaceState({
  courses = [],
  query = "",
  subject = "all",
  lang = "zh",
} = {}) {
  const en = lang === "en";
  const items = filterMarketplace(courses, { query, subject });
  const featured = (subject === "all" && !String(query || "").trim() ? courses : items).slice(0, 6);
  const subjects = MARKET_SUBJECTS.map((row) => ({
    id: row.id,
    label: en ? row.en : row.zh,
    on: row.id === subject,
  }));
  return {
    title: en ? MARKET_COPY.findFitEn : MARKET_COPY.findFit,
    subtitle: en ? MARKET_COPY.fitSubEn : MARKET_COPY.fitSub,
    searchIn: en ? MARKET_COPY.searchInMarketEn : MARKET_COPY.searchInMarket,
    searchPh: en ? MARKET_COPY.searchCoursesEn : MARKET_COPY.searchCourses,
    hot: en ? MARKET_COPY.hotEn : MARKET_COPY.hot,
    picks: en ? MARKET_COPY.editorsPicksEn : MARKET_COPY.editorsPicks,
    empty: en ? MARKET_COPY.emptyEn : MARKET_COPY.empty,
    subjectLabel: en ? MARKET_COPY.subjectLabelEn : MARKET_COPY.subjectLabel,
    joined: en ? MARKET_COPY.joinedEn : MARKET_COPY.joined,
    hours: en ? MARKET_COPY.hoursEn : MARKET_COPY.hours,
    query: String(query || ""),
    subject,
    subjects,
    featured,
    items,
    emptyFiltered: items.length === 0,
  };
}
