# DeepLearnSessionOutline

源模块：`DeepLearnSessionOutline-CxW4NH1I.src.js`（default `m`）；路由 `/deep-learn-session/outline/:subtaskId`。

## Endpoint
- 读取父任务复用 `getMainTaskData-D-oXzdCH.src.js`：`POST /api/v1/calendar/main_task_detail` body `{task_id}`；从 `subtasks[]` 找 `subtask_id`，读取 `payload.task_plan/session_task_plan`。
- 调整：`POST /api/v1/deep_learn/update_plan`（Bearer JSON）body `{subtask_id,comment}`；成功响应 `task_plan[]`。

## WS
- 本页无 WS；启动后的会话页使用 deep-learn WS。

## State
- URL `subtaskId`，父任务 id（`location.state.taskId` 或 sessionStorage key `subtask_{subtaskId}_parent_task_id`）；`subtask`、`outline units/items`、`comment`、loading/error、regenerating。
- 持久化 `sessionStorage.subtask_{id}_parent_task_id`；无 localStorage。

## Controls
- source files cards；textarea id `adjust-comment` placeholder `deepLearnOutline.adjustPlaceholder`；Send/regenerate；Start session、Upgrade、Back to Learning Feed。

## Navigate
- 未登录 `/login`；缺失/加载错误 Back `/learning-feed`；Start `/deep-learn-session/subtask_id/{subtaskId}`；Upgrade `/subscription`。
