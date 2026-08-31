import Link from "next/link";
import { IconBuildingStore } from "@tabler/icons-react";
import { AdireStrip } from "./AdireStrip";

export function CtaBand() {
  return (
    <>
      <AdireStrip />
      <section
        className="py-24 text-center text-paper"
        style={{
          background:
            "radial-gradient(ellipse at 30% 20%, rgba(231,160,56,0.12), transparent 55%), var(--color-indigo-950)",
        }}
      >
        <div className="mx-auto max-w-[1240px] px-8">
          <h2 className="mx-auto mb-4 max-w-[600px] font-display text-3xl font-bold md:text-[38px]">
            Build a store that actually looks like yours.
          </h2>
          <p className="mb-8 text-[16px] text-paper/65">
            Free to start. No code, no template look, no card required.
          </p>
          <Link
            href="/signup"
            className="inline-block rounded-lg bg-marigold-500 px-6 py-3.5 text-[14.5px] font-semibold text-indigo-950 transition hover:-translate-y-px"
          >
            Start building free
          </Link>
        </div>
      </section>
      <AdireStrip dark />
    </>
  );
}

export function Footer() {
  return (
    <footer className="mx-auto flex max-w-[1240px] flex-col items-center gap-2.5 px-8 py-10 text-[13px] text-ink-soft md:flex-row md:justify-between">
      <span className="flex items-center gap-1.5">
        <IconBuildingStore size={15} /> Bitvora Storefront — a Bitvoratech
        product
      </span>
      <span>© 2026 Bitvoratech. All rights reserved.</span>
    </footer>
  );
}
