# HyperKnow 设计令牌与静态样式档案

> 来源：`https://agent.hyperknow.io/` 的生产 CSS（下载于本次提取）与 122 个 JS chunk 中的静态引用。数值是源码事实；没有出现的运行时主题不作推断。

## 调色板与 CSS 自定义属性

| Token | Value |
|---|---|
| `--accent` | `0 0% 96.1%` |
| `--accent-contrast` | `#fafafa` |
| `--accent-foreground` | `0 0% 9%` |
| `--annotation-unfocused-field-background` | `url("data:image/svg+xml` |
| `--app-bg` | `#FAFAFA` |
| `--background` | `0 0% 100%` |
| `--bg` | `#ffffff` |
| `--border` | `0 0% 89.8%` |
| `--card` | `0 0% 100%` |
| `--card-foreground` | `0 0% 3.9%` |
| `--chart-1` | `12 76% 61%` |
| `--chart-2` | `173 58% 39%` |
| `--chart-3` | `197 37% 24%` |
| `--chart-4` | `43 74% 66%` |
| `--chart-5` | `27 87% 67%` |
| `--cheatsheet-content-font` | `"Satoshi-Variable", "MiSans", "PingFang SC", "Microsoft YaHei", sans-serif` |
| `--destructive` | `0 84.2% 60.2%` |
| `--destructive-foreground` | `0 0% 98%` |
| `--font-chinese-serif-display` | `"ChillDuanHeiSong", serif` |
| `--font-satoshi` | `"Satoshi-Medium", "MiSans", "PingFang SC", "Microsoft YaHei", sans-serif` |
| `--font-satoshi-black` | `"Satoshi-Black", "MiSans Heavy", "MiSans", "PingFang SC", "Microsoft YaHei", sans-serif` |
| `--font-satoshi-bold` | `"Satoshi-Bold", "MiSans Demibold", "MiSans", "PingFang SC", "Microsoft YaHei", sans-serif` |
| `--font-satoshi-light` | `"Satoshi-Light", "MiSans Light", "MiSans", "PingFang SC", "Microsoft YaHei", sans-serif` |
| `--font-satoshi-regular` | `"Satoshi-Regular", "MiSans Normal", "MiSans", "PingFang SC", "Microsoft YaHei", sans-serif` |
| `--font-ticket-title` | `"EB Garamond", "Songti SC", var(--font-chinese-serif-display), serif` |
| `--foreground` | `0 0% 3.9%` |
| `--highlight-bg-color` | `Highlight` |
| `--highlight-selected-bg-color` | `ButtonText` |
| `--input` | `0 0% 89.8%` |
| `--input-bg` | `#ffffff` |
| `--input-disabled-border-color` | `GrayText` |
| `--input-focus-border-color` | `CanvasText` |
| `--input-focus-outline` | `1px solid Canvas` |
| `--input-hover-border-color` | `Highlight` |
| `--input-unfocused-border-color` | `ActiveText` |
| `--link-outline` | `1.5px solid LinkText` |
| `--muted` | `0 0% 96.1%` |
| `--muted-foreground` | `0 0% 45.1%` |
| `--panel` | `#f4f4f5` |
| `--panel-elevated` | `#fafafa` |
| `--popover` | `0 0% 100%` |
| `--popover-foreground` | `0 0% 3.9%` |
| `--primary` | `0 0% 9%` |
| `--primary-foreground` | `0 0% 98%` |
| `--radius` | `.625rem` |
| `--react-pdf-annotation-layer` | `1` |
| `--react-pdf-text-layer` | `1` |
| `--right-rail` | `#f1f2f4` |
| `--ring` | `0 0% 3.9%` |
| `--sab` | `env(safe-area-inset-bottom)` |
| `--sal` | `env(safe-area-inset-left)` |
| `--sar` | `env(safe-area-inset-right)` |
| `--sat` | `env(safe-area-inset-top)` |
| `--secondary` | `0 0% 96.1%` |
| `--secondary-foreground` | `0 0% 9%` |
| `--sidebar-header-pad` | `16px` |
| `--sidebar-margin` | `12px` |
| `--sidebar-radius` | `16px` |
| `--sidebar-toggle-size` | `24px` |
| `--sidebar-toggle-top` | `calc(var(--sidebar-margin) + 1px + var(--sidebar-header-pad))` |
| `--sidebar-width` | `240px` |
| `--text` | `#0a0a0a` |
| `--zIndex-canvas` | `1` |
| `--zIndex-canvasButtons` | `3` |
| `--zIndex-eyeDropperBackdrop` | `5` |
| `--zIndex-eyeDropperPreview` | `6` |
| `--zIndex-hyperlinkContainer` | `7` |
| `--zIndex-interactiveCanvas` | `2` |
| `--zIndex-layerUI` | `4` |
| `--zIndex-modal` | `1000` |
| `--zIndex-popup` | `1001` |
| `--zIndex-svgLayer` | `3` |
| `--zIndex-toast` | `999999` |
| `--zIndex-wysiwyg` | `3` |

## 字体栈与字体文件

主界面使用 `--font-satoshi`（Satoshi-Medium → MiSans → PingFang SC → Microsoft YaHei → sans-serif）；轻/常规/粗/黑分别由同名 token 提供。显示标题还声明 EB Garamond、ChillDuanHeiSong、SawarabiMincho。字体 CSS 中的 `@font-face src` 如下（仅记录 URL，未抓取字体二进制）：

| CSS | src URL（原始相对路径） | format |
|---|---|---|
| `chill-duanhei-song.css` | `./ChillDuanHeiSong-Light.woff2` | `woff2` |
| `eb-garamond.css` | `./eb-garamond-600-latin-ext.woff2` | `woff2` |
| `eb-garamond.css` | `./eb-garamond-600-latin.woff2` | `woff2` |
| `misans.css` | `./misans-regular/187.woff2` | `woff2` |
| `misans.css` | `./misans-regular/186.woff2` | `woff2` |
| `misans.css` | `./misans-regular/185.woff2` | `woff2` |
| `misans.css` | `./misans-regular/184.woff2` | `woff2` |
| `misans.css` | `./misans-regular/183.woff2` | `woff2` |
| `misans.css` | `./misans-regular/182.woff2` | `woff2` |
| `misans.css` | `./misans-regular/181.woff2` | `woff2` |
| `misans.css` | `./misans-regular/180.woff2` | `woff2` |
| `misans.css` | `./misans-regular/179.woff2` | `woff2` |
| `misans.css` | `./misans-regular/178.woff2` | `woff2` |
| `misans.css` | `./misans-regular/177.woff2` | `woff2` |
| `misans.css` | `./misans-regular/176.woff2` | `woff2` |
| `misans.css` | `./misans-regular/175.woff2` | `woff2` |
| `misans.css` | `./misans-regular/174.woff2` | `woff2` |
| `misans.css` | `./misans-regular/173.woff2` | `woff2` |
| `misans.css` | `./misans-regular/172.woff2` | `woff2` |
| `misans.css` | `./misans-regular/171.woff2` | `woff2` |
| `misans.css` | `./misans-regular/170.woff2` | `woff2` |
| `misans.css` | `./misans-regular/169.woff2` | `woff2` |
| `misans.css` | `./misans-regular/168.woff2` | `woff2` |
| `misans.css` | `./misans-regular/167.woff2` | `woff2` |
| `misans.css` | `./misans-regular/166.woff2` | `woff2` |
| `misans.css` | `./misans-regular/165.woff2` | `woff2` |
| `misans.css` | `./misans-regular/164.woff2` | `woff2` |
| `misans.css` | `./misans-regular/163.woff2` | `woff2` |
| `misans.css` | `./misans-regular/162.woff2` | `woff2` |
| `misans.css` | `./misans-regular/161.woff2` | `woff2` |
| `misans.css` | `./misans-regular/160.woff2` | `woff2` |
| `misans.css` | `./misans-regular/159.woff2` | `woff2` |
| `misans.css` | `./misans-regular/158.woff2` | `woff2` |
| `misans.css` | `./misans-regular/157.woff2` | `woff2` |
| `misans.css` | `./misans-regular/156.woff2` | `woff2` |
| `misans.css` | `./misans-regular/155.woff2` | `woff2` |
| `misans.css` | `./misans-regular/154.woff2` | `woff2` |
| `misans.css` | `./misans-regular/153.woff2` | `woff2` |
| `misans.css` | `./misans-regular/152.woff2` | `woff2` |
| `misans.css` | `./misans-regular/151.woff2` | `woff2` |
| `misans.css` | `./misans-regular/150.woff2` | `woff2` |
| `misans.css` | `./misans-regular/149.woff2` | `woff2` |
| `misans.css` | `./misans-regular/148.woff2` | `woff2` |
| `misans.css` | `./misans-regular/147.woff2` | `woff2` |
| `misans.css` | `./misans-regular/146.woff2` | `woff2` |
| `misans.css` | `./misans-regular/145.woff2` | `woff2` |
| `misans.css` | `./misans-regular/144.woff2` | `woff2` |
| `misans.css` | `./misans-regular/143.woff2` | `woff2` |
| `misans.css` | `./misans-regular/142.woff2` | `woff2` |
| `misans.css` | `./misans-regular/141.woff2` | `woff2` |
| `misans.css` | `./misans-regular/140.woff2` | `woff2` |
| `misans.css` | `./misans-regular/139.woff2` | `woff2` |
| `misans.css` | `./misans-regular/138.woff2` | `woff2` |
| `misans.css` | `./misans-regular/137.woff2` | `woff2` |
| `misans.css` | `./misans-regular/136.woff2` | `woff2` |
| `misans.css` | `./misans-regular/135.woff2` | `woff2` |
| `misans.css` | `./misans-regular/134.woff2` | `woff2` |
| `misans.css` | `./misans-regular/133.woff2` | `woff2` |
| `misans.css` | `./misans-regular/132.woff2` | `woff2` |
| `misans.css` | `./misans-regular/131.woff2` | `woff2` |
| `misans.css` | `./misans-regular/130.woff2` | `woff2` |
| `misans.css` | `./misans-regular/129.woff2` | `woff2` |
| `misans.css` | `./misans-regular/128.woff2` | `woff2` |
| `misans.css` | `./misans-regular/127.woff2` | `woff2` |
| `misans.css` | `./misans-regular/126.woff2` | `woff2` |
| `misans.css` | `./misans-regular/125.woff2` | `woff2` |
| `misans.css` | `./misans-regular/124.woff2` | `woff2` |
| `misans.css` | `./misans-regular/123.woff2` | `woff2` |
| `misans.css` | `./misans-regular/122.woff2` | `woff2` |
| `misans.css` | `./misans-regular/121.woff2` | `woff2` |
| `misans.css` | `./misans-regular/120.woff2` | `woff2` |
| `misans.css` | `./misans-regular/119.woff2` | `woff2` |
| `misans.css` | `./misans-regular/118.woff2` | `woff2` |
| `misans.css` | `./misans-regular/117.woff2` | `woff2` |
| `misans.css` | `./misans-regular/116.woff2` | `woff2` |
| `misans.css` | `./misans-regular/115.woff2` | `woff2` |
| `misans.css` | `./misans-regular/114.woff2` | `woff2` |
| `misans.css` | `./misans-regular/113.woff2` | `woff2` |
| `misans.css` | `./misans-regular/112.woff2` | `woff2` |
| `misans.css` | `./misans-regular/111.woff2` | `woff2` |
| `misans.css` | `./misans-regular/110.woff2` | `woff2` |
| `misans.css` | `./misans-regular/109.woff2` | `woff2` |
| `misans.css` | `./misans-regular/108.woff2` | `woff2` |
| `misans.css` | `./misans-regular/107.woff2` | `woff2` |
| `misans.css` | `./misans-regular/106.woff2` | `woff2` |
| `misans.css` | `./misans-regular/105.woff2` | `woff2` |
| `misans.css` | `./misans-regular/104.woff2` | `woff2` |
| `misans.css` | `./misans-regular/103.woff2` | `woff2` |
| `misans.css` | `./misans-regular/102.woff2` | `woff2` |
| `misans.css` | `./misans-regular/101.woff2` | `woff2` |
| `misans.css` | `./misans-regular/100.woff2` | `woff2` |
| `misans.css` | `./misans-regular/99.woff2` | `woff2` |
| `misans.css` | `./misans-regular/98.woff2` | `woff2` |
| `misans.css` | `./misans-regular/97.woff2` | `woff2` |
| `misans.css` | `./misans-regular/96.woff2` | `woff2` |
| `misans.css` | `./misans-regular/95.woff2` | `woff2` |
| `misans.css` | `./misans-regular/94.woff2` | `woff2` |
| `misans.css` | `./misans-regular/93.woff2` | `woff2` |
| `misans.css` | `./misans-regular/92.woff2` | `woff2` |
| `misans.css` | `./misans-regular/91.woff2` | `woff2` |
| `misans.css` | `./misans-regular/90.woff2` | `woff2` |
| `misans.css` | `./misans-regular/89.woff2` | `woff2` |
| `misans.css` | `./misans-regular/88.woff2` | `woff2` |
| `misans.css` | `./misans-regular/87.woff2` | `woff2` |
| `misans.css` | `./misans-regular/86.woff2` | `woff2` |
| `misans.css` | `./misans-regular/85.woff2` | `woff2` |
| `misans.css` | `./misans-regular/84.woff2` | `woff2` |
| `misans.css` | `./misans-regular/83.woff2` | `woff2` |
| `misans.css` | `./misans-regular/82.woff2` | `woff2` |
| `misans.css` | `./misans-regular/81.woff2` | `woff2` |
| `misans.css` | `./misans-regular/80.woff2` | `woff2` |
| `misans.css` | `./misans-regular/79.woff2` | `woff2` |
| `misans.css` | `./misans-regular/78.woff2` | `woff2` |
| `misans.css` | `./misans-regular/77.woff2` | `woff2` |
| `misans.css` | `./misans-regular/76.woff2` | `woff2` |
| `misans.css` | `./misans-regular/75.woff2` | `woff2` |
| `misans.css` | `./misans-regular/74.woff2` | `woff2` |
| `misans.css` | `./misans-regular/73.woff2` | `woff2` |
| `misans.css` | `./misans-regular/72.woff2` | `woff2` |
| `misans.css` | `./misans-regular/71.woff2` | `woff2` |
| … | 共 593 条（MiSans CSS 含大量 unicode-range 分片） | … |

### 字体二进制大小审计

对 605 个 `@font-face src` URL 执行了 HEAD（不下载字体二进制）；604 个未超过 500 KB，1 个超过阈值并按要求跳过：`ChillDuanHeiSong-Light.woff2`（1,527,972 bytes）。逐 URL 的 HTTP 状态、Content-Type 和 Content-Length 记录于 `assets/fonts/_font_binary_fetch_log.json`。

## 圆角、阴影与布局

