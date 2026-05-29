import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { CONTACT, SECTION_IDS, SITE } from '../data/site'

export function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <motion.header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-white/80 backdrop-blur-md border-b border-slate-200/80 py-3' : 'py-5 bg-transparent'
      }`}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.6 }}
    >
      <div className="section-pad flex items-center justify-between max-w-7xl mx-auto">
        <a href={`#${SECTION_IDS.hero}`} className="text-lg font-bold tracking-tight text-ink">
          {SITE.name}
        </a>
        <a
          href={CONTACT.mailto}
          className="text-sm font-medium px-5 py-2.5 rounded-full bg-ink text-white hover:bg-ink/90 transition-colors min-h-[44px] inline-flex items-center"
        >
          相談する
        </a>
      </div>
    </motion.header>
  )
}
