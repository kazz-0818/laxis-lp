export const heroFragments = [
  'Excel',
  'LINE',
  'PDF',
  '顧客情報',
  '請求',
  '予約',
  '売上',
  '手作業',
  '属人化',
  '未対応タスク',
] as const

export const site = {
  name: 'LAXIS',
  tagline: '不便な業務に、改善の光を。',
  description:
    'LAXISは、業務改善・システム開発・自動化・運用改善までを一貫して支援する、ゼロから整える業務効率化サービスです。',
  cta: {
    contact: '#contact',
    download: '#download',
    mechanism: '#organize',
  },
} as const

export type SceneId =
  | 'hero'
  | 'chaos'
  | 'lightOn'
  | 'organize'
  | 'systemize'
  | 'hub'
  | 'dashboard'
  | 'useCase'
  | 'pricing'
  | 'faq'
  | 'cta'

export const scenes: { id: SceneId; label: string; number: string }[] = [
  { id: 'hero', label: 'Opening', number: '01' },
  { id: 'chaos', label: 'Chaos', number: '02' },
  { id: 'lightOn', label: 'Light On', number: '03' },
  { id: 'organize', label: 'Organize', number: '04' },
  { id: 'systemize', label: 'Systemize', number: '05' },
  { id: 'hub', label: 'Laxis Hub', number: '06' },
  { id: 'dashboard', label: 'Dashboard', number: '07' },
  { id: 'useCase', label: 'Use Case', number: '08' },
  { id: 'pricing', label: 'Pricing', number: '09' },
  { id: 'faq', label: 'FAQ', number: '10' },
  { id: 'cta', label: 'Contact', number: '11' },
]
