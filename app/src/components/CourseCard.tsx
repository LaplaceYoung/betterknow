import { useEffect, useRef, useState } from 'react'
import { ArrowRight, BadgeCheck, Users, Star, Clock, Check } from 'lucide-react'
import { useNavigate } from 'react-router'
import type { MarketplaceCourse } from '@/lib/api'

export const SUBJECT_LABEL: Record<string, string> = {
  examPrep: '考试备考', math: '数学与统计', computerScience: '计算机科学', aiDataScience: 'AI 与数据科学',
  science: '自然科学', business: '商业与经济', psychology: '心理学', philosophy: '哲学', socialScience: '社会科学', communication: '沟通与表达',
}
export const SUBJECT_ORDER = ['examPrep', 'math', 'computerScience', 'aiDataScience', 'science', 'business', 'psychology', 'philosophy', 'socialScience', 'communication']
const LEVEL_LABEL: Record<string, string> = { entry: '入门', advanced: '进阶', expert: '高阶' }

export function levelOf(c: MarketplaceCourse): string { return LEVEL_LABEL[c.level ?? ''] ?? (c.sessionCount <= 45 ? '入门' : c.sessionCount <= 90 ? '进阶' : '高阶') }
export function ratingOf(c: MarketplaceCourse): string { return (c.rating ?? 4.5).toFixed(1) }

// 票根签缝位置：线上 .course-ticket 的 --course-ticket-seam-y 是按内容算出来的（样式表默认 74.9%，
// 单行标题实测 80.98%）。这里同样按「副本文案自然高度」测一次再定，避免拍一个常数。
const SEAM_MIN = 0.7
const SEAM_MAX = 0.86
const COPY_TOP = 0.365

// [S24] 课程票根：几何按线上 .course-ticket 的 mask（viewBox 218×326、两段 rx14 圆角矩形、
// 签缝 y 处 13 个 r5 打孔、纸色 #FFFFFC、drop-shadow 0 4px 4px rgba(0,0,0,.06)），
// 文案区 top 36.5%/左右 8%，存根区 top=签缝/左右 7%（stub 标签 10px #9AA1B0、值 14px #1F2A3A、
// 科目标签 #EEF2F8 + #E0E6EF、圆形加入键 32px #4C6696）。
export function CourseCard({ c }: { c: MarketplaceCourse }) {
  const nav = useNavigate()
  const ticketRef = useRef<HTMLDivElement>(null)
  const copyRef = useRef<HTMLDivElement>(null)
  const [seam, setSeam] = useState<number | null>(null)
  const goesToCourse = Boolean(c.enrolled && c.enrolledCourseUuid)
  const go = () => nav(goesToCourse ? `/course/${c.enrolledCourseUuid}` : `/marketplace/${c.marketplaceId}/preview`)

  useEffect(() => {
    const host = ticketRef.current
    const copy = copyRef.current
    if (!host || !copy) return
    const measure = () => {
      const h = host.getBoundingClientRect().height
      if (!h) return
      const natural = COPY_TOP * h + copy.getBoundingClientRect().height + h * 0.03
      setSeam(Math.min(SEAM_MAX, Math.max(SEAM_MIN, natural / h)))
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(host)
    ro.observe(copy)
    return () => ro.disconnect()
  }, [])

  // 签缝 y 用 218×326 的坐标系表达，mask 与背景共用一个 id
  const seamY = Math.round(326 * (seam ?? 0.749))
  const holes = []
  for (let cx = 31; cx <= 185; cx += 14) holes.push(cx)
  const maskId = `course-ticket-mask-${c.marketplaceId}`

  return (
    <button onClick={go} className="mktp-ticket-wrap" aria-label={c.courseTitle} data-testid="course-ticket">
      <div ref={ticketRef} className="course-ticket" style={{ ['--course-ticket-seam-y' as string]: `${((seam ?? 0.749) * 100).toFixed(3)}%` }}>
        <svg className="course-ticket-mask-svg" viewBox="0 0 218 326" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <mask id={maskId} maskUnits="userSpaceOnUse">
              <rect width="218" height="326" fill="black" />
              <rect x="0" y="0" width="218" height={seamY} rx="14" fill="white" />
              <rect x="0" y={seamY} width="218" height={326 - seamY} rx="14" fill="white" />
              {holes.map((cx) => <circle key={cx} cx={cx} cy={seamY} r="5" fill="black" />)}
              <circle cx="109" cy="326" r="10" fill="black" />
            </mask>
          </defs>
          <rect width="218" height="326" fill="#FFFFFC" mask={`url(#${maskId})`} />
        </svg>

        <div className="course-ticket-content">
          {c.enrolled && (
            <span className="course-ticket-enrolled-check"><Check size={11} />已加入</span>
          )}
          <div ref={copyRef} className="course-ticket-copy" style={seam === null ? { bottom: 'auto' } : undefined}>
            <div className="course-ticket-main-copy">
              <div className="course-ticket-author">
                <span className="course-ticket-author-logo" aria-hidden="true" />
                <span className="course-ticket-author-name">betterknow Learning Lab</span>
                <span className="course-ticket-author-verified" aria-label="官方精编" title="官方精编"><BadgeCheck size={15} style={{ color: '#4c6696' }} /></span>
              </div>
              <h3 className="course-ticket-title">{c.courseTitle}</h3>
              <p className="course-ticket-description">{c.courseDescription}</p>
              <div className="course-ticket-info-tags">
                <span className="course-ticket-info-tag">{levelOf(c)}</span>
                <span className="course-ticket-info-tag">{c.sessionCount} 课时</span>
                <span className="course-ticket-explorers">
                  <span className="course-ticket-explorers-icon" aria-hidden="true"><Users size={13} /></span>
                  <span className="course-ticket-explorers-text"><b className="course-ticket-explorers-count">{c.joinCount.toLocaleString()}</b> 人已加入</span>
                </span>
              </div>
              <div className="course-ticket-meta">
                <span className="course-ticket-rating">
                  <span className="course-ticket-rating-icon" aria-hidden="true"><Star size={12} style={{ color: '#f59e0b', fill: '#f59e0b' }} /></span>
                  <span className="course-ticket-rating-value">{ratingOf(c)}</span>
                </span>
                <span className="inline-flex items-center" style={{ gap: 4, fontSize: 12.75, fontWeight: 500, color: '#878787' }}>
                  <Clock size={12} />{c.sessionCount} 节
                </span>
              </div>
            </div>
          </div>

          <div className="course-ticket-footer">
            <div className="course-ticket-stub-info">
              <div className="course-ticket-stub-item">
                <span className="course-ticket-stub-label">科目</span>
                <span className="course-ticket-stub-value">{SUBJECT_LABEL[c.subject ?? ''] ?? '综合'}</span>
              </div>
            </div>
            <span className="course-ticket-enroll-button" aria-hidden="true"><ArrowRight size={13} /></span>
          </div>
        </div>
      </div>
    </button>
  )
}
