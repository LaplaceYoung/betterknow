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

// [S24] 课程票根：数值对齐线上 .course-ticket（标题 17.3/22.144 w600 #0F1F33、描述 12.75 w500 #6F7485、
// 信息标签 10.8 w500 bg#F3F3F2 radius999 padding 3.5px 11px、科目标签 12 w600 #4C6696 bg#EEF2F8 radius6）
export function CourseCard({ c, compact = false }: { c: MarketplaceCourse; compact?: boolean }) {
  const nav = useNavigate()
  const tint = TINTS[c.ticketVariant % TINTS.length]
  const go = () => nav(c.enrolled && c.enrolledCourseUuid ? `/course/${c.enrolledCourseUuid}` : `/marketplace/${c.marketplaceId}/preview`)
  return (
    <button onClick={go} className="hk-card text-left overflow-hidden flex flex-col group hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(0,0,0,.06)] transition-all">
      <div className="relative" style={{ background: tint, aspectRatio: compact ? '16 / 9' : '4 / 3' }}>
        <img src={c.coverImageUrl} alt="" className="absolute inset-0 w-full h-full object-contain p-4 mix-blend-multiply" loading="lazy" />
        {c.enrolled && <span className="absolute left-3 top-3" style={{ fontSize: 10.5, fontWeight: 700, color: '#fff', background: '#2f7a5c', borderRadius: 8, padding: '4px 9px' }}>已报名</span>}
      </div>
      <div className="flex flex-col flex-1" style={{ padding: 14, gap: 8 }}>
        <div className="flex items-center" style={{ gap: 6 }}>
          <span className="inline-block" style={{ width: 18, height: 18, borderRadius: 4, background: '#0f1f33' }} />
          <span style={{ fontSize: 12.6, lineHeight: '15.12px', fontWeight: 600, color: '#0f1f33' }}>betterknow Learning Lab</span>
          <BadgeCheck size={13} style={{ color: '#4c6696' }} />
        </div>
        <h3 className="line-clamp-2" style={{ fontSize: 17.3, lineHeight: '22.144px', fontWeight: 600, color: '#0f1f33' }}>{c.courseTitle}</h3>
        {!compact && <p className="line-clamp-2" style={{ fontSize: 12.75, lineHeight: '17.2125px', fontWeight: 500, color: '#6f7485' }}>{c.courseDescription}</p>}
        <div className="flex items-center flex-wrap" style={{ gap: 8, marginTop: 'auto', paddingTop: 4 }}>
          <span style={{ fontSize: 10.8, lineHeight: '12.96px', fontWeight: 500, color: '#0f1f33', background: '#f3f3f2', borderRadius: 999, padding: '3.5px 11px' }}>{levelOf(c)}</span>
          <span className="inline-flex items-center" style={{ gap: 4, fontSize: 12.75, fontWeight: 500, color: '#878787' }}><Clock size={12} />{c.sessionCount} 课时</span>
          <span className="inline-flex items-center" style={{ gap: 4, fontSize: 12.75, fontWeight: 500, color: '#878787' }}>
            <Users size={12} /><b style={{ fontWeight: 700, color: '#4c6696' }}>{c.joinCount.toLocaleString()}</b> 人已加入
          </span>
          <span className="inline-flex items-center ml-auto" style={{ gap: 4 }}><Star size={13} style={{ color: '#f59e0b', fill: '#f59e0b' }} /><b style={{ fontSize: 12.75, fontWeight: 700, color: '#1f2a3a' }}>{ratingOf(c)}</b></span>
        </div>
        <div className="flex items-center justify-between pt-2 border-t mt-1">
          <span className="inline-flex flex-col" style={{ gap: 2 }}>
            <span style={{ fontSize: 10, lineHeight: '10px', fontWeight: 600, color: '#9aa1b0' }}>科目</span>
            <span style={{ fontSize: 12, lineHeight: '15px', fontWeight: 600, color: '#4c6696', background: '#eef2f8', border: '0.6px solid #e0e6ef', borderRadius: 6, padding: '3px 8px' }}>{SUBJECT_LABEL[c.subject] ?? '通识'}</span>
          </span>
          <span className="flex items-center justify-center" style={{ width: 32, height: 32, borderRadius: '50%', background: '#4c6696', color: '#fff' }}>
            <ArrowRight size={13} />
          </span>
        </div>
      </div>
    </button>
  )
}