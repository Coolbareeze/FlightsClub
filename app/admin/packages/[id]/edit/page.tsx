import { notFound } from 'next/navigation';
import { getPackageById } from '@/lib/data/packages';
import { PackageForm } from '../../PackageForm';

export const dynamic = 'force-dynamic';

export default async function EditPackagePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const pkg = await getPackageById(id);
  if (!pkg) notFound();

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-navy">Edit Package</h1>
      <p className="mt-1 text-sm text-navy-700/60">Changes go live immediately once saved.</p>
      <div className="mt-8 max-w-3xl rounded-xl2 border border-navy-100 bg-white p-6 shadow-soft">
        <PackageForm initial={pkg ?? undefined} />
      </div>
    </div>
  );
}
