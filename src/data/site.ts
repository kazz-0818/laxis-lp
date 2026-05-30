export const site = {
  name: 'LAXIS',
  cta: { contact: '#contact', download: '#download' },
} as const

export type SceneId =
  | 'hero'
  | 'chaos'
  | 'lightOn'
  | 'organize'
  | 'systemize'
  | 'hub'
  | 'dashboard'
  | 'cta'

export const heroFragments = [
  'Excel', 'LINE', 'PDF', '顧客管理', '請求', '予約', '売上', '未対応', '手作業', '属人化',
] as const

export const chaosCards = heroFragments

export const organizeSteps = [
  { step: '01', title: '複雑な現状業務' },
  { step: '02', title: 'ムダ・属人化の解消' },
  { step: '03', title: '最適なツール選定' },
  { step: '04', title: 'ラクに回る仕組み' },
] as const

export const systemTools = [
  'LINE', 'AI', 'GAS', 'Spreadsheet', 'Web管理画面', 'PDF自動生成', 'Dashboard', 'フォーム連携',
] as const

export const hubFeatures = [
  '専用管理画面', '顧客管理', '売上・請求', 'LINE連携',
  '営業管理', '予約・受付', '在庫・商品', 'AI活用',
] as const
