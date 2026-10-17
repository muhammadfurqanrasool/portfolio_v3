'use server'

import { db } from '@/db'
import { admins } from '@/db/schema'
import { eq } from 'drizzle-orm'
import bcrypt from 'bcrypt'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function loginAction(formData: FormData) {
  const username = formData.get('username') as string
  const password = formData.get('password') as string

  if (!username || !password) {
    return { error: 'All fields are required.' }
  }

  const [admin] = await db.select().from(admins).where(eq(admins.username, username))

  if (!admin || !(await bcrypt.compare(password, admin.passwordHash))) {
    return { error: 'Invalid username or password.' }
  }

  // Set a secure session cookie
  (await cookies()).set({
    name: 'admin_session',
    value: admin.id,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: '/',
  })

  redirect('/admin')
}

export async function logoutAction() {
  (await cookies()).delete('admin_session')
  redirect('/admin/login')
}