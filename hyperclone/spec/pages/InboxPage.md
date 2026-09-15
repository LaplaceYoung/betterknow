# InboxPage

源模块：`InboxPage-BfsYjdrg.src.js`（default `c`）；路由 `/inbox`。

## Endpoint
- 复用 `InboxPage-COF0onVT.src.js`：`GET /api/v1/usr-msg-inbox/get_message?limit={1..100}&cursor={cursor?}`（Bearer），响应经规范化支持 `{messages|data, pagination:{next_cursor,has_more}}`。
- `POST /api/v1/usr-msg-inbox/mark_read`（Bearer JSON），body `{message_ids:string[]}`。

## WS
- 无。

## State
- `messages[]`、`filter=all|unread`、loading/error、cursor/hasMore/loadingMore；每条 `{id,title,body,msg_type,sender_type,created_at,read}`。
- 无 localStorage。

## Controls
- `inbox.title`、All/Unread filter tabs、Load more、Mark all as read；消息行标题/摘要/时间/未读点。

## Navigate
- 未认证 `replace('/signin')`；点击消息 `/inbox/message/{id}`，state `{message}`。
