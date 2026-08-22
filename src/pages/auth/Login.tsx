import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AlertCircle, LogIn } from 'lucide-react'
import { useAuth } from '@/context/useAuth'
import { authService } from '@/services/api/auth.service'

export const Login: React.FC = () => {
  const navigate = useNavigate()
  const { setAuth } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      const data = await authService.login({ email, password })
      setAuth(data.user, data.token)
      navigate(data.user.role === 'ADMIN' ? '/admin/dashboard' : '/employee/dashboard')
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Invalid email or password'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 border border-slate-200">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">DAYFLOW</h1>
          <p className="text-sm text-slate-500 mt-1">Human Resource Management System</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-xs font-semibold uppercase text-slate-600">
            Email Address
            <input type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="name@company.com" className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-lg text-sm" />
          </label>
          <label className="block text-xs font-semibold uppercase text-slate-600">
            Password
            <input type="password" required value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password" className="w-full mt-1 px-3 py-2 border border-slate-300 rounded-lg text-sm" />
          </label>
          <button type="submit" disabled={loading} className="w-full bg-sky-600 hover:bg-sky-700 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50 text-sm">
            {loading ? 'Signing in...' : <><LogIn className="w-4 h-4" /> Sign In</>}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-500">
          Don't have an account? <Link to="/signup" className="text-sky-600 font-semibold hover:underline">Sign Up</Link>
        </div>
      </div>
    </div>
  )
}