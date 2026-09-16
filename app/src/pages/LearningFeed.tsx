import { useEffect, useMemo, useState } from 'react'
import { Clock, CalendarPlus } from 'lucide-react'
import { PendingTasksView } from '@/components/PendingTasksView'
import { apiGet, apiPost } from '@/lib/api'
import { useNavigate } from 'react-router'

interface Task {
  id: string; task_id?: string; title: string; course_uuid?: string; course_title?: string
  scheduled_for: string; due_at?: string; status: 'pending' | 'confirmed' | 'done' | string; type?: string; duration_min?: number
  description?: string
  progress?: number
  subtasks?: Array<{ subtask_id?: string; task_id?: string; title?: string; status?: string; related_file_ids?: { output_files?: Array<{ file_id?: string; file_name?: string; file_url?: string }> } }>
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
  // 线上「待处理」按来源分列（source-column）：课程课源 / 文件来源 / 无来源
  const pendingGroups = useMemo(() => {
    const groups = new Map<string, { key: string; title: string; kind: 'course' | 'none'; tasks: Task[] }>()
    for (const t of tasks ?? []) {
      if (t.status !== 'pending') continue
      const key = t.course_uuid ? `course:${t.course_uuid}` : t.course_title ? `course-title:${t.course_title}` : 'none'
      const group = groups.get(key) ?? { key, title: t.course_title ?? '无来源', kind: (t.course_uuid || t.course_title ? 'course' : 'none') as 'course' | 'none', tasks: [] as Task[] }
      group.tasks.push(t)
      groups.set(key, group)
    }
    return [...groups.values()]
  }, [tasks])

