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

## 第六批对照：市场精选、消息动作、加入弹窗（r62-r65）

先对 6127 个类名做了前缀普查（`r62_css_prefixes.json`），按子系统大小定位：`course` 304、`whiteboard` 200、`cpub` 192、`cj` 182、`practice` 171、`canvas` 142、`mktp` 59、`inbox` 49、`response` 43。

| 部件 | 线上原文 | 本仓 |
|---|---|---|
| 市场精选 bento | `.mktp-featured{max-width:1160px;margin:0 auto 36px}`；`.mktp-featured-bento{grid-template-columns:repeat(12,1fr);grid-template-rows:234px 190px;gap:14px}`；卡片位次 `nth-child(1){1/7,1/3} (2){7/10,1/2} (3){10/13,1/2} (4){7/9,2/3} (5){9/11,2/3} (6){11/13,2/3}`；卡 `border-radius:18px;background:#edebe8` | 同（实测 rows `234px 190px`、gap 14、首卡 `1/7 × 1/3`） |
| 精选覆盖层 | `.mktp-featured-overlay{justify-content:flex-end;gap:8px;padding:22px 24px;background:linear-gradient(180deg,#0a0c1400 35%,#0a0c14c7)}`；中/小卡 `padding:14px 16px;gap:6px` | 同 |
| 精选标签 | `.mktp-featured-tag{padding:3px 9px;border-radius:999px;color:#fff;background:#ffffff29;border:1px solid rgba(255,255,255,.32);backdrop-filter:blur(3px)}` | 同 |
| 卡内标题 | 大卡 24px、中卡 15px、小卡 12.5px（均 700 + `text-shadow:0 1px 6px rgba(0,0,0,.25)`，中/小卡 2 行截断）；描述 13.5px/1.45 `#ffffffe0` max-width 560 | 同 |
| 精选眉标 | `.mktp-featured-eyebrow{font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#465366;background:linear-gradient(180deg,#f8fafc,#e4e8ef);border:1px solid #CBD2DC;border-bottom:4px solid #9AA6B8;border-radius:999px;padding:4px 12px 2px}`；标题 18px/700 `#1a1a1a` | 同（眉标改 FEATURED，标题 18px w700） |
| 市场搜索条 | `.mktp-search-trigger{height:46px;padding:0 20px;border:1px solid #ECEAE6;border-radius:999px;background:#fff;width:460px;box-shadow:0 1px 2px #1414140a}`；标签 13px | 同（实测 460×46/radius 999/边框 `#ECEAE6`/13px） |
| 市场网格 | `.mktp-grid{max-width:1160px;margin:0 auto 40px;grid-template-columns:repeat(4,minmax(0,1fr));gap:24px}` | 同 |
| 消息动作行 | `.response-action-buttons{display:flex;gap:4px;margin-top:6px;margin-bottom:10px}`；按钮 `size-8 rounded-md`（32×32 radius 8）、`.response-action-btn{color:#71717a}`、hover `#18181b`+`#f4f4f5`、`.response-action-btn-active{color:#18181b;background:#e4e4e7}`；实测三键：复制 / Thumbs up / Thumbs down | 同（复制 / 点赞 / 点踩，`data-on` 表示已选） |
| 加号与工具键 | `.response-add-button{width:33px;height:33px;border-radius:50%;border:1px solid #E5E5E5;background:transparent}`；`.response-tools-button{height:33px;padding:0 10px 0 9px;border-radius:999px;border:1px solid #E5E5E5;gap:6px}`，文字 14px `#444`，选中 `#2b67c6` | 记为后续对照 |
| 加入课程弹窗 | `.join-auth-modal{max-width:380px;border-radius:18px;box-shadow:0 24px 60px #0f172a2e;padding:28px 24px 24px}`；标题 17px/600 `#0f1f33`；副title 13px `#7c8194`；按钮列 `gap:10px`；主键 `padding:10px 16px;border-radius:10px;background:#000;font-size:14px;font-weight:600`；次键白底 `1px solid #e5e7eb`；关闭钮 26px/radius 8/`1px solid #ececef` | 同（实测 380/18/`28px 24px 24px`/阴影一致/标题 17 w600 `#0f1f33`/主键 10×16 radius 10） |
| 讲义阅读器 | `.preview-page{width:1123px;height:794px;padding:var(--page-pad);box-shadow:0 2px 16px #0000002e;border-radius:2px}`；`.preview-scroll{scrollbar-gutter:stable}`；`.preview-zoom-controls{top:10px;right:14px;border-radius:8px;box-shadow:0 1px 4px #00000024,0 0 0 1px #0000000f;padding:3px}`，按钮 28×28 radius 6 `#3c3c43`，缩放值 44px 可编辑 | 本仓无讲义阅读面，规则留档 `r64_mktp_join_preview.json` |

## 第七批对照：课程票根、输入条控件、收件箱（r66-r71）

