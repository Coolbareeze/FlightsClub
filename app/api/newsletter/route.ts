import { NextResponse } from 'next/server';
import { sendNotification } from '@/lib/email';

// Production integration point: Mailchimp / Klaviyo list subscription API.
// Until that's connected, at least forward new signups by email so they
// aren't lost — swap/extend this once a proper ESP is wired up.
export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.email) {
      return NextResponse.json({ ok: false, error: 'Email required' }, { status: 400 });
    }

    try {
      await sendNotification({
        subject: `New Newsletter Signup — ${body.email}`,
        replyTo: body.email,
        html: `<h2>New newsletter signup</h2><p><strong>Email:</strong> ${body.email}</p>`,
      });
    } catch (mailErr) {
      console.error('[newsletter] sendNotification failed:', mailErr);
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request' }, { status: 400 });
  }
}
