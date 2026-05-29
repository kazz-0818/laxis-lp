import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { SceneShell } from './SceneShell'
import { SECTION_IDS } from '../data/site'

const hints = ['Web', 'LINE', 'AI', '管理画面', '通知', 'ダッシュボード']

export function SceneIntro() {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % hints.length), 2200)
    return () => clearInterval(t)
  }, [])

  return (
    <SceneShell id={SECTION_IDS.intro} scene="01" tone="soft">
      <div className="section-pad min-h-[100svh] flex flex-col items-center justify-center py-24">
        <h2 className="scene-message max-w-4xl">
          ホームページを
          <br />
          作るだけでは、
          <br />
          もう足りない。
        </h2>
        <div className="mt-14 h-12 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.span
              key={hints[idx]}
              className="text-xl sm:text-2xl font-serif text-accent/70 tracking-wide"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {hints[idx]} だけでは足りない
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
    </SceneShell>
  )
}
