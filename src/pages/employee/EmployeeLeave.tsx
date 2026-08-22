import { useEffect, useState, type FormEvent } from 'react'
import { CheckCircle2, Clock, Plus, XCircle } from 'lucide-react'
import { leaveService, type LeaveRequest } from '@/services/api/leave.service'

export function EmployeeLeave() {
    const [leaves, setLeaves] = useState<LeaveRequest[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [leaveType, setLeaveType] = useState<LeaveRequest['leaveType']>('CASUAL')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [reason, setReason] = useState('')
    const [submitting, setSubmitting] = useState(false)

    useEffect(() => {
        leaveService.getMyLeaves().then(setLeaves).catch(() => setError('Unable to load leave applications.')).finally(() => setLoading(false))
    }, [])

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault()
        setSubmitting(true)
        setError('')
        try {
            const created = await leaveService.applyLeave({ leaveType, startDate, endDate, reason })
            setLeaves((current) => [created, ...current])
            setShowModal(false)
            setStartDate('')
            setEndDate('')
            setReason('')
        } catch {
            setError('Failed to submit leave request.')
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between"><div><h1 className="text-2xl font-bold text-slate-800">Leave Requests</h1><p className="text-sm text-slate-500 mt-1">Apply for leaves and track request statuses.</p></div><button type="button" onClick={() => setShowModal(true)} className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-sm font-medium flex items-center gap-2"><Plus className="w-4 h-4" /> Apply for Leave</button></div>
            {error && <div className="p-4 rounded-lg bg-red-50 text-red-700 border border-red-200 text-sm">{error}</div>}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">{[['Casual Leaves', '8 / 12'], ['Medical Leaves', '10 / 10'], ['Paid Leaves', '15 / 15']].map(([label, value]) => <div key={label} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm"><p className="text-xs font-semibold text-slate-400 uppercase">{label}</p><p className="text-2xl font-bold text-slate-800 mt-1">{value}</p><p className="text-xs text-slate-500 mt-0.5">Remaining this year</p></div>)}</div>
            <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"><div className="p-4 border-b border-slate-100 font-bold text-sm text-slate-800">My Leave Applications</div>{loading ? <div className="p-8 text-center text-slate-500 text-sm">Loading applications...</div> : <div className="overflow-x-auto"><table className="w-full text-left text-sm text-slate-600"><thead className="bg-slate-50 text-slate-700 uppercase text-xs"><tr><th className="px-6 py-3">Type</th><th className="px-6 py-3">Dates</th><th className="px-6 py-3">Reason</th><th className="px-6 py-3">Applied On</th><th className="px-6 py-3">Status</th></tr></thead><tbody className="divide-y divide-slate-100">{leaves.map((leave) => <tr key={leave.id} className="hover:bg-slate-50"><td className="px-6 py-4 font-semibold text-slate-800">{leave.leaveType}</td><td className="px-6 py-4">{leave.startDate} to {leave.endDate}</td><td className="px-6 py-4 max-w-xs truncate">{leave.reason}</td><td className="px-6 py-4">{leave.appliedOn}</td><td className="px-6 py-4"><span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full flex items-center gap-1 w-fit ${leave.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-700' : leave.status === 'REJECTED' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>{leave.status === 'APPROVED' && <CheckCircle2 className="w-3 h-3" />}{leave.status === 'REJECTED' && <XCircle className="w-3 h-3" />}{leave.status === 'PENDING' && <Clock className="w-3 h-3" />}{leave.status}</span></td></tr>)}</tbody></table>{leaves.length === 0 && <p className="p-8 text-center text-sm text-slate-500">No leave applications found.</p>}</div>}</section>
            {showModal && <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center p-4 z-50"><div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 space-y-4"><div className="flex items-center justify-between"><h2 className="text-lg font-bold text-slate-800">Apply for Leave</h2><button type="button" aria-label="Close" onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-700">X</button></div><form onSubmit={handleSubmit} className="space-y-4"><label className="block text-xs font-semibold text-slate-600 uppercase">Leave Type<select value={leaveType} onChange={(event) => setLeaveType(event.target.value as LeaveRequest['leaveType'])} className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"><option value="CASUAL">Casual Leave</option><option value="MEDICAL">Medical Leave</option><option value="PAID">Paid Leave</option><option value="UNPAID">Unpaid Leave</option></select></label><div className="grid grid-cols-2 gap-3"><label className="block text-xs font-semibold text-slate-600 uppercase">Start Date<input type="date" required value={startDate} onChange={(event) => setStartDate(event.target.value)} className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-lg text-sm" /></label><label className="block text-xs font-semibold text-slate-600 uppercase">End Date<input type="date" required value={endDate} onChange={(event) => setEndDate(event.target.value)} className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-lg text-sm" /></label></div><label className="block text-xs font-semibold text-slate-600 uppercase">Reason<textarea required rows={3} value={reason} onChange={(event) => setReason(event.target.value)} placeholder="Explain why leave is required..." className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-lg text-sm resize-none" /></label><div className="flex justify-end gap-3"><button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border border-slate-300 text-slate-700 text-sm rounded-lg">Cancel</button><button type="submit" disabled={submitting} className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-sm rounded-lg disabled:opacity-50">{submitting ? 'Submitting...' : 'Submit Request'}</button></div></form></div></div>}
        </div>
    )
}
