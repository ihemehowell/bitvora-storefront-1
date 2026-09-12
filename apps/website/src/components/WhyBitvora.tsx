import { IconCheck, IconX, IconBrandWhatsapp, IconPalette, IconBolt, IconShieldCheck } from '@tabler/icons-react'

const PILLARS = [
  {
    icon: IconPalette,
    tag: 'Real branding',
    title: 'Your store looks like your business, not a rented template.',
    body: 'Most store builders in Nigeria give every merchant the same layout with a different logo pasted on top. We built Bitvora Storefront the other way around: pick your accent color, your font pairing, your hero image, your homepage sections — and the platform disappears behind your brand. Customers see your business. They never see ours.',
  },
  {
    icon: IconBrandWhatsapp,
    tag: 'Sell where you already sell',
    title: 'WhatsApp isn\'t an afterthought — it\'s the default.',
    body: 'Nigerian commerce runs on WhatsApp, and pretending otherwise is why so many "modern" storefronts feel disconnected from how sellers actually operate. Every product on Bitvora Storefront has a built-in "Order via WhatsApp" button that auto-fills the product name, price, and quantity into a message — so customers can order the exact same way they already do, just faster.',
  },
  {
    icon: IconBolt,
    tag: 'Built for real conditions',
    title: 'Fast on a budget phone, on a slow connection, in real Lagos traffic.',
    body: 'A lot of storefront builders are engineered for demo videos on fast wifi and flagship phones — not the reality of most Nigerian shoppers. We built Bitvora Storefront on modern, statically-rendered web architecture specifically so pages load quickly even on mid-range Android devices and inconsistent mobile data. Speed isn\'t a nice-to-have here, it\'s survival.',
  },
  {
    icon: IconShieldCheck,
    tag: 'No games',
    title: 'Straightforward pricing, real delivery pricing, no invented numbers.',
    body: 'We won\'t show you fake trust badges, invented customer counts, or "4.9 star" ratings with no reviews behind them. What you see is what\'s real: transparent checkout with bank transfer and pay-on-delivery, area-based delivery pricing built for Lagos logistics, and a product that tells you honestly what it can and can\'t do yet.',
  },
]

const COMPARISON = [
  { us: 'Real brand customization, not templates', them: 'Generic templates everyone shares' },
  { us: 'WhatsApp ordering built in from day one', them: 'Bolted-on integrations, if any' },
  { us: 'Fast, static-rendered storefronts', them: 'Slow page loads on mobile' },
  { us: 'Transparent, no hidden fees', them: 'Unclear settlement and fee structures' },
]

export function WhyBitvora() {
  return (
    <section className="bg-paper-dim py-24 md:py-32">
      <div className="mx-auto max-w-[1240px] px-8">
        <div className="mx-auto mb-20 max-w-[680px] text-center">
          <span className="mb-3 block text-[12.5px] font-bold uppercase tracking-widest text-pepper-600">
            Why Bitvora Storefront
          </span>
          <h2 className="mb-5 font-display text-3xl font-bold md:text-5xl leading-tight">
            We didn&apos;t build another generic store builder.
          </h2>
          <p className="text-[17px] leading-relaxed text-ink-soft">
            Most storefront platforms in Nigeria were adapted from Western templates, then patched to add Naira pricing and a WhatsApp button. We built Bitvora Storefront from the ground up around how Nigerian merchants and customers actually behave — and that difference shows up in every decision below.
          </p>
        </div>

        <div className="space-y-16 md:space-y-24 mb-24">
          {PILLARS.map((pillar, i) => (
            <div
              key={pillar.tag}
              className={`grid md:grid-cols-2 gap-10 items-center ${i % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''}`}
            >
              <div>
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-900 text-marigold-500">
                  <pillar.icon size={20} />
                </div>
                <span className="mb-2 block text-[12px] font-bold uppercase tracking-widest text-pepper-600">
                  {pillar.tag}
                </span>
                <h3 className="mb-4 font-display text-2xl md:text-3xl font-bold leading-tight">
                  {pillar.title}
                </h3>
                <p className="text-[15.5px] leading-relaxed text-ink-soft">
                  {pillar.body}
                </p>
              </div>
              <div className="rounded-2xl bg-indigo-900 p-8 md:p-10 aspect-[4/3] flex items-center justify-center">
                <pillar.icon size={64} className="text-marigold-500/30" />
              </div>
            </div>
          ))}
        </div>

        <div className="mx-auto max-w-[900px]">
          <h3 className="mb-8 text-center font-display text-2xl font-bold md:text-3xl">
            Side by side, it&apos;s not close.
          </h3>
          <div className="rounded-2xl border border-sand-300 bg-paper overflow-hidden">
            <div className="grid grid-cols-2 border-b border-sand-300">
              <div className="p-4 text-center font-display font-semibold text-indigo-900 border-r border-sand-300">
                Bitvora Storefront
              </div>
              <div className="p-4 text-center font-display font-semibold text-ink-soft">
                Typical store builders
              </div>
            </div>
            {COMPARISON.map((row, i) => (
              <div
                key={i}
                className={`grid grid-cols-2 ${i !== COMPARISON.length - 1 ? 'border-b border-sand-300' : ''}`}
              >
                <div className="p-4 flex items-start gap-2 border-r border-sand-300">
                  <IconCheck size={18} className="text-palm-600 shrink-0 mt-0.5" />
                  <span className="text-[14px] text-ink">{row.us}</span>
                </div>
                <div className="p-4 flex items-start gap-2">
                  <IconX size={18} className="text-pepper-600 shrink-0 mt-0.5" />
                  <span className="text-[14px] text-ink-soft">{row.them}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}