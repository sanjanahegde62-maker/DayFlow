import type { ReactNode } from 'react'
import { useState } from 'react'
import { AlertCircle, Calendar, Check, Clock, Users, X } from 'lucide-react'

type PendingLeave = {
    id: string
    employee: string
    type: string
    dates: string
    status: 'PENDING' | 'APPROVED' | 'REJECTED'
}

const initialPendingLeaves: PendingLeave[] = [
    { id: '1', employee: 'John Doe (EMP-102)', type: 'Sick Leave', dates: 'Oct 24 - Oct 25', status: 'PENDING' },
    { id: '2', employee: 'Jane Smith (EMP-103)', type: 'Casual Leave', dates: 'Nov 02 - Nov 04', status: 'PENDING' },
]

export function AdminDashboard() {
    const [pendingLeaves, setPendingLeaves] = useState(initialPendingLeaves)
    const pendingCount = pendingLeaves.filter((leave) => leave.status === 'PENDING').length

    const handleAction = (id: string, status: 'APPROVED' | 'REJECTED') => {
        setPendingLeaves((current) => current.map((leave) => leave.id === id ? { ...leave, status } : leave))
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-800">Admin Overview</h1>
                <p className="text-sm text-slate-500 mt-1">Company-wide workforce analytics and immediate actions.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Metric label="Total Employees" value="48" icon={<Users className="w-5 h-5" />} iconClass="bg-indigo-50 text-indigo-600" />
                <Metric label="Present Today" value="42" valueClass="text-emerald-600" icon={<Clock className="w-5 h-5" />} iconClass="bg-emerald-50 text-emerald-600" />
                <Metric label="On Leave" value="4" valueClass="text-amber-600" icon={<Calendar className="w-5 h-5" />} iconClass="bg-amber-50 text-amber-600" />
                <Metric label="Pending Approvals" value={String(pendingCount)} valueClass="text-red-600" icon={<AlertCircle className="w-5 h-5" />} iconClass="bg-red-50 text-red-600" />
            </div>

            <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h2 className="text-base font-bold text-slate-800 mb-4">Pending Leave Approvals</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-600">
                        <thead className="bg-slate-50 text-slate-700 uppercase text-xs"><tr><th className="px-4 py-3">Employee</th><th className="px-4 py-3">Type</th><th className="px-4 py-3">Dates</th><th className="px-4 py-3">Action</th></tr></thead>
                        <tbody className="divide-y divide-slate-100">{pendingLeaves.map((leave) => <tr key={leave.id}><td className="px-4 py-3 font-medium text-slate-800">{leave.employee}</td><td className="px-4 py-3">{leave.type}</td><td className="px-4 py-3">{leave.dates}</td><td className="px-4 py-3">{leave.status === 'PENDING' ? <div className="flex items-center gap-2"><button type="button" onClick={() => handleAction(leave.id, 'APPROVED')} className="px-2.5 py-1 bg-teal-600 text-white rounded text-xs hover:bg-teal-700 flex items-center gap-1"><Check className="w-3 h-3" />Approve</button><button type="button" onClick={() => handleAction(leave.id, 'REJECTED')} className="px-2.5 py-1 bg-red-50 text-red-600 rounded text-xs hover:bg-red-100 flex items-center gap-1"><X className="w-3 h-3" />Reject</button></div> : <span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${leave.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>{leave.status}</span>}</td></tr>)}</tbody>
                    </table>
                </div>
            </section>
        </div>
    )
}

function Metric({ label, value, valueClass = 'text-slate-800', icon, iconClass }: { label: string; value: string; valueClass?: string; icon: ReactNode; iconClass: string }) {
    return <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between"><div><p className="text-xs font-semibold text-slate-500 uppercase">{label}</p><p className={`text-xl font-bold mt-1 ${valueClass}`}>{value}</p></div><div className={`w-10 h-10 rounded-lg flex items-center justify-center ${iconClass}`}>{icon}</div></div>
}
