---
name: document-reading
description: >-
  For requests focused on understanding document content: summarize, read
  together, or guided close reading. If the user prompt is already specific
  and complex, prioritize it over preset modes—do not force ask_questions for
  mode choice; reason about tools. For complex detailed summaries, optionally
  use content_planner then multiple generate_content calls in one user-facing
  round; then one mandatory mind map. Concise/detailed summary paths require
  an inline diagram tag in generate_content after summary text; guided reading keeps diagrams optional.
  Not triggered merely by file upload; not for reteaching, cross-doc compare
  as main goal, cheatsheet, or concept-only Q&A without digesting the text.
---

# 文档阅读与消化（document-reading）

工具名对齐本仓库 Director Agent（`directorAgent.py`）。与 **`get_skills`** 的 `skill_name`：**`documentReading`**（文件夹名一致）。

## 工具名对照

| 说明 | 本仓库工具名 |
|------|----------------|
| Drive / 已保存文档 | `search_files` |
| **将文件内容读入上下文（必须在 ask question 前调用）** | **`read_content`** | 这样你作为directorAgent也对文件有大体认识 知道问用户什么问题 怎么计划。
| 生成长文（总结、带读稿等） | `generate_content` |
| 总结/带读前的内容大纲（复杂详细总结时选用） | `content_planner` |
| 思维导图 / 结构图 | `generate_content` 内联 diagram tag（常用 `mermaid` 表达层级与思维导图；复杂视觉需求可用 `gemini-image`） |
| 澄清表单 | `ask_questions` |
| 网页补充（一般非首选） | `search_and_summarize_web`（**Drive 已启用时不要用于替代文档**） |
| 结束本轮并等待用户 | `mark_response_complete` |

附件/已找到的文件：在 `generate_content` 的 **`references`** 中传入 `type=file` + `file_id`（与 `conceptExplanation` / cheatsheet 技能相同）。

---

## 用户意图优先于预设模式（重要）

下文中的 **Concise / Detailed / 引导精读** 与 **`ask_questions` 模板**是常见路径，**不是**唯一合法路径。

- 当用户的 **prompt 本身已经比较复杂、比较具体**（例如已写明要「按第三章逐段讲」「先对比两段论点再总结」「只提取方法学部分并附一页导图」等），**无法或不需**生硬套进上述三选一模式时：**以用户原话里的任务为准**，优先级**高于**「先问用哪种模式读文档」。
- 此种情况下 **不必** 再发起「简详 / 精读」类选择题去让用户选模式；由 **Director 自行推理** 如何组合 **`search_files`**、**`content_planner`**（如需要）、**`generate_content`**（含内联 diagram tag）、**`mark_response_complete`** 等工具完成请求。
- 仍须落在本技能范围：**围绕文档的阅读、消化、总结、带读**；若用户其实在要对比稿、做题、做 cheatsheet 等，仍应改走对应技能。
- 若用户请求已隐含「分批 / 一次处理多文件」等，同样**以 prompt 为准**，未冲突时不必为形式而追问。

## `memory_recall` 与澄清（与全局一致）

**`memory_recall`** 返回的应主要是**与文档/主题相关的知识背景**，便于调整详略与术语；**不是**「已选好模式」的充分条件。除非用户在本轮话里或**非常具体**的记忆已固定「简详 / 精读 / 多文件顺序」等，否则仍用 **`ask_questions`** 澄清；**勿**因笼统的「喜欢简短」类记忆跳过模式选择。

---

## 何时使用本技能（重要）

**使用**——用户意图落在「**吃透这份材料在说什么**」，例如：

- 总结、摘要、提炼要点（concise / detailed summarize）
- 帮读、导读、带我读一遍、精读、digest
- 想了解某篇论文/章节/全书**内容本身**在讲什么、结构如何、核心论点是什么

**不要使用本技能**——仅因用户**上传了文件**并不够；若主目标是下面一类，请走**对应技能或通用流程**，而非本技能：

- **把材料改写成别的成果**：例如系统「再教一遍」课程式重讲（偏 **conceptExplanation** 或教学活动）、**对比**多篇文档作为主要任务、**做题/解题**、生成 **cheatsheet PDF**（**cheatsheetGeneration**）、**闪卡/测验**为主、**视频课**为主等
- **不涉及通读/消化正文**：只问一个孤立知识点、且不必依托用户指定文档时，更偏 **conceptExplanation** 或普通问答

