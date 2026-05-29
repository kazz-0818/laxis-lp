import { useEffect, useRef, useState } from 'react'
import { gsap, registerGsap } from '../../lib/gsap'
import { AtmosphereBackground } from '../scenes/AtmosphereBackground'
import { RebuildLinesVisual } from '../visuals/RebuildLinesVisual'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useIsMobile } from '../../hooks/useIsMobile'

export function RebuildSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const copyRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const reduced = useReducedMotion()
  const mobile = useIsMobile()

  useEffect(() => {
    if (reduced || mobile || !sectionRef.current || !pinRef.current) return

    registerGsap()
    const proxy = { v: 0 }
    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=200%',
          scrub: 1,
          pin: pinRef.current,
        },
      })
        .to(proxy, { v: 1, onUpdate: () => setProgress(proxy.v) })
        .fromTo(copyRef.current, { opacity: 0.4 }, { opacity: 1, duration: 0.3 }, 0.1)
    }, sectionRef)

    return () => ctx.revert()
  }, [reduced, mobile])

  const body = (
    <>
      <AtmosphereBackground variant="warm" />
      <div className="absolute inset-0 vignette-light pointer-events-none z-[1]" />
      <div className="absolute top-6 left-5 sm:left-10 z-30 flex items-center gap-3">
        <span className="text-[11px] tracking-[0.35em] text-cyan-600">04</span>
        <span className="h-px w-8 bg-navy-900/15" />
        <span className="text-[11px] tracking-[0.35em] uppercase text-navy-800/45">REBUILD</span>
      </div>
      <div className="absolute top-6 right-5 sm:right-10 z-30">
        <span className="pill-tag">LAXIS · 04</span>
      </div>

      <div className="relative z-10 h-full flex flex-col section-pad py-20 sm:py-24">
        <div ref={copyRef} className="text-center mb-8 sm:mb-4">
          <h2 className="text-editorial text-3xl sm:text-5xl lg:text-6xl leading-[1.1] max-w-3xl mx-auto">
            業務は、
            <br />
            作る前に整える。
          </h2>
          <p className="mt-6 text-sm text-navy-800/55 font-light max-w-md mx-auto">
            システム化の前に、現場の流れから設計する。
          </p>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <RebuildLinesVisual progress={progress} />
        </div>
      </div>
    </>
  )

  if (mobile) {
    return (
      <section id="rebuild" className="relative min-h-[100svh] scene-white overflow-hidden">
        {body}
      </section>
    )
  }

  return (
    <section ref={sectionRef} id="rebuild" className="relative h-[300vh]">
      <div ref={pinRef} className="relative h-[100svh] overflow-hidden scene-white">
        {body}
      </div>
    </section>
  )
}
