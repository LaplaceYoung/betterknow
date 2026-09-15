# Subscription

源模块：`subscription-BPidvGpU.src.js`（default `C`）；路由 `/subscription`、`/pricing`。

## Endpoint
- `GET /api/v1/stripe/plans` 与 `GET /api/v1/subscription/check_user_subscription` 获取 plans/current/country/pending change。
- card checkout `POST /api/v1/stripe/checkout` body `{plan_id,payment_method?}`；Alipay/一次性 `POST /api/v1/stripe/checkout_one_off_price` body `{plan_id}`，响应 `{url}` 后整页跳转。
- 变更流程：`POST /api/v1/stripe/change_plan_preview` body `{plan_id}`；`POST /api/v1/stripe/change_plan` body `{plan_id,payment_method?}`；`POST /api/v1/stripe/cancel_subscription`；`POST /api/v1/stripe/revert_pending_change`；`POST /api/v1/stripe/customer-portal` 返回 `{url}`。

## WS
- 无；plan change 的 applied 状态使用 HTTP 轮询 helper。

## State
- plans/current/country region、loading/error、active payment menu、pending checkout、plan-change modal phase `confirm|processing|requiresAction|polling|success|failed|timeout`、selected method。
- bundle 持久化 localStorage `subscription_tier`；本模块无新增 key。

## Controls
- plan cards/price/features、Upgrade/Downgrade/Cancel/Current plan、card/Alipay options；Confirm/Dismiss/Verify/Change payment method、Undo scheduled change、Manage payment。

## Navigate
- close `navigate(-1)`；checkout 使用 `window.location.href=url`；customer portal 新标签；成功回跳 `/success?session_id=…`（Stripe 配置）。
