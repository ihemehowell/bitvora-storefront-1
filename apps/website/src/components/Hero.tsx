'use client'

import { useState } from 'react'
import { PackageBox } from 'switch-icons'

const SWATCHES = [
  { name: 'Rose', value: '#B5495B' },
  { name: 'Indigo', value: '#2A3B8F' },
  { name: 'Marigold', value: '#E8A33D' },
  { name: 'Palm', value: '#3F7D5C' },
  { name: 'Ocean', value: '#1D6C8C' },
]

export function Hero() {
  const [accent, setAccent] = useState(SWATCHES[0].value)

  return (
    <section className="relative overflow-hidden bg-indigo-900">
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '18px 18px',
        }}
      />
      <div
        className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ backgroundColor: 'var(--color-marigold-500)' }}
      />

      <div className="relative max-w-6xl mx-auto px-6 py-20 sm:py-28 grid lg:grid-cols-2 gap-14 items-center">
        <div>
          <h1 className="font-display font-semibold text-4xl sm:text-5xl text-white leading-[1.1] mb-5">
            Storefronts that look like your brand, not a template.
          </h1>
          <p className="text-indigo-200/80 text-lg mb-8 max-w-md">
            Build a fast, beautiful online store built for how Nigerians actually sell — WhatsApp orders, Naira pricing, Lagos delivery, no code required.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="http://localhost:3000/signup"
              className="rounded-lg bg-marigold-500 text-indigo-900 font-medium px-6 py-3 hover:opacity-90 transition-opacity"
            >
              Start building free
            </a>
            <a
              href="#how-it-works"
              className="rounded-lg border border-white/20 text-white font-medium px-6 py-3 hover:bg-white/5 transition-colors"
            >
              See how it works
            </a>
          </div>
        </div>

        {/* Interactive mock storefront card */}
        <div>
          <div className="bg-white rounded-2xl p-5 shadow-2xl max-w-sm mx-auto">
            <div className="aspect-square rounded-xl bg-sand-100 mb-4 flex items-center justify-center">
              <PackageBox className="w-10 h-10 text-ink/20" />
            </div>
            <p className="font-mono font-semibold text-lg text-ink">₦18,500</p>
            <p className="text-sm text-ink/60 mb-4">Woven Raffia Tote</p>
            <button
              className="w-full rounded-lg py-2.5 text-sm font-medium text-white transition-colors"
              style={{ backgroundColor: accent }}
            >
              Order via WhatsApp
            </button>
          </div>
          <div className="flex items-center justify-center gap-2 mt-5">
            {SWATCHES.map((swatch) => (
              <button
                key={swatch.value}
                onClick={() => setAccent(swatch.value)}
                title={swatch.name}
                className={`w-8 h-8 rounded-full border-2 transition-all ${
                  accent === swatch.value ? 'border-white scale-110' : 'border-transparent hover:scale-105'
                }`}
                style={{ backgroundColor: swatch.value }}
              />
            ))}
          </div>
          <p className="text-center text-xs text-indigo-300/60 mt-2">
            This is your storefront's brand color — try one
          </p>
        </div>
      </div>
    </section>
  )
}