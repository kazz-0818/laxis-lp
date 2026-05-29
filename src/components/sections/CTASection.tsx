import { useEffect, useRef } from 'react'
import { ArrowRight, FileText } from 'lucide-react'
import { gsap, registerGsap } from '../../lib/gsap'
import { GlowButton } from '../ui/GlowButton'
import { AtmosphereBackground } from '../scenes/AtmosphereBackground'
import { CTA, SECTION_IDS } from '../../lib/constants'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export function CTASection() {
  const ref = useRef<HTMLElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced || !ref.current) return
    registerGsap()
    const ctx = gsap.context(() => {
      gsap.fromTo(
        glowRef.current,
        { scale: 0.6, opacity: 0.2 },
        {
          scale: 1.2,
          opacity: 1,
          scrollTrigger: { trigger: ref.current, start: 'top 80%', scrub: 1 },
        },
      )
    }, ref)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section
      ref={ref}
      id={SECTION_IDS.contact}
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden scene-dark"
    >
      <AtmosphereBackground variant="dark" />
      <div
        ref={glowRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(100vw,700px)] aspect-square rounded-full bg-cyan-500/10 blur-[100px] pointer-events-none"
      />
      <div className="absolute inset-0 vignette pointer-events-none z-[1]" />
      <div className="absolute top-6 right-5 sm:right-10 z-30">
        <span className="pill-tag-invert">ACTION · 08</span>
      </div>

      <div className="relative z-10 section-pad text-center max-w-2xl mx-auto">
        <h2 className="text-editorial-invert text-3xl sm:text-5xl lg:text-6xl leading-[1.12]">
          まずは、
          <br />
          今の業務のお悩みを
          <br />
          お聞かせください。
        </h2>
        <p className="mt-8 text-sm sm:text-base text-slate-300/80 leading-relaxed font-light">
          「何から手をつければいいかわからない」—— そんな状態からで構いません。
          LAXISが、業務をゼロから整えます。
        </p>
        <div className="mt-12 flex flex-col sm:flex-row gap-3 justify-center">
          <GlowButton href={CTA.consult} variant="primary" size="lg" className="!bg-white !text-navy-900 hover:!bg-slate-50">
            無料相談する
            <ArrowRight size={18} />
          </GlowButton>
          <GlowButton href={CTA.materials} variant="ghost" size="lg">
            <FileText size={18} />
            資料を見たい
          </GlowButton>
        </div>
        <p className="mt-10 text-xs text-slate-400">
          <a href={CTA.mailto} className="hover:text-mint-400 underline underline-offset-4">
            メール
          </a>
          でも受付
        </p>
      </div>
    </section>
  )
}
