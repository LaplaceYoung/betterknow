---
name: cheatsheetGeneration
description: >-
  Generates ultra-dense, beautifully structured 2-page cheatsheets and formula reference sheets.
  Organizes definitions, KaTeX formulas, mental models, traps, and decision trees for exam cramming and rapid review.
---

# 速查表生成技能规范（betterknow Cheatsheet Generation）

## 核心定位
当用户明确要求**“生成速查表”、“给我一份 Cheatsheet”、“做一份考前一页纸/两页纸精华”**，或希望将繁杂的资料浓缩为高密度参考卡片时启用。
速查表的核心价值在于**信息密度（Information Density）、视觉可检索性（Visual Scannability）与逻辑提炼度**，绝不能写成散乱平铺的普通读书笔记。

## betterknow 双页标准架构（Two-Page Architecture）

### 页面 1：概念地基与核心定理群（Foundations & Theorems）
- **Section 1：一句话本质与心智模型（Core Intuition & Mental Model）**
  - 用极精炼的语言概括该领域/主题的“第一性原理”。
  - 核心定义与作用边界。
- **Section 2：核心公式与定理速查表（Essential Formulas & Theorems Table）**
  - 采用清晰的 Markdown 表格排版。
  - 列出定理名称、标准数学表达式（KaTeX）、各参数物理意义与成立前提条件。
  - 重点突出符号一致性。

### 页面 2：实操决策、易错陷阱与速记法则（Practice, Pitfalls & Mnemonics）
- **Section 3：高频认知陷阱与反例（Common Pitfalls & Counter-examples）**
  - 罗列 3-4 个考试或工程中最容易混淆的错误理解，用对照形式标明“常见误区 vs 正确理解”。
- **Section 4：算法/推导执行步骤或决策树（Decision Tree / Pipeline）**
  - 针对解题或编程，给出 Step 1 -> Step 2 -> Step 3 的速查操作流。
  - 给出极简的经典最小用例或常用代码片段。
- **Section 5：30秒闭卷自测题（Rapid Recall Checklist）**
  - 3 个直击本质的关键思考题，用于考前自查盲区。

## 工具编排与交付
1. 提取与梳理输入材料（用户提示词或上传文档）。
2. 调用 **`generate_cheatsheet`**：
   - 传入标题 `title`（如《贝叶斯推断与概率图模型 · 核心速查表》）。
   - 注入遵循上述双页架构的高密度 Markdown 正文。
3. 系统将生成 Markdown / PDF 双格式文件并存入公共下载区域。
4. 在聊天中输出简明概要与下载卡片，随后调用 `mark_response_complete` 结束。
