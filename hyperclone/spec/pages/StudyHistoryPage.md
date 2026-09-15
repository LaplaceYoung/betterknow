# StudyHistoryPage

源模块：`StudyHistoryPage-C_ASJLRI.src.js`（default `v`）；路由 `/history`。

## Endpoint
- 数据由主 bundle provider 获取：`GET /api/v1/conversations/list_past_conversations?limit=&cursor=`、`GET /api/v1/deep_learn/list_deep_learn_session`。
- 会话属性 `POST /api/v1/conversations/manage_conversation_property` body `{conversation_id,title? | starred? | delete?}`。
- 深学属性 `POST /api/v1/deep_learn/manage_deep_learn_session_property` body `{deep_learn_session_id,title? | starred? | delete?}`。

## WS
- 无。

## State
- conversation/deepLearn histories、tab、search、star-only filter、multi-select、open menu、rename draft、delete confirm、cursor/loading-more。
- provider 缓存 localStorage：`conversation_history`、`deep_learn_session_history`。

## Controls
- Conversations/Sessions tabs；search（Clear search aria）、Filter/Starred；New conversation；row checkbox/star/menu、Rename/Delete、bulk Delete、Load more。

## Navigate
- New conversation `/`；conversation `/response/{id}`；session `/deep-learn-session/{id}`。
