import { Logo } from './Logo'

export function Footer() {
  return (
    <footer className="bg-navy-950 text-slate-400 py-12 px-5 sm:px-8">
      <div className="container-narrow flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="text-center sm:text-left">
          <Logo dark className="items-center sm:items-start" />
          <p className="mt-4 text-sm leading-relaxed max-w-md">
            業務をゼロから整え、ラクに回るシステムをつくる。
          </p>
        </div>
        <div className="text-center sm:text-right text-sm">
          <p className="text-white font-medium">株式会社NLG</p>
          <p className="mt-1">LAXIS / ラクシス</p>
          <p className="mt-4 text-xs text-slate-500">
            © {new Date().getFullYear()} NLG Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
