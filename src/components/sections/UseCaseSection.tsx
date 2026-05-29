import { useEffect, useRef, useState } from 'react'
import { gsap, registerGsap } from '../../lib/gsap'
import { ChapterShell } from '../ui/ChapterShell'
import { SECTION_IDS } from '../../lib/constants'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const cases = [
  {
    tag: '営業会社・代理店',
    before: ['代理店別売上・報酬PDF・成績集計を手作業', '月末の事務負担が膨大'],
    after: ['入力だけで報酬自動計算', 'PDF自動生成・LINE送信', 'ダッシュボードで成約率改善'],
    result: '報酬ミス削減＆月次作業の劇的短縮',
  },
  {
    tag: 'スクール・サロン・店舗',
    before: ['電話予約・紙カルテ・LINE個別リマインド', '教材・在庫もバラバラ'],
    after: ['LINE予約・空き枠自動化', 'カルテと来店履歴を連携', '在庫・売れ筋をスマホ一元管理'],
    result: '予約漏れ防止・リピート促進・対応漏れゼロ',
  },
]

export function UseCaseSection() {
  const [activeCase, setActiveCase] = useState(0)
  const slideRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced || !slideRef.current) return
    registerGsap()
    const ctx = gsap.context(() => {
      gsap.fromTo(
        slideRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: { trigger: slideRef.current, start: 'top 80%' },
        },
      )
    })
    return () => ctx.revert()
  }, [reduced, activeCase])

  const c = cases[activeCase]!

  return (
    <ChapterShell id={SECTION_IDS.cases} chapter="Result" chapterNum="07" theme="light" minHeight="min-h-screen">
      <div className="section-pad relative z-10 pt-16">
        <div className="container-narrow">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-navy-900 text-center">導入例</h2>

          <div className="flex justify-center gap-2 mt-8">
            {cases.map((item, i) => (
              <button
                key={item.tag}
                type="button"
                onClick={() => setActiveCase(i)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCase === i
                    ? 'bg-navy-900 text-white'
                    : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                }`}
              >
                {item.tag}
              </button>
            ))}
          </div>

          <div ref={slideRef} className="mt-10 rounded-3xl overflow-hidden border border-slate-200 shadow-2xl bg-white">
            <div className="grid md:grid-cols-2 min-h-[280px]">
              <div className="p-8 bg-linear-to-br from-red-50 to-slate-100 relative overflow-hidden">
                <p className="text-xs font-bold text-red-500 tracking-widest mb-4">BEFORE — 混乱</p>
                <ul className="space-y-3 relative z-10">
                  {c.before.map((b) => (
                    <li key={b} className="text-sm text-slate-700 flex gap-2">
                      <span className="text-red-300">×</span>
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="absolute inset-0 opacity-20 bg-[repeating-linear-gradient(45deg,#000_0,#000_1px,transparent_0,transparent_12px)]" />
              </div>
              <div className="p-8 bg-linear-to-br from-mint-500/10 to-cyan-500/10 relative">
                <p className="text-xs font-bold text-cyan-600 tracking-widest mb-4">AFTER — 整理</p>
                <ul className="space-y-3">
                  {c.after.map((a) => (
                    <li key={a} className="text-sm text-navy-800 flex gap-2 font-medium">
                      <span className="text-mint-500">✓</span>
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="px-8 py-4 bg-navy-900 text-center">
              <p className="text-sm text-slate-300">
                成果：<span className="text-mint-400 font-bold">{c.result}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </ChapterShell>
  )
}
