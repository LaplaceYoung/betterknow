// API 客户端：只走相对路径 /api/v1/*；开放模式首次自取 auto_token（与原站前端口径一致）。
const TOKEN_KEY = 'access_token'
const USER_KEY = 'user_id'
const NAME_KEY = 'username'
const LANG_KEY = 'ui_language'

export type TokenResponse = { success: boolean; data: { access_token: string; refresh_token: string; user_id: string; username: string } }

export async function ensureToken(): Promise<string> {
  let t = localStorage.getItem(TOKEN_KEY)
  if (!t) {
    const r = await fetch('/api/v1/auth/auto_token')
    const j: TokenResponse = await r.json()
    t = j.data.access_token
    localStorage.setItem(TOKEN_KEY, t)
    localStorage.setItem(USER_KEY, j.data.user_id)
    localStorage.setItem(NAME_KEY, j.data.username)
  }
  return t
}

export function uiLanguage(): string {
  return localStorage.getItem(LANG_KEY) ?? 'zh'
}
export function setUiLanguage(l: string) {
  localStorage.setItem(LANG_KEY, l)
}

export async function api<T = unknown>(path: string, init?: RequestInit & { raw?: boolean }): Promise<T> {
  const token = await ensureToken()
  const res = await fetch(`/api/v1${path}`, {
    ...init,
    headers: {
      ...(init?.body && !(init.body instanceof FormData) ? { 'content-type': 'application/json' } : {}),
      authorization: `Bearer ${token}`,
      ...(init?.headers ?? {}),
    },
  })
  if (!res.ok) throw new Error(`${init?.method ?? 'GET'} ${path} → ${res.status}`)
  if (init?.raw) return res as unknown as T
  return (await res.json()) as T
}

export function apiGet<T>(path: string): Promise<T> { return api<T>(path) }
export function apiPost<T>(path: string, body?: unknown): Promise<T> {
  return api<T>(path, { method: 'POST', body: body === undefined ? undefined : JSON.stringify(body) })
}
export function apiPut<T>(path: string, body?: unknown): Promise<T> {
  return api<T>(path, { method: 'PUT', body: body === undefined ? undefined : JSON.stringify(body) })
}
export function apiDelete<T>(path: string): Promise<T> { return api<T>(path, { method: 'DELETE' }) }

// WS 通道：同源相对路径（开发由 vite 代理，生产同源）
export function wsUrl(path: string, params: Record<string, string>): string {
  const proto = location.protocol === 'https:' ? 'wss' : 'ws'
  const q = new URLSearchParams(params).toString()
  return `${proto}://${location.host}${path}?${q}`
}

export async function ensureWsToken(): Promise<string> { return ensureToken() }

// ── 领域类型（与后端响应形状对齐）──
export interface Trend { id: string; title: string; summary: string; category: string; published_at: string }
export interface MarketplaceCourse {
  marketplaceId: string; courseTitle: string; courseDescription: string; targetLearner: string;
  ticketVariant: number; coverImageUrl: string; wideCoverImageUrl: string;
  unitCount: number; sessionCount: number; subject: string; subjects: string[];
  enrolled: boolean; enrolledCourseUuid: string | null; joinCount: number;
  rating?: number; level?: 'entry' | 'advanced' | 'expert';
}
export interface Conversation { conversation_id: string; title: string; created_at: string; last_updated_at: string; starred: boolean; board_session_types: string[] }
export interface CourseRef { uuid: string; title: string; description?: string; cover_image_url?: string; progress?: number; next_lecture?: string | null }
export interface UserInfo {
  user_id: string; username: string; email: string;
  subscription: { tier: string; status: string; remaining_credits: number; max_credits: number; will_reset_at: string };
}

export async function getUserInfo(): Promise<UserInfo['subscription'] & { username: string }> {
  const j = await apiGet<{ success: boolean; data: UserInfo }>('/auth/get_user_info')
  return { ...j.data.subscription, username: j.data.username }
}
export async function getTrends(): Promise<Trend[]> {
  const j = await apiGet<{ trends: Trend[] }>('/dailyTrends')
  return j.trends
}
export async function getMarketplace(): Promise<MarketplaceCourse[]> {
  const j = await apiGet<{ courses: MarketplaceCourse[] }>('/marketplace/courses')
  return j.courses
}
export async function getMyCourses(): Promise<CourseRef[]> {
  const j = await apiGet<{ courses: CourseRef[] }>('/course-generation/courses')
  return j.courses
}
export async function getConversations(): Promise<{ conversations: Conversation[]; recent_course: CourseRef | null }> {
  return apiGet('/conversations/list_past_conversations')
}
