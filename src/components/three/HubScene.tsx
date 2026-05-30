import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { hubFeatures } from '../../data/systemTools'

type HubSceneProps = {
  progress?: number
}

export function HubScene({ progress = 0 }: HubSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const coreRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const core = coreRef.current
    if (!core) return

    gsap.to(core, {
      scale: 1 + Math.sin(Date.now() / 1000) * 0.02,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const cards = container.querySelectorAll('[data-hub-card]')
    cards.forEach((card, i) => {
      const threshold = i / hubFeatures.length
      const visible = progress >= threshold * 0.8
      gsap.to(card, {
        opacity: visible ? 1 : 0.2,
        scale: visible ? 1 : 0.85,
        duration: 0.4,
      })
    })
  }, [progress])

  const radius = 180

  return (
    <div ref={containerRef} className="relative mx-auto aspect-square w-full max-w-2xl">
      {/* Network lines */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 400">
        {hubFeatures.map((f) => {
          const rad = ((f.angle - 90) * Math.PI) / 180
          const x2 = 200 + Math.cos(rad) * 155
          const y2 = 200 + Math.sin(rad) * 155
          return (
            <line
              key={f.id}
              x1={200}
              y1={200}
              x2={x2}
              y2={y2}
              stroke="url(#hubGrad)"
              strokeWidth="1"
              opacity={0.3 + progress * 0.5}
            />
          )
        })}
        <defs>
          <linearGradient id="hubGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#fff2b8" stopOpacity="0.8" />
          </linearGradient>
        </defs>
      </svg>

      {/* Core */}
      <div
        ref={coreRef}
        className="absolute left-1/2 top-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-accent-cyan/40 bg-bg-navy/80 shadow-[0_0_60px_rgba(45,212,191,0.25)] backdrop-blur-md"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-accent-cyan">Core</span>
        <span className="mt-1 text-sm font-bold text-text-primary">Laxis Hub</span>
      </div>

      {/* Orbiting cards */}
      {hubFeatures.map((f) => {
        const rad = ((f.angle - 90) * Math.PI) / 180
        const x = Math.cos(rad) * radius
        const y = Math.sin(rad) * radius
        return (
          <div
            key={f.id}
            data-hub-card
            className="absolute left-1/2 top-1/2 rounded-lg border border-white/15 bg-white/[0.06] px-3 py-2 text-xs font-medium text-text-secondary backdrop-blur-sm"
            style={{
              transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
            }}
          >
            {f.label}
          </div>
        )
      })}

      {/* Particles */}
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="absolute h-1 w-1 rounded-full bg-accent-cyan/40"
          style={{
            left: `${20 + (i * 7) % 60}%`,
            top: `${15 + (i * 11) % 70}%`,
            opacity: 0.3 + progress * 0.4,
          }}
        />
      ))}
    </div>
  )
}
