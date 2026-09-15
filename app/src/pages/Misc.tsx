import { useEffect, useState, useRef } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router'
import { Check, Sparkles, Copy, Key, ShieldCheck, Cpu, ArrowRight, ArrowLeft, ArrowUp } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import { apiGet, apiPost } from '@/lib/api'
import { useUser } from '@/lib/user'
import { SettingsDialog } from '@/components/SettingsDialog'

// [S28] 订阅 / 定价：已全面转为纯 BYOK 架构，不涉及任何商业付费，所有外部模型均自由配置
export function Subscription() {
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [invite, setInvite] = useState('')
  const [copied, setCopied] = useState(false)

  const genInvite = async () => {
    const r: { invite_link?: string; link?: string; invite_id?: string } = await apiPost<{ invite_link?: string; link?: string; invite_id?: string }>('/invite/generate_invite_register_link_with_rewards', { invite_type: 'type-001' }).catch(() => ({}))
    setInvite(r.invite_link ?? r.link ?? `${location.origin}/signup?ref=${r.invite_id ?? 'demo'}`)
  }

  return (
    <div className="mx-auto max-w-[1080px] px-8 pb-16 pt-4">
      <div className="text-center max-w-[680px] mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#fdf6e3] text-[#a16207] text-[12px] font-semibold mb-3">
          <Sparkles size={13} /> BYOK 终身自由计划 · 无商业付费与积分壁垒
        </div>
        <h1 className="text-[28px] font-semibold tracking-tight">所有能力自由驱动，随心接入任意大模型</h1>
        <p className="text-[14px] text-[#6b6b70] mt-2 leading-relaxed">
          本项目已全面废除积分消耗与付费订阅。即时协助、课程打造、白板教学、测验出题与深度学习全部免费开放；通过配置自有 API Key (BYOK)，即可无限制调用真实外部模型。
        </p>
      </div>

      <div className="grid grid-cols-3 gap-5 mt-10">
        {/* Card 1: 离线模拟 */}
        <div className="hk-card p-6 flex flex-col">
          <div className="flex items-center justify-between">
            <span className="text-[16px] font-semibold">离线模拟模式</span>
            <span className="text-[11px] px-2 py-0.5 rounded bg-[#f4f4f5] text-[#71717a] font-medium">免配置</span>
          </div>
          <div className="mt-3 text-[32px] font-semibold">$0<span className="text-[13px] text-[#8a8a90] font-normal">/永久</span></div>
          <div className="text-[12px] text-[#16a34a] font-medium">无需 API 密钥 · 开箱即用</div>
          <ul className="mt-5 space-y-2.5 text-[13px] flex-1 text-[#3d3d3f]">
            <li className="flex items-start gap-2"><Check size={14} className="mt-0.5 text-[#16a34a] shrink-0" />内置 6 大核心技能离线模拟管线</li>
            <li className="flex items-start gap-2"><Check size={14} className="mt-0.5 text-[#16a34a] shrink-0" />全量白板推导、测验题库与知识卡片</li>
            <li className="flex items-start gap-2"><Check size={14} className="mt-0.5 text-[#16a34a] shrink-0" />33 门课程集市全量离线浏览与学习</li>
            <li className="flex items-start gap-2"><Check size={14} className="mt-0.5 text-[#16a34a] shrink-0" />无需网络也能完整体验所有教学流程</li>
          </ul>
          <button onClick={() => setSettingsOpen(true)} className="mt-6 h-10 rounded-full border text-[13px] font-medium hover:bg-[#fafafa]">查看当前配置</button>
        </div>

        {/* Card 2: BYOK 自由模式 */}
        <div className="hk-card p-6 flex flex-col ring-2 ring-[#0a0a0a] relative">
          <div className="absolute -top-3 left-6 text-[11px] px-2.5 py-0.5 rounded-full bg-[#0a0a0a] text-white font-medium flex items-center gap-1 shadow-sm">
            <Key size={11} /> 官方推荐 · 自由模式
          </div>
          <div className="flex items-center justify-between mt-1">
            <span className="text-[16px] font-semibold">BYOK 外部大模型接入</span>
            <span className="text-[11px] px-2 py-0.5 rounded bg-[#fdf6e3] text-[#a16207] font-semibold">无限额度</span>
          </div>
          <div className="mt-3 text-[32px] font-semibold">$0<span className="text-[13px] text-[#8a8a90] font-normal">/平台永久免费</span></div>
          <div className="text-[12px] text-[#2563eb] font-medium">无限积分 · 零平台手续费</div>
          <ul className="mt-5 space-y-2.5 text-[13px] flex-1 text-[#3d3d3f]">
            <li className="flex items-start gap-2"><Check size={14} className="mt-0.5 text-[#16a34a] shrink-0" />支持 Moonshot / Kimi 官方长上下文模型</li>
            <li className="flex items-start gap-2"><Check size={14} className="mt-0.5 text-[#16a34a] shrink-0" />支持 OpenAI / DeepSeek / OneAPI 兼容网关</li>
            <li className="flex items-start gap-2"><Check size={14} className="mt-0.5 text-[#16a34a] shrink-0" />彻底移除 10 积分课程限制与次数拦截</li>
            <li className="flex items-start gap-2"><Check size={14} className="mt-0.5 text-[#16a34a] shrink-0" />支持独立配置语音 (TTS) 与搜索密钥</li>
          </ul>
          <button onClick={() => setSettingsOpen(true)} className="mt-6 h-10 rounded-full bg-[#0a0a0a] text-white text-[13px] font-medium hover:bg-black/80 flex items-center justify-center gap-1.5 shadow-sm">
            <Key size={14} /> 立即配置模型与密钥 <ArrowRight size={14} />
          </button>
        </div>

        {/* Card 3: 本地/私有网关 */}
        <div className="hk-card p-6 flex flex-col">
          <div className="flex items-center justify-between">
            <span className="text-[16px] font-semibold">本地模型 / 私有网关</span>
            <span className="text-[11px] px-2 py-0.5 rounded bg-[#f4f4f5] text-[#71717a] font-medium">私有化</span>
          </div>
          <div className="mt-3 text-[32px] font-semibold">$0<span className="text-[13px] text-[#8a8a90] font-normal">/私有安全</span></div>
          <div className="text-[12px] text-[#71717a] font-medium">Ollama / vLLM / LocalAI</div>
          <ul className="mt-5 space-y-2.5 text-[13px] flex-1 text-[#3d3d3f]">
            <li className="flex items-start gap-2"><Check size={14} className="mt-0.5 text-[#16a34a] shrink-0" />填入本地 Base URL 即可直连私有权重</li>
            <li className="flex items-start gap-2"><Check size={14} className="mt-0.5 text-[#16a34a] shrink-0" />知识库与会话数据 100% 留在本地设备</li>
            <li className="flex items-start gap-2"><Check size={14} className="mt-0.5 text-[#16a34a] shrink-0" />完全不受第三方网络或服务限流影响</li>
            <li className="flex items-start gap-2"><Check size={14} className="mt-0.5 text-[#16a34a] shrink-0" />适配局域网教学与企业内部知识沉淀</li>
          </ul>
          <button onClick={() => setSettingsOpen(true)} className="mt-6 h-10 rounded-full border text-[13px] font-medium hover:bg-[#fafafa]">接入私有 Base URL</button>
        </div>
      </div>

      <div className="hk-card p-6 mt-8 flex items-center gap-4">
        <span className="h-10 w-10 rounded-full bg-[#fdf6e3] text-[#a16207] flex items-center justify-center shrink-0"><Sparkles size={18} /></span>
        <div className="flex-1">
          <div className="text-[14px] font-medium">开源交流与共建</div>
          <div className="text-[12px] text-[#6b6b70]">分享体验链接给好友，共同探索个性化 AI 交互教学的新范式</div>
          {invite && (
            <div className="mt-2 flex items-center gap-2 text-[12px]">
              <code className="px-2 py-1 rounded bg-[#f4f4f5] truncate max-w-[420px]">{invite}</code>
              <button onClick={() => { navigator.clipboard.writeText(invite); setCopied(true) }} className="hk-icon-btn h-7 w-7" aria-label="复制"><Copy size={12} /></button>
              {copied && <span className="text-[#16a34a]">已复制</span>}
            </div>
          )}
        </div>
        <button onClick={genInvite} className="hk-pill"><Sparkles size={13} /> 获取分享链接</button>
      </div>

      <SettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen} />
    </div>
  )
}

