import { cn } from '../../lib/utils'

export function GridBackground({
  variant = 'floor',
  className,
}: {
  variant?: 'floor' | 'full'
  className?: string
}) {
  return (
    <div
      className={cn(
        'absolute inset-0 pointer-events-none',
        variant === 'floor' ? 'grid-floor opacity-70' : 'opacity-40',
        variant === 'full' &&
          '[background-image:linear-gradient(rgba(34,211,238,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.06)_1px,transparent_1px)] [background-size:48px_48px]',
        className,
      )}
      aria-hidden
    />
  )
}
