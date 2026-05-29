import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { AmbientBackground } from './AmbientBackground'
import { SectionTitle } from './SectionTitle'
import { SECTION_IDS } from '../lib/constants'
import { useReducedMotion } from '../hooks/useReducedMotion'

const steps = [
  '複雑な現状業務',
  'ムダ・属人化の解消',
  '最適なツール選定',
  'ラクに回る仕組み',
]

export function SolutionSection() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const lineProgress = useTransform(scrollYProgress, [0.2, 0.7], [0, 1])
  const organizeOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0.4, 1])
  const chaosPath1 = useTransform(lineProgress, (v) => 1 - v * 0.3)
  const chaosPath2 = useTransform(lineProgress, (v) => 1 - v * 0.2)

  return (
    <section
      ref={ref}
      id={SECTION_IDS.solution}
      className="section-padding relative overflow-hidden bg-navy-900 text-white"
    >
      <AmbientBackground variant="dark" />
      <div className="container-narrow relative">
        <SectionTitle
          dark
          label="PHILOSOPHY"
          title={
            <>
              今の業務をそのままシステム化するのではなく、
              <br className="hidden sm:block" />
              まず業務そのものを整えます。
            </>
          }
          description="LAXISの最大の特徴は「ゼロベースの業務改善」です。単に依頼されたシステムを作るのではなく、「どうすればラクに、正確に回るか」を現場目線で再設計します。"
        />

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden glass-dark">
            <svg className="absolute inset-0 w-full h-full p-6" viewBox="0 0 400 300">
              {!reduced && (
                <>
                  <motion.path
                    d="M40,150 Q120,40 200,150 T360,150"
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="2"
                    strokeOpacity="0.5"
                    style={{ pathLength: chaosPath1 }}
                  />
                  <motion.path
                    d="M40,180 Q150,220 250,100 T360,200"
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="2"
                    strokeOpacity="0.4"
                    style={{ pathLength: chaosPath2 }}
                  />
                  <motion.path
                    d="M60,120 L200,150 L340,120"
                    fill="none"
                    stroke="#5eead4"
                    strokeWidth="3"
                    strokeLinecap="round"
                    style={{
                      pathLength: lineProgress,
                      opacity: organizeOpacity,
                    }}
                  />
                  <motion.path
                    d="M200,150 L200,80 M200,150 L140,220 M200,150 L260,220"
                    fill="none"
                    stroke="#22d3ee"
                    strokeWidth="2"
                    style={{
                      pathLength: lineProgress,
                      opacity: organizeOpacity,
                    }}
                  />
                </>
              )}
              {reduced && (
                <>
                  <path d="M60,120 L200,150 L340,120" fill="none" stroke="#5eead4" strokeWidth="3" />
                  <path d="M200,150 L200,80 M200,150 L140,220 M200,150 L260,220" fill="none" stroke="#22d3ee" strokeWidth="2" />
                </>
              )}
              <circle cx="200" cy="150" r="12" fill="#2dd4bf" />
            </svg>
            <p className="absolute bottom-4 left-0 right-0 text-center text-xs text-slate-400">
              スクロールで「絡まった線」が整うイメージ
            </p>
          </div>

          <div className="space-y-4">
            {steps.map((step, i) => (
              <motion.div
                key={step}
                className="flex items-center gap-4"
                initial={reduced ? false : { opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="w-10 h-10 rounded-full bg-mint-500/20 border border-mint-400/40 flex items-center justify-center text-mint-400 font-bold text-sm shrink-0">
                  {i + 1}
                </div>
                <div className="flex-1 flex items-center gap-3">
                  <p className="font-semibold text-lg">{step}</p>
                  {i < steps.length - 1 && (
                    <ArrowDown className="text-slate-500 hidden sm:block" size={16} />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
