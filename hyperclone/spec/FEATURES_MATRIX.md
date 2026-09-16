# 全站功能点矩阵（2026-09-03，第 11 轮收口）

状态口径：✅=已实测并有本地证据；📦=已落盘数据/文案；🧩=协议形状已逆向未实测；⛔=不可外测（明确排除）。

## 1. 账号与认证
| 功能 | 端点/通道 | 状态 | 证据 |
|---|---|---|---|
| 注册（无验证码/无邮箱验证/mailer_autoconfirm） | POST /auth/register {username,email,password,friend_referral_code?,dub_click_id?,utm_data?} | ✅ | r11_self_invite.json |
| 登录 | POST /auth/login | ✅ | r10_account_state.json |
| 刷新 | POST /auth/login_refresh | ✅（一次性短窗） | 第七轮 |
| 删除账号 | POST /auth/delete_account {confirm_email} | ✅ | 第六轮 |
| 用户信息 | GET /auth/get_user_info | ✅ | r10_account_state.json |
| 使用限制计数 | GET /auth/other_function_usage_limits | ✅ | 同上 |
| Google 登录 | /auth/google_sync + Supabase OAuth | 🧩 | bundle |
| 邀请链 + 自邀请提权 Pro | POST /invite/generate_invite_register_link_with_rewards {invite_type:type-001} → signup?ref=<invite_id> → register {friend_referral_code} | ✅ | r11_self_invite_result.json（inviter 4 天 Pro/80 credits 落账） |
| 邀请反查 PII | POST /invite/check_invite_link {invite_id} 无鉴权 | ✅ | 第八轮 #36 |
| 兑换码 | POST /partner-code/check、/partner-code/redeem、/subscription/redeem_coupon | 🧩（干净一致的拒绝面） | 第三轮 |
| 联盟（dub.co 即时开通） | POST /affiliate/join、GET /affiliate/me | ✅ | rest_sweep_round4.json |

## 2. 订阅与支付
| 功能 | 端点 | 状态 |
|---|---|---|
| 订阅状态 | GET /subscription/check_user_subscription（reset_interval_hours=12 轮转重置） | ✅ |
| Stripe plans/checkout/portal | /stripe/plans、/checkout、/checkout_one_off_price、/customer-portal、/change_plan(+preview)、/cancel_subscription、/validate-subscription、/revert_pending_change | ⛔（真实交易不测；plans 列表可拉） |

## 3. 三/六通道 WS 实时面
| 通道 | 端点 | 状态 | 备注 |
|---|---|---|---|
| 主聊天 | /api/v1/ws?conversation_id=&token= | ✅ | directorAgent 循环全帧证据 |
| 课程生成 | /course-generation/ws?access_token= | ✅ | r11_course_generation_v2.jsonl（32 帧全相） |
| 白板授课 | /whiteboard/ws?access_token= | ✅ | r10_whiteboard_voice2.jsonl、voice_ab |
| PDF 导读 | /pdf-annotation/ws?access_token= | ✅ | r10_pdf_session_v4.jsonl（speak/annotation/ask/done） |
| deep-learn | /deep_learn/ws?session_id｜subtask_id=&token= | ✅ | r11_deeplearn_ws.jsonl（114 帧，director 在会话内复用） |
| drive 同步 | /drive/ws?token= | 🧩 | bundle 静态确认存在 |
| net-check | /net-check/ws + GET /net-check | 🧩 | 自检探针通道 |

## 4. 主聊天工具面（28 注册工具）
全部工具 → `hyperclone/seed/tools_registry.json`（每工具：出现文件、guideline 若有、模型、输出键）。
- 内容链：generate_content(gemini-3-flash-preview) / generate_quiz+flashcards(gemini-2.5-flash) / generate_instructional_video / generate_html_animation(实测出 diagram.html 公开件 F4JIHS3i) / generate_cheatsheet / publish_file(公开 URL) / code_generator(服务端执行+异常明文)
- 检索链：get_skills / memory_recall / search_files(drive) / read_files|read_content / search_and_summarize_web / analyze_url_content
- 会话链：create_deep_learn_session / create_board_session / ask_questions / select_prompts
- 计划链：generate_main_tasks(action_planner) / add_to_calendar / clarification_planner / content_planner / recommend_next_step / mark_response_complete（硬校验器）
- course_generation 工具↔专用 WS 通道互通

