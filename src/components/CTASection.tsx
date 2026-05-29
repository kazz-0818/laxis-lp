import { motion } from 'framer-motion'
import { ArrowRight, FileText } from 'lucide-react'
import { AmbientBackground } from './AmbientBackground'
import { Button } from './ui/Button'
import { CTA, SECTION_IDS } from '../lib/constants'
import { useReducedMotion } from '../hooks/useReducedMotion'

export function CTASection() {
  const reduced = useReducedMotion()

  return (
    <section
      id={SECTION_IDS.contact}
      className="section-padding relative overflow-hidden bg-linear-to-br from-navy-950 via-navy-900 to-navy-800"
    >
      <AmbientBackground variant="hero" />

      <div className="container-narrow relative text-center">
        <motion.h2
          className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight"
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          まずは今の業務のお悩みをお聞かせください。
        </motion.h2>

        <motion.p
          className="mt-6 text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto"
          initial={reduced ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          「何から手をつければいいかわからない」
          <br className="hidden sm:block" />
          「今のやり方に限界を感じている」
          <br />
          そんな状態からで構いません。
          <br />
          LAXISが、あなたの会社の業務をゼロから整えます。
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          initial={reduced ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Button href={CTA.consult} variant="primary" size="lg" className="w-full sm:w-auto">
            無料相談する
            <ArrowRight size={18} />
          </Button>
          <Button
            href={CTA.materials}
            variant="secondary"
            size="lg"
            className="w-full sm:w-auto"
          >
            <FileText size={18} />
            資料を見たい
          </Button>
        </motion.div>

        <p className="mt-8 text-xs text-slate-500">
          ※ お問い合わせは{' '}
          <a href={CTA.mailto} className="text-mint-400 hover:underline">
            メール
          </a>
          でも受け付けています（フォーム・LINE連携は今後追加予定）
        </p>
      </div>
    </section>
  )
}
