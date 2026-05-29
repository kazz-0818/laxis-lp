import { useEffect, useRef } from 'react'
import { ArrowRight, FileText } from 'lucide-react'
import { gsap, registerGsap } from '../../lib/gsap'
import { GlowButton } from '../ui/GlowButton'
import { AtmosphereBackground } from '../scenes/AtmosphereBackground'
import { RebuildLinesVisual } from '../visuals/RebuildLinesVisual'
import { CTA } from '../../lib/constants'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export function CTASection() {
  const ref = useRef<HTMLElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const linesRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced || !ref.current) return
    registerGsap()
    const ctx = gsap.context(() => {
      gsap.fromTo(
        glowRef.current,
        { scale: 0.5, opacity: 0 },
        { scale: 1, opacity: 1, scrollTrigger: { trigger: ref.current, start: 'top 80%', scrub: 1 } },
      )
      gsap.fromTo(
        linesRef.current,
        { opacity: 0, y: 40 },
        { opacity: 0.4, y: 0, scrollTrigger: { trigger: ref.current, start: 'top 70%', scrub: 1 } },
      )
    }, ref)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section
      ref={ref}
      id="start"
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden scene-dark"
    >
      <AtmosphereBackground variant="dark" />
      <div ref={glowRef} className="absolute inset-0 glow-orb opacity-30 pointer-events-none" />
      <div className="absolute inset-0 vignette pointer-events-none z-[1]" />

      <div ref={linesRef} className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
        <div className="w-full max-w-2xl scale-125 invert opacity-50">
          <RebuildLinesVisual progress={1} />
        </div>
      </div>

      <div className="absolute top-6 left-5 sm:left-10 z-30 flex items-center gap-3">
        <span className="text-[11px] tracking-[0.35em] text-cyan-400/80">08</span>
        <span className="h-px w-8 bg-white/20" />
        <span className="text-[11px] tracking-[0.35em] uppercase text-white/40">START</span>
      </div>
      <div className="absolute top-6 right-5 sm:right-10 z-30">
        <span className="pill-tag-invert">LAXIS · 08</span>
      </div>

      <div className="relative z-10 section-pad text-center max-w-2xl mx-auto py-24">
        <h2 className="text-editorial-invert text-3xl sm:text-5xl lg:text-6xl leading-[1.1]">
          まずは、
          <br />
          お悩みをお聞かせください。
        </h2>
        <p className="mt-8 text-sm text-white/50 font-light leading-relaxed max-w-md mx-auto">
          「何から手をつければいいかわからない」—— その状態からで構いません。
        </p>
        <div className="mt-12 flex flex-col sm:flex-row gap-3 justify-center">
          <GlowButton href={CTA.consult} variant="primary" size="lg" className="!bg-white !text-navy-900">
            無料相談する
            <ArrowRight size={18} />
          </GlowButton>
          <GlowButton href={CTA.materials} variant="ghost" size="lg">
            <FileText size={18} />
            資料を見たい
          </GlowButton>
        </div>
      </div>
    </section>
  )
}
