import Link from 'next/link';
import { Plus } from 'lucide-react';
import { getAllDestinations } from '@/lib/data/destinations';
import { DestinationsTable } from './DestinationsTable';

export const dynamic = 'force-dynamic';

export default async function AdminDestinationsPage() {
  const destinations = await getAllDestinations();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-navy">Destinations</h1>
          <p className="mt-1 text-sm text-navy-700/60">These power the homepage destination cards, flight fare listings and header search.</p>
        </div>
        <Link href="/admin/destinations/new" className="btn-primary !px-4 !py-2.5 text-sm"><Plus className="h-4 w-4" /> Add Destination</Link>
      </div>
      <DestinationsTable destinations={destinations} />
    </div>
  );
}
