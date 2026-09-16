# 设计层差距（2026-09-15 live 复核）

对照三方：**线上实测**（`reference/evidence/live_2026-09-15b/`，本轮 ego-browser 实抓）· **既有契约文档**（`hyperclone/spec/PROTOCOL.md`、`FEATURES_MATRIX.md`、`reference/evidence/api_endpoints*.md`）· **本仓实现**（`hyperclone/server/src/*`、`app/src/*`）。
工具：`reference/live/cap.mjs`（CDP + 页面内传输钩子）、`reference/live/gap_scan.py`（端点三方对账）。

口径：**P0** = 影响对外契约正确性/上线形态；**P1** = 影响功能完整度与可运营性；**P2** = 保真度与工程整洁度。

---

## 1. 部署与域分层（P0）

| 面 | 线上 | 本仓 |
|---|---|---|
| 前端 | `agent.hyperknow.io`（SPA + 页面资源 `/pages/**`、`/components/sidebar/*.svg`、`/avatar/1.svg`） | 与 API 同源，Fastify 静态托管 `app/dist` |
| 后端 | `api.hyperknow.io`（REST + 5 条 WS），跨域调用，`OPTIONS` 预检贯穿所有写接口 | 同源 `/api/v1/*`（`app/src/lib/api.ts` 硬编码相对路径） |
| 对象存储 | S3 `nutcracker-hyperknow-public.s3.us-east-2.amazonaws.com`（drive 缩略图、公开制品直链） | 本地磁盘 + 本地静态 |
| 第三方 | `aplo-evnt.com`（intent pixel）、`g.clarity.ms`（Clarity） | 无 |

差距：**自部署形态下不做独立 API 域与对象存储**（决策见 §10）：本仓单源托管（同域 `/api/v1`）即可，CORS 由同一 Fastify 的 `onRequest` 头覆盖；S3 面改为本地 `var/data/**` + 本地静态路由，客户端契约（`thumbnail_url`、图片 URL 等）保持字段不变、只换域名来源。第三方埋点与错误上报不做，同样记入 §10。

## 2. 鉴权与会话（P0）

线上实测：JWT 由 Supabase 签发（`iss=https://mcpbxxrodqgsmatssajx.supabase.co/auth/v1`），claims：`sub/aud/exp/iat/email/app_metadata.provider/user_metadata.display_name/role/aal/amr`；REST 走 `Authorization: Bearer`，WS 走 query（chat `?token=`，whiteboard/course-generation/pdf 用 `?access_token=`）；`localStorage` 键为 `access_token` / `refresh_token`（不透明串，非 JWT）/ `token_timestamp`。

本仓：自签 JWT + `/api/v1/auth/auto_token`（设备免登录），无 OAuth 链路、无 refresh 轮换、无 `token_timestamp` 刷新节流。

差距（设计层）：**自部署不加鉴权服务**（决策见 §10）——只保留 `Authorization: Bearer` 与 WS query 的**形状兼容**，实现走设备免登 `POST /api/v1/auth/auto_token`；不引入 Supabase/OAuth/refresh 轮换。需要保留的两条契约：① WS query 命名按通道固定（chat `token`，whiteboard / course-generation / pdf / deep_learn `access_token`，已对齐）；② 本地 JWT 的 claims 至少含 `sub`（用户 id），供 `request.userId` 与多用户隔离使用。

## 3. 实时协议（P0/P1）

### 3.1 聊天通道 `/api/v1/ws`
本轮全帧留档（`r9_chat_transport.jsonl`）。信封为**扁平可选字段**：`{type, data?, message?, chunk?, tool_name?, tool_status?, display?, round_index?, index?, is_complete?, timestamp?}`。
帧序：`user_message` → `conversation_created` → `conversation_title_updated` → `tool_execution(directorAgent,phase=thinking)` → `tool_selection(generate_content, model_name, response_style, response_type, guideline, task_title)` → `tool_execution(started)` → `content_chunk × N` → `tool_execution(completed, data{model_used, chunk_count, total_length, content})` → `recommend_next_step(next_steps[{display_step, step_prompt}])` → `complete{conversation_id, tts_pending}`。
`credit_status` 带 `credit_info{turn_cost}` 与 `next_reset_time`；`conversation_resumed` 出现在复用会话时；心跳 25s。

文档/实现差距：
- `PROTOCOL.md` 未记录 `response_style` / `response_type` / `index` / `task_title` / `tts_pending` / `next_reset_time`。
- 内联图协议实测形态：`<diagram data-placeholder-id data-subtype="gemini_image" data-layout="right" data-status="pending" data-caption>`（跟随 `inline_diagram` 帧）——我们的内容流渲染需按此解析占位符。
- 实现侧 `chatTools` 只有 11 个工具（`ws.ts`），线上工具面 28+；工具路由靠关键词启发式，线上由 directorAgent 决策（`tool_selection.model_name` 显示真实选型）。

### 3.2 白板通道 `/api/v1/whiteboard/ws`
实测（`r12_whiteboard.jsonl`）：c2s `resume_session` / `set_tts_config` / `ping` / `user_message` / `sync_whiteboard_state` / `action_step_complete`；s2c `connection_established` / `session_ready` / `tts_config` / `pong` / `group` / `tts_segment`。

关键结构差异：
- 白板内容是**动作组**：`group.actions[] = {type:"board", board_content, step_id, board_uid, page_id, title}` 或 `{type:"speak", spoken_text, step_id}`；`session_ready.messages[]` 中 assistant 消息的 `content` 就是这种动作组 JSON 字符串（讲稿以动作组形态持久化在会话里）。
- `tts_segment{audio_url, sequence, step_id, tts_cjk, tts_latin, speed}`，音频取 `/api/v1/whiteboard/audio-stream/{user_id}/{session_id}/tts_<sid>_<seq>_<hash>.webm`。
- `session_ready` 新增字段 `key_points`。
- 白板通道接受 `user_message`（讲课中直接插问）。

文档差距：`PROTOCOL.md` 的白板章节只有扁平 `board` 帧，缺 `group` / `speak` / `tts_segment` / `key_points` / 白板内 `user_message`（本轮已补进 `PROTOCOL.md` §2.2）。
实现差距（2026-09-15 修正）：`ws.ts` 原本就发 `group`+`speak`+`tts_segment`，但 `tts_segment` 只有 URL、没有 `tts_cjk`/`tts_latin`/`stub` 字段，且音频是占位 webm；插图动作与帧完全缺失。本轮补齐：TTS 走 BYOK 落盘出声（计数口径对齐线上）、`image_generation` 动作与 `image_gen_pending`/`generated_image`/`image_gen_failed` 帧序、`/api/v1/whiteboard/images/:file` 路由、客户端 `<figure>` 渲染。已补齐（2026-09-15 第二轮）：`session_ready.key_points` 由课程 session 提供并缓存；白板会话 id 与课程 session id 对齐。

