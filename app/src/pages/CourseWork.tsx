import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { ArrowLeft, Check, X, ChevronRight, Lightbulb } from 'lucide-react'
import { apiGet, apiPost } from '@/lib/api'

export interface Question { id: string; type: 'single' | 'multiple' | 'fill' | string; prompt: string; options?: string[]; explanation?: string; correctAnswers?: string[]; image?: { alt?: string; src?: string } }

function QuizRunner({ title, questions, onFinish, subtitle }: { title: string; questions: Question[]; subtitle?: string; onFinish: (score: number, total: number) => void }) {
  const [i, setI] = useState(0)
  const [picked, setPicked] = useState<string[]>([])
  const [fill, setFill] = useState('')
  const [checked, setChecked] = useState(false)
  const [score, setScore] = useState(0)
  const [hint, setHint] = useState(false)
  const q = questions[i]
  if (!q) return null
  const correct = q.correctAnswers ?? []
  const isRight = q.type === 'fill' ? correct.some((c) => c.trim().toLowerCase() === fill.trim().toLowerCase()) : picked.length === correct.length && picked.every((p) => correct.includes(p))
  const next = () => { if (i + 1 >= questions.length) { onFinish(score + (isRight ? 1 : 0), questions.length); return } setScore((s) => s + (isRight ? 1 : 0)); setI(i + 1); setPicked([]); setFill(''); setChecked(false); setHint(false) }
  return (
    <div className="mx-auto max-w-[760px] px-8 pb-24">
      <div className="flex items-center justify-between text-[12px] text-[#8a8a90] mt-2"><span>{subtitle}</span><span>第 {i + 1} / {questions.length} 题</span></div>
      <div className="h-1 rounded-full bg-[#f1f2f4] mt-2 overflow-hidden"><div className="h-full bg-[#0a0a0a] transition-all" style={{ width: `${((i + (checked ? 1 : 0)) / questions.length) * 100}%` }} /></div>
      <h1 className="text-[20px] font-semibold mt-6">{title}</h1>
      <div className="hk-card p-6 mt-4 hk-fade-in-up" key={q.id}>
        {q.image?.src && <img src={q.image.src} alt={q.image.alt ?? ''} className="max-h-[220px] rounded-lg mb-4 mx-auto" />}
        <div className="text-[15px] leading-7">{q.prompt}</div>
        {q.type === 'fill' ? (
          <input value={fill} onChange={(e) => setFill(e.target.value)} disabled={checked} placeholder="输入你的答案" className="mt-4 w-full h-11 px-3 rounded-xl border bg-white outline-none focus:border-[#a1a1aa]" />
        ) : (
          <div className="mt-4 space-y-2">
            {(q.options ?? []).map((o, oi) => {
              const on = picked.includes(o); const right = checked && correct.includes(o); const wrong = checked && on && !correct.includes(o)
              return <button key={oi} disabled={checked} onClick={() => setPicked((p) => (q.type === 'multiple' ? (on ? p.filter((x) => x !== o) : [...p, o]) : [o]))}
                className={`w-full text-left flex items-start gap-3 px-4 py-3 rounded-xl border text-[14px] transition-colors ${right ? 'border-[#16a34a] bg-[#f0fdf4]' : wrong ? 'border-[#dc2626] bg-[#fef2f2]' : on ? 'border-[#3b5bdb] bg-[#f5f8ff]' : 'hover:border-[#a1a1aa]'}`}>
                <span className="mt-0.5 h-5 w-5 shrink-0 rounded-full border text-[11px] flex items-center justify-center">{String.fromCharCode(65 + oi)}</span><span className="flex-1">{o}</span>{right && <Check size={16} className="text-[#16a34a]" />}{wrong && <X size={16} className="text-[#dc2626]" />}</button>
            })}
          </div>
        )}
        {checked && q.explanation && <div className="mt-4 rounded-xl bg-[#fafafa] border p-3 text-[13px] leading-6 text-[#3d3d3f] hk-fade-in"><span className={`font-medium ${isRight ? 'text-[#16a34a]' : 'text-[#dc2626]'}`}>{isRight ? '回答正确' : '再想想'}</span> · {q.explanation}</div>}
        {hint && !checked && <div className="mt-3 text-[12px] text-[#6b6b70] inline-flex items-center gap-1"><Lightbulb size={12} /> 提示：{q.explanation?.slice(0, 60)}…</div>}
        <div className="flex items-center gap-2 mt-5">
          <button onClick={() => setHint(true)} className="hk-pill text-[12px]"><Lightbulb size={12} /> 提示</button>
          <div className="ml-auto flex gap-2">
            {!checked ? <button disabled={q.type === 'fill' ? !fill.trim() : picked.length === 0} onClick={() => setChecked(true)} className="h-9 px-4 rounded-full bg-[#0a0a0a] text-white text-[13px] disabled:opacity-40">检查</button>
              : <button onClick={next} className="h-9 px-4 rounded-full bg-[#0a0a0a] text-white text-[13px] inline-flex items-center gap-1">{i + 1 >= questions.length ? '完成' : '下一题'} <ChevronRight size={14} /></button>}
          </div>
        </div>
      </div>
    </div>
  )
}

