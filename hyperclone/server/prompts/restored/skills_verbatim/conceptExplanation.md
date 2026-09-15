---
name: concept-explanation
description: >-
  Explains a single concept when the user asks for conceptual clarification.
  When the user wants to summarize, read, or closely digest document content
  itself, use skill documentReading instead. Do not mix with problem-solving.
---

# 概念解释（concept-explanation）

与 `promptSet.json` 中 `id: concept-explanation` 一致。按用户澄清答案选择路径；下列工具名已对齐本仓库 Director Agent（`directorAgent.py`）。

如果用户只是简单追问 一个很简单的问题。没必要每次都要follow本skills中的每个细节。回答的长度要符合用户的预期。能简单则简单来。

## 工具名对照（promptSet 用语 → 本仓库）

| 说明           | 本仓库工具名                 |
|----------------|------------------------------|
| 澄清（选择题表单） | `ask_questions`          |
| 网页检索       | `search_and_summarize_web`   |
| Drive / 网盘   | `search_files`               |
| 讲解大纲与步骤规划 | `content_planner`        |
| 生成讲解正文   | `generate_content`           |
| 图示（Mermaid / Desmos / Gemini 插图） | `generate_content` 内联 diagram tag |
| 互动 HTML 动画 | `generate_html_animation`（独立工具，勿内联） |
| 配图搜索       | `generate_content` 内联 image-search tag |
| 教学视频       | `generate_instructional_video` |
| 结束本轮并等待 | `mark_response_complete`     |

## 必须停下：`mark_response_complete`（硬规则）

只要**已经展示给用户**的正文里**明确在向用户提问、索要确认、或请用户选择/表态**（含 comprehension check、「是否清楚」「请回复后再继续」等），**必须**立刻 **`mark_response_complete`** 结束本轮，**禁止**在同一 user-facing round 里继续调用 **`generate_content`** 去讲下一节、下一 `step` 或续写大纲里其它 section。**禁止**在「还在等用户说话」时连续扫完 outline 里多节内容。  
（与 `systemPrompt.txt` 中 **When to stop (crucial)** 一致；使用 **`ask_questions`** 等待表单时，流程本身会停轮，同样不得在未收答复前强行续写。）

## `content_planner`（内容规划）

在下列情况**应优先**调用 **`content_planner`**，在正式讲解前产出**讲解大纲**（要讲哪些块、先后顺序、各块目标），并可提示**是否可能需要**配图、内联 diagram、内联 image-search、补充检索等——仅为**初步计划**。

**适用**：用户问题涉及**较复杂概念**，且明确或隐含希望**分步**或**深入、系统**地理解（例如澄清中选「Step by step」「Comprehensive and in-depth」等）。

**与 Action Planner 的分工**：高层流程（先检索、再规划、再生成）仍由动作计划描述；**具体讲哪些知识点、章节结构**交给 **`content_planner`**。**不要**在动作计划里把每个知识点拆成一长串独立步骤去罗列。

**灵活性（重要）**：`content_planner` 的输出**不得机械执行**。Director 应**大体遵循**大纲顺序与覆盖意图，但根据对话与用户反馈，**有权**调整是否调用某工具、是否插入图示、是否追加检索，以及实际措辞与详略。

**典型顺序**（未启用 Drive 且需检索时）：`search_and_summarize_web`（或 `search_files`）→ **`content_planner`** → 按需 `generate_content`（可在正文中插入内联 diagram tag 或 image-search tag）。

**与 `mark_response_complete`：** 大纲的 `step_objective` 中应写明：在**向用户提问或 check-in 之后**、**讲完一个大纲节准备进入下一节之前**，都要 **`mark_response_complete`** 并等待用户；**不得**在仍等待用户回复时编排「立刻连发多节正文」。详见上文 **「必须停下」** 与下文「用户需作答时禁止连发」。

## 每轮输出的粒度（默认，重要）

### 共性（凡使用 `content_planner` 大纲时）

- **章节边界（硬约束）**：任意连续的一段生成（无论跨多少 **user-facing 轮**、或**同一轮**内调用多少次 `generate_content`），**累计不得覆盖超过一个大纲 section**（一个 `step_name`）：每条 `guideline` 仍应只锚定**当前这一节**；**不要**无用户明确要求就把**多个**大纲节拼进同一条 `guideline`，也**不要**在一轮里用多次 `generate_content` **扫完多节**。  
- **一节 ≠ 必须一轮、也 ≠ 只能一次 `generate_content`**：某一节内容若多，可以**拆到多轮**慢慢讲深；也可以**同一轮**内**多次**调用 `generate_content`，只要**仍在同一节**、且遵守下一条「用户需作答时禁止连发」。**没有**「每节只能调一次 content generator」的限制。  
- **用户需作答时禁止连发（必须执行）**：若**当前已展示给用户的正文末尾**明确在**等待用户**（提问、请确认、请选择是否继续、理解检查等），**必须** **`mark_response_complete`**，**禁止**在未收到用户下一条消息前**再调** `generate_content` 或去写 outline **其它 section**。**禁止**用「同轮多次 generator」当借口跳过等待用户——**一问一停**。  
- **节与节之间**：**讲完并结束当前大纲节**（该节在对话中已收口、准备进入下一 `step`）→ **`mark_response_complete`** → 等用户后再讲**下一节**。  
- **例外**：仅当用户**明确**要求「一次讲完多节」「把第 x、y 部分合并讲」「跳过确认连续往下」等，才允许跨越「一节」边界。  
- **简短 / 普通**（未用大纲、单一小问题）：仍可一次答完。

