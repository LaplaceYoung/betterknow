# Plan — betterknow（hyperknow.io 全栈 replica）

## 0. 事实源与工具偏差
- **录屏**（`recordings/`，1440×900 CSS @2× → 2880×1800 物理，25fps CFR）：
  `hyperknow-walk.mp4`（193s：首页两 tab / 版本更新弹窗 / 历史会话回放 / 白板入口卡 / 即时协助面 / 集市 / 预览+加入弹窗 / 我的课程 / 课程详情 / 学习动态 / 历史 / 知识库 / 收件箱）、`-b`（144s：白板教学界面 62–85s、课程单元页 100–116s）、`-c`（114s：即时协助输入态）、`-d`（110s：真实提问流 8–50s、讲次行 55–85s、头像菜单+设置弹窗 88–114s）、`craft2`（197s：打造课程提交→生成日志页）、`craft3/4`（问卷 Q1–Q4 →生成）。
- **逆向事实源**：`hyperclone/spec/PAGE_CONTRACTS.md`（44 路由→36 页契约 `spec/pages/*.md`：Endpoint/WS/State/Controls/Navigate）、`spec/FEATURES_MATRIX.md`（全站功能矩阵）、`spec/PROTOCOL.md`（WS 帧）、`reference/evidence/api_endpoints.md`（297 行 REST）、`reference/evidence/design_system.md`（CSS 变量/字体/圆角/阴影/keyframes 全量）、`reference/recovered/modules/*.src.js`（反编译页面源）、`reference/assets/i18n`（全字典）、`hyperclone/seed/*`（33 门课、trends、onboarding 问卷、whatsnew、tools/skills 注册表、prompts）。
- **工具偏差（本会话无 video MCP / IAB node_repl）**：帧观察用 ffmpeg 接触表+定帧（`recordings/review/*.png`）；旅程重演/截图/录像用 ego-browser（用户默认浏览器）+ CDP screencast；API 叉用 curl。对照证据用 ffmpeg 并排合成代替 `composite_view`。

## 1. Layout strategy
- **[S0]** CSS 视口 1440×900（录屏 2880×1800 为 2× HiDPI）。设计/验证宽度 1440；响应式按 `--sidebar-width:240px` 固定侧栏 + 流式主区（min 1024 → 侧栏可折叠，`whiteboard-sidebar-open-btn` 模式）。
- **[S1]** App shell：左侧栏 240px（`--sidebar-margin:12px`、`--sidebar-radius:16px`、bg `#f1f2f4`/`--panel #f4f4f5`）+ 主区 bg `--app-bg #FAFAFA`。侧栏结构：Logo（Hyperknow 字标）→ rail 6 项（首页/课程/学习动态/历史/课程集市/更多选项，各带线性图标，选中态浅灰底）→「继续学习」卡（讲座标签+讲次名+课程名）→「近期活动」列表（可折叠，白板项带图标）→ 底部「来看看版本更新 · v1.3.13」按钮。（walk 0–14s, t108）
- **[S2]** 顶部 chrome（主区右上）：`PRO ✦ 64` 积分胶囊（tooltip「还剩 N 个积分」）→ 切换语言图标 → 「联系创始人」/「邀请好友」胶囊按钮 → 头像。响应页替换为「切换语言 / Share conversation / 遇到问题？」。（t108, walk-d 88s）
- **[S3]** 内容容器：居中列 max-width ≈ 880px（首页/响应页）；集市与课程页为全宽网格（内边距 32px）。
- **[S4]** 卡片体系：白底、1px `--border`（0 0% 89.8%）、圆角 `--radius .625rem`~16px、阴影 `0 1px 2px rgba(0,0,0,.04)`；课程封面卡 = 插画封面 + studio 徽标行 + 标题(衬线 EB Garamond/Songti) + 描述 + 元数据行（入门/进阶/高阶 · N 课时 · N 人已加入 · ★评分）+ 科目 chip + 圆形箭头按钮。（t122–t132）

