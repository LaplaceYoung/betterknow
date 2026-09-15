import { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Switch } from '@/components/ui/switch'
import { apiDelete, apiGet, apiPost, apiPut } from '@/lib/api'
import { useUser } from '@/lib/user'

type Tab = 'account' | 'byok' | 'subscription' | 'preferences' | 'memory' | 'general'
const TABS: { id: Tab; label: string }[] = [
  { id: 'account', label: '账户' },
  { id: 'byok', label: '模型与 BYOK' },
  { id: 'subscription', label: '订阅' },
  { id: 'preferences', label: '偏好' },
  { id: 'memory', label: '记忆' },
  { id: 'general', label: '通用' },
]

interface MemoryMgmt { success?: boolean; memories?: { id: string; content: string; created_at?: string }[]; long_term?: string[]; episodic?: string[] }
interface ByokState {
  configured: boolean
  enabled?: boolean
  provider?: 'kimi' | 'openai-compatible' | 'stub'
  base_url?: string
  api_key_masked?: string
  models?: { director?: string; content?: string; quiz?: string; tts?: string }
  providers?: { tts?: { apiKey?: string; baseUrl?: string; model?: string }; search?: { apiKey?: string }; image?: { apiKey?: string } }
}

export function SettingsDialog({ open, onOpenChange, initialTab = 'account' }: { open: boolean; onOpenChange: (o: boolean) => void; initialTab?: Tab }) {
  const [tab, setTab] = useState<Tab>(initialTab)

  useEffect(() => {
    if (open) setTab(initialTab)
  }, [open, initialTab])
  const { username, tier, credits, maxCredits, language, setLanguage, refresh } = useUser()
  const [memory, setMemory] = useState<MemoryMgmt | null>(null)
  const [coupon, setCoupon] = useState('')
  const [couponMsg, setCouponMsg] = useState('')
  const [voice, setVoice] = useState(true)
  const [email, setEmail] = useState('')

  // BYOK state
  const [byokLoaded, setByokLoaded] = useState(false)
  const [byokEnabled, setByokEnabled] = useState(true)
  const [byokProvider, setByokProvider] = useState<'kimi' | 'openai-compatible' | 'stub'>('kimi')
  const [byokBaseUrl, setByokBaseUrl] = useState('')
  const [byokApiKey, setByokApiKey] = useState('')
  const [byokApiKeyMasked, setByokApiKeyMasked] = useState('')
  const [byokDirectorModel, setByokDirectorModel] = useState('kimi-k2-turbo-preview')
  const [byokContentModel, setByokContentModel] = useState('kimi-k2-turbo-preview')
  const [byokQuizModel, setByokQuizModel] = useState('kimi-k2-turbo-preview')
  const [byokSearchKey, setByokSearchKey] = useState('')
  const [byokTtsKey, setByokTtsKey] = useState('')
  const [byokImageKey, setByokImageKey] = useState('')
  const [byokTesting, setByokTesting] = useState(false)
  const [byokTestResult, setByokTestResult] = useState<{ ok: boolean; status: number; latency_ms: number; sample: string } | null>(null)
  const [byokSaving, setByokSaving] = useState(false)
  const [byokStatusMsg, setByokStatusMsg] = useState('')

  useEffect(() => {
    if (!open) return
    apiGet<{ data: { email: string } }>('/auth/get_user_info').then((r) => setEmail(r.data.email)).catch(() => {})
    if (tab === 'memory') apiGet<MemoryMgmt>('/memory/get_memory_management').then(setMemory).catch(() => setMemory(null))
    if (tab === 'byok' && !byokLoaded) {
      apiGet<ByokState>('/auth/byok').then((b) => {
        setByokLoaded(true)
        if (b.configured) {
          setByokEnabled(b.enabled !== false)
          setByokProvider(b.provider ?? 'kimi')
          setByokBaseUrl(b.base_url ?? '')
          setByokApiKeyMasked(b.api_key_masked ?? '')
          if (b.models?.director) setByokDirectorModel(b.models.director)
          if (b.models?.content) setByokContentModel(b.models.content)
          if (b.models?.quiz) setByokQuizModel(b.models.quiz)
          if (b.providers?.search?.apiKey) setByokSearchKey(b.providers.search.apiKey)
          if (b.providers?.tts?.apiKey) setByokTtsKey(b.providers.tts.apiKey)
          if (b.providers?.image?.apiKey) setByokImageKey(b.providers.image.apiKey)
        }
      }).catch(() => {})
    }
  }, [open, tab, byokLoaded])

  const redeem = async () => {
    setCouponMsg('')
    try {
      const r = await apiPost<{ success?: boolean; message?: string; detail?: string }>('/subscription/redeem_coupon', { coupon_code: coupon })
      setCouponMsg(r.message ?? (r.success ? '兑换成功' : r.detail ?? '兑换失败'))
      await refresh()
    } catch (e) { setCouponMsg('无效的优惠码') }
  }
  const clearMemory = async () => {
    await apiDelete('/memory/clear_stored_memory')
    setMemory(await apiGet<MemoryMgmt>('/memory/get_memory_management'))
  }

  const saveByok = async () => {
    setByokSaving(true)
    setByokStatusMsg('')
    try {
      const providers: Record<string, { apiKey: string }> = {}
      if (byokSearchKey) providers.search = { apiKey: byokSearchKey }
      if (byokTtsKey) providers.tts = { apiKey: byokTtsKey }
      if (byokImageKey) providers.image = { apiKey: byokImageKey }

      await apiPut('/auth/byok', {
        enabled: byokEnabled,
        provider: byokProvider,
        base_url: byokBaseUrl || undefined,
        api_key: byokApiKey || undefined,
        models: {
          director: byokDirectorModel,
          content: byokContentModel,
          quiz: byokQuizModel,
        },
        providers: Object.keys(providers).length ? providers : undefined,
      })
      setByokStatusMsg('✓ BYOK 配置已保存并即时生效')
      if (byokApiKey) {
        setByokApiKeyMasked(`${byokApiKey.slice(0, 6)}…${byokApiKey.slice(-4)}`)
        setByokApiKey('')
      }
    } catch (e) {
      setByokStatusMsg('保存失败: ' + (e instanceof Error ? e.message : String(e)))
    } finally {
      setByokSaving(false)
    }
  }

  const testByok = async () => {
    setByokTesting(true)
    setByokTestResult(null)
    try {
      const r = await apiPost<{ ok: boolean; status: number; latency_ms: number; sample: string }>('/auth/byok/test', {
        provider: byokProvider,
        base_url: byokBaseUrl || undefined,
        api_key: byokApiKey || undefined,
        model: byokContentModel,
      })
      setByokTestResult(r)
    } catch (e) {
      setByokTestResult({ ok: false, status: 0, latency_ms: 0, sample: e instanceof Error ? e.message : '网络连接失败' })
    } finally {
      setByokTesting(false)
    }
  }

  const clearByok = async () => {
    await apiDelete('/auth/byok')
    setByokApiKey('')
    setByokApiKeyMasked('')
    setByokBaseUrl('')
    setByokProvider('kimi')
    setByokSearchKey('')
    setByokTtsKey('')
    setByokImageKey('')
    setByokTestResult(null)
    setByokStatusMsg('已清除 BYOK 配置，已恢复本地内置离线引擎')
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[820px] p-0 overflow-hidden rounded-2xl">
        <DialogTitle className="sr-only">设置</DialogTitle>
        <div className="flex" style={{ minHeight: 480 }}>
          <aside className="w-[180px] shrink-0 border-r bg-[#fafafa] p-3">
            <div className="text-[15px] font-semibold px-2 py-2 mb-1">设置</div>
            {TABS.map((t) => (
              <button key={t.id} onClick={() => setTab(t.id)} data-active={tab === t.id} className="hk-rail-item w-full text-[13px]" style={{ height: 34 }}>{t.label}</button>
            ))}
          </aside>
          <section className="flex-1 p-6 space-y-6 text-[13px]">
            {tab === 'account' && (
              <>
                <h3 className="text-[15px] font-semibold">账户</h3>
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 rounded-full bg-[#1c1c1e] text-white flex items-center justify-center font-semibold">{username.slice(0, 1).toUpperCase()}</div>
                  <div><div className="font-medium">{username}</div><div className="text-[#8a8a90]">{email}</div></div>
                </div>
                <div className="pt-4 border-t">
                  <div className="font-medium mb-1">删除账号</div>
                  <p className="text-[#8a8a90] mb-2">删除后所有课程、会话与知识库文件不可恢复。</p>
                  <button className="hk-pill text-[#dc2626] border-[#fecaca]" disabled title="开放模式下禁用">删除账号</button>
                </div>
              </>
            )}
            {tab === 'byok' && (
              <div className="space-y-4 max-h-[460px] overflow-y-auto pr-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-[15px] font-semibold">模型与 BYOK (Bring Your Own Key)</h3>
                    <p className="text-[#8a8a90] text-[12px] mt-0.5">
                      本项目免强制付费与商业充值。若需调用外部大模型或真实生成能力，可在此配置 API Key；留空时默认使用内置离线模拟引擎。
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[12px] text-[#6b6b70]">启用 BYOK</span>
                    <Switch checked={byokEnabled} onCheckedChange={setByokEnabled} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className="block text-[12px] font-medium text-[#3d3d3f] mb-1">接口规范 / Provider</label>
                    <select value={byokProvider} onChange={(e) => setByokProvider(e.target.value as 'kimi' | 'openai-compatible' | 'stub')} className="w-full h-9 px-2 rounded-lg border bg-white outline-none">
                      <option value="kimi">Moonshot / Kimi (默认)</option>
                      <option value="openai-compatible">OpenAI Compatible (DeepSeek / OpenAI / OneAPI)</option>
                      <option value="stub">本地内置离线模拟 (Offline Stub)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[12px] font-medium text-[#3d3d3f] mb-1">API Base URL</label>
                    <input value={byokBaseUrl} onChange={(e) => setByokBaseUrl(e.target.value)} placeholder={byokProvider === 'openai-compatible' ? 'https://api.openai.com/v1' : 'https://api.moonshot.cn/v1'} className="w-full h-9 px-3 rounded-lg border bg-white outline-none focus:border-[#a1a1aa]" />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[12px] font-medium text-[#3d3d3f]">API Key</label>
                    {byokApiKeyMasked && <span className="text-[11px] text-[#22c55e]">当前生效: {byokApiKeyMasked}</span>}
                  </div>
                  <input type="password" value={byokApiKey} onChange={(e) => setByokApiKey(e.target.value)} placeholder={byokApiKeyMasked ? '留空保持当前 Key，输入新 Key 覆盖' : 'sk-...'} className="w-full h-9 px-3 rounded-lg border bg-white outline-none focus:border-[#a1a1aa]" />
                </div>

                <div className="grid grid-cols-3 gap-3 pt-1">
                  <div>
                    <label className="block text-[12px] font-medium text-[#3d3d3f] mb-1">Agent 决策模型</label>
                    <input value={byokDirectorModel} onChange={(e) => setByokDirectorModel(e.target.value)} placeholder="kimi-k2-turbo-preview" className="w-full h-9 px-3 rounded-lg border bg-white outline-none" />
                  </div>
                  <div>
                    <label className="block text-[12px] font-medium text-[#3d3d3f] mb-1">内容生成模型</label>
                    <input value={byokContentModel} onChange={(e) => setByokContentModel(e.target.value)} placeholder="kimi-k2-turbo-preview" className="w-full h-9 px-3 rounded-lg border bg-white outline-none" />
                  </div>
                  <div>
                    <label className="block text-[12px] font-medium text-[#3d3d3f] mb-1">测验与出题模型</label>
                    <input value={byokQuizModel} onChange={(e) => setByokQuizModel(e.target.value)} placeholder="kimi-k2-turbo-preview" className="w-full h-9 px-3 rounded-lg border bg-white outline-none" />
                  </div>
                </div>

                <div className="pt-2 border-t">
                  <div className="text-[12px] font-semibold text-[#3d3d3f] mb-2">能力扩展密钥 (可选)</div>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] text-[#6b6b70] mb-1">联网搜索 (Search Key)</label>
                      <input type="password" value={byokSearchKey} onChange={(e) => setByokSearchKey(e.target.value)} placeholder="可选" className="w-full h-8 px-2.5 rounded-md border bg-white text-[12px] outline-none" />
                    </div>
                    <div>
                      <label className="block text-[11px] text-[#6b6b70] mb-1">语音合成 (TTS Key)</label>
                      <input type="password" value={byokTtsKey} onChange={(e) => setByokTtsKey(e.target.value)} placeholder="可选" className="w-full h-8 px-2.5 rounded-md border bg-white text-[12px] outline-none" />
                    </div>
                    <div>
                      <label className="block text-[11px] text-[#6b6b70] mb-1">生图/视频 (Generate Key)</label>
                      <input type="password" value={byokImageKey} onChange={(e) => setByokImageKey(e.target.value)} placeholder="可选" className="w-full h-8 px-2.5 rounded-md border bg-white text-[12px] outline-none" />
                    </div>
                  </div>
                </div>

                {byokTestResult && (
                  <div className={`p-3 rounded-lg border text-[12px] ${byokTestResult.ok ? 'bg-[#f0fdf4] border-[#bbf7d0] text-[#166534]' : 'bg-[#fef2f2] border-[#fecaca] text-[#991b1b]'}`}>
                    <div className="font-medium">
                      {byokTestResult.ok ? `✓ 连接成功 (状态码: ${byokTestResult.status}, 延迟: ${byokTestResult.latency_ms}ms)` : `✗ 连接失败 (状态码: ${byokTestResult.status})`}
                    </div>
                    <div className="mt-1 text-[11px] opacity-90 truncate">{byokTestResult.sample}</div>
                  </div>
                )}

                {byokStatusMsg && (
                  <div className="text-[12px] text-[#2563eb] font-medium">{byokStatusMsg}</div>
                )}

                <div className="flex items-center justify-between pt-2 border-t">
                  <button onClick={clearByok} className="hk-pill text-[#dc2626] border-[#fecaca]">清除配置</button>
                  <div className="flex items-center gap-2">
                    <button onClick={testByok} disabled={byokTesting} className="hk-pill">
                      {byokTesting ? '测试中…' : '测试连接'}
                    </button>
                    <button onClick={saveByok} disabled={byokSaving} className="h-8 px-4 rounded-lg bg-[#0a0a0a] text-white text-[12px] font-medium hover:bg-[#27272a] transition-colors">
                      {byokSaving ? '保存中…' : '保存配置'}
                    </button>
                  </div>
                </div>
              </div>
            )}
            {tab === 'subscription' && (
              <>
                <h3 className="text-[15px] font-semibold">计划与授权模式</h3>
                <div className="hk-card p-4 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-[#fdf6e3] text-[#a16207]">BYOK 终身自由版 (UNLIMITED)</span>
                    <div className="mt-2 text-[#3d3d3f]">无限制使用 · 已免除所有积分扣减与付费壁垒</div>
                    <div className="text-[12px] text-[#8a8a90] mt-0.5">所有大模型消耗均通过你配置的 BYOK API 密钥直连</div>
                  </div>
                  <button className="hk-pill" onClick={() => setTab('byok')}>配置模型</button>
                </div>
              </>
            )}
            {tab === 'preferences' && (
              <>
                <h3 className="text-[15px] font-semibold">偏好设置</h3>
                <div className="flex items-center justify-between py-2 border-b"><div><div className="font-medium">语音</div><div className="text-[#8a8a90]">在回答完成后朗读内容</div></div><Switch checked={voice} onCheckedChange={setVoice} /></div>
                <div className="flex items-center justify-between py-2 border-b"><div><div className="font-medium">界面语言</div><div className="text-[#8a8a90]">切换后所有页面与会话使用该语言</div></div>
                  <select value={language} onChange={(e) => setLanguage(e.target.value)} className="h-9 px-2 rounded-lg border bg-white">
                    <option value="zh">简体中文</option><option value="en">English</option><option value="ko">한국어</option>
                  </select>
                </div>
              </>
            )}
            {tab === 'memory' && (
              <>
                <div className="flex items-center justify-between"><h3 className="text-[15px] font-semibold">记忆</h3><button className="hk-pill" onClick={clearMemory}>清除记忆</button></div>
                <p className="text-[#8a8a90]">betterknow 会记住你的学习偏好、进度与常问主题，用于个性化回答。</p>
                <div>
                  <div className="font-medium mb-1">长期记忆</div>
                  <ul className="space-y-1 text-[#3d3d3f]">{(memory?.long_term ?? memory?.memories?.map((m) => m.content) ?? []).map((m, i) => <li key={i} className="hk-card px-3 py-2">{m}</li>)}
                    {!(memory?.long_term?.length || memory?.memories?.length) && <li className="text-[#8a8a90]">暂无长期记忆</li>}</ul>
                </div>
                <div>
                  <div className="font-medium mb-1">情景记忆</div>
                  <ul className="space-y-1 text-[#3d3d3f]">{(memory?.episodic ?? []).map((m, i) => <li key={i} className="hk-card px-3 py-2">{m}</li>)}
                    {!memory?.episodic?.length && <li className="text-[#8a8a90]">暂无情景记忆</li>}</ul>
                </div>
              </>
            )}
            {tab === 'general' && (
              <>
                <h3 className="text-[15px] font-semibold">通用</h3>
                <div className="flex items-center justify-between py-2 border-b"><div><div className="font-medium">通知</div><div className="text-[#8a8a90]">课程提醒与新消息</div></div><Switch defaultChecked /></div>
                <div className="flex items-center justify-between py-2 border-b"><div><div className="font-medium">邮件订阅</div><div className="text-[#8a8a90]">每周学习摘要</div></div><Switch /></div>
              </>
            )}
          </section>
        </div>
      </DialogContent>
    </Dialog>
  )
}
