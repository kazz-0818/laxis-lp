import { ClipboardList, GitBranch, Cog } from 'lucide-react'
import { SectionTitle } from '../ui/SectionTitle'
import { GlassCard } from '../ui/GlassCard'
import { SECTION_IDS } from '../../lib/constants'

const steps = [
  { icon: ClipboardList, title: '業務ヒアリング・整理', desc: 'ムダ・二重入力を洗い出し、現場の実態を可視化。' },
  { icon: GitBranch, title: '業務フロー設計', desc: 'ゼロベースで、会社に最適なフローを設計。' },
  { icon: Cog, title: '仕組み化・自動化', desc: 'LINE・GAS・Web・AIを組み合わせて仕組み化。' },
]

const tools = ['LINE', 'スプレッドシート', 'GAS', 'Web管理画面', 'AI', 'PDF自動生成', 'ダッシュボード']

export function ServiceSection() {
  return (
    <section id={SECTION_IDS.service} className="section-pad bg-white relative">
      <div className="container-narrow">
        <SectionTitle
          label="Service"
          title="ゼロから整える、業務効率化サービス「LAXIS」"
          description="業務改善から運用改善まで、一貫して支援します。"
        />
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {steps.map((s, i) => (
            <GlassCard key={s.title} className="p-7 relative">
              <span className="text-5xl font-black text-navy-900/5 absolute top-4 right-4">
                0{i + 1}
              </span>
              <s.icon className="text-cyan-600 mb-4 relative" size={32} />
              <h3 className="text-lg font-bold text-navy-900 mb-2 relative">{s.title}</h3>
              <p className="text-sm text-slate-600 relative">{s.desc}</p>
            </GlassCard>
          ))}
        </div>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <p className="text-sm font-bold text-navy-800 mb-3">使用ツール例</p>
          <div className="flex flex-wrap gap-2">
            {tools.map((t) => (
              <span key={t} className="px-3 py-1.5 rounded-full text-sm bg-white border border-slate-200 text-navy-800">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
