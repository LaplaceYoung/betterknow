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
1. ~~白板**分栏网格状态**~~：已实现（客户端 `sync_whiteboard_state{whiteboard_state:{version,revision,activePageId,pages[].columnLayout}}`，服务端落库并回 `board` 帧）。以下保留原始记录：线上客户端把 `{version,revision,activePageId,pages[].columnLayout}` 全量同步给服务端，本仓客户端仍是简单页列表。
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

**第二十八批（历史页）**
- 历史页整页换成线上 `sh-*` 体系（之前是自研卡片列表、没有分组）：页根变量（`--sh-ink/--sh-ink-muted/--sh-ink-faint/--sh-hairline/--sh-divider/--sh-surface/--sh-lift`）、1120 内容列、20/650 标题、260→300 聚焦变宽的搜索、`sh-new-conversation-btn`、胶囊标签与 30×30 圆形筛选（选中变胶囊）、带渐隐遮罩的滚动区、**按时间分组**（今天/本周/更早，11px 大写 `.07em` 标签）、`sh-list` 白卡（radius 14 + `--sh-lift`）、44px 行（hover `#241f180d`、`left:36px` 内缩分隔线、36px 图标列、15 与省略号）。
- 行内补了星标与 `⋯` 删除菜单（沿用 `sh-filter-dropdown` 的下拉样式）。
- 已做：`sh-scroll--scrolled` 的顶部渐隐联动、`sh-filter-dropdown` 菜单（含 active 态与 6px 琥珀色 badge）。**修正之前写错的预期**：线上那个下拉只有一个「仅收藏」开关（r175 抓包：`<button class="sh-filter-option"><img src=star.svg><span>仅收藏</span></button>`），并没有「类型/时间范围」多选，本仓已是同形，无需再补。

**第二十九批（历史筛选 · 空态 · 收件箱行）**
- **历史页筛选**：按线上实现漏斗图标按钮（路径逐字一致）+ 下拉（min-width 160 / radius 12 / `0 8px 24px rgba(15,23,42,.1)` / `4px 0`）+ 「仅收藏」选项 + 选中态（按钮变胶囊、图标 stroke `#374151`、6px 橙色标记点），点外部自动收起；行数从 39 掉到 1 验证筛选真的生效。
- **滚动渐隐**：滚动超过 8px 时挂 `.sh-scroll--scrolled`，遮罩从「只有底部渐隐」变为「上下都渐隐」。
- **课程页空态**：`.courses-empty` 结构（200×200 插画 + 16/650 标题 + 13px 说明 max-width 320 + `32px 24px 40px` 内边距），并区分「搜索无结果」与「还没有课程」两套文案；加载态补 `.courses-loading`。插画用本仓自绘 SVG 占位，**没有复制原站图片资源**。
- **收件箱行改成线上结构**：左侧 120px 日期栏（13px `#8b93a0` + 未读 6px 点）+ 主区（标题 16/700、正文 14/1.6），未读行左边框 3px `#4c6694`，末行去底边，hover `rgba(0,0,0,.02)`，并补 3 行骨架。

**第三十批（深度学习课堂 + 学习动态补件）**
- 线上实操打开一节 deep learn（`/deep-learn-session/<id>`）抓到 `learning-session-*` / `session-*` / `outline-*` 体系，本仓会话页整页换成同骨架：`#fafafa` 全屏 + `0 20px 20px 10px` 内边距、gap 70 / 1400 / `margin-top:50px` / `calc(100dvh - 70px)` 的两栏、310 白卡大纲面板（内容 `26px 22px 28px 15px`、条目 hover/current/locked 三态）、底部 `#f8f8f8` 翻页条（`#4c6696`、禁用 `#c8cdd6`、标签两行截断）、800 宽主区（绝对定位内容滚动）、渐变容器 + 24 圆角输入条、以及滚离底部才出现的 33px 回到底部圆钮。
- 学习动态的周/月切换改成线上 `.proactive-tasks-mode-switcher`（`#f5f5f4` / pad 3 / radius 12 / gap 4，选中白底 + 1px 阴影）。
- 仍未做：`.custom-scrollbar-*` 自定义滚动条（10px 悬停热区 + 5px 拖拽滑块）、`.session-input-bar.multiline` 的多行态（radius 16 + 底部 50px）、deep learn 大纲的锁定/解锁规则（线上带 `.locked` 与锁图标，规则来源未抓到）。

**第三十一批（自定义滚动条 + 输入条多行态）**
- 补上会话页缺的两件：**自定义滚动条**（10px 悬停热区、5px 轨道与滑块、`rgba(0,0,0,.22)`→hover `.35`→拖动 `.52`、指针拖拽直接滚动目标容器）与**输入条多行态**（textarea 自动增高 32–200px、多行时 `radius 16 + padding-bottom 50px`、右下 32px 圆形发送键，禁用/可用/流式停止三态 + 16px `#4C6694` 加载圈）。
- 实现中踩的坑记一笔：滚动条的 `sync()` 最初每次 render 都写新对象，触发「渲染 → 测量 → setState → 渲染」死循环，把 opacity 过渡一直打断（表现为 class 已是 `visible`、计算值却是 0）；改成「几何值变化超过 0.5px 才 setState」后稳定。另外验证时用「往内容区注入 DOM」制造溢出是错的——React 下一次渲染就会把这些节点冲掉，必须用真实操作（连发几条长消息）制造溢出。
- 仍未做：`.session-input-container.drag-over` 的拖拽高亮、附件按钮、`.session-input-bar` 的附件预览行。

**第三十二批（课程评分条 + 欢迎弹窗）**
- **生成质量评分条**落地：底部固定居中（bottom 28、z 10005）、`max-content` 宽度上限 `min(560px, 100% - 48px)`、radius 20 + `0 12px 32px rgba(15,23,42,.12)`、提示 13px、1–5 星（默认 `#d1d5db` / 选中 `#f5a524` / hover 放大 1.12）、「稍后」与关闭键；点星后展开评论输入（38 高 / radius 12 / 聚焦 `#4c6694`）与 `#4c6694` 提交胶囊，提交后换成「已收到你的反馈」thanks 态。
- **欢迎条换成线上弹窗** `.cj-welcome-*`：10010 遮罩 + blur、520/22 圆角、`140px 1fr` 网格、18/600 标题、13.5 说明、下一步卡（kind 胶囊 `#eef2f8`/`#4c6696` + 标题）与「从第一讲开始 / 稍后再说」按钮。条件也顺手改了：走 `/welcome` 必现，首次进入（0 进度）自动出现——原来绑死 `progressPct === 0`，导致带进度的课程即便走 `/welcome` 也看不到弹窗。
- 仍未做：评分条变体 `--generation`（生成结束时的位置口径 `bottom: calc(clamp(44px,6vh,76px) - 52px)`）、`.cj-welcome-next-kind` 的 practice/project/exam 三种变体色（本仓课程首页只展示默认「讲座」）、评分真正落库（当前只发一次属性请求并切 thanks 态）。

**第三十三批（考试倒计时取证 + 开场页 + 评分落库）**
- **考试倒计时不再是「缺证据」项**：线上考试入口那门课是待解锁状态，改从 `ExamPage-*.js` 反查到 `G.current = Date.now() + 18e5`（30 分钟，前端设死线）、每秒 tick、≤60s 切 `--low`、归零 `P(true)` 后调 `POST /exam/score`。本仓据此实现：开场页（时长 30 分钟 + 题数统计 + 说明 + 开始键）→ 开始后顶部计时芯片 `mm:ss` → 归零自动交卷。实测倒计时从 `29:58` 走。
- **课程评分真正落库**：新增 `POST/GET /api/v1/course-generation/courses/:uuid/rating`（写 `state.courses[uuid].rating = {rating, comment, at}`，1–5 校验），前端提交改调这个端点，进页面时若已有评分直接显示「已收到你的反馈」。实测提交 5 星 + 评论后服务端读到 `{rating: 5, comment: …, at: …}`，刷新后不再重复询问。
- **顺手修掉 lint 暴露的真问题**：`QuizRunner` 里 `useEffect/useState` 出现在 `if (!q) return null` 之后（hook 顺序可变），已把所有 hook 上移到早退之前；练习秒数改成「开始时间戳 + interval 计算」，去掉了 effect 内同步 setState 与重复的 `remaining`/`timerKey` 状态；清掉两个未使用导入。现在 `npx eslint src/pages/CourseWork.tsx` 干净。
- 已做：速答奖励芯片、`.exam-bonus-bar`（考试页已渲染）。仍未做：考试那份 `fastWindowMs` 单独取值（线上考试数据没抓到，本仓与练习共用 10s）、评分历史只存最近一次。

