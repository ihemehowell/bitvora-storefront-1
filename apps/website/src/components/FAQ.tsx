'use client'

import { useState } from 'react'
import { IconChevronDown } from '@tabler/icons-react'

const FAQS = [
  { q: 'Do I need to know how to code?', a: 'No. Bitvora Storefront is built for non-technical merchants — you customize your store visually, no code required.' },
  { q: 'Can customers order via WhatsApp?', a: 'Yes. Every product has a built-in "Order via WhatsApp" option that pre-fills the customer\'s message with product details.' },
  { q: 'What payment methods are supported?', a: 'Bank transfer and pay-on-delivery are supported today, with card payments coming soon.' },
  { q: 'Can I use my own domain?', a: 'Custom domains are on our roadmap. Right now, your store gets a Bitvora Storefront link you can share anywhere.' },
  { q: 'Is there a free plan?', a: 'Yes — you can create your store, add products, and start selling for free.' },
]

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="py-24">
      <div className="mx-auto max-w-[760px] px-8">
        <div className="mx-auto mb-12 max-w-[560px] text-center">
          <span className="mb-3 block text-[12.5px] font-bold uppercase tracking-widest text-pepper-600">
            Questions
          </span>
          <h2 className="font-display text-3xl font-bold md:text-4xl">Frequently asked questions</h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((item, i) => (
            <div key={i} className="rounded-xl border border-sand-300 bg-paper overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="font-medium text-[15px]">{item.q}</span>
                <IconChevronDown
                  size={18}
                  className={`shrink-0 text-ink-soft transition-transform ${open === i ? 'rotate-180' : ''}`}
                />
              </button>
              {open === i && (
                <div className="px-5 pb-4 text-[14px] leading-relaxed text-ink-soft">{item.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}