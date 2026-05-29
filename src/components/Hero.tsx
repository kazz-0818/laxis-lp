import { motion } from 'framer-motion'
import { FloatingVisual } from './FloatingVisual'
import { CONTACT, SECTION_IDS } from '../data/site'

export function Hero() {
  return (
    <section
      id={SECTION_IDS.hero}
      className="relative min-h-[100svh] scene-gradient overflow-hidden flex flex-col"
    >
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[50vh] bg-[radial-gradient(ellipse,rgba(34,211,238,0.12),transparent_70%)] pointer-events-none" />

      <div className="relative z-10 flex-1 flex flex-col section-pad pt-28 sm:pt-32 pb-12 max-w-7xl mx-auto w-full">
        <motion.div
          className="flex-1 flex flex-col lg:flex-row items-center gap-12 lg:gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex-1 text-center lg:text-left order-2 lg:order-1">
            <motion.p
              className="text-xs tracking-[0.4em] text-accent uppercase mb-6"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              System Introduction
            </motion.p>
            <motion.h1
              className="text-display text-[2.25rem] sm:text-5xl lg:text-[3.75rem] leading-[1.08]"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
            >
              事業に、
              <br />
              仕組みという
              <br className="sm:hidden" />
              推進力を。
            </motion.h1>
            <motion.p
              className="mt-6 text-sm sm:text-base text-ink-muted max-w-md mx-auto lg:mx-0 leading-relaxed font-light"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.6 }}
            >
              LAXISは、Web・LINE・AI・管理画面を組み合わせ、あなたの事業に合わせた“使えるシステム”を設計・構築する導入支援サービスです。
            </motion.p>
            <motion.div
              className="mt-10 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <a
                href={CONTACT.mailto}
                className="inline-flex items-center justify-center min-h-[48px] px-8 rounded-full bg-ink text-white text-sm font-medium hover:bg-ink/90 transition-colors"
              >
                まずは相談する
              </a>
              <a
                href={`#${SECTION_IDS.solution}`}
                className="inline-flex items-center justify-center min-h-[48px] px-8 rounded-full border border-ink/15 bg-white/80 text-ink text-sm font-medium hover:border-accent/40 transition-colors"
              >
                できることを見る
              </a>
            </motion.div>
          </div>

          <div className="flex-1 w-full order-1 lg:order-2">
            <FloatingVisual />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
