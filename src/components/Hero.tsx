import { lazy, Suspense, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { AmbientBackground } from './AmbientBackground'
import { Button } from './ui/Button'
import { CTA, SECTION_IDS } from '../lib/constants'
import { useReducedMotion } from '../hooks/useReducedMotion'

const Floating3DScene = lazy(() =>
  import('./Floating3DScene').then((m) => ({ default: m.Floating3DScene })),
)

export function Hero() {
  const reduced = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const sceneY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, 1.12])
  const sceneOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.3])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-15%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section
      ref={sectionRef}
      id={SECTION_IDS.hero}
      className="relative min-h-[100svh] flex flex-col overflow-hidden bg-navy-950"
    >
      <AmbientBackground variant="hero" parallax={false} />

      {/* 大型3D — 全画面背景 */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          y: reduced ? 0 : sceneY,
          scale: reduced ? 1 : sceneScale,
          opacity: reduced ? 1 : sceneOpacity,
        }}
      >
        <div className="absolute inset-0 lg:left-[25%]">
          <Suspense
            fallback={
              <div className="absolute inset-0 bg-linear-to-br from-navy-900 to-cyan-900/20 animate-pulse" />
            }
          >
            <Floating3DScene variant="hero" className="absolute inset-0 w-full h-full min-h-[55vh] lg:min-h-full" />
          </Suspense>
        </div>
        <div className="absolute inset-0 bg-linear-to-t from-navy-950 via-navy-950/60 to-transparent lg:bg-linear-to-r lg:from-navy-950 lg:via-navy-950/80 lg:to-transparent" />
        <div className="absolute inset-0 noise-overlay" />
      </motion.div>

      {/* コンテンツ */}
      <motion.div
        className="relative z-10 flex-1 flex flex-col justify-end lg:justify-center container-wide px-5 sm:px-8 lg:px-12 pt-28 pb-12 sm:pb-16 lg:pt-36 min-h-[100svh]"
        style={{ y: reduced ? 0 : contentY, opacity: reduced ? 1 : contentOpacity }}
      >
        <div className="max-w-2xl">
          <motion.div
            className="glass-hero rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:bg-transparent lg:border-0 lg:shadow-none lg:p-0"
            initial={reduced ? false : { opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.p
              className="inline-flex items-center gap-2 text-xs sm:text-sm text-mint-400 font-semibold mb-5 sm:mb-6 px-4 py-2 rounded-full border border-mint-400/40 bg-mint-400/10 backdrop-blur-md glow-mint"
              initial={reduced ? false : { opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
            >
              <span className="w-2 h-2 rounded-full bg-mint-400 animate-pulse" />
              ゼロから整える、業務効率化サービス
            </motion.p>

            <motion.h1
              className="text-[1.75rem] sm:text-4xl lg:text-5xl xl:text-[3.5rem] font-extrabold text-white leading-[1.15] tracking-tight"
              initial={reduced ? false : { opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.8 }}
            >
              不便な業務を整え、
              <br />
              <span className="text-gradient-shine">ラクに回る仕組み</span>
              をつくる。
            </motion.h1>

            <motion.p
              className="mt-5 sm:mt-6 text-sm sm:text-lg text-slate-300/95 leading-relaxed max-w-xl"
              initial={reduced ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              業務改善・システム開発・自動化・運用改善まで。
              LAXISは、現場の業務をゼロから整理し、会社に合った仕組みを構築する業務効率化サービスです。
            </motion.p>

            <motion.div
              className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4"
              initial={reduced ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Button href={CTA.consult} variant="primary" size="lg" className="w-full sm:w-auto">
                無料相談する
                <ArrowRight size={18} />
              </Button>
              <Button
                href={`#${SECTION_IDS.service}`}
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto"
              >
                サービス内容を見る
              </Button>
            </motion.div>

            <div className="mt-8 flex flex-wrap gap-2">
              {['LINE', 'AI', 'GAS', 'Dashboard', 'Spreadsheet'].map((tag, i) => (
                <motion.span
                  key={tag}
                  className="text-[11px] sm:text-xs px-3 py-1.5 rounded-full bg-white/5 text-mint-300/90 border border-white/10 backdrop-blur-md"
                  initial={reduced ? false : { opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + i * 0.05 }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.a
          href={`#${SECTION_IDS.problems}`}
          className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-1 text-slate-500 hover:text-mint-400 transition-colors"
          animate={reduced ? undefined : { y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
          aria-label="スクロール"
        >
          <span className="text-[10px] tracking-widest uppercase">Scroll</span>
          <ChevronDown size={22} />
        </motion.a>
      </motion.div>
    </section>
  )
}