### 3.3 课程生成通道 `/api/v1/course-generation/ws`
实测（`r15_course_generation.jsonl`）：
- c2s `start_course_generation{query, ui_language, course_uuid, attachment_paths[], course_source_mode:"self_study", interactive_structure, canvas_selection?}`。
- s2c `connection_established` → `course_generation_started{run_id, run_dir}` → `course_generation_step{step_id: boot|researching_the_web|generating_initial_syllabus|…, status: loading|completed, title}` → `course_generation_progress`（三段形态：`{round,max_rounds,keywords[]}`、`{research{round,keywords,results[{id,title,url,domain}],summary}}`、`{reference_ids[]}`、`{stage_name,references[]}`）→ `course_generation_questions{question_data{questions[]}, course_uuid}`。
- 问卷每题带 `category`（`prerequisite|course_specific|target_level|course_scale`）与 `allow_custom`；选项 `{title, description}`。

文档差距：`PROTOCOL.md` 的 questions 形状缺 `category` / `allow_custom`；progress 缺 `research.summary`、`reference_ids`、`stage_name+references`；`run_dir` 泄漏为服务端路径（`/app/cache/database/user_data/<user>/…`，证据保留，勿照搬）。
实现差距：无「生成运行态」持久化（`run_dir`/run 记录），`generation-log` 是空壳（见 §5）。

### 3.4 通道生命周期
实测白板页会先 `ws_close` 聊天通道再 `ws_open` 白板通道（同一 tab 内互斥），而课程生成页与聊天通道并存。我们的前端是多页各自开 socket，无互斥/复用策略——设计上需要一条「当前主导通道」的明确规则，否则 TTS/心跳会重复占用。

## 4. 计费与限额（P1）

线上：`check_user_subscription` → `tier:"pro"`、`plan_id:"pro25b"`、`max_credits:80`、`reset_interval_hours:12`、`will_reset_at`、`last_reset_at`；WS `credit_status.credit_info.turn_cost = 1`；`other_function_usage_limits` 给四类**周限额**：`file_upload 50 / file_generation 50 / calendar_add 20 / deep_learn_session 50`（`version: 1.0`）。

本仓：`other_function_usage_limits` 直接返回 `tier:'byok'` + 999999 的桩；积分走演示制（即时协助 1 / 课程生成 10），无 12h 轮转、无 per-feature 计数、无 `turn_cost` 字段。

差距（设计层）：**BYOK 形态不做云空间与计费**（决策见 §10）——不实现 12h 轮转、积分扣减、per-feature 周限额与 Stripe 面；要保留的是**字段形状**：`check_user_subscription.subscription`（`tier/max_credits/remaining_credits/reset_interval_hours/will_reset_at`）、`other_function_usage_limits`（四类 `{remaining,limit,last_reset_at}`）、WS `credit_status.credit_info.turn_cost`。这些字段前端到处在读，删字段会连带炸 UI；表达「无限」用具体数值而不是换 `tier` 名。前端侧对应地把配额/升级位改成中性提示（**待办**：`/learning-feed` 的「您的专业版配额」、`/knowledge-base` 的「专业版」徽标目前我们只有功能没有这些位）。

补充（本轮 r18 走查）：线上日历页与知识库页把配额与订阅做成了可见产品面（`已确认任务 / 待处理任务 / 批量删除日程 / 您的专业版配额`、`专业版` 徽标 + `升级` CTA）；本仓按 BYOK 决策不照搬促销位。

## 5. 课程子系统契约（P1）

| 端点 | 线上实测 | 本仓 | 结论 |
|---|---|---|---|
| `…/generation-status` ✅ 已对齐 | `{practice:"none"\|"ready", exam, project, generatingSessionIds[], generatingUnitIds[], generatingStageIds[], practiceBySession{sessionId:"locked"\|…}}` | 全字段齐（`generating*Ids` 由 run 事件重放、`practiceBySession` 状态机）；阶段内状态值多一个 `"generating"` | 线上仅观测到 `ready\|none`，`generating` 为本仓补充 |
| `…/progress-status` ✅ 已对齐 | `{examScores{}, practiceStats{sessionId:{started,finished,correct,total}}, projectStages{stageId:{touched,completed,started}}, examStarted{}}` | 无 seed 时回落到 `{course_uuid,status,progress,generation_complete,current_step,error}` | **契约不一致**，需按线上四张表重做 |
| `…/structure` ✅ 已对齐 | `{structure:{courseTitle, courseDescription, targetLearner, units[…]}}` | `{course_uuid, structure:{units}, pending_update, can_undo}` | 外层缺课程元信息，字段名需对齐 |
| `…/canvas-updates` ✅ 已对齐 | `{hasBaseline,newFiles,changedFiles,newAssignments,changedDue,syllabusChanged,newModules,changedModules,newAnnouncements,changedAnnouncements,total,pushDisabled}` | `{updates:[], enabled:true, course_uuid}` | **契约不一致** |
| `…/project` ✅ | `{courseUuid, projects[{project_id,project_name,project_description,final_deliverable}], stages[{stage_id,parent_project_id,unit_id,stage_title,stage_description,deliverable_increment,steps[…],started,startedAt}]}` | 有实现（seed 驱动） | 字段对齐即可 |
| `…/practice` / `…/exam` | 539KB / 82KB（答案内联，`exams[{unitId,title,questions[]}]`） | seed/合成 | 结构对齐即可 |
| `generation-log/{run_id}` ✅ 已对齐 | `{run_id,user_id,course_uuid,query,status,events[{t,dir,type,query,canvas,ui_language,attachment_count,attachment_paths,interactive_structure}],error_logs[],started_at,ended_at,updated_at,total_run_time,url,rating_value,rating_comments}` | `{run_id,status:'completed',events:[],log:[]}` | **空壳**，生成日志页无真实数据 |
| `course-calendar/status` ✅ 已对齐 | `{scheduled, count}` | `{course_uuid, configured:false, status:'not_configured'}` | **契约不一致** |
| `course-calendar/config` ✅ 已对齐 | `{enabled:true}` | `{configured:false, start_date, duration_days, preferred_weekdays}` | **契约不一致** |
| `course-publish/availability` | 路由存在，课程页加载即调用 | **线上亦 404**（r2/r11/r14/r17 四轮实测 `{"detail":"Not Found"}`），前端容错；本仓与其一致，不做实现 | 不是缺口，是上游尚未上线 |

## 6. 可观测性与增长埋点（P1）

线上有两条我们完全没有的链路：
1. **错误上报**：`POST /api/v1/error/add_error_log {conversation_id, conversation_type:"main_agent", error_type:"internet_connection_timeout", error_data:{cloudflare_trace, ip, uag, …}}`（本轮真实触发一次断连超时，说明错误类型是有枚举的，且会把 Cloudflare trace 一并带上）。
2. **行为埋点**：`aplo-evnt.com/api/v1/intent_pixel/{can_track_visitor,track_request}`，payload `[{apollo_anon_id, event_type:"page_visit", page, referrer, utm_source/medium/campaign/content/term, email_md5, email_sha2}]`；另有 Microsoft Clarity。

