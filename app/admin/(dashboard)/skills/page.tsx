// app/admin/skills/page.tsx
import { db } from '@/db'
import { skills } from '@/db/schema'
import { createSkillAction, deleteSkillAction } from '@/actions/portfolio'
import Link from 'next/link'
import { desc } from 'drizzle-orm'

export default async function AdminSkillsPage() {
  const allSkills = await db.select().from(skills).orderBy(desc(skills.category))

  return (
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8 pb-6 border-b border-slate-800">
          <div>
            <h1 className="text-2xl font-bold">Skills & Technologies</h1>
            <p className="text-sm text-slate-400">Manage your tech stack categories and proficiency levels.</p>
          </div>
          <span className="text-xs bg-slate-800 text-slate-300 px-3 py-1.5 rounded-full border border-slate-700">
            Total: {allSkills.length} Skills
          </span>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Add Skill Form */}
          <div className="bg-[#161f2e] border border-slate-800 rounded-xl p-6 h-fit">
            <h2 className="text-lg font-semibold mb-4 text-slate-200">Add New Skill</h2>

            <form
              action={async (formData: FormData) => {
                'use server'
                await createSkillAction(formData)   
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-medium text-slate-300 uppercase mb-1">Skill Name</label>
                <input
                  name="name"
                  type="text"
                  required
                  placeholder="e.g. Next.js, C++, ESP32"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 uppercase mb-1">Category</label>
                <select
                  name="category"
                  required
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-emerald-500 text-sm"
                >
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="Database">Database & ORM</option>
                  <option value="Hardware">Hardware / Embedded / IoT</option>
                  <option value="Systems">Linux / DevOps / Systems</option>
                  <option value="Languages">Programming Languages</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 uppercase mb-1">Proficiency Level (1 - 5)</label>
                <input
                  name="level"
                  type="number"
                  min="1"
                  max="5"
                  defaultValue="4"
                  required
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-emerald-500 text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-semibold rounded-lg transition-colors shadow-lg shadow-emerald-900/20 text-sm"
              >
                Add Skill
              </button>
            </form>
          </div>

          {/* Skill Matrix View */}
          <div className="lg:col-span-2 bg-[#161f2e] border border-slate-800 rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4 text-slate-200">Registered Tech Stack</h2>

            {allSkills.length === 0 ? (
              <p className="text-sm text-slate-500 py-8 text-center">No skills added yet.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {allSkills.map((skill) => (
                  <div key={skill.id} className="p-4 bg-slate-900 border border-slate-800 rounded-lg flex items-center justify-between">
                    <div>
                      <span className="text-[10px] bg-slate-800 text-emerald-400 px-2 py-0.5 rounded font-mono uppercase tracking-wider">
                        {skill.category}
                      </span>
                      <h3 className="font-semibold text-slate-100 mt-1">{skill.name}</h3>
                      <div className="flex gap-1 mt-2">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <div
                            key={i}
                            className={`w-2.5 h-2.5 rounded-full ${
                              i < (skill.level || 0) ? 'bg-emerald-500' : 'bg-slate-800'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    <form action={async () => {
                      'use server'
                      await deleteSkillAction(skill.id)
                    }}>
                      <button
                        type="submit"
                        className="px-3 py-1.5 bg-red-950/40 hover:bg-red-950 border border-red-900/50 text-red-400 rounded text-xs font-medium transition-colors"
                      >
                        Delete
                      </button>
                    </form>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
  )
}