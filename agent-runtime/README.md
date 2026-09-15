# agent-runtime — betterknow 的 Agent 核心（DeepSeek Harness runtime）

从**上游 npm** 安装的 DeepSeek Harness 运行时，项目内独立 `DSH_HOME`，与本机 `~/.dsh` 完全隔离。
只取 runtime（launcher + 核心 bundle + 一次性 runner），不用其 Web/Desktop 产品层；其余能力按需选用、自研成插件挂上去。

## 装了什么（2026-09-14）

| 包 | 版本 | 作用 |
|---|---|---|
| `@deepseek-ai/dsh` | 0.1.5-rc.2 | launcher：profile 组合（插件层叠 + patch）、`dsh plugin` 插件管理 |
| `@deepseek-ai/dsh-base` | 0.1.5-rc.2 | 核心 bundle：llm / session / agent / tools(bash,fs,web) / skill / subagent / workflow / goal / plan-mode / compaction / permission+sandbox |
| `@deepseek-ai/dsh-headless` | 0.1.5-rc.2 | 一次性 runner：直接跑 Agent/Session，无 Host/HTTP/浏览器层 |

- 必须用 **`next` 线（0.1.5-rc.2）**：`latest` 标签指向 0.0.1-rc.1，其 `dsh-base` 依赖从未发布的 `@deepseek-ai/dsh-bash-env`，npm 404 装不上。
- 传递依赖共 241 个 `@deepseek-ai/*` 包（含 `dsh-web-frontend`，仅作为 launcher 依赖存在，本项目不使用）。
- 原生模块 `node-pty` / `koffi` / `dsh-subprocess-local` 的安装脚本已 approve 并 rebuild（bash 工具的 PTY 依赖）。
- Node ≥ 24（本机 v26.7）。

## 布局

```
agent-runtime/
├── package.json            # 依赖 + npm scripts
├── node_modules/           # 上游 runtime（不提交）
├── home/                   # 独立 DSH_HOME（sessions / 凭据 / 设置都落这里）
│   └── profiles/betterknow/
│       ├── package.json    # dsh.profile.bundles = [dsh-base, dsh-headless]；自研插件加到 dependencies
│       ├── cordis.yml      # 组合根（勿改）
│       └── cordis.patch.yml# 我们的 patch 层：按 id 覆盖配置 / 禁用 / 插入插件
└── bin/bk-agent            # 包装脚本：固定 DSH_HOME 后调 dsh
```

## 启动

```bash
cd agent-runtime
./bin/bk-agent "解释一下贝叶斯定理"            # 一次性任务：推理流到 stderr，最终答复到 stdout
./bin/bk-agent --dump-config                    # 打印组合后的完整插件树
npm run run:betterknow -- "任务文本"            # 等价
```

## 运行时插件栈（组合后）

`dsh-base`：timer · llm · deepseek-llm-api-extensions · session(+jsonl 持久化, sqlite 查询, projection) · typert(registry/loader/api-gateway) · session-title · user-questions · **agent** · agent-default-model(deepseek-official/deepseek-flash) · jobs · llm-retry · settings-file · credentials-local · llm-pi-ai · attachment · storage(json/domain) · telemetry-otel · subprocess · sandbox(+policy, bash/pwsh) · approval · permission · shell-env · tool-bash/pwsh/jobs · fs-observation-policy · tool-fs(+search) · agent-instructions · skill(+filesystem, badge, tool) · commands · goal(+round-driver, command) · plan-mode · token-meter · compaction · subagent(spawn/fork in-process, tools) · workflow-worker-thread · tool-workflow · timeout-policy · spill · checkpoint-policy · tool-result-pruner · tool-todo/goal/ralph · web · web-search-deepseek · web-fetch-http · tool-web · agent-loop · fs-sandbox · llm-deepseek
`dsh-headless`：tools · system-prompt · code-runtime-worker-thread · headless-startup · headless-runner

## 扩展方式（自研部分挂这里）

1. **patch 层** `home/profiles/betterknow/cordis.patch.yml`：YAML 数组，按插件 `id` 覆盖 config、`disabled: true` 关掉不要的层、插入自研插件条目（支持 `!!js` 表达式）。
2. **自研插件**：写成 Cordis 插件包（可本地路径），`cd agent-runtime && DSH_HOME=./home npx dsh plugin --profile betterknow add <包名或路径>`，再在 patch 里插入并配置。
3. 计划中的 betterknow 插件（对应 hyperknow 功能面）：`course-generation`（研究→大纲→问卷→生成 6 相位）、`whiteboard-teach`（板面/讲稿/TTS 帧）、`deep-learn`、`materials`（速查表/quiz/闪卡）、`plan-calendar`、`kb-drive`（search_files/read_files）。提示词优先从 `../reference/assets/prompts/` 与 `../hyperclone/seed/prompts/` 还原。

## Key 接入位置（后续补齐）

| Key | 落点 |
|---|---|
| LLM | `credentials-local` → `home/.credentials.yaml`；默认 provider `deepseek-official`。接 OpenAI 兼容网关时在 patch 里覆盖 `agent-default-model` 与 `llm-pi-ai` 的 provider/baseUrl |
| Search | `web-search-deepseek` 插件 config（patch 覆盖），或换自研 search 插件 |
| TTS / 生图 generate | 不在 dsh 内，作为自研插件/后端服务（hyperclone `server/src/config.ts` 的 `providers.{tts,stt,search,image}` 扩展位）|

## 与后端的关系

hyperclone 后端（Fastify）当前自带一套 agentLoop（`server/src/ws.ts`）。落地路线：后端保留协议/持久化/REST+WS 面，把「思考→工具→内容」的 agent 执行交给本运行时（先以 headless 子进程调用，稳定后改用 dsh SDK 内嵌）。
