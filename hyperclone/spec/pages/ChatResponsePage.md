# ChatResponsePage

源模块：`ChatResponsePage-B8jlcC8f.src.js`（default `$b`）；路由 `/response/:conversationId`、`/response/course-generation/:courseUuid`。

## Endpoint
- `POST /api/v1/conversations/get_conversation_data` body `{conversation_id}`；读取历史。
- `GET /api/v1/course-generation/generation-history/{conversation_id}`（可选回放）。
- `GET /api/v1/citation/files/{fileId}`（Bearer）下载 PDF 引用。
- `POST /api/v1/conversations/save_artifact`（Bearer）body `{conversation_id,artifact_id,content,layout_patch?}`；WS save_artifact 失败时回退 REST。
- 共享操作调用 `GET /api/v1/share_record/check_shared_status?shared_object_id=`，创建共享 `POST /api/v1/share_record/share_records` body `{type:'conversation',shared_object_id,shared_with:{share_to_everyone:true}}`。

## WS
- 已有对话直连 `wss://…/api/v1/ws?conversation_id={id}&token={token}`；主页新建会话 client 使用 `wss://…/api/v1/ws?token={token}`；课程生成使用 `/api/v1/course-generation/ws?access_token=`。
- 消费 `conversation_resumed, conversation_created, credit_status, conversation_title_updated, tool_selection, tool_execution, thinking/thinking_chunk, content_chunk, inline_diagram, complete, error`；choice/question 数据形如 `question_data.questions[]`，工具完成数据挂在 `data`。
- 发送 `user_message`、`save_artifact`、`stop_generation`、`question_answers` 等；course generation 共享主通道帧见 `CourseJourneyPage`。

## State
- 对话 `conversationHistory/currentResponse`；加载、流式、停止、额度 (`credit_info`,`next_reset_time`)；工具/制品编辑、引用预览、回答问题。
- localStorage：`conversation_history`、`recent_course_activity`；`cheatsheet-fullscreen-editor-width-px-v2`、`cheatsheet-tip-never-show`；动态草稿 key `ge`（按会话/制品生成）；自动保存宽度。

## Controls
- 输入框 placeholder `chat.placeholder`、Send、Stop generating。
- Share conversation；引用 Preview controls/Zoom in/Zoom out/Next page/Previous page/Close；工具 selector、Scroll to bottom；rate-limit cancel/upgrade。

## Navigate
- 未认证 `/signin`；额度不足通过 subscription modal `/subscription`。
- 课程生成完成打开 `/response/course-generation/{courseUuid}` 或课程页；侧栏历史、设置、分享按 bundle 路由 helper 跳转。
