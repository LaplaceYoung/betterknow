import { useEffect, useState, useRef } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router'
import { Check, Sparkles, Copy, Key, ShieldCheck, Cpu, ArrowRight, ArrowLeft, ArrowUp } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
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
  const contentRef = useRef<HTMLDivElement | null>(null)
  // 线上 .scroll-to-bottom-button：内容滚上去后出现
  const [showJump, setShowJump] = useState(false)
  useEffect(() => {
    const el = contentRef.current
    if (!el) return
    const onScroll = () => {
      const distance = el.scrollHeight - el.scrollTop - el.clientHeight
      setShowJump(distance > 240)
    }
    onScroll()
    el.addEventListener('scroll', onScroll)
    return () => el.removeEventListener('scroll', onScroll)
  }, [msgs.length])

  useEffect(() => {
    apiPost<{ title?: string; outline?: { title: string; detail?: string }[]; plan?: { title: string }[] }>('/deep_learn/get_session_data', { deep_learn_session_id: id })
      .then((r) => setOutline({ title: r.title, items: r.outline ?? r.plan?.map((p) => ({ title: p.title })) ?? [] }))
      .catch(() => setOutline({ title: '深度学习', items: [] }))
  }, [id])

  useEffect(() => {
    const proto = location.protocol === 'https:' ? 'wss' : 'ws'
    const sock = new WebSocket(`${proto}://${location.host}/api/v1/deep_learn/ws?session_id=${encodeURIComponent(id)}&token=${encodeURIComponent(localStorage.getItem('access_token') ?? '')}`)
    sock.onmessage = (ev) => {
      const f = JSON.parse(ev.data) as {
        type: string; chunk?: string; content?: string; message?: string; spoken_text?: string; step_index?: number
        task_plan?: { title?: string; session_task_plan?: Array<{ unit_name: string; tasks: Array<{ task_id: string; task_title: string; task_description: string }> }> }
        current_step_id?: string
        placeholder_id?: string
        data?: { layout?: string; tag?: string; caption?: string }
        step_data?: { task_id?: string; task_title?: string }
        next_step?: { task_id?: string; task_title?: string }
      }
      if (f.step_index !== undefined) setCurrentStep(f.step_index)
      // 会话计划（线上 resumed/created 帧带 task_plan）→ 大纲 + 当前步
      if (f.task_plan?.session_task_plan) {
        const items = f.task_plan.session_task_plan.flatMap((unit) => unit.tasks.map((task) => ({ title: `${unit.unit_name} · ${task.task_title}`, detail: task.task_description, task_id: task.task_id })))
        setOutline((current) => ({ title: f.task_plan?.title ?? current?.title ?? '深度学习', items }))
        const index = items.findIndex((item) => item.task_id === f.current_step_id)
        if (index >= 0) setCurrentStep(index)
      }
      // 图解（线上 inline_diagram 的 tag 里带 data-file-url）
      if (f.type === 'inline_diagram') {
        const url = /data-file-url="([^"]+)"/.exec(f.data?.tag ?? '')?.[1]
        const caption = /data-caption="([^"]*)"/.exec(f.data?.tag ?? '')?.[1]
        if (url) setMsgs((m) => [...m, { who: 'teacher', text: `${caption ? `${caption}\n` : ''}![图解](${url})` }])
      }
      // 步骤完成：给出下一步提示（线上需要客户端确认）
      if (f.type === 'step_completion' && f.next_step) {
        setMsgs((m) => [...m, { who: 'teacher', text: `✓ 本步完成${f.next_step?.task_title ? ` · 下一步：${f.next_step.task_title}` : ''}` }])
        sock.send(JSON.stringify({ type: 'step_acknowledged', step_id: f.next_step.task_id }))
      }
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
    <div className="learning-session-page" data-testid="deep-learn-session">
      <div className="learning-session-layout">
        <div className="session-outline" data-testid="session-outline">
          <div className="outline-content">
            <button onClick={() => nav('/history')} className="outline-item" style={{ marginBottom: 12 }}>
              <span className="item-radio" aria-hidden="true" />
              <span className="item-title">‹ 返回历史</span>
            </button>
            <p className="outline-unit-name">{outline?.title ?? '深度学习'}</p>
            {outline?.items?.length ? outline.items.map((item, i) => {
              const state = i === currentStep ? 'current' : i < currentStep ? 'done' : 'pending'
              return (
                <div className="outline-unit" key={i}>
                  <div className={`outline-item ${state === 'current' ? 'current' : ''} ${state === 'pending' ? 'locked' : ''}`} role="button" tabIndex={0}
                    onClick={() => setCurrentStep(i)} onKeyDown={(e) => e.key === 'Enter' && setCurrentStep(i)}>
                    <span className="item-radio" data-state={state} aria-hidden="true">{state === 'done' ? '✓' : ''}</span>
                    <span className="item-title">{item.title}</span>
                  </div>
                </div>
              )
            }) : <div className="text-[12px] text-[#8a8a90] p-2">开始对话后将自动生成学习大纲</div>}
          </div>
          <div className="outline-nav">
            <button className="outline-nav-btn outline-nav-btn--prev" disabled={currentStep <= 0} onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}>
              ‹ <span className="outline-nav-label">{outline?.items?.[currentStep - 1]?.title ?? '上一步'}</span>
            </button>
            <button className="outline-nav-btn outline-nav-btn--next" disabled={!outline?.items?.length || currentStep >= (outline?.items?.length ?? 1) - 1}
              onClick={() => setCurrentStep((s) => Math.min((outline?.items?.length ?? 1) - 1, s + 1))}>
              <span className="outline-nav-label">{outline?.items?.[currentStep + 1]?.title ?? '下一步'}</span> ›
            </button>
          </div>
        </div>

        <div className="session-main-content-wrapper">
          <div className="session-main-content hk-scroll" ref={(el) => { if (el) contentRef.current = el }}>
            {msgs.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <span className="text-[36px] mb-3">📚</span>
                <div className="text-[15px] font-semibold">准备好深度学习了</div>
                <div className="text-[13px] text-[#8a8a90] mt-1 max-w-[400px]">告诉老师你想从哪里开始，或直接说「开始」按大纲推进。</div>
              </div>
            )}
            {msgs.map((m, i) => m.who === 'you' ? (
              <div key={i} className="flex justify-end hk-fade-in-up">
                <div className="max-w-[75%] rounded-2xl bg-[#f1f2f4] px-4 py-2.5 text-[14px] whitespace-pre-wrap">{m.text}</div>
              </div>
            ) : (
              <div key={i} className="hk-prose hk-fade-in-up"><ReactMarkdown remarkPlugins={[remarkMath, remarkGfm]} rehypePlugins={[rehypeRaw]}>{m.text}</ReactMarkdown></div>
            ))}
            {streaming && (
              <div className="flex items-center gap-2 text-[12px] text-[#8a8a90]">
                <span className="h-3.5 w-3.5 rounded-full border-2 border-[#d4d4d8] border-t-[#0a0a0a] animate-spin" />
                智能体正在沉思
              </div>
            )}
            <div ref={bottomRef} />
          </div>
          {showJump && (
            <button className="scroll-to-bottom-button" aria-label="回到底部" data-testid="scroll-to-bottom"
              onClick={() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' })}>↓</button>
          )}
          <div className="session-input-container">
            <div className="session-input-bar">
              <input
                className="session-input-field"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }}
                placeholder="输入你的问题或回答…"
                aria-label="输入你的问题或回答"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// [S30] PDF 导读（SplitLayout）：左 PDF 右讲解
