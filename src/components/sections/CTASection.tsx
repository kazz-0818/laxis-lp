import { useEffect, useRef } from 'react'
import { ArrowRight, FileText } from 'lucide-react'
import { gsap, registerGsap } from '../../lib/gsap'
import { GlowButton } from '../ui/GlowButton'
import { GridBackground } from '../ui/GridBackground'
import { NoiseBackground } from '../ui/NoiseBackground'
import { CTA, SECTION_IDS } from '../../lib/constants'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export function CTASection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const linesRef = useRef<SVGSVGElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced || !sectionRef.current) return
    registerGsap()
    const ctx = gsap.context(() => {
      if (glowRef.current) {
        gsap.fromTo(
          glowRef.current,
          { scale: 0.5, opacity: 0.2 },
          {
            scale: 1.3,
            opacity: 1,
            scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', end: 'center center', scrub: 1 },
          },
        )
      }
      if (linesRef.current) {
        const paths = linesRef.current.querySelectorAll('line')
        gsap.fromTo(
          paths,
          { scaleX: 0, opacity: 0 },
          {
            scaleX: 1,
            opacity: 0.6,
            stagger: 0.08,
            scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
          },
        )
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section
      id={SECTION_IDS.contact}
      className="relative min-h-[85vh] flex items-center overflow-hidden bg-navy-950 text-white"
    >
      <GridBackground />
      <NoiseBackground />
      <div ref={glowRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(100vw,800px)] h-[450px] bg-linear-to-r from-mint-500/15 via-cyan-500/25 to-mint-500/15 rounded-full blur-[90px] pointer-events-none" />

      <svg ref={linesRef} className="absolute inset-0 w-full h-full opacity-40 pointer-events-none" aria-hidden>
        {[20, 35, 50, 65, 80].map((y) => (
          <line key={y} x1="10%" y1={`${y}%`} x2="90%" y2={`${y}%`} stroke="#2dd4bf" strokeWidth="1" style={{ transformOrigin: 'center' }} />
        ))}
      </svg>

      <div ref={sectionRef} className="relative z-10 section-pad w-full text-center">
        <p className="text-[10px] font-bold tracking-[0.35em] text-mint-400 mb-4">08 — ACTION</p>
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold leading-tight max-w-3xl mx-auto">
          まずは今の業務の
          <br />
          <span className="text-shine">お悩みをお聞かせください。</span>
        </h2>
        <p className="mt-6 text-slate-300 max-w-xl mx-auto leading-relaxed text-sm sm:text-base">
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
          <a href={CTA.mailto} className="text-mint-400 hover:underline">メール</a>
          でも受付（LINE・フォームは今後追加）
        </p>
      </div>
    </section>
  )
}
