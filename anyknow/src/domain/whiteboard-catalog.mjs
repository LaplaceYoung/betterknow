/** Leftover whiteboard teaching frames (audio urls already stripped). */

const PYTHAGOREAN_FRAMES = [
  {
    type: "session_ready",
    session_id: "248fd02f72be4bad82bcdd347b8bf237",
    resumed: true,
  },
  {
    type: "board",
    board_content: "Pythagorean Theorem\n\n$a^2 + b^2 = c^2$",
    step_id: 0,
    board_uid: 0,
    page_id: "page-1",
    title: "The Geometric Heart",
  },
  {
    type: "generated_animation",
    caption: "Right triangle rotating around the right-angle vertex",
    scene: "triangle-rotate",
    step_id: 2,
    page_id: "page-1",
  },
];

const PYTHAGOREAN_BASICS_FRAMES = [
  {
    type: "session_ready",
    session_id: "74ac286dbd2648ffa9e8caf4708137e1",
    resumed: true,
  },
  {
    type: "board",
    board_content: "Pythagorean Theorem\n\nFundamental tool for right-angled triangles",
    step_id: 0,
    board_uid: 0,
    page_id: "page-1",
    title: "Introduction",
  },
  {
    type: "speak",
    spoken_text:
      "Today we're diving into the Pythagorean Theorem. It's a foundational tool that bridges geometry and algebra, allowing you to calculate the exact distance between two points.",
    step_id: 1,
  },
];

const REGRESSION_FRAMES = [
  {
    type: "session_ready",
    session_id: "706d4d5c-1b4d-4707-abb0-45fc9b1f4926__b38a83f7-1f82-4f7c-a309-3598f1ac9e7a",
    resumed: false,
  },
  {
    type: "board",
    board_content:
      "# Linear Regression: From Intuition to Practice\n\n## 1. The Geometric Anchor\n- Moving from individual points to the **Data Cloud**\n- Goal: Finding the 'Story' in the aggregate",
    step_id: 0,
    board_uid: 0,
    page_id: "page-1",
    title: "Welcome to Linear Regression",
  },
  {
    type: "speak",
    spoken_text:
      "Welcome to the start of our journey into Linear Regression. Today, we're going to transform the way you look at data—moving from just seeing a list of numbers to seeing a 'story' told by a cloud of points. By the end of this session, you'll be able to visually decode the relationships between variables, which is the essential first step before we ever touch the math of fitting lines.",
    step_id: 1,
  },
  {
    type: "board",
    board_content:
      "## The Bivariate Plane\n\n- **X-axis**: Independent Variable (Input/Cause)\n- **Y-axis**: Dependent Variable (Output/Effect)\n\n- One Dot $(x, y)$ = One Observation",
    step_id: 3,
    board_uid: 1,
    page_id: "page-1",
    title: "Visualizing Relationships",
  },
  {
    type: "generated_image",
    caption: "Mapping Study Hours vs. Test Scores",
    step_id: 5,
    page_id: "page-1",
  },
  {
    type: "speak",
    spoken_text:
      "To see these stories, we use the bivariate plane. Think of the $x$ axis as your input or 'cause', and the $y$ axis as the 'effect' we're interested in. Every single dot you see on this board represents a pair of observations—like a person's height and their weight.",
    step_id: 4,
  },
  {
    type: "speak",
    spoken_text:
      "Look at the white board. In this scatterplot, notice how the dots aren't just random? They form a 'cloud'. The empty space is actually just as important as the dots themselves because it shows us where the data *isn't* going. We're looking for the collective 'drift' of this cloud.",
    step_id: 7,
  },
  {
    type: "circle",
    step_id: 8,
    target_board_id: 1,
    page_id: "page-1",
    snippet: "One Dot x y One Observation",
  },
];

const DERIVATIVES_FRAMES = [
  {
    type: "session_ready",
    session_id: "3a6a3acb733b4508aad6f874195fc8fb",
    resumed: true,
  },
  {
    type: "board",
    board_content:
      "# Derivatives: The Math of Change\n\n- Algebra: Constant rate of change (Straight lines)\n- Calculus: Instantaneous rate of change (Curves)",
    step_id: 0,
    board_uid: 0,
    page_id: "page-1",
    title: "Introduction",
  },
  {
    type: "speak",
    spoken_text:
      "Today, we're going to unlock the power of the derivative. In algebra, you learned how to find the slope of a flat, straight line, but the real world is full of curves. By the end of this session, you'll understand how to measure exactly how fast something is changing at a single, tiny moment in time—whether that's a car accelerating or a stock price moving.",
    step_id: 1,
  },
];

export const PYTHAGOREAN = {
  id: "pythagorean",
  aliases: ["248fd02f72be4bad82bcdd347b8bf237"],
  title: "Visual Pythagorean Theorem Walkthrough",
  resumed: true,
  frames: PYTHAGOREAN_FRAMES,
};

export const PYTHAGOREAN_RESUME = {
  id: "pythagorean-resume",
  title: "Visual Pythagorean Theorem Walkthrough",
  resumed: true,
  frames: PYTHAGOREAN_FRAMES.map((frame) =>
    frame.type === "session_ready" ? { ...frame, resumed: true } : frame,
  ),
};

export const PYTHAGOREAN_BASICS = {
  id: "pythagorean-basics",
  aliases: ["74ac286dbd2648ffa9e8caf4708137e1"],
  title: "Basics of the Pythagorean Theorem",
  resumed: true,
  frames: PYTHAGOREAN_BASICS_FRAMES,
};

export const REGRESSION = {
  id: "regression",
  aliases: ["706d4d5c-1b4d-4707-abb0-45fc9b1f4926__b38a83f7-1f82-4f7c-a309-3598f1ac9e7a"],
  title: "Patterns in the Cloud: Scatterplots and Correlation",
  resumed: false,
  frames: REGRESSION_FRAMES,
};

export const DERIVATIVES = {
  id: "derivatives",
  aliases: ["3a6a3acb733b4508aad6f874195fc8fb"],
  title: "Introduction to Derivatives",
  resumed: true,
  frames: DERIVATIVES_FRAMES,
};

export const WB_SESSIONS = [PYTHAGOREAN, PYTHAGOREAN_RESUME, PYTHAGOREAN_BASICS, REGRESSION, DERIVATIVES];
