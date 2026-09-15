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
