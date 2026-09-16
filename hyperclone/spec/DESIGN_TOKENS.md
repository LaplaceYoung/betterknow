# 设计还原对照表（线上 computed style 实测 → 本仓落地）

来源：`reference/evidence/live_2026-09-16/r51_design_tokens.json`、`r52_practice_design.json`（对 `agent.hyperknow.io` 各页取 computed style），
对照脚本见同轮抓包；本仓数值用同一批选择器在本地取 computed style 复核。

## 全局

| 项 | 线上实测 | 本仓 | 落点 |
|---|---|---|---|
| 页面底色 | `rgb(250,250,250)` | `--app-bg: #FAFAFA` | `index.css` |
| 正文字号/行高 | `16px / 24px` | 同 | `body` |
| 正文颜色 | `rgb(0,0,0)` | `#000` | `body` |
| 字体栈 | `Satoshi-Medium, MiSans, "PingFang SC", "Microsoft YaHei", sans-serif` | `Satoshi-Variable, Satoshi-Medium, MiSans, PingFang SC…` | `--font-satoshi`（两者都内嵌 Satoshi woff2） |
| 基础圆角 | `--radius: .625rem`（10px） | 同 | `:root` |
| 主色/前景/边框变量 | `--primary 0 0% 9%`、`--muted #71717a`、`--border #e4e4e7`、`--accent #18181b` | 同 | `:root` |
| 侧栏宽度 | `.sidebar` 264px | `--sidebar-width: 264px` | `index.css` |
| 侧栏底色 | `rgba(0,0,0,0)`（与页面同底） | `transparent` | `Sidebar.tsx` |
| 导航项 | `.nav-item`：radius 8px、激活底 `#e8f0f8` | `.hk-rail-item`：height 34 / radius 8 / 激活 `#e8f0f8` | `index.css` |

## 排版层级

| 用途 | 线上 | 本仓类 |
|---|---|---|
| 分区标题（继续学习 / 今日待办…） | 12px / 18px / w600 / `#333` | `.hk-section-title` |
| 首页 hero | 24px / 30.72px / w650 / ls −0.24px / `#333` | `.hk-hero-title` |
| 页面标题（知识库等） | 20px / 30px / w650 / `#1a1a1a` | `.hk-page-title` |
| 课程标题 / 副标题 | 22px w400 `#111827`；14.5px w600 ls −0.145px | `.hk-course-title` / `.hk-course-sub` |
| 卡片 | 文件卡 14px；日程卡 18–20px；通用白卡 10px；边框 `rgba(20,20,20,.06)` | `.hk-card`：16px + `1px solid rgba(20,20,20,.06)` + `0 1px 2px rgba(20,20,20,.04)` |

## 练习（一整套对齐）

| 部件 | 线上实测 | 本仓 |
|---|---|---|
| 舞台 | `.practice-stage`：radius 14px、border 1.5px `#e5e5e5`、白底 | 题目区外层同款 |
| 计时条 | `.practice-timer`：高 3px、`#f3f4f6`、radius 14px 14px 0 0 | 同 |
| HUD 容器 | gap 8px、字号 12.5px | 同 |
| 速答奖励 chip | bg `#fffbea`、border 1.5px `#e8d48a`、文字 `#a68b2c`、radius 999px、高 34px、内边距 0 13px | `.hk-chip-bonus`，数值一致 |
| 得分 | 13px / w700 / `#2a4578`（滚轮数字样式） | 同色同字重 |
| 进度点 | 25px 宽活动段、radius 999px、2px `#d4d4d4` 描边、gap 10px | 同 |
| 题面 | kicker 12px `#a7a7a7`；题干 17px / 24.65 / w500 / `#1f1f1f`；内容宽 **672px** | 同 |
| 选项 | `.practice-options-grid`：grid、gap 12px；`.practice-option-shape`：**34×34 / radius 9px / 每项柔和底色**（首项实测 `rgba(195,71,71,.12)`） | 同（四色轮转：红/琥珀/蓝/绿） |
| 检查按钮 | radius 999px、padding 15px 80px、16px；禁用 `#ececec` + `#878787` | 同 |
| 跳过按钮 | radius 999px、padding 12px 24px、14px、border 1.5px `#e0e4ec` | 同 |
| 操作行 | 右对齐、间距 23px | 同 |
| 助手入口 | 白底 pill：border 1.5px `#e0e4ec`、13px、高 34px、内边距 0 14px、gap 7px | 同 |
| 助手面板 | 宽 340px、radius 14px；输入框 13.5px、bg `#f5f5f5`、radius 999px、border 1.5px `#e2e2e2`、宽 239px；附件按钮 28px 圆、发送按钮 33px 圆 | 侧栏 340px + 同款输入行 |
| 入场弹窗 | 「准备好练习」：宽 490px、radius 18–20px、插图 + 说明「全部答对，这次练习就会被标记为「已掌握」…」+ 黑色 pill「知道了」 | `practice-ready`（490px / radius 20px / 同文案） |

