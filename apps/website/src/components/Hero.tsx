"use client";

import { useState } from "react";
import Link from "next/link";
import { AdireStrip } from "./AdireStrip";
import Image from "next/image";

const SWATCHES = [
  { name: "pepper", hex: "#A73A3F" },
  { name: "indigo", hex: "#1B2450" },
  { name: "marigold", hex: "#E7A038" },
  { name: "palm", hex: "#3E6E52" },
  { name: "teal", hex: "#2E7B8C" },
];

const PRODUCTS = [
  { name: "Woven Raffia Tote", meta: "₦18,500 · 12 in stock" },
  { name: "Adire Wrap Skirt", meta: "₦24,000 · 6 in stock" },
];

export function Hero() {
  const [activeSwatch, setActiveSwatch] = useState(0);
  const [published, setPublished] = useState(true);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-indigo-900 to-indigo-950 text-paper">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 78% 0%, rgba(231,160,56,0.14), transparent 55%)",
        }}
      />

      <div className="relative mx-auto grid max-w-[1240px] grid-cols-1 items-center gap-10 px-8 py-20 md:grid-cols-[1.05fr_0.95fr] md:py-28">
        {/* Copy */}
        <div>
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-marigold-500/30 bg-marigold-500/10 px-3 py-1.5 text-[12.5px] font-semibold tracking-wide text-marigold-400">
            ● A Bitvoratech product
          </span>

          <h1 className="mb-6 max-w-[600px] font-display text-4xl font-bold leading-[1.05] md:text-[56px]">
            Storefronts that look like your brand,{" "}
            <span className="text-marigold-500">not a template.</span>
          </h1>

          <p className="mb-8 max-w-[460px] text-[17px] leading-relaxed text-paper/70">
            Build a fast, beautiful online store made for how Nigerians
            actually sell — WhatsApp orders, Naira pricing, Lagos delivery,
            no code required.
          </p>

          <div className="mb-10 flex flex-wrap items-center gap-3.5">
            <Link
              href="/signup"
              className="rounded-lg bg-marigold-500 px-5 py-3 text-[14.5px] font-semibold text-indigo-950 transition hover:-translate-y-px hover:shadow-[0_6px_18px_rgba(231,160,56,0.35)]"
            >
              Start building free
            </Link>
            <Link
              href="#how-it-works"
              className="rounded-lg border border-paper/30 px-5 py-3 text-[14.5px] font-semibold transition hover:-translate-y-px"
            >
              See how it works
            </Link>
          </div>

          <div className="flex max-w-[480px] gap-7 border-t border-paper/15 pt-6">
            <Stat value="0" label="stores launched" />
            <Stat value="0" label="in orders processed" />
            <Stat value="0 / 5" label="merchant rating" />
          </div>
        </div>

        {/* Visual: real dashboard mockup + floating WhatsApp order */}
          <div className="relative h-full md:h-[520px]">
  {/* Decorative blob background */}
          <svg
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute -top-27 -right-42 w-[550px] md:w-[750px] opacity-[0.15] pointer-events-none"
            aria-hidden
          >
            <path
              fill="#E7A038"
              d="M39.8,-68.9C53.2,-61.1,67.1,-53.9,76.4,-42.5C85.7,-31.2,90.4,-15.6,87.8,-1.5C85.1,12.5,75.1,25,66.6,37.9C58.2,50.7,51.3,63.8,40.5,73.4C29.6,82.9,14.8,88.8,0.3,88.3C-14.3,87.9,-28.6,81.1,-40,71.9C-51.3,62.6,-59.7,51,-65.5,38.6C-71.2,26.2,-74.3,13.1,-75.4,-0.6C-76.4,-14.3,-75.4,-28.7,-69.7,-41C-63.9,-53.4,-53.4,-63.8,-41,-72.3C-28.6,-80.7,-14.3,-87.3,-0.6,-86.3C13.1,-85.3,26.3,-76.8,39.8,-68.9Z"
              transform="translate(100 100)"
            />
          </svg>

          <div className="absolute right-0 top-0 w-[300px] rotate-[2.5deg] overflow-hidden rounded-2xl bg-paper shadow-[0_40px_80px_-20px_rgba(0,0,0,0.5)] md:w-[420px]">
          <div className="flex items-center gap-1.5 border-b border-sand-300 bg-paper-dim px-3.5 py-2.5">
              <span className="h-2 w-2 rounded-full bg-sand-400" />
              <span className="h-2 w-2 rounded-full bg-sand-400" />
              <span className="h-2 w-2 rounded-full bg-sand-400" />
            </div>

            <div className="p-4.5 text-ink">
              <p className="mb-1.5 text-[10.5px] font-semibold uppercase tracking-wide text-ink-soft">
                Brand accent color
              </p>
              <div className="mb-4.5 flex gap-2">
                {SWATCHES.map((s, i) => (
                  <button
                    key={s.name}
                    aria-label={`Use ${s.name} as brand accent`}
                    onClick={() => setActiveSwatch(i)}
                    className="h-6.5 w-6.5 rounded-md transition"
                    style={{
                      background: s.hex,
                      boxShadow:
                        i === activeSwatch
                          ? "0 0 0 2px var(--color-paper), 0 0 0 3.5px var(--color-indigo-900)"
                          : "none",
                    }}
                  />
                ))}
              </div>

              <p className="mb-1.5 text-[10.5px] font-semibold uppercase tracking-wide text-ink-soft">
                Products
              </p>
              {PRODUCTS.map((p) => (
                <div
                  key={p.name}
                  className="mb-2 flex items-center gap-3 rounded-lg bg-paper-dim/60 p-2.5"
                >
                  <div className="h-10.5 w-10.5 flex-shrink-0 rounded-md bg-gradient-to-br from-sand-300 to-paper-dim" />
                  <div>
                    <p className="font-display text-[13px] font-semibold">{p.name}</p>
                    <p className="font-mono text-[11.5px] text-ink-soft">{p.meta}</p>
                  </div>
                </div>
              ))}

              <button
                onClick={() => setPublished((v) => !v)}
                className="mt-3.5 flex w-full items-center justify-between rounded-lg bg-indigo-900 px-3.5 py-3 text-paper"
              >
                <span className="text-[12.5px] font-semibold">
                  {published ? "Store is live" : "Store is unpublished"}
                </span>
                <span
                  className="relative h-[19px] w-[34px] rounded-full transition-colors"
                  style={{ background: published ? "#E7A038" : "#5B5346" }}
                >
                  <span
                    className="absolute top-0.5 h-3.5 w-3.5 rounded-full bg-indigo-950 transition-all"
                    style={{ left: published ? "17px" : "2px" }}
                  />
                </span>
              </button>
            </div>
          </div>

          <div className="absolute bottom-3.5 left-0 w-[190px] -rotate-3 rounded-xl bg-paper p-3.5 text-ink shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] md:w-[250px]">
            <div className="mb-2.5 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-palm-600" />
              <span className="text-[11px] font-semibold text-ink-soft">
                New order · WhatsApp
              </span>
            </div>
            <div className="mb-2.5 rounded-lg bg-paper-dim p-2.5 text-[12px] leading-relaxed">
              Hi! I&rsquo;d like the{" "}
              <span className="font-mono font-medium text-pepper-600">
                Woven Raffia Tote
              </span>
              , size — is it available for delivery to Yaba?
            </div>
            <div className="rounded-md bg-palm-600 py-2 text-center text-[12.5px] font-semibold text-white">
              Reply on WhatsApp
            </div>
          </div>
        </div>
      </div>

      <AdireStrip dark />
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col">
      <b className="font-display text-[21px] text-paper">{value}</b>
      <span className="mt-0.5 text-[12.5px] text-paper/55">{label}</span>
    </div>
  );
}