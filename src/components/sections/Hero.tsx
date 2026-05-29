import { lazy, Suspense, useEffect, useRef } from 'react'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { gsap, registerGsap } from '../../lib/gsap'
import { GlowButton } from '../ui/GlowButton'
import { GridBackground } from '../ui/GridBackground'
import { NoiseBackground } from '../ui/NoiseBackground'
import { ChaosMesh } from '../scenes/ChaosMesh'
import { CTA, SECTION_IDS } from '../../lib/constants'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useIsMobile } from '../../hooks/useIsMobile'

const HeroScene = lazy(() =>
  import('../3d/HeroScene').then((m) => ({ default: m.HeroScene })),
)

const floatTags = ['LINE', 'Spreadsheet', 'GAS', 'AI', 'PDF', 'KPI', 'CRM']

export function Hero() {
  const reduced = useReducedMotion()
  const mobile = useIsMobile()
  const sectionRef = useRef<HTMLElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<HTMLDivElement>(null)
  const meshRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef(0)

  useEffect(() => {
    if (reduced || mobile || !sectionRef.current || !pinRef.current) return

    registerGsap()
    const proxy = { value: 0 }

    const ctx = gsap.context(() => {
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=160%',
          scrub: 1.2,
          pin: pinRef.current,
        },
      })
        .to(proxy, {
          value: 1,
          ease: 'none',
          onUpdate: () => {
            progressRef.current = proxy.value
          },
        })
        .to(sceneRef.current, { y: 180, scale: 0.75, opacity: 0.35, rotateZ: 2 }, 0)
        .to(contentRef.current, { y: -60, opacity: 0.7 }, 0)
        .to(meshRef.current, { opacity: 0.15, scale: 1.2 }, 0)
    }, sectionRef)

    return () => ctx.revert()
  }, [reduced, mobile])

  return (
    <section ref={sectionRef} id={SECTION_IDS.hero} className="relative h-[260vh]">
      <div ref={pinRef} className="relative h-[100svh] overflow-hidden bg-navy-950">
        <GridBackground />
        <NoiseBackground />
        <div ref={meshRef} className="absolute inset-0 opacity-40">
          <ChaosMesh className="absolute w-[140%] h-[140%] -left-[20%] -top-[10%]" />
        </div>

        <div className="absolute top-1/4 right-0 w-[55vw] max-w-[720px] h-[70vh] bg-cyan-500/8 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-[40vw] h-[50vh] bg-mint-500/8 rounded-full blur-[80px]" />

        <div className="absolute inset-0 lg:grid lg:grid-cols-12 gap-0">
          <div
            ref={contentRef}
            className="relative z-20 lg:col-span-5 flex flex-col justify-center px-5 sm:px-8 lg:pl-12 pt-24 pb-12 will-change-transform"
          >
            <p className="text-[10px] sm:text-xs font-bold tracking-[0.35em] text-cyan-400 mb-4">
              01 — CHAOS
            </p>
            <p className="inline-flex w-fit items-center gap-2 text-xs font-semibold text-mint-400 mb-6 px-3 py-1.5 rounded-full border border-mint-400/30 bg-mint-400/5">
              <span className="w-1.5 h-1.5 rounded-full bg-mint-400 animate-pulse" />
              業務効率化サービス LAXIS
            </p>

            <h1 className="text-[2rem] sm:text-5xl lg:text-[3.5rem] xl:text-6xl font-extrabold text-white leading-[1.08] tracking-tight">
              不便な業務を整え、
              <br />
              <span className="text-shine">ラクに回る仕組み</span>
              <br className="hidden sm:block" />
              をつくる。
            </h1>

            <p className="mt-6 text-sm sm:text-base text-slate-300/90 max-w-md leading-relaxed">
              業務改善・システム開発・自動化・運用改善まで。
              LAXISは、現場の業務をゼロから整理し、会社に合った仕組みを構築する業務効率化サービスです。
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <GlowButton href={CTA.consult} variant="primary" size="lg" className="w-full sm:w-auto">
                無料相談する
                <ArrowRight size={18} />
              </GlowButton>
              <GlowButton href={`#${SECTION_IDS.service}`} variant="secondary" size="md" className="w-full sm:w-auto">
                サービスを見る
              </GlowButton>
            </div>

            <div className="mt-10 flex flex-wrap gap-2">
              {floatTags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] px-2.5 py-1 rounded-md border border-white/10 text-slate-400 bg-white/5 backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div
            ref={sceneRef}
            className="relative lg:col-span-7 h-[45vh] lg:h-full will-change-transform"
          >
            <Suspense fallback={<div className="absolute inset-0 animate-pulse bg-navy-800/40" />}>
              <HeroScene className="absolute inset-0" progressRef={progressRef} />
            </Suspense>
          </div>
        </div>

        <a
          href={`#${SECTION_IDS.problems}`}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1 text-slate-500 hover:text-mint-400 transition-colors"
          aria-label="スクロール"
        >
          <span className="text-[9px] tracking-[0.3em] uppercase">Scroll</span>
          <ChevronDown size={20} className="animate-bounce" />
        </a>
      </div>
    </section>
  )
}
