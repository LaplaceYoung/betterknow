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
type SeamId = 'llm' | 'tts' | 'stt' | 'search' | 'image'
interface SeamDraft { baseUrl: string; apiKey: string; masked: string; model: string; voice: string; enabled: boolean; source: 'user' | 'env' | 'none' }
interface ProbeResult { ok: boolean; status: number; latency_ms: number; probe: string; sample?: string; error?: string; model?: string }
interface ByokState {
  configured: boolean
  enabled?: boolean
  seams?: { seam: SeamId; configured: boolean; enabled: boolean; mode: 'real' | 'stub'; source: 'user' | 'env' | 'none'; base_url: string; model: string; api_key_masked: string; voice?: string }[]
}

const emptySeams = (): Record<SeamId, SeamDraft> => ({
  llm: { baseUrl: '', apiKey: '', masked: '', model: '', voice: '', enabled: true, source: 'none' },
  tts: { baseUrl: '', apiKey: '', masked: '', model: '', voice: '', enabled: true, source: 'none' },
  stt: { baseUrl: '', apiKey: '', masked: '', model: '', voice: '', enabled: true, source: 'none' },
  search: { baseUrl: '', apiKey: '', masked: '', model: '', voice: '', enabled: true, source: 'none' },
  image: { baseUrl: '', apiKey: '', masked: '', model: '', voice: '', enabled: true, source: 'none' },
})

// 本地优先的预设：自部署场景默认指向本机推理服务
const SEAM_META: { id: SeamId; label: string; short: string; hint: string; urlPlaceholder: string; modelPlaceholder: string; presets: { label: string; baseUrl: string; model?: string }[] }[] = [
  { id: 'llm', label: '语言模型（对话 / 课程生成 / 白板讲解）', short: 'LLM', hint: 'Agent 决策、内容生成、课程管线都走这一条', urlPlaceholder: 'http://127.0.0.1:11434/v1', modelPlaceholder: 'qwen2.5:14b', presets: [
    { label: 'Ollama', baseUrl: 'http://127.0.0.1:11434/v1' },
    { label: 'vLLM', baseUrl: 'http://127.0.0.1:8000/v1' },
    { label: 'LM Studio', baseUrl: 'http://127.0.0.1:1234/v1' },
    { label: 'DeepSeek', baseUrl: 'https://api.deepseek.com/v1', model: 'deepseek-chat' },
    { label: 'Kimi', baseUrl: 'https://api.moonshot.cn/v1', model: 'kimi-k2-turbo-preview' },
  ] },
  { id: 'tts', label: '语音合成（白板讲稿与插问配音）', short: 'TTS', hint: 'OpenAI 兼容 /audio/speech；未配置时用浏览器本地发声兜底', urlPlaceholder: 'http://127.0.0.1:9880/v1', modelPlaceholder: 'tts-1', presets: [
    { label: 'OpenAI', baseUrl: 'https://api.openai.com/v1', model: 'tts-1' },
    { label: '本地网关', baseUrl: 'http://127.0.0.1:9880/v1', model: 'gpt-sovits' },
  ] },
  { id: 'stt', label: '语音识别（语音提问转写）', short: 'STT', hint: 'OpenAI 兼容 /audio/transcriptions', urlPlaceholder: 'http://127.0.0.1:8000/v1', modelPlaceholder: 'whisper-1', presets: [
    { label: 'OpenAI', baseUrl: 'https://api.openai.com/v1', model: 'whisper-1' },
    { label: 'faster-whisper', baseUrl: 'http://127.0.0.1:8000/v1', model: 'whisper-large-v3' },
  ] },
  { id: 'search', label: '联网检索（课程调研 / 今日值得学）', short: 'Search', hint: 'Tavily 形状 POST /search {query,max_results}；未配置时回种子结果', urlPlaceholder: 'http://127.0.0.1:8080', modelPlaceholder: '—', presets: [
    { label: 'Tavily', baseUrl: 'https://api.tavily.com' },
    { label: 'SearXNG', baseUrl: 'http://127.0.0.1:8080' },
  ] },
  { id: 'image', label: '图像生成（白板插图 / 课程封面）', short: 'Image', hint: 'OpenAI 兼容 /images/generations；未配置时出 SVG 占位', urlPlaceholder: 'http://127.0.0.1:7860/v1', modelPlaceholder: 'gpt-image-1', presets: [
    { label: 'OpenAI', baseUrl: 'https://api.openai.com/v1', model: 'gpt-image-1' },
    { label: '本地 SD 网关', baseUrl: 'http://127.0.0.1:7860/v1', model: 'sd-xl' },
  ] },
]

