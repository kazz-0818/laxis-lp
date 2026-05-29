import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { Logo } from './Logo'
import { Button } from './ui/Button'
import { CTA } from '../lib/constants'
import { cn } from '../lib/utils'

const navItems = [
  { label: '課題', href: '#problems' },
  { label: '思想', href: '#solution' },
  { label: 'サービス', href: '#service' },
  { label: 'Laxis Hub', href: '#hub' },
  { label: '導入例', href: '#cases' },
  { label: '料金', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
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
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-navy-950/80 backdrop-blur-2xl border-b border-white/5 shadow-2xl shadow-black/20 py-3'
          : 'py-5 bg-transparent',
      )}
    >
      <div className="container-wide flex items-center justify-between px-5 sm:px-8 lg:px-12">
        <Logo dark />

        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-slate-300 hover:text-mint-400 transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button href={CTA.consult} variant="primary" size="sm">
            無料相談する
          </Button>
        </div>

        <button
          type="button"
          className="lg:hidden p-2 text-white"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'メニューを閉じる' : 'メニューを開く'}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden overflow-hidden bg-navy-900 border-t border-white/10"
          >
            <nav className="flex flex-col p-5 gap-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-slate-200 py-2"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <Button href={CTA.consult} variant="primary" size="md" className="w-full mt-2">
                無料相談する
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
