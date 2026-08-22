import { Download, FileSpreadsheet, PieChart, TrendingUp, Users } from 'lucide-react'

const reports = [
    { title: 'Employee Master Report', description: 'Full roster details including departments, contact info, and joining dates.', icon: Users, accent: 'bg-teal-50 text-teal-600', file: 'employee-master-report.csv' },
    { title: 'Monthly Attendance Report', description: 'Detailed check-in logs, total working hours, and absence trends.', icon: TrendingUp, accent: 'bg-slate-100 text-slate-600', file: 'monthly-attendance-report.csv' },
    { title: 'Payroll Disbursement Summary', description: 'Itemized salary breakdowns, deductions, and monthly net payouts.', icon: FileSpreadsheet, accent: 'bg-emerald-50 text-emerald-600', file: 'payroll-summary.csv' },
]

function downloadReport(file: string, title: string) {
    const content = `Report,${title}\nGenerated,${new Date().toISOString()}\n`
    const link = document.createElement('a')
    link.href = URL.createObjectURL(new Blob([content], { type: 'text/csv' }))
    link.download = file
    link.click()
    URL.revokeObjectURL(link.href)
}

export function AdminReports() {
    return (
        <div className="space-y-6">
            <div><h1 className="text-2xl font-bold text-slate-800">Analytics &amp; Reports</h1><p className="text-sm text-slate-500 mt-1">Export company workforce summaries, attendance metrics, and payroll reports.</p></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">{reports.map(({ title, description, icon: Icon, accent, file }) => <section key={title} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4"><div className={`w-10 h-10 rounded-lg flex items-center justify-center ${accent}`}><Icon className="w-5 h-5" /></div><div><h2 className="font-bold text-slate-800">{title}</h2><p className="text-xs text-slate-500 mt-1">{description}</p></div><button type="button" onClick={() => downloadReport(file, title)} className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs rounded-lg flex items-center justify-center gap-2"><Download className="w-3.5 h-3.5" /> Export CSV</button></section>)}</div>
            <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4"><h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2"><PieChart className="w-4 h-4 text-teal-600" /> Department Distribution</h2><div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center pt-2">{[['45%', 'Engineering'], ['25%', 'Design & UI'], ['18%', 'Human Resources'], ['12%', 'Operations']].map(([value, label]) => <div key={label} className="p-4 bg-slate-50 rounded-lg border border-slate-100"><p className="text-2xl font-bold text-slate-800">{value}</p><p className="text-xs text-slate-500 mt-1">{label}</p></div>)}</div></section>
        </div>
    )
}
