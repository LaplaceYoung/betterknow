import { useEffect, useMemo, useState, useRef } from 'react'
import { useNavigate, useParams } from 'react-router'
import { ArrowLeft, Check, X, ChevronRight, Lightbulb, Volume2, VolumeX, Sparkles, Send, Plus, BookOpen, Code, Trophy, RotateCcw, CalendarPlus, BookmarkCheck } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import { api, apiGet, apiPost } from '@/lib/api'
import { SCORING, makeRivals, perfectScore, scoreQuiz, starsFor } from '@/lib/quizScoring'
import { SlotNumber } from '@/components/SlotNumber'
import { PracticeStars } from '@/components/PracticeStars'
import { ExamResultView } from '@/components/ExamResultView'
import { ExamQuestion } from '@/components/ExamQuestion'
import { CharVideo } from '@/components/CharVideo'
import { playSfx } from '@/lib/sfx'

// 线上练习彩带的调色板（T 数组）与 reduced-motion 判断
const CONFETTI_COLORS = ['#FFD95A', '#5BC878', '#5B9CF5', '#FF8F6B', '#C88AFF', '#FF6B9D', '#F0C84A']

// 线上练习的「上次尝试」载荷（r123 实测）：{finished, updatedAt, items:{qid:{state,answer,fast?,feedback?}}, score, perfect, stars}
export interface AttemptItem { state?: string; answer?: string | string[] | null; fast?: boolean; feedback?: string }
export interface PracticeAttempt { finished?: boolean; updatedAt?: string; items?: Record<string, AttemptItem>; score?: number; perfect?: number; stars?: number }

// 线上 practice.result.stars0..3（中文原文）
const STAR_TITLES = ['再来一轮', '还需巩固', '不错', '优秀']

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export interface Question {
  id: string
  type: 'single' | 'multiple' | 'fill' | 'animation' | string
  animationHtml?: string
  prompt: string
  options?: string[]
  explanation?: string
  correctAnswers?: string[]
  image?: { alt?: string; src?: string }
}


// 线上 .practice-assistant*（r112 + r154）：空态提示 → 消息（typing 三点 / markdown / 截图）
//   → 附件缩略图 → 输入行（附截图 + 发送）；拖拽文件到面板也能附图。
//   文案取自线上 zh：unavailableError / toggleLabel / emptyStateHint / inputPlaceholder。
interface AssistantAttachment { id: string; url: string; name: string }

