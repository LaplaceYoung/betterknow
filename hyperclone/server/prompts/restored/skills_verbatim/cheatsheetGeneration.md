---
name: cheatsheet-generation
description: >-
  当用户明确要一份 cheatsheet / 速查表（基于已上传或上下文中的材料）时使用本流程。
  生成出来的 cheatsheet 由前端直接渲染为可编辑 artifact，无需再导出 PDF；
  允许多轮工具调用（按文件分批、后续微调等）。
  处理多个文件时，每个文件**单独**生成一次工具调用（一次处理一个文件，绝不合并多文件一次处理）；每次新增内容时，需向用户说明当前正在处理哪个文件；全部完成后用普通 generate_content 告知用户 cheatsheet 已生成。
  详细程度选项影响的是内容生成的质量（长度与细节粒度），而不是每批处理几个文件。
  ask_questions 的题干+选项；以及模型回复的语言必须与用户 query 语言一致（例如用户用英语提问则必须用英语问，不得照抄技能内中文模板）。
  支持通过 artifact_update 的 adjust_layout / get_pages 操作自动调整排版，以满足用户指定的页数要求；如果用户 query 已明确页数，直接记录，不要重复询问页数。
  当用户提出会导致 cheatsheet 大幅改动的需求，或模型判断“重写/大改”会比局部编辑更好完成需求时，必须先向用户确认是否允许重写，不要直接执行大幅重写。
  不适用于普通学习笔记 / 文档总结（用 documentReading 或聊天）；
  不适用于纯概念问答（用 conceptExplanation）。
---

# 速查表 / Cheatsheet 生成

按用户澄清结果分支；下列工具名对齐本仓库 Director Agent（`directorAgent.py`）。

> **重要变更**：cheatsheet 现在由 **前端直接渲染为可编辑 artifact**，
> `generate_content` 一旦产出（Director 调用时必须使用 `response_style=cheatsheet:<granularity>`），用户即可在界面里看到并编辑。
> **不需要再调用 `publish_file` 导出 PDF**。
> 如果用户问如何下载 cheatsheet，必须告诉用户：点击 cheatsheet 上方白色框区域里的下载按钮下载。
> 如果用户要求你“保存成 PDF / 导出成 PDF / 帮我下载 PDF”，必须说明你不能用普通 File Publisher 代为保存 cheatsheet，因为 cheatsheet artifact 不能通过常规 `publish_file` 流程保存；用户必须点击前端网页中 cheatsheet 上方白色框区域里的下载按钮自行保存。
> 后续如果用户提出修改诉求，**用 `artifact_update` 工具就地修改 artifact**，不要重新整篇 `generate_content`（除非用户明确要全部重写）。

> **⚠️ 一条铁律：`generate_content(response_style=cheatsheet:<granularity>)` 整轮只调一次，用来「开篇」创建 artifact。**
> 之后**任何**往同一份 cheatsheet 加内容 / 改内容的操作（包括追加新章节）都必须走 `artifact_update`（追加用 `generate_insert`，或者修改编辑getpages等）。再调一次 `generate_content(response_style=cheatsheet:<granularity>)` 会**新建另一份 artifact**，原 artifact 在用户面板上消失。
> 注意：前端和历史记录会显示为 `response_style=cheatsheet` + `cheatsheet_granularity=<granularity>`；但 Director 调用 `generate_content` 时必须使用带粒度后缀的 `response_style=cheatsheet:<granularity>`。

## 工具名对照

| 用途 | 工具名 |
|------|------|
| 生成 cheatsheet 正文（产出可编辑 artifact） | `generate_content`（Director 调用时 `response_style=cheatsheet:<granularity>`） |
| 修改已存在的 cheatsheet artifact（内容） | `artifact_update`（`replace` / `delete` / `insert` / `generate_insert`） |
| **调整排版**（columns / font_size / line_height / page_margin） | `artifact_update`（**`adjust_layout`**） |
| **获取当前页数** | `artifact_update`（**`get_pages`**） |
| **最终可见总结** | `generate_content`（默认 / `response_style=normal`，不要生成 artifact） |
| 附件引用 | `generate_content` 的 `references`：`type=file` + `file_id`（来自 `search_files` 或上传流程） |
| **结束本轮（必调）** | `mark_response_complete` — 见下节 |

