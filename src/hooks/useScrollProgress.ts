import { useEffect, useState, type RefObject } from 'react'

/** 0〜1 のスクロール進捗（要素がビューポートを通過） */
export function useScrollProgress(ref: RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const update = () => {
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      const total = rect.height + vh
      const scrolled = vh - rect.top
      setProgress(Math.min(1, Math.max(0, scrolled / total)))
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update, { passive: true })
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [ref])

  return progress
}
