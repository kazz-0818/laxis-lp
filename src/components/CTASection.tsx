import { motion } from 'framer-motion'
import { CONTACT, SECTION_IDS } from '../data/site'

export function CTASection() {
  return (
    <section
      id={SECTION_IDS.contact}
      className="relative min-h-[100svh] bg-[#0f2744] text-white overflow-hidden flex items-center"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,rgba(34,211,238,0.15),transparent_60%)]" />
      <div className="absolute inset-0 grid-bg opacity-20 invert" />

      <div className="relative z-10 section-pad py-24 w-full max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-xs tracking-[0.4em] text-cyan-300/80 mb-6">START</p>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-semibold leading-[1.1]">
            あなたの事業にも、
            <br />
            仕組みを。
          </h2>
          <p className="mt-8 text-sm sm:text-base text-white/55 font-light leading-relaxed max-w-md mx-auto">
            まずは、今の業務で面倒に感じていることを教えてください。LAXISが、Webとシステムで解決できる形を一緒に考えます。
          </p>

          <div className="mt-12 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={CONTACT.mailto}
              className="inline-flex items-center justify-center min-h-[52px] px-10 rounded-full bg-white text-ink text-sm font-semibold hover:bg-slate-50 transition-colors"
            >
              無料で相談する
            </a>
            <a
              href={`#${SECTION_IDS.solution}`}
              className="inline-flex items-center justify-center min-h-[52px] px-10 rounded-full border border-white/30 text-white text-sm font-medium hover:bg-white/10 transition-colors"
            >
              できることを聞いてみる
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
