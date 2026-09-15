import { useEffect, useState, type FormEvent } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router'
import { Eye, EyeOff, Sparkles, ChevronRight, Check } from 'lucide-react'
import { apiGet, apiPost } from '@/lib/api'

function Shell({ children, title, sub }: { children: React.ReactNode; title: string; sub?: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{ background: 'var(--app-bg)' }}>
      <div className="w-full max-w-[420px]">
        <div className="flex items-center gap-2 justify-center mb-8"><span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[#0a0a0a] text-white"><Sparkles size={16} /></span><span className="text-[20px] font-semibold tracking-tight">betterknow</span></div>
        <div className="hk-card p-7">
          <h1 className="text-[22px] font-semibold">{title}</h1>
          {sub && <p className="text-[13px] text-[#6b6b70] mt-1">{sub}</p>}
          <div className="mt-6">{children}</div>
        </div>
      </div>
    </div>
  )
}
const Field = ({ id, label, type = 'text', value, onChange, right }: { id: string; label: string; type?: string; value: string; onChange: (v: string) => void; right?: React.ReactNode }) => (
  <label className="block text-[13px] mb-3"><span className="block mb-1.5 text-[#3d3d3f]">{label}</span><div className="relative"><input id={id} type={type} value={value} onChange={(e) => onChange(e.target.value)} required className="w-full h-11 px-3 rounded-xl border bg-white outline-none focus:border-[#a1a1aa] pr-10" />{right && <span className="absolute right-3 top-1/2 -translate-y-1/2">{right}</span>}</div></label>
)
const Primary = ({ children, disabled }: { children: React.ReactNode; disabled?: boolean }) => <button type="submit" disabled={disabled} className="w-full h-11 rounded-xl bg-[#0a0a0a] text-white font-medium disabled:opacity-50">{children}</button>

// [S27] 登录：POST /auth/login → token → 首页 / onboarding
export function SignIn() {
  const nav = useNavigate(); const loc = useLocation() as { state?: { from?: { pathname: string } } }
  const [email, setEmail] = useState(''); const [pw, setPw] = useState(''); const [show, setShow] = useState(false); const [err, setErr] = useState(''); const [busy, setBusy] = useState(false)
  const submit = async (e: FormEvent) => {
    e.preventDefault(); setBusy(true); setErr('')
    try {
      const r = await fetch('/api/v1/auth/login', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ email, password: pw }) })
      const j = await r.json() as { success?: boolean; data?: { access_token: string; refresh_token: string; user_id: string; username: string }; onboarding_completed?: boolean; detail?: string }
      if (!r.ok || !j.data) throw new Error(j.detail ?? '登录失败')
      localStorage.setItem('access_token', j.data.access_token); localStorage.setItem('refresh_token', j.data.refresh_token); localStorage.setItem('user_id', j.data.user_id); localStorage.setItem('username', j.data.username); localStorage.setItem('token_timestamp', String(Date.now()))
      nav(j.onboarding_completed === false ? '/onboarding' : (loc.state?.from?.pathname ?? '/'), { state: { fromLogin: true } })
    } catch (e) { setErr(e instanceof Error ? e.message : '登录失败') } finally { setBusy(false) }
  }
  return (
    <Shell title="欢迎回来" sub="登录以继续你的学习">
      <form onSubmit={submit}>
        <Field id="email" label="邮箱" type="email" value={email} onChange={setEmail} />
        <Field id="password" label="密码" type={show ? 'text' : 'password'} value={pw} onChange={setPw} right={<button type="button" onClick={() => setShow((s) => !s)} aria-label={show ? 'Hide password' : 'Show password'} className="text-[#8a8a90]">{show ? <EyeOff size={15} /> : <Eye size={15} />}</button>} />
        {err && <div className="text-[12px] text-[#dc2626] mb-3">{err}</div>}
        <Primary disabled={busy}>登录</Primary>
        <button type="button" className="w-full h-11 mt-2 rounded-xl border bg-white text-[13px] font-medium">使用 Google 登录</button>
        <div className="flex justify-between mt-4 text-[12px] text-[#6b6b70]"><Link to={`/forgot-password?email=${encodeURIComponent(email)}`} className="hover:text-black">忘记密码？</Link><Link to="/signup" className="hover:text-black">注册账号</Link></div>
      </form>
    </Shell>
  )
}

