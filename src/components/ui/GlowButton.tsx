import { cn } from '../../lib/utils'

type Variant = 'primary' | 'secondary' | 'outline'

interface GlowButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

const styles: Record<Variant, string> = {
  primary:
    'bg-linear-to-r from-mint-500 to-cyan-500 text-navy-950 font-bold shadow-lg shadow-cyan-500/30 hover:shadow-cyan-400/50 hover:scale-[1.03] active:scale-[0.98]',
  secondary:
    'glass text-white border-white/20 hover:border-mint-400/50 hover:bg-white/10',
  outline:
    'border border-cyan-400/40 text-cyan-300 hover:bg-cyan-500/10 hover:border-mint-400/60',
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
