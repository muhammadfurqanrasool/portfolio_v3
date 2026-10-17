// app/admin/projects/page.tsx
import { db } from '@/db'
import { projects } from '@/db/schema'
import { createProjectAction, deleteProjectAction } from '@/actions/portfolio'
import { desc } from 'drizzle-orm'

export default async function AdminProjectsPage() {
  // Fetch existing projects from SQLite
  const allProjects = await db.select().from(projects).orderBy(desc(projects.createdAt))

  return (
   
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8 pb-6 border-b border-slate-800">
          <div>
            <h1 className="text-2xl font-bold">Manage Projects</h1>
            <p className="text-sm text-slate-400">Add, view, or remove projects displayed on your portfolio.</p>
          </div>
          <span className="text-xs bg-slate-800 text-slate-300 px-3 py-1.5 rounded-full border border-slate-700">
            Total: {allProjects.length} Projects
          </span>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Add Project Form Section */}
          <div className="bg-[#161f2e] border border-slate-800 rounded-xl p-6 h-fit">
            <h2 className="text-lg font-semibold mb-4 text-slate-200">Add New Project</h2>
            
            <form action={async (formData: FormData) => {
              'use server'
              await createProjectAction(formData)
            }} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 uppercase mb-1">Project Title</label>
                <input
                  name="title"
                  type="text"
                  required
                  placeholder="e.g. Smart IoT Dashboard"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 uppercase mb-1">Description</label>
                <textarea
                  name="description"
                  required
                  rows={3}
                  placeholder="Brief overview of features and tech stack..."
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 uppercase mb-1">GitHub URL (Optional)</label>
                <input
                  name="githubUrl"
                  type="url"
                  placeholder="https://github.com/..."
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 uppercase mb-1">Live Demo URL (Optional)</label>
                <input
                  name="demoUrl"
                  type="url"
                  placeholder="https://..."
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500 text-sm"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  name="featured"
                  type="checkbox"
                  id="featured"
                  className="w-4 h-4 bg-slate-900 border-slate-700 rounded text-emerald-600 focus:ring-emerald-500"
                />
                <label htmlFor="featured" className="text-sm text-slate-300 cursor-pointer">
                  Feature on homepage
                </label>
              </div>

              <button
                type="submit"
                className="w-full mt-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-semibold rounded-lg transition-colors shadow-lg shadow-emerald-900/20 text-sm"
              >
                Create Project
              </button>
            </form>
          </div>

          {/* Project List Table Section */}
          <div className="lg:col-span-2 bg-[#161f2e] border border-slate-800 rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-4 text-slate-200">Existing Projects</h2>

            {allProjects.length === 0 ? (
              <p className="text-sm text-slate-500 py-8 text-center">No projects added yet. Use the form to create your first entry.</p>
            ) : (
              <div className="space-y-4">
                {allProjects.map((project) => (
                  <div key={project.id} className="p-4 bg-slate-900 border border-slate-800 rounded-lg flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-slate-100">{project.title}</h3>
                        {project.featured && (
                          <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800/50 px-2 py-0.5 rounded-full font-medium">
                            Featured
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2">{project.description}</p>
                      <div className="flex gap-4 mt-3 text-xs text-emerald-400">
                        {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noreferrer" className="hover:underline">GitHub ↗</a>}
                        {project.demoUrl && <a href={project.demoUrl} target="_blank" rel="noreferrer" className="hover:underline">Live Demo ↗</a>}
                      </div>
                    </div>

                    <form action={async () => {
                      'use server'
                      await deleteProjectAction(project.id)
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