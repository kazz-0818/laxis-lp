type Props = { href: string; children: string; variant?: 'primary' | 'ghost' }

export function GlowButton({ href, children, variant = 'primary' }: Props) {
  return (
    <a
      href={href}
      className={variant === 'primary' ? 'btn-glow btn-glow--primary' : 'btn-glow btn-glow--ghost'}
    >
      {children}
    </a>
  )
}
