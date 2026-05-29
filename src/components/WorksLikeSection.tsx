import { motion } from 'framer-motion'
import { SceneShell } from './SceneShell'
import { SECTION_IDS } from '../data/site'

const pairs = [
  {
    before: '予約をLINEで受けて、あとで手入力している',
    after: '予約フォーム → LINE通知 → 管理表反映 → スタッフ共有',
  },
  {
    before: '問い合わせ内容がバラバラ',
    after: 'フォームで整理 → 自動返信 → 管理画面で確認',
  },
]

export function WorksLikeSection() {
  return (
    <SceneShell id={SECTION_IDS.magic} scene="TRANSFORM" tone="light">
      <div className="section-pad min-h-[100svh] flex flex-col justify-center py-24 max-w-4xl mx-auto">
        <h2 className="text-display text-3xl sm:text-5xl mb-6">相談から、仕組みになる。</h2>
        <p className="text-ink-muted font-light leading-relaxed max-w-lg mb-16">
          「こんなことできるかな？」という段階からで大丈夫です。LAXISは、ぼんやりしたアイデアを整理し、事業で使える形に変えていきます。
        </p>

        <div className="space-y-12">
          {pairs.map((p, i) => (
            <motion.div
              key={i}
              className="grid sm:grid-cols-2 gap-6"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <div className="glass rounded-2xl p-6 sm:p-8">
                <p className="text-[10px] tracking-widest text-red-500/80 mb-3">BEFORE</p>
                <p className="text-sm text-ink-muted font-light leading-relaxed">{p.before}</p>
                <div className="mt-4 flex gap-2">
                  <span className="px-2 py-1 rounded bg-slate-100 text-[10px] text-ink-muted">メモ</span>
                  <span className="px-2 py-1 rounded bg-slate-100 text-[10px] text-ink-muted">LINE</span>
                </div>
              </div>
              <div className="glass rounded-2xl p-6 sm:p-8 border-accent/20">
                <p className="text-[10px] tracking-widest text-accent mb-3">AFTER</p>
                <p className="text-sm text-ink font-light leading-relaxed">{p.after}</p>
                <div className="mt-4 h-1 rounded-full bg-linear-to-r from-accent to-mint opacity-60" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SceneShell>
  )
}