差距：没有 telemetry 层（错误归因、页面漏斗、utm 归因、匿名 id 生成与合规口径）。这是「可以不做」的产品选择，但**设计文档里应显式声明不做的理由**，否则每次复核都会被判为缺口。

## 7. 资产与媒体（P2）

**已完成（2026-09-15，BYOK 媒体链路）**：
- 白板插图：教师动作 `image_generation{prompt,language,caption}` → `image_gen_pending`（`prompt_preview` 前 117 字符 + `…`）→ BYOK 图像模型（OpenAI 兼容 `/images/generations`，`512x512`）→ 内容寻址落盘 `var/data/whiteboard/images/<hash32>.{png|svg}` → `generated_image{image_url,width,height,caption}`；无 key 时落 512×512 SVG 占位（`stub:true`），失败发 `image_gen_failed`。模板与线上三例逐字对照见 `seed/prompts/whiteboard_image_prompt.md`。
- 白板 TTS：`speak` / interject 句子 → BYOK TTS（`/audio/speech`）→ 落盘 `var/data/whiteboard/audio/…` → `tts_segment{audio_url,sequence,step_id,tts_cjk,tts_latin,speed,stub}`；`tts_cjk`/`tts_latin` 口径按线上实测（CJK 字符数 / 拉丁字母数）。无 key 时写占位 webm 保证 URL 可 200。
- 路由：`GET /api/v1/whiteboard/images/:file`、`GET /api/v1/whiteboard/audio-stream/:user/:session/:file`（均公开，线上同）。
- 客户端：`Whiteboard.tsx` 处理 `image_gen_pending / generated_image / image_gen_failed` 并渲染 `<figure>`，`tts_segment` 在 `stub:false` 时播放真实音频、`stub:true` 时回落 SpeechSynthesis。

**仍缺**：用户课程封面按内容哈希版本化（线上 `cover_wide-419478fe35.png?v=…`，我们是固定占位）；`/whiteboard/images/*` 的 `source:"reference_page"` 课件页截取分支（我们只做生成分支）。

## 8. 三方对账汇总（本轮扫描结果）

`python3 reference/live/gap_scan.py`：观测端点 62、文档路径 139、实现路径 142。
- **A 类（线上有、实现无）**：`/course-publish/availability`、`/social/latest`（这两条仍缺）；`/whiteboard/images/*` **已补齐**（本轮）；`/error/add_error_log`、`/intent_pixel/*` 按 §10 决策不做。
- **B 类（线上有、文档无）**：`course-publish/availability`、`social/latest`、`intent_pixel/*`、用户课程封面路径、marketplace 封面哈希变体、`whiteboard/images/*` 与 `audio-stream` 命名规则（后两条已写入 `PROTOCOL.md` §3）。
- **C 类（文档有、本轮未观测）**：Stripe 结账全家桶、Canvas/Google 连接器写侧、`chatResponseFollowup/stream`、`citation/files`、`file_generation/rerun`、`pdf-annotation/*`、`whiteboard/ws` 的部分 c2s（`start_teaching`、`interject_*`）等——多为需要特定前置或未触发的路径，不代表下线。

## 9. 建议顺序（2026-09-15 第二轮后）

1. ~~P0 契约修正~~ **已完成**：`progress-status`（四张表）/ `generation-status`（含 `practiceBySession` 状态机）/ `canvas-updates`（12 字段）/ `course-calendar/{status,config}` / `structure`（外层课程元信息）/ `generation-log`（真事件流，写 `var/data/generation_runs/`）。
2. ~~P0 协议文档~~ **已完成**：白板动作组 / `tts_segment` / 问卷 `category+allow_custom` / `research.summary` 已进 `PROTOCOL.md`。
3. ~~P1 生成态持久化~~ **已完成**：每个课程生成 run 落 `{events[], error_logs[], total_run_time, status}`，`generation-log/{run_id}` 直读；socket 断开记为 `disconnected`。
4. ~~P1 缺口位~~ **已完成**：`social/latest` 按线上形状返回 `{enabled:true,post:null}`；`course-publish/availability` 线上即 404，本仓按同形状留空。
5. ~~P1 仍差~~ **已完成**：`session_ready.key_points`（模型产出 → 课程持久化 → 白板 session_ready 与大纲路由共用）；`generating*Ids` 改由 run 事件重放（阶段 loading 时列出目标），阶段内 `practice/exam/project` 取 `generating`。
6. ~~P2~~ **已完成（第三轮）**：封面内容寻址（`/api/v1/covers/<hash>.<ext>`，immutable）、`source:"reference_page"` 课件页插图分支（pdf 讲解链路实证）、练习/考试朗读的 `voice_id/speed` 透传（`POST /api/v1/tts/synthesize`）。
7. **新增（第三轮）**：生成任务与 socket 解耦（attach/回放/续跑）；TTS 服务层（内容寻址缓存、PCM 直出、语音表、下一句预取）。

## 10. 自部署决策记录（2026-09-15）

