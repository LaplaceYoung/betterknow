import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router'
import { Search, Plus, Star, PenLine, MessageSquare } from 'lucide-react'
import { apiGet, apiPost, type Conversation } from '@/lib/api'

interface DeepSession { deep_learn_session_id?: string; session_id?: string; title?: string; topic?: string; created_at?: string; status?: string }
const rel = (s?: string) => { if (!s) return ''; const ms = Date.now() - new Date(s).getTime(); const m = Math.floor(ms / 60000); if (m < 1) return '刚刚'; if (m < 60) return `${m} 分钟前`; const h = Math.floor(m / 60); if (h < 24) return `${h} 小时前`; const d = Math.floor(h / 24); return d < 30 ? `${d} 天前` : new Date(s).toLocaleDateString('zh-CN') }

// [S22][B2] 历史：对话列表 + 深度学习课堂，星标写回服务端
export default function History() {
  const nav = useNavigate()
  const [tab, setTab] = useState<'chat' | 'deep'>('chat')
  const [convs, setConvs] = useState<Conversation[] | null>(null)
  const [deep, setDeep] = useState<DeepSession[]>([])
  const [q, setQ] = useState('')
  const load = () => { apiGet<{ conversations: Conversation[] }>('/conversations/list_past_conversations').then((r) => setConvs(r.conversations)).catch(() => setConvs([])); apiGet<{ sessions: DeepSession[] }>('/deep_learn/list_deep_learn_session').then((r) => setDeep(r.sessions)).catch(() => {}) }
  useEffect(() => { load() }, [])
  const shown = useMemo(() => (convs ?? []).filter((c) => !q || c.title.toLowerCase().includes(q.toLowerCase())), [convs, q])
  const star = async (c: Conversation) => { await apiPost('/conversations/manage_conversation_property', { conversation_id: c.conversation_id, starred: !c.starred }); load() }

  return (
    <div className="mx-auto max-w-[880px] px-8 pb-16">
      <div className="flex items-center gap-3">
        <h1 className="text-[22px] font-semibold">历史</h1>
        <label className="ml-auto flex items-center gap-2 h-9 px-3 rounded-full border bg-white w-[240px]"><Search size={14} className="text-[#8a8a90]" /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="搜索历史会话" className="flex-1 bg-transparent outline-none text-[13px]" /></label>
        <button onClick={() => nav('/')} className="hk-pill h-9"><Plus size={14} /> 新建对话</button>
      </div>
      <div role="tablist" className="flex gap-1 mt-5 border-b text-[13px]">
        {([['chat', '对话'], ['deep', '深度学习课堂']] as const).map(([k, l]) => <button key={k} role="tab" aria-selected={tab === k} onClick={() => setTab(k)} className="relative px-3 h-9 text-[#6b6b70] data-[on=true]:text-black data-[on=true]:font-medium" data-on={tab === k}>{l}{tab === k && <span className="absolute left-3 right-3 -bottom-px h-0.5 bg-black" />}</button>)}
      </div>
      {tab === 'chat' ? (
        <div className="hk-card mt-4 divide-y">
          {convs === null && <div className="p-4"><div className="hk-skeleton h-5 rounded w-1/2" /></div>}
          {convs && shown.length === 0 && <div className="p-10 text-center text-[#8a8a90] text-[13px]">还没有对话记录</div>}
          {shown.map((c) => (
            <div key={c.conversation_id} className="flex items-center gap-3 px-4 py-3 hover:bg-[#fafafa]">
              <button onClick={() => nav(`/response/${c.conversation_id}`)} className="flex-1 min-w-0 text-left flex items-center gap-2">{c.board_session_types?.length ? <PenLine size={14} className="text-[#8a8a90]" /> : <MessageSquare size={14} className="text-[#8a8a90]" />}<span className="text-[14px] truncate">{c.title}</span></button>
              <span className="text-[12px] text-[#8a8a90] shrink-0">{rel(c.last_updated_at)}</span>
              <button onClick={() => star(c)} aria-label="星标" className="text-[#c4c4c8] hover:text-[#f59e0b]"><Star size={14} className={c.starred ? 'fill-[#f59e0b] text-[#f59e0b]' : ''} /></button>
            </div>
          ))}
        </div>
      ) : (
        <div className="hk-card mt-4 divide-y">
          {deep.length === 0 && <div className="p-10 text-center text-[#8a8a90] text-[13px]">还没有深度学习课堂<div className="mt-2"><button onClick={() => nav('/')} className="hk-pill">在首页开一个深度学习会话</button></div></div>}
          {deep.map((s) => <button key={s.deep_learn_session_id ?? s.session_id} onClick={() => nav(`/deep-learn-session/${s.deep_learn_session_id ?? s.session_id}`)} className="w-full text-left flex items-center gap-3 px-4 py-3 hover:bg-[#fafafa]"><span className="flex-1 text-[14px] truncate">{s.title ?? s.topic}</span><span className="text-[12px] text-[#8a8a90]">{rel(s.created_at)}</span></button>)}
        </div>
      )}
    </div>
  )
}
