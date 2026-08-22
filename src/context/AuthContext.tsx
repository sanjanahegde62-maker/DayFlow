import { useState, type ReactNode } from 'react'
import type { User } from '@/types'
import { authContext } from './auth-context'

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