### 结束本轮（必做）

在本轮内，与 cheatsheet 相关的工具（`generate_content` / `artifact_update` 等）**全部执行完毕后**，先调用一次普通 **`generate_content`** 输出简短完成说明，然后**必须**再调用 **`mark_response_complete`**。**不要**仅用模型自然语言收尾而不调该工具（否则客户端无法与「本轮已结束」的后处理对齐，例如推荐下一步等）。

- 把「简短确认」放在最后一次普通 **`generate_content`** 里：已生成或已更新 cheatsheet、**最终页数**（若适用）、排版调整一句、欢迎提出修改；仍遵守：**不要**整段复述 artifact 正文。
- 这次总结用 `response_style=normal`（或省略 `response_style`），不要再用 `response_style=cheatsheet:<granularity>`，也不要新建或覆盖 artifact。
- **`mark_response_complete` 须排在最终总结 `generate_content` 之后**，只负责结束本轮；不要依赖 `mark_response_complete.final_message` 输出 cheatsheet 总结。若本轮开头是 `ask_questions` 且仍在等待用户回答，则不要调用；等用户答完后的下一轮再生成/编辑并收尾。
- 若已用普通 `generate_content` 输出完成说明，**不要**再通过 `mark_response_complete.final_message` 输出重复结语（避免双份结语）。

## 适用场景

- 用户**上传了文件**或在上下文中提供了材料，并希望生成 **cheatsheet / 速查表**（含公式、要点浓缩等）。
- 不要与「解释单个概念」或「全文总结问答」混用；纯概念解释见 **conceptExplanation**，文档问答总结见 summarizing 模式。

## 工作流程

**记忆与提问：** 可先 **`memory_recall`** 了解材料相关的**知识背景**；若用户未说明范围、密度、页数或详细程度等，**仍须**通过 **`ask_questions`**（或既有澄清流程）问清（一般 / 详细 / 非常详细）。如果用户 query 已明确页数，直接记录 `target_pages`，不要重复询问页数。**不要**因记忆里泛泛的讲解风格偏好就跳过必要澄清。

### 0. 生成前澄清（必做，每轮首次调用本技能时执行）

在生成或修改 cheatsheet 之前，按缺失信息决定是否调用 `ask_questions`。只是中文把意思给你。你具体问的语言 要是用户query中的语言。

**问题一：页数要求**
> 「你希望这份 cheatsheet 做成几页？（推荐范围 1–6 页）」

- 如用户明确指定页数（如「4 页」「做成 3 页」）→ 记录 `target_pages`，生成/修改后执行场景 D 自动排版调整。
- 如用户明确说「不关心页数」「越多越好」→ 标记为「无页数要求」，跳过场景 D 的自动调整。

**问题二：每份文档的详细程度**
> 「你希望 cheatsheet 中每份文档的内容有多详细？」
> 选项：一般 / 详细 / 非常详细

> **注意：三个选项都是每个文件单独处理一次**（一个文件一次工具调用，绝不合并）。区别只在于生成内容的详细程度：

- **一般**：提取核心要点，简洁精炼。
- **详细**：更充分覆盖每份文档的内容，适当展开细节。
- **非常详细**：最大化保留文档（如 PPT）里的所有细节——生成内容更长、粒度更细，力求不遗漏原始材料的任何重要信息。

记录用户选择的 `detail_level`，在场景 B / A 生成每个文件时，按照如下映射选择 `response_style` 后缀（**初次 `generate_content` 和每次 `generate_insert` 均须使用**）：
- 一般 → `cheatsheet:concise`
- 详细 → `cheatsheet:detailed`
- 非常详细 → `cheatsheet:very_detailed`
- 极度详细 → `cheatsheet:extremely_detailed`

**在 `generate_content` 之前必须已有明确的页数目标（或明确无页数要求）和详细程度**；页数若已在用户 query 中出现，直接使用，不要再问。

### A. 用户未上传文件，或澄清中对「从全部上传材料汇总要点」回答 **否**

