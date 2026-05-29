import { motion } from 'framer-motion'
import { SceneShell } from './SceneShell'
import { CONTACT, SECTION_IDS } from '../data/site'

const items = [
  'LP / 受注ページ制作',
  'フォーム / LINE連携',
  '管理画面 / ダッシュボード',
  'AI / 自動化導入',
]

export function PricingHintSection() {
  return (
    <SceneShell id={SECTION_IDS.pricing} scene="PRICING" tone="soft" full={false}>
      <div className="section-pad py-24 sm:py-32 max-w-3xl mx-auto text-center">
        <h2 className="text-display text-3xl sm:text-5xl">
          必要なものだけ、
          <br />
          小さく始められます。
        </h2>
        <p className="mt-8 text-ink-muted font-light leading-relaxed">
          最初から大規模なシステムを作る必要はありません。まずはLP、フォーム、LINE連携など、効果が出やすい部分から導入できます。
        </p>
        <p className="mt-4 text-sm text-ink-muted">内容に応じて個別見積もり</p>

        <ul className="mt-12 space-y-3 text-left max-w-sm mx-auto">
          {items.map((item, i) => (
            <motion.li
              key={item}
              className="flex items-center gap-3 text-sm text-ink/80"
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
              {item}
            </motion.li>
          ))}
        </ul>

        <a
          href={CONTACT.mailto}
          className="inline-flex mt-12 min-h-[48px] items-center px-8 rounded-full bg-ink text-white text-sm font-medium hover:bg-ink/90 transition-colors"
        >
          自分の事業でできることを相談する
        </a>
      </div>
    </SceneShell>
  )
}
