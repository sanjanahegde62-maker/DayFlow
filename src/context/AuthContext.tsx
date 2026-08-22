import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { User } from '@/types'

const STORAGE_KEY = 'dayflow_auth'

interface AuthContextValue {
  user: User | null
  token: string | null
  setAuth: (user: User, token: string) => void
  clearAuth: () => void
}

const authContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window === 'undefined') return null

    try {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      return stored ? (JSON.parse(stored) as { user?: User | null }).user ?? null : null
    } catch {
      return null
    }
  })
  const [token, setToken] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null

    try {
      const stored = window.localStorage.getItem(STORAGE_KEY)
      return stored ? (JSON.parse(stored) as { token?: string | null }).token ?? null : null
    } catch {
      return null
    }
  })

  useEffect(() => {
    if (typeof window === 'undefined') return

    if (user && token) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ user, token }))
      return
    }

    window.localStorage.removeItem(STORAGE_KEY)
  }, [user, token])

  const setAuth = (nextUser: User, nextToken: string) => {
    setUser(nextUser)
    setToken(nextToken)
  }

  const clearAuth = () => {
    setUser(null)
    setToken(null)
  }

  return (
    <authContext.Provider value={{ user, token, setAuth, clearAuth }}>
      {children}
    </authContext.Provider>
  )
}

// The provider and hook intentionally share this module as the public auth API.
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(authContext)
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider')
  }
  return context
}
