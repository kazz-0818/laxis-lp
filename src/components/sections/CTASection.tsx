import { useEffect, useRef } from 'react'
import { ArrowRight, FileText } from 'lucide-react'
import { gsap, registerGsap } from '../../lib/gsap'
import { GlowButton } from '../ui/GlowButton'
import { CTA, SECTION_IDS } from '../../lib/constants'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export function CTASection() {
  const sectionRef = useRef<HTMLElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced || !sectionRef.current || !glowRef.current) return

    registerGsap()
    const ctx = gsap.context(() => {
      gsap.fromTo(
        glowRef.current,
        { scale: 0.6, opacity: 0.3 },
        {
          scale: 1.2,
          opacity: 0.9,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'center center',
            scrub: 1,
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [reduced])

  return (
    <section
      ref={sectionRef}
      id={SECTION_IDS.contact}
      className="section-pad relative overflow-hidden bg-navy-950 text-white min-h-[70vh] flex items-center"
    >
      <div className="absolute inset-0 grid-floor opacity-50" />
      <div
        ref={glowRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(100vw,700px)] h-[400px] bg-linear-to-r from-mint-500/20 via-cyan-500/25 to-mint-500/20 rounded-full blur-[80px] pointer-events-none"
      />

      <div className="container-narrow relative z-10 text-center">
        <p className="text-xs font-bold tracking-[0.3em] text-mint-400 uppercase mb-4">Growth</p>
        <h2 className="text-2xl sm:text-4xl font-extrabold leading-tight max-w-2xl mx-auto">
          まずは今の業務のお悩みをお聞かせください。
        </h2>
        <p className="mt-6 text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
          「何から手をつければいいかわからない」
          <br />
          「今のやり方に限界を感じている」
          <br />
          そんな状態からで構いません。LAXISが、業務をゼロから整えます。
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <GlowButton href={CTA.consult} variant="primary" size="lg" className="w-full sm:w-auto">
            無料相談する
            <ArrowRight size={18} />
          </GlowButton>
          <GlowButton href={CTA.materials} variant="secondary" size="lg" className="w-full sm:w-auto">
            <FileText size={18} />
            資料を見たい
          </GlowButton>
        </div>

        <p className="mt-8 text-xs text-slate-500">
          <a href={CTA.mailto} className="text-mint-400 hover:underline">
            メール
          </a>
          でも受付（LINE・フォームは今後追加予定）
        </p>
      </div>
    </section>
  )
}
