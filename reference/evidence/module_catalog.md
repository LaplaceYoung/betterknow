# 反压缩模块目录

> 范围：`hyperclone/recovered/modules/*.src.js` 的 82 个静态文件。全程只读源码；未执行 bundle，未发出网络请求。分类按模块的主要职责（大体积 vendor 依赖即使含 React 适配层仍记为 `vendor`）。

## 结论

- 覆盖：**82/82**；分类计数：`component` 23、`hook` 1、`route-page` 36、`util` 13、`vendor` 9。
- 路由实现不使用 `createBrowserRouter`/`RouterProvider`；主 bundle 中 `xp`/`bp` 分别是压缩后的 `<Routes>`/`<Route>`，路由表位于 `index-TjoB2Buo.src.js:98533-98739`。
- 业务模块没有 Zustand store。唯一 Zustand `create`/vanilla store 工厂在 `percentages-BXMCSKIN-CoqTm4Ai.src.js:30994-31082`，仅供内嵌 Excalidraw portal 使用，且无 persist middleware。
- 新增 fetch 端点见 [`extra_endpoints.json`](extra_endpoints.json)；该文件已排除 `api_endpoints.md` 与 `api_endpoints_addendum.md` 已列项。

## 82 模块目录

| 文件 | 分类 | 职责 | 核心导出（保持反压缩别名） |
|---|---|---|---|
| `AccountDeletedPage-sS6OnftJ.src.js` | `route-page` | 账户删除后的确认页与返回登录动画。 | `i as default` |
| `AuthCallBack-D6ewOC01.src.js` | `route-page` | OAuth 回调、用户同步、推荐码与首登跳转。 | `b as default` |
| `BugReportModal-DxKVyQda.src.js` | `component` | 问题反馈弹窗、附件上传及会话上下文提交。 | `l as B` |
| `ChatResponsePage-B8jlcC8f.src.js` | `route-page` | 主聊天响应页；编辑器、流式 WS、历史、分享及生成物。 | `$b as default` |
| `ConversationSkeletonLoader-BLm7Nk9F.src.js` | `component` | 会话加载骨架屏。 | `s as C` |
| `CouponCodePage-B7gFDJHw.src.js` | `route-page` | 优惠/好友邀请码兑换落地页。 | `s as default` |
| `CourseFeedbackEntry-yXmrvWpY.src.js` | `component` | 各课程场景统一反馈入口，封装 BugReportModal 上下文。 | `d as C` |
| `CourseGenerationLogPage-DRWJNve8.src.js` | `route-page` | 按 runId 展示课程生成运行日志。 | `i as default` |
| `CourseJourneyPage-DgJviJg0.src.js` | `route-page` | 课程旅程总页；课程状态、日历草案、生成进度 WS、画布更新。 | `De as PENDING_COURSE_JOIN_KEY, Fe as PENDING_COURSE_JOIN_TTL_MS, vt as default` |
| `CourseRatingBar-BgzZWlQB.src.js` | `component` | 星级评分、生成反馈 API 与评分状态工具。 | `m as C, c as F, i as S, p as c, g, h as o, b as s` |
| `CourseShareModal-C6j8fIDX.src.js` | `component` | 课程公开分享及社交平台链接弹窗。 | `i as C` |
| `CourseStructureMap-41hR1got.src.js` | `component` | 课程结构图、节点展开、结构编辑/重生成/应用/撤销。 | `Fe as C, ke as T, b as U, ze as a` |
| `CourseTypeIcon-27chSRPG.src.js` | `component` | 按课程类型渲染 SVG 图标。 | `r as C` |
| `CoursesPage-BbyenZ-M.src.js` | `route-page` | 我的课程列表、筛选、删除与分享。 | `G as default` |
| `DeepLearnSessionOutline-CxW4NH1I.src.js` | `route-page` | 深度学习子任务大纲确认与调整。 | `m as default` |
| `ExamPage-D7IX1wOV.src.js` | `route-page` | 课程考试答题、计时、评分与结果。 | `C as default` |
| `InboxMessagePage-B20bjE01.src.js` | `route-page` | 单条站内信详情和已读状态。 | `m as default` |
| `InboxPage-BfsYjdrg.src.js` | `route-page` | 站内信列表、分页/筛选与导航。 | `c as default` |
| `InboxPage-COF0onVT.src.js` | `util` | 站内信 GET/mark-read 客户端及规范化工具。 | `u as f, a as g, c as m` |
| `MarketplacePage-BfF2z5q_.src.js` | `route-page` | 课程市场列表、主题筛选与搜索。 | `b as default` |
| `MarketplacePreviewPage-BrEMOsV6.src.js` | `route-page` | 市场课程预览薄包装，复用课程旅程页。 | `s as default` |
| `MessageBubble-SHcXdv80.src.js` | `component` | 聊天/白板消息渲染器、Markdown、图表、测量与交互组件。 | `消息/白板渲染组件集合（压缩别名）` |
| `Onboarding-cAGO2Z_k.src.js` | `route-page` | 新用户引导、演示脚本、画像记忆与 onboarding 状态提交。 | `Se as default` |
| `PracticePage-CfhffZeL.src.js` | `route-page` | 课程练习会话、题型、评分、TTS 与助手。 | `K as default` |
| `PracticeStars-TWYnxRvK.src.js` | `component` | 练习三星进度显示。 | `s as P` |
| `PreparingModal-Bthg5dgq.src.js` | `component` | 课程生成/进度轮询与准备中弹窗。 | `l as P, i as a, o as g` |
| `ProSuccessCelebration-BLjYKG3E.src.js` | `component` | Pro 购买成功庆祝弹层。 | `l as P, r as a` |
| `ProjectStagePage-C1jt3v6O.src.js` | `route-page` | 项目式课程阶段；步骤、草稿/提交、附件、TTS 与助手。 | `k as default` |
| `SampleMindmapResponse-D5D9K8Os.src.js` | `route-page` | 示例课程思维导图开发页。 | `n as default` |
| `SharedConversationPage-DOuWYgla.src.js` | `route-page` | 公开共享会话读取与只读渲染。 | `N as default` |
| `SharedCoursePage-B9BtZtqq.src.js` | `route-page` | 共享课程薄包装，复用课程旅程页。 | `s as default` |
| `SimulateProSuccess-Do2m_abA.src.js` | `route-page` | 开发用 Pro 成功状态模拟页。 | `n as default` |
| `SimulateValidation-CV2oIk6G.src.js` | `route-page` | 开发用支付验证状态模拟页。 | `t as default` |
| `SplitLayout-t_NQ46MB.src.js` | `route-page` | PDF 标注课程/独立会话页；PDF、聊天、WS、引用与上传。 | `Gn as SplitLayout` |
| `StripePaymentValidation-BHLxMsFf.src.js` | `route-page` | Stripe 回跳校验、轮询及成功/失败页。 | `h as default` |
| `StudyHistoryPage-C_ASJLRI.src.js` | `route-page` | 会话与深学历史列表、选择、重命名和删除。 | `v as default` |
| `TextSelectionPopup-gC3xy-py.src.js` | `component` | 文本选中追问浮层、网络诊断与流式 follow-up。 | `m as C, v as T` |
| `VoiceModeModal-6HRRb_4A.src.js` | `component` | 语音模式基础设施与 UI；录音、VAD、TTS、PDF/音频处理和 WS 探测。 | `Voice modal、PCM/TTS/VAD/PDF helpers（压缩别名）` |
| `VoiceSettingsModal-Bp7qApl4.src.js` | `component` | 语音角色/速度设置弹窗和音频图标。 | `r as A, m as V, u as f` |
| `WelcomeBackPage-DurSUQgD.src.js` | `route-page` | 回访欢迎动画页。 | `s as default` |
| `WhiteboardPage-D7Ndg5mH.src.js` | `route-page` | 白板课程/独立会话页；教学 WS、画布、语音、课纲和上传。 | `wt as WhiteboardPage` |
| `__devCsmPreview-DScdU4JO.src.js` | `route-page` | 课程结构图开发预览页。 | `n as default` |
| `addErrorLog-Dxv53mIo.src.js` | `util` | 错误日志 API 客户端与错误类型常量。 | `o as a, n as t` |
| `check-BBSENZCf.src.js` | `component` | Lucide Check 图标。 | `e as C` |
| `checkbox-DxW-3BRQ.src.js` | `component` | 可访问复选框组件。 | `o as C` |
| `copy-jHTWzodI.src.js` | `vendor` | HTML 解析/转换、rehype/raw 及复制图标等打包依赖。 | `_s as C, ds as a, Ee as h, ps as r, _ as z` |
| `courses-GqETwdXb.src.js` | `util` | 课程列表、摘要、单课读取/删除 API 客户端。 | `o as a, r as b, i as d, s as g` |
| `createLucideIcon-B4HcG4gb.src.js` | `vendor` | Lucide SVG 图标工厂。 | `i as c` |
| `deepLearnSession-D1XsuBJn.src.js` | `route-page` | 深度学习会话页；历史解析、流式内容、反馈和完成状态。 | `J as default` |
| `download-dDsBfY4e.src.js` | `component` | Lucide Download 图标。 | `t as D` |
| `dubAnalytics-BIiGXMVM.src.js` | `util` | Dub 注册转化上报与 cookie 标记。 | `o as g, t` |
| `emailSubscriptionPage-CKBNY0Dx.src.js` | `route-page` | 邮件订阅查询/退订页。 | `i as default` |
| `forgotPassword-3e5ciPne.src.js` | `route-page` | 忘记密码请求页。 | `l as default` |
| `forgotPassword-8Ndgp3wn.src.js` | `util` | Supabase 重置邮件与更新密码函数。 | `e as r, r as u` |
| `getAllCalendarMainTasks-DafTUG3L.src.js` | `util` | 日历主任务列表 API 客户端。 | `a as g` |
| `getMainTaskData-D-oXzdCH.src.js` | `util` | 单个日历主任务 API 客户端。 | `t as g` |
| `getOtherFunctionUsageLimits-BqWLa23Q.src.js` | `util` | 功能额度获取、本地缓存和乐观扣减。 | `c as a, o as b, s as d, e as g` |
| `github-BU76ptNE.src.js` | `vendor` | remark/rehype、语法高亮与 GitHub Markdown 打包依赖。 | `H as a, ut as c, ft as r` |
| `historyConversationDataParser-f81MQw9L.src.js` | `component` | 历史会话帧解析与大量工具卡片/消息组件。 | `历史解析器与工具卡片组件集合（压缩别名）` |
| `index-BYcV05tM.src.js` | `vendor` | PDF.js/react-pdf 打包运行时与文档/页面组件。 | `Fw as D, Zf as G, Zw as P, tb as i, Hm as v` |
| `index-CMJxjNZ8.src.js` | `vendor` | Radix Presence/动画存在性原语。 | `x as A` |
| `index-DTP6V39T.src.js` | `vendor` | remark-breaks 插件。 | `t as r` |
| `index-DUyiDua-.src.js` | `component` | Dub Analytics React provider 与 useAnalytics。 | `e as Analytics, a as useAnalytics` |
| `index-TjoB2Buo.src.js` | `route-page` | 应用主 bundle；React 路由、认证、配置、API/WS 客户端、布局与共享 UI。 | `应用入口及压缩别名导出（含 config A、auth/API/router primitives）` |
| `index-qYFgNVxk.src.js` | `vendor` | micromark/remark GFM 解析扩展。 | `C as c, w as f, pt as r` |
| `knowledge_base-vdyPmbEX.src.js` | `route-page` | 知识库/Drive 页；树浏览、上传、日历、配额及 drive WS。 | `S as default` |
| `loader-circle-BZEIbChB.src.js` | `component` | Lucide LoaderCircle 图标。 | `c as L` |
| `maximize-2-78VwLVLI.src.js` | `component` | Lucide Maximize2 图标。 | `a as M` |
| `percentages-BXMCSKIN-CoqTm4Ai.src.js` | `vendor` | Excalidraw、图像/PDF 导出及相关大型 vendor bundle；内含其私用 Zustand。 | `m as C, GB as I, b as M, v as P, x as V, y as a, w as b, U as c, g as d, M as f, NZ as r, js as t, p as u` |
| `plus-jBDDhggQ.src.js` | `component` | Lucide ArrowUp/Plus 图标。 | `e as A, t as P` |
| `proactive-BmEDcKEX.src.js` | `route-page` | 主动学习/日历任务 feed；审批、更新、重跑和配额。 | `V as default` |
| `quizScoring-DluRF6xL.src.js` | `util` | 练习/考试评分、伪用户名与归一化工具。 | `t as Q, s as a, u as b, e as d, a as p, r as s` |
| `resetPassword-mL7k2-JQ.src.js` | `route-page` | 密码恢复回调与新密码设置页。 | `o as default` |
| `signUp-Bsi8Sjcr.src.js` | `route-page` | 注册、邀请码验证及转化归因页。 | `v as default` |
| `subscription-BPidvGpU.src.js` | `route-page` | 套餐/定价页与 Stripe/一次性支付 checkout。 | `C as default` |
| `subscriptionTier-CZS6bvlX.src.js` | `util` | 订阅层级比较工具。 | `r as t` |
| `updateProfileMemory-DlSji0e-.src.js` | `util` | 画像记忆更新 API 客户端。 | `s as updateProfileMemory` |
| `useAudioPlayer-DPbJ9VKN.src.js` | `hook` | Markdown 音频播放器 Hook 与弹窗。 | `c as M, h as u` |
| `utils-Bmk8urhx.src.js` | `util` | Tailwind class 合并工具 cn。 | `n as c` |
| `voicePrefs-rmmbxoX2.src.js` | `util` | TTS 偏好 localStorage 读取/保存。 | `r as l, o as s` |
| `with-selector-U5gkSzzZ.src.js` | `vendor` | Zustand selector 适配与 Highlighter 图标（vendor 辅助）。 | `u as H, m as u, d as w` |
| `x-BPqZ-rfi.src.js` | `component` | Lucide X 图标。 | `e as X` |

