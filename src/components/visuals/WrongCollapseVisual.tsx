import { useEffect, useRef } from 'react'
import { gsap, registerGsap } from '../../lib/gsap'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const layers = [
  'SaaS',
  'Excel',
  'LINE',
  '紙',
  'Chat',
  '請求',
  '予約',
  '顧客',
  '売上',
]

interface Props {
  dissolve?: number
}

export function WrongCollapseVisual({ dissolve = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced || !ref.current) return
    registerGsap()
    const items = ref.current.querySelectorAll('[data-layer]')
    items.forEach((el, i) => {
      gsap.to(el, {
        y: i % 2 ? -6 : 6,
        duration: 2 + (i % 3) * 0.3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    })
  }, [reduced])

  return (
    <div
      ref={ref}
      className="relative w-[min(90vw,480px)] h-[min(55vh,400px)] perspective-1200"
      aria-hidden
    >
      <div className="absolute inset-0 preserve-3d flex items-center justify-center">
        {layers.map((label, i) => {
          const angle = (i / layers.length) * Math.PI * 2
          const r = 80 + (i % 3) * 20
          const x = Math.cos(angle) * r * (1 + dissolve * 0.8)
          const y = Math.sin(angle) * r * 0.6 * (1 + dissolve * 0.8)
          const z = i * 12 - dissolve * 80
          return (
            <div
              key={label}
              data-layer
              className="absolute px-5 py-3 rounded-lg border border-slate-300/80 bg-white/95 shadow-lg text-sm font-medium text-navy-800 preserve-3d"
              style={{
                transform: `
                  translate3d(${x}px, ${y}px, ${z}px)
                  rotateZ(${(i - 4) * 6 + dissolve * 30}deg)
                  scale(${1 - dissolve * 0.2})
                `,
                opacity: 1 - dissolve * 0.35,
              }}
            >
              {label}
            </div>
          )
        })}
        <div
          className="absolute w-20 h-20 rounded-full bg-red-500/10 border-2 border-red-400/40 flex items-center justify-center"
          style={{ transform: `translateZ(100px) scale(${1 + dissolve * 0.2})` }}
        >
          <span className="text-red-600 font-serif text-xl font-bold">×</span>
        </div>
      </div>
    </div>
  )
}
