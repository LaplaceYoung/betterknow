# DevCsmPreview

源模块：`__devCsmPreview-DScdU4JO.src.js`（default `n`）；路由 `/dev/csm`。

## Endpoint
- CourseStructureMap 以 `courseUuid='dev'` 请求 `GET /api/v1/course-generation/courses/dev/structure`；节点编辑 `POST .../structure/edit` body `{op,ref}`，重生成 `POST .../structure/regenerate` body `{prompt}`，应用/撤销分别 `POST .../structure/apply`、`POST .../structure/undo`（无 body）。

## WS
- 无。

## State
- 固定《大学物理 I：力学》两单元 `initialStructure`；选择、pending shape delta、undo/regen/apply 状态；无 localStorage。

## Controls
- CourseStructureMap 节点、depth tags、Select、instruction、Regenerate/Apply/Undo、zoom/maximize。

## Navigate
- 无显式 navigate。
