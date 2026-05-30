import { useEffect, useState } from 'react'

export function useMediaQuery(q: string) {
  const [m, setM] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(q).matches : false,
  )
  useEffect(() => {
    const mq = window.matchMedia(q)
    const fn = (e: MediaQueryListEvent) => setM(e.matches)
    setM(mq.matches)
    mq.addEventListener('change', fn)
    return () => mq.removeEventListener('change', fn)
  }, [q])
  return m
}

export const useIsMobile = () => useMediaQuery('(max-width: 767px)')
