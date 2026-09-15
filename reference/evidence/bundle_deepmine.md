# Hyperknow production bundle deep mine

Scope: 122 downloaded JavaScript chunks under `js_bundles/`. Static-only review; no application API requests were made. Every observation below cites the bundle filename containing the string or logic.

## Prompts

- No verbatim internal system prompt, model instruction, or role template was found. Searches for `system prompt`, `You are`, `as an AI`, `gemini`, `claude`, and `gpt` found no embedded provider/system prompt text in the app logic. The only prompt-adjacent display/transport fields are `guideline` and `model_name`: `ChatResponsePage-B8jlcC8f.js` trims `e.guideline` for `generate_content` and maps `e.model_name` through a model-display helper before rendering.
- The home UI embeds display-level learning prompts/examples, not hidden model instructions: `index-TjoB2Buo.js` contains examples such as `Create a Deep Learn Session to help me learn Python from the ground up`, `I want to learn about moment of inertia step-by-step`, and `Look into my Canvas, and generate a set of quizzes and flashcards from the lecture slides`.
- Additional display prompt templates in `index-TjoB2Buo.js` include `Generate 20 flashcards for all the key terms in my Molecular Biology unit`, `Make a set of quizzes according to this past exam`, and `Summarize Chapter 8 of this textbook into a clean study note`.
- User-facing learning preference guidance is embedded in `index-TjoB2Buo.js`: `Use simple terms...`, `Provide examples or analogies first...`, `Break it down step-by-step`, `Conceptual structure & big picture`, and `Multiple explanations/angles`. These are UI preference descriptions, not a system prompt.

## Tool registry

The frontend registry is in `ChatResponsePage-B8jlcC8f.js` (`Qv`). It maps tool names to presentation step IDs:

| Tool | Frontend step ID / display label |
|---|---|
| `select_prompts` | `approach_step` / Approach |
| `ask_questions` | `questions_step` / Questions |
| `content_planner` | `content_planner_step` / Making Plan |
| `action_planner` | `action_plan_step` / Agent is thinking |
| `directorAgent` | `director_agent_step` / Agent is thinking |
| `get_skills` | `get_skills_step` / Loading skills |
| `generate_content` | `start_generate_content_step` / Generating Content |
| `search_files` | `search_file_step` / Finding Files |
| `read_files` | `read_file_step` / Reading Files |
| `read_content` | `read_content_step` / Reading attachments |
| `search_and_summarize_web` | `search_web_step` / Searching Web |
| `analyze_url_content` | `analyze_url_step` / Analyzing URL Content |
| `memory_recall` | `memory_recall_step` / Recalling Memory |
| `publish_file` | `file_publish_step` / Publishing File |
| `generate_flashcards` | `generate_flashcards_step` / Generating Flashcards |
| `generate_quiz` | `generate_quiz_step` / Generating Quizzes |
| `generate_instructional_video` | `generate_video_step` / Generating Instruction Video |
| `generate_html_animation` | `generate_diagram_step` / Interactive visualization |
| `create_deep_learn_session` | `generate_deep_learn_session_step` / Creating Deep Learn Session |
| `create_board_session` | `generate_board_session_step` / Creating whiteboard session |
| `recommend_next_step` | `recommend_next_step` / Recommended Next Steps |

`ChatResponsePage-B8jlcC8f.js` renders result-specific fields: flashcards use `data.flashcards`, `total_count`, and `model_used`; quizzes use `data.questions`, `total_count`, and `model_used`; deep-learn sessions use `deep_learn_session_id`, `deep_learn_session_url`, and `task_plan`; recommendations use `data.next_steps`. `generate_content` accepts/render-tracks `guideline`, `model_name`, `task_title`, `response_style`, `sources`, and `referenced_files` when present. No tool icon registry, per-tool credit price, or client-side parameter schema was found.

## Flags & gating

