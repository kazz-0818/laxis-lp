/** ページ全体のスクロール進捗 0〜1（3D は毎フレームここを読む） */
export const scrollDriver = {
  progress: 0,
  rotationY: 0,
}

export const ROTATION_TURNS = Math.PI * 2 * 4

/** #scroll-root の実スクロール位置から進捗を取得（最も信頼できる） */
export function readScrollProgress(): number {
  const root = document.getElementById('scroll-root')
  if (!root) return 0
  const max = root.scrollHeight - root.clientHeight
  if (max <= 1) return 0
  return Math.min(1, Math.max(0, root.scrollTop / max))
}

export function syncScrollDriver() {
  const p = readScrollProgress()
  scrollDriver.progress = p
  scrollDriver.rotationY = p * ROTATION_TURNS
  return p
}
