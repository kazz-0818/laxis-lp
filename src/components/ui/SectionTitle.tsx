import { cn } from '../../lib/utils'

interface SectionTitleProps {
  label?: string
  title: React.ReactNode
  description?: string
  align?: 'left' | 'center'
  light?: boolean
  className?: string
}

export function SectionTitle({
  label,
  title,
  description,
  align = 'center',
  light = false,
  className,
}: SectionTitleProps) {
  return (
    <div
      className={cn(
        'mb-14 sm:mb-16',
        align === 'center' && 'text-center mx-auto max-w-3xl',
        className,
      )}
    >
      {label && (
        <p
          className={cn(
            'inline-block text-[11px] sm:text-xs font-bold tracking-[0.25em] uppercase mb-4 px-4 py-1.5 rounded-full border',
            light
              ? 'text-mint-400 border-mint-400/30 bg-mint-400/10'
              : 'text-cyan-600 border-cyan-500/30 bg-cyan-500/10',
          )}
        >
          {label}
        </p>
      )}
      <h2
        className={cn(
          'text-2xl sm:text-3xl lg:text-[2.75rem] font-extrabold leading-[1.15] tracking-tight',
          light ? 'text-white' : 'text-navy-900',
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            'mt-4 text-base sm:text-lg leading-relaxed',
            light ? 'text-slate-300' : 'text-slate-600',
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
}
