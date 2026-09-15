---
name: systematic-learning
description: >-
  Use when Deep Learn Session is requested (e.g. flag/mode) or the user wants
  systematic, structured learning of a topic. Deliver learning through
  create_deep_learn_session; do not replace it with long generate_content lessons in chat.
---

# 系统性学习（Deep Learn Session）

与「Deep Learn Session / 系统性学习」产品路径一致。工具名对齐本仓库 Director Agent（`directorAgent.py`）。

## 工具名对照（文档用语 → 本仓库）

| 说明 | 本仓库工具名 |
|------|----------------|
| 创建深度学习会话 | `create_deep_learn_session` |
| 用户记忆 | `memory_recall` |
| 澄清需求 | `ask_questions` |
| 网页检索（补全大纲所需背景） | `search_and_summarize_web` |
| Drive / 网盘 | `search_files` |
| 结束本轮 | `mark_response_complete` |

## 何时使用本 skill

- 用户消息或上下文中 **Deep Learn Session 为 true**，或本轮 **`mode` 为 `deep_learn_session`**。
- 或用户明确要 **系统性学习**、结构化课程、按单元/路径学习某主题（区别于「只解释一个概念」的轻量问答）。

### 何时**不**使用本 skill（改用 `generate_main_tasks`）

- 当用户的请求包含**明确的时间约束**——考试日期、截止日期、目标日期（如"5月底通过考试"、"3 周后考试"、"下周交作业"）——即使涉及系统性学习内容，也 **不要** 走本 skill。
- 此类场景改用 **`generate_main_tasks`**：它会生成带 `deep_learn_session` subtask 的日历主任务，同时覆盖时间管理和结构化学习。
- 简单判断：**有 deadline → `generate_main_tasks`**；**无 deadline 的开放式学习 → 本 skill**。

## 核心流程

1. 可选：先 `memory_recall` 获取**具体知识背景**（已掌握内容、薄弱点），用于写 `task_plan` 的难度与顺序；**偏好类记忆**不能代替本轮澄清。若主题边界、目标时长、难度期望等仍不清，**必须** `ask_questions`—**勿**因「记忆里说喜欢简单」就省略。
2. 在编写 `task_plan` 之前，若仍缺少可靠背景（主题边界、常见学习顺序、关键术语等），**请先**调用 `search_and_summarize_web` 补足信息，再落笔大纲。**必须**随后调用 `create_deep_learn_session`，传入完整 `task_plan`：`tags`、`title`、`description`、`session_task_plan`（各 unit 含 `unit_name`、`unit_description`、`tasks` 与 `task_id` / `task_title` / `task_description`）。**参考文件与 `related_file_ids`：** 只要本轮存在作为学习依据的参考文件（用户上传、`search_files` 返回、`read_content` 所针对的 `file_id` 等），**必须**在调用 `create_deep_learn_session` 时传入 `references`：**每一个**这样的文件都要出现，**不得遗漏**。后端会把 `references` 写入会话行的 `related_file_ids.primary_source_files`，格式与日历子任务里的 `primary_source_files` 一致：每项为 `{ "file_id": "<真实 id>", "note": "<可选，简短说明关联性>" }`（`note` 可省略或为空字符串，但建议填写）。不要只写在 `task_plan` 正文里而不传 `references`。若全局规则要求以 Drive 为主，则用 `search_files` 代替网页搜索，不要混用违反集成策略。
3. **不要**用 `generate_content` 在聊天里长篇授课或替代会话内容。教学与练习应在 Deep Learn Session 内完成。你在聊天里只保留**简短引导**：请用户打开工具返回的 **session URL**，并说明接下来在会话中进行学习。
4. 会话创建成功后，使用 `mark_response_complete` 结束本轮（`create_deep_learn_session` 在本系统中计为已交付内容，允许随后 mark complete）。

## Drive 已启用时

以 `search_files` 拉取用户资料以充实 `task_plan`；**不要**使用 `search_and_summarize_web` 替代 Drive 要求（与全局集成规则一致）。`search_files` 返回的**每一个**相关 `file_id` 都必须进入 `create_deep_learn_session` 的 `references`，从而落入 `related_file_ids.primary_source_files`（格式同上）。信息已足够时可直接进入 `create_deep_learn_session`。

## 不要做的事

- 用多轮 `generate_content` 代替会话本体。
- 与 **conceptExplanation** 混淆：单点概念解释走 `conceptExplanation`；**体系化多单元学习**走本 skill。
