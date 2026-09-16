import { useEffect, useMemo, useState, useRef } from 'react'
import { useNavigate } from 'react-router'
import { Search, Flame, ChevronDown, Clock, Check, SlidersHorizontal } from 'lucide-react'
import { CourseCard, SUBJECT_LABEL, SUBJECT_ORDER, levelOf } from '@/components/CourseCard'
import { apiGet, type MarketplaceCourse } from '@/lib/api'

const TINTS = ['linear-gradient(160deg,#e7e9dc,#cfd3c0)', 'linear-gradient(160deg,#f1ecd3,#e0d7b0)', 'linear-gradient(160deg,#dfe3f0,#c7cde3)', 'linear-gradient(160deg,#e3ede6,#c8dccf)', 'linear-gradient(160deg,#f0e1e1,#e0c9c9)', 'linear-gradient(160deg,#e2e8f0,#c9d4e3)']

type SortOption = 'recommended' | 'rating' | 'popular' | 'sessions_asc' | 'sessions_desc'
const SORT_LABELS: Record<SortOption, string> = {
  recommended: '推荐排序',
  rating: '最高评分',
  popular: '最多人学',
  sessions_asc: '课时由少到多',
  sessions_desc: '课时由多到少',
}

export default function Marketplace() {
  const nav = useNavigate()
  const [all, setAll] = useState<MarketplaceCourse[]>([])
  const [subject, setSubject] = useState<string>('all')
  const [list, setList] = useState<MarketplaceCourse[] | null>(null)
  const [q, setQ] = useState('')
  const [sort, setSort] = useState<SortOption>('recommended')
  const [level, setLevel] = useState<'all' | 'entry' | 'advanced' | 'expert'>('all')
  const [sortOpen, setSortOpen] = useState(false)
  const sortRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setSortOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => { apiGet<{ courses: MarketplaceCourse[] }>('/marketplace/courses').then((r) => setAll(r.courses)).catch(() => {}) }, [])
  // [B5] 科目筛选为服务端查询
  useEffect(() => {
    setList(null)
    const path = subject === 'all' ? '/marketplace/courses' : `/marketplace/courses?subject=${encodeURIComponent(subject)}`
    apiGet<{ courses: MarketplaceCourse[] }>(path).then((r) => setList(r.courses)).catch(() => setList([]))
  }, [subject])

  const featured = useMemo(() => all.slice(0, 6), [all])
  const subjects = useMemo(() => SUBJECT_ORDER.filter((s) => all.some((c) => c.subject === s)), [all])

  const shown = useMemo(() => {
    let result = (list ?? []).filter(
      (c) =>
        !q ||
        c.courseTitle.toLowerCase().includes(q.toLowerCase()) ||
        c.courseDescription.toLowerCase().includes(q.toLowerCase())
    )
    if (level !== 'all') {
      result = result.filter((c) => {
        const lvl = levelOf(c)
        if (level === 'entry') return lvl === '入门'
        if (level === 'advanced') return lvl === '进阶'
        if (level === 'expert') return lvl === '高阶'
        return true
      })
    }
    const cloned = [...result]
    if (sort === 'rating') {
      cloned.sort((a, b) => (b.rating ?? 4.5) - (a.rating ?? 4.5))
    } else if (sort === 'popular') {
      cloned.sort((a, b) => b.joinCount - a.joinCount)
    } else if (sort === 'sessions_asc') {
      cloned.sort((a, b) => a.sessionCount - b.sessionCount)
    } else if (sort === 'sessions_desc') {
      cloned.sort((a, b) => b.sessionCount - a.sessionCount)
    }
    return cloned
  }, [list, q, level, sort])

  return (
    <div className="mx-auto max-w-[1180px] px-8 pb-16">
      <h1 className="text-center text-[30px] font-semibold leading-tight mt-2">发现<span className="hk-title-serif">最适合你的</span>课程<br /><span className="text-[26px]">专为你的学习方式打造。</span></h1>
      <div className="mt-5 flex justify-center">
        <label className="inline-flex items-center"
          style={{ gap: 8, width: 460, maxWidth: '100%', height: 46, padding: '0 20px', border: '1px solid #ECEAE6', borderRadius: 999, background: '#fff', color: '#8a8a8a', boxShadow: '0 1px 2px rgba(20,20,20,.04)' }}>
          <Search size={16} color="#8a8a8a" />
          <input value={q} onChange={(e) => setQ(e.target.value)} aria-label="搜索课程…" placeholder="在 Marketplace 中搜索课程"
            className="flex-1 bg-transparent outline-none" style={{ fontSize: 13, color: '#3d3d3f' }} />
        </label>
      </div>

      {/* [D4] 热门 · 编辑精选 */}
      <section className="mt-8">
        <div className="flex items-center" style={{ gap: 10, marginBottom: 14 }}>
          <span className="inline-flex items-center"
            style={{ alignItems: 'center', fontSize: 11, fontWeight: 700, letterSpacing: '.08em', color: '#465366', background: 'linear-gradient(180deg,#f8fafc,#e4e8ef)', border: '1px solid #CBD2DC', borderBottom: '4px solid #9AA6B8', borderRadius: 999, padding: '4px 12px 2px' }}>FEATURED</span>
          <h2 className="m-0" style={{ fontSize: 18, fontWeight: 700, color: '#1a1a1a' }}>编辑精选</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gridTemplateRows: '234px 190px', gap: 14 }}>
          {featured.length === 0 && Array.from({ length: 6 }).map((_, i) => <div key={i} className="hk-featured-skeleton" style={{ gridColumn: i === 0 ? "1 / 7" : i === 1 ? "7 / 10" : i === 2 ? "10 / 13" : i === 3 ? "7 / 9" : i === 4 ? "9 / 11" : "11 / 13", gridRow: i === 0 ? "1 / 3" : i <= 2 ? "1 / 2" : "2 / 3" }} />)}
          {featured.map((c, i) => {
            const big = i === 0
            // 线上 .mktp-featured-card:nth-child(n)：1 大卡 1/7×1/3，2-3 中卡 7/10、10/13，4-6 小卡 7/9、9/11、11/13
            const place = [{ gridColumn: '1 / 7', gridRow: '1 / 3' }, { gridColumn: '7 / 10', gridRow: '1 / 2' }, { gridColumn: '10 / 13', gridRow: '1 / 2' },
              { gridColumn: '7 / 9', gridRow: '2 / 3' }, { gridColumn: '9 / 11', gridRow: '2 / 3' }, { gridColumn: '11 / 13', gridRow: '2 / 3' }][i] ?? {}
            const span = ''
            return (
              <button key={c.marketplaceId} onClick={() => nav(`/marketplace/${c.marketplaceId}/preview`)}
                className="relative overflow-hidden text-left group hover:-translate-y-0.5 transition-transform"
                style={{ background: '#edebe8', borderRadius: 18, ...place }}>
                <img src={c.coverImageUrl} alt="" className="absolute inset-0 w-full h-full object-contain p-6 mix-blend-multiply opacity-90" loading="lazy" />
                <div className="absolute inset-0 flex flex-col justify-end text-white"
                  style={{ gap: big ? 8 : 6, padding: big ? '22px 24px' : '14px 16px', background: 'linear-gradient(180deg,#0a0c1400 35%,#0a0c14c7)' }}>
                  <div className="flex items-center" style={{ flexWrap: 'wrap', gap: 5, marginBottom: 2 }}><span style={{ padding: '3px 9px', borderRadius: 999, background: 'rgba(255,255,255,.16)', border: '1px solid rgba(255,255,255,.32)', backdropFilter: 'blur(3px)', fontSize: 11 }}>{levelOf(c)}</span><span className="px-1.5 py-0.5 rounded bg-white/20 backdrop-blur inline-flex items-center gap-1"><Clock size={9} />{c.sessionCount} 课时</span></div>
                  <div style={big
                    ? { fontSize: 24, lineHeight: 1.25, fontWeight: 700, color: '#fff', textShadow: '0 1px 6px rgba(0,0,0,.25)' }
                    : { fontSize: i <= 2 ? 15 : 12.5, lineHeight: 1.25, fontWeight: 700, color: '#fff', textShadow: '0 1px 6px rgba(0,0,0,.25)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{c.courseTitle}</div>
                  {big && <p className="line-clamp-2" style={{ margin: 0, maxWidth: 560, fontSize: 13.5, lineHeight: 1.45, color: 'rgba(255,255,255,.88)' }}>{c.courseDescription}</p>}
                </div>
              </button>
            )
          })}
        </div>
      </section>

      {/* [D5] 科目 tabs */}
      <div role="tablist" className="flex items-center gap-1 mt-8 border-b overflow-x-auto hk-scroll">
        {['all', ...subjects].map((s) => (
          <button key={s} role="tab" aria-selected={subject === s} onClick={() => setSubject(s)}
            className="relative whitespace-nowrap text-[#6b6b70] data-[on=true]:text-[#1a1a1a] data-[on=true]:font-bold" style={{ fontSize: 14, lineHeight: '21px', fontWeight: 700, padding: '7px 2px 14px' }} data-on={subject === s}>
            {s === 'all' ? '全部' : SUBJECT_LABEL[s]}
            {subject === s && <span className="absolute left-1 right-1 -bottom-px h-[2px] bg-black rounded-full" />}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between mt-5 mb-4 flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <h2 className="text-[16px] font-semibold">
            {subject === 'all' ? '全部课程' : SUBJECT_LABEL[subject]}
            <span className="text-[12px] text-[#8a8a90] font-normal ml-1.5">
              {list ? `${shown.length} 门课程` : ''}
            </span>
          </h2>

          {/* Level Filter Tabs */}
          <div className="flex items-center gap-1 bg-[#f4f4f5] p-0.5 rounded-lg text-[12px]">
            {([
              ['all', '全部难度'],
              ['entry', '入门'],
              ['advanced', '进阶'],
              ['expert', '高阶'],
            ] as const).map(([lvl, label]) => (
              <button
                key={lvl}
                onClick={() => setLevel(lvl)}
                className={`px-2.5 py-1 rounded-md transition-all ${
                  level === lvl ? 'bg-white shadow-xs font-medium text-black' : 'text-[#71717a] hover:text-black'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Sort Dropdown */}
        <div ref={sortRef} className="relative">
          <button
            onClick={() => setSortOpen((o) => !o)}
            className="hk-pill text-[12px] h-8 px-3 inline-flex items-center gap-1.5 hover:bg-[#f1f2f4]"
          >
            <SlidersHorizontal size={12} className="text-[#71717a]" />
            排序：<span className="font-medium text-black">{SORT_LABELS[sort]}</span>
            <ChevronDown size={12} className="text-[#8a8a90]" />
          </button>

          {sortOpen && (
            <div className="absolute right-0 top-full mt-1.5 w-36 rounded-xl border bg-white p-1 shadow-lg z-20 hk-pop text-[12px]">
              {(Object.keys(SORT_LABELS) as SortOption[]).map((opt) => (
                <button
                  key={opt}
                  onClick={() => {
                    setSort(opt)
                    setSortOpen(false)
                  }}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between transition-colors ${
                    sort === opt ? 'bg-[#f4f4f5] font-semibold text-black' : 'text-[#52525b] hover:bg-[#fafafa]'
                  }`}
                >
                  <span>{SORT_LABELS[opt]}</span>
                  {sort === opt && <Check size={12} className="text-black" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mx-auto" style={{ maxWidth: 1160, display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 24 }}>
        {list === null && Array.from({ length: 8 }).map((_, i) => <div key={i} className="hk-ticket-skeleton" />)}
        {shown.map((c) => <CourseCard key={c.marketplaceId} c={c} />)}
        {list && shown.length === 0 && <div className="col-span-4 text-center text-[#8a8a90] py-16">没有匹配的课程</div>}
      </div>
    </div>
  )
}
