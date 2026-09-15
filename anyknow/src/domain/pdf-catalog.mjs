/** Leftover PDF SplitLayout frames (tts urls already stripped). */

const PYTHAGOREAN_FRAMES = [
  {
    type: "session_ready",
    session_id: "b5b76655-e298-4560-9920-e00034cd51a2",
    resumed: false,
  },
  {
    type: "sync_pdf_state",
    pdf_state: {
      revision: 1,
      file_id: "70091e788b064b9c8215eb05569404f1",
      annotations: [],
    },
  },
  { type: "go_to_page", page: 1, step_id: 0 },
  {
    type: "speak",
    page_index: 0,
    step_id: 0,
    say: "没问题，我们继续深入看这一页。刚才你问到如何用一句话总结，这一页的“Definition”部分给出了最严谨的定义。",
  },
  {
    type: "speak",
    page_index: 0,
    step_id: 1,
    say: "要应用这个定理，首先得认清三角形的各个部位。请看“Understanding the Components”这部分。",
  },
  {
    type: "annotation",
    annotation_type: "highlight",
    page_index: 0,
    step_id: 2,
    text: "Legs (𝑎 and 𝑏)",
    say: "直角边就是 $a$ 和 $b$，它们是相交形成 90 度直角的两条较短的边。",
  },
  {
    type: "annotation",
    annotation_type: "highlight",
    page_index: 0,
    step_id: 3,
    text: "Hypotenuse ( 𝑐)",
    say: "斜边 $c$ 是最长的那条边，它就在直角的正对面。",
  },
  {
    type: "speak",
    page_index: 0,
    step_id: 4,
    say: "理解了这些部分，我们就能引出大家最熟悉的那个公式了。",
  },
  {
    type: "annotation",
    annotation_type: "circle",
    page_index: 0,
    step_id: 5,
    rect: { x: 0.12095147906279337, y: 0.5232558375574164, w: 0.10796110516198595, h: 0.01626375300992654 },
    say: "这就是核心公式：$a^2 + b^2 = c^2$。只要知道其中任意两条边的长度，你就能算出第三条。",
  },
  {
    type: "annotation",
    annotation_type: "annotate",
    page_index: 0,
    step_id: 6,
    keyword: "𝑎2 + 𝑏2 = 𝑐 2",
    text: "𝑎2 + 𝑏2 = 𝑐 2",
    say: "我们来拆解一下这个公式的含义。 所以公式告诉我们：两个小正方形的面积加起来，刚好等于那个大正方形的面积。",
    content: "- **$a, b$**: 直角边 (Legs)\n- **$c$**: 斜边 (Hypotenuse)\n- **平方 ($x^2$)**: 代表以该边长为边形成的正方形面积。",
  },
  {
    type: "speak",
    page_index: 0,
    step_id: 7,
    say: "为了看清楚公式怎么用，页面下方给出了一个经典例子。假如直角边分别是 3 和 4。",
  },
  {
    type: "annotation",
    annotation_type: "circle",
    page_index: 0,
    step_id: 8,
    rect: { x: 0.44531146506924796, y: 0.8023826540073945, w: 0.10853564232301056, h: 0.016263644263257996 },
    say: "第一步就是代入公式：$3^2 + 4^2 = c^2$。",
  },
  {
    type: "speak",
    page_index: 0,
    step_id: 9,
    say: "到这里，你能心算出 3 的平方加上 4 的平方等于多少吗？",
  },
  {
    type: "ask",
    step_id: 10,
    page_index: 0,
    mode: "open",
    question: "计算 $3^2 + 4^2$ 的结果是多少？",
  },
  { type: "done", step_id: 12 },
];

export const PYTHAGOREAN = {
  id: "pythagorean",
  aliases: ["b5b76655-e298-4560-9920-e00034cd51a2"],
  title: "Pythagorean Theorem Note",
  filename: "pythagorean.pdf",
  resumed: false,
  frames: PYTHAGOREAN_FRAMES,
};

export const PYTHAGOREAN_RESUME = {
  id: "pythagorean-resume",
  title: "Pythagorean Theorem Note",
  filename: "pythagorean.pdf",
  resumed: true,
  frames: PYTHAGOREAN_FRAMES.map((frame) =>
    frame.type === "session_ready" ? { ...frame, resumed: true } : frame,
  ),
};

const STATS_FRAMES = [
  {
    type: "session_ready",
    session_id: "3ae6a64dc031429c99390b52715e84fd",
    resumed: true,
  },
  {
    type: "sync_pdf_state",
    pdf_state: {
      revision: 0,
      file_id: "stats-notes",
      annotations: [],
    },
  },
  { type: "go_to_page", page: 1, step_id: 0 },
  {
    type: "speak",
    page_index: 0,
    step_id: 0,
    say: "Let's walk through these statistics notes. This page is a great refresher on the core pillars of inference: the Central Limit Theorem, Hypothesis Testing, and Regression.",
  },
  {
    type: "annotation",
    annotation_type: "highlight",
    page_index: 0,
    step_id: 1,
    text: "Central limit theorem",
    say: "We'll start with the Central Limit Theorem, or CLT. This is the bedrock of statistics because it explains why the Normal distribution shows up everywhere.",
  },
  {
    type: "annotation",
    annotation_type: "circle",
    page_index: 0,
    step_id: 2,
    rect: { x: 0.095, y: 0.108, w: 0.756, h: 0.027 },
    say: "The note says for $iid$ samples, the sample mean tends toward a Normal distribution. $iid$ stands for independent and identically distributed—basically, every data point is a fair, separate draw.",
  },
  {
    type: "annotation",
    annotation_type: "annotate",
    page_index: 0,
    step_id: 3,
    keyword: "Central limit theorem",
    text: "Central limit theorem",
    say: "The beauty of the CLT is that the original data doesn't have to be Normal. If you take enough samples, their average will eventually follow a bell curve centered at $\\mu$. Think of rolling dice: a single roll is flat, but the average of 100 rolls will almost always be close to 3.5 because of this theorem.",
    content: "Central Limit Theorem (CLT)\n\n- iid: Independent and Identically Distributed.\n- Sample mean: X̄ ~ N(μ, σ²/n)\n- As n grows, variance σ²/n shrinks.",
  },
  {
    type: "annotation",
    annotation_type: "highlight",
    page_index: 0,
    step_id: 4,
    text: "Hypothesis testing",
    say: "Next, let's look at how we make decisions using data. In hypothesis testing, we always start with a 'status quo' assumption.",
  },
  {
    type: "annotation",
    annotation_type: "circle",
    page_index: 0,
    step_id: 5,
    rect: { x: 0.095, y: 0.162, w: 0.353, h: 0.013 },
    say: "We call the status quo the Null Hypothesis, $H_0$, and the challenger the Alternative, $H_1$.",
  },
];

export const STATS_NOTES = {
  id: "stats-notes",
  aliases: ["3ae6a64dc031429c99390b52715e84fd", "stats_notes.pdf"],
  title: "Statistics Notes Walkthrough",
  filename: "stats_notes.pdf",
  resumed: true,
  ink: [
    { class: "pdf-formula", text: "CLT" },
    { class: "pdf-example", text: "H₀  ·  H₁" },
  ],
  frames: STATS_FRAMES,
};

export const PDF_SESSIONS = [PYTHAGOREAN, PYTHAGOREAN_RESUME, STATS_NOTES];