| 部件 | 线上原文 / 实测 | 本仓 |
|---|---|---|
| 票根几何 | `.course-ticket{aspect-ratio:218/326}`；mask viewBox `0 0 218 326` = 背景黑 rect + 白 rect `0,0,218,seamY` rx14 + 白 rect `0,seamY,218,326-seamY` rx14 + 签缝打孔 circle r5（cx 31→185 步长 14，共 12 个）+ 底部半圆缺口 circle `109,326,10`；本体 `<rect fill="#FFFFFC" mask=…>`；`.course-ticket-mask-svg{filter:drop-shadow(0 4px 4px rgba(0,0,0,.06))}` | 同（实测 aspect 218/326、bodyFill #FFFFFC、13 个 circle、两段 rx14） |
| 票根签缝 | `--course-ticket-seam-y` 默认 74.9%，按内容计算（单行标题实测 80.98%） | 按副本文案自然高度测量后再定，钳在 70%–86% |
| 票根文案区 | `.course-ticket-copy{top:36.5%;left:8%;right:8%;bottom:calc(100% - var(--seam))}`；作者行 gap6 / logo 18 radius4 / 名字 14 w600 `#0F1F33` / verified 17；标题 16.5 w600 2 行；描述 12.75 w500 `#6F7485` 3 行；信息标签 `3.5px 11px` radius999 `#F3F3F2`+`#ECECEA`；meta 行 `4.4` 12.75 w700 `#1F2A3A` | 同 |
| 票根存根区 | `.course-ticket-footer{top:var(--seam);left:7%;right:7%;justify-content:space-between}`；stub 标签 10 w600 `letter-spacing:.08em` uppercase `#9AA1B0`；stub 值 14 w700 `#1F2A3A`；加入键 `.course-ticket-enroll-button{width:32px;height:32px;border-radius:50%;background:#4C6696}`；已加入徽标 `top:5.5%;right:8%;background:#2F7A5C` | 同（实测键 32/50%/`rgb(76,102,150)`） |
| 票根列表 | `.library-tickets{grid-template-columns:repeat(3,minmax(0,260px));gap:34px;justify-content:center}`；`.mktp-ticket-wrap:hover .course-ticket{transform:translateY(-2px)}`；focus `0 0 0 3px rgba(76,102,150,.28)` | 首页 3 列 260/gap34 ✓，市场页维持 4 列 `.mktp-grid`（1160/24） |
| 输入条控件 | `.response-add-button{width:33px;height:33px;border-radius:50%;border:1px solid #E5E5E5;background:transparent}`；hover `#f5f5f5`；`.response-tools-button{height:33px;padding:0 10px 0 9px;border-radius:999px;border:1px solid #E5E5E5;gap:6px}`，文字 14 `#444`，hover `#f5f5f5`+`#d4d4d4`，选中 `#2b67c6`；`.response-tools-dropdown{border-radius:12px;box-shadow:0 10px 25px #0000001a,0 4px 6px #0000000d}` | 同（实测加号 33/50%/`#E5E5E5`，工具 pill 33/`0 10px 0 9px`/999/14px `#444`） |
| 收件箱 | `.inbox-page{padding:48px 64px 24px;max-width:950px;margin:0 auto}`；`.inbox-page-header{align-items:center;margin-bottom:24px}`；标题 24 w700 `#1A1A1A` mb16；`.inbox-tabs{background:#f1f1f1;padding:3px;border-radius:8px;gap:2px}`，`.inbox-tab{padding:5px 12px;font-size:12px;color:#6b7280;border-radius:6px}`；`.inbox-notification-item{gap:48px;border-bottom:1px solid #EBEBEB;border-left:3px solid transparent;padding:32px 0 32px 4px}`；空态 `.inbox-updates-placeholder{font-size:14px;color:#9ca3af;padding:48px 24px}` | 同 |
| 我的课程页 | `.courses-inner{max-width:1120px;padding:44px 56px 0}`；`.courses-layout{gap:68px}`；`.courses-title{font-size:20px;font-weight:650;margin:0 0 24px}`；`.courses-toolbar{gap:16px;margin-bottom:24px}`；`.courses-tab{padding:6px 15px;font-size:13px;color:#6f6b64;border-radius:999px}`；`.courses-search{max-width:300px;height:36px;padding:0 34px 0 38px;border-radius:999px;border:1px solid rgba(36,31,24,.08)}` placeholder `#b8b1a7` | 记为下一批（本仓 Courses 页仍是旧网格） |
| 活动/历史行 | `.activity-type-icon{width:0;opacity:0}` → `.activity-item:hover .activity-type-icon{width:14px;opacity:.6;margin-right:6px}`；`-running-spinner` 12px `#4c6696` 顶边转；`.activity-board-badge{13px;opacity:.55}` | 记为下一批 |
| 考试页 | `.exam-page{height:100dvh;background:#fff}`；`.exam-close-btn{top:26px;left:31px;width:16px;height:16px;color:#4c4c4c}`；`.exam-progress-dots{top:26px;left:50%;gap:10px}`；`.exam-progress-dot{17×10 radius999 #d4d4d4}`，active `25×18` 描边 2px `#D4D4D4` + 内条 `17×10 #aeaeae`；`.exam-timer{padding:7px 14px;radius999;background:#f1f4f9;color:#385da0;font-size:14px;tabular-nums}`，低时间 `#fbeded`/`#c34747`；`.exam-stage{top:52px;right:36px;bottom:30px;left:36px;border:1.5px solid #E5E5E5;border-radius:14px}` | 记为下一批 |

## 第八批对照：课程页骨架、练习/考试全屏（r72-r74）

