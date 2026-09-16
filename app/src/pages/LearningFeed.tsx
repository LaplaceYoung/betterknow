import { useEffect, useMemo, useState } from 'react'
import { Check, Clock, CalendarPlus } from 'lucide-react'
import { apiGet, apiPost } from '@/lib/api'
import { useNavigate } from 'react-router'

interface Task {
  id: string; task_id?: string; title: string; course_uuid?: string; course_title?: string
  scheduled_for: string; due_at?: string; status: 'pending' | 'confirmed' | 'done' | string; type?: string; duration_min?: number
  description?: string
  progress?: number
  subtasks?: { subtask_id?: string; task_id?: string; title?: string; status?: string }[]
}
// 线上 weekdays：周日打头（sun..sat）；事件配色按标题字符和取模（course 事件三色板）
const WEEK = ['日', '一', '二', '三', '四', '五', '六']
const WEEK_LONG = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
const MONTHS = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
const EVENT_PALETTE = [
  { dark: '#4C6694', light: '#E8F0F8', text: '#3D5477' },
  { dark: '#6681D6', light: '#EBEFFA', text: '#4A5FB8' },
  { dark: '#2196F3', light: '#E3F2FD', text: '#1565C0' },
]
const eventColor = (title: string) => EVENT_PALETTE[title.split('').reduce((sum, ch) => sum + ch.charCodeAt(0), 0) % EVENT_PALETTE.length]
const sameDay = (a: Date, b: Date) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()

