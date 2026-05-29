import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { SectionTitle } from './SectionTitle'
import { SECTION_IDS } from '../lib/constants'
import { cn } from '../lib/utils'

const faqs = [
  {
    q: '小規模な依頼でも可能ですか？',
    a: 'はい。スプレッドシートの改善や簡単なLINE通知など、一部業務からのご相談も大歓迎です。',
  },
  {
    q: '既存のスプレッドシートやLINEを使えますか？',
    a: '可能です。現在の運用を確認し、使えるものは活かしながら改善します。',
  },
  {
    q: 'システムに詳しくなくても依頼できますか？',
    a: '問題ありません。専門用語は使わず、現在の業務内容をお聞きしながら仕組みを整理します。',
  },
  {
    q: 'AIの導入もできますか？',
    a: '可能です。問い合わせ返信、議事録要約、マニュアル検索など、業務に合わせて導入できます。',
  },
  {
    q: '導入後の修正や改善はできますか？',
    a: '月額保守やスポット修正として、現場の変化に合わせた運用後の改善にも対応します。',
  },
  {
    q: 'どの業種に対応できますか？',
    a: 'スクール、サロン、飲食、営業会社、代理店、物販など幅広く対応可能です。',
  },
]

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id={SECTION_IDS.faq} className="section-padding bg-white">
      <div className="container-narrow max-w-3xl">
        <SectionTitle label="FAQ" title="よくあるご質問" />

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={faq.q}
              className="rounded-xl border border-slate-200 overflow-hidden bg-slate-50/50"
            >
              <button
                type="button"
                className="w-full flex items-center justify-between gap-4 p-5 text-left font-semibold text-navy-900 hover:bg-slate-100/50 transition-colors"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                <span>{faq.q}</span>
                <ChevronDown
                  size={20}
                  className={cn(
                    'shrink-0 text-cyan-600 transition-transform',
                    open === i && 'rotate-180',
                  )}
                />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <p className="px-5 pb-5 text-slate-600 text-sm leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
