type SectionLabelProps = {
  number: string
  label: string
  className?: string
}

export function SectionLabel({ number, label, className = '' }: SectionLabelProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="font-mono text-xs tracking-[0.3em] text-accent-cyan/80">{number}</span>
      <span className="h-px w-8 bg-accent-cyan/30" />
      <span className="text-xs font-medium uppercase tracking-[0.25em] text-text-muted">{label}</span>
    </div>
  )
}
