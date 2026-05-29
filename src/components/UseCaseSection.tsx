import { motion } from 'framer-motion'
import { SceneShell } from './SceneShell'
import { SECTION_IDS } from '../data/site'
import { useCases } from '../data/useCases'

export function UseCaseSection() {
  return (
    <SceneShell id={SECTION_IDS.useCases} scene="CASES" tone="light" full={false}>
      <div className="section-pad py-24 sm:py-32 max-w-6xl mx-auto">
        <h2 className="text-display text-3xl sm:text-5xl mb-12 sm:mb-16">
          たとえば、
          <br />
          こんな仕組みを作れます。
        </h2>

        <div className="flex gap-4 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide -mx-5 px-5 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:overflow-visible sm:gap-5">
          {useCases.map((uc, i) => (
            <motion.article
              key={uc.title}
              className="snap-center shrink-0 w-[min(85vw,320px)] sm:w-auto glass rounded-2xl p-6 sm:p-8 flex flex-col min-h-[220px]"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-5%' }}
              transition={{ delay: i * 0.06, duration: 0.5 }}
            >
              <span className="text-[10px] tracking-widest text-accent mb-4">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="font-serif text-lg sm:text-xl font-semibold text-ink leading-snug">{uc.title}</h3>
              <p className="mt-4 text-sm text-ink-muted font-light leading-relaxed flex-1">{uc.desc}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </SceneShell>
  )
}
