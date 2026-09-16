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

## 第三批对照（r55–r57）

| 部件 | 线上 | 本仓 |
|---|---|---|
| 侧栏**外层** | `.sidebar` 264px（容器），内部 `.sidebar-content-wrapper` 240px 白卡 | 布局列 240px（视觉一致；外层留白由 `--sidebar-margin` 提供） |
| 导航项 | `.nav-item` **padding 7px 12px、gap 14px、radius 8px**；`.button-label` **13px/19.5 w500 #333**；激活时底色 `#E8F0F8` **且文字变 #4C6696** | `.hk-rail-item` 同（激活蓝字是这轮补的） |
| 继续学习卡 | `.sidebar-resume-card` 白底 / radius 10 / border `#E8ECF3` / padding `10px 11px` / gap 5 / **阴影 `rgba(15,23,42,.04) 0 1px`** | 同 |
| 版本入口 | `.version-tag` 11px/16.5 **w500 #AAAAAA**、gap 4 | 侧栏「最新动态」入口同 |
| 首页主体 | `.home-scroll-body` padding **70px 20px 28px**、宽度 1228 | `Home.tsx` 同 |
| 首页装饰说明 | `.home-canvas-label`：标题 13px `rgba(17,24,39,.52)`、meta 11.5px `rgba(17,24,39,.4)`、tooltip 12px w500 白 / bg rgba(0,0,0,.9) / radius 6 / padding 6px 10px | 本仓 DotField 无对应文案（不补造） |
| 顶部控件 | `.avatar-frame` radius 20 padding 4 + `.avatar-image` 32px radius 16；`.language-icon-box` radius 8 + border 1px `rgba(0,0,0,.14)`、31px | 沿用现有按钮尺寸 |

**本轮未取到样**（下一批继续）：
1. **设置弹窗**：从侧栏头像点开没有弹出在 DOM 里（可能走 portal + 需要 hover/二次点击），三轮尝试都没拿到 `.settings-*` 类名。
2. **白板画布内部**（板面 tile 布局、讲稿气泡、插图框）：板面绘制在 canvas/iframe 内，外部只有 `whiteboard-canvas-shell` 一层，尺子量不到内部元素；要拿到得读 canvas 尺寸或从客户端 bundle 反推。

## 第四批对照：改读线上样式表（r58）

设置弹窗点不开、画布内部量不到，于是直接抓取 https://agent.hyperknow.io 的 55 张样式表（2.09 MB CSS）并按规则名抽取——这条路径比点 UI 更可靠，后续都可复用。

| 部件 | 线上 CSS 原文 | 本仓 |
|---|---|---|
| 设置弹窗容器 | `.settings-container{background:#fff;border-radius:20px;box-shadow:0 24px 48px #0000001f,0 0 1px #0000000d;max-width:950px;width:90%;height:600px;max-height:90vh;overflow:hidden;display:flex;flex-direction:row}` | `SettingsDialog` 同参数 |
| 设置遮罩 | `.settings-overlay{background:#0000001a;backdrop-filter:blur(2px);z-index:2000;animation:fadeIn .3s ease-out}` | 同（portal 遮罩） |
| 设置侧栏 | `.settings-sidebar{width:210px;background:#f4f4f4;border-right:1px solid #e9e9e9}` | 同 |
| 设置标题/关闭 | `.settings-title{font-size:18px;font-weight:600;color:#1a1a1a;padding-left:4px}`；`.settings-close{top:12px;right:12px;width:28px;height:28px;border-radius:50%;color:#666}` | 标题同；关闭钮沿用 Radix 默认 |
| 设置分组 | `.settings-group{margin-bottom:16px}`；`.settings-logout-group{margin-top:8px;padding-top:16px;border-top:1px solid #E5E5E5}`；`.settings-header{padding:16px 20px}` | 内容区间距沿用 16px 节奏 |
| 翻页控件 | `.whiteboard-page-nav{display:inline-flex;align-items:stretch;height:40px;background:#fff;border-radius:20px;box-shadow:0 2px 4px #00000026}`；箭头 `.whiteboard-page-nav-arrow{width:38px}`；计数 `font-size:13.5px;font-weight:500;letter-spacing:.2px;color:#8a8a8a`，当前 `#171717`、分隔 `#c4c4c4` | 同（高 40 / radius 20 / 38px 箭头 / 13.5 w500 ls .2） |
| 板书骨架 | `.whiteboard-board-skeleton{position:absolute;inset:0;z-index:25;display:flex;padding:96px 72px 64px;background:#fff}`；列 `flex:0 1 340px`、gap 18；标题 `height:26px;border-radius:10px`、行 `height:13px;border-radius:999px` | 同（准备中骨架） |
| 要点列表 | `.whiteboard-outline-keypoints{border-left:1.5px solid #ececec;padding-left:10px;gap:4px}`；条目 `padding:7px 10px;border-radius:10px;font-size:13px;line-height:1.4;color:#8a8a8a`；`.whiteboard-outline-keypoint-dot{width:5px;height:5px;background:#d4d4d4}`，**`[data-status=current]` 时圆点变 `#4c6696`**；`-live` 徽标 `gap:3px;margin-left:4px` | 同（含 current 圆点与「讲到这里」徽标） |

