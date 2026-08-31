const STEPS = [
  {
    num: "01",
    title: "Create your store",
    body: "Sign up and name your store in under a minute.",
  },
  {
    num: "02",
    title: "Set your brand",
    body: "Pick your accent color and build your homepage hero.",
  },
  {
    num: "03",
    title: "Add your products",
    body: "Upload photos, set prices, and organize by category.",
  },
  {
    num: "04",
    title: "Go live",
    body: "Publish and start taking real orders — WhatsApp, transfer, or on delivery.",
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

        <div className="relative grid grid-cols-2 gap-8 md:grid-cols-4">
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
              <div className="relative z-[1] mb-4.5 flex h-[31px] w-[31px] items-center justify-center rounded-full border-2 border-marigold-500 bg-paper-dim font-mono text-[13px] font-semibold text-indigo-900">
                {s.num}
              </div>
              <h3 className="mb-2 text-[16.5px] font-semibold">{s.title}</h3>
              <p className="text-[13.5px] leading-relaxed text-ink-soft">
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
