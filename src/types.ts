export type Role = 'ADMIN' | 'HR' | 'EMPLOYEE'

export interface User {
  id: string
  employeeId: string
  email: string
  firstName: string
  lastName: string
  role: Role
  designation?: string
  department?: string
  phone?: string
  address?: string
  joiningDate?: string
}