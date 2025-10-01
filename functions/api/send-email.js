import { Resend } from 'resend';

export async function onRequestPost(context) {
  const body = await context.request.json();
  const resend = new Resend(context.env.RESEND_API_KEY);

  const { email, message } = body;

  await resend.emails.send({
    from: 'onboarding@resend.dev',   // sandbox用の固定アドレス
    to: 'taka@discoveryjhiddenjapan.com',  // テスト用
    subject: 'フォームテスト',
    html: `<p>${message}</p><p>From: ${email}</p>`,
  });

  return new Response("OK", { status: 200 });
}