| 部件 | 线上原文 / 实测 | 本仓 |
|---|---|---|
| 课程页容器 | `.course-journey-page{display:flex;justify-content:center;height:100dvh;background:#fafafa;padding-left:max(48px,calc((100% - 1100px)/2));overflow:hidden}`；`.course-journey-inner{width:100%;height:100%;gap:36px}` | 同（实测 padLeft 62px / gap 36 / bg `#fafafa`） |
| 课程页左栏 | `.course-journey-left{width:310px;padding:28px 20px 32px 40px;overflow-y:auto}`，滚动条隐藏；返回键 `padding:7px 12px;background:#fff;border-radius:10px;color:#4a5568` | 同 |
| 课程封面 | `.cj-sidebar-cover-frame{margin-top:20px}`；`.cj-sidebar-cover{aspect-ratio:1/1;border-radius:14px;overflow:hidden;background:#dce6ec}`；操作键 `.cj-sidebar-cover-actions{top:10px;left:10px;right:10px;align-items:flex-end;gap:6px}`，`.cj-sidebar-cover-btn{32×32;border-radius:50%;background:#ffffffeb;box-shadow:0 2px 8px #0f172a2e}`，提示气泡 `#2b3648` | 同（实测 1/1 / radius 14 / `rgb(220,230,236)` / 键 32 圆） |
| 课程左栏信息 | `.cj-sidebar-info{padding:16px 0 0}`；创作者行 gap8 mb12、头像 28×28 radius8 `#e8f0f8`+`#D6E4F0`、类型 10px `#9ca3af`、名字 12.5px `#374151`；标题 14.5px w600 `#111827` mb8；描述 12px/1.55 `#6b7280` 3 行；更多 `#4c6696` | 同 |
| 大纲标题/标签页 | `.cj-sidebar-section-title{font-size:11px;letter-spacing:.06em;uppercase;color:#9ca3af}` + `:after{height:.9px;background:#e5e7eb}`；`.cj-sidebar-tab{padding:6px 8px 6px 6px;border-radius:8px;color:#9ca3af}`，hover `#f3f4f6`/`#4b5563`，active `#f3f4f6`/`#111827` | 同 |
| 课程页右栏 | `.course-journey-right{flex:1;padding:48px 48px 48px 6px;overflow-y:auto}`；`.course-journey-unit-overview{max-width:760px}`；单元眉标 `3px 10px` radius999 `#e8f0f8`/`#4c6696`；标题 22px `#111827` `letter-spacing:-.02em`；描述 15px/1.55 `#4b5563` max-width 700 | 同（实测右栏 padding / 眉标 `rgb(232,240,248)` / 标题 22px ls -0.44px / 760） |
| 练习/考试页 | `.practice-page,.exam-page{width:100%;height:100dvh;overflow:hidden;background:#fff;position:relative}`；关闭键 `top:26px;left:31px;16×16;color:#4c4c4c`；进度点 `top:26px;left:50%;gap:10px;translate(-50%,-50%)`，点 `17×10` radius999 `#d4d4d4`，激活 `25×18` 描边 2px `#D4D4D4`（考试激活点内含 `17×10 #aeaeae` 条）；`.exam-stage{top:52px;right:36px;bottom:30px;left:36px;border:1.5px solid #E5E5E5;border-radius:14px}` | 同（练习与考试都换成全屏页 + 顶部点，点可点击跳题，答对答错改变颜色） |
| 考试倒计时 | `.exam-timer{padding:7px 14px;radius999;background:#f1f4f9;color:#385da0;font-size:14px;tabular-nums}`，低时间 `#fbeded`/`#c34747` | **未做**：缺考试时长来源（接口未给），先留缺口 |

## 第九批对照：学习动态与知识库（r75-r77）

| 部件 | 线上原文 / 实测 | 本仓 |
|---|---|---|
| 学习动态页 | `.proactive-page{height:100dvh;background:#fafafa;display:flex;flex-direction:column;align-items:center;padding:16px 10px 0;overflow:hidden}`；`.proactive-content{width:97%;justify-content:center}`；`.proactive-layout{gap:20px;height:92dvh}`；`.proactive-left{flex:0 0 27%;gap:25px;overflow-y:auto}`；`.proactive-right{flex:1;gap:12px}`；`.proactive-tasks-container{background:#fff;border-radius:12px;padding:12px;box-shadow:0 3px 10px #0000000d}`；页头 `min-height:40px;gap:16px` | 同（实测 bg `rgb(250,250,250)` / pad `16px 10px 0` / gap 20 / left 27% gap 25 / 容器白底 radius 12 padding 12） |
| 知识库页 | `.knowledge-base-page{height:100dvh;background:#fafafa;display:flex;flex-direction:column}`；`.knowledge-base-container{padding:20px 0 0}`；页头/控件/导航/文件区统一 `max-width:1200px;padding:0 20px`；`.knowledge-base-header{margin-top:30px;margin-bottom:20px;gap:10px}`；标题 20px w650 `#1a1a1a` | 同（实测 1200/30/20/0 20、标题 20 w650） |
| 知识库文件夹 | `.folders-grid{grid-template-columns:repeat(4,minmax(0,1fr));gap:16px;margin-bottom:28px}`；`.folder-card{padding:12px 14px;background:#fff;border:1px solid #E5E5E5;border-radius:12px;gap:12px}`，hover `0 4px 8px #0000000d`；图标 26、名字 14 w500 `#1a1a1a` | 同（实测 4 列 gap 16、卡片 radius 12 padding `12px 14px` 边框 `#E5E5E5`） |
| 知识库文件区 | `.files-area{flex:1;overflow-y:auto;padding-top:12px;padding-bottom:50px;margin-top:12px;min-height:400px}`，滚动条 6px `#0000004d` | 同（max-width 1200，padding `12px 20px 50px`） |
| 拖拽上传态 | `.knowledge-base-drag-overlay{background:#fafafa59;backdrop-filter:blur(3px)}`；卡片 `background:#f1f6fec7;border:1.5px dashed rgba(76,102,148,.28);border-radius:25px;padding:42px 66px`；图标 44；标题 17 w600 `#2d3748`；说明 13 `#5a6578` | 记为下一批 |

## 第十批对照：练习页交互件（r78-r80，live 实操）

在线上真正打开一节练习（`/course/<uuid>/practice/<session>`）后抓的结构与计算值：

