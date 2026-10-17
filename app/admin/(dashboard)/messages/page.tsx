// app/admin/messages/page.tsx
import { db } from '@/db'
import { contactMessages } from '@/db/schema'
import { deleteMessageAction } from '@/actions/portfolio'
import { desc } from 'drizzle-orm'

export default async function AdminMessagesPage() {
  const allMessages = await db.select().from(contactMessages).orderBy(desc(contactMessages.createdAt))

  return (
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8 pb-6 border-b border-slate-800">
          <div>
            <h1 className="text-2xl font-bold">Inbox & Inquiries</h1>
            <p className="text-sm text-slate-400">Messages sent directly from your website contact form.</p>
          </div>
          <span className="text-xs bg-slate-800 text-slate-300 px-3 py-1.5 rounded-full border border-slate-700">
            Total: {allMessages.length} Messages
          </span>
        </header>

        {allMessages.length === 0 ? (
          <div className="bg-[#161f2e] border border-slate-800 rounded-xl p-12 text-center text-slate-500">
            No contact messages received yet.
          </div>
        ) : (
          <div className="space-y-4">
            {allMessages.map((msg) => (
              <div key={msg.id} className="bg-[#161f2e] border border-slate-800 rounded-xl p-6">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-semibold text-slate-100">{msg.name}</h3>
                    <a href={`mailto:${msg.email}`} className="text-xs text-emerald-400 hover:underline">
                      {msg.email}
                    </a>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-[11px] text-slate-500 font-mono">
                      {new Date(msg.createdAt).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>

                    <form action={async () => {
                      'use server'
                      await deleteMessageAction(msg.id)
                    }}>
                      <button
                        type="submit"
                        className="px-3 py-1 bg-red-950/40 hover:bg-red-950 border border-red-900/50 text-red-400 rounded text-xs font-medium transition-colors"
                      >
                        Delete
                      </button>
                    </form>
                  </div>
                </div>

                <p className="text-sm text-slate-300 bg-slate-900/80 p-4 rounded-lg border border-slate-800/60 leading-relaxed whitespace-pre-wrap">
                  {msg.message}
                </p>
              </div>
            ))}
          </div>
        )}
      </main>

  )
}