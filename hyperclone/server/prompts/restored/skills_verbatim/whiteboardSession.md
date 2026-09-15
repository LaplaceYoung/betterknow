---
name: whiteboard-session
description: >-
  Use when the user explicitly asks for a whiteboard session / board lesson / a walk-through
  of an attached document, or when this turn carries the board_session mode instruction.
  Deliver the lesson through create_board_session; never teach the material in chat.
---

# 白板课堂（Board Session）

与「白板课堂 / Whiteboard session」产品路径一致。工具名对齐本仓库 Director Agent（`directorAgent.py`）。

## 工具名对照（文档用语 → 本仓库）

| 说明 | 本仓库工具名 |
|------|----------------|
| 创建白板课堂 / PDF 精讲会话 | `create_board_session` |
| 网页检索（补足主题背景，写进 `brief`） | `search_and_summarize_web` |
| 解析链接内容 | `analyze_url_content` |
| 澄清需求 | `ask_questions` |
| Drive / 网盘 | `search_files` |
| 用户记忆 | `memory_recall` |
| 结束本轮 | `mark_response_complete` |

## 何时使用本 skill

- 用户**明确**要白板课堂、板书讲解、"用白板给我讲"、"带我逐页过一遍这份文档"等。
- 或本轮 **`mode` 为 `board_session`**（模式指令已随本轮下发）。

### 何时**不**使用本 skill

- **普通的主题提问不算。** "解释一下特征值"这类问题用 `generate_content` 回答，**不要**擅自推断成白板课堂。这是产品硬要求，不要自作主张。
- 用户要的是系统性、多单元的长期课程 → `systematicLearning`；要的是速查表 → `cheatsheetGeneration`；要的是把内容做成计划/日程 → `planTasks`。

## 核心流程

1. **先补背景（必要时）。** 如果主题较新、涉及当前信息，或者用户自己给的材料太薄（只有一句话、只有一个文件名、只有一张图），**先**调用 `search_and_summarize_web`（有链接时用 `analyze_url_content`）把主题边界、关键术语、常见讲解顺序补齐。**本工具没有独立的调研字段**——检索到的结论必须**揉进 `brief` 自由文本**里再传给 `create_board_session`，否则这次检索等于白做。若本轮启用了 Drive/Canvas，按全局集成规则改用 `search_files`，不要混用。
2. **意图不清就先问。** 本轮带附件、且用户的措辞没有讲清他是想**把文件当参考资料**去听一个主题，还是想**被逐页带着过这份文件**时，**先** `ask_questions`，并且**本轮不要**再调 `create_board_session`。
   - 选项措辞是硬约束：**每个选项只描述"他的文件会被怎么处理"**，用用户本来就懂的话说。选项里**不许**出现模式名、会话类型名、产品名、格式标签，**不许**带任何括号注释——用户根本不知道这两种类型的存在，写出来只会让他懵。
   - 好例子："带我逐页过一遍这份文件" / "讲这个主题，文件作为背景资料参考"。
   - 坏例子："逐页过一遍（PDF Walkthrough）" / "讲这个主题（Whiteboard Lesson）"——既报了内部类型名，又带了括号。
   - 拿到答复后映射：**当参考资料** → `session_type` 用 `whiteboard`，文件进 `references` 并写清 `usage`；**逐页带我过** → `session_type` 用 `pdf_annotation`，文件进 `references` 且 `page_range` 设为 `"all"`。
   - 如果用户的原话已经说清了意图（"带我读一下这篇 paper"、"讲讲 X，这份 PDF 给你参考"），**跳过提问**，直接建会话。
3. **原样抄下用户的请求。** `user_request` 必须是用户**这一轮自己打出来的原话**：不要改写、不要概括、不要翻译、不要润色。他提到的具体题目、具体某页 slide、考试、deadline、担心的点，**那个措辞本身**就是必须活着进到会话里的东西——会话开场就是先回应它。一条消息拆成多个会话时，每个会话拿它所服务的那部分原话。
4. **调用 `create_board_session`，本轮只调一次。** 传完整的 `sessions`：`session_type`、`title`、`description`、`tags`、`brief`、`user_request`、`output_language`，以及所有作为依据的文件（`references`：`file_id` + `usage`，走 `pdf_annotation` 时 `page_range` 为 `"all"`）。用户没有明确要求多个会话时，**默认只建一个**。**如果本轮对话历史里已经出现过 `create_board_session` 的结果，说明会话已经建好了——不要再建一遍，直接走第 5 步 `mark_response_complete`。**
5. **交接两句话，然后收尾。** 卡片出来之后，只写**一两句**：这节课会讲什么、请他点开卡片开始、需要提前准备什么。然后 `mark_response_complete`。

## 不要做的事

- **不要在聊天里把这堂课讲了。** 教学发生在会话内部；在聊天里复述一遍既浪费用户这一轮，又抢在白板前面把内容剧透完。
- 不要用 `generate_content` 长篇输出本该由会话承载的正文。
- 不要因为"用户上传了文件"就默认要建会话——看的是他有没有明确要，或者本轮是不是 `board_session` 模式。
- 不要在同一轮里反复调 `create_board_session` 补建、重建、"再来一个"。
- 不要把检索结果单独发给用户或另存别处——它们的唯一去处是 `brief`。
