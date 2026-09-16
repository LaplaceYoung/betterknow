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

**本仓实现补充（2026-09-15 第二轮）**
- `session_ready.key_points`：字符串数组，取自课程 session（生成时由模型产出、随课程持久化）；白板会话 id 与课程 session id 对齐——首次进入课程课节时沿用该 id 并缓存 key_points 与标题，重连不再依赖课程记录。
- `/whiteboard/course-outlines/:courseUuid/sessions` 的每条 session 同样带 `key_points`（线上 r14 实测 4 条为一组；r17 实测存在空数组样本）。

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
**生成态字段语义（本仓实现，2026-09-15 第二轮）**
- `generation-status` 的 `generatingSessionIds / generatingUnitIds / generatingStageIds` 不是常驻队列，而是「当前正在写的目标」：由 run 事件重放得到——`generating_session_outlines` 处于 loading 时列出该轮所有 session（与所属 unit），`generating_assessments` 处于 loading 时列出 project 的 stage_id。窗口长度 = 该阶段的模型耗时（本仓实测 0.7–2.5s，取决于 BYOK 模型延迟）。
- 阶段进行中，`practice / exam / project` 取 `"generating"`（线上仅观测到 `ready|none`，`generating` 为推断值），完成后回到 `ready|none`。
- 管线会自报阶段：`course_generation_step{step_id: boot|researching_the_web|generating_initial_syllabus|generating_structure|generating_session_outlines|generating_assessments|complete}`；进度事件 `course_generation_progress.data.stage_name` ∈ `researching_the_web | initial_syllabus | course_structure | session_outline:<unitId>:<sessionId> | project_stage:<unitId>:<stageId>`。
- `start_course_generation` 之后服务端自行推进（boot → 检索 → 大纲 → 问卷）；已有课程时直接回 `course_generation_complete` + 存量课程，不重跑管线。

### 2.4 PDF 批注 `/pdf-annotation/ws?access_token=`
实测：无 token 1008 关闭；携带 token 连接后待 WSDeep 交付。

## 2.5 生成任务与 TTS 服务（本仓实现，2026-09-15 第三轮）

**生成任务（与 socket 解耦）**
- `start_course_generation` 在服务端建任务（`task_id` = `run_id`），管线跑在任务里；socket 只 attach：
  - attach → 先按序回放该任务的全部帧，再订阅后续帧；
  - 断开 = detach，**不中断生成**（`generation-status` 期间照常给出 `generating*Ids`）；
  - `resume_course_generation` → 找到该用户/课程在跑的任务并回放（拿到 "刚刚发生了什么"）；
  - `stop_course_generation` → 任务停 + run 记 `disconnected`；
  - 课程已生成过 → 立刻回 `course_generation_complete` + 存量课程，不重跑。
- 一个用户同一门课程只会有一个在跑的任务（重复 start 会 attach 到既有任务）。
- 恢复方式：`GET /api/v1/course-generation/generation-log/{run_id}`（事件时间线）与 `generation-status`（目标列表）都可跨进程重启读。

**TTS 服务层**
- 所有合成经 `src/tts.ts`（seam 之上）：`synthesize / synthesizeMany / prefetch / listVoices / pcmFromWav`。
- **内容寻址缓存**：key = `sha256(provider|model|baseUrl|voice|speed|format|text)` → `var/data/tts/<hash>.<ext>`，同文本同 URL：
  - HTTP：`GET /api/v1/tts/audio/<hash>.<ext>`（`cache-control: immutable`）；
  - 白板帧 `tts_segment` / `interject_audio` 多一个 `cached` 字段（线上无此字段，属本地扩展）。
