import { cn } from '../../lib/utils'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline'

interface ButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: ButtonVariant
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-linear-to-r from-mint-500 to-cyan-500 text-navy-900 font-semibold shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/40 hover:brightness-110 hover:scale-[1.02] active:scale-[0.98]',
  secondary:
    'bg-white/10 text-white border border-white/20 hover:bg-white/15 backdrop-blur-sm',
  ghost: 'text-navy-700 hover:bg-navy-800/5',
  outline:
    'border-2 border-navy-800/20 text-navy-800 hover:border-mint-500/50 hover:bg-mint-500/5',
}

const sizes: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'px-4 py-2 text-sm rounded-lg min-h-[40px]',
  md: 'px-6 py-3 text-base rounded-xl min-h-[48px]',
  lg: 'px-8 py-4 text-base sm:text-lg rounded-xl min-h-[52px]',
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <a
      className={cn(
        'inline-flex items-center justify-center gap-2 transition-all duration-300 motion-reduce:transition-none',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </a>
  )
}