| 部件 | 线上原文 / 实测 | 本仓 |
|---|---|---|
| 练习页骨架 | `.practice-page{height:100dvh;background:#fff}`；`main.practice-stage{top:52px;right:36px;bottom:30px;left:36px;border:1.5px solid #E5E5E5;border-radius:14px}`；顶栏 `.practice-topbar-actions{top:26px;right:36px;gap:10px}` | 同（实测 stage 52/36 radius 14 1.5px `#E5E5E5`、actions 26/36 gap 10） |
| 速答计时条 | `.practice-timer{position:absolute;top:0;left:0;right:0;height:3px;border-radius:14px 14px 0 0;background:#f3f4f6}`；`.practice-timer-fill{background:linear-gradient(90deg,#f0d66a,#e0bc3a);animation-name:practice-timer-drain;animation-timing-function:linear}`，实测 `animation-duration:10000ms`，关键帧 `scaleX(1) → scaleX(0)` | 同（每题 10s 倒计时，答题后暂停） |
| HUD 胶囊 | `.practice-hud{gap:8px}`；`.practice-hud-chip{min-height:34px;padding:0 13px;border:1.5px solid #D6E0F0;border-radius:999px;background:#f7faff;color:#5b6f94}`，`b{color:#2a4578;13px;tabular-nums}`；`--bonus{border-color:#e8d48a;background:#fffbea;color:#a68b2c;box-shadow:inset 0 1px #ffffffe6,0 3px #f0e4b0}` | 同（实测 34 / `0 13px` / 999 / bonus `#fffbea`+`#e8d48a`） |
| 助手开关 | `.practice-assistant-toggle{min-height:34px;padding:0 14px;border:1.5px solid #E0E4EC;border-radius:999px;background:#fff;color:#5b6472}`，hover 投影 `0 4px #e2e7f0`，激活态 `#4573c2` | 同 |
| 选项网格 | `.practice-options-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}`；`.practice-option-card{min-height:76px;padding:15px 22px 15px 18px;border:1px solid #E2E2E2;border-radius:15px;background:#fff;color:#333}`；hover `border-color:#bfcde3;background:#fafcff;box-shadow:0 4px #edf1f8;translateY(-1px)`；选中 `border-color:#4c6696;background:#f5f8fc`；正确 `#2e8b57 / #eaf6ef`；错误 `#c34747` | 同（实测 2 列 gap 12、卡片 76 / `15px 22px 15px 18px` / radius 15 / `#e2e2e2`） |
| 选项内件 | `.practice-option-shape{34×34;border-radius:9px}`，四色轮转 `nth-child(4n+1..4)` = `#c34747 / #385da0 / #c98a1e / #2e8b57`；`.practice-option-key{top:9px;right:12px;mono 11px #c4c4c4}`；`.practice-option-indicator{18×18;border:1.5px solid #C4C4C4}`，选中变 `radial-gradient(circle at center,#4C6696 0 45%,transparent 48%)` | 同（形状 34/radius 9，四色轮转，右上有键位角标，右侧圆环指示器） |
| 检查/跳转按钮 | `.practice-check-btn{padding:15px 80px;border-radius:999px;background:#4573c2;color:#fff;font-size:16px;box-shadow:inset 0 2px #ffffff4d,0 6px #33569a,0 12px 26px #4573c25c}`，hover `translateY(-2px)`、active `translateY(3px)`、disabled `#ececec/#878787`；`--next{min-width:168px;padding:14px 46px;border:1.5px solid #BFCDE3;color:#385da0;box-shadow:0 4px #dce4f2}`；`.practice-skip-btn{padding:12px 24px;border:1.5px solid #E0E4EC}` | 同（实测检查键 `15px 80px` / 999 / 禁用 `rgb(236,236,236)`） |
| 判题反馈位 | `.practice-split{--practice-verdict-panel:min(28vw,360px);--practice-verdict-gap:28px}`，`.practice-split--revealed{--practice-verdict-width:calc(panel+gap)}`；`.practice-verdict-inner` 渐显；`--correct .practice-verdict-headline{background:#2e8b571a;color:#1d6b45}` | 部分：判题后仍用行内解释卡，未做右侧滑入的 verdict 面板 |

## 第十一批：判题反馈、分数滚动与骨架动画（r82）

| 部件 | 线上原文 | 本仓 |
|---|---|---|
| 判题结果 | `.practice-feedback{font-size:15px;line-height:1.45}`；`.practice-verdict-headline{padding:7px 14px 7px 8px;border-radius:999px}` + `.practice-verdict-mark{22×22;radius:999px;color:#fff}`；正确 `background:#2e8b571a;color:#1d6b45;border:1px solid rgba(46,139,87,.16)`，错误 `background:#c3474714;color:#a83838;border:1px solid rgba(195,71,71,.14)`；解释 `color:#555;line-height:1.55` | 同（实测错误态 `rgba(195,71,71,.08)` / `#a83838` / padding `7px 14px 7px 8px` / mark 22px `#c34747`） |
| 分数滚动 | `.practice-slot-score{display:inline-flex;tabular-nums}`；`.practice-slot-digit{overflow:hidden}`；`.practice-slot-digit-strip{animation:practice-slot-roll .72s cubic-bezier(.22,1,.36,1) var(--slot-delay) both}`；`@keyframes practice-slot-roll{0%{translateY(var(--slot-from))} to{translateY(var(--slot-to))}}` | 同（逐位 delay 60ms） |
| 通用骨架 | `.skeleton-loader{background:linear-gradient(90deg,#f0f0f0 25%,#e0e0e0,#f0f0f0 75%);background-size:200% 100%;animation:skeleton-loading 1.5s infinite}` | 同（替换原先的 800px 宽 shimmer） |
| 票根骨架 | `.library-ticket-skeleton{width:100%;aspect-ratio:218/326}`，签缝线在 `--library-ticket-skeleton-seam-y:76.7%` | 同（`hk-ticket-skeleton`：218/326 + 74.9% 处虚线签缝） |
| 精选骨架 | `.mktp-featured-card--skeleton{background:linear-gradient(90deg,#ecebe8,#f6f5f2,#ecebe8);background-size:200% 100%;animation:mktpFeaturedSkeletonPulse 1.4s ease-in-out infinite}` | 同（bento 六块按同样的位次铺开） |
| verdict 面板布局 | `.practice-split{--practice-verdict-panel:min(28vw,360px);--practice-verdict-gap:28px;--practice-verdict-width:0px}`；`.practice-split--revealed{--practice-verdict-width:calc(panel+gap)}`；`.practice-verdict{flex:0 0 auto;width:var(--practice-verdict-width);overflow:hidden;transition:width .42s cubic-bezier(.22,.61,.36,1)}`；`.practice-verdict-inner{padding:24px 4px 30px 20px;opacity:0}` | **部分**：判题内容与配色一致，但没有做「右侧 360px 滑出面板」——本仓练习区是 672px 单列，滑出面板要先把内容区改成 `min(76vw,1040px)` 的 `.practice-split` 两列布局 |

