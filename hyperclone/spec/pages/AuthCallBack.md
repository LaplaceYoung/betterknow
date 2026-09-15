# AuthCallBack

源模块：`AuthCallBack-D6ewOC01.src.js`（default `b`）；路由 `/auth/callback`。

## Endpoint
- 通过 bundle auth helper 读取 OAuth session/user，再调用 `POST /api/v1/auth/google_sync`（Bearer access token）。body：`{friend_referral_code?, dub_click_id?, utm_data?}`；响应包含 `success,is_new_user,user_id,onboarding_status,invite_info`。

## WS
- 无。

## State
- `loading=true`、`error`、`onboardingStatus={general_onboarding,proactive_onboarding}`。
- 写 localStorage：`access_token, refresh_token, user_id, username, token_timestamp, onboarding_completed`；读取并成功后删除 `pending_friend_referral_code`。

## Controls
- 加载/错误/成功状态文案使用 `auth.errors.*`；成功页继续按钮（文本由 i18n 提供）。

## Navigate
- OAuth 错误、session/user 同步错误：3 秒后 `/signin`。
- 成功且有邀请 coupon：延迟 1.5 秒到 `/coupon-code`，state `{couponCode,fromLogin:true}`；否则停留成功页，由 Start Learning 按钮在 onboarding 两标志均 true 时跳 `/`（state `{fromLogin:true}`），其余跳 `/onboarding`。
