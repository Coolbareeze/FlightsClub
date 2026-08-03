import { NextResponse } from 'next/server';

// Production integration point: forward to a transactional email provider
// (e.g. Resend, SendGrid, Postmark) or CRM webhook. Ensure rate limiting
// and CAPTCHA verification (e.g. Cloudflare Turnstile) run before this handler.
export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.email || !body.fullName || !body.message) {
      return NextResponse.json({ ok: false, error: 'Missing required fields' }, { status: 400 });
    }
    if (body.website) {
      // Honeypot field populated — likely a bot.
      return NextResponse.json({ ok: true });
    }

    // TODO: send email / persist enquiry
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request' }, { status: 400 });
  }
}
