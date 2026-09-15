# SharedConversationPage

源模块：`SharedConversationPage-DOuWYgla.src.js`（default `N`）；路由 `/share/c/:conversationId`。

## Endpoint
- `POST /api/v1/conversations/get_shared_conversation_data`，匿名可用、若有 token 则带 Bearer；body `{shared_object_id: normalizedId}`。响应 `{title,history,history_index,...}` 并经 history parser 只读渲染。

## WS
- 无。

## State
- normalized conversation id（截断尾随 URL）、`messages[]`、title、loading/error、CTA 浮层；无 localStorage。

## Controls
- HyperKnow logo、共享标题/消息历史、Start your own journey；登录/注册 CTA，Close。

## Navigate
- 规范化 legacy/带尾串 URL 为 `/share/c/{id}`（history.replaceState）；CTA `/signin`、`/signup`。
- `/shared/c/:conversationId` 由主 bundle inline redirect 到本页。
