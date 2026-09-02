export const DISPLAY_FONTS: Record<string, string> = {
  editorial: 'Fraunces',
  classic: 'Playfair Display',
  modern: 'Sora',
  playful: 'Bricolage Grotesque',
  minimal: 'Inter',
  warm: 'Lora',
}

export const SCALE_CLASSES: Record<string, { hero: string; section: string; tile: string; cta: string }> = {
  compact: { hero: 'text-3xl sm:text-4xl', section: 'text-xl sm:text-2xl', tile: 'text-lg', cta: 'text-3xl sm:text-4xl' },
  standard: { hero: 'text-4xl sm:text-6xl', section: 'text-2xl sm:text-3xl', tile: 'text-xl', cta: 'text-5xl' },
  bold: { hero: 'text-5xl sm:text-7xl', section: 'text-3xl sm:text-4xl', tile: 'text-2xl', cta: 'text-6xl sm:text-7xl' },
}