import { lazy, Suspense, useEffect, useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { gsap, registerGsap } from '../../lib/gsap'
import { GlowButton } from '../ui/GlowButton'
import { CTA, SECTION_IDS, STORY_PHASES } from '../../lib/constants'
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
  const contentRef = useRef<HTMLDivElement>(null)
  const canvasWrapRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef(0)

  useEffect(() => {
    if (reduced || mobile || !sectionRef.current || !pinRef.current) return

    registerGsap()
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=120%',
          scrub: 1,
          pin: pinRef.current,
        },
      })

      const proxy = { value: 0 }
      tl.to(
        proxy,
        {
          value: 1,
          ease: 'none',
          duration: 1,
          onUpdate: () => {
            progressRef.current = proxy.value
          },
        },
        0,
      )
        .to(
          canvasWrapRef.current,
          { y: 120, scale: 0.85, opacity: 0.6, ease: 'power2.inOut' },
          0,
        )
        .to(contentRef.current, { y: -40, opacity: 0.85, ease: 'power2.inOut' }, 0)
    }, sectionRef)

    return () => ctx.revert()
  }, [reduced, mobile])

  return (
    <section ref={sectionRef} id={SECTION_IDS.hero} className="relative h-[220vh]">
      <div ref={pinRef} className="relative h-screen overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-navy-950 via-navy-900 to-navy-800" />
        <div className="absolute inset-0 grid-floor opacity-80" />
        <div className="absolute inset-0 noise" />

        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-mint-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div
          ref={canvasWrapRef}
          className="absolute inset-0 lg:left-[20%] will-change-transform"
        >
          <Suspense fallback={<div className="absolute inset-0 bg-navy-900/50 animate-pulse" />}>
            <HeroScene className="absolute inset-0 w-full h-full" progressRef={progressRef} />
          </Suspense>
        </div>

        <div className="absolute inset-0 bg-linear-to-r from-navy-950 via-navy-950/90 to-transparent lg:via-navy-950/70 pointer-events-none" />
        <div className="absolute inset-0 bg-linear-to-t from-navy-950 via-transparent to-transparent pointer-events-none" />

        <div
          ref={contentRef}
          className="relative z-10 h-full flex flex-col justify-center container-wide px-5 sm:px-8 lg:px-12 will-change-transform"
        >
          <p className="inline-flex items-center gap-2 w-fit text-xs sm:text-sm font-semibold text-mint-400 mb-6 px-4 py-2 rounded-full border border-mint-400/40 bg-mint-400/10 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-mint-400 animate-pulse" />
            ゼロから整える、業務効率化サービス
          </p>

          <h1 className="text-[1.85rem] sm:text-4xl lg:text-6xl font-extrabold text-white leading-[1.1] max-w-3xl tracking-tight">
            不便な業務を整え、
            <br />
            <span className="text-shine">ラクに回る仕組み</span>をつくる。
          </h1>

          <p className="mt-6 text-sm sm:text-lg text-slate-300/95 max-w-xl leading-relaxed">
            業務改善・システム開発・自動化・運用改善まで。
            <br className="hidden sm:block" />
            LAXISは、現場の業務をゼロから整理し、会社に合った仕組みを構築します。
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <GlowButton href={CTA.consult} variant="primary" size="lg" className="w-full sm:w-auto">
              無料相談する
              <ArrowRight size={18} />
            </GlowButton>
            <GlowButton
              href={`#${SECTION_IDS.service}`}
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto"
            >
              サービスを見る
            </GlowButton>
          </div>

          <div className="mt-12 flex flex-wrap gap-2">
            {STORY_PHASES.map((phase) => (
              <span
                key={phase.id}
                className="text-[10px] sm:text-xs px-3 py-1 rounded-full border border-white/10 text-slate-400 bg-white/5"
              >
                {phase.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
