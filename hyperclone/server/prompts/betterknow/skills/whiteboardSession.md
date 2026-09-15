---
name: whiteboardSession
description: >-
  Orchestrates interactive visual whiteboard sessions ("边讲边画", "用白板讲", or PDF walkthroughs).
  Generates multi-page blackboard actions (new_page, board, speak, annotation, ask) and launches whiteboard rooms.
---

# 白板课堂技能规范（betterknow Whiteboard Session）

## 核心定位
当用户明确要求**“边讲边画”、“用白板讲给我听”、“带我逐页看这份讲义”**，或当前轮带有 `mode: board_session` 时启用。
白板课堂不是静态文档阅读，而是模拟顶级导师在一块无界黑板上面对面授课：画出几何示意图、逐步书写推导公式、实时画圈高亮、伴随同步语音讲解与随堂提问。

## 白板分幕架构（Multi-Page Lesson Choreography）
一堂标准的 betterknow 白板微课通常由 3 至 5 个精炼画页（Pages）组成：
- **Page 1：认知破局与直观图示（The Visual Hook）**
  - 画板动作：绘制核心概念的几何草图、流程关系图或物理心智模型。
  - 讲解音频：抛出核心疑问，用直观图形唤醒认知。
- **Page 2：形式化模型与符号定义（The Mathematical Model）**
  - 画板动作：列出核心公理、状态向量或数学符号，并用箭头标明相互作用关系。
  - 讲解音频：精确界定变量边界。
- **Page 3：动态推演与证明展开（Step-by-Step Derivation）**
  - 画板动作：分步书写推导公式，使用高亮笔圈出关键消除项或守恒项。
  - 讲解音频：讲解每一步变形的动机。
- **Page 4：典型案例实操与随堂挑战（Worked Example & Check）**
  - 画板动作：带入具体数字或现实案例进行现场演算，最后留出一道互动自测题。
  - 讲解音频：引导学习者主动思考并作答。

## 板书动作指令集（Blackboard Action Primitives）
白板内核支持 5 类基础动作编排：
1. `new_page(page_index, title)`: 翻至新黑板页。
2. `board(items)`: 向当前画板写入元素（公式块、Mermaid 图、手绘几何图形、文本块）。
3. `speak(text, voice_style)`: 同步语音脚本，配合板书节奏朗读。
4. `annotation(target_id, action, color)`: 在已有板书上画圈、加下划线、绘制指示箭头。
5. `ask(question, options, explanation)`: 在白板界面弹出即时互动选择题。

## 执行与交接规范
1. **背景补充与提炼**：
   - 提取用户请求中的核心知识点，若用户提供了文档，判断是全篇精讲（`pdf_annotation`）还是提取知识点（`whiteboard`）。
   - 将核心教学策略与板书大纲提炼写入 `brief`。
2. **创建白板会话**：
   - 调用 **`create_board_session`**，创建白板房间与初始教学剧本。
3. **聊天室交接引导**：
   - 在聊天界面只保留 1-2 句优雅的导引语，说明白板房间已就绪。
   - 禁止在聊天窗口提前剧透整个白板讲解的全部板书文字。
   - 调用 `mark_response_complete` 结束本轮。
