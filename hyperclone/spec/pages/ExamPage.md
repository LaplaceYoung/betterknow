# ExamPage

源模块：`ExamPage-D7IX1wOV.src.js`（default `C`）；路由 `/course/:courseId/exam/:unitId`。

## Endpoint
- `GET /api/v1/course-generation/courses/{course_uuid}/exam`（Bearer）；取 `exams[]` 中 `unitId` 对应 `{title,questions[]}`。
- `POST /api/v1/course-generation/courses/{course_uuid}/exam/score`（Bearer）body `{unitId,score}`，有完整答题项时 `{unitId,score,items}`。

## WS
- 无。

## State
- `loading|pending|ready|empty|error`、exam title/questions、current index、answers、submitted/results、score、remaining time（默认 1800 秒）、可视化高度。
- 无 localStorage。

## Controls
- Exam introduction/detail/progress/area（aria）；Start `exam.intro.startButton`；multiple choice / fill blank answer options；Previous question、Next、Submit；Close exam。

## Navigate
- Close/back：有 course id `/course/{courseId}`（state `{fromUnitId}`），否则 `/courses`。
