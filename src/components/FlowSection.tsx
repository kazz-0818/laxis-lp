import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { SectionTitle } from './SectionTitle'
import { SECTION_IDS } from '../lib/constants'
import { useReducedMotion } from '../hooks/useReducedMotion'

const steps = [
  { num: '01', title: 'お問い合わせ・無料相談', desc: '現在の悩みや実現したいことを簡単に確認。' },
  { num: '02', title: 'ヒアリング', desc: '業務フロー、使用ツール、作業時間などを詳しく整理。' },
  { num: '03', title: '業務整理・改善案作成', desc: 'ムダを洗い出し、最適な仕組みをご提案。' },
  { num: '04', title: '設計・お見積り', desc: '必要な機能、スケジュール、費用をご提示。' },
  { num: '05', title: '構築・テスト', desc: 'システムを構築し、実データに近い形でテスト。' },
  { num: '06', title: '運用開始・改善', desc: '現場で使いながら調整し、継続的にブラッシュアップ。' },
]

export function FlowSection() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end center'],
  })
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section ref={ref} id={SECTION_IDS.flow} className="section-padding bg-white">
      <div className="container-narrow">
        <SectionTitle
          label="FLOW"
          title="ヒアリングから運用改善まで、丸投げできる安心感。"
        />

        <div className="hidden lg:block relative">
          <div className="absolute top-8 left-0 right-0 h-1 bg-slate-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-linear-to-r from-mint-500 to-cyan-500"
              style={{ width: reduced ? '100%' : progressWidth }}
            />
          </div>
          <div className="grid grid-cols-6 gap-4 relative">
            {steps.map((step, i) => (
              <FlowStep key={step.num} step={step} index={i} reduced={reduced} horizontal />
            ))}
          </div>
        </div>

        <div className="lg:hidden relative pl-8 border-l-2 border-slate-200 space-y-8">
          {steps.map((step, i) => (
            <FlowStep key={step.num} step={step} index={i} reduced={reduced} />
          ))}
        </div>
      </div>
    </section>
  )
}

function FlowStep({
  step,
  index,
  reduced,
  horizontal = false,
}: {
  step: (typeof steps)[0]
  index: number
  reduced: boolean
  horizontal?: boolean
}) {
  return (
    <motion.div
      className={horizontal ? 'text-center' : 'relative'}
      initial={reduced ? false : { opacity: 0.4 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.08 }}
    >
      {!horizontal && (
        <span className="absolute -left-[2.55rem] top-0 w-4 h-4 rounded-full bg-mint-500 border-4 border-white shadow" />
      )}
      {horizontal && (
        <div className="w-4 h-4 rounded-full bg-mint-500 mx-auto mb-4 ring-4 ring-white shadow-lg relative z-10" />
      )}
      <p className="text-xs font-bold text-cyan-600 mb-1">STEP {step.num}</p>
      <h3 className="font-bold text-navy-900 text-sm mb-2">{step.title}</h3>
      <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
    </motion.div>
  )
}