**第三十四批（考试速答奖励 + 大纲锁定图标）**
- **考试速答奖励补齐**：服务端考试负载统一补 `fastWindowMs` / `fastBonus`（种子与合成两条路径都覆盖），前端按线上结构渲染 `.exam-bonus-chip`（11×13 闪电 + 「速答奖励 +200」+ 剩余秒）与 `.exam-bonus-bar/fill`（3px、`#e8b54b → #c98a1e`、`exam-bonus-drain` 按窗口时长排空），窗口过期后芯片与条一起消失。**取值说明**：线上考试数据里的具体窗口没抓到，这里沿用练习实测的 10s / +200，注释和文档都写清楚了，不是把推断当事实。
- **深度课堂大纲补锁定图标**：待解锁条目按线上 `.outline-item.locked` 语义渲染 13px 线框锁（静止 0.55 透明度、hover 提亮），图标用本仓内联 SVG。
- 已做：奖励分值真正计分（`scoreQuiz` 里 `total += fastBonus`，与线上 `quizScoring` 同名常量逐字搬运）、`fastWindowMs` 取值（线上常量就是 `1e4`）。仍未做：考试单独的快答窗口（线上未取证，沿用 1e4）。

**第三十五批（交卷契约 + 速答徽标 + 线上考试仍取不到）**
- **交卷负载对齐线上**：客户端现在发 `{ unitId, score: 百分比, items: { qid: { state: 'correct'|'wrong'|'skipped', answer } } }`（线上两种形态都兼容：只有 score，或 score + items）。服务端把 `items` 一并落库（`examItems[unitId]`），实测提交后 state.json 里 `examScores` 与 `examItems` 都在。
- **结果页补速答徽标**：本仓自己统计「窗口内答对」的题数，结果页在「共答对 x / y 题」后显示「· 其中速答 N 题」（`#c98a1e`）。实测：答对 1 题且在窗口内 → 徽标出现，答错/超时不计。
- **没做点数体系**：线上结果页有 `exam-score-points`（`r.total` / 满分 `n` + `fastCount` 徽标），但 `r.total` 的**基准分**（每题多少分、完美分怎么算）在 chunk 里只看到消费端、没看到计算端，所以只做徽标不做点数，不编数值。
- **线上考试仍取不到**：那门课的考试是「待解锁」，这次又试了 `/courses` 列表与其他课程入口（列表接口返回空、页面 tickets 也没渲染出来），`fastWindowMs` 的线上真实取值继续留空——本仓用的是练习实测的 10s / +200，已在文档与代码注释标明。

**第三十六批（生成后评分 + 欢迎卡变体）— 已补齐实测**
- **生成页评分条**：新增 `GenerationRating`（复用课程页评分内件），定位按线上 `.course-rating-bar--generation`（`bottom: calc(clamp(44px,6vh,76px) - 52px)`、水平居中、绝对定位），挂在课程生成完成卡片之后。
  - **实测通过（本轮补上）**：`absolute` 定位、`bottom: -6.7px`（6vh≈45.3 − 52）、radius 20、5 颗星、提示文案「这门课程为你生成得怎么样？」；点第 4 星 → `expanded`（宽 560 / padding-bottom 12 / 输入 38 高 / 提交键 `rgb(76,102,148)` / 4 颗 filled）→ 提交 → thanks 态，服务端读出 `{rating: 4, comment: "生成速度不错，单元划分清楚", at: …}`。
  - **上一轮为什么测不到**：错误地去找 `.hk-send` 并等它可用；「打造课程」这条链路的发送键是**黑色圆形按钮**（无该 class），而且提交走的是 `submitCraft → CoursePlanModal`。**自动化驱动配方**（记下来省下次的时间）：① 用原生 setter 写 `craftText` 文本域并派发 `input`；② 在文本域上派发 `keydown Enter`（等价点发送）；③ 等计划弹窗出现后点「确认并开始构建课程」；④ 之后按「继续 / 确认结构」推进到完成态。
- **欢迎卡下一步标识按类型上色**：`.cj-welcome-next-kind` 四变体落地（默认/`--practice`/`--project`/`--exam`），按首个节点 `session_type` 选择；实测讲座类型 → `--learn`（`rgb(238,242,248)` / `rgb(76,102,150)` / 边框 `rgba(76,102,150,.16)`）。

**第三十七批（计分体系落地 + 阅读器编辑态评估）**
- **计分体系补齐**：全量资源搜到 `quizScoring-*.js`（1.9 KB 的共享模块），拿到此前缺失的基准分口径：`base 600 / fastBonus 200 / streakStep 100 / streakCap 400 / starThresholds [.8,.55,.25]`，以及 `scoreQuiz / perfect / stars` 三个函数的完整实现。本仓新增 `app/src/lib/quizScoring.ts` 逐字搬运，练习与考试共用。
  - 练习按线上口径发 `{ sessionId, finished, items, score: 点数, perfect, stars }`；考试仍是 `{ unitId, score: 百分比, items }`——**两页口径不同**，代码里分开处理。
  - 结果页新增「得分 x / 满分 y · 速答加成 z」点数行与 1–3 星（0 星不显示）。实测：练习 `score 1600 / perfect 5000 / stars 1`、页面显示「得分 1,600 / 满分 5,000 · 速答加成 400」「其中速答 2 题」；考试 `800 / 17,000`。数值与公式手算一致（5 题满分 = 5×800 + (0+100+200+300+400) = 5000）。
  - **顺带解决一个旧缺口**：`fastWindowMs` 不用再"沿用练习实测"——共享模块里就写着 `1e4`，有出处了。
  - 服务端 `practice/progress` 落库改为存点数口径 `{score: points, points, perfect, stars}`（原来把 score 当正确题数）。
- **阅读器编辑态：决定不做（本轮）**。线上速查表编辑器是 tiptap（含锚点、高亮、评论锚点、拖拽分栏与设置面板），`ChatResponsePage-*.js` 里能看到 tiptap 依赖与 `.tiptap-content` 样式体系。本仓若做成「textarea 直接编辑 markdown」，UX 与线上不是一回事，属于自创；做 tiptap 级 parity 又是大工程。**决定：维持只读，把编辑态列为独立议题**，等确认要对齐哪一档（轻量源码编辑 vs tiptap WYSIWYG）再动。

**第三十八批（星级回显 + 速答标记）**
- **星级回显打通**：服务端 `progress-status.practiceStats` 的已完成条目补 `score/perfect/stars`（并在练习进度里显式落 `correct` 计数，不再用点数比例倒推），课程页练习行据此渲染线上 `.practice-stars`（3 星、实心 `#f5a524`/空心描边 `#d1d5db`、`practice-stars-stamp` 盖章动画、`prefers-reduced-motion` 保护）。实测：`{correct: 2, total: 5, score: 1600, perfect: 5000, stars: 1}` → 页面 `aria-label="1 星"`、点亮 1 颗。
- **items 的 `fast` 字段补上**：之前那个 spread 是个空操作（`...(cond ? {} : {})`），现在按 `fastAnswers` 逐题标 `fast: true`；结果页答题解析里对应题目标「速答」chip。实测提交体 `q1/q4` 带 `fast: true`，解析页正好这两个 chip。

**第三十九批（PracticeStars 组件化 + 掌握态机）**
- 找到线上星星组件本体 `PracticeStars-DY5xk-t2.js`（731B）并逐字搬运为 `app/src/components/PracticeStars.tsx`：默认 12px、实心 `#E8B54B`/描边 `#C98A1E`、空心描边 `#D4D4D4`、`strokeWidth 1.4`、带动画时每颗延迟 `140 + 200*i`、`role="img"` 与 `${n} of 3 stars` 的默认标签。课程页原来那版自绘星星（14px / `#f5a524` / 无延迟）已替换——之前只是"看着像"，现在与线上逐字一致。实测 width 12 / fill `#E8B54B` / stroke `#C98A1E` / 三段延迟 140/340/540ms。
- 掌握态机按线上 `Fe()` 落地为 `practiceState()`：`notStarted → inProgress → done → rated（≥1 星）/ retry（0 星）`；课程页行状态点从「正确率 ≥0.8 → mastered」改为该状态机，图例补 `rated/retry/done/inProgress/notStarted`。实测状态点 aria-label 变为「已掌握」。
- **学习动态/课程卡不接星级**：这两处没有 per-session 的练习统计（学习动态是任务、课程卡是课程级），线上也没有对应渲染位置，不做。

