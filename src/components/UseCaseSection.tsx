import { motion } from 'framer-motion'
import { SceneShell } from './SceneShell'
import { SECTION_IDS } from '../data/site'
import { useCases } from '../data/useCases'

export function UseCaseSection() {
  return (
    <SceneShell id={SECTION_IDS.useCases} scene="CASES" tone="light" full={false}>
      <div className="section-pad py-24 sm:py-28 max-w-6xl mx-auto">
        <h2 className="scene-message mb-14 sm:mb-16 text-left sm:text-center max-w-3xl sm:mx-auto">
          たとえば、
          <br className="sm:hidden" />
          こんな仕組みを。
        </h2>

        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide -mx-5 px-5 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:overflow-visible sm:gap-5">
          {useCases.map((uc, i) => (
            <motion.article
              key={uc.title}
              className="snap-center shrink-0 w-[min(82vw,300px)] sm:w-auto glass-glow rounded-2xl p-6 flex flex-col min-h-[180px]"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.45 }}
            >
              <span className="text-[10px] tracking-widest text-accent/80 mb-3">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="font-serif text-base sm:text-lg font-semibold text-ink leading-snug">{uc.title}</h3>
              <p className="mt-3 text-xs sm:text-sm text-ink-muted font-light leading-relaxed flex-1">{uc.desc}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </SceneShell>
  )
}