// [S21][B12] 学习动态：日历任务来自服务端 /calendar/tasks；确认/完成写回
export default function LearningFeed() {
  const [tasks, setTasks] = useState<Task[] | null>(null)
  const [cursor, setCursor] = useState(() => { const d = new Date(); d.setDate(1); return d })
  const [view, setView] = useState<'week' | 'month'>('month')
  const [filter, setFilter] = useState<'all' | 'confirmed' | 'pending'>('all')
  const [selectMode, setSelectMode] = useState(false)
  const [selected, setSelected] = useState<Record<string, boolean>>({})
  const bulkDelete = async () => {
    const ids = Object.keys(selected).filter((id) => selected[id])
    for (const id of ids) await apiPost('/calendar/remove_task', { task_id: id }).catch(() => undefined)
    setSelected({}); setSelectMode(false); await load()
  }
  const today = new Date()
  const [selectedDate, setSelectedDate] = useState(() => new Date())
  const load = () => apiGet<{ tasks: Task[] }>('/calendar/list_main_tasks').then((r) => setTasks((r.tasks ?? []).map((t) => ({ ...t, id: t.id ?? t.task_id ?? '' })))).catch(() => apiGet<{ tasks: Task[] }>('/calendar/tasks').then((r) => setTasks(r.tasks)).catch(() => setTasks([])))
  useEffect(() => { void load() }, [])

  const days = useMemo(() => {
    const first = new Date(cursor); const startIdx = (first.getDay() + 6) % 7
    const start = new Date(first); start.setDate(first.getDate() - startIdx)
    return Array.from({ length: 42 }, (_, i) => { const d = new Date(start); d.setDate(start.getDate() + i); return d })
  }, [cursor])
  const shown = useMemo(() => (tasks ?? []).filter((t) => filter === 'all' || t.status === filter), [tasks, filter])
  const dayTasks = useMemo(() => (tasks ?? []).filter((t) => sameDay(new Date(t.scheduled_for), selectedDate) && t.status !== 'done'), [tasks, selectedDate])
  const dones = useMemo(() => (tasks ?? []).filter((t) => t.status === 'done'), [tasks])
  const act = async (t: Task, action: 'confirm' | 'done') => { await apiPost('/calendar/approve_tasks', { task_id: t.id, action }); await load() }
  // 任务详情（线上：描述 + 子任务 + 进度 + 开始课堂/删除任务）
  const [openTask, setOpenTask] = useState<Task | null>(null)
  const [editingDate, setEditingDate] = useState<'start' | 'due' | null>(null)
  // datetime-local 需要本地时间的 YYYY-MM-DDTHH:mm
  const toLocalInput = (iso: string) => {
    const d = new Date(iso)
    const pad = (n: number) => String(n).padStart(2, '0')
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
  }
  const saveTaskDate = async (field: 'scheduled_for' | 'due_at', value: string) => {
    if (!openTask || !value) { setEditingDate(null); return }
    const iso = new Date(value).toISOString()
    await apiPost('/calendar/update_tasks', { task_id: openTask.id, [field]: iso }).catch(() => undefined)
    setEditingDate(null)
    setOpenTask((t) => (t ? { ...t, [field]: iso } : t))
    await load()
  }
  const [confirmDelete, setConfirmDelete] = useState<Task | null>(null)
  const [quota, setQuota] = useState<{ file_generation?: { remaining: number; limit: number }; deep_learn_session?: { remaining: number; limit: number } } | null>(null)
  useEffect(() => {
    void apiGet<typeof quota>('/auth/other_function_usage_limits').then(setQuota).catch(() => setQuota(null))
  }, [])
  const removeTask = async (t: Task) => {
    await apiPost('/calendar/remove_task', { task_id: t.id }).catch(() => undefined)
    setConfirmDelete(null); setOpenTask(null); await load()
  }
  const startClass = async (t: Task) => {
    const subtask = t.subtasks?.[0]
    const res = await apiPost<{ deep_learn_session_url?: string; deep_learn_session_id?: string }>('/calendar/deep_learn_subtask_session', { subtask_id: subtask?.subtask_id ?? subtask?.task_id ?? t.id, task_id: t.id, title: t.title }).catch(() => null)
    const url = res?.deep_learn_session_url ?? (res?.deep_learn_session_id ? `/deep-learn-session/outline/${res.deep_learn_session_id}` : null)
    if (url) nav(url)
  }
  const nav = useNavigate()

  return (
    <div className="proactive-page">
      <div className="proactive-content">
      <div className="proactive-layout">
      <aside className="proactive-left">
        <div className="hk-card p-4">
          <div className="text-[12px] text-[#8a8a90]">{sameDay(selectedDate, today) ? '今日' : '已选日期'}</div>
          <div className="text-[40px] font-semibold leading-none mt-1">{selectedDate.getDate()}</div>
          <div className="text-[12px] text-[#6b6b70] mt-1">{selectedDate.getMonth() + 1} 月 · {WEEK_LONG[selectedDate.getDay()]}</div>
          <div className="text-[12px] text-[#6b6b70] mt-1">{(tasks ?? []).filter((t) => sameDay(new Date(t.scheduled_for), selectedDate)).length} 个任务</div>
        </div>
        <div>
          <h3 className="hk-section-title mb-2">{sameDay(selectedDate, today) ? '今日待办' : '当日待办'}</h3>
          {tasks === null && <div className="hk-skeleton h-16 rounded-xl" />}
          {tasks && dayTasks.length === 0 && <div className="text-[12px] text-[#8a8a90] hk-card p-3">这一天没有安排，去课程里加一个学习计划吧</div>}
          <ul className="space-y-2">{dayTasks.map((t) => (
            <li key={t.id} className="hk-card p-3"><div className="text-[13px] font-medium leading-5">{t.title}</div><div className="text-[11px] text-[#8a8a90] mt-0.5 inline-flex items-center gap-1"><Clock size={10} />{t.duration_min ?? 30} 分钟 · {t.course_title ?? '学习任务'}</div>
              <div className="flex gap-1.5 mt-2">{t.status === 'pending' && <button onClick={() => act(t, 'confirm')} className="hk-pill h-7 text-[11px] px-2">确认</button>}<button onClick={() => act(t, 'done')} className="hk-pill h-7 text-[11px] px-2"><Check size={11} />完成</button></div></li>
          ))}</ul>
        </div>
        <div>
          <h3 className="hk-section-title mb-2">已确认任务</h3>
          {(() => { const list = (tasks ?? []).filter((t) => t.status === 'confirmed'); return list.length === 0 ? <div className="text-[12px] text-[#8a8a90]">还没有确认的任务</div> : <ul className="space-y-1.5">{list.slice(0, 5).map((t) => <li key={t.id} className="hk-card p-2.5 text-[12px]" data-testid="confirmed-task"><div className="truncate font-medium">{t.title}</div><div className="text-[11px] text-[#8a8a90] mt-0.5">{new Date(t.scheduled_for).toLocaleDateString('zh-CN', { month: 'numeric', day: 'numeric' })} · {t.duration_min ?? 30} 分钟</div></li>)}</ul> })()}
        </div>
        <div>
          <h3 className="hk-section-title mb-2">待处理任务</h3>
          {(() => { const list = (tasks ?? []).filter((t) => t.status === 'pending'); return list.length === 0 ? <div className="text-[12px] text-[#8a8a90]">没有待处理的任务</div> : <ul className="space-y-1.5">{list.slice(0, 5).map((t) => <li key={t.id} className="hk-card p-2.5 text-[12px]" data-testid="pending-task"><div className="truncate font-medium">{t.title}</div><button onClick={() => void act(t, 'confirm')} className="hk-pill h-6 text-[11px] px-2 mt-1">确认</button></li>)}</ul> })()}
        </div>
        <div>
          <h3 className="hk-section-title mb-2">已完成</h3>
          {dones.length === 0 ? <div className="text-[12px] text-[#8a8a90]">完成的任务会显示在这里</div> : <ul className="space-y-1 text-[12px] text-[#6b6b70]">{dones.slice(0, 6).map((t) => <li key={t.id} className="line-through truncate">{t.title}</li>)}</ul>}
        </div>
      </aside>

      <section className="proactive-right">
      <div className="proactive-tasks-container">
        <div className="proactive-tasks-header flex items-center gap-2 flex-wrap">
          {([['all', '全部'], ['confirmed', '已确认'], ['pending', '待处理']] as const).map(([k, l]) => <button key={k} onClick={() => setFilter(k)} className="hk-pill h-8 text-[12px] data-[on=true]:bg-[#0a0a0a] data-[on=true]:text-white data-[on=true]:border-[#0a0a0a]" data-on={filter === k}>{l}</button>)}
          <button className="hk-pill h-8 text-[12px]"><CalendarPlus size={12} /> Google Calendar</button>
          <button onClick={() => setSelectMode((v) => !v)} className={`hk-pill h-8 text-[12px] ${selectMode ? 'bg-[#0a0a0a] text-white' : ''}`} data-testid="bulk-toggle">{selectMode ? '取消选择' : '批量删除日程'}</button>
          {selectMode && <button onClick={() => void bulkDelete()} disabled={!Object.values(selected).some(Boolean)} className="h-8 px-3 rounded-full bg-[#dc2626] text-white text-[12px] disabled:opacity-40" data-testid="bulk-delete">删除所选 {Object.values(selected).filter(Boolean).length}</button>}
          <div className="proactive-tasks-mode-switcher ml-auto" data-testid="view-switcher">{(['week', 'month'] as const).map((v) => (
            <button key={v} onClick={() => setView(v)} data-active={view === v}
              className="proactive-tasks-mode-btn">{v === 'week' ? '周' : '月'}</button>
          ))}</div>
        </div>
        <div className="date-picker-header" data-testid="calendar-header">
          <button type="button" className="date-picker-nav-btn" aria-label="上个月"
            onClick={() => setCursor((c) => new Date(c.getFullYear(), c.getMonth() - 1, 1))}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <span className="date-picker-month-label">{MONTHS[cursor.getMonth()]} {cursor.getFullYear()}</span>
          <button type="button" className="date-picker-nav-btn" aria-label="下个月"
            onClick={() => setCursor((c) => new Date(c.getFullYear(), c.getMonth() + 1, 1))}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>
        <div className={`calendar-grid${view === 'week' ? ' week-view' : ''}`} data-testid="calendar-grid">
          <div className="calendar-weekdays">{WEEK.map((w) => <div key={w} className="calendar-weekday">{w}</div>)}</div>
          <div className={`calendar-days-grid${view === 'week' ? ' week-view-grid' : ''}`}>
            {(view === 'month'
              ? days
              : days.filter((d) => {
                  const weekStart = days.findIndex((x) => sameDay(x, today)) - today.getDay()
                  const idx = days.indexOf(d)
                  return idx >= weekStart && idx < weekStart + 7
                })
            ).map((d) => {
              const inMonth = d.getMonth() === cursor.getMonth()
              const isToday = sameDay(d, today)
              const isSelected = sameDay(d, selectedDate)
              const dayTasks = shown.filter((t) => sameDay(new Date(t.scheduled_for), d))
              return (
                <div key={d.toISOString()}
                  className={`calendar-day${inMonth ? '' : ' other-month'}${isToday ? ' today' : ''}${isSelected ? ' selected' : ''}${view === 'week' ? ' week-view-day' : ''}`}
                  onClick={() => setSelectedDate(new Date(d))} data-testid="calendar-day">
                  <div className="calendar-day-number">{d.getDate()}</div>
                  <div className="calendar-day-events">
                    {dayTasks.slice(0, 3).map((t) => {
                      const palette = eventColor(t.title)
                      return (
                        <div key={t.id} className="calendar-event scheduled-event" data-testid="task-chip"
                          style={{ ['--event-color-dark' as string]: palette.dark, ['--event-color-light' as string]: palette.light, ['--event-color-text' as string]: palette.text }}
                          onClick={(e) => { e.stopPropagation(); if (selectMode) setSelected((s) => ({ ...s, [t.id]: !s[t.id] })); else setOpenTask(t) }}>
                          <span className="scheduled-icon-container" aria-hidden="true">
                            <Clock size={10} />
                          </span>
                          <span className="scheduled-event-title">{t.title}</span>
                        </div>
                      )
                    })}
                    {dayTasks.length > 3 && <div className="calendar-event-more">+{dayTasks.length - 3}</div>}
                  </div>
                  {view === 'week' && <div className="calendar-day-task-count">{dayTasks.length} 个任务</div>}
                </div>
              )
            })}
          </div>
        </div>
        {quota && (
          <div className="mt-4 hk-card p-3 text-[12px] text-[#6b6b70]" data-testid="quota-panel">
            <div className="font-medium text-[#3d3d3f] mb-1">本周配额</div>
            <div>文件生成 {quota.file_generation ? `${quota.file_generation.limit - quota.file_generation.remaining} 已用 / ${quota.file_generation.limit}` : '—'} 本周</div>
            <div>深度学习课堂 {quota.deep_learn_session ? `${quota.deep_learn_session.limit - quota.deep_learn_session.remaining} 已用 / ${quota.deep_learn_session.limit}` : '—'} 本周</div>
          </div>
        )}
      </div>
      </section>

      {openTask && (
        <div className="task-detail-overlay" data-testid="task-detail" onClick={() => setOpenTask(null)}>
          <div className="task-detail-container" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="task-detail-title">
            <button type="button" className="task-detail-close" onClick={() => setOpenTask(null)} aria-label="关闭">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <div className="task-detail-content single-column">
              <div className="task-detail-left-col">
                <div className="task-detail-left-scrollable-content">
                  <div className="task-detail-header">
                    <h2 className="task-detail-title" id="task-detail-title">{openTask.title}</h2>
                    <div className="task-detail-meta">
                      <div className="task-detail-meta-item">
                        <svg className="task-detail-meta-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="task-detail-meta-label">开始：</span>
                        {editingDate === 'start' ? (
                          <span className="modal-date-field editing">
                            <input type="datetime-local" autoFocus className="task-detail-date-input" data-testid="task-start-input"
                              defaultValue={toLocalInput(openTask.scheduled_for)}
                              onBlur={(e) => void saveTaskDate('scheduled_for', e.target.value)}
                              onChange={(e) => { const value = e.target.value; window.setTimeout(() => void saveTaskDate('scheduled_for', value), 400) }}
                              onKeyDown={(e) => { if (e.key === 'Enter') void saveTaskDate('scheduled_for', (e.target as HTMLInputElement).value) }} />
                          </span>
                        ) : (
                          <div className="modal-date-field" onClick={() => setEditingDate('start')} data-testid="task-start-field">
                            {new Date(openTask.scheduled_for).toLocaleString('zh-CN', { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                            <button type="button" className="date-edit-btn modal-date-edit-btn" title="编辑开始日期" onClick={(e) => { e.stopPropagation(); setEditingDate('start') }}>✎</button>
                          </div>
                        )}
                      </div>
                      <div className="task-detail-meta-item">
                        <svg className="task-detail-meta-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="task-detail-meta-label">截止：</span>
                        {editingDate === 'due' ? (
                          <span className="modal-date-field editing">
                            <input type="datetime-local" autoFocus className="task-detail-date-input" data-testid="task-due-input"
                              defaultValue={toLocalInput(openTask.due_at ?? openTask.scheduled_for)}
                              onBlur={(e) => void saveTaskDate('due_at', e.target.value)}
                              onChange={(e) => { const value = e.target.value; window.setTimeout(() => void saveTaskDate('due_at', value), 400) }}
                              onKeyDown={(e) => { if (e.key === 'Enter') void saveTaskDate('due_at', (e.target as HTMLInputElement).value) }} />
                          </span>
                        ) : (
                          <div className="modal-date-field" onClick={() => setEditingDate('due')} data-testid="task-due-field">
                            {new Date(openTask.due_at ?? openTask.scheduled_for).toLocaleString('zh-CN', { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                            <button type="button" className="date-edit-btn modal-date-edit-btn" title="编辑截止日期" onClick={(e) => { e.stopPropagation(); setEditingDate('due') }}>✎</button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {openTask.description && (
                    <div className="task-detail-section">
                      <h3 className="task-detail-section-title">描述</h3>
                      <p className="task-detail-description">{openTask.description}</p>
                    </div>
                  )}
                  {(openTask.subtasks ?? []).length > 0 && (
                    <div className="task-detail-section">
                      <h3 className="task-detail-section-title">
                        子任务 <span className="task-detail-section-title-desc">- 提前为你准备好的学习材料，帮助你完成任务</span>
                      </h3>
                      <div className="task-detail-subtasks">
                        {(openTask.subtasks ?? []).map((sub, index) => (
                          <div key={sub.subtask_id ?? index} className="task-detail-subtask">
                            <span className={`task-detail-subtask-status ${sub.status === 'done' ? 'done' : ''}`}>{sub.status === 'done' ? '✓' : index + 1}</span>
                            <span className="task-detail-subtask-title">{sub.title ?? '学习材料'}</span>
                          </div>
                        ))}
                      </div>
                      <div className="task-detail-subtask-footer">
                        <div className="task-detail-progress-container">
                          <div className="task-detail-progress-bar"><div className="task-detail-progress-fill" style={{ width: `${openTask.progress ?? 0}%` }} /></div>
                          <span className="task-detail-progress-text">{openTask.progress === 100 ? `已完成 100%！` : `已完成 ${openTask.progress ?? 0}%`}</span>
                        </div>
                        <div className="task-detail-action-container">
                          <button type="button" className="task-detail-action-btn" data-testid="start-class" onClick={() => void startClass(openTask)}>开始 →</button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="task-detail-bottom-actions">
                  <button type="button" className="task-detail-bottom-action-btn" data-testid="delete-task" title="删除任务" onClick={() => setConfirmDelete(openTask)}>🗑</button>
                  {openTask.status === 'pending' && (
                    <button type="button" className="task-detail-bottom-action-btn confirm" data-testid="confirm-task" title="确认任务"
                      onClick={() => { void act(openTask, 'confirm'); setOpenTask(null) }}>✓</button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {confirmDelete && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[60]">
          <div className="hk-card w-[420px] p-5" role="dialog" data-testid="delete-confirm">
            <div className="text-[14px] font-medium">你确定要删除 {confirmDelete.title} 吗？此操作无法撤销。</div>
            <div className="flex justify-end gap-2 mt-4">
              <button onClick={() => setConfirmDelete(null)} className="hk-pill h-9 px-4 text-[13px]">取消</button>
              <button onClick={() => void removeTask(confirmDelete)} className="h-9 px-4 rounded-full bg-[#dc2626] text-white text-[13px]">删除</button>
            </div>
          </div>
        </div>
      )}
      </div>
      </div>
    </div>
  )
}
