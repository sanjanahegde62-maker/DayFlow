import { useState, type FormEvent } from 'react'
import { AlertCircle, Briefcase, CheckCircle, Save, User as UserIcon } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { employeeService } from '@/services/api/employee.service'

export function EmployeeProfile() {
    const { user, setAuth, token } = useAuth()
    const [phone, setPhone] = useState(user?.phone ?? '+1 (555) 019-2834')
    const [address, setAddress] = useState(user?.address ?? '123 Main St, Tech City, CA')
    const [saving, setSaving] = useState(false)
    const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

    const handleSave = async (event: FormEvent) => {
        event.preventDefault()
        setSaving(true)
        setMessage(null)
        try {
            if (user?.id) {
                const updated = await employeeService.updateEmployeeProfile(user.id, { phone, address })
                if (token) setAuth(updated, token)
                setMessage({ type: 'success', text: 'Profile updated successfully!' })
            }
        } catch {
            setMessage({ type: 'error', text: 'Failed to update profile details.' })
        } finally {
            setSaving(false)
        }
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div><h1 className="text-2xl font-bold text-slate-800">My Profile</h1><p className="text-sm text-slate-500 mt-1">View personal details and update your contact information.</p></div>
            {message && <div className={`p-4 rounded-lg flex items-center gap-2 text-sm ${message.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>{message.type === 'success' ? <CheckCircle className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}<span>{message.text}</span></div>}
            <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-teal-600 text-white text-2xl font-bold flex items-center justify-center">{user?.firstName?.[0] ?? 'E'}</div>
                <div><h2 className="text-xl font-bold text-slate-800">{user?.firstName} {user?.lastName}</h2><p className="text-sm text-slate-500">{user?.designation ?? 'Software Engineer'} | {user?.department ?? 'Engineering'}</p><p className="text-xs text-slate-400 mt-1">Employee ID: <span className="font-semibold text-slate-600">{user?.employeeId}</span></p></div>
            </section>
            <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4"><h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2"><Briefcase className="w-4 h-4 text-teal-600" /> Job Details (Read Only)</h3><div className="space-y-3 text-sm"><Info label="Email" value={user?.email} /><Info label="Department" value={user?.department ?? 'Engineering'} /><Info label="Designation" value={user?.designation ?? 'Software Engineer'} /></div></section>
                <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4"><h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2"><UserIcon className="w-4 h-4 text-teal-600" /> Contact Details (Editable)</h3><div className="space-y-4"><label className="block text-xs font-semibold uppercase text-slate-600">Phone Number<input type="text" value={phone} onChange={(event) => setPhone(event.target.value)} className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus:outline-none" /></label><label className="block text-xs font-semibold uppercase text-slate-600">Residential Address<textarea rows={3} value={address} onChange={(event) => setAddress(event.target.value)} className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 focus:outline-none resize-none" /></label><button type="submit" disabled={saving} className="w-full py-2 px-4 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg text-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-50"><Save className="w-4 h-4" />{saving ? 'Saving...' : 'Save Profile Changes'}</button></div></section>
            </form>
        </div>
    )
}

function Info({ label, value }: { label: string; value?: string }) {
    return <div><span className="text-xs text-slate-400 block">{label}</span><p className="font-medium text-slate-700">{value}</p></div>
}
