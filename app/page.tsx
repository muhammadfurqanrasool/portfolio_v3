
import { db } from '../db'
import { projects, skills } from '../db/schema'

export default async function Home() {
  // Fully type-safe query
  const allProjects = await db.select().from(projects)
  const allSkills = await db.select().from(skills)
  console.log('All Projects:', allProjects) // Log the fetched projects for debugging
  console.log('All Skills:', allSkills) // Log the fetched skills for debugging

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">My Portfolio</h1>
      <div className="mt-4 grid gap-4 m">
        {allProjects.map((project) => (
          <div key={project.id} className="p-4 border rounded-lg">
            <h2 className="font-semibold">{project.title}</h2>
            <p>{project.description}</p>
          </div>
        ))}
      </div>
    </main>
  )
}
