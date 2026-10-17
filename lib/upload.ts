import fs from 'fs/promises'
import path from 'path'

export async function saveFileLocally(file: File): Promise<string> {
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  // Ensure unique file name using timestamp
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
  const filename = `${uniqueSuffix}-${file.name.replace(/\s+/g, '-')}`
  
  const uploadDir = path.join(process.cwd(), 'public/uploads')
  
  // Ensure the uploads directory exists
  try {
    await fs.access(uploadDir)
  } catch {
    await fs.mkdir(uploadDir, { recursive: true })
  }

  const filePath = path.join(uploadDir, filename)
  await fs.writeFile(filePath, buffer)

  // Return the public relative path for database storage
  return `/uploads/${filename}`
}

export async function deleteFileLocally(filePath: string): Promise<void> {
  if (!filePath) return

  const fullPath = path.join(process.cwd(), 'public', filePath)
  await fs.unlink(fullPath) 
  
}