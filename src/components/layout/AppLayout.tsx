import { useEffect, useRef, useState } from 'react'
import { useNavigate, NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { AlertCircle, BarChart3, Bell, CalendarCheck, Check, CheckCircle2, Clock, DollarSign, FileText, LayoutDashboard, LogOut, User, Users } from 'lucide-react'

type Notification = {
  id: string
  title: string
  message: string
  time: string
  type: 'leave' | 'attendance' | 'payroll'
  read: boolean
}

const initialNotifications: Notification[] = [
  { id: 'notif_1', title: 'New Leave Request', message: 'John Doe applied for Casual Leave.', time: '10 mins ago', type: 'leave', read: false },
  { id: 'notif_2', title: 'Attendance Reminder', message: 'Jane Smith checked in late today (09:45 AM).', time: '2 hours ago', type: 'attendance', read: false },
  { id: 'notif_3', title: 'Payroll Disbursed', message: 'July 2026 payslips have been generated.', time: '1 day ago', type: 'payroll', read: true },
]

export function AppLayout() {
  const { user, clearAuth } = useAuth()
  const navigate = useNavigate()
  const [showNotifications, setShowNotifications] = useState(false)
  const [notifications, setNotifications] = useState(initialNotifications)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const isAdmin = user?.role === 'ADMIN' || user?.role === 'HR'
  const unreadCount = notifications.filter((notification) => !notification.read).length

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowNotifications(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const markAllAsRead = () => setNotifications((current) => current.map((notification) => ({ ...notification, read: true })))
  const toggleNotificationRead = (id: string) => setNotifications((current) => current.map((notification) => notification.id === id ? { ...notification, read: !notification.read } : notification))

  const employeeNavItems = [
    { label: 'Dashboard', path: '/employee/dashboard', icon: LayoutDashboard },
    { label: 'My Profile', path: '/employee/profile', icon: User },
    { label: 'Attendance', path: '/employee/attendance', icon: CalendarCheck },
    { label: 'Leave Requests', path: '/employee/leave', icon: FileText },
    { label: 'Payroll', path: '/employee/payroll', icon: DollarSign },
  ]

  const adminNavItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'My Profile', path: '/admin/profile', icon: User },
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
        <header onClick={() => navigate(isAdmin ? '/admin/profile' : '/employee/profile')} className="h-16 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-40 cursor-pointer">
          <div className="flex items-center gap-3"><span className="text-sm font-semibold text-slate-700">Welcome back, {user?.firstName || 'User'}</span><span className={`px-2.5 py-0.5 text-xs font-semibold rounded-full ${isAdmin ? 'bg-teal-100 text-teal-700' : 'bg-teal-100 text-teal-700'}`}>{user?.role}</span></div>
          <div className="flex items-center gap-4"><div className="relative" ref={dropdownRef}><button type="button" aria-label="Notifications" aria-expanded={showNotifications} onClick={() => setShowNotifications((current) => !current)} className="relative p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"><Bell className="w-5 h-5" />{unreadCount > 0 && <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-teal-500 rounded-full ring-2 ring-white" />}</button>{showNotifications && <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-slate-200 z-50 overflow-hidden"><div className="p-3 bg-slate-50 border-b border-slate-100 flex items-center justify-between"><span className="text-xs font-bold text-slate-800 uppercase tracking-wider">Notifications ({unreadCount} unread)</span>{unreadCount > 0 && <button type="button" onClick={markAllAsRead} className="text-xs text-teal-600 hover:text-teal-700 font-medium flex items-center gap-1"><Check className="w-3 h-3" /> Mark all read</button>}</div><div className="max-h-72 overflow-y-auto divide-y divide-slate-100">{notifications.map((notification) => <button type="button" key={notification.id} onClick={() => toggleNotificationRead(notification.id)} className={`w-full p-3 text-left text-xs transition-colors flex items-start gap-3 ${notification.read ? 'bg-white hover:bg-slate-50' : 'bg-teal-50/40 hover:bg-teal-50'}`}><div className="mt-0.5 shrink-0">{notification.type === 'leave' && <Clock className="w-4 h-4 text-amber-500" />}{notification.type === 'attendance' && <AlertCircle className="w-4 h-4 text-rose-500" />}{notification.type === 'payroll' && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}</div><div className="flex-1 min-w-0"><div className="flex items-center justify-between gap-2"><p className="font-semibold text-slate-800 truncate">{notification.title}</p><span className="text-[10px] text-slate-400 shrink-0">{notification.time}</span></div><p className="text-slate-500 mt-0.5 line-clamp-2">{notification.message}</p></div></button>)}</div></div>}</div><div className="h-8 w-px bg-slate-200" /><div className="flex items-center gap-3"><div className="w-9 h-9 rounded-full bg-slate-800 text-white font-semibold flex items-center justify-center text-sm">{user?.firstName ? user.firstName[0] : 'U'}</div><div className="text-left text-xs"><p className="font-semibold text-slate-800">{user?.firstName} {user?.lastName}</p><p className="text-slate-500">{user?.employeeId}</p></div></div></div>
        </header>
        <main className="flex-1 p-8"><Outlet /></main>
      </div>
    </div>
  )
}