# Hyperknow UI flows（提取波次 A）

> 采集为共享隔离浏览器 `iso`，新注册 `rk…@qq.com` 账号；每个视图对应 `assets/screenshots/ui_flows/<name>.webp` 与 `.txt`。`.txt` 包含截断至 2500 字的 `innerText`、简化 ARIA 与关键交互元素。旧版 `assets/screenshots/` 根目录文件未覆盖。

## Onboarding（逐屏）

| 视图 | 路由 | 功能/主要内容 | 端点/交互 |
|---|---|---|---|
| Welcome | `/onboarding` | Orbie 欢迎文案、多语言问候；Continue；语言选择 English/简体中文/繁體中文/Español/한국어/हिन्दी/اردو | Continue、7 个语言 radio、Confirm；答案通过 profile-memory 更新 |
| Language selected | `/onboarding` | 语言选项已选状态、Confirm 可用 | 语言 radio、Confirm |
| Discovery | `/onboarding` | “Where did you find Hyperknow?”；搜索、社交媒体、同学同事、校园、博客新闻、Other；可展开 Have a referral code? | acquisition chips、referral 输入/兑换；`POST /api/v1/memory/update_profile_memory` |
| Discovery selected | `/onboarding` | Search engine 选中、Continue | chip、Continue |
| Learner role | `/onboarding` | “Which best describes you right now?”；高中、大学、研究生、自学/职业、Other | onboarding tile radio、Back、Continue；`POST /api/v1/memory/update_profile_memory` |
| Handover | `/onboarding` | 产品更新介绍：“AI can actually teach better than humans” | Continue |
| Tour 1 | `/onboarding` | “Most AI can only handle scattered Q&As.” | Back、Take a closer look |
| Tour 2 | `/onboarding` | 课程 units/lectures/sessions、每节后 practice | Back、Continue |
| Tour 3 | `/onboarding` | 白板授课、Chat history 演示 | Back、What's more |
| Tour 4 | `/onboarding` | Instant Assistance 介绍 | Back、Great |
| Instant Assistance | `/onboarding` | “That’s the tour!” 进入个人学习 | Let's get started! |
| Finish pre-submit | `/onboarding` | 完成 CTA 前的最终屏 | CTA 未点击，避免提交最后一步；`POST /api/v1/onboarding/manage_onboarding` 未触发 |

## 主界面、弹层与设置

| 视图 | 路由 | 功能/主要内容 | 端点/交互 |
|---|---|---|---|
| Home fresh | `/` | Craft Courses/Instant Assistance、额度、Marketplace 卡片、Recent Activities | Send、Add、source 切换、View all、Preview、What's new、Talk to Founders |
| What's New | `/` + modal | v1.3.13 更新日志（NEW/IMPROVED/FIXED，版本日期） | version-tag；Close |
| Account dropdown | `/` + menu | Subscription、Refer a friend、Earn as Affiliate、Settings、Stay in the loop、Sign out | 菜单项导航/动作 |
| Bug/feedback modal | `/` + Talk to Founders | 发给 founders@hyperknow.io；Subject、附件拖拽、注册邮箱回复提示、Send | `POST /api/v1/send_feedback`；Subject、附件、Send |
| Settings General | `/` + Settings | Memory 开关、Account/Subscription/Coupon/Preferences 分组、Canvas/Calendar integrations、Sign out/Delete account | General/Memory tab；连接、Redeem、Sign out、Delete account |
| Settings Memory | `/` + Settings > Memory | Manage Memory；profile 三问；saved memories；external memory；清空存储 | Manage Memory、Add memory、Edit memory、Clear stored memory |
| Settings Account | `/` + Settings | 账户子页/账号操作 | Account sidebar |
| Settings Subscription | `/` + Settings | 订阅子页 | Subscription sidebar |
| Settings Coupon | `/` + Settings | Coupon 子页 | Coupon sidebar、Redeem |
| Settings Preferences | `/` + Settings | Preferences 子页 | Preferences sidebar |

## 学习内容与空态

| 视图 | 路由 | 功能/主要内容 | 端点/交互 |
|---|---|---|---|
| Courses | `/courses` | Your Courses、All/In Progress/Completed、空书架、周 token milestone、Marketplace 推荐 | filter tabs、Marketplace、See more；`GET /api/v1/course-generation/courses` 等 |
| Learning Feed | `/learning-feed` | 日历月/周视图、待办/学习统计 | 日期导航、周/月切换；`GET /api/v1/calendar/list_main_tasks` |
| Study History | `/history` | Conversations/Deep learn sessions tabs；无匹配会话 | New Conversation、filters；历史端点 |
| Marketplace | `/marketplace` | Search、All 与 10 Subject tabs；官方课程卡（lesson/onboarded/rating） | Search、subject tabs、Preview；`GET /api/v1/marketplace/courses` |
| Marketplace Preview | `/marketplace/<courseId>/preview` | “How AI actually Works” syllabus，units/lectures/sessions，Learn/Practice，assessment Start | Back to Marketplace、Learn、Practice、Start；`GET /api/v1/marketplace/courses/{id}` |
| Course welcome | `/course/<courseId>/welcome` | 未 enrolled UUID 显示 Course not found（课程欢迎壳） | Exit Course；enroll 端点为 `POST /api/v1/marketplace/courses/{id}/enroll` |
| Course main | `/course/<courseId>` | 未 enrolled UUID 显示 Course not found | Exit Course |
| Exam empty | `/course/<courseId>/exam/<unitId>` | “Your exam is still being prepared. Check back in a moment.” | Back/Exit；课程数据端点 |
| Practice empty | `/course/<courseId>/practice/<sessionId>` | practice 准备中空态 | Back/Exit；课程数据端点 |
| ProjectStage empty | `/course/<courseId>/project/<stageId>` | 无项目数据的空白阶段壳 | Exit/Back；课程项目端点 |
| Inbox | `/inbox` | Messages/Updates；No messages yet | tabs；Inbox 端点 |
| Knowledge Base | `/knowledge-base` | No files found；目录空态；New/upload | New、上传、目录操作；files 端点 |
| Coupon page | `/coupon-code` | 无 navigation coupon state 时回到 home（可观察到 Home shell） | Redeem flow 使用 subscription endpoint |
| Public share | `/share/c/4e1e93da-0000-0000-0000-000000000000` | 无效会话显示 Conversation Failed to Load/link invalid/Hyperknow footer | `GET /api/v1/share_record/share_records/{id}`（证据端点形状）；Start own journey |
| Dev course structure map | `/dev/csm` | 内置大学物理 I 结构蓝图、units/lecture/session；确认生成完整课 | Select/Confirm & Generate Course（演示页，无 fetch） |

## 采集说明

- 新账号注册：`POST /api/v1/auth/register` body `{username,email,password}`；登录：`POST /api/v1/auth/login`；localStorage 注入 `access_token/refresh_token/user_id/username/token_timestamp`，并保持 onboarding 未提交流程。
- 课程 preview 可从首张 Marketplace 卡进入，实际 route UUID 已记录在对应 `.txt`。因新账号没有已 enrolled course，直接课程路由按真实 UI 返回 `Course not found`，没有伪造 enrollment 或课程数据。
- 所有截图均为实际浏览器截图（WebP）；文本档含简化 ARIA 和交互清单。
