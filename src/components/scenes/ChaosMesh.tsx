import { useEffect, useRef } from 'react'
import { gsap, registerGsap } from '../../lib/gsap'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface ChaosMeshProps {
  className?: string
  progress?: number
}

export function ChaosMesh({ className }: ChaosMeshProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced || !svgRef.current) return

    registerGsap()
    const paths = svgRef.current.querySelectorAll('path')
    paths.forEach((path) => {
      const len = path.getTotalLength()
      gsap.set(path, { strokeDasharray: len, strokeDashoffset: len })
      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 2.5,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: svgRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      })
    })
  }, [reduced])

  return (
    <svg
      ref={svgRef}
      className={className}
      viewBox="0 0 800 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id="chaosLine" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.2" />
          <stop offset="50%" stopColor="#5eead4" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      {[
        'M80,300 Q200,80 380,280 T720,320',
        'M120,420 Q280,200 450,400 T750,180',
        'M60,180 Q240,350 400,120 T680,450',
        'M200,500 Q350,300 500,480 T780,260',
        'M300,100 Q450,250 600,90 T820,200',
      ].map((d, i) => (
        <path key={i} d={d} stroke="url(#chaosLine)" strokeWidth="1.5" strokeLinecap="round" />
      ))}
      {[...Array(12)].map((_, i) => (
        <circle
          key={`n-${i}`}
          cx={80 + (i % 4) * 180 + (i % 3) * 20}
          cy={100 + Math.floor(i / 4) * 150}
          r="4"
          fill="#2dd4bf"
          opacity={0.3 + (i % 5) * 0.1}
        />
      ))}
    </svg>
  )
}
