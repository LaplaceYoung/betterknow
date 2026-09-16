import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { Activity, ArrowLeft, ArrowUp, Mic, Pause, Play, Share2, SkipBack, SkipForward, ZoomIn, ZoomOut, Volume2, VolumeX, Download, Maximize2, Minimize2 } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import { apiGet, wsUrl } from '@/lib/api'

interface Action { type: string; page_id?: string; title?: string; board_content?: string; spoken_text?: string; say?: string; text?: string; question?: string; options?: string[]; correct_index?: number; explanation?: string; task_preview?: string; step_id?: number; annotation_type?: string; caption?: string; image_url?: string; width?: number; height?: number; stub?: boolean }
interface BoardImage { url: string; caption: string; width: number; height: number; pending: boolean; failed?: boolean }
interface Page { id: string; title: string; boards: string[]; annotations: { text: string; say?: string }[]; images: BoardImage[]; columnLayout?: Record<string, unknown> }
// 线上客户端把分栏网格参数一并同步给服务端：{version,revision,activePageId,pages[].columnLayout}
const boardLayout = (width: number): Record<string, unknown> => ({ colCount: 3, tileW: Math.max(220, Math.round((width - 60 - 24) / 3)), tileGapX: 12, tileGapY: 12, gridLeft: 30, gridTop: 130, usableW: Math.max(320, width - 60), usableH: 615, exportPixelW: Math.max(720, width * 2), exportPixelH: 1230 })