1. 用 `generate_content`（`response_style=cheatsheet:<granularity>`，即从 `cheatsheet:concise` / `cheatsheet:detailed` / `cheatsheet:very_detailed` / `cheatsheet:extremely_detailed` 中按步骤 0 确认的 `detail_level` 选一个）**一次**产出**简明扼要**的速查要点（公式、关键结论等；不要先求全再单独压缩）。前端会立刻把它渲染成可编辑 artifact。
2. 生成完毕后**立即执行排版调整流程**（见场景 D），确保最终页数符合步骤 0 确认的目标。
3. 排版调整完成后，调用普通 `generate_content` 简短确认任务完成（**不要**整段复述正文），告知用户 cheatsheet 已生成，并说明最终页数及排版调整结果；如有需要修改的地方，邀请用户继续对话。随后在**同一轮工具序列末尾**调用 **`mark_response_complete`**。

### B. 用户澄清中对「从全部上传材料汇总要点」回答 **是**

1. **每个文件单独处理，绝不合并**：无论有多少文件，**每次只处理一个文件**（一个文件对应一次工具调用）；即使用户要求“全部重新生成”，也按一次一个文件作为参考的逻辑生成。根据步骤 0 确认的 `detail_level` 调整每次生成内容的**详细程度**（而非文件数量）：**一般 → 简洁提取核心要点**，**详细 → 充分展开细节**，**非常详细 → 最大化保留文档所有细节、内容尽量完整**。第一个文件用 `generate_content`（**必须** 按 `detail_level` 选用带粒度后缀的 `response_style`，例如 `response_style="cheatsheet:detailed"`）写入 cheatsheet，`task_title` 中写明文件名。之后每个文件用 `artifact_update` 的 `generate_insert` 插入！
   - **`detail_level` → `cheatsheet_granularity` 映射**（每次调用 `generate_insert` 时必须传此字段）：
     - 一般 → `"concise"`
     - 详细 → `"detailed"`
     - 非常详细 → `"very_detailed"`
     - 极度详细 → `"extremely_detailed"`
   - 然后每次分轮生成的时候, 在每次使用generate content之前，没有必要每次都用read content 否则会很慢。文件直接写在 `generate_content` / `generate_insert` 的 `references` 里（`type=file` + `file_id`）即可，contentGenerator 会自己加载原文。
2. 每次新增的重要内容须带有**标题**，标题风格与已有内容保持一致，**推荐使用二级标题（`##`）**。
3. 在处理下一个批次的时候，利用 `artifact_update` 工具往第一次生成的 artifact 里加内容就好！各批之间不需要任何「中间发布」步骤。
4. **全部批次完成后**，**执行场景 D 的排版调整流程**（按步骤 0 确认的目标页数），确保最终页数符合要求。最后调用普通 `generate_content` 简短告知用户 cheatsheet 已生成完毕及最终页数；随后在**同一轮末尾**调用 **`mark_response_complete`**。

### C. 用户提出修改（任何后续轮次）

**核心原则：不要盲目往后追加。** 用户要求修改时，先判断是在**替换/重写已有内容**、**纯删除**，还是**纯追加**。常见情况：
- 「换成 X」「改成 X」「把这一节简化/重写/替换成 X」→ **优先用 `replace` 一步完成**，不要手动 `delete` 后再 `generate_insert`。
- 「不要 Y 了」「删掉这部分」「精简 / 缩减 / 这部分太多了」且用户没有要求生成替代内容 → 用 `delete`。
- 「扩充 / 再补一些细节 / 在后面加」→ 才是纯追加场景，直接 `insert` / `generate_insert`。
-  如果要删除一段的话，把这段的标题和所有相关的都删掉。所以 `start anchor` 的锚点应该是这个标题。
#### 可能存在的大幅改动 / 重写确认

如果用户的修改需求会影响 cheatsheet 的整体结构、多个章节、主要叙事方式、密度策略或排版目标，或者模型判断“重写整份 / 重写大段内容”会比局部 `replace` 更好地满足用户需求，**不要直接执行重写**。先用与用户 query 相同的语言向用户确认，例如：

