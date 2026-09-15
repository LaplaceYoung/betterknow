# PracticePage

源模块：`PracticePage-CfhffZeL.src.js`（default `K`）；路由 `/course/:courseId/practice/:sessionId`。

## Endpoint
- `GET /api/v1/course-generation/courses/{course_uuid}/practice`（Bearer）；按 session id 取 questions。
- `POST .../practice/progress` body `{sessionId,finished,items,score,perfect,stars}`；`items` 以 question id 为 key，值含 `{state,answer,fast?}`。
- `POST .../practice/check-fill` body `{sessionId,questionId,answer}`。
- `POST .../practice/assistant` multipart：`session_id,question_id?,messages(JSON),images*`；消费流式 body。
- TTS：`GET .../practice/tts/prewarm`；`GET .../practice/sessions/{session_id}/questions/{question_id}/tts?speed=&voice_id=`。

## WS
- 无。
## State
- status、题组/current index、单选/多选/填空答案、checked/correct/feedback、分数/三星、elapsed time；assistant chat/images、narration；voice prefs `{voiceId,speed}` 来自 localStorage 动态 key `ttsVoiceConfig:{userId}`（helper `voicePrefs-rmmbxoX2`）。

## Controls
- Answer options radiogroup/checkbox（aria `Answer options`, `Select {option}`）；Check、Next、Previous、Finish、Try again；Narration、Assistant 输入/图片上传；Exit practice。

## Navigate
- Exit/back `/course/{courseId}`；缺 course id 返回 `/courses`。