| 主题 | 决策 | 影响面 |
|---|---|---|
| 鉴权 | **不引入鉴权服务**：设备免登 `POST /api/v1/auth/auto_token` + 本地 JWT（claims 含 `sub`）；Bearer 与 WS query 形状保持不变 | 放弃 Supabase/OAuth/refresh 轮换与 `token_timestamp` 节流；多用户隔离靠本地 `sub` |
| 对象存储 | **不接云存储**：媒体一律本地 `var/data/**`，由本地路由回源 | drive 缩略图、白板图片/音频、公开制品都不再依赖 S3；响应里的 URL 字段语义不变 |
| 计费 | **不做计费**：无积分扣减、无 12h 轮转、无 per-feature 周限额、无 Stripe | 保留 `subscription` / `usage_limits` / `credit_status` 字段形状供前端读取；「无限」用具体数值表达 |
| TTS | **接 TTS 模型（BYOK）**：OpenAI 兼容 `/audio/speech`，产物落盘、`tts_segment` 出声；无 key 时占位 webm + 前端 SpeechSynthesis 兜底 | 白板讲稿与插问都有声；音频 URL 命名对齐线上 |
| 白板插图 | **接图像模型（BYOK）**：教师产出 `image_generation` 动作，模板按线上逆向（`seed/prompts/whiteboard_image_prompt.md`）；无 key 时 SVG 占位 | 帧序与字段对齐线上；`stub` 字段标注降级态 |
| 第三方埋点/错误上报 | **不做**：无 intent pixel、无 Clarity、无 `error/add_error_log` 上报 | 需要诊断时用本地日志；若日后要做，字段形状已记录在 §6 |
| BYOK 生效范围 | **面板配置即运行时**：`resolveByok()` 把用户 5 条 seam 合进进程配置；`config.provider` 的 stub 判定全部改为按用户解析（`eff.provider`），否则面板配了模型也不会生效 | 覆盖对话/课程生成/白板讲解/出题/代码/白板 TTS+插图；进程环境变量退化为默认值 |
| BYOK 面板 | 5 条 seam 各自 `base_url / model / api_key / enabled` + 预设（Ollama、vLLM、LM Studio、DeepSeek、Kimi、Tavily、SearXNG、SD 网关…）+ 逐条探针测试（默认轻探针，勾选深度探针才真出图/真转写） | 面板保存只写本机 `var/data/state.json`；不写任何第三方凭据文件 |
| 状态存储的跨进程写 | **加文件锁**：`var/data/state.lock`（`wx` 独占创建 + pid/时间戳过期接管），读-改-写整体串行；并发写不同 seam 8/8 保持 | 之前两个进程共享数据目录会互相覆盖（上一轮的 BYOK 配置就是这么丢的） |
| run 日志写入 | **同 run 串行 + 原子替换**（临时文件 + rename）：`emit` 是 fire-and-forget，并发的读-改-写会写出半截 JSON | 修复前确实出现 2 个坏 run 文件；修复后新增 run 全部可解析 |
| 启动守门 | 端口占用（EADDRINUSE）直接退出并打印排查命令；启动日志带 pid / 数据目录 / 静态目录 | 「改了代码行为没变」的元凶就是旧构建进程占着 8787 |
| 生成管线取模型 | `runCourseGeneration` 的 5 处 `askModel` 全部传用户 seam（此前漏传 → 配了 BYOK 仍走进程级 stub，白板讲稿/大纲/要点全是占位） | 现由实测证实：keyPoints 与描述均来自用户配置的模型 |
| 生成入口 | `start_course_generation` 之后服务端自行推进管线；已有课程直接回完成帧 | 此前必须客户端发 `course_generation_answers` 才会启动，问卷永远等不到 |
| 生成任务生命周期 | **任务归服务端**：`start` 建任务，socket 只 attach（先回放再订阅），断开=detach 不中断；`resume` 回放拿到断线期间的全部帧；同一用户同一课程只有一个在跑任务 | 之前管线跑在 socket 回调里，用户一离开任务即断（run 记 disconnected），重连看不到进度 |
| TTS 缓存 | **内容寻址**：`sha256(provider|model|baseUrl|voice|speed|format|text)` → `var/data/tts/<hash>.<ext>`，URL 带 hash 且 immutable；帧里多一个 `cached` 字段 | 之前每句都打模型、文件名只按会话+序号，重进页面重新计费 |
| TTS PCM | `format=pcm` 直通 `response_format`；网关不支持回落 mp3；拿到 PCM 就发真实 `interject_pcm`（`stub:false`） | 之前一律发静音占位 PCM |
| TTS 预取 | 讲解时预取下一句、级联时念当前句合成下一句 | 减少级联停顿；实测第二轮请求全部命中缓存 |
| 图像测量 | `pngSize/jpegSize` 读到 0 尺寸即视为无效，回落 512×512 | 曾出现 `generated_image.width=0` |
| 课程封面 | 内容寻址 + 图像 seam 可选出图；列表 `coverImageUrl` 指 `/api/v1/covers/*` | 之前固定 `coverImages/cover.png`，换内容不换 URL |
| 课程进度消费 | 课程页读取 `generation-status` + `progress-status`：练习按钮按 `practiceBySession` 禁用、按钮显示 `答对/总题`、单元标题显示考试分数、进度条用真实完成数 | 之前只有静态图例与本地 mastery 推断 |

---

### 本轮证据边界

- 问卷作答之后的 `course_generation_answers` → `course_structure_confirm` → `course_generation_complete` 未复测（跑停在等待作答，见 `r16_generation_answers.jsonl` 记录）；此前证据在 `reference/evidence/course_generation_trace.json`。
- Stripe 真实结账、Google/Canvas OAuth 闭环、PDF 批注通道、语音 PCM 链路本轮未触发。
- 线上账号为 PRO（80 credits，12h 轮转），免费档的限额差异未复核。

### 11. 2026-09-16 抓包轮：新增能力与已知缺口

本轮把白板「互动动画 / 随堂单选 / 板面高亮 / 回合收尾」与课程生成的「检索多轮 / 意图路由 / 答题草稿」补齐，同时校正了三处 REST 形状。

| 能力 | 本仓实现 | 与线上的差异 |
|---|---|---|
| 互动动画 | `animation_pending` → `generated_animation{html}`：有 LLM 时按 CSP 契约生成单文件 HTML，无 key 时用本地自包含动画兜底（滑杆驱动、内联 SVG/脚本） | 线上的动画由模型产出、体量更大（14.9KB 实测）；本仓兜底版是同契约的简化演示 |
| 随堂单选 | `ask{mode:"choice",question,options[],correct_index,explanation}`：模型出题，stub 时回落到 `mode:"open"` | 线上题目由模型生成并配动画任务；本仓 stub 路径不出题 |
| 板面高亮 | `highlight{step_id,target_board_id,page_id,snippet}`，snippet 取自板面要点 | 线上的 `target_board_id` 指向具体板面块，本仓统一为 1 |
| 回合收尾 | `done` + `response_complete{is_complete,status:"completed",session:false}` | 一致 |
| 检索多轮 | `round n/5` → `fetched N page(s)` → `summary ready` → `Selected N web source(s)`（带 `reference_ids`） | 线上真跑 5 轮检索（每轮 10 页，带 citation id）；本仓按 seam 返回的结果走一轮 |
| 意图路由 | `course_generation_rejected{reason_code:"one_off_artifact"}`：有 LLM 时由模型判定，stub 时用关键词启发式 | 线上还会在客户端弹「仍然继续生成课程 / 转即时协助」对话框（本仓客户端暂未实现该对话框） |
| 答题草稿 | 接收 c2s `course_generation_answer_draft` 并归档进 run | 一致 |
| 会话 id 形态 | 白板会话 `<course_uuid>__<course_session_id>`、`lecture_outline_id` 用冒号 | 一致（本轮修正） |
| REST 校正 | `orbie` 带 `count`；`deep_learn/list_*` 裸数组；连接器状态看 `/connectors/google_calendar/status` | 一致 |

**仍缺（有证据但未实现）**
1. 白板**分栏网格状态**：线上客户端把 `{version,revision,activePageId,pages[].columnLayout}` 全量同步给服务端，本仓客户端仍是简单页列表。
2. 技能链（`get_skills` → `ask_questions` → 产物）与产物工具家族（拍认卡/速查表/教学动画/公开文件发布）在对话通道尚未落地。
3. 生成冷却语义：线上同一用户存在在跑任务时问卷「继续」被禁用并给出解禁时间；本仓是「attach 到既有任务」，语义不同（更宽松）。
4. 课程生成的「结构确认」后半段（`course_structure_confirm` → `complete`）本轮被站方冷却挡住，未取得新证据；既有证据仍来自上一轮的 `course_generation_structure`。