- **PCM 直出**：`format='pcm'` 请求 `response_format=pcm`（原始 PCM16 24k，免解码）；网关不支持时回落 `mp3`。`interject_pcm{interject_id, pcm_b64, sample_rate, stub}`：拿到 PCM 时 `stub:false` 且是真实采样；拿不到才发静音占位并标 `stub:true`。
- **预取**：白板讲解（讲下一句）与级联插问（念当前句时合成下一句）都会预热缓存，第二次同句直接命中。
- **语音表**：`GET /api/v1/tts/voices` → 先问 provider `GET /audio/voices`，404/失败回落内置六个（线上取值 `warm|calm|bright|gentle|firm|lively`，映射到 OpenAI 音色）。
- **REST**：
  - `POST /api/v1/tts/synthesize {text, voice_id?, speed?, format?, session_id?}` → `{audio_url, ext, mime, cached, stub, bytes, hash, tts_cjk, tts_latin, voice_id, speed}`；voice/speed 缺省取会话 `tts_config`（练习/考试朗读走这条，实现 voice_id/speed 透传）。
  - `GET /api/v1/tts/stats` → `{hits, misses, bytes, stub, prefetches, files}`。

**图像与封面**
- `image_generation.source="reference_page"`：插图直接取课件页本身（本地渲成贴图，不调图像模型），帧带 `source:"reference_page"` + `reference_name` + `page_index`；`image_gen_pending` 同步带这些字段。
- 课程封面内容寻址：`buildCourseCover`（无 key 时按标题渲 SVG）+ 图像 seam（有 key 时出图）→ `var/data/covers/<hash>.<ext>`，课程对象写 `coverImage{filePath,wideFilePath,hash,url,source}`，列表 `coverImageUrl` 指 `GET /api/v1/covers/<hash>.<ext>`（immutable）。

## 2.6 白板教学回合与生成任务的补充帧（2026-09-16 live 实证）

**白板回合的完整帧序（`r26`）**
`resume_or_start_course_session{course_session_id}` → `connection_established` → `session_ready` → `set_tts_config` → `lecture_outline_selected` → `start_teaching` → `tts_config` → `sync_whiteboard_state`(客户端持续) → `probe_ok` → `group[board,speak]` → `tts_segment` → 客户端 `action_step_complete{step_id}` → 可选 `animation_pending` → `generated_animation{html}` → `ask` → `done` → `response_complete{is_complete,status:"completed",session:false}`。

- 会话 id：白板会话 = `<course_uuid>__<course_session_id>`；`lecture_outline_id` = `<course_uuid>:<course_session_id>`。
- `ask` 两种形态：`mode:"choice"{question,options[],correct_index,explanation}` 与 `mode:"open"{question}`。
- `highlight{step_id,target_board_id,page_id,snippet}` 指向板面元素；`speak{spoken_text,step_id}` 为独立帧。
- 互动动画是服务端生成的**自包含 HTML**（CSP：`default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; img-src data:; connect-src 'none'`），样例 `reference/evidence/live_2026-09-16/r26_animation.html`。
- 客户端白板状态是分栏网格：`{version,revision,activePageId,pages[{id,overlayItems[],columnLayout{lp:{colCount,tileW,tileGapX,tileGapY,gridLeft,gridTop,usableW,usableH,exportPixelW…}}}]}`。

**课程生成的补充帧（`r27/r29/r31`）**
- 检索多轮：`course_generation_progress{message:"Researching the web (round n/5)",data:{round,max_rounds,keywords}}` → `"Round n fetched N page(s)"{data.research{round,keywords,results[{id,title,url,domain}]}}` → `"Round n summary ready"{data.research.summary}` → `"Selected N web source(s)"{data.reference_ids[]}`；正文用 `[refId]` 引用。
- 客户端草稿：`course_generation_answer_draft{question,answer}`。
- 意图路由：`course_generation_rejected{message,reason_code:"one_off_artifact",query,attachment_paths,course_uuid}`——一次性产物（出题/速查表）不该占用课程生成。
- 冷却：同一用户在其他窗口仍有生成时，问卷的「继续」不可用并提示「生成可能仍在其他窗口进行中，HH:MM 后可继续」。
- `generation-log` 的运行目录是服务端绝对路径：`/app/cache/database/user_data/<user_id>/coursesData/<course_uuid>`。

