# Canvas LMS 连接器逆向（2026-09-03）

## 数据面
- 存储字段：`{school, canvas_url, access_token, last_sync}` 存于用户级 profile（get_user_info.canvas_lms + checkCanvasCredentials 均证照该结构）
- 存在性态：`has_credentials`（三字段齐→true）

## 端点核实
| 端点 | Method | Body/Query | 响应 |
|---|---|---|---|
| save_school_metadata | POST | `{school, canvas_url}` | 200 success+data |
| save_access_token | POST | `{access_token}` | 200（**零校验直接入库**） |
| checkCanvasCredentials | GET | – | `{has_credentials, credentials{…}}`，对伪造 token 也回 "valid and complete" |
| getAllCourses | GET | – | 200 `{courses:[], total_count:0}`（坏 token 静默空） |
| browseFiles | GET | `?course_id=` | 200 `{success:false, message:'Failed to retrieve course files…'}` |
| downloadFile | GET | `?course_id&file_id&download_url=` | 422 提示 download_url 必填 |
| removeCanvasCredentials | DELETE | – | 200 |
| /whiteboard/canvas — canvas_updates 相关 | docker | `GET …/canvas-updates`、`POST …/dismiss`、`POST …/disable` | mostly 200 structured update counts |

## 行为结论
- 凭证入库不做 Canvas 端真实性校验（任何字符串都存、check 直接说 valid and complete）。
- list/browse 对坏 Token 静默失败（200 空集合/错误状态字段）——错误外推上乘员完全察觉不到失败是认证性。
- Canvas 实物行为只有 `?canvas_url` host 决定（任意主机可指）。
- 下游集成：`search_files(sources:["canvas"])` 只在 integrations 含 canvas 时可用；`course-generation` 的 canvas_selection 吃 browse 清单。

## 对建议双正确
1. save 时主动 `GET https://<canvas_url>/api/v1/courses?access_token=` 预验证、结果作为 has_credentials 的判据；
2. browseFiles/downloadFile 失败要显式 4xx（不把外来 Canvas 认证错误吃进 200）。