从 token 中可见的结构常量：
- `--app-bg: #FAFAFA`
- `--bg: #ffffff`
- `--border: 0 0% 89.8%`
- `--highlight-bg-color: Highlight`
- `--highlight-selected-bg-color: ButtonText`
- `--input-bg: #ffffff`
- `--input-disabled-border-color: GrayText`
- `--input-focus-border-color: CanvasText`
- `--input-hover-border-color: Highlight`
- `--input-unfocused-border-color: ActiveText`
- `--radius: .625rem`
- `--sidebar-header-pad: 16px`
- `--sidebar-margin: 12px`
- `--sidebar-radius: 16px`
- `--sidebar-width: 240px`

## 动效清单（keyframes）

| Name | CSS | Definition excerpt |
|---|---|---|
| `accountDeletedPageIn` | `AccountDeletedPage-DpG5Svji.css` | `@keyframes accountDeletedPageIn{0%{opacity:0}to{opacity:1}}` |
| `accountDeletedPageOut` | `AccountDeletedPage-DpG5Svji.css` | `@keyframes accountDeletedPageOut{0%{opacity:1}68%{opacity:1}to{opacity:0}}` |
| `accountDeletedCheckDraw` | `AccountDeletedPage-DpG5Svji.css` | `@keyframes accountDeletedCheckDraw{to{stroke-dashoffset:0}}` |
| `accountDeletedPieceFly` | `AccountDeletedPage-DpG5Svji.css` | `@keyframes accountDeletedPieceFly{0%{opacity:1;transform:translateZ(0) rotate(0) scale(1);filter:blur(0)}to{opacity:0;transform:translate3d(var(--exit-x),var(--exit-y),0) rotate(var(--exit-rotate)) scale(.92);filter:blur` |
| `loading-pulse` | `AuthCallBack-DyVAuML9.css` | `@keyframes loading-pulse{0%,80%,to{opacity:.3;transform:scale(.8)}40%{opacity:1;transform:scale(1.1)}}` |
| `scale-in` | `AuthCallBack-DyVAuML9.css` | `@keyframes scale-in{0%{opacity:0;transform:scale(.5)}to{opacity:1;transform:scale(1)}}` |
| `shake` | `AuthCallBack-DyVAuML9.css` | `@keyframes shake{0%,to{transform:translate(0)}25%{transform:translate(-10px)}75%{transform:translate(10px)}}` |
| `successOverlayFadeIn` | `BugReportModal-Di91AIA7.css` | `@keyframes successOverlayFadeIn{0%{opacity:0}to{opacity:1}}` |
| `successNotificationSlideIn` | `BugReportModal-Di91AIA7.css` | `@keyframes successNotificationSlideIn{0%{opacity:0;transform:translateY(-20px)}to{opacity:1;transform:translateY(0)}}` |
| `successNotificationSlideOut` | `BugReportModal-Di91AIA7.css` | `@keyframes successNotificationSlideOut{0%{opacity:1;transform:translateY(0)}to{opacity:0;transform:translateY(-20px)}}` |
| `unsavedFadeIn` | `ChatResponsePage-g1DJhv2j.css` | `@keyframes unsavedFadeIn{0%{opacity:0}to{opacity:1}}` |
| `unsavedScaleIn` | `ChatResponsePage-g1DJhv2j.css` | `@keyframes unsavedScaleIn{0%{opacity:0;transform:scale(.96)}to{opacity:1;transform:scale(1)}}` |
| `workspace-embedded-icon-spin` | `ChatResponsePage-g1DJhv2j.css` | `@keyframes workspace-embedded-icon-spin{to{transform:rotate(360deg)}}` |
| `workspace-spin` | `ChatResponsePage-g1DJhv2j.css` | `@keyframes workspace-spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}` |
| `cancel-generation-fade` | `ChatResponsePage-g1DJhv2j.css` | `@keyframes cancel-generation-fade{0%{opacity:0}to{opacity:1}}` |
| `cancel-generation-modal-pop` | `ChatResponsePage-g1DJhv2j.css` | `@keyframes cancel-generation-modal-pop{0%{opacity:0;transform:scale(.96) translateY(6px)}to{opacity:1;transform:scale(1) translateY(0)}}` |
| `orbieSlideIn` | `ChatResponsePage-g1DJhv2j.css` | `@keyframes orbieSlideIn{0%{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}` |
| `bugReportDropdownEnter` | `ChatResponsePage-g1DJhv2j.css` | `@keyframes bugReportDropdownEnter{0%{opacity:0;transform:translate(-50%) translateY(12px)}to{opacity:1;transform:translate(-50%) translateY(0)}}` |
| `shareDropdownFadeIn` | `ChatResponsePage-g1DJhv2j.css` | `@keyframes shareDropdownFadeIn{0%{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}` |
| `shareCheckIn` | `ChatResponsePage-g1DJhv2j.css` | `@keyframes shareCheckIn{0%{opacity:0;transform:scale(.8)}to{opacity:1;transform:scale(1)}}` |
| `sharePublicFadeIn` | `ChatResponsePage-g1DJhv2j.css` | `@keyframes sharePublicFadeIn{0%{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}` |
| `shareChipIn` | `ChatResponsePage-g1DJhv2j.css` | `@keyframes shareChipIn{0%{opacity:0;transform:scale(.85)}to{opacity:1;transform:scale(1)}}` |
| `cheatsheetUsageTipEnter` | `ChatResponsePage-g1DJhv2j.css` | `@keyframes cheatsheetUsageTipEnter{0%{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}` |
| `response-voice-bounce` | `ChatResponsePage-g1DJhv2j.css` | `@keyframes response-voice-bounce{0%{height:4px}to{height:14px}}` |
| `response-voice-wave` | `ChatResponsePage-g1DJhv2j.css` | `@keyframes response-voice-wave{0%,to{height:4px}50%{height:14px}}` |
| `dropdownEnterUp` | `ChatResponsePage-g1DJhv2j.css` | `@keyframes dropdownEnterUp{to{opacity:1;transform:translateY(0)}}` |
| `dragOverlayFadeIn` | `ChatResponsePage-g1DJhv2j.css` | `@keyframes dragOverlayFadeIn{0%{opacity:0;transform:scale(.95)}to{opacity:1;transform:scale(1)}}` |
| `responseUploadingPulse` | `ChatResponsePage-g1DJhv2j.css` | `@keyframes responseUploadingPulse{0%{opacity:.35;transform:scale(.95)}50%{opacity:.9;transform:scale(1.05)}to{opacity:.35;transform:scale(.95)}}` |
| `responseDropdownEnter` | `ChatResponsePage-g1DJhv2j.css` | `@keyframes responseDropdownEnter{0%{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}` |
| `uploadErrorToastIn` | `ChatResponsePage-g1DJhv2j.css` | `@keyframes uploadErrorToastIn{0%{opacity:0;transform:translate(-50%) translateY(12px)}to{opacity:1;transform:translate(-50%) translateY(0)}}` |
| `rateLimitShowUp` | `ChatResponsePage-g1DJhv2j.css` | `@keyframes rateLimitShowUp{0%{opacity:0;transform:translateY(-10px) scale(.95)}50%{opacity:.7;transform:translateY(-5px) scale(.98)}to{opacity:1;transform:translateY(0) scale(1)}}` |
| `recommendationItemEnter` | `ChatResponsePage-g1DJhv2j.css` | `@keyframes recommendationItemEnter{0%{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}` |
| `hover-panel-in` | `ChatResponsePage-g1DJhv2j.css` | `@keyframes hover-panel-in{0%{opacity:0;transform:translate(4px)}to{opacity:1;transform:translate(0)}}` |
| `tooltip-in` | `ChatResponsePage-g1DJhv2j.css` | `@keyframes tooltip-in{0%{opacity:0;transform:translateY(-50%) translate(4px)}to{opacity:1;transform:translateY(-50%) translate(0)}}` |
| `sublabel-in` | `ChatResponsePage-g1DJhv2j.css` | `@keyframes sublabel-in{0%{opacity:0;transform:translateY(-2px)}to{opacity:1;transform:translateY(0)}}` |
| `outline-ripple` | `ChatResponsePage-g1DJhv2j.css` | `@keyframes outline-ripple{0%{box-shadow:0 0 #00276c73,0 0 10px 2px #00276c2e}60%{box-shadow:0 0 0 8px #00276c00,0 0 10px 2px #00276c1a}to{box-shadow:0 0 #00276c00,0 0 8px 2px #00276c26}}` |
| `outline-pulse-border` | `ChatResponsePage-g1DJhv2j.css` | `@keyframes outline-pulse-border{0%,to{border-color:#7a9cc4}50%{border-color:#c4d8ea}}` |
| `outline-shimmer` | `ChatResponsePage-g1DJhv2j.css` | `@keyframes outline-shimmer{0%{background-position:200% 0}to{background-position:-200% 0}}` |
| `outline-slide-in` | `ChatResponsePage-g1DJhv2j.css` | `@keyframes outline-slide-in{0%{opacity:0;transform:translateY(4px)}to{opacity:1;transform:translateY(0)}}` |
| `fadeInButton` | `ChatResponsePage-g1DJhv2j.css` | `@keyframes fadeInButton{0%{opacity:0;transform:translate(-50%) scale(.8)}to{opacity:1;transform:translate(-50%) scale(1)}}` |
| `course-generation-stop-spin` | `ChatResponsePage-g1DJhv2j.css` | `@keyframes course-generation-stop-spin{to{transform:rotate(360deg)}}` |
| `radarPulse` | `ChatResponsePage-g1DJhv2j.css` | `@keyframes radarPulse{0%,to{opacity:1;transform:scale(1)}50%{opacity:.7;transform:scale(1.1)}}` |
| `radarRing` | `ChatResponsePage-g1DJhv2j.css` | `@keyframes radarRing{0%{opacity:.8;transform:translate(-50%,-50%) scale(1)}50%{opacity:.3;transform:translate(-50%,-50%) scale(2)}to{opacity:0;transform:translate(-50%,-50%) scale(3)}}` |
| `toastFadeIn` | `CouponCodePage-Es9McX16.css` | `@keyframes toastFadeIn{0%{opacity:0;transform:translate(-50%) translateY(10px)}to{opacity:1;transform:translate(-50%) translateY(0)}}` |
| `mktOverlayIn` | `CourseJourneyPage-DS2SI7dn.css` | `@keyframes mktOverlayIn{0%{opacity:0}to{opacity:1}}` |
| `mktPanelIn` | `CourseJourneyPage-DS2SI7dn.css` | `@keyframes mktPanelIn{0%{opacity:0;transform:scale(.96) translateY(10px)}to{opacity:1;transform:scale(1) translateY(0)}}` |
| `mktSkeletonPulse` | `CourseJourneyPage-DS2SI7dn.css` | `@keyframes mktSkeletonPulse{0%,to{opacity:1}50%{opacity:.6}}` |
| `mktDialogIn` | `CourseJourneyPage-DS2SI7dn.css` | `@keyframes mktDialogIn{0%{opacity:0;transform:scale(.95) translateY(6px)}to{opacity:1;transform:scale(1) translateY(0)}}` |
| `course-cal-fade` | `CourseJourneyPage-DS2SI7dn.css` | `@keyframes course-cal-fade{0%{opacity:0}to{opacity:1}}` |
| `course-cal-pop` | `CourseJourneyPage-DS2SI7dn.css` | `@keyframes course-cal-pop{0%{opacity:0;transform:translateY(8px) scale(.98)}to{opacity:1;transform:translateY(0) scale(1)}}` |
| `course-cal-spin` | `CourseJourneyPage-DS2SI7dn.css` | `@keyframes course-cal-spin{to{transform:rotate(360deg)}}` |
| `join-auth-fade` | `CourseJourneyPage-DS2SI7dn.css` | `@keyframes join-auth-fade{0%{opacity:0}to{opacity:1}}` |
| `join-auth-pop` | `CourseJourneyPage-DS2SI7dn.css` | `@keyframes join-auth-pop{0%{opacity:0;transform:translateY(8px) scale(.98)}to{opacity:1;transform:translateY(0) scale(1)}}` |
| `extend-entry-canvas-spin` | `CourseJourneyPage-DS2SI7dn.css` | `@keyframes extend-entry-canvas-spin{to{transform:rotate(360deg)}}` |
| `extend-overlay-in` | `CourseJourneyPage-DS2SI7dn.css` | `@keyframes extend-overlay-in{0%{opacity:0}to{opacity:1}}` |
| `extend-palette-in` | `CourseJourneyPage-DS2SI7dn.css` | `@keyframes extend-palette-in{0%{opacity:0;transform:translateY(-10px) scale(.982)}to{opacity:1;transform:translateY(0) scale(1)}}` |
| `extend-spin` | `CourseJourneyPage-DS2SI7dn.css` | `@keyframes extend-spin{to{transform:rotate(360deg)}}` |
| `course-journey-modal-pop` | `CourseJourneyPage-DS2SI7dn.css` | `@keyframes course-journey-modal-pop{0%{opacity:0;transform:translateY(8px) scale(.98)}to{opacity:1;transform:translateY(0) scale(1)}}` |
| `cj-up-next-pill-in` | `CourseJourneyPage-DS2SI7dn.css` | `@keyframes cj-up-next-pill-in{0%{opacity:0;transform:scale(.85)}to{opacity:1;transform:scale(1)}}` |
| `cj-action-next-breathe` | `CourseJourneyPage-DS2SI7dn.css` | `@keyframes cj-action-next-breathe{0%,to{box-shadow:inset 0 1px #ffffff24,inset 0 -1px #121e3429,0 1px 2px #1e2d4b2e,0 5px 12px -6px #32487080}50%{box-shadow:inset 0 1px #ffffff24,inset 0 -1px #121e3429,0 1px 2px #1e2d4b2` |
| `course-journey-practice-spin` | `CourseJourneyPage-DS2SI7dn.css` | `@keyframes course-journey-practice-spin{to{transform:rotate(360deg)}}` |
| `course-journey-rise` | `CourseJourneyPage-DS2SI7dn.css` | `@keyframes course-journey-rise{0%{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}` |
| `course-journey-fade` | `CourseJourneyPage-DS2SI7dn.css` | `@keyframes course-journey-fade{0%{opacity:0}to{opacity:1}}` |
| `course-journey-card-open` | `CourseJourneyPage-DS2SI7dn.css` | `@keyframes course-journey-card-open{0%{opacity:0;transform:translateY(6px) scale(.99)}to{opacity:1;transform:translateY(0) scale(1)}}` |
| `cj-sk-sweep` | `CourseJourneyPage-DS2SI7dn.css` | `@keyframes cj-sk-sweep{0%{transform:translate(-120%)}to{transform:translate(220%)}}` |
| `course-rating-bar-in` | `CourseRatingBar-0PDoG8FU.css` | `@keyframes course-rating-bar-in{0%{opacity:0;transform:translate(-50%,8px)}to{opacity:1;transform:translate(-50%)}}` |
| `course-share-fade` | `CourseShareModal-BUmCT5gt.css` | `@keyframes course-share-fade{0%{opacity:0}to{opacity:1}}` |
| `course-share-pop` | `CourseShareModal-BUmCT5gt.css` | `@keyframes course-share-pop{0%{opacity:0;transform:translateY(8px) scale(.98)}to{opacity:1;transform:translateY(0) scale(1)}}` |
| `csm-skel-in` | `CourseStructureMap-CKhXQdEk.css` | `@keyframes csm-skel-in{0%{opacity:0;transform:translateY(6px) scale(.98)}to{opacity:1;transform:translateY(0) scale(1)}}` |
| `csm-skel-shimmer` | `CourseStructureMap-CKhXQdEk.css` | `@keyframes csm-skel-shimmer{0%{background-position:100% 0}to{background-position:-100% 0}}` |
| `csm-action-enter` | `CourseStructureMap-CKhXQdEk.css` | `@keyframes csm-action-enter{0%{opacity:0;transform:translate(-50%) translateY(8px)}to{opacity:1;transform:translate(-50%) translateY(0)}}` |
| `csm-node-enter` | `CourseStructureMap-CKhXQdEk.css` | `@keyframes csm-node-enter{0%{opacity:0;transform:translateY(-8px) scale(.94)}to{opacity:1;transform:translateY(0) scale(1)}}` |
| `csm-spin` | `CourseStructureMap-CKhXQdEk.css` | `@keyframes csm-spin{to{transform:rotate(360deg)}}` |
| `courses-skeleton-sweep` | `CoursesPage-BHBf4j-Q.css` | `@keyframes courses-skeleton-sweep{to{transform:translate(100%)}}` |
| `coursesSkeletonAppear` | `CoursesPage-BHBf4j-Q.css` | `@keyframes coursesSkeletonAppear{to{opacity:1;transform:scale(1)}}` |
| `fadeIn` | `DeepLearnSessionOutline-vDd7je6H.css` | `@keyframes fadeIn{0%{opacity:0}to{opacity:1}}` |
| `spin` | `DeepLearnSessionOutline-vDd7je6H.css` | `@keyframes spin{to{transform:rotate(360deg)}}` |
| `exam-intro-card-enter` | `ExamPage-DwPj_DPZ.css` | `@keyframes exam-intro-card-enter{0%{opacity:0;transform:translateY(10px) scale(.98)}to{opacity:1;transform:translateY(0) scale(1)}}` |
| `exam-bonus-drain` | `ExamPage-DwPj_DPZ.css` | `@keyframes exam-bonus-drain{0%{transform:scaleX(1)}to{transform:scaleX(0)}}` |
| `mktpFeaturedSkeletonPulse` | `MarketplacePage-uZ6gfnr0.css` | `@keyframes mktpFeaturedSkeletonPulse{0%{background-position:100% 0}to{background-position:-100% 0}}` |
| `mktpFeaturedEyebrowShine` | `MarketplacePage-uZ6gfnr0.css` | `@keyframes mktpFeaturedEyebrowShine{0%{opacity:0;transform:translate(-120%) skew(-18deg)}20%{opacity:1}to{opacity:0;transform:translate(360%) skew(-18deg)}}` |
| `mktp-spotlight-fade-in` | `MarketplacePage-uZ6gfnr0.css` | `@keyframes mktp-spotlight-fade-in{0%{opacity:0}to{opacity:1}}` |
| `mktp-spotlight-pop-in` | `MarketplacePage-uZ6gfnr0.css` | `@keyframes mktp-spotlight-pop-in{0%{opacity:0;transform:translateY(-8px) scale(.98)}to{opacity:1;transform:translateY(0) scale(1)}}` |
| `mktpSkeletonPulse` | `MarketplacePage-uZ6gfnr0.css` | `@keyframes mktpSkeletonPulse{0%,to{opacity:1}50%{opacity:.6}}` |
| `whiteboard-page-turn-toast` | `MessageBubble-CpHDlEfO.css` | `@keyframes whiteboard-page-turn-toast{0%{opacity:0;transform:translate(-50%,calc(-50% + 8px)) scale(.98)}14%,76%{opacity:1;transform:translate(-50%,-50%) scale(1)}to{opacity:0;transform:translate(-50%,calc(-50% - 6px)) s` |
| `whiteboard-caption-fade-in` | `MessageBubble-CpHDlEfO.css` | `@keyframes whiteboard-caption-fade-in{0%{opacity:0;filter:blur(2px)}to{opacity:1;filter:blur(0)}}` |
| `whiteboard-caption-blink` | `MessageBubble-CpHDlEfO.css` | `@keyframes whiteboard-caption-blink{0%,to{opacity:1}50%{opacity:0}}` |
| `whiteboard-interject-in` | `MessageBubble-CpHDlEfO.css` | `@keyframes whiteboard-interject-in{0%{opacity:0;transform:translateY(4px)}to{opacity:1;transform:none}}` |
| `whiteboard-interject-pulse` | `MessageBubble-CpHDlEfO.css` | `@keyframes whiteboard-interject-pulse{0%,to{opacity:1}50%{opacity:.25}}` |
| `whiteboard-voice-btn-preparing` | `MessageBubble-CpHDlEfO.css` | `@keyframes whiteboard-voice-btn-preparing{0%,to{opacity:1}50%{opacity:.45}}` |
| `whiteboard-voice-btn-pulse` | `MessageBubble-CpHDlEfO.css` | `@keyframes whiteboard-voice-btn-pulse{0%,to{opacity:1}50%{opacity:.55}}` |
| `whiteboard-ask-in` | `MessageBubble-CpHDlEfO.css` | `@keyframes whiteboard-ask-in{0%{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}` |
| `whiteboard-ask-verdict` | `MessageBubble-CpHDlEfO.css` | `@keyframes whiteboard-ask-verdict{0%{transform:scale(1)}40%{transform:scale(1.06)}to{transform:scale(1)}}` |
| `whiteboard-input-flash` | `MessageBubble-CpHDlEfO.css` | `@keyframes whiteboard-input-flash{0%,to{box-shadow:0 2px 4px #00000026;border-color:#efefef}50%{box-shadow:0 0 0 4px #4c669447,0 2px 12px #4c669438;border-color:#4c6694}}` |
| `wb-attach-spin` | `MessageBubble-CpHDlEfO.css` | `@keyframes wb-attach-spin{to{transform:rotate(360deg)}}` |
| `wb-conv-outline-ripple` | `MessageBubble-CpHDlEfO.css` | `@keyframes wb-conv-outline-ripple{0%{box-shadow:0 0 #00276c73,0 0 10px 2px #00276c2e}60%{box-shadow:0 0 0 8px #00276c00,0 0 10px 2px #00276c1a}to{box-shadow:0 0 #00276c00,0 0 8px 2px #00276c26}}` |
| `whiteboard-outline-live-hop` | `MessageBubble-CpHDlEfO.css` | `@keyframes whiteboard-outline-live-hop{0%,60%,to{transform:translateY(1.5px)}30%{transform:translateY(-2px)}}` |
| `whiteboard-outline-practice-spin` | `MessageBubble-CpHDlEfO.css` | `@keyframes whiteboard-outline-practice-spin{to{transform:rotate(360deg)}}` |
| `whiteboard-skeleton-sweep` | `MessageBubble-CpHDlEfO.css` | `@keyframes whiteboard-skeleton-sweep{to{transform:translate(100%)}}` |
| `whiteboard-chat-generating-bounce` | `MessageBubble-CpHDlEfO.css` | `@keyframes whiteboard-chat-generating-bounce{0%,60%,to{transform:translateY(0);opacity:.55}30%{transform:translateY(-3px);opacity:1}}` |
| `whiteboard-chat-generating-pulse` | `MessageBubble-CpHDlEfO.css` | `@keyframes whiteboard-chat-generating-pulse{0%,to{opacity:.55}50%{opacity:1}}` |
| `whiteboard-session-prompt-toast` | `MessageBubble-CpHDlEfO.css` | `@keyframes whiteboard-session-prompt-toast{0%{opacity:0;transform:translate(-50%,calc(-50% + 8px))}8%{opacity:1;transform:translate(-50%,-50%)}88%{opacity:1;transform:translate(-50%,-50%)}to{opacity:0;transform:translate` |
| `whiteboard-session-prompt-toast-in` | `MessageBubble-CpHDlEfO.css` | `@keyframes whiteboard-session-prompt-toast-in{0%{opacity:0;transform:translate(-50%,calc(-50% + 8px))}to{opacity:1;transform:translate(-50%,-50%)}}` |
| `whiteboard-learn-intro-card-in` | `MessageBubble-CpHDlEfO.css` | `@keyframes whiteboard-learn-intro-card-in{0%{opacity:0;transform:translateY(8px) scale(.98)}to{opacity:1;transform:translateY(0) scale(1)}}` |
| `whiteboard-reward-overlay-in` | `MessageBubble-CpHDlEfO.css` | `@keyframes whiteboard-reward-overlay-in{0%{opacity:0;transform:translate(-50%,calc(-50% + 10px)) scale(.98)}to{opacity:1;transform:translate(-50%,-50%) scale(1)}}` |
| `whiteboard-modal-overlay-in` | `MessageBubble-CpHDlEfO.css` | `@keyframes whiteboard-modal-overlay-in{0%{opacity:0}to{opacity:1}}` |
| `whiteboard-modal-card-in` | `MessageBubble-CpHDlEfO.css` | `@keyframes whiteboard-modal-card-in{0%{opacity:0;transform:translateY(8px) scale(.98)}to{opacity:1;transform:translateY(0) scale(1)}}` |
| `wb-dot-scan` | `MessageBubble-CpHDlEfO.css` | `@keyframes wb-dot-scan{0%{--wb-beam-pos: -60%}to{--wb-beam-pos: 160%}}` |
| `mb-transcribing-shimmer` | `MessageBubble-CpHDlEfO.css` | `@keyframes mb-transcribing-shimmer{0%{background-position:100% 50%}to{background-position:0 50%}}` |
| `onboarding-orbie-return` | `Onboarding-5TPEhD7Z.css` | `@keyframes onboarding-orbie-return{0%{opacity:0;transform:scale(.86)}to{opacity:1;transform:scale(1)}}` |
| `onboarding-orbie-enter` | `Onboarding-5TPEhD7Z.css` | `@keyframes onboarding-orbie-enter{0%{opacity:0;transform:translate(-18px,42px) scale(.35);filter:blur(6px)}40%{opacity:1;transform:translate(12px,-16px) scale(1.12);filter:blur(0)}62%{transform:translate(-8px,8px) scale(` |
| `onboarding-greeting-fade` | `Onboarding-5TPEhD7Z.css` | `@keyframes onboarding-greeting-fade{0%{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}` |
| `onboarding-hello-drift` | `Onboarding-5TPEhD7Z.css` | `@keyframes onboarding-hello-drift{0%,to{transform:translateY(0)}50%{transform:translateY(-5px)}}` |
| `onboarding-halo-breathe` | `Onboarding-5TPEhD7Z.css` | `@keyframes onboarding-halo-breathe{0%,to{transform:translate(-50%,-50%) scale(1);opacity:1}50%{transform:translate(-50%,-50%) scale(1.06);opacity:.82}}` |
| `onboarding-orbie-fly` | `Onboarding-5TPEhD7Z.css` | `@keyframes onboarding-orbie-fly{0%{transform:translate3d(0,-92px,0)}8%{transform:translate3d(-18px,-104px,0)}22%{transform:translate3d(-70px,-122px,0)}46%{transform:translate3d(-165px,-117px,0)}68%{transform:translate3d(` |
| `onboarding-orbie-bank` | `Onboarding-5TPEhD7Z.css` | `@keyframes onboarding-orbie-bank{0%{transform:rotate(0) scale(1)}26%{transform:rotate(-7deg) scale(1.08)}62%{transform:rotate(-4.5deg) scale(1.06)}to{transform:rotate(0) scale(1)}}` |
| `onboarding-referral-spin` | `Onboarding-5TPEhD7Z.css` | `@keyframes onboarding-referral-spin{to{transform:rotate(360deg)}}` |
| `onboarding-quiz-in` | `Onboarding-5TPEhD7Z.css` | `@keyframes onboarding-quiz-in{0%{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}` |
| `onboarding-rocket-drift` | `Onboarding-5TPEhD7Z.css` | `@keyframes onboarding-rocket-drift{0%,to{transform:translateY(11px)}50%{transform:translateY(-13px)}}` |
| `onboarding-brief-enter` | `Onboarding-5TPEhD7Z.css` | `@keyframes onboarding-brief-enter{0%{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}` |
| `onboarding-brief-char-in` | `Onboarding-5TPEhD7Z.css` | `@keyframes onboarding-brief-char-in{0%{opacity:0;transform:translateY(12px) scale(.86)}to{opacity:1;transform:translateY(0) scale(1)}}` |
| `onboarding-brief-line-in` | `Onboarding-5TPEhD7Z.css` | `@keyframes onboarding-brief-line-in{0%{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}` |
| `onboarding-brief-line-roll` | `Onboarding-5TPEhD7Z.css` | `@keyframes onboarding-brief-line-roll{0%{opacity:0;transform:translateY(1.6em)}to{opacity:1;transform:translateY(0)}}` |
| `onboarding-spin` | `Onboarding-5TPEhD7Z.css` | `@keyframes onboarding-spin{to{transform:rotate(360deg)}}` |
| `onboarding-spark` | `Onboarding-5TPEhD7Z.css` | `@keyframes onboarding-spark{0%{opacity:0;transform:translate(-50%,-50%) scale(.4)}25%{opacity:1}to{opacity:0;transform:translate(calc(-50% + var(--spark-x)),calc(-50% + var(--spark-y))) scale(.5)}}` |
| `onboarding-finish-pop` | `Onboarding-5TPEhD7Z.css` | `@keyframes onboarding-finish-pop{0%{transform:scale(1)}35%{transform:scale(.94)}to{transform:scale(1.04)}}` |
| `onboarding-finish-char-in` | `Onboarding-5TPEhD7Z.css` | `@keyframes onboarding-finish-char-in{0%{opacity:0;transform:translateY(18px) scale(.8)}to{opacity:1;transform:translateY(0) scale(1)}}` |
| `onboarding-finish-rise` | `Onboarding-5TPEhD7Z.css` | `@keyframes onboarding-finish-rise{0%{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}` |
| `practice-slot-roll` | `PracticePage-Cl2nBTMu.css` | `@keyframes practice-slot-roll{0%{transform:translateY(var(--slot-from))}to{transform:translateY(var(--slot-to))}}` |
| `practice-check-confetti-burst` | `PracticePage-Cl2nBTMu.css` | `@keyframes practice-check-confetti-burst{0%{opacity:0;transform:translate(-50%,-50%) scale(.5) rotate(0)}8%{opacity:1;transform:translate(-50%,-50%) scale(1) rotate(calc(var(--cf-rotate) * .08))}to{opacity:0;transform:tr` |
| `practice-result-rise` | `PracticePage-Cl2nBTMu.css` | `@keyframes practice-result-rise{0%{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}` |
| `practice-result-aura-in` | `PracticePage-Cl2nBTMu.css` | `@keyframes practice-result-aura-in{0%{opacity:0;transform:scale(.8)}to{opacity:1;transform:none}}` |
| `practice-result-aura-breathe` | `PracticePage-Cl2nBTMu.css` | `@keyframes practice-result-aura-breathe{0%,to{opacity:1;transform:scale(1)}50%{opacity:.75;transform:scale(1.06)}}` |
| `practice-welcome-fade` | `PracticePage-Cl2nBTMu.css` | `@keyframes practice-welcome-fade{0%{opacity:0}to{opacity:1}}` |
| `practice-welcome-modal-pop` | `PracticePage-Cl2nBTMu.css` | `@keyframes practice-welcome-modal-pop{0%{opacity:0;transform:translateY(8px) scale(.98)}to{opacity:1;transform:translateY(0) scale(1)}}` |
| `practice-tts-spin` | `PracticePage-Cl2nBTMu.css` | `@keyframes practice-tts-spin{to{transform:rotate(360deg)}}` |
| `practice-assistant-dot` | `PracticePage-Cl2nBTMu.css` | `@keyframes practice-assistant-dot{0%,80%,to{opacity:.3;transform:scale(.8)}40%{opacity:1;transform:scale(1)}}` |
| `practice-assistant-spin` | `PracticePage-Cl2nBTMu.css` | `@keyframes practice-assistant-spin{to{transform:rotate(360deg)}}` |
| `practice-score-chip-pop` | `PracticePage-Cl2nBTMu.css` | `@keyframes practice-score-chip-pop{0%{transform:scale(1)}35%{transform:scale(1.07)}to{transform:scale(1)}}` |
| `practice-timer-drain` | `PracticePage-Cl2nBTMu.css` | `@keyframes practice-timer-drain{0%{transform:scaleX(1)}to{transform:scaleX(0)}}` |
| `practice-timer-drain-plain` | `PracticePage-Cl2nBTMu.css` | `@keyframes practice-timer-drain-plain{0%{transform:scaleX(1)}to{transform:scaleX(0)}}` |
| `practice-stars-stamp` | `PracticeStars-SB0hDemQ.css` | `@keyframes practice-stars-stamp{to{opacity:1;transform:none}}` |
| `cj-preparing-fade` | `PreparingModal-Cm4LEKXk.css` | `@keyframes cj-preparing-fade{0%{opacity:0}to{opacity:1}}` |
| `cj-preparing-pop` | `PreparingModal-Cm4LEKXk.css` | `@keyframes cj-preparing-pop{0%{opacity:0;transform:translateY(8px) scale(.98)}to{opacity:1;transform:translateY(0) scale(1)}}` |
| `pw-fadeIn` | `ProSuccessCelebration-CLzf8p0E.css` | `@keyframes pw-fadeIn{0%{opacity:0}to{opacity:1}}` |
| `pw-slideUp` | `ProSuccessCelebration-CLzf8p0E.css` | `@keyframes pw-slideUp{0%{opacity:0;transform:translateY(24px) scale(.98)}to{opacity:1;transform:translateY(0) scale(1)}}` |
| `project-stage-spin` | `ProjectStagePage-DR9S21VM.css` | `@keyframes project-stage-spin{to{transform:rotate(360deg)}}` |
| `project-stage-sk-sweep` | `ProjectStagePage-DR9S21VM.css` | `@keyframes project-stage-sk-sweep{0%{transform:translate(-120%)}to{transform:translate(220%)}}` |
| `project-stage-dot` | `ProjectStagePage-DR9S21VM.css` | `@keyframes project-stage-dot{0%,80%,to{opacity:.3;transform:scale(.8)}40%{opacity:1;transform:scale(1)}}` |
| `shared-copy-dropdown-fade-in` | `SharedConversationPage-CFBxhGpI.css` | `@keyframes shared-copy-dropdown-fade-in{0%{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:translateY(0)}}` |
| `sl-interject-in` | `SplitLayout-DnssbUW2.css` | `@keyframes sl-interject-in{0%{opacity:0;transform:translateY(4px)}to{opacity:1;transform:none}}` |
| `sl-interject-pulse` | `SplitLayout-DnssbUW2.css` | `@keyframes sl-interject-pulse{0%,to{opacity:1}50%{opacity:.25}}` |
| `sl-voice-btn-preparing` | `SplitLayout-DnssbUW2.css` | `@keyframes sl-voice-btn-preparing{0%,to{opacity:1}50%{opacity:.45}}` |
| `sl-voice-btn-pulse` | `SplitLayout-DnssbUW2.css` | `@keyframes sl-voice-btn-pulse{0%,to{opacity:1}50%{opacity:.55}}` |
| `sl-ask-in` | `SplitLayout-DnssbUW2.css` | `@keyframes sl-ask-in{0%{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}` |
| `sl-ask-verdict` | `SplitLayout-DnssbUW2.css` | `@keyframes sl-ask-verdict{0%{transform:scale(1)}40%{transform:scale(1.06)}to{transform:scale(1)}}` |
| `sl-input-flash` | `SplitLayout-DnssbUW2.css` | `@keyframes sl-input-flash{0%,to{box-shadow:0 2px 4px #00000026;border-color:#ebebeb}50%{box-shadow:0 0 0 4px #4c669447,0 2px 12px #4c669438;border-color:#4c6694}}` |
| `sl-caption-blink` | `SplitLayout-DnssbUW2.css` | `@keyframes sl-caption-blink{0%,to{opacity:1}50%{opacity:0}}` |
| `sl-attach-spin` | `SplitLayout-DnssbUW2.css` | `@keyframes sl-attach-spin{to{transform:rotate(360deg)}}` |
| `sl-session-outline-live-hop` | `SplitLayout-DnssbUW2.css` | `@keyframes sl-session-outline-live-hop{0%,60%,to{transform:translateY(1.5px)}30%{transform:translateY(-2px)}}` |
| `sl-session-outline-practice-spin` | `SplitLayout-DnssbUW2.css` | `@keyframes sl-session-outline-practice-spin{to{transform:rotate(360deg)}}` |
| `sl-skeleton-sweep` | `SplitLayout-DnssbUW2.css` | `@keyframes sl-skeleton-sweep{to{transform:translate(100%)}}` |
| `sl-chat-generating-bounce` | `SplitLayout-DnssbUW2.css` | `@keyframes sl-chat-generating-bounce{0%,60%,to{transform:translateY(0);opacity:.55}30%{transform:translateY(-3px);opacity:1}}` |
| `sl-chat-generating-pulse` | `SplitLayout-DnssbUW2.css` | `@keyframes sl-chat-generating-pulse{0%,to{opacity:.55}50%{opacity:1}}` |
| `sl-session-prompt-toast` | `SplitLayout-DnssbUW2.css` | `@keyframes sl-session-prompt-toast{0%{opacity:0;transform:translate(-50%,calc(-50% + 8px))}8%{opacity:1;transform:translate(-50%,-50%)}88%{opacity:1;transform:translate(-50%,-50%)}to{opacity:0;transform:translate(-50%,ca` |
| `sl-session-prompt-toast-in` | `SplitLayout-DnssbUW2.css` | `@keyframes sl-session-prompt-toast-in{0%{opacity:0;transform:translate(-50%,calc(-50% + 8px))}to{opacity:1;transform:translate(-50%,-50%)}}` |
| `sl-learn-intro-card-in` | `SplitLayout-DnssbUW2.css` | `@keyframes sl-learn-intro-card-in{0%{opacity:0;transform:translateY(8px) scale(.98)}to{opacity:1;transform:translateY(0) scale(1)}}` |
| `sl-modal-overlay-in` | `SplitLayout-DnssbUW2.css` | `@keyframes sl-modal-overlay-in{0%{opacity:0}to{opacity:1}}` |
| `sl-modal-card-in` | `SplitLayout-DnssbUW2.css` | `@keyframes sl-modal-card-in{0%{opacity:0;transform:translateY(8px) scale(.98)}to{opacity:1;transform:translateY(0) scale(1)}}` |
| `slideInUp` | `StripePaymentValidation-BenvS8TF.css` | `@keyframes slideInUp{0%{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}` |
| `sh-row-board-tooltip-in` | `StudyHistoryPage-CCJ2gWmH.css` | `@keyframes sh-row-board-tooltip-in{0%{opacity:0;transform:translate(-100%,calc(-100% + 3px))}to{opacity:1;transform:translate(-100%,-100%)}}` |
| `sh-menu-in` | `StudyHistoryPage-CCJ2gWmH.css` | `@keyframes sh-menu-in{0%{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:translateY(0)}}` |
| `sh-menu-in-above` | `StudyHistoryPage-CCJ2gWmH.css` | `@keyframes sh-menu-in-above{0%{opacity:0;transform:translateY(4px)}to{opacity:1;transform:translateY(0)}}` |
| `sh-pulse` | `StudyHistoryPage-CCJ2gWmH.css` | `@keyframes sh-pulse{0%,to{opacity:1}50%{opacity:.45}}` |
| `fadeInUp` | `TextSelectionPopup-Bb5ulKv7.css` | `@keyframes fadeInUp{0%{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}` |
| `diagFadeIn` | `TextSelectionPopup-Bb5ulKv7.css` | `@keyframes diagFadeIn{0%{opacity:0;transform:translate(-8px)}to{opacity:1;transform:translate(0)}}` |
| `tsp-pop-in` | `TextSelectionPopup-Bb5ulKv7.css` | `@keyframes tsp-pop-in{0%{opacity:0;transform:translate(-50%) scale(.88)}to{opacity:1;transform:translate(-50%) scale(1)}}` |
| `tsp-slide-in` | `TextSelectionPopup-Bb5ulKv7.css` | `@keyframes tsp-slide-in{0%{opacity:0;transform:translateY(6px) scale(.98)}to{opacity:1;transform:translateY(0) scale(1)}}` |
| `tsp-blink` | `TextSelectionPopup-Bb5ulKv7.css` | `@keyframes tsp-blink{0%,to{opacity:1}50%{opacity:0}}` |
| `tsp-shimmer` | `TextSelectionPopup-Bb5ulKv7.css` | `@keyframes tsp-shimmer{0%{background-position:200% 0}to{background-position:-200% 0}}` |
| `session-idle-prompt-in` | `VoiceModeModal-CXrhe9tg.css` | `@keyframes session-idle-prompt-in{0%{opacity:0;transform:translate(-50%,calc(-50% + 10px)) scale(.98)}to{opacity:1;transform:translate(-50%,-50%) scale(1)}}` |
| `netcheck-spin` | `VoiceModeModal-CXrhe9tg.css` | `@keyframes netcheck-spin{to{transform:rotate(360deg)}}` |
| `voice-mode-fade-in` | `VoiceModeModal-CXrhe9tg.css` | `@keyframes voice-mode-fade-in{0%{opacity:0}to{opacity:1}}` |
| `voice-mode-scale-in` | `VoiceModeModal-CXrhe9tg.css` | `@keyframes voice-mode-scale-in{0%{opacity:0;transform:translateY(8px) scale(.98)}to{opacity:1;transform:none}}` |
| `voice-modal-fade-in` | `VoiceSettingsModal-CImIZ80P.css` | `@keyframes voice-modal-fade-in{0%{opacity:0}to{opacity:1}}` |
| `voice-modal-scale-in` | `VoiceSettingsModal-CImIZ80P.css` | `@keyframes voice-modal-scale-in{0%{opacity:0;transform:scale(.96)}to{opacity:1;transform:scale(1)}}` |
| `welcomeBackPageIn` | `WelcomeBackPage-CdAN3E5s.css` | `@keyframes welcomeBackPageIn{0%{opacity:0}to{opacity:1}}` |
| `welcomeBackPageOut` | `WelcomeBackPage-CdAN3E5s.css` | `@keyframes welcomeBackPageOut{0%{opacity:1}68%{opacity:1}to{opacity:0}}` |
| `welcomeBackPieceFly` | `WelcomeBackPage-CdAN3E5s.css` | `@keyframes welcomeBackPieceFly{0%{opacity:1;transform:translateZ(0) rotate(0) scale(1);filter:blur(0)}to{opacity:0;transform:translate3d(var(--exit-x),var(--exit-y),0) rotate(var(--exit-rotate)) scale(.92);filter:blur(8p` |
| `skeleton-pulse` | `deepLearnSession-BQzBOo0h.css` | `@keyframes skeleton-pulse{0%,to{opacity:1;background-color:#e5e5e5}50%{opacity:.6;background-color:#f0f0f0}}` |
| `generating-toast-in` | `deepLearnSession-BQzBOo0h.css` | `@keyframes generating-toast-in{0%{opacity:0;transform:translate(-50%) translateY(10px)}to{opacity:1;transform:translate(-50%) translateY(0)}}` |
| `upload-error-toast-in` | `deepLearnSession-BQzBOo0h.css` | `@keyframes upload-error-toast-in{0%{opacity:0;transform:translate(-50%) translateY(12px)}to{opacity:1;transform:translate(-50%) translateY(0)}}` |
| `unlock-fadeIn` | `deepLearnSession-BQzBOo0h.css` | `@keyframes unlock-fadeIn{0%{opacity:0}to{opacity:1}}` |
| `unlock-scaleIn` | `deepLearnSession-BQzBOo0h.css` | `@keyframes unlock-scaleIn{0%{opacity:0;transform:scale(.96)}to{opacity:1;transform:scale(1)}}` |
| `skeleton-shimmer` | `emailSubscriptionPage-CuhD4aRw.css` | `@keyframes skeleton-shimmer{0%{background-position:200% 0}to{background-position:-200% 0}}` |
| `flicker` | `forgotPassword-BHqD2hJg.css` | `@keyframes flicker{0%{opacity:.98}50%{opacity:1}to{opacity:.99}}` |
| `scanline` | `forgotPassword-BHqD2hJg.css` | `@keyframes scanline{0%{top:-10%}to{top:110%}}` |
| `blink` | `forgotPassword-BHqD2hJg.css` | `@keyframes blink{0%,to{opacity:1}50%{opacity:0}}` |
| `fadeInTooltip` | `historyConversationDataParser-BnegVg7M.css` | `@keyframes fadeInTooltip{0%{opacity:0;transform:translate(-50%) translateY(-2px)}to{opacity:1;transform:translate(-50%) translateY(0)}}` |
| `mermaidSpin` | `historyConversationDataParser-BnegVg7M.css` | `@keyframes mermaidSpin{to{transform:rotate(360deg)}}` |
| `mermaidFadeIn` | `historyConversationDataParser-BnegVg7M.css` | `@keyframes mermaidFadeIn{to{opacity:1}}` |
| `mermaidScaleIn` | `historyConversationDataParser-BnegVg7M.css` | `@keyframes mermaidScaleIn{to{transform:scale(1)}}` |
| `desmosSpin` | `historyConversationDataParser-BnegVg7M.css` | `@keyframes desmosSpin{to{transform:rotate(360deg)}}` |
| `desmosFadeIn` | `historyConversationDataParser-BnegVg7M.css` | `@keyframes desmosFadeIn{to{opacity:1}}` |
| `desmosScaleIn` | `historyConversationDataParser-BnegVg7M.css` | `@keyframes desmosScaleIn{to{transform:scale(1)}}` |
| `imageActionButtonSpin` | `historyConversationDataParser-BnegVg7M.css` | `@keyframes imageActionButtonSpin{to{transform:rotate(360deg)}}` |
| `imageActionFadeIn` | `historyConversationDataParser-BnegVg7M.css` | `@keyframes imageActionFadeIn{to{opacity:1}}` |
| `imageActionScaleIn` | `historyConversationDataParser-BnegVg7M.css` | `@keyframes imageActionScaleIn{to{transform:scale(1)}}` |
| `ws-dot-scan` | `historyConversationDataParser-BnegVg7M.css` | `@keyframes ws-dot-scan{0%{--ws-beam-pos: -60%}to{--ws-beam-pos: 160%}}` |
| `inlineDiagramPulse` | `historyConversationDataParser-BnegVg7M.css` | `@keyframes inlineDiagramPulse{0%{opacity:.35;transform:scale(1)}50%{opacity:.85;transform:scale(1.015)}to{opacity:.35;transform:scale(1)}}` |
| `inlineImageSearchPulse` | `historyConversationDataParser-BnegVg7M.css` | `@keyframes inlineImageSearchPulse{0%{opacity:.35}50%{opacity:.85}to{opacity:.35}}` |
| `shimmer` | `historyConversationDataParser-BnegVg7M.css` | `@keyframes shimmer{0%{left:-100%}to{left:100%}}` |
| `flashcardPulse` | `historyConversationDataParser-BnegVg7M.css` | `@keyframes flashcardPulse{0%,to{opacity:.4}50%{opacity:1}}` |
| `dotPop` | `historyConversationDataParser-BnegVg7M.css` | `@keyframes dotPop{0%{transform:translate(-50%,-50%) scale(0);opacity:0}50%{transform:translate(-50%,-50%) scale(1.3);opacity:1}to{transform:translate(-50%,-50%) scale(1);opacity:1}}` |
| `scaleIn` | `historyConversationDataParser-BnegVg7M.css` | `@keyframes scaleIn{to{transform:scale(1)}}` |
| `searchSkeletonShimmer` | `historyConversationDataParser-BnegVg7M.css` | `@keyframes searchSkeletonShimmer{0%{transform:translate(-100%)}to{transform:translate(100%)}}` |
| `analyzeUrlSlideIn` | `historyConversationDataParser-BnegVg7M.css` | `@keyframes analyzeUrlSlideIn{0%{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}` |
| `analyzeUrlShimmer` | `historyConversationDataParser-BnegVg7M.css` | `@keyframes analyzeUrlShimmer{0%{left:-100%}50%{left:100%}to{left:100%}}` |
| `analyzeUrlCheckPop` | `historyConversationDataParser-BnegVg7M.css` | `@keyframes analyzeUrlCheckPop{0%{transform:scale(0)}50%{transform:scale(1.2)}to{transform:scale(1)}}` |
| `analyzeUrlFadeIn` | `historyConversationDataParser-BnegVg7M.css` | `@keyframes analyzeUrlFadeIn{0%{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}` |
| `analyzeUrlSlideLeft` | `historyConversationDataParser-BnegVg7M.css` | `@keyframes analyzeUrlSlideLeft{0%{opacity:0;transform:translate(-12px)}to{opacity:1;transform:translate(0)}}` |
| `memoryRecallSlideIn` | `historyConversationDataParser-BnegVg7M.css` | `@keyframes memoryRecallSlideIn{0%{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}` |
| `memoryRecallShimmer` | `historyConversationDataParser-BnegVg7M.css` | `@keyframes memoryRecallShimmer{0%{left:-100%}50%{left:100%}to{left:100%}}` |
| `memoryRecallCheckPop` | `historyConversationDataParser-BnegVg7M.css` | `@keyframes memoryRecallCheckPop{0%{transform:scale(0)}50%{transform:scale(1.2)}to{transform:scale(1)}}` |
| `memoryRecallFadeIn` | `historyConversationDataParser-BnegVg7M.css` | `@keyframes memoryRecallFadeIn{0%{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}` |
| `slideInDown` | `historyConversationDataParser-BnegVg7M.css` | `@keyframes slideInDown{0%{opacity:0;transform:translateY(-5px)}to{opacity:1;transform:translateY(0)}}` |
| `slideInLeft` | `historyConversationDataParser-BnegVg7M.css` | `@keyframes slideInLeft{0%{opacity:0;transform:translate(-10px)}to{opacity:1;transform:translate(0)}}` |
| `readContentSlideInUp` | `historyConversationDataParser-BnegVg7M.css` | `@keyframes readContentSlideInUp{0%{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}` |
| `readContentLetterShimmer` | `historyConversationDataParser-BnegVg7M.css` | `@keyframes readContentLetterShimmer{0%{left:-100%}50%{left:100%}to{left:100%}}` |
| `readContentCheckmarkPop` | `historyConversationDataParser-BnegVg7M.css` | `@keyframes readContentCheckmarkPop{0%{transform:scale(0)}50%{transform:scale(1.2)}to{transform:scale(1)}}` |
| `getSkillsSlideInUp` | `historyConversationDataParser-BnegVg7M.css` | `@keyframes getSkillsSlideInUp{0%{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}` |
| `getSkillsLetterShimmer` | `historyConversationDataParser-BnegVg7M.css` | `@keyframes getSkillsLetterShimmer{0%{left:-100%}50%{left:100%}to{left:100%}}` |
| `getSkillsCheckmarkPop` | `historyConversationDataParser-BnegVg7M.css` | `@keyframes getSkillsCheckmarkPop{0%{transform:scale(0)}50%{transform:scale(1.2)}to{transform:scale(1)}}` |
| `sgcPopoverIn` | `historyConversationDataParser-BnegVg7M.css` | `@keyframes sgcPopoverIn{0%{opacity:0;transform:translate(-50%) translateY(6px)}to{opacity:1;transform:translate(-50%) translateY(0)}}` |
| `boardSessionStepSlideInUp` | `historyConversationDataParser-BnegVg7M.css` | `@keyframes boardSessionStepSlideInUp{0%{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}` |
| `boardSessionCheckmarkPop` | `historyConversationDataParser-BnegVg7M.css` | `@keyframes boardSessionCheckmarkPop{0%{transform:scale(0)}50%{transform:scale(1.2)}to{transform:scale(1)}}` |
| `courseGenSubFadeIn` | `historyConversationDataParser-BnegVg7M.css` | `@keyframes courseGenSubFadeIn{0%{opacity:0;transform:translateY(4px)}to{opacity:1;transform:translateY(0)}}` |
| `letterShimmer` | `historyConversationDataParser-BnegVg7M.css` | `@keyframes letterShimmer{0%{left:-100%}50%{left:100%}to{left:100%}}` |
| `courseGenTipsIn` | `historyConversationDataParser-BnegVg7M.css` | `@keyframes courseGenTipsIn{0%{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}` |
| `courseGenTipsSlide` | `historyConversationDataParser-BnegVg7M.css` | `@keyframes courseGenTipsSlide{0%{opacity:0;transform:translateY(4px)}to{opacity:1;transform:translateY(0)}}` |
| `boardSessionSlideInUp` | `historyConversationDataParser-BnegVg7M.css` | `@keyframes boardSessionSlideInUp{0%{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}` |
| `gmtCommentIn` | `historyConversationDataParser-BnegVg7M.css` | `@keyframes gmtCommentIn{0%{opacity:0;transform:translateY(3px) scale(.97)}to{opacity:1;transform:translateY(0) scale(1)}}` |
| `gmtSpin` | `historyConversationDataParser-BnegVg7M.css` | `@keyframes gmtSpin{to{transform:rotate(360deg)}}` |
| `generate-main-tasks-shimmer` | `historyConversationDataParser-BnegVg7M.css` | `@keyframes generate-main-tasks-shimmer{0%{left:-100%}50%{left:100%}to{left:100%}}` |
| `generate-main-tasks-slide-in` | `historyConversationDataParser-BnegVg7M.css` | `@keyframes generate-main-tasks-slide-in{0%{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}` |
| `generate-main-tasks-check-pop` | `historyConversationDataParser-BnegVg7M.css` | `@keyframes generate-main-tasks-check-pop{0%{transform:scale(0)}50%{transform:scale(1.2)}to{transform:scale(1)}}` |
| `slideInFade` | `historyConversationDataParser-BnegVg7M.css` | `@keyframes slideInFade{0%{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}` |
| `dlguard-fade-in` | `historyConversationDataParser-BnegVg7M.css` | `@keyframes dlguard-fade-in{0%{opacity:0}to{opacity:1}}` |
| `dlguard-scale-in` | `historyConversationDataParser-BnegVg7M.css` | `@keyframes dlguard-scale-in{0%{opacity:0;transform:scale(.96)}to{opacity:1;transform:scale(1)}}` |
| `cg-rise` | `historyConversationDataParser-BnegVg7M.css` | `@keyframes cg-rise{0%{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}` |
| `course-generation-dots` | `historyConversationDataParser-BnegVg7M.css` | `@keyframes course-generation-dots{0%{content:""}25%{content:"."}50%{content:".."}75%{content:"..."}to{content:""}}` |
| `checkmarkPop` | `historyConversationDataParser-BnegVg7M.css` | `@keyframes checkmarkPop{0%{transform:scale(0)}50%{transform:scale(1.2)}to{transform:scale(1)}}` |
| `credit-exhausted-fade` | `index-WxmVESBe.css` | `@keyframes credit-exhausted-fade{0%{opacity:0}to{opacity:1}}` |
| `credit-exhausted-pop` | `index-WxmVESBe.css` | `@keyframes credit-exhausted-pop{0%{opacity:0;transform:translateY(8px) scale(.98)}to{opacity:1;transform:translateY(0) scale(1)}}` |
| `bottomToastIn` | `index-WxmVESBe.css` | `@keyframes bottomToastIn{0%{opacity:0;transform:translate(-50%) translateY(12px)}to{opacity:1;transform:translate(-50%) translateY(0)}}` |
| `affiliateFadeIn` | `index-WxmVESBe.css` | `@keyframes affiliateFadeIn{0%{opacity:0}to{opacity:1}}` |
| `affiliateSlideUp` | `index-WxmVESBe.css` | `@keyframes affiliateSlideUp{0%{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}` |
| `slideIn` | `index-WxmVESBe.css` | `@keyframes slideIn{0%{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}` |
| `successPulse` | `index-WxmVESBe.css` | `@keyframes successPulse{0%{transform:scale(.8);opacity:0}50%{transform:scale(1.1)}to{transform:scale(1);opacity:1}}` |
| `checkmarkDraw` | `index-WxmVESBe.css` | `@keyframes checkmarkDraw{0%{stroke-dasharray:0 50;stroke-dashoffset:50}to{stroke-dasharray:50 0;stroke-dashoffset:0}}` |
| `float` | `index-WxmVESBe.css` | `@keyframes float{0%,to{transform:translateY(0) rotate(0);opacity:.3}50%{transform:translateY(-20px) rotate(180deg);opacity:.6}}` |
| `skeleton-loading` | `index-WxmVESBe.css` | `@keyframes skeleton-loading{0%{background-position:200% 0}to{background-position:-200% 0}}` |
| `slideUp` | `index-WxmVESBe.css` | `@keyframes slideUp{0%{opacity:0;transform:translateY(30px) scale(.95)}to{opacity:1;transform:translateY(0) scale(1)}}` |
| `quotaReminderShowUp` | `index-WxmVESBe.css` | `@keyframes quotaReminderShowUp{0%{opacity:0;transform:translateY(-10px) scale(.95)}50%{opacity:.7;transform:translateY(-5px) scale(.98)}to{opacity:1;transform:translateY(0) scale(1)}}` |
| `quotaBlink` | `index-WxmVESBe.css` | `@keyframes quotaBlink{0%,to{background:var(--quota-critical-bg, #FFFFFF);border-color:var(--quota-critical-border, #E6EAF0);box-shadow:0 4px 14px var(--quota-critical-shadow, rgba(15, 23, 42, .06))}50%{background:var(--q` |
| `dm-fadeIn` | `index-WxmVESBe.css` | `@keyframes dm-fadeIn{0%{opacity:0}to{opacity:1}}` |
| `dm-slideUp` | `index-WxmVESBe.css` | `@keyframes dm-slideUp{0%{opacity:0;transform:translateY(24px) scale(.98)}to{opacity:1;transform:translateY(0) scale(1)}}` |
| `bwmFadeIn` | `index-WxmVESBe.css` | `@keyframes bwmFadeIn{0%{opacity:0}to{opacity:1}}` |
| `bwmSlideUp` | `index-WxmVESBe.css` | `@keyframes bwmSlideUp{0%{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}` |
| `bwmPanelOpen` | `index-WxmVESBe.css` | `@keyframes bwmPanelOpen{0%{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:translateY(0)}}` |
| `nf-fadeIn` | `index-WxmVESBe.css` | `@keyframes nf-fadeIn{0%{opacity:0}to{opacity:1}}` |
| `nf-slideUp` | `index-WxmVESBe.css` | `@keyframes nf-slideUp{0%{opacity:0;transform:translateY(24px) scale(.98)}to{opacity:1;transform:translateY(0) scale(1)}}` |
| `course-intent-rejected-fade` | `index-WxmVESBe.css` | `@keyframes course-intent-rejected-fade{0%{opacity:0}to{opacity:1}}` |
| `course-intent-rejected-pop` | `index-WxmVESBe.css` | `@keyframes course-intent-rejected-pop{0%{opacity:0;transform:scale(.96) translateY(6px)}to{opacity:1;transform:scale(1) translateY(0)}}` |
| `talkToFoundersOverlayFade` | `index-WxmVESBe.css` | `@keyframes talkToFoundersOverlayFade{0%{opacity:0}to{opacity:1}}` |
| `talkToFoundersSlide` | `index-WxmVESBe.css` | `@keyframes talkToFoundersSlide{0%{opacity:0;transform:translateY(12px) scale(.98)}to{opacity:1;transform:translateY(0) scale(1)}}` |
| `talkToFoundersOverlayOut` | `index-WxmVESBe.css` | `@keyframes talkToFoundersOverlayOut{0%{opacity:1}to{opacity:0}}` |
| `talkToFoundersModalOut` | `index-WxmVESBe.css` | `@keyframes talkToFoundersModalOut{0%{opacity:1;transform:translateY(0) scale(1)}to{opacity:0;transform:translateY(10px) scale(.98)}}` |
| `librarySkeletonAppear` | `index-WxmVESBe.css` | `@keyframes librarySkeletonAppear{to{opacity:1;transform:scale(1)}}` |
| `libraryTicketReveal` | `index-WxmVESBe.css` | `@keyframes libraryTicketReveal{to{opacity:1;transform:scale(1)}}` |
| `marketplaceModalFade` | `index-WxmVESBe.css` | `@keyframes marketplaceModalFade{0%{opacity:0}to{opacity:1}}` |
| `marketplaceModalSlide` | `index-WxmVESBe.css` | `@keyframes marketplaceModalSlide{0%{opacity:0;transform:translateY(20px) scale(.98)}to{opacity:1;transform:translateY(0) scale(1)}}` |
| `dot-wind` | `index-WxmVESBe.css` | `@keyframes dot-wind{0%{-webkit-mask-position:0% 20%;mask-position:0% 20%}50%{-webkit-mask-position:70% 85%;mask-position:70% 85%}to{-webkit-mask-position:100% 10%;mask-position:100% 10%}}` |
| `hotspot-pop-in` | `index-WxmVESBe.css` | `@keyframes hotspot-pop-in{0%{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}` |
| `slideDown` | `index-WxmVESBe.css` | `@keyframes slideDown{0%{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}` |
| `brush-stroke-reveal` | `index-WxmVESBe.css` | `@keyframes brush-stroke-reveal{to{clip-path:inset(0 0% 0 0)}}` |
| `courseGuideUnfold` | `index-WxmVESBe.css` | `@keyframes courseGuideUnfold{0%{max-height:0;margin-bottom:0;opacity:0;transform:translateY(4px)}40%{opacity:1}to{max-height:240px;margin-bottom:-24px;opacity:1;transform:translateY(0)}}` |
| `rolling-home-hint-exit` | `index-WxmVESBe.css` | `@keyframes rolling-home-hint-exit{0%{opacity:1;transform:translateZ(0);filter:blur(0);color:#7a8da5;text-shadow:none}48%{opacity:.8;transform:translate3d(0,-.2em,0);color:#9ec8eb;filter:blur(2.5px);text-shadow:0 0 10px #` |
| `rolling-home-hint-enter` | `index-WxmVESBe.css` | `@keyframes rolling-home-hint-enter{0%{opacity:0;transform:translate3d(0,.52em,0);filter:blur(5px);color:#c5e4fa;text-shadow:0 0 10px rgba(232,240,248,.95),0 0 24px rgba(200,228,255,.75)}40%{opacity:.7;transform:translate` |
| `craft-course-tab-hint-in` | `index-WxmVESBe.css` | `@keyframes craft-course-tab-hint-in{0%{opacity:0;transform:translateY(3px)}to{opacity:1;transform:translateY(0)}}` |
| `craft-course-tab-hint-out` | `index-WxmVESBe.css` | `@keyframes craft-course-tab-hint-out{0%{opacity:1;transform:translateY(0)}to{opacity:0;transform:translateY(-3px)}}` |
| `uploadingPulse` | `index-WxmVESBe.css` | `@keyframes uploadingPulse{0%{opacity:.35;transform:scale(.95)}50%{opacity:.9;transform:scale(1.05)}to{opacity:.35;transform:scale(.95)}}` |
| `voice-bounce` | `index-WxmVESBe.css` | `@keyframes voice-bounce{0%{height:4px}to{height:15px}}` |
| `largeFileWarningFadeIn` | `index-WxmVESBe.css` | `@keyframes largeFileWarningFadeIn{0%{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:translateY(0)}}` |
| `rotate` | `index-WxmVESBe.css` | `@keyframes rotate{0%{transform:rotate(0)}to{transform:rotate(360deg)}}` |
| `dropdownEnter` | `index-WxmVESBe.css` | `@keyframes dropdownEnter{0%{opacity:0;transform:translateY(-8px) scale(.95)}to{opacity:1;transform:translateY(0) scale(1)}}` |
| `textSlideIn` | `index-WxmVESBe.css` | `@keyframes textSlideIn{0%{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}` |
| `launchNoteOverlayFadeIn` | `index-WxmVESBe.css` | `@keyframes launchNoteOverlayFadeIn{0%{opacity:0}to{opacity:1}}` |
| `launchNoteSlideIn` | `index-WxmVESBe.css` | `@keyframes launchNoteSlideIn{0%{opacity:0;transform:scale(.95) translateY(-20px)}to{opacity:1;transform:scale(1) translateY(0)}}` |
| `highlightExpand` | `index-WxmVESBe.css` | `@keyframes highlightExpand{0%{transform:scaleX(0)}to{transform:scaleX(1)}}` |
| `messageModalOverlayFadeIn` | `index-WxmVESBe.css` | `@keyframes messageModalOverlayFadeIn{0%{opacity:0}to{opacity:1}}` |
| `messageModalSlideIn` | `index-WxmVESBe.css` | `@keyframes messageModalSlideIn{0%{opacity:0;transform:scale(.95) translateY(-20px)}to{opacity:1;transform:scale(1) translateY(0)}}` |
| `authFormFadeIn` | `index-WxmVESBe.css` | `@keyframes authFormFadeIn{to{opacity:1;transform:translateY(0)}}` |
| `backdropFadeIn` | `index-WxmVESBe.css` | `@keyframes backdropFadeIn{0%{opacity:0}to{opacity:1}}` |
| `modalSlideIn` | `index-WxmVESBe.css` | `@keyframes modalSlideIn{0%{opacity:0;transform:translateY(12px) scale(.97)}to{opacity:1;transform:translateY(0) scale(1)}}` |
| `sidebarBackdropFadeIn` | `index-WxmVESBe.css` | `@keyframes sidebarBackdropFadeIn{0%{opacity:0}to{opacity:1}}` |
| `activity-board-tooltip-in` | `index-WxmVESBe.css` | `@keyframes activity-board-tooltip-in{0%{opacity:0;transform:translate(-100%,calc(-100% + 3px))}to{opacity:1;transform:translate(-100%,-100%)}}` |
| `conversationMenuFadeInRight` | `index-WxmVESBe.css` | `@keyframes conversationMenuFadeInRight{0%{opacity:0;transform:translate(-4px)}to{opacity:1;transform:translate(0)}}` |
| `conversationMenuFadeInBelow` | `index-WxmVESBe.css` | `@keyframes conversationMenuFadeInBelow{0%{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:translateY(0)}}` |
| `conversationMenuFadeInAbove` | `index-WxmVESBe.css` | `@keyframes conversationMenuFadeInAbove{0%{opacity:0;transform:translateY(4px)}to{opacity:1;transform:translateY(0)}}` |
| `auth-spin` | `index-WxmVESBe.css` | `@keyframes auth-spin{to{transform:rotate(360deg)}}` |
| `route-chunk-spin` | `index-WxmVESBe.css` | `@keyframes route-chunk-spin{to{transform:rotate(360deg)}}` |
| `skeletonCardAppear` | `knowledge_base-LJqkLtQR.css` | `@keyframes skeletonCardAppear{0%{opacity:0;transform:scale(.96)}to{opacity:1;transform:scale(1)}}` |
| `knowledge-base-drag-overlay-in` | `knowledge_base-LJqkLtQR.css` | `@keyframes knowledge-base-drag-overlay-in{0%{opacity:0}to{opacity:1}}` |
| `dropdownFadeIn` | `knowledge_base-LJqkLtQR.css` | `@keyframes dropdownFadeIn{0%{opacity:0;transform:translate(-50%,-4px)}to{opacity:1;transform:translate(-50%)}}` |
| `folderAppear` | `knowledge_base-LJqkLtQR.css` | `@keyframes folderAppear{0%{opacity:0;transform:scale(.9) translateY(-10px)}60%{transform:scale(1.02) translateY(0)}to{opacity:1;transform:scale(1) translateY(0)}}` |
| `folderMenuFadeIn` | `knowledge_base-LJqkLtQR.css` | `@keyframes folderMenuFadeIn{0%{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:translateY(0)}}` |
| `calendarSpinner` | `knowledge_base-LJqkLtQR.css` | `@keyframes calendarSpinner{to{transform:rotate(360deg)}}` |
| `fileMenuFadeIn` | `knowledge_base-LJqkLtQR.css` | `@keyframes fileMenuFadeIn{0%{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:translateY(0)}}` |
| `dash` | `percentages-BXMCSKIN-D3vNAbCB.css` | `@keyframes dash{0%{stroke-dasharray:1,300;stroke-dashoffset:0}50%{stroke-dasharray:150,300;stroke-dashoffset:-200}to{stroke-dasharray:1,300;stroke-dashoffset:-280}}` |
| `Modal__background__fade-in` | `percentages-BXMCSKIN-D3vNAbCB.css` | `@keyframes Modal__background__fade-in{0%{opacity:0}to{opacity:1}}` |
| `Modal__content_fade-in` | `percentages-BXMCSKIN-D3vNAbCB.css` | `@keyframes Modal__content_fade-in{0%{opacity:0;transform:scale(.9)}to{opacity:1;transform:scale(1)}}` |
| `library-unit__adder-animation` | `percentages-BXMCSKIN-D3vNAbCB.css` | `@keyframes library-unit__adder-animation{0%{transform:scale(.85)}50%{transform:scale(1)}to{transform:scale(.85)}}` |
| `library-unit__skeleton-opacity-animation` | `percentages-BXMCSKIN-D3vNAbCB.css` | `@keyframes library-unit__skeleton-opacity-animation{0%{opacity:0}75%{opacity:0}to{opacity:.5}}` |
| `successStatusAnimation` | `percentages-BXMCSKIN-D3vNAbCB.css` | `@keyframes successStatusAnimation{0%{transform:scale(.35)}50%{transform:scale(1.25)}to{transform:scale(1)}}` |
| `speaking-indicator-anim` | `percentages-BXMCSKIN-D3vNAbCB.css` | `@keyframes speaking-indicator-anim{0%,to{transform:scaleY(1)}50%{transform:scaleY(2)}}` |
| `fade-in` | `percentages-BXMCSKIN-D3vNAbCB.css` | `@keyframes fade-in{0%{opacity:0}to{opacity:1}}` |
| `modalCommentSpin` | `proactive--xoRayqA.css` | `@keyframes modalCommentSpin{to{transform:rotate(360deg)}}` |
| `task-detail-spinner` | `proactive--xoRayqA.css` | `@keyframes task-detail-spinner{to{transform:rotate(360deg)}}` |
| `course-cal-detail-fade` | `proactive--xoRayqA.css` | `@keyframes course-cal-detail-fade{0%{opacity:0}to{opacity:1}}` |
| `course-cal-detail-pop` | `proactive--xoRayqA.css` | `@keyframes course-cal-detail-pop{0%{opacity:0;transform:translateY(8px) scale(.98)}to{opacity:1;transform:translateY(0) scale(1)}}` |
| `course-cal-detail-spin` | `proactive--xoRayqA.css` | `@keyframes course-cal-detail-spin{to{transform:rotate(360deg)}}` |
| `sourceColumnEnter` | `proactive--xoRayqA.css` | `@keyframes sourceColumnEnter{0%{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}` |
| `commentPanelIn` | `proactive--xoRayqA.css` | `@keyframes commentPanelIn{0%{opacity:0;transform:translateY(3px) scale(.97)}to{opacity:1;transform:translateY(0) scale(1)}}` |
| `confirmSpin` | `proactive--xoRayqA.css` | `@keyframes confirmSpin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}` |
| `taskCardRemove` | `proactive--xoRayqA.css` | `@keyframes taskCardRemove{0%{opacity:1;max-height:200px;margin-bottom:0;transform:scale(1)}40%{opacity:0;transform:scale(.97)}to{opacity:0;max-height:0;margin-bottom:-10px;padding-top:0;padding-bottom:0;border-width:0;tr` |
| `sourceColumnRemove` | `proactive--xoRayqA.css` | `@keyframes sourceColumnRemove{0%{opacity:1;min-width:280px;width:280px;margin-right:0}40%{opacity:0;min-width:280px;width:280px}to{opacity:0;min-width:0;width:0;margin-right:-12px;padding:0;border-width:0}}` |
| `datePickerIn` | `proactive--xoRayqA.css` | `@keyframes datePickerIn{0%{opacity:0;transform:translateY(-4px) scale(.97)}to{opacity:1;transform:translateY(0) scale(1)}}` |
| `swipeDismiss` | `proactive--xoRayqA.css` | `@keyframes swipeDismiss{0%{transform:translate(0) rotate(0);opacity:1}to{transform:translate(120px) rotate(10deg);opacity:0}}` |
| `moveUpLayer1` | `proactive--xoRayqA.css` | `@keyframes moveUpLayer1{to{transform:translateY(0) scale(1);opacity:1;box-shadow:0 2px 8px #0000000d}}` |
| `moveUpLayer2` | `proactive--xoRayqA.css` | `@keyframes moveUpLayer2{to{transform:translateY(9px) scale(.96);opacity:.8;box-shadow:0 4px 12px #00000014}}` |
| `googleCalendarSpin` | `proactive--xoRayqA.css` | `@keyframes googleCalendarSpin{to{transform:rotate(360deg)}}` |
| `googleCalendarSuccessPop` | `proactive--xoRayqA.css` | `@keyframes googleCalendarSuccessPop{0%{transform:scale(.84);opacity:.4}to{transform:scale(1);opacity:1}}` |
| `toastSlideUp` | `proactive--xoRayqA.css` | `@keyframes toastSlideUp{0%{opacity:0;transform:translate(-50%) translateY(20px)}to{opacity:1;transform:translate(-50%) translateY(0)}}` |
| `toastFadeOut` | `proactive--xoRayqA.css` | `@keyframes toastFadeOut{0%{opacity:1}to{opacity:0}}` |
| `calendarEventAppear` | `proactive--xoRayqA.css` | `@keyframes calendarEventAppear{0%{opacity:0;transform:translateY(4px) scale(.96)}to{opacity:1;transform:translateY(0) scale(1)}}` |
| `checksFadeIn` | `signUp-BMR0PnjP.css` | `@keyframes checksFadeIn{0%{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:translateY(0)}}` |
| `modalEnter` | `signUp-BMR0PnjP.css` | `@keyframes modalEnter{0%{opacity:0;transform:translateY(8px) scale(.98)}to{opacity:1;transform:translateY(0) scale(1)}}` |
| `an-fadeIn` | `subscription-BbmfVxQw.css` | `@keyframes an-fadeIn{0%{opacity:0}to{opacity:1}}` |
| `an-slideUp` | `subscription-BbmfVxQw.css` | `@keyframes an-slideUp{0%{opacity:0;transform:translateY(20px) scale(.98)}to{opacity:1;transform:translateY(0) scale(1)}}` |
| `pc-fadeIn` | `subscription-BbmfVxQw.css` | `@keyframes pc-fadeIn{0%{opacity:0}to{opacity:1}}` |
| `pc-slideUp` | `subscription-BbmfVxQw.css` | `@keyframes pc-slideUp{0%{opacity:0;transform:translateY(20px) scale(.98)}to{opacity:1;transform:translateY(0) scale(1)}}` |
| `pc-shimmer` | `subscription-BbmfVxQw.css` | `@keyframes pc-shimmer{0%{background-position:200% 0}to{background-position:-200% 0}}` |
| `sp-fade-in` | `subscription-BbmfVxQw.css` | `@keyframes sp-fade-in{0%{opacity:0;transform:translate(-8px,-50%)}to{opacity:1;transform:translateY(-50%)}}` |
| `sp-shimmer` | `subscription-BbmfVxQw.css` | `@keyframes sp-shimmer{0%{background-position:200% 0}to{background-position:-200% 0}}` |
| `sp-spin` | `subscription-BbmfVxQw.css` | `@keyframes sp-spin{to{transform:rotate(360deg)}}` |

