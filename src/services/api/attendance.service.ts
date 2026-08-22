import { apiClient } from './client'

export interface AttendanceRecord {
    id: string
    userId: string
    date: string
    checkIn: string
    checkOut?: string
    status: 'PRESENT' | 'ABSENT' | 'HALF_DAY' | 'LATE'
    workHours?: number
}

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true'

const mockAttendance: AttendanceRecord[] = [
    { id: 'att_1', userId: 'usr_emp_1', date: '2026-08-22', checkIn: '09:15 AM', checkOut: '05:30 PM', status: 'PRESENT', workHours: 8.25 },
    { id: 'att_2', userId: 'usr_emp_1', date: '2026-08-21', checkIn: '09:05 AM', checkOut: '05:15 PM', status: 'PRESENT', workHours: 8.16 },
    { id: 'att_3', userId: 'usr_emp_2', date: '2026-08-22', checkIn: '09:45 AM', checkOut: '05:45 PM', status: 'LATE', workHours: 8 },
]

export const attendanceService = {
    async getMyAttendance(): Promise<AttendanceRecord[]> {
        if (USE_MOCK) {
            await new Promise((resolve) => setTimeout(resolve, 300))
            return mockAttendance.filter((record) => record.userId === 'usr_emp_1')
        }
        // Deprecated: frontend should call getAttendanceByEmployeeId with a numeric employee id
        const response = await apiClient.get<AttendanceRecord[]>('/attendance/me')
        return response.data
    },

    async getAttendanceByEmployeeId(employeeId: number): Promise<AttendanceRecord[]> {
        if (USE_MOCK) {
            await new Promise((resolve) => setTimeout(resolve, 300))
            return mockAttendance.filter((record) => record.userId === 'usr_emp_1')
        }
        const response = await apiClient.get<AttendanceRecord[]>(`/attendance/employee/${employeeId}`)
        return response.data
    },

    async getAllAttendance(): Promise<AttendanceRecord[]> {
        if (USE_MOCK) {
            await new Promise((resolve) => setTimeout(resolve, 300))
            return mockAttendance
        }
        const response = await apiClient.get<AttendanceRecord[]>('/attendance')
        return response.data
    },

    async checkIn(employeeId: number): Promise<AttendanceRecord> {
        if (USE_MOCK) {
            await new Promise((resolve) => setTimeout(resolve, 400))
            return { id: `att_${Date.now()}`, userId: 'usr_emp_1', date: new Date().toISOString().split('T')[0], checkIn: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), status: 'PRESENT' }
        }
        const response = await apiClient.post<AttendanceRecord>(`/attendance/check-in/${employeeId}`)
        return response.data
    },

    async checkOut(employeeId: number): Promise<AttendanceRecord> {
        if (USE_MOCK) {
            await new Promise((resolve) => setTimeout(resolve, 400))
            return { ...mockAttendance[0], checkOut: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), workHours: 8 }
        }
        const response = await apiClient.post<AttendanceRecord>(`/attendance/check-out/${employeeId}`)
        return response.data
    },
}
