# 白板插图生成模板（抓包实证）

来源：线上账号 `test123321@hyperknow.com` 的白板会话 `b6a11f959ff744abbfaf9a07dcea5639`（勾股定理课堂）。
证据：`reference/evidence/live_2026-09-15b/r19_whiteboard_image_prompt.jsonl`（`session_ready.messages[]`，服务端持久化的动作原文）；帧级证据 `reference/evidence/tool_frames/deep_whiteboard_*.json`。
说明：这条链路是从**线上会话消息与帧**里逆向出来的，不采信模型自述。

## 1. 动作契约（教师侧产出）

```json
{"type": "image_generation", "prompt": "<图形定性>：<几何元素与位置>。<标注规则>。<背景与配色>。<风格尾缀>", "language": "Chinese|English", "caption": "<短名词短语>"}
```

- `prompt` 自足可画：图形类型 + 元素位置 + 标注（字母/中文名/单位）+ 颜色与背景 + 风格尾缀；禁止阴影、复杂背景、无关装饰。
- `language` 跟随 UI 语言；`caption` 是短名词短语，用于图注与无障碍标签。
- 该动作**不一定包在 `group` 里**，可直接作为独立帧出现（与 `group`、`highlight`、`circle`、`keypoint_complete`、`new_page`、`new_column` 并列）。

## 2. 服务端 → 客户端帧

| 帧 | 字段 | 语义 |
|---|---|---|
| `image_gen_pending` | `step_id, placement_step_id?, prompt_preview, caption, page_id, source?, reference_name?, page_index?` | 开始生成；`prompt_preview` 是 prompt 前 117 字符 + `...`（总长 120）；`source:"reference_page"` 表示截取课件页而非生成 |
| `generated_image` | `image_url, width, height, caption, step_id, page_id, source?, reference_name?, page_index?` | 完成；线上实测 `width=height=512`，`image_url=/api/v1/whiteboard/images/<32hex>.png` |
| `image_gen_failed` | （客户端已处理的失败态） | 生成失败，占位图转为失败样式 |

客户端把结果落成 overlay：`{kind:"board_image", x,y,w,h, columnIndex, boardImage:{imageUrl,width,height,caption,pending}}`；占位槽位固定 `512×512`（前端 `$r("",512,512,{pending:true,pendingStepId,caption})`）。
图片路由**无鉴权**（与 `diagram/*`、`files/*` 同一公开制品面）。

## 3. 线上原始样例（中文，逐字）

1. 直角三角形结构
```json
{"type":"image_generation","prompt":"一个简洁的几何示意图：一个直角三角形，直角位于左下方。水平边标注为 'a' 和 '勾'，垂直边标注为 'b' 和 '股'，斜边标注为 'c' 和 '弦'。直角处有一个清晰的小方块标记。白色背景，专业教科书风格。","language":"Chinese","caption":"直角三角形的组成"}
```
2. 面积直观
```json
{"type":"image_generation","prompt":"一个直角三角形，三条边外侧分别画着三个正方形。直角边 a 上的正方形面积标注为 a²，直角边 b 上的正方形面积标注为 b²，斜边 c 上的正方形面积标注为 c²。三个正方形颜色各异，背景洁净。","language":"Chinese","caption":"勾股定理的面积直观表示"}
```
3. 赵爽弦图
```json
{"type":"image_generation","prompt":"中国古代“赵爽弦图”风格：四个全等的直角三角形（直角边 a, b，斜边 c）围成一个大正方形，中心留下一个边长为 c 的小正方形。线条清晰，带有 a, b, c 的标注。","language":"Chinese","caption":"赵爽弦图：面积法证明"}
```

## 4. 英文样例（`prompt_preview` 实证，截断于 117 字符）

```
A clean, academic-style scatterplot on a coordinate plane. The X-axis is labeled 'Study Hours' and the Y-axis is labe...
```

英文同构：`A clean, academic-style <图型> …` 起手，逐项给轴/元素/标注，收尾给风格与背景约束。

## 5. 同一内容模型在聊天侧的同族提示词（`inline_diagram.source_tag` 实证）

聊天侧生成物（`gemini-image` / `mermaid`）把内部提示词原文透出在 `source_tag` 里，形状：

```
<content-type: diagram; diagram-subtype: gemini-image; content-prompt: {A clear diagram of a right-angled triangle. The right angle is marked with a small square. The two shorter sides ... are labeled 'a' and 'b'. The longest diagonal side is labeled 'c' and identified as the hypotenuse.}; caption: {Anatomy of a Right Triangle}>
```

可复用的英文措辞（来自 14 条实测样本）：

- `A clear diagram of …`、`A clean, academic-style …`、`A 2D coordinate grid being stretched diagonally …`
- 标注写死：`labeled 'a' and 'b'`、`the large square on the hypotenuse is labeled c squared`
- 颜色写死：`shaded in blue and red`、`distinct colors for each square`
- 风格尾缀：`in a traditional ink wash painting style`、`textbook illustration style`

## 6. 本仓实现（自部署 · BYOK）

- 教师动作 → `src/whiteboardImage.ts::normalizeImageAction()`；缺 `prompt` 时按 §1 骨架用 `buildImagePrompt()` 兜底。
- 生成 → `src/providers/index.ts::image.generate(prompt,{size:'512x512'})`（OpenAI 兼容 `/images/generations`，支持 `b64_json` 与 `url` 两种返回）；未配置图像模型时落 512×512 SVG 占位（带 caption 与提示文案），仍走同样的 `image_gen_pending → generated_image` 帧序。
- 落盘 → `src/media.ts`：内容寻址文件名 `<hash32>.png`，目录 `var/data/whiteboard/images/`；路由 `GET /api/v1/whiteboard/images/:file`（公开）。
