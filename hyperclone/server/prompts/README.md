# 提示词资产索引（还原优先，缺失部分补研设计）

| 功能面 | 文件 | 状态 | 来源 / 设计依据 | 运行时挂点 |
|---|---|---|---|---|
| 主聊天 director（工具编排/技能/语言/mark_response_complete） | `restored/directorAgent_system_prompt.md` | **原样还原**（14,916 字符，共享会话泄漏） | evidence 第四轮 | `src/ws.ts` systemPrompt() → dsh adapter system 层 |
| 6 个 skills（概念讲解/系统学习/白板/速查表/计划/文档阅读） | `restored/skills/*.md` + `restored/skills_fingerprints.md` | 行为指纹还原（服务端不回传正文，按触发/问题轴/工具链画像重写） | WS get_skills/user_question 帧 | `seed/skills_registry.json` → dsh `skill` 插件目录 |
| deep-learn 教师 | `restored/deep_learn_teacher_prompt.md`、`deep_learn_conversation_behavior.md` | 原样还原 | evidence deep_learn_fourier_full.json | `/api/v1/deep_learn/ws` |
| PDF 导读教师 / 白板教师人格 | `restored/pdf_teacher_persona.md`、`whiteboard_teacher_persona.md` | 原样还原 | pdf_teaching_trace / whiteboard 帧 | `/pdf-annotation/ws`、`/whiteboard/ws` |
| 用户消息封套 | `restored/user_message_envelope.json` | 原样 | 共享泄漏 | 前端 `user_message` 发送形状 |
| 课程生成 4 步管线（搜索→问卷→结构→内容） | `designed/course_generation_pipeline.md` | **补研设计**：按 craft2/3/4 录屏的问卷形状（Q1–Q4、多选/单选、选项标题+说明、「都不太对？写个自己的」）与 course_generation_trace.json、course_full_structure.json 的输出 JSON 反推 | `/course-generation/ws` | `src/pipelines.ts` COURSE_PHASE_PROMPTS |
| 学习材料（速查表/测验/闪卡） | `designed/materials_generation.md` | 补研设计（tools_registry：generate_cheatsheet / generate_quiz+flashcards，成本 3 积分） | 工具 guideline 帧 | `tool_execution` generate_* |
| 白板讲稿与板面动作 | `designed/whiteboard_lesson_script.md` | 补研设计（帧协议 new_page/board/speak/annotation/ask/done + 录屏 walk-b 62–85s 的暂停/插话） | PROTOCOL.md | `whiteboardHandler.teach()` |
| 学习规划（日历任务） | `designed/study_planner.md` | 补研设计（planTasks 指纹：考试范围/每周时长/目标 三问 → generate_main_tasks pending 卡） | calendar/approve_tasks | `tool-todo` / `plan-calendar` 插件 |
| 推荐下一步 & 掌握度反馈 | `designed/recommend_next_step.md` | 补研设计（walk-d 8–50s 回答末尾的推荐与评分卡） | recommend_next_step 帧 | chatRound 收尾 |

## 使用约定
- 所有提示词按 **语言规则** 执行：默认英文，用户消息明显为其他语言则跟随；显式指令优先。
- 生成类提示词都要求 **严格 JSON 输出**（schema 写在各文件末尾），服务端用 `askModel()` 解析；解析失败回退 stub。
- Provider key 缺失时（`src/providers/*` 全为 stub）管线仍可离线闭环：结构、题目、板书用 `stubdata/`。
- dsh 作为 Agent 核心时（`AGENT_CORE=dsh`），director 提示词作为 profile 的 system-prompt 层注入（`agent-runtime/home/profiles/betterknow/cordis.patch.yml` → `system-prompt` 插件 config）。
