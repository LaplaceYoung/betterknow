// 线上「待处理」视图（proactive-BmEDcKEX.js + r174 DOM/CSS 实证）：
// .pending-tasks-view > .sources-row-container > .sources-row > .source-column
//   source-header（.source-label「来源」+ .source-card：图标 / 标题 / 打开来源）
//   source-tasks-list（.tasks-label「提取的任务和截止日期」+ .pending-task-card*）
//   source-actions-footer（.source-action-btn 评论 + 确认所有任务 / 拒绝所有任务）
// 本仓差异：线上按 canvas/文件/公告 分组，本仓任务只带课程信息，因此按「课程 / 无来源」两档分组；
// 每张卡的日期区间用 scheduled_for + duration_min 推（本仓任务没有独立 due_at）。
export interface PendingTask {
  id: string
  title: string
  description?: string
  course_uuid?: string
  course_title?: string
  scheduled_for: string
  duration_min?: number
}

export interface PendingGroup {
  key: string
  title: string
  kind: 'course' | 'none'
  tasks: PendingTask[]
}

function fmtDay(date: Date): string {
  return `${date.getMonth() + 1}月${date.getDate()}日`
}

function endOf(task: PendingTask): Date {
  const start = new Date(task.scheduled_for)
  return new Date(start.getTime() + Math.max(30, task.duration_min ?? 30) * 60_000)
}

export function PendingTasksView({ groups, onOpen, onDecide, onBulk }: {
  groups: PendingGroup[]
  onOpen: (task: PendingTask, comment?: boolean) => void
  onDecide: (task: PendingTask, action: 'confirm' | 'reject') => void
  onBulk: (tasks: PendingTask[], action: 'confirm' | 'reject') => void
}) {
  if (groups.length === 0) {
    // 空态文案取自线上 pendingTasks.noPendingTasks；线上空态结构没抓到，样式用本仓的最小实现
    return <div className="pending-tasks-view" data-testid="pending-tasks-view"><p style={{ padding: '40px 0', textAlign: 'center', color: '#9ca3af', fontSize: 13 }}>没有待处理的任务</p></div>
  }
  return (
    <div className="pending-tasks-view" data-testid="pending-tasks-view">
      <div className="sources-row-container">
        <div className="sources-row">
          {groups.map((group, groupIndex) => (
            <div key={group.key} className="source-column source-column-enter" style={{ animationDelay: `${groupIndex * 0.05}s` }} data-testid="source-column">
              <div className="source-header">
                <div className="source-label">来源</div>
                <div className="source-card">
                  <div className="source-icon-container" aria-hidden="true">
                    {group.kind === 'course'
                      ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M4 5.5C4 4.67 4.67 4 5.5 4H11v16H5.5A1.5 1.5 0 014 18.5v-13Z" stroke="currentColor" strokeWidth="1.6" /><path d="M11 4h7.5c.83 0 1.5.67 1.5 1.5v13c0 .83-.67 1.5-1.5 1.5H11" stroke="currentColor" strokeWidth="1.6" /></svg>
                      : <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.6" /><path d="M12 8.5v4l2.5 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>}
                  </div>
                  <div className="source-details"><div className="source-title" title={group.title}>{group.title}</div></div>
                </div>
              </div>
              <div className="source-tasks-list">
                <div className="tasks-label">提取的任务和截止日期</div>
                {group.tasks.map((task) => {
                  const start = new Date(task.scheduled_for)
                  const end = endOf(task)
                  return (
                    <div key={task.id} className="pending-task-card" data-testid="pending-task-card">
                      <div className="pending-task-content">
                        <div className="pending-task-title">{task.title}</div>
                        {task.description && <div className="pending-task-subtitle">{task.description}</div>}
                        <div className="pending-task-dates-row">
                          <div className="pending-task-dates">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.6" /><path d="M12 8.5v4l2.5 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
                            <span>{fmtDay(start)}</span> - <span>{fmtDay(end)}</span>
                          </div>
                          <button type="button" className="date-edit-btn" title="编辑日期" aria-label="编辑日期" onClick={() => onOpen(task)}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 20h4L19 9l-4-4L4 16v4Z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                          </button>
                        </div>
                      </div>
                      <div className="pending-task-footer">
                        <div className="pending-task-actions-left">
                          <button type="button" className="task-card-action-btn comment" title="评论" aria-label="评论" onClick={() => onOpen(task, true)}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M21 12a8 8 0 01-11.6 7.2L4 21l1.8-5.4A8 8 0 1121 12z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                          </button>
                          <button type="button" className="task-card-action-btn confirm" title="确认" aria-label="确认" data-testid="pending-confirm" onClick={() => onDecide(task, 'confirm')}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                          </button>
                          <button type="button" className="task-card-action-btn reject" title="拒绝" aria-label="拒绝" data-testid="pending-reject" onClick={() => onDecide(task, 'reject')}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /><path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                          </button>
                        </div>
                        <button type="button" className="pending-task-action-btn" onClick={() => onOpen(task)}>查看 →</button>
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className="source-actions-footer">
                <button type="button" className="source-action-btn comment" title="评论" aria-label="评论" onClick={() => onOpen(group.tasks[0], true)}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M21 12a8 8 0 01-11.6 7.2L4 21l1.8-5.4A8 8 0 1121 12z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
                <div className="source-actions-right">
                  <button type="button" className="source-action-btn confirm" title="确认所有任务" aria-label="确认所有任务" data-testid="pending-confirm-all" onClick={() => onBulk(group.tasks, 'confirm')}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </button>
                  <button type="button" className="source-action-btn reject" title="拒绝所有任务" aria-label="拒绝所有任务" data-testid="pending-reject-all" onClick={() => onBulk(group.tasks, 'reject')}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /><path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