**第三批（同日继续）已完成**
- 对话帧形状对齐：`get_skills` → `{success,skill_name}`；`user_question` 带 `message` 与每题 `allow_custom`；`credit_status.credit_info.turn_cost`（BYOK 为 0）；`complete{conversation_id,tts_pending:false}`；速查表技能先问「内容详细程度」再产出；客户端按通道回发 `question_answers` / `course_generation_answers`。
- 生成忙锁：同一用户在其他课程仍在生成时，新的 `start_course_generation` 回 `course_generation_busy{message,retry_after_ms,course_uuid}`（线上只有「问卷禁用 + 提示」的 UI 证据，帧名为本仓自定）。
- 深度学习通道：`deep_learn_session_resumed{current_step_id,task_plan{units[].tasks[]}}`、`thinking{session_id}`、`tool_selection{task_title,model_name}`、`inline_diagram`（`dg_` 占位 + `data-*` tag + `/api/v1/diagram/:id/diagram.png`）、`step_completion{step_data,next_step,requires_acknowledgment}`。
- 白板客户端按线上同步分栏网格：`sync_whiteboard_state{whiteboard_state:{version,revision,activePageId,pages[].columnLayout}}`。
- 修掉一个跨通道的时序 bug：WS 处理器在挂 `message` 监听前 `await` 会丢客户端首帧。

**仍缺**
1. 对话技能产物家族（拍认卡/教学动画/公开文件发布 `publish_file`）与 `generate_instructional_video` 尚未全部接到对话工具面。
2. 白板分栏网格只做了「客户端上报 + 服务端存储」，渲染仍是顺序板书，不是线上的三列铺贴。
3. 课程生成的「结构确认 → 完成」后半段仍无新证据（站方冷却窗口）。

**第四批（产物家族）已完成**
- `artifactTools.ts` 统一实现四个产物工具（抽认卡 / HTML 动画 / 教学视频 / 发布文件），director 与旧 `runChatTool` 路径共用一份实现，形状对齐 live：扁平 `data.flashcards[{question,answer,index}]`、`{diagram_id,type:"html_animation",file_url,content}`、`publish_file` 的错误分支 + `agent_response` 兜底、视频的六段阶段帧。
- 动画契约加入线上米色配色变量；动画 HTML 与 `publish_file` 产物都有公开 URL（实测 `diagram.html` 200 `text/html`、`/api/v1/files/<id>` 200 `text/markdown`）。
- 修掉一个真实 500：`content-disposition` 里放中文文件名会让 Node 抛 `ERR_INVALID_CHAR`，改为 ASCII 回退名 + RFC 5987 `filename*`。
- 客户端：抽认卡卡片（翻面 + `n / N` 翻页）、`tool_execution` 兼容「扁平 data」与「result 包装」两种形态。

**仍缺（产物方向）**
1. 视频渲染引擎：线上按幕用 manim / remotion 生成代码再渲染，本仓是 ffmpeg 拼场景（阶段帧与 URL 形状一致，画面复杂度差距明显）。
2. `publish_file` 的「选择条目」在前端没有选择器（后端已按 `indices` 支持，缺 UI）。
3. 技能产物家族里的 `generate_instructional_video` 之外，线上还有生成 PDF/抽认卡导出等后续步骤（`recommend_next_step` 里出现的「保存为 PDF」），未逐一实现。

**第五批（视频渲染 / 前端 UI / PDF）**
- 视频：从「ffmpeg 拼字符画面」换成**逐幕渲染**——数学幕 KaTeX + 时间轴寻帧、HTML 幕无头 Chromium 逐帧截图、ffmpeg 逐幕编码与合成；阶段消息与线上逐字一致（`Scene N (manim|remotion) rendered successfully - k/N completed`、`Video generation completed! N scenes, X seconds`）。仍与线上有差距：线上是 manim（Python+LaTeX 真渲染）与 remotion（React 组件），本仓是 KaTeX/Chromium 的等价近似。
- 前端：对话新增**动画卡片**（sandbox iframe 内运行 + 新窗口打开）、**视频卡片**（原生播放器 + 分幕清单 + 下载）、**文件卡片**（下载）、抽认卡卡片（翻面 + `n / N`）；`tool_execution` 兼容扁平/包装两种 `data`。
- PDF：通道对齐线上（`pdf_state{revision,file_id,annotations[]}`、`course_state`、`speak/annotation` 真实 `tts_url`、音频前缀 `/pdf-annotation/audio-stream/`）；前端用 **pdf.js** 渲染页面 + 标注短语高亮 + 讲稿流 + 「开始导读」+ 本页提问；上传即建会话（否则 `file_id` 丢失、`start_teaching` 报错）。
- 原站 PDF 阅读器的入口本轮没打通（知识库 `.file-card` 点击/双击/右键都没进入阅读视图），所以标注的**坐标级**渲染（矩形/区域高亮）没有证据，本仓按「短语文本高亮」实现。

**第六批（练习/考试/项目）**
- 服务端按线上实测补齐：`practice/start`、`practice/progress`（`sessionId + finished + items{}` 字典）、`practice/assistant`（`session_id + messages[]`）、`exam/start`、`exam/status`、`project/assistant`（`stage_id + messages[]`）；缺字段回 FastAPI 形状的 422，请求体校验与线上一致。
- 前端练习器补齐线上 HUD：每题 10s 倒计时 + 速答奖励 +200（未超时答对才给）+ 得分显示 + 进度点 + **选项 1..4 编号**（原来是 A/B/C）+ 检查答案/跳过/下一题 + AI 随堂助教（提示式）+「全对记已掌握」提示。
- 仍缺：练习的 `practice-split` 题干配图（线上题目可带图，左图右题）、得分数字滚轮动效、`exam` 完整作答界面（本仓复用练习器）。

**第七批（项目实战）**
- 结构对齐线上：`GET /project` 的每个阶段补齐 `parent_project_id / unit_id / deliverable_increment / steps[]`（无步骤时给一条默认步骤）。
- 状态对齐线上：`GET /project/stages/{id}/state` 返回 `{submissions:{}, drafts:{}, status, score, feedback}`；本仓额外提供 `POST` 落盘提交与按步骤草稿（线上只读、交付走对话，这一点已在协议里标注为本仓扩展）。
- **去掉了一处不诚实实现**：原 `POST .../state` 会在本地编一个 78–100 的分数和「阶段评审通过」文案。现在配置了 BYOK 语言模型才评分（模型给 `{score, feedback}`），没有 key 时明确返回 `evaluated:false / score:null`，前端也不再在失败时谎报「已成功提交」。
- 前端项目页：进入阶段会回读已存草稿/提交，提交后展示真实评审或「已记录（未评分）」。

**第八批（学习日程 / 开始课堂）**
- 任务的详情字段补齐线上形状：`description`、`subtasks[]`、`progress`（服务端补默认值；子任务为空时给一条代表性任务）。
- `POST /calendar/deep_learn_subtask_session` 从 stub 换成真实现：建一节带单元/任务计划的深度学习会话并返回大纲 URL（路由到 `/deep-learn-session/outline/<id>`），与本仓大纲页对接。
- 前端学习动态页：日历条目可点开任务详情（日期/标题/描述/子任务/已完成%）、删除任务走二次确认（对齐线上文案）、「开始课堂」跳深学大纲、侧栏加周配额面板（来自 `/auth/other_function_usage_limits`）。
- 仍缺：批量删除日程、周/月视图与线上「已确认/待处理」分组完全一致的布局、知识库文件卡的「加入日程」按钮。