## Whiteboard / chat 代表性样式块

以下摘录用于复刻定位，保留原选择器与声明（每类最多 10 条）：

### `.whiteboard-root`
来源：`MessageBubble-CpHDlEfO.css`
```css
.whiteboard-root {height:100vh;width:100%;display:flex;position:relative;overflow:hidden;background:#fafafa;font-family:var( --font-satoshi, "Satoshi-Medium", "MiSans", "PingFang SC", "Microsoft YaHei", sans-serif )}
```

### `.whiteboard-root button,.whiteboard-root input,.whiteboard-root textarea,.whiteboard-root select`
来源：`MessageBubble-CpHDlEfO.css`
```css
.whiteboard-root button,.whiteboard-root input,.whiteboard-root textarea,.whiteboard-root select {font-family:inherit}
```

### `.whiteboard-sidebar`
来源：`MessageBubble-CpHDlEfO.css`
```css
.whiteboard-sidebar {height:100%;flex-shrink:0;overflow:hidden;transition:width .2s ease;display:flex;flex-direction:column;background:#fbfbfb}
```

### `.whiteboard-sidebar-inner`
来源：`MessageBubble-CpHDlEfO.css`
```css
.whiteboard-sidebar-inner {width:260px;height:100%;display:flex;flex-direction:column;padding:12px 0 0}
```

