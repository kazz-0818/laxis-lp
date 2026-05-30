import type { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react'

type GlowButtonProps = {
  variant?: 'primary' | 'secondary'
  href?: string
  children: ReactNode
} & ButtonHTMLAttributes<HTMLButtonElement> &
  AnchorHTMLAttributes<HTMLAnchorElement>

export function GlowButton({
  variant = 'primary',
  href,
  children,
  className = '',
  ...props
}: GlowButtonProps) {
  const base =
    'inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium tracking-wide transition-all duration-300'
  const styles =
    variant === 'primary'
      ? 'border border-accent-cyan/60 bg-accent-cyan/10 text-text-primary hover:bg-accent-cyan/20 hover:shadow-[0_0_30px_rgba(45,212,191,0.35)]'
      : 'border border-white/15 bg-white/5 text-text-secondary hover:border-light-warm/40 hover:shadow-[0_0_24px_rgba(255,242,184,0.15)]'

  const cls = `${base} ${styles} ${className}`

  if (href) {
    return (
      <a href={href} className={cls} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button type="button" className={cls} {...props}>
      {children}
    </button>
  )
}