**主聊天补充帧（`r29/r30`）**
`conversation_created` → `credit_status{credit_info{remaining_credits,max_credits,tier,turn_cost},next_reset_time}` → `conversation_title_updated` → `tool_execution{directorAgent,data{phase:"thinking"}}` → `tool_selection{tool_name,tool_status:"started",round_index,index}` → `tool_execution{tool_name,display:"display"|"collapse",data{…}}` → `recommend_next_step` → `complete{tts_pending:false}`。
技能链：`get_skills` → `data.skill_name` → `ask_questions` → `user_question{question_data{questions[{question,is_multiple,options[],allow_custom}]}}`。

## 2.7 深度学习通道 `/deep_learn/ws?session_id=&token=`（2026-09-16 live 实证）

进入会话（`/deep-learn-session/<id>`）后服务端回：
`deep_learn_session_resumed{session_id, message:"♻️  Deep learning session resumed", current_step_id:"1.1", task_plan:{title, description, tags[], session_task_plan:[{unit_name, tasks:[{task_id, task_title, task_description}]}]}}`；新会话则给 `deep_learn_session_created`。

回合：c2s `user_message{message, ui_language, step_id}` → s2c `thinking{session_id, is_complete:false}` → `thinking_chunk{session_id, …}` → `tool_execution{directorAgent, data:{phase:"thinking", thought_chunk_count}}` → `tool_selection{tool_name:"generate_content", task_title, model_name, round_index, index}` → `content_chunk`×n → `tool_execution{generate_content, completed, data:{content}}` → `inline_diagram` → `step_completion`。

- `inline_diagram{placeholder_id:"dg_<12hex>", tool_name, tool_status:"ready", data:{placeholder_id, type:"gemini_image", layout:"right", status:"ready", tag, source_tag}}`；
  `tag` 形如 `<diagram data-placeholder-id="dg_…" data-subtype="gemini_image" data-layout="right" data-status="ready" data-diagram-id="RCdJcu5L" data-file-url="https://api.hyperknow.io/api/v1/diagram/RCdJcu5L/diagram.png" data-caption="…"></diagram>`；
  `source_tag` 形如 `<content-type: diagram; diagram-subtype: gemini-image; content-prompt: {…}; content-caption: {…}>`。
- `step_completion{tool_name:"manage_task_progress", message:"Ready to mark this step complete", step_data:{task_id, task_title, task_description, unit_name}, next_step:{…}, requires_acknowledgment:true, conversation_id}`——客户端确认后进入下一步。
- 步骤 id 形如 `1.1 / 1.2 / 2.1`；`user_message` 自带 `step_id`。

**对话通道的技能问卷（r29/r30）**：技能入口先 `get_skills{success:true, skill_name:"cheatsheetGeneration"|"documentReading"}`，再 `ask_questions` → `user_question{message:"I need to ask you some questions to better understand your needs", question_data:{questions:[{question, is_multiple, options[], allow_custom}]}}`，答案由客户端回发（本仓用 `question_answers`）。

**时序坑（本仓实现注意）**：WS 处理器若在注册 `message` 监听之前 `await` 任何东西，客户端 `open` 后立刻发的第一帧会丢；先挂监听、再准备会话，把早到的帧排队。

## 2.8 对话产物工具家族（2026-09-16 live 实证，`live_2026-09-16/r35,r36`）

四个产物工具的帧序都是 `tool_selection{...,round_index,index:0}` → `tool_execution{...}`（可能多条阶段帧），`display:"display"`。

**抽认卡 `generate_flashcards`**
`data = {flashcards:[{question, answer, index}], total_count, title?}`，`index` 从 1 开始（首张 index=1，客户端按 `n / N` 翻页）。

