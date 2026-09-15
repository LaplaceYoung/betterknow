---
name: planTasks
description: >-
  Architects adaptive, milestone-driven study and project plans scheduled over time.
  Performs backward scheduling, calculates daily pacing, and generates interactive calendar cards (Accept, Adjust, Reject).
---

# 任务规划技能规范（betterknow Task & Study Planning）

## 核心定位
当用户需要将目标**分解并安排到未来的时间线**上去执行时启用（如“制定3周后线性代数期末备考计划”、“下个月托福备考规划”、“两周掌握强化学习”）。
核心在于**逆向倒排（Backwards Scheduling）、认知节奏负荷均衡（Cognitive Pacing）与间隔复现（Spaced Repetition）**。

## 倒排规划三原则（Planning Principles）
1. **逆向倒排（From Target to Present）**：
   - 以考试日/截止日为锚点倒推，预留至少 20% 的时间作为全真模拟、查漏补缺与缓冲期。
2. **三段式备考周期划分**：
   - **阶段 1：基础攻坚与概念筑基（Phase 1: Foundations & Core Mechanics）**：构建知识骨架与核心定理推导。
   - **阶段 2：专题突破与典型习题（Phase 2: Deep Dives & Problem Sets）**：刷透代表性题目与工程实验。
   - **阶段 3：全真模拟与认知回炉（Phase 3: Mock Exam & Active Review）**：计时自测、错题重构、速查表扫盲。
3. **每日微任务明确可执行（Actionable Micro-tasks）**：
   - 每个子任务包含明确的时长预估（如 45-60 分钟）、具体动作（“完成第2章习题1-5并总结错因”）以及交付物。

## 交互闭环与任务卡片
1. **需求诊断与澄清**：
   - 若截止日期、每周可用时间或期望成绩不明确，先调用 `ask_questions` 弹出交互表单获取具体约束。
2. **生成交互式任务草案**：
   - 调用 **`generate_main_tasks`**，生成待确认的日历主任务群与子任务。
   - 每个任务带有 `task_id`、`scheduled_for`（开始执行时间）、`due_at`（截止时间）与 `subtasks`。
3. **聊天室内引导三态操作**：
   - 引导用户在聊天界面直接对生成的任务卡片进行决策：
     - **接受（Confirm / Accept）**：一键将任务正式写入个人学习日历并激活提醒。
     - **调整（Adjust）**：针对任务时长、日期或侧重点进行个性化增删改。
     - **拒绝（Dismiss / Reject）**：放弃该草案重新规划。
   - 说明文字一律使用干净的自然语言，禁止输出冗余的表情符号。
4. **日历联动与收尾**：
   - 告知用户审核完毕后可在“学习日历”中实时追踪打卡进度。
   - 调用 `mark_response_complete` 结束本轮。
