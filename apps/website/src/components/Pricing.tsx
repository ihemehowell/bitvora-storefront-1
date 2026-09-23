"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { IconCheck } from "@tabler/icons-react";
import { fadeUp, staggerContainer, viewport } from "../lib/motion";

type Plan = {
  name: string;
  tagline: string;
  monthly: number;
  featured?: boolean;
  features: string[];
};

const PLANS: Plan[] = [
  {
    name: "Starter",
    tagline: "For sellers just getting their store online.",
    monthly: 5000,
    features: [
      "Up to 30 products",
      "WhatsApp order button on every product",
      "Bank transfer & pay-on-delivery checkout",
      "Brand color, hero section & logo",
      "Email support",
    ],
  },
  {
    name: "Growth",
    tagline: "For stores ready to look and sell like a real brand.",
    monthly: 12000,
    featured: true,
    features: [
      "Everything in Starter",
      "Up to 150 products",
      "Full homepage customization — banners, collections, about",
      "Font pairing & layout options",
      "Priority WhatsApp support",
    ],
  },
  {
    name: "Pro",
    tagline: "For established merchants with serious order volume.",
    monthly: 25000,
    features: [
      "Everything in Growth",
      "Unlimited products",
      "Priority order & payment support",
      "Early access to new features",
      "Dedicated onboarding call",
    ],
  },
];

// 2 months free on annual — adjust to match whatever discount you actually offer.
const ANNUAL_MONTHS = 10;

function formatNaira(amount: number) {
  return `₦${amount.toLocaleString()}`;
}

export function Pricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-[1240px] px-8">
        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mx-auto mb-4 max-w-[640px] text-center"
        >
          <motion.span
            variants={fadeUp}
            className="mb-3 block text-[12.5px] font-bold uppercase tracking-widest text-pepper-600"
          >
            Pricing
          </motion.span>
          <motion.h1 variants={fadeUp} className="mb-5 font-display text-3xl font-bold md:text-5xl leading-tight">
            Simple pricing, no free tier to outgrow.
          </motion.h1>
          <motion.p variants={fadeUp} className="text-[16px] leading-relaxed text-ink-soft">
            Every plan gets a fully branded storefront, WhatsApp ordering, and Nigeria-first checkout. Start on a 14-day free trial — no card required to try it out.
          </motion.p>
        </motion.div>

        {/* Billing toggle */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="flex items-center justify-center gap-3 mb-14"
        >
          <span className={`text-sm font-medium ${!annual ? "text-ink" : "text-ink-soft"}`}>Monthly</span>
          <button
            role="switch"
            aria-checked={annual}
            onClick={() => setAnnual((v) => !v)}
            className="relative h-7 w-13 rounded-full bg-indigo-900 transition-colors"
          >
            <span
              className="absolute top-1 h-5 w-5 rounded-full bg-marigold-500 transition-all"
              style={{ left: annual ? "30px" : "4px" }}
            />
          </button>
          <span className={`text-sm font-medium ${annual ? "text-ink" : "text-ink-soft"}`}>
            Annual <span className="text-palm-600">— 2 months free</span>
          </span>
        </motion.div>

        {/* Plan cards */}
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="grid gap-6 md:grid-cols-3 items-start"
        >
          {PLANS.map((plan) => {
            const price = annual ? Math.round((plan.monthly * ANNUAL_MONTHS) / 12) : plan.monthly;
            return (
              <motion.div
                key={plan.name}
                variants={fadeUp}
                className={`relative rounded-2xl border p-7 flex flex-col ${
                  plan.featured
                    ? "border-indigo-600 bg-white shadow-[0_20px_60px_-20px_rgba(42,59,143,0.35)] md:-translate-y-3"
                    : "border-sand-300 bg-paper"
                }`}
              >
                {plan.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-indigo-600 text-white text-[11px] font-bold uppercase tracking-wide px-3 py-1">
                    Most popular
                  </span>
                )}

                <h3 className="font-display text-xl font-bold mb-1.5">{plan.name}</h3>
                <p className="text-[13.5px] text-ink-soft mb-6 min-h-[38px]">{plan.tagline}</p>

                <div className="mb-1 flex items-baseline gap-1.5">
                  <span className="font-display text-4xl font-bold">{formatNaira(price)}</span>
                  <span className="text-sm text-ink-soft">/mo</span>
                </div>
                <p className="text-xs text-ink-soft mb-6">
                  {annual ? `Billed ${formatNaira(price * 12)} annually` : "Billed monthly"}
                </p>

                <ul className="space-y-2.5 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-[14px] text-ink">
                      <IconCheck size={16} className="text-palm-600 shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href="https://bitvora-admin.vercel.app/signup"
                  className={`text-center rounded-lg px-4 py-3 text-sm font-semibold transition-colors ${
                    plan.featured
                      ? "bg-indigo-600 text-white hover:bg-indigo-700"
                      : "bg-sand-100 text-ink hover:bg-sand-200"
                  }`}
                >
                  Start free trial
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mx-auto mt-12 max-w-[640px] text-center text-[13px] text-ink-soft"
        >
          Prices are in Naira and exclude any bank or payment provider fees on transactions your customers make directly to you. No setup fees, cancel anytime.
        </motion.p>
      </div>
    </section>
  );
}