export function SignUp() {
  const nav = useNavigate(); const [sp] = useSearchParams()
  const [name, setName] = useState(''); const [email, setEmail] = useState(''); const [pw, setPw] = useState(''); const [err, setErr] = useState(''); const [busy, setBusy] = useState(false)
  const submit = async (e: FormEvent) => {
    e.preventDefault(); setBusy(true); setErr('')
    try {
      const r = await fetch('/api/v1/auth/register', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ username: name, email, password: pw, friend_referral_code: sp.get('ref') ?? undefined }) })
      const j = await r.json() as { data?: { access_token: string; refresh_token: string; user_id: string; username: string }; detail?: string }
      if (!r.ok || !j.data) throw new Error(j.detail ?? '注册失败')
      localStorage.setItem('access_token', j.data.access_token); localStorage.setItem('user_id', j.data.user_id); localStorage.setItem('username', j.data.username)
      nav('/onboarding')
    } catch (e) { setErr(e instanceof Error ? e.message : '注册失败') } finally { setBusy(false) }
  }
  return (
    <Shell title="创建账号" sub={sp.get('ref') ? '通过好友邀请加入，开启高效自主学习' : '完全免费开始，支持 BYOK 自带模型密钥自由探索'}>
      <form onSubmit={submit}>
        <Field id="username" label="用户名" value={name} onChange={setName} />
        <Field id="email" label="邮箱" type="email" value={email} onChange={setEmail} />
        <Field id="password" label="密码" type="password" value={pw} onChange={setPw} />
        {err && <div className="text-[12px] text-[#dc2626] mb-3">{err}</div>}
        <Primary disabled={busy}>注册</Primary>
        <div className="text-center mt-4 text-[12px] text-[#6b6b70]">已有账号？<Link to="/signin" className="hover:text-black ml-1">登录</Link></div>
      </form>
    </Shell>
  )
}

export function ForgotPassword() {
  const [sp] = useSearchParams(); const [email, setEmail] = useState(sp.get('email') ?? ''); const [sent, setSent] = useState(false)
  return <Shell title="重置密码" sub="我们会给你的邮箱发送重置链接">{sent ? <div className="text-[13px]"><Check className="inline text-[#16a34a]" size={14} /> 如果该邮箱已注册，重置邮件已发送。<div className="mt-4"><Link to="/signin" className="hk-pill">返回登录</Link></div></div> : <form onSubmit={(e) => { e.preventDefault(); setSent(true) }}><Field id="email" label="邮箱" type="email" value={email} onChange={setEmail} /><Primary>发送重置邮件</Primary></form>}</Shell>
}
export function ResetPassword() {
  const nav = useNavigate(); const [pw, setPw] = useState(''); const [pw2, setPw2] = useState('')
  return <Shell title="设置新密码"><form onSubmit={(e) => { e.preventDefault(); if (pw === pw2) nav('/signin') }}><Field id="password" label="新密码" type="password" value={pw} onChange={setPw} /><Field id="password2" label="确认新密码" type="password" value={pw2} onChange={setPw2} /><Primary disabled={!pw || pw !== pw2}>更新密码</Primary></form></Shell>
}
export function AccountDeleted() { return <Shell title="账号已删除" sub="你的数据已从 betterknow 移除，感谢一路相伴。"><Link to="/signup" className="hk-pill">重新注册</Link></Shell> }
export function WelcomeBack() { const nav = useNavigate(); return <Shell title="欢迎回来 👋" sub="我们保留了你的学习进度，随时继续。"><button onClick={() => nav('/')} className="w-full h-11 rounded-xl bg-[#0a0a0a] text-white font-medium inline-flex items-center justify-center gap-1">继续学习 <ChevronRight size={14} /></button></Shell> }
export function AuthCallback() { const nav = useNavigate(); useEffect(() => { const t = setTimeout(() => nav('/'), 800); return () => clearTimeout(t) }, [nav]); return <Shell title="正在登录…" sub="正在完成 Google 授权"><div className="hk-skeleton h-3 rounded" /></Shell> }

