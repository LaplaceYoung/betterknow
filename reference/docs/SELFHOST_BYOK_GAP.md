# 自部署「完全一样 + BYOK」缺口清单（2026-09-03，基于 hyperclone 现状实测盘点）
> **状态更新（2026-09-03 PM 收口执行后）**：Tier-0 全量完成（513 静态引用 0 缺失；marketplace 33 门 52.8MB 灌入 seed，enroll/exam/practice/project/check-fill 语义与原站一致，smoke_seed 绿）；Tier-2 全量完成（WS 通道齐 7 条：deep_learn/drive/net-check 新增、pdf 导读编排全相、语音全双工+interject_pcm、白板扩展帧，smoke_ws2 绿）；Tier-3 管线完成（课程 6 相位 prompt 组入 `src/pipelines.ts` COURSE_PHASE_PROMPTS；视频 ffmpeg 幻灯渲染真实出 mp4 ftyp；publish_file 纯 TS PDF 生成器；code_generator 真沙箱 node/python；cron 三件 credit/orbie/proactive；BYOK 扩展位 tts/stt/search/image 入 config）。回归：smoke_seed + smoke_ws2 + smoke_pipelines + smoke_e2e 四件全 PASS。剩余仅 Tier-1 真供应商密钥接入（后期 BYOK）与 Tier-4 运营面。

## 现状基线（已不需重做的）
- **前端 = 原站生产镜像**：`server/public/` 托管 125 JS chunks + 49 CSS + index.html，API/WS/Supabase 端点常量已重写至本机（`assemble-frontend.mjs`）——页面像素/交互与原站同源一致
- 服务端：`rest.ts` 40KB、104 条路由注册（对照原站 ~130 端点）；`ws.ts` 35KB 覆盖 4 条 WS 通道（chat/whiteboard/pdf-annotation/course-generation）
- BYOK：`config.ts` provider(kimi/openai-compatible/stub) + `/byok/` 页面 + 按用户 BYOK 覆盖（director/content/quiz 三模型位）
- 内容资产已收割：`evidence/marketplace_dump/` 52.8MB（33 门课×5 件）、assets/fonts 612 文件、图片 378、onboarding 语音、whatsnew 14 版、i18n 全字典、prompts（director 15KB + deep-learn 12.7KB + 4 份 persona 行为画像 + 6 skills 指纹）
- 数据种子：marketplace 目录、dailyTrends、onboarding 题库、tools_registry（28 工具）

## Tier-0 资产同步（纯拷贝，小时级）
| # | 缺口 | 现况 | 动作 |
|---|---|---|---|
| 1 | 字体 | public 下仅 5 项 vs 已收割 605 | `assets/fonts/bin/*` → `public/font*/` 对位拷贝，抽查 CSS font-face 引用 |
| 2 | 图片 | `public/assets/png` 仅 4 个 vs 已收割 257+ | `assets/img/**` 对位拷贝 |
| 3 | onboarding 语音/视频 | 84 文件已镜，对照原始 88 语音清单差 4 条 | 按 `evidence/onboarding_media_download_log.json` 补齐 |
| 4 | marketplace 内容物化 | seed 只有 33 门目录元数据 | `marketplace_dump/**` 灌入 store：enroll 返回 full.json；exam/practice/project/progress 端点改为按 courseUuid 读种子 |

