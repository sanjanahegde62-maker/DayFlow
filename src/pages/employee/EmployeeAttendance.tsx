import { useEffect, useState } from 'react'
import { CheckCircle2, Clock } from 'lucide-react'
import { attendanceService, type AttendanceRecord } from '@/services/api/attendance.service'
import { useAuth } from '@/context/AuthContext'
import { employeeService } from '@/services/api/employee.service'

export function EmployeeAttendance() {
    const { user } = useAuth()
    const [records, setRecords] = useState<AttendanceRecord[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [isCheckedIn, setIsCheckedIn] = useState(true)
    const [employeeId, setEmployeeId] = useState<number | null>(null)

    useEffect(() => {
        let mounted = true
        async function load() {
            setLoading(true)
            setError('')
            try {
                // Resolve numeric employee id by matching logged in user's email with employees list
                const employees = await employeeService.getAllEmployees()
                const matched = employees.find((e) => e.email === user?.email)
                const id = matched ? Number((matched as any).id) : null
                if (!mounted) return
                setEmployeeId(id)
                if (id == null) {
                    setRecords([])
                    return
                }
                const data = await attendanceService.getAttendanceByEmployeeId(id)
                if (!mounted) return
                setRecords(data)
                // determine checkedIn state from latest record
                setIsCheckedIn(data.length > 0 ? !!data[0].checkOut === false : false)
            } catch (e) {
                console.error('Attendance load error', e)
                if (!mounted) return
                setError('Unable to load attendance logs.')
            } finally {
                if (!mounted) return
                setLoading(false)
            }
        }
        load()
        return () => { mounted = false }
    }, [user])

    const handleToggleAttendance = async () => {
        if (employeeId == null) {
            setError('Employee record not found.')
            return
        }
        try {
            setError('')
            const record = isCheckedIn ? await attendanceService.checkOut(employeeId) : await attendanceService.checkIn(employeeId)
            setRecords((currentRecords) => isCheckedIn ? currentRecords.map((item, index) => index === 0 ? record : item) : [record, ...currentRecords])
            setIsCheckedIn((current) => !current)
        } catch (err) {
            console.error('Attendance update error', err)
            setError('Unable to update attendance right now.')
        }
    }

    return (
        <div className="space-y-6">
            <div><h1 className="text-2xl font-bold text-slate-800">My Attendance Log</h1><p className="text-sm text-slate-500 mt-1">Track daily check-ins, check-outs, and total working hours.</p></div>
            {error && <div className="p-4 rounded-lg bg-red-50 text-red-700 border border-red-200 text-sm">{error}</div>}
            <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between"><div className="flex items-center gap-4"><div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center"><Clock className="w-6 h-6" /></div><div><h2 className="text-base font-bold text-slate-800">Today's Attendance</h2><p className="text-xs text-slate-500">Status: <span className={`font-semibold ${isCheckedIn ? 'text-emerald-600' : 'text-slate-500'}`}>{isCheckedIn ? 'Checked In' : 'Checked Out'}</span></p></div></div><button type="button" onClick={handleToggleAttendance} className={`px-5 py-2.5 rounded-lg font-medium text-sm transition-colors ${isCheckedIn ? 'bg-amber-600 hover:bg-amber-700 text-white' : 'bg-teal-600 hover:bg-teal-700 text-white'}`}>{isCheckedIn ? 'Check Out' : 'Check In'}</button></section>
            <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"><div className="p-4 border-b border-slate-100 font-bold text-sm text-slate-800">Attendance Log History</div>{loading ? <div className="p-8 text-center text-slate-500 text-sm">Loading attendance logs...</div> : <div className="overflow-x-auto"><table className="w-full text-left text-sm text-slate-600"><thead className="bg-slate-50 text-slate-700 uppercase text-xs"><tr><th className="px-6 py-3">Date</th><th className="px-6 py-3">Check In</th><th className="px-6 py-3">Check Out</th><th className="px-6 py-3">Work Hours</th><th className="px-6 py-3">Status</th></tr></thead><tbody className="divide-y divide-slate-100">{records.map((record) => <tr key={record.id} className="hover:bg-slate-50"><td className="px-6 py-4 font-medium text-slate-900">{record.date}</td><td className="px-6 py-4">{record.checkIn}</td><td className="px-6 py-4">{record.checkOut ?? '-'}</td><td className="px-6 py-4">{record.workHours ? `${record.workHours} hrs` : '-'}</td><td className="px-6 py-4"><span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${record.status === 'PRESENT' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>{record.status}</span></td></tr>)}</tbody></table>{records.length === 0 && <div className="p-8 text-center text-sm text-slate-500"><CheckCircle2 className="mx-auto mb-2 w-5 h-5 text-slate-300" />No attendance records found.</div>}</div>}</section>
        </div>
    )
}
