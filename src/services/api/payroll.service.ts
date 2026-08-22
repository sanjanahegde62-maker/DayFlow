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
        // deprecated: frontend should call getPayrollByEmployeeId with numeric id
        const response = await apiClient.get<Payslip[]>('/payroll/me')
        return response.data
    },

    async getPayrollByEmployeeId(employeeId: number): Promise<Payslip | null> {
        if (USE_MOCK) {
            await new Promise((resolve) => setTimeout(resolve, 300))
            const found = mockPayslips.find((p) => p.userId === 'usr_emp_1')
            return found || null
        }
        const response = await apiClient.get<any>(`/payroll/employee/${employeeId}`)
        // backend returns a single Payroll entity; map to Payslip shape conservatively
        const payroll = response.data
        if (!payroll) return null
        const payslip: Payslip = {
            id: String(payroll.id),
            userId: payroll.employee?.id ? String(payroll.employee.id) : String(employeeId),
            userName: payroll.employee?.name ?? '',
            month: payroll.month ?? '',
            year: payroll.year ?? new Date().getFullYear(),
            basicSalary: Number(payroll.basicSalary ?? 0),
            hra: Number(payroll.hra ?? 0),
            allowances: Number(payroll.allowances ?? 0),
            deductions: Number(payroll.deductions ?? 0),
            netSalary: Number(payroll.netSalary ?? 0),
            status: (payroll.status as any) ?? 'PAID',
            generatedOn: payroll.generatedOn ?? '',
        }
        return payslip
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
