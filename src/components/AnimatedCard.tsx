import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { cn } from '../lib/utils'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface AnimatedCardProps {
  children: React.ReactNode
  className?: string
  delay?: number
  index?: number
  parallax?: boolean
}

export function AnimatedCard({
  children,
  className,
  delay = 0,
  index = 0,
  parallax = true,
}: AnimatedCardProps) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const parallaxY = useTransform(scrollYProgress, [0, 1], [24, -24])

  return (
    <motion.div ref={ref} style={{ y: reduced || !parallax ? 0 : parallaxY }}>
      <motion.div
        className={cn(
          'glass-card glass-card-hover rounded-2xl p-6 sm:p-7 relative overflow-hidden',
          className,
        )}
        initial={reduced ? false : { opacity: 0, y: 48, rotateX: 12, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{
          duration: 0.7,
          delay: reduced ? 0 : delay + index * 0.1,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{ transformPerspective: 1200 }}
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-bl from-cyan-400/10 to-transparent rounded-bl-full pointer-events-none" />
        {children}
      </motion.div>
    </motion.div>
  )
}