**边界**：若用户既想「总结」又想「对比另一篇」——以**更主导**的意图选型；对比为主则**不用**本技能；总结为主可本技能完成主文档后再视情况扩展。

---

## 流程总览

1. 确认适用本技能后，用 **`get_skills`** 加载本文件（若尚未加载）。
2. **先判断是否属于「用户意图优先」**（见上一节）：若是，则跳过模式类澄清，直接按用户描述编排工具；否则再考虑 **澄清**（见下）：阅读模式 +（若多文件）批量策略。遵循「何时不必问」规则，**不要**为已知的偏好重复提问。
3. **`search_files`**（Drive）或使用本轮已提供的 `file_id` 定位文件后，**在任何 `generate_content` 之前必须先调用 `read_content`** 将文件内容读入上下文，确保模型拥有完整原文再进行总结/带读。
4. 按分支调用 **`content_planner`**（可选）、**`generate_content`**（如需图示，在正文中放内联 diagram tag），并在需要等待用户时使用 **`mark_response_complete`**（见 `systemPrompt.txt`）。

---

## 澄清：`ask_questions`

每个问题需含：`question`、`options`（字符串数组）、`is_multiple`、`allow_custom`（通常 `true`）。题干与用户语言一致。

### 何时提问、何时省略（与 conceptExplanation 一致）

在新问题之前，系统提示里常会先 **`memory_recall`**；同一轮里记忆可能已在上下文中。**不要死板**：

- 若用户 **prompt 已足够具体、复杂**，已见上文 **「用户意图优先于预设模式」**：**不要**再用 **问题 1** 让用户选简详 / 精读；直接执行。
- 若**本轮用户话里**或 **memory / 近期对话**里，对某一题**已有明确答案**（例如已说「简要总结即可」「我要精读」「三份文件请分批处理」「全部一起总结」），则**不要**再为该项发起对应选择题；可**整题省略**，或只问仍缺的信息。
- **仅当**既不属「用户意图优先」情形，且对「阅读模式（简详 / 精读）」或「多文件策略（一次 vs 分批）」**仍不清楚**时，才用下方模板调用 **`ask_questions`**（可只包含仍需澄清的 1～2 题，不必凑满）。

### 问题 1 — 阅读/产出模式（信息不足时再问）

在用户与记忆中**尚未明确**下列偏好时提问，例如：

- **Question（示例，请本地化）：** How would you like to work with this document?
- **Options（建议三项）：**
  - **Concise summary** — 简短摘要，抓主干，篇幅短
  - **Detailed summary** — 更具体、带结构、覆盖重要细节与逻辑的总结
  - **Guided close reading** — 按文档结构 **section by section** 引导精读（见下文专节）
- `is_multiple`: false  
- `allow_custom`: true  

### 问题 2 — 多文件策略（≥3 个相关文件且信息不足时再问）

当本轮任务涉及 **≥3 个文件**（多附件、或 `search_files` 返回多文件且用户都要处理），且用户话里与记忆中**均未说明**希望一次处理还是分批时：

- **Question（示例）：** There are multiple files. How should I process them?
- **Options：**
  - **All at once** — 在一次或连贯流程中一并处理（适合总览、统一摘要；注意上下文与引用清晰）
  - **In batches** — 分批处理（例如每批 1～2 个或按用户指定；每批总结后再进入下一批，避免单轮过载）
- `is_multiple`: false  
- `allow_custom`: true  

用户作答后（或已无需提问时）再进入下方 **分支 A / B** 执行 `search_files` / `generate_content` 等。

---

## 分支 A：Concise / Detailed 总结

1. 确保已有所需 **`file_id`**（`search_files` 或上传流程）。

### A1 — Concise（简要总结）

2. **单次** **`generate_content`** 即可（除非用户另有明确要求）：**结构化**、逻辑清晰；**`references`** 传入文件；**`response_style`** 通常 `normal`；引用格式见内容生成器通用提示。  
3. **思维导图（强制）：** 该次总结正文中或正文之后 **必须** 通过 **`generate_content` 内联 diagram tag** 放一张总览图（优先 `diagram-subtype: mermaid`，必要时 `gemini-image`）。
4. **`mark_response_complete`**。

