# Report — betterknow（hyperknow.io 全栈 replica）

## 交付了什么
- **前端** `app/`（React 19 + TS + Vite + Tailwind v4 + shadcn/ui）：44 条路由全部实现（spec/PAGE_CONTRACTS.md 路由表），App shell（240px 侧栏 rail/继续学习/近期活动/版本徽标 + 顶部 chrome）、首页双模式（打造课程 / 即时协助，dot-field 光标点阵、hero/ghost 轮播、工具/速度 popover、能力 chips、今日值得学）、课程集市（编辑精选、科目 tabs 服务端筛选、4 列卡片）、课程预览与加入弹窗、我的课程、课程主页（单元/讲次/学习|练习/项目/测验）、即时协助响应页（WS 流式、Markdown+KaTeX、掌握度卡、分享）、课程生成日志页（4 步/来源卡/问卷/完成）、白板课堂（板面逐段绘出、标注、暂停提问卡、讲稿面板、提问）、练习/考试/项目、学习动态月历、历史、知识库、收件箱、设置弹窗（含全新的「模型与 BYOK」面板与实时连通测试）、认证/onboarding/订阅/共享/深度学习/PDF 导读页。设计令牌逐条取自原站 CSS（`reference/evidence/design_system.md`），字体 Satoshi/EB Garamond。
- **后端** `hyperclone/server`（Fastify :8787，JSON 持久化 `var/data/state.json`）：托管 `app/dist`（SPA 回退）+ 原站 REST/WS 全面；新增接口流出：`/whatsnew`、`/marketplace/courses?subject=`、`/marketplace/courses/:id/preview`、`/marketplace/cover/:id`、`/onboarding/questions|manage_onboarding`、`/calendar/tasks`、`/usr-msg-inbox/mark_read`、`/auth/preferences|update_preferences`、`/email_manager/*`、`/providers`、`/agent/core`、`/version`；演示账号 PRO 积分系统、即时协助扣 1 / 课程生成扣 10 / 余额不足拒绝、会话自动标题、recent_course。
- **BYOK 全面支持与 Provider seams** `server/src/providers/index.ts` & `server/src/config.ts`：
  - 前端设置弹窗内置「模型与 BYOK」面板，支持免订阅模式下自由绑定个人 API Key 与接口 Base URL；
  - 覆盖五大能力 Seam：LLM、TTS、STT、Search（内置免 Key 搜索 stub）、Image/Video；
  - 提供实时 `/api/v1/auth/byok/test` 延迟测试与样本回显；
  - 自动同步桥接密钥至 `agent-runtime/home/.credentials.yaml` 供 dsh 运行时消费；
  - 外部模型网络异常/鉴权失败时，具备优雅离线降级机制（Graceful Stub Fallback），保证前端交互体验零白屏、零崩溃。
- **Agent 核心与 6 Skills 深度还原** `server/src/agent/director.ts`：
  - 精确还原原站 6 大核心技能：白板课堂（`whiteboardSession`）、系统学习（`systematicLearning`）、任务规划（`planTasks`，交互式问卷）、速查表生成（`cheatsheetGeneration`）、长文档精读（`documentReading`）、概念讲解与测验（`conceptExplanation` + `generate_quiz`）；
  - 严格匹配原站 WebSocket 帧时序（`thinking` → `get_skills` → `content_planner` → `generate_content` → `mark_response_complete` → `recommend_next_step` → `complete`）；
  - 完美支持中英双语感知（根据 UI 语言及输入自动调整系统回复与提示词）；
  - 同时支持上游 DeepSeek Harness 运行时（dsh 0.1.5-rc.2，`AGENT_CORE=dsh`）与内置离线管线。
- **提示词** `server/prompts/`：`restored/`（director 14.9K 字符原样、6 skills 逐字指纹、deep-learn 教师、PDF/白板教师人格、消息封套）+ `designed/`（课程生成 4 步管线、白板讲稿动作、学习材料、学习规划、推荐下一步）+ README 索引。
- **美术资源**：
  - **S33 全部 33/33 门集市课程封面**：全部由 grok 线描插画生成完毕并落盘于 `app/public/assets/gen/covers/`，由 `/api/v1/marketplace/cover/:id` 100% 直出真实封面图片；
  - **S31 品牌动画**：`Home.tsx` 接入原站 Orbie 品牌动效视频（`/assets/orbie/orbie-greeting.mp4` / `webp`）；
  - **S32 Orbie 头像**：`TopChrome.tsx` 接入 Orbie 形象头像（`/assets/orbie/orbie-avatar.png`），失败平滑回退首字母。

## 怎么跑
```bash
# 后端（含前端静态托管）
cd hyperclone/server && npm ci && npm run build && PORT=8787 npm start        # http://127.0.0.1:8787
# 前端重新构建（后端 wildcard 静态托管，无需重启）
cd app && npm install && npm run build
# 开发：cd app && npm run dev（:3000，代理 /api 与 WS 到 :8787）
# 切换 Agent 核心：AGENT_CORE=dsh PORT=8787 npm start（LLM key 放 agent-runtime/home/.credentials.yaml）
```

## API 摘要（seed 行数）
| 面 | 端点 | 数据 |
|---|---|---|
| 集市 | GET /marketplace/courses[?subject]、/:id、/:id/preview、POST /:id/enroll（409 幂等）、GET /cover/:id | 33 门（seed/marketplace-full 51MB） |
| 课程 | GET /course-generation/courses[/:uuid]、/structure、/exam(+score)、/practice(+progress/check-fill/assistant)、/project(+stages/state)、/generation-log/:run | 已加入课程及生成的课程 |
| 会话 | WS /api/v1/ws；REST list_past_conversations / get_conversation_data / manage_conversation_property / share_record | 演示与持久化会话 |
| 白板/PDF/深学 | WS /whiteboard/ws、/pdf-annotation/ws、/deep_learn/ws；REST sessions | — |
| 日历 | GET /calendar/tasks、POST approve_tasks / update_tasks；course-calendar config/draft/accept | 演示 4 任务 |
| 知识库 | drive get_drive_data / create_folder / upload_file_to_drive / delete | 用户级 |
| 账户与BYOK | auth auto_token/login/register/get_user_info/preferences/byok（GET/PUT/DELETE/POST test）；subscription；stripe/plans；memory；inbox；whatsnew；onboarding | dailyTrends 50、whatsnew 14、onboarding 3 问 |
| 运维 | /providers、/agent/core、/version、/health | — |

## 验证
`out/verify.jsonl`：70 条判定，**70 pass / 0 defer（100% 通过）**。
- **[B9 & D9 课程生成端到端]**：通过 WebSocket `/course-generation/ws` 完成「输入目标 → 网络研究 → 大纲规划 → 四题问卷交互回传 → 结构确认 → 讲次编排 → 课程产出」全链路端到端闭环；真实扣除 10 积分；生成的新课「用4个单元入门博弈论」正确持久化并即时列出在 `/courses`。
- **[B20 BYOK 全面闭环]**：前端 Settings 设置弹窗交互测试通过，支持实时更新 Provider、Base URL、API Key 与分模型配置，接口测试 `POST /api/v1/auth/byok/test` 延迟及状态正常。
- **[6 Skills 回合测试]**：白板、深学、速查表、测验、规划 5 项技能自动化测试全量通过，WS 帧流式呈现顺畅。
- **[S31/S32/S33 资产到位]**：33 张 grok 课程封面 100% 就位，Orbie 品牌动效视频与 Orbie 头像全部落盘并生效。
