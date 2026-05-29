import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { useRef, useState } from 'react'
import { SECTION_IDS } from '../data/site'

const blocks = [
  { key: 'A', title: '集客導線' },
  { key: 'B', title: '受注導線' },
  { key: 'C', title: '管理導線' },
]

export function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (v < 0.33) setActive(0)
    else if (v < 0.66) setActive(1)
    else setActive(2)
  })

  return (
    <div ref={containerRef} id={SECTION_IDS.experience} className="relative" style={{ height: '280vh' }}>
      <div className="sticky top-0 h-[100svh] scene-gradient overflow-hidden">
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute top-6 right-5 sm:right-10 z-20">
          <span className="text-[10px] tracking-[0.35em] uppercase px-4 py-2 rounded-full border border-ink/10 bg-white/60 text-ink-muted backdrop-blur-sm">
            04 · FLOW
          </span>
        </div>

        <div className="relative z-10 h-full section-pad flex flex-col justify-center max-w-4xl mx-auto">
          <h2 className="scene-message mb-20 sm:mb-28">
            作るのは、
            <br />
            ページではなく
            <br />
            “流れ”です。
          </h2>

          <div className="relative h-24 sm:h-32 flex items-center justify-center">
            {blocks.map((b, i) => (
              <motion.p
                key={b.key}
                className="absolute text-display text-4xl sm:text-6xl lg:text-7xl text-accent/90"
                animate={{
                  opacity: active === i ? 1 : 0,
                  scale: active === i ? 1 : 0.92,
                  y: active === i ? 0 : active > i ? -24 : 24,
                }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                {b.title}
              </motion.p>
            ))}
          </div>

          <div className="flex gap-2 mt-16 max-w-xs mx-auto w-full">
            {blocks.map((_, i) => (
              <div
                key={i}
                className={`h-0.5 flex-1 rounded-full transition-colors duration-500 ${
                  active === i ? 'bg-accent' : 'bg-ink/10'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
