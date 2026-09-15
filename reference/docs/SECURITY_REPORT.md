# Hyperknow(agent.hyperknow.io)安全检查报告

- 检查时间:2026-09-02
- 检查方式:**被动评估**(仅公开信息与本人已登录会话的自有流量),未做任何主动利用、爆破、注入测试
- 方法:参照本地 Claude-Code-CyberSecurity-Skill(01-recon-osint / 02-vulnerability-scanner)+ Web 应用安全检查清单 + JS 逆向(bundle 静态分析)

## 总体结论

整体水位**中上**:核心 API 全线鉴权(401),dev 环境与文档端点均锁死,无高危密钥泄漏。主要短板集中在**浏览器侧安全响应头缺失**与**令牌存储方式**。

## 发现明细

### 🟠 中危

**1. 安全响应头全线缺失(主站)**
- 200 页面仅 `server: cloudflare` + `x-powered-by: Express`,**无 CSP / HSTS / X-Frame-Options / Referrer-Policy / Permissions-Policy**
- 后果:无 CSP → 任何 XSS 都会直接执行;无 frame 保护 → 可被 clickjacking
- 证据:`curl -sIL https://agent.hyperknow.io/onboarding/`

**2. 认证令牌存于 localStorage,可被 XSS 直接窃取**
- `access_token`(1299 字符 JWT)、`refresh_token`、`token_timestamp`、`sb-mcpbxxrodqgsmatssajx-auth-token`(Supabase 会话)
- 与发现 1 叠加后果放大:无 CSP 的 SPA + localStorage 令牌 = 一次 XSS = 账号全接管
- 建议:改 HttpOnly + Secure + SameSite cookie,或至少叠加严格 CSP

**3. 营销追踪 cookie 无 Secure 标志**
- `_ttp`/`ttcsid`(TikTok)、`_fbp`(Meta)、`_clck`/`_clsk`(Clarity)均 `Secure:false`
- 低风险数据,但反映 cookie 设置策略宽松

### 🟡 低危 / 提示

**4. 攻击面:子域众多**
- CT 证书透明度:`api / app / beta-api / canvas-test / dev-api / go / kol / mobile / qr / service / status / testsuite`
- `dev-api.hyperknow.io` 公网可达(200),虽鉴权齐全(401),但 dev 环境在公网本身就扩大攻击面
- `testsuite.hyperknow.io` 401 ✓;`beta-api`、`canvas-test` 当前不可达

**5. 生产构建携带开发调试页面**
- `SimulateProSuccess-*.js`、`SimulateValidation-*.js`(支付成功/校验态模拟页)代码级核实:**仅 UI 演示,不授予真实权益**,无实际越权
- 建议从正式构建中剔除,避免误导后续安全审计

**6. 信息泄漏响应头**
- `x-powered-by: Express`、`x-render-origin-server: Render` 泄露后端栈;后端 Express 托管于 Render,前置 Cloudflare

### ✅ 良好

- **API 鉴权严格**:未授权访问统一 401(`Authorization header missing or invalid`);`/docs`、`/openapi.json` 均需鉴权(prod 与 dev 同样)
- **无硬编码高危密钥**:主 bundle(2.4MB)仅有 Supabase **anon** key(设计上公开,安全依赖 RLS,未发现 `service_role` 泄漏);无 Stripe 私钥、无云厂商密钥
- TLS 正常(Google Trust Services,90 天证书);HTTP→HTTPS 301/308 强制跳转
- CF 全套:`__cf_bm` bot 管理 cookie 标志正确(HttpOnly/Secure/SameSite=None)

### 附录:API 攻击面地图(68 个端点,分页/连接器/支付类)

关键类目:auth(登录/注册/token 刷新)、stripe(checkout/change_plan/coupon)、connectors(Canvas LMS、Google Calendar)、memory、drive、marketplace。`POST /api/v1/subscription/redeem_coupon`、`/partner-code/redeem` 等兑换类端点建议关注速率限制与重放——本次未做主动测试。

完整清单存档于扫描结果(`/tmp/hk_js/` 内 bundle 提取)。


## 第二轮:授权深度逆向与 Agent 探测(2026-09-02)

范围:自有账号令牌 + 自有会话,方法:静态 bundle 逆向(122 个 chunk 全下载)+ 实时通道帧分析 + 单条探针消息。未做批量注册/暴力枚举。

### Agent 架构还原(完整)