## 第十二批：讲义/速查表阅读器（线上 bundle 反查，r83-r89）

点不开线上阅读器时，直接从 `ChatResponsePage-DaFH8Bg0.js` 反查常量与分页口径：

```js
const ky = 1123, xy = 794;                       // A4 @96dpi
contentW = ky - 2*pageMargin; contentH = xy - 2*pageMargin; stride = contentW + 20;
// 默认排版（historyConversationDataParser 里的 DEFAULT）
{ columns: 4, fontSize: 8, pageMargin: 8, documentLineHeight: 1.55 }
// 每页元素的样式助手（4× 测量 + scale(.25) 折算回 1×）
function My(columns, fontSize, lineHeight, contentW, contentH) {
  return { columnCount: columns, columnGap: "80px", fontSize: 4*fontSize+"px",
           lineHeight, width: 4*contentW+"px", height: 4*contentH+"px", "--cs-k": 4 };
}
// 页数：内容流宽度 / stride 向上取整（测量在 4× 下做，再折回 1×）
pageCount = max(1, ceil((measureScrollWidth/4 + 20 - 12) / stride));
transform: `translateX(-${page * stride}px) scale(0.25)`;
// 缩放：默认 0.75；外框 = 1123*z × (794*页数 + 20*(页数-1))*z
```

| 部件 | 线上原文 | 本仓 |
|---|---|---|
| 页 | `.preview-page{width:1123px;height:794px;background:#fff;box-shadow:0 2px 16px #0000002e;border-radius:2px;padding:var(--page-pad)}`；`.preview-pages{gap:20px;width:1123px}` | 同（实测 1123×794 / padding 8 / radius 2 / `0 2px 16px`） |
| 内容流 | `.preview-page-inner{column-fill:auto;column-gap:20px;transform-origin:0 0}`；`.preview-page-clip{height:var(--content-h);overflow:hidden}` | 同：列宽 `(contentW - (columns-1)*20)/columns`、页间位移 `k*stride`（实测 0 / −1127 / −2254 / −3381 / −4508） |
| 缩放件 | `.preview-zoom-controls{top:10px;right:14px;border-radius:8px;box-shadow:0 1px 4px #00000024,0 0 0 1px #0000000f;padding:3px}`；`.preview-zoom-btn{28×28;radius 6;color:#3c3c43}`；`.preview-zoom-val{width:44px;font-size:.72rem;tabular-nums;color:#52525b}` hover/focus 描边 | 同（实测 28/6、44px/11.52px、阴影一致） |
| 滚动容器 | `.preview-scroll{flex:1;min-height:0;overflow:auto;scrollbar-gutter:stable}`；`.preview-scroll-inner{min-width:100%;display:inline-flex;flex-direction:column;align-items:center;padding:1.5rem}`；`.preview-scale-wrap{width:1123px;transform-origin:top left}` | 同（外框 842.25×595.5 = 1123×0.75、scale(0.75)） |

本仓实现额外补了线上 UI 没抓到的部分：正文排版（`preview-md`，h1/h2/h3、表格、代码、引用、KaTeX 的列内规则）、打印样式（打印时隐藏控制条并取消缩放）、底部排版控件（列数 2/3/4、字号 8–11、页边距 8/16/24/32 可调），以及隐藏测量容器 `.preview-measure`（与页面同宽同高，用来数出列流的总宽度）。

### 练习两栏与判题滑出（第十二批补，r79-r82）

| 部件 | 线上原文 | 本仓 |
|---|---|---|
| 两栏 | `.practice-split{--practice-shell-width:min(76vw,1040px);--practice-verdict-panel:min(28vw,360px);--practice-verdict-gap:28px;--practice-verdict-width:0px;top:0;bottom:96px}`；`.practice-split--revealed{--practice-verdict-width:calc(panel+gap)}` | 同（实测 shell `1 1 1040px`、判题后 verdict 388 = 360+28） |
| 题目壳 | `.practice-question-shell{flex:1 1 var(--practice-shell-width);overflow-y:auto}`，滚动条 4px `#e5e5e5` | 同 |
| 判题面板 | `.practice-verdict{flex:0 0 auto;width:var(--practice-verdict-width);overflow:hidden;transition:width .42s cubic-bezier(.22,.61,.36,1)}`；`.practice-verdict-inner{width:360px;margin-left:28px;padding:24px 4px 30px 20px;opacity:0}`；`--revealed` 时 `opacity:1` | 同（实测 inner 360/opacity 1） |
| 底部操作条 | `.practice-actions{position:absolute;left:36px;right:36px;bottom:0;height:96px;display:flex;align-items:center}`，上方 28px 渐变遮罩 `.practice-stage:after{background:linear-gradient(to bottom,#fff0,#fff)}` | 同（96px、左右 36、渐变到 42%） |

