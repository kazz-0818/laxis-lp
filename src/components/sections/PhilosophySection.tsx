import { useEffect, useRef } from 'react'
import { gsap, registerGsap } from '../../lib/gsap'
import { CinematicScene } from '../ui/CinematicScene'
import { AtmosphereBackground } from '../scenes/AtmosphereBackground'
import { PhilosophyNodes } from '../scenes/PhilosophyNodes'
import { SECTION_IDS } from '../../lib/constants'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useIsMobile } from '../../hooks/useIsMobile'

const lines = [
  '複雑な現状業務',
  'ムダ・属人化の解消',
  '最適なツール選定',
  'ラクに回る仕組み',
]

export function PhilosophySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const ghostRef = useRef<HTMLParagraphElement>(null)
  const mainRef = useRef<HTMLDivElement>(null)
  const linesRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const mobile = useIsMobile()

  useEffect(() => {
    if (reduced || mobile || !sectionRef.current || !pinRef.current) return

    registerGsap()
    const lineEls = linesRef.current?.querySelectorAll('[data-line]')
    if (!lineEls?.length) return

    const ctx = gsap.context(() => {
      gsap.set(lineEls, { opacity: 0.2, y: 24, x: -12 })
      gsap.set(mainRef.current, { opacity: 0.6 })

      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=180%',
          scrub: 1,
          pin: pinRef.current,
        },
      })
        .to(ghostRef.current, { y: -60, opacity: 0.08, duration: 1 }, 0)
        .to(mainRef.current, { y: -30, opacity: 1, duration: 0.5 }, 0.1)
        .to(lineEls, { opacity: 1, y: 0, x: 0, stagger: 0.12, duration: 0.4 }, 0.25)
    }, sectionRef)

    return () => ctx.revert()
  }, [reduced, mobile])

  const content = (
    <>
      <p
        ref={ghostRef}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 text-editorial text-4xl sm:text-6xl text-navy-900/[0.06] whitespace-nowrap pointer-events-none select-none"
        aria-hidden
      >
        業務を、整える。
      </p>

      <div ref={mainRef} className="relative text-center">
        <p className="text-xs tracking-[0.45em] uppercase text-cyan-600 mb-10">Reframe</p>
        <h2 className="text-editorial text-3xl sm:text-4xl lg:text-5xl leading-[1.2] max-w-2xl mx-auto">
          今の業務をそのまま
          <br />
          システム化するのではなく、
          <br />
          まず業務そのものを整えます。
        </h2>
        <p className="mt-8 text-sm sm:text-base text-navy-800/65 leading-relaxed max-w-lg mx-auto font-light">
          ゼロベースの業務改善。現場目線で「ラクに、正確に回る」設計を行います。
        </p>
      </div>

      <div ref={linesRef} className="mt-16 sm:mt-20 space-y-6 max-w-md mx-auto">
        {lines.map((line, i) => (
          <div
            key={line}
            data-line
            className="flex items-center gap-4 border-b border-navy-900/8 pb-4"
          >
            <span className="text-xs text-cyan-600/70 w-6">{String(i + 1).padStart(2, '0')}</span>
            <p className="text-editorial text-xl sm:text-2xl">{line}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 hidden lg:block">
        <PhilosophyNodes />
      </div>
    </>
  )

  if (mobile) {
    return (
      <CinematicScene
        id={SECTION_IDS.philosophy}
        theme="white"
        tag="REFRAME · 03"
        background={<AtmosphereBackground variant="warm" />}
      >
        {content}
      </CinematicScene>
    )
  }

  return (
    <section ref={sectionRef} id={SECTION_IDS.philosophy} className="relative h-[280vh]">
      <div ref={pinRef} className="relative h-[100svh] overflow-hidden scene-white">
        <AtmosphereBackground variant="warm" />
        <div className="absolute top-6 right-5 sm:right-10 z-30">
          <span className="pill-tag">REFRAME · 03</span>
        </div>
        <div className="relative z-10 h-full flex flex-col justify-center section-pad py-24 vignette-light">
          <div className="container-editorial relative">{content}</div>
        </div>
      </div>
    </section>
  )
}
