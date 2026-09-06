import Image from 'next/image'

export function Nav() {
  return (
    <header className="border-b border-sand-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0 shrink">
          <Image
            src="/brand/icon-light-bg.svg"
            alt="Bitvora Storefront"
            width={120}
            height={30}
            className="h-6 sm:h-7 w-auto shrink-0"
          />
          <span className="font-display font-semibold text-sm sm:text-base truncate">
            Bitvora <span className="hidden sm:inline">Storefront</span>
          </span>
        </div>

        <nav className="hidden sm:flex items-center gap-6 text-sm text-ink/60 shrink-0">
          <a href="#features" className="hover:text-ink transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-ink transition-colors">How it works</a>
          <a href="http://localhost:3000/login" className="hover:text-ink transition-colors">Log in</a>
        </nav>

        <a
          href="http://localhost:3000/signup"
          className="shrink-0 rounded-lg bg-indigo-600 text-white text-xs sm:text-sm font-medium px-3 sm:px-4 py-2 hover:bg-indigo-700 transition-colors whitespace-nowrap"
        >
          Get started
        </a>
      </div>
    </header>
  )
}