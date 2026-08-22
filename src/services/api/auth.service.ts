import axios from 'axios'
import type { User, Role } from '@/types'
import { apiClient } from './client'

export interface LoginPayload {
  email: string
  password: string
}

export interface SignupPayload {
  employeeId: string
  email: string
  password: string
  role: Role
}

export interface AuthResponse {
  user: User
  token: string
}

type BackendAuthResponse = {
  id: number | string
  employeeId: string
  email: string
  role: Role | string
  emailVerified: boolean
  token: string
}

const normalizeRole = (role: string | Role): Role => {
  if (role === 'ADMIN' || role === 'HR' || role === 'EMPLOYEE') return role
  return 'EMPLOYEE'
}

const toUser = (response: BackendAuthResponse): User => {
  const localPart = response.email.split('@')[0] ?? 'user'
  const [firstNameSeed, ...rest] = localPart.split(/[._-]+/).filter(Boolean)
  const firstName = (firstNameSeed ?? 'User').replace(/^./, (char) => char.toUpperCase())
  const lastName = (rest.join(' ') || 'Employee').replace(/\b\w/g, (char) => char.toUpperCase())

  return {
    id: String(response.id),
    employeeId: response.employeeId,
    email: response.email,
    firstName,
    lastName,
    role: normalizeRole(response.role),
    designation: normalizeRole(response.role) === 'ADMIN' ? 'Administrator' : normalizeRole(response.role) === 'HR' ? 'HR Manager' : 'Employee',
    department: normalizeRole(response.role) === 'HR' ? 'Human Resources' : 'Operations',
  }
}

const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const responseMessage = error.response?.data?.error ?? error.response?.data?.message ?? error.message
    return typeof responseMessage === 'string' ? responseMessage : 'Request failed'
  }

  if (error instanceof Error) return error.message
  return 'Request failed'
}

export const authService = {
  async login(payload: LoginPayload): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<BackendAuthResponse>('/auth/login', payload)
      return { user: toUser(response.data), token: response.data.token }
    } catch (error) {
      throw new Error(getErrorMessage(error))
    }
  },

  async signup(payload: SignupPayload): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<BackendAuthResponse>('/auth/signup', payload)
      return { user: toUser(response.data), token: response.data.token }
    } catch (error) {
      throw new Error(getErrorMessage(error))
    }
  },
}