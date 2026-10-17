'use server'

import { db } from '@/db'
import { projects, skills, contactMessages } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { randomUUID } from 'crypto'
import { revalidatePath } from 'next/cache'
import { saveFileLocally } from '@/lib/upload'
import { profile } from '@/db/schema'


export async function updateProfileAction(formData: FormData) {
  const name = formData.get('name') as string
  const title = formData.get('title') as string
  const status = formData.get('status') as string
  const bio = formData.get('bio') as string
  const githubUrl = formData.get('githubUrl') as string
  const linkedinUrl = formData.get('linkedinUrl') as string
  const avatarFile = formData.get('avatar') as File | null

  let avatarUrl: string | undefined = undefined

  // Handle image file upload if a new file was provided
  if (avatarFile && avatarFile.size > 0) {
    avatarUrl = await saveFileLocally(avatarFile)
  }

  // Check if a profile record exists
  const existingProfile = await db.select().from(profile).where(eq(profile.id, 'main_profile'))

  if (existingProfile.length === 0) {
    // Create baseline record
    await db.insert(profile).values({
      id: 'main_profile',
      name,
      title,
      status,
      bio,
      avatarUrl: avatarUrl || '/uploads/default-avatar.png',
      githubUrl: githubUrl || null,
      linkedinUrl: linkedinUrl || null,
    })
  } else {
    // Update existing record
    await db.update(profile).set({
      name,
      title,
      status,
      bio,
      ...(avatarUrl ? { avatarUrl } : {}),
      githubUrl: githubUrl || null,
      linkedinUrl: linkedinUrl || null,
    }).where(eq(profile.id, 'main_profile'))
  }

  revalidatePath('/')
  revalidatePath('/admin/profile')
  return { success: true }
}

export async function createProjectAction(formData: FormData) {
  const title = formData.get('title') as string
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  const description = formData.get('description') as string
  const githubUrl = formData.get('githubUrl') as string
  const demoUrl = formData.get('demoUrl') as string
  const featured = formData.get('featured') === 'on'

  try {
    await db.insert(projects).values({
      id: randomUUID(),
      title,
      slug,
      description,
      githubUrl: githubUrl || null,
      demoUrl: demoUrl || null,
      featured,
    })

    revalidatePath('/')
    revalidatePath('/admin/projects')
    return { success: true }
  } catch (error) {
    console.error('Failed to create project:', error)
    return { success: false, error: 'Failed to create project.' }
  }
}

export async function deleteProjectAction(id: string) {
  try {
    await db.delete(projects).where(eq(projects.id, id))
    revalidatePath('/')
    revalidatePath('/admin/projects')
    return { success: true }
  } catch (error) {
    console.error('Failed to delete project:', error)
    return { success: false, error: 'Failed to delete project.' }
  }
}
export async function createSkillAction(formData: FormData) {
  const name = formData.get('name') as string
  const category = formData.get('category') as string
  const level = Number(formData.get('level')) || 3

  try {
    await db.insert(skills).values({
      id: randomUUID(),
      name,
      category,
      level,
    })

    revalidatePath('/')
    revalidatePath('/admin/skills')
    return { success: true }
  } catch (error) {
    console.error('Failed to create skill:', error)
    return { success: false, error: 'Failed to create skill.' }
  }
}

export async function deleteSkillAction(id: string) {
  try {
    await db.delete(skills).where(eq(skills.id, id))
    revalidatePath('/')
    revalidatePath('/admin/skills')
    return { success: true }
  } catch (error) {
    console.error('Failed to delete skill:', error)
    return { success: false, error: 'Failed to delete skill.' }
  }
}

export async function deleteMessageAction(id: string) {
  try {
    await db.delete(contactMessages).where(eq(contactMessages.id, id))
    revalidatePath('/admin/messages')
    return { success: true }
  } catch (error) {
    console.error('Failed to delete message:', error)
    return { success: false, error: 'Failed to delete message.' }
  }
}