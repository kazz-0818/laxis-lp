import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { chaosProblems } from '../../data/chaosProblems'
import { SectionLabel } from '../ui/SectionLabel'
import { FloatingBusinessCards } from '../three/FloatingBusinessCards'
import { useSceneStore } from '../../store/sceneStore'

gsap.registerPlugin(ScrollTrigger)

export function ChaosSection() {
  const ref = useRef<HTMLElement>(null)
  const chaosProgress = useSceneStore((s) => s.chaosProgress)

  useEffect(() => {
    const section = ref.current
    if (!section) return

    const cards = section.querySelectorAll('[data-chaos-card]')
    cards.forEach((card, i) => {
      ScrollTrigger.create({
        trigger: section,
        start: `top+=${i * 15}% bottom`,
        end: `top+=${(i + 1) * 20}% center`,
        scrub: true,
        onUpdate: (self) => {
          gsap.set(card, {
            opacity: self.progress,
            z: self.progress * 100,
            scale: 0.9 + self.progress * 0.1,
          })
        },
      })
    })
  }, [])

  return (
    <section
      ref={ref}
      data-scene="chaos"
      className="scene-section relative min-h-[200vh] overflow-hidden scene-scrim py-32"
    >
      <FloatingBusinessCards mode="chaos" />

      {/* Tangled lines SVG */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-30" aria-hidden>
        <path
          d="M100,200 Q300,100 500,300 T900,200"
          fill="none"
          stroke="#8fa3b8"
          strokeWidth="1"
          opacity={0.3 + chaosProgress * 0.3}
        />
        <path
          d="M200,400 Q400,200 600,500 T1000,350"
          fill="none"
          stroke="#8fa3b8"
          strokeWidth="1"
          opacity={0.2 + chaosProgress * 0.2}
        />
        <path
          d="M50,600 Q350,450 650,650 T1100,500"
          fill="none"
          stroke="#8fa3b8"
          strokeWidth="1"
          opacity={0.25 + chaosProgress * 0.25}
        />
      </svg>

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <SectionLabel number="02" label="Chaos" className="mb-6" />
        <h2 className="max-w-3xl text-3xl font-bold leading-tight text-text-primary md:text-5xl">
          その業務、
          <br />
          まだ人の頑張りだけで回していませんか？
        </h2>

        <div className="relative mt-20 min-h-[60vh]">
          {chaosProblems.map((problem, i) => {
            const positions = [
              { top: '5%', left: '5%' },
              { top: '15%', right: '8%' },
              { top: '40%', left: '10%' },
              { top: '55%', right: '5%' },
              { top: '75%', left: '20%' },
            ]
            const pos = positions[i]
            return (
              <div
                key={problem.title}
                data-chaos-card
                className="absolute max-w-xs rounded-xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-md"
                style={{
                  top: pos.top,
                  left: 'left' in pos ? pos.left : undefined,
                  right: 'right' in pos ? pos.right : undefined,
                  transform: `rotate(${(i - 2) * 3}deg)`,
                }}
              >
                <h3 className="text-sm font-semibold text-light-warm">{problem.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-text-muted">{problem.body}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