## 2. Design tokens
- **[S5]** 颜色：`--app-bg #FAFAFA`、`--bg #fff`、`--text #0a0a0a`、`--panel #f4f4f5`、`--panel-elevated #fafafa`、`--right-rail #f1f2f4`、`--border hsl(0 0% 89.8%)`、`--muted-foreground hsl(0 0% 45.1%)`、`--primary hsl(0 0% 9%)`、`--destructive hsl(0 84.2% 60.2%)`、chart-1..5；PRO 徽标金色 `#c9a227` 系；进度绿 `#22c55e`。（design_system.md §调色板）
- **[S6]** 字体：`--font-satoshi`（Satoshi Variable/Medium/Bold/Black/Light + MiSans/PingFang 回退）、`--font-chinese-serif-display "ChillDuanHeiSong"`、`--font-ticket-title "EB Garamond","Songti SC"`（课程标题/票据）。字体文件在 `reference/assets/fonts`（Satoshi 878 分片、KaTeX、Virgil、Xiaolai）。
- **[S7]** 圆角/阴影/间距：`--radius .625rem`、侧栏 16px、输入框 24px 胶囊、弹窗 20px；design_system.md §圆角阴影布局逐条。
- **[S8]** 动效 keyframes 清单（design_system.md §动效清单 235–595 行）：spin、pulse、shimmer(skeleton)、fade-in-up、orbie-bounce、dot-drift 等；复刻时按名逐个搬。

