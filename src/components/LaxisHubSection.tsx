import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  Users,
  Receipt,
  MessageCircle,
  TrendingUp,
  Calendar,
  Package,
  Sparkles,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { AmbientBackground } from './AmbientBackground'
import { SectionTitle } from './SectionTitle'
import { SECTION_IDS } from '../lib/constants'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { cn } from '../lib/utils'

const features: { icon: LucideIcon; title: string; description: string }[] = [
  {
    icon: LayoutDashboard,
    title: '専用管理画面',
    description: 'スマホで確認できるダッシュボードとKPI表示。',
  },
  {
    icon: Users,
    title: '顧客管理',
    description: '情報、契約、対応履歴の一元管理。',
  },
  {
    icon: Receipt,
    title: '売上・請求',
    description: '自動集計、PDF発行、入金確認の自動化。',
  },
  {
    icon: MessageCircle,
    title: 'LINE連携',
    description: '予約通知、リマインド、管理者への自動通知。',
  },
  {
    icon: TrendingUp,
    title: '営業管理',
    description: '見込み客、商談進捗、成績の見える化。',
  },
  {
    icon: Calendar,
    title: '予約・受付',
    description: '空き枠管理、QR受付、キャンセル処理。',
  },
  {
    icon: Package,
    title: '在庫・商品',
    description: 'SKU管理、委託販売、販売状況の把握。',
  },
  {
    icon: Sparkles,
    title: 'AI活用',
    description: '問い合わせ返信、議事録要約、マニュアル検索。',
  },
]

const positions = [
  'top-[8%] left-1/2 -translate-x-1/2',
  'top-[22%] right-[4%] sm:right-[8%]',
  'top-1/2 -translate-y-1/2 right-[2%] sm:right-[5%]',
  'bottom-[22%] right-[4%] sm:right-[8%]',
  'bottom-[8%] left-1/2 -translate-x-1/2',
  'bottom-[22%] left-[4%] sm:left-[8%]',
  'top-1/2 -translate-y-1/2 left-[2%] sm:left-[5%]',
  'top-[22%] left-[4%] sm:left-[8%]',
]

export function LaxisHubSection() {
  const reduced = useReducedMotion()

  return (
    <section
      id={SECTION_IDS.hub}
      className="section-padding relative overflow-hidden bg-linear-to-b from-navy-950 via-navy-900 to-navy-800"
    >
      <AmbientBackground variant="hero" />
      <div className="container-wide relative">
        <SectionTitle
          dark
          label="LAXIS HUB"
          title="バラバラな業務を整理し、会社に合った仕組みへ。"
        />

        <div className="relative mx-auto max-w-4xl min-h-[520px] sm:min-h-[600px] lg:min-h-[680px]">
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
            animate={reduced ? undefined : { scale: [1, 1.03, 1] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
          >
            <div className="relative w-36 h-36 sm:w-44 sm:h-44">
              <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-mint-500 to-cyan-500 rotate-45 opacity-30 blur-2xl glow-mint" />
              <div
                className={cn(
                  'relative w-full h-full rounded-2xl',
                  'bg-linear-to-br from-navy-800 to-navy-900',
                  'border border-mint-400/40 shadow-2xl shadow-cyan-500/20',
                  'flex flex-col items-center justify-center',
                  'transform rotate-45',
                )}
              >
                <div className="-rotate-45 text-center">
                  <p className="text-mint-400 text-xs font-semibold tracking-widest">CORE</p>
                  <p className="text-white text-xl sm:text-2xl font-extrabold mt-1">Laxis</p>
                  <p className="text-white text-xl sm:text-2xl font-extrabold">Hub</p>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="absolute inset-0 hidden sm:block">
            <svg className="w-full h-full opacity-30" viewBox="0 0 400 400">
              <circle
                cx="200"
                cy="200"
                r="140"
                fill="none"
                stroke="#5eead4"
                strokeWidth="1"
                strokeDasharray="6 8"
              />
            </svg>
          </div>

          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              className={cn(
                'absolute w-[calc(50%-1rem)] sm:w-44 lg:w-48 z-10',
                positions[i],
              )}
              initial={reduced ? false : { opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              animate={
                reduced
                  ? undefined
                  : {
                      y: [0, -6, 0],
                    }
              }
              transition={{
                y: { repeat: Infinity, duration: 3 + i * 0.3, ease: 'easeInOut' },
                default: { delay: i * 0.05, duration: 0.5 },
              }}
            >
              <div className="glass-dark rounded-xl p-4 hover:border-mint-400/50 transition-colors">
                <feature.icon className="text-mint-400 mb-2" size={20} />
                <h3 className="text-white font-bold text-sm mb-1">{feature.title}</h3>
                <p className="text-slate-400 text-xs leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="sm:hidden grid grid-cols-2 gap-3 mt-8">
          {features.map((feature) => (
            <div key={feature.title} className="glass-dark rounded-xl p-4">
              <feature.icon className="text-mint-400 mb-2" size={18} />
              <h3 className="text-white font-bold text-sm">{feature.title}</h3>
              <p className="text-slate-400 text-xs mt-1">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
