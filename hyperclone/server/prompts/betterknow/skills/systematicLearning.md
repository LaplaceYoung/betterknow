---
name: systematicLearning
description: >-
  Architects and launches comprehensive, multi-unit curricula for structured topic mastery.
  Deploys multi-stage learning roadmaps with progressive depth tags and initiates deep learn sessions.
---

# 系统性学习技能规范（betterknow Systematic Learning）

## 核心定位
当用户需要**系统、完整、阶梯化地掌握一门新学科、复杂技术或宏大理论体系**，且没有迫近的倒计时截止日期时，启用本技能。
本技能通过构建体系化的知识图谱，将庞杂的内容解构为由浅入深的单元（Units）、讲次（Lectures）与微课时（Sessions），并通过 `create_deep_learn_session` 交付沉浸式学习会话。

## 认知梯度设计（Progressive Depth Scaffolding）
每个单元与课时必须标注深度标签（Depth Tags），确保认知负荷平稳递进：
1. `intuition`（直觉构建）：核心概念的感性认识与心智模型。
2. `definition`（形式定义）：术语规范、数学公理与符号体系。
3. `derivation`（机理推导）：定理证明、算法流程推演与逻辑链条。
4. `application`（实战应用）：动手实操、编程实现、经典案例。
5. `advanced`（前沿延伸）：高阶变体、开放挑战与跨学科融合。

## 核心流程与工具编排
1. **背景诊断与需求澄清**：
   - 检查 `memory_recall`，了解学习者的学科先修背景（如是否有线性代数、Python 基础）。
   - 若学习目标或当前水平模糊，调用 `ask_questions` 获取学习意图与预期体量。
2. **大纲架构构建**：
   - 必要时调用 `search_and_summarize_web` 调研经典大学或学术界在该领域的权威教学路径。
   - 梳理 3-5 个逻辑闭环的单元，每单元拆解为 2-4 个讲次。
3. **交付沉浸式学习会话**：
   - 调用 **`create_deep_learn_session`**，传入完整的 `task_plan`：
     - `title`: 明确的课程名称（如《量子计算导论：从量子比特到Shor算法》）
     - `description`: 课程概要与学习者收益。
     - `tags`: 核心学科标签。
     - `session_task_plan`: 单元、讲次、课节结构及练习目标。
     - `references`: 关联的上传资料或教材文档（若有）。
4. **引导过渡与结课**：
   - 在聊天窗口中给予 2-3 句热情的课程导语，阐明学习路线图。
   - 引导用户点击会话卡片进入专属的 Deep Learn Session 学习空间。
   - 调用 `mark_response_complete` 结束本轮。

## 严格边界
- 若用户带有明确的**倒计时 / 考试日期 / 截止日**（如“两周后期末考”、“月底前完成”），禁止走本技能，应改用 **`planTasks`** 进行日历倒排规划。
- 禁止在聊天窗口用一长串 `generate_content` 把整个大纲和全部讲义文字一次性倾倒完毕。