## 3. Pages（每页对应 `spec/pages/*.md` 契约；时间戳为录屏证据）
- **[S9]** `/` Home — Craft 模式：tablist「打造课程 | 即时协助」；hero「使用 ✦Hyperknow 打造你的专属课程」+「掌握人类知识中的一切」；胶囊输入框 placeholder「Hyperknow 可以为你生成课程」（ghost 提示轮播「学习 统计学，一眼看穿图表里的谎言 ⇥tab」）；行内控件：附件 +、`Course source` 单选（自学 / 学校同步）、积分成本 chip「10」、生成箭头；「或直接从 学校的 LMS 导入」；「生成课程时可以用什么主题？」；下方「课程集市 / 查看全部」三卡条。右下角签名「Attention, Drifting / Dot field, cursor light, 2026」。（walk 0–14s, seg-30-66 tile9）
- **[S10]** `/` Home — Assist 模式：hero 轮播「让我们深入了解一些有趣的东西！/ 你想学什么？/ 让我们复习你的笔记！」+ 飞碟图标；输入框 ghost 轮播（「帮我做一张微观课期末的两页速查表」→「开一个深度学习会话，带我从零学会 Python」…）；工具行：+附件、Drive 集成、**工具**（popover：白板课堂 / 学习规划 两项，各带说明）、语音输出、**速度**（标准「经典模式，回答更全面」/ 快速「适合简短回复」）、发送；能力 chips：概念讲解（已升级）/ 个性化学习资料生成 / 长文件消化 / 问题求解 / 可视化（New）；「今日值得学 | 最新动态 | 换一批」新闻列表 5 条（dailyTrends）。（t108, seg-66-102）
- **[S11]** 版本更新弹窗（What's new v1.3.13，changelog 列表）。（walk 2–4s；seed/whatsnew_changelog.json）
- **[S12]** `/response/:conversationId` ChatResponsePage：主列用户消息气泡（右对齐灰底）→ 助手回答（Markdown + KaTeX 公式块 + 「概念讲解」标签卡 + 章节标题）→ 底部胶囊输入条（`session-input-bar`）；右侧浮层「掌握程度」反馈卡（评分点 + 跳过）；quiz 交互卡（选项按钮 A–D / 检查）；顶部 chrome：切换语言 / Share conversation / 遇到问题？。（walk-d 8–50s, walk 24–36s）
- **[S13]** `/response/course-generation/:courseUuid` 生成日志页：用户 query 气泡 →「正在搜索网络资料 ｜ 第 1 步，共 4 步 ✓」+ 查询词 + 来源链接卡（favicon+标题+域名，「还有 3 个…」）→「构思初步思路 ｜ 第 2 步 ✓」→ 问卷 Q1–Q4（多选/单选标签、选项标题+说明、「都不太对？写个自己的」、跳过 / 继续）→ 第 3/4 步结构与生成进度 → 课程完成。（craft2 0–30s, craft3/4）
- **[S14]** `/marketplace`：hero「发现最适合你的课程 / 专为你的学习方式打造。」、搜索框「在 Marketplace 中搜索课程」、「热门 · 编辑精选」大图 carousel（1 大 + 4 小封面，含 入门/进阶 + 课时徽标）、科目 tabs（全部/考试备考/数学与统计/计算机科学/AI 与数据科学/自然科学/商业与经济/心理学/哲学/社会科学/表达与写作）、分类标题+课程数+「排序方式 推荐排序」、4 列课程卡网格。（t116–t132）
- **[S15]** `/marketplace/:id/preview`：左列封面卡 + studio + 标题 + 描述（显示更多）+ 黑色「加入课程」按钮 + 「单元 | 资料 | 练习」tabs + 单元目录（编号列表）；右列「第 1 单元，共 N 单元」标题 + 描述 + 「上传材料，扩展这门课程」+ 进度图例（已掌握/熟练/熟悉/已尝试/未开始/项目/测验）+ 「这是新课程，请从这里开始」+ 讲次行（学习 / 练习 按钮 + 圆形状态）+ 项目/测验条目。（t140）
- **[S16]** 加入课程弹窗：标题「加入这门课程？」+ 课程名引号 + 说明 + 「课程语言 English | 中文」分段 + 「再想想 / 确认加入」。（t140）
- **[S17]** `/courses` 我的课程：标题 + tabs（全部/进行中/已完成）+ 搜索；课程行卡（课程名称+「新」徽标、来源、添加日期、封面、接下来讲次、进度条 0%、Share/More 图标按钮）；右列「本周 已学 0 个 session」周条 + 「从上次学到的地方继续」卡 + 「课程市场 / 查看更多」推荐 3 条（带预览按钮）。（t150）
- **[S18]** `/course/:id` CourseJourney：左列封面+studio+标题+描述（显示更多）+「退出课程」+ 单元/资料/练习 tabs + 单元列表；主列「单元 1：社会学视角」+ 描述 + 上传材料 + 状态图例 + 「下一步：单元 1 · 社会学想象力 ›」+ 讲次卡（讲次 1：社会学思考 → 4 个讲座行各带 学习 / 练习 + 状态圆点）+ 讲次 2/3 + 「开始」按钮 + 「社会学视角综合考试 / 开始」。（walk-b 100–116s, seg-150-164）
- **[S19]** `/whiteboard/:sessionId` 白板教学：左上标题「勾股定理：知识讲解」；画布区（PDF 页/板面，红色手绘标注，三角形图）；顶部工具条（缩放 100%、页码 1/1、播放/暂停/前后、录音/分享）；右侧「讲稿/对话」面板（讲解文本流）+ 底部输入「向老师提问…」；中央暂停卡「已暂停对话，请在右侧输入你的问题 / 继续讲」+ Orbie 形象。（walk-b 62–85s）
- **[S20]** 白板会话入口卡（`/response/:id` 中）：说明气泡 + 「勾股定理：边长边线的几何之路」板卡 + 「进入课堂」按钮 + 状态 chip「白板课堂」。（walk 36–57s）
- **[S21]** `/learning-feed`：左「今日 14 / 九月 2026」日期卡 + 今日待办列表 + 已完成；顶部 chips（已确认/待处理/…）+ 周/月切换 + 月历（事件 chip 彩色）+ Google Calendar 入口。（seg-163-193 tile1）
- **[S22]** `/history`：标题「历史」+ 搜索 + 「新建对话」+ tabs「对话 | 深度学习课堂」+ 会话行（标题 + 相对时间）。（seg-163-193 tile2–3）
- **[S23]** `/knowledge-base`：「个人知识库」+ 专业版徽标 + 搜索「我的天文学课件在哪？」+ 「新建」+ 文件夹面包屑「‹ 知识库」+ 文件卡（PDF 缩略 + 名称）；空态「未找到文件」。（t176）
- **[S24]** `/inbox`：「收件箱」+ tabs 消息/动态 + 空态「暂无消息」。（seg-163-193 tile6）
- **[S25]** 更多选项菜单（rail）：role=menu，项：知识库 …；头像菜单：订阅 / 邀请好友 / 推广赚佣金 / 设置 / 与我们保持联系 / 退出登录。（walk-d 88–92s）
- **[S26]** 设置弹窗（模态 `设置`）：左子导航（账户 / 订阅 / 偏好 / 记忆 / 通用 …）；账户面：用户名、邮箱、删除账号；订阅面：PRO 卡 + 管理 + 优惠码输入 + 兑换；偏好：语音/语言/通知开关；记忆：长期记忆/情景记忆/清除。（walk-d 92–110s）
- **[S27]** `/signin` `/signup` `/forgot-password` `/reset-password` `/onboarding`（语言/来源/学习身份三问 + 产品导览，seed/onboarding_questions.json + assets/img/onboarding-new/*.mp4）`/welcome-back` `/account-deleted`：按契约还原（无录屏证据，标 **契约来源**）。
- **[S28]** `/subscription` `/pricing` `/coupon-code` `/success`：plans 卡 + Stripe 入口（⛔ 不接真实支付，按钮落到 stub）。契约来源。
- **[S29]** `/share/c/:id` `/share/course/:id`：只读共享页。契约来源。
- **[S30]** `/course/:id/practice/:sid` `/exam/:unitId` `/project/:stageId`、`/pdf-session/:id`（SplitLayout）、`/deep-learn-session/*`、`/inbox/message/:id`、`/course-generation/log/:runId`：按契约还原，练习/考试题目与答案来自 seed/marketplace-full。

## 4. Interactions & animations
- **[D1]** 首页 hero 背景「dot field, cursor light」：点阵随指针出现光晕、缓慢漂移（walk 0–14s 可见点阵；实现 canvas 2D，pointer 耦合）。
- **[D2]** 首页 tab 切换 craft↔assist：内容淡入上移 ~200ms；hero 文案轮播每 ~4s 淡切；输入框 ghost 提示轮播（打字机式）。（seg-30-66 tile10–12）
- **[D3]** 工具 popover / 速度下拉 / 语言 listbox / 头像菜单：radix 风格弹出，缩放 0.96→1 + 淡入 150ms；Esc 关闭。（seg-30-66 tile12, seg-66-102 tile3, walk-d 88s）
- **[D4]** 集市「编辑精选」carousel：卡片 hover 上浮 2px + 阴影加深；封面渐变底。（t116）
- **[D5]** 科目 tab 切换：下划线滑动 + 网格内容替换（服务端筛选，见 B5）。（t122→t126）
- **[D6]** 课程卡 hover：箭头按钮变深、卡片轻微上浮。
- **[D7]** 加入课程弹窗：遮罩淡入 + 面板缩放；语言分段选中态。（t140）
- **[D8]** 聊天流式渲染：token 级追加、Markdown 增量、KaTeX 就绪后替换、右下「掌握程度」卡延迟浮现；quiz 选项选中态 + 判分反馈。（walk-d 12–45s）
- **[D9]** 生成日志页：步骤卡逐步出现（✓ 打勾动画）、来源卡 stagger 进入、问卷 stagger；进度条随 WS 帧推进。（craft2 5–30s）
- **[D10]** 白板：板面元素按讲稿时间线逐笔绘出（Excalidraw 风格路径动画）、讲稿高亮同步、暂停卡弹出/继续、Orbie 形象呼吸动画。（walk-b 62–85s）
- **[D11]** 骨架屏 shimmer（课程页/集市/知识库加载）。（seg-150-164 tile1, tile3–4 of tail）
- **[D12]** 学习动态月历：周/月切换滑动；日期选中高亮。
- **[D13]** 设置弹窗子导航切换：内容淡切。
- **[D14]** 侧栏「近期活动」折叠展开动画；rail 选中态过渡。

## 5. Backend design（接口流出 · BYOK 后补 key）
**架构**：单进程 Fastify（`hyperclone/server`，:8787）= REST `/api/v1/*` + WS 通道 + 静态托管 `app/dist`（SPA fallback）。存储：JSON 文件持久化 `server/var/data/*.json`（技能允许的 JSON 落盘方案；跨重启保持）。新前端 `app/`（React+TS+Vite+Tailwind v4+shadcn，web-replicate 脚手架）只吃 `/api/*` 与 WS。

**Entities**（与原站字段对齐）：user(id,username,email,tier,credits,language,onboarding)、subscription(tier,credits,reset_interval_hours=12)、conversation(id,title,created_at,frames[])、message/frame(type: thinking|tool_execution|content|complete|recommend_next_step)、course(uuid,title,description,studio,level,hours,units[],lessons[],exams[],practices[],projects[],language)、enrollment(user,course_uuid,language,progress)、marketplace_course(33 seed)、generation_run(run_id,course_uuid,query,steps[4],questions[],answers,status,log[])、whiteboard_session(id,title,boards[],script[],pdf_file_id,state)、deep_learn_session、pdf_session、calendar_task(id,course,scheduled_for,status)、memory(profile,ops[])、drive_file/folder(quota bytes)、inbox_message、daily_trend、whatsnew、share(conversation|course)、artifact(diagram/file/video 公开件)。

**API（保留原站路径，全部流出）**：auth：`register/login/login_refresh/get_user_info/other_function_usage_limits/delete_account/auto_token/byok`；subscription：`check_user_subscription/redeem_coupon`，stripe：`plans`（其余 stub）；conversation：`data/property/share/artifact`，`dailyTrends`，`upload_file`；courses：`courses/{uuid}`、`marketplace`、`marketplace/{id}/preview`、`enroll`（409 幂等）、`structure(edit/regenerate/undo)`、`generation-log/{run_id}`、`generation-feedback`、`course-calendar config/draft/accept`、`exam`+`exam/score`、`practice`+`check-fill/assistant/progress/tts`、`project stages/steps/submission`、`canvas-updates`；memory：`get_profile_memory/apply_memory_ops/get_memory_management/clear_stored_memory`；inbox：`usr-msg-inbox/get_message/mark_read`、`get_banner_message`；drive：`get_drive_data/create_folder/delete/upload_file_to_drive/add_file_to_calendar`；deep-learn/whiteboard/pdf-annotation sessions REST；公开制品 `diagram/{id}.{md,html}`、`files/{id}`、`video/{id}/final_video.mp4`、audio-stream。WS：`/api/v1/ws`（主聊天）、`/course-generation/ws`、`/whiteboard/ws`、`/pdf-annotation/ws`、`/deep_learn/ws`、`/drive/ws`、`/net-check/ws`。帧形状以 `spec/PROTOCOL.md` + `evidence/ws_frame_types.json` 为准。

**Provider seams（key 后补，缺 key 走 stub 闭环）**：`server/src/config.ts` → `providers.{llm, tts, stt, search, image}`，env：`LLM_BASE_URL/LLM_API_KEY/LLM_MODEL_*`、`TTS_API_KEY`、`GENERATE_API_KEY`（生图/视频）、`SEARCH_API_KEY`；每个 seam 一个接口文件 `server/src/providers/<seam>.ts`（`resolve()`→ real | stub），REST `GET/PUT /api/v1/auth/byok` 按用户覆盖。

**Agent core（dsh）**：`agent-runtime/`（DeepSeek Harness 0.1.5-rc.2，独立 DSH_HOME，profile `betterknow`）。后端 `server/src/agent/dsh-adapter.ts`：把 `user_message` 转成 headless 任务（`bin/bk-agent`），把 stderr 推理流/stdout 答复映射为 `thinking/content/complete` 帧；工具面以自研 dsh 插件挂上（`course-generation`、`whiteboard-teach`、`deep-learn`、`materials`、`plan-calendar`、`kb-drive`）。无 LLM key 时 adapter 回退 stub 帧序列（离线闭环）。

**提示词还原（先还原再补研）**：`hyperclone/seed/prompts/directorAgent_system_prompt.md`（主聊天 director）、`reference/assets/prompts/*`（deep-learn 教师、pdf 教师行为、白板教师行为、deep-learn 会话行为、6 skills 指纹）、`seed/skills_registry.json`（触发/问题轴/工具链）、`seed/tools_registry.json`（28 工具：模型/输出键/guideline）。课程生成 6 相位 prompt 组在 `server/src/pipelines.ts`；缺失部分（问卷生成、结构生成、讲次内容、练习/考试出题、白板讲稿+板面）按 `evidence/course_generation_trace.json`、`generation_log_full.json`、`deep_learn_fourier_full.json`、`pdf_teaching_trace.json` 的真实输出反推设计，落 `server/prompts/*.md`。

**Seed**：33 门集市课（`server/seed/marketplace-full`）、dailyTrends 50 条、whatsnew 14 版、onboarding 问卷、社会学概论示例报名 + 示例会话（贝叶斯定理解释与测试）+ 示例白板会话（勾股定理）+ 示例知识库 PDF（Pythagorean_Theorem_Note.pdf）+ 示例日历任务 —— 与录屏中账号状态一致。

## 6. Backend behaviors
- **[B1]** 登录态 + 用户信息：`GET /auth/get_user_info` 提供 PRO 徽标/积分 64→63（发问后扣 1，walk-d 8s vs 后续 63）；刷新后仍为 63。
- **[B2]** 即时协助发送 → `conversation_created` → `/response/{id}`；会话持久化：侧栏「近期活动」与 `/history` 列表新增「贝叶斯定理解释与测试」，整页刷新仍在。（walk-d 8–50s；history 列表）
- **[B3]** 回答帧持久化：重开 `/response/{id}` 可回放完整回答（walk 24–36s 回放旧会话「条件概率与贝叶斯定理」）。
- **[B4]** 积分扣减规则：assist 1、课程生成 10（chip「10」）、材料 3；余额 0 拒绝（other_function_usage_limits）。
- **[B5]** 集市科目筛选与排序为服务端查询：`GET /marketplace?subject=数学与统计` 返回 5 门（t122）；全部 33 门；排序推荐。
- **[B6]** 课程预览数据：`GET /marketplace/{id}/preview` 提供单元/讲次/练习/项目/测验结构（t140 Digital SAT 9 单元）。
- **[B7]** 加入课程：`POST /enroll {course_uuid,language}` → `/courses` 出现课程卡（新徽标、添加日期、0%）；重复加入 409；刷新仍在。（t140→t150）
- **[B8]** 课程结构/进度：`GET /courses/{uuid}` 单元、讲次、状态圆点；`progress` 客户端权威写回后刷新一致。（seg-150-164）
- **[B9]** 课程生成运行：`start_course_generation` → run（4 步：搜索资料→构思→结构→生成）持久化 `generation-log/{run_id}`；问卷答案 `course_generation_answers`；完成后课程出现在 `/courses`；离开页面再回来可恢复进度。（craft2/3/4）
- **[B10]** 白板会话：`create_board_session` → 会话持久化（近期活动可再进入，`进入课堂` 后板面/讲稿从服务端加载）。（walk 36–57s, walk-b 62–85s）
- **[B11]** 知识库：`get_drive_data` 返回文件夹树与 PDF 文件（Pythagorean_Theorem…）；`create_folder/upload/delete` 落盘；quota 计量。（t176）
- **[B12]** 学习动态：日历任务来自 `course-calendar` / calendar task CRUD；今日待办 = 当天任务；确认/待处理状态服务端保存。（seg-163-193 tile1）
- **[B13]** 收件箱：`usr-msg-inbox/get_message` 空态与分页；`mark_read`。
- **[B14]** 语言设置持久化：切换语言 listbox → `ui_language` 保存到用户（实测切到 한국어 后所有页面与后续会话均为韩文，切回 简体中文 恢复）。
- **[B15]** 设置弹窗：账户信息读写、记忆管理（get_memory_management/clear）、订阅状态（check_user_subscription）、优惠码校验拒绝面。
- **[B16]** What's new：`whatsnew` 版本列表来自服务端 seed；版本号 v1.3.13。
- **[B17]** dailyTrends：「今日值得学」5 条 + 「换一批」轮换来自 `GET /dailyTrends`。
- **[B18]** 分享：`conversation/share` 生成 `/share/c/{id}` 只读页；课程分享 `/share/course/{id}`。
- **[B19]** BYOK 与 provider seam：`GET/PUT /auth/byok`；缺 key 时 llm/tts/search/image 走 stub 且接口形状不变（可 curl 验证 `POST /auth/byok/test`）。

## 7. 美术资源计划（不复制原站插画）
- **grok 生图**（`grok -p … --always-approve --output-format json`，落 `app/public/assets/gen/`，记录 prompt+路径于 `out/assets.jsonl`）：课程封面插画 33 张（线描+单色底，主题各异）、编辑精选大图 6 张、Orbie 吉祥物 3 态（问候/加载/思考）、onboarding 场景插画 4、空态插画（课程/收件箱/知识库/历史）、白板背景纹理、PDF 示例页。
- **agy SVG**（`agy -p "…" --dangerously-skip-permissions`）：rail 图标集 6、工具/能力 chip 图标 12、状态图例圆点 7、进度图例、logo 字标。
- 字体：Satoshi/EB Garamond/MiSans 回退（`reference/assets/fonts` 作本地开发引用，交付前按授权替换/子集化）。

## 8. 验证计划
- `[S]`：ego 打开 `localhost:8787/<route>` 截图与源帧并排（ffmpeg hstack）→ diffs 列表。
- `[D]`：CDP screencast 录成 mp4 → 节拍帧并排源 clip。
- `[B]`：curl 叉 + ego 旅程叉（操作 → 跨整页 reload → snapshot 断言）。
- 覆盖扫描 COV1：重读 12 帧接触表找未标记入口；契约扫描 C1：`grep /api/` ↔ curl。

## 9. 覆盖扫描补标签（Phase 4.4 COV1，2026-09-15）
- **[S31]** 首页 hero「使用 ▶Hyperknow 打造你的专属课程」中的品牌动画为 `<video>`（Orbie 字标动效）；本轮以图标 + 呼吸动画占位，待 grok image_to_video 出片。（walk 0–14s）
- **[S32]** 右上头像为 Orbie 插画头像；本轮为字母圆形占位，待 grok 生成。（t108）
- **[S33]** 集市/课程封面全部改为 grok 线描插画（不复制原站图）；`GET /api/v1/marketplace/cover/:id` 服务生成图，缺失回退占位 SVG；进度见 `out/assets.jsonl`。
- [S34] {detail} {footage} asset=loading.gif source clip 0.0–2.0s: 通用全局加载等待指示
- [S35] {detail} {footage} asset=onbaording-new-1.mp4 source clip 0.0–3.0s: Onboarding 导览动画 1
- [S36] {detail} {footage} asset=onboarding-new-2.mp4 source clip 0.0–3.0s: Onboarding 导览动画 2
- [S37] {detail} {footage} asset=onboarding-new-4.mp4 source clip 0.0–3.0s: Onboarding 导览动画 4
- [S38] {detail} {footage} asset=orbie-loading.mp4 source clip 0.0–2.5s: 响应页 Orbie 加载动效
- [S39] {detail} {footage} asset=char-complete-standing.mp4 source clip 0.0–3.0s: 任务完成吉祥物站立
- [S40] {detail} {footage} asset=char-floating.mp4 source clip 0.0–3.0s: 浮动角色微动效
- [S41] {detail} {footage} asset=char-petting.mp4 source clip 0.0–3.0s: 抚摸互动动画
- [S42] {detail} {footage} asset=char-reward-pop.mp4 source clip 0.0–2.0s: 奖励弹出角色动画
- [S43] {detail} {footage} asset=char-stars.mp4 source clip 0.0–2.5s: 星星庆祝动画
- [S44] {detail} {footage} asset=climb-stairs.mp4 source clip 0.0–3.0s: 课程进阶爬楼梯动效
- [S45] {detail} {footage} asset=reward.mp4 source clip 0.0–2.0s: 里程碑奖励动效
- [S46] {detail} {footage} asset=tips.mp4 source clip 0.0–2.5s: 课程小贴士吉祥物微动效
- [S47] {detail} {footage} asset=orbie-greeting.mp4 source clip 0.0–3.0s: 首页与导览 Orbie 问候动画
- [S48] {detail} {footage} asset=planet-animate.mp4 source clip 0.0–3.0s: 行星轨道动画
- [S49] {detail} {footage} asset=welcome-back.mp4 source clip 0.0–3.0s: 欢迎回来页面动画
- [S50] {detail} {footage} asset=running-w-background.mp4 source clip 0.0–3.0s: 白板跑步背景动画

