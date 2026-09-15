# MarketplacePage

源模块：`MarketplacePage-BfF2z5q_.src.js`（default `b`）；路由 `/marketplace`。

## Endpoint
- `GET /api/v1/marketplace/courses?lang={i18n language}`（Bearer），响应 `{courses:[]}`；页面按 category/search/sort 本地筛选。课程字段使用 `marketplaceId,courseTitle,courseDescription,subjects,difficulty,sessionCount,joinCount,enrolled,enrolledCourseUuid`。

## WS
- 无。

## State
- `courses[]`、loading/error、搜索 query、topic/category 过滤、分页/展示数量；无 localStorage。

## Controls
- Marketplace 标题与搜索框（type `search`）；主题 chips、课程卡、Clear search/empty state、课程 CTA。

## Navigate
- 卡片跳 `/marketplace/{marketplaceId}/preview`；已注册课程可跳 `/course/{enrolledCourseUuid}`；返回课程列表 `/courses`。
