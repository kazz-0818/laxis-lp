import { lazy, Suspense, useEffect, useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { gsap, registerGsap } from '../../lib/gsap'
import { GlowButton } from '../ui/GlowButton'
import { AtmosphereBackground } from '../scenes/AtmosphereBackground'
import { CTA, SECTION_IDS } from '../../lib/constants'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useIsMobile } from '../../hooks/useIsMobile'

const HeroScene = lazy(() =>
  import('../3d/HeroScene').then((m) => ({ default: m.HeroScene })),
)

export function Hero() {
  const reduced = useReducedMotion()
  const mobile = useIsMobile()
  const sectionRef = useRef<HTMLElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef(0)

  useEffect(() => {
    if (reduced || mobile || !sectionRef.current || !pinRef.current) return

    registerGsap()
    const proxy = { value: 0 }

    const ctx = gsap.context(() => {
      if (contentRef.current) gsap.set(contentRef.current, { opacity: 0, y: 60 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=200%',
          scrub: 1.2,
          pin: pinRef.current,
        },
      })

      tl.to(proxy, {
        value: 1,
        ease: 'none',
        onUpdate: () => {
          progressRef.current = proxy.value
        },
      })
        .to(contentRef.current, { opacity: 1, y: 0, duration: 0.35 }, 0.15)
        .to(sceneRef.current, { scale: 0.88, y: 60, opacity: 0.85 }, 0.4)
        .to(contentRef.current, { opacity: 1, y: -20 }, 0.75)
    }, sectionRef)

    return () => ctx.revert()
  }, [reduced, mobile])

  return (
    <section ref={sectionRef} id={SECTION_IDS.hero} className="relative h-[320vh]">
      <div ref={pinRef} className="relative h-[100svh] overflow-hidden scene-white">
        <AtmosphereBackground variant="white" />

        <div className="absolute top-6 right-5 sm:right-10 z-30">
          <span className="pill-tag">LAXIS · 00</span>
        </div>

        <div ref={sceneRef} className="absolute inset-0 will-change-transform">
          <Suspense fallback={null}>
            <HeroScene className="absolute inset-0 w-full h-full" progressRef={progressRef} />
          </Suspense>
        </div>

        <div
          ref={contentRef}
          className="absolute inset-x-0 bottom-0 z-20 section-pad pb-12 sm:pb-20 pt-32 bg-linear-to-t from-white via-white/95 to-transparent will-change-transform"
        >
          <div className="container-editorial max-w-4xl">
            <p className="text-[11px] tracking-[0.4em] uppercase text-cyan-600 mb-6">
              業務効率化サービス
            </p>
            <h1 className="text-editorial text-[2.25rem] sm:text-5xl lg:text-[4.25rem] leading-[1.08]">
              不便な業務を整え、
              <br />
              <span className="text-shine italic">ラクに回る仕組み</span>
              をつくる。
            </h1>
            <p className="mt-8 text-sm sm:text-base text-navy-800/65 leading-relaxed max-w-lg font-light">
              業務改善・システム開発・自動化・運用改善まで。
              現場の業務をゼロから整理し、会社に合った仕組みを構築します。
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <GlowButton href={CTA.consult} variant="primary" size="md">
                無料相談する
                <ArrowRight size={16} />
              </GlowButton>
              <GlowButton href={`#${SECTION_IDS.service}`} variant="secondary" size="md">
                サービスを見る
              </GlowButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
