# IndexApp

源模块：`index-TjoB2Buo.src.js`（inline SignIn `vD`、Home `Wx`、legacy shared redirect `P$`）；路由 `/signin`、`/`、`/shared/c/:conversationId`。

## Endpoint
- Sign in：`POST /api/v1/auth/login` body `{email,password}`；响应 `data.{access_token,refresh_token,user_id,username}`、`onboarding_completed`、`onboarding_status.{general_onboarding,proactive_onboarding}`。Google 使用 Supabase `signInWithOAuth({provider:'google',redirectTo: origin+'/auth/callback'})`。
- Home 附件：`POST /api/v1/upload_file` multipart `{file}`；Craft Courses `POST /api/v1/course-generation/uploads` multipart `{file,course_uuid?}`；founder 附件 `POST /api/v1/upload_public_files` multipart `{file}`。
- Home 数据：`GET /api/v1/dailyTrends`、`GET /api/v1/auth/other_function_usage_limits`；侧栏/设置还调用 conversation/course/deep-learn/memory/subscription helpers。

## WS
- Instant Assistance：`wss://…/api/v1/ws?token=`；发送 `user_message{message,ui_language,file_info?,mode?,speed_mode?,integrations?,tts_enabled?}`，消费 `connection_established,conversation_created,pong`，随后进入 ChatResponsePage。
- Craft Courses：`wss://…/api/v1/course-generation/ws?access_token=`；发送 `start_course_generation{query,ui_language,course_uuid,attachment_paths,course_source_mode,interactive_structure:true}`；后续 `resume_course_generation,course_generation_answers,course_generation_answer_draft,course_structure_confirm,stop_course_generation`。

## State
- Sign in：email/password、showPassword、submitting/googleLoading、error/success、return route `location.state.from.pathname`。
- Home：tab `craftCourses|instantAssistance`、两个 prompt、source `self_study|school_sync`、uploads/courseUuid、tools `none|studyPlanner|boardSession|deepLearnSession`、integrations drive/canvas、speed/voice、daily trends、credits/modals。
- localStorage：`access_token,refresh_token,user_id,username,token_timestamp,onboarding_completed,onboarding_general,onboarding_proactive,conversation_history,recent_course_activity,subscription_tier`；sessionStorage `new_conversation_{conversationId}`。

## Controls
- Sign in：Email `#email`、Password `#password`、Show/Hide password、Sign In、Sign in with Google、Forgot password、Sign up、service status iframe。
- Home：Craft Courses/Instant Assistance tabs、prompt/input、Course source radiogroup、upload cards、Drive/Canvas toggles、Tools selector、voice/speed、Send/Generate、daily trends、course tickets、sidebar/settings/invite。

## Navigate
- Sign in：完成双 onboarding 回 return route（默认 `/`）并 state `{fromLogin:true}`；未完成 `/onboarding`；Forgot `/forgot-password?email=`；Sign up `/signup`；OAuth `/auth/callback`。
- Home：未登录 `/signin`；instant 创建 `/response/{conversationId}`；课程创建 `/response/course-generation/{courseUuid}`；课程 ticket `/course/{uuid}` 或 marketplace preview；侧栏 `/courses,/history,/knowledge-base,/learning-feed,/subscription,/inbox`。
- Legacy `/shared/c/:conversationId` 规范化后 redirect 到 `/share/c/:conversationId`（保留 query/hash）。
