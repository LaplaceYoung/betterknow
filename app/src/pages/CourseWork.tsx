import { useEffect, useMemo, useState, useRef } from 'react'
import { useNavigate, useParams } from 'react-router'
import { ArrowLeft, Check, X, ChevronRight, Lightbulb, Volume2, VolumeX, Sparkles, Send, BookOpen, Code, Trophy, RotateCcw, CalendarPlus, BookmarkCheck } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import { apiGet, apiPost } from '@/lib/api'
import { perfectScore, scoreQuiz, starsFor } from '@/lib/quizScoring'

export interface Question {
  id: string
  type: 'single' | 'multiple' | 'fill' | string
  prompt: string
  options?: string[]
  explanation?: string
  correctAnswers?: string[]
  image?: { alt?: string; src?: string }
}

interface AssistantMsg {
  role: 'user' | 'assistant'
  text: string
}

function AssistantDrawer({
  open,
  onClose,
  courseId,
  currentQuestion,
  isProject = false,
  stageTitle = '',
}: {
  open: boolean
  onClose: () => void
  courseId: string
  currentQuestion?: Question
  isProject?: boolean
  stageTitle?: string
}) {
  const [messages, setMessages] = useState<AssistantMsg[]>([
    {
      role: 'assistant',
      text: isProject
        ? `👋 我是你的 AI 项目导师。针对「${stageTitle || '当前实战阶段'}」，遇到架构设计、算法推导或边界验证的疑惑，可以随时问我。`
        : `👋 我是你的 AI 随堂助教。针对这道题，我可以为你提供第一性原理拆解、生活比喻或干扰项分析（但我不会直接泄露最终答案，而是引导你推导出来）。`,
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    listRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const send = async (queryText?: string) => {
    const text = (queryText ?? input).trim()
    if (!text || loading) return
    setMessages((prev) => [...prev, { role: 'user', text }])
    if (!queryText) setInput('')
    setLoading(true)

    try {
      const endpoint = isProject
        ? `/course-generation/courses/${courseId}/project/assistant`
        : `/course-generation/courses/${courseId}/practice/assistant`
      // 线上形状：{session_id|stage_id, messages[]}；旧字段一并带上，服务端两种都吃
      const history = messages.filter((row) => row.role === 'user').map((row) => ({ role: 'user', content: row.text }))
      const payload = isProject
        ? { stage_id: stageTitle || 'stage_1', messages: [...history, { role: 'user', content: text }], message: text, stageTitle }
        : {
            session_id: currentQuestion?.id ? String(currentQuestion.id).split('-').slice(0, -1).join('-') : '',
            messages: [...history, { role: 'user', content: text }],
            message: text,
            questionPrompt: currentQuestion?.prompt,
            questionOptions: currentQuestion?.options,
            questionExplanation: currentQuestion?.explanation,
          }
      const res = await apiPost<{ message?: string }>(endpoint, payload)
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: res.message ?? '💡 尝试从最基础的守恒量或因果链条开始逆向分析。',
        },
      ])
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', text: '💡 提示服务正忙，请尝试先用极限边界法排除两个明显矛盾的选项。' },
      ])
    } finally {
      setLoading(false)
    }
  }

  if (!open) return null

  const promptChips = isProject
    ? [
        '📋 这一阶段的核心交付物规范是什么？',
        '⚙️ 如何设计第一组极端边界测试用例？',
        '💡 能否给我一个标准架构设计模板？',
      ]
    : [
        '💡 用通俗的生活比喻解释核心原理',
        '📐 这道题考察的核心公式与公理依据',
        '🚫 帮我分析干扰选项的常见陷阱',
        '🔍 引导我思考，不要直接透露答案',
      ]

  return (
    <div className="fixed inset-y-0 right-0 w-[380px] sm:w-[420px] bg-white shadow-2xl border-l z-50 flex flex-col hk-fade-in">
      <div className="p-4 border-b flex items-center justify-between bg-[#fafafa]">
        <div className="flex items-center gap-2">
          <span className="h-7 w-7 rounded-lg bg-[#0a0a0a] text-white flex items-center justify-center">
            <Sparkles size={14} />
          </span>
          <div>
            <div className="text-[14px] font-semibold">{isProject ? 'AI 项目实战导师' : 'AI 随堂助教'}</div>
            <div className="text-[11px] text-[#8a8a90]">苏格拉底式互动答疑</div>
          </div>
        </div>
        <button onClick={onClose} className="hk-icon-btn h-8 w-8 text-[#8a8a90] hover:text-black">
          <X size={16} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 hk-scroll text-[13px]">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[88%] rounded-2xl px-4 py-3 leading-6 whitespace-pre-wrap ${
                m.role === 'user'
                  ? 'bg-[#0a0a0a] text-white'
                  : 'bg-[#f4f4f5] text-[#1c1c1e] border border-black/5'
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex items-center gap-2 text-[12px] text-[#8a8a90]">
            <span className="h-3 w-3 rounded-full border-2 border-[#d4d4d8] border-t-[#0a0a0a] animate-spin" />
            助教正在思考引导思路…
          </div>
        )}
        <div ref={listRef} />
      </div>

      {/* Prompt chips */}
      <div className="p-3 bg-[#fafafa] border-t overflow-x-auto hk-scroll flex gap-1.5">
        {promptChips.map((chip, i) => (
          <button
            key={i}
            onClick={() => send(chip)}
            disabled={loading}
            className="px-2.5 py-1 rounded-full bg-white border text-[11px] text-[#3d3d3f] whitespace-nowrap hover:border-[#0a0a0a] transition-colors"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Input bar */}
      <div className="p-3 border-t bg-white">
        <div className="hk-composer p-2 flex items-center gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && send()}
            placeholder="问助教一个问题…"
            className="flex-1 bg-transparent outline-none text-[13px] px-2"
          />
          <button
            onClick={() => send()}
            disabled={!input.trim() || loading}
            className="h-7 w-7 rounded-full bg-[#0a0a0a] text-white flex items-center justify-center disabled:opacity-40"
          >
            <Send size={12} />
          </button>
        </div>
      </div>
    </div>
  )
}

