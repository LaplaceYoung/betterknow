---
name: conceptExplanation
description: >-
  Explains any concept using betterknow's 5-stage Socratic Cognitive Ladder:
  Intuition -> Formal Definition -> Derivation -> Concrete Applications -> Socratic Quiz.
  Provides deep conceptual understanding and triggers interactive quiz diagnostics.
---

# 概念解释技能规范（betterknow Concept Explanation）

## 核心定位
本技能专为帮助学习者深刻理解单一概念、定理、物理定律、算法或系统架构设计。
严禁简单死板地罗列百科条目，必须严格贯彻 **betterknow 五阶苏格拉底认知阶梯**。

## 五阶认知阶梯（Cognitive Scaffolding）

### 阶梯 1：物理直觉与自然比喻 (Intuition & Physical Model)
- **目标**：在出现任何抽象符号之前，在学习者大脑中建立具象的心智模型（Mental Model）。
- **做法**：
  - 阐述该概念被发明的历史动机或痛点（例如：“在没有贝叶斯定理前，人们在面对新证据时为何总会犯直觉错误？”）。
  - 使用生活中的具体比喻（水流、天平、赌局、导航器等）拆解核心机制。

### 阶梯 2：严格形式化定义与边界 (Formal Definition & Boundaries)
- **目标**：精确界定概念的数学或逻辑边界，杜绝模糊理解。
- **做法**：
  - 给出标准形式化陈述或数学公式，全部使用规范 KaTeX 格式（行内 `$ ... $`，行间 `$$ ... $$`）。
  - 逐一明确各参数、变量的定义域、物理含义与量纲。
  - 使用 `<div content-section="definition">` 突出显示定义块。

### 阶梯 3：数学推导与底层机制 (Step-by-Step Derivation)
- **目标**：展现“从前提到结论”的因果证明链条，解释每一步变形的动机。
- **做法**：
  - 不得跳过关键的推导中间步。
  - 标明推导中所依据的公理、恒等式或守恒律。
  - 揭示底层运行机理与不变量（Invariants）。

### 阶梯 4：实战应用与代码验证 (Application & Concrete Code)
- **目标**：让理论在实际工程或现实场景中落地生根。
- **做法**：
  - 提供最小可运行的 Python / TypeScript 代码示例或具体的数值计算实例。
  - 分析系统边界条件（Edge Cases）、时间/空间复杂度或实际工程选型权衡（Trade-offs）。

### 阶梯 5：苏格拉底反思与交互测验 (Socratic Diagnostic & Interactive Quiz)
- **目标**：通过主动提取（Active Recall）诊断潜在的认知盲区。
- **做法**：
  - 提出一个具有启发性、甚至反直觉的“思考挑战”（例如假阳性悖论、极值行为）。
  - 触发 **`generate_quiz`** 生成 2 道高质量单选题，选项需具备高辨析度的干扰项（Distractors），每题配备详尽的解析，在前端生成交互测验卡片供学习者即时作答评分。

## 工具编排流
1. `thinking`: 分析用户认知水平与问题本质。
2. `memory_recall`（可选）: 调取用户过往学习掌握情况。
3. `content_planner`: 规划直觉、定义、推导、用例、自测五个版块。
4. `generate_content`: 输出富有感染力、层次分明的正文（含 KaTeX 与代码）。
5. `generate_quiz`: 生成 2 道交互测验题并渲染测验卡片。
6. `recommend_next_step`: 推荐延伸学习动作（如进入白板精讲、生成速查表）。
7. `mark_response_complete`: 结束本轮，等待学习者交互。
