import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const profile = sqliteTable('profile', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  title: text('title').notNull(),
  status: text('status').notNull(), // e.g. "Available for projects" or "BS Computer Science @ SHU"
  bio: text('bio').notNull(),
  avatarUrl: text('avatar_url'),
  githubUrl: text('github_url'),
  linkedinUrl: text('linkedin_url'),
})
export const projects = sqliteTable('projects', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description').notNull(),
  imageUrl: text('image_url'), 
  githubUrl: text('github_url'),
  demoUrl: text('demo_url'),
  featured: integer('featured', { mode: 'boolean' }).default(false),
  createdAt: text('created_at').default('CURRENT_TIMESTAMP'),
})

export const skills = sqliteTable('skills', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  category: text('category').notNull(),
  level: integer('level'),
})

export const contactMessages = sqliteTable('contact_messages', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  message: text('message').notNull(),
  createdAt: text('created_at').notNull().$defaultFn(() => new Date().toISOString()),
})

export const admins = sqliteTable('admins', {
  id: text('id').primaryKey(),
  username: text('username').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
})