### `.whiteboard-tabs`
来源：`MessageBubble-CpHDlEfO.css`
```css
.whiteboard-tabs {display:flex;align-items:center;background:#f0f0f0;border-radius:7px;padding:2px;margin:0 auto 12px;width:-moz-fit-content;width:fit-content;gap:1px}
```

### `.whiteboard-tab`
来源：`MessageBubble-CpHDlEfO.css`
```css
.whiteboard-tab {padding:3px 20px;font-size:11px;font-weight:500;border-radius:5px;border:none;color:#909090;background:transparent;cursor:pointer;text-align:center;transition:color .15s,background .15s,box-shadow .15s}
```

### `.whiteboard-tab:hover`
来源：`MessageBubble-CpHDlEfO.css`
```css
.whiteboard-tab:hover {color:#555}
```

### `.whiteboard-tab[data-active=true]`
来源：`MessageBubble-CpHDlEfO.css`
```css
.whiteboard-tab[data-active=true] {background:#fbfbfb;color:#1a1a1a;box-shadow:0 1px 3px #0000001a}
```

### `.whiteboard-sidebar-content`
来源：`MessageBubble-CpHDlEfO.css`
```css
.whiteboard-sidebar-content {flex:1;overflow-y:auto;padding:0 16px;scrollbar-width:none;-ms-overflow-style:none}
```