**第九批（知识库 / 日程补全）**
- `POST /drive/add_file_to_calendar` 从「原样回显」换成真实现：写入一条 `type:"reading"` 的日程任务（带子任务与描述），并把「添加到日历」计数 +1；上传文件同样计入 `file_upload`。
- `GET /auth/other_function_usage_limits` 改为如实上报已用数量（`used`），BYOK 版限额仍是不设限，但不再是「永远 0 已用」的假数据；另返回 `storage_limit_bytes`（1 GB，对齐线上免费/专业版口径）。
- 知识库页：文件卡加「加入日程」按钮（对齐线上唯一动作）+ 用量面板（存储/上传/日历）+ 成功提示。
- 学习动态页：左侧新增「已确认任务 / 待处理任务」分组，工具栏加「批量删除日程」（选中态显示「删除所选 N」，逐条删除）。
- 仍缺：白板的 zen 模式与导出链路、项目阶段的**步骤级**前端编辑器（服务端已按步骤存草稿）、知识库文件的移动/重命名（线上未暴露这两个端点，实测 404）。

**第十批（白板工具条 / 项目步骤）**
- 白板：默认 **zen 沉浸**（按钮文案与线上一致「Exit zen mode」）、导出菜单（Markdown / PDF 打印）、「检查我的网络」（走 `/net-check` 并就地显示结果）。
- 项目：阶段**步骤级编辑器**（5 步渲染 5 个输入框，每步可标记完成，草稿按 `drafts{step_id}` 存服务端——实测保存后 `drafts.step1` 落库）。
- 仍缺：白板要点的 `-live` 高亮（跟随当前讲解条目）、「设置 / 退出 Session / 关闭声音 / 对话历史」这几个面板的等价实现、线上导出菜单的真实导出格式（未展开抓取）、步骤完成状态的**服务端**持久化（目前只有草稿落库，完成标记仍在本地状态）。

**第十一批（设计还原 · 本地化）**
- 新建 `DESIGN_TOKENS.md`：把线上 computed style 实测值逐项对到本仓类名/变量，覆盖全局（底色 16px/24px 正文、字体栈、`--radius .625rem`、侧栏 264px 与 `#e8f0f8` 激活底）、排版层级（12/18 w600、24/30.72 w650、20/30 w650、22/4 00）、卡片（16px + `rgba(20,20,20,.06)` 边框）与**练习整套**（舞台 14px/1.5px 边框、计时条 3px、HUD chip 金绿配色 34px、得分 `#2a4578` 13px w700、题面 672px + 17/24.65 w500 `#1f1f1f`、选项 grid gap 12 + 34×34 radius 9 柔和底色、检查/跳过按钮 padding、助手面板 340px 与输入行、入场弹窗 490px）。
- 本仓已按表改到与实测一致（同一批选择器复核 computed style 全部命中）。
- 本地化：正文基线从 14px 提升到线上一致的 16px/24px；清理残留英文可见文案（`Share conversation` → 分享对话、`Continue` → 继续）；aria-label 保留英文（线上同样如此，如 `Add to calendar`、`Zoom in`）。
- 未对照：对话响应页排版、集市卡片网格、历史页列表项、白板内部元素尺寸——已列入 `DESIGN_TOKENS.md` 的「尚未对照」。

**第十二批（设计对照 · 第二批）**
- 新增对照面：对话响应页（回答列 774px、底栏 33px 圆钮 + 工具 pill）、**真实侧栏**（240px 白卡 radius 16 / 继续学习卡 radius 10 + #E8ECF3 边 / 讲座标签 10px #4C6696 / 会话项 13px w500）、课程集市（特色卡 radius 18 #EDEBE8、tabs 14 w700、票根全量字号与配色、报名圆钮 #4C6696）、白板内部（侧栏 260px、大纲卡 rgba(255,255,255,.78)、小节标题 10 w700 #A3A3A3）。
- 修正上一批的误判：侧栏不是 264px 透明底，而是 240px 白色圆角卡（`.sidebar-content-wrapper`）；已改回并复核。
- 复核：用与线上同一批选择器在本仓取值，全部命中（标题 17.3/22.144 w600 rgb(15,31,51)、标签 10.8px/3.5px 11px/radius 999、侧栏 240px 白卡 radius 16、rail 8px + rgb(232,240,248)）。

**第十三批（设计对照 · 第三批）**
- 补到位的：导航项 padding/gap/字号与**激活蓝字 `#4C6696`**、继续学习卡阴影 `rgba(15,23,42,.04)`、版本入口 11px `#AAAAAA`、首页主体内边距 `70px 20px 28px`（宽度 1228）。
- 口径澄清：线上侧栏是「外层 264px 容器 + 内层 240px 白卡」，本仓按视觉等价的 240px 列 + `--sidebar-margin` 实现，已在 `DESIGN_TOKENS.md` 写明差异。
- 两处取不到样并说明原因：设置弹窗（点头像不弹、疑似 portal/hover）、白板画布内部（绘制在 canvas/iframe，无布局类名可量）。这两项列进下一批。

**第十四批（设计对照 · 读样式表兜底）**
- 方法升级：设置弹窗与画布内部点不出来，改为**直接抓线上 55 张样式表（2.09MB）按规则抽取**，一次拿到设置弹窗（950×600 / radius 20 / 阴影 / 210px 侧栏 #f4f4f4 / 标题 18px #1a1a1a / 关闭钮 28px）、翻页控件（40px / radius 20 / shadow / 13.5 w500 ls.2 / 当前 #171717）、板书骨架（padding 96 72 64 / 340px 列 / 26 与 13px 圆角条）、**要点 current 圆点 #4c6696**。
- 落地：设置弹窗容器与侧栏、翻页 pill、板书骨架、要点列表（含 `data-status=current` 高亮 + 「讲到这里」徽标，讲一步亮一条）。
- 副产物：修掉白板头部导出菜单缺 `relative` 包裹导致的结构错位（构建器报 JSX 不平衡）。
- 下一批仍可做：对话页目录栏（TOC）样式、历史页时间分组标题、集市预览页与加入弹窗。

