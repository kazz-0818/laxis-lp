import { motion } from 'framer-motion'
import { SceneShell } from './SceneShell'
import { SECTION_IDS } from '../data/site'
import { HiArrowRight } from 'react-icons/hi2'

const flows = [
  { before: 'LINEで予約 → 手入力', after: 'フォーム → 通知 → 管理画面' },
  { before: '問い合わせが散乱', after: '整理 → 自動返信 → 一元管理' },
]

export function WorksLikeSection() {
  return (
    <SceneShell id={SECTION_IDS.magic} scene="06" tone="light">
      <div className="section-pad min-h-[100svh] flex flex-col justify-center py-24 max-w-4xl mx-auto">
        <h2 className="scene-message mb-16">相談から、仕組みになる。</h2>

        <div className="space-y-8">
          {flows.map((f, i) => (
            <motion.div
              key={i}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 sm:gap-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <div className="flex-1 glass-glow rounded-2xl px-6 py-5 text-center sm:text-left">
                <p className="text-[10px] tracking-widest text-ink-muted/60 mb-2">Before</p>
                <p className="text-sm text-ink-muted font-light">{f.before}</p>
              </div>
              <HiArrowRight className="hidden sm:block w-5 h-5 text-accent shrink-0 mx-auto rotate-90 sm:rotate-0" />
              <div className="flex-1 glass-glow rounded-2xl px-6 py-5 border-accent/15 text-center sm:text-left">
                <p className="text-[10px] tracking-widest text-accent mb-2">After</p>
                <p className="text-sm text-ink font-light">{f.after}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SceneShell>
  )
}