### `.whiteboard-sidebar-content::-webkit-scrollbar`
来源：`MessageBubble-CpHDlEfO.css`
```css
.whiteboard-sidebar-content::-webkit-scrollbar {display:none}
```

### `body.citation-preview-open:not(.cheatsheet-fullscreen) .app-container,body.citation-preview-open:not(.cheatsheet-fullscreen) .main-content,body.citation-preview-open:not(.cheatsheet-fullscreen) .chat-response-main,body.citation-preview-open:not(.cheatsheet-fullscreen) .citation-preview-column-slot,body.citation-preview-open:not(.cheatsheet-fullscreen) .cheatsheet-preview-panel,body.citation-preview-open:not(.cheatsheet-fullscreen) .workspace--embedded,body.citation-preview-open:not(.cheatsheet-fullscreen) .workspace-embedded-body,body.citation-preview-open:not(.cheatsheet-fullscreen) .workspace-embedded-preview-only,body.citation-preview-open:not(.cheatsheet-fullscreen) .preview-scroll,body.citation-preview-open:not(.cheatsheet-fullscreen) .preview-scroll-inner,body.citation-preview-open:not(.cheatsheet-fullscreen) .preview-scale-outer,body.citation-preview-open:not(.cheatsheet-fullscreen) .preview-scale-wrap,body.citation-preview-open:not(.cheatsheet-fullscreen) .preview-pages`
来源：`ChatResponsePage-g1DJhv2j.css`
```css
body.citation-preview-open:not(.cheatsheet-fullscreen) .app-container,body.citation-preview-open:not(.cheatsheet-fullscreen) .main-content,body.citation-preview-open:not(.cheatsheet-fullscreen) .chat-response-main,body.citation-preview-open:not(.cheatsheet-fullscreen) .citation-preview-column-slot,body.citation-preview-open:not(.cheatsheet-fullscreen) .cheatsheet-preview-panel,body.citation-preview-open:not(.cheatsheet-fullscreen) .workspace--embedded,body.citation-preview-open:not(.cheatsheet-fullscreen) .workspace-embedded-body,body.citation-preview-open:not(.cheatsheet-fullscreen) .workspace-embedded-preview-only,body.citation-preview-open:not(.cheatsheet-fullscreen) .preview-scroll,body.citation-preview-open:not(.cheatsheet-fullscreen) .preview-scroll-inner,body.citation-preview-open:not(.cheatsheet-fullscreen) .preview-scale-outer,body.citation-preview-open:not(.cheatsheet-fullscreen) .preview-scale-wrap,body.citation-preview-open:not(.cheatsheet-fullscreen) .preview-pages {display:block!important;width:auto!important;height:auto!important;overflow:visible!important;transform:none!important;background:#fff!important;padding:0!important;margin:0!important;position:static!important;max-height:none!important;max-width:none!important;flex:none!important}
```