> 「这个需求可能需要对 cheatsheet 做比较大幅度的重写，才能更好地完成。你希望我直接重写整份/这几个章节吗？」

- 用户确认允许重写后，再执行对应的大范围 `replace` / 多次 `replace`（仍优先使用 `artifact_update`，不要重新调用 `generate_content(response_style=cheatsheet:<granularity>)` 新建 artifact，除非用户明确要新建一份）。
- 用户不确认或只想小改时，选择最小必要的局部 `replace` / `delete` / `insert`。
- **不要害怕建议重写**：当重写明显更能完成需求时，应主动指出并请求确认；关键是先问清楚，不要擅自大改。

每次调用 `generate_insert` 或 `replace.new_part.mode="generate"` 时，**必须**传 `cheatsheet_granularity`，映射规则与场景 B 相同（见上）。若用户在修改中明确说「更详细」或「简洁一些」，应按用户意图覆盖当前 `detail_level`。

在修改的时候涉及读文件，**仍然每个文件单独处理一次**，不要一次性把所有文件都塞进去，否则效果会很差。

每个 `artifact_update` 仍只能带 1 个操作。需要把已有章节改写成新内容时，使用 `replace`，避免拆成多次 `delete` / `insert` 调用。

**纯追加位置规则**：
- 如果是在现有 cheatsheet **后面继续生成下一份文件 / 下一节内容**，且用户没有指定插入到某个具体位置，`generate_insert` **优先使用 `"position": "end"`**（或省略 `anchor` 与 `position`，工具也会默认追加到文末）。
- 普通续写不要为了“找位置”去复制当前正文里的 `anchor`；旧 anchor 容易失效，也会让模型混淆版本。
- 只有当用户明确要求“插到某一节后面 / 某段文字后面”时，才使用 `anchor`。使用 `anchor` 时必须从 `ACTIVE ARTIFACTS (CURRENT CONTENT)` 逐字复制当前正文里的子串。
- 要插到 artifact 最前面，用 `"position": "start"`；要插到最后，用 `"position": "end"`。`position` 设置后 `anchor` 会被忽略。

