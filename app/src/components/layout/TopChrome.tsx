import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { Languages, Gift, Check } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useUser } from '@/lib/user'
import { SettingsDialog } from '@/components/SettingsDialog'

const LANGS = [
  { code: 'en', label: 'English' },
  { code: 'zh', label: '简体中文' },
  { code: 'ko', label: '한국어' },
]

export function TopChrome() {
  const { tier, credits, language, setLanguage, username } = useUser()
  const nav = useNavigate()
  const loc = useLocation()
  const [settings, setSettings] = useState(false)
  const [settingsTab, setSettingsTab] = useState<'account' | 'byok' | 'subscription' | 'preferences' | 'memory' | 'general'>('byok')
  const isHome = loc.pathname === '/'

  const openSettings = (tab: 'account' | 'byok' | 'subscription' | 'preferences' | 'memory' | 'general' = 'account') => {
    setSettingsTab(tab)
    setSettings(true)
  }

  return (
    <div className="flex items-center justify-end gap-2 px-6" style={{ height: 56 }}>
      <button
        onClick={() => openSettings('byok')}
        className="hk-pill cursor-pointer hover:bg-[#f4f4f5] transition-colors"
        title="已启用 BYOK 模式 · 纯净无限制，所有外部模型均由用户配置驱动"
        aria-label="BYOK 模式"
      >
        <span className="text-[11px] font-semibold tracking-wide text-[#3d3d3f]">BYOK</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="var(--pro-gold)"><path d="M12 2l2.4 6.6L21 11l-6.6 2.4L12 20l-2.4-6.6L3 11l6.6-2.4z" /></svg>
        <span className="font-semibold">∞</span>
      </button>

      <Popover>
        <PopoverTrigger asChild>
          <button className="hk-icon-btn" aria-label="切换语言"><Languages size={16} /></button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-40 p-1 hk-pop" role="listbox">
          {LANGS.map((l) => (
            <button key={l.code} role="option" aria-selected={language === l.code} onClick={() => setLanguage(l.code)}
              className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-[13px] hover:bg-[#f4f4f5]">
              {l.label}{language === l.code && <Check size={14} />}
            </button>
          ))}
        </PopoverContent>
      </Popover>

      <button className="hk-pill" onClick={() => nav('/subscription')}><Gift size={14} /> 邀请好友</button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="h-8 w-8 rounded-full bg-[#1c1c1e] text-white text-[12px] font-semibold flex items-center justify-center overflow-hidden ring-1 ring-black/5" aria-label="账户菜单">
            <img src="/assets/orbie/orbie-avatar.png" alt="Orbie" className="h-full w-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none' }} />
            <span className="hidden only:inline">{username ? username.slice(0, 1).toUpperCase() : 'B'}</span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-44 hk-pop">
          <DropdownMenuItem onClick={() => openSettings('byok')}>模型与 BYOK 配置</DropdownMenuItem>
          <DropdownMenuItem onClick={() => nav('/subscription')}>BYOK 自由计划</DropdownMenuItem>
          <DropdownMenuItem onClick={() => openSettings('account')}>设置</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => { localStorage.clear(); nav('/signin') }}>退出登录</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <SettingsDialog open={settings} onOpenChange={setSettings} initialTab={settingsTab} />
    </div>
  )
}
