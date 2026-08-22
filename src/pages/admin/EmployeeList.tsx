import { useEffect, useState } from 'react'
import { Edit2, Search } from 'lucide-react'
import type { User } from '@/types'
import { employeeService } from '@/services/api/employee.service'

export function EmployeeList() {
    const [employees, setEmployees] = useState<User[]>([])
    const [query, setQuery] = useState('')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        employeeService.getAllEmployees()
            .then(setEmployees)
            .catch(() => setError('Unable to load workforce data.'))
            .finally(() => setLoading(false))
    }, [])

    const filteredEmployees = employees.filter((employee) => {
        const searchText = `${employee.firstName} ${employee.lastName} ${employee.employeeId} ${employee.email}`.toLowerCase()
        return searchText.includes(query.toLowerCase())
    })

    return (
        <div className="space-y-6">
            <div><h1 className="text-2xl font-bold text-slate-800">Employee Directory</h1><p className="text-sm text-slate-500 mt-1">Manage and view all registered employees.</p></div>
            <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-100"><div className="relative w-full max-w-sm"><Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" /><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search employee name or ID..." className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500" /></div></div>
                {loading && <div className="p-8 text-center text-slate-500 text-sm">Loading workforce data...</div>}
                {!loading && error && <div className="p-8 text-center text-red-600 text-sm">{error}</div>}
                {!loading && !error && <div className="overflow-x-auto"><table className="w-full text-left text-sm text-slate-600"><thead className="bg-slate-50 text-slate-700 uppercase text-xs"><tr><th className="px-6 py-3">Employee</th><th className="px-6 py-3">Role</th><th className="px-6 py-3">Department</th><th className="px-6 py-3">Designation</th><th className="px-6 py-3">Actions</th></tr></thead><tbody className="divide-y divide-slate-100">{filteredEmployees.map((employee) => <tr key={employee.id} className="hover:bg-slate-50 transition-colors"><td className="px-6 py-4 font-medium text-slate-900 flex items-center gap-3"><div className="w-8 h-8 rounded-full bg-slate-800 text-white font-semibold flex items-center justify-center text-xs">{employee.firstName[0]}</div><div><p>{employee.firstName} {employee.lastName}</p><p className="text-xs text-slate-400">{employee.employeeId} | {employee.email}</p></div></td><td className="px-6 py-4"><span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${employee.role === 'ADMIN' || employee.role === 'HR' ? 'bg-teal-100 text-teal-700' : 'bg-teal-100 text-teal-700'}`}>{employee.role}</span></td><td className="px-6 py-4">{employee.department ?? '-'}</td><td className="px-6 py-4">{employee.designation ?? '-'}</td><td className="px-6 py-4"><button type="button" className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-xs font-medium flex items-center gap-1.5 transition-colors"><Edit2 className="w-3.5 h-3.5" /> Edit</button></td></tr>)}</tbody></table>{filteredEmployees.length === 0 && <p className="p-8 text-center text-sm text-slate-500">No employees match your search.</p>}</div>}
            </section>
        </div>
    )
}
