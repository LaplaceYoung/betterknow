# MarketplacePreviewPage

源模块：`MarketplacePreviewPage-BrEMOsV6.src.js`（default `s`）；路由 `/marketplace/:courseId/preview`。

## Endpoint
- 薄包装将 `courseId` 以 marketplace 模式传给 CourseJourney：`GET /api/v1/marketplace/courses/{marketplaceId}`（Bearer）。
- Enroll：`POST /api/v1/marketplace/courses/{marketplaceId}/enroll?lang={locale}`（Bearer，无 body），响应 enrolled course UUID。

## WS
- 预览不启课程更新 WS；入课后由 CourseJourney 管理。

## State
- `previewMode=true`、marketplace id、课程预览结构、enrolling/error；登录状态决定 CTA。
- 未登录 enroll 可通过 `hk_pending_course_join` 在登录后恢复（定义见 CourseJourneyPage）。

## Controls
- Course preview/title/description/units/materials；Enroll/Start own journey、Back to Marketplace。

## Navigate
- 返回 `/marketplace`；未登录 CTA `/signup` 或 `/signin`；enroll 成功 `/course/{enrolledCourseUuid}`。
