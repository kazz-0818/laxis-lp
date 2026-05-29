import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { SceneShell } from './SceneShell'
import { SECTION_IDS } from '../data/site'

const slides = ['Webだけ', 'フォームだけ', 'LINEだけ', '仕組み全体']

export function SceneIntro() {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % slides.length), 2800)
    return () => clearInterval(t)
  }, [])

  return (
    <SceneShell id={SECTION_IDS.intro} scene="INTRO" tone="soft">
      <div className="section-pad min-h-[100svh] flex flex-col justify-center py-24 max-w-4xl mx-auto">
        <h2 className="text-display text-3xl sm:text-5xl lg:text-6xl leading-[1.12]">
          ホームページを
          <br />
          作るだけでは、
          <br />
          もう足りない。
        </h2>
        <p className="mt-10 text-base sm:text-lg text-ink-muted font-light leading-relaxed max-w-xl">
          問い合わせ、予約、顧客管理、通知、請求、社内共有。事業の成長に必要なのは、見た目だけのWebではなく、現場が動きやすくなる仕組みです。
        </p>

        <div className="mt-16 h-16 flex items-center">
          <AnimatePresence mode="wait">
            <motion.span
              key={slides[idx]}
              className="text-2xl sm:text-3xl font-serif text-accent/80"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4 }}
            >
              {slides[idx]}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
    </SceneShell>
  )
}
