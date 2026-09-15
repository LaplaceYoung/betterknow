# Hyperknow 工具与技能全注册表（2026-09-03 实测汇总）

来源交叉：前端 Qv 注册表（ChatResponsePage-B8jlcC8f.js@523562）+ 泄漏系统提示词（`assets/prompts/directorAgent_system_prompt.md`）+ WS 实测帧（`evidence/tool_frames/*.json`、`evidence/ws_captures_session2.json`、`evidence/course_generation_trace.json`）。

## 一、skills（6 个，get_skills 动态装载；行为指纹已截获）

| skill | 触发 | 澄清轴（实测） | 装载后动作链 | 证据 |
|---|---|---|---|---|
| conceptExplanation | 单点概念讲解/教学 | 知识水平3档 / 讲解风格4档 / 关注点(多选) | 生词→search_and_summarize_web → content_planner(steps) → generate_content(分段) | skill_conceptExplanation*.json |
| systematicLearning | mode=deep_learn_session 或系统化课程 | 直接生成，不问澄清 | create_deep_learn_session → task_plan(units/tasks) + session_url | ws_captures_session2.json |
| whiteboardSession | mode=board_session 或白板课 | 材料薄则先 web 搜索再入 brief | search_and_summarize_web → create_board_session → session_id + /whiteboard/<id> | tool_create_board_session.json |
| cheatsheetGeneration | 明确要速查表/PDF | 前置 search_files 取文件 | (文件未索引时降级) → generate_cheatsheet | tool_generate_cheatsheet_drive.json |
| planTasks | 带截止日期的计划 | 考试范围 / 每周投入 / 目标档 | generate_main_tasks → 待批任务卡（accept/reject/adjust） | tool_main_tasks_full.json |
| documentReading | 附件+总结/精读 | 模式3选(Concise/Detailed/Guided close reading) | read_content → generate_content(inline-cite 引用) | tool_documentReading_v*.json |

skill 指纹资产：`assets/prompts/skills/*.md`（6 份）。skill 正文不在 WS 帧中暴露（get_skills 只回 `{success, skill_name}` 回执）。

## 二、工具注册表（28 项前端注册 + 服务端全集）