### 单次 `generate_content`：忌在**一次调用**里堆太多小点

- **不要**在**同一次** `generate_content` 的 `guideline` 里安排**过多**彼此独立的子点/小标题，导致输出变成「一长串略讲」，每点都**讲不透**。  
- 若发现按当前结构会变成「点很多、每点都很薄」，**应改为多次**调用 `generate_content`（可**同一 user-facing round** 内连续调用，仍须遵守「用户需作答时禁止连发」）：**每次**聚焦**更少**的主题，把每个小点**写充分**（定义、例子、边界等按需展开）。  
- **不必**为拆而拆：若只有少数要点且篇幅允许**在同一次**里各自讲到位，**可以**一次写完；以「是否对得起深度」为准，**避免**机械地拆成很多次，也**避免**一次里条数夸张地多。

### `generate_content` 的 `response_style`（与澄清选项对齐，重要）

- **「Comprehensive and in-depth」/ 深入、全面**：必须使用 **`response_style=normal`**（走 **`generalGuideline.txt`** 等常规内容生成提示），**禁止**用 **`step_by_step`**。深入是**叙述与论证上**的深，不是教学「分步互动」模板。  
- **「Step by step」/ 分步**：必须使用 **`response_style=step_by_step`**（加载 **`step-by-step.txt`** + general），与下面的分步粒度一致。

### 深入、全面模式 — 如何讲完一大纲节（区别于分步）

- **`response_style=normal`**，**禁止** `step_by_step`（见上）。  
- **不跨节**：见上文「章节边界」；**允许**为**同一大纲节**使用**多轮**或**同轮多次** `generate_content`，把该节**写全、写深、写透**（定义、动机、论证、例子、易混点、与相邻概念的关系等）。**不是**「每节只能调一次 generator」，也**不是**「每轮必须讲完一整节」——节大则可以多轮/多次，但**始终不越过当前 `step` 的边界**。  
- **不要**在深入模式下套用分步模式的「每轮只推进一个微点」；微点拆分**仅**属于 **step_by_step**。  
- **若某段输出末尾**已在问用户、等确认，**不得**立刻再调 `generate_content`（见上文「用户需作答时禁止连发」）。  
- **该大纲节全部讲完后**：check-in → **`mark_response_complete`** → 再进入下一节（用户回复后）。

### 分步模式（`response_style=step_by_step`）— 补充

- **不要**一次跨 planner 的多个 section；一节之内可拆成**多轮微步**（见下）。  
- **每一轮至多大点里的一个小点**；遇**复杂公式、推导**时进一步收窄；**收窄覆盖面但不牺牲该微点的讲透程度**。  
- Check-in、分割线、可视化等见 **`step-by-step.txt`** 与上文「分步」路径。

## Drive 已启用时

使用 `search_files` 查找用户 Drive 中的材料。**不要**使用 `search_and_summarize_web`。

## 澄清：只用 `ask_questions`（不用已移除的 clarification 工具）

在新问题之前，系统提示里常会先 **`memory_recall`**；同一轮里记忆可能已在上下文中。**`memory_recall` 侧重领域知识/背景**（学过什么、哪块熟/不熟），用来**细化选项与深度**，**不能**因为记忆里有一句笼统的「要简单/要深入」就当作本轮已澄清完毕。

- **仍要问**：本轮目标、范围、模式（简详/分步/精读等）在**用户原话或对话**里仍不清楚时，**必须**用下方模板发起 **`ask_questions`**（1–3 题，可按记忆**改写选项**，例如预填知识水平）。
- **可省略或合并**：仅当用户原话、或 memory/对话里对**本题**已有**明确、具体**答案时（例如已写明「只要直觉」「按考研范围」），才可省略对应题或合并成更短一问。**单凭模糊风格偏好不得省题。**

题干与选项请**与用户语言一致**。

### 标准题目模板（`ask_questions` 参数）

调用时每个问题需包含：`question`、`options`（字符串数组）、`is_multiple`、`allow_custom`（通常 `true`）。

**1. 知识水平**（若未从用户表述或记忆中明确）

- Question（示例英文；请本地化）：`What is your knowledge level regarding this concept?`
- Options: `["Beginner", "Intermediate", "Advanced"]`
- `is_multiple`: false  
- `allow_custom`: true  

