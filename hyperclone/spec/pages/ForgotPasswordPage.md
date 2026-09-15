# ForgotPasswordPage

源模块：`forgotPassword-3e5ciPne.src.js`（default `l`）；路由 `/forgot-password`。

## Endpoint
- Supabase Auth SDK `resetPasswordForEmail(email,{redirectTo: origin + '/reset-password'})`；对应 Supabase `/auth/v1/recover`，body `{email}`。

## WS
- 无。

## State
- query `email` 预填、email、processing、success、error；无 localStorage。

## Controls
- Email input、submit `auth.forgotPasswordFlow.*`、Abort/Return to login；retro terminal status。

## Navigate
- 返回/Abort `/signin`；邮件链接回 `/reset-password`。
