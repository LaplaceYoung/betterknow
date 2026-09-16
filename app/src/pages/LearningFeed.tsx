import { useEffect, useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight, Check, Clock, CalendarPlus, Circle } from 'lucide-react'
import { apiGet, apiPost } from '@/lib/api'
import { useNavigate } from 'react-router'

interface Task {
  id: string; task_id?: string; title: string; course_uuid?: string; course_title?: string
  scheduled_for: string; status: 'pending' | 'confirmed' | 'done' | string; type?: string; duration_min?: number
  description?: string
  progress?: number
  subtasks?: { subtask_id?: string; task_id?: string; title?: string; status?: string }[]
}
const WEEK = ['一', '二', '三', '四', '五', '六', '日']
const COLORS = ['#dbeafe', '#dcfce7', '#fef3c7', '#fde2e2', '#ede9fe']
const sameDay = (a: Date, b: Date) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()

// [S21][B12] 学习动态：日历任务来自服务端 /calendar/tasks；确认/完成写回
export default function LearningFeed() {
  const [tasks, setTasks] = useState<Task[] | null>(null)
  const [cursor, setCursor] = useState(() => { const d = new Date(); d.setDate(1); return d })
  const [view, setView] = useState<'week' | 'month'>('month')
  const [filter, setFilter] = useState<'all' | 'confirmed' | 'pending'>('all')
  const today = new Date()
  const load = () => apiGet<{ tasks: Task[] }>('/calendar/list_main_tasks').then((r) => setTasks((r.tasks ?? []).map((t) => ({ ...t, id: t.id ?? t.task_id ?? '' })))).catch(() => apiGet<{ tasks: Task[] }>('/calendar/tasks').then((r) => setTasks(r.tasks)).catch(() => setTasks([])))
  useEffect(() => { void load() }, [])

  const days = useMemo(() => {
    const first = new Date(cursor); const startIdx = (first.getDay() + 6) % 7
    const start = new Date(first); start.setDate(first.getDate() - startIdx)
    return Array.from({ length: 42 }, (_, i) => { const d = new Date(start); d.setDate(start.getDate() + i); return d })
  }, [cursor])
  const shown = useMemo(() => (tasks ?? []).filter((t) => filter === 'all' || t.status === filter), [tasks, filter])
  const todays = useMemo(() => (tasks ?? []).filter((t) => sameDay(new Date(t.scheduled_for), today) && t.status !== 'done'), [tasks, today])
  const dones = useMemo(() => (tasks ?? []).filter((t) => t.status === 'done'), [tasks])
  const act = async (t: Task, action: 'confirm' | 'done') => { await apiPost('/calendar/approve_tasks', { task_id: t.id, action }); await load() }
  // 任务详情（线上：描述 + 子任务 + 进度 + 开始课堂/删除任务）
  const [openTask, setOpenTask] = useState<Task | null>(null)
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
    <div className="mx-auto max-w-[1180px] px-8 pb-16 grid gap-6" style={{ gridTemplateColumns: '260px 1fr' }}>
      <aside className="space-y-4">
        <div className="hk-card p-4">
          <div className="text-[12px] text-[#8a8a90]">今日</div>
          <div className="text-[40px] font-semibold leading-none mt-1">{today.getDate()}</div>
          <div className="text-[12px] text-[#6b6b70] mt-1">{today.getMonth() + 1} 月 · 星期{WEEK[(today.getDay() + 6) % 7]}</div>
        </div>
        <div>
          <h3 className="text-[13px] font-semibold mb-2">今日待办</h3>
          {tasks === null && <div className="hk-skeleton h-16 rounded-xl" />}
          {tasks && todays.length === 0 && <div className="text-[12px] text-[#8a8a90] hk-card p-3">今天没有安排，去课程里加一个学习计划吧</div>}
          <ul className="space-y-2">{todays.map((t) => (
            <li key={t.id} className="hk-card p-3"><div className="text-[13px] font-medium leading-5">{t.title}</div><div className="text-[11px] text-[#8a8a90] mt-0.5 inline-flex items-center gap-1"><Clock size={10} />{t.duration_min ?? 30} 分钟 · {t.course_title ?? '学习任务'}</div>
              <div className="flex gap-1.5 mt-2">{t.status === 'pending' && <button onClick={() => act(t, 'confirm')} className="hk-pill h-7 text-[11px] px-2">确认</button>}<button onClick={() => act(t, 'done')} className="hk-pill h-7 text-[11px] px-2"><Check size={11} />完成</button></div></li>
          ))}</ul>
        </div>
        <div>
          <h3 className="text-[13px] font-semibold mb-2">已完成</h3>
          {dones.length === 0 ? <div className="text-[12px] text-[#8a8a90]">完成的任务会显示在这里</div> : <ul className="space-y-1 text-[12px] text-[#6b6b70]">{dones.slice(0, 6).map((t) => <li key={t.id} className="line-through truncate">{t.title}</li>)}</ul>}
        </div>
      </aside>

      <section className="hk-card p-4">
        <div className="flex items-center gap-2 flex-wrap">
          {([['all', '全部'], ['confirmed', '已确认'], ['pending', '待处理']] as const).map(([k, l]) => <button key={k} onClick={() => setFilter(k)} className="hk-pill h-8 text-[12px] data-[on=true]:bg-[#0a0a0a] data-[on=true]:text-white data-[on=true]:border-[#0a0a0a]" data-on={filter === k}>{l}</button>)}
          <button className="hk-pill h-8 text-[12px]"><CalendarPlus size={12} /> Google Calendar</button>
          <div className="ml-auto inline-flex rounded-full border p-0.5 text-[12px]">{(['week', 'month'] as const).map((v) => <button key={v} onClick={() => setView(v)} className="px-3 h-7 rounded-full data-[on=true]:bg-[#f1f2f4]" data-on={view === v}>{v === 'week' ? '周' : '月'}</button>)}</div>
          <div className="inline-flex items-center gap-1 text-[14px] font-semibold ml-2"><button className="hk-icon-btn h-7 w-7" onClick={() => setCursor((c) => new Date(c.getFullYear(), c.getMonth() - 1, 1))} aria-label="上个月"><ChevronLeft size={14} /></button>{cursor.getMonth() + 1}月 {cursor.getFullYear()}<button className="hk-icon-btn h-7 w-7" onClick={() => setCursor((c) => new Date(c.getFullYear(), c.getMonth() + 1, 1))} aria-label="下个月"><ChevronRight size={14} /></button></div>
        </div>
        <div className="grid grid-cols-7 mt-4 text-[11px] text-[#8a8a90]">{WEEK.map((w) => <div key={w} className="px-2 py-1">周{w}</div>)}</div>
        <div className="grid grid-cols-7 border-t border-l">
          {(view === 'month' ? days : days.filter((d) => { const wk = Math.floor(days.findIndex((x) => sameDay(x, today)) / 7); return days.indexOf(d) >= wk * 7 && days.indexOf(d) < wk * 7 + 7 })).map((d) => {
            const inMonth = d.getMonth() === cursor.getMonth(); const isToday = sameDay(d, today)
            const dayTasks = shown.filter((t) => sameDay(new Date(t.scheduled_for), d))
            return (
              <div key={d.toISOString()} className={`border-r border-b p-1.5 ${view === 'month' ? 'min-h-[92px]' : 'min-h-[240px]'} ${inMonth ? '' : 'bg-[#fafafa] text-[#c4c4c8]'} ${isToday ? 'ring-1 ring-inset ring-[#0a0a0a] rounded-md' : ''}`}>
                <div className={`text-[11px] ${isToday ? 'font-semibold' : ''}`}>{d.getDate()}</div>
                <div className="space-y-0.5 mt-1">{dayTasks.slice(0, 3).map((t, i) => <button key={t.id} onClick={() => setOpenTask(t)} className="text-[10px] px-1 py-0.5 rounded truncate inline-flex items-center gap-1 w-full text-left hover:brightness-95" style={{ background: COLORS[i % COLORS.length] }} title={t.title} data-testid="task-chip">{t.status === 'done' ? <Check size={9} /> : <Circle size={7} />}<span className="truncate">{t.title}</span></button>)}{dayTasks.length > 3 && <div className="text-[10px] text-[#8a8a90]">+{dayTasks.length - 3}</div>}</div>
              </div>
            )
          })}
        </div>
        {quota && (
          <div className="mt-4 hk-card p-3 text-[12px] text-[#6b6b70]" data-testid="quota-panel">
            <div className="font-medium text-[#3d3d3f] mb-1">本周配额</div>
            <div>文件生成 {quota.file_generation ? `${quota.file_generation.limit - quota.file_generation.remaining} 已用 / ${quota.file_generation.limit}` : '—'} 本周</div>
            <div>深度学习课堂 {quota.deep_learn_session ? `${quota.deep_learn_session.limit - quota.deep_learn_session.remaining} 已用 / ${quota.deep_learn_session.limit}` : '—'} 本周</div>
          </div>
        )}
      </section>

      {openTask && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50" onClick={() => setOpenTask(null)}>
          <div className="hk-card w-[520px] max-h-[70vh] overflow-auto p-5" role="dialog" onClick={(e) => e.stopPropagation()} data-testid="task-detail">
            <div className="text-[12px] text-[#8a8a90]">{new Date(openTask.scheduled_for).toLocaleString('zh-CN', { month: 'long', day: 'numeric', weekday: 'short', hour: '2-digit', minute: '2-digit' })}</div>
            <h3 className="text-[17px] font-semibold mt-1">{openTask.title}</h3>
            {openTask.description && <p className="text-[13px] text-[#6b6b70] mt-2 leading-6">{openTask.description}</p>}
            {(openTask.subtasks ?? []).length > 0 && (
              <div className="mt-3">
                <div className="text-[12px] text-[#8a8a90] mb-1.5">子任务 · 提前准备好的学习材料</div>
                <ul className="space-y-1.5">
                  {(openTask.subtasks ?? []).map((sub, index) => (
                    <li key={sub.subtask_id ?? index} className="flex items-center gap-2 text-[13px]">
                      <span className={`h-4 w-4 rounded-full flex items-center justify-center text-[10px] ${sub.status === 'done' ? 'bg-[#16a34a] text-white' : 'bg-[#f1f2f4]'}`}>{sub.status === 'done' ? '✓' : index + 1}</span>
                      <span className="flex-1 truncate">{sub.title ?? '学习材料'}</span>
                      {typeof openTask.progress === 'number' && <span className="text-[11px] text-[#8a8a90]">已完成 {openTask.progress}%</span>}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="flex items-center justify-end gap-2 mt-5">
              <button onClick={() => setConfirmDelete(openTask)} className="hk-pill h-9 px-4 text-[13px]" data-testid="delete-task">删除任务</button>
              <button onClick={() => void startClass(openTask)} className="h-9 px-5 rounded-full bg-[#0a0a0a] text-white text-[13px]" data-testid="start-class">开始课堂</button>
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
  )
}
