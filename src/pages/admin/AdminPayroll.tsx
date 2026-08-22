import { useEffect, useState } from 'react'
import { CheckCircle } from 'lucide-react'
import { payrollService, type Payslip } from '@/services/api/payroll.service'

export function AdminPayroll() {
    const [payslips, setPayslips] = useState<Payslip[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        payrollService.getAllPayslips().then(setPayslips).catch(() => setError('Unable to load payroll records.')).finally(() => setLoading(false))
    }, [])

    const totalPayroll = payslips.reduce((total, payslip) => total + payslip.netSalary, 0)
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between"><div><h1 className="text-2xl font-bold text-slate-800">Payroll Management</h1><p className="text-sm text-slate-500 mt-1">Review monthly salary disbursements across the workforce.</p></div><div className="bg-teal-50 border border-teal-200 px-4 py-2 rounded-xl text-teal-800 text-right"><p className="text-xs uppercase font-semibold">Total Disbursed (July)</p><p className="text-xl font-bold">${totalPayroll.toLocaleString()}</p></div></div>
            {error && <div className="p-4 rounded-lg bg-red-50 text-red-700 border border-red-200 text-sm">{error}</div>}
            <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"><div className="p-4 border-b border-slate-100 font-bold text-sm text-slate-800">Employee Payroll Stream</div>{loading ? <div className="p-8 text-center text-slate-500 text-sm">Loading payroll logs...</div> : <div className="overflow-x-auto"><table className="w-full text-left text-sm text-slate-600"><thead className="bg-slate-50 text-slate-700 uppercase text-xs"><tr><th className="px-6 py-3">Employee</th><th className="px-6 py-3">Period</th><th className="px-6 py-3">Basic</th><th className="px-6 py-3">Allowances</th><th className="px-6 py-3">Deductions</th><th className="px-6 py-3">Net Salary</th><th className="px-6 py-3">Status</th></tr></thead><tbody className="divide-y divide-slate-100">{payslips.map((payslip) => <tr key={payslip.id} className="hover:bg-slate-50"><td className="px-6 py-4 font-semibold text-slate-900">{payslip.userName}</td><td className="px-6 py-4">{payslip.month} {payslip.year}</td><td className="px-6 py-4">${payslip.basicSalary}</td><td className="px-6 py-4">${payslip.hra + payslip.allowances}</td><td className="px-6 py-4 text-rose-600">-${payslip.deductions}</td><td className="px-6 py-4 font-bold text-slate-900">${payslip.netSalary}</td><td className="px-6 py-4"><span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-700 flex items-center gap-1 w-fit"><CheckCircle className="w-3 h-3" />{payslip.status}</span></td></tr>)}</tbody></table>{payslips.length === 0 && <p className="p-8 text-center text-sm text-slate-500">No payroll records found.</p>}</div>}</section>
        </div>
    )
}
