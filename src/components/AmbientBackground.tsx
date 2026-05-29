import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { cn } from '../lib/utils'
import { useReducedMotion } from '../hooks/useReducedMotion'

type Variant = 'light' | 'dark' | 'hero'

interface AmbientBackgroundProps {
  variant?: Variant
  className?: string
  parallax?: boolean
}

export function AmbientBackground({
  variant = 'light',
  className,
  parallax = true,
}: AmbientBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const orbY = useTransform(scrollYProgress, [0, 1], [0, reduced || !parallax ? 0 : -120])
  const gridY = useTransform(scrollYProgress, [0, 1], [0, reduced || !parallax ? 0 : 60])

  const isDark = variant === 'dark' || variant === 'hero'

  return (
    <div ref={ref} className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}>
      <motion.div
        className={cn(
          'absolute inset-0',
          variant === 'hero' ? 'grid-bg-dark' : isDark ? 'grid-bg-dark' : 'grid-bg',
        )}
        style={{ y: gridY }}
      />

      <motion.div className="absolute inset-0" style={{ y: orbY }}>
        <div
          className={cn(
            'glow-ring w-[min(90vw,600px)] h-[min(90vw,600px)] -top-1/4 -right-1/4',
            isDark ? 'bg-cyan-500/15' : 'bg-cyan-400/20',
          )}
          style={reduced ? undefined : { animation: 'float-orb 14s ease-in-out infinite' }}
        />
        <div
          className={cn(
            'glow-ring w-[min(80vw,500px)] h-[min(80vw,500px)] bottom-0 -left-1/4',
            isDark ? 'bg-mint-500/12' : 'bg-mint-400/15',
          )}
          style={
            reduced
              ? undefined
              : { animation: 'float-orb 18s ease-in-out infinite reverse' }
          }
        />
        {variant === 'hero' && (
          <div className="glow-ring w-[400px] h-[400px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-cyan-400/8" />
        )}
      </motion.div>

      {variant === 'hero' && (
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-navy-950/20 to-navy-950/90" />
      )}
    </div>
  )
}
