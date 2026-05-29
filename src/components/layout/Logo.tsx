import { cn } from '../../lib/utils'

export function Logo({ className, invert }: { className?: string; invert?: boolean }) {
  return (
    <a href="#hero" className={cn('group leading-none', className)}>
      <span
        className={cn(
          'block text-lg font-extrabold tracking-tight',
          invert ? 'text-white' : 'text-navy-900',
        )}
      >
        LAXIS
      </span>
      <span
        className={cn(
          'block text-[10px] font-medium tracking-[0.2em] mt-0.5',
          invert ? 'text-mint-400/90' : 'text-cyan-600',
        )}
      >
        ラクシス
      </span>
    </a>
  )
}
