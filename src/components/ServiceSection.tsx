import { ClipboardList, GitBranch, Cog } from 'lucide-react'
import { AmbientBackground } from './AmbientBackground'
import { ParallaxSection } from './ParallaxSection'
import { SectionTitle } from './SectionTitle'
import { AnimatedCard } from './AnimatedCard'
import { SECTION_IDS } from '../lib/constants'

const steps = [
  {
    icon: ClipboardList,
    title: '業務ヒアリング・整理',
    description:
      '現状の業務フローをヒアリングし、ムダや二重入力などを整理します。',
  },
  {
    icon: GitBranch,
    title: '業務フロー設計',
    description:
      '会社ごとに最適な業務フローをゼロベースで設計します。',
  },
  {
    icon: Cog,
    title: '仕組み化・自動化',
    description:
      '現場が使い慣れたツールを組み合わせ、必要な部分だけを仕組み化します。',
  },
]

const tools = [
  'LINE',
  'Googleスプレッドシート',
  'GAS',
  'Web管理画面',
  'AI',
  'PDF自動生成',
  'ダッシュボード',
]

export function ServiceSection() {
  return (
    <ParallaxSection
      id={SECTION_IDS.service}
      className="section-padding bg-white"
      background={<AmbientBackground variant="light" />}
      contentSpeed={0.06}
    >
      <div className="container-narrow">
        <SectionTitle
          label="SERVICE"
          title="ゼロから整える、業務効率化サービス「LAXIS」"
        />

        <div className="grid md:grid-cols-3 gap-6 mb-14">
          {steps.map((step, i) => (
            <AnimatedCard key={step.title} index={i} className="relative">
              <div className="absolute -top-3 -left-1 text-6xl font-black text-navy-900/5">
                0{i + 1}
              </div>
              <step.icon className="text-cyan-600 mb-4" size={32} />
              <h3 className="text-lg font-bold text-navy-900 mb-2">{step.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{step.description}</p>
            </AnimatedCard>
          ))}
        </div>

        <div className="rounded-2xl bg-slate-50 border border-slate-200/80 p-6 sm:p-8">
          <p className="text-sm font-semibold text-navy-800 mb-4">使用ツール例</p>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {tools.map((tool) => (
              <span
                key={tool}
                className="px-4 py-2 rounded-full text-sm font-medium bg-white border border-slate-200 text-navy-800 shadow-sm"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </ParallaxSection>
  )
}
