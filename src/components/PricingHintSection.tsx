import { motion } from 'framer-motion'
import { SceneShell } from './SceneShell'
import { CONTACT, SECTION_IDS } from '../data/site'

const items = ['LP / 受注', 'フォーム / LINE', '管理画面', 'AI / 自動化']

export function PricingHintSection() {
  return (
    <SceneShell id={SECTION_IDS.pricing} scene="PRICING" tone="soft" full={false}>
      <div className="section-pad py-24 sm:py-28 max-w-3xl mx-auto text-center">
        <h2 className="scene-message">
          必要なものだけ、
          <br />
          小さく始められる。
        </h2>
        <p className="mt-6 text-sm text-ink-muted font-light">内容に応じて個別見積もり</p>

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {items.map((item, i) => (
            <motion.span
              key={item}
              className="glass-glow px-4 py-2 rounded-full text-xs text-ink/70"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              {item}
            </motion.span>
          ))}
        </div>

        <a
          href={CONTACT.mailto}
          className="inline-flex mt-12 min-h-[48px] items-center px-8 rounded-full bg-ink/90 text-white text-sm font-medium hover:bg-ink transition-colors"
        >
          できることを相談する
        </a>
      </div>
    </SceneShell>
  )
}
