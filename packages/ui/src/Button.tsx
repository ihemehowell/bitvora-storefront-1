import { ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'secondary' | 'danger' | 'ghost'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
}

export function Button({ variant = 'primary', className = '', ...props }: ButtonProps) {
  const base = 'inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
  const variants: Record<Variant, string> = {
    // bg-indigo-600/700 and text-white already resolve correctly in dark
    // mode via the token overrides in tailwind-tokens.css — no dark:
    // needed here.
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700',
    // border-sand-200 gets bumped to sand-300 in dark mode: sand-200's dark
    // value sits close to the page background, so the border would nearly
    // disappear without a bit more contrast.
    secondary: 'bg-sand-100 text-ink hover:bg-sand-200 border border-sand-200 dark:border-sand-300',
    // pepper-50/600 already flip via tokens; hover:text-white stays literal
    // white on purpose (it's reversed text on a solid red button in both
    // themes, not a surface color).
    danger: 'bg-pepper-50 text-pepper-600 hover:bg-pepper-600 hover:text-white',
    // hover:bg-sand-100 would barely register in dark mode since the page
    // itself sits right next to sand-100 — sand-200 gives a visible hover
    // affordance instead.
    ghost: 'text-ink hover:bg-sand-100 dark:hover:bg-sand-200',
  }

  return <button className={`${base} ${variants[variant]} ${className}`} {...props} />
}