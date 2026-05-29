import { Logo } from './Logo'

export function Footer() {
  return (
    <footer className="bg-slate-100 border-t border-slate-200 text-navy-800/70 py-12 px-5">
      <div className="container-narrow flex flex-col sm:flex-row justify-between gap-8 items-center sm:items-start text-center sm:text-left max-w-6xl mx-auto">
        <div>
          <Logo />
          <p className="mt-4 text-sm max-w-sm font-light">
            業務をゼロから整え、ラクに回るシステムをつくる。
          </p>
        </div>
        <div className="text-sm">
          <p className="text-navy-900 font-semibold">株式会社NLG</p>
          <p className="mt-1">LAXIS / ラクシス</p>
          <p className="mt-4 text-xs text-slate-400">© {new Date().getFullYear()} NLG Inc.</p>
        </div>
      </div>
    </footer>
  )
}
