import { useEffect, useRef } from 'react'
import { Check, Star } from 'lucide-react'
import { gsap, registerGsap } from '../../lib/gsap'
import { SectionTitle } from '../ui/SectionTitle'
import { GlowButton } from '../ui/GlowButton'
import { CTA, SECTION_IDS } from '../../lib/constants'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { cn } from '../../lib/utils'

const plans = [
  {
    name: 'Light',
    sub: 'ライト',
    desc: '一部だけ効率化',
    price: '5〜20万円',
    note: '価格目安',
    features: ['スプレッドシート改善', 'GAS', 'フォーム連携', '自動通知'],
    featured: false,
  },
  {
    name: 'Standard',
    sub: 'スタンダード',
    desc: '顧客・売上管理を整える',
    price: '20〜70万円',
    note: '価格目安 · おすすめ',
    features: ['業務整理', '顧客/売上管理', 'LINE連携', 'PDF発行', '簡易ダッシュボード'],
    featured: true,
  },
  {
    name: 'Premium',
    sub: 'プレミアム',
    desc: '専用画面・複数機能',
    price: '70〜200万円',
    note: '価格目安',
    features: ['Web管理画面', '複数データ連携', 'AI活用', '高度な運用設計'],
    featured: false,
  },
  {
    name: 'Support',
    sub: '保守運用',
    desc: '導入後の継続改善',
    price: '月額1〜5万円',
    note: '月額',
    features: ['軽微修正', 'エラー対応', '運用相談', '追加改善提案'],
    featured: false,
  },
]

export function PricingSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    if (reduced || !sectionRef.current) return
    registerGsap()
    const cards = sectionRef.current.querySelectorAll('[data-price-card]')
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
        },
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [reduced])

  return (
    <section
      ref={sectionRef}
      id={SECTION_IDS.pricing}
      className="section-pad relative bg-navy-950 text-white overflow-hidden"
    >
      <div className="absolute inset-0 grid-floor opacity-40" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-cyan-500/8 blur-[100px]" />

      <div className="container-wide relative z-10">
        <SectionTitle
          light
          label="Pricing"
          title="スモールスタートから、本格的な独自システムまで。"
        />

        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {plans.map((plan) => (
            <div
              key={plan.name}
              data-price-card
              className={cn(
                'relative rounded-2xl p-6 sm:p-7 border transition-all duration-500 hover:-translate-y-2',
                plan.featured
                  ? 'bg-linear-to-b from-navy-800 to-navy-900 border-mint-400/50 shadow-2xl shadow-cyan-500/25 scale-[1.02] z-10'
                  : 'bg-navy-900/60 border-white/10 hover:border-cyan-400/30',
              )}
            >
              {plan.featured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 px-3 py-1 rounded-full bg-linear-to-r from-mint-500 to-cyan-500 text-navy-950 text-xs font-bold">
                  <Star size={12} fill="currentColor" />
                  おすすめ
                </div>
              )}
              <p className="text-xs text-cyan-400 font-semibold">{plan.sub}</p>
              <h3 className="text-xl font-extrabold mt-1">{plan.name}</h3>
              <p className="text-sm text-slate-400 mt-1">{plan.desc}</p>
              <p className="text-[10px] text-slate-500 mt-4">{plan.note}</p>
              <p className="text-2xl sm:text-3xl font-extrabold text-white mt-1">{plan.price}</p>
              <ul className="mt-6 space-y-2 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-2 text-sm text-slate-300">
                    <Check size={16} className="text-mint-400 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <GlowButton
                href={CTA.consult}
                variant={plan.featured ? 'primary' : 'outline'}
                size="sm"
                className="w-full"
              >
                相談する
              </GlowButton>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
