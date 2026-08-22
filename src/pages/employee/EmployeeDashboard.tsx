import type { ReactNode } from 'react'
import { Calendar, CheckCircle2, Clock, FileCheck } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

export function EmployeeDashboard() {
    const { user } = useAuth()

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-800">Welcome, {user?.firstName}!</h1>
                <p className="text-sm text-slate-500 mt-1">Here is your daily attendance and activity overview.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <MetricCard label="Status Today" value="Present" valueClass="text-emerald-600" icon={<CheckCircle2 className="w-5 h-5" />} iconClass="bg-emerald-50 text-emerald-600" />
                <MetricCard label="Check In Time" value="09:15 AM" icon={<Clock className="w-5 h-5" />} iconClass="bg-sky-50 text-sky-600" />
                <MetricCard label="Leaves Remaining" value="12 Days" icon={<Calendar className="w-5 h-5" />} iconClass="bg-amber-50 text-amber-600" />
                <MetricCard label="Pending Requests" value="1 Request" icon={<FileCheck className="w-5 h-5" />} iconClass="bg-purple-50 text-purple-600" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <h2 className="text-base font-bold text-slate-800 mb-4">Attendance Action</h2>
                    <div className="text-center py-4 space-y-4">
                        <p className="text-xs text-slate-500">Current Time: <span className="font-semibold text-slate-700">09:30 AM</span></p>
                        <button type="button" className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg shadow-sm transition-colors text-sm">Check Out</button>
                    </div>
                </section>
                <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm md:col-span-2">
                    <h2 className="text-base font-bold text-slate-800 mb-4">Recent Activity / Alerts</h2>
                    <div className="space-y-3">
                        <ActivityItem text="Leave request for Paid Leave (2 days) submitted" time="Yesterday" />
                        <ActivityItem text="Monthly Payroll payslip available for download" time="3 days ago" />
                    </div>
                </section>
            </div>
        </div>
    )
}

function MetricCard({ label, value, valueClass = 'text-slate-800', icon, iconClass }: { label: string; value: string; valueClass?: string; icon: ReactNode; iconClass: string }) {
    return <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between"><div><p className="text-xs font-semibold text-slate-500 uppercase">{label}</p><p className={`text-xl font-bold mt-1 ${valueClass}`}>{value}</p></div><div className={`w-10 h-10 rounded-lg flex items-center justify-center ${iconClass}`}>{icon}</div></div>
}

function ActivityItem({ text, time }: { text: string; time: string }) {
    return <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between text-xs"><span className="text-slate-700">{text}</span><span className="text-slate-400">{time}</span></div>
}