### A2 — Detailed（详细总结），文档较简单

2. **单次** **`generate_content`**：篇幅与细节强于 A1，仍要求结构化和引用规范。  
3. **思维导图（强制）：** 同上，总结后 **一张** 总览导图。  
4. **`mark_response_complete`**。

### A3 — Detailed（详细总结），文档**较复杂**且有需要时：先 **`content_planner`**

适用于长文、多章节、论文、书籍章节等：需要**分块**写透、又希望**同一轮**内连续交付「完整详细总结」时（用户未要求拆成多轮对话等待）。

2. 调用 **`content_planner`**：  
   - **`task_description`**：说明是「对指定文档做详细总结」、材料类型、用户侧重的维度（方法、结论、论证链等）；可注明将按大纲分多次 `generate_content`。  
   - **`references`**：可传 `type=file` + `file_id`（与 `generate_content` 相同），便于 planner 结合全文结构出大纲。  
   - 大纲为**初稿**：可微调顺序与合并，不必机械执行；类型说明见 **conceptExplanation** 技能中 `content_planner` 一节（含内联 diagram 类型 hint 等）。

3. **同一 user-facing round 内可多次 `generate_content`（本技能下的明确例外）：**  
   - 按 `content_planner` 的 `steps`（或合并后的块），**每一块一次** `generate_content`，**`guideline` 只写当前这一块**；块与块之间衔接清楚（可提示「上文已覆盖…本节讲…」）。  
   - **`has_more_response_after_this_reply`**：除**最后一次** `generate_content` 外设为 **`true`**，最后一次设为 **`false`**，使同轮内可连续生成而不被系统当成「已该停给用户」。  
   - **不强制**「一轮 user-facing 只能调一次 generator」——**仅在本小节 A3** 成立；**A1 / A2** 仍以单次为主；**分支 B 精读**仍保持一节一轮、中间要停给用户。  

4. **思维导图（强制）：** 上述**全部**总结段落输出完毕后，在最后一次 **`generate_content`** 的正文中通过内联 diagram tag 放一张覆盖**整份详细总结**的结构总览（不必为每个 `generate_content` 各画一张）。

5. **`mark_response_complete`**。

**说明：** 若用户或场景更适合「多轮对话、每轮一块」（例如要每段后确认），不要用 A3 的连发方式，可改为**一轮一块** + **`mark_response_complete`**，此时每轮仍可按需单次 `generate_content`；导图可在「整份详细总结」在对话中全部完成后的**最后一轮**强制一张，或按分批规则处理。

---

## 分支 B：引导式精读（Guided close reading）

1. 取得文件内容与结构（`references` + 必要时先 **`generate_content`** 仅用于内部提纲，或直接从材料推断章节；以**对用户可见的讲解**为主）。
2. **按文档原有结构**（章节、Section、大标题）推进：**每一 user-facing round 最好只覆盖一个 section**（与 `conceptExplanation` 分步节奏一致）。  
3. 每一轮讲解中注重：
   - **结构化、逻辑性**：本节在全书/全文中的位置、与前后节的**衔接或对比**
   - **核心总结**：本节要点、论据或故事线
   - **启发式问题**：1～2 个帮助用户思考（不要求当堂测验，重在引导联系与反思）
4. 每讲完一节：**`mark_response_complete`**，等用户回应后再进入下一节；**不要**在用户未确认时连续多节 `generate_content`。
5. **思维导图（可选）**：可在**某一节结束后**若该节概念网复杂则局部导图；或在**整本书/整份文件带读完成后**给一张**总览导图**。由模型判断是否有帮助；通过 **`generate_content` 内联 diagram tag** 请求图示，`content-prompt` 具体说明要表达的层级与主题关系。

---

## Drive 与检索

- **Drive 已启用**：用 **`search_files`** 找材料；**不要**用网页搜索替代用户文档作为主依据。  
- 若用户明确要对比外部资料，再酌情 **`search_and_summarize_web`** 作为补充。

## 不要做的事

- 不要仅因「有附件」就自动选用本技能；对照上文「何时使用」。  
- 精读模式下不要一轮塞多个 section；不要跳过 **`mark_response_complete`** 强行连播。  
- 不要把本技能当成 cheatsheet、考试题生成、或纯概念课的主路径。