**第四十批（练习 HUD 分数口径纠错 + 槽位数字/彩带/音效对齐）**
- **修掉一个真错**：练习 HUD 的「得分」此前显示的是**答对题数**（`setScore(s => s + (isRight ? 1 : 0))`），线上显示的是 `scoreQuiz` 的 `total`（600 起、连对步进、速答 +200）。现已改为走 `scoreQuiz` 派生，与交卷提交的 `points` 同源。实测五题全对：HUD 逐题 800 → 1,700 → 2,700 → 3,800 → 5,000，服务端落库 `score: 5000 / perfect: 5000 / stars: 3 / correct 5-5`，两边一致。
- 槽位数字换成线上实现（30 字符 strip、em 位移、千分位 `.practice-slot-sep`、逐位 45ms 延迟、`aria-hidden` + `.practice-sr-only` 镜像、reduced-motion 不滚）；旧版是自绘的两位字符滚动，位数、逗号、无障碍都没有。
- 连对 chip 按「`streak >= 2` 才显示」补上，streak 取自 `scoreQuiz`（答错/跳过清零），实测第 2 题起显示「连对 2」……「连对 5」。
- 彩带改成线上公式（颗数 `26+8*level`、调色板 7 色、锚点分数 chip 中心），此前是自造的 28 片与 5 色调色板；奖励节奏照抄（冻旧分数 → 420ms 解冻+高亮 → 960ms 清彩带）。
- **音效接通**：答对/答错/下一题/跳过四处播放线上同款 mp3（音量 0.6，`play().catch()` 静默失败）。资产早前已从线上抓到 `app/public/assets/img/sounds/`，但一直没接。
- **考试 `fastWindowMs` 结案**：ExamPage 读的是考试数据上的 `j.fastWindowMs`，本仓由服务端下发 10000；线上那门课的考试仍锁着，拿不到真实 payload，只能确认共享模块常量是 `1e4`，取值口径一致。

**第四十一批（练习结果页对齐：星级标题、四项统计、本轮排行）**
- 结果页从自绘的「表情 + 分制 + 正确率」改成线上的 `.practice-result` 结构：头像动画（`char-reward-pop.mp4` / `char-petting.mp4`，均为已抓资产、此前未接线）+ 光晕 + 「练习完成」kicker + 34px 星星（带 aria「3 星中获得 2 星」）+ 星级标题 + 38px 分数 + 「满分 X · 得分率 Y%」+ 四项统计（答对/速答/最长连对/排名）+ 本轮排行 + 返回课程。
- **补上一个此前完全没有的能力：本轮排行**。线上是客户端模拟的（`makeRivals`：FNV-1a + mulberry32、24 个昵称、三档水平 profile、按练习 id 播种），已逐字搬运到 `quizScoring.ts`；同一节练习的对手与分数稳定复现。实测 4 行榜单、自己高亮、名次 `#2`、行长延迟 900/990/1080/1170ms。
- 中文文案按线上 bundle 原文落（`练习完成`/`再来一轮`/`还需巩固`/`不错`/`优秀`/`满分 … 得分率 …%`/`答对`/`速答`/`最长连对`/`排名`/`本轮排行`/`你`/`返回课程`）。
- 保留本仓自己的两点：结果页下方的「答题解析与错题本」tab（线上把复盘放在「正在查看上次尝试」的复盘模式里）与「一键加入明日间隔复习日程」（线上无此入口）。

**第四十二批（「上次尝试」复盘模式）**
- 补上此前没有的复盘能力：服务端在 `GET /practice` 里返回线上同形的 `attempt`（`{finished, updatedAt, items, score, perfect, stars}`，item 为 `{state:"correct"|"wrong", answer, fast?}`），客户端补「上次尝试 / 返回当前」开关、`practice-review-badge`、「正在查看上次尝试」徽标、只读选项与只读填空、复盘态隐藏 HUD/计时器、底部只留「下一题」，并按线上语义做进入/退出的状态快照与恢复。实测：开关文案与 `--active` 类切换、徽标 role=status、HUD 消失、卡片 `--readonly`/`--selected --correct`、填空回填 attempt 答案且禁用、退出后重做态与 `检查` 按钮恢复。
- 进度点从自绘 `data-tone`（绿/红）改成线上类名与配色：`--correct #385da0` / `--incorrect #c34747` / 当前题 `--active:after` 同色胶囊；实测复盘时点色 `rgb(56,93,160)`、`rgb(195,71,71)`。
- 删掉题目头里重复的一排进度点（线上只有顶栏一排），实测现在全页 5 个点。
- 保留差异：线上重开已交卷练习默认是重做态 + 可切复盘，本仓一致；线上复盘时的 `Ue` 快照只存内存，本仓同样只存内存（刷新即回重做态）。

**第四十三批（欢迎弹窗分流 + attempt 落库形状归一）**
- 欢迎弹窗按线上重做：`section[role=dialog][aria-modal][aria-labelledby][aria-describedby]`、overlay 点击关闭、Esc 关闭、`<p>` 换回 `<span id=…>`；媒体从自绘图标换成线上的角色动画（`running-w-background.mp4`，poster `.webp` 已从线上抓下 19,460 B 落在 `app/public/.../whiteboard/`），补 `.practice-welcome-video{width:112%;height:112%;margin:-6%}`。实测媒体格 140px、poster/src 正确、`readyState=4`。
- 文案分流按线上原文：首次「准备好练习 / 全部答对，这次练习就会被标记为「已掌握」…」，有交卷记录时「欢迎回来 / 你上次尝试答对了 {{correct}} / {{total}} 题。再试一次——全部答对就能让这次练习被标记为「已掌握」。」——实测跑 3/5 的那节练习显示「3 / 5」，未交卷的 session 显示首次文案。
- 服务端 `practice/progress` 落库时把 items 归一成线上 attempt 的 item 形状 `{state:"correct"|"wrong", answer, fast?}`（同时兼容老客户端的 `{correct,picked,fill}`），`correct` 也改按 `state` 统计。此前老记录里存的是 `{correct,picked}`，导致 attempt 里没有 `state`、欢迎回来会显示 0 题。

**第四十四批（白板奖励层与单元完成层）**
- 修掉一处**帧形错误**：原来 `reward_user` 发的是自造的 `{reward:{credits,reason}}`，客户端只弹一行绿字「✦ 达成里程碑」；线上是 `{step_id, master_concept_title, master_concept_description}`，客户端弹奖励层（角色动画 + 「你获得了奖励」+ 概念标题/描述 + 知道了）。现按线上帧形与弹层结构落地，实测弹层 560px / radius 30px / grid `190px 316px` / video `char-reward-pop.mp4` readyState 4。
- 补上**单元完成层**（此前完全没有）：`response_complete{session:true}` 触发，`char-complete-standing.mp4` + 「恭喜，你刚刚完成了这个单元。」+「Beat N% of users today.」+ hint + 「在对话中继续 / 返回主页」+ recap 三 chip（保存白板图片 / 导出对话记录 / 回放 BETA）。percent 按线上口径 `10 + floor(21*rand)` 客户端生成；实测 percent=22。
- **时序对齐**：奖励层「知道了」→ 客户端发 `advance_step` → 服务端这时才发 `response_complete{session:true}`（线上 `dismissRewardPrompt` 也是关掉奖励再 `advance`）。修前两帧是背靠背发的，两个弹层会同时挂上。
- 音效按线上音量接通：奖励层 `reward.mp3` .6、单元完成 `session-complete.mp3` .6（这两支 mp3 之前抓下来一直没接线）。另查清其余触发点：闲置提示 reward .45、Pro 庆祝 reward .5。
- 清理：删掉被奖励层取代的 `credits` 状态与渲染行、Whiteboard 里未使用的 `Pause/Play` 导入，修掉两处 `no-useless-escape`（正则字符类里的多余转义）。
- 观察（未改）：白板页的讲稿面板在默认视口下不渲染（`script` 状态有更新，DOM 里没有对应面板），这与本次改动无关，记下来便于以后排查。

**第四十五批（闲置提示层 + 角色视频组件收敛）**
- **修正上一批的一处误判**：白板页「讲稿面板不渲染」不是 bug，而是白板默认进沉浸（zen）模式；点工具条的 zen 开关后侧栏出现，且奖励行「🏅 …」确实在讲稿里（实测）。
- 补上**闲置提示层**（此前没有）：线上 `$h` hook（120s + 4 个活动事件重计时 + `sessionIdlePrompt.snoozedUntil` 7 天免打扰）+ `Af` 组件（随机角色视频 / 三行文案 / 继续对话 / 返回课程列表 / reward.mp3 .45）。实测 120s 后弹出、结构 570px/radius 30px/grid `190px 308px`、媒体随机取到 `char-stars.mp4` 且 poster 同名 `.webp`、勾选写入 7 天后时间戳、关掉后不再弹。
- **收敛媒体组件**：线上所有角色动画都走同一个 `CharVideo`（内联 `mix-blend-mode:multiply` + `brightness(1.08)`，poster = 同名 `.webp`）与 `RandomCharVideo`（五个候选里随机）。本仓此前四处各写一份 `<video>`，现统一到 `app/src/components/CharVideo.tsx`；四张缺的 `.webp` poster 已补齐（stars/floating/petting/courses-reward）。
- 保留差异：线上 idle hook 在 course session 页常开；本仓按 `status !== 'connecting'` 判定，未连接时不弹。