export function CouponCode() {
  const [code, setCode] = useState(''); const [msg, setMsg] = useState('')
  const check = async () => { try { const r = await apiPost<{ valid?: boolean; message?: string; detail?: string }>('/partner-code/check', { code }); setMsg(r.message ?? (r.valid ? '优惠码有效' : r.detail ?? '优惠码无效')) } catch { setMsg('优惠码无效') } }
  return <div className="mx-auto max-w-[480px] px-8 pt-10"><div className="hk-card p-7"><h1 className="text-[20px] font-semibold">兑换优惠码</h1><input value={code} onChange={(e) => setCode(e.target.value)} placeholder="输入合作方优惠码" className="mt-4 w-full h-11 px-3 rounded-xl border bg-white outline-none" /><button onClick={check} className="mt-3 w-full h-11 rounded-xl bg-[#0a0a0a] text-white">校验并兑换</button>{msg && <div className="mt-3 text-[13px] text-[#6b6b70]">{msg}</div>}</div></div>
}
export function PaymentResult({ ok = true }: { ok?: boolean }) { const nav = useNavigate(); return <div className="mx-auto max-w-[480px] px-8 pt-16 text-center"><div className="text-[48px]">{ok ? '🎉' : '⏳'}</div><h1 className="text-[22px] font-semibold mt-2">{ok ? '订阅已生效' : '正在验证支付…'}</h1><p className="text-[13px] text-[#6b6b70] mt-1">{ok ? 'Pro 权益已同步到你的账号' : '通常需要几秒钟'}</p><button onClick={() => nav('/')} className="mt-6 h-10 px-5 rounded-full bg-[#0a0a0a] text-white">回到首页</button></div> }
export function EmailSubscription() { const [sp] = useSearchParams(); const [done, setDone] = useState(false); return <div className="mx-auto max-w-[480px] px-8 pt-16"><div className="hk-card p-7 text-center"><h1 className="text-[20px] font-semibold">邮件订阅</h1><p className="text-[13px] text-[#6b6b70] mt-1">{sp.get('email') ?? '你的邮箱'}</p>{done ? <div className="mt-4 text-[13px]"><Check className="inline text-[#16a34a]" size={14} /> 已退订每周学习摘要</div> : <button onClick={async () => { await apiPost('/email_manager/edit_email_subscription', { email: sp.get('email'), subscribed: false }).catch(() => {}); setDone(true) }} className="mt-4 hk-pill">退订每周摘要</button>}</div></div> }

