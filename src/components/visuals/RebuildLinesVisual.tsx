import { useEffect, useRef } from 'react'
import { gsap, registerGsap } from '../../lib/gsap'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const steps = [
  '複雑な現状業務',
  'ムダ・属人化の解消',
  '最適なツール選定',
  'ラクに回る仕組み',
]

interface Props {
  progress?: number
}

export function RebuildLinesVisual({ progress = 0 }: Props) {
  const svgRef = useRef<SVGSVGElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced || !svgRef.current) return
    registerGsap()
    const lines = svgRef.current.querySelectorAll('[data-tangle]')
    const nodes = svgRef.current.querySelectorAll('[data-node]')
    const ctx = gsap.context(() => {
      gsap.set(lines, { drawSVG: '0%' })
      gsap.set(nodes, { opacity: 0.3, scale: 0.85, transformOrigin: 'center' })
    })
    return () => ctx.revert()
  }, [reduced])

  const order = Math.min(4, Math.floor(progress * 5))

  return (
    <div className="relative w-full max-w-3xl mx-auto" aria-hidden>
      <svg ref={svgRef} viewBox="0 0 720 380" className="w-full h-auto max-h-[50vh]">
        <defs>
          <linearGradient id="untangle" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#94a3b8" stopOpacity={1 - progress} />
            <stop offset="100%" stopColor="#2dd4bf" />
          </linearGradient>
        </defs>
        {/* 絡まった線 → 整列 */}
        <path
          data-tangle
          d="M80 100 C180 40 280 180 360 80 S520 200 640 120"
          fill="none"
          stroke="url(#untangle)"
          strokeWidth="1.5"
          opacity={1 - progress * 0.85}
        />
        <path
          d="M120 280 L200 200 L320 240 L440 160 L600 220"
          fill="none"
          stroke="#22d3ee"
          strokeWidth="1.5"
          opacity={progress}
          strokeDasharray="600"
          strokeDashoffset={600 - progress * 600}
        />
        {steps.map((label, i) => {
          const x = 100 + i * 155
          const y = 300 - progress * (i % 2 ? 40 : 20)
          const visible = i <= order
          return (
            <g key={label} data-node opacity={visible ? 1 : 0.15}>
              <circle cx={x} cy={y} r="22" fill="#fff" stroke={visible ? '#06b6d4' : '#cbd5e1'} strokeWidth="1.5" />
              <text x={x} y={y + 4} textAnchor="middle" fill="#0f2744" fontSize="9" fontWeight="600">
                {String(i + 1).padStart(2, '0')}
              </text>
              <text x={x} y={y + 38} textAnchor="middle" fill="#0f2744" fontSize="10" opacity={visible ? 1 : 0}>
                {label}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
