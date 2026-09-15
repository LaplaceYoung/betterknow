# simo know

Chalkboard-dark learning agent. Same information architecture as Hyperknow Agent (`打造课程` / `即时协助`, marketplace, Deep Learn 学习 / 练习, LMS school-sync, learning feed), with a blackboard palette and chalk handwriting on display type.

## Runtime

Learning work runs through a **Mastra-shaped TypeScript agent framework** (`src/agent/framework.mjs`): `Agent.generate()` is a real tool loop (model may request tools; tools execute; loop continues until a final answer). Production can attach SpaceXAI (`XAI_API_KEY`, `https://api.x.ai/v1`). Tests inject a tool-requesting model double into that same loop.

## Start

```bash
npm start          # http://127.0.0.1:4173
npm test
```

Default free balance is 20 credits. Course craft costs 10 (+2 per file). Assist costs 1. Materials (cheatsheet / quiz / flashcards) cost 3. Zero balance is rejected.

Knowledge base (`#/knowledge-base`) is a per-account drive: folders, uploads, tree, delete, source-byte quota. Instant assist can use **知识库** files via `search_files` → `read_files` on that same store.

## Layout

- `src/domain` — course graph, progress, credits, LMS ingest, deadline/plan (pure functions)
- `src/agent` — Agent / Tool / Workflow runtime + learning tools
- `src/server` — HTTP API + static chalkboard UI
- `src/web` — chalkboard SPA
- `tests` — shipped-function tests for course, agent, plan
