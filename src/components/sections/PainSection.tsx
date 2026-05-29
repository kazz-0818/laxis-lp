import { useEffect, useRef } from 'react'
import { gsap, registerGsap } from '../../lib/gsap'
import { AtmosphereBackground } from '../scenes/AtmosphereBackground'
import { PainFragmentVisual } from '../visuals/PainFragmentVisual'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useIsMobile } from '../../hooks/useIsMobile'

const pains = [
  {
    title: '属人化',
    line: '担当者しかわからない。引き継ぎが、毎日の負担になる。',
    accent: 'PAIN 01',
  },
  {
    title: '手作業',
    line: '転記、集計、PDF、LINE。人の手がボトルネックになる。',
    accent: 'PAIN 02',
  },
  {
    title: 'バラバラ',
    line: '顧客・売上・予約・請求。全体像が見えない。',
    accent: 'PAIN 03',
  },
  {
    title: 'ミスと漏れ',
    line: '小さな抜けが、大きな損失になる。',
    accent: 'PAIN 04',
  },
  {
    title: '何から？',
    line: 'DXに興味はある。でも、最初の一歩がわからない。',
    accent: 'PAIN 05',
  },
]

export function PainSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const slidesRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const mobile = useIsMobile()

  useEffect(() => {
    if (reduced || mobile || !sectionRef.current || !pinRef.current || !slidesRef.current) return

    registerGsap()
    const panels = slidesRef.current.querySelectorAll('[data-pain]')
    const ctx = gsap.context(() => {
      gsap.set(panels, { opacity: 0, y: 80, scale: 0.88 })
      gsap.set(panels[0], { opacity: 1, y: 0, scale: 1 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: `+=${pains.length * 90}%`,
          scrub: 1,
          pin: pinRef.current,
        },
      })

      panels.forEach((panel, i) => {
        if (i === 0) return
        tl.to(panels[i - 1], { opacity: 0, y: -60, scale: 0.92, duration: 0.2 }, i * 0.18)
          .to(panel, { opacity: 1, y: 0, scale: 1, duration: 0.25 }, i * 0.18 + 0.05)
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [reduced, mobile])

  const slideContent = (p: (typeof pains)[0], i: number) => (
    <div className="absolute inset-0 flex flex-col lg:flex-row items-center justify-center gap-12 section-pad">
      <div className="lg:w-1/2 flex justify-center preserve-3d">
        <PainFragmentVisual title={p.title} accent={p.accent} depth={i * 8} />
      </div>
      <div className="lg:w-1/2 text-center lg:text-left max-w-md">
        <p className="text-xs tracking-[0.45em] text-cyan-600 mb-4">02 / PAIN</p>
        <h2 className="text-editorial text-4xl sm:text-6xl leading-[1.05]">{p.title}</h2>
        <p className="mt-6 text-base text-navy-800/55 font-light leading-relaxed">{p.line}</p>
      </div>
    </div>
  )

  if (mobile) {
    return (
      <section id="pain" className="scene-white section-pad py-24 space-y-24">
        <AtmosphereBackground variant="mist" />
        <div className="relative z-10">
          {pains.map((p) => (
            <div key={p.title} className="mb-20">
              {slideContent(p, 0)}
            </div>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section
      ref={sectionRef}
      id="pain"
      className="relative"
      style={{ height: `${100 + pains.length * 90}vh` }}
    >
      <div ref={pinRef} className="relative h-[100svh] overflow-hidden scene-white">
        <AtmosphereBackground variant="mist" />
        <div className="absolute inset-0 vignette-light pointer-events-none z-[1]" />
        <div ref={slidesRef} className="relative z-10 h-full">
          {pains.map((p, i) => (
            <div key={p.title} data-pain className="absolute inset-0 preserve-3d">
              {slideContent(p, i)}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
