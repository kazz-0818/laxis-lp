import { Check, Star } from 'lucide-react'
import { AmbientBackground } from './AmbientBackground'
import { ParallaxSection } from './ParallaxSection'
import { SectionTitle } from './SectionTitle'
import { AnimatedCard } from './AnimatedCard'
import { Button } from './ui/Button'
import { CTA, SECTION_IDS } from '../lib/constants'
import { cn } from '../lib/utils'

const plans = [
  {
    name: 'Light',
    subtitle: 'ライト',
    desc: 'まずは一部だけ効率化したい企業へ',
    price: '5〜20万円',
    priceNote: '価格目安',
    features: ['スプレッドシート改善', 'GAS', 'フォーム連携', '自動通知'],
    recommended: false,
  },
  {
    name: 'Standard',
    subtitle: 'スタンダード',
    desc: '顧客や売上管理を整えたい企業へ',
    price: '20〜70万円',
    priceNote: '価格目安',
    features: [
      '業務整理',
      '顧客/売上管理',
      'LINE連携',
      'PDF発行',
      '簡易ダッシュボード',
    ],
    recommended: true,
  },
  {
    name: 'Premium',
    subtitle: 'プレミアム',
    desc: '専用画面や複数機能を構築したい企業へ',
    price: '70〜200万円',
    priceNote: '価格目安',
    features: [
      'Web管理画面',
      '複数データ連携',
      'AI活用',
      '高度な運用設計',
    ],
    recommended: false,
  },
  {
    name: 'Support',
    subtitle: '保守運用サポート',
    desc: '導入後も継続的に改善したい企業へ',
    price: '1万〜5万円',
    priceNote: '月額',
    features: ['軽微修正', 'エラー対応', '運用相談', '追加改善提案'],
    recommended: false,
  },
]

export function PricingSection() {
  return (
    <ParallaxSection
      id={SECTION_IDS.pricing}
      className="section-padding bg-slate-50"
      background={<AmbientBackground variant="light" />}
    >
      <div className="container-wide">
        <SectionTitle
          label="PRICING"
          title="スモールスタートから、本格的な独自システムまで。"
        />

        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {plans.map((plan, i) => (
            <AnimatedCard
              key={plan.name}
              index={i}
              className={cn(
                'relative flex flex-col',
                plan.recommended &&
                  'ring-2 ring-mint-500/60 shadow-xl shadow-cyan-500/10 scale-[1.02] z-10',
              )}
            >
              {plan.recommended && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 px-3 py-1 rounded-full bg-linear-to-r from-mint-500 to-cyan-500 text-navy-900 text-xs font-bold">
                  <Star size={12} fill="currentColor" />
                  おすすめ
                </div>
              )}
              <div className="mb-4">
                <p className="text-xs text-cyan-600 font-semibold">{plan.subtitle}</p>
                <h3 className="text-xl font-extrabold text-navy-900">{plan.name}</h3>
                <p className="text-sm text-slate-600 mt-2">{plan.desc}</p>
              </div>
              <div className="mb-6">
                <p className="text-xs text-slate-500">{plan.priceNote}</p>
                <p className="text-2xl font-extrabold text-navy-900">{plan.price}</p>
              </div>
              <ul className="space-y-2 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-2 text-sm text-slate-700">
                    <Check size={16} className="text-mint-500 shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                href={CTA.consult}
                variant={plan.recommended ? 'primary' : 'outline'}
                size="sm"
                className="w-full"
              >
                相談する
              </Button>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </ParallaxSection>
  )
}
