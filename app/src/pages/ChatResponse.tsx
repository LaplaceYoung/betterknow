import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router'
import { ArrowUp, Check, ChevronRight, ExternalLink, Languages, LifeBuoy, Share2, Sparkles, ArrowRight, Download, FileText, Plus, X, Image as ImageIcon } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import remarkGfm from 'remark-gfm'
import rehypeKatex from 'rehype-katex'
import rehypeRaw from 'rehype-raw'
import { wsUrl } from '@/lib/api'
import { useUser } from '@/lib/user'
import { HkBoardSessionIcon } from '@/components/HkIcons'

interface Frame { type: string; [k: string]: unknown }
interface ChatItem {
  kind: 'user' | 'thinking' | 'tool' | 'content' | 'question' | 'diagram' | 'complete' | 'board' | 'quiz' | 'deep_learn' | 'cheatsheet' | 'recommend'
  text?: string
  attachments?: Array<{ name?: string; type?: string; data?: string; url?: string }>
  tool?: string
  status?: string
  question?: QuestionData
  diag?: string
  whisper?: boolean
  data?: unknown
}
interface QuestionData { questions: { question: string; options: { title: string; description: string }[]; is_multiple: boolean }[] }

interface StructureSession {
  sessionIndex: number
  session_type?: string
  title: string
  description?: string
  depthTags?: string[]
  keyPoints?: string[]
  practice?: { tasks?: string[] }
}
interface StructureLecture {
  lectureId: string
  title: string
  description?: string
  order?: number
  sessions: StructureSession[]
}
interface StructureUnit {
  unitId: string
  title: string
  description?: string
  lectures: StructureLecture[]
}
interface StructureData {
  courseTitle: string
  courseDescription?: string
  difficulty?: string
  targetLearner?: string
  tags?: string[]
  units: StructureUnit[]
}

const DEPTH_TAG_META: Record<string, { label: string; bg: string; text: string; border: string }> = {
  intuition: { label: '建立直觉', bg: 'bg-[#eff6ff]', text: 'text-[#2563eb]', border: 'border-[#bfdbfe]' },
  definition: { label: '正式定义', bg: 'bg-[#f0fdf4]', text: 'text-[#16a34a]', border: 'border-[#bbf7d0]' },
  formula: { label: '公式推导', bg: 'bg-[#faf5ff]', text: 'text-[#9333ea]', border: 'border-[#e9d5ff]' },
  application: { label: '案例实操', bg: 'bg-[#fefce8]', text: 'text-[#ca8a04]', border: 'border-[#fef08a]' },
  advanced: { label: '进阶理论', bg: 'bg-[#fff1f2]', text: 'text-[#e11d48]', border: 'border-[#fecdd3]' },
}

const STEP_TITLES = ['正在搜索网络资料', '构思初步思路', '设计课程结构', '生成课程内容']

const TOOL_LABELS: Record<string, { zh: string; en: string }> = {
  directorAgent: { zh: '模型正在思考', en: 'Agent is thinking' },
  get_skills: { zh: '加载技能', en: 'Loading skills' },
  content_planner: { zh: '制定计划', en: 'Making Plan' },
  generate_content: { zh: '生成内容', en: 'Generating Content' },
  search_files: { zh: '查找文件', en: 'Finding Files' },
  read_content: { zh: '读取附件', en: 'Reading attachments' },
  search_and_summarize_web: { zh: '搜索网络', en: 'Searching Web' },
  memory_recall: { zh: '调取记忆', en: 'Recalling Memory' },
  create_board_session: { zh: '创建白板课堂', en: 'Creating whiteboard session' },
  create_deep_learn_session: { zh: '创建深度学习课程', en: 'Creating Deep Learn Session' },
  generate_quiz: { zh: '生成测验', en: 'Generating Quizzes' },
  generate_cheatsheet: { zh: '生成速查表', en: 'Generating Cheatsheet' },
  generate_main_tasks: { zh: '规划学习任务', en: 'Planning Study Tasks' },
  recommend_next_step: { zh: '推荐后续步骤', en: 'Recommended Next Steps' },
}

interface QuizOption {
  index?: number
  content?: string
  text?: string
  is_correct?: boolean
}
interface QuizQuestion {
  index?: number
  question: string
  answer_options: QuizOption[]
  correct_answer: number
  explanation?: string
}

