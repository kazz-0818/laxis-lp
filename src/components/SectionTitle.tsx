import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { cn } from '../lib/utils'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface SectionTitleProps {
  label?: string
  title: React.ReactNode
  description?: string
  align?: 'left' | 'center'
  dark?: boolean
  className?: string
}

export function SectionTitle({
  label,
  title,
  description,
  align = 'center',
  dark = false,
  className,
}: SectionTitleProps) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center center'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [40, 0])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.3, 1])

  return (
    <motion.div
      ref={ref}
      className={cn(
        'mb-12 sm:mb-16',
        align === 'center' && 'text-center mx-auto max-w-3xl',
        className,
      )}
      style={{
        y: reduced ? 0 : y,
        opacity: reduced ? 1 : opacity,
      }}
    >
      {label && (
        <p
          className={cn(
            'inline-block text-xs sm:text-sm font-bold tracking-[0.2em] uppercase mb-4 px-4 py-1.5 rounded-full',
            dark
              ? 'text-mint-400 bg-mint-400/10 border border-mint-400/20'
              : 'text-cyan-600 bg-cyan-500/10 border border-cyan-500/20',
          )}
        >
          {label}
        </p>
      )}
      <h2
        className={cn(
          'text-2xl sm:text-3xl lg:text-[2.75rem] font-extrabold leading-[1.2] tracking-tight',
          dark ? 'text-white' : 'text-navy-900',
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            'mt-4 sm:mt-5 text-base sm:text-lg leading-relaxed',
            dark ? 'text-slate-300/90' : 'text-slate-600',
          )}
        >
          {description}
        </p>
      )}
    </motion.div>
  )
}