**第四十六批（把上一批的空按钮做成真的 + 退出确认）**
- **修掉自己上一批的缺陷**：单元完成层底部三个 chip 当时只是「点一下关掉弹层」的空按钮。现在：
  - 保存白板图片 → 真导出 `${title}-page{N}.jpg`（JPEG q0.92，与线上同名同质量）：`app/src/lib/boardExport.ts` 走 `foreignObject` 路径（逐节点内联计算样式、同源图片转 data URL、iframe/video 换占位文案），逐页切换后截图，失败时如实提示「有 N 页没截出来」而不是静默失败。实测产出 `Whiteboard learning session-page1.jpg`，1520×1116 / 45,592 B / 头部 `ff d8 ff e0`，像素分析有 20,321 个暗像素与 5,336 个彩色像素（不是空白图）。
  - 导出对话记录 → 真下载 `${title}-transcript.md`，内容按线上结构（`# 标题` / `_导出于 …_` / `**板书 · 第 N 页**` / `**老师**` `**我**`）。
  - 回放 → 线上是独立回放视图，本轮没有等同实现，**直接删掉按钮**，不摆空壳。
- 新增**退出确认弹窗**（此前「返回」直接跳走）：线上 `.whiteboard-modal-*` 结构 + 文案（确定要退出当前 Session 吗？/ 退出后你可以随时回到课程页面继续学习。/ 继续学习 / 退出 Session）+ 插画 `question.png` + 退出图标 `exit.svg`（已抓）；实测 360px/radius 16px/role=dialog/aria-modal，取消与点遮罩都能关。
- 顺手补的两张线上资源：`exit.svg`（544 B）与四张角色动画 poster（上一批）。

**第四十七批（考试页对齐：结果页 + 作答存储 + 底栏）**
- 结果页从「复用练习的 Result（星级/排行）」换成线上 `exam-page--results`：逐题复盘（对错圆点图标、「第 N 题」、prompt、选项正确/错误着色 + 「你的答案」标注、填空题「你的答案 / 正确答案」两行、解析）+ 右下角 `exam-score-badge`（百分比 / `N / M 题正确` / `得分 X / Y` + 速答 pill），新组件 `app/src/components/ExamResultView.tsx`。
- **修掉一个数据流缺陷**：考试原先复用练习的「单题缓冲」，翻页会把上一题的选择带过去，导致结果页大面积判错。改成线上那样**按题存两本字典**（`examSelections` / `examFills`），翻页不丢、返回可见；实测返回上一题选择仍在，提交后 `1 / 15 题正确`、`得分 600 / 17,000` 与作答一一对应。
- 考试底栏改为线上结构：`.exam-actions` + `exam-nav-btn--back`（首题隐藏）+ `exam-primary-btn`（下一题/提交），点主按钮播 `button-click.mp3`；练习侧仍保留「检查/跳过」。
- 同时修掉**练习欢迎弹窗泄漏到考试**的问题（线上考试有自己的 `exam-intro`），并让考试不再显示练习 HUD（线上考试只保留 `exam-bonus-chip` / `exam-bonus-bar`）。
- 仍未对齐（记在案）：考试题目外壳与选项仍是练习那套（线上是 `exam-question-shell--multiple/--fill/--no-image/--animation` + `exam-option-card`（`role=radio/checkbox`、多选带 `exam-option-checkbox`、前四个选项有 `exam-option-key` 角标）与填空题的内联 `____` 输入框）。

**第四十八批（考试题目区对齐：外壳 / 选项 / 内联填空）**
- 上一批留的「考试题目外壳仍是练习那套」已补齐：新增 `app/src/components/ExamQuestion.tsx`，按线上 `exam-question-shell`（`--no-image/--multiple/--fill/--animation`）+ `exam-question-kicker` + `exam-question-title`/`exam-fill-title` + `exam-options-panel/grid/card` 结构渲染；选项卡片改成 live 的形状块（四种形状按序号循环、配色按 nth-child）、多选复选框、前四项角标、`role=radio/checkbox` + `aria-checked` + Enter/空格切换；填空题按 `____` 拆题干并把输入框内联进去。
- 尺寸按线上原文（`--no-image` 680px/gap 28px、`--fill` 620px、卡片 min-height 76px、形状块 34px、内联输入 184×38），CSS 全部取自线上样式表。
- 回归实测：单选/多选/填空三种外壳与 ARIA 全对；只答对前两题的整场考试落到结果页 `2 / 15 题正确`、`得分 1,300 / 17,000`、`Score 13 percent`，前两题标「你的答案」且判对 —— 证明换了题目外壳后作答与计分链路没坏。
- 已做：`animationHtml` 的 iframe 面板与 `--animation` 外壳（`ExamQuestion` 已接）。仍未做：题目携带 html 的数据源（线上由服务端下发，本仓生成链路不产）、题目区 3 列响应式断点（`@container exam-options`）未逐条复刻。

**第四十九批（互动题的动画面板）**
- 上一批记的「互动题 `animationHtml` 我们链路没有」是**误判**：种子里的考试数据本来就带 `animationHtml`（每份 exam.json 里恰好一题，约 10 KB 的自包含 HTML），只是客户端从没渲染过。现按线上契约接上：iframe + `sandbox="allow-scripts"` + `referrerPolicy="no-referrer"` + 子页 `hk-anim-height` 上报 + 父页监听设高 + 窄屏按 `clamp(width/720,.5,1)` 缩放。
- 实测：shell 切成 `--animation`、kicker「互动」、子页回报高度 509px（说明内部脚本与画布真的跑起来了）、scaler 481px、`scale(0.944)`。
- 仍未做：动画题 `maxHeight` 的父页行列测量（`ce()` 那套），本仓只用内容高度 + 缩放（结论与实测一致，保持本仓口径）。

**第五十批（随堂助手面板重写 + 助手接模型）**
- 面板按线上 `.practice-assistant*` 重写：`aside` + 空态提示 + 消息（typing 三点、assistant 走 markdown、截图缩略图）+ 附件区 + 错误行 + 输入行（附截图按钮 / 隐藏 file input / 输入框 / 发送按钮的禁用与转圈态），并支持把图片拖进面板；顶栏按钮改成线上的开/关 toggle（`--active`、`aria-label` 切换）。规则 43 条全部取自线上样式表。
- **修掉一个从没生效过的入参**：助手请求里的 `session_id` 原来是从题目 id 反推（`q1`.split 后得到空串），所以服务端一直 422、前端只显示「助手暂时不可用」。现在由 `Practice` 把 `session.sessionId` 显式传进 `QuizRunner` → 助手。
- **BYOK 化**：`POST /practice/assistant` 此前永远返回写死话术；现在走 `resolveByok` 调模型（系统提示只给提示不给答案 + 题干/选项/解析上下文），模型不可用时回落并在响应里标 `stub`。实测：无 key → 兜底话术；配假网关 → 返回模型文本且 `stub:false`，界面显示「OK-提示：先看题干里的限定词。」。
- 顺手把项目侧的助手入口也换成线上 `.practice-assistant-toggle` 样式与「助手」文案。
- 记一笔运维教训：本轮又踩到「改了 `src` 但 8787 上跑的还是旧 `dist`」——hub 的 `restart` 在守护进程已就绪时不一定真的重启，稳妥做法是 `stop` 再 `start`，并用 `ps -o lstart` 与 `ls -l dist/*.js` 比时间。

**第五十一批（助手截图真能用了：multipart + 多模态）**
- 上一批记的「截图只是随消息发出去、服务端暂不使用」已补齐：请求改成线上原样的 **multipart/form-data**（`session_id` / `question_id` / `messages` JSON / `images` 多文件），服务端用 `request.parts()` 收，并把截图作为 OpenAI 兼容的多模态 `content`（`text` + `image_url` data URL）发给模型；没有截图时仍走纯文本。旧的 JSON 形状保留兼容。
- `ChatMessage.content` 放宽为 `string | ChatContentPart[]`，其余调用点不受影响。
- 实测：curl 传 1×1 PNG → 响应 `stub:false`、`received_images:1`、`question_id:q1`，假网关收到的最后一条消息 content 是数组且 image_url 前缀正确；浏览器里用 file input 附图 → 缩略图出现、用户气泡带图、助手返回模型文本「OK-看图提示：注意截图里的第二行。」、附件区清空。

**第五十二批（项目助手对齐：multipart + 流式）**
- 上一批留的「项目助手仍是 JSON 路径，线上是否有对应 multipart 形态未验证」已查清并补齐：线上项目助手是 **multipart**（`stage_id` / `step_index` / `messages` / `images`）且响应是**流式纯文本**（客户端逐块 append），不是 JSON。本仓按同形重写，流式转发 `chatStream`；无模型时把兜底建议切片流式吐出，并去掉失败时的空 assistant 占位。
- 顺手修掉一个真错：阶段信息原来从 `course.stages` 里找，种子课程的阶段其实在 `resolveProject` 的结果里，导致系统提示里印的是 UUID；改用 `resolveProject` 后实测显示「Research Question and Methodology Design」。
- 实测：stub 流内容与响应头（`text/plain` + chunked）正确；流式假网关下拼接结果正确；浏览器项目页发问得到同样的模型文本。

