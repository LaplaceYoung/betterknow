# WhiteboardPage

源模块：`WhiteboardPage-D7Ndg5mH.src.js`（named `WhiteboardPage`）；路由 `/whiteboard/:sessionId`、`/course/:courseId/sessions/whiteboard/:courseSessionId`。

## Endpoint
- `GET /api/v1/whiteboard/course-outlines`；课程 session `GET .../course-outlines/{courseUuid}/sessions`；附件 `POST /api/v1/upload_file` multipart `{file}`。
- 白板内容主要走 WS；REST prefix `/api/v1/whiteboard` 还供语音/诊断 helper 使用。

## WS
- `wss://…/api/v1/whiteboard/ws?access_token=`。
- 发送 `start_session,resume_session,resume_or_start_course_session,user_message{message,pivot?,lecture_outline_id?,attachments?,answer?,audio_*},set_lecture_outline,set_tts_config,action_step_complete,narration_pause,sync_whiteboard_state,pause_session,resume_generation,start_teaching,question_answers,step_completion_response,stop_generation,interject_*,ping`。
- 消费 `connection_established,session_ready,lecture_outline_selected,tts_config,group,board,new_page/new_column,highlight,circle,graph,ask,reward_user,image_gen_*/generated_image,animation_*/generated_animation,reference_reading_*,keypoint_complete,done,response_complete,session_paused,interject_*,voice_transcript,speak,tts_segment,insufficient_funds,error`。

## State
- localStorage `whiteboard_session_id`、`ttsVoiceConfig:{userId}`。

## Controls
- board toolbar/zoom/pages、outline chooser、chat/send/stop/upload、Start teaching/Pause/Resume、voice/settings、question answers、Exit session、feedback。

## Navigate
- 课程退出 `/course/{courseId}` 或 `/courses`；独立 session 返回 `/`；额度升级 `/subscription`。
