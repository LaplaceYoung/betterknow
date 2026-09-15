# betterknow

复刻并提升 hyperknow.io 的项目仓。本目录由本机两处既有基础去重整合而来（2026-09-14）。

## 布局

```
betterknow/
├── hyperclone/            # 忠实复刻版 —— 完整后端 + 协议规格 + 种子数据
│   ├── server/            # Fastify + TS 后端（REST /api/v1/* + 3 条 WS 通道，BYOK，JSON 持久化）
│   │   ├── src/           # rest.ts / ws.ts / pipelines.ts / sandbox.ts / cron.ts …
│   │   ├── seed/marketplace-full/   # 33 门课程 51MB 内容（后端运行依赖，勿删）
│   │   ├── scripts/  stubdata/  var/  package*.json  tsconfig.json
│   ├── seed/              # 提示词、skills/tools 注册表、onboarding 问卷、trends 样本
│   ├── spec/              # PROTOCOL.md / FEATURES_MATRIX.md / PAGE_CONTRACTS.md / pages/
│   ├── recovered/         # 82 个原站 chunk 的反编译可读版 + decompile_report.json
│   └── verify_*.png       # 复刻与原站的对比验证截图（41 张）
│
├── anyknow/               # simo-know —— 同信息架构的黑板风替代实现（纯 .mjs，无构建）
│   ├── src/domain/        # 课程图、进度、学分、LMS、计划等纯函数域逻辑
│   ├── src/agent/         # Mastra 风格 Agent/Tool/Workflow 运行时
│   ├── src/server/        # HTTP API（heuristic / media / tts / store / seed）
│   ├── tests/  fixtures/  data/     # 域测试、测试素材、示例 store.json
│   └── shots/             # 粉笔板 UI 的验证截图与元数据（75 个 png/json）
│
├── app/                   # 新前端 replica（React+TS+Vite+Tailwind+shadcn，44 路由；npm run build → dist 由后端托管）
├── out/                   # 复刻合同：plan.md / verify.jsonl / report.md / shots / motion / assets.jsonl
├── agent-runtime/         # Agent 核心：上游 DeepSeek Harness runtime（dsh 0.1.5-rc.2, next 线）
│   ├── home/profiles/betterknow/   # 项目内独立 DSH_HOME + profile（dsh-base + dsh-headless）
│   ├── bin/bk-agent       # 入口：bk-agent "任务" / --dump-config / plugin add <自研插件>
│   └── README.md          # 装法、插件栈、扩展点、key 落点
│
├── recordings/            # 原站走查录屏（video2code 复刻的事实源）：hyperknow-walk{,-b,-d}.mp4 等
│
└── reference/             # 逆向 hyperknow.io 得到的原始材料（仅参考，勿改动语义）
    ├── evidence/          # 92 项 API/WS/页面侦察证据（JSON trace、recon 笔记）
    ├── docs/              # AGENT_ARCHITECTURE / ARCHITECTURE / CANVAS_CONNECTOR 等 6 篇
    ├── assets/            # 原站抓取素材：img/ fonts/ css/ i18n/ screenshots/ prompts/
    ├── js_bundles/        # 125 个原站生产 chunk 原始件
    └── .last_account      # 侦察用测试账号（勿外传、勿提交公开仓库）
```

## 去重与未搬迁说明

- **前端一律未搬**（需要重新设计）：
  - `hyperclone/web/`（自写 React+Vite 前端）与 `hyperclone/server/public/`（原站生产镜像 113MB）仍在原位 `~/Desktop/reverse/hyperknow/hyperclone/`；
  - `anyknow/src/web/`（黑板 SPA）仍在原位 `~/Desktop/anyknow/src/web/`。
- **真实重复已去除**：`evidence/marketplace_dump` 与 `hyperclone/server/seed/marketplace-full` 逐文件 MD5 全同（170/170），仅保留后端依赖的后者。
- **可重建产物未搬**：全部 `node_modules`（共 ~180MB）与 `server/dist` 留在原位；在新位置执行 `npm ci --prefix hyperclone/server && npm run build --prefix hyperclone/server` 即可恢复。
- `anyknow/reverse/hyperknow` 是指向旧位置的符号链接，未随迁（代码中无引用）；如需可重建指向 `../reference`。
- `reference/evidence/` 中 `marketplace_dump` 的原记录等价于 `hyperclone/server/seed/marketplace-full`。

## 快速启动（后端）

```bash
cd hyperclone/server
npm ci
npm run build
npm start          # Fastify :8787，开放模式自带 local-open-user
```

anyknow：`cd anyknow && npm install && npm start`（:4173），`npm test` 跑域测试。

## 本机工具链（video MCP / IAB 浏览器）

复刻流程依赖两个 MCP：video2code 的 `video`（`ingest_video` / `clip_video` / `still_crops` /
`composite_view`）和 IAB 浏览器的 `node_repl`（`mcp__node_repl__js`）。2026-09-15 在本机修好并
验证过，排查/重装走这两条：

```bash
V2C=~/.zcode/cli/plugins/cache/zcode-plugins-official/video2code/0.6.0

# 1) 环境体检（缺啥补啥；--fix 只处理可幂等安装的项）
python3 "$V2C/skills/env-setup/scripts/env_doctor.py"
python3 "$V2C/skills/env-setup/scripts/env_doctor.py" --fix

# 2) 官方插件在本机的两处缺陷补丁（幂等；升级 ZCode 后重跑）
bash ~/.zcode/plugin-patches/apply-plugin-fixes.sh
```

两个坑值得记住：MCP server 由 host 用 `/opt/homebrew/opt/python@3.14/bin/python3.14` 启动
（不是 `/usr/bin/python3`），且那里必须有 `mcp==1.9.0`；另外 brew 的 `cv2` 链接 `libavformat.62`
而本机 ffmpeg 已是 9.0，会让抽帧直接 import 失败，需装 `opencv-python-headless` 到 user site 覆盖。
`node_repl` 的补丁要新开会话才生效。细节见 `~/.zcode/plugin-patches/apply-plugin-fixes.sh` 头部注释。

