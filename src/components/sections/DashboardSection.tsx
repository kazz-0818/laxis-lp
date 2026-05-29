import { useEffect, useRef } from 'react'
import { gsap, registerGsap } from '../../lib/gsap'
import { AtmosphereBackground } from '../scenes/AtmosphereBackground'
import { DashboardMock } from '../ui/DashboardMock'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useIsMobile } from '../../hooks/useIsMobile'

export function DashboardSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const mobile = useIsMobile()

  useEffect(() => {
    if (reduced || mobile || !sectionRef.current) return
    registerGsap()
    const mock = sectionRef.current.querySelector('[data-dashboard-mock]')
    const ctx = gsap.context(() => {
      gsap.fromTo(
        mock,
        { scale: 0.75, y: 120, rotateX: 12, opacity: 0.35 },
        {
          scale: 1,
          y: 0,
          rotateX: 2,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            end: 'center 40%',
            scrub: 1.2,
          },
        },
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [reduced, mobile])

  return (
    <section ref={sectionRef} id="result" className="relative min-h-[120svh] scene-white overflow-hidden">
      <AtmosphereBackground variant="white" />
      <div className="absolute inset-0 vignette-light pointer-events-none z-[1]" />
      <div className="absolute top-6 left-5 sm:left-10 z-30 flex items-center gap-3">
        <span className="text-[11px] tracking-[0.35em] text-cyan-600">07</span>
        <span className="h-px w-8 bg-navy-900/15" />
        <span className="text-[11px] tracking-[0.35em] uppercase text-navy-800/45">RESULT</span>
      </div>
      <div className="absolute top-6 right-5 sm:right-10 z-30">
        <span className="pill-tag">LAXIS · 07</span>
      </div>

      <div className="relative z-10 section-pad py-20 sm:py-28">
        <div className="text-center mb-10 sm:mb-14 container-editorial mx-auto">
          <h2 className="text-editorial text-3xl sm:text-5xl leading-[1.08]">
            現場が、毎日使う画面。
          </h2>
          <p className="mt-4 text-sm text-navy-800/50 font-light">
            実際に使えそうな、会社専用の管理画面。
          </p>
        </div>
        <div data-dashboard-mock className="perspective-1200 preserve-3d">
          <DashboardMock />
        </div>
      </div>
    </section>
  )
}