**HTML 动画 `generate_html_animation`**
`data = {diagram_id:"cqKXjnoD"(8 位), type:"html_animation", file_url:"https://api.hyperknow.io/api/v1/diagram/cqKXjnoD/diagram.html", content:"<!DOCTYPE html>…"(20KB)}`。
- `file_url` **公开可访问**（实测 200 `text/html`，无鉴权）；同 id 的 `diagram.png` 对 html_animation 是 404。
- 样例（`r35_animation_chat.html`）与白板动画同族：米色纸面变量 `--bg-color:#F2EBE1 / --panel-bg:#E8DFCF / --text-main:#3C3633 / --accent-border:#C8BCA7 / --slider-track:#D4C9B4 / --slider-thumb:#7B6C5C / --highlight:#A65A4B`，`<canvas>` + `requestAnimationFrame` + `input[type=range]`。

**发布文件 `publish_file`**
按「对话条目下标」取内容：没有有效条目时 `tool_status:"error"` + `data:{error:"No valid conversation entries found for selected indices."}`，随后跟一条 `agent_response{content:"Something went wrong on my side…", conversation_id, is_complete:false}` 兜底；成功时返回公开文件 URL（本仓 `/api/v1/files/<id>`，文件名含中文时必须用 RFC 5987 `filename*`，否则 Node 会因 header 非法字符 500）。

**教学视频 `generate_instructional_video`**
阶段帧（全部 `tool_execution`，`data:{stage, message}`，`tool_status` = `started`/`processing`）：
1. `initializing` — "Initializing educational video generator..."
2. `script_writing` — "Scene planning completed: 4 scenes"
3. `generate_narration` — "Voice generation completed: 6 clips"
4. `code_generation` — "Code generation completed for 4 scenes"
5. `video_render` ×N — "Scene 2 (manim) rendered successfully - 1/4 completed" …（含 `remotion` 引擎的场景）→ "All scenes rendered, compositing final video..." → "Video generation completed! 4 scenes, 87.0 seconds"
6. `complete` — `tool_status:"completed"`，`data:{message:"Video generated successfully! Access URL: https://api.hyperknow.io/api/v1/video/<9字符id>/final_video.mp4"}`
上游按幕用 **manim / remotion** 渲染后合成。**本仓实现（同日）**：`src/videoRender.ts` 逐幕渲染——数学幕用 KaTeX（内联样式/脚本）+ 时间轴寻帧（`#t=<ms>` + 页面自定 `window.__seek(ms)`）生成帧序列，HTML 幕用无头 Chromium 逐帧截图（playwright 缓存的 headless shell），再交给 ffmpeg 逐幕编码与 `concat` 合成；旁白走 TTS seam（无 key 时静音）。阶段消息与线上逐字同构（`Scene N (manim|remotion) rendered successfully - k/N completed`）。

## 2.9 PDF 导读通道 `/pdf-annotation/ws?access_token=&session_id=`（2026-09-16 实证 + 本仓实现）

**线上帧形（`reference/evidence/pdf_teaching_trace.json`）**
- `session_ready{session_id(32hex), resumed:true, pdf_state:{revision, file_id:"ref_…", annotations:[]}, board_state, course_state:{course_session_id, course_session:{…}}}`——PDF 状态是 `revision + annotations[]`，带课程上下文时为课程课节导读。
- `tts_config{voice_id:"firm", speed:1.0}`（默认 `firm`）。
- 讲解：`speak{page_index, step_id, say, tts_url:"/api/v1/pdf-annotation/audio-stream/<user>/<session>/tts_<prefix>_<seq>_<6hex>.wav"}` → `annotation{annotation_type:"highlight", page_index, step_id, ann_id, text, say, tts_url}`（`text` 就是**页面上要高亮的原文短语**）→ `ask` → `mark_response_complete` → `done`。
- 插问沿用级联：`interject_ready{interject_id, mode:"cascade"}` → `interject_text{delta}` → `interject_audio{audio_url, sequence, speed, text}` →（本仓另有 `interject_pcm`）→ `interject_done{control:"none", text}`。
- 音频路径前缀与白板分开：`/api/v1/pdf-annotation/audio-stream/...`（扩展名实测 `.wav`）。
- 上传：`POST /api/v1/pdf-annotation/upload`（multipart：`session_id` + `file`）→ `{file_id, filename, size}`；**上传早于 WS 建会话时服务端要自己建会话记录**，否则 `file_id` 会丢、`start_teaching` 直接报「没有 PDF」。

