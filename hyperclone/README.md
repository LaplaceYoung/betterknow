> ## 开放模式（2026-09-03）：无登录墙、无积分闸门
> - 服务端内置单一开放用户 `local-open-user`（tier=pro、credits 恒定 999999）；所有 REST 401 面移除，WS 无 token 也落开放用户；register/login/login_refresh 任意输入即发令牌；`GET|ALL /api/v1/auth/auto_token` 供前端自取。
> - 前端：`public/index.html` `<head>` 首行同步 XHR 自取令牌（无 token 才拉）；assemble-frontend.mjs 会保持该注入幂等。
> - 额度端点统一回报 Pro/999 上限；chat 不再扣费；delete_account 对开放用户禁用。

# Hyperclone

Hyperclone 是 Hyperknow 的本地可运行复刻：React/Vite 前端、Fastify 后端、JSON 文件持久化，以及三条与原站帧形状兼容的 WebSocket 通道。所有模型调用均走 BYOK；没有密钥时自动使用仓库内固定 stub 数据，保证离线闭环。

## 架构总览

```text
web (5173) ── REST /api/v1/* ──┐
             WS                ├─ server (8787) ── var/data/*.json
             /ws                │
             /whiteboard/ws     │
             /course-generation │
```

### 前端页面地图

- `/`：Home，最近活动、快捷入口、Marketplace 推荐
- `/courses`：Your Courses，课程状态筛选与课程卡片
- `/marketplace`：课程发现、分类筛选、搜索与课程预览
- `/learning-feed`：学习日历、今日待办与完成项
- `/history`：历史会话
- `/knowledge-base`：个人知识库
- `/inbox`：消息与更新
- `/onboarding`：语言、来源、学习身份问卷及产品导览
- `/whiteboard/:sessionId`：课程白板教学会话
- `/settings/*`：账户、偏好、记忆、订阅、优惠码、通用设置

### WebSocket 三通道

1. **对话**：`/ws?conversation_id=&token=`，发送 `user_message`，接收 thinking/tool/content/complete 帧。
2. **白板**：`/whiteboard/ws?access_token=`，处理课程会话、板面、讲义大纲、TTS 与暂停/插话。
3. **课程生成**：`/course-generation/ws?access_token=`（以及 `/course-generation/update`），处理研究、课程结构、问卷、确认和完整课程对象。

帧字段与客户端事件以 [`spec/PROTOCOL.md`](spec/PROTOCOL.md) 为准，不在页面代码中另造协议。

### agentLoop

对话服务按 `think → (get_skills/memory/search) → 内容或动作工具 → mark_response_complete → recommend_next_step` 运行。没有有效产出时最多重试约 15 轮，再返回 stub/降级内容；`speed_mode=fast` 会跳过记忆、提问、搜索文件、内容规划等工具并直接生成快速回答。工具注册表与六个技能指纹位于 [`seed/skills_registry.json`](seed/skills_registry.json)。

## BYOK 配置矩阵

| `BYOK_PROVIDER` | 端点 | Key 环境变量 | 模型环境变量 | 行为 |
|---|---|---|---|---|
| `kimi`（默认） | `https://api.moonshot.cn/v1` | `KIMI_API_KEY` | `KIMI_DIRECTOR_MODEL`, `KIMI_CONTENT_MODEL`, `KIMI_QUIZ_MODEL` | 使用 Moonshot OpenAI-compatible API |
| `openai-compatible` | `OPENAI_BASE_URL` 或 `KIMI_BASE_URL` | `OPENAI_API_KEY` | 同上（或服务端默认值） | 使用任意 OpenAI-compatible 服务 |
| `stub` | 无 | 无 | 无 | 使用仓库固定应答，离线可运行 |

也可设置 `KIMI_BASE_URL` 覆盖 Kimi 端点。服务端配置保持 `provider`, `apiKey`, `baseUrl`, `models.{director,content,quiz,tts?}` 形状；禁止加入 GPT/Claude 专属分支。无 key 时即使 provider 未显式设置，也应降级为 `stub`。

## 安装、开发、构建、启动

要求 Node.js 20+ 与 npm（或 Bun）。在项目根目录执行：

```sh
cd hyperclone
npm install --prefix server
npm install --prefix web
```

开发时分别启动后端和前端（两个终端）：

```sh
npm run dev --prefix server   # Fastify :8787
npm run dev --prefix web      # Vite :5173，代理 API/WS 到 :8787
```

生产构建与启动：

```sh
npm run build --prefix web
npm run build --prefix server
npm run start --prefix server
```

后端启动后访问 `http://localhost:8787`；开发前端访问 `http://localhost:5173`。生产模式由 server 托管 web 的 `dist`（具体静态目录以 server 配置为准）。首次启动会在 `server/var/data/` 创建 JSON 数据文件；不要把密钥写入 seed 或提交到版本库。

## 能力对比

| 能力 | Hyperclone 状态 | 与原站差异/降级 |
|---|---|---|
| 注册、登录、用户信息、额度 | 已实现核心闭环 | 本地 JWT/JSON 数据，不连接原站账户 |
| 对话 WS 与 agentLoop | 已实现协议帧与 stub 闭环 | stub 无真实检索/生成质量；BYOK 后由 Kimi 生成 |
| 白板 WS | 已实现会话、板面和暂停/插话基础帧 | 复杂实时教学/TTS 以可用 mock 状态降级 |
| 课程生成 WS | 已实现启动、问题、进度、确认和课程结果 | 研究结果与课程内容可由 stub 固定返回 |
| Marketplace | 已实现列表、预览、报名核心 REST | 使用 `seed/marketplace_courses.json`，不含原站支付/社交状态 |
| 日历、记忆、Drive、分享、图表、订阅 | 已实现核心 REST mock | 本地持久化；公开制品仅模拟原站可读行为 |
| 页面导航、onboarding、设置、历史 | 已实现页面骨架与关键交互 | 未复刻原站私有分析、邮件、计费后台 |
| 多语言 | 已接入仓库 i18n 资源 | 语言覆盖随页面实现进度；无远端翻译服务 |