**第五十三批（学习动态日历对齐线上）**
- 把学习动态页的日历从自绘 Tailwind 网格换成线上 `.calendar-*` 结构：周日打头的周标题、6×7 日格（`other-month` / `today` / `selected` / `week-view-day`）、`calendar-day-number`、`calendar-day-events`、`calendar-event.scheduled-event`（色板按标题字符和取模，`--event-color-*` 内联变量）、超 3 条的 `calendar-event-more`、周视图的 `calendar-day-task-count`；并补上此前缺失的**月份导航头**（`.date-picker-header` + 两个 `.date-picker-nav-btn` + `.date-picker-month-label`，格式同线上「九月 2026」）。
- 顺带修掉一处从没接过的状态：`setCursor` 之前定义了却没渲染任何入口，月份翻页实际不存在。
- 左栏改为跟随所选日期（线上是 sidebar 展示所选日），并保留原有的确认/完成/删除/开始课堂动作与配额面板。
- 实测：42 格、周标题「日…六」、今日与选中高亮各 1、头部「九月 2026」→ 点右侧变「十月 2026」、事件 chip 两种色板色（`#E8F0F8`/`#EBEFFA`）、周视图 7 个 `week-view-day` 且各带任务数。
- 仍未做：日历事件里 `kind:"course"` 的课程事件分支（带 hover 详情按钮与课程配色）、`calendar-sidebar` 那套（线上右侧还有一列日详情与统计，本仓复用了左栏）、Google Calendar 同步（自部署无 OAuth，记 N/A）、草稿态 `calendar-draft` 流程。

**第五十四批（单元完成层的「去做练习」）**
- 补上此前记为未做的分支：单元完成层的主按钮现在按「本单元有没有未完成的练习」二选一 —— 有则「去做练习」+ 提示「建议先完成这节课的练习，再进入下一节。」，无则「返回主页」。数据取自 `/practice` 与 `/progress-status`（`practiceStats[id].finished`）。
- 实测两条分支都对：清掉该课的练习记录后按钮变「去做练习」并跳到对应练习页；练习已交卷时保持「返回主页」且不显示提示。
- 仍未做：线上那个跨页面的 `proactive.practiceReminder`（上完课回到学习动态时的「去做练习吗？」提醒卡）没有实现；线上点击前会查积分（自部署无计费，直接跳，已在文档记明）。

**第五十五批（课程页的练习提醒）**
- 补上 `proactive.practiceReminder` 那条跨页面闭环：白板退出到课程页时带 `fromSessionId`，课程页按线上条件（该节有练习且未交卷）弹 `.cj-practice-reminder-*` 提醒层，文案与结构逐条对齐，并沿用线上一弹完就清 route state 的「只弹一次」语义。
- 实测：结构/ARIA/文案/尺寸全对，点「现在去练习」跳到该节练习页，刷新不再弹。
- 踩坑记录：第一次验证用的是 `/sessions/whiteboard/new`，白板会话跟课程结构里的 session 没有任何关联字段，提醒条件永远不成立；改用结构里的真实 `sessionId` 打开才复现 —— 线上靠 `conversationId/sessionId` 匹配，本仓同形。
- 已做：`sectionComplete` 完成卡片（讲次/项目/测验三种描述 + 「继续学习」，`CourseJourney` 里按 localStorage 记已庆祝）。仍未做：卡片插图与线上逐像素对齐。

**第五十六批（讲次/项目/测验完成卡）**
- 补上 `sectionComplete` 那套（此前记为未做）：课程页在讲次全部学完、或单元测验出分、或项目全步提交后弹一次完成卡，结构与文案对齐线上 `.cj-section-complete-*`，「继续学习」关闭。
- 完成态从已有数据推导（讲次：该讲所有 session 已掌握或练习已交卷；测验：`examScores[unitId]`），**「只弹一次」用 localStorage `cj-celebrated-sections`** —— 线上具体持久化位置没能从 bundle 确认，这是本地等价实现，已在文档标注为推断。
- 自测时踩到一个自己写的 bug 并修掉：判定用的 key 是 `exam:unitId` / `lecture:lectureId`，而关闭时记录的是 `kind:title`，导致关掉后立刻又弹、刷新也弹；现已统一为同一个 key，实测关闭后写入 `["exam:unit1"]`、刷新不再弹。
- 仍未做：项目分支（`kind:"project"` 需要「每一步都已提交并通过」的判定，本仓 projectStages 有 touched/completed，但「通过」标准未对齐）；任务详情弹窗（`task-detail-*`）；白板侧栏「大纲/资料」分栏；回放视图。

**第五十七批（完成卡触发口径对齐 + 项目分支）**
- 修正上一批的偏差：完成卡不再是「扫全站已完成项」，而是与线上一致 —— 只有**从那一节回来**（`fromSessionId` / `fromStageId` / `fromUnitId`）且该节现在已完成时才弹一次。配套把考试页与项目页的返回都带上来源参数。
- 项目分支落地：判定用 `projectStages[stageId].completed`（服务端在阶段提交后置真）；测验分支用 `examScores[unitId]`；讲次分支用「该讲每个课时都学完（有练习则要求练习交卷，否则要求已掌握）」。
- 实测：考试结果页返回 → 测验完成卡；项目阶段提交后从项目页返回 → `completed:true` 且弹项目完成卡；直接打开课程页不弹（与线上的「只在回来的那一节庆祝」一致）。

**第五十八批（任务详情弹窗改造）**
- 学习动态的任务详情从自绘 Tailwind 弹窗改为线上 `.task-detail-*` 结构（149 条样式原文并入 CSS）：overlay/container/close、header 与两行 meta（开始：/ 截止：）、描述、子任务（含「提前为你准备好的学习材料」说明与进度条）、底部圆形动作按钮；标题文案取自线上 zh。
- 日期现在**可编辑**：点 `modal-date-field` 里的编辑按钮弹出输入（本仓用原生 `datetime-local`，线上是自绘 `.date-picker-*` 弹层——简化已记档），改完 400ms 去抖即存，走 `/calendar/update_tasks`。实测某任务从 `2026-09-18T11:00Z` 改到 `2026-09-25T02:05Z` 并落库。
- 仍未做（线上有、本仓无）：评论调整（`taskDetail.commentToAdjust` + 评论面板）、生成文件卡（`task-detail-generated-file-*`）、相关截止项（`task-detail-related-due-*`）、拒绝任务、子任务级的文件生成动作；底部按钮目前用字形而非线上 SVG 图标。

**第五十九批（评论以调整：任务详情接模型改写）**
- 补上任务详情里此前缺的「评论调整」：面板/占位符/提交中的遮罩文案/成功 toast 全部用线上类名与 zh 文案；服务端 `POST /calendar/main_task_detail` 支持 `comment`，有模型时按评论改写 title/description/subtasks 并落库（BYOK 化），无模型时只记录评论并明确返回 `revised:false`。
- 实测三条路径：无模型（只记录评论）；快速假网关（`revised:true`，标题/描述/子任务被改写）；1.8s 慢网关（观测到「正在根据你的评论更新任务...」遮罩后弹出「任务已成功更新」）。
- 仍未做：拒绝任务、生成文件卡（`task-detail-generated-file-*`）、相关截止项（`task-detail-related-due-*`）、子任务级文件生成；底部按钮仍是字形图标。

**第六十批（「加入日历」四步弹窗 + accept 真落库）**
- 补上此前只有桩端点的课程排期链路：课程页新增「加入日历」入口 + 线上 `.course-cal-*` 四步弹窗（时长 → 开始日 → 星期 → 预览），计划按课程结构（课时 + 每单元测验）在客户端铺开；服务端 `/course-calendar/accept` 从「只回 success」改为真正写入 `state.calendar`（`type:"course"` + `payload.course_id`，同课程旧计划先清空，对应线上「确认后会替换它」）。
- **本地化决定**：线上这套弹窗文案是硬编码英文（不走 i18n），本仓按目标写成中文并记档。
- 实测：四步全通（7/14/30/60/90 天 chips、42 格月历含 today/选中态、Sun..Sat 星期 chips、预览 65 条）；确认后落库 65 条课程任务，入口由「加入日历」变「已加入日历」，学习动态日历上可见这些任务。
- 已做（全屏变体 + 开关；触发按钮位置无实证）：预览页的**拖拽改期**（线上 "Drag any item to a different day"）；`course-cal-modal--fullscreen` 的全屏变体；拒绝/生成的 `draft` 预览端点仍是桩（本仓不需要，计划在客户端算）。

