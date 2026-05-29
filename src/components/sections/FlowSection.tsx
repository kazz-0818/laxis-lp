import { useEffect, useRef } from 'react'
import { gsap, registerGsap } from '../../lib/gsap'
import { SectionTitle } from '../ui/SectionTitle'
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
    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        { opacity: 0.3, x: -20 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.12,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', end: 'center 40%', scrub: 1 },
        },
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section ref={sectionRef} id={SECTION_IDS.flow} className="section-pad bg-white">
      <div className="container-narrow">
        <SectionTitle
          label="Flow"
          title="ヒアリングから運用改善まで、丸投げできる安心感。"
        />
        <div className="space-y-0 border-l-2 border-cyan-400/40 ml-3 pl-8">
          {steps.map((s) => (
            <div key={s.n} data-flow className="relative pb-10 last:pb-0">
              <span className="absolute -left-[2.65rem] top-0 w-4 h-4 rounded-full bg-mint-500 border-4 border-white shadow shadow-cyan-500/50" />
              <p className="text-xs font-bold text-cyan-600">STEP {s.n}</p>
              <h3 className="text-lg font-bold text-navy-900 mt-1">{s.t}</h3>
              <p className="text-sm text-slate-600 mt-1">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
