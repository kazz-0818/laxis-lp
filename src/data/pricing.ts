export const pricingPlans = [
  {
    id: 'light',
    name: 'Light',
    range: '5〜20万円',
    description: 'スプレッドシート改善や一部業務の自動化から始めたい方向け。',
    featured: false,
  },
  {
    id: 'standard',
    name: 'Standard',
    range: '20〜70万円',
    description: '複数業務を整理し、管理画面やダッシュボードまで構築する標準プラン。',
    featured: true,
  },
  {
    id: 'premium',
    name: 'Premium',
    range: '70〜200万円',
    description: '全社的な業務設計とLaxis Hubによる一元管理を目指す方向け。',
    featured: false,
  },
  {
    id: 'support',
    name: 'Support',
    range: '月額1〜5万円',
    description: '導入後の運用改善、修正、追加開発を継続的にサポート。',
    featured: false,
  },
] as const
