# Hyperknow i18n dictionary index

Source: `js_bundles/index-TjoB2Buo.js`. Dictionaries were extracted from the bundle's locale namespace registry and emitted as readable JSON. `en.json` and `zh-CN.json` are complete merged locale trees; Spanish, Hindi, Korean, Urdu, and Traditional Chinese are included as additional extracted locales.

## Locale files

| Locale | File | Top-level namespaces | Leaf keys |
|---|---|---:|---:|
| English | `assets/i18n/en.json` | 74 | 2,929 |
| Simplified Chinese | `assets/i18n/zh-CN.json` | 74 | 3,296 |
| Spanish | `assets/i18n/es.json` | 74 | 3,334 |
| Hindi | `assets/i18n/hi.json` | 74 | 3,334 |
| Korean | `assets/i18n/ko.json` | 74 | 3,296 |
| Urdu | `assets/i18n/ur.json` | 74 | 3,334 |
| Traditional Chinese | `assets/i18n/zh-TW.json` | 74 | 3,296 |

Leaf counts include nested object values and array entries. Some locale dictionaries contain plural variants (`_one`, `_other`) and a few locale-specific keys.

## English namespace inventory

| Namespace | Keys | Namespace | Keys |
|---|---:|---|---:|
| `auth` | 41 | `subscription` | 30 |
| `quota` | 21 | `credits` | 6 |
| `paymentValidation` | 29 | `proSuccess` | 2 |
| `alipayNotice` | 4 | `coupon` | 15 |
| `invite` | 20 | `affiliate` | 22 |
| `planChange` | 43 | `canvas` | 17 |
| `canvasUpdateCard` | 39 | `canvasManage` | 7 |
| `canvasFileExplorer` | 35 | `canvasConnectionModal` | 43 |
| `canvasSyncModal` | 33 | `canvasStateWindow` | 24 |
| `canvasActivityList` | 10 | `sessionDetailPanel` | 23 |
| `chatResponse` | 63 | `boardSessionBlock` | 6 |
| `cheatsheetEditor` | 87 | `cheatsheetCard` | 45 |
| `cheatsheetUsageTip` | 4 | `sidebar` | 44 |
| `inbox` | 15 | `fileCard` | 4 |
| `validation` | 5 | `discord` | 8 |
| `downloadGuard` | 7 | `browserWarning` | 9 |
| `tts` | 9 | `common` | 7 |
| `appToast` | 4 | `rateLimitNotice` | 2 |
| `courseSession` | 85 | `courses` | 17 |
| `courseJourneySidebar` | 1 | `extendCourseEntry` | 2 |
| `studyHistory` | 35 | `courseIntro` | 5 |
| `courseJourney` | 47 | `courseNextStep` | 4 |
| `courseExtend` | 28 | `journeyTicket` | 2 |
| `marketplacePage` | 15 | `projectStage` | 29 |
| `courseFeedback` | 1 | `courseStructureMap` | 50 |
| `deepLearnSessionBlock` | 10 | `deepLearnOutline` | 11 |
| `deepLearnSessionPage` | 15 | `emailPreferences` | 12 |
| `home` | 103 | `knowledgeBase` | 79 |
| `netCheck` | 14 | `onboarding` | 88 |
| `onboardingNew` | 9 | `welcome` | 16 |
| `pdfAnnotation` | 10 | `practice` | 13 |
| `exam` | 9 | `proactive` | 98 |
| `settings` | 108 | `accountDropdown` | 4 |
| `share` | 24 | `sharedConversationPage` | 8 |
| `pendingTasks` | 29 | `taskDetail` | 51 |
| `practiceReminder` | 5 | `sectionComplete` | 4 |
| `whatsNew` | 8 | `whiteboard` | 10 |

The bundle's source namespace files are merged into one locale tree, matching the runtime i18next resource assembly. `chatResponse.stepTitles.generate_quiz_step` is `Generating Quizzes` in EN and `生成测验` in ZH-CN; all display-step labels (including `content_generation_step`) are retained.

## Product/function information inferred from UI copy

- **Quota and monetization:** `quota`, `credits`, `subscription`, `planChange`, `paymentValidation`, `alipayNotice`, `coupon`, `invite`, and `affiliate` describe credit balances/resets, dynamic action costs, free/Pro/Max tiers, Stripe verification, Alipay/WeChat one-off billing, coupons, referrals, and affiliate commissions. Copy explicitly says free users can upload up to 10 files per query; Pro removes that per-query limit; costs are runtime interpolations rather than a fixed per-tool price table.
- **Agent and learning modes:** `home` advertises normal assistance, Fast Mode, Deep Learn Session, Study Planner, and Whiteboard session. Deep Learn is unit-based and step-by-step; Study Planner creates actionable learning tasks and calendar entries; whiteboard can narrate a conversation or walk through a PDF.
- **Agent tools and response rendering:** `chatResponse` exposes action/progress labels for searching files/web, URL analysis, memory recall, publishing, flashcards, quizzes, instructional videos, code generation, diagrams, course generation, and recommended next steps. `fileCard`, `validation`, `citation`-related strings, and `blocks` describe attachments, citations, Mermaid, HTML animation, images, quizzes, flashcards, and an executable code sandbox.
- **Course generation:** `courseSession`, `courses`, `courseJourney`, `courseExtend`, `courseIntro`, `courseStructureMap`, `projectStage`, and `courseFeedback` indicate multi-session/unit courses, milestones, projects/exams, learning journeys, extension, feedback, and generated course structure maps. `courseGeneration` copy includes document ingestion, web research, initial outline, refinement, session estimates, cancellation, resume, and shared-course joining.
- **Whiteboard and practice:** `whiteboard` includes syllabus/artifact tabs, references, note cards, quizzes, Mermaid diagrams, illustrations, animations, audio controls, quick checks, and practice sections. `practice`, `exam`, `practiceReminder`, and `sectionComplete` indicate generated practice questions, mastery after a perfect run, exams, and lecture/project completion states.
- **Canvas and knowledge sources:** `canvas*` namespaces cover Canvas LMS credentials, course/file browsing, selecting source files, auto-sync, scheduled runs, activity history, session detail, and generated output. `knowledgeBase` covers user-managed source files, uploads, search, and agent auto-sourcing; `integrations` copy also references Google Drive/Calendar and Canvas.
- **Memory and personalization:** `onboarding`, `onboardingNew`, `welcome`, and `settings` expose acquisition questions, learning preferences, profile answers, conversation memory, saved/external memory, and clearing learned memories while retaining onboarding profile answers.
- **Tasks and productivity:** `pendingTasks`, `taskDetail`, `tasks`-adjacent copy in `courseSession`/`calendar` strings describes extracted due dates, subtasks, comments, confirmation/rejection, generated materials, scheduling, and Google Calendar synchronization.
- **Sharing and community:** `share` and `sharedConversationPage` support private/public conversation and course links, email invitations, joining shared courses, and starting a learning journey. `marketplacePage` and `discord` indicate course discovery and community access.
- **Proactive and accessibility/system UX:** `proactive` contains assistant recommendations and notification flows; `netCheck`, `browserWarning`, `downloadGuard`, `rateLimitNotice`, and `errors` cover network/browser checks, download gating, rate limits, and recoverable failures. `tts` and whiteboard message strings indicate text-to-speech/audio playback and transcription.
