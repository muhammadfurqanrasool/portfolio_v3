// app/admin/(dashboard)/projects/page.tsx
import { db } from '@/db'
import { projects } from '@/db/schema'
import { createProjectAction, deleteProjectAction } from '@/actions/portfolio'
import { desc } from 'drizzle-orm'
import Image from 'next/image'

export default async function AdminProjectsPage() {
  const allProjects = await db.select().from(projects).orderBy(desc(projects.createdAt))

  return (
    <div className="p-8">
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
          
          <form action={async (formData) => {
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
              <label className="block text-xs font-medium text-slate-300 uppercase mb-1">Project Thumbnail Image</label>
              <input
                name="image"
                type="file"
                accept="image/*"
                className="text-xs text-slate-400 file:mr-4 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-emerald-950 file:text-emerald-400 hover:file:bg-emerald-900 cursor-pointer w-full bg-slate-900 border border-slate-700 rounded-lg p-1"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-medium text-slate-300 uppercase mb-1">GitHub URL</label>
                <input
                  name="githubUrl"
                  type="url"
                  placeholder="https://github.com/..."
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 uppercase mb-1">Live Demo URL</label>
                <input
                  name="demoUrl"
                  type="url"
                  placeholder="https://..."
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500 text-sm"
                />
              </div>
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

        {/* Project List Section */}
        <div className="lg:col-span-2 bg-[#161f2e] border border-slate-800 rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4 text-slate-200">Existing Projects</h2>

          {allProjects.length === 0 ? (
            <p className="text-sm text-slate-500 py-8 text-center">No projects added yet.</p>
          ) : (
            <div className="space-y-4">
              {allProjects.map((project) => (
                <div key={project.id} className="p-4 bg-slate-900 border border-slate-800 rounded-lg flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    {project.imageUrl ? (
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-slate-700 shrink-0">
                        <Image src={project.imageUrl || ""} alt={project.title} fill className="object-cover" />
                      </div>
                    ) : (
                      <div className="w-16 h-16 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px] text-slate-500 shrink-0">
                        No Image
                      </div>
                    )}
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-slate-100">{project.title}</h3>
                        {project.featured && (
                          <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800/50 px-2 py-0.5 rounded-full font-medium">
                            Featured
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-1">{project.description}</p>
                      <div className="flex gap-4 mt-2 text-xs text-emerald-400">
                        {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noreferrer" className="hover:underline">GitHub ↗</a>}
                        {project.demoUrl && <a href={project.demoUrl} target="_blank" rel="noreferrer" className="hover:underline">Live Demo ↗</a>}
                      </div>
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
    </div>
  )
}