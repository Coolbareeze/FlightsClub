import { notFound } from 'next/navigation';
import { getDestinationById } from '@/lib/data/destinations';
import { DestinationForm } from '../../DestinationForm';

export const dynamic = 'force-dynamic';

export default async function EditDestinationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const destination = await getDestinationById(id);
  if (!destination) notFound();

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold text-navy">Edit Destination</h1>
      <p className="mt-1 text-sm text-navy-700/60">Changes go live immediately once saved.</p>
      <div className="mt-8 max-w-2xl rounded-xl2 border border-navy-100 bg-white p-6 shadow-soft">
        <DestinationForm initial={destination ?? undefined} />
      </div>
    </div>
  );
}
