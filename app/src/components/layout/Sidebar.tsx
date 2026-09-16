import { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router'
import { Ellipsis, ChevronDown, ChevronUp, Sparkles, FolderOpen, Settings, Bell } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { getConversations, type Conversation, type CourseRef } from '@/lib/api'
import { useUser } from '@/lib/user'
import { HkLogo, HkHomeIcon, HkCoursesIcon, HkLearningFeedIcon, HkHistoryIcon, HkStoreIcon, HkBoardSessionIcon } from '@/components/HkIcons'
import { SettingsDialog } from '@/components/SettingsDialog'
import { WhatsNewDialog } from '@/components/WhatsNewDialog'

const RAIL = [
  { to: '/', label: '首页', icon: HkHomeIcon },
  { to: '/courses', label: '课程', icon: HkCoursesIcon },
  { to: '/learning-feed', label: '学习动态', icon: HkLearningFeedIcon },
  { to: '/history', label: '历史', icon: HkHistoryIcon },
  { to: '/marketplace', label: '课程集市', icon: HkStoreIcon },
]

export function Sidebar() {
  const nav = useNavigate()
  const { username } = useUser()
  const [recent, setRecent] = useState<Conversation[]>([])
  const [recentCourse, setRecentCourse] = useState<CourseRef | null>(null)
  const [collapsed, setCollapsed] = useState(false)
  const [settings, setSettings] = useState(false)
  const [settingsTab, setSettingsTab] = useState<'account' | 'byok' | 'preferences'>('byok')
  const [whatsNew, setWhatsNew] = useState(false)

  useEffect(() => {
    getConversations().then((r) => { setRecent(r.conversations.slice(0, 6)); setRecentCourse(r.recent_course) }).catch(() => {})
  }, [])

  return (
    <aside
      className="flex flex-col shrink-0 hk-scroll"
      style={{ width: 'var(--sidebar-width)', margin: 'var(--sidebar-margin)', marginRight: 0, borderRadius: 'var(--sidebar-radius)', background: 'var(--sidebar-bg)', border: '1px solid var(--sidebar-border)', height: 'calc(100vh - 24px)', overflowY: 'auto' }}
    >
      <div className="flex items-center justify-between px-4" style={{ height: 56 }}>
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => nav('/')}>
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-[#0a0a0a] text-white shadow-sm"><HkLogo size={18} /></span>
          <span className="font-semibold text-[16px] tracking-tight">betterknow</span>
        </div>
        <button onClick={() => setWhatsNew(true)} className="hk-icon-btn h-7 w-7 text-[#8a8a90] hover:text-[#0a0a0a]" title="最新动态" aria-label="最新动态">
          <Bell size={14} />
        </button>
      </div>

      <nav className="px-3 flex flex-col gap-0.5">
        {RAIL.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} end={to === '/'} className="block">
            {({ isActive }) => (
              <span className="hk-rail-item" data-active={isActive}>
                <Icon size={18} />
                <span>{label}</span>
              </span>
            )}
          </NavLink>
        ))}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="hk-rail-item w-full" aria-label="更多选项">
              <Ellipsis size={18} strokeWidth={1.8} />
              <span>更多选项</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48 hk-pop">
            <DropdownMenuItem onClick={() => nav('/knowledge-base')}><FolderOpen size={16} /> 知识库</DropdownMenuItem>
            <DropdownMenuItem onClick={() => nav('/inbox')}>收件箱</DropdownMenuItem>
            <DropdownMenuItem onClick={() => { setSettingsTab('byok'); setSettings(true); }}><Sparkles size={16} /> 模型与 BYOK</DropdownMenuItem>
            <DropdownMenuItem onClick={() => { setSettingsTab('account'); setSettings(true); }}>偏好与设置</DropdownMenuItem>
            <DropdownMenuItem onClick={() => nav('/subscription')}>BYOK 自由计划</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>

      <SettingsDialog open={settings} onOpenChange={setSettings} initialTab={settingsTab} />
      <WhatsNewDialog open={whatsNew} onOpenChange={setWhatsNew} />

      {/* 线上 .sidebar-resume-section（padding 0 12px 0 24px）+ .sidebar-resume-card */}
      <section className="mt-5" style={{ padding: '0 12px 0 24px' }}>
        <h3 className="hk-section-title mb-2">继续学习</h3>
        <button
          onClick={() => recentCourse && nav(`/course/${recentCourse.uuid}`)}
          className="w-full text-left flex flex-col hover:shadow-sm transition-shadow"
          style={{ borderRadius: 10, border: '1px solid #e8ecf3', background: '#fff', padding: '10px 11px', gap: 5 }}
        >
          <div className="flex items-center" style={{ gap: 7 }}>
            <span style={{ fontSize: 10, lineHeight: '14px', color: '#4c6696', background: '#eef2f8', border: '1px solid rgba(76,102,150,.16)', borderRadius: 999, padding: '1px 7px' }}>讲座</span>
            <span className="truncate" style={{ fontSize: 12.5, lineHeight: '16.875px', fontWeight: 600, color: '#1f2937' }}>{recentCourse ? (recentCourse.next_lecture ?? recentCourse.title) : '开始第一门课'}</span>
          </div>
          <div className="truncate" style={{ fontSize: 11, lineHeight: '14.3px', color: '#8a8c93' }}>{recentCourse?.title ?? '从课程集市挑一门'}</div>
        </button>
      </section>

      <section className="px-4 mt-5 flex-1 min-h-[140px]">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-[12px] text-[#6b6b70]">近期活动</h3>
          <button className="text-[#8a8a90] hover:text-[#3d3d3f]" aria-label="折叠近期活动" onClick={() => setCollapsed((c) => !c)}>
            {collapsed ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
          </button>
        </div>
        {!collapsed && (
          <ul className="flex flex-col gap-0.5">
            {recent.length === 0 && (
              <li className="text-[12px] text-[#8a8a90] leading-5 py-1">暂无活动记录<br />开始新对话或新会话以在此处查看您的历史记录</li>
            )}
            {recent.map((c) => (
              <li key={c.conversation_id}>
                <button onClick={() => nav(`/response/${c.conversation_id}`)} className="w-full flex items-center justify-between text-left conversation-item text-[#3d3d3f] hover:text-black py-1.5 rounded-md">
                  <span className="truncate">{c.title}</span>
                  {c.board_session_types?.length ? <HkBoardSessionIcon size={14} className="text-[#8a8a90] shrink-0" /> : null}
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* User profile footer */}
      <div className="p-3 mt-auto border-t border-[#e4e4e7]/60">
        <div className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-[#f1f2f4] transition-colors">
          <div className="h-8 w-8 rounded-full bg-[#0a0a0a] text-white flex items-center justify-center text-[12px] font-semibold shrink-0">
            {username ? username.charAt(0).toUpperCase() : 'B'}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[13px] font-medium text-[#0a0a0a] truncate">{username || '学习者'}</div>
            <div className="text-[11px] text-[#8a8a90] flex items-center gap-1">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#16a34a]" />
              BYOK 自由模式
            </div>
          </div>
          <button
            onClick={() => { setSettingsTab('account'); setSettings(true); }}
            className="hk-icon-btn h-7 w-7 text-[#6b6b70] hover:text-black"
            aria-label="设置"
          >
            <Settings size={14} />
          </button>
        </div>
      </div>
    </aside>
  )
}