### `body.citation-preview-open:not(.cheatsheet-fullscreen) .chat-response-conversation-column,body.citation-preview-open:not(.cheatsheet-fullscreen) .workspace-embedded-toolbar,body.citation-preview-open:not(.cheatsheet-fullscreen) .workspace-embedded-markdown-view,body.citation-preview-open:not(.cheatsheet-fullscreen) .workspace-embedded-shadow-export,body.citation-preview-open:not(.cheatsheet-fullscreen) .preview-zoom-controls,body.citation-preview-open:not(.cheatsheet-fullscreen) .sidebar-floating-button,body.citation-preview-open:not(.cheatsheet-fullscreen) .app-container>*:not(.main-content)`
来源：`ChatResponsePage-g1DJhv2j.css`
```css
body.citation-preview-open:not(.cheatsheet-fullscreen) .chat-response-conversation-column,body.citation-preview-open:not(.cheatsheet-fullscreen) .workspace-embedded-toolbar,body.citation-preview-open:not(.cheatsheet-fullscreen) .workspace-embedded-markdown-view,body.citation-preview-open:not(.cheatsheet-fullscreen) .workspace-embedded-shadow-export,body.citation-preview-open:not(.cheatsheet-fullscreen) .preview-zoom-controls,body.citation-preview-open:not(.cheatsheet-fullscreen) .sidebar-floating-button,body.citation-preview-open:not(.cheatsheet-fullscreen) .app-container>*:not(.main-content) {display:none!important}
```

