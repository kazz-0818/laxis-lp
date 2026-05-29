import { SectionTitle } from './SectionTitle'
import { SECTION_IDS } from '../lib/constants'
import { cn } from '../lib/utils'

interface Row {
  label: string
  laxis: string
  enterprise: string
  freelance: string
  inhouse: string
}

const rows: Row[] = [
  {
    label: '業務整理',
    laxis: 'ヒアリングから整理まで',
    enterprise: '要件定義が重い',
    freelance: '人による',
    inhouse: '負担大',
  },
  {
    label: '費用感',
    laxis: '小さく始めやすい',
    enterprise: '高額',
    freelance: '安いが品質差',
    inhouse: '人件費発生',
  },
  {
    label: 'スピード',
    laxis: '短期導入',
    enterprise: '時間がかかる',
    freelance: '人による',
    inhouse: '後回しに',
  },
  {
    label: '現場対応',
    laxis: '既存運用に合わせる',
    enterprise: '大規模寄り',
    freelance: '得意領域に偏る',
    inhouse: 'ノウハウ不足',
  },
  {
    label: '改善運用',
    laxis: '導入後も改善',
    enterprise: '保守費高',
    freelance: '継続性不安',
    inhouse: '担当者依存',
  },
]

const columns = [
  { key: 'laxis', label: 'LAXIS', highlight: true },
  { key: 'enterprise', label: '大手開発会社', highlight: false },
  { key: 'freelance', label: 'フリーランス', highlight: false },
  { key: 'inhouse', label: '自社対応', highlight: false },
] as const

export function ComparisonSection() {
  return (
    <section id={SECTION_IDS.comparison} className="section-padding bg-slate-50">
      <div className="container-wide">
        <SectionTitle title="LAXISと他社・自社対応の違い" />

        <div className="hidden lg:block overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-lg">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-navy-900 text-white">
                <th className="p-4 text-left font-medium w-36" />
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className={cn(
                      'p-4 text-center font-semibold',
                      col.highlight && 'bg-cyan-600/30 text-mint-400',
                    )}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={row.label} className={i % 2 === 0 ? 'bg-slate-50/50' : ''}>
                  <td className="p-4 font-semibold text-navy-900 border-r border-slate-100">
                    {row.label}
                  </td>
                  <td className="p-4 text-center text-navy-800 font-medium bg-mint-500/5 border-x border-mint-500/10">
                    {row.laxis}
                  </td>
                  <td className="p-4 text-center text-slate-600">{row.enterprise}</td>
                  <td className="p-4 text-center text-slate-600">{row.freelance}</td>
                  <td className="p-4 text-center text-slate-600">{row.inhouse}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="lg:hidden space-y-4">
          {columns.map((col) => {
            const key = col.key
            return (
              <div
                key={key}
                className={cn(
                  'rounded-2xl border p-5',
                  col.highlight
                    ? 'border-mint-500/40 bg-linear-to-br from-mint-500/10 to-cyan-500/5 shadow-lg'
                    : 'border-slate-200 bg-white',
                )}
              >
                <h3
                  className={cn(
                    'font-bold text-lg mb-4',
                    col.highlight ? 'text-navy-900' : 'text-slate-700',
                  )}
                >
                  {col.label}
                </h3>
                <dl className="space-y-3">
                  {rows.map((row) => {
                    const value =
                      key === 'laxis'
                        ? row.laxis
                        : key === 'enterprise'
                          ? row.enterprise
                          : key === 'freelance'
                            ? row.freelance
                            : row.inhouse
                    return (
                      <div key={row.label}>
                        <dt className="text-xs text-slate-500 mb-0.5">{row.label}</dt>
                        <dd className="text-sm text-navy-800 font-medium">{value}</dd>
                      </div>
                    )
                  })}
                </dl>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