**三通道 WS 架构**(wss://api.hyperknow.io):
| 通道 | 端点/场景 | 客户端→服务端消息 |
|---|---|---|
| 即时对话 | `/api/v1/ws?conversation_id=&token=` | `user_message`, `save_artifact`, `stop_generation` |
| 白板授课 | Whiteboard 会话 | `start_session`, `interject_question`(含 audio_b64/PCM 实时语音打断), `set_tts_config`, `model_probe` |
| 课程生成 | CourseJourney | `start_course_generation`, `course_generation_answers`, `course_structure_confirm` |

**服务端 agent 是一个编排循环**(从 WS 帧还原):
```
user_message → directorAgent(思考) → tool_selection → tool_execution → mark_response_complete
```
- `mark_response_complete` 是硬校验器:必须先产出内容(generate_content / generate_quiz / generate_flashcards / generate_html_animation / generate_instructional_video / create_deep_learn_session / create_board_session / publish_file)才能收尾——否则循环重试(实测 15 轮后降级为兜底话术)
- 尾随工具 `recommend_next_step` 给出下一步建议卡片

### 🟠 新增发现

**7. WS 把 Agent 内部执行轨迹全量喂给前端(信息泄漏 / LLM02)**
- 帧内裸奔:`tool_selection` / `tool_execution`(工具名、轮次、内部错误原文)、**`model_used: "gemini-3-flash-preview"`**(模型身份)、`credit_status`(余额)、标题生成器等内部事件
- 后果:攻击者获得精确的工具链/模型指纹,可定向构造注入;工具报错文本逐字含校验规则(部分指令泄漏)

**8. 单条消息驱动资源放大**
- 一条被规则拦截的消息触发 **15 轮**内部 LLM 循环;无 hysteresis。配合 9 可被用作低成本消耗手段

**9. 注册与密钥端点未见防滥用机制**
- 注册全程无验证码;`/api/v1/subscription/redeem_coupon`、`/partner-code/redeem` 属撞库/枚举高危端点,未在被动观察中发现 429 或锁定行为(未做主动压测验证)
- 建议:注册/兑换端点加验证码 + 严格限流 + 指数退避

**10. WS token 走 URL query**
- `?token=<JWT>` 会被中间代理/访问日志记录;改 `Sec-WebSocket-Protocol` 或首帧鉴权消息更稳

### 提示词提取测试(LLM02 主动探针)
- 直接要求逐字输出系统指令 → **被拦截**:agent 循环尝试 `mark_response_complete` 被校验器逐次拒绝,最终降级为兜底输出,系统提示词**未泄漏**
- 防护机制有效,但过程可视化(发现 7)本身即是一种泄漏面

### API 架构补充
- REST:`api.hyperknow.io/api/v1/*`(68 端点全量清单已提取),Bearer JWT;`/docs`、`/openapi.json` 均需鉴权
- 直连 WS 时空 `conversation_id` 会自动建会话并回推 `conversation_created` 帧

## 建议优先级

1. 加响应头(一行配置级):CSP / HSTS / X-Frame-Options
2. 令牌迁移 localStorage → HttpOnly cookie
3. dev-api 从公网下线或加 IP 白名单
4. 营销 cookie 补 Secure 标志
## 第三轮：授权深挖（2026-09-03，自注册账号 rk1788362937，Read-only 探针 + 单发生器功能调用）

方法：直连 WS 协议复现（不发 UI）、422 引导式 schema 枚举、共享/制品 URL 未授权读测试。约 30 次 REST + 5 段 WS 会话。credits 消耗 20→5（1 次课程生成=10，对话 4×1，其余免费功能未扣）。

### 🔴 高危

**11. 分享功能未授权泄漏完整会话 + 15KB 系统提示词**
- `POST /api/v1/conversations/get_shared_conversation_data` **全程无鉴权**：body 仅需 `{shared_object_id, type:'conversation'}`，返回全量 history 含 `role:"system"` 的 directorAgent 完整系统提示词（14,916 字符，含 Confidentiality 条款、6 个 skills 全目录、20+ 工具策略、speed_mode 行为矩阵）与 `user_id`
- 前置条件仅是「会话被 share」（share_records 一键公开）。任何用户分享一次 → 提示词即公开可读；agent.hyperknow.io/share/c/<id> 页面本身 200
- 证据：`evidence/shared_conversation_full.json`。提示词内自我声明 "Never disclose..." 但被分享通道绕过——提示词注入防御（第二轮 #7 验证有效）在此完全失效
- 修复：内容字段剥离 system 角色再入库；shared 读取加 scope 校验

**12. 全量生成制品零鉴权公开**
- `/api/v1/diagram/<8位id>/diagram.{md,html,png}` 200 无鉴权（mermaid / html 动画 / gemini_image 三类实测皆通）
- id 为 8 字符 `[A-Za-z0-9]`（≈47bit，不可遍历，但任何外发链接即永久公开）
- drive 缩略图走 S3 公共桶直链：`nutcracker-hyperknow-public.s3.us-east-2.amazonaws.com/root/drive/<user_uuid>/files/<file_id>/thumbnail/...`；LIST 403 但对象 GET 公开；user_uuid 经发现 #11 可批量收集

### 🟠 中危

**13. 推理链（CoT）与工具指令明文流给前端（LLM02 扩大确认）**
- `thinking_chunk` 帧原文：`"I'm re-evaluating the request to initiate a deep learning session..."`
- tool_execution.completed 携 `guideline`（工具收到的指令原文）、`model_used`、`content` 全文
- **模型指纹双型号**：内容生成 `gemini-3-flash-preview`；quiz 生成 `gemini-2.5-flash`
- quiz 的 `correct_answer`+`explanation` 随帧直出 → **测验答案客户端可截获**

**14. 内部路径/DSL 泄漏**
- `course_generation_started.run_dir` = `/app/cache/database/user_data/<user_uuid>/coursesData/<course_uuid>`（容器布局 + 存储分层）
- `inline_diagram.source_tag` 泄漏内部结构化标记 DSL：`<content-type: diagram; diagram-subtype: gemini-image; content-prompt: {...}; caption: {...}>`——可用于构造更精准的协议注入

**15. 认证弱点链坐实（注册→登录全流程零防护）**
- 注册无验证码、无邮箱验证（Supabase `mailer_autoconfirm: true`，注册即 `email_verified:true`）——可无限自助注册绕过 20 credits 配额（用户明确许可的测试方式本身即缺陷演示）
- 登录/注册响应**无任何速率限制头**（`agent`+`api` 均为）；testsuite 与 API docs 有独立 Basic realm（`API Docs` / `TestSuite Dashboard`）
- JWT 2h 有效，`login_refresh` 长会话；WS token 走 query（第二轮 #10 复测仍为现状）

### 🟡 低危 / 信息

**16. 增长机制参数全暴露**：invite 奖励 `pro_days:4` + 40%-off 券（invite_code 与 coupon_code 双因子绑定）；affiliate 20% 佣金 dub.co 即时开通无审核（`POST /affiliate/join` 200 即时生效）

**17. 公司指纹**：status 页标题 `Nutcracker AI Inc. status`（Better Stack）；S3 桶同名前缀；testsuite 泄露 `Python/3.10 aiohttp/3.14.1`

**18. Supabase 直连面（良好）**：REST root 401 `UNAUTHORIZED_INVALID_API_KEY_TYPE`；storage bucket 列表空；无 app 级 RPC/realtime 通道；仅公开 `auth/v1/settings`（email+google provider）

### 第三轮新确认良好项
- `/share/c/` 页面虽公开渲染，但导出面上 S3 LIST 拒绝、docs/testsuite 全 Basic realm
- 兑换类端点（partner-code/check）返回体干净，无 per-code 信息泄漏（valid:false 一致响应）

### 建议（追加）
5. **立即**：shared conversation 返回体剥离 system/developer role 条目（或在 share 创建时做内容快照脱敏）
6. diagram/S3 对象改 presigned URL 或经 API 鉴权代理
7. WS 帧剥离 `thinking_chunk`、`guideline`、`model_used`、`correct_answer` 字段再下行
8. 注册/登录/兑换端点接入 CF rate limiting + 开启邮箱验证（关 mailer_autoconfirm）
## 第四轮：全工具诱发 + 配额滥用面（2026-09-03，账号 rk1788368955…，约 12 credits + 30 次 REST）

### 🔴 高危

**19. 功能配额可被 agent 循环绕过（真实放大面）**
- free 配额计数器 `calendar_add 2/窗`、`deep_learn_session 5/窗`、`file_generation 5/窗` 对 **agent 工具调用不计数**：一次 add_to_calendar 请求在 mark_response_complete 校验重试下创建 11 个任务；跨次累计 18 pending，`calendar_add.remaining` 恒为 2
- deep_learn_session 创建后 remaining 仍 5，file_generation（publish_file 出真实 PDF）也不扣
- 配合发现 #15（无限自助注册）→ 免费无限放大 LLM/渲染资源消耗

**20. 发布制品公共 URL（第二公开面）**
- `publish_file` 产出 `https://api.hyperknow.io/api/v1/files/<10位id>` 实测未鉴权 200（PDF 38.9KB），404 文案直书 `File not found in S3: <id>`（存储实现泄漏）

### 🟠 中危

**21. 服务端代码执行沙箱 + Python 异常泄漏**
- code_generator 帧序列 `code_chunk` → `tool_execution executing` → `code_output`：服务端存在代码执行环节
- 失败重试时明文下行 `Code generation failed: 'NoneType' object is not iterable`（CPython 异常文案）；沙箱边界未测（未做主动逃逸探针）

**22. 推理链进入 UI**：deep-learn 页面直接渲染 "I'm beginning to outline..." 等 CoT 文本，与 #13 叠加；机制上是产品功能而非意外（但内容策略上仍暴露中间推理）

**23. 内容可信性**：工具失败时 LLM 凭空捏造主题与 file 引用（捏造 "Cognitive Load Theory" 全文 + 伪造 `file-l2p1m0` 引用 id）。非越权，但输出不可信

### 流程确认（非发现）
- 跨账号 deep_learn/get_session_data 404（存在性不泄漏）；drive/search_files 用户域隔离正常
- marketplace enroll（免费课）正常生根成新 courseUuid；approve_tasks 需 `{task_id, action}` 且级联批准 subtasks
- `login_refresh` 在 access token 过期后以 refresh_token 换新未成功（refresh 一次性或短窗口——账号约 2h 后需重登）
## 第五轮：复刻准备期补充发现（2026-09-03）

- **24. `/api/v1/video/<id>/final_video.mp4` 无鉴权公开**（6.2MB 实测 200；同一 user 的 narration 音频 `/whiteboard/audio-stream/<uuid>/<sid>/tts_*.webm` 亦无鉴权 200）。三个公开制品面（diagram/files/video+audio）建议统一签 URL
- **25. `userPollData` 空状体 500 泄漏 DB 约束**：`null value violates not-null constraint user_acquisition_sources`（PostgreSQL 列名明文）
- **26. 白板授课需额度**：`insufficient_funds` 帧含 `credit_info{user_id,...}`（用户 uuid 再泄漏一处）
## 第六轮：课程操作子系统实测（2026-09-03，acct1 / 课程 706d4d5c）

- **27. 考试/练习答案随卷明文下发**：`GET .../courses/{uuid}/exam` 与 `.../practice` 返回每题 `correctAnswers`+`explanation` 全量明文（任一学员可读答案）；`practice/sessions/{sid}/questions/{qid}/tts` 返回的音频 URL 内嵌用户 uuid 且**未鉴权可下载**（第 5 个公开制品面）
- **28. `generation-log/{run_id}` 完整回放课程生成事件流**（含 query、全部 client/server 事件与时间戳）；`learning-summary` 暴露 estimatedTokens 用量遥测
- **29. 奖励自授疑点**：acct1 在 19:19 被升级为 Pro(pro25b, 4 天)——与该账号早前生成 invite 链接（pro_days:4 奖励）的时间相关性吻合，疑似 invite 奖励错投给本人而非受邀人（单次观察，未复现验证）
## 第七轮：课程操作子系统深挖（2026-09-03，acct1 80 credits）

### 🔴 高危（新）
**30. shared-course/join 双 IDOR**：`POST /course-generation/shared-course {shared_object_id:<course_uuid>}` 对任意登录用户返回整门课（无需分享标记）；`POST /course-generation/courses/{uuid}/join` 同样无条件克隆。course_uuid 由分享/邀请链大量散落 → 他人课程可被任意读取并复制。修复：查 share_record 存在性或 owner 校验。

**31. 考试/练习答案随卷明文**：`GET …/exam` 与 `…/practice` 的每题两字段 `correctAnswers`+`explanation` 随卷下发（防作弊基本线失守）；考试评分是**客户端算分**（`POST …/exam/score {unitId, score}` 直接记账 `{"status":"ok","final_score":100}`）——成绩完整性由客户端保证，任何人都能给自己写满分。

### 🟡 行为确认
- `chatResponseFollowup/stream` 是真 SSE（start→chunk*→done），body `{keyword, keyword_context, question}`；`file_generation/rerun` 需 task_id
- `structure/regenerate` 需 `{op:split|deepen|delete, ref, prompt}`（edit 需 op+ref）；`structure/undo` 有版本栈（No earlier structure to restore）
- `practice/audio/...` 的 TTS webm **未鉴权公开**（URLs 内嵌 user uuid）
- `userPollData` POST 空/不指 email 会 500 泄漏 PG 约束（同 #25）
## 第五轮：子系统画像 + 主动管线异常 + 账号体系弱点（2026-09-03 深夜，3 subagent 并行 + 单发验证）

### 🟠 中危

**25. proactive 任务管线突发刷单（生产观测）**
- acct2 于 17:38:23–17:40:21 收到 18 条 "Master/Learn Blockchain*" 待批任务（6–12s 一条、同日 15:00 时段），期间该账号无任何相关输入；acct1/acct3 对照为 0 → 非注册普发种子
- 记录自含 `develop_environment:"prod"`、`origin_data.source_type:"prompt"`，与 #19/#第四轮 19 的 add_to_calendar 重试风暴同型——**任务生成器存在去重缺失 + 可能的主题上下文错配**
- 任务只入 pending 不影响主列表（list_main_tasks 为空）；remove_task 200 但 pending 不减（见第四轮）

**26. KOL 运营后台 = 独立账号体系（kol.hyperknow.io）**
- 独立 `POST /api/auth/local-login`（email+password，FastAPI 422 schema 指纹），发 kd_local_token 于 localStorage；与主站 Supabase JWT 解耦
- 角色：admin/partners/promo-codes/code-types/campaigns + KOL 侧 codes/redemptions/dub 佣金；bundle 层可见 customer_email、dub_attribution、payout_status 等敏感运营字段
- 匿名 API 全线 401 ✓ 无泄漏；风险点在**独立弱口令面**（无验证码已知家族缺陷）与独立 JWT 秘钥复用未知

**27. 入群码系统（go.hyperknow.io，Express/Render）**
- 公开 `/api/school/{slug}` slug 探测面（400/404 差异 → 学校 slug 可枚举）；管理面 `X-Admin-Key` header（存 localStorage `hk_admin_key`），匿名 401 ✓

**28. 注册枚举 oracle 坐实**：重复邮箱 409 `User already registered`（登录面无差异）；`1@qq.com` 直接注册成功（无 MX/存在性校验、无验证邮件）

### 信息
- UI 路由全表 44 条（`evidence/routes_dev_surface.md`），含 `/dev/csm`、`/simulate-pro-success-purchase`、`/validate-success` 调试/演示残留（仅渲染态，无权益授予）
- 全部页面截图归档 `assets/screenshots/`（16 页：home/courses/feed/marketplace/course/whiteboard/deep-learn/inbox/kb/subscription/history/pricing/dev-csm/log）
- service 子域 apikey 门闸；qr 子域仅 Google 404；kol 主资源托管 Google Firebase/Frontend
- **get_conversation_data 对 owner 也不含 system 以外内部字段**（history 条目仅 index/role/content/timestamp）——提示词暴露的唯一载体仍是 system role 本体被随会话持久化

### 累计状态
高危：#11（share未授权+系统提示词）、#12（制品公开）、#19+#20（配额绕过+publish公开）、发现9家族（注册无防护）  
中危：#1-3,#7,#8,#13-15,#21-#28 系  
良好：kol/go API 匿名 401；Supabase 硬面 401；Basic realm 抗默认口令；账号级数据隔离（drive/search_files/conversation 404）正常
## 第五轮续：运营后台进入尝试与结论（2026-09-03）

### kol.hyperknow.io 进入尝试组合（全部有界）
| 手法 | 结果 |
|---|---|
| 自有主站凭证喂 local-login | 401 invalid email or password |
| 主站 Supabase JWT 喂 /api/me、/api/admin/stats | **403 not authorized**（差异坐实 kol 认可主站 JWT、仅卡角色）|
| Supabase user_metadata 自写 role=admin/is_admin（own account）→ 重签登录换新 JWT 后重试 | 仍 403（kol 不信 user_metadata，防线成立）|
| 6 组默认口令（admin@/kol@/test@ × admin123/Admin123/kol123…）| 全 401，文案一致无异差 oracle |
| GET /docs /api/docs | SPA 壳/404 |

结论：**kol 登录在当前授权强度下未攻破**。残余风险面为：独立口令库无验证码防护 + 与主站割离（弱口令/社工归内部流程问题）。

### 🔴 但发现新的未授权信息源
**29. kol FastAPI `openapi.json` 全量公开**：28 路径 + 13 schema（LocalLogin/PartnerCreate/PromoCodeCreate/CampaignCreate/CampaignEvent/`/api/admin/redemptions` 等）一字不损；运营数据模型（佣金、兑换、code 类型、活动）完全可读 → 攻击者获得精准攻击蓝图。证据 `evidence/kol_openapi.json`

**30. userPollData SQL 错误原文泄漏**：POST 不合 schema 时 500 返回 PG not-null 约束原文，直接暴露 `user_poll_data.user_acquisition_sources` 表列名（数据库结构泄漏）；正确形状 `{user_acquisition_sources:[...]}` 200 写入成功

**31. 共享课程未授权全量下载**：`POST /course-generation/shared-course {shared_object_id,type:'course'}` 无鉴权返回 190KB 完整课程（units/exams/sections/successCriteria）；join 后得到独立副本（courseUuid 新铸）。证据 `evidence/shared_course_full.json`

### 健康项
- `/api/campaigns/events` 需 ingest token（401 invalid ingest token）——埋点面不开放投毒
- marketplace enroll 正常生根（个人副本 b673dcb6）
- Stripe 前端无 pk 泄漏（托管跳转）
## 第六轮：kol 登录持续尝试（决定性）+ 域名防护缺失实锤（2026-09-04 凌晨）

### 🔴 高危（本轮最重）

**32. 企业内部域名零防护，任意人可注册特权邮箱**
- 注册面 12 款企业邮箱（admin/ops/support/test/dev/hr/team/hello/founder/staff/service/growth@hyperknow.io）全部直接注成功（mailer 自动确认 + 无域锁定 + 无 MX 校验）
- 仅 contact@hyperknow.io 预存在 → 枚举面同时把内部邮箱存在性暴露（409 oracle）
- 任何按"邮箱域名授信"的下游系统（发票/支持/白名单/SSO 域匹配/内部文档共享邀请）直接被此类账号接管
- 现场控制账号已在复核后全部用 `/api/v1/auth/delete_account {confirm_email}` 注销(12/12 200，复注册验证成立)

**33. kol 登录入口未授权泄漏运营邮箱**
- `GET https://kol.hyperknow.io/api/auth/local-login` → 200 `{"enabled":true,"email":"growth@hyperknow.io"}` ——运营人员邮箱明文裸奔，为钓鱼/定向爆破提供精确靶标

### kol 平台持续尝试（全部否定 → 明确结论）
| 波次 | 手法 | 结果 |
|---|---|---|
| 1 | 自有主站凭证喂 local-login | 401 |
| 2 | 主站 JWT → /api/me/管理端 | 403 not authorized（认可主站 JWT 但角色门成立）|
| 3 | 自写 user_metadata role=admin（own account 提权） | 403（kol 不信 user_metadata）|
| 4 | 6+8 组常见默认值（admin@/contact@/kol@/ops@/founder@/growth@ 等 × 企业弱口令） | 全 401，响应文本统一无枚举 oracle |
| 5 | 自建 admin@hyperknow.io 域账号直测 | 403/401（无域后门）|

结论：**kol 在授权边界内所有非字典手段下不可入**。固有风险位：`local-login` 无验证码 + 独立凭据库 + 运营邮箱已公开(#33)；若内部成员使用弱口令，极易被离线爆破。

### 信息项
- pdf-annotation、course-generation/update 双 WS 连接友好（connection_established）
- memory 写入面可用：`apply_memory_ops {operations:[{memory_type:preference|knowledge|logistics|other, action:append|remove|update, memory_content}]}`；drawer 存证据 ✓
- canvas 连接器未配置返回合规 404；search_images 非独立工具（走 generate_content 内部 DSL）
- kol 校验器细节泄漏：anon-as-bearer 401 `Token is missing the "aud" claim`、refresh-as-bearer 401 `Invalid token signature`——可推定 JWT 校验栈行为，辅助构造混淆
## 第七轮：越权矩阵（双/三自有账号交叉法，2026-09-04）

### 🟢 越权面复测通过项（良好）
| 面 | 测试 | 结果 |
|---|---|---|
| 读 | acct2 直读 acct1 会话（REST） | 404 |
| 读 | 未授权读**未**分享会话/课程 | 404（share 记录门控成立，泄漏仅限已分享资源） |
| 读 | acct2 读 acct1 深学会话 | 404 not found（存在性屏蔽 ✓） |
| 读 | WS chat 跨账号续接 | 1008 直闭 |
| 读 | WS whiteboard 跨账号 resume | "Session not found" |

### 🟡 问题项
**34. manage_*_property 越权 API 诈称成功**
- `manage_conversation_property`/`manage_session_property`：B 账号对 A 账号对象发 `{starred:true}` 与 `{delete:true}` 均回 200 "queued"/"deletion queued"，但 owner 侧 60s 后未变 → 后端在 worker 层才校正拒绝，**HTTP 面行为诈称**（可能覆盖审计/告警系统的成功信号），且暴露了对象存在性（不存在对象返回同类 200？已是同质化，无法判别）
- 副效应：B 可通过对自己 submitted id 的"成功"反馈感知对象存在与否（需看不在对象是否会同样 200——本轮未异测）

**35. share_record/check_shared_status 可跨账号查任意对象的分享状态**（200 shared:false），对象存在性/share 状态 minor oracle

### 能力面补遗
- 深学会话内部数据（owner-auth）嵌第二份系统提示词：**教师 persona**（12.5KB，落盘 `assets/prompts/deep_learn_teacher_prompt.md`），conversation_data.history 结构
- `approve_tasks {task_id, action:"approve"}` → task 落主任务列表，planTasks→pending→approve 流通闭环成立
- `chatResponseFollowup/stream` = SSE POST 流（文本选择续问）；`pdf-annotation/pdf/<session>/<file>?access_token=` 媒体直链（query token 家族同型）
- `dailyTrends` 50 条双语热点池已落 `assets/daily_trends.json`
## 第八轮：攻击面正向复测 + 越权破坏测试（2026-09-04）

### 🔴 新发现
**36. 邀请链接裸奔邀请人身份信息**
- `POST /api/v1/invite/check_invite_link {invite_id}` 无鉴权返回 `{sender:{user_id, email, username}}`——任何流传的邀请链接即成邀请人 PII 反查入口
- 错误文案 `Invite link not found for invite_id: <id>`（资源引用回显）

### 🟡 新中危

**37. 自推荐无防护迹象**：register + friend_referral_code=<own> 立即回 sharer_id + `pro_days:4` 奖励承诺（发放端去重未知，注册路径无任何同设备/IP/指纹检测迹象）

### 本轮通过的攻击控制
- 跨账号删除 drive 文件 → **404 User data not found**（owner 空间内查，对象不裸暴露）
- S3 源对象（`source/` 路径）→ 403（公开仅限 thumbnail/* 派生物；桶策略分层正确）
- SSRF 标尺：`analyze_url_content` 指向 127.0.0.1 → 模型层未路由到 URL 工具（无服务端取数证据）
- upload_public_files 无鉴权 → 401 ✓

### 能力/信息巩固
- drive add_file_to_calendar 接受 `{file_id|file_ids|prompt}` 三选一（文本直接进日历）
- orbie dismiss 需要 task_id；upload_public_files 需 multipart file
- kol 全 schema 表落 `assets/kol_api_model.md`
## 第九轮：课程子资源与判分面（2026-09-04，自有课程 706d4d5c）

### 新课程子资源树（前 98 端点表外的 bundle 模板）
- `GET courses/{uuid}/practice`（sessions→questions，**correctAnswers+explanation 内联**）→ 692KB
- `GET courses/{uuid}/exam`（units→exams→questions，同上内联答案）→ 150KB
- `GET courses/{uuid}/project`（stages/steps）→ 31KB
- `POST courses/{uuid}/exam/score` body={unitId, score, answers?}；`POST .../practice/check-fill`；`POST .../practice/assistant`；TTS 保温：practice/tts/prewarm、project/tts/prewarm、按 session/question/step 的 /tts
- project 流程：/draft、/submission、/state、`practice/progress`(POST)

### 🟡 新发现
**38. 学习记录客户端权威**：`exam/score` 直接收 `{unitId, score:100}` 并回 `status:ok final_score:100`（answers 乱填也接受）→ “考试成绩”可被任意调制为满分，进 learning_progress/简历类导出前无服务端校验

### 良好
- 跨账号 course practice/exam 读 → 404 `Practice not found`（scope ✓）
- deep_learn/update_plan 跨写 → 400 `not found or unauthorized` ✓
- subtask 会以 unit 级 NEW page（pdf-annotate 会话嵌课程）
## 第十轮：marketplace 全量收割 + 4 条未解链全关（2026-09-03，rk1788374086550@qq.com，20→18 credits）

### 📦 内容收割（本轮主目标）
**marketplace 33/33 门课程全量落盘**（`evidence/marketplace_dump/`，52.8MB）：
- 方法：`GET /marketplace/courses`（33 门全目录）→ `POST /marketplace/courses/{marketplace_id}/enroll`（**免费**，0 credit，重复 409 并回 `enrolledCourseUuid` 映射）→ 每课 5 路全抓：`courses/{uuid}`（结构全文）+ `/exam` + `/practice` + `/project` + `/progress-status`
- 每门课的 `correctAnswers`+`explanation` 全在 JSON 内联（#27/#31 结论覆盖 marketplace 全量目录坐实）
- 学分机制终确认：free tier credit 池 12h 轮转重置（`reset_interval_hours:12`、`will_reset_at` 可见；旧 gap#19 关）

### 🟠 新发现
**39. 四条零成本 LLM 调用面（配额系统旁路扩大确认）**
以下全部实测触发真实 Gemini 推理且 **0 credit 扣减**（整轮 33 门收割+PDF 导读+语音对话后仅 20→18，唯二扣费是 board-session 创建）：
- project `submission/text`：服务端 LLM 即时评分回 `{passed, feedback}`（个性化评语）
- practice `check-fill`：错答走 LLM 判分 `judged:true` 回针对性反馈；对答精确匹配 `judged:false`（大小写不敏感）
- project/practice `assistant`：form-encoded（`stage_id|session_id` + `messages` JSON 字符串）持续对话助教
- pdf-annotation/whiteboard `interject_question`：文本或语音提问 → STT→LLM→TTS 全链

**40. 流式语音上行通道服务端静默失效**
- `interject_audio_chunk {pcm_b64}` + `interject_audio_end`（3200B/100ms 节奏、16kHz s16le mono 真实语音，macOS `say` 合成）在 **pdf-annotation 与 whiteboard 双通道**复现：服务端回 `interject_ready` 后**永不产出** `voice_transcript`/`interject_user_text`/作答帧
- 对照：同内容整段 `interject_question {audio_b64, mime:"audio/wav", duration_ms}` 双通道均正常 → STT 转写（`interject_user_text` delta 流出）→ TTS 回答（`interject_audio` 序列 URL）→ `interject_done{control,text}`
- 定性：客户端 voice-push 实时流功能线上是哑路径（或要求未公开参数）；前端帧表：`interject_start{source}`/`interject_audio_chunk`/`interject_audio_end`/`interject_resume`；下行 `interject_pcm{pcm_b64,sample_rate:24000}`

### 🟡 协议链关闭（全部首测通过）
- **course-calendar**：`config GET {enabled:true}` → `draft {course_uuid, duration_days}` 回排期 items → `accept` 需把 item 的 `date` 改名 `scheduled_for`（422 引导得出）→ 200 `{inserted:70}` 落 `calendar/list_main_tasks`
- **project 子系统**：真实路径为 `project/stages/{sid}/steps/{qid}/…`（REMAINING_GAPS B6 旧模板缺段已修正）：
  - `state` GET 回 `{submissions, drafts}` 长存；`draft POST {text}` 持久化可读回
  - `submission` multipart（`file` 字段）对 `need_response:false` 步骤报 "step does not ask for a response"；typed 步骤须走 **`submission/text {text}`** → LLM 评分（见 #39）
  - `steps/{id}/tts`（含 `_first` 别名）与 `tts/prewarm` GET 均 200；audio_url 内嵌 user uuid 且**未鉴权 200**（公开制品面第 6 处）
- **practice**：`check-fill`/`assistant`/`progress`/`tts`/`prewarm` 全通；`progress POST {sessionId, finished, items:{qid:{state:not_done|skipped|correct|…, answer?, fast?}}}` 200 记账——客户端权威成绩写入（#38 家族扩到 practice）
- **pdf-annotation 导读全链关闭**（旧 gap A2）：正确时序 = WS `start_session`→`session_ready.session_id`→HTTP upload(带该 session_id)→**WS `sync_pdf_state{pdf_state:{revision,file_id,annotations:[]}}` 绑文件（此前缺此步报 "No PDF uploaded"）**→`start_teaching`→speak×5/annotation(highlight/circle/annotate)×5；新帧首见：服务端 `ask{mode:open,question}`（开口提问考用户）、教学收尾 `mark_response_complete` + `done`；`navigate_page`→`go_to_page{page,step_id}`；旁证：上传的 1132B 手工 PDF 静默不授（无报错帧），教学管线对坏文件无反馈
- **generation-feedback**：schema = `{run_id, course_uuid, stage, rating, comment}`；跨账号 run_id 404 校验成立（own-run 未验：run 生成需 10 credit，ROI 不足跳过）
- **杂项**：`banner/get_banner_message` {has_message:false}；`orbie/get_orbie_recommendations` 仍空（cron 定性维持）；`usr-msg-inbox/get_message` 分页游标结构；`email_manager/check_email_subscription` 实为 POST `{email}`；`citation/files` POST 需参数

### 证据
`evidence/marketplace_dump/`（33 课程×5 件）、`r10_calendar_flow.json`、`r10_project_stages_full.json`、`r10_project_submit2.json`、`r10_practice_endpoints.json`、`r10_practice_fill_progress.json`、`r10_pdf_session_v4.jsonl`（导读全帧）、`r10_voice_ab.jsonl`（语音 A/B）、`r10_chat_board_create.jsonl`、`r10_account_state.json`
## 第十一轮：自邀请提权 Pro + 子通道人格画像 + 全量本地化收口（2026-09-03，rk1788374086550 → Pro 80 credits）

### 🔴 新坐实
**41. 自邀请 → 自我 Pro 化无限续期（增长奖励错位完全武器化）**
- `invite/generate {invite_type:'type-001'}` 产 invite_id → 任意新邮箱（rk<时间戳>@qq.com 亦收）注册携带 `friend_referral_code=<invite_id>` → **奖励全落 inviter**：tier 立即 free→pro、credits 20→80、`expires +4d`
- 新号侧 0 收益；邀请侧无任何接收校验。重复执行 = 永久 Pro（#20/#29/#37 闭环为 exploit 链）

### 通道与人格本地化（新到）
- **deep_learn/ws 第 5 条 WS 通道实测**：114 帧（session_resumed/thinking/content_chunk/inline_diagram×5/tool_execution×15）；会话内复用 directorAgent 循环 + generate_content + mark_response_complete
- **教师人格行为准则自供落盘**：practice assistant（不给答案、苏格拉底式、绑定讲稿比喻）、project assistant（具体-项目锚定-引导不代写）、PDF 教师（口语化、无 markdown、逐页导览、回位继续）、白板教师（board_content=按序字符串列表、narration=单条连续文本）；verbatim 请求仍被统一拒答
- **generation-feedback own-run 闭环**：schema `{run_id, course_uuid, stage, rating, comment}` 200 记账；generation-log 自产 run（fec04427）89KB 全回放含 `final_course`+`semi_structure`，本轮 error_logs 空
- **工具注册表机读化**：28 工具 → `hyperclone/seed/tools_registry.json`（出现文件/模型/输出键/guideline 样本）
- **whatsNew changelog 14 版本（v130–v1313，2026-02-26→08-06）静态挖全** → `assets/whatsnew_changelog.json`（内置 bundle，无接口）
- 功能扫尾：drive CRUD（create_folder `directory_name`、delete `object_id` 异步 deleting）、save_artifact 存在性校验 404、external_memory 空结构、banner/inbox 空态形状

### 本地化终点存档
- `assets/prompts/`：director 系统提示词（15KB）+ deep-learn 教师（12.7KB）+ 4 份人格行为自供 + 6 skills 指纹
- `hyperclone/seed/`：tools_registry、skills_registry、marketplace 33 目录、onboarding 题库、dailyTrends、whatsnew、prompts/（5 份）
- `hyperclone/spec/FEATURES_MATRIX.md`：9 大类全功能点矩阵（✅/📦/🧩/⛔ 四态 + 证据指针）
- WS 通道终表 7 条、语音链路终态、内容 DSL——已并入 `docs/AGENT_ARCHITECTURE.md` v2