### `.chat-response-container .input-section .session-input-container`
来源：`ChatResponsePage-g1DJhv2j.css`
```css
.chat-response-container .input-section .session-input-container {background:none;padding-top:0;display:flex;flex-direction:column}
```

### `.chat-response-container .session-input-bar .session-input-field`
来源：`ChatResponsePage-g1DJhv2j.css`
```css
.chat-response-container .session-input-bar .session-input-field {width:100%;border:none;background:transparent;font-family:var(--font-satoshi-regular);font-size:15px;color:#333;outline:none;resize:none;min-height:32px;max-height:200px;padding-top:4px!important;padding-right:var(--session-input-padding-right, 190px)!important;padding-bottom:4px!important;padding-left:205px!important;line-height:24px;overflow-y:auto;overflow-x:hidden;box-sizing:border-box;transition:padding .2s ease}
```

### `.chat-response-container .session-input-bar.multiline .session-input-field`
来源：`ChatResponsePage-g1DJhv2j.css`
```css
.chat-response-container .session-input-bar.multiline .session-input-field {padding-left:8px!important;padding-right:8px!important}
```

### `.chat-response-container .session-input-bar .session-input-field:disabled`
来源：`ChatResponsePage-g1DJhv2j.css`
```css
.chat-response-container .session-input-bar .session-input-field:disabled {cursor:not-allowed;color:#999}
```

### `.chat-response-container .session-input-bar .session-input-field:disabled::-moz-placeholder`
来源：`ChatResponsePage-g1DJhv2j.css`
```css
.chat-response-container .session-input-bar .session-input-field:disabled::-moz-placeholder {color:#b0b0b0}
```

### `.chat-response-container .session-input-bar .session-input-field:disabled::placeholder`
来源：`ChatResponsePage-g1DJhv2j.css`
```css
.chat-response-container .session-input-bar .session-input-field:disabled::placeholder {color:#b0b0b0}
```

### `.chat-response-container .session-input-bar.with-mode-selector:not(.multiline) .session-input-field`
来源：`ChatResponsePage-g1DJhv2j.css`
```css
.chat-response-container .session-input-bar.with-mode-selector:not(.multiline) .session-input-field {padding-left:188px!important}
```

### `.chat-response-container .session-input-bar.session-input-bar--course-generation:not(.multiline) .session-input-field`
来源：`ChatResponsePage-g1DJhv2j.css`
```css
.chat-response-container .session-input-bar.session-input-bar--course-generation:not(.multiline) .session-input-field {padding-left:12px!important}
```

### `.whiteboard-chat-messages`
来源：`MessageBubble-CpHDlEfO.css`
```css
.whiteboard-chat-messages {flex:1;min-height:0;overflow-y:auto;overflow-x:hidden;padding:14px 14px 14px 18px;display:flex;flex-direction:column;gap:4px;scrollbar-width:thin;scrollbar-color:#E5E5E5 transparent}
```

### `.whiteboard-chat-messages::-webkit-scrollbar`
来源：`MessageBubble-CpHDlEfO.css`
```css
.whiteboard-chat-messages::-webkit-scrollbar {width:4px}
```

### `.whiteboard-chat-messages::-webkit-scrollbar-track`
来源：`MessageBubble-CpHDlEfO.css`
```css
.whiteboard-chat-messages::-webkit-scrollbar-track {background:transparent}
```

### `.whiteboard-chat-messages::-webkit-scrollbar-thumb`
来源：`MessageBubble-CpHDlEfO.css`
```css
.whiteboard-chat-messages::-webkit-scrollbar-thumb {background:#e5e5e5;border-radius:999px}
```

### `.canvas-success-message`
来源：`index-WxmVESBe.css`
```css
.canvas-success-message {font-family:var(--font-satoshi-medium);font-size:18px;font-weight:500;color:#4b5563;margin:0 0 12px;line-height:1.4}
```

### `.canvas-success-submessage`
来源：`index-WxmVESBe.css`
```css
.canvas-success-submessage {font-family:var(--font-satoshi-regular);font-size:16px;font-weight:400;color:#6b7280;margin:0 0 16px;line-height:1.5}
```

### `.message-modal-overlay`
来源：`index-WxmVESBe.css`
```css
.message-modal-overlay {position:fixed;top:0;left:0;right:0;bottom:0;background:#0000001a;-webkit-backdrop-filter:blur(3px);backdrop-filter:blur(3px);display:flex;align-items:center;justify-content:center;z-index:2000;padding:20px;animation:messageModalOverlayFadeIn .2s ease-out}
```

### `.message-modal-content`
来源：`index-WxmVESBe.css`
```css
.message-modal-content {background:#fff;border-radius:16px;box-shadow:0 5px 30px #00000026;max-width:540px;width:100%;max-height:80vh;overflow:hidden;position:relative;animation:messageModalSlideIn .3s ease-out}
```

### `.message-modal-body`
来源：`index-WxmVESBe.css`
```css
.message-modal-body {display:flex;align-items:center;gap:18px;padding:20px 24px;font-family:var(--font-satoshi-regular);font-size:15px;color:#333;line-height:1.6;cursor:pointer}
```

### `.message-modal-text`
来源：`index-WxmVESBe.css`
```css
.message-modal-text {flex:1;min-width:0}
```

### `body.cheatsheet-fullscreen .sidebar-floating-button`
来源：`ChatResponsePage-g1DJhv2j.css`
```css
body.cheatsheet-fullscreen .sidebar-floating-button {display:none!important}
```

### `body.citation-preview-open:not(.cheatsheet-fullscreen) .chat-response-conversation-column,body.citation-preview-open:not(.cheatsheet-fullscreen) .workspace-embedded-toolbar,body.citation-preview-open:not(.cheatsheet-fullscreen) .workspace-embedded-markdown-view,body.citation-preview-open:not(.cheatsheet-fullscreen) .workspace-embedded-shadow-export,body.citation-preview-open:not(.cheatsheet-fullscreen) .preview-zoom-controls,body.citation-preview-open:not(.cheatsheet-fullscreen) .sidebar-floating-button,body.citation-preview-open:not(.cheatsheet-fullscreen) .app-container>*:not(.main-content)`
来源：`ChatResponsePage-g1DJhv2j.css`
```css
body.citation-preview-open:not(.cheatsheet-fullscreen) .chat-response-conversation-column,body.citation-preview-open:not(.cheatsheet-fullscreen) .workspace-embedded-toolbar,body.citation-preview-open:not(.cheatsheet-fullscreen) .workspace-embedded-markdown-view,body.citation-preview-open:not(.cheatsheet-fullscreen) .workspace-embedded-shadow-export,body.citation-preview-open:not(.cheatsheet-fullscreen) .preview-zoom-controls,body.citation-preview-open:not(.cheatsheet-fullscreen) .sidebar-floating-button,body.citation-preview-open:not(.cheatsheet-fullscreen) .app-container>*:not(.main-content) {display:none!important}
```

### `.orbie-suggestion-box.sidebar-expanded`
来源：`ChatResponsePage-g1DJhv2j.css`
```css
.orbie-suggestion-box.sidebar-expanded {width:15vw;max-width:200px}
```

### `.input-banner-stack .quota-reminder-container,.input-banner-stack .quota-reminder-container.sidebar-expanded,.input-banner-stack .rate-limit-notice-container`
来源：`ChatResponsePage-g1DJhv2j.css`
```css
.input-banner-stack .quota-reminder-container,.input-banner-stack .quota-reminder-container.sidebar-expanded,.input-banner-stack .rate-limit-notice-container {position:relative!important;top:auto!important;right:auto!important;max-width:100%;width:100%;margin:0;box-sizing:border-box}
```

