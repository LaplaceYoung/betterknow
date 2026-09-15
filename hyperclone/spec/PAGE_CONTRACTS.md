# 页面数据与结构契约总表

> 静态事实源：`../recovered/modules/*.src.js`；路由映射：`../../evidence/module_catalog.md`。36 个 `route-page` 模块各有一份职责契约；主 bundle `index-TjoB2Buo` 在 `IndexApp` 内分列 SignIn、Home 与 legacy redirect，覆盖路由表全部 44 条 path；未执行 bundle、未发网络请求。

## Route → contract

| 路由 | 实现模块 | 契约 |
|---|---|---|
| `/dev/csm` | `__devCsmPreview-DScdU4JO.src.js` | [DevCsmPreview](pages/DevCsmPreview.md) |
| `/signin` | `index-TjoB2Buo.src.js` (`vD`) | [IndexApp](pages/IndexApp.md) |
| `/sampleMindmapResponse` | `SampleMindmapResponse-D5D9K8Os.src.js` | [SampleMindmapResponse](pages/SampleMindmapResponse.md) |
| `/signup` | `signUp-Bsi8Sjcr.src.js` | [SignUp](pages/SignUp.md) |
| `/coupon-code` | `CouponCodePage-B7gFDJHw.src.js` | [CouponCodePage](pages/CouponCodePage.md) |
| `/auth/callback` | `AuthCallBack-D6ewOC01.src.js` | [AuthCallBack](pages/AuthCallBack.md) |
| `/forgot-password` | `forgotPassword-3e5ciPne.src.js` | [ForgotPasswordPage](pages/ForgotPasswordPage.md) |
| `/account-deleted` | `AccountDeletedPage-sS6OnftJ.src.js` | [AccountDeletedPage](pages/AccountDeletedPage.md) |
| `/reset-password` | `resetPassword-mL7k2-JQ.src.js` | [ResetPassword](pages/ResetPassword.md) |
| `/onboarding` | `Onboarding-cAGO2Z_k.src.js` | [Onboarding](pages/Onboarding.md) |
| `/success` | `StripePaymentValidation-BHLxMsFf.src.js` | [StripePaymentValidation](pages/StripePaymentValidation.md) |
| `/simulate-pro-success-purchase` | `SimulateProSuccess-Do2m_abA.src.js` | [SimulateProSuccess](pages/SimulateProSuccess.md) |
| `/validate-success` | `SimulateValidation-CV2oIk6G.src.js` | [SimulateValidation](pages/SimulateValidation.md) |
| `/subscription`, `/pricing` | `subscription-BPidvGpU.src.js` | [Subscription](pages/Subscription.md) |
| `/unsubscribe_email_list` | `emailSubscriptionPage-CKBNY0Dx.src.js` | [EmailSubscriptionPage](pages/EmailSubscriptionPage.md) |
| `/shared/c/:conversationId` | `index-TjoB2Buo.src.js` redirect | [SharedConversationPage](pages/SharedConversationPage.md) |
| `/share/c/:conversationId` | `SharedConversationPage-DOuWYgla.src.js` | [SharedConversationPage](pages/SharedConversationPage.md) |
| `/share/course/:courseId` | `SharedCoursePage-B9BtZtqq.src.js` | [SharedCoursePage](pages/SharedCoursePage.md) |
| `/course-generation/log/:runId` | `CourseGenerationLogPage-DRWJNve8.src.js` | [CourseGenerationLogPage](pages/CourseGenerationLogPage.md) |
| `/` | `index-TjoB2Buo.src.js` (`Wx`) | [IndexApp](pages/IndexApp.md) |
| `/welcome-back` | `WelcomeBackPage-DurSUQgD.src.js` | [WelcomeBackPage](pages/WelcomeBackPage.md) |
| `/response/course-generation/:courseUuid`, `/response/:conversationId` | `ChatResponsePage-B8jlcC8f.src.js` | [ChatResponsePage](pages/ChatResponsePage.md) |
| `/inbox/message/:messageId` | `InboxMessagePage-B20bjE01.src.js` | [InboxMessagePage](pages/InboxMessagePage.md) |
| `/inbox` | `InboxPage-BfsYjdrg.src.js` | [InboxPage](pages/InboxPage.md) |
| `/courses` | `CoursesPage-BbyenZ-M.src.js` | [CoursesPage](pages/CoursesPage.md) |
| `/marketplace` | `MarketplacePage-BfF2z5q_.src.js` | [MarketplacePage](pages/MarketplacePage.md) |
| `/marketplace/:courseId/preview` | `MarketplacePreviewPage-BrEMOsV6.src.js` | [MarketplacePreviewPage](pages/MarketplacePreviewPage.md) |
| `/course/:courseId`, `/course/:courseId/welcome` | `CourseJourneyPage-DgJviJg0.src.js` | [CourseJourneyPage](pages/CourseJourneyPage.md) |
| `/course/:courseId/sessions/pdf-annotate/:courseSessionId`, `/pdf-session/:sessionId` | `SplitLayout-t_NQ46MB.src.js` | [SplitLayout](pages/SplitLayout.md) |
| `/course/:courseId/sessions/whiteboard/:courseSessionId`, `/whiteboard/:sessionId` | `WhiteboardPage-D7Ndg5mH.src.js` | [WhiteboardPage](pages/WhiteboardPage.md) |
| `/course/:courseId/practice/:sessionId` | `PracticePage-CfhffZeL.src.js` | [PracticePage](pages/PracticePage.md) |
| `/course/:courseId/exam/:unitId` | `ExamPage-D7IX1wOV.src.js` | [ExamPage](pages/ExamPage.md) |
| `/course/:courseId/project/:stageId` | `ProjectStagePage-C1jt3v6O.src.js` | [ProjectStagePage](pages/ProjectStagePage.md) |
| `/history` | `StudyHistoryPage-C_ASJLRI.src.js` | [StudyHistoryPage](pages/StudyHistoryPage.md) |
| `/knowledge-base` | `knowledge_base-vdyPmbEX.src.js` | [KnowledgeBase](pages/KnowledgeBase.md) |
| `/learning-feed` | `proactive-BmEDcKEX.src.js` | [LearningFeed](pages/LearningFeed.md) |
| `/deep-learn-session/outline/:subtaskId` | `DeepLearnSessionOutline-CxW4NH1I.src.js` | [DeepLearnSessionOutline](pages/DeepLearnSessionOutline.md) |
| `/deep-learn-session/subtask_id/:subtaskId`, `/deep-learn-session/:sessionId` | `deepLearnSession-D1XsuBJn.src.js` | [DeepLearnSession](pages/DeepLearnSession.md) |

