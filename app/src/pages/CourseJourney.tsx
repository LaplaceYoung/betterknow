import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router'
import { apiGet, apiPost } from '@/lib/api'
import { CourseStructureView, type CourseFull, type CourseProgressView } from './MarketplacePreview'
import { Sparkles, Trophy } from 'lucide-react'
import { RandomCharVideo } from '@/components/CharVideo'

// [S18] 课程主页：数据来自 /course-generation/courses/:uuid（已加入课程的完整结构）
export default function CourseJourney() {
  const { courseId = '' } = useParams()
  const nav = useNavigate()
  const loc = useLocation()
  const isWelcome = loc.pathname.endsWith('/welcome')
  const [course, setCourse] = useState<CourseFull | null>(null)
  const [err, setErr] = useState('')

  const [progress, setProgress] = useState<CourseProgressView>({})
  // 线上：从课堂返回时 route state 带 fromSessionId/completedSessionId，若那节的练习还没做就弹提醒（弹完清 state）
  // 两个独立的「关过一次」标记：欢迎弹窗与练习提醒互不影响
  const [welcomeDismissed, setWelcomeDismissed] = useState(false)
  // 线上 sectionComplete：讲次/项目/测验完成后弹一次「{{title}} 完成！」；这里用 localStorage 记录已庆祝过的 section
  const [celebration, setCelebration] = useState<{ key: string; kind: 'lecture' | 'project' | 'exam'; title: string; unitLabel: string } | null>(null)
  const dismissCelebration = () => {
    if (celebration) {
      try {
        const stored = new Set<string>(JSON.parse(localStorage.getItem('cj-celebrated-sections') ?? '[]') as string[])
        stored.add(celebration.key)
        localStorage.setItem('cj-celebrated-sections', JSON.stringify([...stored]))
      } catch { /* 隐私模式忽略 */ }
      setCelebration(null)
    }
  }
  const [reminderDismissed, setReminderDismissed] = useState(false)
  useEffect(() => { apiGet<CourseFull>(`/course-generation/courses/${courseId}`).then(setCourse).catch((e) => setErr(String(e))) }, [courseId])
  // 状态与进度分属两个端点（对齐线上契约）：练习可用性、答题统计与考试分数都取真值
  useEffect(() => {
    apiGet<{ practiceBySession?: Record<string, string> }>(`/course-generation/courses/${courseId}/generation-status`)
      .then((status) => setProgress((current) => ({ ...current, practiceBySession: status.practiceBySession ?? {} })))
      .catch(() => {})
    apiGet<CourseProgressView>(`/course-generation/courses/${courseId}/progress-status`)
      .then((stats) => setProgress((current) => ({ ...current, practiceStats: stats.practiceStats ?? {}, examScores: stats.examScores ?? {}, projectStages: stats.projectStages ?? {} })))
      .catch(() => {})
  }, [courseId])

  // 从课堂返回时 route state 带 fromSessionId/completedSessionId：只在挂载时读一次，随后清掉 state（线上同语义）
  const [arrivedFrom] = useState(() => {
    const state = (loc.state ?? null) as { fromSessionId?: string; completedSessionId?: string; fromStageId?: string; fromUnitId?: string } | null
    return {
      sessionId: state?.fromSessionId ?? state?.completedSessionId ?? '',
      stageId: state?.fromStageId ?? '',
      unitId: state?.fromUnitId ?? '',
    }
  })
  useEffect(() => {
    if (!loc.state) return
    nav(`${loc.pathname}${loc.search}${loc.hash}`, { replace: true, state: null })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const reminder = useMemo(() => {
    if (!course || !arrivedFrom.sessionId || reminderDismissed) return null
    for (let unitIndex = 0; unitIndex < course.units.length; unitIndex += 1) {
      const unit = course.units[unitIndex]
      for (const lecture of unit.lectures) {
        const session = lecture.sessions.find((s) => s.sessionId === arrivedFrom.sessionId)
        if (!session) continue
        const stats = progress.practiceStats?.[arrivedFrom.sessionId]
        // 线上条件（u && !p）：这节**有练习**（结构里有 practice，或已出现过答题统计）且**尚未交卷**
        const hasPractice = progress.practiceBySession?.[arrivedFrom.sessionId] === 'ready' || Boolean(stats)
        if (hasPractice && stats?.finished !== true) {
          return {
            practicePath: `/course/${courseId}/practice/${arrivedFrom.sessionId}`,
            unitLabel: `单元 ${unitIndex + 1}`,
            sessionTitle: session.title || '这节课',
          }
        }
        return null
      }
    }
    return null
  }, [course, progress, arrivedFrom, reminderDismissed, courseId])

  useEffect(() => {
    if (!course || celebration) return
    // 线上只在「刚回来且该节已完成」时庆祝：来源取自 route state（讲次 = 从白板回来，项目 = 从阶段页回来，测验 = 从考试页回来）
    const cameFrom = { ...arrivedFrom }
    if (!cameFrom.sessionId && !cameFrom.stageId && !cameFrom.unitId) return
    const celebrated = (() => { try { return new Set<string>(JSON.parse(localStorage.getItem('cj-celebrated-sections') ?? '[]') as string[]) } catch { return new Set<string>() } })()
    for (let unitIndex = 0; unitIndex < course.units.length; unitIndex += 1) {
      const unit = course.units[unitIndex]
      const unitLabel = `单元 ${unitIndex + 1}`
      if (cameFrom.sessionId) {
        for (const lecture of unit.lectures) {
          if (!lecture.sessions.some((s) => s.sessionId === cameFrom.sessionId)) continue
          const key = `lecture:${lecture.lectureId ?? lecture.title}`
          if (celebrated.has(key)) return
          // 该讲的每个课时都要「学完」：session 已掌握，或（有练习时）练习已交卷
          const done = lecture.sessions.every((s) => {
            const stats = progress.practiceStats?.[s.sessionId]
            const practiceExists = progress.practiceBySession?.[s.sessionId] === 'ready' || Boolean(stats)
            return practiceExists ? stats?.finished === true : s.mastery === 'mastered' || s.mastery === 'proficient'
          })
          if (done && lecture.sessions.length > 0) setCelebration({ key, kind: 'lecture', title: lecture.title ?? '本节课', unitLabel })
          return
        }
      }
      if (cameFrom.stageId) {
        // 项目：线上按 projectStages[stageId].completed（本项目全部步骤提交并通过）
        const stage = progress.projectStages?.[cameFrom.stageId]
        const key = `project:${cameFrom.stageId}`
        if (stage?.completed === true && !celebrated.has(key)) {
          setCelebration({ key, kind: 'project', title: unit.title ?? unitLabel, unitLabel })
        }
        return
      }
      if (cameFrom.unitId === unit.unitId) {
        const key = `exam:${unit.unitId}`
        if (progress.examScores?.[unit.unitId] !== undefined && !celebrated.has(key)) {
          setCelebration({ key, kind: 'exam', title: unit.title ?? unitLabel, unitLabel })
        }
        return
      }
    }
  }, [course, progress, celebration, arrivedFrom])

  if (err) return <div className="p-12 text-center text-[#8a8a90]">课程不存在或无权访问<div className="mt-2"><button onClick={() => nav('/courses')} className="hk-pill">返回我的课程</button></div></div>
  if (!course) return <div className="mx-auto max-w-[1180px] px-8 grid gap-8" style={{ gridTemplateColumns: '300px 1fr' }}><div className="space-y-3"><div className="hk-skeleton rounded-2xl h-[220px]" /><div className="hk-skeleton h-6 rounded" /></div><div className="space-y-3"><div className="hk-skeleton h-8 rounded w-1/2" /><div className="hk-skeleton h-24 rounded" /><div className="hk-skeleton h-40 rounded-2xl" /></div></div>

  const totalSessions = course.units.reduce((a, u) => a + u.lectures.reduce((b, l) => b + l.sessions.length, 0), 0)
  const finished = (sessionId: string) => progress.practiceStats?.[sessionId]?.finished === true
  const masteredSessions = course.units.reduce((a, u) => a + u.lectures.reduce((b, l) => b + l.sessions.filter((s) => finished(s.sessionId) || s.mastery === 'mastered' || s.mastery === 'proficient').length, 0), 0)
  const progressPct = totalSessions > 0 ? Math.round((masteredSessions / totalSessions) * 100) : 0

  const firstSession = course?.units?.[0]?.lectures?.[0]?.sessions?.[0]
  // 线上 .cj-welcome-next-kind 的四种配色：默认（讲座/学习）、--practice、--project、--exam
  const nextKind = (() => {
    const type = String(firstSession?.session_type ?? '')
    if (/quiz|practice/i.test(type)) return { label: '练习', cls: 'cj-welcome-next-kind--practice' }
    if (/exam/i.test(type)) return { label: '考试', cls: 'cj-welcome-next-kind--exam' }
    if (/project/i.test(type)) return { label: '项目', cls: 'cj-welcome-next-kind--project' }
    return { label: '讲座', cls: 'cj-welcome-next-kind--learn' }
  })()

  return (
    <>
      {celebration && (
        <div className="cj-section-complete-overlay" data-testid="section-complete" onClick={dismissCelebration}>
          <section className="cj-section-complete-modal" onClick={(e) => e.stopPropagation()}
            role="dialog" aria-modal="true" aria-labelledby="cj-section-complete-title" aria-describedby="cj-section-complete-desc">
            <div className="cj-section-complete-row">
              <div className="cj-section-complete-media" aria-hidden="true">
                <RandomCharVideo className="cj-section-complete-video" />
              </div>
              <div className="cj-section-complete-body">
                <span className="cj-section-complete-eyebrow">
                  {celebration.kind === 'lecture' ? '讲次完成' : celebration.kind === 'project' ? '项目完成' : '测验完成'}
                </span>
                <span id="cj-section-complete-title" className="cj-section-complete-title">{celebration.title} 完成！</span>
                <span id="cj-section-complete-desc" className="cj-section-complete-desc">
                  {celebration.kind === 'lecture'
                    ? `这一讲的每个课时都学完了，练习也都做完了。${celebration.unitLabel} 继续推进。`
                    : celebration.kind === 'project'
                      ? `这个项目的每一步都已提交并通过。这是 ${celebration.unitLabel} 里最硬的一块。`
                      : `${celebration.unitLabel} 的测验你已经考完了，成绩随时可以在卡片上查看。`}
                </span>
                <div className="cj-section-complete-actions">
                  <button type="button" className="cj-section-complete-btn" data-testid="section-complete-dismiss" onClick={dismissCelebration}>继续学习</button>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
      {reminder && (
        <div className="cj-practice-reminder-overlay" data-testid="practice-reminder" onClick={() => setReminderDismissed(true)}>
          <section className="cj-practice-reminder-modal" onClick={(e) => e.stopPropagation()}
            role="dialog" aria-modal="true" aria-labelledby="cj-practice-reminder-title" aria-describedby="cj-practice-reminder-desc">
            <div className="cj-practice-reminder-row">
              <div className="cj-practice-reminder-media" aria-hidden="true">
                <RandomCharVideo className="cj-practice-reminder-video" />
              </div>
              <div className="cj-practice-reminder-body">
                <span className="cj-practice-reminder-eyebrow">本节课已完成</span>
                <span id="cj-practice-reminder-title" className="cj-practice-reminder-title">去做练习吗？</span>
                <span id="cj-practice-reminder-desc" className="cj-practice-reminder-desc">
                  你已经上完这节课啦。趁热打铁，去完成 <strong className="cj-practice-reminder-target">{reminder.unitLabel} · {reminder.sessionTitle}</strong> 的练习吧。
                </span>
                <div className="cj-practice-reminder-actions">
                  <button type="button" className="cj-practice-reminder-btn cj-practice-reminder-btn--ghost" onClick={() => setReminderDismissed(true)}>稍后</button>
                  <button type="button" className="cj-practice-reminder-btn" data-testid="practice-reminder-start"
                    onClick={() => { const target = reminder.practicePath; setReminderDismissed(true); nav(target) }}>现在去练习</button>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
      {(isWelcome || (!welcomeDismissed && progressPct === 0)) && (
        <div className="cj-welcome-overlay" data-testid="course-welcome">
          <div className="cj-welcome-modal">
            <div className="cj-welcome-row">
              <div className="cj-welcome-media">
                <span className="flex items-center justify-center" style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg,#eef2ff,#f0fdf4)', borderRadius: 16 }}>
                  <Sparkles size={44} className="text-[#3b5bdb]" />
                </span>
              </div>
              <div className="cj-welcome-body">
                <p className="cj-welcome-title">欢迎来到「{course.courseTitle}」</p>
                <p className="cj-welcome-desc">
                  课程已准备就绪，共 {course.units.length} 个单元、{totalSessions} 个学习节点。建议从第一讲开始，按单元顺序推进。
                </p>
                {firstSession && (
                  <div className="cj-welcome-next">
                    <span className={`cj-welcome-next-kind ${nextKind.cls}`}>{nextKind.label}</span>
                    <span className="cj-welcome-next-title">{firstSession.title ?? '第一讲'}</span>
                  </div>
                )}
                <div className="cj-welcome-actions cj-welcome-actions--row">
                  <button className="cj-welcome-btn" onClick={() => { const u = course.units[0]; const l = u?.lectures?.[0]; const s = l?.sessions?.[0]; if (s && courseId) nav(`/course/${courseId}/sessions/whiteboard/${s.sessionId}`); else if (courseId) nav(`/course/${courseId}`) }}>
                    从第一讲开始
                  </button>
                  <button className="cj-welcome-btn cj-welcome-btn--ghost" onClick={() => setWelcomeDismissed(true)}>稍后再说</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {progressPct > 0 && (
        <div className="mx-auto max-w-[1180px] px-8 mb-4">
          <div className="flex items-center gap-4 text-[12px]">
            <div className="flex items-center gap-1.5 text-[#6b6b70]"><Trophy size={13} className="text-[#f59e0b]" /> 学习进度 {progressPct}%</div>
            <div className="flex-1 h-1.5 rounded-full bg-[#f1f2f4] overflow-hidden"><div className="h-full rounded-full bg-[#0a0a0a] transition-all" style={{ width: `${progressPct}%` }} /></div>
            <div className="text-[#8a8a90]">{masteredSessions} / {totalSessions} 节已掌握</div>
          </div>
        </div>
      )}

      <CourseRatingBar courseUuid={courseId} />

      <CourseStructureView course={course} enrolled courseUuid={courseId} progress={progress} onExit={() => nav('/courses')} />
    </>
  )
}

// 线上 .course-rating-bar（固定底部居中的生成质量评分条）：1–5 星 + 展开评论 + 提交
function CourseRatingBar({ courseUuid }: { courseUuid: string }) {
  const [stars, setStars] = useState(0)
  const [hover, setHover] = useState(0)
  const [expanded, setExpanded] = useState(false)
  const [comment, setComment] = useState('')
  const [sent, setSent] = useState(false)
  // 已经评过就不再问（服务端 courseRating 落库）
  useEffect(() => {
    apiGet<{ rating?: { rating: number } | null }>(`/course-generation/courses/${courseUuid}/rating`)
      .then((r) => { if (r.rating) setSent(true) })
      .catch(() => {})
  }, [courseUuid])
  const captions = ['很差', '一般', '还行', '不错', '很好']
  if (sent) return <div className="course-rating-bar course-rating-bar--journey course-rating-bar--thanks">已收到你的反馈，谢谢！</div>
  return (
    <div className={`course-rating-bar course-rating-bar--journey ${expanded ? 'expanded' : ''}`} data-testid="course-rating-bar">
      <div className="course-rating-bar-head">
        <span className="course-rating-bar-prompt">这门课程为你生成得怎么样？</span>
        <div className="star-rating" role="radiogroup" aria-label="课程评分">
          {[1, 2, 3, 4, 5].map((n) => (
            <button key={n} className={`star-rating-star ${n <= (hover || stars) ? 'filled' : ''}`} aria-label={`${n} 分`}
              onMouseEnter={() => setHover(n)} onMouseLeave={() => setHover(0)}
              onClick={() => { setStars(n); setExpanded(true) }}>
              <svg width="18" height="18" viewBox="0 0 24 24"><path d="M12 3.6l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.8-5.2 2.8 1-5.8-4.3-4.1 5.9-.9z" /></svg>
            </button>
          ))}
          <span className="star-rating-caption">{stars ? captions[stars - 1] : ''}</span>
        </div>
        <button className="course-rating-bar-later" onClick={() => setSent(true)}>稍后</button>
        <button className="course-rating-bar-close" aria-label="关闭" onClick={() => setSent(true)}>×</button>
      </div>
      {expanded && (
        <div className="course-rating-bar-detail">
          <input className="course-rating-bar-comment" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="补充你的评价（可选）" aria-label="补充评价" />
          <button className="course-rating-bar-submit"
            onClick={async () => {
              await apiPost(`/course-generation/courses/${courseUuid}/rating`, { rating: stars, comment }).catch(() => {})
              setSent(true)
            }}>提交</button>
        </div>
      )}
    </div>
  )
}
