import { SmoothScrollProvider } from './providers/SmoothScrollProvider'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { ScrollLine } from './components/ui/ScrollLine'
import { ChapterRail } from './components/ui/ChapterRail'
import { Hero } from './components/sections/Hero'
import { ChaosSection } from './components/sections/ChaosSection'
import { PainSection } from './components/sections/PainSection'
import { WrongSection } from './components/sections/WrongSection'
import { RebuildSection } from './components/sections/RebuildSection'
import { SystemizeSection } from './components/sections/SystemizeSection'
import { LaxisHubSection } from './components/sections/LaxisHubSection'
import { DashboardSection } from './components/sections/DashboardSection'
import { PricingSection } from './components/sections/PricingSection'
import { FAQSection } from './components/sections/FAQSection'
import { CTASection } from './components/sections/CTASection'

function App() {
  return (
    <SmoothScrollProvider>
      <ScrollLine />
      <ChapterRail />
      <Header />
      <main>
        <Hero />
        <ChaosSection />
        <PainSection />
        <WrongSection />
        <RebuildSection />
        <SystemizeSection />
        <LaxisHubSection />
        <DashboardSection />
        <PricingSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </SmoothScrollProvider>
  )
}

export default App