export function PdfSession() {
  const { sessionId = '' } = useParams()
  const [s, setS] = useState<{ session_id?: string; pdf_file_id?: string; session_title?: string } | null>(null)
  const [script, setScript] = useState<{ say: string; kind?: string; text?: string; page?: number }[]>([])
  const [page, setPage] = useState(0)
  const [pdf, setPdf] = useState<{ url: string; fileId: string } | null>(null)
  const [highlights, setHighlights] = useState<Record<number, string[]>>({})
  const [pageText, setPageText] = useState<Record<number, string>>({})
  const [totalPages, setTotalPages] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const wsRef = useRef<WebSocket | null>(null)

  useEffect(() => {
    apiGet<{ sessions: { session_id: string; pdf_file_id?: string; session_title?: string }[] }>('/pdf-annotation/sessions')
      .then((r) => setS(r.sessions.find((x) => x.session_id === sessionId) ?? r.sessions[0] ?? {})).catch(() => setS({}))
    const proto = location.protocol === 'https:' ? 'wss' : 'ws'
    const sock = new WebSocket(`${proto}://${location.host}/api/v1/pdf-annotation/ws?access_token=${encodeURIComponent(localStorage.getItem('access_token') ?? '')}&session_id=${encodeURIComponent(sessionId)}`)
    wsRef.current = sock
    sock.onopen = () => sock.send(JSON.stringify({ type: 'resume_session', session_id: sessionId }))
    const speak = (text: string, url?: string) => { if (!url) return; const audio = new Audio(url); void audio.play().catch(() => {}) }
    sock.onmessage = (ev) => {
      const f = JSON.parse(ev.data) as { type: string; say?: string; text?: string; question?: string; message?: string; page_index?: number; tts_url?: string; pdf_state?: { file_id?: string; annotations?: { page_index?: number; text?: string }[] }; file_id?: string }
      if (f.type === 'session_ready' && (f.pdf_state?.file_id || f.file_id)) setPdf({ url: `/api/v1/pdf-annotation/pdf/${sessionId}/${f.pdf_state?.file_id ?? f.file_id}`, fileId: String(f.pdf_state?.file_id ?? f.file_id) })
      if (f.type === 'speak') { setScript((x) => [...x, { say: String(f.say ?? ''), kind: 'speak', page: f.page_index ?? 0 }]); speak(String(f.say ?? ''), f.tts_url) }
      if (f.type === 'annotation') {
        const index = f.page_index ?? 0
        setHighlights((h) => ({ ...h, [index]: [...(h[index] ?? []), String(f.text ?? '')] }))
        setScript((x) => [...x, { say: String(f.say ?? f.text ?? ''), kind: 'annotation', text: f.text, page: index }])
        speak(String(f.say ?? ''), f.tts_url)
      }
      if (f.type === 'go_to_page') setPage(Number((f as { page?: number }).page ?? 0))
      if (f.type === 'ask') setScript((x) => [...x, { say: String(f.question ?? ''), kind: 'ask' }])
      if (f.type === 'interject_text') setScript((x) => [...x, { say: String((f as { delta?: string }).delta ?? ''), kind: 'interject' }])
      if (f.type === 'interject_audio') speak(String((f as { text?: string }).text ?? ''), (f as { audio_url?: string }).audio_url)
      if (f.type === 'error') setScript((x) => [...x, { say: String(f.message ?? '出错了'), kind: 'error' }])
    }
    return () => sock.close()
  }, [sessionId])

  // 用 pdf.js 渲染当前页，并把 annotation 里的短语标出来（线上 annotation.text 就是页面里要高亮的原文）
  useEffect(() => {
    if (!pdf) return
    let cancelled = false
    void (async () => {
      const pdfjs = await import('pdfjs-dist')
      pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString()
      const doc = await pdfjs.getDocument({ url: pdf.url }).promise
      if (cancelled) return
      setTotalPages(doc.numPages)
      const target = Math.min(Math.max(page + 1, 1), doc.numPages)
      const pdfPage = await doc.getPage(target)
      const viewport = pdfPage.getViewport({ scale: 1.4 })
      const canvas = canvasRef.current
      if (!canvas || cancelled) return
      canvas.width = viewport.width
      canvas.height = viewport.height
      const context = canvas.getContext('2d')
      if (context) await pdfPage.render({ canvasContext: context, viewport }).promise
      const content = await pdfPage.getTextContent()
      const text = content.items.map((item) => ('str' in item ? item.str : '')).join(' ')
      setPageText((t) => ({ ...t, [page]: text }))
      const annotated = highlights[page] ?? []
      if (annotated.length && wsRef.current?.readyState === WebSocket.OPEN) {
        wsRef.current.send(JSON.stringify({ type: 'sync_pdf_state', pdf_state: { revision: Date.now(), file_id: pdf.fileId, current_page: target, total_pages: doc.numPages, annotations: Object.entries(highlights).flatMap(([index, items]) => items.map((item) => ({ page_index: Number(index), text: item }))) } }))
      }
    })().catch(() => undefined)
    return () => { cancelled = true }
  }, [pdf, page, highlights])

  const asked = (text: string) => {
    if (!text.trim()) return
    wsRef.current?.send(JSON.stringify({ type: 'interject_question', text }))
    setScript((x) => [...x, { say: text, kind: 'you' }])
  }
  const [draft, setDraft] = useState('')
  const marks = highlights[page] ?? []

  return (
    <div className="flex h-full">
      <div className="flex-1 bg-[#e9e9eb] flex flex-col items-center overflow-auto hk-scroll py-6 gap-3">
        {pdf ? (
          <>
            <canvas ref={canvasRef} className="rounded-lg bg-white shadow max-w-[92%]" />
            <div className="flex items-center gap-2 text-[12px] text-[#3d3d3f]">
              <button onClick={() => setPage((p) => Math.max(0, p - 1))} disabled={page === 0} className="hk-pill h-8 px-3 disabled:opacity-40">上一页</button>
              <span>{page + 1} / {totalPages || '…'}</span>
              <button onClick={() => setPage((p) => Math.min((totalPages || 1) - 1, p + 1))} disabled={totalPages > 0 && page >= totalPages - 1} className="hk-pill h-8 px-3 disabled:opacity-40">下一页</button>
            </div>
            {marks.length > 0 && (
              <div className="max-w-[92%] hk-card px-3.5 py-2.5 w-full" data-testid="pdf-annotations">
                <div className="text-[11px] text-[#8a8a90] mb-1.5">本页标注 · {marks.length} 处</div>
                <ul className="space-y-1">
                  {marks.map((mark, index) => (
                    <li key={index} className="text-[12px] text-[#3d3d3f]">
                      <mark className="bg-[#fde68a] px-1 rounded">{mark}</mark>
                      {pageText[page]?.includes(mark) ? <span className="text-[11px] text-[#8a8a90] ml-2">已在页面文本中定位</span> : null}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        ) : <div className="text-[13px] text-[#6b6b70]">{s ? '尚未上传 PDF —— 在即时帮助里附上 PDF 并选择「白板课堂」即可逐页讲解' : '加载中…'}</div>}
      </div>
      <aside className="w-[360px] border-l bg-white flex flex-col">
        <div className="px-4 py-3 border-b flex items-center gap-2">
          <span className="text-[13px] font-semibold flex-1 truncate">{s?.session_title ?? 'PDF 导读'}</span>
          <button onClick={() => wsRef.current?.send(JSON.stringify({ type: 'start_teaching' }))} className="hk-pill h-8 px-3 text-[12px]">开始导读</button>
        </div>
        <div className="flex-1 overflow-y-auto hk-scroll p-4 space-y-2 text-[13px] leading-6">
          {script.map((row, index) => (
            <div key={index} className={`hk-fade-in-up ${row.kind === 'annotation' ? 'border-l-2 border-[#f59e0b] pl-2' : ''} ${row.kind === 'you' ? 'text-[#1d4ed8]' : ''}`}>
              {row.kind === 'annotation' && <span className="text-[11px] text-[#8a8a90] block">{row.text}</span>}
              {row.say}
            </div>
          ))}
          {script.length === 0 && <div className="text-[12px] text-[#8a8a90]">等待老师开始…</div>}
        </div>
        <form className="p-3 border-t flex items-center gap-2" onSubmit={(e) => { e.preventDefault(); asked(draft); setDraft('') }}>
          <input value={draft} onChange={(e) => setDraft(e.target.value)} aria-label="PDF 提问" placeholder="就这一页提问…" className="flex-1 text-[13px] outline-none bg-transparent px-1" />
          <button className="h-8 px-3 rounded-full bg-[#0a0a0a] text-white text-[12px]">提问</button>
        </form>
      </aside>
    </div>
  )
}

export function DevCsmPreview() { return <div className="p-10 text-[13px] text-[#8a8a90]">/dev/csm — 内部客服预览面（契约来源，无用户可见功能）</div> }

interface MindmapNode {
  id: string
  title: string
  detail?: string
  tag?: string
  children?: MindmapNode[]
}

const SAMPLE_TREES: Record<string, { title: string; root: MindmapNode }> = {
  quantum: {
    title: '量子计算核心知识拓扑图',
    root: {
      id: 'root',
      title: '量子计算第一性原理',
      detail: '基于量子力学基本公理与线性代数复数希尔伯特空间的全新计算范式',
      tag: '核心根节点',
      children: [
        {
          id: 'math',
          title: '数学语言：希尔伯特空间',
          detail: '向量空间公理、内积、柯西-施瓦茨不等式与狄拉克符号系统',
          tag: '数学公理',
          children: [
            { id: 'math-1', title: '态矢量 |ψ⟩ 与对偶空间 ⟨ψ|', detail: '行向量与列向量的复共轭转置映射' },
            { id: 'math-2', title: '正交归一化基矢', detail: '总概率守恒条件：|α|² + |β|² = 1' },
            { id: 'math-3', title: '厄米算符与自伴性', detail: '物理可观测量对应厄米矩阵，特征值必然为实数' },
          ],
        },
        {
          id: 'qubit',
          title: '量子比特与叠加态',
          detail: '经典比特向二维复平面的扩展，布洛赫球面几何表征',
          tag: '物理基础',
          children: [
            { id: 'qubit-1', title: '布洛赫球 (Bloch Sphere)', detail: '极角 θ 与方位角 φ 刻画纯态在三维单位球面上的分布' },
            { id: 'qubit-2', title: '阿达马门 (Hadamard Gate)', detail: '创建均等叠加态：H|0⟩ = (|0⟩+|1⟩)/√2' },
            { id: 'qubit-3', title: '量子干涉效应', detail: '相长干涉与相消干涉在振幅层面的代数求和' },
          ],
        },
        {
          id: 'algo',
          title: '前沿量子算法实战',
          detail: '利用量子并行性打破经典多项式时间复杂度极限',
          tag: '算法突破',
          children: [
            { id: 'algo-1', title: 'Shor 大数分解算法', detail: '利用量子傅里叶变换（QFT）求模指数周期，指数加速破解 RSA' },
            { id: 'algo-2', title: 'Grover 无序数据库搜索', detail: '振幅放大技术实现 O(√N) 级别二次加速' },
            { id: 'algo-3', title: '量子纠错码 (QEC)', detail: '表面码（Surface Codes）对抗环境热噪声退相干' },
          ],
        },
      ],
    },
  },
  ai: {
    title: '深度学习与 Transformer 知识图谱',
    root: {
      id: 'root-ai',
      title: '现代深度学习架构基石',
      detail: '从计算图求导到自注意力与基础大语言模型',
      tag: '核心系统',
      children: [
        {
          id: 'backprop',
          title: '计算图与自动微分',
          detail: '多元微积分链式法则在有向无环图上的反向传播',
          tag: '优化理论',
          children: [
            { id: 'bp-1', title: '链式法则雅可比矩阵', detail: '梯度向量在计算节点间的反向递归传递' },
            { id: 'bp-2', title: '梯度消失与爆炸', detail: '深层网络连乘衰减，引出残差连接与 LayerNorm' },
          ],
        },
        {
          id: 'transformer',
          title: 'Transformer 自注意力机制',
          detail: 'Attention Is All You Need: Q, K, V 缩放点积匹配',
          tag: '核心模型',
          children: [
            { id: 'tf-1', title: 'Scaled Dot-Product Attention', detail: 'Softmax(QK^T / √d_k) V 动态上下文寻址' },
            { id: 'tf-2', title: '多头注意力 (Multi-Head)', detail: '投影到不同表示子空间并行捕获多元语义相关性' },
            { id: 'tf-3', title: '旋转位置编码 (RoPE)', detail: '复数域旋转乘法注入相对位置信息，支持外推扩展' },
          ],
        },
      ],
    },
  },
}

export function SampleMindmap() {
  const [topicKey, setTopicKey] = useState<'quantum' | 'ai'>('quantum')
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({})
  const [activeNode, setActiveNode] = useState<MindmapNode | null>(null)
  const [scale, setScale] = useState(1)

  const tree = SAMPLE_TREES[topicKey]

  const toggleCollapse = (id: string) => {
    setCollapsed((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className="mx-auto max-w-[1180px] px-6 py-6 pb-24">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-5">
        <div>
          <div className="text-[12px] font-semibold text-[#3b5bdb] uppercase tracking-wider">
            交互式思维导图 · 知识拓扑引擎 (Interactive Mindmap)
          </div>
          <h1 className="text-[24px] font-semibold tracking-tight text-[#0a0a0a] mt-1">
            {tree.title}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          {/* Topic Switcher */}
          <div className="flex bg-[#f4f4f5] p-1 rounded-xl text-[12px]">
            <button
              onClick={() => {
                setTopicKey('quantum')
                setActiveNode(null)
              }}
              className={`px-3 py-1 rounded-lg font-medium transition-all ${
                topicKey === 'quantum' ? 'bg-white text-black shadow-sm' : 'text-[#6b6b70]'
              }`}
            >
              量子计算导论
            </button>
            <button
              onClick={() => {
                setTopicKey('ai')
                setActiveNode(null)
              }}
              className={`px-3 py-1 rounded-lg font-medium transition-all ${
                topicKey === 'ai' ? 'bg-white text-black shadow-sm' : 'text-[#6b6b70]'
              }`}
            >
              深度学习与 Transformer
            </button>
          </div>

          {/* Zoom controls */}
          <div className="flex items-center gap-1 bg-[#f4f4f5] p-1 rounded-xl text-[12px]">
            <button
              onClick={() => setScale((s) => Math.min(s + 0.1, 1.4))}
              className="hk-icon-btn h-7 w-7 text-[#6b6b70] hover:text-black"
              title="放大"
            >
              +
            </button>
            <span className="text-[11px] px-1 text-[#8a8a90] font-mono">{Math.round(scale * 100)}%</span>
            <button
              onClick={() => setScale((s) => Math.max(s - 0.1, 0.7))}
              className="hk-icon-btn h-7 w-7 text-[#6b6b70] hover:text-black"
              title="缩小"
            >
              -
            </button>
            <button
              onClick={() => setScale(1)}
              className="hk-icon-btn h-7 w-7 text-[#6b6b70] hover:text-black text-[11px]"
              title="重置缩放"
            >
              1:1
            </button>
          </div>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="mt-6 border rounded-2xl bg-[#fafafa] overflow-auto hk-scroll p-8 min-h-[540px] relative shadow-inner">
        <div
          style={{ transform: `scale(${scale})`, transformOrigin: 'top left', transition: 'transform 0.2s ease-out' }}
          className="min-w-[800px]"
        >
          {/* Root Node */}
          <div className="flex items-center gap-4 mb-8">
            <div
              onClick={() => setActiveNode(tree.root)}
              className="cursor-pointer px-5 py-3.5 rounded-2xl bg-[#0a0a0a] text-white shadow-md hover:scale-105 transition-transform max-w-[280px]"
            >
              <div className="text-[10px] uppercase font-bold text-[#818cf8] tracking-widest">
                {tree.root.tag}
              </div>
              <div className="text-[16px] font-semibold mt-0.5">{tree.root.title}</div>
            </div>
            <div className="text-[12px] text-[#8a8a90] max-w-[340px]">
              点击任意节点展开/收起分支，或查看知识定义与第一性原理推导
            </div>
          </div>

          {/* Main Branches */}
          <div className="space-y-6 pl-6 border-l-2 border-[#e4e4e7] ml-6">
            {(tree.root.children ?? []).map((branch) => {
              const isCollapsed = collapsed[branch.id]
              return (
                <div key={branch.id} className="relative">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleCollapse(branch.id)}
                      className="h-6 w-6 rounded-full bg-white border flex items-center justify-center text-[12px] text-[#6b6b70] hover:border-black transition-colors"
                      title={isCollapsed ? '展开子分支' : '收起子分支'}
                    >
                      {isCollapsed ? '+' : '−'}
                    </button>
                    <div
                      onClick={() => setActiveNode(branch)}
                      className="cursor-pointer px-4 py-2.5 rounded-xl bg-white border border-[#e4e4e7] hover:border-[#3b5bdb] hover:shadow-sm transition-all text-left max-w-[320px]"
                    >
                      {branch.tag && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#eef2ff] text-[#3b5bdb] font-medium mr-1.5">
                          {branch.tag}
                        </span>
                      )}
                      <span className="text-[14px] font-semibold text-[#1c1c1e]">{branch.title}</span>
                    </div>
                  </div>

                  {/* Subtopics */}
                  {!isCollapsed && branch.children && (
                    <div className="mt-3 pl-8 border-l border-dashed border-[#d4d4d8] ml-3 space-y-2.5">
                      {branch.children.map((sub) => (
                        <div
                          key={sub.id}
                          onClick={() => setActiveNode(sub)}
                          className="cursor-pointer px-3.5 py-2 rounded-xl bg-white border border-[#f4f4f5] hover:border-[#a1a1aa] transition-all text-[13px] text-[#3d3d3f] flex items-center justify-between max-w-[360px] shadow-2xs hover:shadow-sm"
                        >
                          <span className="font-medium text-[#0a0a0a]">{sub.title}</span>
                          <span className="text-[11px] text-[#8a8a90] ml-2">详情 →</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Node Detail Drawer / Popover */}
        {activeNode && (
          <div className="absolute right-6 top-6 w-[340px] bg-white rounded-2xl shadow-xl border p-5 hk-fade-in z-20">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#f1f2f4] font-semibold text-[#6b6b70]">
                {activeNode.tag ?? '知识节点'}
              </span>
              <button
                onClick={() => setActiveNode(null)}
                className="hk-icon-btn h-6 w-6 text-[#8a8a90] hover:text-black text-[12px]"
              >
                ✕
              </button>
            </div>
            <h3 className="text-[16px] font-semibold text-[#0a0a0a]">{activeNode.title}</h3>
            <p className="text-[13px] text-[#4b4b50] leading-6 mt-3">
              {activeNode.detail ?? '该知识点构成了本体系的核心推导环节。'}
            </p>
            <div className="mt-4 pt-3 border-t flex items-center justify-between text-[12px]">
              <span className="text-[#8a8a90]">已收录于 betterknow 知识图谱</span>
              <button
                onClick={() => setActiveNode(null)}
                className="hk-pill h-7 px-3 text-[11px] font-medium"
              >
                关闭
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