**第六十一批（日历预览可拖拽改期）**
- 补上上一批记的「预览页拖拽改期」：预览换成线上同形的周网格（`ccal-preview-*`），条目可拖，`dragover` 高亮、`drop` 改期；计划由 useMemo 改为可变 state（前三步改参数重排、第 4 步可手调）。
- 实测：21 格预览、15 格有内容；拖拽转移下标正确、目标格出现该条目；确认后 65 条课程任务按调整后的日期落库。
- 已做（全屏变体 + 开关；触发按钮位置无实证）：预览里展示「已存在的任务」（线上 `ccal-preview-existing`，用来看是否与新计划冲突）与拖拽时的详细提示动画；`course-cal-modal--fullscreen` 全屏变体。

**第六十二批（预览显示已有任务 + 样式换线上原文）**
- 补上上一批记的「预览里展示已存在的任务」：预览同时画已有任务（`ccal-preview-existing--bar`，三色板循环条色）与新计划条目（`ccal-preview-pill`），已有任务里排除本课程自己的旧计划（确认时会替换，避免自己和自己冲突）。
- 顺势把上一批我自写的 `ccal-preview-*` 样式换成线上原文 29 条（日格 58px、`--today` 数字色 `#3d5477`、`--drag-over` 蓝底内描边、pill 白字 grab 光标等）。
- 实测：4 条已有任务条 + 17 个计划 pill + 21 个日格，色值取自线上色板。
- 已做（全屏变体 + 开关；触发按钮位置无实证）：`course-cal-modal--fullscreen` 全屏变体（含 `.course-cal-modal--fullscreen .ccal-preview-*` 的几条特化）；`draft` 端点仍是桩。

**第六十三批（任务的学习材料生成，BYOK）**
- 补上任务详情里「生成文件卡」这条线：线上是 `POST /file_generation/rerun {task_id}`（先查 `file_generation` 配额，成功把文件挂到子任务的 `related_file_ids.output_files` 并渲染成卡片）。本仓服务端实现该端点（BYOK 模型写作，无模型时结构化兜底并标 `stub`）+ 鉴权取件路由，并把用量计入 `usageCounters.file_generation`；客户端子任务行显示文件卡与「立即生成 / 重新生成」，生成中转圈、配额为 0 时提示「已达到每周文件生成上限。」（线上 zh 原文）。
- 实测：无模型路径 —— `stub:true`、卡片与文件名正确、取件 200/`text/markdown`/138 B、按钮变「重新生成」；模型路径 —— 配假网关后 `stub:false`，文件内容就是模型输出。
- 仍未做：源文件卡（`task-detail-file-card*`，对应任务的输入文件）、相关截止项（`task-detail-related-due-*`）、拒绝任务、子任务级的多文件（本仓只挂一个输出文件）、文件生成失败的 broken 态与 tooltip。

**第六十四批（拒绝任务 + 底部动作换线上图标）**
- 补上「拒绝任务」：服务端 `/calendar/approve_tasks` 从「只改状态」改成线上语义（数组入参、`reject` 从日历移除、响应带 `total_succeeded/queued_task_ids/failed_task_ids`）；客户端底部动作换成线上 SVG（确认 `M20 6L9 17L4 12`、拒绝双 path、删除/评论图标），拒绝带处理中 spinner 与禁用态。
- 实测：pending 任务详情同时出现确认与拒绝两个圆形按钮（radius 50%，4 个 SVG 图标）；点拒绝后弹窗关闭、待处理计数 -1、服务端任务数随之减少。
- 部分已做（待处理视图 + 整列批量确认/拒绝）：源文件卡（`task-detail-file-card*`）、相关截止项（`task-detail-related-due-*`，本仓任务没有关联关系数据）、子任务多文件、生成失败的 broken 态；「待处理」列表页（`pending_main_task_detail` + `pendingTasks.rejectAllTasks` 批量拒绝）也没有对齐。

**第六十五批（白板侧栏改为线上 tab 结构）**
- 侧栏从自绘的「讲稿/对话」改成线上 `.whiteboard-sidebar` + `.whiteboard-tabs`：**课程大纲**（学习节大纲卡片 + 本节要点 + 参考资料）与**学习记录**（课程列表 + 可用学习节，点选切换）；样式 53 条取自线上原文。本仓保留第三个 tab「讲稿」（线上把讲稿放在对话面板，差异已记）。
- 主栏里重复的「学习节要点」内联块删除，要点并入课程大纲 tab。
- **修掉一个字段错**：服务端会话列表只给 `session_id`，而前端（照线上写法）读 `sessionId`，点「可用学习节」会跳到 `.../whiteboard/undefined`；现在两者都返回。
- 实测：三个 tab 切换正常；大纲卡片显示学习节标题 + 大纲正文、无大纲时显示「此学习节暂无大纲。」；学习记录 70 门课程 / 60 个学习节可选。
- 未做：参考资料一节目前永远走空态（本仓学习节没有 references 数据）；展开/收起按钮已接（`whiteboard-sidebar-open-btn` + 收起/展开文案；收起入口的位置无实证，属本仓排布）；拖拽/键盘无障碍细节未逐条复刻。

**第六十六批（语音链 + BYOK STT 落地）**
- **把 STT 槽变成真链路**：之前五槽里的「语音识别」只在设置面板里可配、没有任何调用方。现在三条链都接上了：麦克风输入 `voice_stream_*{pcm_b64}`（24kHz PCM16 → 套 WAV → `/audio/transcriptions`）、冷提问 `user_message{audio_b64,audio_mime,audio_duration_ms}`、打断 `interject_question{audio_b64,mime,duration_ms}` 与 `interject_audio_chunk{pcm_b64}→interject_audio_end`。转写结果按线上帧回：`voice_transcript{text}`、`voice_stream_text{delta}`、`interject_user_text{delta}`；白板与 PDF 批注两条 WS 都接了。
- **修掉字段错**：`interject_audio_chunk` 此前读的是 `audio_b64`，线上发的是 `pcm_b64`（PCM16 裸流），所以打断的语音一直是空转；现在按 `pcm_b64 + sample_rate` 收，并在 `media.ts` 加了 `pcm16Wav` 包装。
- **修掉配置静默串槽**：`PUT /auth/byok` 只认 `{providers:{seam:{...}}}` 批量写法，`{seam, base_url, api_key}` 这种单槽写法会掉进 legacy 分支、把 key/baseUrl 写到 llm 顶层槽上（实测复现：给 stt 写 key，结果 llm 的 apiKey 被改成 stt 的 key，且返回 `{success:true}`）。现在两种写法都收，单槽写法只动对应槽。
- **修掉语音气泡竞态**：占位气泡「🎤 …」与转写帧谁先到不固定（React 提交晚于 WS 回帧时，按下标改写会落空），改成 `Map<voiceId, text>` + 统一合并函数，两条链都验证通过。
- 客户端：语音模式卡片（线上 23 条 CSS + 全部中文文案 + `localStorage["hk.session.voiceMode"]`）、麦克风按钮（两个入口）真实可用、`<400ms`/`<512B` 丢弃碎音、状态文案同线上。
- **仍与线上不同**：不做客户端 VAD（自托管 `/vad/silero_vad_v5.onnx` + worklet 预滚）与真·实时打断，流式转写只有一条全量 delta，TTS 未做 PCM 实时流（按句 `interject_pcm`）；没有「N 秒后发送 / 延迟发送」倒计时；`/audio-probe` 只有 ok 态（无 429 冷却、无 503 draining）。
- 实测：假网关（`/audio/transcriptions` 回「请用一个具体例子解释刚才的公式」）下，浏览器两条链都跑通——讲解中说话走 `interject_start`+`interject_question`，安静时走 `user_message`，气泡都由「🎤 …」替换成转写文本；原始 WS 用例覆盖 `interject_audio_chunk`×3→`interject_audio_end`、`voice_stream_start/chunk/end`、`user_message` 三条路径，服务端分别回 `interject_user_text`、`voice_stream_text`+`voice_transcript`、`voice_transcript`。