// [S30] 练习：/course/:id/practice/:sessionId → practice sessions；进度写回 progress（客户端权威）
export function Practice() {
  const { courseId = '', sessionId = '' } = useParams()
  const nav = useNavigate()
  const [data, setData] = useState<{ sessions: { title: string; sessionId: string; questions: Question[] }[] } | null>(null)
  const [result, setResult] = useState<{ score: number; total: number } | null>(null)
  useEffect(() => { apiGet<{ sessions: { title: string; sessionId: string; questions: Question[] }[] }>(`/course-generation/courses/${courseId}/practice`).then(setData).catch(() => setData({ sessions: [] })) }, [courseId])
  const session = useMemo(() => data?.sessions.find((s) => s.sessionId === sessionId) ?? data?.sessions[0], [data, sessionId])
  if (!data) return <div className="p-10"><div className="hk-skeleton h-40 rounded-2xl" /></div>
  if (!session) return <Empty back={() => nav(`/course/${courseId}`)} text="这一节还没有练习题" />
  if (result) return <Result back={() => nav(`/course/${courseId}`)} score={result.score} total={result.total} label="练习完成" />
  return <><BackBar onBack={() => nav(`/course/${courseId}`)} /><QuizRunner title={session.title} subtitle="练习" questions={session.questions} onFinish={async (score, total) => { await apiPost(`/course-generation/courses/${courseId}/practice/progress`, { sessionId: session.sessionId, score, total, completed: true }).catch(() => {}); setResult({ score, total }) }} /></>
}

// [S30] 考试：/course/:id/exam/:unitId → exams；exam/score 客户端权威记账
export function Exam() {
  const { courseId = '', unitId = '' } = useParams()
  const nav = useNavigate()
  const [data, setData] = useState<{ exams: { title: string; unitId: string; questions: Question[] }[] } | null>(null)
  const [result, setResult] = useState<{ score: number; total: number } | null>(null)
  useEffect(() => { apiGet<{ exams: { title: string; unitId: string; questions: Question[] }[] }>(`/course-generation/courses/${courseId}/exam`).then(setData).catch(() => setData({ exams: [] })) }, [courseId])
  const exam = useMemo(() => data?.exams.find((e) => e.unitId === unitId) ?? data?.exams[0], [data, unitId])
  if (!data) return <div className="p-10"><div className="hk-skeleton h-40 rounded-2xl" /></div>
  if (!exam) return <Empty back={() => nav(`/course/${courseId}`)} text="这个单元还没有测验" />
  if (result) return <Result back={() => nav(`/course/${courseId}`)} score={result.score} total={result.total} label="测验完成" />
  return <><BackBar onBack={() => nav(`/course/${courseId}`)} /><QuizRunner title={exam.title} subtitle="单元综合考试" questions={exam.questions} onFinish={async (score, total) => { await apiPost(`/course-generation/courses/${courseId}/exam/score`, { unitId: exam.unitId, score: Math.round((score / total) * 100) }).catch(() => {}); setResult({ score, total }) }} /></>
}

