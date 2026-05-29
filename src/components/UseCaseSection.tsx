import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { SectionTitle } from './SectionTitle'
import { SECTION_IDS } from '../lib/constants'
import { useReducedMotion } from '../hooks/useReducedMotion'

const cases = [
  {
    tag: '営業会社・代理店',
    before: {
      title: 'Before',
      items: [
        '代理店ごとの売上計算、報酬明細PDFの手作り、担当者別成績の集計を毎月手作業で実施',
        '月末の事務負担が膨大',
      ],
    },
    after: {
      title: 'After',
      items: [
        'スプレッドシート上で売上データを入力するだけで、代理店別の報酬を自動計算',
        '明細書PDFを自動生成し、LINEやメールで自動送信',
        '営業進捗や訪問履歴がダッシュボードで見える化され、成約率の改善に直結',
      ],
    },
    result: '報酬計算ミス削減＆月次作業の劇的な短縮',
  },
  {
    tag: 'スクール・サロン・店舗・物販',
    before: {
      title: 'Before',
      items: [
        '予約の電話対応、紙の顧客カルテ、LINEでの個別リマインドでミスが発生',
        '教材配信や在庫管理もバラバラ',
      ],
    },
    after: {
      title: 'After',
      items: [
        'LINE経由での予約管理・空き枠管理を自動化',
        '来店履歴と顧客カルテを紐付け',
        '予約前日にはLINEで自動リマインド',
        '教材配信通知、解約管理、在庫数、売れ筋分析をスマホから一元管理',
      ],
    },
    result: '予約漏れ防止、リピート促進、対応漏れのゼロ化',
  },
]

export function UseCaseSection() {
  const reduced = useReducedMotion()

  return (
    <section id={SECTION_IDS.cases} className="section-padding bg-slate-50">
      <div className="container-narrow">
        <SectionTitle label="CASE STUDY" title="導入例" />

        <div className="space-y-10">
          {cases.map((c, ci) => (
            <motion.article
              key={c.tag}
              className="rounded-3xl overflow-hidden bg-white border border-slate-200/80 shadow-xl shadow-navy-900/5"
              initial={reduced ? false : { opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: ci * 0.1 }}
            >
              <div className="px-6 py-4 bg-navy-900">
                <span className="text-mint-400 text-sm font-semibold">{c.tag}</span>
              </div>
              <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200">
                <div className="p-6 sm:p-8">
                  <p className="text-xs font-bold text-red-500 uppercase tracking-wider mb-4">
                    {c.before.title}
                  </p>
                  <ul className="space-y-3">
                    {c.before.items.map((item) => (
                      <li key={item} className="text-sm text-slate-600 leading-relaxed flex gap-2">
                        <span className="text-red-300">—</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-6 sm:p-8 bg-linear-to-br from-mint-500/5 to-cyan-500/5">
                  <p className="text-xs font-bold text-cyan-600 uppercase tracking-wider mb-4">
                    {c.after.title}
                  </p>
                  <ul className="space-y-3">
                    {c.after.items.map((item) => (
                      <li key={item} className="text-sm text-slate-700 leading-relaxed flex gap-2">
                        <ArrowRight size={14} className="text-mint-500 shrink-0 mt-1" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="px-6 py-4 bg-navy-800/5 border-t border-slate-200">
                <p className="text-sm font-semibold text-navy-900">
                  成果：<span className="text-cyan-600">{c.result}</span>
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
