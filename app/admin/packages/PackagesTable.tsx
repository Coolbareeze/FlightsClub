'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Pencil, Trash2 } from 'lucide-react';
import { formatGBP } from '@/lib/utils';
import type { HolidayPackage } from '@/types';

export function PackagesTable({ packages }: { packages: HolidayPackage[] }) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const onDelete = async (id: number, title: string) => {
    if (!confirm(`Delete "${title}"? This can't be undone.`)) return;
    setDeletingId(id);
    await fetch(`/api/admin/packages/${id}`, { method: 'DELETE' });
    router.refresh();
    setDeletingId(null);
  };

  if (packages.length === 0) {
    return <p className="mt-6 text-sm text-navy-700/60">No packages yet — click &ldquo;Add Package&rdquo; to create your first one.</p>;
  }

  return (
    <div className="mt-6 overflow-x-auto rounded-xl2 border border-navy-100 bg-white shadow-soft">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-navy-100 bg-surface text-xs uppercase tracking-wide text-navy-700/60">
          <tr>
            <th className="px-4 py-3">Title</th>
            <th className="px-4 py-3">Category</th>
            <th className="px-4 py-3">Price</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-navy-100">
          {packages.map((p) => (
            <tr key={p.id}>
              <td className="px-4 py-3">
                <p className="font-semibold text-navy">{p.title}</p>
                <p className="text-xs text-navy-700/50">{p.destination}, {p.country}</p>
              </td>
              <td className="px-4 py-3 capitalize">{p.category}</td>
              <td className="px-4 py-3">{formatGBP(p.price)}</td>
              <td className="px-4 py-3">
                <div className="flex justify-end gap-2">
                  <Link href={`/admin/packages/${p.id}/edit`} className="flex h-8 w-8 items-center justify-center rounded-lg border border-navy-100 text-navy hover:bg-navy-50" aria-label="Edit">
                    <Pencil className="h-3.5 w-3.5" />
                  </Link>
                  <button
                    onClick={() => onDelete(p.id!, p.title)}
                    disabled={deletingId === p.id}
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