**本仓实现**
- 音频统一走 TTS 服务层：真音频落内容寻址缓存（`/api/v1/tts/audio/<hash>.<ext>`），PDF 路由按 `/api/v1/pdf-annotation/audio-stream/...` 回源，找不到时回退白板音频目录（stub 占位片段就在那里）。
- 前端 `PdfSession`：pdf.js 渲染页面（canvas）+ 逐页翻页 + 标注短语高亮面板 + 讲稿流 + 「开始导读」+ 就本页提问；`sync_pdf_state` 回写 `{revision, file_id, current_page, total_pages, annotations[]}`。

## 2.10 练习 / 考试 / 项目的运行接口（2026-09-16 实测，含 FastAPI 校验回显）

路径前缀 `/api/v1/course-generation/courses/{course_uuid}/`。

| 端点 | 方法 | 请求体 | 响应 | 备注 |
|---|---|---|---|---|
| `practice` | GET | — | `{sessions:[{sessionId,title,questions[]}]}` | 练习题库 |
| `practice/start` | POST | `{sessionId}` | `{started:true,charged:false}` | 练习运行起点；`charged` 表示是否扣额度 |
| `practice/progress` | POST | `{sessionId, finished:bool, items:{<questionId>:{…}}}` | `{status:"ok", session_id, score, total, completed, updated_at}` | **items 是字典**（不是数组）；缺字段回 422 FastAPI 结构 |
| `practice/check-fill` | POST | `{sessionId, questionId, answer}` | `{correct, judged, feedback}` | 填空判分；找不到题 → 404 `{"detail":"Fill question not found"}` |
| `practice/assistant` | POST | `{session_id, messages:[{role,content}]}` | `{role:"assistant", message, hint, messages[]}` | 多轮；只给提示不给答案 |
| `exam` | GET | — | `{exams:[{unitId,title,questions[]}]}` | 无考试时 404 `{"detail":"Exam not found"}` |
| `exam/start` | POST | `{unitId}` | `{status:"in_progress", unit_id, started, charged}` | 缺 unitId → 400 `unitId is required` |
| `exam/status` | GET | — | `{status:"none"\|"in_progress"\|"completed"}` | 考试状态机 |
| `exam/score` | POST | `{unitId, score}` | `{status:"ok", final_score, unit_id}` | 交卷计分 |
| `project` | GET | — | `{courseUuid, projects:[{project_id, project_name, project_description, final_deliverable}], stages[…]}` | 项目结构 |
| `project/assistant` | POST | `{stage_id, messages:[{role,content}]}` | `{role, message, messages[]}` | 阶段级导师 |

**练习界面的机制（DOM/类名实测）**：`practice-page / practice-topbar / practice-progress-dots / practice-hud(chip--bonus, chip--score) / practice-slot-score(+digit-strip) / practice-timer(+fill) / practice-question-shell / practice-assistant-toggle / practice-feedback-wrap / practice-split--no-image`。
- 每题 **10s 倒计时**（`practice-timer-fill` 进度条），**速答奖励 +200**（HUD chip），**得分**用数字滚轮显示；未超时答对给奖励。
- 选项按 **1..4 编号**（不是 A/B/C）；有「检查答案 / 跳过 / 下一题」与「AI 随堂助教」（提示式，不直接给答案，支持截图）。
- 文案：「全部答对，这次练习就会被标记为『已掌握』，为这门课完成对应环节。」——全对才记 mastery。

## 2.11 项目实战（阶段 / 步骤 / 状态）（2026-09-16 实测）

- `GET /project` → `{courseUuid, projects:[{project_id, project_name, project_description, final_deliverable}], stages[]}`；
  `stages[]` 的键实测为 **`stage_id, parent_project_id, unit_id, stage_title, stage_description, deliverable_increment, steps[]`**（每个阶段带 `steps`）。
- `GET /project/stages/{stage_id}/state` → **`{submissions:{}, drafts:{}}`**：稿件与提交按阶段存，`drafts` 以步骤为键。
  同路径 `POST`/`PUT` 实测 405（线上只读）。