  const dones = useMemo(() => (tasks ?? []).filter((t) => t.status === 'done'), [tasks])
  const act = async (t: Task, action: 'confirm' | 'done') => { await apiPost('/calendar/approve_tasks', { task_id: t.id, action }); await load() }
  // 任务详情（线上：描述 + 子任务 + 进度 + 开始课堂/删除任务）
  const [openTask, setOpenTask] = useState<Task | null>(null)
  // 线上 source-actions-footer：整列「确认所有任务」/「拒绝所有任务」→ approve_tasks {task_id:[…], action}
  const bulkDecide = async (list: Task[], action: 'confirm' | 'reject') => {
    if (list.length === 0) return
    await apiPost('/calendar/approve_tasks', { task_id: list.map((t) => t.id), action })
    await load()
  }
  // 线上「相关截止日期」是服务端给的关联项；本仓没有这层关系数据，按时间邻近（±7 天）取，最多 5 条
  const dueTime = (t: Task) => new Date(t.due_at ?? t.scheduled_for).getTime()
  const relatedDues = useMemo(() => {
    if (!openTask) return []
    const anchor = dueTime(openTask)
    if (!Number.isFinite(anchor)) return []
    return (tasks ?? [])
      .filter((t) => t.id !== openTask.id)
      .map((t) => ({ task: t, at: dueTime(t) }))
      .filter((row) => Number.isFinite(row.at) && Math.abs(row.at - anchor) <= 7 * 86400000)
      .sort((a, b) => a.at - b.at)
      .slice(0, 5)
  }, [tasks, openTask])
  const [editingDate, setEditingDate] = useState<'start' | 'due' | null>(null)
  const [commentOpen, setCommentOpen] = useState(false)
  const [comment, setComment] = useState('')
  const [revising, setRevising] = useState(false)
  const [toast, setToast] = useState('')
  const [generating, setGenerating] = useState('')
  // 线上文件卡三态：processing（正在生成）/ failed（当前生成失败）/ ready；失败态在本仓由生成请求的结果驱动
  const [failedFiles, setFailedFiles] = useState<Record<string, true>>({})
  const [deciding, setDeciding] = useState(false)
  // 线上底部动作：确认 / 拒绝都走 /calendar/approve_tasks，响应带 total_succeeded
  const decideTask = async (action: 'confirm' | 'reject') => {
    if (!openTask || deciding) return
    setDeciding(true)
    try {
      const res = await apiPost<{ success?: boolean; total_succeeded?: number }>('/calendar/approve_tasks',
        action === 'reject' ? { task_id: openTask.id, action: 'reject' } : { task_id: openTask.id, action: 'confirm' })
      if (res.success && (res.total_succeeded ?? 1) > 0) { setOpenTask(null); await load() }
    } finally {
      setDeciding(false)
    }
  }
  const [quotaLeft, setQuotaLeft] = useState<number | null>(null)
  useEffect(() => {
    void apiGet<{ file_generation?: { remaining: number } }>('/auth/other_function_usage_limits')
      .then((r) => setQuotaLeft(r.file_generation?.remaining ?? null)).catch(() => setQuotaLeft(null))
  }, [])
  // 线上 be()：先查余量 → POST /file_generation/rerun {task_id} → 回读 subtask 的文件卡
  const generateFile = async (subtaskId: string, subtaskTitle: string) => {
    if (quotaLeft === 0) { setToast('已达到每周文件生成上限。'); window.setTimeout(() => setToast(''), 2600); return }
    setGenerating(subtaskId)
    try {
      const res = await apiPost<{ success?: boolean; file_id?: string; file_name?: string; file_url?: string; stub?: boolean }>(
        '/file_generation/rerun', { task_id: openTask?.id, subtask_id: subtaskId })
      if (res.success && res.file_url) {
        setFailedFiles((m) => { const next = { ...m }; delete next[subtaskId]; return next })
        setOpenTask((t) => (t ? {
          ...t,
          subtasks: (t.subtasks ?? []).map((s) => (s.subtask_id === subtaskId
            ? { ...s, status: 'completed', related_file_ids: { ...(s.related_file_ids ?? {}), output_files: [{ file_id: res.file_id ?? '', file_name: res.file_name ?? subtaskTitle, file_url: res.file_url ?? '' }] } }
            : s)),
        } : t))
        setToast(res.stub ? '已生成材料（未配置模型时用内置模板）' : '学习材料已生成')
        setQuotaLeft((n) => (n === null ? null : Math.max(0, n - 1)))
      } else { setFailedFiles((m) => ({ ...m, [subtaskId]: true })); setToast('生成失败，请重试。') }
      window.setTimeout(() => setToast(''), 2600)
      await load()
    } finally {
      setGenerating('')
    }
  }
  // datetime-local 需要本地时间的 YYYY-MM-DDTHH:mm
  const toLocalInput = (iso: string) => {
    const d = new Date(iso)
    const pad = (n: number) => String(n).padStart(2, '0')
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
  }
  // 线上：评论交给模型改写任务 —— 提交时显示「正在根据你的评论更新任务...」，成功后回读并提示「任务已成功更新」
  const reviseTask = async () => {
    if (!openTask || !comment.trim() || revising) return
    setRevising(true)
    try {
      const res = await apiPost<{ main_task?: Task; subtasks?: Task['subtasks']; revised?: boolean }>(
        '/calendar/main_task_detail', { task_id: openTask.id, comment: comment.trim() })
      if (res.main_task) setOpenTask({ ...openTask, ...res.main_task, subtasks: (res.subtasks ?? res.main_task.subtasks ?? openTask.subtasks) })
      setComment('')
      setCommentOpen(false)
      setToast(res.revised === false ? '已记录你的评论（未配置模型时不会改写任务）' : '任务已成功更新')
      window.setTimeout(() => setToast(''), 2600)
      await load()
    } finally {
      setRevising(false)
    }
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
      {toast && <div className="proactive-toast" data-testid="task-toast">{toast}</div>}
      <div className="proactive-content">
      <div className="proactive-layout">
      {/* 线上左栏三块：.calendar-sidebar-summary（日历摘要）+ .todo-section（今日待办）+ .completed-section（已完成），
          「确认/拒绝」这类动作线上放在任务详情弹层里，本仓额外在待处理条目上留了两个 pill */}
      <aside className="proactive-left">
        <div className="calendar-sidebar-summary" data-testid="calendar-sidebar-summary">
          <div className="calendar-sidebar-header">
            <div className="calendar-icon-container" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M8 2V6M16 2V6M3.5 9.5H20.5M5 4H19C20.1046 4 21 4.89543 21 6V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V6C3 4.89543 3.89543 4 5 4Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2 className="calendar-sidebar-title">日历</h2>
          </div>
          <div className="calendar-sidebar-date-row">
            <div>
              <div className="calendar-sidebar-day">{selectedDate.getDate()}</div>
              <div className="calendar-sidebar-date">{WEEK_LONG[selectedDate.getDay()]}, {selectedDate.getMonth() + 1}月 {selectedDate.getDate()}</div>
            </div>
            {sameDay(selectedDate, today) && <span className="calendar-sidebar-today">今天</span>}
          </div>
          <div className="calendar-sidebar-stats">
            <span>{dayTasks.length} 项截止</span>
            <span>{(tasks ?? []).length} 个任务</span>
          </div>
        </div>

        <div className="todo-section" data-testid="todo-section">
          <div className="todo-header">
            <div className="todo-header-left">
              <h2 className="todo-header-title">{sameDay(selectedDate, today) ? '今日待办' : '当日待办'}</h2>
            </div>
            <div className="todo-header-right">
              <div className="todo-date-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ marginRight: 6 }} aria-hidden="true">
                  <path d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M16 2V6" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M8 2V6" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M3 10H21" stroke="#666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {WEEK_LONG[selectedDate.getDay()]}, {selectedDate.getMonth() + 1}月 {selectedDate.getDate()}
              </div>
            </div>
          </div>
          {tasks === null && <div className="hk-skeleton h-16 rounded-xl" />}
          {tasks !== null && dayTasks.length === 0 && <div className="todo-empty">这一天没有安排，去课程里加入日历。</div>}
          <div className="todo-list">
            {dayTasks.map((t) => (
              <div key={t.id} className="todo-item" data-testid="todo-item">
                <div className="todo-content">
                  <div className="todo-title">{t.title}</div>
                  {t.description && <div className="todo-subtitle">{t.description}</div>}
                  <button type="button" className="todo-view-details-btn" onClick={() => setOpenTask(t)}>查看详情</button>
                  {t.status === 'pending' && (
                    <div className="flex gap-1.5 mt-2">
                      <button onClick={() => void act(t, 'confirm')} className="hk-pill h-7 text-[11px]">确认</button>
                      <button onClick={() => void act(t, 'done')} className="hk-pill h-7 text-[11px]">完成</button>
                    </div>
                  )}
                </div>
                <button type="button" className="todo-delete-button" title="删除" aria-label="删除"
                  onClick={() => setConfirmDelete(t)}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M4 7h16M9 7V5h6v2M6 7l1 13h10l1-13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="completed-section" data-testid="completed-section">
          <div className="completed-header"><h2 className="completed-header-title">已完成</h2></div>
          {dones.length === 0
            ? <div className="completed-list"><div style={{ padding: 20, textAlign: 'center', color: '#999' }}>完成的任务会显示在这里</div></div>
            : <div className="completed-list">{dones.map((t) => <div key={t.id} className="completed-item" onClick={() => setOpenTask(t)}>{t.title}</div>)}</div>}
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
        {filter === 'pending' && (
          <PendingTasksView groups={pendingGroups} onOpen={(t, comment) => { setOpenTask(t as Task); setCommentOpen(Boolean(comment)) }}
            onDecide={(t, action) => void bulkDecide([t as Task], action)} onBulk={(list, action) => void bulkDecide(list as Task[], action)} />
        )}
        {filter !== 'pending' && <div className={`calendar-grid${view === 'week' ? ' week-view' : ''}`} data-testid="calendar-grid">
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
        </div>}

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
            {revising && (
              <div className="comment-loading-overlay">
                <div className="comment-loading-spinner" />
                <div className="comment-loading-text">正在根据你的评论更新任务...</div>
              </div>
            )}
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
                  {relatedDues.length > 0 && (
                    <div className="task-detail-section" data-testid="related-dues">
                      <h3 className="task-detail-section-title">相关截止日期</h3>
                      <div className="task-detail-related-dues">
                        {relatedDues.map(({ task: row, at }) => (
                          <button key={row.id} type="button" className="task-detail-related-due-item" style={{ width: '100%', background: 'none', textAlign: 'left' }}
                            onClick={() => setOpenTask(row)}>
                            <span className="task-detail-related-due-bar" aria-hidden="true" />
                            <span className="task-detail-related-due-icon" aria-hidden="true">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <circle cx="12" cy="13" r="8" stroke="currentColor" strokeWidth="1.8" />
                                <path d="M12 9V13L14.5 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </span>
                            <span className="task-detail-related-due-content">
                              <span className="task-detail-related-due-name">{row.title}</span>
                            </span>
                            <span className="task-detail-related-due-time">
                              {`${new Date(at).getMonth() + 1}月 ${new Date(at).getDate()} ${String(new Date(at).getHours()).padStart(2, '0')}:${String(new Date(at).getMinutes()).padStart(2, '0')}`}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  {(openTask.subtasks ?? []).length > 0 && (
                    <div className="task-detail-section">
                      <h3 className="task-detail-section-title">
                        子任务 <span className="task-detail-section-title-desc">- 提前为你准备好的学习材料，帮助你完成任务</span>
                      </h3>
                      <div className="task-detail-subtasks">
                        {(openTask.subtasks ?? []).map((sub, index) => {
                          const outputs = sub.related_file_ids?.output_files ?? []
                          return (
                            <div key={sub.subtask_id ?? index} className="task-detail-subtask">
                              <span className={`task-detail-subtask-status ${sub.status === 'done' ? 'done' : ''}`}>{sub.status === 'done' ? '✓' : index + 1}</span>
                              <span className="task-detail-subtask-title">{sub.title ?? '学习材料'}</span>
                              {generating === (sub.subtask_id ?? '') && (
                                <div className="task-detail-generated-file-card task-detail-generated-file-card-processing" data-testid="generated-file-processing">
                                  <span className="task-detail-generated-file-icon"><span className="task-detail-generated-file-icon-spinner" aria-label="生成中" /></span>
                                  <span className="task-detail-generated-file-info">
                                    <span className="task-detail-generated-file-name">正在生成 {sub.title ?? '学习材料'}（最多 600 秒）</span>
                                  </span>
                                </div>
                              )}
                              {generating !== (sub.subtask_id ?? '') && failedFiles[sub.subtask_id ?? ''] && (
                                <div className="task-detail-generated-file-card task-detail-generated-file-card-failed" data-testid="generated-file-failed">
                                  <span className="task-detail-generated-file-icon task-detail-generated-file-icon-failed" aria-hidden="true">
                                    <svg width="20" height="18" viewBox="0 0 24 22" fill="none"><path d="M12 3l9 16H3z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /><path d="M12 9.5v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /><circle cx="12" cy="16.4" r="1" fill="currentColor" /></svg>
                                  </span>
                                  <span className="task-detail-generated-file-info">
                                    <span className="task-detail-generated-file-name">当前生成失败</span>
                                  </span>
                                </div>
                              )}
                              {generating !== (sub.subtask_id ?? '') && !failedFiles[sub.subtask_id ?? ''] && outputs.length > 0 && (
                                <a className="task-detail-generated-file-card" data-testid="generated-file-card"
                                  href={outputs[0].file_url} target="_blank" rel="noreferrer" title={outputs[0].file_name}>
                                  <span className="task-detail-generated-file-icon" aria-hidden="true">📄</span>
                                  <span className="task-detail-generated-file-info">
                                    <span className="task-detail-generated-file-name">{outputs[0].file_name}</span>
                                    <span className="task-detail-generated-file-description">为你准备的学习材料</span>
                                  </span>
                                </a>
                              )}
                              {generating !== (sub.subtask_id ?? '') && !failedFiles[sub.subtask_id ?? ''] && outputs.length === 0 && (
                                <span className="task-detail-generated-file-description" data-testid="generated-file-pending">文件待生成——准备好后将通知你</span>
                              )}
                              <button type="button" className="task-detail-action-btn" data-testid="generate-file"
                                disabled={generating !== '' || quotaLeft === 0}
                                onClick={() => void generateFile(sub.subtask_id ?? '', sub.title ?? '')}>
                                {outputs.length > 0 || failedFiles[sub.subtask_id ?? ''] ? '重新生成' : '立即生成'}
                              </button>
                            </div>
                          )
                        })}
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
                {commentOpen && (
                  <div className={`task-detail-comment-panel${commentOpen ? ' open' : ''}`}>
                    <textarea className="comment-panel-textarea" value={comment} placeholder="告诉 Orbie 你希望调整什么..."
                      data-testid="comment-textarea" onChange={(e) => setComment(e.target.value)} />
                    <div className="task-detail-comment-actions">
                      <button type="button" className="task-detail-action-btn" onClick={() => { setCommentOpen(false); setComment('') }}>取消</button>
                      <button type="button" className="task-detail-action-btn" data-testid="comment-submit"
                        disabled={!comment.trim() || revising} onClick={() => void reviseTask()}>提交评论</button>
                    </div>
                  </div>
                )}
                <div className="task-detail-bottom-actions">
                  <button type="button" className="task-detail-bottom-action-btn" data-testid="delete-task" title="删除任务" onClick={() => setConfirmDelete(openTask)}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="task-detail-bottom-action-icon" aria-hidden="true">
                      <path d="M4 7h16M9 7V5h6v2M6 7l1 13h10l1-13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <button type="button" className={`task-detail-bottom-action-btn comment${commentOpen ? ' active' : ''}`} data-testid="comment-toggle"
                    title="评论以调整" onClick={() => setCommentOpen((v) => !v)}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="task-detail-bottom-action-icon" aria-hidden="true">
                      <path d="M21 12a8 8 0 01-11.6 7.2L4 21l1.8-5.4A8 8 0 1121 12z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  {openTask.status === 'pending' && (
                    <>
                      <button type="button" className="task-detail-bottom-action-btn confirm" data-testid="confirm-task" title="确认任务" disabled={deciding}
                        onClick={() => void decideTask('confirm')}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="task-detail-bottom-action-icon" aria-hidden="true">
                          <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                      <button type="button" className="task-detail-bottom-action-btn reject" data-testid="reject-task" title="拒绝任务" disabled={deciding}
                        onClick={() => void decideTask('reject')}>
                        {deciding
                          ? <span className="reject-loading-spinner modal-spinner" aria-label="处理中" />
                          : (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="task-detail-bottom-action-icon" aria-hidden="true">
                              <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                      </button>
                    </>
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
