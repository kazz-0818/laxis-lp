import { useEffect, useRef } from 'react'
import { gsap, registerGsap } from '../../lib/gsap'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const nodes = [
  { id: 'a', x: 120, y: 80, label: '現状業務' },
  { id: 'b', x: 320, y: 40, label: '属人化' },
  { id: 'c', x: 520, y: 100, label: '二重入力' },
  { id: 'd', x: 200, y: 220, label: '手作業' },
  { id: 'e', x: 400, y: 200, label: 'ツール選定' },
  { id: 'f', x: 600, y: 240, label: '自動化' },
  { id: 'g', x: 360, y: 320, label: 'LAXIS' },
]

const edges = [
  ['a', 'b'],
  ['a', 'd'],
  ['b', 'e'],
  ['c', 'e'],
  ['d', 'e'],
  ['e', 'f'],
  ['f', 'g'],
  ['e', 'g'],
]

export function PhilosophyNodes() {
  const svgRef = useRef<SVGSVGElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced || !svgRef.current) return

    registerGsap()
    const nodeEls = svgRef.current.querySelectorAll('[data-node]')
    const lineEls = svgRef.current.querySelectorAll('[data-edge]')

    const ctx = gsap.context(() => {
      gsap.set(nodeEls, { opacity: 0.2, scale: 0.8, transformOrigin: 'center' })
      gsap.set(lineEls, { opacity: 0 })

      gsap.timeline({
        scrollTrigger: {
          trigger: svgRef.current,
          start: 'top 70%',
          end: 'bottom 30%',
          scrub: 1,
        },
      })
        .to(lineEls, { opacity: 0.7, stagger: 0.05, duration: 0.3 }, 0)
        .to(nodeEls, { opacity: 1, scale: 1, stagger: 0.08, ease: 'power2.out' }, 0.1)
    })

    return () => ctx.revert()
  }, [reduced])

  const getNode = (id: string) => nodes.find((n) => n.id === id)!

  return (
    <svg ref={svgRef} viewBox="0 0 720 400" className="w-full h-auto max-h-[360px]" aria-hidden>
      <defs>
        <linearGradient id="edgeGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0.9" />
        </linearGradient>
      </defs>
      {edges.map(([from, to], i) => {
        const a = getNode(from)
        const b = getNode(to)
        return (
          <line
            key={i}
            data-edge
            x1={a.x}
            y1={a.y}
            x2={b.x}
            y2={b.y}
            stroke="url(#edgeGrad)"
            strokeWidth="1.5"
          />
        )
      })}
      {nodes.map((n) => (
        <g key={n.id}>
          <circle
            data-node
            cx={n.x}
            cy={n.y}
            r="28"
            fill="#ffffff"
            stroke={n.id === 'g' ? '#06b6d4' : '#cbd5e1'}
            strokeWidth={n.id === 'g' ? 2 : 1.5}
          />
          <text
            x={n.x}
            y={n.y + 4}
            textAnchor="middle"
            fill="#0f2744"
            fontSize="10"
            fontWeight="600"
          >
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  )
}
