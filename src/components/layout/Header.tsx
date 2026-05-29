import { useEffect, useState } from 'react'
import { Logo } from './Logo'
import { GlowButton } from '../ui/GlowButton'
import { CTA } from '../../lib/constants'
import { cn } from '../../lib/utils'

export function Header() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const fn = () => setVisible(window.scrollY < 80 || window.scrollY > 200)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 inset-x-0 z-50 transition-all duration-700',
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none',
      )}
    >
      <div className="flex items-center justify-between px-5 sm:px-10 py-5">
        <Logo />
        <GlowButton href={CTA.consult} variant="secondary" size="sm" className="!py-2 !text-xs">
          相談
        </GlowButton>
      </div>
    </header>
  )
}