- 线上没有独立的「提交阶段」端点：试过的 `submit` / `submission` / `draft` / `grade` / `feedback` / `evaluate` / `steps` 全是 404——阶段交付与评审走**对话/智能体**，服务端只暴露只读状态。
- `POST /project/assistant {stage_id, messages[]}` 是阶段级导师（提示式）。
- 本仓扩展（明确标注，不是线上行为）：`POST /project/stages/{stage_id}/state {submission?, drafts?}` 落盘提交与草稿。
  **评审不做本地编造**：配置了语言模型（BYOK）就调模型按 `{"score":0-100,"feedback":string}` 评分；没有 key 时返回 `evaluated:false`、`score:null`，并写明「未配置模型时不评分」。

## 2.12 学习日程（日历任务）（2026-09-16 实测）

- 列表：`GET /calendar/list_main_tasks`、`GET /calendar/list_pending_main_tasks`（本仓返回 `{tasks[], count}`）；任务详情所需字段：`description`、`subtasks[]`、`progress`（已完成百分比）。
- 任务详情界面（实测按钮）：**删除任务**（弹二次确认「你确定要删除 … 吗？此操作无法撤销。」→ 取消/删除）、**开始课堂**、以及配额面板（文件生成 x/50 本周、深度学习课堂 x/50 本周、重置时间）。
- **「开始课堂」= 用子任务开一节深度学习课**：实测点击后跳到 `/deep-learn-session/outline/<subtask_id>`，页面显示「课堂大纲」——单元/任务两级（`1.1/1.2/2.1/2.2`），随后可「开始课堂」进入会话。
- 本仓：`POST /calendar/deep_learn_subtask_session {subtask_id|task_id, title}` → 建一节带计划的深度学习会话，返回 `{deep_learn_session_id, task_plan, deep_learn_session_url:"/deep-learn-session/outline/<id>"}`；`POST /calendar/remove_task {task_id}` 删除；`POST /calendar/approve_tasks {task_id, action}` 确认/完成。
- 知识库文件卡（`knowledge-base`）结构：`.file-card > .file-card-image-preview > button.file-card-calendar-button[aria-label="Add to calendar"]`——文件可直接加入学习日程（免费版配额 2/周）。

## 2.12.1 课程加入日历：draft / accept（2026-09-16 r114 客户端实证 + 本仓实现）

- **出稿**：`POST /api/v1/course-calendar/draft`，体 `{course_uuid, start_date:"YYYY-MM-DD", duration_days, preferred_weekdays:[0-6]}`。
  客户端判定 `res.success && Array.isArray(res.items) && res.items.length > 0`，否则显示「Could not generate a schedule for this course.」，成功则用 `res.items` 铺预览、`res.course_title` 作标题，然后进第 4 步。
  缺字段回 **422**，体是 FastAPI 形状：`{"detail":[{"type":"missing","loc":["body","duration_days"],"msg":"Field required"}]}`（线上实测只带 `{course_uuid}` 时 422，文案点名 `duration_days`）。
- **落库**：`POST /api/v1/course-calendar/accept`，体 `{course_uuid, course_title, items[]}`，item 形如 `{course_object_type, course_object_id, title, description, scheduled_for}`；**替换语义**（这门课原有计划先清掉）。
- 本仓：draft 已从桩改为真出稿（课程结构 → `items[]`，按 `ceil(n/可用天数)` 顺序均摊、`preferred_weekdays` 过滤、日期出 `YYYY-MM-DD`），校验与 422 形状照线上；分配算法线上没抓到，均摊是本仓口径。客户端第 3 步「下一步」改为调 draft，失败沿用本地排布并报错。

## 2.13 知识库与用量（2026-09-16 实测）

