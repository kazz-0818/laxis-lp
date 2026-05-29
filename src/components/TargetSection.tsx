import { Check } from 'lucide-react'
import { SectionTitle } from './SectionTitle'
import { SECTION_IDS } from '../lib/constants'

const points = [
  'Excel、LINE、紙、電話でなんとか業務を回している',
  'エンジニアやITに詳しい担当者が社内にいない',
  '大規模なシステム開発は不要だが、現状には限界を感じている',
  'まずは一部の面倒な業務からスモールスタートで効率化したい',
]

const industries = [
  '中小企業',
  '店舗',
  'スクール',
  'サロン',
  '営業会社',
  '代理店',
  '物販',
  '飲食',
  '美容',
  '教育',
]

export function TargetSection() {
  return (
    <section
      id={SECTION_IDS.target}
      className="section-padding bg-linear-to-b from-slate-50 to-white"
    >
      <div className="container-narrow">
        <SectionTitle
          label="FOR YOU"
          title="社内にDX担当がいなくても大丈夫です。"
        />

        <ul className="space-y-4 mb-12 max-w-2xl mx-auto">
          {points.map((point) => (
            <li key={point} className="flex gap-3 items-start">
              <span className="shrink-0 w-6 h-6 rounded-full bg-mint-500/20 flex items-center justify-center mt-0.5">
                <Check size={14} className="text-cyan-600" />
              </span>
              <span className="text-slate-700 leading-relaxed">{point}</span>
            </li>
          ))}
        </ul>

        <div className="text-center">
          <p className="text-sm font-semibold text-slate-500 mb-4">対象業種</p>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {industries.map((ind) => (
              <span
                key={ind}
                className="px-4 py-2 rounded-lg bg-navy-900 text-white text-sm font-medium"
              >
                {ind}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
