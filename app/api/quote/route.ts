import { NextResponse } from 'next/server';
import { sendNotification } from '@/lib/email';

// Handles Quote Request, Holiday Enquiry, Visa Enquiry and Corporate Travel
// submissions — the `type` field tells us which form it came from, since
// they share this one endpoint but have different fields.
const TYPE_LABELS: Record<string, string> = {
  'flight-quote': 'Flight Quote Request',
  'holiday-enquiry': 'Holiday Package Enquiry',
  'visa-enquiry': 'Visa Enquiry',
  'corporate-travel': 'Corporate Travel Enquiry',
};

// Human-readable labels for known fields across all four forms; anything
// not listed here still gets shown, just with its raw field name — so a
// new field added to any of these forms is never silently dropped.
const FIELD_LABELS: Record<string, string> = {
  fullName: 'Full Name',
  companyName: 'Company Name',
  contactName: 'Contact Name',
  email: 'Email',
  phone: 'Phone',
  origin: 'Flying From',
  destination: 'Flying To',
  departDate: 'Departure Date',
  passengers: 'Passengers',
  cabin: 'Cabin Class',
  budget: 'Budget Per Person',
  travelMonth: 'Preferred Month',
  nationality: 'Nationality',
  destinationCountry: 'Destination Country',
  travelDate: 'Intended Travel Date',
  travellers: 'Estimated Annual Travellers',
  notes: 'Notes',
};

function buildHtml(type: string, body: Record<string, unknown>) {
  const rows = Object.entries(body)
    .filter(([key]) => key !== 'type')
    .map(([key, value]) => {
      const label = FIELD_LABELS[key] ?? key;
      const text = String(value ?? '—').replace(/\n/g, '<br>');
      return `<p><strong>${label}:</strong> ${text}</p>`;
    })
    .join('');
  return `<h2>New ${TYPE_LABELS[type] ?? type}</h2>${rows}`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.type) {
      return NextResponse.json({ ok: false, error: 'Missing enquiry type' }, { status: 400 });
    }

    try {
      await sendNotification({
        subject: `New ${TYPE_LABELS[body.type] ?? body.type} — ${body.fullName || body.contactName || body.companyName || 'Website'}`,
        replyTo: typeof body.email === 'string' ? body.email : undefined,
        html: buildHtml(body.type, body),
      });
    } catch (mailErr) {
      // Don't fail the customer's submission just because email delivery
      // broke — log it so it can be investigated, but still confirm to the
      // customer their enquiry went through.
      console.error('[quote] sendNotification failed:', mailErr);
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request' }, { status: 400 });
  }
}
