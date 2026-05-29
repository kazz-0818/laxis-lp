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
    price: '5〜20万円',
    features: ['スプレッドシート', 'GAS', '自動通知'],
    featured: false,
  },
  {
    name: 'Standard',
    price: '20〜70万円',
    features: ['業務整理', '顧客/売上', 'LINE連携', 'ダッシュボード'],
    featured: true,
  },
  {
    name: 'Premium',
    price: '70〜200万円',
    features: ['Web管理画面', 'AI活用', '高度設計'],
    featured: false,
  },
  {
    name: 'Support',
    price: '月額1〜5万円',
    features: ['保守', '改善', '運用相談'],
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
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.06,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 78%' },
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
      <div className="relative z-10 section-pad py-28 sm:py-36">
        <div className="container-editorial max-w-5xl mx-auto">
          <h2 className="text-editorial text-3xl sm:text-4xl text-center mb-16">
            規模に合わせて、始められる。
          </h2>

          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {plans.map((plan) => (
              <div
                key={plan.name}
                data-price-card
                className={cn(
                  'rounded-xl p-7 border bg-white transition-shadow',
                  plan.featured
                    ? 'border-cyan-400/50 shadow-[0_20px_50px_-15px_rgba(6,182,212,0.25)]'
                    : 'border-slate-200/90 shadow-sm',
                )}
              >
                {plan.featured && (
                  <div className="flex items-center gap-1 text-[10px] text-cyan-600 font-bold tracking-widest uppercase mb-3">
                    <Star size={10} fill="currentColor" />
                    おすすめ
                  </div>
                )}
                <h3 className="text-editorial text-xl">{plan.name}</h3>
                <p className={cn('text-2xl font-serif mt-2', plan.featured && 'text-cyan-700')}>
                  {plan.price}
                </p>
                <ul className="mt-6 space-y-2 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex gap-2 text-sm text-navy-800/60 font-light">
                      <Check size={14} className="text-mint-500 shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <GlowButton href={CTA.consult} variant={plan.featured ? 'primary' : 'outline'} size="sm" className="w-full">
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
