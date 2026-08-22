import { ShieldAlert } from 'lucide-react'
import { Link } from 'react-router-dom'

export function Unauthorized() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4 text-center">
      <ShieldAlert className="w-16 h-16 text-red-500 mb-4" />
      <h1 className="text-2xl font-bold text-slate-900">403 - Unauthorized Access</h1>
      <p className="text-sm text-slate-600 mt-2 max-w-sm">You do not have permission to view this page. Please contact your HR administrator if you believe this is an error.</p>
      <Link to="/login" className="mt-6 px-4 py-2 bg-sky-600 text-white text-sm font-medium rounded-lg">Return to Login</Link>
    </div>
  )
}