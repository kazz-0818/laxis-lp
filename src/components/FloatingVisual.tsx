import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const cards = [
  { label: 'LINE', x: '-38%', y: '-22%', z: 60, r: -10, delay: 0 },
  { label: 'Form', x: '32%', y: '-28%', z: 80, r: 8, delay: 0.3 },
  { label: 'CRM', x: '-12%', y: '8%', z: 100, r: -4, delay: 0.6 },
  { label: 'AI', x: '28%', y: '12%', z: 70, r: 12, delay: 0.9 },
  { label: 'Sheet', x: '-32%', y: '24%', z: 40, r: -14, delay: 0.2 },
  { label: 'Dashboard', x: '8%', y: '-8%', z: 90, r: 5, delay: 0.5 },
  { label: 'Notify', x: '38%', y: '22%', z: 50, r: -8, delay: 0.7 },
]

interface Props {
  className?: string
}

export function FloatingVisual({ className }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 120])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.88])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.35])

  return (
    <motion.div
      ref={ref}
      className={`relative w-full max-w-2xl mx-auto aspect-square ${className ?? ''}`}
      style={{ y, scale, opacity }}
      aria-hidden
    >
      <div className="absolute inset-0 grid-bg opacity-80 rounded-full" />
      <div className="absolute inset-0 flex items-center justify-center perspective-[1000px]">
        <motion.div
          className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full glass flex items-center justify-center z-20"
          animate={{ boxShadow: ['0 0 40px rgba(8,145,178,0.15)', '0 0 60px rgba(20,184,166,0.25)', '0 0 40px rgba(8,145,178,0.15)'] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-display text-xl sm:text-2xl">LAXIS</span>
        </motion.div>

        {cards.map((c) => (
          <motion.div
            key={c.label}
            className="absolute glass px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg text-[10px] sm:text-xs font-medium text-ink/80"
            style={{
              left: `calc(50% + ${c.x})`,
              top: `calc(50% + ${c.y})`,
              ['--r' as string]: `${c.r}deg`,
              transform: `translate(-50%, -50%) translateZ(${c.z}px) rotate(${c.r}deg)`,
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
            transition={{
              opacity: { delay: c.delay, duration: 0.6 },
              scale: { delay: c.delay, duration: 0.6 },
              y: { delay: c.delay, duration: 4 + c.delay, repeat: Infinity, ease: 'easeInOut' },
            }}
          >
            {c.label}
          </motion.div>
        ))}

        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30" viewBox="0 0 400 400">
          <path d="M120 140 Q200 100 280 160 T200 280" fill="none" stroke="#0891b2" strokeWidth="1" strokeDasharray="4 8" />
          <path d="M160 120 L240 200 L180 260" fill="none" stroke="#94a3b8" strokeWidth="0.75" />
        </svg>
      </div>
    </motion.div>
  )
}
