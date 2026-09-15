# ResetPassword

源模块：`resetPassword-mL7k2-JQ.src.js`（default `o`）；路由 `/reset-password`。

## Endpoint
- Supabase Auth SDK `getSession` / `onAuthStateChange(PASSWORD_RECOVERY)`；提交 `updateUser({password})`，对应 Supabase `/auth/v1/user`。

## WS
- 无。

## State
- email、newPassword、confirmPassword、verifying/sessionValid、processing/success/error；校验至少 8 字符且两次一致。
- Supabase SDK 管理 auth token；本页无直接 localStorage key。

## Controls
- New password / Confirm password inputs；Update password、Abort、Go/Return to login；verifying/error/success terminal screens。

## Navigate
- Abort、成功按钮、无效链接返回 `/signin`。
