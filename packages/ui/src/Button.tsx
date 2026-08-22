import { ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'secondary' | 'danger' | 'ghost'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
}

export function Button({ variant = 'primary', className = '', ...props }: ButtonProps) {
  const base = 'inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
  const variants: Record<Variant, string> = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700',
    secondary: 'bg-sand-100 text-ink hover:bg-sand-200 border border-sand-200',
    danger: 'bg-pepper-50 text-pepper-600 hover:bg-pepper-600 hover:text-white',
    ghost: 'text-ink hover:bg-sand-100',
  }

  return <button className={`${base} ${variants[variant]} ${className}`} {...props} />
}