export function About() {
  return (
    <section id="about" className="py-24">
      <div className="mx-auto max-w-[1240px] px-8 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="mb-3 block text-[12.5px] font-bold uppercase tracking-widest text-pepper-600">
            Who we are
          </span>
          <h2 className="mb-4 font-display text-3xl font-bold md:text-4xl">
            Built by a studio that actually ships.
          </h2>
          <p className="text-[16px] leading-relaxed text-ink-soft mb-4">
            Bitvora Storefront is built by Bitvoratech, a software studio focused on tools for Nigerian businesses. We didn&apos;t build this by guessing — every feature comes from watching how sellers actually operate: on WhatsApp, on Instagram, at the market.
          </p>
          <p className="text-[16px] leading-relaxed text-ink-soft">
            No investors telling us what matters. Just a product built to solve a real problem for real Nigerian merchants.
          </p>
        </div>
        <div className="rounded-2xl bg-indigo-900 p-8 text-paper">
          <p className="font-display text-2xl font-semibold mb-3">Our promise</p>
          <ul className="space-y-3 text-[14.5px] text-paper/75">
            <li className="flex gap-2"><span className="text-marigold-500">→</span> Your store looks like your brand, always.</li>
            <li className="flex gap-2"><span className="text-marigold-500">→</span> Built for how Nigerians actually sell.</li>
            <li className="flex gap-2"><span className="text-marigold-500">→</span> Fast, honest, and no fake numbers.</li>
          </ul>
        </div>
      </div>
    </section>
  )
}