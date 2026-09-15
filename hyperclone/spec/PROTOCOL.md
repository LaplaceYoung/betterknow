# Hyperknow 协议契约（复刻单一事实源）

从 evidence/ 全部轨迹凝练。hyperclone 实现必须逐字段兼容。

## 1. 认证与用户
- `POST /api/v1/auth/register` `{username,email,password,friend_referral_code?,dub_click_id?,utm_data?}` → `{success,message,user_id,email,username,error,friend_referral_info,invite_code_info}`
- `POST /api/v1/auth/login` `{email,password}` → `{success,data:{access_token,refresh_token,user_id,username}}`; access_token JWT 2h
- `POST /api/v1/auth/login_refresh` `{refresh_token}`（一次性 refresh，实测二次使用失败）
- 下游所有 REST：`Authorization: Bearer <access_token>`；WS：`?token=` 或 `?access_token=` query
- `GET /api/v1/auth/get_user_info` → `{success,data:{user_id,email,username,canvas_lms{...},subscription:{id,tier,plan_id,status,remaining_credits,max_credits,expires_at,will_reset_at,reset_interval_hours,last_reset_at,billing_reason}}}`
- `GET /api/v1/auth/other_function_usage_limits` → `{tier,version,file_upload{remaining,limit,last_reset_at},calendar_add,file_generation,deep_learn_session}` 周重置

## 2. WS 通道（wss/.../api/v1）

### 2.1 即时对话 `/ws?conversation_id=&token=`
客户端 →：user_message{message,attachments?[{file_id,filename}],answer?,audio_b64?...,pivot?} / save_artifact / stop_generation / ping
服务端 →（不分先后）：conversation_created, conversation_resumed, credit_status{credit_info{remaining_credits,max_credits,tier},next_reset_time}, conversation_title_updated, thinking, thinking_chunk, tool_selection{tool_name,tool_status:started,round_index,index,task_title?,model_name?,guideline?}, tool_execution{started|streaming|processing|executing|completed|error,+stage/data}, content_chunk{chunk}, code_chunk, code_output, inline_diagram{placeholder_id,data{tag,source_tag}}, user_question{question_data{questions[]}}, user_question_answered?, complete, error
工具清单（Qv 28 项 + agent 内部）：select_prompts, ask_questions, content_planner, action_planner, directorAgent, get_skills, generate_content, search_files, read_files, read_content, search_and_summarize_web, analyze_url_content, memory_recall, publish_file, generate_flashcards, generate_quiz, generate_instructional_video, generate_html_animation, generate_diagram, diagram_drawer, code_generator, clarification_planner, create_deep_learn_session, create_board_session, recommend_next_step, generate_main_tasks, generate_cheatsheet, course_generation, add_to_calendar, add_memory, search_images, artifact_update

**帧信封与补录字段（2026-09-15 live，`r9_chat_transport.jsonl`）**
- 信封是扁平可选字段：`{type, data?, message?, chunk?, tool_name?, tool_status?, display?, round_index?, index?, is_complete?, timestamp?}`；`content_chunk` 只有 `chunk`，`tool_execution` 的 `data` 在完成后给 `{model_used,chunk_count,total_length,content}`。
- 补录：`tool_selection` 实操含 `model_name`（如 `gemini-3-flash-preview`）、`response_style`、`response_type`、`task_title`、`index`；`credit_status` 含 `credit_info.turn_cost` 与 `next_reset_time`；`complete` 含 `tts_pending`；`tool_execution(directorAgent)` 的 `data={phase:"thinking",thought_chunk_count}`；`recommend_next_step` 的 `data.next_steps[{display_step,step_prompt}]`。
- 内联图占位符（跟随 `inline_diagram` 帧）：`<diagram data-placeholder-id="dg_…" data-subtype="gemini_image|mermaid" data-layout="right" data-status="pending" data-caption="…">`；`source_tag` 透出内部提示词 DSL：`<content-type: diagram; diagram-subtype: gemini-image; content-prompt: {…}; caption: {…}>`。
- 实测帧序：`user_message → conversation_created → conversation_title_updated → tool_execution(directorAgent) → tool_selection(工具) → tool_execution(started) → content_chunk×N → tool_execution(completed) → recommend_next_step → complete`；心跳 25s `ping/pong`。