## 尚未对照（下一批）

1. 对话响应页（`/response/*`）：目录栏、markdown 正文、工具卡、推荐步骤区块的排版与留白。
2. 课程集市与课程预览页的卡片网格、封面比例、筛选条。
3. 历史页与会话列表项（时间分组、星标、重命名交互）的样式。
4. 白板内部元素（讲稿面板、要点面板 `-live` 标记、工具条按钮尺寸）。

## 对话响应页（`response-*`，r53）

| 部件 | 线上 | 本仓 |
|---|---|---|
| 容器 | `.chat-response-container` padding 20px、bg #fafafa | 同底色与内边距 |
| 回答列 | `.response-renderer` **774px** | `ChatResponse` 正文列 `max-w-[774px]` |
| 底部动作 | `.response-action-buttons` gap 4px；`.response-add-button` **33px 圆**、border 1px #e5e5e5；`.response-tools-button` 白 pill radius 999、border #e5e5e5、padding 0 10px 0 9px、gap 6、文字 14px #444 | 同（上传圆钮 33px + 工具 pill） |
| 语音指示 | `.response-voice-bars` gap 2px、`.response-voice-bar` 2px 宽 radius 2 #555 | 沿用现有朗读指示 |
| 侧栏 | `.sidebar-content-wrapper`：**240px 白卡、radius 16、border 1px rgba(0,0,0,.06)**；`.sidebar-resume-card` radius 10、border #e8ecf3、padding 10px 11px；`.sidebar-resume-kind` 10px #4C6696 / bg #EEF2F8 / radius 999；`.sidebar-resume-title` 12.5/16.875 w600 #1F2937；`.sidebar-resume-course` 11/14.3 #8A8C93；`.conversation-item` radius 6、padding 8px 12px、标题 13/16.9 w500 #333 | 全部落到 `Sidebar.tsx` + `.conversation-item` |

## 课程集市（`mktp-*` / `course-ticket-*`，r54）

| 部件 | 线上 | 本仓 |
|---|---|---|
| 特色卡 | `.mktp-featured-card` radius **18**、bg **#EDEBE8**；标题 24/30 w700 白；描述 13.5/19.575 rgba(255,255,255,.88) | 同 |
| 科目 tabs | `.mktp-tab` 14px **w700** #1a1a1a、padding `7px 2px 14px` | 同 |
| 课程票根 | `.course-ticket` 272px；作者名 12.6/15.12 w600 #0F1F33；标题 **17.3/22.144 w600 #0F1F33**；描述 12.75/17.2125 **w500 #6F7485**；信息标签 10.8 w500 #0F1F33 / bg #F3F3F2 / radius 999 / padding 3.5px 11px；人数数字 12.75 w700 **#4C6696**；评分 12.75 w700 #1F2A3A；科目小标 10px w600 #9AA1B0；科目标签 12 w600 #4C6696 / bg #EEF2F8 / radius 6 / padding 3px 8px；**报名圆钮 32px bg #4C6696**；已报名 10.5 w700 白 / bg #2F7A5C / radius 8 | `CourseCard.tsx` 全量对齐 |

## 白板内部（`whiteboard-*`，r54）

| 部件 | 线上 | 本仓 |
|---|---|---|
| 侧栏 | `.whiteboard-sidebar-inner` **260px**、padding `12px 0 0`；`.whiteboard-sidebar-content` padding `0 16px`；bg #fbfbfb | 同 |
| 大纲卡 | `.whiteboard-outline-panel` gap 8；`.whiteboard-outline-section-title` **10/15 w700 #A3A3A3**；`.whiteboard-outline-readonly-card` bg rgba(255,255,255,.78)、radius 10、border 1px #E5E5E5、padding 9px 10px；条目标题 12/18 w600 #262626；meta 11/14.3 #737373；正文 12/17.4 #525252 | 要点面板同款 |
| 缩放/翻页 | `.whiteboard-zoom-pill` / `.whiteboard-page-nav`：白底 radius 20、按钮 38px、读数 13.5 w500 #171717 | 同读数样式 |
| 提示 toast | `.whiteboard-session-prompt-toast-*`：grid 130px/248px、文案 15/24 #374151、按钮 13.5 w500 白 / bg #111827 / radius 999 / padding 9px 22px | 沿用现有 toast |

## 尚未对照

1. 课程集市**预览页**（`/marketplace/<id>/preview`）与加入课程弹窗。
2. 设置弹窗各 tab（账户/订阅/偏好/记忆）的控件尺寸。
3. 历史页的**时间分组标题**与星标/重命名交互样式。
4. 白板画布本身（板面排版、讲稿气泡、插图画框）与 zen 模式下的留白。
