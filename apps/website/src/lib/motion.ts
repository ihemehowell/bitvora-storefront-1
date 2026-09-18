// Shared animation vocabulary for the whole site. Every section pulls its
// timing from here — same ease curve, same base duration — so the page reads
// as one continuous choreographed sequence instead of each component
// inventing its own feel.

// Decisive settle, no overshoot/bounce — reads as premium rather than playful.
export const EASE = [0.16, 1, 0.3, 1] as const

export const DURATION = 0.6

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: DURATION, ease: EASE } },
}

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: DURATION, ease: EASE } },
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.94 },
  show: { opacity: 1, scale: 1, transition: { duration: DURATION, ease: EASE } },
}

export const slideInLeft = {
  hidden: { opacity: 0, x: -40 },
  show: { opacity: 1, x: 0, transition: { duration: DURATION, ease: EASE } },
}

export const slideInRight = {
  hidden: { opacity: 0, x: 40 },
  show: { opacity: 1, x: 0, transition: { duration: DURATION, ease: EASE } },
}

/** A parent variant that staggers its motion.* children in on mount or in view. */
export function staggerContainer(stagger = 0.12, delayChildren = 0) {
  return {
    hidden: {},
    show: {
      transition: { staggerChildren: stagger, delayChildren },
    },
  }
}

// Shared viewport trigger settings for whileInView sections — fires a little
// before the element is fully on screen, and only ever once.
export const viewport = { once: true, margin: '-10% 0px -10% 0px' } as const