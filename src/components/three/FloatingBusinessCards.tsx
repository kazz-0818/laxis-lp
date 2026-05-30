import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { heroFragments } from '../../data/site'

type FloatingBusinessCardsProps = {
  mode?: 'hero' | 'chaos'
  visible?: boolean
}

const positions = [
  { top: '12%', left: '8%', rotate: -6 },
  { top: '18%', right: '10%', rotate: 8 },
  { top: '55%', left: '5%', rotate: 4 },
  { top: '62%', right: '8%', rotate: -10 },
  { top: '35%', left: '15%', rotate: -3 },
  { top: '40%', right: '14%', rotate: 6 },
  { top: '72%', left: '18%', rotate: 5 },
  { top: '28%', left: '42%', rotate: -8 },
  { top: '68%', right: '20%', rotate: 3 },
  { top: '48%', right: '22%', rotate: -5 },
]

export function FloatingBusinessCards({ mode = 'hero', visible = true }: FloatingBusinessCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container || !visible) return

    const cards = container.querySelectorAll('[data-card]')
    gsap.fromTo(
      cards,
      { opacity: 0, y: 30, scale: 0.9 },
      {
        opacity: mode === 'chaos' ? 1 : 0.7,
        y: 0,
        scale: 1,
        duration: 1,
        stagger: 0.08,
        ease: 'power3.out',
      },
    )

    cards.forEach((card, i) => {
      gsap.to(card, {
        y: `+=${6 + (i % 3) * 2}`,
        duration: 2 + i * 0.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.1,
      })
    })
  }, [mode, visible])

  if (!visible) return null

  return (
    <div ref={containerRef} className="pointer-events-none absolute inset-0 z-[5]" aria-hidden>
      {heroFragments.map((label, i) => {
        const pos = positions[i % positions.length]
        return (
          <div
            key={label}
            data-card
            className="absolute rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-text-muted backdrop-blur-sm"
            style={{
              top: pos.top,
              left: 'left' in pos ? pos.left : undefined,
              right: 'right' in pos ? pos.right : undefined,
              transform: `rotate(${pos.rotate}deg)`,
              opacity: mode === 'chaos' ? 1 : 0.6,
            }}
          >
            {label}
          </div>
        )
      })}
    </div>
  )
}
