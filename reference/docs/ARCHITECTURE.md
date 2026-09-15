# Hyperknow Agent 架构逆向(快照 2026-09-02)

来源:自有账号 + 自有浏览器会话的被动流量与单发探针,122 个前端 chunk 静态逆向。

## 总览

```
┌─────────────────────────────────────────────────────┐
│ agent.hyperknow.io  (Vite + React SPA, Render 托管)  │
│   认证: Supabase Auth (邮箱/Google/…), JWT Bearer    │
└──────────────┬──────────────────────┬───────────────┘
               │  REST /api/v1/*      │  WebSocket wss://api.hyperknow.io
               ▼                      ▼
┌─────────────────────────────────────────────────────┐
│ api.hyperknow.io  (FastAPI, Cloudflare 前置)         │
│  · /api/v1/ws                 — 即时对话 channel     │
│  · /api/v1/whiteboard/ws      — 白板授课 channel     │
│  · /api/v1/pdf-annotation/ws  — PDF 批注 channel     │
│  · Supabase (project mcpbxxrodqgsmatssajx)           │
│    认证 + 存储 + RLS 命门                            │
│  · Stripe 计费  · Google Calendar / Canvas LMS 连接器│
│  · LLM 后端: gemini-3-flash-preview (内容生成观测)   │
└─────────────────────────────────────────────────────┘
```

## Agent 执行模型(即时对话实测还原)

```
user_message
  └─ directorAgent(思考) ─→ tool_selection ─→ tool_execution(轮询迭代, round_index++)
                                   │              │
                                   │              ├─ generate_content / generate_quiz /
                                   │              │  generate_flashcards / generate_html_animation /
                                   │              │  generate_instructional_video /
                                   │              │  create_deep_learn_session / create_board_session /
                                   │              │  publish_file
                                   ▼              ▼
                         mark_response_complete(硬校验:必须先产出内容)
                                   │
                                   └─ recommend_next_step(下一轮建议卡片)
```

