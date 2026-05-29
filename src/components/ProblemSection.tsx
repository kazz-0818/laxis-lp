import { motion } from 'framer-motion'
import { SceneShell } from './SceneShell'
import { SECTION_IDS } from '../data/site'

const problems = [
  '問い合わせ対応がLINEやDMに散らばっている',
  '顧客情報がスプレッドシートやメモに分散している',
  '予約・申込・支払い確認が手作業になっている',
  'スタッフ間の共有が遅れる',
  '売上や進捗をすぐ確認できない',
  'AIを使いたいが、業務にどう組み込むかわからない',
]

export function ProblemSection() {
  return (
    <SceneShell id={SECTION_IDS.problem} scene="PROBLEM" tone="light">
      <div className="section-pad min-h-[100svh] flex flex-col justify-center py-24 max-w-6xl mx-auto">
        <h2 className="text-display text-3xl sm:text-5xl text-center mb-16 sm:mb-24">
          その作業、
          <br />
          まだ人力で回していませんか？
        </h2>

        <div className="relative min-h-[320px] sm:min-h-[400px]">
          {problems.map((p, i) => {
            const positions = [
              { top: '5%', left: '5%', r: -6 },
              { top: '12%', left: '55%', r: 8 },
              { top: '38%', left: '8%', r: 4 },
              { top: '45%', left: '52%', r: -10 },
              { top: '68%', left: '20%', r: 6 },
              { top: '72%', left: '58%', r: -4 },
            ]
            const pos = positions[i]!
            return (
              <motion.div
                key={p}
                className="absolute max-w-[min(100%,280px)] glass px-4 py-3 sm:px-5 sm:py-4 rounded-xl text-xs sm:text-sm text-ink/75 font-light leading-relaxed"
                style={{ top: pos.top, left: pos.left, rotate: `${pos.r}deg` }}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={{ scale: 1.03, zIndex: 10 }}
              >
                {p}
              </motion.div>
            )
          })}
        </div>
      </div>
    </SceneShell>
  )
}
