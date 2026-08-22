import { createContext } from 'react'
import type { User } from '@/types'

export interface AuthContextValue {
    user: User | null
    token: string | null
    setAuth: (user: User, token: string) => void
    clearAuth: () => void
}

export const authContext = createContext<AuthContextValue | undefined>(undefined)