- 内容产出经 `content_chunk` 流式回推,`tool_execution.completed` 帧暴露 `model_used`、`chunk_count`、`total_length`
- 全过程对前端完全透明(见安全报告发现 #7)

## 配额/计费

| 档 | 价 | credits/12h |
|---|---|---|
| Free | $0 | 20 |
| Pro | $12 | 40(不可购)/ $18 80(可购) |
| Max | $50 | 300 |

其他限量(free 实测):file_upload 5/窗、calendar_add 2/窗、file_generation 5/窗、deep_learn_session 5/窗。
## 第三轮补全（2026-09-03）

### 课程生成流水线（course-generation/ws 全程实测，65 帧）

```
{start_course_generation: query, ui_language, course_uuid(客户端生成), attachment_paths, course_source_mode}
  → boot
  → researching_the_web   (≤5 轮，progress 帧带 keywords 与每轮抓取 url/summary/result-id)
  → course_generation_questions (4 道画像题，is_multiple/选项带 title+description)
  ← {course_generation_answers: [{question_index, selected_options[]}]}
  → generating_initial_syllabus → generating_course_structure → generating_session_outlines
    (per unit:lecture:session 阶段名, 引用 reference_ids)
  → course_generation_complete (内嵌整门课 course/units/projects/tags/封面)
费用：10 credits（free 起始 20）
```

### Agent 技能目录（来自泄漏系统提示词，get_skills 按需装载）

conceptExplanation / systematicLearning / whiteboardSession / cheatsheetGeneration / planTasks / documentReading

### 工具全集（提示词 + 帧证据交叉确认）

directorAgent(思考) · get_skills · memory_recall · add_memory · ask_questions · search_and_summarize_web · analyze_url_content · search_images · search_files(drive/canvas 双源) · read_content · content_planner · generate_content(style/has_more 标志) · generate_quiz · generate_flashcards · generate_html_animation · generate_instructional_video · code_generator · create_deep_learn_session · create_board_session · publish_file · artifact_update · add_to_calendar · generate_main_tasks · mark_response_complete(硬校验) · recommend_next_step

### 白板授课通道（whiteboard/ws 实测）
session_ready ←{start_session | resume_session | resume_or_start_course_session(course_session_id="<course>:<session>")}; lecture_outline_selected; board(markdown 直推, step_id/page_id); set_tts_config(voice_id,speed); start_teaching; interject_start/question/audio_chunk(MIC PCM b64 实时打断); model_probe → {minimal.ok, ttft_ms, verdict}

### 记忆系统
分类学：preference|knowledge|logistics|other；apply_memory_ops 批量操作；profile_memory = onboarding 4 题 Q&A 对；external_memory 槽位

### 增长闭环
注册即生成 invite 链接(ref=10位id，奖励 4 天 Pro + 40%-off 券：coupon↔invite 双因子)；affiliate(join 即时开通, dub.co 20% 佣金)；dailyTrends = 预生成双语热点池(US region)

### 存储布局
S3 公共桶 `nutcracker-hyperknow-public`(us-east-2)，键 `root/drive/<user_uuid>/files/<file_id>/{source,thumbnail,...}`；服务端容器路径 `/app/cache/database/user_data/...`

### 版本观察
SPA v1.3.13；营销站 Framer 托管；status = Better Stack（公司名 Nutcracker AI Inc.）；go = 入群码 SPA（Express/Render）；kol = KOL Dashboard（Google Frontend）
## 第五轮：子系统补全（2026-09-03 深夜）

### 视频生成流水线（generate_instructional_video 实测逐阶段帧）
```
initializing → script_writing (6 scenes, 剧本 preview 明文) 
  → generate_narration (TTS 9 条音频, 总 116.74s)
  → code_generation (scene_types: remotion×4 + manim×2)
  → video_render (逐场景乱序完成帧: scene_index/rendered_count/total_scenes)
断连不再补播进度；渲染产物未见落历史 [INFERENCE: 客户端断开可能中止任务]
```

### Kol 运营后台（kol.hyperknow.io）
- 前端 SPA（Google Frontend 托管）+ 同源 `/api/*`
- 双认证：Supabase（可选）+ local-login（email/password → kd_local_token）
- 角色路由：admin → /admin/{stats,partners,promo-codes,code-types,campaigns}；kol → /me/{codes,redemptions,earnings}
- Dub 集成：dub_partner_id/dub_link_key、同步动作 `GET /api/admin/partners/dub-sync`（GET 触发同步=设计粗糙）

### 入群码后台（go.hyperknow.io）
- 同源 Express API；公开 `/api/school/{slug}`；管理 `X-Admin-Key`；路由 /admin(school CRUD + 二维码签发)

### 页面资产
`assets/screenshots/` 16 页 webp；44 条前端路由见 `evidence/routes_dev_surface.md`

### 完整工具/技能注册表
`assets/TOOLS_AND_SKILLS.md`（28 工具状态矩阵 + 6 skill 行为指纹 + 成本/配额表）
## 第四轮补全（2026-09-03）

### 教学视频管线（generate_instructional_video 全程帧）
initializing → script_writing（N 场景+文本预览）→ generate_narration（TTS clips + 总时长）→ code_generation（**场景类型混合 Remotion + Manim**）→ video_render（并行渲染、乱序回调 per-scene）→ 合成

### code_generator 沙箱
code_chunk 流 → executing → code_output；失败自动重试 ≤4 次后降级 generate_content；冥等性差（见报告 #21）

### 白板 UI/协议面
- 路由 /whiteboard/<session_id 32hex>；组件控面：缩放/页码（1/1 页）、Voice: Calm 1×（TTS 语音/语速）、Export(JPG/PDF 全页)、Check my internet、Resume/Mute、Chat history、麦克风「Speak to ask or interrupt」（PCM b64 interject 链）、Add image
- 画布栈 = **Excalidraw**（zIndex-canvas/interactiveCanvas/svgLayer CSS 指纹）；PDF 批注 = react-pdf
- 诊断链：/api/v1/net-check + net-check/ws（probe_ok 帧）+ ping/pong RTT + model_probe

### 设计系统
字体 Satoshi(+MiSans CJK)/EB Garamond+宋体（ticket 标题）/ChillDuanHeiSong/Sawarabi Mincho；shadcn 风 HSL token（--background/--card/--primary/--chart-1..5），app bg #FAFAFA；页面级 CSS 分包（每个 route 独立 css chunk）

### Marketplace 内容生态
官方出版方 "Hyperknow Learning Lab"；33 门课程：AP 考试（Biology/World History/Psychology/SAT）+ 社科 + Prompt Engineering；卡片字段：lessons 数、onboarded 量（最高 9K）、评分、Subject 分类 10 类；enroll 即复制生成个人 courseUuid

### Learning Feed
日历为中心：pending/confirmed 任务、免费配额面板（**按周**重置：Mon 08:00 GMT+8，与 credits 12h 双轨）、月/周视图

### 学习进度模型
recommend_next_step 内嵌 learning_progress{title_action, current_title, topic, percentage, predicted_next_title}，百分比随产出递增（10→30→…）

### 新 REST/WS（第四轮实测）
`POST /deep_learn/get_session_data {deep_learn_session_id}` → conversation_data+session_task_plan(progress 树)；`POST /files/<id>` 公开制品（报告 #20）；`GET /marketplace/courses/{id}`；`POST …/enroll`；`POST /calendar/approve_tasks {task_id, action:'approve'}`（级联 subtasks）；`wss /net-check/ws`

## 关联产物
- `evidence/api_endpoints.md` — 98 个 REST 端点全量地图
- `evidence/ws_frame_types.json` — WS 收/发帧类型全集
- `evidence/api_schema_samples.json` — 关键端点响应 schema 样本
- `js_bundles/` — 前端 chunk 全量(可本地复扫)
- `docs/SECURITY_REPORT.md` — 两轮安全检查发现
