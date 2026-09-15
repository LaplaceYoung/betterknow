# InboxMessagePage

源模块：`InboxMessagePage-B20bjE01.src.js`（default `m`）；路由 `/inbox/message/:messageId`。

## Endpoint
- 详情/分页复用 utility：`GET /api/v1/usr-msg-inbox/get_message?limit={1..100}&cursor={cursor?}`；响应支持 `{messages|data,pagination}`，本页按 `messageId` 选择消息。
- 已读复用 `POST /api/v1/usr-msg-inbox/mark_read` body `{message_ids:[messageId]}`（Bearer）。

## WS
- 无。

## State
- URL `messageId`、可选 `location.state.message` 快照、`message`、loading/error；Canvas 消息识别 `msg_type/sender_type/title`。
- 无 localStorage。

## Controls
- Back to Inbox `inbox.backToInbox`；已读/未读状态 `inbox.statusRead|statusUnread`；标题、发件人、正文、Canvas sync 提示。

## Navigate
- 未登录 `replace('/signin')`；返回按钮 `/inbox`；不存在/加载失败保留错误态。
