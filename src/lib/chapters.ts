export const CHAPTERS = [
  { num: '01', label: 'CHAOS', title: '業務が絡まっている', sectionId: 'chaos' },
  { num: '02', label: 'PAIN', title: '人の頑張りだけで回している', sectionId: 'pain' },
  { num: '03', label: 'WRONG', title: 'とりあえずシステム化', sectionId: 'wrong' },
  { num: '04', label: 'REBUILD', title: '業務そのものを整える', sectionId: 'rebuild' },
  { num: '05', label: 'BUILD', title: '仕組み化する', sectionId: 'systemize' },
  { num: '06', label: 'HUB', title: 'Laxis Hub', sectionId: 'hub' },
  { num: '07', label: 'RESULT', title: '導入後の成果', sectionId: 'result' },
  { num: '08', label: 'START', title: '無料相談', sectionId: 'start' },
] as const

export type ChapterId = (typeof CHAPTERS)[number]['sectionId']
