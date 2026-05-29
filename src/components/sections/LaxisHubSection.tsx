import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { gsap, registerGsap } from '../../lib/gsap'
import { AtmosphereBackground } from '../scenes/AtmosphereBackground'
import { HubOrbitLabels } from '../visuals/HubOrbitLabels'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useIsMobile } from '../../hooks/useIsMobile'

const HubScene = lazy(() => import('../3d/HubScene').then((m) => ({ default: m.HubScene })))

export function LaxisHubSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const [gather, setGather] = useState(0)
  const reduced = useReducedMotion()
  const mobile = useIsMobile()

  useEffect(() => {
    if (reduced || mobile || !sectionRef.current || !pinRef.current) return

    registerGsap()
    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=150%',
          scrub: 1,
          pin: pinRef.current,
          onUpdate: (self) => setGather(self.progress),
        },
      }).fromTo(titleRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.25 }, 0)
    }, sectionRef)

    return () => ctx.revert()
  }, [reduced, mobile])

  const scene = (
    <>
      <AtmosphereBackground variant="hub" />
      <div className="absolute inset-0 vignette-light pointer-events-none z-[1]" />
      <div className="absolute top-6 left-5 sm:left-10 z-30 flex items-center gap-3">
        <span className="text-[11px] tracking-[0.35em] text-cyan-100">06</span>
        <span className="h-px w-8 bg-white/30" />
        <span className="text-[11px] tracking-[0.35em] uppercase text-white/50">HUB</span>
      </div>
      <div className="absolute top-6 right-5 sm:right-10 z-30">
        <span className="pill-tag-invert">LAXIS · 06</span>
      </div>

      <div ref={titleRef} className="relative z-20 text-center pt-16 sm:pt-20 section-pad">
        <h2 className="font-serif font-semibold text-3xl sm:text-5xl lg:text-7xl leading-[1.05] text-navy-900 sm:text-white drop-shadow-sm">
          バラバラな業務を、
          <br />
          <span className="text-shine">ひとつに。</span>
        </h2>
      </div>

      <div className="relative z-10 flex-1 min-h-[50vh] sm:min-h-[55vh]">
        <HubOrbitLabels gather={gather} />
        <Suspense fallback={null}>
          <HubScene className="absolute inset-0 w-full h-full" gatherProgress={gather} />
        </Suspense>
      </div>

      <p className="relative z-20 text-center text-sm text-white/50 font-light pb-16 section-pad">
        すべての業務が、Laxis Hubに集約される。
      </p>
    </>
  )

  if (mobile) {
    return (
      <section id="hub" className="relative min-h-[100svh] scene-hub overflow-hidden flex flex-col">
        {scene}
      </section>
    )
  }

  return (
    <section ref={sectionRef} id="hub" className="relative h-[250vh]">
      <div ref={pinRef} className="relative h-[100svh] overflow-hidden scene-hub flex flex-col">
        {scene}
      </div>
    </section>
  )
}
