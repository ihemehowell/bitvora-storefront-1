'use client'

import { useSyncExternalStore } from 'react'
import { IconSun, IconMoon } from '@tabler/icons-react'

const THEME_STORAGE_KEY = 'bitvora-admin-theme'

export function ThemeToggle({ collapsed }: { collapsed?: boolean }) {
  // Real state lives on the <html> class (set pre-hydration by ThemeScript).
  const isDark = useSyncExternalStore(
    (onStoreChange) => {
      const observer = new MutationObserver(onStoreChange)
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class'],
      })
      return () => observer.disconnect()
    },
    () => document.documentElement.classList.contains('dark'),
    () => false,
  )

  function toggle() {
    const next = !isDark
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem(THEME_STORAGE_KEY, next ? 'dark' : 'light')
  }

  const label = isDark ? 'Light mode' : 'Dark mode'

  return (
    <button
      onClick={toggle}
      className={`group relative w-full flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-indigo-100/70 hover:bg-white/5 hover:text-white transition-colors ${
        collapsed ? 'justify-center' : ''
      }`}
    >
      {isDark ? (
        <IconSun className="w-4 h-4 shrink-0" stroke={1.75} />
      ) : (
        <IconMoon className="w-4 h-4 shrink-0" stroke={1.75} />
      )}
      {!collapsed && label}
      {collapsed && (
        <span className="pointer-events-none absolute left-full ml-3 whitespace-nowrap rounded-md bg-white px-2.5 py-1.5 text-xs font-medium text-indigo-950 opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100 z-50">
          {label}
        </span>
      )}
    </button>
  )
}
