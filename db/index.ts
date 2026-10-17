import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import * as schema from './schema'

// Opens or creates 'sqlite.db' in your project root
const sqlite = new Database('sqlite.db')
export const db = drizzle(sqlite, { schema })