function AssistantDrawer({
  open,
  courseId,
  sessionId = '',
  currentQuestion,
  isProject = false,
  stageTitle = '',
}: {
  open: boolean
  courseId: string
  sessionId?: string
  currentQuestion?: Question
  isProject?: boolean
  stageTitle?: string
}) {
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; text: string; images?: string[] }>>([])
  const [input, setInput] = useState('')
  const [attachments, setAttachments] = useState<AssistantAttachment[]>([])
  const [loading, setLoading] = useState(false)
  const [dragover, setDragover] = useState(false)
  const [failed, setFailed] = useState(false)
  const bodyRef = useRef<HTMLDivElement>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, loading])

  const addFiles = (files: FileList | null) => {
    if (!files?.length) return
    Array.from(files).slice(0, 4).forEach((file) => {
      if (!file.type.startsWith('image/')) return
      const reader = new FileReader()
      reader.onload = () => setAttachments((prev) => [...prev, { id: `${file.name}-${Date.now()}`, url: String(reader.result), name: file.name }])
      reader.readAsDataURL(file)
    })
  }

  const send = async (queryText?: string) => {
    const text = (queryText ?? input).trim()
    if (!text || loading) return
    const images = attachments.map((item) => item.url)
    setMessages((prev) => [...prev, { role: 'user', text, ...(images.length ? { images } : {}) }])
    if (!queryText) setInput('')
    setAttachments([])
    setFailed(false)
    setLoading(true)
    try {
      // 线上（r112 原文）：练习助手走 multipart/form-data —— session_id / question_id / messages(JSON) / images(多文件)
      const history = messages.filter((row) => row.role === 'user').map((row) => ({ role: 'user', content: row.text }))
      const nextMessages = [...history, { role: 'user', content: text }]
      if (isProject) {
        const res = await apiPost<{ message?: string; stub?: boolean }>(`/course-generation/courses/${courseId}/project/assistant`, {
          stage_id: stageTitle || 'stage_1', messages: nextMessages, message: text, stageTitle,
        })
        setMessages((prev) => [...prev, { role: 'assistant', text: res.message ?? '' }])
      } else {
        const form = new FormData()
        form.append('session_id', sessionId)
        if (currentQuestion?.id) form.append('question_id', String(currentQuestion.id))
        form.append('messages', JSON.stringify(nextMessages))
        if (currentQuestion?.prompt) form.append('questionPrompt', currentQuestion.prompt)
        if (currentQuestion?.options?.length) form.append('questionOptions', JSON.stringify(currentQuestion.options))
        if (currentQuestion?.explanation) form.append('questionExplanation', currentQuestion.explanation)
        await Promise.all(images.map(async (url) => {
          const blob = await (await fetch(url)).blob()
          form.append('images', blob, `screenshot-${Date.now()}.png`)
        }))
        const res = await api<{ message?: string }>(`/course-generation/courses/${courseId}/practice/assistant`, { method: 'POST', body: form })
        setMessages((prev) => [...prev, { role: 'assistant', text: res.message ?? '' }])
      }
    } catch {
      setFailed(true)
    } finally {
      setLoading(false)
    }
  }

  if (!open) return null

  return (
    <aside
      className={`practice-assistant practice-assistant--open${dragover ? ' practice-assistant--dragover' : ''}`}
      aria-label="Practice assistant" data-testid="practice-assistant"
      onDragOver={(e) => { e.preventDefault(); if (!dragover) setDragover(true) }}
      onDragLeave={(e) => { e.preventDefault(); if (e.currentTarget === e.target) setDragover(false) }}
      onDrop={(e) => { e.preventDefault(); setDragover(false); addFiles(e.dataTransfer.files) }}
    >
      <div className="practice-assistant-body" ref={bodyRef}>
        {messages.length === 0 && !loading && (
          <p className="practice-assistant-empty">
            这道题卡住了？向我要个提示或讲解吧——我了解这节课的内容，但不会直接告诉你答案。你也可以附上截图。
          </p>
        )}
        {messages.map((m, idx) => (
          <div key={idx} className={`practice-assistant-msg practice-assistant-msg--${m.role}`}>
            {m.images && m.images.length > 0 && (
              <div className="practice-assistant-msg-images">
                {m.images.map((url) => <img key={url.slice(-24)} src={url} alt="" className="practice-assistant-msg-image" />)}
              </div>
            )}
            {m.role === 'assistant'
              ? <div className="practice-assistant-markdown"><ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>{m.text}</ReactMarkdown></div>
              : <span className="practice-assistant-msg-text">{m.text}</span>}
          </div>
        ))}
        {loading && (
          <div className="practice-assistant-msg practice-assistant-msg--assistant practice-assistant-msg--typing">
            <span className="practice-assistant-dots" aria-label="Thinking"><span /><span /><span /></span>
          </div>
        )}
      </div>
      {attachments.length > 0 && (
        <div className="practice-assistant-attachments">
          {attachments.map((item) => (
            <span key={item.id} className="practice-assistant-thumb">
              <img src={item.url} alt={item.name} className="practice-assistant-thumb-img" />
              <button type="button" className="practice-assistant-thumb-remove" aria-label={`移除 ${item.name}`}
                onClick={() => setAttachments((prev) => prev.filter((row) => row.id !== item.id))}>×</button>
            </span>
          ))}
        </div>
      )}
      {failed && <p className="practice-assistant-error">助手暂时不可用，请重试。</p>}
      <div className="practice-assistant-input-row">
        <input ref={fileRef} type="file" accept="image/*" multiple className="practice-assistant-file-input"
          onChange={(e) => { addFiles(e.target.files); e.target.value = '' }} />
        <button type="button" className="practice-assistant-attach" aria-label="附上截图" onClick={() => fileRef.current?.click()}>
          <Plus size={14} />
        </button>
        <input className="practice-assistant-input" value={input} placeholder="询问这道题…"
          onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') void send() }} />
        <button type="button" disabled={loading || !input.trim()}
          className={`practice-assistant-submit-btn${loading || !input.trim() ? ' practice-assistant-submit-btn--disabled' : ''}`}
          aria-label="发送" onClick={() => void send()}>
          {loading ? <span className="practice-assistant-submit-spinner" aria-hidden="true" /> : <Send size={14} />}
        </button>
      </div>
    </aside>
  )
}

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
  attempt = null,
  assistantSessionId = '',
}: {
  title: string
  questions: Question[]
  subtitle?: string
  courseId: string
  mode?: 'practice' | 'exam'
  fastWindowMs?: number
  fastBonus?: number
  attempt?: PracticeAttempt | null
  assistantSessionId?: string
  onFinish: (score: number, total: number, userAnswers: Record<number, { picked: string[]; fill: string; isRight: boolean }>, meta?: { fastCount?: number; fastIds?: string[]; points?: number; perfect?: number; stars?: number; bestStreak?: number }) => void
}) {
  const [i, setI] = useState(0)
  const [picked, setPicked] = useState<string[]>([])
  const [fill, setFill] = useState('')
  const [checked, setChecked] = useState(false)
  const [score, setScore] = useState(0)
  const [speaking, setSpeaking] = useState(false)
  const [assistantOpen, setAssistantOpen] = useState(false)
  // 线上进入练习先弹「准备好练习」：插图 + 说明 + 知道了（考试有自己的 exam-intro，不弹这个）
  const [readyOpen, setReadyOpen] = useState(mode !== 'exam')
  const [answersState, setAnswersState] = useState<Record<number, boolean>>({})
  const [skippedQuestions, setSkippedQuestions] = useState<Record<string, boolean>>({})
  // 线上考试：作答按题存（O[questionId] / z[questionId]），翻页不丢；练习仍用单题缓冲
  const [examSelections, setExamSelections] = useState<Record<string, string[]>>({})
  const [examFills, setExamFills] = useState<Record<string, string>>({})
  // 线上「上次尝试」开关：De=复盘态；进复盘前把当前进度存进 Ue（ref），退出时灌回
  const [reviewing, setReviewing] = useState(false)
  // 线上：有交卷记录时欢迎弹窗走「欢迎回来」文案，并带上上次答对数（r130 实测）
  const returning = Boolean(attempt?.finished)
  const attemptCorrect = Object.values(attempt?.items ?? {}).filter((item) => item?.state === 'correct').length
  const liveAttemptRef = useRef<{ answersState: Record<number, boolean>; userAnswers: Record<number, { picked: string[]; fill: string; isRight: boolean }>; skippedQuestions: Record<string, boolean>; fastAnswers: Record<string, boolean>; i: number } | null>(null)
  const [userAnswers, setUserAnswers] = useState<Record<number, { picked: string[]; fill: string; isRight: boolean }>>({})
  // 线上练习 HUD：每题 10s 倒计时 + 速答奖励（practice-hud-chip--bonus / practice-timer-fill）
  const QUESTION_SECONDS = 10
  const SPEED_BONUS = 200
  const [left, setLeft] = useState(QUESTION_SECONDS)
  const [bonus, setBonus] = useState(0)
  const [fastAnswers, setFastAnswers] = useState<Record<string, boolean>>({})
  // 每题 10s 窗口：用开始时间戳算剩余秒，避免在 effect 里同步 setState（会触发级联渲染）
  useEffect(() => {
    if (!readyOpen) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setReadyOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [readyOpen])

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
  // 线上 HUD 的分数/连对与交卷提交的 points 同一个来源：quizScoring
  const points = useMemo(() => {
    const revealed: Record<string, boolean> = {}
    const correctness: Record<string, boolean> = {}
    for (const [idx, ans] of Object.entries(answersState)) {
      const id = questions[Number(idx)]?.id
      if (!id) continue
      revealed[id] = true
      correctness[id] = ans
    }
    return scoreQuiz({ questionIds: questions.map((qq) => qq.id), revealedQuestions: revealed, skippedQuestions, questionCorrectness: correctness, fastAnswers })
  }, [answersState, questions, skippedQuestions, fastAnswers])
  // 线上答对后的奖励节奏：先冻住旧分数 → 彩带 → 420ms 后解冻并给分数 chip 加 --score-reward 高亮
  const [reward, setReward] = useState(false)
  const [frozenTotal, setFrozenTotal] = useState<number | null>(null)
  const rewardTimers = useRef<number[]>([])
  const scoreChipRef = useRef<HTMLSpanElement | null>(null)
  useEffect(() => () => { rewardTimers.current.forEach((t) => window.clearTimeout(t)) }, [])

  const audioRef = useRef<HTMLAudioElement | null>(null)

  const [ttsVoice, setTtsVoice] = useState('calm')

  const [ttsSpeed, setTtsSpeed] = useState(1)

  useEffect(() => {
    apiGet<{ tts_config?: { voice_id?: string; speed?: number } }>('/tts/voices')
      .then((r) => { setTtsVoice(r.tts_config?.voice_id ?? 'calm'); setTtsSpeed(r.tts_config?.speed ?? 1) })
      .catch(() => {})
  }, [])

  const reviewItem = reviewing ? attempt?.items?.[q?.id ?? ''] : undefined
  const reviewPicked = reviewing
    ? (Array.isArray(reviewItem?.answer) ? reviewItem.answer : q?.type === 'fill' ? [] : typeof reviewItem?.answer === 'string' ? [reviewItem.answer] : [])
    : picked
  const reviewFill = reviewing && q?.type === 'fill' && typeof reviewItem?.answer === 'string' ? reviewItem.answer : fill
  const reviewChecked = reviewing ? Boolean(reviewItem) : checked
  const examPicked = mode === 'exam' ? (examSelections[q?.id ?? ''] ?? []) : picked
  const examFill = mode === 'exam' ? (examFills[q?.id ?? ''] ?? '') : fill
  const activePicked = reviewing ? reviewPicked : examPicked
  const activeFill = reviewing ? reviewFill : examFill

  if (!q) return null

  const correct = q.correctAnswers ?? []
  const isRight =
    q.type === 'fill'
      ? correct.some((c) => c.trim().toLowerCase() === activeFill.trim().toLowerCase())
      : activePicked.length === correct.length && activePicked.every((p) => correct.includes(p))


  // 线上考试没有「检查」步骤：翻页时静默记录作答，正误只在结果页揭晓
  // 考试提交：把按题存的作答拼成 userAnswers（与线上 O/z 字典一致）
  const examAnswerMap = (): Record<number, { picked: string[]; fill: string; isRight: boolean }> =>
    Object.fromEntries(questions.map((qq, idx) => {
      const selected = examSelections[qq.id] ?? []
      const written = examFills[qq.id] ?? ''
      const answers = qq.correctAnswers ?? []
      const ok = qq.type === 'fill'
        ? answers.some((c) => c.trim().toLowerCase() === written.trim().toLowerCase())
        : selected.length === answers.length && selected.every((p) => answers.includes(p))
      return [idx, { picked: selected, fill: written, isRight: ok }]
    }))

  // 复盘模式下，当前题的作答/正误直接从 attempt 派生（线上 Pt(attempt) 灌状态的效果）

  const reviewIsRight = reviewing ? reviewItem?.state === 'correct' : isRight

  const toggleReview = () => {
    if (!attempt?.finished) return
    if (reviewing) {
      const snapshot = liveAttemptRef.current
      liveAttemptRef.current = null
      if (snapshot) {
        setAnswersState(snapshot.answersState)
        setUserAnswers(snapshot.userAnswers)
        setSkippedQuestions(snapshot.skippedQuestions)
        setFastAnswers(snapshot.fastAnswers)
        setI(snapshot.i)
      }
      setReviewing(false)
      return
    }
    liveAttemptRef.current = { answersState, userAnswers, skippedQuestions, fastAnswers, i }
    setI(0)
    setPicked([])
    setFill('')
    setChecked(false)
    setReviewing(true)
  }

  const burst = (isFast: boolean, streakLevel: number) => {
    const anchor = scoreChipRef.current?.getBoundingClientRect()
    if (!anchor) return
    const centerX = anchor.left + anchor.width / 2
    const centerY = anchor.top + anchor.height / 2
    const level = (isFast ? 1 : 0) + (streakLevel > 0 ? 1 : 0)
    const count = 26 + 8 * level
    const pieces = Array.from({ length: count }, (_, k) => {
      const angle = (2 * Math.PI * k) / count + 0.55 * (Math.random() - 0.5)
      const distance = 48 + 62 * Math.random()
      return {
        id: Date.now() + k,
        x: centerX,
        y: centerY,
        dx: Math.cos(angle) * distance,
        dy: Math.sin(angle) * distance * 0.85 - (18 + 22 * Math.random()),
        rotate: Math.round(520 * (Math.random() - 0.5)),
        duration: (840 + 80 * Math.random()) / 1000,
        delay: (50 * Math.random()) / 1000,
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        shape: (Math.random() > 0.45 ? 'rect' : 'circle') as 'rect' | 'circle',
        size: 5 + 4 * Math.random(),
      }
    })
    setConfetti(pieces)
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
    const isFast = isRight && left > 0
    if (isFast) { setBonus((value) => value + SPEED_BONUS); setFastAnswers((f) => ({ ...f, [q.id]: true })) }
    playSfx(isRight ? 'correct' : 'wrong')
    if (isRight) {
      const previousTotal = points.total
      const upgraded = scoreQuiz({
        questionIds: questions.map((qq) => qq.id),
        revealedQuestions: { ...Object.fromEntries(Object.keys(answersState).map((idx) => [questions[Number(idx)]?.id ?? '', true])), [q.id]: true },
        skippedQuestions,
        questionCorrectness: { ...Object.fromEntries(Object.entries(answersState).map(([idx, ok]) => [questions[Number(idx)]?.id ?? '', ok])), [q.id]: true },
        fastAnswers: isFast ? { ...fastAnswers, [q.id]: true } : fastAnswers,
      })
      if (prefersReducedMotion()) { setReward(true); burst(isFast, upgraded.streak) }
      else {
        setFrozenTotal(previousTotal)
        setReward(false)
        rewardTimers.current.forEach((t) => window.clearTimeout(t))
        rewardTimers.current = [
          window.setTimeout(() => { setFrozenTotal(null); setReward(true) }, 420),
          window.setTimeout(() => setConfetti([]), 960),
        ]
        burst(isFast, upgraded.streak)
      }
    } else setReward(false)
  }

  const next = () => {
    playSfx('click')
    // 考试：提交时用按题存的作答整体拼一遍；练习沿用逐题累积
    const examAnswers = mode === 'exam' ? examAnswerMap() : null
    const mergedAnswers = examAnswers ?? { ...userAnswers, [i]: { picked, fill, isRight } }
    if (i + 1 >= questions.length) {
      {
        const ids = questions.map((qq) => qq.id)
        const revealed: Record<string, boolean> = {}
        const correctness: Record<string, boolean> = {}
        for (const [idx, ans] of Object.entries(mergedAnswers)) {
          const id = ids[Number(idx)]
          if (!id) continue
          revealed[id] = true
          correctness[id] = ans.isRight
        }
        const answeredCount = Object.values(mergedAnswers).filter((ans) => ans.isRight).length
        const points = scoreQuiz({ questionIds: ids, revealedQuestions: revealed, skippedQuestions, questionCorrectness: correctness, fastAnswers })
        onFinish(mode === 'exam' ? answeredCount : score + (isRight ? 1 : 0), questions.length, mergedAnswers, {
          fastCount: points.fastCount,
          fastIds: Object.keys(fastAnswers),
          points: points.total,
          perfect: perfectScore(ids.length),
          stars: starsFor(points.total, perfectScore(ids.length)),
          bestStreak: points.bestStreak,
        })
      }
      return
    }
    setScore((s) => s + (isRight ? 1 : 0))
    setUserAnswers(mergedAnswers)
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
      {attempt?.finished && (
        <button type="button" data-testid="last-attempt-toggle"
          className={`practice-last-attempt-toggle${reviewing ? ' practice-last-attempt-toggle--active' : ''}`}
          onClick={toggleReview}
          aria-label={reviewing ? '返回当前' : '上次尝试'}>
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
            <path d="M6.5 3.25V6.5L8.7 7.8" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="6.5" cy="6.5" r="5.5" stroke="currentColor" strokeWidth="1.1" />
          </svg>
          <span>{reviewing ? '返回当前' : '上次尝试'}</span>
        </button>
      )}
      {reviewing && <div className="practice-review-badge" role="status">正在查看上次尝试</div>}
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
        {!reviewing && mode !== 'exam' && <div className="practice-hud" role="status" aria-live="off">
          {points.streak >= 2 && <span className="practice-hud-chip practice-hud-chip--streak" data-testid="streak-chip">连对 <b>{points.streak}</b></span>}
          <span className="practice-hud-chip practice-hud-chip--bonus" data-testid="bonus-chip">
            <svg width="11" height="13" viewBox="0 0 11 13" fill="none" aria-hidden="true">
              <path d="M6.2 0.6L0.8 7.2h3.4l-.9 5.2 5.9-7h-3.5z" fill="currentColor" />
            </svg>
            速答奖励 <b>+{SCORING.fastBonus}</b>{!checked && left > 0 && <b>{left}s</b>}
          </span>
          <span ref={scoreChipRef} data-testid="score-chip"
            className={`practice-hud-chip practice-hud-chip--score${reward ? ' practice-hud-chip--score-reward' : ''}`}>
            得分 <b><SlotNumber value={frozenTotal ?? points.total} /><span className="practice-sr-only">{points.total.toLocaleString()}</span></b>
          </span>
        </div>}
        <button type="button"
          className={`practice-assistant-toggle${assistantOpen ? ' practice-assistant-toggle--active' : ''}`}
          onClick={() => setAssistantOpen((v) => !v)}
          aria-label={assistantOpen ? 'Close assistant' : 'Open assistant'}>
          <Lightbulb size={13} /> 助手
        </button>
      </div>
      <div className={mode === 'exam' ? 'exam-progress-dots' : 'practice-progress-dots'}>
        {questions.map((_, idx) => {
          const isCurrent = idx === i
          const attemptItem = reviewing ? attempt?.items?.[questions[idx]?.id ?? ''] : undefined
          const wasCorrect = reviewing ? attemptItem?.state === 'correct' : answersState[idx] === true
          const answered = reviewing ? Boolean(attemptItem) : answersState[idx] !== undefined
          return (
            <button key={idx} onClick={() => { setI(idx); setPicked([]); setFill(''); setChecked(false) }}
              aria-label={`第 ${idx + 1} 题`} title={`第 ${idx + 1} 题`}
              className={mode === 'exam'
                ? `exam-progress-dot ${isCurrent ? 'exam-progress-dot--active' : ''}`
                : `practice-progress-dot ${isCurrent ? 'practice-progress-dot--active' : ''} ${answered ? (wasCorrect ? 'practice-progress-dot--correct' : 'practice-progress-dot--incorrect') : ''}`}
              data-tone={mode === 'exam' ? (answered ? (wasCorrect ? 'ok' : 'bad') : 'idle') : undefined} />
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
              <p className="exam-intro-eyebrow">考试</p>
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
                  {questions.length} 道题
                </span>
              </div>
              <p className="exam-intro-note">本场考试限时进行。一旦开始，计时就无法暂停，时间结束后系统会自动提交你的答案。</p>
              <button className="exam-intro-start-btn" onClick={startExam}>我准备好了</button>
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
      <section className={mode === 'exam' ? 'exam-question-shell-wrap' : 'practice-question-shell'}>
      <div className="mx-auto max-w-[672px] px-8 pb-24">
      <div className="fixed inset-x-0 top-[51px] mx-auto max-w-[672px] px-8 pointer-events-none">
        {(mode !== 'exam') && <div className="practice-timer"><span key={`${i}-${checked}`} className="practice-timer-fill" style={{ animationDuration: '10000ms', animationPlayState: checked ? 'paused' : 'running' }} /></div>}
      </div>
      {readyOpen && (
        <div className="practice-welcome-overlay" data-testid="practice-welcome" onClick={() => setReadyOpen(false)}>
          <section className="practice-welcome-modal" onClick={(e) => e.stopPropagation()}
            role="dialog" aria-modal="true" aria-labelledby="practice-welcome-title" aria-describedby="practice-welcome-desc">
            <div className="practice-welcome-row">
              <div className="practice-welcome-media" aria-hidden="true">
                <CharVideo className="practice-welcome-video" src="/assets/img/pages/mainPages/whiteboard/running-w-background.mp4" />
              </div>
              <div className="practice-welcome-body">
                <span id="practice-welcome-title" className="practice-welcome-title">{returning ? '欢迎回来' : '准备好练习'}</span>
                <span id="practice-welcome-desc" className="practice-welcome-desc">
                  {returning
                    ? `你上次尝试答对了 ${attemptCorrect} / ${questions.length} 题。再试一次——全部答对就能让这次练习被标记为「已掌握」。`
                    : '全部答对，这次练习就会被标记为「已掌握」，为这门课完成对应环节。'}
                </span>
                <button type="button" className="practice-welcome-btn" onClick={() => setReadyOpen(false)}>知道了</button>
              </div>
            </div>
          </section>
        </div>
      )}
      {/* 线上练习题目区 672px 宽（.practice-question-prompt 实测） */}
      <div className="flex items-center justify-between text-[12px] text-[#8a8a90] mt-2">
        <span className="font-medium text-[#3d3d3f]">{subtitle}</span>
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

      {mode === 'exam' && (
        <ExamQuestion
          q={q}
          picked={activePicked}
          fill={activeFill}
          animationHtml={q.animationHtml}
          onToggle={(option) => setExamSelections((prev) => {
            const current = prev[q.id] ?? []
            const next = q.type === 'multiple'
              ? (current.includes(option) ? current.filter((x) => x !== option) : [...current, option])
              : [option]
            return { ...prev, [q.id]: next }
          })}
          onFill={(value) => setExamFills((prev) => ({ ...prev, [q.id]: value }))}
        />
      )}
      {/* Question Card */}
      <div className={`hk-card p-6 mt-4 hk-fade-in-up shadow-sm${mode === 'exam' ? ' hidden' : ''}`} key={q.id}>
        {q.image?.src && (
          <img
            src={q.image.src}
            alt={q.image.alt ?? ''}
            className="max-h-[220px] rounded-lg mb-4 mx-auto"
          />
        )}
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            {mode === 'exam' && (
              <p className={`exam-question-kicker${q.type === 'multiple' ? ' exam-question-kicker--multiple' : ''}`}>
                {q.type === 'multiple' ? '多选题' : q.type === 'fill' ? '填空题' : '单选题'}
              </p>
            )}
            <div className="exam-question-title text-[17px] font-medium" style={{ lineHeight: 1.45, color: "#1f1f1f" }}>{q.prompt}</div>
          </div>
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
            value={reviewing ? reviewFill : examFill}
            onChange={(e) => (mode === 'exam' ? setExamFills((prev) => ({ ...prev, [q.id]: e.target.value })) : setFill(e.target.value))}
            disabled={reviewChecked || reviewing}
            placeholder="输入你的答案…"
            className="mt-5 w-full h-11 px-4 rounded-xl border bg-white outline-none focus:border-[#0a0a0a] text-[14px]"
          />
        ) : (
          <div className="practice-options-panel mt-5">
          <div className={`practice-options-grid ${(q.options ?? []).length <= 2 ? 'practice-options-grid--stacked' : ''}`}>
            {(q.options ?? []).map((o, oi) => {
              const on = activePicked.includes(o)
              const right = reviewChecked && correct.includes(o)
              const wrong = reviewChecked && on && !correct.includes(o)
              return (
                <button
                  key={oi}
                  disabled={reviewChecked || reviewing}
                  data-testid={`option-${oi + 1}`}
                  onClick={() => {
                    if (reviewing) return
                    if (mode === 'exam') {
                      setExamSelections((prev) => {
                        const current = prev[q.id] ?? []
                        const next = q.type === 'multiple'
                          ? (current.includes(o) ? current.filter((x) => x !== o) : [...current, o])
                          : [o]
                        return { ...prev, [q.id]: next }
                      })
                      return
                    }
                    setPicked((p) =>
                      q.type === 'multiple'
                        ? on
                          ? p.filter((x) => x !== o)
                          : [...p, o]
                        : [o]
                    )
                  }}
                  className={`practice-option-card ${on ? 'practice-option-card--selected' : ''} ${right ? 'practice-option-card--correct' : ''} ${wrong ? 'practice-option-card--incorrect' : ''} ${reviewChecked ? 'practice-option-card--readonly' : ''}`}
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
          {reviewChecked && (
          <div className={`practice-feedback ${reviewIsRight ? 'practice-feedback--correct' : 'practice-feedback--incorrect'} mt-5 hk-fade-in`} data-testid="practice-feedback">
            <div className="practice-verdict-headline">
              <span className="practice-verdict-mark">{reviewIsRight ? '✓' : '✗'}</span>
              {reviewIsRight ? '回答正确' : '再想想'}
            </div>
            {q.explanation && <p className="practice-feedback-explanation mt-2">{q.explanation}</p>}
          </div>
          )}
        </div>
      </div>
      </div>

      {mode === 'exam' && (
        <div className="exam-actions" data-testid="exam-actions">
          {i > 0 && (
            <button type="button" className="exam-nav-btn exam-nav-btn--back" aria-label="Previous question"
              onClick={() => { setI((idx) => Math.max(idx - 1, 0)); setPicked(reviewing ? [] : picked); setChecked(false) }}>
              <svg width="16" height="16" viewBox="0 0 14 15" fill="none" aria-hidden="true">
                <path d="M1.66663 6.50795L6.99996 1.42859M6.99996 1.42859L12.3333 6.50795M6.99996 1.42859V13.6191"
                  stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" transform="rotate(-90 7 7.5)" />
              </svg>
            </button>
          )}
          <button type="button" className="exam-primary-btn" data-testid="exam-primary-btn"
            onClick={() => { playSfx('click'); if (i + 1 >= questions.length) next(); else setI(i + 1) }}>
            {i + 1 >= questions.length ? '提交' : '下一题'}
          </button>
        </div>
      )}
      <div className="practice-actions" style={mode === 'exam' ? { display: 'none' } : undefined}>

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
            {reviewing ? (
              <button
                onClick={() => setI((idx) => Math.min(idx + 1, questions.length - 1))}
                className="practice-check-btn practice-check-btn--next inline-flex items-center gap-1"
                data-testid="review-next-btn"
              >
                下一题 <ChevronRight size={14} />
              </button>
            ) : !checked ? (
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
        courseId={courseId}
        sessionId={assistantSessionId}
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
    sessions: { title: string; sessionId: string; questions: Question[]; attempt?: PracticeAttempt | null }[]
  } | null>(null)
  const [result, setResult] = useState<{
    score: number
    total: number
    userAnswers: Record<number, { picked: string[]; fill: string; isRight: boolean }>
    fastCount?: number
    fastIds?: string[]
    points?: number
    perfect?: number
    bestStreak?: number
    stars?: number
  } | null>(null)

  useEffect(() => {
    apiGet<{ sessions: { title: string; sessionId: string; questions: Question[]; attempt?: PracticeAttempt | null }[] }>(
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
        bestStreak={result.bestStreak ?? 0}
        rankSeed={session.sessionId}
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
        attempt={session.attempt ?? null}
        assistantSessionId={session.sessionId}
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
          setResult({ score, total, userAnswers, fastCount: meta?.fastCount, fastIds: meta?.fastIds, points: meta?.points, perfect: meta?.perfect, stars: meta?.stars, bestStreak: meta?.bestStreak })
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
    bestStreak?: number
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
      <ExamResultView
        title={exam.title}
        questions={exam.questions}
        userAnswers={result.userAnswers}
        points={result.points ?? 0}
        perfect={result.perfect ?? 0}
        fastCount={result.fastCount ?? 0}
        onClose={() => nav(`/course/${courseId}`)}
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
          className={`practice-assistant-toggle${assistantOpen ? ' practice-assistant-toggle--active' : ''}`}
          data-testid="assistant-toggle"
        >
          <Sparkles size={13} /> 助手
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
        courseId={courseId}
        isProject={true}
        stageTitle={stage.stage_title}
      />
    </div>
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
  bestStreak = 0,
  rankSeed = 'practice',
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
  bestStreak?: number
  rankSeed?: string
  courseId?: string
  courseTitle?: string
}) {
  // 线上结果页的本轮排行：自己 + makeRivals 生成的三个对手（同一 seed 结果稳定），按分数排序取自己的名次
  const board = useMemo(() => {
    const me = { name: '你', score: points, correctCount: score, isYou: true }
    const rows = [me, ...makeRivals(rankSeed, total).map((r) => ({ ...r, isYou: false }))].sort((a, b) => b.score - a.score)
    return rows
  }, [points, score, rankSeed, total])
  const rank = board.findIndex((r) => r.isYou) + 1
  const [activeTab, setActiveTab] = useState<'summary' | 'review'>('summary')
  const [filter, setFilter] = useState<'all' | 'wrong'>('all')
  const [scheduledIndices, setScheduledIndices] = useState<Record<number, boolean>>({})
  const [batchScheduled, setBatchScheduled] = useState(false)
  const [scheduling, setScheduling] = useState(false)

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
        <section className={`practice-result${stars === 3 ? ' practice-result--passed' : ' practice-result--failed'}`} data-testid="practice-result">
          <div className="practice-result-media" aria-hidden="true">
            <span className="practice-result-aura" />
            <video className="practice-result-video" autoPlay loop muted playsInline
              src={stars === 3 ? '/assets/img/pages/mainPages/animations/char-reward-pop.mp4' : '/assets/img/pages/mainPages/animations/char-petting.mp4'} />
          </div>
          <p className="practice-result-kicker">练习完成</p>
          <PracticeStars className="practice-result-stars" stars={stars} size={34} animate label={`3 星中获得 ${stars} 星`} />
          <h1 className="practice-result-title">{STAR_TITLES[Math.max(0, Math.min(3, stars))]}</h1>
          <p className="practice-result-points" role="status" data-testid="result-points">{points.toLocaleString()}</p>
          <p className="practice-result-points-sub">满分 {perfect.toLocaleString()} · 得分率 {perfect > 0 ? Math.floor((points / perfect) * 100) : 0}%</p>
          <dl className="practice-result-stats">
            <div className="practice-result-stat"><dt>答对</dt><dd>{score}/{total}</dd></div>
            <div className="practice-result-stat"><dt>速答</dt><dd>{fastCount}</dd></div>
            <div className="practice-result-stat"><dt>最长连对</dt><dd>{bestStreak}</dd></div>
            <div className="practice-result-stat"><dt>排名</dt><dd>#{rank}</dd></div>
          </dl>
          <p className="practice-result-board-title">本轮排行</p>
          <ol className="practice-result-board" data-testid="result-board">
            {board.map((row, idx) => (
              <li key={row.name} className={`practice-result-row${row.isYou ? ' practice-result-row--you' : ''}`} style={{ animationDelay: `${900 + 90 * idx}ms` }}>
                <span className="practice-result-rank">{idx + 1}</span>
                <span className="practice-result-name">{row.name}</span>
                <span className="practice-result-acc">{row.correctCount}/{total}</span>
                <span className="practice-result-row-points">{row.score.toLocaleString()}</span>
              </li>
            ))}
          </ol>
          <div className="practice-actions practice-result-actions flex-col gap-3 items-center">
            <div className="flex items-center justify-center gap-3">
              <button type="button" className="practice-check-btn" onClick={back}>返回课程</button>
              {onRetry && (
                <button type="button" onClick={onRetry} className="hk-pill h-10 px-5 inline-flex items-center gap-1.5">
                  <RotateCcw size={13} /> 再练一次
                </button>
              )}
            </div>
            {wrongCount > 0 && (
              <button type="button" onClick={handleBatchSchedule} disabled={batchScheduled || scheduling}
                className="text-[12px] text-[#6366f1] hover:text-[#4f46e5] inline-flex items-center justify-center gap-1.5 py-1.5">
                {batchScheduled
                  ? <><BookmarkCheck size={14} className="text-[#16a34a]" /> 已一键加入明日间隔复习计划</>
                  : <><CalendarPlus size={14} /> 一键将 {wrongCount} 道错题加入明日智能间隔复习日程</>}
              </button>
            )}
          </div>
          <p className="text-[13px] text-[#6b6b70] mt-3">{label} · 学习掌握度已即时写回知识图谱</p>
        </section>
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
