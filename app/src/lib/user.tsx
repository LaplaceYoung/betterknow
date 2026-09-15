import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { apiGet, apiPost, getUserInfo, setUiLanguage as persistLang, uiLanguage } from './api'

export interface UserState {
  username: string
  tier: string
  credits: number
  maxCredits: number
  language: string
  loading: boolean
  refresh: () => Promise<void>
  setLanguage: (l: string) => void
}

const Ctx = createContext<UserState | null>(null)

export function UserProvider({ children }: { children: ReactNode }) {
  const [username, setUsername] = useState('')
  const [tier, setTier] = useState('free')
  const [credits, setCredits] = useState(0)
  const [maxCredits, setMaxCredits] = useState(0)
  const [language, setLang] = useState(uiLanguage())
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(async () => {
    try {
      const u = await getUserInfo()
      setUsername(u.username)
      setTier(u.tier)
      setCredits(u.remaining_credits)
      setMaxCredits(u.max_credits)
      const pref = await apiGet<{ ui_language?: string }>('/auth/preferences').catch(() => null)
      if (pref?.ui_language) { persistLang(pref.ui_language); setLang(pref.ui_language); document.documentElement.lang = pref.ui_language }
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { void refresh() }, [refresh])

  const setLanguage = useCallback((l: string) => { persistLang(l); setLang(l); document.documentElement.lang = l; void apiPost('/auth/update_preferences', { ui_language: l }).catch(() => {}) }, [])

  const value = useMemo<UserState>(() => ({ username, tier, credits, maxCredits, language, loading, refresh, setLanguage }), [username, tier, credits, maxCredits, language, loading, refresh, setLanguage])
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useUser(): UserState {
  const v = useContext(Ctx)
  if (!v) throw new Error('useUser outside UserProvider')
  return v
}
