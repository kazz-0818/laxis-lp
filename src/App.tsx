import { SmoothScrollProvider } from './providers/SmoothScrollProvider'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { ScrollLine } from './components/ui/ScrollLine'
import { Hero } from './components/sections/Hero'
import { ProblemSection } from './components/sections/ProblemSection'
import { FailureSection } from './components/sections/FailureSection'
import { PhilosophySection } from './components/sections/PhilosophySection'
import { ServiceSection } from './components/sections/ServiceSection'
import { TargetSection } from './components/sections/TargetSection'
import { LaxisHubSection } from './components/sections/LaxisHubSection'
import { UseCaseSection } from './components/sections/UseCaseSection'
import { DashboardSection } from './components/sections/DashboardSection'
import { ComparisonSection } from './components/sections/ComparisonSection'
import { FlowSection } from './components/sections/FlowSection'
import { PricingSection } from './components/sections/PricingSection'
import { FAQSection } from './components/sections/FAQSection'
import { CTASection } from './components/sections/CTASection'

function App() {
  return (
    <SmoothScrollProvider>
      <ScrollLine />
      <Header />
      <main>
        <Hero />
        <ProblemSection />
        <FailureSection />
        <PhilosophySection />
        <ServiceSection />
        <TargetSection />
        <LaxisHubSection />
        <UseCaseSection />
        <DashboardSection />
        <ComparisonSection />
        <FlowSection />
        <PricingSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </SmoothScrollProvider>
  )
}

export default App
