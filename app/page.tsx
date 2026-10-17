// app/page.tsx
import { db } from '@/db'
import { profile, projects, skills } from '@/db/schema'
import { desc, eq } from 'drizzle-orm'
import Image from 'next/image'
import Link from 'next/link'
import { submitContactAction } from '@/actions/contact'

export default async function PublicPortfolioPage() {
  // Fetch data dynamically from SQLite
  const [userProfile] = await db.select().from(profile).where(eq(profile.id, 'main_profile'))
  const allProjects = await db.select().from(projects).orderBy(desc(projects.createdAt))
  const allSkills = await db.select().from(skills)

  return (
    <div className="min-h-screen bg-[#0b0f17] text-slate-100 selection:bg-emerald-500 selection:text-slate-950 font-sans">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[#0b0f17]/80 border-b border-slate-800/80">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-bold tracking-wider text-slate-200">
            {userProfile?.name ? `${userProfile.name}.dev` : 'Portfolio.dev'}
          </span>
          <div className="flex items-center gap-6 text-sm">
            <a href="#projects" className="text-slate-400 hover:text-emerald-400 transition-colors">Projects</a>
            <a href="#skills" className="text-slate-400 hover:text-emerald-400 transition-colors">Skills</a>
            <a href="#contact" className="text-slate-400 hover:text-emerald-400 transition-colors">Contact</a>
            <Link href="/admin/login" className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-700 transition-colors">
              Admin ↗
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12 space-y-24">
        {/* Hero Section */}
        <section className="py-12 md:py-20 flex flex-col md:flex-row items-center gap-12">
          {userProfile?.avatarUrl && (
            <div className="relative w-100 h-100 md:w-90 md:h-90 rounded-2xl overflow-hidden border-2 border-emerald-500/30 bg-slate-900 shadow-2xl shrink-0">
              <Image sizes='(max-width:400px) (max-height:400px)' src={userProfile.avatarUrl} alt={userProfile.name} fill className="object-cover" priority />
            </div>
          )}
          <div className="space-y-4 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/50 border border-emerald-800/50 text-emerald-400 text-xs font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              {userProfile?.status || 'Available for exciting projects'}
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-50">
              Hi, I&apos;m <span className="text-emerald-400">{userProfile?.name || 'Developer'}</span>
            </h1>
            <p className="text-xl text-slate-400 font-medium">
              {userProfile?.title || 'Full-Stack Software Engineer'}
            </p>
            <p className="text-sm md:text-base text-slate-400 max-w-2xl leading-relaxed">
              {userProfile?.bio || 'Building robust software architectures, high-performance web applications, and embedded hardware solutions.'}
            </p>
            <div className="flex items-center justify-center md:justify-start gap-4 pt-2">
              {userProfile?.githubUrl && (
                <a href={userProfile.githubUrl} target="_blank" rel="noreferrer" className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-sm font-medium transition-colors border border-slate-700">
                  GitHub ↗
                </a>
              )}
              {userProfile?.linkedinUrl && (
                <a href={userProfile.linkedinUrl} target="_blank" rel="noreferrer" className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-sm font-medium transition-colors border border-slate-700">
                  LinkedIn ↗
                </a>
              )}
              <a href="#contact" className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-slate-950 rounded-lg text-sm font-semibold transition-colors shadow-lg shadow-emerald-900/20">
                Get in Touch
              </a>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-50">Featured Projects</h2>
            <p className="text-sm text-slate-400 mt-1">A selection of recent engineering and development work.</p>
          </div>

          {allProjects.length === 0 ? (
            <div className="bg-[#161f2e] border border-slate-800 rounded-xl p-12 text-center text-slate-500">
              No projects published yet. Check back soon!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {allProjects.map((project) => (
                <div key={project.id} className="bg-[#161f2e] hover:scale-105 border border-slate-800 rounded-xl overflow-hidden flex flex-col justify-between hover:border-slate-700 transition">
                  <div>
                    {project.imageUrl && (
                      <div className="relative w-135 h-100 bg-slate-900 border-b border-slate-800">
                        <Image sizes='(max-width:1280px) (max-height:720px)' src={project.imageUrl} alt={project.title} fill className="object-cover" />
                      </div>
                    )}
                    <div className="p-6 space-y-3">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-slate-100">{project.title}</h3>
                        {project.featured && (
                          <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800/50 px-2 py-0.5 rounded-full font-medium">
                            Featured
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-slate-400 leading-relaxed">{project.description}</p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 flex items-center gap-4 text-sm font-medium text-emerald-400">
                    {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noreferrer" className="hover:underline">GitHub Repository ↗</a>}
                    {project.demoUrl && <a href={project.demoUrl} target="_blank" rel="noreferrer" className="hover:underline">Live Demo ↗</a>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Skills Section */}
        <section id="skills" className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-50">Tech Stack & Skills</h2>
            <p className="text-sm text-slate-400 mt-1">Technologies and tools I work with.</p>
          </div>

          {allSkills.length === 0 ? (
            <div className="bg-[#161f2e] border border-slate-800 rounded-xl p-8 text-center text-slate-500">
              No skills listed yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {allSkills.map((skill) => (
                <div key={skill.id} className="bg-[#161f2e] hover:border-emerald-400 transition border border-slate-800 rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] bg-slate-900 text-emerald-400 px-2 py-0.5 rounded font-mono uppercase border border-slate-800">
                      {skill.category}
                    </span>
                    <h4 className="font-semibold text-slate-100 mt-2">{skill.name}</h4>
                  </div>
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full ${
                          i < (skill.level || 0) ? 'bg-emerald-500' : 'bg-slate-800'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Contact Form Section */}
        <section id="contact" className="space-y-8 pb-16">
          <div className="max-w-xl">
            <h2 className="text-2xl font-bold tracking-tight text-slate-50">Get In Touch</h2>
            <p className="text-sm text-slate-400 mt-1">Have a project in mind or want to chat? Drop a message below.</p>
          </div>

          <div className="max-w-xl bg-[#161f2e] border border-slate-800 rounded-xl p-8">
            <form action={async (formData) => {
              'use server'
              const res = await submitContactAction(formData)
              if (res.success) {
                // In a client form component you'd handle success state cleanly, 
                // but standard Server Action form handles submission directly.
              }
            }} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 uppercase mb-1">Your Name</label>
                <input
                  name="name"
                  type="text"
                  required
                  placeholder="John Doe"
                  className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-emerald-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 uppercase md-1">Email Address</label>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="john@example.com"
                  className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-emerald-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 uppercase mb-1">Message</label>
                <textarea
                  name="message"
                  rows={4}
                  required
                  placeholder="Tell me about your project..."
                  className="w-full px-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-emerald-500 text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-semibold rounded-lg transition-colors shadow-lg shadow-emerald-900/20 text-sm"
              >
                Send Message
              </button>
            </form>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-8 text-center text-xs text-slate-500">
        <p>© 2026 {userProfile?.name || 'Portfolio'}. Built with Next.js</p>
      </footer>
    </div>
  )
}