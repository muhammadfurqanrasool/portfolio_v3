
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/admin', label: 'Overview', exact: true },
  { href: '/admin/profile', label: 'Profile & Identity' },
  { href: '/admin/projects', label: 'Manage Projects' },
  { href: '/admin/skills', label: 'Skills & Matrix' },
  { href: '/admin/messages', label: 'Inbox Messages' },
]

export default function AdminNav() {
  const pathname = usePathname()

  return (
    <nav className="space-y-2">
      {navItems.map((item) => {
        // Check if the current route matches the nav item
        const isActive = item.exact
          ? pathname === item.href
          : pathname.startsWith(item.href)

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`block px-4 py-2.5 rounded-lg transition-colors font-medium text-sm ${
              isActive
                ? 'bg-emerald-600/10 text-emerald-400 border border-emerald-500/20'
                : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50 border border-transparent'
            }`}
          >
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}