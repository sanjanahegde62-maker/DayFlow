import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/context/useAuth'
import type { Role } from '@/types'

interface ProtectedRouteProps {
  allowedRoles: Role[]
}

export function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />
  }

  return <Outlet />
}