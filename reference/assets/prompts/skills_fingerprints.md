# Skills 行为指纹（2026-09-03 第四轮）

来源：WS tool_execution/get_skills 回执 + user_question 帧模板 + 后续工具链观察。服务端不回传 skill 正文，以下为可观测行为画像。

| skill | 触发条件（实测 prompt） | get_skills 帧 | 澄清问题轴 | 后续工具链 |
|---|---|---|---|---|
| conceptExplanation | "teach me what an eigenvalue is?" | ✓ | 知识水平/讲解风格（简单·标准·逐步·全面）/关注面（几何直觉·定义计算·应用·陷阱），3 题含 allow_custom | ask_questions → search_and_summarize_web → content_planner → generate_content |
| systematicLearning | "Start a deep learn session on X" | ✓ | （深学直接产出 plan） | search_and_summarize_web → create_deep_learn_session（task_plan：units→tasks 树） |
| whiteboardSession | 任意 + `mode:"board_session"` | ✓ | 无（直接开板） | search_and_summarize_web（skill 强制先搜）→ create_board_session（session_type=whiteboard_quick_start, 32hex id, url /whiteboard/<id>） |
| cheatsheetGeneration | "Make me a PDF cheatsheet from X" | ✓ | —（因文件缺失未走完） | search_files（空则循环 13 次重试后放弃） |
| planTasks | "exam in 3 weeks, make a plan" | ✓ | 考试范围 / 每周可投入时长 / 目标，3 题 | ask_questions → generate_main_tasks（pending 卡片，需 approve） |
| documentReading | 附件 + "summarize" | ✓ | 摘要模式单选：精炼摘要 / 详细摘要 / 引导式精读 | read_content → generate_content |

## user_question 帧形状
`{type:"user_question", question_data:{questions:[{question,is_multiple,options[],allow_custom}]}}`

## 已知服务端 user_message 封套（共享泄漏）
`{type:"user_message", message, file_info, mode, integrations[], reply_language:{value,mode:"strict"}}`
- mode: `deep_learn_session` | `board_session`
- speed_mode: `fast` | 默认 normal（fast 禁用 memory_recall/add_memory/ask_questions/search_images/search_files/content_planner/artifact_update/get_skills）
- integrations: "drive" | "canvas"

## 关键行为观察
- 工具失败后端决策退化：read_content 连续 error 时 generate_content **捏造** "Cognitive Load Theory" 内容与伪造 file 引用（file-l2p1m0 虚 id）
- add_to_calendar 在 mark_response_complete 校验下重试 11 次，造成 11 个重复待审批任务
- search_files 严格用户域隔离（acct2 搜不到 acct1 文件）
- 生成 guideline 是 directorAgent 二次组合的自然语言指令（随 tool_selection.started 帧明文下行）
