import Link from 'next/link';
import { Plus } from 'lucide-react';
import { getAllPackages } from '@/lib/data/packages';
import { PackagesTable } from './PackagesTable';

export const dynamic = 'force-dynamic';

export default async function AdminPackagesPage() {
  const packages = await getAllPackages();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-navy">Holiday Packages</h1>
          <p className="mt-1 text-sm text-navy-700/60">These power Holiday Packages, City Breaks, Beach/Luxury/Family Holidays and Special Offers.</p>
        </div>
        <Link href="/admin/packages/new" className="btn-primary !px-4 !py-2.5 text-sm"><Plus className="h-4 w-4" /> Add Package</Link>
      </div>
      <PackagesTable packages={packages} />
    </div>
  );
}
