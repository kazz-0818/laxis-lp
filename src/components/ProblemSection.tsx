import { UserX, LayoutGrid, Hand, AlertTriangle, HelpCircle } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { AmbientBackground } from './AmbientBackground'
import { ParallaxSection } from './ParallaxSection'
import { SectionTitle } from './SectionTitle'
import { AnimatedCard } from './AnimatedCard'
import { SECTION_IDS } from '../lib/constants'

const problems: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: UserX,
    title: '属人化',
    description:
      '担当者しかわからない作業が多く、引き継ぎや確認に時間がかかる。',
  },
  {
    icon: LayoutGrid,
    title: '管理がバラバラ',
    description:
      '顧客情報、売上、予約、請求が別々に管理されている。',
  },
  {
    icon: Hand,
    title: '手作業が多い',
    description:
      '転記、集計、PDF作成、LINE連絡を毎回手作業で行っている。',
  },
  {
    icon: AlertTriangle,
    title: 'ミスや漏れが出る',
    description:
      '入力漏れ、通知漏れ、請求漏れが起きやすい。',
  },
  {
    icon: HelpCircle,
    title: '何から始めればいいかわからない',
    description:
      'DXに興味はあるが、どこをシステム化すべきかわからない。',
  },
]

export function ProblemSection() {
  return (
    <ParallaxSection
      id={SECTION_IDS.problems}
      className="section-padding bg-slate-50"
      background={<AmbientBackground variant="light" />}
    >
      <div className="container-narrow relative">
        <SectionTitle
          label="PROBLEMS"
          title="その業務、まだ人の頑張りだけで回していませんか？"
          description="多くの現場で、同じような課題が積み重なっています。"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {problems.map((item, i) => (
            <AnimatedCard
              key={item.title}
              index={i}
              className={`relative overflow-hidden ${
                i === 4 ? 'sm:col-span-2 lg:col-span-1' : ''
              } ${i >= 3 ? 'lg:translate-y-4' : ''}`}
            >
              <div className="absolute inset-0 bg-linear-to-br from-navy-800/5 to-transparent pointer-events-none" />
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-navy-900/5 flex items-center justify-center mb-4">
                  <item.icon className="text-navy-700" size={24} />
                </div>
                <h3 className="text-lg font-bold text-navy-900 mb-2">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
              </div>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </ParallaxSection>
  )
}
