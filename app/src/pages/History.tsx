import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { MessageSquare, PenLine, Plus, Search, Star, Trash2 } from 'lucide-react'
import { apiGet, apiPost, type Conversation } from '@/lib/api'

interface DeepSession { deep_learn_session_id?: string; session_id?: string; title?: string; topic?: string; created_at?: string; status?: string }
const rel = (s?: string) => { if (!s) return ''; const ms = Date.now() - new Date(s).getTime(); const m = Math.floor(ms / 60000); if (m < 1) return '刚刚'; if (m < 60) return `${m} 分钟前`; const h = Math.floor(m / 60); if (h < 24) return `${h} 小时前`; const d = Math.floor(h / 24); if (d < 30) return `${d} 天前`; return new Date(s).toLocaleDateString('zh-CN') }

// 线上历史页的分组：今天 / 本周 / 更早（.sh-group-label 大写小字）
function groupOf(iso?: string): string {
  if (!iso) return '更早'
  const now = new Date()
  const d = new Date(iso)
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()
  if (d.getTime() >= startOfToday) return '今天'
  if (d.getTime() >= startOfToday - 6 * 86400000) return '本周'
  return '更早'
}
const GROUP_ORDER = ['今天', '本周', '更早']

// [S22][B2] 历史：按时间分组的行表（线上 .sh-* 骨架）+ 深度学习课堂，星标写回服务端
export default function History() {
  const nav = useNavigate()
  const [tab, setTab] = useState<'chat' | 'deep'>('chat')
  const [convs, setConvs] = useState<Conversation[] | null>(null)
  const [deep] = useState<DeepSession[]>([])
  const [q, setQ] = useState('')
  const [onlyStarred, setOnlyStarred] = useState(false)
  const [menuFor, setMenuFor] = useState<string | null>(null)
  const [filterOpen, setFilterOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const filterRef = useRef<HTMLDivElement>(null)
  // 线上 .sh-scroll--scrolled：滚动后顶部也加渐隐
  useEffect(() => {
    const onDown = (e: MouseEvent) => { if (filterRef.current && !filterRef.current.contains(e.target as Node)) { setFilterOpen(false); setMenuFor(null) } }
    window.addEventListener('mousedown', onDown)
    return () => window.removeEventListener('mousedown', onDown)
  }, [])
  const load = () => { apiGet<{ conversations: Conversation[] }>('/conversations/list_past_conversations').then((r) => setConvs(r.conversations)).catch(() => setConvs([])) }
  useEffect(() => { load() }, [])
  const shown = useMemo(
    () => (convs ?? []).filter((c) => (!q || c.title.toLowerCase().includes(q.toLowerCase())) && (!onlyStarred || c.starred)),
    [convs, q, onlyStarred]
  )
  const grouped = useMemo(() => {
    const buckets = new Map<string, Conversation[]>()
    for (const c of shown) {
      const key = groupOf(c.last_updated_at)
      buckets.set(key, [...(buckets.get(key) ?? []), c])
    }
    return GROUP_ORDER.filter((k) => buckets.has(k)).map((k) => ({ label: k, items: buckets.get(k)! }))
  }, [shown])
  const star = async (c: Conversation) => { await apiPost('/conversations/manage_conversation_property', { conversation_id: c.conversation_id, starred: !c.starred }).catch(() => {}); load() }
  const remove = async (c: Conversation) => { await apiPost('/conversations/delete_conversation', { conversation_id: c.conversation_id }).catch(() => {}); setMenuFor(null); load() }

  return (
    <div className="sh-page" data-testid="history-page">
      <div className="sh-inner">
        <div className="sh-header">
          <h1 className="sh-title">历史</h1>
          <div className="sh-header-right">
            <label className="sh-search-wrap">
              <Search size={14} className="sh-search-icon" />
              <input className="sh-search" aria-label="搜索历史" placeholder="搜索对话" value={q} onChange={(e) => setQ(e.target.value)} />
            </label>
            <button className="sh-new-conversation-btn" onClick={() => nav('/')}><Plus size={14} /> 新建对话</button>
          </div>
        </div>

        <div className="sh-toolbar">
          <div role="tablist" className="sh-tabs">
            {([['chat', '对话'], ['deep', '深度学习课堂']] as const).map(([k, l]) => (
              <button key={k} role="tab" aria-selected={tab === k} onClick={() => setTab(k)} className={`sh-tab ${tab === k ? 'active' : ''}`}>{l}</button>
            ))}
          </div>
          {tab === 'chat' && (
            <div className="sh-filter-wrap" ref={filterRef}>
              <button className={`sh-filter-btn ${onlyStarred ? 'active' : ''} ${filterOpen ? 'open' : ''}`} aria-label="筛选" aria-expanded={filterOpen}
                data-testid="history-filter" onClick={() => setFilterOpen((v) => !v)}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M2 4h12M4 8h8M6 12h4" stroke={onlyStarred ? '#374151' : '#6B7280'} strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                {onlyStarred && <span className="sh-filter-badge" />}
              </button>
              {filterOpen && (
                <div className="sh-filter-dropdown" role="menu" data-testid="history-filter-menu">
                  <button className={`sh-filter-option ${onlyStarred ? 'selected' : ''}`} role="menuitemcheckbox" aria-checked={onlyStarred}
                    onClick={() => { setOnlyStarred((v) => !v); setFilterOpen(false) }}>
                    <Star size={16} style={onlyStarred ? { color: '#f59e0b', fill: '#f59e0b' } : undefined} />仅收藏
                    {onlyStarred && <span className="sh-option-check" aria-hidden="true">✓</span>}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className={`sh-scroll hk-scroll ${scrolled ? 'sh-scroll--scrolled' : ''}`} onScroll={(e) => setScrolled(e.currentTarget.scrollTop > 8)}>
          {tab === 'chat' ? (
            <>
              {convs === null && <div className="sh-list"><div className="p-4"><div className="hk-skeleton h-5 rounded w-1/2" /></div></div>}
              {convs && shown.length === 0 && <div className="sh-list"><div className="p-10 text-center text-[#8a8a90] text-[13px]">还没有对话记录</div></div>}
              {grouped.map((g) => (
                <div className="sh-group" key={g.label}>
                  <p className="sh-group-label">{g.label}</p>
                  <ul className="sh-list">
                    {g.items.map((c) => (
                      <li key={c.conversation_id}>
                        <div className="sh-row" role="button" tabIndex={0} onClick={() => nav(`/response/${c.conversation_id}`)} onKeyDown={(e) => e.key === 'Enter' && nav(`/response/${c.conversation_id}`)}>
                          <span className="sh-row-icon"><MessageSquare size={16} className="sh-row-kind-icon" /></span>
                          <span className="sh-row-title">{c.title}</span>
                          {c.board_session_types?.length ? <span className="sh-row-date" title="含白板课堂">白板</span> : null}
                          <span className="sh-row-date">{rel(c.last_updated_at)}</span>
                          <span className="sh-row-actions">
                            <button className={`sh-row-menu-btn ${c.starred ? 'is-starred' : ''}`} aria-label={c.starred ? '取消星标' : '星标'}
                              onClick={(e) => { e.stopPropagation(); void star(c) }}>
                              <Star size={15} style={c.starred ? { color: '#f59e0b', fill: '#f59e0b' } : undefined} />
                            </button>
                            <button className="sh-row-menu-btn" aria-label="更多操作" onClick={(e) => { e.stopPropagation(); setMenuFor(menuFor === c.conversation_id ? null : c.conversation_id) }}>
                              ⋯
                            </button>
                            {menuFor === c.conversation_id && (
                              <span className="sh-filter-dropdown" role="menu">
                                <button className="sh-filter-option" role="menuitem" onClick={(e) => { e.stopPropagation(); void remove(c) }}>
                                  <Trash2 size={15} style={{ color: '#e71414' }} /><span style={{ color: '#e71414' }}>删除对话</span>
                                </button>
                              </span>
                            )}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </>
          ) : (
            <ul className="sh-list">
              {deep.length === 0 && <li className="p-10 text-center text-[#8a8a90] text-[13px]">还没有深度学习课堂</li>}
              {deep.map((s) => (
                <li key={s.deep_learn_session_id ?? s.session_id}>
                  <div className="sh-row" role="button" tabIndex={0} onClick={() => nav(`/deep-learn-session/outline/${s.deep_learn_session_id ?? s.session_id}`)}>
                    <span className="sh-row-icon"><PenLine size={16} className="sh-row-kind-icon" /></span>
                    <span className="sh-row-title">{s.title ?? s.topic ?? '深度学习课堂'}</span>
                    <span className="sh-row-date">{rel(s.created_at)}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
