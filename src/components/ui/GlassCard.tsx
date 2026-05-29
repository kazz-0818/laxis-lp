import { cn } from '../../lib/utils'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  neon?: boolean
  hover?: boolean
}

export function GlassCard({ children, className, neon = false, hover = true }: GlassCardProps) {
  return (
    <div
      className={cn(
        'relative rounded-2xl overflow-hidden',
        neon ? 'glass-neon' : 'glass-light',
        hover &&
          'transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-500/15 hover:border-cyan-400/40 motion-reduce:hover:translate-y-0',
        className,
      )}
    >
      <div className="absolute inset-0 bg-linear-to-br from-cyan-400/5 via-transparent to-mint-400/5 pointer-events-none" />
      <div className="relative">{children}</div>
    </div>
  )
}
