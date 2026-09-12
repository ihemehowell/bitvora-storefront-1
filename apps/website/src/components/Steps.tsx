import { IconCheck } from '@tabler/icons-react'

const STEPS = [
  {
    num: "01",
    title: "Create your store",
    body: "Sign up and name your store in under a minute.",
    detail: "No payment card, no approval wait — you're in your dashboard immediately after signup.",
    tag: "Just an email",
  },
  {
    num: "02",
    title: "Set your brand",
    body: "Pick your accent color and build your homepage hero.",
    detail: "Choose a font pairing, upload your logo, and write your hero heading — all with a live preview as you go.",
    tag: "2 minutes",
  },
  {
    num: "03",
    title: "Add your products",
    body: "Upload photos, set prices, and organize by category.",
    detail: "Add stock levels, categories, and as many product photos as you need — no limit on your first products.",
    tag: "Photos + prices",
  },
  {
    num: "04",
    title: "Go live",
    body: "Publish and start taking real orders — WhatsApp, transfer, or on delivery.",
    detail: "Flip one switch to publish. Orders start showing up in your dashboard the moment a customer checks out.",
    tag: "One click",
  },
];

export function Steps() {
  return (
    <section id="how-it-works" className="bg-paper-dim py-24">
      <div className="mx-auto max-w-[1240px] px-8">
        <div className="mx-auto mb-14 max-w-[560px] text-center">
          <span className="mb-3 block text-[12.5px] font-bold uppercase tracking-widest text-pepper-600">
            The signup flow
          </span>
          <h2 className="mb-3.5 font-display text-3xl font-bold md:text-4xl">
            Live in four steps
          </h2>
          <p className="text-[16px] leading-relaxed text-ink-soft">
            From signup to your first sale, no developer needed.
          </p>
        </div>

        <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-10 md:grid-cols-4 md:gap-8">
          <div
            aria-hidden
            className="absolute left-[6%] right-[6%] top-[15px] hidden h-px md:block"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, #D9CBAE 0 6px, transparent 6px 12px)",
            }}
          />
          {STEPS.map((s) => (
            <div key={s.num} className="relative">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="relative z-[1] flex h-[31px] w-[31px] shrink-0 items-center justify-center rounded-full border-2 border-marigold-500 bg-paper-dim font-mono text-[13px] font-semibold text-indigo-900">
                  {s.num}
                </div>
                <span className="text-[10.5px] font-semibold uppercase tracking-wide text-pepper-600">
                  {s.tag}
                </span>
              </div>
              <h3 className="mb-2 text-[16.5px] font-semibold">{s.title}</h3>
              <p className="mb-2.5 text-[13.5px] leading-relaxed text-ink-soft">
                {s.body}
              </p>
              <p className="flex items-start gap-1.5 text-[12.5px] leading-relaxed text-ink-soft/80">
                <IconCheck size={14} className="text-palm-600 shrink-0 mt-0.5" />
                {s.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}