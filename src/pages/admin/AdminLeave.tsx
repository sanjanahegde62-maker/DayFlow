import { useEffect, useState } from 'react'
import { Check, X } from 'lucide-react'
import { leaveService, type LeaveRequest } from '@/services/api/leave.service'

export function AdminLeave() {
    const [leaves, setLeaves] = useState<LeaveRequest[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        leaveService.getAllLeaves().then(setLeaves).catch(() => setError('Unable to load leave applications.')).finally(() => setLoading(false))
    }, [])

    const handleAction = async (id: string, status: 'APPROVED' | 'REJECTED') => {
        try {
            await leaveService.updateLeaveStatus(id, status)
            setLeaves((current) => current.map((leave) => leave.id === id ? { ...leave, status } : leave))
        } catch {
            setError('Unable to update this leave request.')
        }
    }

    return (
        <div className="space-y-6">
            <div><h1 className="text-2xl font-bold text-slate-800">Leave Approvals</h1><p className="text-sm text-slate-500 mt-1">Review and approve employee leave requests.</p></div>
            {error && <div className="p-4 rounded-lg bg-red-50 text-red-700 border border-red-200 text-sm">{error}</div>}
            <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"><div className="p-4 border-b border-slate-100 font-bold text-sm text-slate-800">Pending &amp; History Stream</div>{loading ? <div className="p-8 text-center text-slate-500 text-sm">Loading leave applications...</div> : <div className="overflow-x-auto"><table className="w-full text-left text-sm text-slate-600"><thead className="bg-slate-50 text-slate-700 uppercase text-xs"><tr><th className="px-6 py-3">Employee</th><th className="px-6 py-3">Type</th><th className="px-6 py-3">Duration</th><th className="px-6 py-3">Reason</th><th className="px-6 py-3">Status</th><th className="px-6 py-3">Actions</th></tr></thead><tbody className="divide-y divide-slate-100">{leaves.map((leave) => <tr key={leave.id} className="hover:bg-slate-50"><td className="px-6 py-4 font-semibold text-slate-900">{leave.userName}</td><td className="px-6 py-4">{leave.leaveType}</td><td className="px-6 py-4">{leave.startDate} to {leave.endDate}</td><td className="px-6 py-4 max-w-xs truncate">{leave.reason}</td><td className="px-6 py-4"><span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${leave.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-700' : leave.status === 'REJECTED' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>{leave.status}</span></td><td className="px-6 py-4">{leave.status === 'PENDING' ? <div className="flex items-center gap-2"><button type="button" aria-label={`Approve ${leave.userName}`} onClick={() => handleAction(leave.id, 'APPROVED')} className="p-1.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 rounded"><Check className="w-4 h-4" /></button><button type="button" aria-label={`Reject ${leave.userName}`} onClick={() => handleAction(leave.id, 'REJECTED')} className="p-1.5 bg-red-100 hover:bg-red-200 text-red-700 rounded"><X className="w-4 h-4" /></button></div> : <span className="text-xs text-slate-400">Done</span>}</td></tr>)}</tbody></table>{leaves.length === 0 && <p className="p-8 text-center text-sm text-slate-500">No leave requests found.</p>}</div>}</section>
        </div>
    )
}
