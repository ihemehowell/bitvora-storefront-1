export function CtaBand() {
  return (
    <section className="relative overflow-hidden bg-indigo-900 py-20">
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '18px 18px',
        }}
      />
      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <h2 className="font-display font-semibold text-3xl sm:text-4xl text-white mb-4">
          Build a store that actually looks like yours.
        </h2>
        <p className="text-indigo-200/70 mb-8">
          Free to start. No code, no template look, no card required.
        </p>
        <a
          href="http://localhost:3000/signup"
          className="inline-block rounded-lg bg-marigold-500 text-indigo-900 font-medium px-8 py-3.5 hover:opacity-90 transition-opacity"
        >
          Start building free
        </a>
      </div>
    </section>
  )
}