### 我的课程页（第十二批补，r90-r91）

| 部件 | 线上原文 / 实测 | 本仓 |
|---|---|---|
| 页与内容列 | `.courses-page{height:100dvh;background:#fafafa;display:flex;flex-direction:column;overflow:hidden}`；`.courses-inner{max-width:1120px;padding:44px 56px 0}`；`.courses-layout{gap:68px}`；`.courses-main{flex:1;min-width:0}` | 同（实测 1120 / `44px 56px 0` / gap 68） |
| 标题与工具条 | `.courses-title{font-size:20px;font-weight:650;color:#1a1a1a;margin:0 0 24px}`；`.courses-toolbar{gap:16px;margin-bottom:24px}` | 同 |
| 过滤胶囊 | `.courses-tab{padding:6px 15px;font-size:13px;color:#6f6b64;border-radius:999px;border:1px solid transparent}`；hover `background:#fffffcb8;color:#1f1d1a`；`.active{background:#fffffc;color:#1f1d1a;border-color:#241f1812;box-shadow:0 2px 7px #0f172a0b}` | 同 |
| 搜索 | `.courses-search{max-width:300px;height:36px;padding:0 34px 0 38px;border:1px solid rgba(36,31,24,.08);border-radius:999px;background:#fff;box-shadow:0 1px 2px #0f172a06}`，图标 `left:13px`、占位色 `#b8b1a7` | 同 |
| 列表 | `.courses-list-scroll{flex:1;overflow-y:auto;margin:-8px -12px 0;padding:8px 12px 32px;scrollbar-width:none}`；`.courses-list{display:flex;flex-direction:column;gap:24px}` | 同 |
| 右栏 | `.courses-aside{width:320px;margin-top:56px;gap:28px;overflow-y:auto}`；`.courses-side-card{border-radius:18px;background:#fff;box-shadow:0 2px 6px #0f172a06;padding:13px}`；学习卡 `padding:14px;gap:12px`，眉标 11.5/650 大写 `#8a8c93` | 同 |
| 空态 | `.courses-empty{flex column;align-items:center;padding:32px 24px 40px}`；标题 16/650；说明 13 `#9ca3af` max-width 320 | 记为后续 |

### 知识库拖拽与文件夹菜单（第十三批）

| 部件 | 线上原文 / 实测 | 本仓 |
|---|---|---|
| 拖拽遮罩 | `.knowledge-base-drag-overlay{position:absolute;inset:0;z-index:100;display:flex;align-items:center;justify-content:center;background:#fafafa59;backdrop-filter:blur(3px)}` | 同（实测 `rgba(250,250,250,.35)`、`blur(3px)`、z 100） |
| 遮罩卡片 | `.knowledge-base-drag-overlay-card{background:#f1f6fec7;border:1.5px dashed rgba(76,102,148,.28);border-radius:25px;padding:42px 66px;text-align:center;max-width:90%;min-width:280px}`，hover `border-color:#4c66946b;background:#f8fafefc` | 同（实测 `rgba(241,246,254,.78)`、1.5px dashed、radius 25、`42px 66px`） |
| 遮罩文案 | 图标 44×44 `#28477d94` + `margin-bottom:18px`；标题 17/600 `#2d3748` mb 6；说明 13 `#5a6578` lh 1.45 | 同 |
| 文件夹菜单按钮 | `.folder-card-menu{width:20px;height:20px;display:none;opacity:0}`，`.folder-card:hover` 或 `.menu-open` 时 `display:flex;opacity:1` | 同（实测 20×20、hover 时 opacity 1） |
| 菜单下拉 | `.folder-menu-dropdown{top:calc(100% + 8px);right:0;background:#fff;border-radius:10px;box-shadow:0 4px 12px #00000026;padding:4px 0;z-index:100}` | 同（实测 radius 10 / `0 4px 12px rgba(0,0,0,.15)` / `4px 0` / top 28） |
| 菜单项 | `.folder-menu-item{padding:4px 12px;gap:8px;font-size:14px}`，hover `#f5f5f5`；`.folder-menu-text{color:#e71414;font-weight:500}` | 同（实测 `4px 12px` / gap 8 / 14px / `rgb(231,20,20)`） |

### 练习彩带与欢迎弹窗（第十四批）

