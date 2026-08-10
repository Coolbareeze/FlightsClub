import { getPool } from '@/lib/db';
import { normalizeImageUrl } from '@/lib/utils';
import type { Destination } from '@/types';
import type { RowDataPacket } from 'mysql2';

interface DestinationRow extends RowDataPacket {
  id: number;
  slug: string;
  city: string;
  country: string;
  image: string;
  from_price: number;
  blurb: string;
  region: Destination['region'];
}

function mapRow(row: DestinationRow): Destination {
  return {
    id: row.id,
    slug: row.slug,
    city: row.city,
    country: row.country,
    image: normalizeImageUrl(row.image),
    fromPrice: row.from_price,
    blurb: row.blurb,
    region: row.region,
  };
}

// See lib/data/packages.ts for why these fall back to [] / null instead of throwing.

export async function getAllDestinations(): Promise<Destination[]> {
  try {
    const pool = getPool();
    const [rows] = await pool.query<DestinationRow[]>('SELECT * FROM destinations ORDER BY created_at DESC');
    return rows.map(mapRow);
  } catch (err) {
    console.error('[destinations] getAllDestinations failed:', err);
    return [];
  }
}

export async function getDestinationById(id: number | string): Promise<Destination | null> {
  try {
    const pool = getPool();
    const [rows] = await pool.query<DestinationRow[]>('SELECT * FROM destinations WHERE id = ? LIMIT 1', [id]);
    return rows[0] ? mapRow(rows[0]) : null;
  } catch (err) {
    console.error('[destinations] getDestinationById failed:', err);
    return null;
  }
}

export async function getDestinationBySlug(slug: string): Promise<Destination | null> {
  try {
    const pool = getPool();
    const [rows] = await pool.query<DestinationRow[]>('SELECT * FROM destinations WHERE slug = ? LIMIT 1', [slug]);
    return rows[0] ? mapRow(rows[0]) : null;
  } catch (err) {
    console.error('[destinations] getDestinationBySlug failed:', err);
    return null;
  }
}
