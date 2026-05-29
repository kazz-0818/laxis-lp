import { useEffect, useRef } from 'react'
import { gsap, registerGsap } from '../../lib/gsap'
import { ChapterShell } from '../ui/ChapterShell'
import { GridBackground } from '../ui/GridBackground'
import { NoiseBackground } from '../ui/NoiseBackground'
import { PhilosophyNodes } from '../scenes/PhilosophyNodes'
import { SECTION_IDS } from '../../lib/constants'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useIsMobile } from '../../hooks/useIsMobile'

const steps = [
  { phase: 'Organize', title: '複雑な現状業務', color: 'text-red-400' },
  { phase: 'Organize', title: 'ムダ・属人化の解消', color: 'text-amber-400' },
  { phase: 'Systemize', title: '最適なツール選定', color: 'text-cyan-400' },
  { phase: 'Automate', title: 'ラクに回る仕組み', color: 'text-mint-400' },
]

export function PhilosophySection() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const mobile = useIsMobile()

  useEffect(() => {
    if (reduced || mobile || !wrapRef.current || !stepsRef.current) return

    registerGsap()
    const stepEls = stepsRef.current.querySelectorAll('[data-step]')

    const ctx = gsap.context(() => {
      gsap.set(stepEls, { opacity: 0.2, x: -30 })

      gsap.timeline({
        scrollTrigger: {
          trigger: wrapRef.current,
          start: 'top top',
          end: '+=140%',
          scrub: 1,
          pin: true,
        },
      }).to(stepEls, {
        opacity: 1,
        x: 0,
        stagger: 0.2,
        ease: 'power2.out',
      })
    }, wrapRef)

    return () => ctx.revert()
  }, [reduced, mobile])

  return (
    <ChapterShell
      id={SECTION_IDS.philosophy}
      chapter="Reframe"
      chapterNum="04"
      theme="dark"
      minHeight="min-h-[200vh]"
      className="!pt-0"
    >
      <GridBackground />
      <NoiseBackground />

      <div ref={wrapRef} className="relative min-h-[200vh]">
        <div className="h-[100svh] flex flex-col justify-center section-pad pt-20">
          <div className="container-narrow relative z-10">
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-[1.15] max-w-4xl">
              今の業務をそのまま
              <br />
              システム化するのではなく、
              <br />
              <span className="text-shine">まず業務そのものを整えます。</span>
            </h2>
            <p className="mt-5 text-slate-400 max-w-xl">
              ゼロベースの業務改善。現場目線で「ラクに、正確に回る」設計を行います。
            </p>

            <div className="mt-10 hidden lg:block">
              <PhilosophyNodes />
            </div>

            <div ref={stepsRef} className="mt-10 lg:mt-14 grid sm:grid-cols-2 gap-4">
              {steps.map((step) => (
                <div
                  key={step.title}
                  data-step
                  className="glass-neon rounded-2xl p-5 sm:p-6 border-l-4 border-l-cyan-400/60 will-change-transform"
                >
                  <p className={`text-[10px] font-bold tracking-widest uppercase ${step.color}`}>
                    {step.phase}
                  </p>
                  <h3 className="text-lg sm:text-xl font-bold text-white mt-2">{step.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ChapterShell>
  )
}
