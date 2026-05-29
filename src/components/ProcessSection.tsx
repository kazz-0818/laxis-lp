import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { processSteps } from '../data/process'
import { SECTION_IDS } from '../data/site'

export function ProcessSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ['0%', '100%'])

  return (
    <section id={SECTION_IDS.process} ref={ref} className="scene-gradient-soft relative">
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="absolute top-6 right-5 sm:right-10 z-20">
        <span className="text-[10px] tracking-[0.35em] uppercase px-4 py-2 rounded-full border border-ink/10 bg-white/60 text-ink-muted">
          PROCESS
        </span>
      </div>

      <div className="relative z-10 section-pad py-24 sm:py-32 max-w-3xl mx-auto">
        <h2 className="text-display text-3xl sm:text-5xl mb-16 sm:mb-20">
          アイデア段階から、
          <br />
          導入まで。
        </h2>

        <div className="relative pl-10 sm:pl-12">
          <div className="absolute left-[15px] top-0 bottom-0 w-px bg-ink/10" />
          <motion.div
            className="absolute left-[15px] top-0 w-px bg-accent origin-top"
            style={{ height: lineHeight }}
          />

          {processSteps.map((step, i) => (
            <motion.div
              key={step.n}
              className="relative pb-14 last:pb-0"
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-20%' }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
            >
              <span className="absolute -left-10 sm:-left-12 top-0 w-8 h-8 rounded-full border-2 border-white bg-accent/10 flex items-center justify-center text-[10px] font-medium text-accent">
                {step.n}
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-semibold text-ink">{step.title}</h3>
              <p className="mt-2 text-sm text-ink-muted font-light leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
