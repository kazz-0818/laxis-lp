import { cn } from '../lib/utils'

interface LogoProps {
  dark?: boolean
  className?: string
}

export function Logo({ dark = false, className }: LogoProps) {
  return (
    <a href="#hero" className={cn('group flex flex-col leading-none', className)}>
      <span
        className={cn(
          'text-xl font-extrabold tracking-tight',
          dark ? 'text-white' : 'text-navy-900',
        )}
      >
        LAXIS
      </span>
      <span
        className={cn(
          'text-[10px] font-medium tracking-widest mt-0.5',
          dark ? 'text-mint-400/90' : 'text-cyan-600',
        )}
      >
        ラクシス
      </span>
    </a>
  )
}
