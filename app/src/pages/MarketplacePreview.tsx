import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { ArrowLeft, BadgeCheck, Upload, Play, PenLine, ChevronRight, Hash, Share2, LogOut, MoreHorizontal, CalendarPlus, Copy, Sparkles, CheckCircle2, Check, X } from 'lucide-react'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { apiGet, apiPost, type MarketplaceCourse } from '@/lib/api'
import { UploadMaterialModal } from '@/components/UploadMaterialModal'
import { DropCourseModal } from '@/components/DropCourseModal'
import { BugReportModal } from '@/components/BugReportModal'

export interface Session { sessionIndex: number; sessionId: string; session_type: string; title?: string; status?: string; mastery?: string }
export interface Lecture { lectureId: string; title: string; description: string; order: number; sessions: Session[]; learning_finished?: boolean }
export interface Stage { stage_id: string; stage_title: string; stage_description: string; order: number }
export interface Exam { title: string; goal: string; order: number; unitId?: string }
export interface Unit { unitId: string; title: string; description: string; lectures: Lecture[]; projects?: Stage[]; exams?: Exam[]; learning_finished?: boolean }
export interface CourseFull extends Partial<MarketplaceCourse> {
  courseUuid?: string; courseTitle: string; courseDescription: string; targetLearner?: string; tags?: string[]; units: Unit[];
  coverImageUrl?: string; coverImage?: { backgroundColor?: string }; marketplaceId?: string; enrolled?: boolean; enrolledCourseUuid?: string | null; outputLanguage?: string; languages?: string[];
}

export const LEGEND = [
  { k: 'mastered', label: '已掌握', color: '#16a34a', fill: true }, { k: 'proficient', label: '熟练', color: '#2563eb', fill: true }, { k: 'familiar', label: '熟悉', color: '#2563eb', fill: false },
  { k: 'attempted', label: '已尝试', color: '#f59e0b', fill: false }, { k: 'todo', label: '未开始', color: '#a1a1aa', fill: false }, { k: 'project', label: '项目', color: '#0a0a0a', fill: false, sq: true }, { k: 'exam', label: '测验', color: '#0a0a0a', fill: false, sq: true },
]
export function StatusDot({ status }: { status?: string }) {
  const l = LEGEND.find((x) => x.k === status) ?? LEGEND[4]
  return <span aria-label={l.label} title={l.label} className={`inline-block h-3.5 w-3.5 ${l.sq ? 'rounded-sm' : 'rounded-full'}`} style={{ border: `1.5px solid ${l.color}`, background: l.fill ? l.color : 'transparent' }} />
}

// [S15]/[S18] 课程结构两栏视图：预览（未加入）与课程主页（已加入）共用
export interface CourseProgressView {
  practiceBySession?: Record<string, string>
  practiceStats?: Record<string, { started: boolean; finished: boolean; correct: number; total: number }>
  examScores?: Record<string, number>
}

