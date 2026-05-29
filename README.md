# LAXIS（ラクシス）ランディングページ

株式会社NLGが提供する業務効率化サービス「LAXIS」の公式LPです。

## 技術スタック

- React 19 + Vite 8
- TypeScript
- Tailwind CSS v4
- Framer Motion
- React Three Fiber / Three.js
- lucide-react

## ローカル開発

```bash
npm install
npm run dev
```

ブラウザで `http://localhost:5173` を開いてください。

## ビルド

```bash
npm run build
npm run preview
```

## Vercel へのデプロイ

1. このリポジトリを GitHub に push する
2. [Vercel](https://vercel.com) で **New Project** を作成
3. リポジトリをインポート
4. 設定は以下のとおり（通常は自動検出されます）

| 項目 | 値 |
|------|-----|
| Framework Preset | Vite |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| 環境変数 | 現時点では不要 |

5. Deploy を実行

## お問い合わせ導線の差し替え

`src/lib/constants.ts` の `CTA` オブジェクトを編集してください。

- `consult` … 無料相談ボタンのリンク（現在は `#contact`）
- `mailto` … メールリンク
- `materials` … 資料請求リンク

将来的に LINE 公式 URL や外部フォーム URL に差し替え可能です。

## プロジェクト構成

```
src/
├── App.tsx
├── main.tsx
├── index.css
├── lib/
│   ├── constants.ts
│   └── utils.ts
├── hooks/
│   └── useReducedMotion.ts
└── components/
    ├── Header.tsx
    ├── Hero.tsx
    ├── Floating3DScene.tsx
    ├── ProblemSection.tsx
    ├── FailureSection.tsx
    ├── SolutionSection.tsx
    ├── ServiceSection.tsx
    ├── TargetSection.tsx
    ├── LaxisHubSection.tsx
    ├── UseCaseSection.tsx
    ├── DashboardPreview.tsx
    ├── ComparisonSection.tsx
    ├── FlowSection.tsx
    ├── PricingSection.tsx
    ├── FAQSection.tsx
    ├── CTASection.tsx
    ├── Footer.tsx
    ├── SectionTitle.tsx
    ├── AnimatedCard.tsx
    ├── Logo.tsx
    └── ui/
        └── Button.tsx
```

## ライセンス

株式会社NLG
