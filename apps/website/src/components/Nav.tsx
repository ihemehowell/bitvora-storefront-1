import Image from 'next/image'
import { Storefront } from 'switch-icons'

export function Nav() {
  return (
    <header className="border-b border-sand-200">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
           <Image
              src="/brand/icon-light-bg.svg"
              alt="Bitvora Logo"
              width={120}
              height={30}
              className="h-7 w-auto"
            />
            <span className="font-display font-semibold text-base">Bitvora</span>
            <span className="font-display font-semibold text-base">Storefront</span>
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