- 知识库页数据来自 `GET /drive/get_drive_data`（`{file_data{id:{id,ext,name,size,type,status,parent_id,created_at,modified_at,thumbnail_url}}}`, `metadata.drive_used_source_bytes`）；`drive/ws` 是同页的信道（4 条连接实测）。
- **文件卡只有一个动作按钮**：`.file-card-calendar-button[aria-label="Add to calendar"]` → `POST /drive/add_file_to_calendar`（实测 200），点击后「添加到日历」计数 +1。
- 用量面板（知识库右上）：**存储空间 x / 1 GB**、**文件上传 x / 50 本周**、**添加到日历 x / 20 本周**（专业版），并给出重置时间（周一 08:00 GMT+8）。
- `GET /auth/other_function_usage_limits` 是本仓的用量口径来源：BYOK 版不设商业限额，但**已用计数如实上报**（`{remaining, limit, used, last_reset_at}` + `storage_limit_bytes`）。
- 学习日程页分组（实测按钮/标题）：**已确认任务 / 待处理任务 / 批量删除日程 / 您的专业版配额 / 周视图 / 月视图**；批量删除在选中态下列出「删除所选 N」。

## 2.14 白板工具条与面板（2026-09-16 实测）

白板默认就在 **zen（沉浸）模式**，工具条上有 `disable-zen-mode`（文案「Exit zen mode」）。实测可见控件：
`dropdown-menu-button main-menu-trigger` / Zoom out（`Cmd+-`）/ Reset zoom / Zoom in（`Cmd++`）/ `help-icon`（Help — ?）/ 缩放（缩小 · 100% · 放大）/ 上一页 / 下一页 / **导出**（`whiteboard-export-menu-wrap`）/ 设置 / 退出 Session / 检查我的网络 / 本节大纲 / 关闭声音 / 对话历史（BETA 标记）。
左侧白板面板类名：`whiteboard-outline-panel`、`whiteboard-outline-keypoints`、`whiteboard-outline-keypoint(-marker/-text/-dot/-live)`——**要点逐条列出，并用 `-live` 标出当前正在讲的那一条**。

本仓实现：zen 切换（默认沉浸，按钮文案与线上一致）、导出菜单（Markdown / PDF 打印）、检查我的网络（`GET /net-check` → 结果就地提示）、本节要点面板沿用 `session_ready.key_points`。

## 3. REST 精选（补全 api_endpoints.md + addendum）

补充（2026-09-15 第二轮）：
- `GET /api/v1/social/latest` → `{"enabled":true,"post":null}`（线上 r1/r7/r12/r13 四次抓包 `post` 均为 null，非空结构未观测，本仓恒 null）。
- `GET /api/v1/course-publish/availability` → 线上**本身返回 404**（r2/r11/r14/r17 四轮实测），前端容错；本仓不实现该路由（404 体为 `{"detail":"Not Found"}`）。

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

**本仓实现（2026-09-16 第八十四批）**：提示词本身就是按「模型自己挑工具」写的，所以主路径现在是**真 function calling**——`chatToolEvents` 带 `tools` 调模型，解析流式 `tool_calls`（含 `delta.reasoning` 作为 thinking 流），逐个执行后以 `role:"tool"` 回灌，直到模型不再调工具或调用 `mark_response_complete`（上限 4 轮）。工具表见 `src/agent/tools.ts`（memory_recall / get_skills / search_files / search_and_summarize_web / generate_content / generate_quiz / generate_flashcards / generate_html_animation / generate_instructional_video / publish_file / ask_questions / mark_response_complete）。

- 每一轮用户消息会附上线上提示词要求的回合参数：`reply_language` / `speed_mode` / `mode` / `integrations`（此前没带，提示词里这几条规则等于失效）。
- **多步工作流技能仍走关键词分支**（whiteboardSession / systematicLearning / cheatsheetGeneration / planTasks / documentReading），因为它们的帧序是定制的；产物类（抽认卡/动画/教学视频/发布文件）与普通讲解走模型挑工具。
- stub 模式或模型侧失败一律回退关键词路径，不让整轮挂掉。


