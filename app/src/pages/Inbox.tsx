import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { apiGet, apiPost } from '@/lib/api'

interface Msg { id: string; title?: string; body?: string; snippet?: string; created_at?: string; read?: boolean; kind?: string }

export function Inbox() {
  const nav = useNavigate()
  const [tab, setTab] = useState<'messages' | 'feed'>('messages')
  const [msgs, setMsgs] = useState<Msg[] | null>(null)
  const [banner, setBanner] = useState('')
  useEffect(() => {
    apiGet<{ messages: Msg[] }>('/usr-msg-inbox/get_message').then((r) => setMsgs(r.messages)).catch(() => setMsgs([]))
    apiGet<{ has_message?: boolean; message?: Msg }>('/banner/get_banner_message').then((r) => setBanner(r.message?.body ?? '')).catch(() => {})
  }, [])
  const open = async (m: Msg) => { await apiPost('/usr-msg-inbox/mark_read', { message_id: m.id }); nav(`/inbox/message/${m.id}`) }
  return (
    <div className="inbox-page">
      <div className="inbox-page-header">
        <h1 className="inbox-page-title">收件箱</h1>
        <div className="inbox-tabs" role="tablist">
          {([['messages', '消息'], ['feed', '动态']] as const).map(([k, l]) => (
            <button key={k} role="tab" aria-selected={tab === k} data-active={tab === k} onClick={() => setTab(k)} className="inbox-tab">{l}</button>
          ))}
        </div>
      </div>
      <div className="inbox-scroll">
        {tab === 'messages' ? (
          <>
            {msgs === null && <div className="p-4"><div className="hk-skeleton h-5 rounded w-1/2" /></div>}
            {msgs && msgs.length === 0 && <div className="inbox-updates-placeholder">暂无消息</div>}
            {msgs && msgs.length > 0 && (
              <ul className="inbox-notification-list">
                {msgs.map((m) => (
                  <li key={m.id}>
                    <div role="button" tabIndex={0} onClick={() => open(m)} onKeyDown={(e) => e.key === 'Enter' && open(m)} className="inbox-notification-item">
                      <div className="flex-1 min-w-0">
                        <div style={{ fontSize: 15, fontWeight: 600, color: '#1a1a1a' }}>{m.title ?? '消息'}</div>
                        <div style={{ marginTop: 6, fontSize: 13.5, lineHeight: 1.6, color: '#6b7280' }} className="line-clamp-2">{m.body ?? m.snippet ?? ''}</div>
                      </div>
                      <span style={{ fontSize: 12, color: '#9ca3af', flexShrink: 0 }}>{(m.created_at ?? '').slice(0, 10)}</span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </>
        ) : (
          <div className="inbox-updates-placeholder">{banner || '暂无动态'}</div>
        )}
      </div>
    </div>
  )
}

export function InboxMessage() {
  const { messageId = '' } = useParams()
  const nav = useNavigate()
  const [msg, setMsg] = useState<Msg | null>(null)
  useEffect(() => { apiGet<{ messages: Msg[] }>('/usr-msg-inbox/get_message').then((r) => setMsg(r.messages.find((m) => m.id === messageId) ?? null)).catch(() => {}) }, [messageId])
  return (
    <div className="mx-auto max-w-[720px] px-8 pb-16">
      <button onClick={() => nav('/inbox')} className="text-[13px] text-[#6b6b70] hover:text-black mb-4">‹ 返回收件箱</button>
      <div className="hk-card p-6"><h1 className="text-[18px] font-semibold">{msg?.title ?? '消息'}</h1><p className="mt-3 text-[14px] leading-7 text-[#3d3d3f] whitespace-pre-wrap">{msg?.body ?? msg?.snippet ?? '消息不存在或已删除。'}</p></div>
    </div>
  )
}
