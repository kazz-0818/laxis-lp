import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiChevronDown } from 'react-icons/hi2'
import { SceneShell } from './SceneShell'
import { SECTION_IDS } from '../data/site'
import { faqs } from '../data/faqs'

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <SceneShell id={SECTION_IDS.faq} scene="FAQ" tone="light" full={false}>
      <div className="section-pad py-24 sm:py-32 max-w-2xl mx-auto">
        <h2 className="text-display text-3xl sm:text-4xl text-center mb-12">よくあるご質問</h2>

        <div className="divide-y divide-slate-200">
          {faqs.map((faq, i) => (
            <div key={faq.q}>
              <button
                type="button"
                className="w-full flex justify-between gap-4 py-5 text-left font-serif text-base sm:text-lg text-ink"
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
              >
                {faq.q}
                <HiChevronDown
                  className={`shrink-0 w-5 h-5 text-accent transition-transform ${open === i ? 'rotate-180' : ''}`}
                />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.p
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="pb-5 text-sm text-ink-muted font-light leading-relaxed overflow-hidden"
                  >
                    {faq.a}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </SceneShell>
  )
}
