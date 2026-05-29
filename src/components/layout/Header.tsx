import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Logo } from './Logo'
import { GlowButton } from '../ui/GlowButton'
import { CTA } from '../../lib/constants'
import { cn } from '../../lib/utils'

const nav = [
  { label: '課題', href: '#problems' },
  { label: '思想', href: '#philosophy' },
  { label: 'サービス', href: '#service' },
  { label: 'Hub', href: '#hub' },
  { label: '料金', href: '#pricing' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={cn(
        'fixed top-0 inset-x-0 z-50 transition-all duration-500',
        scrolled ? 'glass border-b border-white/10 py-3' : 'py-5 bg-transparent',
      )}
    >
      <div className="container-wide flex items-center justify-between px-5 sm:px-8 lg:px-12">
        <Logo />
        <nav className="hidden lg:flex gap-8">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="text-sm text-slate-300 hover:text-mint-400 transition-colors">
              {item.label}
            </a>
          ))}
        </nav>
        <GlowButton href={CTA.consult} variant="primary" size="sm" className="hidden lg:inline-flex">
          無料相談
        </GlowButton>
        <button type="button" className="lg:hidden text-white p-2" onClick={() => setOpen(!open)} aria-label="メニュー">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {open && (
        <nav className="lg:hidden glass border-t border-white/10 p-5 flex flex-col gap-4">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="text-slate-200" onClick={() => setOpen(false)}>
              {item.label}
            </a>
          ))}
          <GlowButton href={CTA.consult} variant="primary" size="md" className="w-full" onClick={() => setOpen(false)}>
            無料相談する
          </GlowButton>
        </nav>
      )}
    </header>
  )
}
