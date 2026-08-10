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

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const pool = getPool();
  const [rows]: any = await pool.query('SELECT * FROM destinations WHERE id = ? LIMIT 1', [id]);
  if (!rows[0]) return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 });
  return NextResponse.json({ ok: true, destination: rows[0] });
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  const parsed = destinationSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: parsed.error.issues[0]?.message ?? 'Invalid data' }, { status: 400 });
  }
  const d = parsed.data;

  try {
    const pool = getPool();
    await pool.query(
      `UPDATE destinations SET slug=?, city=?, country=?, image=?, from_price=?, blurb=?, region=? WHERE id=?`,
      [d.slug, d.city, d.country, d.image, d.fromPrice, d.blurb, d.region, id]
    );
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    if (err?.code === 'ER_DUP_ENTRY') {
      return NextResponse.json({ ok: false, error: 'A destination with this slug already exists.' }, { status: 409 });
    }
    console.error('[admin/destinations] update failed:', err);
    return NextResponse.json({ ok: false, error: 'Could not save destination. Check the server logs.' }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const pool = getPool();
    await pool.query('DELETE FROM destinations WHERE id = ?', [id]);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[admin/destinations] delete failed:', err);
    return NextResponse.json({ ok: false, error: 'Could not delete destination.' }, { status: 500 });
  }
}
