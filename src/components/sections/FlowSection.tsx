import { useEffect, useRef } from 'react'
import { gsap, registerGsap } from '../../lib/gsap'
import { AtmosphereBackground } from '../scenes/AtmosphereBackground'
import { SECTION_IDS } from '../../lib/constants'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const steps = [
  { n: '01', t: 'お問い合わせ・無料相談', d: '悩みや実現したいことを確認。' },
  { n: '02', t: 'ヒアリング', d: '業務フロー・ツール・作業時間を整理。' },
  { n: '03', t: '業務整理・改善案', d: 'ムダを洗い出し、最適な仕組みを提案。' },
  { n: '04', t: '設計・お見積り', d: '機能・スケジュール・費用を提示。' },
  { n: '05', t: '構築・テスト', d: '実データに近い形でテスト。' },
  { n: '06', t: '運用開始・改善', d: '現場で使いながら継続ブラッシュアップ。' },
]

export function FlowSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced || !sectionRef.current) return
    registerGsap()
    const items = sectionRef.current.querySelectorAll('[data-flow]')
    if (!items.length) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        { opacity: 0.2, y: 24 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', end: 'center 30%', scrub: 1 },
        },
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section ref={sectionRef} id={SECTION_IDS.flow} className="relative min-h-[100svh] scene-white overflow-hidden">
      <AtmosphereBackground variant="mist" />
      <div className="absolute inset-0 vignette-light pointer-events-none z-[1]" />
      <div className="absolute top-6 right-5 sm:right-10 z-30">
        <span className="pill-tag">FLOW</span>
      </div>

      <div className="relative z-10 section-pad min-h-[100svh] flex flex-col justify-center py-24">
        <div className="container-editorial">
          <h2 className="text-editorial text-3xl sm:text-4xl text-center mb-4">
            ヒアリングから運用改善まで、
            <br className="hidden sm:block" />
            丸投げできる安心感。
          </h2>
          <p className="text-center text-sm text-navy-800/50 font-light mb-16 max-w-md mx-auto">
            6つのステップで、現場に寄り添いながら進めます。
          </p>

          <div className="max-w-lg mx-auto space-y-0">
            {steps.map((s, i) => (
              <div key={s.n} data-flow className="relative flex gap-8 pb-12 last:pb-0">
                {i < steps.length - 1 && (
                  <span className="absolute left-[15px] top-8 bottom-0 w-px bg-cyan-200" aria-hidden />
                )}
                <span className="shrink-0 w-8 h-8 rounded-full border border-cyan-300/60 bg-white flex items-center justify-center text-[10px] tracking-widest text-cyan-700 shadow-sm">
                  {s.n}
                </span>
                <div>
                  <h3 className="text-editorial text-lg sm:text-xl">{s.t}</h3>
                  <p className="text-sm text-navy-800/55 font-light mt-2 leading-relaxed">{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
