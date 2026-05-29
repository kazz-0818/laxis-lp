import { useRef } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { cn } from '../lib/utils'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface ParallaxSectionProps {
  children: React.ReactNode
  className?: string
  id?: string
  /** 背景レイヤーの移動量（正=下方向に遅れて動く） */
  bgSpeed?: number
  /** コンテンツの移動量 */
  contentSpeed?: number
  background?: React.ReactNode
}

export function ParallaxSection({
  children,
  className,
  id,
  bgSpeed = 0.12,
  contentSpeed = 0.04,
  background,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const bgY = useTransform(scrollYProgress, [0, 1], [bgSpeed * 100, -bgSpeed * 100])
  const contentY = useTransform(
    scrollYProgress,
    [0, 1],
    [contentSpeed * 60, -contentSpeed * 60],
  )

  return (
    <section ref={ref} id={id} className={cn('relative overflow-hidden', className)}>
      {background && (
        <motion.div
          className="absolute inset-0 will-change-transform"
          style={{ y: reduced ? 0 : bgY }}
        >
          {background}
        </motion.div>
      )}
      <motion.div
        className="relative z-10 will-change-transform"
        style={{ y: reduced ? 0 : contentY }}
      >
        {children}
      </motion.div>
    </section>
  )
}

/** 子要素にスクロール連動のY移動を付与 */
export function ParallaxItem({
  children,
  className,
  speed = 0.08,
  progress,
}: {
  children: React.ReactNode
  className?: string
  speed?: number
  progress?: MotionValue<number>
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const source = progress ?? scrollYProgress
  const y = useTransform(source, [0, 1], [speed * 80, -speed * 80])

  return (
    <motion.div ref={ref} className={className} style={{ y: reduced ? 0 : y }}>
      {children}
    </motion.div>
  )
}
