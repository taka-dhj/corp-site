# Cloudflare Pages + Resend デプロイメントガイド

## システム構成

```
Frontend (React + Vite)
    ↓
Cloudflare Pages Function (/api/send-email)
    ↓
Resend API (https://api.resend.com/emails)
    ↓
Email Delivery (info@discoveryhiddenjapan.com)
```

## 前提条件

### 完了済み
- ✅ Resend.com DNS設定完了
- ✅ Cloudflare Pages RESEND_API_KEY設定完了

### 実装済み
- ✅ Cloudflare Pages Function (`functions/api/send-email.js`)
- ✅ React ContactForm (`src/components/ContactForm.tsx`)
- ✅ エラーハンドリング
- ✅ XSS対策（HTMLエスケープ）
- ✅ メールアドレス検証
- ✅ CORS設定

## デプロイ方法

### 1. Cloudflare Pagesにプッシュ

```bash
git add .
git commit -m "Complete contact form integration"
git push origin main
```

Cloudflare Pagesは自動的に:
- プロジェクトをビルド
- Functionsをデプロイ
- 本番環境に公開

### 2. 環境変数の確認

Cloudflare Dashboardで以下を確認:

1. Pages > あなたのプロジェクト > Settings > Environment variables
2. Production環境に `RESEND_API_KEY` が設定されていることを確認

## API仕様

### エンドポイント
```
POST /api/send-email
```

### リクエスト
```json
{
  "name": "山田太郎",
  "email": "example@company.com",
  "company": "株式会社サンプル",
  "phone": "03-1234-5678",
  "subject": "インバウンドツアー企画について",
  "message": "お問い合わせ内容"
}
```

### レスポンス (成功)
```json
{
  "success": true,
  "message": "お問い合わせを送信しました"
}
```

### レスポンス (エラー)
```json
{
  "success": false,
  "error": "エラーメッセージ"
}
```

## セキュリティ機能

### 入力検証
- 必須フィールドチェック（name, email, subject, message）
- メールアドレス形式検証（正規表現）
- 環境変数存在チェック

### XSS対策
- すべてのユーザー入力をHTMLエスケープ
- `<` → `&lt;`
- `>` → `&gt;`

### CORS設定
```javascript
{
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
}
```

## エラーハンドリング

### バックエンド
- JSONパースエラー → 400 Bad Request
- バリデーションエラー → 400 Bad Request
- 環境変数未設定 → 500 Internal Server Error
- Resend APIエラー → 500 Internal Server Error
- その他の例外 → 500 Internal Server Error

### フロントエンド
- ネットワークエラー処理
- JSONパースエラー処理
- ユーザーフレンドリーなエラー表示

## ログ出力

### 成功時
```
Attempting to send email via Resend API...
Email sent successfully: {
  id: "xxx",
  from: "noreply@discoveryhiddenjapan.com",
  to: "info@discoveryhiddenjapan.com",
  subject: "お問い合わせ: xxx"
}
```

### エラー時
```
Resend API error: {
  status: 4xx/5xx,
  statusText: "xxx",
  body: "xxx"
}
```

## テスト手順

### 本番環境での動作確認

1. **正常系テスト**
   - すべてのフィールドを入力して送信
   - 成功メッセージが表示されることを確認
   - `info@discoveryhiddenjapan.com` にメールが届くことを確認

2. **バリデーションテスト**
   - 必須フィールドを空にして送信 → エラー表示
   - 無効なメールアドレスを入力 → エラー表示

3. **エラーハンドリングテスト**
   - ネットワークを切断して送信 → エラー表示

## トラブルシューティング

### 問題: フォーム送信が失敗する

**確認事項:**
1. Cloudflare Pages Dashboard → Functions ログを確認
2. ブラウザ開発者ツール → Console/Network タブを確認
3. `RESEND_API_KEY` が正しく設定されているか確認

**よくあるエラー:**

| エラーメッセージ | 原因 | 解決方法 |
|----------------|------|---------|
| "メール送信サービスが設定されていません" | `RESEND_API_KEY` 未設定 | Cloudflare Dashboard で環境変数を設定 |
| "必須項目が入力されていません" | フィールドが空 | すべての必須フィールドを入力 |
| "有効なメールアドレスを入力してください" | メール形式が無効 | 正しいメールアドレスを入力 |
| "メール送信に失敗しました" | Resend API エラー | Resend Dashboard でドメイン検証を確認 |

### 問題: メールが届かない

**確認事項:**
1. Resend Dashboard → Emails で送信履歴を確認
2. スパムフォルダを確認
3. DNS設定（SPF, DKIM, DMARC）を確認

## メールテンプレート

プロフェッショナルなHTMLメールテンプレートを使用:
- モバイル対応
- ブランドカラー（#e11d48）
- 読みやすいレイアウト
- 日本語フォント対応

## ファイル構成

```
project/
├── functions/
│   └── api/
│       └── send-email.js          # Cloudflare Pages Function
├── src/
│   └── components/
│       └── ContactForm.tsx        # フロントエンドフォーム
├── .dev.vars                       # ローカル開発用環境変数（Git無視）
├── .gitignore                      # .dev.varsを含む
└── wrangler.toml                   # Cloudflare設定
```

## 次のステップ

1. **モニタリング設定**
   - Cloudflare Analytics でFunction呼び出しを監視
   - Resend Dashboard でメール送信率を監視

2. **スパム対策**
   - reCAPTCHA導入検討
   - レート制限実装検討

3. **通知設定**
   - Slack/Discord通知追加検討
   - 管理者ダッシュボード追加検討

## サポート

問題が解決しない場合:
- Cloudflare Pages ドキュメント: https://developers.cloudflare.com/pages/
- Resend ドキュメント: https://resend.com/docs
