import { motion } from 'framer-motion'
import { HubVisual } from './HubVisual'
import { CONTACT, SECTION_IDS } from '../data/site'

export function Hero() {
  return (
    <section
      id={SECTION_IDS.hero}
      className="relative min-h-[100svh] scene-aurora overflow-hidden flex flex-col"
    >
      <div className="absolute inset-0 grid-bg" />
      <div className="absolute top-6 right-5 sm:right-10 z-30">
        <span className="text-[10px] tracking-[0.35em] uppercase px-4 py-2 rounded-full border border-ink/10 bg-white/50 text-ink-muted backdrop-blur-md">
          System Design
        </span>
      </div>

      <div className="relative z-10 flex-1 flex flex-col section-pad pt-24 sm:pt-28 pb-10 max-w-6xl mx-auto w-full">
        <div className="flex-1 flex items-center justify-center min-h-[45vh] sm:min-h-[50vh] py-6">
          <HubVisual size="hero" />
        </div>

        <motion.div
          className="text-center max-w-2xl mx-auto pb-8 sm:pb-12"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[11px] tracking-[0.45em] text-accent uppercase mb-5">
            仕組みを設計・構築する
          </p>
          <h1 className="text-display text-[2.1rem] sm:text-5xl lg:text-[3.5rem] leading-[1.1]">
            事業に、
            <br />
            仕組みという推進力を。
          </h1>
          <p className="mt-5 text-sm sm:text-base text-ink-muted max-w-lg mx-auto leading-relaxed font-light">
            LAXISは、Web・LINE・AI・管理画面を組み合わせ、あなたの事業に合わせた“使えるシステム”を設計・構築する導入支援サービスです。
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={CONTACT.mailto}
              className="inline-flex items-center justify-center min-h-[48px] px-9 rounded-full bg-ink/90 text-white text-sm font-medium hover:bg-ink transition-colors shadow-[0_12px_40px_-12px_rgba(10,22,40,0.35)]"
            >
              まずは相談する
            </a>
            <a
              href={`#${SECTION_IDS.solution}`}
              className="inline-flex items-center justify-center min-h-[48px] px-9 rounded-full border border-ink/12 bg-white/70 text-ink text-sm font-medium hover:border-accent/35 hover:bg-white transition-colors backdrop-blur-sm"
            >
              できることを見る
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
