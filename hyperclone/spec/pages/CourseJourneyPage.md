# CourseJourneyPage

源模块：`CourseJourneyPage-DgJviJg0.src.js`（default `vt`）；路由 `/course/:courseId`、`/course/:courseId/welcome`。

## Endpoint
- 课程读取/删除/学习摘要复用 `courses-GqETwdXb.src.js`：`GET /api/v1/course-generation/courses/{course_uuid}`，`DELETE` 同路径；摘要 `GET /api/v1/course-generation/learning-summary?week={this|last}&timezone_offset_minutes={offset}`。
- 日历：`GET /api/v1/course-calendar/config`；`GET /api/v1/course-calendar/status?course_uuid={id}`；`POST /api/v1/course-calendar/draft` body `{course_uuid,start_date,duration_days,preferred_weekdays}`；`POST /api/v1/course-calendar/accept` body `{course_uuid,course_title,items}`。
- Canvas 更新：`GET /api/v1/course-generation/courses/{id}/canvas-updates`；dismiss/disable `POST .../canvas-updates/dismiss`、`POST /api/v1/course-generation/courses/canvas-updates/disable`。
- 分享/加入复用 helper：`POST /api/v1/marketplace/courses/{marketplaceId}/enroll?lang=`（无 body）；`POST /api/v1/course-generation/courses/{uuid}/join`（无 body）。

## WS
- 课程更新：`/api/v1/course-generation/update?access_token=`；初帧 `start_course_update{course_uuid,attachment_paths,instruction}` 或 `start_course_update_from_canvas{course_uuid}`。
- 消费 `course_update_started,course_update_step{step_id,status},course_update_plan{plan},course_update_complete{course,message,new_unit_ids,new_session_ids},course_update_stopped,course_update_error,pong`；发送 `course_update_confirm{approved,feedback?}`, `course_update_feedback{feedback}`, `stop_course_update`, `ping{ts}`。

## State
- 课程 `units/lectures/sessions/projects/exams/references`；当前 tab（units/materials/practices）、展开 unit、完成进度、intro/modal、日历草案。
- localStorage：`hk_pending_course_join`（`{courseId,ts}`，TTL 30min）、`hk_course_intro_seen:{courseUuid}`；导入完成后清除 pending。

## Controls
- Course content/tabs Units/Materials/Practices、课程描述展开、Share this course、Add course to calendar、Next/Previous month、Progress legend；Learn/Practice、Project、Exam、Exit Course。

## Navigate
- 返回 `/courses`；marketplace preview 返回 `/marketplace`。
- session target `/course/{id}/sessions/{pdf-annotate|whiteboard}/{sessionId}`；practice `/course/{id}/practice/{sessionId}`；exam `/course/{id}/exam/{unitId}`；project `/course/{id}/project/{stageId}`。
- 加入成功 `/course/{enrolledCourseUuid}`；未认证加入跳 `/signup` 或 `/signin`。