## Tier-1 BYOK 供应商接入（仅鉴权和调用点，天级）
| # | 缺口 | 原站行为证据 | 接入方案 |
|---|---|---|---|
| 5 | TTS 全链 | voice_id 六值（warm/calm/bright/gentle/firm/lively）+ speed 0.5–2；产 wav/webm 落 storage，`tts_url`/`audio_url` 下发 | 任一 OpenAI-compatible TTS / edge-tts / ElevenLabs；新增 `BYOK_TTS_*` env + voice 映射表 + 本地 artifacts 落盘（替代 S3） |
| 6 | STT 语音上行 | `interject_question{audio_b64,mime:audio/wav}` → `interject_user_text` 转写（法：r10/r11 已闭环） | Whisper API / groq whisper；ws.ts 增 STT 段，chunk 路径可照原站降级（原站本身是哑路径，见报告 #40） |
| 7 | 图像生成 | `inline_diagram data-subtype="gemini_image"` + diagram_drawer | Gemini image / flux / DALL·E `BYOK_IMAGE_*`；diagram/{id}.png 落本地 |
| 8 | Web 检索 + URL 抓取 | course researching_the_web 5 轮 progress 帧 + analyze_url_content + search_and_summarize_web | Tavily/Exa/SerpAPI `BYOK_SEARCH_*`；URL 抓取可自实现 fetch+readability |
| 9 | PDF 发布渲染 | publish_file → 公开 `files/<id>`（2 页 8pt 4 栏参数已知） | puppeteer/weasyprint 渲染 markdown→PDF，走 artifacts |

## Tier-2 协议补齐（帧形状已逆向全齐，1–2 天）
| # | 缺口 | 事实源 |
|---|---|---|
| 10 | deep_learn/ws + drive/ws + net-check/ws 三条 WS 未实现 | r11_deeplearn_ws.jsonl 114 帧全相在案；drive/ws 仅 bundle 存在性 |
| 11 | pdf 导读编排全相：sync_pdf_state 绑文件 → speak/annotation(highlight/circle/annotate)/ask{mode:open}/mark_response_complete/done + step ack | r10_pdf_session_v4.jsonl |
| 12 | 语音全双工：interject_ready/text/audio/done + 下行 interject_pcm 24kHz | r10_voice_ab.jsonl |
| 13 | 白板 34 帧全集（new_page/new_column/highlight/circle/keypoint/reward_user/generated_image…） | WhiteboardPage 反编译表 + tool_frames/deep_whiteboard_* |

## Tier-3 管线工程（原站服务端私有件，只能反推重建）
| # | 缺口 | 说明 |
|---|---|---|
| 14 | 视频生成（Remotion+Manim+TTS） | 原站 generate_instructional_video 帧协议已知（tool_video_full.json）；本地需装 Remotion+ffmpeg，最大单件工程 |
| 15 | code_generator 沙箱 | 原站服务端执行（CPython 异常明文证据）；本地用 docker/受限 runner |
| 16 | 课程生成 6 相位 prompt 组 | researching/syllabus/structure/session_outlines/exam/practice/project——原站子提示词取证为 zero-access（3 轮结论），须用 33 门市场课+自产课成品反推提示词模板（输入 query+profile → 输出形状已全部落盘） |
| 17 | cron 件 | credit 12h 轮转重置（字段语义已知）、orbie 推荐、proactive 任务生成——node-cron 即可 |

## Tier-4 运营面（自部署可裁剪）
- 邮件：founder feedback/订阅偏好 → SMTP 或事务邮件服务
- Stripe：自部署通常省略（改全 Pro 开关即可）；保留则接自有 Stripe
- Google/Canvas connector：自建 OAuth app 或裁剪
- **Supabase 残留**：镜像 bundle 内 supabase-js 调用已重写至 `/sb-stub`，仅 settings 200 其余 501 → Google 登录按钮与忘记密码页会静默失败；要么藏掉该入口，要么 sb-stub 补 auth/token 最小面
- 安全基线（若公网）：务必**不复刻原站漏洞**——CSP/HSTS、公开制品改签名 URL、注册加验证码、方向参考 SECURITY_REPORT 修复建议清单

## 验证缺口
现有 verify_*.png 覆盖注册/onboarding/home/chat/quiz/课程向导/白板/deep-learn 骨架；未覆盖：exam/practice/project 页全链路、语音 interject、pdf 导读、marketplace enroll→journey 闭环、`/byok/` 页面。

## 最小可发布定义（建议顺序）
1. Tier-0 全量（当天）
2. Tier-1 #5 TTS + #8 搜索（体验完整度的 80%）
3. Tier-2 全量
4. Tier-3 #16 prompt 组（课程质量核心）
5. Tier-1 #6/#7/#9 + Tier-3 #14/#15 按序补
