import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { GlassCard } from './GlassCard'

type FloatingCardProps = {
  title: string
  body?: string
  className?: string
  depth?: number
  delay?: number
}

export function FloatingCard({ title, body, className = '', depth = 0, delay = 0 }: FloatingCardProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    gsap.to(el, {
      y: -8 + depth * 2,
      duration: 2.5 + depth * 0.3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay,
    })
  }, [depth, delay])

  return (
    <div ref={ref} className={`absolute ${className}`} style={{ zIndex: 20 + depth }}>
      <GlassCard className="max-w-[220px]">
        <p className="text-sm font-semibold text-text-primary">{title}</p>
        {body && <p className="mt-2 text-xs leading-relaxed text-text-muted">{body}</p>}
      </GlassCard>
    </div>
  )
}
