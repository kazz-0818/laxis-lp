import { useEffect, useRef } from 'react'
import gsap from 'gsap'

type Props = {
  items: readonly string[]
  mode: 'scatter' | 'aligned'
  progress?: number
}

const scatterPos = (i: number, n: number) => {
  const angle = (i / n) * Math.PI * 2
  const r = 34 + (i % 4) * 10
  const x = 50 + Math.cos(angle) * r
  const clampedX = x < 42 ? 12 + (i % 3) * 8 : x > 58 ? 88 - (i % 3) * 8 : x
  return {
    left: `${clampedX}%`,
    top: `${38 + Math.sin(angle) * r * 0.65}%`,
    rotate: (i - n / 2) * 5,
    z: i,
  }
}

export function FloatingFragments({ items, mode, progress = 1 }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = ref.current
    if (!root || mode !== 'scatter') return
    const cards = root.querySelectorAll('[data-frag]')
    cards.forEach((card, i) => {
      gsap.to(card, {
        y: `+=${5 + (i % 3) * 3}`,
        duration: 2 + i * 0.15,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    })
  }, [mode])

  return (
    <div ref={ref} className="fragments" aria-hidden>
      {items.map((label, i) => {
        const p = scatterPos(i, items.length)
        const aligned = {
          left: '50%',
          top: `${18 + i * 7}%`,
          transform: 'translateX(-50%)',
          opacity: mode === 'aligned' ? 0.85 : 0.2,
        }
        const style =
          mode === 'scatter'
            ? {
                left: p.left,
                top: p.top,
                transform: `rotate(${p.rotate}deg)`,
                opacity: 0.35 + progress * 0.5,
                zIndex: p.z,
              }
            : aligned

        return (
          <span key={label} data-frag className="fragment-card" style={style}>
            {label}
          </span>
        )
      })}
    </div>
  )
}
