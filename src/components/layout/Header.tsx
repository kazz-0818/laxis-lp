import { site } from '../../data/site'
import { GlowButton } from '../ui/GlowButton'

export function Header() {
  return (
    <header className="site-header">
      <a href="#" className="site-header__logo">
        {site.name}
      </a>
      <GlowButton href={site.cta.contact}>無料相談</GlowButton>
    </header>
  )
}
