import { logoutAction } from "@/actions/auth";
import type { Metadata } from "next";

import Link from "next/link";
import AdminNav from "./_components/AdminNav";

export const metadata: Metadata = {
  title: "Furqan | Dashboard | Next.JS",
  description: "Furqan's personal portfolio website built with Next.js, showcasing projects, skills, and experience in web development.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="p-6 min-h-screen bg-[#0b0f17] text-slate-100 flex">
    <main className="flex w-full rounded-lg overflow-hidden border-gray-800 border">
        <aside className="w-64 bg-[#161f2e] border-r border-slate-800 p-6 flex flex-col justify-between md:flex">
        <div>
          <div className="flex items-center gap-2 mb-8">
            <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-bold tracking-wide text-slate-200">Admin Control</span>
          </div>

          <AdminNav/>
        </div>

        <div>
          <Link href="/" target="_blank" className="block text-xs text-slate-400 hover:text-emerald-400 mb-4 transition-colors">
            View Live Site ↗
          </Link>
          <form action={logoutAction}>
            <button type="submit" className="w-full py-2 bg-red-950/30 hover:bg-red-950/60 border border-red-900/50 text-red-400 rounded-lg text-sm font-medium transition-colors">
              Sign Out
            </button>
          </form>
        </div>
      </aside>
      {children}
    </main>
    </div>
    
  );
}