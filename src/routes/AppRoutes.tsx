import { Navigate, Route, Routes } from 'react-router-dom'
import { Login } from '@/pages/auth/Login'
import { Signup } from '@/pages/auth/Signup'
import { Unauthorized } from '@/pages/common/Unauthorized'
import { ProtectedRoute } from './ProtectedRoute'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      <Route element={<ProtectedRoute allowedRoles={['EMPLOYEE']} />}>
        <Route path="/employee/dashboard" element={<div className="p-8 font-semibold">Employee Dashboard Placeholder</div>} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={['HR', 'ADMIN']} />}>
        <Route path="/admin/dashboard" element={<div className="p-8 font-semibold">Admin / HR Dashboard Placeholder</div>} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}