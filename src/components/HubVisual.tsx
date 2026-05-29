import { motion, useMotionValue, useSpring, useScroll, useTransform } from 'framer-motion'
import { useEffect, useId, useRef } from 'react'

const NODES = [
  { id: 'web', label: 'Web', angle: 0 },
  { id: 'line', label: 'LINE', angle: 45 },
  { id: 'ai', label: 'AI', angle: 90 },
  { id: 'form', label: 'Form', angle: 135 },
  { id: 'crm', label: 'CRM', angle: 180 },
  { id: 'dash', label: 'Dashboard', angle: 225 },
  { id: 'notify', label: 'Notify', angle: 270 },
  { id: 'sheet', label: 'Sheet', angle: 315 },
]

interface HubVisualProps {
  className?: string
  size?: 'hero' | 'section'
}

export function HubVisual({ className = '', size = 'hero' }: HubVisualProps) {
  const uid = useId().replace(/:/g, '')
  const gradId = `hub-grad-${uid}`
  const ref = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 80, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 80, damping: 20 })

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const scrollY = useTransform(scrollYProgress, [0, 1], [0, size === 'hero' ? 80 : 40])
  const scrollScale = useTransform(scrollYProgress, [0, 1], [1, 0.92])

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2
      const ny = (e.clientY / window.innerHeight - 0.5) * 2
      mouseX.set(nx * (size === 'hero' ? 14 : 8))
      mouseY.set(ny * (size === 'hero' ? 14 : 8))
    }
    window.addEventListener('mousemove', fn, { passive: true })
    return () => window.removeEventListener('mousemove', fn)
  }, [mouseX, mouseY, size])

  const radius = size === 'hero' ? 42 : 38
  const coreSize = size === 'hero' ? 'w-32 h-32 sm:w-40 sm:h-40' : 'w-24 h-24 sm:w-28 sm:h-28'

  return (
    <motion.div
      ref={ref}
      className={`relative mx-auto ${size === 'hero' ? 'w-full max-w-3xl aspect-[1.05]' : 'w-full max-w-md aspect-square'} ${className}`}
      style={{ y: scrollY, scale: scrollScale }}
      aria-hidden
    >
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.08)_0%,transparent_65%)]" />
      <div className="absolute inset-[10%] rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.1)_0%,transparent_70%)]" />

      <motion.div
        className="absolute inset-0"
        style={{ x: springX, y: springY }}
      >
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
          {NODES.map((n) => {
            const rad = ((n.angle - 90) * Math.PI) / 180
            const cx = 200
            const cy = 200
            const r = 155
            const x2 = cx + Math.cos(rad) * r
            const y2 = cy + Math.sin(rad) * r
            return (
              <motion.line
                key={n.id}
                x1={cx}
                y1={cy}
                x2={x2}
                y2={y2}
                stroke={`url(#${gradId})`}
                strokeWidth="1.2"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.5 }}
                transition={{ duration: 1.2, delay: 0.2 }}
              />
            )
          })}
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#0891b2" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          <motion.circle
            cx={200}
            cy={200}
            r={52}
            fill="rgba(255,255,255,0.9)"
            stroke={`url(#${gradId})`}
            strokeWidth="1.5"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 120, delay: 0.1 }}
          />
        </svg>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
            className={`${coreSize} rounded-full glass-glow flex flex-col items-center justify-center z-20`}
            animate={{
              boxShadow: [
                '0 0 0 1px rgba(255,255,255,0.9) inset, 0 20px 60px -20px rgba(8,145,178,0.25)',
                '0 0 0 1px rgba(255,255,255,0.9) inset, 0 24px 70px -16px rgba(167,139,246,0.2)',
                '0 0 0 1px rgba(255,255,255,0.9) inset, 0 20px 60px -20px rgba(8,145,178,0.25)',
              ],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="text-display text-2xl sm:text-3xl">LAXIS</span>
            <span className="text-[9px] tracking-[0.35em] text-accent/80 mt-1 uppercase">Hub</span>
          </motion.div>
        </div>

        {NODES.map((n, i) => {
          const rad = ((n.angle - 90) * Math.PI) / 180
          const left = 50 + Math.cos(rad) * radius
          const top = 50 + Math.sin(rad) * radius * 0.88
          return (
            <motion.div
              key={n.id}
              className="absolute glass-glow px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl text-[10px] sm:text-xs font-medium text-ink/85 -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${left}%`, top: `${top}%` }}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: [0, -6, 0],
              }}
              transition={{
                opacity: { delay: 0.15 + i * 0.06, duration: 0.5 },
                scale: { delay: 0.15 + i * 0.06, duration: 0.5 },
                y: { delay: i * 0.3, duration: 3.5 + i * 0.2, repeat: Infinity, ease: 'easeInOut' },
              }}
            >
              {n.label}
            </motion.div>
          )
        })}
      </motion.div>
    </motion.div>
  )
}
