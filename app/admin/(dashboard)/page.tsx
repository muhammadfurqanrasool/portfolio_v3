// app/admin/page.tsx
import { db } from '@/db'
import { projects, skills, contactMessages } from '@/db/schema'
import { count } from 'drizzle-orm'


export default async function AdminDashboardPage() {
  // Fetch quick metrics directly from SQLite
  const [{ value: projectCount }] = await db.select({ value: count() }).from(projects)
  const [{ value: skillCount }] = await db.select({ value: count() }).from(skills)
  const [{ value: messageCount }] = await db.select({ value: count() }).from(contactMessages)

  return (
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8 pb-6 border-b border-slate-800">
          <div>
            <h1 className="text-2xl font-bold">Dashboard Overview</h1>
            <p className="text-sm text-slate-400">Monitor your local SQLite database data flow and content metrics.</p>
          </div>
          <span className="text-xs bg-slate-800 text-slate-300 px-3 py-1.5 rounded-full border border-slate-700">
            Database: SQLite (Local)
          </span>
        </header>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#161f2e] border border-slate-800 p-6 rounded-xl">
            <p className="text-xs font-medium text-slate-400 uppercase">Total Projects</p>
            <p className="text-3xl font-bold text-emerald-400 mt-2">{projectCount}</p>
          </div>
          <div className="bg-[#161f2e] border border-slate-800 p-6 rounded-xl">
            <p className="text-xs font-medium text-slate-400 uppercase">Registered Skills</p>
            <p className="text-3xl font-bold text-cyan-400 mt-2">{skillCount}</p>
          </div>
          <div className="bg-[#161f2e] border border-slate-800 p-6 rounded-xl">
            <p className="text-xs font-medium text-slate-400 uppercase">Contact Inquiries</p>
            <p className="text-3xl font-bold text-indigo-400 mt-2">{messageCount}</p>
          </div>
        </div>

        {/* Quick Actions / Status Banner */}
        <div className="bg-[#161f2e] border border-slate-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-2">System Status</h2>
          <p className="text-sm text-slate-400">
            Authentication cookies are secured via HTTP-only middleware. All portfolio modifications update your local SQLite database file instantly with zero cloud dependency.
          </p>
        </div>
      </main>

  )
}