import { Logo } from './Logo'

export function Footer() {
  return (
    <footer className="bg-navy-950 border-t border-white/10 text-slate-400 py-12 px-5">
      <div className="container-narrow flex flex-col sm:flex-row justify-between gap-8 items-center sm:items-start text-center sm:text-left">
        <div>
          <Logo />
          <p className="mt-4 text-sm max-w-sm">
            業務をゼロから整え、ラクに回るシステムをつくる。
          </p>
        </div>
        <div className="text-sm">
          <p className="text-white font-semibold">株式会社NLG</p>
          <p className="mt-1">LAXIS / ラクシス</p>
          <p className="mt-4 text-xs text-slate-600">© {new Date().getFullYear()} NLG Inc.</p>
        </div>
      </div>
    </footer>
  )
}
