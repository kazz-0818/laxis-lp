import { useEffect, useRef } from 'react'
import { gsap, registerGsap } from '../../lib/gsap'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const fragments = [
  { label: 'LINE', sub: '通知', x: -28, y: -18, z: 40, rot: -12, w: 'w-28' },
  { label: 'Excel', sub: '転記', x: 32, y: -22, z: 60, rot: 8, w: 'w-32' },
  { label: 'PDF', sub: '請求', x: -8, y: 8, z: 80, rot: -4, w: 'w-24' },
  { label: '顧客', sub: '情報', x: 22, y: 14, z: 50, rot: 14, w: 'w-28' },
  { label: '売上', sub: 'グラフ', x: -22, y: 22, z: 30, rot: -18, w: 'w-30' },
  { label: 'AI', sub: '活用', x: 12, y: -8, z: 100, rot: 6, w: 'w-22' },
  { label: '予約', sub: '管理', x: -35, y: 4, z: 20, rot: -8, w: 'w-24' },
  { label: 'Hub', sub: '断片', x: 38, y: 6, z: 70, rot: 10, w: 'w-28' },
]

interface Props {
  progress?: number
  className?: string
}

export function ChaosClusterVisual({ progress = 0, className }: Props) {
  const rootRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced || !rootRef.current) return
    registerGsap()
    const items = rootRef.current.querySelectorAll('[data-frag]')
    const ctx = gsap.context(() => {
      items.forEach((el, i) => {
        gsap.to(el, {
          y: Math.sin(i) * 12,
          duration: 2.5 + (i % 3) * 0.4,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        })
      })
    }, rootRef)
    return () => ctx.revert()
  }, [reduced])

  const spread = progress * 1.2

  return (
    <div
      ref={rootRef}
      className={`perspective-1200 relative w-full max-w-4xl h-[min(70vh,560px)] mx-auto ${className ?? ''}`}
      aria-hidden
    >
      <div className="absolute inset-0 preserve-3d flex items-center justify-center">
        {/* 中央コア */}
        <div
          className="absolute w-24 h-24 sm:w-32 sm:h-32 rounded-full border border-cyan-400/30 bg-white/80 shadow-[0_0_60px_rgba(34,211,238,0.2)] flex items-center justify-center"
          style={{
            transform: `translateZ(120px) scale(${1 - progress * 0.15})`,
          }}
        >
          <span className="text-editorial text-lg sm:text-xl text-navy-900">LAXIS</span>
        </div>

        {/* 絡まった線 */}
        <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 400 400">
          <path
            d="M80 120 Q200 80 320 140 T200 280 T80 200"
            fill="none"
            stroke="url(#lineGrad)"
            strokeWidth="1"
            strokeDasharray="4 6"
            style={{ opacity: 1 - progress * 0.7 }}
          />
          <path
            d="M120 80 Q240 200 280 320"
            fill="none"
            stroke="#94a3b8"
            strokeWidth="0.75"
            opacity="0.5"
            style={{ opacity: 1 - progress * 0.8 }}
          />
          <defs>
            <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#94a3b8" />
              <stop offset="100%" stopColor="#22d3ee" />
            </linearGradient>
          </defs>
        </svg>

        {fragments.map((f) => (
          <div
            key={f.label}
            data-frag
            className={`absolute card-float px-4 py-3 ${f.w} preserve-3d`}
            style={{
              left: `calc(50% + ${f.x * (1 + spread * 0.3)}%)`,
              top: `calc(50% + ${f.y * (1 + spread * 0.3)}%)`,
              transform: `
                translate(-50%, -50%)
                translateZ(${f.z - progress * 40}px)
                rotateY(${f.rot + progress * 20}deg)
                rotateX(${-f.rot * 0.5}deg)
                scale(${1 - progress * 0.1})
              `,
            }}
          >
            <p className="text-xs font-semibold text-navy-900">{f.label}</p>
            <p className="text-[10px] text-navy-800/50">{f.sub}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
