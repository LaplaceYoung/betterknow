import { createHmac, randomBytes, randomUUID, scryptSync, timingSafeEqual } from 'node:crypto';
import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { now, readState, updateState, type UserRecord } from './store.js';

declare module 'fastify' { interface FastifyRequest { userId?: string } }

const jwtSecret = process.env.JWT_SECRET ?? 'hyperclone-local-development-secret';
export const OPEN_USER_ID = 'local-open-user';
// BYOK 模式：取消积分消耗，赋予全量免积分无限额度
const DEMO_CREDITS = 999999;
const DEMO_MAX = 999999;

export async function ensureOpenUser(): Promise<UserRecord> {
  return updateState((state) => {
    const existing = state.users[OPEN_USER_ID];
    if (existing) {
      existing.credits = DEMO_CREDITS;
      existing.max_credits = DEMO_MAX;
      return existing;
    }
    const blank = scryptSync(randomBytes(24).toString('hex'), randomBytes(16).toString('hex'), 32).toString('hex');
    const user: UserRecord = { id: OPEN_USER_ID, username: 'local', email: 'local@hyperclone', password_hash: blank, password_salt: '', credits: DEMO_CREDITS, max_credits: DEMO_MAX, created_at: now(), last_reset_at: now() };
    state.users[OPEN_USER_ID] = user;
    return user;
  });
}
const b64 = (value: string | Buffer): string => Buffer.from(value).toString('base64url');

function jwt(user: UserRecord, expiresInSeconds = 7_200): string {
  const header = b64(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const payload = b64(JSON.stringify({ sub: user.id, email: user.email, username: user.username, exp: Math.floor(Date.now() / 1000) + expiresInSeconds }));
  const signature = createHmac('sha256', jwtSecret).update(`${header}.${payload}`).digest('base64url');
  return `${header}.${payload}.${signature}`;
}

export function verifyJwt(token: string | undefined): { sub: string } | undefined {
  if (!token) return undefined;
  const [header, payload, signature] = token.split('.');
  if (!header || !payload || !signature) return undefined;
  const expected = createHmac('sha256', jwtSecret).update(`${header}.${payload}`).digest();
  let supplied: Buffer;
  try { supplied = Buffer.from(signature, 'base64url'); } catch { return undefined; }
  if (supplied.length !== expected.length || !timingSafeEqual(supplied, expected)) return undefined;
  try {
    const claims = JSON.parse(Buffer.from(payload, 'base64url').toString()) as { sub?: string; exp?: number };
    return claims.sub && claims.exp && claims.exp > Date.now() / 1000 ? { sub: claims.sub } : undefined;
  } catch { return undefined; }
}

export async function authenticate(request: FastifyRequest, reply: FastifyReply): Promise<void> {
  const claims = verifyJwt(request.headers.authorization?.replace(/^Bearer\s+/i, ''));
  if (claims) {
    const state = await readState();
    if (state.users[claims.sub]) { request.userId = claims.sub; return; }
  }
  const open = await ensureOpenUser();
  request.userId = open.id;
}

async function tokens(user: UserRecord): Promise<{ access_token: string; refresh_token: string; user_id: string; username: string }> {
  const refreshToken = randomBytes(32).toString('base64url');
  await updateState((state) => { state.refresh_tokens[refreshToken] = { user_id: user.id, expires_at: Date.now() + 30 * 86_400_000 }; });
  return { access_token: jwt(user), refresh_token: refreshToken, user_id: user.id, username: user.username };
}

export async function registerAuthRoutes(app: FastifyInstance): Promise<void> {
  app.all('/api/v1/auth/auto_token', async () => ({ success: true, data: await tokens(await ensureOpenUser()) }));

  app.post('/api/v1/auth/register', async (request, reply) => {
    const user = await ensureOpenUser();
    return { success: true, message: 'Registration successful', user_id: user.id, email: user.email, username: user.username, error: null, friend_referral_info: null, invite_code_info: null };
  });

  app.post('/api/v1/auth/login', async (request, reply) => {
    return { success: true, data: await tokens(await ensureOpenUser()) };
  });

  app.post('/api/v1/auth/login_refresh', async (request, reply) => {
    return { success: true, data: await tokens(await ensureOpenUser()) };
  });

  app.delete('/api/v1/auth/delete_account', { preHandler: authenticate }, async (request) => {
    if (request.userId === OPEN_USER_ID) return { success: true, message: 'Account deletion is disabled in local open mode' };
    await updateState((state) => {
      delete state.users[request.userId!]; delete state.drive[request.userId!]; delete state.memories[request.userId!]; delete state.calendar[request.userId!];
      for (const [id, value] of Object.entries(state.conversations)) if (value.user_id === request.userId) delete state.conversations[id];
      for (const [token, value] of Object.entries(state.refresh_tokens)) if (value.user_id === request.userId) delete state.refresh_tokens[token];
    });
    return { success: true, message: 'Account deleted' };
  });
}
