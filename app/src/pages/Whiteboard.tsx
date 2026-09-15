import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { ArrowLeft, ArrowUp, Mic, Pause, Play, Share2, SkipBack, SkipForward, ZoomIn, ZoomOut } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import { wsUrl } from '@/lib/api'

interface Action { type: string; page_id?: string; title?: string; board_content?: string; spoken_text?: string; say?: string; text?: string; question?: string; step_id?: number; annotation_type?: string }
interface Page { id: string; title: string; boards: string[]; annotations: { text: string; say?: string }[] }

// [S19][D10][B10] 白板教学：/whiteboard/ws → session_ready → start_teaching → new_page/board/speak/annotation/ask/done 帧
export default function Whiteboard() {
  const { sessionId = '', courseId } = useParams()
  const nav = useNavigate()
  const wsRef = useRef<WebSocket | null>(null)
  const [title, setTitle] = useState('白板课堂')
  const [pages, setPages] = useState<Page[]>([])
  const [pageIdx, setPageIdx] = useState(0)
  const [script, setScript] = useState<{ who: 'teacher' | 'you'; text: string }[]>([])
  const [paused, setPaused] = useState(false)
  const [asking, setAsking] = useState<string | null>(null)
  const [status, setStatus] = useState<'connecting' | 'ready' | 'teaching' | 'done'>('connecting')
  const [zoom, setZoom] = useState(100)
  const [q, setQ] = useState('')
  const [revealed, setRevealed] = useState(0)
  const [credits, setCredits] = useState<string>('')

  useEffect(() => {
    const ws = new WebSocket(wsUrl('/api/v1/whiteboard/ws', { access_token: localStorage.getItem('access_token') ?? '', ...(sessionId && sessionId !== 'new' ? { session_id: sessionId } : {}) }))
    wsRef.current = ws
    const apply = (a: Action) => {
      if (a.type === 'new_page') setPages((ps) => [...ps, { id: a.page_id ?? String(ps.length), title: a.title ?? `Page ${ps.length + 1}`, boards: [], annotations: [] }])
      else if (a.type === 'board') setPages((ps) => { const next = ps.length ? [...ps] : [{ id: 'p', title: a.title ?? 'Board', boards: [], annotations: [] }]; next[next.length - 1] = { ...next[next.length - 1], boards: [...next[next.length - 1].boards, a.board_content ?? ''] }; return next })
      else if (a.type === 'speak') { const t = a.spoken_text ?? a.say ?? ''; if (t) setScript((s) => [...s, { who: 'teacher', text: t }]) }
      else if (a.type === 'annotation') { setPages((ps) => { if (!ps.length) return ps; const next = [...ps]; const last = next[next.length - 1]; next[next.length - 1] = { ...last, annotations: [...last.annotations, { text: a.text ?? '', say: a.say }] }; return next }); if (a.say) setScript((s) => [...s, { who: 'teacher', text: a.say! }]) }
      else if (a.type === 'ask') { setAsking(a.question ?? ''); setPaused(true) }
      else if (a.type === 'done') setStatus('done')
    }
    // 协议：start_session(session_id?) → session_ready → start_teaching → new_page/board/speak/annotation/ask/done
    ws.onopen = () => ws.send(JSON.stringify({ type: 'start_session', ...(sessionId && sessionId !== 'new' ? { session_id: sessionId, course_session_id: sessionId } : {}) }))
    ws.onmessage = (ev) => {
      const f = JSON.parse(ev.data) as Action & { session_title?: string; session_id?: string; resumed?: boolean; whiteboard_state?: { board_content?: string; actions?: Action[] } | null; reward?: { credits: number; reason: string }; actions?: Action[] }
      if (f.type === 'session_ready') {
        setStatus('ready'); if (f.session_title) setTitle(f.session_title)
        if (f.session_id && (sessionId === 'new' || !sessionId)) window.history.replaceState({}, '', courseId ? `/course/${courseId}/sessions/whiteboard/${f.session_id}` : `/whiteboard/${f.session_id}`)
        // 复用已有会话时回放已保存的动作；否则请求开始授课
        if (f.resumed && f.whiteboard_state?.actions?.length) { f.whiteboard_state.actions.forEach(apply); setStatus('teaching') }
        else { ws.send(JSON.stringify({ type: 'start_teaching' })); setStatus('teaching') }
      } else if (f.type === 'group') { /* 已逐帧应用 */ }
      else if (f.type === 'reward_user') setCredits(`✦ 达成里程碑 · ${f.reward?.reason ?? '白板课程学习完成'}`)
      else if (f.type === 'tts_segment' || f.type === 'pong' || f.type === 'tts_config' || f.type === 'interject_ready') { /* 音频/心跳 */ }
      else if (f.type === 'interject_text') { setScript((s) => [...s, { who: 'teacher', text: f.text ?? '' }]); setPaused(false); setAsking(null) }
      else apply(f)
    }
    return () => ws.close()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId])

  // [D10] 板面逐段绘出
  const page = pages[pageIdx] ?? pages[pages.length - 1]
  useEffect(() => { setRevealed(0) }, [pageIdx])
  useEffect(() => { if (!page || paused) return; if (revealed >= page.boards.length) return; const t = setTimeout(() => setRevealed((r) => r + 1), 900); return () => clearTimeout(t) }, [page, revealed, paused])

  const ask = () => { const text = q.trim(); if (!text || !wsRef.current) return; wsRef.current.send(JSON.stringify({ type: 'interject_question', text })); setScript((s) => [...s, { who: 'you', text }]); setQ(''); setAsking(null) }
  const resume = () => { setPaused(false); setAsking(null); wsRef.current?.send(JSON.stringify({ type: 'interject_resume' })) }

  return (
    <div className="flex h-full" style={{ background: 'var(--app-bg)' }}>
      <section className="flex-1 min-w-0 flex flex-col">
        <header className="flex items-center gap-3 px-4" style={{ height: 52 }}>
          <button onClick={() => nav(courseId ? `/course/${courseId}` : '/history')} className="hk-icon-btn h-8 w-8" aria-label="返回"><ArrowLeft size={15} /></button>
          <h1 className="text-[14px] font-semibold truncate">{title}：知识讲解</h1>
          <div className="ml-auto flex items-center gap-1.5 text-[12px]">
            <button className="hk-icon-btn h-8 w-8" onClick={() => setZoom((z) => Math.max(50, z - 10))} aria-label="缩小"><ZoomOut size={14} /></button><span className="w-10 text-center">{zoom}%</span><button className="hk-icon-btn h-8 w-8" onClick={() => setZoom((z) => Math.min(200, z + 10))} aria-label="放大"><ZoomIn size={14} /></button>
            <span className="mx-2 text-[#8a8a90]">{Math.min(pageIdx + 1, Math.max(pages.length, 1))} / {Math.max(pages.length, 1)}</span>
            <button className="hk-icon-btn h-8 w-8" onClick={() => setPageIdx((i) => Math.max(0, i - 1))} aria-label="上一页"><SkipBack size={14} /></button>
            <button className="hk-icon-btn h-8 w-8" onClick={() => (paused ? resume() : setPaused(true))} aria-label={paused ? '继续' : '暂停'}>{paused ? <Play size={14} /> : <Pause size={14} />}</button>
            <button className="hk-icon-btn h-8 w-8" onClick={() => setPageIdx((i) => Math.min(pages.length - 1, i + 1))} aria-label="下一页"><SkipForward size={14} /></button>
            <button className="hk-icon-btn h-8 w-8" aria-label="录音"><Mic size={14} /></button>
            <button className="hk-icon-btn h-8 w-8" aria-label="分享"><Share2 size={14} /></button>
          </div>
        </header>
        <div className="flex-1 relative overflow-auto hk-scroll p-6" style={{ backgroundImage: 'radial-gradient(#e4e4e7 1px, transparent 1px)', backgroundSize: '18px 18px' }}>
          <div className="mx-auto bg-white rounded-xl shadow-sm border p-8 origin-top transition-transform" style={{ width: 760, minHeight: 520, transform: `scale(${zoom / 100})` }}>
            {status === 'connecting' && <div className="hk-skeleton h-6 w-1/2 rounded" />}
            {page && <>
              <h2 className="hk-title-serif text-[22px] mb-4">{page.title}</h2>
              {page.boards.slice(0, revealed).map((b, i) => (
                <div key={i} className="hk-prose hk-fade-in-up mb-4" style={{ fontFamily: '"Virgil", "Xiaolai", var(--font-satoshi)' }}><ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>{b}</ReactMarkdown></div>
              ))}
              {page.annotations.map((a, i) => <div key={i} className="hk-fade-in inline-block mr-2 mb-2 px-2 py-1 rounded-md border-2 border-[#dc2626] text-[#dc2626] text-[13px] font-medium" style={{ transform: 'rotate(-1deg)' }}>{a.text}</div>)}
            </>}
            {!page && status !== 'connecting' && <div className="text-[#8a8a90] text-[13px]">老师正在准备板书…</div>}
          </div>
          {(paused || asking) && (
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hk-card p-4 w-[360px] shadow-xl hk-pop" role="dialog">
              <div className="flex items-start gap-3"><span className="text-[28px] hk-orbie">🛸</span><div className="flex-1"><div className="text-[14px] font-medium">{asking ? asking : '已暂停对话，请在右侧输入你的问题'}</div><div className="text-[12px] text-[#8a8a90] mt-1">或者直接继续听老师讲</div></div></div>
              <div className="flex justify-end mt-3"><button onClick={resume} className="h-8 px-4 rounded-full bg-[#0a0a0a] text-white text-[13px]">继续讲</button></div>
            </div>
          )}
        </div>
        {credits && <div className="px-4 py-1.5 text-[12px] text-[#15803d]">{credits}</div>}
      </section>

      <aside className="w-[340px] shrink-0 border-l bg-white flex flex-col">
        <div role="tablist" className="flex text-[13px] border-b"><button role="tab" aria-selected className="flex-1 h-10 font-medium relative">讲稿<span className="absolute left-4 right-4 -bottom-px h-0.5 bg-black" /></button><button role="tab" className="flex-1 h-10 text-[#8a8a90]">对话</button></div>
        <div className="flex-1 overflow-y-auto hk-scroll p-4 space-y-3 text-[13px] leading-6">
          {script.length === 0 && <div className="text-[#8a8a90]">讲解开始后，老师的讲稿会同步显示在这里。</div>}
          {script.map((s, i) => <div key={i} className={`hk-fade-in-up ${s.who === 'you' ? 'ml-6 rounded-xl bg-[#f1f2f4] px-3 py-2' : ''}`}>{s.who === 'teacher' && <span className="text-[11px] text-[#8a8a90] block">老师</span>}{s.text}</div>)}
        </div>
        <div className="p-3 border-t">
          <div className="hk-composer p-2 flex items-center gap-2">
            <input value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && ask()} placeholder="向老师提问…" className="flex-1 bg-transparent outline-none text-[13px] px-1" aria-label="向老师提问" />
            <button className="hk-icon-btn h-8 w-8" aria-label="语音提问"><Mic size={14} /></button>
            <button onClick={ask} disabled={!q.trim()} className="h-8 w-8 rounded-full bg-[#0a0a0a] text-white flex items-center justify-center disabled:opacity-40" aria-label="发送"><ArrowUp size={14} /></button>
          </div>
        </div>
      </aside>
    </div>
  )
}
