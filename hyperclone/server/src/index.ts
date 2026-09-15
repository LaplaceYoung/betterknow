import Fastify from 'fastify';
import fastifyStatic from '@fastify/static';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { existsSync, mkdirSync } from 'node:fs';
import multipart from '@fastify/multipart';
import websocket from '@fastify/websocket';
import { registerAuthRoutes } from './auth.js';
import { registerRestRoutes } from './rest.js';
import { registerWebsocketRoutes } from './ws.js';
import { registerExtraRoutes } from './extras.js';
import { startCronJobs } from './cron.js';
import { dataDirectory } from './store.js';

const app = Fastify({ logger: true, bodyLimit: 25 * 1024 * 1024 });
process.on('uncaughtException', (error) => app.log.error(error, 'uncaughtException'));
process.on('unhandledRejection', (reason) => app.log.error(reason instanceof Error ? reason : String(reason), 'unhandledRejection'));
await app.register(websocket, { options: { maxPayload: 25 * 1024 * 1024 } });
await app.register(multipart, { limits: { fileSize: 25 * 1024 * 1024, files: 1 } });

app.addHook('onRequest', async (request, reply) => {
  reply.headers({
    'access-control-allow-origin': request.headers.origin ?? '*',
    'access-control-allow-headers': 'authorization, content-type',
    'access-control-allow-methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
  });
  if (request.method === 'OPTIONS') await reply.code(204).send();
});

await registerAuthRoutes(app);
await registerRestRoutes(app);
await registerExtraRoutes(app);
await registerWebsocketRoutes(app);
startCronJobs((msg) => app.log.info(msg));
// 静态根 = 新前端 app/dist（STATIC_ROOT 可覆盖）；目录缺失时先建空目录，避免 fastify-static 启动即抛错
const staticRoot = process.env.STATIC_ROOT ?? join(fileURLToPath(new URL('../../../app/dist', import.meta.url)));
if (!existsSync(staticRoot)) mkdirSync(staticRoot, { recursive: true });
await app.register(fastifyStatic, {
  root: staticRoot,
  wildcard: true, // 动态解析文件：前端重新构建出的新哈希 bundle 无需重启即可被托管
});
app.setNotFoundHandler(async (request, reply) => {
  if ((request.method === 'GET' || request.method === 'HEAD') && !request.url.startsWith('/api/') && !request.url.startsWith('/ws')) {
    return reply.type('text/html; charset=utf-8').sendFile('index.html');
  }
  return reply.code(404).send({ detail: 'Not found' });
});

app.setErrorHandler((error, _request, reply) => {
  app.log.error(error);
  const statusCode = error instanceof Error && 'statusCode' in error && typeof error.statusCode === 'number' && error.statusCode >= 400 ? error.statusCode : 500;
  void reply.code(statusCode).send({ detail: statusCode === 500 ? 'Internal server error' : error instanceof Error ? error.message : 'Request failed' });
});

const port = Number(process.env.PORT ?? 8787);
const host = process.env.HOST ?? '0.0.0.0';
app.log.info({ pid: process.pid, data: dataDirectory(), static_root: staticRoot, port, host }, 'betterknow starting');
try {
  await app.listen({ port, host });
} catch (error) {
  // 端口被旧实例占用时，之前的“改了代码行为没变”都来自这里：直接说清楚，别静默带病运行
  if ((error as NodeJS.ErrnoException).code === 'EADDRINUSE') {
    app.log.error(`端口 ${port} 已被占用（多半是上一轮遗留的 betterknow 进程）。先查：lsof -nP -iTCP:${port} -sTCP:LISTEN`);
    process.exit(1);
  }
  throw error;
}
