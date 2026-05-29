import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { processSteps } from '../data/process'
import { SECTION_IDS } from '../data/site'

export function ProcessSection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const lineHeight = useTransform(scrollYProgress, [0.15, 0.85], ['0%', '100%'])

  return (
    <section ref={ref} id={SECTION_IDS.process} className="scene-gradient-soft relative">
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="relative z-10 section-pad py-24 sm:py-28 max-w-3xl mx-auto">
        <h2 className="scene-message mb-16 sm:mb-20">アイデア段階から、導入まで。</h2>

        <div className="relative pl-10">
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-ink/8" />
          <motion.div className="absolute left-[7px] top-2 w-px bg-accent origin-top" style={{ height: lineHeight }} />

          {processSteps.map((step, i) => (
            <motion.div
              key={step.n}
              className="relative pb-10 last:pb-0"
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-15%' }}
              transition={{ delay: i * 0.04, duration: 0.4 }}
            >
              <span className="absolute -left-10 top-0.5 text-[10px] text-accent font-medium">{step.n}</span>
              <h3 className="font-serif text-lg font-semibold text-ink">{step.title}</h3>
              <p className="mt-1 text-xs text-ink-muted font-light">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