**第六十七批（BYOK 全链路复检，2026-09-16 晚）**
- **五槽探针全绿**（面板按钮逐个点过）：LLM `chat 探针 · 200 · 11ms`、TTS `speech 探针 · 200 · 7ms`、STT `models 探针 · 200 · 14ms`（深度探针 `transcription 探针 · 200 · 10ms`）、Search `search 探针 · 200 · 5ms`、Image `models 探针 · 200 · 14ms`（深度探针 `generate 探针 · 200 · 3ms`）。假网关侧计数：`/v1/chat/completions`、`/v1/audio/speech`、`/v1/search`、`/v1/models`、`/v1/audio/transcriptions`、`/v1/images/generations` 都被真实打到。
- **课程生成全链路复测**（此前一节标着「本轮未复测」）：首页输入 → 「课程大纲与学习规划」弹层 → 确认并开始构建 → `/response/course-generation/<uuid>`；帧序 `正在搜索网络资料 ｜ 第 1 步，共 4 步` → `构思初步思路与大纲 ｜ 第 2 步` → 问卷（4 题，含单选/自定义）→ `course_generation_answers` → `设计进阶课程结构 ｜ 第 3 步` → `没问题，继续生成课程细节`（结构确认）→ `生成课时讲义与互动练习 ｜ 第 4 步` → `查看课程`。期间 BYOK LLM 被真实调用。
- **run 落盘与回放**：`var/data/generation_runs/<run_id>.json` 记满 38 条事件（`start_course_generation`/`credits_charged{amount:0,byok:true}`/19×`course_generation_step`/9×`course_generation_progress`/`course_generation_questions`/`course_generation_answers`/`course_generation_structure`/`course_generation_complete`），`GET /course-generation/generation-log/<run_id>` 原样回放同一批事件。
- **路由巡检**：首页 / 课程 / 课程页 / 练习 / 考试 / 学习动态 / 历史 / 知识库 / 收件箱 / 课程集市 十个入口逐个打开，无 console 报错、无错误态文案。
- 复检中发现的唯一缺陷是 `PUT /auth/byok` 的单槽写法会静默串槽（已修，见第六十六批）。

**第六十八批（课程日历：全屏变体 + 计划分配修正）**
- 全屏变体接上：`.course-cal-overlay--fullscreen` / `.course-cal-modal--fullscreen`（实测 440×294 → 1482×755、圆角 18px → 0、预览区 `.ccal-preview` 撑到 1410×580、日格 `min-height:96px`），开关放在关闭按钮左侧，ESC 先退全屏再关弹窗。触发按钮的位置线上未取证。
- **修掉计划分配的堆积缺陷**：`slots[Math.min(index, slots.length - 1)]` 会把超出的条目全塞进最后一天（60 个学习节 + 默认时长 → 末日显示「+48」）。现在按 `ceil(n / 天数)` 顺序均摊，实测 65 条铺到 13 天、每天 5 条（3 条 + 「+2」），且保持课程顺序。线上这套分配算法没有抓到（只抓到预览的 CSS），均摊是本仓口径。

**第六十九批（学习动态左栏换成线上三块）**
- 左栏此前是本仓自绘的「日期卡 + 今日待办 + 已确认任务 + 待处理任务 + 已完成」五段，现在按线上结构收敛成三块：`.calendar-sidebar-summary`（日历摘要：日号 / 「周三, 9月 16」/「今天」胶囊 / 「N 项截止」「M 个任务」）、`.todo-section`（今日待办：日期徽标 + `.todo-item` 的标题/副标题/「查看详情」/删除）、`.completed-section`（已完成 + 空态「完成的任务会显示在这里」）。「已确认 / 待处理」本来就有右侧筛选 chip，去掉重复的两段。
- CSS 用 r173 抓到的 88 条原文；`.proactive-left` 的响应式按实测取三档（1400→262px、1150→192px、860→竖排），线上那几档的 `@media` 条件没抓到。
- 本仓差异：待处理条目上多留了「确认 / 完成」两个 pill（线上这两步在详情弹层），`⋯` 菜单未做。
- 实测：三块尺寸 315×155 / 315×362 / 315×128（1440 视口下左栏 262px），文案与线上一致（「日历 16 周三, 9月 16 今天 1 项截止 4 个任务」），条目带「查看详情」与删除。

**第七十批（任务详情补「相关截止日期」）**
- 任务详情弹层的「评论以调整」此前已实现（`.task-detail-comment-panel` + 线上占位文案「告诉 Orbie 你希望调整什么...」+ 取消/提交评论 + `comment-toggle` 按钮），本轮补上缺的 `.task-detail-related-dues`：取同 ±7 天窗口内的其它任务（最多 5 条，按时间升序），行结构照线上 CSS（`-bar` / `-icon` / `-content` / `-name` / `-time`），点击切到那条任务。
- **数据来源差异**：线上「相关截止日期」由服务端给关联关系；本仓没有这层数据，按时间邻近推导（记在条目上）。
- 实测：详情里小节顺序为「描述 / 相关截止日期 / 子任务 - 提前为你准备好的学习材料…」，相关项 3 条（9月 15 09:00 / 9月 17 09:00 / 9月 18 19:00），点第一条后标题从「勾股定理第二天：证明与推导」切到「勾股定理第一天：基础与历史背景」。

**第七十一批（course-calendar/draft 从桩改成真出稿）**
- 线上契约（r114 客户端源码 + rest_sweep 422 实证）：`POST /course-calendar/draft {course_uuid, start_date, duration_days, preferred_weekdays}` → `{success, items[], course_title}`；缺字段 422 FastAPI 形状；客户端只看 `items` 是否非空。
- 本仓实现：按课程结构（`enumerateCourseSessions`）出 `items[]`，`preferred_weekdays` 过滤可用日、`ceil(n/天数)` 顺序均摊、`scheduled_for` 出 `YYYY-MM-DD`；校验 `duration_days`（1–365）与 `start_date` 形状，422 体照线上。
- 客户端第 3 步「下一步」改为调 draft（`data-testid="ccal-draft"`），失败显示「无法为这门课生成计划。」并留在第 3 步；成功直接进第 4 步预览。
- 实测：缺字段 422（`loc:["body","duration_days"]`）；`{start_date:2026-09-16, duration_days:7, preferred_weekdays:[1,3,5]}` → 60 条铺到 9/16、9/18、9/21、9/23 各 15 条；浏览器里勾周一/三/五后第 4 步预览显示同样 4 天 × （3 条 + 「+12」）。
- 分配算法线上仍未取证（只抓到了请求/响应字段），均摊口径与客户端一致。

**第七十二批（学习动态「待处理」视图）**
- 线上「待处理」是一整块按来源分列的视图（r174 DOM/CSS + proactive bundle 实证），本仓此前只做了状态筛选。现在接上 `.pending-tasks-view`：来源列（`.source-column` 290px）、列头 `.source-card`、`.source-tasks-list` 的 `.pending-task-card`（标题/副标题/日期区间/「查看 →」，行内 评论/确认/拒绝）、列底 `.source-actions-footer` 的「确认所有任务」「拒绝所有任务」。
- 批量动作走 `POST /calendar/approve_tasks {task_id:[…], action}`（线上同款，`reject` 是从日历移除），`approve`/`confirm` 都归一化成 `confirmed`。
- **修掉一个状态错**：线上确认按钮走默认 action `approve`，而早期种子把确认态写成 `confirm`（既不是 `confirmed` 也不是 `pending`）——列表读出来统一归一到 `confirmed`，种子里的错值也已改。
- 分组口径差异：线上按 canvas/文件/公告分组，本仓按「课程 / 无来源」；日期区间按 `scheduled_for + duration_min` 推算。
- 实测：待处理视图只在 `status==='pending'` 时出现（2 列 2 卡）；单卡「确认」后该卡离开视图、状态变 `confirmed`；整列「拒绝所有任务」后该来源的卡全部移除、列数 2 → 1（`list_main_tasks` 同步减少）。

**第七十三批（文件卡三态 + 差距文本校正）**
- 任务详情的生成文件卡补上线上三态：生成中（`-processing` + spinner +「正在生成 …（最多 600 秒）」）、失败（`-failed` +「当前生成失败」，按钮切「重新生成」）、待生成（「文件待生成——准备好后将通知你」）；失败态由生成请求的 `success:false` 驱动。
- **校正过期的差距陈述**：`practice-slot-roll`/`practice-slot-digit-strip`（`SlotNumber` 组件已实现并在练习 HUD 使用）、`calendar-sidebar`（线上就在 `.proactive-left` 里，本仓已按 r172 复刻）、`task-detail-related-dues`（本轮已补）三处「仍未做」都已落地，改为如实记录。
- 实测：待生成态显示提示与「立即生成」；生成成功出就绪卡（📄 文件名 + 为你准备的学习材料）；把 `/file_generation/rerun` 打桩成 `success:false` 后出失败卡（`task-detail-generated-file-card-failed` +「当前生成失败」），按钮文案切「重新生成」，并弹「生成失败，请重试。」。

**第七十四批（速查表编辑模式）**
- 阅读器此前只有 A4 预览；现在补上线上 `cheatsheetEditor` 的三模式（预览 / 正文 / 编辑模式）、工具栏（加粗/斜体/一~三级标题/无序/有序/代码块/插入行内公式/换列符/撤销/重做）、保存态（保存中… / 您有未保存的修改 / 已保存！/ 上次保存 {{time}} / 保存失败）、3 秒静默自动保存、离开拦截弹窗（离开而不保存？+ 继续编辑 / 立即保存 / 放弃更改），文案全取线上 zh 字典。
- **保存链路**：新增 `PUT /api/v1/files/:id {content}`（阅读器路由没有会话上下文），同时让线上的 `POST /conversations/save_artifact {artifact_id, content}` 同步改写对应文件内容。
- **实现口径**：编辑器是 markdown 文本域 + 工具栏插语法（不是 tiptap），右侧并排同一套 A4 预览；线上 tiptap 的 DOM 类名未取证，双栏类名为本仓自绘。插图、文字颜色/高亮、光标锚点、拖动分隔未做。
- 实测：模式三态切换正常（正文模式隐藏 A4 预览并渲染 markdown）；工具栏「加粗」把选区包成 `**…**`；改动后状态变「您有未保存的修改」，静默 3 秒后自动保存并显示「上次保存 下午8:36:47」，`GET /api/v1/files/<id>` 读回含新增内容；点其它模式弹「离开而不保存？」。

