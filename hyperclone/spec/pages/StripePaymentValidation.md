# StripePaymentValidation

源模块：`StripePaymentValidation-BHLxMsFf.src.js`（default `h`）；路由 `/success`。

## Endpoint
- `POST /api/v1/stripe/validate-subscription`（Bearer JSON）body `{CHECKOUT_SESSION_ID: searchParams.session_id}`。
- 最长约 8 秒、间隔最多 1.5 秒轮询；成功响应为 `success`，失败详情可含 `stripe_payment.is_paid`、`database_validation.is_found/is_owner`。

## WS
- 无。

## State
- `loading`、validation result、error key、celebration modal、support panel；AbortController/resize observer。
- 无 localStorage。

## Controls
- 验证 loading/success/failure；validation checks；Try Again（reload）、Contact Support、mail link；成功 Celebration/Continue。

## Navigate
- 未登录显示 notLoggedIn；成功弹层关闭/继续 `/`。
