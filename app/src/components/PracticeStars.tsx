import type { CSSProperties } from 'react'

// 线上 PracticeStars-DY5xk-t2.js 的逐字搬运：
//   <PracticeStars stars size=12 animate className label />
//   星星 12px（可传 size）、实心 fill #E8B54B / stroke #C98A1E、空心 stroke #D4D4D4、
//   带动画时每颗延迟 140 + 200*i ms、role="img" 且 aria-label 默认 "{n} of 3 stars"
export function PracticeStars({ stars, size = 12, animate = false, className, label }: {
  stars: number
  size?: number
  animate?: boolean
  className?: string
  label?: string
}) {
  const n = Math.max(0, Math.min(3, Math.round(stars)))
  return (
    <span className={`practice-stars${animate ? ' practice-stars--animate' : ''}${className ? ` ${className}` : ''}`}
      role="img" aria-label={label ?? `${n} of 3 stars`}>
      {[0, 1, 2].map((r) => {
        const filled = r < n
        return (
          <svg key={r} className="practice-stars-star" width={size} height={size} viewBox="0 0 24 24"
            style={animate ? ({ animationDelay: `${140 + 200 * r}ms` } as CSSProperties) : undefined} aria-hidden="true">
            <path d="M12 2.6l2.9 5.9 6.5.95-4.7 4.6 1.1 6.5L12 17.5l-5.8 3.05 1.1-6.5-4.7-4.6 6.5-.95z"
              fill={filled ? '#E8B54B' : 'none'} stroke={filled ? '#C98A1E' : '#D4D4D4'} strokeWidth="1.4" strokeLinejoin="round" />
          </svg>
        )
      })}
    </span>
  )
}

// 线上 CourseJourneyPage 里的练习状态机 Fe()：notStarted → inProgress → done → rated/retry（按星级）
export type PracticeState = 'notStarted' | 'inProgress' | 'done' | 'rated' | 'retry'

export function practiceState(stat?: { started?: boolean; finished?: boolean; stars?: number } | null): { state: PracticeState; stars: number } {
  if (!stat || !stat.started) return { state: 'notStarted', stars: 0 }
  if (!stat.finished) return { state: 'inProgress', stars: 0 }
  if (stat.stars === undefined) return { state: 'done', stars: 0 }
  const stars = Math.max(0, Math.min(3, stat.stars))
  return { state: stars > 0 ? 'rated' : 'retry', stars }
}
