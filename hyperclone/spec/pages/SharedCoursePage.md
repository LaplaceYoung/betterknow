# SharedCoursePage

源模块：`SharedCoursePage-B9BtZtqq.src.js`（default `s`）；路由 `/share/course/:courseId`。

## Endpoint
- 薄包装复用 CourseJourney 共享模式：底层 bundle helper（同一 `index-TjoB2Buo.src.js` chunk）以 `courseId` 调用 `POST /api/v1/course-generation/shared-course` body `{shared_object_id:courseId}`（公开共享课程载荷）。
- 登录后加入 `POST /api/v1/course-generation/courses/{course_uuid}/join`（Bearer，无 body）。

## WS
- 只读共享页无 WS；加入后课程页可启 course-update WS。

## State
- `sharedMode=true`、共享 course id/课程结构、loading/error/joining；未登录 join 可缓存 `hk_pending_course_join`。

## Controls
- 共享课程标题、描述、Units/Materials/Practices；Start own journey/Join course、登录/注册 CTA。

## Navigate
- 未登录 `/signup` 或 `/signin`；加入成功 `/course/{joinedCourseUuid}`；已有课程直接进入 `/course/{courseUuid}`。
