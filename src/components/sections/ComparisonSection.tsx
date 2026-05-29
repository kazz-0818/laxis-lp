import { SectionTitle } from '../ui/SectionTitle'
import { SECTION_IDS } from '../../lib/constants'
import { cn } from '../../lib/utils'

const rows = [
  { label: '業務整理', laxis: 'ヒアリングから整理', ent: '要件定義が重い', free: '人による', in: '負担大' },
  { label: '費用感', laxis: '小さく始めやすい', ent: '高額', free: '品質差あり', in: '人件費' },
  { label: 'スピード', laxis: '短期導入', ent: '時間がかかる', free: '人による', in: '後回し' },
  { label: '現場対応', laxis: '既存運用に合わせる', ent: '大規模寄り', free: '得意領域に偏る', in: 'ノウハウ不足' },
  { label: '改善運用', laxis: '導入後も改善', ent: '保守費高', free: '継続性不安', in: '担当者依存' },
]

const cols = [
  { key: 'laxis', label: 'LAXIS', hi: true },
  { key: 'ent', label: '大手開発', hi: false },
  { key: 'free', label: 'フリーランス', hi: false },
  { key: 'in', label: '自社対応', hi: false },
] as const

export function ComparisonSection() {
  return (
    <section id={SECTION_IDS.comparison} className="section-pad bg-slate-50">
      <div className="container-wide">
        <SectionTitle title="LAXISと他社・自社対応の違い" />
        <div className="hidden lg:block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-navy-900 text-white">
                <th className="p-4 w-32" />
                {cols.map((c) => (
                  <th key={c.key} className={cn('p-4 font-bold', c.hi && 'bg-cyan-600/25 text-mint-400')}>
                    {c.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={r.label} className={i % 2 ? 'bg-slate-50/80' : ''}>
                  <td className="p-4 font-bold text-navy-900">{r.label}</td>
                  <td className="p-4 text-center font-medium bg-mint-500/5">{r.laxis}</td>
                  <td className="p-4 text-center text-slate-600">{r.ent}</td>
                  <td className="p-4 text-center text-slate-600">{r.free}</td>
                  <td className="p-4 text-center text-slate-600">{r.in}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="lg:hidden space-y-4">
          {cols.map((col) => (
            <div
              key={col.key}
              className={cn(
                'rounded-2xl p-5 border',
                col.hi ? 'border-mint-400/40 bg-mint-500/10' : 'border-slate-200 bg-white',
              )}
            >
              <h3 className="font-bold text-lg mb-4">{col.label}</h3>
              <dl className="space-y-3">
                {rows.map((r) => (
                  <div key={r.label}>
                    <dt className="text-xs text-slate-500">{r.label}</dt>
                    <dd className="text-sm font-medium text-navy-900">
                      {col.key === 'laxis' ? r.laxis : col.key === 'ent' ? r.ent : col.key === 'free' ? r.free : r.in}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
