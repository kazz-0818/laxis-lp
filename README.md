# LAXIS（ラクシス）— 体験型3DスクロールLP

業務の「混乱 → 整理 → 仕組み化 → Hub一元化」を、スクロール体験として伝えるLPです。

**本番:** https://laxis-lp.vercel.app

## 技術スタック

- React 19 + Vite 8 + TypeScript
- Tailwind CSS v4
- **Lenis**（スムーススクロール）
- **GSAP + ScrollTrigger**（ピン留め・スクロールストーリー）
- React Three Fiber（Hero / Laxis Hub の2箇所）
- lucide-react

## 体験設計（8章）

| 章 | セクション | 演出 |
|----|-----------|------|
| 01 Chaos | Hero | 全画面3D・ピン留め・ChaosMesh背景 |
| 02 Pain | 課題 | 散らばったカード→フォーカス整列（ピン） |
| 03 Wrong | 失敗 | ツール群クラスター分解 |
| 04 Reframe | 解決思想 | ノードグラフ＋ステップ点灯（ピン） |
| 05 Systemize | サービス | 積層カード |
| 06 Hub | Laxis Hub | 3D Hub＋軌道カード＋接続線 |
| 07 Result | 導入例・Dashboard | Before/After・3Dモック迫近 |
| 08 Action | CTA | 光が集まるフィナーレ |

## 開発

```bash
npm install
npm run dev
```

## 構成

```
src/
├── providers/SmoothScrollProvider.tsx  # Lenis + GSAP
├── components/
│   ├── layout/
│   ├── sections/
│   ├── scenes/      # ChaosMesh, PhilosophyNodes
│   ├── 3d/          # HeroScene, HubScene
│   └── ui/          # ChapterShell, StoryRail, DashboardMock
```

## パフォーマンス

- PC: Lenis + GSAPピン + R3F
- スマホ: 軽量表示（3D無効・ピン簡略化）
- `prefers-reduced-motion`: 演出抑制

## CTA差し替え

`src/lib/constants.ts`

## Vercel

| 項目 | 値 |
|------|-----|
| Framework | Vite |
| Build | `npm run build` |
| Output | `dist` |

株式会社NLG
