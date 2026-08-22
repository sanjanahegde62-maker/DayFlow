import { useEffect, useState } from 'react'
import { attendanceService, type AttendanceRecord } from '@/services/api/attendance.service'

export function AdminAttendance() {
    const [records, setRecords] = useState<AttendanceRecord[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        attendanceService.getAllAttendance()
            .then(setRecords)
            .catch(() => setError('Unable to load attendance records.'))
            .finally(() => setLoading(false))
    }, [])

    return (
        <div className="space-y-6">
            <div><h1 className="text-2xl font-bold text-slate-800">Company Attendance Overview</h1><p className="text-sm text-slate-500 mt-1">Monitor daily logs and employee presence across all departments.</p></div>
            <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"><div className="p-4 border-b border-slate-100 font-bold text-sm text-slate-800">Today's Attendance Stream</div>{loading ? <div className="p-8 text-center text-slate-500 text-sm">Loading record logs...</div> : error ? <div className="p-8 text-center text-red-600 text-sm">{error}</div> : <div className="overflow-x-auto"><table className="w-full text-left text-sm text-slate-600"><thead className="bg-slate-50 text-slate-700 uppercase text-xs"><tr><th className="px-6 py-3">Employee Record ID</th><th className="px-6 py-3">Date</th><th className="px-6 py-3">Check In</th><th className="px-6 py-3">Check Out</th><th className="px-6 py-3">Status</th></tr></thead><tbody className="divide-y divide-slate-100">{records.map((record) => <tr key={record.id} className="hover:bg-slate-50"><td className="px-6 py-4 font-medium text-slate-900">{record.userId}</td><td className="px-6 py-4">{record.date}</td><td className="px-6 py-4">{record.checkIn}</td><td className="px-6 py-4">{record.checkOut ?? 'In Progress'}</td><td className="px-6 py-4"><span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${record.status === 'PRESENT' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>{record.status}</span></td></tr>)}</tbody></table>{records.length === 0 && <p className="p-8 text-center text-sm text-slate-500">No attendance records found.</p>}</div>}</section>
        </div>
    )
}
