import * as simpleIcons from 'simple-icons'

export function BrandIcon({ icon, className, color }: { icon: string; className?: string; color?: string }) {
  const iconData = (simpleIcons as Record<string, { path: string; hex: string }>)[`si${icon}`]
  if (!iconData) return null

  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      className={className}
      fill={color ?? `#${iconData.hex}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d={iconData.path} />
    </svg>
  )
}