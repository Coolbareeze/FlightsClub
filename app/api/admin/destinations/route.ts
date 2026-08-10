import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getPool } from '@/lib/db';

const destinationSchema = z.object({
  slug: z.string().min(2).regex(/^[a-z0-9-]+$/, 'Use lowercase letters, numbers and hyphens only'),
  city: z.string().min(2),
  country: z.string().min(2),
  image: z.string().url(),
  fromPrice: z.coerce.number().int().positive(),
  blurb: z.string().min(5),
  region: z.enum(['uk', 'europe', 'middleeast', 'africa', 'asia', 'americas', 'oceania']),
});

export async function GET() {
  const pool = getPool();
  const [rows] = await pool.query('SELECT * FROM destinations ORDER BY created_at DESC');
  return NextResponse.json({ ok: true, destinations: rows });
}

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = destinationSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: parsed.error.issues[0]?.message ?? 'Invalid data' }, { status: 400 });
  }
  const d = parsed.data;

  try {
    const pool = getPool();
    await pool.query(
      `INSERT INTO destinations (slug, city, country, image, from_price, blurb, region) VALUES (?,?,?,?,?,?,?)`,
      [d.slug, d.city, d.country, d.image, d.fromPrice, d.blurb, d.region]
    );
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    if (err?.code === 'ER_DUP_ENTRY') {
      return NextResponse.json({ ok: false, error: 'A destination with this slug already exists.' }, { status: 409 });
    }
    console.error('[admin/destinations] create failed:', err);
    return NextResponse.json({ ok: false, error: 'Could not save destination. Check the server logs.' }, { status: 500 });
  }
}