| 工具 | UI 显示步骤 | 状态 | 实测要点 |
|---|---|---|---|
| directorAgent | Agent is thinking | ✅ | thinking/thinking_chunk 流式推理链可被帧截获 |
| select_prompts | Approach | 未见活帧 | 开局提示选择（推断） |
| ask_questions | Questions | ✅ | 产出 user_question 帧（questions[]: is_multiple/options/allow_custom） |
| clarification_planner | Considering User Request | 未直接观测 | 需求澄清规划（推断） |
| content_planner | Making Plan | ✅ | steps[]（step_name+step_objective，objective 内嵌执行指令如 "call mark_response_complete"） |
| action_planner | Agent is thinking | 未直接观测 | 行动规划（推断） |
| get_skills | Loading skills | ✅ | 只回 {success, skill_name} |
| memory_recall | Recalling Memory | ✅ | 新话题自动调用；回 summary |
| add_memory | （无注册显示项） | 提示词载明 | fast 模式下被禁 |
| generate_content | Generating Content | ✅ | 参数有 response_style/response_type/has_more_response_after_this_reply；内容走 content_chunk + inline 制品标签 DSL；模型 gemini-3-flash-preview |
| generate_quiz | Generating Quizzes | ✅ | completed 帧回吐全题面+correct_answer+explanation；模型 gemini-2.5-flash |
| generate_flashcards | Generating Flashcards | ✅ | Q/A 卡全量回吐；gemini-2.5-flash |
| generate_html_animation/generate_diagram/diagram_drawer | Interactive visualization | ✅（html_animation） | 产出 /api/v1/diagram/<id>/diagram.html；三别名指向同显示步骤 |
| generate_instructional_video | Generating Instruction Video | ✅（流水线） | 阶段帧: initializing→script_writing(6 scenes+剧本preview)→generate_narration(9条音频116s)→code_generation(scene_types: remotion×4+manim×2)→video_render(逐场景乱序完成) |
| code_generator | Code Generator | 路由未命中 | "write a function" 走 generate_content；可能需更明确交互式触发 |
| generate_cheatsheet | Generating Cheatsheet | 触发依赖文件可检索 | （文件未被索引则死循环 search_files 13 次降级） |
| search_files | Finding Files | ✅ | sources:["drive","canvas"] 受 integrations 门控 |
| read_files / read_content | Reading attachments | ✅ | read_content 按 file_id 直读 |
| search_and_summarize_web | Searching Web | ✅ | round/keywords/results(id+title+url)/summary 全进帧 |
| analyze_url_content | Analyzing URL Content | ✅ | 返回 {results:[{web_id,url}]}，web 资源以 WB 前缀落库 |
| publish_file | Publishing File | ✅ | → public_url https://api.hyperknow.io/api/v1/files/<10位id>（无鉴权公开） |
| artifact_update | （无注册显示项） | 提示词载明 | fast 禁用 |
| create_deep_learn_session | Creating Deep Learn Session | ✅ | task_plan+单元列表+落地 /deep-learn-session/<uuid> |
| create_board_session | Creating whiteboard session | ✅ | session_id hex32；/whiteboard/<id> |
| generate_main_tasks | Planning Study Tasks | ✅ | 直接写库任务卡（status not_approved，type todo-new/due-new，develop_environment=prod） |
| course_generation | Crafting Course | ✅ | 见课程流水线（boot→research≤5轮→questions→syllabus→structure→outlines→complete） |
| recommend_next_step | Recommended Next Steps | ✅ | next_steps[3] + learning_progress(title/topic/percentage) |
| mark_response_complete | （内部） | ✅ | 硬校验器：须有内容产出才能收尾，否则轮询重试（实测最多 15 轮降级） |

## 三、协议参数面（实测/bundle 双重确认）

- 客户端 user_message: `{type,message,pivot?,attachments:[{file_id,filename}],answer?,audio_b64?,audio_mime?,audio_duration_ms?}`
- 服务端 envelope（共享泄漏件）: `{type,message,file_info,mode,integrations,reply_language:{value,mode:strict}}`
- mode ∈ {deep_learn_session, board_session}；speed_mode ∈ {normal, fast}（fast 禁 memory/ask_questions/搜索等 9 工具）；integrations ∈ {drive, canvas}；ui_language 随前端语言
- 内部制品 DSL：`<content-type: diagram; diagram-subtype: mermaid|gemini-image; content-prompt:{...}; caption:{...}>` → 落地 `<diagram data-file-url=...>`
- 引用组件：`<span class="inline-cite" data-type="file" data-file-id="...">`

## 四、成本/配额（实测）

| 动作 | 扣费 | 备注 |
|---|---|---|
| 即时对话每条 | 1 credit | credit_status 帧实时播报 |
| 课程生成 | 10 credits | UI 提示动态化 base+perFile |
| add_to_calendar / publish_file 等 agent 工具 | **不吃功能配额**（calendar_add 2/2、file_generation 5/5 未动） | 且 add_to_calendar 每 ~10s 重试刷重复任务（12+ 次） |
| 免费功能限窗（REST 暴露） | file_upload 5 / calendar_add 2 / file_generation 5 / deep_learn 5 每窗 | WS agent 路径旁路 |

## 五、第三方/基建指纹

Supabase(认证+RLS) · Cloudflare(前置) · Render(agent+go Express) · Google Firebase Hosting/Frontend(kol, qr) · S3 us-east-2 公共桶 nutcracker-hyperknow-public · Stripe · dub.co(affiliate+KOL) · Gemini 2.5/3 flash · Remotion+Manim 渲染管线 · TTS 旁白(116s/9段实测) · Better Stack(status) · Framer(营销站) · Clarity/Meta/TikTok 追踪