// [S29] 共享只读页
export function SharedConversation() {
  const { conversationId = '' } = useParams()
  const [data, setData] = useState<{ title?: string; history?: { role: string; content: string }[] } | null>(null)
  useEffect(() => { apiPost<typeof data>('/conversations/get_shared_conversation_data', { shared_object_id: conversationId }).then(setData).catch(() => setData({ title: '对话不存在或未公开' })) }, [conversationId])
  const items = (data?.history ?? []).filter((h) => h.role !== 'system').map((h) => { try { const p = JSON.parse(h.content) as { type?: string; message?: string; chunk?: string; content?: string }; return { role: h.role, text: p.message ?? p.chunk ?? p.content ?? '' } } catch { return { role: h.role, text: h.content } } })
  return <div className="min-h-screen" style={{ background: 'var(--app-bg)' }}><div className="mx-auto max-w-[860px] px-6 py-8"><div className="flex items-center gap-2 mb-6"><span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-[#0a0a0a] text-white"><Sparkles size={13} /></span><span className="font-semibold">betterknow</span><span className="text-[12px] text-[#8a8a90] ml-2">共享对话 · 只读</span></div><h1 className="text-[20px] font-semibold mb-6">{data?.title ?? '加载中…'}</h1><div className="space-y-4">{items.map((it, i) => it.role === 'user' ? <div key={i} className="flex justify-end"><div className="max-w-[80%] rounded-2xl bg-[#f1f2f4] px-4 py-2.5 text-[14px]">{it.text}</div></div> : <div key={i} className="hk-prose"><ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>{it.text}</ReactMarkdown></div>)}</div></div></div>
}
export function SharedCourse() {
  const { courseId = '' } = useParams(); const nav = useNavigate()
  const [c, setC] = useState<{ courseTitle?: string; courseDescription?: string; units?: { title: string }[]; marketplaceId?: string } | null>(null)
  useEffect(() => { apiGet<typeof c>(`/course-generation/courses/${courseId}`).then(setC).catch(() => setC({ courseTitle: '课程不存在或未公开' })) }, [courseId])
  return <div className="min-h-screen" style={{ background: 'var(--app-bg)' }}><div className="mx-auto max-w-[760px] px-6 py-10"><div className="hk-card p-8"><div className="text-[12px] text-[#8a8a90]">有人与你分享了一门课程</div><h1 className="hk-title-serif text-[26px] mt-2">{c?.courseTitle ?? '加载中…'}</h1><p className="text-[13px] text-[#6b6b70] mt-3 leading-6">{c?.courseDescription}</p><ol className="mt-5 space-y-1.5 text-[13px]">{c?.units?.map((u, i) => <li key={i} className="flex gap-2"><span className="h-5 w-5 rounded-md bg-[#f1f2f4] text-[11px] flex items-center justify-center">{i + 1}</span>{u.title}</li>)}</ol><button onClick={() => nav(c?.marketplaceId ? `/marketplace/${c.marketplaceId}/preview` : '/marketplace')} className="mt-6 h-10 px-5 rounded-full bg-[#0a0a0a] text-white">加入课程</button></div></div></div>
}

// [S30] 生成日志回放：/course-generation/log/:runId
export function CourseGenerationLog() {
  const { runId = '' } = useParams()
  const [log, setLog] = useState<{ run_id?: string; query?: string; steps?: { step_id: number; status: string; title?: string }[]; events?: { type: string; message?: string }[]; final_course?: { courseUuid?: string; courseTitle?: string } } | null>(null)
  const nav = useNavigate()
  useEffect(() => { apiGet<typeof log>(`/course-generation/generation-log/${runId}`).then(setLog).catch(() => setLog({})) }, [runId])
  return <div className="mx-auto max-w-[760px] px-8 pb-16"><h1 className="text-[20px] font-semibold">课程生成日志</h1><div className="text-[12px] text-[#8a8a90]">run {runId}</div>{log?.query && <div className="mt-4 rounded-2xl bg-[#f1f2f4] px-4 py-2.5 inline-block text-[14px]">{log.query}</div>}<div className="mt-4 space-y-2">{(log?.steps ?? []).map((s) => <div key={s.step_id} className="hk-card p-3 flex items-center gap-2 text-[13px]"><span className={`h-5 w-5 rounded-full flex items-center justify-center text-white ${s.status === 'done' ? 'bg-[#16a34a]' : 'bg-[#a1a1aa]'}`}><Check size={12} /></span>{s.title ?? `第 ${s.step_id + 1} 步`}<span className="ml-auto text-[#8a8a90]">{s.status}</span></div>)}{(log?.events ?? []).map((e, i) => <div key={i} className="text-[12px] text-[#6b6b70] px-1">· {e.message ?? e.type}</div>)}{!log?.steps?.length && log && <div className="text-[13px] text-[#8a8a90]">没有找到这次生成的日志</div>}</div>{log?.final_course?.courseUuid && <button onClick={() => nav(`/course/${log.final_course!.courseUuid}`)} className="mt-6 h-10 px-5 rounded-full bg-[#0a0a0a] text-white">查看课程 {log.final_course.courseTitle}</button>}</div>
}

// [S30] 深度学习：大纲页 + 会话页（/deep_learn REST + WS）
export function DeepLearnOutline() {
  const { subtaskId = '' } = useParams(); const nav = useNavigate()
  const [s, setS] = useState<{ title?: string; outline?: { title: string; detail?: string }[]; plan?: { title: string }[] } | null>(null)
  useEffect(() => { apiPost<typeof s>('/deep_learn/get_session_data', { deep_learn_session_id: subtaskId }).then(setS).catch(() => setS({})) }, [subtaskId])
  const items = s?.outline ?? s?.plan ?? []
  return <div className="mx-auto max-w-[760px] px-8 pb-16"><div className="text-[12px] text-[#8a8a90]">深度学习会话 · 大纲</div><h1 className="text-[22px] font-semibold mt-1">{s?.title ?? '深度学习'}</h1><ol className="mt-5 space-y-2">{items.map((o, i) => <li key={i} className="hk-card p-4 flex gap-3"><span className="h-6 w-6 rounded-full bg-[#f1f2f4] text-[12px] flex items-center justify-center">{i + 1}</span><div><div className="text-[14px] font-medium">{o.title}</div>{(o as { detail?: string }).detail && <div className="text-[12px] text-[#6b6b70] mt-0.5">{(o as { detail?: string }).detail}</div>}</div></li>)}{items.length === 0 && s && <div className="text-[13px] text-[#8a8a90]">这次会话还没有大纲</div>}</ol><button onClick={() => nav(`/deep-learn-session/${subtaskId}`)} className="mt-6 h-10 px-5 rounded-full bg-[#0a0a0a] text-white">进入会话</button></div>
}
export function DeepLearnSession() {
  const { sessionId = '', subtaskId } = useParams()
  const id = subtaskId ?? sessionId
  const nav = useNavigate()
  const [outline, setOutline] = useState<{ title?: string; items?: { title: string; detail?: string }[] } | null>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [msgs, setMsgs] = useState<{ who: 'teacher' | 'you'; text: string }[]>([])
  const [input, setInput] = useState('')
  const [ws, setWs] = useState<WebSocket | null>(null)
  const [streaming, setStreaming] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    apiPost<{ title?: string; outline?: { title: string; detail?: string }[]; plan?: { title: string }[] }>('/deep_learn/get_session_data', { deep_learn_session_id: id })
      .then((r) => setOutline({ title: r.title, items: r.outline ?? r.plan?.map((p) => ({ title: p.title })) ?? [] }))
      .catch(() => setOutline({ title: '深度学习', items: [] }))
  }, [id])

  useEffect(() => {
    const proto = location.protocol === 'https:' ? 'wss' : 'ws'
    const sock = new WebSocket(`${proto}://${location.host}/api/v1/deep_learn/ws?session_id=${encodeURIComponent(id)}&token=${encodeURIComponent(localStorage.getItem('access_token') ?? '')}`)
    sock.onmessage = (ev) => {
      const f = JSON.parse(ev.data) as { type: string; chunk?: string; content?: string; message?: string; spoken_text?: string; step_index?: number }
      if (f.step_index !== undefined) setCurrentStep(f.step_index)
      const t = f.chunk ?? f.content ?? f.spoken_text ?? (f.type === 'error' ? f.message : undefined)
      if (t) {
        setStreaming(true)
        setMsgs((m) => {
          const last = m[m.length - 1]
          if (last?.who === 'teacher' && f.type === 'content_chunk') return [...m.slice(0, -1), { ...last, text: last.text + t }]
          return [...m, { who: 'teacher', text: t }]
        })
      }
      if (f.type === 'complete' || f.type === 'done') setStreaming(false)
    }
    setWs(sock)
    return () => sock.close()
  }, [id])

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [msgs])

  const send = () => {
    const t = input.trim()
    if (!t || !ws) return
    ws.send(JSON.stringify({ type: 'user_message', message: t }))
    setMsgs((m) => [...m, { who: 'you', text: t }])
    setInput('')
    setStreaming(true)
  }

  return (
    <div className="flex h-[calc(100vh-52px)]">
      {/* Left: Outline Panel */}
      <aside className="w-[280px] shrink-0 border-r bg-white flex flex-col">
        <div className="p-4 border-b">
          <button onClick={() => nav('/history')} className="inline-flex items-center gap-1 text-[12px] text-[#6b6b70] hover:text-black mb-2">
            <ArrowLeft size={13} /> 返回
          </button>
          <h2 className="text-[15px] font-semibold truncate">{outline?.title ?? '深度学习'}</h2>
          <div className="text-[11px] text-[#8a8a90] mt-0.5">系统深学 · 分阶段任务</div>
        </div>
        <div className="flex-1 overflow-y-auto hk-scroll p-3 space-y-1">
          {(outline?.items ?? []).map((item, i) => (
            <div
              key={i}
              className={`flex items-start gap-2.5 p-2.5 rounded-lg text-[12px] transition-colors ${
                i === currentStep ? 'bg-[#eef2ff] text-[#3b5bdb]' : i < currentStep ? 'text-[#16a34a]' : 'text-[#6b6b70]'
              }`}
            >
              <span className={`mt-0.5 h-5 w-5 shrink-0 rounded-full flex items-center justify-center text-[10px] font-semibold ${
                i < currentStep ? 'bg-[#16a34a] text-white' : i === currentStep ? 'bg-[#3b5bdb] text-white' : 'bg-[#f1f2f4] text-[#8a8a90]'
              }`}>
                {i < currentStep ? <Check size={10} /> : i + 1}
              </span>
              <div className="flex-1 min-w-0">
                <div className="font-medium leading-4 truncate">{item.title}</div>
                {item.detail && <div className="text-[11px] opacity-70 mt-0.5 line-clamp-2">{item.detail}</div>}
              </div>
            </div>
          ))}
          {(!outline?.items || outline.items.length === 0) && outline && (
            <div className="text-[12px] text-[#8a8a90] p-2">开始对话后将自动生成学习大纲</div>
          )}
        </div>
        <div className="p-3 border-t text-[11px] text-[#8a8a90] text-center">
          进度：{currentStep} / {outline?.items?.length ?? '?'}
        </div>
      </aside>

      {/* Right: Chat */}
      <section className="flex-1 min-w-0 flex flex-col">
        <div className="flex-1 overflow-y-auto hk-scroll p-6 space-y-4">
          {msgs.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <span className="text-[36px] mb-3">📚</span>
              <div className="text-[15px] font-semibold">准备好深度学习了</div>
              <div className="text-[13px] text-[#8a8a90] mt-1 max-w-[400px]">告诉老师你想从哪里开始，或直接说「开始」让老师带你系统学习。</div>
            </div>
          )}
          {msgs.map((m, i) =>
            m.who === 'you' ? (
              <div key={i} className="flex justify-end hk-fade-in-up">
                <div className="max-w-[75%] rounded-2xl bg-[#f1f2f4] px-4 py-2.5 text-[14px] whitespace-pre-wrap">{m.text}</div>
              </div>
            ) : (
              <div key={i} className="hk-prose hk-fade-in-up">
                <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>{m.text}</ReactMarkdown>
              </div>
            )
          )}
          {streaming && (
            <div className="flex items-center gap-2 text-[12px] text-[#8a8a90]">
              <span className="h-3.5 w-3.5 rounded-full border-2 border-[#d4d4d8] border-t-[#0a0a0a] animate-spin" />
              正在思考…
            </div>
          )}
          <div ref={bottomRef} />
        </div>
        <div className="p-4 border-t">
          <div className="hk-composer p-3 flex items-center gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send()}
              placeholder="继续学习…"
              className="flex-1 bg-transparent outline-none text-[14px] px-1"
              aria-label="深度学习输入"
            />
            <button onClick={send} disabled={!input.trim() || streaming} className="h-8 w-8 rounded-full bg-[#0a0a0a] text-white flex items-center justify-center disabled:opacity-40" aria-label="发送">
              <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

