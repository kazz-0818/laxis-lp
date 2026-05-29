import { motion } from 'framer-motion'
import { SceneShell } from './SceneShell'
import { SECTION_IDS } from '../data/site'

const modules = [
  'Webページ / LP',
  '予約フォーム',
  '申込フォーム',
  'LINE連携',
  '自動通知',
  '顧客管理',
  '管理画面',
  'AIチャット',
  'スプレッドシート連携',
  '決済導線',
  'ダッシュボード',
  '業務フロー自動化',
]

export function SolutionSection() {
  return (
    <SceneShell id={SECTION_IDS.solution} scene="SOLUTION" tone="soft">
      <div className="section-pad min-h-[100svh] flex flex-col justify-center py-24 max-w-6xl mx-auto">
        <div className="max-w-2xl mb-16">
          <h2 className="text-display text-3xl sm:text-5xl leading-[1.12]">
            LAXISは、事業に合わせて
            <br />
            “動く仕組み”を作ります。
          </h2>
          <p className="mt-6 text-ink-muted font-light leading-relaxed">
            テンプレートを押し付けるのではなく、現場の流れを整理し、必要な機能だけを組み合わせて設計します。
          </p>
        </div>

        <div className="relative flex flex-wrap justify-center gap-3 sm:gap-4 max-w-3xl mx-auto">
          {modules.map((m, i) => (
            <motion.span
              key={m}
              className="glass px-4 py-2 rounded-full text-[11px] sm:text-xs text-ink/70"
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 6) * 0.05, duration: 0.4 }}
              whileHover={{ scale: 1.05, borderColor: 'rgba(8,145,178,0.4)' }}
            >
              {m}
            </motion.span>
          ))}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border-2 border-accent/30 bg-white flex items-center justify-center text-sm font-bold text-accent z-10"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.3 }}
          >
            LAXIS
          </motion.div>
        </div>
      </div>
    </SceneShell>
  )
}
