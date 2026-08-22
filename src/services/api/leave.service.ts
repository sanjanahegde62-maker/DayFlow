import { apiClient } from './client';

export interface LeaveRequest {
    id: string;
    userId: string;
    userName: string;
    leaveType: 'CASUAL' | 'MEDICAL' | 'PAID' | 'UNPAID';
    startDate: string;
    endDate: string;
    reason: string;
    status: 'PENDING' | 'APPROVED' | 'REJECTED';
    appliedOn: string;
}

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

const mockLeaves: LeaveRequest[] = [
    {
        id: 'lv_101',
        userId: 'usr_emp_1',
        userName: 'John Doe',
        leaveType: 'CASUAL',
        startDate: '2026-09-01',
        endDate: '2026-09-02',
        reason: 'Family event',
        status: 'PENDING',
        appliedOn: '2026-08-20',
    },
    {
        id: 'lv_102',
        userId: 'usr_emp_2',
        userName: 'Jane Smith',
        leaveType: 'MEDICAL',
        startDate: '2026-08-10',
        endDate: '2026-08-12',
        reason: 'Fever and rest',
        status: 'APPROVED',
        appliedOn: '2026-08-09',
    },
];

export const leaveService = {
    async getMyLeaves(): Promise<LeaveRequest[]> {
        if (USE_MOCK) {
            await new Promise((res) => setTimeout(res, 300));
            return mockLeaves.filter((l) => l.userId === 'usr_emp_1');
        }
        const response = await apiClient.get<LeaveRequest[]>('/leaves/me');
        return response.data;
    },

    async getAllLeaves(): Promise<LeaveRequest[]> {
        if (USE_MOCK) {
            await new Promise((res) => setTimeout(res, 300));
            return mockLeaves;
        }
        const response = await apiClient.get<LeaveRequest[]>('/leaves');
        return response.data;
    },

    async applyLeave(data: Omit<LeaveRequest, 'id' | 'userId' | 'userName' | 'status' | 'appliedOn'>): Promise<LeaveRequest> {
        if (USE_MOCK) {
            await new Promise((res) => setTimeout(res, 400));
            const newLeave: LeaveRequest = {
                ...data,
                id: `lv_${Date.now()}`,
                userId: 'usr_emp_1',
                userName: 'John Doe',
                status: 'PENDING',
                appliedOn: new Date().toISOString().split('T')[0],
            };
            mockLeaves.unshift(newLeave);
            return newLeave;
        }
        const response = await apiClient.post<LeaveRequest>('/leaves', data);
        return response.data;
    },

    async updateLeaveStatus(id: string, status: 'APPROVED' | 'REJECTED'): Promise<LeaveRequest> {
        if (USE_MOCK) {
            await new Promise((res) => setTimeout(res, 300));
            const target = mockLeaves.find((l) => l.id === id);
            if (target) target.status = status;
            return target || mockLeaves[0];
        }
        const response = await apiClient.patch<LeaveRequest>(`/leaves/${id}/status`, { status });
        return response.data;
    },
};