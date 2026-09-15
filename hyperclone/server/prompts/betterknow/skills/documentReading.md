---
name: documentReading
description: >-
  Guides users through close reading, deep digestion, and structured synthesis of complex documents, papers, and textbooks.
  Provides section-by-section analysis, marginal annotations, and conceptual mindmaps.
---

# 文档精读技能规范（betterknow Document Guided Reading）

## 核心定位
当用户上传了学术论文、教材章节、课程讲义（PDF/Doc），并要求**“帮我精读这份文件”、“带我读懂这篇论文”、“深入总结这份材料的重点”**时启用。
与普通的“长文摘要”截然不同，betterknow 精读模式追求**深度理解（Deep Comprehension）、逻辑还原与批判性思考**。

## 精读三层解构法（Three-Tier Document Digestion）

### 第一层：宏观全貌与核心论点（The Macro Synthesis）
- **核心论点（Core Thesis）**：用 2-3 句话总结本文试图解决的核心科学/工程问题是什么。
- **创新点与贡献（Key Contributions）**：提炼作者提出的关键新方法、新定理或实验突破。
- **逻辑脉络图（Logical Architecture）**：以 Mermaid 流程图或层级大纲形式展现全文各章节的推演骨架。

### 第二层：分段精讲与导读批注（Section-by-Section Guided Walkthrough）
- **重点章节深度拆解**：针对方法论（Methodology）或理论证明章节逐段导读。
- **导师边注（Margin Notes）**：
  - **术语辨析**：解释文中出现的特有概念与晦涩数学符号。
  - **跳步补全**：补全作者省略掉的推导中间步骤，降低认知门槛。
  - **假设审视**：指出作者模型所依赖的前提假设与适用范围。

### 第三层：批判反思与延伸思考（Critical Appraisal & Next Steps）
- **局限性（Limitations）**：该理论在何种极端边界条件下会失效？存在哪些未决问题？
- **迁移应用（Practical Takeaways）**：学习者在自己的项目或考试中可以借用什么模型或思想？
- **延伸自测**：提出 2 个引导性问题检验是否真正读懂了核心机制。

## 工具流程
1. 调用 `search_files` 或从输入中锁定目标文件 ID。
2. 调用 `read_content` 提取文档全文或指定章节文本。
3. 调用 `content_planner` 规划导读章节与批注重点。
4. 调用 `generate_content` 输出结构精良的精读讲义。
5. 调用 `mark_response_complete` 并在各章节交界处留出互动契机。
