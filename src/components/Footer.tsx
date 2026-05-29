import { SECTION_IDS, SITE } from '../data/site'

const links = [
  { label: 'Features', href: `#${SECTION_IDS.solution}` },
  { label: 'Use Cases', href: `#${SECTION_IDS.useCases}` },
  { label: 'Process', href: `#${SECTION_IDS.process}` },
  { label: 'FAQ', href: `#${SECTION_IDS.faq}` },
  { label: 'Contact', href: `#${SECTION_IDS.contact}` },
]

export function Footer() {
  return (
    <footer className="section-pad py-16 border-t border-slate-200 bg-white">
      <div className="container-wide flex flex-col sm:flex-row justify-between gap-10">
        <div>
          <p className="text-xl font-bold text-ink">{SITE.name}</p>
          <p className="mt-2 text-sm text-ink-muted">{SITE.tagline}</p>
        </div>
        <nav className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-ink-muted">
          {links.map((l) => (
            <a key={l.label} href={l.href} className="hover:text-accent transition-colors">
              {l.label}
            </a>
          ))}
        </nav>
      </div>
      <p className="container-wide mt-12 text-xs text-slate-400">
        © {new Date().getFullYear()} LAXIS. All rights reserved.
      </p>
    </footer>
  )
}
