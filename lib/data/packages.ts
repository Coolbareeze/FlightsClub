import { getPool } from '@/lib/db';
import { normalizeImageUrl } from '@/lib/utils';
import type { HolidayPackage } from '@/types';
import type { RowDataPacket } from 'mysql2';

interface PackageRow extends RowDataPacket {
  id: number;
  slug: string;
  title: string;
  destination: string;
  country: string;
  image: string;
  duration: string;
  nights: number;
  price: number;
  original_price: number | null;
  airline: string;
  hotel: string;
  hotel_stars: number;
  board: string;
  transfers: number;
  category: HolidayPackage['category'];
  highlights: string; // JSON column — mysql2 returns it as a string unless typeCast configured
}

function mapRow(row: PackageRow): HolidayPackage {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    destination: row.destination,
    country: row.country,
    image: normalizeImageUrl(row.image),
    duration: row.duration,
    nights: row.nights,
    price: row.price,
    originalPrice: row.original_price ?? undefined,
    airline: row.airline,
    hotel: row.hotel,
    hotelStars: row.hotel_stars,
    board: row.board,
    transfers: !!row.transfers,
    category: row.category,
    highlights: typeof row.highlights === 'string' ? JSON.parse(row.highlights) : row.highlights,
  };
}

// Every reader gracefully falls back to an empty result (rather than
// throwing and taking the whole page down) if the database isn't reachable
// yet — e.g. before DB_HOST/DB_NAME/etc. are configured or before
// `npm run db:seed` has been run. Errors are still logged server-side so
// they're visible in Hostinger's logs.

export async function getAllPackages(): Promise<HolidayPackage[]> {
  try {
    const pool = getPool();
    const [rows] = await pool.query<PackageRow[]>('SELECT * FROM packages ORDER BY created_at DESC');
    return rows.map(mapRow);
  } catch (err) {
    console.error('[packages] getAllPackages failed:', err);
    return [];
  }
}

export async function getPackageBySlug(slug: string): Promise<HolidayPackage | null> {
  try {
    const pool = getPool();
    const [rows] = await pool.query<PackageRow[]>('SELECT * FROM packages WHERE slug = ? LIMIT 1', [slug]);
    return rows[0] ? mapRow(rows[0]) : null;
  } catch (err) {
    console.error('[packages] getPackageBySlug failed:', err);
    return null;
  }
}

export async function getPackageById(id: number | string): Promise<HolidayPackage | null> {
  try {
    const pool = getPool();
    const [rows] = await pool.query<PackageRow[]>('SELECT * FROM packages WHERE id = ? LIMIT 1', [id]);
    return rows[0] ? mapRow(rows[0]) : null;
  } catch (err) {
    console.error('[packages] getPackageById failed:', err);
    return null;
  }
}

export async function getPackagesByCategory(category: HolidayPackage['category']): Promise<HolidayPackage[]> {
  try {
    const pool = getPool();
    const [rows] = await pool.query<PackageRow[]>(
      'SELECT * FROM packages WHERE category = ? ORDER BY created_at DESC',
      [category]
    );
    return rows.map(mapRow);
  } catch (err) {
    console.error('[packages] getPackagesByCategory failed:', err);
    return [];
  }
}
