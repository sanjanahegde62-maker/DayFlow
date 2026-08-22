import { createContext, useContext, useState, type ReactNode } from 'react'
import type { User } from '@/types'

interface AuthContextValue {
  user: User | null
  token: string | null
  setAuth: (user: User, token: string) => void
  clearAuth: () => void
}

const authContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)

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