// [S30] 项目阶段：/course/:id/project/:stageId
export function Project() {
  const { courseId = '', stageId = '' } = useParams()
  const nav = useNavigate()
  const [data, setData] = useState<{ stages?: { stage_id: string; stage_title: string; stage_description: string; deliverable_increment?: string; steps?: { step_id: string; title: string; instruction?: string }[] }[]; projects?: { project_name: string; project_description: string }[] } | null>(null)
  const [draft, setDraft] = useState('')
  const [feedback, setFeedback] = useState('')
  useEffect(() => { apiGet<typeof data>(`/course-generation/courses/${courseId}/project`).then(setData).catch(() => setData({})) }, [courseId])
  const stage = data?.stages?.find((s) => s.stage_id === stageId) ?? data?.stages?.[0]
  if (!data) return <div className="p-10"><div className="hk-skeleton h-40 rounded-2xl" /></div>
  if (!stage) return <Empty back={() => nav(`/course/${courseId}`)} text="这门课暂无项目" />
  const submit = async () => { const r: { feedback?: string; score?: number; message?: string } = await apiPost<{ feedback?: string; score?: number; message?: string }>(`/course-generation/courses/${courseId}/project/stages/${stage.stage_id}/state`, { submission: draft, status: 'submitted' }).catch(() => ({ message: '已保存草稿' })); setFeedback(r.feedback ?? r.message ?? '已提交') }
  return (
    <div className="mx-auto max-w-[860px] px-8 pb-16">
      <BackBar onBack={() => nav(`/course/${courseId}`)} />
      <div className="text-[12px] text-[#8a8a90]">{data.projects?.[0]?.project_name}</div>
      <h1 className="text-[22px] font-semibold mt-1">{stage.stage_title}</h1>
      <p className="text-[14px] text-[#3d3d3f] leading-7 mt-3">{stage.stage_description}</p>
      {stage.deliverable_increment && <div className="hk-card p-4 mt-4 text-[13px]"><span className="font-medium">本阶段交付：</span>{stage.deliverable_increment}</div>}
      <textarea value={draft} onChange={(e) => setDraft(e.target.value)} rows={10} placeholder="在这里撰写你的阶段成果…" className="mt-4 w-full rounded-2xl border bg-white p-4 text-[14px] leading-7 outline-none focus:border-[#a1a1aa]" />
      <div className="flex items-center gap-2 mt-3"><button className="hk-pill">上传文件</button><button onClick={submit} disabled={!draft.trim()} className="ml-auto h-10 px-5 rounded-full bg-[#0a0a0a] text-white disabled:opacity-40">提交评审</button></div>
      {feedback && <div className="hk-card p-4 mt-4 text-[13px] leading-6 hk-fade-in">{feedback}</div>}
    </div>
  )
}

function BackBar({ onBack }: { onBack: () => void }) { return <div className="mx-auto max-w-[760px] px-8 pt-1"><button onClick={onBack} className="inline-flex items-center gap-1 text-[12px] text-[#6b6b70] hover:text-black"><ArrowLeft size={13} /> 返回课程</button></div> }
function Empty({ back, text }: { back: () => void; text: string }) { return <div className="p-16 text-center text-[#8a8a90]">{text}<div className="mt-3"><button onClick={back} className="hk-pill">返回课程</button></div></div> }
function Result({ back, score, total, label }: { back: () => void; score: number; total: number; label: string }) {
  const pct = Math.round((score / Math.max(total, 1)) * 100)
  return <div className="mx-auto max-w-[520px] px-8 pt-16 text-center hk-fade-in-up"><div className="text-[48px]">{pct >= 80 ? '🎉' : pct >= 50 ? '👏' : '💪'}</div><h1 className="text-[22px] font-semibold mt-2">{label}</h1><div className="text-[40px] font-semibold mt-4">{pct}<span className="text-[16px] text-[#8a8a90]"> 分</span></div><div className="text-[13px] text-[#8a8a90]">{score} / {total} 题正确 · 成绩已记入课程进度</div><button onClick={back} className="mt-6 h-10 px-5 rounded-full bg-[#0a0a0a] text-white">回到课程</button></div>
}
