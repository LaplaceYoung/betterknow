# Agent 架构终稿（2026-09-03 终稿 v2，含第十~十一轮新增）

## 主循环（directorAgent）
```
user_message ──[credits 检查 credit_status]──> directorAgent(think) ─┐
                                                          │thinking_chunk 明文流
                                    ┌── tool 决策 ──┐
   directorAgent 用快思考主要生成 JSON: {thought, tool, args}

  工具分流：`get_skills`(装载 skill) → `memory_recall`(领域背景) → 
  内容链(ask_questions → search_and_summarize_web → content_planner → generate_content/quiz/flashcards/html_animation/cheatsheet/publish_file/code_generator)
  会话链(create_deep_learn_session/create_board_session) 
  计划链(generate_main_tasks → add_to_calendar) 
                                       │
   [严格 mark_response_complete 硬校验] ←─── 产出否则循环 ~15轮降级兜底
                                       │
                     recommend_next_step（含 learning_progress 递增）
```

## 模型路由（帧证据）
| 岗位 | 模型 |
|---|---|
| director(思考) | gemini-3-flash-preview |
| 内容生成 (generate_content) | gemini-3-flash-preview |
| quiz/flashcards | gemini-2.5-flash |
| HTML 动画 | 代码生成器（未列型） |
| 结构化研究(课程) | 未直接标记 |
| quiz 考试/练习 | 未直接标记（走结构数据，不再调模） |
| TTS | 私有 pipeline（voice_id 6 值 + 短按语速） |
| 生成图 | gemini_image（gemini 系列） |
| 视频 | Remotion + Manim 双渲染通道 + 独立 TTS |
| 教师白板回答(interject) | LLM 响应 + cascade 模式 |

## Interject "cascade" 行为图谱
文本打断：interject_start(text) → ready{id} → interject_text△流 → interject_audio 逐句 TTS → interject_done{control:none}；完成时授课挂起不停。
语音打断：interject_start(mic)+audio_chunk{pcm_b64}…+interject_audio_end → ASR 转写（落 voice_transcript）后同链。

## 子 Agent 提示词取证结论（zero-access）
- 分享链（share_record）历史只保存 `system(director) + user + tool` 三层；所有子工具 prompt 只在服务端 in-memory；不入史。
- WS 帧只含 director 组合的 guideline（自然语言二次指令）。
- 注入探测被三层防护统一拒答：主面对话（前次）、白板教师（interject cascade）、内容 IO 严格判校。
- **⇒ 子提示词本体在已知攻击面上不可获取。**

## 课程生成流水线
boot → researching_the_web(≤5轮关键词检索,progress帧含 results[]+reference_ids) → 4 题画像(questions) → syllabus → structure → 按 unit:lecture:session 多路并发 session_outlines → complete(课程全量 JSON 嵌入) → final 存 /app/cache/database/user_data/…；每步 progress 帧均可察。
## WS 通道终表（7 条，第十~十一轮补齐）
| 通道 | 端点 | 鉴权参数 |
|---|---|---|
| 主聊天 | /api/v1/ws | conversation_id + token |
| 课程生成 | /api/v1/course-generation/ws | access_token |
| 白板授课 | /api/v1/whiteboard/ws | access_token |
| PDF 导读 | /api/v1/pdf-annotation/ws | access_token |
| deep-learn | /api/v1/deep_learn/ws | session_id 或 subtask_id + token |
| drive 同步 | /api/v1/drive/ws | token（bundle 静态确认存在） |
| 自检 | /api/v1/net-check/ws | — |

## 语音链路终态（第十轮实测）
- 上行整段：`interject_question{audio_b64, mime:"audio/wav", duration_ms}` → STT（`interject_user_text` delta 流）→ cascade 文本流 `interject_text` → 逐句 TTS `interject_audio{audio_url,sequence}` → `interject_done{control,text}`
- 下行播放帧：`interject_pcm{pcm_b64, sample_rate:24000}`
- **流式上行（`interject_audio_chunk`/`interject_audio_end`）服务端静默吞音**（pdf+whiteboard 双通道复现），线上为哑路径
- persona 画像落盘：`assets/prompts/whiteboard_teacher_persona.md`、`pdf_teacher_persona.md`、`deep_learn_conversation_behavior.md`

## 内容 DSL（下行结构化标记全集）
`<span class="memory-ref" data-type="profileMemory">`、`<div content-section="definition|key_points|…">`、`<diagram data-placeholder-id=… data-subtype="mermaid|gemini_image|html_animation" data-layout data-status data-caption>`、`<content-type: diagram; diagram-subtype: …; content-prompt:…; caption:…>`（第三轮首捕）

## 自邀请提权链（第十一轮坐实）
invite/generate{type-001} → signup?ref=<invite_id> → register{friend_referral_code}（随意邮箱、无验证）→ **奖励落 inviter：4 天 Pro + 80 credits**；自注册自邀请 = 无限自续 Pro。
