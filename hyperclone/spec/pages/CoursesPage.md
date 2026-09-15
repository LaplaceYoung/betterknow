# CoursesPage

源模块：`CoursesPage-BbyenZ-M.src.js`（default `G`）；路由 `/courses`。

## Endpoint
- `GET /api/v1/course-generation/courses`（Bearer）；响应 `{courses:[...]}`（utility 向页面返回 `courses[]`）。
- 单课详情/删除复用 `courses-GqETwdXb.src.js`：`GET/DELETE /api/v1/course-generation/courses/{course_uuid}`。
- 分享弹层使用 `POST /api/v1/share_record/share_records`，body `{type:'course',shared_object_id,shared_with:{share_to_everyone:true}}`（共享组件 helper）。

## WS
- 无。

## State
- `courses[]`、filter `all|inProgress|completed`、loading/error、菜单/删除确认、share modal；课程 ticket 数据含 `enrolled,enrolledCourseUuid,marketplaceId,progress`。
- 侧栏/首页活动由主 bundle 缓存 `conversation_history`、`recent_course_activity`；本页不新增 key。

## Controls
- Your Courses、All、In Progress、Completed；Marketplace/Explore Marketplace；More course actions、Share course、Delete；推荐卡 `Recommended courses`、See more。

## Navigate
- 需要登录时 `replace('/signin')`；已 enrolled 卡 `/course/{enrolledCourseUuid}`；否则 `/marketplace/{marketplaceId}/preview`。
- 推荐 See more `/marketplace`；侧栏 Subscription `/subscription`、Settings modal、Sign out `/signin`。
