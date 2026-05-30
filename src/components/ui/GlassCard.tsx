import type { ReactNode } from 'react'

type GlassCardProps = {
  children: ReactNode
  className?: string
  glow?: boolean
}

export function GlassCard({ children, className = '', glow = false }: GlassCardProps) {
  return (
    <div
      className={`rounded-xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-md ${
        glow ? 'shadow-[0_0_40px_rgba(255,242,184,0.08)]' : ''
      } ${className}`}
    >
      {children}
    </div>
  )
}
