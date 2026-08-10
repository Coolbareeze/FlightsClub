import { NextResponse } from 'next/server';
import { sendNotification } from '@/lib/email';

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

    try {
      await sendNotification({
        subject: `New Contact Form Enquiry — ${body.subject || 'General'} — ${body.fullName}`,
        replyTo: body.email,
        html: `
          <h2>New contact form submission</h2>
          <p><strong>Name:</strong> ${body.fullName}</p>
          <p><strong>Email:</strong> ${body.email}</p>
          <p><strong>Phone:</strong> ${body.phone ?? '—'}</p>
          <p><strong>Subject:</strong> ${body.subject ?? '—'}</p>
          <p><strong>Message:</strong></p>
          <p>${String(body.message).replace(/\n/g, '<br>')}</p>
        `,
      });
    } catch (mailErr) {
      // Don't fail the customer's submission just because email delivery
      // broke — log it so it can be investigated, but still confirm to the
      // customer their message went through the form successfully.
      console.error('[contact] sendNotification failed:', mailErr);
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request' }, { status: 400 });
  }
}
