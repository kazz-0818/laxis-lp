import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { useRef, useState } from 'react'
import { SECTION_IDS } from '../data/site'

const blocks = [
  {
    key: 'A',
    title: '集客導線',
    desc: 'LP、SNS、広告、QR、紹介から問い合わせへつなぐ。',
  },
  {
    key: 'B',
    title: '受注導線',
    desc: 'フォーム、LINE、見積もり、予約、申込をスムーズにする。',
  },
  {
    key: 'C',
    title: '管理導線',
    desc: '顧客情報、対応状況、売上、通知、スタッフ共有を見える化する。',
  },
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
    <div ref={containerRef} id={SECTION_IDS.experience} className="relative" style={{ height: '300vh' }}>
      <div className="sticky top-0 h-[100svh] scene-gradient overflow-hidden">
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute top-6 right-5 sm:right-10 z-20">
          <span className="text-[10px] tracking-[0.35em] uppercase px-4 py-2 rounded-full border border-ink/10 bg-white/60 text-ink-muted">
            FLOW
          </span>
        </div>

        <div className="relative z-10 h-full section-pad flex flex-col justify-center py-20 max-w-4xl mx-auto">
          <p className="text-xs tracking-[0.4em] text-accent mb-6">WHAT WE BUILD</p>
          <h2 className="text-display text-3xl sm:text-5xl mb-16">
            作るのは、
            <br />
            ページではなく“流れ”です。
          </h2>

          <div className="relative min-h-[200px]">
            {blocks.map((b, i) => (
              <motion.div
                key={b.key}
                className="absolute inset-0 flex flex-col justify-center"
                initial={false}
                animate={{
                  opacity: active === i ? 1 : 0,
                  y: active === i ? 0 : active > i ? -40 : 40,
                  pointerEvents: active === i ? 'auto' : 'none',
                }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="text-[10px] tracking-[0.5em] text-ink-muted mb-4">{b.key}</span>
                <h3 className="text-display text-4xl sm:text-6xl">{b.title}</h3>
                <p className="mt-6 text-lg text-ink-muted font-light max-w-lg">{b.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="flex gap-2 mt-12">
            {blocks.map((_, i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full transition-colors duration-500 ${
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