### 2.2 白板 `/whiteboard/ws?access_token=`
→：start_session / resume_session{session_id} / resume_or_start_course_session{course_session_id} / start_teaching / set_lecture_outline{lecture_outline_id} / set_tts_config{voice_id,speed} / interject_start{source,mode,step_id,offset_ms} / interject_question{text|audio_b64,mime,duration_ms,offset_ms} / interject_audio_chunk{pcm_b64} / interject_audio_end / interject_resume / narration_pause / pause_session / step_completion_response / action_step_complete{step_id} / enter_new_step / sync_whiteboard_state / model_probe / ping{t} / question_answers{text}
←：connection_established / session_ready{session_id,resumed,status,session,messages,conversation_id,session_title,whiteboard_state,lecture_outline_id,key_points} / board{board_content(markdown),step_id,board_uid,page_id,title?} / group{actions[]} / tts_segment{audio_url,sequence,step_id,tts_cjk,tts_latin,speed} / tts_config 回显 / lecture_outline_selected / model_probe_started / model_probe_result{ok,verdict,minimal{ok,ttft_ms,text,error},replay,context_turns,context_chars} / pong{t} / error{message,is_complete}
voice_id ∈ warm|calm|bright|gentle|firm|lively；speed 0.5–2
诊断：/api/v1/net-check（GET）、/api/v1/net-check/ws（probe_ok）

**动作组与媒体（2026-09-15 live 实证，`live_2026-09-15b/r12,r15,r19`）**
- 板书即动作组：`session_ready.messages[]` 里 assistant 消息的 `content` 是可解析的 `{"type":"group","actions":[…]}` JSON 字符串；`group.actions[]` 的动作类型实测有 `board / speak / image_generation / highlight / circle / keypoint_complete / new_page / new_column / animation / ask / done / reward_user`（`animation` 为白板动画，见 `video2frame` 之外的独立帧族）。
- `speak` 动作在持久化消息里带 `audio_url`；服务端另发 `tts_segment`：每个 speak 一条，`tts_cjk` = CJK 字符数、`tts_latin` = 拉丁字母数（实测 96 / 0、51 / 0），音频取 `/api/v1/whiteboard/audio-stream/{user_id}/{session_id}/tts_<session前缀>_<seq>_<hash6>.webm`（图片同理公开无鉴权）。
- 白板内插问：客户端发 `user_message{message}`（非 `interject_*`），回答仍以 `group{board+speak}` + `tts_segment` 回；`interject_*` 是麦克风通道的并行路径。
- 插图：教师动作 `{"type":"image_generation","prompt":…,"language":…,"caption":…}`（模板见 `seed/prompts/whiteboard_image_prompt.md`）；服务端帧序 `image_gen_pending{step_id,placement_step_id?,prompt_preview(前 117 字符+“…”),caption,page_id,source?,reference_name?,page_index?}` → `generated_image{image_url,width,height,caption,step_id,page_id}`（实测 512×512，`/api/v1/whiteboard/images/<32hex>.png`）；失败为 `image_gen_failed`；`source:"reference_page"` 表示截取课件页而非生成。
- 客户端落位：overlay `{kind:"board_image",x,y,w,h,columnIndex,boardImage:{imageUrl,width,height,caption,pending}}`，占位槽 512×512。
- 心跳：25s `ping`→`pong`（与聊天通道同节奏）；普通会话页进入白板会先 `ws_close` 聊天通道再开白板通道。

### 2.3 课程生成 `/course-generation/ws?access_token=` + `/course-generation/update?access_token=`
→：start_course_generation{query,ui_language,course_uuid,attachment_paths[],course_source_mode,canvas_selection?,interactive_structure?} / course_generation_answers[{question_index,selected_options[]}] / course_generation_answer_draft{question,answer} / course_structure_confirm / stop_course_generation / resume_course_generation{course_uuid,structure_confirmed?,answers?} / start_course_update / course_update_confirm / course_update_feedback / resume_or_start_course_session / stop_course_update
←：connection_established / course_generation_started{course_uuid,run_dir(服务端路径),run_id} / course_generation_step{step_id:boot|researching_the_web|generating_initial_syllabus|generating_course_structure|generating_session_outlines,status:loading|completed,title,placeholder} / course_generation_progress{message,data{round,max_rounds,keywords} | data{research{round,keywords,results[{id,title,url,domain}],summary}} | data{reference_ids[]} | data{stage_name,references[]}} / course_generation_questions{question_data{questions[{question,options[{title,description}],is_multiple,allow_custom,category:prerequisite|course_specific|target_level|course_scale}]},course_uuid} / course_generation_complete{course{完整课程对象}}
（2026-09-15 live 复核：progress 的四段形态按出现顺序 round→research→reference_ids→stage_name 逐条落地；questions 每题带 `category` 与 `allow_custom`；`start_course_generation` 实测字段 `query,ui_language,course_uuid,attachment_paths[],course_source_mode:"self_study",interactive_structure`；心跳 25s。）

