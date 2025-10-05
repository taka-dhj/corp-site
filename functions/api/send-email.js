export async function onRequest(context) {
  const { request, env } = context;

  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  if (request.method !== 'POST') {
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Method not allowed'
      }),
      {
        status: 405,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        },
      }
    );
  }

  try {
    let formData;
    try {
      formData = await request.json();
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      return new Response(
        JSON.stringify({
          success: false,
          error: '無効なリクエスト形式です'
        }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json'
          },
        }
      );
    }

    const { name, email, company, phone, subject, message } = formData;

    if (!name || !email || !subject || !message) {
      return new Response(
        JSON.stringify({
          success: false,
          error: '必須項目が入力されていません'
        }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json'
          },
        }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({
          success: false,
          error: '有効なメールアドレスを入力してください'
        }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json'
          },
        }
      );
    }

    if (!env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured');
      return new Response(
        JSON.stringify({
          success: false,
          error: 'メール送信サービスが設定されていません'
        }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json'
          },
        }
      );
    }

    const escapedName = String(name).replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const escapedEmail = String(email).replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const escapedCompany = company ? String(company).replace(/</g, '&lt;').replace(/>/g, '&gt;') : '';
    const escapedPhone = phone ? String(phone).replace(/</g, '&lt;').replace(/>/g, '&gt;') : '';
    const escapedSubject = String(subject).replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const escapedMessage = String(message).replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br>');

    const emailBody = `
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: 'Helvetica Neue', Arial, 'Hiragino Sans', 'Hiragino Kaku Gothic ProN', Meiryo, sans-serif;
      line-height: 1.6;
      color: #333333;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background-color: #e11d48;
      color: white;
      padding: 30px 20px;
      text-align: center;
      border-radius: 8px 8px 0 0;
    }
    .header h2 {
      margin: 0;
      font-size: 24px;
      font-weight: 600;
    }
    .content {
      background-color: #f9fafb;
      padding: 30px 20px;
    }
    .field {
      margin-bottom: 20px;
      background-color: white;
      padding: 15px;
      border-radius: 6px;
      border-left: 4px solid #e11d48;
    }
    .label {
      font-weight: 600;
      color: #6b7280;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 8px;
    }
    .value {
      color: #111827;
      font-size: 15px;
      word-break: break-word;
    }
    .footer {
      text-align: center;
      padding: 20px;
      background-color: #f3f4f6;
      border-radius: 0 0 8px 8px;
      font-size: 12px;
      color: #6b7280;
    }
    .divider {
      height: 1px;
      background-color: #e5e7eb;
      margin: 20px 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>お問い合わせフォームからの新しいメッセージ</h2>
    </div>
    <div class="content">
      <div class="field">
        <div class="label">お名前</div>
        <div class="value">${escapedName}</div>
      </div>
      <div class="field">
        <div class="label">メールアドレス</div>
        <div class="value">${escapedEmail}</div>
      </div>
      ${escapedCompany ? `
      <div class="field">
        <div class="label">会社名・団体名</div>
        <div class="value">${escapedCompany}</div>
      </div>
      ` : ''}
      ${escapedPhone ? `
      <div class="field">
        <div class="label">電話番号</div>
        <div class="value">${escapedPhone}</div>
      </div>
      ` : ''}
      <div class="field">
        <div class="label">お問い合わせ種別</div>
        <div class="value">${escapedSubject}</div>
      </div>
      <div class="field">
        <div class="label">メッセージ</div>
        <div class="value">${escapedMessage}</div>
      </div>
    </div>
    <div class="footer">
      送信日時: ${new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })}
    </div>
  </div>
</body>
</html>
    `;

    console.log('Attempting to send email via Resend API...');

    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'noreply@discoveryhiddenjapan.com',
        to: 'taka@discoveryhiddenjapan.com',
        subject: `お問い合わせ: ${escapedSubject}`,
        html: emailBody,
        reply_to: email,
      }),
    });

    if (!resendResponse.ok) {
      const errorData = await resendResponse.text();
      console.error('Resend API error:', {
        status: resendResponse.status,
        statusText: resendResponse.statusText,
        body: errorData
      });

      return new Response(
        JSON.stringify({
          success: false,
          error: 'メール送信に失敗しました。しばらくしてから再度お試しください。'
        }),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json'
          },
        }
      );
    }

    const resendData = await resendResponse.json();
    console.log('Email sent successfully:', {
      id: resendData.id,
      from: 'noreply@discoveryhiddenjapan.com',
      to: 'taka@discoveryhiddenjapan.com',
      subject: escapedSubject
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: 'お問い合わせを送信しました'
      }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        },
      }
    );

  } catch (error) {
    console.error('Email sending error:', {
      message: error.message,
      stack: error.stack
    });

    return new Response(
      JSON.stringify({
        success: false,
        error: 'メール送信中にエラーが発生しました'
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json'
        },
      }
    );
  }
}