## 5. 课程（course-generation 子系统）
| 功能 | 状态 |
|---|---|
| marketplace 33 门全量 | 📦 evidence/marketplace_dump/（52.8MB，含答案） |
| enroll 免费 / re-enroll 409 + enrolledCourseUuid | ✅ |
| shared-course / join (IDOR #30) | ✅ |
| 结构：courses/{uuid}、structure/edit/regenerate/undo(版本栈) | ✅（第七轮） |
| generation-log/{run_id} 全回放 + final_course + semi_structure | ✅（r11_generation_log_own.json） |
| generation-feedback {run_id,course_uuid,stage,rating,comment} own-run 200 | ✅（第十一轮关闭） |
| course-calendar config/draft{duration_days}/accept{items[].scheduled_for}→70 任务 | ✅ |
| 考试 exam（答案内联）+ exam/score 客户端权威 {unitId,score} | ✅ |
| 练习 practice（答案内联）+ check-fill(LLM 判分) + assistant(form 编码) + progress(客户端权威) + tts/prewarm | ✅ |
| project：stages/{id}/state、steps/{id}/draft、submission(text|multipart file，LLM 评分)、tts、assistant | ✅ |
| uploads（带附件生成） | 🧩 |
| canvas-updates disable | ✅ |

## 6. 记忆 / 收件箱 / 通知 / 反馈
| 功能 | 端点 | 状态 |
|---|---|---|
| profile memory 读 | GET /memory/get_profile_memory（onboarding 4 问答） | ✅ |
| memory ops 写 | POST /memory/apply_memory_ops {operations[]} | ✅ |
| memory 管理面板 / 清除 | get_memory_management / clear_stored_memory | ✅ |
| external memory | get/update_external_memory（本账号空） | ✅ |
| 收件箱 | usr-msg-inbox/get_message、mark_read（空收件箱分页形状已知） | ✅ |
| banner | get_banner_message {has_message} | ✅ |
| 反馈 | send_feedback、send_founder_feedback（邮件线程话术） | ✅ |
| 邮件订阅 | email_manager/check(POST {email})/edit_email_subscription | ✅ |
| userPollData | 500 泄漏 PG 约束 (#30) | ✅ |

## 7. Drive / 文件 / 制品
- drive CRUD：get_drive_data / create_folder{directory_name} / delete{object_id} 异步 deleting / upload_file_to_drive / add_file_to_calendar ✅ （drive_used_source_bytes 计量）
- 公开制品面 6 处未鉴权：diagram/{id}.{md,html,pngr}、files/<10id>、video/{id}/final_video.mp4、whiteboard audio-stream wav、practice audio webm、project audio webm、pdf-annotation audio-stream wav ✅
- save_artifact 校验 artifact 存在性（404 精读错误） ✅

## 8. 连接器 / 外部
- Canvas LMS（save_access_token/metadata/browseFiles/downloadFile/checkCanvas/removeCanvas）⛔ 无真实实例（未配置时 404 合规）✅ 部分
- Google Calendar（start→authorization_url 全量字段、status、disconnect、sync_upcoming）⛔ 闭环需真 Google 账号
- kol 运营后台（独立体系，openapi.json 公开 #29）✅ 静态全模型 assets/kol_api_model.md
- go 入群码（slug 枚举 + X-Admin-Key 面）✅ go_surface_recon.md

## 9. 静态内容资产（📦 已全量本地）
- i18n 全字典、44 路由表、36 页契约 spec/pages/*、字体 605、图片 257、onboarding 音轨 88、dailyTrends 50 条、whatsnew 14 版本 changelog（assets/whatsnew_changelog.json）、onboarding 问题集、marketplace 目录、全套 prompts（director/deep-learn 教师/6 skills 指纹/pdf 教师行为/白板教师行为/deep-learn 会话行为）

## 明确不做
- Stripe 真实付款；Google OAuth 真闭环；Canvas 真实例；生产内部（Remotion worker/KMS/DB）。

## 12. 2026-09-16 轮新增功能点（抓包轮次见 `reference/evidence/live_2026-09-16/`）

| 功能点 | 形状/端点 | 状态 | 证据 |
|---|---|---|---|
| 白板互动动画（自包含 HTML） | `animation_pending{step_id,placement_step_id,task_preview,page_id}` → `generated_animation{html}`；CSP `default-src 'none'` 只放行内联脚本/样式 | ✅ 实测（含 14.9KB 样例） | r26 + `r26_animation.html` |
| 随堂单选（板面测验） | `ask{mode:"choice",question,options[],correct_index,explanation}`（与 `mode:"open"` 并存） | ✅ | r26 |
| 板面高亮（指向元素） | `highlight{step_id,target_board_id,page_id,snippet}` | ✅ | r26 |
| 回合收尾帧 | `response_complete{is_complete:true,status:"completed",session:false}` | ✅ | r26 |
| 白板会话 id 形态 | `session_id = <course_uuid>__<course_session_id>`；`lecture_outline_id = <course_uuid>:<course_session_id>` | ✅ | r25/r26 |
| 白板分栏状态模型 | `sync_whiteboard_state{whiteboard_state:{version,revision,activePageId,pages[{id,overlayItems[],columnLayout{lp:{colCount,tileW,tileGap…,exportPixelW…}}}]}}` | ✅（客户端→服务端） | r25 |
| 生成意图路由 | `course_generation_rejected{message,reason_code:"one_off_artifact",query,attachment_paths,course_uuid}`；前端另有「仍然继续生成课程 / 转即时协助」对话框 | ✅ | r29 |
| 检索多轮 | `Researching the web (round n/5)` → `Round n fetched N page(s)`（results 带 id/title/url/domain）→ `Round n summary ready` → `Selected N web source(s){reference_ids[]}`；正文用 `[refId]` 引用 | ✅ | r31 |
| 答题草稿 | c2s `course_generation_answer_draft{question,answer}` | ✅ | r31 |
| 生成冷却/占用 | 问卷阶段提示「生成可能仍在其他窗口进行中，HH:MM 后可继续」，此时 `继续` 不可用 | ✅（UI） | r33 |
| 技能链 | `get_skills` → `data.skill_name`（`cheatsheetGeneration` / `documentReading`）→ `ask_questions` → `user_question{question_data{questions[{question,is_multiple,options[],allow_custom}]}}` | ✅ | r29/r30 |
| 测验工具产物 | `generate_quiz.data.questions[]={question,answer_options[{index,content}],correct_answer,explanation,index}` | ✅ | r29 |
| 推荐下一步 + 学习进度 | `recommend_next_step.data{has_steps,next_steps[{display_step,step_prompt}],learning_progress{title_action,current_title,topic,percentage,…}}` | ✅ | r29 |
| 轮次计费帧 | `credit_status{credit_info{remaining_credits,max_credits,tier,turn_cost},next_reset_time}`（对话轮 turn_cost=1） | ✅ | r29 |
| 会话标题回写 | `conversation_title_updated{data{conversation_id,title}}` | ✅ | r29 |
| 连接器状态路径 | `/api/v1/connectors/google_calendar/status`（200）；`/google_calendar/status`、`/connectors/status` 均 404 | ✅ | r28b |
| 套餐表 | `stripe/plans`：Free 20c/24h、pro25a $12 40c/12h、pro25b $18 80c/12h、max25a $50 300c/12h（+`country_code`） | ✅ | r28 |
| 其他 REST 校正 | `orbie/get_orbie_recommendations{recommendations,count}`；`deep_learn/list_deep_learn_session` 为**裸数组**；`banner/get_banner_message{has_message,message}`；`/usage_limits` 404 | ✅ | r28 |
| 深度学习通道 | `deep_learn/ws`：`deep_learn_session_resumed{session_id,message,current_step_id,task_plan{title,description,tags,session_task_plan[{unit_name,tasks[{task_id,task_title,task_description}]}]}}`；`thinking{session_id}`、`tool_selection{…,task_title,model_name}`、`content_chunk`、`inline_diagram`、`step_completion{tool_name:"manage_task_progress",step_data,next_step,requires_acknowledgment}` | ✅ | r34 |
| 深度学习的图解占位 | `inline_diagram{placeholder_id:"dg_<12hex>",data:{type:"gemini_image",layout:"right",status:"ready",tag:'<diagram data-placeholder-id data-subtype data-layout data-status data-diagram-id data-file-url data-caption>',source_tag:'<content-type: diagram; … content-prompt: {…}; content-caption: {…}>'}}` | ✅ | r34 |
| 技能问卷作答（对话通道） | 速查表技能先问「内容详细程度」（一般/详细/非常详细 + `allow_custom`），答完再产出；作答帧由客户端发出 | ✅ | r30 |
| 生成忙锁 | 同一用户在其他窗口仍有生成时，问卷「继续」禁用并提示「生成可能仍在其他窗口进行中，HH:MM 后可继续」 | ✅ | r33 |
| 对话产物：抽认卡 | `generate_flashcards` → `data{flashcards[{question,answer,index从1}],total_count,title}` | ✅ | r35 |
| 对话产物：HTML 动画 | `generate_html_animation` → `data{diagram_id(8位),type:"html_animation",file_url,content}`；`file_url` 公开 200（diagram.png 对动画 404） | ✅ | r35 + `r35_animation_chat.html` |
| 对话产物：发布文件 | `publish_file`：无有效条目时 `tool_status:"error"` + `{error:"No valid conversation entries found for selected indices."}` + `agent_response` 兜底 | ✅ | r35 |
| 对话产物：教学视频 | `generate_instructional_video` 阶段帧：initializing → script_writing → generate_narration → code_generation → video_render×N（manim/remotion 逐幕）→ complete（`…/api/v1/video/<id>/final_video.mp4`） | ✅ | r36 |
| PDF 导读通道 | `session_ready{pdf_state{revision,file_id,annotations[]},board_state,course_state}`；`speak/annotation` 带 `tts_url`（`/api/v1/pdf-annotation/audio-stream/…`，默认 voice `firm`）；`annotation.text` 是高亮原文 | ✅ | `pdf_teaching_trace.json` |
| PDF 上传与配额 | `POST /pdf-annotation/upload`（multipart）；知识库页显示免费版：存储 1 GB、文件上传 5/周、添加到日历 2/周 | ✅ | r37/r38 |
| 视频逐幕渲染 | 线上 manim/remotion 逐幕；本仓 KaTeX 数学幕 + 无头 Chromium HTML 幕 + ffmpeg 合成，阶段消息同构 | ✅ | 本仓实测（场景 3 幕、mp4 26.9KB） |
