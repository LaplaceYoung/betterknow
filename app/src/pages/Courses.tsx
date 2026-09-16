import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router'
import { Search, Share2, MoreHorizontal, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'
import { apiGet, type MarketplaceCourse } from '@/lib/api'

interface MyCourse { courseUuid: string; courseTitle: string; courseDescription: string; tags?: string[]; unitCount: number; sessionCount: number; coverImageUrl: string; createdAt: string; source?: string; progress?: number; nextItem?: { title?: string; unitTitle?: string; type?: string } | null }

interface LearningStats {
  completed_sessions: number
  minutes_learned: number
  streak_days: number
  daily_activity: Array<{ day: string; dayIdx: number; sessions: number; minutes: number; active: boolean }>
  courses_enrolled: number
  total_sessions: number
}

const fmtDate = (s: string) => { const d = new Date(s); return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日` }
const WEEK = ['一', '二', '三', '四', '五', '六', '日']

export default function Courses() {
  const nav = useNavigate()
  const [courses, setCourses] = useState<MyCourse[] | null>(null)
  const [stats, setStats] = useState<LearningStats | null>(null)
  const [tab, setTab] = useState<'all' | 'active' | 'done'>('all')
  const [q, setQ] = useState('')
  const [recs, setRecs] = useState<MarketplaceCourse[]>([])
  useEffect(() => {
    apiGet<{ courses: MyCourse[] }>('/course-generation/courses').then((r) => setCourses(r.courses)).catch(() => setCourses([]))
    apiGet<{ courses: MarketplaceCourse[] }>('/marketplace/courses').then((r) => setRecs(r.courses.filter((c) => !c.enrolled).slice(0, 3))).catch(() => {})
    apiGet<LearningStats>('/user/learning-stats').then(setStats).catch(() => {})
  }, [])
  const shown = useMemo(() => (courses ?? []).filter((c) => (tab === 'all' || (tab === 'done' ? (c.progress ?? 0) >= 100 : (c.progress ?? 0) < 100)) && (!q || c.courseTitle.toLowerCase().includes(q.toLowerCase()))), [courses, tab, q])
  const today = new Date().getDay() // 0=Sun
  const todayIdx = (today + 6) % 7
  const first = courses?.[0]

  return (
    <div className="courses-page">
      <div className="courses-inner">
      <div className="courses-layout">
      <section className="courses-main">
        <h1 className="courses-title">我的课程</h1>
        <div className="courses-toolbar">
          <div role="tablist" aria-label="课程状态" className="courses-tabs">
            {([['all', '全部'], ['active', '进行中'], ['done', '已完成']] as const).map(([k, l]) => (
              <button key={k} role="tab" aria-selected={tab === k} onClick={() => setTab(k)} className={`courses-tab ${tab === k ? 'active' : ''}`}>{l}</button>
            ))}
          </div>
          <label className="courses-search-wrap"><Search size={14} className="courses-search-icon" color="#b8b1a7" /><input className="courses-search" aria-label="搜索课程" placeholder="搜索我的课程" value={q} onChange={(e) => setQ(e.target.value)} /></label>
        </div>

        <div className="courses-list-scroll">
        <div className="courses-list">
          {courses === null && <div className="hk-skeleton rounded-2xl h-[140px]" />}
          {courses && shown.length === 0 && (
            <div className="hk-card p-12 text-center text-[#8a8a90]"><div className="text-[40px] mb-2">🧑‍🎓</div>正在加载你的课程…<div className="text-[12px] mt-1">还没有课程？去 <button onClick={() => nav('/marketplace')} className="underline">课程集市</button> 挑一门，或在首页打造一门</div></div>
          )}
          {shown.map((c) => {
            const isNew = Date.now() - new Date(c.createdAt).getTime() < 12 * 3600e3
            return (
              <button key={c.courseUuid} onClick={() => nav(`/course/${c.courseUuid}`)} className="hk-card w-full text-left p-4 grid gap-4 items-center hover:shadow-md transition-shadow" style={{ gridTemplateColumns: '1fr 160px 180px' }}>
                <div className="min-w-0">
                  <div className="text-[11px] text-[#8a8a90]">课程名称</div>
                  <div className="flex items-center gap-2"><span className="hk-title-serif text-[18px] truncate">{c.courseTitle}</span>{isNew && <span title="This course was added in the last 12 hours." className="text-[10px] px-1.5 py-0.5 rounded-full bg-[#dbeafe] text-[#1d4ed8] font-medium">新</span>}</div>
                  <div className="grid grid-cols-2 gap-3 mt-3 text-[12px]"><div><div className="text-[#8a8a90]">来源</div><div>由 betterknow 设计</div></div><div><div className="text-[#8a8a90]">添加日期</div><div>{fmtDate(c.createdAt)}</div></div></div>
                  <div className="mt-3 flex items-center gap-2"><div className="flex-1 h-1.5 rounded-full bg-[#f1f2f4] overflow-hidden"><div className="h-full rounded-full bg-[#0a0a0a]" style={{ width: `${c.progress ?? 0}%` }} /></div><span className="text-[11px] text-[#8a8a90]">{c.progress ?? 0}%</span></div>
                </div>
                <div className="rounded-xl overflow-hidden bg-[#eef0f6]" style={{ aspectRatio: '4/3' }}><img src={c.coverImageUrl} alt="" className="w-full h-full object-contain p-3 mix-blend-multiply" /></div>
                <div className="text-[12px] self-start"><div className="text-[#8a8a90]">接下来</div><div className="mt-1 inline-block text-[10px] px-1.5 py-0.5 rounded bg-[#f1f2f4] text-[#6b6b70]">讲座</div><div className="text-[13px] font-medium mt-1 line-clamp-2">{c.nextItem?.title ?? c.nextItem?.unitTitle ?? '第一讲'}</div>
                  <div className="flex gap-1 mt-3"><span className="hk-icon-btn h-7 w-7" aria-label="Share course"><Share2 size={12} /></span><span className="hk-icon-btn h-7 w-7" aria-label="More course actions"><MoreHorizontal size={12} /></span></div></div>
              </button>
            )
          })}
        </div>
        </div>
      </section>

      <aside className="courses-aside">
        <div className="courses-side-card courses-learning-card">
          <div className="flex items-center justify-between text-[12px] text-[#8a8c93]">
            <span className="courses-learning-eyebrow">本周学习概览</span>
            {stats && stats.streak_days > 0 && (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#ea580c] bg-[#fff7ed] px-2 py-0.5 rounded-full border border-[#fed7aa]">
                🔥 连胜 {stats.streak_days} 天
              </span>
            )}
          </div>
          <div className="text-[18px] font-semibold mt-2">
            已学 <span className="text-[24px] text-[#0a0a0a] font-bold">{stats?.completed_sessions ?? 0}</span> 个 session
          </div>
          <p className="text-[12px] text-[#8a8a90] mt-1">
            累计学习 {stats?.minutes_learned ?? 0} 分钟 · 完成任意随堂练习即刻点亮连胜
          </p>
          <div className="grid grid-cols-7 gap-1.5 mt-3">
            {(stats?.daily_activity ?? WEEK.map((w, i) => ({ day: w, dayIdx: i, sessions: 0, minutes: 0, active: false }))).map((act, i) => {
              const isToday = i === 6 || act.dayIdx === today
              const hasLearned = act.sessions > 0 || act.active
              return (
                <div
                  key={act.day + i}
                  title={`${act.day}：${act.sessions} 节 (${act.minutes} 分钟)`}
                  className={`h-10 rounded-lg border text-[11px] flex flex-col items-center justify-center transition-all ${
                    isToday
                      ? 'bg-[#0a0a0a] text-white border-black font-semibold'
                      : hasLearned
                      ? 'bg-[#f0fdf4] text-[#16a34a] border-[#bbf7d0] font-medium'
                      : 'bg-white text-[#8a8a90] border-[#e4e4e7]'
                  }`}
                >
                  <span>{act.day}</span>
                  <span
                    className={`w-1.5 h-1.5 rounded-full mt-0.5 ${
                      isToday ? 'bg-[#38bdf8]' : hasLearned ? 'bg-[#16a34a]' : 'bg-transparent'
                    }`}
                  />
                </div>
              )
            })}
          </div>
          <div className="text-[12px] text-[#8a8a90] mt-4">从上次学到的地方继续</div>
          {first ? (
            <button
              onClick={() => nav(`/course/${first.courseUuid}`)}
              className="mt-2 w-full text-left rounded-xl border p-3 hover:bg-[#fafafa] transition-colors"
            >
              <div className="text-[13px] font-semibold truncate">{first.courseTitle}</div>
              <div className="text-[12px] text-[#8a8a90] mt-0.5">
                下一讲：{first.nextItem?.title ?? '第一讲'}
              </div>
            </button>
          ) : (
            <div className="mt-2 text-[12px] text-[#8a8a90]">暂无进行中的课程</div>
          )}
        </div>
        <div className="hk-card p-4">
          <div className="flex items-center justify-between"><span className="text-[14px] font-semibold">课程市场</span><button onClick={() => nav('/marketplace')} className="text-[12px] text-[#6b6b70] inline-flex items-center gap-0.5">查看更多 <ExternalLink size={11} /></button></div>
          <div className="text-[12px] text-[#8a8a90] mt-0.5">由 betterknow 精心策划的课程</div>
          <ul className="mt-3 space-y-2">{recs.map((c) => (
            <li key={c.marketplaceId} className="flex items-center gap-3 rounded-xl border p-2"><div className="h-11 w-11 rounded-lg bg-[#eef0f6] overflow-hidden shrink-0"><img src={c.coverImageUrl} alt="" className="w-full h-full object-contain p-1 mix-blend-multiply" /></div><div className="flex-1 min-w-0"><div className="text-[13px] font-medium truncate">{c.courseTitle}</div><div className="text-[11px] text-[#8a8a90]">betterknow 官方 · ★ {(c.rating ?? 4.5).toFixed(1)}</div></div><button onClick={() => nav(`/marketplace/${c.marketplaceId}/preview`)} className="hk-pill h-7 text-[12px] px-2.5">预览</button></li>
          ))}</ul>
        </div>
      </aside>
      </div>
      </div>
    </div>
  )
}