- `index-TjoB2Buo.js` defines `Tm=()=>!0` and `Pm=()=>!0` (hardcoded enabled booleans). The same bundle defines `Am=()=>"true"===(wm?.VITE_ORBIE_SUGGESTION_BOX_ENABLED)`, so the Orbie suggestion box is explicitly environment-gated.
- `index-TjoB2Buo.js` includes `VITE_INBOX_ENABLED` gating: the sidebar inbox is rendered only when the value equals the string `true`.
- The bundle's tier normalization accepts `FREE`, `PRO`, `MAX`, maps `TRIAL_PRO` to `PRO`, and defaults to `FREE` (`index-TjoB2Buo.js`). A client helper `Xm` treats free users specially when `t+n>10` (the relevant free file-upload guard).
- Tier/credit UI is driven primarily by server-returned subscription fields, not a static limits table: `index-TjoB2Buo.js` normalizes `tier`, `remaining_credits`, `max_credits`, and `will_reset_at`; `subscription-BPidvGpU.js` computes relative credit capacity from `max_credits/reset_interval_hours`.
- Visible limit strings in `index-TjoB2Buo.js` include free upload up to `{{limit}}` files per query, weekly file-generation and upload limits, weekly calendar-add limits, and a weekly Deep Learn session limit. `DeepLearnSessionOutline-CxW4NH1I.js` blocks starting a subtask when returned `deep_learn_session.remaining<=0` and displays returned `limit`/`used`; `proactive-BmEDcKEX.js` displays a default weekly limit of 5 when quota data is absent.
- No hardcoded per-action credit-cost map or per-tier numeric limits table was found in the 122 chunks. Credit exhaustion UI is present (`index-TjoB2Buo.js`) and receives a `cost`/`remaining` message, but the actual cost is supplied by runtime/server data.
- `percentages-BXMCSKIN-CoqTm4Ai.js` contains third-party Excalidraw `VITE_*` build configuration, including public Firebase `AIzaSyAd15pYlMci_xIp9ko6wkEsDzAAA0Dn0RU`; this is an embedded third-party public web configuration, not a Hyperknow secret.

## Hidden surface

- Route literals are present in `index-TjoB2Buo.js`: `/simulate-pro-success-purchase`, `/validate-success`, `/coupon-code`, `/welcome-back`, and `/dev/csm`. The same bundle lazy-loads `SimulateProSuccess-Do2m_abA.js`, `SimulateValidation-CV2oIk6G.js`, `StripePaymentValidation-BHLxMsFf.js`, `CouponCodePage-B7gFDJHw.js`, `WelcomeBackPage-DurSUQgD.js`, and `__devCsmPreview-DScdU4JO.js`.
- `SimulateProSuccess-Do2m_abA.js` is a presentation-only simulator: it renders `ProSuccessCelebration` using the URL `tier` query parameter (default `pro`) and opens the celebration continuation modal; the continuation navigates to `/`. No fetch or payment call is present.
- `SimulateValidation-CV2oIk6G.js` is a presentation-only state simulator. It exposes local buttons for `loading`, `error`, and `failure`, plus a support panel linking `public-mail@hyperknow.io`; no fetch, Stripe call, card number, or bypass is present.
- `StripePaymentValidation-BHLxMsFf.js` is not a bypass: it requires the stored access token and `session_id` query parameter, then POSTs `CHECKOUT_SESSION_ID` to `/api/v1/stripe/validate-subscription`; it retries for up to roughly eight seconds and only shows success when the response has `success` and subscription details. This is a side-effecting validation flow if mounted, but it is not a read-only endpoint.
- `CouponCodePage-B7gFDJHw.js` only consumes navigation state (`couponCode` or `couponCodes`), redirects to `/` when absent, and displays the coupon celebration. The actual redemption is elsewhere in `index-TjoB2Buo.js` and uses a POST endpoint; no client-side coupon bypass or hardcoded coupon code was found.
- `WelcomeBackPage-DurSUQgD.js` is presentation-only (welcome-back animation/video and localized text); no API call or bypass logic found.
- `__devCsmPreview-DScdU4JO.js` is a static developer preview mounted at `/dev/csm`. It embeds a sample Chinese university physics course structure (`courseUuid:"dev"`, seven-unit mechanics description) and renders `CourseStructureMap`; no fetch or mutation is present.
- No test Stripe card numbers (including `4242`) were found in the targeted hidden/payment chunks or across the bundle set.