## 数据契约矩阵

| 页面族 | REST 写入/读取主干 | WS 通道 | 持久化主干 |
|---|---|---|---|
| Auth/onboarding | `/auth/login`, `/auth/register`, `/auth/google_sync`, `/onboarding/manage_onboarding`, Supabase recover/user | — | auth token/user/onboarding keys、pending referral |
| Home/chat | upload、conversation data/property/share/artifact、daily trends | `/api/v1/ws`, `/course-generation/ws` | conversation/recent course history、new conversation marker |
| Courses | courses, marketplace, join/enroll, calendar, practice/exam/project | course update WS | pending join、intro seen、TTS prefs |
| Teaching | whiteboard outlines/upload、PDF sessions/pdf/upload | `/whiteboard/ws`, `/pdf-annotation/ws` | whiteboard/PDF session id、TTS prefs |
| Deep learn/feed | deep session, calendar task CRUD/approval/update, rerun | `/deep_learn/ws` | deep history、quota cache |
| Inbox/Drive | inbox get/mark-read；drive tree/folder/upload/delete/calendar | `/drive/ws` | quota cache |
| Billing | plans/check/checkout/change/cancel/revert/validate | — | subscription tier |

## 解释规则与边界

- `Endpoint` 保留源码可静态推导的 HTTP method、path 与 body；动态 FormData 明列字段。调用 bundle helper 的页面同时写明 helper 事实。
- `WS` 区分发送帧与消费帧；白板/PDF/deep-learn/course-generation 的完整服务端字段仍以 `../../evidence/ws_frame_types.json` 与 `../../evidence/ws_deep_protocols.md` 为补充事实源。
- `State` 只记录影响页面行为的状态与显式 localStorage/sessionStorage key；React 局部渲染缓存不冒充持久化状态。
- `Controls` 使用源码/i18n key/ARIA/title；`Navigate` 只列页面显式路由和薄包装继承的路由。
