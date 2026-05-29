import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

const fade = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
}

interface SceneShellProps {
  id: string
  scene?: string
  children: ReactNode
  className?: string
  tone?: 'light' | 'soft' | 'deep'
  full?: boolean
}

const tones = {
  light: 'scene-gradient',
  soft: 'scene-gradient-soft',
  deep: 'bg-[#0f2744] text-white',
}

export function SceneShell({
  id,
  scene,
  children,
  className = '',
  tone = 'light',
  full = true,
}: SceneShellProps) {
  const isDeep = tone === 'deep'

  return (
    <section
      id={id}
      className={`relative overflow-hidden ${tones[tone]} ${full ? 'min-h-[100svh]' : ''} ${className}`}
    >
      {!isDeep && <div className="absolute inset-0 grid-bg pointer-events-none" />}
      {scene && (
        <div className="absolute top-6 right-5 sm:right-10 z-20">
          <span
            className={`text-[10px] tracking-[0.35em] uppercase px-4 py-2 rounded-full border ${
              isDeep
                ? 'border-white/20 bg-white/10 text-white/70'
                : 'border-ink/10 bg-white/60 text-ink-muted backdrop-blur-sm'
            }`}
          >
            {scene}
          </span>
        </div>
      )}
      <motion.div
        className="relative z-10"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-10%' }}
        variants={fade}
      >
        {children}
      </motion.div>
    </section>
  )
}