| 部件 | 线上原文 / 实测 | 本仓 |
|---|---|---|
| 彩带层 | `.practice-check-confetti-layer{position:fixed;inset:0;z-index:10020;pointer-events:none;overflow:visible}` | 同（实测 z 10020） |
| 碎片 | `.practice-check-confetti-piece{position:fixed;margin:0;opacity:0;transform:translate(-50%,-50%) scale(.6) rotate(0);animation:practice-check-confetti-burst var(--cf-duration,.88s) cubic-bezier(.15,.9,.25,1) both}`；`--rect{border-radius:1.5px}`、`--circle{border-radius:50%}`；`prefers-reduced-motion` 下不播放 | 同（实测 28 片、`1.065s`、缓动一致） |
| 关键帧 | `0%{opacity:0;scale(.5)} 8%{opacity:1;scale(1);rotate(calc(var(--cf-rotate)*.08))} to{opacity:0;translate(calc(-50% + var(--cf-dx)), calc(-50% + var(--cf-dy) + 28px)) scale(.75) rotate(var(--cf-rotate))}` | 同（变量 `--cf-dx/--cf-dy/--cf-rotate/--cf-duration`） |
| 欢迎弹窗 | `.practice-welcome-overlay{z-index:10010;background:#0f172a2e;backdrop-filter:blur(3px);padding:24px}`；`.practice-welcome-modal{width:min(480px,100%);padding:20px 22px 20px 12px;border-radius:22px;background:#fbfbfb;box-shadow:0 24px 60px #0f172a2e}`；`.practice-welcome-row{grid-template-columns:140px minmax(0,1fr);gap:14px}`；标题 18/600 `#111827`；说明 13.5 `#4b5563`；按钮 `9px 20px` radius 999 `#111827` | 同（实测 480/22/`20px 22px 20px 12px`/`#fbfbfb`、grid `140px 292px`、按钮 `9px 20px`） |
| 弹窗动画 | `@keyframes practice-welcome-modal-pop{0%{opacity:0;translateY(8px) scale(.98)} to{opacity:1;translateY(0) scale(1)}}`，`.22s cubic-bezier(.16,1,.3,1)` | 同 |

### 历史页（第十五批，r93-r95）

线上历史页是 `sh-*` 命名（不是 `history-*`），变量集中在页根：

```css
.sh-page{--sh-ink:#1F1D1A; --sh-ink-muted:#6F6B64; --sh-ink-faint:#A8A29A;
         --sh-hairline:rgba(36,31,24,.07); --sh-divider:rgba(36,31,24,.05);
         --sh-surface:#FFFFFC; --sh-lift:0 1px 2px rgba(28,25,20,.04),0 4px 12px -4px rgba(28,25,20,.07);
         --sh-accent:#4C6694}
```

| 部件 | 线上原文 / 实测 | 本仓 |
|---|---|---|
| 页与内容列 | `.sh-page{width:100%;height:100dvh;display:flex;flex-direction:column}`；`.sh-inner{max-width:1120px;padding:44px 56px 0;flex:1;min-height:0;overflow:hidden}` | 同（实测 1120 / `44px 56px 0`） |
| 页头 | `.sh-header{gap:16px;margin-bottom:16px}`；`.sh-title{font-size:20px;font-weight:650;color:var(--sh-ink)}` | 同 |
| 搜索 | `.sh-search{width:260px;height:36px;padding:0 32px 0 38px;border-radius:999px;border:1px solid var(--sh-hairline)}`；聚焦**宽度变 300px**；占位 `#b8b1a7`；图标 `left:13px` | 同（实测 260×36、聚焦 300 的过渡） |
| 新建对话 | `.sh-new-conversation-btn{height:36px;padding:0 16px;border-radius:999px;background:var(--sh-surface);box-shadow:var(--sh-lift),inset 0 1px #ffffffe6}`，hover 抬起 | 同 |
| 工具条与标签 | `.sh-toolbar{margin-bottom:18px}`；`.sh-tab{padding:6px 15px;font-size:13px;color:var(--sh-ink-muted);border-radius:999px}`，`.active{background:var(--sh-surface);border-color:var(--sh-hairline);box-shadow:0 2px 7px #0f172a0b}`；`.sh-filter-btn` 30×30 圆形，选中变胶囊 | 同 |
| 滚动区 | `.sh-scroll{flex:1;margin:0 -12px;padding:4px 12px 32px;mask-image:linear-gradient(to bottom,#000 calc(100% - 44px),transparent 100%)}`，`--scrolled` 时顶部也加渐隐 | 同（实测 padding 与 mask） |
| 分组 | `.sh-group+.sh-group{margin-top:22px}`；`.sh-group-label{margin:0 0 8px 4px;font-size:11px;font-weight:600;letter-spacing:.07em;text-transform:uppercase;color:var(--sh-ink-faint)}` | 同（今天/本周/更早） |
| 列表与行 | `.sh-list{padding:4px;background:var(--sh-surface);border:1px solid var(--sh-hairline);border-radius:14px;box-shadow:var(--sh-lift)}`；`.sh-row{height:44px;border-radius:10px}` hover `#241f180d`；分隔线 `:after{left:36px;right:8px;background:var(--sh-divider)}`；`.sh-row-icon{width:36px}`（图标 16、`opacity:.45`）；`.sh-row-title` 14px 省略号 | 同（实测 44/10/14） |

### 历史筛选、空态与收件箱行（第十六批，r96-r98）

