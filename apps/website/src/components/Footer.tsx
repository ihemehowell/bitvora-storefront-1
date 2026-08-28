import { Storefront } from 'switch-icons'

export function Footer() {
  return (
    <footer className="border-t border-sand-200 py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Storefront className="w-4 h-4 text-marigold-500" />
          <p className="text-sm text-ink/50">Bitvora Storefront — a Bitvoratech product</p>
        </div>
        <p className="text-xs text-ink/30">© {new Date().getFullYear()} Bitvoratech. All rights reserved.</p>
      </div>
    </footer>
  )
}