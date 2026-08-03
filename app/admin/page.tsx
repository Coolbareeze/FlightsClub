import Link from 'next/link';
import { MapPinned, Package, ExternalLink } from 'lucide-react';
import { getPool } from '@/lib/db';
import { SeedButton } from './SeedButton';

export const dynamic = 'force-dynamic';

async function getCounts() {
  try {
    const pool = getPool();
    const [[packagesRow]]: any = await pool.query('SELECT COUNT(*) as count FROM packages');
    const [[destinationsRow]]: any = await pool.query('SELECT COUNT(*) as count FROM destinations');
    return { packages: packagesRow.count as number, destinations: destinationsRow.count as number };
  } catch {
    return null;
  }
}

export default async function AdminDashboard() {
  const counts = await getCounts();

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-navy">Dashboard</h1>
      <p className="mt-1 text-sm text-navy-700/60">Manage the holiday packages and destinations shown across the live site.</p>

      {!counts && (
        <div className="mt-6 rounded-xl2 border border-amber-300 bg-amber-50 p-5 text-sm text-amber-800">
          Couldn&apos;t connect to the database. Double-check the <code>DB_HOST</code>, <code>DB_NAME</code>,{' '}
          <code>DB_USER</code> and <code>DB_PASSWORD</code> environment variables are set correctly, and that you&apos;ve
          run <code>npm run db:seed</code> at least once.
        </div>
      )}

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <Link href="/admin/packages" className="card-lift flex items-center gap-4 rounded-xl2 border border-navy-100 bg-white p-6 shadow-soft">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-gold"><Package className="h-6 w-6" /></div>
          <div>
            <p className="font-heading text-lg font-bold text-navy">{counts ? counts.packages : '—'} Packages</p>
            <p className="text-xs text-navy-700/60">Holiday packages &amp; special offers</p>
          </div>
        </Link>
        <Link href="/admin/destinations" className="card-lift flex items-center gap-4 rounded-xl2 border border-navy-100 bg-white p-6 shadow-soft">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy text-gold"><MapPinned className="h-6 w-6" /></div>
          <div>
            <p className="font-heading text-lg font-bold text-navy">{counts ? counts.destinations : '—'} Destinations</p>
            <p className="text-xs text-navy-700/60">Popular destinations &amp; flight fares</p>
          </div>
        </Link>
      </div>

      <SeedButton />

      <a href="/" target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-navy hover:underline">
        View live site <ExternalLink className="h-3.5 w-3.5" />
      </a>
    </div>
  );
}
