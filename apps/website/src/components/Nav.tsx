import { Storefront } from 'switch-icons'

export function Nav() {
  return (
    <header className="border-b border-sand-200">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Storefront className="w-5 h-5 text-marigold-500" />
          <div className="leading-none">
            <p className="font-display font-semibold text-base">Bitvora</p>
            <p className="font-display text-xs text-ink/50">Storefront</p>
          </div>
        </div>
        <nav className="hidden sm:flex items-center gap-6 text-sm text-ink/60">
          <a href="#features" className="hover:text-ink transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-ink transition-colors">How it works</a>
          <a href="http://localhost:3000/login" className="hover:text-ink transition-colors">Log in</a>
        </nav>
        <a
          href="http://localhost:3000/signup"
          className="rounded-lg bg-indigo-600 text-white text-sm font-medium px-4 py-2 hover:bg-indigo-700 transition-colors"
        >
          Get started
        </a>
      </div>
    </header>
  )
}