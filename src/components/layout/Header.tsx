import { useEffect, useState } from 'react'
import { site } from '../../data/site'
import { GlowButton } from '../ui/GlowButton'

export function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'border-b border-white/5 bg-bg-deep/80 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#" className="text-lg font-bold tracking-wider text-text-primary">
          {site.name}
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          <a href="#organize" className="text-xs tracking-widest text-text-muted hover:text-text-primary">
            仕組み
          </a>
          <a href="#hub" className="text-xs tracking-widest text-text-muted hover:text-text-primary">
            Hub
          </a>
          <a href="#pricing" className="text-xs tracking-widest text-text-muted hover:text-text-primary">
            料金
          </a>
        </nav>
        <GlowButton href={site.cta.contact} className="px-4 py-2 text-xs">
          無料相談
        </GlowButton>
      </div>
    </header>
  )
}