## 安全说明

- `seed/prompts/directorAgent_system_prompt.md` 是从证据资产本地化的提示词，不在运行时从原站拉取；`seed/skills_registry.json` 只保存可观测的技能触发/问题轴，不包含秘密服务端实现。
- 提示词和 seed 数据属于应用资产，部署时应按内部资产处理；不要把 API key、用户文件、JWT 或真实会话写入这些文件。
- BYOK key 仅通过服务端环境变量注入，前端不应读取或持久化；日志中不得打印 Authorization、query token 或完整提示词。
- 本地 mock 的公开文件/分享接口仅用于复刻行为，生产部署前必须加鉴权、访问控制和速率限制。
- 协议事实源、证据和原站资产仅供复刻验证；不得将本地实现误认为 Hyperknow 官方服务。

## Seed 数据
> ## 2026-09-03 收口说明
> - 静态资产：513 项引用 0 缺失（字体 878 文件含 KaTeX/Assistant/Virgil/Xiaolai 分片、onboarding 84 文件、images 全量）。
> - WS 通道 7/7 条（新增 deep_learn/drive/net-check；pdf 导读 speak/annotation/ask/done 全相；语音全双工 interject cascade + interject_pcm；白板扩展帧）。
> - REST：marketplace 33 门课 52.8MB 灌入 seed（enroll 409 幂等、check-fill (sessionId,questionId) 配对判分、exam/score 客户端权威记账、progress/structure/state 全链）。
> - 管线：`src/pipelines.ts` 课程 6 相位 prompt 组 + 视频（ffmpeg 真渲染 mp4，finder 探测降级）+ publish_file 纯 TS PDF + `sandbox.ts` 真执行沙箱 + `cron.ts` credit 12h 重置。
> - BYOK 扩展位：`providers.{tts,stt,search,image}` 空置待钥，见 config.ts。
> - 验证：`scripts/smoke_seed.mjs`、`smoke_ws2.mjs`、`smoke_pipelines.mjs`、`smoke_e2e.mjs` 四件全 PASS。

- `seed/marketplace_courses.json`：从第四轮 REST 证据完整提取的 33 门原始课程对象。
- `seed/daily_trends.sample.json`：`dailyTrends` 原文的 US 区域趋势样本。
- `seed/onboarding_questions.json`：从 onboarding 截图文字提取的语言、来源和学习身份问卷，统一为 `{step,title,options:[{label,subtext}]}`。
- `seed/prompts/directorAgent_system_prompt.md`：directorAgent 提示词原样副本。
- `seed/skills_registry.json`：六个可观测 skill 的触发条件、问题轴和后续工具链。

## 像素级复刻说明（最终态）

两套前端并置：
- **server/public/**（推荐）：原站生产 chunk 完整镜像（122 JS + 49 CSS + 257 图 + 605 字体二进制 + onboarding 4 语言 TTS 语音与 Orbie 动画），API/WS 端点常量已改写为同源 → 开箱即「原站前端 × 本地 BYOK 后端」，像素与交互天然一致。
- **web/**：许可友好的等界面自写实现（React+Vite，单人可读可改）。

parity 证明见 hyperclone/verify_*.png 截图：注册/onboarding/首页/即时对话（问答+quiz 交互卡+推荐步）/课程生成 4 步向导/白板授课（Excalidraw+TTS）/深学会话全链路在本地 stub 或 BYOK Kimi 下跑通。

已知取舍：
- Google/Canvas OAuth 外联不复制（原站 Supabase 域名将继续被调用，本地宿主下仅失败静默）。
- 视频合成管线（Remotion+Manim）以帧协议与端点形状 mock 返回，真实 ffmpeg 合成器未实现。
- TTS 的 webm 音频以占位字节返回；本地演示推荐浏览器 SpeechSynthesis 后备。
## BYOK 配置界面（/byok/）

- 页面：`http://127.0.0.1:8787/byok/`（登录后访问），供按用户配置 provider（Kimi/OpenAI 兼容/Stub）、Base URL、API Key、Director/Content 模型，附保存/读取（掩码回显）/测试连接/清除。
- REST：`GET|PUT|DELETE /api/v1/auth/byok` + `POST /api/v1/auth/byok/test`（对所选 base_url 真发一次模型请求并回 latency/status）。
- 生效路径：WS 三通道所有 LLM 调用（director/content/quiz/白板/深学/课程）均按当前用户 BYOK 覆盖解析，未配置走全局 env；env 优先级 `KIMI_API_KEY || AIGW_API_KEY`、`AIGW_BASE_URL || KIMI_BASE_URL`。
- **aigw 接入**：给服务端一个 OpenAI 兼容地址即可：`AIGW_BASE_URL=<你的 aigw 网关> AIGW_API_KEY=<key> npm start`，或在 /byok 页面按用户填 kimi-k3 模型名 + 你的网关 URL。

## 脱钩说明

运行时不再向任何 hyperknow 域（agent/api/dev-api/service、mcpbxxrodqgsmatssajx.supabase.co）发请求：`scripts/assemble-frontend.mjs` 把引用全部重写为本机 `/sb-stub`（仅保留邮箱文本）。第三方分析（Clarity/GTM/dub/apollo）保留了原代码但只影响体验遥测；要彻底干净，可删 index.html 中 cloudflareinsights beacon 标签。