think → (可选 get_skills / memory_recall / search) → 内容或动作工具 → mark_response_complete 硬校验（无产出则循环，上限≈15 轮降级兜底）→ recommend_next_step（learning_progress 递增）
speed_mode=fast：禁 memory_recall/add_memory/ask_questions/search_images/search_files/content_planner/artifact_update/get_skills，走 generate_content(response_style fast)
6 skills：conceptExplanation / systematicLearning / whiteboardSession / cheatsheetGeneration / planTasks / documentReading（行为指纹见 assets/prompts/skills_fingerprints.md）

## 2.15 语音链（2026-09-16 live 实证：`r133/r137/r169` + 本仓实现）

**客户端采集（`r137`）**：`navigator.mediaDevices.getUserMedia({audio:{echoCancellation,noiseSuppression,autoGainControl}})` → `MediaRecorder`，编解码按优先级 `["audio/webm;codecs=opus","audio/ogg;codecs=opus","audio/webm","audio/mp4"]` 取第一个 `isTypeSupported`，`start(1000)` 每秒切片，`ondataavailable` 攒 chunk；`stop` 后过两个门槛丢弃碎音：时长 < 阈值、`Blob.size < 512`。服务端路径 `FileReader.readAsDataURL` → base64。打断用自托管 VAD：`/vad/silero_vad_v5.onnx` + `vad.worklet.bundle.min.js`（onnxruntime-web，`requestIdleCallback` 预热），检测到说话才把预滚缓冲一起送。

**麦克风输入（说给输入框，不直接提问）**
- 客户端 → `voice_stream_start` → `voice_audio_chunk{pcm_b64}`（24kHz 单声道 PCM16）→ `voice_audio_end`；取消用 `voice_stream_cancel`。
- 服务端 → `voice_stream_text{delta}`（流式转写增量）→ `voice_transcript{text}`（终稿；客户端把它贴到「🎤 …」占位气泡上）。

**冷提问（安静时说话）**——同一帧可只带音频：
```
{type:"user_message", message?, audio_b64?, audio_mime?, audio_duration_ms?}
```
服务端转写后回 `voice_transcript{text}`，正文用转写结果。注意 `user_message` 用 `audio_mime/audio_duration_ms` 前缀字段。

**打断（讲解进行中说话）**
- `interject_start{source, mode, step_id, offset_ms, boards:true}` → 服务端 `interject_ready{interject_id, mode}`（`mode:"live"` 为实时打断；非 live 时客户端会撤掉刚发的气泡）。
- 整段音频：`interject_question{text?, audio_b64?, mime?, duration_ms?, offset_ms?}`（**注意这里是不带 `audio_` 前缀的 `mime/duration_ms`**，与 `user_message` 不一致，属线上原样）。
- 流式音频：`interject_audio_chunk{pcm_b64}` → `interject_audio_end`；丢缓冲用 `interject_audio_flush`。
- 服务端帧：`interject_user_text{interject_id, delta, retract?}`（用户说的话，`retract:true` 表示撤回气泡）→ `interject_text{interject_id, delta}`（回答文本）→ `interject_audio{interject_id, audio_url, text, boards?, explain?}` / `interject_pcm{interject_id, pcm_b64, sample_rate:24000}`（流式 TTS PCM）→ `interject_board{interject_id, boards}` → `interject_speech_end{interject_id, continues}` → `interject_done{interject_id, control:"stop"|"replan"|"none", skip_segment}`；`interject_resume` 让暂停的讲解接着讲。

**音频探针**：`GET /api/v1/audio-probe?n=<cb>`（带 Bearer，`cache:"no-store"`）——200 可播；429 冷却回 `{retryInS}`；503 `{state:"draining"}`。

**本仓实现差异**：只做「按一次说、再按一次停」的整段上传，不做客户端 VAD/预滚与 `interject_audio_chunk` 流式分片（转写是一次性 `/audio/transcriptions` 调用），因此 `interject_user_text`/`voice_stream_text` 各只发一条全量 delta；`interject_pcm` 的流式 TTS 依旧按句发，字形与线上一致。BYOK 五槽里的 STT 槽就挂在这条链上（没配 key 时回固定占位文本并标 `stub`）。
