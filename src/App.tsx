import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { ProblemSection } from './components/ProblemSection'
import { FailureSection } from './components/FailureSection'
import { SolutionSection } from './components/SolutionSection'
import { ServiceSection } from './components/ServiceSection'
import { TargetSection } from './components/TargetSection'
import { LaxisHubSection } from './components/LaxisHubSection'
import { UseCaseSection } from './components/UseCaseSection'
import { DashboardPreview } from './components/DashboardPreview'
import { ComparisonSection } from './components/ComparisonSection'
import { FlowSection } from './components/FlowSection'
import { PricingSection } from './components/PricingSection'
import { FAQSection } from './components/FAQSection'
import { CTASection } from './components/CTASection'
import { Footer } from './components/Footer'

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ProblemSection />
        <FailureSection />
        <SolutionSection />
        <ServiceSection />
        <TargetSection />
        <LaxisHubSection />
        <UseCaseSection />
        <DashboardPreview />
        <ComparisonSection />
        <FlowSection />
        <PricingSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}

export default App
