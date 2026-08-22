import { Navigate, Route, Routes } from 'react-router-dom'
import { Login } from '@/pages/auth/Login'
import { Signup } from '@/pages/auth/Signup'
import { Unauthorized } from '@/pages/common/Unauthorized'
import { AppLayout } from '@/components/layout/AppLayout'
import { ProtectedRoute } from './ProtectedRoute'
import { EmployeeDashboard } from '@/pages/employee/EmployeeDashboard'
import { AdminDashboard } from '@/pages/admin/AdminDashboard'
import { EmployeeProfile } from '@/pages/employee/EmployeeProfile'
import { EmployeeList } from '@/pages/admin/EmployeeList'
import { EmployeeAttendance } from '@/pages/employee/EmployeeAttendance'
import { AdminAttendance } from '@/pages/admin/AdminAttendance'
import { EmployeeLeave } from '@/pages/employee/EmployeeLeave'
import { AdminLeave } from '@/pages/admin/AdminLeave'
import { EmployeePayroll } from '@/pages/employee/EmployeePayroll'
import { AdminPayroll } from '@/pages/admin/AdminPayroll'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      <Route element={<ProtectedRoute allowedRoles={['EMPLOYEE']} />}>
        <Route element={<AppLayout />}>
          <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
          <Route path="/employee/profile" element={<EmployeeProfile />} />
          <Route path="/employee/attendance" element={<EmployeeAttendance />} />
          <Route path="/employee/leave" element={<EmployeeLeave />} />
          <Route path="/employee/payroll" element={<EmployeePayroll />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute allowedRoles={['HR', 'ADMIN']} />}>
        <Route element={<AppLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/employees" element={<EmployeeList />} />
          <Route path="/admin/attendance" element={<AdminAttendance />} />
          <Route path="/admin/leave-approvals" element={<AdminLeave />} />
          <Route path="/admin/payroll" element={<AdminPayroll />} />
          <Route path="/admin/reports" element={<div className="font-semibold text-xl text-slate-800">Reports &amp; Analytics</div>} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}