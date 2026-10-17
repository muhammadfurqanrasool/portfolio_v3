import { db } from './index'
import { admins, projects, skills } from './schema'
import bcrypt from 'bcrypt'

async function main() {
  console.log('🌱 Starting database seeding...')

  // 1. Create a default admin user (password: "admin123")
  const hashedPassword = await bcrypt.hash('admin123', 10)
  
  await db.insert(admins).values({
    id: 'admin-1',
    username: 'furqan',
    passwordHash: hashedPassword,
  }).onConflictDoNothing() // Prevents duplicate key errors if run twice

  // 2. Insert initial skills
  await db.insert(skills).values([
    { id: '1', name: 'Next.js', category: 'Frontend', level: 5 },
    { id: '2', name: 'TypeScript', category: 'Frontend', level: 5 },
    { id: '3', name: 'Node.js', category: 'Backend', level: 4 },
    { id: '4', name: 'SQLite', category: 'Backend', level: 4 },
    { id: '5', name: 'ESP32 / IoT', category: 'Hardware', level: 4 },
  ]).onConflictDoNothing()
  console.log('✅ Database seeded successfully!')
}

main().catch((err) => {
  console.error('❌ Error seeding database:', err)
  process.exit(1)
})