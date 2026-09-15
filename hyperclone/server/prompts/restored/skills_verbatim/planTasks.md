---
name: plan-tasks
description: >-
  Use when the user wants to plan something to be completed in the future —
  not done right now, but scheduled, tracked, or broken down over time.
  Primary tool is generate_main_tasks. First direct the user to accept, reject,
  or adjust pending task cards in this chat (confirm, dismiss, adjustment dialog);
  describe controls in plain words only, never emoji or icon characters. Then you
  may direct them to the calendar. Do not execute or teach in chat.
---

# 任务规划（plan-tasks）

工具名对齐本仓库 Director Agent（`directorAgent.py`）。与 **`get_skills`** 的 `skill_name`：**`planTasks`**。

## 工具名对照

| 说明 | 本仓库工具名 |
|------|-------------|
| 生成日历主任务（含子任务） | `generate_main_tasks` |
| 用户记忆 | `memory_recall` |
| 澄清需求 | `ask_questions` |
| 网页检索（补充背景信息） | `search_and_summarize_web` |
| Drive / 网盘 | `search_files` |
| 结束本轮 | `mark_response_complete` |

---

## 何时使用本 skill

用户想把某件事**放到未来去做**——不是现在立刻完成，而是想规划、安排、分解到一段时间线上。例如：

- 制定学习计划、备考计划、项目计划
- 把任务安排进日历、生成可跟踪的待办
- 想在某个时间点之前完成某件事

### 何时**不**使用本 skill

- 用户只是想**立刻理解**某个概念或内容 → **`conceptExplanation`** / **`documentReading`**
- 用户要开放式系统学习（无具体规划意图）→ **`systematicLearning`**

---

## 核心流程

1. **`memory_recall`**（可选）：了解用户背景与偏好，辅助任务设计。
2. **澄清**（按需）：根据具体情况决定问什么——见下方参考问题。若 prompt 已足够清楚，可跳过。
3. **信息补充**（按需）：领域信息不足时 `search_and_summarize_web`；有参考文件时 `search_files`。
4. **`generate_main_tasks`**：把目标、时间线、结构全部写入 `prompt`（planner 看不到对话历史，信息须完整自洽）。有参考文件则传 `file_ids`。
5. **先**引导用户在本对话里用任务卡片上的三种操作：**接受**（确认）、**拒绝**（驳回）、**调整**（通过卡片配套的调整/反馈流程，一般为对话框）；对用户说明时用**纯文字**，**不要**在文案里写 emoji 或图标符号。pending 草稿**不要**说成必须去「日历」单独界面里才能处理。
6. **再**可引导用户到**学习日历**查看或跟进整体时间安排（与产品一致即可）。
7. **`mark_response_complete`**。

---

## 澄清参考问题

以下为常见参考方向，**根据实际情况选用或调整**，不必逐一照问：

- 想在什么时候之前完成？有没有明确的截止日期？
- 每周大概能投入多少时间？
- 是否有参考材料或已有计划？
- 希望拆成哪种形式：学习任务、日程事项，还是两者结合？

---

## 不要做的事

- **不要**在聊天里开始执行或教学；用户确认后的学习执行在 Deep Learn Session 等进行，**日历**可用于查看或跟进进度（与「先在对话里完成接受/拒绝/调整」顺序一致）
- **不要**把 `generate_main_tasks` 的 `prompt` 写得过于简单——planner 没有对话上下文，信息须完整
