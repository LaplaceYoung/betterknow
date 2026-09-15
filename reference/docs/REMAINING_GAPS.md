# Hyperknow 未逆向区域审计（2026-09-03 实时一轮 → 第七轮后已大幅清空）
> **第十轮（2026-09-03 PM）已再清空**：marketplace 33 门全量收割落盘；course-calendar draft/accept、project stages 全端点、practice/check-fill+progress、pdf-annotation 导读全链、VoiceMode 双通道语音全部实测关闭。终态剩余见文末。

> 第七轮收割后再扫：原 A1（白板多页链）全实测、A3 语音、B 表全部项/共享 join、exam/practice 提交、SSE followup、结构编辑/regenerate/undo 已完。剩：Stripe 真实交易（人工不试）、真实 Google Calendar OAuth 闭环、Canvas 真实实例不可达、子生成器系统提示词（无可靠泄漏通道），以及 require 中排定任务类（orbie）的被动性质。

对照楼：44 路由 + 130 端点 + 4 WS 通道已知面。以下为**还缺/未证**清单，按优先级。所有结果均有两证口径：标记 [实测] 的现场拿证、[静态] 反编译证据、[缺] 仍未探。

## A. 有协议骨架但深链还没打通
1. **课程白板授课多步页操作**（new_page/new_column/circle/highlight/keypoint/reward_user/image/animation_pending 等 34 种服务端帧静态全集都已在 WhiteboardPage 反编译源码中见，只有 group/board/tts_segment/insufficient_funds 类实测过）——缺实链上的多页推进。卡点：open 情况下 step_completion_response 未回改帧（需客户端 TTS 播完信号）；奖励帧 reward_user 试探未命中。[实测部分/静态补]
2. **PDF 批注 session**（SplitLayout 281KB 组件的 reference_reading_started/completed、annotation 帧词汇、sync_pdf_state 客户端 → 服务端 shape 都已在反编译中见）。已实测：upload（multipart + session_id）200 ✓ 与 WS 连接糊；一次未跑通真正会话的导读轮次。
3. **VoiceMode (双向语音)**：VoiceModeModal 960KB 反编译可参考但实测缺：interject_audio_chunk PCM 分块与 `interject_audio / interject_done / voice_transcript` 帧、VAD、TTS 流回。语音端点 REST 已对齐（原有）。

## B. 原型存在的但未实测 (端点形状通过反编译或 422 反推已明）
4. **exam/score**：`{score}` 客户端算分（quizScoring chunk 证实评分在客户端做）→ 服务端只收账 [静态完全]
5. **practice/check-fill**：`{sessionId,questionId,answer}` [静态]
6. **project stages**：`stages/{id}/state|steps/{id}/draft|submission|submission/text|tts` 字段取 ContractMiner 的 spec [静态]
7. **course-calendar draft/accept**：`{course_uuid}` 单发探测题目字段未深入 [静态下]
8. **shared-course**：GET `…/shared-course` 405 → POST with course uuid/share_token，未试（位一个轻创建操作，留）
9. **generation-feedback**：POST 报星等+[评论]、[静态]（score 奇的：我读的那门 course log 里有 rating 4 "RE probe: solid structure" 本不是我话——账号域共享疑虑记在安全报告 #疑）
10. **userPollData**：`{email, ...}` 必填 email，空 → DB 约束 500 [实测]
11. **chatResponseFollowup/stream**：文本选中追问 SSE/流式，422 需 body 未录 [静态端点已知]

## C. 零接触区 (全都没探)
12. **Canvas LMS**：save_access_token / save_school_metadata / browseFiles / downloadFile / course-calendar canvas-updates 只看 agents.static；没真实 Instructure 实例可达性 (诚记: canvas-test.hyperknow.io TLS 失败公开线)
13. **Google Calendar OAuth**：authorization_url 全量拿（client_id=890936997937-…, scope calendar.events, offline, redirect → api.hyperknow.io/api/v1/connectors/google_calendar/callback）；sync_upcoming / disconnect 未 [实测] （不含任意码不展开）
14. **Stripe**：checkout/change_plan_preview/cancel/customer-portal 未试（钱对真实账户付）
15. **Sub-agent 提示词本体**：director 已漏全；但 generate_content / generate_quiz / 课程生成/视频 pipeline 的系统级 prompt 从未被 WS 发射，深度探针不依赖注入难以详从外部拿到；唯一直通道是 enhanced 分享会话（系 prompt 总表守用户最宽根同区间）
16. **orbie 主动代理**：get_orbie_recommendations 常量空 (onboarding 勾了 on 也一样) → 定性：生成是按排定(Cron/后台)进行，非请求驱动。入知识推论
17. **fileGeneration 再运行**: `/file_generation/rerun` 未试（需要旧报 worker）
18. **whatsNew 文案源**：静态 bundle only
19. **rotating 提示**: credit reset (12h) 机制布尔，轮的符信未实际目击

## D. 轿安全但值得记
20. acct1 在生成 invite 链接后被升级 4-day Pro(pro25b, 80 credits) — "pro_days:4" 奖励自授的疑点 [报告 #29]
21. 生成日志表 rating 字段里出现非本人评分记录 [报告第六轮 #疑]（rating:4 "RE probe: solid structure" 不是我发的）

# 已齐全（别重跑）
- 系统提示词全文/directorAgent、6 skill 行为指纹、28 工具前端注册表、Qv 步骤 i18n、WS 四通道、课程生成全迹、视频/绘图/`files/`、diagram、文件、TTS 音频、marketplace 33 门、深学/会话/分享/邀请/推广双层、onboarding 4 步问答、learning-summary、generation-log（70 events）、exam/practice/project 完整卷、cookie/localStorage 全键、Supabase 公共面、14 子域成果
- 字体 605 个 + 图片 257 + onboarding 语音 88 条 + Orbie 角色动画 + index/css 全部
- 页面/模块/道约：44 路由+36 页结构契约（hyperclone/spec/pages）

## 第十轮之后实际剩余（终态 v2：API/协议面见底）
- 支付/Stripe 真实产物（按用户明确不管）
- Google Calendar OAuth 真实闭环（需真 Google 账户登录，不做）
- Canvas 真实同步联机（无真实实例）
- **生成器子提示词本体**：已在三轮攻击面上确认不可达（见 AGENT_ARCHITECTURE.md "取证结论"）
- Netflix 程度的后端内部（不能直接外测的：生产成本部署、KMS/DB 防护、Remotion render worker）
- generation-feedback 的 own-run 写入（需 10 credit 生成 run，本轮判 ROI 不足跳过；schema 与跨账号 404 校验已定）
- 流式语音 chunk 上行的服务端参数面（已定性为线上哑路径，见报告 #40）
- citation/files 的真实调用参数（前端仅在会话引用场景触发，未构造到有效 body）
- orbie 推荐的 cron 触发时机（定性：非请求驱动，等后台排定）
