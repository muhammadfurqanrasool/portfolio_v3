'use server'
import { db } from '@/db'
import { profile } from '@/db/schema'
import { updateProfileAction } from '@/actions/portfolio'
import Image from 'next/image'
import { eq } from 'drizzle-orm'

export default async function AdminProfilePage() {
  const [userProfile] = await db.select().from(profile).where(eq(profile.id, 'main_profile'))

  return (
  
      <main className="flex-1 p-8 overflow-y-auto items-center content-center flex flex-col">
        <header className="flex justify-between items-center mb-8 pb-6 border-b border-slate-800 w-full">
          <div>
            <h1 className="text-2xl font-bold">Profile & Identity</h1>
            <p className="text-sm text-slate-400">Update your hero title, bio, availability status, and profile image.</p>
          </div>
        </header>

        <form action={async (formData:FormData)=>{'use server'; await updateProfileAction(formData)}} className=" w-full h-full bg-[#161f2e] border border-slate-800 rounded-xl p-6 space-y-6">
          
          <div className="flex items-center gap-6 pb-6 border-b border-slate-800">
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-emerald-500/50 bg-slate-900 shrink-0">
              {userProfile?.avatarUrl ? (
                <Image src={userProfile.avatarUrl} alt="Profile" fill className="object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-600 text-xs">No Image</div>
              )}
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 uppercase mb-2">Profile Picture</label>
              <input
                name="avatar"
                type="file"
                accept="image/*"
                className="text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-emerald-950 file:text-emerald-400 hover:file:bg-emerald-900 cursor-pointer"
              />
              <p className="text-[11px] text-slate-500 mt-1">Uploaded images save locally to /public/uploads.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 uppercase mb-1">Full Name</label>
              <input
                name="name"
                type="text"
                defaultValue={userProfile?.name || ''}
                required
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-emerald-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 uppercase mb-1">Job / Role Title</label>
              <input
                name="title"
                type="text"
                defaultValue={userProfile?.title || ''}
                required
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-emerald-500 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 uppercase mb-1">Status Banner</label>
            <input
              name="status"
              type="text"
              defaultValue={userProfile?.status || 'Available for projects'}
              required
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-emerald-500 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 uppercase mb-1">Bio / Overview</label>
            <textarea
              name="bio"
              rows={4}
              defaultValue={userProfile?.bio || ''}
              required
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-emerald-500 text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-medium text-slate-300 uppercase mb-1">GitHub URL</label>
              <input
                name="githubUrl"
                type="url"
                defaultValue={userProfile?.githubUrl || ''}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-emerald-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 uppercase mb-1">LinkedIn URL</label>
              <input
                name="linkedinUrl"
                type="url"
                defaultValue={userProfile?.linkedinUrl || ''}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-emerald-500 text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-semibold rounded-lg transition-colors shadow-lg shadow-emerald-900/20 text-sm mt-4"
          >
            Save Profile Settings
          </button>
        </form>
      </main>
     
  )
}