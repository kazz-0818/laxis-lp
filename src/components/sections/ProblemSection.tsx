import { useEffect, useRef, useState } from 'react'
import { gsap, registerGsap } from '../../lib/gsap'
import { AtmosphereBackground } from '../scenes/AtmosphereBackground'
import { ProblemChaosLayer } from '../scenes/ProblemChaosLayer'
import { SECTION_IDS } from '../../lib/constants'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useIsMobile } from '../../hooks/useIsMobile'

const slides = [
  {
    num: '01',
    title: '属人化',
    body: '担当者しかわからない。引き継ぎと確認に、毎日時間が消えていく。',
  },
  {
    num: '02',
    title: 'バラバラな管理',
    body: '顧客・売上・予約・請求。情報が散らばり、全体像が見えない。',
  },
  {
    num: '03',
    title: '手作業',
    body: '転記、集計、PDF、LINE。人の手が、業務のボトルネックになる。',
  },
  {
    num: '04',
    title: 'ミスと漏れ',
    body: '入力漏れ、通知漏れ、請求漏れ。小さな抜けが、大きな損失になる。',
  },
  {
    num: '05',
    title: '何から？',
    body: 'DXに興味はある。でも、どこから手をつければいいかわからない。',
  },
]

export function ProblemSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const slidesRef = useRef<HTMLDivElement>(null)
  const [activeSlide, setActiveSlide] = useState(0)
  const reduced = useReducedMotion()
  const mobile = useIsMobile()

  useEffect(() => {
    if (reduced || mobile || !sectionRef.current || !pinRef.current || !slidesRef.current) return

    registerGsap()
    const panels = slidesRef.current.querySelectorAll('[data-slide]')

    const ctx = gsap.context(() => {
      gsap.set(panels, { opacity: 0, y: 40, scale: 0.98 })
      gsap.set(panels[0], { opacity: 1, y: 0, scale: 1 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: `+=${slides.length * 80}%`,
          scrub: 1,
          pin: pinRef.current,
          onUpdate: (self) => {
            const idx = Math.min(
              slides.length - 1,
              Math.floor(self.progress * slides.length),
            )
            setActiveSlide(idx)
          },
        },
      })

      panels.forEach((panel, i) => {
        if (i === 0) return
        tl.to(
          panels[i - 1],
          { opacity: 0, y: -30, scale: 0.96, duration: 0.25 },
          i * 0.2,
        ).to(panel, { opacity: 1, y: 0, scale: 1, duration: 0.25 }, i * 0.2 + 0.05)
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [reduced, mobile])

  if (mobile) {
    return (
      <section id={SECTION_IDS.problems} className="scene-white section-pad py-24 relative overflow-hidden">
        <AtmosphereBackground variant="mist" />
        <div className="relative z-10 container-editorial space-y-16">
          <h2 className="text-editorial text-3xl">その業務、まだ人の頑張りだけ？</h2>
          {slides.map((s) => (
            <div key={s.num} className="glass-panel">
              <p className="text-cyan-600 text-xs tracking-widest mb-2">{s.num}</p>
              <h3 className="text-editorial text-2xl">{s.title}</h3>
              <p className="mt-3 text-sm text-navy-800/60 leading-relaxed font-light">{s.body}</p>
            </div>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section
      ref={sectionRef}
      id={SECTION_IDS.problems}
      className="relative"
      style={{ height: `${100 + slides.length * 80}vh` }}
    >
      <div ref={pinRef} className="relative h-[100svh] overflow-hidden scene-white">
        <AtmosphereBackground variant="mist" />
        <ProblemChaosLayer activeIndex={activeSlide} />

        <div className="absolute top-6 right-5 sm:right-10 z-30">
          <span className="pill-tag">PAIN · 01</span>
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(90vw,500px)] text-center z-10 pointer-events-none opacity-[0.06]">
          <p className="text-editorial text-[12vw] sm:text-8xl leading-none">CHAOS</p>
        </div>

        <div
          ref={slidesRef}
          className="relative z-20 h-full flex items-center justify-center section-pad"
        >
          {slides.map((s) => (
            <div
              key={s.num}
              data-slide
              className="absolute inset-0 flex items-center justify-center section-pad"
            >
              <div className="container-editorial text-center max-w-2xl">
                <p className="text-xs tracking-[0.5em] text-cyan-600 mb-8">{s.num}</p>
                <h2 className="text-editorial text-4xl sm:text-6xl lg:text-7xl leading-[1.1]">
                  {s.title}
                </h2>
                <p className="mt-10 text-base sm:text-lg text-navy-800/55 leading-relaxed font-light max-w-md mx-auto">
                  {s.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-[10px] tracking-[0.3em] text-navy-800/35 uppercase">
          その業務、まだ人の頑張りだけで回していませんか？
        </p>
      </div>
    </section>
  )
}
