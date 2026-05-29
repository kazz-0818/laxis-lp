import { useState } from 'react'
import { CinematicScene } from '../ui/CinematicScene'
import { AtmosphereBackground } from '../scenes/AtmosphereBackground'
import { SECTION_IDS } from '../../lib/constants'

const cases = [
  {
    id: 'sales',
    tag: '営業会社・代理店',
    before: '代理店別売上・報酬PDF・成績集計を毎月手作業。月末の事務負担が膨大。',
    after: '入力だけで報酬自動計算。PDF自動送信。ダッシュボードで成約率改善。',
    result: '報酬ミス削減＆月次作業の劇的短縮',
  },
  {
    id: 'store',
    tag: 'スクール・サロン・店舗',
    before: '電話予約・紙カルテ・LINE個別リマインド。教材・在庫もバラバラ。',
    after: 'LINE予約自動化。カルテ連携。在庫・売れ筋をスマホ一元管理。',
    result: '予約漏れ防止・リピート促進・対応漏れゼロ',
  },
]

export function UseCaseSection() {
  const [idx, setIdx] = useState(0)
  const c = cases[idx]!

  return (
    <CinematicScene
      id={SECTION_IDS.cases}
      theme="light"
      tag="CASE"
      background={<AtmosphereBackground variant="sky" />}
      align="center"
    >
      <div className="flex justify-center gap-3 mb-12">
        {cases.map((item, i) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setIdx(i)}
            className={`text-[11px] tracking-widest uppercase px-4 py-2 rounded-full border transition-all ${
              idx === i
                ? 'border-cyan-500/50 text-cyan-700 bg-cyan-50'
                : 'border-slate-200 text-navy-800/45 hover:border-slate-300'
            }`}
          >
            {item.tag}
          </button>
        ))}
      </div>

      <div className="max-w-xl mx-auto w-full">
        <div className="grid sm:grid-cols-2 gap-4 rounded-xl overflow-hidden">
          <div className="glass-panel bg-red-50/50 border-red-100">
            <p className="text-[10px] tracking-[0.4em] text-red-500/80 mb-4">BEFORE</p>
            <p className="text-sm text-navy-800/65 leading-relaxed font-light">{c.before}</p>
          </div>
          <div className="glass-panel bg-cyan-50/40 border-cyan-100">
            <p className="text-[10px] tracking-[0.4em] text-cyan-600 mb-4">AFTER</p>
            <p className="text-sm text-navy-800/75 leading-relaxed font-light">{c.after}</p>
          </div>
        </div>
        <p className="text-center mt-8 text-editorial text-lg">{c.result}</p>
      </div>
    </CinematicScene>
  )
}
