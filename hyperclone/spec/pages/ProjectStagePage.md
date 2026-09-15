# ProjectStagePage

源模块：`ProjectStagePage-C1jt3v6O.src.js`（default `k`）；路由 `/course/:courseId/project/:stageId`。

## Endpoint
- `GET /api/v1/course-generation/courses/{course_uuid}/project`；`GET .../project/stages/{stage_id}/state` 返回 `{submissions,drafts}`。
- 草稿 `POST .../steps/{step_id}/draft` body `{text}`。
- 提交：multipart `POST .../steps/{step_id}/submission` field `file`，或 JSON `POST .../submission/text` body `{text}`。
- assistant multipart `POST .../project/assistant` fields `stage_id,step_index?,messages(JSON),images*`。
- TTS：`GET .../project/tts/prewarm`、`GET .../steps/{step_id|_first}/tts?speed=&voice_id=`。

## WS
- 无。
## State
- stage title、steps/current step、server `submissions/drafts`、本地 draft text/file、upload result/pass、assistant stream/images、narration；voice prefs 由 localStorage `ttsVoiceConfig:{userId}` helper 读取。

## Controls
- 阶段步骤导航；Draft Project Proposal/Save draft；text/file submission、Submit、Assistant、Narration；完成/评分反馈、Exit project。

## Navigate
- Exit/back `/course/{courseId}`；缺 course id 返回 `/courses`。