**2. 讲解形式**（若本轮或记忆中**尚未明确**偏好深度/形式时再问）

- Question（示例）：`Which kind of explanation do you want?`
- Options: `["Simple and concise", "Standard", "Step by step", "Comprehensive and in-depth", "Video explanation"]`
- `is_multiple`: false  
- `allow_custom`: true  

**3. 范围与侧重点**（多选）

- Question（示例）：`What is the scope of the question, or what aspect would you like to focus on?`
- Options：**根据用户当前问题自拟**若干侧重点（如子主题、应用场景、易混点等），勿用空泛占位。
- `is_multiple`: **true**（本题为多选）  
- `allow_custom`: true  

用户作答后，再按下方「简短 / 普通 / 分步 / 深入 / 视频」路径调用检索与 `generate_content` 等。**在未启用 Drive、且仍需检索时**，应在发起网页检索前完成必要的澄清（除非用户已把偏好说满，可跳过）。

## 简短回答

1. `search_and_summarize_web`（未启用 Drive 时）收集信息。  
2. 使用 `generate_content` 生成解释；在指令中要求**具体、直接**，覆盖重要事实。  
3. 静态图示（流程图、关系图、坐标图、插图）在 `generate_content` 的 `guideline` 中要求正文合适位置插入内联 diagram tag（mermaid / desmos / gemini-image）。**不要**为这类图调用 `generate_html_animation`。  
4. 仅当需要**可交互、可拖动/分步演示**的 HTML 动画时，在讲完相关文字后调用 **`generate_html_animation`**（`instruction` 写清交互与学习目标）。  
5. 结构简单时**不必**调用 `content_planner`。

## 普通（normal）回答

与简短类似，但更覆盖要点，核心信息仍要**具体**呈现。内联 diagram 规则同上。结构简单时可跳过 `content_planner`。

## 分步（step-by-step）回答

计划**只能有两步**：

1. **第一步**：`search_and_summarize_web`（或 Drive 模式下 `search_files`）收集足够信息。  
2. **第二步**：规划并执行内容生成——若主题**结构复杂**，先在执行说明中要求调用 **`content_planner`** 再 `generate_content`；否则可直接 `generate_content`。使用 `generate_content` 时 `response_style=step by step`；遵守「每轮输出的粒度」：**不要**一次覆盖 planner 的多个 section；**每轮至多大点中的一个小点**（公式/推导场景更要拆细），但**该小点仍要讲透**；在 `guideline` 里只布置**当前这一微步**，讲完即 **`mark_response_complete`**，用多轮把一节拆薄、放慢。**可视化不得因分步而省略**：在需要时应要求 `generate_content` 在正文合适位置插入内联 diagram tag（如 `diagram-subtype: gemini-image/mermaid/desmos`）与/或内联 image-search tag，与某一微步或一小节绑定，规则同简短/普通及上文分步补充。  
   第二步完成后整体计划即结束。

## 深入、全面（in-depth）

相关约束主要写在 **「每轮输出的粒度」** 中的 **「深入、全面模式 — 每一轮讲什么」** 与 **`response_style` 选择**两小节。

1. 按需检索：`search_and_summarize_web` 或 `search_files`（Drive 规则不变）。  
2. 对**结构复杂或覆盖面大**的讲解，先调用 **`content_planner`** 生成大纲（见上文「灵活性」说明）。  
3. **`generate_content`**：必须使用 **`response_style=normal`**（**`generalGuideline`** 路径），**不得**使用 **`step_by_step`**。  
4. **大纲节的交付**：每个大纲 **section** 内应**完整、充分、深入**（可用**多轮**或**同轮多次** `generate_content`，见「每轮输出的粒度」）；**禁止**整份大纲单次讲完；**禁止**无用户明确要求就跨越多个 section；**禁止**在**文末明确需要用户回答**时紧接着再调 `generate_content`。  
5. **每讲完大纲中的一节**（该 `step` 已收口）：向用户**简短确认** → **`mark_response_complete`** → **待用户回应后**再讲下一节。  
6. Action Planner **不要**把「每一小节」拆成大量并列步骤；小节推进由**用户确认 + 多轮对话**驱动，计划中保留少数高层步骤即可（检索 → 规划 → 分多轮生成与互动）。

## 视频讲解

先网页检索，再直接调用 `generate_instructional_video`。

## 所有模式（可选）

若在回复或步骤末尾，真实照片或现有网页图像能明显帮助理解，可要求 `generate_content` 在正文合适位置插入内联 image-search tag 补充相关图像；不要单独调用 `search_images`。

## 不要做的事

- **已向用户提问或等待确认时**，不 **`mark_response_complete`** 就继续 **`generate_content`** 扫下一节或多节 outline——见 **「必须停下」**。  
- 与用户「总结 / 帮读 / 精读某文档」的需求混淆——应走 **`documentReading`** 技能，而非本模式。  
- 与解题（problem-solving）模式混用。  
- Drive 模式下使用网页搜索（见上文）。
