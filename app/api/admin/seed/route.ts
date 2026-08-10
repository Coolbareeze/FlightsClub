// One-click "load starter content" endpoint, used by the button on the
// admin dashboard. Does the same thing as `npm run db:seed`, but runs
// server-side on Hostinger itself — so it works even though Hostinger's
// shared MySQL databases aren't reachable as DB_HOST=localhost from outside
// the server (i.e. can't easily be run from a developer's own machine).
// Safe to run more than once: rows are upserted by slug, not duplicated.
import { NextResponse } from 'next/server';
import { getPool } from '@/lib/db';
import { seedPackages, seedDestinations } from '@/scripts/seed-data';

const CREATE_PACKAGES = `
CREATE TABLE IF NOT EXISTS packages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(191) NOT NULL UNIQUE,
  title VARCHAR(255) NOT NULL,
  destination VARCHAR(255) NOT NULL,
  country VARCHAR(255) NOT NULL,
  image TEXT NOT NULL,
  duration VARCHAR(64) NOT NULL,
  nights INT NOT NULL,
  price INT NOT NULL,
  original_price INT NULL,
  airline VARCHAR(255) NOT NULL,
  hotel VARCHAR(255) NOT NULL,
  hotel_stars TINYINT NOT NULL DEFAULT 5,
  board VARCHAR(64) NOT NULL,
  transfers TINYINT(1) NOT NULL DEFAULT 1,
  category ENUM('beach', 'city', 'luxury', 'family', 'honeymoon') NOT NULL,
  highlights JSON NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`;

const CREATE_DESTINATIONS = `
CREATE TABLE IF NOT EXISTS destinations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(191) NOT NULL UNIQUE,
  city VARCHAR(255) NOT NULL,
  country VARCHAR(255) NOT NULL,
  image TEXT NOT NULL,
  from_price INT NOT NULL,
  blurb TEXT NOT NULL,
  region ENUM('uk', 'europe', 'middleeast', 'asia', 'americas', 'oceania') NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`;

export async function POST() {
  try {
    const pool = getPool();

    await pool.query(CREATE_PACKAGES);
    await pool.query(CREATE_DESTINATIONS);

    for (const p of seedPackages) {
      await pool.query(
        `INSERT INTO packages
          (slug, title, destination, country, image, duration, nights, price, original_price, airline, hotel, hotel_stars, board, transfers, category, highlights)
         VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
         ON DUPLICATE KEY UPDATE
          title=VALUES(title), destination=VALUES(destination), country=VALUES(country), image=VALUES(image),
          duration=VALUES(duration), nights=VALUES(nights), price=VALUES(price), original_price=VALUES(original_price),
          airline=VALUES(airline), hotel=VALUES(hotel), hotel_stars=VALUES(hotel_stars), board=VALUES(board),
          transfers=VALUES(transfers), category=VALUES(category), highlights=VALUES(highlights)`,
        [
          p.slug, p.title, p.destination, p.country, p.image, p.duration, p.nights, p.price,
          p.originalPrice ?? null, p.airline, p.hotel, p.hotelStars, p.board, p.transfers ? 1 : 0,
          p.category, JSON.stringify(p.highlights),
        ]
      );
    }

    for (const d of seedDestinations) {
      await pool.query(
        `INSERT INTO destinations (slug, city, country, image, from_price, blurb, region)
         VALUES (?,?,?,?,?,?,?)
         ON DUPLICATE KEY UPDATE
          city=VALUES(city), country=VALUES(country), image=VALUES(image), from_price=VALUES(from_price),
          blurb=VALUES(blurb), region=VALUES(region)`,
        [d.slug, d.city, d.country, d.image, d.fromPrice, d.blurb, d.region]
      );
    }

    // One-time cleanup: these UK city "destinations" were replaced with
    // worldwide sellers (this is a flights-from-the-UK business, not a UK
    // domestic one) and no longer exist in seedDestinations above. Upserting
    // by slug never deletes rows, so remove them explicitly here. Harmless
    // to leave in — it's a no-op once these slugs are gone.
    await pool.query(
      `DELETE FROM destinations WHERE slug IN ('london', 'manchester', 'birmingham', 'edinburgh', 'glasgow')`
    );

    return NextResponse.json({
      ok: true,
      packages: seedPackages.length,
      destinations: seedDestinations.length,
    });
  } catch (err) {
    console.error('[admin/seed] failed:', err);
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
