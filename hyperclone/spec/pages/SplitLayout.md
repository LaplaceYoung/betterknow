# SplitLayout

源模块：`SplitLayout-t_NQ46MB.src.js`（named `SplitLayout`）；路由 `/pdf-session/:sessionId`、`/course/:courseId/sessions/pdf-annotate/:courseSessionId`。

## Endpoint
- 列表：`GET /api/v1/pdf-annotation/sessions`、`GET /api/v1/pdf-annotation/course-outlines`、`GET .../course-outlines/{course_uuid}/sessions`。
- PDF：`GET /api/v1/pdf-annotation/pdf/{session_id}/{file_id}?access_token=`；上传 `POST /api/v1/pdf-annotation/upload` multipart `{file,session_id}`。
- 聊天附件 `POST /api/v1/upload_file` multipart `{file}`；引用 `GET /api/v1/citation/files/{fileId}`。

## WS
- `wss://…/api/v1/pdf-annotation/ws?access_token=`。
- 发送 `start_session,resume_session{session_id},resume_or_start_course_session{course_session_id},select_course_session,user_message{message,pivot?,attachments?,answer?,audio_*},action_step_complete,action_step_received,sync_pdf_state{pdf_state,board_state?},navigate_page{page},user_continue,start_teaching{page?},set_tts_config,stop_generation,interject_*`。
- 消费 `session_ready,assistant_timeline,status,action_step_received/action_step_complete,navigate_page,go_to_next_document,go_to_previous_document,interject_*,model_probe_*,pong,error`。

## State
- localStorage：`pdf_session_id`、`pdfTutor.autoFocusEnabled`、`ttsVoiceConfig:{userId}`。

## Controls
- PDF toolbar（Previous/Next document/page、zoom、download）、annotation/selection follow-up；chat input/send/stop、Start teaching、voice/settings、upload、course outline。

## Navigate
- 退出课程 `/course/{courseId}` 或 `/courses`；独立会话回 `/`。
