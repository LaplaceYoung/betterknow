# LearningFeed

源模块：`proactive-BmEDcKEX.src.js`（default `V`）；路由 `/learning-feed`。

## Endpoint
- confirmed list `GET /api/v1/calendar/list_main_tasks`；pending `GET /api/v1/calendar/list_pending_main_tasks`；detail `POST /api/v1/calendar/{main_task_detail|pending_main_task_detail}` body `{task_id}`。
- approve/reject `POST /api/v1/calendar/approve_tasks` body `{task_id:string|string[],action:'approve'|'reject'}`；remove `POST /api/v1/calendar/remove_task` body `{task_id}`。
- update `POST /api/v1/calendar/update_tasks`：`{task_id,start_time?,end_time?}`、`{task_id,comment}` 或 `{file_id,comment}`。
- generated file rerun `POST /api/v1/file_generation/rerun` body `{task_id}`；Google Calendar status/start/disconnect/sync_upcoming 复用 connector endpoints。

## WS
- 无。

## State
- mode confirmed/pending、week/month calendar/date、tasks/due/completed、selection；task/pending detail modal、date picker/comment、rerun status、quota、Google Calendar modal/status。
- quota helper localStorage `hyperknow_quota_limits`；无其他本页 key。

## Controls
- Confirmed Tasks/Pending、Week/Month、Previous/Next week/month、Google Calendar connect；task cards View Details/Select/Delete；detail Confirm/Reject/Adjust/Start/Resume/Start Over；Upgrade。

## Navigate
- Deep session `/deep-learn-session/outline/{subtaskId}` 或 `/deep-learn-session/{sessionId}`；course task `/course/{courseUuid}`；Upgrade `/subscription`。
