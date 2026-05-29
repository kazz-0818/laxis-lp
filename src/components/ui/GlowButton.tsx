import { cn } from '../../lib/utils'

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost'

interface GlowButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

const styles: Record<Variant, string> = {
  primary:
    'bg-navy-900 text-white font-semibold shadow-[0_8px_24px_-6px_rgba(15,39,68,0.35)] hover:bg-navy-800 hover:scale-[1.02] active:scale-[0.98]',
  secondary:
    'bg-white text-navy-900 border border-slate-200 shadow-sm hover:border-cyan-400/40 hover:shadow-md',
  outline:
    'border border-cyan-500/50 text-cyan-700 bg-white/80 hover:bg-cyan-50 hover:border-mint-500/60',
  ghost:
    'border border-white/30 text-white hover:bg-white/10',
}

const sizes = {
  sm: 'px-5 py-2.5 text-sm rounded-xl min-h-[44px]',
  md: 'px-7 py-3.5 text-base rounded-xl min-h-[48px]',
  lg: 'px-8 py-4 text-lg rounded-2xl min-h-[54px]',
}

export function GlowButton({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: GlowButtonProps) {
  return (
    <a
      className={cn(
        'inline-flex items-center justify-center gap-2 transition-all duration-300 motion-reduce:transition-none',
        styles[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </a>
  )
}