### `body.course-blueprint-fullscreen .sidebar-floating-button`
来源：`CourseStructureMap-CKhXQdEk.css`
```css
body.course-blueprint-fullscreen .sidebar-floating-button {display:none!important}
```

### `.whiteboard-sidebar`
来源：`MessageBubble-CpHDlEfO.css`
```css
.whiteboard-sidebar {height:100%;flex-shrink:0;overflow:hidden;transition:width .2s ease;display:flex;flex-direction:column;background:#fbfbfb}
```

### `.whiteboard-sidebar-inner`
来源：`MessageBubble-CpHDlEfO.css`
```css
.whiteboard-sidebar-inner {width:260px;height:100%;display:flex;flex-direction:column;padding:12px 0 0}
```

### `.whiteboard-sidebar-content`
来源：`MessageBubble-CpHDlEfO.css`
```css
.whiteboard-sidebar-content {flex:1;overflow-y:auto;padding:0 16px;scrollbar-width:none;-ms-overflow-style:none}
```

### `.whiteboard-sidebar-content::-webkit-scrollbar`
来源：`MessageBubble-CpHDlEfO.css`
```css
.whiteboard-sidebar-content::-webkit-scrollbar {display:none}
```

### `.whiteboard-sidebar-open-btn`
来源：`MessageBubble-CpHDlEfO.css`
```css
.whiteboard-sidebar-open-btn {position:absolute;top:16px;left:16px;z-index:30;padding:8px;border-radius:8px;background:#fffc;-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);border:1px solid #e5e5e5;box-shadow:0 1px 4px #00000014;color:#737373;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .15s,color .15s}
```

### `.whiteboard-root`
来源：`MessageBubble-CpHDlEfO.css`
```css
.whiteboard-root {height:100vh;width:100%;display:flex;position:relative;overflow:hidden;background:#fafafa;font-family:var( --font-satoshi, "Satoshi-Medium", "MiSans", "PingFang SC", "Microsoft YaHei", sans-serif )}
```

### `.whiteboard-root button,.whiteboard-root input,.whiteboard-root textarea,.whiteboard-root select`
来源：`MessageBubble-CpHDlEfO.css`
```css
.whiteboard-root button,.whiteboard-root input,.whiteboard-root textarea,.whiteboard-root select {font-family:inherit}
```

### `.whiteboard-sidebar`
来源：`MessageBubble-CpHDlEfO.css`
```css
.whiteboard-sidebar {height:100%;flex-shrink:0;overflow:hidden;transition:width .2s ease;display:flex;flex-direction:column;background:#fbfbfb}
```

### `.whiteboard-sidebar-inner`
来源：`MessageBubble-CpHDlEfO.css`
```css
.whiteboard-sidebar-inner {width:260px;height:100%;display:flex;flex-direction:column;padding:12px 0 0}
```

### `.whiteboard-tabs`
来源：`MessageBubble-CpHDlEfO.css`
```css
.whiteboard-tabs {display:flex;align-items:center;background:#f0f0f0;border-radius:7px;padding:2px;margin:0 auto 12px;width:-moz-fit-content;width:fit-content;gap:1px}
```

### `.whiteboard-tab`
来源：`MessageBubble-CpHDlEfO.css`
```css
.whiteboard-tab {padding:3px 20px;font-size:11px;font-weight:500;border-radius:5px;border:none;color:#909090;background:transparent;cursor:pointer;text-align:center;transition:color .15s,background .15s,box-shadow .15s}
```

### `.whiteboard-tab:hover`
来源：`MessageBubble-CpHDlEfO.css`
```css
.whiteboard-tab:hover {color:#555}
```

### `.whiteboard-tab[data-active=true]`
来源：`MessageBubble-CpHDlEfO.css`
```css
.whiteboard-tab[data-active=true] {background:#fbfbfb;color:#1a1a1a;box-shadow:0 1px 3px #0000001a}
```

### `.whiteboard-sidebar-content`
来源：`MessageBubble-CpHDlEfO.css`
```css
.whiteboard-sidebar-content {flex:1;overflow-y:auto;padding:0 16px;scrollbar-width:none;-ms-overflow-style:none}
```

### `.whiteboard-sidebar-content::-webkit-scrollbar`
来源：`MessageBubble-CpHDlEfO.css`
```css
.whiteboard-sidebar-content::-webkit-scrollbar {display:none}
```

### `.canvas-update-card`
来源：`CourseJourneyPage-DS2SI7dn.css`
```css
.canvas-update-card {display:flex;flex-direction:column;justify-content:center;gap:10px;flex:0 0 300px;max-width:300px;box-sizing:border-box;padding:14px 16px;border:1px solid #EEEFF1;border-radius:14px;background:#fff;transition:box-shadow .22s ease,transform .22s ease,border-color .22s ease;animation:extend-palette-in .22s cubic-bezier(.16,1,.3,1) both}
```

### `.canvas-update-card:hover`
来源：`CourseJourneyPage-DS2SI7dn.css`
```css
.canvas-update-card:hover {border-color:#dce3ee;box-shadow:0 10px 26px #0f172a12;transform:translateY(-1px)}
```

### `.canvas-update-card-head`
来源：`CourseJourneyPage-DS2SI7dn.css`
```css
.canvas-update-card-head {display:flex;align-items:center;gap:10px}
```

### `.canvas-update-card-icon`
来源：`CourseJourneyPage-DS2SI7dn.css`
```css
.canvas-update-card-icon {flex:none;display:inline-flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:9px;background:#fbeac7;color:#b45309}
```

### `.canvas-update-card-copy`
来源：`CourseJourneyPage-DS2SI7dn.css`
```css
.canvas-update-card-copy {display:flex;flex-direction:column;gap:2px;min-width:0}
```

### `.canvas-update-card-title`
来源：`CourseJourneyPage-DS2SI7dn.css`
```css
.canvas-update-card-title {color:#1f2937;font-family:var(--font-satoshi-medium);font-size:13px;line-height:1.3}
```

### `.canvas-update-card-sub`
来源：`CourseJourneyPage-DS2SI7dn.css`
```css
.canvas-update-card-sub {color:#8a93a2;font-family:var(--font-satoshi-regular);font-size:11.5px;line-height:1.4}
```

### `.canvas-update-card-actions`
来源：`CourseJourneyPage-DS2SI7dn.css`
```css
.canvas-update-card-actions {display:flex;gap:6px}
```

### `.canvas-update-card-btn`
来源：`CourseJourneyPage-DS2SI7dn.css`
```css
.canvas-update-card-btn {flex:1;padding:6px 8px;border:1px solid transparent;border-radius:8px;background:#f5f6f9;color:#4c5563;font-family:var(--font-satoshi-medium);font-size:11.5px;line-height:1.2;cursor:pointer;transition:background .12s ease,color .12s ease,border-color .12s ease}
```

### `.canvas-update-card-btn:hover:not(:disabled)`
来源：`CourseJourneyPage-DS2SI7dn.css`
```css
.canvas-update-card-btn:hover:not(:disabled) {background:#ebedf1;color:#1f2937}
```


## 图标清单

静态图标主要是 `/components/**` 与 `/pages/**` 下的 SVG；完整逐项 URL、下载状态与大小见 `assets/img/_asset_fetch_log.json` 和 `assets/ASSET_INDEX.md`。JS bundle 还使用 lucide-react（例如 arrow-right-to-line、baseline、bold、eye、brain、scissors、trash-2），这些是内联 SVG，不对应独立文件。

## 页面—组件—CSS 映射

| CSS 文件 | 页面/组件线索 |
|---|---|
| `AccountDeletedPage-DpG5Svji.css` | `AccountDeletedPage` 页面或组件样式块（按 Vite chunk 名称命名） |
| `AuthCallBack-DyVAuML9.css` | `AuthCallBack` 页面或组件样式块（按 Vite chunk 名称命名） |
| `BugReportModal-Di91AIA7.css` | `BugReportModal` 页面或组件样式块（按 Vite chunk 名称命名） |
| `ChatResponsePage-g1DJhv2j.css` | `ChatResponsePage` 页面或组件样式块（按 Vite chunk 名称命名） |
| `ConversationSkeletonLoader-DqTNHfmi.css` | `ConversationSkeletonLoader` 页面或组件样式块（按 Vite chunk 名称命名） |
| `CouponCodePage-Es9McX16.css` | `CouponCodePage` 页面或组件样式块（按 Vite chunk 名称命名） |
| `CourseFeedbackEntry-BB5to-b7.css` | `CourseFeedbackEntry` 页面或组件样式块（按 Vite chunk 名称命名） |
| `CourseGenerationLogPage-BAy3RMtT.css` | `CourseGenerationLogPage` 页面或组件样式块（按 Vite chunk 名称命名） |
| `CourseJourneyPage-DS2SI7dn.css` | `CourseJourneyPage` 页面或组件样式块（按 Vite chunk 名称命名） |
| `CourseRatingBar-0PDoG8FU.css` | `CourseRatingBar` 页面或组件样式块（按 Vite chunk 名称命名） |
| `CourseShareModal-BUmCT5gt.css` | `CourseShareModal` 页面或组件样式块（按 Vite chunk 名称命名） |
| `CourseStructureMap-CKhXQdEk.css` | `CourseStructureMap` 页面或组件样式块（按 Vite chunk 名称命名） |
| `CoursesPage-BHBf4j-Q.css` | `CoursesPage` 页面或组件样式块（按 Vite chunk 名称命名） |
| `DeepLearnSessionOutline-vDd7je6H.css` | `DeepLearnSessionOutline` 页面或组件样式块（按 Vite chunk 名称命名） |
| `ExamPage-DwPj_DPZ.css` | `ExamPage` 页面或组件样式块（按 Vite chunk 名称命名） |
| `InboxMessagePage-CVFBOOa4.css` | `InboxMessagePage` 页面或组件样式块（按 Vite chunk 名称命名） |
| `InboxPage-B9UvWtkP.css` | `InboxPage` 页面或组件样式块（按 Vite chunk 名称命名） |
| `MarketplacePage-uZ6gfnr0.css` | `MarketplacePage` 页面或组件样式块（按 Vite chunk 名称命名） |
| `MessageBubble-CpHDlEfO.css` | `MessageBubble` 页面或组件样式块（按 Vite chunk 名称命名） |
| `Onboarding-5TPEhD7Z.css` | `Onboarding` 页面或组件样式块（按 Vite chunk 名称命名） |
| `PracticePage-Cl2nBTMu.css` | `PracticePage` 页面或组件样式块（按 Vite chunk 名称命名） |
| `PracticeStars-SB0hDemQ.css` | `PracticeStars` 页面或组件样式块（按 Vite chunk 名称命名） |
| `PreparingModal-Cm4LEKXk.css` | `PreparingModal` 页面或组件样式块（按 Vite chunk 名称命名） |
| `ProSuccessCelebration-CLzf8p0E.css` | `ProSuccessCelebration` 页面或组件样式块（按 Vite chunk 名称命名） |
| `ProSuccessPage-DTrU8X0O.css` | `ProSuccessPage` 页面或组件样式块（按 Vite chunk 名称命名） |
| `ProjectStagePage-DR9S21VM.css` | `ProjectStagePage` 页面或组件样式块（按 Vite chunk 名称命名） |
| `SampleMindmapResponse-DxgLBHmB.css` | `SampleMindmapResponse` 页面或组件样式块（按 Vite chunk 名称命名） |
| `SharedConversationPage-CFBxhGpI.css` | `SharedConversationPage` 页面或组件样式块（按 Vite chunk 名称命名） |
| `SplitLayout-DnssbUW2.css` | `SplitLayout` 页面或组件样式块（按 Vite chunk 名称命名） |
| `StripePaymentValidation-BenvS8TF.css` | `StripePaymentValidation` 页面或组件样式块（按 Vite chunk 名称命名） |
| `StudyHistoryPage-CCJ2gWmH.css` | `StudyHistoryPage` 页面或组件样式块（按 Vite chunk 名称命名） |
| `TextLayer-mfpS1UYU.css` | `TextLayer` 页面或组件样式块（按 Vite chunk 名称命名） |
| `TextSelectionPopup-Bb5ulKv7.css` | `TextSelectionPopup` 页面或组件样式块（按 Vite chunk 名称命名） |
| `VoiceModeModal-CXrhe9tg.css` | `VoiceModeModal` 页面或组件样式块（按 Vite chunk 名称命名） |
| `VoiceSettingsModal-CImIZ80P.css` | `VoiceSettingsModal` 页面或组件样式块（按 Vite chunk 名称命名） |
| `WelcomeBackPage-CdAN3E5s.css` | `WelcomeBackPage` 页面或组件样式块（按 Vite chunk 名称命名） |
| `checkbox-DiTk-hbC.css` | `checkbox` 页面或组件样式块（按 Vite chunk 名称命名） |
| `deepLearnSession-BQzBOo0h.css` | `deepLearnSession` 页面或组件样式块（按 Vite chunk 名称命名） |
| `emailSubscriptionPage-CuhD4aRw.css` | `emailSubscriptionPage` 页面或组件样式块（按 Vite chunk 名称命名） |
| `forgotPassword-BHqD2hJg.css` | `forgotPassword` 页面或组件样式块（按 Vite chunk 名称命名） |
| `github-BfC0goYb.css` | `github` 页面或组件样式块（按 Vite chunk 名称命名） |
| `historyConversationDataParser-BnegVg7M.css` | `historyConversationDataParser` 页面或组件样式块（按 Vite chunk 名称命名） |
| `index-WxmVESBe.css` | `index` 页面或组件样式块（按 Vite chunk 名称命名） |
| `knowledge_base-LJqkLtQR.css` | `knowledge_base` 页面或组件样式块（按 Vite chunk 名称命名） |
| `percentages-BXMCSKIN-D3vNAbCB.css` | `percentages` 页面或组件样式块（按 Vite chunk 名称命名） |
| `proactive--xoRayqA.css` | `proactive` 页面或组件样式块（按 Vite chunk 名称命名） |
| `resetPassword-Cy3fLeqM.css` | `resetPassword` 页面或组件样式块（按 Vite chunk 名称命名） |
| `signUp-BMR0PnjP.css` | `signUp` 页面或组件样式块（按 Vite chunk 名称命名） |
| `subscription-BbmfVxQw.css` | `subscription` 页面或组件样式块（按 Vite chunk 名称命名） |

## 提取限制

- 首页匿名静态请求偶发 403；使用标准 Chrome User-Agent 保存了 `assets/index.html`（4,790 bytes）。
- 资产下载只保留小于 200 KB 的图像；超限项及 HEAD/GET 状态记录在 `assets/img/_asset_fetch_log.json`。
- MiSans CSS 体积较大（分片规则），仅保存 CSS，不下载字体二进制；字体 CSS 中的 URL/格式已解析。