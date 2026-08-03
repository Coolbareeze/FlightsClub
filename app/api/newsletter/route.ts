import { NextResponse } from 'next/server';

// Production integration point: Mailchimp / Klaviyo list subscription API.
export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.email) {
      return NextResponse.json({ ok: false, error: 'Email required' }, { status: 400 });
    }
    // TODO: subscribe email to newsletter provider
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request' }, { status: 400 });
  }
}
