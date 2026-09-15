# AccountDeletedPage

源模块：`AccountDeletedPage-sS6OnftJ.src.js`（default `i`）；路由 `/account-deleted`。

## Endpoint
- 无 REST/WS；页面只消费路由 state `accountDeleted`。

## WS
- 无。

## State
- `accountDeleted = location.state.accountDeleted`；动画状态 `visible | exiting`；计时器用于退出动画。
- 不读写 localStorage。

## Controls
- 账户删除标题 `settings.accountDeletedTitle`、副文案 `settings.accountDeletedSubtitle`。
- 返回登录按钮 `settings.accountDeletedBackToLogin`。

## Navigate
- 非删除态立即 `replace('/signin')`。
- 返回登录按钮在约 760ms 退出动画后 `replace('/signin')`。
