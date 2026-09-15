# Frontend route and dev-surface review

Scope: static review of **122 JavaScript chunks** in `js_bundles/` (route literals/router table), plus bounded unauthenticated GETs to `https://agent.hyperknow.io`. No credential attempts and no mutating calls.

## Complete router table

The React Router table is mounted in `index-TjoB2Buo.js`; lazy route components/chunk mounts are shown below. Dynamic parameters were replaced with `x` for probes.

| Route | Component chunk | Unauthenticated GET |
|---|---|---|
| `/` | index-TjoB2Buo.js (home/Wx) | 200 SPA shell |
| `/account-deleted` | AccountDeletedPage-sS6OnftJ.js | 200 SPA shell |
| `/auth/callback` | AuthCallBack-D6ewOC01.js | 200 SPA shell |
| `/coupon-code` | CouponCodePage-B7gFDJHw.js | 200 SPA shell |
| `/course-generation/log/:runId` | CourseGenerationLogPage-DRWJNve8.js | 200 SPA shell |
| `/course/:courseId` | CourseJourneyPage-DgJviJg0.js | 200 SPA shell |
| `/course/:courseId/exam/:unitId` | ExamPage-D7IX1wOV.js | 200 SPA shell |
| `/course/:courseId/practice/:sessionId` | PracticePage-CfhffZeL.js | 200 SPA shell |
| `/course/:courseId/project/:stageId` | ProjectStagePage-C1jt3v6O.js | 200 SPA shell |
| `/course/:courseId/sessions/pdf-annotate/:courseSessionId` | SplitLayout-t_NQ46MB.js | 200 SPA shell |
| `/course/:courseId/sessions/whiteboard/:courseSessionId` | WhiteboardPage-D7Ndg5mH.js | 200 SPA shell |
| `/course/:courseId/welcome` | CourseJourneyPage-DgJviJg0.js | 200 SPA shell |
| `/courses` | CoursesPage-BbyenZ-M.js | 200 SPA shell |
| `/deep-learn-session/:sessionId` | deepLearnSession-D1XsuBJn.js | 200 SPA shell |
| `/deep-learn-session/outline/:subtaskId` | DeepLearnSessionOutline-CxW4NH1I.js | 200 SPA shell |
| `/deep-learn-session/subtask_id/:subtaskId` | deepLearnSession-D1XsuBJn.js | 200 SPA shell |
| `/dev/csm` | __devCsmPreview-DScdU4JO.js | 200 SPA shell |
| `/forgot-password` | forgotPassword-3e5ciPne.js | 200 SPA shell |
| `/history` | StudyHistoryPage-C_ASJLRI.js | 200 SPA shell |
| `/inbox` | InboxPage-BfsYjdrg.js | 200 SPA shell |
| `/inbox/message/:messageId` | InboxMessagePage-B20bjE01.js | 200 SPA shell |
| `/knowledge-base` | knowledge_base-vdyPmbEX.js | 200 SPA shell |
| `/learning-feed` | proactive-BmEDcKEX.js | 200 SPA shell |
| `/marketplace` | MarketplacePage-BfF2z5q_.js | 200 SPA shell |
| `/marketplace/:courseId/preview` | MarketplacePreviewPage-BrEMOsV6.js | 200 SPA shell |
| `/onboarding` | Onboarding-cAGO2Z_k.js | 200 SPA shell (redirected URL to `/onboarding/`) |
| `/pdf-session/:sessionId` | SplitLayout-t_NQ46MB.js | 200 SPA shell |
| `/pricing` | subscription-BPidvGpU.js | 200 SPA shell |
| `/reset-password` | resetPassword-mL7k2-JQ.js | 200 SPA shell |
| `/response/:conversationId` | ChatResponsePage-B8jlcC8f.js | 200 SPA shell |
| `/response/course-generation/:courseUuid` | ChatResponsePage-B8jlcC8f.js | 200 SPA shell |
| `/sampleMindmapResponse` | SampleMindmapResponse-D5D9K8Os.js | 200 SPA shell |
| `/share/c/:conversationId` | SharedConversationPage-DOuWYgla.js | 200 SPA shell |
| `/share/course/:courseId` | SharedCoursePage-B9BtZtqq.js | 200 SPA shell |
| `/shared/c/:conversationId` | SharedConversationPage-DOuWYgla.js | 200 SPA shell |
| `/signin` | index-TjoB2Buo.js (vD) | 200 SPA shell |
| `/signup` | signUp-Bsi8Sjcr.js | 200 SPA shell |
| `/simulate-pro-success-purchase` | SimulateProSuccess-Do2m_abA.js | 200 SPA shell |
| `/subscription` | subscription-BPidvGpU.js | 200 SPA shell |
| `/success` | StripePaymentValidation-BHLxMsFf.js | 200 SPA shell |
| `/unsubscribe_email_list` | emailSubscriptionPage-CKBNY0Dx.js | 200 SPA shell |
| `/validate-success` | SimulateValidation-CV2oIk6G.js | 200 SPA shell |
| `/welcome-back` | WelcomeBackPage-DurSUQgD.js | 200 SPA shell |
| `/whiteboard/:sessionId` | WhiteboardPage-D7Ndg5mH.js | 200 SPA shell |

