"use client";

import { motion, useScroll, useTransform } from "motion/react";

export function AdireStrip({ dark = false }: { dark?: boolean }) {
  const { scrollYProgress } = useScroll();
  // Drifts the dot pattern horizontally as the whole page scrolls, so every
  // strip on the page moves together — a literal thread tying the sections
  // together rather than a static repeated divider.
  const backgroundPositionX = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <motion.div
      aria-hidden
      className="h-3.5 w-full"
      style={{
        backgroundImage: `radial-gradient(circle, ${
          dark ? "rgba(247,242,231,0.35)" : "rgba(231,160,56,0.55)"
        } 1.4px, transparent 1.6px)`,
        backgroundSize: "14px 14px",
        backgroundPositionY: "4px",
        backgroundPositionX,
      }}
    />
  );
}