function InteractiveQuiz({ data }: { data: { questions?: QuizQuestion[]; total_count?: number } }) {
  const questions = data?.questions ?? []
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({})

  if (!questions.length) return null

  return (
    <div className="space-y-4 my-3">
      {questions.map((q, qi) => {
        const picked = selectedAnswers[qi]
        const hasPicked = picked !== undefined
        return (
          <div key={qi} className="hk-card p-5 border border-[#e4e4e7] rounded-2xl bg-white shadow-xs hk-fade-in">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#f1f2f4] text-[#3d3d3f]">测验 Q{q.index ?? qi + 1}</span>
              <span className="text-[14px] font-semibold text-[#0a0a0a] flex-1">{q.question}</span>
            </div>
            <div className="space-y-2">
              {q.answer_options.map((opt, oi) => {
                const optIdx = opt.index ?? (oi + 1)
                const isSelected = picked === optIdx
                const isCorrect = q.correct_answer === optIdx || opt.is_correct === true
                let style = "border-[#e4e4e7] hover:border-[#a1a1aa] bg-white text-[#3d3d3f]"
                if (hasPicked) {
                  if (isSelected) {
                    style = isCorrect ? "border-[#16a34a] bg-[#f0fdf4] text-[#15803d] ring-1 ring-[#16a34a]" : "border-[#dc2626] bg-[#fef2f2] text-[#b91c1c] ring-1 ring-[#dc2626]"
                  } else if (isCorrect) {
                    style = "border-[#16a34a] border-dashed bg-[#f0fdf4]/60 text-[#15803d]"
                  } else {
                    style = "border-[#f4f4f5] bg-[#fafafa] opacity-60 text-[#71717a]"
                  }
                }
                const letter = String.fromCharCode(65 + oi)
                return (
                  <button
                    key={oi}
                    onClick={() => !hasPicked && setSelectedAnswers((prev) => ({ ...prev, [qi]: optIdx }))}
                    disabled={hasPicked}
                    className={`w-full text-left p-3 rounded-xl border text-[13px] flex items-center gap-3 transition-all ${style}`}
                  >
                    <span className="h-6 w-6 rounded-full border border-current flex items-center justify-center text-[11px] font-semibold shrink-0">
                      {letter}
                    </span>
                    <span className="flex-1">{opt.content ?? opt.text}</span>
                    {hasPicked && isSelected && (
                      isCorrect ? <Check size={16} className="text-[#16a34a] shrink-0" /> : <span className="text-[13px] font-medium text-[#dc2626]">✕</span>
                    )}
                  </button>
                )
              })}
            </div>
            {hasPicked && q.explanation && (
              <div className="mt-3.5 p-3.5 rounded-xl bg-[#f8fafc] border border-[#e2e8f0] text-[12px] text-[#334155] leading-relaxed flex items-start gap-2 hk-fade-in">
                <span className="font-semibold text-[#0284c7] shrink-0">💡 解析：</span>
                <span>{q.explanation}</span>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

function BoardSessionCard({ data }: { data: { board_sessions?: Array<{ url?: string; title?: string; description?: string; session_id?: string }>; url?: string; title?: string; description?: string; session_id?: string } }) {
  const nav = useNavigate()
  const sessions: Array<{ url?: string; title?: string; description?: string; session_id?: string }> = Array.isArray(data?.board_sessions) ? data.board_sessions : [data]
  const s = sessions[0]
  if (!s) return null
  return (
    <div className="hk-card p-5 border border-[#e4e4e7] rounded-2xl bg-white shadow-xs my-3 flex items-start gap-4 hk-fade-in">
      <span className="h-10 w-10 rounded-xl bg-[#f1f5f9] text-[#2563eb] flex items-center justify-center shrink-0">
        <HkBoardSessionIcon size={20} />
      </span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#eff6ff] text-[#2563eb] font-semibold">白板课堂</span>
          <h4 className="text-[14px] font-semibold text-[#0a0a0a] truncate">{s.title ?? '白板授课会话'}</h4>
        </div>
        <p className="text-[12px] text-[#6b6b70] mt-1 line-clamp-2">{s.description ?? '围绕当前主题的边讲边画白板课堂'}</p>
      </div>
      <button onClick={() => nav(s.url ?? `/whiteboard/${s.session_id}`)} className="h-9 px-4 rounded-full bg-[#0a0a0a] text-white text-[12px] font-medium hover:bg-black/80 inline-flex items-center gap-1.5 shrink-0 shadow-xs">
        进入白板 <ArrowRight size={13} />
      </button>
    </div>
  )
}

function DeepLearnSessionCard({ data }: { data: { task_plan?: { title?: string; description?: string }; deep_learn_session_url?: string; deep_learn_session_id?: string } }) {
  const nav = useNavigate()
  const plan = data?.task_plan
  const url = data?.deep_learn_session_url ?? `/deep-learn-session/${data?.deep_learn_session_id}`
  return (
    <div className="hk-card p-5 border border-[#e4e4e7] rounded-2xl bg-white shadow-xs my-3 flex items-start gap-4 hk-fade-in">
      <span className="h-10 w-10 rounded-xl bg-[#fdf6e3] text-[#a16207] flex items-center justify-center shrink-0">
        <Sparkles size={20} />
      </span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#fef3c7] text-[#92400e] font-semibold">系统深学</span>
          <h4 className="text-[14px] font-semibold text-[#0a0a0a] truncate">{plan?.title ?? '深度学习计划'}</h4>
        </div>
        <p className="text-[12px] text-[#6b6b70] mt-1">{plan?.description ?? '系统掌握该主题的分阶段学习任务'}</p>
      </div>
      <button onClick={() => nav(url)} className="h-9 px-4 rounded-full bg-[#0a0a0a] text-white text-[12px] font-medium hover:bg-black/80 inline-flex items-center gap-1.5 shrink-0 shadow-xs">
        开启学习 <ArrowRight size={13} />
      </button>
    </div>
  )
}

function CheatsheetCard({ data }: { data: { filename?: string; pages?: number; url?: string } }) {
  return (
    <div className="hk-card p-5 border border-[#e4e4e7] rounded-2xl bg-white shadow-xs my-3 flex items-center gap-4 hk-fade-in">
      <span className="h-10 w-10 rounded-xl bg-[#f4f4f5] text-[#3d3d3f] flex items-center justify-center shrink-0">
        <FileText size={20} />
      </span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#f4f4f5] text-[#71717a] font-semibold">速查表</span>
          <h4 className="text-[14px] font-semibold text-[#0a0a0a] truncate">{data.filename ?? 'Cheatsheet.md'}</h4>
        </div>
        <div className="text-[12px] text-[#8a8a90] mt-0.5">已生成速查表文档（{data.pages ?? 2} 页）</div>
      </div>
      {data.url && (
        <a href={data.url} download={data.filename} className="h-9 px-4 rounded-full border border-[#e4e4e7] bg-white text-[#0a0a0a] text-[12px] font-medium hover:bg-[#fafafa] inline-flex items-center gap-1.5 shrink-0">
          <Download size={13} /> 下载速查表
        </a>
      )}
    </div>
  )
}

function RecommendStepsBlock({ data, onSelect }: { data: { next_steps?: Array<{ display_step: string; step_prompt: string }> }; onSelect: (prompt: string) => void }) {
  const steps = data?.next_steps ?? []
  if (!steps.length) return null
  return (
    <div className="my-4 pt-3 border-t border-[#f4f4f5] hk-fade-in">
      <div className="flex items-center gap-1.5 text-[12px] font-semibold text-[#6b6b70] mb-2.5">
        <Sparkles size={12} className="text-[var(--pro-gold)]" /> 推荐后续步骤
      </div>
      <div className="flex flex-wrap gap-2">
        {steps.map((s, i) => (
          <button
            key={i}
            onClick={() => onSelect(s.step_prompt)}
            className="hk-pill text-[12px] hover:border-[#0a0a0a] hover:text-[#0a0a0a] hover:bg-white transition-all shadow-2xs"
          >
            {s.display_step}
          </button>
        ))}
      </div>
    </div>
  )
}

// [S12][D8] 即时协助响应页；[S13][D9][B9] 课程生成日志页（同一响应壳）
export default function ChatResponse() {
  const nav = useNavigate()
  const loc = useLocation() as unknown as { pathname: string; state?: { message?: string; query?: string; speed_mode?: string; tts_enabled?: boolean; mode?: string; ui_language?: string; course_source_mode?: string } }
  const params = useParams<{ conversationId?: string; courseUuid?: string }>()
  const { language, refresh } = useUser()
  const isGen = loc.pathname.includes('course-generation')

  const [items, setItems] = useState<ChatItem[]>([])
  const [convId, setConvId] = useState<string>(params.conversationId ?? '')
  const [title, setTitle] = useState('')
  const [input, setInput] = useState('')
  const [streaming, setStreaming] = useState(false)
  // 生成模式状态
  const [steps, setSteps] = useState<{ id: number; status: string; title?: string }[]>([])
  const [progress, setProgress] = useState<{ message: string; results: { title: string; url: string; source?: string }[] }[]>([])
  const [questions, setQuestions] = useState<QuestionData | null>(null)
  const [answers, setAnswers] = useState<Record<number, number[]>>({})
  const [structureData, setStructureData] = useState<StructureData | null>(null)
  const [structureConfirmed, setStructureConfirmed] = useState(false)
  const [genCourse, setGenCourse] = useState<{ courseUuid: string; courseTitle: string } | null>(null)
  const [done, setDone] = useState(false)
  const [rated, setRated] = useState(0)
  const [followupFiles, setFollowupFiles] = useState<Array<{ name: string; type: string; data?: string }>>([])
  const followupFileRef = useRef<HTMLInputElement>(null)
  const wsRef = useRef<WebSocket | null>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const startedRef = useRef(false)

  const handleFollowupPaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const items = e.clipboardData?.items
    if (!items) return
    for (let i = 0; i < items.length; i++) {
      const item = items[i]
      if (item.type.startsWith('image/')) {
        const file = item.getAsFile()
        if (file) {
          e.preventDefault()
          const reader = new FileReader()
          reader.onload = () => {
            setFollowupFiles((prev) => [
              ...prev,
              {
                name: file.name || `截图-${new Date().toLocaleTimeString('zh-CN')}.png`,
                type: file.type,
                data: reader.result as string,
              },
            ])
          }
          reader.readAsDataURL(file)
        }
      }
    }
  }

  const handleFollowupFilesSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return
    Array.from(files).forEach((file) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = () => {
          setFollowupFiles((prev) => [
            ...prev,
            { name: file.name, type: file.type, data: reader.result as string },
          ])
        }
        reader.readAsDataURL(file)
      } else {
        setFollowupFiles((prev) => [
          ...prev,
          { name: file.name, type: file.type },
        ])
      }
    })
    e.target.value = ''
  }

  const push = useCallback((it: ChatItem) => setItems((xs) => [...xs, it]), [])

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [items, steps, progress, questions, structureData, done])

  useEffect(() => {
    if (startedRef.current) return
    startedRef.current = true
    const courseMode = loc.pathname.includes('course-generation')
    if (courseMode) {
      const courseUuid = params.courseUuid && params.courseUuid !== 'new' ? params.courseUuid : crypto.randomUUID()
      if (params.courseUuid === 'new') window.history.replaceState({}, '', `/response/course-generation/${courseUuid}`)
      const ws = new WebSocket(wsUrl('/api/v1/course-generation/ws', { access_token: localStorage.getItem('access_token') ?? '' }))
      wsRef.current = ws
      ws.onmessage = (ev) => {
        const f = JSON.parse(ev.data) as Frame
        if (f.type === 'course_generation_started') { setSteps([{ id: 0, status: 'running', title: '正在搜索网络资料' }]); setGenCourse({ courseUuid: String(f.course_uuid), courseTitle: '' }) }
        else if (f.type === 'course_generation_step') {
          const STEP_MAP: Record<string, { idx: number; title: string }> = {
            boot: { idx: 0, title: '准备构建环境' },
            researching_the_web: { idx: 0, title: '正在搜索网络资料' },
            generating_initial_syllabus: { idx: 1, title: '构思初步思路与大纲' },
            generating_structure: { idx: 2, title: '设计进阶课程结构' },
            generating_session_outlines: { idx: 3, title: '生成课时讲义与互动练习' },
          }
          const rawId = String(f.step_id ?? '')
          const mapped = STEP_MAP[rawId]
          const id = mapped ? mapped.idx : (Number.isFinite(Number(f.step_id)) ? Number(f.step_id) : 0)
          const status = String(f.status)
          const title = f.title ? String(f.title) : (mapped ? mapped.title : (STEP_TITLES[id] ?? `第 ${id + 1} 步`))
          setSteps((ss) => { const base = ss.filter((s) => s.id !== id); return [...base, { id, status, title }].sort((a, b) => a.id - b.id) })
        } else if (f.type === 'course_generation_progress') {
          const data = (f.data ?? {}) as { research?: { keywords?: string[]; results?: { title: string; url: string; source?: string }[] } }
          setProgress((ps) => [...ps, { message: String(f.message ?? ''), results: data.research?.results ?? [] }])
        } else if (f.type === 'course_generation_questions') { setQuestions((f.question_data ?? null) as QuestionData) }
        else if (f.type === 'course_generation_structure') { setStructureData((f.structure ?? null) as StructureData) }
        else if (f.type === 'course_generation_complete') {
          const c = f.course as { courseUuid?: string; courseTitle?: string }
          setGenCourse({ courseUuid: String(c?.courseUuid ?? genCourse?.courseUuid ?? ''), courseTitle: String(c?.courseTitle ?? '') })
          setDone(true); void refresh()
        }
      }
      ws.onopen = () => ws.send(JSON.stringify({ type: 'start_course_generation', query: loc.state?.query ?? '新课程', ui_language: language, course_uuid: courseUuid, attachment_paths: [], course_source_mode: loc.state?.course_source_mode ?? 'self_study', interactive_structure: true }))
      return () => ws.close()
    }
    // 即时协助
    const pending = params.conversationId === 'new' || !params.conversationId
    const ws = new WebSocket(wsUrl('/api/v1/ws', { token: localStorage.getItem('access_token') ?? '', ...(pending ? {} : { conversation_id: params.conversationId }) }))
    wsRef.current = ws
    ws.onmessage = (ev) => {
      const f = JSON.parse(ev.data) as Frame
      if (f.type === 'conversation_created') { const d = f.data as { conversation_id: string }; setConvId(String(d.conversation_id)); window.history.replaceState({}, '', `/response/${String(d.conversation_id)}`) }
      else if (f.type === 'conversation_resumed') { const d = f.data as { title?: string }; setTitle(String(d.title ?? '')) }
      else if (f.type === 'user_message') { push({ kind: 'user', text: String(f.message ?? ''), attachments: Array.isArray(f.attachments) ? f.attachments as any : undefined }); setStreaming(true) }
      else if (f.type === 'thinking') { push({ kind: 'thinking', tool: String(f.tool_name ?? 'directorAgent'), status: String(f.tool_status ?? '') }) }
      else if (f.type === 'thinking_chunk') { setItems((xs) => [...xs, { kind: 'content', text: String(f.chunk ?? ''), whisper: true } as ChatItem]) }
      else if (f.type === 'tool_execution') {
        const toolName = String(f.tool_name ?? '')
        const status = String(f.tool_status ?? '')
        const data = (f.data as Record<string, unknown> | undefined)?.result as Record<string, unknown> | undefined
        if (status === 'completed' && toolName === 'create_board_session' && data?.board_sessions) {
          push({ kind: 'board', data })
        } else if (status === 'completed' && toolName === 'generate_quiz' && data?.questions) {
          push({ kind: 'quiz', data })
        } else if (status === 'completed' && toolName === 'create_deep_learn_session' && data) {
          push({ kind: 'deep_learn', data })
        } else if (status === 'completed' && toolName === 'generate_cheatsheet' && data) {
          push({ kind: 'cheatsheet', data })
        } else if (f.display !== 'hide') {
          push({ kind: 'tool', tool: toolName, status })
        }
      }
      else if (f.type === 'recommend_next_step') {
        const d = (f.data ?? f) as Record<string, unknown>
        push({ kind: 'recommend', data: d })
      }
      else if (f.type === 'content_chunk') { setItems((xs) => { const last = xs[xs.length - 1]; if (last && last.kind === 'content' && !last.whisper) return [...xs.slice(0, -1), { ...last, text: (last.text ?? '') + String(f.chunk ?? '') }]; return [...xs, { kind: 'content', text: String(f.chunk ?? '') }] }) }
      else if (f.type === 'user_question') { setQuestions(((f.question_data ?? null) as QuestionData)); setStreaming(false) }
      else if (f.type === 'inline_diagram') { push({ kind: 'diagram', diag: String((f.data as { source?: string })?.source ?? '') }) }
      else if (f.type === 'mark_response_complete') { /* 完成标记 */ }
      else if (f.type === 'complete') { setStreaming(false); setDone(true); setItems((xs) => xs.filter((x) => x.kind !== 'thinking')); void refresh() }
      else if (f.type === 'error') { push({ kind: 'content', text: `⚠️ ${String(f.message ?? '出错了')}` }); setStreaming(false) }
    }
    ws.onopen = () => {
      const initialAttachments = (loc.state as any)?.attachments
      if (pending && loc.state?.message) { push({ kind: 'user', text: loc.state.message, attachments: initialAttachments }); setStreaming(true) }
      if (pending && loc.state?.message) ws.send(JSON.stringify({ type: 'user_message', message: loc.state.message, ui_language: language, speed_mode: loc.state.speed_mode ?? 'standard', tts_enabled: Boolean(loc.state.tts_enabled), attachments: initialAttachments, ...(loc.state.mode ? { mode: loc.state.mode } : {}) }))
    }
    // 已有会话：回放历史
    if (!pending) {
      void (async () => {
        const token = localStorage.getItem('access_token') ?? ''
        const r = await fetch('/api/v1/conversations/get_conversation_data', { method: 'POST', headers: { 'content-type': 'application/json', authorization: `Bearer ${token}` }, body: JSON.stringify({ conversation_id: params.conversationId }) })
        if (!r.ok) return
        const j = await r.json() as { title?: string; history?: { role: string; content: string; tool_name?: string; result?: unknown }[] }
        setTitle(j.title ?? '')
        const out: ChatItem[] = []
        for (const h of j.history ?? []) {
          if (h.role === 'system') continue
          let parsed: Record<string, unknown> | null = null
          try { parsed = JSON.parse(h.content) as Record<string, unknown> } catch { parsed = null }
          if (h.role === 'user') {
            const atts = (parsed?.attachments ?? parsed?.images ?? parsed?.file_info ?? []) as Array<{ name?: string; type?: string; data?: string; url?: string }>
            out.push({ kind: 'user', text: String(parsed?.message ?? h.content), attachments: Array.isArray(atts) ? atts : [] });
            continue
          }
          if (h.role === 'tool') {
            const toolName = String(h.tool_name ?? parsed?.tool_name ?? '')
            const res = (h.result as Record<string, unknown> | undefined)?.result as Record<string, unknown> | undefined
            if (toolName === 'create_board_session' && res?.board_sessions) out.push({ kind: 'board', data: res })
            else if (toolName === 'generate_quiz' && res?.questions) out.push({ kind: 'quiz', data: res })
            else if (toolName === 'create_deep_learn_session' && res) out.push({ kind: 'deep_learn', data: res })
            else if (toolName === 'generate_cheatsheet' && res) out.push({ kind: 'cheatsheet', data: res })
            else if (toolName === 'recommend_next_step' && res) out.push({ kind: 'recommend', data: res })
            continue
          }
          const text = parsed ? String(parsed.content ?? parsed.chunk ?? parsed.message ?? '') : h.content
          if (text) out.push({ kind: 'content', text })
        }
        setItems(out); setDone(true)
      })()
    }
    return () => ws.close()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const sendFollowup = (customText?: string) => {
    const m = (customText ?? input).trim()
    if ((!m && followupFiles.length === 0) || !wsRef.current) return
    const msg = m || '请查看上传的附件材料'
    wsRef.current.send(JSON.stringify({
      type: 'user_message',
      message: msg,
      ui_language: language,
      speed_mode: 'standard',
      attachments: followupFiles.length > 0 ? followupFiles : undefined,
    }))
    push({ kind: 'user', text: msg, attachments: followupFiles.length > 0 ? followupFiles : undefined })
    setStreaming(true)
    setDone(false)
    if (!customText) {
      setInput('')
      setFollowupFiles([])
    }
  }

  const submitAnswers = (skip = false) => {
    if (!questions || !wsRef.current) return
    const payload = questions.questions.map((q, i) => ({ question: q.question, answer: skip ? '跳过' : ((answers[i] ?? []).map((oi) => q.options[oi]?.title ?? '').filter(Boolean).join('；') || (q.options[0]?.title ?? '')) }))
    wsRef.current.send(JSON.stringify(isGen ? { type: 'course_generation_answers', answers: payload } : { type: 'question_answers', answers: payload }))
    push({ kind: 'user', text: payload.map((p) => p.answer).join(' / ') || '跳过' })
    setQuestions(null)
  }

  const grouped = useMemo(() => items, [items])

  return (
    <div className="mx-auto max-w-[860px] px-6 pb-40 pt-2">
      {title && <div className="text-[12px] text-[#8a8a90] mb-4">{title}</div>}
      <div className="space-y-4">
        {grouped.map((it, i) => {
          if (it.kind === 'user') return (
            <div key={i} className="flex justify-end hk-fade-in-up">
              <div className="max-w-[80%] rounded-2xl bg-[#f1f2f4] px-4 py-2.5 text-[14px]">
                {it.attachments && it.attachments.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-2">
                    {it.attachments.map((att, ai) => (
                      att.data || att.url ? (
                        <img
                          key={ai}
                          src={att.data ?? att.url}
                          alt={att.name ?? 'attachment'}
                          className="max-h-48 max-w-full rounded-lg object-contain border border-[#d4d4d8] bg-white cursor-pointer hover:opacity-95"
                          onClick={() => window.open(att.data ?? att.url, '_blank')}
                        />
                      ) : (
                        <div key={ai} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white border border-[#e4e4e7] text-[12px] text-[#3d3d3f]">
                          <FileText size={13} className="text-[#8a8a90]" />
                          <span className="truncate max-w-[200px]">{att.name ?? '附件'}</span>
                        </div>
                      )
                    ))}
                  </div>
                )}
                <div className="whitespace-pre-wrap">{it.text}</div>
              </div>
            </div>
          )
          if (it.kind === 'thinking') return it.status === 'started' ? <div key={i} className="flex items-center gap-2 text-[12px] text-[#8a8a90]"><span className="h-3.5 w-3.5 rounded-full border-2 border-[#d4d4d8] border-t-[#0a0a0a] animate-spin" />思考中…</div> : null
          if (it.kind === 'tool') {
            const label = (it.tool ? (TOOL_LABELS[it.tool]?.[language === 'en' ? 'en' : 'zh'] ?? it.tool) : '执行工具')
            return it.status === 'started' ? <div key={i} className="inline-flex items-center gap-1.5 text-[12px] text-[#6b6b70] hk-card px-2.5 py-1"><Sparkles size={11} /> {label}</div> : null
          }
          if (it.kind === 'diagram') return <pre key={i} className="hk-prose"><pre className="text-[12px]">{it.diag}</pre></pre>
          if (it.kind === 'board' && it.data) return <BoardSessionCard key={i} data={it.data as { board_sessions?: Array<{ url?: string; title?: string; description?: string; session_id?: string }> }} />
          if (it.kind === 'quiz' && it.data) return <InteractiveQuiz key={i} data={it.data as { questions?: QuizQuestion[]; total_count?: number }} />
          if (it.kind === 'deep_learn' && it.data) return <DeepLearnSessionCard key={i} data={it.data as { task_plan?: { title?: string; description?: string }; deep_learn_session_url?: string; deep_learn_session_id?: string }} />
          if (it.kind === 'cheatsheet' && it.data) return <CheatsheetCard key={i} data={it.data as { filename?: string; pages?: number; url?: string }} />
          if (it.kind === 'recommend' && it.data) return <RecommendStepsBlock key={i} data={it.data as { next_steps?: Array<{ display_step: string; step_prompt: string }> }} onSelect={(p) => sendFollowup(p)} />
          if (it.kind === 'question' && it.question) return null
          return (
            <div key={i} className={`hk-fade-in-up ${it.whisper ? 'text-[12px] text-[#a1a1aa]' : ''}`}>
              {it.whisper ? it.text : <div className="hk-prose"><ReactMarkdown remarkPlugins={[remarkMath, remarkGfm]} rehypePlugins={[rehypeRaw, rehypeKatex]}>{it.text}</ReactMarkdown></div>}
            </div>
          )
        })}
      </div>

      {/* 课程生成日志 */}
      {isGen && (
        <div className="mt-6 space-y-4">
          <div className="space-y-3">
            {steps.map((s) => (
              <div key={s.id} className="hk-card p-3.5">
                <div className="flex items-center gap-2 text-[14px] font-medium">
                  {s.status === 'done' ? <span className="hk-check inline-flex h-5 w-5 rounded-full bg-[#16a34a] text-white items-center justify-center"><Check size={12} /></span> : <span className="h-4 w-4 rounded-full border-2 border-[#d4d4d8] border-t-[#0a0a0a] animate-spin" />}
                  {s.title ?? STEP_TITLES[s.id] ?? `第 ${s.id + 1} 步`}
                  <span className="text-[11px] text-[#8a8a90] font-normal">｜ 第 {s.id + 1} 步，共 4 步</span>
                </div>
              </div>
            ))}
          </div>
          {progress.map((p, i) => (
            <div key={i} className="hk-card p-3.5 text-[13px] hk-fade-in-up">
              <div className="text-[#6b6b70] mb-2">{p.message}</div>
              <ul className="space-y-1.5">
                {p.results.slice(0, 6).map((r, ri) => (
                  <li key={ri} className="flex items-center gap-2"><span className="h-4 w-4 rounded-full bg-[#f1f2f4] shrink-0" /><a href={r.url} target="_blank" rel="noreferrer" className="text-[#3b5bdb] hover:underline truncate">{r.title}</a><span className="text-[11px] text-[#8a8a90]">{r.source}</span></li>
                ))}
              </ul>
              {p.results.length > 6 && <div className="text-[12px] text-[#8a8a90] mt-1.5">⋯ 还有 {p.results.length - 6} 个</div>}
            </div>
          ))}
          {questions && (
            <div className="space-y-3">
              {questions.questions.map((q, qi) => (
                <div key={qi} className="hk-card p-4 hk-fade-in-up">
                  <div className="flex items-center gap-2 mb-2"><span className="text-[11px] font-semibold px-1.5 py-0.5 rounded bg-[#f1f2f4]">Q{qi + 1}</span><span className="text-[14px] font-medium flex-1">{q.question}</span><span className="text-[11px] text-[#8a8a90]">{q.is_multiple ? '多选题' : '单选题'}</span></div>
                  <div className="space-y-1.5">
                    {q.options.map((o, oi) => {
                      const on = (answers[qi] ?? []).includes(oi)
                      return (
                        <button key={oi} onClick={() => setAnswers((a) => { const cur = a[qi] ?? []; const next = q.is_multiple ? (on ? cur.filter((x) => x !== oi) : [...cur, oi]) : [oi]; return { ...a, [qi]: next } })}
                          className="w-full text-left px-3 py-2.5 rounded-xl border hover:border-[#a1a1aa] data-[on=true]:border-[#3b5bdb] data-[on=true]:bg-[#f5f8ff]" data-on={on}>
                          <span className="text-[13px] font-medium">{o.title}</span><span className="block text-[12px] text-[#6b6b70] mt-0.5">{o.description}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))}
              <div className="flex justify-end gap-2">
                <button onClick={() => submitAnswers(true)} className="hk-pill h-9 px-4">跳过</button>
                <button onClick={() => submitAnswers(false)} className="h-9 px-4 rounded-full bg-[#0a0a0a] text-white">继续</button>
              </div>
            </div>
          )}
          {structureData && !structureConfirmed && (
            <div className="hk-card p-5 border border-[#e4e4e7] rounded-2xl bg-white shadow-xs space-y-4 hk-fade-in-up">
              <div className="flex items-center justify-between pb-3 border-b border-[#f4f4f5]">
                <div>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-[#f1f2f4] text-[#3d3d3f]">Step 3 · 课程大纲树</span>
                  <h3 className="text-[16px] font-semibold text-[#0a0a0a] mt-1">{structureData.courseTitle || '课程知识架构'}</h3>
                  {structureData.courseDescription && (
                    <p className="text-[12px] text-[#6b6b70] mt-1 leading-relaxed">{structureData.courseDescription}</p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] px-2.5 py-1 rounded-full bg-[#eef2ff] text-[#3b5bdb] font-medium border border-[#c7d2fe]">
                    共 {structureData.units.length} 个单元
                  </span>
                </div>
              </div>

              {/* Units list */}
              <div className="space-y-4">
                {structureData.units.map((u, ui) => (
                  <div key={u.unitId || ui} className="p-4 rounded-xl border border-[#e4e4e7] bg-[#fafafa]">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="h-5 w-5 rounded bg-[#0a0a0a] text-white text-[11px] font-semibold flex items-center justify-center">
                          {ui + 1}
                        </span>
                        <h4 className="text-[14px] font-semibold text-[#0a0a0a]">{u.title}</h4>
                      </div>
                      <span className="text-[11px] text-[#8a8a90]">{u.lectures.length} 讲次</span>
                    </div>
                    {u.description && <p className="text-[12px] text-[#6b6b70] mb-3">{u.description}</p>}

                    <div className="space-y-2 pl-4 border-l-2 border-[#e4e4e7]">
                      {u.lectures.map((l, li) => (
                        <div key={l.lectureId || li} className="p-3 rounded-lg bg-white border border-[#f4f4f5]">
                          <div className="flex items-center justify-between">
                            <div className="text-[13px] font-medium text-[#1c1c1e]">
                              第 {li + 1} 讲：{l.title}
                            </div>
                            <span className="text-[11px] text-[#a1a1aa]">{l.sessions.length} 课节</span>
                          </div>
                          {l.description && <div className="text-[11px] text-[#8a8a90] mt-0.5">{l.description}</div>}

                          {/* Sessions with depth tags */}
                          <div className="mt-2.5 space-y-1.5">
                            {l.sessions.map((s, si) => (
                              <div key={s.sessionIndex || si} className="p-2 rounded-md bg-[#fafafa] flex items-center justify-between text-[12px]">
                                <span className="text-[#3d3d3f] font-medium flex-1 truncate">{s.title}</span>
                                <div className="flex items-center gap-1 shrink-0 ml-2">
                                  {(s.depthTags || []).map((tag) => {
                                    const meta = DEPTH_TAG_META[tag] ?? { label: tag, bg: 'bg-[#f4f4f5]', text: 'text-[#52525b]', border: 'border-[#e4e4e7]' }
                                    return (
                                      <span key={tag} className={`text-[10px] px-1.5 py-0.5 rounded border font-medium ${meta.bg} ${meta.text} ${meta.border}`}>
                                        {meta.label}
                                      </span>
                                    )
                                  })}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-between pt-3 border-t border-[#f4f4f5]">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const newLecTitle = window.prompt('请输入新讲次名称：', '补充讲次：进阶应用探讨')
                      if (!newLecTitle) return
                      setStructureData((prev) => {
                        if (!prev || !prev.units[0]) return prev
                        const updatedUnits = [...prev.units]
                        const u0 = { ...updatedUnits[0] }
                        u0.lectures = [
                          ...u0.lectures,
                          {
                            lectureId: `lec-${Date.now()}`,
                            title: newLecTitle,
                            sessions: [
                              {
                                sessionIndex: u0.lectures.length * 2 + 1,
                                title: `${newLecTitle}：核心要义`,
                                depthTags: ['intuition', 'application'],
                              },
                            ],
                          },
                        ]
                        updatedUnits[0] = u0
                        return { ...prev, units: updatedUnits }
                      })
                    }}
                    className="hk-pill h-8 text-[12px] hover:border-[#0a0a0a]"
                  >
                    + 添加讲次
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const newUnitTitle = window.prompt('请输入新单元名称：', '单元 4：综合实践与案例分析')
                      if (!newUnitTitle) return
                      setStructureData((prev) => {
                        if (!prev) return prev
                        return {
                          ...prev,
                          units: [
                            ...prev.units,
                            {
                              unitId: `unit-${Date.now()}`,
                              title: newUnitTitle,
                              description: '综合实践与案例深度剖析',
                              lectures: [
                                {
                                  lectureId: `lec-${Date.now()}`,
                                  title: '实战案例与模型落地',
                                  sessions: [
                                    {
                                      sessionIndex: 1,
                                      title: '模型与现实世界的交汇点',
                                      depthTags: ['application', 'advanced'],
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        }
                      })
                    }}
                    className="hk-pill h-8 text-[12px] hover:border-[#0a0a0a]"
                  >
                    + 添加单元
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (wsRef.current) {
                      wsRef.current.send(JSON.stringify({
                        type: 'course_structure_confirm',
                        confirmed: true,
                        structure: structureData,
                      }))
                    }
                    setStructureConfirmed(true)
                  }}
                  className="cg-confirm-structure-btn h-9 px-5 rounded-full bg-[#0a0a0a] text-white text-[13px] font-medium hover:bg-black/80 inline-flex items-center gap-1.5 shadow-sm"
                >
                  没问题，继续生成课程细节 <ArrowRight size={14} />
                </button>
              </div>
            </div>
          )}
          {done && genCourse && (
            <div className="hk-card p-4 flex items-center gap-3 hk-fade-in-up"><span className="hk-check inline-flex h-8 w-8 rounded-full bg-[#16a34a] text-white items-center justify-center"><Check size={16} /></span><div className="flex-1"><div className="text-[14px] font-medium">课程已生成{genCourse.courseTitle ? `：${genCourse.courseTitle}` : ''}</div><div className="text-[12px] text-[#8a8a90]">结构和内容已保存，可随时继续学习</div></div><button onClick={() => nav(`/course/${genCourse.courseUuid}`)} className="cg-open-course-btn h-9 px-4 rounded-full bg-[#0a0a0a] text-white inline-flex items-center gap-1">查看课程 <ChevronRight size={14} /></button></div>
          )}
        </div>
      )}

      {/* 完成反馈（聊天模式） */}
      {done && !isGen && !streaming && items.some((i) => i.kind === 'content') && (
        <div className="fixed bottom-28 right-10 w-[300px] hk-card p-4 hk-fade-in-up shadow-lg" role="dialog" aria-label="回答反馈">
          <div className="text-[13px] font-medium">这节内容解答你的问题了吗？</div>
          <div className="flex items-center gap-3 mt-3">
            <div className="flex gap-1.5">{[1, 2, 3, 4, 5].map((n) => <button key={n} onClick={() => setRated(n)} aria-label={`${n} 分`} className="h-6 w-6 rounded-full border flex items-center justify-center text-[12px] data-[on=true]:bg-[#0a0a0a] data-[on=true]:text-white data-[on=true]:border-[#0a0a0a]" data-on={rated >= n}>{rated >= n ? '●' : '○'}</button>)}</div>
            <button className="ml-auto text-[12px] text-[#8a8a90] hover:text-black" onClick={() => setRated(-1)}>跳过</button>
          </div>
        </div>
      )}

      {/* 底部输入条 */}
      {!isGen && (
        <div className="fixed bottom-0 inset-x-0 pointer-events-none">
          <div className="max-w-[860px] mx-auto px-6 pb-6 pointer-events-auto">
            <div className="hk-composer p-3.5">
              <input
                type="file"
                ref={followupFileRef}
                className="hidden"
                multiple
                accept="image/*,.pdf,.doc,.docx,.txt,.md"
                onChange={handleFollowupFilesSelected}
              />
              {followupFiles.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-2 pb-1">
                  {followupFiles.map((f, i) => (
                    <div key={i} className="flex items-center gap-2 px-2.5 py-1 rounded-xl bg-[#f4f4f5] border border-[#e4e4e7] text-[12px] text-[#1c1c1e]">
                      {f.data ? (
                        <img src={f.data} alt={f.name} className="h-5 w-5 rounded object-cover border border-[#d4d4d8]" />
                      ) : (
                        <FileText size={13} className="text-[#3b5bdb]" />
                      )}
                      <span className="max-w-[140px] truncate font-medium">{f.name}</span>
                      <button
                        type="button"
                        onClick={() => setFollowupFiles((fs) => fs.filter((_, idx) => idx !== i))}
                        className="text-[#a1a1aa] hover:text-[#dc2626] ml-0.5"
                        aria-label="移除附件"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <div className="relative">
                <textarea value={input} onChange={(e) => setInput(e.target.value)} onPaste={handleFollowupPaste} rows={1} onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendFollowup() } }} placeholder="继续提问，或粘贴截图与上传材料…" aria-label="继续提问" className="w-full resize-none bg-transparent outline-none text-[14px] leading-6" />
              </div>
              <div className="flex items-center gap-2 mt-2">
                <button type="button" onClick={() => followupFileRef.current?.click()} className="hk-icon-btn h-7 w-7" aria-label="上传附件" title="上传图片或文件"><Plus size={14} /></button>
                <span className="hk-pill h-7 text-[12px]"><Languages size={11} /> {language === 'zh' ? '中文' : language === 'en' ? 'English' : '한국어'}</span>
                <div className="ml-auto flex items-center gap-2">
                  <button className="hk-pill h-7 text-[12px]" onClick={async () => { const token = localStorage.getItem('access_token') ?? ''; const r = await fetch('/api/v1/share_record/share_records', { method: 'POST', headers: { 'content-type': 'application/json', authorization: `Bearer ${token}` }, body: JSON.stringify({ type: 'conversation', shared_object_id: convId, shared_with: { share_to_everyone: true } }) }).then((x) => x.json() as Promise<{ shared_url?: string }>).catch((): { shared_url?: string } => ({})); nav(r.shared_url ?? `/share/c/${convId}`) }}><Share2 size={11} /> 分享对话</button>
                  <button className="hk-pill h-7 text-[12px]"><LifeBuoy size={11} /> 遇到问题？</button>
                  <button onClick={() => sendFollowup()} disabled={streaming || (!input.trim() && followupFiles.length === 0)} className="h-8 w-8 rounded-full bg-[#0a0a0a] text-white flex items-center justify-center disabled:opacity-40" aria-label="发送"><ArrowUp size={15} /></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  )
}

export function ResponseTopExtra() {
  return (
    <>
      <button className="hk-pill"><Languages size={14} /> 切换语言</button>
      <button className="hk-pill"><Share2 size={14} /> Share conversation</button>
      <button className="hk-pill"><LifeBuoy size={14} /> 遇到问题？</button>
      <span className="hk-icon-btn"><ExternalLink size={14} /></span>
    </>
  )
}
