import { Check } from 'lucide-react'
import { SectionTitle } from '../ui/SectionTitle'
import { SECTION_IDS } from '../../lib/constants'

const points = [
  'Excel・LINE・紙・電話で業務を回している',
  'ITに詳しい担当者が社内にいない',
  '大規模開発は不要だが、限界を感じている',
  '一部の面倒な業務からスモールスタートしたい',
]

const industries = [
  '中小企業', '店舗', 'スクール', 'サロン', '営業会社', '代理店', '物販', '飲食', '美容', '教育',
]

export function TargetSection() {
  return (
    <section id={SECTION_IDS.target} className="section-pad bg-slate-50">
      <div className="container-narrow">
        <SectionTitle
          label="For You"
          title="社内にDX担当がいなくても大丈夫です。"
        />
        <ul className="space-y-4 max-w-2xl mx-auto mb-12">
          {points.map((p) => (
            <li key={p} className="flex gap-3 text-slate-700">
              <Check className="text-cyan-600 shrink-0 mt-1" size={18} />
              {p}
            </li>
          ))}
        </ul>
        <div className="text-center">
          <p className="text-sm font-semibold text-slate-500 mb-4">対象業種</p>
          <div className="flex flex-wrap justify-center gap-2">
            {industries.map((ind) => (
              <span key={ind} className="px-4 py-2 rounded-lg bg-navy-900 text-white text-sm font-medium">
                {ind}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
