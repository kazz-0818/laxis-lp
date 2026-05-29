import { useEffect, useState } from 'react'

const QUERY = '(max-width: 767px)'

export function useIsMobile() {
  const [mobile, setMobile] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(QUERY).matches : false,
  )

  useEffect(() => {
    const mq = window.matchMedia(QUERY)
    setMobile(mq.matches)
    const fn = (e: MediaQueryListEvent) => setMobile(e.matches)
    mq.addEventListener('change', fn)
    return () => mq.removeEventListener('change', fn)
  }, [])

  return mobile
}
