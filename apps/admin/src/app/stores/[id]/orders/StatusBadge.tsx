const STATUS_STYLES: Record<string, string> = {
  pending: 'bg-sand-100 text-ink/60',
  confirmed: 'bg-indigo-50 text-indigo-600',
  shipped: 'bg-marigold-50 text-marigold-500',
  delivered: 'bg-palm-50 text-palm-600',
  cancelled: 'bg-pepper-50 text-pepper-600',
}

export function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`text-xs rounded-full px-2.5 py-1 font-medium capitalize ${STATUS_STYLES[status] ?? STATUS_STYLES.pending}`}>
      {status}
    </span>
  )
}