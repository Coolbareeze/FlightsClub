// One-time (or repeatable) database seed script.
// Usage: npm run db:seed
//
// Reads DB credentials from .env.local (or .env), creates the tables from
// lib/schema.sql if they don't exist, then inserts the starter packages and
// destinations. Safe to re-run — existing rows (matched by slug) are
// updated rather than duplicated.
import 'dotenv/config';
import fs from 'node:fs';
import path from 'node:path';
import mysql from 'mysql2/promise';
import { seedPackages, seedDestinations } from './seed-data';

async function main() {
  const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD } = process.env;
  if (!DB_HOST || !DB_NAME || !DB_USER) {
    console.error('Missing DB_HOST, DB_NAME or DB_USER in your .env.local file. See .env.example.');
    process.exit(1);
  }

  const connection = await mysql.createConnection({
    host: DB_HOST,
    port: DB_PORT ? Number(DB_PORT) : 3306,
    database: DB_NAME,
    user: DB_USER,
    password: DB_PASSWORD ?? '',
    multipleStatements: true,
  });

  console.log('Connected. Applying schema...');
  const schema = fs.readFileSync(path.join(__dirname, '..', 'lib', 'schema.sql'), 'utf8');
  await connection.query(schema);

  console.log(`Seeding ${seedPackages.length} packages...`);
  for (const p of seedPackages) {
    await connection.query(
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

  console.log(`Seeding ${seedDestinations.length} destinations...`);
  for (const d of seedDestinations) {
    await connection.query(
      `INSERT INTO destinations (slug, city, country, image, from_price, blurb, region)
       VALUES (?,?,?,?,?,?,?)
       ON DUPLICATE KEY UPDATE
        city=VALUES(city), country=VALUES(country), image=VALUES(image), from_price=VALUES(from_price),
        blurb=VALUES(blurb), region=VALUES(region)`,
      [d.slug, d.city, d.country, d.image, d.fromPrice, d.blurb, d.region]
    );
  }

  console.log('Done. Database seeded successfully.');
  await connection.end();
}

main().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