## 第五批对照：侧栏收起态与控件微件（r60/r61）

线上侧栏是「60px 图标栏 + 点开展成 240px 白卡」的双态模型，不是固定宽度列。变量与规则都在样式表里：

| 部件 | 线上原文 | 本仓 |
|---|---|---|
| 侧栏变量 | `:root{--sidebar-width:240px;--sidebar-margin:12px;--sidebar-radius:16px;--sidebar-header-pad:16px;--sidebar-toggle-size:24px}` | 同值 |
| 侧栏色板 | `--sidebar-bg:#FFFFFF;--sidebar-hover-bg:#EBF4FF66;--sidebar-active-bg:#E8F0F8;--sidebar-active-bg-hover:#d4e2f4;--sidebar-active-color:#4C6696;--sidebar-active-color-hover:#3D5477;--sidebar-transition:.3s cubic-bezier(.4,0,.2,1)` | hover 改 `rgba(235,244,255,.4)`，补 active-hover `#d4e2f4` + `#3d5477` |
| 导航项 | `.nav-icons-group{--nav-padding-x:12px;--nav-gap:14px;--nav-icon-size:20px}`；`.nav-item{width:33px;height:33px;border-radius:8px}`；`.nav-item.expanded{width:calc(var(--sidebar-width) - 2*var(--nav-padding-x));padding:7px 12px;gap:var(--nav-gap)}` | 高 33 / radius 8 / gap 14 / 图标 20px / 组间距 4px |
| 图标态 | `.nav-item img{opacity:.65}`，hover 与 active 变 1（active 再叠加蓝色 filter） | 图标 65% → hover/active 1 |
| 收起态 | `.sidebar.compact{--sidebar-width:60px;--sidebar-radius:12px}`；`.sidebar.compact .nav-item{width:40px;height:40px;border-radius:10px}`；`.sidebar.compact .button-label,…{display:none}`；logo 26px、头部竖排 gap 17 padding `16px 0 3px`；wrapper 上下 8px、阴影 `0 2px 10px #0000000d,0 1px 2px #00000008` | 同（60px / radius 12 / 40×40 / 隐藏标签与下部区段） |
| 收起态提示 | `.tooltip{left:calc(100% + 12px);background:#000000e6;color:#fff;padding:6px 10px;border-radius:6px;font-size:12px;font-weight:500}`，`.sidebar.expanded .tooltip{display:none}` | 同（`hk-tip`） |
| 折叠钮 | `.collapse-icon{width:var(--sidebar-toggle-size);height:var(--sidebar-toggle-size);border-radius:8px}`（24px） | 同 |
| 发送键 | `.send-button{width:33px;height:33px;border-radius:50%;border:1px solid #D1D1D1;background:#e7e7e7;box-shadow:0 2px 4px #00000026}`；hover `#d5d5d5` + `0 3px 6px #0003`；`.disabled{background:#f5f5f5;border-color:#e0e0e0;opacity:.6}` | 同（`.hk-send`，四处 composer 统一） |
| 白板缩放 | `.whiteboard-zoom-pill{height:40px;border-radius:20px;box-shadow:0 2px 4px #00000026}`；`.whiteboard-zoom-btn{width:38px}`；`.whiteboard-zoom-readout{min-width:54px;font-size:13.5px;font-weight:500;letter-spacing:.2px;font-variant-numeric:tabular-nums;color:#171717}` | 同（实测 40/20/38/54/13.5 w500 ✓） |
| 练习进度点 | `.practice-progress-dot{width:17px;height:10px;border-radius:999px;background:#d4d4d4}`；`.practice-progress-dot--active{width:25px;height:18px;border:2px solid #D4D4D4;background:transparent}` | 同（答对/答错沿用绿/红，形状按线上） |
| 消息卡 | `.orbie-message-card{background:#fff;border-radius:16px;padding:14px 18px;box-shadow:0 2px 8px #0000000d;gap:12px;min-height:160px}`；`.message-content{font-size:15px;color:#333;line-height:1.5;gap:12px}`；`.message-header{font-size:12px;gap:6px}` | 记为后续对照（对话页正文排版） |

