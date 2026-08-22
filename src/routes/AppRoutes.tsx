import { Navigate, Route, Routes } from 'react-router-dom'
import { Login } from '@/pages/auth/Login'
import { Signup } from '@/pages/auth/Signup'
import { Unauthorized } from '@/pages/common/Unauthorized'
import { AppLayout } from '@/components/layout/AppLayout'
import { ProtectedRoute } from './ProtectedRoute'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      <Route element={<ProtectedRoute allowedRoles={['EMPLOYEE']} />}>
        <Route element={<AppLayout />}>
          <Route path="/employee/dashboard" element={<div className="font-semibold text-xl text-slate-800">Employee Dashboard</div>} />
          <Route path="/employee/profile" element={<div className="font-semibold text-xl text-slate-800">Employee Profile</div>} />
          <Route path="/employee/attendance" element={<div className="font-semibold text-xl text-slate-800">Attendance History</div>} />
          <Route path="/employee/leave" element={<div className="font-semibold text-xl text-slate-800">Leave Requests</div>} />
          <Route path="/employee/payroll" element={<div className="font-semibold text-xl text-slate-800">Payroll Details</div>} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute allowedRoles={['HR', 'ADMIN']} />}>
        <Route element={<AppLayout />}>
          <Route path="/admin/dashboard" element={<div className="font-semibold text-xl text-slate-800">Admin Dashboard</div>} />
          <Route path="/admin/employees" element={<div className="font-semibold text-xl text-slate-800">Employee Directory</div>} />
          <Route path="/admin/attendance" element={<div className="font-semibold text-xl text-slate-800">Company Attendance</div>} />
          <Route path="/admin/leave-approvals" element={<div className="font-semibold text-xl text-slate-800">Leave Approvals</div>} />
          <Route path="/admin/payroll" element={<div className="font-semibold text-xl text-slate-800">Payroll Management</div>} />
          <Route path="/admin/reports" element={<div className="font-semibold text-xl text-slate-800">Reports &amp; Analytics</div>} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}