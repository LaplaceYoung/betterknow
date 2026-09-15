# WelcomeBackPage

源模块：`WelcomeBackPage-DurSUQgD.src.js`（default `s`）；路由 `/welcome-back`。

## Endpoint
- 无。

## WS
- 无。

## State
- `visible|exiting` 与 760ms 计时器；mount 调用 bundle welcome-back acknowledgment helper；无 localStorage 直接访问。

## Controls
- dialog aria `Welcome back`；循环 welcome-back video；`home.welcomeBack.greeting/subtitle/cta`。

## Navigate
- CTA 退出动画后 `replace('/')`。
