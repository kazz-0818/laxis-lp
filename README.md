# LAXIS 公式LP

事業に合わせたシステム導入支援サービス「LAXIS」の体験型ランディングページです。スクロールでシーンが切り替わる、白基調のプレミアムな1ページ構成です。

## 使用技術

- React 19
- TypeScript
- Vite 6
- Tailwind CSS v4
- Framer Motion
- React Icons

## ローカル起動

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

## Vercelデプロイ

1. GitHubにリポジトリをpush
2. [Vercel](https://vercel.com) でプロジェクトをインポート
3. Framework Preset: **Vite**
4. Build Command: `npm run build`
5. Output Directory: `dist`

CLIの場合:

```bash
npx vercel --prod
```

## セクション構成

| # | コンポーネント | 内容 |
|---|----------------|------|
| 1 | Hero | ファーストビュー・3D風ビジュアル |
| 2 | SceneIntro | ホームページだけでは足りない |
| 3 | ProblemSection | 課題の浮遊カード |
| 4 | SolutionSection | モジュール組み合わせ |
| 5 | ExperienceSection | 集客・受注・管理の3導線（スクロール切替） |
| 6 | UseCaseSection | ユースケース |
| 7 | SystemMapSection | LAXISハブ図 |
| 8 | ProcessSection | 導入プロセス |
| 9 | WorksLikeSection | Before / After |
| 10 | PricingHintSection | 料金の考え方 |
| 11 | FAQSection | よくある質問 |
| 12 | CTASection | 最終CTA |
| — | Footer | フッター |

## 問い合わせリンクの差し替え

`src/data/site.ts` の `CONTACT` を編集してください。

```ts
export const CONTACT = {
  mailto: 'mailto:your@email.com?subject=...',
  line: 'https://line.me/R/ti/p/@your-id',
  phone: 'tel:0312345678',
}
```

## 今後追加したい機能

- 問い合わせフォーム実装
- LINE公式アカウント連携
- 導入事例ページ
- 管理画面デモ
- AIチャットデモ
- 料金シミュレーター
- CMS連携
- アニメーションの高度化
- 3Dビジュアルの実装（React Three Fiber 等）

## ライセンス

Private — LAXIS / NLG
