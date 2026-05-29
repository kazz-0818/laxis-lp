import { ArrowRight } from 'lucide-react'
import { SectionTitle } from '../ui/SectionTitle'
import { SECTION_IDS } from '../../lib/constants'

const cases = [
  {
    tag: '営業会社・代理店',
    before: ['代理店別売上・報酬PDF・成績集計を毎月手作業', '月末の事務負担が膨大'],
    after: [
      'スプレッドシート入力だけで報酬を自動計算',
      '明細PDFを自動生成しLINE/メール送信',
      '営業進捗をダッシュボードで見える化',
    ],
    result: '報酬ミス削減＆月次作業の劇的短縮',
  },
  {
    tag: 'スクール・サロン・店舗',
    before: ['電話予約・紙カルテ・LINE個別リマインドでミス', '教材・在庫管理もバラバラ'],
    after: [
      'LINE予約・空き枠管理を自動化',
      '来店履歴とカルテを紐付け',
      '前日リマインド・在庫・売れ筋をスマホ一元管理',
    ],
    result: '予約漏れ防止・リピート促進・対応漏れゼロ',
  },
]

export function UseCaseSection() {
  return (
    <section id={SECTION_IDS.cases} className="section-pad bg-white">
      <div className="container-narrow">
        <SectionTitle label="Case" title="導入例" />
        <div className="space-y-8">
          {cases.map((c) => (
            <article key={c.tag} className="rounded-3xl overflow-hidden border border-slate-200 shadow-xl">
              <div className="px-6 py-4 bg-navy-900">
                <span className="text-mint-400 text-sm font-bold">{c.tag}</span>
              </div>
              <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200">
                <div className="p-6 sm:p-8">
                  <p className="text-xs font-bold text-red-500 mb-3">BEFORE</p>
                  <ul className="space-y-2 text-sm text-slate-600">
                    {c.before.map((b) => (
                      <li key={b}>— {b}</li>
                    ))}
                  </ul>
                </div>
                <div className="p-6 sm:p-8 bg-linear-to-br from-mint-500/5 to-cyan-500/5">
                  <p className="text-xs font-bold text-cyan-600 mb-3">AFTER</p>
                  <ul className="space-y-2 text-sm text-slate-700">
                    {c.after.map((a) => (
                      <li key={a} className="flex gap-2">
                        <ArrowRight size={14} className="text-mint-500 shrink-0 mt-1" />
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="px-6 py-3 bg-slate-50 border-t text-sm font-semibold text-navy-900">
                成果：<span className="text-cyan-600">{c.result}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
