import { NextResponse } from 'next/server';

// Handles Quote Request, Holiday Enquiry, Visa Enquiry and Corporate Travel
// submissions. Route to the appropriate team inbox / CRM pipeline based on
// the `type` field once a backend (e.g. HubSpot, custom CRM) is connected.
export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.type) {
      return NextResponse.json({ ok: false, error: 'Missing enquiry type' }, { status: 400 });
    }
    // TODO: persist enquiry and notify relevant department
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request' }, { status: 400 });
  }
}
