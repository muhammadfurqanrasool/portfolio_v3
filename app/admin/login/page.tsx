'use client'
import { useState } from 'react'
import { loginAction } from '@/actions/auth'

export default function AdminLoginPage() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(event.currentTarget)
    const result = await loginAction(formData)

    if (result?.error) {
      setError(result.error)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0b0f17] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#161f2e] border border-slate-800 rounded-xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-950/50 px-3 py-1 rounded-full border border-emerald-800/50">
            Restricted Area
          </span>
          <h1 className="text-2xl font-bold text-slate-50 mt-3">Admin Portal</h1>
          <p className="text-sm text-slate-400 mt-1">Sign in to manage your portfolio backend</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-950/50 border border-red-800/50 rounded-lg text-sm text-red-300 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 uppercase mb-1">Username</label>
            <input
              name="username"
              type="text"
              required
              className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
              placeholder="Enter username"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 uppercase mb-1">Password</label>
            <input
              name="password"
              type="password"
              required
              className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full duration-300 cursor-pointer mt-2 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-semibold rounded-lg transition-colors shadow-lg shadow-emerald-900/20 disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}