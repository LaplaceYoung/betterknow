# CourseGenerationLogPage

源模块：`CourseGenerationLogPage-DRWJNve8.src.js`（default `i`）；路由 `/course-generation/log/:runId`。

## Endpoint
- `GET /api/v1/course-generation/generation-log/{run_id}`；无 body（源码未显式加鉴权 header）。响应投影为 `{run_id,query,course_uuid,status,events[],final_course?,semi_structure?}`。

## WS
- 本页不自建 WS；把投影传给 `ChatResponsePage` 的 `replay` renderer。

## State
- URL `runId`；`loading`、`runData`、`error`；回放对象 `conversationId=course-log-{run_id}`、`events[]`。
- 无 localStorage。

## Controls
- 由 ChatResponsePage replay 提供聊天/事件查看控件；加载文本 `Loading generation transcript…`。

## Navigate
- 本模块不主动 navigate；回放内部控件沿 ChatResponsePage 规则跳转。