1. 用 `artifact_update` 在**对应 `artifact_id`** 上做就地编辑（**每次调用 `operations` 只能含一条操作**；多步请多次调用该工具）。每个 op 把参数放进**同名子对象**里：

   **替换已有内容（推荐用于重写 / 简化 / 改写整节）**：
   - `type: "replace"` —— 原子替换：用 `old_part` 指定旧内容范围，用 `new_part` 指定新内容。`old_part` 固定为**半开区间** `[start_anchor, end_anchor)`：删除 `start_anchor`（含）到 `end_anchor`（不含），保留 `end_anchor`。如果定位或生成失败，artifact 不会被改坏。
   - `new_part.mode: "text"` —— 直接放入已知文字。
   - `new_part.mode: "generate"` —— 调用 content generator 生成替代内容；必须传 `prompt` 和 `cheatsheet_granularity`，需要读文件时传 `references`。
   ```json
   {
     "type": "replace",
     "replace": {
       "old_part": {
         "start_anchor": "## 老章节标题",
         "end_anchor": "## 下一节标题"
       },
       "new_part": {
         "mode": "generate",
         "prompt": "把老章节重写得更简洁，只保留核心公式和关键结论。语言：简体中文。",
         "cheatsheet_granularity": "concise",
         "references": [{ "type": "file", "id": "文件ID" }]
       }
     }
   }
   ```

   **删除**（`type: "delete"`，根据情境选 `mode`）：
   - `mode: "after"` —— 保留 `anchor` 自身，把它**之后到文末**的内容全部删除。适合"把这段之后都删了"「重写文末整段」。
     ```json
     { "type": "delete", "delete": { "mode": "after", "anchor": "## 章节标题" } }
     ```
   - `mode: "between"` —— **半开区间**删除：从 `start_anchor`（**含**）删到 `end_anchor`（**不含**）。`start_anchor` 自身被删，`end_anchor` 保留。最适合"把整个章节连标题一起换掉、停在下一节标题之前"。
     ```json
     { "type": "delete", "delete": { "mode": "between", "start_anchor": "## 老标题", "end_anchor": "## 下一节标题" } }
     ```
    **铁律**：`start_anchor` 和 `end_anchor` 必须是当前 artifact 里**逐字拷贝**的子串（包括标点、空格、Markdown 符号）。删除某一部分时必须把标题也删干净，`start_anchor` 应设为该部分标题。任何改写、近似或省略都会失败。
   - `mode: "exact"` —— 删一段已知精确文本（错别字、单行）。只在前两种不合适时使用；服务端有 fallback 容错。同段重复出现时用 `disambiguate_after` 锚定位置。
     ```json
     { "type": "delete", "delete": { "mode": "exact", "text": "这一句要删掉。", "disambiguate_after": "## 公式" } }
     ```

   **插入文字**（`type: "insert"`，简短内容）：省略 `anchor` 追加到文末；给定 `anchor` 时，新内容会插入到 **`anchor` 最后一个字符的紧后面**（字符级，**不是**节级）。**铁律**：`anchor` 必须是当前 artifact 里**逐字拷贝**的子串；想插到某一节末尾，`anchor` 必须是**这一节的最后一句**，不要拿这一节的标题当 anchor（那样会插在标题和正文之间）。要插到 artifact **最顶端**用 `"position": "start"`；显式追加到**最末尾**用 `"position": "end"`（`position` 设置后 `anchor` 被忽略）。
   ```json
   { "type": "insert", "insert": { "text": "\n\n新增一行。", "anchor": "其中参数 $b = \\Delta f / \\epsilon$。" } }
   ```
   ```json
   { "type": "insert", "insert": { "text": "# 速查表\n\n", "position": "start" } }
   ```

   **生成式插入**（`type: "generate_insert"`，复杂或基于文件的内容）：把生成意图写进 `prompt`，必要时用 `references` 挂文件。普通“继续生成下一份文件 / 下一节内容”优先传 `"position": "end"`，不要无故指定 `anchor`。`anchor` / `position` 的语义和 `insert` **完全一致**——逐字拷贝、插在 anchor 最后一个字之后；要加到一节末尾就用该节最后一句做 anchor，不要用标题；要插到 artifact 最前/最后就传 `"position": "start"` / `"end"`。
   ```json
   {
     "type": "generate_insert",
     "generate_insert": {
       "position": "end",
       "prompt": "根据下一份讲义生成 cheatsheet 的下一部分。语言：简体中文。",
       "cheatsheet_granularity": "very_detailed",
       "references": [{ "type": "file", "id": "文件ID" }]
     }
   }
   ```

2. 内容修改完成后，**执行场景 D 的排版调整流程**（如步骤 0 有页数目标）。
3. 编辑和排版完成后，调用普通 `generate_content` 简短确认，**不要**重新跑 `generate_content` 整篇重写（除非用户明确要全部重写）。随后在**同一轮末尾**调用 **`mark_response_complete`**。
4. **不要**调用 `publish_file`——前端已直接渲染最新 artifact。

### D. 排版调整（按步骤 0 确认的页数目标执行）

**核心策略**：
- **阶段1**：**只用 `font_size` 调整**（范围 4–20）。
  - N > T（页数太多）：**减小** font_size（最少到 4）→ 每页容纳更多内容 → 页数减少
  - N < T（页数太少）：**增大** font_size（最多到 20）→ 每页容纳更少内容 → 页数增加
- **阶段2**：当 font_size **已调到极限**（4 或 20）仍无法满足要求时，才调整 `columns`。
  - 页数仍太多：增加 columns（更多列 → 更密集 → 页数减少）
  - 页数仍太少：减少 columns（更少列 → 更稀疏 → 页数增加）

**禁止**：不要来回切换——这一轮调 font_size、下一轮调 columns、再下一轮又调 font_size，这样永远达不到目标。

**迭代流程**（最多 3 轮）：

