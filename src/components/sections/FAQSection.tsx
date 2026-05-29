import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { SectionTitle } from '../ui/SectionTitle'
import { SECTION_IDS } from '../../lib/constants'
import { cn } from '../../lib/utils'

const faqs = [
  { q: '小規模な依頼でも可能ですか？', a: 'はい。スプレッドシート改善やLINE通知など、一部業務から大歓迎です。' },
  { q: '既存のスプレッドシートやLINEは使えますか？', a: '可能です。使えるものは活かしながら改善します。' },
  { q: 'システムに詳しくなくても依頼できますか？', a: '問題ありません。専門用語を使わず、業務をお聞きしながら整理します。' },
  { q: 'AIの導入もできますか？', a: '問い合わせ返信・議事録・マニュアル検索など、業務に合わせて導入できます。' },
  { q: '導入後の修正や改善は？', a: '月額保守やスポット修正で、現場の変化に合わせた改善に対応します。' },
  { q: 'どの業種に対応できますか？', a: 'スクール、サロン、飲食、営業会社、代理店、物販など幅広く対応可能です。' },
]

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id={SECTION_IDS.faq} className="section-pad bg-slate-50">
      <div className="container-narrow max-w-3xl">
        <SectionTitle label="FAQ" title="よくあるご質問" />
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={faq.q} className="rounded-xl border border-slate-200 bg-white overflow-hidden">
              <button
                type="button"
                className="w-full flex justify-between gap-4 p-5 text-left font-semibold text-navy-900"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                {faq.q}
                <ChevronDown className={cn('shrink-0 text-cyan-600 transition-transform', open === i && 'rotate-180')} />
              </button>
              {open === i && (
                <p className="px-5 pb-5 text-sm text-slate-600 leading-relaxed">{faq.a}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
