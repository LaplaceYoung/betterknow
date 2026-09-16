import { Fragment, useEffect, useMemo, useState } from 'react'
import { apiGet, apiPost } from '@/lib/api'

// 线上 CourseJourneyPage 的「加入日历」弹窗（.course-cal-*，四步：时长 → 开始日 → 星期 → 预览）。
// 线上这套文案是**硬编码英文**；本仓按目标做本地化，用中文文案（差异记在 DESIGN_GAPS）。
// 计划在客户端按课程结构生成，确认后 POST /course-calendar/accept {course_uuid, course_title, items}，
// item 形状与线上一致：{course_object_type, course_object_id, title, description, scheduled_for}。
export interface CalCourseItem {
  course_object_type: string
  course_object_id: string
  title: string
  description?: string
}

const DURATION_CHIPS = [7, 14, 30, 60, 90]
const WEEKDAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const WEEKDAY_SHORT = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

export function CourseCalendarModal({ courseUuid, courseTitle, items, alreadyScheduled, onClose, onAccepted }: {
  courseUuid: string
  courseTitle: string
  items: CalCourseItem[]
  alreadyScheduled: boolean
  onClose: () => void
  onAccepted: () => void
}) {
  const [step, setStep] = useState(1)
  const [days, setDays] = useState(14)
  const [customDays, setCustomDays] = useState('')
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [month, setMonth] = useState(() => { const d = new Date(); d.setDate(1); return d })
  const [weekdays, setWeekdays] = useState<Set<number>>(new Set())
  const [busy, setBusy] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const effectiveDays = Math.min(365, Math.max(1, Number(customDays) || days))

  const [dragOverDate, setDragOverDate] = useState<string | null>(null)
  // 线上预览会把「已有任务」一起画出来（ccal-preview-existing），方便看出冲突
  const [existing, setExisting] = useState<Array<{ date: string; title: string; color: string }>>([])
  useEffect(() => {
    void apiGet<{ tasks?: Array<{ title?: string; scheduled_for?: string; type?: string; payload?: { course_id?: string } }> }>('/calendar/list_main_tasks')
      .then((r) => {
        const palette = ['#4C6694', '#6681D6', '#2196F3']
        setExisting((r.tasks ?? [])
          .filter((t) => !(t.type === 'course' && t.payload?.course_id === courseUuid))
          .map((t, index) => {
            const d = new Date(String(t.scheduled_for ?? ''))
            return {
              date: Number.isNaN(d.getTime()) ? '' : `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`,
              title: String(t.title ?? '任务'),
              color: palette[index % palette.length],
            }
          })
          .filter((row) => row.date))
      })
      .catch(() => setExisting([]))
  }, [courseUuid])

  // 把课程条目按天数与星期偏好铺开：只落在选中的星期（未选则每天都可以）
  const layout = useMemo(() => {
    const start = startDate ?? new Date()
    const slots: Date[] = []
    const cursor = new Date(start.getFullYear(), start.getMonth(), start.getDate())
    for (let guard = 0; slots.length < items.length && guard < 400; guard += 1) {
      const offset = Math.floor(guard / 1)
      const day = new Date(cursor.getFullYear(), cursor.getMonth(), cursor.getDate() + offset)
      const elapsed = Math.round((day.getTime() - cursor.getTime()) / 86400000)
      if (elapsed > effectiveDays) break
      if (weekdays.size === 0 || weekdays.has(day.getDay())) slots.push(day)
    }
    // 条目多于可用日期时压缩到同一天，避免丢条目
    return items.map((item, index) => {
      const day = slots[Math.min(index, slots.length - 1)] ?? cursor
      return { ...item, date: `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, '0')}-${String(day.getDate()).padStart(2, '0')}` }
    })
  }, [items, startDate, effectiveDays, weekdays])
  // 第 4 步允许拖拽改期，所以计划本身是可变的：前三步改参数时重排，进入第 4 步后可手工调整
  const [plan, setPlan] = useState(layout)
  const [lastLayout, setLastLayout] = useState(layout)
  if (step < 4 && layout !== lastLayout) { setLastLayout(layout); setPlan(layout) }

  const moveItemToDate = (index: number, date: string) => {
    setPlan((prev) => prev.map((item, i) => (i === index ? { ...item, date } : item)))
  }

  // 预览按周铺成网格（周日打头），与线上 ccal-preview 同形
  const previewWeeks = useMemo(() => {
    const dates = plan.map((p) => p.date).sort()
    const first = dates[0] ? new Date(`${dates[0]}T00:00:00`) : new Date()
    const last = dates[dates.length - 1] ? new Date(`${dates[dates.length - 1]}T00:00:00`) : first
    const start = new Date(first.getFullYear(), first.getMonth(), first.getDate() - first.getDay())
    const weeks: Array<Array<{ date: string; day: number; isToday: boolean }>> = []
    const cursor = new Date(start)
    while (cursor <= last || weeks.length === 0) {
      const week = Array.from({ length: 7 }, (_, i) => {
        const d = new Date(cursor.getFullYear(), cursor.getMonth(), cursor.getDate() + i)
        return { date: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`, day: d.getDate(), isToday: d.toDateString() === new Date().toDateString() }
      })
      weeks.push(week)
      cursor.setDate(cursor.getDate() + 7)
      if (weeks.length > 60) break
    }
    return weeks
  }, [plan])

  const monthCells = useMemo(() => {
    const first = new Date(month)
    const start = new Date(first.getFullYear(), first.getMonth(), 1 - first.getDay())
    return Array.from({ length: 42 }, (_, i) => new Date(start.getFullYear(), start.getMonth(), start.getDate() + i))
  }, [month])

  const accept = async () => {
    setBusy(true)
    setError(null)
    try {
      const payloadItems = plan.map((item) => {
        const [y, m, d] = item.date.split('-').map(Number)
        return { course_object_type: item.course_object_type, course_object_id: item.course_object_id, title: item.title, description: item.description ?? '', scheduled_for: new Date(y, m - 1, d).toISOString() }
      })
      const res = await apiPost<{ success?: boolean }>('/course-calendar/accept', { course_uuid: courseUuid, course_title: courseTitle, items: payloadItems })
      if (res.success === false) { setError('保存计划失败，请重试。'); return }
      setDone(true)
      window.setTimeout(() => { onAccepted(); onClose() }, 900)
    } catch (e) {
      setError(e instanceof Error ? e.message : '保存计划失败。')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="course-cal-overlay" data-testid="course-cal" onClick={onClose}>
      <div className="course-cal-modal" role="dialog" aria-modal="true" aria-label="把课程加入日历" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="course-cal-close" onClick={onClose} aria-label="关闭">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {step === 1 && (
          <>
            <header className="course-cal-head">
              <h2 className="course-cal-title">你打算用多久学完这门课？</h2>
              <p className="course-cal-subtitle">我们会把课时、测验与项目阶段摊到这个区间里。</p>
            </header>
            <div className="course-cal-duration-chips">
              {DURATION_CHIPS.map((d) => (
                <button key={d} type="button" className="course-cal-chip" data-active={days === d && !customDays}
                  onClick={() => { setDays(d); setCustomDays('') }}>{d} 天</button>
              ))}
            </div>
            <label className="course-cal-custom-row">
              <span className="course-cal-custom-label">自定义天数：</span>
              <input className="course-cal-custom-input" inputMode="numeric" value={customDays} data-testid="cal-custom-days"
                onChange={(e) => setCustomDays(e.target.value.replace(/[^0-9]/g, ''))} />
              <span className="course-cal-custom-suffix">天</span>
            </label>
            <p className="course-cal-subtitle">请输入 1–365 天。</p>
            <div className="course-cal-footer">
              <button type="button" className="course-cal-btn" onClick={() => setStep(2)}>下一步</button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <header className="course-cal-head">
              <h2 className="course-cal-title">从哪天开始？</h2>
              <p className="course-cal-subtitle">选学习计划的第一天；也可以跳过，由 AI 决定。</p>
            </header>
            <div className="course-cal-picker">
              <div className="course-cal-picker-header">
                <button type="button" className="course-cal-picker-nav" aria-label="上个月" onClick={() => setMonth((m) => new Date(m.getFullYear(), m.getMonth() - 1, 1))}>‹</button>
                <span className="course-cal-picker-month">{month.getFullYear()} 年 {month.getMonth() + 1} 月</span>
                <button type="button" className="course-cal-picker-nav" aria-label="下个月" onClick={() => setMonth((m) => new Date(m.getFullYear(), m.getMonth() + 1, 1))}>›</button>
              </div>
              <div className="course-cal-picker-weekdays">{WEEKDAY_SHORT.map((w, i) => <div key={i} className="course-cal-picker-weekday">{w}</div>)}</div>
              <div className="course-cal-picker-grid">
                {monthCells.map((d) => {
                  const isSelected = startDate?.toDateString() === d.toDateString()
                  const isToday = new Date().toDateString() === d.toDateString()
                  return (
                    <button key={d.toISOString()} type="button" data-testid="cal-picker-cell"
                      className={`course-cal-picker-cell${isSelected ? ' course-cal-picker-cell--selected' : ''}${isToday ? ' course-cal-picker-cell--today' : ''}`}
                      onClick={() => setStartDate(new Date(d.getFullYear(), d.getMonth(), d.getDate()))}>{d.getDate()}</button>
                  )
                })}
              </div>
            </div>
            <div className="course-cal-footer">
              <button type="button" className="course-cal-btn course-cal-btn--ghost" onClick={() => setStep(1)}>返回</button>
              <button type="button" className="course-cal-btn course-cal-btn--ghost" onClick={() => { setStartDate(null); setStep(3) }}>跳过</button>
              <button type="button" className="course-cal-btn" onClick={() => setStep(3)}>下一步</button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <header className="course-cal-head">
              <h2 className="course-cal-title">每周哪几天学习？</h2>
              <p className="course-cal-subtitle">内容只会排到你选中的日子；跳过则由 AI 决定。</p>
            </header>
            <div className="course-cal-weekday-row">
              {WEEKDAY_LABELS.map((label, index) => (
                <button key={label} type="button" className={`course-cal-weekday-chip${weekdays.has(index) ? ' course-cal-weekday-chip--active' : ''}`}
                  data-testid="cal-weekday-chip"
                  onClick={() => setWeekdays((prev) => { const next = new Set(prev); if (next.has(index)) next.delete(index); else next.add(index); return next })}>
                  {label}
                </button>
              ))}
            </div>
            <div className="course-cal-footer">
              <button type="button" className="course-cal-btn course-cal-btn--ghost" onClick={() => setStep(2)}>返回</button>
              <button type="button" className="course-cal-btn course-cal-btn--ghost" onClick={() => { setWeekdays(new Set()); setStep(4) }}>跳过</button>
              <button type="button" className="course-cal-btn" onClick={() => setStep(4)}>下一步</button>
            </div>
          </>
        )}

        {step === 4 && (
          <>
            <header className="course-cal-head">
              <h2 className="course-cal-title">这是你的学习计划</h2>
              <p className="course-cal-subtitle">确认后就会写进「学习动态」的日历。</p>
            </header>
            {alreadyScheduled && <p className="course-cal-replace-note">这门课已有计划 —— 确认后会替换它。</p>}
            <div className="ccal-preview" data-testid="cal-preview">
              <div className="ccal-preview-weekdays">{WEEKDAY_LABELS.map((w) => <div key={w} className="ccal-preview-weekday">{w}</div>)}</div>
              <div className="ccal-preview-days-grid">
                {previewWeeks.map((week, wi) => (
                  <Fragment key={wi}>
                    {week.map((cell) => {
                      const cellItems = plan.map((item, index) => ({ item, index })).filter((row) => row.item.date === cell.date)
                      return (
                        <div key={cell.date}
                          className={`ccal-preview-day${cell.isToday ? ' ccal-preview-day--today' : ''}${dragOverDate === cell.date ? ' ccal-preview-day--drag-over' : ''}`}
                          data-testid="cal-preview-day"
                          onDragOver={(e) => { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; setDragOverDate(cell.date) }}
                          onDragLeave={() => setDragOverDate((d) => (d === cell.date ? null : d))}
                          onDrop={(e) => {
                            e.preventDefault()
                            setDragOverDate(null)
                            const index = Number.parseInt(e.dataTransfer.getData('text/plain'), 10)
                            if (!Number.isNaN(index)) moveItemToDate(index, cell.date)
                          }}>
                          <div className="ccal-preview-day-number">{cell.day}</div>
                          <div className="ccal-preview-day-events">
                            {(() => {
                              const dayExisting = existing.filter((row) => row.date === cell.date)
                              return (
                                <>
                                  <div className="ccal-preview-existing-row">
                                    {dayExisting.slice(0, 3).map((row) => (
                                      <div key={`${row.date}-${row.title}`} className="ccal-preview-existing ccal-preview-existing--bar" title={row.title} data-testid="cal-preview-existing">
                                        <span className="ccal-preview-existing-bar" style={{ background: row.color }} aria-hidden="true" />
                                        <span className="ccal-preview-existing-title">{row.title}</span>
                                      </div>
                                    ))}
                                    {dayExisting.length > 3 && <span className="ccal-preview-existing-more">+{dayExisting.length - 3}</span>}
                                  </div>
                                  {cellItems.slice(0, 3).map(({ item, index }) => (
                                    <div key={`${item.course_object_id}-${index}`} className="ccal-preview-pill" draggable data-testid="cal-preview-item"
                                      style={{ background: '#3d5477' }}
                                      title={item.title}
                                      onDragStart={(e) => e.dataTransfer.setData('text/plain', String(index))}>
                                      <span className="ccal-preview-pill-title">{item.title}</span>
                                    </div>
                                  ))}
                                  {cellItems.length > 3 && <div className="ccal-preview-existing-more">+{cellItems.length - 3}</div>}
                                </>
                              )
                            })()}
                          </div>
                        </div>
                      )
                    })}
                  </Fragment>
                ))}
              </div>
            </div>
            {error && <p className="course-cal-error">{error}</p>}
            {done && <p className="course-cal-success">已加入你的日历。</p>}
            <div className="course-cal-footer course-cal-footer--decide">
              <button type="button" className="course-cal-decide-btn course-cal-decide-btn--reject" aria-label="放弃这份计划" onClick={onClose}>✕</button>
              <button type="button" className="course-cal-decide-btn course-cal-decide-btn--accept" data-testid="cal-accept" disabled={busy} onClick={() => void accept()}>
                {busy ? <span className="course-cal-spinner" aria-hidden="true" /> : '确认'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
