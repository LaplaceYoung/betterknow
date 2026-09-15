# CouponCodePage

源模块：`CouponCodePage-B7gFDJHw.src.js`（default `s`）；路由 `/coupon-code`。

## Endpoint
- 无本模块 fetch；优惠码来自 `location.state.couponCode` 或 `location.state.couponCodes`（由注册/OAuth/设置兑换流程传入）。实际兑换由主 bundle subscription helper 完成：`POST /api/v1/subscription/redeem_coupon` body `{invite_code}`（双因子场景可含 `{coupon_code,invite_code}`）。

## WS
- 无。

## State
- `couponCodes[]`、粒子/庆祝动画随机布局；无 localStorage。
- 无 state 时 effect 导航离开并不渲染。

## Controls
- `coupon.welcome`、`coupon.thankYou`、`coupon.yourSpecialCouponCode(s)`、`coupon.copyCode`、`coupon.couponCodeCopied(WithNumber)`；每个优惠码 Copy 按钮。

## Navigate
- 没有 coupon state 时返回 `/`；展示后关闭/完成按来源 state 流程返回首页。
