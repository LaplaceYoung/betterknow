import { useEffect, useState } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router'
import { apiGet } from '@/lib/api'
import { CourseStructureView, type CourseFull, type CourseProgressView } from './MarketplacePreview'
import { Sparkles, BookOpen, Trophy } from 'lucide-react'

// [S18] 课程主页：数据来自 /course-generation/courses/:uuid（已加入课程的完整结构）
export default function CourseJourney() {
  const { courseId = '' } = useParams()
  const nav = useNavigate()
  const loc = useLocation()
  const isWelcome = loc.pathname.endsWith('/welcome')
  const [course, setCourse] = useState<CourseFull | null>(null)
  const [err, setErr] = useState('')
  const [dismissed, setDismissed] = useState(false)
  const [progress, setProgress] = useState<CourseProgressView>({})
  useEffect(() => { apiGet<CourseFull>(`/course-generation/courses/${courseId}`).then(setCourse).catch((e) => setErr(String(e))) }, [courseId])
  // 状态与进度分属两个端点（对齐线上契约）：练习可用性、答题统计与考试分数都取真值
  useEffect(() => {
    apiGet<{ practiceBySession?: Record<string, string> }>(`/course-generation/courses/${courseId}/generation-status`)
      .then((status) => setProgress((current) => ({ ...current, practiceBySession: status.practiceBySession ?? {} })))
      .catch(() => {})
    apiGet<CourseProgressView>(`/course-generation/courses/${courseId}/progress-status`)
      .then((stats) => setProgress((current) => ({ ...current, practiceStats: stats.practiceStats ?? {}, examScores: stats.examScores ?? {} })))
      .catch(() => {})
  }, [courseId])

  if (err) return <div className="p-12 text-center text-[#8a8a90]">课程不存在或无权访问<div className="mt-2"><button onClick={() => nav('/courses')} className="hk-pill">返回我的课程</button></div></div>
  if (!course) return <div className="mx-auto max-w-[1180px] px-8 grid gap-8" style={{ gridTemplateColumns: '300px 1fr' }}><div className="space-y-3"><div className="hk-skeleton rounded-2xl h-[220px]" /><div className="hk-skeleton h-6 rounded" /></div><div className="space-y-3"><div className="hk-skeleton h-8 rounded w-1/2" /><div className="hk-skeleton h-24 rounded" /><div className="hk-skeleton h-40 rounded-2xl" /></div></div>

  const totalSessions = course.units.reduce((a, u) => a + u.lectures.reduce((b, l) => b + l.sessions.length, 0), 0)
  const finished = (sessionId: string) => progress.practiceStats?.[sessionId]?.finished === true
  const masteredSessions = course.units.reduce((a, u) => a + u.lectures.reduce((b, l) => b + l.sessions.filter((s) => finished(s.sessionId) || s.mastery === 'mastered' || s.mastery === 'proficient').length, 0), 0)
  const progressPct = totalSessions > 0 ? Math.round((masteredSessions / totalSessions) * 100) : 0

  return (
    <>
      {(isWelcome || !dismissed) && progressPct === 0 && (
        <div className="mx-auto max-w-[1180px] px-8 mb-6">
          <div className="hk-card p-6 bg-gradient-to-r from-[#eef2ff] to-[#f0fdf4] border-[#c7d2fe] hk-fade-in-up">
            <div className="flex items-start gap-4">
              <span className="h-12 w-12 rounded-2xl bg-white shadow-sm flex items-center justify-center shrink-0">
                <Sparkles size={22} className="text-[#3b5bdb]" />
              </span>
              <div className="flex-1">
                <h2 className="text-[18px] font-semibold">🎉 欢迎来到「{course.courseTitle}」</h2>
                <p className="text-[13px] text-[#6b6b70] mt-1 leading-relaxed max-w-[600px]">
                  课程已准备就绪，共 {course.units.length} 个单元、{totalSessions} 个学习节点。点击任意一讲的「学习」按钮即可开始白板教学，「练习」按钮测验你的掌握程度。
                </p>
                <div className="flex items-center gap-3 mt-3">
                  <button onClick={() => { const u = course.units[0]; const l = u?.lectures?.[0]; const s = l?.sessions?.[0]; if (s && courseId) nav(`/course/${courseId}/sessions/whiteboard/${s.sessionId}`); else setDismissed(true) }} className="h-9 px-5 rounded-full bg-[#0a0a0a] text-white text-[13px] font-medium inline-flex items-center gap-1.5 hover:bg-black/80">
                    <BookOpen size={14} /> 从第一讲开始
                  </button>
                  <button onClick={() => setDismissed(true)} className="hk-pill h-9 text-[13px] px-4">稍后再说</button>
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

      <CourseStructureView course={course} enrolled courseUuid={courseId} progress={progress} onExit={() => nav('/courses')} />
    </>
  )
}
