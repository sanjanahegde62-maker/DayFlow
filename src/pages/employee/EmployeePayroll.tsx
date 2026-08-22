import { useEffect, useState } from 'react'
import { Download } from 'lucide-react'
import { payrollService, type Payslip } from '@/services/api/payroll.service'
import { useAuth } from '@/context/AuthContext'
import { employeeService } from '@/services/api/employee.service'

export function EmployeePayroll() {
    const { user } = useAuth()
    const [payslips, setPayslips] = useState<Payslip[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        let mounted = true
        async function load() {
            setLoading(true)
            setError('')
            try {
                const employees = await employeeService.getAllEmployees()
                const matched = employees.find((e) => e.email === user?.email)
                const id = matched ? Number((matched as any).id) : null
                if (!mounted) return
                if (id == null) {
                    setPayslips([])
                    return
                }
                const payroll = await payrollService.getPayrollByEmployeeId(id)
                if (!mounted) return
                if (payroll) setPayslips([payroll])
                else setPayslips([])
            } catch (e) {
                console.error('Payroll load error', e)
                if (!mounted) return
                setError('Unable to load payroll records.')
            } finally {
                if (!mounted) return
                setLoading(false)
            }
        }
        load()
        return () => { mounted = false }
    }, [user])

    const latest = payslips[0]
    return (
        <div className="space-y-6">
            <div><h1 className="text-2xl font-bold text-slate-800">My Payroll &amp; Payslips</h1><p className="text-sm text-slate-500 mt-1">View monthly breakdown and download official payslips.</p></div>
            {error && <div className="p-4 rounded-lg bg-red-50 text-red-700 border border-red-200 text-sm">{error}</div>}
            {latest && <section className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-6 rounded-xl shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6"><div><span className="text-xs uppercase font-semibold text-teal-400 tracking-wider">Latest Net Salary {latest.month ? `(${latest.month} ${latest.year})` : ''}</span><p className="text-4xl font-extrabold mt-1">${latest.netSalary.toLocaleString()}</p><p className="text-xs text-slate-400 mt-1">Disbursed on: {latest.generatedOn || '-'}</p></div><div className="flex gap-6 border-t md:border-t-0 md:border-l border-slate-700 pt-4 md:pt-0 md:pl-6 text-sm"><Info label="Basic Salary" value={`$${latest.basicSalary.toLocaleString()}`} /><Info label="HRA & Allowances" value={`$${(latest.hra + latest.allowances).toLocaleString()}`} /><Info label="Deductions" value={`-$${latest.deductions.toLocaleString()}`} /></div></section>}
            <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"><div className="p-4 border-b border-slate-100 font-bold text-sm text-slate-800">Monthly Payslip History</div>{loading ? <div className="p-8 text-center text-slate-500 text-sm">Loading payroll records...</div> : <div className="overflow-x-auto"><table className="w-full text-left text-sm text-slate-600"><thead className="bg-slate-50 text-slate-700 uppercase text-xs"><tr><th className="px-6 py-3">Pay Period</th><th className="px-6 py-3">Basic</th><th className="px-6 py-3">Allowances</th><th className="px-6 py-3">Deductions</th><th className="px-6 py-3">Net Pay</th><th className="px-6 py-3">Status</th><th className="px-6 py-3">Action</th></tr></thead><tbody className="divide-y divide-slate-100">{payslips.map((payslip) => <tr key={String(payslip.id)} className="hover:bg-slate-50"><td className="px-6 py-4 font-semibold text-slate-900">{(payslip.month ?? '-') } {payslip.year ?? ''}</td><td className="px-6 py-4">${payslip.basicSalary}</td><td className="px-6 py-4">${(payslip.hra ?? 0) + (payslip.allowances ?? 0)}</td><td className="px-6 py-4 text-rose-600">-${payslip.deductions ?? 0}</td><td className="px-6 py-4 font-bold text-slate-900">${payslip.netSalary}</td><td className="px-6 py-4"><span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-700">{payslip.status ?? '-'}</span></td><td className="px-6 py-4"><button type="button" aria-label={`Download ${payslip.month} payslip`} className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-xs font-medium flex items-center gap-1.5"><Download className="w-3.5 h-3.5" /> PDF</button></td></tr>)}</tbody></table>{payslips.length === 0 && <p className="p-8 text-center text-sm text-slate-500">No payslips found.</p>}</div>}</section>
        </div>
    )
}

function Info({ label, value }: { label: string; value: string }) {
    return <div><p className="text-xs text-slate-400">{label}</p><p className="font-semibold text-slate-200">{value}</p></div>
}
