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
      <div className="mx-auto mt-5 max-w-[560px]">
        <label className="flex items-center gap-2 h-11 px-4 rounded-full border bg-white shadow-sm focus-within:shadow-md">
          <Search size={16} className="text-[#8a8a90]" />
          <input value={q} onChange={(e) => setQ(e.target.value)} aria-label="搜索课程…" placeholder="在 Marketplace 中搜索课程" className="flex-1 bg-transparent outline-none text-[14px]" />
        </label>
      </div>

      {/* [D4] 热门 · 编辑精选 */}
      <section className="mt-8">
        <h2 className="flex items-center gap-2 text-[15px] font-semibold mb-3"><span className="text-[11px] px-1.5 py-0.5 rounded bg-[#fee2e2] text-[#dc2626] inline-flex items-center gap-1"><Flame size={11} />热门</span> 编辑精选</h2>
        <div className="grid grid-cols-12 grid-rows-2 gap-3" style={{ height: 330 }}>
          {featured.length === 0 && <div className="col-span-12 hk-skeleton rounded-2xl" />}
          {featured.map((c, i) => {
            const big = i === 0
            const span = big ? 'col-span-6 row-span-2' : i <= 2 ? 'col-span-3' : 'col-span-2'
            return (
              <button key={c.marketplaceId} onClick={() => nav(`/marketplace/${c.marketplaceId}/preview`)}
                className={`relative overflow-hidden rounded-2xl text-left group hover:-translate-y-0.5 transition-transform ${span}`}
                style={{ background: TINTS[i % TINTS.length] }}>
                <img src={c.coverImageUrl} alt="" className="absolute inset-0 w-full h-full object-contain p-6 mix-blend-multiply opacity-90" loading="lazy" />
                <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/60 to-transparent text-white">
                  <div className="flex items-center gap-1.5 text-[10px] mb-1"><span className="px-1.5 py-0.5 rounded bg-white/20 backdrop-blur">{levelOf(c)}</span><span className="px-1.5 py-0.5 rounded bg-white/20 backdrop-blur inline-flex items-center gap-1"><Clock size={9} />{c.sessionCount} 课时</span></div>
                  <div className={`hk-title-serif ${big ? 'text-[20px]' : 'text-[13px]'} leading-tight`}>{c.courseTitle}</div>
                  {big && <p className="text-[12px] text-white/80 line-clamp-2 mt-1">{c.courseDescription}</p>}
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
            className="relative px-3 h-10 text-[13px] whitespace-nowrap text-[#6b6b70] data-[on=true]:text-black data-[on=true]:font-medium" data-on={subject === s}>
            {s === 'all' ? '全部' : SUBJECT_LABEL[s]}
            {subject === s && <span className="absolute left-3 right-3 -bottom-px h-0.5 bg-black rounded-full" />}
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

      <div className="grid grid-cols-4 gap-4">
        {list === null && Array.from({ length: 8 }).map((_, i) => <div key={i} className="hk-skeleton rounded-2xl h-[360px]" />)}
        {shown.map((c) => <CourseCard key={c.marketplaceId} c={c} />)}
        {list && shown.length === 0 && <div className="col-span-4 text-center text-[#8a8a90] py-16">没有匹配的课程</div>}
      </div>
    </div>
  )
}
