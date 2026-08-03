import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getPool } from '@/lib/db';

const packageSchema = z.object({
  slug: z.string().min(2).regex(/^[a-z0-9-]+$/, 'Use lowercase letters, numbers and hyphens only'),
  title: z.string().min(2),
  destination: z.string().min(2),
  country: z.string().min(2),
  image: z.string().url(),
  duration: z.string().min(2),
  nights: z.coerce.number().int().positive(),
  price: z.coerce.number().int().positive(),
  originalPrice: z.coerce.number().int().positive().optional().nullable(),
  airline: z.string().min(2),
  hotel: z.string().min(2),
  hotelStars: z.coerce.number().int().min(1).max(5),
  board: z.string().min(2),
  transfers: z.boolean(),
  category: z.enum(['beach', 'city', 'luxury', 'family', 'honeymoon']),
  highlights: z.array(z.string().min(1)).min(1),
});

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const pool = getPool();
  const [rows]: any = await pool.query('SELECT * FROM packages WHERE id = ? LIMIT 1', [id]);
  if (!rows[0]) return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 });
  return NextResponse.json({ ok: true, package: rows[0] });
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  const parsed = packageSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: parsed.error.issues[0]?.message ?? 'Invalid data' }, { status: 400 });
  }
  const p = parsed.data;

  try {
    const pool = getPool();
    await pool.query(
      `UPDATE packages SET
        slug=?, title=?, destination=?, country=?, image=?, duration=?, nights=?, price=?, original_price=?,
        airline=?, hotel=?, hotel_stars=?, board=?, transfers=?, category=?, highlights=?
       WHERE id=?`,
      [
        p.slug, p.title, p.destination, p.country, p.image, p.duration, p.nights, p.price,
        p.originalPrice ?? null, p.airline, p.hotel, p.hotelStars, p.board, p.transfers ? 1 : 0,
        p.category, JSON.stringify(p.highlights), id,
      ]
    );
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    if (err?.code === 'ER_DUP_ENTRY') {
      return NextResponse.json({ ok: false, error: 'A package with this slug already exists.' }, { status: 409 });
    }
    console.error('[admin/packages] update failed:', err);
    return NextResponse.json({ ok: false, error: 'Could not save package. Check the server logs.' }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const pool = getPool();
    await pool.query('DELETE FROM packages WHERE id = ?', [id]);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[admin/packages] delete failed:', err);
    return NextResponse.json({ ok: false, error: 'Could not delete package.' }, { status: 500 });
  }
}