// mm:ss（线上 exam timer 的 E(Q) 口径）
function fmtClock(totalSeconds: number): string {
  const s = Math.max(0, Math.floor(totalSeconds))
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`
}

function QuizRunner({
  title,
  questions,
  onFinish,
  subtitle,
  courseId,
  mode = 'practice',
  fastWindowMs = 10000,
  fastBonus = 200,
}: {
  title: string
  questions: Question[]
  subtitle?: string
  courseId: string
  mode?: 'practice' | 'exam'
  fastWindowMs?: number
  fastBonus?: number
  onFinish: (score: number, total: number, userAnswers: Record<number, { picked: string[]; fill: string; isRight: boolean }>, meta?: { fastCount?: number; fastIds?: string[]; points?: number; perfect?: number; stars?: number }) => void
}) {
  const [i, setI] = useState(0)
  const [picked, setPicked] = useState<string[]>([])
  const [fill, setFill] = useState('')
  const [checked, setChecked] = useState(false)
  const [score, setScore] = useState(0)
  const [speaking, setSpeaking] = useState(false)
  const [assistantOpen, setAssistantOpen] = useState(false)
  // 线上进入练习先弹「准备好练习」：插图 + 说明 + 知道了
  const [readyOpen, setReadyOpen] = useState(true)
  const [answersState, setAnswersState] = useState<Record<number, boolean>>({})
  const [skippedQuestions, setSkippedQuestions] = useState<Record<string, boolean>>({})
  const [userAnswers, setUserAnswers] = useState<Record<number, { picked: string[]; fill: string; isRight: boolean }>>({})
  // 线上练习 HUD：每题 10s 倒计时 + 速答奖励（practice-hud-chip--bonus / practice-timer-fill）
  const QUESTION_SECONDS = 10
  const SPEED_BONUS = 200
  const [left, setLeft] = useState(QUESTION_SECONDS)
  const [bonus, setBonus] = useState(0)
  const [fastAnswers, setFastAnswers] = useState<Record<string, boolean>>({})
  // 每题 10s 窗口：用开始时间戳算剩余秒，避免在 effect 里同步 setState（会触发级联渲染）
  const questionStartedAt = useRef(0)
  useEffect(() => {
    questionStartedAt.current = Date.now()
    if (checked || !questions[i]) return
    const timer = setInterval(() => {
      setLeft(Math.max(0, QUESTION_SECONDS - Math.floor((Date.now() - questionStartedAt.current) / 1000)))
    }, 500)
    return () => clearInterval(timer)
  }, [i, checked, questions])

  // 线上 ExamPage：开始考试时 deadline = Date.now() + 18e5（30 分钟），显示初值 1800，每秒 tick，归零即交卷
  const EXAM_SECONDS = 1800
  const [examStarted, setExamStarted] = useState(mode !== 'exam')
  const [examLeft, setExamLeft] = useState(EXAM_SECONDS)
  const examDeadline = useRef(0)
  // 线上 .exam-bonus-chip：每题的速答窗口（窗口长度与奖励来自考试数据）
  const [fastLeft, setFastLeft] = useState(Math.ceil(fastWindowMs / 1000))
  const fastDeadline = useRef(0)
  useEffect(() => {
    if (mode !== 'exam' || !examStarted) return
    fastDeadline.current = Date.now() + fastWindowMs
    const id = window.setInterval(() => {
      setFastLeft(Math.max(0, Math.ceil((fastDeadline.current - Date.now()) / 1000)))
    }, 200)
    return () => window.clearInterval(id)
  }, [mode, examStarted, i, fastWindowMs])
  const submitRef = useRef<() => void>(() => {})
  const latest = useRef({ score: 0, i: 0, picked: [] as string[], fill: '', questions: [] as Question[], userAnswers: {} as Record<number, { picked: string[]; fill: string; isRight: boolean }>, fastAnswers: {} as Record<string, boolean>, skippedQuestions: {} as Record<string, boolean>, onFinish })
  useEffect(() => {
    latest.current = { score, i, picked, fill, questions, userAnswers, fastAnswers, skippedQuestions, onFinish }
    submitRef.current = () => {
      const l = latest.current
      const cur = l.questions[l.i]
      const correct = cur?.correctAnswers ?? []
      const right = cur?.type === 'fill'
        ? correct.some((c) => c.trim().toLowerCase() === l.fill.trim().toLowerCase())
        : l.picked.length === correct.length && l.picked.every((p) => correct.includes(p))
      const ids = l.questions.map((qq) => qq.id)
      const revealed: Record<string, boolean> = {}
      const correctness: Record<string, boolean> = {}
      for (const [idx, ans] of Object.entries(l.userAnswers)) {
        const id = ids[Number(idx)]
        if (!id) continue
        revealed[id] = true
        correctness[id] = ans.isRight
      }
      const points = scoreQuiz({ questionIds: ids, revealedQuestions: revealed, skippedQuestions: l.skippedQuestions, questionCorrectness: correctness, fastAnswers: l.fastAnswers })
      l.onFinish(l.score + (right ? 1 : 0), l.questions.length, l.userAnswers, {
        fastCount: points.fastCount,
        fastIds: Object.keys(l.fastAnswers),
        points: points.total,
        perfect: perfectScore(ids.length),
        stars: starsFor(points.total, perfectScore(ids.length)),
      })
    }
  })
  useEffect(() => {
    if (mode !== 'exam' || !examStarted) return
    const tick = () => {
      if (examDeadline.current === 0) return
      const secs = Math.max(0, Math.ceil((examDeadline.current - Date.now()) / 1000))
      setExamLeft(secs)
      if (secs <= 0) submitRef.current()
    }
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [mode, examStarted])

  const q = questions[i]
  const [confetti, setConfetti] = useState<Array<{ id: number; x: number; y: number; dx: number; dy: number; rotate: number; duration: number; delay: number; color: string; shape: 'rect' | 'circle'; size: number }>>([])

  const audioRef = useRef<HTMLAudioElement | null>(null)

  const [ttsVoice, setTtsVoice] = useState('calm')

  const [ttsSpeed, setTtsSpeed] = useState(1)

  useEffect(() => {
    apiGet<{ tts_config?: { voice_id?: string; speed?: number } }>('/tts/voices')
      .then((r) => { setTtsVoice(r.tts_config?.voice_id ?? 'calm'); setTtsSpeed(r.tts_config?.speed ?? 1) })
      .catch(() => {})
  }, [])

  if (!q) return null

  const correct = q.correctAnswers ?? []
  const isRight =
    q.type === 'fill'
      ? correct.some((c) => c.trim().toLowerCase() === fill.trim().toLowerCase())
      : picked.length === correct.length && picked.every((p) => correct.includes(p))


  const burst = () => {
    const colors = ['#4573c2', '#2e8b57', '#c98a1e', '#c34747', '#4c6696']
    const now = Date.now()
    const pieces = Array.from({ length: 28 }, (_, k) => {
      const angle = (Math.PI * 2 * k) / 28 + Math.random() * 0.4
      const distance = 90 + Math.random() * 150
      return {
        id: now + k,
        x: window.innerWidth / 2 + (Math.random() - 0.5) * 180,
        y: window.innerHeight * 0.42 + (Math.random() - 0.5) * 60,
        dx: Math.cos(angle) * distance,
        dy: Math.sin(angle) * distance - 40,
        rotate: Math.round((Math.random() - 0.5) * 720),
        duration: 0.78 + Math.random() * 0.4,
        delay: Math.random() * 0.08,
        color: colors[k % colors.length],
        shape: (k % 2 === 0 ? 'rect' : 'circle') as 'rect' | 'circle',
        size: 6 + Math.random() * 5,
      }
    })
    setConfetti(pieces)
    window.setTimeout(() => setConfetti([]), 1500)
  }

  const startExam = () => {
    examDeadline.current = Date.now() + EXAM_SECONDS * 1000
    setExamLeft(EXAM_SECONDS)
    setExamStarted(true)
  }

  const handleCheck = () => {
    setChecked(true)
    setAnswersState((prev) => ({ ...prev, [i]: isRight }))
    setUserAnswers((prev) => ({ ...prev, [i]: { picked, fill, isRight } }))
    if (isRight && left > 0) { setBonus((value) => value + SPEED_BONUS); setFastAnswers((f) => ({ ...f, [q.id]: true })) }
    if (isRight) burst()
  }

  const next = () => {
    const updatedAnswers = { ...userAnswers, [i]: { picked, fill, isRight } }
    if (i + 1 >= questions.length) {
      {
        const ids = questions.map((qq) => qq.id)
        const revealed: Record<string, boolean> = {}
        const correctness: Record<string, boolean> = {}
        for (const [idx, ans] of Object.entries({ ...userAnswers, [i]: { picked, fill, isRight } })) {
          const id = ids[Number(idx)]
          if (!id) continue
          revealed[id] = true
          correctness[id] = ans.isRight
        }
        const points = scoreQuiz({ questionIds: ids, revealedQuestions: revealed, skippedQuestions, questionCorrectness: correctness, fastAnswers })
        onFinish(score + (isRight ? 1 : 0), questions.length, updatedAnswers, {
          fastCount: points.fastCount,
          fastIds: Object.keys(fastAnswers),
          points: points.total,
          perfect: perfectScore(ids.length),
          stars: starsFor(points.total, perfectScore(ids.length)),
        })
      }
      return
    }
    setScore((s) => s + (isRight ? 1 : 0))
    setUserAnswers(updatedAnswers)
    setI(i + 1)
    setPicked([])
    setFill('')
    setChecked(false)
    if ('speechSynthesis' in window) window.speechSynthesis.cancel()
    setSpeaking(false)
  }

  // 朗读：优先走 BYOK TTS seam（voice_id/speed 透传服务端），未配置 key 时回落浏览器合成

  const toggleSpeech = async () => {
    if (speaking) {
      window.speechSynthesis?.cancel()
      audioRef.current?.pause()
      setSpeaking(false)
      return
    }
    setSpeaking(true)
    try {
      const r = await apiPost<{ audio_url?: string; stub?: boolean }>('/tts/synthesize', { text: q.prompt, voice_id: ttsVoice, speed: ttsSpeed })
      if (r.audio_url && r.stub === false) {
        const audio = new Audio(r.audio_url)
        audioRef.current = audio
        audio.onended = () => setSpeaking(false)
        audio.onerror = () => setSpeaking(false)
        await audio.play()
        return
      }
    } catch { /* seam 不可用：回落浏览器朗读 */ }
    if (!('speechSynthesis' in window)) { setSpeaking(false); return }
    const u = new SpeechSynthesisUtterance(q.prompt)
    u.lang = 'zh-CN'
    u.onend = () => setSpeaking(false)
    u.onerror = () => setSpeaking(false)
    window.speechSynthesis.speak(u)
  }

  return (
    <div className={mode === 'exam' ? 'exam-page' : 'practice-page'}>
      <button className={mode === 'exam' ? 'exam-close-btn' : 'practice-close-btn'} onClick={() => onFinish(score, questions.length, {})} aria-label="退出"><X size={16} /></button>
      <div className="practice-topbar-actions">
        {mode === 'exam' && (
          <div className={`exam-timer ${examLeft <= 60 ? 'exam-timer--low' : ''}`} role="timer" aria-label={`剩余 ${fmtClock(examLeft)}`} data-testid="exam-timer">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="12" cy="13" r="8" stroke="currentColor" strokeWidth="1.8" />
              <path d="M12 9V13L14.5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M9 2H15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            {fmtClock(examLeft)}
          </div>
        )}
        {mode === 'exam' && fastLeft > 0 && (
          <span className="exam-bonus-chip" data-testid="exam-bonus-chip">
            <svg width="11" height="13" viewBox="0 0 11 13" fill="none" aria-hidden="true">
              <path d="M6.2 0.6L0.8 7.2h3.4l-.9 5.2 5.9-7h-3.5z" fill="currentColor" />
            </svg>
            速答奖励 <b>+{fastBonus}</b><b>{fastLeft}s</b>
          </span>
        )}
        <div className="practice-hud">
          <span className="practice-hud-chip practice-hud-chip--bonus">速答奖励 <b>+{SPEED_BONUS}</b>{!checked && <span>{left}s</span>}</span>
          <span className="practice-hud-chip practice-hud-chip--score">得分 <b><PracticeScore value={score} /></b>{bonus ? <span className="text-[11px] text-[#8f7620]">+{bonus}</span> : null}</span>
        </div>
        <button className="practice-assistant-toggle" onClick={() => setAssistantOpen(true)}><Lightbulb size={13} /> 助手</button>
      </div>
      <div className={mode === 'exam' ? 'exam-progress-dots' : 'practice-progress-dots'}>
        {questions.map((_, idx) => {
          const isCurrent = idx === i
          const wasCorrect = answersState[idx] === true
          const answered = answersState[idx] !== undefined
          return (
            <button key={idx} onClick={() => { setI(idx); setPicked([]); setFill(''); setChecked(false) }}
              aria-label={`第 ${idx + 1} 题`} title={`第 ${idx + 1} 题`}
              className={`${mode === 'exam' ? 'exam-progress-dot' : 'practice-progress-dot'} ${isCurrent ? (mode === 'exam' ? 'exam-progress-dot--active' : 'practice-progress-dot--active') : ''}`}
              data-tone={answered ? (wasCorrect ? 'ok' : 'bad') : 'idle'} />
          )
        })}
      </div>
      {mode === 'exam' && !examStarted && (
        <div className="exam-intro-shell" data-testid="exam-intro">
          <div className="exam-intro-card">
            <div className="exam-intro-media">
              <span className="exam-intro-video flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#eef2f8,#f8fafd)', borderRadius: 22 }}>
                <Trophy size={48} className="text-[#385da0]" />
              </span>
            </div>
            <div className="exam-intro-content">
              <p className="exam-intro-eyebrow">单元测评</p>
              <h1 className="exam-intro-title">{title}</h1>
              <div className="exam-intro-stats">
                <span className="exam-intro-stat">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle cx="12" cy="13" r="8" stroke="currentColor" strokeWidth="1.8" />
                    <path d="M12 9V13L14.5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M9 2H15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                  30 分钟
                </span>
                <span className="exam-intro-stat-divider" aria-hidden="true" />
                <span className="exam-intro-stat">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M7 7.5H17M7 12H17M7 16.5H12.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                  {questions.length} 题
                </span>
              </div>
              <p className="exam-intro-note">开始后计时 30 分钟，中途可以跳过题目；答完全部题目即出成绩。</p>
              <button className="exam-intro-start-btn" onClick={startExam}>开始考试</button>
            </div>
          </div>
        </div>
      )}
      <div className={mode === 'exam' ? 'exam-stage' : 'practice-stage'}>
      {mode === 'exam' && fastLeft > 0 && (
        <div className="exam-bonus-bar" aria-hidden="true" data-testid="exam-bonus-bar">
          <span key={`${i}-${examStarted}`} className="exam-bonus-fill" style={{ animationDuration: `${fastWindowMs}ms` }} />
        </div>
      )}
      <div className={`practice-split ${checked ? 'practice-split--revealed' : ''}`}>
      <section className="practice-question-shell">
      <div className="mx-auto max-w-[672px] px-8 pb-24">
      <div className="fixed inset-x-0 top-[51px] mx-auto max-w-[672px] px-8 pointer-events-none">
        {(mode !== 'exam') && <div className="practice-timer"><span key={`${i}-${checked}`} className="practice-timer-fill" style={{ animationDuration: '10000ms', animationPlayState: checked ? 'paused' : 'running' }} /></div>}
      </div>
      {readyOpen && (
        <div className="practice-welcome-overlay" data-testid="practice-welcome">
          <div className="practice-welcome-modal">
            <div className="practice-welcome-row">
              <div className="practice-welcome-media">
                <span className="flex items-center justify-center rounded-2xl" style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg,#eef2ff,#f0fdf4)' }}>
                  <BookOpen size={44} className="text-[#3b5bdb]" />
                </span>
              </div>
              <div className="practice-welcome-body">
                <p className="practice-welcome-title">准备好练习</p>
                <p className="practice-welcome-desc">全部答对，这次练习就会被标记为「已掌握」，为这门课完成对应环节。</p>
                <button className="practice-welcome-btn" onClick={() => setReadyOpen(false)}>知道了</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* 线上练习题目区 672px 宽（.practice-question-prompt 实测） */}
      <div className="flex items-center justify-between text-[12px] text-[#8a8a90] mt-2">
        <span className="font-medium text-[#3d3d3f]">{subtitle}</span>
        <div className="flex items-center" style={{ gap: 10 }}>
          {questions.map((_, idx) => {
            const hasAnswered = answersState[idx] !== undefined
            const wasCorrect = answersState[idx] === true
            const isCurrent = idx === i
            return (
              <button
                key={idx}
                onClick={() => {
                  if (checked || answersState[idx] !== undefined) {
                    setI(idx)
                    setPicked([])
                    setFill('')
                    setChecked(false)
                  }
                }}
                className={`practice-progress-dot ${isCurrent ? 'practice-progress-dot--active' : ''}`}
                data-tone={isCurrent ? (hasAnswered ? (wasCorrect ? 'ok' : 'bad') : 'idle') : hasAnswered ? (wasCorrect ? 'ok' : 'bad') : 'idle'}
                title={`第 ${idx + 1} 题`}
              />
            )
          })}
        </div>
        <span>
          第 {i + 1} / {questions.length} 题
        </span>
      </div>

      <div className="mt-4 rounded-[14px] border-[1.5px] border-[#e5e5e5] bg-white overflow-hidden">
      <div className="h-[3px] bg-[#f3f4f6] rounded-t-[14px] overflow-hidden"><div className="h-full bg-[#0a0a0a] transition-all" style={{ width: `${checked ? 100 : (left / QUESTION_SECONDS) * 100}%` }} /></div>
      <div className="px-6 py-4 flex items-center gap-2 text-[12.5px]" data-testid="practice-hud">
        <span className="hk-chip-bonus inline-flex items-center gap-1 px-3 h-[34px]">速答奖励 +{SPEED_BONUS}</span>
        <span className="inline-flex items-center gap-1 px-3 h-[34px] rounded-full bg-[#f4f4f5]">得分 <b className="font-mono">{score}</b>{bonus ? <span className="text-[#15803d]">+{bonus}</span> : null}</span>
        <span className="inline-flex items-center gap-1 px-3 h-[34px] rounded-full bg-[#f4f4f5] font-mono" data-testid="practice-timer">{checked ? '—' : `${left}s`}</span>
        <span className="ml-auto text-[13px] font-bold" style={{ color: '#2a4578' }}>{score}</span>
      </div>

      <div className="px-6 pt-4">
      <div className="flex items-center justify-between">
        <h1 className="text-[20px] font-semibold">{title}</h1>
        <button
          onClick={() => setAssistantOpen(true)}
          className="rounded-full text-[13px] bg-white inline-flex items-center gap-[7px]"
          style={{ padding: '0 14px', height: 34, border: '1.5px solid #e0e4ec', color: '#5b6472' }}
        >
          <Sparkles size={13} className="text-[#6366f1]" /> AI 随堂助教
        </button>
      </div>

      {/* Question Card */}
      <div className="hk-card p-6 mt-4 hk-fade-in-up shadow-sm" key={q.id}>
        {q.image?.src && (
          <img
            src={q.image.src}
            alt={q.image.alt ?? ''}
            className="max-h-[220px] rounded-lg mb-4 mx-auto"
          />
        )}
        <div className="flex items-start justify-between gap-4">
          <div className="text-[17px] font-medium" style={{ lineHeight: 1.45, color: "#1f1f1f" }}>{q.prompt}</div>
          <button
            onClick={toggleSpeech}
            className={`hk-icon-btn shrink-0 h-8 w-8 ${
              speaking ? 'text-[#3b5bdb] bg-[#eef2ff]' : 'text-[#8a8a90] hover:text-black'
            }`}
            title={speaking ? '停止朗读' : '朗读题目'}
          >
            {speaking ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
        </div>

        {q.type === 'fill' ? (
          <input
            value={fill}
            onChange={(e) => setFill(e.target.value)}
            disabled={checked}
            placeholder="输入你的答案…"
            className="mt-5 w-full h-11 px-4 rounded-xl border bg-white outline-none focus:border-[#0a0a0a] text-[14px]"
          />
        ) : (
          <div className="practice-options-panel mt-5">
          <div className={`practice-options-grid ${(q.options ?? []).length <= 2 ? 'practice-options-grid--stacked' : ''}`}>
            {(q.options ?? []).map((o, oi) => {
              const on = picked.includes(o)
              const right = checked && correct.includes(o)
              const wrong = checked && on && !correct.includes(o)
              return (
                <button
                  key={oi}
                  disabled={checked}
                  data-testid={`option-${oi + 1}`}
                  onClick={() =>
                    setPicked((p) =>
                      q.type === 'multiple'
                        ? on
                          ? p.filter((x) => x !== o)
                          : [...p, o]
                        : [o]
                    )
                  }
                  className={`practice-option-card ${on ? 'practice-option-card--selected' : ''} ${right ? 'practice-option-card--correct' : ''} ${wrong ? 'practice-option-card--incorrect' : ''} ${checked ? 'practice-option-card--readonly' : ''}`}
                >
                  <span className="practice-option-key">{oi + 1}</span>
                  <span className="practice-option-shape" aria-hidden="true">{String.fromCharCode(65 + oi)}</span>
                  <span className="practice-option-text">{o}</span>
                  <span className="practice-option-indicator" aria-hidden="true" />
                </button>
              )
            })}
          </div>
          </div>
        )}
      </div>
      </div>
      </div>
      </div>
      </section>

      <div className="practice-verdict" data-testid="practice-verdict">
        <div className="practice-verdict-inner">
          {checked && (
          <div className={`practice-feedback ${isRight ? 'practice-feedback--correct' : 'practice-feedback--incorrect'} mt-5 hk-fade-in`} data-testid="practice-feedback">
            <div className="practice-verdict-headline">
              <span className="practice-verdict-mark">{isRight ? '✓' : '✗'}</span>
              {isRight ? '回答正确' : '再想想'}
            </div>
            {q.explanation && <p className="practice-feedback-explanation mt-2">{q.explanation}</p>}
          </div>
          )}
        </div>
      </div>
      </div>

      <div className="practice-actions">

        {/* 线上底栏：左「助手」pill，右侧「检查 / 跳过」两个 pill，间距 23px */}
        <div className="flex items-center mt-6 pt-4 border-t" style={{ gap: 23 }}>
          <button
            onClick={() => setAssistantOpen(true)}
            className="practice-assistant-toggle"
            data-testid="assistant-toggle"
          >
            <Lightbulb size={13} className="text-[#f59e0b]" /> 助手
          </button>
          <div className="ml-auto flex items-center" style={{ gap: 23 }}>
            {!checked ? (
              <>
                <button
                  onClick={() => { setChecked(true); setSkippedQuestions((s) => ({ ...s, [q.id]: true })) }}
                  className="practice-skip-btn"
                  data-testid="skip-btn"
                >
                  跳过
                </button>
                <button
                  disabled={q.type === 'fill' ? !fill.trim() : picked.length === 0}
                  onClick={handleCheck}
                  className="practice-check-btn"
                  data-testid="check-btn"
                >
                  检查
                </button>
              </>
            ) : (
              <button
                onClick={next}
                className="practice-check-btn practice-check-btn--next inline-flex items-center gap-1"
              >
                {i + 1 >= questions.length ? '完成测验' : '下一题'} <ChevronRight size={14} />
              </button>
            )}
          </div>
        </div>
      </div>

      </div>

      <AssistantDrawer
        open={assistantOpen}
        onClose={() => setAssistantOpen(false)}
        courseId={courseId}
        currentQuestion={q}
      />
      {confetti.length > 0 && (
        <div className="practice-check-confetti-layer" aria-hidden="true" data-testid="practice-confetti">
          {confetti.map((cf) => (
            <span key={cf.id}
              className={`practice-check-confetti-piece practice-check-confetti-piece--${cf.shape}`}
              style={{
                left: cf.x, top: cf.y, width: cf.size, height: cf.shape === 'circle' ? cf.size : cf.size * 0.6, background: cf.color,
                ['--cf-dx' as string]: `${cf.dx}px`, ['--cf-dy' as string]: `${cf.dy}px`, ['--cf-rotate' as string]: `${cf.rotate}deg`,
                ['--cf-duration' as string]: `${cf.duration}s`, animationDelay: `${cf.delay}s`,
              }} />
          ))}
        </div>
      )}
    </div>
  )
}

// [S30] 练习：/course/:id/practice/:sessionId
export function Practice() {
  const { courseId = '', sessionId = '' } = useParams()
  const nav = useNavigate()
  const [data, setData] = useState<{
    sessions: { title: string; sessionId: string; questions: Question[] }[]
  } | null>(null)
  const [result, setResult] = useState<{
    score: number
    total: number
    userAnswers: Record<number, { picked: string[]; fill: string; isRight: boolean }>
    fastCount?: number
    fastIds?: string[]
    points?: number
    perfect?: number
    stars?: number
  } | null>(null)

  useEffect(() => {
    apiGet<{ sessions: { title: string; sessionId: string; questions: Question[] }[] }>(
      `/course-generation/courses/${courseId}/practice`
    )
      .then((next) => {
        setData(next)
        const target = next.sessions.find((s) => s.sessionId === sessionId) ?? next.sessions[0]
        if (target) void apiPost(`/course-generation/courses/${courseId}/practice/start`, { sessionId: target.sessionId }).catch(() => undefined)
      })
      .catch(() => setData({ sessions: [] }))
  }, [courseId, sessionId])

  const session = useMemo(
    () => data?.sessions.find((s) => s.sessionId === sessionId) ?? data?.sessions[0],
    [data, sessionId]
  )

  if (!data)
    return (
      <div className="p-10">
        <div className="hk-skeleton h-40 rounded-2xl max-w-[760px] mx-auto" />
      </div>
    )
  if (!session) return <Empty back={() => nav(`/course/${courseId}`)} text="这一节还没有随堂练习题" />
  if (result)
    return (
      <Result
        back={() => nav(`/course/${courseId}`)}
        onRetry={() => setResult(null)}
        score={result.score}
        total={result.total}
        label="随堂练习完成"
        questions={session.questions}
        userAnswers={result.userAnswers}
        fastCount={result.fastCount ?? 0}
        fastIds={result.fastIds ?? []}
        points={result.points}
        perfect={result.perfect}
        stars={result.stars}
        courseId={courseId}
        courseTitle={session.title}
      />
    )

  return (
    <>
      <BackBar onBack={() => nav(`/course/${courseId}`)} />
      <QuizRunner
        title={session.title}
        subtitle="随堂练习 · 巩固内化"
        courseId={courseId}
        questions={session.questions}
        onFinish={async (score, total, userAnswers, meta) => {
          // 线上练习口径：{ sessionId, finished, items, score: 点数, perfect, stars }
          const items: Record<string, { state: string; answer: string | string[] | null; fast?: boolean }> = {}
          session.questions.forEach((q, idx) => {
            const ans = userAnswers[idx]
            if (!ans) { items[q.id] = { state: 'skipped', answer: null }; return }
            items[q.id] = { state: ans.isRight ? 'correct' : 'wrong', answer: q.type === 'fill' ? ans.fill : ans.picked, ...(meta?.fastIds?.includes(q.id) ? { fast: true } : {}) }
          })
          await apiPost(`/course-generation/courses/${courseId}/practice/progress`, {
            sessionId: session.sessionId,
            finished: true,
            items,
            score: meta?.points ?? score,
            perfect: meta?.perfect ?? total,
            stars: meta?.stars ?? 0,
          }).catch(() => {})
          setResult({ score, total, userAnswers, fastCount: meta?.fastCount, fastIds: meta?.fastIds, points: meta?.points, perfect: meta?.perfect, stars: meta?.stars })
        }}
      />
    </>
  )
}

// [S30] 考试：/course/:id/exam/:unitId
export function Exam() {
  const { courseId = '', unitId = '' } = useParams()
  const nav = useNavigate()
  const [data, setData] = useState<{
    exams: { title: string; unitId: string; questions: Question[]; fastWindowMs?: number; fastBonus?: number }[]
  } | null>(null)
  const [result, setResult] = useState<{
    score: number
    total: number
    userAnswers: Record<number, { picked: string[]; fill: string; isRight: boolean }>
    fastCount?: number
    fastIds?: string[]
    points?: number
    perfect?: number
    stars?: number
  } | null>(null)

  useEffect(() => {
    apiGet<{ exams: { title: string; unitId: string; questions: Question[]; fastWindowMs?: number; fastBonus?: number }[] }>(
      `/course-generation/courses/${courseId}/exam`
    )
      .then(setData)
      .catch(() => setData({ exams: [] }))
  }, [courseId])

  const exam = useMemo(
    () => data?.exams.find((e) => e.unitId === unitId) ?? data?.exams[0],
    [data, unitId]
  )

  if (!data)
    return (
      <div className="p-10">
        <div className="hk-skeleton h-40 rounded-2xl max-w-[760px] mx-auto" />
      </div>
    )
  if (!exam) return <Empty back={() => nav(`/course/${courseId}`)} text="这个单元还没有综合测试" />
  if (result)
    return (
      <Result
        back={() => nav(`/course/${courseId}`)}
        onRetry={() => setResult(null)}
        score={result.score}
        total={result.total}
        label="单元综合考试完成"
        questions={exam.questions}
        userAnswers={result.userAnswers}
        fastCount={result.fastCount ?? 0}
        fastIds={result.fastIds ?? []}
        points={result.points}
        perfect={result.perfect}
        stars={result.stars}
        courseId={courseId}
        courseTitle={exam.title}
      />
    )

  return (
    <>
      <BackBar onBack={() => nav(`/course/${courseId}`)} />
      <QuizRunner
        mode="exam"
        title={exam.title}
        subtitle="单元综合考试"
        courseId={courseId}
        fastWindowMs={exam.fastWindowMs ?? 10000}
        fastBonus={exam.fastBonus ?? 200}
        questions={exam.questions}
        onFinish={async (score, total, userAnswers, meta) => {
          // 线上提交口径：{ unitId, score: 百分比, items: { [qid]: { state, answer } } }（items 里 skipped/correct/wrong）
          const items: Record<string, { state: string; answer: string | string[] | null }> = {}
          exam.questions.forEach((q, idx) => {
            const ans = userAnswers[idx]
            if (!ans) { items[q.id] = { state: 'skipped', answer: null }; return }
            items[q.id] = { state: ans.isRight ? 'correct' : 'wrong', answer: q.type === 'fill' ? ans.fill : ans.picked, ...(meta?.fastIds?.includes(q.id) ? { fast: true } : {}) }
          })
          await apiPost(`/course-generation/courses/${courseId}/exam/score`, {
            unitId: exam.unitId,
            score: Math.round((score / total) * 100),
            items,
          }).catch(() => {})
          setResult({ score, total, userAnswers, fastCount: meta?.fastCount, fastIds: meta?.fastIds, points: meta?.points, perfect: meta?.perfect, stars: meta?.stars })
        }}
      />
    </>
  )
}

// [S30] 项目阶段：/course/:id/project/:stageId
export function Project() {
  const { courseId = '', stageId = '' } = useParams()
  const nav = useNavigate()
  const [data, setData] = useState<{
    stages?: {
      stage_id: string
      stage_title: string
      stage_description: string
      deliverable_increment?: string
      steps?: { step_id: string; title: string; instruction?: string }[]
    }[]
    projects?: { project_name: string; project_description: string }[]
  } | null>(null)
  const [activeStageId, setActiveStageId] = useState(stageId)
  const [draft, setDraft] = useState('')
  // 步骤级草稿（线上 drafts 以步骤为键；服务端按 {drafts:{[step_id]: text}} 存）
  const [stepDrafts, setStepDrafts] = useState<Record<string, string>>({})
  const [stepDone, setStepDone] = useState<Record<string, boolean>>({})
  const [savingStep, setSavingStep] = useState<string>('')
  const [feedback, setFeedback] = useState('')
  const [score, setScore] = useState<number | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [assistantOpen, setAssistantOpen] = useState(false)

  useEffect(() => {
    if (!activeStageId) return
    void apiGet<{ drafts?: Record<string, string>; submissions?: Record<string, unknown>; status?: string | null; score?: number | null; feedback?: string | null }>(`/course-generation/courses/${courseId}/project/stages/${activeStageId}/state`)
      .then((state) => {
        const drafts = state.drafts ?? {}
        setStepDrafts(Object.fromEntries(Object.entries(drafts).map(([key, value]) => [key, String(value ?? '')])))
        const saved = Object.values(drafts).at(-1)
        if (typeof saved === 'string' && saved.trim()) setDraft(saved)
        if (typeof state.score === 'number') setScore(state.score)
        if (state.feedback) setFeedback(state.feedback)
      })
      .catch(() => undefined)
  }, [courseId, activeStageId])

  useEffect(() => {
    apiGet<typeof data>(`/course-generation/courses/${courseId}/project`)
      .then((r) => {
        setData(r)
        if (!activeStageId && r?.stages?.[0]) setActiveStageId(r.stages[0].stage_id)
      })
      .catch(() => setData({}))
  }, [courseId, activeStageId])

  const stages = data?.stages ?? []
  const stage = stages.find((s) => s.stage_id === (activeStageId || stageId)) ?? stages[0]

  if (!data)
    return (
      <div className="p-10">
        <div className="hk-skeleton h-40 rounded-2xl max-w-[860px] mx-auto" />
      </div>
    )
  if (!stage) return <Empty back={() => nav(`/course/${courseId}`)} text="这门课程暂未配置实战项目" />

  const loadTemplate = () => {
    const template = `## 阶段交付物：${stage.stage_title}\n\n### 1. 系统抽象与前提假定\n- 作用域定义：\n- 关键状态变量与公理约束：\n\n### 2. 算法与核心推导实现\n\`\`\`python\ndef solve_core_problem(inputs):\n    # TODO: 实现核心推导逻辑\n    pass\n\`\`\`\n\n### 3. 边界条件与验证结果\n- 常规用例：\n- 极端边界用例：\n`
    setDraft(template)
  }

  const saveStep = async (stepId: string) => {
    setSavingStep(stepId)
    await apiPost(`/course-generation/courses/${courseId}/project/stages/${stage.stage_id}/state`, { drafts: { [stepId]: stepDrafts[stepId] ?? '' } }).catch(() => undefined)
    setSavingStep('')
  }

  const submit = async () => {
    setSubmitting(true)
    try {
      // 服务端有模型才评分；没有模型时只记录提交（不编造分数与成功文案）
      const res = await apiPost<{ feedback?: string; score?: number | null; evaluated?: boolean }>(
        `/course-generation/courses/${courseId}/project/stages/${stage.stage_id}/state`,
        { submission: draft, status: 'submitted' }
      )
      setFeedback(res.feedback ?? (res.evaluated === false ? '已记录本次提交（未配置模型时不评分）' : '评审已完成'))
      setScore(typeof res.score === 'number' ? res.score : null)
    } catch (error) {
      setFeedback(`提交失败：${error instanceof Error ? error.message : '请稍后重试'}`)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-[860px] px-8 pb-24">
      <BackBar onBack={() => nav(`/course/${courseId}`)} />

      {/* Project Header */}
      <div className="flex items-center justify-between mt-3">
        <div>
          <div className="text-[12px] font-semibold text-[#3b5bdb] uppercase tracking-wider">
            {data.projects?.[0]?.project_name ?? '综合实战项目'}
          </div>
          <h1 className="text-[24px] font-semibold tracking-tight mt-1">{stage.stage_title}</h1>
        {/* 线上阶段由多个步骤组成：逐步写、逐步存（drafts 以 step_id 为键） */}
        {Array.isArray(stage.steps) && stage.steps.length > 0 && (
          <div className="mt-5 hk-card p-4" data-testid="stage-steps">
            <div className="text-[12px] text-[#8a8a90] mb-2">阶段步骤 · {stage.steps.length} 步（草稿按步骤保存）</div>
            <ol className="space-y-2">
              {stage.steps.map((step, index) => (
                <li key={step.step_id} className="rounded-xl border border-[#e4e4e7] p-3">
                  <div className="flex items-center gap-2">
                    <span className={`h-5 w-5 rounded-full text-[11px] flex items-center justify-center ${stepDone[step.step_id] ? 'bg-[#16a34a] text-white' : 'bg-[#f1f2f4]'}`}>{stepDone[step.step_id] ? '✓' : index + 1}</span>
                    <span className="text-[13px] font-medium flex-1">{step.title}</span>
                    <button onClick={() => setStepDone((s) => ({ ...s, [step.step_id]: !s[step.step_id] }))} className="hk-pill h-7 px-2 text-[11px]">{stepDone[step.step_id] ? '取消完成' : '标记完成'}</button>
                  </div>
                  {step.instruction && <div className="text-[12px] text-[#6b6b70] mt-1.5 leading-5">{step.instruction}</div>}
                  <textarea
                    value={stepDrafts[step.step_id] ?? ''}
                    onChange={(e) => setStepDrafts((d) => ({ ...d, [step.step_id]: e.target.value }))}
                    placeholder="写下这一步的产出…"
                    aria-label={`步骤 ${index + 1} 草稿`}
                    className="w-full mt-2 min-h-[64px] rounded-lg border border-[#e4e4e7] p-2 text-[13px] outline-none focus:border-[#a1a1aa]"
                  />
                  <div className="flex justify-end mt-1.5">
                    <button onClick={() => void saveStep(step.step_id)} disabled={savingStep === step.step_id} className="hk-pill h-7 px-3 text-[11px]">{savingStep === step.step_id ? '保存中…' : '保存本步草稿'}</button>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        )}

        </div>
        <button
          onClick={() => setAssistantOpen(true)}
          className="hk-pill bg-gradient-to-r from-[#eef2ff] to-[#f5f3ff] text-[#3b5bdb] border-[#c7d2fe]"
        >
          <Sparkles size={13} className="text-[#6366f1]" /> AI 项目导师
        </button>
      </div>

      {/* Stage Tabs Navigation */}
      {stages.length > 1 && (
        <div className="flex gap-2 mt-5 border-b pb-3">
          {stages.map((st, idx) => (
            <button
              key={st.stage_id}
              onClick={() => {
                setActiveStageId(st.stage_id)
                setFeedback('')
                setScore(null)
              }}
              className={`px-3.5 py-1.5 rounded-xl text-[13px] font-medium transition-all ${
                st.stage_id === stage.stage_id
                  ? 'bg-[#0a0a0a] text-white shadow-sm'
                  : 'bg-[#f4f4f5] text-[#6b6b70] hover:text-black'
              }`}
            >
              阶段 {idx + 1}：{st.stage_title.slice(0, 10)}…
            </button>
          ))}
        </div>
      )}

      <p className="text-[14px] text-[#3d3d3f] leading-7 mt-4">{stage.stage_description}</p>

      {stage.deliverable_increment && (
        <div className="hk-card p-4 mt-4 text-[13px] bg-[#f8fafc] border-[#cbd5e1]">
          <span className="font-semibold text-[#0f172a]">📦 本阶段验收指标：</span>
          <span className="text-[#334155] ml-1">{stage.deliverable_increment}</span>
        </div>
      )}

      {/* Editor & Actions */}
      <div className="mt-5">
        <div className="flex items-center justify-between mb-2">
          <label className="text-[13px] font-medium text-[#1c1c1e] flex items-center gap-1.5">
            <Code size={14} /> 阶段交付方案编写与代码推导
          </label>
          <button
            onClick={loadTemplate}
            className="text-[12px] text-[#3b5bdb] hover:underline inline-flex items-center gap-1"
          >
            <BookOpen size={12} /> 导入标准工程模板
          </button>
        </div>
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          rows={12}
          placeholder="在这里撰写你的系统建模分析、算法逻辑或粘贴可运行代码…"
          className="w-full rounded-2xl border bg-white p-4 text-[14px] font-mono leading-7 outline-none focus:border-[#0a0a0a] shadow-inner"
        />
      </div>

      <div className="flex items-center gap-3 mt-4">
        <span className="text-[12px] text-[#8a8a90]">
          字数：{draft.length} · 支持 Markdown 与 Python 代码块
        </span>
        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={submit}
            disabled={!draft.trim() || submitting}
            className="h-10 px-6 rounded-full bg-[#0a0a0a] text-white text-[13px] font-medium disabled:opacity-40 hover:bg-black/85 transition-colors shadow-sm"
          >
            {submitting ? '正在评审…' : '提交阶段成果'}
          </button>
        </div>
      </div>

      {/* Feedback Card */}
      {feedback && (
        <div className="hk-card p-6 mt-6 border-[#c7d2fe] bg-[#fdfefe] hk-fade-in-up">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Trophy size={18} className="text-[#f59e0b]" />
              <span className="font-semibold text-[15px]">AI 评审委员会反馈</span>
            </div>
            {score !== null && (
              <span className="px-2.5 py-1 rounded-full bg-[#ecfdf5] text-[#059669] text-[12px] font-bold">
                评分 {score} / 100
              </span>
            )}
          </div>
          <div className="hk-prose text-[13px] leading-6 text-[#374151]">
            <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
              {feedback}
            </ReactMarkdown>
          </div>
        </div>
      )}

      <AssistantDrawer
        open={assistantOpen}
        onClose={() => setAssistantOpen(false)}
        courseId={courseId}
        isProject={true}
        stageTitle={stage.stage_title}
      />
    </div>
  )
}

// 线上 .practice-slot-score：分数逐位滚动（strip 从上一层数字滚到当前数字）
function PracticeScore({ value }: { value: number }) {
  const digits = String(value).split('')
  return (
    <span className="practice-slot-score">
      {digits.map((d, i) => (
        <span key={i} className="practice-slot-digit" style={{ width: '1ch' }}>
          <span className="practice-slot-digit-strip" key={`${i}-${d}`} style={{ ['--slot-from' as string]: '-105%', ['--slot-to' as string]: '0%', ['--slot-delay' as string]: `${i * 60}ms` }}>
            <span className="practice-slot-digit-char">{d}</span>
            <span className="practice-slot-digit-char">{d}</span>
          </span>
        </span>
      ))}
    </span>
  )
}

function BackBar({ onBack }: { onBack: () => void }) {
  return (
    <div className="mx-auto max-w-[760px] px-8 pt-2 mb-2">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-[12px] text-[#6b6b70] hover:text-black transition-colors"
      >
        <ArrowLeft size={13} /> 返回课程结构
      </button>
    </div>
  )
}

function Empty({ back, text }: { back: () => void; text: string }) {
  return (
    <div className="p-16 text-center text-[#8a8a90]">
      {text}
      <div className="mt-4">
        <button onClick={back} className="hk-pill">
          返回课程
        </button>
      </div>
    </div>
  )
}

function Result({
  back,
  onRetry,
  score,
  total,
  label,
  questions = [],
  userAnswers = {},
  fastIds = [],
  fastCount = 0,
  points = 0,
  perfect = 0,
  stars = 0,
  courseId = '',
  courseTitle = '',
}: {
  back: () => void
  onRetry?: () => void
  score: number
  total: number
  label: string
  questions?: Question[]
  userAnswers?: Record<number, { picked: string[]; fill: string; isRight: boolean }>
  fastIds?: string[]
  fastCount?: number
  points?: number
  perfect?: number
  stars?: number
  courseId?: string
  courseTitle?: string
}) {
  const [activeTab, setActiveTab] = useState<'summary' | 'review'>('summary')
  const [filter, setFilter] = useState<'all' | 'wrong'>('all')
  const [scheduledIndices, setScheduledIndices] = useState<Record<number, boolean>>({})
  const [batchScheduled, setBatchScheduled] = useState(false)
  const [scheduling, setScheduling] = useState(false)

  const pct = Math.round((score / Math.max(total, 1)) * 100)
  const wrongCount = Math.max(total - score, 0)

  const wrongIndices = useMemo(() => {
    return questions.map((_, i) => i).filter((i) => {
      const ans = userAnswers[i]
      return ans ? !ans.isRight : false
    })
  }, [questions, userAnswers])

  const displayedIndices = useMemo(() => {
    if (filter === 'wrong') return wrongIndices
    return questions.map((_, i) => i)
  }, [filter, questions, wrongIndices])

  const handleScheduleOne = async (idx: number, q: Question) => {
    if (scheduledIndices[idx]) return
    try {
      const tomorrow = new Date(Date.now() + 86400000).toISOString()
      await apiPost('/calendar/tasks', {
        title: `错题攻克 · ${q.prompt.slice(0, 24)}...`,
        course_uuid: courseId,
        course_title: courseTitle,
        scheduled_for: tomorrow,
        duration_min: 15,
        type: 'review',
      })
      setScheduledIndices((prev) => ({ ...prev, [idx]: true }))
    } catch {
      setScheduledIndices((prev) => ({ ...prev, [idx]: true }))
    }
  }

  const handleBatchSchedule = async () => {
    if (batchScheduled || scheduling || wrongIndices.length === 0) return
    setScheduling(true)
    try {
      const tomorrow = new Date(Date.now() + 86400000).toISOString()
      await apiPost('/calendar/tasks', {
        title: `错题复盘 ·「${courseTitle || '知识专项'}」${wrongIndices.length} 道难点攻坚`,
        course_uuid: courseId,
        course_title: courseTitle,
        scheduled_for: tomorrow,
        duration_min: 25,
        type: 'review',
      })
      const map: Record<number, boolean> = {}
      wrongIndices.forEach((idx) => {
        map[idx] = true
      })
      setScheduledIndices(map)
      setBatchScheduled(true)
    } finally {
      setScheduling(false)
    }
  }

  return (
    <div className="mx-auto max-w-[760px] px-6 py-10 hk-fade-in-up">
      {/* Top Tab Bar */}
      <div className="flex items-center justify-between border-b pb-4 mb-8">
        <div className="flex items-center gap-2 bg-[#f4f4f5] p-1 rounded-xl text-[13px]">
          <button
            onClick={() => setActiveTab('summary')}
            className={`px-4 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === 'summary' ? 'bg-white shadow-sm text-black' : 'text-[#71717a] hover:text-black'
            }`}
          >
            成绩报告
          </button>
          <button
            onClick={() => setActiveTab('review')}
            className={`px-4 py-1.5 rounded-lg font-medium transition-all flex items-center gap-1.5 ${
              activeTab === 'review' ? 'bg-white shadow-sm text-black' : 'text-[#71717a] hover:text-black'
            }`}
          >
            答题解析与错题本
            {wrongCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[11px] bg-[#fee2e2] text-[#dc2626] font-semibold">
                {wrongCount}
              </span>
            )}
          </button>
        </div>

        <button
          onClick={back}
          className="hk-pill h-8 text-[12px] px-3 inline-flex items-center gap-1 text-[#6b6b70] hover:text-black"
        >
          <ArrowLeft size={12} /> 返回课程主页
        </button>
      </div>

      {activeTab === 'summary' ? (
        <div className="text-center pt-6 max-w-[540px] mx-auto">
          <div className="text-[52px] animate-bounce mb-2">
            {pct >= 80 ? '🎉' : pct >= 60 ? '👏' : '💪'}
          </div>
          <h1 className="text-[24px] font-semibold">{label}</h1>
          <div className="text-[48px] font-bold mt-2 text-[#0a0a0a]">
            {pct}
            <span className="text-[18px] text-[#8a8a90] font-normal"> 分</span>
          </div>

          <p className="text-[14px] text-[#6b6b70] mt-2">
            共答对 {score} / {total} 题 · 学习掌握度已即时写回知识图谱
            {fastCount > 0 && <span className="exam-score-points-bonus" data-testid="fast-count"> · 其中速答 {fastCount} 题</span>}
          </p>
          {perfect > 0 && (
            <div className="exam-score-points mt-2" data-testid="score-points">
              得分 <b>{points.toLocaleString()}</b> / 满分 {perfect.toLocaleString()}
              {fastCount > 0 && <span className="exam-score-points-bonus"> · 速答加成 {fastCount * 200}</span>}
            </div>
          )}
          {stars > 0 && (
            <div className="star-rating mt-2 justify-center" data-testid="result-stars" aria-label={`${stars} 星`}>
              {[1, 2, 3].map((n) => (
                <span key={n} className={`star-rating-star ${n <= stars ? 'filled' : ''}`} aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24"><path d="M12 3.6l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.8-5.2 2.8 1-5.8-4.3-4.1 5.9-.9z" /></svg>
                </span>
              ))}
            </div>
          )}

          <div className="grid grid-cols-3 gap-3 my-8 text-left">
            <div className="hk-card p-4 text-center">
              <div className="text-[11px] text-[#8a8a90]">正确率</div>
              <div className="text-[20px] font-bold mt-1 text-[#16a34a]">{pct}%</div>
            </div>
            <div className="hk-card p-4 text-center">
              <div className="text-[11px] text-[#8a8a90]">做对题数</div>
              <div className="text-[20px] font-bold mt-1 text-[#0a0a0a]">{score} <span className="text-[12px] font-normal text-[#8a8a90]">/ {total}</span></div>
            </div>
            <div className="hk-card p-4 text-center">
              <div className="text-[11px] text-[#8a8a90]">待巩固错题</div>
              <div className="text-[20px] font-bold mt-1 text-[#dc2626]">{wrongCount}</div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => {
                  setActiveTab('review')
                  setFilter(wrongCount > 0 ? 'wrong' : 'all')
                }}
                className="h-10 px-5 rounded-full bg-[#0a0a0a] text-white text-[13px] font-medium inline-flex items-center gap-1.5 shadow-sm hover:bg-black/90"
              >
                <BookOpen size={14} /> 查看答题解析与错题本
              </button>
              {onRetry && (
                <button onClick={onRetry} className="hk-pill h-10 px-5 inline-flex items-center gap-1.5">
                  <RotateCcw size={13} /> 再练一次
                </button>
              )}
            </div>

            {wrongCount > 0 && (
              <button
                onClick={handleBatchSchedule}
                disabled={batchScheduled || scheduling}
                className="mt-2 text-[12px] text-[#6366f1] hover:text-[#4f46e5] inline-flex items-center justify-center gap-1.5 py-1.5"
              >
                {batchScheduled ? (
                  <>
                    <BookmarkCheck size={14} className="text-[#16a34a]" /> 已一键加入明日间隔复习计划
                  </>
                ) : (
                  <>
                    <CalendarPlus size={14} /> 一键将 {wrongCount} 道错题加入明日智能间隔复习日程
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Review / Wrong Notebook View */
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-2 border-b">
            <div className="flex items-center gap-2 text-[12px]">
              <button
                onClick={() => setFilter('all')}
                className={`px-3 py-1 rounded-full font-medium transition-colors ${
                  filter === 'all' ? 'bg-[#0a0a0a] text-white' : 'bg-[#f4f4f5] text-[#71717a] hover:text-black'
                }`}
              >
                全部解析 ({questions.length})
              </button>
              <button
                onClick={() => setFilter('wrong')}
                className={`px-3 py-1 rounded-full font-medium transition-colors ${
                  filter === 'wrong' ? 'bg-[#fee2e2] text-[#dc2626]' : 'bg-[#f4f4f5] text-[#71717a] hover:text-black'
                }`}
              >
                仅看错题 ({wrongCount})
              </button>
            </div>

            {wrongCount > 0 && (
              <button
                onClick={handleBatchSchedule}
                disabled={batchScheduled || scheduling}
                className="hk-pill h-7 text-[11px] px-3 inline-flex items-center gap-1 text-[#6366f1] hover:bg-[#eef2ff]"
              >
                {batchScheduled ? <BookmarkCheck size={12} className="text-[#16a34a]" /> : <CalendarPlus size={12} />}
                {batchScheduled ? '已加入日程' : '一键安排错题复习'}
              </button>
            )}
          </div>

          {displayedIndices.length === 0 ? (
            <div className="p-12 text-center text-[#8a8a90] hk-card">
              <Sparkles size={28} className="mx-auto mb-2 text-[#eab308]" />
              <div className="text-[14px] font-medium text-[#0a0a0a]">全对通过！没有错题需要复习</div>
              <div className="text-[12px] mt-1 text-[#71717a]">太棒了，本章节概念你已经彻底掌握。</div>
            </div>
          ) : (
            displayedIndices.map((idx) => {
              const q = questions[idx]
              if (!q) return null
              const ans = userAnswers[idx]
              const isRight = ans?.isRight ?? false
              const isFill = q.type === 'fill'
              const isMulti = q.type === 'multiple'
              const correctAnswers = q.correctAnswers ?? []
              const userPicked = ans?.picked ?? []

              return (
                <div
                  key={q.id || idx}
                  className={`hk-card p-5 transition-all border ${
                    isRight ? 'border-[#e4e4e7]' : 'border-[#fca5a5] bg-[#fffbfb]'
                  }`}
                >
                  {/* Question Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[12px] font-semibold text-[#0a0a0a]">第 {idx + 1} 题</span>
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#f1f2f4] text-[#71717a]">
                        {isFill ? '填空题' : isMulti ? '多选题' : '单选题'}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {isRight ? (
                        <span className="inline-flex items-center gap-1 text-[12px] text-[#16a34a] font-medium bg-[#f0fdf4] px-2.5 py-0.5 rounded-full border border-[#bbf7d0]">
                          <Check size={12} /> 回答正确
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[12px] text-[#dc2626] font-medium bg-[#fef2f2] px-2.5 py-0.5 rounded-full border border-[#fecaca]">
                          <X size={12} /> 回答错误
                        </span>
                      )}

                      {!isRight && (
                        <button
                          onClick={() => handleScheduleOne(idx, q)}
                          disabled={scheduledIndices[idx]}
                          className="hk-pill h-6 text-[11px] px-2 inline-flex items-center gap-1 text-[#6b6b70] hover:text-black"
                          title="加入间隔复习日历"
                        >
                          {scheduledIndices[idx] ? (
                            <>
                              <BookmarkCheck size={11} className="text-[#16a34a]" /> 已安排
                            </>
                          ) : (
                            <>
                              <CalendarPlus size={11} /> 安排复习
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Question Prompt（速答题标「速答」chip，对应线上 items 的 fast 字段） */}
                  <div className="text-[14px] font-medium leading-relaxed text-[#0a0a0a] mb-4">
                    {q.prompt}
                    {fastIds.includes(q.id) && <span className="exam-bonus-chip ml-2 align-middle" data-testid={`fast-${q.id}`}>速答</span>}
                  </div>

                  {/* Options or Fill Display */}
                  {isFill ? (
                    <div className="space-y-2 mb-4 text-[13px]">
                      <div className="p-3 rounded-xl bg-white border border-[#e4e4e7] flex items-center justify-between">
                        <span className="text-[#71717a]">你的填写：</span>
                        <span className={`font-mono font-medium ${isRight ? 'text-[#16a34a]' : 'text-[#dc2626]'}`}>
                          {ans?.fill || '（未作答）'}
                        </span>
                      </div>
                      {!isRight && (
                        <div className="p-3 rounded-xl bg-[#f0fdf4] border border-[#bbf7d0] flex items-center justify-between">
                          <span className="text-[#15803d]">参考标准答案：</span>
                          <span className="font-mono font-medium text-[#15803d]">
                            {correctAnswers.join(' / ')}
                          </span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-2 mb-4">
                      {(q.options ?? []).map((opt) => {
                        const isCorrect = correctAnswers.includes(opt)
                        const wasPicked = userPicked.includes(opt)
                        let optStyle = 'border-[#e4e4e7] bg-white'
                        if (isCorrect) {
                          optStyle = 'border-[#86efac] bg-[#f0fdf4]'
                        } else if (wasPicked && !isCorrect) {
                          optStyle = 'border-[#fca5a5] bg-[#fef2f2]'
                        }

                        return (
                          <div
                            key={opt}
                            className={`p-3 rounded-xl border text-[13px] flex items-center justify-between transition-all ${optStyle}`}
                          >
                            <span className="leading-snug text-[#18181b]">{opt}</span>
                            <div className="flex items-center gap-1.5 shrink-0 ml-3">
                              {isCorrect && (
                                <span className="text-[11px] font-medium text-[#16a34a] bg-white px-2 py-0.5 rounded-full border border-[#bbf7d0]">
                                  ✓ 标准答案
                                </span>
                              )}
                              {wasPicked && !isCorrect && (
                                <span className="text-[11px] font-medium text-[#dc2626] bg-white px-2 py-0.5 rounded-full border border-[#fecaca]">
                                  ✗ 你的选择
                                </span>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  )}

                  {/* Socratic First-Principles Deduction & Explanation */}
                  {q.explanation && (
                    <div className="p-3.5 rounded-xl bg-[#f8fafc] border border-[#e2e8f0] text-[12px] leading-relaxed text-[#334155]">
                      <div className="flex items-center gap-1.5 font-medium text-[#0f172a] mb-1">
                        <Lightbulb size={13} className="text-[#eab308]" />
                        第一性原理深度推导与解析：
                      </div>
                      <div className="pl-4 border-l-2 border-[#cbd5e1] text-[#475569]">
                        {q.explanation}
                      </div>
                    </div>
                  )}
                </div>
              )
            })
          )}
        </div>
      )}
    </div>
  )
}
