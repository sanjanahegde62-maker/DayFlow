import { useNavigate, NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { BarChart3, Bell, CalendarCheck, DollarSign, FileText, LayoutDashboard, LogOut, User, Users } from 'lucide-react'

export function AppLayout() {
  const { user, clearAuth } = useAuth()
  const navigate = useNavigate()
  const isAdmin = user?.role === 'ADMIN' || user?.role === 'HR'

  const employeeNavItems = [
    { label: 'Dashboard', path: '/employee/dashboard', icon: LayoutDashboard },
    { label: 'My Profile', path: '/employee/profile', icon: User },
    { label: 'Attendance', path: '/employee/attendance', icon: CalendarCheck },
    { label: 'Leave Requests', path: '/employee/leave', icon: FileText },
    { label: 'Payroll', path: '/employee/payroll', icon: DollarSign },
  ]

  const adminNavItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Employees', path: '/admin/employees', icon: Users },
    { label: 'Attendance Management', path: '/admin/attendance', icon: CalendarCheck },
    { label: 'Leave Approvals', path: '/admin/leave-approvals', icon: FileText },
    { label: 'Payroll Management', path: '/admin/payroll', icon: DollarSign },
    { label: 'Reports', path: '/admin/reports', icon: BarChart3 },
  ]

  const handleLogout = () => {
    clearAuth()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col fixed inset-y-0 z-50">
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-2xl font-bold text-white tracking-wider">DAYFLOW</h1>
          <p className="text-xs text-slate-400 mt-1">HR Management System</p>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {(isAdmin ? adminNavItems : employeeNavItems).map((item) => {
            const Icon = item.icon
            return <NavLink key={item.path} to={item.path} className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive ? 'bg-teal-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}><Icon className="w-5 h-5 shrink-0" /><span>{item.label}</span></NavLink>
          })}
        </nav>
        <div className="p-4 border-t border-slate-800">
          <button type="button" onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"><LogOut className="w-5 h-5 shrink-0" /><span>Logout</span></button>
        </div>
      </aside>

      <div className="flex-1 pl-64 flex flex-col min-h-screen">
        <header className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-3"><span className="text-sm font-semibold text-slate-700">Welcome back, {user?.firstName || 'User'}</span><span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${isAdmin ? 'bg-teal-100 text-teal-700' : 'bg-teal-100 text-teal-700'}`}>{user?.role}</span></div>
          <div className="flex items-center gap-4"><button type="button" aria-label="Notifications" className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors relative"><Bell className="w-5 h-5" /><span className="absolute top-1.5 right-1.5 w-2 h-2 bg-teal-500 rounded-full" /></button><div className="h-8 w-px bg-slate-200" /><div className="flex items-center gap-3"><div className="w-9 h-9 rounded-full bg-slate-800 text-white font-semibold flex items-center justify-center text-sm">{user?.firstName ? user.firstName[0] : 'U'}</div><div className="text-left text-xs"><p className="font-semibold text-slate-800">{user?.firstName} {user?.lastName}</p><p className="text-slate-500">{user?.employeeId}</p></div></div></div>
        </header>
        <main className="flex-1 p-8"><Outlet /></main>
      </div>
    </div>
  )
}