## React 路由表

| path | 页面模块 |
|---|---|
| `/dev/csm` | `__devCsmPreview-DScdU4JO.src.js` |
| `/sampleMindmapResponse` | `SampleMindmapResponse-D5D9K8Os.src.js` |
| `/signin` | `index-TjoB2Buo.src.js`（inline `vD`） |
| `/signup` | `signUp-Bsi8Sjcr.src.js` |
| `/coupon-code` | `CouponCodePage-B7gFDJHw.src.js` |
| `/auth/callback` | `AuthCallBack-D6ewOC01.src.js` |
| `/forgot-password` | `forgotPassword-3e5ciPne.src.js` |
| `/account-deleted` | `AccountDeletedPage-sS6OnftJ.src.js` |
| `/reset-password` | `resetPassword-mL7k2-JQ.src.js` |
| `/onboarding` | `Onboarding-cAGO2Z_k.src.js` |
| `/success` | `StripePaymentValidation-BHLxMsFf.src.js` |
| `/simulate-pro-success-purchase` | `SimulateProSuccess-Do2m_abA.src.js` |
| `/validate-success` | `SimulateValidation-CV2oIk6G.src.js` |
| `/subscription` | `subscription-BPidvGpU.src.js` |
| `/pricing` | `subscription-BPidvGpU.src.js` |
| `/unsubscribe_email_list` | `emailSubscriptionPage-CKBNY0Dx.src.js` |
| `/shared/c/:conversationId` | `index-TjoB2Buo.src.js`（inline legacy redirect `P$` → `/share/c/:conversationId`） |
| `/share/c/:conversationId` | `SharedConversationPage-DOuWYgla.src.js` |
| `/share/course/:courseId` | `SharedCoursePage-B9BtZtqq.src.js` |
| `/course-generation/log/:runId` | `CourseGenerationLogPage-DRWJNve8.src.js` |
| `/` | `index-TjoB2Buo.src.js`（inline home `Wx`） |
| `/welcome-back` | `WelcomeBackPage-DurSUQgD.src.js` |
| `/response/course-generation/:courseUuid` | `ChatResponsePage-B8jlcC8f.src.js` |
| `/response/:conversationId` | `ChatResponsePage-B8jlcC8f.src.js` |
| `/inbox/message/:messageId` | `InboxMessagePage-B20bjE01.src.js` |
| `/inbox` | `InboxPage-BfsYjdrg.src.js` |
| `/courses` | `CoursesPage-BbyenZ-M.src.js` |
| `/marketplace` | `MarketplacePage-BfF2z5q_.src.js` |
| `/marketplace/:courseId/preview` | `MarketplacePreviewPage-BrEMOsV6.src.js` |
| `/course/:courseId` | `CourseJourneyPage-DgJviJg0.src.js` |
| `/course/:courseId/welcome` | `CourseJourneyPage-DgJviJg0.src.js` |
| `/course/:courseId/sessions/pdf-annotate/:courseSessionId` | `SplitLayout-t_NQ46MB.src.js` |
| `/course/:courseId/sessions/whiteboard/:courseSessionId` | `WhiteboardPage-D7Ndg5mH.src.js` |
| `/course/:courseId/practice/:sessionId` | `PracticePage-CfhffZeL.src.js` |
| `/course/:courseId/exam/:unitId` | `ExamPage-D7IX1wOV.src.js` |
| `/course/:courseId/project/:stageId` | `ProjectStagePage-C1jt3v6O.src.js` |
| `/whiteboard/:sessionId` | `WhiteboardPage-D7Ndg5mH.src.js` |
| `/pdf-session/:sessionId` | `SplitLayout-t_NQ46MB.src.js` |
| `/history` | `StudyHistoryPage-C_ASJLRI.src.js` |
| `/knowledge-base` | `knowledge_base-vdyPmbEX.src.js` |
| `/learning-feed` | `proactive-BmEDcKEX.src.js` |
| `/deep-learn-session/outline/:subtaskId` | `DeepLearnSessionOutline-CxW4NH1I.src.js` |
| `/deep-learn-session/subtask_id/:subtaskId` | `deepLearnSession-D1XsuBJn.src.js` |
| `/deep-learn-session/:sessionId` | `deepLearnSession-D1XsuBJn.src.js` |

