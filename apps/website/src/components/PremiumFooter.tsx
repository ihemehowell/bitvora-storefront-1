import Link from 'next/link'
import { IconBrandTwitter, IconBrandInstagram, IconBrandTiktok, IconSend } from '@tabler/icons-react'
import { AdireStrip } from './AdireStrip'

export function PremiumFooter() {
  return (
    <footer className="bg-indigo-950 text-paper">
      <AdireStrip dark />
      <div className="mx-auto max-w-[1240px] px-8 py-20">
        <div className="grid md:grid-cols-[1.3fr_1fr] gap-12 mb-16">
          <div>
            <h2 className="mb-4 font-display text-4xl font-bold leading-tight md:text-5xl">
              Get pro <span className="text-marigold-500">support.</span>
            </h2>
            <p className="mb-7 max-w-[460px] text-[15px] leading-relaxed text-paper/65">
              We&apos;re here to help. If you need assistance switching from your current setup, have questions about whether Bitvora Storefront fits your business, or want help getting started, talk to a member of our team.
            </p>
            <Link
              href="http://localhost:3000/signup"
              className="inline-flex items-center gap-2 rounded-lg bg-marigold-500 px-5 py-3 text-[14.5px] font-semibold text-indigo-950 transition hover:-translate-y-px"
            >
              Get started →
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-8 text-[13.5px]">
            <div>
              <p className="mb-1.5 text-paper/50">WhatsApp</p>
              <p className="font-semibold">+234 903 867 9199</p>
            </div>
            <div>
              <p className="mb-1.5 text-paper/50">Email</p>
              <p className="font-semibold">help@bitvorastorefront.com</p>
            </div>
            <div className="col-span-2">
              <div className="flex items-center gap-3 mt-2">
                <IconBrandTwitter size={18} className="text-paper/70 hover:text-paper transition-colors cursor-pointer" />
                <IconBrandInstagram size={18} className="text-paper/70 hover:text-paper transition-colors cursor-pointer" />
                <IconBrandTiktok size={18} className="text-paper/70 hover:text-paper transition-colors cursor-pointer" />
                <IconSend size={18} className="text-paper/70 hover:text-paper transition-colors cursor-pointer" />
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-paper/10 pt-8">
          <p className="mb-6 max-w-[820px] text-[13px] leading-relaxed text-paper/50">
            Bitvora Storefront is a Bitvoratech product built to empower Nigerian businesses with storefronts that look like their brand — WhatsApp ordering, Naira pricing, and Lagos-first delivery, all in one place.
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-[13px] text-paper/50">
            <span>© {new Date().getFullYear()} Bitvoratech. All rights reserved.</span>
            <div className="flex items-center gap-4">
              <Link href="/terms" className="hover:text-paper transition-colors">Terms</Link>
              <Link href="/privacy" className="hover:text-paper transition-colors">Privacy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}