| 部件 | 线上原文 / 实测 | 本仓 |
|---|---|---|
| 筛选按钮 | `.sh-filter-btn{width:30px;height:30px;border-radius:50%;border:1px solid transparent}`；图标是 16×16 漏斗线（`M2 4h12M4 8h8M6 12h4`，stroke `#6B7280`）；`.active{width:auto;padding:0 10px;border-radius:999px;background:var(--sh-surface);box-shadow:0 2px 7px #0f172a0b}`，选中后 stroke 变 `#374151` 并出现 `.sh-filter-badge{6px;背景 #f59e0b}` | 同（实测路径一致、选中 stroke `#374151`、badge 6px `rgb(245,158,11)`） |
| 筛选下拉 | `.sh-filter-dropdown{min-width:160px;border-radius:12px;box-shadow:0 8px 24px #0f172a1a;padding:4px 0;top:calc(100% + 6px)}`；`.sh-filter-option{padding:4px 12px;gap:8px;font-size:14px}` 带 16px 图标；`.sh-option-check{margin-left:auto}` | 同（实测 minW 160 / radius 12 / `0 8px 24px rgba(15,23,42,.1)` / top 36 / 选项「仅收藏」） |
| 滚动渐隐 | `.sh-scroll{mask-image:linear-gradient(to bottom,#000 calc(100% - 44px),transparent 100%)}`；`.sh-scroll--scrolled{mask-image:linear-gradient(to bottom,transparent 0,#000 28px,#000 calc(100% - 44px),transparent 100%)}` | 同（滚动 > 8px 时挂类，遮罩随之变化） |
| 课程页空态 | `.courses-empty{flex column;align-items:center;padding:32px 24px 40px;text-align:center}`；`.courses-empty-illustration{width:200px;height:200px;object-fit:contain;margin-bottom:4px;opacity:.92}`（线上图是 `/pages/coursePage/CourseJourney/no-search-result.png`）；标题 16/650 `#1a1a1a`；说明 13 `#9ca3af` max-width 320 | 同结构，插画用本仓内联 SVG 占位（不复制原站图片资源） |
| 课程页加载态 | 线上是 `.courses-loading`（循环视频 + `courses-loading-text`） | 本仓用图标卡 + 13px 文案替代视频 |
| 收件箱行 | `.inbox-notification-item{display:flex;gap:48px;border-bottom:1px solid #EBEBEB;border-left:3px solid transparent;padding:32px 0 32px 4px;margin-left:-4px}`；`--unread{border-left-color:#4c6694}`；`:last-child{border-bottom:none}`；hover `#00000005` | 同（实测 gap 48 / padding `32px 0 32px 4px` / 未读左边框 3px `rgb(76,102,148)`） |
| 收件箱行内 | `.inbox-notification-aside{width:120px;margin-top:2px}` 内含日期行 `gap:6px` + 日期 13 `#8b93a0` + 未读点 6px `#4c6694`；`.inbox-notification-main{gap:8px}`；标题 16/700 `#1a1a1a`（已读降为 600 `#374151`）；正文 14 `#6b7280` lh 1.6 | 同（实测 120/2、main gap 8、标题 16/700、日期 `rgb(139,147,160)`） |
| 收件箱骨架 | `.inbox-skeleton{border-radius:6px;background:#ededed}`；日期 72×13、标题 70%×16、正文 100%×14 | 同（3 行骨架） |

### 深度学习课堂（第十七批，r99-r101）与学习动态补件

线上会话页类名是 `learning-session-*` / `session-*` / `outline-*`：

| 部件 | 线上原文 / 实测 | 本仓 |
|---|---|---|
| 页与布局 | `.learning-session-page{height:100dvh;background:#fafafa;display:flex;flex-direction:column;padding:0 20px 20px 10px;overflow:hidden}`；`.learning-session-layout{display:flex;gap:70px;height:calc(100dvh - 70px);max-width:1400px;margin:50px auto 0;justify-content:center;align-items:flex-start}` | 同（实测 pad `0 20px 20px 10px`、gap 70、1400、mt 50、高 685） |
| 大纲面板 | `.session-outline{width:310px;min-width:300px;background:#fff;border-radius:12px;border:1px solid rgba(0,0,0,.08)}`；`.outline-content{padding:26px 22px 28px 15px;min-height:200px}`；`.outline-unit{margin-bottom:16px}`；`.outline-item{gap:10px;padding:5px 10px;margin:0 -10px;border-radius:10px}` hover `#f8f8f8`、current `#fafafa` + 标题 500 `#1a1a1a`、locked 标题 `#c2c9d4` | 同（实测 310 / radius 12 / 边框 `rgba(0,0,0,.08)` / 内容 padding 一致） |
| 大纲翻页 | `.outline-nav{background:#f8f8f8;border-top:1px solid rgba(0,0,0,.06);border-radius:0 0 12px 12px}`；`.outline-nav-btn{flex:1;gap:6px;padding:9px;color:#4c6696;font-size:13px}`，disabled `#c8cdd6`，hover `#eee`/`#2e4270`；标签两行截断；prev 有右分割线、next 右对齐 | 同（实测 bg `rgb(248,248,248)`、radius `0 0 12px 12px`、按钮 padding 9 / 13px / disabled `rgb(200,205,214)`） |
| 主区 | `.session-main-content-wrapper{flex:1;max-width:800px;position:relative}`；`.session-main-content{position:absolute;inset:0;overflow-y:auto;padding:12px 8px 120px 0}` | 同（实测 800 / absolute / padding 一致） |
| 输入条 | `.session-input-container{padding:2px 0 8px;background:linear-gradient(to bottom,transparent,#fafafa 40%);z-index:10}`；`.session-input-bar{background:#fff;border:1px solid #EFEFEF;border-radius:24px;padding:9px;min-height:52px;box-shadow:0 1px 3px #00000005}`，聚焦 `0 2px 12px #0000000a`；多行时 radius 16 且底部留 50px | 同（实测 radius 24 / padding 9 / minH 52 / 边框 `#EFEFEF`） |
| 回到底部 | `.scroll-to-bottom-button{width:33px;height:33px;border-radius:50%;background:#fff;border:1px solid #E5E5E5;box-shadow:0 2px 8px #0000001a}`，hover 抬起 | 同（滚离底部 > 240px 出现） |
| 自定义滚动条 | `.custom-scrollbar-hover-zone{position:fixed;top:50px;right:0;bottom:10px;width:10px;z-index:999}`；thumb 5px `#00000038`，hover `.35`、拖动 `.52` | **未做**：本仓主区用原生隐藏滚动条 |
| 学习动态分段 | `.proactive-tasks-mode-switcher{gap:4px;padding:3px;border-radius:12px;background:#f5f5f4}` | 同（实测 `rgb(245,245,244)` / pad 3 / radius 12 / gap 4，选中白底 + 1px 阴影） |

