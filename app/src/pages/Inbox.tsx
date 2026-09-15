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
    <div className="mx-auto max-w-[880px] px-8 pb-16">
      <h1 className="text-[22px] font-semibold">收件箱</h1>
      <div role="tablist" className="flex gap-1 mt-4 border-b text-[13px]">
        {([['messages', '消息'], ['feed', '动态']] as const).map(([k, l]) => <button key={k} role="tab" aria-selected={tab === k} onClick={() => setTab(k)} className="relative px-3 h-9 text-[#6b6b70] data-[on=true]:text-black data-[on=true]:font-medium" data-on={tab === k}>{l}{tab === k && <span className="absolute left-3 right-3 -bottom-px h-0.5 bg-black" />}</button>)}
      </div>
      {tab === 'messages' ? (
        <div className="hk-card mt-4">
          {msgs === null && <div className="p-4"><div className="hk-skeleton h-5 rounded w-1/2" /></div>}
          {msgs && msgs.length === 0 && <div className="p-12 text-center text-[#8a8a90] text-[13px]">暂无消息</div>}
          {msgs?.map((m) => <button key={m.id} onClick={() => open(m)} className="w-full text-left px-4 py-3 border-b last:border-b-0 hover:bg-[#fafafa] flex items-center gap-3">{!m.read && <span className="h-2 w-2 rounded-full bg-[#3b5bdb]" />}<span className="flex-1 min-w-0"><span className="block text-[14px] truncate">{m.title ?? m.snippet}</span></span><span className="text-[12px] text-[#8a8a90]">{m.created_at ? new Date(m.created_at).toLocaleDateString('zh-CN') : ''}</span></button>)}
        </div>
      ) : (
        <div className="hk-card mt-4 p-10 text-center text-[13px] text-[#8a8a90]">{banner || '暂无动态'}</div>
      )}
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
