import { CinematicScene } from '../ui/CinematicScene'
import { AtmosphereBackground } from '../scenes/AtmosphereBackground'
import { SECTION_IDS } from '../../lib/constants'

const rows = [
  { label: '業務整理', laxis: 'ヒアリングから整理', ent: '要件定義が重い', free: '人による', in: '負担大' },
  { label: '費用感', laxis: '小さく始めやすい', ent: '高額', free: '品質差あり', in: '人件費' },
  { label: 'スピード', laxis: '短期導入', ent: '時間がかかる', free: '人による', in: '後回し' },
  { label: '現場対応', laxis: '既存運用に合わせる', ent: '大規模寄り', free: '得意領域に偏る', in: 'ノウハウ不足' },
  { label: '改善運用', laxis: '導入後も改善', ent: '保守費高', free: '継続性不安', in: '担当者依存' },
]

export function ComparisonSection() {
  return (
    <CinematicScene
      id={SECTION_IDS.comparison}
      theme="white"
      tag="COMPARE"
      minHeight="min-h-[100svh]"
      background={<AtmosphereBackground variant="mist" />}
      align="top"
    >
      <h2 className="text-editorial text-3xl sm:text-4xl text-center mb-4 mt-8">
        LAXISと他社・自社対応の違い
      </h2>
      <p className="text-center text-sm text-navy-800/55 font-light mb-12 max-w-md mx-auto">
        大規模開発でもフリーランスでもない、現場寄りの第三の選択肢。
      </p>

      <div className="hidden lg:block overflow-hidden rounded-xl border border-slate-200/90 bg-white/80 backdrop-blur-sm shadow-[0_12px_40px_-12px_rgba(15,39,68,0.08)] mb-8">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50/80">
              <th className="p-4 w-28" />
              <th className="p-4 font-serif text-navy-900 bg-cyan-50/50">LAXIS</th>
              <th className="p-4 text-navy-800/50 font-light">大手開発</th>
              <th className="p-4 text-navy-800/50 font-light">フリーランス</th>
              <th className="p-4 text-navy-800/50 font-light">自社対応</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.label} className="border-t border-slate-50">
                <td className="p-4 text-xs tracking-widest uppercase text-navy-800/50">{r.label}</td>
                <td className="p-4 text-navy-900 font-medium bg-cyan-50/20">{r.laxis}</td>
                <td className="p-4 text-navy-800/50 font-light">{r.ent}</td>
                <td className="p-4 text-navy-800/50 font-light">{r.free}</td>
                <td className="p-4 text-navy-800/50 font-light">{r.in}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="lg:hidden pb-8">
        <div className="glass-panel">
          <p className="text-xs tracking-widest text-cyan-600 mb-4">LAXIS</p>
          <dl className="space-y-4">
            {rows.map((r) => (
              <div key={r.label}>
                <dt className="text-[10px] tracking-widest uppercase text-navy-800/40">{r.label}</dt>
                <dd className="text-sm text-navy-900 mt-1">{r.laxis}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </CinematicScene>
  )
}
