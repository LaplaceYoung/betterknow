# Frontend tool/feature registry (static bundle extraction)

Scope: all `js_bundles/*.js` production chunks; no live network calls. Offsets are byte/character offsets in the minified chunk (UTF-8 source is ASCII-compatible for the cited code). Primary registry evidence: `ChatResponsePage-B8jlcC8f.js@523562`.

## A. `Qv` registry (verbatim)

The following is copied verbatim from `ChatResponsePage-B8jlcC8f.js@523562` (the line is minified and therefore shown as one line):

```js
const Qv={select_prompts:"approach_step",ask_questions:"questions_step",content_planner:"content_planner_step",action_planner:"action_plan_step",directorAgent:"director_agent_step",get_skills:"get_skills_step",generate_content:"start_generate_content_step",search_files:"search_file_step",read_files:"read_file_step",read_content:"read_content_step",search_and_summarize_web:"search_web_step",analyze_url_content:"analyze_url_step",memory_recall:"memory_recall_step",publish_file:"file_publish_step",generate_flashcards:"generate_flashcards_step",generate_quiz:"generate_quiz_step",generate_instructional_video:"generate_video_step",generate_html_animation:"generate_diagram_step",generate_diagram:"generate_diagram_step",diagram_drawer:"generate_diagram_step",code_generator:"code_generator_step",clarification_planner:"clarification_planner_step",create_deep_learn_session:"generate_deep_learn_session_step",create_board_session:"generate_board_session_step",recommend_next_step:"recommend_next_step",generate_main_tasks:"generate_main_tasks_step",generate_cheatsheet:"generate_cheatsheet_step",course_generation:"course_generation_step"};
```

| # | Tool key | Display step ID | EN display label |
|---:|---|---|---|
| 1 | `select_prompts` | `approach_step` | Approach |
| 2 | `ask_questions` | `questions_step` | Questions |
| 3 | `content_planner` | `content_planner_step` | Making Plan |
| 4 | `action_planner` | `action_plan_step` | Agent is thinking |
| 5 | `directorAgent` | `director_agent_step` | Agent is thinking |
| 6 | `get_skills` | `get_skills_step` | Loading skills |
| 7 | `generate_content` | `start_generate_content_step` | Generating Content |
| 8 | `search_files` | `search_file_step` | Finding Files |
| 9 | `read_files` | `read_file_step` | Reading Files |
| 10 | `read_content` | `read_content_step` | Reading attachments |
| 11 | `search_and_summarize_web` | `search_web_step` | Searching Web |
| 12 | `analyze_url_content` | `analyze_url_step` | Analyzing URL Content |
| 13 | `memory_recall` | `memory_recall_step` | Recalling Memory |
| 14 | `publish_file` | `file_publish_step` | Publishing File |
| 15 | `generate_flashcards` | `generate_flashcards_step` | Generating Flashcards |
| 16 | `generate_quiz` | `generate_quiz_step` | Generating Quizzes |
| 17 | `generate_instructional_video` | `generate_video_step` | Generating Instruction Video |
| 18 | `generate_html_animation` | `generate_diagram_step` | Interactive visualization |
| 19 | `generate_diagram` | `generate_diagram_step` | Interactive visualization |
| 20 | `diagram_drawer` | `generate_diagram_step` | Interactive visualization |
| 21 | `code_generator` | `code_generator_step` | Code Generator |
| 22 | `clarification_planner` | `clarification_planner_step` | Considering User Request |
| 23 | `create_deep_learn_session` | `generate_deep_learn_session_step` | Creating Deep Learn Session |
| 24 | `create_board_session` | `generate_board_session_step` | Creating whiteboard session |
| 25 | `recommend_next_step` | `recommend_next_step` | Recommended Next Steps |
| 26 | `generate_main_tasks` | `generate_main_tasks_step` | Planning Study Tasks |
| 27 | `generate_cheatsheet` | `generate_cheatsheet_step` | Generating Cheatsheet |
| 28 | `course_generation` | `course_generation_step` | Crafting Course |

The registry is 28 entries, not ~21: it includes diagram aliases, code/clarification, study-planner tasks, cheatsheet, and course-generation entries. The three diagram aliases intentionally collapse to one display step.

## B. i18n display-step label pairs

The SPA's locale dictionaries are in `index-TjoB2Buo.js`. EN `stepTitles` starts at `@279449`; Simplified Chinese (`zh-CN`) starts at `@961405`. The complete EN/ZH pairs for every distinct display step referenced by `Qv` are:

| Display step key | EN | ZH (Simplified) |
|---|---|---|
| `approach_step` | Approach | 方法 |
| `questions_step` | Questions | 提问 |
| `content_planner_step` | Making Plan | 制定计划 |
| `action_plan_step` | Agent is thinking | 模型正在思考 |
| `director_agent_step` | Agent is thinking | 模型正在思考 |
| `get_skills_step` | Loading skills | 加载技能 |
| `start_generate_content_step` | Generating Content | 生成内容 |
| `search_file_step` | Finding Files | 查找文件 |
| `read_file_step` | Reading Files | 读取文件 |
| `read_content_step` | Reading attachments | 读取附件 |
| `search_web_step` | Searching Web | 搜索网络 |
| `analyze_url_step` | Analyzing URL Content | 分析链接内容 |
| `memory_recall_step` | Recalling Memory | 调取记忆 |
| `file_publish_step` | Publishing File | 发布文件 |
| `generate_flashcards_step` | Generating Flashcards | 生成闪卡 |
| `generate_quiz_step` | Generating Quizzes | 生成测验 |
| `generate_video_step` | Generating Instruction Video | 生成教学视频 |
| `generate_diagram_step` | Interactive visualization | 交互式可视化 |
| `code_generator_step` | Code Generator | 代码生成器 |
| `clarification_planner_step` | Considering User Request | 思考用户请求 |
| `generate_deep_learn_session_step` | Creating Deep Learn Session | 创建深度学习课程 |
| `generate_board_session_step` | Creating whiteboard session | 创建白板课堂 |
| `recommend_next_step` | Recommended Next Steps | 推荐后续步骤 |
| `generate_main_tasks_step` | Planning Study Tasks | 规划学习任务 |
| `generate_cheatsheet_step` | Generating Cheatsheet | 生成速查表 |
| `course_generation_step` | Crafting Course | 打造课程 |

`content_generation_step` also exists in the dictionary as `Generating Content` / `生成内容`, but is not a Qv value (the Qv value for `generate_content` is `start_generate_content_step`). The full source object additionally contains non-Qv keys such as `response`, `content`, and course status labels; those are not display steps referenced by Qv. Source: `index-TjoB2Buo.js@279449` (EN), `@961405` (ZH).

## C. Credit-cost strings

Static scan of all 122 chunks found no hardcoded numeric per-tool price (no literal such as `video costs 3 credits`, `animation costs N credits`, `deep learn costs N credits`, or `cheatsheet costs N credits`). All costs are runtime interpolations or server-provided quota values. The complete cost-bearing user-facing strings found are below; each is in the EN locale object at `index-TjoB2Buo.js` (the same keys are repeated in other locale dictionaries).

| Chunk@offset | i18n key | Label/value | Numeric cost? |
|---|---|---|---|
| `index-TjoB2Buo.js@247834` | `quota.actionNeedsCredits` | `This needs {{cost}} credits and you have {{remaining}}.` | Runtime `cost` |
| `index-TjoB2Buo.js@248331` | `quota.exhausted.needsCredits` | `This step needs {{cost}} credits, and you have {{remaining}} left.` | Runtime `cost` |
| `index-TjoB2Buo.js@249059` | `credits.courseCost_one` | `This course costs {{count}} credit` | Runtime `count` |
| `index-TjoB2Buo.js@249111` | `credits.courseCost_other` | `This course costs {{count}} credits` | Runtime `count` |
| `index-TjoB2Buo.js@249156` | `credits.courseCostHint` | `{{base}} credits to generate this course, plus {{perFile}} for each file you add` | Runtime `base`, `perFile` |
| `index-TjoB2Buo.js@247306` | `quota.messagesLeft` | `credits left` | No amount |
| `index-TjoB2Buo.js@247636` | `quota.tier` | `Tier. You have {{count}} credits left till {{time}}` | Runtime `count` |
| `index-TjoB2Buo.js@248245` | `quota.exhausted.noCreditsLeft` | `You have {{remaining}} credits left, so this step can't run just yet.` | Runtime `remaining` |
| `index-TjoB2Buo.js@248413` | `quota.exhausted.refillsAt` | `You'll have to wait until {{time}} before you get new credits.` | Runtime time, no cost |
| `index-TjoB2Buo.js@248488` | `quota.exhausted.refillsUnknown` | `You'll have to wait until your next billing cycle before you get new credits.` | No amount |
| `index-TjoB2Buo.js@248943/248983` | `credits.creditsLeft_one/other` | `{{count}} credit left` / `{{count}} credits left` | Runtime `count` |
| `index-TjoB2Buo.js@249015` | `credits.renewsAt` | `Credits renew {{time}}` | No amount |

Related non-price plan copy includes `subscription.maxPlan.feature3:"Lowest cost per credit"` at `index-TjoB2Buo.js@246201`, and `quota.exhausted.transcriptNote:"Out of credits — this step didn't run."` at `@248865`. Locale translations repeat these templates (for example Spanish `@391911`, Hindi `@547708`, Korean `@692755`, Urdu `@797472`, zh-CN `@941652`, zh-TW `@1028664`). No video/animation/course/deepLearn/cheatsheet-specific fixed numeric price was found; course cost is dynamic via `count/base/perFile`.

## D. Mode, speed, and integration enumerations

### Chat payload shape

`ChatResponsePage-B8jlcC8f.js@591800` constructs the outbound call with `file_info`, optional `mode`, optional `speed_mode`, optional `integrations`, and optional TTS/cheatsheet context. The same chunk's file-upload/tool state at `@618317` maps UI tool states to protocol values:

- UI tool state `deepLearnSession` -> `mode:"deep_learn_session"`.
- UI tool state `boardSession` -> `mode:"board_session"`.
- Integration checkbox `drive` appends literal `"drive"`.
- Integration checkbox `canvas` appends literal `"canvas"`.
- Only selected integrations are sent (array is omitted when empty).

`index-TjoB2Buo.js@1316411` shows the complete home composer construction: `l="deepLearnSession"===nt?"deep_learn_session":"boardSession"===nt?"board_session":void 0`, `c=[];Ke&&c.push("drive"),Je&&c.push("canvas")`, and `"fast"===V?{speed_mode:"fast"}:{}`. Therefore the frontend literals are:

| Field | Frontend values/effect | Citation |
|---|---|---|
| `mode` | `deep_learn_session`, `board_session`; omitted for normal chat (`undefined`) | `index-TjoB2Buo.js@1316411`; `ChatResponsePage-B8jlcC8f.js@618317` |
| `speed_mode` | `fast` when selected; otherwise omitted by composer and normalized to `normal` by client | `index-TjoB2Buo.js@1316411`; `index-TjoB2Buo.js@1123408` |
| UI speed state | `normal`, `fast` (menu buttons at `@1339789` and `@1340526/@1341204`) | `index-TjoB2Buo.js` |
| `integrations` | `drive`, `canvas` (array, only if selected) | `index-TjoB2Buo.js@1316411`; `ChatResponsePage-B8jlcC8f.js@618317` |
| `file_info` | array of `{file_id, filename}` from uploaded files | `ChatResponsePage-B8jlcC8f.js@618317` |

The WebSocket client constructor at `index-TjoB2Buo.js@1123408` stores `lastOutboundSpeedMode` as `"fast"===e.speed_mode?"fast":"normal"`, confirming the effective two-value speed union (`fast|normal`). No frontend literal `x`, `slow`, or other speed mode was found. `reply_language` is not present in the production chunks scanned; the client sends `ui_language` from the i18n language instead (`index-TjoB2Buo.js@1123408`).

### Other mode-like UI state

The tools selector state is `none | boardSession | studyPlanner` (normal/default, whiteboard, study planner), visible in the branch at `index-TjoB2Buo.js@1336446` and the two menu callbacks at `@1337838`. `studyPlanner` maps to the backend `generate_main_tasks` behavior rather than a `mode` literal in the chat payload; the actual payload mapping shown at `@1316411` only emits the two protocol modes above.

## E. Tools-selector menu reconstruction

The composer button is explicitly `aria-label:"Tools selector"` at `index-TjoB2Buo.js@1336446` (home) and `ChatResponsePage-B8jlcC8f.js@624959` (response composer). The home dropdown implementation at `index-TjoB2Buo.js@1337838` has exactly two menu entries:

| User-forceable menu item | UI state callback | i18n label | Gating/upgrade mark |
|---|---|---|---|
| Whiteboard session | `at("boardSession")` | `home.boardSession` (EN: `Whiteboard session`) | No upgrade mark or tier check in menu block |
| Study Planner | `at("studyPlanner")` | `home.studyPlanner` (EN: `Study Planner`) | No upgrade mark or tier check in menu block |

The response composer dropdown at `ChatResponsePage-B8jlcC8f.js@626203` contains one directly selectable entry, Whiteboard session (`ee("boardSession")`, `home.boardSession`). The selected-state icon/text branches distinguish `boardSession` vs `deepLearnSession` (`@625188`), but there is no direct Deep Learn menu button in this response-composer dropdown; Deep Learn can be selected in the home composer and is represented by `home.deepLearnSession`.

No `Upgrade`/`upgrade` mark, paid badge, or tier gate appears in either tools-dropdown implementation. The tooltip strings are `home.boardSessionTooltip` and `home.studyPlannerTooltip` (home block `@1337838`), and `home.deepLearnSessionTooltip` is defined in the locale dictionary near `index-TjoB2Buo.js@315118`. The menu is therefore user-forceable for the listed entries; all other Qv tools are agent/tool-execution registry entries, not user-forceable Tools-selector items.

## F. Explicit not-found notes

- **No fixed per-tool credit table:** not found across all 122 chunks. Costs are server/runtime interpolations (`cost`, `remaining`, `count`, `base`, `perFile`).
- **No `reply_language` frontend field/union:** not found. Frontend sends `ui_language`; do not infer a `reply_language` value set from these bundles.
- **No additional speed modes:** no `x`, `slow`, or third speed literal found; effective frontend values are `normal` and `fast`.
- **No Tools-selector Upgrade markers:** not found in the home or response composer menu blocks.
- **No `chatTools` / `displayStep` / `agentSteps` translation namespace:** not found. The actual namespace is `chatResponse.stepTitles` (the `stepTitles` object in `index-TjoB2Buo.js`).
- **No numeric video/animation/deepLearn/cheatsheet cost labels:** not found; only generic dynamic quota strings and dynamic course-cost templates were present.