## Secrets & test data

- **Supabase anon JWT (embedded client credential; public/anon role):** exact value is in `index-TjoB2Buo.js` beside `new AT("https://mcpbxxrodqgsmatssajx.supabase.co", ...)`: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1jcGJ4eHJvZHFnc21hdHNzYWp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkyNTQ3NjAsImV4cCI6MjA2NDgzMDc2MH0.Fx3XjIFnXu0wDfTFbXp1Xnx6pO9fHVlQg28Lccyanhg`.
- **Third-party public Firebase API key:** `percentages-BXMCSKIN-CoqTm4Ai.js` contains `AIzaSyAd15pYlMci_xIp9ko6wkEsDzAAA0Dn0RU` inside Excalidraw's public Firebase configuration.
- **Desmos public API key:** `historyConversationDataParser-f81MQw9L.js` contains `apiKey=0a4005914de04d3793633232f8b2e00a` in the Desmos calculator script URL.
- No Supabase `service_role` marker, Stripe secret/live/test key (`sk_`/`pk_test_`/`pk_live_`), SendGrid key, AWS access key, or Dub secret key was found. `dub_portal_url` and `dub_click_id` in `index-TjoB2Buo.js` are tracking/affiliate fields, not credentials.
- Email literals found are support/contact addresses only: `contact@hyperknow.io` (`index-TjoB2Buo.js`, `ChatResponsePage-B8jlcC8f.js`, `ProSuccessCelebration-BLjYKG3E.js`), `public-mail@hyperknow.io` (`index-TjoB2Buo.js`, `SimulateValidation-CV2oIk6G.js`, `StripePaymentValidation-BHLxMsFf.js`), and `founders@hyperknow.io` (`index-TjoB2Buo.js`). No test/admin/demo account email or password literal was found.
- Password matches are browser/PDF/auth-library vocabulary and form labels (`index-TjoB2Buo.js`, `signUp-Bsi8Sjcr.js`, `forgotPassword-*`, `resetPassword-*`), not embedded credentials. The signup bundle enforces a minimum eight-character password and mixed-character rules (`signUp-Bsi8Sjcr.js`).

## Supabase surface

- Project URL: `https://mcpbxxrodqgsmatssajx.supabase.co`, embedded in `index-TjoB2Buo.js`.
- Anon key: the JWT listed in **Secrets & test data**, embedded beside the project URL in `index-TjoB2Buo.js`.
- Application-level Supabase use found: `NT.auth.signInWithOAuth({provider:"google", ...})`, `NT.auth.getSession()`, and Google-user metadata/session handling in `index-TjoB2Buo.js`. The redirect is `${window.location.origin}/auth/callback` with OAuth `access_type:"offline"` and `prompt:"consent"`.
- No application-level `.from(...)`, `.rpc(...)`, `.storage.from(...)`, bucket name, storage upload/download, or named realtime channel was found. Matches for `from`, `rpc`, `channel`, and `storage/v1` elsewhere are Supabase client-library method definitions/internal URL construction or unrelated library code, not calls made by Hyperknow application code.
- The primary Hyperknow data plane remains the API/WS origin embedded in `index-TjoB2Buo.js`: `https://api.hyperknow.io` and `wss://api.hyperknow.io`; this report does not probe either service.

## Sourcemaps

- No production chunk contains a `sourceMappingURL` directive or a literal URL/path ending in `.map` after scanning all 122 `.js` files. The many `.map(...)` hits are JavaScript array/string method calls and are not sourcemap references.
- Therefore there were no sourcemap candidates to HEAD-check on `agent.hyperknow.io`. No live request was made.
