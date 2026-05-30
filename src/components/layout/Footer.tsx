import { site } from '../../data/site'

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5 bg-bg-deep py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
        <div>
          <p className="text-lg font-bold tracking-wider">{site.name}</p>
          <p className="mt-1 text-xs text-text-muted">業務に改善の光を。</p>
        </div>
        <div className="flex gap-6 text-xs text-text-muted">
          <a href="#faq" className="hover:text-text-primary">FAQ</a>
          <a href={site.cta.contact} className="hover:text-text-primary">お問い合わせ</a>
          <a href={site.cta.download} className="hover:text-text-primary">資料</a>
        </div>
        <p className="text-xs text-text-muted">&copy; {new Date().getFullYear()} LAXIS</p>
      </div>
    </footer>
  )
}
