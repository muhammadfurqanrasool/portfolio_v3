'use server'

import { db } from '@/db'
import { contactMessages } from '@/db/schema'
import { randomUUID } from 'crypto'

export async function submitContactAction(formData: FormData) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const message = formData.get('message') as string

  if (!name || !email || !message) {
    return { success: false, error: 'Please fill out all fields.' }
  }

  try {
    await db.insert(contactMessages).values({
      id: randomUUID(),
      name,
      email,
      message,
    })

    return { success: true, message: 'Message sent successfully!' }
  } catch (error) {
    console.error('Failed to save contact message:', error)
    return { success: false, error: 'Something went wrong. Please try again.' }
  }
}