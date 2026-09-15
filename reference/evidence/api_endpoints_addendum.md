# REST/WS 端点补录（2026-09-03 第三轮）

在第一轮 98 端点基础上新增/修正。

## 新增 REST（bundle 模板函数 + 运行时观测）

| 端点 | 方法 | 鉴权 | 来源/证据 |
|---|---|---|---|
| `/api/v1/diagram/{diagram_id}/diagram.md` | GET | **无鉴权（公开）** | inline_diagram 帧 data-file-url；实测 200 |
| `/api/v1/diagram/{diagram_id}/diagram.html` | GET | **无鉴权（公开）** | generate_html_animation 回调；实测 200 |
| `/api/v1/diagram/{diagram_id}/diagram.png` | GET | **无鉴权（公开）** | gemini_image 子类；实测 200 image/png 137KB |
| `/api/v1/marketplace/courses/{marketplaceId}` | GET | Bearer | index chunk `MARKETPLACE_COURSE_PREVIEW` 模板；实测 200 全量课程元数据 |
| `/api/v1/marketplace/courses/{marketplaceId}/enroll` | POST | Bearer | index chunk `MARKETPLACE_ENROLL` 模板（未触发） |
| `/api/v1/course-generation/courses/{uuid}/join` | POST | Bearer | index chunk `JOIN_SHARED_COURSE` 模板 |
| `/api/v1/whiteboard/course-outlines/{courseUuid}/sessions` | GET | Bearer | WhiteboardPage 运行时；返回课件 47 session |
| `/api/v1/net-check` | GET | **公开** | 实测 200 `{"ok":true,"state":"ok","t":...}` |

## 新增 WS 通道

| 通道 | 鉴权 | 用途 |
|---|---|---|
| `wss://api.hyperknow.io/api/v1/course-generation/ws?access_token=` | query JWT | 课程生成主通道（questions/answers/structure 确认） |
| `wss://api.hyperknow.io/api/v1/course-generation/update?access_token=` | query JWT | 课程更新进度通道（bundle 已知，未实测） |

三旧通道复测：`/api/v1/ws`、`/whiteboard/ws`、`/pdf-annotation/ws`（无 token 直连 1008 policy close ✓）。

## 已确认 body 形状（422 引导枚举）

- `POST /share_record/share_records`：`{type:'conversation', shared_object_id:<uuid>, shared_with:{share_to_everyone:bool}}` → 200 得 `/share/c/<conversation_id>` 链接
- `POST /subscription/redeem_coupon`：`{coupon_code, invite_code}`（双因子绑定）
- `POST /memory/apply_memory_ops`：`{operations:[{memory_type: preference|knowledge|logistics|other, action:...}]}`
- `POST /memory/update_profile_memory`：`{answers:[{question_id, answer_ids:[<int>...]}]}`
- `POST /partner-code/check`：`{code}` → `{valid, code_type, reward_kind, reward_value, already_redeemed}`（暴露奖励分类学）
- `POST /invite/generate_invite_register_link_with_rewards`：`{invite_type:'type-001'}` → 已存在则返回 `{invite_id, invite_link, attributes:{pro_days:4, coupon_code, coupon_description:'1-month 40% off'}}`
- `POST /affiliate/join`：无 body → `{is_affiliate:true, code, link: https://hyperknow.dub.link/<username>}`（20% 佣金，dub.co 托管）

## S3 资源面

- 桶 `nutcracker-hyperknow-public.s3.us-east-2.amazonaws.com`（公司法定名 Nutcracker AI Inc.）
- drive 缩略图直链公开：`root/drive/<user_uuid>/files/<file_id>/thumbnail/probe_thumb.jpg`
- 匿名 LIST 403 ✓（对象读公开、不可列举）
- 用户 uuid 可从未鉴权的共享会话 JSON 泄漏（`user_id` 字段）→ 钥匙空间缩小一环

## WS 帧补充（服务端→客户端，第三轮实测新增）

| 帧类型 | 通道 | 语义 |
|---|---|---|
| `inline_diagram` | /ws | data 含 placeholder_id、type(mermaid/gemini_image)、layout、status、最终 `<diagram>` 替换标签 + **source_tag**（内部 content-prompt DSL 原文） |
| `thinking` / `thinking_chunk` | /ws | **LLM 推理链原文流**（本轮实测拿到完整 CoT） |
| `course_generation_*` | course-generation/ws | started/step/progress(含 research rounds、keywords、fetch 结果、references)/questions/complete |
| `model_probe_started/result` | whiteboard/ws | 诊断探针：ttft_ms、text、verdict（ok_no_context） |
| `session_ready` / `board` / `lecture_outline_selected` | whiteboard/ws | board_content 为 markdown 直推 |

原始轨迹：`ws_captures_session2.json`（4 段对话 + 白板 probe）、`course_generation_trace.json`（全程 65 帧）、`whiteboard_teaching_trace.json`、`shared_conversation_full.json`（含 14.9KB 系统提示词）。
