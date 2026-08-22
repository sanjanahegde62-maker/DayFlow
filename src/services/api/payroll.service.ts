import { apiClient } from './client'

export interface Payslip {
    id: string
    userId: string
    userName: string
    month: string
    year: number
    basicSalary: number
    hra: number
    allowances: number
    deductions: number
    netSalary: number
    status: 'PAID' | 'PROCESSING' | 'UNPAID'
    generatedOn: string
}

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'

const mockPayslips: Payslip[] = [
    { id: 'pay_2026_07_1', userId: 'usr_emp_1', userName: 'John Doe', month: 'July', year: 2026, basicSalary: 4500, hra: 1800, allowances: 700, deductions: 500, netSalary: 6500, status: 'PAID', generatedOn: '2026-07-31' },
    { id: 'pay_2026_06_1', userId: 'usr_emp_1', userName: 'John Doe', month: 'June', year: 2026, basicSalary: 4500, hra: 1800, allowances: 700, deductions: 500, netSalary: 6500, status: 'PAID', generatedOn: '2026-06-30' },
    { id: 'pay_2026_07_2', userId: 'usr_emp_2', userName: 'Jane Smith', month: 'July', year: 2026, basicSalary: 5000, hra: 2000, allowances: 800, deductions: 600, netSalary: 7200, status: 'PAID', generatedOn: '2026-07-31' },
]

export const payrollService = {
    async getMyPayslips(): Promise<Payslip[]> {
        if (USE_MOCK) {
            await new Promise((resolve) => setTimeout(resolve, 300))
            return mockPayslips.filter((payslip) => payslip.userId === 'usr_emp_1')
        }
        const response = await apiClient.get<Payslip[]>('/payroll/me')
        return response.data
    },

    async getAllPayslips(): Promise<Payslip[]> {
        if (USE_MOCK) {
            await new Promise((resolve) => setTimeout(resolve, 300))
            return mockPayslips
        }
        const response = await apiClient.get<Payslip[]>('/payroll')
        return response.data
    },
}