// [S27] Onboarding：语言 / 来源 / 学习身份 三问 + 产品导览
interface OnbQ { step: number; title: string; options: { label: string; subtext?: string }[] }
export function Onboarding() {
  const nav = useNavigate()
  const [qs, setQs] = useState<OnbQ[]>([])
  const [step, setStep] = useState(0)
  const [ans, setAns] = useState<Record<number, string>>({})
  useEffect(() => { apiGet<{ questions: OnbQ[] }>('/onboarding/questions').then((r) => setQs(r.questions)).catch(() => setQs([])) }, [])
  const q = qs[step]
  const finish = async () => { await apiPost('/onboarding/manage_onboarding', { general_onboarding: true, answers: ans }).catch(() => {}); localStorage.setItem('onboarding_completed', 'true'); nav('/') }
  const TOUR = [['打造课程', '一句话生成结构完整的课程：研究资料 → 大纲 → 逐讲讲解、练习与测验'], ['即时协助', '像和导师聊天一样提问，生成速查表、测验、闪卡，或开一节白板课堂'], ['学习动态', '把学习计划排进日历，每天知道该学什么']]
  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{ background: 'var(--app-bg)' }}>
      <div className="w-full max-w-[640px]">
        <div className="flex gap-1.5 mb-6">{Array.from({ length: (qs.length || 3) + 1 }).map((_, i) => <span key={i} className="h-1 flex-1 rounded-full" style={{ background: i <= step ? '#0a0a0a' : '#e4e4e7' }} />)}</div>
        {q ? (
          <div className="hk-card p-8 hk-fade-in-up" key={step}>
            <div className="text-[12px] text-[#8a8a90]">第 {step + 1} 步，共 {qs.length} 步</div>
            <h1 className="text-[24px] font-semibold mt-1">{q.title}</h1>
            <div className="mt-6 grid gap-2">{q.options.map((o) => <button key={o.label} onClick={() => setAns((a) => ({ ...a, [q.step]: o.label }))} className="text-left px-4 py-3 rounded-xl border hover:border-[#a1a1aa] data-[on=true]:border-[#0a0a0a] data-[on=true]:bg-[#fafafa]" data-on={ans[q.step] === o.label}><span className="text-[14px] font-medium">{o.label}</span>{o.subtext && <span className="block text-[12px] text-[#6b6b70] mt-0.5">{o.subtext}</span>}</button>)}</div>
            <div className="flex justify-between mt-6"><button onClick={() => setStep((s) => Math.max(0, s - 1))} className="hk-pill" disabled={step === 0}>上一步</button><button disabled={!ans[q.step]} onClick={() => setStep((s) => s + 1)} className="h-10 px-5 rounded-full bg-[#0a0a0a] text-white disabled:opacity-40">继续</button></div>
          </div>
        ) : (
          <div className="hk-card p-8 hk-fade-in-up">
            <h1 className="text-[24px] font-semibold">欢迎来到 betterknow</h1><p className="text-[13px] text-[#6b6b70] mt-1">三件事，带你用好它</p>
            <div className="grid grid-cols-3 gap-3 mt-6">{TOUR.map(([t, d], i) => <div key={t} className="rounded-xl border p-4"><div className="h-24 rounded-lg mb-3" style={{ background: ['#e9ecf5', '#eef0e6', '#f5f1de'][i] }} /><div className="text-[14px] font-medium">{t}</div><p className="text-[12px] text-[#6b6b70] mt-1 leading-5">{d}</p></div>)}</div>
            <div className="flex justify-end mt-6"><button onClick={finish} className="h-10 px-5 rounded-full bg-[#0a0a0a] text-white inline-flex items-center gap-1">开始使用 <ChevronRight size={14} /></button></div>
          </div>
        )}
      </div>
    </div>
  )
}
