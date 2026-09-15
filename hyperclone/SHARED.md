# hyperclone 共享契约（Builders 必读）

## 目标
本地完整复刻 hyperknow 服务：React SPA + Node 后端 + 3 条 WS 通道，全程 BYOK。默认 LLM = Kimi（Moonshot OpenAI 兼容端点），禁止写死 GPT 专属逻辑。

## 技术基线
- server: Node 20+, Fastify 5 + @fastify/websocket + JSON 文件持久化（var/data/*.json，免依赖 SQLite 编译）
- web: Vite 6 + React 18 + TS（jsx 转 JSX 用 React.createElement 保持兼容简单）；白板画布用 @excalidraw/excalidraw 包
- 端口：server 8787（API wss 同端口），web 5173（dev proxy 到 8787）；生产 web build 由 server 静态托管
- i18n: 直接用 ../assets/i18n/en.json + zh-CN.json（拷贝进 web/src/i18n/）

## BYOK 配置（server/src/config.ts 固定形状）
```ts
export interface ByokConfig {
  provider: 'kimi' | 'openai-compatible' | 'stub';
  apiKey: string;            // KIMI_API_KEY / OPENAI_API_KEY env
  baseUrl: string;           // 默认 https://api.moonshot.cn/v1
  models: { director: string; content: string; quiz: string; tts?: string };
  // 默认 director=kimi-k2-turbo-preview 级别占位；KIMI_DIRECTOR_MODEL 等 env 可覆盖
}
```
env: BYOK_PROVIDER, KIMI_API_KEY, KIMI_BASE_URL, KIMI_DIRECTOR_MODEL, KIMI_CONTENT_MODEL, KIMI_QUIZ_MODEL
无 key 时 provider='stub'：所有 LLM 调用走固定种子应答（仓库内 stubdata/*.json 闭环 play），用于离线冒烟。

## 协议
一切以 hyperclone/spec/PROTOCOL.md 为帧-shape 事实源；REST 以 evidence/api_endpoints*.md + extra_endpoints.json 为准（可实现子集，以「核心闭环」优先：auth、user_info、limits、conversations、ws 对话、白板、课程生成、deep_learn、drive 上传、share_record 公开读、diagram 公开取、files 公开取、marketplace、calendar pending/approve、memory 系列、stripe/plans mock、orbie/invite/affiliate mock 返回）。

## 目录约定
hyperclone/
  spec/PROTOCOL.md（只读）
  server/  （西雅图的 owned: HCI-Server agent）
  web/     （HCI-Web agent）
  seed/    （HCI-Seed agent；含 marketplace 33 课镜像、prompts 拷贝）
  README.md（HCI-Seed 主笔）

## 收口验收（Verify 由主 agent 完成）
- bun/npm install 全绿；server 起 8787；web build 产出 dist；npm run dev / start 文档可复现。
