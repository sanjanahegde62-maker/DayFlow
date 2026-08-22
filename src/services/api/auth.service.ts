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

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'

export const authService = {
  async login(payload: LoginPayload): Promise<AuthResponse> {
    if (USE_MOCK) {
      await new Promise((resolve) => setTimeout(resolve, 800))

      const isAdmin = payload.email.includes('admin') || payload.email.includes('hr')
      const mockUser: User = {
        id: isAdmin ? 'usr_admin_1' : 'usr_emp_1',
        employeeId: isAdmin ? 'EMP-001' : 'EMP-102',
        email: payload.email,
        firstName: isAdmin ? 'Admin' : 'John',
        lastName: isAdmin ? 'Officer' : 'Doe',
        role: isAdmin ? 'ADMIN' : 'EMPLOYEE',
        designation: isAdmin ? 'HR Manager' : 'Software Engineer',
        department: isAdmin ? 'Human Resources' : 'Engineering',
      }
      return { user: mockUser, token: 'mock-jwt-token-12345' }
    }

    const response = await apiClient.post<AuthResponse>('/auth/login', payload)
    return response.data
  },

  async signup(payload: SignupPayload): Promise<AuthResponse> {
    if (USE_MOCK) {
      await new Promise((resolve) => setTimeout(resolve, 800))

      const mockUser: User = {
        id: `usr_new_${Date.now()}`,
        employeeId: payload.employeeId,
        email: payload.email,
        firstName: 'New',
        lastName: 'Employee',
        role: payload.role,
      }
      return { user: mockUser, token: 'mock-jwt-token-67890' }
    }

    const response = await apiClient.post<AuthResponse>('/auth/signup', payload)
    return response.data
  },
}