**第十五批（侧栏双态 + 控件微件）**
- 侧栏按线上补成**双态**：默认展开 240px（radius 16），点 24px 折叠钮切到 60px 图标栏（radius 12、40×40 圆角 10、隐藏标签/继续学习/近期活动/底部信息），折叠态悬浮出黑底 tooltip。
- 导航项按变量对齐：高 33、radius 8、gap 14、图标 20px、图标闲置 65% 透明度；hover `rgba(235,244,255,.4)`、active-hover `#d4e2f4`。
- 发送键统一为线上 `.send-button`（33px、`#e7e7e7`、边框 `#D1D1D1`、禁用 `#f5f5f5`/`#e0e0e0`/0.6）：首页、对话页追问、互动协助、Misc 四处。
- 白板缩放改为线上 zoom pill，练习进度点改成 17×10 / 激活 25×18（2px 边框）。
- 未做：对话页 `.orbie-message-card` 正文字号（15px/1.5/`#333`，card radius 16 + padding 14 18 + `0 2px 8px #0000000d`）、`.join-auth-modal`（加入课程弹窗 380/radius 18）、`.preview-zoom-controls`（预览页缩放小件）。

**第十六批（市场精选 · 消息动作 · 加入弹窗）**
- 市场页：精选 bento 改为线上精确网格（12 列 / 234+190 行 / gap 14 / 六卡位次 / radius 18 / 覆盖层渐变 `#0a0c1400 35% → #0a0c14c7`）、眉标与 18px 标题、标签 pill、大中小三档标题字号、搜索条 460×46、课程网格 1160/4 列/gap 24。
- 对话页：补上线上的**消息动作行**（复制 / 点赞 / 点踩，32×32 radius 8，配色 `#71717a → #18181b`，选中 `#e4e4e7`），之前本仓完全没有这一排。
- 加入课程弹窗按 `.join-auth-modal` 重写（380 / radius 18 / padding 28 24 24 / 主键黑 10×16 radius 10 / 次键描边 / 关闭钮 26 radius 8）。
- 仍未做：`.response-add-button` 与 `.response-tools-button`（对话输入栏左侧的加号与工具 pill，33px 同系）、讲义阅读器 `.preview-*`（1123×794 A4 分栏 + 缩放控件；本仓没有讲义阅读面，需要先决定要不要做）、`.mktp-featured-card--skeleton` 骨架动画。

**第十七批（票根 · 输入条 · 收件箱）**
- **市场/首页卡片改成线上票根**：按 mask 几何重写（218×326、两段 rx14、签缝 12 孔 + 底部缺口、纸色 `#FFFFFC`、drop-shadow），文案区固定在 36.5%–签缝、存根区在签缝以下（科目标签 + 32px 圆形加入键），签缝位置按内容测量后钳定（70–86%）。首页网格换成 `.library-tickets`（3×260 / gap 34）。
- **输入条左侧控件**：加号圆钮（33/50%/`#E5E5E5`）与工具 pill（33/`0 10px 0 9px`/999/14px `#444`，hover `#f5f5f5`+`#d4d4d4`）落地，分享键也换成 icon+text 结构。
- **收件箱页面**按 `.inbox-*` 重写（48/64/24 内边距、950 宽、居中标题 24 w700、`#f1f1f1` 分段器、通知行 32px 上下留白 + `#EBEBEB` 分隔 + 3px 左侧留白）。
- 仍未做：**我的课程页 `.courses-*`**（1120/44 56/20px w650 标题/工具栏/`#6f6b64` 胶囊 tab/300×36 圆角搜索）、**考试页 `.exam-*`**（倒计时 pill、进度点内条、`top:52px` 舞台框）、活动行悬停才出现的类型图标与运行中转圈、`.preview-*` 讲义阅读器。

**第十八批（课程页骨架 · 练习/考试全屏）**
- **课程页换成线上两栏骨架**：`padding-left: max(48px, calc((100% - 1100px)/2))`、gap 36、左栏 310（`28px 20px 32px 40px`）+ 右栏（`48px 48px 48px 6px`，单元总览 760）；封面 1/1 radius 14 `#dce6ec` + 32px 圆形悬浮操作键（带 `#2b3648` 提示气泡）；创作者行/标题/描述/「显示更多」按 `.cj-sidebar-*` 令牌；大纲标题加分隔线，tab 改胶囊组；单元眉标、标题 22px、描述 15px/1.55 按线上。
- **练习与考试换成全屏页**：白底 100dvh + 左上关闭键（26/31、16×16）+ 顶部居中进度点（17×10 / 激活 25×18，考试激活点带内条），考试加 `.exam-stage` 边框舞台（`52px 36px 30px 36px`、1.5px `#E5E5E5`、radius 14）。进度点可点击跳题，答对/答错分别着绿/红。
- **明确缺口**：考试倒计时 pill 未实现——线上 `.exam-timer` 需要考试时长，接口与页面都没给出这个值的来源，先留缺口而不是编一个时长。
- 仍未做：`.cj-preparing-modal`（准备中弹窗 480/radius22）、`.cj-welcome-modal`（欢迎弹窗）、`.course-rating-bar`（生成质量评分条）、`.courses-*`（我的课程页）、活动行悬停图标与运行中转圈。

**第十九批（学习动态 · 知识库）**
- **学习动态页**换成线上 `.proactive-*` 骨架：`#fafafa` 全屏、内容 97%、两栏 `27% / 1fr`、gap 20（左栏 25）、右栏白卡 radius 12 + `0 3px 10px #0000000d` 阴影、页头 min-height 40。
- **知识库页**换成线上 `.knowledge-base-*` 骨架：1200 内容列 + `0 20px` 内边距、页头 `margin-top:30px` + 标题 20 w650、文件夹四列网格（gap 16、卡片 radius 12 `12px 14px`、边框 `#E5E5E5`）、文件区独立滚动并留 50px 底部。
- 仍未做：知识库**拖拽上传遮罩**（`.knowledge-base-drag-overlay`：`#fafafa59` + blur 3、卡片 `#f1f6fec7` + 1.5px 虚线 `rgba(76,102,148,.28)` + radius 25 + `42px 66px` 内边距）、文件夹卡片 hover 才出现的 `⋯` 菜单与删除下拉、文件卡横向滚动条。

**第二十批（练习页交互件）**
- 线上实操一节练习后补齐：`practice-stage` 边框舞台、**每题 10 秒速答计时条**（`practice-timer-drain`，实测 `animation-duration:10000ms`，答题后暂停）、HUD 胶囊（速答奖励 / 得分，含金色 bonus 态）、助手开关、**双列选项卡**（76 高 / radius 15 / hover 投影 / 选中 `#4c6696` / 正确 `#2e8b57` / 错误 `#c34747`）、四色轮转的 34×34 选项形状、右上键位角标、右侧圆环指示器、3D 立体检查键（`0 6px #33569a`）与描边「下一题」、跳过键。
- 仍未做：**右侧 verdict 面板**（`.practice-split--revealed` 展开 360px 宽的判题区、`.practice-verdict-headline` 的绿/红底色）、答案揭晓时的**彩带**（`.practice-check-confetti-piece`）、得分数字的**老虎机滚动**（`.practice-slot-digit-strip` + `practice-slot-roll`）、`practice-welcome-modal` 欢迎弹窗。