export function SettingsDialog({ open, onOpenChange, initialTab = 'account' }: { open: boolean; onOpenChange: (o: boolean) => void; initialTab?: Tab }) {
  const [tab, setTab] = useState<Tab>(initialTab)

  useEffect(() => {
    if (open) setTab(initialTab)
  }, [open, initialTab])
  const { username, language, setLanguage } = useUser()
  const [memory, setMemory] = useState<MemoryMgmt | null>(null)
  const [voice, setVoice] = useState(true)
  const [email, setEmail] = useState('')

  // BYOK state（本地 BYOK 版：5 条 seam 各自可配、可测）
  const [byokLoaded, setByokLoaded] = useState(false)
  const [byokEnabled, setByokEnabled] = useState(true)
  const [seams, setSeams] = useState<Record<SeamId, SeamDraft>>(emptySeams)
  const [probe, setProbe] = useState<Partial<Record<SeamId, ProbeResult>>>({})
  const [probing, setProbing] = useState<SeamId | null>(null)
  const [deepProbe, setDeepProbe] = useState(false)
  const [byokSaving, setByokSaving] = useState(false)
  const [byokStatusMsg, setByokStatusMsg] = useState('')

  useEffect(() => {
    if (!open) return
    apiGet<{ data: { email: string } }>('/auth/get_user_info').then((r) => setEmail(r.data.email)).catch(() => {})
    if (tab === 'memory') apiGet<MemoryMgmt>('/memory/get_memory_management').then(setMemory).catch(() => setMemory(null))
    if (tab === 'byok' && !byokLoaded) {
      apiGet<ByokState>('/auth/byok').then((b) => {
        setByokLoaded(true)
        setByokEnabled(b.enabled !== false)
        const next = emptySeams()
        for (const seam of b.seams ?? []) {
          next[seam.seam] = {
            baseUrl: seam.base_url ?? '',
            voice: seam.voice ?? '',
            apiKey: '',
            masked: seam.api_key_masked ?? '',
            model: seam.model ?? '',
            enabled: seam.enabled !== false,
            source: seam.source ?? 'none',
          }
        }
        setSeams(next)
      }).catch(() => setByokLoaded(true))
    }
  }, [open, tab, byokLoaded])

  const clearMemory = async () => {
    await apiDelete('/memory/clear_stored_memory')
    setMemory(await apiGet<MemoryMgmt>('/memory/get_memory_management'))
  }

  const saveByok = async () => {
    setByokSaving(true)
    setByokStatusMsg('')
    try {
      const providers: Record<string, { apiKey?: string; baseUrl?: string; model?: string; enabled?: boolean }> = {}
      for (const meta of SEAM_META) {
        const draft = seams[meta.id]
        providers[meta.id] = {
          ...(draft.apiKey ? { apiKey: draft.apiKey } : {}),
          ...(draft.voice ? { voice: draft.voice } : {}),
          baseUrl: draft.baseUrl,
          model: draft.model,
          enabled: draft.enabled,
        }
      }
      await apiPut('/auth/byok', { enabled: byokEnabled, providers })
      setSeams((current) => {
        const next = { ...current }
        for (const meta of SEAM_META) {
          const draft = next[meta.id]
          next[meta.id] = { ...draft, apiKey: '', masked: draft.apiKey ? `${draft.apiKey.slice(0, 5)}…${draft.apiKey.slice(-4)}` : draft.masked, source: draft.apiKey || draft.baseUrl || draft.model ? 'user' : draft.source }
        }
        return next
      })
      setByokStatusMsg('✓ 已保存，下一次请求即时生效（无需重启）')
    } catch (e) {
      setByokStatusMsg('保存失败：' + (e instanceof Error ? e.message : String(e)))
    } finally {
      setByokSaving(false)
    }
  }

  const testSeam = async (seam: SeamId) => {
    setProbing(seam)
    const draft = seams[seam]
    try {
      const r = await apiPost<ProbeResult>('/auth/byok/test', {
        seam,
        base_url: draft.baseUrl || undefined,
        api_key: draft.apiKey || undefined,
        model: draft.model || undefined,
        deep: deepProbe,
      })
      setProbe((current) => ({ ...current, [seam]: r }))
    } catch (e) {
      setProbe((current) => ({ ...current, [seam]: { ok: false, status: 0, latency_ms: 0, probe: 'none', sample: e instanceof Error ? e.message : '网络错误' } }))
    } finally {
      setProbing(null)
    }
  }

  const clearByok = async () => {
    await apiDelete('/auth/byok')
    setSeams(emptySeams())
    setProbe({})
    setByokStatusMsg('已清除本机保存的 BYOK 配置')
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* 线上 .settings-container：max-width 950 / width 90% / height 600 / radius 20 / 0 24px 48px rgba(0,0,0,.12) */}
      <DialogContent className="p-0 overflow-hidden" style={{ maxWidth: 950, width: '90%', height: 600, maxHeight: '90vh', borderRadius: 20, boxShadow: '0 24px 48px rgba(0,0,0,.12), 0 0 1px rgba(0,0,0,.05)' }}>
        <DialogTitle className="sr-only">设置</DialogTitle>
        <div className="flex" style={{ height: '100%' }}>
          {/* 线上 .settings-sidebar：210px / bg #f4f4f4 / border-right 1px #e9e9e9 */}
          <aside className="shrink-0 p-3" style={{ width: 210, background: '#f4f4f4', borderRight: '1px solid #e9e9e9' }}>
            <div className="px-2 py-2 mb-1" style={{ fontSize: 18, fontWeight: 600, color: '#1a1a1a', paddingLeft: 4 }}>设置</div>
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
              <div className="space-y-4 max-h-[520px] overflow-y-auto pr-2">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-[15px] font-semibold">模型与 BYOK（本地自部署版）</h3>
                    <p className="text-[#8a8a90] text-[12px] mt-0.5">
                      五条能力通道各自独立配置，全部走你自己的模型服务：语言模型、语音合成、语音识别、联网检索、图像生成。未配置的通道保持内置离线兜底，不会报错也不会阻断使用。
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[12px] text-[#6b6b70]">启用 BYOK</span>
                    <Switch checked={byokEnabled} onCheckedChange={setByokEnabled} />
                  </div>
                </div>

                <label className="flex items-center gap-2 text-[12px] text-[#6b6b70]">
                  <input type="checkbox" checked={deepProbe} onChange={(e) => setDeepProbe(e.target.checked)} />
                  深度探针（图像真出图、语音识别真转写，会产生真实调用与费用）
                </label>

                {SEAM_META.map((meta) => {
                  const draft = seams[meta.id]
                  const result = probe[meta.id]
                  return (
                    <div key={meta.id} className="hk-card p-3.5 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-[13px] font-semibold flex items-center gap-2">
                            {meta.label}
                            <span className={`text-[10px] px-1.5 py-0.5 rounded ${draft.source === 'user' ? 'bg-[#eff6ff] text-[#1d4ed8]' : draft.source === 'env' ? 'bg-[#f5f3ff] text-[#6d28d9]' : 'bg-[#f4f4f5] text-[#71717a]'}`}>
                              {draft.source === 'user' ? '面板配置' : draft.source === 'env' ? '环境变量' : '离线兜底'}
                            </span>
                          </div>
                          <div className="text-[11px] text-[#8a8a90] mt-0.5">{meta.hint}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          {draft.masked && <span className="text-[11px] text-[#22c55e]">已存 {draft.masked}</span>}
                          <button onClick={() => testSeam(meta.id)} disabled={probing !== null} aria-label={`测试 ${meta.short}`} className="hk-pill h-7 px-2.5 text-[11px]">
                            {probing === meta.id ? '测试中…' : '测试'}
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {meta.presets.map((preset) => (
                          <button
                            key={preset.label}
                            onClick={() => setSeams((current) => ({ ...current, [meta.id]: { ...current[meta.id], baseUrl: preset.baseUrl, model: preset.model ?? current[meta.id].model } }))}
                            className="text-[11px] px-2 py-0.5 rounded-full border bg-white hover:bg-[#f4f4f5]"
                          >
                            {preset.label}
                          </button>
                        ))}
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <input
                          value={draft.baseUrl}
                          onChange={(e) => setSeams((current) => ({ ...current, [meta.id]: { ...current[meta.id], baseUrl: e.target.value } }))}
                          placeholder={meta.urlPlaceholder}
                          aria-label={`${meta.short} base url`}
                          className="w-full h-8 px-2.5 rounded-md border bg-white text-[12px] outline-none focus:border-[#a1a1aa]"
                        />
                        <input
                          value={draft.model}
                          onChange={(e) => setSeams((current) => ({ ...current, [meta.id]: { ...current[meta.id], model: e.target.value } }))}
                          placeholder={meta.modelPlaceholder}
                          aria-label={`${meta.short} model`}
                          className="w-full h-8 px-2.5 rounded-md border bg-white text-[12px] outline-none focus:border-[#a1a1aa]"
                        />
                      </div>
                      {meta.id === 'tts' && (
                        <input
                          value={draft.voice}
                          onChange={(e) => setSeams((current) => ({ ...current, [meta.id]: { ...current[meta.id], voice: e.target.value } }))}
                          placeholder="音色 ID（可选）：供应商自己的音色标识，如 Moss 的 voice_id"
                          aria-label={`${meta.short} voice id`}
                          className="w-full h-8 px-2.5 rounded-md border bg-white text-[12px] outline-none focus:border-[#a1a1aa]"
                        />
                      )}
                      <input
                        type="password"
                        value={draft.apiKey}
                        onChange={(e) => setSeams((current) => ({ ...current, [meta.id]: { ...current[meta.id], apiKey: e.target.value } }))}
                        placeholder={draft.masked ? '留空保持当前密钥，输入新值覆盖（本地服务通常不需要）' : 'API Key（本地服务可留空）'}
                        aria-label={`${meta.short} api key`}
                        className="w-full h-8 px-2.5 rounded-md border bg-white text-[12px] outline-none focus:border-[#a1a1aa]"
                      />

                      {result && (
                        <div className={`p-2.5 rounded-md border text-[11px] ${result.ok ? 'bg-[#f0fdf4] border-[#bbf7d0] text-[#166534]' : 'bg-[#fef2f2] border-[#fecaca] text-[#991b1b]'}`}>
                          <div className="font-medium">
                            {result.ok ? `✓ 连通（${result.probe} 探针 · ${result.status} · ${result.latency_ms}ms）` : `✗ 失败（${result.probe} 探针 · ${result.status || '网络'}）`}
                          </div>
                          <div className="mt-0.5 opacity-90 break-all">{(result.error ? `${result.error} · ` : '') + (result.sample ?? '').slice(0, 160)}</div>
                        </div>
                      )}
                    </div>
                  )
                })}

                {byokStatusMsg && <div className="text-[12px] text-[#2563eb] font-medium">{byokStatusMsg}</div>}

                <div className="flex items-center justify-between pt-2 border-t">
                  <button onClick={clearByok} className="hk-pill text-[#dc2626] border-[#fecaca]">清除全部配置</button>
                  <button onClick={saveByok} disabled={byokSaving} className="h-8 px-4 rounded-lg bg-[#0a0a0a] text-white text-[12px] font-medium hover:bg-[#27272a] transition-colors">
                    {byokSaving ? '保存中…' : '保存配置'}
                  </button>
                </div>
              </div>
            )}
            {tab === 'subscription' && (
              <>
                <h3 className="text-[15px] font-semibold">授权与运行方式</h3>
                <div className="hk-card p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-[#eff6ff] text-[#1d4ed8]">本地 BYOK 版</span>
                      <div className="mt-2 text-[#3d3d3f]">无账号体系、无积分、无订阅：所有模型调用由你填写的密钥直接驱动</div>
                      <div className="text-[12px] text-[#8a8a90] mt-0.5">数据留在本机（`var/data`），媒体文件同样落本地磁盘</div>
                    </div>
                    <button className="hk-pill" onClick={() => setTab('byok')}>配置模型</button>
                  </div>
                  <div className="grid grid-cols-5 gap-2 pt-1">
                    {SEAM_META.map((meta) => {
                      const draft = seams[meta.id]
                      const ready = draft.source !== 'none' || Boolean(draft.baseUrl)
                      return (
                        <div key={meta.id} className="text-center rounded-lg border p-2">
                          <div className={`text-[11px] font-medium ${ready ? 'text-[#166534]' : 'text-[#8a8a90]'}`}>{ready ? '已接入' : '离线'}</div>
                          <div className="text-[10px] text-[#8a8a90] mt-0.5">{meta.short}</div>
                        </div>
                      )
                    })}
                  </div>
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
