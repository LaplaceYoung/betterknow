# DeepLearnSession

源模块：`deepLearnSession-D1XsuBJn.src.js`（default `J`）；路由 `/deep-learn-session/:sessionId`、`/deep-learn-session/subtask_id/:subtaskId`。

## Endpoint
- `POST /api/v1/deep_learn/get_session_data` body `{deep_learn_session_id}`，返回历史/步骤。
- subtask 解析 `GET /api/v1/calendar/deep_learn_subtask_session?subtask_id=`，返回 `{session_id}` 后 replace 到 session URL。
- 错误诊断 `POST /api/v1/error/add_error_log`；附件/内容工具由聊天共享 API 处理。

## WS
- `wss://…/api/v1/deep_learn/ws?session_id={id}&token=` 或 `?subtask_id={id}&token=`。
- 发送 `user_message`、`enter_new_step{step_id}`、`step_completion_response{action}`、`mark_step_complete{step_id}`、`stop_generation`。
- 消费 `deep_learn_session_created,tool_selection,thinking,thinking_chunk,agent_response,code_chunk,code_output,tool_execution,step_completion,content_chunk,inline_diagram,inline_image_search,streaming_complete,complete,stopped,user_question,insufficient_funds,error`；工具块含 search/file/flashcard/quiz/image/html/mermaid/desmos/recommendations。

## State
- session/subtask ids、plan/current/next step、history blocks、streaming/stopped/error、question answers、files、completion/feedback、credit modal；无本模块 localStorage。

## Controls
- step outline/radios、message editor/send/stop、question choices、Proceed/Later/mark complete、attachments、artifact controls、Upgrade。

## Navigate
- subtask resolve 后 `replace('/deep-learn-session/{sessionId}')`；未登录 `/signin`；Upgrade `/subscription`；完成/退出 `/learning-feed`。