### 2.4 PDF 批注 `/pdf-annotation/ws?access_token=`
实测：无 token 1008 关闭；携带 token 连接后待 WSDeep 交付。

## 3. REST 精选（补全 api_endpoints.md + addendum）
- `GET /api/v1/course-generation/learning-summary?week=this&timezone_offset_minutes=`（新增，本轮 courses chunk）
- `GET|DELETE /api/v1/course-generation/courses/{uuid}`
- `POST /api/v1/marketplace/courses/{marketplaceId}/enroll` 200 `{courseUuid,message}`
- `POST /api/v1/calendar/approve_tasks {task_id, action:'approve'}` 级联子任务
- `POST /api/v1/deep_learn/get_session_data {deep_learn_session_id}` → `{conversation_data{title,history,user_id,progress{}} , session_task_plan}`
- `POST /api/v1/share_record/share_records {type,shared_object_id,shared_with:{share_to_everyone}}`→`/share/c/<id>`
- `POST /api/v1/conversations/get_shared_conversation_data {shared_object_id,type}` 无鉴权（已知泄漏）
- `GET|POST /api/v1/files/{id}` 公开制品（pdf/html）
- `GET /api/v1/diagram/{id}/diagram.{md,html,png}` 公开
- `POST /api/v1/drive/upload_file_to_drive` multipart → `{file_id,s3_path,conversion_scheduled,summary_scheduled,thumbnail_scheduled}`
- `POST /api/v1/memory/apply_memory_ops {operations:[{memory_type:preference|knowledge|logistics|other,action,...}]}`
- `POST /api/v1/invite/generate_invite_register_link_with_rewards {invite_type:'type-001'}`
- `POST /api/v1/affiliate/join` → dub.link
- `POST /api/v1/partner-code/check {code}` / redeem
- `POST /api/v1/subscription/redeem_coupon {coupon_code,invite_code}`
- `GET /api/v1/stripe/plans`
- 白板媒体（公开，无鉴权）：`GET /api/v1/whiteboard/images/{32hex}.{png|svg}`、`GET /api/v1/whiteboard/audio-stream/{user_id}/{session_id}/tts_<前缀>_<seq>_<hash6>.{webm|mp3}`（实测命名 `tts_b6a11f95_0_86767d.webm`）

## 3.5 课程操作子系统（第四轮自 ModuleCat 反编译挖潜，44 路由前后端配套）
- `GET /api/v1/course-generation/courses/{uuid}` / DELETE
- `GET .../generation-status` / `progress-status` / `structure` / `learning-summary?week=&timezone_offset_minutes=`
- 结构编辑：`POST .../structure/edit|apply|discard|regenerate|undo`
- 练习：`GET .../practice`、`POST .../practice/check-fill`、`.../practice/assistant`、`.../practice/progress`、`.../practice/sessions/{sid}/questions/{qid}/tts`、`.../practice/tts/prewarm`
- 考试：`GET .../exam`、`POST .../exam/score`
- 项目：`GET .../project`、`POST .../project/assistant`、`GET|POST .../project/stages/{stage_id}/state`、`.../steps/{step_id}/draft|submission|submission/text|tts`、`.../steps/_first/tts`、`.../project/tts/prewarm`
- 课程更新：`GET .../canvas-updates` / `POST .../canvas-updates/dismiss|disable`（course-calendar 亦有 status/config/draft/accept）
- 生成日志：`GET /api/v1/course-generation/generation-log/{run_id}`、`generation-history/{conversation_id}`
- PDF 批注 REST：`/api/v1/pdf-annotation`（upload）、`/pdf-annotation/sessions`、`/pdf-annotation/course-outlines(/sessions)`、`/pdf-annotation/pdf/{session_id}/{file_id}`
- 视频制品：`GET /api/v1/video/{id}/final_video.mp4`（公开）

## 4. Agent 循环语义（directorAgent）
think → (可选 get_skills / memory_recall / search) → 内容或动作工具 → mark_response_complete 硬校验（无产出则循环，上限≈15 轮降级兜底）→ recommend_next_step（learning_progress 递增）
speed_mode=fast：禁 memory_recall/add_memory/ask_questions/search_images/search_files/content_planner/artifact_update/get_skills，走 generate_content(response_style fast)
6 skills：conceptExplanation / systematicLearning / whiteboardSession / cheatsheetGeneration / planTasks / documentReading（行为指纹见 assets/prompts/skills_fingerprints.md）