// [S19][D10][B10] 白板教学：/whiteboard/ws → session_ready → start_teaching → new_page/board/speak/annotation/ask/done 帧
export default function Whiteboard() {
  const { sessionId = '', courseId } = useParams()
  const nav = useNavigate()
  const containerRef = useRef<HTMLDivElement>(null)
  const wsRef = useRef<WebSocket | null>(null)
  const whiteboardRevision = useRef(0)
  const [title, setTitle] = useState('白板课堂')
  const [keyPoints, setKeyPoints] = useState<string[]>([])
  // 线上要点带 data-status=current：讲解推进时高亮当前条目
  const [activeKeyPoint, setActiveKeyPoint] = useState(0)
  const [animation, setAnimation] = useState<{ pending: boolean; html: string; task: string } | null>(null)
  // 线上白板默认就是 zen（沉浸）模式，工具条上有「Exit zen mode」；这里同样默认沉浸
  const [zen, setZen] = useState(true)
  const [exportOpen, setExportOpen] = useState(false)
  const [netCheck, setNetCheck] = useState<string>('')
  const [quiz, setQuiz] = useState<{ question: string; options: string[]; correct?: number; picked?: number; explanation?: string } | null>(null)
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
  const [ttsVoice, setTtsVoice] = useState(true)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [playbackRate, setPlaybackRate] = useState(1.0)
  const scriptBottomRef = useRef<HTMLDivElement>(null)

  const speakText = (text: string) => {
    if (!ttsVoice || typeof window === 'undefined' || !window.speechSynthesis) return
    try {
      window.speechSynthesis.cancel()
      const clean = text.replace(/[*#`_~\[\]]/g, '').trim()
      if (!clean) return
      const utter = new SpeechSynthesisUtterance(clean)
      utter.rate = playbackRate * 1.05
      utter.pitch = 1.0
      utter.lang = /[\u4e00-\u9fa5]/.test(clean) ? 'zh-CN' : 'en-US'
      utter.onstart = () => setIsSpeaking(true)
      utter.onend = () => setIsSpeaking(false)
      utter.onerror = () => setIsSpeaking(false)
      window.speechSynthesis.speak(utter)
    } catch (e) {
      console.warn('SpeechSynthesis error:', e)
    }
  }

  useEffect(() => {
    if (paused) {
      window.speechSynthesis?.pause()
    } else {
      window.speechSynthesis?.resume()
    }
  }, [paused])

  useEffect(() => {
    return () => {
      window.speechSynthesis?.cancel()
    }
  }, [])

  useEffect(() => {
    scriptBottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [script])

  useEffect(() => {
    const ws = new WebSocket(wsUrl('/api/v1/whiteboard/ws', { access_token: localStorage.getItem('access_token') ?? '', ...(sessionId && sessionId !== 'new' ? { session_id: sessionId } : {}) }))
    wsRef.current = ws
    const apply = (a: Action) => {
      if (a.type === 'new_page') setPages((ps) => [...ps, { id: a.page_id ?? String(ps.length), title: a.title ?? `Page ${ps.length + 1}`, boards: [], annotations: [], images: [] }])
      else if (a.type === 'board') { setActiveKeyPoint((k) => k + 1); setPages((ps) => { const next = ps.length ? [...ps] : [{ id: 'p', title: a.title ?? 'Board', boards: [], annotations: [], images: [] }]; next[next.length - 1] = { ...next[next.length - 1], boards: [...next[next.length - 1].boards, a.board_content ?? ''] }; return next }); syncState() }
      else if (a.type === 'speak') { const t = a.spoken_text ?? a.say ?? ''; if (t) { setScript((s) => [...s, { who: 'teacher', text: t }]); speakText(t) } }
      else if (a.type === 'annotation') { setPages((ps) => { if (!ps.length) return ps; const next = [...ps]; const last = next[next.length - 1]; next[next.length - 1] = { ...last, annotations: [...last.annotations, { text: a.text ?? '', say: a.say }] }; return next }); if (a.say) { setScript((s) => [...s, { who: 'teacher', text: a.say! }]); speakText(a.say) } }
      else if (a.type === 'animation') setAnimation({ pending: true, html: '', task: String(a.task_preview ?? '') })
      else if (a.type === 'ask') { setAsking(a.question ?? ''); setQuiz(Array.isArray(a.options) && a.options.length ? { question: String(a.question ?? ''), options: a.options.map(String), correct: typeof a.correct_index === 'number' ? a.correct_index : undefined, explanation: a.explanation ? String(a.explanation) : undefined } : null); setPaused(true) }
      else if (a.type === 'done') setStatus('done')
    }
    // 白板插图：pending 占位 → generated_image 落位；失败则标记（线上帧序同构）
    let syncTimer: ReturnType<typeof setTimeout> | null = null
    const syncState = () => {
      if (syncTimer) clearTimeout(syncTimer)
      syncTimer = setTimeout(() => {
        const width = containerRef.current?.clientWidth ?? 1440
        setPages((ps) => {
          const next = ps.length ? ps : [{ id: 'p', title: 'Board', boards: [], annotations: [], images: [] }]
          const layout = boardLayout(width)
          const withLayout = next.map((page) => ({ ...page, columnLayout: page.columnLayout ?? layout }))
          if (wsRef.current?.readyState === WebSocket.OPEN) {
            wsRef.current.send(JSON.stringify({
              type: 'sync_whiteboard_state',
              whiteboard_state: { version: 1, revision: (whiteboardRevision.current += 1), activePageId: withLayout[withLayout.length - 1]?.id ?? 'p', pages: withLayout },
            }))
          }
          return withLayout
        })
      }, 400)
    }
    const pushImage = (img: BoardImage) => setPages((ps) => { const next = ps.length ? [...ps] : [{ id: 'p', title: 'Board', boards: [], annotations: [], images: [] }]; const last = next[next.length - 1]; next[next.length - 1] = { ...last, images: [...last.images, img] }; return next })
    const resolveImage = (img: BoardImage) => { setPages((ps) => { if (!ps.length) return ps; const next = [...ps]; const last = next[next.length - 1]; const images = [...last.images]; const idx = images.findIndex((i) => i.pending); if (idx >= 0) images[idx] = img; else images.push(img); next[next.length - 1] = { ...last, images }; return next }); syncState() }
    const failImage = () => setPages((ps) => { if (!ps.length) return ps; const next = [...ps]; const last = next[next.length - 1]; const images = [...last.images]; const idx = images.map((i) => i.pending).lastIndexOf(true); if (idx >= 0) images[idx] = { ...images[idx], pending: false, failed: true }; next[next.length - 1] = { ...last, images }; return next })
    // 协议：start_session(session_id?) → session_ready → start_teaching → new_page/board/speak/annotation/ask/done
    ws.onopen = () => ws.send(JSON.stringify({ type: 'start_session', ...(sessionId && sessionId !== 'new' ? { session_id: sessionId, course_session_id: sessionId } : {}) }))
    ws.onmessage = (ev) => {
      const f = JSON.parse(ev.data) as Action & { session_title?: string; session_id?: string; resumed?: boolean; key_points?: string[]; html?: string; snippet?: string; task_preview?: string; whiteboard_state?: { board_content?: string; actions?: Action[] } | null; reward?: { credits: number; reason: string }; actions?: Action[] }
      if (f.type === 'session_ready') {
        setStatus('ready'); if (f.session_title) setTitle(f.session_title)
        if (Array.isArray(f.key_points)) setKeyPoints(f.key_points.map(String).filter(Boolean))
        if (f.session_id && (sessionId === 'new' || !sessionId)) window.history.replaceState({}, '', courseId ? `/course/${courseId}/sessions/whiteboard/${f.session_id}` : `/whiteboard/${f.session_id}`)
        // 复用已有会话时回放已保存的动作；否则请求开始授课
        if (f.resumed && f.whiteboard_state?.actions?.length) { f.whiteboard_state.actions.forEach(apply); setStatus('teaching') }
        else { ws.send(JSON.stringify({ type: 'start_teaching' })); setStatus('teaching') }
      } else if (f.type === 'animation_pending') setAnimation((a) => ({ pending: true, html: a?.html ?? '', task: String(f.task_preview ?? a?.task ?? '') }))
      else if (f.type === 'generated_animation') { const html = String(f.html ?? ''); setAnimation((a) => ({ pending: false, html, task: a?.task ?? '' })) }
      else if (f.type === 'highlight') setScript((s) => [...s, { who: 'teacher', text: `✎ 高亮：${String(f.snippet ?? '')}` }])
      else if (f.type === 'group') { /* 已逐帧应用 */ }
      else if (f.type === 'reward_user') setCredits(`✦ 达成里程碑 · ${f.reward?.reason ?? '白板课程学习完成'}`)
      else if (f.type === 'tts_segment') { const seg = f as Action & { audio_url?: string }; if (ttsVoice && seg.audio_url && seg.stub === false) { const audio = new Audio(seg.audio_url); audio.playbackRate = playbackRate; void audio.play().catch(() => {}) } }
      else if (f.type === 'image_gen_pending') pushImage({ url: '', caption: f.caption ?? '', width: 512, height: 512, pending: true })
      else if (f.type === 'generated_image') resolveImage({ url: f.image_url ?? '', caption: f.caption ?? '', width: f.width ?? 512, height: f.height ?? 512, pending: false })
      else if (f.type === 'image_gen_failed') failImage()
      else if (f.type === 'pong' || f.type === 'tts_config' || f.type === 'interject_ready') { /* 心跳 / 配置回显 */ }
      else if (f.type === 'interject_text') { setScript((s) => [...s, { who: 'teacher', text: f.text ?? '' }]); setPaused(false); setAsking(null) }
      else apply(f)
    }
    return () => ws.close()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId])

  useEffect(() => {
    const onFsChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement))
    }
    document.addEventListener('fullscreenchange', onFsChange)
    return () => document.removeEventListener('fullscreenchange', onFsChange)
  }, [])

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen?.().catch(() => {})
    } else {
      document.exitFullscreen?.().catch(() => {})
    }
  }

  const exportNotes = () => {
    const parts: string[] = []
    parts.push(`# ${title} · 白板笔记与讲稿\n`)
    parts.push(`> 导出时间：${new Date().toLocaleString('zh-CN')}\n\n---\n`)

    if (pages.length > 0) {
      parts.push(`## 📑 板书内容\n`)
      pages.forEach((p, idx) => {
        parts.push(`### 第 ${idx + 1} 页：${p.title}\n`)
        if (p.boards.length > 0) {
          parts.push(p.boards.join('\n\n') + '\n')
        }
        if (p.annotations.length > 0) {
          parts.push(`**重点批注：**\n` + p.annotations.map((a) => `- ${a.text}`).join('\n') + '\n')
        }
        if (p.images.length > 0) {
          parts.push(`**插图：**\n` + p.images.map((img) => `- ${img.caption}${img.failed ? '（生成失败）' : ` → ${img.url}`}`).join('\n') + '\n')
        }
        parts.push('---\n')
      })
    }

    if (script.length > 0) {
      parts.push(`## 🎙️ 课堂讲稿与交互记录\n`)
      script.forEach((s) => {
        const role = s.who === 'teacher' ? '👨‍🏫 老师' : '🙋 我'
        parts.push(`**${role}**：\n${s.text}\n`)
      })
    }

    const blob = new Blob([parts.join('\n')], { type: 'text/markdown;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${title.replace(/[\/\\?%*:|"<>]/g, '_')}_板书笔记.md`
    a.click()
    URL.revokeObjectURL(url)
  }

  // [D10] 板面逐段绘出
  const page = pages[pageIdx] ?? pages[pages.length - 1]
  useEffect(() => { setRevealed(0) }, [pageIdx])
  useEffect(() => { if (!page || paused) return; if (revealed >= page.boards.length) return; const t = setTimeout(() => setRevealed((r) => r + 1), 900); return () => clearTimeout(t) }, [page, revealed, paused])

  const ask = () => { const text = q.trim(); if (!text || !wsRef.current) return; wsRef.current.send(JSON.stringify({ type: 'interject_question', text })); setScript((s) => [...s, { who: 'you', text }]); setQ(''); setAsking(null) }
  const resume = () => { setPaused(false); setAsking(null); wsRef.current?.send(JSON.stringify({ type: 'interject_resume' })) }

  // 快捷键支持：空格暂停/继续，左右箭头切页，F键全屏
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        return
      }
      if (e.code === 'Space') {
        e.preventDefault()
        setPaused((p) => {
          if (p) {
            resume()
            return false
          } else {
            return true
          }
        })
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        setPageIdx((i) => Math.max(0, i - 1))
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        setPageIdx((i) => Math.min(pages.length - 1, i + 1))
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault()
        toggleFullscreen()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [pages.length])

  return (
    <div ref={containerRef} className="flex h-full" style={{ background: 'var(--app-bg)' }}>
      <section className="flex-1 min-w-0 flex flex-col">
        <header className="flex items-center gap-3 px-4" style={{ height: 52 }}>
          <button onClick={() => nav(courseId ? `/course/${courseId}` : '/history')} className="hk-icon-btn h-8 w-8" aria-label="返回"><ArrowLeft size={15} /></button>
          <h1 className="text-[14px] font-semibold truncate">{title}：知识讲解</h1>
          <div className="ml-auto flex items-center gap-1.5 text-[12px]">
            <button
              className="hk-icon-btn h-8 w-8"
              onClick={() => {
                setTtsVoice((v) => {
                  if (v && typeof window !== 'undefined') window.speechSynthesis?.cancel()
                  return !v
                })
              }}
              aria-label="语音播报"
              title={ttsVoice ? '语音朗读已开启' : '语音朗读已静音'}
            >
              {ttsVoice ? <Volume2 size={14} className={isSpeaking ? 'text-[#2563eb] animate-pulse' : 'text-[#3d3d3f]'} /> : <VolumeX size={14} className="text-[#a1a1aa]" />}
            </button>
            <button
              className="hk-pill h-7 px-2 text-[11px] font-mono"
              onClick={() => setPlaybackRate((r) => (r === 1.0 ? 1.25 : r === 1.25 ? 1.5 : r === 1.5 ? 2.0 : 1.0))}
              title="切换语音语速"
            >
              {playbackRate}x
            </button>
            <button className="hk-icon-btn h-8 w-8" onClick={() => setZoom((z) => Math.max(50, z - 10))} aria-label="缩小"><ZoomOut size={14} /></button><span className="w-10 text-center">{zoom}%</span><button className="hk-icon-btn h-8 w-8" onClick={() => setZoom((z) => Math.min(200, z + 10))} aria-label="放大"><ZoomIn size={14} /></button>
            <div className="relative">
            <button className="hk-icon-btn h-8 w-8" onClick={() => setExportOpen((v) => !v)} aria-label="导出" title="导出" data-testid="export-menu"><Download size={14} /></button>
            {exportOpen && (
              <div className="absolute right-0 top-9 z-40 hk-card w-[200px] p-1.5" data-testid="export-popover">
                <button onClick={() => { exportNotes(); setExportOpen(false) }} className="w-full text-left px-2.5 py-1.5 rounded-md hover:bg-[#f4f4f5] text-[12px]">导出 Markdown 笔记</button>
                <button onClick={() => { exportNotes(); setExportOpen(false); window.print() }} className="w-full text-left px-2.5 py-1.5 rounded-md hover:bg-[#f4f4f5] text-[12px]">导出 PDF（打印）</button>
              </div>
            )}
            </div>
            <span className="inline-flex items-stretch" style={{ height: 40, background: '#fff', borderRadius: 20, boxShadow: '0 2px 4px rgba(0,0,0,.15)' }}>
              <button onClick={() => setPageIdx((i) => Math.max(0, i - 1))} aria-label="上一页" title="上一页 (←)"
                style={{ width: 38, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', border: 'none', background: 'transparent', color: '#8a8a8a', borderRadius: '20px 0 0 20px' }}><SkipBack size={14} /></button>
              <span className="inline-flex items-center justify-center" style={{ minWidth: 28, padding: '0 2px', gap: 3, fontSize: 13.5, fontWeight: 500, letterSpacing: '.2px', color: '#8a8a8a' }}>
                <span style={{ color: '#171717' }}>{Math.min(pageIdx + 1, Math.max(pages.length, 1))}</span>
                <span style={{ color: '#c4c4c4', fontWeight: 400 }}>/</span>
                <span>{Math.max(pages.length, 1)}</span>
              </span>
              <button onClick={() => setPageIdx((i) => Math.min(pages.length - 1, i + 1))} aria-label="下一页" title="下一页 (→)"
                style={{ width: 38, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', border: 'none', background: 'transparent', color: '#8a8a8a', borderRadius: '0 20px 20px 0' }}><SkipForward size={14} /></button>
            </span>
            <button className="hk-icon-btn h-8 w-8" onClick={() => setZen((v) => !v)} aria-label={zen ? 'Exit zen mode' : '进入沉浸模式'} title={zen ? 'Exit zen mode' : '进入沉浸模式'} data-testid="zen-toggle">{zen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}</button>
            <button className="hk-icon-btn h-8 w-8" aria-label="检查我的网络" title="检查我的网络" data-testid="net-check" onClick={() => { void apiGet<{ ok?: boolean; state?: string }>('/net-check').then((r) => setNetCheck(r?.ok ? '网络正常' : '网络异常')).catch(() => setNetCheck('检查失败')); setTimeout(() => setNetCheck(''), 3000) }}><Activity size={14} /></button>
            <button className="hk-icon-btn h-8 w-8" onClick={toggleFullscreen} aria-label={isFullscreen ? '退出全屏' : '全屏沉浸模式'} title={isFullscreen ? '退出全屏 (F)' : '全屏沉浸模式 (F)'}>{isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}</button>
            <button className="hk-icon-btn h-8 w-8" aria-label="录音"><Mic size={14} /></button>
            <button className="hk-icon-btn h-8 w-8" aria-label="分享"><Share2 size={14} /></button>
          </div>
        </header>
        {keyPoints.length > 0 && (
          <div className="mx-4 mb-3" style={{ background: 'rgba(255,255,255,.78)', border: '1px solid #e5e5e5', borderRadius: 10, padding: '9px 10px' }} data-testid="session-key-points">
            <p style={{ fontSize: 10, lineHeight: '15px', fontWeight: 700, color: '#a3a3a3', marginBottom: 6 }}>学习节大纲 · 本节要点 {keyPoints.length} 条</p>
            {/* 线上 .whiteboard-outline-keypoints：左边框 + 圆点，讲到的条目（current）圆点变蓝 */}
            <ul style={{ listStyle: 'none', margin: 0, padding: '0 0 0 10px', borderLeft: '1.5px solid #ececec', display: 'flex', flexDirection: 'column', gap: 4 }}>
              {keyPoints.map((point, index) => (
                <li key={point} data-status={index === activeKeyPoint ? 'current' : 'todo'}
                  style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 10px', borderRadius: 10, fontSize: 13, lineHeight: 1.4, color: index === activeKeyPoint ? '#262626' : '#8a8a8a' }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: index === activeKeyPoint ? '#4c6696' : '#d4d4d4', flexShrink: 0 }} />
                  <span style={{ minWidth: 0, flex: 1 }}>{point}</span>
                  {index === activeKeyPoint && <span style={{ flexShrink: 0, display: 'inline-flex', alignItems: 'center', gap: 3, marginLeft: 4, fontSize: 11, color: '#4c6696' }}>讲到这里</span>}
                </li>
              ))}
            </ul>
          </div>
        )}
        {animation && (
          <div className="mx-4 mb-3 hk-card overflow-hidden" data-testid="board-animation">
            <div className="flex items-center gap-2 px-3.5 py-2 border-b border-[#f1f2f4]">
              <span className="text-[12px] font-medium">互动动画</span>
              <span className="text-[11px] text-[#8a8a90] truncate flex-1">{animation.task || '拖一拖参数，看结果怎么变'}</span>
              {animation.pending && <span className="text-[11px] text-[#3b5bdb]">生成中…</span>}
            </div>
            {animation.html
              ? <iframe title="互动动画" sandbox="allow-scripts" srcDoc={animation.html} className="w-full" style={{ height: 340, border: 'none', background: '#faf9f7' }} />
              : <div className="h-[120px] flex items-center justify-center text-[12px] text-[#8a8a90]">正在生成可交互演示…</div>}
          </div>
        )}
        <div className="flex-1 relative overflow-auto hk-scroll p-6" style={{ backgroundImage: 'radial-gradient(#e4e4e7 1px, transparent 1px)', backgroundSize: '18px 18px' }}>
          <div className="mx-auto bg-white rounded-xl shadow-sm border p-8 origin-top transition-transform" style={{ width: 760, minHeight: 520, transform: `scale(${zoom / 100})` }}>
            {/* 线上 .whiteboard-board-skeleton：96px 72px 64px 内边距、340px 列、标题 26px / 行 13px */}
            {status === 'connecting' && (
              <div style={{ display: 'flex', padding: '96px 72px 64px', gap: 18 }} aria-label="板书准备中">
                {[0, 1].map((col) => (
                  <div key={col} style={{ flex: '0 1 340px', display: 'flex', flexDirection: 'column', gap: 18 }}>
                    <div className="hk-skeleton" style={{ height: 26, width: '60%', borderRadius: 10 }} />
                    {[0, 1, 2, 3].map((line) => <div key={line} className="hk-skeleton" style={{ height: 13, width: '100%', borderRadius: 999 }} />)}
                  </div>
                ))}
              </div>
            )}
            {page && <>
              <h2 className="hk-title-serif text-[22px] mb-4">{page.title}</h2>
              {page.boards.slice(0, revealed).map((b, i) => (
                <div key={i} className="hk-prose hk-fade-in-up mb-4" style={{ fontFamily: '"Virgil", "Xiaolai", var(--font-satoshi)' }}><ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>{b}</ReactMarkdown></div>
              ))}
              {page.annotations.map((a, i) => <div key={i} className="hk-fade-in inline-block mr-2 mb-2 px-2 py-1 rounded-md border-2 border-[#dc2626] text-[#dc2626] text-[13px] font-medium" style={{ transform: 'rotate(-1deg)' }}>{a.text}</div>)}
              {page.images.map((img, i) => (
                <figure key={`img-${i}`} className="hk-fade-in-up mt-4">
                  {img.pending || img.failed
                    ? <div className="hk-skeleton rounded-lg border" style={{ width: 320, height: 320 }} aria-label={img.caption} />
                    : <img src={img.url} alt={img.caption} width={img.width} height={img.height} loading="lazy" className="rounded-lg border bg-white" style={{ maxWidth: 360, height: 'auto' }} />}
                  <figcaption className="mt-2 text-[12px] text-[#8a8a90]">{img.failed ? `${img.caption}（插图生成失败）` : img.caption}</figcaption>
                </figure>
              ))}
            </>}
            {!page && status !== 'connecting' && <div className="text-[#8a8a90] text-[13px]">老师正在准备板书…</div>}
          </div>
          {(paused || asking) && (
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hk-card p-4 w-[360px] shadow-xl hk-pop" role="dialog">
              <div className="flex items-start gap-3"><span className="text-[28px] hk-orbie">🛸</span><div className="flex-1"><div className="text-[14px] font-medium">{asking ? asking : '已暂停对话，请在右侧输入你的问题'}</div><div className="text-[12px] text-[#8a8a90] mt-1">{quiz ? '选一个答案，或者直接继续听老师讲' : '或者直接继续听老师讲'}</div></div></div>
              {quiz && (
                <div className="mt-3 space-y-1.5" data-testid="board-quiz">
                  {quiz.options.map((option, index) => {
                    const picked = quiz.picked === index
                    const revealed = quiz.picked !== undefined
                    const correct = index === quiz.correct
                    return (
                      <button
                        key={option}
                        onClick={() => setQuiz((q) => (q ? { ...q, picked: index } : q))}
                        disabled={revealed}
                        className={`w-full text-left px-3 py-2 rounded-xl border text-[13px] ${revealed && correct ? 'border-[#16a34a] bg-[#f0fdf4]' : revealed && picked ? 'border-[#dc2626] bg-[#fef2f2]' : 'hover:border-[#a1a1aa]'}`}
                      >{option}</button>
                    )
                  })}
                  {quiz.picked !== undefined && (
                    <div className="text-[12px] text-[#6b6b70] pt-1">
                      {quiz.picked === quiz.correct ? '✓ 答对了' : '再想想'}{quiz.explanation ? ` · ${quiz.explanation}` : ''}
                    </div>
                  )}
                </div>
              )}
              <div className="flex justify-end mt-3"><button onClick={resume} className="h-8 px-4 rounded-full bg-[#0a0a0a] text-white text-[13px]">继续讲</button></div>
            </div>
          )}
        </div>
        {credits && <div className="px-4 py-1.5 text-[12px] text-[#15803d]">{credits}</div>}
        {netCheck && <div className="px-4 py-1.5 text-[12px] text-[#3b5bdb]" data-testid="net-check-result">{netCheck}</div>}
      </section>

      {/* 线上 .whiteboard-sidebar-inner 260px（padding 12px 0 0）+ .whiteboard-sidebar-content padding 0 16px */}
      {!zen && <aside className="shrink-0 flex flex-col" style={{ width: 260, background: '#fbfbfb', padding: '12px 16px 0' }}>
        <div role="tablist" className="flex text-[13px] border-b">
          <button role="tab" aria-selected className="flex-1 h-10 font-medium relative flex items-center justify-center gap-1.5">
            讲稿
            {isSpeaking && <span className="inline-flex items-center gap-0.5 text-[11px] text-[#2563eb] font-normal"><Volume2 size={11} className="animate-pulse" /> 朗读中</span>}
            <span className="absolute left-4 right-4 -bottom-px h-0.5 bg-black" />
          </button>
          <button role="tab" className="flex-1 h-10 text-[#8a8a90]">对话</button>
        </div>
        <div className="flex-1 overflow-y-auto hk-scroll p-4 space-y-3 text-[13px] leading-6">
          {script.length === 0 && <div className="text-[#8a8a90]">讲解开始后，老师的讲稿会同步显示在这里。</div>}
          {script.map((s, i) => <div key={i} className={`hk-fade-in-up ${s.who === 'you' ? 'ml-6 rounded-xl bg-[#f1f2f4] px-3 py-2' : ''}`}>{s.who === 'teacher' && <span className="text-[11px] text-[#8a8a90] block">老师</span>}{s.text}</div>)}
          <div ref={scriptBottomRef} />
        </div>
        <div className="p-3 border-t">
          <div className="hk-composer p-2 flex items-center gap-2">
            <input value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && ask()} placeholder="向老师提问…" className="flex-1 bg-transparent outline-none text-[13px] px-1" aria-label="向老师提问" />
            <button className="hk-icon-btn h-8 w-8" aria-label="语音提问"><Mic size={14} /></button>
            <button onClick={ask} disabled={!q.trim()} className="h-8 w-8 rounded-full bg-[#0a0a0a] text-white flex items-center justify-center disabled:opacity-40" aria-label="发送"><ArrowUp size={14} /></button>
          </div>
        </div>
      </aside>}
    </div>
  )
}
