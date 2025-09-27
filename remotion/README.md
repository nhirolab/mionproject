# Remotion プロジェクト

澪音ファンサイトの世界観に合わせたオープニング映像を作るための Remotion プロジェクトです。`npx create-video@latest` が使えない環境でも同じ構成を手作業で再現しています。

## セットアップ

1. Node.js 18 以降をインストールしてください。
2. 必要なパッケージをインストールします。

   ```bash
   cd remotion
   npm install
   ```

   ※ この環境では npm レジストリへのアクセス制限によりインストールできません。ネットワークに接続できる環境で実行してください。

## 利用方法

開発サーバー (Remotion Studio) を起動するには次のコマンドを実行します。

```bash
npm run start
```

ブラウザで `http://localhost:3001` を開くと、コンポジション `MionOpening` をプレビューできます。

ビデオをレンダリングする場合は以下を実行します。

```bash
npm run build
```

`out/` ディレクトリに H.264 コーデックの mp4 ファイルが生成されます。

## コンポジション概要

- **MionOpening**: 澪音の象徴アイコンを中心に、夜明けのブルートーンと音の波形をアニメーションで表現した 20 秒のイントロ映像です。プロップでタイトルとサブタイトルのテキストを差し替えることができます。
- 使用しているアセットは `public/assets/mion-icon.svg` で、ファンサイトのロゴを共有しています。

## ファイル構成

```
remotion/
├── public/            # 静的アセット
├── src/               # Remotion コンポジション
│   ├── index.ts       # registerRoot のエントリ
│   ├── Root.tsx       # Composition 定義
│   └── MionOpening.tsx # メインの映像コンポジション
├── remotion.config.ts # レンダリング設定
├── tsconfig.json      # TypeScript 設定
└── vite.config.ts     # Vite 設定
```

必要に応じて `src/` に別のコンポジションを追加し、`Root.tsx` の `Composition` を増やすことで拡張できます。
