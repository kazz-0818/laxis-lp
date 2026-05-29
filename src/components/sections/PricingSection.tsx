import { useEffect, useRef } from 'react'
import { Check, Star } from 'lucide-react'
import { gsap, registerGsap } from '../../lib/gsap'
import { GlowButton } from '../ui/GlowButton'
import { AtmosphereBackground } from '../scenes/AtmosphereBackground'
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
    if (!cards.length) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { y: 48, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
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
      className="relative min-h-[100svh] scene-white overflow-hidden"
    >
      <AtmosphereBackground variant="mist" />
      <div className="absolute inset-0 vignette-light pointer-events-none z-[1]" />
      <div className="absolute top-6 right-5 sm:right-10 z-30">
        <span className="pill-tag">PRICING</span>
      </div>

      <div className="relative z-10 section-pad py-24 sm:py-32">
        <div className="container-editorial max-w-6xl mx-auto">
          <h2 className="text-editorial text-3xl sm:text-4xl text-center mb-4">
            スモールスタートから、
            <br className="hidden sm:block" />
            本格的な独自システムまで。
          </h2>
          <p className="text-center text-sm text-navy-800/55 font-light mb-14 max-w-md mx-auto">
            規模に合わせて選べる4つのプラン。
          </p>

          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
            {plans.map((plan) => (
              <div
                key={plan.name}
                data-price-card
                className={cn(
                  'relative rounded-xl p-6 sm:p-7 border transition-all duration-500 bg-white',
                  plan.featured
                    ? 'border-cyan-400/60 shadow-[0_16px_48px_-12px_rgba(6,182,212,0.2)] ring-1 ring-cyan-400/20'
                    : 'border-slate-200/90 shadow-[0_8px_24px_-8px_rgba(15,39,68,0.06)] hover:border-slate-300',
                )}
              >
                {plan.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 px-3 py-1 rounded-full bg-linear-to-r from-cyan-500 to-mint-400 text-white text-[10px] font-bold tracking-widest uppercase">
                    <Star size={10} fill="currentColor" />
                    おすすめ
                  </div>
                )}
                <p className="text-[10px] tracking-widest uppercase text-slate-400">{plan.sub}</p>
                <h3 className="text-editorial text-xl mt-2">{plan.name}</h3>
                <p className="text-sm text-navy-800/55 font-light mt-1">{plan.desc}</p>
                <p className="text-[10px] text-slate-400 mt-5 tracking-widest uppercase">{plan.note}</p>
                <p
                  className={cn(
                    'text-2xl font-serif mt-1',
                    plan.featured ? 'text-cyan-700' : 'text-navy-900',
                  )}
                >
                  {plan.price}
                </p>
                <ul className="mt-6 space-y-2 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex gap-2 text-sm text-navy-800/70 font-light">
                      <Check
                        size={14}
                        className={cn(
                          'shrink-0 mt-0.5',
                          plan.featured ? 'text-cyan-600' : 'text-mint-500',
                        )}
                      />
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
      </div>
    </section>
  )
}