**第七十五批（编辑器补齐颜色/高亮/插图，并修两个真问题）**
- 工具栏补 **文字颜色**（线上 `py` 七色）、**高亮**（线上 `fy` 六色，无颜色时插 `==…==`）、**插入图片**；预览把 `==…==` 转成 `<mark>`（线上 tiptap-markdown 的高亮语法），文字颜色用线上的 `<span style>` 口径，两套色板取值照 r84 原文。
- **修掉图片 404**：`/drive/upload_file_to_drive` 只写了 `<id>` 的字节、没写 `<id>.json` 元数据，导致 `/api/v1/files/<id>` 读不出（`readPersistedPublicFile` 需要 sidecar）→ 插进编辑器的图片必然 404。现在上传时一并落元数据，实测 `200 image/png 88B`。
- **修掉预览不跟草稿**：编辑模式右侧预览此前渲染的是载入时的 markdown，改动要等保存后刷新才可见；现在预览与正文都跟随草稿实时刷新（实测插图后立刻以 24×24 出现在预览里）。
- 实测：`==重点：勾三股四弦五==` → 预览 `<mark>` 背景 `rgb(254,240,138)`；`<span style="color:#dc2626">斜边一定最长</span>` → 预览 `rgb(220,38,38)`；插图插入 `![图示例.png](/api/v1/files/…)` 并在预览里加载成功；「离开而不保存？」在未保存时确实拦住模式切换（等静默自动保存落地后再切换即通过）。
- 仍未做：光标锚点「内容将添加在此行之后」、拖动分隔调整编辑区宽度、保存失败详情报错面板。

**第七十六批（编辑器：拖动分隔 + 光标锚点）**
- 补上线上 `resizeSplit` 与 `anchorMarker*` 两件事：编辑区与预览之间加了可拖分隔条（`role="separator"`，aria-label「拖动调整编辑区与预览区宽度」，悬停高亮，宽度限制 22%–72%），工具栏下方加锚点芯片显示「光标 · 第 N 行 · 内容将添加在此行之后」，随光标（键盘/点击）移动更新。
- 实测：拖动后编辑区宽 524 → 739px；光标从第 1 行移到第 5 行，锚点芯片同步为「第 5 行」（用真实按键事件驱动；React 的 onSelect 对合成事件不敏感，所以监听 onKeyUp/onClick/onSelect 三处）。
- 仍未做：线上 tiptap 那套「内容插入到锚点行」的生成回写语义（本仓编辑器只做插入语法，锚点仅作指示）。

**第七十七批（课程空态换线上资产 + 回归巡检）**
- 课程页空态从自绘 SVG 换成线上两张插画（`/pages/coursePage/CourseJourney/no-search-result.png`、`no-courses-yet.png`，各 1254×1254，落到 `app/public/assets/img/pages/coursePage/CourseJourney/`），文案换成线上 zh 词典原文（「没有找到匹配的课程。」/「试试其他关键词，或清空搜索。」与「你的课程架暂时是空的」/「生成你的第一门课程，或去课程市场逛逛，开始学习吧。」）。
- **回归巡检**（本轮改了编辑器/动态/日历/白板多处，专门跑一遍）：首页→课程→学习动态→历史→课程集市的 SPA 导航（补丁在页面内打点）0 个 4xx、0 console 报错；课程页（开日历弹窗）/练习/考试/白板（退沉浸）/深度课堂四个深层路由各做一次交互，同样全绿。
- 顺手清掉 `Courses.tsx` 里**既有的** lint 问题（未用的 `ChevronLeft/Right` 导入、未用的 `todayIdx`、渲染期 `Date.now()`），改后 `tsc` + `eslint` 干净。
- 实测：课程页搜索一个不存在的关键词 → 空态渲染 `IMG naturalWidth 1254`、标题「没有找到匹配的课程。」、说明「试试其他关键词，或清空搜索。」。

**第七十八批（端到端验收：上课 → 练习 → 考试 → 进度）**
- 把「整条学习链」串起来跑一遍（BYOK 五槽全配到假网关）：
  1. 白板会话：打开 `/course/<uuid>/sessions/whiteboard/<sid>` → 退沉浸模式 → 输入框提问 → 页面出现模型回答（假网关回 `BYOK OK`，说明 llm 槽在讲解答疑链路上真的被调到）。
  2. 练习：进 `/practice/unit1` → 关欢迎层 → 点选项作答 → HUD 分数槽正常渲染（`.practice-slot-digit-strip` 30 字符竖排，可见位由 `1.05em` 裁切，无障碍文本走 `.practice-sr-only`）。
  3. 考试：进 `/exam/unit1` → 「我准备好了」→ 倒计时 `29:59` 起走 → 15 题逐题作答（选项类名 `practice-option-card`，推进按钮 `exam-primary-btn`，最后一题变「提交」）→ 交卷 → 结果页出现「题正确」。
  4. 服务端进度：交卷后 `GET /course-generation/courses/<uuid>/progress-status` 的 `examScores` 从 `{}` 变为 `{"unit1":0}`，`examStarted.unit1` 全程为 `true` —— 考试分数确实落到进度表上（分数 0 是因为假网关的模型输出与盲选，契约本身正确）。
- 结论：本轮没有发现新缺陷；两条链（媒体/BYOK、进度/评分）各自的关键帧与落库都在。

**第七十九批（网络自检面板）**
- 白板右上角那个「检查我的网络」此前只把 `/net-check` 的结果塞进一行文字；现在换成线上的 `.netcheck-*` 面板：状态（9 种 verdict，含 `ws_blocked`「你的网络挡住了实时连接」与 `server_draining`）+ 指标（延迟 / 服务器响应 / 实时通道 + 本节课·测试连接）+ 最可能的原因列表 + 进阶检查两张结果卡 + 重新检查 + 「刚刚更新 / N 秒前更新」+ 「上课期间每 30 秒自动重新检查一次」。
- 探针口径照线上：`GET /net-check?n=` 8 秒超时；实时通道优先复用本节课通道（`viaSession`），没有就单开一条 WS 试连（`viaProbe`）；**模型状态**走白板 WS 的 `model_probe`（服务端真发一次 BYOK chat，`ttft_ms`/verdict 回填到卡片）；语音那一项先用 `/audio-probe` 的轻量版。
- 修了一处布局：菜单原本没包在 `.netcheck-wrap`（`position:relative`）里，导致相对远祖定位、底部被视口裁掉；现在锚在按钮上，实测 `top 58 / bottom 587 / viewport 755`（不裁切，内容多了走 `overflow-y:auto`）。
- 实测：状态「已连接到 Hyperknow」+ 延迟/响应 2ms + 实时通道「已连通 · 本节课」；「检查模型状态」→ 卡片 `data-tone=good`「模型有响应 · 简短提问 19 ms」；「检查语音连接」→「语音正常」。
- 已做：语音那一项的细分 verdict（真取样本音频、量速度、试播放、静音/冷却判定）。仍未做：DNS/TLS 分项耗时、独立的 `net_check_session` 通道。

**第八十批（网络自检：语音连接做到线上细分）**
- 服务端 `/api/v1/audio-probe?sample=1` 从「回 JSON」变成「真合成一小段再回音频字节」，响应头带 `x-synth-ms`（我们这边的合成耗时）与 `x-stub`；实测 `200 audio/mpeg 48000B`、`x-synth-ms: 42`。
- 客户端量「我们的处理 / 你的下载速度 / 实时语音所需（≥ 40 KB/s）」并尝试播放，落到线上的 8 个 verdict：ok / slow_link / tts_failed / download_failed / playback_blocked / muted / unauthorized / cooldown（20 秒冷却，带剩余秒数）。静音或讲解中不播，走线上 `playbackSkipped` 文案。
- 实测：无音频输出设备的环境里得到 `playback_blocked`（「语音收到了，但播不出来」）+ 三项指标（1 ms / 1474 KB/s / ≥40 KB/s），二次点击进冷却（「稍等一下 · 18 秒后可以再检查一次」）。**未能实测 ok/slow_link**：这台无头浏览器没有可用的音频输出，`play()` 必然失败——真实浏览器里有扬声器时会落到 ok 或 slow_link。