**Probe result:** 45 paths (including `/__devCsmPreview`, which is not a router literal) were GET-requested once each with no cookies/auth. Every response was HTTP 200, `text/html`, 4,427 bytes, title `Hyperknow`, and the same SPA shell. `/onboarding` returned the same shell after a trailing-slash URL normalization. Thus HTTP reachability does not imply that a route component rendered or that its protected data was available.

## Dev/test and hidden-page behavior

- `/dev/csm` is the actual route. `__devCsmPreview-DScdU4JO.js` is the chunk filename; `/__devCsmPreview` is not registered. The component is static: it renders `CourseStructureMap` with an embedded Chinese sample course (`courseUuid: "dev"`, title `大学物理 I：力学`, mechanics units u1/u2 and lecture/session data). No `fetch`, API endpoint, query read, localStorage/sessionStorage read, auth check, or mutation is present.
- `/simulate-pro-success-purchase` is presentation-only. It reads only query parameter `tier` via the router search-param hook (default `pro`), passes it to `ProSuccessCelebration`, and its continuation opens a modal; modal close navigates to `/`. No fetch, Stripe call, storage signal, or hidden trigger.
- `/validate-success` is presentation-only. It reads no query parameters and no browser storage. Initial state is `loading`; visible developer controls select `loading`, `error`, or `failure`. Error/failure controls include a support panel with `mailto:public-mail@hyperknow.io` and a localized subject. Retry only resets to loading; no network or payment action.
- `/success` is separate from `/validate-success`: `StripePaymentValidation-BHLxMsFf.js` is the real validation flow. It requires an access token and `session_id` query parameter and POSTs `CHECKOUT_SESSION_ID` to `/api/v1/stripe/validate-subscription`; not probed because the assignment permits GET/HEAD only except explicitly bounded POSTs and this is side-effecting/payment-related.
- `/coupon-code` consumes navigation state (`couponCode`/`couponCodes`) and redirects home if absent; no hardcoded coupon or client bypass found. `/welcome-back` is an animation/text page without a data fetch.

## Version/debug and integration inventory

- No client-visible `buildSha`, git SHA, build timestamp, `VITE_*` build ID, or `v1.3`-style application version was found across the 122 chunks. React Router library versions are embedded as `@remix-run/router v1.23.0`, React Router v6.30.1; lucide-react v0.546.0 and pako 2.0.3 are dependency versions, not app build identifiers.
- **Google Tag Manager:** container `GTM-K2K5MTZD`; script/iframe domains `www.googletagmanager.com` (`ED.js`/duplicate HTML entry chunks). `dataLayer` is initialized and signup success is queued by `dubAnalytics-BIiGXMVM.js`.
- **Dub analytics/affiliate:** `https://www.dubcdn.com/analytics/script`; `window.dubAnalytics` with `trackClick`, `trackLead`, `trackSale`; affiliate fields include `dub_portal_url`/`dub_click_id`. No Dub secret key.
- **Hyperknow API/WebSocket:** `https://api.hyperknow.io` and `wss://api.hyperknow.io` (application data plane; auth bearer token). **Supabase:** `https://mcpbxxrodqgsmatssajx.supabase.co`, embedded anon JWT in `index-TjoB2Buo.js`; application use is auth/session and Google OAuth redirect to `/auth/callback`, not database tables/storage calls.
- **Stripe/payment:** application endpoint `/api/v1/stripe/validate-subscription` and Stripe checkout/session terminology in the real success page. No Stripe SDK, publishable key, secret key, or test card was embedded. UI also contains an Alipay notice/payment option; no Alipay key/domain was identified.
- **Excalidraw/Firebase:** Excalidraw editor/library dependencies and collaboration domains (`json.excalidraw.com`, `libraries.excalidraw.com`, `excalidraw-room-persistence.firebaseio.com`, etc.); public Firebase web API key `AIzaSyAd15pYlMci_xIp9ko6wkEsDzAAA0Dn0RU` in `percentages-BXMCSKIN-CoqTm4Ai.js`.
- **Desmos:** calculator script `https://www.desmos.com/api/v1.8/calculator.js` with public API key `0a4005914de04d3793633232f8b2e00a`.
- **GitHub:** GitHub OAuth/API-related client code and GitHub rendering links in `github-BU76ptNE.js`; no GitHub client secret/key found.
- **Media/embed integrations:** YouTube (`youtube.com`), Vimeo (`player.vimeo.com`), Figma (`figma.com/embed`), Giphy (`giphy.com/embed`), Reddit/X/Twitter widgets and share URLs, LinkedIn/Facebook share URLs. These are user-content/embed links, not admin surfaces.
- **Status/edge:** `https://status.hyperknow.io` badge/site and `https://www.cloudflare.com/cdn-cgi/trace` network diagnostic. No PostHog, Sentry DSN/SDK, Intercom, Crisp, Segment, Amplitude, Mixpanel, PayPal, or chat-widget public key/config was identified (Sentry strings belong to bundled Excalidraw UI localization/error text).