```
1. artifact_update(operations=[{ "type": "get_pages", "get_pages": {} }])
   → 获取当前页数 N、当前 font_size F

2. 阶段1 - 纯调 font_size（范围 4–20）：
     IF N > T（页数太多）:
        IF F > 4 → operations=[{ "type":"adjust_layout", "layout":{ "font_size": max(4, F-1 或 F-2) } }]
        ELSE → 进入阶段2（font_size 已极限）
     IF N < T（页数太少）:
        IF F < 20 → operations=[{ "type":"adjust_layout", "layout":{ "font_size": min(20, F+1 或 F+2) } }]
        ELSE → 进入阶段2（font_size 已极限）

3. 再次 get_pages 验证新页数。

4. 如仍未达目标且 font_size 已到极限(4或20)：
     阶段2 - 调 columns：
       N > T → operations=[{ "type":"adjust_layout", "layout":{ "columns": 当前值+1 } }]
       N < T → operations=[{ "type":"adjust_layout", "layout":{ "columns": 当前值-1 } }]

5. 重复直到满足目标或达轮数上限。
```

**注意**：
- 每次 `adjust_layout` **只改一个参数**（要么只改 `font_size`，要么只改 `columns`）。
- font_size 范围是 **4–20**，先用尽这个范围，不要过早碰 columns。
- 若 3 轮后仍未达到目标，先用普通 `generate_content` 告知用户当前页数并说明已尽力调整，邀请手动微调；若场景 D 结束后本轮即结束，仍须再调用 **`mark_response_complete`** 收尾。

## Planner / Director 注意

- **`ask_questions` 语言必须与用户 query 一致**（见「语言一致性」）：英语 query → 英语题干与选项；中文 query → 中文；不得把步骤 0 的中文模板原样塞进工具参数。
- `generate_content(response_style=cheatsheet:<granularity>)` 只产出适合放在 cheatsheet 上的**正文结构**（标题、要点、公式、可选简单表格）；版面与样式由前端 artifact 渲染负责。最终完成说明应使用普通 `generate_content`，不要生成 artifact。
- 凡涉及附件的回答，须在 `generate_content` 的 **references** 中带齐 `file_id`。
  - **例外**：最后一轮给用户回复的时候 非必需 不需要把所有文件加到content generator的reference里面。不然会带来很多延迟。该轮只是简短完成确认，不再生成正文、不依赖原文，`references` 可留空或只带本轮真正引用到的文件。
- 最终对用户说明任务完成时，**不要**整段重复 cheatsheet 正文，简要确认即可，并主动邀请编辑反馈；说明完成后**必须**通过 **`mark_response_complete`** 结束本轮，勿仅靠无工具调用的纯文本结束。
- `artifact_update` 编辑完成后，前端会自动同步最新内容（fallback 模式时服务端会回传 `new_content` 让前端覆盖），无需再触发任何「发布 / 导出」工具。
- 用户询问下载或 PDF 保存时，直接说明下载入口在 cheatsheet 上方白色框区域的下载按钮；不要调用 `publish_file`，也不要声称已替用户保存 PDF。
- 当修改请求可能需要大幅改动或重写时，必须先确认用户是否允许重写；确认前不要调用会大幅改变 artifact 的 `artifact_update`。

## 不要做的事

- ❌ **不要再调用 `publish_file` 导出 PDF**——cheatsheet 现在由前端 artifact 直接渲染。即使用户明确要 PDF 文件（例如「下载成 PDF 给我」），也不要调用 File Publisher；告诉用户必须点击 cheatsheet 上方白色框区域里的下载按钮保存。
- ❌ 不要在用户提出修改后直接重跑 `generate_content` 整篇覆盖——优先 `artifact_update` 做局部修改。
- ❌ 不要在未确认的情况下执行大幅重写 / 多章节重构；如果你判断重写更合适，先反问用户是否允许重写。
- ✅ 每轮首次调用本技能时**必须**先执行步骤 0，确认页数 + 详细程度；若用户 query 已明确页数，只需记录页数，继续补问缺失项。
- ❌ 不要跳过步骤 0 直接生成 cheatsheet——如果页数或详细程度缺失，要正式确认缺失问题。
- ❌ **禁止**在 `ask_questions` 中使用与用户 query **不同语言**的题干或选项（例如用户用英语提问却用中文澄清）——见上文「语言一致性」。
- ❌ 不要与 **conceptExplanation**、纯解题模式混用同一轮目标。
