# SignUp

源模块：`signUp-Bsi8Sjcr.src.js`（default `v`）；路由 `/signup`。

## Endpoint
- `POST /api/v1/auth/register` body `{username,email,password,friend_referral_code?,dub_click_id?,utm_data?}`；响应 `{user_id,email,username,invite_info,friend_referral_info,invite_code_info}`。
- 注册后 `POST /api/v1/auth/login` body `{email,password}`；Google 使用 Supabase `signInWithOAuth({provider:'google',redirectTo:'/auth/callback'})`。

## WS
- 无。

## State
- username/email/password/confirmPassword、show toggles、submitting/googleLoading、validation/success/error、推荐码/coupon overlay。
- localStorage `pending_friend_referral_code`；sessionStorage `referral-overlay-{userId}`；成功登录写标准 auth keys（见 SignIn）。

## Controls
- `username,email,password,confirmPassword` inputs；password strength requirements；Show/Hide password；Sign up、Sign up with Google、Sign in、terms/status badge。

## Navigate
- coupon 奖励 `/coupon-code` state `{couponCodes,fromLogin:true}`；否则 `/onboarding`；需手动登录 `/signin`。
