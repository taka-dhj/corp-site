export default {
  async fetch(request, env) {
    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    // Handle preflight requests
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 200,
        headers: corsHeaders,
      });
    }

    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    try {
      const formData = await request.json();
      const { name, email, company, phone, subject, message } = formData;

      // Validate required fields
      if (!name || !email || !subject || !message) {
        return new Response(JSON.stringify({ 
          success: false, 
          error: '必須項目が入力されていません' 
        }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // Create email content
      const emailBody = `
        <h2>お問い合わせフォームからの新しいメッセージ</h2>
        <p><strong>お名前:</strong> ${name}</p>
        <p><strong>メールアドレス:</strong> ${email}</p>
        ${company ? `<p><strong>会社名・団体名:</strong> ${company}</p>` : ''}
        ${phone ? `<p><strong>電話番号:</strong> ${phone}</p>` : ''}
        <p><strong>お問い合わせ種別:</strong> ${subject}</p>
        <p><strong>メッセージ:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><small>送信日時: ${new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })}</small></p>
      `;

      // Send email using Resend API
      const resendResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'noreply@discoveryhiddenjapan.com',
          to: 'info@discoveryhiddenjapan.com',
          subject: `お問い合わせ: ${subject}`,
          html: emailBody,
          reply_to: email,
        }),
      });

      if (!resendResponse.ok) {
        const errorData = await resendResponse.text();
        console.error('Resend API error:', errorData);
        throw new Error('メール送信に失敗しました');
      }

      return new Response(JSON.stringify({ 
        success: true, 
        message: 'お問い合わせを送信しました' 
      }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });

    } catch (error) {
      console.error('Email sending error:', error);
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'メール送信中にエラーが発生しました' 
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
  }
};