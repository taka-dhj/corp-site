# Discovery Hidden Japan Corporate Website

## Cloudflare デプロイメント設定

### 1. Resend アカウントの設定
1. [Resend](https://resend.com) でアカウントを作成
2. API キーを取得
3. ドメインを認証（`discoveryhiddenjapan.com`）

### 2. Cloudflare Pages デプロイ
1. Cloudflare Pages でプロジェクトを作成
2. GitHub リポジトリを接続
3. ビルド設定:
   - Build command: `npm run build`
   - Build output directory: `dist`

### 3. Cloudflare Functions 設定
1. `functions/api/send-email.js` が自動的にデプロイされます
2. Cloudflare Dashboard で環境変数を設定:
   - `RESEND_API_KEY`: Resend で取得した API キー

### 4. 環境変数の設定
Cloudflare Pages の設定画面で以下の環境変数を追加:
```
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxx
```

### 5. カスタムドメインの設定
1. Cloudflare Pages でカスタムドメインを追加
2. DNS レコードを設定
3. SSL/TLS 証明書が自動的に発行されます

## メール送信機能

### 動作フロー
1. ユーザーがフォームに入力
2. フロントエンドが `/api/send-email` に POST リクエスト
3. Cloudflare Functions が Resend API を使用してメール送信
4. `info@discoveryhiddenjapan.com` にメールが届く

### 必要な設定
- Resend でドメイン認証
- Cloudflare Pages で環境変数設定
- DNS レコードの設定

## 開発環境での実行

```bash
npm install
npm run dev
```

## 本番環境へのデプロイ

```bash
npm run build
```

Cloudflare Pages が自動的にビルドとデプロイを実行します。