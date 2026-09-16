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
