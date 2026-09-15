# EmailSubscriptionPage

源模块：`emailSubscriptionPage-CKBNY0Dx.src.js`（default `i`）；路由 `/unsubscribe_email_list`。

## Endpoint
- `POST /api/v1/email_manager/check_email_subscription`（公开 JSON）body `{email}`；data `{user_id,functionality_email_enabled,proactive_daily_email_feed,engagement_email_enabled}`。
- `POST /api/v1/email_manager/edit_email_subscription` body `{email,functionality_email_enabled?,proactive_daily_email_feed?,engagement_email_enabled?}`。

## WS
- 无。

## State
- query `email`、三种 subscription booleans、loading/saving/error/success；无 localStorage。

## Controls
- 三个 checkbox：`emailPreferences.functionalityTitle/proactiveTitle/engagementTitle` 与描述；Save/Saving。

## Navigate
- 无显式 navigate。
