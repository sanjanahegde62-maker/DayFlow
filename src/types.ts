export type Role = 'ADMIN' | 'EMPLOYEE'

export interface User {
  id: string
  employeeId: string
  email: string
  firstName: string
  lastName: string
  role: Role
  designation?: string
  department?: string
}