import { useRef, useState } from 'react'
import gsap from 'gsap'
import { ChevronDown } from 'lucide-react'
import { faqs } from '../../data/faqs'
import { SectionLabel } from '../ui/SectionLabel'
import { useSectionAnimation } from '../../hooks/useSceneProgress'

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  const toggle = () => {
    const el = contentRef.current
    if (!el) return

    if (!open) {
      setOpen(true)
      gsap.fromTo(el, { height: 0, opacity: 0 }, { height: 'auto', opacity: 1, duration: 0.4, ease: 'power2.out' })
    } else {
      gsap.to(el, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => setOpen(false),
      })
    }
  }

  return (
    <div className="border-b border-white/10">
      <button
        type="button"
        onClick={toggle}
        className="flex w-full items-center justify-between py-5 text-left"
      >
        <span className="text-sm font-medium text-text-primary md:text-base">{q}</span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-text-muted transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>
      <div ref={contentRef} className="overflow-hidden" style={{ height: 0, opacity: 0 }}>
        <p className="pb-5 text-sm leading-relaxed text-text-muted">{a}</p>
      </div>
    </div>
  )
}

export function FAQSection() {
  const ref = useRef<HTMLElement>(null)
  useSectionAnimation(ref)

  return (
    <section
      ref={ref}
      id="faq"
      data-scene="faq"
      className="scene-section relative min-h-screen bg-bg-slate py-32"
    >
      <div className="mx-auto max-w-3xl px-6">
        <div data-animate>
          <SectionLabel number="10" label="FAQ" className="mb-6" />
        </div>
        <h2 data-animate className="text-3xl font-bold text-text-primary md:text-4xl">
          よくある質問
        </h2>

        <div data-animate className="mt-10">
          {faqs.map((faq) => (
            <FAQItem key={faq.q} q={faq.q} a={faq.a} />
          ))}
        </div>
      </div>
    </section>
  )
}