export function CourseStructureView({ course, enrolled, onJoin, onExit, courseUuid, progress }: { course: CourseFull; enrolled: boolean; onJoin?: () => void; onExit?: () => void; courseUuid?: string; progress?: CourseProgressView }) {
  const nav = useNavigate()
  const [tab, setTab] = useState<'units' | 'materials' | 'practice'>('units')
  const [unitIdx, setUnitIdx] = useState(0)
  const [more, setMore] = useState(false)
  const [uploadModal, setUploadModal] = useState(false)
  const [dropModal, setDropModal] = useState(false)
  const [bugModal, setBugModal] = useState(false)
  const [actionToast, setActionToast] = useState<{ id: string; text: string } | null>(null)
  const unit = course.units[unitIdx]
  const allPractice = useMemo(() => course.units.flatMap((u, ui) => u.lectures.flatMap((l) => l.sessions.filter((s) => s.session_type !== 'whiteboard').map((s) => ({ ...s, unitNo: ui + 1, lecture: l.title })))), [course.units])
  const goSession = (s: Session) => {
    if (!enrolled || !courseUuid) { onJoin?.(); return }
    nav(s.session_type === 'whiteboard' ? `/course/${courseUuid}/sessions/whiteboard/${s.sessionId}` : `/course/${courseUuid}/practice/${s.sessionId}`)
  }

  const handleAddToCalendar = async (s: Session, lecTitle: string) => {
    try {
      await apiPost('/calendar/tasks', {
        title: `${course.courseTitle} · ${s.title ?? lecTitle}`,
        course_uuid: courseUuid,
        course_title: course.courseTitle,
        type: 'study',
        duration_min: 30,
      })
      setActionToast({ id: s.sessionId, text: '已添加至学习日程' })
      setTimeout(() => setActionToast(null), 2500)
    } catch (e) {
      console.error(e)
    }
  }

  const handleCopyOutline = async (s: Session, lec: Lecture) => {
    const text = `# ${course.courseTitle}\n## 讲次：${lec.title}\n### 课节 ${s.sessionIndex}：${s.title ?? '核心概念'}\n- 讲次概览：${lec.description}\n- 掌握目标：苏格拉底第一性原理探究与实践演练`
    try {
      await navigator.clipboard.writeText(text)
      setActionToast({ id: s.sessionId, text: '大纲已复制到剪贴板' })
      setTimeout(() => setActionToast(null), 2500)
    } catch (e) {
      console.error(e)
    }
  }

  const handleViewMindmap = (s: Session, lec: Lecture) => {
    nav(`/sampleMindmapResponse?topic=${encodeURIComponent(s.title ?? lec.title)}`)
  }

  const handleToggleMastery = async (s: Session) => {
    if (!courseUuid) return
    const nextStatus = s.status === 'mastered' ? 'todo' : 'mastered'
    try {
      await apiPost(`/course-generation/courses/${courseUuid}/sessions/${s.sessionId}/state`, {
        status: nextStatus,
        mastery: nextStatus,
      })
      s.status = nextStatus
      s.mastery = nextStatus
      setActionToast({ id: s.sessionId, text: nextStatus === 'mastered' ? '已标记为掌握' : '已重置进度' })
      setTimeout(() => setActionToast(null), 2500)
    } catch (e) {
      console.error(e)
    }
  }
  return (
    <div className="course-journey-page">
      <div className="course-journey-inner">
      <aside className="course-journey-left">
        <button onClick={() => (enrolled ? nav('/courses') : nav('/marketplace'))} className="course-journey-back-btn"><ArrowLeft size={14} />{enrolled ? '返回我的课程' : '返回课程集市'}</button>
        <div className="cj-sidebar-cover-frame">
          <div className="cj-sidebar-cover">
            {course.coverImageUrl && <img src={course.coverImageUrl} alt="" className="cj-sidebar-cover-img" />}
          </div>
          {enrolled && (
            <div className="cj-sidebar-cover-actions">
              <button className="cj-sidebar-cover-btn" data-tip="分享课程" aria-label="分享课程"><Share2 size={15} /></button>
              <button className="cj-sidebar-cover-btn" data-tip="课程操作" aria-label="课程操作" onClick={() => setDropModal(true)}><MoreHorizontal size={15} /></button>
            </div>
          )}
        </div>
        <div className="cj-sidebar-info">
        <div className="cj-sidebar-creator-row">
          <span className="cj-sidebar-creator-avatar"><span className="cj-sidebar-creator-glyph">◆</span></span>
          <span className="cj-sidebar-creator-info">
            <span className="cj-sidebar-creator-type">课程创作者</span>
            <span className="cj-sidebar-creator-name">betterknow Learning Lab</span>
          </span>
        </div>
        <h1 className="cj-sidebar-title">{course.courseTitle}</h1>
        <p className={`cj-sidebar-desc ${more ? '' : ''}`} style={more ? { WebkitLineClamp: 'unset' } : undefined}>{course.courseDescription}</p>
        <button onClick={() => setMore((m) => !m)} className="cj-sidebar-show-more">{more ? '收起' : '显示更多'}</button>
        {course.tags?.length ? <div className="flex flex-wrap gap-1.5">{course.tags.slice(0, 6).map((t) => <span key={t} className="text-[11px] px-1.5 py-0.5 rounded bg-[#f1f2f4] text-[#6b6b70] inline-flex items-center gap-0.5"><Hash size={10} />{t}</span>)}</div> : null}
        {!enrolled ? (
          <button onClick={onJoin} className="w-full h-11 rounded-xl bg-[#0a0a0a] text-white font-medium hover:bg-black/85">加入课程</button>
        ) : (
          <div className="flex gap-2"><button className="hk-pill flex-1 justify-center"><Share2 size={13} />分享</button><button onClick={() => setDropModal(true)} className="hk-pill flex-1 justify-center text-[#dc2626]"><LogOut size={13} />退出课程</button></div>
        )}
        </div>

        <div className="cj-sidebar-section-header"><span className="cj-sidebar-section-title">课程大纲</span></div>
        <nav className="cj-sidebar-tabs" role="tablist">
          {([['units', '单元'], ['materials', '资料'], ['practice', '练习']] as const).map(([k, l]) => (
            <button key={k} role="tab" aria-selected={tab === k} data-active={tab === k} onClick={() => setTab(k)} className={`cj-sidebar-tab ${tab === k ? 'cj-sidebar-tab--active' : ''}`}>{l}</button>
          ))}
        </nav>
        {tab === 'units' && (
          <ol className="space-y-1">
            {course.units.map((u, i) => (
              <li key={u.unitId}><button onClick={() => setUnitIdx(i)} className="w-full text-left flex items-start gap-2.5 px-2.5 py-2 rounded-lg hover:bg-[#f4f4f5] data-[on=true]:bg-[#eef2ff]" data-on={unitIdx === i}><span className="mt-0.5 h-5 w-5 shrink-0 rounded-md bg-[#f1f2f4] text-[11px] flex items-center justify-center font-medium data-[on=true]:bg-[#3b5bdb] data-[on=true]:text-white" data-on={unitIdx === i}>{i + 1}</span><span className="text-[13px] leading-5">{u.title}</span></button></li>
            ))}
          </ol>
        )}
        {tab === 'materials' && <div className="text-[13px] text-[#8a8a90] py-6 text-center">本课程暂无资料</div>}
        {tab === 'practice' && (
          <ul className="space-y-1 text-[13px]">
            {allPractice.slice(0, 40).map((p) => (
              <li key={p.sessionId}><button onClick={() => goSession(p)} className="w-full text-left px-2.5 py-2 rounded-lg hover:bg-[#f4f4f5]"><div className="truncate">{p.title ?? p.lecture}</div><div className="text-[11px] text-[#8a8a90]">单元 {p.unitNo} · {p.session_type === 'quiz' ? '测验' : p.session_type === 'project' ? '项目' : '练习'}</div></button></li>
            ))}
          </ul>
        )}
        <div className="pt-4 border-t flex justify-center">
          <button onClick={() => setBugModal(true)} className="text-[12px] text-[#8a8a90] hover:text-[#0a0a0a] transition-colors">
            遇到问题？向我们反馈
          </button>
        </div>
      </aside>

      <main className="course-journey-right">
        <section className="course-journey-unit-overview">
        {unit && (
          <div key={unit.unitId} className="hk-fade-in-up course-journey-unit-header">
            <div className="course-journey-unit-eyebrow">第 {unitIdx + 1} 单元共 {course.units.length} 单元</div>
            <h2 className="course-journey-unit-title flex items-center gap-2">
              单元 {unitIdx + 1}：{unit.title}
              {typeof progress?.examScores?.[unit.unitId] === 'number' && (
                <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-[#eff6ff] text-[#1d4ed8]">考试 {progress.examScores[unit.unitId]} 分</span>
              )}
              {typeof progress?.examScores?.[`unit${unitIdx + 1}`] === 'number' && (
                <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-[#eff6ff] text-[#1d4ed8]">考试 {progress.examScores[`unit${unitIdx + 1}`]} 分</span>
              )}
            </h2>
            <p className="course-journey-unit-description">{unit.description}</p>
            <button onClick={() => setUploadModal(true)} className="mt-4 w-full hk-card p-4 flex items-center gap-3 text-left hover:shadow-md cursor-pointer"><span className="flex -space-x-2"><span className="h-8 w-8 rounded-lg bg-[#fde68a]" /><span className="h-8 w-8 rounded-lg bg-[#bfdbfe]" /><span className="h-8 w-8 rounded-lg bg-[#fecaca]" /></span><span><span className="block text-[13px] font-medium inline-flex items-center gap-1"><Upload size={13} />上传材料，扩展这门课程</span><span className="block text-[12px] text-[#8a8a90]">上传教材的 PDF，或直接描述你想添加、修改的内容</span></span></button>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-[11px] text-[#6b6b70]">{LEGEND.map((l) => <span key={l.k} className="inline-flex items-center gap-1"><StatusDot status={l.k} />{l.label}</span>)}</div>
            <div className="mt-3 inline-flex items-center gap-2 text-[12px] px-3 h-8 rounded-full bg-[#f4f4f5]"><Play size={11} />{enrolled ? `下一步：单元 ${unitIdx + 1} · ${unit.lectures[0]?.title ?? ''}` : '这是新课程，请从这里开始：单元 1'}<ChevronRight size={12} /></div>

            <div className="mt-6 space-y-4">
              {unit.lectures.map((lec, li) => (
                <div key={lec.lectureId} className="hk-card p-4">
                  <div className="flex items-start gap-3"><span className="mt-0.5 h-6 w-6 shrink-0 rounded-full bg-[#f1f2f4] text-[12px] flex items-center justify-center">{li + 1}</span><div className="flex-1"><h3 className="text-[15px] font-semibold">讲次 {li + 1}：{lec.title}</h3><p className="text-[12px] text-[#6b6b70] leading-5 mt-1">{lec.description}</p></div></div>
                  <ul className="mt-3 divide-y">
                    {lec.sessions.map((s) => {
                      const stat = progress?.practiceStats?.[s.sessionId]
                      const availability = progress?.practiceBySession?.[s.sessionId]
                      const liveStatus = stat?.finished ? (stat.total > 0 && stat.correct / stat.total >= 0.8 ? 'mastered' : 'familiar') : stat?.started ? 'attempted' : undefined
                      return (
                      <li key={s.sessionId} className="flex items-center gap-3 py-2 text-[13px] group">
                        <span className="flex-1 truncate">{s.title ?? `${lec.title} · 第 ${s.sessionIndex} 节`}</span>
                        {actionToast?.id === s.sessionId && (
                          <span className="text-[11px] text-[#16a34a] font-medium inline-flex items-center gap-1 bg-[#f0fdf4] px-2 py-0.5 rounded-full border border-[#bbf7d0] hk-fade-in">
                            <Check size={11} /> {actionToast.text}
                          </span>
                        )}
                        <button onClick={() => goSession({ ...s, session_type: 'whiteboard' })} className="hk-pill h-7 text-[12px] px-2.5"><Play size={11} />学习</button>
                        <button
                          onClick={() => goSession({ ...s, session_type: 'practice' })}
                          disabled={availability === 'none'}
                          title={availability === 'none' ? '这门课程暂未生成随堂练习' : undefined}
                          className="hk-pill h-7 text-[12px] px-2.5 disabled:opacity-40"
                        ><PenLine size={11} />练习{stat?.finished ? ` ${stat.correct}/${stat.total}` : ''}</button>
                        <StatusDot status={liveStatus ?? s.status} />
                        <Popover>
                          <PopoverTrigger asChild>
                            <button className="hk-icon-btn h-7 w-7 text-[#8a8a90] hover:text-black opacity-60 group-hover:opacity-100 transition-opacity" aria-label="更多操作" title="更多操作">
                              <MoreHorizontal size={14} />
                            </button>
                          </PopoverTrigger>
                          <PopoverContent align="end" className="w-[180px] p-1.5 hk-pop space-y-0.5">
                            <button onClick={() => handleAddToCalendar(s, lec.title)} className="w-full text-left px-2.5 py-1.5 rounded-md hover:bg-[#f4f4f5] text-[12px] flex items-center gap-2 text-[#3d3d3f]">
                              <CalendarPlus size={13} className="text-[#3b5bdb]" /> 加入学习日程
                            </button>
                            <button onClick={() => handleCopyOutline(s, lec)} className="w-full text-left px-2.5 py-1.5 rounded-md hover:bg-[#f4f4f5] text-[12px] flex items-center gap-2 text-[#3d3d3f]">
                              <Copy size={13} className="text-[#6b6b70]" /> 复制本讲大纲
                            </button>
                            <button onClick={() => handleViewMindmap(s, lec)} className="w-full text-left px-2.5 py-1.5 rounded-md hover:bg-[#f4f4f5] text-[12px] flex items-center gap-2 text-[#3d3d3f]">
                              <Sparkles size={13} className="text-[var(--pro-gold)]" /> 查看知识图谱
                            </button>
                            {enrolled && (
                              <button onClick={() => handleToggleMastery(s)} className="w-full text-left px-2.5 py-1.5 rounded-md hover:bg-[#f4f4f5] text-[12px] flex items-center gap-2 text-[#3d3d3f] border-t border-[#f4f4f5] mt-1 pt-1.5">
                                <CheckCircle2 size={13} className={s.status === 'mastered' ? 'text-[#a1a1aa]' : 'text-[#16a34a]'} />
                                {s.status === 'mastered' ? '重置为未学' : '标记为已掌握'}
                              </button>
                            )}
                          </PopoverContent>
                        </Popover>
                      </li>
                      )
                    })}
                  </ul>
                </div>
              ))}
              {(unit.projects ?? []).map((st) => (
                <div key={st.stage_id} className="hk-card p-4 flex items-start gap-3"><StatusDot status="project" /><div className="flex-1"><h3 className="text-[14px] font-semibold">项目：{st.stage_title}</h3><p className="text-[12px] text-[#6b6b70] leading-5 mt-1">{st.stage_description}</p></div><button onClick={() => enrolled && courseUuid ? nav(`/course/${courseUuid}/project/${st.stage_id}`) : onJoin?.()} className="hk-pill h-8">开始</button></div>
              ))}
              {(unit.exams ?? []).map((ex, i) => (
                <div key={i} className="hk-card p-4 flex items-start gap-3"><StatusDot status="exam" /><div className="flex-1"><h3 className="text-[14px] font-semibold">{ex.title}</h3><p className="text-[12px] text-[#6b6b70] leading-5 mt-1">{ex.goal}</p></div><button onClick={() => enrolled && courseUuid ? nav(`/course/${courseUuid}/exam/${unit.unitId}`) : onJoin?.()} className="hk-pill h-8">开始</button></div>
              ))}
            </div>
          </div>
        )}
        </section>
      </main>

      <UploadMaterialModal
        open={uploadModal}
        onOpenChange={setUploadModal}
        courseTitle={course.courseTitle}
        courseUuid={courseUuid}
        units={course.units.map((u) => ({
          unitId: u.unitId,
          title: u.title,
          lectures: u.lectures.map((l) => ({ lectureId: l.lectureId, title: l.title })),
        }))}
      />
      <DropCourseModal
        open={dropModal}
        onOpenChange={setDropModal}
        courseTitle={course.courseTitle}
        onConfirm={() => onExit?.()}
      />
      <BugReportModal
        open={bugModal}
        onOpenChange={setBugModal}
        context={`Course: ${course.courseTitle}`}
      />
      </div>
    </div>
  )
}

// [S16] 加入课程弹窗：chrome 按线上 .join-auth-modal（380 / radius 18 / padding 28 24 24 / 阴影 0 24px 60px #0f172a2e）
export function JoinDialog({ open, onOpenChange, title, onConfirm, languages }: { open: boolean; onOpenChange: (o: boolean) => void; title: string; onConfirm: (lang: string) => void; languages?: string[] }) {
  const [lang, setLang] = useState('zh')
  const [busy, setBusy] = useState(false)
  const opts = (languages?.length ? languages : ['en', 'zh']).map((l) => ({ v: l, label: l === 'zh' ? '中文' : l === 'en' ? 'English' : l }))
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 gap-0 border-0 shadow-none bg-transparent" style={{ maxWidth: 380 }} data-testid="join-dialog">
        <div style={{ position: 'relative', width: '100%', background: '#fff', borderRadius: 18, boxShadow: '0 24px 60px rgba(15,23,42,.18)', padding: '28px 24px 24px' }}>
          <button onClick={() => onOpenChange(false)} aria-label="关闭"
            style={{ position: 'absolute', top: 12, right: 12, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 26, height: 26, border: '1px solid #ececef', borderRadius: 8, background: '#fff', color: '#6b7280', cursor: 'pointer' }}>
            <X size={14} />
          </button>
          <DialogTitle style={{ margin: '0 0 8px', paddingRight: 20, color: '#0f1f33', fontSize: 17, fontWeight: 600, lineHeight: 1.3 }}>加入这门课程？</DialogTitle>
          <p style={{ margin: '0 0 20px', color: '#7c8194', fontSize: 13, lineHeight: 1.5 }}>「{title}」将添加到你的课程列表中，你可以随时开始学习。</p>
          <div style={{ marginBottom: 20 }}>
            <div className="text-[13px] font-medium mb-1.5" style={{ color: '#0f1f33' }}>课程语言</div>
            <div className="inline-flex rounded-lg border p-0.5" style={{ borderColor: '#e5e7eb' }}>{opts.map((o) => <button key={o.v} onClick={() => setLang(o.v)} className="px-3 h-8 rounded-md text-[13px]" style={{ background: lang === o.v ? '#f1f2f4' : 'transparent', fontWeight: lang === o.v ? 600 : 400 }}>{o.label}</button>)}</div>
            <p style={{ margin: '6px 0 0', fontSize: 12, color: '#8a8a90' }}>讲解、练习和考试都将使用这个语言，加入后无法更改。</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <button disabled={busy} onClick={async () => { setBusy(true); try { await onConfirm(lang) } finally { setBusy(false) } }}
              data-testid="join-confirm"
              style={{ padding: '10px 16px', border: 'none', borderRadius: 10, background: '#000', color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer', opacity: busy ? .6 : 1 }}>{busy ? '正在加入…' : '确认加入'}</button>
            <button onClick={() => onOpenChange(false)}
              style={{ padding: '10px 16px', border: '1px solid #e5e7eb', borderRadius: 10, background: '#fff', color: '#111827', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>再想想</button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default function MarketplacePreview() {
  const { courseId = '' } = useParams()
  const nav = useNavigate()
  const [course, setCourse] = useState<CourseFull | null>(null)
  const [join, setJoin] = useState(false)
  useEffect(() => { apiGet<CourseFull>(`/marketplace/courses/${courseId}/preview`).then(setCourse).catch(() => setCourse(null)) }, [courseId])
  if (!course) return <div className="mx-auto max-w-[1180px] px-8 grid gap-8" style={{ gridTemplateColumns: '300px 1fr' }}><div className="space-y-3"><div className="hk-skeleton rounded-2xl h-[220px]" /><div className="hk-skeleton h-6 rounded" /><div className="hk-skeleton h-16 rounded" /></div><div className="space-y-3"><div className="hk-skeleton h-8 rounded w-1/2" /><div className="hk-skeleton h-24 rounded" /><div className="hk-skeleton h-40 rounded-2xl" /></div></div>
  // [B7] 加入 → 服务端 enroll → 跳课程主页
  const confirm = async (lang: string) => {
    const r = await apiPost<{ courseUuid: string }>(`/marketplace/courses/${courseId}/enroll`, { language: lang })
    setJoin(false)
    nav(`/course/${r.courseUuid}`)
  }
  return (
    <>
      <CourseStructureView course={course} enrolled={false} onJoin={() => (course.enrolled && course.enrolledCourseUuid ? nav(`/course/${course.enrolledCourseUuid}`) : setJoin(true))} />
      <JoinDialog open={join} onOpenChange={setJoin} title={course.courseTitle} onConfirm={confirm} languages={course.languages} />
    </>
  )
}
