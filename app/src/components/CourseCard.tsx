import { ArrowRight, BadgeCheck, Users, Star, Clock } from 'lucide-react'
import { useNavigate } from 'react-router'
import type { MarketplaceCourse } from '@/lib/api'

export const SUBJECT_LABEL: Record<string, string> = {
  examPrep: '考试备考', math: '数学与统计', computerScience: '计算机科学', aiDataScience: 'AI 与数据科学',
  science: '自然科学', business: '商业与经济', psychology: '心理学', philosophy: '哲学', socialScience: '社会科学', communication: '表达与写作',
}
export const SUBJECT_ORDER = ['examPrep', 'math', 'computerScience', 'aiDataScience', 'science', 'business', 'psychology', 'philosophy', 'socialScience', 'communication']
const LEVEL_LABEL: Record<string, string> = { entry: '入门', advanced: '进阶', expert: '高阶' }

// 封面底色按 ticketVariant 轮换（原站封面卡为浅色插画底）
const TINTS = ['#eef0e6', '#f5f1de', '#e9ecf5', '#e7efe9', '#f3e8e8', '#e8eef4']

export function levelOf(c: MarketplaceCourse): string { return LEVEL_LABEL[c.level ?? ''] ?? (c.sessionCount <= 45 ? '入门' : c.sessionCount <= 70 ? '进阶' : '高阶') }
export function ratingOf(c: MarketplaceCourse): string { return (c.rating ?? 4.5).toFixed(1) }

export function CourseCard({ c, compact = false }: { c: MarketplaceCourse; compact?: boolean }) {
  const nav = useNavigate()
  const tint = TINTS[c.ticketVariant % TINTS.length]
  const go = () => nav(c.enrolled && c.enrolledCourseUuid ? `/course/${c.enrolledCourseUuid}` : `/marketplace/${c.marketplaceId}/preview`)
  return (
    <button onClick={go} className="hk-card text-left overflow-hidden flex flex-col group hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(0,0,0,.08)] transition-all" aria-label={c.courseTitle}>
      <div className="relative" style={{ background: tint, aspectRatio: compact ? '16 / 9' : '4 / 3' }}>
        <img src={c.coverImageUrl} alt="" className="absolute inset-0 w-full h-full object-contain p-4 mix-blend-multiply" loading="lazy" />
        {c.enrolled && <span className="absolute left-3 top-3 text-[11px] px-2 py-0.5 rounded-full bg-[#dcfce7] text-[#15803d] font-medium">已报名</span>}
      </div>
      <div className="p-4 flex flex-col gap-2 flex-1">
        <div className="flex items-center gap-1.5 text-[12px] text-[#6b6b70]">
          <span className="inline-block h-4 w-4 rounded-full bg-[#0a0a0a]" />
          <span>betterknow Learning Lab</span>
          <BadgeCheck size={13} className="text-[#2563eb]" />
        </div>
        <h3 className="hk-title-serif text-[17px] leading-snug">{c.courseTitle}</h3>
        {!compact && <p className="text-[12px] text-[#6b6b70] line-clamp-2 leading-5">{c.courseDescription}</p>}
        <div className="flex items-center gap-1.5 text-[11px] text-[#3d3d3f] mt-auto pt-1 whitespace-nowrap">
          <span className="px-1.5 py-0.5 rounded-md bg-[#f1f2f4]">{levelOf(c)}</span>
          <span className="px-1.5 py-0.5 rounded-md bg-[#f1f2f4] inline-flex items-center gap-1"><Clock size={11} />{c.sessionCount} 课时</span>
          <span className="inline-flex items-center gap-1 text-[#6b6b70] truncate"><Users size={11} />{c.joinCount.toLocaleString()} 人已加入</span>
          <span className="ml-auto inline-flex items-center gap-1"><Star size={12} className="fill-[#f59e0b] text-[#f59e0b]" />{ratingOf(c)}</span>
        </div>
        <div className="flex items-center justify-between pt-2 border-t mt-1">
          <div className="text-[11px] text-[#8a8a90]">科目 <span className="ml-1 px-1.5 py-0.5 rounded-md bg-[#eef2ff] text-[#3b5bdb] text-[11px]">{SUBJECT_LABEL[c.subject] ?? c.subject}</span></div>
          <span className="h-7 w-7 rounded-full border flex items-center justify-center group-hover:bg-[#0a0a0a] group-hover:text-white group-hover:border-[#0a0a0a] transition-colors"><ArrowRight size={14} /></span>
        </div>
      </div>
    </button>
  )
}
