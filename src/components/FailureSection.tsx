import { motion } from 'framer-motion'
import { XCircle, MessageSquareWarning } from 'lucide-react'
import { SectionTitle } from './SectionTitle'
import { AnimatedCard } from './AnimatedCard'
import { SECTION_IDS } from '../lib/constants'
import { useReducedMotion } from '../hooks/useReducedMotion'

function ChaosIllustration() {
  const reduced = useReducedMotion()

  return (
    <div className="relative w-full max-w-sm mx-auto aspect-square" aria-hidden>
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <defs>
          <linearGradient id="chaosGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#5eead4" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        {[
          'M30,100 Q80,30 120,90 T170,110',
          'M40,140 Q100,60 150,130',
          'M50,50 Q90,120 130,70',
          'M20,80 Q60,150 100,100 T180,60',
        ].map((d, i) => (
          <motion.path
            key={i}
            d={d}
            fill="none"
            stroke="url(#chaosGrad)"
            strokeWidth="2"
            strokeLinecap="round"
            initial={reduced ? false : { pathLength: 0, opacity: 0.3 }}
            whileInView={{ pathLength: 1, opacity: 0.8 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: i * 0.15 }}
          />
        ))}
        <rect x="70" y="75" width="28" height="20" rx="3" fill="#0f2744" opacity="0.9" />
        <rect x="105" y="95" width="24" height="18" rx="3" fill="#1e4d7a" opacity="0.8" />
        <circle cx="100" cy="100" r="35" fill="none" stroke="#2dd4bf" strokeWidth="1" strokeDasharray="4 4" />
        <text x="100" y="104" textAnchor="middle" fill="#5eead4" fontSize="8" fontWeight="bold">
          SaaS
        </text>
      </svg>
      <div className="absolute top-1/4 left-1/4 w-10 h-10 rounded-lg bg-white shadow-lg flex items-center justify-center text-[8px] font-bold text-navy-800 rotate-12">
        PDF
      </div>
      <div className="absolute bottom-1/3 right-1/4 w-10 h-10 rounded-lg bg-mint-400/20 shadow-lg flex items-center justify-center text-[8px] font-bold text-navy-800 -rotate-6">
        Chat
      </div>
    </div>
  )
}

export function FailureSection() {
  return (
    <section
      id={SECTION_IDS.failure}
      className="section-padding bg-linear-to-b from-slate-100 to-white"
    >
      <div className="container-narrow">
        <SectionTitle
          label="WARNING"
          title="「とりあえずシステム化」は、失敗の元。"
          description="業務が整理されていない状態でシステムだけを導入しても、混乱が拡大するだけです。大手SaaSは高額で複雑すぎることもあり、現場のリアルな運用に合わないケースもあります。また、今の複雑な業務を外注先に正しく伝えられず、結果として「現場とズレたもの」ができてしまうこともあります。"
          align="left"
          className="max-w-4xl"
        />

        <div className="grid lg:grid-cols-3 gap-10 items-center">
          <AnimatedCard index={0} className="lg:col-span-1">
            <div className="flex items-start gap-4">
              <XCircle className="text-red-400 shrink-0" size={28} />
              <div>
                <h3 className="font-bold text-navy-900 text-lg mb-2">既存ツールが合わない</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  汎用SaaSは機能過多で、現場の運用フローと噛み合わない。結局、ExcelやLINEに戻ってしまう。
                </p>
              </div>
            </div>
          </AnimatedCard>

          <div className="flex justify-center py-8 lg:py-0">
            <ChaosIllustration />
          </div>

          <AnimatedCard index={1} className="lg:col-span-1">
            <div className="flex items-start gap-4">
              <MessageSquareWarning className="text-amber-500 shrink-0" size={28} />
              <div>
                <h3 className="font-bold text-navy-900 text-lg mb-2">外注先に伝えづらい</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  属人化した業務の実態が共有できず、要件がズレたシステムが納品されるリスクがある。
                </p>
              </div>
            </div>
          </AnimatedCard>
        </div>
      </div>
    </section>
  )
}
