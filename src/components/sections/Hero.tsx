import { useEffect, useRef, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { gsap, registerGsap } from '../../lib/gsap'
import { GlowButton } from '../ui/GlowButton'
import { ChaosClusterVisual } from '../visuals/ChaosClusterVisual'
import { AtmosphereBackground } from '../scenes/AtmosphereBackground'
import { CTA, SECTION_IDS } from '../../lib/constants'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useIsMobile } from '../../hooks/useIsMobile'

export function Hero() {
  const reduced = useReducedMotion()
  const mobile = useIsMobile()
  const sectionRef = useRef<HTMLElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const copyRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (reduced || mobile || !sectionRef.current || !pinRef.current) return

    registerGsap()
    const proxy = { v: 0 }

    const ctx = gsap.context(() => {
      gsap.set(copyRef.current, { opacity: 0, y: 48 })

      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=220%',
          scrub: 1.1,
          pin: pinRef.current,
        },
      })
        .to(proxy, {
          v: 1,
          onUpdate: () => setProgress(proxy.v),
        })
        .to(copyRef.current, { opacity: 1, y: 0, duration: 0.25 }, 0.12)
        .to(copyRef.current, { opacity: 1, y: -24, duration: 0.3 }, 0.65)
    }, sectionRef)

    return () => ctx.revert()
  }, [reduced, mobile])

  const inner = (
    <>
      <AtmosphereBackground variant="white" />
      <div className="absolute inset-0 vignette-light pointer-events-none z-[1]" />
      <div className="absolute top-6 right-5 sm:right-10 z-30">
        <span className="pill-tag">LAXIS · 00</span>
      </div>

      <div className="relative z-10 h-full flex flex-col section-pad pt-24 sm:pt-28">
        <div className="flex-1 flex items-center justify-center min-h-0">
          <ChaosClusterVisual progress={progress} />
        </div>

        <div ref={copyRef} className="pb-14 sm:pb-20 container-editorial max-w-4xl mx-auto w-full">
          <h1 className="text-editorial text-[2rem] sm:text-5xl lg:text-[4.5rem] leading-[1.06]">
            不便な業務を整え、
            <br />
            <span className="text-shine italic">ラクに回る仕組み</span>
            をつくる。
          </h1>
          <p className="mt-6 text-sm sm:text-base text-navy-800/55 max-w-md font-light leading-relaxed">
            業務改善・自動化・運用改善まで。現場の業務をゼロから整理します。
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <GlowButton href={CTA.consult} variant="primary" size="md">
              無料相談する
              <ArrowRight size={16} />
            </GlowButton>
            <GlowButton href="#chaos" variant="secondary" size="md">
              スクロール
            </GlowButton>
          </div>
        </div>
      </div>
    </>
  )

  if (mobile) {
    return (
      <section id={SECTION_IDS.hero} className="relative min-h-[100svh] scene-white overflow-hidden">
        {inner}
      </section>
    )
  }

  return (
    <section ref={sectionRef} id={SECTION_IDS.hero} className="relative h-[320vh]">
      <div ref={pinRef} className="relative h-[100svh] overflow-hidden scene-white">
        {inner}
      </div>
    </section>
  )
}
