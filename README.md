# LAXIS（ラクシス）ランディングページ

没入型3DスクロールLP — React / Vite / Three.js / GSAP

## 技術スタック

- React 19 + Vite 8 + TypeScript
- Tailwind CSS v4
- Framer Motion（補助）
- **GSAP + ScrollTrigger**（スクロールストーリー）
- React Three Fiber（Hero / Laxis Hub の2箇所のみ）
- lucide-react

## 開発

```bash
npm install
npm run dev
```

## ビルド

```bash
npm run build
npm run preview
```

## 構成

```
src/components/
├── layout/       Header, Footer, Logo
├── sections/     全14セクション
├── 3d/           HeroScene, HubScene, FloatingObjects
└── ui/           GlowButton, GlassCard, SectionTitle, DashboardMock
```

## スクロールストーリー

1. **Chaos** — Hero（3D・ピン留めスクロール）→ 課題カードが散らばりから整列
2. **Organize** — 失敗セクション（混沌クラスター分解）→ 解決思想（ピン留めステップ）
3. **Hub** — Laxis Hub 3D + カード集約
4. **Growth** — 最終CTA（光が集まる）

## CTA差し替え

`src/lib/constants.ts` の `CTA` を編集。

## Vercelデプロイ

| 項目 | 値 |
|------|-----|
| Framework | Vite |
| Build | `npm run build` |
| Output | `dist` |

## パフォーマンス

- スマホ: 3D Canvas無効・GSAPピン簡略化
- `prefers-reduced-motion`: アニメーション抑制

株式会社NLG
