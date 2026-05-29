import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { ScrollProgress } from './components/ScrollProgress'
import { Hero } from './components/Hero'
import { SceneIntro } from './components/SceneIntro'
import { ProblemSection } from './components/ProblemSection'
import { SolutionSection } from './components/SolutionSection'
import { ExperienceSection } from './components/ExperienceSection'
import { UseCaseSection } from './components/UseCaseSection'
import { SystemMapSection } from './components/SystemMapSection'
import { ProcessSection } from './components/ProcessSection'
import { WorksLikeSection } from './components/WorksLikeSection'
import { PricingHintSection } from './components/PricingHintSection'
import { FAQSection } from './components/FAQSection'
import { CTASection } from './components/CTASection'

export default function App() {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main>
        <Hero />
        <SceneIntro />
        <ProblemSection />
        <SolutionSection />
        <ExperienceSection />
        <UseCaseSection />
        <SystemMapSection />
        <ProcessSection />
        <WorksLikeSection />
        <PricingHintSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
