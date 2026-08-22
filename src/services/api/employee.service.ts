import type { User } from '@/types'
import { apiClient } from './client'

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'

const mockEmployeeList: User[] = [
    {
        id: 'usr_emp_1',
        employeeId: 'EMP-102',
        email: 'user@company.com',
        firstName: 'John',
        lastName: 'Doe',
        role: 'EMPLOYEE',
        designation: 'Software Engineer',
        department: 'Engineering',
        phone: '+1 (555) 019-2834',
        address: '123 Main St, Tech City, CA',
        joiningDate: '2023-01-15',
    },
    {
        id: 'usr_emp_2',
        employeeId: 'EMP-103',
        email: 'jane.smith@company.com',
        firstName: 'Jane',
        lastName: 'Smith',
        role: 'EMPLOYEE',
        designation: 'UI/UX Designer',
        department: 'Design',
        phone: '+1 (555) 012-3456',
        address: '456 Innovation Ave, San Jose, CA',
        joiningDate: '2023-03-01',
    },
]

export const employeeService = {
    async getAllEmployees(): Promise<User[]> {
        if (USE_MOCK) {
            await new Promise((resolve) => setTimeout(resolve, 400))
            return mockEmployeeList
        }
        const response = await apiClient.get<User[]>('/employees')
        return response.data
    },

    async getEmployeeById(id: string): Promise<User> {
        if (USE_MOCK) {
            await new Promise((resolve) => setTimeout(resolve, 300))
            return mockEmployeeList.find((employee) => employee.id === id || employee.employeeId === id) ?? mockEmployeeList[0]
        }
        const response = await apiClient.get<User>(`/employees/${id}`)
        return response.data
    },

    async updateEmployeeProfile(id: string, updates: Partial<User>): Promise<User> {
        if (USE_MOCK) {
            await new Promise((resolve) => setTimeout(resolve, 500))
            const employee = mockEmployeeList.find((item) => item.id === id || item.employeeId === id) ?? mockEmployeeList[0]
            return { ...employee, ...updates }
        }
        const response = await apiClient.patch<User>(`/employees/${id}`, updates)
        return response.data
    },
}
