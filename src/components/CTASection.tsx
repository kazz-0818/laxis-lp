import { motion } from 'framer-motion'
import { HubVisual } from './HubVisual'
import { CONTACT, SECTION_IDS } from '../data/site'

export function CTASection() {
  return (
    <section
      id={SECTION_IDS.contact}
      className="relative min-h-[100svh] bg-[#0f2744] text-white overflow-hidden flex flex-col items-center justify-center"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(34,211,238,0.18),transparent_55%),radial-gradient(ellipse_at_80%_80%,rgba(139,92,246,0.12),transparent_50%)]" />
      <div className="absolute inset-0 grid-bg opacity-[0.07]" />

      <div className="relative z-10 section-pad py-20 w-full max-w-4xl mx-auto flex flex-col items-center">
        <div className="opacity-40 scale-75 pointer-events-none mb-6">
          <HubVisual size="section" />
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-[11px] tracking-[0.4em] text-cyan-300/70 mb-6">START</p>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-semibold leading-[1.1]">
            あなたの事業にも、
            <br />
            仕組みを。
          </h2>
          <p className="mt-6 text-sm text-white/45 font-light max-w-sm mx-auto">
            面倒な業務を、話すだけから始められます。
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={CONTACT.mailto}
              className="inline-flex items-center justify-center min-h-[50px] px-10 rounded-full bg-white text-ink text-sm font-medium hover:bg-slate-50 transition-colors"
            >
              無料で相談する
            </a>
            <a
              href={`#${SECTION_IDS.solution}`}
              className="inline-flex items-center justify-center min-h-[50px] px-10 rounded-full border border-white/25 text-white/90 text-sm font-medium hover:bg-white/5 transition-colors"
            >
              できることを見る
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
