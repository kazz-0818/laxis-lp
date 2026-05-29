import { motion } from 'framer-motion'
import { SceneShell } from './SceneShell'
import { SECTION_IDS } from '../data/site'

const fragments = [
  { label: 'LINE散乱', x: '8%', y: '18%', r: -8 },
  { label: '手入力', x: '62%', y: '14%', r: 10 },
  { label: 'バラバラ管理', x: '12%', y: '55%', r: 5 },
  { label: '通知漏れ', x: '58%', y: '52%', r: -12 },
  { label: '進捗不明', x: '35%', y: '72%', r: 4 },
  { label: 'AI未活用', x: '72%', y: '68%', r: -6 },
]

export function ProblemSection() {
  return (
    <SceneShell id={SECTION_IDS.problem} scene="02" tone="light">
      <div className="section-pad min-h-[100svh] flex flex-col justify-center py-20 relative max-w-5xl mx-auto w-full">
        <h2 className="scene-message relative z-20">
          その作業、
          <br />
          まだ人力で
          <br className="hidden sm:block" />
          回していませんか？
        </h2>

        <div className="relative min-h-[240px] sm:min-h-[300px] mt-12 sm:mt-16">
          {fragments.map((f, i) => (
            <motion.div
              key={f.label}
              className="absolute glass-glow px-4 py-3 rounded-xl text-xs sm:text-sm font-medium text-ink/70"
              style={{ left: f.x, top: f.y, rotate: `${f.r}deg` }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              animate={{ y: [0, -5, 0] }}
              transition={{
                opacity: { delay: i * 0.07, duration: 0.45 },
                scale: { delay: i * 0.07, duration: 0.45 },
                y: { delay: i * 0.2, duration: 3 + i * 0.2, repeat: Infinity, ease: 'easeInOut' },
              }}
            >
              {f.label}
            </motion.div>
          ))}
        </div>
      </div>
    </SceneShell>
  )
}
