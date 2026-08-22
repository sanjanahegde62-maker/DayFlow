import type { ReactNode } from 'react'
import { AlertCircle, Calendar, Clock, Users } from 'lucide-react'

export function AdminDashboard() {
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
                <Metric label="Pending Approvals" value="3" valueClass="text-red-600" icon={<AlertCircle className="w-5 h-5" />} iconClass="bg-red-50 text-red-600" />
            </div>

            <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <h2 className="text-base font-bold text-slate-800 mb-4">Pending Leave Approvals</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-600">
                        <thead className="bg-slate-50 text-slate-700 uppercase text-xs"><tr><th className="px-4 py-3">Employee</th><th className="px-4 py-3">Type</th><th className="px-4 py-3">Dates</th><th className="px-4 py-3">Action</th></tr></thead>
                        <tbody className="divide-y divide-slate-100"><tr><td className="px-4 py-3 font-medium text-slate-800">John Doe (EMP-102)</td><td className="px-4 py-3">Sick Leave</td><td className="px-4 py-3">Oct 24 - Oct 25</td><td className="px-4 py-3 space-x-2"><button type="button" className="px-2.5 py-1 bg-teal-600 text-white rounded text-xs hover:bg-teal-700">Approve</button><button type="button" className="px-2.5 py-1 bg-red-50 text-red-600 rounded text-xs hover:bg-red-100">Reject</button></td></tr></tbody>
                    </table>
                </div>
            </section>
        </div>
    )
}

function Metric({ label, value, valueClass = 'text-slate-800', icon, iconClass }: { label: string; value: string; valueClass?: string; icon: ReactNode; iconClass: string }) {
    return <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between"><div><p className="text-xs font-semibold text-slate-500 uppercase">{label}</p><p className={`text-xl font-bold mt-1 ${valueClass}`}>{value}</p></div><div className={`w-10 h-10 rounded-lg flex items-center justify-center ${iconClass}`}>{icon}</div></div>
}