// [S30] PDF 导读（SplitLayout）：左 PDF 右讲解
export function PdfSession() {
  const { sessionId = '' } = useParams()
  const [s, setS] = useState<{ session_id?: string; pdf_file_id?: string; session_title?: string } | null>(null)
  const [script, setScript] = useState<string[]>([])
  useEffect(() => {
    apiGet<{ sessions: { session_id: string; pdf_file_id?: string; session_title?: string }[] }>('/pdf-annotation/sessions').then((r) => setS(r.sessions.find((x) => x.session_id === sessionId) ?? r.sessions[0] ?? {})).catch(() => setS({}))
    const proto = location.protocol === 'https:' ? 'wss' : 'ws'
    const sock = new WebSocket(`${proto}://${location.host}/api/v1/pdf-annotation/ws?access_token=${encodeURIComponent(localStorage.getItem('access_token') ?? '')}&session_id=${encodeURIComponent(sessionId)}`)
    sock.onopen = () => sock.send(JSON.stringify({ type: 'start_teaching' }))
    sock.onmessage = (ev) => { const f = JSON.parse(ev.data) as { type: string; say?: string; question?: string; message?: string }; const t = f.say ?? f.question ?? (f.type === 'error' ? f.message : undefined); if (t) setScript((x) => [...x, t]) }
    return () => sock.close()
  }, [sessionId])
  return <div className="flex h-full"><div className="flex-1 bg-[#e9e9eb] flex items-center justify-center">{s?.pdf_file_id ? <iframe title="pdf" src={`/api/v1/pdf-annotation/pdf/${sessionId}/${s.pdf_file_id}`} className="w-[92%] h-[92%] rounded-lg bg-white shadow" /> : <div className="text-[13px] text-[#6b6b70]">{s ? '尚未上传 PDF —— 在即时协助里附上 PDF 并选择「白板课堂」即可逐页讲解' : '加载中…'}</div>}</div><aside className="w-[360px] border-l bg-white p-4 space-y-3 text-[13px] leading-6 overflow-y-auto hk-scroll"><div className="font-semibold">{s?.session_title ?? 'PDF 导读'}</div>{script.map((t, i) => <div key={i} className="hk-fade-in-up">{t}</div>)}</aside></div>
}

export function DevCsmPreview() { return <div className="p-10 text-[13px] text-[#8a8a90]">/dev/csm — 内部客服预览面（契约来源，无用户可见功能）</div> }
export function SampleMindmap() { return <div className="p-10"><h1 className="text-[20px] font-semibold">思维导图示例</h1><div className="hk-card mt-4 p-6 text-[13px] text-[#6b6b70]">示例响应：可视化能力会把回答渲染为思维导图（New）</div></div> }
