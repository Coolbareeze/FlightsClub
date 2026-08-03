'use client';

import { useRouter } from 'next/navigation';
import { LogOut } from 'lucide-react';

export function LogoutButton({ compact = false }: { compact?: boolean }) {
  const router = useRouter();

  const onLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <button
      onClick={onLogout}
      className={
        compact
          ? 'flex items-center gap-2 text-xs font-semibold text-navy'
          : 'mt-auto flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/60 transition-colors hover:bg-white/10 hover:text-white'
      }
    >
      <LogOut className="h-4 w-4" /> Sign Out
    </button>
  );
}