**第二十一批（判题反馈 · 分数滚动 · 骨架动画）**
- 判题结果换成线上 `practice-feedback` / `verdict-headline` 令牌（圆角胶囊 + 22px 圆形判定标 + 绿/红两套底色），解释文字 13.5px `#555` / 1.55。
- HUD 得分改成**逐位滚动**（`practice-slot-roll` .72s，按位 60ms 延迟）。
- 骨架统一成线上 `skeleton-loader` 渐变（`#f0f0f0 → #e0e0e0 → #f0f0f0`，200% 位移 1.5s），票根骨架用 218/326 + 签缝虚线，精选骨架按 bento 六块位次铺开。
- 明确未做：**右侧滑出的 verdict 面板**（需要先把练习区从 672 单列改成 `min(76vw,1040px)` 的 `.practice-split` 两列）、答案揭晓彩带（`.practice-check-confetti-*`）、题目星标动画（`.practice-stars-stamp`）、`.practice-welcome-modal` 欢迎弹窗、考试倒计时（缺时长来源）。

**第二十二批（讲义阅读器 + 产物持久化 + 提问链路修复）**
- **新增讲义/速查表阅读器**（`/cheatsheet/:fileId`）：A4 1123×794 分页、每页 4 列、列距 20、列宽按 `(contentW-(columns-1)*20)/columns`，页间位移 = `k*stride`（stride = contentW+20）；默认 8px/1.55 排版与 0.75 缩放，缩放件 28×28 + 44px 数值框；底部可调列数/字号/页边距；支持打印。
- **产物落盘**：原来 `publicFiles` 只在内存，重启后速查表/导出文件全部 404。现在写入 `var/data/files/<id>`（+ `.json` 元信息），`GET /api/v1/files/:id` 先查内存再回源磁盘；实测重启后仍可下载。
- **提问链路修复（两个真 bug）**：
  1. `{questions && …}` 原来嵌在 `{isGen && …}` 里，**只有课程生成流程会渲染选项**；速查表这类聊天技能的提问卡片永远空白 → 已提到 `isGen` 之外。
  2. 答完题的回复会被重新分类（把「详细」当成新话题），因为路由没用会话里的 `pending_skill` → 现在 `pending_skill` + `answers` 优先。
  3. 速查表问题选项原来是纯字符串，客户端按 `{title, description}` 渲染 → 服务端改成对象形状，客户端同时兼容字符串。
- 仍未做：阅读器的富文本编辑（线上是 tiptap 编辑器 + 锚点/高亮/评论，本仓只读渲染）、按内容自动选列数/字号的排版建议。

**第二十三批（练习两栏 + 判题滑出）**
- 练习/考试页改成线上 `.practice-split` 结构：题目壳 `min(76vw,1040px)` + 判题面板 360px（`--practice-verdict-panel`），答题后 `--practice-split--revealed` 让面板从 0 展开到 388px（含 28px 间距），配 `.practice-verdict-inner` 的 0.42s 宽度过渡 + 0.3s 延后渐显。
- 底部操作条改成 `.practice-actions`（左右 36 / 高 96 / 上缘渐变），检查与跳过键留在条内。
- 结构改造踩过的坑记一笔：这块 JSX 嵌套深（stage → split → shell → 内容 → 判题面板 → 操作条），多次插入后闭合数错了三轮，最后靠「标签栈 + 尾部整块重建 + 渲染后 DOM 顺序核对」才收干净；以后改这种结构先跑栈检查再改。

**第二十四批（我的课程页）**
- 换成线上 `.courses-*` 骨架：1120 内容列 + `44px 56px 0` 内边距 + gap 68 的两栏（主列 flex 1 / 右栏 320 且 `margin-top:56px`）；标题 20/650、工具条 gap16 mb24、过滤胶囊（选中 `#fffffc` + `0 2px 7px #0f172a0b`）、300×36 圆角搜索（图标 13 / 占位 `#b8b1a7`）、列表 `gap:24` 独立滚动、右栏白卡 radius 18 + `0 2px 6px #0f172a06`。
- 仍未做：`.courses-empty` 空态插画（200×200 图 + 16/650 标题 + 13px 说明）。

**第二十五批（自部署口径复核，BYOK 端到端）**
- 复核「不做鉴权服务 / 不做云空间与计费 / 不接第三方埋点」三条决策在代码里的落地：`app/src` 与 `hyperclone/server/src` 内**没有** `aplo-evnt`、`clarity.ms`、`add_error_log` 的调用；计费只剩 `GET /api/v1/stripe/plans` 的兼容返回（`plan_id: 'byok'`、`can_change_plan: false`），没有真实支付通道。
- BYOK 端到端复核：设备免登取 token → `PUT /api/v1/auth/byok`（形状是 `{enabled, providers:{llm:{baseUrl,apiKey,model,enabled}}}`）→ `GET` 回报 `llm real user` → 在 UI 里提问，回复正文出现假网关的 `GATEWAY_OK`，证明运行时确实走用户配置的模型；随后 `DELETE` 清空，seam 回到 `stub/none`。
- 踩坑记录：`PUT /auth/byok` 只认 `providers.{seam}` 这种嵌套形状，顶层传 `{seam:'llm', …}` 会静默写进旧字段（`baseUrl/apiKey`）而 seam 仍是 `stub`——UI 用的形状是对的，命令行验证时要照 UI 的形状来。

**第二十六批（知识库拖拽 + 文件夹菜单）**
- 补上确定缺的能力：**拖拽上传**（整页 `#fafafa59` + `blur(3px)` 遮罩、虚线圆角卡 `#f1f6fec7` + `rgba(76,102,148,.28)`、44px 图标、17/600 标题、13px 说明），拖入即显示、松手逐个上传。
- **文件夹卡片悬停菜单**：20×20 的 `⋯`（hover 才出现，`opacity .2s`）、下拉 `radius 10` + `0 4px 12px rgba(0,0,0,.15)` + `4px 0`、菜单项 `4px 12px` gap 8 与红字 `#e71414` 删除。
- 构建注意：`backdrop-filter` 只写标准属性让构建补前缀；早前同时写 `-webkit-` 与标准属性时，产物只留了 `-webkit-`，Chrome 里 `getComputedStyle().backdropFilter` 会是 `none`（本次已改正并实测 `blur(3px)`）。

**第二十七批（练习彩带 + 欢迎弹窗）**
- **答对彩带**：按线上 `.practice-check-confetti-layer/piece` 实现——固定层 z 10020、28 片、变量驱动位移/旋转/时长（`--cf-dx/--cf-dy/--cf-rotate/--cf-duration`）、缓动 `cubic-bezier(.15,.9,.25,1)`，只在答对时触发，1.5s 后清理；`prefers-reduced-motion` 下不播放。
- **欢迎弹窗**换成线上 `.practice-welcome-*`（10010 遮罩 + `blur(3px)`、480/22 圆角、`#fbfbfb`、`140px 1fr` 网格、18/600 标题、13.5 说明、`9px 20px` 黑胶囊按钮、`practice-welcome-modal-pop` 动画），替换掉原先自制的 490 宽卡片。