证据：懒加载符号与文件映射位于 `index-TjoB2Buo.src.js:98076-98114`；legacy redirect `P$` 位于 `:98120-98144`；`<Routes>`/`<Route>` 声明位于 `:98533-98739`。受保护页面外层使用 bundle 内部 guard `kg`。

## Zustand store 清单

| store 线索 | 所在文件 | persist key | state 字段 | 结论 |
|---|---|---|---|---|
| Excalidraw portal store（函数 `Yj` 内局部 hook store） | `percentages-BXMCSKIN-CoqTm4Ai.src.js:31046-31082` | 无 | `current`, `version`, `set` | Zustand vanilla/create 实现在 `:30994-31042`；局部 store 管理 portal children 与版本，自模块外不可见。 |

未发现 `persist(...)`、`createJSONStorage`、`partialize` 或 `onRehydrateStorage`。`getOtherFunctionUsageLimits-BqWLa23Q.src.js` 的 `hyperknow_quota_limits` 只是手写 `localStorage` 缓存（字段 `data`, `cached_at`），**不是 Zustand persist store**。

## 大文件人工确认（>50 KiB）

以下 19 个文件均检查了头部、尾部导出以及 `/api/v1`、`fetch(`、`WebSocket` 与主要库特征；分类依据如下：

| 文件 | 大小 | 分类依据 |
|---|---:|---|
| `ChatResponsePage-B8jlcC8f.src.js` | 1030.9 KiB | 默认导出页面包装；大量 React state、聊天编辑器及 `/api/v1/ws`。 |
| `CourseJourneyPage-DgJviJg0.src.js` | 186.3 KiB | 默认课程页；课程日历/fetch 与课程生成 WS。 |
| `CourseStructureMap-41hR1got.src.js` | 75.2 KiB | 导出课程结构 UI/变换工具；结构 CRUD fetch。 |
| `MessageBubble-SHcXdv80.src.js` | 101.4 KiB | 导出消息组件集合；Markdown、Mermaid、白板卡片。 |
| `Onboarding-cAGO2Z_k.src.js` | 61.1 KiB | 默认 onboarding 页面；引导状态与画像提交。 |
| `PracticePage-CfhffZeL.src.js` | 68.4 KiB | 默认练习页面；practice API、TTS、评分。 |
| `SplitLayout-t_NQ46MB.src.js` | 281.7 KiB | 导出 `SplitLayout` 页面；PDF annotation WS/API 与 PDF UI。 |
| `VoiceModeModal-6HRRb_4A.src.js` | 960.2 KiB | 导出 Voice modal/helper 集；VAD、音频、PDF 依赖主体。 |
| `WhiteboardPage-D7Ndg5mH.src.js` | 198.7 KiB | 导出 `WhiteboardPage`；教学 WS、画布与课程课纲 fetch。 |
| `copy-jHTWzodI.src.js` | 247.3 KiB | parse5/rehype HTML 解析转换实现，无页面 state/API。 |
| `deepLearnSession-D1XsuBJn.src.js` | 110.0 KiB | 默认深学会话页面；会话数据与流式消息。 |
| `github-BU76ptNE.src.js` | 245.9 KiB | GitHub Markdown/remark/rehype/Highlight.js 语法实现。 |
| `historyConversationDataParser-f81MQw9L.src.js` | 1475.5 KiB | 导出大量历史解析和工具卡片 React 组件；非路由默认页。 |
| `index-BYcV05tM.src.js` | 680.4 KiB | PDF.js/react-pdf runtime；尾部导出 Document/Page。 |
| `index-TjoB2Buo.src.js` | 3278.3 KiB | 应用入口；配置、认证、API、React route table 与 createRoot。 |
| `index-qYFgNVxk.src.js` | 61.4 KiB | micromark/remark GFM parser；无页面 state/API。 |
| `knowledge_base-vdyPmbEX.src.js` | 74.1 KiB | 默认知识库页面；Drive API/WS、目录树。 |
| `percentages-BXMCSKIN-CoqTm4Ai.src.js` | 1762.7 KiB | Excalidraw/图像导出 vendor 代码；唯一私用 Zustand 实现。 |
| `proactive-BmEDcKEX.src.js` | 213.5 KiB | 默认 learning-feed 页面；日历任务操作与 API。 |

