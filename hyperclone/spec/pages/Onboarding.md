# Onboarding

源模块：`Onboarding-cAGO2Z_k.src.js`（default `Se`）；路由 `/onboarding`。

## Endpoint
- `POST /api/v1/userPollData/userPollData` body `{user_acquisition_sources:[source|'other: …']}`。
- `POST /api/v1/memory/update_profile_memory` body `{answers:[{question_id,answer_ids:[number],other_text?}]}`（调用 `updateProfileMemory` helper）。
- `PATCH /api/v1/onboarding/manage_onboarding` body `{proactive_onboarding:true}`（provider 同时将 `{general_onboarding:true,proactive_onboarding:true}` 写上下文）。
- 可选推荐码 `POST /api/v1/partner-code/redeem` body `{code}`。

## WS
- 无；教学演示是本地脚本序列（assistant_text/user_message/board/image/math/highlight）。

## State
- 步骤 `language→discovery→role→handover→tour`；locale、acquisition source/other、profile answers、partner code redeem 状态、动画/演示进度。
- 不直接写 localStorage；语言与 onboarding 状态由 bundle provider 持久化（认证 key 集）。

## Controls
- Continue/Back、7 种语言 radio、发现来源 chips、learner-role tiles、referral 输入/Apply；`onboarding.*` i18n 文案。

## Navigate
- 完成后 `/`；认证 guard 未登录 `/signin`。
