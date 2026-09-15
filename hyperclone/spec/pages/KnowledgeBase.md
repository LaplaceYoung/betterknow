# KnowledgeBase

源模块：`knowledge_base-vdyPmbEX.src.js`（default `S`）；路由 `/knowledge-base`。

## Endpoint
- `GET /api/v1/drive/get_drive_data`（Bearer）→ `{file_data,metadata.drive_used_source_bytes}`。
- `POST /api/v1/drive/create_folder` body `{directory_name,parent_id:''|id}`；upload `POST /api/v1/drive/upload_file_to_drive` multipart `{file,parent_id}`；delete `POST /api/v1/drive/delete` body `{object_id}`。
- `POST /api/v1/drive/add_file_to_calendar` body `{file_id}`；配额 `GET /api/v1/auth/other_function_usage_limits`。

## WS
- `wss://…/api/v1/drive/ws?token=`；消费 `drive.connection.established,drive.file.thumbnail_ready,drive.file.processing_completed,drive.calendar.processing_started/completed/failed`，按 file id 更新缩略图/状态与日历任务。

## State
- normalized tree `{id,name,type,parent_id,size,ext,thumbnail_url,status,calendar_planning_status}`、cwd/breadcrumb、search/selection、upload progress/new folder/delete modal、quota/calendar status。
- 配额 helper localStorage `hyperknow_quota_limits={data,cached_at}`；无其他本页 key。

## Controls
- Search、New→New Folder/Upload File、folder/file cards/menus、Delete、Add to calendar；quota popup/Upgrade；create folder Cancel/Create；drag-drop overlay。

## Navigate
- 未登录 `/signin`；Upgrade `/subscription`；calendar processing detail `/learning-feed?view=pending`；sidebar 路由与 HomePage 相同。