## Evidence → Finding → Path

| Evidence | Finding | Path |
|---|---|---|
| E1: 目录枚举得到 82 个 `*.src.js`；上表逐项一一对应。 | F1: 模块目录完整覆盖当前恢复集。 | `hyperclone/recovered/modules/` → 本文“82 模块目录”。 |
| E2: `index-TjoB2Buo.src.js:98076-98144,98533-98739`。 | F2: 单一 JSX 路由表声明 44 条 path；主要页面按动态 import 拆包，`/shared/c/*` 为 inline 兼容重定向。 | 主 bundle → lazy/inline symbol → route path → 页面模块或 redirect。 |
| E3: `percentages-BXMCSKIN-CoqTm4Ai.src.js:30994-31082`，且全目录无 persist middleware 关键字。 | F3: 仅 vendor 内部局部 Zustand store；无业务 Zustand/persist store。 | vanilla factory `zj` → React hook factory `Vj` → `Yj` portal store。 |
| E4: 全目录 `fetch(` 与 `/api/v1` 静态扫描，并与两份既有端点文档集合差分。 | F4: 新增动态课程、练习、项目、PDF 端点模板。 | fetch call → 路径/helper 常量 → `extra_endpoints.json`。 |

## 方法与限制

- 小文件全文检查；>50 KiB 文件按验收要求人工确认头/尾、导出和关键调用带，见上表。
- “新增”以既有文档中的路径文本为基准；同一路径的新 HTTP method（课程 GET/DELETE）各自保留。
- `{?query}` 表示源码条件拼接的可选 query string；占位符名称按上下文语义化，不沿用压缩变量名。
- 仅提取可静态归因到 `/api/v1` 的 fetch 模板；WebSocket 通道不写入 `extra_endpoints.json`。
