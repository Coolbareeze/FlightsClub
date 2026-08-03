'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Pencil, Trash2 } from 'lucide-react';
import type { Destination } from '@/types';

export function DestinationsTable({ destinations }: { destinations: Destination[] }) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const onDelete = async (id: number, city: string) => {
    if (!confirm(`Delete "${city}"? This can't be undone.`)) return;
    setDeletingId(id);
    await fetch(`/api/admin/destinations/${id}`, { method: 'DELETE' });
    router.refresh();
    setDeletingId(null);
  };

  if (destinations.length === 0) {
    return <p className="mt-6 text-sm text-navy-700/60">No destinations yet — click &ldquo;Add Destination&rdquo; to create your first one.</p>;
  }

  return (
    <div className="mt-6 overflow-x-auto rounded-xl2 border border-navy-100 bg-white shadow-soft">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-navy-100 bg-surface text-xs uppercase tracking-wide text-navy-700/60">
          <tr>
            <th className="px-4 py-3">City</th>
            <th className="px-4 py-3">Region</th>
            <th className="px-4 py-3">From Price</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-navy-100">
          {destinations.map((d) => (
            <tr key={d.id}>
              <td className="px-4 py-3">
                <p className="font-semibold text-navy">{d.city}</p>
                <p className="text-xs text-navy-700/50">{d.country}</p>
              </td>
              <td className="px-4 py-3 capitalize">{d.region}</td>
              <td className="px-4 py-3">£{d.fromPrice}</td>
              <td className="px-4 py-3">
                <div className="flex justify-end gap-2">
                  <Link href={`/admin/destinations/${d.id}/edit`} className="flex h-8 w-8 items-center justify-center rounded-lg border border-navy-100 text-navy hover:bg-navy-50" aria-label="Edit">
                    <Pencil className="h-3.5 w-3.5" />
                  </Link>
                  <button
                    onClick={() => onDelete(d.id!, d.city)}
                    disabled={deletingId === d.id}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-red-200 text-red-600 hover:bg-red-50 disabled:opacity-50"
                    aria-label="Delete"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
